function geoFindMe() {
    var output = document.getElementById("out");
    var databro = document.getElementById("hello");
    var currentTempInCelsius;
  
    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }
  
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      var getIP = "https://fcc-weather-api.glitch.me/api/current?lat="+latitude+"&"+'lon='+longitude;
      console.log(getIP);
      var data = $.getJSON(getIP, function(data){
        currentTempInCelsius = data.main.temp;
        databro.innerHTML = "<div class='text-center'><p>Weather: "+data.weather[0].main+"<br>"+
                            "City: "+data.name+"</p>"+"<img src='"+data.weather[0].icon+"'>"+
                            "<br>Temperature: <p id='temp'>"+data.main.temp+"</p></div>"; 
      });
      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
  
      var img = new Image();
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
      img.id = "map";
  
      output.appendChild(img);

    }

    $("#tempUnit").click(function () {
      var currentUnit = $("#tempUnit").text();
      var newUnit = currentUnit == "C" ? "F" : "C";
      $("#tempUnit").text(newUnit);
      if (newUnit == "F") {
        var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
        $("#temp").text(fahTemp + " " + String.fromCharCode(176));
      } else {
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      }
    });
  
    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }
  
    output.innerHTML = "<p>Locating…</p>";
  
    navigator.geolocation.getCurrentPosition(success, error);
  }

  $(document).ready();
  