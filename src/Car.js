
/**
 * @param box {BABYLON.Mesh.Box}
 */
var Car = function(box) {
	
	/**
	 * 
	 */
	this.__box = box;
	
//	/**
//	 * The speed of the car.
//	 * @var float
//	 */
//	this.__speed = 0;
//	this.__top_speed = 0.05;
	this.__acceleration = 0.1;
	this.__braking = 0.1;
	
	this.__impulse = 0;
	
	/**
	 * Measured in radians.
	 * @var float
	 */
	this.__heading = 0;
	
	/**
	 * 
	 * @var float
	 */
	this.__steer_angle = 0;
//	this.__steer_amount = 0.01;
	this.__max_steer_angle = 0.03;
	
//	this.__length = 1;
//	this.__half_length = this.__length / 2;
	
	this.__state = Car.State.REST;
	
	//DEBUG
	this.__last_impulse = BABYLON.Vector3.Zero();
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
//	this.__speed = Math.min(this.__speed + this.__acceleration, this.__top_speed);
	this.__impulse = 1;
};

Car.prototype.decelerate = function() {
//	this.__speed = Math.max(this.__speed - this.__acceleration, 0);
	this.__impulse = 0;
};

Car.prototype.brake = function() {
//	this.__speed = Math.max(this.__speed - this.__braking, 0);
	this.__impulse = -1;
};

Car.prototype.turnLeft = function() {
//	this.__steer_angle = Math.max(this.__steer_angle - this.__steer_amount, -this.__max_steer_angle);
	this.__steer_angle = -this.__max_steer_angle;
};

Car.prototype.turnRight = function() {
//	this.__steer_angle = Math.min(this.__steer_angle + this.__steer_amount, this.__max_steer_angle);
	this.__steer_angle = this.__max_steer_angle;
};

Car.prototype.unturn = function() {
//	if(this.__steer_angle > 0) {
//		this.__steer_angle = Math.max(this.__steer_angle - 0.01, 0);
//	}
//	else if(this.__steer_angle < 0) {
//		this.__steer_angle = Math.min(this.__steer_angle + 0.01, 0);
//	}
	this.__steer_angle = 0;
};

Car.prototype.update = function(dt) {

	if(this.__speed != 0) {
		
//		//find front wheel position
//		var front_wheel_position = this.__box.position.add(new BABYLON.Vector3(
//			this.__half_length * Math.cos(this.__heading),
//			0,
//			this.__half_length * Math.sin(this.__heading)
//		));
//		//move front wheel in wheel direction
//		front_wheel_position = front_wheel_position.add(new BABYLON.Vector3(
//			this.__speed * dt * Math.cos(this.__steer_angle + this.__heading),
//			this.__half_length,
//			this.__speed * dt * Math.sin(this.__steer_angle + this.__heading)
//		));
//		
//		//find back wheel position
//		var back_wheel_position = this.__box.position.subtract(new BABYLON.Vector3(
//			this.__half_length * Math.cos(this.__heading),
//			0,
//			this.__half_length * Math.sin(this.__heading)
//		));
//		//move back wheel in car direction
//		back_wheel_position = back_wheel_position.add(new BABYLON.Vector3(
//			this.__speed * dt * Math.cos(this.__heading),
//			this.__half_length,
//			this.__speed * dt * Math.sin(this.__heading)
//		));
//		
//		//work out angle between points
//		//rotate car to angle
//		
//		//move car to new center point
//		this.__box.position = new BABYLON.Vector3(
//			(front_wheel_position.x + back_wheel_position.x) / 2,
//			this.__half_length,
//			(front_wheel_position.z + back_wheel_position.z) / 2
//		);
//		this.__heading = Math.atan2(
//			front_wheel_position.z - back_wheel_position.z,
//			front_wheel_position.x - back_wheel_position.x
//		);
//		console.log(this.__heading);
		this.__heading += this.__steer_angle;
		// Not sure this is much use.
//		if(this.__heading > 2 * Math.PI) {
//			this.__heading -= 2 * Math.PI;
//		}
//		else if(this.__heading < -2 * Math.PI) {
//			this.__heading += 2 * Math.PI;
//		}
		
		switch(this.__state) {
			case Car.State.ACCELERATING:
				this.__box.applyImpulse(
					new BABYLON.Vector3(this.__acceleration * Math.sin(this.__heading), 0, this.__acceleration * Math.cos(this.__heading)),
					this.__box.position
//					new BABYLON.Vector3(this.__box.position.x, this.__box.position.y, this.__box.position.z - this.__steer_angle)
				);
				//DEBUG
				this.__last_impulse = new BABYLON.Vector3(this.__acceleration * Math.cos(this.__heading), 0, this.__acceleration * Math.sin(this.__heading));
				break;
			
//			case Car.State.BRAKING:
//				this.__box.applyImpulse(
//					new BABYLON.Vector3(-this.__braking * Math.sin(this.__heading), 0, -this.__braking * Math.cos(this.__heading)),
//					this.__box.position
//				);
//				//DEBUG
//				this.__last_impulse = new BABYLON.Vector3(-this.__braking * Math.cos(this.__heading), 0, -this.__braking * Math.sin(this.__heading));
//				break;
			
//			default:
//				this.__box.applyImpulse(
//					new BABYLON.Vector3(Math.cos(this.__heading), 0, Math.sin(this.__heading)),
//					this.__box.position
//				);
//				break;
		}
		
	}
//	
//	if(this.__steer_angle !== 0) {
//		this.__box.rotate(BABYLON.Axis.Y, this.__steer_angle, BABYLON.Space.LOCAL);
//		this.__box.updatePhysicsBodyPosition();
//	}
};

Car.prototype.toString = function() {
	return "heading: " + this.__heading.toString() +
//	     "\nspeed: " + this.__speed.toString() +
	     "\nsteer_angle: " + this.__steer_angle.toString() +
	     "\nstate: " + this.__state +
	     "\nimpulse x: " + this.__last_impulse.x +
	     "\nimpulse y: " + this.__last_impulse.y +
	     "\nimpulse z: " + this.__last_impulse.z;
};

Car.State = {
	REST: 0,
	ACCELERATING: 1,
	BRAKING: 2
};
