 /**
 *  @snow-emitter.js
 *  @version: 2.0
 *  @author: Luis Zuno
 *  @date: Feb 2013
 *  @copyright (c) 2013 Luis Zuno Aka Ansimuz, under The MIT License (see LICENSE)
 *
 *  This entity will randomly spawn snowflakes all over the screen. 
 */

ig.module(
    'game.entities.StrawberryEmitter'
).requires(
    'impact.entity',
    'game.entities.Strawberry'
).defines(function(){

    EntityStrawberryEmitter = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 170, 66, 0.7)',
        duration: 20,
        count: 11,
        nextEmit: null,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.size.x = ig.system.width;
            this.nextEmit = new ig.Timer();
            // start right away
            this.nextEmit.set( 0 );
        },
        update: function(){
            if(  this.nextEmit.delta() >= 0 && this.count > 0 ) {
                this.count--;
                this.nextEmit.set( this.duration / this.count );
                var x = this.randomRange(ig.game.screen.x, ig.game.screen.x + ig.system.width);
                var y = ig.game.screen.y;
                ig.game.spawnEntity( EntityStrawberry, x, y );
            }
        },
        randomRange: function(min, max){
            return Math.random() * (max - min) + min;
        }
    });
});