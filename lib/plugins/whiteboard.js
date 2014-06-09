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
		curSize: "large",
		curColor: "#000000",
		scale:1,
		pos:null,

		init: function(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight){
			this.drawingAreaX=drawingAreaX;
			this.drawingAreaY=drawingAreaY;
			this.drawingAreaWidth=drawingAreaWidth;
			this.drawingAreaHeight=drawingAreaHeight;

			this.clearCanvas();

			// Add mouse event listeners to canvas element
			canvas.addEventListener("mousedown", this._press.bind(this), false);
			canvas.addEventListener("mousemove", this._drag.bind(this), false);
			canvas.addEventListener("mouseup", this._release.bind(this));
			canvas.addEventListener("mouseout", this._cancel.bind(this), false);

			// Add touch event listeners to canvas element
			canvas.addEventListener("touchstart", this._press.bind(this), false);
			canvas.addEventListener("touchmove", this._drag.bind(this), false);
			canvas.addEventListener("touchend", this._release.bind(this), false);
			canvas.addEventListener("touchcancel", this._cancel.bind(this), false);
		},

		clearCanvas: function () {
			ig.system.context.clearRect(this.drawingAreaX, this.drawingAreaY, this.drawingAreaWidth, this.drawingAreaHeight);
		},

		_press: function (e) {
			this.paint = true;
			this.lastX=this._mouseX(e);
			this.lastY=this._mouseY(e);
			this._paintPoint(this._mouseX(e) - 1, this._mouseY(e), this._mouseX(e), this._mouseY(e),this.curSize, this.curColor);
		},

		_drag: function (e) {
			if (this.paint) {
				this._paintPoint(this.lastX, this.lastY, this._mouseX(e), this._mouseY(e),this.curSize, this.curColor);
				this.lastX=this._mouseX(e);
				this.lastY=this._mouseY(e);
			}
		},

		_release: function () {
			this.paint = false;
		},

		_cancel: function () {
			this.paint = false;
		},

		_paintPoint: function(sourceX, sourceY, targetX, targetY, size, color){
			var radius;

			// Set the drawing radius
			switch (size) {
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
			ig.system.context.moveTo(sourceX, sourceY);
			ig.system.context.lineTo(targetX, targetY);
			ig.system.context.strokeStyle = color;
			ig.system.context.lineCap = "round";
			ig.system.context.lineJoin = "round";
			ig.system.context.lineWidth = radius;
			ig.system.context.stroke();
		},

		_mouseX: function(event){
			this._calculatePixels();
			var ev = event.touches ? event.touches[0] : event;
			return (ev.clientX - this.pos.left) / this.scale;
		},

		_mouseY: function(event){
			this._calculatePixels();
			var ev = event.touches ? event.touches[0] : event;
			return (ev.clientY - this.pos.top) / this.scale;
		},

		_calculatePixels: function(){
			var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
			this.scale = ig.system.scale * (internalWidth / ig.system.realWidth);
			
			var pos = {left: 0, top: 0};
			if( ig.system.canvas.getBoundingClientRect ) {
				this.pos = ig.system.canvas.getBoundingClientRect();
			}
		},
	});
});