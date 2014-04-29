steal(
	'sigma/controls/abm'
,	'app/common/models/Category.js'
).then(
	function()
	{
		Sigma.Abm(
			'Bib.Categories'
		,	{
				defaults:
				{
					view_table:	'app/categories/views/table.mustache'
				,	name: 'Categoría'
				,	data:	
					{
						title: 'Categorías'
					}
				,	titles:
					{
						create: 	'Crear Categoría'
					,	update: 	'Editar Categoría'
					}
				,	messages:
					{
						created: 	"Categoría creado satisfactoriamiente."
					,	updated: 	"Categoría editado satisfactoriamiente."
					,	deleted: 	"Categoría removida satisfactoriamiente."
					,	failed: 	undefined
					,	modal_delete: 'Si elimina la Categoría, no podrá recuperarla'
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
				,	model: Bib.Category
				,	form_data:
					[
						{
							type:	'text'
						,	name:	'name'
						,	label:	'Nombre'
						,	required: true
						}
					,	{
							type:	'text'
						,	name:	'description'
						,	label:	'Descripcion' 
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
						title: 'ABM de Categoryes'
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