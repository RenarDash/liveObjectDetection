
Modelstatus = "";
o = [];
function preload() {

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    oD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object deleting";
}

function modelLoaded() {
    console.log("Model Loaded");
    Modelstatus = true;
    oD.detect(video, gotResults);
}

function gotResults(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        o = r;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (Modelstatus != "") {
        for (i = 0; i < o.length; i++) {
            r = random(255);
            b = random(255);
            g = random(255);
            document.getElementById("status").innerHTML = "Object Deleted";
            document.getElementById("numbDect").innerHTML = "Number Of Object : " + o.length;
            objName = o[i].label;
            objConfindence = floor(o[i].confidence * 100);
            objX = o[i].x;
            objY = o[i].y;
            objWidth = o[i].width;
            objHeight = o[i].height;
            fill(r, g, b);
            textSize(15);
            text(objName + " " + objConfindence + "% ", objX + 20, objY + 20);
            noFill();
            stroke(r, g, b);
            strokeWeight(5);
            rect(objX, objY, objWidth, objHeight);
        }
    }
}