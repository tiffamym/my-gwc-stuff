// USING CHECKBOXES //
var zomato_key = "41ed66d99a210899ae3e1da817f06d16";

var bobaCode = 247;
var dessertCode = 100;
var casualCode = 16;
var vegetarianCode = 308;
var healthyFoodCode = 143; 

var cuisineCodes = [];
var estCodes = [];
var locations = [];
var myResults = [];
var myRatings = [];

// Detecting checkbox checks:
//https://stackoverflow.com/questions/6878757/how-to-listen-to-when-a-checkbox-is-checked-in-jquery/6878786
var checkboxes , checkboxArray;
var allCodes = ["boba", "desserts", "vegetarian", "healthy food"];
var allLocations = ["San Francisco", "Daly City", "Burlingame", "Millbrae", "San Bruno", "Redwood City", "Palo Alto", "Sunnyvale", "San Jose"];
var allEstablishments = ["casual dining"];
var allRatings = ["5", "4"];

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
      console.log(cuisineCodes);
      getResults();
    }
    else if (allEstablishments.includes(val)) {
      estCodes.push(val);
      console.log(estCodes);
      getResults();
    }
    else if (allRatings.includes(val)) {
      myRatings.push(val);
      if (allLocations.length > 0) {
        sortByRating();
      }
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



function getBoba(bob) {
  
  //var resultsDiv = document.getElementById("results");

  bob = bob.replace(/ /g, "%20");

  var reqURL = "https://developers.zomato.com/api/v2.1/cuisines?";
  reqURL = reqURL + "q=" + bob;

  console.log(reqURL);

  var boba_id = 247;
}

function getDesserts(des) {
  
  //var resultsDiv = document.getElementById("results");

  des = des.replace(/ /g, "%20");

  var reqURL = "https://developers.zomato.com/api/v2.1/cuisines?";
  reqURL = reqURL + "q=" + des;

  console.log(reqURL);

  var dessert_id = 100;
}

function getCasualDining(cas) {
  
  //var resultsDiv = document.getElementById("results");

  cas = cas.replace(/ /g, "%20");

  var reqURL = "https://developers.zomato.com/api/v2.1/cuisines?";
  reqURL = reqURL + "q=" + cas;

  console.log(reqURL);

  var dining_id = 16;
}

function getVegetarian(veg) {
  
  //var resultsDiv = document.getElementById("results");

  veg = veg.replace(/ /g, "%20");

  var reqURL = "https://developers.zomato.com/api/v2.1/cuisines?";
  reqURL = reqURL + "q=" + veg;

  console.log(reqURL);

  var vegetarian_id = 308;
}


function getResults() {
  locations.forEach(function(loc) {
    var city_id = getLocations(loc);
    // console.log(city_id);
  });
  cuisineCodes.forEach(function(bob) {
    var boba_id = getBoba(bob);
    //console.log(bobaCode);
 });
  cuisineCodes.forEach(function(des) {
    var dessert_id = getDesserts(des);
    console.log(dessertCode);
}); 
  cuisineCodes.forEach(function(cas) {
    var dining_id = getCasualDining(cas);
    console.log(casualCode);
});
cuisineCodes.forEach(function(veg) {
    var vegetarian_id = getVegetarian(veg);
    console.log(vegetarianCode);
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
                      //console.log(all_rest[0]);
                      // var address = all_rest[0]["restaurant"]["location"]["address"];
                      // alert(name + " at " + address);

                      all_rest.forEach(function(rest) {
                      var result = document.createElement("p");
                      result.innerHTML = rest["restaurant"]["name"] + " at " 
                          + rest["restaurant"]["location"]["address"];
                      resultsDiv.append(result);
                      });
                  }
            });
        }
  });

  return city_id;
}

function sortByRating() {
  myResults.forEach(function(rest) {
    var rating = rest["restaurant"]["user_rating"]["aggregate_rating"];
    // console.log(rating);
    rating = Math.round(rating);
    // console.log("new: " + rating);
    myRatings.forEach(function(stars) {
      // console.log(stars);
      if (rating >= stars && rating < (stars + 0.5)) {
        console.log(rest["restaurant"]["name"] + " at "
          + rest["restaurant"]["location"]["address"]);
      }
    });
  });
}

// do this when the document is ready -- happens BEFORE window load
// $(document).ready(getCheckboxes());
window.onload = getCheckboxes;