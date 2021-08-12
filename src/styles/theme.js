import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#11cb5f',
    },
    secondary: {
      main: '#00FFFF',
    },
  },
  breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          }
}
});