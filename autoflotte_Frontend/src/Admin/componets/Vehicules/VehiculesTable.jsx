import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVehicule, findVehicules, findAllVehicules } from "../../../Redux/Customers/Vehicule/Action";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; 
const VehiculesTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersVehicule } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    statut: "",
    categoryName: "",
    
  });

  const searchParams = new URLSearchParams(location.search);
  const statut = searchParams.get("statut");
  const categoryName = searchParams.get("categoryName");
  const page = searchParams.get("page");


  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value-1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    if (!statut && !categoryName) {
      dispatch(findAllVehicules());
      console.log("Fetching all vehicles");
    } else {
      const data = {
        categoryName: categoryName || "",
        pageNumber: page || 0,
        pageSize: 10,
        statut: statut || "",
      };
      dispatch(findVehicules(data));
    }
  }, [statut, categoryName, page, customersVehicule.deleteVehicule]);

  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteVehicule = (vehiculeId) => {
    console.log("delete vehicule ", vehiculeId);
    dispatch(deleteVehicule(vehiculeId)).then(() => {
      // After the delete action completes, refetch the vehicles
      dispatch(findVehicules({
        categoryName: filterValue.categoryName || "",
        pageNumber: page || 0,
        pageSize: 10,
        statut: filterValue.statut || "",
      }));
    });
  };

  return (
    <Box width={"100%"}>
      <Card className="p-2">
        <CardHeader
          title="Filtrage"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: 'black' }}>Catégorie</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.categoryName}
                label="Categorie"
                onChange={(e) => handleFilterChange(e, "categoryName")}
                IconComponent={ArrowDropDownIcon}
                sx={{"& .MuiSelect-icon": { color: "black", fontSize: 24 },
              "& .MuiSelect-select": {
                    border: '1px solid black', // Black outline for select input
                    borderRadius: '4px',
                    padding: '12px', // Optional: Adjust padding
                  },}}
              >
                <MenuItem value="Voiture de personnel" > Voiture de personnel</MenuItem>
                <MenuItem value="Bus de transport">Bus de transport </MenuItem>
                <MenuItem value="Véhicule de service">Véhicule de service </MenuItem>
              
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: 'black' }}>
                Statut
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.statut}
                label="Statut"
                onChange={(e) => handleFilterChange(e, "statut")}
                IconComponent={ArrowDropDownIcon}
                sx={{"& .MuiSelect-icon": { color: "black", fontSize: 24 },
                  "& .MuiSelect-select": {
                    border: '1px solid black', // Black outline for select input
                    borderRadius: '4px',
                    padding: '12px', // Optional: Adjust padding
                  },}}
              >
                <MenuItem value={"Actif"}>Actif</MenuItem>
                <MenuItem value={"En maintenance"}>En maintenance</MenuItem>
                <MenuItem value={"Hors service"}>Hors service</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="Tous les véhicules"
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
                <TableCell>Immatricule</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Catégorie</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersVehicule?.vehicules?.map((item) => (
                
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  
                  <TableCell>
                    {" "}
                    <Avatar alt={item.immatricule} src={item.imageUrl} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
               
                    {item.immatricule}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.categorie.name}</TableCell>
       
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={()=>navigate(`/admin/vehicule/update/${item.id}`)} variant="text" 
                    sx={{
                          color: "black !important",
                          fontWeight: "bold",
                          textAlign: "center",
                          backgroundColor: 'rgb(217, 217, 217)'
                        }}>Update</Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" onClick={()=>handleDeleteVehicule(item.id) }
                   sx={{
                    color: "black !important",
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: 'rgb(217, 217, 217)'
                  }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
      

        <div className="mx-auto px-4 py-2 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={customersVehicule.vehicules?.totalPages}
            sx={{
              backgroundColor: 'white', // Set background color to light gray
              borderRadius: '8px', // Optional: Add border radius for a rounded look
              padding: '10px', // Optional: Add padding inside the pagination
              '& .MuiPaginationItem-root': {
                color: 'black', // Set text color to green
              },
              '& .Mui-selected': {
                backgroundColor: '#09ba3f', // Set selected item's background color to green
                color: "black" 
              },
            }}
            className=""
            onChange={handlePaginationChange}
          
          />
        </div>
      </Card>
    </Box>
  );
};

export default VehiculesTable;