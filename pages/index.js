import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Gallery from "../components/Gallery";

export default function Home() {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState("not-loaded");

    useEffect(() => {
        loadNFTs();
    }, []);

    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://polygon-mumbai.infura.io/v3/ee989c7e98d1448ab018c2c4f83c00ca"
        );
        const tokenContract = new ethers.Contract(
            nftAddress,
            NFT.abi,
            provider
        );

        const marketContract = new ethers.Contract(
            nftMarketAddress,
            Market.abi,
            provider
        );
        const data = await marketContract.fetchMarketItems();

        const items = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await tokenContract.tokenURI(i.tokenId);
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatUnits(
                    i.price.toString(),
                    "ether"
                );
                let item = {
                    price,
                    tokenId: i.tokenId.toNumber(),
                    seller: i.seller,
                    owner: i.owner,
                    sold: false,
                    image: meta.data.image,
                    name: meta.data.name,
                    description: meta.data.description,
                };
                return item;
            })
        );
        setNfts(items);
        setLoadingState("loaded");
    }

    async function buyNft(nft) {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const network = await provider.getNetwork();
            if (network.chainId !== 80001) {
                throw new Error(
                    "Wrong network. Please change to Polygon Mumbai Testnet"
                );
            }
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                nftMarketAddress,
                Market.abi,
                signer
            );

            const transaction = await contract.createMarketSale(
                nftAddress,
                nft.tokenId,
                {
                    value: ethers.utils.parseEther(nft.price, "ether"),
                }
            );
            await transaction.wait();
            loadNFTs();
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    const _renderButton = (nft) => {
        return (
            <button
                className="w-full py-2 px-12 font-mono font-semibold bg-gradient-to-r from-gradient-1-start to-gradient-1-stop outline-none focus:out text-white placeholder-gray-100 rounded"
                onClick={() => buyNft(nft)}
            >
                Buy
            </button>
        );
    };

    if (loadingState === "loaded" && !nfts.length)
        return (
            <h1 className="px-20 py-10 text-3xl text-white font-mono font-semibold">
                No items in marketplace
            </h1>
        );

    return <Gallery nfts={nfts} renderButton={_renderButton} />;
}
