import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

/*Might need to add ["form-control", "form-control-lg"] to classes*/

const InputGroup = ({
  id,
  name,
  label,
  placeholder,
  classes,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      {icon ? (
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
      ) : null}
      <input
        type={type}
        className={classnames(classes, {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={id ? id : null}
      />
      {label ? (
        <label className="form-check-label" htmlFor="private">
          Private
        </label>
      ) : null}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  classes: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
