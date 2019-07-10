window.alert("Welcome to my webpage! I hope you learn something today!");

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function rollover(my_image)
    {

        my_image.src = 'http://www.lovethispic.com/uploaded_images/143195-Beyonce-The-Queen.jpg';

    }

function mouseaway(my_image)
    {

        my_image.src = "https://peopledotcom.files.wordpress.com/2018/10/beyonce.jpg?crop=20px%2C0px%2C1000px%2C1000px&resize=1000%2C1000";
    }

function bigHeading(x) {
  x.style.height = "50px";
  x.style.width = "100px";
}

function normalHeading(x) {
  x.style.height = "50px";
  x.style.width = "100px";
}
