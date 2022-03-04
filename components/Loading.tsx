import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      align="center"
      justify="center"
      flexDir="column"
      backgroundColor={"rgb(196, 196, 196)"}
      minH="100vh"
    >
      <Spinner size="md" color="black" />
    </Flex>
  );
}
