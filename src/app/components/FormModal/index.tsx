import { BlogPost } from "app/types";
import { FC, FormEventHandler, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

interface IFormModalProps {
  show?: boolean;
  toggle?: () => void;

  onSubmit?: (value: IFormValues) => void;

  defaultValues?: BlogPost;
}

interface IFormValues {
  postTitle: string;
  postContent: string;
}

export const FormModal: FC<IFormModalProps> = ({
  show,
  toggle = () => null,
  onSubmit: onSubmitProps,
  defaultValues,
}) => {
  const [formValues, setFormValues] = useState<IFormValues>({
    postTitle: "",
    postContent: "",
  });

  const [showErrors, setShowErrors] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    /**
     * Check if inputs are valid
     */
    if (
      Object.keys(formValues).some(
        (key) => !formValues[key as keyof IFormValues]
      )
    ) {
      setShowErrors(true);
      return;
    }

    if (onSubmitProps) {
      onSubmitProps(formValues);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  useEffect(() => {
    if (defaultValues) {
      setFormValues(defaultValues);
    }
  }, [defaultValues]);

  const { postTitle, postContent } = formValues;

  return (
    <Modal isOpen={show}>
      <Form onSubmit={onSubmit}>
        <ModalHeader toggle={toggle}>Update Post</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleEmail">Title</Label>
            <Input
              invalid={showErrors && !postTitle}
              name="postTitle"
              defaultValue={postTitle}
              placeholder="Blog Title"
              type="text"
              onChange={onChangeInput}
            />
            {showErrors && <FormFeedback>This field is required</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Description</Label>
            <Input
              invalid={showErrors && !postContent}
              onChange={onChangeInput}
              defaultValue={postContent}
              name="postContent"
              placeholder="Description"
              type="textarea"
            />
            {showErrors && <FormFeedback>This field is required</FormFeedback>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            onClick={function noRefCheck() {}}
          >
            Update
          </Button>{" "}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
