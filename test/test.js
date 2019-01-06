import BasicVideo from '../src/basic-video.js';

const expect = chai.expect;
const assert = chai.assert;

mocha.setup('bdd');

describe('Basic Video', function () {
    const mediaElement = document.getElementById('player');
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

    it('can get the ready state', function(){
        expect(basicVideo.readyState).to.be.a('number');
    });

    it('can fully load media', function(done){
        basicVideo.forceLoad().then(isReady => {
            if(isReady){
                assert.equal(isReady, true);
            }
        }).finally(done());
    });

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

    it('can get the total media duration', function(done){
        //Have to call the forceLoad method here to properly display the duration in a test environment
        basicVideo.forceLoad().then(isReady => {
            if(isReady){
                assert.equal(basicVideo.totalDuration, 29.279256);
            }
        }).finally(done());
    });

    it('can get the buffered timeranges object', function(){
        expect(basicVideo.buffered).to.have.property('length');
    });

    it('can get and set the current time', function(){
        basicVideo.currentTime = 10;

        assert.equal(basicVideo.currentTime, 10)
    });

    it('can get and set the playback rate', function(){
        basicVideo.playbackRate = 0.75;

        assert.equal(basicVideo.playbackRate, 0.75);
    });

    it('can play media', function(){
        basicVideo.play();
        assert.equal(basicVideo.isPlaying, true);
    });

    it('can pause media', function(){
        basicVideo.pause();
        assert.equal(basicVideo.isPlaying, false);
    });
});