/* CSSVUnits - Viewport relative units. Authors & copyright (c) 2013: WebLinc, David Knight. */

// CSSVUnit
(function(win, undefined) {
    'use strict';

    // Internal globals
    var _doc            = win.document,
        _style          = null,
        _styleSheet     = null,
        _cssRules       = null,
        _length         = 0,
        _width          = 0,
        _height         = 0,
        _timer          = 0,

        _getViewport    = function () {
            _width      = win.innerWidth || _doc.documentElement.clientWidth;
            _height     = win.innerHeight || _doc.documentElement.clientHeight;
        },
        
        _insertRules    = function (options) {
            var style   = null,
                cssText = '';

            if (!options || !(options.style) || (options.media && !options.media.matches)) {
                return;
            }

            for (var prop in options.style) {
                if (options.style.hasOwnProperty(prop)) {
                    var item    = options.style[prop],
                        value   = item.replace(/(\d+)(vw|vh|vmin|vmax)/gi, function (p1, p2, p3) {
                            var multiplier  =   (p3 === 'vw' && _width) || 
                                                (p3 === 'vh' && _height) || 
                                                (p3 === 'vmin' && (_width < _height ? _width  : _height)) || 
                                                (p3 === 'vmax' && (_width < _height ? _height : _width));

                            return ((p2 * multiplier) / 100).toFixed(2) + 'px';
                        });

                    cssText += prop + ': ' + value + ';';
                }
            }

            if (typeof options.cssRuleIndex === 'undefined') {
                options.cssRuleIndex = _cssRules.length;

                if (_styleSheet.insertRule) {
                    _styleSheet.insertRule(options.selector + '{}', options.cssRuleIndex);
                } else {
                    _styleSheet.addRule(options.selector, ' ', options.cssRuleIndex);
                }
            }

            style = _cssRules[options.cssRuleIndex].style;
            cssText && style.cssText !== cssText && (style.cssText = cssText);
        };

    // CSSVUnits
    win.CSSVUnits = {
        styleSheet : [],

        add     : function (options) {
            if (!options) {
                return -1;
            }

            _getViewport();

            if (options.media) {
                options.media = (win.matchMedia && win.matchMedia(options.media)) || {
                    matches : true,
                    media   : options.media
                };
            }

            _length = this.styleSheet.push(options);
            _insertRules(options);

            return _length - 1;
        },

        remove  : function (index) {
            typeof index !== 'undefined' && this.styleSheet.splice(index, 1);
        },

        watch   : function () {
            clearTimeout(_timer);

            _timer = setTimeout(function () {
                var i   = _length - 1,
                    il  = i;

                if (i < 0) {
                    return;
                }

                _getViewport();

                do {
                    _insertRules(win.CSSVUnits.styleSheet[il - i]);
                } while (i--);
            }, 10);
        },

        init    : function () {
            _style              = _doc.createElement('style')
            _style.type         = 'text/css';
            _style.id           = 'CSSVUnit';

            _doc.getElementsByTagName('head')[0].appendChild(_style);

            _styleSheet = _style.sheet || _style.styleSheet;
            _cssRules   = _styleSheet.cssRules || _styleSheet.rules;

            if (win.addEventListener) {
                win.addEventListener('resize', this.watch);
                win.addEventListener('orientationchange', this.watch);
            } else {
                win.attachEvent('onresize', this.watch);
                win.attachEvent('onorientationchange', this.watch);
            }
        }
    };

    CSSVUnits.init();
})(window);