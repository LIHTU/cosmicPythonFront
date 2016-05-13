window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
	canvasApp();
}

function canvasSupport () {
  return Modernizr.canvas;
}

function canvasApp () {
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

  if (!canvasSupport()) {
	return;
}

	var canvas = document.getElementById("canvasOne");
	var context = canvas.getContext("2d");

  var stage = canvas.getBoundingClientRect();  // should be background
	var mx, my;
	var onCassyStar = false;
	var onDonkeyStar;

	var star;
	var donkeyHover = false;
	var cassyHover = false;
	var xOrig, yOrig;

	var starAlphaMin = 0.3;
	var starAlphaMax = 0.8;

	var donkeyObj = {
		x: 205,
		y: 174,
		r: 160
	}

	// may want to make hover a function; Hell, may want to use OOP on Star Object...
	// var donkey = [[300,50],[256,216],[210,150],[130,180],[100,250]];
	star1 = { x: 300, y: 65, name: 'star1', hover: false, desc: "Learn to mutate strings."};
	star2 = { x: 256, y: 231, name: 'star2', hover: false, desc: "Some description can go here."};
	star3 = { x: 210, y: 165, name: 'star3', hover: false, desc: "Some description can go here." };
	star4 = { x: 130, y: 195, name: 'star4', hover: false, desc: "Some description can go here." };
	star5 = { x: 100, y: 265, name: 'star5', hover: false, desc: "Some description can go here." };
	donkeyObj.stars = [star1, star2, star3, star4, star5];

	var cassyObj = {
		x: 205,
		y: 560,
		r: 140,
		name: "Casseopeia"
	}

	star6 = { x: 95, y: 500, name: 'star6', hover: false, desc: "Some description can go here." };
	star7 = { x: 145, y: 604, name: 'star7', hover: false, desc: "Some description can go here." };
	star8 = { x: 195, y: 552, name: 'Concatenating Kittens', hover: false, desc: "Display values of differing types." };
	star9 = { x: 245, y: 620, name: 'star9', hover: false, desc: "Some description can go here." };
	star10 = { x: 325, y: 560, name: 'star10', hover: false, desc: "Some description can go here." };
	cassyObj.stars = [star6, star7, star8, star9, star10];

	var fezObj = {
		x: 580,
		y: 365,
		r: 140,
		name: "Fez",
		hover: false
	}

	star11 = { x: 480, y: 410, name: 'star11', hover: false, desc: "Some description can go here." };
	star12 = { x: 510, y: 310, name: 'star12', hover: false, desc: "Some description can go here." };
	star13 = { x: 651, y: 301, name: 'Star13', hover: false, desc: "Display values of differing types." };
	star14 = { x: 680, y: 400, name: 'star14', hover: false, desc: "Some description can go here." };
	fezObj.stars = [star11, star12, star13, star14];

	var galaxy = [donkeyObj, cassyObj];

	////////////////////////////////////
	/////  Helper Functions  ///////////
	////////////////////////////////////

	// converts angle to radians
	function inRads(angle) {
		return angle * Math.PI / 180;
	}

	function plotPaths(constellation) {
		var c = constellation;

		var firstPoint = [c[0].x, c[0].y];
		context.strokeStyle = "#7dffff";
		context.lineWidth = 2;
		// context.setLineDash([4,6]);
		context.beginPath();
		context.moveTo(firstPoint[0],firstPoint[1]);
		for(p=1; p<c.length; p++) {
			nextPoint = [c[p].x, c[p].y];
			context.lineTo(nextPoint[0],nextPoint[1]);
		}
		context.stroke();
		context.closePath();
		context.setLineDash([0]);
	}

	function plotPoints(constellation) {
		var c = constellation;
		var drawLast = [];

		context.strokeStyle ="#FFFFFF";
		context.shadowBlur = 10;
		context.shadowColor = "#c164fa";

		for(i=0; i<c.length; i++){
			star = c[i];
			var nimbus = 5;

			if (i===0 || i==3) {
				context.globalAlpha = alpha1;
				nimbus = 5;

			} else if (i==1 || i==4) {
				context.globalAlpha = alpha2;
				nimbus = 7;
			} else {
				context.globalAlpha = alpha3;
				nimbus = 9;
			}

			if (star.hover === true) {
				drawLast.push(star);
			} else {
				// draw nimbus
				context.lineWidth = 2;
				context.beginPath();
				context.arc(star.x,star.y,nimbus,0,2*Math.PI);
				context.stroke();
				context.closePath();

				// draw center dot
				context.globalAlpha = 1;
				context.lineWidth = 3;
				context.beginPath();
				context.arc(star.x,star.y,1,0,2*Math.PI);
				context.stroke();
				context.closePath();
			}
		}

		// draw hovered star and tooltip on top of rest.
		if (drawLast.length > 0) {
			nimbus = 12;
			star = drawLast[0];
			context.globalAlpha = 1;
			displayInfo(star);
			context.lineWidth = 2;
			context.beginPath();
			context.arc(star.x,star.y,nimbus,0,2*Math.PI);
			context.stroke();
			context.closePath();

			// draw center dot
			context.globalAlpha = 1;
			context.lineWidth = 3;
			context.beginPath();
			context.arc(star.x, star.y,1,0,2*Math.PI);
			context.stroke();
			context.closePath();

			displayInfo(star);
		}
		context.shadowColor = "#000000";
		context.shadowBlur = 0;
		context.globalAlpha = 1;
	}

	function displayInfo(star) {
		var x = star.x;
		var y = star.y;
		context.lineWidth = 2;
		context.fillStyle = "#002222";
		if (x<100) {
			x += 50;
		}
		if (y<100) {
			y = y + 120;
		}
		context.rect(x-100,y-100, 250, 80);
		context.fillRect(x-100,y-100, 250, 80);
		context.stroke();
		context.shadowBlur = 0;
		context.fillStyle = "#a0a0a0";
		context.font = "18px Monospace";
		context.fillText(star.name, x-90, y-90);
		context.font = "12px Monospace";
		context.fillText(star.desc, x-90, y-65);
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
		mx = event.clientX - stage.left + 0.5 | 0;  // faster "rounding"
		my = event.clientY - stage.top + 0.5 | 0;
		$("#debug-mouse").html(mx + " || " + my);
	}

	function dashCircleDonkey() {
		if (donkeyHover) {
			context.globalAlpha = 0.8;
		} else {
			context.globalAlpha = 0.25;
		}
		context.strokeStyle = "#ff4aff";
		context.lineWidth = 2;
		var end = 2*Math.PI;
		for (start=0; start<end; start += end/50) {
			context.beginPath();
			context.arc(donkeyObj.x, donkeyObj.y, donkeyObj.r, start, start+0.06283185307179587, false);
			context.closePath();
			context.stroke();
			context.closePath();
		}
		context.globalAlpha = 1;
	}
	//
	// function donkeyToolTip() {
	// 	if (donkeyHover && !onDonkeyStar) {
	// 		console.log(onDonkeyStar);
	// 		context.strokeStyle = "#ff4aff";
	// 		context.fillStyle = "#ff4aff";
	// 		context.strokeRect(500, 250, 200, 100);
	// 	}
	// }

	function dashCircleCassy() {
		if (cassyHover) {
			context.globalAlpha = 0.8;
		} else {
			context.globalAlpha = 0.25;
		}
		context.strokeStyle = "#ff4aff";
		context.lineWidth = 2;
		var end = 2*Math.PI;
		for (start=0; start<end; start += end/50) {
			context.beginPath();
			context.arc(cassyObj.x, cassyObj.y, cassyObj.r, start, start+0.06283185307179587, false);
			context.closePath();
			context.stroke();
			context.closePath();
		}
		context.globalAlpha = 1;
	}

	function dashCircleConst(cluster) {
		console.log(cluster.hover);
		if (cluster.hover) {
			context.globalAlpha = 0.8;
		} else {
			context.globalAlpha = 0.25;
		}
		context.strokeStyle = "#ff4aff";
		context.lineWidth = 2;
		var end = 2*Math.PI;
		for (start=0; start<end; start += end/50) {
			context.beginPath();
			context.arc(cluster.x, cluster.y, cluster.r, start, start+0.06283185307179587, false);
			context.closePath();
			context.stroke();
			context.closePath();
		}
		context.globalAlpha = 1;
	}

	/////////////////////////   *
	//// Animation loop /////  *
	/////////////////////////   *

  function drawScreen() {

		//background
		context.globalAlpha = 1;
		context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

		//image
    context.globalAlpha = .5;
		context.drawImage(nebulaImg, 0, 0, canvas.width, canvas.height);
		context.globalAlpha = 1;

		// //text
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
			alpha1 += 0.01;
			if (alpha1 >= starAlphaMax)  {
				alpha1 = starAlphaMax;
				fadeIn1 = false;
			}
		} else {
			alpha1 -= 0.01;
			if (alpha1 < starAlphaMin)  {
				alpha1 = starAlphaMin;
				fadeIn1 = true;
			}
		}

		if (fadeIn2) {
			alpha2 += 0.01;
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

		//////////////////////////////////   *
		////////// Star hit testing //////   *
		//////////////////////////////////   *

		$(canvas).mousemove(function(event){
			mousePos(event);
		});

		// // hit testing on stars
		// WHY CAN'T I ITERATE THORUGH THE GALAXY LOOP?  ONLY READS THE FIRST ITEM IN THE ARRAY (casseopeia)...
		// for (i=0; i<galaxy.length; i++){
		// 	// console.log(i);
		// 	var c = galaxy[i];
		// 	for (i=0; i<c.length; i++){
		// 		var star = c[i];
		// 		// console.log(mx, my);
		// 		// console.log(star.x);
		// 		if ((mx >= star.x) && (mx <= star.x + 10) && (my >= star.y) && (my <= star.y + 10)) {
		// 			star.hover = true;
		// 			console.log("hit!");
		// 		}
		// 	}
		// }

		for (i=0; i<cassyObj.stars.length; i++){
			star = cassyObj.stars[i];
			if ((mx >= star.x - 10) && (mx <= star.x + 10) && (my >= star.y - 10) && (my <= star.y + 10)) {
				star.hover = true;
				onCassyStar = true;
			} else {
				star.hover = false;
				onCassyStar = false;
			}
		}

		for (i=0; i<donkeyObj.stars.length; i++){
			star = donkeyObj.stars[i];
			star.hover = false;
			// donkeyToolTip();
			onDonkeyStar = false;
			if ((mx >= star.x -10) && (mx <= star.x + 10) && (my >= star.y - 10) && (my <= star.y + 10)) {
				star.hover = true;
				onDonkeyStar = true;
				console.log(onDonkeyStar);
			}
			else {
				star.hover = false;
				// donkeyToolTip();
				onDonkeyStar = false;
			}
		}

		for (i=0; i<fezObj.stars.length; i++){
			star = fezObj.stars[i];
			if ((mx >= star.x - 10) && (mx <= star.x + 10) && (my >= star.y - 10) && (my <= star.y + 10)) {
				star.hover = true;
				onfezStar = true;
			} else {
				star.hover = false;
				onfezStar = false;
			}
		}

		var donkeyDistX = (donkeyObj.x - mx) * (donkeyObj.x - mx);
		var donkeyDistY = (donkeyObj.y - my) * (donkeyObj.y - my);
		var donkeyDistSquared = donkeyDistX + donkeyDistY;

		//
		if (donkeyDistSquared < donkeyObj.r * donkeyObj.r) {
			donkeyHover = true;
		} else {
			donkeyHover = false;
		}

		var fezDistX = (fezObj.x - mx) * (fezObj.x - mx);
		var fezDistY = (fezObj.y - my) * (fezObj.y - my);
		var fezDistSquared = fezDistX + fezDistY;
		//
		if (fezDistSquared < fezObj.r * fezObj.r) {
			fezObj.hover = true;
		} else {
			fezObj.hover = false;
		}

		dashCircleDonkey();
		dashCircleCassy();
		dashCircleConst(fezObj);

		// donkey tooltip
		if (donkeyHover) {
			xOrig = 390;
			yOrig = 175;
			context.strokeStyle = "#ff4aff";
			context.fillStyle = "rgba(0, 0, 0, 0.5)";
			context.fillRect(xOrig,yOrig,203,125);

			context.font = "14px Monospace";
			context.fillStyle = "#FFFFFF";
			context.fillText("Cluster: El Burro", xOrig+10, yOrig + 10);
			context.fillText("Badges Required: :)  ;)", xOrig+10, yOrig+30);
			context.fillText("Badges Awarded: :{  ;{", xOrig+10, yOrig+50);
		}

		if (cassyHover) {
			xOrig = 370;
			yOrig = 525;
			context.strokeStyle = "#ff4aff";
			context.fillStyle = "rgba(0, 0, 0, 0.5)";
			context.fillRect(xOrig,yOrig,203,125);

			context.font = "14px Monospace";
			context.fillStyle = "#FFFFFF";
			context.fillText("Cluster: Casseopeia", xOrig+10, yOrig + 10);
			context.fillText("Badges Required: :)  ;)", xOrig+10, yOrig+30);
			context.fillText("Badges Awarded: :{  ;{", xOrig+10, yOrig+50);
		}

		if (fezObj.hover) {
			xOrig = fezObj.x +170;
			yOrig = fezObj.y-30;
			context.strokeStyle = "#ff4aff";
			context.fillStyle = "rgba(0, 0, 0, 0.5)";
			context.fillRect(xOrig,yOrig,203,125);

			context.font = "14px Monospace";
			context.fillStyle = "#FFFFFF";
			context.fillText("Cluster: Fez", xOrig+10, yOrig + 10);
			context.fillText("Badges Required: :)  ;)", xOrig+10, yOrig+30);
			context.fillText("Badges Awarded: :{  ;{", xOrig+10, yOrig+50);
		}

		plotPaths(donkeyObj.stars);
		plotPaths(cassyObj.stars);
		console.log(fezObj.stars);
		plotPaths(fezObj.stars);

		plotPoints(donkeyObj.stars);
		plotPoints(cassyObj.stars);
		plotPoints(fezObj.stars);

		//////////////////////////////////   *
		// Constellation hit testing /////   *
		//////////////////////////////////   *

		var cassyDistX = (cassyObj.x - mx) * (cassyObj.x - mx);
		var cassyDistY = (cassyObj.y - my) * (cassyObj.y - my);
		var cassyDistSquared = cassyDistX + cassyDistY;

		if (cassyDistSquared < cassyObj.r * cassyObj.r) {
			cassyHover = true;
		} else {
			cassyHover = false;
		}


	} // end of drawScreen

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
		requestAnimationFrame(gameLoop);
		drawScreen();
	}

	requestAnimationFrame(gameLoop);

}
