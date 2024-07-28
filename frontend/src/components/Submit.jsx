/* eslint-disable react/prop-types */
import { useState } from "react";

const Submit = ({ isPending }) => {
  const [pending, setNoPending] = useState(false);

  async function submitFormDelay() {
    await new Promise((res) => setTimeout(res, 1000));
  }

  async function handleSubmit() {
    setNoPending(isPending);
    console.log("Receipt", isPending);
    await submitFormDelay();
    setNoPending(false);
  }

  return (
    <button type="submit" onClick={handleSubmit}>
      {pending ? "Publishing..." : "Publish"}
    </button>
  );
};

export default Submit;