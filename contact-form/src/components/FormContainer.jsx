/* eslint-disable react/prop-types */

export default function FormContainer({ children, submitHandler }) {
  return (
    <form className="form-container" onSubmit={submitHandler}>
      {children}
    </form>
  );
}
