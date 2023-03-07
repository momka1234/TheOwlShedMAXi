window.onload = function () {
    pageId = document.getElementById("pagedat").innerHTML.split(':')[0];

    var req = new XMLHttpRequest();

    req.open('GET', '/s-dat/tree.jsonc', false);
    req.send(null);
    var out = JSON.parse(req.responseText);
    console.log("DBG: tree dat", out);

    var bar = document.getElementById("sidebar-left");
    bar.innerHTML = "";
    bar.innerText = "";
    if (out.debug.length >= 1) {
        var debugContent = `<div id="bar-item-debug" class="bar-item ${out.debug.filter(x => x.id == pageId).length == 1 ? "selected" : "closed"}" onclick="toggleHidden('debug')">Debug<div class="bar-item-children">`
        for (var i = 0; i < out.debug.length; i++) {
            var entry = out.debug[i];
            debugContent += `<a id="bar-item-debug-${entry.id}" class="bar-item-entry ${entry.id == pageId ? "selected" : ""}" style="${entry.style}" href="${entry.url}">${entry.name}</a>\n`
        }
        debugContent += "</div></div>"
        bar.innerHTML += debugContent;
    }
}

var toggleHidden = function (group) {
    var group = document.getElementById(`bar-item-${group}`);
    var group = document.getElementById(`bar-item-debug`);
    if (group.classList.contains('closed')) {
        group.classList.remove('closed')
    }
    else {
        group.classList.add('closed')
    }
}
