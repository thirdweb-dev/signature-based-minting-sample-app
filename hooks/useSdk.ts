import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers, Signer } from "ethers";

export default function useSdk() {
  const { provider } = useWeb3();

  const sdk = new ThirdwebSDK(ethers.getDefaultProvider(provider?.chainId));

  return sdk;
}
