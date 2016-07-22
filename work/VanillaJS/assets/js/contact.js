	/* Utilize Contact Object to reference data */
	function Contact(id, fname, lname, phone, email, image){
		this._id = id;
		this.fname = fname;
		this.lname = lname;  
		this.phone = phone;
		this.image = image;
		this.email = email;
		this.favorite = false;

		this.geographics = {
			city: "",
			state: "",
			country: ""
		}

		this.social = {
			facebook: "",
			github: "",
			twitter: "",
			skype: ""
		}
	}

	Contact.prototype.deserialize = function(data){
		if( data != undefined ){
			this._id = data._id;
			this.email = data.email;
			this.fname = data.fname;
			this.lname = data.lname;
			this.phone = data.phone;
			this.image = data.image;
			this.geographics.city = data.geographics.city;
			this.geographics.state = data.geographics.state;
			this.geographics.country =data.geographics.country;

			this.social.facebook = data.social.facebook;
			this.social.twitter = data.social.twitter;
			this.social.github = data.social.github;
			this.social.skype = data.social.skype;
		}
	}

	Contact.prototype.setGeographics= function(city, s, c){
		this.geographics.city = city;
		this.geographics.state = s;
		this.geographics.country=c;
	}

	Contact.prototype.toggleFavorite = function(){
		this.favorite = !this.favorite;
		return this.favorite;
	}

	Contact.prototype.setSocialMedia = function(f, t, g, s){
		this.social.facebook = f;
		this.social.github = g;
		this.social.twitter = t;
		this.social.skype = s;
	}