

var debug = {
    hasInit: false,
    init: function() {
        this.hasInit = true;
        var debugWindow = document.createElement("div");
        document.body.appendChild(debugWindow);
        debugWindow.setAttribute('class', "debug");
        debugWindow.style.position = "absolute";
        debugWindow.style.top = "0px";
        debugWindow.style.left = "0px";
        debugWindow.style.zIndex = "99999";
        debugWindow.style.background = "rgba(0,0,0,0)";
        debugWindow.style.color = "#ffffff";
        debugWindow.style.padding = "5px";
        debugWindow.style.fontFamily = "SansSerif, Arial";
    },
    log: function(message, color, background) {
        if (!this.hasInit) this.init();
        var col = (typeof color == "undefined" ? 'white' : color);
        var bg = (typeof background == "undefined" ? 'none' : background);
        document.querySelector('.debug').innerHTML +='<span style="padding:3px; line-height: 25px; color: ' + col +'; background: ' + bg +';">' + message + '</span><br/>';
    },
    hide: function() {
        if (!this.hasInit) return;
        document.querySelector('.debug').style.display = 'none';
    }
}
module.exports = debug;