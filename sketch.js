var speed;
var y;
var yVelocity;
var obstacles = [];
var horizon;
var onGround;
var score;
var img;

var imgArr = 0;

function preload(){
	img = loadImage('fire.png');
}

function setup(){

	createCanvas(600,200);
	textAlign(CENTER)
	horizon = height - 40;
	y = 20;
	score = yVelocity = 0;
	speed = 5;
	onGround = false;
	
	//obstacles.push(newObstacles());

}

function draw(){
	background(51);

	stroke(255);
	line(0, horizon, width, horizon);

	fill('#999999');
	ellipse(40,y,40);
	var fireXLoc = 530;
	if(frameCount % 120 === 0) {
		speed *= 1.1;
		//
		imgArr +=.2;
		

	}
	for(var count = 1; count <= imgArr; count++){
		image(img,fireXLoc,10,23,23);
		fireXLoc += 23;

	}

	if(frameCount %  120 === 0){
		//if(random(0,1) > 0.5) {
			newObstacles();
			
		//}
	}

	score++;
	textSize(20);
	text("Score: " + score, width / 2, 30)
	text("Speed: " ,500,30);
	
	//newObstacles();
	updateObstacles();
	handleTRex();

}

function updateObstacles(){

	

	for (var i = obstacles.length - 1; i >= 0; i--) {
		
		obstacles[i].x -= speed;
		var x = obstacles[i].x;
		var size = obstacles[i].size;
		//console.log(horizon);
		var s2 = size / 2;

		if(x > -30){

			rect(x, horizon - size, size, size);
			var x1 = x + s2;
			var y1 = horizon - s2;
			if(dist(x1, y1, 40, y) < s2 + 20){
				//collision
				

				text("GAME OVER", width / 2, height / 2);
				textSize(20);
				text("Press f5 to restart", width / 2, height / 4)

				noLoop();

			}

		} else{
			//delete from array
			//obstacles.splice(i,1);
		}
	}
}

function newObstacles(){

	var obs = new Obstacle(random(20, 40), null);

	obstacles.push(obs);
}

function handleTRex() {

	if(y + 20 + yVelocity< horizon){

		//console.log("flag");
		yVelocity += 0.9; 
		
		onGround = false;

	} else {
		yVelocity = 0;
		onGround = true;
	}

	//movement
	

	if(keyIsDown(UP_ARROW) || keyIsDown(32) || mouseIsPressed || touches[0]){
		if(onGround){
			yVelocity -= 15;
			console.log("key pressed");
			console.log("yVel = ", yVelocity);
		console.log("y = ", y);
			onGround = false;
		}
	}
	y += yVelocity;


}