ig.module(
	'plugins.debug'
)
.requires(
	'impact.system',
	'impact.font'
)
.defines(function(){


	ig.System.inject({	
		run: function() {
			ig.debug.beforeRun();
			this.parent();
			ig.debug.afterRun();
		}
	});

	Debug = ig.Class.extend({
		debugTickAvg: 0.016,
		debugRealTime: Date.now(),
		font_black: new ig.Font( 'media/garab_black.font.png' ),

		beforeRun: function() {
			var timeBeforeRun = Date.now();
			this.debugTickAvg = this.debugTickAvg * 0.8 + (timeBeforeRun - this.debugRealTime) * 0.2;
			this.debugRealTime = timeBeforeRun;
		},
	
	
		afterRun: function() {
			var fps=Math.round(1000/this.debugTickAvg);
			this.font_black.draw( 'fps '+ fps, 0, 0, ig.Font.ALIGN.LEFT );
		}
	});

	ig.debug=new Debug();

});