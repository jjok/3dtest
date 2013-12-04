
var Car = function(box) {
	this.__box = box;
	this.__speed = 0;
	this.__top_speed = 10;
	this.__acceleration = 0.001;
	
	// this.__heading = 0;
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

Car.prototype.update = function() {
	this.__box.position.x += this.__speed;
};
