/* CSSVUnits - Viewport relative units. Authors & copyright (c) 2013: WebLinc, David Knight. */
/* NOTE: Only supports native implementation of viewport units. This forces repaint so units resize as viewport changes. */

// CSSVUnits (Native viewport units resize)
(function(win, undefined) {
    'use strict';

    // Internal globals
    var _doc        = win.document,
        _style      = null,
        _styleSheet = null,
        _cssRules   = null,
        _length     = 0,
        _timer      = 0,

        _repaint    = function (selector) {
            var index = _cssRules.length;

            _styleSheet.insertRule(selector + '{ z-index: 1; }', index);
            _styleSheet.deleteRule(index);
        };

    // CSSVUnits
    win.CSSVUnits = {
        styleSheet : [],

        add     : function (selector) {
            if (!selector) {
                return -1;
            }

            _length = this.styleSheet.push(selector);
            _repaint(selector);

            return _length - 1;
        },

        remove  : function (index) {
            index >= 0 && this.styleSheet.splice(index, 1);
        },

        watch   : function () {
            clearTimeout(_timer);

            _timer = setTimeout(function () {
                var i   = _length - 1,
                    il  = i;

                if (i < 0) {
                    return;
                }

                do {
                    _repaint(win.CSSVUnits.styleSheet[il - i]);
                } while (i--);
            }, 10);
        },

        init    : function () {
            _style              = _doc.createElement('style')
            _style.type         = 'text/css';
            _style.id           = 'CSSVUnit';

            _doc.getElementsByTagName('head')[0].appendChild(_style);

            if (typeof _style.textContent === 'undefined' && !_style.sheet && !_style.sheet.cssRules) {
                _style.parentNode.removeChild(_style);
                return;
            }

            _style.textContent  = '#CSSVUnit { width: 1vw; height: 1vh; }';
            _styleSheet = _style.sheet;
            _cssRules   = _styleSheet.cssRules;

            if (!_cssRules[0].style.width || !_cssRules[0].style.height) {
                _style.parentNode.removeChild(_style);
                return;
            }

            win.addEventListener('resize', this.watch);
            win.addEventListener('orientationchange', this.watch);
        }
    };

    CSSVUnits.init();
})(window);
