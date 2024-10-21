import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/system";
// import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useRouter } from "next/router";

import { Provider } from 'react-redux';
import store from "@/store";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
      {/* <NextThemeProvider> */}
        <Component {...pageProps} />
      {/* </NextThemeProvider> */}
    </NextUIProvider>
    </Provider>
  );
}
