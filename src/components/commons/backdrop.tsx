import { Backdrop, CircularProgress } from '@mui/material';

interface BackdropProps {
  show: boolean;
}

export default function BackDrop(props: BackdropProps) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999 }}
      open={props.show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
