import React from "react";
import dynamic from "next/dynamic";
const ModelRenderer = dynamic(() => import("./ModelRenderer"), {
    ssr: false,
});

const Gallery = ({ nfts, renderButton }) => {
    return (
        <div className="flex justify-center">
            <div className="px-4" style={{ maxWidth: "1600px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {nfts.map((nft, i) => (
                        <div
                            key={i}
                            className="rounded-xl overflow-hidden shadow-xl bg-main-light"
                        >
                            {process.browser && (
                                <ModelRenderer
                                    gltfLink={nft.image}
                                    height={350}
                                    width={350}
                                />
                            )}

                            <div className="p-4">
                                <p
                                    style={{ height: "64px" }}
                                    className="text-2xl font-semibold font-mono text-gray-200"
                                >
                                    {nft.name}
                                </p>
                                <div
                                    style={{
                                        height: "70px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <p className="text-gray-400 font-mono">
                                        {nft.description}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-2xl mb-4 font-bold text-white font-mono">
                                    {nft.price} MATIC
                                </p>

                                {typeof renderButton === "function" &&
                                    renderButton(nft)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
