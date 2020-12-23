
//Kate Garner
//Dr. Hudachek-Buswell
//CS 1301 A04
//11 November 2016
//This assignment was created by me alone, using StackOverflow to determine how to include 1 in the range of numbers returned by Math.random()
//and the course's materials and resources for the rest of the assignment.
//Credit for the music in file music.mp3: "Trio of Time: Ocarina of Time Horse Race" was created by FennecFelix and downloaded from furaffinity.net.
//Credit for the original music: Koji Kondo

kiwi_caught = 0;

function process_frame() {
  if ((Math.floor(Math.random()*101)) == kiwi_rate) {
    create_kiwi();
  }
    if (is_down("b") == true) {
      brake_truck();
      compute_truck_position();
    }
    else if (is_down("left") == true) {
      translate_truck_left();
      compute_truck_position();
    }
    else if (is_down("right") == true) {
      translate_truck_right();
      compute_truck_position();
    } else {
      coast_truck();
      compute_truck_position();
    }

}

function translate_truck_right() {
  var velocity = get_truck_velocity();
  var velocity = velocity + 2;
  set_truck_velocity(velocity);
  if (velocity >= 20){
    set_truck_velocity(20);
  }
}

function translate_truck_left() {
  var velocity = get_truck_velocity();
  velocity = velocity - 2;
  set_truck_velocity(velocity);
  if (velocity <= -20){
    set_truck_velocity(-20);
  }
}

function coast_truck() {
  var velocity = get_truck_velocity();
	if (velocity > 0){
    velocity = velocity - 1;
    set_truck_velocity(velocity);
  }
  else if (velocity < 0) {
    velocity = velocity + 1;
    set_truck_velocity(velocity);
    if (velocity >= 0) {
      set_truck_velocity(0);
    }
  } else {
    set_truck_velocity(0);
  }
}

function brake_truck() {
  velocity = get_truck_velocity();
  if (velocity > 0){
    	velocity = velocity - 5;
      set_truck_velocity(velocity);
      if (velocity <= 0) {
        set_truck_velocity(0);
      }
  }
  else if (velocity < 0) {
    set_truck_velocity(velocity+5);
    if (velocity >= 0){
      set_truck_velocity(0);

    }
  }
  else if (velocity == 0) {
    set_truck_velocity(0);
  }

}

function compute_truck_position() {
	var velocity = get_truck_velocity();
  var truckPosition = get_truck_left();
  var truckMovement = velocity + truckPosition;
  set_truck_left(truckMovement);
  var newPosition = get_truck_left();
  if (newPosition >= window.innerWidth-250) {
    translate_truck_left();
  }
  else if (newPosition <= 0) {
    translate_truck_right();
  }
}

function find_collisions(kiwi) {
  var truckPosition = get_truck_left();
  var space = window.innerHeight - 30;
  if ((get_kiwi_x(kiwi) >= truckPosition) && (get_kiwi_x(kiwi) <= (truckPosition + 125)) && (get_kiwi_y(kiwi) >= space)) {
      delete_kiwi(kiwi);
      kiwi_caught = kiwi_caught + 1;
      document.getElementById("kiwi-count").innerHTML = kiwi_caught;
    }
}
//The variable truckPosition gets the distance the left end of the truck is from the left side of the screen given the truck's current velocity and
//original position, and the variable space determines the distance between the top of the truck bed and the top of the window. The function get_kiwi_x()
// returns the distance the kiwi is from the left side of the screen and the function get_kiwi_y() returns the distance the kiwi is from the top of the
//screen, so they can be used to determine if the kiwi is located within the vicinity of the truck bed. The conditional states that if the kiwi's
//distance from the left side of the screen is greater than or equal to the truck's distance from the left side of the screen and less than or equal to
//125 plus the truck's distance from the left of the screen (the approximate width of the truck bed), and if the kiwi's distance from the top of the
//screen is greater than or equal to the distance from the the top of the screen to the top of the truck bed (so that a kiwi collides if it hits any
//point on the truck bed), the kiwi is deleted, etc.


function game_over() {
 if (kiwi_caught > 0){
 var title = "Congratulations, you helped Farmer Dave save the farm!";
  var text = "You have retrieved " + kiwi_caught + " kiwis.";
  var button = "New Game";
  alert(title,text,button);
  kiwi_caught = 0;
  document.getElementById("kiwi-count").innerHTML = kiwi_caught;
}
else if (kiwi_caught == 0){
  var title = "Oh no! Farmer Dave has lost all of his kiwis.";
  var text = "You have retrieved " + kiwi_caught + " kiwis.";
  var button = "Try Again";
  alert(title,text,button);
}
}

// just ignore this (‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌but don't delete it‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌):
check_latest = 2;
