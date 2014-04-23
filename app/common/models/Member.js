steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
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
	}
)