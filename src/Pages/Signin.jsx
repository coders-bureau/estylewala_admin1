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
  const [mobileNumber, setMobileNumber] = useState(false);
  const [hash, setHashcode] = useState("");
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

  // useEffect(() => {
  //   authii();
  // }, []);

  // useEffect(() => {
  //   try {
  //     let nmbr = JSON.parse(localStorage.getItem("MbNumber")) || false;

  //     if (!nmbr) {
  //       navigate("/login", { state: comingFrom, replace: true });
  //     } else {
  //       setMbNumber(nmbr);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [mbNumber]);

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

    axios
      .post(
        `${process.env.REACT_APP_BASE_API}/admin/verifyotp`,
        { mobileNumber, hash, code }
        // config
      )
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        localStorage.setItem("authToken", token);
        // navigate("/");
        setLoading(false);
        dispatch(login());
        toast({
          position: "top",
          title: `Login successful`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast({
          position: "top",
          title: error.response.data.message,
          status: "error",
          isClosable: true,
          duration: 3000,
        });
        console.error("Error verifying User", error);
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
        const mobileNumber = input;
        axios
          .post(
            `${process.env.REACT_APP_BASE_API}/admin/getotp`,
            { mobileNumber }
            // config
          )
          .then((res) => {
            console.log(res.data);
            setMobileNumber(res.data.mobileNumber);
            setHashcode(res.data.hash);
            setViewOtpForm(true);
            setLoading(false);
            toast({
              position: "top",
              title: "Otp has been sent.",
              status: "success",
              isClosable: true,
              duration: 3000,
            });
          })
          .catch((error) => {
            setLoading(false);
            toast({
              position: "top",
              title:
                "Something went wrong. Please reload and try again. Server Issue/Network Issue",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
            console.error("Error sending OTP", error);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  // const authii = async () => {
  //   const auth_token = localStorage.getItem("authToken");
  //   axios.defaults.headers.common["auth_token"] = `${auth_token}`;
  //   if(auth_token){
  //     await axios
  //     .get(`${process.env.REACT_APP_BASE_API}/admin/adminloginstatus`)
  //     .then((response) => {
  //       // setisAuth(true);
  //       console.log(response);
  //       dispatch(login());
  //     })
  //     .catch((error) => {
  //       // setisAuth(false);
  //       console.error("Error: ", error);
  //       dispatch(login("logout"));
  //     });
  //   }
  //   dispatch(login("logout"));
  // };
  // console.log(value);
  return (
    <>
      {/* <button
        onClick={() => {
          axios
            .post(`${process.env.REACT_APP_BASE_API}/admin/login`, {
              mobileNumber: 7083105861,
            })
            .then((res) => {
              console.log(res.data.token);
              // document.cookie = res.data.token;
              const token = res.data.token;
              console.log("token from db" , token)
              
              dispatch(login());
              localStorage.setItem("authToken", token);
              
              console.log("token from local" , localStorage.getItem("authToken"))
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
              if(authToken){
                navigate("/");
                // dispatch(login());
              }
            })
            .catch((error) => console.error("Error Adding User", error));
        }}
      >
        click me to buypass login
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
                  Send to {mobileNumber}
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
