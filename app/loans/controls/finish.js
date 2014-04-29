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

					var wizard_data
					=	
					{
						member: 	options.default_data.member_data.value.lastName + ', ' + options.default_data.member_data.value.name
					,	book: 		options.default_data.book_data.value.title
					,	copy: 		options.default_data.copy_data.value.id
							+ '  (Año: '+ options.default_data.copy_data.value.yearEdition 
							+ ', Valor: ' + options.default_data.copy_data.value.nominalValue 
							+ ')'
					,	dateLoan: 	new Date()
					}

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
								,	label:	' <i class="fa fa-user"></i> Socio'
								,	disabled:	true
								}
							,	{
									type:	'text'
								,	name:	'book'
								,	label:	'<i class="fa fa-book"></i> Libro'
								,	disabled:	true
								}
							,	{
									type:	'text'
								,	name:	'copy'
								,	label:	'<i class="fa fa-files-o"></i> Ejemplar'
								,	disabled:	true
								}
							,	{
									type:	'date'
								,	name:	'dateLoan'
								,	label:	'Fecha Prestamo'
								,	format: 'dd-mm-yyyy'
								,	disabled:	true
								}
							,	{
									type:	'date'
								,	name:	'dateReturnAgreed'
								,	label:	'Fecha Devolución (pactada)'
								,	format: 'dd-mm-yyyy'
								,	required: true
								}
							,	{
									type:	'date'
								,	name:	'dateReturnReal'
								,	label:	'Fecha Devolución (real)'
								,	format: 'dd-mm-yyyy'
								}
							]
						,	default_data:	wizard_data
						,	onSubmit: can.proxy(this.submitForm,this,undefined)
						,	type: 'form-horizontal'
						,	'class': 'col-md-8 col-md-offset-1'
						}
					)
				}

			,	'validated.sigma.form': function(el,ev,data)
				{
					can.trigger(
						this.element
					,	'final.sigma.wizard'
					,	{
							data:this.options.default_data
						}
					)
				}

			,	'invalidated.sigma.form': function(el,ev,data)
				{
					can.trigger(
						this.element
					,	'disable_final.sigma.wizard'
					)

				}

			,	'done.sigma.wizard': function(el,ev,data)
				{
					new	Bib.Loan(
							{
								memberId: parseInt(data.attr('finish.member_data.value.id'))
							,	bookId: parseInt(data.attr('finish.book_data.value.id'))
							,	copyId: parseInt(data.attr('finish.copy_data.value.id'))
							,	dateLoan: this.LoanForm.getFormData().attr('dateLoan.data').getYMD()
							,	dateAgreed: this.LoanForm.getFormData().attr('dateReturnAgreed.data')
									?this.LoanForm.getFormData().attr('dateReturnAgreed.data').getYMD()
									:''
							}
						).save()
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