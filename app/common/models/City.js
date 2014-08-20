steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
	{
		Sigma.Model(
			'Bib.City'
		,	{
				url: '//localhost:8080/api/cities'

			,	filter: function(queries)
				{
					return	can.ajax(
								{
									method: 'POST'
								,	url: '//localhost:8080/api/cities/filter'
								,	data: queries
								}
							).pipe(
								function(raw)
								{
									return	{
												items: Bib.City.models(raw.items)
											,	count: raw.count
											}
								}
							)
				}
			}
		,	{
				getLabel: function(){
					return this.attr("description")
				}
			,	getValue: function(){
					return this.attr("id")	
				}	
			}
		)
	}
)