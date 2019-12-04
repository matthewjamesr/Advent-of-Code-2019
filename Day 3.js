var l1 = ['R75','D30','R83','U83','L12','D49','R71','U7','L72'];
var l2 = ['U62','R66','U55','R34','D71','R55','D58','R83']

var position = [0,0];
var paths = {'l1Path': [], 'l2Path': []};


var guidance1 = [];
var guidance2 = [];

var crossings = {'data': []};

function splitIndex(value, index) {
	return value.substring(0, index) + "," +value.substring(index);
}

function drawLines(line1, line2) {
  // Create guidance Arrays[]
	for (i = 0; i < line1.length; i++) {
	  guidance1.push(splitIndex(l1[i],1));
  }
  for (i = 0; i < line2.length; i++) {
    guidance2.push(splitIndex(l2[i],1));
  }
  // Create Path Objects{}
  for (i = 0; i < line1.length; i++) {
    dir = guidance1[i].toString().split(",")[0];
    step = parseInt(guidance1[i].toString().split(",")[1]);
    
    for (j = 0; j < step; j++) {
      switch (dir) {
        case "R":
          position[0] = parseInt(position[0]) + 1;
          paths.l1Path.push({x: position[0], y: position[1]});
          break;
        case "L":
          position[0] = parseInt(position[0]) - 1;
          paths.l1Path.push({x: position[0], y: position[1]});
          break;
        case "U":
          position[1] = parseInt(position[1]) + 1;
          paths.l1Path.push({x: position[0], y: position[1]});
          break;
        case "D":
          position[1] = parseInt(position[1]) - 1;
          paths.l1Path.push({x: position[0], y: position[1]});
          break;
      }
    }
    
    if (i == line1.length-1) { position = [0,0]; }
  }
  for (i = 0; i < line2.length; i++) {
    dir = guidance2[i].toString().split(",")[0];
    step = parseInt(guidance2[i].toString().split(",")[1]);

    for (j = 0; j < step; j++) {
      switch (dir) {
        case "R":
          position[0] = parseInt(position[0]) + 1;
          paths.l2Path.push({x: position[0], y: position[1]});
          break;
        case "L":
          position[0] = parseInt(position[0]) - 1;
          paths.l2Path.push({x: position[0], y: position[1]});
          break;
        case "U":
          position[1] = parseInt(position[1]) + 1;
          paths.l2Path.push({x: position[0], y: position[1]});
          break;
        case "D":
          position[1] = parseInt(position[1]) - 1;
          paths.l2Path.push({x: position[0], y: position[1]});
          break;
      }
    }
  }
}

function detectCross(line1, line2) {
  var crossCount = 1;
  var l1 = line1;
  var l2 = line2;
  for (i = 0; i < line1.length; i++) {
    for (j = 0; j < line2.length; j++) {
      l1x = l1[i].x;
      l2x = l2[j].x;
      l1y = l1[i].y;
      l2y = l2[j].y;
      if (l1y == l2y && l1x == l2x) {
        crossings.data.push({id: crossCount, x: l1x, y: l1y});
        console.log('Crossing found!');
        crossCount++;
      }
    }
  }
}

drawLines(l1, l2);
detectCross(paths.l1Path, paths.l2Path);
console.log(JSON.stringify(paths.l1Path) + '\n\n\n' + JSON.stringify(paths.l2Path));
console.log(JSON.stringify(crossings));
