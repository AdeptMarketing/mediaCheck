/**
  mediacheck will take a hash and execute the specified methods based on the current mediaquery status.

  ex.

  mediaCheck({
    media: '(min-width: 500px)',
    entry: function() { ... },
    exit: function() { ... }
  });

  @param Object - options
*/var mediaCheck=function(e){"use strict";var t,n,r,i,s,o;n=window.matchMedia!==undefined&&window.matchMedia("only screen").addListener!==undefined;r=function(e,t){e.matches?typeof t.entry=="function"&&t.entry():typeof t.exit=="function"&&t.exit()};if(n){i=function(){t=window.matchMedia(e.media);t.addListener(function(){r(t,e)});r(t,e)};i()}else{o=window.outerWidth;s=function(){var t,n,i,s;t=e.media.match(/\(([\w\W]*)-[\w\W]*:\s*([\w\W]*)\)/);n=t[1];i=parseInt(t[2],10);s={};if(o!==window.outerWidth){s.matches=n==="max"&&i>window.outerWidth||n==="min"&&i<window.outerWidth;r(s,e);o=window.outerWidth}};window.addEventListener?window.addEventListener("resize",s):window.attachEvent&&window.attachEvent("resize",s);s()}};