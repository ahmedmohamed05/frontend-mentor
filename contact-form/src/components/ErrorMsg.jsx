/* eslint-disable react/prop-types */
export default function Errormsg({ msg, show }) {
  return <span>{show && msg}</span>;
}
