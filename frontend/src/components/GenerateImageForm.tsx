import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CreatePosts, GenerateAIImage } from "../api";
import Button from "./button";
import TextInput from "./TextInput";

const Form = styled.div`
flex: 1 ;
display: flex;
padding: 16px 20px;
flex-direction: column;
justify-content:center;
gap: 40px
`
const Top = styled.div`
display:flex;
flex-direction: column;
gap: 6px
`

const Tittle = styled.div`
font-size: 28px;
font-weight: 500;
color: ${({ theme }) => theme.text_primary}

`
const Desc = styled.div`
font-size: 17px;
font-weight: 400;
color: ${({ theme }) => theme.text_secondary}

`
const Body = styled.div`
display: flex;
flex-direction: column;
gap: 18px;
font-weight:400;
font-size:12px;
color: ${({ theme }) => theme.text_primary}
`
const Actions = styled.div`
flex:1;
display: flex;
gap:8px;

`

interface GenerateImageFormProps {
    post: { name: string; prompt: string; photo: string };
    setPost: React.Dispatch<React.SetStateAction<{ name: string; prompt: string; photo: string }>>;
    createPostLoading: boolean;
    setCreatePostLoading: React.Dispatch<React.SetStateAction<boolean>>;
    generateImageLoading: boolean;
    setGenerateImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenerateImageForm: React.FC<GenerateImageFormProps> = ({
    post,
    setPost,
    createPostLoading,
    setCreatePostLoading,
    generateImageLoading,
    setGenerateImageLoading,
}) => {
    const navigate = useNavigate();
     const [error, setError] = React.useState<string | null>(null);

    const generateImageFunc = async () => {
        setGenerateImageLoading(true);
        await GenerateAIImage({ prompt: post.prompt }).then((res) => {  
            setPost({ ...post, photo: `data:image/png;base64,${res?.photo}` });
            setGenerateImageLoading(false);
        }).catch((error) => {
            console.log(error);
            setError(error.response.data.message);
            setGenerateImageLoading(false);
        }
        )   

    }
    const createPostFunc = async () => {
        setCreatePostLoading(true);
        await CreatePosts(post).then(() => {
            setCreatePostLoading(false);
            navigate("/");
        }
        ).catch((error) => {
            console.log(error);
            setError(error.response.data.message);
            setGenerateImageLoading(false);
        }
        );
    }

    return (
        <Form>
            <Top>
                <Tittle>Generate Image with prompt</Tittle>
                <Desc>Write Your prompt according to the image you want</Desc>
            </Top>
            <Body>
                <TextInput label="Author" placeholder="Write your name here" name="name"
                    value={post.name}
                    handelChange={(e) => setPost({ ...post, name: e.target.value })} 
                />


                <TextInput label="Image Prompt" placeholder="Write a detailed prompt about the image you want to generate..."
                    name="name" rows={8}
                    textArea
                    value={post.prompt}
                    handelChange={(e) => setPost({ ...post, prompt: e.target.value })} 
                    />
                {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
                **Note: The more detailed the prompt, the better the image will be generated.**
            </Body>
            <Actions>
                <Button text="Generate Image" flex leftIcon={<AutoAwesome />}
                    isLoading={generateImageLoading}
                    isDisabled={post.prompt === ""}
                    onClick={() => generateImageFunc()}
                />
                <Button text="Post Image"
                    type="secondary"
                    flex leftIcon={<CreateRounded />}
                    isLoading={createPostLoading}
                    isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
                    onClick={() => createPostFunc()}
                />

            </Actions>
        </Form>
    )
}

export default GenerateImageForm;