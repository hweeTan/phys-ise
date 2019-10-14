import axios from 'axios';
import constants from 'settings/constants';
import url from 'settings/url';

export function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100, 10);
  G = parseInt(G * (100 + percent) / 100, 10);
  B = parseInt(B * (100 + percent) / 100, 10);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  const RR = ((R.toString(16).length === 1) ? `0${R.toString(16)}` : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? `0${G.toString(16)}` : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? `0${B.toString(16)}` : B.toString(16));

  return `#${RR}${GG}${BB}`;
}

export function getOffset(el) {
  const boundingRect = el.getBoundingClientRect();

  return {
    left: boundingRect.left + window.scrollX,
    top: boundingRect.top + window.scrollY,
  };
}

export function uploadVideo(e, onSuccess = console.log, onError = console.log) { // eslint-disable-line
  const file = e.target.files[0];
  const data = new FormData();

  data.append('file', file);
  data.append('name', 'name');
  axios.post(`${constants.API_URL}${url.uploadVideo}`, data)
    .then((response) => onSuccess(response.data))
    .catch((error) => onError(error));
}

export function putFile(data, onSuccess = console.log, onError = console.log) { // eslint-disable-line
  axios.post(`${constants.API_URL}${url.saveData}`, data)
    .then((response) => {
      if (response.data.error) {
        onError(response.data.error);
      } else {
        onSuccess(data.filename);
      }
    })
    .catch((error) => {
      onError(error);
    });
}

export function getData(data, onSuccess = console.log, onError = console.log) { // eslint-disable-line
  axios.post(`${constants.API_URL}${url.getData}`, data)
    .then((response) => {
      if (response.data.error) {
        onError(response.data.error);
      } else {
        onSuccess(response.data);
      }
    })
    .catch((error) => {
      onError(error);
    });
}

export function getVideos(callback) {
  axios.get(`${constants.API_URL}${url.getVideos}`)
    .then((response) => {
      callback(response.data.file);
    })
    .catch((error) => {
      callback(error);
      console.error(error); // eslint-disable-line
    });
}

export function isTouchDevice() {
  return !!('ontouchstart' in window);
}
