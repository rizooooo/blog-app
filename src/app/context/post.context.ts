import { BlogPost } from "app/types";
import { createContext } from "react";

interface IPostContext {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (index: number, post: BlogPost) => void;
  loadPosts: () => void;
}

export const PostContext = createContext<IPostContext>({
  posts: [],
  addPost: () => null,
  loadPosts: () => null,
  updatePost: () => null,
});
