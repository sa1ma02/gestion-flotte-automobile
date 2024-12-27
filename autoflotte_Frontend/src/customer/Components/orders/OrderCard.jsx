import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// Format date helper function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust format as needed
};

// Get color for status based on the order status
const getStatusColor = (status) => {
  switch (status) {
    case "APPROUVEE":
      return "text-green-600";
    case "REJETEE":
      return "text-red-600";
    case "ENATTENTE":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  return (
    <Box
      className="p-5 shadow-lg hover:shadow-2xl border rounded-lg bg-white"
      sx={{
        width: "100%",
        maxWidth: "650px",
        margin: "8rem auto",
        marginLeft: "22rem",
        textAlign: "center",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
        },
        borderRadius: "10px",
        padding: "1.5rem",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Vehicle Image and Details */}
        <Grid item xs={6}>
          <div className="flex items-center cursor-pointer" onClick={() => navigate(`/account/order/${order?.id}`)}>
            <img
              className="w-[5rem] h-[5rem] object-cover object-top rounded-lg shadow-md"
              src={order?.vehicule.imageUrl}
              alt={order?.vehicule.immatricule}
            />
            <div className="ml-5 text-left">
              <Typography variant="h6" className="font-semibold">
                {order?.vehicule.immatricule}
              </Typography>
              <Typography className="opacity-70 text-sm">
                Modèle: {item?.modele}
              </Typography>
            </div>
          </div>
        </Grid>

        {/* Date and Status Info */}
        <Grid item xs={6} className="text-left">
          <Typography className="font-medium text-sm mb-2">
            <span>Date de Début: {formatDate(order?.startDate)}</span>
            <br />
            <span>Date de Fin: {formatDate(order?.endDate)}</span>
          </Typography>
          <Typography
            className={`font-semibold ${getStatusColor(order?.orderStatus)} mt-2`}
          >
            STATUT: {order?.orderStatus}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
