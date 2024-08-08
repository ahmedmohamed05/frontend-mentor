import { useState } from "react";
import "./App.css";
import FormButton from "./components/FormButton";
import FormContainer from "./components/FormContainer";
import Input from "./components/Input";
import {
  nameInputs,
  emailInput,
  radioInputs,
  msg,
  teamCheckBox,
} from "./inputs";
import Textarea from "./components/Textarea";
import TeamCheckbox from "./components/TeamCheckbox";
import QueryTypeSelect from "./components/QueryTypeSelect";
import SuccessMsg from "./components/SuccessMsg";

export default function App() {
  const [names, setNames] = useState(nameInputs);
  const [vaildNames, setVaildNames] = useState(false);

  const [email, setEmail] = useState(emailInput);
  const [vaildEmail, setVaildEmail] = useState(false);

  const [showQueryError, setShowQueryError] = useState(false);
  const [isQuerySelected, setIsQuerySelected] = useState(false);

  const [msgInput, setMsgInput] = useState(msg);
  const [emptyMsg, setEmptyMsg] = useState(false);

  const [team, setTeam] = useState(teamCheckBox);
  const [teamChecked, setTeamChecked] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    let showSuccessMsg = true;

    if (!vaildNames) {
      setNames((current) => {
        return current.map((item) => ({ ...item, showError: true }));
      });
      showSuccessMsg = false;
    }

    if (!vaildEmail) {
      showSuccessMsg = false;
      const value = e.target.value;

      let errMsg;
      let showError = true;

      if (!value) {
        errMsg = "This filed is required";
      } else if (!email.rg.test(value)) {
        errMsg = "Please enter a valid email address";
      } else {
        errMsg = "";
        showError = false;
      }

      setEmail({ ...email, errMsg, showError });
    }

    if (!isQuerySelected) {
      showSuccessMsg = false;
      setShowQueryError(true);
    } else {
      setShowQueryError(false);
      setIsQuerySelected(false);
      showSuccessMsg = true;
    }

    if (!emptyMsg) {
      showSuccessMsg = false;
      let showError = !e.target.value;

      setMsgInput({ ...msgInput, showError });
    }

    if (!teamChecked) {
      setTeam({ ...team, showError: true });
      showSuccessMsg = false;
    } else {
      setTeam({ ...team, showError: false });
      setTeamChecked(true);
      showSuccessMsg = true;
    }

    setShowSuccessMsg(showSuccessMsg);
  };

  const nameInputChangeHandler = (e) => {
    let showError = !e.target.value;

    setNames((current) => {
      return current.map((item) => {
        return item.label == e.target.id ? { ...item, showError } : item;
      });
    });

    setVaildNames(!showError);
  };

  const emailChangeHandler = (e) => {
    const value = e.target.value;

    let errMsg;
    let showError = true;

    if (!value) {
      errMsg = "This filed is required";
    } else if (!email.rg.test(value)) {
      errMsg = "Please enter a valid email address";
    } else {
      errMsg = "";
      showError = false;
    }

    setEmail({ ...email, errMsg, showError });
    setVaildEmail(!showError);
  };

  const querTypeHandler = () => {
    setIsQuerySelected(true);
    setShowQueryError(false);
  };

  const msgChangeHandler = (e) => {
    let showError = !e.target.value;

    setMsgInput({ ...msgInput, showError });

    setEmptyMsg(!showError);
  };

  const teamCheckhandler = (e) => {
    setTeamChecked(e.target.checked);
    setTeam({ ...team, showError: !e.target.checked });
  };

  return (
    <div className="wrapper">
      {showSuccessMsg && <SuccessMsg />}
      <FormContainer submitHandler={submitHandler}>
        <h1>Contact Us</h1>
        {names.map((input) => (
          <Input
            key={input.id}
            {...input}
            changeHandler={nameInputChangeHandler}
          />
        ))}
        <Input {...email} changeHandler={emailChangeHandler} />
        <QueryTypeSelect
          isRequired={true}
          radioInputs={radioInputs}
          errMsg="Please select a query type"
          showError={showQueryError}
          selectHandler={querTypeHandler}
        />
        <Textarea {...msgInput} changeHandler={msgChangeHandler} />
        <TeamCheckbox {...team} changeHandler={teamCheckhandler} />
        <FormButton />
      </FormContainer>
    </div>
  );
}
