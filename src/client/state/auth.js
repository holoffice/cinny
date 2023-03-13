import { updateLocalStore } from '../action/auth';
import cons from './cons';

const urlParameters = new URLSearchParams(window.location.search);

function getSecret(key) {
  return localStorage.getItem(key);
}

function getUrl(key) {
  return urlParameters.get(key)
}

const isAuthenticated = () => getSecret(cons.secretKey.ACCESS_TOKEN);

const accessToken = getUrl('accessToken')
const deviceId = getUrl('deviceId')
const userId = getUrl('userId')
const baseUrl = getUrl('baseUrl')

if (accessToken && deviceId && userId && baseUrl)
  updateLocalStore(accessToken, deviceId, userId, baseUrl)

const secret = {
  accessToken: getSecret(cons.secretKey.ACCESS_TOKEN),
  deviceId: getSecret(cons.secretKey.DEVICE_ID),
  userId: getSecret(cons.secretKey.USER_ID),
  baseUrl: getSecret(cons.secretKey.BASE_URL),
};

export {
  isAuthenticated,
  secret,
};
