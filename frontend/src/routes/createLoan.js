import { Flex, Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

function CreateLoan() {
  const navigate = useNavigate();
  const [name, setName] = useState(undefined);
  const handleNameChange = (e) => setName(e.target.value);

  const [category, setCategory] = useState(undefined);
  const handlePasswordChange = (e) => setCategory(e.target.value);

  const [amount, setAmount] = useState(undefined);
  const handlAmountChange = (e) => setAmount(e.target.value);

  const nameError =
    name === undefined ? null : name === "" ? "Name is required " : null;
  const isCategoryError = category !== undefined && category === "";
  const amountError =
    amount === undefined
      ? null
      : amount === ""
        ? "Age is required"
        : amount < 0
          ? "Age can't be -ve"
          : null;

  const submitForm = () => {
    let canSubmit = true;

    if (name === undefined) {
      setName("");
      canSubmit = false;
    }

    if (category === undefined) {
      setCategory("");
      canSubmit = false;
    }
    if (amount === undefined) {
      setAmount("");
      canSubmit = false;
    }

    if (!canSubmit) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/loan/`, {
        amount: amount,
        name: name,
        category: category,
      })
      .then(function (response) {
        console.log(response);
        // navigate("/login");
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
        <Flex direction={"column"} width={"100%"} maxW={"500px"}>
          <Heading color={"white"}>Create Loan</Heading>
          <Card
            backgroundColor={"#fff"}
            padding={"1rem"}
            borderRadius={"0.5rem"}
            marginTop={"1rem"}
          >
            <FormControl isInvalid={nameError}>
              <FormLabel>Name</FormLabel>
              <Input
                required
                type="email"
                value={name}
                onChange={handleNameChange}
              />
              {nameError ? (
                <FormErrorMessage>{nameError}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isCategoryError}>
              <FormLabel>Category </FormLabel>
              <Input
                value={category}
                onChange={handlePasswordChange}
                required
              />
              {isCategoryError ? (
                <FormErrorMessage>Password is required</FormErrorMessage>
              ) : null}
            </FormControl>

            <FormControl isInvalid={amountError}>
              <FormLabel>Amount </FormLabel>
              <Input
                value={amount}
                onChange={handlAmountChange}
                type="number"
                required
              />
              {amountError ? (
                <FormErrorMessage>{amountError}</FormErrorMessage>
              ) : null}
            </FormControl>

            <Button
              colorScheme="blue"
              minH={"2.5rem"}
              marginTop={"30px"}
              onClick={submitForm}
            >
              Sign Up
            </Button>
          </Card>
        </Flex>
        <Spacer></Spacer>
      </Flex>
      <Spacer></Spacer>
    </>
  );
}

export default CreateLoan;
