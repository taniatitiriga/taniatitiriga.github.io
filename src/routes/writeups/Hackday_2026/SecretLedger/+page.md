# Secret Ledger

A simple challenge about interacting with a contract on the Ethereum blockchain

**Event**: Hackday Quals 2026

**Category**: web3

**Difficulty**: intro

**Points**: 100

**Solves**: 149

---

## Challenge description
The team found the blueprint of a distributed ledger prototype from Millenium Systems. They even found the documentation but to go further it needs a password ...
> IP:port

**SecretLedger.sol**:
```java
// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract SecretLedger {
    bool public locked = true;

    function unlockContract(string memory password) public {
        if (keccak256(bytes(password)) == keccak256("MilleniumSecretBlockchain")) {
            locked = false;
        }
    }

    function isSolved() public view returns (bool) {
        return locked == false;
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
The challenge is solved (or `isSolved()`) when we manage to set `locked` variable to be `false`, by calling `unlockContract()`.

`unlockContract` expects the hash of the input password to be equal to the hash of "MilleniumSecretBlockchain", so what we have to do is call the function `unlockContract` and pass this password as the argument.

---

## Solve the problem
Using foundry https://getfoundry.sh/cast/reference/cast/#cast CLI:

``` bash
~$ cast send $CHALLENGE "unlockContract(string)" "MilleniumSecretBlockchain" --rpc-url $RPC --private-key $PRIVATE_KEY
Error: deserialization error: missing field effectiveGasPrice at line 1 column 949
```

I resolved this problem adding the `--legacy` flag as suggested here: https://github.com/foundry-rs/foundry/issues/7640
Calling `isSolved()` should also return true now.

```bash
~$ cast send $CHALLENGE "unlockContract(string)" "MilleniumSecretBlockchain" --rpc-url $RPC --private-key $PRIVATE_KEY --legacy
Error: deserialization error: missing field feePayer at line 1 column 1008

~$ cast call $CHALLENGE "isSolved()(bool)" --rpc-url $RPC
true
```

### Get the flag
Now we can call get flag option!

`HACKDAY{7ca4daca05e9065c2c9b8ed9305c6766a699bccddb0b2e876f55de670d2364f1}`