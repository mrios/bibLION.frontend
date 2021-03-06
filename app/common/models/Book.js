steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
	{
		Sigma.Model(
			'Bib.Book'
		,	{
				url: '//localhost:8080/api/books'
				
			,	filter: function(queries)
				{
					return	can.ajax(
								{
									method: 'POST'
								,	url: '//localhost:8080/api/books/filter'
								,	data: queries
								}
							).pipe(
								function(raw)
								{
									return	{
												items: Bib.Book.models(raw.items)
											,	count: raw.count
											}
								}
							)
				}
			}
		,	{	}
		)
	}
)