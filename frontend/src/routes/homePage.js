import { useState } from "react";

function HomePage() {
  const [email, setEmail] = useState(undefined);
  const handlEmailChange = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState(undefined);
  const handlPasswordChange = (e) => setPassword(e.target.value);

  const isEmailError =
    email !== undefined &&
    (email === "" ||
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ));
  const isPasswordError = password !== undefined && password === "";

  return <></>;
}

export default HomePage;
