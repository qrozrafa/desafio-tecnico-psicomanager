import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ConfirmProps {
  show: boolean;
  title?: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Confirm(props: ConfirmProps) {
  return (
    <Dialog 
      open={props.show}
      disableEscapeKeyDown
    >
      <DialogTitle>{props.title || 'Confirmar'}</DialogTitle>
      <DialogContent>
        <Typography>{props.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.onCancel()}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => props.onConfirm()}
          color="primary"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
