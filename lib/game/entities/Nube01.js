ig.module('game.entities.Nube01')
	.requires('impact.entity')
	.defines(function(){
		EntityNube01 = ig.Entity.extend({
			name: 'Nube01',
			size: {x:369, y:165},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/nube01.png',369,165),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				
				this.pos.x-=1;
			}

		});
	});