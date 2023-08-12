import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const AdminRegistrationPage = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    // e.preventDefault();
    try {
     axios
        .post(`${process.env.REACT_APP_BASE_API}/admin/signup`, {
          name,
          mobileNumber,
          email,
        })
        .then(() => {
          toast({
            title: "Product successfully added in Databse",
            variant: "top-accent",
            isClosable: true,
            position: "top-right",
            status: "success",
            duration: 2500,
          });
          navigate("/admin-list");
        });
      // console.log(response.data);
      // Clear form fields after successful registration
      setName("");
      setMobileNumber("");
      setEmail("");
    } catch (error) {
      console.error("Error registering admin:", error);
      toast({
        title: "Admin already exist",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "erroe",
        duration: 2500,
      });
    }
  };

  return (
    <Box
      marginTop={"20px"}
      marginLeft={{ lg: "250px", md: "250px", base: "10px" }}
      w="70%"
    >
      <h2>Admin Registration</h2>
      <VStack  as="form" onSubmit={handleSubmit} spacing={4}>
        {/* Add form fields for each product property */}
        
        <FormControl isRequired>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Mobile Number:</FormLabel>
          <Input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Add Admin</Button>
      </VStack>

      <Spacer />
    </Box>
  );
};

export default AdminRegistrationPage;
