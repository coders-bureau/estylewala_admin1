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
  Text,
  Switch,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";
import { BsImageFill } from "react-icons/bs";

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
      .get(`${process.env.REACT_APP_BASE_API}/product/allproducts`)
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
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
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/product/${productId}`
      );
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

  const handleToggleStatus = async (productId) => {
    try {
      const productToUpdate = products.find(
        (product) => product._id === productId
      );
      const newStatus =
        productToUpdate.status === "available" ? "unavailable" : "available";

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/admin/product/${productId}/status`,
        {
          newStatus,
        }
      );

      const updatedProduct = response.data;
      const updatedProducts = products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  // if (isError)
  //   return (
  //     <>
  //       <PageNotFound />
  //     </>
  //   );
  return (
    <Box width={"100%"}>
      {/* <AdminNavbar /> */}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          marginTop={"20px"}
          marginLeft={{ lg: "250px", md: "250px", base: "0px" }}
          marginRight={"10px"}
        >
          {products.length > 0 ? (
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Sr No.</Th>
                  <Th>Image</Th>
                  <Th>Title</Th>
                  <Th>Brand</Th>
                  <Th>Price</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>

              <Tbody>
                {products.map((product, index) => (
                  <Tr key={product._id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Image
                        src={process.env.REACT_APP_BASE_API + `/${product.img}`}
                        // src={product.img}
                        alt={"[:)]"}
                        boxSize="50px"
                        objectFit="cover"
                      />
                    </Td>
                    <Td>{product.title}</Td>
                    <Td>{product.brand}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.type}</Td>
                    <Td>
                      {/* Toggle switch for changing status */}
                      <Switch
                        colorScheme="green"
                        isChecked={product.status === "available"}
                        onChange={() => handleToggleStatus(product._id)}
                      />
                    </Td>
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
          ) : (
            <Box padding={"50"}>
              <Text fontSize={"20px"} fontWeight={500}>
                No Products Added! Please Add Products.
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProductListPage;
