function calculateIntersection(p1, p2, p3, p4) {

    var c2x = p3.x - p4.x; // (x3 - x4)
  	var c3x = p1.x - p2.x; // (x1 - x2)
  	var c2y = p3.y - p4.y; // (y3 - y4)
  	var c3y = p1.y - p2.y; // (y1 - y2)
  
  	// down part of intersection point formula
  	var d  = c3x * c2y - c3y * c2x;
  
  	if (d == 0) {
    	return false
    }
  
  	// upper part of intersection point formula
  	var u1 = p1.x * p2.y - p1.y * p2.x; // (x1 * y2 - y1 * x2)
  	var u4 = p3.x * p4.y - p3.y * p4.x; // (x3 * y4 - y3 * x4)
  
  	// intersection point formula
  	
  	var px = (u1 * c2x - c3x * u4) / d;
  	var py = (u1 * c2y - c3y * u4) / d;
  	
  	var p = { x: px, y: py };
  
  	return p;
}
var currentId_DO_NOT_TOUCH = 0
function uniqueId() {
	currentId_DO_NOT_TOUCH += 1
	return currentId_DO_NOT_TOUCH
}

function v(x=0,y=0) {
    return {x:x,y:y}
}

function round(num, dec) {
    return Math.round(num * Math.pow(10, dec + 1)) / Math.pow(10, dec + 1)
}

function average() {
    let num = 0
    for (let argument of arguments) {
        num += argument
    }
    return num / arguments.length
}

function testRectCollision(x, y, width, height, x2, y2, width2, height2) {
    if (((x2 > x && x2 < x + width) || (x2 + width2 > x && x2 + width2 < x + width)) && ((y2 > y && y2 < y + height) || (y2 + height2 > y && y2 + height2 < y + height))) {
        return true
    } else {
        return false
    }

}

function stopOverflow(num, max) {
    return ((((num)) % max + max) % max)

}

function randInt(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function array2d(width, height, callback=(i,j)=>{return undefined}) {
	var returnArray = new Array(width)
	for (let i = 0; i < returnArray.length; i++) {
		returnArray[i] = new Array(height)
		for (let j = 0; j < returnArray[i].length; j++) {
			returnArray[i][j] = callback(i, j)
		}
	}
	return returnArray
}

function removeArray(array, position) {
    let returnArray = new Array()
    for (let i = 0; i <= position - 1; i++) {
        returnArray.push(array[i])
    }
    for (let i = array.length - 1; i >= position + 1; i--) {
        returnArray.push(array[i])
    }
    return returnArray
}

function arrayRange(array, min, max) {
    let returnArray = new Array()
    for (let i = min; i < max; i++) {
        returnArray.push(array[i])
    }
    return returnArray

}

function intersects(a, b, c, d, p, q, r, s) {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

function getDst(x, y) {
    let xd = (x.x - y.x)
    let yd = (x.y - y.y)
    return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2))
}

function get3dDistance(x, y, z, a, b, c) {
    let xd = (x - a)
    let yd = (y - b)
    let zd = (z - c)
    return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2) + Math.pow(zd, 2))
}

function getAngle(x, y) {
    return Math.atan2(x.x - y.x, x.y - y.y) / (Math.PI / 180)
}

function cos(num) {
    return Math.cos(num * Math.PI / 180)
}

function sin(num) {
    return Math.sin(num * Math.PI / 180)
}

function radians(num) {
    return num * Math.PI / 180
}

function drawText(ctx, x, y, text = "", size = 30, fill = "#000000") {
    ctx.fontSize = `${size} Arial`
    let length = ctx.measureText(text)

    ctx.fillStyle = fill
    ctx.textAlign = "center"
    ctx.fillText(x - (length / 2), y, text)
}


function rotateVelocity(vel, angle) {

	return v(vel.x * cos(angle) - vel.y * sin(angle), vel.x * sin(angle) + vel.y * cos(angle))
}

function drawLine(ctx, pos, angle, length=30) {
	var pos1 = pos,
		pos2 = v(pos.x+(cos(angle)*length), pos.y+(sin(angle)*length))

	ctx.beginPath()
	ctx.moveTo(pos1.x, pos1.y)
	ctx.lineTo(pos2.x, pos2.y)
	ctx.stroke()
	ctx.closePath()
}
function averageVertices() {
	var average = v()
	for (let i = 0; i < arguments.length; i++) {
		const vertice = arguments[i];
		average.x += vertice.x
		average.y += vertice.y
	}
	return v(average.x/arguments.length, average.y/arguments.length)
}

function rotate(cx, cy, x, y, angle) {
    var radians = angle,
        cos2 = cos(radians),
        sin2 = sin(radians),
        nx = (cos2 * (x - cx)) + (sin2 * (y - cy)) + cx,
        ny = (cos2 * (y - cy)) - (sin2 * (x - cx)) + cy;
    return v(nx, ny);
}

// LINE/RECTANGLE
function lineRect(pos1, pos2, rect, angle=0, ctx) {

	var x1 = pos1.x,  
		y1 = pos1.y,  
		x2 = pos2.x,  
		y2 = pos2.y,  
		rx = rect.x,  
		ry = rect.y,
		rw = rect.width,  
		rh = rect.height

	angle *= Math.PI/180

	var rectCenter = v(rx, ry),
		pos1 = rotate(rectCenter.x, rectCenter.y, pos1.x, pos1.y, angle),
		pos2 = rotate(rectCenter.x, rectCenter.y, pos2.x, pos2.y, angle),
		rectPos = rotate(rectCenter.x, rectCenter.y, rect.x, rect.y, angle),


		x1 = pos1.x,  
		y1 = pos1.y,  
		x2 = pos2.x,  
		y2 = pos2.y,

		rx = rectPos.x, 
		ry = rectPos.y,
		rw = rect.width,  
		rh = rect.height

	
	

	// check if the line has hit any of the rectangle's sides
	// uses the Line/Line function below
	var left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
	var right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
	var top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
	var bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
  

	// if ANy of the above are true, the line
	// has hit the rectangle
	if (left || right || top || bottom) {
	  return true;
	}
	return false;
  }
  
  
  // LINE/LINE
  function lineLine( x1,  y1,  x2,  y2,  x3,  y3,  x4,  y4) {

  
	// calculate the direction of the lines
	 var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
	 var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  
	// if uA and uB are between 0-1, lines are colliding
	if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
  
	  // optionally, draw a circle where the lines meet
	   intersectionx = x1 + (uA * (x2-x1));
	   intersectiony = y1 + (uA * (y2-y1));
	  
  
	  return v(intersectionx, intersectiony);
	}
	return false;
  }
  function bias(t, n) {
	let e = Math.pow(1 - n, 3);
	return (t * e) / (t * e - t + 1);
  }

  function IsPolygonsIntersecting(a, b)
  {
	  
	  [a, b].forEach(polygon => {
		
		  for (var i1 = 0; i1 < polygon.Points.Count; i1++)
		  {
			  var i2 = (i1 + 1) % polygon.Points.Count;
			  var p1 = polygon.Points[i1];
			  var p2 = polygon.Points[i2];
  
			  var normal = new Point(p2.y - p1.y, p1.x - p2.x);
  
			  var minA = null, maxA = null;
			  a.Points.forEach(p => {
			  
				  var projected = normal.x * p.x + normal.y * p.y;
				  if (minA == null || projected < minA){
					  minA = projected;
				  }
				  if (maxA == null || projected > maxA){
					  maxA = projected;
				  }
			  })
  
			 minB = null
			 maxB = null;
			 b.Points.foreach(p =>
			  {
				  var projected = normal.x * p.x + normal.y * p.y;
				  if (minB == null || projected < minB)
					  minB = projected;
				  if (maxB == null || projected > maxB)
					  maxB = projected;
			  })
  
			  if (maxA < minB || maxB < minA)
				  return false;
		  }
	  })
	  return true;
  }


const i_x = 1;
const i_y = 0.5;
const j_x = -1;
const j_y = 0.5;

// Sprite size
const w = 80;
const h = 40;

function to_screen_coordinate(tile) {
  

  // Accounting for sprite size
  return {
    x: tile.x * i_x * 0.5 * w + tile.y * j_x * 0.5 * w,
    y: tile.x * i_y * 0.5 * h + tile.y * j_y * 0.5 * h,
  }

  // Without accounting for sprite size
  return {
    x: tile.x * i_x + tile.y * j_x,
    y: tile.x * i_y + tile.y * j_y,
  }
}

// Going from screen coordinate to grid coordinate
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
function invert_matrix(a, b, c, d) {
  // Determinant 
  const det = (1 / (a * d - b * c));
  
  return {
    a: det * d,
    b: det * -b,
    c: det * -c,
    d: det * a,
  }
}

function to_grid_coordinate(screen, sizes) {
  const a = i_x * 0.5 * sizes.x;
  const b = j_x * 0.5 * sizes.x;
  const c = i_y * 0.5 * sizes.y;
  const d = j_y * 0.5 * sizes.y;
  
  const inv = invert_matrix(a, b, c, d);
  
  return {
    x: screen.x * inv.a + screen.y * inv.b,
    y: screen.x * inv.c + screen.y * inv.d,
  }
}


function d2ToIso(pos, dim) {
	return v(
		0.5 * ( pos.x / (dim.x*0.5) + pos.y / (dim.y*0.5)),
		0.5 * (-pos.x / (dim.x*0.5) + pos.y / (dim.y*0.5))


	)
}
function isoTo2d(pos, dim) {
	return v(
		(pos.x * (dim.x*0.5) - pos.y * (dim.y*0.5)),
		(-pos.x * (dim.x*0.5) - pos.y * (dim.y*0.5)),	
		)
}