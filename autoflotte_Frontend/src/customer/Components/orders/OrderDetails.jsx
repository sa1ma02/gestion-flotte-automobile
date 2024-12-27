import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import { findVehiculeById } from "../../../Redux/Customers/Vehicule/Action";
import { Box, Typography, Grid, Card, CardContent, CardHeader, Icon, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function OrderDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const { order } = useSelector((store) => store.order);
  const { vehicule } = useSelector((store) => store.customersVehicule);

  useEffect(() => {
    if (orderId && jwt) {
      dispatch(getOrderById(orderId, jwt));
    }
  }, [dispatch, orderId, jwt]);

  useEffect(() => {
    if (order && order.vehicule && order.vehicule.id) {
      const vehiculeId = Number(order.vehicule.id);
      if (!isNaN(vehiculeId)) {
        const data = { vehiculeId, jwt };
        dispatch(findVehiculeById(data));
      } else {
        console.error("Invalid vehicle ID:", order.vehicule.id);
      }
    }
  }, [order, dispatch, jwt]);

  const InfoCard = ({ title, icon, children }) => (
    <Card sx={{ marginBottom: 4 }}>
      <CardHeader
        avatar={<Icon component={icon} />}
        title={<Typography variant="h6">{title}</Typography>}
        sx={{ backgroundColor: "#e0e0e0" }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <section className="flex flex-col items-center justify-center px-4 pt-10">
          {/* Title */}
          <Typography variant="h5" className="text-gray-700 font-bold mb-4">
            Détails de la réservation
          </Typography>
          
          <div className="max-w-2xl pb-16 lg:pb-24">
            {/* Order Information */}
            <InfoCard title="Information de la demande" icon={InfoIcon}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>ID de la réservation:</strong> {order?.id || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Status:</strong> {order?.orderStatus || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Date de début:</strong> {order?.startDate || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Date de fin:</strong> {order?.endDate || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </InfoCard>

            {/* Vehicle Details */}
            <InfoCard title="Information du véhicule" icon={CalendarTodayIcon}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>ID de véhicule:</strong> {vehicule?.id || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Immatriculation:</strong> {vehicule?.immatricule || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Catégorie:</strong> {vehicule?.categorie?.name || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Status:</strong> {vehicule?.statut || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Modèle:</strong> {vehicule?.modele || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </InfoCard>

            {/* Retour Button */}
            <div className="flex justify-start mb-4 px-4">
              <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
                Retour
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
