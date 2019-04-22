import { TOKEN } from '../constants/index';
export const postCallApi = (api_url, body) => {
    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN, 
        },
        body: JSON.stringify(body)
    })
        .then((res) => res.json())
        .then(data => {
            return Promise.resolve(data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getCallApi = (api_url) => {
    return fetch(api_url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN, 
          }
        })
        .then((res) => res.json())
        .then(data => {
            return Promise.resolve(data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });

}
