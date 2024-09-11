import { Flex, Link, Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { useState, useContext } from "react";
import axios from "axios";
import { PRIMARY_COLOR, ACCENT_COLOR } from "../constants";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import UserContext from "../context";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const handlEmailChange = (e) => setEmail(e.target.value);
  const { setUser } = useContext(UserContext);
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
  const submitForm = () => {
    let canSubmit = true;

    if (email === undefined) {
      setEmail("");
      canSubmit = false;
    }

    if (password === undefined) {
      setPassword("");
      canSubmit = false;
    }

    if (!canSubmit) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          const token = response.data;
          axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/info/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(function (response) {
              console.log(response);
              if (response.status === 200) {
                setUser(response.data);

                window.sessionStorage.setItem("token", token);
                navigate("/dashboard");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Spacer></Spacer>
      <Flex>
        <Spacer></Spacer>
        <Card
          boxShadow={"lg"}
          backgroundColor={"#fff"}
          padding={"1rem"}
          borderRadius={"0.5rem"}
          width={"100%"}
          maxW={"500px"}
        >
          <FormControl isInvalid={isEmailError}>
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              onChange={handlEmailChange}
              required
              type="email"
            />
            {isEmailError ? (
              <FormErrorMessage>Invaild email</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={isPasswordError}>
            <FormLabel>Password </FormLabel>
            <Input
              value={password}
              onChange={handlPasswordChange}
              required
              type="password"
            />
            {isPasswordError ? (
              <FormErrorMessage>Password can't be empty </FormErrorMessage>
            ) : null}
          </FormControl>
          <Button
            onClick={submitForm}
            backgroundColor={PRIMARY_COLOR}
            color={"white"}
            marginTop={"30px"}
          >
            Login
          </Button>
          <Link marginTop="1rem" color={PRIMARY_COLOR} href="/signup">
            {" "}
            signup instead
          </Link>
        </Card>
        <Spacer></Spacer>
      </Flex>
      <Spacer></Spacer>
    </>
  );
}

export default LoginPage;
