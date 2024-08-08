import Errormsg from "./ErrorMsg";
/* eslint-disable react/prop-types */
export default function Input({
  label,
  type,
  isRequired,
  halfWidth,
  errMsg,
  showError,
  name,
  changeHandler,
}) {
  const ishalfWidth = halfWidth ? "half-width" : "";
  const showErrClass = showError ? "show-error" : "";

  return (
    <label
      htmlFor={label}
      className={`form-input ${ishalfWidth} ${showErrClass}`}
    >
      <span>
        {label}
        {isRequired && " *"}
      </span>
      <input type={type} id={label} name={name} onChange={changeHandler} />
      <Errormsg msg={errMsg} show={showError} />
    </label>
  );
}
