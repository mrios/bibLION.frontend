steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
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
	}
)