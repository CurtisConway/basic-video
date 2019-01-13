Basic Video Player
===

A simple and consistient API wrapper for the HTMLMediaElement API

Supports all default features for `<video>` and `<audio>` tags, with some additional functionality.

Getters/Setters
---

| Prop                   | Type      | Get | Set | Info |
|------------------------|-----------|-----|-----|------|
| currentSource          | String    | x   | x   | Current media source being played
| poster                 | String    | x   | x   | Poster on the video element
| currentVolume          | Number    | x   | x   | Current volume of the media
| buffered               | Object    | x   |     | TimeRanges object (buffered.start(0) and buffered.end(0) to get the range)
| isMuted                | Boolean   | x   | x   | Mute status the player
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
| Event                | Info                 |
|----------------------|----------------------|
| init                 | called after the init function resolves

You can also hook into all of the DOM Events available to the [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

```javascript
basicVideo.MediaElement.addEventListener('play' => event {
    console.log(event);
)
```