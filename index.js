import BasicVideo from './src/basic-video.js';

document.addEventListener('DOMContentLoaded', function () {
    const mediaElement = document.getElementById('player');
    const basicVideo = new BasicVideo(mediaElement, {
        poster: 'https://dmmior4id2ysr.cloudfront.net/assets/docs/poster.jpg',
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
        ]
    });
    const videoProgress = document.getElementById('progress');
    const playbackRateSelector = document.getElementById('rate');
    const playbackSourceSelector = document.getElementById('sources');
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
            basicVideo.currentTime += 10;
        }
        if(elementClicked.getAttribute('id') === 'backward'){
            basicVideo.currentTime -= 10;
        }
    });

    basicVideo.MediaElement.addEventListener('timeupdate', event => {
        videoProgress.setAttribute('value', basicVideo.currentProgress * 100);
    });

    playbackRateSelector.addEventListener('change', event => {
        basicVideo.playbackRate = event.target.value;
    });

    basicVideo.sources.forEach(source => {
        let option = document.createElement('option');
        option.setAttribute('value', source.src);
        option.innerHTML = source.label;

        playbackSourceSelector.appendChild(option);
    });

    playbackSourceSelector.addEventListener('change', event => {
        const currentTime = basicVideo.currentTime;
        basicVideo.currentSource =  event.target.value;
        basicVideo.currentTime = currentTime;
    });
});