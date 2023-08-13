import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Select,
  DatePicker,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";
import OrderFilters from "./OrderFilters";
// const toast = useToast();
const ReportsPage = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleFilterSubmit = async (filters) => {
    try {
      console.log(filters);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/orders/filter`,
        { params: filters }
      );
      setFilteredOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching filtered orders:", error);
    }
  };
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("proccessing");
  const toast = useToast();
  const handleStatusChange = async (orderId) => {
    try {
      setisLoading(true);

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/admin/order/${orderId}/status`,
        {
          orderStatus: selectedStatus,
        }
      );

      if (response.data.success) {
        toast({
          title: "Order status updated successfully",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "success",
          duration: 2500,
        });
        console.log("Order status updated successfully");
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
      toast({
        title: "updating order status",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "error",
        duration: 2500,
      });

      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allorders`
      ); // Adjust the endpoint accordingly
      setOrders(response.data.data);
      setFilteredOrders(response.data.data)
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setisLoading(false);
    }
  };

  console.log(orders);
  console.log(filteredOrders);

  console.log(orders);
 

  return (
    <>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          marginTop={{ lg: "90px", md: "80px", base: "80px" }}
          marginLeft={{ lg: "250px", md: "250px", base: "10px" }}
          marginRight={"10px"}
          marginBottom={"50px"}
        >
          {/* <Text fontSize={50}>No orders available.</Text> */}
          <div>
            <Text fontSize={"25px"}>Reports Generations</Text>
            <OrderFilters onFilter={handleFilterSubmit} />
            {/* <ul>
              {filteredOrders.map((order) => (
                <li key={order._id}>
                  
                </li>
              ))}
            </ul> */}{

            }
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>No.</Th>
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
                <>
                  {filteredOrders.map((order, index) => (
                    <Tr key={index}>
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
                      {/* <Td>
                        <select
                          id="status"
                          value={order.orderStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => {
                            handleStatusChange(order._id);
                          }}
                        >
                          Update Status
                        </button>
                      </Td> */}
                      <Td> {order.orderStatus}</Td>
                    </Tr>
                  ))}
                </>
              </Tbody>
            </Table>
          </div>
          {filteredOrders.length === 0 && (
            <Text mt={4}>No orders to show for given search.</Text>
          )}
 

        </Box>
      )}
    </>
  );
};

export default ReportsPage;
