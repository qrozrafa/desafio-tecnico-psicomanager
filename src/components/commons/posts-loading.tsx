import { Box, Grid, Typography } from "@mui/material";
import TextLoading from "./text-loading";

export default function PostsLoading() {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        maxWidth={1366}
        width={'100%'}
        ml={'auto'}
        mr={'auto'}
        mb={6}
        mt={6}
      >
        <Box
          flexDirection={"column"}
          sx={{ mt: 6, mb: 2 }}
        >
          <Typography variant='h4' textAlign={"center"}>Desafio psicomanager</Typography>
          <Typography textAlign={"center"} color={'primary'}>Listagem de Postagem</Typography>
        </Box>

        <Grid
          item
          xs={12}
          sx={{ borderRadius: '15px', bgcolor: '#eeeeee' }}
          p={1}
        >
          <TextLoading />
          <TextLoading />
          <TextLoading />
          <TextLoading />
          <TextLoading />
          <TextLoading />
        </Grid>
      </Grid>
    </>
  )
}