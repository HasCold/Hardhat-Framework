/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

const INFURA_API_KEY = "6a10424f5c524590a79419e129c80526";
const SEPOLIA_PRIVATE_KEY = "72fe789a6074fc1af881dcf60633ef0cb6567837f59bb62f0d1af918fa4042d9";

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
