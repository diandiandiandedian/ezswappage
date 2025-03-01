import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import nextConfig from "../next.config.js";
import styles from "./home/index.module.scss";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        console.log('router', router)
        if (router.asPath === "/#/launchpadList") {
            const isProd = nextConfig.publicRuntimeConfig.env.API === "dev2";
            if (isProd) {
                window.location.href = 'https://launchpad.ezswap.io/#/launchpadList'
            } else {
                window.location.href = 'https://test.ezswap.io/#/launchpadList'
            }
        } else if (router.asPath.indexOf("/#/launchpad/mint") !== -1) {
            const isProd = nextConfig.publicRuntimeConfig.env.API === "dev2";
            if (isProd) {
                window.location.href = 'https://launchpad.ezswap.io' + router.asPath
            } else {
                window.location.href = 'https://test.ezswap.io' + router.asPath
            }
        } else {
            // router.replace("/home");
        }
    }, []);

    const [screenWidth, setScreenWidth] = useState();
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    });

    return (
        <div className="min-[1700px]:flex min-[1700px]:flex-col min-[1700px]:items-center">
            <div className={"flex flex-col items-center " + styles.divBackground}>
                <div className="max-[1250px]:ml-10 min-[1500px]:ml-20  ml-14 min-[1700px]:ml-32  max-[800px]:ml-0">
                    {screenWidth > 800 ?
                        // web
                        <div className="flex items-center mt-20 backdrop-blur-sm">
                            <div className="flex items-center">
                                <img src="/logo256.png" className="w-[200px]" alt=""/>
                                <img className="ml-14 mr-20 max-[800px]:mr-6 max-[800px]:ml-5" src="/bannertiao.png" alt=""/>
                            </div>
                            <div className="text-white">
                                <div className={"min-[1110px]:text-7xl min-[1400px]:text-[5rem] text-5xl font-bold mb-8 max-[800px]:text-3xl min-[1700px]:mr-10 min-[1700px]:text-8xl " + styles.titleStroke}>EZswap Protocol</div>
                                <div className="font-bold text-2xl max-[105000px]:text-xl ">
                                    <div>Multi-Chain NFT & Inscription DEX Protocol</div>
                                    <div className="mt-1">The First Gaming & Inscription Assets Market Making</div>
                                    <div className="mt-1">Support ERC 404, ERC 721, ERC 1155</div>
                                </div>
                            </div>
                        </div> :
                        // 移动端
                        <div className="min-[799px]:pl-40 mt-10 backdrop-blur-sm px-10 pt-3">
                            <div className="flex items-center justify-center">
                                <img src="/logo256.png" className="w-[80px]" alt=""/>
                                <img className="ml-14 mr-20 max-[800px]:mr-6 max-[800px]:ml-5 h-[90px]" src="/bannertiao.png" alt=""/>
                                <div className={"text-9xl font-bold max-[800px]:text-4xl text-white " + styles.titleStroke}>EZswap Protocol</div>
                            </div>
                            <div className="text-white mt-6">
                                <div className="font-bold text-2xl max-[800px]:text-xs ">
                                    <div>Multi-Chain NFT & Inscription DEX Protocol</div>
                                    <div className="mt-2">The First Gaming & Inscription Assets Market Making</div>
                                    <div className="mt-2">Support ERC 404, ERC 721, ERC 1155</div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className=" pt-16 max-[800px]:pl-10">
                        <div>
                            <span className="color-[#2ed1d8] font-bold text-4xl">Featured Projects</span>
                            <img className="mt-5 mb-10 max-[800px]:w-[85%]" src="/Vector.png" alt=""/>
                        </div>
                        <div className="flex max-[800px]:flex-col max-[800px]:mr-10 min-[800px]:flex-wrap min-[1070px]:flex-nowrap min-[800px]:gap-y-5 min-[1070px]::gap-y-0">
                            {/*第一个item*/}
                            <div className="bg-black border border-[#737373] rounded-md pt-10 pb-7 max-[800px]:pb-4 text-white min-[799px]:mr-5 max-[1500px]:h-[240px] max-[1250px]:w-[330px] max-[1300px]:w-[380px] max-[1500px]:w-[400px] max-[1700px]:w-[455px] w-[500px]">
                                {/*最外面上下布局*/}
                                <div className="flex items-center pl-8 pr-5 max-[800px]:pr-1 max-[800px]:pl-5">
                                    {/*里面左右布局*/}
                                    <img className="w-[50px]" src="/logo256.png" alt=""/>
                                    <div className="ml-8 max-[800px]:ml-5">
                                        <div className="text-4xl max-[1500px]:text-3xl font-bold max-[800px]:text-3xl max-[1250px]:text-2xl">EZswap Protocol</div>
                                        <div className="text-sm mt-1 max-[800px]:text-xs">The Premier Game Assets and Meme DEX Protocol</div>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4 min-[1500px]:mt-7 ml-4 max-[800px]:mr-1 min-[800px]:mr-10  max-[800px]:ml-5 justify-center">
                                    {/*<img src="/ezline.svg" className="h-[70px] w-[150px]" alt=""/>*/}
                                    <div className="flex flex-col mt-1 max-[800px]:flex-col max-[800px]:items-start	">
                                        <a href="https://www.gate.io/zh/trade/EZSWAP_USDT" className="flex items-center underline"><img className="min-[800px]:ml-4 w-[20px] mr-2" src="/gate.io-logo.svg" alt=""/><span className="text-sm whitespace-nowrap">Buy on Gate</span></a>
                                        <a href="https://www.bitget.com/zh-CN/spot/EZSWAPUSDT" className="flex items-center underline mt-2"><img className="w-[20px] min-[800px]:ml-4  mr-2" src="/bitget-logo.svg" alt=""/><span className="text-sm whitespace-nowrap">Buy on Bitget</span></a>
                                    </div>
                                    <div className="ml-8">
                                        <div className="text-[#3ACD37] text-5xl font-bold max-[800px]:text-3xl  max-[1250px]:text-[2rem]"><span className="mr-1">+</span>2600%</div>
                                        <div className="text-[7px] text-center text-[#9B9B9B] mt-2">ATH since Launch</div>
                                    </div>
                                </div>
                            </div>
                            {/*第二个item*/}
                            <a href="https://twitter.com/echomkts">
                                <div className="max-[1250px]:px-4 flex flex-col items-center bg-black border border-[#737373] rounded-md pt-10 pb-7 max-[800px]:mt-7  text-white min-[799px]:mr-5 max-[1500px]:h-[240px] max-[1250px]:w-[330px]  max-[1300px]:w-[380px] max-[1500px]:w-[400px] max-[1700px]:w-[455px] min-[1500px]:h-[248.5px] max-[1700px]:h-[248.5px] w-[500px]">
                                    {/*最外面上下布局*/}
                                    <div>
                                        <div className="flex items-center max-[800px]:pr-1 max-[800px]:pl-5">
                                            {/*里面左右布局*/}
                                            <img className="w-[50px]" src="https://ezonline.s3.us-west-2.amazonaws.com/echo_img2.png" alt=""/>
                                            <div className="ml-8 max-[800px]:ml-5">
                                                <div className="text-4xl max-[1500px]:text-3xl font-bold max-[800px]:text-3xl max-[1250px]:text-2xl">ECHO 404</div>
                                                <div className="text-sm mt-1 max-[800px]:text-xs">The First EOS EVM Smart Inscription (404)</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-7 max-[800px]:ml-5">
                                            <img src="/line1.png" className="h-[80px]" alt=""/>
                                            <div className="ml-3">
                                                <div className="text-[#3ACD37] text-5xl font-bold max-[800px]:text-3xl  max-[1250px]:text-[2rem]"><span className="mr-1">+</span>330%</div>
                                                <div className="text-[7px] text-center text-[#9B9B9B] mt-2">ATH since Launch</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {/*第三个item*/}
                            <a href="https://twitter.com/mars404_manta">
                                <div className="flex flex-col items-center bg-black border border-[#737373] rounded-md pt-10 pb-7 text-white max-[800px]:mt-7 min-[799px]:mr-5  max-[1500px]:h-[240px] max-[1250px]:w-[330px]  max-[1300px]:w-[380px] max-[1500px]:w-[400px] max-[1700px]:w-[455px] min-[1500px]:h-[248.5px] max-[1700px]:h-[248.5px] w-[500px]">
                                    {/*最外面上下布局*/}
                                    <div>
                                        <div className="flex items-center max-[800px]:pr-1  max-[800px]:pl-5">
                                            {/*里面左右布局*/}
                                            <img className="w-[50px]" src="https://ezonline.s3.us-west-2.amazonaws.com/marsimage.jpeg" alt=""/>
                                            <div className="ml-8 max-[800px]:ml-5">
                                                <div className="text-4xl max-[1500px]:text-3xl font-bold max-[800px]:text-3xl max-[1250px]:text-2xl">Mars 404</div>
                                                <div className="text-sm mt-1 max-[800px]:text-xs">Manta 404</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-7 max-[800px]:ml-5">
                                            <img src="/line2.svg" className="h-[80px]" alt=""/>
                                            <div className="ml-3">
                                                <div className="text-[#3ACD37] text-5xl font-bold max-[800px]:text-3xl max-[1250px]:text-[2rem]"><span className="mr-1">+</span>4001%</div>
                                                <div className="text-[7px] text-center text-[#9B9B9B] mt-2">ATH since Launch</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                        </div>
                    </div>
                    <div className="pt-16 max-[800px]:pl-10 max-w-[1700px]">
                        <div>
                            <span className="color-[#2ed1d8] font-bold text-4xl max-[800px]:text-3xl">Ecosystem</span>
                            <img className="mt-5 mb-10 max-[800px]:w-[85%]" src="/Vector.png" alt=""/>
                        </div>
                        <div className="flex flex-wrap mb-16 max-[800px]:mt-10 gap-10  min-[800px]:mr-20">
                            <img className="w-[140px] object-contain max-[800px]:w-[24%]" src="/logo/Gate.png" alt=""/>
                            <img className="w-[140px] object-contain max-[800px]:w-[24%]" src="/logo/bitget.png" alt=""/>
                            <img className="w-[140px] object-contain max-[800px]:w-[24%]" src="/logo/mantap.png" alt=""/>
                            <img className="w-[160px] object-contain max-[800px]:w-[24%]" src="/logo/Polygonp.png" alt=""/>
                            <img className="w-[160px] object-contain max-[800px]:w-[24%]" src="/logo/arb.png" alt=""/>
                            <img className="w-[140px] object-contain max-[800px]:w-[24%]" src="/logo/eosp.png" alt=""/>
                            <img className="w-[160px] object-contain max-[800px]:w-[24%]" src="/logo/zksync.png" alt=""/>
                        </div>
                        <div>
                            <span className="color-[#2ed1d8] font-bold text-4xl max-[800px]:text-3xl">Business Partner</span>
                            <img className="mt-5 mb-10 max-[800px]:w-[85%]" src="/Vector.png" alt=""/>
                        </div>
                        <div className="flex flex-wrap mb-32 max-[800px]:mt-10 gap-10 min-[800px]:mr-20">
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9873.PNG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9874.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9875.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9876.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9877.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9878.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9879.PNG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9880.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9881.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9882.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9883.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9884.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9885.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9886.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9887.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9888.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9889.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9890.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9891.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9892.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9893.PNG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9894.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9895.PNG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9896.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9897.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9898.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9899.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9900.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9901.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9902.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9903.JPG" alt=""/>
                            <img className="w-[6%] max-[800px]:w-[20%]" src="/game/IMG_9905.JPG" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
