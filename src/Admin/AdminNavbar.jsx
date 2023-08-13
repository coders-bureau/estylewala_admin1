import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/estylebg.png";
import {
  Button,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Image,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  AvatarBadge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  MenuList,
  Tag,
  MenuItem,
} from "@chakra-ui/react";

import { FiMenu } from "react-icons/fi";
import { AiFillFileAdd, AiFillFolder, AiFillHome } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { HiFolderAdd, HiOutlineUser } from "react-icons/hi";
import { ImMan, ImWoman } from "react-icons/im";
import { TbRulerMeasure } from "react-icons/tb";
import { MdRateReview } from "react-icons/md";
import { FaBoxOpen, FaBoxes, FaChild, FaUser, FaUsers } from "react-icons/fa";
import {
  RiAccountPinCircleFill,
  RiAdminFill,
  RiLogoutCircleFill,
} from "react-icons/ri";
import {
  BiSolidCategory,
  BiCategory,
  BiSolidCommentDetail,
  BiSolidOffer,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { login } from "../Redux/AuthReducer/Action";
// import { getAdminData } from '../Redux/Admin/Admin.action';
// const LinkItems = [
//   {
//     name: "Customer",
//     icon: FaUser,
//     path: "/users-list",
//   },
//   {
//     name: "Order",
//     icon: FaBoxes,
//     items: [{ name: "Orders", icon: FaBoxOpen, path: "/orders-list" }],
//   },
//   {
//     name: "Product",
//     icon: HiFolderAdd,
//     items: [
//       { name: "Product", icon: HiFolderAdd, path: "/add-products" },
//       { name: "Products", icon: AiFillFolder, path: "/product-list" },
//     ],
//   },
//   {
//     name: "Category",
//     icon: BiSolidCategory,
//     items: [{ name: "Categories", icon: BiCategory, path: "/categories-list" }],
//   },
//   {
//     name: "Review",
//     icon: BiSolidCommentDetail,
//     items: [{ name: "Reviews", icon: MdRateReview, path: "/reviews-list" }],
//   },
//   {
//     name: "Size",
//     icon: TbRulerMeasure,
//     items: [{ name: "Sizes", icon: TbRulerMeasure, path: "/size" }],
//   },
//   // { name: "Home", icon: AiFillHome, path: "/admin-dashboard" },
//   // { name: "Home", icon: AiFillHome, path: "/" },
//   // { name: "Product", icon: HiFolderAdd, path: "/add-products" },
//   // { name: "Products", icon: AiFillFolder, path: "/product-list" },
//   // { name: "Orders", icon: FaBoxOpen, path: "/orders-list" },
//   // { name: "Users", icon: FaUsers, path: "/users-list" },
//   // { name: "Categories", icon: FaUsers, path: "/categories-list" },
//   // {

//   // },
//   // { name: "Men", icon: ImMan, path: "/admin-men" },
//   // { name: "Women", icon: ImWoman, path: "/admin-women" },
//   // { name: "Kids", icon: FaChild, path: "/admin-kids" },
//   // { name: "Account", icon: RiAccountPinCircleFill, path: "/admin-profile" },
//   // { name: "Logout", icon: RiLogoutCircleFill, path: "/" },
// ];
const LinkItems = [
  { name: 'Home', icon: AiFillHome, path: '/' },
  { name: 'Admin', icon: RiAdminFill, path: '/admin-list' },
  { name: 'Customer', icon: FaUser, path: '/users-list' },
  { name: 'Order', icon: FaBoxes, path: '/orders-list' },
  { name: 'Product', icon: HiFolderAdd, path: '/product-list' },
  { name: 'Category', icon: BiSolidCategory, path: '/categories-list' },
  { name: 'Review', icon: BiSolidCommentDetail, path: '/reviews-list' },
  { name: 'Size', icon: TbRulerMeasure, path: '/size' },
  { name: 'Account', icon: RiAccountPinCircleFill, path: '/admin-profile' },
  { name: 'Offer', icon: BiSolidOffer, path: '/offers' },

  
  // { name: 'Logout', icon: RiLogoutCircleFill, path: '/' }
];
//RiLogoutCircleFill
export default function AdminNavbar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { adminData } = useSelector((store) => store.adminManager);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAdminData());
  // }, [])
  return (
    <Box
      border={"0px solid black"}
      pos={"fixed"}
      top={0}
      right={0}
      left={0}
      zIndex={999}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        border={"0px solid black"}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={"sm"}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} onClose={onClose} name={"admin"} />
      <Box ml={{ base: 0, md: 56 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#f7f8fc", "white")}
      borderRight="0px"
      borderRightColor={useColorModeValue("gray.300", "gray.700")}
      w={{ base: "full", md: 56 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="14" justifyContent="space-between">
        <a href="/">
          <Image
            src={logo}
            alt="eStyleWala"
            display={{ base: "none", md: "flex" }}
          />
        </a>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {/* <NavItem key={"Home"} icon={"AiFillHome"} item={'/'}> */}
      {/* </NavItem> */}
      {/* <NavItem> */}
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} item={link.path}>
          {link}
        </NavItem>
      ))}
      {/* <VStack align={"flex-start"}>
        <Box fontSize={18} py={"8px"} px={"16px"}>
          <NavItem key={LinkItems[0].name} icon={AiFillHome} item={"/"}>
            {{ name: "Home" }}
          </NavItem>
        </Box>
        <Box fontSize={18} py={"8px"} px={"16px"}>
          <NavItem
            key={LinkItems[0].name}
            icon={RiAdminFill}
            item={"/admin-list"}
          >
            {{ name: "Admin" }}
          </NavItem>
        </Box>
        {LinkItems.map((link) => (
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box fontSize={18} as="span" flex="1" textAlign="left">
                    {AiFillHome && (
                      <Icon
                        mr="4"
                        fontSize="20"
                        _groupHover={{
                          color: "white",
                        }}
                        as={link.icon}
                      />
                    )}
                    {link.name}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel bgColor={"white"} pl={10} py={4}>
                {link.items.map((link) => (
                  <NavItem
                    py={3}
                    key={link.name}
                    icon={link.icon}
                    item={link.path}
                  >
                    {link}
                  </NavItem>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </VStack> */}
    </Box>
  );
};

const NavItem = ({ icon, children, item, ...rest }) => {
  return (
    <NavLink to={item} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        _groupActive={{ color: '#990578' }}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#72749B',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children.name}
      </Flex>
    </NavLink>
  );
};
// const NavItem = ({ icon, children, item, ...rest }) => {
//   return (
//     <NavLink
//       to={item}
//       style={{ textDecoration: "none" }}
//       _focus={{ boxShadow: "none" }}
//     >
//       <Flex
//         // bgColor={"white"}
//         // _groupActive={{ color: "#990578" }}
//         align="left"
//         // p="4"
//         // mx="10"
//         // ml="8"
//         // borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         // _hover={{
//         //   bg: "#72749B",
//         //   color: "white",
//         // }}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="20"
//             // _groupHover={{
//             //   color: "white",
//             // }}
//             as={icon}
//           />
//         )}
//         {children.name}
//       </Flex>
//     </NavLink>
//   );
// };
const MobileNav = ({ onOpen, onClose, name, ...rest }) => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((store) => store.AuthReducer);
  const navigate = useNavigate();
  const handleLogOut = () => {
    // localStorage.clear();
    const auth_token = localStorage.getItem("authToken");
    axios.defaults.headers.common["auth_token"] = `${auth_token}`;
    axios
      .get(`${process.env.REACT_APP_BASE_API}/admin/account/logout`)
      .then((response) => {
        // setisAuth(true);
        dispatch(login("logout"));
        localStorage.clear();
        // console.log("hii")
        // console.log(response);
      })
      .catch((error) => {
        // setisAuth(false);
        dispatch(login("logout"));
        localStorage.clear();
        console.error("Error: ", error);
      });
    dispatch(login("logout"));
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Flex
      ml={{ base: 0, md: 56 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#f7f8fc", "white")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.300", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <a href="/">
        <Image
          src={logo}
          alt="eStyleWala"
          width={"100px"}
          display={{ base: "flex", md: "none" }}
        />
      </a>

      <HStack spacing={{ base: 0, md: 3 }} mr={{ base: 3, md: 8 }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<BsFillBellFill />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {/* <Avatar size={"sm"} src={"/AdminProfile"}>
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar> */}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                >
                  {/* <Text
                    fontSize={"sm"}
                    fontWeight={500}
                    fontFamily={"sans-serif"}
                  >
                    {name}
                  </Text>
                  <Text fontSize={"xs"} fontWeight={500} color="gray.600">
                    Admin
                  </Text> */}
                  {/* <VStack spacing={"3px"}>
                    <Menu>
                    <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
                    <VStack
                    _hover={{
                      color: "#ff3e6c",
                    }}
                          spacing={"3px"}
                        >
                          <Icon as={HiOutlineUser} fontSize="xl" />
                          <Text fontWeight={"500"} color={"#282c3f"}>
                            Profile
                          </Text>
                        </VStack>
                      </MenuButton>
                      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                        <MenuItem>
                          <VStack spacing={2} alignItems="flex-start">
                            <Text
                              fontSize={"14px"}
                              color="#333333"
                              fontWeight={"500"}
                            >
                              Welcome
                            </Text>
                            <Text fontSize={"14px"} color="#333333">
                              {isAuth
                                ? "To remove account access"
                                : "To access account and manage orders"}
                            </Text>
                            <Tag
                              _hover={{ fontWeight: "700" }}
                              variant={"outline"}
                              colorScheme="pink"
                              size={"md"}
                              fontSize={"14px"}
                              onClick={() => {
                                isAuth ? handleLogOut() : navigate("/login");
                              }}
                            >
                              {isAuth ? "LOGOUT" : " LOGIN/SIGNUP"}
                            </Tag>
                          </VStack>
                        </MenuItem>
                        <hr />

                        <MenuItem
                          _hover={{ fontWeight: "500" }}
                          fontSize={"13px"}
                          onClick={() => navigate("/profile")}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          _hover={{ fontWeight: "500" }}
                          fontSize={"13px"}
                          onClick={() => navigate("/wishlist")}
                        >
                          Wishlist
                        </MenuItem>
                        <MenuItem
                          _hover={{ fontWeight: "500" }}
                          fontSize={"13px"}
                          onClick={() => navigate("/admin-dashboard")}
                        >
                          Admin
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </VStack> */}
                </VStack>
              </HStack>
            </MenuButton>
          </Menu>
          <Button
            textColor={"white"}
            _hover={{
              bg: '#72749B',
              color: 'white',
            }}
            bgColor={"#ff3e6c"}
            mx={6}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Flex>
      </HStack>
    </Flex>
  );
};
