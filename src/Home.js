import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system'

function Home() {

    const MyTypography = styled(Typography)({
        backgroundColor: '#52A388',
        color: 'white',
        textAlign: 'center',
        padding: 5,
        fontSize: "30px"
    })

    return ( 
        <Container>
            <MyTypography>
                Member 
            </MyTypography>
        </Container>
    );
}

export default Home;