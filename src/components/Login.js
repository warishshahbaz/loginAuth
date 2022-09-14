import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  // navigate to register
  const registerHandle = () => {
    navigate("/register");
  };

  // submit login

  const loginSubmit = (e) => {
    e.preventDefault();

    setEmail(" ");
    setPass(" ");
    let log_record = new Array();
    log_record = JSON.parse(localStorage.getItem("register"))
      ? JSON.parse(localStorage.getItem("register"))
      : [];
    if (
      log_record.some((x) => {
        return x.username == email || (x.email == email && x.password == pass);
      })
    ) {
      alert("login successfull");
      navigate("/home");
    } else {
      alert("Fail, please register first");
    }

    setEmail("");
    setPass("");
  };

  return (
    <Container
      bg="blue.500"
      maxW="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack bg="white" boxShadow="lg" w="500px" borderRadius="7" p="5">
        <Box mb="4" display="flex" justifyContent="center">
          <Heading as="h1" textTransform="capitalize">
            sign in
          </Heading>
        </Box>

        <Box as="form" alignItems="flex-end" onSubmit={loginSubmit}>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </FormControl>
          <Box>
            <Checkbox>Terms and Condition</Checkbox>
          </Box>
          <Button
            type="submit"
            mt="4"
            width="full"
            bg="blue.600"
            colorScheme="blue"
          >
            Submit
          </Button>
          <Flex>
            <Text as="p" p="2" mr="5">
              {" "}
              not a member?
              <Link color="blue" onClick={registerHandle}>
                Register Now
              </Link>
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
