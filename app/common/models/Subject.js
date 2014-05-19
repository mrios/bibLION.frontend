steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
	{
		Sigma.Model(
			'Bib.Subject'
		,	{
				url: 'http://localhost:8080/api/subjects'
			,	filter: function(queries)
				{
					return	can.ajax(
								{
									method: 'POST'
								,	url: 'http://localhost:8080/api/subjects/filter'
								,	data: queries
								}
							).pipe(
								function(raw)
								{
									return	{
												items: Bib.Subject.models(raw.items)
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