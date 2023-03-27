import PlayersProvider from '@/context/PlayersContext';
import theme from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <PlayersProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </PlayersProvider>
  )
}