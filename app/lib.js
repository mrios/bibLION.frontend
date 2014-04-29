steal(
	'can/util'
).then(
	function()
	{
		Milkrun
		=	{
				config:
				{
					base:	'app/'
				,	img:	'app/img/'
				}
			}
		
		// can.ajaxPrefilter(
		// 	function(options,originalOptions,jqXHR)
		// 	{
		// 		if	(!can.fixture || !can.fixture.on)
		// 		{
		// 			options.url
		// 			=	// si estoy en el server dejamos
		// 			(_.last(options.url.split('.')) != 'mustache')
		// 				// TEST (PC - Adrian)
		// 				//?	'http://localhost:8080'+originalOptions.url
		// 				?	'http://172.16.4.75:8080'+originalOptions.url
		// 					// SERVER
		// 				//?	'http://192.168.0.12:8080'+originalOptions.url
		// 				:	originalOptions.url

		// 			if	(options.data && !(options.data instanceof FormData))
		// 			{
		// 				options.data
		// 				=	JSON
		// 						.stringify(
		// 							originalOptions.data
		// 						)
		// 			}
		// 		}
		// 	}
		// )

		// can.ajaxSetup(
		// 	{
		// 		contentType: 'application/json'	
		// 	}
		// )

		Date.prototype.getFullDate = function()
		{
			return	((this.getDate()) < 10)
					?	'0'+this.getDate()
					:	this.getDate()
		}

		Date.prototype.getFullMonth = function()
		{
			return	((this.getMonth()+1) < 10)
					?	'0'+(this.getMonth()+1)
					:	(this.getMonth()+1)
		}

		Date.prototype.getFullHours = function () {
			return	(this.getHours() < 10)
					?	'0'+this.getHours()
					:	this.getHours()
		}

		Date.prototype.getDMY = function()
		{
			return	this.getFullDate() + '/' + this.getFullMonth() + '/' + this.getFullYear()
		}

		Date.prototype.getYMD = function()
		{
			return	this.getFullYear() + '-' + this.getFullMonth() + '-' + this.getFullDate()
		}

		Date.prototype.getFullMinutes = function () {
			return	(this.getMinutes() < 10)
					?	'0'+this.getMinutes()
					:	this.getMinutes()
		}

		Date.prototype.getTotalMinutes = function()
		{
			return	this.getHours()*60 + this.getMinutes()
		}

		Date.prototype.setMinutesOffset = function(minutes)
		{
			this.setHours(Math.floor(minutes/60))

			this.setMinutes(minutes - Math.floor(minutes/60)*60)

			return	this
		}

		Date.prototype.toMonthYear = function()
		{
			return	this.getFullMonth()+'-'+this.getFullYear()
		}

		Date.prototype.toLocalJSON = function()
		{
			var	auxDate
			=	this
			
			auxDate.setHours(auxDate.getHours() - (auxDate.getTimezoneOffset()/60))
			
			var newDate
			=	new Date(auxDate).toJSON()

			return	newDate.split('T')[0]+' '+newDate.split('T')[1].split('Z')[0]
		}

		Date.prototype.getHoursAndMinutes = function()
		{
			return	this.getFullHours() + ':' + this.getFullMinutes()
		}

		Date.prototype.getTotalDaysForMonth = function()
		{
			var self
			=	this
			return	_.filter(
						_.range(1,32)
					,	function(days)
						{
							self.setDate(days)
							return self.getDate() == days
						}
					).length
		}

		Array.prototype.clone = function() {
			return this.slice(0);
		}
	}
)