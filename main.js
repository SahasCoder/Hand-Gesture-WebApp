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
        document.getElementById("output").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("ml5 version: " , ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4KJYiOG53/model.json" , modelLoaded);

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

function PredictImage(){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("resultEmotionName1").innerHTML=results[0].label;
        document.getElementById("resultEmotionName2").innerHTML=results[1].label;
        result_1 = results[0].label;
        result_2 = results[1].label;
        speak();

        if(results[0].label == "Best"){
            document.getElementById("update_emoji_1").innerHTML="&#128077;";
        }
        if(results[0].label == "Super"){
            document.getElementById("update_emoji_1").innerHTML="&#128076;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji_1").innerHTML="&#9996;";
        }



        if(results[1].label == "Best"){
            document.getElementById("update_emoji_2").innerHTML="&#128077;";
        }
        if(results[1].label == "Super"){
            document.getElementById("update_emoji_2").innerHTML="&#128076;";
        }
        if(results[1].label == "Victory"){
            document.getElementById("update_emoji_2").innerHTML="&#9996;";
        }
    }
}
