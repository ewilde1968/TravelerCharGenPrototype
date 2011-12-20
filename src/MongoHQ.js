function MongoHQ(url, key) {
	this.baseURL = url;
	this.apiKey = key;
	
	var db = "/databases";
	var apiToken = "?_apikey=";
	
	var finalURI = function( rest, params) {
		var uri = this.baseURL + rest + apiToken + this.apiKey + ((params==null)?"":params);
		
		return uri;
	}
	this.finalURI = finalURI;
	
	var list = function( client) {
		client.get( this.finalURI( db));
	}
	this.list = list;
	
	var get = function( client, rest, params) {
		client.get( this.finalURI( rest, params));
	}
	this.get = get;
	
	var post = function( client, rest, body, params) {
		client.post( this.finalURI( rest, params), body);
	}
	this.post = post;
	
	var put = function( client, rest, body, params) {
		client.put( this.finalURI( rest, params), body);
	}
	this.put = put;
	
	var del = function( rest, params) {
		var client = new MongoHQRequest();
		client.del( this.finalURI( rest, params));
	}
	this.del = del;

	var getDatabase = function( dbName) {
		return new MongoHQDatabase( dbName, this, false);
	}
	this.getDatabase = getDatabase;
}

function MongoHQDatabase( dbName, parent, verify) {
	this.name = dbName;
	this.mongo = parent;

	var db = "/databases";
	var col = "/collections";
	
	if( verify == true) {
		var request = new MongoHQRequest( function(response,status,xhr) {
			switch( status) {
			case "success":
				// if db name is not in this response event then throw
				for(i=0;i<response.length;i++) {
					if( response[i]["name"] == dbName)
						return;	// success
				}
				// fall through
			default:
				// didn't find this database
				// cannot create it when using free version
				throw err("MongoHQDatabase:verifyExistence - " + this.name + " does not exist");
				break;
			}
		});
		this.mongo.list( request);
	}
	
	var stats = function( client) {
		var rest = db + "/" + this.name;
		this.mongo.get( client, rest);
	}
	this.stats = stats;
	
	var del = function() {
		var rest = db + "/" + this.name;
		this.mongo.del( rest);
	}
	this.del = del;
	
	var list = function(client) {
		var rest = db + "/" + this.name + col;
		this.mongo.get( client, rest);
	}
	this.list = list;
	
	var get = function( client, rest, params) {
		var restInternal = db + "/" + this.name + rest;
		this.mongo.get( client, restInternal, params);
	}
	this.get = get;
	
	var post = function( client, rest, body, params) {
		var restInternal = db + "/" + this.name + rest;
		this.mongo.post( client, restInternal, body, params);
	}
	this.post = post;
	
	var put = function( client, rest, body, params) {
		var restInternal = db + "/" + name + rest;
		this.mongo.put( client, restInternal, body, params);
	}
	this.put = put;
	
	var del = function( rest, params) {
		var restInternal = db + "/" + name + rest;
		this.mongo.del( restInternal, params);
	}
	this.del = del;
	
	var getCollection = function( colName) {
		return new MongoHQCollection( colName, this, false);
	}
	this.getCollection = getCollection;
}

function MongoHQCollection( colName, parent, create) {
	this.name = colName;
	this.db = parent;
	
	var col = "/collections";
	var doc = "/documents";
	
	if( create == true) {
		var request = new MongoHQRequest();
		this.db.post( request, col, "", "&name=" + this.name);
	}
	
	var stats = function(client) {
		var rest = col + "/" + this.name;
		this.db.get( client, rest);
	}
	this.stats = stats;
	
	var rename = function( newName) {
		var rest = col + "/" + this.name;
		var request = new MongoHQRequest();
		this.db.put( request, rest, "", "&name=" + newName);
	}
	this.rename = rename;
	
	var del = function() {
		var rest = col + "/" + this.name;
		this.db.del( rest);
	}
	this.del = del;
	
	var find = function( client, selection, fields, skip, limit, sort) {
		var rest = col + "/" + this.name + doc;
		var params = ((selection!= null && selection.length>0)?("&q="+selection):"")
					+((fields!=null && fields.length>0)?("&fields="+fields):"")
					+((skip>0)?("&skip="+skip):"")
					+((limit>0)?("&limit="+limit):"")
					+((sort!=null && sort.length>0)?("&sort="+sort):"");
		
		this.db.get( client, rest, params);
	}
	this.find = find;

	var post = function( client, rest, body, params) {
		var restInternal = col + "/" + this.name + rest;
		this.db.post( client, restInternal, body, params);
	}
	this.post = post;
	
	var get = function( client, rest, params) {
		var restInternal = col + "/" + this.name + rest;
		this.db.get( client, restInternal, params);
	}
	this.get = get;
	
	var put = function( client, rest, body, params) {
		var restInternal = col + "/" + this.name + rest;
		this.db.put( client, restInternal, body, params);
	}
	this.put = put;
}

function MongoHQDocument( col, object, identifier) {
	this.id = identifier;
	this.collection = col;
	this.value = object;
	
	var doc = "/documents";
	
	if( this.id == null) {
		// translate object to document and post to create it
		var r0 = new MongoHQRequest( function(response,status,xhr) {
			// Assign the ID here with another http request
			var r1 = new MongoHQRequest( function(response,status,xhr) {
				this.id = response[0]._id.$oid;
			});
			col.find( r1, object);
		});
		col.post( r0, doc, object);
	}
	
	var view = function( client) {
		if( this.id != null) {
			var rest = doc + "/" + this.id;
			this.collection.get( client, rest);
		} else
			throw("MongoHQDocument:view - id must be set before viewing");
	}
	this.view = view;

	var update = function( client, object) {
		if( this.id != null) {
			var rest = doc + "/" + this.id;
			this.collection.put( client, rest, object.ToBody());
		} else
			throw("MongoHQDocument:update - id must be set before updating")
	}
	this.update = update;
	
	var del = function() {
		// no need to do anything if it isn't stored
		if( this.id != null) {
			var rest = doc + "/" + this.id;
			this.collection.del( rest);
		}
	}
	this.del = del;
}

function MongoHQRequest( responseCallback, contextObject) {
	this.context = contextObject;
	this.response = responseCallback;

	var get = function( uri) {
		$.ajax({url:uri,
				context:this.context,
				dataType:"json",
				success:this.response,
				type:"GET"
			});
	}
	this.get = get;
	
	var post = function( uri, body) {
//		var tempData = '{"document" : {"Username" : "Lou","Password":"Reed"}}';
		$.ajax({url:uri,
				error:function() {
					alert("error");
				},
				contentType:"application/json",
				context:this.context,
				data:JSON.stringify( body),
				dataType:"json",
				success:this.response,
				type:"POST"
			});
	}
	this.post = post;
}
