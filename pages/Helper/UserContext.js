import { createContext, useState } from "react";
const UserContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState("Not logged in");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
