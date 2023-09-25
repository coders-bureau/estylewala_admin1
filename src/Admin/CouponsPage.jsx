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
import AdminNavbar from "./AdminNavbar";

const CouponsPage = () => {
  const [couponType, setCouponType] = useState("percent");
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [minprice, setMinprice] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  console.log(couponType, value, text);

  useEffect(() => {
    // Fetch coupons from the backend
    fetchCoupons();
  }, []);
  const fetchCoupons = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API}/offer/fetchcoupons`
      );
      setCoupons(response.data.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
    setisLoading(false);
  };
  const handleDeleteOffer = async (couponId) => {
    setisLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API}/offer/deletecoupon/${couponId}`
      );
      fetchCoupons();
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
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };
  const handleSubmit = async (e) => {
    setisLoading(true);
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API}/offer/addcoupon`,
        {
          type: couponType,
          value: value,
          text: text,
          minapplicableprice: minprice,
        }
      );

      console.log(response.data);
      fetchCoupons();
      toast({
        title: "Coupon successfully added ",
        variant: "top-accent",
        isClosable: true,
        position: "top-right",
        status: "success",
        duration: 2500,
      });
      // Reset form fields
      // setCouponType("");
      setValue("");
      setText("");
      setMinprice("")
      // setImage(null);
      // setCroppedImage(null);
    } catch (error) {
      console.error("Error adding coupon:", error);
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

  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);

  console.log(coupons);

  return (
    <>
      <AdminNavbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Box
            marginTop={{ lg: "90px", md: "80px", base: "80px" }}
            marginLeft={{ lg: "250px", md: "250px", base: "15px" }}
            marginRight={"15px"}
            marginBottom={"50px"}
          >
            <Box as="form" onSubmit={handleSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>Coupon Type</FormLabel>
                <Select
                  value={couponType}
                  onChange={(e) => setCouponType(e.target.value)}
                >
                  <option value="percent">Percent</option>
                  <option value="flat">Flat</option>
                  {/* <option value="deal">Deal</option> */}
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
                <FormLabel>MIN Applicable Price</FormLabel>
                <Input
                  type="number"
                  value={minprice}
                  onChange={(e) => setMinprice(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel>Coupon Code</FormLabel>
                <Input value={text} onChange={(e) => setText(e.target.value)} />
              </FormControl>

              <Button mt={4} colorScheme="teal" type="submit">
                Add Coupon
              </Button>
            </Box>
            <Box>
              <Heading as="h2" my="4">
                Coupons List
              </Heading>
              <List>
                {coupons
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
                        Coupon Type:{" "}
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          {offer.type}
                        </span>
                      </Text>
                      <Text>Value: {offer.value}</Text>
                      <Text>Code: {offer.text}</Text>
                      {/* <Image
                        src={process.env.REACT_APP_BASE_API + `/${offer.image}`}
                        boxSize="50px"
                        objectFit="cover"
                        alt={`Offer ${offer._id}`}
                      /> */}
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteCategory(offer._id)}
                      >
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
          </Box>
        </>
      )}
    </>
  );
};

export default CouponsPage;
