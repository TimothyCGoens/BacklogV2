import React, { useState } from "react";
import { Modal, Rating, Button, Image, Header, Form } from "semantic-ui-react";
import "./CompletedModal.css";

const CompletedModal = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon="check" />}>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content image>
        <Image size="big" src={props.image} wrapped />
        <Form>
          <Form.Input small label="Completion %" placeholder="Completion %" />
          <Form.Input mini label="Trophy %" placeholder="Trophy %" />
          <Form.Input label="Game Time" placeholder="Game Time" />
          <Form.TextArea label="Comments" placeholder="Comments" />
          <div>
            Rating
            <Rating icon="star" maxRating={5} />
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CompletedModal;
