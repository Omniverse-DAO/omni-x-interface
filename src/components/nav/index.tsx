import Logo from "@/src/components/logo";
import { Button, HStack } from "@chakra-ui/react";

const Nav = () => {
  return (
    <HStack height={"60px"} justifyContent="space-between" px={8}>
      <Logo />
      <Button variant={"solid"}>Connect Wallet</Button>
    </HStack>
  );
};

export default Nav;
