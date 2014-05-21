ig.module('game.entities.Nube05')
	.requires('impact.entity')
	.defines(function(){
		EntityNube05 = ig.Entity.extend({
			name: 'Nube05',
			size: {x:456, y:202},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/nube05.png',456,202),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				
				this.pos.x-=1.5;
			}

		});
	});