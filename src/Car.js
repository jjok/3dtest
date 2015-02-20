
/**
 * @param box {BABYLON.Mesh.Box}
 */
var Car = function(box) {
	
	/**
	 * 
	 */
	this.__box = box;
	
	/**
	 * The speed of the car.
	 * @var float
	 */
	this.__speed = 0;
	this.__top_speed = 0.5;
	this.__acceleration = 0.1;
	this.__braking = 0.1;
	
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

	
	this.__state = Car.State.REST;
};

//Car.prototype.getSpeed = function() {
//	return this.__speed;
//};

Car.prototype.setState = function(state) {
	this.__state = state;
};

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
	//TODO
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
//		console.log(this.__heading);
		switch(this.__state) {
			case Car.State.ACCELERATING:
				this.__box.applyImpulse(
					new BABYLON.Vector3(this.__speed * Math.cos(this.__heading), 0, this.__speed * Math.sin(this.__heading)),
					this.__box.position
				);
				break;
			
			case Car.State.BRAKING:
				this.__box.applyImpulse(
					new BABYLON.Vector3(-this.__speed * Math.cos(this.__heading), 0.1, -this.__speed * Math.sin(this.__heading)),
					this.__box.position
				);
				break;
		}
		
//	console.log(this.__heading);
//	console.log(this.__box.rotation);
//	console.log(this.__box.position);
//	this.__box.rotation.y = this.__heading;
	}
//	this.__box.rotation.y = this.__heading;
};

Car.State = {
	REST: 0,
	ACCELERATING: 1,
	BRAKING: 2
};
