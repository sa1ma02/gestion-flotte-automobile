import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { findAllVehicules } from '../../../Redux/Customers/Vehicule/Action'; // Assurez-vous que le chemin est correct

const colorMap = {
  "Actif": "#2ecc71",
  "Hors service": "#e74c3c",
  "En maintenance": "#f39c12",
  // Ajoutez d'autres couleurs pour les statuts ici si nécessaire
};

const cardStyle = {
  height: 400, // Height of the card
  width: '100%', // Full width of the container
};

const valueStyle = {
  fontSize: '2rem', // Increase font size for values
  fontWeight: 'bold', // Make values bold
  marginLeft: '8rem', // Adjust margin between value and label
  marginRight: '13rem', // Adjust margin between value and card edge
};

const labelStyle = {
  fontSize: '1.2rem', // Size for labels
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center', // Align items vertically in the center
  marginBottom: '0.7rem', // Space between each row
  justifyContent: 'space-between', // Adjust space between value and label
};

const valueWithBgStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#fff', // Couleur du texte
  backgroundColor: '#2ecc71', // Couleur de fond
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  marginLeft: '1rem',
  display: 'inline-block',
};
const bgColorMap = {
  'Disponible': '#d4efdf',  // Exemple de couleur d'arrière-plan pour "Disponible"
  'En maintenance': '#f5b7b1',  // Exemple de couleur d'arrière-plan pour "En maintenance"
  'Hors service': '#f9e79f',  // Exemple de couleur d'arrière-plan pour "Hors service"
  // Ajoutez d'autres statuts selon vos besoins
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { customersVehicule } = useSelector((store) => store);

  const [dataByCategory, setDataByCategory] = useState([]);
  const [dataByStatus, setDataByStatus] = useState([]);
  const [dataByKilometrage, setDataByKilometrage] = useState([]);
  const [dataByConsommation, setDataByConsommation] = useState([]);
  const [dataByMaintenance, setDataByMaintenance] = useState([]);
  const [dataByAssurance, setDataByAssurance] = useState([]);

  const [statusCounts, setStatusCounts] = useState({});
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [assignedCounts, setAssignedCounts] = useState({ OUI: 0, NON: 0 });

  useEffect(() => {
    // Fetch all vehicles when the component mounts
    dispatch(findAllVehicules());
  }, [dispatch]);

  useEffect(() => {
    if (customersVehicule?.vehicules) {
      const vehicules = customersVehicule.vehicules;

      // Calculer le nombre total de véhicules
      const total = vehicules.length;
      setTotalVehicles(total);

      // Calculer le nombre de véhicules par statut
      const statusData = vehicules.reduce((acc, vehicule) => {
        const status = vehicule.statut;
        if (!acc[status]) acc[status] = 0;
        acc[status]++;
        return acc;
      }, {});
      setStatusCounts(statusData);

      // Regrouper les données par catégorie
      const categoryData = vehicules.reduce((acc, vehicule) => {
        const category = vehicule.categorie.name;
        if (!acc[category]) acc[category] = 0;
        acc[category]++;
        return acc;
      }, {});

      setDataByCategory(Object.keys(categoryData).map(key => ({ name: key, value: categoryData[key] })));

      // Regrouper les données par statut
      setDataByStatus(Object.keys(statusData).map(key => ({ name: key, value: statusData[key] })));

      // Trier par kilométrage
      const kilometrageData = vehicules
        .map(vehicule => ({ name: vehicule.immatricule, value: vehicule.kilometrage }))
        .sort((a, b) => b.value - a.value);
      setDataByKilometrage(kilometrageData);

      // Trier par consommation de carburant
      const consommationData = vehicules
        .map(vehicule => ({ name: vehicule.immatricule, value: vehicule.consommationCarb }))
        .sort((a, b) => b.value - a.value);
      setDataByConsommation(consommationData);

      // Préparer les données pour le scatter plot de maintenance
      const maintenanceData = vehicules
        .map(vehicule => ({
          immatricule: vehicule.immatricule,
          date: new Date(vehicule.dateMaintenance).getTime(), // Convertir en timestamp pour l'axe Y
        }))
        .sort((a, b) => a.date - b.date);
      setDataByMaintenance(maintenanceData);

      const counts = vehicules.reduce(
        (acc, vehicule) => {
          const assigned = vehicule.assigne;
          if (assigned === 'OUI') acc.OUI++;
          if (assigned === 'NON') acc.NON++;
          return acc;
        },
        { OUI: 0, NON: 0 }
      );
      setAssignedCounts(counts);
      // Préparer les données pour le scatter plot d'assurance
      const assuranceData = vehicules
        .map(vehicule => ({
          immatricule: vehicule.immatricule,
          date: new Date(vehicule.dateAssurance).getTime(), // Convertir en timestamp pour l'axe Y
        }))
        .sort((a, b) => a.date - b.date);
      setDataByAssurance(assuranceData);
    }
  }, [customersVehicule]);

  // Fonction pour formater les dates en chaînes lisibles
  const dateFormatter = (tick) => {
    return new Date(tick).toLocaleDateString(); // Convertir le timestamp en date lisible
  };

  return (
    <Box width="100%">
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
  <Card style={cardStyle}>
    <CardHeader title="Statistiques des véhicules"  titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}/>
    <Box p={2}>
      <Typography variant="h6" style={containerStyle}>
        Total des véhicules:
        <Box
          component="span"
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#3498db',
            backgroundColor: '#d6eaf8',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            marginLeft: '1rem',
          }}
        >
          {totalVehicles}
        </Box>
      </Typography>
      {Object.keys(statusCounts).map((status) => (
        <Typography key={status} variant="h6" style={{ ...containerStyle, marginTop: '1rem' }}>
          {status}:
          <Box
            component="span"
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: colorMap[status] || '#000',
              backgroundColor: bgColorMap[status] || '#f0f0f0',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              marginLeft: '1rem',
            }}
          >
            {statusCounts[status]}
          </Box>
        </Typography>
      ))}
    </Box>
  </Card>
</Grid>


        <Grid item xs={6} md={4}>
          <Card style={cardStyle}>
            <CardHeader title="Nombre de véhicules par catégorie" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
            <BarChart width={400} height={300} data={dataByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12}}
                // textAnchor="end"
                interval={0} // Pour afficher toutes les étiquettes
                tickLine={false}
      />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="value" fill="#3498db" /> 
            </BarChart>
          </Card>
        </Grid>

        <Grid item xs={6} md={4}>
          <Card style={cardStyle}>
            <CardHeader title="Nombre de véhicules par statut"  titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}/>
            <PieChart width={500} height={300}>
              <Pie
                data={dataByStatus}
                cx={250}
                cy={150}
                outerRadius={100}
                fill="#e74c3c" 
                dataKey="value"
                label
                tickLine={false}
              >
                {dataByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#9b59b6" : "#2ecc71"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card style={cardStyle}>
            <CardHeader title="Véhicules par ordre de kilométrage" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
            <BarChart width={500} height={300} data={dataByKilometrage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name"  tickLine={false}/>
              <YAxis />
              <Tooltip />
      
              <Bar dataKey="value" fill="#f39c12" /> 
            </BarChart>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card style={cardStyle}>
            <CardHeader title="Véhicules par consommation de carburant" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}/>
            <BarChart width={500} height={300} data={dataByConsommation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="value" fill="#1abc9c" />
            </BarChart>
          </Card>
        </Grid>

        <Grid item xs={6} md={4}>
          <Card >
            <CardHeader title="Prochaines dates de maintenance " titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
            <ScatterChart width={430} height={330} margin={{ top: 10, right: 4, left:17, bottom : 8}}>
              <CartesianGrid />
              <XAxis 
                type="category" 
                dataKey="immatricule" 
                name="Immatricule" 
                interval={0}
                tick={{ fontSize: 10}}
              />
              <YAxis
                type="number"
                dataKey="date"
                name="Date de maintenance"
                tickFormatter={dateFormatter}
                domain={['auto', 'auto']}
                tick={{ angle: -45, textAnchor: 'end' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={dateFormatter} />
              <Legend />
              <Scatter name="Date de Maintenance" data={dataByMaintenance} fill="#82ca9d" />
            </ScatterChart>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
  <Card style={cardStyle}>
    <CardHeader title="Statistiques des véhicules assignés" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }} />
    <Box p={2}>
      <Typography variant="h6" style={containerStyle}>
        Véhicules assignés:
        <Box
          component="span"
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#2ecc71',
            backgroundColor: '#d4efdf', // Background color for the assigned count
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            marginLeft: '1rem',
          }}
        >
          {assignedCounts.OUI}
        </Box>
      </Typography>
      <Typography variant="h6" style={{ ...containerStyle, marginTop: '1rem' }}>
        Véhicules non assignés:
        <Box
          component="span"
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#e74c3c',
            backgroundColor: '#f5b7b1', // Background color for the unassigned count
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            marginLeft: '1rem',
          }}
        >
          {assignedCounts.NON}
        </Box>
      </Typography>
    </Box>
  </Card>
</Grid>

        <Grid item xs={6} md={4}>
          <Card>
            <CardHeader title="Prochaines dates d'assurance" titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}/>
            <ScatterChart width={430} height={330} margin={{ top: 10, right: 4, left:17, bottom : 8}}>
              <CartesianGrid />
              <XAxis 
                type="category" 
                dataKey="immatricule" 
                name="Immatricule" 
                interval={0}
                tick={{ fontSize: 10}}
              />
              <YAxis
                type="number"
                dataKey="date"
                name="Date d'assurance"
                tickFormatter={dateFormatter}
                domain={['auto', 'auto']}
                tick={{ angle: -45, textAnchor: 'end' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={dateFormatter} />
              <Legend />
              <Scatter name="Date d'Assurance" data={dataByAssurance} fill="#8884d8" />
            </ScatterChart>
          </Card>
        </Grid>
        

      </Grid>
    </Box>
  );
};

export default Dashboard;
