import { ref as E, watch as Ze, openBlock as p, createElementBlock as k, createElementVNode as n, unref as j, normalizeClass as ne, createCommentVNode as q, createStaticVNode as Zt, reactive as fe, onMounted as Y, withDirectives as te, createVNode as ee, vShow as we, toDisplayString as T, withModifiers as he, Fragment as J, renderList as Z, createTextVNode as le, nextTick as Xe, vModelSelect as Xt, normalizeStyle as Gt, provide as We, createBlock as K, resolveDynamicComponent as Qt, withKeys as ce, renderSlot as Ye, withCtx as z, vModelText as ge } from "vue";
const Ge = (f, { method: m = "get", params: a = {}, json: g = !0 }) => {
  const c = { method: m };
  return m == "get" ? f += "?" + new URLSearchParams(a) : c.body = a, g ? fetch(f, c).then((s) => s.json()) : fetch(f, c);
};
function er(f) {
  return { all: f = f || /* @__PURE__ */ new Map(), on: function(m, a) {
    var g = f.get(m);
    g ? g.push(a) : f.set(m, [a]);
  }, off: function(m, a) {
    var g = f.get(m);
    g && (a ? g.splice(g.indexOf(a) >>> 0, 1) : f.set(m, []));
  }, emit: function(m, a) {
    var g = f.get(m);
    g && g.slice().map(function(c) {
      c(a);
    }), (g = f.get("*")) && g.slice().map(function(c) {
      c(m, a);
    });
  } };
}
function Je(f) {
  let m = localStorage.getItem(f + "_storage");
  const a = E(JSON.parse(m));
  Ze(a, g);
  function g() {
    a.value === null || a.value === "" ? localStorage.removeItem(f + "_storage") : localStorage.setItem(f + "_storage", JSON.stringify(a.value));
  }
  function c(b, w) {
    a.value = Object.assign({ ...a.value }, { [b]: w });
  }
  function s() {
    a.value = null;
  }
  return { getStore: (b, w = null) => a.value === null || a.value === "" ? w : a.value.hasOwnProperty(b) ? a.value[b] : w, setStore: c, clearStore: s };
}
const tr = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, rr = { class: "flex text-center" }, or = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
  })
], -1), sr = [
  or
], nr = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })
], -1), ir = [
  nr
], ar = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
}, null, -1), lr = [
  ar
], cr = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
}, null, -1), ur = [
  cr
], dr = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
  })
], -1), mr = [
  dr
], hr = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
}, null, -1), fr = [
  hr
], gr = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
}, null, -1), vr = [
  gr
], pr = { class: "flex text-center items-center justify-end" }, yr = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, br = /* @__PURE__ */ Zt('<g class="dark:opacity-0"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path><path d="M12 4v.01M17.66 6.345l-.007.007M20.005 12.005h-.01M17.66 17.665l-.007-.007M12 20.01V20M6.34 17.665l.007-.007M3.995 12.005h.01M6.34 6.344l.007.007" fill="none"></path></g><g class="opacity-0 dark:opacity-100"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M12 3v1M18.66 5.345l-.828.828M21.005 12.005h-1M18.66 18.665l-.828-.828M12 21.01V20M5.34 18.666l.835-.836M2.995 12.005h1.01M5.34 5.344l.835.836" fill="none"></path></g>', 2), _r = [
  br
], wr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Sr = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
}, null, -1), kr = [
  Sr
], xr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Dr = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6h16M4 10h16M4 14h16M4 18h16"
}, null, -1), $r = [
  Dr
], Cr = {
  name: "VFToolbar"
}, Pr = /* @__PURE__ */ Object.assign(Cr, {
  setup(f) {
    const m = inject("emitter"), { getStore: a, setStore: g } = inject("storage"), c = E(a("viewport", "grid")), s = E([]);
    return m.on("vf-nodes-selected", (y) => {
      s.value = y;
    }), m.on("vf-view-toggle", (y) => {
      g("viewport", y), c.value = y;
    }), (y, b) => (p(), k("div", tr, [
      n("div", rr, [
        n("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[0] || (b[0] = (w) => j(m).emit("vf-modal-show", { type: "new-folder", items: s.value }))
        }, sr),
        n("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[1] || (b[1] = (w) => j(m).emit("vf-modal-show", { type: "new-file", items: s.value }))
        }, ir),
        n("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[2] || (b[2] = (w) => s.value.length != 1 || j(m).emit("vf-modal-show", { type: "rename", items: s.value }))
        }, [
          (p(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([s.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, lr, 2))
        ]),
        n("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[3] || (b[3] = (w) => !s.value.length || j(m).emit("vf-modal-show", { type: "delete", items: s.value }))
        }, [
          (p(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([s.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ur, 2))
        ]),
        n("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[4] || (b[4] = (w) => j(m).emit("vf-modal-show", { type: "upload", items: s.value }))
        }, mr),
        s.value.length == 1 && s.value[0].mime_type == "application/zip" ? (p(), k("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[5] || (b[5] = (w) => !s.value.length || j(m).emit("vf-modal-show", { type: "unarchive", items: s.value }))
        }, [
          (p(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([s.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, fr, 2))
        ])) : (p(), k("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[6] || (b[6] = (w) => !s.value.length || j(m).emit("vf-modal-show", { type: "archive", items: s.value }))
        }, [
          (p(), k("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ne([s.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, vr, 2))
        ]))
      ]),
      n("div", pr, [
        n("div", yr, [
          (p(), k("svg", {
            onClick: b[7] || (b[7] = (w) => j(m).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, _r))
        ]),
        n("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: b[8] || (b[8] = (w) => j(m).emit("vf-view-toggle", c.value == "list" ? "grid" : "list"))
        }, [
          c.value == "grid" ? (p(), k("svg", wr, kr)) : q("", !0),
          c.value == "list" ? (p(), k("svg", xr, $r)) : q("", !0)
        ])
      ])
    ]));
  }
});
var Mr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Qe = { exports: {} };
(function(f, m) {
  (function(a, g) {
    f.exports = g();
  })(Mr, function() {
    function a(o, t) {
      if (!(o instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function g(o, t) {
      for (var e = 0; e < t.length; e++) {
        var i = t[e];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(o, i.key, i);
      }
    }
    function c(o, t, e) {
      return t && g(o.prototype, t), e && g(o, e), o;
    }
    function s(o, t, e) {
      return t in o ? Object.defineProperty(o, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : o[t] = e, o;
    }
    function y(o, t) {
      var e = Object.keys(o);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(o);
        t && (i = i.filter(function(r) {
          return Object.getOwnPropertyDescriptor(o, r).enumerable;
        })), e.push.apply(e, i);
      }
      return e;
    }
    function b(o) {
      for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2 ? y(Object(e), !0).forEach(function(i) {
          s(o, i, e[i]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : y(Object(e)).forEach(function(i) {
          Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(e, i));
        });
      }
      return o;
    }
    function w(o, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function");
      o.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: o,
          writable: !0,
          configurable: !0
        }
      }), t && C(o, t);
    }
    function _(o) {
      return _ = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, _(o);
    }
    function C(o, t) {
      return C = Object.setPrototypeOf || function(i, r) {
        return i.__proto__ = r, i;
      }, C(o, t);
    }
    function x() {
      if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
        return !1;
      if (typeof Proxy == "function")
        return !0;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        })), !0;
      } catch {
        return !1;
      }
    }
    function A(o, t, e) {
      return x() ? A = Reflect.construct : A = function(r, l, u) {
        var d = [null];
        d.push.apply(d, l);
        var h = Function.bind.apply(r, d), S = new h();
        return u && C(S, u.prototype), S;
      }, A.apply(null, arguments);
    }
    function F(o) {
      return Function.toString.call(o).indexOf("[native code]") !== -1;
    }
    function H(o) {
      var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return H = function(i) {
        if (i === null || !F(i))
          return i;
        if (typeof i != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof t < "u") {
          if (t.has(i))
            return t.get(i);
          t.set(i, r);
        }
        function r() {
          return A(i, arguments, _(this).constructor);
        }
        return r.prototype = Object.create(i.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), C(r, i);
      }, H(o);
    }
    function I(o) {
      if (o === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return o;
    }
    function ue(o, t) {
      return t && (typeof t == "object" || typeof t == "function") ? t : I(o);
    }
    function ie(o) {
      var t = x();
      return function() {
        var i = _(o), r;
        if (t) {
          var l = _(this).constructor;
          r = Reflect.construct(i, arguments, l);
        } else
          r = i.apply(this, arguments);
        return ue(this, r);
      };
    }
    function xe(o, t) {
      for (; !Object.prototype.hasOwnProperty.call(o, t) && (o = _(o), o !== null); )
        ;
      return o;
    }
    function $(o, t, e) {
      return typeof Reflect < "u" && Reflect.get ? $ = Reflect.get : $ = function(r, l, u) {
        var d = xe(r, l);
        if (!!d) {
          var h = Object.getOwnPropertyDescriptor(d, l);
          return h.get ? h.get.call(u) : h.value;
        }
      }, $(o, t, e || o);
    }
    function V(o, t) {
      return O(o) || G(o, t) || De(o, t) || tt();
    }
    function P(o) {
      return U(o) || X(o) || De(o) || et();
    }
    function U(o) {
      if (Array.isArray(o))
        return pe(o);
    }
    function O(o) {
      if (Array.isArray(o))
        return o;
    }
    function X(o) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(o))
        return Array.from(o);
    }
    function G(o, t) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(o)))) {
        var e = [], i = !0, r = !1, l = void 0;
        try {
          for (var u = o[Symbol.iterator](), d; !(i = (d = u.next()).done) && (e.push(d.value), !(t && e.length === t)); i = !0)
            ;
        } catch (h) {
          r = !0, l = h;
        } finally {
          try {
            !i && u.return != null && u.return();
          } finally {
            if (r)
              throw l;
          }
        }
        return e;
      }
    }
    function De(o, t) {
      if (!!o) {
        if (typeof o == "string")
          return pe(o, t);
        var e = Object.prototype.toString.call(o).slice(8, -1);
        if (e === "Object" && o.constructor && (e = o.constructor.name), e === "Map" || e === "Set")
          return Array.from(o);
        if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
          return pe(o, t);
      }
    }
    function pe(o, t) {
      (t == null || t > o.length) && (t = o.length);
      for (var e = 0, i = new Array(t); e < t; e++)
        i[e] = o[e];
      return i;
    }
    function et() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function tt() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var B = function(t, e, i) {
      var r = t.x, l = t.y, u = i.x, d = i.y, h = {
        "+": {
          x: r + u,
          y: l + d
        },
        "-": {
          x: r - u,
          y: l - d
        },
        "*": {
          x: r * u,
          y: l * d
        },
        "/": {
          x: r / u,
          y: l / d
        }
      };
      return h[e];
    }, re = function(t) {
      return {
        x: t.left,
        y: t.top
      };
    }, $e = function(t) {
      var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: t.x,
        top: t.y,
        right: t.x,
        bottom: t.y,
        width: e,
        height: e
      };
    }, rt = function(t) {
      return {
        x: t,
        y: t
      };
    }, ot = function(o, t, e) {
      window.addEventListener("resize", t), window.addEventListener("scroll", t), o.forEach(function(i, r) {
        e.observe(i, {
          childList: r !== 0,
          attributes: !0
        });
      });
    }, st = function(o) {
      var t = de(o);
      return t.x || t.y ? !0 : o instanceof HTMLDocument ? o.body ? !!(o.body.scrollTop = 1) : !!(o.documentElement.scrollTop = 1) : !!(o.scrollTop = 1);
    }, nt = function(o) {
      var t = document.createElement("div");
      return t.style.position = "fixed", t.style.overflow = "hidden", t.style.pointerEvents = "none", t.style.zIndex = "999999999999999999", t.classList.add(o), t;
    }, it = function(o) {
      var t = document.createElement("div");
      return t.style.position = "absolute", o || (t.style.background = "rgba(0, 0, 255, 0.1)", t.style.border = "1px solid rgba(0, 0, 255, 0.45)", t.style.display = "none", t.style.pointerEvents = "none"), t;
    }, at = function(o, t) {
      var e;
      return function() {
        for (var i = arguments.length, r = new Array(i), l = 0; l < i; l++)
          r[l] = arguments[l];
        var u = function() {
          e = null, o.apply(void 0, r);
        };
        clearTimeout(e), e = setTimeout(u, t);
      };
    }, ye = function() {
      var o, t, e, i;
      return {
        y: ((o = document.body) === null || o === void 0 ? void 0 : o.scrollTop) || ((t = document.documentElement) === null || t === void 0 ? void 0 : t.scrollTop) || 0,
        x: ((e = document.body) === null || e === void 0 ? void 0 : e.scrollLeft) || ((i = document.documentElement) === null || i === void 0 ? void 0 : i.scrollLeft) || 0
      };
    }, lt = function(o, t) {
      if (o instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var e = o.getBoundingClientRect();
      return {
        top: e.top,
        left: e.left,
        bottom: e.bottom,
        right: e.right,
        width: (o.clientWidth || e.width) * t,
        height: (o.clientHeight || e.height) * t
      };
    }, de = function(o) {
      return !o || o instanceof Document ? ye() : {
        x: o.scrollLeft >= 0 ? o.scrollLeft : ye().x,
        y: o.scrollTop >= 0 ? o.scrollTop : ye().y
      };
    }, Ce = function(o) {
      var t = o.elementRect, e = o.containerRect, i = o.tolerance, r = i === void 0 ? {
        x: 0,
        y: 0
      } : i, l = [];
      return t.top - r.y < e.top && l.push("top"), t.left - r.x < e.left && l.push("left"), t.bottom + r.y > e.bottom && l.push("bottom"), t.right + r.y > e.right && l.push("right"), l;
    }, ct = function(o) {
      var t = o.event;
      return {
        x: t.clientX,
        y: t.clientY
      };
    }, ut = function(o) {
      var t = o.scrollAmount, e = o.initialPointerPos, i = o.pointerPos, r = {};
      return i.x > e.x - t.x ? (r.left = e.x - t.x, r.width = i.x - e.x + t.x) : (r.left = i.x, r.width = e.x - i.x - t.x), i.y > e.y - t.y ? (r.top = e.y - t.y, r.height = i.y - e.y + t.y) : (r.top = i.y, r.height = e.y - i.y - t.y), r;
    }, Pe = function(t) {
      var e = {
        x: 0,
        y: 0
      }, i = window.getComputedStyle(t);
      if (!i.transform || i.transform === "none")
        return e;
      if (i.transform.indexOf("3d") >= 0) {
        var r = i.transform.trim().match(/matrix3d\((.*?)\)/);
        if (r && r.length) {
          var l, u = (l = r[1]) === null || l === void 0 ? void 0 : l.split(",");
          e.x = parseInt(u[12]) || 0, e.y = parseInt(u[13]) || 0;
        }
        return e;
      } else {
        var d = i.transform.trim().match(/matrix\((.*?)\)/);
        if (d && d.length) {
          var h, S = (h = d[1]) === null || h === void 0 ? void 0 : h.split(",");
          e.x = parseInt(S[4]) || 0, e.y = parseInt(S[5]) || 0;
        }
        return e;
      }
    }, dt = function(t) {
      var e = t.style.transform;
      if (!e || e.indexOf("translate") < 0)
        return Pe(t);
      var i = {
        x: 0,
        y: 0
      }, r = e.trim().match(/translate[3dD]*?\(.*?\)/);
      if (r) {
        var l, u = (l = r[0]) === null || l === void 0 ? void 0 : l.split("(");
        if (u) {
          var d, h = (d = u[1]) === null || d === void 0 ? void 0 : d.split(",");
          i.x = parseInt(h[0]) || 0, i.y = parseInt(h[1]) || 0;
        }
      }
      return !i.x && !i.x ? Pe(t) : i;
    }, mt = function(t) {
      var e = t.style, i = {
        x: parseInt(e.left) || 0,
        y: parseInt(e.top) || 0
      };
      if (!i.x && !i.x) {
        var r = window.getComputedStyle(t);
        return {
          x: parseInt(r.left) || 0,
          y: parseInt(r.top) || 0
        };
      }
      return i;
    }, ht = function(o, t) {
      return t ? dt(o) : mt(o);
    }, ft = function(o) {
      var t = o.element, e = o.edges, i = o.elementRect, r = o.containerRect, l = o.elementPos, u = o.useTransform;
      e.includes("top") && ae(t, {
        y: l.y + r.top - i.top,
        x: l.x
      }, u), e.includes("left") && ae(t, {
        y: l.y,
        x: l.x + r.left - i.left
      }, u), e.includes("bottom") && ae(t, {
        y: l.y + r.bottom - i.bottom,
        x: l.x
      }, u), e.includes("right") && ae(t, {
        y: l.y,
        x: l.x + r.right - i.right
      }, u);
    }, Me = function(o) {
      var t = o.computedStyle, e = o.node, i = t.position, r = i === "absolute" || i === "relative" || i === "fixed";
      !(e instanceof HTMLDocument) && !r && (e.style.position = "relative");
    }, gt = function(o) {
      var t = o.shiftKey, e = o.keyboardDragSpeed, i = o.zoom, r = o.key, l = o.dragKeys, u = o.scrollDiff, d = o.canScroll, h = o.scrollCallback, S = {
        x: 0,
        y: 0
      }, v = t ? e * 4 * i : e * i;
      return l.left.includes(r) && (S.x = u.x || -v, !t && !u.x && d && h(["left"], e)), l.right.includes(r) && (S.x = u.x || v, !t && !u.x && d && h(["right"], e)), l.up.includes(r) && (S.y = u.y || -v, !t && !u.y && d && h(["top"], e)), l.down.includes(r) && (S.y = u.y || v, !t && !u.y && d && h(["bottom"], e)), S;
    }, vt = function(o) {
      var t = o.element, e = o.force, i = o.multiSelectionToggle, r = o.SelectedSet, l = o.hoverClassName;
      t.classList.contains(l) && !e || (r.has(t) ? i && r.delete(t) : r.add(t), t.classList.add(l));
    }, pt = function(o) {
      var t = o.element, e = o.force, i = o.SelectedSet, r = o.PrevSelectedSet, l = o.hoverClassName;
      if (!t.classList.contains(l) && !e)
        return !1;
      var u = i.has(t), d = r.has(t);
      u && !d ? i.delete(t) : !u && d && i.add(t), t.classList.remove(l);
    }, be = function(o, t) {
      return o.left < t.right && o.right > t.left && o.top < t.bottom && o.bottom > t.top;
    }, je = function(o) {
      var t = o.element, e = o.posDirection, i = o.containerRect, r = o.useTransform, l = ht(t, r), u = B(l, "+", e);
      ae(t, u, r);
      var d = t.getBoundingClientRect(), h = Ce({
        elementRect: d,
        containerRect: i
      });
      ft({
        element: t,
        edges: h,
        elementRect: d,
        containerRect: i,
        elementPos: u,
        useTransform: r
      });
    }, yt = function(o, t) {
      window.removeEventListener("resize", t), window.removeEventListener("scroll", t), o.disconnect();
    }, bt = function(o, t, e) {
      if (!!t.length) {
        var i = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, r = o instanceof HTMLDocument ? i || document.body : o, l = t.includes("top") && r.scrollTop > 0, u = t.includes("bottom") && r.scrollTop < r.scrollHeight, d = t.includes("left") && r.scrollLeft > 0, h = t.includes("right") && r.scrollLeft < r.scrollWidth;
        l && (r.scrollTop -= 1 * e), u && (r.scrollTop += 1 * e), d && (r.scrollLeft -= 1 * e), h && (r.scrollLeft += 1 * e);
      }
    }, ae = function(o, t, e) {
      if (e) {
        var i = o.style.transform;
        o.style.transform = "translate3d(".concat(t.x, "px,").concat(t.y, "px,1px) ").concat(i.replace(/translate.*?\)/g, ""));
      } else
        o.style.left = "".concat(t.x, "px"), o.style.top = "".concat(t.y, "px");
      return o;
    }, _t = function(o) {
      for (var t = o.subscribe, e = o.publish, i = o.Interaction, r = o.SelectedSet, l = {
        "Selected:added": [{
          name: "elementselect"
        }],
        "Selected:removed": [{
          name: "elementunselect"
        }],
        "Area:scroll": [{
          name: "autoscroll"
        }],
        "Interaction:start": [{
          name: "dragstart"
        }],
        "Interaction:update": [{
          name: "dragmove",
          condition: function(v) {
            return v.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, u = function() {
        var v = V(h[d], 2), D = v[0], M = v[1];
        ["pre", !1].forEach(function(L) {
          return t(L ? "".concat(D, ":").concat(L) : D, function(R) {
            return M.forEach(function(N) {
              return (!N.condition || N.condition(R)) && e(L ? "".concat(L).concat(N.name) : N.name, b({
                items: r.elements,
                isDragging: i.isDragging
              }, R));
            });
          });
        });
      }, d = 0, h = Object.entries(l); d < h.length; d++)
        u();
    }, oe = function(o) {
      return o ? !Array.isArray(o) && (o instanceof HTMLElement || o instanceof SVGElement) ? [o] : P(o) : [];
    }, Ae = function(o, t) {
      o.style.left = "".concat(t.left, "px"), o.style.top = "".concat(t.top, "px"), o.style.width = "".concat(t.width, "px"), o.style.height = "".concat(t.height, "px");
    }, wt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = t.PS, l = t.zoom;
        a(this, o), s(this, "_modificationCallback", void 0), s(this, "_modificationObserver", void 0), s(this, "_zoom", void 0), s(this, "_node", void 0), s(this, "_parentNodes", void 0), s(this, "_computedStyle", void 0), s(this, "_computedBorder", void 0), s(this, "_rect", void 0), s(this, "setArea", function(u) {
          e._node = u, Me({
            computedStyle: e.computedStyle,
            node: e._node
          }), setTimeout(function() {
            e.PubSub.publish("Area:modified:pre", {
              item: e
            }), e.reset(), e.PubSub.publish("Area:modified", {
              item: e
            });
          });
        }), s(this, "start", function() {
          ot(e.parentNodes, e._modificationCallback, e._modificationObserver);
        }), s(this, "reset", function() {
          e._computedStyle = void 0, e._rect = void 0, e._computedBorder = void 0, e._parentNodes = void 0;
        }), s(this, "stop", function() {
          yt(e._modificationObserver, e._modificationCallback), e.reset();
        }), s(this, "scroll", function(u, d) {
          var h = {
            scroll_directions: u,
            scroll_multiplier: d
          };
          e.PubSub.publish("Area:scroll:pre", h), bt(e._node, u, d), e.PubSub.publish("Area:scroll", h);
        }), this._zoom = l, this.PubSub = r, this.setArea(i), this._modificationCallback = at(function(u) {
          e.PubSub.publish("Area:modified:pre", {
            event: u,
            item: e
          }), e.reset(), e.PubSub.publish("Area:modified", {
            event: u,
            item: e
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return c(o, [{
        key: "HTMLNode",
        get: function() {
          return this._node;
        }
      }, {
        key: "computedBorder",
        get: function() {
          return this._computedBorder ? this._computedBorder : {
            top: parseInt(this.computedStyle.borderTopWidth),
            bottom: parseInt(this.computedStyle.borderBottomWidth),
            left: parseInt(this.computedStyle.borderLeftWidth),
            right: parseInt(this.computedStyle.borderRightWidth)
          };
        }
      }, {
        key: "computedStyle",
        get: function() {
          return this._computedStyle ? this._computedStyle : this.HTMLNode instanceof HTMLDocument ? this._computedStyle = window.getComputedStyle(this.HTMLNode.body || this.HTMLNode.documentElement) : this._computedStyle = window.getComputedStyle(this.HTMLNode);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = lt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var e = function i(r) {
            var l, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, d = (l = r[u]) === null || l === void 0 ? void 0 : l.parentNode;
            return d ? (r.push(d), u++, i(r, u)) : r;
          };
          return this._parentNodes = e([this.HTMLNode]), this._parentNodes;
        }
      }]), o;
    }(), St = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.dragKeys, l = t.draggability, u = t.keyboardDrag, d = t.keyboardDragSpeed, h = t.useTransform, S = t.zoom;
        a(this, o), s(this, "_useTransform", void 0), s(this, "_prevCursorPos", void 0), s(this, "_prevScrollPos", void 0), s(this, "_elements", []), s(this, "_draggability", void 0), s(this, "_dragKeys", void 0), s(this, "_dragKeysFlat", void 0), s(this, "_keyboardDrag", void 0), s(this, "_keyboardDragSpeed", void 0), s(this, "_zoom", void 0), s(this, "keyboardDrag", function(v) {
          var D = v.event, M = v.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(M) || !e.DS.SelectedSet.size || !e._draggability || e.DS.continue)) {
            var L = {
              event: D,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:start:pre", "Interaction:start"], L), e._elements = e.DS.getSelection(), e.handleZIndex(!0);
            var R = gt({
              shiftKey: e.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: e._keyboardDragSpeed,
              zoom: e._zoom,
              key: M,
              scrollCallback: e.DS.Area.scroll,
              scrollDiff: e._scrollDiff,
              canScroll: e.DS.stores.ScrollStore.canScroll,
              dragKeys: e._dragKeys
            });
            e._elements.forEach(function(N) {
              return je({
                element: N,
                posDirection: R,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            }), e.DS.publish(["Interaction:update:pre", "Interaction:update"], L);
          }
        }), s(this, "keyboardEnd", function(v) {
          var D = v.event, M = v.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(M) || !e.DS.SelectedSet.size || !e._draggability)) {
            var L = {
              event: D,
              isDragging: e._draggability,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:end:pre", "Interaction:end"], L);
          }
        }), s(this, "start", function(v) {
          var D = v.isDragging, M = v.isDraggingKeyboard;
          !D || M || (e._prevCursorPos = null, e._prevScrollPos = null, e._elements = e.DS.getSelection(), e.handleZIndex(!0));
        }), s(this, "stop", function(v) {
          v != null && v.isKeyboard || (e._prevCursorPos = null, e._prevScrollPos = null, e.handleZIndex(!1), e._elements = []);
        }), s(this, "update", function(v) {
          var D = v.isDragging, M = v.isDraggingKeyboard;
          if (!(!D || !e._elements.length || M || e.DS.continue)) {
            var L = B(e._cursorDiff, "+", e._scrollDiff);
            e._elements.forEach(function(R) {
              return je({
                element: R,
                posDirection: L,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            });
          }
        }), s(this, "handleZIndex", function(v) {
          e._elements.forEach(function(D) {
            return D.style.zIndex = "".concat((parseInt(D.style.zIndex) || 0) + v ? 9999 : -9998);
          });
        }), this.DS = i, this._useTransform = h, this._keyboardDragSpeed = d, this._keyboardDrag = u, this._zoom = S, this._draggability = l, this._dragKeys = {
          up: r.up.map(function(v) {
            return v.toLowerCase();
          }),
          down: r.down.map(function(v) {
            return v.toLowerCase();
          }),
          left: r.left.map(function(v) {
            return v.toLowerCase();
          }),
          right: r.right.map(function(v) {
            return v.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(P(this._dragKeys.up), P(this._dragKeys.down), P(this._dragKeys.left), P(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return c(o, [{
        key: "_cursorDiff",
        get: function() {
          var e = this.DS.stores.PointerStore.currentVal, i = this._prevCursorPos ? B(e, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = e, i;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var e = this.DS.stores.ScrollStore.currentVal, i = this._prevScrollPos ? B(e, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = e, i;
        }
      }]), o;
    }(), kt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.draggability, u = t.immediateDrag, d = t.selectableClass;
        a(this, o), s(this, "_areaElement", void 0), s(this, "_draggability", void 0), s(this, "_immediateDrag", void 0), s(this, "_selectableClass", void 0), s(this, "isInteracting", void 0), s(this, "isDragging", void 0), s(this, "init", function() {
          return e.DS.publish("Interaction:init:pre", {});
        }), s(this, "_init", function() {
          e.stop(), e._areaElement.addEventListener("mousedown", e.start), e._areaElement.addEventListener("touchstart", e.start, {
            passive: !1
          }), e.DS.publish("Interaction:init", {});
        }), s(this, "start", function(h) {
          return e.DS.publish("Interaction:start:pre", {
            event: h,
            isDragging: e.isDragging
          });
        }), s(this, "_start", function(h) {
          h.type === "touchstart" && h.preventDefault(), e._canInteract(h) && (e.isInteracting = !0, e.isDragging = e.isDragEvent(h), e.DS.publish("Interaction:start", {
            event: h,
            isDragging: e.isDragging
          }), document.addEventListener("mouseup", e.reset), document.addEventListener("touchend", e.reset));
        }), s(this, "isDragEvent", function(h) {
          var S = h.target.closest(".".concat(e._selectableClass));
          return !e._draggability || e.DS.stores.KeyStore.isMultiSelectKeyPressed(h) || !S ? !1 : (e._immediateDrag && (e.DS.SelectedSet.size ? e.DS.SelectedSet.has(S) || (e.DS.SelectedSet.clear(), e.DS.SelectedSet.add(
            S
          )) : e.DS.SelectedSet.add(
            S
          )), !!e.DS.SelectedSet.has(S));
        }), s(this, "onClick", function(h) {
          var S = h.event;
          if (!!e._canInteract(S) && !(S.detail > 0)) {
            var v = e.DS, D = v.stores, M = D.PointerStore, L = D.KeyStore, R = v.SelectableSet, N = v.SelectedSet;
            M.start(S);
            var se = S.target;
            !R.has(se) || (L.isMultiSelectKeyPressed(S) || N.clear(), N.toggle(se), e.reset());
          }
        }), s(this, "stop", function() {
          e.isInteracting = !1, e.isDragging = !1, e._areaElement.removeEventListener("mousedown", e.start), e._areaElement.removeEventListener("touchstart", e.start, {
            passive: !1
          }), document.removeEventListener("mouseup", e.reset), document.removeEventListener("touchend", e.reset);
        }), s(this, "update", function(h) {
          var S = h.event, v = h.scroll_directions, D = h.scroll_multiplier;
          e.isInteracting && e.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: S,
            scroll_directions: v,
            scroll_multiplier: D,
            isDragging: e.isDragging
          });
        }), s(this, "reset", function(h) {
          return e.DS.publish("Interaction:end:pre", {
            event: h,
            isDragging: e.isDragging
          });
        }), s(this, "_reset", function(h) {
          var S = e.isDragging;
          e.stop(), e.init(), e.DS.publish("Interaction:end", {
            event: h,
            isDragging: S
          });
        }), this._areaElement = r, this._draggability = l, this._immediateDrag = u, this._selectableClass = d, this.DS = i, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(h) {
          var S = h.event;
          return e.start(S);
        }), this.DS.subscribe("Interaction:start:pre", function(h) {
          var S = h.event;
          return e._start(S);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(h) {
          var S = h.event;
          return e._reset(S);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return c(o, [{
        key: "_canInteract",
        value: function(e) {
          var i = e.clientX === 0 && e.clientY === 0 && e.detail === 0 && e.target;
          return !(e.button === 2 || this.isInteracting || e.target && !this.DS.SelectorArea.isInside(
            e.target
          ) || !i && !this.DS.SelectorArea.isClicked(e));
        }
      }]), o;
    }(), xt = function o(t) {
      var e = this, i = t.DS;
      a(this, o), s(this, "subscribers", {}), s(this, "subscribe", function(r, l) {
        return Array.isArray(e.subscribers[r]) || (e.subscribers[r] = []), e.subscribers[r].push(l), e.subscribers[r].length - 1;
      }), s(this, "unsubscribe", function(r, l, u) {
        u >= 0 ? e.subscribers[r].splice(u, 1) : l && (e.subscribers[r] = e.subscribers[r].filter(function(d) {
          return d !== l;
        }));
      }), s(this, "publish", function(r, l) {
        Array.isArray(r) ? r.forEach(function(u) {
          return e._publish(u, l);
        }) : e._publish(r, l);
      }), s(this, "_publish", function(r, l) {
        var u = e.subscribers[r];
        !Array.isArray(u) || (r.includes(":pre") ? e._handlePrePublish(u, l) : e._handlePublish(u, l));
      }), s(this, "_handlePublish", function(r, l) {
        for (var u = 0, d = r.length; u < d; u++) {
          if (e.DS.stopped)
            return;
          r[u](l);
        }
      }), s(this, "_handlePrePublish", function(r, l) {
        for (var u = r.length; u--; ) {
          if (e.DS.stopped)
            return;
          r[u](l);
        }
      }), this.DS = i;
    }, Dt = /* @__PURE__ */ function(o) {
      w(e, o);
      var t = ie(e);
      function e(i) {
        var r, l = i.elements, u = i.className, d = i.hoverClassName, h = i.draggability, S = i.useTransform, v = i.DS;
        return a(this, e), r = t.call(this), s(I(r), "_initElements", void 0), s(I(r), "_className", void 0), s(I(r), "_hoverClassName", void 0), s(I(r), "_useTransform", void 0), s(I(r), "_draggability", void 0), s(I(r), "init", function() {
          return r._initElements.forEach(function(D) {
            return r.add(D);
          });
        }), s(I(r), "clear", function() {
          return r.forEach(function(D) {
            return r.delete(D);
          });
        }), s(I(r), "_onClick", function(D) {
          return r.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: D
          });
        }), s(I(r), "_onPointer", function(D) {
          return r.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: D
          });
        }), s(I(r), "addAll", function(D) {
          return D.forEach(function(M) {
            return r.add(M);
          });
        }), s(I(r), "deleteAll", function(D) {
          return D.forEach(function(M) {
            return r.delete(M);
          });
        }), r.DS = v, r._initElements = oe(l), r._className = u, r._hoverClassName = d, r._useTransform = S, r._draggability = h, r.DS.subscribe("Interaction:init", r.init), r;
      }
      return c(e, [{
        key: "add",
        value: function(r) {
          return r.classList.add(this._className), r.addEventListener("click", this._onClick), r.addEventListener("mousedown", this._onPointer), r.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Me({
            computedStyle: window.getComputedStyle(r),
            node: r
          }), $(_(e.prototype), "add", this).call(this, r);
        }
      }, {
        key: "delete",
        value: function(r) {
          return r.classList.remove(this._className), r.classList.remove(this._hoverClassName), r.removeEventListener("click", this._onClick), r.removeEventListener("mousedown", this._onPointer), r.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), $(_(e.prototype), "delete", this).call(this, r);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), e;
    }(/* @__PURE__ */ H(Set)), $t = /* @__PURE__ */ function(o) {
      w(e, o);
      var t = ie(e);
      function e(i) {
        var r, l = i.className, u = i.DS;
        return a(this, e), r = t.call(this), s(I(r), "_className", void 0), s(I(r), "clear", function() {
          return r.forEach(function(d) {
            return r.delete(d);
          });
        }), s(I(r), "addAll", function(d) {
          return d.forEach(function(h) {
            return r.add(h);
          });
        }), s(I(r), "deleteAll", function(d) {
          return d.forEach(function(h) {
            return r.delete(h);
          });
        }), r.DS = u, r._className = l, r;
      }
      return c(e, [{
        key: "add",
        value: function(r) {
          if (!$(_(e.prototype), "has", this).call(this, r)) {
            var l = {
              items: this.elements,
              item: r
            };
            return this.DS.publish("Selected:added:pre", l), $(_(e.prototype), "add", this).call(this, r), r.classList.add(this._className), r.style.zIndex = "".concat((parseInt(r.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", l), this;
          }
        }
      }, {
        key: "delete",
        value: function(r) {
          if (!!$(_(e.prototype), "has", this).call(this, r)) {
            var l = {
              items: this.elements,
              item: r
            };
            this.DS.publish("Selected:removed:pre", l);
            var u = $(_(e.prototype), "delete", this).call(this, r);
            return r.classList.remove(this._className), r.style.zIndex = "".concat((parseInt(r.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", l), u;
          }
        }
      }, {
        key: "toggle",
        value: function(r) {
          return this.has(r) ? this.delete(r) : this.add(r), r;
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), e;
    }(/* @__PURE__ */ H(Set)), Ct = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.hoverClassName, l = t.multiSelectToggling;
        a(this, o), s(this, "_prevSelectedSet", void 0), s(this, "_hoverClassName", void 0), s(this, "_multiSelectToggling", void 0), s(this, "start", function(u) {
          var d = u.event, h = u.isDragging;
          h || (e._storePrevious(d), e._handleInsideSelection(!0, d));
        }), s(this, "update", function(u) {
          var d = u.isDragging;
          d || e.DS.continue || e._handleInsideSelection();
        }), s(this, "_handleInsideSelection", function(u, d) {
          for (var h = e.DS, S = h.SelectableSet, v = h.SelectorArea, D = h.Selector, M = S.elements.map(function(Q) {
            return [Q, Q.getBoundingClientRect()];
          }), L = [], R = [], N = 0, se = M.length; N < se; N++)
            !v.isInside(M[N][0], M[N][1]) || (be(M[N][1], D.rect) ? L.push(M[N][0]) : R.push(M[N][0]));
          var me = e.DS.stores.KeyStore.isMultiSelectKeyPressed(d) && e._multiSelectToggling;
          e.DS.continue || (L.forEach(function(Q) {
            return vt({
              element: Q,
              force: u,
              multiSelectionToggle: me,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName
            });
          }), R.forEach(function(Q) {
            return pt({
              element: Q,
              force: u,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName,
              PrevSelectedSet: e._prevSelectedSet
            });
          }));
        }), this._hoverClassName = r, this._multiSelectToggling = l, this.DS = i, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return c(o, [{
        key: "_storePrevious",
        value: function(e) {
          var i = this.DS, r = i.stores.KeyStore, l = i.SelectedSet;
          r.isMultiSelectKeyPressed(e) ? this._prevSelectedSet = new Set(l) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), o;
    }(), Pt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.selector, l = t.selectorClass, u = t.customStyles;
        a(this, o), s(this, "_rect", void 0), s(this, "start", function(d) {
          var h = d.isDragging;
          if (!h) {
            var S = e.DS.stores.PointerStore, v = S.initialValArea;
            Ae(e.HTMLNode, $e(v, 1)), e.HTMLNode.style.display = "block", e._rect = null;
          }
        }), s(this, "stop", function() {
          e.HTMLNode.style.width = "0", e.HTMLNode.style.height = "0", e.HTMLNode.style.display = "none";
        }), s(this, "update", function(d) {
          var h = d.isDragging;
          if (!(h || e.DS.continue)) {
            var S = e.DS.stores, v = S.ScrollStore, D = S.PointerStore, M = ut({
              scrollAmount: v.scrollAmount,
              initialPointerPos: D.initialValArea,
              pointerPos: D.currentValArea
            });
            Ae(e.HTMLNode, M), e._rect = null;
          }
        }), this.DS = i, this.HTMLNode = r || it(u), this.HTMLNode.classList.add(l), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return c(o, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), o;
    }(), Mt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.selectorAreaClass, l = t.autoScrollSpeed, u = t.overflowTolerance;
        a(this, o), s(this, "_autoScrollSpeed", void 0), s(this, "_scrollInterval", void 0), s(this, "_rect", void 0), s(this, "currentEdges", []), s(this, "_overflowTolerance", void 0), s(this, "start", function() {
          return e.applyElements("append");
        }), s(this, "applyElements", function() {
          var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", h = document.body ? "body" : "documentElement", S = "".concat(d, "Child");
          e.HTMLNode[S](e.DS.Selector.HTMLNode), document[h][S](e.HTMLNode);
        }), s(this, "updatePos", function() {
          e._rect = null;
          var d = e.DS.Area.rect, h = e.DS.Area.computedBorder, S = e.HTMLNode.style, v = "".concat(d.top + h.top, "px"), D = "".concat(d.left + h.left, "px"), M = "".concat(d.width, "px"), L = "".concat(d.height, "px");
          S.top !== v && (S.top = v), S.left !== D && (S.left = D), S.width !== M && (S.width = M), S.height !== L && (S.height = L);
        }), s(this, "stop", function(d) {
          e.stopAutoScroll(), d && e.applyElements("remove");
        }), s(this, "startAutoScroll", function() {
          e.currentEdges = [], e._scrollInterval = setInterval(function() {
            return e.handleAutoScroll();
          }, 16);
        }), s(this, "handleAutoScroll", function() {
          if (!e.DS.continue) {
            var d = e.DS, h = d.stores.PointerStore, S = d.Area;
            e.currentEdges = Ce({
              elementRect: $e(h.currentVal),
              containerRect: e.rect,
              tolerance: e._overflowTolerance
            }), e.currentEdges.length && S.scroll(e.currentEdges, e._autoScrollSpeed);
          }
        }), s(this, "stopAutoScroll", function() {
          e.currentEdges = [], clearInterval(e._scrollInterval);
        }), s(this, "isInside", function(d, h) {
          return e.DS.Area.HTMLNode.contains(d) && e.DS.stores.ScrollStore.canScroll ? !0 : be(e.rect, h || d.getBoundingClientRect());
        }), this._autoScrollSpeed = l, this._overflowTolerance = u, this.DS = i, this.HTMLNode = nt(r), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          e.updatePos(), e.stopAutoScroll();
        });
      }
      return c(o, [{
        key: "isClicked",
        value: function(e) {
          var i = this.DS.stores.PointerStore, r = e ? i.getPointerPosition(e) : i.initialVal;
          return be({
            left: r.x,
            top: r.y,
            right: r.x,
            bottom: r.y
          }, this.rect);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), o;
    }(), jt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.multiSelectKeys, l = t.multiSelectMode;
        a(this, o), s(this, "_multiSelectMode", void 0), s(this, "_multiSelectKeys", void 0), s(this, "_currentValues", /* @__PURE__ */ new Set()), s(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), s(this, "init", function() {
          document.addEventListener("keydown", e.keydown), document.addEventListener("keyup", e.keyup), window.addEventListener("blur", e.reset);
        }), s(this, "keydown", function(u) {
          var d = u.key.toLowerCase();
          e.DS.publish("KeyStore:down:pre", {
            event: u,
            key: d
          }), e._currentValues.add(d), e.DS.publish("KeyStore:down", {
            event: u,
            key: d
          });
        }), s(this, "keyup", function(u) {
          var d = u.key.toLowerCase();
          e.DS.publish("KeyStore:up:pre", {
            event: u,
            key: d
          }), e._currentValues.delete(d), e.DS.publish("KeyStore:up", {
            event: u,
            key: d
          });
        }), s(this, "stop", function() {
          document.removeEventListener("keydown", e.keydown), document.removeEventListener("keyup", e.reset), window.removeEventListener("blur", e.reset), e.reset();
        }), s(this, "reset", function() {
          return e._currentValues.clear();
        }), this.DS = i, this._multiSelectMode = l, this._multiSelectKeys = r.map(function(u) {
          var d = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, h = d[u];
          return h ? (console.warn("[DragSelect] ".concat(u, ' is deprecated. Use "').concat(h, '" instead. Act Now!. See docs for more info')), h.toLowerCase()) : u.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return c(o, [{
        key: "isMultiSelectKeyPressed",
        value: function(e) {
          var i = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(r) {
            return i._multiSelectKeys.includes(r);
          }) || e && this._multiSelectKeys.some(function(r) {
            return e[i._keyMapping[r]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), o;
    }(), At = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS;
        a(this, o), s(this, "_isMouseInteraction", !1), s(this, "_initialValArea", void 0), s(this, "_currentValArea", void 0), s(this, "_lastValArea", void 0), s(this, "_initialVal", void 0), s(this, "_currentVal", void 0), s(this, "_lastVal", void 0), s(this, "_lastTouch", void 0), s(this, "init", function() {
          document.addEventListener("mousemove", e.update), document.addEventListener("touchmove", e.update, {
            passive: !1
          });
        }), s(this, "getPointerPosition", function(r) {
          return ct({
            event: e._normalizedEvent(r)
          });
        }), s(this, "update", function(r) {
          !r || (e.DS.publish("PointerStore:updated:pre", {
            event: r
          }), e.currentVal = e.getPointerPosition(r), e._isMouseInteraction && e.DS.publish("PointerStore:updated", {
            event: r
          }));
        }), s(this, "stop", function() {
          document.removeEventListener("mousemove", e.update), document.removeEventListener("touchmove", e.update, {
            passive: !1
          }), setTimeout(function() {
            return e._isMouseInteraction = !1;
          }, 100);
        }), s(this, "reset", function(r) {
          !r || (e.currentVal = e.lastVal = e.getPointerPosition(r), e.stop(), e.init());
        }), this.DS = i, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(r) {
          var l = r.event;
          return e.start(l);
        }), this.DS.subscribe("Interaction:end", function(r) {
          var l = r.event;
          return e.reset(l);
        });
      }
      return c(o, [{
        key: "start",
        value: function(e) {
          !e || (this._isMouseInteraction = !0, this.currentVal = this.initialVal = this.getPointerPosition(e));
        }
      }, {
        key: "_normalizedEvent",
        value: function(e) {
          return "touches" in e && e.type !== "touchend" && (this._lastTouch = e), "touches" in e ? this._lastTouch.touches[0] : e;
        }
      }, {
        key: "initialValArea",
        get: function() {
          return this._initialValArea ? this._initialValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "currentValArea",
        get: function() {
          return this._currentValArea ? this._currentValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "lastValArea",
        get: function() {
          return this._lastValArea ? this._lastValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "initialVal",
        get: function() {
          return this._initialVal ? this._initialVal : {
            x: 0,
            y: 0
          };
        },
        set: function(e) {
          this._initialVal = e, this._initialValArea = e && B(e, "-", B(re(this.DS.Area.rect), "+", re(this.DS.Area.computedBorder)));
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal ? this._currentVal : {
            x: 0,
            y: 0
          };
        },
        set: function(e) {
          this._currentVal = e, this._currentValArea = e && B(e, "-", B(re(this.DS.Area.rect), "+", re(this.DS.Area.computedBorder)));
        }
      }, {
        key: "lastVal",
        get: function() {
          return this._lastVal ? this._lastVal : {
            x: 0,
            y: 0
          };
        },
        set: function(e) {
          this._lastVal = e, this._lastValArea = e && B(e, "-", B(re(this.DS.Area.rect), "+", re(this.DS.Area.computedBorder)));
        }
      }]), o;
    }(), Et = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.zoom;
        a(this, o), s(this, "_initialVal", void 0), s(this, "_currentVal", void 0), s(this, "_areaElement", void 0), s(this, "_canScroll", void 0), s(this, "init", function() {
          return e._areaElement.addEventListener("scroll", e.update);
        }), s(this, "start", function() {
          e._currentVal = e._initialVal = de(e._areaElement), e._areaElement.addEventListener("scroll", e.update);
        }), s(this, "update", function() {
          return e._currentVal = de(e._areaElement);
        }), s(this, "stop", function() {
          e._areaElement.removeEventListener("scroll", e.update), e._initialVal = {
            x: 0,
            y: 0
          }, e._canScroll = null;
        }), s(this, "reset", function() {
          e.stop(), e.start();
        }), this._areaElement = r, this.DS = i, this.zoom = l, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return e.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return e.reset();
        });
      }
      return c(o, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = st(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var e = B(this.currentVal, "-", this.initialVal), i = rt(this.zoom), r = B(B(e, "*", i), "-", e);
          return {
            x: e.x + r.x,
            y: e.y + r.y
          };
        }
      }, {
        key: "initialVal",
        get: function() {
          return this._initialVal ? this._initialVal : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal || (this._currentVal = de(this._areaElement)), this._currentVal;
        }
      }]), o;
    }(), Vt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = i === void 0 ? document : i, l = t.selectables, u = l === void 0 ? [] : l, d = t.autoScrollSpeed, h = d === void 0 ? 5 : d, S = t.overflowTolerance, v = S === void 0 ? {
          x: 25,
          y: 25
        } : S, D = t.zoom, M = D === void 0 ? 1 : D, L = t.customStyles, R = L === void 0 ? !1 : L, N = t.multiSelectMode, se = N === void 0 ? !1 : N, me = t.multiSelectToggling, Q = me === void 0 ? !0 : me, Ee = t.multiSelectKeys, Tt = Ee === void 0 ? ["Control", "Shift", "Meta"] : Ee, Ve = t.selector, It = Ve === void 0 ? void 0 : Ve, Te = t.draggability, _e = Te === void 0 ? !0 : Te, Ie = t.immediateDrag, Lt = Ie === void 0 ? !0 : Ie, Le = t.keyboardDrag, Ot = Le === void 0 ? !0 : Le, Nt = t.dragKeys, Oe = t.keyboardDragSpeed, zt = Oe === void 0 ? 10 : Oe, Ne = t.useTransform, ze = Ne === void 0 ? !0 : Ne, Ke = t.hoverClass, Be = Ke === void 0 ? "ds-hover" : Ke, He = t.selectableClass, Re = He === void 0 ? "ds-selectable" : He, Fe = t.selectedClass, Kt = Fe === void 0 ? "ds-selected" : Fe, Ue = t.selectorClass, Bt = Ue === void 0 ? "ds-selector" : Ue, qe = t.selectorAreaClass, Ht = qe === void 0 ? "ds-selector-area" : qe, Rt = t.callback, Ft = t.onDragMove, Ut = t.onDragStartBegin, qt = t.onDragStart, Wt = t.onElementSelect, Yt = t.onElementUnselect;
        a(this, o), s(this, "continue", !1), s(this, "start", function() {
          e.stopped = !1, e.Interaction.init();
        }), s(this, "break", function() {
          return e.continue = !0;
        }), s(this, "getSelection", function() {
          return e.SelectedSet.elements;
        }), s(this, "getSelectables", function() {
          return e.SelectableSet.elements;
        }), s(this, "getInitialCursorPosition", function() {
          return e.stores.PointerStore.initialVal;
        }), s(this, "getCurrentCursorPosition", function() {
          return e.stores.PointerStore.currentVal;
        }), s(this, "getPreviousCursorPosition", function() {
          return e.stores.PointerStore.lastVal;
        }), s(this, "getInitialCursorPositionArea", function() {
          return e.stores.PointerStore.initialValArea;
        }), s(this, "getCurrentCursorPositionArea", function() {
          return e.stores.PointerStore.currentValArea;
        }), s(this, "getPreviousCursorPositionArea", function() {
          return e.stores.PointerStore.lastValArea;
        }), s(this, "isMultiSelect", function(Jt) {
          return e.stores.KeyStore.isMultiSelectKeyPressed(Jt);
        }), s(this, "isDragging", function() {
          return e.Interaction.isDragging;
        }), this.PubSub = new xt({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Rt,
          onDragMove: Ft,
          onDragStart: qt,
          onDragStartBegin: Ut,
          onElementSelect: Wt,
          onElementUnselect: Yt
        }), this.stores = {
          PointerStore: new At({
            DS: this
          }),
          ScrollStore: new Et({
            DS: this,
            areaElement: r,
            zoom: M
          }),
          KeyStore: new jt({
            DS: this,
            multiSelectKeys: Tt,
            multiSelectMode: se
          })
        }, this.Area = new wt({
          area: r,
          PS: this.PubSub,
          zoom: M
        }), this.Selector = new Pt({
          DS: this,
          selector: It,
          selectorClass: Bt,
          customStyles: R
        }), this.SelectorArea = new Mt({
          DS: this,
          selectorAreaClass: Ht,
          autoScrollSpeed: h,
          overflowTolerance: v
        }), this.SelectableSet = new Dt({
          elements: u,
          DS: this,
          className: Re,
          hoverClassName: Be,
          useTransform: ze,
          draggability: _e
        }), this.SelectedSet = new $t({
          DS: this,
          className: Kt
        }), this.Selection = new Ct({
          DS: this,
          hoverClassName: Be,
          multiSelectToggling: Q
        }), this.Drag = new St({
          DS: this,
          draggability: _e,
          useTransform: ze,
          keyboardDrag: Ot,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, Nt),
          zoom: M,
          keyboardDragSpeed: zt
        }), this.Interaction = new kt({
          areaElement: r,
          DS: this,
          draggability: _e,
          immediateDrag: Lt,
          selectableClass: Re
        }), _t({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return e.continue = !1;
        }), this.start();
      }
      return c(o, [{
        key: "_callbacksTemp",
        value: function(e) {
          var i = e.callback, r = e.onDragMove, l = e.onDragStart, u = e.onDragStartBegin, d = e.onElementSelect, h = e.onElementUnselect, S = function(D, M) {
            return console.warn("[DragSelect] ".concat(D, ' is deprecated. Use DragSelect.subscribe("').concat(M, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          i && (S("callback", "callback"), this.subscribe("callback", function(v) {
            var D = v.items;
            v.item;
            var M = v.event;
            return i(D, M);
          })), r && (S("onDragMove", "dragmove"), this.subscribe("dragmove", function(v) {
            v.items, v.item;
            var D = v.event;
            return r(D);
          })), l && (S("onDragStart", "dragstart"), this.subscribe("dragstart", function(v) {
            v.items, v.item;
            var D = v.event;
            return l(D);
          })), u && (S("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(v) {
            v.items, v.item;
            var D = v.event;
            return u(D);
          })), d && (S("onElementSelect", "elementselect"), this.subscribe("elementselect", function(v) {
            v.items;
            var D = v.item, M = v.event;
            return d(D, M);
          })), h && (S("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(v) {
            v.items;
            var D = v.item, M = v.event;
            return h(D, M);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          r && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(e), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), e && this.SelectableSet.clear(), i && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(oe(e)), r || this.addSelectables(e), i && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(oe(e)), r && this.removeSelectables(e), i && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(e) {
          var i = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return oe(e).forEach(function(u) {
            return i.SelectedSet.has(u) ? i.removeSelection(e, r, l) : i.addSelection(e, r, l);
          }), r && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(e, i, r), this.getSelection();
        }
      }, {
        key: "clearSelection",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return this.SelectedSet.clear(), e && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "addSelectables",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = oe(e);
          return this.SelectableSet.addAll(r), i && this.SelectedSet.addAll(r), e;
        }
      }, {
        key: "setSelectables",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(e, i), this.addSelectables(e, r);
        }
      }, {
        key: "removeSelectables",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(oe(e)), i && this.removeSelection(e), e;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var r = i ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), l = e ? i ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : i ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return B(r, "-", l);
        }
      }]), o;
    }();
    return Vt;
  });
})(Qe);
const jr = Qe.exports, Ar = (f, m, a, g, c) => (m = Math, a = m.log, g = 1024, c = a(f) / a(g) | 0, f / m.pow(g, c)).toFixed(0) + " " + (c ? "KMGTPEZY"[--c] + "iB" : "B"), Er = (f, m = "en-US") => new Date(f * 1e3).toLocaleString(m), Vr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Tr = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Ir = [
  Tr
], Lr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Or = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Nr = [
  Or
], zr = {
  name: "VFSortIcon"
}, Se = /* @__PURE__ */ Object.assign(zr, {
  props: { direction: String },
  setup(f) {
    return (m, a) => (p(), k("div", null, [
      f.direction == "down" ? (p(), k("svg", Vr, Ir)) : q("", !0),
      f.direction == "up" ? (p(), k("svg", Lr, Nr)) : q("", !0)
    ]));
  }
}), Kr = { class: "relative h-full" }, Br = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Hr = /* @__PURE__ */ le(" Name "), Rr = /* @__PURE__ */ le(" Size "), Fr = /* @__PURE__ */ le(" Date "), Ur = { class: "absolute" }, qr = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Wr = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Yr = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Jr = { class: "grid grid-cols-12 items-center" }, Zr = { class: "flex col-span-7 items-center" }, Xr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gr = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Qr = [
  Gr
], eo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, to = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ro = [
  to
], oo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, so = { class: "col-span-2 text-center" }, no = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, io = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], ao = { class: "relative" }, lo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, co = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), uo = [
  co
], mo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ho = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fo = [
  ho
], go = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, vo = { class: "break-all" }, po = {
  name: "VFExplorer"
}, yo = /* @__PURE__ */ Object.assign(po, {
  props: {
    view: String,
    data: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = ($) => $ == null ? void 0 : $.substring(0, 3), s = ($) => $.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), y = E(null), b = E(null), w = E(0), _ = E(null), C = ($) => {
      $.type == "dir" ? a.emit("vf-fetch", { q: "index", adapter: m.data.adapter, path: $.path }) : a.emit("vf-modal-show", { type: "preview", adapter: m.data.adapter, item: $ });
    }, x = fe({ active: !1, column: "", order: "" }), A = ($ = !0) => {
      let V = [...m.data.files], P = x.column, U = x.order == "asc" ? 1 : -1;
      if (!$)
        return V;
      const O = (X, G) => typeof X == "string" && typeof G == "string" ? X.toLowerCase().localeCompare(G.toLowerCase()) : X < G ? -1 : X > G ? 1 : 0;
      return x.active && (V = V.slice().sort((X, G) => O(X[P], G[P]) * U)), V;
    }, F = ($) => {
      x.active && x.column == $ ? (x.active = x.order == "asc", x.column = $, x.order = "desc") : (x.active = !0, x.column = $, x.order = "asc");
    }, H = () => _.value.getSelection().map(($) => JSON.parse($.dataset.item)), I = ($, V) => {
      if ($.altKey || $.ctrlKey || $.metaKey)
        return $.preventDefault(), !1;
      $.dataTransfer.setDragImage(b.value, 0, 15), $.dataTransfer.effectAllowed = "all", $.dataTransfer.dropEffect = "copy", $.dataTransfer.setData("items", JSON.stringify(H()));
    }, ue = ($, V) => {
      $.preventDefault();
      let P = JSON.parse($.dataTransfer.getData("items"));
      if (P.find((U) => U.storage != g("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", { type: "move", items: { from: P, to: V } });
    }, ie = ($, V) => {
      $.preventDefault(), !V || V.type !== "dir" || _.value.getSelection().find((P) => P == $.currentTarget) ? ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none") : $.dataTransfer.dropEffect = "copy";
    };
    return Y(() => {
      _.value = new jr({
        area: y.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), a.on("vf-explorer-update", () => Xe(() => {
        _.value.clearSelection(), _.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), _.value.subscribe("predragstart", ({ event: $, isDragging: V }) => {
        if (V)
          w.value = _.value.getSelection().length, _.value.break();
        else {
          const P = $.target.offsetWidth - $.offsetX, U = $.target.offsetHeight - $.offsetY;
          P < 15 && U < 15 && (_.value.clearSelection(), _.value.break());
        }
      }), _.value.subscribe("predragmove", ({ isDragging: $ }) => {
        $ && _.value.break();
      }), _.value.subscribe("callback", ({ items: $, event: V, isDragging: P }) => {
        a.emit("vf-nodes-selected", H()), w.value = _.value.getSelection().length;
      });
    }), Y(() => {
      Ze(() => m.view, () => a.emit("vf-explorer-update"));
    }), ($, V) => (p(), k("div", Kr, [
      f.view == "list" ? (p(), k("div", Br, [
        n("div", {
          onClick: V[0] || (V[0] = (P) => F("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          Hr,
          te(ee(Se, {
            direction: x.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [we, x.active && x.column == "basename"]
          ])
        ]),
        n("div", {
          onClick: V[1] || (V[1] = (P) => F("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          Rr,
          te(ee(Se, {
            direction: x.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [we, x.active && x.column == "file_size"]
          ])
        ]),
        n("div", {
          onClick: V[2] || (V[2] = (P) => F("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          Fr,
          te(ee(Se, {
            direction: x.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [we, x.active && x.column == "last_modified"]
          ])
        ])
      ])) : q("", !0),
      n("div", Ur, [
        n("div", {
          ref: (P) => b.value = P,
          class: "absolute -z-50"
        }, [
          qr,
          n("div", Wr, T(w.value), 1)
        ], 512)
      ]),
      n("div", {
        class: "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1 z-0",
        ref: (P) => y.value = P,
        onContextmenu: V[3] || (V[3] = he((P) => j(a).emit("vf-contextmenu-show", { event: P, area: y.value, items: H() }), ["self", "prevent"]))
      }, [
        f.view == "list" ? (p(!0), k(J, { key: 0 }, Z(A(), (P, U) => (p(), k("div", {
          draggable: "true",
          onDblclick: (O) => C(P),
          onContextmenu: he((O) => j(a).emit("vf-contextmenu-show", { event: O, area: y.value, items: H(), target: P }), ["prevent"]),
          onDragstart: (O) => I(O),
          onDragover: (O) => ie(O, P),
          onDrop: (O) => ue(O, P),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": U
        }, [
          n("div", Jr, [
            n("div", Zr, [
              P.type == "dir" ? (p(), k("svg", Xr, Qr)) : (p(), k("svg", eo, ro)),
              n("span", oo, T(P.basename), 1)
            ]),
            n("div", so, T(P.file_size ? j(Ar)(P.file_size) : ""), 1),
            n("div", no, T(j(Er)(P.last_modified)), 1)
          ])
        ], 40, Yr))), 256)) : q("", !0),
        f.view == "grid" ? (p(!0), k(J, { key: 1 }, Z(A(!1), (P, U) => (p(), k("div", {
          draggable: "true",
          onDblclick: (O) => C(P),
          onContextmenu: he((O) => j(a).emit("vf-contextmenu-show", { event: O, area: y.value, items: H(), target: P }), ["prevent"]),
          onDragstart: (O) => I(O),
          onDragover: (O) => ie(O, P),
          onDrop: (O) => ue(O, P),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": U
        }, [
          n("div", null, [
            n("div", ao, [
              P.type == "dir" ? (p(), k("svg", lo, uo)) : (p(), k("svg", mo, fo)),
              n("div", go, T(c(P.extension)), 1)
            ]),
            n("span", vo, T(s(P.basename)), 1)
          ])
        ], 40, io))), 256)) : q("", !0)
      ], 544)
    ]));
  }
}), bo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, _o = { class: "flex leading-5 items-center" }, wo = /* @__PURE__ */ n("div", {
  class: "mx-2",
  "aria-label": "Storage",
  "data-microtip-position": "top",
  role: "tooltip"
}, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  ])
], -1), So = ["value"], ko = { class: "ml-3" }, xo = { class: "flex leading-5 items-center" }, Do = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), $o = [
  Do
], Co = {
  name: "VFStatusbar"
}, Po = /* @__PURE__ */ Object.assign(Co, {
  props: {
    data: Object
  },
  setup(f) {
    var w;
    const m = f, a = inject("emitter"), { getStore: g, setStore: c } = inject("storage"), s = E(0), y = E((w = g("adapter")) != null ? w : m.data.adapter), b = () => {
      a.emit("vf-fetch", { q: "index", adapter: y.value }), c("adapter", y.value);
    };
    return a.on("vf-nodes-selected", (_) => {
      s.value = _.length;
    }), (_, C) => (p(), k("div", bo, [
      n("div", _o, [
        wo,
        te(n("select", {
          "onUpdate:modelValue": C[0] || (C[0] = (x) => y.value = x),
          onChange: b,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (p(!0), k(J, null, Z(f.data.storages, (x) => (p(), k("option", { value: x }, T(x), 9, So))), 256))
        ], 544), [
          [Xt, y.value]
        ]),
        n("span", ko, T(s.value > 0 ? s.value + " items selected." : ""), 1)
      ]),
      n("div", xo, [
        n("span", {
          onClick: C[1] || (C[1] = (x) => j(a).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, $o)
      ])
    ]));
  }
}), Mo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, jo = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Ao = [
  jo
], Eo = { class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" }, Vo = /* @__PURE__ */ n("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), To = [
  Vo
], Io = { class: "flex leading-5" }, Lo = /* @__PURE__ */ n("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Oo = ["title", "onClick"], No = {
  name: "VFBreadcrumb"
}, zo = /* @__PURE__ */ Object.assign(No, {
  props: {
    data: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = E(null), s = E([]);
    a.on("vf-explorer-update", (w) => {
      var x;
      let _ = [], C = [];
      c.value = (x = m.data.dirname) != null ? x : g("adapter", "local") + "://", c.value.length == 0 && (s.value = []), c.value.replace(g("adapter", "local") + "://", "").split("/").forEach(function(A) {
        _.push(A), _.join("/") != "" && C.push({
          basename: A,
          name: A,
          path: g("adapter", "local") + "://" + _.join("/"),
          type: "dir"
        });
      }), C.length > 4 && (C = C.slice(-5), C[0].name = ".."), s.value = C;
    });
    const y = (w) => {
      var C;
      w.preventDefault();
      let _ = JSON.parse(w.dataTransfer.getData("items"));
      if (_.find((x) => x.storage != g("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", {
        type: "move",
        items: { from: _, to: (C = s.value[s.value.length - 2]) != null ? C : { path: g("adapter", "local") + "://" } }
      });
    }, b = (w) => {
      w.preventDefault(), s.value.length < 1 ? (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : w.dataTransfer.dropEffect = "copy";
    };
    return (w, _) => (p(), k("div", Mo, [
      (p(), k("svg", {
        onDragover: _[0] || (_[0] = (C) => b(C)),
        onDrop: _[1] || (_[1] = (C) => y(C)),
        onClick: _[2] || (_[2] = (C) => {
          var x, A;
          return !s.value.length || j(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter, path: (A = (x = s.value[s.value.length - 2]) == null ? void 0 : x.path) != null ? A : j(g)("adapter", "local") + "://" });
        }),
        class: ne(["h-6 w-6 p-0.5 rounded", s.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, Ao, 34)),
      n("div", Eo, [
        (p(), k("svg", {
          onClick: _[3] || (_[3] = (C) => j(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, To)),
        n("div", Io, [
          (p(!0), k(J, null, Z(s.value, (C, x) => (p(), k("div", { key: x }, [
            Lo,
            n("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: C.basename,
              onClick: (A) => j(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter, path: C.path })
            }, T(C.name), 9, Oo)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Ko = ["onClick"], Bo = /* @__PURE__ */ n("span", { class: "px-1" }, null, -1), Ho = {
  name: "VFContextMenu"
}, Ro = /* @__PURE__ */ Object.assign(Ho, {
  props: {
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), g = E(null), c = fe({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), s = E([]);
    a.on("vf-context-selected", (_) => {
      s.value = _;
    });
    const y = {
      newfolder: {
        title: "New Folder",
        action: () => {
          a.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: "Delete",
        action: () => {
          a.emit("vf-modal-show", { type: "delete", items: s });
        }
      },
      refresh: {
        title: "Refresh",
        action: () => {
          a.emit("vf-fetch", { q: "index", adapter: m.current.adapter, path: m.current.dirname });
        }
      },
      preview: {
        title: "Preview",
        action: () => {
          a.emit("vf-modal-show", { type: "preview", adapter: m.current.adapter, item: s.value[0] });
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          a.emit("vf-modal-show", { type: "archive", items: s });
        }
      },
      unarchive: {
        title: "Unarchive",
        action: () => {
          a.emit("vf-modal-show", { type: "unarchive", items: s });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          a.emit("vf-modal-show", { type: "rename", items: s });
        }
      }
    }, b = (_) => {
      a.emit("vf-contextmenu-hide"), _.action();
    };
    a.on("vf-contextmenu-show", ({ event: _, area: C, items: x, target: A = null }) => {
      c.items = [], A ? x.length > 1 && x.some((F) => F.path === A.path) ? (c.items.push(y.refresh), c.items.push(y.archive), c.items.push(y.delete), a.emit("vf-context-selected", x), console.log(x.length + " selected (more than 1 item.)")) : (c.items.push(y.refresh), c.items.push(y.preview), c.items.push(y.rename), console.log(A), A.mime_type == "application/zip" ? c.items.push(y.unarchive) : c.items.push(y.archive), c.items.push(y.delete), a.emit("vf-context-selected", [A]), console.log(A.type + " is selected")) : (c.items.push(y.refresh), c.items.push(y.newfolder), a.emit("vf-context-selected", []), console.log("no files selected")), w(_, C);
    }), a.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const w = (_, C) => {
      c.active = !0, Xe(() => {
        let x = C.getBoundingClientRect(), A = _.pageX, F = _.pageY, H = g.value.offsetHeight, I = g.value.offsetWidth;
        A = x.right - _.pageX + window.scrollX < I ? A - I : A, F = x.bottom - _.pageY + window.scrollY < H ? F - H : F, c.positions = {
          left: A + "px",
          top: F + "px"
        };
      });
    };
    return (_, C) => c.active ? (p(), k("ul", {
      key: 0,
      class: "absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (x) => g.value = x,
      style: Gt(c.positions)
    }, [
      (p(!0), k(J, null, Z(c.items, (x) => (p(), k("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: x.title,
        onClick: (A) => b(x)
      }, [
        Bo,
        n("span", null, T(x.title), 1)
      ], 8, Ko))), 128))
    ], 4)) : q("", !0);
  }
}), Fo = {
  name: "VueFinder"
}, Uo = /* @__PURE__ */ Object.assign(Fo, {
  props: {
    url: {
      type: [String]
    },
    id: {
      type: String,
      default: "vf"
    },
    dark: {
      type: Boolean,
      default: !1
    }
  },
  setup(f) {
    const m = f, a = er();
    We("emitter", a);
    const { setStore: g, getStore: c } = Je(m.id);
    We("storage", Je(m.id));
    const s = fe({ adapter: "local", storages: [], dirname: ".", files: [] }), y = E(c("viewport", "grid")), b = E(c("darkMode", m.dark));
    a.on("vf-darkMode-toggle", () => {
      b.value = !b.value, g("darkMode", b.value);
    }), a.on("vf-view-toggle", (C) => {
      y.value = C;
    });
    const w = fe({
      active: !1,
      type: "delete",
      data: {}
    });
    a.on("vf-modal-close", () => {
      w.active = !1;
    }), a.on("vf-modal-show", (C) => {
      w.active = !0, w.type = C.type, C.url = m.url, w.data = C;
    });
    const _ = (C) => {
      Object.assign(s, C), a.emit("vf-nodes-selected", {}), a.emit("vf-explorer-update", C);
    };
    return a.on("vf-fetch", (C) => {
      Ge(m.url, { params: C }).then((x) => {
        a.emit("vf-modal-close"), _(x);
      });
    }), Y(() => {
      a.emit("vf-fetch", { q: "index", adapter: c("adapter", s.adapter) });
    }), (C, x) => (p(), k("div", {
      class: ne(b.value ? "dark" : "")
    }, [
      n("div", {
        class: "relative border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none",
        onMousedown: x[0] || (x[0] = (A) => j(a).emit("vf-contextmenu-hide"))
      }, [
        ee(Pr),
        ee(zo, { data: s }, null, 8, ["data"]),
        ee(yo, {
          view: y.value,
          data: s
        }, null, 8, ["view", "data"]),
        ee(Po, { data: s }, null, 8, ["data"])
      ], 32),
      w.active ? (p(), K(Qt("v-f-modal-" + w.type), {
        key: 0,
        selection: w.data,
        current: s
      }, null, 8, ["selection", "current"])) : q("", !0),
      ee(Ro, { current: s }, null, 8, ["current"])
    ], 2));
  }
}), qo = /* @__PURE__ */ n("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Wo = { class: "fixed z-10 inset-0 overflow-y-auto" }, Yo = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full" }, Jo = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Zo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, W = {
  __name: "ModalLayout",
  setup(f) {
    const m = inject("emitter");
    return Y(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus();
    }), (a, g) => (p(), k("div", {
      class: "v-f-modal relative z-20",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: g[1] || (g[1] = ce((c) => j(m).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      qo,
      n("div", Wo, [
        n("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onClick: g[0] || (g[0] = he((c) => j(m).emit("vf-modal-close"), ["self"]))
        }, [
          n("div", Yo, [
            n("div", Jo, [
              Ye(a.$slots, "default")
            ]),
            n("div", Zo, [
              Ye(a.$slots, "buttons")
            ])
          ])
        ])
      ])
    ], 32));
  }
}, Xo = { class: "sm:flex sm:items-start" }, Go = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Qo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, es = /* @__PURE__ */ n("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), ts = { class: "mt-2" }, rs = /* @__PURE__ */ n("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), os = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ss = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ns = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), is = [
  ns
], as = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ls = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), cs = [
  ls
], us = { class: "ml-1.5" }, ds = /* @__PURE__ */ n("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), ms = {
  name: "VFModalDelete"
}, hs = /* @__PURE__ */ Object.assign(ms, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = E(m.selection.items), s = () => {
      c.value.length && a.emit("vf-fetch", {
        q: "delete",
        adapter: g("adapter", "local"),
        path: m.current.dirname,
        items: JSON.stringify(c.value.map(({ path: y, type: b }) => ({ path: y, type: b })))
      });
    };
    return (y, b) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: s,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        n("button", {
          type: "button",
          onClick: b[0] || (b[0] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        ds
      ]),
      default: z(() => [
        n("div", Xo, [
          Go,
          n("div", Qo, [
            es,
            n("div", ts, [
              rs,
              (p(!0), k(J, null, Z(c.value, (w) => (p(), k("p", os, [
                w.type == "dir" ? (p(), k("svg", ss, is)) : (p(), k("svg", as, cs)),
                n("span", us, T(w.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fs = { class: "sm:flex sm:items-start" }, gs = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), vs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ps = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ys = { class: "mt-2" }, bs = { class: "text-sm text-gray-500" }, _s = {
  name: "VFModalMessage"
}, ws = /* @__PURE__ */ Object.assign(_s, {
  props: {
    selection: Object
  },
  setup(f) {
    const m = inject("emitter");
    return (a, g) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: g[0] || (g[0] = (c) => j(m).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: z(() => {
        var c, s, y, b;
        return [
          n("div", fs, [
            gs,
            n("div", vs, [
              n("h3", ps, T((s = (c = f.selection) == null ? void 0 : c.title) != null ? s : "Title"), 1),
              n("div", ys, [
                n("p", bs, T((b = (y = f.selection) == null ? void 0 : y.message) != null ? b : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Ss = { class: "sm:flex sm:items-start" }, ks = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), xs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ds = /* @__PURE__ */ n("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), $s = { class: "mt-2" }, Cs = /* @__PURE__ */ n("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), Ps = ["onKeyup"], Ms = {
  name: "VFModalNewFolder"
}, js = /* @__PURE__ */ Object.assign(Ms, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = E(""), s = () => {
      c.value != "" && a.emit("vf-fetch", {
        q: "newfolder",
        adapter: g("adapter", "local"),
        path: m.current.dirname,
        name: c.value
      });
    };
    return (y, b) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: s,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        n("button", {
          type: "button",
          onClick: b[1] || (b[1] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        n("div", Ss, [
          ks,
          n("div", xs, [
            Ds,
            n("div", $s, [
              Cs,
              te(n("input", {
                "onUpdate:modelValue": b[0] || (b[0] = (w) => c.value = w),
                onKeyup: ce(s, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, Ps), [
                [ge, c.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), As = { class: "sm:flex sm:items-start" }, Es = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Vs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ts = /* @__PURE__ */ n("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), Is = { class: "mt-2" }, Ls = /* @__PURE__ */ n("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), Os = ["onKeyup"], Ns = {
  name: "VFModalNewFile"
}, zs = /* @__PURE__ */ Object.assign(Ns, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = E(""), s = () => {
      c.value != "" && a.emit("vf-fetch", {
        q: "newfile",
        adapter: g("adapter", "local"),
        path: m.current.dirname,
        name: c.value
      });
    };
    return (y, b) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: s,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        n("button", {
          type: "button",
          onClick: b[1] || (b[1] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        n("div", As, [
          Es,
          n("div", Vs, [
            Ts,
            n("div", Is, [
              Ls,
              te(n("input", {
                "onUpdate:modelValue": b[0] || (b[0] = (w) => c.value = w),
                onKeyup: ce(s, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, Os), [
                [ge, c.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ks = { class: "border font-normal border-gray-200 dark:border-gray-700/50 p-2 rounded min-h-[100px] text-sm" }, Bs = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: m }) {
    const a = f, g = E("");
    return Y(() => {
      Ge(a.selection.url, {
        params: { q: "preview", adapter: a.selection.adapter, path: a.selection.item.path },
        json: !1
      }).then((c) => c.text()).then((c) => {
        g.value = c, m("load");
      });
    }), (c, s) => (p(), k("div", null, [
      n("pre", Ks, T(g.value), 1)
    ]));
  }
}, ve = (f) => Object.entries(f).map((m) => m.map(encodeURIComponent).join("=")).join("&"), Hs = ["src"], Rs = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: m }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return onMounted(() => {
      m("load");
    }), (c, s) => (p(), k("img", {
      class: "max-w-[350px] max-h-[350px]",
      src: g(),
      alt: ""
    }, null, 8, Hs));
  }
}, Fs = {
  __name: "Default",
  emits: ["load"],
  setup(f, { emit: m }) {
    return Y(() => {
      m("load");
    }), (a, g) => (p(), k("div", null, " Default view.. "));
  }
}, Us = {
  class: "w-full",
  preload: "",
  controls: ""
}, qs = ["src"], Ws = /* @__PURE__ */ le(" Your browser does not support the video tag. "), Ys = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: m }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      m("load");
    }), (c, s) => (p(), k("div", null, [
      n("video", Us, [
        n("source", {
          src: g(),
          type: "video/mp4"
        }, null, 8, qs),
        Ws
      ])
    ]));
  }
}, Js = {
  class: "w-full",
  controls: ""
}, Zs = ["src"], Xs = /* @__PURE__ */ le(" Your browser does not support the audio element. "), Gs = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: m }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      m("load");
    }), (c, s) => (p(), k("div", null, [
      n("audio", Js, [
        n("source", {
          src: g(),
          type: "audio/mpeg"
        }, null, 8, Zs),
        Xs
      ])
    ]));
  }
}, Qs = ["data"], en = ["src"], tn = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: m }) {
    const a = f, g = () => a.selection.url + "?" + ve({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      m("load");
    }), (c, s) => (p(), k("div", null, [
      n("object", {
        data: g(),
        type: "application/pdf",
        width: "100%",
        height: "100%"
      }, [
        n("iframe", {
          class: "border-0",
          src: g(),
          width: "100%",
          height: "100%"
        }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, en)
      ], 8, Qs)
    ]));
  }
}, rn = { class: "sm:flex sm:items-start" }, on = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), sn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, nn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, an = { class: "mt-2" }, ln = { class: "text-gray-700 dark:text-gray-200 text-sm" }, cn = {
  key: 0,
  class: "flex leading-5"
}, un = /* @__PURE__ */ n("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ n("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ n("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), dn = /* @__PURE__ */ n("span", null, "Loading", -1), mn = [
  un,
  dn
], hn = {
  name: "VFModalPreview"
}, fn = /* @__PURE__ */ Object.assign(hn, {
  props: {
    selection: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), g = E(!1), c = (s) => {
      var y;
      return ((y = m.selection.item.mime_type) != null ? y : "").startsWith(s);
    };
    return (s, y) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: y[6] || (y[6] = (b) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: z(() => [
        n("div", rn, [
          on,
          n("div", sn, [
            n("h3", nn, T(f.selection.item.basename), 1),
            n("div", an, [
              c("text") ? (p(), K(Bs, {
                key: 0,
                selection: f.selection,
                onLoad: y[0] || (y[0] = (b) => g.value = !0)
              }, null, 8, ["selection"])) : c("image") ? (p(), K(Rs, {
                key: 1,
                selection: f.selection,
                onLoad: y[1] || (y[1] = (b) => g.value = !0)
              }, null, 8, ["selection"])) : c("video") ? (p(), K(Ys, {
                key: 2,
                selection: f.selection,
                onLoad: y[2] || (y[2] = (b) => g.value = !0)
              }, null, 8, ["selection"])) : c("audio") ? (p(), K(Gs, {
                key: 3,
                selection: f.selection,
                onLoad: y[3] || (y[3] = (b) => g.value = !0)
              }, null, 8, ["selection"])) : c("application/pdf") ? (p(), K(tn, {
                key: 4,
                selection: f.selection,
                onLoad: y[4] || (y[4] = (b) => g.value = !0)
              }, null, 8, ["selection"])) : (p(), K(Fs, {
                key: 5,
                selection: f.selection,
                onLoad: y[5] || (y[5] = (b) => g.value = !0)
              }, null, 8, ["selection"]))
            ]),
            n("div", ln, [
              n("p", null, T(f.selection.item.path), 1),
              n("p", null, "mime_type: " + T(f.selection.item.mime_type), 1),
              g.value == !1 ? (p(), k("div", cn, mn)) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), gn = { class: "sm:flex sm:items-start" }, vn = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), pn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, yn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bn = { class: "mt-2" }, _n = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, wn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sn = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), kn = [
  Sn
], xn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dn = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), $n = [
  Dn
], Cn = { class: "ml-1.5" }, Pn = ["onKeyup"], Mn = {
  name: "VFModalRename"
}, jn = /* @__PURE__ */ Object.assign(Mn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = E(m.selection.items[0]), s = E(m.selection.items[0].basename), y = () => {
      s.value != "" && a.emit("vf-fetch", {
        q: "rename",
        adapter: g("adapter", "local"),
        path: m.current.dirname,
        item: c.value.path,
        name: s.value
      });
    };
    return (b, w) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: y,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        n("button", {
          type: "button",
          onClick: w[1] || (w[1] = (_) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        n("div", gn, [
          vn,
          n("div", pn, [
            n("h3", yn, "Rename your " + T(c.value.type == "dir" ? "folder" : "file"), 1),
            n("div", bn, [
              n("p", _n, [
                c.value.type == "dir" ? (p(), k("svg", wn, kn)) : (p(), k("svg", xn, $n)),
                n("span", Cn, T(c.value.basename), 1)
              ]),
              te(n("input", {
                "onUpdate:modelValue": w[0] || (w[0] = (_) => s.value = _),
                onKeyup: ce(y, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Pn), [
                [ge, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), An = /* @__PURE__ */ n("div", { class: "sm:flex sm:items-start" }, [
  /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
    /* @__PURE__ */ n("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "none",
      "stroke-width": "1.5"
    }, [
      /* @__PURE__ */ n("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      })
    ])
  ]),
  /* @__PURE__ */ n("div", { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, [
    /* @__PURE__ */ n("h3", {
      class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
      id: "modal-title"
    }, "Upload files"),
    /* @__PURE__ */ n("div", { class: "mt-2" }, [
      /* @__PURE__ */ n("p", { class: "text-sm text-gray-500" }, "Upload files ")
    ])
  ])
], -1), En = /* @__PURE__ */ n("button", {
  type: "button",
  class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
}, "Yes, upload!", -1), Vn = {
  name: "VFModalUpload"
}, Tn = /* @__PURE__ */ Object.assign(Vn, {
  setup(f) {
    const m = inject("emitter");
    return (a, g) => (p(), K(W, null, {
      buttons: z(() => [
        En,
        n("button", {
          type: "button",
          onClick: g[0] || (g[0] = (c) => j(m).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        An
      ]),
      _: 1
    }));
  }
}), In = { class: "sm:flex sm:items-start" }, Ln = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    })
  ])
], -1), On = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nn = /* @__PURE__ */ n("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), zn = { class: "mt-2" }, Kn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Bn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hn = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Rn = [
  Hn
], Fn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Un = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), qn = [
  Un
], Wn = { class: "ml-1.5" }, Yn = /* @__PURE__ */ n("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), Jn = ["onKeyup"], Zn = {
  name: "VFModalArchive"
}, Xn = /* @__PURE__ */ Object.assign(Zn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = E(""), s = E(m.selection.items), y = () => {
      s.value.length && a.emit("vf-fetch", {
        q: "archive",
        adapter: g("adapter", "local"),
        path: m.current.dirname,
        items: JSON.stringify(s.value.map(({ path: b, type: w }) => ({ path: b, type: w }))),
        name: c.value
      });
    };
    return (b, w) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: y,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        n("button", {
          type: "button",
          onClick: w[1] || (w[1] = (_) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        n("div", In, [
          Ln,
          n("div", On, [
            Nn,
            n("div", zn, [
              (p(!0), k(J, null, Z(s.value, (_) => (p(), k("p", Kn, [
                _.type == "dir" ? (p(), k("svg", Bn, Rn)) : (p(), k("svg", Fn, qn)),
                n("span", Wn, T(_.basename), 1)
              ]))), 256)),
              Yn,
              te(n("input", {
                "onUpdate:modelValue": w[0] || (w[0] = (_) => c.value = _),
                onKeyup: ce(y, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Jn), [
                [ge, c.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Gn = { class: "sm:flex sm:items-start" }, Qn = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    })
  ])
], -1), ei = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ti = /* @__PURE__ */ n("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), ri = { class: "mt-2" }, oi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, si = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ni = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ii = [
  ni
], ai = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, li = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ci = [
  li
], ui = { class: "ml-1.5" }, di = { class: "my-1 text-sm text-gray-500" }, mi = {
  name: "VFModalUnarchive"
}, hi = /* @__PURE__ */ Object.assign(mi, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage");
    E("");
    const c = E(m.selection.items[0]), s = E([]), y = () => {
      a.emit("vf-fetch", {
        q: "unarchive",
        adapter: g("adapter", "local"),
        path: m.current.dirname,
        item: c.value.path
      });
    };
    return (b, w) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: y,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        n("button", {
          type: "button",
          onClick: w[0] || (w[0] = (_) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        n("div", Gn, [
          Qn,
          n("div", ei, [
            ti,
            n("div", ri, [
              (p(!0), k(J, null, Z(s.value, (_) => (p(), k("p", oi, [
                _.type == "dir" ? (p(), k("svg", si, ii)) : (p(), k("svg", ai, ci)),
                n("span", ui, T(_.basename), 1)
              ]))), 256)),
              n("p", di, "Archive will be unarchived at (" + T(f.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fi = { class: "sm:flex sm:items-start" }, gi = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), vi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, pi = /* @__PURE__ */ n("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), yi = { class: "mt-2" }, bi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, _i = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wi = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Si = [
  wi
], ki = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xi = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Di = [
  xi
], $i = { class: "ml-1.5" }, Ci = /* @__PURE__ */ n("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), Pi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Mi = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), ji = { class: "ml-1.5 overflow-auto" }, Ai = {
  name: "VFModalMove"
}, Ei = /* @__PURE__ */ Object.assign(Ai, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const m = f, a = inject("emitter"), { getStore: g } = inject("storage"), c = E(m.selection.items.from), s = () => {
      c.value.length && a.emit("vf-fetch", {
        q: "move",
        adapter: g("adapter", "local"),
        path: m.current.dirname,
        items: JSON.stringify(c.value.map(({ path: y, type: b }) => ({ path: y, type: b }))),
        item: m.selection.items.to.path
      });
    };
    return (y, b) => (p(), K(W, null, {
      buttons: z(() => [
        n("button", {
          type: "button",
          onClick: s,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        n("button", {
          type: "button",
          onClick: b[0] || (b[0] = (w) => j(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: z(() => [
        n("div", fi, [
          gi,
          n("div", vi, [
            pi,
            n("div", yi, [
              (p(!0), k(J, null, Z(c.value, (w) => (p(), k("p", bi, [
                w.type == "dir" ? (p(), k("svg", _i, Si)) : (p(), k("svg", ki, Di)),
                n("span", $i, T(w.path), 1)
              ]))), 256)),
              Ci,
              n("p", Pi, [
                Mi,
                n("span", ji, T(f.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: hs,
  ModalMessage: ws,
  ModalNewFolder: js,
  ModalNewFile: zs,
  ModalPreview: fn,
  ModalRename: jn,
  ModalUpload: Tn,
  ModalArchive: Xn,
  ModalUnarchive: hi,
  ModalMove: Ei
}, Symbol.toStringTag, { value: "Module" })), ke = {
  VueFinder: Uo,
  ...Vi
};
const Ii = {
  install(f) {
    for (const m in ke)
      if (ke.hasOwnProperty(m)) {
        const a = ke[m];
        f.component(a.name, a);
      }
  }
};
export {
  Ii as default
};
