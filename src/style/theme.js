import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4267B2",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      paper: "#ffffff",
      background: "#898F9C",
      badge: "#4267B2",
    },
    paper: {
      main: "#8e8e8e",
    },
  },
  appBackground: {
    default: "#001440",
  },
  typography: {
    h1: {
      color: "#e5cd6c",
    },
    h2: {
      fontFamily: "Mukta",
      fontSize: "60px",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Mukta",
      fontSize: "24px",
    }, 
    subtitle1:{
      fontFamily: "Mukta",
      fontSize: "20px",
      fontWeight: 600,

  },
      body1: {
        fontFamily: "Mukta",
        fontWeight: 600,
        fontSize: "22px",
      },
      body2:{
        fontFamily: "Mukta",
        fontWeight: 300,
      }
  },
});

export default theme;
