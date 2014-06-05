ig.module(
	'plugins.whiteboard'
)
.requires(
	
)
.defines(function(){ "use strict";

	window.WhiteBoard = ig.Class.extend({
		paint:false,
		drawingAreaX:0,
		drawingAreaY:0,
		drawingAreaWidth:0,
		drawingAreaHeight:0,
		curSize: "huge",
		curColor: "#000000",
		scale:1,
		pos:null,
		clickColor:[],
		clickX: [],
		clickY: [],
		clickDrag: [],
		clickSize: [],

		init: function(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight){
			this.drawingAreaX=drawingAreaX;
			this.drawingAreaY=drawingAreaY;
			this.drawingAreaWidth=drawingAreaWidth;
			this.drawingAreaHeight=drawingAreaHeight;

			// Add mouse event listeners to canvas element
			canvas.addEventListener("mousedown", this.press.bind(this), false);
			canvas.addEventListener("mousemove", this.drag.bind(this), false);
			canvas.addEventListener("mouseup", this.release.bind(this));
			canvas.addEventListener("mouseout", this.cancel.bind(this), false);

			// Add touch event listeners to canvas element
			canvas.addEventListener("touchstart", this.press.bind(this), false);
			canvas.addEventListener("touchmove", this.drag.bind(this), false);
			canvas.addEventListener("touchend", this.release.bind(this), false);
			canvas.addEventListener("touchcancel", this.cancel.bind(this), false);
		},

		press: function (e) {
			this.paint = true;
			this.addClick(this.mouseX(e), this.mouseY(e), false);
			this.redraw();
		},

		drag: function (e) {
			if (this.paint) {
				this.addClick(this.mouseX(e), this.mouseY(e), true);
			}
		},

		release: function () {
			this.paint = false;
		},

		cancel: function () {
			this.paint = false;
		},

		redraw: function () {

			var radius, i;

			// Keep the drawing in the drawing area
			ig.system.context.save();
			ig.system.context.beginPath();
			ig.system.context.rect(this.drawingAreaX, this.drawingAreaY, this.drawingAreaWidth, this.drawingAreaHeight);
			ig.system.context.clip();

			// For each point drawn
			for (i = 0; i < this.clickX.length; i += 1) {

				// Set the drawing radius
				switch (this.clickSize[i]) {
					case "small":
						radius = 2;
						break;
					case "normal":
						radius = 5;
						break;
					case "large":
						radius = 10;
						break;
					case "huge":
						radius = 20;
						break;
					default:
						break;
					}

				ig.system.context.beginPath();
				// If dragging then draw a line between the two points
				if (this.clickDrag[i] && i) {
					ig.system.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
				} else {
					// The x position is moved over one pixel so a circle even if not dragging
					ig.system.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
				}
				ig.system.context.lineTo(this.clickX[i], this.clickY[i]);
				ig.system.context.strokeStyle = this.clickColor[i];
				ig.system.context.lineCap = "round";
				ig.system.context.lineJoin = "round";
				ig.system.context.lineWidth = radius;
				ig.system.context.stroke();
			}

			ig.system.context.closePath();
			ig.system.context.restore();
		},

		addClick: function (x, y, dragging) {

			this.clickX.push(x);
			this.clickY.push(y);
			this.clickColor.push(this.curColor);
			this.clickSize.push(this.curSize);
			this.clickDrag.push(dragging);
		},

		mouseX: function(event){
			this.calculatePixels();
			var ev = event.touches ? event.touches[0] : event;
			return (ev.clientX - this.pos.left) / this.scale;
		},

		mouseY: function(event){
			this.calculatePixels();
			var ev = event.touches ? event.touches[0] : event;
			return (ev.clientY - this.pos.top) / this.scale;
		},

		calculatePixels: function(){
			var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
			this.scale = ig.system.scale * (internalWidth / ig.system.realWidth);
			
			var pos = {left: 0, top: 0};
			if( ig.system.canvas.getBoundingClientRect ) {
				this.pos = ig.system.canvas.getBoundingClientRect();
			}
		}
	});
});