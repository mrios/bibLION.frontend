steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
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
	}
)