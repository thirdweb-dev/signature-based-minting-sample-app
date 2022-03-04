import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import { SignedPayload } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";
import useSdk from "./useSdk";

const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export default function useClaimStatus(code?: SignedPayload) {
  const { provider } = useWeb3();
  const { switchNetwork } = useSwitchNetwork();

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const sdk = useSdk({
    signer: provider?.getSigner(),
    chainId: 80001, // TODO: extract to env var
  });

  const module = sdk?.getNFTCollection(NEXT_PUBLIC_CONTRACT_ADDRESS);

  useEffect(() => {
    if (isValid !== null || !module || !code) {
      return;
    }

    (async () => {
      console.log("code: ", code);
      const valid = await module.signature.verify(code);
      console.log("valid: ", valid);
      setIsValid(valid);
    })();
  }, [code, isValid, module, switchNetwork]);

  return isValid;
}
