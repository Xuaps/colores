ig.module( 
	'plugins.locales' 
)
.requires(
	
)
.defines(function(){
	ig.locales = { 
		'es-ES':{ 
			translation:{
				"rojo": {
					"presentacion":"¡Hola! Yo soy el color Rojo.",
					"frase":"Puedes encontrarme en comida tan rica...\n¡como las fresas! ¡Mmm!"
				},

				"naranja": {
					"presentacion":"Pues yo me llamo Naranja.",
					"frase":"Soy tan famoso\nque hasta una fruta lleva mi nombre."
				},

				"amarillo": {
					"presentacion":"¡Aquí estoy!\nSoy el color Amarillo.",
					"frase":"Fíjate cómo salgo\nde los rayos del sol."
				},

				"verde": {
					"presentacion":"Yo soy el color Verde.",
					"frase":"Estoy en la hierba y en las hojas.\n¡La naturaleza es lo mío!"
				},

				"azul": {
					"presentacion":"A mí todos me llaman Azul.",
					"frase": "¡Y ocupo toooodo el cielo!"
				}
			}
		}
	};
});