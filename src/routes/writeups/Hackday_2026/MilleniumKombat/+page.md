# Millenium Kombat

Winning in rock-paper-scissors due to a weak randomization algorithm

**Event**: Hackday Quals 2026

**Category**: web3

**Difficulty**: easy

**Points**: 100

**Solves**: 143

---

## Challenge description
We have found an old video game console. There is a fighting game on it. The opponent seems to perform totally random actions. Can you beat it?
> IP:port

**Setup.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {MillenniumKombat} from "./MK.sol";

contract Setup {
	address public player;
	MillenniumKombat public kombat;
	constructor (address _player) payable {
		player = _player;
		kombat = new MillenniumKombat();
	}
	function isSolved() public view returns (bool) {
		return kombat.successfulMoves() >= 100;
	}
}
```

**MK.sol** (extracted):
```java
contract MillenniumKombat {
	bool public hasAttacked = false;
	uint private seed;
	uint public successfulMoves;

	mapping(Moves => Moves) public RPSchart;

	enum Moves {
		Grab,
		Attack, 
		Guard
	}

	constructor() payable {
		seed = block.prevrandao;
		RPSchart[Moves.Attack] = Moves.Grab;
		RPSchart[Moves.Grab] = Moves.Guard;
		RPSchart[Moves.Guard] = Moves.Attack;
	}
	
	modifier readyToAttack() {
		require(hasAttacked == false);
		_;
	}

	function fight(uint _move) public readyToAttack {
		require(_move < 3, "Choose between 0 (grab), 1 (Attack) and 2 (Guard)");
		hasAttacked = true;
		Moves opponentMove = choseNextMove();
		Moves playerMove = Moves(_move);
		if (RPSchart[playerMove] == opponentMove)
		{
			successfulMoves += 1;
		} else {
			successfulMoves = 0;
		}
		hasAttacked = false;
	}

	function choseNextMove() private returns (Moves) {
		Moves chosenMove = Moves(seed % 3);
		seed += uint160(address(this));
		return chosenMove;
	}
}
```

---

## Setup
Calling `nc IP port` gives us 3 options: start an instance, kill an instance and get flag. After starting an instance, we write the given details into environment variables as such:
```bash
export UUID           =  some-hex-string
export RPC            =  http://IP:PORT/UUID
export PRIVATE_KEY    =  32-byte-address
export PLAYER_ADDRESS =  20-byte-address
export CHALLENGE      =  20-byte-address
```

---

## Understand the contract
MillenniumKombat seems to be a game of rock-paper-scissors, `RPSchart` variable is a good giveaway. :)

In short, `RPSChart` is a mapping between the player's move and the move that it can win over. Just like rock > scissors.

The `seed` is initialized randomly, `readyToAttack()` is a modifier that acts as a lock for the `fight()` function, which counts our successful moves and calls `choseNextMove()`.

`choseNextMove()` is an interesting function, because here we can see the move is chosen as the remainder of seed divided by 3 and the seed is then incremented.


---

## Solve the problem
What this means is that we only need to brute-force the first correct move! From then on, incrementing the winning move with every call will put us on a winning streak - literally.

By retrying the same move we should get the first correct move in at most 3 tries.


Connect to the blockchain using the previously set environment variables:
```python
from web3 import Web3
import time
import os

UUID = os.getenv('UUID')
RPC_URL = os.getenv('RPC')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
PLAYER_ADDRESS = os.getenv('PLAYER_ADDRESS')
CHALLENGE_ADDRESS = os.getenv('CHALLENGE')

# Insert contract ABIs here

w3 = Web3(Web3.HTTPProvider(RPC_URL))
assert w3.is_connected(), "RPC connection failed"
setup_contract = w3.eth.contract(address=CHALLENGE_ADDRESS, abi=SETUP_ABI)
contract = w3.eth.contract(address=CHALLENGE_ADDRESS, abi=MK_ABI)

```

Helper functions:
```python
def send_fight(move):
    tx = contract.functions.fight(move).build_transaction({
        "from": PLAYER_ADDRESS,
        "nonce": w3.eth.get_transaction_count(PLAYER_ADDRESS),
        "gas": 200_000,
        "gasPrice": w3.eth.gas_price,
    })
    signed = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    w3.eth.wait_for_transaction_receipt(tx_hash)

def successful_moves():
    return contract.functions.successfulMoves().call()

def get_winning_move(opponent_move):
    if opponent_move == 0: 
        return 1 
    elif opponent_move == 1:  
        return 2
    else:
        return 0 
```

Brute force the first move (at most 3 rounds):
```python
won = False
while not won:
    send_fight(0)
    
    if successful_moves() > 0:
        print("First win!")
        won = True
    else:
        print("Fail")
```

 Infer the rest of the moves:
```python
last_move = 0
for i in range(100):
    current_move = (last_move + 1) % 3 # increment move to be played
    
    send_fight(current_move)
    sm = successful_moves()
    print(f"{i+1} current move: {current_move}, nr. of wins: {sm}")
    
    last_move = current_move
    
    if sm >= 100:
        break
    
    time.sleep(0.2)
```

### Get the flag
Congratulations! You have solved it! Here's the flag:

`HACKDAY{6954de044483cfd38491854328f846d6ac76005b8e1e459aa68dd4c443ceae14}`