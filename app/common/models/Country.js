steal(
	'sigma/models/model.js'
,	'can/util/fixture'
,	'can/model'
).then(
	function()
	{
		Sigma.Model(
			'Bib.Country'
		,	{
				url: '//localhost:8080/api/countries'

			,	filter: function(queries)
				{
					return	can.ajax(
								{
									method: 'POST'
								,	url: '//localhost:8080/api/countries/filter'
								,	data: queries
								}
							).pipe(
								function(raw)
								{
									return	{
												items: Bib.Country.models(raw.items)
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