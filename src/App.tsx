import Snackbar from './components/commons/snackbar';
import Footer from './components/footer';
import Header from './components/header';
import Posts from './components/Posts/posts';
import CommentsProvider from './context/comments.context';
import PostsProvider from './context/posts.context';
import SnackbarProvider from './context/snackbar.context';

export default function App() {
  return (
    <>
      <SnackbarProvider>
        <PostsProvider>
          <CommentsProvider>
            <Header />
            <Posts />
            <Footer />
            <Snackbar />
          </CommentsProvider>
        </PostsProvider>
      </SnackbarProvider>
    </>
  );
}
