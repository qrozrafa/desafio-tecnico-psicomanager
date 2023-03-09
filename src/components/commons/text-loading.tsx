import { Grid, Skeleton, Box } from "@mui/material";

export default function TextLoading() {
  return (
    <>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={'space-between'}
        p={1}
        ml={"auto"}
        mr={"auto"}
      >
        <Box sx={{ width: "5%", }}>
          <Skeleton />
        </Box>
        <Box sx={{ width: "40%" }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
        <Box sx={{ width: "40%" }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
        <Box sx={{ width: "2%", }}>
          <Skeleton />
        </Box>
        <Box sx={{ width: "2%", }}>
          <Skeleton />
        </Box>
      </Grid>
    </>
  )
}