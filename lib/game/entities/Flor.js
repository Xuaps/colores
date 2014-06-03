ig.module('game.entities.Flor')
	.requires('impact.entity')
	.defines(function(){
		EntityFlor = ig.Entity.extend({
			zIndex: 999,
			name: 'Flor',
			size: {x:148, y:150},
			animSheet: new ig.AnimationSheet('media/flor.png',148,150),
			direction:1,

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				this.currentAnim.angle+=this.direction*0.01;
				this.parent();
			}
		});
	});