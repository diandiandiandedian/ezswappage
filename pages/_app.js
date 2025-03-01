import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  bitgetWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  tokenPocketWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
import NavBar from "@/components/bar/NavBar";
import { CollectionProvider } from "@/contexts/CollectionContext";
import { StrictMode } from "react";
import nextConfig from "../next.config.js";
import { Wallet } from "ethers";
import { LanguageProvider } from "@/contexts/LanguageContext.js";
import { mainnet, arbitrum, polygon, goerli } from "wagmi/chains";
import Footer from "../components/footer/Footer";
import { CollectionInfoProvider } from "@/contexts/CollectionInfoContext.js";
require("dotenv").config();

const arbsepolia = {
  id: 421614,
  name: "Arb Sepolia",
  network: "Arb Sepolia",
  iconBackground: "#008000",
  iconUrl: "/arbiscan.png",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
    default: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
  },
  blockExplorers: {
    default: {
      name: "pacific",
      url: "https://rinkeby-explorer.arbitrum.io/#/",
    },
    etherscan: {
      name: "pacific",
      url: "https://rinkeby-explorer.arbitrum.io/#/",
    },
  },
  testnet: true,
};

const mantatest = {
  id: 3441006,
  name: "Manta Testnet",
  network: "Manta Testnet",
  iconBackground: "#008000",
  iconUrl: "/manta.jpg",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://pacific-rpc.sepolia-testnet.manta.network/http"] },
    default: { http: ["https://pacific-rpc.sepolia-testnet.manta.network/http"] },
  },
  blockExplorers: {
    default: {
      name: "pacific",
      url: "https://pacific-explorer.sepolia-testnet.manta.network",
    },
    etherscan: {
      name: "pacific",
      url: "https://pacific-explorer.sepolia-testnet.manta.network",
    },
  },
  testnet: true,
};

const mantamain = {
  id: 169,
  name: "Manta Pacific",
  network: "Manta Pacific",
  iconBackground: "#008000",
  iconUrl: "/manta.jpg",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://pacific-rpc.manta.network/http"] },
    default: { http: ["https://pacific-rpc.manta.network/http"] },
  },
  blockExplorers: {
    default: {
      name: "pacific",
      url: "https://pacific-explorer.manta.network/",
    },
    etherscan: {
      name: "pacific",
      url: "https://pacific-explorer.manta.network/",
    },
  },
  testnet: false,
};

const eosevmtest = {
  id: 15557,
  name: "EOS EVM Testnet",
  network: "EOS EVM Testnet",
  iconBackground: "#008000",
  iconUrl: "/eos_chain.jpg",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS",
  },
  rpcUrls: {
    public: { http: ["https://api.testnet.evm.eosnetwork.com/"] },
    default: { http: ["https://api.testnet.evm.eosnetwork.com/"] },
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://explorer.testnet.evm.eosnetwork.com/",
    },
  },
  testnet: true,
};

const eosevmmain = {
  id: 17777,
  name: "EOS EVM",
  network: "EOS EVM",
  iconBackground: "#008000",
  iconUrl: "/eos_chain.jpg",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS",
  },
  rpcUrls: {
    public: { http: ["https://api.evm.eosnetwork.com/"] },
    default: { http: ["https://api.evm.eosnetwork.com/"] },
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://explorer.evm.eosnetwork.com/",
    },
  },
  testnet: false,
};

//  [mantatest, mantamain, eosevmtest, eosevmmain],

//old wagmi and rainbow kit versions
//----------------------------------------------------------------------------------

// const { chains, provider } = configureChains(
//     nextConfig.publicRuntimeConfig.env.API === 'prod' ? [mantamain, eosevmmain] : [mantatest, mantamain, eosevmtest, eosevmmain],
//   [publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: "xxx",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });

//latest wagmi and rainbow kit versions
//----------------------------------------------------------------------
const { chains, publicClient } = configureChains(
  nextConfig.publicRuntimeConfig.env.API === "dev2"
    ? [mantamain, mainnet, arbitrum, eosevmmain]
    : [mantamain, mainnet, arbitrum, mantatest, eosevmtest, eosevmmain, goerli, arbsepolia],
  [publicProvider()]
);

// const { chains, publicClient } = configureChains(
//   nextConfig.publicRuntimeConfig.env.API === "prod"
//     ? [mainnet, arbitrum, manta, mantaTestnet]
//     : [mainnet, arbitrum, manta, mantaTestnet, eos, eosTestnet],
//   [publicProvider()]
// );

// const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
const projectId = "5a003a01c2453d55c2475817334d9993";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      okxWallet({ projectId, chains }),
      injectedWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      bitgetWallet({ projectId, chains }),
      tokenPocketWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <LanguageProvider>
          <div className="grid h-full grid-rows-[80px,auto] sm:grid-rows-[126px,auto] auto-cols-auto">
            <NavBar></NavBar>
            <CollectionProvider>
              <CollectionInfoProvider>
                <Component {...pageProps} />
              </CollectionInfoProvider>
            </CollectionProvider>
            <Footer></Footer>
          </div>
        </LanguageProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
