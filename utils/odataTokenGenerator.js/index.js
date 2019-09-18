module.exports = () => {
    const axios = require("axios");
    const params = new URLSearchParams();
    const getAssertionToken = (payload) => {
        const client_id = 'MTg1ZmZmYTAwZjRmZjI0NTE1MGNiZDM0ODM1OA'
        const user_id = 'sfapi'
        const token_url = "https://api10.successfactors.com/oauth/token"
        const url = 'https://api10.successfactors.com/oauth/idp'
        const private_key = "TUlJRXZRSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS2N3Z2dTakFnRUFBb0lCQVFDbFBWQ2xTbXZIeDA2WHJMTFVYTzZLS081WnZsYm8rV0VUdk82S1Rva0pUemJGejRnSlBwYU5rVnJ4bzdTNWh5WlZybGNodXRPc3U2Yi9MSWIyallpYnlmWHZqWWJSMkZCb1FGazM4b05OUWxkODgyRGk5NUczVUFxM3kydEwwTlREY01objR4SXZoRERiRy9wUWdiZ0hKMVU4ZTE1T0ZCMU9MQkRDMmRmTTZJSzFlVUhBR3l5ZTFrNDRQMUtCK2hWQzYwcE9zRk5SMUZCTkl5WXNMdXZlaGVwRXpzT3F4Nldmd25wb253WVF5RjczaENtNG10b3VkQm9jL1dOTG5haDZIRlJlTGs5YjE4Kzl3a3F5VFJPdmo0MzE0UkZQR3JGd1J0OWwrSno2OUxYUmN0S0JWRzd1bFRGNlZ0NGZVUllzN1dRMGd4Z3IwUHVFMFJSNS9CMWRBZ01CQUFFQ2dnRUFkTWI4YzVSQXo1Ti9hNW5WV0ZmRkRVY1lDN3lFMTJsR3ZoaEx6TnJyNWZSaGxUS3h4VGJDVjVKZVgxOStuWTl4L0NPVjJIU2NtL3FTYnN3ZEphbW8zZERCU21jTzNNYXZMTDR0VDJqSWVwVmtGeDQ1WHEzd0FVbEVDZGh0SDh1YVVmVW03S1NCZWF0R2k5TWQrRDkwdXptRTk1V0lkRTJxMkZBMEdFQzBUazd3NDhSVUJQOEk4cHgzZS9hRDVqN2U3ZC81Y25DUG1SdE53MEhwRTVQeWpSeFdXdlB0WmR4Q0xUeXllbTVodW9XSGkremEvcm9YM3VrWFBncm9SOXF5c3FmY09QUnQyOEFmSy85cEZHWUVMUmhKa0ppaVhpN3dxdFlYVEY3bVdwM1M5c0ZRVTdQdTB3amJ5ajhQek00cE12R3JzNDJOOWV2QUdETi9WMW1hQVFLQmdRRFg2eDZaeGRVNmtsYnBLWmJjTkZJbzhoa2k4NXNZYjZUNnVXUVRkeGJDN0V4ZGY4V3c2NkQrNmxIL1FRMVBQalN1VUxuZXdHUXgzejYvdnRXVEYyNy9wZFNaMGg1c1A5MVVjOTdlOFhoSmtyQm05clpUekFTTWZyUndXMERpYU9oYjAvem11Ung1cGE5ZFdCZE4wdUsrRWFqNmdaQis3M1FGNXpFUzB0ZWpJUUtCZ1FERDZkU2g5T2Z0WlpiTDdaSnJrNGJ6dlg0ZkI0dEgzOWp3U0IwREtCUGI2YUZydmlXZEx1ekZDTFZEZ3RTU0k0V2pzQWVRRmFnYlA1M0RDVnNNa1hjNnJMdzBmdXo3emRXV2NCUVRyQTNDM2E1L2N5N0t2V0YwTWM0MFpTenZnMTNzeW1NbjB4S2FJcFdxL25BbDNkcG0zb1NhVDFiM0RCRlFQYUZLa3lEdXZRS0JnSHZzV0IzTnE3bjRMNldXMXh6L2NvQkpveCtxVFVQVElBOCt4QzlmMUZKL3FMeXBEdCtoL1Q4UllZcHMzYVN6Z1N6aTdDcnFwUmJ5bUdNWXRoKzcvVnNBNUdwOGJEV1kyZ0VVbDcvQk8xYU91R3dBQVZsSzZQbHg1MEh0UGVvMFo5ZjhiVlJHdmc4Ymh2QytGSEg0TFdjRlg4U1hCRVcyVFJMdVEvNFh3T2ZCQW9HQWFjMWhNT256U3VpL0xIaXJ4MzhQdFpoVGdXeHdrcXRZSEVQRnIwdTRsZDR4ZDk5anJ1U0ZwODhSSFZtTmRUTEwzRitYWmYvY0hvTVhyeG5oV3dOQU1hYlJxVVFXdGRJdWxDVUpJcXFiYis2S2EzZ0lBQ09RZXREZS9McmJMcXB5VWd2bXlyNFo0TFhtd0ViU3lCQnMvM3NTZjhkelBzMzhsNm9BN2laUTliMENnWUVBMWN4WXdhWFBRRk40akFRYy9MUytaREdoZ0UzWHlEWkhReDd1bHRxQ2l1R3RSL0xFMWlCSE5PWnltcHhLZFBhZWlFeWh5OE12bmdBVHJadXlrSkVaQUthME9YLzY5aW90SG5JdEdNemZmRlBvdUxaWExXQnBheXVLNG9mTkxYMUxQU1lrY2E2MlArdkpFOHdqOXovdHR3UHZVYVZLaVRObElPZ05TWlpYZTlVPSMjI1RpdGFuVGVzdA=="
            // retuning promise for assertion.
        return new Promise(async(resolve, reject) => {
            try {
                params.append("client_id", client_id);
                params.append("user_id", user_id);
                params.append("token_url", token_url);
                params.append("private_key", private_key);
                axios({
                    method: "POST",
                    url: url,
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Content-Type"
                    },
                    data: params
                }).then(response => {
                    console.log(response);
                    resolve(JSON.parse(body));
                });
            } catch (error) {
                reject(error)
            }
        });
    }
    const getAccessToken = () => {
        return new Promise(async(resolve, reject) => {
            let assertionToken = getAssertionToken();
            assertionToken.then(function(result) {
                userDetails = result;
            }, function(err) {
                reject(error)
            })
        })
    };
    return {
        getAccessToken
    }
}