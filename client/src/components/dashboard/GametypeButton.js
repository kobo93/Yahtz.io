import React from "react";
import classNames from "classnames";

export default function GametypeButton({
  name,
  label,
  selected,
  error,
  button,
  onClick
}) {
  return (
    <button
      name={name}
      onClick={onClick}
      className={classNames(
        "m-3",
        "online",
        "btn",
        "btn-outline-secondary",
        "col",
        { active: selected }
      )}
    >
      <i className={classNames("fas", "fa-5x", button)} />
      <p>{label}</p>
    </button>
  );
}
