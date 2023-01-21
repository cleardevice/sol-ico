const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // Address of the Crypto Devs NFT contract that you deployed in the previous module
  const cryptoDevsNFTContract = CRYPTO_DEVS_NFT_CONTRACT_ADDRESS;

  /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so cryptoDevsTokenContract here is a factory for instances of our CryptoDevToken contract.
    */
  const cryptoDevsTokenContract = await ethers.getContractFactory(
    "CryptoDevToken"
  );

  // deploy the contract
  const deployedCryptoDevsTokenContract = await cryptoDevsTokenContract.deploy(
    cryptoDevsNFTContract
  );

  console.log(
    `Contract deployed to ${deployedCryptoDevsTokenContract.address} on ${network.name}`
  );

  const WAIT_BLOCK_CONFIRMATIONS = 6;
  console.log(`Waiting for ${WAIT_BLOCK_CONFIRMATIONS} confirmations...`);

  await deployedCryptoDevsTokenContract.deployTransaction.wait(
    WAIT_BLOCK_CONFIRMATIONS
  );

  // print the address of the deployed contract
  console.log(
    "Crypto Devs Token Contract Address:",
    deployedCryptoDevsTokenContract.address
  );

  console.log(`Verifying contract on Etherscan...`);

  await run(`verify:verify`, {
    address: deployedCryptoDevsTokenContract.address,
    constructorArguments: [cryptoDevsNFTContract],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
