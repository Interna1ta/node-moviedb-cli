const axios = require('axios')
const https = require("https");

axios.interceptors.response.use(null, error => {
  // const expectedError =
  //   error.response &&
  //   error.response.status >= 400 &&
  //   error.response.status < 500;

  // if (!expectedError) {
  //   toast.error("An unexpected error occurrred.");
  // }

  return Promise.reject(error);
});

async function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, (res) => {
      if (res.statusCode == 200) {
        let data = '';
        res.setEncoding('utf8');
        res.on("data", (d) => {
          data += d;
        });
        res.on("end", async () => {
          const obj = await JSON.parse(data);
          resolve({ data: obj });
        })
      } else {
        reject(`ERROR STATUS: ${res.statusCode}`);
      }
    });
    req.end();
  })
}

const httpService = {
  get: get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

module.exports = httpService;
