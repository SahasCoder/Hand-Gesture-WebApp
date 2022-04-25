result_1 = "";
result_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("webcam");
Webcam.attach("#webcam");

function captureImage(){
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML='<img id="captured_Image" src="'+data_uri+'">';
    });
}
console.log("ml5 version: " , ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yeZlqL1Cn/model.json" , modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    talk1 = "First prediction is " + result_1;
    talk2 = "And second prediction is " + result_2;
    var utterThis = new SpeechSynthesisUtterance(talk1 + talk2);
    synth.speak(utterThis);
}
