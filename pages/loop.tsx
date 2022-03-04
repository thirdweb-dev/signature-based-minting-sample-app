import { Box, Flex, Heading, Progress, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QrCode from "../components/QrCode";
import useNewQr from "../hooks/useNewQr";
import useRefreshInterval from "../hooks/useRefreshInterval";

export default function LoopPage() {
  const { failing, signedPayload, nextRefreshTime } = useNewQr();

  const NEXT_PUBLIC_REFRESH_IN_MS = useRefreshInterval();

  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const s = Math.floor(nextRefreshTime - Date.now());
      console.log(s);
      setSecondsLeft(s);
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, [nextRefreshTime]);

  const progress =
    100 - Math.floor((secondsLeft / NEXT_PUBLIC_REFRESH_IN_MS) * 100);

  if (!signedPayload) {
    return (
      <Flex>
        <Spinner color="white" size={"lg"} />
      </Flex>
    );
  }

  return (
    <Flex flexDir={"column"} justifyContent="center">
      <Box>
        <QrCode sig={signedPayload}></QrCode>
      </Box>

      <Flex flexDir={"column"} alignItems="center">
        <Heading size={"md"} color="white" mb={6}>
          New NFT Coming Up...
        </Heading>
        <Box width={"500px"}>
          <Progress
            h={"20px"}
            borderRadius={"45px"}
            value={progress}
            id="hello"
            size={"sm"}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
