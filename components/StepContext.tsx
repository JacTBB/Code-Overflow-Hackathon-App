import React from "react";
import { useEffect, useState } from "react";

const StepContext = React.createContext<{
  StepCount: number;
  SetStepCount: () => void;
  PreviousStepCount: number;
  SetPreviousStepCount: () => void;
  SessionStepCount: number;
  SetSessionStepCount: () => void;
} | null>(null);

export function useSession() {
  const value = React.useContext(StepContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: any) {
  const [StepCount, SetStepCount] = useState(0);
  const [PreviousStepCount, SetPreviousStepCount] = useState(0);
  const [SessionStepCount, SetSessionStepCount] = useState(0);

  return (
    <StepContext.Provider
      value={{
        StepCount,
        // @ts-ignore
        SetStepCount,
        PreviousStepCount,
        // @ts-ignore
        SetPreviousStepCount,
        SessionStepCount,
        // @ts-ignore
        SetSessionStepCount
      }}
    >
      {props.children}
    </StepContext.Provider>
  );
}