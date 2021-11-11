const SERVER_URL = `http://localhost:8080`;

export const getIngredientsFromImage = async (image: string) => {

    let url = `${SERVER_URL}/upload`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    return fetch(url, { method: "POST", body: image, headers: myHeaders, redirect: 'follow' })
        .then(response => response.json())
        .then((result) => result)
        .catch(error => console.log('error', error));
}