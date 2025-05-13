
import { ExploreRounded } from "@mui/icons-material";
import AddRounded from "@mui/icons-material/AddRounded";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";


const Container = styled.div`
flex : 1;
background: ${({ theme }) => theme.navbar};
color: ${({ theme }) => theme.text_primary};
font-weight: bold;
font-size: 22px;
padding: 14px 50px;
display : flex;
justify-content:space-between;
align-items: center;
box-shadow: 0 0 10px rgba(0,0,0,0.15);
@media only screen and (max-width: 600px){
padding: 10px 12px;

}
`


const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split("/")

  return (
    <Container>
      <NavLink to="/" style={{color:"white",textDecoration:"none"}}>FutureX<a style={{color:"greenyellow", display: "inline", }}>IMG✨</a></NavLink>
      
      {
        path[1]==="post"? (
      <Button
        onClick={() => navigate("/")}

        text="Explore Posts" leftIcon={<ExploreRounded style={{ fontSize: '18px' }} />
        } />
      ) :(
        <Button
        onClick={() => navigate("/post")}

        text="Generate Images" leftIcon={<AddRounded style={{ fontSize: '18px' }} />
        } />
      )
      
    }
    </Container>
  )
}

export default Navbar