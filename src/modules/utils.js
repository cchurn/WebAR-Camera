import * as $ from 'jquery';

var utils = {
    $debug: '',
    createDebug: function(container, x,y,w,h,t) {
        this.$debug = $("<div>", {width: w, height: h, id: "foo", "class": "console"});
        this.$debug.css('left', x);
        this.$debug.css('top', y);
        this.$debug.css('position', 'absolute');
        this.$debug.css('z-index', '1000');
        this.$debug.css('font-family', 'Menlo');
        this.$debug.css('font-size', '18px');
        this.$debug.css('color', 'white');
        this.$debug.css('padding', '10px');
        if (!t) {
            this.$debug.css('background', 'rgba(0,0,0,0.6)');
        }
        this.$debug.css('pointer-events', 'none');
        $(container).append(this.$debug);
    },
    clear: function() {
        this.$debug.html('');
    },
    log: function(message, color, background) {
        if (message=='clear') {
            this.$debug.html('');
            return;
        }
        var col = (typeof color == "undefined" ? 'white' : color);
        this.$debug.append('<span style="padding:3px; line-height: 17px; color: ' + col +'; background: ' + background +';">' + message + '</span><br/>');
    },
    hide: function() {
        this.$debug.hide();
    }
};

export default utils;