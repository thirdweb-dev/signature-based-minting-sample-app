import { Flex } from "@chakra-ui/react";

const Layout: React.FC = ({ children }) => {
  return (
    <Flex
      flexDir={"column"}
      minH="100vh"
      minW={"100vw"}
      backgroundColor="black"
    >
      {children}
    </Flex>
  );
};

export default Layout;
