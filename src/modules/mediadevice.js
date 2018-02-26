import * as $ from 'jquery'
import {EventEmitter} from 'events';
import debug from './debug';

class MediaDevice extends EventEmitter {
    /**
     * @param config
     * Object containing
     * camera type eg: environment
     * domElementID
     * debug true or false
     */
    defaults = {
        camera: 'environment',
        domElementID: 'video',
        debug: false
    };
    options = {};
    constructor() {
        super();
    }
    init(config) {
        this.config = config;
        var target = this.target = document.createTextNode(null);
        this.addEventListener = target.addEventListener.bind(target);
        this.removeEventListener = target.removeEventListener.bind(target);
        this.dispatchEvent = target.dispatchEvent.bind(target);
        /**
         * Create a configuration from supplied options and defaults
         */
        for(var i in config){
            this.options[i] = {
                value: config[i],
                enumerable: true,
                writeable: true,
                configurable: true
            }
        }
        var config = Object.create(this.defaults, this.options);
        console.log('', config);

        if (config.debug) {
            console.log('', debug);
            debug.init();
        }

        /**
         * Configure the supplied video element
         */
        this.addCameraStream()
    }
    addCameraStream() {
        var video = document.getElementById(this.config.domElementID);
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');

        var constraints = {
            audio: false,
            video: {
                facingMode: this.config.camera
            }
        };

        navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
            video.srcObject = stream;
            debug.log('Camera enabled...', '#000000', '#3BFF4C');
            var event = new CustomEvent('camera_event', { detail: 'PermissionGranted' });
            this.target.dispatchEvent(event);
            var MediaStream = stream.getTracks()[0];

        }.bind(this)).catch(function (e) {
            /**
             Possible Errors
             PermissionDismissedError
             PermissionDeniedError
             */
            switch (e.name) {
                case 'PermissionDismissedError':
                    debug.log('PermissionDismissedError', 'white', 'red');
                    console.log('user has dismissed the request for camera');
                    break;
                case 'PermissionDeniedError':
                    debug.log('PermissionDeniedError', 'white', 'red');
                    console.log('user has blocked camera for this domain');
                    break;
                case 'NotAllowedError':
                    debug.log('NotAllowedError', 'white', 'red');
                    console.log('user has blocked camera for this domain');
                    break;
                case 'NotSupportedError':
                    debug.log('NotSupportedError', 'white', 'red');
                    console.log('The current platform does not support webrtc');
                    break;
            }
            var event = new CustomEvent('camera_event', { detail: e.name });
            this.target.dispatchEvent(event);
        }.bind(this))
    }
}
export default MediaDevice;
