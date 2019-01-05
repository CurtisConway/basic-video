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
        this.sources = sources;
        this.currentSource = sources[defaultSource] ? sources[defaultSource].src : '';
        this.poster = poster;
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
       this.MediaElement.poster = poster || '';
    }
}