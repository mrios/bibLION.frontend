steal(
	'sigma/controls/abm'
,	'app/loans/controls/wizard.js'
,	'app/common/models/Loan.js'
).then(
	function()
	{
		Sigma.Abm(
			'Bib.Loans'
		,	{
				defaults:
				{
					view_table:	'app/loans/views/list.mustache'
				,	name: 'Prestamo'
				,	data:	
					{
						title: 'Prestamos'
					}
				,	titles:
					{
						create: 	'Crear Prestamo'
					,	update: 	'Editar Prestamo'
					}
				,	messages:
					{
						created: 	"Prestamo creado satisfactoriamiente."
					,	updated: 	"Prestamo editado satisfactoriamiente."
					,	deleted: 	"Prestamo removido satisfactoriamiente."
					,	failed: 	undefined
					,	modal_delete: 'Si elimina el Prestamo, no podrá recuperarlo'
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
				,	model: Bib.Loan
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
						,	class: 'btn-primary btn-md'
						,	name: 'save'
						,	label: 'Guardar'
						}
					]
				,	data:
					{
						title: 'Listado de Prestamos'
					}
				,	route:
					{
						route:	'/:option/:abm'
					,	abm:	'list'
					}
				}
			}
		,	{
				_render_new: function($element)
				{
					this.newForm
					=	new	Bib.Wizard_Loan(
							$element.parents('#new')
						,	{	}
						)
				}

			,	quickSearch: function(query)
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