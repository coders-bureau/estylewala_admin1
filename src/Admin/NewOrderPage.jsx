import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function NewOrderPage() {
  const [selectedTab, setSelectedTab] = useState("inprocess");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
    //   setisLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allorders`
      ); // Adjust the endpoint accordingly
      setOrders(response.data.data);
    //   setisLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    //   setisLoading(false);
    }
  };
  // Filter orders based on the selected tab
  const filteredOrders = orders.filter((order) => {
    if (selectedTab === "inprocess") {
      return order.orderStatus === "delivered";
    }
    if (selectedTab === "accepted") {
      return order.orderStatus === "processing";
    }
    if (selectedTab === "readytoship") {
      return order.orderStatus === "readytoship";
    }
    if (selectedTab === "shipped") {
      return order.orderStatus === "shipped";
    }
    if (selectedTab === "cancelled") {
      return order.orderStatus === "cancelled";
    }
    return true;
  });
// console.log(filteredOrders);
  return (
    <Box p={4}>
      <Tabs
        variant="soft-rounded"
        colorScheme="teal"
        onChange={(tab) => setSelectedTab(tab)}
      >
        <TabList>
          <Tab name="inprocess">In Process</Tab>
          <Tab name="accepted">Accepted</Tab>
          <Tab name="readytoship">Ready to Ship</Tab>
          <Tab name="shipped">Shipped</Tab>
          <Tab name="cancelled">Cancelled</Tab>
        </TabList>
        <TabPanels>
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
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function renderOrdersTable(tabName, filteredOrders) {
    console.log(filteredOrders);
  return (
    <Box overflowX="auto">
         {tabName}
    </Box>
  );
}

export default NewOrderPage;
