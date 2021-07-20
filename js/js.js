
//using Vue to practice

var app = new Vue({
	el: '#app1',
	data:{
		ip: '',
		location: '',
		time: '',
		isp: ''
	}
});



// crear mapa  
  	var mymap = L.map('map').setView([20.07372, -28.46533], 3);
  
  	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    	maxZoom: 20,
    	id: 'mapbox/streets-v11',
    	tileSize: 1024,
    	zoomOffset: -1,
    	accessToken: 'pk.eyJ1IjoiaXdhbm5hdG9jb2RlIiwiYSI6ImNrcmIxM3N2bjNrZm8ycHJ4aWttaGs0bHgifQ.vlvWrLKCK75U1Rl0wXO26Q'
  	}).addTo(mymap);
  
  
  	// var marker = L.marker([23.07372, -32.46533]).addTo(mymap);
  
  
  
//   var popup = L.popup()
//       .setLatLng([51.5, -0.09])
//       .setContent("I am a standalone popup.")
//       .openOn(mymap);



// detectar ip location
	
	$(".btn").click(function (e) { 
		// alert("hey");
		ip = $(".search").val();
	
		console.log(  "el valor de ip " + ip );

    	axios.get( 'https://geo.ipify.org/api/v1',{
			params:{
				apiKey: 'at_Xg1h9C1qqNxfpX66Stn4CCTGaOfFj',	
				ipAddress: ip
		}
		})
    	.then( (resp)=>{
			var lat = resp.data.location.lat,
				lng = resp.data.location.lng;

			app.ip = resp.data.ip;
			app.isp = resp.data.isp;
			app.location = resp.data.location.city + ' ' + resp.data.location.region;
			app.time = 'UFC-' + resp.data.location.timezone;
			
			mymap.setView([lat, lng], 12);
			var marker = L.marker([lat, lng]).addTo(mymap);

			console.log( resp.data  );
		})
    	.catch( (err)=>{
			console.log( err );
		});

	});

