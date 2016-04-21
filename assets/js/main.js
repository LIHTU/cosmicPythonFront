window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
	canvasApp();
}

function canvasSupport () {
  return Modernizr.canvas;
}

function cl(exp){
	console.log(exp);
}

function canvasApp () {

  if (!canvasSupport()) {
	return;
  }

	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

  function drawScreen() {
		// properities
		width = 1200;
		height = 800;

		//background
		context.globalAlpha = 1;
		context.fillStyle = "#000000";
    context.fillRect(0, 0, 1200, 800);

		//image
    context.globalAlpha = .25;
		context.drawImage(nebulaImg, 0, 0, 1200, 800);
		context.globalAlpha = 1;


		//text
		context.font         = "72px Monospace";
		context.textBaseline = "top";

		if (fadeIn1) {
			alpha1 += 0.01;
			if (alpha1 >= 1)  {
				alpha1 = 1;
				fadeIn1 = false;
			}
		} else {
			alpha1 -= 0.01;
			if (alpha1 < .2)  {
				alpha1 = .2;
				fadeIn1 = true;
			}
		}

		if (fadeIn2) {
			alpha2 += 0.01;
			if (alpha2 >= 1)  {
				alpha2 = 1;
				fadeIn2 = false;
			}
		} else {
			alpha2 -= 0.01;
			if (alpha2 < .2)  {
				alpha2 = .2;
				fadeIn2 = true;
			}
		}

		if (fadeIn3) {
			alpha3 += 0.01;
			if (alpha3 >= 1)  {
				alpha3 = 1;
				fadeIn3 = false;
			}
		} else {
			alpha3 -= 0.01;
			if (alpha3 < .2)  {
				alpha3 = .2;
				fadeIn3 = true;
			}
		}

		// helper functions
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

		function circleMarker(x,y,width,height) {
			context.lineWidth = 3;
			context.shadowBlur = 20;
			context.shadowColor = "#c164fa";
			context.translate(x, y);
			context.rotate(angle);
			context.fillRect(-0.5*width, -0.5*height, width, height);
			context.strokeRect(-0.5*width, -0.5*height, width, height);
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
			// debugger;
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

				context.lineWidth = 1;
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
				console.log(xList);
				yList.push(pair[1]);
			}

			xMin = findMin(xList);
			yMin = findMin(yList);
			console.log(xMin);

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
			console.log(coordArray.toString());
			return coordArray;

		}

		var donkey = [[300,50],[256,216],[210,150],[130,180],[100,250]];
		var casseopeia = [[95,500],[145,604],[195,552],[245,620],[325,560]];

		plotPaths(casseopeia);
		plotPoints(casseopeia);

		plotPaths(donkey);
		plotPoints(donkey);

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
	}

	gameLoop();

}

// converts angle to radians
function inRads(angle) {
	return angle * Math.PI / 180;
}
