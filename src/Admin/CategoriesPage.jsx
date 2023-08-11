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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState("");
  const toast = useToast();
  useEffect(() => {
    fetchCategories();
  }, [newCategoryName, deleteCategoryId, updatedCategories]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/allcategories"
      ); // Adjust the endpoint accordingly
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditCategory = async (categoryId, newType) => {
    try {
      await axios
        .put(`http://localhost:5000/category/update/${categoryId}`, {
          name: newType,
        })
        .then(() => {
          toast({
            position: "top",
            title: `Category updated successfully`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
        })
        .catch(() => {
          toast({
            position: "top",
            title: `Error in adding successfully`,
            status: "Error",
            isClosable: true,
            duration: 1500,
          });
        });
        setUpdatedCategories('');

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
      await axios.delete(
        `http://localhost:5000/category/delete/${deleteCategoryId}`
      );
      setIsDeleteAlertOpen(false);
      setDeleteCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddCategory = async (name) => {
    try {
      const response = await axios
        .post("http://localhost:5000/category/add", {
          name,
        })
        .then(() => {
          toast({
            position: "top",
            title: `Category added successfully`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
        })
        .catch(() => {
          toast({
            position: "top",
            title: `Error in adding successfully`,
            status: "Error",
            isClosable: true,
            duration: 1500,
          });
        });

      setNewCategoryName("");
      updatedCategories("");
    } catch (error) {
      // Handle error
      // ...
    }
  };
  console.log(updatedCategories);

  return (
    <>
      <AdminNavbar />
      <Container maxW="container.lg" py={10}>
        <Box
          marginTop={{ lg: "90px", md: "80px", base: "80px" }}
          marginLeft={{ lg: "250px", md: "250px", base: "0px" }}
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
                        w={200}
                        // value={} // Use the existing category type
                        onChange={(e) => setUpdatedCategories(e.target.value)}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        mr={2}
                        onClick={() =>
                          handleEditCategory(category._id, updatedCategories)
                        }
                      />
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
                w={200}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
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
    </>
  );
};

export default CategoriesPage;
