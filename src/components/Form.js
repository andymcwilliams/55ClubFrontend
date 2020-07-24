import React from "react";

function Form(props) {
  return (
    <form>
      <input
        type="text"
        placeholder={props.placeholder}
        required
        value={props.value}
        onChange={props.changeHandler}
      />
    </form>
  );
}

export default Form;
