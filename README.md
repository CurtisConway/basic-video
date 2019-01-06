#Basic Video Player

A simple and consistient API wrapper for the HTMLMediaElement API

Supports all default features for `<video>` and `<audio>` tags, with some additional functionality.

###Props
| Prop             | Type      | Get | Set | Info |
|------------------|-----------|-----|-----|------|
| currentSource    | String    | x   | x   | Current media source being played
| poster           | String    | x   | x   | Poster on the video element
| currentVolume    | Number    | x   | x   | Current volume of the media
| buffered         | Object    | x   |     | TimeRanges object (buffered.start(0) and buffered.end(0) to get the range)
| isMuted          | Boolean   | x   | x   | Mute status the player
| isReady          | Boolean   | x   |     | Can the media play through without interruption
| readyState       | Number    | x   |     | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState)
| totalDuration    | Number    | x   |     | Total duration of the media in seconds
| currentTime      | Number    | x   | x   | The current time of the media in seconds
| currentProgress  | Number    | x   |     | The current progress percentage of the media
| playbackRate     | Number    | x   | x   | The playback rate of the media (1 for normal, 0.5 for half etc...)

###Methods
| Method           | Params    | Returns | Info |
|------------------|-----------|---------|------|
| forceLoad        |           | Promise | Forces the player to reload the media, returns a promise that resolves when the isReady prop returns true. Times itself out after 5 minutes.
| play             |           |         | Play the media
| pause            |           |         | Pause the media

###Events
