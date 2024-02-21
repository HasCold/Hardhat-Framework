// Mocha Framework
// Chai Library   --   For the Unit Testing
// https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html

import { expect, use} from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);
// const { ethers } = require("hardhat");
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Token contract", function(){

    // Created the "it block" for every smart contract function for which you have to test; 

    it("Deployment should assign the total supply of tokens to the owner", async function(){
        
        const [owner] = await ethers.getSigners();  // getSigners() is a object in which there is a account addresses and their balance we can access;
        // console.log(owner);
        const Token = await ethers.getContractFactory("Token");   // This is the way to create the Instance of our contract
        // After the deployment into the hardhat environment so we have store our Instance in to the hardhatToken;
        const hardhatToken = await Token.deploy();   
        // console.log("Hardhat Token:-", hardhatToken);
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        // console.log("Owner", ownerBalance);

        expect(await hardhatToken.totalSupply().value).to.equal(ownerBalance.value);  // we are using the hardhatToken because our instance is now stored into it

    });

    it("Should transfer tokens between accounts", async function(){
        
        const [owner, addr1, addr2] = await ethers.getSigners();
        // console.log(addr1 ,"-------------------", addr2);
        const Token = await ethers.getContractFactory("Token");   // Token contract Instance
        const hardhatToken = await Token.deploy();   // Deploy contract

        // Transfer 10 tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 10);  // After making the Instance and deploy onto the Hardhat we can access the contract function which is the transfer
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(Number(addr1Balance)).to.equal(10);

        // Transfer 5 tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address, 5);  //  This allows you to perform transactions using the permissions of the addr1 account
        const addr2Balance = await hardhatToken.balanceOf(addr2.address);
        expect(addr2Balance.toNumber()).to.equal(5);

    });
});
