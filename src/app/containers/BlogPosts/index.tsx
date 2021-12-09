import { Datatable, FormModal } from "app/components";
import { ACTIONS, IDataTableAction } from "app/components/Datatable/types";
import { useModal } from "app/hooks";
import { useContext, useState } from "react";
import { Button } from "reactstrap";
import { PostContext } from "app/context";

const tableHeaders = [
  {
    title: "Post Title",
    name: "postTitle",
  },
  {
    title: "Post Content",
    name: "postContent",
  },
  {
    title: "Created",
    name: "createdAt",
  },
];

interface BlogPost {
  id: number | string;
  postTitle: string;
  postContent: string;
}

export const BlogPosts = () => {
  const { posts, addPost, updatePost } = useContext(PostContext);
  const { showModal, toggleModal } = useModal();
  const [showFormModal, setShowFormModal] = useState(false);

  const [currentSelectedIndex, setCurrentSelectedIndex] = useState<
    null | number
  >(null);

  const [currentSelectedPost, setCurrentSelectedPost] =
    useState<null | BlogPost>(null);

  const toggleShowFormModal = () => setShowFormModal((prev) => !prev);

  const onActionClick = (
    action: "delete" | "view",
    index: number,
    data: BlogPost,
    dispatch: React.Dispatch<IDataTableAction>
  ) => {
    if (action === "delete") {
      showModal({
        title: "Delete Post",
        message: "Are you sure do you want to delete this post?",
        onYesClick: () => {
          // Temporary to delete, make a call etc..
          dispatch({ type: ACTIONS.DELETE_POST, payload: data.id });
          toggleModal();
        },
        onNoClick: () => toggleModal(),
      });
    }

    if (action === "view") {
      setCurrentSelectedPost(data);
      setCurrentSelectedIndex(index);
      toggleShowFormModal();
    }
  };

  const onSubmit = (values: { postTitle: string; postContent: string }) => {
    if (currentSelectedPost && currentSelectedIndex !== null) {
      updatePost(currentSelectedIndex, values);
      toggleShowFormModal();
    } else {
      addPost({ ...values, id: new Date().getMilliseconds() });
      toggleShowFormModal();
    }
  };

  return (
    <div>
      <h3>Blog Posts</h3>
      <Button
        onClick={() => {
          setCurrentSelectedIndex(null);
          setCurrentSelectedPost(null);
          toggleShowFormModal();
        }}
        type="button"
      >
        Add Post
      </Button>
      <Datatable
        tableHeaders={tableHeaders}
        tableData={posts}
        onActionClick={onActionClick}
      />
      <FormModal
        defaultValues={currentSelectedPost!}
        onSubmit={onSubmit}
        show={showFormModal}
        toggle={toggleShowFormModal}
      />
    </div>
  );
};
