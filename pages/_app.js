import "../styles/globals.css";
import { AppWrapper } from "./Helper/UserContext";
function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
