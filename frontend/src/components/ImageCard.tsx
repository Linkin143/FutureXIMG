import { DownloadRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { saveAs } from 'file-saver';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';

const Card = styled.div`
position: relative;
display: flex;


border-radius: 20px;
box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
cursor: pointer;
transition: all 0.3s ease;

&:hover{
    scale: 1.05;
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};

}
    &:nth-child(7n+1){
    grid-column: auto/span 2;
    grid-row: auto/span 2;
    }

`
const HoverOverlay = styled.div`
position: absolute;
opacity: 0;
top:0;
left:0;
right:0;
bottom:0;
display: flex;
align-items: start;
gap: 10px;
backdrop-filter: blur(2px);
background: rgba(0,0,0,0.5);
flex-direction: column;
color:${({ theme }) => theme.white};
transition: opacity 0.3s ease;
border-radius: 6px;
justify-content: end;
padding: 12px;

${Card}:hover & {
opacity: 1;
}
`
const Prompt = styled.div`
font-weight: 400px;
font-size: 15px;
color:${({ theme }) => theme.white};
`
const Author = styled.div`
font-weight: 600px;
font-size: 14px;
display: flex;
gap: 8px;
align-items: center;
color:${({ theme }) => theme.white};

`

interface ImageCardProps {
    item: {
        photo: string;
        prompt: string;
        name: string;
    };
}

const ImageCard = ({ item }: ImageCardProps) => {
    return (
        <Card>
            <LazyLoadImage 
            alt={item?.prompt}
            style={{
                width: '100%',
                borderRadius:"12px"
            }} src={item?.photo} />
            <HoverOverlay>
                <Prompt>{item?.prompt}</Prompt>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Author>
                        <Avatar style={{
                            width: '32px',
                            height: '32px',

                        }}>{item?.name[0]}</Avatar>
                        {item?.name}
                    </Author>
                    <DownloadRounded onClick={() => saveAs(item?.photo, 'FutureX.IMG_downloaded_image.jpg')} />
                </div>

            </HoverOverlay>
        </Card>
    )
}

export default ImageCard;