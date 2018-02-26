import MediaDevice from './modules/mediadevice';
import './index.css';

let camera = new MediaDevice();
var WebARCamera = window.WebARCamera || {};
WebARCamera.camera = camera;
window.WebARCamera = WebARCamera;