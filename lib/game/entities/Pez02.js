ig.module('game.entities.Pez02')
	.requires('impact.entity')
	.defines(function(){
		EntityPez02 = ig.Entity.extend({
			zIndex: 999,
			name: 'Pez02',
			size: {x:150, y:99},
			animSheet: new ig.AnimationSheet('media/pez02.png',150,99),
			
			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				this.currentAnim.angle+=0.01;
				this.parent();
			}
		});
	});