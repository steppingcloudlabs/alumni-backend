const axios = require('axios')

const getUsersData = ({
    accessToken,
    tokenType,
    url,
    finalData
}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: url, // https://cors-anywhere.herokuapp.com/
            headers: {
                "Authorization": tokenType + " " + accessToken
            },
        }).then((response) => {
            if (response && response.data && response.data.d && response.data.d.__next) {
                finalData = finalData.concat(response.data.d.results)
                getUsersData({ accessToken: accessToken, tokenType: tokenType, url: response.data.d.__next, finalData: finalData }).then((response) => {
                    resolve(response)
                })
            }
            else {
                finalData = finalData.concat(response.data.d.results)
                resolve(finalData)
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

const getAccessToken = (payload, assertion) => {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('company_id', payload.companyId);
        params.append('client_id', payload.clientId);
        params.append('grant_type', payload.grantType);
        params.append('user_id', payload.userId);
        params.append('assertion', assertion);
        axios({
            method: 'POST',
            url: payload.API_BASE_URL + '/oauth/token', // https://cors-anywhere.herokuapp.com/
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: params,
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

const authentiateUser = (payload) => {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('client_id', payload.clientId);
        params.append('user_id', payload.userId);
        params.append('token_url', payload.tokenUrl);
        params.append('private_key', payload.privateKey);
        axios({
            method: 'POST',
            url: payload.API_BASE_URL + '/oauth/idp',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: params,
        }).then((response) => {
            resolve({
                payload: payload,
                data: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    })

}

module.exports = () => {
    const authenticateAndGetData = (payload) => {
        return new Promise(async (resolve, reject) => {
            authentiateUser(payload).then((authResponse) => {
                getAccessToken(authResponse.payload, authResponse.data).then((tokenResponse) => {
                    getUsersData({
                        accessToken: tokenResponse.data.access_token,
                        tokenType: tokenResponse.data.token_type,
                        url: payload.API_BASE_URL + payload.API_END_URL,
                        finalData: []
                    }).then((response) => {
                        resolve(response)
                    })
                })
            })
        })
    };
    return {
        authenticateAndGetData
    }
}