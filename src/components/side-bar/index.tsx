import Linked from "@/src/ui/link";
import { Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();

  const links = [
    { url: "/leaderboard/", label: "Leaderboard" },
    { url: "/follow/", label: "Follow" },
    { url: "/settings/", label: "Settings" },
    { url: "/vaults/", label: "Vault" },
  ];

  return (
    <Box p={4} w={"200px"}>
      <VStack alignItems={"flex-start"}>
        {links.map((link) => {
          const isActive = router.asPath === link.url;
          return (
            <Linked
              key={link.url}
              href={link.url}
              label={link.label}
              sx={{
                fontWeight: isActive ? "700" : "200",
                borderBottomColor: isActive ? "selected" : "transparent",
                borderBottomStyle: "solid",
                borderBottomWidth: "2px",
                _hover: {
                  textDecoration: "none",
                  opacity: 0.9,
                },
              }}
            />
          );
        })}
      </VStack>
    </Box>
  );
};

export default SideBar;
