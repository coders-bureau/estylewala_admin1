import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // If not already imported, install axios: npm install axios
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  HStack,
  useToast,
  VStack,
  IconButton,
  Image,
  Flex,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";
import { ChromePicker, SketchPicker } from "react-color";

const EditProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [product, setProduct] = useState({
    SKU_ID: "",
    product_id: "",
    net_weight: "",
    description: "",
    countryoforigin: "",
    manufacturerdetails: "",
    selectedColor: "",
    // colors: [],
    title: "",
    brand: "",
    category: "",
    type: "",
    price: 0,
    MRP: 0,
    discount: 0,
    offer: { text: "" },
    offerType: "", // Add offerType field
    offerValue: "", // Add offerValue field
    size: [],
    img: "",
    images: [],
  });
  const [showColorPicker, setShowColorPicker] = useState(false); // To toggle the color picker

  const [updatedImages, setUpdateImages] = useState([]);
  const [sizeOptions, setSizeOptions] = useState({});
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
  const fetchProduct = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_BASE_API}/product/products/${id}`)
        .then((response) => {
          setProduct(response.data.data);
          setisLoading(false);
        });
    } catch (error) {
      console.error("Error fetching product:", error);
      // Handle error here, e.g., show an error message to the user
    }
  };
  useEffect(() => {
    // Fetch the product data from the backend using the product ID

    fetchSizeOptions();
    fetchProduct();
    fetchOffers();
    fetchGSTValues();
  }, [id]);
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
  // Handle input changes for the editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // const handleAddImage = () => {
  //   // Add a new empty string to the images array when plus button is clicked
  //   setProduct((prevData) => ({
  //     ...prevData,
  //     images: [...prevData.images, ""],
  //   }));
  // };

  // const handleImageChange = (index, value) => {
  //   // Update the image link at the specified index in the images array
  //   setProduct((prevData) => {
  //     const updatedImages = [...prevData.images];
  //     updatedImages[index] = value;
  //     return {
  //       ...prevData,
  //       images: updatedImages,
  //     };
  //   });
  // };

  const [imasd, setimg] = useState("");
  const handleImageChange = (e) => {
    // setimg(URL.createObjectURL(e.target.files[0]));
    setNormalImage(false);
    const file = e.target.files[0];
    // console.log(file);
    setProduct((prevData) => ({
      ...prevData,
      img: file,
    }));
  };

  const handleRemoveImage = (index) => {
    setProduct((prevData) => {
      const updatedImagesO = [...prevData.images];
      updatedImagesO.splice(index, 1);
      return {
        ...prevData,
        images: updatedImagesO,
      };
    });
  };
  const handleRemoveImage1 = (index) => {
    const updatedImages1 = [...updatedImages];
    updatedImages1.splice(index, 1);
    setUpdateImages(updatedImages1);
  };

  const handleSizeChange = (e) => {
    const sizeValue = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // If the size checkbox is checked, add it to the size array
      setProduct({
        ...product,
        size: [...product.size, sizeValue],
      });
    } else {
      // If the size checkbox is unchecked, remove it from the size array
      const updatedSizes = product.size.filter((size) => size !== sizeValue);
      setProduct({ ...product, size: updatedSizes });
    }
  };
  const handleSizeCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => {
      if (checked) {
        return {
          ...prevProduct,
          size: [...prevProduct.size, name],
        };
      } else {
        return {
          ...prevProduct,
          size: prevProduct.size.filter((size) => size !== name),
        };
      }
    });
  };

  const handleAdditionalImagesChange = (e) => {
    const imagesArray = Array.from(e.target.files);
    setProduct({ ...product, images: imagesArray });
  };

  const handleAddImage = (e) => {
    // const file = e.target.files[0];
    setUpdateImages([...updatedImages, e.target.files[0]]);
    setNormalImage1(false);
    // setUpdateImages((prevData) => ({
    //   ...prevData,
    //   updatedImages: [...prevData.updatedImages, file],
    // }));
    // setProduct((prevData) => ({
    //   ...prevData,
    //   updateimages: [...prevData.updateimages, file],
    // }));
  };
  console.log(updatedImages);

  const [gstValues, setGstValues] = useState([]);
  // const [newValue, setNewValue] = useState("");

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

  const handleColorChange = (color) => {
    setProduct({
      ...product,
      selectedColor: color.hex, // Store the selected color temporarily
    });
  };

  const handleAddColor = () => {
    if (product.selectedColor) {
      setProduct({
        ...product,
        colors: [...product.colors, product.selectedColor], // Add the selected color to the colors array
        selectedColor: "", // Clear the selected color
      });
    }
  };

  const handleRemoveColor = (index) => {
    const updatedColors = [...product.colors];
    updatedColors.splice(index, 1); // Remove the color at the specified index
    setProduct({
      ...product,
      colors: updatedColors,
    });
  };

  // Handle the product update when the "Update" button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/products/${id}`,
        product
      );
      toast({
        title: "Product successfully updated in Databse",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "success",
        duration: 2500,
      });
      // Assuming the backend returns a success message on successful update
      console.log(response.data.message);
      navigate("/product-list");

      // Optionally, you can navigate back to the products table page or show a success message to the user.
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error here, e.g., show an error message to the user
    }
  };
  const [offers, setOffers] = useState([]);
  const [offerType, setOfferType] = useState("");
  const [offerValue, setOfferValue] = useState("");
  const [offerName, setOfferName] = useState("");

  const [discountedPrice, setDiscountedPrice] = useState(product.price);
  const handleOfferChange = (text1) => {
    const selectedOffer = offers?.find((o) => o.text === text1);
    console.log(selectedOffer);
    setOfferType(selectedOffer.type);
    setOfferValue(selectedOffer.value);
    setOfferName(selectedOffer.text);
    console.log(offerType, offerName, offerValue);
    setProduct((prev) => ({
      ...prev,
      offer: { text: text1 },
    }));
    if (selectedOffer.type === "percent") {
      const discountAmount = (selectedOffer.value / 100) * product.price;
      // setDiscountedPrice(product.price - discountAmount);
      setProduct((prev) => ({
        ...prev,
        discount: product.price - discountAmount,
      }));
      // setproduct(product.discount=discountedPrice);
    } else if (selectedOffer.type === "flat") {
      // setDiscountedPrice(product.price - selectedOffer.value);
      setProduct((prev) => ({
        ...prev,
        discount: product.price - selectedOffer.value,
      }));
      // setproduct(product.discount=discountedPrice);
    } else {
      // setDiscountedPrice(product.price);
      setProduct((prev) => ({
        ...prev,
        discount: product.price,
      }));
      // setproduct(product.price);
    }
  };
  const handleUpdateProduct = async (e) => {
    setisLoading(true);
    e.preventDefault();
    setNormalImage(true);
    setNormalImage1(true);
    const formData = new FormData();
    formData.append("SKU_ID", product.SKU_ID);
    formData.append("product_id", product.product_id);
    formData.append("net_weight", product.net_weight);
    formData.append("description", product.description);
    formData.append("countryoforigin", product.countryoforigin);
    formData.append("manufacturerdetails", product.manufacturerdetails);
    // formData.append("colors", product.colors);
    // product.colors.forEach((color) => {
    //   formData.append("colors", color);
    // });
    formData.append("gst", product.gst);

    formData.append("topColor", product.topColor);
    formData.append("topFabric", product.topFabric);
    formData.append("bottomColor", product.bottomColor);
    formData.append("bottomFabric", product.bottomFabric);

    formData.append("title", product.title);
    formData.append("brand", product.brand);
    formData.append("rating", product.rating);
    formData.append("ratingT", product.ratingT);
    formData.append("category", product.category);
    formData.append("type", product.type);
    formData.append("price", product.price);
    formData.append("MRP", product.MRP);
    // formData.append("discount", product.discount);
    // formData.append("size", product.size);
    product.size.forEach((size) => {
      formData.append("size", size);
    });
    formData.append("currentSize", product.currentSize);
    formData.append("img", product.img);
    // formData.append('images', product.images);
    updatedImages.forEach((image1) => {
      formData.append("updatedImages", image1);
    });
    product.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("reviews", product.reviews);
    formData.append("offerType", offerType);
    formData.append("offerValue", offerValue);
    formData.append("offerName", offerName);
    // Append the additional images to the FormData
    // for (let i = 0; i < product.images.length; i++) {
    //   formData.append('images', product.images[i]);
    // }
    try {
      // Make the API call to update the product
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/admin/updateproduct/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setisLoading(false);

      // Handle the response, e.g., show a success message
      console.log(response.data);
      toast({
        title: "Product updated Successfully.",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "success",
        duration: 2500,
      });
      setProduct(response.data.product);
      navigate("/product-list");

      // setProduct({
      //   title: "",
      //   brand: "",
      //   rating: 0,
      //   ratingT: 0,
      //   category: "",
      //   type: "",
      //   price: "",
      //   MRP: "",
      //   discount: "",
      //   size: [],
      //   img: "",
      //   images: [],
      //   reviews: [],
      // });
      // Reset the form or perform other actions as needed
      // setProduct({
      //   title: "",
      //   brand: "",
      //   image: null,
      //   images: [],
      //   // Other product properties...
      // });
    } catch (error) {
      setisLoading(false);
      toast({
        title: "Error adding product",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "error",
        duration: 2500,
      });
      console.log(product);
      console.error("Error adding product:", error);
      // Handle errors, e.g., show an error message
      console.error(error);
    }
  };
  const [isLoading, setisLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [normalImage, setNormalImage] = useState(true);
  const [normalImage1, setNormalImage1] = useState(true);
  console.log(product);
  // if (isLoading)
  //   return (
  //     <Box height={"200px"}>
  //       <LoadingPage />
  //     </Box>
  //   );
  if (isError)
    return (
      <>
        <PageNotFound />
      </>
    );
  return (
    <Box width={"100%"}>
      <AdminNavbar />
      {!isLoading ? (
        <VStack spacing={4} align="center">
          <Box
            marginTop={{ lg: "100px", md: "90px", base: "90px" }}
            marginLeft={{ lg: "250px", md: "250px", base: "10px" }}
            marginBottom={"30px"}
            marginRight={"10px"}
            as="form"
            onSubmit={handleUpdateProduct}
            // w="80%"
          >
            <FormControl isRequired>
              <FormLabel>SKU ID:</FormLabel>
              <Input
                type="text"
                name="SKU_ID"
                value={product.SKU_ID}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Product ID:</FormLabel>
              <Input
                type="text"
                name="product_id"
                value={product.product_id}
                onChange={handleInputChange}
              />
            </FormControl>{" "}
            <FormControl isRequired>
              <FormLabel>Net Weight:</FormLabel>
              <Input
                type="text"
                name="net_weight"
                value={product.net_weight}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description:</FormLabel>
              <Textarea
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Country of Origin:</FormLabel>
              <Input
                type="text"
                name="countryoforigin"
                value={product.countryoforigin}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Manufacturer Details:</FormLabel>
              <Input
                type="text"
                name="manufacturerdetails"
                value={product.manufacturerdetails}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* <FormControl isRequired>
            <FormLabel>Product Color Options:</FormLabel>

              
              <Flex>
              <SketchPicker
                  color={product.selectedColor} // Use the selected color
                  onChange={handleColorChange} // Handle color change
                />
                <Button
                margin={"10px"}
                  colorScheme="teal"
                  onClick={handleAddColor}
                  disabled={!product.selectedColor}
                >
                  Add Color
                </Button>
                <div
                  style={{
                    backgroundColor: product.selectedColor,
                    width: "40px",
                    height: "40px",
                    margin: "10px",
                  }}
                ></div>
              </Flex>
              <Text fontWeight={500}>Colors Added </Text>
              <HStack>
                {product.colors.map((color, index) => (
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
            </FormControl> */}
            <FormControl isRequired>
              <FormLabel>GST:</FormLabel>
              <Select
                name="gst"
                value={product.gst}
                onChange={handleInputChange}
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
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Top Color:</FormLabel>
              <Input
                type="text"
                name="topColor"
                value={product.topColor}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Top Fabric:</FormLabel>
              <Input
                type="text"
                name="topFabric"
                value={product.topFabric}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Bottom Color:</FormLabel>
              <Input
                type="text"
                name="bottomColor"
                value={product.bottomColor}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Bottom Fabric:</FormLabel>
              <Input
                type="text"
                name="bottomFabric"
                value={product.bottomFabric}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Brand</FormLabel>
              <Input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Type</FormLabel>
              <Select
                name="type"
                value={product.type}
                onChange={handleInputChange}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>MRP</FormLabel>
              <Input
                type="number"
                name="MRP"
                value={product.MRP}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Offers:</FormLabel>
              <Select
                name="offerType"
                value={product.offer.text}
                onChange={(e) => {
                  handleOfferChange(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Offer Type
                </option>
                {offers.map((offer) => (
                  <option key={offer._id} value={offer.text}>
                    {offer.text}
                  </option>
                ))}
              </Select>

              {/* <select
                disabled={!product.offerType}
                name="offerValue"
                value={product.offerValue}
                onChange={handleInputChange}
              >
                <option value="">Select Offer Value</option>
                {product.offerType &&
                  offers
                    ?.find((o) => o.type === product.offerType)
                    ?.values?.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                    
              </select> */}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Final Price</FormLabel>
              <Input
                type="number"
                name="discount"
                value={product.discount}
                // onChange={handleInputChange}
                required
                isDisabled
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Main Image:</FormLabel>
              <HStack>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />{" "}
                {normalImage ? (
                  <Image
                    src={`${process.env.REACT_APP_BASE_API}/${product.img}`}
                    alt="Main Image"
                    style={{ width: "100px" }}
                  />
                ) : (
                  <Image
                    src={URL.createObjectURL(product.img)}
                    alt="Main Image"
                    style={{ width: "100px" }}
                  />
                )}
              </HStack>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Aditional Images</FormLabel>
              <VStack align="flex-start" spacing={4}>
                <input type="file" accept="image/*" onChange={handleAddImage} />{" "}
                <HStack>
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <Image
                        src={`${process.env.REACT_APP_BASE_API}/${image}`}
                        alt={"Image " + index}
                        style={{ width: "100px" }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {!normalImage1 && (
                    <>
                      {updatedImages.map((image, index) => (
                        <div key={index}>
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 1}`}
                            width="100px"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage1(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </HStack>
              </VStack>
            </FormControl>
            {Object.entries(sizeOptions).map(([category, sizes]) => (
              <FormControl key={category}>
                <FormLabel>
                {category === "standardSizes"
                    ? "Standard Sizes:"
                    : category === "waistSizes"
                    ? "Waist Sizes:"
                    : category === "ageSizes"
                    ? "Age Sizes:"
                    : category === "sleeveLength"
                    ? "Sleeve Length:"
                    : "Pant Closure:"}{" "}
                </FormLabel>
                <SimpleGrid
                 columns={{ lg: "10", md: "6", base: "3" }}
                 spacing={10}
                 gap={5}>
                  {sizes.map((size) => (
                    <Checkbox
                      key={size}
                      isChecked={product.size.includes(size)}
                      value={size}
                      onChange={handleSizeChange}
                    >
                      {size}
                    </Checkbox>
                  ))}
                </SimpleGrid>
              </FormControl>
            ))}
            {/* <input type="file" accept="image/*" onChange={handleAdditionalImagesChange}/> */}
            <HStack mt={8}>
              <Button type="submit" colorScheme="blue">
                Update Product
              </Button>
              <Button colorScheme="gray" onClick={()=> (navigate("/product-list"))}>Cancel</Button>
            </HStack>
          </Box>
        </VStack>
      ) : (
        <>
          <LoadingPage />
        </>
      )}
    </Box>
  );
};

export default EditProduct;
