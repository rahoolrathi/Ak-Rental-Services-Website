import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../UI/Model';
import { useState } from 'react';
import './adminSignin.css'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://pk.linkedin.com/in/kantesh-kumar-3b123b249">
        Ak Rental Sevices
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate=useNavigate();
  const [show,setshow] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const { id, password } = event.currentTarget;
      const signin = await axios.post('http://localhost:3001/SignIn', {
        id: id.value,
        password: password.value
      });
      const Uid=id.value;

      // Check if the response status is OK (200)
      if (signin.status === 200) {
        // Assuming the owner data is available in the response.data.message
        console.log("Owner Data: ", signin.data.message);
        navigate('/AdminDashboard',{state:Uid})
      } else {
        setshow(true);
        console.log("Login unsuccessful");
      }
    } catch (error) {
      setshow(true);
      console.error('Error:', error.message);
    }
  };
const handleclose=()=>
{
  setshow(false);
}


  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', bgcolor: 'grey' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1585503418537-88331351ad99?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'grey' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',

          }}
        />
        <Grid item xs={12}   sx={{

                  bgcolor: '#757575', // Grey color

                }} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
             
            }}
          >
           { show && <Modal Title="Error" message="Invalid Credentails" handleclose={handleclose} />}
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon sx={{ backgroundColor:'black'}}/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: 'black', // Grey color
                  '&:hover': {
                    bgcolor: '#616161', // Darker grey color on hover
                  },
                }}
              >
                Sign In
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    
  );
}
