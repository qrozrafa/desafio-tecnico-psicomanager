import { Close } from '@mui/icons-material';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, List, ListItem, TextField, Typography } from '@mui/material';
import { CommentDto, PostDto } from '../../dtos';
import { AlertContext, CommentsContext, SnackbarContext } from '../../context';
import BackDrop from '../commons/backdrop';
import Alert from '../commons/alert';

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
  const snackbarContext = useContext(SnackbarContext);
  const commentsContext = useContext(CommentsContext);
  const alertContext = useContext(AlertContext);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [comment, setComment] = useState<CommentDto>({ ...cleanComment });
  const [processing, setProcessing] = useState(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const loadComments = useCallback((postId: number) => {
    setComment({ ...cleanComment });
    setProcessing(true);

    commentsContext.list(postId)
      .then((list) => setComments(list))
      .catch(() => snackbarContext.error('Erro ao carregar comentários do post.'))
      .finally(() => setProcessing(false));
  }, [commentsContext, snackbarContext]);

  useEffect(() => {
    if (!props.post) return;

    setChanged(false);
    loadComments(props.post.id!);
  }, [props.post, loadComments]);


  function handleChangeComment(key: string, value: any) {
    setComment({
      ...comment,
      [key]: value,
    });
    setChanged(true);
  }

  function handleSubmitComment() {
    const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!comment.name) {
      setAlert(true);
      alertContext.error('É necessário preencher o campo nome.');
      return;
    }
    if (comment.name.length < 3) {
      setAlert(true);
      alertContext.error('O nome deve conter pelo menos 3 letras.');
      return;
    }
    if (comment.email.length === 0) {
      setAlert(true);
      alertContext.error('É necessário preencher o campo email.');
      return;
    }
    if (!comment.email.match(emailRegExp)) {
      setAlert(true);
      alertContext.error('É necessário informar um email válido.');
      return;
    }
    if (comment.body.length < 3) {
      setAlert(true);
      alertContext.error('O comentário deve conter pelo menos 3 letras.');
      return;
    }

    const postId = props.post?.id!;
    commentsContext.create({ ...comment, postId })
      .then(() => {
        setAlert(false);
        snackbarContext.success('Comentário adicionado com sucesso.');
        loadComments(postId);
      })
      .catch(() => snackbarContext.error('Erro ao tentar criar comentário.'));
  }

  return (
    <>
      <Dialog
        open={Boolean(props.post)}
        onClose={props.onClose}
      >
        <DialogTitle>
          <IconButton onClick={props.onClose}>
            <Close />
          </IconButton>
          Comentários
          <Typography
            variant='body1'
            sx={{ mt: 1 }}
            textAlign={"center"}
          >
            Post: <b>{props.post?.title}</b>
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{ mt: 1 }}
          >
            <b>{comments.length}</b> {comments.length > 1 ? 'comentários' : 'comentário'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            {comments.map((item: CommentDto, index: number) =>
              <ListItem key={index}>
                <Grid
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  p={1}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <Divider />
                    <Typography
                      variant='body1'
                      sx={{ mt: 1 }}
                    >
                      <b>Autor:</b> {item.name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    mt={1}
                  >
                    <Typography variant='subtitle2'>{item.body}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            )}
            {comments.length === 0 &&
              <ListItem>Nenhum comentário para este post</ListItem>
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            p={1}
          >
            <Alert status={alert} />
            <Grid
              item
              xs={12}
              mb={1}
            >
              <TextField
                label="Nome"
                placeholder='Nome'
                type="text"
                value={comment.name}
                onChange={(e) => handleChangeComment('name', e.target.value || '')}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid
              item
              xs={12}
              mb={1}
            >
              <TextField
                label="Email"
                placeholder='Email'
                type="email"
                value={comment.email}
                onChange={(e) => handleChangeComment('email', e.target.value || '')}
                fullWidth
                size='small'
              />
            </Grid>
            <Grid
              item
              xs={12}
              mb={1}
            >
              <TextField
                multiline
                rows={4}
                type="text"
                label="Comentário"
                placeholder='Comentário'
                value={comment.body}
                onChange={(e) => handleChangeComment('body', e.target.value || '')}
                fullWidth
                size='small'
              />
            </Grid>
            <Button
              onClick={handleSubmitComment}
              color="success"
              variant='contained'
              fullWidth
              disabled={!changed}
            >
              Adicionar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <BackDrop show={processing} />
    </>
  );
}
