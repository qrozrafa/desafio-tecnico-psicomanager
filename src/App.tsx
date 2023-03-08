import Footer from './components/footer';
import Header from './components/header';
import Posts from './components/Posts/posts';
import CommentsProvider from './context/comments.context';
import PostsProvider from './context/posts.context';

export default function App() {
  return (
    <>
      <PostsProvider>
        <CommentsProvider>
          <Header />
          <Posts />
          <Footer />
        </CommentsProvider>
      </PostsProvider>
    </>
  );
}
