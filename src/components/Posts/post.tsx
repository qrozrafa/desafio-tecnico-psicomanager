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
        container
        justifyContent={'center'}
        sx={{ borderRadius: '15px', ':hover': { bgcolor: '#e4e4e4' } }}
        p={2}
      >
        <Grid
          container
          justifyContent={'space-between'}
          sx={{ cursor: 'pointer' }}
          onClick={() => props.onClick(props.post)}
          maxWidth={1100}
          spacing={4}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={2}
          >
            <Typography fontWeight={500}>{props.post.id}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
          >
            <Typography variant="h6" >{props.post.title}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Typography variant="body2" >{props.post.body}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"end"}
          pt={1}
        >
          <IconButton
            title='Editar'
            size="small"
            sx={{ maxHeight: 40 }}
            onClick={() => props.onEdit(props.post)}
          >
            <Edit color="primary" />
          </IconButton>
          <IconButton
            title='Excluir'
            size="small"
            sx={{ maxHeight: 40 }}
            onClick={() => props.onRemove(props.post)}
          >
            <Delete color="error" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
