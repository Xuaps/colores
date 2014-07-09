ig.module(
	'plugins.settings'
)
.requires(
	
)
.defines(function(){ "use strict";

	var Settings = ig.Class.extend({
		narration: true,
		music: true,
		language: 'es',
		uuid: undefined,

		init : function(){
			this.narration = localStorage.getItem('narration')
				?JSON.parse(localStorage.getItem('narration'))
				:true;
			this.music = localStorage.getItem('music')
				?JSON.parse(localStorage.getItem('music'))
				:true;
			this.language = localStorage.getItem('language') || 'es';
			this.uuid = localStorage.getItem('uuid') || this._guid();
		},

		save : function(){
			localStorage.setItem('narration', this.narration);
			localStorage.setItem('music', this.music);
			localStorage.setItem('language', this.language);
			localStorage.setItem('uuid', this.uuid);
		},

		_guid: function() {
		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		               .toString(16)
		               .substring(1);
		  }
		  return function() {
		    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		           s4() + '-' + s4() + s4() + s4();
		  }();
		}
	});

	ig.settings = new Settings();
	ig.settings.save();
});