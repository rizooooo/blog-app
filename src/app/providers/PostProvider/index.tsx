import { PostContext } from "app/context";
import { BlogPost } from "app/types";
import { FC, useReducer } from "react";
import { dummyPosts } from "./dummy";

interface IState {
  posts: BlogPost[];
}

interface IAction {
  type: "ADD_POST" | "LOAD_POSTS" | "UPDATE_POST";
  payload?: any;
}

const initialState: IState = {
  posts: dummyPosts,
};

const postReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [{ ...action.payload }, ...state.posts],
      };
    case "LOAD_POSTS":
      return {
        ...state,
        posts: state.posts,
      };
    case "UPDATE_POST":
      const { index, post } = action.payload;

      return {
        ...state,
        posts: state.posts.map((p, i) =>
          i === index ? { ...p, ...post } : p
        ),
      };
    default:
      return state;
  }
};

export const PostProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { posts } = state;

  const addPost = (post: BlogPost) => {
    dispatch({ type: "ADD_POST", payload: post });
  };

  const loadPosts = () => {
    dispatch({ type: "LOAD_POSTS" });
  };

  const updatePost = (index: number, post: BlogPost) => {
 
    dispatch({
      type: "UPDATE_POST",
      payload: {
        index,
        post,
      },
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        loadPosts,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
