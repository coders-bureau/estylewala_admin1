import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  VStack,
  HStack,
} from "@chakra-ui/react";

// import { Box, Button, Input, VStack } from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
// import AdminNavbar1 from "";

const SliderPage = () => {
  const [imageData, setImageData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    // name: "",
    slideOrder: "",
    url: "",
  });
console.log(editedData);
  useEffect(() => {
    fetchImageData();
  }, []);

  const fetchImageData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/slider/getImageData`
      );
      setImageData(response.data.data);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedData({
      // name: imageData[index].name,
      slideOrder: imageData[index].slideOrder,
      url: imageData[index].url,
    });
    setModalOpen(true);
    // fetchImageData();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
    setEditedData({
      // name: "",
      slideOrder: "",
      url: "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}/slider/updateImageData/${editingIndex}`,
        editedData
      );
      if (response.data.success) {
        fetchImageData(); // Refresh the image data after edit
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating image data:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_API}/slider/deleteImageData/${index}`
      );
      if (response.data.success) {
        fetchImageData(); // Refresh the image data after delete
      }
    } catch (error) {
      console.error("Error deleting image data:", error);
    }
  };

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [slideOrder, setSlideOrder] = useState("");
  const [newImage, setNewImage] = useState(null);
  console.log(image, url, slideOrder, newImage);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewImage(selectedImage);
    setImage(selectedImage);
  };

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("url", url);
      formData.append("slideOrder", slideOrder);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/slider/saveImageAndUrl`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data sent to backend:", response.data);
      fetchImageData();
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  console.log(imageData);
  return (
    <Box>
      <AdminNavbar />
      <Box
        marginTop={"110px"}
        marginLeft={{ lg: "250px", md: "250px", base: "20px" }}
        marginRight={"20px"}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <Input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Enter Slide Order"
              value={slideOrder}
              onChange={(e) => setSlideOrder(e.target.value)}
              required
            />
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </VStack>
        </form>
        <br />
        <Box>
          <Heading as="h2" mb="4">
            Image List
          </Heading>
          {imageData.map((image, index) => (
            <Flex
              key={index}
              alignItems="center"
              border="1px solid #ccc"
              p="4"
              my="2"
              justifyContent="space-between"
            >
              <HStack>
                <Image
                  src={process.env.REACT_APP_BASE_API + `/${image.imageUrl}`}
                  boxSize={"10vw"}
                  width={"40vw"}
                  objectFit={"contain"}

                />
                {/* <Text>Name: {image.name}</Text> */}
                <Text>Slide Order: {image.slideOrder}</Text>
                <Text>URL: {image.url}</Text>
              </HStack>
              <Box>
                <Button colorScheme="blue" onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </Box>
            </Flex>
          ))}

          <Modal isOpen={modalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Image Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb={4}>
                  <FormLabel>New Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {newImage && (
                    <Image
                      src={URL.createObjectURL(newImage)}
                      alt="New Image"
                      mt="3"
                    />
                  )}
                </FormControl>
                {/* <FormControl mb="4">
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                </FormControl> */}
                <FormControl mb="4">
                  <FormLabel>Slide Order</FormLabel>
                  <Input
                    value={editedData.slideOrder}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        slideOrder: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>URL</FormLabel>
                  <Input
                    value={editedData.url}
                    onChange={(e) =>
                      setEditedData({ ...editedData, url: e.target.value })
                    }
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button variant="ghost" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderPage;
