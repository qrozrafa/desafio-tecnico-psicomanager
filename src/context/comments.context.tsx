import axios from "axios";
import { createContext } from "react";
import { CommentDto, PostDto } from "../dtos";

export const CommentsContext = createContext({
  create: (comment: CommentDto, post: PostDto): Promise<void> => { return Promise.resolve(); },
  list: (postId: number): Promise<CommentDto[]> => { return Promise.resolve([]); },
});

export default function CommentsProvider(props: any) {
  const baseURL = process.env.REACT_APP_API_RB;

  async function create(comment: CommentDto, post: PostDto): Promise<void> {
    const body = {comment, post}
    return axios.post(`${baseURL}/comments`, body);
  }

  function list(postId: number): Promise<CommentDto[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseURL}/comments?postId=${postId}`)
        .then((res) => resolve(res.data))
        .catch(() => reject('erro ao tentar carregar comentários'));
    });
  }

  return (
    <CommentsContext.Provider value={{ create, list }}>
      {props.children}
    </CommentsContext.Provider>
  );
}
