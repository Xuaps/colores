ig.module(
	'plugins.check-touch-button'
)
.requires(
	'plugins.touch-button'
)
.defines(function(){ "use strict";

	ig.CheckTouchButton = ig.TouchButton.extend({
		tileChecked:0,
		tileNonChecked:1,
		checked:0,
		related_buttons:[],

		init: function( action, anchor, width, height, image, tileChecked, tileNonChecked, checked) {
			this.tileChecked=tileChecked || 0;
			this.tileNonChecked=tileNonChecked || 1;
			this.checked=checked || 0;

			this.parent(action,anchor,width,height,image,this.checked?tileChecked:tileNonChecked);
		},

		checkEnd: function( id ) {
			var res=this.parent(id);

			if(res){
				if(this.related_buttons.length>0){
					this.related_buttons.forEach(function(button){
						button.tile=button.tileNonChecked;
						button.checked=0;
					});
					this.checked=1;
					this.tile=this.tileChecked;
				}else{
					this.checked=!this.checked;
					this.tile=(this.checked)?this.tileChecked:this.tileNonChecked;	
				}
			}

			return res;
		},
	});
});