import { createTheme } from "@mui/material"

let darkTheme = createTheme({
    palette: {
        mode: "dark",
        


  primary: {
    main: '#f44336', // Трохи яскравіший червоний для контрасту на чорному
    light: '#ff7961',
    dark: '#ba000d',
  },
  secondary: {
    main: '#ffffff',
  },
  background: {
    default: '#0a0a0a',
    paper: '#1a1a1a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
  },
},
typography: {
    fontFamily: "Fjalla One, sans-serif",
    title: "Roboto Condensed, sans-serif",


},
    }
)

let lightTheme = createTheme({
    palette: {
        mode: "light",
        // src/theme/palette.js


  primary: {
    main: '#d32f2f', // Червоний
    light: '#ff6659',
    dark: '#9a0007',
  },
  secondary: {
    main: '#212121', // Темно-сірий/чорний
  },
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#424242',
  },
}

    }
)

export{ darkTheme, lightTheme }