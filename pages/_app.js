import { ThirdwebProvider } from "@3rdweb/react";
import { ChakraProvider } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

const supportedChainIds = [1, 4, 137];
const connectors = {
  injected: {},
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <ThirdwebProvider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThirdwebProvider>
    </ChakraProvider>
  );
};

export default MyApp;
