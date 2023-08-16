// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Box, HStack, Heading, Image, List, ListItem, Text } from "@chakra-ui/react";

// const OfferList = () => {
//   const [offers, setOffers] = useState([]);

//   useEffect(() => {
//     // Fetch offers from the backend
//     fetchOffers();
//   }, []);

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
//   console.log(offers);
//   return (
//     <Box>
//       <Heading as="h2" mb="4">
//         Offers List
//       </Heading>
//       <List>
//         {offers.map((offer) => (
//           <HStack justifyContent={"space-evenly"} key={offer._id} border="1px solid #ccc" p="4" my="2">
//             <Text>Type: {offer.type}</Text>
//             <Text>Value: {offer.value}</Text>
//             <Text>Text: {offer.text}</Text>
//             <Image
//               src={process.env.REACT_APP_BASE_API + `/${offer.image}`}
//               boxSize="50px"
//               objectFit="cover"
//               alt={`Offer ${offer._id}`}
//             />
//           </HStack>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default OfferList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const OfferList = (  ) => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  useEffect(() => {
    // Fetch offers from the backend
    fetchOffers();
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

  const handleDeleteOffer = async (offerId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/offer/deleteoffer/${offerId}`
      );
      fetchOffers();
      setIsDeleteAlertOpen(false);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };
  const handleDeleteCategory = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setIsDeleteAlertOpen(true);
  };
  return (
    <Box>
      <Heading as="h2" mb="4">
        Offers List
      </Heading>
      <List>
        {offers.map((offer) => (
          <HStack
            justifyContent={"space-evenly"}
            key={offer._id}
            border="1px solid #ccc"
            p="4"
            my="2"
          >
            <Text>Type: {offer.type}</Text>
            <Text>Value: {offer.value}</Text>
            <Text>Text: {offer.text}</Text>
            <Image
              src={process.env.REACT_APP_BASE_API + `/${offer.image}`}
              boxSize="50px"
              objectFit="cover"
              alt={`Offer ${offer._id}`}
            />
            <Button onClick={() => setSelectedOffer(offer)}>Edit</Button>
            <Button onClick={() => handleDeleteCategory(offer._id)}>Delete</Button>
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
              <Button
                onClick={() => setIsDeleteAlertOpen(false)}
              >
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
  );
};

export default OfferList;
