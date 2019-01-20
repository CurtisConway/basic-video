export default class BasicVideo {
    /**
     * Construct a Basic Video Instance
     *
     * @param {HTMLElement|HTMLVideoElement|HTMLAudioElement} element
     * @param {string} poster
     * @param {array} sources
     * @param {string|number} defaultSource
     * @param {string} hlsManifestUrl
     */
    constructor(element, {
        poster,
        sources,
        defaultSource = 0,
        hlsManifestUrl,
    }){
        this.MediaElement = element;
        this.MediaElement.controls = true;
        this.MediaElement.playsinline = true;
        this.sources = sources;
        this.poster = poster;
        this.isPlaying = false;
        this.loading = true;
        this.defaultSource = defaultSource;
        this.HLSManifestURL = hlsManifestUrl;
        this.HLSisSupported = null;
        this.HLSInstance = null;

        this.MediaElement.addEventListener('play', () => { this.isPlaying = true; });
        this.MediaElement.addEventListener('pause', () => { this.isPlaying = false; });

        this.init()
            .then(() => {
                this.loading = false;
                this.MediaElement.dispatchEvent(new CustomEvent('init'));
            });
    }

    /**
     * @returns {string}
     */
    get currentSource(){
        return this.MediaElement.src;
    }

    /**
     * @param {string} source - File to serve to the media element
     */
    set currentSource(source){
        this.MediaElement.src = source || '';
    }

    /**
     * @returns {string}
     */
    get poster(){
        return this.MediaElement.poster;
    }

    /**
     * @param {string} poster - File to serve to the media element
     */
    set poster(poster){
       this.MediaElement.poster = poster;
    }

    /**
     * @returns {number}
     */
    get currentVolume() {
        return this.MediaElement.volume;
    }

    /**
     * @param {number} volume - Number between 0 and 1
     */
    set currentVolume(volume) {
        this.MediaElement.volume = volume || 0.5;
    }

    get buffered(){
        return this.MediaElement.buffered;
    }

    /**
     * @returns {boolean}
     */
    get isMuted(){
        return this.MediaElement.muted;
    }

    /**
     * @param {boolean} muted
     */
    set isMuted(muted){
        this.MediaElement.muted = muted || false;
    }

    /**
     * @returns {boolean}
     */
    get isLoading(){
        return this.loading;
    }

    /**
     * @returns {boolean}
     */
    get isReady(){
        return this.MediaElement.readyState === 4;
    }

    /**
     * @returns {boolean}
     */
    get readyState(){
        return this.MediaElement.readyState;
    }
    /**
     * @returns {number} - Total duration of the media in seconds
     */
    get totalDuration(){
        return this.MediaElement.duration;
    }

    /**
     * @returns {number} - Current time in seconds
     */
    get currentTime(){
        return this.MediaElement.currentTime;
    }

    /**
     * @param {number} time - time to seek to in seconds
     */
    set currentTime(time){
        this.MediaElement.currentTime = time || 0;
    }

    /**
     * @returns {number} - Current time in percentage
     */
    get currentProgress(){
        return this.MediaElement.duration ? this.currentTime / this.MediaElement.duration : 0;
    }

    /**
     * @returns {number}
     */
    get playbackRate(){
        return this.MediaElement.playbackRate;
    }

    /**
     * @param {number} rate - Number to determine the speed of playback. 1 = 100%.
     */
    set playbackRate(rate){
        this.MediaElement.playbackRate = rate || 1;
    }

    /**
     * @returns {array}
     */
    get playbackQualities(){
        if(this.HLSInstance != null){
            return this.HLSInstance.levels.map((level, index) => {
                return {
                    label: level.name,
                    src: index
                }
            });
        }

        return this.sources.map((source, index) => {
            return {
                label: source.label,
                src: index
            }
        });
    }

    /**
     * @returns {number}
     */
    get currentPlaybackQuality(){
        if(this.HLSInstance != null){
            return this.HLSInstance.currentLevel;
        }
        else {
            const sourceStrings = this.sources.map(source => source.src);
            return sourceStrings.indexOf(this.currentSource);
        }
    }

    /**
     * @param {number} quality - Index in the sources/qualities array to load.
     */
    set currentPlaybackQuality(quality){
        if(this.HLSInstance != null){
            this.HLSInstance.currentLevel = quality;
        }
        else {
            const currentTime = this.currentTime;
            const currentPlaybackRate = this.playbackRate;

            this.currentSource = this.sources[quality].src;

            this.playbackRate = currentPlaybackRate;
            this.currentTime = currentTime;

            if(this.isPlaying){
                this.play();
            }
        }
    }

    /**
     * Force reload the contents of the player (may reset the currentTime back to 0)
     *
     * @returns {Promise} - resolved when the player reaches it's isReady state - rejected after 5 minutes
     */
    forceLoad(){
        return new Promise((resolve, reject) => {
            let ticks = 0;
            this.MediaElement.load();

            const interval = setInterval(() => {
                ticks++;

                if(this.isReady){
                    resolve(this.isReady);
                    clearInterval(interval);
                }

                if(ticks > 3000){
                    reject('Timed Out');
                    clearInterval(interval);
                }
            }, 100);
        });
    }

    /**
     * Initialize the Player
     *
     * @static
     * @returns {Promise}
     */
    init(){
        return new Promise(resolve => {
            if(this.HLSManifestURL){
                BasicVideo.loadHlsJs()
                    .then(loaded => {
                        if (loaded) {
                            this.HLSisSupported = window.Hls.isSupported();

                            if(this.HLSisSupported){
                                this.attachHls(this.HLSManifestURL).then(initialized => {
                                    this.forceLoad().then(() => {
                                        resolve(true);
                                    });
                                });
                            }
                            else {
                                resolve(false);
                            }
                        }
                    });
            }
            else {
                this.currentSource = this.sources[this.defaultSource] ? this.sources[this.defaultSource].src : '';
                this.forceLoad().then(() => {
                    resolve(true);
                });
            }
        })
    }

    /**
     * Play
     */
    play(){
        this.MediaElement.play().catch(() => {
            console.log(this.readyState);
        });
    }

    /**
     * Pause
     */
    pause(){
        this.MediaElement.pause();
    }

    /**
     * Load the hls.js library and append it to the dom
     *
     * I do this because the library is over 200KB minified, seems like overkill to include if the
     * user only wants to load simple mp4s etc..
     *
     * @static
     * @returns {Promise}
     */
    static loadHlsJs(){
        return new Promise(resolve => {
            if(!document.getElementById('hlsJS')){
                const script = document.createElement('script');

                script.setAttribute('id', 'hlsJS');
                script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/hls.js@latest');

                document.body.appendChild(script);

                script.addEventListener('load', () => {

                    resolve(true);
                });
            } else {
                document.getElementById('hlsJS').addEventListener('load', () => {
                    resolve(true);
                });
            }
        });
    }

    /**
     * Attach an hls.js instance to the video player
     *
     * @param manifest
     * @returns {Promise}
     */
    attachHls(manifest){
        this.HLSInstance = new Hls();

        return new Promise(resolve => {
            this.HLSInstance.attachMedia(this.MediaElement);

            // Attach Error Events to the Video Element
            this.HLSInstance.on(Hls.Events.ERROR, (event, data) => {
                this.MediaElement.dispatchEvent(new CustomEvent('HLSError', data));
            });

            // Load the Source
            this.HLSInstance.on(Hls.Events.MEDIA_ATTACHED, () => {
                this.HLSInstance.loadSource(manifest);

                this.HLSInstance.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                    resolve({event, data});
                });
            });
        });
    }
}