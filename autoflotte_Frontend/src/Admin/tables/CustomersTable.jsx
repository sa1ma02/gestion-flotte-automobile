// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Avatar, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Token from local storage or any other source
  const token = localStorage.getItem("jwt"); // Update with your token retrieval method

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/users/all', {
          headers: {
            'Authorization': `Bearer ${token}` // Pass JWT in Authorization header
          }
        });
        console.log('Fetched customers:', response.data); // Debugging line
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error); // Debugging line
        setError('Failed to load customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card>
      <CardHeader
        title='New Customers'
        sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography onClick={() => navigate("/admin/customers")} variant='caption' sx={{ color: "blue", cursor: "pointer", paddingRight: ".8rem" }}>Voir tout</Typography>}
        titleTypographyProps={{
          variant: 'h5',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              {/* <TableCell>Image</TableCell> */}
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(0, 5).map(customer => (
              <TableRow hover key={customer.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                {/* <TableCell> <Avatar alt={customer.name} src={customer.image} /> </TableCell> */}
                <TableCell>{customer.firstName} {customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CustomersTable;
