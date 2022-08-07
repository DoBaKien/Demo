import { Container, Typography } from '@mui/material';
import UserContext from './UserContext';
import { useContext } from 'react'
import { Box, Grid} from '@mui/material';
import { styled } from '@mui/system'
import MemberCard from './MemberCard';

function Home() {

    const MyDiv= styled('div')({
        backgroundColor: 'aliceblue',
        padding: 10,
        borderRadius: 15,
    })
    const MyTypography = styled(Typography)({
        backgroundColor: '#52A388',
        color: 'white',
        textAlign: 'center',
        padding: 5,
        fontSize: "30px"
    })

    const { members } = useContext(UserContext)

    return ( 
        <Container>
            <MyTypography>
                Member 
            </MyTypography>
            <Box sx={{display: "flex"}}>
                <Box component="main" sx={{flexGrow: 1, p:3}}>
                    <Grid container p={5} spacing={6}>
                        {members && members.map((member) =>
                            <Grid item xs={4} key={member.id}>
                                <MyDiv>
                                    <MemberCard member={member} />
                                </MyDiv>
                            </Grid>)}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Home;