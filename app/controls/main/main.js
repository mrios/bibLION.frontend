steal(
	'sigma/controls/menu'
,	'sigma/controls/table'
,	'sigma/controls/form'
,	'sigma/controls/abm'
,	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
	{
		Sigma.Menu(
			'Bib.Main'
		,	{
				view:		'sigma/views/menu/init.mustache'
			
			}
		,	{
				_render_loan: function($element)
				{
					
					var	loansData
					=	[
							{id: 1, member: 'Franco Soto', book: 'book 1', fecha_devolucion_pactada: '01/12/13', fecha_devolucion_real: ''}
						]

					can.fixture(
						'POST /loans/listar'
					,	function(req,res)
						{
							var	Filtered
							=	req.data.query
								?	_.filter(
										loanData
									,	function(persona)
										{
											return	persona[req.data.query.key] == req.data.query.value
										}
									)
								:	loansData
							,	offset
							=	req.data.pagination.offset
							,	limit
							=	req.data.pagination.limit
							,	Sorted
							=	req.data.sort
								?	_.sortBy(
										Filtered
									,	function(persona,index)
										{
											return	persona[req.data.sort.by]
										}
									)
								:	Filtered
							,	Paginated
							=	_.filter(
									req.data.sort && req.data.sort.order == 'asc'
									?	Sorted.reverse()
									:	Sorted
								,	function(persona,index)
									{
										return	(index >= offset) && (index < (offset + limit))
									}
								)

							return	{
										items: Paginated
									,	count: Filtered.length
									}
						}
					)

					can.Model(
						'loans'
					,	{
							listar: function(queries)
							{
								return	can.ajax(
											{
												method: 'POST'
											,	url: '/loans/listar'
											,	data: queries
											}
										).pipe(
											function(raw)
											{
												return	{
															items: loans.models(raw.items)
														,	count: raw.count
														}
											}
										)
							}
						}
					,	{	}
					)
					
					new	Sigma.Table(
						$element
					,	{	
							data: loans.listar
						,	view: 'app/views/loans/table.mustache'
						,	paginable: true
						,	queries:
							{
								pagination:
								{
									limit: 5
								,	maxIndex: 7
								,	offset: 0
								}
							}
						,	sorteable:	true
						}
					)
				}
			,	_render_book: function($element)
				{

					Sigma.Model(
						'Book'
					,	{
							filter: function(queries)
							{
								return	can.ajax(
											{
												method: 'POST'
											,	url: '//localhost:8080/api/books'
											,	data: queries
											}
										).pipe(
											function(raw)
											{
												return	{
															items: Book.models(raw.items)
														,	count: raw.count
														}
											}
										)
							}
						}
					,	{	}
					)
					
					new	Sigma.Abm(
							$element
					,	{
							name: 'Libro'
						,	view_table: 'app/views/books/table.mustache'
						,	model: Book 
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
								,	name:	'editorialId'
								,	label:	'Editorial'
								,	required: true
								, 	ajax:
									{
										url:'//localhost:8080/api/editorials'
									,	type:'POST'
									}
								}
							,	{
									type:	'select'
								,	name:	'countryId'
								,	label:	'Pais'
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
								title: 'ABM de Libros'
							}
						,	table_data:
							{
								paginable: 	{
												limit:		5
											,	maxIndex:	7
											,	offset:		0
											} //query con datos de paginación
							,	searcheable:'name' //key de búsqueda
							,	sorteable: 	true
							}
						,	route:
							{
								route:	'/:option/:abm'
							,	abm:	'list'
							}
						}
					)
				}
			,	_render_member: function($element)
				{
					Sigma.Model(
						'Member'
					,	{
							filter: function(queries)
							{
								return	can.ajax(
											{
												method: 'POST'
											,	url: '//localhost:8080/api/members'
											,	data: queries
											}
										).pipe(
											function(raw)
											{
												return	{
															items: Member.models(raw.items)
														,	count: raw.count
														}
											}
										)
							}
						}
					,	{	}
					)

					new	Sigma.Abm(
							$element
					,	{
							name: 'Socio'
						,	view_table: 'app/views/members/table.mustache'
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
						,	table_data:
							{
								paginable: 	{
												limit:		5
											,	maxIndex:	7
											,	offset:		0
											} //query con datos de paginación
							,	searcheable:'name' //key de búsqueda
							,	sorteable: 	true
							}
						,	route:
							{
								route:	'/:option/:abm'
							,	abm:	'list'
							}
						}
					)
				}

			,	_render_editorial: function($element)
				{

					Sigma.Model(
						'Editorial'
					,	{
							filter: function(queries)
							{
								return	can.ajax(
											{
												method: 'POST'
											,	url: '//localhost:8080/api/editorials'
											,	data: queries
											}
										).pipe(
											function(raw)
											{
												return	{
															items: Editorial.models(raw.items)
														,	count: raw.count
														}
											}
										)
							}
						}
					,	{	}
					)

					new	Sigma.Abm(
							$element
					,	{
							name: 'Editorial'
						,	view_table: 'app/views/editorials/table.mustache'
						,	model: Editorial 
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
								title: 'ABM de Editoriales'
							}
						,	table_data:
							{
								paginable: 	{
												limit:		5
											,	maxIndex:	7
											,	offset:		0
											} //query con datos de paginación
							,	searcheable:'name' //key de búsqueda
							,	sorteable: 	true
							}
						,	route:
							{
								route:	'/:option/:abm'
							,	abm:	'list'
							}
						}
					)
				}

			,	_render_author: function($element)
				{

					Sigma.Model(
						'Author'
					,	{
							filter: function(queries)
							{
								return	can.ajax(
											{
												method: 'POST'
											,	url: '//localhost:8080/api/authors'
											,	data: queries
											}
										).pipe(
											function(raw)
											{
												return	{
															items: Author.models(raw.items)
														,	count: raw.count
														}
											}
										)
							}
						}
					,	{	}
					)

					new	Sigma.Abm(
							$element
					,	{
							name: 'Autor'
						,	view_table: 'app/views/authors/table.mustache'
						,	model: Author
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
								title: 'ABM de Autores'
							}
						,	table_data:
							{
								paginable: 	{
												limit:		5
											,	maxIndex:	7
											,	offset:		0
											} //query con datos de paginación
							,	searcheable:'name' //key de búsqueda
							,	sorteable: 	true
							}
						,	route:
							{
								route:	'/:option/:abm'
							,	abm:	'list'
							}
						}
					)
				}

			,	_render_category: function($element)
				{

					Sigma.Model(
						'Category'
					,	{
							filter: function(queries)
							{
								return	can.ajax(
											{
												method: 'POST'
											,	url: '//localhost:8080/api/categories'
											,	data: queries
											}
										).pipe(
											function(raw)
											{
												return	{
															items: Category.models(raw.items)
														,	count: raw.count
														}
											}
										)
							}
						}
					,	{	}
					)

					new	Sigma.Abm(
							$element
					,	{
							name: 'Categoria'
						,	view_table: 'app/views/categories/table.mustache'
						,	model: Category
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
								title: 'ABM de Categorias'
							}
						,	table_data:
							{
								paginable: 	{
												limit:		5
											,	maxIndex:	7
											,	offset:		0
											} //query con datos de paginación
							,	searcheable:'name' //key de búsqueda
							,	sorteable: 	true
							}
						,	route:
							{
								route:	'/:option/:abm'
							,	abm:	'list'
							}
						}
					)
				}

			,	_render_subject: function($element)
				{

					Sigma.Model(
						'Subject'
					,	{
							filter: function(queries)
							{
								return	can.ajax(
											{
												method: 'POST'
											,	url: '//localhost:8080/api/subjects'
											,	data: queries
											}
										).pipe(
											function(raw)
											{
												return	{
															items: Subject.models(raw.items)
														,	count: raw.count
														}
											}
										)
							}
						}
					,	{	}
					)

					new	Sigma.Abm(
							$element
					,	{
							name: 'Subject'
						,	view_table: 'app/views/subjects/table.mustache'
						,	model: Subject
						,	form_data:
							[
								{
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
								title: 'ABM de Temas'
							}
						,	table_data:
							{
								paginable: 	{
												limit:		5
											,	maxIndex:	7
											,	offset:		0
											} //query con datos de paginación
							,	searcheable:'name' //key de búsqueda
							,	sorteable: 	true
							}
						,	route:
							{
								route:	'/:option/:abm'
							,	abm:	'list'
							}
						}
					)
				}

			,	'.navegable click':function($el,ev)
				{
					can.$(can.find("#currentSection")).html(can.trim($el.text()))
				}
					
			,	_render_opcion_4_1: function($element)
				{
					new	Sigma.Form(
						$element
					,	{	
							data: [
								{
									type:	'text'
								,	name:	'member'
								,	label:	'member' 
								}
							,	{
									type:	'text'
								,	name:	'book'
								,	label:	'book' 
								}
							,	{
									type:	'date'
								,	name:	'fecha_devolucion_pactada'
								,	label:	'Fecha devolucion pactada' 
								}
							,	{
									type: 'button'
								,	class: 'btn-primary btn-md'
								,	name: 'save'
								,	label: 'Guardar'
								}
							]	
							//,	default_data:	Persona
							,	id:	'myForm'
							,	class:	'form'
							,	type: 'form-horizontal'
						}
					)
				}
			}
		)
	}
)