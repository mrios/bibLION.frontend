steal(
	'sigma/controls/abm'
,	'app/common/models/Book.js'
,	'app/common/models/Editorial.js'
,	'app/common/models/Country.js'
).then(
	function()
	{
		Sigma.Abm(
			'Bib.Books'
		,	{
				defaults:
				{
					view_table:	'app/books/views/table.mustache'
				,	name: 'Libro'
				,	data:	
					{
						title: 'Libros'
					}
				,	titles:
					{
						create: 	'Crear Libro'
					,	update: 	'Editar Libro'
					}
				,	messages:
					{
						created: 	"Libro creado satisfactoriamiente."
					,	updated: 	"Libro editado satisfactoriamiente."
					,	deleted: 	"Libro removido satisfactoriamiente."
					,	failed: 	undefined
					,	modal_delete: 'Si elimina el Libro, no podrá recuperarlo'
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
				,	model: Bib.Book
				,	form_data:
					[
						{
							type:	'text'
						,	name:	'title'
						,	label:	'Título' 
						,	required: true
						}
					,	{
							type:	'text'
						,	name:	'isbn'
						,	label:	'ISBN'
						,	required: true 
						}
					,	{
							type:	'date'
						,	name:	'yearEdition'
						,	label:	'Año Edicion'
						,	format: 'yyyy'
						,	required: true
						}
					,	{
							type:	'select'
						,	name:	'editorial'
						,	label:	'Editorial'
						,	required: true
						, 	model: Bib.Editorial
							
						}
					,	{
							type:	'select'
						,	name:	'country'
						,	label:	'Pais'
						,	required: true 
						, 	model: Bib.Country
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
						title: 'ABM de Libros'
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
					return query.value.toUpperCase()
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