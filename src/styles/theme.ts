import { createTheme } from "@mui/material";

import OpenSansLight from "~/assets/fonts/OpenSans/OpenSans-Light.ttf";
import OpenSansRegular from "~/assets/fonts/OpenSans/OpenSans-Regular.ttf";
import OpenSansMedium from "~/assets/fonts/OpenSans/OpenSans-Medium.ttf";
import OpenSansSemiBold from "~/assets/fonts/OpenSans/OpenSans-SemiBold.ttf";
import OpenSansBold from "~/assets/fonts/OpenSans/OpenSans-Bold.ttf";
import OpenSansExtraBold from "~/assets/fonts/OpenSans/OpenSans-ExtraBold.ttf";

import OpenSansLightItalic from "~/assets/fonts/OpenSans/OpenSans-LightItalic.ttf";
import OpenSansItalic from "~/assets/fonts/OpenSans/OpenSans-Italic.ttf";
import OpenSansMediumItalic from "~/assets/fonts/OpenSans/OpenSans-MediumItalic.ttf";
import OpenSansSemiBoldItalic from "~/assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf";
import OpenSansBoldItalic from "~/assets/fonts/OpenSans/OpenSans-BoldItalic.ttf";
import OpenSansExtraBoldItalic from "~/assets/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "OpenSans",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        @font-face {
          font-family: "OpenSans";
          font-weight: 100 300;
          font-style: normal;
          src: url(${OpenSansLight});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 400;
          src: url(${OpenSansRegular});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 500;
          src: url(${OpenSansMedium});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 600;
          src: url(${OpenSansSemiBold});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 700;
          src: url(${OpenSansBold});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 800 950;
          src: url(${OpenSansExtraBold});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 100 300;
          font-style: italic;
          src: url(${OpenSansLightItalic});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 400;
          font-style: italic;
          src: url(${OpenSansItalic});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 500;
          font-style: italic;
          src: url(${OpenSansMediumItalic});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 600;
          font-style: italic;
          src: url(${OpenSansSemiBoldItalic});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 700;
          font-style: italic;
          src: url(${OpenSansBoldItalic});
        }

        @font-face {
          font-family: "OpenSans";
          font-weight: 800 950;
          font-style: italic;
          src: url(${OpenSansExtraBoldItalic});
        }
      `,
    },
  },
});
