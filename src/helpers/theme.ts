import { createMuiTheme, Theme } from '@material-ui/core'

const defaultTheme = createMuiTheme()

const mediaMaxHeight = '740px'

export const theme: Theme = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        paddingLeft: '64px',
        paddingRight: '64px',

        [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
          paddingLeft: '16px',
          paddingRight: '16px'
        }
      }
    },
    MuiToolbar: {
      gutters: {
        [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
          paddingLeft: '64px',
          paddingRight: '64px'
        },

        [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
          paddingLeft: '16px',
          paddingRight: '16px'
        }
      }
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '27px'
      }
    },
    MuiFormHelperText: {
      root: {
        fontSize: '12px',
        color: '#000000',

        '&.Mui-error': {
          color: '#000000'
        },
        '&.Mui-success': {
          color: '#000000'
        }
      },
      contained: {
        marginLeft: '0'
      }
    },
    MuiInputBase: {
      root: {
        fontSize: '14px'
      },
      input: {
        background: '#ffffff',
        border: '1px solid #D8DADA'
      }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: '#ffffff',

        '&.Mui-focused': {
          backgroundColor: '#ffffff'
        },
        '&:hover': {
          backgroundColor: '#ffffff'
        }
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #000000'
        },
        '&:hover:before': {
          borderBottom: '1px solid #000000'
        },
        '&:after': {
          borderBottom: '2px solid #000000'
        },
        '&:hover:after': {
          borderColor: '2px solid #000000'
        }
      },
      multiline: {
        padding: '0'
      },
      inputMultiline: {
        padding: '10px'
      }
    },
    MuiOutlinedInput: {
      root: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#393939',
          borderWidth: '1px'
        }
      },
      input: {
        padding: '11.7px 14px'
      },
      notchedOutline: {
        '& span': {
          display: 'none'
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: '#D8DADA',
        fontSize: '14px',

        '&.Mui-focused': {
          color: '#969797'
        }
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 13.5px) scale(1)',

        '&$shrink': {
          transform: 'translate(0, -14px) scale(0.75)'
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: '21px',
        fontFamily: '"Verizon-Bold"',

        fontSize: '14px',
        textTransform: 'none',
        padding: '10px 44px',
        margin: '44px 0'
      },
      outlined: {
        margin: '36px 0'
      },
      text: {
        margin: '36px 0'
      },
      contained: {
        backgroundColor: '#000000',
        color: '#ffffff'
      }
    }
  },
  typography: {
    fontFamily: `"Verizon-Regular"`,
    h1: {
      fontFamily: '"Verizon-Bold"',
      fontSize: '64px',

      [`${defaultTheme.breakpoints.down('md')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '54px'
      },
      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '36px'
      }
    },
    h2: {
      fontFamily: '"Verizon-Bold"',
      fontSize: '48px',
      'line-height': 1.2,

      [`${defaultTheme.breakpoints.down('md')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '38px'
      },
      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '22px'
      }
    },
    h3: {
      fontFamily: '"Verizon-Bold"',
      fontSize: '32px',

      [`${defaultTheme.breakpoints.down('md')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '22px'
      },
      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '18px'
      }
    },
    h4: {
      fontFamily: '"Verizon-Bold"',
      fontSize: '28px',

      [`${defaultTheme.breakpoints.down('md')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '18px'
      },
      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '16px'
      }
    },
    h5: {
      fontFamily: '"Verizon-Bold"',
      fontSize: '20px',
      'line-height': 1.2,

      '&.MuiTypography-gutterBottom': {
        marginBottom: '17px'
      },

      [`${defaultTheme.breakpoints.down('md')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '16px'
      },
      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '14px'
      }
    },
    h6: {
      fontFamily: '"Verizon-Bold"',
      fontSize: '16px',
      'line-height': 1.2,

      [`${defaultTheme.breakpoints.down('md')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '14px'
      },
      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '12px'
      }
    },
    body1: {
      fontSize: '18px',
      'line-height': 1.2,
      'white-space': 'pre-line',

      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '16px'
      }
    },
    body2: {
      fontSize: '20px',
      'line-height': 1.2,

      [`${defaultTheme.breakpoints.down('sm')}, screen and (max-height: ${mediaMaxHeight})`]: {
        fontSize: '16px'
      }
    }
  },
  palette: {
    error: {
      main: '#ed7003'
    },
    success: {
      main: '#00ad3c'
    }
  }
})
