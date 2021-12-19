
function OnLoad() {
	
	
	var url = "/getAllMember";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		var dataSet = JSON.parse(response);
		$.each(dataSet, function(i, item) {
			$('<option>').val(item.member_id).text(item.first_name + " - " + item.email).appendTo('#memberId');
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
	
	var url = "/getAllWorkout";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		var dataSet = JSON.parse(response);
		$.each(dataSet, function(i, item) {
			$('<option>').val(item.workoutId).text(item.workoutName).appendTo('#workoutId');
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
	
	var url = "/getAllInstructor";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		var dataSet = JSON.parse(response);
		$.each(dataSet, function(i, item) {
			$('<option>').val(item.instructorId).text(item.instructorName).appendTo('#instructorId');
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
	
	var url1 = "/getByPlanId";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url1);
	lAjax1.setSync(true);
	lAjax1.setData({"planId":(window.location).href.substring(((window.location).href).lastIndexOf('=') + 1)})
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

function updateWorkoutPlan(){
	
	var url1 = "/addWorkoutPlan";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData( $('form').serialize() )
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
		$.smallBox({
			title: "Workout Plan",
			content: "<i class='fa fa-clock-o'></i> <i>Workout Plan Updated Successfully...</i>",
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

