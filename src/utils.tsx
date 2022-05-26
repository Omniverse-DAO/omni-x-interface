import { useColorModeValue } from "@chakra-ui/react";

export const usePrimaryBg = () => {
  return useColorModeValue("primaryBg.light", "primaryBg.dark");
};

export const useSecondaryBg = () => {
  return useColorModeValue("secondaryBg.light", "secondaryBg.dark");
};

export const usePrimaryTextColor = () => {
  return useColorModeValue("primaryText.light", "primaryText.dark");
};

export const useSecondaryTextColor = () => {
  return useColorModeValue("secondaryText.light", "secondaryText.dark");
};
