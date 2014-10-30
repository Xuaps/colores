ig.module(
	'plugins.utils'
)
.requires(
	'impact.system'
)
.defines(function(){

	TextUtils = ig.Class.extend({
		print:function(sentence, anchor, increment){
			var pos = this.align(anchor, this.textSize(sentence, increment));
			// console.log(pos);
			sentence.split('\n').forEach(function(sentence){
				ig.system.context.fillText(sentence, pos.x, pos.y);
				pos.y+=increment;
			});
		},

		align: function(anchor, size) {
			var pos={};
			var w = ig.system.width || window.innerWidth;
			var h = ig.system.height || window.innerHeight;
			
			if( 'left' in anchor ) {
				pos.x = anchor.left;
			}
			else if( 'right' in anchor ) {
				pos.x = w - anchor.right - size.x;
			}
			if( 'top' in anchor ) {
				pos.y = anchor.top;
			}
			else if( 'bottom' in anchor ) {
				pos.y = h - anchor.bottom - size.y;
			}
			
			return pos;
		},

		textSize: function(sentence, increment){
			var sentences = sentence.split('\n');
			var size=ig.system.context.measureText(sentences[0]);

			return {
				x:ig.system.context.measureText(sentences[0]).width, 
				y: parseInt(ig.system.context.font)+(increment*sentences.length)
			};
		},
	});

	ig.utils = new TextUtils();
});