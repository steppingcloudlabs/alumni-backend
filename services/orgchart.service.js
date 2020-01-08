const axios = require('axios')

const getAllEmployeePositionData = ({
    userResponse, payload, tokenResponse
}) => {
    return new Promise((resolve, reject) => {
        let requestURLS = []
        requestURLS.push(payload.API_BASE_URL + payload.positionDataURL + "'" + userResponse.position + "'")
        requestURLS.push(payload.API_BASE_URL + payload.userChildDataUrl + "'" + userResponse.managerId + "'")
        requestURLS.push(payload.API_BASE_URL + payload.positionChildDataUrl + "'" + userResponse.position + "'")
        Promise.all(requestURLS.map(url => {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: url,
                    headers: {
                        "Authorization": tokenResponse.data.token_type + " " + tokenResponse.data.access_token
                    },
                }).then((response) => {
                    resolve(response.data.d.results)
                }).catch((error) => {
                    reject(error)
                })
            })
        })).then((allResponse) => {
            allResponse.unshift(userResponse)
            resolve(allResponse)
        }).catch((error) => {
            reject(error)
        })
    })
}

const getUsersDataById = ({
    accessToken,
    tokenType,
    url,
    finalData,
    userId
}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: url + "'" + userId + "'", // https://cors-anywhere.herokuapp.com/
            headers: {
                "Authorization": tokenType + " " + accessToken
            },
        }).then((response) => {
            // finalData = finalData.concat(response.data.d.results)
            resolve(response.data.d.results[0])
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
    const authenticateAndGetData = (payload, userId) => {
        return new Promise(async (resolve, reject) => {
            authentiateUser(payload).then((authResponse) => {
                getAccessToken(authResponse.payload, authResponse.data).then((tokenResponse) => {
                    getUsersDataById({
                        accessToken: tokenResponse.data.access_token,
                        tokenType: tokenResponse.data.token_type,
                        url: payload.API_BASE_URL + payload.userDataURL,
                        finalData: [],
                        userId: userId
                    }).then((userResponse) => {
                        getAllEmployeePositionData({ userResponse: userResponse, payload: payload, tokenResponse: tokenResponse }).then((combinedResponse) => {
                            resolve(combinedResponse)
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                })
            })
        })
    };
    return {
        authenticateAndGetData
    }
}