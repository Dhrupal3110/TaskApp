import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 15,

    // Custom properties
    myOwnProperty: true,

    // Define spacing units
    spacing: {
        xs: 4,   // Extra small spacing
        sm: 8,   // Small spacing
        md: 16,  // Medium spacing
        lg: 24,  // Large spacing
        xl: 32,  // Extra large spacing
    },

    // Font styles
    fonts: {
        headlineLarge: {
            fontFamily: "QuicksandBold",
            lineHeight: 40,
            fontSize: 32,
        },
        headlineMedium: {
            fontFamily: "QuicksandRegular",
            lineHeight: 36,
            fontSize: 28,
        },
        headlineSmall: {
            fontFamily: "QuicksandRegular",
            lineHeight: 32,
            fontSize: 24,
        },
        titleLarge: {
            fontFamily: "QuicksandBold",
            lineHeight: 28,
            fontSize: 22,
        },
        titleMedium: {
            fontFamily: "QuicksandBold",
            lineHeight: 21.6,
            fontSize: 16,
        },
        titleSmall: {
            fontFamily: "QuicksandBold",
            lineHeight: 20,
            fontSize: 14,
        },
        labelLarge: {
            fontFamily: "QuicksandBold",
            lineHeight: 20,
            fontSize: 14,
        },
        labelMedium: {
            fontFamily: "QuicksandBold",
            lineHeight: 16,
            fontSize: 12,
        },
        labelSmall: {
            fontFamily: "QuicksandBold",
            lineHeight: 16,
            fontSize: 11,
        },
        bodyLarge: {
            fontFamily: "QuicksandRegular",
            lineHeight: 24,
            fontSize: 16,
        },
        bodyMedium: {
            fontFamily: "QuicksandRegular",
            lineHeight: 20,
            fontSize: 14,
        },
        bodySmall: {
            fontFamily: "QuicksandRegular",
            lineHeight: 16,
            fontSize: 12,
        },
        errorText: {
            fontSize: 12,
            color: 'red',
            lineHeight: 16,
            fontFamily: 'QuicksandRegular',
        },
        customTitle: {
            fontSize: 20,
            fontFamily: 'QuicksandBold',
            lineHeight: 24,
        },
        callOut: {
            fontSize: 16,
            fontFamily: 'QuicksandRegular',
            lineHeight: 21,
        },
    },

    // Color palette
    colors: {
        primary: "#3498db",
        secondary: "#2ecc71",
        accent: "#e74c3c",
        background: "#ffffff",
        surface: "#ecf0f1",
        text: "#34495e",
        error: "#e74c3c",
        border: "#bdc3c7",
        disabled: "#95a5a6",
        placeholder: "#7f8c8d",
        onPrimary: "#ffffff",
        onSecondary: "#ffffff",
        onBackground: "#2c3e50",
        onSurface: "#2c3e50",
    },
};

export default theme;
