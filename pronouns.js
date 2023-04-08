var pronouns;

console.log("test");
var req = new XMLHttpRequest();
req.onload = (_) => {
    pronouns = JSON.parse(req.responseText).profiles.en.pronouns;
    updatePronouns();
}
req.open("GET", "https://en.pronouns.page/api/profile/get/FruityFin?version=2");
req.send();

var getShortPronouns = function (id = 0) {
    var split = pronouns[id].value.split('/');
    return `${split[0]}/${split[1]}`;
}

var updateButtonBar = function (id = 0) {
    var elm = document.getElementById("pronouns-button-bar");
    elm.innerHTML = "";
    for (var i = 0; i < pronouns.length; i++) {
        if (i == id)
            elm.innerHTML += `<div class="button inactive">${getShortPronouns(i)}</div>`;
        else
            elm.innerHTML += `<div class="button active" onclick="updatePronouns(${i})">${getShortPronouns(i)}</div>`;
    }
}

var updatePronouns = function (id = 0) {
    updateButtonBar(id)
    var splitPronouns = pronouns[id].value.split('/');
    updateElms(document.getElementsByClassName('pronoun-0'), splitPronouns[0]);
    updateElms(document.getElementsByClassName('pronoun-1'), splitPronouns[1]);
    updateElms(document.getElementsByClassName('pronoun-2'), splitPronouns[2]);
    updateElms(document.getElementsByClassName('pronoun-3'), splitPronouns[3]);
    updateElms(document.getElementsByClassName('pronoun-4'), splitPronouns[4]);
}
