import { nftAddress, nftMarketAddress } from "../config";

export default function About() {
    return (
        <div className="flex justify">
            <div className="px-4" style={{ maxWidth: "1600px" }}>
                <p className="my-4 font-mono font-semibold text-2xl text-gray-300">
                    An NFT marketplace following the tutorial made by{" "}
                    <a
                        className="text-gradient-1-start"
                        target="_blank"
                        rel="noreferrer"
                        href="https://twitter.com/dabit3/status/1415330333424295939?s=20"
                    >
                        @dabit3
                    </a>{" "}
                    with some changes.
                </p>
                <p className="my-4 font-mono font-semibold text-2xl text-gray-300">
                    <a
                        className="text-gradient-1-start"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/iserifith/nft-marketplace"
                    >
                        Github
                    </a>{" "}
                    repository for this project.
                </p>
                <p className="my-4 font-mono font-semibold text-2xl text-gray-300">
                    View NFT Marketplace contract on{" "}
                    <a
                        className="text-gradient-1-start"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://mumbai.polygonscan.com/address/${nftMarketAddress}`}
                    >
                        polygonscan
                    </a>
                </p>
                <p className="my-4 font-mono font-semibold text-2xl text-gray-300">
                    View NFT contract on{" "}
                    <a
                        className="text-gradient-1-start"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://mumbai.polygonscan.com/address/${nftAddress}`}
                    >
                        polygonscan
                    </a>
                </p>
                <p className="my-4 font-mono font-semibold text-2xl text-gray-300">
                    Contracts is deployed on the Polygon Mumbai Testnet. Visit{" "}
                    <a
                        className="text-gradient-1-start"
                        target="_blank"
                        rel="noreferrer"
                        href="https://chainlist.org/"
                    >
                        chainlist.org
                    </a>{" "}
                    and search polygon testnet to add the network.
                </p>
            </div>
        </div>
    );
}
