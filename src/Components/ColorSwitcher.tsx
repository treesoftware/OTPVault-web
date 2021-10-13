import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

interface ColorSwitcherProps {
  authPage?: boolean;
}

export const ColorSwitcher: React.FC<ColorSwitcherProps> = ({ authPage }) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      position={authPage ? "absolute" : undefined}
      top={authPage ? "30px" : undefined}
      right={authPage ? "30px" : undefined}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
    />
  )
}