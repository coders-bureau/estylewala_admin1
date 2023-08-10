// import { Box, Heading, HStack, Stack } from '@chakra-ui/layout';
// import { Avatar, AvatarGroup } from '@chakra-ui/react';
// import React from 'react'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import AdminNavbar from './AdminNavbar';
// import { deleteUsersListData, getUsersListData } from '../Redux/Admin/Admin.action';
// import UserCard from './UserCard';
// import Chart from "react-apexcharts";

// const UsersPage = () => {
//   const UsersListData = useSelector((store)=>store.adminManager.usersListData);
//   const dispatch = useDispatch();
//   useEffect(()=>{
//    dispatch(getUsersListData());
//   },[])

//   const deleteUsers=(id)=>{
//     dispatch(deleteUsersListData(id)).then(()=>dispatch(getUsersListData()));
//   }
//  // dispatch(getUsersListData());
//   let loginUsers=0
//   let logoutUsers=0
//   for(let i=0;i<UsersListData.length;i++){
//     let el=UsersListData[i];
//     if(el.isAuth===true){
//     loginUsers=loginUsers+1
//     }else{
//       logoutUsers=logoutUsers+1
//     }
//   }

//   return (
//     <Box minH="100vh" bg={'gray.100'} fontFamily={'sans-serif'}>
//       <AdminNavbar/>
//     <Box mt={"80px"} >
//       <Stack ml={'270px'} justifyContent={'center'}>
//       <HStack justifyContent={'space-around'} >
//       <Stack>
//     <Heading mt={5} size={'lg'} fontFamily={'sans-serif'} >Total Users : {UsersListData.length}
//       </Heading>
//     <HStack justifyContent={'center'}>
//     <AvatarGroup size='md' max={3} mt={3}>
//       {UsersListData.length!==0 && UsersListData.map((el,i)=>(
//       el.image!==""?<Avatar  key={i} src={el.image} /> :<Avatar  key={i} name={el.name} />
//     ))}
// </AvatarGroup>
// </HStack>
//     </Stack>
//     <Stack>

//     <Chart
//           type="pie"
//           height={450}
//           series={[loginUsers,logoutUsers]}
//           options={{
//             noData: { text: "Unavailable" },
//             stroke: {
//               lineCap: "round"
//             },
//             colors: ['#2BA751', '#FF0000'],
//             labels: ["Total Login Users", "Total Logout Users"],
//           }}
//           >
//   </Chart>
//     </Stack>
//     </HStack>
//     </Stack>
//         <Stack ml={'440px'} spacing={10} >
//           {UsersListData.length !== 0 && UsersListData.map((el, i) => (
//             <UserCard key={i} {...el} deleteUsers={deleteUsers} />
//           ))}
//         </Stack>
//     </Box>
//     </Box>
//   )
// }

// export default UsersPage;

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

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setisLoading(true);

      const response = await axios.get("http://localhost:5000/admin/allusers"); // Adjust the endpoint accordingly
      setUsers(response.data);
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
                <Th>Email</Th>
                <Th>Gender</Th>

                {/* Add other fields as needed */}
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={user._id}>
                  <Td>{index + 1}</Td>

                  <Td>{user.mobileNumber}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.gender}</Td>
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

export default UsersPage;
