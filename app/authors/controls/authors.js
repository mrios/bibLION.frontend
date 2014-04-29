steal(
	'sigma/controls/abm'
,	'app/common/models/Author.js'
).then(
	function()
	{
		Sigma.Abm(
			'Bib.Authors'
		,	{
				defaults:
				{
					view_table:	'app/authors/views/table.mustache'
				,	name: 'Autor'
				,	data:	
					{
						title: 'Autores'
					}
				,	titles:
					{
						create: 	'Crear Autor'
					,	update: 	'Editar Autor'
					}
				,	messages:
					{
						created: 	"Autor creado satisfactoriamiente."
					,	updated: 	"Autor editado satisfactoriamiente."
					,	deleted: 	"Autor removido satisfactoriamiente."
					,	failed: 	undefined
					,	modal_delete: 'Si elimina el Autor, no podrá recuperarlo'
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
				,	model: Bib.Author
				,	form_data:
					[
						{
							type:	'text'
						,	name:	'lastName'
						,	label:	'Apellido'
						,	required: true 
						}
					,	{
							type:	'text'
						,	name:	'name'
						,	label:	'Nombre' 
						}
					,	{
							type: 'button'
						,	name: 'submit'
						,	submit: true
						,	label: 'Guardar'
						,	kind:'btn-primary'
						}
					]
				,	data:
					{
						title: 'ABM de Autores'
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