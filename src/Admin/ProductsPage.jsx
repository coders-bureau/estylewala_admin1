import React, { useState } from "react";
import AddProductPage from "./AddProductsPage";
import ProductListPage from "./ProductListPage";
import AdminNavbar from "./AdminNavbar";
import { Box, Button } from "@chakra-ui/react";

const ProductsPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div>
      <AdminNavbar />
      {showAddProduct ? (
        <Box
          marginTop={{ lg: "110px", md: "110px", base: "110px" }}
          marginLeft={{ lg: "270px", md: "270px", base: "20px" }}
          marginRight={"20px"}
          textAlign={"left"}
        >
          <Button
            _hover={{
              bg: "#72749B",
              color: "white",
            }}
            textColor={"#ffffff"}
            bgColor={"#ff3e6c"}
            onClick={() => setShowAddProduct(!showAddProduct)}
          >
            {" "}
            {showAddProduct ? "Go Back " : "Add Product"}
          </Button>
        </Box>
      ) : (
        <Box
          textAlign={"right"}
          marginRight={"50px"}
          // my={"20px"}
          marginTop={{ lg: "110px", md: "110px", base: "110px" }}
        >
          <Button
            _hover={{
              bg: "#72749B",
              color: "white",
            }}
            textColor={"#ffffff"}
            bgColor={"#ff3e6c"}
            onClick={() => setShowAddProduct(!showAddProduct)}
          >
            {" "}
            {showAddProduct ? "Go Back " : "Add Product"}
          </Button>
        </Box>
      )}

      {showAddProduct ? <AddProductPage /> : <ProductListPage />}
    </div>
  );
};

export default ProductsPage;
