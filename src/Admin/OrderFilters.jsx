// components/OrderFilters.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-date-picker";
// import DatePicker from 'react-date-picker/dist/entry.nostyle'; // Import DatePicker
import "react-date-picker/dist/DatePicker.css";

const OrderFilters = ({ onFilter, selectedTab }) => {
  console.log(selectedTab);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // DatePicker
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  useEffect(() => {
    onFilter({
      orderDate: null,
      "items.product": null,
      orderStatus: selectedTab || null,
      userId: null,
      startDate: null,
      endDate: null,
    });
  }, [selectedTab]);

  const fetchProducts = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_API}/product/allproducts`)
        .then((response) => {
          setProducts(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allusers`
      ); // Adjust the endpoint accordingly
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const handleDateChange = (event) => {
  //   setSelectedDate(date);
  // };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  // const handleStatusChange = (event) => {
  //   setSelectedStatus(event.target.value);
  // };

  const handleFilterSubmit = () => {
    const filters = {
      orderDate: selectedDate || null,
      "items.product": selectedProduct || null,
      orderStatus: selectedTab || null,
      userId: selectedCustomer || null,
      startDate: startDate || null,
      endDate: endDate || null,
    };
    onFilter(filters);
  };

  const handleGenerateReport = async () => {
    try {
      const filters = {
        orderDate: selectedDate || null,
        "items.product": selectedProduct || null,
        orderStatus: selectedTab || null,
        userId: selectedCustomer || null,
        startDate: startDate || null,
        endDate: endDate || null,
      };
      console.log(filters);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/generate-report`,
        {
          responseType: "blob", // Important for downloading files
          params: filters,
        }
      );

      // Create a URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  const handleGenerateReportExcel = async () => {
    try {
      const filters = {
        orderDate: selectedDate || null,
        "items.product": selectedProduct || null,
        orderStatus: selectedTab || null,
        userId: selectedCustomer || null,
        startDate: startDate || null,
        endDate: endDate || null,
      };
      console.log(filters);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/order/excel`,
        {
          responseType: "blob", // Important for downloading files
          params: filters,
        }
      );

      // Create a URL for the blob response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.xlsx";
      a.click();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <VStack align={"flex-start"}>
      <Stack display={{lg:"flex",base:"none"}}>
        <VStack align={"flex-start"}>
          <HStack >
            <Text fontWeight={500}>Date</Text>
            <Box bgColor={"white"}>
              <Input
                type="date"
                placeholder="Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Box>
            <Text fontWeight={500}>Date Range</Text>
            <Stack>
              <HStack>
                <Text>Form:-</Text>
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </HStack>
              <HStack>
                <Text>To:- </Text>
                <Input
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </HStack>
            </Stack>
          </HStack>
          <HStack>
            <Text fontWeight={500}>Products</Text>

            <Select
              w={{ base: "100%", md: "20vw" }} 
              value={selectedProduct}
              onChange={handleProductChange}
            >
              <option value="">All Products</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              ))}
            </Select>
            {/* <Text fontWeight={500}>Status</Text>
            <Select
              w={{ base: "100%", md: "20vw" }} 
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </Select> */}
            <Text fontWeight={500}>Customer</Text>
            <Select
              w={{ base: "100%", md: "20vw" }} 
              value={selectedCustomer}
              onChange={handleCustomerChange}
            >
              <option value="">All Customers</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.mobileNumber} {`:- ${user.name || "-no name-"} `}
                </option>
              ))}
            </Select>
          </HStack>
        </VStack>
        <VStack align={"flex-start"}>
          <HStack m={10}>
            {/* <Flex mt={4}> */}
            <Button colorScheme="blue" onClick={handleFilterSubmit}>
              Filter
            </Button>
            {/* </Flex> */}

            <Button colorScheme="blue" onClick={handleGenerateReport}>
              Generate Pdf
            </Button>
            <Button colorScheme="green" onClick={handleGenerateReportExcel}>
              Generate Excel
            </Button>
          </HStack>
        </VStack>
      </Stack>
      <Stack display={{lg:"none",base:"flex"}}>
        <VStack align={"flex-start"}>
          {/* <HStack > */}
            <Text fontWeight={500}>Date</Text>
            <Box bgColor={"white"}>
              <Input
                type="date"
                placeholder="Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Box>
            <Text fontWeight={500}>Date Range</Text>
            <Stack>
              <HStack>
                <Text>Form:-</Text>
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </HStack>
              <HStack>
                <Text>To:- </Text>
                <Input
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </HStack>
            </Stack>
          {/* </HStack> */}
          <Stack>
            <Text fontWeight={500}>Products</Text>
            <Select
              // w={{ base: "100%", md: "20vw" }} 
              value={selectedProduct}
              onChange={handleProductChange}
            >
              <option value="">All Products</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              ))}
            </Select>
            {/* <Text fontWeight={500}>Status</Text>
            <Select
              // w={{ base: "100%", md: "20vw" }} 
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </Select> */}
            <Text fontWeight={500}>Customer</Text>
            <Select
              // w={{ base: "100%", md: "20vw" }} 
              value={selectedCustomer}
              onChange={handleCustomerChange}
            >
              <option value="">All Customers</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.mobileNumber} {`:- ${user.name || "-no name-"} `}
                </option>
              ))}
            </Select>
          </Stack>
        </VStack>
        <VStack align={"end"}>
          <VStack m={10}>
            <Button colorScheme="blue" onClick={handleFilterSubmit}>
              Filter
            </Button>
            <Button colorScheme="blue" onClick={handleGenerateReport}>
              Generate Pdf
            </Button>
            <Button colorScheme="green" onClick={handleGenerateReportExcel}>
              Generate Excel
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </VStack>
  );
};

export default OrderFilters;
