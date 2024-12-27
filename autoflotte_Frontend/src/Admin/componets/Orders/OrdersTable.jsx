import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  rejectOrder,
  getOrders,
} from "../../../Redux/Admin/Orders/Action";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt,adminsOrder.confirmed]);


  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };
  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED")
  };

  

  const handleRejectedOrder = (orderId,index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(rejectOrder(orderId))
    setOrderStatus("REJECTED")
  };

  const handleDeleteOrder = (orderId) => {
    handleUpdateStatusMenuClose();
    dispatch(deleteOrder(orderId));
  };



  return (
    <Box>
    
      <Card className="mt-2">
        <CardHeader
          title="Toutes les demandes"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
         
         
        />
        <TableContainer>
          <Table sx={{ minWidth: 1100}} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
               
                <TableCell>User Id</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Statut</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminsOrder?.orders?.map((item, index) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell sx={{}}>      
             <Avatar  alt={item.vehicule.immatricule} src={item.vehicule.imageUrl} />
                    {" "}
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="text-white">
                  <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color:
                    item.orderStatus === "ENATTENTE"
                      ? "#0288d1" // Couleur info (bleu) pour ENATTENTE
                      : item.orderStatus === "APPROUVEE"
                      ? "#4caf50" // Couleur success (vert) pour APPROUVEE
                      : item.orderStatus === "REJETEE"
                      ? "#f44336" // Couleur rouge pour REJETEE
                      : "#9e9e9e", // Couleur secondaire (gris) pour les autres cas
                    borderRadius: "4px", // Optional: add some border radius to mimic Chip style
                   
                  }}
                  variant="body2" // Adjust the variant as needed (e.g., body1, subtitle1)
                >
                  {item.orderStatus}
                </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center"  }}
                    className="text-white"
                  >
                    
                    <div>
                      <Button
                        id={`basic-button-${item.id}`}
                        aria-controls={`basic-menu-${item.id}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElArray[index])}
                        onClick={(event) =>
                          handleUpdateStatusMenuClick(event, index)

                        }
                        sx={{
                          color: "black !important",
                          fontWeight: "bold",
                          textAlign: "center",
                          backgroundColor: 'rgb(217, 217, 217)'
                        }}
                        
                      >
                        Status
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item.id}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleConfirmedOrder(item.id, index)}
                          disabled={ item.orderStatus==="APPROUVEE"}
                        >
                          Approuvée
                          
                        </MenuItem>
                     
                        <MenuItem onClick={() => handleRejectedOrder(item.id)}>
                          Rejetée
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <Button
                      onClick={() => handleDeleteOrder(item.id)}
                      variant="text"
                      sx={{
                        color: "black !important",
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: 'rgb(217, 217, 217)'
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 felx justify-center items-center">
      <div className="mx-auto px-4 py-2 flex justify-center shadow-lg rounded-md">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={1}
          sx={{
            backgroundColor: 'white', // Set background color to light gray
            borderRadius: '8px', // Optional: Add border radius for a rounded look
            padding: '10px', // Optional: Add padding inside the pagination
            '& .MuiPaginationItem-root': {
              color: 'black', // Set text color to green
            },
            '& .Mui-selected': {
              backgroundColor: '#09ba3f', // Set selected item's background color to green
               color: "black"// Set selected item's text color to white
            },
          }}
          onChange={handlePaginationChange}
        />
        </div>
      </Card>
    </Box>
  );
};

export default OrdersTable;
