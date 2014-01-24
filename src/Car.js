
var Car = function(box) {
	this.__box = box;
	this.__speed = 0;
	this.__top_speed = 5;
	this.__acceleration = 0.001;
	this.__braking = 0.05;
	
	this.__heading = 0;
	//-1 - 1
	this.__steer_angle = 0;

//	console.log(new BABYLON.Vector3(1, 1, 1).add(new BABYLON.Vector3(2, 2, 2)));
//	console.log(this.__box.position);
//	var front = this.__box.position.add(new BABYLON.Vector3(0.1, 0, 0));
//	var back = this.__box.position.subtract(new BABYLON.Vector3(0.1, 0, 0));
//	console.log(front);
//	console.log(back);
//	console.log(front.subtract(back));
//	this.__speed = 0.03;
//	this.__steer_angle = 0.7;
//	this.__heading = 1;
	
//	this.__counter = 0;
};

//Car.prototype.getSpeed = function() {
//	return this.__speed;
//};

Car.prototype.accelerate = function() {
	this.__speed = Math.min(this.__speed + this.__acceleration, this.__top_speed);
};

Car.prototype.decelerate = function() {
	this.__speed = Math.max(this.__speed - this.__acceleration, 0);
};

Car.prototype.brake = function() {
	this.__speed = Math.max(this.__speed - this.__braking, 0);
};

Car.prototype.turnLeft = function() {
	this.__steer_angle = Math.max(this.__steer_angle - 0.1, -1);
//	this.__steer_angle = -1;
};

Car.prototype.turnRight = function() {
	this.__steer_angle = Math.min(this.__steer_angle + 0.1, 1);
//	this.__steer_angle = 1;
};

Car.prototype.unturn = function() {
	if(this.__steer_angle > 0) {
		this.__steer_angle = Math.max(this.__steer_angle - 0.1, 0);
	}
	else if(this.__steer_angle < 0) {
		this.__steer_angle = Math.min(this.__steer_angle + 0.1, 0);
	}
//	this.__steer_angle = 0;
};

Car.prototype.update = function() {
//	if(this.__counter == 2) {
//		return;
//	}
//	this.__box.position.x += this.__speed;
//	this.__box.rotation.y += (this.__turning / 1000);
//return;
	//find front wheel position
	var front_wheel_position = this.__box.position.add(new BABYLON.Vector3(
		1.5 * Math.cos(this.__heading),
		0,
		1.5 * Math.sin(this.__heading)
	));
	//move front wheel in wheel direction
	front_wheel_position = front_wheel_position.add(new BABYLON.Vector3(
		this.__speed * Math.cos(this.__steer_angle + this.__heading),
		1.5,
		this.__speed * Math.sin(this.__steer_angle + this.__heading)
	));
	
	//find back wheel position
	var back_wheel_position = this.__box.position.subtract(new BABYLON.Vector3(
		1.5 * Math.cos(this.__heading),
		0,
		1.5 * Math.sin(this.__heading)
	));
	//move back wheel in car direction
	back_wheel_position = back_wheel_position.add(new BABYLON.Vector3(
		this.__speed * Math.cos(this.__heading),
		1.5,
		this.__speed * Math.sin(this.__heading)
	));
	
//	console.log(diff);
	//work out angle between points
	//rotate car to angle
	//move car to new center point
	this.__box.position = new BABYLON.Vector3(
		(front_wheel_position.x + back_wheel_position.x) / 2,
		1.5,
		(front_wheel_position.z + back_wheel_position.z) / 2
	);
	this.__heading = Math.atan2(front_wheel_position.z - back_wheel_position.z, front_wheel_position.x - back_wheel_position.x);
//	console.log(this.__heading);
	this.__box.rotation.y = -this.__heading;
//	this.__box.position = this.__box.position.add(diff);
//	this.__counter++;
};
