import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  Text,
  Input,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Link as ChakraLink,
  Button,
  useToast,
  Image,
  PinInput,
  PinInputField,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/UserReducer/Action";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../Redux/AuthReducer/Action";
import firebase from "../firebase";
import AdminNavbar from "../Admin/AdminNavbar";
import Cookies from "js-cookie";

const Signin = () => {
  const [mbNumber, setMbNumber] = useState(false);
  const [value, setValue] = useState("");
  const prevLocation = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const comingFrom = location?.state || "/";
  const dispatch = useDispatch();
  const user = useSelector((store) => store.UserReducer);
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const auth = firebase.auth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prevLocation.current = location;
  }, [location]);

  useEffect(() => {
    authii();
  }, []);

  useEffect(() => {
    try {
      let nmbr = JSON.parse(localStorage.getItem("MbNumber")) || false;

      if (!nmbr) {
        navigate("/login", { state: comingFrom, replace: true });
      } else {
        setMbNumber(nmbr);
      }
    } catch (error) {
      console.log(error);
    }
  }, [mbNumber]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (isError) {
      setIsError(false);
    }
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   handleSubmit();
          //   console.log(response);
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    setLoading("true");

    const code = value;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;
        // console.log(JSON.stringify(user));
        // alert("User is verified");

        const mobileNumber = input;
        const config = { headers: { "Contnet-Type": "application/json" } };
        console.log(input);
        axios
          .post("http://localhost:5000/admin/signup", { mobileNumber }, config)
          .then((res) => {
            console.log(res);
            const token = res.data.token;

            localStorage.setItem("authToken", token);
            dispatch(login());

            // authii();
          })
          .catch((error) => console.error("Error Adding User", error));

        dispatch(getUserDetails(mobileNumber));
        //   navigate("/otp", { state: comingFrom, replace: true });
        toast({
          position: "top",
          title: `Login successful`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        // console.log(comingFrom);
        setLoading("false");
        navigate("/");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setLoading("false");

        toast({
          position: "top",
          title: `Wrong OTP entered`,
          status: "error",
          isClosable: true,
          duration: 1500,
        });
        setValue("");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input.length !== 10 || +input != input) {
      setIsError(true);
    } else {
      try {
        //mobile no. registration
        localStorage.setItem("MbNumber", +input);

        configureCaptcha();
        const phoneNumber = "+91" + input;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("OTP has been sent");
            // ...
            setLoading(false);
            setViewOtpForm(true);
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
            setLoading(false);

            toast({
              position: "top",
              title: "Something went wrong. Please reload and try again",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
            // toast({
            //   title: error.response.data.error,
            //   variant: "top-accent",
            //   isClosable: true,
            //   position: "top-center",
            //   status: "error",
            //   duration: 1500,
            // });
            console.log("SMS not sent " + error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const authii = async () => {
    const auth_token = localStorage.getItem("authToken");
    axios.defaults.headers.common["auth_token"] = `${auth_token}`;
    await axios
      .get("http://localhost:5000/admin/adminloginstatus")
      .then((response) => {
        // setisAuth(true);
        console.log(response);
        dispatch(login());
      })
      .catch((error) => {
        // setisAuth(false);
        console.error("Error: ", error);
        dispatch(login("logout"));
      });
  };
  console.log(value);
  return (
    <>
      {/* <button
        onClick={() => {
          axios
            .post("http://localhost:5000/admin/login", {
              mobileNumber: 7083105861,
            })
            .then((res) => {
              console.log(res.data.token);
              // document.cookie = res.data.token;
              const token = res.data.token;

              localStorage.setItem("authToken", token);

              // const cookieOptions = {
              //   expires: 30, // Expires in 30 days
              //   path: "/", // Set the path for which the cookie is accessible
              //   // httpOnly: true, // Set the cookie as HTTP-only for security
              // };

              // // Set the "auth-token" cookie using js-cookie
              // Cookies.set("auth_token", token, cookieOptions);
              // const authToken = Cookies.get("auth_token");
              const authToken = localStorage.getItem("authToken");
              console.log(authToken);
            })
            .catch((error) => console.error("Error Adding User", error));
        }}
      >
        click
      </button> */}
      {/* <button onClick={authii}>authii</button> */}
      {!viewOtpForm ? (
        <Box>
          <Center w={"full"} bgColor="#fceeea" h={"100vh"}>
            <VStack w={"420px"} spacing="0">
              <Box
                as="form"
                onSubmit={handleSubmit}
                w={"100%"}
                p={"40px 30px 10px 30px"}
                bgColor="white"
              >
                <FormControl isRequired isInvalid={isError}>
                  <FormLabel display={"flex"} as="div">
                    <Center>
                      <HStack
                        w="full"
                        alignItems={"baseline"}
                        gap="0"
                        spacing={"5px"}
                      >
                        <Heading
                          fontWeight={"600"}
                          as={"h2"}
                          color="#424553"
                          fontSize="24px"
                          size="lg"
                        >
                          Login&nbsp;
                        </Heading>
                        <Text fontSize={"18px"} color="#5a5e6d">
                          or
                        </Text>
                        <Heading
                          fontWeight={"600"}
                          as={"h2"}
                          color="#424553"
                          fontSize="24px"
                          size="lg"
                        >
                          &nbsp;Signup
                        </Heading>
                      </HStack>
                    </Center>
                  </FormLabel>

                  <InputGroup mt={10} size={"sm"} variant={"outline"}>
                    <InputLeftAddon p={"15px 10px"} children="+91" />
                    <Input
                      p={"15px 10px"}
                      focusBorderColor="#f4f4f4"
                      maxLength={10}
                      minLength={10}
                      type="tel"
                      placeholder="Mobile Number"
                      value={input}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  {!isError ? (
                    true
                  ) : (
                    <FormErrorMessage fontSize={12}>
                      Please enter a valid mobile number(10 digit)
                    </FormErrorMessage>
                  )}
                  <FormHelperText mt={8} color={"#a7a9af"} textAlign="left">
                    By continuing, I agree to the&nbsp;
                    <ChakraLink
                      fontWeight={"bold"}
                      _hover={{ textDecoration: "none" }}
                      color={"#ff3f6c"}
                      href="/termsofuse"
                    >
                      Terms of Use&nbsp;
                    </ChakraLink>
                    &&nbsp;
                    <ChakraLink
                      fontWeight={"bold"}
                      _hover={{ textDecoration: "none" }}
                      color={"#ff3f6c"}
                      href="/privacypolicy"
                    >
                      Privacy Policy&nbsp;
                    </ChakraLink>
                  </FormHelperText>

                  <Button
                    w={"100%"}
                    mt={8}
                    mb={4}
                    variant="solid"
                    backgroundColor="#ff3f6c"
                    color={"#fff"}
                    borderRadius="0"
                    colorScheme={"none"}
                    type="submit"
                    // onClick={handleSubmit}
                  >
                    {loading ? (
                      <CircularProgress
                        isIndeterminate
                        size={7}
                        margin={"0 10px"}
                        color="white"
                      />
                    ) : (
                      "CONTINUE"
                    )}
                  </Button>
                </FormControl>

                <Text mb={10} color={"#a7a9af"} textAlign="left">
                  Have trouble logging in?
                  <ChakraLink
                    fontWeight={"bold"}
                    _hover={{ textDecoration: "none" }}
                    color={"#ff3f6c"}
                    href="/faqs"
                  >
                    &nbsp;Get help
                  </ChakraLink>
                </Text>
              </Box>
            </VStack>
          </Center>
        </Box>
      ) : (
        <Box>
          <Center w={"full"} bgColor="#fceeea" h={"100vh"}>
            <Box
              as="form"
              onSubmit={onSubmitOTP}
              bgColor="white"
              w={"400px"}
              p="50px"
            >
              <Box>
                <Image
                  size="50px"
                  boxSize={"100px"}
                  src="https://constant.myntassets.com/pwa/assets/img/3a438cb4-c9bf-4316-b60c-c63e40a1a96d1548071106233-mobile-verification.jpg"
                />
              </Box>

              <Box textAlign={"left"} mt={2} mb={2}>
                <Heading
                  fontWeight={"600"}
                  as={"h2"}
                  color="#424553"
                  fontSize="20px"
                  size="lg"
                >
                  Verify with OTP
                </Heading>
                <Text fontSize={"12px"} mt={2} color={"#a7a9af"}>
                  Send to {mbNumber}
                </Text>
              </Box>
              {/* <form onSubmit={onSignInSubmit}> */}
              <HStack m={"40px 0px 25px 0px"}>
                <PinInput
                  value={value}
                  onChange={setValue}
                  otp
                  mask
                  placeholder="&#10146;"
                >
                  <PinInputField w="30px" h="40px" />
                  <PinInputField w="30px" h="40px" />
                  <PinInputField w="30px" h="40px" />
                  <PinInputField w="30px" h="40px" />
                  <PinInputField w="30px" h="40px" />
                  <PinInputField w="30px" h="40px" />
                </PinInput>
              </HStack>
              <Box mb={8}>
                <Button
                  textAlign={"left"}
                  color={"#ff3f6c"}
                  bgColor={"#ffffff"}
                  fontWeight="bold"
                  fontSize={"16px"}
                  cursor={"pointer"}
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress
                      isIndeterminate
                      size={7}
                      color="#ff3f6c"
                    />
                  ) : (
                    "Submit OTP"
                  )}
                </Button>
              </Box>
            </Box>
          </Center>
        </Box>
      )}
    </>
  );
};

export default Signin;
