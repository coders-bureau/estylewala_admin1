import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Table, Thead, Tbody, Tr, Th, Td ,Heading} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from your API when the component mounts
    axios
      .get(`${process.env.REACT_APP_BASE_API}/user/contactus/details`) // Adjust the URL based on your API endpoint
      .then((response) => {
        setContacts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <Box
        marginTop={{ lg: "90px", md: "80px", base: "80px" }}
        marginLeft={{ lg: "250px", md: "250px", base: "15px" }}
        marginRight={"15px"}
        marginBottom={"50px"}
      >
        <Heading>Contact List</Heading>
        <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Sr NO.</Th>
            <Th>Email</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map((contact,index) => (
            <Tr key={contact._id}>
              <Td>{index + 1}</Td>
              <Td>{contact.email}</Td>
              <Td>{contact.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </Box>
    </>
  );
}

export default ContactList;
