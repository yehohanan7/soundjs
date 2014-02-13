#soundjs
A module to access [soundcloud](https://www.soundcloud.com) from nodejs. 
you can do operations like uploading a track, adding the uploaded track to a specific playlist etc

This module is being built mainly to port multiple audio files from any of your existing repository to soundcloud.

## Install
```bash
npm install soundjs
```


## Usage


Authenticating with sound cloud

``` javascript
var SoundCloud = require('soundjs');

var sc = new SoundCloud(clientId, clientSecret, userName, password, redirectUri);

```

Fetching all playlists available (will return a promise)
``` javascript
sc.playlists().then(function(playlist) {
  console.log(playlist);
});

```

Uploading a new track

``` javascript
var fs = require('fs');
function source() {
  return fs.createReadStream('path/to/your/audio/file');
}
sc.addTrack(title, description, genre, source).then(function(track){
  console.log('uploaded track');
  console.log(track);
});

```

Complete example of Uploading a new track and adding it to an existing playlist

``` javascript
var sc = new SoundCloud(clientId, clientSecret, userName, password, redirectUri);

sc.playlists().then(function(playlist) {
    var playList = _.findWhere(playlist, {'title': 'playlistname'})

    function source() {
      return fs.createReadStream('path/to/your/audio/file');
    }

    sc.addTrack('test playlist', 'test desc', 'test genre', source).then(function(track) {
        playList.addTrack(track);
    });
})


```


