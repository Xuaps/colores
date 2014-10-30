ig.module(
  'plugins.phonegap-sound'
)
.requires(
  'impact.system'
)
.defines(function(){

  Sound = ig.Class.extend({
      init: function(src){
        this.audio = new Media( this._get_root_path()+src.replace('*', 'ogg'), function(){console.log("ok");}, function(error){console.log(error);});
      },

      play: function(){
        this.audio.play();
      },

      stop: function(){
        this.audio.stop();
      },

      _get_root_path: function(){
        return window.location.href.replace('index.html', '');
      }
  });

  Music = ig.Class.extend({
    add: function(sound){
      this.tracks.push(sound)
    },

    play: function(){
      this.tracks[0].play();
    },
    tracks:[],
    volume: null
  });

  ig.Sound=Sound;
  ig.music = new Music();

});
