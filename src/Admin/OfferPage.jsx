import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  HStack,
  Input,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useToast,
} from "@chakra-ui/react";
import LoadingPage from "../Pages/LoadingPage";
import AdminNavbar from "./AdminNavbar";

const OfferPage = () => {
  const [type, setType] = useState("");
  const [values, setValues] = useState([]);
  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);

  const handleAddValue = () => {
    setValues([...values, ""]);
  };

  const handleValueChange = (index, newValue) => {
    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setValues(updatedValues);
  };

  const [offers, setOffers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Edit existing offer
      try {
        const updatedOffer = {
          type,
          values,
        };
        setisLoading(true);
        await axios
          .put(
            `${process.env.REACT_APP_BASE_API}/admin/updateoffer/${offers[editingIndex]._id}`,
            updatedOffer
          )
          .then(() => {
            setisLoading(false);
            toast({
              position: "top",
              title: `OFFERS updated successfully`,
              status: "success",
              isClosable: true,
              duration: 1500,
            });
          });
        setEditingIndex(null);
        setType("");
        setValues([]);
        fetchOffers();
      } catch (error) {
        toast({
          position: "top",
          title: `Error in updating`,
          status: "Error",
          isClosable: true,
          duration: 1500,
        });
        console.error("Error editing offer:", error);
      }
    } else {
      // Add new offer
      setisLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_API}/admin/offer/addoffer`,
          { type, values }
        );
        if (response.data.success) {
          console.log("Offer added successfully");
          setisLoading(false);
          toast({
            position: "top",
            title: `OFFERS added successfully`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
          setType("");
          setValues([]);
          fetchOffers();
        }
      } catch (error) {
        toast({
          position: "top",
          title: `Error in adding`,
          status: "Error",
          isClosable: true,
          duration: 1500,
        });
        console.error("Error adding offer:", error);
      }
    }
  };

  const handleEdit = (index) => {
    const offer = offers[index];
    setType(offer.type);
    setValues(offer.values);
    setEditingIndex(index);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/admin/deleteoffer/${id}`
      );
      //   setisLoading(false);
      toast({
        position: "top",
        title: `OFFERS deleted successfully`,
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      fetchOffers();
    } catch (error) {
      toast({
        position: "top",
        title: `Error in deleting`,
        status: "Error",
        isClosable: true,
        duration: 1500,
      });
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Box
            marginTop={"100px"}
            marginLeft={{ lg: "250px", md: "250px", base: "20px" }}
            marginRight={"20px"}
          >
            <Text fontWeight={500} fontSize={"3xl"} m={5}>Manage Offers</Text>

            <form onSubmit={handleSubmit}>
              <VStack gap={5} align={{md:"flex-start", base: "center"}}>
                <HStack>
                  <HStack>
                    <Text>Type:</Text>
                    <Input
                      required
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </HStack>
                </HStack>
                <HStack>
                  <HStack>
                    <Text>Values:</Text>
                    {values.map((value, index) => (
                      <div key={index}>
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleValueChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                    <Button ml={30} type="button" onClick={handleAddValue}>
                      Add Value
                    </Button>
                  </HStack>
                </HStack>
              </VStack>
              <Button m={5} colorScheme={"linkedin"} type="submit">
                {editingIndex !== null ? "Edit Offer" : "Add Offer"}
              </Button>
            </form>
            <Box>
              <Text fontWeight={500} fontSize={"3xl"} m={5} >Offers List</Text>
              <UnorderedList>
                {offers.map((offer, index) => (
                  <ListItem p={"5px"} key={offer._id}>
                    {offer.type} - {offer.values.join(", ")}
                    <Button
                      colorScheme="blue"
                      mx={"5px"}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      mx={"5px"}
                      onClick={() => handleDelete(offer._id)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default OfferPage;
