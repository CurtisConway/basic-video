Basic Video
===

A simple and consistent API for web video playback

Supports all default features for `<video>` and `<audio>` tags, with some additional functionality.

This repo exists solely as an API layer around the default HTMLMediaElement. It's sole purpose is to provide basic video playback for a developer to create their own custom video player.

To see a sample of the api with custom controls. Check out the [basic-video-player](https://github.com/CurtisConway/basic-video-player) repository.

Getting Started
---

`npm install basic-video`
```html
<video id="player" preload="auto" controls>
```
###### MP4
```javascript
import BasicVideo from 'basic-video';

const basicVideo = new BasicVideo(document.getElementById('player'), {
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
});
```

###### HLS
```javascript
import BasicVideo from 'basic-video';

const basicVideo = new BasicVideo(document.getElementById('player'), {
    poster: 'https://d292x7cpdimrbp.cloudfront.net/video/poster.jpg',
    hlsManifestUrl: 'https://d292x7cpdimrbp.cloudfront.net/video/video.m3u8',
});
```

Getters/Setters
---

```javascript
//Get
const currentTime = basicVideo.currentTime;

//Set
basicVideo.currentTime = 30;
```

| Prop                   | Type      | Get | Set | Info |
|------------------------|-----------|-----|-----|------|
| currentSource          | String    | x   | x   | Current media source being played
| poster                 | String    | x   | x   | Poster on the video element
| currentVolume          | Number    | x   | x   | Current volume of the media
| buffered               | Object    | x   |     | TimeRanges object (buffered.start(0) and buffered.end(0) to get the range)
| isMuted                | Boolean   | x   | x   | Mute the player
| isReady                | Boolean   | x   |     | Can the media play through without interruption
| readyState             | Number    | x   |     | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState)
| totalDuration          | Number    | x   |     | Total duration of the media in seconds
| currentTime            | Number    | x   | x   | The current time of the media in seconds
| currentProgress        | Number    | x   |     | The current progress percentage of the media
| playbackRate           | Number    | x   | x   | The playback rate of the media (1 for normal, 0.5 for half etc...)
| playbackQualities      | Array     | x   |     | An array of all available qualities with their label and source
| currentPlaybackQuality | Number    | x   | x   | Current index of the playbackQualities array

Methods
---
```javascript
basicVideo.play();
```

| Method               | Params               | Returns | Info |
|----------------------|----------------------|---------|------|
| init                 |                      | Promise | Initialize the player with existing props (invoked in the constructor). Can be used to refresh the player if you want
| forceLoad            |                      | Promise | Forces the player to reload the media, returns a promise that resolves when the isReady prop returns true. Times itself out after 5 minutes.
| play                 |                      |         | Play the media
| pause                |                      |         | Pause the media
| loadHlsJs *(static)* |                      |         | Create a script element with the latest version of [hls.js](https://github.com/video-dev/hls.js) 
| attachHls            | manifest *(string)*  |         | Attach an instance of hls.js to the video element with am HLS Manifest URL

Events
---

All events are emit from the MediaElement object (the `<video>` element you injected into the player).

| Event                | Info                 |
|----------------------|----------------------|
| init                 | emit after the init function resolves

You can also hook into all of the DOM Events available to the [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

```javascript
basicVideo.MediaElement.addEventListener('play' => event {
    console.log(event);
)
```
