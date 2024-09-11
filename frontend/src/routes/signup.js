import { Flex, Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../constants";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
function SignUpPage() {
  const navigate = useNavigate();

  const [residentialAssetsValue, setResidentialAssetsValue] =
    useState(undefined);
  const handleResidentialAssetsValueChange = (e) =>
    setResidentialAssetsValue(e.target.value);

  const [commercialAssetsValue, setCommercialAssetsValue] = useState(undefined);
  const handleCommercialAssetsValueChange = (e) =>
    setCommercialAssetsValue(e.target.value);

  const [luxuryAssetsAalue, setLuxuryAssetsAalue] = useState(undefined);
  const handleLuxuryAssetsAalueChange = (e) =>
    setLuxuryAssetsAalue(e.target.value);

  const [bankAssetValue, setBankAssetValue] = useState(undefined);
  const handleBankAssetValueChange = (e) => setBankAssetValue(e.target.value);
 
  const [email, setEmail] = useState(undefined);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState(undefined);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [firstName, setFirstName] = useState(undefined);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const [lastName, setLastName] = useState(undefined);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const [gender, setGender] = useState(undefined);
  const handleGenderChange = (e) => {
    setGender(e);
  };
  const [age, setAge] = useState(undefined);
  const handlAgeChange = (e) => setAge(e.target.value);

  const [marital, setMarital] = useState(undefined);
  const handleMaritalChange = (e) => setMarital(e);

  const [education, setEducation] = useState(undefined);
  const handleEducationChange = (e) => setEducation(e);

  const [selfEmployed, setSelfEmployed] = useState(undefined);
  const handleSelfEmployedChange = (e) => setSelfEmployed(e);

  const [dependents, setDependents] = useState(undefined);
  const handleDependentsChange = (e) => setDependents(e.target.value);

  const [annualIncome, setAnnualIncome] = useState(undefined);
  const handleAnnualIncomeChange = (e) => setAnnualIncome(e.target.value);
  

  const [creditScore, setCreditScore] = useState(undefined);
  const handleCreditScoreChange = (e) => setCreditScore(e.target.value);

  const [propertyArea, setPropertyArea] = useState(undefined);
  const handlePropertyAreaChange = (e) => setPropertyArea(e.target.value);

  const emailError =
    email === undefined
      ? null
      : email === ""
        ? "Email is required "
        : !email
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              )
          ? "Invalid Email"
          : null;
  const isPasswordError = password !== undefined && password === "";
  const isFirstNameError = firstName !== undefined && firstName === "";
  const isLastNameError = lastName !== undefined && lastName === "";
  const isGenderError = gender !== undefined && gender === "";
  const ageError =
    age === undefined
      ? null
      : age === ""
        ? "Age is required"
        : age < 0
          ? "Age can't be -ve"
          : null;
  const isMaritalError = marital !== undefined && marital === "";
  const isEducationError = education !== undefined && education === "";
  const isSelfEmployedError = selfEmployed !== undefined && selfEmployed === "";
  const dependentsError =
    age === undefined
      ? null
      : dependents === ""
        ? "dependents is required"
        : dependents < 0
          ? "dependents can't be -ve"
          : null;
  const isAnnualIncomeError = annualIncome !== undefined && annualIncome === "";
  const isCreditScoreError = creditScore !== undefined && creditScore === "";
  const isPropertyAreaError = propertyArea !== undefined && propertyArea === "";
  const isResidentialAssetsValueError =
    residentialAssetsValue !== undefined && residentialAssetsValue === "";
  const isCommercialAssetsValueError =
    commercialAssetsValue !== undefined && commercialAssetsValue === "";
  const isLuxuryAssetsValueError =
    luxuryAssetsAalue !== undefined && luxuryAssetsAalue === "";
  const isBankAssetValueError =
    bankAssetValue !== undefined && bankAssetValue === "";

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
    if (firstName === undefined) {
      setFirstName("");
      canSubmit = false;
    }
    if (lastName === undefined) {
      setLastName("");
      canSubmit = false;
    }
    if (age === undefined) {
      setAge("");
      canSubmit = false;
    }
    if (gender === undefined) {
      setGender("");
      canSubmit = false;
    }
    if (marital === undefined) {
      setMarital("");
      canSubmit = false;
    }
    if (education === undefined) {
      setEducation("");
      canSubmit = false;
    }
    if (dependents === undefined) {
      setDependents("");
      canSubmit = false;
    }
    if (selfEmployed === undefined) {
      setSelfEmployed("");
      canSubmit = false;
    }
    if (annualIncome === undefined) {
      setAnnualIncome("");
      canSubmit = false;
    }
    if (propertyArea === undefined) {
      setPropertyArea("");
      canSubmit = false;
    }
    if (creditScore === undefined) {
      setCreditScore("");
      canSubmit = false;
    }
    if (residentialAssetsValue === undefined) {
      setResidentialAssetsValue("");
      canSubmit = false;
    }
    if (commercialAssetsValue === undefined) {
      setCommercialAssetsValue("");
      canSubmit = false;
    }
    if (luxuryAssetsAalue === undefined) {
      setLuxuryAssetsAalue("");
      canSubmit = false;
    }
    if (bankAssetValue === undefined) {
      setBankAssetValue("");
      canSubmit = false;
    }
    if (!canSubmit) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/`, {
        name: `${firstName} ${lastName}`,
        age: age,
        gender: gender,
        email: email,
        married: marital,
        education: education,
        dependents: dependents,
        self_employed: selfEmployed,
        income: annualIncome,
        credit_history: creditScore,
        property_area: propertyArea,
        password: password,
        residential_assets_value: residentialAssetsValue,
        commercial_assets_value: commercialAssetsValue,
        luxury_assets_value: luxuryAssetsAalue,
        bank_asset_value: bankAssetValue,
      })
      .then(function (response) {
        console.log(response);
        navigate("/login");
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
          <Heading color={"white"}>Sign Up</Heading>
          <Card
            boxShadow={"lg"}
            backgroundColor={"#fff"}
            padding={"1rem"}
            borderRadius={"0.5rem"}
            marginTop={"1rem"}
          >
            <FormControl isInvalid={emailError}>
              <FormLabel>Email address</FormLabel>
              <Input
                required
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError ? (
                <FormErrorMessage>{emailError}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isPasswordError}>
              <FormLabel>Password </FormLabel>
              <Input
                value={password}
                onChange={handlePasswordChange}
                required
                type="password"
              />
              {isPasswordError ? (
                <FormErrorMessage>Password is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isFirstNameError}>
              <FormLabel>First Name </FormLabel>
              <Input
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
              {isFirstNameError ? (
                <FormErrorMessage>First Name is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isLastNameError}>
              <FormLabel>Last Name </FormLabel>
              <Input
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
              {isLastNameError ? (
                <FormErrorMessage>Last Name is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={ageError}>
              <FormLabel>Age </FormLabel>
              <Input
                value={age}
                onChange={handlAgeChange}
                type="number"
                required
              />
              {ageError ? (
                <FormErrorMessage>{ageError}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isGenderError}>
              <FormLabel>Gender </FormLabel>
              <RadioGroup value={gender} onChange={handleGenderChange} required>
                <Stack direction="row">
                  <Radio value="Male">male</Radio>
                  <Radio value="Female">female</Radio>
                </Stack>
              </RadioGroup>
              {isGenderError ? (
                <FormErrorMessage>Gender is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isMaritalError}>
              <FormLabel>Marital Status </FormLabel>
              {isMaritalError ? (
                <FormErrorMessage>Marital Status is required</FormErrorMessage>
              ) : null}
              <RadioGroup
                value={marital}
                onChange={handleMaritalChange}
                required
              >
                <Stack direction="row">
                  <Radio value="Married">married</Radio>
                  <Radio value="unmarried">unmarried</Radio>
                </Stack>
              </RadioGroup>
              {isMaritalError ? (
                <FormErrorMessage>Marital Status is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isEducationError}>
              <FormLabel>Education </FormLabel>
              <RadioGroup
                value={education}
                onChange={handleEducationChange}
                required
              >
                <Stack direction="row">
                  <Radio value="Graduate">graduate</Radio>
                  <Radio value="Under Graduate">undergraduate</Radio>
                </Stack>
              </RadioGroup>
              {isEducationError ? (
                <FormErrorMessage>Education is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={dependentsError}>
              <FormLabel>Number of Dependents </FormLabel>
              <Input
                value={dependents}
                onChange={handleDependentsChange}
                required
                type="number"
              />
              {dependentsError ? (
                <FormErrorMessage>{dependentsError}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isSelfEmployedError}>
              <FormLabel>Self Employed </FormLabel>
              <RadioGroup
                value={selfEmployed}
                onChange={handleSelfEmployedChange}
                required
              >
                <Stack direction="row">
                  <Radio value="Y">yes</Radio>
                  <Radio value="N">no</Radio>
                </Stack>
              </RadioGroup>
              {isSelfEmployedError ? (
                <FormErrorMessage>Self Employed is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isAnnualIncomeError}>
              <FormLabel>Annual Income </FormLabel>
              <Input
                value={annualIncome}
                onChange={handleAnnualIncomeChange}
                required
                type="number"
              />
              {isAnnualIncomeError ? (
                <FormErrorMessage>Annual Income is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isCreditScoreError}>
              <FormLabel>Credit Score </FormLabel>
              <Input
                value={creditScore}
                onChange={handleCreditScoreChange}
                required
                type="number"
              />
              {isCreditScoreError ? (
                <FormErrorMessage>Credit Score is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isPropertyAreaError}>
              <FormLabel>Property Area </FormLabel>
              <Select
                value={propertyArea}
                onChange={handlePropertyAreaChange}
                required
                placeholder="Select option"
              >
                <option value="Urban">urban</option>
                <option value="Semi-Urban">semi-urban</option>
                <option value="Rural">rural</option>
              </Select>
              {isPropertyAreaError ? (
                <FormErrorMessage>Property Area is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isResidentialAssetsValueError}>
              <FormLabel>Residential Assets Value </FormLabel>
              <Input
                value={residentialAssetsValue}
                onChange={handleResidentialAssetsValueChange}
                required
                type="number"
              />
              {isResidentialAssetsValueError ? (
                <FormErrorMessage>
                  Residential Assets Value is required
                </FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isCommercialAssetsValueError}>
              <FormLabel>Commercial Assets Value</FormLabel>
              <Input
                value={commercialAssetsValue}
                onChange={handleCommercialAssetsValueChange}
                required
                type="number"
              />
              {isCommercialAssetsValueError ? (
                <FormErrorMessage>
                  Commercial Assets Value is required
                </FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isLuxuryAssetsValueError}>
              <FormLabel>Luxury Assets Value</FormLabel>
              <Input
                value={luxuryAssetsAalue}
                onChange={handleLuxuryAssetsAalueChange}
                required
                type="number"
              />
              {isCreditScoreError ? (
                <FormErrorMessage>
                  Luxury Assets Value is required
                </FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={isBankAssetValueError}>
              <FormLabel>Bank Asset Value</FormLabel>
              <Input
                value={bankAssetValue}
                onChange={handleBankAssetValueChange}
                required
                type="number"
              />
              {isBankAssetValueError ? (
                <FormErrorMessage>
                  Bank Asset Value is required
                </FormErrorMessage>
              ) : null}
            </FormControl>
            <Button
              backgroundColor={PRIMARY_COLOR}
              color={"white"}
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

export default SignUpPage;
