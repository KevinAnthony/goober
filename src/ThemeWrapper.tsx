import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bin_content: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  bin_content: React.CSSProperties;
}
const gooberTheme = createTheme({
  typography: {
    allVariants: {
      color: "black",
    },
    bin_content: {
      whiteSpace: "pre",
    },
  } as ExtendedTypographyOptions,
});

interface themeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: themeWrapperProps) {
  return <ThemeProvider theme={gooberTheme}>{children}</ThemeProvider>;
}
