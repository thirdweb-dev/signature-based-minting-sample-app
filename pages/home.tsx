import { Flex, Heading } from "@chakra-ui/react";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Home() {
  useProtectedPage();

  return (
    <Flex>
      <Heading>Creator Home</Heading>
    </Flex>
  );
}
