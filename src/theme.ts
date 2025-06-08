import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        _dark: {
          bg: "gray.900",
        },
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: "blue.500",
      },
    },
  },
});

export default theme;
