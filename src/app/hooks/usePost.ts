import { dummyPosts } from "app/providers/PostProvider/dummy";
import { BlogPost } from "app/types";
import { useReducer } from "react";

interface IState {
  posts: BlogPost[];
}

interface IAction {
  type: "ADD_POST";
  payload?: any;
}

const postReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [{ ...action.payload }, ...state.posts],
      };
    default:
      return state;
  }
};

const initialState: IState = {
  posts: dummyPosts,
};

export const usePost = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const { posts } = state;

  const addPost = (post: BlogPost) => {
    dispatch({ type: "ADD_POST", payload: post });
  };
  return {
    addPost,
    posts,
  };
};
