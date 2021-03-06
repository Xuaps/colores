ig.module('game.entities.Arbol')
	.requires('impact.entity')
	.defines(function(){
		EntityArbol = ig.Entity.extend({
			zIndex: 999,

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('move',0.061,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,
					28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				if(this.currentAnim===this.anims.idle){
					this.currentAnim=this.anims.move.rewind();
				}
			}
		});
	});