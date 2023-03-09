import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { PostDto } from "../../dtos";

interface PostProps {
  post: PostDto;
  onClick: (post: PostDto) => void;
  onEdit: (post: PostDto) => void;
  onRemove: (post: PostDto) => void;
}

export default function Post(props: PostProps) {

  return (
    <>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={'space-between'}
        sx={{borderRadius: '15px', bgcolor: '#EEEEEE', ':hover': {bgcolor: '#e4e4e4'}}}
        p={1}
      >
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={'space-between'}
          mt={1}
          p={1}
          width={900}
          sx={{cursor: 'pointer'}}
          onClick={() => props.onClick(props.post)}
        > 
          <Typography fontWeight={500}>{props.post.id}</Typography>
          <Typography variant="h6" sx={{ml: 1}} width={"40%"}>{props.post.title}</Typography>
          <Typography variant="body2" sx={{ml: 1}} width={"40%"}>{props.post.body}</Typography>
        </Grid>
        <IconButton
          title='Editar'
          size="small"
          sx={{mt: 1, maxHeight: 40}}
          onClick={() => props.onEdit(props.post)}
        >
          <Edit />
        </IconButton>
        <IconButton
          title='Excluir'
          size="small"
          sx={{mt: 1, maxHeight: 40}}
          onClick={() => props.onRemove(props.post)}
        >
          <Delete />
        </IconButton>
      </Grid>
    </>
  )
}
