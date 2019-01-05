import BasicVideo from './src/basic-video.js';

document.addEventListener('DOMContentLoaded', function(){
    const mediaElement = document.getElementById('player');

   window.BasicVideo = new BasicVideo(mediaElement, {
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
});