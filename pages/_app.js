import { useState } from "react";
import "../styles/globals.css";
import { UserContext } from "./Helper/UserContext";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState('Profile')
  return (
    <UserContext.Provider value={{user, setUser}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
