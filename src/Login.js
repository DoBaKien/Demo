import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Button, TextField, Box, Snackbar} from '@mui/material';
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import axios from 'axios'

function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('login', {
            "username": userName,
            "password": password
        }).then(
            res => {
                console.log(res);
                setOpen(true)
            }
        ).catch(
            err => {
                console.log(err);
                setOpenError(true)
            }
        )
    }
    const handleClose = () => {
        setOpen(false);
        setOpenError(false)
    };

    return (  
        <Container>
            <Typography variant='h3' align='center' gutterBottom>
                Login
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Box pb={2}>
                    <TextField label='User Name' variant='standard' fullWidth
                        onChange={(e) => setUserName(e.target.value)} />
                  
                        <TextField
                            label="Password"
                            type={showPass ? "text" : "password"}
                            fullWidth
                            variant='standard'
                            onChange={(e)=> setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPass(!showPass)}>
                                            {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                </Box>
                <Button type='submit' variant='contained' startIcon={<SendIcon />}>Submit</Button>
            </form >

            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    Success!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    Wrong user name or password
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Login;