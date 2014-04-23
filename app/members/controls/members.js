steal(
	'sigma/controls/abm'
,	'app/common/models/Member.js'
).then(
	function()
	{
		Sigma.Abm(
			'Bib.Members'
		,	{
				defaults:
				{
					view_table:	'app/members/views/table.mustache'
				,	name: 'Socio'
				,	data:	
					{
						title: 'Socios'
					}
				,	titles:
					{
						create: 	'Crear Socio'
					,	update: 	'Editar Socio'
					}
				,	messages:
					{
						created: 	"Socio creado satisfactoriamiente."
					,	updated: 	"Socio editado satisfactoriamiente."
					,	deleted: 	"Socio removido satisfactoriamiente."
					,	failed: 	undefined
					,	modal_delete: 'Si elimina el Socio, no podrá recuperarlo'
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
				,	model: Member
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
							type:	'text'
						,	name:	'dniCuil'
						,	label:	'DNI/Cuil' 
						,	required: true
						}
					,	{
							type:	'text'
						,	name:	'email'
						,	label:	'e-mail' 
						,	required: true
						}
					,	{
							type:	'text'
						,	name:	'telephone'
						,	label:	'Telefono' 
						}
					,	{
							type:	'select'
						,	name:	'cityId'
						,	label:	'Ciudad'
						,	options:
						[
							{
								label: 'Campana'
							,	value: 1
							}
						,	{
								label: 'Zárate'
							,	value: 2
							}
						]
						}
					,	{
							type:	'text'
						,	name:	'address'
						,	label:	'Domicilio' 
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
						title: 'ABM de Socios'
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