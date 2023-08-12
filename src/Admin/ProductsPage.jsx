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
      {/* <h1>Product Page</h1> */}
      <Box marginTop={{ lg: "90px", md: "110px", base: "110px" }}>
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
          {showAddProduct ? "Product List" : "Add Product"}
        </Button>
      </Box>

      {showAddProduct ? <AddProductPage /> : <ProductListPage />}
    </div>
  );
};

export default ProductsPage;
