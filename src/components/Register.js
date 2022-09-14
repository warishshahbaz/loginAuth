import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
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

// getting data from localstorage
let getLocaleStorage = () => {
  let list = localStorage.getItem("register");
  if (list) {
    return JSON.parse(localStorage.getItem("register"));
  } else {
    return [];
  }
};

const Register = () => {
  //const[data,setData] = useState([]);
  const [regData, setRegData] = useState(getLocaleStorage());
  const navigate = useNavigate();

  // checking availability in localstorage
  const checkAvailabilityUsername = (username) => {
    if (regData.some((x) => x.username == username)) {
      return false;
    }
    return true;
  };
  const checkAvailabilityEmail = (email) => {
    if (regData.some((x) => x.email == email)) {
      return false;
    }
    return true;
  };

  // formik and yup for validation
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(1, "Mininum 1 characters")
        .max(15, "Maximum 15 characters")
        .test(
          "username",
          "This username has already been taken",
          function (username) {
            return checkAvailabilityUsername(username);
          }
        )
        .required("You must enter a username"),
      email: Yup.string()
        .email("Invalid email format")
        .test(
          "email",
          "This email has already been registered",
          function (email) {
            return checkAvailabilityEmail(email);
          }
        )
        .required("Your email is required"),
      password: Yup.string()
        .required()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      cpassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      setRegData([...regData, values]);
      console.log(regData);
      resetForm({ values: "" });
    },
  });

  // setiing data into the localstorage
  useEffect(() => {
    localStorage.setItem("register", JSON.stringify(regData));
  }, [regData]);

  // navigate to login page
  const loginHandle = () => {
    navigate("/");
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
            sign up
          </Heading>
        </Box>

        <Box as="form" alignItems="flex-end" onSubmit={formik.handleSubmit}>
          <FormControl mb="4">
            <FormLabel>User Name</FormLabel>
            <Input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <p style={{ color: "red" }}>{formik.errors.username}</p>
            )}
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            )}
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p style={{ color: "red" }}>{formik.errors.password}</p>
            )}
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="cpassword"
              onChange={formik.handleChange}
              value={formik.values.cpassword}
            />
            {formik.touched.cpassword && formik.errors.cpassword && (
              <p style={{ color: "red" }}>{formik.errors.cpassword}</p>
            )}
          </FormControl>
          <Flex>
            <Text as="p" textTransform="capitalize" p="2" mr="5">
              if already have register
              <Link color="blue" onClick={loginHandle}>
                Sign In
              </Link>
            </Text>
          </Flex>
          <Button
            type="submit"
            mt="4"
            width="full"
            bg="blue.600"
            colorScheme="blue"
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
