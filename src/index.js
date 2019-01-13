import BasicVideo from './basic-video.js';

document.addEventListener('DOMContentLoaded', function () {
    const mediaElement = document.getElementById('player');
    const basicVideo = new BasicVideo(mediaElement, {
        poster: 'https://i.vimeocdn.com/video/749166331.jpg',
        sources: [
            {
                src: 'https://player.vimeo.com/external/308908354.hd.mp4?s=d93801291faee691b318e7d12bad2dbb222cf93f&profile_id=175',
                type: 'video/mp4',
                label: '1080p'
            },
            {
                src: 'https://player.vimeo.com/external/308908354.hd.mp4?s=d93801291faee691b318e7d12bad2dbb222cf93f&profile_id=174',
                type: 'video/mp4',
                label: '720p'
            },
            {
                src: 'https://player.vimeo.com/external/308908354.sd.mp4?s=16821499a6f70001a224aefbb4717b6886be2953&profile_id=165',
                type: 'video/mp4',
                label: '540p'
            },
            {
                src: 'https://player.vimeo.com/external/308908354.sd.mp4?s=16821499a6f70001a224aefbb4717b6886be2953&profile_id=164',
                type: 'video/mp4',
                label: '360p'
            }
        ],
        hlsManifestUrl: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
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