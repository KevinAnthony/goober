import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const theme = createTheme({
    typography: {
        allVariants: {
            color: pink[500]
        },
    },
});

interface themeWrapperProps {
    children: React.ReactNode;
}

export default function ThemeWrapper({ children }: themeWrapperProps) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
