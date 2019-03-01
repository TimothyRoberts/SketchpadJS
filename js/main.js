window.addEventListener("load", function(){
    
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
    
    //global variables
    var radius = 4; //brush tool draws with arc 4
    var mouseHeld = false; //checks if mouse is being held
    var shapeToDraw = "marker";//marker is checked onload
    var x, y;
    var lineWidth = radius*2;
    var strokeStyle = "#black";
    var fillStyle;
    
    
    //making canvas the size of the page
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.lineWidth = radius*2;
    //Makes the cursor a crosshair
	document.getElementById("mainCanvas").style.cursor = "crosshair";
    
    
    
    //Set shapeToDraw to marker if radio is checked
	var markerBtn = document.getElementById("markerBtn");
	markerBtn.addEventListener("change", function(e){
		if (e.target.checked) {
			shapeToDraw = "marker";
			console.log("shapeToDraw set to " + shapeToDraw);
		}
	});
    
    //Set shapeToDraw to rect if radio is checked
	var rectBtn = document.getElementById("rectangleBtn");
	rectBtn.addEventListener("change", function(e){
		if (e.target.checked) {
			shapeToDraw = "rect";
			console.log("shapeToDraw set to " + shapeToDraw);
		}
	});
    
    //Set shapeToDraw to circle if radio is checked
	var circleBtn = document.getElementById("circleBtn");
	circleBtn.addEventListener("change", function(e){
		if (e.target.checked) {
			shapeToDraw = "circle";
			console.log("shapeToDraw set to " + shapeToDraw);
		}
	});
    
    //Set shapeToDraw to line if radio is checked
	var lineBtn = document.getElementById("lineBtn");
	lineBtn.addEventListener("change", function(e){
		if (e.target.checked) {
			shapeToDraw = "line";
			console.log("shapeToDraw set to " + shapeToDraw);
		}
	});
    
    //Set shapeToDraw to eraser if radio is checked
	var eraserBtn = document.getElementById("eraserBtn");
	eraserBtn.addEventListener("change", function(e){
		if (e.target.checked) {
			shapeToDraw = "eraser";
			console.log("shapeToDraw set to " + shapeToDraw);
		}
	});
    
    //Clears canvas
	var resetBtn = document.getElementById("resetBtn");
	resetBtn.addEventListener("click", function(e){
		context.clearRect(0, 0, canvas.width, canvas.height);
	});
    
    //Saves canvas
	var saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener("click",function (e) {
    	window.open(canvas.toDataURL('image/png'));
    	console.log(saveBtn);
   	});
    
    //Set linewidth to number in input box
    var weightSlct = document.getElementById("linewidth");
	var weightSlctField = weightSlct.value;
	weightSlct.addEventListener("change", function(e){
			radius = e.target.value;
            lineWidth = radius*2;
			console.log("weight set to " + radius);
	});
    
    //Sets strokestyle to colour selected
    var colorBtn = document.getElementById("colorBtn");
	var colorBtnField = colorBtn.value;
	colorBtn.addEventListener("change", function(e){
			strokeStyle = e.target.value;
			console.log("strokeStyle set to " + strokeStyle);
	});
    
    //Sets fill colour to colour selected
	var fillBtn = document.getElementById("fillBtn");
	var fillBtnField = fillBtn.value;
	fillBtn.addEventListener("change", function(e){
			fillStyle = e.target.value;
			console.log("fillStyle set to " + fillStyle);
	});
    
    //Fill checkbox
    var fillCheck = document.getElementById("fillOn");
    var fillCheckField = fillCheck.value;
        
    //THIS CODE GRADIENT COLOR AND ON/OFF FUNCTIONALITY
	var gradBtn1 = document.getElementById("gradBtn1");
	var gradBtn1Field = gradBtn1.value;
	gradBtn1.addEventListener("change", function(e){
			grad1 = e.target.value;
			console.log("grad1 set to " + grad1);
	});
	var gradBtn2 = document.getElementById("gradBtn2");
	var gradBtn1Field = gradBtn2.value;
	gradBtn2.addEventListener("change", function(e){
			grad2 = e.target.value;
			console.log("grad2 set to " + grad2);
	});
    
    var gradCheck = document.getElementById("gradOn");
    var gradCheckField = fillCheck.value;
    
    
    //MOUSEDOWN FUNCTION
    var startDrawing = function(e){
        //mouseheld triggers mousemove function
        mouseHeld = true;
        draw(e);//executes draw funct
        x = e.offsetX;
        y = e.offsetY;
    }
    
    //MOUSEMOVE begins drawing with marker tool
    var draw = function(e){
        if(mouseHeld === true && shapeToDraw === "marker"){
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.fillStyle = strokeStyle;
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, radius, 0 , Math.PI*2);
            context.fill();
            context.closePath();
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        }
        else if(mouseHeld === true && shapeToDraw === "eraser"){
            context.globalCompositeOperation = "destination-out";
            context.strokeStyle = "rgba(0,0,0,1)";
            context.lineWidth = lineWidth;
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, radius, 0 , Math.PI*2);
            context.fill();
            context.closePath();
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        }
    }
    
    //MOUSEUP FUNCTION draws squares, circles ect.
    var endDrawing = function(e){
        //mouseheld ends mousemove function
        mouseHeld = false;
        var x2 = e.offsetX;
		var y2 = e.offsetY;
        var w = x2 - x;
        var h = y2 - y;
        
        //RECTANGLE
        if(shapeToDraw === "rect"){
			context.beginPath();
			context.rect(x, y, w, h);
			context.stroke();
			context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.fillStyle = fillStyle;
            //fill if checkbox is checked
            if (fillCheck.checked){
            context.fill();
            }
            //if grad box is checked
            if(gradCheck.checked){
                var gradient = context.createLinearGradient(x,y,w,h);
				gradient.addColorStop(0,grad1);
				gradient.addColorStop(1,grad2);
				context.fillStyle=gradient;1
				context.fill();
            }
            
        }
        
        //CIRCLE
        else if(shapeToDraw==="circle"){
            if(w < 0){
                x = x+w;
                w = -w;
            }
            if(h < 0){
                y = y+h;
                h = -h;
            }
            
            var radiusX = w/2;
            var radiusY = h/2;
            var centerX = x + radiusX;
            var centerY = y + radiusY;
            var rotation = 0;
            var startAngle = 0;
            var endAngle = 2*Math.PI;
            var antiClockwise = false;
            console.log(rotation);
            
            context.beginPath();
            //ellipse(centerx, centery, radiusx, radiusy, rot, starta, enda, anticlock)
            context.ellipse(centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise);
            context.stroke();
			context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.fillStyle = fillStyle;
            //fill if checkbox is checked
            if (fillCheck.checked){
            context.fill();
            }
            //if grad box is checked
            if(gradCheck.checked){
                var gradient = context.createLinearGradient(x,y,w,h);
				gradient.addColorStop(0,grad1);
				gradient.addColorStop(1,grad2);
				context.fillStyle=gradient;1
				context.fill();
            }
        }
        
        else if(shapeToDraw === "eraser"){
            context.strokeStyle = strokeStyle;
            console.log("POW");
            context.globalCompositeOperation = "source-over";
        }

        else if(shapeToDraw === "marker"){
            context.fillStyle = strokeStyle;
        }
       
        
        else if(shapeToDraw === "line"){
            context.beginPath();
            context.moveTo(x,y);
            context.lineTo(x2,y2);
            context.stroke();
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.fillStyle = fillStyle;
        }
        
        context.beginPath();//closes previous path   
        
        
    }
    
    
    //runs function each time mouse is pressed down
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    //context.ellipse(x, y, 50, 50, 0, 0, 2*Math.PI, true);
        
});
    
    
    