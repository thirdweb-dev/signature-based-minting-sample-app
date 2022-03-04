import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import { ConnectWallet } from "@3rdweb/react";
import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { SignedPayload } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useClaimStatus from "../hooks/useClaimStatus";
import useSdk from "../hooks/useSdk";

const NEXT_PUBLIC_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;
const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export default function ClaimCode() {
  const router = useRouter();

  const sig: string = router.query.sig as string;

  const code: SignedPayload | undefined =
    sig !== undefined && sig !== "undefined"
      ? JSON.parse(atob(sig) || "{}")
      : undefined;

  const { provider, chainId, connectWallet, address } = useWeb3();
  const { switchNetwork } = useSwitchNetwork();

  const [claiming, setClaiming] = useState(false);

  const toast = useToast();

  const sdk = useSdk({
    signer: provider?.getSigner(),
    chainId: 80001, // TODO: extract from env
  });

  const module = sdk?.getNFTCollection(NEXT_PUBLIC_CONTRACT_ADDRESS);

  const isValid = useClaimStatus(code);

  const expired = code
    ? Math.floor(Date.now() / 1000) >
      parseInt((code?.payload.mintEndTime as any).hex, 16)
    : false;

  const claim = useCallback(async () => {
    if (!code) {
      return;
    }

    if (80001 !== chainId) {
      await switchNetwork(80001 as number);
    }

    await module?.signature.mint(code);
  }, [chainId, sig, module, switchNetwork, code]);

  if (!isValid || expired) {
    return (
      <Flex mt={2} flexDir={"column"} m={12}>
        <Heading size={"lg"} color="red" textAlign={"center"}>
          This code has expired/already been claimed!
        </Heading>
      </Flex>
    );
  }

  return (
    <Flex mt={2} flexDir={"column"} m={12}>
      <Heading size={"lg"} color="white" textAlign={"center"}>
        Claim the '{code?.payload.metadata.name}' NFT
      </Heading>

      {address ? (
        <Button
          mt={2}
          colorScheme={"green"}
          isLoading={claiming}
          color="white"
          onClick={async () => {
            setClaiming(true);
            try {
              await claim();
            } catch (err: any) {
              console.error(err);
              toast({
                title: "Failed to claim",
                status: "error",
                description: err.message,
              });
            } finally {
              setClaiming(false);
            }
          }}
        >
          Claim This NFT
        </Button>
      ) : (
        <ConnectWallet></ConnectWallet>
      )}
    </Flex>
  );
}
