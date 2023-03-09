import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useCallback, useContext, useEffect, useState } from "react";
import { PostDto } from '../../dtos';
import Post from './post';
import { PostsContext, SnackbarContext } from '../../context';
import Confirm from "../commons/confirm";
import Comments from "./comments";
import PostForm from "./post-form";
import PostsLoading from "../commons/posts-loading";
import BackDrop from "../commons/backdrop";

export default function Posts() {
  const postsContext = useContext(PostsContext);
  const snackbarContext = useContext(SnackbarContext);
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [removePostTarget, setRemovePostTarget] = useState<PostDto | null>(null);
  const [commentPostTarget, setCommentPostTarget] = useState<PostDto | null>(null);
  const [formPostTarget, setFormPostTarget] = useState<PostDto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [loadingPost, setLoadingPost] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const loadPosts = useCallback(() => { 
    setProcessing(true);

    postsContext.list()
    .then((list) => {
      setLoadingPost(false);
      setPosts(list);
    })
    .catch((e) => snackbarContext.error(e))
    .finally(() => setProcessing(false));
  }, [postsContext, snackbarContext]);
  
  useEffect(() => { 
    setLoadingPost(true);
    loadPosts();
  }, [loadPosts]);

  function handleConfirmRemove(post: PostDto) {
    setProcessing(true);

    postsContext
    .remove(post.id!)
    .then(() => {
      snackbarContext.success('Post removido com sucesso.')
      loadPosts();
    })
    .catch(() => snackbarContext.error('Erro ao tentar remover post.'))
    .finally(() => {
      setRemovePostTarget(null);
      setProcessing(false);
    });
  };

  function handleSave(post: PostDto) {
    setProcessing(true);
    const isDuplicate = posts.some((p) =>
      p.title.toLowerCase() === post.title.toLocaleLowerCase()
      && p.id !== post.id
    );

    if (isDuplicate) {
      snackbarContext.error('O título informado já existe.');
      return;
    }

    postsContext
    [post.id ? 'update' : 'create'](post)
    .then(() => {
      snackbarContext.success('Post salvo com sucesso.')
      setFormPostTarget(null);
      loadPosts();
    })
    .catch(() => snackbarContext.error('Erro ao tentar salvar post.'))
    .finally(() => setProcessing(false));
  };


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  function paginate(pageNumber: any): void {
    return setCurrentPage(pageNumber);
  }

  if (loadingPost) {
    return(<PostsLoading />) 
  }

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
      >

        <Box
          flexDirection={"column"}
          sx={{mt: 6, mb: 2}}
        >
          <Typography variant='h4' textAlign={"center"}>Desafio psicomanager</Typography>
          <Typography textAlign={"center"} color={'primary'}>Listagem de Postagem</Typography>
        </Box>

        <Grid
          item
          xs={10}
        >
          <Button
            variant='contained'
            size='small'
            sx={{justifySelf:'left'}}
            onClick={() => setFormPostTarget({
              title: '',
              body: '',
            })}
          >
            <Add />
            Nova Postagem
          </Button>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignContent={"center"}
          direction={"row"}
          spacing={2}
          maxWidth={1366}
          width={'100%'}
          ml={'auto'}
          mr={'auto'}
          p={4}
          sx={{borderRadius: '15px', bgcolor: '#EEEEEE'}}
        >
          {currentPosts.map((item, index) =>
            <Post
              key={index}
              post={item}
              onClick={(p) => setCommentPostTarget(p)}
              onEdit={(p) => setFormPostTarget(p)}
              onRemove={(p) => setRemovePostTarget(p)}
            />
          )}

          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            color="primary"
            variant="outlined"
            shape="rounded"
            showFirstButton={true}
            showLastButton={true}
            hideNextButton={true}
            hidePrevButton={true}
            onChange={(e, value) => {paginate(value)}}
            sx={{mt: 2}}
          />
        </Grid>
      </Grid>
      <Confirm
        title={`Excluir o post ${removePostTarget?.id}`}
        show={Boolean(removePostTarget)}
        text="Atenção! Ao excluir esta postagem os comentários também serão excluídos."
        onCancel={() => setRemovePostTarget(null)}
        onConfirm={() => handleConfirmRemove(removePostTarget!)}
      />
      <Comments
        post={commentPostTarget}
        onClose={() => setCommentPostTarget(null)}
      />
      <PostForm
        post={formPostTarget}
        onCreate={handleSave}
        onClose={() => setFormPostTarget(null)}
      />
      <BackDrop show={processing} />
    </>
  )
}
