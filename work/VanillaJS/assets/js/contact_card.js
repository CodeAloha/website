		function loadCardDirective(id, current){

			try{
				var html = 
				'<div id="contact-card-'+ id +'" class="col-4">' +
		  		  '<div class="card">' +
				    '<div class="card-content">' +
					'<h3>' + current.fname + ' ' + current.lname +  '</h3>' +
					  '<img src="'+ ( imgurl == "" ?  "assets/img/placeholder-hi.png" : current.image   ) +'" class="rounded" /><br/>'+
						'<p>' +
							current.geographics.city + ', ' + current.geographics.state + '<br>' +
							current.geographics.country +
						'</p>' +
						'<div class="contact-miscellaneous">' +
							'<i class="fa fa-envelope"></i> ' + current.email + '<br/>' +
							'<i class="fa fa-phone"></i> ' + current.phone + '<br/>' +
							'<br/>' +
							( current.social.facebook ? '<i class="fa fa-facebook-official"></i> ' + current.social.facebook + '<br/>' : "" ) +
							( current.social.twitter ? '<i class="fa fa-twitter"></i> ' + current.social.twitter + '<br/>' : "" ) +
							( current.social.github? '<i class="fa fa-github""></i> ' + current.social.github + '<br/>' : "" ) +
							( current.social.skype ? '<i class="fa fa-skype"></i> ' + current.social.skype + '<br/>' : "" ) +
						'</div>' +
					'</div>' +
					'<div class="card-section">' +
					   '<div id="favorite-'+ current._id +'" class="card-section-button '+ (current.favorite  ? "favorite" : "") +'" onClick="favorite('+current._id +')">' +
					   	'<div>' +
						   '<i class="fa fa-star"></i>&nbsp;Favorite' +
						'</div>' +
					   '</div>' +
					   '<div class="card-section-button" onClick="removeCard('+ id +','+ current._id +')">' +
					   	'<div>' +
						   '<i class="fa fa-trash"></i>&nbsp;Delete' +
						'</div>' +
					   '</div>' +
					'</div>' +
					'<div class="clear"></div>' +
				  '</div>' +
				'</div>';

			}catch(e){
				return "";
			}

			return html;
		
		}