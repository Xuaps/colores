ig.module( 'game.levels.green' )
.requires( 'impact.image','game.entities.SrGreen' )
.defines(function(){
LevelGreen=/*JSON[*/{"entities":[{"type":"EntitySrGreen","x":208,"y":288}],"layer":[{"name":"fondo_verde","width":4,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/fondo_verde.png","repeat":false,"preRender":false,"distance":"1","tilesize":512,"foreground":false,"data":[[0,0,1,2],[0,0,3,4],[0,0,5,6]]},{"name":"fondo_blanco","width":4,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/blanco.png","repeat":false,"preRender":false,"distance":"1","tilesize":512,"foreground":false,"data":[[1,1,0,0],[1,1,0,0],[1,1,0,0]]}]}/*]JSON*/;
LevelGreenResources=[new ig.Image('media/fondo_verde.png'), new ig.Image('media/blanco.png')];
});