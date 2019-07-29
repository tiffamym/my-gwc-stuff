// USING CHECKBOXES //
var zomato_key = "41ed66d99a210899ae3e1da817f06d16";

var bobaCode = 247;
var dessertCode = 100;
var casualCode = 16;

var cuisineCodes = [];
var estCodes = [];
var locations = [];

// Detecting checkbox checks:
//https://stackoverflow.com/questions/6878757/how-to-listen-to-when-a-checkbox-is-checked-in-jquery/6878786
var checkboxes , checkboxArray;
var allCodes = [bobaCode, dessertCode];
var allLocations = ["San Francisco", "Daly City", "Burlingame", "Millbrae", "San Bruno", "Redwood City", "Palo Alto", "Sunnyvale", "San Jose"];
var allEstablishments = [casualCode];

function confirmCheck() {
  if (this.checked) {
    // alert('checked');
    // alert(this.value);

    var val = this.value;
    val = val.replace(/\_/g, " ");

    console.log(val);

    // collect all checked locations
    if (allLocations.includes(val)) {
      locations.push(val);
      console.log(locations);
      getResults();
    }
    else if (allCodes.includes(val)) {
      cuisineCodes.push(val);
      getResults();
    }
    else if (allEstablishments.includes(val)) {
      estCodes.push(val);
      getResults();
    }
  }
}

function getCheckboxes() {
  checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxArray = Array.from( checkboxes );

  checkboxArray.forEach(function(checkbox) {
    checkbox.addEventListener('change', confirmCheck);
  });

  console.log(checkboxes);
}

function getResults() {
  locations.forEach(function(loc) {
    var city_id = getLocations(loc);
    // console.log(city_id);
  });
}

function getLocations(loc) {
  var resultsDiv = document.getElementById("results");

  loc = loc.replace(/ /g, "%20");

  var reqURL = "https://developers.zomato.com/api/v2.1/cities?";
  reqURL = reqURL + "q=" + loc;

  console.log(reqURL);

  var city_id = 306;

  $.ajax({
        url: reqURL,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("user-key", zomato_key);
        }, success: function(data){
            // console.log(data);
            // get the city ID from the result
            city_id = data["location_suggestions"][0]["id"];

            var reqURL = "https://developers.zomato.com/api/v2.1/search?";
            reqURL = reqURL + "entity_id=" + city_id + "&entity_type=city";

            // append any cuisine codes
            reqURL = reqURL + "&cuisines=";

            cuisineCodes.forEach(function(c) {
                reqURL = reqURL + c + ",";
            });

            // append any establishment ids
            reqURL = reqURL + "&establishment_type=";

            estCodes.forEach(function(c) {
                reqURL = reqURL + c + ",";
            });

            console.log(reqURL);

            $.ajax({
                  url: reqURL,
                  beforeSend: function(xhr) {
                       xhr.setRequestHeader("user-key", zomato_key);
                  }, success: function(data){
                      // console.log(data);
                      // get restaurants array
                      var all_rest = data["restaurants"];
                      // console.log(all_rest);
                      // var name = all_rest[0]["restaurant"]["name"];
                      // var address = all_rest[0]["restaurant"]["location"]["address"];
                      // alert(name + " at " + address);

                      all_rest.forEach(function(rest) {
                        var result = document.createElement("p");
                        result.innerHTML = rest["restaurant"]["name"] + " at "
                         + rest ["restaurant"]["location"]["address"];
                        resultsDiv.append(result);
                        // console.log(r["restaurant"]["name"] + " at " + r["restaurant"]["location"]["address"]);
                      });


                  }
            });
        }
  });

  return city_id;
}

// do this when the document is ready -- happens BEFORE window load
// $(document).ready(getCheckboxes());
window.onload = getCheckboxes;
