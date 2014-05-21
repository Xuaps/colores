ig.module('game.entities.Pajaro')
	.requires('impact.entity')
	.defines(function(){
		EntityPajaro = ig.Entity.extend({
			name: 'Pajaro',
			size: {x:290, y:276},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/pajaro.png',290,276),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('fly',0.5,[1,2,0])
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				
				this.pos.x+=1;
			}

		});
	});