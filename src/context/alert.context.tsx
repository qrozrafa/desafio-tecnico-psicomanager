import { createContext, useState } from "react";
import { AlertMsgDto } from "../dtos";


export const AlertContext = createContext({
  msg: {} as AlertMsgDto | null,
  success: (message: string): void => { },
  error: (message: string): void => { },
});

export default function AlertProvider(props: any) {
  const [msg, setMsg] = useState<AlertMsgDto | null>(null);

  function success(message: string): void {
    setMsg({
      message,
      color: 'success',
    });
  }

  function error(message: string): void {
    setMsg({
      message,
      color: 'error',
    });
  }

  return (
    <AlertContext.Provider value={{ msg, success, error }}>
      {props.children}
    </AlertContext.Provider>
  );
}
