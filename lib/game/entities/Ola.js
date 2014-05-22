ig.module('game.entities.Ola')
	.requires('impact.entity')
	.defines(function(){
		EntityOla = ig.Entity.extend({
			zIndex: 999,
			i:0,
			origY:0,
			origX:0,
			velocity:40,
			radious:2,
			
			init: function(x,y,settings){
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},

			update: function(){
				//console.log(this.i);
				var limit=2*Math.PI;
				var increase=Math.PI/ 100;
				this.i=(this.i>limit?0:this.i+increase);
				
				this.pos.y=this.origY-(this.velocity*Math.sin(this.radious*this.i));
				//TODO: eliminar rebote
				if(this.i<Math.PI){
					this.pos.x=this.origX+(this.velocity*this.i);
				}else{
					this.pos.x=this.origX+(this.velocity*(limit-this.i));
				}
				//this.pos.x+=50*(this.i<Math.PI?increase:-increase);
				this.parent();
			}
		});
	});