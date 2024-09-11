import {
  Flex,
  Card,
  Stack,
  StackDivider,
  Box,
  Heading,
  Spacer,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Search2Icon, TriangleDownIcon } from "@chakra-ui/icons";

function Dashboard() {
  const navigate = useNavigate();
  const [appliedLoans, setAppliedLoans] = useState([]);
  const numAppliedLoans = appliedLoans.length;
  const [loans, setLoans] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const [filter, setFilter] = useState("All");
  const handlSearchChange = (e) => setSearch(e.target.value);

  const numRejectedLoans = appliedLoans.filter(
    (x) => x.status === "Denied",
  ).length;
  const numApprovedLoans = appliedLoans.filter(
    (x) => x.status === "Approved",
  ).length;
  const loanMap = {};
  if (loans) {
    loans.forEach((loan) => {
      loanMap[loan.id] = loan;
    });
  }

  const filteredLoans = appliedLoans.filter((x) => {
    const matchesSearch = search
      ? loanMap[x.loan_id]?.name.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesFilter = filter === "All" || x.status === filter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/loan/`)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoans(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/loan_application/`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setAppliedLoans(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Flex width={"100%"} direction={"column"} gap={"1rem"}>
      <Flex>
        <Heading fontSize="4xl" lineHeight="54px" fontWeight="500">
          Dashboard
        </Heading>
        <Spacer></Spacer>
        <Button onClick={() => navigate("/loans")}>New Loan</Button>
      </Flex>
      <Flex height={"10rem"} width={"100%"} gap={"1rem"}>
        <Flex flexGrow={"1"}>
          <Card
            width={"100%"}
            textAlign={"center"}
            height={"100%"}
            boxShadow={"lg"}
          >
            <Stack>
              <Text fontSize="2xl">Applications</Text>
              <Text fontSize={"6xl"}>{numAppliedLoans}</Text>
            </Stack>
          </Card>
        </Flex>
        <Flex flexGrow={"1"}>
          <Card
            width={"100%"}
            textAlign={"center"}
            height={"100%"}
            boxShadow={"lg"}
          >
            <Stack>
              <Text fontSize="2xl">Rejected</Text>
              <Text color="maroon" fontSize={"6xl"}>
                {numRejectedLoans}
              </Text>
            </Stack>
          </Card>
        </Flex>
        <Flex flexGrow={"1"}>
          <Card
            width={"100%"}
            textAlign={"center"}
            height={"100%"}
            boxShadow={"lg"}
          >
            <Stack>
              <Text fontSize="2xl">Approved</Text>
              <Text color={"green"} fontSize={"6xl"}>
                {numApprovedLoans}
              </Text>
            </Stack>
          </Card>
        </Flex>
      </Flex>
      <Flex>
        <Heading fontSize="4xl" lineHeight="54px" fontWeight="500">
          Recent Loan Applications
        </Heading>
      </Flex>
      <Flex minH={"35rem"} width={"100%"} gap={"1rem"}>
        <Flex flexGrow={"1"}>
          <Card width={"100%"} boxShadow={"lg"} height={"100%"}>
            <CardBody>
              <Flex alignItems="flex-end" justifyContent="flex-end">
                <Flex>
                  <InputGroup>
                    <Input
                      maxW={"30rem"}
                      onChange={handlSearchChange}
                      placeholder="Search for Application"
                    />
                    <InputRightElement>
                      <Search2Icon />
                    </InputRightElement>
                  </InputGroup>
                </Flex>
                <Menu>
                  <MenuButton as={Button} marginLeft="10px">
                    <TriangleDownIcon style={{ marginBottom: "7px" }} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setFilter("All")}>All</MenuItem>
                    <MenuItem onClick={() => setFilter("Approved")}>
                      Approved
                    </MenuItem>
                    <MenuItem onClick={() => setFilter("Denied")}>
                      Denied
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>

              <Stack divider={<StackDivider />} spacing="4">
                {filteredLoans.map((x) =>
                  loanMap[x.loan_id] ? (
                    <Box key={x.id}>
                      <Heading size="s" textTransform="uppercase">
                        {loanMap[x.loan_id].name}
                      </Heading>
                      <Text fontSize="sm">{x.id}</Text>
                      <Text fontSize="m">
                        Amount: {loanMap[x.loan_id].amount}
                      </Text>
                      <Text color={"gray"} fontSize="sm">
                        {new Date(x.created_at).toLocaleDateString()}
                      </Text>
                      <Text>Status: {x.status}</Text>
                    </Box>
                  ) : null,
                )}
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Dashboard;
