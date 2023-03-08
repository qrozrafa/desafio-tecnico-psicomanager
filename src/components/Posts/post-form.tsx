import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { PostDto } from '../../dtos';

interface PostFormProps {
  post?: PostDto | null;
  onClose: () => void;
  onCreate: (post: PostDto) => void;
}

export default function PostForm(props: PostFormProps) {
  const [post, setPost] = useState<PostDto>({
    title: '',
    body: '',
  });

  useEffect(() => {
    props.post && setPost(props.post);
  }, [props.post]);

  function handleChange(key: string, value: any) {
    setPost({
      ...post,
      [key]: value,
    });
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
      <TextField
          label="Título"
          placeholder='Título'
          value={post.title}
          onChange={(e) => handleChange('title', e.target.value || '')}  
        />
        <TextField
          multiline
          rows={4}
          label="Texto"
          placeholder='Texto'
          value={post.body}
          onChange={(e) => handleChange('body', e.target.value || '')}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="success"
          variant='contained'
          fullWidth
        >
          {props.post?.id ? 'Salvar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
