noseX = 0;
noseY = 0;
diff = 0;
RX = 0;
LX = 0 ;
function setup()
{
    video = createCapture(VIDEO);
    video.size(550 ,500);

    canvas = createCanvas(550, 400);
    canvas.position(560,125);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' ,getPoses);
}

function modelLoaded()
{
    console.log("model has be successfully loaded");
}

function getPoses(results)
{
    if (results.length > 0) 
    {
        console.log(results);

        noseX = results[0].pose.nose.x/2;
        noseY = results[0].pose.nose.y/2;
        
        LX = results[0].pose.leftWrist.x;
        RX = results[0].pose.rightWrist.x;
        diff = floor(LX-RX);

        console.log("NoseX = "+noseX+" NoseY = "+noseY);
        console.log("left wrist X = "+LX+"right wrist X = "+RX);
        console.log("difference between left and right wrist = "+diff);
    }
}
function draw()
{
    background('grey');
    fill('#000000');
    stroke('#000000');
    text("TEXT", noseX, noseY);
    textSize(diff);
    document.getElementById("font_size").innerHTML = "Font size of the text will be - "+ diff +" px";
}