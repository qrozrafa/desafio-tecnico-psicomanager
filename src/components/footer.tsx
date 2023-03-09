import { Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignContent="center"
        p={2}
      >
        <Typography >&#169; Rafael de Queiroz Silva - <b>Desafio Psicomananger</b> - 2023</Typography>
      </Grid>
    </>
  )
}