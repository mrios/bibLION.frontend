steal(
	'sigma/controls/form'
,	'app/common/models/Copy.js'
).then(
	function()
	{
		can.Control(
			'Bib.Searcher_copy'
		,	{
				defaults:
				{
					default_data: 	undefined
				,	view_table: 	'app/loans/views/table_searcher_copy.mustache'
				}
			}
		,	{
				init: function(element,options)
				{
					this.Table
					=	new	Sigma.Table(
							element
						,	{
								data:		Bib.Copy.filter
							,	view:		this.options.view_table
							,	paginable:	true
							,	queries:
								{
									pagination:
									{
										limit:		5
									,	maxIndex:	7
									,	offset:		0
									}
								,	sort:
									{
										by: 'number'
									,	order: 'desc'
									}
								}
							,	sorteable:		true
							,	searcheable:	true
							,	searchKey:		'number'
							,	onBeforeQuick: can.proxy(this.quickSearch,this)
							}
						)

					can.$('<p>')
						.addClass('text-muted text-center')
						.text('Seleccione un Copy para continuar con el proceso de prestamo')
						.appendTo(
							this.element
						)
				}

			,	quickSearch: function(query)
				{
					return	{}
					// _.isEmpty(query.value)
					// 		?	{}
					// 		:	{
					// 				operator: 'or'
					// 			,	filters:
					// 				[
					// 					{
					// 						field: 'lastName'
					// 					,	value: query.value.toUpperCase()
					// 					,	criteria: '%'
					// 					,	model: 'Member'
					// 					}
					// 				,	{
					// 						field: 'periodo'
					// 					,	value:	_.isEqual(query.value.split('-').length,1)
					// 								 ?	query.value.split('-')[0]
					// 								 :	query.value.split('-')[1]
					// 								 +	'-'
					// 								 +	(
					// 									 	_.isEqual(query.value.split('-')[0].length,1)
					// 										?	'0'+query.value.split('-')[0]
					// 										:	query.value.split('-')[0]
					// 									)
					// 					,	criteria: '%'
					// 					}
					// 				]
					// 			}
				}

			,	'table tbody tr td span.btn click': function(el,ev)
				{
					ev.stopPropagation()

					this.element.find('tr.active').removeClass('active')

					el.parents('tr').toggleClass('active')

					this.member_data
					= 	can.$(el.parents('tr')).data()

					if(this.element.find('tr.active').length == 1)
						can.trigger(
							this.element
						,	'next.sigma.wizard'
						,	{
								step: 'finish'
							,	data: this.options.default_data.attr('copy_data',this.member_data)
							}
						)
					else
						can.trigger(
							this.element
						,	'disable_next.sigma.wizard'
						)
				}
			
			}
		)
	}
)