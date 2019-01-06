export default class {
    /**
     * Construct a Basic Video Player
     *
     * @param {HTMLElement|HTMLVideoElement|HTMLAudioElement} element
     * @param {string} poster
     * @param {array} sources
     * @param {string|number} defaultSource
     */
    constructor(element, {
        poster,
        sources,
        defaultSource = 0
    }){
        this.MediaElement = element;
        this.MediaElement.controls = false;
        this.sources = sources;
        this.currentSource = sources[defaultSource] ? sources[defaultSource].src : '';
        this.poster = poster;
        this.isPlaying = false;

        console.log(this);
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
     * Play
     */
    play(){
        this.MediaElement.play();
        this.isPlaying = true;
    }

    /**
     * Pause
     */
    pause(){
        this.isPlaying = false;
        this.MediaElement.pause();
    }
}