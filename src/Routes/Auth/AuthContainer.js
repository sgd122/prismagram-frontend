import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import userInput from "../../Hooks/userInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = userInput("");
  const email = userInput("");
  const firstName = userInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const onLogin = (e) => {
    e.preventDefault();
    if (email !== "") {
      requestSecret();
    }
  };
  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      email={email}
      firstName={firstName}
      onLogin={onLogin}
    />
  );
};
