
function OnLoad() {
	
	var url = "/getAllMembershipType";
		var lAjax1 = new FormAjax();
		lAjax1.setUrl(url);
		lAjax1.setSync(true);
		lAjax1.setData($('form').serialize())
		lAjax1.addEventListener('success', function (response) {
			var dataSet = JSON.parse(response);
			$.each(dataSet, function (i, item) {
				$('<option>').val(item.membershipId).text(item.membershipName + " - " + item.membershipAmount + " Euro").appendTo('#membershipId');
			});
			var url1 = "/getByMemberId";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url1);
	lAjax1.setSync(true);
	lAjax1.setData({"memberId":(window.location).href.substring(((window.location).href).lastIndexOf('=') + 1)})
/*	lAjax1.setData($('form').serialize())*/
	lAjax1.addEventListener('success', function(response) {
		
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
		
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();

		});
		lAjax1.addEventListener('error', function (textStatus, errorThrown) {
			console.log(textStatus + " ; " + errorThrown);
		});
		lAjax1.execute();
	
	
}

function updateMember(){
	
	var url1 = "/addMember";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData( $('form').serialize() )
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
		$.smallBox({
			title: "Member",
			content: "<i class='fa fa-clock-o'></i> <i>Member Updated Successfully...</i>",
			color: "#659265",
			iconSmall: "fa fa-check fa-2x fadeInRight animated",
			timeout: 4000
		});
		window.location.href="#ui/list/ListMember.html";
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}

