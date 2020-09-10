import React from "react";
import { Feed } from "semantic-ui-react";

const ProfileFeed = (props) => (
  <Feed>
    <Feed.Event>
      <Feed.Content>
        {props.action === "Moved" || "Added" ? (
          <Feed.Summary>
            You {props.action} <i>{props.title}</i> to your {props.destination}
            <Feed.Date>{props.date}</Feed.Date>
          </Feed.Summary>
        ) : props.action === "Deleted" ? (
          <Feed.Summary>
            You {props.action} <i>{props.title}</i> from your{" "}
            {props.destination}
            <Feed.Date>{props.date}</Feed.Date>
          </Feed.Summary>
        ) : props.action === "Completed" ? (
          <Feed.Summary>
            You {props.action} <i>{props.title}</i>
            <Feed.Date>{props.date}</Feed.Date>
          </Feed.Summary>
        ) : null}
      </Feed.Content>
    </Feed.Event>
  </Feed>
);

export default ProfileFeed;
