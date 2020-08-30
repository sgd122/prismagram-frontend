import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import userInput from "../../Hooks/userInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = userInput("");
  const secret = userInput("");
  const email = userInput("");
  const firstName = userInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      name: username.value,
      firstName: firstName.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error(
              "입력한 계정을 찾을 수 없습니다.이메일을 확인하고 다시 시도하세요."
            );
            setTimeout(() => setAction("signUp"), 2000);
          } else {
            toast.success("받은 편지함에서 login secret을 확인하십시오.");
            setAction("confirm");
          }
        } catch (e) {
          toast.error("이메일을 확인하고 다시 시도하세요.");
        }
      } else {
        toast.error("이메일은 필수입력 입니다.");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("가입에 실패하였습니다. 다시 시도하세요.");
          } else {
            toast.success("계정이 생성되었습니다! 지금 로그인하십시오");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error("가입에 실패하였습니다. 다시 시도하세요.");
        }
      } else {
        toast.error("모든 항목을 기입하세요.");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          //TODO: log user in
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Can't confirm secret,check again");
        }
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
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
