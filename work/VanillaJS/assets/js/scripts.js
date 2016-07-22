
	(function(){

	  	var currentID = ( localStorage.getItem("current_id") != undefined ? localStorage.getItem("current_id") : 0 );
	  	loadCards();

	  	function loadCards(){
		  	try{
		  		document.getElementById('content-feed').innerHTML = "";
		  		for(var i=0; i < localStorage.length-1; i++){
			  		var current = JSON.parse( localStorage.getItem(localStorage.key(i)) );

			  		//No Angular Templating and Directives available to help manipulate DOM :(
			  		document.getElementById('content-feed').innerHTML +=
			  			loadCardDirective(i, current);
			  		
			  		if( ( i + 1 ) % 3 == 0 && i != 0)
			  			document.getElementById('content-feed').innerHTML +=
			  				'<div class="clear"></div>';
		  		}

		  	}
		  	catch(e){
		  		throw "Invalid JSON Object Received. " + e;
		  	}
	  	}

	  	function extractJSON(){
	 			try{
		  			var data = JSON.parse( document.getElementById("jsondata").value );

			  		for(var i=0; i < data.length; i++){

						var contact = new Contact();
						contact.deserialize(data[i]);

						var contactObj = JSON.stringify(contact);

						//An alternative to LocalStorage is WebSQL, however it is limited in supported browsers.

						localStorage.setItem( currentID++, contactObj);
						localStorage.setItem("current_id", currentID);

						alert("Successfully imported JSON data.");
						pushToConsole("<br/>Successfully imported JSON data");
						document.getElementById("jsondata").value ="";

			  		}
		  		}catch(e){
		  			document.getElementById("warn-json").style.opacity = "1";
		  			document.getElementById("warn-json").style.transition= "opacity 0.3s";
		  			document.getElementById("warn-json").style.webkitTransition= "opacity 0.3s";
		  			pushToConsole("<br/>Invalid JSON Object received.");
		  			setTimeout(function(){
		  				document.getElementById("warn-json").style.opacity = "0";
		  			},2500);
		  		}
		  		loadCards();

	  	}

	  	function displayActionPane(toggler){
	  		
	  		if( toggler == 1 ){
	  			document.getElementById("action-pane")
	  				.style.opacity = "0";
	  			document.getElementById("action-pane")
	  				.style.display = "inline";
	  			document.getElementById("import-pane")
	  				.style.display = "none";
	  		}
	  		else if( toggler == 2 ){
	  			document.getElementById("action-pane")
	  				.style.display = "none";
	  			document.getElementById("import-pane")
	  				.style.display = "inline";
	  		}
	  		else{
	  			document.getElementById("action-pane")
	  				.style.display = "none";
	  			document.getElementById("action-pane")
	  				.style.display = "none";
	  		}	
	  	}

	  	function exportStorage(){
	  		var t = [];
	  		for(var i=0; i < localStorage.length-1; i++){
	  			t.push ( localStorage.getItem(localStorage.key(i)) );
	  		}


	  		var text = JSON.stringify( t ).replace(/(,*null,*)/g, "");

			var pom = document.createElement('a');
			pom.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
			pom.setAttribute('download', "contacts.json");

			pom.style.display = 'none';
			document.body.appendChild(pom);

			pom.click();

			document.body.removeChild(pom);

			displayActionPane(2);
			document.getElementById("jsondata")
				.innerHTML = text;
	  	}

		//Unfortunately we can not use validation libraries, so the logic has been written out.
		function addContact(){
			var msg = "";
			if( document.getElementById("fname").value == "" ) 
				msg += "You must enter a First Name\n";
			if( document.getElementById("lname").value == "" )
				msg += "You must enter a Last Name\n";
			if( document.getElementById("email").value == "" || !validateEmail( document.getElementById("email").value ) )
				msg += "You must enter a valid Email\n";
			if( document.getElementById("phone").value =="" || validatePhone( document.getElementById("phone").value ) )
				msg += "You must enter a valid phone number\n";

			if( msg =="" ){
				var contact = new Contact(
					currentID,
					document.getElementById("fname").value,
					document.getElementById("lname").value,
					document.getElementById("phone").value,
					document.getElementById("email").value, 
					document.getElementById("imgurl").value);
				contact.setGeographics(
					"San Francisco",
					"California",
					"United States of America");
				contact.setSocialMedia(
					document.getElementById("facebook").value,
					document.getElementById("twitter").value,
					document.getElementById("github").value,
					document.getElementById("skype").value);

				var contactObj = JSON.stringify(contact);

	  			//Alternative to LocalStorage is WebSQL, however it is limited in supported browsers.
	  			localStorage.setItem( currentID++, contactObj);
	  			localStorage.setItem("current_id", currentID);

	  			//Load to simulate refresh.
	  			loadCards();
	  			clearForm();
	  			pushToConsole("<br/>Successfully Added Contact.");
			}
			else{
				alert(msg);
				pushToConsole("<br/>Unable to add a contact.");
				return;
			}

		}  	

		function genContact(){
			var contact = new Contact(
				currentID,
				"Christopher",
				"Wheeler",
				"1 (808) 352 - 9276",
				"chris@onecupofjava.com", 
				"https://scontent-2.2914.fna.fbcdn.net/hprofile-xfp1/v/t1.0-1/p160x160/1526316_211959755680991_602004829_n.jpg?oh=9458068c4d408683d4295115e869cb39&oe=55B11CB0");
			contact.setGeographics(
				"Honolulu",
				"Hawaii",
				"United States of America");
			contact.setSocialMedia(
				"https://www.facebook.com/OneCupOfJava",
				"https://linkedin.com/in/OneCupOfJava",
				"https://www.github.com/chrisanonymously",
				"lchrisanonymousl");

			var contactObj = JSON.stringify(contact);

			//Alternative to LocalStorage is WebSQL, however it is limited in supported browsers.

			localStorage.setItem( currentID++, contactObj);
			localStorage.setItem("current_id", currentID);

			alert("Created Profile.");
			//Load to simulate refresh.
			loadCards();
		}  	

		function validateEmail(email) {
		    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		}
		function validatePhone(phone){
			var re = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
			return re.test(phone);
		}

	  	document.getElementById("import-contact")
	  		.addEventListener("click", function(){
	  			extractJSON();
	  		});
	  	document.getElementById('create-contact')
	  		.addEventListener("click", function(){
	  			addContact();
	  		});
	/*
		Menu Items
	*/
	  	document.getElementById("generate-contact")
	  		.addEventListener("click", function(){
	  			genContact();
	  			pushToConsole("<br/>Generated a Contact.");
	  		});
	  	document.getElementById("new-contact")
	  		.addEventListener("click", function(){
	  			displayActionPane(1);
	  			pushToConsole("<br/>Selected New Contact.");
	  		});
	  	document.getElementById("import")
	  		.addEventListener("click", function(){
	  			displayActionPane(2);
	  			pushToConsole("<br/>Selected Import.");
	  		});
	  	var close = document.getElementsByClassName("close");
	  	for(var x =0; x < close.length; x++){
	  		close[x].addEventListener("click", function(){
	  			displayActionPane(3);
	  			pushToConsole("<br/>Closed Panel");
	  		});
	  	}
	    	document.getElementById("export")
	  		.addEventListener("click", function(){
	  			exportStorage();
	  			pushToConsole("<br/>Selected Export.");
	  		});
	    	document.getElementById("collapse-nav")
	  		.addEventListener("click", function(){
	  			var el =document.getElementById("collapse-panel");
	  			if( el.style.display != "none" )
	  				el.style.display="none";
	  			else
	  				el.style.display="inline";

	  		});

	})();

  	function removeCard(i, id){
		if (  confirm("Are you sure you want to remove this contact?") ) {
		      localStorage.removeItem(id);
		      document.getElementById("contact-card-" + i).style.transition = "opacity 0.6s";
		      document.getElementById("contact-card-" + i).style.webkitTransition = "opacity 0.6s";
  			document.getElementById("contact-card-" + i).style.opacity = "0";
  			setTimeout(function(){
  				document.getElementById("contact-card-" + i).style.display = "none";
  				loadCards();
  			},650);
  		}
  		pushToConsole("<br/>Deleted a Contact. id: " + i);
  	}

  	function favorite( i ){

  		try{

	  		var k = JSON.parse ( localStorage.getItem( i ) );
	  		var context = new Contact();
	  		context.deserialize( k );

	  		if( context.toggleFavorite() )
	  			document.getElementById("favorite-" + i )
	  				.className += " favorite";
	  		else
	  			document.getElementById("favorite-" + i )
	  				.className.replace(/\bfavorite\b/, '');

	  		localStorage.setItem( i, JSON.stringify( context ) );
	  		delete context;
	  		
	  		pushToConsole("<br/>Set Contact as a favorite.");

  		}catch(e){
  			pushToConsole("Error in setting favorite", "warning");
  			throw "Invalid JSON Error on setting favorite." + e;
  		}

  	}

