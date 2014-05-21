ig.module('game.entities.Ola')
	.requires('impact.entity')
	.defines(function(){
		EntityOla = ig.Entity.extend({
			zIndex: 999,
			i:0,
			
			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				this.i=(this.i>100?0:this.i+1);
				this.pos.y+=10*Math.sin(0.5*this.i);
				this.parent();
			}
		});
	});