import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Grid, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import EventNoteIcon from "@mui/icons-material/EventNote";

const OrderCreation = () => {
  const { vehiculeId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateOrder = () => {
    const orderData = {
      vehiculeId: Number(vehiculeId),
      startDate,
      endDate,
      jwt: localStorage.getItem("jwt"),
    };

    dispatch(createOrder(orderData))
    .then((orderId) => {
      console.log("Received orderId:", orderId);
      if (orderId) {
        navigate(`/order/${orderId}`);
      } else {
        console.error("Order ID is undefined");
      }
    })
    .catch((error) => {
      console.error("Failed to create order:", error);
    });
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "2.3rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "500px", // Ajustez la hauteur fixe
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Centre le contenu horizontalement
      }}
    >
      <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} textAlign="center">
          <EventNoteIcon sx={{ fontSize: "3rem", color: "#09ba3f" }} /> 
        </Grid>
        <Grid item xs={10}> 
          <TextField
            label="Date de début"
            type="date"
            size="small"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ height: "3rem" }} // Ajuste la hauteur du champ de saisie
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Date de fin"
            type="date"
            size="small"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ height: "3rem" }} // Ajuste la hauteur du champ de saisie
          />
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrder}
            sx={{
              mt: 2,
              borderRadius: "20px",
              textTransform: "none",
              height: "2.5rem", // Ajuste la hauteur du bouton
              fontSize: "1rem", // Ajuste la taille du texte du bouton
              width: "100%", // Assure que le bouton est aussi large que le champ de saisie
            }}
          >
            Valider la réservation
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCreation;
