// ------------------------------------------------------------------------------------------
var fun1 = function(Req, Flight){
	Req.find({}, function(err, requests){
		if(err){

		} else {
			requests.forEach(function(item){
				
				var costperseat = item.budget/item.nop;
				Flight.find({date: item.date, src: item.src, dest: item.dest}, function(err, flights){
					if(err){
						console.log(err);
					} else {
						flights.forEach(function(flight){
							flight = JSON.stringify(flight);
							flight = JSON.parse(flight);
							if(flight.vacancy>=item.nop && costperseat>=flight.cost){
								var text = 'Flight from ' + item.src + ' to ' + item.dest + ' on ' + item.date + ' is available now with ' + item.nop + ' seats vacant at Rs' + costperseat + ' per ticket.';
								sendmail(item.email, text);
								console.log(text);
								Req.remove({_id: item._id}, function(err, res){
									if(err){
										console.log('Some error occured while removing!');
										console.log(err);
									} else {
										console.log(res);
									}
								})
							}
						});
					}
				});


			});
		}
	});

}


// -------------------------------------------------------------------------------------------------

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

var sendmail = function(recv, text){
	text = text + '\n Go to https://airvistara.com to book your ticket. \n Thank you';
	const msg = {
	  to: recv,
	  from: 'bookontrigger-vistara@abcd.com',
	  subject: 'Your Vistara Flight request is now available',
	  text: text
	};
	sgMail.send(msg);
}

// --------------------------------------------------------------------------------------------------

module.exports={
	func: fun1,
	sendmail: sendmail,
};