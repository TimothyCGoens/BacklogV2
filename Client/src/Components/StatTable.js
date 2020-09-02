import React from "react";
import { Header, Table } from "semantic-ui-react";

const StatTable = (props) => {
  return (
    <Table basic="very" celled collapsing>
      <Table.Header></Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Header.Content>Total Games</Header.Content>
              <Header.Subheader>Excluding Wishlist</Header.Subheader>
            </Header>
          </Table.Cell>
          <Table.Cell>{props.allGames}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Header.Content>PS4</Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>15</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Header.Content>Xbox</Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>12</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Header.Content>Nintendo Switch</Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>11</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Header.Content>PC</Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>11</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default StatTable;
