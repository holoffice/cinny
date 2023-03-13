import cons from './cons';

const urlParameters = new URLSearchParams(window.location.search);

function getSecret(key) {
  return localStorage.getItem(key);
}

function getUrl(key) {
  return urlParameters.get(key)
}

const isAuthenticated = () => getSecret(cons.secretKey.ACCESS_TOKEN) !== null || !!getUrl("accessToken");

const secret = {
  accessToken: getSecret(cons.secretKey.ACCESS_TOKEN) ?? getUrl("accessToken"),
  deviceId: getSecret(cons.secretKey.DEVICE_ID) ?? getUrl("deviceId"),
  userId: getSecret(cons.secretKey.USER_ID) ?? getUrl("userId"),
  baseUrl: getSecret(cons.secretKey.BASE_URL) ?? getUrl("baseUrl"),
};

export {
  isAuthenticated,
  secret,
};
