ig.module(
	'plugins.settings'
)
.requires(
	
)
.defines(function(){ "use strict";

	var Settings = ig.Class.extend({
		narration: true,
		music: true,
		language: 'es-ES',

		init : function(){
			this.narration = localStorage.getItem('narration')
				?JSON.parse(localStorage.getItem('narration'))
				:true;
			this.music = localStorage.getItem('music')
				?JSON.parse(localStorage.getItem('music'))
				:true;
			this.language = localStorage.getItem('language') || 'es-ES';
		},

		save : function(){
			localStorage.setItem('narration', this.narration);
			localStorage.setItem('music', this.narration);
			localStorage.setItem('language', this.language);
		}
	});

	ig.settings = new Settings();
});