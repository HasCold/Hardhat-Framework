
async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("Deployer Contract with the account: ", deployer.address);  

    const Token = await ethers.getContractFactory("Token");  // create the instance of our contract
    const token = await Token.deploy();   // Now deploy the instance of token contract into Hardhat environment
    console.log("Token address:", await token.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});


// In the provided code snippet, process.exit(0) is called within the .then() block of the main() function. This means that after the main() function has executed successfully (resolved), the Node.js process will be terminated with an exit code of 0, indicating successful completion.

// Similarly, if there's an error during the execution of the main() function and it gets caught in the .catch() block, process.exit(1) will be called, terminating the process with an exit code of 1, indicating an error.