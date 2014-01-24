
var Car = function(box) {
	this.__box = box;
	this.__speed = 0;
	this.__top_speed = 10;
	this.__acceleration = 0.001;
	
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
	this.__speed = 0.1;
	this.__steer_angle = 0;
	
	this.__counter = 0;
};

Car.prototype.getSpeed = function() {
	return this.__speed;
};

Car.prototype.accelerate = function() {
	this.__speed = Math.min(this.__speed + this.__acceleration, this.__top_speed);
};

Car.prototype.decelerate = function() {
	this.__speed = Math.max(this.__speed - this.__acceleration, 0);
};

Car.prototype.turnLeft = function() {
//	this.__turning = Math.max(this.__turning - 0.1, -1);
	this.__turning = -1;

//	this.__box.rotation.y -= 0.01;
};

Car.prototype.turnRight = function() {
//	this.__turning = Math.min(this.__turning + 0.1, 1);
	this.__turning = 1;

//	this.__box.rotation.y += 0.01;
};

Car.prototype.unturn = function() {
//	if(this.__turning > 0) {
//		this.__turning = Math.max(this.__turning - 0.1, 0);
//	}
//	else if(this.__turning < 0) {
//		this.__turning = Math.min(this.__turning + 0.1, 0);
//	}
	this.__turning = 0;
};

Car.prototype.update = function() {
	if(this.__counter == 2) {
		return;
	}
//	this.__box.position.x += this.__speed;
//	this.__box.rotation.y += (this.__turning / 1000);
//return;
	//find front wheel position
	console.log(this.__box.position);
	var front_wheel_position = this.__box.position.add(new BABYLON.Vector3(1.5, 0, 0));
	//move front wheel in wheel direction
	front_wheel_position = new BABYLON.Vector3(
		front_wheel_position.x * Math.cos(this.__heading),
		front_wheel_position.y * Math.sin(this.__heading),
		front_wheel_position.z
	);

	console.log(front_wheel_position);
	front_wheel_position = front_wheel_position.add(new BABYLON.Vector3(
		this.__speed * Math.cos(this.__steer_angle),
		this.__speed * Math.sin(this.__steer_angle),
		0
	));
	console.log(front_wheel_position);
//	front_wheel_position.x += 0.001;
	
	//find back wheel position
	var back_wheel_position = this.__box.position.subtract(new BABYLON.Vector3(1.5, 0, 0));
	//move back wheel in car direction
	back_wheel_position = new BABYLON.Vector3(
		back_wheel_position.x = Math.cos(this.__heading),
		back_wheel_position.y = Math.sin(this.__heading),
		back_wheel_position.z
	);
	back_wheel_position = back_wheel_position.add(new BABYLON.Vector3(
		this.__speed * Math.cos(this.__heading),
		this.__speed * Math.sin(this.__heading),
		0
	));
	
	//find new center point
//	var diff = front_wheel_position.add(back_wheel_position);
//	console.log(diff);
	//work out angle between points
	//rotate car to angle
	//move car to new center point
	this.__box.position = new BABYLON.Vector3(
		(front_wheel_position.x + back_wheel_position.x) / 2,
		(front_wheel_position.y + back_wheel_position.y) / 2,
		0
	);
//	this.__box.position = this.__box.position.add(diff);
	this.__counter++;
};
