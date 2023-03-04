// https://teachablemachine.withgoogle.com/models/EIH3yoh_q/

Webcam.set({
    width: 350,
    height: 250,
    image_format: "png",
    png_quality: 90
});

var camera = document.getElementById("Camera");

Webcam.attach(camera);

function Capture() {
    Webcam.snap(function(data_uri) {
        document.getElementById("Snapped_Picture").innerHTML = '<img id="captured_img" src="'+ data_uri +'">';
    });
}

console.log('ml5 version:', ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/EIH3yoh_q/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!")
}

function Identify() {
    image = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        document.getElementById("result_object_name").innerHTML = result[0].label;
        document.getElementById("result_object_accuracy").innerHTML = result[0].confidence.toFixed(3);
    }
}