
var ControlState = function(left, right, accelerate, brake) {
	this.__keys = {};
	this.__keys["key" + left] = "left";
	this.__keys["key" + right] = "right";
	this.__keys["key" + accelerate] = "accelerate";
	this.__keys["key" + brake] = "brake";
	
	this.left = false;
	this.right = false;
	this.accelerate = false;
	this.brake = false;
};

ControlState.prototype.keyDown = function(key) {
	if(typeof this.__keys["key" + key] != "undefined") {
		this[this.__keys["key" + key]] = true;
	}
};

ControlState.prototype.keyUp = function(key) {
	if(typeof this.__keys["key" + key] != "undefined") {
		this[this.__keys["key" + key]] = false;
	}
};
