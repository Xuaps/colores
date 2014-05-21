ig.module('game.entities.Nube04')
	.requires('impact.entity')
	.defines(function(){
		EntityNube04 = ig.Entity.extend({
			name: 'Nube04',
			size: {x:507, y:236},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/nube04.png',507,236),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				
				this.pos.x-=1.2;
			}

		});
	});