window.onload = function () {
    var req = new XMLHttpRequest();

    req.open('GET', '/s-dat/fillers.jsonc', false);
    req.send(null);
    var out = JSON.parse(req.responseText);
    console.log("DBG: fillers", out);

    var elms = document.getElementsByClassName("FILLABLE_NO_STYLE");
    for (var i = 0; i < elms.length; i++) {
        var e = elms[i];
        e.innerText = out[e.innerHTML];
    }

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let IS_DEBUG = params.debug == 1;

    pageId = document.getElementById("pagedat").innerHTML.split(':')[0];

    var req = new XMLHttpRequest();

    req.open('GET', '/s-dat/tree.jsonc', false);
    req.send(null);
    var out = JSON.parse(req.responseText);
    console.log("DBG: tree dat", out);

    var bar = document.getElementById("sidebar-left");
    bar.innerHTML = "";
    bar.innerText = "";
    if (out.debug.length >= 1 && IS_DEBUG) {
        var debugContent = `<div id="bar-item-debug" class="bar-item ${out.debug.filter(x => x.id == pageId).length == 1 ? "selected" : "closed"}" onclick="toggleHidden('debug')">Debug<div class="bar-item-children">`
        for (var i = 0; i < out.debug.length; i++) {
            var entry = out.debug[i];
            debugContent += `<a id="bar-item-debug-${entry.id}" class="bar-item-entry ${entry.id == pageId ? "selected" : ""}" style="${entry.style}" href="${entry.url}">${entry.name}</a><br />\n`
        }
        debugContent += "</div></div>"
        bar.innerHTML += debugContent;
    }
    if (out.home.length >= 1) {
        var homeContent = `<div id="bar-item-home" class="bar-item ${out.home.filter(x => x.id == pageId).length == 1 ? "selected" : "closed"}" onclick="toggleHidden('home')">Home<div class="bar-item-children">`
        for (var i = 0; i < out.home.length; i++) {
            var entry = out.home[i];
            homeContent += `<a id="bar-item-home-${entry.id}" class="bar-item-entry ${entry.id == pageId ? "selected" : ""}" style="${entry.style}" href="${entry.url}">${entry.name}</a><br />\n`
        }
        homeContent += "</div></div>"
        bar.innerHTML += homeContent;
    }

    if (IS_DEBUG) {
        bar.innerHTML += `<h3>DEBUG_INFO</h3>
<ul>
<li>PAGEDAT:${document.getElementById("pagedat").innerHTML}
</ul>`;
    }
}

var toggleHidden = function (group) {
    var group = document.getElementById(`bar-item-${group}`);
    if (group.classList.contains('closed')) {
        group.classList.remove('closed')
    }
    else {
        group.classList.add('closed')
    }
}