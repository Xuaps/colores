ig.module(
	'plugins.debug'
)
.requires(
	'impact.system'
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

		beforeRun: function() {
			var timeBeforeRun = Date.now();
			this.debugTickAvg = this.debugTickAvg * 0.8 + (timeBeforeRun - this.debugRealTime) * 0.2;
			this.debugRealTime = timeBeforeRun;
		},
	
	
		afterRun: function() {
			var fps=Math.round(1000/this.debugTickAvg);
			ig.system.context.font = '20pt Garamond-Bold';
			ig.system.context.textAlign = 'left';
			ig.system.context.fillStyle="#000000";
			ig.system.context.fillText( 'fps '+ fps, 0, 20 );
		}
	});

	ig.debug=new Debug();

});