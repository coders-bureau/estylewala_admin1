import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Text,
  Button,
  Input,
  useToast,
  VStack,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AccountPage = () => {
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });
  const toast = useToast();

  useEffect(() => {
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/adminloginstatus`
      ); // Modify the endpoint accordingly
      setAdminInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching admin info:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_API}/admin/profileupdate`,
        adminInfo
      ); // Modify the endpoint accordingly
      console.log("Profile updated successfully");
      toast({
        position: "top",
        title: `Profile updated successfully`,
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      fetchAdminInfo();
    } catch (error) {
      toast({
        position: "top",
        title: `Error in Updating`,
        status: "Error",
        isClosable: true,
        duration: 1500,
      });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Center minHeight="100vh">
      <AdminNavbar />
      {/* <Box borderWidth="1px" p="4" rounded="md" width="400px">
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Account Details
        </Text> */}
      {/* <VStack gap={10}> */}
      {/* <Text margin={5}>{adminInfo.name}</Text>
          <Text>{adminInfo.email}</Text>
          <Text>{adminInfo.mobileNumber}</Text> */}
      {/* </VStack> */}

      {/* <Input
          name="name"
          value={adminInfo.name}
          onChange={handleInputChange}
          placeholder="Name"
          mb="2"
        />
        <Input
          name="email"
          value={adminInfo.email}
          onChange={handleInputChange}
          placeholder="Email"
          mb="2"
        />
        <Input
          name="mobileNumber"
          value={adminInfo.mobileNumber}
          onChange={handleInputChange}
          placeholder="Mobile Number"
          mb="4"
        /> */}
      {/* <Button colorScheme="blue" onClick={handleUpdateProfile}>
          Update Profile
        </Button> */}
      {/* </Box> */}
      <Box
        bg="white"
        boxShadow="xl"
        p={6}
        rounded="md"
        w={["90%", "70%", "30%"]}
      >
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Profile Details
          </Text>
          <Flex direction="column" alignItems="flex-start">
            <Text>Name: {adminInfo.name}</Text>
            <Text>Email: {adminInfo.email}</Text>
            <Text>Mobile Number: {adminInfo.mobileNumber}</Text>
          </Flex>
        </VStack>
      </Box>
    </Center>
  );
};

export default AccountPage;
