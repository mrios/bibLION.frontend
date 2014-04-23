steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
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
	}
)