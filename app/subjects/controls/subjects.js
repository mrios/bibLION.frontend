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
				,	model: Subject
				,	form_data:
					[
								{
									type:	'text'
								,	name:	'name'
								,	label:	'Nombre'
								,	required: true
								}
							,	{
									type: 'button'
								,	class: 'btn-primary btn-md'
								,	name: 'save'
								,	label: 'Guardar'
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
					return	_.isEmpty(query.value)
							?	{}
							:	{
									operator: 'or'
								,	filters:
									_.union(
										[
											{
												field: 'nombre'
											,	value: query.value.toUpperCase()
											,	criteria: '%'
											}
										]
									,	!_.isNaN(parseInt(query.value))
										?	[
												{
													field: 'nroCentro'
												,	value: query.value
												,	criteria: '='
												}
											]
										:	[]
									)
								}
				}

			,	submitForm: function(instance,formData)
				{
					var	toSave
					=	{
							idNombreEmpresa: formData.attr('nombreEmpresa.data.id')
						,	nombre: formData.attr('nombre.value')
						,	nroCentro: formData.attr('nroCentro.value')
						,	telefono: formData.attr('telefono.value')
						,	email: formData.attr('email.value')
						,	observaciones: formData.attr('observaciones.value')
						}
					return	_.isUndefined(instance)
							?	new Milkrun.Models.CentroCosto(toSave).save()
							:	instance.attr(toSave).save()
				}
			}
		)
	}
)