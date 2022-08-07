import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import { Menu } from 'antd';
import { Box, Grid } from '@mui/material';
import Home from "./Home"
import Create from './Create';
import Table from './Table';
import { styled } from '@mui/system'
import { UserProvider} from './UserContext'
import AddMember from './AddMember';
import Login from './Login';

function App() {
  const MyDiv= styled('div')({
    backgroundColor: '#01a9fe',
    border: "1px",
    padding: 10,
    height:"50px",
})

  const menuItems = [
    {
      key: 'home',
      label: (
        <Link to="/">Home</Link>
      ),
    },
    {
      key: 'table',
      label: (<Link to="/table">Table</Link>),
    },
    {
      label: (<Link to="/add">Add Member</Link>),
      key: 'add',
    },
    {
      label: (<Link to="/register">Register</Link>),
      key: 'register',
    },
    {
      label: (<Link to="/login">Login</Link>),
      key: 'login',
    },
  ];


  return (
    <UserProvider>
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MyDiv>header</MyDiv>
            </Grid>
            <Grid item xs={2}>
              <Menu items={menuItems} />
            </Grid>
            <Grid item xs={10}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/table" element={<Table />} />
                <Route path="/register" element={<Create />} />
                <Route path="/add" element={<AddMember />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Grid>
            <Grid item xs={12}>
              <MyDiv>
                Footer
              </MyDiv>
            </Grid>
          </Grid>
        </Box>
      </div >
    </UserProvider>
  );
}

export default App;
