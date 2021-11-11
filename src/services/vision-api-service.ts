import axios, { AxiosResponse } from "axios";

const SERVER_URL = `https://eatit-331711.el.r.appspot.com`;

export const getIngredientsFromImage = async (image: string) => {

    let url = `${SERVER_URL}/upload`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    return fetch(url, { method: "POST", body: image, headers: myHeaders, redirect: 'follow' })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}