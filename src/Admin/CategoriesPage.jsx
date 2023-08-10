import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/allcategories'); // Adjust the endpoint accordingly
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEditCategory = (categoryId) => {
    // Navigate to the edit category page with categoryId
    // Implement your navigation logic here
  };

  const handleDeleteCategory = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      await axios.delete(`/api/categories/${deleteCategoryId}`);
      setIsDeleteAlertOpen(false);
      setDeleteCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Box>
        <Text fontSize="xl" fontWeight="semibold" mb={4}>
          All Categories
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category._id}>
                <Td>{category.name}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                    onClick={() => handleEditCategory(category._id)}
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
        {categories.length === 0 && (
          <Text mt={4}>No categories available.</Text>
        )}
      </Box>

      {/* Delete Confirmation Alert */}
      <AlertDialog isOpen={isDeleteAlertOpen} onClose={() => setIsDeleteAlertOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Category</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this category?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Cancel</Button>
              <Button colorScheme="red" onClick={confirmDeleteCategory} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default CategoriesPage;
