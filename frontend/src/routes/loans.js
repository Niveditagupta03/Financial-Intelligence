import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  SimpleGrid,
  Box,
  Text,
  useDisclosure,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { PRIMARY_COLOR } from "../constants";
import { Link } from "@chakra-ui/react";

function Loans() {
  const {
    isOpen: isConfirmationWindowOpen,
    onOpen: onConfirmationWindowOpen,
    onClose: onConfirmationWindowClose,
  } = useDisclosure();

  const {
    isOpen: isApplicationWindowOpen,
    onOpen: onApplicationWindowOpen,
    onClose: onApplicationWindowClose,
  } = useDisclosure();

  const [loans, setLoans] = useState(undefined);
  const [selectedLoan, setSelectedLoan] = useState(undefined);
  const [loanTerm, setLoanTerm] = useState(3);
  const apply = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/loan_application/${selectedLoan}`,
        {
          loan_term: loanTerm,
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
        },
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          onConfirmationWindowOpen();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const loanCategoryMap = {};
  if (loans) {
    loans.forEach((x) => {
      if (!loanCategoryMap[x.category]) {
        loanCategoryMap[x.category] = [];
      }
      loanCategoryMap[x.category].push(x);
    });
  }
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

  return (
    <>
      <Link href={"/dashboard"}>
        <Text marginLeft="20px" size={"2xl"}>
          Back to Dashboard
        </Text>
      </Link>
      <Modal
        isOpen={isConfirmationWindowOpen}
        onClose={onConfirmationWindowClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Loan Applied Successfully</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onConfirmationWindowClose}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isApplicationWindowOpen}
        onClose={onApplicationWindowClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pick Loan Term</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{loanTerm} months</Text>
            <Slider
              aria-label="slider-ex-2"
              colorScheme="pink"
              defaultValue={12}
              min={3}
              max={36}
              step={1}
              onChange={(e) => {
                setLoanTerm(e);
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              width="150px"
              onClick={() => {
                onApplicationWindowClose();
                apply();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        direction={"column"}
        gap={"1rem"}
        marginLeft="20px"
        marginRight="20px"
      >
        {Object.keys(loanCategoryMap).map((category) => (
          <>
            <Heading color={PRIMARY_COLOR}>{category}</Heading>
            <SimpleGrid spacing={"1rem"} columns={"3"} marginTop={"1rem"}>
              {loanCategoryMap[category].map((loan) => (
                <Box
                  boxShadow="lg"
                  padding={"1rem"}
                  backgroundColor={"white"}
                  borderRadius={"0.2rem"}
                >
                  <Heading size="s" textTransform="">
                    {loan.name}
                  </Heading>
                  <Text fontSize="sm">{loan.id}</Text>
                  <Text fontSize="m">Amount: {loan.amount}</Text>
                  <Button
                    onClick={() => {
                      setSelectedLoan(loan.id);
                      onApplicationWindowOpen();
                    }}
                    width={"150px"}
                    backgroundColor={PRIMARY_COLOR}
                    color={"white"}
                    marginTop={"1rem"}
                  >
                    Apply
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </>
        ))}
      </Flex>
    </>
  );
}
export default Loans;
