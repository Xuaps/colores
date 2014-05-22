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
				this.addAnim('fly',0.3,[1,2,0]);
				this.vel.x=40;
				this.vel.y=10;
				//this.accel.y=10;
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				if(this.pos.x>ig.game.screen.x+ig.system.realWidth){
					//this.pos.x=800;
					//this.pos.y=0;
				}

				//this.currentAnim = this.anims[Math.floor(Math.random() * 2)];
				if(this.currentAnim===this.anims.fly){
					//this.pos.y=+5;
				}
			}

		});
	});