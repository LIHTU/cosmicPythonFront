window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
	canvasApp();
}

function canvasSupport () {
  return Modernizr.canvas;
}

var Rectangle = function(x,y,width,height,fill){
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 1;
	this.height = height || 1;
	this.fill = fill || "#AAAAAA";
}

Rectangle.prototype.draw = function(context) {
	context.fillStyle = this.fill;
	context.fillRect(this.x, this.y, this.width, this.height);
}

Rectangle.prototype.contains = function(mx, my) {
	return (this.x <= mx) && (this.x + this.width >= mx) && (this.y <= my) && (this.y + this.heigt >= my);
}

var testShape = {
	x: 500,
	y: 500,
	width: 100,
	height: 100
}

function canvasApp () {

  if (!canvasSupport()) {
	return;
  }

	var canvas = document.getElementById("canvasOne");
	var context = canvas.getContext("2d");

	var stage, mx, my;

	var starAlphaMin = 0.3;
	var starAlphaMax = 0.8;

	var donkey = [[300,50],[256,216],[210,150],[130,180],[100,250]];
	var casseopeia = [[95,500],[145,604],[195,552],[245,620],[325,560]];

  function drawScreen() {
		// properities


		//background
		context.globalAlpha = 1;
		context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

		//image
    context.globalAlpha = .25;
		context.drawImage(nebulaImg, 0, 0, canvas.width, canvas.height);
		context.globalAlpha = 1;


		//text
		context.font         = "72px Monospace";
		context.textBaseline = "top";

		// it's possible to store fadeIn as a property in an object.
		// Each star would be an object.
		// it's properties could be x, y, waxing (getting brighter),...
		// you could even store the challenge name, badges, and description text
		// in the object...
		// Here you would loop throught the star ojects.  Maybe you'd store
		// them in an array.
		// also, you could store
		if (fadeIn1) {
			alpha1 += 0.005;
			if (alpha1 >= starAlphaMax)  {
				alpha1 = starAlphaMax;
				fadeIn1 = false;
			}
		} else {
			alpha1 -= 0.005;
			if (alpha1 < starAlphaMin)  {
				alpha1 = starAlphaMin;
				fadeIn1 = true;
			}
		}

		if (fadeIn2) {
			alpha2 += 0.005;
			if (alpha2 >= starAlphaMax)  {
				alpha2 = starAlphaMax;
				fadeIn2 = false;
			}
		} else {
			alpha2 -= 0.005;
			if (alpha2 < starAlphaMin)  {
				alpha2 = starAlphaMin;
				fadeIn2 = true;
			}
		}

		if (fadeIn3) {
			alpha3 += 0.005;
			if (alpha3 >= starAlphaMax)  {
				alpha3 = starAlphaMax;
				fadeIn3 = false;
			}
		} else {
			alpha3 -= 0.005;
			if (alpha3 < starAlphaMin)  {
				alpha3 = starAlphaMin;
				fadeIn3 = true;
			}
		}

		function angledMarker(x,y,width,height,angle) {
			context.lineWidth = 3;
			context.shadowBlur = 20;
			context.shadowColor = "#c164fa";
			context.translate(x, y);
			context.rotate(angle);
			context.fillRect(-0.5*width, -0.5*height, width, height);
			context.strokeRect(-0.5*width, -0.5*height, width, height);

			// reset origin
			context.setTransform(1,0,0,1,0,0);
			context.shadowColor = "#000000";
		}

		function drawRect(x,y,width,height) {
			context.lineWidth = 3;
			context.shadowBlur = 20;
			context.shadowColor = "#c164fa";
			context.translate(x, y);
			context.fillRect(-0.5*width, -0.5*height, width, height);
			context.strokeRect(-0.5*width, -0.5*height, width, height);

			// reset origin
			context.setTransform(1,0,0,1,0,0);
			context.shadowColor = "#000000";
		}





		function plotPaths(coordsList) {
			var firstPoint = coordsList[0];
			context.strokeStyle = "#7dffff";
			context.lineWidth = 2;
			// context.setLineDash([4,6]);
			context.beginPath();
			context.moveTo(firstPoint[0],firstPoint[1]);
			for(p=1; p<coordsList.length; p++) {
				nextPoint = coordsList[p];
				context.lineTo(nextPoint[0],nextPoint[1]);
			}
			context.stroke();
			context.closePath();
			context.setLineDash([0]);
		}

		function plotPoints(coordsList) {
			context.fillStyle = "#f6d62b";
			context.strokeStyle ="#FFFFFF";
			context.shadowBlur = 20;
			context.shadowColor = "#c164fa";

			for(i=0; i<coordsList.length; i++){
				nextPoint = coordsList[i];
				var nimbus = 5;

				if (i==0 || i==3) {
					context.globalAlpha = alpha1;
					nimbus = 5;

				} else if (i==1 || i==4) {
					context.globalAlpha = alpha2;
					nimbus = 7;
				} else {
					context.globalAlpha = alpha3;
					nimbus = 9;
				}

				context.lineWidth = 2;
				context.beginPath();
				context.arc(nextPoint[0],nextPoint[1],nimbus,0,2*Math.PI);
				context.stroke();
				context.closePath();

				context.globalAlpha = 1;
				context.lineWidth = 3;
				context.beginPath();
				context.arc(nextPoint[0],nextPoint[1],1,0,2*Math.PI);
				context.stroke();
				context.closePath();
			}

			context.shadowColor = "#000000";
			context.globalAlpha = 1;
		}

		function scaler(coordArray, scale){
			xList = [];
			yList = [];

			function findMin(arr) {
				min = arr[0];
				for(i=1; i<arr.length; i++) {
					if (arr[i] < min) {
						min = arr[i];
					}
				}
				return min;
			}

			for (i=0; i<coordArray.length; i++){
				pair = coordArray[i];
				cl(pair);
				xList.push(pair[0]);
				yList.push(pair[1]);
			}

			xMin = findMin(xList);
			yMin = findMin(yList);


			for (i=0; i<coordArray.length; i++){
				pair = coordArray[i];
				x = pair[0] - xMin/scale;
				y = pair[1] - yMin/scale;
				x = x * scale;
				y = y * scale;
				pair[0] = x;
				pair[1] = y;
				coordArray[i] = pair;
			}

			return coordArray;

		}

		function mousePos(event) {
			stage = canvas.getBoundingClientRect();  // should be background
			mx = event.clientX - stage.left;  // also, stage, mx, my are global in canvasAPP
			my = event.clientY - stage.top;
			$("#debug-mouse").html(Math.round(mx) + " || " + Math.round(my));
		}

		// event handlers
		$(canvas).mousemove(function(event){
			mousePos(event);
		});


		// draw stuff
		// var Rect1 = new Rectangle(700, 300, 50, 50, "#777777");
		context.fillStyle = "#aa0000";
		context.fillRect(testShape.x, testShape.y, testShape.width, testShape.height);

		plotPaths(casseopeia);
		plotPoints(casseopeia);

		plotPaths(donkey);
		plotPoints(donkey);

		// hit testing
		if ((mx >= testShape.x) && (mx <= testShape.x + testShape.width) && (my >= testShape.y) && (my <= testShape.y + testShape.height)){
			context.fillStyle = "#aa0000";
			context.shadowBlur = 10;
			context.shadowColor = "#FFFFFF";
			context.fillRect(testShape.x, testShape.y, testShape.width, testShape.height);
			context.shadowBlur = 0;
		}

	} // end of drawScreen

	var text = "Pythonic Cosmos";
	var alpha1 = .5;
	var alpha2 = .25;
	var alpha3 = .9;
	var fadeIn1 = true;
	var fadeIn2 = true;
	var fadeIn3 = true;


	//image
	var nebulaImg = new Image();
	nebulaImg.src = "images/nebula.jpg";

	function gameLoop() {
		window.setTimeout(gameLoop, 20);
		drawScreen();
		// debugger;
	}

	gameLoop();

}

// converts angle to radians
function inRads(angle) {
	return angle * Math.PI / 180;
}
