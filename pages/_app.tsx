/**
 * This is a decentralized trading platform launched by Razor-OnChain
 * Our group includes: Nguyen Trung Hieu (103488337), Nguyen Ngoc Gia Thinh (103809954), Bui Nguyen Khanh Linh (104226062)
 */
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sepolia } from "@thirdweb-dev/chains";

// Import additional chains from `@thirdweb-dev/chains` and pass them directly.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId="a52dadb035dc4029be806915f0db6d9d"
      activeChain={Sepolia}
    >
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
