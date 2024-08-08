/* eslint-disable react/prop-types */
import Errormsg from "./ErrorMsg";
import RadioInput from "./RadioInput";

export default function QueryTypeSelect({
  radioInputs,
  showError,
  errMsg,
  selectHandler,
}) {
  const showErrorState = showError ? "show-error" : "";
  return (
    <div className={`query ${showErrorState}`}>
      <p>Query Type *</p>
      <div className="forms">
        {radioInputs.map((input) => (
          <RadioInput
            showError={showError}
            key={input.id}
            {...input}
            selectHandler={selectHandler}
          />
        ))}
      </div>
      <Errormsg msg={errMsg} show={showError} />
    </div>
  );
}
