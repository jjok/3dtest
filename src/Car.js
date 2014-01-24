
/**
 * @param box {BABYLON.Mesh.Box}
 */
var Car = function(box) {
	this.__box = box;
	this.__speed = 0;
	this.__top_speed = 0.5;
	this.__acceleration = 0.1;
	this.__braking = 0.05;
	
	/**
	 * Measured in radians.
	 * @var float
	 */
	this.__heading = 0;
	
	/**
	 * -1 - 1
	 * @var float
	 */
	this.__steer_angle = 0;
	
	//TODO
	this.__length = 1;
	this.__half_length = this.__length / 2;

//	console.log(new BABYLON.Vector3(1, 1, 1).add(new BABYLON.Vector3(2, 2, 2)));
//	console.log(this.__box.position);
//	var front = this.__box.position.add(new BABYLON.Vector3(0.1, 0, 0));
//	var back = this.__box.position.subtract(new BABYLON.Vector3(0.1, 0, 0));
//	console.log(front);
//	console.log(back);
//	console.log(front.subtract(back));
	this.__speed = 0.3;
//	this.__steer_angle = 0.1;
//	this.__heading = 3 * Math.PI / 2;
	this.__heading = 2;
	
//	this.__counter = 0;
};

//Car.prototype.getSpeed = function() {
//	return this.__speed;
//};

/**
 * Accelerate the car.
 */
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
	this.__steer_angle = Math.max(this.__steer_angle - 0.01, -1);
//	this.__steer_angle = -1;
};

Car.prototype.turnRight = function() {
	this.__steer_angle = Math.min(this.__steer_angle + 0.01, 1);
//	this.__steer_angle = 1;
};

Car.prototype.unturn = function() {
	if(this.__steer_angle > 0) {
		this.__steer_angle = Math.max(this.__steer_angle - 0.01, 0);
	}
	else if(this.__steer_angle < 0) {
		this.__steer_angle = Math.min(this.__steer_angle + 0.01, 0);
	}
//	this.__steer_angle = 0;
};

Car.prototype.update = function() {
	var dt = 1 / 60;
//	if(this.__counter == 2) {
//		return;
//	}
//	this.__box.position.x += this.__speed;
//	this.__box.rotation.y += (this.__turning / 1000);
//return;

	if(this.__speed != 0) {
		
		//find front wheel position
		var front_wheel_position = this.__box.position.add(new BABYLON.Vector3(
			this.__half_length * Math.cos(this.__heading),
			0,
			this.__half_length * Math.sin(this.__heading)
		));
		//move front wheel in wheel direction
		front_wheel_position = front_wheel_position.add(new BABYLON.Vector3(
			this.__speed * dt * Math.cos(this.__steer_angle + this.__heading),
			this.__half_length,
			this.__speed * dt * Math.sin(this.__steer_angle + this.__heading)
		));
		
		//find back wheel position
		var back_wheel_position = this.__box.position.subtract(new BABYLON.Vector3(
			this.__half_length * Math.cos(this.__heading),
			0,
			this.__half_length * Math.sin(this.__heading)
		));
		//move back wheel in car direction
		back_wheel_position = back_wheel_position.add(new BABYLON.Vector3(
			this.__speed * dt * Math.cos(this.__heading),
			this.__half_length,
			this.__speed * dt * Math.sin(this.__heading)
		));
		
		//work out angle between points
		//rotate car to angle
		//move car to new center point
//		this.__box.position = new BABYLON.Vector3(
//			(front_wheel_position.x + back_wheel_position.x) / 2,
//			this.__half_length,
//			(front_wheel_position.z + back_wheel_position.z) / 2
//		);
		this.__heading = Math.atan2(
			front_wheel_position.z - back_wheel_position.z,
			front_wheel_position.x - back_wheel_position.x
		);
	
		this.__box.applyImpulse(
			new BABYLON.Vector3(this.__speed * Math.cos(this.__heading), 0, this.__speed * Math.sin(this.__heading)),
			new BABYLON.Vector3(0, this.__half_length / 1.4, 0)
		);
		

//	console.log(this.__heading);
//	console.log(this.__box.rotation);
//	console.log(this.__box.position);
//	this.__box.rotation.y = this.__heading;
	
//	this.__counter++;
	}
};
