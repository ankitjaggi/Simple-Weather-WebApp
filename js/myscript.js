$(document).ready(function() {
  if(localStorage.getItem('locations')) {
    // console.log(localStorage.getItem('locations'));
    var locations = JSON.parse(localStorage.getItem('locations'));
    console.log(locations);
    for(var prop in locations.places) {
      var place = locations.places[prop].name;
      console.log("Place: "+place);
      loadWeather(place, '');
    }
  }
});



$( "#city" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "http://gd.geobytes.com/AutoCompleteCity",
          dataType: "jsonp",
          data: {
            q: request.term
          },
          success: function( data ) {
            response (data);

          }
        });
      },
      minLength: 2,
      select: function( event, ui ) {
        
        
        $("#city").val(ui.item.label);
        submitForm();
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });


$("#weather").hide();
var count=0;
var citiesdata="";
$("#submit").click(function(e) {
	$("#loading").show();
	
	submitForm();

});

$("#city").keydown(function(e) {
	var keyCode = (e.keyCode ? e.keyCode : e.which);
	if(keyCode==13)
    {
		submitForm();
        $("#loading").show();
    }
});

$("#weather").click(function(e) {
	
	if((e.target.id).indexOf("remove")!=-1)
		{
			
		  $("#card"+e.target.id.charAt((e.target.id.length)-1)).hide();
	}
});


function submitForm()
{
    var input = $("#city").val();
    
    loadWeather(input, '');
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      console.log(weather);
      icon = setWeatherIcon(weather.code);
      weathericonvalue = icon+'&nbsp;'+weather.temp+'<sup>&deg;'+weather.units.temp+'</sup>';
      var result = "<div class='card' id='card"+count+"'><div class='content'><a href='#' id='remove"+count+"' class='right floated remove'><i id='remove"+count+"' class='right floated remove icon'></i></a><div class='header' id='location'><h3>"+weather.city+", "+weather.region+", "+weather.country+"</h3></div> <div class='meta' id='currentTime'>"+weather.updated+"</div><div class='meta' id='currentWeather'><h5>"+weather.currently+"</h5></div><div class='description' id='description'><h2>"+weathericonvalue+"</h2> <h4 class='right floated secdata'>Humidity: "+weather.humidity+"%<br>Pressure: "+weather.pressure+weather.units.pressure+"<br><i class='wi wi-strong-wind'></i> "+weather.wind.speed+" km/h<br><i class='wi wi-sunrise'></i>&nbsp;"+weather.sunrise+"<br><i class='wi wi-sunset'></i>&nbsp;"+weather.sunset+"</h4></div></div></div>";

      $("#insideweather").append(result);
      count++;
          
      $("#weather").show();        
      $("#loading").hide();
      $("#city").val('');
      var place = {name: location};
      if(localStorage.getItem('locations')) {
        var data = JSON.parse(localStorage.getItem('locations'));
        console.log(data.places);
        data.places[location] = place;
        console.log(data.places);
        localStorage.setItem('locations', JSON.stringify(data));
      }
      else {
        var locations = {};
        var tmp = {};
        tmp[location] = place;
        locations['places'] = tmp;
        console.log(locations);
        localStorage.setItem('locations', JSON.stringify(locations));

      }

    },
    error: function(error) {
    	console.log(error);
        $("#loading").hide();
        alert("Entered city did not return any results. Please try again.");
      // $("#weather").append('<p>'+error+'</p>');
    }
  });
}

	
        function setWeatherIcon(condid) {
 
  switch(condid) {
    case '0': var icon  = '<i class="wi wi-tornado"></i>';
    break;
    case '1': var icon  = '<i class="wi wi-storm-showers"></i>';
    break;
    case '2': var icon  = '<i class="wi wi-tornado"></i>';
    break;
    case '3': var icon  = '<i class="wi wi-thunderstorm"></i>';
    break;
    case '4': var icon  = '<i class="wi wi-thunderstorm"></i>';
    break;
    case '5': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '6': var icon  = '<i class="wi wi-rain-mix"></i>';
    break;
    case '7': var icon  = '<i class="wi wi-rain-mix"></i>';
    break;
    case '8': var icon  = '<i class="wi wi-sprinkle"></i>';
    break;
    case '9': var icon  = '<i class="wi wi-sprinkle"></i>';
    break;
    case '10': var icon  = '<i class="wi wi-hail"></i>';
    break;
    case '11': var icon  = '<i class="wi wi-showers"></i>';
    break;
    case '12': var icon  = '<i class="wi wi-showers"></i>';
    break;
    case '13': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '14': var icon  = '<i class="wi wi-storm-showers"></i>';
    break;
    case '15': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '16': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '17': var icon  = '<i class="wi wi-hail"></i>';
    break;
    case '18': var icon  = '<i class="wi wi-hail"></i>';
    break;
    case '19': var icon  = '<i class="wi wi-cloudy-gusts"></i>';
    break;
    case '20': var icon  = '<i class="wi wi-fog"></i>';
    break;
    case '21': var icon  = '<i class="wi wi-fog"></i>';
    break;
    case '22': var icon  = '<i class="wi wi-fog"></i>';
    break;
    case '23': var icon  = '<i class="wi wi-cloudy-gusts"></i>';
    break;
    case '24': var icon  = '<i class="wi wi-cloudy-windy"></i>';
    break;
    case '25': var icon  = '<i class="wi wi-thermometer"></i>';
    break;
    case '26': var icon  = '<i class="wi wi-cloudy"></i>';
    break;
    case '27': var icon  = '<i class="wi wi-night-cloudy"></i>';
    break;
    case '28': var icon  = '<i class="wi wi-day-cloudy"></i>';
    break;
    case '29': var icon  = '<i class="wi wi-night-cloudy"></i>';
    break;
    case '30': var icon  = '<i class="wi wi-day-cloudy"></i>';
    break;
    case '31': var icon  = '<i class="wi wi-night-clear"></i>';
    break;
    case '32': var icon  = '<i class="wi wi-day-sunny"></i>';
    break;
    case '33': var icon  = '<i class="wi wi-night-clear"></i>';
    break;
    case '34': var icon  = '<i class="wi wi-day-sunny-overcast"></i>';
    break;
    case '35': var icon  = '<i class="wi wi-hail"></i>';
    break;
    case '36': var icon  = '<i class="wi wi-day-sunny"></i>';
    break;
    case '37': var icon  = '<i class="wi wi-thunderstorm"></i>';
    break;
    case '38': var icon  = '<i class="wi wi-thunderstorm"></i>';
    break;
    case '39': var icon  = '<i class="wi wi-thunderstorm"></i>';
    break;
    case '40': var icon  = '<i class="wi wi-storm-showers"></i>';
    break;
    case '41': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '42': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '43': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '44': var icon  = '<i class="wi wi-cloudy"></i>';
    break;
    case '45': var icon  = '<i class="wi wi-lightning"></i>';
    break;
    case '46': var icon  = '<i class="wi wi-snow"></i>';
    break;
    case '47': var icon  = '<i class="wi wi-thunderstorm"></i>';
    break;
    case '3200': var icon  =  '<i class="wi wi-cloud"></i>';
    break;
    default: var icon  =  '<i class="wi wi-cloud"></i>';
    break;
  }
 
  return icon;
 
}
        
function randomBackground() {

}