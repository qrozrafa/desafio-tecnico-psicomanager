import { AppBar, Avatar, Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import Logo from '../assets/logo.png';
import imgAvatar from "../assets/avatar.jpg"

export default function Header() {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignContent={"center"}
        spacing={4}
        pt={3}
        mb={8}
      >
        <AppBar position="fixed" sx={{ bgcolor: "#EEEEEE", }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            maxWidth={1366}
            ml={"auto"}
            mr={"auto"}
            p={1}
          >
            <img src={Logo} height={"42px"} alt="Logo da psicomanager" />

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ flexGrow: 0 }}
              mr={3}
            >
              <Typography textAlign={"center"} color={'#969696'} sx={{ mr: 1 }}>Rafael de Queiroz Silva</Typography>
              <Tooltip title="Desenvolver front-end">
                <IconButton sx={{ p: 0, cursor: 'default' }}>
                  <Avatar alt="Remy Sharp" src={imgAvatar} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </AppBar>
      </Grid>
    </>
  )
}