import "../styles/globals.css";
import '@primer/react-brand/lib/css/main.css'
import { BaseStyles,ThemeProvider, SSRProvider } from "@primer/react";

function MyApp({ Component, pageProps: {...pageProps } }) {
  return (
    <ThemeProvider preventSSRMismatch>
      <SSRProvider>
        <BaseStyles>
        
            <Component {...pageProps} />

        </BaseStyles>
      </SSRProvider>
    </ThemeProvider>
  );
}

export default MyApp;
