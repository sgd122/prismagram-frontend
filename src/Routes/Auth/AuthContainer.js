import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import userInput from "../../Hooks/userInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = userInput("");
  const email = userInput("dirrksdl@naver.com");
  const firstName = userInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error(
          "입력한 계정을 찾을 수 없습니다.이메일을 확인하고 다시 시도하세요."
        );
        setTimeout(() => setAction("signUp"), 2000);
      }
    },
    variables: { email: email.value },
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("이메일은 필수입력 입니다.");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== ""
      ) {
        createAccount();
      } else {
        toast.error("모든 항목을 기입하세요.");
      }
    }
  };
  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      email={email}
      firstName={firstName}
      onSubmit={onSubmit}
    />
  );
};
