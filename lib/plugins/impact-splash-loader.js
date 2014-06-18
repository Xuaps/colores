ig.module(
	'plugins.impact-splash-loader'
)
.requires(
	'impact.loader'
)
.defines(function(){

ig.ImpactSplashLoader = ig.Loader.extend({

	endTime: 0,
	fadeToWhiteTime: 200,
	fadeToGameTime: 800,
	logoWidth: 341,
	logoHeight: 77,

	end: function() {
		this.parent();
		this.endTime = Date.now();

		// This is a bit of a hack - set this class instead of ig.game as the delegate.
		// The delegate will be set back to ig.game after the screen fade is complete.
		ig.system.setDelegate( this );
	},


	// Proxy for ig.game.run to show the screen fade after everything is loaded
	run: function() {	
		var t = Date.now() - this.endTime;
		var alpha = 1;
		if( t < this.fadeToWhiteTime ) {
			// Draw the logo -> fade to white
			this.draw();
			alpha = t.map( 0, this.fadeToWhiteTime, 0, 1);
		}
		else if( t < this.fadeToGameTime ) {
			// Draw the game -> fade from white
			ig.game.run();
			alpha = t.map( this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
		}
		else {
			// All done! Dismiss the preloader completely, set the delegate
			// to ig.game
			ig.system.setDelegate( ig.game );
			return;
		}

		// Draw the white rect over the whole screen
		ig.system.context.fillStyle = 'rgba(255,255,255,'+alpha+')';
		ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
	},


	draw: function() {
		// Some damping for the status bar
		this._drawStatus += (this.status - this._drawStatus)/5;

		var ctx = ig.system.context;
		var w = ig.system.realWidth;
		var h = ig.system.realHeight;
		//var scale = w / this.logoWidth / 3; // Logo size should be 1/3 of the screen width
		var scale = 1.5;
            var center = (w - this.logoWidth * scale)/2;

		// Clear
		ctx.fillStyle = 'rgba(0,0,0,0.8)';
		ctx.fillRect( 0, 0, w, h );

		// URL
		ctx.fillStyle = 'rgb(128,128,128)';
		ctx.textAlign = 'right';
		ctx.font = '10px ArialMT';
		ctx.fillText( 'Supporting your dreams - http://xuaps.com', w - 10, h - 10 );
		ctx.textAlign = 'left';


		ctx.save();

			ctx.translate( center, h / 2.5 );
			ctx.scale( scale, scale );

			// Loading bar ('visually' centered for the Impact logo)
			ctx.lineWidth = '3';
			ctx.strokeStyle = 'rgb(255,255,255)';
			ctx.strokeRect( 25, this.logoHeight + 40, 300, 20 );

			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.fillRect( 30, this.logoHeight + 45, 290 * this._drawStatus, 10 );		

			// Draw 'Impact' text
			this.drawLogo(ctx);

		ctx.restore();
	},


	drawLogo: function draw(ctx) {

      // capa1/Group
      ctx.save();

      // capa1/Group/Group
      ctx.save();

      // capa1/Group/Group/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(39.6, 28.0);
      ctx.lineTo(16.2, 4.6);
      ctx.bezierCurveTo(14.6, 5.6, 13.1, 6.6, 11.7, 7.7);
      ctx.bezierCurveTo(4.2, 13.9, -0.5, 23.1, 0.0, 33.4);
      ctx.bezierCurveTo(0.5, 42.2, 3.4, 49.9, 6.8, 56.0);
      ctx.bezierCurveTo(8.6, 59.2, 10.5, 62.0, 12.1, 64.4);
      ctx.lineTo(39.6, 37.0);
      ctx.bezierCurveTo(42.5, 34.1, 42.4, 30.9, 39.6, 28.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(102, 195, 207)";
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(50.0, 37.0);
      ctx.bezierCurveTo(50.0, 37.0, 58.7, 45.6, 66.8, 53.7);
      ctx.lineTo(66.8, 33.4);
      ctx.bezierCurveTo(66.8, 27.0, 65.0, 21.1, 61.9, 16.1);
      ctx.lineTo(50.0, 28.0);
      ctx.bezierCurveTo(47.1, 30.9, 47.2, 34.1, 50.0, 37.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(216, 219, 64)";
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(40.3, 37.7);
      ctx.lineTo(12.7, 65.3);
      ctx.bezierCurveTo(15.6, 69.3, 17.8, 71.7, 17.8, 71.7);
      ctx.lineTo(57.9, 76.4);
      ctx.lineTo(60.6, 54.5);
      ctx.lineTo(66.1, 54.5);
      ctx.lineTo(49.3, 37.7);
      ctx.bezierCurveTo(46.4, 34.8, 43.2, 34.8, 40.3, 37.7);
      ctx.closePath();
      ctx.fillStyle = "rgb(84, 173, 180)";
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(49.3, 27.3);
      ctx.lineTo(61.4, 15.2);
      ctx.bezierCurveTo(59.6, 12.5, 57.4, 10.0, 54.9, 7.9);
      ctx.bezierCurveTo(49.1, 3.0, 41.6, 0.0, 33.4, 0.0);
      ctx.bezierCurveTo(27.6, 0.0, 22.0, 1.5, 17.2, 4.1);
      ctx.lineTo(40.3, 27.3);
      ctx.bezierCurveTo(43.2, 30.1, 46.4, 30.1, 49.3, 27.3);
      ctx.closePath();
      ctx.fillStyle = "rgb(192, 191, 52)";
      ctx.fill();

      // capa1/Group/Group
      ctx.restore();

      // capa1/Group/Group/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(339.9, 40.0);
      ctx.bezierCurveTo(338.3, 32.8, 331.5, 32.2, 324.8, 31.5);
      ctx.bezierCurveTo(318.0, 30.8, 311.5, 30.2, 311.0, 22.6);
      ctx.bezierCurveTo(310.8, 20.1, 311.4, 18.0, 312.8, 16.2);
      ctx.bezierCurveTo(315.1, 13.2, 319.3, 11.4, 324.0, 11.3);
      ctx.lineTo(324.3, 11.3);
      ctx.bezierCurveTo(328.6, 11.3, 332.4, 12.7, 334.7, 15.2);
      ctx.bezierCurveTo(335.9, 16.5, 336.6, 18.0, 337.0, 19.8);
      ctx.bezierCurveTo(337.1, 20.3, 337.5, 20.6, 338.0, 20.5);
      ctx.bezierCurveTo(338.5, 20.5, 338.8, 20.0, 338.7, 19.5);
      ctx.bezierCurveTo(338.7, 19.5, 338.7, 19.5, 338.7, 19.5);
      ctx.bezierCurveTo(338.3, 17.3, 337.4, 15.5, 336.0, 14.0);
      ctx.bezierCurveTo(333.4, 11.2, 329.1, 9.6, 324.3, 9.6);
      ctx.lineTo(324.0, 9.6);
      ctx.bezierCurveTo(318.7, 9.6, 314.0, 11.7, 311.4, 15.1);
      ctx.bezierCurveTo(309.7, 17.2, 309.0, 19.8, 309.2, 22.8);
      ctx.bezierCurveTo(309.9, 31.8, 317.7, 32.6, 324.7, 33.3);
      ctx.bezierCurveTo(331.2, 33.9, 336.9, 34.5, 338.1, 40.4);
      ctx.bezierCurveTo(338.8, 43.4, 338.2, 46.2, 336.3, 48.5);
      ctx.bezierCurveTo(333.8, 51.7, 329.1, 53.6, 324.2, 53.6);
      ctx.bezierCurveTo(318.1, 53.6, 311.2, 50.3, 310.5, 44.1);
      ctx.bezierCurveTo(310.5, 43.6, 310.0, 43.2, 309.6, 43.3);
      ctx.bezierCurveTo(309.1, 43.3, 308.7, 43.8, 308.8, 44.2);
      ctx.bezierCurveTo(309.6, 51.5, 317.3, 55.4, 324.2, 55.4);
      ctx.bezierCurveTo(329.7, 55.4, 334.8, 53.2, 337.7, 49.6);
      ctx.bezierCurveTo(339.9, 46.9, 340.6, 43.6, 339.9, 40.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(184.7, 10.1);
      ctx.bezierCurveTo(184.2, 10.1, 183.8, 10.5, 183.8, 10.9);
      ctx.lineTo(183.8, 37.0);
      ctx.bezierCurveTo(183.8, 45.9, 176.5, 53.1, 167.7, 53.1);
      ctx.bezierCurveTo(158.8, 53.1, 151.5, 45.9, 151.5, 37.0);
      ctx.lineTo(151.5, 10.9);
      ctx.bezierCurveTo(151.5, 10.5, 151.1, 10.1, 150.6, 10.1);
      ctx.bezierCurveTo(150.2, 10.1, 149.8, 10.5, 149.8, 10.9);
      ctx.lineTo(149.8, 37.0);
      ctx.bezierCurveTo(149.8, 46.9, 157.8, 54.9, 167.7, 54.9);
      ctx.bezierCurveTo(177.5, 54.9, 185.5, 46.9, 185.5, 37.0);
      ctx.lineTo(185.5, 10.9);
      ctx.bezierCurveTo(185.5, 10.5, 185.1, 10.1, 184.7, 10.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Group/Group/Compound Path
      ctx.beginPath();

      // capa1/Group/Group/Compound Path/Path
      ctx.moveTo(276.2, 10.4);
      ctx.lineTo(261.9, 10.4);
      ctx.bezierCurveTo(261.4, 10.4, 261.0, 10.8, 261.0, 11.2);
      ctx.lineTo(261.0, 53.7);
      ctx.bezierCurveTo(261.0, 54.2, 261.4, 54.6, 261.9, 54.6);
      ctx.bezierCurveTo(262.4, 54.6, 262.7, 54.2, 262.7, 53.7);
      ctx.lineTo(262.7, 38.0);
      ctx.lineTo(276.2, 38.0);
      ctx.bezierCurveTo(283.8, 38.0, 290.0, 31.8, 290.0, 24.2);
      ctx.bezierCurveTo(290.0, 16.6, 283.8, 10.4, 276.2, 10.4);
      ctx.closePath();

      // capa1/Group/Group/Compound Path/Path
      ctx.moveTo(276.2, 36.2);
      ctx.lineTo(262.7, 36.2);
      ctx.lineTo(262.7, 12.1);
      ctx.lineTo(276.2, 12.1);
      ctx.bezierCurveTo(282.9, 12.1, 288.3, 17.5, 288.3, 24.2);
      ctx.bezierCurveTo(288.3, 30.8, 282.9, 36.2, 276.2, 36.2);
      ctx.closePath();
      ctx.fill();

      // capa1/Group/Group/Compound Path
      ctx.beginPath();

      // capa1/Group/Group/Compound Path/Path
      ctx.moveTo(222.4, 10.9);
      ctx.bezierCurveTo(222.2, 10.6, 221.9, 10.4, 221.6, 10.4);
      ctx.bezierCurveTo(221.2, 10.4, 220.9, 10.6, 220.8, 10.9);
      ctx.lineTo(201.6, 53.3);
      ctx.bezierCurveTo(201.4, 53.8, 201.6, 54.3, 202.1, 54.5);
      ctx.bezierCurveTo(202.5, 54.7, 203.0, 54.5, 203.2, 54.1);
      ctx.lineTo(208.8, 41.8);
      ctx.lineTo(234.4, 41.8);
      ctx.lineTo(239.9, 54.1);
      ctx.bezierCurveTo(240.1, 54.4, 240.4, 54.6, 240.7, 54.6);
      ctx.bezierCurveTo(240.8, 54.6, 241.0, 54.6, 241.1, 54.5);
      ctx.bezierCurveTo(241.5, 54.3, 241.7, 53.8, 241.5, 53.3);
      ctx.lineTo(222.4, 10.9);
      ctx.closePath();

      // capa1/Group/Group/Compound Path/Path
      ctx.moveTo(209.5, 40.1);
      ctx.lineTo(221.6, 13.4);
      ctx.lineTo(233.6, 40.1);
      ctx.lineTo(209.5, 40.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(89.6, 10.1);
      ctx.bezierCurveTo(89.3, 9.8, 88.7, 9.8, 88.4, 10.1);
      ctx.bezierCurveTo(88.1, 10.5, 88.1, 11.0, 88.4, 11.4);
      ctx.lineTo(107.1, 30.0);
      ctx.bezierCurveTo(107.2, 30.2, 107.5, 30.3, 107.7, 30.3);
      ctx.bezierCurveTo(107.9, 30.3, 108.1, 30.2, 108.3, 30.0);
      ctx.bezierCurveTo(108.6, 29.7, 108.6, 29.1, 108.3, 28.8);
      ctx.lineTo(89.6, 10.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(114.4, 34.9);
      ctx.bezierCurveTo(114.1, 34.6, 113.5, 34.6, 113.2, 34.9);
      ctx.bezierCurveTo(112.8, 35.3, 112.8, 35.8, 113.2, 36.1);
      ctx.lineTo(131.8, 54.8);
      ctx.bezierCurveTo(132.0, 55.0, 132.2, 55.1, 132.5, 55.1);
      ctx.bezierCurveTo(132.7, 55.1, 132.9, 55.0, 133.1, 54.8);
      ctx.bezierCurveTo(133.4, 54.5, 133.4, 53.9, 133.1, 53.6);
      ctx.lineTo(114.4, 34.9);
      ctx.closePath();
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(131.8, 10.1);
      ctx.lineTo(113.2, 28.8);
      ctx.bezierCurveTo(112.8, 29.1, 112.8, 29.7, 113.2, 30.0);
      ctx.bezierCurveTo(113.3, 30.2, 113.6, 30.3, 113.8, 30.3);
      ctx.bezierCurveTo(114.0, 30.3, 114.2, 30.2, 114.4, 30.0);
      ctx.lineTo(133.1, 11.4);
      ctx.bezierCurveTo(133.4, 11.0, 133.4, 10.5, 133.1, 10.1);
      ctx.bezierCurveTo(132.7, 9.8, 132.2, 9.8, 131.8, 10.1);
      ctx.closePath();
      ctx.fill();

      // capa1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(107.1, 34.9);
      ctx.lineTo(88.4, 53.6);
      ctx.bezierCurveTo(88.1, 53.9, 88.1, 54.5, 88.4, 54.8);
      ctx.bezierCurveTo(88.6, 55.0, 88.8, 55.1, 89.0, 55.1);
      ctx.bezierCurveTo(89.2, 55.1, 89.5, 55.0, 89.6, 54.8);
      ctx.lineTo(108.3, 36.1);
      ctx.bezierCurveTo(108.6, 35.8, 108.6, 35.3, 108.3, 34.9);
      ctx.bezierCurveTo(108.0, 34.6, 107.4, 34.6, 107.1, 34.9);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.restore();
      ctx.restore();
    }
});
});