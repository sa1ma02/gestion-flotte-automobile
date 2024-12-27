import { Grid, Link, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IMAGES from '../../../Images';
const Footer = () => {
  return (
    <Grid className='bg-white text-black mt-10 text-center' container color={'black' } sx={{ bgcolor: 'white', color: 'white', py: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
    <img src={IMAGES.imgTwo} style={{ maxWidth: '50%', height: 'auto' }} /> 
  </Grid>
      <Grid  item xs={14} sm={8} md={6}>
        <Typography className='pb-5' variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
        À PROPOS
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
            Bienvenue sur notre site !
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
        Passionnés par l'optimisation de la gestion des flottes automobiles,
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
        l'objectif est de fournir des solutions innovantes et de haute qualité. 
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
        Notre mission est de proposer des outils efficaces </Typography>
          <Typography variant="body2" component="p" gutterBottom>
          pour améliorer la performance et l'efficacité du parc automobile.</Typography>
      </Grid>
      <Grid  item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
          CONTACT
        </Typography>
        <div>

    <IconButton aria-label="WhatsApp" style={{ color: '#yourColorCode' }} component="a" href="https://wa.me/+212606291542/">
      <WhatsAppIcon />
    </IconButton>
    <IconButton aria-label="Email" color="black" component="a" href="mailto:salmabaalli20@gmail.com">
      <EmailIcon /> </IconButton>
  </div>
      </Grid>
      <Grid className='pt-20' item xs={12} >
        <Typography variant="body2" component="p" align="center">
        2024. Tous droits réservés.
        </Typography>
     
      </Grid>
    </Grid>
  );
};

export default Footer;