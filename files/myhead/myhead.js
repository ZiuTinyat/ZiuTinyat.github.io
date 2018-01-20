var config = {
	objName: "myhead.obj",
	mtlName: "myhead.mtl"
};

var fileCount = 0;
var files = {};
var mousedown = false;
var moveX = 0;
var moveY = 0;
const defaultDirections = [0.3, 2.2, 0];
const defaultTranslation = [0, -1, -9];
const defaultRotationX = 1.2;
var directions = JSON.parse(JSON.stringify(defaultDirections));
var translation = JSON.parse(JSON.stringify(defaultTranslation));
var rotationX = defaultRotationX;
var lightDirection = [1, 1, 1];
var state = 1; // 1: light & head; 2: light only; 3: head only

var gl; 
var prog; 
var glObj; 
var vbuf; 
var nbuf; 
var vtbuf; 
var textures = {}; 
var frame = 0;
window.onload = function() {
	var callback = function() {
		fileCount--;
		if(fileCount == 0) {
			
			initialize();
		}
	};
	loadFile(config.objName, "obj", callback);
	loadFile(config.mtlName, "mtl", callback);
};
var loadFile = function(url, name, callback) {
	fileCount++;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			files[name] = xhr.responseText;
			callback();
		}
	};
	xhr.open("GET", url, true);
	xhr.send("");
};
var initialize = function() {
	
	var obj = objParser.objParse(files.obj);
	var mtl = objParser.mtlParse(files.mtl);
	
	objParser.createGLObject(obj, mtl, function(ret) {
		
		glObj = ret;
		
		
		var canvas = document.getElementById("canvas");
		gl = canvas.getContext("experimental-webgl") || canvas.getContext("webgl");
		if(!gl) {
			document.write("This browser does not support webgl");
			return;
		}
		canvas.onmousedown = handleMouseDown;
		canvas.onmouseup = handleMouseUp;
		canvas.onmousemove = handleMouseMove;
		canvas.onmousewheel = handleMouseWheel;
		window.onkeydown = handleKeyDown;
		
		// Vertex Shader
		var vs = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vs, document.getElementById("shader-vs").text);
		gl.compileShader(vs);
		if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
			console.log("vertex shader compile error");
			console.log(gl.getShaderInfoLog(vs));
			return;
		}

		// Fragment Shader
		var fs = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fs, document.getElementById("shader-fs").text);
		gl.compileShader(fs);
		if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
			console.log("fragment shader compile error");
			console.log(gl.getShaderInfoLog(fs));
			return;
		}

		// Shader
		prog = gl.createProgram();
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.linkProgram(prog);
		if(!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
			console.log("link error");
			console.log(gl.getShaderInfoLog(fs));
			return;
		}
		
		gl.useProgram(prog);
		loadBuffer();
		drawFrame();
	});
};
var loadBuffer = function() {
	
	vbuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
	gl.bufferData(gl.ARRAY_BUFFER, glObj.vertices, gl.STATIC_DRAW);
	
	nbuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, nbuf);
	gl.bufferData(gl.ARRAY_BUFFER, glObj.normals, gl.STATIC_DRAW);
	
	vtbuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vtbuf);
	gl.bufferData(gl.ARRAY_BUFFER, glObj.texcoords, gl.STATIC_DRAW);
};
var handleMouseDown = function(event){
	mousedown = true;
};
var handleMouseUp = function(event){
	mousedown = false;
};
var handleMouseWheel = function(event){
	translation[2] += event.wheelDeltaY / 120;
	translation[1] += event.wheelDeltaY / 1200;
};
var handleMouseMove = function(event){
	if (mousedown){
		moveX += event.movementX;
		moveY += event.movementY;
	}
};
var handleKeyDown = function(event){
	//console.log(event);
	if (event.code == "Escape"){
		directions = JSON.parse(JSON.stringify(defaultDirections));
		translation = JSON.parse(JSON.stringify(defaultTranslation));
		rotationX = defaultRotationX;
		//console.log(defaultDirections);
	}
	if (event.code == "ArrowLeft"){
		moveX += 10;
	}
	if (event.code == "ArrowRight"){
		moveX -= 10;
	}
	if (event.code == "ArrowUp"){
		if (event.ctrlKey) {
			moveY += 10;
		} else {
			translation[2] += 1;
			translation[1] += 0.1;
		}
	}
	if (event.code == "ArrowDown"){
		if (event.ctrlKey) {
			moveY -= 10;
		} else {
			translation[2] -= 1;
			translation[1] -= 0.1;
		}
	}
	if (event.code == "KeyA"){
		state = 1;
		document.getElementById("state1").style.color = 'red';
		document.getElementById("state2").style.color = 'black';
		document.getElementById("state3").style.color = 'black';
	}
	if (event.code == "KeyS"){
		state = 2;
		document.getElementById("state1").style.color = 'black';
		document.getElementById("state2").style.color = 'red';
		document.getElementById("state3").style.color = 'black';
	}
	if (event.code == "KeyD"){
		state = 3;
		document.getElementById("state1").style.color = 'black';
		document.getElementById("state2").style.color = 'black';
		document.getElementById("state3").style.color = 'red';
	}
}

var drawFrame = function() {
	frame++;
	
	if (state == 1 || state == 3){
		directions[1] += moveX * 0.01;
		directions[0] += moveY * 0.01;
	}
	if (state == 1 || state == 2){
		rotationX += moveX * 0.01;
		lightDirection[0] = Math.sin(rotationX); 
		lightDirection[2] = Math.cos(rotationX); 
	}
	moveX = 0;
	moveY = 0;
	var max = 1;
	if (directions[0] > max){
		directions[0] = max;
	} else if (directions[0] < -max){
		directions[0] = -max;
	}
	if (translation[2] > -5){
		translation[2] = -5;
	} else if (translation[2] < -18){
		translation[2] = -18;
	}
	if (translation[1] > -0.6){
		translation[1] = -0.6;
	} else if (translation[1] < -1.9){
		translation[1] = -1.9;
	}
	
	var proj_mat = mat4.create();
	mat4.frustum(proj_mat, -1, 1, -1, 1, 3, 30);
	
	var mv_mat = mat4.create();
	mat4.translate(mv_mat, mv_mat, translation);
	mat4.rotate(mv_mat, mv_mat, directions[0], [1, 0, 0]);
	mat4.rotate(mv_mat, mv_mat, directions[1], [0, 1, 0]);
	mat4.rotate(mv_mat, mv_mat, directions[2], [0, 0, 1]);
	var lt = mat4.create();
	mat4.translate(lt, lt, lightDirection);
	
	gl.uniformMatrix4fv(gl.getUniformLocation(prog, "projectionMatrix"), false, proj_mat);
	gl.uniformMatrix4fv(gl.getUniformLocation(prog, "modelviewMatrix"), false, mv_mat);
	gl.uniformMatrix4fv(gl.getUniformLocation(prog, "light"), false, lt);
	
	gl.clearColor(0.3, 0.5, 0.8, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	
	var vpos = gl.getAttribLocation(prog, "vertex");
	var npos = gl.getAttribLocation(prog, "normal");
	var vtpos = gl.getAttribLocation(prog, "texcoord");

	
	gl.bindBuffer(gl.ARRAY_BUFFER, vbuf); 
	gl.vertexAttribPointer(vpos, 3, gl.FLOAT, false, 0, 0); 
	gl.enableVertexAttribArray(vpos);

	gl.bindBuffer(gl.ARRAY_BUFFER, nbuf); 
	gl.vertexAttribPointer(npos, 3, gl.FLOAT, true, 0, 0); 
	gl.enableVertexAttribArray(npos);

	gl.bindBuffer(gl.ARRAY_BUFFER, vtbuf); 
	gl.vertexAttribPointer(vtpos, 2, gl.FLOAT, false, 0, 0); 
	gl.enableVertexAttribArray(vtpos);

	
	gl.colorMask(true, true, true, false);
	
	var pos = 0;
	for(var i = 0; i < glObj.mtlInfos.length; i++) {
		var mtlInfo = glObj.mtlInfos[i];

		
		gl.uniform3fv(gl.getUniformLocation(prog, "kdcolor"), mtlInfo.kd);
		gl.uniform3fv(gl.getUniformLocation(prog, "kscolor"), mtlInfo.ks);
		gl.uniform1f(gl.getUniformLocation(prog, "nscolor"), mtlInfo.ns); 

		
		if(mtlInfo.texture) {
			gl.bindTexture(gl.TEXTURE_2D, textures[mtlInfo.texture]);
			gl.uniform1i(gl.getUniformLocation(prog, "texture"), 0);
			gl.uniform1f(gl.getUniformLocation(prog, "hasTexture"), 1);
		} else {
			gl.uniform1f(gl.getUniformLocation(prog, "hasTexture"), 0);
		}
		
		gl.drawArrays(gl.TRIANGLES, pos / 3, (mtlInfo.endPos - pos) / 3);
		pos = mtlInfo.endPos;
	}
	
	gl.colorMask(true, true, true, true);
	setTimeout(drawFrame, 16);
};

