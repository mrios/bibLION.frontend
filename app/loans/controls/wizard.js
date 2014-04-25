steal(
	'sigma/controls/wizard'
,	'app/loans/controls/searcher_member.js'
,	'app/loans/controls/searcher_book.js'
,	'app/loans/controls/finish.js'
).then(
	function()
	{
		Sigma.Wizard(
			'Bib.Wizard_Loan'
		,	{
				defaults:
				{
					view:	'app/common/views/wizard/template.mustache'
				,	data:
					{
						steps:
						[
							{
								label:	'Buscar Socio'
							,	key:	'searcher_member'
							,	initial: true
							}
						,	{
								label:	'Buscar Libro'
							,	key:	'searcher_book'
							}
						,	{
								label:	'Finalizar'
							,	key:	'finish'
							,	final:	true
							}
						]
					}
				,	hidden: true
				}
			}
		,	{
				_render_searcher_member: function($element,wizard_data)
				{
					steal.dev.log('Bib.Loan.Search_member')
					new	Bib.Searcher_member(
						$element
					,	{
							default_data: wizard_data
						}
					)
				}

			,	_render_searcher_book: function($element,wizard_data)
				{
					steal.dev.log('Bib.Loan.Search_book')
					new	Bib.Searcher_book(
						$element
					,	{
							default_data: wizard_data
						}
					)
				}

			,	_render_finish: function($element,wizard_data)
				{
					steal.dev.log('Bib.Loan.Finish')
					new	Bib.Finish(
						$element
					,	{
							default_data: wizard_data
						}
					)
				}			
			}
		)
	}
)