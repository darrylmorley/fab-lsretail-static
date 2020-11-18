const axios = require('axios')
const lightspeedApi = "https://api.lightspeedapp.com/API";
import NodeCache from 'node-cache'

const tokenCache = new NodeCache()
let token = null

const refreshToken = async () => {
  const body = {
    grant_type: "refresh_token",
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  const cachedToken = await tokenCache.get('tokenData')
  console.log('Cached Token, tokenData =', cachedToken)

  if (cachedToken != undefined) {
    token = cachedToken.access_token
    console.log('Token 1 =', token)
    return token
  }

  if (cachedToken === undefined) {
    try {
      const response = await axios({
        url: "https://cloud.lightspeedapp.com/oauth/access_token.php",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
      });

      const tokenData = await response.data
      console.log('Token Data in 2 = ', tokenData)

      tokenCache.set('tokenData', tokenData, { checkperiod: tokenData.expires_in })

      token = tokenData.access_token
      console.log('Token 2 =', token)
      return token;
    } catch (error) {
      if (error) console.error("We have a problem! Could not get token.", error.data);
    }
  }
};

module.exports = refreshToken
