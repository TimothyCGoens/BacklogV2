import React from "react";
import { Feed } from "semantic-ui-react";

const ProfileFeed = () => (
  <Feed>
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          You started playing <b>Doom Eternal</b>.
          <Feed.Date>3 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Summary>
          You added <b>Spider-Man</b> to your wishlist.
          <Feed.Date>2 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Summary>
          You completed <b>Tony Hawk </b> and gave it a score of 5 stars.
          <Feed.Date>1 days ago</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  </Feed>
);

export default ProfileFeed;
