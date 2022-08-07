import { Button, TextField, Box, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from 'react'
import UserContext from './UserContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

var regemail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
var regphone =/^[0-9]{9,10}$/
function AddMember() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [details, setDetails] = useState('')
    const [nameError, setNameError] = useState(false)
    const [gender, setGender]= useState('male')
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)

    const {createMember} = useContext(UserContext)


    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        if (name) {
            createMember({ name,email, phone, gender, details})
            console.log(name,email, phone, gender, details)
            setOpen(true)
        }
        if (name === '')
            setNameError(true)
    }

    const handleChanglePhone = (e) => {
        if (e === "")
            setPhone("")
            setPhoneError(true)
        if (regphone.test(e)) {
            setPhoneError(false)
            setPhone(e)
        }
        else {
            setPhoneError(true)
            setPhone("")
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

    return (
        <Container style={{padding:"20px"}}>
            <Typography variant='h3' align='center' gutterBottom>
                Create a new member
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Box pb={2}>
                    <TextField label='Name' variant='standard' fullWidth required
                        onChange={(e) => setName(e.target.value)}
                        error={nameError} />
                     <TextField label='Email' variant='standard' fullWidth
                        onChange={(e) => handleChangleEmail(e.target.value)}
                        error={emailError} />
                    <TextField label='Phone' variant='standard' fullWidth type="number"
                        onChange={(e) => handleChanglePhone(e.target.value)}
                        error={phoneError} />
                    <TextField label='Detail' variant='standard' fullWidth multiline rows={3}
                        onChange={(e) => setDetails(e.target.value)} />

                    <RadioGroup value={gender} onChange={e=> setGender(e.target.value)}>
                        <FormControlLabel value='male' control={<Radio />} label="Male"/>
                        <FormControlLabel value='female' control={<Radio />} label="Female"/>
                        <FormControlLabel value='other' control={<Radio />} label="Other"/>
                    </RadioGroup>
                </Box>
                <Button type='submit' variant='contained' startIcon={<SendIcon />}>Submit</Button>
            </form >

            
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    Create message!
                </Alert>
            </Snackbar>

        </Container >
    );
}

export default AddMember;