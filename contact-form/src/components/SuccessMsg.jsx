import successIcon from "../images/icon-success-check.svg";

export default function SuccessMsg() {
  return (
    <div className="success-msg">
      <div className="msg-header">
        <img className="icon" src={successIcon} alt="Circle Check Icon" />
        <p className="msg-content">Message Sent!</p>
      </div>
      <p className="msg-description">
        Thanks for completing the form. We&apos;ll be in touch soon!
      </p>
    </div>
  );
}
