import { Flex, Spacer, Heading, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../context";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../constants";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  return (
    <Flex padding={"1rem"} backgroundColor={PRIMARY_COLOR} color={"white"}>
      <Heading
        cursor={"pointer"}
        onClick={() => (window.location.href = "/dashboard")}
      >
        Loan Don!
      </Heading>
      <Spacer></Spacer>
      {user ? (
        <>
          <Text>{user.name}</Text>{" "}
          <Text
            cursor={"pointer"}
            onClick={() => {
              window.sessionStorage.setItem("token", undefined);
              setUser(undefined);
              window.location.href = "/login";
            }}
            marginLeft={"1rem"}
          >
            Log Out
          </Text>{" "}
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </Flex>
  );
}
export default Navbar;
