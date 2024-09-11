import { extendTheme } from "@chakra-ui/react";
import { BACKGROUND_COLOR } from "./constants";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: BACKGROUND_COLOR,
      },
    },
  },
});

export default theme;
