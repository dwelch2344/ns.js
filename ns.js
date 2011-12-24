/**
Copyright (c) 2011 David Welch

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, merge, 
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// ****************************************************************************************************************

NameSpace takes a period-separated list of names and creates JavaScript objects if said objects do not exist.

jQuery('com.example') would be equivalent to:
	window.co = window.co || {};
	window.co.example = window.co.example || {};

If window.co was a javascript before, it would not have been destroyed but would have had a property 'example' created for it. 

However if co was a non-object non-undefined javascript value, an exception would be thrown.

This function returns the "deepest" created object, allowing you to build on it immediately. 


Usage: 
	jQuery.ns('co.davidwelch.name').first = 'David';
	// returns "David"
	co.davidwelch.name.last = 'Welch';
	// returns "Welch"
	alert(co.davidwelch.name.first + " " + co.davidwelch.name.last);
	// alerts "David Welch"
*/

(function( $ ) {
	
	var NamespaceException = function(path, message){
		this.path = path;
		this.message = message;
	};
	
	function recursivelySetProperty(object, name, path){
		var names = name.split('.');
		var prop = names.shift();
		if(names.length > 0){
			names = names.join('.');
			var type = typeof(object[prop]);
			if(type !== "undefined" && type != "object"){
				throw new NamespaceException(path, "Could not create namespace: '" + prop + "' is type " + type);
			}
			if(object[prop] === undefined) object[prop] = {};
			
			if(path !== undefined && path.length > 0) path += ".";
			path += prop;
			return recursivelySetProperty(object[prop], names, path);
		}else{
			return object[name] = object[name] || {};
		}
	}
	
	$.ns = function(name){
		return recursivelySetProperty(window, name, "");
	};
	
})( jQuery );