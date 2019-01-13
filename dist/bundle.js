/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/basic-video.js":
/*!****************************!*\
  !*** ./src/basic-video.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BasicVideo; });\nclass BasicVideo {\r\n    /**\r\n     * Construct a Basic Video Player\r\n     *\r\n     * @param {HTMLElement|HTMLVideoElement|HTMLAudioElement} element\r\n     * @param {string} poster\r\n     * @param {array} sources\r\n     * @param {string|number} defaultSource\r\n     * @param {string} hlsManifestUrl\r\n     */\r\n    constructor(element, {\r\n        poster,\r\n        sources,\r\n        defaultSource = 0,\r\n        hlsManifestUrl,\r\n    }){\r\n        this.MediaElement = element;\r\n        this.MediaElement.controls = true;\r\n        this.MediaElement.playsinline = true;\r\n        this.sources = sources;\r\n        this.poster = poster;\r\n        this.isPlaying = false;\r\n        this.loading = true;\r\n        this.defaultSource = defaultSource;\r\n        this.HLSManifestURL = hlsManifestUrl;\r\n        this.HLSisSupported = null;\r\n        this.HLSInstance = null;\r\n\r\n        this.MediaElement.addEventListener('play', () => { this.isPlaying = true; });\r\n        this.MediaElement.addEventListener('pause', () => { this.isPlaying = false; });\r\n\r\n        this.init()\r\n            .then(init => {\r\n                this.loading = false;\r\n                this.MediaElement.dispatchEvent(new CustomEvent('init'));\r\n            });\r\n    }\r\n\r\n    /**\r\n     * @returns {string}\r\n     */\r\n    get currentSource(){\r\n        return this.MediaElement.src;\r\n    }\r\n\r\n    /**\r\n     * @param {string} source - File to serve to the media element\r\n     */\r\n    set currentSource(source){\r\n        this.MediaElement.src = source || '';\r\n    }\r\n\r\n    /**\r\n     * @returns {string}\r\n     */\r\n    get poster(){\r\n        return this.MediaElement.poster;\r\n    }\r\n\r\n    /**\r\n     * @param {string} poster - File to serve to the media element\r\n     */\r\n    set poster(poster){\r\n       this.MediaElement.poster = poster;\r\n    }\r\n\r\n    /**\r\n     * @returns {number}\r\n     */\r\n    get currentVolume() {\r\n        return this.MediaElement.volume;\r\n    }\r\n\r\n    /**\r\n     * @param {number} volume - Number between 0 and 1\r\n     */\r\n    set currentVolume(volume) {\r\n        this.MediaElement.volume = volume || 0.5;\r\n    }\r\n\r\n    get buffered(){\r\n        return this.MediaElement.buffered;\r\n    }\r\n\r\n    /**\r\n     * @returns {boolean}\r\n     */\r\n    get isMuted(){\r\n        return this.MediaElement.muted;\r\n    }\r\n\r\n    /**\r\n     * @param {boolean} muted\r\n     */\r\n    set isMuted(muted){\r\n        this.MediaElement.muted = muted || false;\r\n    }\r\n\r\n    /**\r\n     * @returns {boolean}\r\n     */\r\n    get isLoading(){\r\n        return this.loading;\r\n    }\r\n\r\n    /**\r\n     * @returns {boolean}\r\n     */\r\n    get isReady(){\r\n        return this.MediaElement.readyState === 4;\r\n    }\r\n\r\n    /**\r\n     * @returns {boolean}\r\n     */\r\n    get readyState(){\r\n        return this.MediaElement.readyState;\r\n    }\r\n    /**\r\n     * @returns {number} - Total duration of the media in seconds\r\n     */\r\n    get totalDuration(){\r\n        return this.MediaElement.duration;\r\n    }\r\n\r\n    /**\r\n     * @returns {number} - Current time in seconds\r\n     */\r\n    get currentTime(){\r\n        return this.MediaElement.currentTime;\r\n    }\r\n\r\n    /**\r\n     * @param {number} time - time to seek to in seconds\r\n     */\r\n    set currentTime(time){\r\n        this.MediaElement.currentTime = time || 0;\r\n    }\r\n\r\n    /**\r\n     * @returns {number} - Current time in percentage\r\n     */\r\n    get currentProgress(){\r\n        return this.MediaElement.duration ? this.currentTime / this.MediaElement.duration : 0;\r\n    }\r\n\r\n    /**\r\n     * @returns {number}\r\n     */\r\n    get playbackRate(){\r\n        return this.MediaElement.playbackRate;\r\n    }\r\n\r\n    /**\r\n     * @param {number} rate - Number to determine the speed of playback. 1 = 100%.\r\n     */\r\n    set playbackRate(rate){\r\n        this.MediaElement.playbackRate = rate || 1;\r\n    }\r\n\r\n    /**\r\n     * @returns {array}\r\n     */\r\n    get playbackQualities(){\r\n        if(this.HLSInstance != null){\r\n            return this.HLSInstance.levels.map((level, index) => {\r\n                return {\r\n                    label: level.name,\r\n                    src: index\r\n                }\r\n            });\r\n        }\r\n\r\n        return this.sources.map((source, index) => {\r\n            return {\r\n                label: source.label,\r\n                src: index\r\n            }\r\n        });\r\n    }\r\n\r\n    /**\r\n     * @returns {number}\r\n     */\r\n    get currentPlaybackQuality(){\r\n        if(this.HLSInstance != null){\r\n            return this.HLSInstance.currentLevel;\r\n        }\r\n        else {\r\n            const sourceStrings = this.sources.map(source => source.src);\r\n            return sourceStrings.indexOf(this.currentSource);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @param {number} quality - Index in the sources/qualities array to load.\r\n     */\r\n    set currentPlaybackQuality(quality){\r\n        if(this.HLSInstance != null){\r\n            this.HLSInstance.currentLevel = quality;\r\n        }\r\n        else {\r\n            const currentTime = this.currentTime;\r\n            const currentPlaybackRate = this.playbackRate;\r\n\r\n            this.currentSource = this.sources[quality].src;\r\n\r\n            this.playbackRate = currentPlaybackRate;\r\n            this.currentTime = currentTime;\r\n\r\n            if(this.isPlaying){\r\n                this.play();\r\n            }\r\n        }\r\n    }\r\n\r\n    /**\r\n     * Force reload the contents of the player (may reset the currentTime back to 0)\r\n     *\r\n     * @returns {Promise} - resolved when the player reaches it's isReady state - rejected after 5 minutes\r\n     */\r\n    forceLoad(){\r\n        return new Promise((resolve, reject) => {\r\n            let ticks = 0;\r\n            this.MediaElement.load();\r\n\r\n            const interval = setInterval(() => {\r\n                ticks++;\r\n\r\n                if(this.isReady){\r\n                    resolve(this.isReady);\r\n                    clearInterval(interval);\r\n                }\r\n\r\n                if(ticks > 3000){\r\n                    reject('Timed Out');\r\n                    clearInterval(interval);\r\n                }\r\n            }, 100);\r\n        });\r\n    }\r\n\r\n    /**\r\n     * Initialize the Player\r\n     *\r\n     * @static\r\n     * @returns {Promise}\r\n     */\r\n    init(){\r\n        return new Promise(resolve => {\r\n            if(this.HLSManifestURL){\r\n                BasicVideo.loadHlsJs()\r\n                    .then(loaded => {\r\n                        if (loaded) {\r\n                            this.HLSisSupported = window.Hls.isSupported();\r\n\r\n                            if(this.HLSisSupported){\r\n                                this.attachHls(this.HLSManifestURL).then(initialized => {\r\n                                    resolve(true);\r\n                                });\r\n                            }\r\n                            else {\r\n                                resolve(false);\r\n                            }\r\n                        }\r\n                    });\r\n            }\r\n            else {\r\n                this.currentSource = this.sources[this.defaultSource] ? this.sources[this.defaultSource].src : '';\r\n                resolve(true);\r\n            }\r\n        })\r\n    }\r\n\r\n    /**\r\n     * Play\r\n     */\r\n    play(){\r\n        this.MediaElement.play().catch(() => {\r\n            console.log(this.readyState);\r\n        });\r\n    }\r\n\r\n    /**\r\n     * Pause\r\n     */\r\n    pause(){\r\n        this.MediaElement.pause();\r\n    }\r\n\r\n    /**\r\n     * Load the hls.js library and append it to the dom\r\n     *\r\n     * I do this because the library is over 200KB minified, seems like overkill to include if the\r\n     * user only wants to load simple mp4s etc..\r\n     *\r\n     * @static\r\n     * @returns {Promise}\r\n     */\r\n    static loadHlsJs(){\r\n        return new Promise(resolve => {\r\n            if(!document.getElementById('hlsJS')){\r\n                const script = document.createElement('script');\r\n\r\n                script.setAttribute('id', 'hlsJS');\r\n                script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/hls.js@latest');\r\n\r\n                document.body.appendChild(script);\r\n\r\n                script.addEventListener('load', () => {\r\n                    resolve(true);\r\n                });\r\n            } else {\r\n                resolve(true);\r\n            }\r\n        });\r\n    }\r\n\r\n    /**\r\n     * Attach an hls.js instance to the video player\r\n     *\r\n     * @param manifest\r\n     * @returns {Promise}\r\n     */\r\n    attachHls(manifest){\r\n        this.HLSInstance = new Hls();\r\n\r\n        return new Promise(resolve => {\r\n            this.HLSInstance.attachMedia(this.MediaElement);\r\n\r\n            // Attach Error Events to the Video Element\r\n            this.HLSInstance.on(Hls.Events.ERROR, (event, data) => {\r\n                this.MediaElement.dispatchEvent(new CustomEvent('HLSError', data));\r\n            });\r\n\r\n            // Load the Source\r\n            this.HLSInstance.on(Hls.Events.MEDIA_ATTACHED, () => {\r\n                this.HLSInstance.loadSource(manifest);\r\n\r\n                this.HLSInstance.on(Hls.Events.MANIFEST_PARSED, (event, data) => {\r\n                    resolve({event, data});\r\n                });\r\n            });\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/basic-video.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _basic_video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic-video.js */ \"./src/basic-video.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n    const mediaElement = document.getElementById('player');\r\n    const basicVideo = new _basic_video_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](mediaElement, {\r\n        poster: 'https://d292x7cpdimrbp.cloudfront.net/video/poster.jpg',\r\n        sources: [\r\n            {\r\n                src: 'https://d292x7cpdimrbp.cloudfront.net/video/1080.mp4',\r\n                type: 'video/mp4',\r\n                label: '1080'\r\n            },\r\n            {\r\n                src: 'https://d292x7cpdimrbp.cloudfront.net/video/720.mp4',\r\n                type: 'video/mp4',\r\n                label: '720'\r\n            },\r\n            {\r\n                src: 'https://d292x7cpdimrbp.cloudfront.net/video/480.mp4',\r\n                type: 'video/mp4',\r\n                label: '480'\r\n            },\r\n        ],\r\n        hlsManifestUrl: 'https://d292x7cpdimrbp.cloudfront.net/video/video.m3u8'\r\n    });\r\n    const videoProgress = document.getElementById('progress');\r\n    const playbackRateSelector = document.getElementById('rate');\r\n    const playbackSourceSelector = document.getElementById('sources');\r\n    const currentTimeDisplay = document.getElementById('currentTime');\r\n    let currentTime = 0;\r\n\r\n    document.body.addEventListener('click', event => {\r\n        const elementClicked = event.target;\r\n\r\n        if(elementClicked.getAttribute('id') === 'play'){\r\n            basicVideo.play();\r\n        }\r\n        if(elementClicked.getAttribute('id') === 'pause'){\r\n            basicVideo.pause();\r\n        }\r\n        if(elementClicked.getAttribute('id') === 'forward'){\r\n            basicVideo.currentTime += 1;\r\n        }\r\n        if(elementClicked.getAttribute('id') === 'backward'){\r\n            basicVideo.currentTime -= 1;\r\n        }\r\n    });\r\n\r\n    basicVideo.MediaElement.addEventListener('timeupdate', event => {\r\n        videoProgress.setAttribute('value', basicVideo.currentProgress * 100);\r\n        currentTimeDisplay.innerHTML = Math.floor(basicVideo.currentTime);\r\n    });\r\n\r\n    playbackRateSelector.addEventListener('change', event => {\r\n        basicVideo.playbackRate = event.target.value;\r\n    });\r\n\r\n    basicVideo.MediaElement.addEventListener('init', event => {\r\n        basicVideo.playbackQualities.forEach(source => {\r\n            let option = document.createElement('option');\r\n            option.setAttribute('value', source.src);\r\n            option.innerHTML = source.label;\r\n\r\n            let currentQuality = basicVideo.currentPlaybackQuality === -1 ?\r\n                basicVideo.HLSInstance.startLevel :\r\n                basicVideo.currentPlaybackQuality;\r\n\r\n            if(source.src === currentQuality){\r\n                option.setAttribute('selected', 'selected');\r\n            }\r\n\r\n            playbackSourceSelector.appendChild(option);\r\n        });\r\n\r\n        playbackSourceSelector.addEventListener('change', event => {\r\n            basicVideo.currentPlaybackQuality = event.target.value;\r\n        });\r\n    });\r\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });