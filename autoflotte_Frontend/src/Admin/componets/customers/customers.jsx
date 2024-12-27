// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Avatar, CardHeader, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import  {deleteUser} from "../../../Redux/Admin/Customers/Action";
import { useDispatch, useSelector } from "react-redux";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ status: "", sort: "" });

  // Token from local storage 
  const token = localStorage.getItem("jwt"); 

  // Fetch data when component mounts
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5454/api/users/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched customers:', response.data);
        
        // Ensure customers is always an array
        if (typeof response.data === 'object' && response.data !== null && response.data.users) {
          // If response.data contains a users property that is an array
          setCustomers(response.data.users);
        } else if (Array.isArray(response.data)) {
          // If response.data itself is an array
          setCustomers(response.data);
        } else {
          // Default to an empty array if the structure is not as expected
          setCustomers([]);
        }
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
          setError(`Failed to load customers: ${error.response.data.message || 'Unknown server error'}`);
        } else if (error.request) {
          console.error('Error request:', error.request);
          setError('Failed to load customers: No response from server.');
        } else {
          console.error('Error message:', error.message);
          setError(`Failed to load customers: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCustomers();
    }, [token]);


  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };
  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId));
      fetchCustomers(); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box width={'100%'}   >
    <Card className="p-3">
      <CardHeader
        title='Liste des utilisateurs'
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
      />
      <TableContainer >
        <Table sx={{ minWidth: 1100}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {customers.length > 0 &&
          customers.map((customer, index) => (
            index < 5 && ( // Display only the first 5 customers
              <TableRow hover key={customer.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.firstName} {customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <Button
                      onClick={() => handleDeleteUser(customer.id)}
                      variant="text"
                      sx={{
                        color: "black !important",
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: 'rgb(217, 217, 217)'
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
        </TableRow>
      )
    ))
  }
</TableBody>

        </Table>
      </TableContainer>
    </Card>

    <Card className="mt-2 felx justify-center items-center">
      <div className="mx-auto px-4 py-2 flex justify-center shadow-lg rounded-md">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={1}
          sx={{
            backgroundColor: 'white', // Set background color to light gray
            borderRadius: '8px', // Optional: Add border radius for a rounded look
            padding: '10px', // Optional: Add padding inside the pagination
            '& .MuiPaginationItem-root': {
              color: 'black', // Set text color to green
            },
            '& .Mui-selected': {
              backgroundColor: '#09ba3f', // Set selected item's background color to green
               color: "black"// Set selected item's text color to white
            },
          }}
          onChange={handlePaginationChange}
        />
        </div>
      </Card>
    </Box>
  );
};

export default Customers;
