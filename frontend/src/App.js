import { Container, Flex, Spacer } from "@chakra-ui/react";
import "./App.css";
import router from "./routes/router";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import UserContext from "./context";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  // const [jsonData, setJsonData] = useState();

  // const getApiData = async () => {
  //   try {
  //     const config = {
  //       method: "GET",
  //       url: "http://0.0.0.0:8000/api/v1/user/",
  //     };
  //     const response = await axios(config);
  //     setJsonData(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    // getApiData();
    if (token) {
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
  }, []);
  const [user, setUser] = useState(undefined);
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <Flex minH={"100vh"} direction={"column"}>
          <Navbar></Navbar>
          {/* <Flex>{JSON.stringify(jsonData[0].email, null, 2)}</Flex> */}
          <Spacer></Spacer>
          <Flex direction={"column"} margin={"2rem"}>
            <RouterProvider router={router} />
          </Flex>
          <Spacer></Spacer>
        </Flex>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
