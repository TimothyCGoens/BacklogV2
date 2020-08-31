import React from "react";
import { Image, Card, Icon, Container } from "semantic-ui-react";
import "./UserDetails.css";

const UserDetails = (props) => {
  return (
    <Container>
      <Card className="user-card">
        <Image src="/elliot.jpg" wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>{props.location}</Card.Meta>
          <Card.Description>I like gaming</Card.Description>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default UserDetails;
