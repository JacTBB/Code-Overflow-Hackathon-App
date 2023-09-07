import React from "react";
// import { useStorageState } from "./useStorageState";
import { useEffect, useState } from "react";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
} | null>(null);

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: any) {
  const [session, setSession] = useState('');

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setSession('yes');
        },
        signOut: () => {
          setSession('');
        },
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}