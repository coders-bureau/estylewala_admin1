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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";
import OrderFilters from "./OrderFilters";
// const toast = useToast();
const OrdersPage = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("processing");
  console.log(selectedTab);
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
  const [selectedOrders, setSelectedOrders] = useState([]);
  // const [selectedStatus, setSelectedStatus] = useState("processing");
  const toast = useToast();

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setisLoading(true);

      // Make an API call to update the order status
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/admin/order/${orderId}/status`,
        {
          orderStatus: newStatus,
        }
      );

      if (response.data.success) {
        toast({
          title: `Order status updated to ${newStatus}`,
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "success",
          duration: 2500,
        });
        setisLoading(false);
      } else {
        toast({
          title: "Order status not updated",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "error",
          duration: 2500,
        });
      }
    } catch (error) {
      setisLoading(false);
      toast({
        title: "Error updating order status",
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
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setisLoading(false);
    }
  };

  const handleCheckboxChange = (orderId) => {
    // Toggle the selection state for the order with the given orderId
    setSelectedOrders((prevSelectedOrders) => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter((id) => id !== orderId);
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  const handleSelectAll = () => {
    // Select or deselect all orders based on the current selection state
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order._id));
    }
  };

  const handleAcceptSelectedOrders = () => {
    // Update the status of the selected orders based on the current tab
    const newStatus =
      selectedTab === "processing"
        ? "accepted"
        : selectedTab === "accepted"
        ? "readytoship"
        : selectedTab === "readytoship"
        ? "shipped"
        : "";

    // Send a request to update the status of each selected order
    selectedOrders.forEach((orderId) => {
      handleStatusChange(orderId, newStatus);
    });

    // Clear the selection
    setSelectedOrders([]);
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
          <Box>
            <Text fontSize={"25px"}>Order Management</Text>
            {/* <OrderFilters onFilter={handleFilterSubmit} /> */}
            {/* <ul>
              {filteredOrders.map((order) => (
                <li key={order._id}>
                  
                </li>
              ))}
            </ul> */}
            <Box p={4}>
              <Tabs
                variant="soft-rounded"
                colorScheme="teal"
                // onChange={(tab) => setSelectedTab(tab)}
                // onChange={(tabIndex) => setSelectedTab(tabIndex === 0 ? "processing" : tabIndex === 1 ? "accepted" : tabIndex === 2 ? "readytoship" : tabIndex === 3 ? "shipped" : "cancelled")}
                onChange={(tabIndex) => {
                  setSelectedTab(
                    tabIndex === 0
                      ? "processing"
                      : tabIndex === 1
                      ? "accepted"
                      : tabIndex === 2
                      ? "readytoship"
                      : tabIndex === 3
                      ? "shipped"
                      : "cancelled"
                  );
                }}
              >
                <TabList overflowX="auto">
                  <Tab name="inprocess">In Process</Tab>
                  <Tab name="accepted">Accepted</Tab>
                  <Tab name="readytoship">Ready to Ship</Tab>
                  <Tab name="shipped">Shipped</Tab>
                  <Tab name="cancelled">Cancelled</Tab>
                </TabList>

                {/* <TabPanels>
                  <TabPanel>
                    {renderOrdersTable("inprocess", filteredOrders)}
                  </TabPanel>
                  <TabPanel>
                    {renderOrdersTable("accepted", filteredOrders)}
                  </TabPanel>
                  <TabPanel>
                    {renderOrdersTable("readytoship", filteredOrders)}
                  </TabPanel>
                  <TabPanel>
                    {renderOrdersTable("shipped", filteredOrders)}
                  </TabPanel>
                  <TabPanel>
                    {renderOrdersTable("cancelled", filteredOrders)}
                  </TabPanel>
                </TabPanels> */}
              </Tabs>
              <Box my={10}>
                <OrderFilters
                  selectedTab={selectedTab}
                  onFilter={handleFilterSubmit}
                />
              </Box>
              {renderOrdersTable(
                handleStatusChange,
                filteredOrders,
                selectedTab,
                selectedOrders,
                handleAcceptSelectedOrders,
                handleSelectAll,
                handleCheckboxChange,
                isLoading,
              )}
            </Box>
          </Box>
          {filteredOrders.length === 0 && (
            <Text mt={4}>No orders available.</Text>
          )}
        </Box>
      )}
    </>
  );
};

const renderOrdersTable = (
  handleStatusChange,
  filteredOrders,
  selectedTab,
  selectedOrders,
  handleAcceptSelectedOrders,
  handleSelectAll,
  handleCheckboxChange,
  isLoading
) => {
  return (
    <>
      <Box overflow={"auto"}>
        {/* <Text>{selectedTab}</Text> */}
        {selectedTab !== "shipped" && selectedTab !== "cancelled" && (
          <Button
            // isDisabled={selectedTab === "shipped" || selectedTab === "cancelled"}
            colorScheme="purple"
            size="sm"
            onClick={handleAcceptSelectedOrders}
          >
            {selectedTab === "processing" && "Accept Selected"}
            {selectedTab === "accepted" && "Ready to Ship Selected"}
            {selectedTab === "readytoship" && "Shipped Selected"}
          </Button>
        )}
        {isLoading ? (
          <Text>Loading...... </Text>
        ) : (
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={selectedOrders.length === filteredOrders.length}
                    onChange={handleSelectAll}
                  />
                </Th>
                <Th>No.</Th>
                <Th>Address</Th>
                <Th>Customer Name</Th>
                <Th>Items</Th>
                <Th>Order Date</Th>
                <Th>Total Price</Th>
                <Th>Payment Mode</Th>
                {/* <Th>Status</Th> */}
                {selectedTab !== "shipped" && selectedTab !== "cancelled" && (
                  <Th>Action</Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              <>
                {filteredOrders.map((order, index) => (
                  <Tr key={index}>
                    <Td>
                      <Checkbox
                        isChecked={selectedOrders.includes(order._id)}
                        onChange={() => handleCheckboxChange(order._id)}
                      />
                    </Td>
                    <Td>{index + 1}</Td>
                    <Td>{order.addressLine}</Td>
                    <Td>{order.userId.name}</Td>
                    <Td>
                      {order.items.map((item) => (
                        <Box key={item._id}>
                          {item.productName} x{item.quantity}
                        </Box>
                      ))}
                    </Td>
                    <Td>{new Date(order.orderDate).toLocaleDateString()}</Td>
                    <Td>{order.totalAmount}</Td>
                    <Td>{order.paymentMode}</Td>
                    {selectedTab !== "shipped" && selectedTab !== "cancelled" && (
                      <Td>
                        <Button
                          isDisabled={
                            selectedTab === "shipped" ||
                            selectedTab === "cancelled"
                          }
                          colorScheme="purple"
                          size="sm"
                          onClick={() => {
                            if (selectedTab === "processing") {
                              handleStatusChange(order._id, "accepted");
                            } else if (selectedTab === "accepted") {
                              handleStatusChange(order._id, "readytoship");
                            } else if (selectedTab === "readytoship") {
                              handleStatusChange(order._id, "shipped");
                            }
                          }}
                        >
                          {selectedTab === "processing" && "Accepted"}
                          {selectedTab === "accepted" && "Ready to Ship"}
                          {selectedTab === "readytoship" && "Shipped"}
                        </Button>{" "}
                        <Button
                          isDisabled={
                            selectedTab === "shipped" ||
                            selectedTab === "cancelled"
                          }
                          colorScheme="red"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(order._id, "cancelled")
                          }
                        >
                          Cancel
                        </Button>
                      </Td>
                    )}

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
                  </Tr>
                ))}
              </>
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default OrdersPage;
