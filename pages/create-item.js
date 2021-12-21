import { useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import dynamic from "next/dynamic";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
const ModelRenderer = dynamic(() => import("../components/ModelRenderer"), {
    ssr: false,
});

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState("");

    const [formInput, updateFormInput] = useState({
        price: "",
        name: "",
        description: "",
    });
    const router = useRouter();

    async function onChange(e) {
        const file = e.target.files[0];
        const ext = file.name.match(/\.([^\.]+)$/)[1];
        try {
            if (!["glb", "gltf"].includes(ext)) {
                throw new Error("Invalid file type");
            }

            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`),
            });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            console.log({ url });
            setFileUrl(url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }
    async function createMarket() {
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) return;
        const data = JSON.stringify({
            name,
            description,
            image: fileUrl,
        });
        try {
            const added = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            createSale(url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    async function createSale(url) {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            const network = await provider.getNetwork();
            if (network.chainId !== 80001) {
                throw new Error(
                    "Wrong network. Please change to Polygon Mumbai Testnet"
                );
            }

            let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
            let transaction = await contract.createToken(url);
            let tx = await transaction.wait();
            let event = tx.events[0];
            let value = event.args[2];
            let tokenId = value.toNumber();
            const price = ethers.utils.parseUnits(formInput.price, "ether");

            contract = new ethers.Contract(
                nftMarketAddress,
                Market.abi,
                signer
            );
            let listingPrice = await contract.getListingPrice();
            listingPrice = listingPrice.toString();

            transaction = await contract.createMarketItem(
                nftAddress,
                tokenId,
                price,
                { value: listingPrice }
            );
            await transaction.wait();
            router.push("/");
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input
                    placeholder="Asset Name"
                    className="mt-8 p-4 font-mono font-semibold bg-gradient-to-r from-gradient-1-start to-gradient-1-stop outline-none focus:out text-white placeholder-gray-100 rounded"
                    onChange={(e) =>
                        updateFormInput({ ...formInput, name: e.target.value })
                    }
                />
                <textarea
                    placeholder="Asset Description"
                    className="mt-2 p-4 font-mono font-semibold bg-gradient-to-r from-gradient-1-start to-gradient-1-stop outline-none focus:out text-white placeholder-gray-100 rounded"
                    onChange={(e) =>
                        updateFormInput({
                            ...formInput,
                            description: e.target.value,
                        })
                    }
                />
                <input
                    placeholder="Asset Price in MATIC"
                    type="number"
                    className="mt-2 p-4 font-mono font-semibold bg-gradient-to-r from-gradient-1-start to-gradient-1-stop outline-none focus:out text-white placeholder-gray-100 rounded"
                    onChange={(e) =>
                        updateFormInput({ ...formInput, price: e.target.value })
                    }
                />
                {!fileUrl && (
                    <div className="my-4">
                        <div className="relative h-40 rounded-lg bg-gradient-to-r from-gradient-1-start to-gradient-1-stop flex justify-center items-center hover:cursor-pointer">
                            <div className="absolute">
                                <div className="flex flex-col items-center ">
                                    <i className="fa fa-cloud-upload fa-3x text-white"></i>
                                    <span className="block text-white font-semibold font-mono">
                                        Attach you files here
                                    </span>
                                    <span className="block text-white font-semibold font-mono">
                                        or
                                    </span>
                                    <span className="block text-white font-semibold font-mono">
                                        Browse files
                                    </span>
                                    <span className="block text-white font-semibold font-mono">
                                        Accepted file type: .gltf / .glb only
                                    </span>
                                </div>
                            </div>
                            <input
                                className="h-full w-full opacity-0"
                                type="file"
                                name="Asset"
                                accept=".glb,.gltf"
                                onChange={onChange}
                            />
                        </div>
                    </div>
                )}
                {fileUrl && process.browser && (
                    <ModelRenderer
                        gltfLink={fileUrl}
                        height={400}
                        width={400}
                    />
                )}
                <button
                    onClick={createMarket}
                    className="font-bold mt-4 text-white rounded p-4 shadow-lg bg-gradient-to-r from-gradient-1-start to-gradient-1-stop"
                >
                    Create Digital Asset
                </button>
            </div>
        </div>
    );
}
