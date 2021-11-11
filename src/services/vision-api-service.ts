import axios, { AxiosResponse } from "axios";

const SERVER_URL = `https://localhost:8080`;

export const getIngredientsFromImage = async (image: string) => {
    
    let url = `${SERVER_URL}/upload`;
    return axios.post(url, image);
}s