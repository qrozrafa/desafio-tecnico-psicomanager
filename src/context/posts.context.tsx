import axios from "axios";
import { createContext } from "react";
import { PostDto } from "../dtos";

export const PostsContext = createContext({
  create: (post: PostDto): Promise<void> => { return Promise.resolve(); },
  list: (): Promise<PostDto[]> => { return Promise.resolve([]); },
  remove: (id: number): Promise<void> => { return Promise.resolve(); },
  update: (post: PostDto): Promise<void> => { return Promise.resolve(); },
});

export default function PostsProvider(props: any) {
  const baseURL = process.env.REACT_APP_API_RB;

  async function create(post: PostDto): Promise<void> {
    return axios.post(`${baseURL}/posts`, post);
  }

  async function update(post: PostDto): Promise<void> {
    const { title, body } = post;

    return axios.patch(`${baseURL}/posts/${post.id}`, { title, body });
  }

  async function remove(id: number): Promise<void> {
    return axios.delete(`${baseURL}/posts/${id}`);
  }

  function sortResult(a: any, b: any) {
    if (a.title < b.title) { return -1; }

    if (a.title > b.title) { return 1; }

    return 0;
  }

  function list(): Promise<PostDto[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseURL}/posts`)
        .then((res) => resolve(res.data.sort(sortResult)))
        .catch(() => reject('erro ao tentar carregar posts'));
    });
  }

  return (
    <PostsContext.Provider value={{ create, list, remove, update }}>
      {props.children}
    </PostsContext.Provider>
  );
}

