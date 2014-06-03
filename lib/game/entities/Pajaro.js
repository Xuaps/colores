ig.module('game.entities.Pajaro')
	.requires('impact.entity')
	.defines(function(){
		EntityPajaro = ig.Entity.extend({
			name: 'Pajaro',
			size: {x:145, y:138},
			zIndex: 999,
			origY:0,

			animSheet: new ig.AnimationSheet('media/pajaro.png',145,138),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('fly',0.2,[1,2,1,2,1,2,1,2,0], true);
				this.vel.x=40;
				this.vel.y=10;
				this.origY=y;
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				if(this.pos.x>ig.game.screen.x+ig.system.realWidth){
					this.pos.x=(ig.system.realWidth/2)-(this.size.y*2);
					this.pos.y=this.origY;
				}
									
				if(this.currentAnim===this.anims.idle && this.currentAnim.loopCount>2){
					this.currentAnim = this.anims.fly.rewind();
				}

				if(this.currentAnim===this.anims.fly && this.currentAnim.frame===8){
					this.currentAnim=this.anims.idle.rewind();
				}

				if(this.currentAnim===this.anims.fly){
					this.pos.x+=1;
					this.pos.y-=1;
				}
			}

		});
	});