ig.module( 'game.levels.green' )
.requires( 'impact.image','game.entities.SrGreen','game.entities.Arbol01','game.entities.Arbol02' )
.defines(function(){
LevelGreen=/*JSON[*/{"entities":[{"type":"EntitySrGreen","x":208,"y":288},{"type":"EntityArbol01","x":1140,"y":88},{"type":"EntityArbol02","x":1032,"y":380},{"type":"EntityArbol01","x":1508,"y":80},{"type":"EntityArbol02","x":1392,"y":348},{"type":"EntityArbol02","x":1748,"y":380},{"type":"EntityArbol01","x":1200,"y":628},{"type":"EntityArbol01","x":1580,"y":620},{"type":"EntityArbol02","x":1036,"y":892},{"type":"EntityArbol02","x":1408,"y":896},{"type":"EntityArbol02","x":1756,"y":920},{"type":"EntityArbol01","x":1172,"y":1132},{"type":"EntityArbol01","x":1516,"y":1156}],"layer":[{"name":"fondo_verde","width":4,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/fondo_verde.png","repeat":false,"preRender":false,"distance":"1","tilesize":512,"foreground":false,"data":[[0,0,1,2],[0,0,3,4],[0,0,5,6]]},{"name":"fondo_blanco","width":4,"height":3,"linkWithCollision":false,"visible":1,"tilesetName":"media/blanco.png","repeat":false,"preRender":false,"distance":"1","tilesize":512,"foreground":false,"data":[[1,1,0,0],[1,1,0,0],[1,1,0,0]]}]}/*]JSON*/;
LevelGreenResources=[new ig.Image('media/fondo_verde.png'), new ig.Image('media/blanco.png')];
});