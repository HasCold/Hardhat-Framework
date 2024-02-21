// Mocha Framework
// Chai Library   --   For the Unit Testing
// https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html

import { expect, use} from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);
// const { ethers } = require("hardhat");
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe('Token Contract', () => {
    // Now we are using the Mocha framework
    let Token, hardhatToken, owner, addr1, addr2, addrs;

    // beforeEach() is a hook that runs before each test which we defined to avoid the repititon of code. 

    beforeEach(async() => {   // beforeEach is a hook which gives the Mocha framework
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();  
    });

    describe("Deployment", () => {

        // Created the "it block" for every smart contract function for which you have to test; 
        it("Should set the right owner", async () => {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            const totalSupplyAmount = await hardhatToken.totalSupply();
            expect(totalSupplyAmount.toNumber()).to.equal(ownerBalance.toNumber());
        });

    });

    describe("Transactions", () => {

        it("Should transfer tokens between accounts", async () => {
            // owner account to address account
            await hardhatToken.transfer(addr1.address, 5);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance.toNumber()).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address, 5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance.toNumber()).to.equal(5);
        });

        it("Should fail if sender doesn't have enough tokens", async () => {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(addr1).transfer(owner.address, 1))
            .to.be.revertedWith("Not enough tokens");  // if it get false then this statemnent will be reverted -- Initially addr1 have zero tokens 
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(Number(initialOwnerBalance));
        });

        it("Should update balances after transfers", async () => {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address, 5);
            await hardhatToken.transfer(addr2.address, 10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(Number(finalOwnerBalance)).to.equal(Number(initialOwnerBalance) - 15);

            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(Number(addr1Balance)).to.equal(5);
            
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(Number(addr2Balance)).to.equal(10);
        });
    });

});


// npx hardhat test

// HardhatToken functions : {
//     'balanceOf(address)': [FunctionFragment],
//       'name()': [FunctionFragment],
//       'owner()': [FunctionFragment],
//       'symbol()': [FunctionFragment],
//       'totalSupply()': [FunctionFragment],
//       'transfer(address,uint256)': [FunctionFragment]
// }