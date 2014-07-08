ig.module(
	'plugins.game_history'
)
.requires(
	'impact.system'
)
.defines(function(){


	ig.System.inject({	
		setGame: function(gameClass) {
			this.referrerGameClass=this.actualGameClass;
			this.actualGameClass=gameClass;
			this.parent(gameClass);
		},

		setGameNow: function(gameClass) {
			this.parent(gameClass);
			ig.game.referrer=this.referrerGameClass;
		},
	});
});