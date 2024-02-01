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
