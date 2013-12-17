/**
  mediacheck will take a hash and execute the specified methods based on the current mediaquery status.

  ex.

  mediaCheck({
    media: '(min-width: 500px)',
    entry: function() { ... },
    exit: function() { ... }
  });

  @param Object - options
*/
var mediaCheck = function (options) {
    "use strict";
    var mq, matchMedia, mqChange, createListener, mmListener, pageWidth;
    //matchMedia = window.matchMedia !== undefined;
    matchMedia = (window.matchMedia !== undefined && window.matchMedia('only screen').addListener !== undefined);

    mqChange = function (mq, options) {
        if (mq.matches) {
            if (typeof options.entry === "function") {
                options.entry();
            }
        } else if (typeof options.exit === "function") {
            options.exit();
        }
    };

    if (matchMedia) {
        // Has matchMedia support
        createListener = function () {

            mq = window.matchMedia(options.media);
            mq.addListener(function () {
                mqChange(mq, options);
            });
            mqChange(mq, options);
        };
        createListener();
    } else {
        // capture the current pageWidth
        pageWidth = window.outerWidth;

        // No matchMedia support
        mmListener = function () {
            var parts, constraint, value, fakeMatchMedia;
            parts = options.media.match(/\(([\w\W]*)-[\w\W]*:\s*([\w\W]*)\)/);
            constraint = parts[1];
            value = parseInt(parts[2], 10);
            fakeMatchMedia = {};

            // scope this to width changes to prevent small-screen scrolling (browser chrome off-screen)
            //   from triggering a change
            if (pageWidth !== window.outerWidth) {
                fakeMatchMedia.matches = (constraint === "max" && value > window.outerWidth) || (constraint === "min" && value < window.outerWidth);
                mqChange(fakeMatchMedia, options);

                // reset pageWidth
                pageWidth = window.outerWidth;
            }
        };

        if (window.addEventListener) {
            window.addEventListener("resize", mmListener);
        } else if (window.attachEvent) {
            window.attachEvent("resize", mmListener);
        }
        mmListener();
    }
};
