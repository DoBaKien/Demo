import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Button, TextField, Box } from '@mui/material';
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import swal from 'sweetalert';
import axios from 'axios'

var regUserName = /^[a-zA-Z0-9]{6,16}$/
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
function Login() {
    const [userName, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(userName===""&& password ===""){
            setUserNameError(true)
            setPasswordError(true)
            swal("Error!", "Please enter your account!", "error");
        }
        else if (userName === "") {
            setUserNameError(true)
            swal("Error!", "Please enter a your username!", "error");
        } else if (password === "") {
            setPasswordError(true)
            swal("Error!", "Please enter a your password!", "error");
        } else {
            axios.post('login', {
                "username": userName,
                "password": password
            }).then(
                res => {
                    console.log(res);
                    swal("Welcome!", `Hi ${userName}`, "success");
                }
            ).catch(
                err => {
                    console.log(err);
                    swal("Error!", "Wrong username or password!", "error");
                }
            )
        }
    }

    const handleChangleUserName =(e)=>{
        if(regUserName.test(e)){
            setUserName(e)
            setUserNameError(false)
        }else{
            setUserName("")
            setUserNameError(true)
        }
    }

    const handleChanglePassword =(e)=>{
        if(regpass.test(e)){
            setPassword(e)
            setPasswordError(false) 
        }else{
            setPassword("")
            setPasswordError(true)
        }
    }

    return (
        <Container>
            <Typography variant='h3' align='center' gutterBottom>
                Login
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Box pb={2}>
                    <TextField label='User Name' variant='standard' fullWidth
                        onChange={(e) => handleChangleUserName(e.target.value)} 
                        error={userNameError}/>

                    <TextField
                        label="Password"
                        type={showPass ? "text" : "password"}
                        fullWidth
                        error={passwordError}
                        variant='standard'
                        onChange={(e) => handleChanglePassword(e.target.value)}
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

        </Container>
    );
}

export default Login;