var themePhotoswipe = function(e) {
    "use strict";

    function t(e, t) {
        return t.forEach((function(t) {
            t && "string" != typeof t && !Array.isArray(t) && Object.keys(t).forEach((function(n) {
                if ("default" !== n && !(n in e)) {
                    var o = Object.getOwnPropertyDescriptor(t, n);
                    Object.defineProperty(e, n, o.get ? o : {
                        enumerable: !0,
                        get: function() {
                            return t[n]
                        }
                    })
                }
            }))
        })), Object.freeze(e)
    }
    "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var n, o = {
        exports: {}
    };
    o.exports = (n = function(e, t, n, o) {
        var i = {
            features: null,
            bind: function(e, t, n, o) {
                var i = (o ? "remove" : "add") + "EventListener";
                t = t.split(" ");
                for (var a = 0; a < t.length; a++) t[a] && e[i](t[a], n, !1)
            },
            isArray: function(e) {
                return e instanceof Array
            },
            createEl: function(e, t) {
                var n = document.createElement(t || "div");
                return e && (n.className = e), n
            },
            getScrollY: function() {
                var e = window.pageYOffset;
                return void 0 !== e ? e : document.documentElement.scrollTop
            },
            unbind: function(e, t, n) {
                i.bind(e, t, n, !0)
            },
            removeClass: function(e, t) {
                var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(n, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(e, t) {
                i.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
            },
            hasClass: function(e, t) {
                return e.className && new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
            },
            getChildByClass: function(e, t) {
                for (var n = e.firstChild; n;) {
                    if (i.hasClass(n, t)) return n;
                    n = n.nextSibling
                }
            },
            arraySearch: function(e, t, n) {
                for (var o = e.length; o--;)
                    if (e[o][n] === t) return o;
                return -1
            },
            extend: function(e, t, n) {
                for (var o in t)
                    if (t.hasOwnProperty(o)) {
                        if (n && e.hasOwnProperty(o)) continue;
                        e[o] = t[o]
                    }
            },
            easing: {
                sine: {
                    out: function(e) {
                        return Math.sin(e * (Math.PI / 2))
                    },
                    inOut: function(e) {
                        return -(Math.cos(Math.PI * e) - 1) / 2
                    }
                },
                cubic: {
                    out: function(e) {
                        return --e * e * e + 1
                    }
                }
            },
            detectFeatures: function() {
                if (i.features) return i.features;
                var e = i.createEl().style,
                    t = "",
                    n = {};
                if (n.oldIE = document.all && !document.addEventListener, n.touch = "ontouchstart" in window, window.requestAnimationFrame && (n.raf = window.requestAnimationFrame, n.caf = window.cancelAnimationFrame), n.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled, !n.pointerEvent) {
                    var o = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        a && a.length > 0 && (a = parseInt(a[1], 10)) >= 1 && a < 8 && (n.isOldIOSPhone = !0)
                    }
                    var r = o.match(/Android\s([0-9\.]*)/),
                        l = r ? r[1] : 0;
                    (l = parseFloat(l)) >= 1 && (l < 4.4 && (n.isOldAndroid = !0), n.androidVersion = l), n.isMobileOpera = /opera mini|opera mobi/i.test(o)
                }
                for (var s, u, c = ["transform", "perspective", "animationName"], d = ["", "webkit", "Moz", "ms", "O"], p = 0; p < 4; p++) {
                    t = d[p];
                    for (var m = 0; m < 3; m++) s = c[m], u = t + (t ? s.charAt(0).toUpperCase() + s.slice(1) : s), !n[s] && u in e && (n[s] = u);
                    t && !n.raf && (t = t.toLowerCase(), n.raf = window[t + "RequestAnimationFrame"], n.raf && (n.caf = window[t + "CancelAnimationFrame"] || window[t + "CancelRequestAnimationFrame"]))
                }
                if (!n.raf) {
                    var f = 0;
                    n.raf = function(e) {
                        var t = (new Date).getTime(),
                            n = Math.max(0, 16 - (t - f)),
                            o = window.setTimeout((function() {
                                e(t + n)
                            }), n);
                        return f = t + n, o
                    }, n.caf = function(e) {
                        clearTimeout(e)
                    }
                }
                return n.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, i.features = n, n
            }
        };
        i.detectFeatures(), i.features.oldIE && (i.bind = function(e, t, n, o) {
            t = t.split(" ");
            for (var i, a = (o ? "detach" : "attach") + "Event", r = function() {
                    n.handleEvent.call(n)
                }, l = 0; l < t.length; l++)
                if (i = t[l])
                    if ("object" == typeof n && n.handleEvent) {
                        if (o) {
                            if (!n["oldIE" + i]) return !1
                        } else n["oldIE" + i] = r;
                        e[a]("on" + i, n["oldIE" + i])
                    } else e[a]("on" + i, n)
        });
        var a = this,
            r = 25,
            l = 3,
            s = {
                allowPanToNext: !0,
                spacing: .12,
                bgOpacity: 1,
                mouseUsed: !1,
                loop: !0,
                pinchToClose: !0,
                closeOnScroll: !0,
                closeOnVerticalDrag: !0,
                verticalDragRange: .75,
                hideAnimationDuration: 333,
                showAnimationDuration: 333,
                showHideOpacity: !1,
                focus: !0,
                escKey: !0,
                arrowKeys: !0,
                mainScrollEndFriction: .35,
                panEndFriction: .35,
                isClickableElement: function(e) {
                    return "A" === e.tagName
                },
                getDoubleTapZoom: function(e, t) {
                    return e || t.initialZoomLevel < .7 ? 1 : 1.33
                },
                maxSpreadZoom: 1.33,
                modal: !0,
                scaleMode: "fit"
            };
        i.extend(s, o);
        var u, c, d, p, m, f, h, v, g, y, x, w, b, C, I, T, E, _, D, S, M, O, F, k, A, R, L, P, Z, z, N, U, K, H, W, B, Y, G, q, V, X, j, $, J, Q, ee, te, ne, oe, ie, ae, re, le, se, ue, ce, de = function() {
                return {
                    x: 0,
                    y: 0
                }
            },
            pe = de(),
            me = de(),
            fe = de(),
            he = {},
            ve = 0,
            ge = {},
            ye = de(),
            xe = 0,
            we = !0,
            be = [],
            Ce = {},
            Ie = !1,
            Te = function(e, t) {
                i.extend(a, t.publicMethods), be.push(e)
            },
            Ee = function(e) {
                var t = Qt();
                return e > t - 1 ? e - t : e < 0 ? t + e : e
            },
            _e = {},
            De = function(e, t) {
                return _e[e] || (_e[e] = []), _e[e].push(t)
            },
            Se = function(e) {
                var t = _e[e];
                if (t) {
                    var n = Array.prototype.slice.call(arguments);
                    n.shift();
                    for (var o = 0; o < t.length; o++) t[o].apply(a, n)
                }
            },
            Me = function() {
                return (new Date).getTime()
            },
            Oe = function(e) {
                se = e, a.bg.style.opacity = e * s.bgOpacity
            },
            Fe = function(e, t, n, o, i) {
                (!Ie || i && i !== a.currItem) && (o /= i ? i.fitRatio : a.currItem.fitRatio), e[O] = w + t + "px, " + n + "px" + b + " scale(" + o + ")"
            },
            ke = function(e) {
                oe && (e && (y > a.currItem.fitRatio ? Ie || (dn(a.currItem, !1, !0), Ie = !0) : Ie && (dn(a.currItem), Ie = !1)), Fe(oe, fe.x, fe.y, y))
            },
            Ae = function(e) {
                e.container && Fe(e.container.style, e.initialPosition.x, e.initialPosition.y, e.initialZoomLevel, e)
            },
            Re = function(e, t) {
                t[O] = w + e + "px, 0px" + b
            },
            Le = function(e, t) {
                if (!s.loop && t) {
                    var n = p + (ye.x * ve - e) / ye.x,
                        o = Math.round(e - yt.x);
                    (n < 0 && o > 0 || n >= Qt() - 1 && o < 0) && (e = yt.x + o * s.mainScrollEndFriction)
                }
                yt.x = e, Re(e, m)
            },
            Pe = function(e, t) {
                var n = xt[e] - ge[e];
                return me[e] + pe[e] + n - n * (t / x)
            },
            Ze = function(e, t) {
                e.x = t.x, e.y = t.y, t.id && (e.id = t.id)
            },
            ze = function(e) {
                e.x = Math.round(e.x), e.y = Math.round(e.y)
            },
            Ne = null,
            Ue = function() {
                Ne && (i.unbind(document, "mousemove", Ue), i.addClass(e, "pswp--has_mouse"), s.mouseUsed = !0, Se("mouseUsed")), Ne = setTimeout((function() {
                    Ne = null
                }), 100)
            },
            Ke = function() {
                i.bind(document, "keydown", a), N.transform && i.bind(a.scrollWrap, "click", a), s.mouseUsed || i.bind(document, "mousemove", Ue), i.bind(window, "resize scroll orientationchange", a), Se("bindEvents")
            },
            He = function() {
                i.unbind(window, "resize scroll orientationchange", a), i.unbind(window, "scroll", g.scroll), i.unbind(document, "keydown", a), i.unbind(document, "mousemove", Ue), N.transform && i.unbind(a.scrollWrap, "click", a), q && i.unbind(window, h, a), clearTimeout(U), Se("unbindEvents")
            },
            We = function(e, t) {
                var n = ln(a.currItem, he, e);
                return t && (ne = n), n
            },
            Be = function(e) {
                return e || (e = a.currItem), e.initialZoomLevel
            },
            Ye = function(e) {
                return e || (e = a.currItem), e.w > 0 ? s.maxSpreadZoom : 1
            },
            Ge = function(e, t, n, o) {
                return o === a.currItem.initialZoomLevel ? (n[e] = a.currItem.initialPosition[e], !0) : (n[e] = Pe(e, o), n[e] > t.min[e] ? (n[e] = t.min[e], !0) : n[e] < t.max[e] && (n[e] = t.max[e], !0))
            },
            qe = function() {
                if (O) {
                    var t = N.perspective && !k;
                    return w = "translate" + (t ? "3d(" : "("), void(b = N.perspective ? ", 0px)" : ")")
                }
                O = "left", i.addClass(e, "pswp--ie"), Re = function(e, t) {
                    t.left = e + "px"
                }, Ae = function(e) {
                    var t = e.fitRatio > 1 ? 1 : e.fitRatio,
                        n = e.container.style,
                        o = t * e.w,
                        i = t * e.h;
                    n.width = o + "px", n.height = i + "px", n.left = e.initialPosition.x + "px", n.top = e.initialPosition.y + "px"
                }, ke = function() {
                    if (oe) {
                        var e = oe,
                            t = a.currItem,
                            n = t.fitRatio > 1 ? 1 : t.fitRatio,
                            o = n * t.w,
                            i = n * t.h;
                        e.width = o + "px", e.height = i + "px", e.left = fe.x + "px", e.top = fe.y + "px"
                    }
                }
            },
            Ve = function(e) {
                var t = "";
                s.escKey && 27 === e.keyCode ? t = "close" : s.arrowKeys && (37 === e.keyCode ? t = "prev" : 39 === e.keyCode && (t = "next")), t && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a[t]()))
            },
            Xe = function(e) {
                e && (j || X || ie || Y) && (e.preventDefault(), e.stopPropagation())
            },
            je = function() {
                a.setScrollOffset(0, i.getScrollY())
            },
            $e = {},
            Je = 0,
            Qe = function(e) {
                $e[e] && ($e[e].raf && R($e[e].raf), Je--, delete $e[e])
            },
            et = function(e) {
                $e[e] && Qe(e), $e[e] || (Je++, $e[e] = {})
            },
            tt = function() {
                for (var e in $e) $e.hasOwnProperty(e) && Qe(e)
            },
            nt = function(e, t, n, o, i, a, r) {
                var l, s = Me();
                et(e);
                var u = function() {
                    if ($e[e]) {
                        if ((l = Me() - s) >= o) return Qe(e), a(n), void(r && r());
                        a((n - t) * i(l / o) + t), $e[e].raf = A(u)
                    }
                };
                u()
            },
            ot = {
                shout: Se,
                listen: De,
                viewportSize: he,
                options: s,
                isMainScrollAnimating: function() {
                    return ie
                },
                getZoomLevel: function() {
                    return y
                },
                getCurrentIndex: function() {
                    return p
                },
                isDragging: function() {
                    return q
                },
                isZooming: function() {
                    return ee
                },
                setScrollOffset: function(e, t) {
                    ge.x = e, z = ge.y = t, Se("updateScrollOffset", ge)
                },
                applyZoomPan: function(e, t, n, o) {
                    fe.x = t, fe.y = n, y = e, ke(o)
                },
                init: function() {
                    if (!u && !c) {
                        var n;
                        a.framework = i, a.template = e, a.bg = i.getChildByClass(e, "pswp__bg"), L = e.className, u = !0, N = i.detectFeatures(), A = N.raf, R = N.caf, O = N.transform, Z = N.oldIE, a.scrollWrap = i.getChildByClass(e, "pswp__scroll-wrap"), a.container = i.getChildByClass(a.scrollWrap, "pswp__container"), m = a.container.style, a.itemHolders = T = [{
                            el: a.container.children[0],
                            wrap: 0,
                            index: -1
                        }, {
                            el: a.container.children[1],
                            wrap: 0,
                            index: -1
                        }, {
                            el: a.container.children[2],
                            wrap: 0,
                            index: -1
                        }], T[0].el.style.display = T[2].el.style.display = "none", qe(), g = {
                            resize: a.updateSize,
                            orientationchange: function() {
                                clearTimeout(U), U = setTimeout((function() {
                                    he.x !== a.scrollWrap.clientWidth && a.updateSize()
                                }), 500)
                            },
                            scroll: je,
                            keydown: Ve,
                            click: Xe
                        };
                        var o = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
                        for (N.animationName && N.transform && !o || (s.showAnimationDuration = s.hideAnimationDuration = 0), n = 0; n < be.length; n++) a["init" + be[n]]();
                        t && (a.ui = new t(a, i)).init(), Se("firstUpdate"), p = p || s.index || 0, (isNaN(p) || p < 0 || p >= Qt()) && (p = 0), a.currItem = Jt(p), (N.isOldIOSPhone || N.isOldAndroid) && (we = !1), e.setAttribute("aria-hidden", "false"), s.modal && (we ? e.style.position = "fixed" : (e.style.position = "absolute", e.style.top = i.getScrollY() + "px")), void 0 === z && (Se("initialLayout"), z = P = i.getScrollY());
                        var r = "pswp--open ";
                        for (s.mainClass && (r += s.mainClass + " "), s.showHideOpacity && (r += "pswp--animate_opacity "), r += k ? "pswp--touch" : "pswp--notouch", r += N.animationName ? " pswp--css_animation" : "", r += N.svg ? " pswp--svg" : "", i.addClass(e, r), a.updateSize(), f = -1, xe = null, n = 0; n < l; n++) Re((n + f) * ye.x, T[n].el.style);
                        Z || i.bind(a.scrollWrap, v, a), De("initialZoomInEnd", (function() {
                            a.setContent(T[0], p - 1), a.setContent(T[2], p + 1), T[0].el.style.display = T[2].el.style.display = "block", s.focus && e.focus(), Ke()
                        })), a.setContent(T[1], p), a.updateCurrItem(), Se("afterInit"), we || (C = setInterval((function() {
                            Je || q || ee || y !== a.currItem.initialZoomLevel || a.updateSize()
                        }), 1e3)), i.addClass(e, "pswp--visible")
                    }
                },
                close: function() {
                    u && (u = !1, c = !0, Se("close"), He(), en(a.currItem, null, !0, a.destroy))
                },
                destroy: function() {
                    Se("destroy"), Vt && clearTimeout(Vt), e.setAttribute("aria-hidden", "true"), e.className = L, C && clearInterval(C), i.unbind(a.scrollWrap, v, a), i.unbind(window, "scroll", a), Tt(), tt(), _e = null
                },
                panTo: function(e, t, n) {
                    n || (e > ne.min.x ? e = ne.min.x : e < ne.max.x && (e = ne.max.x), t > ne.min.y ? t = ne.min.y : t < ne.max.y && (t = ne.max.y)), fe.x = e, fe.y = t, ke()
                },
                handleEvent: function(e) {
                    e = e || window.event, g[e.type] && g[e.type](e)
                },
                goTo: function(e) {
                    var t = (e = Ee(e)) - p;
                    xe = t, p = e, a.currItem = Jt(p), ve -= t, Le(ye.x * ve), tt(), ie = !1, a.updateCurrItem()
                },
                next: function() {
                    a.goTo(p + 1)
                },
                prev: function() {
                    a.goTo(p - 1)
                },
                updateCurrZoomItem: function(e) {
                    if (e && Se("beforeChange", 0), T[1].el.children.length) {
                        var t = T[1].el.children[0];
                        oe = i.hasClass(t, "pswp__zoom-wrap") ? t.style : null
                    } else oe = null;
                    ne = a.currItem.bounds, x = y = a.currItem.initialZoomLevel, fe.x = ne.center.x, fe.y = ne.center.y, e && Se("afterChange")
                },
                invalidateCurrItems: function() {
                    I = !0;
                    for (var e = 0; e < l; e++) T[e].item && (T[e].item.needsUpdate = !0)
                },
                updateCurrItem: function(e) {
                    if (0 !== xe) {
                        var t, n = Math.abs(xe);
                        if (!(e && n < 2)) {
                            a.currItem = Jt(p), Ie = !1, Se("beforeChange", xe), n >= l && (f += xe + (xe > 0 ? -l : l), n = l);
                            for (var o = 0; o < n; o++) xe > 0 ? (t = T.shift(), T[l - 1] = t, f++, Re((f + 2) * ye.x, t.el.style), a.setContent(t, p - n + o + 1 + 1)) : (t = T.pop(), T.unshift(t), f--, Re(f * ye.x, t.el.style), a.setContent(t, p + n - o - 1 - 1));
                            if (oe && 1 === Math.abs(xe)) {
                                var i = Jt(E);
                                i.initialZoomLevel !== y && (ln(i, he), dn(i), Ae(i))
                            }
                            xe = 0, a.updateCurrZoomItem(), E = p, Se("afterChange")
                        }
                    }
                },
                updateSize: function(t) {
                    if (!we && s.modal) {
                        var n = i.getScrollY();
                        if (z !== n && (e.style.top = n + "px", z = n), !t && Ce.x === window.innerWidth && Ce.y === window.innerHeight) return;
                        Ce.x = window.innerWidth, Ce.y = window.innerHeight, e.style.height = Ce.y + "px"
                    }
                    if (he.x = a.scrollWrap.clientWidth, he.y = a.scrollWrap.clientHeight, je(), ye.x = he.x + Math.round(he.x * s.spacing), ye.y = he.y, Le(ye.x * ve), Se("beforeResize"), void 0 !== f) {
                        for (var o, r, u, c = 0; c < l; c++) o = T[c], Re((c + f) * ye.x, o.el.style), u = p + c - 1, s.loop && Qt() > 2 && (u = Ee(u)), (r = Jt(u)) && (I || r.needsUpdate || !r.bounds) ? (a.cleanSlide(r), a.setContent(o, u), 1 === c && (a.currItem = r, a.updateCurrZoomItem(!0)), r.needsUpdate = !1) : -1 === o.index && u >= 0 && a.setContent(o, u), r && r.container && (ln(r, he), dn(r), Ae(r));
                        I = !1
                    }
                    x = y = a.currItem.initialZoomLevel, (ne = a.currItem.bounds) && (fe.x = ne.center.x, fe.y = ne.center.y, ke(!0)), Se("resize")
                },
                zoomTo: function(e, t, n, o, a) {
                    t && (x = y, xt.x = Math.abs(t.x) - fe.x, xt.y = Math.abs(t.y) - fe.y, Ze(me, fe));
                    var r = We(e, !1),
                        l = {};
                    Ge("x", r, l, e), Ge("y", r, l, e);
                    var s = y,
                        u = {
                            x: fe.x,
                            y: fe.y
                        };
                    ze(l);
                    var c = function(t) {
                        1 === t ? (y = e, fe.x = l.x, fe.y = l.y) : (y = (e - s) * t + s, fe.x = (l.x - u.x) * t + u.x, fe.y = (l.y - u.y) * t + u.y), a && a(t), ke(1 === t)
                    };
                    n ? nt("customZoomTo", 0, 1, n, o || i.easing.sine.inOut, c) : c(1)
                }
            },
            it = 30,
            at = 10,
            rt = {},
            lt = {},
            st = {},
            ut = {},
            ct = {},
            dt = [],
            pt = {},
            mt = [],
            ft = {},
            ht = 0,
            vt = de(),
            gt = 0,
            yt = de(),
            xt = de(),
            wt = de(),
            bt = function(e, t) {
                return e.x === t.x && e.y === t.y
            },
            Ct = function(e, t) {
                return Math.abs(e.x - t.x) < r && Math.abs(e.y - t.y) < r
            },
            It = function(e, t) {
                return ft.x = Math.abs(e.x - t.x), ft.y = Math.abs(e.y - t.y), Math.sqrt(ft.x * ft.x + ft.y * ft.y)
            },
            Tt = function() {
                $ && (R($), $ = null)
            },
            Et = function() {
                q && ($ = A(Et), Kt())
            },
            _t = function() {
                return !("fit" === s.scaleMode && y === a.currItem.initialZoomLevel)
            },
            Dt = function(e, t) {
                return !(!e || e === document) && !(e.getAttribute("class") && e.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (t(e) ? e : Dt(e.parentNode, t))
            },
            St = {},
            Mt = function(e, t) {
                return St.prevent = !Dt(e.target, s.isClickableElement), Se("preventDragEvent", e, t, St), St.prevent
            },
            Ot = function(e, t) {
                return t.x = e.pageX, t.y = e.pageY, t.id = e.identifier, t
            },
            Ft = function(e, t, n) {
                n.x = .5 * (e.x + t.x), n.y = .5 * (e.y + t.y)
            },
            kt = function(e, t, n) {
                if (e - H > 50) {
                    var o = mt.length > 2 ? mt.shift() : {};
                    o.x = t, o.y = n, mt.push(o), H = e
                }
            },
            At = function() {
                var e = fe.y - a.currItem.initialPosition.y;
                return 1 - Math.abs(e / (he.y / 2))
            },
            Rt = {},
            Lt = {},
            Pt = [],
            Zt = function(e) {
                for (; Pt.length > 0;) Pt.pop();
                return F ? (ce = 0, dt.forEach((function(e) {
                    0 === ce ? Pt[0] = e : 1 === ce && (Pt[1] = e), ce++
                }))) : e.type.indexOf("touch") > -1 ? e.touches && e.touches.length > 0 && (Pt[0] = Ot(e.touches[0], Rt), e.touches.length > 1 && (Pt[1] = Ot(e.touches[1], Lt))) : (Rt.x = e.pageX, Rt.y = e.pageY, Rt.id = "", Pt[0] = Rt), Pt
            },
            zt = function(e, t) {
                var n, o, i, r, l = fe[e] + t[e],
                    u = t[e] > 0,
                    c = yt.x + t.x,
                    d = yt.x - pt.x;
                if (n = l > ne.min[e] || l < ne.max[e] ? s.panEndFriction : 1, l = fe[e] + t[e] * n, (s.allowPanToNext || y === a.currItem.initialZoomLevel) && (oe ? "h" !== ae || "x" !== e || X || (u ? (l > ne.min[e] && (n = s.panEndFriction, ne.min[e], o = ne.min[e] - me[e]), (o <= 0 || d < 0) && Qt() > 1 ? (r = c, d < 0 && c > pt.x && (r = pt.x)) : ne.min.x !== ne.max.x && (i = l)) : (l < ne.max[e] && (n = s.panEndFriction, ne.max[e], o = me[e] - ne.max[e]), (o <= 0 || d > 0) && Qt() > 1 ? (r = c, d > 0 && c < pt.x && (r = pt.x)) : ne.min.x !== ne.max.x && (i = l))) : r = c, "x" === e)) return void 0 !== r && (Le(r, !0), J = r !== pt.x), ne.min.x !== ne.max.x && (void 0 !== i ? fe.x = i : J || (fe.x += t.x * n)), void 0 !== r;
                ie || J || y > a.currItem.fitRatio && (fe[e] += t[e] * n)
            },
            Nt = function(e) {
                if (!("mousedown" === e.type && e.button > 0))
                    if ($t) e.preventDefault();
                    else if (!G || "mousedown" !== e.type) {
                    if (Mt(e, !0) && e.preventDefault(), Se("pointerDown"), F) {
                        var t = i.arraySearch(dt, e.pointerId, "id");
                        t < 0 && (t = dt.length), dt[t] = {
                            x: e.pageX,
                            y: e.pageY,
                            id: e.pointerId
                        }
                    }
                    var n = Zt(e),
                        o = n.length;
                    Q = null, tt(), q && 1 !== o || (q = re = !0, i.bind(window, h, a), B = ue = le = Y = J = j = V = X = !1, ae = null, Se("firstTouchStart", n), Ze(me, fe), pe.x = pe.y = 0, Ze(ut, n[0]), Ze(ct, ut), pt.x = ye.x * ve, mt = [{
                        x: ut.x,
                        y: ut.y
                    }], H = K = Me(), We(y, !0), Tt(), Et()), !ee && o > 1 && !ie && !J && (x = y, X = !1, ee = V = !0, pe.y = pe.x = 0, Ze(me, fe), Ze(rt, n[0]), Ze(lt, n[1]), Ft(rt, lt, wt), xt.x = Math.abs(wt.x) - fe.x, xt.y = Math.abs(wt.y) - fe.y, te = It(rt, lt))
                }
            },
            Ut = function(e) {
                if (e.preventDefault(), F) {
                    var t = i.arraySearch(dt, e.pointerId, "id");
                    if (t > -1) {
                        var n = dt[t];
                        n.x = e.pageX, n.y = e.pageY
                    }
                }
                if (q) {
                    var o = Zt(e);
                    if (ae || j || ee) Q = o;
                    else if (yt.x !== ye.x * ve) ae = "h";
                    else {
                        var a = Math.abs(o[0].x - ut.x) - Math.abs(o[0].y - ut.y);
                        Math.abs(a) >= at && (ae = a > 0 ? "h" : "v", Q = o)
                    }
                }
            },
            Kt = function() {
                if (Q) {
                    var e = Q.length;
                    if (0 !== e)
                        if (Ze(rt, Q[0]), st.x = rt.x - ut.x, st.y = rt.y - ut.y, ee && e > 1) {
                            if (ut.x = rt.x, ut.y = rt.y, !st.x && !st.y && bt(Q[1], lt)) return;
                            Ze(lt, Q[1]), X || (X = !0, Se("zoomGestureStarted"));
                            var t = It(rt, lt),
                                n = Gt(t);
                            n > a.currItem.initialZoomLevel + a.currItem.initialZoomLevel / 15 && (ue = !0);
                            var o = 1,
                                i = Be(),
                                r = Ye();
                            if (n < i)
                                if (s.pinchToClose && !ue && x <= a.currItem.initialZoomLevel) {
                                    var l = 1 - (i - n) / (i / 1.2);
                                    Oe(l), Se("onPinchClose", l), le = !0
                                } else(o = (i - n) / i) > 1 && (o = 1), n = i - o * (i / 3);
                            else n > r && ((o = (n - r) / (6 * i)) > 1 && (o = 1), n = r + o * i);
                            o < 0 && (o = 0), Ft(rt, lt, vt), pe.x += vt.x - wt.x, pe.y += vt.y - wt.y, Ze(wt, vt), fe.x = Pe("x", n), fe.y = Pe("y", n), B = n > y, y = n, ke()
                        } else {
                            if (!ae) return;
                            if (re && (re = !1, Math.abs(st.x) >= at && (st.x -= Q[0].x - ct.x), Math.abs(st.y) >= at && (st.y -= Q[0].y - ct.y)), ut.x = rt.x, ut.y = rt.y, 0 === st.x && 0 === st.y) return;
                            if ("v" === ae && s.closeOnVerticalDrag && !_t()) {
                                pe.y += st.y, fe.y += st.y;
                                var u = At();
                                return Y = !0, Se("onVerticalDrag", u), Oe(u), void ke()
                            }
                            kt(Me(), rt.x, rt.y), j = !0, ne = a.currItem.bounds, zt("x", st) || (zt("y", st), ze(fe), ke())
                        }
                }
            },
            Ht = function(e) {
                if (N.isOldAndroid) {
                    if (G && "mouseup" === e.type) return;
                    e.type.indexOf("touch") > -1 && (clearTimeout(G), G = setTimeout((function() {
                        G = 0
                    }), 600))
                }
                var t;
                if (Se("pointerUp"), Mt(e, !1) && e.preventDefault(), F) {
                    var n = i.arraySearch(dt, e.pointerId, "id");
                    if (n > -1)
                        if (t = dt.splice(n, 1)[0], navigator.msPointerEnabled) {
                            var o = {
                                4: "mouse",
                                2: "touch",
                                3: "pen"
                            };
                            t.type = o[e.pointerType], t.type || (t.type = e.pointerType || "mouse")
                        } else t.type = e.pointerType || "mouse"
                }
                var r, l = Zt(e),
                    u = l.length;
                if ("mouseup" === e.type && (u = 0), 2 === u) return Q = null, !0;
                1 === u && Ze(ct, l[0]), 0 !== u || ae || ie || (t || ("mouseup" === e.type ? t = {
                    x: e.pageX,
                    y: e.pageY,
                    type: "mouse"
                } : e.changedTouches && e.changedTouches[0] && (t = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY,
                    type: "touch"
                })), Se("touchRelease", e, t));
                var c = -1;
                if (0 === u && (q = !1, i.unbind(window, h, a), Tt(), ee ? c = 0 : -1 !== gt && (c = Me() - gt)), gt = 1 === u ? Me() : -1, r = -1 !== c && c < 150 ? "zoom" : "swipe", ee && u < 2 && (ee = !1, 1 === u && (r = "zoomPointerUp"), Se("zoomGestureEnded")), Q = null, j || X || ie || Y)
                    if (tt(), W || (W = Wt()), W.calculateSwipeSpeed("x"), Y)
                        if (At() < s.verticalDragRange) a.close();
                        else {
                            var d = fe.y,
                                p = se;
                            nt("verticalDrag", 0, 1, 300, i.easing.cubic.out, (function(e) {
                                fe.y = (a.currItem.initialPosition.y - d) * e + d, Oe((1 - p) * e + p), ke()
                            })), Se("onVerticalDrag", 1)
                        }
                else {
                    if ((J || ie) && 0 === u) {
                        if (Yt(r, W)) return;
                        r = "zoomPointerUp"
                    }
                    ie || ("swipe" === r ? !J && y > a.currItem.fitRatio && Bt(W) : qt())
                }
            },
            Wt = function() {
                var e, t, n = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function(o) {
                        mt.length > 1 ? (e = Me() - H + 50, t = mt[mt.length - 2][o]) : (e = Me() - K, t = ct[o]), n.lastFlickOffset[o] = ut[o] - t, n.lastFlickDist[o] = Math.abs(n.lastFlickOffset[o]), n.lastFlickDist[o] > 20 ? n.lastFlickSpeed[o] = n.lastFlickOffset[o] / e : n.lastFlickSpeed[o] = 0, Math.abs(n.lastFlickSpeed[o]) < .1 && (n.lastFlickSpeed[o] = 0), n.slowDownRatio[o] = .95, n.slowDownRatioReverse[o] = 1 - n.slowDownRatio[o], n.speedDecelerationRatio[o] = 1
                    },
                    calculateOverBoundsAnimOffset: function(e, t) {
                        n.backAnimStarted[e] || (fe[e] > ne.min[e] ? n.backAnimDestination[e] = ne.min[e] : fe[e] < ne.max[e] && (n.backAnimDestination[e] = ne.max[e]), void 0 !== n.backAnimDestination[e] && (n.slowDownRatio[e] = .7, n.slowDownRatioReverse[e] = 1 - n.slowDownRatio[e], n.speedDecelerationRatioAbs[e] < .05 && (n.lastFlickSpeed[e] = 0, n.backAnimStarted[e] = !0, nt("bounceZoomPan" + e, fe[e], n.backAnimDestination[e], t || 300, i.easing.sine.out, (function(t) {
                            fe[e] = t, ke()
                        })))))
                    },
                    calculateAnimOffset: function(e) {
                        n.backAnimStarted[e] || (n.speedDecelerationRatio[e] = n.speedDecelerationRatio[e] * (n.slowDownRatio[e] + n.slowDownRatioReverse[e] - n.slowDownRatioReverse[e] * n.timeDiff / 10), n.speedDecelerationRatioAbs[e] = Math.abs(n.lastFlickSpeed[e] * n.speedDecelerationRatio[e]), n.distanceOffset[e] = n.lastFlickSpeed[e] * n.speedDecelerationRatio[e] * n.timeDiff, fe[e] += n.distanceOffset[e])
                    },
                    panAnimLoop: function() {
                        if ($e.zoomPan && ($e.zoomPan.raf = A(n.panAnimLoop), n.now = Me(), n.timeDiff = n.now - n.lastNow, n.lastNow = n.now, n.calculateAnimOffset("x"), n.calculateAnimOffset("y"), ke(), n.calculateOverBoundsAnimOffset("x"), n.calculateOverBoundsAnimOffset("y"), n.speedDecelerationRatioAbs.x < .05 && n.speedDecelerationRatioAbs.y < .05)) return fe.x = Math.round(fe.x), fe.y = Math.round(fe.y), ke(), void Qe("zoomPan")
                    }
                };
                return n
            },
            Bt = function(e) {
                if (e.calculateSwipeSpeed("y"), ne = a.currItem.bounds, e.backAnimDestination = {}, e.backAnimStarted = {}, Math.abs(e.lastFlickSpeed.x) <= .05 && Math.abs(e.lastFlickSpeed.y) <= .05) return e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y = 0, e.calculateOverBoundsAnimOffset("x"), e.calculateOverBoundsAnimOffset("y"), !0;
                et("zoomPan"), e.lastNow = Me(), e.panAnimLoop()
            },
            Yt = function(e, t) {
                var n, o, r;
                if (ie || (ht = p), "swipe" === e) {
                    var l = ut.x - ct.x,
                        u = t.lastFlickDist.x < 10;
                    l > it && (u || t.lastFlickOffset.x > 20) ? o = -1 : l < -it && (u || t.lastFlickOffset.x < -20) && (o = 1)
                }
                o && ((p += o) < 0 ? (p = s.loop ? Qt() - 1 : 0, r = !0) : p >= Qt() && (p = s.loop ? 0 : Qt() - 1, r = !0), r && !s.loop || (xe += o, ve -= o, n = !0));
                var c, d = ye.x * ve,
                    m = Math.abs(d - yt.x);
                return n || d > yt.x == t.lastFlickSpeed.x > 0 ? (c = Math.abs(t.lastFlickSpeed.x) > 0 ? m / Math.abs(t.lastFlickSpeed.x) : 333, c = Math.min(c, 400), c = Math.max(c, 250)) : c = 333, ht === p && (n = !1), ie = !0, Se("mainScrollAnimStart"), nt("mainScroll", yt.x, d, c, i.easing.cubic.out, Le, (function() {
                    tt(), ie = !1, ht = -1, (n || ht !== p) && a.updateCurrItem(), Se("mainScrollAnimComplete")
                })), n && a.updateCurrItem(!0), n
            },
            Gt = function(e) {
                return 1 / te * e * x
            },
            qt = function() {
                var e = y,
                    t = Be(),
                    n = Ye();
                y < t ? e = t : y > n && (e = n);
                var o, r = 1,
                    l = se;
                return le && !B && !ue && y < t ? (a.close(), !0) : (le && (o = function(e) {
                    Oe((r - l) * e + l)
                }), a.zoomTo(e, 0, 200, i.easing.cubic.out, o), !0)
            };
        Te("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var e = function(e, t, n, o, i) {
                        _ = e + t, D = e + n, S = e + o, M = i ? e + i : ""
                    };
                    (F = N.pointerEvent) && N.touch && (N.touch = !1), F ? navigator.msPointerEnabled ? e("MSPointer", "Down", "Move", "Up", "Cancel") : e("pointer", "down", "move", "up", "cancel") : N.touch ? (e("touch", "start", "move", "end", "cancel"), k = !0) : e("mouse", "down", "move", "up"), h = D + " " + S + " " + M, v = _, F && !k && (k = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), a.likelyTouchDevice = k, g[_] = Nt, g[D] = Ut, g[S] = Ht, M && (g[M] = g[S]), N.touch && (v += " mousedown", h += " mousemove mouseup", g.mousedown = g[_], g.mousemove = g[D], g.mouseup = g[S]), k || (s.allowPanToNext = !1)
                }
            }
        });
        var Vt, Xt, jt, $t, Jt, Qt, en = function(t, n, o, r) {
                var l;
                Vt && clearTimeout(Vt), $t = !0, jt = !0, t.initialLayout ? (l = t.initialLayout, t.initialLayout = null) : l = s.getThumbBoundsFn && s.getThumbBoundsFn(p);
                var u, c, m = o ? s.hideAnimationDuration : s.showAnimationDuration,
                    f = function() {
                        Qe("initialZoom"), o ? (a.template.removeAttribute("style"), a.bg.removeAttribute("style")) : (Oe(1), n && (n.style.display = "block"), i.addClass(e, "pswp--animated-in"), Se("initialZoom" + (o ? "OutEnd" : "InEnd"))), r && r(), $t = !1
                    };
                if (!m || !l || void 0 === l.x) return Se("initialZoom" + (o ? "Out" : "In")), y = t.initialZoomLevel, Ze(fe, t.initialPosition), ke(), e.style.opacity = o ? 0 : 1, Oe(1), void(m ? setTimeout((function() {
                    f()
                }), m) : f());
                u = d, c = !a.currItem.src || a.currItem.loadError || s.showHideOpacity, t.miniImg && (t.miniImg.style.webkitBackfaceVisibility = "hidden"), o || (y = l.w / t.w, fe.x = l.x, fe.y = l.y - P, a[c ? "template" : "bg"].style.opacity = .001, ke()), et("initialZoom"), o && !u && i.removeClass(e, "pswp--animated-in"), c && (o ? i[(u ? "remove" : "add") + "Class"](e, "pswp--animate_opacity") : setTimeout((function() {
                    i.addClass(e, "pswp--animate_opacity")
                }), 30)), Vt = setTimeout((function() {
                    if (Se("initialZoom" + (o ? "Out" : "In")), o) {
                        var n = l.w / t.w,
                            a = {
                                x: fe.x,
                                y: fe.y
                            },
                            r = y,
                            s = se,
                            d = function(t) {
                                1 === t ? (y = n, fe.x = l.x, fe.y = l.y - z) : (y = (n - r) * t + r, fe.x = (l.x - a.x) * t + a.x, fe.y = (l.y - z - a.y) * t + a.y), ke(), c ? e.style.opacity = 1 - t : Oe(s - t * s)
                            };
                        u ? nt("initialZoom", 0, 1, m, i.easing.cubic.out, d, f) : (d(1), Vt = setTimeout(f, m + 20))
                    } else y = t.initialZoomLevel, Ze(fe, t.initialPosition), ke(), Oe(1), c ? e.style.opacity = 1 : Oe(1), Vt = setTimeout(f, m + 20)
                }), o ? 25 : 90)
            },
            tn = {},
            nn = [],
            on = {
                index: 0,
                errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                forceProgressiveLoading: !1,
                preload: [1, 1],
                getNumItemsFn: function() {
                    return Xt.length
                }
            },
            an = function() {
                return {
                    center: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    },
                    min: {
                        x: 0,
                        y: 0
                    }
                }
            },
            rn = function(e, t, n) {
                var o = e.bounds;
                o.center.x = Math.round((tn.x - t) / 2), o.center.y = Math.round((tn.y - n) / 2) + e.vGap.top, o.max.x = t > tn.x ? Math.round(tn.x - t) : o.center.x, o.max.y = n > tn.y ? Math.round(tn.y - n) + e.vGap.top : o.center.y, o.min.x = t > tn.x ? 0 : o.center.x, o.min.y = n > tn.y ? e.vGap.top : o.center.y
            },
            ln = function(e, t, n) {
                if (e.src && !e.loadError) {
                    var o = !n;
                    if (o && (e.vGap || (e.vGap = {
                            top: 0,
                            bottom: 0
                        }), Se("parseVerticalMargin", e)), tn.x = t.x, tn.y = t.y - e.vGap.top - e.vGap.bottom, o) {
                        var i = tn.x / e.w,
                            a = tn.y / e.h;
                        e.fitRatio = i < a ? i : a;
                        var r = s.scaleMode;
                        "orig" === r ? n = 1 : "fit" === r && (n = e.fitRatio), n > 1 && (n = 1), e.initialZoomLevel = n, e.bounds || (e.bounds = an())
                    }
                    if (!n) return;
                    return rn(e, e.w * n, e.h * n), o && n === e.initialZoomLevel && (e.initialPosition = e.bounds.center), e.bounds
                }
                return e.w = e.h = 0, e.initialZoomLevel = e.fitRatio = 1, e.bounds = an(), e.initialPosition = e.bounds.center, e.bounds
            },
            sn = function(e, t, n, o, i, r) {
                t.loadError || o && (t.imageAppended = !0, dn(t, o, t === a.currItem && Ie), n.appendChild(o), r && setTimeout((function() {
                    t && t.loaded && t.placeholder && (t.placeholder.style.display = "none", t.placeholder = null)
                }), 500))
            },
            un = function(e) {
                e.loading = !0, e.loaded = !1;
                var t = e.img = i.createEl("pswp__img", "img"),
                    n = function() {
                        e.loading = !1, e.loaded = !0, e.loadComplete ? e.loadComplete(e) : e.img = null, t.onload = t.onerror = null, t = null
                    };
                return t.onload = n, t.onerror = function() {
                    e.loadError = !0, n()
                }, t.src = e.src, t
            },
            cn = function(e, t) {
                if (e.src && e.loadError && e.container) return t && (e.container.innerHTML = ""), e.container.innerHTML = s.errorMsg.replace("%url%", e.src), !0
            },
            dn = function(e, t, n) {
                if (e.src) {
                    t || (t = e.container.lastChild);
                    var o = n ? e.w : Math.round(e.w * e.fitRatio),
                        i = n ? e.h : Math.round(e.h * e.fitRatio);
                    e.placeholder && !e.loaded && (e.placeholder.style.width = o + "px", e.placeholder.style.height = i + "px"), t.style.width = o + "px", t.style.height = i + "px"
                }
            },
            pn = function() {
                if (nn.length) {
                    for (var e, t = 0; t < nn.length; t++)(e = nn[t]).holder.index === e.index && sn(e.index, e.item, e.baseDiv, e.img, !1, e.clearPlaceholder);
                    nn = []
                }
            };
        Te("Controller", {
            publicMethods: {
                lazyLoadItem: function(e) {
                    e = Ee(e);
                    var t = Jt(e);
                    t && (!t.loaded && !t.loading || I) && (Se("gettingData", e, t), t.src && un(t))
                },
                initController: function() {
                    i.extend(s, on, !0), a.items = Xt = n, Jt = a.getItemAt, Qt = s.getNumItemsFn, s.loop, Qt() < 3 && (s.loop = !1), De("beforeChange", (function(e) {
                        var t, n = s.preload,
                            o = null === e || e >= 0,
                            i = Math.min(n[0], Qt()),
                            r = Math.min(n[1], Qt());
                        for (t = 1; t <= (o ? r : i); t++) a.lazyLoadItem(p + t);
                        for (t = 1; t <= (o ? i : r); t++) a.lazyLoadItem(p - t)
                    })), De("initialLayout", (function() {
                        a.currItem.initialLayout = s.getThumbBoundsFn && s.getThumbBoundsFn(p)
                    })), De("mainScrollAnimComplete", pn), De("initialZoomInEnd", pn), De("destroy", (function() {
                        for (var e, t = 0; t < Xt.length; t++)(e = Xt[t]).container && (e.container = null), e.placeholder && (e.placeholder = null), e.img && (e.img = null), e.preloader && (e.preloader = null), e.loadError && (e.loaded = e.loadError = !1);
                        nn = null
                    }))
                },
                getItemAt: function(e) {
                    return e >= 0 && void 0 !== Xt[e] && Xt[e]
                },
                allowProgressiveImg: function() {
                    return s.forceProgressiveLoading || !k || s.mouseUsed || screen.width > 1200
                },
                setContent: function(e, t) {
                    s.loop && (t = Ee(t));
                    var n = a.getItemAt(e.index);
                    n && (n.container = null);
                    var o, r = a.getItemAt(t);
                    if (r) {
                        Se("gettingData", t, r), e.index = t, e.item = r;
                        var l = r.container = i.createEl("pswp__zoom-wrap");
                        if (!r.src && r.html && (r.html.tagName ? l.appendChild(r.html) : l.innerHTML = r.html), cn(r), ln(r, he), !r.src || r.loadError || r.loaded) r.src && !r.loadError && ((o = i.createEl("pswp__img", "img")).style.opacity = 1, o.src = r.src, dn(r, o), sn(t, r, l, o));
                        else {
                            if (r.loadComplete = function(n) {
                                    if (u) {
                                        if (e && e.index === t) {
                                            if (cn(n, !0)) return n.loadComplete = n.img = null, ln(n, he), Ae(n), void(e.index === p && a.updateCurrZoomItem());
                                            n.imageAppended ? !$t && n.placeholder && (n.placeholder.style.display = "none", n.placeholder = null) : N.transform && (ie || $t) ? nn.push({
                                                item: n,
                                                baseDiv: l,
                                                img: n.img,
                                                index: t,
                                                holder: e,
                                                clearPlaceholder: !0
                                            }) : sn(t, n, l, n.img, ie || $t, !0)
                                        }
                                        n.loadComplete = null, n.img = null, Se("imageLoadComplete", t, n)
                                    }
                                }, i.features.transform) {
                                var c = "pswp__img pswp__img--placeholder";
                                c += r.msrc ? "" : " pswp__img--placeholder--blank";
                                var d = i.createEl(c, r.msrc ? "img" : "");
                                r.msrc && (d.src = r.msrc), dn(r, d), l.appendChild(d), r.placeholder = d
                            }
                            r.loading || un(r), a.allowProgressiveImg() && (!jt && N.transform ? nn.push({
                                item: r,
                                baseDiv: l,
                                img: r.img,
                                index: t,
                                holder: e
                            }) : sn(t, r, l, r.img, !0, !0))
                        }
                        jt || t !== p ? Ae(r) : (oe = l.style, en(r, o || r.img)), e.el.innerHTML = "", e.el.appendChild(l)
                    } else e.el.innerHTML = ""
                },
                cleanSlide: function(e) {
                    e.img && (e.img.onload = e.img.onerror = null), e.loaded = e.loading = e.img = e.imageAppended = !1
                }
            }
        });
        var mn, fn, hn = {},
            vn = function(e, t, n) {
                var o = document.createEvent("CustomEvent"),
                    i = {
                        origEvent: e,
                        target: e.target,
                        releasePoint: t,
                        pointerType: n || "touch"
                    };
                o.initCustomEvent("pswpTap", !0, !0, i), e.target.dispatchEvent(o)
            };
        Te("Tap", {
            publicMethods: {
                initTap: function() {
                    De("firstTouchStart", a.onTapStart), De("touchRelease", a.onTapRelease), De("destroy", (function() {
                        hn = {}, mn = null
                    }))
                },
                onTapStart: function(e) {
                    e.length > 1 && (clearTimeout(mn), mn = null)
                },
                onTapRelease: function(e, t) {
                    if (t && !j && !V && !Je) {
                        var n = t;
                        if (mn && (clearTimeout(mn), mn = null, Ct(n, hn))) return void Se("doubleTap", n);
                        if ("mouse" === t.type) return void vn(e, t, "mouse");
                        if ("BUTTON" === e.target.tagName.toUpperCase() || i.hasClass(e.target, "pswp__single-tap")) return void vn(e, t);
                        Ze(hn, n), mn = setTimeout((function() {
                            vn(e, t), mn = null
                        }), 300)
                    }
                }
            }
        }), Te("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    Z || (k ? De("mouseUsed", (function() {
                        a.setupDesktopZoom()
                    })) : a.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(t) {
                    fn = {};
                    var n = "wheel mousewheel DOMMouseScroll";
                    De("bindEvents", (function() {
                        i.bind(e, n, a.handleMouseWheel)
                    })), De("unbindEvents", (function() {
                        fn && i.unbind(e, n, a.handleMouseWheel)
                    })), a.mouseZoomedIn = !1;
                    var o, r = function() {
                            a.mouseZoomedIn && (i.removeClass(e, "pswp--zoomed-in"), a.mouseZoomedIn = !1), y < 1 ? i.addClass(e, "pswp--zoom-allowed") : i.removeClass(e, "pswp--zoom-allowed"), l()
                        },
                        l = function() {
                            o && (i.removeClass(e, "pswp--dragging"), o = !1)
                        };
                    De("resize", r), De("afterChange", r), De("pointerDown", (function() {
                        a.mouseZoomedIn && (o = !0, i.addClass(e, "pswp--dragging"))
                    })), De("pointerUp", l), t || r()
                },
                handleMouseWheel: function(e) {
                    if (y <= a.currItem.fitRatio) return s.modal && (!s.closeOnScroll || Je || q ? e.preventDefault() : O && Math.abs(e.deltaY) > 2 && (d = !0, a.close())), !0;
                    if (e.stopPropagation(), fn.x = 0, "deltaX" in e) 1 === e.deltaMode ? (fn.x = 18 * e.deltaX, fn.y = 18 * e.deltaY) : (fn.x = e.deltaX, fn.y = e.deltaY);
                    else if ("wheelDelta" in e) e.wheelDeltaX && (fn.x = -.16 * e.wheelDeltaX), e.wheelDeltaY ? fn.y = -.16 * e.wheelDeltaY : fn.y = -.16 * e.wheelDelta;
                    else {
                        if (!("detail" in e)) return;
                        fn.y = e.detail
                    }
                    We(y, !0);
                    var t = fe.x - fn.x,
                        n = fe.y - fn.y;
                    (s.modal || t <= ne.min.x && t >= ne.max.x && n <= ne.min.y && n >= ne.max.y) && e.preventDefault(), a.panTo(t, n)
                },
                toggleDesktopZoom: function(t) {
                    t = t || {
                        x: he.x / 2 + ge.x,
                        y: he.y / 2 + ge.y
                    };
                    var n = s.getDoubleTapZoom(!0, a.currItem),
                        o = y === n;
                    a.mouseZoomedIn = !o, a.zoomTo(o ? a.currItem.initialZoomLevel : n, t, 333), i[(o ? "remove" : "add") + "Class"](e, "pswp--zoomed-in")
                }
            }
        });
        var gn, yn, xn, wn, bn, Cn, In, Tn, En, _n, Dn, Sn, Mn = {
                history: !0,
                galleryUID: 1
            },
            On = function() {
                return Dn.hash.substring(1)
            },
            Fn = function() {
                gn && clearTimeout(gn), xn && clearTimeout(xn)
            },
            kn = function() {
                var e = On(),
                    t = {};
                if (e.length < 5) return t;
                var n, o = e.split("&");
                for (n = 0; n < o.length; n++)
                    if (o[n]) {
                        var i = o[n].split("=");
                        i.length < 2 || (t[i[0]] = i[1])
                    } if (s.galleryPIDs) {
                    var a = t.pid;
                    for (t.pid = 0, n = 0; n < Xt.length; n++)
                        if (Xt[n].pid === a) {
                            t.pid = n;
                            break
                        }
                } else t.pid = parseInt(t.pid, 10) - 1;
                return t.pid < 0 && (t.pid = 0), t
            },
            An = function() {
                if (xn && clearTimeout(xn), Je || q) xn = setTimeout(An, 500);
                else {
                    wn ? clearTimeout(yn) : wn = !0;
                    var e = p + 1,
                        t = Jt(p);
                    t.hasOwnProperty("pid") && (e = t.pid);
                    var n = In + "&gid=" + s.galleryUID + "&pid=" + e;
                    Tn || -1 === Dn.hash.indexOf(n) && (_n = !0);
                    var o = Dn.href.split("#")[0] + "#" + n;
                    Sn ? "#" + n !== window.location.hash && history[Tn ? "replaceState" : "pushState"]("", document.title, o) : Tn ? Dn.replace(o) : Dn.hash = n, Tn = !0, yn = setTimeout((function() {
                        wn = !1
                    }), 60)
                }
            };
        Te("History", {
            publicMethods: {
                initHistory: function() {
                    if (i.extend(s, Mn, !0), s.history) {
                        Dn = window.location, _n = !1, En = !1, Tn = !1, In = On(), Sn = "pushState" in history, In.indexOf("gid=") > -1 && (In = (In = In.split("&gid=")[0]).split("?gid=")[0]), De("afterChange", a.updateURL), De("unbindEvents", (function() {
                            i.unbind(window, "hashchange", a.onHashChange)
                        }));
                        var e = function() {
                            Cn = !0, En || (_n ? history.back() : In ? Dn.hash = In : Sn ? history.pushState("", document.title, Dn.pathname + Dn.search) : Dn.hash = ""), Fn()
                        };
                        De("unbindEvents", (function() {
                            d && e()
                        })), De("destroy", (function() {
                            Cn || e()
                        })), De("firstUpdate", (function() {
                            p = kn().pid
                        }));
                        var t = In.indexOf("pid=");
                        t > -1 && "&" === (In = In.substring(0, t)).slice(-1) && (In = In.slice(0, -1)), setTimeout((function() {
                            u && i.bind(window, "hashchange", a.onHashChange)
                        }), 40)
                    }
                },
                onHashChange: function() {
                    if (On() === In) return En = !0, void a.close();
                    wn || (bn = !0, a.goTo(kn().pid), bn = !1)
                },
                updateURL: function() {
                    Fn(), bn || (Tn ? gn = setTimeout(An, 800) : An())
                }
            }
        }), i.extend(a, ot)
    }, n);
    var i = t({
            __proto__: null,
            default: o.exports
        }, [o.exports]),
        a = {
            exports: {}
        };
    /*! PhotoSwipe Default UI - 4.1.3 - 2019-01-08
     * http://photoswipe.com
     * Copyright (c) 2019 Dmitry Semenov; */
    ! function(e, t) {
        e.exports = function(e, t) {
            var n, o, i, a, r, l, s, u, c, d, p, m, f, h, v, g, y, x, w = this,
                b = !1,
                C = !0,
                I = !0,
                T = {
                    barsSize: {
                        top: 44,
                        bottom: "auto"
                    },
                    closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                    timeToIdle: 4e3,
                    timeToIdleOutside: 1e3,
                    loadingIndicatorDelay: 1e3,
                    addCaptionHTMLFn: function(e, t) {
                        return e.title ? (t.children[0].innerHTML = e.title, !0) : (t.children[0].innerHTML = "", !1)
                    },
                    closeEl: !0,
                    captionEl: !0,
                    fullscreenEl: !0,
                    zoomEl: !0,
                    shareEl: !0,
                    counterEl: !0,
                    arrowEl: !0,
                    preloaderEl: !0,
                    tapToClose: !1,
                    tapToToggleControls: !0,
                    clickToCloseNonZoomable: !0,
                    shareButtons: [{
                        id: "facebook",
                        label: "Share on Facebook",
                        url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                    }, {
                        id: "twitter",
                        label: "Tweet",
                        url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                    }, {
                        id: "pinterest",
                        label: "Pin it",
                        url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                    }, {
                        id: "download",
                        label: "Download image",
                        url: "{{raw_image_url}}",
                        download: !0
                    }],
                    getImageURLForShare: function() {
                        return e.currItem.src || ""
                    },
                    getPageURLForShare: function() {
                        return window.location.href
                    },
                    getTextForShare: function() {
                        return e.currItem.title || ""
                    },
                    indexIndicatorSep: " / ",
                    fitControlsWidth: 1200
                },
                E = function(e) {
                    if (g) return !0;
                    e = e || window.event, v.timeToIdle && v.mouseUsed && !c && L();
                    for (var n, o, i = (e.target || e.srcElement).getAttribute("class") || "", a = 0; a < W.length; a++)(n = W[a]).onTap && i.indexOf("pswp__" + n.name) > -1 && (n.onTap(), o = !0);
                    if (o) {
                        e.stopPropagation && e.stopPropagation(), g = !0;
                        var r = t.features.isOldAndroid ? 600 : 30;
                        setTimeout((function() {
                            g = !1
                        }), r)
                    }
                },
                _ = function() {
                    return !e.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth
                },
                D = function(e, n, o) {
                    t[(o ? "add" : "remove") + "Class"](e, "pswp__" + n)
                },
                S = function() {
                    var e = 1 === v.getNumItemsFn();
                    e !== h && (D(o, "ui--one-slide", e), h = e)
                },
                M = function() {
                    D(s, "share-modal--hidden", I)
                },
                O = function() {
                    return (I = !I) ? (t.removeClass(s, "pswp__share-modal--fade-in"), setTimeout((function() {
                        I && M()
                    }), 300)) : (M(), setTimeout((function() {
                        I || t.addClass(s, "pswp__share-modal--fade-in")
                    }), 30)), I || k(), !1
                },
                F = function(t) {
                    var n = (t = t || window.event).target || t.srcElement;
                    return e.shout("shareLinkClick", t, n), !(!n.href || !n.hasAttribute("download") && (window.open(n.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), I || O(), 1))
                },
                k = function() {
                    for (var e, t, n, o, i = "", a = 0; a < v.shareButtons.length; a++) e = v.shareButtons[a], t = v.getImageURLForShare(e), n = v.getPageURLForShare(e), o = v.getTextForShare(e), i += '<a href="' + e.url.replace("{{url}}", encodeURIComponent(n)).replace("{{image_url}}", encodeURIComponent(t)).replace("{{raw_image_url}}", t).replace("{{text}}", encodeURIComponent(o)) + '" target="_blank" class="pswp__share--' + e.id + '"' + (e.download ? "download" : "") + ">" + e.label + "</a>", v.parseShareButtonOut && (i = v.parseShareButtonOut(e, i));
                    s.children[0].innerHTML = i, s.children[0].onclick = F
                },
                A = function(e) {
                    for (var n = 0; n < v.closeElClasses.length; n++)
                        if (t.hasClass(e, "pswp__" + v.closeElClasses[n])) return !0
                },
                R = 0,
                L = function() {
                    clearTimeout(x), R = 0, c && w.setIdle(!1)
                },
                P = function(e) {
                    var t = (e = e || window.event).relatedTarget || e.toElement;
                    t && "HTML" !== t.nodeName || (clearTimeout(x), x = setTimeout((function() {
                        w.setIdle(!0)
                    }), v.timeToIdleOutside))
                },
                Z = function() {
                    v.fullscreenEl && !t.features.isOldAndroid && (n || (n = w.getFullscreenAPI()), n ? (t.bind(document, n.eventK, w.updateFullscreen), w.updateFullscreen(), t.addClass(e.template, "pswp--supports-fs")) : t.removeClass(e.template, "pswp--supports-fs"))
                },
                z = function() {
                    v.preloaderEl && (N(!0), d("beforeChange", (function() {
                        clearTimeout(f), f = setTimeout((function() {
                            e.currItem && e.currItem.loading ? (!e.allowProgressiveImg() || e.currItem.img && !e.currItem.img.naturalWidth) && N(!1) : N(!0)
                        }), v.loadingIndicatorDelay)
                    })), d("imageLoadComplete", (function(t, n) {
                        e.currItem === n && N(!0)
                    })))
                },
                N = function(e) {
                    m !== e && (D(p, "preloader--active", !e), m = e)
                },
                U = function(e) {
                    var n = e.vGap;
                    if (_()) {
                        var r = v.barsSize;
                        if (v.captionEl && "auto" === r.bottom)
                            if (a || ((a = t.createEl("pswp__caption pswp__caption--fake")).appendChild(t.createEl("pswp__caption__center")), o.insertBefore(a, i), t.addClass(o, "pswp__ui--fit")), v.addCaptionHTMLFn(e, a, !0)) {
                                var l = a.clientHeight;
                                n.bottom = parseInt(l, 10) || 44
                            } else n.bottom = r.top;
                        else n.bottom = "auto" === r.bottom ? 0 : r.bottom;
                        n.top = r.top
                    } else n.top = n.bottom = 0
                },
                K = function() {
                    v.timeToIdle && d("mouseUsed", (function() {
                        t.bind(document, "mousemove", L), t.bind(document, "mouseout", P), y = setInterval((function() {
                            2 == ++R && w.setIdle(!0)
                        }), v.timeToIdle / 2)
                    }))
                },
                H = function() {
                    var e;
                    d("onVerticalDrag", (function(e) {
                        C && e < .95 ? w.hideControls() : !C && e >= .95 && w.showControls()
                    })), d("onPinchClose", (function(t) {
                        C && t < .9 ? (w.hideControls(), e = !0) : e && !C && t > .9 && w.showControls()
                    })), d("zoomGestureEnded", (function() {
                        (e = !1) && !C && w.showControls()
                    }))
                },
                W = [{
                    name: "caption",
                    option: "captionEl",
                    onInit: function(e) {
                        i = e
                    }
                }, {
                    name: "share-modal",
                    option: "shareEl",
                    onInit: function(e) {
                        s = e
                    },
                    onTap: function() {
                        O()
                    }
                }, {
                    name: "button--share",
                    option: "shareEl",
                    onInit: function(e) {
                        l = e
                    },
                    onTap: function() {
                        O()
                    }
                }, {
                    name: "button--zoom",
                    option: "zoomEl",
                    onTap: e.toggleDesktopZoom
                }, {
                    name: "counter",
                    option: "counterEl",
                    onInit: function(e) {
                        r = e
                    }
                }, {
                    name: "button--close",
                    option: "closeEl",
                    onTap: e.close
                }, {
                    name: "button--arrow--left",
                    option: "arrowEl",
                    onTap: e.prev
                }, {
                    name: "button--arrow--right",
                    option: "arrowEl",
                    onTap: e.next
                }, {
                    name: "button--fs",
                    option: "fullscreenEl",
                    onTap: function() {
                        n.isFullscreen() ? n.exit() : n.enter()
                    }
                }, {
                    name: "preloader",
                    option: "preloaderEl",
                    onInit: function(e) {
                        p = e
                    }
                }],
                B = function() {
                    var e, n, i, a = function(o) {
                        if (o)
                            for (var a = o.length, r = 0; r < a; r++) {
                                e = o[r], n = e.className;
                                for (var l = 0; l < W.length; l++) i = W[l], n.indexOf("pswp__" + i.name) > -1 && (v[i.option] ? (t.removeClass(e, "pswp__element--disabled"), i.onInit && i.onInit(e)) : t.addClass(e, "pswp__element--disabled"))
                            }
                    };
                    a(o.children);
                    var r = t.getChildByClass(o, "pswp__top-bar");
                    r && a(r.children)
                };
            w.init = function() {
                t.extend(e.options, T, !0), v = e.options, o = t.getChildByClass(e.scrollWrap, "pswp__ui"), d = e.listen, H(), d("beforeChange", w.update), d("doubleTap", (function(t) {
                    var n = e.currItem.initialZoomLevel;
                    e.getZoomLevel() !== n ? e.zoomTo(n, t, 333) : e.zoomTo(v.getDoubleTapZoom(!1, e.currItem), t, 333)
                })), d("preventDragEvent", (function(e, t, n) {
                    var o = e.target || e.srcElement;
                    o && o.getAttribute("class") && e.type.indexOf("mouse") > -1 && (o.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(o.tagName)) && (n.prevent = !1)
                })), d("bindEvents", (function() {
                    t.bind(o, "pswpTap click", E), t.bind(e.scrollWrap, "pswpTap", w.onGlobalTap), e.likelyTouchDevice || t.bind(e.scrollWrap, "mouseover", w.onMouseOver)
                })), d("unbindEvents", (function() {
                    I || O(), y && clearInterval(y), t.unbind(document, "mouseout", P), t.unbind(document, "mousemove", L), t.unbind(o, "pswpTap click", E), t.unbind(e.scrollWrap, "pswpTap", w.onGlobalTap), t.unbind(e.scrollWrap, "mouseover", w.onMouseOver), n && (t.unbind(document, n.eventK, w.updateFullscreen), n.isFullscreen() && (v.hideAnimationDuration = 0, n.exit()), n = null)
                })), d("destroy", (function() {
                    v.captionEl && (a && o.removeChild(a), t.removeClass(i, "pswp__caption--empty")), s && (s.children[0].onclick = null), t.removeClass(o, "pswp__ui--over-close"), t.addClass(o, "pswp__ui--hidden"), w.setIdle(!1)
                })), v.showAnimationDuration || t.removeClass(o, "pswp__ui--hidden"), d("initialZoomIn", (function() {
                    v.showAnimationDuration && t.removeClass(o, "pswp__ui--hidden")
                })), d("initialZoomOut", (function() {
                    t.addClass(o, "pswp__ui--hidden")
                })), d("parseVerticalMargin", U), B(), v.shareEl && l && s && (I = !0), S(), K(), Z(), z()
            }, w.setIdle = function(e) {
                c = e, D(o, "ui--idle", e)
            }, w.update = function() {
                C && e.currItem ? (w.updateIndexIndicator(), v.captionEl && (v.addCaptionHTMLFn(e.currItem, i), D(i, "caption--empty", !e.currItem.title)), b = !0) : b = !1, I || O(), S()
            }, w.updateFullscreen = function(o) {
                o && setTimeout((function() {
                    e.setScrollOffset(0, t.getScrollY())
                }), 50), t[(n.isFullscreen() ? "add" : "remove") + "Class"](e.template, "pswp--fs")
            }, w.updateIndexIndicator = function() {
                v.counterEl && (r.innerHTML = e.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn())
            }, w.onGlobalTap = function(n) {
                var o = (n = n || window.event).target || n.srcElement;
                if (!g)
                    if (n.detail && "mouse" === n.detail.pointerType) {
                        if (A(o)) return void e.close();
                        t.hasClass(o, "pswp__img") && (1 === e.getZoomLevel() && e.getZoomLevel() <= e.currItem.fitRatio ? v.clickToCloseNonZoomable && e.close() : e.toggleDesktopZoom(n.detail.releasePoint))
                    } else if (v.tapToToggleControls && (C ? w.hideControls() : w.showControls()), v.tapToClose && (t.hasClass(o, "pswp__img") || A(o))) return void e.close()
            }, w.onMouseOver = function(e) {
                var t = (e = e || window.event).target || e.srcElement;
                D(o, "ui--over-close", A(t))
            }, w.hideControls = function() {
                t.addClass(o, "pswp__ui--hidden"), C = !1
            }, w.showControls = function() {
                C = !0, b || w.update(), t.removeClass(o, "pswp__ui--hidden")
            }, w.supportsFullscreen = function() {
                var e = document;
                return !!(e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen)
            }, w.getFullscreenAPI = function() {
                var t, n = document.documentElement,
                    o = "fullscreenchange";
                return n.requestFullscreen ? t = {
                    enterK: "requestFullscreen",
                    exitK: "exitFullscreen",
                    elementK: "fullscreenElement",
                    eventK: o
                } : n.mozRequestFullScreen ? t = {
                    enterK: "mozRequestFullScreen",
                    exitK: "mozCancelFullScreen",
                    elementK: "mozFullScreenElement",
                    eventK: "moz" + o
                } : n.webkitRequestFullscreen ? t = {
                    enterK: "webkitRequestFullscreen",
                    exitK: "webkitExitFullscreen",
                    elementK: "webkitFullscreenElement",
                    eventK: "webkit" + o
                } : n.msRequestFullscreen && (t = {
                    enterK: "msRequestFullscreen",
                    exitK: "msExitFullscreen",
                    elementK: "msFullscreenElement",
                    eventK: "MSFullscreenChange"
                }), t && (t.enter = function() {
                    if (u = v.closeOnScroll, v.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK) return e.template[this.enterK]();
                    e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
                }, t.exit = function() {
                    return v.closeOnScroll = u, document[this.exitK]()
                }, t.isFullscreen = function() {
                    return document[this.elementK]
                }), t
            }
        }
    }(a);
    var r = t({
        __proto__: null,
        default: a.exports
    }, [a.exports]);
    return e.PhotoSwipe = i, e.PhotoSwipeUI = r, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
}({});
