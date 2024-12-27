import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findVehiculeById, orderVehicule } from "../../../../Redux/Customers/Vehicule/Action";
import { Box, Typography, Grid, Card, CardContent, CardHeader, Icon, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function VehiculeDetails() {
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehiculeId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const { vehicule } = useSelector((store) => store.customersVehicule);

  useEffect(() => {
    const data = { vehiculeId: Number(vehiculeId), jwt };
    dispatch(findVehiculeById(data));
  }, [dispatch, vehiculeId, jwt]);

  const handleOrderVehicule = () => {
    navigate(`/order/create/${vehiculeId}`);
  };

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
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                href={vehicule?.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || vehicule?.imageUrl}
                alt={vehicule?.immatricule}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <InfoCard title="Informations Générales" icon={InfoIcon}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Immatricule:</strong> {vehicule?.immatricule}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Catégorie:</strong> {vehicule?.categorie.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Statut:</strong> {vehicule?.statut}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Modèle:</strong> {vehicule?.modele}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Année:</strong> {vehicule?.annee}
                  </Typography>
                </Grid>
              </Grid>
            </InfoCard>

            <InfoCard title="Informations Techniques" icon={BuildIcon}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Kilométrage:</strong> {vehicule?.kilometrage} km
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Type Carburant:</strong> {vehicule?.typeCarburant}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Consommation Carburant:</strong>{" "}
                    {vehicule?.consommationCarb} L/100km
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Puissance Moteur:</strong>{" "}
                    {vehicule?.puissanceMoteur} ch
                  </Typography>
                </Grid>
              </Grid>
            </InfoCard>

            <InfoCard title="Informations de Maintenance" icon={VerifiedUserIcon}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Date d'Assurance:</strong> {vehicule?.dateAssurance}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Date de Maintenance:</strong>{" "}
                    {vehicule?.dateMaintenance}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Accidents:</strong> {vehicule?.accidents}
                  </Typography>
                </Grid>
              </Grid>
            </InfoCard>

            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderVehicule}
              sx={{ marginTop: 2 }}
            >
              Réserver ce véhicule
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
