
function OnLoad() {
	
	var url1 = "/getByWorkoutId";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url1);
	lAjax1.setSync(true);
	lAjax1.setData({"workoutId":(window.location).href.substring(((window.location).href).lastIndexOf('=') + 1)})
/*	lAjax1.setData($('form').serialize())*/
	lAjax1.addEventListener('success', function(response) {
		
		console.log(response);
		var response = JSON.parse(response);
		for ( prop in response ) {
 		   $( "#" + prop ).val( response[prop] );
		}
	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
}

function updateWorkout(){
	
	var url1 = "/addWorkout";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData( $('form').serialize() )
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
		$.smallBox({
			title: "Workout",
			content: "<i class='fa fa-clock-o'></i> <i>Workout Updated Successfully...</i>",
			color: "#659265",
			iconSmall: "fa fa-check fa-2x fadeInRight animated",
			timeout: 4000
		});
		window.location.href="#ui/list/ListWorkout.html";
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}

