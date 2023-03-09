import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import { PostDto } from '../../dtos';

interface PostFormProps {
  post?: PostDto | null;
  onClose: () => void;
  onCreate: (post: PostDto) => void;
}

export default function PostForm(props: PostFormProps) {
  const [changed, setChanged] = useState<boolean>(false);
  const [post, setPost] = useState<PostDto>({
    title: '',
    body: '',
  });

  useEffect(() => {
    if (!props.post) return;
    
    setChanged(false);
    setPost(props.post);
  }, [props.post]);

  function handleChange(key: string, value: any) {
    setPost({
      ...post,
      [key]: value,
    });
    setChanged(true);
  }

  function handleSubmit() {
    if (post.title.length < 3) {
      window.alert('O título deve conter pelo menos 3 letras.');
      return;
    }
    if (post.body.length < 3) {
      window.alert('O texto deve conter pelo menos 3 letras.');
      return;
    }

    props.onCreate(post);
  }

  return (
    <Dialog
      open={Boolean(props.post)}
      disableEscapeKeyDown
    >
      <DialogTitle>
        <IconButton onClick={props.onClose}>
          <Close />
        </IconButton>
        {props.post?.id ? 'Editar' : 'Criar'} Post
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          justifyContent={"center"}
          alignContent="center"
          p={1}
        >
          <Grid
            item
            xs={12}
            mb={1}
          >
            <TextField
              label="Título"
              placeholder='Título'
              value={post.title}
              size="small"
              fullWidth
              onChange={(e) => handleChange('title', e.target.value || '')}  
            />
          </Grid>
          <Grid
            item
            xs={12}
          >  
            <TextField
              multiline
              rows={4}
              size="small"
              label="Texto"
              placeholder='Texto'
              value={post.body}
              fullWidth
              onChange={(e) => handleChange('body', e.target.value || '')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="success"
          variant='contained'
          fullWidth
          disabled={!changed}
        >
          {props.post?.id ? 'Salvar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
