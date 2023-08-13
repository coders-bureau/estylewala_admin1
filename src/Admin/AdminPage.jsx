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
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";
import AdminRegistrationPage from "./AdminRegistrationPage";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <Box width={"100%"}>
      <AdminNavbar />
      {showAddProduct ? (
        <Box
          textAlign={"left"}
          marginLeft={"270px"}
          // my={"20px"}
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
          // my={"20px"}
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
            <AdminRegistrationPage />
          ) : (
            <Box
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
                    {/* <Th>Gender</Th> */}
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
