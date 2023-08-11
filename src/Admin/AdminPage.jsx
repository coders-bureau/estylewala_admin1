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
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setisLoading(true);
      const response = await axios.get("http://localhost:5000/admin//alladmins"); // Adjust the endpoint accordingly
      setUsers(response.data.data)
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setisLoading(false);
    }
  };
  console.log(users);

  return (
    <Box width={"100%"}>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          marginTop={{ lg: "90px", md: "80px", base: "80px" }}
          marginLeft={{ lg: "250px", md: "250px", base: "0px" }}
          marginRight={"10px"}
        >
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Sr. No.</Th>
                <Th>Mobile Number</Th>
                <Th>Name</Th>
                {/* <Th>Email</Th> */}
                {/* <Th>Gender</Th> */}
                {/* Add other fields as needed */}
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={user._id}>
                  <Td>{index + 1}</Td>

                  <Td>{user.mobileNumber}</Td>
                  <Td>{user.name}</Td>
                  {/* <Td>{user.email}</Td> */}
                  {/* <Td>{user.gender}</Td> */}
                  {/* Add other fields as needed */}
                </Tr>
              ))}
            </Tbody>
          </Table>
          {users.length === 0 && <Text mt={4}>No users available.</Text>}
        </Box>
      )}
    </Box>
  );
};

export default AdminPage;