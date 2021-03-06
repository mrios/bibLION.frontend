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
						,	submit: true
						}
					]
				,	data:
					{
						title: 'ABM de Categorias'
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

			,	submitForm: function(instance,formData)
				{
					var	toSave
					=	{
							name: formData.attr('name.value')
						,	description: formData.attr('description.value')
						}
					return	_.isUndefined(instance)
							?	new Bib.Models.Category(toSave).save()
							:	instance.attr(toSave).save()
				}
			}
		)
	}
)