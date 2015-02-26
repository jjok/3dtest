
var App = function(canvas) {
	this.__canvas = canvas;
};

/**
 * Initialise the game and run the game loop.
 */
App.prototype.run = function() {
	this.__init();
	
	this.__engine.runRenderLoop(function() {
		this.__update();
		this.__draw();
	}.bind(this));
};

App.prototype.__init = function() {

	// Move this ////////////////////////////////////////
	// Load BABYLON 3D engine
	this.__engine = new BABYLON.Engine(this.__canvas, true);
	this.__scene = new BABYLON.Scene(this.__engine);
	
	//http://doc.babylonjs.com/page.php?p=22061
	var camera = new BABYLON.ArcRotateCamera(
		"Camera",
		0, 0.8, 30, new BABYLON.Vector3(0, 0, 0), this.__scene);
	
	//http://doc.babylonjs.com/page.php?p=22071
	var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 4, 10), this.__scene);
//	var light = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(0, -1, 0), this.__scene);
//	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.__scene);

	this.__scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());
	
//	var light = new BABYLON.DirectionalLight("Light", new BABYLON.Vector3(-1, -2, -1), this.__scene);
//	light.position = new BABYLON.Vector3(0, 20, 0);
	
	// Ground
	var ground = BABYLON.Mesh.CreateGround("ground", 40, 40, 1, this.__scene, false);
	ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
	
	var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.__scene);
	groundMaterial.specularColor = new BABYLON.Color3(255, 255, 255);
//	groundMaterial.diffuseTexture = new BABYLON.Texture("wood.png", scene);
//	groundMaterial.diffuseTexture.uScale = 2;
//	groundMaterial.diffuseTexture.vScale = 2;
	ground.material = groundMaterial;
//	ground.receiveShadows = true;
//	ground.renderingGroupId = 1;
	
	var box = BABYLON.Mesh.CreateBox("Box", 1.0, this.__scene);
	box.position = new BABYLON.Vector3(0, 1/*0.55*/, 0);
	
//	box.renderingGroupId = 1;
//	box.receiveShadows = true;
	box.setPhysicsState({
		impostor: BABYLON.PhysicsEngine.BoxImpostor,
		mass: 5,
		friction: 0.01,
		restitution: 0.5
	});
	this.__car = new Car(
		box
	);
	
//	ground.checkCollisions = true;
//	box.checkCollisions = true;
	
//	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
//	shadowGenerator.getShadowMap().renderList.push(box);
	
	this.__control_state = new ControlState(
		37, //left
		39, //right
		32, //space
		90  //z
	);
	var self = this;
	document.addEventListener("keydown", function(e) {
		self.__control_state.keyDown(e.keyCode);
//		console.log(self.__control_state);
	}, false);
	document.addEventListener("keyup", function(e) {
		self.__control_state.keyUp(e.keyCode);
//		console.log(self.__control_state);
	}, false);
	//////////////////////////////////////////
};

App.prototype.__update = function() {
	//TODO
	var dt = 1 / 60;
//	this.__counter++;
//	if(this.__counter == 80) {
//		this.__engine.stopRenderLoop();
//	}
	
	if(this.__control_state.brake) {
//		this.__car.brake();
		this.__car.setState(Car.State.BRAKING);
	}
	else if(this.__control_state.accelerate) {
//		this.__car.accelerate();
		this.__car.setState(Car.State.ACCELERATING);
	}
	else {
//		this.__car.decelerate();
		this.__car.setState(Car.State.REST);
	}
	
	if(this.__control_state.left) {
		this.__car.turnLeft();
	}
	else if(this.__control_state.right) {
		this.__car.turnRight();
	}
	else {
		this.__car.unturn();
	}
	
	this.__car.update(dt);
};

App.prototype.__draw = function() {
	this.__scene.render();
	
	//FIXME
	var debug = document.getElementById("debug");
	debug.textContent = this.__car.toString();
};
