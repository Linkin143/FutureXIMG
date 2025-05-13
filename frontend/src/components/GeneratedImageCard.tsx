import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
flex:1;
padding:16px;
min-height:300px;
display:flex;
gap:16px;
flex-direction:column;
align-items:center;
justify-content:center;
border:2px dashed ${({ theme }) => theme.yellow};
color:${({ theme }) => theme.arrow + 80};
border-radius:20px;



`

const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
border-radius:24px;
background: ${({ theme }) => theme.black + 50};


`

interface GeneratedImageCardProps {
    src?: string;
    loading: boolean;
}

const GeneratedImageCard = ({ src, loading }: GeneratedImageCardProps) => {
    return (
        <Container>
            {
                loading ? (<><CircularProgress style={{
                    color: 'inherit',
                    width: '24px',
                    height: '24px'
                }}/>
                
                Generating Your Image...</> ) :(
                    <>
                    {
                        src?<Image src={src} /> : <>Write a prompt to generate image.</>
                    }
                    
                    </>
                )
            }
            
        </Container>
    )
}

export default GeneratedImageCard