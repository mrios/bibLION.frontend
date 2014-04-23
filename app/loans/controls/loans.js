steal(
	'sigma/controls/control'
,	'app/common/models/Loan.js'
).then(
	function()
	{
		Sigma.Control(
			'Bib.Loans'
		,	{
				defaults:
				{
					view_list:	'app/loans/views/list.mustache'
				,	name: 'Prestamo'
				,	data: Loan.filter
				}
			}
		,	{
			}
		)
	}
)