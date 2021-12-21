require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { wallet_private_key, polygonscan_api_key } = require("./secret.json");

module.exports = {
    networks: {
        hardhat: {
            chainId: 1337,
        },
        mumbai: {
            url: "https://polygon-mumbai.infura.io/v3/ee989c7e98d1448ab018c2c4f83c00ca",
            accounts: [wallet_private_key],
            gasPrice: 8000000000,
        },
        mainnet: {
            url: "https://polygon-mainnet.infura.io/v3/ee989c7e98d1448ab018c2c4f83c00ca",
            accounts: [wallet_private_key],
            gasPrice: 8000000000,
        },
    },
    etherscan: {
        apiKey: polygonscan_api_key,
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};
