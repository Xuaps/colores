ig.module( 'game.levels.todos' )
.requires( 'impact.image','game.entities.Question' )
.defines(function(){
LevelTodos=/*JSON[*/{"name":"LevelTodos","entities":[{"type":"EntityQuestion","x":632,"y":96}],"layer":[{"name":"fondo","width":4,"height":3,"linkWithCollision":false,"visible":true,"tilesetName":"media/fondo_todos.png","repeat":false,"preRender":false,"distance":"1","tilesize":256,"foreground":false,"data":[[1,2,0,0],[3,4,0,0],[5,6,0,0]]},{"name":"fondo_blanco","width":4,"height":3,"linkWithCollision":false,"visible":true,"tilesetName":"media/blanco.png","repeat":false,"preRender":false,"distance":"1","tilesize":256,"foreground":false,"data":[[0,0,1,1],[0,0,1,1],[0,0,1,1]]}]}/*]JSON*/;
LevelTodosResources=[new ig.Image('media/fondo_todos.png'), new ig.Image('media/blanco.png')];
});