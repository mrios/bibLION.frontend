steal(
	'sigma/controls/menu'
,	'app/loans/controls/loans.js'
,	'app/books/controls/books.js'
,	'app/members/controls/members.js'
,	'app/editorials/controls/editorials.js'
,	'app/authors/controls/authors.js'
,	'app/categories/controls/categories.js'
,	'app/subjects/controls/subjects.js'
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
					steal.dev.log('BibLION.Loans')
					new	Bib.Loans(
						$element
					,	{	}
					)
				}
			,	_render_book: function($element)
				{	
					steal.dev.log('BibLION.Books')
					new	Bib.Books(
						$element
					,	{	}
					)
				}
			,	_render_member: function($element)
				{
					steal.dev.log('BibLION.Members')
					new	Bib.Members(
						$element
					,	{	}
					)	
				}

			,	_render_editorial: function($element)
				{
					steal.dev.log('BibLION.Editorials')
					new	Bib.Editorials(
						$element
					,	{	}
					)
				}

			,	_render_author: function($element)
				{
					steal.dev.log('BibLION.Authors')
					new	Bib.Authors(
						$element
					,	{	}
					)
				}

			,	_render_category: function($element)
				{
					steal.dev.log('BibLION.Categories')
					new	Bib.Categories(
						$element
					,	{	}
					)
				}

			,	_render_subject: function($element)
				{
					steal.dev.log('BibLION.Subjects')
					new	Bib.Subjects(
						$element
					,	{	}
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