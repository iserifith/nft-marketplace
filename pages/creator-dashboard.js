import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Gallery from "../components/Gallery";

export default function CreatorDashboard() {
    const [nfts, setNfts] = useState([]);
    const [sold, setSold] = useState([]);
    const [loadingState, setLoadingState] = useState("not-loaded");

    useEffect(() => {
        loadNFTs();
    }, []);

    async function loadNFTs() {
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
        });
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const marketContract = new ethers.Contract(
            nftMarketAddress,
            Market.abi,
            signer
        );
        const tokenContract = new ethers.Contract(
            nftAddress,
            NFT.abi,
            provider
        );

        console.log(marketContract);
        const data = await marketContract.fetchItemsCreated();

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
                    sold: i.sold,
                    image: meta.data.image,
                    name: meta.data.name,
                    description: meta.data.description,
                };
                return item;
            })
        );
        const soldItems = items.filter((i) => i.sold);
        setSold(soldItems);
        setNfts(items);
        setLoadingState("loaded");
    }

    if (loadingState === "loaded" && !nfts.length)
        return (
            <h1 className="px-20 py-10 text-3xl text-white font-mono font-semibold">
                No assets created
            </h1>
        );

    return <Gallery nfts={nfts} />;
}
