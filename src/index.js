import BasicVideo from './basic-video.js';

document.addEventListener('DOMContentLoaded', function () {
    const mediaElement = document.getElementById('player');
    const basicVideo = new BasicVideo(mediaElement, {
        poster: 'https://d292x7cpdimrbp.cloudfront.net/video/poster.jpg',
        sources: [
            {
                src: 'https://d292x7cpdimrbp.cloudfront.net/video/1080.mp4',
                type: 'video/mp4',
                label: '1080'
            },
            {
                src: 'https://d292x7cpdimrbp.cloudfront.net/video/720.mp4',
                type: 'video/mp4',
                label: '720'
            },
            {
                src: 'https://d292x7cpdimrbp.cloudfront.net/video/480.mp4',
                type: 'video/mp4',
                label: '480'
            },
        ],
        hlsManifestUrl: 'https://d292x7cpdimrbp.cloudfront.net/video/video.m3u8'
    });
    const videoProgress = document.getElementById('progress');
    const playbackRateSelector = document.getElementById('rate');
    const playbackSourceSelector = document.getElementById('sources');
    const currentTimeDisplay = document.getElementById('currentTime');
    let currentTime = 0;

    document.body.addEventListener('click', event => {
        const elementClicked = event.target;

        if(elementClicked.getAttribute('id') === 'play'){
            basicVideo.play();
        }
        if(elementClicked.getAttribute('id') === 'pause'){
            basicVideo.pause();
        }
        if(elementClicked.getAttribute('id') === 'forward'){
            basicVideo.currentTime += 1;
        }
        if(elementClicked.getAttribute('id') === 'backward'){
            basicVideo.currentTime -= 1;
        }
    });

    basicVideo.MediaElement.addEventListener('timeupdate', event => {
        videoProgress.setAttribute('value', basicVideo.currentProgress * 100);
        currentTimeDisplay.innerHTML = Math.floor(basicVideo.currentTime);
    });

    playbackRateSelector.addEventListener('change', event => {
        basicVideo.playbackRate = event.target.value;
    });

    basicVideo.MediaElement.addEventListener('init', event => {
        basicVideo.playbackQualities.forEach(source => {
            let option = document.createElement('option');
            option.setAttribute('value', source.src);
            option.innerHTML = source.label;

            let currentQuality = basicVideo.currentPlaybackQuality === -1 ?
                basicVideo.HLSInstance.startLevel :
                basicVideo.currentPlaybackQuality;

            if(source.src === currentQuality){
                option.setAttribute('selected', 'selected');
            }

            playbackSourceSelector.appendChild(option);
        });

        playbackSourceSelector.addEventListener('change', event => {
            basicVideo.currentPlaybackQuality = event.target.value;
        });
    });
});