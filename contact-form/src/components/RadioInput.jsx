/* eslint-disable react/prop-types */

export default function RadioInput({
  id,
  halfWidth,
  label,
  name,
  selectHandler,
}) {
  const isHalfWidth = halfWidth && "half-width";
  return (
    <label className={isHalfWidth} htmlFor={id}>
      <input type="radio" name={name} id={id} onClick={selectHandler} />
      <span>{label}</span>
    </label>
  );
}
