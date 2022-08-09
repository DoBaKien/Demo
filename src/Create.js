import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import { Button, TextField, Box, RadioGroup, FormControlLabel, Radio, FormHelperText, Tooltip } from '@mui/material';
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import swal from 'sweetalert';
import axios from 'axios'

var zxcvbn = require("zxcvbn")
var regemail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
var regUserName = /^[a-zA-Z0-9]{6,16}$/

function Create() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('male')
    const [nameError, setNameError] = useState(false)
    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [showPass, setShowPass] = useState(false);

    const [score, setScore] = useState("null");
    const [scoreText, setScoreText] = useState("");
    // const { createUser } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name === "" && userName === "" && email === "" & password === "") {
            setNameError(true)
            setEmailError(true)
            setPassError(true)
            setUserNameError(true)
            swal("Error!", "Please enter all value", "error");
        }
        else if (name === "") {
            swal("Error!", "Please enter a your name", "error");
            setNameError(true)
        } 
        else if (userName === "") {
            swal("Error!", "Please enter a valid username", "error");
            setUserNameError(true)
        }
        else if (email === "") {
            setEmailError(true)
            swal("Error!", "Please enter a valid email!", "error");
        }
        else if (password === '') {
            setPassError(true)
            swal("Error!", "Please enter a valid password!", "error");
        } 
        else {
            axios.post('register', {
                "name": name,
                "email": email,
                "username": userName,
                "password": password
            }).then(
                res => {
                    console.log(res);
                    swal("Success!", "You have successfully registered!", "success");
                }
            ).catch(
                err => {
                    console.log(err);
                    swal("Error!", "Server error", "error");
                }
            )
        }
    }

    const handleChangleName = (e) => {
        if (e === "") {
            setName("")
            setNameError(true)
        } else {
            setName(e)
            setNameError(false)
        }
    }

    const handleChangleEmail = (e) => {
        if (e === "")
            setEmail("")
        setEmailError(true)
        if (regemail.test(e)) {
            setEmailError(false)
            setEmail(e)
        }
        else {
            setEmailError(true)
            setEmail("")
        }

    }

    const handleChangleUserName = (e) => {
        if (e === '') {
            setUserNameError(true)
        }
        else if (regUserName.test(e)) {
            setUserNameError(false)
            setUserName(e)
        } else {
            setUserNameError(true)
            setUserName("")
        }

    }



    const testStrengthPassword = (e) => {
        const pass1 = e.target.value
        if (regpass.test(pass1)) {
            setPassword(e.target.value)
            setPassError(false)
        }
        else {
            setPassword("")
            setPassError(true)
        }
        if (e.target.value !== "") {
            let pass = zxcvbn(e.target.value)
            setScore(pass.score)
            if (pass.score === 1) {
                setScoreText("Weak")
            } else if (pass.score === 2) {
                setScoreText("Medium")
            } else if (pass.score === 3) {
                setScoreText("Strong")
            } else if (pass.score === 0) {
                setScoreText("Very weak")
            } else setScoreText("Very strong")
        } else {
            setScore("null")
        }
    }



    return (
        <Container>
            <Typography variant='h3' align='center' gutterBottom>
                Register
            </Typography>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Box pb={2}>
                    <TextField label='Full Name' variant='standard' fullWidth required
                        onChange={(e) => handleChangleName(e.target.value)}
                        error={nameError} />
                    <TextField label='User Name' variant='standard' fullWidth required
                        onChange={(e) => handleChangleUserName(e.target.value)}
                        error={userNameError} />
                    <TextField label='Email' variant='standard' fullWidth required
                        onChange={(e) => handleChangleEmail(e.target.value)}
                        error={emailError}
                    />

                    <Tooltip title="Minimum eight characters, at least one letter and one number" placement="bottom">
                        <TextField
                            label="Password"
                            type={showPass ? "text" : "password"}
                            fullWidth
                            variant='standard'
                            error={passError}
                            onChange={testStrengthPassword}
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
                    </Tooltip>
                    <FormHelperText id="outlined-weight-helper-text">

                        <>{scoreText}<span
                            className="strength-password"
                            data-score={score}
                        /></>
                    </FormHelperText>

                    <RadioGroup value={gender} onChange={e => setGender(e.target.value)} row>
                        <FormControlLabel value='male' control={<Radio />} label="Male" />
                        <FormControlLabel value='female' control={<Radio />} label="Female" />
                        <FormControlLabel value='other' control={<Radio />} label="Other" />
                    </RadioGroup>
                </Box>
                <Button type='submit' variant='contained' startIcon={<SendIcon />}>Submit</Button>
            </form >

        </Container>


    );
}

export default Create;