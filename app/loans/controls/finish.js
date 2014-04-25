steal(
	'sigma/controls/form'
,	'sigma/controls/form/modal.js'
,	'app/common/models/Loan.js'
).then(
	function()
	{
		can.Control(
			'Bib.Finish'
		,	{
				defaults:
				{
					default_data: undefined
				,	view:	'app/medios_y_contenedores/views/medio_o_contenedor/preview.mustache'
				}
			}
		,	{
				init: function(element,options)
				{
					console.log(options.default_data)

					var wizard_data
					=	
					{
						member: 	options.default_data.member_data.value.lastName + ', ' + options.default_data.member_data.value.name
					,	book: 		options.default_data.book_data.value.title
					,	dateLoan: 	'24-04-2014'
					}

					console.log(wizard_data)
					this.LoanForm
					=	new	Sigma.Form(
						can.$('<form>')
							.appendTo(
								element
							)	
					,	{
							data:
							[
								{
									type:	'text'
								,	name:	'member'
								,	label:	'Socio'
								,	disabled:	true
								}
							,	{
									type:	'text'
								,	name:	'book'
								,	label:	'Libro'
								,	disabled:	true
								}
							,	{
									type:	'date'
								,	name:	'dateLoan'
								,	label:	'Fecha Prestamo'
								,	format: 'dd-mm-yyyy'
								}
							,	{
									type:	'date'
								,	name:	'dateReturnAgreed'
								,	label:	'Fecha Devolución (pactada)'
								,	format: 'dd-mm-yyyy'
								}
							,	{
									type:	'date'
								,	name:	'dateReturnReal'
								,	label:	'Fecha Devolución (real)'
								,	format: 'dd-mm-yyyy'
								}
							,	{
									type:	'button'
								,	name:	'submit'
								,	submit:	true
								,	label:	'Guardar'
								,	'class': 'btn-primary'
								}
							]
						,	default_data:	wizard_data
						,	onSubmit: can.proxy(this.submitForm,this,undefined)
						,	type: 'form-horizontal'
						,	'class': 'col-md-8 col-md-offset-1'
						}
					)
				}

			,	'done.sigma.wizard': function(el,ev,data)
				{
					console.log(data)
					// new	Milkrun.Models.AgrupadorEstructura(
					// 	can.extend(
					// 		{
					// 			idTipoEstructura: Number(data.attr('datos_basicos.tipoEstructura.data.id'))
					// 		,	nombre: data.attr('datos_basicos.nombre.value')
					// 		,	peso: data.attr('datos_basicos.peso.value') 	
					// 		,	largo: Number(data.attr('datos_basicos.largo.value'))
					// 		,	ancho: Number(data.attr('datos_basicos.ancho.value'))
					// 		,	altura: Number(data.attr('datos_basicos.altura.value'))
					// 		,	apilableEntreSi: data.attr('datos_basicos.apilableEntreSi.data.value')
					// 		,	rotarVertical: data.attr('datos_basicos.rotarVertical.data.value')
					// 		,	rotarHorizontal: data.attr('datos_basicos.rotarHorizontal.data.value')
					// 		,	Estructura:	data.attr('datos_basicos.estructuras')
					// 		}
					// 	,	data.attr('datos_basicos.alturaEstructura.value')
					// 		?	{}
					// 		:	{
					// 				AlturaEstructura:
					// 				{
					// 					alturaEstructura:	Number(data.attr('datos_basicos.alturaEstructura.value'))
					// 				}
					// 			}
					// 	,	data.attr('apilabilidad.apilabilidad') && data.attr('apilabilidad.apilabilidad').length < 1
					// 		?	{}
					// 		:	{
					// 				Apilabilidad:
					// 					can.map(
					// 						data.attr('apilabilidad.apilabilidad')
					// 					,	function(estructura)
					// 						{
					// 							return	{
					// 										estructuraApilableCon:	estructura.attr('id')
					// 									}
					// 						}
					// 					)
					// 			}
					// 	,	data.attr('estructura_base.estructura_base') && data.attr('estructura_base.estructura_base').length < 1
					// 		?	{}
					// 		:	{
					// 				EstructuraBase:
					// 				{
					// 					idEstructura: data.attr('estructura_base.estructura_base.0.id')
					// 				,	cantidadColumnas: data.attr('estructura_base.estructura_base.0.cantidadColumnas')
					// 				}
					// 			}
					// 	/*,	_.isUndefined()
					// 		?	{}
					// 		:	{
					// 				SeparadorEstructura:
					// 				{
					// 					idSeparador: data.attr('separador.0.id')
					// 				}
					// 			}*/
					// 	,	!_.isEmpty(data.attr('accesibilidad'))
					// 		?	{}
					// 		:	{
					// 				accesibilidad:
					// 				{
					// 					lateralDerecho: data.attr('accesibilidad.lateralDerecho')
					// 				,	lateralIzquierdo: data.attr('accesibilidad.lateralIzquierdo')
					// 				,	posterior: data.attr('accesibilidad.posterior')
					// 				,	frontal: data.attr('accesibilidad.frontal')
					// 				}
					// 			}
					// 	)
					// ).save()
				}

			,	'table tbody tr a click': function()
				{
					this.$modal
					=	can.$('<div>')
					new	Sigma.Form.Modal(
						this.$modal
					,	{
							data:
							[
								{
									type:	'text'
								,	name:	'nombre'
								,	label:	'Nombre'
								,	required: true
								,	validate: ['required','integer']
								,	addon: 
									{
										where: 'prepend'
									,	type: 'text'
									,	text: this.options.default_data.attr('nombre.value')
									}
								
								}
							,	{
									type:	'button'
								,	name:	'submit'
								,	submit:	true
								,	label:	'Guardar'
								,	'class': 'btn-primary'
								}
							]
						,	type: 'form-horizontal'
						,	onSubmit: can.proxy(this.submitForm,this)
						,	onSubmitText: 'Guardando'
						,	title: 'Nueva estructura del agrupador'
						}
					)					
				}

			,	'tr.estructura td.action .fa-times click': function(el,ev)
				{
					var agrupador
					=	can.$(el).parents('tr').data('agrupadorEstructura')

					new Sigma.Modal(
						can.$('<div>')
					,	{
							type: 'confirm'
						,	onConfirm: can.proxy(this.removeEstructura,this,el)
						,	data:
							{
								title: '¿Está seguro que desea realizar esta accion?'
							,	content: '¿Desea eliminar la estructura previamente agregada?'
							}
						}
					)
				}

			,	removeLoan: function(el)
				{
					this.options
						.default_data
							.attr('estructuras')
								.splice(
									this
										.element
											.find('table.estructuras')
												.index(
													can.$(el).parents('tr')
												)
								,	1
								)
				}

			,	submitForm: function(formData)
				{
					console.log(formData)
					// var	toSave
					// =	{
					// 		idNombreEmpresa: formData.attr('nombreEmpresa.data.id')
					// 	,	nombre: formData.attr('nombre.value')
					// 	,	nroCentro: formData.attr('nroCentro.value')
					// 	,	telefono: formData.attr('telefono.value')
					// 	,	email: formData.attr('email.value')
					// 	,	observaciones: formData.attr('observaciones.value')
					// 	}
					// return	_.isUndefined(instance)
					// 		?	new Milkrun.Models.CentroCosto(toSave).save()
					// 		:	instance.attr(toSave).save()

					return	can.Deferred().resolveWith({bool: true})
				}
			}
		)
	}
)