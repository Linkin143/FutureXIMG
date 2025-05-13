import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { GetPosts } from "../api";
import ImageCard from "../components/ImageCard";
import SearchBar from "../components/SearchBar";


const Container = styled.div`
height:100%;
overflow-y:scroll;
padding: 30px 30px;
padding-bottom: 50px;
display: flex;
flex-direction: column;
align-items: center;
gap:20px;
@media (max-width:768px){
padding:6px 10px;
}
`
const Headline = styled.div`
font-size: 34px;
font-weight:500;
color: ${({ theme }) => theme.text_primary};
display : flex;
flex-direction: column;
align-items: center;
@media (max-width:600px){
font-size:22px
text-align : center;
align-items: center;
}
`
const Span = styled.div`
font-size: 30px;
font-weight:800;
color: ${({ theme }) => theme.primary};
@media (max-width:600px){
font-size:20px

}
`
const Wrapper = styled.div`
width:100%;
max-width: 1400px;
padding:32px 0px;
display: flex;
justify-content: center;

`

const CardWrapper = styled.div`
display: grid;
gap: 20px;
@media (min-width: 1200px){ 
grid-template-columns: repeat(4,1fr);
}
@media (min-width:640px) and (max-width: 1199px){ 
grid-template-columns: repeat(3,1fr);
}
@media (max-width: 639px){ 
grid-template-columns: repeat(2,1fr);
}
`


const Home = () => {
const [posts, setPosts] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [filteredPosts, setFilteredPosts] = useState<any[]>([]);


const getPosts = async () => {
  setLoading(true);
  await GetPosts().then((res) => { 
    setLoading(false);
    setPosts(res.data);
    setFilteredPosts(res.data);
    setError("");
  }).catch((error) => { 
    setError(error.res.data.message);
    setLoading(false);
  }
  );
};

useEffect(() => { 
  getPosts();
}, []);

useEffect(() => { 
 if(!search){
  setFilteredPosts(posts);

 }
 const searchfilterPosts = posts.filter((post) => {
  const searchTerm = search.toLowerCase();
  return (
    post.name.toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
    post.prompt.toLowerCase().includes(searchTerm.toString().toLowerCase())
  ) 
});
if(search){
  setFilteredPosts(searchfilterPosts);
 }    

}, [posts,search]);




  return (
    <Container style={{ background: ("Black") }}>
      <Headline> Transform your words into visual masterpieces!✨
        <Span>⦿Leverage AI technology to craft breathtaking images⦿</Span>
      </Headline>
      <SearchBar search= {search} setSearch={setSearch}/>
      <Wrapper>
        {error && <div style={{color : "red"}}>{error}</div>}
        {loading ? (<CircularProgress/>):(
        <CardWrapper>
          {filteredPosts.length === 0 ? <> No Posts Found</> :
          <>
          {filteredPosts.slice().reverse().map((post, index) => (
            <ImageCard key={index} item={post} />
          ))}
          {posts.length > 0 && posts.slice().reverse().map((post, index) => (
            <ImageCard key={index} item={post} />
          ))}
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {posts.length === 0 && !loading && !error && <div>No posts available</div>}
      
          </>
          }

        </CardWrapper>)}
      </Wrapper>
    </Container>
  )

}
export default Home;