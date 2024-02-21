// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.5.0 < 0.9.0;

import "hardhat/console.sol";

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HHT";
    uint256 public totalSupply = 10000;

    address public owner;

    mapping(address => uint) balances;

    constructor(){  // When the compilation occurs the constructor function will run at the compile time and executes only once; 
        balances[msg.sender] = totalSupply;  // Jo bhi is contract ko deploy kraha ha hum uske address pr balance dal rahe ha
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log("**Sender balance is %s token", balances[msg.sender]);
        console.log("**Sender is sending %s tokens to %s address", amount, to);

        require(balances[msg.sender] >= amount, "Not enough tokens");  // Check the coming amount is not greater than the already existing  balance account

        balances[msg.sender] -= amount;   // balances[msg.sender] = balances[msg.sender] - amount;  Deduct the main balance amount from the incoming amount
        balances[to] += amount; // However, directly assigning the value like in this way balances[to] = amount; would overwrite any existing balance the recipient might have had.
    }

    function balanceOf(address account) view external returns(uint256){
        return balances[account];
    }
}


// For testing the smart contract, we use the Mocha Framework along with the Chai Library.