/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */


// Classes and AStar
class GraphNode { 
    constructor(title, value, heuristic){ 
        this.title = title;
        this.value = value; 
        this.visited = false;
        this.heapInd = -1;
        this.heuristic = heuristic;
    } 
}

// PriorityQueue class 
class PriorityQueue { 
    // An array is used to implement priority 
    constructor(allNodes) {
        this.minheap = []; 
        for (var i =0; i<allNodes.length; i++){
            this.minheap.push(allNodes[i]);
            this.minheap.heapInd = i;
        }
    } 

    // functions to be implemented 
    left(ind){
        return 2 * ind+1;
    }

    right(ind) {
        return 2*ind +2;
    }

    parent(ind){
        var floor = Math.floor(ind-1/2);
        return floor < 0 ? 0 : floor;
    }

    heapify(ind){
        var left = left(ind);
        var right = right(ind);
        var min = -1;
        if (l<this.minheap.length && this.minheap[left] < this.minheap[ind])
            min = left;
        else
            min = ind;
        if (r< this.minheap.length && this.minheap[right] < this.minheap[ind])
            min = right;

        if (min != ind){
            // exchange
            var temp = this.minheap[ind];
            this.minheap[ind] = this.minheap[min];
            this.minheap[min] = temp;

            this.minheap[ind].minheap = ind;
            this.minheap[min].minheap = min;
            this.heapify(min)
        } else {
            alert("HOT TUBS IN HOOTERS")
        }
    }

    extractMin() {
        if (this.minheap.isEmpty()) return null;
        else if (this.minheap.length == 1) return this.minheap.pop();

        var top = this.minheap[0];

        this.minheap[0] = this.minheap[this.minheap.length-1];
        this.minheap[0].heapInd = 0;
        this.minheap.pop();
        this.heapify(0);
        return top;
    }
    decreaseKey(ind, value){
        if (this.minheap[ind] < value || !(ind<this.minheap.length && ind >= 0)) return; 
        this.minheap[ind].value = d;
        while (ind > 0 && this.minheap[this.parent(ind)] > this.minheap[ind]){
            var temp = this.minheap[this.parent(ind)]
            this.minheap[this.parent(ind)] = this.minheap[ind];
            this.minheap[ind] = temp;
            this.minheap[ind].heapInd =ind;
            this.minheap[this.parent(ind)].heapInd = this.parent(ind);
            i = this.parent(i);
        }
    }

    peak() {
    // returns the highest priority element 
    // in the Priority queue without removing it. 
        if (this.isEmpty())
            return null;
        return this.minheap[0];
    }

    isEmpty(){
        return this.minheap.length == 0; 
    }
} 

function aStar(from, to){  // to and from are strings
    var graphNodes = {};
    for (var key in cityCoords){   
        var heurist =  pow(cityCoords[from].latitude - cityCoords[to].latitude,2) + 
                       pow(cityCoords[from].longitude - cityCoords[to].longitude,2);

        var gn = new GraphNode(key, 1231231231, heurist);
        graphNodes[key] = gn;
    }
    
    var pq = new PriorityQueue(graphNodes);
    pq.decreaseKey(graphNodes[from].heapInd, 0);
    while (!pq.isEmpty()){
        // graphNodes   
    } 

    // const R = 6371e3; // metres
    // const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    // const φ2 = lat2 * Math.PI/180;
    // const Δφ = (lat2-lat1) * Math.PI/180;
    // const Δλ = (lon2-lon1) * Math.PI/180;

    // const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    //           Math.cos(φ1) * Math.cos(φ2) *
    //           Math.sin(Δλ/2) * Math.sin(Δλ/2);
    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    // const d = R * c; // in metres  
}



var data ={};

$.when(ajax1()).done(function(x){
    
});

async function ajax1() {
    // NOTE:  This function must return the value 
    //        from calling the $.ajax() method.
    await $.get('/getFlightData', function(data){
        // console.log("in function")
        // console.log(data)
        this.data = data;
    });
    setTimeout(function () {
        // add some sort of loading page animation
    }, 3000);
}


var connections = {};

function addConnection(from, to) { // from and two are strings
    // NOT heruistic 
    connections[from][to] = pow(cityCoords[from].latitude - cityCoords[to].latitude,2) + 
                            pow(cityCoords[from].longitude - cityCoords[to].longitude, 2);
}














// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
``
// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.geodata = am4geodata_worldLow;
chart.projection = new am4maps.projections.Miller();
chart.homeZoomLevel = 2.5;
chart.homeGeoPoint = {
    latitude: 38,
    longitude: -60
};  



//  INITAL VARIABLES
var colors = [];  
var DIVISOR = 100;

fillColorsArray(); // fills colors


// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
polygonSeries.mapPolygons.template.nonScalingStroke = true;
polygonSeries.exclude = ["AQ"];

// Add line bullets
var cities = chart.series.push(new am4maps.MapImageSeries());
cities.mapImages.template.nonScaling = true;

var city = cities.mapImages.template.createChild(am4core.Circle);
city.radius = 6;
city.fill = chart.colors.getIndex(0).brighten(-0.2);
// city.fill = "rgb(144,12,63)"
city.strokeWidth = 2;
city.stroke = am4core.color("#fff");


var startAirport = "";
var endAirport = ""; 

function setStartAndEnd(start, end){
  this.startAirport = start;
  this.endAirport = end; 
}

setStartAndEnd("Toronto", 'Los Angeles');

var cityCoords = {};
function addCity(coords, title, iteration) {
    const rad = this.city.radius
    const fill = this.city.fill;
    if ( title === this.startAirport){
        // add first animation 
        this.city.radius= 10.5;
        this.city.fill = "#fff"
    } else if (iteration != -1){
        this.city.radius = 6 + (10.5 -6)/DIVISOR * iteration; 
        this.city.fill = colors[iteration];
    }
    var city = cities.mapImages.create();  
    city.latitude = coords.latitude;
    city.longitude = coords.longitude;
    city.tooltipText = title;

    this.city.radius = rad;
    this.city.fill = fill;

    cityCoords[title] = coords;
    return city;
}


// Add Cities
var paris = addCity({ "latitude": 48.8567, "longitude": 12.3 }, "Paris", -1);
var berlin = addCity({ "latitude": 48.8567, "longitude": 2.3510 }, "Berlin", -1);
var toronto = addCity({ "latitude": 43.8163, "longitude": -79.4287 }, "Toronto", -1);
var newYork = addCity({ "latitude": 40.712776, "longitude": -74.005974 }, "New York", -1);
var la = addCity({ "latitude": 34.3, "longitude": -118.15 }, "Los Angeles", -1);
var havana = addCity({ "latitude": 23, "longitude": -82 }, "Havana", -1);


// // Add lines
var lineSeries = chart.series.push(new am4maps.MapArcSeries());
lineSeries.mapLines.template.line.strokeWidth = 2
lineSeries.mapLines.template.line.strokeOpacity = 0.5;
lineSeries.mapLines.template.line.stroke = city.fill;
lineSeries.mapLines.template.line.nonScalingStroke = true;
lineSeries.mapLines.template.line.strokeDasharray = "1,1";
lineSeries.zIndex = 10;

var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
shadowLineSeries.mapLines.template.shortestDistance = false;
shadowLineSeries.zIndex = 5;

function addLine(from, to) {
    var line = lineSeries.mapLines.create(); 
    line.imagesToConnect = [from, to];
    line.line.controlPointDistance = -0.3;
    var shadowLine = shadowLineSeries.mapLines.create();
    shadowLine.imagesToConnect = [from, to];

    return line;
}


// Add lines
addLine(toronto, newYork);
addLine(paris, berlin);
addLine(paris, toronto);
addLine( toronto, paris);
addLine(paris, toronto);
addLine(toronto, la);
addLine(la, havana);
addLine(havana, toronto);

// var queue = new PriorityQueue({ comparator: function(a, b) { return b - a; }});
function animateCity(title){ 
    var i =0; 
    timeout();
    function timeout() {
        setTimeout(function () {
            if (i != DIVISOR-1){
                addCity(cityCoords[title], title, i);
                timeout();
            }
            i++;
        }, 25);
    }
}

// // PLANE AND SHADOW PLANE CONFIG ###############
// var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
// plane.position = 0;
// plane.width = 48;
// plane.height = 48;

// plane.adapter.add("scale", function(scale, target) {
//     return 0.5 * (1 - (Math.abs(0.5 - target.position)));
// })

// var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
// shadowPlane.position = 0;
// shadowPlane.width = 48;
// shadowPlane.height = 48;

// shadowPlane.adapter.add("scale", function(scale, target) {
//     target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
//     return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
// })
// // ##############################


// Add Plane to stack
function addPlane(){

    // PLANE AND SHADOW PLANE CONFIG ###############
    var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
    plane.position = 0;
    plane.width = 48;
    plane.height = 48;

    plane.adapter.add("scale", function(scale, target) {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
    })

    var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
    shadowPlane.position = 0;
    shadowPlane.width = 48;
    shadowPlane.height = 48;

    shadowPlane.adapter.add("scale", function(scale, target) {
        target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
        return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
    })
    // ####################


    var planeImage = plane.createChild(am4core.Sprite);
    planeImage.scale = 0.08;
    planeImage.horizontalCenter = "middle";
    planeImage.verticalCenter = "middle";
    planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
    planeImage.strokeOpacity = 0;

    var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
    shadowPlaneImage.scale = 0.05;
    shadowPlaneImage.horizontalCenter = "middle";
    shadowPlaneImage.verticalCenter = "middle";
    shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    shadowPlaneImage.fill = am4core.color("#red");
    shadowPlaneImage.strokeOpacity = 0;

    return {'plane' : plane,'shadowPlane' : shadowPlane, 'planeImage' : planeImage, 'shadowPlaneImage': shadowPlaneImage};
}   


// var planeImage = plane.createChild(am4core.Sprite);
// planeImage.scale = 0.08;
// planeImage.horizontalCenter = "middle";
// planeImage.verticalCenter = "middle";
// planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
// planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
// planeImage.strokeOpacity = 0;

// var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
// shadowPlaneImage.scale = 0.05;
// shadowPlaneImage.horizontalCenter = "middle";
// shadowPlaneImage.verticalCenter = "middle";
// shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
// shadowPlaneImage.fill = am4core.color("#red");
// shadowPlaneImage.strokeOpacity = 0;


// var planes = [];
// var planeIndex =0; 
// var paths = [];
// // addPlane();

// // Plane animation
// var currentLine = 0;
// var direction = 1;



function fly(to, from){ 

    // Add lines and path
    var lineSeries = chart.series.push(new am4maps.MapArcSeries());
    lineSeries.mapLines.template.line.strokeWidth = 2
    lineSeries.mapLines.template.line.strokeOpacity = 0.5;
    lineSeries.mapLines.template.line.stroke = city.fill;
    lineSeries.mapLines.template.line.nonScalingStroke = true;
    lineSeries.mapLines.template.line.strokeDasharray = "1,1";
    lineSeries.zIndex = 10;

    var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
    shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
    shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
    shadowLineSeries.mapLines.template.shortestDistance = false;
    shadowLineSeries.zIndex = 5;

    var line = lineSeries.mapLines.create(); 
    line.imagesToConnect = [to, from];
    line.line.controlPointDistance = -0.3;

    var shadowLine = shadowLineSeries.mapLines.create();
    shadowLine.imagesToConnect = [to, from];

    



    // PLANE AND SHADOW PLANE CONFIG ###############
    var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
    plane.position = 0;
    plane.width = 48;
    plane.height = 48;

    plane.adapter.add("scale", function(scale, target) {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
    })

    var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
    shadowPlane.position = 0;
    shadowPlane.width = 48;
    shadowPlane.height = 48;

    shadowPlane.adapter.add("scale", function(scale, target) {
        target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
        return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
    })
    


    var planeImage = plane.createChild(am4core.Sprite);
    planeImage.scale = 0.08;
    planeImage.horizontalCenter = "middle";
    planeImage.verticalCenter = "middle";
    planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
    planeImage.strokeOpacity = 0;

    var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
    shadowPlaneImage.scale = 0.05;
    shadowPlaneImage.horizontalCenter = "middle";
    shadowPlaneImage.verticalCenter = "middle";
    shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    shadowPlaneImage.fill = am4core.color("#red");
    shadowPlaneImage.strokeOpacity = 0;

    // const obj = {'plane' : plane,'shadowPlane' : shadowPlane, 'planeImage' : planeImage, 'shadowPlaneImage': shadowPlaneImage};
    plane.mapLine = lineSeries.mapLines.getIndex(0);
    plane.parent = lineSeries;

    shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(0);
    shadowPlane.parent = shadowLineSeries
    shadowPlaneImage.rotation = planeImage.rotation;

   var animation = plane.animate({
        from: 0,
        to: 1, 
        property: "position"
    }, 5000, am4core.ease.sinInOut);
    // animation.events.on("animationended", fly)

    shadowPlane.animate({
        from: 0,
        to: 1,
        property: "position"
    }, 5000, am4core.ease.sinInOut);
    setTimeout(function () {
        fly(la, paris);
    }, 5000);    
}

function flyPlane() {
    // Get current line to attach plane to
    plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
    plane.parent = lineSeries;

    shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
    shadowPlane.parent = shadowLineSeries;
    shadowPlaneImage.rotation = planeImage.rotation;

    console.log(plane.mapLine);
    // Set up animation
    var from, to;
    var numLines = lineSeries.mapLines.length;
    if (direction == 1) {
        from = 0
        to = 1;
        if (planeImage.rotation != 0) {
            planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
        }
    }
    else {
        from = 1;
        to = 0;
        if (planeImage.rotation != 180) {
            planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            return;
        }
    }

    // Start the animation
    var animation = plane.animate({
        from: from,
        to: to,
        property: "position"
    }, 5000, am4core.ease.sinInOut);
    animation.events.on("animationended", flyPlane)
    /*animation.events.on("animationprogress", function(ev) {
      var progress = Math.abs(ev.progress - 0.5);
      //planeImage.scale += 0.2;
    });*/

    shadowPlane.animate({
        from: from,
        to: to,
        property: "position"
    }, 5000, am4core.ease.sinInOut);

    // Increment line, or reverse the direction
    
//   Deal with changing path

    currentLine += direction;
    if (currentLine < 0) {
        currentLine = 0;
        direction = 1;
    }
  
    //  // reverse direction    
    // else if ((currentLine + 1) > numLines) {
    //     currentLine = numLines - 1;
    //     direction = -1;
    // }
}



fly(toronto, paris)
fly(toronto, la)


// Go!
// flyPlane();
// fly();



function colorAnimation(initObj, targObj, currObj){
    var gradientr = (targObj.r-initObj.r)/DIVISOR ;
    var gradientg = (targObj.g-initObj.g)/DIVISOR ;
    var gradientb = (targObj.b-initObj.b)/DIVISOR ;   
    let objCopy = {'r': currObj.r, 'g' : currObj.g, 'b': currObj.b};
    

    if (gradientr >0){
        if (objCopy.r < targObj.r ) objCopy.r += gradientr;
    } else if (gradientr <0 ){
        if (objCopy.r > targObj.r) objCopy.r += gradientr
    }
    if (gradientg >0){
        if (objCopy.g < targObj.g ) objCopy.g += gradientg;
    } else if (gradientg <0 ){
        if (objCopy.g > targObj.g) objCopy.g += gradientg;
    }
    if (gradientb >0){
        if (objCopy.b <  targObj.b ) objCopy.b += gradientb;
    } else if (gradientb <0 ){
        if (objCopy.b > targObj.b) objCopy.b += gradientb
    }

    var data = {};
    var newString = "rgb(" + Math.round(objCopy.r).toString(10) + "," +   Math.round(objCopy.g).toString(10) + "," + Math.round(objCopy.b).toString(10) +  ")"; 

    data['string'] = newString;
    data['object'] = objCopy;
    return data;
}

function colorToString(obj){
    return "rgb(" + obj.r +"," + obj.g + "," + obj.b  +")";
}

function fillColorsArray(){
    const startCol = {'r' : 64, 'g': 155, 'b' : 208};
    const currCol = {'r' : 64, 'g': 155, 'b' : 208};
    const targCol = {'r' : 144, 'g': 12, 'b' : 63};
    // const targCol = {'r' : 59, 'g': 139, 'b' : 176};

    var col = colorAnimation(startCol, targCol, currCol); 
    for (var i =1; i<DIVISOR ; i++ ){
        col = colorAnimation(startCol, targCol, col.object);
        this.colors[i] = col.string;
    }
}

animateCity('Los Angeles');
animateCity('Paris');
animateCity('Havana');