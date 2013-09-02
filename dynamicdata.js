/*jslint indent: 2, maxlen: 80, nomen: true */
/*global localStorage:true, jIO:true, $:true, */
/*console:true, setTimeout:true, document:true */
(function () {
  "use strict";
	
	  //** display a loading indicator
	  function show_progressbar(target, content) {
		  $("." + target).html(content);
	  };
     
   
		function displaytasks(listviewID, tasks){
			var i, str = "", task, ftext;
			for (i = 0; i < tasks.length; i += 1) {
				task = tasks[i];
				ftext = task.title + " " +
				  task.project + " " +
				  task.state + " " +
				  task.begindate + " " +
				  task.title;
				str += "<li data-filtertext='" + ftext + "'>" +
				"<span class='titleSpan'>" + task.title + "</span><br/>" +
				"<i>from " + task.begindate + "&nbsp;to " +
				task.enddate + "</i><br/>" + "<span class='myspan'>" +
				task.state + "</span></li>";
      }

      //just to keep time and see the loadint indicator effect
      console.log("waitting...");
			setTimeout(function(){
			  $(listviewID).empty().append(str).listview("refresh");
			}, 2000);
		};


	  $("#index").on("pageshow", function () {
			show_progressbar('content-listview', '<img src="ajax-loader.gif" border="0" alt="Loading, please wait..." />');
			
			var ajaxRequest =	$.ajax({
					'url': "data/tasks.json",
					'dataType': "json"
				});
			/**
		  ************************************************************************
      **** the function displaytasks() will fire if and only if ajaxRequest finished)
	    *************************************************************************
			**/
			$.when(ajaxRequest)
        .done(function(param){
          displaytasks(".content-listview", param)});
    });

		$("#jsonp").on("pageshow", function () {
			$.ajax({
				type: 'GET',
				url: 'http://localhost/JSONP_CORS/data/tasks.json?callback=?',
				
				async: false,
				jsonpCallback: function(data) {console.log(data);},
				contentType: 'application/json',
				dataType: 'jsonp',
				
				/*success: function(json) {
					console.dir(json);
				},
				error: function(e) {
					console.log(e.message);
        }*/
			});
			

		/*	$.getJSON('http://localhost/data/tasks.json?callback=?',function(data){
					//faites ce que vous voulez avec data !
					    console.log(data);
			});*/
		});
		
		$("#cors").on("pageshow", function () {
			// Create the XHR object.
			/*function createCORSRequest(method, url) {
				var xhr = new XMLHttpRequest();
				if ("withCredentials" in xhr) {
		      // XHR for Chrome/Firefox/Opera/Safari.
			    xhr.open(method, url, true);
				} else if (typeof XDomainRequest != "undefined") {
					    // XDomainRequest for IE.
					    xhr = new XDomainRequest();
							xhr.open(method, url);
				} else {
					// CORS not supported.
					    xhr = null;
				}
				  return xhr;
			}
			
			// Make the actual CORS request.
			function makeCorsRequest() {
				  // All HTML5 Rocks properties support CORS.
				  var url = 'http://localhost/JSONP_CORS/data/tasks.json';
					var xhr = createCORSRequest('GET', url);
					  if (!xhr) {
							alert('CORS not supported');
							return;
						}
				    // Response handlers.
				    xhr.onload = function() {
							var text = xhr.responseText;
							alert(text);
							// continuous...
						};
						xhr.onerror = function() {
							alert('Woops, there was an error making the request.');
						};
						xhr.send();
       }*/
		});
}());

