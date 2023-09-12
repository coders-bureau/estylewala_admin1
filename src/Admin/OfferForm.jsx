import React, { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import LoadingPage from "../Pages/LoadingPage";

const OfferForm = () => {
  const [offerType, setOfferType] = useState("percent");
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  console.log(offerType, value, text, image);

  useEffect(() => {
    // Fetch offers from the backend
    fetchOffers();
  }, []);
  const fetchOffers = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/offer/fetchoffers`
      );
      setOffers(response.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
    setisLoading(false);
  };
  const handleDeleteOffer = async (offerId) => {
    setisLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/offer/deleteoffer/${offerId}`
      );
      fetchOffers();
      setIsDeleteAlertOpen(false);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
    setisLoading(false);
  };
  const handleDeleteCategory = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setIsDeleteAlertOpen(true);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e) => {
    setisLoading(true);

    try {
      e.preventDefault();
      // Create a new FormData object
      const formData = new FormData();
      formData.append("type", offerType);
      formData.append("value", value);
      formData.append("text", text);
      formData.append("image", image);

      // Send the form data to the backend using axios or any other HTTP library
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/offer/addoffer`,
        formData
      );

      console.log(response.data);
      fetchOffers();
      toast({
        title: "Offer successfully added ",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "success",
        duration: 2500,
      });
      // Reset form fields
      // setOfferType("");
      // setValue("");
      // setText("");
      // setImage(null);
      // setCroppedImage(null);
    } catch (error) {
      console.error("Error adding offer:", error);
      toast({
        title: error.response.statusText,
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "error",
        duration: 2500,
      });
    }
    setisLoading(false);
  };

  //   const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
  //     setCrop(croppedArea);
  //     const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
  //     setCroppedImage(croppedImage);
  //   };
  //   const fetchOffers = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASE_API}/offer/fetchoffers`
  //       );
  //       setOffers(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching offers:", error);
  //     }
  //   };

  // Define the getCroppedImg function to generate a cropped image URL
  // const getCroppedImg = async (imageSrc, pixelCrop) => {
  //   const image = new Image();
  //   image.src = imageSrc;

  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");

  //   canvas.width = pixelCrop.width;
  //   canvas.height = pixelCrop.height;

  //   ctx.drawImage(
  //     image,
  //     pixelCrop.x,
  //     pixelCrop.y,
  //     pixelCrop.width,
  //     pixelCrop.height,
  //     0,
  //     0,
  //     pixelCrop.width,
  //     pixelCrop.height
  //   );

  //   return new Promise((resolve, reject) => {
  //     canvas.toBlob((blob) => {
  //       if (!blob) {
  //         reject(new Error("Failed to generate image blob"));
  //         return;
  //       }
  //       resolve(URL.createObjectURL(blob));
  //     }, "image/jpeg");
  //   });
  // };

  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);

  console.log(offers);
  if (isLoading)
    return (
      <Box height={"200px"}>
        <LoadingPage />
      </Box>
    );
  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Offer Type</FormLabel>
          <Select
            value={offerType}
            onChange={(e) => setOfferType(e.target.value)}
          >
            <option value="percent">Percent</option>
            <option value="flat">Flat</option>
            <option value="deal">Deal</option>
          </Select>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Value</FormLabel>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Text</FormLabel>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </FormControl>

        {/* <FormControl>
        <FormLabel>Upload Image</FormLabel>
        <Input type="file"  onChange={handleFileChange} accept="image/*" />
      </FormControl> */}

        {/* {image && (
        <Box mt={4}>
          <FormLabel>Crop Image</FormLabel>
          <EasyCrop image={image} onCropComplete={handleCropComplete} />
        </Box>
      )}

      {croppedImage && (
        <Box mt={4}>
          <FormLabel>Cropped Image Preview</FormLabel>
          <img src={croppedImage} alt="Cropped" style={{ maxWidth: '50%' }} />
        </Box>
      )} */}

        <Button mt={4} colorScheme="teal" type="submit">
          Add Offer
        </Button>
        {/* <OfferForm /> */}
      </Box>
      <Box>
        <Heading as="h2" mb="4">
          Offers List 123
        </Heading>
        <List>
          {offers
            .sort((a, b) => a.text.localeCompare(b.text))
            .map((offer) => (
              <HStack
                justifyContent={"space-evenly"}
                key={offer._id}
                border="1px solid #ccc"
                p="4"
                my="2"
              >
                <Text>
                  Type:{" "}
                  <span
                    style={{ textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    {offer.type}
                  </span>
                </Text>
                <Text>Value: {offer.value}</Text>
                <Text>Text: {offer.text}</Text>
                <Image
                  src={process.env.REACT_APP_BASE_API + `/${offer.image}`}
                  boxSize="50px"
                  objectFit="cover"
                  alt={`Offer ${offer._id}`}
                />
                {/* <Button onClick={() => setSelectedOffer(offer)}>Edit</Button> */}
                <Button onClick={() => handleDeleteCategory(offer._id)}>
                  Delete
                </Button>
              </HStack>
            ))}
        </List>
        <AlertDialog
          isOpen={isDeleteAlertOpen}
          leastDestructiveRef={null}
          onClose={() => setIsDeleteAlertOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Delete Offer</AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete this offer?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={() => setIsDeleteAlertOpen(false)}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    handleDeleteOffer(deleteCategoryId);
                    setSelectedOffer(null);
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
};

export default OfferForm;
