import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import { styled } from "@mui/system";

const orderStatus = [
  { label: "Approuvée", value: "APPROUVEE" },
  { label: "Rejetée", value: "REJETEE" },
  { label: "En attente", value: "EN ATTENTE" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust format as needed
};

const getStatusLabel = (status) => {
  const statusItem = orderStatus.find((s) => s.value === status);
  return statusItem ? statusItem.label : status;
};

// Function to get the color based on status
const getStatusColor = (status) => {
  switch (status) {
    case "APPROUVEE":
      return "green"; // Green for approved
    case "REJETEE":
      return "red";   // Red for rejected
    case "ENATTENTE":
      return "blue";  // Blue for pending
    default:
      return "gray";  // Default color
  }
};

// Custom TableCell with padding and font adjustments
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  color: "#4a5568",
  padding: "10px",
}));

// Custom TableRow with hover effects
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    cursor: "pointer",
  },
}));

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [dispatch, jwt]);

  return (
    <Box className="px-8 py-9 ">
      <Grid container spacing={0} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          {order.orders?.length > 0 ? (
            <TableContainer component={Paper} sx={{
              width: "80%",             // Adjust the width as needed
              marginTop: "5rem",         // Set top margin to push the table down
              marginLeft: "10rem",        // Set left margin to push the table to the right
              marginRight: "auto",       // Ensures the table is centered horizontally
              marginBottom: "13rem",      // Optional: Adds bottom spacing
              position: "relative",      // Ensures that margin properties work
              overflowX: "auto",         // Allows horizontal scrolling for small screens
            }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#E9F8EE" }}>
                  <TableRow>
                    <StyledTableCell sx={{ color: "white" }}>Immatricule</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Modèle</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Date de Début</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Date de Fin</StyledTableCell>
                    <StyledTableCell sx={{ color: "white" }}>Statut</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orders.map((orderItem) => (
                    <StyledTableRow key={orderItem.id}>
                      <TableCell>{orderItem.vehicule.immatricule}</TableCell>
                      <TableCell>{orderItem.vehicule.modele}</TableCell>
                      <TableCell>{formatDate(orderItem.startDate)}</TableCell>
                      <TableCell>{formatDate(orderItem.endDate)}</TableCell>
                      {/* Status with dynamic color */}
                      <TableCell sx={{ color: getStatusColor(orderItem.orderStatus) }}>
                        {getStatusLabel(orderItem.orderStatus)}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>Aucune réservation disponible.</p>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
