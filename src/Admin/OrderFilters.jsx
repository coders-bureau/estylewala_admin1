// components/OrderFilters.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-date-picker";
// import DatePicker from 'react-date-picker/dist/entry.nostyle'; // Import DatePicker
import "react-date-picker/dist/DatePicker.css";

const OrderFilters = ({ onFilter }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // DatePicker
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleFilterSubmit = () => {
    const filters = {
      //   date: selectedDate,
      "items.product": selectedProduct || null,
      orderStatus: selectedStatus || null,
      userId: selectedCustomer || null,
    };
    onFilter(filters);
  };

  const handleGenerateReport = async () => {
    try {
      const filters = {
        //   date: selectedDate,
        "items.product": selectedProduct || null,
        orderStatus: selectedStatus || null,
        userId: selectedCustomer || null,
      };
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
  console.log(users);
  return (
    <VStack align={"flex-start"}>
      <FormLabel>Date</FormLabel>
      {/* <DatePicker wrapperClassName="datePicker" dateFormat="dd/MM/yyyy" /> */}
      <DatePicker value={selectedDate} onChange={handleDateChange} />
      <FormLabel>Product</FormLabel>
      <Select w={"50vw"} value={selectedProduct} onChange={handleProductChange}>
        <option value="">All Products</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.title}
          </option>
        ))}
      </Select>
      <FormLabel>Status</FormLabel>
      <Select w={"50vw"} value={selectedStatus} onChange={handleStatusChange}>
        <option value="">All Statuses</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </Select>
      <FormLabel>Customer</FormLabel>
      <Select
        w={"50vw"}
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
      <Flex mt={4}>
        <Button colorScheme="blue" onClick={handleFilterSubmit}>
          Filter
        </Button>
      </Flex>
      <div>
        <h1></h1>
        <br />
        <Button colorScheme="blue" onClick={handleGenerateReport}>Generate Pdf</Button>
      </div>
    </VStack>
  );
};

export default OrderFilters;
