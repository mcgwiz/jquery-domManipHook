(function(define, jQuery) {
    "use strict";

    (function(factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['jquery'], factory);
        } else {
            // Browser globals.
            factory(jQuery);
        }
    })(function($){
        var origManip = $.fn.domManip, intercepting; 

        $.fn.domManip = function(args, callback) { 
            origManip.apply(this, [ args, newCallback ]);

            function newCallback(elem) { 
                var $elem;
                
                callback.call(this, elem);
                
                // Constrain only to ELEMENT_NODEs.
                if (elem.nodeType !== 1) return;

                // Prevent recursive calls. Maybe in the future a system can be devised to loosen this.
                if (intercepting) return;
                intercepting = true;

                $elem = $(elem);

                // Invoke registered hooks.
                $.fn.domManip.hooks.forEach(function(cb) { cb(elem, $elem); });

                intercepting = false;
            }
        };

        $.fn.domManip.hooks = [ ];

        return $;
    });
})(this.define, this.jQuery);
