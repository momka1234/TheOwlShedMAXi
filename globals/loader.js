var updateElms = function (elms, text) {
    for (var i = 0; i < elms.length; i++)
        elms[i].innerText = text;
}

window.onload = function () {
    var loaded = {};
    loaded.filled = -1;

    var req = new XMLHttpRequest();

    req.open('GET', '/s-dat/fillers.jsonc', false);
    req.send(null);
    var out = JSON.parse(req.responseText);
    console.log("DBG: fillers", out);

    var elms = document.getElementsByClassName("FILLABLE_NO_STYLE");
    for (var i = 0; i < elms.length; i++) {
        var e = elms[i];
        e.innerText = out[e.innerHTML];
        ++loaded.filled;
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
            debugContent += `<a id="bar-item-debug-${entry.id}" class="bar-item-entry ${entry.id == pageId ? "selected" : ""}" style="${entry.style}" href="${entry.url + window.location.search}">${entry.name}</a><br />\n`
        }
        debugContent += "</div></div>"
        bar.innerHTML += debugContent;

        loaded.debug = out.debug.length;
    }
    if (out.home.length >= 1) {
        var homeContent = `<div id="bar-item-home" class="bar-item ${out.home.filter(x => x.id == pageId).length == 1 ? "selected" : "closed"}" onclick="toggleHidden('home')">Home<div class="bar-item-children">`
        for (var i = 0; i < out.home.length; i++) {
            var entry = out.home[i];
            homeContent += `<a id="bar-item-home-${entry.id}" class="bar-item-entry ${entry.id == pageId ? "selected" : ""}" style="${entry.style}" href="${entry.url + window.location.search}">${entry.name}</a><br />\n`
        }
        homeContent += "</div></div>"
        bar.innerHTML += homeContent;
        loaded.home = out.home.length;
    }
    if (out.friendship.length >= 1) {
        var homeContent = `<div id="bar-item-friendship" class="bar-item ${out.friendship.filter(x => x.id == pageId).length == 1 ? "selected" : "closed"}" onclick="toggleHidden('friendship')">Friendship<div class="bar-item-children">`
        for (var i = 0; i < out.friendship.length; i++) {
            var entry = out.friendship[i];
            homeContent += `<a id="bar-item-friendship-${entry.id}" class="bar-item-entry ${entry.id == pageId ? "selected" : ""}" style="${entry.style}" href="${entry.url + window.location.search}">${entry.name}</a><br />\n`
        }
        homeContent += "</div></div>"
        bar.innerHTML += homeContent;
        loaded.friendship = out.friendship.length;
    }

    if (IS_DEBUG) {
        bar.innerHTML += `<div class="monospace debug"><h2>DEBUG_INFO</h2>
<ul>
<li>PAGEDAT→${document.getElementById("pagedat").innerHTML}
<li>LD_DEBUG→${loaded.debug ?? 'failed'}
<li>LD_HOME→${loaded.home ?? 'failed'}
<li>LD_FRIENDSHIP→${loaded.friendship ?? 'failed'}
<li>FILLED→${loaded.filled == -1 ? 'none' : loaded.filled + 1}
</ul></div>`;
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
