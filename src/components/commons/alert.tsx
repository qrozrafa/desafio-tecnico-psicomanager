import { useContext, useEffect, useState } from "react";
import { Collapse, Alert as AlertValidate } from "@mui/material";
import { AlertContext } from "../../context";
import { AlertMsgDto } from "../../dtos";

interface AlertProps {
  status: boolean,
}

export default function Alert(props: AlertProps) {
  const alertContext = useContext(AlertContext);
  const [show, setShow] = useState<boolean>(false);
  const [msg, setMsg] = useState<AlertMsgDto | null>(null);

  useEffect(() => {
    if (!alertContext.msg) return;

    setMsg({ ...alertContext.msg });
    setShow(props.status);
    setTimeout(() => setShow(false), 6000);
  }, [alertContext.msg, props.status]);

  return (
    <>
      <Collapse in={show}>
        <AlertValidate
          variant="outlined"
          severity={msg?.color || 'success'}
          sx={{ mb: 1 }}
        >
          {msg?.message}
        </AlertValidate>
      </Collapse>
    </>
  )
}