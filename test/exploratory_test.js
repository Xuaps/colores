var assert = require('assert');

describe('sin', function(){
	describe('angle', function(){
		it('should return', function(){
			var y=0;
			for(var i=0;i<61;i+=0.58){
				var posY=y+Math.sin(i);
				
				console.log(i+'->'+ posY +'->'+((Math.atan(posY/i))||'juas'));
			}
		});
	});
});