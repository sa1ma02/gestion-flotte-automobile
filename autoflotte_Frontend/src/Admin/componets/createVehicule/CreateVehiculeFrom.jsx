import { useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment, IconButton,
  Select,
  MenuItem,
} from "@mui/material";

import { Fragment } from "react";
import "./CreateVehiculeForm.css";
import { useDispatch } from "react-redux";
import { createVehicule } from "../../../Redux/Customers/Vehicule/Action";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; 





const CreateVehiculeForm = () => {
  const [carData, setcarData] = useState({
    imageUrl: "",
    immatricule: "",
    categoryName: "",
    statut: "",
    modele: "",
    annee: 2024,
    kilometrage: "",
    typeCarburant: "",
    puissanceMoteur: "",
    assigne:"",
    consommationCarb: "",
    typeTransmission: "",
    fournisseur: "",
    accidents : "",
    dateAssurance : "",
    dateMaintenance : "",
    document1: null,
    document2: null


  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setcarData((prevState) => {
      let updatedState = { ...prevState, [name]: value };
      if (name === "user") {
        updatedState.user = Number(value); // Convert user ID to number
      }

      return updatedState;
    });
  };




  const handleSubmit = (e) => {
    e.preventDefault(); //stop refreshing the page
    dispatch(createVehicule({ data: carData, jwt }));
    console.log(carData);
  };

  return (
    <Fragment className="createProductContainer">
     
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
         <Typography
  variant="h5"
  sx={{ 
    textAlign: "center",
    fontWeight: "bold", 
    fontFamily: "Sans-serif",
    color: "#09ba3f",
  
  }}
  className="py-10 text-center"
>
  Ajouter un nouveau véhicule
</Typography>
        <Typography variant="h6" sx={{ marginBottom: 2,  fontFamily: "Roboto",}}>
        Informations Générales
      </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} >
         
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={carData.imageUrl}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
       
            <TextField
              fullWidth
              label="Immatricule"
              name="immatricule"
              value={carData.immatricule}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
              <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000000' } } }}>
                <InputLabel sx={{ color: "black" }}>Catégorie de véhicule</InputLabel>
                <Select
                  name="categoryName"
                  value={carData.categoryName}
                  onChange={handleChange}
                  label="Categorie de vehicule"
                  IconComponent={ArrowDropDownIcon}
                  sx={{
                    "& .MuiInputBase-root": { color: "black" },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
                    "& .MuiSelect-icon": { color: "black", fontSize: 24 },
                  }}
                >
                  <MenuItem value="Voiture de personnel">Voiture de personnel</MenuItem>
                  <MenuItem value="Véhicule de service">Véhicule de service</MenuItem>
                  <MenuItem value="Bus de transport">Bus de transport </MenuItem>
                </Select>
              </FormControl>
</Grid>


          <Grid item xs={12} sm={4}>
           
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000000' }}}}>
              <InputLabel sx={{ color: "black" }}>Statut</InputLabel>
              <Select
                name="statut"
                value={carData.statut}
                onChange={handleChange}
                label="Statut"
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    
                  },
                  "& .MuiSelect-icon": { color: "black", fontSize: 24 },
                }}
              >
                <MenuItem value="Actif">Actif</MenuItem>
                <MenuItem value="En maintenance">En maintenance</MenuItem>
                <MenuItem value="Hors service">Hors service</MenuItem>
               
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
           
            <TextField
              fullWidth
              label="Modèle"
              name="modele"
              value={carData.modele}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            
            <TextField
              fullWidth
              label="Année"
              name="annee"
              value={carData.annee}
              onChange={handleChange}
              type="number"
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            /> 
          </Grid>
          </Grid>
          <Typography variant="h6" sx={{ marginBottom: 2 , marginTop: 4}}>
        Informations Techniques
      </Typography>
          <Grid container spacing={1}>

          <Grid item xs={12} sm={4}>
         
            <TextField
              fullWidth
              label="Kilométrage"
              name="kilometrage"
              value={carData.kilometrage}
              onChange={handleChange}
              IconComponent={ArrowDropDownIcon}
              type="number"
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            /> 
           
          </Grid>

          <Grid item xs={6} sm={4}>
            
             <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000000' }}}}>
              <InputLabel sx={{ color: "black" }}>Type Carburant</InputLabel>
              <Select
                name="typeCarburant"
                value={carData.typeCarburant}
                onChange={handleChange}
                label="Type Carburant"
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiSelect-icon": { color: "black", fontSize: 24 },
                }}
              >
                <MenuItem value="Essence">Essence</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
               
               
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
           
             <TextField
              fullWidth
              label="Consommation Carburant"
              name="consommationCarb"
              value={carData.discountPersent}
              onChange={handleChange}
              type="number"
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            /> 
          </Grid>

          <Grid item xs={6} sm={4}>
            
             <TextField
              fullWidth
              label="Puissance Moteur"
              name="puissanceMoteur"
              value={carData.puissanceMoteur}
              onChange={handleChange}
              type="number"
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            /> 
          </Grid>

          <Grid item xs={12} sm={4}>
            
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000000' }}}}>
              <InputLabel sx={{ color: "black" }}>Type Transmission</InputLabel>
              <Select
                name="typeTransmission"
                value={carData.typeTransmission}
                onChange={handleChange}
                label="Type Transmission"
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiSelect-icon": { color: "black", fontSize: 24 },
                }}
              >
                <MenuItem value="Manuel">Manuel</MenuItem>
                <MenuItem value="Automatique">Automatique</MenuItem>
                <MenuItem value="Semi-Automatique">Semi-Automatique</MenuItem>
               
               
              </Select>
            </FormControl>
          </Grid>

         
              <Grid item xs={12} sm={4}>
                
                <TextField
              fullWidth
              label="Fournisseur"
              name="fournisseur"
              value={carData.fournisseur}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />
              </Grid>

              
          <Typography variant="h6" sx={{ marginBottom: 2 , marginTop: 4, marginLeft : 2.5}}>
        Informations sur l'utilisation
      </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} >
        
          <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000000' }}}}>
              <InputLabel sx={{ color: "black" }}>Assigné</InputLabel>
              <Select
                name="assigne"
                value={carData.assigne}
                onChange={handleChange}
                label="Assigné"
                IconComponent={ArrowDropDownIcon}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiSelect-icon": { color: "black", fontSize: 24 },
                }}
              >
                <MenuItem value="OUI">OUI</MenuItem>
                <MenuItem value="NON">NON</MenuItem>

               
               
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
         
          <TextField
              fullWidth
              label="Historique d'accidents"
              name="accidents"
              value={carData.accidents}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />
          </Grid>
          
      {/* <Grid container spacing={2}> */}
      <Grid item xs={12} sm={6}>
      <TextField
              label="Date Assurance"
              type="date"
              value={carData.dateAssurance}
              onChange={(e) => handleChange({ target: { name: 'dateAssurance', value: e.target.value } })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
              label="Date Maintenance"
              type="date"
              value={carData.dateMaintenance}
              onChange={(e) => handleChange({ target: { name: 'dateMaintenance', value: e.target.value } })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />
        </Grid>
        </Grid>
      {/* </Grid> */}
   
         
    
      <Grid container spacing={1}> </Grid>

          <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              variant="contained"
              sx={{
                p: 1.8,
                backgroundColor: "#09ba3f",
                color: "white",
                "&:hover": {
                  backgroundColor: "#cccfcd",
                },
              }}
              className="py-20"
              size="large"
              type="submit"
            >
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default CreateVehiculeForm;
