import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormLabel,
  FormControl,
  Input,
  useToast,
  Image,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LoadingPage from "../Pages/LoadingPage";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [image, setImage] = useState(null);

  const toast = useToast();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/admin/allcategories`
      ); // Adjust the endpoint accordingly
      setCategories(response.data.data);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setisLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  console.log(image);
  const handleEditCategory = async (categoryId, newType) => {
    try {
      setisLoading(true);

      await axios
        .put(
          process.env.REACT_APP_BASE_API + `/category/update/${categoryId}`,
          {
            name: newType,
          }
        )
        .then(() => {
          setisLoading(false);
          fetchCategories();
          toast({
            position: "top",
            title: `Category updated successfully`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
        })
        .catch(() => {
          setisLoading(false);

          // toast({
          //   position: "top",
          //   title: `Error in adding successfully`,
          //   status: "Error",
          //   isClosable: true,
          //   duration: 1500,
          // });
        });
      setUpdatedCategories("");

      // Handle success, maybe show a success message
    } catch (error) {
      console.error("Error updating category:", error);
      // Handle error, show an error message
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      // setisLoading(true);
      await axios.delete(
        process.env.REACT_APP_BASE_API + `/category/delete/${deleteCategoryId}`
      );
      setIsDeleteAlertOpen(false);
      setDeleteCategoryId(null);
      fetchCategories();
      toast({
        position: "top",
        title: `Category deleted successfully`,
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      // setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error("Error deleting category:", error);
    }
  };

  const handleAddCategory = async (name) => {
    try {
      setisLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      console.log("firm data", formData);
      const response = await axios
        .post(`${process.env.REACT_APP_BASE_API}/category/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          fetchCategories();
          setisLoading(false);
          toast({
            position: "top",
            title: `Category added successfully`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
        })
        .catch(() => {
          setisLoading(false);

          // toast({
          //   position: "top",
          //   title: `Error in adding successfully`,
          //   status: "Error",
          //   isClosable: true,
          //   duration: 1500,
          // });
        });

      setNewCategoryName("");
      updatedCategories("");
    } catch (error) {
      // Handle error
      // ...
    }
  };
  console.log(categories);

  return (
    <>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container maxW="container.lg" py={10}>
          <Box
            marginTop={{ lg: "90px", md: "80px", base: "80px" }}
            marginLeft={{ lg: "250px", md: "250px", base: "10px" }}
            marginRight={"10px"}
          >
            {/* <Text fontSize="xl" fontWeight="semibold" mb={4}>
          All Categories
        </Text> */}
            {categories.length === 0 ? (
              <Text fontSize={50}>No categories available.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Update Text</Th>
                    <Th>Image</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categories.map((category, index) => (
                    <Tr key={index}>
                      <Td>{category.name}</Td>
                      <Td>
                        {" "}
                        <Input
                          border={"1px"}
                          w={200}
                          placeholder="Type and click right button"
                          // value={} // Use the existing category type
                          onChange={(e) => setUpdatedCategories(e.target.value)}
                        />
                      </Td>
                      <Td>
                        <Image
                          src={
                            process.env.REACT_APP_BASE_API +
                            `/${category.image}`
                          }
                          boxSize="50px"
                          objectFit="cover"
                          alt={`Offer ${category._id}`}
                        />
                      </Td>
                      <Td>
                        <Button
                          // icon={<EditIcon />}
                          
                          colorScheme="blue"
                          size="sm"
                          mr={2}
                          onClick={() =>
                            handleEditCategory(category._id, updatedCategories)
                          }
                        >Update</Button>
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDeleteCategory(category._id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            <Box mt={10}>
              <Text fontSize="xl" fontWeight="semibold" mb={4}>
                Add New Category
              </Text>
              <FormControl>
                {/* <FormLabel>Name</FormLabel> */}
                <Input
                  border={"1px"}
                  w={200}
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>
              {/* <FormControl>
              <FormLabel>Type</FormLabel>
              <Input
                value={newCategoryType}
                onChange={(e) => setNewCategoryType(e.target.value)}
              />
            </FormControl> */}
              <Button
                my={7}
                colorScheme="green"
                onClick={() => handleAddCategory(newCategoryName)}
              >
                Add Category
              </Button>
            </Box>
          </Box>

          {/* Delete Confirmation Alert */}
          <AlertDialog
            isOpen={isDeleteAlertOpen}
            onClose={() => setIsDeleteAlertOpen(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader>Delete Category</AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure you want to delete this category?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={() => setIsDeleteAlertOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={confirmDeleteCategory}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Container>
      )}
    </>
  );
};

export default CategoriesPage;
