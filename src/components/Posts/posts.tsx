import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { PostDto } from '../../dtos';
import Post from './post';
import { PostsContext } from '../../context';
import Confirm from "../commons/confirm";
import Comments from "./comments";
import PostForm from "./post-form";

export default function Posts() {
  const postsContext = useContext(PostsContext);
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [removePostTarget, setRemovePostTarget] = useState<PostDto | null>(null);
  const [commentPostTarget, setCommentPostTarget] = useState<PostDto | null>(null);
  const [formPostTarget, setFormPostTarget] = useState<PostDto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => { loadPosts(); }, []);

  function loadPosts() { 
    postsContext.list()
    .then((list) => setPosts(list))
    .catch((e) => window.alert(e));
  }

  function handleConfirmRemove(post: PostDto) {
    postsContext
    .remove(post.id!)
    .then(() => loadPosts())
    .catch(() => window.alert('erro ao tentar remover post'))
    .finally(() => setRemovePostTarget(null));
  };

  function handleSave(post: PostDto) {
    const isDuplicate = posts.some((p) =>
      p.title.toLowerCase() === post.title.toLocaleLowerCase()
      && p.id !== post.id
    );

    if (isDuplicate) {
      window.alert('O título informado já existe');
      return;
    }

    postsContext
    [post.id ? 'update' : 'create'](post)
    .then(() => {
      setFormPostTarget(null);
      loadPosts();
    })
    .catch(() => window.alert('erro ao tentar salvar post'));
  };


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  function paginate(pageNumber: any): void {
    return setCurrentPage(pageNumber);
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
      >
        <Box
          flexDirection={'column'}
          mb={4}
        >
          <Typography variant='h4' sx={{mt: 4}}>Desafio psicomanager</Typography>
          <Typography variant='body1' textAlign={'center'}>Rafael de Queiroz Silva</Typography>
        </Box>
        <Grid
          item
          xs={10}
        >
          <Button
            variant='contained'
            color='success'
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
    </>
  )
}