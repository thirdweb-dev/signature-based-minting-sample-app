import QRCode from "qrcode";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { SignedPayload } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";
import useClaimLink from "../hooks/useClaimLink";

export default function QrCode({ sig }: { sig: SignedPayload }) {
  const endTimeHex = Number((sig.payload.mintEndTime as any).hex);
  const endTime = new Date(endTimeHex * 1000);

  const claimLink = useClaimLink(sig);

  const [qrCodeData, setQrCodeData] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await QRCode.toDataURL(claimLink);
      console.log("Generating new qr data");
      setQrCodeData(data);
    })();
  }, [claimLink, qrCodeData, sig]);

  return (
    <Flex flexDir={"column"} mt={4} alignItems="center">
      <Heading color={"white"} size={"md"} mb={4}>
        Minting ends at {endTime.toLocaleTimeString()}{" "}
        {endTime.toLocaleDateString()}
      </Heading>

      <Box maxW={"400px"} width={"400px"} mb={8}>
        <a href={claimLink} target="_blank">
          <img src={qrCodeData}></img>
        </a>
      </Box>
    </Flex>
  );
}
