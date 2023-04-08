var updateText = function () {
    var elm = document.getElementById('output');
    elm.innerText = prompt("Enter some text (no xxs pls)", elm.innerText);
}
var resetText = function () {
    var elm = document.getElementById('output');
    elm.innerText = "";
}

