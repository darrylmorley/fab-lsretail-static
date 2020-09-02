// Functions to get the LS token, accountID and the number of requests needed.
const axios = require("axios");
const lightspeedApi = "https://api.lightspeedapp.com/API";

const refreshToken = async () => {
  const body = {
    grant_type: "refresh_token",
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  try {
    const response = await axios({
      url: "https://cloud.lightspeedapp.com/oauth/access_token.php",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    });
    const token = await response.data.access_token;
    return token;
  } catch (error) {
    if (error) console.error("We have a problem! Could not get token.", error.response.data);
  }
};

const setHeader = async () => {
  const token = await refreshToken()
  const header = {
    Authorization: `Bearer ${token}`
  }
  return header
}

module.exports = setHeader
 
