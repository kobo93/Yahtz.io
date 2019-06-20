import React from "react";
import moment from "moment";

export default function Row(props) {
  return (
    <tr>
      <td className="center hide-small">{props.position}</td>
      <td>
        <img
          className="rounded-circle"
          src={"/img/" + props.user.user.avatar + ".png"}
          alt={props.user.user.name}
          style={{ width: "50px", height: "50px" }}
        />
        <strong>{props.user.user.name}</strong>
      </td>
      <td className="center">
        {moment(props.user.date).format("MMMM Do YYYY")}
      </td>
      <td className="center">{props.user.grandtotal}</td>
    </tr>
  );
}
