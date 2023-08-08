// src/components/ProductListPage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";

const ProductListPage = () => {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setError] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Fetch products from backend API
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setisLoading(true);
    await axios
      .get("http://localhost:5000/product/allproducts")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setisLoading(false);
      });
  };

  const handleDeleteProduct = async (productId) => {
    setisLoading(true);
    try {
      await axios.delete(`http://localhost:5000/admin/product/${productId}`);
      toast({
        title: "Product deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setisLoading(false);

      // Refresh the product list after deletion
      fetchProducts();
    } catch (error) {
      setisLoading(false);
      toast({
        title: "Error deleting product",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "error",
        duration: 2500,
      });
      console.error("Error deleting product:", error);
    }
  };
  if (isError)
    return (
      <>
        <PageNotFound />
      </>
    );
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
                <Th>Sr No.</Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Brand</Th>
                <Th>Price</Th>
                <Th>Type</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product, index) => (
                <Tr key={product._id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image
                      src={`http://localhost:5000/${product.img}`}
                      // src={product.img}
                      alt={product.title}
                      boxSize="50px"
                      objectFit="cover"
                    />
                  </Td>
                  <Td>{product.title}</Td>
                  <Td>{product.brand}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.type}</Td>
                  <Td>
                    <Link to={`/edit-product/${product._id}`}>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        mr={2}
                        // Add the edit functionality here
                      />
                    </Link>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteProduct(product._id)}
                      // Add the delete functionality here
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProductListPage;
