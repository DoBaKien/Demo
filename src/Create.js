import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import { Button, TextField, Box, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Tooltip } from '@mui/material';
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import axios from 'axios'

var zxcvbn = require("zxcvbn")
var regemail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
var regUserName = /^[a-zA-Z0-9]{6,16}$/

function Create() {
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openErrorPass, setOpenErrorPass] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('male')
    const [nameError, setNameError] = useState(false)
    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)
    // const { createUser } = useContext(UserContext)

    const handleClose = () => {
        setOpen(false);
        setOpenError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('register', {
            "name": name,
            "email": email,
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
                if (name === "") {
                    setNameError(true)
                } else if (email === "") {
                    setEmailError(true)
                    setOpenError(true)
                }
                else if (password === '')
                    setOpenErrorPass(true)
            }
        )
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if (name && email && userName && password) {
    //         createUser({ name, userName, email, password, gender })
    //         console.log(name, userName, email, password, gender);
    //         setOpen(true)
    //     } else if (name === "") {
    //         setNameError(true)
    //     } else if (email === "") {
    //         setEmailError(true)
    //         setOpenError(true)
    //     }
    //     else if (password === '')
    //         setOpenErrorPass(true)
    // }

    const handleChangleName = (e) => {
        setName(e)
        setNameError(false)
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

    const [showPass, setShowPass] = useState(false);
    const [score, setScore] = useState("null");
    const [scoreText, setScoreText] = useState("");

    const testStrengthPassword = (e) => {
        const pass1 = e.target.value
        if (regpass.test(pass1)) {
            setPassword(e.target.value)
            setOpenErrorPass(false)
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
                        error={emailError} />

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

            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    Success!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    Please  enter a valid email address
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorPass} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    Your password must be at least 8 characters long. Please try another.
                </Alert>
            </Snackbar>
        </Container>


    );
}

export default Create;