import { Close } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, TextField, Typography } from '@mui/material';
import { CommentDto, PostDto } from '../../dtos';
import { CommentsContext } from '../../context';

const cleanComment: CommentDto = {
  name: '',
  email: '',
  body: '',
};

interface CommentProps {
  post?: PostDto | null;
  onClose: () => void;
}

export default function Comments(props: CommentProps) {
  const commentsContext = useContext(CommentsContext);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [comment, setComment] = useState<CommentDto>({ ...cleanComment });

  useEffect(() => {
    props.post && loadComments(props.post.id!);
  }, [props.post]);

  function loadComments(postId: number) {
    setComment({ ...cleanComment });

    commentsContext.list(postId)
      .then((list) => setComments(list))
      .catch((e) => window.alert(e));
  }

  function handleChangeComment(key: string, value: any) {
    setComment({
      ...comment,
      [key]: value,
    });
  }

  function handleSubmitComment() {
    if (comment.name.length < 3) {
      window.alert('O nome deve conter pelo menos 3 letras.');
      return;
    }
    if (comment.email.length < 3) {
      window.alert('O email deve conter pelo menos 3 letras.');
      return;
    }
    if (comment.body.length < 3) {
      window.alert('O comentário deve conter pelo menos 3 letras.');
      return;
    }

    commentsContext.create(comment)
    .then(() => loadComments(props.post?.id!))
    .catch(() => window.alert('Erro ao tentar criar comentário'));
  }

  return (
    <Dialog
      open={Boolean(props.post)}
      onClose={props.onClose}
    >
      <DialogTitle>
        <IconButton onClick={props.onClose}>
          <Close />
        </IconButton>
        Comentários
      </DialogTitle>
      <DialogContent>
        <List>
          {comments.map((item: CommentDto, index: number) =>
            <ListItem key={index}>
              {item.body} - <b>{item.name}</b>
            </ListItem>
          )}
          {comments.length === 0 &&
            <ListItem>Nenhum comentário para este post</ListItem>
          }
        </List>
      </DialogContent>
      <DialogActions>
        <TextField
          label="Nome"
          placeholder='Nome'
          value={comment.name}
          onChange={(e) => handleChangeComment('name', e.target.value || '')}  
        />
        <TextField
          label="Email"
          placeholder='Email'
          value={comment.email}
          onChange={(e) => handleChangeComment('email', e.target.value || '')}
        />
        <TextField
          multiline
          rows={4}
          label="Comentário"
          placeholder='Comentário'
          value={comment.body}
          onChange={(e) => handleChangeComment('body', e.target.value || '')}
        />
        <Button
          onClick={handleSubmitComment}
          color="success"
          variant='contained'
          fullWidth
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
