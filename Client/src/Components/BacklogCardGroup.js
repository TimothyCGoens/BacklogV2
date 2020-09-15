import React from "react";
import { Image, Card, Button, Popup } from "semantic-ui-react";

const BacklogCardGroup = (props) => {
  return (
    <Card.Group key={uuidv4()} className="ui cards">
      <Card
        color={
          `${game.platform}` === "PlayStation 4" ||
          `${game.platform}` === "PS Vita" ||
          `${game.platform}` === "PlayStation 3" ||
          `${game.platform}` === "PlayStation 2" ||
          `${game.platform}` === "PlayStation"
            ? "blue"
            : `${game.platform}` === "Nintendo Switch" ||
              `${game.platform}` === "Wii U" ||
              `${game.platform}` === "Wii" ||
              `${game.platform}` === "GameCube" ||
              `${game.platform}` === "Nintendo 64" ||
              `${game.platform}` === "SNES" ||
              `${game.platform}` === "SNES" ||
              `${game.platform}` === "NES" ||
              `${game.platform}` === "Game Boy" ||
              `${game.platform}` === "Nintendo 3DS" ||
              `${game.platform}` === "Game Boy Color"
            ? "red"
            : `${game.platform}` === "Xbox One" ||
              `${game.platform}` === "Xbox 360" ||
              `${game.platform}` === "Xbox" ||
              `${game.platform}` === "Xbox Series S/X"
            ? "green"
            : `${game.platform}` === "PC"
            ? "black"
            : null
        }>
        <Card.Content>
          <Image floated="right" size="tiny" src={game.image} />
          <Card.Header>{props.title}</Card.Header>
          <Card.Meta>
            {props.released}
            {game.playing === true ? (
              <p className="currently-playing">Currently Playing</p>
            ) : null}
          </Card.Meta>
        </Card.Content>
        <Card.Description className="date-stats">
          <List horizontal>
            <List.Item>
              <List.Content>
                <List.Header>Added to Backlog</List.Header>
                {props.backlogDate}
              </List.Content>
              {backlogDayCount.days < 1 ? (
                <List.Content>Today</List.Content>
              ) : backlogDayCount.days === 1 ? (
                <List.Content>Yesterday</List.Content>
              ) : (
                <List.Content>{backlogDayCount.days} Days ago</List.Content>
              )}
            </List.Item>
            {game.playing === true ? (
              <List.Item>
                <List.Content>
                  <List.Header>Started Playing</List.Header>
                  {moment(game.startedPlayingDate).format("MM-DD-YY")}1
                </List.Content>
                {playingDayCount.days < 1 ? (
                  <List.Content>Today</List.Content>
                ) : playingDayCount === 1 ? (
                  <List.Content>Yesterday</List.Content>
                ) : (
                  <List.Content>{playingDayCount.days} Days ago</List.Content>
                )}
              </List.Item>
            ) : null}
          </List>
        </Card.Description>
        <Card.Content extra>
          <Button.Group basic size="small">
            {game.playing === true ? (
              <Button disabled onClick={props.playingClick} icon="play" />
            ) : (
              <Popup
                content="Start Playing"
                trigger={
                  <Button
                    onClick={this.handlePlayingClick.bind(this, game, game.id)}
                    icon="play"
                  />
                }
              />
            )}
            {!game.playing ? (
              <Button
                disabled
                onClick={this.handleStopPlayingClick.bind(this, game, game.id)}
                icon="stop"
              />
            ) : (
              <Popup
                content="Stop Playing"
                trigger={
                  <Button
                    onClick={this.handleStopPlayingClick.bind(
                      this,
                      game,
                      game.id
                    )}
                    icon="stop"
                  />
                }
              />
            )}

            <Popup
              content="Complete Game"
              trigger={
                <Button
                  onClick={this.handleCompletedClick.bind(this, game.id, game)}
                  icon="check"
                />
              }
            />
            <Popup
              content="Delete Game"
              trigger={
                <Button
                  onClick={this.handleBacklogDeleteClick.bind(
                    this,
                    game.id,
                    game
                  )}
                  icon="x"
                />
              }
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default BacklogCardGroup;
