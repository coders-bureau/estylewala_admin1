import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import LoadingPage from "../Pages/LoadingPage";
import AdminNavbar from "./AdminNavbar";
import OfferList from "./OfferList";
import OfferForm from "./OfferForm";

const OfferPage = () => {
  const [offerType, setOfferType] = useState("");
  const [offerValue, setOfferValue] = useState("");
  const [offerText, setOfferText] = useState("");
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("type", offerType);
    formData.append("value", offerValue);
    formData.append("text", offerText);

    try {
      await axios.post("/api/offers/addOffer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Offer added successfully");
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

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
        `${process.env.REACT_APP_BASE_API}/offer/fetchoffers`
      );
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
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
        `${process.env.REACT_APP_BASE_API}/offer/deleteoffer/${id}`
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
            marginTop={{ lg: "90px", md: "80px", base: "80px" }}
            marginLeft={{ lg: "250px", md: "250px", base: "15px" }}
            marginRight={"15px"}
            marginBottom={"50px"}
          >
            {/* <OfferForm /> */}
            <OfferForm />
          </Box>
          {/* <OfferList /> */}
        </>
      )}
    </>
  );
};

export default OfferPage;
