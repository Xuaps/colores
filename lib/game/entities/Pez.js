ig.module('game.entities.Pez')
	.requires('impact.entity')
	.defines(function(){
		EntityPez = ig.Entity.extend({
			zIndex: 999,
			origY:0,
			refX:0,
			
			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.refX=x;
				this.vel.x=-35;
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				this.pos.y=this.origY-(100*Math.sin(0.01*this.pos.x));
				//this.refX=((this.origY-this.pos.y)===0?this.pos.x:this.refX);
				//this.anims.idle.angle=((90-Math.atan((this.origY-this.pos.y)/(this.refX-this.pos.x)))*Math.PI)/180;

				if(this.pos.x+this.size.x<(ig.game.screen.x+ig.system.realWidth)/2){
					this.pos.x=ig.system.realWidth;
					//this.refX=this.pos.x;
					this.origY= Math.floor(Math.random() * (ig.system.realHeight - 400 + 1) + 400);
				}
			}
		});
	});