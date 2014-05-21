ig.module('game.entities.Nube02')
	.requires('impact.entity')
	.defines(function(){
		EntityNube02 = ig.Entity.extend({
			name: 'Nube02',
			size: {x:387, y:160},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/nube02.png',387,160),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				
				this.pos.x-=1.7;
			}

		});
	});