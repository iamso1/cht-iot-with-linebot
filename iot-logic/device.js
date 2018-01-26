const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';
const iotConfig = require('../iot-setting');
const addDeviceBody = {
  name: 'Hygrometer',
  desc: 'Your Hygrometer',
  type: 'general',
  uri: 'http://a.b.c.d/hygrometer',
  lat: 24.95,
  lon: 121.16,
  attributes: [
    {
      key: 'label',
      value: 'Hygrometer',
    },
    {
      key: 'region',
      value: 'Taiwan',
    },
  ],
};
module.exports = {
  addDevice: () => {
    return axios
      .post('http://iot.cht.com.tw/iot/v1/device', addDeviceBody, {
        headers: {
          CK: iotConfig.projectKey,
        },
      })
      .then(resp => {
        return {
          statusCode: resp.status,
          id: resp.data.id,
        };
      })
      .catch(resp => {
        return {
          statusCode: resp.response.status,
          statusText: resp.response.statusText,
          status: resp.response.data.status,
          message: resp.response.data.message,
        };
      });
  },
};
