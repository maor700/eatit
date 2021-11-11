import axios, { AxiosResponse } from "axios";

const SERVER_URL = `http://localhost:8080`;

export const getIngredientsFromImage = async (image: string) => {

    let url = `${SERVER_URL}/upload`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    return fetch(url, { method: "POST", body: image, headers: myHeaders, redirect: 'follow' })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}