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

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setisLoading(true);
      const response = await axios.get("http://localhost:5000/admin/allorders"); // Adjust the endpoint accordingly
      setOrders(response.data);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setisLoading(false);
    }
  };

  console.log(orders);
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
          <Table variant="striped" colorScheme="gray"   >
            <Thead>
              <Tr>
                <Th>Sr. No.</Th>
                <Th>Address</Th>
                <Th>Customer Name</Th>
                <Th>Items</Th>
                <Th>Order Date</Th>
                <Th>Total Price</Th>
                <Th>Payment Mode</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order, index) => (
                <Tr key={order._id}>
                  <Td>{index + 1}</Td>
                  <Td>{order.addressLine}</Td>
                  <Td>{order.userId.name}</Td>
                  <Td>
                    {order.items.map((item) => (
                      <Box key={item._id}>
                        {item.product.title} x{item.quantity}
                      </Box>
                    ))}
                  </Td>
                  <Td>{new Date(order.orderDate).toLocaleDateString()}</Td>
                  <Td>{order.totalAmount}</Td>
                  <Td>{order.paymentMode}</Td>
                  <Td>{order.orderStatus}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {orders.length === 0 && <Text mt={4}>No orders available.</Text>}
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
