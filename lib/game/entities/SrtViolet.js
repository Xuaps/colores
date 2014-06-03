ig.module('game.entities.SrtViolet')
	.requires('impact.entity')
	.defines(function(){
		EntitySrtViolet = ig.Entity.extend({
			name: 'SrtViolet',
			size: {x:292, y:331},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/srt_violet.png',292,331),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('pointing',0.041,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,23,0,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,23,0], true);
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('click')){
					this.currentAnim=this.anims.pointing.rewind();
				}
			}
		});
	});