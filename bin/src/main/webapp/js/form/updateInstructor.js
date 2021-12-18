
function OnLoad() {
	debugger;
	var url1 = "/getByInstructorId";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url1);
	lAjax1.setSync(true);
	lAjax1.setData({"instructorId":(window.location).href.substring(((window.location).href).lastIndexOf('=') + 1)})
/*	lAjax1.setData($('form').serialize())*/
	lAjax1.addEventListener('success', function(response) {
		debugger;
		console.log(response);
		var response = JSON.parse(response);
		for ( prop in response ) {
 		   $( "#" + prop ).val( response[prop] );
		}
		if(response.gender == "Male"){
			$("#gender1").prop("checked", true);
		} else {
			$("#gender2").prop("checked", true);
		}
		
	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		debugger;
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
}

function updateInstructor(){
	debugger;
	var url1 = "/addInstructor";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData( $('form').serialize() )
    lAjax1.addEventListener('success', function (response) {debugger;
        console.log(response);
		$.smallBox({
			title: "Instructor",
			content: "<i class='fa fa-clock-o'></i> <i>Instructor Updated Successfully...</i>",
			color: "#659265",
			iconSmall: "fa fa-check fa-2x fadeInRight animated",
			timeout: 4000
		});
		window.location.href="#ui/list/ListInstructor.html";
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {debugger;
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}

