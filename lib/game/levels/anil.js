ig.module( 'game.levels.anil' )
.requires( 'impact.image','game.entities.SrIndigo','game.entities.Ola01' )
.defines(function(){
LevelAnil=/*JSON[*/{"entities":[{"type":"EntitySrIndigo","x":212,"y":564},{"type":"EntityOla01","x":876,"y":1136}],"layer":[{"name":"fondo_anil","width":4,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/fondo_anil.png","repeat":false,"preRender":false,"distance":"1","tilesize":512,"foreground":false,"data":[[0,0,1,2],[0,0,3,4],[0,0,5,6]]},{"name":"fondo_blanco","width":4,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/blanco.png","repeat":false,"preRender":false,"distance":"1","tilesize":512,"foreground":false,"data":[[1,1,0,0],[1,1,0,0],[1,1,0,0]]}]}/*]JSON*/;
LevelAnilResources=[new ig.Image('media/fondo_anil.png'), new ig.Image('media/blanco.png')];
});