const axios = require('axios')

const getAllEmployeePositionData = ({
    userResponse,
    payload,
    tokenResponse,
    effectiveDateTime
}) => {
    return new Promise((resolve, reject) => {
        let requestURLS = []
        let urlReqAndProfileArray = []
        let photoFilter = ""
        let reqFilter = ""
        requestURLS.push(payload.API_BASE_URL + payload.positionDataURL + "code eq '" + userResponse.position + "' and effectiveStartDate le datetime'" + effectiveDateTime + "')")
        requestURLS.push(payload.API_BASE_URL + payload.userChildDataUrl + "managerId eq '" + userResponse.userId + "' and startDate le datetime'" + effectiveDateTime + "')")
        requestURLS.push(payload.API_BASE_URL + payload.positionChildDataUrl + "(parentPosition/code eq '" + userResponse.position + "' and effectiveStartDate le datetime'" + effectiveDateTime + "')")
        Promise.all(requestURLS.map(url => {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: url,
                    headers: {
                        "Authorization": tokenResponse.data.token_type + " " + tokenResponse.data.access_token
                    },
                }).then((response) => {
                    if (response.data.d && response.data.d.results && response.data.d.results.length && response.data.d.results[0].userId) {
                        for (let i = 0; i < response.data.d.results.length; i++) {
                            if (i < response.data.d.results.length - 1) {
                                photoFilter = photoFilter + "userId eq '" + response.data.d.results[i].userId + "' or "
                            } else {
                                photoFilter = photoFilter + " userId eq '" + response.data.d.results[i].userId + "'"
                            }
                        }
                    } else if (response.data.d && response.data.d.results && response.data.d.results.length && response.data.d.results[0].code) {
                        if (reqFilter) {
                            reqFilter = reqFilter + " or "
                        }
                        for (let i = 0; i < response.data.d.results.length; i++) {

                            if (i < response.data.d.results.length - 1) {
                                reqFilter = reqFilter + "positionNumber eq '" + response.data.d.results[i].code + "' or "
                            } else {
                                reqFilter = reqFilter + "positionNumber eq '" + response.data.d.results[i].code + "'"
                            }
                        }
                    }
                    resolve(response.data.d.results)
                }).catch((error) => {
                    reject(error)
                })
            })
        })).then((allResponse) => {
            allResponse.unshift(userResponse)
            if (photoFilter) {
                photoFilter = photoFilter + " or "
            }
            photoFilter = photoFilter + "userId eq '" + userResponse.userId + "'";
            urlReqAndProfileArray.push(payload.API_BASE_URL + payload.userProfileUrl + photoFilter + ")")
            urlReqAndProfileArray.push(payload.API_BASE_URL + payload.reqDataUrl + reqFilter + ")")
            Promise.all(urlReqAndProfileArray.map((url) => {
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

                }).then((completeResponse) => {
                    allResponse.push(completeResponse)
                }).catch((error) => {
                    reject(error)
                })
            })).then((completeResponse) => {
                resolve(allResponse)
            }).catch((error) => {
                reject(error)
            })
            // resolve(allResponse)
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
    userId,
    effectiveDateTime
}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: url + "userId eq '" + userId + "' and startDate le datetime'" + effectiveDateTime + "')",
            headers: {
                "Authorization": tokenType + " " + accessToken
            },
        }).then((response) => {
            // finalData = finalData.concat(response.data.d.results)
            response.data.d.results[0]['isRoot'] = true;
            resolve(response.data.d.results[0])
        }).catch((error) => {
            reject(error)
        })
    })
}

const getUsersProfileById = ({
    filter,
    payload,
    tokenResponse,
}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: payload.API_BASE_URL + payload.userProfileUrl + filter,
            headers: {
                "Authorization": tokenResponse.data.token_type + " " + tokenResponse.data.access_token
            },
        }).then((response) => {
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
    const authenticateAndGetData = (payload, requestPayload) => {
        return new Promise(async (resolve, reject) => {
            authentiateUser(payload).then((authResponse) => {
                getAccessToken(authResponse.payload, authResponse.data).then((tokenResponse) => {
                    getUsersDataById({
                        accessToken: tokenResponse.data.access_token,
                        tokenType: tokenResponse.data.token_type,
                        url: payload.API_BASE_URL + payload.userDataURL,
                        finalData: [],
                        userId: requestPayload.userId,
                        effectiveDateTime: requestPayload.effectiveDateTime
                    }).then((userResponse) => {
                        getAllEmployeePositionData({
                            userResponse: userResponse,
                            payload: payload,
                            tokenResponse: tokenResponse,
                            effectiveDateTime: requestPayload.effectiveDateTime
                        }).then((combinedResponse) => {
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