steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
	{
		Sigma.Model(
			'Bib.Loan'
		,	{
				url:	'//localhost:8080/api/loans'

			,	filter: function(queries)
				{
					return	can.ajax(
								{
									method: 'POST'
								,	url: '//localhost:8080/api/loans/filter'
								,	data: queries
								}
							).pipe(
								function(raw)
								{
									return	{
												items: Bib.Loan.models(raw.items)
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