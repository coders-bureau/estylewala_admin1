import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";
import AdminRegistrationPage from "./AdminRegistrationPage";
import { DeleteIcon } from "@chakra-ui/icons";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/alladmins`
      ); // Adjust the endpoint accordingly
      setUsers(response.data.data);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setisLoading(false);
    }
  };
  console.log(users);
  const handleDeleteAdmin = async (adminId) => {
    // setisLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/adminuser/${adminId}`
      );
      toast({
        title: "Admin deleted successfully.",
        variant: "top-accent",
        position: "top-center",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // setisLoading(false);

      // Refresh the product list after deletion
      fetchUsers();
    } catch (error) {
      // setisLoading(false);
      toast({
        title: "Error deleting admin",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "error",
        duration: 2500,
      });
      console.error("Error deleting admin:", error);
    }
  };
  return (
    <Box width={"100%"}>
      <AdminNavbar />
      {showAddProduct ? (
        <Box
          textAlign={"left"}
          marginLeft={{ lg: "270px", md: "270px", base: "20px" }}
          marginTop={{ lg: "110px", md: "110px", base: "110px" }}
        >
          <Button
            _hover={{
              bg: "#72749B",
              color: "white",
            }}
            textColor={"#ffffff"}
            bgColor={"#ff3e6c"}
            onClick={() => setShowAddProduct(!showAddProduct)}
          >
            {" "}
            {showAddProduct ? "Go Back " : "Add Admin"}
          </Button>
        </Box>
      ) : (
        <Box
          textAlign={"right"}
          marginRight={"50px"}
          // marginBottom={"10px"}
          marginTop={{ lg: "110px", md: "110px", base: "110px" }}
        >
          <Button
            _hover={{
              bg: "#72749B",
              color: "white",
            }}
            textColor={"#ffffff"}
            bgColor={"#ff3e6c"}
            onClick={() => setShowAddProduct(!showAddProduct)}
          >
            {" "}
            {showAddProduct ? "Go Back " : "Add Admin"}
          </Button>
        </Box>
      )}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {showAddProduct ? (
            <AdminRegistrationPage fetchUsers={fetchUsers} />
          ) : (
            <Box
              marginTop={"20px"}
              overflowX={"auto"}
              // marginTop={{ lg: "90px", md: "80px", base: "80px" }}
              marginLeft={{ lg: "250px", md: "250px", base: "0px" }}
              marginRight={"10px"}
            >
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Mobile Number</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th></Th>
                    {/* Add other fields as needed */}
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user, index) => (
                    <Tr key={user._id}>
                      <Td>{index + 1}</Td>
                      <Td>{user.mobileNumber}</Td>
                      <Td>{user.name || "-no data-"}</Td>
                      <Td>{user.email || "-no data-"}</Td>
                      <Td>
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDeleteAdmin(user._id)}
                          // Add the delete functionality here
                        />
                      </Td>
                      {/* <Td>{user.gender}</Td> */}
                      {/* Add other fields as needed */}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {users.length === 0 && <Text mt={4}>No users available.</Text>}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default AdminPage;
