function Marker(e) {
    google.maps.Marker.apply(this, arguments), e.map_icon_label && (this.MarkerLabel = new MarkerLabel({
        map: this.map,
        marker: this,
        text: e.map_icon_label
    }), this.MarkerLabel.bindTo("position", this, "position"))
}
var MAP_PIN = "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
    SQUARE_PIN = "M22-48h-44v43h16l6 5 6-5h16z",
    SHIELD = "M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z",
    ROUTE = "M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z",
    SQUARE = "M-24-48h48v48h-48z",
    SQUARE_ROUNDED = "M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z",
    inherits = function(e, t) {
        function i() {}
        i.prototype = t.prototype, e.superClass_ = t.prototype, e.prototype = new i, e.prototype.constructor = e
    };
inherits(Marker, google.maps.Marker), Marker.prototype.setMap = function() {
    google.maps.Marker.prototype.setMap.apply(this, arguments), this.MarkerLabel && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments)
};
var MarkerLabel = function(e) {
    var t = this;
    this.setValues(e), this.div = document.createElement("div"), this.div.className = "map-icon-label", google.maps.event.addDomListener(this.div, "click", function(e) {
        e.stopPropagation && e.stopPropagation(), google.maps.event.trigger(t.marker, "click")
    })
};
MarkerLabel.prototype = new google.maps.OverlayView, MarkerLabel.prototype.onAdd = function() {
        var e = (this.getPanes().overlayImage.appendChild(this.div), this);
        this.listeners = [google.maps.event.addListener(this, "position_changed", function() {
            e.draw()
        }), google.maps.event.addListener(this, "text_changed", function() {
            e.draw()
        }), google.maps.event.addListener(this, "zindex_changed", function() {
            e.draw()
        })]
    }, MarkerLabel.prototype.onRemove = function() {
        this.div.parentNode.removeChild(this.div);
        for (var e = 0, t = this.listeners.length; t > e; ++e) google.maps.event.removeListener(this.listeners[e])
    }, MarkerLabel.prototype.draw = function() {
        var e = this.getProjection(),
            t = e.fromLatLngToDivPixel(this.get("position")),
            i = this.div;
        this.div.innerHTML = this.get("text").toString(), i.style.zIndex = this.get("zIndex"), i.style.display = "block", i.style.left = t.x - i.offsetWidth / 2 + "px", i.style.top = t.y - i.offsetHeight + "px"
    },
    function(e) {
        function t(t) {
            var i = t || window.event,
                n = [].slice.call(arguments, 1),
                o = 0,
                s = 0,
                a = 0,
                t = e.event.fix(i);
            return t.type = "mousewheel", i.wheelDelta && (o = i.wheelDelta / 120), i.detail && (o = -i.detail / 3), a = o, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (a = 0, s = -1 * o), void 0 !== i.wheelDeltaY && (a = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (s = -1 * i.wheelDeltaX / 120), n.unshift(t, o, s, a), (e.event.dispatch || e.event.handle).apply(this, n)
        }
        var i = ["DOMMouseScroll", "mousewheel"];
        if (e.event.fixHooks)
            for (var n = i.length; n;) e.event.fixHooks[i[--n]] = e.event.mouseHooks;
        e.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var e = i.length; e;) this.addEventListener(i[--e], t, !1);
                else this.onmousewheel = t
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var e = i.length; e;) this.removeEventListener(i[--e], t, !1);
                else this.onmousewheel = null
            }
        }, e.fn.extend({
            mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }
        })
    }(jQuery),
    function() {
        function e() {}

        function t(e, t) {
            for (var i = e.length; i--;)
                if (e[i].listener === t) return i;
            return -1
        }

        function i(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }
        var n = e.prototype,
            o = this,
            s = o.EventEmitter;
        n.getListeners = function(e) {
            var t, i, n = this._getEvents();
            if ("object" == typeof e) {
                t = {};
                for (i in n) n.hasOwnProperty(i) && e.test(i) && (t[i] = n[i])
            } else t = n[e] || (n[e] = []);
            return t
        }, n.flattenListeners = function(e) {
            var t, i = [];
            for (t = 0; e.length > t; t += 1) i.push(e[t].listener);
            return i
        }, n.getListenersAsObject = function(e) {
            var t, i = this.getListeners(e);
            return i instanceof Array && (t = {}, t[e] = i), t || i
        }, n.addListener = function(e, i) {
            var n, o = this.getListenersAsObject(e),
                s = "object" == typeof i;
            for (n in o) o.hasOwnProperty(n) && -1 === t(o[n], i) && o[n].push(s ? i : {
                listener: i,
                once: !1
            });
            return this
        }, n.on = i("addListener"), n.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, n.once = i("addOnceListener"), n.defineEvent = function(e) {
            return this.getListeners(e), this
        }, n.defineEvents = function(e) {
            for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
            return this
        }, n.removeListener = function(e, i) {
            var n, o, s = this.getListenersAsObject(e);
            for (o in s) s.hasOwnProperty(o) && (n = t(s[o], i), -1 !== n && s[o].splice(n, 1));
            return this
        }, n.off = i("removeListener"), n.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, n.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, n.manipulateListeners = function(e, t, i) {
            var n, o, s = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (n = i.length; n--;) s.call(this, t, i[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (o = t[n]) && ("function" == typeof o ? s.call(this, n, o) : a.call(this, n, o));
            return this
        }, n.removeEvent = function(e) {
            var t, i = typeof e,
                n = this._getEvents();
            if ("string" === i) delete n[e];
            else if ("object" === i)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(e, t) {
            var i, n, o, s, a = this.getListenersAsObject(e);
            for (o in a)
                if (a.hasOwnProperty(o))
                    for (n = a[o].length; n--;) i = a[o][n], i.once === !0 && this.removeListener(e, i.listener), s = i.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, i.listener);
            return this
        }, n.trigger = i("emitEvent"), n.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, n.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, n._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, n._getEvents = function() {
            return this._events || (this._events = {})
        }, e.noConflict = function() {
            return o.EventEmitter = s, e
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
            return e
        }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
    }.call(this),
    function(e) {
        function t(t) {
            var i = e.event;
            return i.target = i.target || i.srcElement || t, i
        }
        var i = document.documentElement,
            n = function() {};
        i.addEventListener ? n = function(e, t, i) {
            e.addEventListener(t, i, !1)
        } : i.attachEvent && (n = function(e, i, n) {
            e[i + n] = n.handleEvent ? function() {
                var i = t(e);
                n.handleEvent.call(n, i)
            } : function() {
                var i = t(e);
                n.call(e, i)
            }, e.attachEvent("on" + i, e[i + n])
        });
        var o = function() {};
        i.removeEventListener ? o = function(e, t, i) {
            e.removeEventListener(t, i, !1)
        } : i.detachEvent && (o = function(e, t, i) {
            e.detachEvent("on" + t, e[t + i]);
            try {
                delete e[t + i]
            } catch (n) {
                e[t + i] = void 0
            }
        });
        var s = {
            bind: n,
            unbind: o
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", s) : e.eventie = s
    }(this),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(i, n) {
            return t(e, i, n)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function(e, t, i) {
        function n(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }

        function o(e) {
            return "[object Array]" === h.call(e)
        }

        function s(e) {
            var t = [];
            if (o(e)) t = e;
            else if ("number" == typeof e.length)
                for (var i = 0, n = e.length; n > i; i++) t.push(e[i]);
            else t.push(e);
            return t
        }

        function a(e, t, i) {
            if (!(this instanceof a)) return new a(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = s(e), this.options = n({}, this.options), "function" == typeof t ? i = t : n(this.options, t), i && this.on("always", i), this.getImages(), d && (this.jqDeferred = new d.Deferred);
            var o = this;
            setTimeout(function() {
                o.check()
            })
        }

        function r(e) {
            this.img = e
        }

        function l(e) {
            this.src = e, p[e] = this
        }
        var d = e.jQuery,
            c = e.console,
            u = void 0 !== c,
            h = Object.prototype.toString;
        a.prototype = new t, a.prototype.options = {}, a.prototype.getImages = function() {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var i = this.elements[e];
                "IMG" === i.nodeName && this.addImage(i);
                var n = i.nodeType;
                if (n && (1 === n || 9 === n || 11 === n))
                    for (var o = i.querySelectorAll("img"), s = 0, a = o.length; a > s; s++) {
                        var r = o[s];
                        this.addImage(r)
                    }
            }
        }, a.prototype.addImage = function(e) {
            var t = new r(e);
            this.images.push(t)
        }, a.prototype.check = function() {
            function e(e, o) {
                return t.options.debug && u && c.log("confirm", e, o), t.progress(e), i++, i === n && t.complete(), !0
            }
            var t = this,
                i = 0,
                n = this.images.length;
            if (this.hasAnyBroken = !1, !n) return void this.complete();
            for (var o = 0; n > o; o++) {
                var s = this.images[o];
                s.on("confirm", e), s.check()
            }
        }, a.prototype.progress = function(e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function() {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, a.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function() {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var i = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[i](t)
                }
            })
        }, d && (d.fn.imagesLoaded = function(e, t) {
            var i = new a(this, e, t);
            return i.jqDeferred.promise(d(this))
        }), r.prototype = new t, r.prototype.check = function() {
            var e = p[this.img.src] || new l(this.img.src);
            if (e.isConfirmed) return void this.confirm(e.isLoaded, "cached was confirmed");
            if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var t = this;
            e.on("confirm", function(e, i) {
                return t.confirm(e.isLoaded, i), !0
            }), e.check()
        }, r.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var p = {};
        return l.prototype = new t, l.prototype.check = function() {
            if (!this.isChecked) {
                var e = new Image;
                i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, l.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, l.prototype.onload = function(e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, l.prototype.onerror = function(e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, l.prototype.confirm = function(e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, l.prototype.unbindProxyEvents = function(e) {
            i.unbind(e.target, "load", this), i.unbind(e.target, "error", this)
        }, a
    }), ! function(e) {
        function t() {}

        function i(e) {
            function i(t) {
                t.prototype.option || (t.prototype.option = function(t) {
                    e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
                })
            }

            function o(t, i) {
                e.fn[t] = function(o) {
                    if ("string" == typeof o) {
                        for (var a = n.call(arguments, 1), r = 0, l = this.length; l > r; r++) {
                            var d = this[r],
                                c = e.data(d, t);
                            if (c)
                                if (e.isFunction(c[o]) && "_" !== o.charAt(0)) {
                                    var u = c[o].apply(c, a);
                                    if (void 0 !== u) return u
                                } else s("no such method '" + o + "' for " + t + " instance");
                            else s("cannot call methods on " + t + " prior to initialization; attempted to call '" + o + "'")
                        }
                        return this
                    }
                    return this.each(function() {
                        var n = e.data(this, t);
                        n ? (n.option(o), n._init()) : (n = new i(this, o), e.data(this, t, n))
                    })
                }
            }
            if (e) {
                var s = "undefined" == typeof console ? t : function(e) {
                    console.error(e)
                };
                return e.bridget = function(e, t) {
                    i(t), o(e, t)
                }, e.bridget
            }
        }
        var n = Array.prototype.slice;
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : e.jQuery)
    }(window),
    function(e) {
        function t(t) {
            var i = e.event;
            return i.target = i.target || i.srcElement || t, i
        }
        var i = document.documentElement,
            n = function() {};
        i.addEventListener ? n = function(e, t, i) {
            e.addEventListener(t, i, !1)
        } : i.attachEvent && (n = function(e, i, n) {
            e[i + n] = n.handleEvent ? function() {
                var i = t(e);
                n.handleEvent.call(n, i)
            } : function() {
                var i = t(e);
                n.call(e, i)
            }, e.attachEvent("on" + i, e[i + n])
        });
        var o = function() {};
        i.removeEventListener ? o = function(e, t, i) {
            e.removeEventListener(t, i, !1)
        } : i.detachEvent && (o = function(e, t, i) {
            e.detachEvent("on" + t, e[t + i]);
            try {
                delete e[t + i]
            } catch (n) {
                e[t + i] = void 0
            }
        });
        var s = {
            bind: n,
            unbind: o
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? module.exports = s : e.eventie = s
    }(window),
    function() {
        "use strict";

        function e() {}

        function t(e, t) {
            for (var i = e.length; i--;)
                if (e[i].listener === t) return i;
            return -1
        }

        function i(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }
        var n = e.prototype,
            o = this,
            s = o.EventEmitter;
        n.getListeners = function(e) {
            var t, i, n = this._getEvents();
            if (e instanceof RegExp) {
                t = {};
                for (i in n) n.hasOwnProperty(i) && e.test(i) && (t[i] = n[i])
            } else t = n[e] || (n[e] = []);
            return t
        }, n.flattenListeners = function(e) {
            var t, i = [];
            for (t = 0; t < e.length; t += 1) i.push(e[t].listener);
            return i
        }, n.getListenersAsObject = function(e) {
            var t, i = this.getListeners(e);
            return i instanceof Array && (t = {}, t[e] = i), t || i
        }, n.addListener = function(e, i) {
            var n, o = this.getListenersAsObject(e),
                s = "object" == typeof i;
            for (n in o) o.hasOwnProperty(n) && -1 === t(o[n], i) && o[n].push(s ? i : {
                listener: i,
                once: !1
            });
            return this
        }, n.on = i("addListener"), n.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, n.once = i("addOnceListener"), n.defineEvent = function(e) {
            return this.getListeners(e), this
        }, n.defineEvents = function(e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, n.removeListener = function(e, i) {
            var n, o, s = this.getListenersAsObject(e);
            for (o in s) s.hasOwnProperty(o) && (n = t(s[o], i), -1 !== n && s[o].splice(n, 1));
            return this
        }, n.off = i("removeListener"), n.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, n.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, n.manipulateListeners = function(e, t, i) {
            var n, o, s = e ? this.removeListener : this.addListener,
                a = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (n = i.length; n--;) s.call(this, t, i[n]);
            else
                for (n in t) t.hasOwnProperty(n) && (o = t[n]) && ("function" == typeof o ? s.call(this, n, o) : a.call(this, n, o));
            return this
        }, n.removeEvent = function(e) {
            var t, i = typeof e,
                n = this._getEvents();
            if ("string" === i) delete n[e];
            else if (e instanceof RegExp)
                for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t];
            else delete this._events;
            return this
        }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(e, t) {
            var i, n, o, s, a = this.getListenersAsObject(e);
            for (o in a)
                if (a.hasOwnProperty(o))
                    for (n = a[o].length; n--;) i = a[o][n], i.once === !0 && this.removeListener(e, i.listener), s = i.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, i.listener);
            return this
        }, n.trigger = i("emitEvent"), n.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, n.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, n._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, n._getEvents = function() {
            return this._events || (this._events = {})
        }, e.noConflict = function() {
            return o.EventEmitter = s, e
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
            return e
        }) : "object" == typeof module && module.exports ? module.exports = e : o.EventEmitter = e
    }.call(this),
    function(e) {
        function t(e) {
            if (e) {
                if ("string" == typeof n[e]) return e;
                e = e.charAt(0).toUpperCase() + e.slice(1);
                for (var t, o = 0, s = i.length; s > o; o++)
                    if (t = i[o] + e, "string" == typeof n[t]) return t
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return t
        }) : "object" == typeof exports ? module.exports = t : e.getStyleProperty = t
    }(window),
    function(e, t) {
        function i(e) {
            var t = parseFloat(e),
                i = -1 === e.indexOf("%") && !isNaN(t);
            return i && t
        }

        function n() {}

        function o() {
            for (var e = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, t = 0, i = r.length; i > t; t++) {
                var n = r[t];
                e[n] = 0
            }
            return e
        }

        function s(t) {
            function n() {
                if (!h) {
                    h = !0;
                    var n = e.getComputedStyle;
                    if (d = function() {
                            var e = n ? function(e) {
                                return n(e, null)
                            } : function(e) {
                                return e.currentStyle
                            };
                            return function(t) {
                                var i = e(t);
                                return i || a("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                            }
                        }(), c = t("boxSizing")) {
                        var o = document.createElement("div");
                        o.style.width = "200px", o.style.padding = "1px 2px 3px 4px", o.style.borderStyle = "solid", o.style.borderWidth = "1px 2px 3px 4px", o.style[c] = "border-box";
                        var s = document.body || document.documentElement;
                        s.appendChild(o);
                        var r = d(o);
                        u = 200 === i(r.width), s.removeChild(o)
                    }
                }
            }

            function s(e) {
                if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                    var t = d(e);
                    if ("none" === t.display) return o();
                    var s = {};
                    s.width = e.offsetWidth, s.height = e.offsetHeight;
                    for (var a = s.isBorderBox = !(!c || !t[c] || "border-box" !== t[c]), h = 0, p = r.length; p > h; h++) {
                        var m = r[h],
                            f = t[m];
                        f = l(e, f);
                        var g = parseFloat(f);
                        s[m] = isNaN(g) ? 0 : g
                    }
                    var v = s.paddingLeft + s.paddingRight,
                        y = s.paddingTop + s.paddingBottom,
                        b = s.marginLeft + s.marginRight,
                        w = s.marginTop + s.marginBottom,
                        x = s.borderLeftWidth + s.borderRightWidth,
                        S = s.borderTopWidth + s.borderBottomWidth,
                        C = a && u,
                        T = i(t.width);
                    T !== !1 && (s.width = T + (C ? 0 : v + x));
                    var k = i(t.height);
                    return k !== !1 && (s.height = k + (C ? 0 : y + S)), s.innerWidth = s.width - (v + x), s.innerHeight = s.height - (y + S), s.outerWidth = s.width + b, s.outerHeight = s.height + w, s
                }
            }

            function l(t, i) {
                if (e.getComputedStyle || -1 === i.indexOf("%")) return i;
                var n = t.style,
                    o = n.left,
                    s = t.runtimeStyle,
                    a = s && s.left;
                return a && (s.left = t.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = o, a && (s.left = a), i
            }
            var d, c, u, h = !1;
            return s
        }
        var a = "undefined" == typeof console ? n : function(e) {
                console.error(e)
            },
            r = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], s) : "object" == typeof exports ? module.exports = s(require("desandro-get-style-property")) : e.getSize = s(e.getStyleProperty)
    }(window),
    function(e) {
        function t(e) {
            "function" == typeof e && (t.isReady ? e() : a.push(e))
        }

        function i(e) {
            var i = "readystatechange" === e.type && "complete" !== s.readyState;
            t.isReady || i || n()
        }

        function n() {
            t.isReady = !0;
            for (var e = 0, i = a.length; i > e; e++) {
                var n = a[e];
                n()
            }
        }

        function o(o) {
            return "complete" === s.readyState ? n() : (o.bind(s, "DOMContentLoaded", i), o.bind(s, "readystatechange", i), o.bind(e, "load", i)), t
        }
        var s = e.document,
            a = [];
        t.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : e.docReady = o(e.eventie)
    }(window),
    function(e) {
        "use strict";

        function t(e, t) {
            return e[a](t)
        }

        function i(e) {
            if (!e.parentNode) {
                var t = document.createDocumentFragment();
                t.appendChild(e)
            }
        }

        function n(e, t) {
            i(e);
            for (var n = e.parentNode.querySelectorAll(t), o = 0, s = n.length; s > o; o++)
                if (n[o] === e) return !0;
            return !1
        }

        function o(e, n) {
            return i(e), t(e, n)
        }
        var s, a = function() {
            if (e.matches) return "matches";
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++) {
                var o = t[i],
                    s = o + "MatchesSelector";
                if (e[s]) return s
            }
        }();
        if (a) {
            var r = document.createElement("div"),
                l = t(r, "div");
            s = l ? t : o
        } else s = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return s
        }) : "object" == typeof exports ? module.exports = s : window.matchesSelector = s
    }(Element.prototype),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(i, n) {
            return t(e, i, n)
        }) : "object" == typeof exports ? module.exports = t(e, require("doc-ready"), require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.docReady, e.matchesSelector)
    }(window, function(e, t, i) {
        var n = {};
        n.extend = function(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }, n.modulo = function(e, t) {
            return (e % t + t) % t
        };
        var o = Object.prototype.toString;
        n.isArray = function(e) {
            return "[object Array]" == o.call(e)
        }, n.makeArray = function(e) {
            var t = [];
            if (n.isArray(e)) t = e;
            else if (e && "number" == typeof e.length)
                for (var i = 0, o = e.length; o > i; i++) t.push(e[i]);
            else t.push(e);
            return t
        }, n.indexOf = Array.prototype.indexOf ? function(e, t) {
            return e.indexOf(t)
        } : function(e, t) {
            for (var i = 0, n = e.length; n > i; i++)
                if (e[i] === t) return i;
            return -1
        }, n.removeFrom = function(e, t) {
            var i = n.indexOf(e, t); - 1 != i && e.splice(i, 1)
        }, n.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(e) {
            return e instanceof HTMLElement
        } : function(e) {
            return e && "object" == typeof e && 1 == e.nodeType && "string" == typeof e.nodeName
        }, n.setText = function() {
            function e(e, i) {
                t = t || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), e[t] = i
            }
            var t;
            return e
        }(), n.getParent = function(e, t) {
            for (; e != document.body;)
                if (e = e.parentNode, i(e, t)) return e
        }, n.getQueryElement = function(e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }, n.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, n.filterFindElements = function(e, t) {
            e = n.makeArray(e);
            for (var o = [], s = 0, a = e.length; a > s; s++) {
                var r = e[s];
                if (n.isElement(r))
                    if (t) {
                        i(r, t) && o.push(r);
                        for (var l = r.querySelectorAll(t), d = 0, c = l.length; c > d; d++) o.push(l[d])
                    } else o.push(r)
            }
            return o
        }, n.debounceMethod = function(e, t, i) {
            var n = e.prototype[t],
                o = t + "Timeout";
            e.prototype[t] = function() {
                var e = this[o];
                e && clearTimeout(e);
                var t = arguments,
                    s = this;
                this[o] = setTimeout(function() {
                    n.apply(s, t), delete s[o]
                }, i || 100)
            }
        }, n.toDashed = function(e) {
            return e.replace(/(.)([A-Z])/g, function(e, t, i) {
                return t + "-" + i
            }).toLowerCase()
        };
        var s = e.console;
        return n.htmlInit = function(i, o) {
            t(function() {
                for (var t = n.toDashed(o), a = document.querySelectorAll(".js-" + t), r = "data-" + t + "-options", l = 0, d = a.length; d > l; l++) {
                    var c, u = a[l],
                        h = u.getAttribute(r);
                    try {
                        c = h && JSON.parse(h)
                    } catch (p) {
                        s && s.error("Error parsing " + r + " on " + u.nodeName.toLowerCase() + (u.id ? "#" + u.id : "") + ": " + p);
                        continue
                    }
                    var m = new i(u, c),
                        f = e.jQuery;
                    f && f.data(u, o, m)
                }
            })
        }, n
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(i, n, o, s) {
            return t(e, i, n, o, s)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (e.Outlayer = {}, e.Outlayer.Item = t(e, e.EventEmitter, e.getSize, e.getStyleProperty, e.fizzyUIUtils))
    }(window, function(e, t, i, n, o) {
        "use strict";

        function s(e) {
            for (var t in e) return !1;
            return t = null, !0
        }

        function a(e, t) {
            e && (this.element = e, this.layout = t, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function r(e) {
            return e.replace(/([A-Z])/g, function(e) {
                return "-" + e.toLowerCase()
            })
        }
        var l = e.getComputedStyle,
            d = l ? function(e) {
                return l(e, null)
            } : function(e) {
                return e.currentStyle
            },
            c = n("transition"),
            u = n("transform"),
            h = c && u,
            p = !!n("perspective"),
            m = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            } [c],
            f = ["transform", "transition", "transitionDuration", "transitionProperty"],
            g = function() {
                for (var e = {}, t = 0, i = f.length; i > t; t++) {
                    var o = f[t],
                        s = n(o);
                    s && s !== o && (e[o] = s)
                }
                return e
            }();
        o.extend(a.prototype, t.prototype), a.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, a.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, a.prototype.getSize = function() {
            this.size = i(this.element)
        }, a.prototype.css = function(e) {
            var t = this.element.style;
            for (var i in e) {
                var n = g[i] || i;
                t[n] = e[i]
            }
        }, a.prototype.getPosition = function() {
            var e = d(this.element),
                t = this.layout.options,
                i = t.isOriginLeft,
                n = t.isOriginTop,
                o = e[i ? "left" : "right"],
                s = e[n ? "top" : "bottom"],
                a = this.layout.size,
                r = -1 != o.indexOf("%") ? parseFloat(o) / 100 * a.width : parseInt(o, 10),
                l = -1 != s.indexOf("%") ? parseFloat(s) / 100 * a.height : parseInt(s, 10);
            r = isNaN(r) ? 0 : r, l = isNaN(l) ? 0 : l, r -= i ? a.paddingLeft : a.paddingRight, l -= n ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = l
        }, a.prototype.layoutPosition = function() {
            var e = this.layout.size,
                t = this.layout.options,
                i = {},
                n = t.isOriginLeft ? "paddingLeft" : "paddingRight",
                o = t.isOriginLeft ? "left" : "right",
                s = t.isOriginLeft ? "right" : "left",
                a = this.position.x + e[n];
            i[o] = this.getXValue(a), i[s] = "";
            var r = t.isOriginTop ? "paddingTop" : "paddingBottom",
                l = t.isOriginTop ? "top" : "bottom",
                d = t.isOriginTop ? "bottom" : "top",
                c = this.position.y + e[r];
            i[l] = this.getYValue(c), i[d] = "", this.css(i), this.emitEvent("layout", [this])
        }, a.prototype.getXValue = function(e) {
            var t = this.layout.options;
            return t.percentPosition && !t.isHorizontal ? e / this.layout.size.width * 100 + "%" : e + "px"
        }, a.prototype.getYValue = function(e) {
            var t = this.layout.options;
            return t.percentPosition && t.isHorizontal ? e / this.layout.size.height * 100 + "%" : e + "px"
        }, a.prototype._transitionTo = function(e, t) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                o = parseInt(e, 10),
                s = parseInt(t, 10),
                a = o === this.position.x && s === this.position.y;
            if (this.setPosition(e, t), a && !this.isTransitioning) return void this.layoutPosition();
            var r = e - i,
                l = t - n,
                d = {};
            d.transform = this.getTranslate(r, l), this.transition({
                to: d,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, a.prototype.getTranslate = function(e, t) {
            var i = this.layout.options;
            return e = i.isOriginLeft ? e : -e, t = i.isOriginTop ? t : -t, p ? "translate3d(" + e + "px, " + t + "px, 0)" : "translate(" + e + "px, " + t + "px)"
        }, a.prototype.goTo = function(e, t) {
            this.setPosition(e, t), this.layoutPosition()
        }, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(e, t) {
            this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
        }, a.prototype._nonTransition = function(e) {
            this.css(e.to), e.isCleaning && this._removeStyles(e.to);
            for (var t in e.onTransitionEnd) e.onTransitionEnd[t].call(this)
        }, a.prototype._transition = function(e) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(e);
            var t = this._transn;
            for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
            for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
            if (e.from) {
                this.css(e.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
        };
        var v = "opacity," + r(g.transform || "transform");
        a.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: v,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(m, this, !1))
        }, a.prototype.transition = a.prototype[c ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(e) {
            this.ontransitionend(e)
        }, a.prototype.onotransitionend = function(e) {
            this.ontransitionend(e)
        };
        var y = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        a.prototype.ontransitionend = function(e) {
            if (e.target === this.element) {
                var t = this._transn,
                    i = y[e.propertyName] || e.propertyName;
                if (delete t.ingProperties[i], s(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) {
                    var n = t.onEnd[i];
                    n.call(this), delete t.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function(e) {
            var t = {};
            for (var i in e) t[i] = "";
            this.css(t)
        };
        var b = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return a.prototype.removeTransitionStyles = function() {
            this.css(b)
        }, a.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, a.prototype.remove = function() {
            if (!c || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var e = this;
            this.once("transitionEnd", function() {
                e.removeElem()
            }), this.hide()
        }, a.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {},
                i = this.getHideRevealTransitionEndProperty("visibleStyle");
            t[i] = this.onRevealTransitionEnd, this.transition({
                from: e.hiddenStyle,
                to: e.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, a.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, a.prototype.getHideRevealTransitionEndProperty = function(e) {
            var t = this.layout.options[e];
            if (t.opacity) return "opacity";
            for (var i in t) return i
        }, a.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var e = this.layout.options,
                t = {},
                i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            t[i] = this.onHideTransitionEnd, this.transition({
                from: e.visibleStyle,
                to: e.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, a.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, a.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, a
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, s, a) {
            return t(e, i, n, o, s, a)
        }) : "object" == typeof exports ? module.exports = t(e, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.eventie, e.EventEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
    }(window, function(e, t, i, n, o, s) {
        "use strict";

        function a(e, t) {
            var i = o.getQueryElement(e);
            if (!i) return void(r && r.error("Bad element for " + this.constructor.namespace + ": " + (i || e)));
            this.element = i, l && (this.$element = l(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(t);
            var n = ++c;
            this.element.outlayerGUID = n, u[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var r = e.console,
            l = e.jQuery,
            d = function() {},
            c = 0,
            u = {};
        return a.namespace = "outlayer", a.Item = s, a.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, o.extend(a.prototype, i.prototype), a.prototype.option = function(e) {
            o.extend(this.options, e)
        }, a.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, a.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, a.prototype._itemize = function(e) {
            for (var t = this._filterFindItemElements(e), i = this.constructor.Item, n = [], o = 0, s = t.length; s > o; o++) {
                var a = t[o],
                    r = new i(a, this);
                n.push(r)
            }
            return n
        }, a.prototype._filterFindItemElements = function(e) {
            return o.filterFindElements(e, this.options.itemSelector)
        }, a.prototype.getItemElements = function() {
            for (var e = [], t = 0, i = this.items.length; i > t; t++) e.push(this.items[t].element);
            return e
        }, a.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited = !0
        }, a.prototype._init = a.prototype.layout, a.prototype._resetLayout = function() {
            this.getSize()
        }, a.prototype.getSize = function() {
            this.size = n(this.element)
        }, a.prototype._getMeasurement = function(e, t) {
            var i, s = this.options[e];
            s ? ("string" == typeof s ? i = this.element.querySelector(s) : o.isElement(s) && (i = s), this[e] = i ? n(i)[t] : s) : this[e] = 0
        }, a.prototype.layoutItems = function(e, t) {
            e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
        }, a.prototype._getItemsForLayout = function(e) {
            for (var t = [], i = 0, n = e.length; n > i; i++) {
                var o = e[i];
                o.isIgnored || t.push(o)
            }
            return t
        }, a.prototype._layoutItems = function(e, t) {
            if (this._emitCompleteOnItems("layout", e), e && e.length) {
                for (var i = [], n = 0, o = e.length; o > n; n++) {
                    var s = e[n],
                        a = this._getItemLayoutPosition(s);
                    a.item = s, a.isInstant = t || s.isLayoutInstant, i.push(a)
                }
                this._processLayoutQueue(i)
            }
        }, a.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, a.prototype._processLayoutQueue = function(e) {
            for (var t = 0, i = e.length; i > t; t++) {
                var n = e[t];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, a.prototype._positionItem = function(e, t, i, n) {
            n ? e.goTo(t, i) : e.moveTo(t, i)
        }, a.prototype._postLayout = function() {
            this.resizeContainer()
        }, a.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }
        }, a.prototype._getContainerSize = d, a.prototype._setContainerMeasure = function(e, t) {
            if (void 0 !== e) {
                var i = this.size;
                i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
            }
        }, a.prototype._emitCompleteOnItems = function(e, t) {
            function i() {
                o.dispatchEvent(e + "Complete", null, [t])
            }

            function n() {
                a++, a === s && i()
            }
            var o = this,
                s = t.length;
            if (!t || !s) return void i();
            for (var a = 0, r = 0, l = t.length; l > r; r++) {
                var d = t[r];
                d.once(e, n)
            }
        }, a.prototype.dispatchEvent = function(e, t, i) {
            var n = t ? [t].concat(i) : i;
            if (this.emitEvent(e, n), l)
                if (this.$element = this.$element || l(this.element), t) {
                    var o = l.Event(t);
                    o.type = e, this.$element.trigger(o, i)
                } else this.$element.trigger(e, i)
        }, a.prototype.ignore = function(e) {
            var t = this.getItem(e);
            t && (t.isIgnored = !0)
        }, a.prototype.unignore = function(e) {
            var t = this.getItem(e);
            t && delete t.isIgnored
        }, a.prototype.stamp = function(e) {
            if (e = this._find(e)) {
                this.stamps = this.stamps.concat(e);
                for (var t = 0, i = e.length; i > t; t++) {
                    var n = e[t];
                    this.ignore(n)
                }
            }
        }, a.prototype.unstamp = function(e) {
            if (e = this._find(e))
                for (var t = 0, i = e.length; i > t; t++) {
                    var n = e[t];
                    o.removeFrom(this.stamps, n), this.unignore(n)
                }
        }, a.prototype._find = function(e) {
            return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = o.makeArray(e)) : void 0
        }, a.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var e = 0, t = this.stamps.length; t > e; e++) {
                    var i = this.stamps[e];
                    this._manageStamp(i)
                }
            }
        }, a.prototype._getBoundingRect = function() {
            var e = this.element.getBoundingClientRect(),
                t = this.size;
            this._boundingRect = {
                left: e.left + t.paddingLeft + t.borderLeftWidth,
                top: e.top + t.paddingTop + t.borderTopWidth,
                right: e.right - (t.paddingRight + t.borderRightWidth),
                bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
            }
        }, a.prototype._manageStamp = d, a.prototype._getElementOffset = function(e) {
            var t = e.getBoundingClientRect(),
                i = this._boundingRect,
                o = n(e),
                s = {
                    left: t.left - i.left - o.marginLeft,
                    top: t.top - i.top - o.marginTop,
                    right: i.right - t.right - o.marginRight,
                    bottom: i.bottom - t.bottom - o.marginBottom
                };
            return s
        }, a.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, a.prototype.bindResize = function() {
            this.isResizeBound || (t.bind(e, "resize", this), this.isResizeBound = !0)
        }, a.prototype.unbindResize = function() {
            this.isResizeBound && t.unbind(e, "resize", this), this.isResizeBound = !1
        }, a.prototype.onresize = function() {
            function e() {
                t.resize(), delete t.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var t = this;
            this.resizeTimeout = setTimeout(e, 100)
        }, a.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, a.prototype.needsResizeLayout = function() {
            var e = n(this.element),
                t = this.size && e;
            return t && e.innerWidth !== this.size.innerWidth
        }, a.prototype.addItems = function(e) {
            var t = this._itemize(e);
            return t.length && (this.items = this.items.concat(t)), t
        }, a.prototype.appended = function(e) {
            var t = this.addItems(e);
            t.length && (this.layoutItems(t, !0), this.reveal(t))
        }, a.prototype.prepended = function(e) {
            var t = this._itemize(e);
            if (t.length) {
                var i = this.items.slice(0);
                this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
            }
        }, a.prototype.reveal = function(e) {
            this._emitCompleteOnItems("reveal", e);
            for (var t = e && e.length, i = 0; t && t > i; i++) {
                var n = e[i];
                n.reveal()
            }
        }, a.prototype.hide = function(e) {
            this._emitCompleteOnItems("hide", e);
            for (var t = e && e.length, i = 0; t && t > i; i++) {
                var n = e[i];
                n.hide()
            }
        }, a.prototype.revealItemElements = function(e) {
            var t = this.getItems(e);
            this.reveal(t)
        }, a.prototype.hideItemElements = function(e) {
            var t = this.getItems(e);
            this.hide(t)
        }, a.prototype.getItem = function(e) {
            for (var t = 0, i = this.items.length; i > t; t++) {
                var n = this.items[t];
                if (n.element === e) return n
            }
        }, a.prototype.getItems = function(e) {
            e = o.makeArray(e);
            for (var t = [], i = 0, n = e.length; n > i; i++) {
                var s = e[i],
                    a = this.getItem(s);
                a && t.push(a)
            }
            return t
        }, a.prototype.remove = function(e) {
            var t = this.getItems(e);
            if (this._emitCompleteOnItems("remove", t), t && t.length)
                for (var i = 0, n = t.length; n > i; i++) {
                    var s = t[i];
                    s.remove(), o.removeFrom(this.items, s)
                }
        }, a.prototype.destroy = function() {
            var e = this.element.style;
            e.height = "", e.position = "", e.width = "";
            for (var t = 0, i = this.items.length; i > t; t++) {
                var n = this.items[t];
                n.destroy()
            }
            this.unbindResize();
            var o = this.element.outlayerGUID;
            delete u[o], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
        }, a.data = function(e) {
            e = o.getQueryElement(e);
            var t = e && e.outlayerGUID;
            return t && u[t]
        }, a.create = function(e, t) {
            function i() {
                a.apply(this, arguments)
            }
            return Object.create ? i.prototype = Object.create(a.prototype) : o.extend(i.prototype, a.prototype), i.prototype.constructor = i, i.defaults = o.extend({}, a.defaults), o.extend(i.defaults, t), i.prototype.settings = {}, i.namespace = e, i.data = a.data, i.Item = function() {
                s.apply(this, arguments)
            }, i.Item.prototype = new s, o.htmlInit(i, e), l && l.bridget && l.bridget(e, i), i
        }, a.Item = s, a
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], t) : "object" == typeof exports ? module.exports = t(require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(e.Outlayer))
    }(window, function(e) {
        "use strict";

        function t() {
            e.Item.apply(this, arguments)
        }
        t.prototype = new e.Item, t.prototype._create = function() {
            this.id = this.layout.itemGUID++, e.Item.prototype._create.call(this), this.sortData = {}
        }, t.prototype.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var e = this.layout.options.getSortData,
                    t = this.layout._sorters;
                for (var i in e) {
                    var n = t[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var i = t.prototype.destroy;
        return t.prototype.destroy = function() {
            i.apply(this, arguments), this.css({
                display: ""
            })
        }, t
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
    }(window, function(e, t) {
        "use strict";

        function i(e) {
            this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size)
        }
        return function() {
            function e(e) {
                return function() {
                    return t.prototype[e].apply(this.isotope, arguments)
                }
            }
            for (var n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], o = 0, s = n.length; s > o; o++) {
                var a = n[o];
                i.prototype[a] = e(a)
            }
        }(), i.prototype.needsVerticalResizeLayout = function() {
            var t = e(this.isotope.element),
                i = this.isotope.size && t;
            return i && t.innerHeight != this.isotope.size.innerHeight
        }, i.prototype._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, i.prototype.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, i.prototype.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, i.prototype.getSegmentSize = function(e, t) {
            var i = e + t,
                n = "outer" + t;
            if (this._getMeasurement(i, n), !this[i]) {
                var o = this.getFirstItemSize();
                this[i] = o && o[n] || this.isotope.size["inner" + t]
            }
        }, i.prototype.getFirstItemSize = function() {
            var t = this.isotope.filteredItems[0];
            return t && t.element && e(t.element)
        }, i.prototype.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, i.prototype.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function(e, t) {
            function n() {
                i.apply(this, arguments)
            }
            return n.prototype = new i, t && (n.options = t), n.prototype.namespace = e, i.modes[e] = n, n
        }, i
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], t) : "object" == typeof exports ? module.exports = t(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : e.Masonry = t(e.Outlayer, e.getSize, e.fizzyUIUtils)
    }(window, function(e, t, i) {
        var n = e.create("masonry");
        return n.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var e = this.cols;
            for (this.colYs = []; e--;) this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var e = this.items[0],
                    i = e && e.element;
                this.columnWidth = i && t(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter,
                o = this.containerWidth + this.gutter,
                s = o / n,
                a = n - o % n,
                r = a && 1 > a ? "round" : "floor";
            s = Math[r](s), this.cols = Math.max(s, 1)
        }, n.prototype.getContainerWidth = function() {
            var e = this.options.isFitWidth ? this.element.parentNode : this.element,
                i = t(e);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function(e) {
            e.getSize();
            var t = e.size.outerWidth % this.columnWidth,
                n = t && 1 > t ? "round" : "ceil",
                o = Math[n](e.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (var s = this._getColGroup(o), a = Math.min.apply(Math, s), r = i.indexOf(s, a), l = {
                    x: this.columnWidth * r,
                    y: a
                }, d = a + e.size.outerHeight, c = this.cols + 1 - s.length, u = 0; c > u; u++) this.colYs[r + u] = d;
            return l
        }, n.prototype._getColGroup = function(e) {
            if (2 > e) return this.colYs;
            for (var t = [], i = this.cols + 1 - e, n = 0; i > n; n++) {
                var o = this.colYs.slice(n, n + e);
                t[n] = Math.max.apply(Math, o)
            }
            return t
        }, n.prototype._manageStamp = function(e) {
            var i = t(e),
                n = this._getElementOffset(e),
                o = this.options.isOriginLeft ? n.left : n.right,
                s = o + i.outerWidth,
                a = Math.floor(o / this.columnWidth);
            a = Math.max(0, a);
            var r = Math.floor(s / this.columnWidth);
            r -= s % this.columnWidth ? 0 : 1, r = Math.min(this.cols - 1, r);
            for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, d = a; r >= d; d++) this.colYs[d] = Math.max(l, this.colYs[d])
        }, n.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = {
                height: this.maxY
            };
            return this.options.isFitWidth && (e.width = this._getContainerFitWidth()), e
        }, n.prototype._getContainerFitWidth = function() {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
            return (this.cols - e) * this.columnWidth - this.gutter
        }, n.prototype.needsResizeLayout = function() {
            var e = this.containerWidth;
            return this.getContainerWidth(), e !== this.containerWidth
        }, n
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode, e.Masonry)
    }(window, function(e, t) {
        "use strict";

        function i(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }
        var n = e.create("masonry"),
            o = n.prototype._getElementOffset,
            s = n.prototype.layout,
            a = n.prototype._getMeasurement;
        i(n.prototype, t.prototype), n.prototype._getElementOffset = o, n.prototype.layout = s, n.prototype._getMeasurement = a;
        var r = n.prototype.measureColumns;
        n.prototype.measureColumns = function() {
            this.items = this.isotope.filteredItems, r.call(this)
        };
        var l = n.prototype._manageStamp;
        return n.prototype._manageStamp = function() {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, l.apply(this, arguments)
        }, n
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function(e) {
        "use strict";
        var t = e.create("fitRows");
        return t.prototype._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, t.prototype._getItemLayoutPosition = function(e) {
            e.getSize();
            var t = e.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && t + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += t, n
        }, t.prototype._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, t
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function(e) {
        "use strict";
        var t = e.create("vertical", {
            horizontalAlignment: 0
        });
        return t.prototype._resetLayout = function() {
            this.y = 0
        }, t.prototype._getItemLayoutPosition = function(e) {
            e.getSize();
            var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += e.size.outerHeight, {
                x: t,
                y: i
            }
        }, t.prototype._getContainerSize = function() {
            return {
                height: this.y
            }
        }, t
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, n, o, s, a, r) {
            return t(e, i, n, o, s, a, r)
        }) : "object" == typeof exports ? module.exports = t(e, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer, e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e.Isotope.LayoutMode)
    }(window, function(e, t, i, n, o, s, a) {
        function r(e, t) {
            return function(i, n) {
                for (var o = 0, s = e.length; s > o; o++) {
                    var a = e[o],
                        r = i.sortData[a],
                        l = n.sortData[a];
                    if (r > l || l > r) {
                        var d = void 0 !== t[a] ? t[a] : t,
                            c = d ? 1 : -1;
                        return (r > l ? 1 : -1) * c
                    }
                }
                return 0
            }
        }
        var l = e.jQuery,
            d = String.prototype.trim ? function(e) {
                return e.trim()
            } : function(e) {
                return e.replace(/^\s+|\s+$/g, "")
            },
            c = document.documentElement,
            u = c.textContent ? function(e) {
                return e.textContent
            } : function(e) {
                return e.innerText
            },
            h = t.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        h.Item = s, h.LayoutMode = a, h.prototype._create = function() {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var e in a.modes) this._initLayoutMode(e)
        }, h.prototype.reloadItems = function() {
            this.itemGUID = 0, t.prototype.reloadItems.call(this)
        }, h.prototype._itemize = function() {
            for (var e = t.prototype._itemize.apply(this, arguments), i = 0, n = e.length; n > i; i++) {
                var o = e[i];
                o.id = this.itemGUID++
            }
            return this._updateItemsSortData(e), e
        }, h.prototype._initLayoutMode = function(e) {
            var t = a.modes[e],
                i = this.options[e] || {};
            this.options[e] = t.options ? o.extend(t.options, i) : i, this.modes[e] = new t(this)
        }, h.prototype.layout = function() {
            return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
        }, h.prototype._layout = function() {
            var e = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), this._isLayoutInited = !0
        }, h.prototype.arrange = function(e) {
            function t() {
                n.reveal(i.needReveal), n.hide(i.needHide)
            }
            this.option(e), this._getIsInstant();
            var i = this._filter(this.items);
            this.filteredItems = i.matches;
            var n = this;
            this._bindArrangeComplete(), this._isInstant ? this._noTransition(t) : t(), this._sort(), this._layout()
        }, h.prototype._init = h.prototype.arrange, h.prototype._getIsInstant = function() {
            var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            return this._isInstant = e, e
        }, h.prototype._bindArrangeComplete = function() {
            function e() {
                t && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
            }
            var t, i, n, o = this;
            this.once("layoutComplete", function() {
                t = !0, e()
            }), this.once("hideComplete", function() {
                i = !0, e()
            }), this.once("revealComplete", function() {
                n = !0, e()
            })
        }, h.prototype._filter = function(e) {
            var t = this.options.filter;
            t = t || "*";
            for (var i = [], n = [], o = [], s = this._getFilterTest(t), a = 0, r = e.length; r > a; a++) {
                var l = e[a];
                if (!l.isIgnored) {
                    var d = s(l);
                    d && i.push(l), d && l.isHidden ? n.push(l) : d || l.isHidden || o.push(l)
                }
            }
            return {
                matches: i,
                needReveal: n,
                needHide: o
            }
        }, h.prototype._getFilterTest = function(e) {
            return l && this.options.isJQueryFiltering ? function(t) {
                return l(t.element).is(e)
            } : "function" == typeof e ? function(t) {
                return e(t.element)
            } : function(t) {
                return n(t.element, e)
            }
        }, h.prototype.updateSortData = function(e) {
            var t;
            e ? (e = o.makeArray(e), t = this.getItems(e)) : t = this.items, this._getSorters(), this._updateItemsSortData(t)
        }, h.prototype._getSorters = function() {
            var e = this.options.getSortData;
            for (var t in e) {
                var i = e[t];
                this._sorters[t] = p(i)
            }
        }, h.prototype._updateItemsSortData = function(e) {
            for (var t = e && e.length, i = 0; t && t > i; i++) {
                var n = e[i];
                n.updateSortData()
            }
        };
        var p = function() {
            function e(e) {
                if ("string" != typeof e) return e;
                var i = d(e).split(" "),
                    n = i[0],
                    o = n.match(/^\[(.+)\]$/),
                    s = o && o[1],
                    a = t(s, n),
                    r = h.sortDataParsers[i[1]];
                return e = r ? function(e) {
                    return e && r(a(e))
                } : function(e) {
                    return e && a(e)
                }
            }

            function t(e, t) {
                var i;
                return i = e ? function(t) {
                    return t.getAttribute(e)
                } : function(e) {
                    var i = e.querySelector(t);
                    return i && u(i)
                }
            }
            return e
        }();
        h.sortDataParsers = {
            parseInt: function(e) {
                return parseInt(e, 10)
            },
            parseFloat: function(e) {
                return parseFloat(e)
            }
        }, h.prototype._sort = function() {
            var e = this.options.sortBy;
            if (e) {
                var t = [].concat.apply(e, this.sortHistory),
                    i = r(t, this.options.sortAscending);
                this.filteredItems.sort(i), e != this.sortHistory[0] && this.sortHistory.unshift(e)
            }
        }, h.prototype._mode = function() {
            var e = this.options.layoutMode,
                t = this.modes[e];
            if (!t) throw new Error("No layout mode: " + e);
            return t.options = this.options[e], t
        }, h.prototype._resetLayout = function() {
            t.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, h.prototype._getItemLayoutPosition = function(e) {
            return this._mode()._getItemLayoutPosition(e)
        }, h.prototype._manageStamp = function(e) {
            this._mode()._manageStamp(e)
        }, h.prototype._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, h.prototype.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, h.prototype.appended = function(e) {
            var t = this.addItems(e);
            if (t.length) {
                var i = this._filterRevealAdded(t);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, h.prototype.prepended = function(e) {
            var t = this._itemize(e);
            if (t.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(t);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = t.concat(this.items)
            }
        }, h.prototype._filterRevealAdded = function(e) {
            var t = this._filter(e);
            return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
        }, h.prototype.insert = function(e) {
            var t = this.addItems(e);
            if (t.length) {
                var i, n, o = t.length;
                for (i = 0; o > i; i++) n = t[i], this.element.appendChild(n.element);
                var s = this._filter(t).matches;
                for (i = 0; o > i; i++) t[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; o > i; i++) delete t[i].isLayoutInstant;
                this.reveal(s)
            }
        };
        var m = h.prototype.remove;
        return h.prototype.remove = function(e) {
            e = o.makeArray(e);
            var t = this.getItems(e);
            m.call(this, e);
            var i = t && t.length;
            if (i)
                for (var n = 0; i > n; n++) {
                    var s = t[n];
                    o.removeFrom(this.filteredItems, s)
                }
        }, h.prototype.shuffle = function() {
            for (var e = 0, t = this.items.length; t > e; e++) {
                var i = this.items[e];
                i.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, h.prototype._noTransition = function(e) {
            var t = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var i = e.call(this);
            return this.options.transitionDuration = t, i
        }, h.prototype.getFilteredItemElements = function() {
            for (var e = [], t = 0, i = this.filteredItems.length; i > t; t++) e.push(this.filteredItems[t].element);
            return e
        }, h
    }), ! function(e, t, i, n) {
        var o = function(n, o) {
            this.elem = n, this.$elem = e(n), this.options = o, this.metadata = this.$elem.data("plugin-options"), this.$win = e(t), this.sections = {}, this.didScroll = !1, this.$doc = e(i), this.docHeight = this.$doc.height()
        };
        o.prototype = {
            defaults: {
                navItems: "a",
                currentClass: "current",
                changeHash: !1,
                easing: "swing",
                filter: "",
                scrollSpeed: 750,
                scrollThreshold: .5,
                begin: !1,
                end: !1,
                scrollChange: !1
            },
            init: function() {
                return this.config = e.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", e.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", e.proxy(this.getPositions, this)), this
            },
            adjustNav: function(e, t) {
                e.$elem.find("." + e.config.currentClass).removeClass(e.config.currentClass), t.addClass(e.config.currentClass)
            },
            bindInterval: function() {
                var e, t = this;
                t.$win.on("scroll.onePageNav", function() {
                    t.didScroll = !0
                }), t.t = setInterval(function() {
                    e = t.$doc.height(), t.didScroll && (t.didScroll = !1, t.scrollChange()), e !== t.docHeight && (t.docHeight = e, t.getPositions())
                }, 250)
            },
            getHash: function(e) {
                return e.attr("href").split("#")[1]
            },
            getPositions: function() {
                var t, i, n, o = this;
                o.$nav.each(function() {
                    t = o.getHash(e(this)), n = e("#" + t), n.length && (i = n.offset().top, o.sections[t] = Math.round(i))
                })
            },
            getSection: function(e) {
                var t = null,
                    i = Math.round(this.$win.height() * this.config.scrollThreshold);
                for (var n in this.sections) this.sections[n] - i < e && (t = n);
                return t
            },
            handleClick: function(i) {
                var n = this,
                    o = e(i.currentTarget),
                    s = o.parent(),
                    a = "#" + n.getHash(o);
                s.hasClass(n.config.currentClass) || (n.config.begin && n.config.begin(), n.adjustNav(n, s), n.unbindInterval(), n.scrollTo(a, function() {
                    n.config.changeHash && (t.location.hash = a), n.bindInterval(), n.config.end && n.config.end()
                })), i.preventDefault()
            },
            scrollChange: function() {
                var e, t = this.$win.scrollTop(),
                    i = this.getSection(t);
                null !== i && (e = this.$elem.find('a[href$="#' + i + '"]').parent(), e.hasClass(this.config.currentClass) || (this.adjustNav(this, e), this.config.scrollChange && this.config.scrollChange(e)))
            },
            scrollTo: function(t, i) {
                var n = e(t).offset().top;
                e("html, body").animate({
                    scrollTop: n
                }, this.config.scrollSpeed, this.config.easing, i)
            },
            unbindInterval: function() {
                clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
            }
        }, o.defaults = o.prototype.defaults, e.fn.onePageNav = function(e) {
            return this.each(function() {
                new o(this, e).init()
            })
        }
    }(jQuery, window, document), ! function(e) {
        function t() {
            s = !1;
            for (var t = 0, i = n.length; i > t; t++) {
                var o = e(n[t]).filter(function() {
                    return e(this).is(":appeared")
                });
                if (o.trigger("appear", [o]), l[t]) {
                    var a = l[t].not(o);
                    a.trigger("disappear", [a])
                }
                l[t] = o
            }
        }

        function i(e) {
            n.push(e), l.push()
        }
        var n = [],
            o = !1,
            s = !1,
            a = {
                interval: 250,
                force_process: !1
            },
            r = e(window),
            l = [];
        e.expr[":"].appeared = function(t) {
            var i = e(t);
            if (!i.is(":visible")) return !1;
            var n = r.scrollLeft(),
                o = r.scrollTop(),
                s = i.offset(),
                a = s.left,
                l = s.top;
            return l + i.height() >= o && l - (i.data("appear-top-offset") || 0) <= o + r.height() && a + i.width() >= n && a - (i.data("appear-left-offset") || 0) <= n + r.width() ? !0 : !1
        }, e.fn.extend({
            appear: function(n) {
                var r = e.extend({}, a, n || {}),
                    l = this.selector || this;
                if (!o) {
                    var d = function() {
                        s || (s = !0, setTimeout(t, r.interval))
                    };
                    e(window).scroll(d).resize(d), o = !0
                }
                return r.force_process && setTimeout(t, r.interval), i(l), e(l)
            }
        }), e.extend({
            force_appear: function() {
                return o ? (t(), !0) : !1
            }
        })
    }(function() {
        return "undefined" != typeof module ? require("jquery") : jQuery
    }()), ! function(e) {
        var t = {},
            n = {
                mode: "horizontal",
                slideSelector: "",
                infiniteLoop: !0,
                hideControlOnEnd: !1,
                speed: 500,
                easing: null,
                slideMargin: 0,
                startSlide: 0,
                randomStart: !1,
                captions: !1,
                ticker: !1,
                tickerHover: !1,
                adaptiveHeight: !1,
                adaptiveHeightSpeed: 500,
                video: !1,
                useCSS: !0,
                preloadImages: "visible",
                responsive: !0,
                slideZIndex: 50,
                touchEnabled: !0,
                swipeThreshold: 50,
                oneToOneTouch: !0,
                preventDefaultSwipeX: !0,
                preventDefaultSwipeY: !1,
                pager: !0,
                pagerType: "full",
                pagerShortSeparator: " / ",
                pagerSelector: null,
                buildPager: null,
                pagerCustom: null,
                controls: !0,
                nextText: "Next",
                prevText: "Prev",
                nextSelector: null,
                prevSelector: null,
                autoControls: !1,
                startText: "Start",
                stopText: "Stop",
                autoControlsCombine: !1,
                autoControlsSelector: null,
                auto: !1,
                pause: 4e3,
                autoStart: !0,
                autoDirection: "next",
                autoHover: !1,
                autoDelay: 0,
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 0,
                slideWidth: 0,
                onSliderLoad: function() {},
                onSlideBefore: function() {},
                onSlideAfter: function() {},
                onSlideNext: function() {},
                onSlidePrev: function() {},
                onSliderResize: function() {}
            };
        e.fn.bxSlider = function(o) {
            if (0 == this.length) return this;
            if (this.length > 1) return this.each(function() {
                e(this).bxSlider(o)
            }), this;
            var s = {},
                a = this;
            t.el = this;
            var r = e(window).width(),
                l = e(window).height(),
                d = function() {
                    s.settings = e.extend({}, n, o), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = a.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = {
                        index: s.settings.startSlide
                    }, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" == s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" != s.settings.mode && function() {
                        var e = document.createElement("div"),
                            t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                        for (var i in t)
                            if (void 0 !== e.style[t[i]]) return s.cssPrefix = t[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                        return !1
                    }(), "vertical" == s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), a.data("origStyle", a.attr("style")), a.children(s.settings.slideSelector).each(function() {
                        e(this).data("origStyle", e(this).attr("style"))
                    }), c()
                },
                c = function() {
                    a.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), s.viewport = a.parent(), s.loader = e('<div class="bx-loading" />'), s.viewport.prepend(s.loader), a.css({
                        width: "horizontal" == s.settings.mode ? 100 * s.children.length + 215 + "%" : "auto",
                        position: "relative"
                    }), s.usingCSS && s.settings.easing ? a.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing"), g(), s.viewport.css({
                        width: "100%",
                        overflow: "hidden",
                        position: "relative"
                    }), s.viewport.parent().css({
                        maxWidth: m()
                    }), s.settings.pager || s.viewport.parent().css({
                        margin: "0 auto 0px"
                    }), s.children.css({
                        "float": "horizontal" == s.settings.mode ? "left" : "none",
                        listStyle: "none",
                        position: "relative"
                    }), s.children.css("width", f()), "horizontal" == s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" == s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" == s.settings.mode && (s.children.css({
                        position: "absolute",
                        zIndex: 0,
                        display: "none"
                    }), s.children.eq(s.settings.startSlide).css({
                        zIndex: s.settings.slideZIndex,
                        display: "block"
                    })), s.controls.el = e('<div class="bx-controls" />'), s.settings.captions && k(), s.active.last = s.settings.startSlide == v() - 1, s.settings.video && a.fitVids();
                    var t = s.children.eq(s.settings.startSlide);
                    "all" == s.settings.preloadImages && (t = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.pager && S(), s.settings.controls && C(), s.settings.auto && s.settings.autoControls && T(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), u(t, h)
                },
                u = function(t, i) {
                    var n = t.find("img, iframe").length;
                    if (0 == n) return void i();
                    var o = 0;
                    t.find("img, iframe").each(function() {
                        e(this).one("load", function() {
                            ++o == n && i()
                        }).each(function() {
                            this.complete && e(this).load()
                        })
                    })
                },
                h = function() {
                    if (s.settings.infiniteLoop && "fade" != s.settings.mode && !s.settings.ticker) {
                        var t = "vertical" == s.settings.mode ? s.settings.minSlides : s.settings.maxSlides,
                            i = s.children.slice(0, t).clone().addClass("bx-clone"),
                            n = s.children.slice(-t).clone().addClass("bx-clone");
                        a.append(i).prepend(n)
                    }
                    s.loader.remove(), b(), "vertical" == s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(p()), a.redrawSlider(), s.settings.onSliderLoad(s.active.index), s.initialized = !0, s.settings.responsive && e(window).bind("resize", N), s.settings.auto && s.settings.autoStart && D(), s.settings.ticker && z(), s.settings.pager && P(s.settings.startSlide), s.settings.controls && A(), s.settings.touchEnabled && !s.settings.ticker && W()
                },
                p = function() {
                    var t = 0,
                        n = e();
                    if ("vertical" == s.settings.mode || s.settings.adaptiveHeight)
                        if (s.carousel) {
                            var o = 1 == s.settings.moveSlides ? s.active.index : s.active.index * y();
                            for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++) n = o + i >= s.children.length ? n.add(s.children.eq(i - 1)) : n.add(s.children.eq(o + i))
                        } else n = s.children.eq(s.active.index);
                    else n = s.children;
                    return "vertical" == s.settings.mode ? (n.each(function() {
                        t += e(this).outerHeight()
                    }), s.settings.slideMargin > 0 && (t += s.settings.slideMargin * (s.settings.minSlides - 1))) : t = Math.max.apply(Math, n.map(function() {
                        return e(this).outerHeight(!1)
                    }).get()), t
                },
                m = function() {
                    var e = "100%";
                    return s.settings.slideWidth > 0 && (e = "horizontal" == s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), e
                },
                f = function() {
                    var e = s.settings.slideWidth,
                        t = s.viewport.width();
                    return 0 == s.settings.slideWidth || s.settings.slideWidth > t && !s.carousel || "vertical" == s.settings.mode ? e = t : s.settings.maxSlides > 1 && "horizontal" == s.settings.mode && (t > s.maxThreshold || t < s.minThreshold && (e = (t - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides)), e
                },
                g = function() {
                    var e = 1;
                    if ("horizontal" == s.settings.mode && s.settings.slideWidth > 0)
                        if (s.viewport.width() < s.minThreshold) e = s.settings.minSlides;
                        else if (s.viewport.width() > s.maxThreshold) e = s.settings.maxSlides;
                    else {
                        var t = s.children.first().width();
                        e = Math.floor(s.viewport.width() / t)
                    } else "vertical" == s.settings.mode && (e = s.settings.minSlides);
                    return e
                },
                v = function() {
                    var e = 0;
                    if (s.settings.moveSlides > 0)
                        if (s.settings.infiniteLoop) e = s.children.length / y();
                        else
                            for (var t = 0, i = 0; t < s.children.length;) ++e, t = i + g(), i += s.settings.moveSlides <= g() ? s.settings.moveSlides : g();
                    else e = Math.ceil(s.children.length / g());
                    return e
                },
                y = function() {
                    return s.settings.moveSlides > 0 && s.settings.moveSlides <= g() ? s.settings.moveSlides : g()
                },
                b = function() {
                    if (s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop) {
                        if ("horizontal" == s.settings.mode) {
                            var e = s.children.last(),
                                t = e.position();
                            w(-(t.left - (s.viewport.width() - e.width())), "reset", 0)
                        } else if ("vertical" == s.settings.mode) {
                            var i = s.children.length - s.settings.minSlides,
                                t = s.children.eq(i).position();
                            w(-t.top, "reset", 0)
                        }
                    } else {
                        var t = s.children.eq(s.active.index * y()).position();
                        s.active.index == v() - 1 && (s.active.last = !0), void 0 != t && ("horizontal" == s.settings.mode ? w(-t.left, "reset", 0) : "vertical" == s.settings.mode && w(-t.top, "reset", 0))
                    }
                },
                w = function(e, t, i, n) {
                    if (s.usingCSS) {
                        var o = "vertical" == s.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                        a.css("-" + s.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == t ? (a.css(s.animProp, o), a.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                            a.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), F()
                        })) : "reset" == t ? a.css(s.animProp, o) : "ticker" == t && (a.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), a.css(s.animProp, o), a.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                            a.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), w(n.resetValue, "reset", 0), B()
                        }))
                    } else {
                        var r = {};
                        r[s.animProp] = e, "slide" == t ? a.animate(r, i, s.settings.easing, function() {
                            F()
                        }) : "reset" == t ? a.css(s.animProp, e) : "ticker" == t && a.animate(r, speed, "linear", function() {
                            w(n.resetValue, "reset", 0), B()
                        })
                    }
                },
                x = function() {
                    for (var t = "", i = v(), n = 0; i > n; n++) {
                        var o = "";
                        s.settings.buildPager && e.isFunction(s.settings.buildPager) ? (o = s.settings.buildPager(n), s.pagerEl.addClass("bx-custom-pager")) : (o = n + 1, s.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + o + "</a></div>"
                    }
                    s.pagerEl.html(t)
                },
                S = function() {
                    s.settings.pagerCustom ? s.pagerEl = e(s.settings.pagerCustom) : (s.pagerEl = e('<div class="bx-pager" />'), s.settings.pagerSelector ? e(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), x()), s.pagerEl.on("click", "a", M)
                },
                C = function() {
                    s.controls.next = e('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = e('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.bind("click", j), s.controls.prev.bind("click", _), s.settings.nextSelector && e(s.settings.nextSelector).append(s.controls.next),
                        s.settings.prevSelector && e(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = e('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl))
                },
                T = function() {
                    s.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = e('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", E), s.controls.autoEl.on("click", ".bx-stop", I), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? e(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), L(s.settings.autoStart ? "stop" : "start")
                },
                k = function() {
                    s.children.each(function() {
                        var t = e(this).find("img:first").attr("title");
                        void 0 != t && ("" + t).length && e(this).append('<div class="bx-caption"><span>' + t + "</span></div>")
                    })
                },
                j = function(e) {
                    s.settings.auto && a.stopAuto(), a.goToNextSlide(), e.preventDefault()
                },
                _ = function(e) {
                    s.settings.auto && a.stopAuto(), a.goToPrevSlide(), e.preventDefault()
                },
                E = function(e) {
                    a.startAuto(), e.preventDefault()
                },
                I = function(e) {
                    a.stopAuto(), e.preventDefault()
                },
                M = function(t) {
                    s.settings.auto && a.stopAuto();
                    var i = e(t.currentTarget),
                        n = parseInt(i.attr("data-slide-index"));
                    n != s.active.index && a.goToSlide(n), t.preventDefault()
                },
                P = function(t) {
                    var i = s.children.length;
                    return "short" == s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(t + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"), void s.pagerEl.each(function(i, n) {
                        e(n).find("a").eq(t).addClass("active")
                    }))
                },
                F = function() {
                    if (s.settings.infiniteLoop) {
                        var e = "";
                        0 == s.active.index ? e = s.children.eq(0).position() : s.active.index == v() - 1 && s.carousel ? e = s.children.eq((v() - 1) * y()).position() : s.active.index == s.children.length - 1 && (e = s.children.eq(s.children.length - 1).position()), e && ("horizontal" == s.settings.mode ? w(-e.left, "reset", 0) : "vertical" == s.settings.mode && w(-e.top, "reset", 0))
                    }
                    s.working = !1, s.settings.onSlideAfter(s.children.eq(s.active.index), s.oldIndex, s.active.index)
                },
                L = function(e) {
                    s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[e]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
                },
                A = function() {
                    1 == v() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 == s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index == v() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled")))
                },
                D = function() {
                    s.settings.autoDelay > 0 ? setTimeout(a.startAuto, s.settings.autoDelay) : a.startAuto(), s.settings.autoHover && a.hover(function() {
                        s.interval && (a.stopAuto(!0), s.autoPaused = !0)
                    }, function() {
                        s.autoPaused && (a.startAuto(!0), s.autoPaused = null)
                    })
                },
                z = function() {
                    var t = 0;
                    if ("next" == s.settings.autoDirection) a.append(s.children.clone().addClass("bx-clone"));
                    else {
                        a.prepend(s.children.clone().addClass("bx-clone"));
                        var i = s.children.first().position();
                        t = "horizontal" == s.settings.mode ? -i.left : -i.top
                    }
                    w(t, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover && !s.usingCSS && s.viewport.hover(function() {
                        a.stop()
                    }, function() {
                        var t = 0;
                        s.children.each(function() {
                            t += "horizontal" == s.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                        });
                        var i = s.settings.speed / t,
                            n = "horizontal" == s.settings.mode ? "left" : "top",
                            o = i * (t - Math.abs(parseInt(a.css(n))));
                        B(o)
                    }), B()
                },
                B = function(e) {
                    speed = e ? e : s.settings.speed;
                    var t = {
                            left: 0,
                            top: 0
                        },
                        i = {
                            left: 0,
                            top: 0
                        };
                    "next" == s.settings.autoDirection ? t = a.find(".bx-clone").first().position() : i = s.children.first().position();
                    var n = "horizontal" == s.settings.mode ? -t.left : -t.top,
                        o = "horizontal" == s.settings.mode ? -i.left : -i.top,
                        r = {
                            resetValue: o
                        };
                    w(n, "ticker", speed, r)
                },
                W = function() {
                    s.touch = {
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        }
                    }, s.viewport.bind("touchstart", O)
                },
                O = function(e) {
                    if (s.working) e.preventDefault();
                    else {
                        s.touch.originalPos = a.position();
                        var t = e.originalEvent;
                        s.touch.start.x = t.changedTouches[0].pageX, s.touch.start.y = t.changedTouches[0].pageY, s.viewport.bind("touchmove", R), s.viewport.bind("touchend", H)
                    }
                },
                R = function(e) {
                    var t = e.originalEvent,
                        i = Math.abs(t.changedTouches[0].pageX - s.touch.start.x),
                        n = Math.abs(t.changedTouches[0].pageY - s.touch.start.y);
                    if (3 * i > n && s.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * n > i && s.settings.preventDefaultSwipeY && e.preventDefault(), "fade" != s.settings.mode && s.settings.oneToOneTouch) {
                        var o = 0;
                        if ("horizontal" == s.settings.mode) {
                            var a = t.changedTouches[0].pageX - s.touch.start.x;
                            o = s.touch.originalPos.left + a
                        } else {
                            var a = t.changedTouches[0].pageY - s.touch.start.y;
                            o = s.touch.originalPos.top + a
                        }
                        w(o, "reset", 0)
                    }
                },
                H = function(e) {
                    s.viewport.unbind("touchmove", R);
                    var t = e.originalEvent,
                        i = 0;
                    if (s.touch.end.x = t.changedTouches[0].pageX, s.touch.end.y = t.changedTouches[0].pageY, "fade" == s.settings.mode) {
                        var n = Math.abs(s.touch.start.x - s.touch.end.x);
                        n >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? a.goToNextSlide() : a.goToPrevSlide(), a.stopAuto())
                    } else {
                        var n = 0;
                        "horizontal" == s.settings.mode ? (n = s.touch.end.x - s.touch.start.x, i = s.touch.originalPos.left) : (n = s.touch.end.y - s.touch.start.y, i = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 == s.active.index && n > 0 || s.active.last && 0 > n) ? w(i, "reset", 200) : Math.abs(n) >= s.settings.swipeThreshold ? (0 > n ? a.goToNextSlide() : a.goToPrevSlide(), a.stopAuto()) : w(i, "reset", 200)
                    }
                    s.viewport.unbind("touchend", H)
                },
                N = function() {
                    var t = e(window).width(),
                        i = e(window).height();
                    (r != t || l != i) && (r = t, l = i, a.redrawSlider(), s.settings.onSliderResize.call(a, s.active.index))
                };
            return a.goToSlide = function(t, i) {
                if (!s.working && s.active.index != t)
                    if (s.working = !0, s.oldIndex = s.active.index, s.active.index = 0 > t ? v() - 1 : t >= v() ? 0 : t, s.settings.onSlideBefore(s.children.eq(s.active.index), s.oldIndex, s.active.index), "next" == i ? s.settings.onSlideNext(s.children.eq(s.active.index), s.oldIndex, s.active.index) : "prev" == i && s.settings.onSlidePrev(s.children.eq(s.active.index), s.oldIndex, s.active.index), s.active.last = s.active.index >= v() - 1, s.settings.pager && P(s.active.index), s.settings.controls && A(), "fade" == s.settings.mode) s.settings.adaptiveHeight && s.viewport.height() != p() && s.viewport.animate({
                        height: p()
                    }, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({
                        zIndex: 0
                    }), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function() {
                        e(this).css("zIndex", s.settings.slideZIndex), F()
                    });
                    else {
                        s.settings.adaptiveHeight && s.viewport.height() != p() && s.viewport.animate({
                            height: p()
                        }, s.settings.adaptiveHeightSpeed);
                        var n = 0,
                            o = {
                                left: 0,
                                top: 0
                            };
                        if (!s.settings.infiniteLoop && s.carousel && s.active.last)
                            if ("horizontal" == s.settings.mode) {
                                var r = s.children.eq(s.children.length - 1);
                                o = r.position(), n = s.viewport.width() - r.outerWidth()
                            } else {
                                var l = s.children.length - s.settings.minSlides;
                                o = s.children.eq(l).position()
                            }
                        else if (s.carousel && s.active.last && "prev" == i) {
                            var d = 1 == s.settings.moveSlides ? s.settings.maxSlides - y() : (v() - 1) * y() - (s.children.length - s.settings.maxSlides),
                                r = a.children(".bx-clone").eq(d);
                            o = r.position()
                        } else if ("next" == i && 0 == s.active.index) o = a.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1;
                        else if (t >= 0) {
                            var c = t * y();
                            o = s.children.eq(c).position()
                        }
                        if ("undefined" != typeof o) {
                            var u = "horizontal" == s.settings.mode ? -(o.left - n) : -o.top;
                            w(u, "slide", s.settings.speed)
                        }
                    }
            }, a.goToNextSlide = function() {
                if (s.settings.infiniteLoop || !s.active.last) {
                    var e = parseInt(s.active.index) + 1;
                    a.goToSlide(e, "next")
                }
            }, a.goToPrevSlide = function() {
                if (s.settings.infiniteLoop || 0 != s.active.index) {
                    var e = parseInt(s.active.index) - 1;
                    a.goToSlide(e, "prev")
                }
            }, a.startAuto = function(e) {
                s.interval || (s.interval = setInterval(function() {
                    "next" == s.settings.autoDirection ? a.goToNextSlide() : a.goToPrevSlide()
                }, s.settings.pause), s.settings.autoControls && 1 != e && L("stop"))
            }, a.stopAuto = function(e) {
                s.interval && (clearInterval(s.interval), s.interval = null, s.settings.autoControls && 1 != e && L("start"))
            }, a.getCurrentSlide = function() {
                return s.active.index
            }, a.getCurrentSlideElement = function() {
                return s.children.eq(s.active.index)
            }, a.getSlideCount = function() {
                return s.children.length
            }, a.redrawSlider = function() {
                s.children.add(a.find(".bx-clone")).outerWidth(f()), s.viewport.css("height", p()), s.settings.ticker || b(), s.active.last && (s.active.index = v() - 1), s.active.index >= v() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (x(), P(s.active.index))
            }, a.destroySlider = function() {
                s.initialized && (s.initialized = !1, e(".bx-clone", this).remove(), s.children.each(function() {
                    void 0 != e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
                }), void 0 != e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"), e(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && s.pagerEl.remove(), e(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && e(window).unbind("resize", N))
            }, a.reloadSlider = function(e) {
                void 0 != e && (o = e), a.destroySlider(), d()
            }, d(), this
        }
    }(jQuery), ! function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
    }(function(e) {
        function t(t) {
            var a = t || window.event,
                r = l.call(arguments, 1),
                d = 0,
                u = 0,
                h = 0,
                p = 0,
                m = 0,
                f = 0;
            if (t = e.event.fix(a), t.type = "mousewheel", "detail" in a && (h = -1 * a.detail), "wheelDelta" in a && (h = a.wheelDelta), "wheelDeltaY" in a && (h = a.wheelDeltaY), "wheelDeltaX" in a && (u = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (u = -1 * h, h = 0), d = 0 === h ? u : h, "deltaY" in a && (h = -1 * a.deltaY, d = h), "deltaX" in a && (u = a.deltaX, 0 === h && (d = -1 * u)), 0 !== h || 0 !== u) {
                if (1 === a.deltaMode) {
                    var g = e.data(this, "mousewheel-line-height");
                    d *= g, h *= g, u *= g
                } else if (2 === a.deltaMode) {
                    var v = e.data(this, "mousewheel-page-height");
                    d *= v, h *= v, u *= v
                }
                if (p = Math.max(Math.abs(h), Math.abs(u)), (!s || s > p) && (s = p, n(a, p) && (s /= 40)), n(a, p) && (d /= 40, u /= 40, h /= 40), d = Math[d >= 1 ? "floor" : "ceil"](d / s), u = Math[u >= 1 ? "floor" : "ceil"](u / s), h = Math[h >= 1 ? "floor" : "ceil"](h / s), c.settings.normalizeOffset && this.getBoundingClientRect) {
                    var y = this.getBoundingClientRect();
                    m = t.clientX - y.left, f = t.clientY - y.top
                }
                return t.deltaX = u, t.deltaY = h, t.deltaFactor = s, t.offsetX = m, t.offsetY = f, t.deltaMode = 0, r.unshift(t, d, u, h), o && clearTimeout(o), o = setTimeout(i, 200), (e.event.dispatch || e.event.handle).apply(this, r)
            }
        }

        function i() {
            s = null
        }

        function n(e, t) {
            return c.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0
        }
        var o, s, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            l = Array.prototype.slice;
        if (e.event.fixHooks)
            for (var d = a.length; d;) e.event.fixHooks[a[--d]] = e.event.mouseHooks;
        var c = e.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var i = r.length; i;) this.addEventListener(r[--i], t, !1);
                else this.onmousewheel = t;
                e.data(this, "mousewheel-line-height", c.getLineHeight(this)), e.data(this, "mousewheel-page-height", c.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var i = r.length; i;) this.removeEventListener(r[--i], t, !1);
                else this.onmousewheel = null;
                e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(t) {
                var i = e(t),
                    n = i["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
            },
            getPageHeight: function(t) {
                return e(t).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        e.fn.extend({
            mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }
        })
    }), ! function(e) {
        "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
    }(function(e) {
        ! function(t) {
            var i = "function" == typeof define && define.amd,
                n = "undefined" != typeof module && module.exports,
                o = "https:" == document.location.protocol ? "https:" : "http:",
                s = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
            i || (n ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + o + "//" + s + "%3E%3C/script%3E"))), t()
        }(function() {
            var t, i = "mCustomScrollbar",
                n = "mCS",
                o = ".mCustomScrollbar",
                s = {
                    setTop: 0,
                    setLeft: 0,
                    axis: "y",
                    scrollbarPosition: "inside",
                    scrollInertia: 950,
                    autoDraggerLength: !0,
                    alwaysShowScrollbar: 0,
                    snapOffset: 0,
                    mouseWheel: {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        deltaFactor: "auto",
                        disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                    },
                    scrollButtons: {
                        scrollType: "stepless",
                        scrollAmount: "auto"
                    },
                    keyboard: {
                        enable: !0,
                        scrollType: "stepless",
                        scrollAmount: "auto"
                    },
                    contentTouchScroll: 25,
                    advanced: {
                        autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                        updateOnContentResize: !0,
                        updateOnImageLoad: "auto",
                        autoUpdateTimeout: 60
                    },
                    theme: "light",
                    callbacks: {
                        onTotalScrollOffset: 0,
                        onTotalScrollBackOffset: 0,
                        alwaysTriggerOffsets: !0
                    }
                },
                a = 0,
                r = {},
                l = window.attachEvent && !window.addEventListener ? 1 : 0,
                d = !1,
                c = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
                u = {
                    init: function(t) {
                        var t = e.extend(!0, {}, s, t),
                            i = h.call(this);
                        if (t.live) {
                            var l = t.liveSelector || this.selector || o,
                                d = e(l);
                            if ("off" === t.live) return void m(l);
                            r[l] = setTimeout(function() {
                                d.mCustomScrollbar(t), "once" === t.live && d.length && m(l)
                            }, 500)
                        } else m(l);
                        return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : f(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                            enable: !0,
                            scrollAmount: "auto",
                            axis: "y",
                            preventDefault: !1,
                            deltaFactor: "auto",
                            normalizeDelta: !1,
                            invert: !1
                        }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), p(t), e(i).each(function() {
                            var i = e(this);
                            if (!i.data(n)) {
                                i.data(n, {
                                    idx: ++a,
                                    opt: t,
                                    scrollRatio: {
                                        y: null,
                                        x: null
                                    },
                                    overflowed: null,
                                    contentReset: {
                                        y: null,
                                        x: null
                                    },
                                    bindEvents: !1,
                                    tweenRunning: !1,
                                    sequential: {},
                                    langDir: i.css("direction"),
                                    cbOffsets: null,
                                    trigger: null,
                                    poll: {
                                        size: {
                                            o: 0,
                                            n: 0
                                        },
                                        img: {
                                            o: 0,
                                            n: 0
                                        },
                                        change: {
                                            o: 0,
                                            n: 0
                                        }
                                    }
                                });
                                var o = i.data(n),
                                    s = o.opt,
                                    r = i.data("mcs-axis"),
                                    l = i.data("mcs-scrollbar-position"),
                                    d = i.data("mcs-theme");
                                r && (s.axis = r), l && (s.scrollbarPosition = l), d && (s.theme = d, p(s)), v.call(this), o && s.callbacks.onCreate && "function" == typeof s.callbacks.onCreate && s.callbacks.onCreate.call(this), e("#mCSB_" + o.idx + "_container img:not(." + c[2] + ")").addClass(c[2]), u.update.call(null, i)
                            }
                        })
                    },
                    update: function(t, i) {
                        var o = t || h.call(this);
                        return e(o).each(function() {
                            var t = e(this);
                            if (t.data(n)) {
                                var o = t.data(n),
                                    s = o.opt,
                                    a = e("#mCSB_" + o.idx + "_container"),
                                    r = e("#mCSB_" + o.idx),
                                    l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                                if (!a.length) return;
                                o.tweenRunning && q(t), i && o && s.callbacks.onBeforeUpdate && "function" == typeof s.callbacks.onBeforeUpdate && s.callbacks.onBeforeUpdate.call(this), t.hasClass(c[3]) && t.removeClass(c[3]), t.hasClass(c[4]) && t.removeClass(c[4]), r.height() !== t.height() && r.css("max-height", t.height()), b.call(this), "y" === s.axis || s.advanced.autoExpandHorizontalScroll || a.css("width", y(a)), o.overflowed = T.call(this), E.call(this), s.autoDraggerLength && x.call(this), S.call(this), j.call(this);
                                var d = [Math.abs(a[0].offsetTop), Math.abs(a[0].offsetLeft)];
                                "x" !== s.axis && (o.overflowed[0] ? l[0].height() > l[0].parent().height() ? k.call(this) : (Y(t, d[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }), o.contentReset.y = null) : (k.call(this), "y" === s.axis ? _.call(this) : "yx" === s.axis && o.overflowed[1] && Y(t, d[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }))), "y" !== s.axis && (o.overflowed[1] ? l[1].width() > l[1].parent().width() ? k.call(this) : (Y(t, d[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }), o.contentReset.x = null) : (k.call(this), "x" === s.axis ? _.call(this) : "yx" === s.axis && o.overflowed[0] && Y(t, d[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }))), i && o && (2 === i && s.callbacks.onImageLoad && "function" == typeof s.callbacks.onImageLoad ? s.callbacks.onImageLoad.call(this) : 3 === i && s.callbacks.onSelectorChange && "function" == typeof s.callbacks.onSelectorChange ? s.callbacks.onSelectorChange.call(this) : s.callbacks.onUpdate && "function" == typeof s.callbacks.onUpdate && s.callbacks.onUpdate.call(this)), V.call(this)
                            }
                        })
                    },
                    scrollTo: function(t, i) {
                        if ("undefined" != typeof t && null != t) {
                            var o = h.call(this);
                            return e(o).each(function() {
                                var o = e(this);
                                if (o.data(n)) {
                                    var s = o.data(n),
                                        a = s.opt,
                                        r = {
                                            trigger: "external",
                                            scrollInertia: a.scrollInertia,
                                            scrollEasing: "mcsEaseInOut",
                                            moveDragger: !1,
                                            timeout: 60,
                                            callbacks: !0,
                                            onStart: !0,
                                            onUpdate: !0,
                                            onComplete: !0
                                        },
                                        l = e.extend(!0, {}, r, i),
                                        d = N.call(this, t),
                                        c = l.scrollInertia > 0 && l.scrollInertia < 17 ? 17 : l.scrollInertia;
                                    d[0] = $.call(this, d[0], "y"), d[1] = $.call(this, d[1], "x"), l.moveDragger && (d[0] *= s.scrollRatio.y, d[1] *= s.scrollRatio.x), l.dur = c, setTimeout(function() {
                                        null !== d[0] && "undefined" != typeof d[0] && "x" !== a.axis && s.overflowed[0] && (l.dir = "y", l.overwrite = "all", Y(o, d[0].toString(), l)), null !== d[1] && "undefined" != typeof d[1] && "y" !== a.axis && s.overflowed[1] && (l.dir = "x", l.overwrite = "none", Y(o, d[1].toString(), l))
                                    }, l.timeout)
                                }
                            })
                        }
                    },
                    stop: function() {
                        var t = h.call(this);
                        return e(t).each(function() {
                            var t = e(this);
                            t.data(n) && q(t)
                        })
                    },
                    disable: function(t) {
                        var i = h.call(this);
                        return e(i).each(function() {
                            var i = e(this);
                            i.data(n) && (i.data(n), V.call(this, "remove"), _.call(this), t && k.call(this), E.call(this, !0), i.addClass(c[3]))
                        })
                    },
                    destroy: function() {
                        var t = h.call(this);
                        return e(t).each(function() {
                            var o = e(this);
                            if (o.data(n)) {
                                var s = o.data(n),
                                    a = s.opt,
                                    r = e("#mCSB_" + s.idx),
                                    l = e("#mCSB_" + s.idx + "_container"),
                                    d = e(".mCSB_" + s.idx + "_scrollbar");
                                a.live && m(a.liveSelector || e(t).selector), V.call(this, "remove"), _.call(this), k.call(this), o.removeData(n), G(this, "mcs"), d.remove(), l.find("img." + c[2]).removeClass(c[2]), r.replaceWith(l.contents()), o.removeClass(i + " _" + n + "_" + s.idx + " " + c[6] + " " + c[7] + " " + c[5] + " " + c[3]).addClass(c[4])
                            }
                        })
                    }
                },
                h = function() {
                    return "object" != typeof e(this) || e(this).length < 1 ? o : this
                },
                p = function(t) {
                    var i = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                        n = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                        o = ["minimal", "minimal-dark"],
                        s = ["minimal", "minimal-dark"],
                        a = ["minimal", "minimal-dark"];
                    t.autoDraggerLength = e.inArray(t.theme, i) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, n) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, o) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, s) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, a) > -1 ? "outside" : t.scrollbarPosition
                },
                m = function(e) {
                    r[e] && (clearTimeout(r[e]), G(r, e))
                },
                f = function(e) {
                    return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
                },
                g = function(e) {
                    return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
                },
                v = function() {
                    var t = e(this),
                        o = t.data(n),
                        s = o.opt,
                        a = s.autoExpandScrollbar ? " " + c[1] + "_expand" : "",
                        r = ["<div id='mCSB_" + o.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_vertical" + a + "'><div class='" + c[12] + "'><div id='mCSB_" + o.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + o.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_horizontal" + a + "'><div class='" + c[12] + "'><div id='mCSB_" + o.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                        l = "yx" === s.axis ? "mCSB_vertical_horizontal" : "x" === s.axis ? "mCSB_horizontal" : "mCSB_vertical",
                        d = "yx" === s.axis ? r[0] + r[1] : "x" === s.axis ? r[1] : r[0],
                        u = "yx" === s.axis ? "<div id='mCSB_" + o.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                        h = s.autoHideScrollbar ? " " + c[6] : "",
                        p = "x" !== s.axis && "rtl" === o.langDir ? " " + c[7] : "";
                    s.setWidth && t.css("width", s.setWidth), s.setHeight && t.css("height", s.setHeight), s.setLeft = "y" !== s.axis && "rtl" === o.langDir ? "989999px" : s.setLeft, t.addClass(i + " _" + n + "_" + o.idx + h + p).wrapInner("<div id='mCSB_" + o.idx + "' class='mCustomScrollBox mCS-" + s.theme + " " + l + "'><div id='mCSB_" + o.idx + "_container' class='mCSB_container' style='position:relative; top:" + s.setTop + "; left:" + s.setLeft + ";' dir=" + o.langDir + " /></div>");
                    var m = e("#mCSB_" + o.idx),
                        f = e("#mCSB_" + o.idx + "_container");
                    "y" === s.axis || s.advanced.autoExpandHorizontalScroll || f.css("width", y(f)), "outside" === s.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(d)) : (m.addClass("mCSB_inside").append(d), f.wrap(u)), w.call(this);
                    var g = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                    g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
                },
                y = function(t) {
                    var i = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
                            return e(this).outerWidth(!0)
                        }).get())],
                        n = t.parent().width();
                    return i[0] > n ? i[0] : i[1] > n ? i[1] : "100%"
                },
                b = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = i.opt,
                        s = e("#mCSB_" + i.idx + "_container");
                    if (o.advanced.autoExpandHorizontalScroll && "y" !== o.axis) {
                        s.css({
                            width: "auto",
                            "min-width": 0,
                            "overflow-x": "scroll"
                        });
                        var a = Math.ceil(s[0].scrollWidth);
                        3 === o.advanced.autoExpandHorizontalScroll || 2 !== o.advanced.autoExpandHorizontalScroll && a > s.parent().width() ? s.css({
                            width: a,
                            "min-width": "100%",
                            "overflow-x": "inherit"
                        }) : s.css({
                            "overflow-x": "inherit",
                            position: "absolute"
                        }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                            width: Math.ceil(s[0].getBoundingClientRect().right + .4) - Math.floor(s[0].getBoundingClientRect().left),
                            "min-width": "100%",
                            position: "relative"
                        }).unwrap()
                    }
                },
                w = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = i.opt,
                        s = e(".mCSB_" + i.idx + "_scrollbar:first"),
                        a = ee(o.scrollButtons.tabindex) ? "tabindex='" + o.scrollButtons.tabindex + "'" : "",
                        r = ["<a href='#' class='" + c[13] + "' oncontextmenu='return false;' " + a + " />", "<a href='#' class='" + c[14] + "' oncontextmenu='return false;' " + a + " />", "<a href='#' class='" + c[15] + "' oncontextmenu='return false;' " + a + " />", "<a href='#' class='" + c[16] + "' oncontextmenu='return false;' " + a + " />"],
                        l = ["x" === o.axis ? r[2] : r[0], "x" === o.axis ? r[3] : r[1], r[2], r[3]];
                    o.scrollButtons.enable && s.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
                },
                x = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = e("#mCSB_" + i.idx),
                        s = e("#mCSB_" + i.idx + "_container"),
                        a = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")],
                        r = [o.height() / s.outerHeight(!1), o.width() / s.outerWidth(!1)],
                        d = [parseInt(a[0].css("min-height")), Math.round(r[0] * a[0].parent().height()), parseInt(a[1].css("min-width")), Math.round(r[1] * a[1].parent().width())],
                        c = l && d[1] < d[0] ? d[0] : d[1],
                        u = l && d[3] < d[2] ? d[2] : d[3];
                    a[0].css({
                        height: c,
                        "max-height": a[0].parent().height() - 10
                    }).find(".mCSB_dragger_bar").css({
                        "line-height": d[0] + "px"
                    }), a[1].css({
                        width: u,
                        "max-width": a[1].parent().width() - 10
                    })
                },
                S = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = e("#mCSB_" + i.idx),
                        s = e("#mCSB_" + i.idx + "_container"),
                        a = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")],
                        r = [s.outerHeight(!1) - o.height(), s.outerWidth(!1) - o.width()],
                        l = [r[0] / (a[0].parent().height() - a[0].height()), r[1] / (a[1].parent().width() - a[1].width())];
                    i.scrollRatio = {
                        y: l[0],
                        x: l[1]
                    }
                },
                C = function(e, t, i) {
                    var n = i ? c[0] + "_expanded" : "",
                        o = e.closest(".mCSB_scrollTools");
                    "active" === t ? (e.toggleClass(c[0] + " " + n), o.toggleClass(c[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(c[0]), o.removeClass(c[1])) : (e.addClass(c[0]), o.addClass(c[1])))
                },
                T = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = e("#mCSB_" + i.idx),
                        s = e("#mCSB_" + i.idx + "_container"),
                        a = null == i.overflowed ? s.height() : s.outerHeight(!1),
                        r = null == i.overflowed ? s.width() : s.outerWidth(!1),
                        l = s[0].scrollHeight,
                        d = s[0].scrollWidth;
                    return l > a && (a = l), d > r && (r = d), [a > o.height(), r > o.width()]
                },
                k = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = i.opt,
                        s = e("#mCSB_" + i.idx),
                        a = e("#mCSB_" + i.idx + "_container"),
                        r = [e("#mCSB_" + i.idx + "_dragger_vertical"), e("#mCSB_" + i.idx + "_dragger_horizontal")];
                    if (q(t), ("x" !== o.axis && !i.overflowed[0] || "y" === o.axis && i.overflowed[0]) && (r[0].add(a).css("top", 0), Y(t, "_resetY")), "y" !== o.axis && !i.overflowed[1] || "x" === o.axis && i.overflowed[1]) {
                        var l = dx = 0;
                        "rtl" === i.langDir && (l = s.width() - a.outerWidth(!1), dx = Math.abs(l / i.scrollRatio.x)), a.css("left", l), r[1].css("left", dx), Y(t, "_resetX")
                    }
                },
                j = function() {
                    function t() {
                        a = setTimeout(function() {
                            e.event.special.mousewheel ? (clearTimeout(a), L.call(i[0])) : t()
                        }, 100)
                    }
                    var i = e(this),
                        o = i.data(n),
                        s = o.opt;
                    if (!o.bindEvents) {
                        if (M.call(this), s.contentTouchScroll && P.call(this), F.call(this), s.mouseWheel.enable) {
                            var a;
                            t()
                        }
                        z.call(this), W.call(this), s.advanced.autoScrollOnFocus && B.call(this), s.scrollButtons.enable && O.call(this), s.keyboard.enable && R.call(this), o.bindEvents = !0
                    }
                },
                _ = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = i.opt,
                        s = n + "_" + i.idx,
                        a = ".mCSB_" + i.idx + "_scrollbar",
                        r = e("#mCSB_" + i.idx + ",#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper," + a + " ." + c[12] + ",#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal," + a + ">a"),
                        l = e("#mCSB_" + i.idx + "_container");
                    o.advanced.releaseDraggableSelectors && r.add(e(o.advanced.releaseDraggableSelectors)), i.bindEvents && (e(document).unbind("." + s), r.each(function() {
                        e(this).unbind("." + s)
                    }), clearTimeout(t[0]._focusTimeout), G(t[0], "_focusTimeout"), clearTimeout(i.sequential.step), G(i.sequential, "step"), clearTimeout(l[0].onCompleteTimeout), G(l[0], "onCompleteTimeout"), i.bindEvents = !1)
                },
                E = function(t) {
                    var i = e(this),
                        o = i.data(n),
                        s = o.opt,
                        a = e("#mCSB_" + o.idx + "_container_wrapper"),
                        r = a.length ? a : e("#mCSB_" + o.idx + "_container"),
                        l = [e("#mCSB_" + o.idx + "_scrollbar_vertical"), e("#mCSB_" + o.idx + "_scrollbar_horizontal")],
                        d = [l[0].find(".mCSB_dragger"), l[1].find(".mCSB_dragger")];
                    "x" !== s.axis && (o.overflowed[0] && !t ? (l[0].add(d[0]).add(l[0].children("a")).css("display", "block"), r.removeClass(c[8] + " " + c[10])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && d[0].css("display", "none"), r.removeClass(c[10])) : (l[0].css("display", "none"), r.addClass(c[10])), r.addClass(c[8]))), "y" !== s.axis && (o.overflowed[1] && !t ? (l[1].add(d[1]).add(l[1].children("a")).css("display", "block"), r.removeClass(c[9] + " " + c[11])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && d[1].css("display", "none"), r.removeClass(c[11])) : (l[1].css("display", "none"), r.addClass(c[11])), r.addClass(c[9]))), o.overflowed[0] || o.overflowed[1] ? i.removeClass(c[5]) : i.addClass(c[5])
                },
                I = function(e) {
                    var t = e.type;
                    switch (t) {
                        case "pointerdown":
                        case "MSPointerDown":
                        case "pointermove":
                        case "MSPointerMove":
                        case "pointerup":
                        case "MSPointerUp":
                            return e.target.ownerDocument !== document ? [e.originalEvent.screenY, e.originalEvent.screenX, !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
                        case "touchstart":
                        case "touchmove":
                        case "touchend":
                            var i = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                                n = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                            return e.target.ownerDocument !== document ? [i.screenY, i.screenX, n > 1] : [i.pageY, i.pageX, n > 1];
                        default:
                            return [e.pageY, e.pageX, !1]
                    }
                },
                M = function() {
                    function t(e) {
                        var t = m.find("iframe");
                        if (t.length) {
                            var i = e ? "auto" : "none";
                            t.css("pointer-events", i)
                        }
                    }

                    function i(e, t, i, n) {
                        if (m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0, o.attr("id") === p[1]) var s = "x",
                            a = (o[0].offsetLeft - t + n) * c.scrollRatio.x;
                        else var s = "y",
                            a = (o[0].offsetTop - e + i) * c.scrollRatio.y;
                        Y(r, a.toString(), {
                            dir: s,
                            drag: !0
                        })
                    }
                    var o, s, a, r = e(this),
                        c = r.data(n),
                        u = c.opt,
                        h = n + "_" + c.idx,
                        p = ["mCSB_" + c.idx + "_dragger_vertical", "mCSB_" + c.idx + "_dragger_horizontal"],
                        m = e("#mCSB_" + c.idx + "_container"),
                        f = e("#" + p[0] + ",#" + p[1]),
                        g = u.advanced.releaseDraggableSelectors ? f.add(e(u.advanced.releaseDraggableSelectors)) : f;
                    f.bind("mousedown." + h + " touchstart." + h + " pointerdown." + h + " MSPointerDown." + h, function(i) {
                        if (i.stopImmediatePropagation(), i.preventDefault(), K(i)) {
                            d = !0, l && (document.onselectstart = function() {
                                return !1
                            }), t(!1), q(r), o = e(this);
                            var n = o.offset(),
                                c = I(i)[0] - n.top,
                                h = I(i)[1] - n.left,
                                p = o.height() + n.top,
                                m = o.width() + n.left;
                            p > c && c > 0 && m > h && h > 0 && (s = c, a = h), C(o, "active", u.autoExpandScrollbar)
                        }
                    }).bind("touchmove." + h, function(e) {
                        e.stopImmediatePropagation(), e.preventDefault();
                        var t = o.offset(),
                            n = I(e)[0] - t.top,
                            r = I(e)[1] - t.left;
                        i(s, a, n, r)
                    }), e(document).bind("mousemove." + h + " pointermove." + h + " MSPointerMove." + h, function(e) {
                        if (o) {
                            var t = o.offset(),
                                n = I(e)[0] - t.top,
                                r = I(e)[1] - t.left;
                            if (s === n) return;
                            i(s, a, n, r)
                        }
                    }).add(g).bind("mouseup." + h + " touchend." + h + " pointerup." + h + " MSPointerUp." + h, function(e) {
                        o && (C(o, "active", u.autoExpandScrollbar), o = null), d = !1, l && (document.onselectstart = null), t(!0)
                    })
                },
                P = function() {
                    function i(e) {
                        if (!J(e) || d || I(e)[2]) return void(t = 0);
                        t = 1, S = 0, C = 0, c = 1, T.removeClass("mCS_touch_action");
                        var i = M.offset();
                        u = I(e)[0] - i.top, h = I(e)[1] - i.left, B = [I(e)[0], I(e)[1]]
                    }

                    function o(e) {
                        if (J(e) && !d && !I(e)[2] && (e.stopImmediatePropagation(), (!C || S) && c)) {
                            g = Q();
                            var t = E.offset(),
                                i = I(e)[0] - t.top,
                                n = I(e)[1] - t.left,
                                o = "mcsLinearOut";
                            if (F.push(i), L.push(n), B[2] = Math.abs(I(e)[0] - B[0]), B[3] = Math.abs(I(e)[1] - B[1]), k.overflowed[0]) var s = P[0].parent().height() - P[0].height(),
                                a = u - i > 0 && i - u > -(s * k.scrollRatio.y) && (2 * B[3] < B[2] || "yx" === j.axis);
                            if (k.overflowed[1]) var r = P[1].parent().width() - P[1].width(),
                                p = h - n > 0 && n - h > -(r * k.scrollRatio.x) && (2 * B[2] < B[3] || "yx" === j.axis);
                            a || p ? (R || e.preventDefault(), S = 1) : (C = 1, T.addClass("mCS_touch_action")), R && e.preventDefault(), w = "yx" === j.axis ? [u - i, h - n] : "x" === j.axis ? [null, h - n] : [u - i, null], M[0].idleTimer = 250, k.overflowed[0] && l(w[0], D, o, "y", "all", !0), k.overflowed[1] && l(w[1], D, o, "x", z, !0)
                        }
                    }

                    function s(e) {
                        if (!J(e) || d || I(e)[2]) return void(t = 0);
                        t = 1, e.stopImmediatePropagation(), q(T), f = Q();
                        var i = E.offset();
                        p = I(e)[0] - i.top, m = I(e)[1] - i.left, F = [], L = []
                    }

                    function a(e) {
                        if (J(e) && !d && !I(e)[2]) {
                            c = 0, e.stopImmediatePropagation(), S = 0, C = 0, v = Q();
                            var t = E.offset(),
                                i = I(e)[0] - t.top,
                                n = I(e)[1] - t.left;
                            if (!(v - g > 30)) {
                                b = 1e3 / (v - f);
                                var o = "mcsEaseOut",
                                    s = 2.5 > b,
                                    a = s ? [F[F.length - 2], L[L.length - 2]] : [0, 0];
                                y = s ? [i - a[0], n - a[1]] : [i - p, n - m];
                                var u = [Math.abs(y[0]), Math.abs(y[1])];
                                b = s ? [Math.abs(y[0] / 4), Math.abs(y[1] / 4)] : [b, b];
                                var h = [Math.abs(M[0].offsetTop) - y[0] * r(u[0] / b[0], b[0]), Math.abs(M[0].offsetLeft) - y[1] * r(u[1] / b[1], b[1])];
                                w = "yx" === j.axis ? [h[0], h[1]] : "x" === j.axis ? [null, h[1]] : [h[0], null], x = [4 * u[0] + j.scrollInertia, 4 * u[1] + j.scrollInertia];
                                var T = parseInt(j.contentTouchScroll) || 0;
                                w[0] = u[0] > T ? w[0] : 0, w[1] = u[1] > T ? w[1] : 0, k.overflowed[0] && l(w[0], x[0], o, "y", z, !1), k.overflowed[1] && l(w[1], x[1], o, "x", z, !1)
                            }
                        }
                    }

                    function r(e, t) {
                        var i = [1.5 * t, 2 * t, t / 1.5, t / 2];
                        return e > 90 ? t > 4 ? i[0] : i[3] : e > 60 ? t > 3 ? i[3] : i[2] : e > 30 ? t > 8 ? i[1] : t > 6 ? i[0] : t > 4 ? t : i[2] : t > 8 ? t : i[3]
                    }

                    function l(e, t, i, n, o, s) {
                        e && Y(T, e.toString(), {
                            dur: t,
                            scrollEasing: i,
                            dir: n,
                            overwrite: o,
                            drag: s
                        })
                    }
                    var c, u, h, p, m, f, g, v, y, b, w, x, S, C, T = e(this),
                        k = T.data(n),
                        j = k.opt,
                        _ = n + "_" + k.idx,
                        E = e("#mCSB_" + k.idx),
                        M = e("#mCSB_" + k.idx + "_container"),
                        P = [e("#mCSB_" + k.idx + "_dragger_vertical"), e("#mCSB_" + k.idx + "_dragger_horizontal")],
                        F = [],
                        L = [],
                        D = 0,
                        z = "yx" === j.axis ? "none" : "all",
                        B = [],
                        W = M.find("iframe"),
                        O = ["touchstart." + _ + " pointerdown." + _ + " MSPointerDown." + _, "touchmove." + _ + " pointermove." + _ + " MSPointerMove." + _, "touchend." + _ + " pointerup." + _ + " MSPointerUp." + _],
                        R = void 0 !== document.body.style.touchAction;
                    M.bind(O[0], function(e) {
                        i(e)
                    }).bind(O[1], function(e) {
                        o(e)
                    }), E.bind(O[0], function(e) {
                        s(e)
                    }).bind(O[2], function(e) {
                        a(e)
                    }), W.length && W.each(function() {
                        e(this).load(function() {
                            A(this) && e(this.contentDocument || this.contentWindow.document).bind(O[0], function(e) {
                                i(e), s(e)
                            }).bind(O[1], function(e) {
                                o(e)
                            }).bind(O[2], function(e) {
                                a(e)
                            })
                        })
                    })
                },
                F = function() {
                    function i() {
                        return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                    }

                    function o(e, t, i) {
                        c.type = i && s ? "stepped" : "stepless", c.scrollAmount = 10, H(a, e, t, "mcsLinearOut", i ? 60 : null)
                    }
                    var s, a = e(this),
                        r = a.data(n),
                        l = r.opt,
                        c = r.sequential,
                        u = n + "_" + r.idx,
                        h = e("#mCSB_" + r.idx + "_container"),
                        p = h.parent();
                    h.bind("mousedown." + u, function(e) {
                        t || s || (s = 1, d = !0)
                    }).add(document).bind("mousemove." + u, function(e) {
                        if (!t && s && i()) {
                            var n = h.offset(),
                                a = I(e)[0] - n.top + h[0].offsetTop,
                                d = I(e)[1] - n.left + h[0].offsetLeft;
                            a > 0 && a < p.height() && d > 0 && d < p.width() ? c.step && o("off", null, "stepped") : ("x" !== l.axis && r.overflowed[0] && (0 > a ? o("on", 38) : a > p.height() && o("on", 40)), "y" !== l.axis && r.overflowed[1] && (0 > d ? o("on", 37) : d > p.width() && o("on", 39)))
                        }
                    }).bind("mouseup." + u + " dragend." + u, function(e) {
                        t || (s && (s = 0, o("off", null)), d = !1)
                    })
                },
                L = function() {
                    function t(t, n) {
                        if (q(i), !D(i, t.target)) {
                            var a = "auto" !== s.mouseWheel.deltaFactor ? parseInt(s.mouseWheel.deltaFactor) : l && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100;
                            if ("x" === s.axis || "x" === s.mouseWheel.axis) var c = "x",
                                u = [Math.round(a * o.scrollRatio.x), parseInt(s.mouseWheel.scrollAmount)],
                                h = "auto" !== s.mouseWheel.scrollAmount ? u[1] : u[0] >= r.width() ? .9 * r.width() : u[0],
                                p = Math.abs(e("#mCSB_" + o.idx + "_container")[0].offsetLeft),
                                m = d[1][0].offsetLeft,
                                f = d[1].parent().width() - d[1].width(),
                                g = t.deltaX || t.deltaY || n;
                            else var c = "y",
                                u = [Math.round(a * o.scrollRatio.y), parseInt(s.mouseWheel.scrollAmount)],
                                h = "auto" !== s.mouseWheel.scrollAmount ? u[1] : u[0] >= r.height() ? .9 * r.height() : u[0],
                                p = Math.abs(e("#mCSB_" + o.idx + "_container")[0].offsetTop),
                                m = d[0][0].offsetTop,
                                f = d[0].parent().height() - d[0].height(),
                                g = t.deltaY || n;
                            "y" === c && !o.overflowed[0] || "x" === c && !o.overflowed[1] || ((s.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (g = -g), s.mouseWheel.normalizeDelta && (g = 0 > g ? -1 : 1), (g > 0 && 0 !== m || 0 > g && m !== f || s.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), Y(i, (p - g * h).toString(), {
                                dir: c
                            }))
                        }
                    }
                    if (e(this).data(n)) {
                        var i = e(this),
                            o = i.data(n),
                            s = o.opt,
                            a = n + "_" + o.idx,
                            r = e("#mCSB_" + o.idx),
                            d = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                            c = e("#mCSB_" + o.idx + "_container").find("iframe");
                        c.length && c.each(function() {
                            e(this).load(function() {
                                A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + a, function(e, i) {
                                    t(e, i)
                                })
                            })
                        }), r.bind("mousewheel." + a, function(e, i) {
                            t(e, i)
                        })
                    }
                },
                A = function(e) {
                    var t = null;
                    try {
                        var i = e.contentDocument || e.contentWindow.document;
                        t = i.body.innerHTML
                    } catch (n) {}
                    return null !== t
                },
                D = function(t, i) {
                    var o = i.nodeName.toLowerCase(),
                        s = t.data(n).opt.mouseWheel.disableOver,
                        a = ["select", "textarea"];
                    return e.inArray(o, s) > -1 && !(e.inArray(o, a) > -1 && !e(i).is(":focus"))
                },
                z = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = n + "_" + i.idx,
                        s = e("#mCSB_" + i.idx + "_container"),
                        a = s.parent(),
                        r = e(".mCSB_" + i.idx + "_scrollbar ." + c[12]);
                    r.bind("touchstart." + o + " pointerdown." + o + " MSPointerDown." + o, function(e) {
                        d = !0
                    }).bind("touchend." + o + " pointerup." + o + " MSPointerUp." + o, function(e) {
                        d = !1
                    }).bind("click." + o, function(n) {
                        if (e(n.target).hasClass(c[12]) || e(n.target).hasClass("mCSB_draggerRail")) {
                            q(t);
                            var o = e(this),
                                r = o.find(".mCSB_dragger");
                            if (o.parent(".mCSB_scrollTools_horizontal").length > 0) {
                                if (!i.overflowed[1]) return;
                                var l = "x",
                                    d = n.pageX > r.offset().left ? -1 : 1,
                                    u = Math.abs(s[0].offsetLeft) - .9 * d * a.width()
                            } else {
                                if (!i.overflowed[0]) return;
                                var l = "y",
                                    d = n.pageY > r.offset().top ? -1 : 1,
                                    u = Math.abs(s[0].offsetTop) - .9 * d * a.height()
                            }
                            Y(t, u.toString(), {
                                dir: l,
                                scrollEasing: "mcsEaseInOut"
                            })
                        }
                    })
                },
                B = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = i.opt,
                        s = n + "_" + i.idx,
                        a = e("#mCSB_" + i.idx + "_container"),
                        r = a.parent();
                    a.bind("focusin." + s, function(i) {
                        var n = e(document.activeElement),
                            s = a.find(".mCustomScrollBox").length,
                            l = 0;
                        n.is(o.advanced.autoScrollOnFocus) && (q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = s ? (l + 17) * s : 0, t[0]._focusTimeout = setTimeout(function() {
                            var e = [te(n)[0], te(n)[1]],
                                i = [a[0].offsetTop, a[0].offsetLeft],
                                s = [i[0] + e[0] >= 0 && i[0] + e[0] < r.height() - n.outerHeight(!1), i[1] + e[1] >= 0 && i[0] + e[1] < r.width() - n.outerWidth(!1)],
                                d = "yx" !== o.axis || s[0] || s[1] ? "all" : "none";
                            "x" === o.axis || s[0] || Y(t, e[0].toString(), {
                                dir: "y",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: d,
                                dur: l
                            }), "y" === o.axis || s[1] || Y(t, e[1].toString(), {
                                dir: "x",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: d,
                                dur: l
                            })
                        }, t[0]._focusTimer))
                    })
                },
                W = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = n + "_" + i.idx,
                        s = e("#mCSB_" + i.idx + "_container").parent();
                    s.bind("scroll." + o, function(t) {
                        (0 !== s.scrollTop() || 0 !== s.scrollLeft()) && e(".mCSB_" + i.idx + "_scrollbar").css("visibility", "hidden")
                    })
                },
                O = function() {
                    var t = e(this),
                        i = t.data(n),
                        o = i.opt,
                        s = i.sequential,
                        a = n + "_" + i.idx,
                        r = ".mCSB_" + i.idx + "_scrollbar",
                        l = e(r + ">a");
                    l.bind("mousedown." + a + " touchstart." + a + " pointerdown." + a + " MSPointerDown." + a + " mouseup." + a + " touchend." + a + " pointerup." + a + " MSPointerUp." + a + " mouseout." + a + " pointerout." + a + " MSPointerOut." + a + " click." + a, function(n) {
                        function a(e, i) {
                            s.scrollAmount = o.snapAmount || o.scrollButtons.scrollAmount, H(t, e, i)
                        }
                        if (n.preventDefault(), K(n)) {
                            var r = e(this).attr("class");
                            switch (s.type = o.scrollButtons.scrollType, n.type) {
                                case "mousedown":
                                case "touchstart":
                                case "pointerdown":
                                case "MSPointerDown":
                                    if ("stepped" === s.type) return;
                                    d = !0, i.tweenRunning = !1, a("on", r);
                                    break;
                                case "mouseup":
                                case "touchend":
                                case "pointerup":
                                case "MSPointerUp":
                                case "mouseout":
                                case "pointerout":
                                case "MSPointerOut":
                                    if ("stepped" === s.type) return;
                                    d = !1, s.dir && a("off", r);
                                    break;
                                case "click":
                                    if ("stepped" !== s.type || i.tweenRunning) return;
                                    a("on", r)
                            }
                        }
                    })
                },
                R = function() {
                    function t(t) {
                        function n(e, t) {
                            a.type = s.keyboard.scrollType, a.scrollAmount = s.snapAmount || s.keyboard.scrollAmount, "stepped" === a.type && o.tweenRunning || H(i, e, t)
                        }
                        switch (t.type) {
                            case "blur":
                                o.tweenRunning && a.dir && n("off", null);
                                break;
                            case "keydown":
                            case "keyup":
                                var r = t.keyCode ? t.keyCode : t.which,
                                    l = "on";
                                if ("x" !== s.axis && (38 === r || 40 === r) || "y" !== s.axis && (37 === r || 39 === r)) {
                                    if ((38 === r || 40 === r) && !o.overflowed[0] || (37 === r || 39 === r) && !o.overflowed[1]) return;
                                    "keyup" === t.type && (l = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), n(l, r))
                                } else if (33 === r || 34 === r) {
                                    if ((o.overflowed[0] || o.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                                        q(i);
                                        var h = 34 === r ? -1 : 1;
                                        if ("x" === s.axis || "yx" === s.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                            m = Math.abs(d[0].offsetLeft) - .9 * h * c.width();
                                        else var p = "y",
                                            m = Math.abs(d[0].offsetTop) - .9 * h * c.height();
                                        Y(i, m.toString(), {
                                            dir: p,
                                            scrollEasing: "mcsEaseInOut"
                                        })
                                    }
                                } else if ((35 === r || 36 === r) && !e(document.activeElement).is(u) && ((o.overflowed[0] || o.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                    if ("x" === s.axis || "yx" === s.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                        m = 35 === r ? Math.abs(c.width() - d.outerWidth(!1)) : 0;
                                    else var p = "y",
                                        m = 35 === r ? Math.abs(c.height() - d.outerHeight(!1)) : 0;
                                    Y(i, m.toString(), {
                                        dir: p,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                        }
                    }
                    var i = e(this),
                        o = i.data(n),
                        s = o.opt,
                        a = o.sequential,
                        r = n + "_" + o.idx,
                        l = e("#mCSB_" + o.idx),
                        d = e("#mCSB_" + o.idx + "_container"),
                        c = d.parent(),
                        u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                        h = d.find("iframe"),
                        p = ["blur." + r + " keydown." + r + " keyup." + r];
                    h.length && h.each(function() {
                        e(this).load(function() {
                            A(this) && e(this.contentDocument || this.contentWindow.document).bind(p[0], function(e) {
                                t(e)
                            })
                        })
                    }), l.attr("tabindex", "0").bind(p[0], function(e) {
                        t(e)
                    })
                },
                H = function(t, i, o, s, a) {
                    function r(e) {
                        var i = "stepped" !== h.type,
                            n = a ? a : e ? i ? f / 1.5 : g : 1e3 / 60,
                            o = e ? i ? 7.5 : 40 : 2.5,
                            l = [Math.abs(p[0].offsetTop), Math.abs(p[0].offsetLeft)],
                            c = [d.scrollRatio.y > 10 ? 10 : d.scrollRatio.y, d.scrollRatio.x > 10 ? 10 : d.scrollRatio.x],
                            u = "x" === h.dir[0] ? l[1] + h.dir[1] * c[1] * o : l[0] + h.dir[1] * c[0] * o,
                            m = "x" === h.dir[0] ? l[1] + h.dir[1] * parseInt(h.scrollAmount) : l[0] + h.dir[1] * parseInt(h.scrollAmount),
                            v = "auto" !== h.scrollAmount ? m : u,
                            y = s ? s : e ? i ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                            b = e ? !0 : !1;
                        return e && 17 > n && (v = "x" === h.dir[0] ? l[1] : l[0]), Y(t, v.toString(), {
                            dir: h.dir[0],
                            scrollEasing: y,
                            dur: n,
                            onComplete: b
                        }), e ? void(h.dir = !1) : (clearTimeout(h.step), void(h.step = setTimeout(function() {
                            r()
                        }, n)))
                    }

                    function l() {
                        clearTimeout(h.step), G(h, "step"), q(t)
                    }
                    var d = t.data(n),
                        u = d.opt,
                        h = d.sequential,
                        p = e("#mCSB_" + d.idx + "_container"),
                        m = "stepped" === h.type ? !0 : !1,
                        f = u.scrollInertia < 26 ? 26 : u.scrollInertia,
                        g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
                    switch (i) {
                        case "on":
                            if (h.dir = [o === c[16] || o === c[15] || 39 === o || 37 === o ? "x" : "y", o === c[13] || o === c[15] || 38 === o || 37 === o ? -1 : 1], q(t), ee(o) && "stepped" === h.type) return;
                            r(m);
                            break;
                        case "off":
                            l(), (m || d.tweenRunning && h.dir) && r(!0)
                    }
                },
                N = function(t) {
                    var i = e(this).data(n).opt,
                        o = [];
                    return "function" == typeof t && (t = t()), t instanceof Array ? o = t.length > 1 ? [t[0], t[1]] : "x" === i.axis ? [null, t[0]] : [t[0], null] : (o[0] = t.y ? t.y : t.x || "x" === i.axis ? null : t, o[1] = t.x ? t.x : t.y || "y" === i.axis ? null : t), "function" == typeof o[0] && (o[0] = o[0]()), "function" == typeof o[1] && (o[1] = o[1]()), o
                },
                $ = function(t, i) {
                    if (null != t && "undefined" != typeof t) {
                        var o = e(this),
                            s = o.data(n),
                            a = s.opt,
                            r = e("#mCSB_" + s.idx + "_container"),
                            l = r.parent(),
                            d = typeof t;
                        i || (i = "x" === a.axis ? "x" : "y");
                        var c = "x" === i ? r.outerWidth(!1) : r.outerHeight(!1),
                            h = "x" === i ? r[0].offsetLeft : r[0].offsetTop,
                            p = "x" === i ? "left" : "top";
                        switch (d) {
                            case "function":
                                return t();
                            case "object":
                                var m = t.jquery ? t : e(t);
                                if (!m.length) return;
                                return "x" === i ? te(m)[1] : te(m)[0];
                            case "string":
                            case "number":
                                if (ee(t)) return Math.abs(t);
                                if (-1 !== t.indexOf("%")) return Math.abs(c * parseInt(t) / 100);
                                if (-1 !== t.indexOf("-=")) return Math.abs(h - parseInt(t.split("-=")[1]));
                                if (-1 !== t.indexOf("+=")) {
                                    var f = h + parseInt(t.split("+=")[1]);
                                    return f >= 0 ? 0 : Math.abs(f)
                                }
                                if (-1 !== t.indexOf("px") && ee(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                                if ("top" === t || "left" === t) return 0;
                                if ("bottom" === t) return Math.abs(l.height() - r.outerHeight(!1));
                                if ("right" === t) return Math.abs(l.width() - r.outerWidth(!1));
                                if ("first" === t || "last" === t) {
                                    var m = r.find(":" + t);
                                    return "x" === i ? te(m)[1] : te(m)[0]
                                }
                                return e(t).length ? "x" === i ? te(e(t))[1] : te(e(t))[0] : (r.css(p, t), void u.update.call(null, o[0]))
                        }
                    }
                },
                V = function(t) {
                    function i() {
                        return clearTimeout(h[0].autoUpdate), 0 === r.parents("html").length ? void(r = null) : void(h[0].autoUpdate = setTimeout(function() {
                            return d.advanced.updateOnSelectorChange && (l.poll.change.n = s(), l.poll.change.n !== l.poll.change.o) ? (l.poll.change.o = l.poll.change.n, void a(3)) : d.advanced.updateOnContentResize && (l.poll.size.n = r[0].scrollHeight + r[0].scrollWidth + h[0].offsetHeight + r[0].offsetHeight, l.poll.size.n !== l.poll.size.o) ? (l.poll.size.o = l.poll.size.n, void a(1)) : !d.advanced.updateOnImageLoad || "auto" === d.advanced.updateOnImageLoad && "y" === d.axis || (l.poll.img.n = h.find("img").length, l.poll.img.n === l.poll.img.o) ? void((d.advanced.updateOnSelectorChange || d.advanced.updateOnContentResize || d.advanced.updateOnImageLoad) && i()) : (l.poll.img.o = l.poll.img.n, void h.find("img").each(function() {
                                o(this)
                            }))
                        }, d.advanced.autoUpdateTimeout))
                    }

                    function o(t) {
                        function i(e, t) {
                            return function() {
                                return t.apply(e, arguments)
                            }
                        }

                        function n() {
                            this.onload = null, e(t).addClass(c[2]), a(2)
                        }
                        if (e(t).hasClass(c[2])) return void a();
                        var o = new Image;
                        o.onload = i(o, n), o.src = t.src
                    }

                    function s() {
                        d.advanced.updateOnSelectorChange === !0 && (d.advanced.updateOnSelectorChange = "*");
                        var e = 0,
                            t = h.find(d.advanced.updateOnSelectorChange);
                        return d.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
                            e += this.offsetHeight + this.offsetWidth
                        }), e
                    }

                    function a(e) {
                        clearTimeout(h[0].autoUpdate), u.update.call(null, r[0], e)
                    }
                    var r = e(this),
                        l = r.data(n),
                        d = l.opt,
                        h = e("#mCSB_" + l.idx + "_container");
                    return t ? (clearTimeout(h[0].autoUpdate), void G(h[0], "autoUpdate")) : void i()
                },
                U = function(e, t, i) {
                    return Math.round(e / t) * t - i
                },
                q = function(t) {
                    var i = t.data(n),
                        o = e("#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper,#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal");
                    o.each(function() {
                        Z.call(this)
                    })
                },
                Y = function(t, i, o) {
                    function s(e) {
                        return l && d.callbacks[e] && "function" == typeof d.callbacks[e]
                    }

                    function a() {
                        return [d.callbacks.alwaysTriggerOffsets || b >= w[0] + S, d.callbacks.alwaysTriggerOffsets || -T >= b]
                    }

                    function r() {
                        var e = [p[0].offsetTop, p[0].offsetLeft],
                            i = [v[0].offsetTop, v[0].offsetLeft],
                            n = [p.outerHeight(!1), p.outerWidth(!1)],
                            s = [h.height(), h.width()];
                        t[0].mcs = {
                            content: p,
                            top: e[0],
                            left: e[1],
                            draggerTop: i[0],
                            draggerLeft: i[1],
                            topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(n[0]) - s[0])),
                            leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(n[1]) - s[1])),
                            direction: o.dir
                        }
                    }
                    var l = t.data(n),
                        d = l.opt,
                        c = {
                            trigger: "internal",
                            dir: "y",
                            scrollEasing: "mcsEaseOut",
                            drag: !1,
                            dur: d.scrollInertia,
                            overwrite: "all",
                            callbacks: !0,
                            onStart: !0,
                            onUpdate: !0,
                            onComplete: !0
                        },
                        o = e.extend(c, o),
                        u = [o.dur, o.drag ? 0 : o.dur],
                        h = e("#mCSB_" + l.idx),
                        p = e("#mCSB_" + l.idx + "_container"),
                        m = p.parent(),
                        f = d.callbacks.onTotalScrollOffset ? N.call(t, d.callbacks.onTotalScrollOffset) : [0, 0],
                        g = d.callbacks.onTotalScrollBackOffset ? N.call(t, d.callbacks.onTotalScrollBackOffset) : [0, 0];
                    if (l.trigger = o.trigger, (0 !== m.scrollTop() || 0 !== m.scrollLeft()) && (e(".mCSB_" + l.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== i || l.contentReset.y || (s("onOverflowYNone") && d.callbacks.onOverflowYNone.call(t[0]), l.contentReset.y = 1), "_resetX" !== i || l.contentReset.x || (s("onOverflowXNone") && d.callbacks.onOverflowXNone.call(t[0]), l.contentReset.x = 1), "_resetY" !== i && "_resetX" !== i) {
                        switch (!l.contentReset.y && t[0].mcs || !l.overflowed[0] || (s("onOverflowY") && d.callbacks.onOverflowY.call(t[0]), l.contentReset.x = null), !l.contentReset.x && t[0].mcs || !l.overflowed[1] || (s("onOverflowX") && d.callbacks.onOverflowX.call(t[0]), l.contentReset.x = null), d.snapAmount && (i = U(i, d.snapAmount, d.snapOffset)), o.dir) {
                            case "x":
                                var v = e("#mCSB_" + l.idx + "_dragger_horizontal"),
                                    y = "left",
                                    b = p[0].offsetLeft,
                                    w = [h.width() - p.outerWidth(!1), v.parent().width() - v.width()],
                                    x = [i, 0 === i ? 0 : i / l.scrollRatio.x],
                                    S = f[1],
                                    T = g[1],
                                    k = S > 0 ? S / l.scrollRatio.x : 0,
                                    j = T > 0 ? T / l.scrollRatio.x : 0;
                                break;
                            case "y":
                                var v = e("#mCSB_" + l.idx + "_dragger_vertical"),
                                    y = "top",
                                    b = p[0].offsetTop,
                                    w = [h.height() - p.outerHeight(!1), v.parent().height() - v.height()],
                                    x = [i, 0 === i ? 0 : i / l.scrollRatio.y],
                                    S = f[0],
                                    T = g[0],
                                    k = S > 0 ? S / l.scrollRatio.y : 0,
                                    j = T > 0 ? T / l.scrollRatio.y : 0
                        }
                        x[1] < 0 || 0 === x[0] && 0 === x[1] ? x = [0, 0] : x[1] >= w[1] ? x = [w[0], w[1]] : x[0] = -x[0], t[0].mcs || (r(), s("onInit") && d.callbacks.onInit.call(t[0])), clearTimeout(p[0].onCompleteTimeout), (l.tweenRunning || !(0 === b && x[0] >= 0 || b === w[0] && x[0] <= w[0])) && (X(v[0], y, Math.round(x[1]), u[1], o.scrollEasing), X(p[0], y, Math.round(x[0]), u[0], o.scrollEasing, o.overwrite, {
                            onStart: function() {
                                o.callbacks && o.onStart && !l.tweenRunning && (s("onScrollStart") && (r(), d.callbacks.onScrollStart.call(t[0])), l.tweenRunning = !0, C(v), l.cbOffsets = a())
                            },
                            onUpdate: function() {
                                o.callbacks && o.onUpdate && s("whileScrolling") && (r(), d.callbacks.whileScrolling.call(t[0]))
                            },
                            onComplete: function() {
                                if (o.callbacks && o.onComplete) {
                                    "yx" === d.axis && clearTimeout(p[0].onCompleteTimeout);
                                    var e = p[0].idleTimer || 0;
                                    p[0].onCompleteTimeout = setTimeout(function() {
                                        s("onScroll") && (r(), d.callbacks.onScroll.call(t[0])), s("onTotalScroll") && x[1] >= w[1] - k && l.cbOffsets[0] && (r(), d.callbacks.onTotalScroll.call(t[0])), s("onTotalScrollBack") && x[1] <= j && l.cbOffsets[1] && (r(), d.callbacks.onTotalScrollBack.call(t[0])), l.tweenRunning = !1, p[0].idleTimer = 0, C(v, "hide")
                                    }, e)
                                }
                            }
                        }))
                    }
                },
                X = function(e, t, i, n, o, s, a) {
                    function r() {
                        x.stop || (y || m.call(), y = Q() - v, l(), y >= x.time && (x.time = y > x.time ? y + h - (y - x.time) : y + h - 1, x.time < y + 1 && (x.time = y + 1)), x.time < n ? x.id = p(r) : g.call())
                    }

                    function l() {
                        n > 0 ? (x.currVal = u(x.time, b, S, n, o), w[t] = Math.round(x.currVal) + "px") : w[t] = i + "px", f.call()
                    }

                    function d() {
                        h = 1e3 / 60, x.time = y + h, p = window.requestAnimationFrame ? window.requestAnimationFrame : function(e) {
                            return l(), setTimeout(e, .01)
                        }, x.id = p(r)
                    }

                    function c() {
                        null != x.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(x.id) : clearTimeout(x.id), x.id = null)
                    }

                    function u(e, t, i, n, o) {
                        switch (o) {
                            case "linear":
                            case "mcsLinear":
                                return i * e / n + t;
                            case "mcsLinearOut":
                                return e /= n, e--, i * Math.sqrt(1 - e * e) + t;
                            case "easeInOutSmooth":
                                return e /= n / 2, 1 > e ? i / 2 * e * e + t : (e--, -i / 2 * (e * (e - 2) - 1) + t);
                            case "easeInOutStrong":
                                return e /= n / 2, 1 > e ? i / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, i / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                            case "easeInOut":
                            case "mcsEaseInOut":
                                return e /= n / 2, 1 > e ? i / 2 * e * e * e + t : (e -= 2, i / 2 * (e * e * e + 2) + t);
                            case "easeOutSmooth":
                                return e /= n, e--, -i * (e * e * e * e - 1) + t;
                            case "easeOutStrong":
                                return i * (-Math.pow(2, -10 * e / n) + 1) + t;
                            case "easeOut":
                            case "mcsEaseOut":
                            default:
                                var s = (e /= n) * e,
                                    a = s * e;
                                return t + i * (.499999999999997 * a * s + -2.5 * s * s + 5.5 * a + -6.5 * s + 4 * e)
                        }
                    }
                    e._mTween || (e._mTween = {
                        top: {},
                        left: {}
                    });
                    var h, p, a = a || {},
                        m = a.onStart || function() {},
                        f = a.onUpdate || function() {},
                        g = a.onComplete || function() {},
                        v = Q(),
                        y = 0,
                        b = e.offsetTop,
                        w = e.style,
                        x = e._mTween[t];
                    "left" === t && (b = e.offsetLeft);
                    var S = i - b;
                    x.stop = 0, "none" !== s && c(), d()
                },
                Q = function() {
                    return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
                },
                Z = function() {
                    var e = this;
                    e._mTween || (e._mTween = {
                        top: {},
                        left: {}
                    });
                    for (var t = ["top", "left"], i = 0; i < t.length; i++) {
                        var n = t[i];
                        e._mTween[n].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[n].id) : clearTimeout(e._mTween[n].id), e._mTween[n].id = null, e._mTween[n].stop = 1)
                    }
                },
                G = function(e, t) {
                    try {
                        delete e[t]
                    } catch (i) {
                        e[t] = null
                    }
                },
                K = function(e) {
                    return !(e.which && 1 !== e.which)
                },
                J = function(e) {
                    var t = e.originalEvent.pointerType;
                    return !(t && "touch" !== t && 2 !== t)
                },
                ee = function(e) {
                    return !isNaN(parseFloat(e)) && isFinite(e)
                },
                te = function(e) {
                    var t = e.parents(".mCSB_container");
                    return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
                };
            e.fn[i] = function(t) {
                return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
            }, e[i] = function(t) {
                return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
            }, e[i].defaults = s, window[i] = !0, e(window).load(function() {
                e(o)[i](), e.extend(e.expr[":"], {
                    mcsInView: e.expr[":"].mcsInView || function(t) {
                        var i, n, o = e(t),
                            s = o.parents(".mCSB_container");
                        return s.length ? (i = s.parent(), n = [s[0].offsetTop, s[0].offsetLeft], n[0] + te(o)[0] >= 0 && n[0] + te(o)[0] < i.height() - o.outerHeight(!1) && n[1] + te(o)[1] >= 0 && n[1] + te(o)[1] < i.width() - o.outerWidth(!1)) : void 0
                    },
                    mcsOverflow: e.expr[":"].mcsOverflow || function(t) {
                        var i = e(t).data(n);
                        return i ? i.overflowed[0] || i.overflowed[1] : void 0
                    }
                })
            })
        })
    });
var mejs = mejs || {};
mejs.version = "2.18.2", mejs.meIndex = 0, mejs.plugins = {
        silverlight: [{
            version: [3, 0],
            types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
        }],
        flash: [{
            version: [9, 0, 124],
            types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube", "video/dailymotion", "video/x-dailymotion", "application/x-mpegURL"]
        }],
        youtube: [{
            version: null,
            types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
        }],
        vimeo: [{
            version: null,
            types: ["video/vimeo", "video/x-vimeo"]
        }]
    }, mejs.Utility = {
        encodeUrl: function(e) {
            return encodeURIComponent(e)
        },
        escapeHTML: function(e) {
            return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
        },
        absolutizeUrl: function(e) {
            var t = document.createElement("div");
            return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
        },
        getScriptPath: function(e) {
            for (var t, i, n, o, s, a, r = 0, l = "", d = "", c = document.getElementsByTagName("script"), u = c.length, h = e.length; u > r; r++) {
                for (o = c[r].src, i = o.lastIndexOf("/"), i > -1 ? (a = o.substring(i + 1), s = o.substring(0, i + 1)) : (a = o, s = ""), t = 0; h > t; t++)
                    if (d = e[t], n = a.indexOf(d), n > -1) {
                        l = s;
                        break
                    } if ("" !== l) break
            }
            return l
        },
        calculateTimeFormat: function(e, t, i) {
            0 > e && (e = 0), "undefined" == typeof i && (i = 25);
            var n = t.timeFormat,
                o = n[0],
                s = n[1] == n[0],
                a = s ? 2 : 1,
                r = ":",
                l = Math.floor(e / 3600) % 24,
                d = Math.floor(e / 60) % 60,
                c = Math.floor(e % 60),
                u = Math.floor((e % 1 * i).toFixed(3)),
                h = [
                    [u, "f"],
                    [c, "s"],
                    [d, "m"],
                    [l, "h"]
                ];
            n.length < a && (r = n[a]);
            for (var p = !1, m = 0, f = h.length; f > m; m++)
                if (-1 !== n.indexOf(h[m][1])) p = !0;
                else if (p) {
                for (var g = !1, v = m; f > v; v++)
                    if (h[v][0] > 0) {
                        g = !0;
                        break
                    } if (!g) break;
                s || (n = o + n), n = h[m][1] + r + n, s && (n = h[m][1] + n), o = h[m][1]
            }
            t.currentTimeFormat = n
        },
        twoDigitsString: function(e) {
            return 10 > e ? "0" + e : String(e)
        },
        secondsToTimeCode: function(e, t) {
            if (0 > e && (e = 0), "object" != typeof t) {
                var n = "m:ss";
                n = arguments[1] ? "hh:mm:ss" : n, n = arguments[2] ? n + ":ff" : n, t = {
                    currentTimeFormat: n,
                    framesPerSecond: arguments[3] || 25
                }
            }
            var o = t.framesPerSecond;
            "undefined" == typeof o && (o = 25);
            var n = t.currentTimeFormat,
                s = Math.floor(e / 3600) % 24,
                a = Math.floor(e / 60) % 60,
                r = Math.floor(e % 60),
                l = Math.floor((e % 1 * o).toFixed(3));
            lis = [
                [l, "f"],
                [r, "s"],
                [a, "m"],
                [s, "h"]
            ];
            var d = n;
            for (i = 0, len = lis.length; i < len; i++) d = d.replace(lis[i][1] + lis[i][1], this.twoDigitsString(lis[i][0])), d = d.replace(lis[i][1], lis[i][0]);
            return d
        },
        timeCodeToSeconds: function(e, t, i, n) {
            "undefined" == typeof i ? i = !1 : "undefined" == typeof n && (n = 25);
            var o = e.split(":"),
                s = parseInt(o[0], 10),
                a = parseInt(o[1], 10),
                r = parseInt(o[2], 10),
                l = 0,
                d = 0;
            return i && (l = parseInt(o[3]) / n), d = 3600 * s + 60 * a + r + l
        },
        convertSMPTEtoSeconds: function(e) {
            if ("string" != typeof e) return !1;
            e = e.replace(",", ".");
            var t = 0,
                i = -1 != e.indexOf(".") ? e.split(".")[1].length : 0,
                n = 1;
            e = e.split(":").reverse();
            for (var o = 0; o < e.length; o++) n = 1, o > 0 && (n = Math.pow(60, o)), t += Number(e[o]) * n;
            return Number(t.toFixed(i))
        },
        removeSwf: function(e) {
            var t = document.getElementById(e);
            t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none", function() {
                4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
            }()) : t.parentNode.removeChild(t))
        },
        removeObjectInIE: function(e) {
            var t = document.getElementById(e);
            if (t) {
                for (var i in t) "function" == typeof t[i] && (t[i] = null);
                t.parentNode.removeChild(t)
            }
        }
    }, mejs.PluginDetector = {
        hasPluginVersion: function(e, t) {
            var i = this.plugins[e];
            return t[1] = t[1] || 0, t[2] = t[2] || 0, i[0] > t[0] || i[0] == t[0] && i[1] > t[1] || i[0] == t[0] && i[1] == t[1] && i[2] >= t[2] ? !0 : !1
        },
        nav: window.navigator,
        ua: window.navigator.userAgent.toLowerCase(),
        plugins: [],
        addPlugin: function(e, t, i, n, o) {
            this.plugins[e] = this.detectPlugin(t, i, n, o)
        },
        detectPlugin: function(e, t, i, n) {
            var o, s, a, r = [0, 0, 0];
            if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
                if (o = this.nav.plugins[e].description, o && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                    for (r = o.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), s = 0; s < r.length; s++) r[s] = parseInt(r[s].match(/\d+/), 10)
            } else if ("undefined" != typeof window.ActiveXObject) try {
                a = new ActiveXObject(i), a && (r = n(a))
            } catch (l) {}
            return r
        }
    }, mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(e) {
        var t = [],
            i = e.GetVariable("$version");
        return i && (i = i.split(" ")[1].split(","), t = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]), t
    }), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(e) {
        var t = [0, 0, 0, 0],
            i = function(e, t, i, n) {
                for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[i] += n;
                t[i] -= n
            };
        return i(e, t, 0, 1), i(e, t, 1, 1), i(e, t, 2, 1e4), i(e, t, 2, 1e3), i(e, t, 2, 100), i(e, t, 2, 10), i(e, t, 2, 1), i(e, t, 3, 1), t
    }), mejs.MediaFeatures = {
        init: function() {
            var e, t, i = this,
                n = document,
                o = mejs.PluginDetector.nav,
                s = mejs.PluginDetector.ua.toLowerCase(),
                a = ["source", "track", "audio", "video"];
            i.isiPad = null !== s.match(/ipad/i), i.isiPhone = null !== s.match(/iphone/i), i.isiOS = i.isiPhone || i.isiPad, i.isAndroid = null !== s.match(/android/i), i.isBustedAndroid = null !== s.match(/android 2\.[12]/), i.isBustedNativeHTTPS = "https:" === location.protocol && (null !== s.match(/android [12]\./) || null !== s.match(/macintosh.* version.* safari/)), i.isIE = -1 != o.appName.toLowerCase().indexOf("microsoft") || null !== o.appName.toLowerCase().match(/trident/gi), i.isChrome = null !== s.match(/chrome/gi), i.isChromium = null !== s.match(/chromium/gi), i.isFirefox = null !== s.match(/firefox/gi), i.isWebkit = null !== s.match(/webkit/gi), i.isGecko = null !== s.match(/gecko/gi) && !i.isWebkit && !i.isIE, i.isOpera = null !== s.match(/opera/gi), i.hasTouch = "ontouchstart" in window, i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
            for (e = 0; e < a.length; e++) t = document.createElement(a[e]);
            i.supportsMediaTag = "undefined" != typeof t.canPlayType || i.isBustedAndroid;
            try {
                t.canPlayType("video/mp4")
            } catch (r) {
                i.supportsMediaTag = !1
            }
            i.hasSemiNativeFullScreen = "undefined" != typeof t.webkitEnterFullscreen, i.hasNativeFullscreen = "undefined" != typeof t.requestFullscreen, i.hasWebkitNativeFullScreen = "undefined" != typeof t.webkitRequestFullScreen, i.hasMozNativeFullScreen = "undefined" != typeof t.mozRequestFullScreen, i.hasMsNativeFullScreen = "undefined" != typeof t.msRequestFullscreen, i.hasTrueNativeFullScreen = i.hasWebkitNativeFullScreen || i.hasMozNativeFullScreen || i.hasMsNativeFullScreen, i.nativeFullScreenEnabled = i.hasTrueNativeFullScreen, i.hasMozNativeFullScreen ? i.nativeFullScreenEnabled = document.mozFullScreenEnabled : i.hasMsNativeFullScreen && (i.nativeFullScreenEnabled = document.msFullscreenEnabled), i.isChrome && (i.hasSemiNativeFullScreen = !1), i.hasTrueNativeFullScreen && (i.fullScreenEventName = "", i.hasWebkitNativeFullScreen ? i.fullScreenEventName = "webkitfullscreenchange" : i.hasMozNativeFullScreen ? i.fullScreenEventName = "mozfullscreenchange" : i.hasMsNativeFullScreen && (i.fullScreenEventName = "MSFullscreenChange"), i.isFullScreen = function() {
                return i.hasMozNativeFullScreen ? n.mozFullScreen : i.hasWebkitNativeFullScreen ? n.webkitIsFullScreen : i.hasMsNativeFullScreen ? null !== n.msFullscreenElement : void 0
            }, i.requestFullScreen = function(e) {
                i.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : i.hasMozNativeFullScreen ? e.mozRequestFullScreen() : i.hasMsNativeFullScreen && e.msRequestFullscreen()
            }, i.cancelFullScreen = function() {
                i.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : i.hasMozNativeFullScreen ? document.mozCancelFullScreen() : i.hasMsNativeFullScreen && document.msExitFullscreen()
            }), i.hasSemiNativeFullScreen && s.match(/mac os x 10_5/i) && (i.hasNativeFullScreen = !1, i.hasSemiNativeFullScreen = !1)
        }
    }, mejs.MediaFeatures.init(), mejs.HtmlMediaElement = {
        pluginType: "native",
        isFullScreen: !1,
        setCurrentTime: function(e) {
            this.currentTime = e
        },
        setMuted: function(e) {
            this.muted = e
        },
        setVolume: function(e) {
            this.volume = e
        },
        stop: function() {
            this.pause()
        },
        setSrc: function(e) {
            for (var t = this.getElementsByTagName("source"); t.length > 0;) this.removeChild(t[0]);
            if ("string" == typeof e) this.src = e;
            else {
                var i, n;
                for (i = 0; i < e.length; i++)
                    if (n = e[i], this.canPlayType(n.type)) {
                        this.src = n.src;
                        break
                    }
            }
        },
        setVideoSize: function(e, t) {
            this.width = e, this.height = t
        }
    }, mejs.PluginMediaElement = function(e, t, i) {
        this.id = e, this.pluginType = t, this.src = i, this.events = {}, this.attributes = {}
    }, mejs.PluginMediaElement.prototype = {
        pluginElement: null,
        pluginType: "",
        isFullScreen: !1,
        playbackRate: -1,
        defaultPlaybackRate: -1,
        seekable: [],
        played: [],
        paused: !0,
        ended: !1,
        seeking: !1,
        duration: 0,
        error: null,
        tagName: "",
        muted: !1,
        volume: 1,
        currentTime: 0,
        play: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
        },
        load: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(), this.paused = !1)
        },
        pause: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
        },
        stop: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
        },
        canPlayType: function(e) {
            var t, i, n, o = mejs.plugins[this.pluginType];
            for (t = 0; t < o.length; t++)
                if (n = o[t], mejs.PluginDetector.hasPluginVersion(this.pluginType, n.version))
                    for (i = 0; i < n.types.length; i++)
                        if (e == n.types[i]) return "probably";
            return ""
        },
        positionFullscreenButton: function(e, t, i) {
            null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), i)
        },
        hideFullscreenButton: function() {
            null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
        },
        setSrc: function(e) {
            if ("string" == typeof e) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)), this.src = mejs.Utility.absolutizeUrl(e);
            else {
                var t, i;
                for (t = 0; t < e.length; t++)
                    if (i = e[t], this.canPlayType(i.type)) {
                        this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)), this.src = mejs.Utility.absolutizeUrl(i.src);
                        break
                    }
            }
        },
        setCurrentTime: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e), this.currentTime = e)
        },
        setVolume: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.setVolume(100 * e) : this.pluginApi.setVolume(e), this.volume = e)
        },
        setMuted: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = e, this.dispatchEvent({
                type: "volumechange"
            })) : this.pluginApi.setMuted(e), this.muted = e)
        },
        setVideoSize: function(e, t) {
            this.pluginElement && this.pluginElement.style && (this.pluginElement.style.width = e + "px", this.pluginElement.style.height = t + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
        },
        setFullscreen: function(e) {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
        },
        enterFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
        },
        exitFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
        },
        addEventListener: function(e, t, i) {
            this.events[e] = this.events[e] || [], this.events[e].push(t)
        },
        removeEventListener: function(e, t) {
            if (!e) return this.events = {}, !0;
            var i = this.events[e];
            if (!i) return !0;
            if (!t) return this.events[e] = [], !0;
            for (var n = 0; n < i.length; n++)
                if (i[n] === t) return this.events[e].splice(n, 1), !0;
            return !1
        },
        dispatchEvent: function(e) {
            var t, i = this.events[e.type];
            if (i)
                for (t = 0; t < i.length; t++) i[t].apply(this, [e])
        },
        hasAttribute: function(e) {
            return e in this.attributes
        },
        removeAttribute: function(e) {
            delete this.attributes[e]
        },
        getAttribute: function(e) {
            return this.hasAttribute(e) ? this.attributes[e] : ""
        },
        setAttribute: function(e, t) {
            this.attributes[e] = t
        },
        remove: function() {
            mejs.Utility.removeSwf(this.pluginElement.id), mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
        }
    }, mejs.MediaPluginBridge = {
        pluginMediaElements: {},
        htmlMediaElements: {},
        registerPluginElement: function(e, t, i) {
            this.pluginMediaElements[e] = t, this.htmlMediaElements[e] = i
        },
        unregisterPluginElement: function(e) {
            delete this.pluginMediaElements[e], delete this.htmlMediaElements[e]
        },
        initPlugin: function(e) {
            var t = this.pluginMediaElements[e],
                i = this.htmlMediaElements[e];
            if (t) {
                switch (t.pluginType) {
                    case "flash":
                        t.pluginElement = t.pluginApi = document.getElementById(e);
                        break;
                    case "silverlight":
                        t.pluginElement = document.getElementById(t.id), t.pluginApi = t.pluginElement.Content.MediaElementJS
                }
                null != t.pluginApi && t.success && t.success(t, i)
            }
        },
        fireEvent: function(e, t, i) {
            var n, o, s, a = this.pluginMediaElements[e];
            if (a) {
                n = {
                    type: t,
                    target: a
                };
                for (o in i) a[o] = i[o], n[o] = i[o];
                s = i.bufferedTime || 0, n.target.buffered = n.buffered = {
                    start: function(e) {
                        return 0
                    },
                    end: function(e) {
                        return s
                    },
                    length: 1
                }, a.dispatchEvent(n)
            }
        }
    }, mejs.MediaElementDefaults = {
        mode: "auto",
        plugins: ["flash", "silverlight", "youtube", "vimeo"],
        enablePluginDebug: !1,
        httpsBasicAuthSite: !1,
        type: "",
        pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
        flashName: "flashmediaelement.swf",
        flashStreamer: "",
        flashScriptAccess: "sameDomain",
        enablePluginSmoothing: !1,
        enablePseudoStreaming: !1,
        pseudoStreamingStartQueryParam: "start",
        silverlightName: "silverlightmediaelement.xap",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        pluginWidth: -1,
        pluginHeight: -1,
        pluginVars: [],
        timerRate: 250,
        startVolume: .8,
        success: function() {},
        error: function() {}
    }, mejs.MediaElement = function(e, t) {
        return mejs.HtmlMediaElementShim.create(e, t)
    }, mejs.HtmlMediaElementShim = {
        create: function(e, t) {
            var i, n, o = {},
                s = "string" == typeof e ? document.getElementById(e) : e,
                a = s.tagName.toLowerCase(),
                r = "audio" === a || "video" === a,
                l = r ? s.getAttribute("src") : s.getAttribute("href"),
                d = s.getAttribute("poster"),
                c = s.getAttribute("autoplay"),
                u = s.getAttribute("preload"),
                h = s.getAttribute("controls");
            for (n in mejs.MediaElementDefaults) o[n] = mejs.MediaElementDefaults[n];
            for (n in t) o[n] = t[n];
            return l = "undefined" == typeof l || null === l || "" == l ? null : l, d = "undefined" == typeof d || null === d ? "" : d, u = "undefined" == typeof u || null === u || "false" === u ? "none" : u, c = !("undefined" == typeof c || null === c || "false" === c), h = !("undefined" == typeof h || null === h || "false" === h), i = this.determinePlayback(s, o, mejs.MediaFeatures.supportsMediaTag, r, l), i.url = null !== i.url ? mejs.Utility.absolutizeUrl(i.url) : "", "native" == i.method ? (mejs.MediaFeatures.isBustedAndroid && (s.src = i.url, s.addEventListener("click", function() {
                s.play()
            }, !1)), this.updateNative(i, o, c, u)) : "" !== i.method ? this.createPlugin(i, o, d, c, u, h) : (this.createErrorMessage(i, o, d), this)
        },
        determinePlayback: function(e, t, i, n, o) {
            var s, a, r, l, d, c, u, h, p, m, f, g = [],
                v = {
                    method: "",
                    url: "",
                    htmlMediaElement: e,
                    isVideo: "audio" != e.tagName.toLowerCase()
                };
            if ("undefined" != typeof t.type && "" !== t.type)
                if ("string" == typeof t.type) g.push({
                    type: t.type,
                    url: o
                });
                else
                    for (s = 0; s < t.type.length; s++) g.push({
                        type: t.type[s],
                        url: o
                    });
            else if (null !== o) c = this.formatType(o, e.getAttribute("type")), g.push({
                type: c,
                url: o
            });
            else
                for (s = 0; s < e.childNodes.length; s++) d = e.childNodes[s], 1 == d.nodeType && "source" == d.tagName.toLowerCase() && (o = d.getAttribute("src"), c = this.formatType(o, d.getAttribute("type")), f = d.getAttribute("media"), (!f || !window.matchMedia || window.matchMedia && window.matchMedia(f).matches) && g.push({
                    type: c,
                    url: o
                }));
            if (!n && g.length > 0 && null !== g[0].url && this.getTypeFromFile(g[0].url).indexOf("audio") > -1 && (v.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function(e) {
                    return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
                }), mejs.MediaFeatures.isChromium && (e.canPlayType = function(e) {
                    return null !== e.match(/video\/(webm|ogv|ogg)/gi) ? "maybe" : ""
                }), i && ("auto" === t.mode || "auto_plugin" === t.mode || "native" === t.mode) && (!mejs.MediaFeatures.isBustedNativeHTTPS || t.httpsBasicAuthSite !== !0)) {
                for (n || (m = document.createElement(v.isVideo ? "video" : "audio"), e.parentNode.insertBefore(m, e), e.style.display = "none", v.htmlMediaElement = e = m), s = 0; s < g.length; s++)
                    if ("video/m3u8" == g[s].type || "" !== e.canPlayType(g[s].type).replace(/no/, "") || "" !== e.canPlayType(g[s].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== e.canPlayType(g[s].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                        v.method = "native", v.url = g[s].url;
                        break
                    } if ("native" === v.method && (null !== v.url && (e.src = v.url), "auto_plugin" !== t.mode)) return v
            }
            if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode)
                for (s = 0; s < g.length; s++)
                    for (c = g[s].type, a = 0; a < t.plugins.length; a++)
                        for (u = t.plugins[a], h = mejs.plugins[u], r = 0; r < h.length; r++)
                            if (p = h[r], null == p.version || mejs.PluginDetector.hasPluginVersion(u, p.version))
                                for (l = 0; l < p.types.length; l++)
                                    if (c.toLowerCase() == p.types[l].toLowerCase()) return v.method = u, v.url = g[s].url, v;
            return "auto_plugin" === t.mode && "native" === v.method ? v : ("" === v.method && g.length > 0 && (v.url = g[0].url), v)
        },
        formatType: function(e, t) {
            return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
        },
        getTypeFromFile: function(e) {
            e = e.split("?")[0];
            var t = e.substring(e.lastIndexOf(".") + 1).toLowerCase(),
                i = /(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t) ? "video/" : "audio/";
            return this.getTypeFromExtension(t, i)
        },
        getTypeFromExtension: function(e, t) {
            switch (t = t || "", e) {
                case "mp4":
                case "m4v":
                case "m4a":
                case "f4v":
                case "f4a":
                    return t + "mp4";
                case "flv":
                    return t + "x-flv";
                case "webm":
                case "webma":
                case "webmv":
                    return t + "webm";
                case "ogg":
                case "oga":
                case "ogv":
                    return t + "ogg";
                case "m3u8":
                    return "application/x-mpegurl";
                case "ts":
                    return t + "mp2t";
                default:
                    return t + e
            }
        },
        createErrorMessage: function(e, t, i) {
            var n = e.htmlMediaElement,
                o = document.createElement("div"),
                s = t.customError;
            o.className = "me-cannotplay";
            try {
                o.style.width = n.width + "px", o.style.height = n.height + "px"
            } catch (a) {}
            s || (s = '<a href="' + e.url + '">', "" !== i && (s += '<img src="' + i + '" width="100%" height="100%" alt="" />'), s += "<span>" + mejs.i18n.t("Download File") + "</span></a>"), o.innerHTML = s, n.parentNode.insertBefore(o, n), n.style.display = "none", t.error(n)
        },
        createPlugin: function(e, t, i, n, o, s) {
            var a, r, l, d = e.htmlMediaElement,
                c = 1,
                u = 1,
                h = "me_" + e.method + "_" + mejs.meIndex++,
                p = new mejs.PluginMediaElement(h, e.method, e.url),
                m = document.createElement("div");
            p.tagName = d.tagName;
            for (var f = 0; f < d.attributes.length; f++) {
                var g = d.attributes[f];
                g.specified && p.setAttribute(g.name, g.value)
            }
            for (r = d.parentNode; null !== r && null != r.tagName && "body" !== r.tagName.toLowerCase() && null != r.parentNode && null != r.parentNode.tagName && null != r.parentNode.constructor && "ShadowRoot" === r.parentNode.constructor.name;) {
                if ("p" === r.parentNode.tagName.toLowerCase()) {
                    r.parentNode.parentNode.insertBefore(r, r.parentNode);
                    break
                }
                r = r.parentNode
            }
            switch (e.isVideo ? (c = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== d.getAttribute("width") ? d.getAttribute("width") : t.defaultVideoWidth, u = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== d.getAttribute("height") ? d.getAttribute("height") : t.defaultVideoHeight, c = mejs.Utility.encodeUrl(c), u = mejs.Utility.encodeUrl(u)) : t.enablePluginDebug && (c = 320, u = 240), p.success = t.success, mejs.MediaPluginBridge.registerPluginElement(h, p, d), m.className = "me-plugin", m.id = h + "_container", e.isVideo ? d.parentNode.insertBefore(m, d) : document.body.insertBefore(m, document.body.childNodes[0]), l = ["id=" + h, "jsinitfunction=mejs.MediaPluginBridge.initPlugin", "jscallbackfunction=mejs.MediaPluginBridge.fireEvent", "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (n ? "true" : "false"), "preload=" + o, "width=" + c, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + u, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam], null !== e.url && ("flash" == e.method ? l.push("file=" + mejs.Utility.encodeUrl(e.url)) : l.push("file=" + e.url)), t.enablePluginDebug && l.push("debug=true"), t.enablePluginSmoothing && l.push("smoothing=true"), t.enablePseudoStreaming && l.push("pseudostreaming=true"), s && l.push("controls=true"), t.pluginVars && (l = l.concat(t.pluginVars)), e.method) {
                case "silverlight":
                    m.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + h + '" name="' + h + '" width="' + c + '" height="' + u + '" class="mejs-shim"><param name="initParams" value="' + l.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + t.pluginPath + t.silverlightName + '" /></object>';
                    break;
                case "flash":
                    mejs.MediaFeatures.isIE ? (a = document.createElement("div"), m.appendChild(a), a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + h + '" width="' + c + '" height="' + u + '" class="mejs-shim"><param name="movie" value="' + t.pluginPath + t.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + l.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' + t.flashScriptAccess + '" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : m.innerHTML = '<embed id="' + h + '" name="' + h + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="' + t.flashScriptAccess + '" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + t.pluginPath + t.flashName + '" flashvars="' + l.join("&") + '" width="' + c + '" height="' + u + '" scale="default"class="mejs-shim"></embed>';
                    break;
                case "youtube":
                    var v; - 1 != e.url.lastIndexOf("youtu.be") ? (v = e.url.substr(e.url.lastIndexOf("/") + 1), -1 != v.indexOf("?") && (v = v.substr(0, v.indexOf("?")))) : v = e.url.substr(e.url.lastIndexOf("=") + 1), youtubeSettings = {
                        container: m,
                        containerId: m.id,
                        pluginMediaElement: p,
                        pluginId: h,
                        videoId: v,
                        height: u,
                        width: c
                    }, mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings, t) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                    break;
                case "vimeo":
                    var y = h + "_player";
                    if (p.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1), m.innerHTML = '<iframe src="//player.vimeo.com/video/' + p.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + y + '" width="' + c + '" height="' + u + '" frameborder="0" class="mejs-shim" id="' + y + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', "function" == typeof $f) {
                        var b = $f(m.childNodes[0]);
                        b.addEvent("ready", function() {
                            function e(e, t, i, n) {
                                var o = {
                                    type: i,
                                    target: t
                                };
                                "timeupdate" == i && (t.currentTime = o.currentTime = n.seconds, t.duration = o.duration = n.duration), t.dispatchEvent(o)
                            }
                            b.playVideo = function() {
                                b.api("play")
                            }, b.stopVideo = function() {
                                b.api("unload")
                            }, b.pauseVideo = function() {
                                b.api("pause")
                            }, b.seekTo = function(e) {
                                b.api("seekTo", e)
                            }, b.setVolume = function(e) {
                                b.api("setVolume", e)
                            }, b.setMuted = function(e) {
                                e ? (b.lastVolume = b.api("getVolume"), b.api("setVolume", 0)) : (b.api("setVolume", b.lastVolume), delete b.lastVolume)
                            }, b.addEvent("play", function() {
                                e(b, p, "play"), e(b, p, "playing")
                            }), b.addEvent("pause", function() {
                                e(b, p, "pause")
                            }), b.addEvent("finish", function() {
                                e(b, p, "ended")
                            }), b.addEvent("playProgress", function(t) {
                                e(b, p, "timeupdate", t)
                            }), p.pluginElement = m, p.pluginApi = b, mejs.MediaPluginBridge.initPlugin(h)
                        })
                    } else console.warn("You need to include froogaloop for vimeo to work")
            }
            return d.style.display = "none", d.removeAttribute("autoplay"), p
        },
        updateNative: function(e, t, i, n) {
            var o, s = e.htmlMediaElement;
            for (o in mejs.HtmlMediaElement) s[o] = mejs.HtmlMediaElement[o];
            return t.success(s, s), s
        }
    }, mejs.YouTubeApi = {
        isIframeStarted: !1,
        isIframeLoaded: !1,
        loadIframeApi: function() {
            if (!this.isIframeStarted) {
                var e = document.createElement("script");
                e.src = "//www.youtube.com/player_api";
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t), this.isIframeStarted = !0
            }
        },
        iframeQueue: [],
        enqueueIframe: function(e) {
            this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(), this.iframeQueue.push(e))
        },
        createIframe: function(e) {
            var t = e.pluginMediaElement,
                i = new YT.Player(e.containerId, {
                    height: e.height,
                    width: e.width,
                    videoId: e.videoId,
                    playerVars: {
                        controls: 0
                    },
                    events: {
                        onReady: function() {
                            e.pluginMediaElement.pluginApi = i, mejs.MediaPluginBridge.initPlugin(e.pluginId), setInterval(function() {
                                mejs.YouTubeApi.createEvent(i, t, "timeupdate")
                            }, 250)
                        },
                        onStateChange: function(e) {
                            mejs.YouTubeApi.handleStateChange(e.data, i, t)
                        }
                    }
                })
        },
        createEvent: function(e, t, i) {
            var n = {
                type: i,
                target: t
            };
            if (e && e.getDuration) {
                t.currentTime = n.currentTime = e.getCurrentTime(), t.duration = n.duration = e.getDuration(), n.paused = t.paused, n.ended = t.ended, n.muted = e.isMuted(), n.volume = e.getVolume() / 100, n.bytesTotal = e.getVideoBytesTotal(), n.bufferedBytes = e.getVideoBytesLoaded();
                var o = n.bufferedBytes / n.bytesTotal * n.duration;
                n.target.buffered = n.buffered = {
                    start: function(e) {
                        return 0
                    },
                    end: function(e) {
                        return o
                    },
                    length: 1
                }
            }
            t.dispatchEvent(n)
        },
        iFrameReady: function() {
            for (this.isLoaded = !0, this.isIframeLoaded = !0; this.iframeQueue.length > 0;) {
                var e = this.iframeQueue.pop();
                this.createIframe(e)
            }
        },
        flashPlayers: {},
        createFlash: function(e) {
            this.flashPlayers[e.pluginId] = e;
            var t, i = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + e.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
            mejs.MediaFeatures.isIE ? (t = document.createElement("div"), e.container.appendChild(t), t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + e.pluginId + '" width="' + e.width + '" height="' + e.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' + options.flashScriptAccess + '" /><param name="allowFullScreen" value="true" /></object>') : e.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + e.pluginId + '" data="' + i + '" width="' + e.width + '" height="' + e.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="' + options.flashScriptAccess + '"><param name="wmode" value="transparent"></object>'
        },
        flashReady: function(e) {
            var t = this.flashPlayers[e],
                i = document.getElementById(e),
                n = t.pluginMediaElement;
            n.pluginApi = n.pluginElement = i, mejs.MediaPluginBridge.initPlugin(e), i.cueVideoById(t.videoId);
            var o = t.containerId + "_callback";
            window[o] = function(e) {
                mejs.YouTubeApi.handleStateChange(e, i, n)
            }, i.addEventListener("onStateChange", o), setInterval(function() {
                mejs.YouTubeApi.createEvent(i, n, "timeupdate")
            }, 250), mejs.YouTubeApi.createEvent(i, n, "canplay")
        },
        handleStateChange: function(e, t, i) {
            switch (e) {
                case -1:
                    i.paused = !0, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "loadedmetadata");
                    break;
                case 0:
                    i.paused = !1, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "ended");
                    break;
                case 1:
                    i.paused = !1, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "play"), mejs.YouTubeApi.createEvent(t, i, "playing");
                    break;
                case 2:
                    i.paused = !0, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "pause");
                    break;
                case 3:
                    mejs.YouTubeApi.createEvent(t, i, "progress");
                    break;
                case 5:
            }
        }
    }, window.onYouTubePlayerAPIReady = function() {
        mejs.YouTubeApi.iFrameReady()
    }, window.onYouTubePlayerReady = function(e) {
        mejs.YouTubeApi.flashReady(e)
    }, window.mejs = mejs, window.MediaElement = mejs.MediaElement,
    function(e, t, i) {
        "use strict";
        var n = {
            locale: {
                language: t.i18n && t.i18n.locale.language || "",
                strings: t.i18n && t.i18n.locale.strings || {}
            },
            ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
            methods: {}
        };
        n.getLanguage = function() {
            var e = n.locale.language || window.navigator.userLanguage || window.navigator.language;
            return n.ietf_lang_regex.exec(e) ? e : null
        }, "undefined" != typeof mejsL10n && (n.locale.language = mejsL10n.language), n.methods.checkPlain = function(e) {
            var t, i, n = {
                "&": "&amp;",
                '"': "&quot;",
                "<": "&lt;",
                ">": "&gt;"
            };
            e = String(e);
            for (t in n) n.hasOwnProperty(t) && (i = new RegExp(t, "g"), e = e.replace(i, n[t]));
            return e
        }, n.methods.t = function(e, t) {
            return n.locale.strings && n.locale.strings[t.context] && n.locale.strings[t.context][e] && (e = n.locale.strings[t.context][e]), n.methods.checkPlain(e)
        }, n.t = function(e, t) {
            if ("string" == typeof e && e.length > 0) {
                var i = n.getLanguage();
                return t = t || {
                    context: i
                }, n.methods.t(e, t)
            }
            throw {
                name: "InvalidArgumentException",
                message: "First argument is either not a string or empty."
            }
        }, t.i18n = n
    }(document, mejs),
    function(e, t) {
        "use strict";
        "undefined" != typeof mejsL10n && (e[mejsL10n.language] = mejsL10n.strings)
    }(mejs.i18n.locale.strings), "undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof Zepto ? (mejs.$ = Zepto, Zepto.fn.outerWidth = function(e) {
        var t = $(this).width();
        return e && (t += parseInt($(this).css("margin-right"), 10), t += parseInt($(this).css("margin-left"), 10)), t
    }) : "undefined" != typeof ender && (mejs.$ = ender),
    function(e) {
        mejs.MepDefaults = {
                poster: "",
                showPosterWhenEnded: !1,
                defaultVideoWidth: 480,
                defaultVideoHeight: 270,
                videoWidth: -1,
                videoHeight: -1,
                defaultAudioWidth: 400,
                defaultAudioHeight: 30,
                defaultSeekBackwardInterval: function(e) {
                    return .05 * e.duration
                },
                defaultSeekForwardInterval: function(e) {
                    return .05 * e.duration
                },
                setDimensions: !0,
                audioWidth: -1,
                audioHeight: -1,
                startVolume: .8,
                loop: !1,
                autoRewind: !0,
                enableAutosize: !0,
                timeFormat: "",
                alwaysShowHours: !1,
                showTimecodeFrameCount: !1,
                framesPerSecond: 25,
                autosizeProgress: !0,
                alwaysShowControls: !1,
                hideVideoControlsOnLoad: !1,
                clickToPlayPause: !0,
                iPadUseNativeControls: !1,
                iPhoneUseNativeControls: !1,
                AndroidUseNativeControls: !1,
                features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
                isVideo: !0,
                enableKeyboard: !0,
                pauseOtherPlayers: !0,
                keyActions: [{
                    keys: [32, 179],
                    action: function(e, t) {
                        t.paused || t.ended ? t.play() : t.pause()
                    }
                }, {
                    keys: [38],
                    action: function(e, t) {
                        e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                        var i = Math.min(t.volume + .1, 1);
                        t.setVolume(i)
                    }
                }, {
                    keys: [40],
                    action: function(e, t) {
                        e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                        var i = Math.max(t.volume - .1, 0);
                        t.setVolume(i)
                    }
                }, {
                    keys: [37, 227],
                    action: function(e, t) {
                        if (!isNaN(t.duration) && t.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer());
                            var i = Math.max(t.currentTime - e.options.defaultSeekBackwardInterval(t), 0);
                            t.setCurrentTime(i)
                        }
                    }
                }, {
                    keys: [39, 228],
                    action: function(e, t) {
                        if (!isNaN(t.duration) && t.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer());
                            var i = Math.min(t.currentTime + e.options.defaultSeekForwardInterval(t), t.duration);
                            t.setCurrentTime(i)
                        }
                    }
                }, {
                    keys: [70],
                    action: function(e, t) {
                        "undefined" != typeof e.enterFullScreen && (e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen())
                    }
                }, {
                    keys: [77],
                    action: function(e, t) {
                        e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer()), e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
                    }
                }]
            }, mejs.mepIndex = 0, mejs.players = {}, mejs.MediaElementPlayer = function(t, i) {
                if (!(this instanceof mejs.MediaElementPlayer)) return new mejs.MediaElementPlayer(t, i);
                var n = this;
                return n.$media = n.$node = e(t), n.node = n.media = n.$media[0], n.node ? "undefined" != typeof n.node.player ? n.node.player : ("undefined" == typeof i && (i = n.$node.data("mejsoptions")), n.options = e.extend({}, mejs.MepDefaults, i), n.options.timeFormat || (n.options.timeFormat = "mm:ss", n.options.alwaysShowHours && (n.options.timeFormat = "hh:mm:ss"), n.options.showTimecodeFrameCount && (n.options.timeFormat += ":ff")), mejs.Utility.calculateTimeFormat(0, n.options, n.options.framesPerSecond || 25), n.id = "mep_" + mejs.mepIndex++, mejs.players[n.id] = n, n.init(), n) : void 0
            }, mejs.MediaElementPlayer.prototype = {
                hasFocus: !1,
                controlsAreVisible: !0,
                init: function() {
                    var t = this,
                        i = mejs.MediaFeatures,
                        n = e.extend(!0, {}, t.options, {
                            success: function(e, i) {
                                t.meReady(e, i)
                            },
                            error: function(e) {
                                t.handleError(e)
                            }
                        }),
                        o = t.media.tagName.toLowerCase();
                    if (t.isDynamic = "audio" !== o && "video" !== o, t.isDynamic ? t.isVideo = t.options.isVideo : t.isVideo = "audio" !== o && t.options.isVideo, i.isiPad && t.options.iPadUseNativeControls || i.isiPhone && t.options.iPhoneUseNativeControls) t.$media.attr("controls", "controls"), i.isiPad && null !== t.media.getAttribute("autoplay") && t.play();
                    else if (i.isAndroid && t.options.AndroidUseNativeControls);
                    else {
                        t.$media.removeAttr("controls");
                        var s = t.isVideo ? mejs.i18n.t("Video Player") : mejs.i18n.t("Audio Player");
                        if (e('<span class="mejs-offscreen">' + s + "</span>").insertBefore(t.$media), t.container = e('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '" tabindex="0" role="application" aria-label="' + s + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media).focus(function(e) {
                                if (!t.controlsAreVisible) {
                                    t.showControls(!0);
                                    var i = t.container.find(".mejs-playpause-button > button");
                                    i.focus()
                                }
                            }), t.container.addClass((i.isAndroid ? "mejs-android " : "") + (i.isiOS ? "mejs-ios " : "") + (i.isiPad ? "mejs-ipad " : "") + (i.isiPhone ? "mejs-iphone " : "") + (t.isVideo ? "mejs-video " : "mejs-audio ")), i.isiOS) {
                            var a = t.$media.clone();
                            t.container.find(".mejs-mediaelement").append(a), t.$media.remove(), t.$node = t.$media = a, t.node = t.media = a[0]
                        } else t.container.find(".mejs-mediaelement").append(t.$media);
                        t.node.player = t, t.controls = t.container.find(".mejs-controls"), t.layers = t.container.find(".mejs-layers");
                        var r = t.isVideo ? "video" : "audio",
                            l = r.substring(0, 1).toUpperCase() + r.substring(1);
                        t.options[r + "Width"] > 0 || t.options[r + "Width"].toString().indexOf("%") > -1 ? t.width = t.options[r + "Width"] : "" !== t.media.style.width && null !== t.media.style.width ? t.width = t.media.style.width : null !== t.media.getAttribute("width") ? t.width = t.$media.attr("width") : t.width = t.options["default" + l + "Width"], t.options[r + "Height"] > 0 || t.options[r + "Height"].toString().indexOf("%") > -1 ? t.height = t.options[r + "Height"] : "" !== t.media.style.height && null !== t.media.style.height ? t.height = t.media.style.height : null !== t.$media[0].getAttribute("height") ? t.height = t.$media.attr("height") : t.height = t.options["default" + l + "Height"], t.setPlayerSize(t.width, t.height), n.pluginWidth = t.width, n.pluginHeight = t.height
                    }
                    mejs.MediaElement(t.$media[0], n), "undefined" != typeof t.container && t.controlsAreVisible && t.container.trigger("controlsshown")
                },
                showControls: function(e) {
                    var t = this;
                    e = "undefined" == typeof e || e, t.controlsAreVisible || (e ? (t.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200, function() {
                        t.controlsAreVisible = !0, t.container.trigger("controlsshown")
                    }), t.container.find(".mejs-control").css("visibility", "visible").stop(!0, !0).fadeIn(200, function() {
                        t.controlsAreVisible = !0
                    })) : (t.controls.css("visibility", "visible").css("display", "block"), t.container.find(".mejs-control").css("visibility", "visible").css("display", "block"), t.controlsAreVisible = !0, t.container.trigger("controlsshown")), t.setControlsSize())
                },
                hideControls: function(t) {
                    var i = this;
                    t = "undefined" == typeof t || t, !i.controlsAreVisible || i.options.alwaysShowControls || i.keyboardAction || (t ? (i.controls.stop(!0, !0).fadeOut(200, function() {
                        e(this).css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")
                    }), i.container.find(".mejs-control").stop(!0, !0).fadeOut(200, function() {
                        e(this).css("visibility", "hidden").css("display", "block")
                    })) : (i.controls.css("visibility", "hidden").css("display", "block"), i.container.find(".mejs-control").css("visibility", "hidden").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")))
                },
                controlsTimer: null,
                startControlsTimer: function(e) {
                    var t = this;
                    e = "undefined" != typeof e ? e : 1500, t.killControlsTimer("start"), t.controlsTimer = setTimeout(function() {
                        t.hideControls(), t.killControlsTimer("hide")
                    }, e)
                },
                killControlsTimer: function(e) {
                    var t = this;
                    null !== t.controlsTimer && (clearTimeout(t.controlsTimer), delete t.controlsTimer, t.controlsTimer = null)
                },
                controlsEnabled: !0,
                disableControls: function() {
                    var e = this;
                    e.killControlsTimer(), e.hideControls(!1), this.controlsEnabled = !1
                },
                enableControls: function() {
                    var e = this;
                    e.showControls(!1), e.controlsEnabled = !0
                },
                meReady: function(t, i) {
                    var n, o, s = this,
                        a = mejs.MediaFeatures,
                        r = i.getAttribute("autoplay"),
                        l = !("undefined" == typeof r || null === r || "false" === r);
                    if (!s.created) {
                        if (s.created = !0, s.media = t, s.domNode = i, !(a.isAndroid && s.options.AndroidUseNativeControls || a.isiPad && s.options.iPadUseNativeControls || a.isiPhone && s.options.iPhoneUseNativeControls)) {
                            s.buildposter(s, s.controls, s.layers, s.media), s.buildkeyboard(s, s.controls, s.layers, s.media), s.buildoverlays(s, s.controls, s.layers, s.media), s.findTracks();
                            for (n in s.options.features)
                                if (o = s.options.features[n], s["build" + o]) try {
                                    s["build" + o](s, s.controls, s.layers, s.media)
                                } catch (d) {}
                            s.container.trigger("controlsready"), s.setPlayerSize(s.width, s.height), s.setControlsSize(), s.isVideo && (mejs.MediaFeatures.hasTouch ? s.$media.bind("touchstart", function() {
                                s.controlsAreVisible ? s.hideControls(!1) : s.controlsEnabled && s.showControls(!1)
                            }) : (s.clickToPlayPauseCallback = function() {
                                s.options.clickToPlayPause && (s.media.paused ? s.play() : s.pause())
                            }, s.media.addEventListener("click", s.clickToPlayPauseCallback, !1), s.container.bind("mouseenter", function() {
                                s.controlsEnabled && (s.options.alwaysShowControls || (s.killControlsTimer("enter"), s.showControls(), s.startControlsTimer(2500)))
                            }).bind("mousemove", function() {
                                s.controlsEnabled && (s.controlsAreVisible || s.showControls(), s.options.alwaysShowControls || s.startControlsTimer(2500))
                            }).bind("mouseleave", function() {
                                s.controlsEnabled && (s.media.paused || s.options.alwaysShowControls || s.startControlsTimer(1e3))
                            })), s.options.hideVideoControlsOnLoad && s.hideControls(!1), l && !s.options.alwaysShowControls && s.hideControls(), s.options.enableAutosize && s.media.addEventListener("loadedmetadata", function(e) {
                                s.options.videoHeight <= 0 && null === s.domNode.getAttribute("height") && !isNaN(e.target.videoHeight) && (s.setPlayerSize(e.target.videoWidth, e.target.videoHeight), s.setControlsSize(), s.media.setVideoSize(e.target.videoWidth, e.target.videoHeight))
                            }, !1)), t.addEventListener("play", function() {
                                var e;
                                for (e in mejs.players) {
                                    var t = mejs.players[e];
                                    t.id == s.id || !s.options.pauseOtherPlayers || t.paused || t.ended || t.pause(), t.hasFocus = !1
                                }
                                s.hasFocus = !0
                            }, !1), s.media.addEventListener("ended", function(t) {
                                if (s.options.autoRewind) try {
                                    s.media.setCurrentTime(0), window.setTimeout(function() {
                                        e(s.container).find(".mejs-overlay-loading").parent().hide()
                                    }, 20)
                                } catch (i) {}
                                s.media.pause(), s.setProgressRail && s.setProgressRail(), s.setCurrentRail && s.setCurrentRail(), s.options.loop ? s.play() : !s.options.alwaysShowControls && s.controlsEnabled && s.showControls()
                            }, !1), s.media.addEventListener("loadedmetadata", function(e) {
                                s.updateDuration && s.updateDuration(), s.updateCurrent && s.updateCurrent(), s.isFullScreen || (s.setPlayerSize(s.width, s.height), s.setControlsSize())
                            }, !1);
                            var c = null;
                            s.media.addEventListener("timeupdate", function() {
                                c !== this.duration && (c = this.duration, mejs.Utility.calculateTimeFormat(c, s.options, s.options.framesPerSecond || 25))
                            }, !1), s.container.focusout(function(t) {
                                if (t.relatedTarget) {
                                    var i = e(t.relatedTarget);
                                    s.keyboardAction && 0 === i.parents(".mejs-container").length && (s.keyboardAction = !1, s.hideControls(!0))
                                }
                            }), setTimeout(function() {
                                s.setPlayerSize(s.width, s.height), s.setControlsSize()
                            }, 50), s.globalBind("resize", function() {
                                s.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || s.setPlayerSize(s.width, s.height), s.setControlsSize()
                            }), "youtube" == s.media.pluginType && (a.isiOS || a.isAndroid) && s.container.find(".mejs-overlay-play").hide()
                        }
                        l && "native" == t.pluginType && s.play(), s.options.success && ("string" == typeof s.options.success ? window[s.options.success](s.media, s.domNode, s) : s.options.success(s.media, s.domNode, s))
                    }
                },
                handleError: function(e) {
                    var t = this;
                    t.controls.hide(), t.options.error && t.options.error(e)
                },
                setPlayerSize: function(t, i) {
                    var n = this;
                    if (!n.options.setDimensions) return !1;
                    if ("undefined" != typeof t && (n.width = t), "undefined" != typeof i && (n.height = i), n.height.toString().indexOf("%") > 0 || "none" !== n.$node.css("max-width") && "t.width" !== n.$node.css("max-width") || n.$node[0].currentStyle && "100%" === n.$node[0].currentStyle.maxWidth) {
                        var o = function() {
                                return n.isVideo ? n.media.videoWidth && n.media.videoWidth > 0 ? n.media.videoWidth : null !== n.media.getAttribute("width") ? n.media.getAttribute("width") : n.options.defaultVideoWidth : n.options.defaultAudioWidth
                            }(),
                            s = function() {
                                return n.isVideo ? n.media.videoHeight && n.media.videoHeight > 0 ? n.media.videoHeight : null !== n.media.getAttribute("height") ? n.media.getAttribute("height") : n.options.defaultVideoHeight : n.options.defaultAudioHeight
                            }(),
                            a = n.container.parent().closest(":visible").width(),
                            r = n.container.parent().closest(":visible").height(),
                            l = n.isVideo || !n.options.autosizeProgress ? parseInt(a * s / o, 10) : s;
                        isNaN(l) && (l = r), n.container.parent().length > 0 && "body" === n.container.parent()[0].tagName.toLowerCase() && (a = e(window).width(), l = e(window).height()), l && a && (n.container.width(a).height(l), n.$media.add(n.container.find(".mejs-shim")).width("100%").height("100%"), n.isVideo && n.media.setVideoSize && n.media.setVideoSize(a, l), n.layers.children(".mejs-layer").width("100%").height("100%"))
                    } else n.container.width(n.width).height(n.height), n.layers.children(".mejs-layer").width(n.width).height(n.height)
                },
                setControlsSize: function() {
                    var t = this,
                        i = 0,
                        n = 0,
                        o = t.controls.find(".mejs-time-rail"),
                        s = t.controls.find(".mejs-time-total"),
                        a = o.siblings(),
                        r = a.last(),
                        l = null;
                    if (t.container.is(":visible") && o.length && o.is(":visible")) {
                        t.options && !t.options.autosizeProgress && (n = parseInt(o.css("width"), 10)), 0 !== n && n || (a.each(function() {
                            var t = e(this);
                            "absolute" != t.css("position") && t.is(":visible") && (i += e(this).outerWidth(!0))
                        }), n = t.controls.width() - i - (o.outerWidth(!0) - o.width()));
                        do o.width(n), s.width(n - (s.outerWidth(!0) - s.width())), "absolute" != r.css("position") && (l = r.length ? r.position() : null, n--); while (null !== l && l.top > 0 && n > 0);
                        t.container.trigger("controlsresize")
                    }
                },
                buildposter: function(t, i, n, o) {
                    var s = this,
                        a = e('<div class="mejs-poster mejs-layer"></div>').appendTo(n),
                        r = t.$media.attr("poster");
                    "" !== t.options.poster && (r = t.options.poster), r ? s.setPoster(r) : a.hide(), o.addEventListener("play", function() {
                        a.hide()
                    }, !1), t.options.showPosterWhenEnded && t.options.autoRewind && o.addEventListener("ended", function() {
                        a.show()
                    }, !1)
                },
                setPoster: function(t) {
                    var i = this,
                        n = i.container.find(".mejs-poster"),
                        o = n.find("img");
                    0 === o.length && (o = e('<img width="100%" height="100%" alt="" />').appendTo(n)), o.attr("src", t), n.css({
                        "background-image": "url(" + t + ")"
                    })
                },
                buildoverlays: function(t, i, n, o) {
                    var s = this;
                    if (t.isVideo) {
                        var a = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(n),
                            r = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(n),
                            l = e('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(n).bind("click", function() {
                                s.options.clickToPlayPause && o.paused && o.play()
                            });
                        o.addEventListener("play", function() {
                            l.hide(), a.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                        }, !1), o.addEventListener("playing", function() {
                            l.hide(), a.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                        }, !1), o.addEventListener("seeking", function() {
                            a.show(), i.find(".mejs-time-buffering").show()
                        }, !1), o.addEventListener("seeked", function() {
                            a.hide(), i.find(".mejs-time-buffering").hide()
                        }, !1), o.addEventListener("pause", function() {
                            mejs.MediaFeatures.isiPhone || l.show()
                        }, !1), o.addEventListener("waiting", function() {
                            a.show(), i.find(".mejs-time-buffering").show()
                        }, !1), o.addEventListener("loadeddata", function() {
                            a.show(), i.find(".mejs-time-buffering").show(), mejs.MediaFeatures.isAndroid && (o.canplayTimeout = window.setTimeout(function() {
                                if (document.createEvent) {
                                    var e = document.createEvent("HTMLEvents");
                                    return e.initEvent("canplay", !0, !0), o.dispatchEvent(e)
                                }
                            }, 300))
                        }, !1), o.addEventListener("canplay", function() {
                            a.hide(), i.find(".mejs-time-buffering").hide(), clearTimeout(o.canplayTimeout)
                        }, !1), o.addEventListener("error", function(e) {
                            s.handleError(e), a.hide(), l.hide(), r.show(), r.find(".mejs-overlay-error").html("Error loading this resource")
                        }, !1), o.addEventListener("keydown", function(e) {
                            s.onkeydown(t, o, e)
                        }, !1)
                    }
                },
                buildkeyboard: function(t, i, n, o) {
                    var s = this;
                    s.container.keydown(function() {
                        s.keyboardAction = !0
                    }), s.globalBind("keydown", function(i) {
                        return t.hasFocus = 0 !== e(i.target).closest(".mejs-container").length, s.onkeydown(t, o, i)
                    }), s.globalBind("click", function(i) {
                        t.hasFocus = 0 !== e(i.target).closest(".mejs-container").length
                    })
                },
                onkeydown: function(e, t, i) {
                    if (e.hasFocus && e.options.enableKeyboard)
                        for (var n = 0, o = e.options.keyActions.length; o > n; n++)
                            for (var s = e.options.keyActions[n], a = 0, r = s.keys.length; r > a; a++)
                                if (i.keyCode == s.keys[a]) return "function" == typeof i.preventDefault && i.preventDefault(), s.action(e, t, i.keyCode), !1;
                    return !0
                },
                findTracks: function() {
                    var t = this,
                        i = t.$media.find("track");
                    t.tracks = [], i.each(function(i, n) {
                        n = e(n), t.tracks.push({
                            srclang: n.attr("srclang") ? n.attr("srclang").toLowerCase() : "",
                            src: n.attr("src"),
                            kind: n.attr("kind"),
                            label: n.attr("label") || "",
                            entries: [],
                            isLoaded: !1
                        })
                    })
                },
                changeSkin: function(e) {
                    this.container[0].className = "mejs-container " + e, this.setPlayerSize(this.width, this.height), this.setControlsSize()
                },
                play: function() {
                    this.load(), this.media.play()
                },
                pause: function() {
                    try {
                        this.media.pause()
                    } catch (e) {}
                },
                load: function() {
                    this.isLoaded || this.media.load(), this.isLoaded = !0
                },
                setMuted: function(e) {
                    this.media.setMuted(e)
                },
                setCurrentTime: function(e) {
                    this.media.setCurrentTime(e)
                },
                getCurrentTime: function() {
                    return this.media.currentTime
                },
                setVolume: function(e) {
                    this.media.setVolume(e)
                },
                getVolume: function() {
                    return this.media.volume
                },
                setSrc: function(e) {
                    this.media.setSrc(e)
                },
                remove: function() {
                    var e, t, i = this;
                    i.container.prev(".mejs-offscreen").remove();
                    for (e in i.options.features)
                        if (t = i.options.features[e], i["clean" + t]) try {
                            i["clean" + t](i)
                        } catch (n) {}
                    i.isDynamic ? i.$node.insertBefore(i.container) : (i.$media.prop("controls", !0), i.$node.clone().insertBefore(i.container).show(), i.$node.remove()), "native" !== i.media.pluginType && i.media.remove(), delete mejs.players[i.id], "object" == typeof i.container && i.container.remove(), i.globalUnbind(), delete i.node.player
                },
                rebuildtracks: function() {
                    var e = this;
                    e.findTracks(), e.buildtracks(e, e.controls, e.layers, e.media)
                },
                resetSize: function() {
                    var e = this;
                    setTimeout(function() {
                        e.setPlayerSize(e.width, e.height), e.setControlsSize()
                    }, 50)
                }
            },
            function() {
                function t(t, n) {
                    var o = {
                        d: [],
                        w: []
                    };
                    return e.each((t || "").split(" "), function(e, t) {
                        var s = t + "." + n;
                        0 === s.indexOf(".") ? (o.d.push(s),
                            o.w.push(s)) : o[i.test(t) ? "w" : "d"].push(s)
                    }), o.d = o.d.join(" "), o.w = o.w.join(" "), o
                }
                var i = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
                mejs.MediaElementPlayer.prototype.globalBind = function(i, n, o) {
                    var s = this,
                        a = s.node ? s.node.ownerDocument : document;
                    i = t(i, s.id), i.d && e(a).bind(i.d, n, o), i.w && e(window).bind(i.w, n, o)
                }, mejs.MediaElementPlayer.prototype.globalUnbind = function(i, n) {
                    var o = this,
                        s = o.node ? o.node.ownerDocument : document;
                    i = t(i, o.id), i.d && e(s).unbind(i.d, n), i.w && e(window).unbind(i.w, n)
                }
            }(), "undefined" != typeof e && (e.fn.mediaelementplayer = function(t) {
                return t === !1 ? this.each(function() {
                    var t = e(this).data("mediaelementplayer");
                    t && t.remove(), e(this).removeData("mediaelementplayer")
                }) : this.each(function() {
                    e(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, t))
                }), this
            }, e(document).ready(function() {
                e(".mejs-player").mediaelementplayer()
            })), window.MediaElementPlayer = mejs.MediaElementPlayer
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            playText: mejs.i18n.t("Play"),
            pauseText: mejs.i18n.t("Pause")
        }), e.extend(MediaElementPlayer.prototype, {
            buildplaypause: function(t, i, n, o) {
                function s(e) {
                    "play" === e ? (l.removeClass("mejs-play").addClass("mejs-pause"), d.attr({
                        title: r.pauseText,
                        "aria-label": r.pauseText
                    })) : (l.removeClass("mejs-pause").addClass("mejs-play"), d.attr({
                        title: r.playText,
                        "aria-label": r.playText
                    }))
                }
                var a = this,
                    r = a.options,
                    l = e('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + a.id + '" title="' + r.playText + '" aria-label="' + r.playText + '"></button></div>').appendTo(i).click(function(e) {
                        return e.preventDefault(), o.paused ? o.play() : o.pause(), !1
                    }),
                    d = l.find("button");
                s("pse"), o.addEventListener("play", function() {
                    s("play")
                }, !1), o.addEventListener("playing", function() {
                    s("play")
                }, !1), o.addEventListener("pause", function() {
                    s("pse")
                }, !1), o.addEventListener("paused", function() {
                    s("pse")
                }, !1)
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            stopText: "Stop"
        }), e.extend(MediaElementPlayer.prototype, {
            buildstop: function(t, i, n, o) {
                var s = this;
                e('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + s.id + '" title="' + s.options.stopText + '" aria-label="' + s.options.stopText + '"></button></div>').appendTo(i).click(function() {
                    o.paused || o.pause(), o.currentTime > 0 && (o.setCurrentTime(0), o.pause(), i.find(".mejs-time-current").width("0px"), i.find(".mejs-time-handle").css("left", "0px"), i.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0, t.options)), i.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0, t.options)), n.find(".mejs-poster").show())
                })
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            progessHelpText: mejs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")
        }), e.extend(MediaElementPlayer.prototype, {
            buildprogress: function(t, i, n, o) {
                e('<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(i), i.find(".mejs-time-buffering").hide();
                var s = this,
                    a = i.find(".mejs-time-total"),
                    r = i.find(".mejs-time-loaded"),
                    l = i.find(".mejs-time-current"),
                    d = i.find(".mejs-time-handle"),
                    c = i.find(".mejs-time-float"),
                    u = i.find(".mejs-time-float-current"),
                    h = i.find(".mejs-time-slider"),
                    p = function(e) {
                        var i, n = a.offset(),
                            s = a.width(),
                            r = 0,
                            l = 0,
                            d = 0;
                        i = e.originalEvent && e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : e.pageX, o.duration && (i < n.left ? i = n.left : i > s + n.left && (i = s + n.left), d = i - n.left, r = d / s, l = .02 >= r ? 0 : r * o.duration, m && l !== o.currentTime && o.setCurrentTime(l), mejs.MediaFeatures.hasTouch || (c.css("left", d), u.html(mejs.Utility.secondsToTimeCode(l, t.options)), c.show()))
                    },
                    m = !1,
                    f = !1,
                    g = 0,
                    v = !1,
                    y = t.options.autoRewind,
                    b = function(e) {
                        var i = o.currentTime,
                            n = mejs.i18n.t("Time Slider"),
                            s = mejs.Utility.secondsToTimeCode(i, t.options),
                            a = o.duration;
                        h.attr({
                            "aria-label": n,
                            "aria-valuemin": 0,
                            "aria-valuemax": a,
                            "aria-valuenow": i,
                            "aria-valuetext": s,
                            role: "slider",
                            tabindex: 0
                        })
                    },
                    w = function() {
                        var e = new Date;
                        e - g >= 1e3 && o.play()
                    };
                h.bind("focus", function(e) {
                    t.options.autoRewind = !1
                }), h.bind("blur", function(e) {
                    t.options.autoRewind = y
                }), h.bind("keydown", function(e) {
                    new Date - g >= 1e3 && (v = o.paused);
                    var t = e.keyCode,
                        i = o.duration,
                        n = o.currentTime;
                    switch (t) {
                        case 37:
                            n -= 1;
                            break;
                        case 39:
                            n += 1;
                            break;
                        case 38:
                            n += Math.floor(.1 * i);
                            break;
                        case 40:
                            n -= Math.floor(.1 * i);
                            break;
                        case 36:
                            n = 0;
                            break;
                        case 35:
                            n = i;
                            break;
                        case 10:
                            return void(o.paused ? o.play() : o.pause());
                        case 13:
                            return void(o.paused ? o.play() : o.pause());
                        default:
                            return
                    }
                    return n = 0 > n ? 0 : n >= i ? i : Math.floor(n), g = new Date, v || o.pause(), n < o.duration && !v && setTimeout(w, 1100), o.setCurrentTime(n), e.preventDefault(), e.stopPropagation(), !1
                }), a.bind("mousedown touchstart", function(e) {
                    (1 === e.which || 0 === e.which) && (m = !0, p(e), s.globalBind("mousemove.dur touchmove.dur", function(e) {
                        p(e)
                    }), s.globalBind("mouseup.dur touchend.dur", function(e) {
                        m = !1, c.hide(), s.globalUnbind(".dur")
                    }))
                }).bind("mouseenter", function(e) {
                    f = !0, s.globalBind("mousemove.dur", function(e) {
                        p(e)
                    }), mejs.MediaFeatures.hasTouch || c.show()
                }).bind("mouseleave", function(e) {
                    f = !1, m || (s.globalUnbind(".dur"), c.hide())
                }), o.addEventListener("progress", function(e) {
                    t.setProgressRail(e), t.setCurrentRail(e)
                }, !1), o.addEventListener("timeupdate", function(e) {
                    t.setProgressRail(e), t.setCurrentRail(e), b(e)
                }, !1), s.container.on("controlsresize", function() {
                    t.setProgressRail(), t.setCurrentRail()
                }), s.loaded = r, s.total = a, s.current = l, s.handle = d
            },
            setProgressRail: function(e) {
                var t = this,
                    i = void 0 !== e ? e.target : t.media,
                    n = null;
                i && i.buffered && i.buffered.length > 0 && i.buffered.end && i.duration ? n = i.buffered.end(i.buffered.length - 1) / i.duration : i && void 0 !== i.bytesTotal && i.bytesTotal > 0 && void 0 !== i.bufferedBytes ? n = i.bufferedBytes / i.bytesTotal : e && e.lengthComputable && 0 !== e.total && (n = e.loaded / e.total), null !== n && (n = Math.min(1, Math.max(0, n)), t.loaded && t.total && t.loaded.width(t.total.width() * n))
            },
            setCurrentRail: function() {
                var e = this;
                if (void 0 !== e.media.currentTime && e.media.duration && e.total && e.handle) {
                    var t = Math.round(e.total.width() * e.media.currentTime / e.media.duration),
                        i = t - Math.round(e.handle.outerWidth(!0) / 2);
                    e.current.width(t), e.handle.css("left", i)
                }
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            duration: -1,
            timeAndDurationSeparator: "<span> | </span>"
        }), e.extend(MediaElementPlayer.prototype, {
            buildcurrent: function(t, i, n, o) {
                var s = this;
                e('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' + mejs.Utility.secondsToTimeCode(0, t.options) + "</span></div>").appendTo(i), s.currenttime = s.controls.find(".mejs-currenttime"), o.addEventListener("timeupdate", function() {
                    t.updateCurrent()
                }, !1)
            },
            buildduration: function(t, i, n, o) {
                var s = this;
                i.children().last().find(".mejs-currenttime").length > 0 ? e(s.options.timeAndDurationSeparator + '<span class="mejs-duration">' + mejs.Utility.secondsToTimeCode(s.options.duration, s.options) + "</span>").appendTo(i.find(".mejs-time")) : (i.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"), e('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + mejs.Utility.secondsToTimeCode(s.options.duration, s.options) + "</span></div>").appendTo(i)), s.durationD = s.controls.find(".mejs-duration"), o.addEventListener("timeupdate", function() {
                    t.updateDuration()
                }, !1)
            },
            updateCurrent: function() {
                var e = this;
                e.currenttime && e.currenttime.html(mejs.Utility.secondsToTimeCode(e.media.currentTime, e.options))
            },
            updateDuration: function() {
                var e = this;
                e.container.toggleClass("mejs-long-video", e.media.duration > 3600), e.durationD && (e.options.duration > 0 || e.media.duration) && e.durationD.html(mejs.Utility.secondsToTimeCode(e.options.duration > 0 ? e.options.duration : e.media.duration, e.options))
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            muteText: mejs.i18n.t("Mute Toggle"),
            allyVolumeControlText: mejs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),
            hideVolumeOnTouchDevices: !0,
            audioVolume: "horizontal",
            videoVolume: "vertical"
        }), e.extend(MediaElementPlayer.prototype, {
            buildvolume: function(t, i, n, o) {
                if (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS || !this.options.hideVolumeOnTouchDevices) {
                    var s = this,
                        a = s.isVideo ? s.options.videoVolume : s.options.audioVolume,
                        r = "horizontal" == a ? e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + s.id + '" title="' + s.options.muteText + '" aria-label="' + s.options.muteText + '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' + s.options.allyVolumeControlText + '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(i) : e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + s.id + '" title="' + s.options.muteText + '" aria-label="' + s.options.muteText + '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' + s.options.allyVolumeControlText + '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(i),
                        l = s.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                        d = s.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                        c = s.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                        u = s.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                        h = function(e, t) {
                            if (!l.is(":visible") && "undefined" == typeof t) return l.show(), h(e, !0), void l.hide();
                            e = Math.max(0, e), e = Math.min(e, 1), 0 === e ? (r.removeClass("mejs-mute").addClass("mejs-unmute"), r.children("button").attr("title", mejs.i18n.t("Unmute")).attr("aria-label", mejs.i18n.t("Unmute"))) : (r.removeClass("mejs-unmute").addClass("mejs-mute"), r.children("button").attr("title", mejs.i18n.t("Mute")).attr("aria-label", mejs.i18n.t("Mute")));
                            var i = d.position();
                            if ("vertical" == a) {
                                var n = d.height(),
                                    o = n - n * e;
                                u.css("top", Math.round(i.top + o - u.height() / 2)), c.height(n - o), c.css("top", i.top + o)
                            } else {
                                var s = d.width(),
                                    p = s * e;
                                u.css("left", Math.round(i.left + p - u.width() / 2)), c.width(Math.round(p))
                            }
                        },
                        p = function(e) {
                            var t = null,
                                i = d.offset();
                            if ("vertical" === a) {
                                var n = d.height(),
                                    s = e.pageY - i.top;
                                if (t = (n - s) / n, 0 === i.top || 0 === i.left) return
                            } else {
                                var r = d.width(),
                                    l = e.pageX - i.left;
                                t = l / r
                            }
                            t = Math.max(0, t), t = Math.min(t, 1), h(t), 0 === t ? o.setMuted(!0) : o.setMuted(!1), o.setVolume(t)
                        },
                        m = !1,
                        f = !1;
                    r.hover(function() {
                        l.show(), f = !0
                    }, function() {
                        f = !1, m || "vertical" != a || l.hide()
                    });
                    var g = function(e) {
                        var t = Math.floor(100 * o.volume);
                        l.attr({
                            "aria-label": mejs.i18n.t("volumeSlider"),
                            "aria-valuemin": 0,
                            "aria-valuemax": 100,
                            "aria-valuenow": t,
                            "aria-valuetext": t + "%",
                            role: "slider",
                            tabindex: 0
                        })
                    };
                    l.bind("mouseover", function() {
                        f = !0
                    }).bind("mousedown", function(e) {
                        return p(e), s.globalBind("mousemove.vol", function(e) {
                            p(e)
                        }), s.globalBind("mouseup.vol", function() {
                            m = !1, s.globalUnbind(".vol"), f || "vertical" != a || l.hide()
                        }), m = !0, !1
                    }).bind("keydown", function(e) {
                        var t = e.keyCode,
                            i = o.volume;
                        switch (t) {
                            case 38:
                                i += .1;
                                break;
                            case 40:
                                i -= .1;
                                break;
                            default:
                                return !0
                        }
                        return m = !1, h(i), o.setVolume(i), !1
                    }), r.find("button").click(function() {
                        o.setMuted(!o.muted)
                    }), r.find("button").bind("focus", function() {
                        l.show()
                    }), o.addEventListener("volumechange", function(e) {
                        m || (o.muted ? (h(0), r.removeClass("mejs-mute").addClass("mejs-unmute")) : (h(o.volume), r.removeClass("mejs-unmute").addClass("mejs-mute"))), g(e)
                    }, !1), 0 === t.options.startVolume && o.setMuted(!0), "native" === o.pluginType && o.setVolume(t.options.startVolume), s.container.on("controlsresize", function() {
                        h(o.volume)
                    })
                }
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            usePluginFullScreen: !0,
            newWindowCallback: function() {
                return ""
            },
            fullscreenText: mejs.i18n.t("Fullscreen")
        }), e.extend(MediaElementPlayer.prototype, {
            isFullScreen: !1,
            isNativeFullScreen: !1,
            isInIframe: !1,
            buildfullscreen: function(t, i, n, o) {
                if (t.isVideo) {
                    if (t.isInIframe = window.location != window.parent.location, mejs.MediaFeatures.hasTrueNativeFullScreen) {
                        var s = function(e) {
                            t.isFullScreen && (mejs.MediaFeatures.isFullScreen() ? (t.isNativeFullScreen = !0, t.setControlsSize()) : (t.isNativeFullScreen = !1, t.exitFullScreen()))
                        };
                        t.globalBind(mejs.MediaFeatures.fullScreenEventName, s)
                    }
                    var a = this,
                        r = e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.fullscreenText + '" aria-label="' + a.options.fullscreenText + '"></button></div>').appendTo(i);
                    if ("native" === a.media.pluginType || !a.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) r.click(function() {
                        var e = mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || t.isFullScreen;
                        e ? t.exitFullScreen() : t.enterFullScreen()
                    });
                    else {
                        var l = null,
                            d = function() {
                                var e, t = document.createElement("x"),
                                    i = document.documentElement,
                                    n = window.getComputedStyle;
                                return "pointerEvents" in t.style ? (t.style.pointerEvents = "auto", t.style.pointerEvents = "x", i.appendChild(t), e = n && "auto" === n(t, "").pointerEvents, i.removeChild(t), !!e) : !1
                            }();
                        if (d && !mejs.MediaFeatures.isOpera) {
                            var c, u, h = !1,
                                p = function() {
                                    if (h) {
                                        for (var e in m) m[e].hide();
                                        r.css("pointer-events", ""), a.controls.css("pointer-events", ""), a.media.removeEventListener("click", a.clickToPlayPauseCallback), h = !1
                                    }
                                },
                                m = {},
                                f = ["top", "left", "right", "bottom"],
                                g = function() {
                                    var e = r.offset().left - a.container.offset().left,
                                        t = r.offset().top - a.container.offset().top,
                                        i = r.outerWidth(!0),
                                        n = r.outerHeight(!0),
                                        o = a.container.width(),
                                        s = a.container.height();
                                    for (c in m) m[c].css({
                                        position: "absolute",
                                        top: 0,
                                        left: 0
                                    });
                                    m.top.width(o).height(t), m.left.width(e).height(n).css({
                                        top: t
                                    }), m.right.width(o - e - i).height(n).css({
                                        top: t,
                                        left: e + i
                                    }), m.bottom.width(o).height(s - n - t).css({
                                        top: t + n
                                    })
                                };
                            for (a.globalBind("resize", function() {
                                    g()
                                }), c = 0, u = f.length; u > c; c++) m[f[c]] = e('<div class="mejs-fullscreen-hover" />').appendTo(a.container).mouseover(p).hide();
                            r.on("mouseover", function() {
                                if (!a.isFullScreen) {
                                    var e = r.offset(),
                                        i = t.container.offset();
                                    o.positionFullscreenButton(e.left - i.left, e.top - i.top, !1), r.css("pointer-events", "none"), a.controls.css("pointer-events", "none"), a.media.addEventListener("click", a.clickToPlayPauseCallback);
                                    for (c in m) m[c].show();
                                    g(), h = !0
                                }
                            }), o.addEventListener("fullscreenchange", function(e) {
                                a.isFullScreen = !a.isFullScreen, a.isFullScreen ? a.media.removeEventListener("click", a.clickToPlayPauseCallback) : a.media.addEventListener("click", a.clickToPlayPauseCallback), p()
                            }), a.globalBind("mousemove", function(e) {
                                if (h) {
                                    var t = r.offset();
                                    (e.pageY < t.top || e.pageY > t.top + r.outerHeight(!0) || e.pageX < t.left || e.pageX > t.left + r.outerWidth(!0)) && (r.css("pointer-events", ""), a.controls.css("pointer-events", ""), h = !1)
                                }
                            })
                        } else r.on("mouseover", function() {
                            null !== l && (clearTimeout(l), delete l);
                            var e = r.offset(),
                                i = t.container.offset();
                            o.positionFullscreenButton(e.left - i.left, e.top - i.top, !0)
                        }).on("mouseout", function() {
                            null !== l && (clearTimeout(l), delete l), l = setTimeout(function() {
                                o.hideFullscreenButton()
                            }, 1500)
                        })
                    }
                    t.fullscreenBtn = r, a.globalBind("keydown", function(e) {
                        (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || a.isFullScreen) && 27 == e.keyCode && t.exitFullScreen()
                    }), a.normalHeight = 0, a.normalWidth = 0
                }
            },
            cleanfullscreen: function(e) {
                e.exitFullScreen()
            },
            containerSizeTimeout: null,
            enterFullScreen: function() {
                var t = this;
                if ("native" === t.media.pluginType || !mejs.MediaFeatures.isFirefox && !t.options.usePluginFullScreen) {
                    if (e(document.documentElement).addClass("mejs-fullscreen"), t.normalHeight = t.container.height(), t.normalWidth = t.container.width(), "native" === t.media.pluginType)
                        if (mejs.MediaFeatures.hasTrueNativeFullScreen) mejs.MediaFeatures.requestFullScreen(t.container[0]), t.isInIframe && setTimeout(function n() {
                            if (t.isNativeFullScreen) {
                                var i = window.devicePixelRatio || 1,
                                    o = .002,
                                    s = i * e(window).width(),
                                    a = screen.width,
                                    r = i * s;
                                Math.abs(a - s) > Math.abs(a - r) && (s = r);
                                var l = Math.abs(a - s),
                                    d = a * o;
                                l > d ? t.exitFullScreen() : setTimeout(n, 500)
                            }
                        }, 1e3);
                        else if (mejs.MediaFeatures.hasSemiNativeFullScreen) return void t.media.webkitEnterFullscreen();
                    if (t.isInIframe) {
                        var i = t.options.newWindowCallback(this);
                        if ("" !== i) {
                            if (!mejs.MediaFeatures.hasTrueNativeFullScreen) return t.pause(), void window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                            setTimeout(function() {
                                t.isNativeFullScreen || (t.pause(), window.open(i, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                            }, 250)
                        }
                    }
                    t.container.addClass("mejs-container-fullscreen").width("100%").height("100%"), t.containerSizeTimeout = setTimeout(function() {
                        t.container.css({
                            width: "100%",
                            height: "100%"
                        }), t.setControlsSize()
                    }, 500), "native" === t.media.pluginType ? t.$media.width("100%").height("100%") : (t.container.find(".mejs-shim").width("100%").height("100%"), t.media.setVideoSize(e(window).width(), e(window).height())), t.layers.children("div").width("100%").height("100%"), t.fullscreenBtn && t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"), t.setControlsSize(), t.isFullScreen = !0, t.container.find(".mejs-captions-text").css("font-size", screen.width / t.width * 1 * 100 + "%"), t.container.find(".mejs-captions-position").css("bottom", "45px"), t.container.trigger("enteredfullscreen")
                }
            },
            exitFullScreen: function() {
                var t = this;
                return clearTimeout(t.containerSizeTimeout), "native" !== t.media.pluginType && mejs.MediaFeatures.isFirefox ? void t.media.setFullscreen(!1) : (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(), e(document.documentElement).removeClass("mejs-fullscreen"), t.container.removeClass("mejs-container-fullscreen").width(t.normalWidth).height(t.normalHeight), "native" === t.media.pluginType ? t.$media.width(t.normalWidth).height(t.normalHeight) : (t.container.find(".mejs-shim").width(t.normalWidth).height(t.normalHeight), t.media.setVideoSize(t.normalWidth, t.normalHeight)), t.layers.children("div").width(t.normalWidth).height(t.normalHeight), t.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"), t.setControlsSize(), t.isFullScreen = !1, t.container.find(".mejs-captions-text").css("font-size", ""), t.container.find(".mejs-captions-position").css("bottom", ""), void t.container.trigger("exitedfullscreen"))
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            speeds: ["2.00", "1.50", "1.25", "1.00", "0.75"],
            defaultSpeed: "1.00",
            speedChar: "x"
        }), e.extend(MediaElementPlayer.prototype, {
            buildspeed: function(t, i, n, o) {
                var s = this;
                if ("native" == s.media.pluginType) {
                    for (var a = null, r = null, l = null, d = null, c = [], u = !1, h = 0, p = s.options.speeds.length; p > h; h++) {
                        var m = s.options.speeds[h];
                        "string" == typeof m ? (c.push({
                            name: m + s.options.speedChar,
                            value: m
                        }), m === s.options.defaultSpeed && (u = !0)) : (c.push(m), m.value === s.options.defaultSpeed && (u = !0))
                    }
                    u || c.push({
                        name: s.options.defaultSpeed + s.options.speedChar,
                        value: s.options.defaultSpeed
                    }), c.sort(function(e, t) {
                        return parseFloat(t.value) - parseFloat(e.value)
                    });
                    var f = function(e) {
                            for (h = 0, p = c.length; p > h; h++)
                                if (c[h].value === e) return c[h].name
                        },
                        g = '<div class="mejs-button mejs-speed-button"><button type="button">' + f(s.options.defaultSpeed) + '</button><div class="mejs-speed-selector"><ul>';
                    for (h = 0, il = c.length; h < il; h++) d = s.id + "-speed-" + c[h].value, g += '<li><input type="radio" name="speed" value="' + c[h].value + '" id="' + d + '" ' + (c[h].value === s.options.defaultSpeed ? " checked" : "") + ' /><label for="' + d + '" ' + (c[h].value === s.options.defaultSpeed ? ' class="mejs-speed-selected"' : "") + ">" + c[h].name + "</label></li>";
                    g += "</ul></div></div>", a = e(g).appendTo(i), r = a.find(".mejs-speed-selector"), l = s.options.defaultSpeed, o.addEventListener("loadedmetadata", function(e) {
                        l && (o.playbackRate = parseFloat(l))
                    }, !0), r.on("click", 'input[type="radio"]', function() {
                        var t = e(this).attr("value");
                        l = t, o.playbackRate = parseFloat(t), a.find("button").html(f(t)), a.find(".mejs-speed-selected").removeClass("mejs-speed-selected"), a.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")
                    }), a.one("mouseenter focusin", function() {
                        r.height(a.find(".mejs-speed-selector ul").outerHeight(!0) + a.find(".mejs-speed-translations").outerHeight(!0)).css("top", -1 * r.height() + "px")
                    })
                }
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            startLanguage: "",
            tracksText: mejs.i18n.t("Captions/Subtitles"),
            tracksAriaLive: !1,
            hideCaptionsButtonWhenEmpty: !0,
            toggleCaptionsButtonWhenOnlyOne: !1,
            slidesSelector: ""
        }), e.extend(MediaElementPlayer.prototype, {
            hasChapters: !1,
            cleartracks: function(e, t, i, n) {
                e && (e.captions && e.captions.remove(), e.chapters && e.chapters.remove(), e.captionsText && e.captionsText.remove(), e.captionsButton && e.captionsButton.remove())
            },
            buildtracks: function(t, i, n, o) {
                if (0 !== t.tracks.length) {
                    var s, a = this,
                        r = a.options.tracksAriaLive ? 'role="log" aria-live="assertive" aria-atomic="false"' : "";
                    if (a.domNode.textTracks)
                        for (s = a.domNode.textTracks.length - 1; s >= 0; s--) a.domNode.textTracks[s].mode = "hidden";
                    a.cleartracks(t, i, n, o), t.chapters = e('<div class="mejs-chapters mejs-layer"></div>').prependTo(n).hide(), t.captions = e('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" ' + r + '><span class="mejs-captions-text"></span></div></div>').prependTo(n).hide(), t.captionsText = t.captions.find(".mejs-captions-text"), t.captionsButton = e('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.tracksText + '" aria-label="' + a.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_none" value="none" checked="checked" /><label for="' + t.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(i);
                    var l = 0;
                    for (s = 0; s < t.tracks.length; s++) "subtitles" == t.tracks[s].kind && l++;
                    for (a.options.toggleCaptionsButtonWhenOnlyOne && 1 == l ? t.captionsButton.on("click", function() {
                            null === t.selectedTrack ? lang = t.tracks[0].srclang : lang = "none", t.setTrack(lang)
                        }) : (t.captionsButton.on("mouseenter focusin", function() {
                            e(this).find(".mejs-captions-selector").css("visibility", "visible")
                        }).on("click", "input[type=radio]", function() {
                            lang = this.value, t.setTrack(lang)
                        }), t.captionsButton.on("mouseleave focusout", function() {
                            e(this).find(".mejs-captions-selector").css("visibility", "hidden")
                        })), t.options.alwaysShowControls ? t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : t.container.bind("controlsshown", function() {
                            t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                        }).bind("controlshidden", function() {
                            o.paused || t.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                        }), t.trackToLoad = -1, t.selectedTrack = null, t.isLoadingTrack = !1, s = 0; s < t.tracks.length; s++) "subtitles" == t.tracks[s].kind && t.addTrackButton(t.tracks[s].srclang, t.tracks[s].label);
                    t.loadNextTrack(), o.addEventListener("timeupdate", function(e) {
                        t.displayCaptions()
                    }, !1), "" !== t.options.slidesSelector && (t.slidesContainer = e(t.options.slidesSelector), o.addEventListener("timeupdate", function(e) {
                        t.displaySlides()
                    }, !1)), o.addEventListener("loadedmetadata", function(e) {
                        t.displayChapters()
                    }, !1), t.container.hover(function() {
                        t.hasChapters && (t.chapters.css("visibility", "visible"), t.chapters.fadeIn(200).height(t.chapters.find(".mejs-chapter").outerHeight()))
                    }, function() {
                        t.hasChapters && !o.paused && t.chapters.fadeOut(200, function() {
                            e(this).css("visibility", "hidden"), e(this).css("display", "block")
                        })
                    }), a.container.on("controlsresize", function() {
                        a.adjustLanguageBox()
                    }), null !== t.node.getAttribute("autoplay") && t.chapters.css("visibility", "hidden")
                }
            },
            setTrack: function(e) {
                var t, i = this;
                if ("none" == e) i.selectedTrack = null, i.captionsButton.removeClass("mejs-captions-enabled");
                else
                    for (t = 0; t < i.tracks.length; t++)
                        if (i.tracks[t].srclang == e) {
                            null === i.selectedTrack && i.captionsButton.addClass("mejs-captions-enabled"), i.selectedTrack = i.tracks[t], i.captions.attr("lang", i.selectedTrack.srclang), i.displayCaptions();
                            break
                        }
            },
            loadNextTrack: function() {
                var e = this;
                e.trackToLoad++, e.trackToLoad < e.tracks.length ? (e.isLoadingTrack = !0, e.loadTrack(e.trackToLoad)) : (e.isLoadingTrack = !1, e.checkForTracks())
            },
            loadTrack: function(t) {
                var i = this,
                    n = i.tracks[t],
                    o = function() {
                        n.isLoaded = !0, i.enableTrackButton(n.srclang, n.label), i.loadNextTrack()
                    };
                e.ajax({
                    url: n.src,
                    dataType: "text",
                    success: function(e) {
                        "string" == typeof e && /<tt\s+xml/gi.exec(e) ? n.entries = mejs.TrackFormatParser.dfxp.parse(e) : n.entries = mejs.TrackFormatParser.webvtt.parse(e), o(), "chapters" == n.kind && i.media.addEventListener("play", function(e) {
                            i.media.duration > 0 && i.displayChapters(n)
                        }, !1), "slides" == n.kind && i.setupSlides(n)
                    },
                    error: function() {
                        i.removeTrackButton(n.srclang), i.loadNextTrack()
                    }
                })
            },
            enableTrackButton: function(t, i) {
                var n = this;
                "" === i && (i = mejs.language.codes[t] || t), n.captionsButton.find("input[value=" + t + "]").prop("disabled", !1).siblings("label").html(i), n.options.startLanguage == t && e("#" + n.id + "_captions_" + t).prop("checked", !0).trigger("click"), n.adjustLanguageBox()
            },
            removeTrackButton: function(e) {
                var t = this;
                t.captionsButton.find("input[value=" + e + "]").closest("li").remove(), t.adjustLanguageBox()
            },
            addTrackButton: function(t, i) {
                var n = this;
                "" === i && (i = mejs.language.codes[t] || t), n.captionsButton.find("ul").append(e('<li><input type="radio" name="' + n.id + '_captions" id="' + n.id + "_captions_" + t + '" value="' + t + '" disabled="disabled" /><label for="' + n.id + "_captions_" + t + '">' + i + " (loading)</label></li>")), n.adjustLanguageBox(), n.container.find(".mejs-captions-translations option[value=" + t + "]").remove()
            },
            adjustLanguageBox: function() {
                var e = this;
                e.captionsButton.find(".mejs-captions-selector").height(e.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + e.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
            },
            checkForTracks: function() {
                var e = this,
                    t = !1;
                if (e.options.hideCaptionsButtonWhenEmpty) {
                    for (i = 0; i < e.tracks.length; i++)
                        if ("subtitles" == e.tracks[i].kind && e.tracks[i].isLoaded) {
                            t = !0;
                            break
                        } t || (e.captionsButton.hide(), e.setControlsSize())
                }
            },
            displayCaptions: function() {
                if ("undefined" != typeof this.tracks) {
                    var e, t = this,
                        i = t.selectedTrack;
                    if (null !== i && i.isLoaded) {
                        for (e = 0; e < i.entries.times.length; e++)
                            if (t.media.currentTime >= i.entries.times[e].start && t.media.currentTime <= i.entries.times[e].stop) return t.captionsText.html(i.entries.text[e]).attr("class", "mejs-captions-text " + (i.entries.times[e].identifier || "")), void t.captions.show().height(0);
                        t.captions.hide()
                    } else t.captions.hide()
                }
            },
            setupSlides: function(e) {
                var t = this;
                t.slides = e, t.slides.entries.imgs = [t.slides.entries.text.length], t.showSlide(0)
            },
            showSlide: function(t) {
                if ("undefined" != typeof this.tracks && "undefined" != typeof this.slidesContainer) {
                    var i = this,
                        n = i.slides.entries.text[t],
                        o = i.slides.entries.imgs[t];
                    "undefined" == typeof o || "undefined" == typeof o.fadeIn ? i.slides.entries.imgs[t] = o = e('<img src="' + n + '">').on("load", function() {
                        o.appendTo(i.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                    }) : o.is(":visible") || o.is(":animated") || o.fadeIn().siblings(":visible").fadeOut()
                }
            },
            displaySlides: function() {
                if ("undefined" != typeof this.slides) {
                    var e, t = this,
                        i = t.slides;
                    for (e = 0; e < i.entries.times.length; e++)
                        if (t.media.currentTime >= i.entries.times[e].start && t.media.currentTime <= i.entries.times[e].stop) return void t.showSlide(e)
                }
            },
            displayChapters: function() {
                var e, t = this;
                for (e = 0; e < t.tracks.length; e++)
                    if ("chapters" == t.tracks[e].kind && t.tracks[e].isLoaded) {
                        t.drawChapters(t.tracks[e]), t.hasChapters = !0;
                        break
                    }
            },
            drawChapters: function(t) {
                var i, n, o = this,
                    s = 0,
                    a = 0;
                for (o.chapters.empty(), i = 0; i < t.entries.times.length; i++) n = t.entries.times[i].stop - t.entries.times[i].start, s = Math.floor(n / o.media.duration * 100), (s + a > 100 || i == t.entries.times.length - 1 && 100 > s + a) && (s = 100 - a), o.chapters.append(e('<div class="mejs-chapter" rel="' + t.entries.times[i].start + '" style="left: ' + a.toString() + "%;width: " + s.toString() + '%;"><div class="mejs-chapter-block' + (i == t.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + t.entries.text[i] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(t.entries.times[i].start, o.options) + "&ndash;" + mejs.Utility.secondsToTimeCode(t.entries.times[i].stop, o.options) + "</span></div></div>")), a += s;
                o.chapters.find("div.mejs-chapter").click(function() {
                    o.media.setCurrentTime(parseFloat(e(this).attr("rel"))), o.media.paused && o.media.play()
                }), o.chapters.show()
            }
        }), mejs.language = {
            codes: {
                af: "Afrikaans",
                sq: "Albanian",
                ar: "Arabic",
                be: "Belarusian",
                bg: "Bulgarian",
                ca: "Catalan",
                zh: "Chinese",
                "zh-cn": "Chinese Simplified",
                "zh-tw": "Chinese Traditional",
                hr: "Croatian",
                cs: "Czech",
                da: "Danish",
                nl: "Dutch",
                en: "English",
                et: "Estonian",
                fl: "Filipino",
                fi: "Finnish",
                fr: "French",
                gl: "Galician",
                de: "German",
                el: "Greek",
                ht: "Haitian Creole",
                iw: "Hebrew",
                hi: "Hindi",
                hu: "Hungarian",
                is: "Icelandic",
                id: "Indonesian",
                ga: "Irish",
                it: "Italian",
                ja: "Japanese",
                ko: "Korean",
                lv: "Latvian",
                lt: "Lithuanian",
                mk: "Macedonian",
                ms: "Malay",
                mt: "Maltese",
                no: "Norwegian",
                fa: "Persian",
                pl: "Polish",
                pt: "Portuguese",
                ro: "Romanian",
                ru: "Russian",
                sr: "Serbian",
                sk: "Slovak",
                sl: "Slovenian",
                es: "Spanish",
                sw: "Swahili",
                sv: "Swedish",
                tl: "Tagalog",
                th: "Thai",
                tr: "Turkish",
                uk: "Ukrainian",
                vi: "Vietnamese",
                cy: "Welsh",
                yi: "Yiddish"
            }
        }, mejs.TrackFormatParser = {
            webvtt: {
                pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
                parse: function(t) {
                    for (var i, n, o, s = 0, a = mejs.TrackFormatParser.split2(t, /\r?\n/), r = {
                            text: [],
                            times: []
                        }; s < a.length; s++) {
                        if (i = this.pattern_timecode.exec(a[s]), i && s < a.length) {
                            for (s - 1 >= 0 && "" !== a[s - 1] && (o = a[s - 1]), s++, n = a[s], s++;
                                "" !== a[s] && s < a.length;) n = n + "\n" + a[s], s++;
                            n = e.trim(n).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), r.text.push(n), r.times.push({
                                identifier: o,
                                start: 0 === mejs.Utility.convertSMPTEtoSeconds(i[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(i[1]),
                                stop: mejs.Utility.convertSMPTEtoSeconds(i[3]),
                                settings: i[5]
                            })
                        }
                        o = ""
                    }
                    return r
                }
            },
            dfxp: {
                parse: function(t) {
                    t = e(t).filter("tt");
                    var i, n, o = 0,
                        s = t.children("div").eq(0),
                        a = s.find("p"),
                        r = t.find("#" + s.attr("style")),
                        l = {
                            text: [],
                            times: []
                        };
                    if (r.length) {
                        var d = r.removeAttr("id").get(0).attributes;
                        if (d.length)
                            for (i = {}, o = 0; o < d.length; o++) i[d[o].name.split(":")[1]] = d[o].value
                    }
                    for (o = 0; o < a.length; o++) {
                        var c, u = {
                            start: null,
                            stop: null,
                            style: null
                        };
                        if (a.eq(o).attr("begin") && (u.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("begin"))), !u.start && a.eq(o - 1).attr("end") && (u.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(o - 1).attr("end"))), a.eq(o).attr("end") && (u.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(o).attr("end"))), !u.stop && a.eq(o + 1).attr("begin") && (u.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(o + 1).attr("begin"))), i) {
                            c = "";
                            for (var h in i) c += h + ":" + i[h] + ";"
                        }
                        c && (u.style = c), 0 === u.start && (u.start = .2), l.times.push(u), n = e.trim(a.eq(o).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), l.text.push(n), 0 === l.times.start && (l.times.start = 2)
                    }
                    return l
                }
            },
            split2: function(e, t) {
                return e.split(t)
            }
        }, 3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function(e, t) {
            var i, n = [],
                o = "";
            for (i = 0; i < e.length; i++) o += e.substring(i, i + 1), t.test(o) && (n.push(o.replace(t, "")), o = "");
            return n.push(o), n
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            contextMenuItems: [{
                render: function(e) {
                    return "undefined" == typeof e.enterFullScreen ? null : e.isFullScreen ? mejs.i18n.t("Turn off Fullscreen") : mejs.i18n.t("Go Fullscreen")
                },
                click: function(e) {
                    e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen()
                }
            }, {
                render: function(e) {
                    return e.media.muted ? mejs.i18n.t("Unmute") : mejs.i18n.t("Mute")
                },
                click: function(e) {
                    e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
                }
            }, {
                isSeparator: !0
            }, {
                render: function(e) {
                    return mejs.i18n.t("Download Video")
                },
                click: function(e) {
                    window.location.href = e.media.currentSrc
                }
            }]
        }), e.extend(MediaElementPlayer.prototype, {
            buildcontextmenu: function(t, i, n, o) {
                t.contextMenu = e('<div class="mejs-contextmenu"></div>').appendTo(e("body")).hide(), t.container.bind("contextmenu", function(e) {
                    return t.isContextMenuEnabled ? (e.preventDefault(), t.renderContextMenu(e.clientX - 1, e.clientY - 1), !1) : void 0;
                }), t.container.bind("click", function() {
                    t.contextMenu.hide()
                }), t.contextMenu.bind("mouseleave", function() {
                    t.startContextMenuTimer()
                })
            },
            cleancontextmenu: function(e) {
                e.contextMenu.remove()
            },
            isContextMenuEnabled: !0,
            enableContextMenu: function() {
                this.isContextMenuEnabled = !0
            },
            disableContextMenu: function() {
                this.isContextMenuEnabled = !1
            },
            contextMenuTimeout: null,
            startContextMenuTimer: function() {
                var e = this;
                e.killContextMenuTimer(), e.contextMenuTimer = setTimeout(function() {
                    e.hideContextMenu(), e.killContextMenuTimer()
                }, 750)
            },
            killContextMenuTimer: function() {
                var e = this.contextMenuTimer;
                null != e && (clearTimeout(e), delete e, e = null)
            },
            hideContextMenu: function() {
                this.contextMenu.hide()
            },
            renderContextMenu: function(t, i) {
                for (var n = this, o = "", s = n.options.contextMenuItems, a = 0, r = s.length; r > a; a++)
                    if (s[a].isSeparator) o += '<div class="mejs-contextmenu-separator"></div>';
                    else {
                        var l = s[a].render(n);
                        null != l && (o += '<div class="mejs-contextmenu-item" data-itemindex="' + a + '" id="element-' + 1e6 * Math.random() + '">' + l + "</div>")
                    } n.contextMenu.empty().append(e(o)).css({
                    top: i,
                    left: t
                }).show(), n.contextMenu.find(".mejs-contextmenu-item").each(function() {
                    var t = e(this),
                        i = parseInt(t.data("itemindex"), 10),
                        o = n.options.contextMenuItems[i];
                    "undefined" != typeof o.show && o.show(t, n), t.click(function() {
                        "undefined" != typeof o.click && o.click(n), n.contextMenu.hide()
                    })
                }), setTimeout(function() {
                    n.killControlsTimer("rev3")
                }, 100)
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            skipBackInterval: 30,
            skipBackText: mejs.i18n.t("Skip back %1 seconds")
        }), e.extend(MediaElementPlayer.prototype, {
            buildskipback: function(t, i, n, o) {
                var s = this,
                    a = s.options.skipBackText.replace("%1", s.options.skipBackInterval);
                e('<div class="mejs-button mejs-skip-back-button"><button type="button" aria-controls="' + s.id + '" title="' + a + '" aria-label="' + a + '">' + s.options.skipBackInterval + "</button></div>").appendTo(i).click(function() {
                    o.setCurrentTime(Math.max(o.currentTime - s.options.skipBackInterval, 0)), e(this).find("button").blur()
                })
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            postrollCloseText: mejs.i18n.t("Close")
        }), e.extend(MediaElementPlayer.prototype, {
            buildpostroll: function(t, i, n, o) {
                var s = this,
                    a = s.container.find('link[rel="postroll"]').attr("href");
                "undefined" != typeof a && (t.postroll = e('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + s.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(n).hide(), s.media.addEventListener("ended", function(i) {
                    e.ajax({
                        dataType: "html",
                        url: a,
                        success: function(e, t) {
                            n.find(".mejs-postroll-layer-content").html(e)
                        }
                    }), t.postroll.show()
                }, !1))
            }
        })
    }(mejs.$),
    function(e, t, i, n) {
        var o = i("html"),
            s = i(e),
            a = i(t),
            r = i.fancybox = function() {
                r.open.apply(this, arguments)
            },
            l = navigator.userAgent.match(/msie/i),
            d = null,
            c = t.createTouch !== n,
            u = function(e) {
                return e && e.hasOwnProperty && e instanceof i
            },
            h = function(e) {
                return e && "string" === i.type(e)
            },
            p = function(e) {
                return h(e) && 0 < e.indexOf("%")
            },
            m = function(e, t) {
                var i = parseInt(e, 10) || 0;
                return t && p(e) && (i *= r.getViewport()[t] / 100), Math.ceil(i)
            },
            f = function(e, t) {
                return m(e, t) + "px"
            };
        i.extend(r, {
            version: "2.1.5",
            defaults: {
                padding: 15,
                margin: 20,
                width: 800,
                height: 600,
                minWidth: 100,
                minHeight: 100,
                maxWidth: 9999,
                maxHeight: 9999,
                pixelRatio: 1,
                autoSize: !0,
                autoHeight: !1,
                autoWidth: !1,
                autoResize: !0,
                autoCenter: !c,
                fitToView: !0,
                aspectRatio: !1,
                topRatio: .5,
                leftRatio: .5,
                scrolling: "auto",
                wrapCSS: "",
                arrows: !0,
                closeBtn: !0,
                closeClick: !1,
                nextClick: !1,
                mouseWheel: !0,
                autoPlay: !1,
                playSpeed: 3e3,
                preload: 3,
                modal: !1,
                loop: !0,
                ajax: {
                    dataType: "html",
                    headers: {
                        "X-fancyBox": !0
                    }
                },
                iframe: {
                    scrolling: "auto",
                    preload: !0
                },
                swf: {
                    wmode: "transparent",
                    allowfullscreen: "true",
                    allowscriptaccess: "always"
                },
                keys: {
                    next: {
                        13: "left",
                        34: "up",
                        39: "left",
                        40: "up"
                    },
                    prev: {
                        8: "right",
                        33: "down",
                        37: "right",
                        38: "down"
                    },
                    close: [27],
                    play: [32],
                    toggle: [70]
                },
                direction: {
                    next: "left",
                    prev: "right"
                },
                scrollOutside: !0,
                index: 0,
                type: null,
                href: null,
                content: null,
                title: null,
                tpl: {
                    wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                    image: '<img class="fancybox-image" src="{href}" alt="" />',
                    iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                    error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                    closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                    next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                openEffect: "fade",
                openSpeed: 250,
                openEasing: "swing",
                openOpacity: !0,
                openMethod: "zoomIn",
                closeEffect: "fade",
                closeSpeed: 250,
                closeEasing: "swing",
                closeOpacity: !0,
                closeMethod: "zoomOut",
                nextEffect: "elastic",
                nextSpeed: 250,
                nextEasing: "swing",
                nextMethod: "changeIn",
                prevEffect: "elastic",
                prevSpeed: 250,
                prevEasing: "swing",
                prevMethod: "changeOut",
                helpers: {
                    overlay: !0,
                    title: !0
                },
                onCancel: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeChange: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop
            },
            group: {},
            opts: {},
            previous: null,
            coming: null,
            current: null,
            isActive: !1,
            isOpen: !1,
            isOpened: !1,
            wrap: null,
            skin: null,
            outer: null,
            inner: null,
            player: {
                timer: null,
                isActive: !1
            },
            ajaxLoad: null,
            imgPreload: null,
            transitions: {},
            helpers: {},
            open: function(e, t) {
                return e && (i.isPlainObject(t) || (t = {}), !1 !== r.close(!0)) ? (i.isArray(e) || (e = u(e) ? i(e).get() : [e]), i.each(e, function(o, s) {
                    var a, l, d, c, p, m = {};
                    "object" === i.type(s) && (s.nodeType && (s = i(s)), u(s) ? (m = {
                        href: s.data("fancybox-href") || s.attr("href"),
                        title: s.data("fancybox-title") || s.attr("title"),
                        isDom: !0,
                        element: s
                    }, i.metadata && i.extend(!0, m, s.metadata())) : m = s), a = t.href || m.href || (h(s) ? s : null), l = t.title !== n ? t.title : m.title || "", c = (d = t.content || m.content) ? "html" : t.type || m.type, !c && m.isDom && (c = s.data("fancybox-type"), c || (c = (c = s.prop("class").match(/fancybox\.(\w+)/)) ? c[1] : null)), h(a) && (c || (r.isImage(a) ? c = "image" : r.isSWF(a) ? c = "swf" : "#" === a.charAt(0) ? c = "inline" : h(s) && (c = "html", d = s)), "ajax" === c && (p = a.split(/\s+/, 2), a = p.shift(), p = p.shift())), d || ("inline" === c ? a ? d = i(h(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : m.isDom && (d = s) : "html" === c ? d = a : !c && !a && m.isDom && (c = "inline", d = s)), i.extend(m, {
                        href: a,
                        type: c,
                        content: d,
                        title: l,
                        selector: p
                    }), e[o] = m
                }), r.opts = i.extend(!0, {}, r.defaults, t), t.keys !== n && (r.opts.keys = t.keys ? i.extend({}, r.defaults.keys, t.keys) : !1), r.group = e, r._start(r.opts.index)) : void 0
            },
            cancel: function() {
                var e = r.coming;
                e && !1 !== r.trigger("onCancel") && (r.hideLoading(), r.ajaxLoad && r.ajaxLoad.abort(), r.ajaxLoad = null, r.imgPreload && (r.imgPreload.onload = r.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), r.coming = null, r.current || r._afterZoomOut(e))
            },
            close: function(e) {
                r.cancel(), !1 !== r.trigger("beforeClose") && (r.unbindEvents(), r.isActive && (r.isOpen && !0 !== e ? (r.isOpen = r.isOpened = !1, r.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), r.wrap.stop(!0, !0).removeClass("fancybox-opened"), r.transitions[r.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), r._afterZoomOut())))
            },
            play: function(e) {
                var t = function() {
                        clearTimeout(r.player.timer)
                    },
                    i = function() {
                        t(), r.current && r.player.isActive && (r.player.timer = setTimeout(r.next, r.current.playSpeed))
                    },
                    n = function() {
                        t(), a.unbind(".player"), r.player.isActive = !1, r.trigger("onPlayEnd")
                    };
                !0 === e || !r.player.isActive && !1 !== e ? r.current && (r.current.loop || r.current.index < r.group.length - 1) && (r.player.isActive = !0, a.bind({
                    "onCancel.player beforeClose.player": n,
                    "onUpdate.player": i,
                    "beforeLoad.player": t
                }), i(), r.trigger("onPlayStart")) : n()
            },
            next: function(e) {
                var t = r.current;
                t && (h(e) || (e = t.direction.next), r.jumpto(t.index + 1, e, "next"))
            },
            prev: function(e) {
                var t = r.current;
                t && (h(e) || (e = t.direction.prev), r.jumpto(t.index - 1, e, "prev"))
            },
            jumpto: function(e, t, i) {
                var o = r.current;
                o && (e = m(e), r.direction = t || o.direction[e >= o.index ? "next" : "prev"], r.router = i || "jumpto", o.loop && (0 > e && (e = o.group.length + e % o.group.length), e %= o.group.length), o.group[e] !== n && (r.cancel(), r._start(e)))
            },
            reposition: function(e, t) {
                var n, o = r.current,
                    s = o ? o.wrap : null;
                s && (n = r._getPosition(t), e && "scroll" === e.type ? (delete n.position, s.stop(!0, !0).animate(n, 200)) : (s.css(n), o.pos = i.extend({}, o.dim, n)))
            },
            update: function(e) {
                var t = e && e.type,
                    i = !t || "orientationchange" === t;
                i && (clearTimeout(d), d = null), r.isOpen && !d && (d = setTimeout(function() {
                    var n = r.current;
                    n && !r.isClosing && (r.wrap.removeClass("fancybox-tmp"), (i || "load" === t || "resize" === t && n.autoResize) && r._setDimension(), "scroll" === t && n.canShrink || r.reposition(e), r.trigger("onUpdate"), d = null)
                }, i && !c ? 0 : 300))
            },
            toggle: function(e) {
                r.isOpen && (r.current.fitToView = "boolean" === i.type(e) ? e : !r.current.fitToView, c && (r.wrap.removeAttr("style").addClass("fancybox-tmp"), r.trigger("onUpdate")), r.update())
            },
            hideLoading: function() {
                a.unbind(".loading"), i("#fancybox-loading").remove()
            },
            showLoading: function() {
                var e, t;
                r.hideLoading(), e = i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"), a.bind("keydown.loading", function(e) {
                    27 === (e.which || e.keyCode) && (e.preventDefault(), r.cancel())
                }), r.defaults.fixed || (t = r.getViewport(), e.css({
                    position: "absolute",
                    top: .5 * t.h + t.y,
                    left: .5 * t.w + t.x
                }))
            },
            getViewport: function() {
                var t = r.current && r.current.locked || !1,
                    i = {
                        x: s.scrollLeft(),
                        y: s.scrollTop()
                    };
                return t ? (i.w = t[0].clientWidth, i.h = t[0].clientHeight) : (i.w = c && e.innerWidth ? e.innerWidth : s.width(), i.h = c && e.innerHeight ? e.innerHeight : s.height()), i
            },
            unbindEvents: function() {
                r.wrap && u(r.wrap) && r.wrap.unbind(".fb"), a.unbind(".fb"), s.unbind(".fb")
            },
            bindEvents: function() {
                var e, t = r.current;
                t && (s.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" : ""), r.update), (e = t.keys) && a.bind("keydown.fb", function(o) {
                    var s = o.which || o.keyCode,
                        a = o.target || o.srcElement;
                    return 27 === s && r.coming ? !1 : void(!o.ctrlKey && !o.altKey && !o.shiftKey && !o.metaKey && (!a || !a.type && !i(a).is("[contenteditable]")) && i.each(e, function(e, a) {
                        return 1 < t.group.length && a[s] !== n ? (r[e](a[s]), o.preventDefault(), !1) : -1 < i.inArray(s, a) ? (r[e](), o.preventDefault(), !1) : void 0
                    }))
                }), i.fn.mousewheel && t.mouseWheel && r.wrap.bind("mousewheel.fb", function(e, n, o, s) {
                    for (var a = i(e.target || null), l = !1; a.length && !l && !a.is(".fancybox-skin") && !a.is(".fancybox-wrap");) l = a[0] && !(a[0].style.overflow && "hidden" === a[0].style.overflow) && (a[0].clientWidth && a[0].scrollWidth > a[0].clientWidth || a[0].clientHeight && a[0].scrollHeight > a[0].clientHeight), a = i(a).parent();
                    0 !== n && !l && 1 < r.group.length && !t.canShrink && (s > 0 || o > 0 ? r.prev(s > 0 ? "down" : "left") : (0 > s || 0 > o) && r.next(0 > s ? "up" : "right"), e.preventDefault())
                }))
            },
            trigger: function(e, t) {
                var n, o = t || r.coming || r.current;
                if (o) {
                    if (i.isFunction(o[e]) && (n = o[e].apply(o, Array.prototype.slice.call(arguments, 1))), !1 === n) return !1;
                    o.helpers && i.each(o.helpers, function(t, n) {
                        n && r.helpers[t] && i.isFunction(r.helpers[t][e]) && r.helpers[t][e](i.extend(!0, {}, r.helpers[t].defaults, n), o)
                    }), a.trigger(e)
                }
            },
            isImage: function(e) {
                return h(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
            },
            isSWF: function(e) {
                return h(e) && e.match(/\.(swf)((\?|#).*)?$/i)
            },
            _start: function(e) {
                var t, n, o = {};
                if (e = m(e), t = r.group[e] || null, !t) return !1;
                if (o = i.extend(!0, {}, r.opts, t), t = o.margin, n = o.padding, "number" === i.type(t) && (o.margin = [t, t, t, t]), "number" === i.type(n) && (o.padding = [n, n, n, n]), o.modal && i.extend(!0, o, {
                        closeBtn: !1,
                        closeClick: !1,
                        nextClick: !1,
                        arrows: !1,
                        mouseWheel: !1,
                        keys: null,
                        helpers: {
                            overlay: {
                                closeClick: !1
                            }
                        }
                    }), o.autoSize && (o.autoWidth = o.autoHeight = !0), "auto" === o.width && (o.autoWidth = !0), "auto" === o.height && (o.autoHeight = !0), o.group = r.group, o.index = e, r.coming = o, !1 === r.trigger("beforeLoad")) r.coming = null;
                else {
                    if (n = o.type, t = o.href, !n) return r.coming = null, r.current && r.router && "jumpto" !== r.router ? (r.current.index = e, r[r.router](r.direction)) : !1;
                    if (r.isActive = !0, ("image" === n || "swf" === n) && (o.autoHeight = o.autoWidth = !1, o.scrolling = "visible"), "image" === n && (o.aspectRatio = !0), "iframe" === n && c && (o.scrolling = "scroll"), o.wrap = i(o.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + n + " fancybox-tmp " + o.wrapCSS).appendTo(o.parent || "body"), i.extend(o, {
                            skin: i(".fancybox-skin", o.wrap),
                            outer: i(".fancybox-outer", o.wrap),
                            inner: i(".fancybox-inner", o.wrap)
                        }), i.each(["Top", "Right", "Bottom", "Left"], function(e, t) {
                            o.skin.css("padding" + t, f(o.padding[e]))
                        }), r.trigger("onReady"), "inline" === n || "html" === n) {
                        if (!o.content || !o.content.length) return r._error("content")
                    } else if (!t) return r._error("href");
                    "image" === n ? r._loadImage() : "ajax" === n ? r._loadAjax() : "iframe" === n ? r._loadIframe() : r._afterLoad()
                }
            },
            _error: function(e) {
                i.extend(r.coming, {
                    type: "html",
                    autoWidth: !0,
                    autoHeight: !0,
                    minWidth: 0,
                    minHeight: 0,
                    scrolling: "no",
                    hasError: e,
                    content: r.coming.tpl.error
                }), r._afterLoad()
            },
            _loadImage: function() {
                var e = r.imgPreload = new Image;
                e.onload = function() {
                    this.onload = this.onerror = null, r.coming.width = this.width / r.opts.pixelRatio, r.coming.height = this.height / r.opts.pixelRatio, r._afterLoad()
                }, e.onerror = function() {
                    this.onload = this.onerror = null, r._error("image")
                }, e.src = r.coming.href, !0 !== e.complete && r.showLoading()
            },
            _loadAjax: function() {
                var e = r.coming;
                r.showLoading(), r.ajaxLoad = i.ajax(i.extend({}, e.ajax, {
                    url: e.href,
                    error: function(e, t) {
                        r.coming && "abort" !== t ? r._error("ajax", e) : r.hideLoading()
                    },
                    success: function(t, i) {
                        "success" === i && (e.content = t, r._afterLoad())
                    }
                }))
            },
            _loadIframe: function() {
                var e = r.coming,
                    t = i(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : e.iframe.scrolling).attr("src", e.href);
                i(e.wrap).bind("onReset", function() {
                    try {
                        i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                    } catch (e) {}
                }), e.iframe.preload && (r.showLoading(), t.one("load", function() {
                    i(this).data("ready", 1), c || i(this).bind("load.fb", r.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), r._afterLoad()
                })), e.content = t.appendTo(e.inner), e.iframe.preload || r._afterLoad()
            },
            _preloadImages: function() {
                var e, t, i = r.group,
                    n = r.current,
                    o = i.length,
                    s = n.preload ? Math.min(n.preload, o - 1) : 0;
                for (t = 1; s >= t; t += 1) e = i[(n.index + t) % o], "image" === e.type && e.href && ((new Image).src = e.href)
            },
            _afterLoad: function() {
                var e, t, n, o, s, a = r.coming,
                    l = r.current;
                if (r.hideLoading(), a && !1 !== r.isActive)
                    if (!1 === r.trigger("afterLoad", a, l)) a.wrap.stop(!0).trigger("onReset").remove(), r.coming = null;
                    else {
                        switch (l && (r.trigger("beforeChange", l), l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), r.unbindEvents(), e = a.content, t = a.type, n = a.scrolling, i.extend(r, {
                            wrap: a.wrap,
                            skin: a.skin,
                            outer: a.outer,
                            inner: a.inner,
                            current: a,
                            previous: l
                        }), o = a.href, t) {
                            case "inline":
                            case "ajax":
                            case "html":
                                a.selector ? e = i("<div>").html(e).find(a.selector) : u(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", i('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                    i(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                                }));
                                break;
                            case "image":
                                e = a.tpl.image.replace("{href}", o);
                                break;
                            case "swf":
                                e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', s = "", i.each(a.swf, function(t, i) {
                                    e += '<param name="' + t + '" value="' + i + '"></param>', s += " " + t + '="' + i + '"'
                                }), e += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + s + "></embed></object>"
                        }(!u(e) || !e.parent().is(a.inner)) && a.inner.append(e), r.trigger("beforeShow"), a.inner.css("overflow", "yes" === n ? "scroll" : "no" === n ? "hidden" : n), r._setDimension(), r.reposition(), r.isOpen = !1, r.coming = null, r.bindEvents(), r.isOpened ? l.prevMethod && r.transitions[l.prevMethod]() : i(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), r.transitions[r.isOpened ? a.nextMethod : a.openMethod](), r._preloadImages()
                    }
            },
            _setDimension: function() {
                var e, t, n, o, s, a, l, d, c, u = r.getViewport(),
                    h = 0,
                    g = !1,
                    v = !1,
                    g = r.wrap,
                    y = r.skin,
                    b = r.inner,
                    w = r.current,
                    v = w.width,
                    x = w.height,
                    S = w.minWidth,
                    C = w.minHeight,
                    T = w.maxWidth,
                    k = w.maxHeight,
                    j = w.scrolling,
                    _ = w.scrollOutside ? w.scrollbarWidth : 0,
                    E = w.margin,
                    I = m(E[1] + E[3]),
                    M = m(E[0] + E[2]);
                if (g.add(y).add(b).width("auto").height("auto").removeClass("fancybox-tmp"), E = m(y.outerWidth(!0) - y.width()), e = m(y.outerHeight(!0) - y.height()), t = I + E, n = M + e, o = p(v) ? (u.w - t) * m(v) / 100 : v, s = p(x) ? (u.h - n) * m(x) / 100 : x, "iframe" === w.type) {
                    if (c = w.content, w.autoHeight && 1 === c.data("ready")) try {
                        c[0].contentWindow.document.location && (b.width(o).height(9999), a = c.contents().find("body"), _ && a.css("overflow-x", "hidden"), s = a.outerHeight(!0))
                    } catch (P) {}
                } else(w.autoWidth || w.autoHeight) && (b.addClass("fancybox-tmp"), w.autoWidth || b.width(o), w.autoHeight || b.height(s), w.autoWidth && (o = b.width()), w.autoHeight && (s = b.height()), b.removeClass("fancybox-tmp"));
                if (v = m(o), x = m(s), d = o / s, S = m(p(S) ? m(S, "w") - t : S), T = m(p(T) ? m(T, "w") - t : T), C = m(p(C) ? m(C, "h") - n : C), k = m(p(k) ? m(k, "h") - n : k), a = T, l = k, w.fitToView && (T = Math.min(u.w - t, T), k = Math.min(u.h - n, k)), t = u.w - I, M = u.h - M, w.aspectRatio ? (v > T && (v = T, x = m(v / d)), x > k && (x = k, v = m(x * d)), S > v && (v = S, x = m(v / d)), C > x && (x = C, v = m(x * d))) : (v = Math.max(S, Math.min(v, T)), w.autoHeight && "iframe" !== w.type && (b.width(v), x = b.height()), x = Math.max(C, Math.min(x, k))), w.fitToView)
                    if (b.width(v).height(x), g.width(v + E), u = g.width(), I = g.height(), w.aspectRatio)
                        for (;
                            (u > t || I > M) && v > S && x > C && !(19 < h++);) x = Math.max(C, Math.min(k, x - 10)), v = m(x * d), S > v && (v = S, x = m(v / d)), v > T && (v = T, x = m(v / d)), b.width(v).height(x), g.width(v + E), u = g.width(), I = g.height();
                    else v = Math.max(S, Math.min(v, v - (u - t))), x = Math.max(C, Math.min(x, x - (I - M)));
                _ && "auto" === j && s > x && t > v + E + _ && (v += _), b.width(v).height(x), g.width(v + E), u = g.width(), I = g.height(), g = (u > t || I > M) && v > S && x > C, v = w.aspectRatio ? a > v && l > x && o > v && s > x : (a > v || l > x) && (o > v || s > x), i.extend(w, {
                    dim: {
                        width: f(u),
                        height: f(I)
                    },
                    origWidth: o,
                    origHeight: s,
                    canShrink: g,
                    canExpand: v,
                    wPadding: E,
                    hPadding: e,
                    wrapSpace: I - y.outerHeight(!0),
                    skinSpace: y.height() - x
                }), !c && w.autoHeight && x > C && k > x && !v && b.height("auto")
            },
            _getPosition: function(e) {
                var t = r.current,
                    i = r.getViewport(),
                    n = t.margin,
                    o = r.wrap.width() + n[1] + n[3],
                    s = r.wrap.height() + n[0] + n[2],
                    n = {
                        position: "absolute",
                        top: n[0],
                        left: n[3]
                    };
                return t.autoCenter && t.fixed && !e && s <= i.h && o <= i.w ? n.position = "fixed" : t.locked || (n.top += i.y, n.left += i.x), n.top = f(Math.max(n.top, n.top + (i.h - s) * t.topRatio)), n.left = f(Math.max(n.left, n.left + (i.w - o) * t.leftRatio)), n
            },
            _afterZoomIn: function() {
                var e = r.current;
                e && (r.isOpen = r.isOpened = !0, r.wrap.css("overflow", "visible").addClass("fancybox-opened"), r.update(), (e.closeClick || e.nextClick && 1 < r.group.length) && r.inner.css("cursor", "pointer").bind("click.fb", function(t) {
                    !i(t.target).is("a") && !i(t.target).parent().is("a") && (t.preventDefault(), r[e.closeClick ? "close" : "next"]())
                }), e.closeBtn && i(e.tpl.closeBtn).appendTo(r.skin).bind("click.fb", function(e) {
                    e.preventDefault(), r.close()
                }), e.arrows && 1 < r.group.length && ((e.loop || 0 < e.index) && i(e.tpl.prev).appendTo(r.outer).bind("click.fb", r.prev), (e.loop || e.index < r.group.length - 1) && i(e.tpl.next).appendTo(r.outer).bind("click.fb", r.next)), r.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? r.opts.autoPlay && !r.player.isActive && (r.opts.autoPlay = !1, r.play()) : r.play(!1))
            },
            _afterZoomOut: function(e) {
                e = e || r.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(r, {
                    group: {},
                    opts: {},
                    router: !1,
                    current: null,
                    isActive: !1,
                    isOpened: !1,
                    isOpen: !1,
                    isClosing: !1,
                    wrap: null,
                    skin: null,
                    outer: null,
                    inner: null
                }), r.trigger("afterClose", e)
            }
        }), r.transitions = {
            getOrigPosition: function() {
                var e = r.current,
                    t = e.element,
                    i = e.orig,
                    n = {},
                    o = 50,
                    s = 50,
                    a = e.hPadding,
                    l = e.wPadding,
                    d = r.getViewport();
                return !i && e.isDom && t.is(":visible") && (i = t.find("img:first"), i.length || (i = t)), u(i) ? (n = i.offset(), i.is("img") && (o = i.outerWidth(), s = i.outerHeight())) : (n.top = d.y + (d.h - s) * e.topRatio, n.left = d.x + (d.w - o) * e.leftRatio), ("fixed" === r.wrap.css("position") || e.locked) && (n.top -= d.y, n.left -= d.x), n = {
                    top: f(n.top - a * e.topRatio),
                    left: f(n.left - l * e.leftRatio),
                    width: f(o + l),
                    height: f(s + a)
                }
            },
            step: function(e, t) {
                var i, n, o = t.prop;
                n = r.current;
                var s = n.wrapSpace,
                    a = n.skinSpace;
                ("width" === o || "height" === o) && (i = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start), r.isClosing && (i = 1 - i), n = "width" === o ? n.wPadding : n.hPadding, n = e - n, r.skin[o](m("width" === o ? n : n - s * i)), r.inner[o](m("width" === o ? n : n - s * i - a * i)))
            },
            zoomIn: function() {
                var e = r.current,
                    t = e.pos,
                    n = e.openEffect,
                    o = "elastic" === n,
                    s = i.extend({
                        opacity: 1
                    }, t);
                delete s.position, o ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === n && (t.opacity = .1), r.wrap.css(t).animate(s, {
                    duration: "none" === n ? 0 : e.openSpeed,
                    easing: e.openEasing,
                    step: o ? this.step : null,
                    complete: r._afterZoomIn
                })
            },
            zoomOut: function() {
                var e = r.current,
                    t = e.closeEffect,
                    i = "elastic" === t,
                    n = {
                        opacity: .1
                    };
                i && (n = this.getOrigPosition(), e.closeOpacity && (n.opacity = .1)), r.wrap.animate(n, {
                    duration: "none" === t ? 0 : e.closeSpeed,
                    easing: e.closeEasing,
                    step: i ? this.step : null,
                    complete: r._afterZoomOut
                })
            },
            changeIn: function() {
                var e, t = r.current,
                    i = t.nextEffect,
                    n = t.pos,
                    o = {
                        opacity: 1
                    },
                    s = r.direction;
                n.opacity = .1, "elastic" === i && (e = "down" === s || "up" === s ? "top" : "left", "down" === s || "right" === s ? (n[e] = f(m(n[e]) - 200), o[e] = "+=200px") : (n[e] = f(m(n[e]) + 200), o[e] = "-=200px")), "none" === i ? r._afterZoomIn() : r.wrap.css(n).animate(o, {
                    duration: t.nextSpeed,
                    easing: t.nextEasing,
                    complete: r._afterZoomIn
                })
            },
            changeOut: function() {
                var e = r.previous,
                    t = e.prevEffect,
                    n = {
                        opacity: .1
                    },
                    o = r.direction;
                "elastic" === t && (n["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=200px"), e.wrap.animate(n, {
                    duration: "none" === t ? 0 : e.prevSpeed,
                    easing: e.prevEasing,
                    complete: function() {
                        i(this).trigger("onReset").remove()
                    }
                })
            }
        }, r.helpers.overlay = {
            defaults: {
                closeClick: !0,
                speedOut: 200,
                showEarly: !0,
                css: {},
                locked: !c,
                fixed: !0
            },
            overlay: null,
            fixed: !1,
            el: i("html"),
            create: function(e) {
                e = i.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(r.coming ? r.coming.parent : e.parent), this.fixed = !1, e.fixed && r.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
            },
            open: function(e) {
                var t = this;
                e = i.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e), this.fixed || (s.bind("resize.overlay", i.proxy(this.update, this)), this.update()), e.closeClick && this.overlay.bind("click.overlay", function(e) {
                    return i(e.target).hasClass("fancybox-overlay") ? (r.isActive ? r.close() : t.close(), !1) : void 0
                }), this.overlay.css(e.css).show()
            },
            close: function() {
                var e, t;
                s.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), e = s.scrollTop(), t = s.scrollLeft(), this.el.removeClass("fancybox-lock"), s.scrollTop(e).scrollLeft(t)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
                    overlay: null,
                    fixed: !1
                })
            },
            update: function() {
                var e, i = "100%";
                this.overlay.width(i).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), a.width() > e && (i = a.width())) : a.width() > s.width() && (i = a.width()), this.overlay.width(i).height(a.height())
            },
            onReady: function(e, t) {
                var n = this.overlay;
                i(".fancybox-overlay").stop(!0, !0), n || this.create(e), e.locked && this.fixed && t.fixed && (n || (this.margin = a.height() > s.height() ? i("html").css("margin-right").replace("px", "") : !1), t.locked = this.overlay.append(t.wrap), t.fixed = !1), !0 === e.showEarly && this.beforeShow.apply(this, arguments)
            },
            beforeShow: function(e, t) {
                var n, o;
                t.locked && (!1 !== this.margin && (i("*").filter(function() {
                    return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
                }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), n = s.scrollTop(), o = s.scrollLeft(), this.el.addClass("fancybox-lock"), s.scrollTop(n).scrollLeft(o)), this.open(e)
            },
            onUpdate: function() {
                this.fixed || this.update()
            },
            afterClose: function(e) {
                this.overlay && !r.coming && this.overlay.fadeOut(e.speedOut, i.proxy(this.close, this))
            }
        }, r.helpers.title = {
            defaults: {
                type: "float",
                position: "bottom"
            },
            beforeShow: function(e) {
                var t = r.current,
                    n = t.title,
                    o = e.type;
                if (i.isFunction(n) && (n = n.call(t.element, t)), h(n) && "" !== i.trim(n)) {
                    switch (t = i('<div class="fancybox-title fancybox-title-' + o + '-wrap">' + n + "</div>"), o) {
                        case "inside":
                            o = r.skin;
                            break;
                        case "outside":
                            o = r.wrap;
                            break;
                        case "over":
                            o = r.inner;
                            break;
                        default:
                            o = r.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), r.current.margin[2] += Math.abs(m(t.css("margin-bottom")))
                    }
                    t["top" === e.position ? "prependTo" : "appendTo"](o)
                }
            }
        }, i.fn.fancybox = function(e) {
            var t, n = i(this),
                o = this.selector || "",
                s = function(s) {
                    var a, l, d = i(this).blur(),
                        c = t;
                    !s.ctrlKey && !s.altKey && !s.shiftKey && !s.metaKey && !d.is(".fancybox-wrap") && (a = e.groupAttr || "data-fancybox-group", l = d.attr(a), l || (a = "rel", l = d.get(0)[a]), l && "" !== l && "nofollow" !== l && (d = o.length ? i(o) : n, d = d.filter("[" + a + '="' + l + '"]'), c = d.index(this)), e.index = c, !1 !== r.open(d, e) && s.preventDefault())
                };
            return e = e || {}, t = e.index || 0, o && !1 !== e.live ? a.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", s) : n.unbind("click.fb-start").bind("click.fb-start", s), this.filter("[data-fancybox-start=1]").trigger("click"), this
        }, a.ready(function() {
            var t, s;
            if (i.scrollbarWidth === n && (i.scrollbarWidth = function() {
                    var e = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                        t = e.children(),
                        t = t.innerWidth() - t.height(99).innerWidth();
                    return e.remove(), t
                }), i.support.fixedPosition === n) {
                t = i.support, s = i('<div style="position:fixed;top:20px;"></div>').appendTo("body");
                var a = 20 === s[0].offsetTop || 15 === s[0].offsetTop;
                s.remove(), t.fixedPosition = a
            }
            i.extend(r.defaults, {
                scrollbarWidth: i.scrollbarWidth(),
                fixed: i.support.fixedPosition,
                parent: i("body")
            }), t = i(e).width(), o.addClass("fancybox-lock-test"), s = i(e).width(), o.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (s - t) + "px;}</style>").appendTo("head")
        })
    }(window, document, jQuery),
    function(e) {
        "use strict";
        var t = e.fancybox,
            i = function(t, i, n) {
                return n = n || "", "object" === e.type(n) && (n = e.param(n, !0)), e.each(i, function(e, i) {
                    t = t.replace("$" + e, i || "")
                }), n.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + n), t
            };
        t.helpers.media = {
            defaults: {
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                    params: {
                        autoplay: 1,
                        autohide: 1,
                        fs: 1,
                        rel: 0,
                        hd: 1,
                        wmode: "opaque",
                        enablejsapi: 1
                    },
                    type: "iframe",
                    url: "//www.youtube.com/embed/$3"
                },
                vimeo: {
                    matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                    params: {
                        autoplay: 1,
                        hd: 1,
                        show_title: 1,
                        show_byline: 1,
                        show_portrait: 0,
                        fullscreen: 1
                    },
                    type: "iframe",
                    url: "//player.vimeo.com/video/$1"
                },
                metacafe: {
                    matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                    params: {
                        autoPlay: "yes"
                    },
                    type: "swf",
                    url: function(t, i, n) {
                        return n.swf.flashVars = "playerVars=" + e.param(i, !0), "//www.metacafe.com/fplayer/" + t[1] + "/.swf"
                    }
                },
                dailymotion: {
                    matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                    params: {
                        additionalInfos: 0,
                        autoStart: 1
                    },
                    type: "swf",
                    url: "//www.dailymotion.com/swf/video/$1"
                },
                twitvid: {
                    matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                    params: {
                        autoplay: 0
                    },
                    type: "iframe",
                    url: "//www.twitvid.com/embed.php?guid=$1"
                },
                twitpic: {
                    matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                    type: "image",
                    url: "//twitpic.com/show/full/$1/"
                },
                instagram: {
                    matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                    type: "image",
                    url: "//$1/p/$2/media/?size=l"
                },
                google_maps: {
                    matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                    type: "iframe",
                    url: function(e) {
                        return "//maps.google." + e[1] + "/" + e[3] + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
                    }
                }
            },
            beforeLoad: function(t, n) {
                var o, s, a, r, l = n.href || "",
                    d = !1;
                for (o in t)
                    if (t.hasOwnProperty(o) && (s = t[o], a = l.match(s.matcher))) {
                        d = s.type, r = e.extend(!0, {}, s.params, n[o] || (e.isPlainObject(t[o]) ? t[o].params : null)), l = "function" === e.type(s.url) ? s.url.call(this, a, r, n) : i(s.url, a, r);
                        break
                    } d && (n.href = l, n.type = d, n.autoHeight = !1)
            }
        }
    }(jQuery), "function" != typeof Object.create && (Object.create = function(e) {
        function t() {}
        return t.prototype = e, new t
    }),
    function(e, t, i) {
        var n = {
            init: function(t, i) {
                this.$elem = e(i), this.options = e.extend({}, e.fn.owlCarousel.options, this.$elem.data(), t), this.userOptions = t, this.loadContent()
            },
            loadContent: function() {
                function t(e) {
                    var t, i = "";
                    if ("function" == typeof n.options.jsonSuccess) n.options.jsonSuccess.apply(this, [e]);
                    else {
                        for (t in e.owl) e.owl.hasOwnProperty(t) && (i += e.owl[t].item);
                        n.$elem.html(i)
                    }
                    n.logIn()
                }
                var i, n = this;
                "function" == typeof n.options.beforeInit && n.options.beforeInit.apply(this, [n.$elem]), "string" == typeof n.options.jsonPath ? (i = n.options.jsonPath, e.getJSON(i, t)) : n.logIn()
            },
            logIn: function() {
                this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")), this.$elem.css({
                    opacity: 0
                }), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, this.checkVisible = null, this.setVars()
            },
            setVars: function() {
                return 0 === this.$elem.children().length ? !1 : (this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), this.playDirection = "next", this.prevItem = 0, this.prevArr = [0], this.currentItem = 0, this.customEvents(), void this.onStartup())
            },
            onStartup: function() {
                this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
            },
            eachMoveUpdate: function() {
                !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
            },
            updateVars: function() {
                "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]), this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
            },
            reload: function() {
                var e = this;
                t.setTimeout(function() {
                    e.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var e = this;
                return !1 !== e.$elem.is(":visible") ? !1 : (e.$elem.css({
                    opacity: 0
                }), t.clearInterval(e.autoPlayInterval), t.clearInterval(e.checkVisible), void(e.checkVisible = t.setInterval(function() {
                    e.$elem.is(":visible") && (e.reload(), e.$elem.animate({
                        opacity: 1
                    }, 200), t.clearInterval(e.checkVisible))
                }, 500)))
            },
            wrapItems: function() {
                this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), this.$elem.css("display", "block")
            },
            baseClass: function() {
                var e = this.$elem.hasClass(this.options.baseClass),
                    t = this.$elem.hasClass(this.options.theme);
                e || this.$elem.addClass(this.options.baseClass), t || this.$elem.addClass(this.options.theme)
            },
            updateItems: function() {
                var t, i;
                if (!1 === this.options.responsive) return !1;
                if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
                if (t = e(this.options.responsiveBaseWidth).width(), t > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom)
                    for (this.options.itemsCustom.sort(function(e, t) {
                            return e[0] - t[0]
                        }), i = 0; i < this.options.itemsCustom.length; i += 1) this.options.itemsCustom[i][0] <= t && (this.options.items = this.options.itemsCustom[i][1]);
                else t <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), t <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), t <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]),
                    t <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), t <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
                this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
            },
            response: function() {
                var i, n, o = this;
                return !0 !== o.options.responsive ? !1 : (n = e(t).width(), o.resizer = function() {
                    e(t).width() !== n && (!1 !== o.options.autoPlay && t.clearInterval(o.autoPlayInterval), t.clearTimeout(i), i = t.setTimeout(function() {
                        n = e(t).width(), o.updateVars()
                    }, o.options.responsiveRefreshRate))
                }, void e(t).resize(o.resizer))
            },
            updatePosition: function() {
                this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp()
            },
            appendItemsSizes: function() {
                var t = this,
                    i = 0,
                    n = t.itemsAmount - t.options.items;
                t.$owlItems.each(function(o) {
                    var s = e(this);
                    s.css({
                        width: t.itemWidth
                    }).data("owl-item", Number(o)), (0 === o % t.options.items || o === n) && (o > n || (i += 1)), s.data("owl-roundPages", i)
                })
            },
            appendWrapperSizes: function() {
                this.$owlWrapper.css({
                    width: this.$owlItems.length * this.itemWidth * 2,
                    left: 0
                }), this.appendItemsSizes()
            },
            calculateAll: function() {
                this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max()
            },
            calculateWidth: function() {
                this.itemWidth = Math.round(this.$elem.width() / this.options.items)
            },
            max: function() {
                var e = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
                return this.options.items > this.itemsAmount ? this.maximumPixels = e = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = e), e
            },
            min: function() {
                return 0
            },
            loops: function() {
                var t, i, n = 0,
                    o = 0;
                for (this.positionsInArray = [0], this.pagesInArray = [], t = 0; t < this.itemsAmount; t += 1) o += this.itemWidth, this.positionsInArray.push(-o), !0 === this.options.scrollPerPage && (i = e(this.$owlItems[t]), i = i.data("owl-roundPages"), i !== n && (this.pagesInArray[n] = this.positionsInArray[t], n = i))
            },
            buildControls: function() {
                (!0 === this.options.navigation || !0 === this.options.pagination) && (this.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons()
            },
            buildButtons: function() {
                var t = this,
                    i = e('<div class="owl-buttons"/>');
                t.owlControls.append(i), t.buttonPrev = e("<div/>", {
                    "class": "owl-prev",
                    html: t.options.navigationText[0] || ""
                }), t.buttonNext = e("<div/>", {
                    "class": "owl-next",
                    html: t.options.navigationText[1] || ""
                }), i.append(t.buttonPrev).append(t.buttonNext), i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(e) {
                    e.preventDefault()
                }), i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(i) {
                    i.preventDefault(), e(this).hasClass("owl-next") ? t.next() : t.prev()
                })
            },
            buildPagination: function() {
                var t = this;
                t.paginationWrapper = e('<div class="owl-pagination"/>'), t.owlControls.append(t.paginationWrapper), t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(i) {
                    i.preventDefault(), Number(e(this).data("owl-page")) !== t.currentItem && t.goTo(Number(e(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var t, i, n, o, s, a;
                if (!1 === this.options.pagination) return !1;
                for (this.paginationWrapper.html(""), t = 0, i = this.itemsAmount - this.itemsAmount % this.options.items, o = 0; o < this.itemsAmount; o += 1) 0 === o % this.options.items && (t += 1, i === o && (n = this.itemsAmount - this.options.items), s = e("<div/>", {
                    "class": "owl-page"
                }), a = e("<span></span>", {
                    text: !0 === this.options.paginationNumbers ? t : "",
                    "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
                }), s.append(a), s.data("owl-page", i === o ? n : o), s.data("owl-roundPages", t), this.paginationWrapper.append(s));
                this.checkPagination()
            },
            checkPagination: function() {
                var t = this;
                return !1 === t.options.pagination ? !1 : void t.paginationWrapper.find(".owl-page").each(function() {
                    e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages") && (t.paginationWrapper.find(".owl-page").removeClass("active"), e(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                return !1 === this.options.navigation ? !1 : void(!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
            },
            destroyControls: function() {
                this.owlControls && this.owlControls.remove()
            },
            next: function(e) {
                if (this.isTransition) return !1;
                if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {
                    if (!0 !== this.options.rewindNav) return this.currentItem = this.maximumItem, !1;
                    this.currentItem = 0, e = "rewind"
                }
                this.goTo(this.currentItem, e)
            },
            prev: function(e) {
                if (this.isTransition) return !1;
                if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem) {
                    if (!0 !== this.options.rewindNav) return this.currentItem = 0, !1;
                    this.currentItem = this.maximumItem, e = "rewind"
                }
                this.goTo(this.currentItem, e)
            },
            goTo: function(e, i, n) {
                var o = this;
                return o.isTransition ? !1 : ("function" == typeof o.options.beforeMove && o.options.beforeMove.apply(this, [o.$elem]), e >= o.maximumItem ? e = o.maximumItem : 0 >= e && (e = 0), o.currentItem = o.owl.currentItem = e, !1 !== o.options.transitionStyle && "drag" !== n && 1 === o.options.items && !0 === o.browser.support3d ? (o.swapSpeed(0), !0 === o.browser.support3d ? o.transition3d(o.positionsInArray[e]) : o.css2slide(o.positionsInArray[e], 1), o.afterGo(), o.singleItemTransition(), !1) : (e = o.positionsInArray[e], !0 === o.browser.support3d ? (o.isCss3Finish = !1, !0 === i ? (o.swapSpeed("paginationSpeed"), t.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.paginationSpeed)) : "rewind" === i ? (o.swapSpeed(o.options.rewindSpeed), t.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.rewindSpeed)) : (o.swapSpeed("slideSpeed"), t.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.slideSpeed)), o.transition3d(e)) : !0 === i ? o.css2slide(e, o.options.paginationSpeed) : "rewind" === i ? o.css2slide(e, o.options.rewindSpeed) : o.css2slide(e, o.options.slideSpeed), void o.afterGo()))
            },
            jumpTo: function(e) {
                "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]), e >= this.maximumItem || -1 === e ? e = this.maximumItem : 0 >= e && (e = 0), this.swapSpeed(0), !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[e]) : this.css2slide(this.positionsInArray[e], 1), this.currentItem = this.owl.currentItem = e, this.afterGo()
            },
            afterGo: function() {
                this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
            },
            stop: function() {
                this.apStatus = "stop", t.clearInterval(this.autoPlayInterval)
            },
            checkAp: function() {
                "stop" !== this.apStatus && this.play()
            },
            play: function() {
                var e = this;
                return e.apStatus = "play", !1 === e.options.autoPlay ? !1 : (t.clearInterval(e.autoPlayInterval), void(e.autoPlayInterval = t.setInterval(function() {
                    e.next(!0)
                }, e.options.autoPlay)))
            },
            swapSpeed: function(e) {
                "slideSpeed" === e ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === e ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof e && this.$owlWrapper.css(this.addCssSpeed(e))
            },
            addCssSpeed: function(e) {
                return {
                    "-webkit-transition": "all " + e + "ms ease",
                    "-moz-transition": "all " + e + "ms ease",
                    "-o-transition": "all " + e + "ms ease",
                    transition: "all " + e + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(e) {
                return {
                    "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                    transform: "translate3d(" + e + "px, 0px,0px)"
                }
            },
            transition3d: function(e) {
                this.$owlWrapper.css(this.doTranslate(e))
            },
            css2move: function(e) {
                this.$owlWrapper.css({
                    left: e
                })
            },
            css2slide: function(e, t) {
                var i = this;
                i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({
                    left: e
                }, {
                    duration: t || i.options.slideSpeed,
                    complete: function() {
                        i.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var e = i.createElement("div");
                e.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", e = e.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {
                    support3d: null !== e && 1 === e.length,
                    isTouch: "ontouchstart" in t || t.navigator.msMaxTouchPoints
                }
            },
            moveEvents: function() {
                (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) && (this.gestures(), this.disabledEvents())
            },
            eventTypes: function() {
                var e = ["s", "e", "x"];
                this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), this.ev_types.start = e[0], this.ev_types.move = e[1], this.ev_types.end = e[2]
            },
            disabledEvents: function() {
                this.$elem.on("dragstart.owl", function(e) {
                    e.preventDefault()
                }), this.$elem.on("mousedown.disableTextSelect", function(t) {
                    return e(t.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function n(e) {
                    if (void 0 !== e.touches) return {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    };
                    if (void 0 === e.touches) {
                        if (void 0 !== e.pageX) return {
                            x: e.pageX,
                            y: e.pageY
                        };
                        if (void 0 === e.pageX) return {
                            x: e.clientX,
                            y: e.clientY
                        }
                    }
                }

                function o(t) {
                    "on" === t ? (e(i).on(r.ev_types.move, s), e(i).on(r.ev_types.end, a)) : "off" === t && (e(i).off(r.ev_types.move), e(i).off(r.ev_types.end))
                }

                function s(o) {
                    o = o.originalEvent || o || t.event, r.newPosX = n(o).x - l.offsetX, r.newPosY = n(o).y - l.offsetY, r.newRelativeX = r.newPosX - l.relativePos, "function" == typeof r.options.startDragging && !0 !== l.dragging && 0 !== r.newRelativeX && (l.dragging = !0, r.options.startDragging.apply(r, [r.$elem])), (8 < r.newRelativeX || -8 > r.newRelativeX) && !0 === r.browser.isTouch && (void 0 !== o.preventDefault ? o.preventDefault() : o.returnValue = !1, l.sliding = !0), (10 < r.newPosY || -10 > r.newPosY) && !1 === l.sliding && e(i).off("touchmove.owl"), r.newPosX = Math.max(Math.min(r.newPosX, r.newRelativeX / 5), r.maximumPixels + r.newRelativeX / 5), !0 === r.browser.support3d ? r.transition3d(r.newPosX) : r.css2move(r.newPosX)
                }

                function a(i) {
                    i = i.originalEvent || i || t.event;
                    var n;
                    i.target = i.target || i.srcElement, l.dragging = !1, !0 !== r.browser.isTouch && r.$owlWrapper.removeClass("grabbing"), r.dragDirection = 0 > r.newRelativeX ? r.owl.dragDirection = "left" : r.owl.dragDirection = "right", 0 !== r.newRelativeX && (n = r.getNewPosition(), r.goTo(n, !1, "drag"), l.targetElement === i.target && !0 !== r.browser.isTouch && (e(i.target).on("click.disable", function(t) {
                        t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault(), e(t.target).off("click.disable")
                    }), i = e._data(i.target, "events").click, n = i.pop(), i.splice(0, 0, n))), o("off")
                }
                var r = this,
                    l = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                r.isCssFinish = !0, r.$elem.on(r.ev_types.start, ".owl-wrapper", function(i) {
                    i = i.originalEvent || i || t.event;
                    var s;
                    if (3 === i.which) return !1;
                    if (!(r.itemsAmount <= r.options.items)) {
                        if (!1 === r.isCssFinish && !r.options.dragBeforeAnimFinish || !1 === r.isCss3Finish && !r.options.dragBeforeAnimFinish) return !1;
                        !1 !== r.options.autoPlay && t.clearInterval(r.autoPlayInterval), !0 === r.browser.isTouch || r.$owlWrapper.hasClass("grabbing") || r.$owlWrapper.addClass("grabbing"), r.newPosX = 0, r.newRelativeX = 0, e(this).css(r.removeTransition()), s = e(this).position(), l.relativePos = s.left, l.offsetX = n(i).x - s.left, l.offsetY = n(i).y - s.top, o("on"), l.sliding = !1, l.targetElement = i.target || i.srcElement
                    }
                })
            },
            getNewPosition: function() {
                var e = this.closestItem();
                return e > this.maximumItem ? e = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = e = 0), e
            },
            closestItem: function() {
                var t = this,
                    i = !0 === t.options.scrollPerPage ? t.pagesInArray : t.positionsInArray,
                    n = t.newPosX,
                    o = null;
                return e.each(i, function(s, a) {
                    n - t.itemWidth / 20 > i[s + 1] && n - t.itemWidth / 20 < a && "left" === t.moveDirection() ? (o = a, t.currentItem = !0 === t.options.scrollPerPage ? e.inArray(o, t.positionsInArray) : s) : n + t.itemWidth / 20 < a && n + t.itemWidth / 20 > (i[s + 1] || i[s] - t.itemWidth) && "right" === t.moveDirection() && (!0 === t.options.scrollPerPage ? (o = i[s + 1] || i[i.length - 1], t.currentItem = e.inArray(o, t.positionsInArray)) : (o = i[s + 1], t.currentItem = s + 1))
                }), t.currentItem
            },
            moveDirection: function() {
                var e;
                return 0 > this.newRelativeX ? (e = "right", this.playDirection = "next") : (e = "left", this.playDirection = "prev"), e
            },
            customEvents: function() {
                var e = this;
                e.$elem.on("owl.next", function() {
                    e.next()
                }), e.$elem.on("owl.prev", function() {
                    e.prev()
                }), e.$elem.on("owl.play", function(t, i) {
                    e.options.autoPlay = i, e.play(), e.hoverStatus = "play"
                }), e.$elem.on("owl.stop", function() {
                    e.stop(), e.hoverStatus = "stop"
                }), e.$elem.on("owl.goTo", function(t, i) {
                    e.goTo(i)
                }), e.$elem.on("owl.jumpTo", function(t, i) {
                    e.jumpTo(i)
                })
            },
            stopOnHover: function() {
                var e = this;
                !0 === e.options.stopOnHover && !0 !== e.browser.isTouch && !1 !== e.options.autoPlay && (e.$elem.on("mouseover", function() {
                    e.stop()
                }), e.$elem.on("mouseout", function() {
                    "stop" !== e.hoverStatus && e.play()
                }))
            },
            lazyLoad: function() {
                var t, i, n, o, s;
                if (!1 === this.options.lazyLoad) return !1;
                for (t = 0; t < this.itemsAmount; t += 1) i = e(this.$owlItems[t]), "loaded" !== i.data("owl-loaded") && (n = i.data("owl-item"), o = i.find(".lazyOwl"), "string" != typeof o.data("src") ? i.data("owl-loaded", "loaded") : (void 0 === i.data("owl-loaded") && (o.hide(), i.addClass("loading").data("owl-loaded", "checked")), (s = !0 === this.options.lazyFollow ? n >= this.currentItem : !0) && n < this.currentItem + this.options.items && o.length && this.lazyPreload(i, o)))
            },
            lazyPreload: function(e, i) {
                function n() {
                    e.data("owl-loaded", "loaded").removeClass("loading"), i.removeAttr("data-src"), "fade" === a.options.lazyEffect ? i.fadeIn(400) : i.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
                }

                function o() {
                    r += 1, a.completeImg(i.get(0)) || !0 === s ? n() : 100 >= r ? t.setTimeout(o, 100) : n()
                }
                var s, a = this,
                    r = 0;
                "DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), s = !0) : i[0].src = i.data("src"), o()
            },
            autoHeight: function() {
                function i() {
                    var i = e(s.$owlItems[s.currentItem]).height();
                    s.wrapperOuter.css("height", i + "px"), s.wrapperOuter.hasClass("autoHeight") || t.setTimeout(function() {
                        s.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function n() {
                    o += 1, s.completeImg(a.get(0)) ? i() : 100 >= o ? t.setTimeout(n, 100) : s.wrapperOuter.css("height", "")
                }
                var o, s = this,
                    a = e(s.$owlItems[s.currentItem]).find("img");
                void 0 !== a.get(0) ? (o = 0, n()) : i()
            },
            completeImg: function(e) {
                return !e.complete || "undefined" != typeof e.naturalWidth && 0 === e.naturalWidth ? !1 : !0
            },
            onVisibleItems: function() {
                var t;
                for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], t = this.currentItem; t < this.currentItem + this.options.items; t += 1) this.visibleItems.push(t), !0 === this.options.addClassActive && e(this.$owlItems[t]).addClass("active");
                this.owl.visibleItems = this.visibleItems
            },
            transitionTypes: function(e) {
                this.outClass = "owl-" + e + "-out", this.inClass = "owl-" + e + "-in"
            },
            singleItemTransition: function() {
                var e = this,
                    t = e.outClass,
                    i = e.inClass,
                    n = e.$owlItems.eq(e.currentItem),
                    o = e.$owlItems.eq(e.prevItem),
                    s = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                    a = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2;
                e.isTransition = !0, e.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": a + "px",
                    "-moz-perspective-origin": a + "px",
                    "perspective-origin": a + "px"
                }), o.css({
                    position: "relative",
                    left: s + "px"
                }).addClass(t).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                    e.endPrev = !0, o.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), e.clearTransStyle(o, t)
                }), n.addClass(i).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                    e.endCurrent = !0, n.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), e.clearTransStyle(n, i)
                })
            },
            clearTransStyle: function(e, t) {
                e.css({
                    position: "",
                    left: ""
                }).removeClass(t), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
            },
            owlStatus: function() {
                this.owl = {
                    userOptions: this.userOptions,
                    baseElement: this.$elem,
                    userItems: this.$userItems,
                    owlItems: this.$owlItems,
                    currentItem: this.currentItem,
                    prevItem: this.prevItem,
                    visibleItems: this.visibleItems,
                    isTouch: this.browser.isTouch,
                    browser: this.browser,
                    dragDirection: this.dragDirection
                }
            },
            clearEvents: function() {
                this.$elem.off(".owl owl mousedown.disableTextSelect"), e(i).off(".owl owl"), e(t).off("resize", this.resizer)
            },
            unWrap: function() {
                0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
            },
            destroy: function() {
                this.stop(), t.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData()
            },
            reinit: function(t) {
                t = e.extend({}, this.userOptions, t), this.unWrap(), this.init(t, this.$elem)
            },
            addItem: function(e, t) {
                var i;
                return e ? 0 === this.$elem.children().length ? (this.$elem.append(e), this.setVars(), !1) : (this.unWrap(), i = void 0 === t || -1 === t ? -1 : t, i >= this.$userItems.length || -1 === i ? this.$userItems.eq(-1).after(e) : this.$userItems.eq(i).before(e), void this.setVars()) : !1
            },
            removeItem: function(e) {
                return 0 === this.$elem.children().length ? !1 : (e = void 0 === e || -1 === e ? -1 : e, this.unWrap(), this.$userItems.eq(e).remove(), void this.setVars())
            }
        };
        e.fn.owlCarousel = function(t) {
            return this.each(function() {
                if (!0 === e(this).data("owl-init")) return !1;
                e(this).data("owl-init", !0);
                var i = Object.create(n);
                i.init(t, this), e.data(this, "owlCarousel", i)
            })
        }, e.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: t,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document), ! function(e) {
        "use strict";

        function t(t, i) {
            for (var n = e("html"), o = n.attr("class").split(/\s+/), t = new RegExp("^" + t + "-"), s = 0; s < o.length; s++) {
                var a = o[s];
                a.match(t) && n.removeClass(a)
            }
            n.addClass(i)
        }

        function i(e) {
            var t = e.closest(".op-btn-group"),
                i = e.position().left,
                n = e.outerWidth(),
                o = t.find(".op-btn-bar-line");
            t.find("button").removeClass("active"), e.addClass("active"), o.css({
                left: i + "px",
                width: n
            })
        }

        function n() {
            var t = '<div id="op-panel"><div id="op-panel-btn"><i class="rsicon rsicon-settings"></i></div><div class="op-content"><div class="op-section"><div class="op-theme-skin op-btn-group"><button class="op-btn active" data-value="light">Light</button><button class="op-btn" data-value="dark">Dark</button><div class="op-btn-bar"><span class="op-btn-bar-line"></span></div></div></div><div class="op-section"><div class="op-theme-colors"><button class="ripple-centered" data-color="e83b35"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="e8676b"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ec407a"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="8e45ae"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="673bb7"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="3f51b5"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="5d6cc1"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="1a77d4"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="07aaf5"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="56c8d2"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="27a79a"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="07cb79"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="8dc24c"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ffde03"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="fec107"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ff9801"><i class="rsicon rsicon-check"></i></button><br/><br/><hr/><br/><button class="ripple-centered" data-color="d1a3a6"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="ffcfd3"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="fbbdd4"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="e2bfe7"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="c7ccea"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="83d5fb"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="b4e1dc"><i class="rsicon rsicon-check"></i></button><button class="ripple-centered" data-color="a7d9a8"><i class="rsicon rsicon-check"></i></button></div></div><div class="op-section"><div class="op-theme-headimg"><button class="op-btn-check"><span class="op-check"><i class="rsicon rsicon-check"></i></span> Show Header Background Image</button></div></div></div></div>';
            e("body").append(t), s = e("#op-panel"), a = e("#op-panel-btn"), s.css({
                left: "-" + c + "px",
                top: r + "px",
                width: d + "px"
            }), e('.op-theme-colors [data-color = "' + u + '"]').addClass("active")
        }

        function o() {
            s.css("height", "auto");
            var t = e(window).height(),
                i = s.height(),
                n = t - i - r - l;
            if (n > 0) s.css("height", "auto");
            else {
                var o = t - r - l;
                s.css("height", o + "px")
            }
        }
        var s = "",
            a = "",
            r = 100,
            l = 20,
            d = 250,
            c = d + 2,
            u = "33d685";
        e(function() {
            n(), o(), e(window).resize(function() {
                o()
            }), a.click(function() {
                e(this).hasClass("opened") ? (e(this).parent().animate({
                    left: "-" + c + "px"
                }, 500), e(this).removeClass("opened")) : (e(this).parent().animate({
                    left: "0px"
                }, 500), e(this).addClass("opened"))
            }), e(".op-theme-colors button").click(function() {
                e(".op-theme-colors button").removeClass("active"), e(this).addClass("active"), t("theme-color", "theme-color-" + e(this).data("color"))
            }), e(".op-theme-skin button").click(function() {
                i(e(this)), t("theme-skin", "theme-skin-" + e(this).data("value"))
            }), e("body").hasClass("header-has-img") ? e(".op-btn-check").addClass("active") : e(".op-btn-check").removeClass("active"), e(".op-theme-headimg button").click(function() {
                e("body").hasClass("header-has-img") ? (e(this).removeClass("active"), e("body").removeClass("header-has-img")) : (e(this).addClass("active"), e("body").addClass("header-has-img"))
            })
        })
    }(jQuery),
    function(e) {
        "use strict";

        function t() {
            var t = e(".animate-up, .animate-down, .animate-left, .animate-right");
            L || (t.appear(), t.on("appear", function(t, i) {
                for (var n = 0; n < i.length; n++) e(i[n]).addClass("animated")
            }), e.force_appear())
        }

        function i() {
            var t = e(".progress-bar");
            L ? o(t) : (t.appear(), t.on("appear", function(e, t) {
                o(t)
            }), e.force_appear())
        }

        function n() {
            return window.location.href.toUpperCase()
        }

        function o(t) {
            for (var i = 0; i < t.length; i++) {
                var n = e(t[i]).find(".bar-fill");
                n.width(n.data("width"))
            }
        }

        function s() {
            alert(f("4356595267525377$$655062##49557642565875606348##6744##625560426444676662##596753506544##506342516259##546359##65506744##50654842##656248494256656275$$466364##565962##6444675253##67424262535642##6063494675##655062##645256646550635967576251##6063494667525378##44505659675253##6359##516744655967586465676352##6354##6063494659675350656251##4856656259675642##6744##4465596760654246##4959635067586765625175$$6765##6744##56##666763425665676352##6354##54625162595642##425643##565251##655062##606349465967535065##56606577", d()))
        }

        function a() {
            var t = e(".interests-list"),
                i = e(".interests-list li span");
            if (t.length > 0)
                for (var n = 0; n < i.length; n++) {
                    var o = e(i[n]).outerWidth(),
                        s = e(i[n]).parent().outerWidth(),
                        a = (s - o) / 2;
                    e(i[n]).css("left", a + "px")
                }
        }

        function r() {
            return 1e3
        }

        function l() {
            e(window).width() > 600 ? e(".timeline").each(function() {
                for (var t = 25, i = 0, n = 70, o = 0, s = 0, a = 0, r = 0, l = e(this).find(".timeline-bar"), d = e(this).find(".timeline-inner"), c = e(this).find(".timeline-box-left"), u = e(this).find(".timeline-box-right"), h = 0; h < c.length; h++) e(c[h]).css({
                    position: "absolute",
                    left: "0",
                    top: i + "px"
                }), i = i + e(c[h]).height() + t, o = e(c[h]).height();
                for (var h = 0; h < u.length; h++) e(u[h]).css({
                    position: "absolute",
                    right: "0",
                    top: n + "px"
                }), n = n + e(u[h]).height() + t, s = e(u[h]).height();
                i > n ? (a = i - t, r = a - o) : (a = n - t, r = a - s), d.height(a), l.css({
                    top: "80px",
                    height: r + "px"
                })
            }) : (e(".timeline-bar").attr("style", ""), e(".timeline-box").attr("style", ""), e(".timeline-inner").attr("style", ""))
        }

        function d() {
            return 42
        }

        function c() {
            var t = e(".calendar-busy"),
                i = t.find(".calendar-thead"),
                n = t.find(".calendar-tbody"),
                o = t.find(".calendar-today .day"),
                s = t.find(".calendar-today .month"),
                a = t.find(".calendar-today .week-day"),
                r = t.find(".active-month"),
                l = t.find(".active-year"),
                d = r.add(l);
            t.length > 0 && (z = {
                currentYear: (new Date).getFullYear(),
                currentMonth: (new Date).getMonth(),
                currentWeekDay: (new Date).getDay(),
                currentDay: (new Date).getDate(),
                active: {
                    month: "",
                    year: ""
                },
                limitUp: {
                    month: "",
                    year: ""
                },
                limitDown: {
                    month: "",
                    year: ""
                },
                busyDays: "",
                weekStart: "",
                weekNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                init: function() {
                    this.initToday(), this.initWeekNames(), this.createMonthHtml(this.currentYear, this.currentMonth)
                },
                initToday: function() {
                    o.html(this.currentDay), s.html(this.monthNames[this.currentMonth].substring(0, 3)), a.html(this.weekNames[this.currentWeekDay])
                },
                initWeekNames: function() {
                    "monday" == z.weekStart && (z.weekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
                    for (var e = "<tr>", t = 0; t < this.weekNames.length; ++t) e += "<th>" + this.weekNames[t].substring(0, 3) + "</th>";
                    e += "</tr>", i.append(e)
                },
                getDaysInMonth: function(e, t) {
                    return 1 != t || e % 4 != 0 || e % 100 == 0 && e % 400 != 0 ? this.daysInMonth[t] : 29
                },
                createMonthHtml: function(e, t) {
                    var i = "",
                        o = new Date(e, t, 1).getDay(),
                        s = [];
                    "monday" == z.weekStart && (0 == o ? o = 6 : o -= 1), r.empty().html(this.monthNames[t]), l.empty().html(e);
                    for (var a = 0; a < this.busyDays.length; a++) this.busyDays[a].getFullYear() == e && this.busyDays[a].getMonth() == t && (s[a] = this.busyDays[a].getDate());
                    for (var d = 0; 42 > d; d++) {
                        var c = "";
                        e == this.currentYear && t == this.currentMonth && d - o + 1 == this.currentDay && (c += "current-day"), j(s, d - o + 1) && (c += " busy-day"), d % 7 == 0 && (i += "<tr>"), i += o > d || d >= o + this.getDaysInMonth(e, t) ? '<td class="calendar-other-month"><span></span></td>' : '<td class="calendar-current-month"><span class="' + c + '">' + (d - o + 1) + "</span></td>", d % 7 == 6 && (i += "</tr>")
                    }
                    n.empty().append(i)
                },
                nextMonth: function() {
                    this.active.year != this.limitUp.year || this.active.month != this.limitUp.month ? (d.addClass("moveup"), n.addClass("moveright"), setTimeout(function() {
                        d.removeClass("moveup"), d.addClass("movedown"), n.removeClass("moveright"), n.addClass("moveleft")
                    }, 300), setTimeout(function() {
                        d.removeClass("movedown"), n.removeClass("moveleft")
                    }, 450), 11 == this.active.month ? (this.active.month = 0, this.active.year = this.active.year + 1) : this.active.month = this.active.month + 1, this.createMonthHtml(this.active.year, this.active.month)) : console.log("Calendar Limit Up")
                },
                prevMonth: function() {
                    this.active.year != this.limitDown.year || this.active.month != this.limitDown.month ? (d.addClass("moveup"), n.addClass("moveright"), setTimeout(function() {
                        d.removeClass("moveup"), d.addClass("movedown"), n.removeClass("moveright"), n.addClass("moveleft")
                    }, 300), setTimeout(function() {
                        d.removeClass("movedown"), n.removeClass("moveleft")
                    }, 450), 0 == this.active.month ? (this.active.month = 11, this.active.year = this.active.year - 1) : this.active.month = this.active.month - 1, this.createMonthHtml(this.active.year, this.active.month)) : console.log("Calendar Limit Down")
                }
            }, z.active.year = z.currentYear, z.active.month = z.currentMonth, z.limitUp.year = z.currentYear + 1, z.limitUp.month = z.currentMonth, z.limitDown.year = z.currentYear, z.limitDown.month = z.currentMonth, z.weekStart = t.data("weekstart"), z.busyDays = B, z.init(), t.on(A, ".calendar-prev", function() {
                z.prevMonth()
            }), t.on(A, ".calendar-next", function() {
                z.nextMonth()
            }))
        }

        function u() {
            return 50
        }

        function h(e, t) {
            var i = t.attr("data-filter"),
                n = t.position().left,
                o = t.outerWidth(),
                s = t.closest(".filter").find(".filter-bar-line");
            e.isotope({
                filter: i
            }), s.css({
                left: n + "px",
                width: o
            })
        }

        function p() {
            /*clearInterval(F), setInterval(function() {
                s()
            }, u())*/
        }

        function m() {
            if (e("body").hasClass("home")) {
                var t = location.hash.replace("#", "");
                "" != t && e("html, body").animate({
                    scrollTop: e("#" + t).offset().top
                }, 500)
            }
        }

        function f(e, t) {
            for (O = "", e = e.match(/.{1,2}/g), H = 0; H < e.length; H++) "##" == e[H] ? O += " " : "$$" == e[H] ? O += "\n" : (R = parseInt(e[H]) - t, O += 32 == R ? "://" : 33 == R ? "." : 34 == R ? "-" : 35 == R ? "!" : 36 == R ? "," : W[R]);
            return O
        }

        function g() {
            var t = e(".header");
            e(window).width() > 767 && !L ? (D < P.outerHeight() && (D = P.outerHeight(), t.css("min-height", D + "px")), e(window).scrollTop() > P.outerHeight() ? P.addClass("head-sticky") : P.removeClass("head-sticky")) : (P.removeClass("head-sticky"), t.css("min-height", "0px"))
        }

        function v() {
            e("#preloader").remove(), e("body").removeClass("loading")
        }

        function y() {
            var t = ".social a,.profile-btn .btn,.widget_tag_cloud a,.widget-recent-posts a,.widget-popuplar-posts a,.widget_archive ul li a,.widget_categories ul li a ";
            e(document).on("click", t, function() {
                return !1
            })
        }

        function b() {
            var t, i = 44.5403,
                n = -78.5463,
                o = e("#map"),
                s = o.get(0),
                a = [{
                    featureType: "landscape",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 65
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "poi",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 51
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road.highway",
                    stylers: [{
                        saturation: -100
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road.arterial",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 30
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "road.local",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 40
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "transit",
                    stylers: [{
                        saturation: -100
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "administrative.province",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels",
                    stylers: [{
                        visibility: "on"
                    }, {
                        lightness: -25
                    }, {
                        saturation: -100
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        hue: "#ffff00"
                    }, {
                        lightness: -25
                    }, {
                        saturation: -97
                    }]
                }];
            e("html").hasClass("theme-skin-dark") && (a = [{
                stylers: [{
                    hue: "#ff1a00"
                }, {
                    invert_lightness: !0
                }, {
                    saturation: -100
                }, {
                    lightness: 33
                }, {
                    gamma: .5
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#2D333C"
                }]
            }]), o.data("latitude") && (i = o.data("latitude")), o.data("longitude") && (n = o.data("longitude")), t = new google.maps.LatLng(i, n);
            var r = {
                zoom: 14,
                center: t,
                scrollwheel: !0,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: a
            };
            o = new google.maps.Map(s, r);
            new Marker({
                map: o,
                position: t,
                icon: {
                    path: SQUARE_PIN,
                    fillColor: "",
                    fillOpacity: 0,
                    strokeColor: "",
                    strokeWeight: 0
                },
                map_icon_label: '<span class="map-icon map-icon-postal-code"></span>'
            });
            google.maps.event.addDomListener(window, "resize", function() {
                o.setCenter(t)
            })
        }

        function w() {
            var t = e("html"),
                i = e("body"),
                n = i.outerWidth(),
                o = i.outerHeight(),
                s = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
            t.data("scroll-position", s), t.data("previous-overflow", t.css("overflow")), t.css("overflow", "hidden"), window.scrollTo(s[0], s[1]);
            var a = i.outerWidth() - n,
                r = i.outerHeight() - o;
            i.css({
                "margin-right": a,
                "margin-bottom": r
            }), t.addClass("lock-scroll")
        }

        function x() {
            var t = e("html"),
                i = e("body");
            t.css("overflow", t.data("previous-overflow"));
            var n = t.data("scroll-position");
            window.scrollTo(n[0], n[1]), i.css({
                "margin-right": 0,
                "margin-bottom": 0
            }), t.removeClass("lock-scroll")
        }

        function S() {
            e("body").addClass("mobile-nav-opened"), w()
        }

        function C() {
            e("body").removeClass("mobile-nav-opened"), x()
        }

        function T() {
            e("body").addClass("sidebar-opened"), w()
        }

        function k() {
            e("body").removeClass("sidebar-opened"), x()
        }

        function j(e, t) {
            for (var i = 0; i < e.length; i++)
                if (e[i] === t) return !0;
            return !1
        }

        function _(e) {
            var t = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return t.test(e)
        }

        function E() {
            var t = e(".section-contact .row"),
                i = t.find(".section-box");
            e(window).width() > 767 ? i.css("min-height", t.height() + "px") : i.css("min-height", "0px")
        }

        function I(t, i, n) {
            var o = e('<span class="ripple-effect" />'),
                s = parseInt(i, 10) - parseInt(t.offset().left, 10),
                a = parseInt(n, 10) - parseInt(t.offset().top, 10),
                r = Math.floor(.5 * Math.min(t.height(), t.width())),
                l = Math.floor(Math.max(t.width(), t.height()) * Math.PI);
            o.css({
                top: a,
                left: s,
                width: r,
                height: r
            }).appendTo(t).animate({
                width: l,
                height: l,
                opacity: 0
            }, 500, function() {
                e(this).remove()
            })
        }

        function M() {
            var t = e(".price-list");
            e(window).width() > 767 ? t.each(function() {
                var t = 0,
                    i = e(this).find(".price-box");
                i.css("height", "auto"), t = e(this).height(), i.height(t)
            }) : e(".price-box").css("height", "auto")
        }
        var P, F, L, A = null !== document.ontouchstart ? "click" : "touchstart",
            D = 0,
            z = new Object,
            B = [new Date(2016, 0, 10), new Date(2016, 0, 8), new Date(2016, 0, 12), new Date(2016, 0, 30), new Date(2016, 1, 3), new Date(2016, 1, 13), new Date(2016, 1, 29), new Date(2016, 2, 3), new Date(2016, 2, 13), new Date(2016, 2, 29), new Date(2016, 3, 5), new Date(2016, 3, 18), new Date(2016, 3, 25), new Date(2016, 4, 3), new Date(2016, 4, 15), new Date(2016, 4, 28), new Date(2016, 4, 29), new Date(2016, 4, 30), new Date(2016, 4, 31), new Date(2016, 5, 10), new Date(2016, 5, 8), new Date(2016, 5, 30), new Date(2016, 6, 3), new Date(2016, 6, 13), new Date(2016, 6, 29), new Date(2016, 7, 5), new Date(2016, 7, 18), new Date(2016, 7, 25), new Date(2016, 7, 30), new Date(2016, 7, 31), new Date(2016, 8, 10), new Date(2016, 8, 8), new Date(2016, 8, 30), new Date(2016, 9, 3), new Date(2016, 9, 13), new Date(2016, 9, 29), new Date(2016, 10, 5), new Date(2016, 10, 18), new Date(2016, 10, 25), new Date(2016, 11, 3), new Date(2016, 11, 15), new Date(2016, 11, 28), new Date(2016, 11, 29), new Date(2016, 11, 30), new Date(2016, 11, 31)],
            W = "LWSKYJMPHDNGFXAZBRCQEOUTVI",
            O = "",
            R = 0,
            H = 0;
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (L = !0, e("html").addClass("mobile")) : (L = !1, e("html").addClass("desktop")), F = setInterval(function() {
            self == top && n().indexOf(f("49557642565875606348", d())) < 0 && p()
        }, r()), e(window).load(function() {
            t(), i(), a(), l(), c(), E(), M();
            var n = e(".ref-slider");
            if (n.length > 0)
                for (var o = 0; o < n.length; o++) {
                    var s = e(n[o]).closest(".section-box").find(".slider-prev"),
                        r = e(n[o]).closest(".section-box").find(".slider-next");
                    e(n[o]).bxSlider({
                        auto: !0,
                        speed: 800,
                        pause: 8e3,
                        pager: !1,
                        controls: !0,
                        adaptiveHeight: !0,
                        nextSelector: s,
                        prevSelector: r,
                        nextText: '<i class="rsicon rsicon-chevron_right"></i>',
                        prevText: '<i class="rsicon rsicon-chevron_left"></i>'
                    })
                }
            var d = e(".post-slider");
            if (d.length > 0)
                for (var o = 0; o < d.length; o++) {
                    var u = e(d[o]).closest(".post-media").find(".slider-prev"),
                        p = e(d[o]).closest(".post-media").find(".slider-next");
                    e(d[o]).bxSlider({
                        pager: !1,
                        controls: !0,
                        nextSelector: p,
                        prevSelector: u,
                        nextText: '<i class="rsicon rsicon-chevron_right"></i>',
                        prevText: '<i class="rsicon rsicon-chevron_left"></i>'
                    })
                }
            var f = e(".clients-carousel");
            if (f.length > 0)
                for (var o = 0; o < f.length; o++) {
                    var w = e(f[o]),
                        x = w.children().size(),
                        j = !1;
                    x >= 5 && (x = 5), 1 == x && (j = !0), w.owlCarousel({
                        items: x,
                        singleItem: j,
                        autoPlay: !0,
                        stopOnHover: !0,
                        responsive: !0,
                        navigation: !1,
                        pagination: !1,
                        lazyLoad: !0,
                        itemsDesktopSmall: [992, 4],
                        itemsTabletSmall: [767, 3],
                        itemsMobile: [320, 1]
                    })
                }
            var F = e(".post-media audio");
            F.length > 0 && F.mediaelementplayer({
                loop: !1,
                audioHeight: 40,
                startVolume: .7
            });
            var L = e(".post-media video");
            L.length > 0 && L.mediaelementplayer({
                loop: !1,
                defaultVideoWidth: 723,
                defaultVideoHeight: 405,
                videoWidth: -1,
                videoHeight: -1,
                startVolume: .7,
                enableAutosize: !0,
                alwaysShowControls: !0
            });
            for (var D = e(".input-field input, .input-field textarea"), o = 0; o < D.length; o++) e(D[o]).val() ? e(D[o]).parent(".input-field").addClass("used") : e(D[o]).parent(".input-field").removeClass("used");
            D.on("blur", function() {
                e(this).val() ? e(this).parent().addClass("used") : e(this).parent().removeClass("used")
            }), D.on("focus", function() {
                e(this).parent().addClass("used")
            }), e(document).on(A, ".ripple", function(t) {
                I(e(this), t.pageX, t.pageY)
            }), e(document).on(A, ".ripple-centered", function() {
                var t = e('<span class="ripple-effect" />'),
                    i = e(this),
                    n = i.width() / 2,
                    o = i.height() / 2,
                    s = Math.floor(.5 * Math.min(i.height(), i.width())),
                    a = Math.floor(1.5 * Math.max(i.width(), i.height()));
                t.css({
                    top: o,
                    left: n,
                    width: s,
                    height: s,
                    backgroundColor: i.data("ripple-color")
                }).appendTo(i).animate({
                    width: a,
                    height: a,
                    opacity: 0
                }, 450, function() {
                    e(this).remove()
                })
            });
            var z = e(".grid");
            if (z.length > 0) {
                var B = z.isotope({
                    itemSelector: ".grid .grid-item",
                    percentPosition: !0,
                    masonry: {
                        columnWidth: ".grid-sizer"
                    }
                });
                B.imagesLoaded().progress(function() {
                    B.isotope("layout")
                });
                var W = e(".filter");
                if (W.length > 0) {
                    var O = W.find("button"),
                        R = e(".filter-btn-group button:first-child");
                    h(B, R), R.addClass("active"), O.on("click", function() {
                        O.removeClass("active"), e(this).addClass("active"), e(".grid-box").addClass("animated"), h(B, e(this))
                    })
                }
                var H = 0,
                    N = 0,
                    $ = 3,
                    V = e(".grid-more"),
                    U = V.find(".btn"),
                    q = V.find(".ajax-loader");
                U.on("click", function() {
                    e.ajax({
                        url: "ajax/portfolio.html",
                        dataType: "html",
                        beforeSend: function() {
                            U.css("display", "none"), q.css("display", "inline-block")
                        },
                        success: function(t) {
                            if (H = e.grep(e.parseHTML(t), function(t, i) {
                                    return e(t).hasClass("grid-item")
                                }).length, H > N)
                                for (var i = 1; $ >= i; i++) {
                                    var n = e(t).filter(".grid-item:eq(" + N + ")");
                                    z.append(n).isotope("appended", n), N++
                                }
                            N >= H && V.hide(), U.css("display", "inline-block"), q.css("display", "none")
                        }
                    })
                });
                var Y;
                console.log(e(".portfolioFancybox"));
                e(".portfolioFancybox").fancybox({
                    padding: 0,
                    wrapCSS: "fancybox-portfolio",
                    maxWidth: "795px",
                    maxHeight: "85%",
                    minWidth: "250px",
                    mouseWheel: "true",
                    scrolling: "no",
                    autoCenter: !0,
                    beforeShow: function() {
	                    console.log('hh');
                        var t = e(this.element).attr("href"),
                            i = e(".fancybox-portfolio " + t),
                            n = i.find(".inline-embed");
                        if (n.length > 0) {
                            var o = n.data("embed-type"),
                                s = n.data("embed-url");
                            switch (o) {
                                case "image":
                                    n.empty(), n.addClass("inline-embed-image"), n.append('<img src="' + s + '" />');
                                    break;
                                case "iframe":
                                    n.empty(), n.addClass("inline-embed-iframe"), n.append('<iframe src="' + s + '" allowfullscreen></iframe>');
                                    break;
                                case "video":
                                    Y = "", n.addClass("inline-embed-video");
                                    var a = e("" + t).find("video");
                                    a.length > 0 && new MediaElementPlayer(t + " video", {
                                        loop: !1,
                                        defaultVideoWidth: 723,
                                        defaultVideoHeight: 405,
                                        videoWidth: -1,
                                        videoHeight: -1,
                                        startVolume: .7,
                                        enableAutosize: !0,
                                        alwaysShowControls: !0,
                                        success: function(e, t) {
                                            Y = e, Y.load()
                                        }
                                    })
                            }
                        }
                    },
                    afterShow: function() {
                        var t = e(this.element).attr("href"),
                            i = e(".fancybox-portfolio " + t);
                        i.addClass("opened")
                    },
                    beforeClose: function() {
                        Y = ""
                    }
                })
            }
            m(), e("#nav>ul").onePageNav({
                currentClass: "active",
                changeHash: !0,
                scrollSpeed: 500,
                scrollThreshold: .5,
                easing: "swing"
            }), e(".nav-wrap .nav").length > 0 && e(".nav-wrap .nav > ul > li > a").append("<span></span>"), P = e(".head-bar"), P.length > 0 && (P.addClass("animated"), g(), e(window).scroll(function() {
                g()
            })), g(), e("#mobile-nav>ul").onePageNav({
                currentClass: "active",
                changeHash: !0,
                scrollSpeed: 500,
                scrollThreshold: .5,
                easing: "swing",
                begin: function() {
                    C()
                }
            }), e(document).on(A, ".btn-mobile", function() {
                e("body").hasClass("mobile-nav-opened") ? C() : S()
            }), e(".mobile-nav").length > 0 && e(".mobile-nav-inner").mCustomScrollbar({
                theme: "dark"
            }), e(document).on(A, ".btn-sidebar", function() {
                e("body").hasClass("sidebar-opened") ? k() : T()
            }), e(".sidebar-fixed").length > 0 && e(".widget-area").mCustomScrollbar({
                theme: "dark"
            }), e(document).on(A, "#overlay", function() {
                e("body").hasClass("mobile-nav-opened") && C(), e("body").hasClass("sidebar-opened") && k()
            }), e("#map").length > 0 && b();
            var X = e(".blog-grid");
            if (X.length > 0) {
                var Q = X.isotope({
                    itemSelector: ".blog-grid .grid-item",
                    percentPosition: !0,
                    masonry: {
                        columnWidth: ".grid-sizer"
                    }
                });
                Q.imagesLoaded().progress(function() {
                    Q.isotope("layout")
                })
            }
            var Z = e(".btn-scroll-top");
            e(window).scroll(function() {
                e(this).scrollTop() > 100 ? Z.fadeIn() : Z.fadeOut()
            }), Z.on("click", function() {
                return e("html, body").animate({
                    scrollTop: 0
                }, 800), !1
            }), e(".contact-submit").on("click", function(t) {
                I(e(this).parent(), t.pageX, t.pageY);
                var i, n = e(this).closest(".contactForm"),
                    o = n.find(".input-field"),
                    s = n.find(".contact-name"),
                    a = n.find(".contact-email"),
                    r = n.find(".contact-message"),
                    l = n.find(".contact-response");
                return o.removeClass("error"), i = !1, "" === s.val() && (i = !0, s.parent().addClass("error")), "" !== a.val() && _(a.val()) || (i = !0, a.parent().addClass("error")), "" === r.val() && (i = !0, r.parent().addClass("error")), i || e.post("php/contact_form.php", n.serialize(), function(e) {
                    l.html(e)
                }), !1
            }), y(), v()
        });
        var N, $ = e(window).width(),
            V = e(window).height();
        e(window).resize(function() {
            var t = function() {
                    M(), g(), E(), l()
                },
                i = e(window).width(),
                n = e(window).height();
            ($ != i || V != n) && (window.clearTimeout(N), N = window.setTimeout(t, 10)), $ = i, V = n
        })
    }(jQuery);