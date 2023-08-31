import React, { useEffect, useState } from "react";
import {
  Text,
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
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { ChromePicker, SketchPicker } from "react-color";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";
import CategoryDropdown from "./CategoryDropdown";
import { FaTimes } from "react-icons/fa";
// import { sizeOptions } from "../Constants/costant";
const AddProductPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [productData, setProductData] = useState({
    SKU_ID: "",
    product_id: "",
    net_weight: "",
    description: "",
    countryoforigin: "",
    manufacturerdetails: "",
    selectedColor: "",
    colors: [],
    gst: "",
    title: "",
    brand: "",
    // rating: 0,
    // ratingT: 0,
    category: "",
    type: "",
    price: "",
    MRP: "",
    discount: "",
    offerType: "", // Add offerType field
    offerValue: "", // Add offerValue field
    size: [],
    currentSize: "",
    img: null, // Main image link
    images: [], // Array of additional image links
    // reviews: [],
  });

  const [showColorPicker, setShowColorPicker] = useState(false); // To toggle the color picker

  const [isLoading, setisLoading] = useState(false);
  const [showimages, setshowimages] = useState([]);
  const [showImageWarning, setShowImageWarning] = useState(false);
  const [showImagesWarning, setShowImagesWarning] = useState(false);
  const [sizeOptions, setSizeOptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [offers, setOffers] = useState([]);
  const [offerType, setOfferType] = useState("");
  const [offerValue, setOfferValue] = useState("");
  const [offerName, setOfferName] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(productData.price);
  console.log(discountedPrice, offerName);
  const handleOfferChange = (text1) => {
    const selectedOffer = offers?.find((o) => o.text === text1);
    console.log(selectedOffer);
    setOfferType(selectedOffer.type);
    setOfferValue(selectedOffer.value);
    setOfferName(selectedOffer.text);
    if (selectedOffer.type === "percent") {
      const discountAmount = (selectedOffer.value / 100) * productData.price;
      setDiscountedPrice(productData.price - discountAmount);
      // setProductData(productData.discount=discountedPrice);
    } else if (selectedOffer.type === "flat") {
      setDiscountedPrice(productData.price - selectedOffer.value);
      // setProductData(productData.discount=discountedPrice);
    } else {
      setDiscountedPrice(productData.price);
      // setProductData(productData.price);
    }
  };
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setProductData((prevProductData) => ({
      ...prevProductData,
      category: category, // Update the category value in the state
    }));
  };
  // Fetch size options on component mount
  useEffect(() => {
    fetchSizeOptions();
    fetchOffers();
    fetchGSTValues();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/offer/fetchoffers`
      );
      setOffers(response.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };
  const [gstValues, setGstValues] = useState([]);
  const [newValue, setNewValue] = useState("");

  const fetchGSTValues = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/gst/gst-values`
      );
      setGstValues(response.data);
    } catch (error) {
      console.error("Error fetching GST values:", error);
    }
  };
  const fetchSizeOptions = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API}/size/size-options`)
      .then((response) => {
        setSizeOptions(response.data);
        // setEditingOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching size options:", error);
      });
  };

  console.log(productData);

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
  console.log("offers", offers);

  const handleAddImage = (e) => {
    setShowImagesWarning(false);
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

  const handleImageChange = (e) => {
    setShowImageWarning(false);
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

  const handleColorChange = (color) => {
    setProductData({
      ...productData,
      selectedColor: color.hex, // Store the selected color temporarily
    });
  };

  const handleAddColor = () => {
    if (productData.selectedColor) {
      setProductData({
        ...productData,
        colors: [...productData.colors, productData.selectedColor], // Add the selected color to the colors array
        selectedColor: "", // Clear the selected color
      });
    }
  };

  const handleRemoveColor = (index) => {
    const updatedColors = [...productData.colors];
    updatedColors.splice(index, 1); // Remove the color at the specified index
    setProductData({
      ...productData,
      colors: updatedColors,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productData.images.length === 0) {
      setShowImagesWarning(true); // Show the warning if no images are added
      return;
    }
    if (!productData.img) {
      setShowImageWarning(true); // Show the warning if image is not selected
      return;
    }

    setisLoading(true);
    console.log(productData);
    const formData = new FormData();

    formData.append("SKU_ID", productData.SKU_ID);
    formData.append("product_id", productData.product_id);
    formData.append("net_weight", productData.net_weight);
    formData.append("description", productData.description);
    formData.append("countryoforigin", productData.countryoforigin);
    formData.append("manufacturerdetails", productData.manufacturerdetails);
    // formData.append("colors", productData.colors);
    productData.colors.forEach((color) => {
      formData.append("colors", color);
    });
    formData.append("gst", productData.gst);

    formData.append("title", productData.title);
    formData.append("brand", productData.brand);
    // formData.append("rating", productData.rating);
    // formData.append("ratingT", productData.ratingT);
    formData.append("category", productData.category);
    formData.append("type", productData.type);
    formData.append("price", productData.price);
    formData.append("MRP", productData.MRP);
    formData.append("discount", discountedPrice);
    formData.append("offerType", offerType);
    formData.append("offerValue", offerValue);
    formData.append("offerName", offerName);

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
      .post(`${process.env.REACT_APP_BASE_API}/admin/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        toast({
          title: "Product successfully added ",
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
          status: "success",
          duration: 2500,
        });
        setisLoading(false);
        // Clear the form after successful submission
        setProductData({
          SKU_ID: "",
          product_id: "",
          net_weight: "",
          description: "",
          countryoforigin: "",
          manufacturerdetails: "",
          selectedColor: "",
          colors: [],
          gst: "",
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
      {/* <AdminNavbar /> */}
      <VStack spacing={4} align="center">
        <Box
          marginTop={"20px"}
          marginLeft={{ lg: "250px", md: "250px", base: "20px" }}
          marginRight={"20px"}
          as="form"
          onSubmit={handleSubmit}
          w="70%"
        >
          <VStack spacing={4}>
            {/* Add form fields for each product property */}
            <FormControl isRequired>
              <FormLabel>SKU ID:</FormLabel>
              <Input
                type="text"
                name="SKU_ID"
                value={productData.SKU_ID}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Product ID:</FormLabel>
              <Input
                type="text"
                name="product_id"
                value={productData.product_id}
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl isRequired>
              <FormLabel>Net Weight:</FormLabel>
              <Input
                type="text"
                name="net_weight"
                value={productData.net_weight}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description:</FormLabel>
              <Textarea
                type="text"
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Country of Origin:</FormLabel>
              <Input
                type="text"
                name="countryoforigin"
                value={productData.countryoforigin}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Manufacturer Details:</FormLabel>
              <Input
                type="text"
                name="manufacturerdetails"
                value={productData.manufacturerdetails}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Product Color Options:</FormLabel>

              {/* Color Picker */}
              {/* <Button onClick={() => setShowColorPicker(!showColorPicker)}>
                {showColorPicker ? "Close Color Picker" : "Open Color Picker"}
              </Button> */}
              {/* {showColorPicker && ( */}
              <SketchPicker
                color={productData.selectedColor} // Use the selected color
                onChange={handleColorChange} // Handle color change
              />
              {/* )} */}
              {/* Add Color Button */}
              <Flex>
                <Button
                  colorScheme="teal"
                  onClick={handleAddColor}
                  disabled={!productData.selectedColor}
                >
                  Add Color
                </Button>
                <div
                  style={{
                    backgroundColor: productData.selectedColor,
                    width: "40px",
                    height: "40px",
                    marginLeft: "10px",
                  }}
                ></div>
              </Flex>
              {/* Display selected colors */}
              <Text fontWeight={500}>Colors Added </Text>
              <HStack>
                {productData.colors.map((color, index) => (
                  <VStack key={index}>
                    <div
                      // key={index}
                      style={{
                        backgroundColor: color,
                        width: "20px",
                        height: "20px",
                        // display: "inline-block",
                        // marginRight: "5px",
                      }}
                    ></div>
                    <IconButton
                      margin={"5px"}
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleRemoveColor(index)}
                      aria-label="Remove"
                      // Add the delete functionality here
                    />
                  </VStack>
                ))}
              </HStack>
            </FormControl>
            {/* <FormControl isRequired>
              <FormLabel>GST:</FormLabel>
              <Input
                type="text"
                name="gst"
                value={productData.gst}
                onChange={handleChange}
              />
            </FormControl> */}
            <FormControl isRequired>
              <FormLabel>GST:</FormLabel>
              {/* <Input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
              /> */}
              <Select
                name="gst"
                value={productData.gst}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a GST Value
                </option>
                {gstValues.map((gstitem) => (
                  <option key={gstitem} value={gstitem}>
                    {gstitem}
                  </option>
                ))}
              </Select>
              {/* {selectedCategory && <p>Selected category: {selectedCategory}</p>} */}
            </FormControl>
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
                <option value="" disabled>
                  Select a Type
                </option>

                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category:</FormLabel>
              {/* <Input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
              /> */}
              <CategoryDropdown onSelectCategory={handleSelectCategory} />
              {selectedCategory && <p>Selected category: {selectedCategory}</p>}
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
            {/* <text>erwre </text> */}
            <FormControl>
              <FormLabel>Offers:</FormLabel>
              <Select
                name="offerType"
                // value={productData.offerType}
                onChange={(e) => {
                  handleOfferChange(e.target.value);
                }}
              >
                <option value="">Select Offer Type</option>
                {offers.map((offer) => (
                  <option key={offer._id} value={offer.text}>
                    {offer.text}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Final Price:</FormLabel>
              <Input
                isdisabled
                type="number"
                name="discount"
                value={discountedPrice}
                onChange={handleChange}
              />
            </FormControl>
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
              {showImageWarning && (
                <Text color="red">Please select an image</Text>
              )}
            </FormControl>
            {/* Render input for additional images */}
            <FormControl isRequired>
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
              {showImagesWarning && (
                <Text color="red">Please select images</Text>
              )}
            </FormControl>
            {Object.entries(sizeOptions).map(([category, sizes]) => (
              <FormControl key={category}>
                <FormLabel>
                  {category === "standardSizes"
                    ? "Standard"
                    : category === "waistSizes"
                    ? "Waist"
                    : "Age"}{" "}
                  Sizes:
                </FormLabel>
                <HStack>
                  {sizes.map((size) => (
                    <Checkbox
                      key={size}
                      isChecked={productData.size.includes(size)}
                      value={size}
                      onChange={handleSizeChange}
                    >
                      {size}
                    </Checkbox>
                  ))}
                </HStack>
              </FormControl>
            ))}
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
