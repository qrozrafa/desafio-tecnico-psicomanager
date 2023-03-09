import { createContext, useState } from "react";
import { SnackMsgDto } from "../dtos";

export const SnackbarContext = createContext({
  msg: {} as SnackMsgDto | null,
  success: (message: string, duration = 3000): void => {},
  error: (message: string, duration = 3000): void => {},
});

export default function SnackbarProvider(props: any) {
  const [msg, setMsg] = useState<SnackMsgDto | null>(null);

  function success(message: string, duration = 3000): void {
    setMsg({
      message,
      duration,
      color: 'success',
    });
  }

  function error(message: string, duration = 5000): void {
    setMsg({
      message,
      duration,
      color: 'error',
    });
  }

  return (  
    <SnackbarContext.Provider value={{ msg, success, error }}>
      {props.children}
    </SnackbarContext.Provider>
  );
}
