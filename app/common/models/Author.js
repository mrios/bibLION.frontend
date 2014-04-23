steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
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
	}
)