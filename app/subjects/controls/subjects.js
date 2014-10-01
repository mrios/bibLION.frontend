steal(
	'sigma/controls/abm'
,	'app/common/models/Subject.js'
).then(
	function()
	{
		Sigma.Abm(
			'Bib.Subjects'
		,	{
				defaults:
				{
					view_table:	'app/subjects/views/table.mustache'
				,	name: 'Tema'
				,	data:	
					{
						title: 'Temas'
					}
				,	titles:
					{
						create: 	'Crear Tema'
					,	update: 	'Editar Tema'
					}
				,	messages:
					{
						created: 	"Tema creado satisfactoriamiente."
					,	updated: 	"Tema editado satisfactoriamiente."
					,	deleted: 	"Tema removido satisfactoriamiente."
					,	failed: 	undefined
					,	modal_delete: 'Si elimina el Tema, no podrá recuperarlo'
					}
				,	table_data:
					{
						paginable: 	{
										limit:		5
									,	maxIndex:	7
									,	offset:		0
									}
					,	searcheable:'nombre'
					,	sorteable:  true
					}
				,	model: Bib.Subject
				,	form_data:
					[
								{
									type:	'text'
								,	name:	'description'
								,	label:	'Nombre'
								,	required: true
								}
							,	{
									type: 'button'
								,	class: 'btn-primary btn-md'
								,	name: 'save'
								,	label: 'Guardar'
								,	submit: true
								}
							]
				,	data:
					{
						title: 'ABM de Temas'
					}
				,	route:
					{
						route:	'/:option/:abm'
					,	abm:	'list'
					}
				}
			}
		,	{
				quickSearch: function(query)
				{
					return	query.value.toUpperCase()
				}
			}
		)
	}
)