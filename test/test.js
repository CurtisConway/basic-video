const assert = require('assert');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
import BasicVideo from '../src/basic-video.js';

describe('Basic Video', function () {
    const dom = new JSDOM(`<!DOCTYPE html><video id="player"></video>`);
    const mediaElement = dom.window.document.getElementById('player');
    const basicVideo = new BasicVideo(mediaElement, {
        sources: [
            {
                src: 'https://dmmior4id2ysr.cloudfront.net/assets/docs/Splash_Short_Version_1080.mp4',
                type: 'video/mp4',
                label: '1080p'
            },
            {
                src: 'https://dmmior4id2ysr.cloudfront.net/assets/docs/Splash_Short_Version_540.mp4',
                type: 'video/mp4',
                label: '540p'
            }
        ],
        poster: ''
    });

    it('can get and set the poster', function () {
        basicVideo.poster = 'https://dmmior4id2ysr.cloudfront.net/assets/docs/poster.jpg';

        assert.equal(basicVideo.poster, 'https://dmmior4id2ysr.cloudfront.net/assets/docs/poster.jpg');
    });

    it('can get and set the current source from the sources array', function () {
        basicVideo.currentSource = basicVideo.sources[1].src;

        assert.equal(basicVideo.currentSource, basicVideo.sources[1].src);
    });

    // it('can play media', function(){
    //     basicVideo.play();
    //
    //     assert.true(basicVideo.isPlaying);
    // });
    //
    // it('can pause media', function(){
    //     basicVideo.pause();
    //
    //     assert.false(basicVideo.isPlaying);
    // });

    it('can change the media volume', function(){
        basicVideo.currentVolume = 0.75;

        assert.equal(basicVideo.currentVolume, 0.75);
    });

    it('can mute the media', function(){
        basicVideo.isMuted = true;

        assert.equal(basicVideo.isMuted, true);
    });

    it('can unmute the media', function(){
        basicVideo.isMuted = false;

        assert.equal(basicVideo.isMuted, false);
    });

    it('can get the total media duration', function(){
        assert.equal(basicVideo.totalDuration, 29)
    });

    it('can get and set the current time', function(){
        basicVideo.currentTime = 10;

        assert.equal(basicVideo.currentTime, 10)
    });

    it('can get and set the playback rate', function(){
        basicVideo.playbackRate = 0.75;

        assert.equal(basicVideo.playbackRate, 0.75);
    });
});