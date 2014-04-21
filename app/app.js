steal(
	'app/lib.js'
,	'app/controls/main'
,	'app/css/main.css'
// ,	'app/css/bootstrap.min.css'
// ,	'app/css/dashboard.css'
).then(
	function()
	{
		new	Bib.Main(
			can.$('body')
		,	{
				view: 'app/views/main/init.mustache'
			,	data:	
				{
					options:
					[
						{
							name:	'Prestamos'
						,	key:	'loan'
						}
					,	{
							name:	'Libros'
						,	key:	'book'
						}
					,	{
							name:	'Socios'
						,	key:	'member'
						}
					,	{
							name:	'Editoriales'
						,	key:	'editorial'
						}
					,	{
							name:	'Autores'
						,	key:	'author'
						}
					,	{
							name:	'Categorias'
						,	key:	'category'
						}
					,	{
							name:	'Temas'
						,	key:	'subject'
						}
					,	{
							name:	'Reportes'
						,	key:	'report'
						,	suboptions:
							[
								{
									name:	'Libros mas prestados'
								,	key:	'ranking_top_book'
								}
							,	{
									name:	'Socios en mora'
								,	key:	'ranking_fault_member'
								}
							]
						}
					]
				}
			,	route:
				{
					route: 'menu/:option'
				,	option:	'book'
				}
			,	routeKey:	'option'
			,	allowed_options: ['option']
			,	content: '.col-md-10'
			}
		)
	}
)