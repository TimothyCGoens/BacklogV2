import React from "react";
import { Image, Card, Button, Popup } from "semantic-ui-react";

const WishlistCardGroup = (props) => {
  return (
    <Card.Group className="ui cards">
      <Card color={props.color}>
        <Card.Content>
          <Image floated="right" size="tiny" src={props.image} />
          <Card.Header>{props.title}</Card.Header>
          <Card.Meta>{props.released}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button.Group basic size="small">
            <Popup
              content="Move game to your backlog"
              trigger={<Button onClick={props.backlogClick} icon="gamepad" />}
            />
            <Popup
              content="Delete"
              trigger={<Button onClick={props.deleteClick} icon="x" />}
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default WishlistCardGroup;
