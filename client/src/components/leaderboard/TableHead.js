import React from "react";

export default function TableHead(props) {
  return (
    <thead>
      <tr>
        <th className="center hide-small float-left">#</th>
        <th>User</th>
        <th
          className="center float-left sort selected"
          onClick={props.onClick}
          id="recentScores"
        >
          Date
        </th>
        <th
          className="center float-right sort"
          onClick={props.onClick}
          id="highScores"
        >
          High Score
        </th>
      </tr>
    </thead>
  );
}
