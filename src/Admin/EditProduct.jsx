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
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { CloseIcon } from "@chakra-ui/icons";
import LoadingPage from "../Pages/LoadingPage";
import PageNotFound from "../Pages/PageNotFound";

const EditProduct = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    brand: "",
    category: "",
    type: "",
    price: 0,
    MRP: 0,
    discount: 0,
    offerType: "", // Add offerType field
    offerValue: "", // Add offerValue field
    size: [],
    img: "",
    images: [],
  });
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
  }, [id]);
  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/fetchoffers`
      );
      setOffers(response.data);
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
    console.log(file);
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

  const handleUpdateProduct = async (e) => {
    setisLoading(true);
    e.preventDefault();
    setNormalImage(true);
    setNormalImage1(true);
    const formData = new FormData();
    formData.append("offerType", product.offerType);
    formData.append("offerValue", product.offerValue);
    formData.append("title", product.title);
    formData.append("brand", product.brand);
    formData.append("rating", product.rating);
    formData.append("ratingT", product.ratingT);
    formData.append("category", product.category);
    formData.append("type", product.type);
    formData.append("price", product.price);
    formData.append("MRP", product.MRP);
    // formData.append("discount", product.discount);
    formData.append("size", product.size);
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
            marginTop={{ lg: "100px", md: "80px", base: "80px" }}
            marginLeft={{ lg: "250px", md: "250px", base: "0px" }}
            as="form"
            onSubmit={handleUpdateProduct}
            w="70%"
          >
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
              <select
                name="offerType"
                value={product.offerType}
                onChange={handleInputChange}
              >
                <option value="">Select Offer Type</option>
                {offers.map((offer) => (
                  <option key={offer._id} value={offer.type}>
                    {offer.type}
                  </option>
                ))}
              </select>
              <select
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
              </select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Final Price</FormLabel>
              <Input
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleInputChange}
                required
                isDisabled
              />
            </FormControl>

            {/* <FormControl mb={4}>
              <FormLabel>Standard Sizes:</FormLabel>
              <Checkbox
                name="S"
                isChecked={product.size.includes("S")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                S
              </Checkbox>
              <Checkbox
                name="M"
                isChecked={product.size.includes("M")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                M
              </Checkbox>
              <Checkbox
                name="L"
                isChecked={product.size.includes("L")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                L
              </Checkbox>
              <Checkbox
                name="XL"
                isChecked={product.size.includes("XL")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                XL
              </Checkbox>
              <Checkbox
                name="XXL"
                isChecked={product.size.includes("XXL")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                XXL
              </Checkbox>
              <Checkbox
                name="3XL"
                isChecked={product.size.includes("3XL")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                3XL
              </Checkbox>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Waist Sizes:</FormLabel>
              <Checkbox
                name="28"
                isChecked={product.size.includes("28")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                28
              </Checkbox>
              <Checkbox
                name="30"
                isChecked={product.size.includes("30")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                30
              </Checkbox>
              <Checkbox
                name="32"
                isChecked={product.size.includes("32")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                32
              </Checkbox>
              <Checkbox
                name="34"
                isChecked={product.size.includes("34")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                34
              </Checkbox>
              <Checkbox
                name="36"
                isChecked={product.size.includes("36")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                36
              </Checkbox>
              <Checkbox
                name="38"
                isChecked={product.size.includes("38")}
                onChange={handleSizeCheckboxChange}
                mr={2}
              >
                38
              </Checkbox>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Age Sizes:</FormLabel>
              <Checkbox
                name="6-12M"
                isChecked={product.size.includes("6-12M")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                6-12M
              </Checkbox>
              <Checkbox
                name="1-1.5Y"
                isChecked={product.size.includes("1-1.5Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                1-1.5Y
              </Checkbox>
              <Checkbox
                name="1.5-2Y"
                isChecked={product.size.includes("1.5-2Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                1.5-2Y
              </Checkbox>
              <Checkbox
                name="2-3Y"
                isChecked={product.size.includes("2-3Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                2-3Y
              </Checkbox>
              <Checkbox
                name="4-6Y"
                isChecked={product.size.includes("4-6Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                4-6Y
              </Checkbox>
              <Checkbox
                name="6-8Y"
                isChecked={product.size.includes("6-8Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                6-8Y
              </Checkbox>
              <Checkbox
                name="9-11Y"
                isChecked={product.size.includes("9-11Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                9-11Y
              </Checkbox>
              <Checkbox
                name="12-14Y"
                isChecked={product.size.includes("12-14Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                12-14Y
              </Checkbox>
              <Checkbox
                name="15-17Y"
                isChecked={product.size.includes("15-17Y")}
                mr={2}
                onChange={handleSizeCheckboxChange}
              >
                15-17Y
              </Checkbox>
            </FormControl> */}
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
                      isChecked={product.size.includes(size)}
                      value={size}
                      onChange={handleSizeChange}
                    >
                      {size}
                    </Checkbox>
                  ))}
                </HStack>
              </FormControl>
            ))}
            {/* <input type="file" accept="image/*" onChange={handleAdditionalImagesChange}/> */}

            <HStack mt={8}>
              <Button type="submit" colorScheme="blue">
                Update Product
              </Button>
              <Button colorScheme="gray">Cancel</Button>
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
