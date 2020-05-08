import React, { Component } from "react";

import Row from "./Row";

class TableRows extends Component {
  render() {
    if (this.props.users !== undefined) {
      const rows = [];
      let position = 0;
      this.props.users.map(user =>
        rows.push(<Row user={user} position={++position} />)
      );
      return <tbody>{rows}</tbody>;
    }
    return (
      <tr>
        <td colSpan={4}>Loading ...</td>
      </tr>
    );
  }
}

export default TableRows;
