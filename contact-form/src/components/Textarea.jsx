import Errormsg from "./ErrorMsg";

/* eslint-disable react/prop-types */
export default function Textarea({
  id,
  text,
  name,
  errMsg,
  showError,
  changeHandler,
}) {
  const errorState = showError ? "show-error" : "";
  return (
    <label htmlFor={id} className={`msg ${errorState}`}>
      <span>{text} *</span>
      <textarea id={id} name={name} type="textarea" onChange={changeHandler} />
      <Errormsg msg={errMsg} show={showError} />
    </label>
  );
}
