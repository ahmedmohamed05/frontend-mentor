import Errormsg from "./ErrorMsg";

/* eslint-disable react/prop-types */
export default function TeamCheckbox({
  id,
  text,
  name,
  errMsg,
  showError,
  changeHandler,
}) {
  return (
    <label htmlFor={id} className={showError && "show-error"}>
      <input type="checkbox" id={id} name={name} onChange={changeHandler} />
      <span>{text}</span>
      <Errormsg msg={errMsg} show={showError} />
    </label>
  );
}
