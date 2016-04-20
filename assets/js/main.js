window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
	canvasApp();
}

function canvasSupport () {
  return Modernizr.canvas;
}

function canvasApp () {

  if (!canvasSupport()) {
	return;
  }

	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

  function drawScreen() {
		width = 1200;
		height = 800;

		//background
		// context.globalAlpha = .5;
		context.fillStyle = "#000000";
    context.fillRect(0, 0, 1200, 800);

		//image
    context.globalAlpha = .25;
		context.drawImage(nebulaImg, 0, 0);

		//text
		context.font         = "72px Monospace";
		context.textBaseline = "top";

		if (fadeIn) {
			alpha += 0.01;
			if (alpha >= 1)  {
				alpha = 1;
				fadeIn = false;
			}
		} else {
			alpha -= 0.01;
			if (alpha < 0)  {
				alpha = 0;
				fadeIn = true;
			}
		}

		context.globalAlpha = alpha;
		context.fillStyle    = "#FFFFFF";
		context.textAlign = "center";
		context.fillText  (text, 600,400);

		// sets drawing opacity to max for rest of objects rendered in game loop.
		context.globalAlpha = 1;

		//diamond marker
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


		// reset origin
		context.setTransform(1,0,0,1,0,0);
		context.shadowColor = "#000000";

		context.strokeStyle = "#7dffff";
		context.lineWidth = 2;
		context.setLineDash([4,6]);
		context.beginPath();
		context.moveTo(200,50);
		context.lineTo(178,133);
		context.lineTo(155,100);
		context.lineTo(115,115);
		context.lineTo(100,150);
		context.stroke();
		context.closePath();
		context.setLineDash([0]);

		context.fillStyle = "#f6d62b";
		context.strokeStyle ="#FFFFFF";
		angledMarker(200,50,10,10,inRads(45));
		angledMarker(178,133,10,10,inRads(45));
		angledMarker(155,100,10,10,inRads(45));
		angledMarker(115,115,10,10,inRads(45));
		angledMarker(100,150,10,10,inRads(45));

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

			while(coordsList.length > 0) {
				nextPoint = coordsList.pop();

				context.lineWidth = 1;
				context.beginPath();
				context.arc(nextPoint[0],nextPoint[1],5,0,2*Math.PI);
				context.stroke();
				context.closePath();

				context.lineWidth = 3;
				context.beginPath();
				context.arc(nextPoint[0],nextPoint[1],1,0,2*Math.PI);
				context.stroke();
				context.closePath();
			}
			context.shadowColor = "#000000";
		}

		// try drawing second constellation with array of arrays...?
		var casseopeia = [[95,500],[120,552],[145,526],[170,560],[210,530]];
		plotPaths(casseopeia);
		plotPoints(casseopeia);
		// debugger;


	} // end of drawScreen

		var text = "Pythonic Cosmos";
		var alpha = 0;
		var fadeIn = true;

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
