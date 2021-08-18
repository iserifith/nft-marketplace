import "../styles/globals.css";
import Link from "next/link";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script
                src="https://kit.fontawesome.com/161798ceba.js"
                crossOrigin="anonymous"
            ></Script>
            <div className="min-w-fullscreen min-h-fullscreen bg-main">
                <nav className="p-6">
                    <p className="text-4xl font-black text-gray-100">
                        NFT Marketplace
                    </p>
                    <div className="flex mt-4">
                        <Link href="/">
                            <a className="mr-4 text-gray-200 font-bold font-mono">
                                Home
                            </a>
                        </Link>
                        <Link href="/create-item">
                            <a className="mr-6 text-gray-200 font-bold font-mono">
                                Sell Digital Asset
                            </a>
                        </Link>
                        <Link href="/my-assets">
                            <a className="mr-6 text-gray-200 font-bold font-mono">
                                My Digital Assets
                            </a>
                        </Link>
                        <Link href="/creator-dashboard">
                            <a className="mr-6 text-gray-200 font-bold font-mono">
                                Creator Dashboard
                            </a>
                        </Link>
                        <Link href="/about">
                            <a className="mr-6 text-gray-200 font-bold font-mono">
                                About
                            </a>
                        </Link>
                    </div>
                </nav>
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;
