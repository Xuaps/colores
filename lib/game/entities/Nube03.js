ig.module('game.entities.Nube03')
	.requires('impact.entity')
	.defines(function(){
		EntityNube03 = ig.Entity.extend({
			name: 'Nube03',
			size: {x:386, y:168},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/nube03.png',386,168),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				
				this.pos.x-=2;
			}

		});
	});