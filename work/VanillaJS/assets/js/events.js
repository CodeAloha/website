  	function pushToConsole(msg, note){
		var consoleObj = document.getElementById("console");
		consoleObj.innerHTML += msg;
		consoleObj.scrollTop = consoleObj.scrollHeight;
	}
	/*
		Event Logging, the Vanilla JS way... :)
	*/
  	document.getElementById("generate-contact")
  		.addEventListener("mouseover", function(){
  			pushToConsole("<br/>Hovered over Generate Contact");
  		});
  	document.getElementById("new-contact")
  		.addEventListener("mouseover", function(){
  			pushToConsole("<br/>Hovered over New Contact.");
  		});
  	document.getElementById("import")
  		.addEventListener("mouseover", function(){
  			pushToConsole("<br/>Hovered over Import.");
  		});
    	document.getElementById("export")
  		.addEventListener("mouseover", function(){
  			pushToConsole("<br/>Hovered over Export.");
  		});


	document.getElementById("jsondata")
		.addEventListener("focus", function(){
			pushToConsole("<br/>Entering JSON Data into textarea");
		});
	document.getElementById("fname")
		.addEventListener("focus", function(){
			pushToConsole("<br/>Entering First Name");
		});
	document.getElementById("email")
		.addEventListener("change", function(){
			pushToConsole("<br/>Entered \""+
				document.getElementById("email").value + "\" into email field.");
		});
	document.getElementById("lname")
		.addEventListener("change", function(){
			pushToConsole("<br/>Entered \""+ 
				document.getElementById("lname").value + "\" into Last Name field.");
		});
	document.getElementById("phone")
		.addEventListener("change", function(){
			pushToConsole("<br/>Entered \""+ 
				document.getElementById("phone").value + "\" into Phone field.");
		});
	document.getElementById("fname")
		.addEventListener("change", function(){
			pushToConsole("<br/>Entered \""+
				document.getElementById("fname").value + "\" into First Name field.");
		});
	document.addEventListener("scroll", function(){
		if(window.scrollY % 25 == 0)
			pushToConsole("<br/>Page scrolled, position:" + window.scrollY);
		
	});


	function clearForm(){

		document.getElementById("fname").value     ="";
		document.getElementById("lname").value      ="";
		document.getElementById("phone").value      ="";
		document.getElementById("email").value       ="";
		document.getElementById("imgurl").value     ="";
		document.getElementById("facebook").value ="";
		document.getElementById("twitter").value     ="";
		document.getElementById("github").value     ="";
		document.getElementById("skype").value      ="";
		pushToConsole("<br/>Form has been reset.");
		
	}