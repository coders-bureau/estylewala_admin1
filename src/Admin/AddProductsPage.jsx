import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Spacer,
  Checkbox,
  HStack,
  useToast,
  IconButton,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { CloseIcon } from "@chakra-ui/icons";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";

const AddProductPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);
  const [showimages, setshowimages] = useState([]);

  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    // rating: 0,
    // ratingT: 0,
    category: "",
    type: "Men",
    price: "",
    MRP: "",
    discount: "",
    size: [],
    currentSize: "",
    img: null, // Main image link
    images: [], // Array of additional image links
    // reviews: [],
  });
  // console.log(productData);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "img") {
      const file = files[0];
      // Update the main image link in productData
      setProductData((prevData) => ({
        ...prevData,
        img: URL.createObjectURL(file), // Create a temporary URL for the selected file
      }));
    } else if (name === "images") {
      // Handle additional images here (if needed)
    } else {
      // For other input fields
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(productData);
  };

  // const handleAddImage = () => {
  //   // Add a new empty string to the images array when plus button is clicked
  //   setProductData((prevData) => ({
  //     ...prevData,
  //     images: [...prevData.images, ""],
  //   }));
  // };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, file],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        images: updatedImages,
      };
    });
    setProductData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  // const handleImageChange = (index, value) => {
  //   // Update the image link at the specified index in the images array
  //   setProductData((prevData) => {
  //     const updatedImages = [...prevData.images];
  //     updatedImages[index] = value;
  //     return {
  //       ...prevData,
  //       images: updatedImages,
  //     };
  //   });
  // };
  // const [imasd, setimg] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prevData) => ({
        ...prevData,
        img: file,
      }));
    }
    // setimg(file);
  };

  const handleSizeChange = (e) => {
    const sizeValue = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // If the size checkbox is checked, add it to the size array
      setProductData({
        ...productData,
        size: [...productData.size, sizeValue],
      });
    } else {
      // If the size checkbox is unchecked, remove it from the size array
      const updatedSizes = productData.size.filter(
        (size) => size !== sizeValue
      );
      setProductData({ ...productData, size: updatedSizes });
    }
  };

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    console.log(productData);
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("brand", productData.brand);
    // formData.append("rating", productData.rating);
    // formData.append("ratingT", productData.ratingT);
    formData.append("category", productData.category);
    formData.append("type", productData.type);
    formData.append("price", productData.price);
    formData.append("MRP", productData.MRP);
    formData.append("discount", productData.discount);
    productData.size.forEach((size) => {
      formData.append("size", size);
    });
    formData.append("currentSize", productData.currentSize);
    formData.append("img", productData.img);
    productData.images.forEach((image) => {
      formData.append("images", image);
    });
    // formData.append("reviews", productData.reviews);
    console.log(formData);
    // Send the product data to the backend API
    axios
      .post("http://localhost:5000/admin/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        toast({
          title: "Product successfully added in Databse",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "success",
          duration: 2500,
        });
        setisLoading(false);
        // Clear the form after successful submission
        setProductData({
          title: "",
          brand: "",
          // rating: 0,
          // ratingT: 0,
          category: "",
          type: "",
          price: "",
          MRP: "",
          discount: "",
          size: [],
          img: "",
          images: [],
          // reviews: [],
        });
        navigate("/product-list");
      })
      .catch((error) => {
        setisLoading(false);
        toast({
          title: "Error adding product",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "error",
          duration: 2500,
        });
        console.error("Error adding product:", error);
      });

    // axios
    //   .put(
    //     `http://localhost:5000/updateproduct/64cf0c83059447fdb6c99468`,
    //     formData,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   )
    //   .then((response) => {
    //     toast({
    //       title: "Product successfully updated",
    //       variant: "top-accent",
    //       isClosable: true,
    //       position: "top-right",
    //       status: "success",
    //       duration: 2500,
    //     });
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error update product",
    //       variant: "top-accent",
    //       isClosable: true,
    //       position: "top-right",
    //       status: "error",
    //       duration: 2500,
    //     });
    //     console.error("Error adding product:", error);
    //   });
  };
  console.log(productData);

  if (isLoading)
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
    );
  if (false)
    return (
      <>
        <PageNotFound />
      </>
    );
  return (
    <Box width={"100%"}>
      <AdminNavbar />
      <VStack spacing={4} align="center">
        <Box
          marginTop={"100px"}
          marginLeft={{ lg: "250px", md: "250px", base: "10px" }}
          as="form"
          onSubmit={handleSubmit}
          w="70%"
        >
          <VStack spacing={4}>
            {/* Add form fields for each product property */}
            <FormControl isRequired>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Brand:</FormLabel>
              <Input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Type:</FormLabel>
              <Select
                name="type"
                value={productData.type}
                onChange={handleChange}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category:</FormLabel>
              <Input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price:</FormLabel>
              <Input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>MRP:</FormLabel>
              <Input
                type="number"
                name="MRP"
                value={productData.MRP}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Discount:</FormLabel>
              <Input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleChange}
              />
            </FormControl>
            {/* Add other fields */}
            <FormControl isRequired>
              <FormLabel>Main Image:</FormLabel>
              <HStack>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />{" "}
                {productData.img && (
                  <Image
                    src={URL.createObjectURL(productData.img)}
                    alt="Main Image"
                    style={{ width: "100px" }}
                  />
                )}
              </HStack>
            </FormControl>

            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}

            {/* Render input for additional images */}

            <FormControl>
              <FormLabel>Aditional Images</FormLabel>
              <VStack spacing={4}>
                <input type="file" accept="image/*" onChange={handleAddImage} />{" "}
                <>
                  {productData.images.map((image, index) => (
                    <div key={index}>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        width="100px"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </>
              </VStack>
            </FormControl>

            {/* <input type="file" accept="image/*" onChange={handleAddImage} /> */}

            <FormControl>
              <FormLabel>Standard Sizes:</FormLabel>
              <HStack>
                <Checkbox value="S" onChange={handleSizeChange}>
                  S
                </Checkbox>
                <Checkbox value="M" onChange={handleSizeChange}>
                  M
                </Checkbox>
                <Checkbox value="L" onChange={handleSizeChange}>
                  L
                </Checkbox>
                <Checkbox value="XL" onChange={handleSizeChange}>
                  XL
                </Checkbox>
                <Checkbox value="XXL" onChange={handleSizeChange}>
                  XXL
                </Checkbox>
                <Checkbox value="3XL" onChange={handleSizeChange}>
                  3XL
                </Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Waist Sizes:</FormLabel>
              <HStack>
                <Checkbox value="28" onChange={handleSizeChange}>
                  28
                </Checkbox>
                <Checkbox value="30" onChange={handleSizeChange}>
                  30
                </Checkbox>
                <Checkbox value="32" onChange={handleSizeChange}>
                  32
                </Checkbox>
                <Checkbox value="34" onChange={handleSizeChange}>
                  34
                </Checkbox>
                <Checkbox value="36" onChange={handleSizeChange}>
                  36
                </Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Age Sizes:</FormLabel>
              <HStack>
                <Checkbox isChecked={productData.size.includes("6-12M")} value="6-12M" onChange={handleSizeChange}>
                  6-12M
                </Checkbox>
                <Checkbox value="1-1.5Y" onChange={handleSizeChange}>
                  1-1.5Y
                </Checkbox>
                <Checkbox value="1.5-2Y" onChange={handleSizeChange}>
                  1.5-2Y
                </Checkbox>
                <Checkbox value="2-3Y" onChange={handleSizeChange}>
                  2-3Y
                </Checkbox>
                <Checkbox value="4-6Y" onChange={handleSizeChange}>
                  4-6Y
                </Checkbox>
                <Checkbox value="6-8Y" onChange={handleSizeChange}>
                  6-8Y
                </Checkbox>
                <Checkbox value="9-11Y" onChange={handleSizeChange}>
                  9-11Y
                </Checkbox>
                <Checkbox value="12-14Y" onChange={handleSizeChange}>
                  12-14Y
                </Checkbox>
                <Checkbox value="15-17Y" onChange={handleSizeChange}>
                  15-17Y
                </Checkbox>
                {/* Add the rest of the age size checkboxes */}
              </HStack>
            </FormControl>

            {/* <div>
              <label>Main Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <div>
              <label>Additional Images:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
            </div> */}
            {/* <FormControl isRequired>
              <FormLabel>Main Image Link:</FormLabel>
              <Input
                type="text"
                name="img"
                value={productData.img}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Additional Images:</FormLabel>
              {productData.images.map((image, index) => (
                <HStack key={index} mb={2}>
                  <Input
                    key={index}
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                  />
                </HStack>
              ))}
              <Button type="button" onClick={handleAddImage}>
                +
              </Button>
            </FormControl>{" "} */}
            {/* ... (rest of the code remains the same) */}
            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
            {/* Render input for additional images */}
            {/* {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  width="100"
                  height="100"
                />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  Remove
                </button>
              </div>
            ))}
            <input type="file" accept="image/*" onChange={handleAddImage} /> */}
            {/* <img src={URL.createObjectURL(productData.img)} width="100px" height="100px" /> */}
            <Spacer />
            <Button type="submit">Add Product</Button>
            <Spacer />
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default AddProductPage;
