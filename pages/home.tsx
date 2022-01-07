import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Home() {
  useProtectedPage();

  return (
    <Flex flexDir="column" alignContent="center" textAlign="center">
      <Heading size="lg">Home</Heading>

      <Text>
        If you're a creator, click the creator button. If you're a claimer,
        click the claimer button.
      </Text>

      <Flex
        flexDir="row"
        sx={{
          button: {
            margin: "1rem",
          },
        }}
        justifyContent="center"
      >
        <Button colorScheme="blue">Creator</Button>

        <Button colorScheme="green">Claimer</Button>
      </Flex>
    </Flex>
  );
}
