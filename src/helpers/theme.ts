import { createMuiTheme, Theme } from '@material-ui/core'

export const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: `"Verizon-Regular"`,
    h1: {
      fontFamily: '"Verizon-Bold"'
    },
    h2: {
      fontFamily: '"Verizon-Bold"'
    },
    h3: {
      fontFamily: '"Verizon-Bold"'
    },
    h4: {
      fontFamily: '"Verizon-Bold"'
    },
    h5: {
      fontFamily: '"Verizon-Bold"'
    },
    h6: {
      fontFamily: '"Verizon-Bold"'
    }
  },
  palette: {
    error: {
      main: '#ED7000'
    },
    success: {
      main: '#00AC3E'
    }
  }
})
