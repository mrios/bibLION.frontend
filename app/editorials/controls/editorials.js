steal(
	'sigma/controls/abm'
,	'app/common/models/Editorial.js'
).then(
	function()
	{
		Sigma.Abm(
			'Bib.Editorials'
		,	{
				defaults:
				{
					view_table:	'app/editorials/views/table.mustache'
				,	name: 'Editorial'
				,	data:	
					{
						title: 'Editoriales'
					}
				,	titles:
					{
						create: 	'Crear Editorial'
					,	update: 	'Editar Editorial'
					}
				,	messages:
					{
						created: 	"Editorial creado satisfactoriamiente."
					,	updated: 	"Editorial editado satisfactoriamiente."
					,	deleted: 	"Editorial removido satisfactoriamiente."
					,	failed: 	undefined
					,	modal_delete: 'Si elimina la Editorial, no podrá recuperarla'
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
				,	model: Bib.Editorial
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
								,	submit: true
								}
							]
				,	data:
					{
						title: 'ABM de Editoriales'
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