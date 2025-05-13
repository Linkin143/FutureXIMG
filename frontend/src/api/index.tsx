import axios from 'axios';

const API = axios.create({
    baseURL: "https://futureximg.onrender.com/api/",
});

export const GetPosts = async () => {
    try {
        const response = await API.get('/post/');
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const CreatePosts = async (data) => {
    try {
        const response = await API.post('/post/', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const GenerateAIImage = async (data) => {
    try {
        const response = await API.post('/generateImage/', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};
