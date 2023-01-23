const hre = require("hardhat");

async function main() {
  const BlockNyteToken = await hre.ethers.getContractFactory("BlockNyteToken");
  const blockNyteToken = await BlockNyteToken.deploy(100000000, 50);

  await blockNyteToken.deployed();

  console.log("BlockNyte Token deployed: ", blockNyteToken.address);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
