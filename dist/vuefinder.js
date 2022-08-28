import { ref as E, watch as et, openBlock as y, createElementBlock as x, createElementVNode as s, unref as A, normalizeClass as ae, createCommentVNode as W, createStaticVNode as Gt, reactive as pe, onMounted as Z, withDirectives as J, createVNode as te, vShow as Se, toDisplayString as T, withModifiers as ve, Fragment as R, renderList as X, createTextVNode as de, nextTick as $e, vModelSelect as Qt, normalizeStyle as er, provide as Ze, createBlock as H, resolveDynamicComponent as tr, withKeys as me, renderSlot as Xe, withCtx as K, vModelText as he } from "vue";
const De = (h, { method: m = "get", params: a = {}, json: p = !0 }) => {
  const u = { method: m };
  if (m == "get")
    h += "?" + new URLSearchParams(a);
  else {
    u.headers = {};
    let n = new FormData();
    for (const [S, g] of Object.entries(a))
      n.append(S, g);
    u.body = n;
  }
  return fetch(h, u).then((n) => n.ok ? p ? n.json() : n.text() : Promise.reject(n));
};
function rr(h) {
  return { all: h = h || /* @__PURE__ */ new Map(), on: function(m, a) {
    var p = h.get(m);
    p ? p.push(a) : h.set(m, [a]);
  }, off: function(m, a) {
    var p = h.get(m);
    p && (a ? p.splice(p.indexOf(a) >>> 0, 1) : h.set(m, []));
  }, emit: function(m, a) {
    var p = h.get(m);
    p && p.slice().map(function(u) {
      u(a);
    }), (p = h.get("*")) && p.slice().map(function(u) {
      u(m, a);
    });
  } };
}
function Ge(h) {
  let m = localStorage.getItem(h + "_storage");
  const a = E(JSON.parse(m));
  et(a, p);
  function p() {
    a.value === null || a.value === "" ? localStorage.removeItem(h + "_storage") : localStorage.setItem(h + "_storage", JSON.stringify(a.value));
  }
  function u(g, v) {
    a.value = Object.assign({ ...a.value }, { [g]: v });
  }
  function n() {
    a.value = null;
  }
  return { getStore: (g, v = null) => a.value === null || a.value === "" ? v : a.value.hasOwnProperty(g) ? a.value[g] : v, setStore: u, clearStore: n };
}
const Qe = E("");
function re() {
  function h(m) {
    Qe.value = m;
  }
  return { apiUrl: Qe, setApiUrl: h };
}
const or = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, nr = { class: "flex text-center" }, sr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
  })
], -1), ir = [
  sr
], ar = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })
], -1), lr = [
  ar
], cr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
}, null, -1), ur = [
  cr
], dr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
}, null, -1), mr = [
  dr
], hr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
  })
], -1), fr = [
  hr
], gr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
}, null, -1), vr = [
  gr
], pr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
}, null, -1), yr = [
  pr
], br = { class: "flex text-center items-center justify-end" }, _r = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, wr = /* @__PURE__ */ Gt('<g class="dark:opacity-0"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path><path d="M12 4v.01M17.66 6.345l-.007.007M20.005 12.005h-.01M17.66 17.665l-.007-.007M12 20.01V20M6.34 17.665l.007-.007M3.995 12.005h.01M6.34 6.344l.007.007" fill="none"></path></g><g class="opacity-0 dark:opacity-100"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path><path d="M12 3v1M18.66 5.345l-.828.828M21.005 12.005h-1M18.66 18.665l-.828-.828M12 21.01V20M5.34 18.666l.835-.836M2.995 12.005h1.01M5.34 5.344l.835.836" fill="none"></path></g>', 2), Sr = [
  wr
], xr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, kr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
}, null, -1), Dr = [
  kr
], $r = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Cr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6h16M4 10h16M4 14h16M4 18h16"
}, null, -1), Pr = [
  Cr
], Mr = {
  name: "VFToolbar"
}, jr = /* @__PURE__ */ Object.assign(Mr, {
  setup(h) {
    const m = inject("emitter"), { getStore: a, setStore: p } = inject("storage"), u = E(a("viewport", "grid")), n = E([]);
    return m.on("vf-nodes-selected", (S) => {
      n.value = S;
    }), m.on("vf-view-toggle", (S) => {
      p("viewport", S), u.value = S;
    }), (S, g) => (y(), x("div", or, [
      s("div", nr, [
        s("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[0] || (g[0] = (v) => A(m).emit("vf-modal-show", { type: "new-folder", items: n.value }))
        }, ir),
        s("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[1] || (g[1] = (v) => A(m).emit("vf-modal-show", { type: "new-file", items: n.value }))
        }, lr),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[2] || (g[2] = (v) => n.value.length != 1 || A(m).emit("vf-modal-show", { type: "rename", items: n.value }))
        }, [
          (y(), x("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ae([n.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ur, 2))
        ]),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[3] || (g[3] = (v) => !n.value.length || A(m).emit("vf-modal-show", { type: "delete", items: n.value }))
        }, [
          (y(), x("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ae([n.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, mr, 2))
        ]),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[4] || (g[4] = (v) => A(m).emit("vf-modal-show", { type: "upload", items: n.value }))
        }, fr),
        n.value.length == 1 && n.value[0].mime_type == "application/zip" ? (y(), x("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[5] || (g[5] = (v) => !n.value.length || A(m).emit("vf-modal-show", { type: "unarchive", items: n.value }))
        }, [
          (y(), x("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ae([n.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, vr, 2))
        ])) : (y(), x("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[6] || (g[6] = (v) => !n.value.length || A(m).emit("vf-modal-show", { type: "archive", items: n.value }))
        }, [
          (y(), x("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ae([n.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, yr, 2))
        ]))
      ]),
      s("div", br, [
        s("div", _r, [
          (y(), x("svg", {
            onClick: g[7] || (g[7] = (v) => A(m).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, Sr))
        ]),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: g[8] || (g[8] = (v) => A(m).emit("vf-view-toggle", u.value == "list" ? "grid" : "list"))
        }, [
          u.value == "grid" ? (y(), x("svg", xr, Dr)) : W("", !0),
          u.value == "list" ? (y(), x("svg", $r, Pr)) : W("", !0)
        ])
      ])
    ]));
  }
});
var Ar = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, tt = { exports: {} };
(function(h, m) {
  (function(a, p) {
    h.exports = p();
  })(Ar, function() {
    function a(o, t) {
      if (!(o instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function p(o, t) {
      for (var e = 0; e < t.length; e++) {
        var i = t[e];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(o, i.key, i);
      }
    }
    function u(o, t, e) {
      return t && p(o.prototype, t), e && p(o, e), o;
    }
    function n(o, t, e) {
      return t in o ? Object.defineProperty(o, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : o[t] = e, o;
    }
    function S(o, t) {
      var e = Object.keys(o);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(o);
        t && (i = i.filter(function(r) {
          return Object.getOwnPropertyDescriptor(o, r).enumerable;
        })), e.push.apply(e, i);
      }
      return e;
    }
    function g(o) {
      for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2 ? S(Object(e), !0).forEach(function(i) {
          n(o, i, e[i]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : S(Object(e)).forEach(function(i) {
          Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(e, i));
        });
      }
      return o;
    }
    function v(o, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function");
      o.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: o,
          writable: !0,
          configurable: !0
        }
      }), t && k(o, t);
    }
    function _(o) {
      return _ = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, _(o);
    }
    function k(o, t) {
      return k = Object.setPrototypeOf || function(i, r) {
        return i.__proto__ = r, i;
      }, k(o, t);
    }
    function C() {
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
    function P(o, t, e) {
      return C() ? P = Reflect.construct : P = function(r, l, c) {
        var d = [null];
        d.push.apply(d, l);
        var f = Function.bind.apply(r, d), w = new f();
        return c && k(w, c.prototype), w;
      }, P.apply(null, arguments);
    }
    function I(o) {
      return Function.toString.call(o).indexOf("[native code]") !== -1;
    }
    function B(o) {
      var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return B = function(i) {
        if (i === null || !I(i))
          return i;
        if (typeof i != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof t < "u") {
          if (t.has(i))
            return t.get(i);
          t.set(i, r);
        }
        function r() {
          return P(i, arguments, _(this).constructor);
        }
        return r.prototype = Object.create(i.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), k(r, i);
      }, B(o);
    }
    function O(o) {
      if (o === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return o;
    }
    function oe(o, t) {
      return t && (typeof t == "object" || typeof t == "function") ? t : O(o);
    }
    function ce(o) {
      var t = C();
      return function() {
        var i = _(o), r;
        if (t) {
          var l = _(this).constructor;
          r = Reflect.construct(i, arguments, l);
        } else
          r = i.apply(this, arguments);
        return oe(this, r);
      };
    }
    function Ce(o, t) {
      for (; !Object.prototype.hasOwnProperty.call(o, t) && (o = _(o), o !== null); )
        ;
      return o;
    }
    function $(o, t, e) {
      return typeof Reflect < "u" && Reflect.get ? $ = Reflect.get : $ = function(r, l, c) {
        var d = Ce(r, l);
        if (!!d) {
          var f = Object.getOwnPropertyDescriptor(d, l);
          return f.get ? f.get.call(c) : f.value;
        }
      }, $(o, t, e || o);
    }
    function V(o, t) {
      return N(o) || Q(o, t) || Pe(o, t) || ot();
    }
    function M(o) {
      return q(o) || G(o) || Pe(o) || rt();
    }
    function q(o) {
      if (Array.isArray(o))
        return ye(o);
    }
    function N(o) {
      if (Array.isArray(o))
        return o;
    }
    function G(o) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(o))
        return Array.from(o);
    }
    function Q(o, t) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(o)))) {
        var e = [], i = !0, r = !1, l = void 0;
        try {
          for (var c = o[Symbol.iterator](), d; !(i = (d = c.next()).done) && (e.push(d.value), !(t && e.length === t)); i = !0)
            ;
        } catch (f) {
          r = !0, l = f;
        } finally {
          try {
            !i && c.return != null && c.return();
          } finally {
            if (r)
              throw l;
          }
        }
        return e;
      }
    }
    function Pe(o, t) {
      if (!!o) {
        if (typeof o == "string")
          return ye(o, t);
        var e = Object.prototype.toString.call(o).slice(8, -1);
        if (e === "Object" && o.constructor && (e = o.constructor.name), e === "Map" || e === "Set")
          return Array.from(o);
        if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
          return ye(o, t);
      }
    }
    function ye(o, t) {
      (t == null || t > o.length) && (t = o.length);
      for (var e = 0, i = new Array(t); e < t; e++)
        i[e] = o[e];
      return i;
    }
    function rt() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function ot() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var U = function(t, e, i) {
      var r = t.x, l = t.y, c = i.x, d = i.y, f = {
        "+": {
          x: r + c,
          y: l + d
        },
        "-": {
          x: r - c,
          y: l - d
        },
        "*": {
          x: r * c,
          y: l * d
        },
        "/": {
          x: r / c,
          y: l / d
        }
      };
      return f[e];
    }, ne = function(t) {
      return {
        x: t.left,
        y: t.top
      };
    }, Me = function(t) {
      var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: t.x,
        top: t.y,
        right: t.x,
        bottom: t.y,
        width: e,
        height: e
      };
    }, nt = function(t) {
      return {
        x: t,
        y: t
      };
    }, st = function(o, t, e) {
      window.addEventListener("resize", t), window.addEventListener("scroll", t), o.forEach(function(i, r) {
        e.observe(i, {
          childList: r !== 0,
          attributes: !0
        });
      });
    }, it = function(o) {
      var t = fe(o);
      return t.x || t.y ? !0 : o instanceof HTMLDocument ? o.body ? !!(o.body.scrollTop = 1) : !!(o.documentElement.scrollTop = 1) : !!(o.scrollTop = 1);
    }, at = function(o) {
      var t = document.createElement("div");
      return t.style.position = "fixed", t.style.overflow = "hidden", t.style.pointerEvents = "none", t.style.zIndex = "999999999999999999", t.classList.add(o), t;
    }, lt = function(o) {
      var t = document.createElement("div");
      return t.style.position = "absolute", o || (t.style.background = "rgba(0, 0, 255, 0.1)", t.style.border = "1px solid rgba(0, 0, 255, 0.45)", t.style.display = "none", t.style.pointerEvents = "none"), t;
    }, ct = function(o, t) {
      var e;
      return function() {
        for (var i = arguments.length, r = new Array(i), l = 0; l < i; l++)
          r[l] = arguments[l];
        var c = function() {
          e = null, o.apply(void 0, r);
        };
        clearTimeout(e), e = setTimeout(c, t);
      };
    }, be = function() {
      var o, t, e, i;
      return {
        y: ((o = document.body) === null || o === void 0 ? void 0 : o.scrollTop) || ((t = document.documentElement) === null || t === void 0 ? void 0 : t.scrollTop) || 0,
        x: ((e = document.body) === null || e === void 0 ? void 0 : e.scrollLeft) || ((i = document.documentElement) === null || i === void 0 ? void 0 : i.scrollLeft) || 0
      };
    }, ut = function(o, t) {
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
    }, fe = function(o) {
      return !o || o instanceof Document ? be() : {
        x: o.scrollLeft >= 0 ? o.scrollLeft : be().x,
        y: o.scrollTop >= 0 ? o.scrollTop : be().y
      };
    }, je = function(o) {
      var t = o.elementRect, e = o.containerRect, i = o.tolerance, r = i === void 0 ? {
        x: 0,
        y: 0
      } : i, l = [];
      return t.top - r.y < e.top && l.push("top"), t.left - r.x < e.left && l.push("left"), t.bottom + r.y > e.bottom && l.push("bottom"), t.right + r.y > e.right && l.push("right"), l;
    }, dt = function(o) {
      var t = o.event;
      return {
        x: t.clientX,
        y: t.clientY
      };
    }, mt = function(o) {
      var t = o.scrollAmount, e = o.initialPointerPos, i = o.pointerPos, r = {};
      return i.x > e.x - t.x ? (r.left = e.x - t.x, r.width = i.x - e.x + t.x) : (r.left = i.x, r.width = e.x - i.x - t.x), i.y > e.y - t.y ? (r.top = e.y - t.y, r.height = i.y - e.y + t.y) : (r.top = i.y, r.height = e.y - i.y - t.y), r;
    }, Ae = function(t) {
      var e = {
        x: 0,
        y: 0
      }, i = window.getComputedStyle(t);
      if (!i.transform || i.transform === "none")
        return e;
      if (i.transform.indexOf("3d") >= 0) {
        var r = i.transform.trim().match(/matrix3d\((.*?)\)/);
        if (r && r.length) {
          var l, c = (l = r[1]) === null || l === void 0 ? void 0 : l.split(",");
          e.x = parseInt(c[12]) || 0, e.y = parseInt(c[13]) || 0;
        }
        return e;
      } else {
        var d = i.transform.trim().match(/matrix\((.*?)\)/);
        if (d && d.length) {
          var f, w = (f = d[1]) === null || f === void 0 ? void 0 : f.split(",");
          e.x = parseInt(w[4]) || 0, e.y = parseInt(w[5]) || 0;
        }
        return e;
      }
    }, ht = function(t) {
      var e = t.style.transform;
      if (!e || e.indexOf("translate") < 0)
        return Ae(t);
      var i = {
        x: 0,
        y: 0
      }, r = e.trim().match(/translate[3dD]*?\(.*?\)/);
      if (r) {
        var l, c = (l = r[0]) === null || l === void 0 ? void 0 : l.split("(");
        if (c) {
          var d, f = (d = c[1]) === null || d === void 0 ? void 0 : d.split(",");
          i.x = parseInt(f[0]) || 0, i.y = parseInt(f[1]) || 0;
        }
      }
      return !i.x && !i.x ? Ae(t) : i;
    }, ft = function(t) {
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
    }, gt = function(o, t) {
      return t ? ht(o) : ft(o);
    }, vt = function(o) {
      var t = o.element, e = o.edges, i = o.elementRect, r = o.containerRect, l = o.elementPos, c = o.useTransform;
      e.includes("top") && ue(t, {
        y: l.y + r.top - i.top,
        x: l.x
      }, c), e.includes("left") && ue(t, {
        y: l.y,
        x: l.x + r.left - i.left
      }, c), e.includes("bottom") && ue(t, {
        y: l.y + r.bottom - i.bottom,
        x: l.x
      }, c), e.includes("right") && ue(t, {
        y: l.y,
        x: l.x + r.right - i.right
      }, c);
    }, Ee = function(o) {
      var t = o.computedStyle, e = o.node, i = t.position, r = i === "absolute" || i === "relative" || i === "fixed";
      !(e instanceof HTMLDocument) && !r && (e.style.position = "relative");
    }, pt = function(o) {
      var t = o.shiftKey, e = o.keyboardDragSpeed, i = o.zoom, r = o.key, l = o.dragKeys, c = o.scrollDiff, d = o.canScroll, f = o.scrollCallback, w = {
        x: 0,
        y: 0
      }, b = t ? e * 4 * i : e * i;
      return l.left.includes(r) && (w.x = c.x || -b, !t && !c.x && d && f(["left"], e)), l.right.includes(r) && (w.x = c.x || b, !t && !c.x && d && f(["right"], e)), l.up.includes(r) && (w.y = c.y || -b, !t && !c.y && d && f(["top"], e)), l.down.includes(r) && (w.y = c.y || b, !t && !c.y && d && f(["bottom"], e)), w;
    }, yt = function(o) {
      var t = o.element, e = o.force, i = o.multiSelectionToggle, r = o.SelectedSet, l = o.hoverClassName;
      t.classList.contains(l) && !e || (r.has(t) ? i && r.delete(t) : r.add(t), t.classList.add(l));
    }, bt = function(o) {
      var t = o.element, e = o.force, i = o.SelectedSet, r = o.PrevSelectedSet, l = o.hoverClassName;
      if (!t.classList.contains(l) && !e)
        return !1;
      var c = i.has(t), d = r.has(t);
      c && !d ? i.delete(t) : !c && d && i.add(t), t.classList.remove(l);
    }, _e = function(o, t) {
      return o.left < t.right && o.right > t.left && o.top < t.bottom && o.bottom > t.top;
    }, Te = function(o) {
      var t = o.element, e = o.posDirection, i = o.containerRect, r = o.useTransform, l = gt(t, r), c = U(l, "+", e);
      ue(t, c, r);
      var d = t.getBoundingClientRect(), f = je({
        elementRect: d,
        containerRect: i
      });
      vt({
        element: t,
        edges: f,
        elementRect: d,
        containerRect: i,
        elementPos: c,
        useTransform: r
      });
    }, _t = function(o, t) {
      window.removeEventListener("resize", t), window.removeEventListener("scroll", t), o.disconnect();
    }, wt = function(o, t, e) {
      if (!!t.length) {
        var i = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, r = o instanceof HTMLDocument ? i || document.body : o, l = t.includes("top") && r.scrollTop > 0, c = t.includes("bottom") && r.scrollTop < r.scrollHeight, d = t.includes("left") && r.scrollLeft > 0, f = t.includes("right") && r.scrollLeft < r.scrollWidth;
        l && (r.scrollTop -= 1 * e), c && (r.scrollTop += 1 * e), d && (r.scrollLeft -= 1 * e), f && (r.scrollLeft += 1 * e);
      }
    }, ue = function(o, t, e) {
      if (e) {
        var i = o.style.transform;
        o.style.transform = "translate3d(".concat(t.x, "px,").concat(t.y, "px,1px) ").concat(i.replace(/translate.*?\)/g, ""));
      } else
        o.style.left = "".concat(t.x, "px"), o.style.top = "".concat(t.y, "px");
      return o;
    }, St = function(o) {
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
          condition: function(b) {
            return b.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, c = function() {
        var b = V(f[d], 2), D = b[0], j = b[1];
        ["pre", !1].forEach(function(L) {
          return t(L ? "".concat(D, ":").concat(L) : D, function(F) {
            return j.forEach(function(z) {
              return (!z.condition || z.condition(F)) && e(L ? "".concat(L).concat(z.name) : z.name, g({
                items: r.elements,
                isDragging: i.isDragging
              }, F));
            });
          });
        });
      }, d = 0, f = Object.entries(l); d < f.length; d++)
        c();
    }, se = function(o) {
      return o ? !Array.isArray(o) && (o instanceof HTMLElement || o instanceof SVGElement) ? [o] : M(o) : [];
    }, Ve = function(o, t) {
      o.style.left = "".concat(t.left, "px"), o.style.top = "".concat(t.top, "px"), o.style.width = "".concat(t.width, "px"), o.style.height = "".concat(t.height, "px");
    }, xt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = t.PS, l = t.zoom;
        a(this, o), n(this, "_modificationCallback", void 0), n(this, "_modificationObserver", void 0), n(this, "_zoom", void 0), n(this, "_node", void 0), n(this, "_parentNodes", void 0), n(this, "_computedStyle", void 0), n(this, "_computedBorder", void 0), n(this, "_rect", void 0), n(this, "setArea", function(c) {
          e._node = c, Ee({
            computedStyle: e.computedStyle,
            node: e._node
          }), setTimeout(function() {
            e.PubSub.publish("Area:modified:pre", {
              item: e
            }), e.reset(), e.PubSub.publish("Area:modified", {
              item: e
            });
          });
        }), n(this, "start", function() {
          st(e.parentNodes, e._modificationCallback, e._modificationObserver);
        }), n(this, "reset", function() {
          e._computedStyle = void 0, e._rect = void 0, e._computedBorder = void 0, e._parentNodes = void 0;
        }), n(this, "stop", function() {
          _t(e._modificationObserver, e._modificationCallback), e.reset();
        }), n(this, "scroll", function(c, d) {
          var f = {
            scroll_directions: c,
            scroll_multiplier: d
          };
          e.PubSub.publish("Area:scroll:pre", f), wt(e._node, c, d), e.PubSub.publish("Area:scroll", f);
        }), this._zoom = l, this.PubSub = r, this.setArea(i), this._modificationCallback = ct(function(c) {
          e.PubSub.publish("Area:modified:pre", {
            event: c,
            item: e
          }), e.reset(), e.PubSub.publish("Area:modified", {
            event: c,
            item: e
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return u(o, [{
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
          return this._rect ? this._rect : this._rect = ut(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var e = function i(r) {
            var l, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, d = (l = r[c]) === null || l === void 0 ? void 0 : l.parentNode;
            return d ? (r.push(d), c++, i(r, c)) : r;
          };
          return this._parentNodes = e([this.HTMLNode]), this._parentNodes;
        }
      }]), o;
    }(), kt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.dragKeys, l = t.draggability, c = t.keyboardDrag, d = t.keyboardDragSpeed, f = t.useTransform, w = t.zoom;
        a(this, o), n(this, "_useTransform", void 0), n(this, "_prevCursorPos", void 0), n(this, "_prevScrollPos", void 0), n(this, "_elements", []), n(this, "_draggability", void 0), n(this, "_dragKeys", void 0), n(this, "_dragKeysFlat", void 0), n(this, "_keyboardDrag", void 0), n(this, "_keyboardDragSpeed", void 0), n(this, "_zoom", void 0), n(this, "keyboardDrag", function(b) {
          var D = b.event, j = b.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(j) || !e.DS.SelectedSet.size || !e._draggability || e.DS.continue)) {
            var L = {
              event: D,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:start:pre", "Interaction:start"], L), e._elements = e.DS.getSelection(), e.handleZIndex(!0);
            var F = pt({
              shiftKey: e.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: e._keyboardDragSpeed,
              zoom: e._zoom,
              key: j,
              scrollCallback: e.DS.Area.scroll,
              scrollDiff: e._scrollDiff,
              canScroll: e.DS.stores.ScrollStore.canScroll,
              dragKeys: e._dragKeys
            });
            e._elements.forEach(function(z) {
              return Te({
                element: z,
                posDirection: F,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            }), e.DS.publish(["Interaction:update:pre", "Interaction:update"], L);
          }
        }), n(this, "keyboardEnd", function(b) {
          var D = b.event, j = b.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(j) || !e.DS.SelectedSet.size || !e._draggability)) {
            var L = {
              event: D,
              isDragging: e._draggability,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:end:pre", "Interaction:end"], L);
          }
        }), n(this, "start", function(b) {
          var D = b.isDragging, j = b.isDraggingKeyboard;
          !D || j || (e._prevCursorPos = null, e._prevScrollPos = null, e._elements = e.DS.getSelection(), e.handleZIndex(!0));
        }), n(this, "stop", function(b) {
          b != null && b.isKeyboard || (e._prevCursorPos = null, e._prevScrollPos = null, e.handleZIndex(!1), e._elements = []);
        }), n(this, "update", function(b) {
          var D = b.isDragging, j = b.isDraggingKeyboard;
          if (!(!D || !e._elements.length || j || e.DS.continue)) {
            var L = U(e._cursorDiff, "+", e._scrollDiff);
            e._elements.forEach(function(F) {
              return Te({
                element: F,
                posDirection: L,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            });
          }
        }), n(this, "handleZIndex", function(b) {
          e._elements.forEach(function(D) {
            return D.style.zIndex = "".concat((parseInt(D.style.zIndex) || 0) + b ? 9999 : -9998);
          });
        }), this.DS = i, this._useTransform = f, this._keyboardDragSpeed = d, this._keyboardDrag = c, this._zoom = w, this._draggability = l, this._dragKeys = {
          up: r.up.map(function(b) {
            return b.toLowerCase();
          }),
          down: r.down.map(function(b) {
            return b.toLowerCase();
          }),
          left: r.left.map(function(b) {
            return b.toLowerCase();
          }),
          right: r.right.map(function(b) {
            return b.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(M(this._dragKeys.up), M(this._dragKeys.down), M(this._dragKeys.left), M(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return u(o, [{
        key: "_cursorDiff",
        get: function() {
          var e = this.DS.stores.PointerStore.currentVal, i = this._prevCursorPos ? U(e, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = e, i;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var e = this.DS.stores.ScrollStore.currentVal, i = this._prevScrollPos ? U(e, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = e, i;
        }
      }]), o;
    }(), Dt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.draggability, c = t.immediateDrag, d = t.selectableClass;
        a(this, o), n(this, "_areaElement", void 0), n(this, "_draggability", void 0), n(this, "_immediateDrag", void 0), n(this, "_selectableClass", void 0), n(this, "isInteracting", void 0), n(this, "isDragging", void 0), n(this, "init", function() {
          return e.DS.publish("Interaction:init:pre", {});
        }), n(this, "_init", function() {
          e.stop(), e._areaElement.addEventListener("mousedown", e.start), e._areaElement.addEventListener("touchstart", e.start, {
            passive: !1
          }), e.DS.publish("Interaction:init", {});
        }), n(this, "start", function(f) {
          return e.DS.publish("Interaction:start:pre", {
            event: f,
            isDragging: e.isDragging
          });
        }), n(this, "_start", function(f) {
          f.type === "touchstart" && f.preventDefault(), e._canInteract(f) && (e.isInteracting = !0, e.isDragging = e.isDragEvent(f), e.DS.publish("Interaction:start", {
            event: f,
            isDragging: e.isDragging
          }), document.addEventListener("mouseup", e.reset), document.addEventListener("touchend", e.reset));
        }), n(this, "isDragEvent", function(f) {
          var w = f.target.closest(".".concat(e._selectableClass));
          return !e._draggability || e.DS.stores.KeyStore.isMultiSelectKeyPressed(f) || !w ? !1 : (e._immediateDrag && (e.DS.SelectedSet.size ? e.DS.SelectedSet.has(w) || (e.DS.SelectedSet.clear(), e.DS.SelectedSet.add(
            w
          )) : e.DS.SelectedSet.add(
            w
          )), !!e.DS.SelectedSet.has(w));
        }), n(this, "onClick", function(f) {
          var w = f.event;
          if (!!e._canInteract(w) && !(w.detail > 0)) {
            var b = e.DS, D = b.stores, j = D.PointerStore, L = D.KeyStore, F = b.SelectableSet, z = b.SelectedSet;
            j.start(w);
            var ie = w.target;
            !F.has(ie) || (L.isMultiSelectKeyPressed(w) || z.clear(), z.toggle(ie), e.reset());
          }
        }), n(this, "stop", function() {
          e.isInteracting = !1, e.isDragging = !1, e._areaElement.removeEventListener("mousedown", e.start), e._areaElement.removeEventListener("touchstart", e.start, {
            passive: !1
          }), document.removeEventListener("mouseup", e.reset), document.removeEventListener("touchend", e.reset);
        }), n(this, "update", function(f) {
          var w = f.event, b = f.scroll_directions, D = f.scroll_multiplier;
          e.isInteracting && e.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: w,
            scroll_directions: b,
            scroll_multiplier: D,
            isDragging: e.isDragging
          });
        }), n(this, "reset", function(f) {
          return e.DS.publish("Interaction:end:pre", {
            event: f,
            isDragging: e.isDragging
          });
        }), n(this, "_reset", function(f) {
          var w = e.isDragging;
          e.stop(), e.init(), e.DS.publish("Interaction:end", {
            event: f,
            isDragging: w
          });
        }), this._areaElement = r, this._draggability = l, this._immediateDrag = c, this._selectableClass = d, this.DS = i, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(f) {
          var w = f.event;
          return e.start(w);
        }), this.DS.subscribe("Interaction:start:pre", function(f) {
          var w = f.event;
          return e._start(w);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(f) {
          var w = f.event;
          return e._reset(w);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return u(o, [{
        key: "_canInteract",
        value: function(e) {
          var i = e.clientX === 0 && e.clientY === 0 && e.detail === 0 && e.target;
          return !(e.button === 2 || this.isInteracting || e.target && !this.DS.SelectorArea.isInside(
            e.target
          ) || !i && !this.DS.SelectorArea.isClicked(e));
        }
      }]), o;
    }(), $t = function o(t) {
      var e = this, i = t.DS;
      a(this, o), n(this, "subscribers", {}), n(this, "subscribe", function(r, l) {
        return Array.isArray(e.subscribers[r]) || (e.subscribers[r] = []), e.subscribers[r].push(l), e.subscribers[r].length - 1;
      }), n(this, "unsubscribe", function(r, l, c) {
        c >= 0 ? e.subscribers[r].splice(c, 1) : l && (e.subscribers[r] = e.subscribers[r].filter(function(d) {
          return d !== l;
        }));
      }), n(this, "publish", function(r, l) {
        Array.isArray(r) ? r.forEach(function(c) {
          return e._publish(c, l);
        }) : e._publish(r, l);
      }), n(this, "_publish", function(r, l) {
        var c = e.subscribers[r];
        !Array.isArray(c) || (r.includes(":pre") ? e._handlePrePublish(c, l) : e._handlePublish(c, l));
      }), n(this, "_handlePublish", function(r, l) {
        for (var c = 0, d = r.length; c < d; c++) {
          if (e.DS.stopped)
            return;
          r[c](l);
        }
      }), n(this, "_handlePrePublish", function(r, l) {
        for (var c = r.length; c--; ) {
          if (e.DS.stopped)
            return;
          r[c](l);
        }
      }), this.DS = i;
    }, Ct = /* @__PURE__ */ function(o) {
      v(e, o);
      var t = ce(e);
      function e(i) {
        var r, l = i.elements, c = i.className, d = i.hoverClassName, f = i.draggability, w = i.useTransform, b = i.DS;
        return a(this, e), r = t.call(this), n(O(r), "_initElements", void 0), n(O(r), "_className", void 0), n(O(r), "_hoverClassName", void 0), n(O(r), "_useTransform", void 0), n(O(r), "_draggability", void 0), n(O(r), "init", function() {
          return r._initElements.forEach(function(D) {
            return r.add(D);
          });
        }), n(O(r), "clear", function() {
          return r.forEach(function(D) {
            return r.delete(D);
          });
        }), n(O(r), "_onClick", function(D) {
          return r.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: D
          });
        }), n(O(r), "_onPointer", function(D) {
          return r.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: D
          });
        }), n(O(r), "addAll", function(D) {
          return D.forEach(function(j) {
            return r.add(j);
          });
        }), n(O(r), "deleteAll", function(D) {
          return D.forEach(function(j) {
            return r.delete(j);
          });
        }), r.DS = b, r._initElements = se(l), r._className = c, r._hoverClassName = d, r._useTransform = w, r._draggability = f, r.DS.subscribe("Interaction:init", r.init), r;
      }
      return u(e, [{
        key: "add",
        value: function(r) {
          return r.classList.add(this._className), r.addEventListener("click", this._onClick), r.addEventListener("mousedown", this._onPointer), r.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Ee({
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
    }(/* @__PURE__ */ B(Set)), Pt = /* @__PURE__ */ function(o) {
      v(e, o);
      var t = ce(e);
      function e(i) {
        var r, l = i.className, c = i.DS;
        return a(this, e), r = t.call(this), n(O(r), "_className", void 0), n(O(r), "clear", function() {
          return r.forEach(function(d) {
            return r.delete(d);
          });
        }), n(O(r), "addAll", function(d) {
          return d.forEach(function(f) {
            return r.add(f);
          });
        }), n(O(r), "deleteAll", function(d) {
          return d.forEach(function(f) {
            return r.delete(f);
          });
        }), r.DS = c, r._className = l, r;
      }
      return u(e, [{
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
            var c = $(_(e.prototype), "delete", this).call(this, r);
            return r.classList.remove(this._className), r.style.zIndex = "".concat((parseInt(r.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", l), c;
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
    }(/* @__PURE__ */ B(Set)), Mt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.hoverClassName, l = t.multiSelectToggling;
        a(this, o), n(this, "_prevSelectedSet", void 0), n(this, "_hoverClassName", void 0), n(this, "_multiSelectToggling", void 0), n(this, "start", function(c) {
          var d = c.event, f = c.isDragging;
          f || (e._storePrevious(d), e._handleInsideSelection(!0, d));
        }), n(this, "update", function(c) {
          var d = c.isDragging;
          d || e.DS.continue || e._handleInsideSelection();
        }), n(this, "_handleInsideSelection", function(c, d) {
          for (var f = e.DS, w = f.SelectableSet, b = f.SelectorArea, D = f.Selector, j = w.elements.map(function(ee) {
            return [ee, ee.getBoundingClientRect()];
          }), L = [], F = [], z = 0, ie = j.length; z < ie; z++)
            !b.isInside(j[z][0], j[z][1]) || (_e(j[z][1], D.rect) ? L.push(j[z][0]) : F.push(j[z][0]));
          var ge = e.DS.stores.KeyStore.isMultiSelectKeyPressed(d) && e._multiSelectToggling;
          e.DS.continue || (L.forEach(function(ee) {
            return yt({
              element: ee,
              force: c,
              multiSelectionToggle: ge,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName
            });
          }), F.forEach(function(ee) {
            return bt({
              element: ee,
              force: c,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName,
              PrevSelectedSet: e._prevSelectedSet
            });
          }));
        }), this._hoverClassName = r, this._multiSelectToggling = l, this.DS = i, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return u(o, [{
        key: "_storePrevious",
        value: function(e) {
          var i = this.DS, r = i.stores.KeyStore, l = i.SelectedSet;
          r.isMultiSelectKeyPressed(e) ? this._prevSelectedSet = new Set(l) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), o;
    }(), jt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.selector, l = t.selectorClass, c = t.customStyles;
        a(this, o), n(this, "_rect", void 0), n(this, "start", function(d) {
          var f = d.isDragging;
          if (!f) {
            var w = e.DS.stores.PointerStore, b = w.initialValArea;
            Ve(e.HTMLNode, Me(b, 1)), e.HTMLNode.style.display = "block", e._rect = null;
          }
        }), n(this, "stop", function() {
          e.HTMLNode.style.width = "0", e.HTMLNode.style.height = "0", e.HTMLNode.style.display = "none";
        }), n(this, "update", function(d) {
          var f = d.isDragging;
          if (!(f || e.DS.continue)) {
            var w = e.DS.stores, b = w.ScrollStore, D = w.PointerStore, j = mt({
              scrollAmount: b.scrollAmount,
              initialPointerPos: D.initialValArea,
              pointerPos: D.currentValArea
            });
            Ve(e.HTMLNode, j), e._rect = null;
          }
        }), this.DS = i, this.HTMLNode = r || lt(c), this.HTMLNode.classList.add(l), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return u(o, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), o;
    }(), At = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.selectorAreaClass, l = t.autoScrollSpeed, c = t.overflowTolerance;
        a(this, o), n(this, "_autoScrollSpeed", void 0), n(this, "_scrollInterval", void 0), n(this, "_rect", void 0), n(this, "currentEdges", []), n(this, "_overflowTolerance", void 0), n(this, "start", function() {
          return e.applyElements("append");
        }), n(this, "applyElements", function() {
          var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", f = document.body ? "body" : "documentElement", w = "".concat(d, "Child");
          e.HTMLNode[w](e.DS.Selector.HTMLNode), document[f][w](e.HTMLNode);
        }), n(this, "updatePos", function() {
          e._rect = null;
          var d = e.DS.Area.rect, f = e.DS.Area.computedBorder, w = e.HTMLNode.style, b = "".concat(d.top + f.top, "px"), D = "".concat(d.left + f.left, "px"), j = "".concat(d.width, "px"), L = "".concat(d.height, "px");
          w.top !== b && (w.top = b), w.left !== D && (w.left = D), w.width !== j && (w.width = j), w.height !== L && (w.height = L);
        }), n(this, "stop", function(d) {
          e.stopAutoScroll(), d && e.applyElements("remove");
        }), n(this, "startAutoScroll", function() {
          e.currentEdges = [], e._scrollInterval = setInterval(function() {
            return e.handleAutoScroll();
          }, 16);
        }), n(this, "handleAutoScroll", function() {
          if (!e.DS.continue) {
            var d = e.DS, f = d.stores.PointerStore, w = d.Area;
            e.currentEdges = je({
              elementRect: Me(f.currentVal),
              containerRect: e.rect,
              tolerance: e._overflowTolerance
            }), e.currentEdges.length && w.scroll(e.currentEdges, e._autoScrollSpeed);
          }
        }), n(this, "stopAutoScroll", function() {
          e.currentEdges = [], clearInterval(e._scrollInterval);
        }), n(this, "isInside", function(d, f) {
          return e.DS.Area.HTMLNode.contains(d) && e.DS.stores.ScrollStore.canScroll ? !0 : _e(e.rect, f || d.getBoundingClientRect());
        }), this._autoScrollSpeed = l, this._overflowTolerance = c, this.DS = i, this.HTMLNode = at(r), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          e.updatePos(), e.stopAutoScroll();
        });
      }
      return u(o, [{
        key: "isClicked",
        value: function(e) {
          var i = this.DS.stores.PointerStore, r = e ? i.getPointerPosition(e) : i.initialVal;
          return _e({
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
    }(), Et = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.multiSelectKeys, l = t.multiSelectMode;
        a(this, o), n(this, "_multiSelectMode", void 0), n(this, "_multiSelectKeys", void 0), n(this, "_currentValues", /* @__PURE__ */ new Set()), n(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), n(this, "init", function() {
          document.addEventListener("keydown", e.keydown), document.addEventListener("keyup", e.keyup), window.addEventListener("blur", e.reset);
        }), n(this, "keydown", function(c) {
          var d = c.key.toLowerCase();
          e.DS.publish("KeyStore:down:pre", {
            event: c,
            key: d
          }), e._currentValues.add(d), e.DS.publish("KeyStore:down", {
            event: c,
            key: d
          });
        }), n(this, "keyup", function(c) {
          var d = c.key.toLowerCase();
          e.DS.publish("KeyStore:up:pre", {
            event: c,
            key: d
          }), e._currentValues.delete(d), e.DS.publish("KeyStore:up", {
            event: c,
            key: d
          });
        }), n(this, "stop", function() {
          document.removeEventListener("keydown", e.keydown), document.removeEventListener("keyup", e.reset), window.removeEventListener("blur", e.reset), e.reset();
        }), n(this, "reset", function() {
          return e._currentValues.clear();
        }), this.DS = i, this._multiSelectMode = l, this._multiSelectKeys = r.map(function(c) {
          var d = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, f = d[c];
          return f ? (console.warn("[DragSelect] ".concat(c, ' is deprecated. Use "').concat(f, '" instead. Act Now!. See docs for more info')), f.toLowerCase()) : c.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return u(o, [{
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
    }(), Tt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS;
        a(this, o), n(this, "_isMouseInteraction", !1), n(this, "_initialValArea", void 0), n(this, "_currentValArea", void 0), n(this, "_lastValArea", void 0), n(this, "_initialVal", void 0), n(this, "_currentVal", void 0), n(this, "_lastVal", void 0), n(this, "_lastTouch", void 0), n(this, "init", function() {
          document.addEventListener("mousemove", e.update), document.addEventListener("touchmove", e.update, {
            passive: !1
          });
        }), n(this, "getPointerPosition", function(r) {
          return dt({
            event: e._normalizedEvent(r)
          });
        }), n(this, "update", function(r) {
          !r || (e.DS.publish("PointerStore:updated:pre", {
            event: r
          }), e.currentVal = e.getPointerPosition(r), e._isMouseInteraction && e.DS.publish("PointerStore:updated", {
            event: r
          }));
        }), n(this, "stop", function() {
          document.removeEventListener("mousemove", e.update), document.removeEventListener("touchmove", e.update, {
            passive: !1
          }), setTimeout(function() {
            return e._isMouseInteraction = !1;
          }, 100);
        }), n(this, "reset", function(r) {
          !r || (e.currentVal = e.lastVal = e.getPointerPosition(r), e.stop(), e.init());
        }), this.DS = i, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(r) {
          var l = r.event;
          return e.start(l);
        }), this.DS.subscribe("Interaction:end", function(r) {
          var l = r.event;
          return e.reset(l);
        });
      }
      return u(o, [{
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
          this._initialVal = e, this._initialValArea = e && U(e, "-", U(ne(this.DS.Area.rect), "+", ne(this.DS.Area.computedBorder)));
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
          this._currentVal = e, this._currentValArea = e && U(e, "-", U(ne(this.DS.Area.rect), "+", ne(this.DS.Area.computedBorder)));
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
          this._lastVal = e, this._lastValArea = e && U(e, "-", U(ne(this.DS.Area.rect), "+", ne(this.DS.Area.computedBorder)));
        }
      }]), o;
    }(), Vt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.zoom;
        a(this, o), n(this, "_initialVal", void 0), n(this, "_currentVal", void 0), n(this, "_areaElement", void 0), n(this, "_canScroll", void 0), n(this, "init", function() {
          return e._areaElement.addEventListener("scroll", e.update);
        }), n(this, "start", function() {
          e._currentVal = e._initialVal = fe(e._areaElement), e._areaElement.addEventListener("scroll", e.update);
        }), n(this, "update", function() {
          return e._currentVal = fe(e._areaElement);
        }), n(this, "stop", function() {
          e._areaElement.removeEventListener("scroll", e.update), e._initialVal = {
            x: 0,
            y: 0
          }, e._canScroll = null;
        }), n(this, "reset", function() {
          e.stop(), e.start();
        }), this._areaElement = r, this.DS = i, this.zoom = l, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return e.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return e.reset();
        });
      }
      return u(o, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = it(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var e = U(this.currentVal, "-", this.initialVal), i = nt(this.zoom), r = U(U(e, "*", i), "-", e);
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
          return this._currentVal || (this._currentVal = fe(this._areaElement)), this._currentVal;
        }
      }]), o;
    }(), It = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = i === void 0 ? document : i, l = t.selectables, c = l === void 0 ? [] : l, d = t.autoScrollSpeed, f = d === void 0 ? 5 : d, w = t.overflowTolerance, b = w === void 0 ? {
          x: 25,
          y: 25
        } : w, D = t.zoom, j = D === void 0 ? 1 : D, L = t.customStyles, F = L === void 0 ? !1 : L, z = t.multiSelectMode, ie = z === void 0 ? !1 : z, ge = t.multiSelectToggling, ee = ge === void 0 ? !0 : ge, Ie = t.multiSelectKeys, Ot = Ie === void 0 ? ["Control", "Shift", "Meta"] : Ie, Oe = t.selector, Lt = Oe === void 0 ? void 0 : Oe, Le = t.draggability, we = Le === void 0 ? !0 : Le, Ne = t.immediateDrag, Nt = Ne === void 0 ? !0 : Ne, ze = t.keyboardDrag, zt = ze === void 0 ? !0 : ze, Kt = t.dragKeys, Ke = t.keyboardDragSpeed, Bt = Ke === void 0 ? 10 : Ke, Be = t.useTransform, He = Be === void 0 ? !0 : Be, Re = t.hoverClass, Ue = Re === void 0 ? "ds-hover" : Re, Fe = t.selectableClass, qe = Fe === void 0 ? "ds-selectable" : Fe, We = t.selectedClass, Ht = We === void 0 ? "ds-selected" : We, Ye = t.selectorClass, Rt = Ye === void 0 ? "ds-selector" : Ye, Je = t.selectorAreaClass, Ut = Je === void 0 ? "ds-selector-area" : Je, Ft = t.callback, qt = t.onDragMove, Wt = t.onDragStartBegin, Yt = t.onDragStart, Jt = t.onElementSelect, Zt = t.onElementUnselect;
        a(this, o), n(this, "continue", !1), n(this, "start", function() {
          e.stopped = !1, e.Interaction.init();
        }), n(this, "break", function() {
          return e.continue = !0;
        }), n(this, "getSelection", function() {
          return e.SelectedSet.elements;
        }), n(this, "getSelectables", function() {
          return e.SelectableSet.elements;
        }), n(this, "getInitialCursorPosition", function() {
          return e.stores.PointerStore.initialVal;
        }), n(this, "getCurrentCursorPosition", function() {
          return e.stores.PointerStore.currentVal;
        }), n(this, "getPreviousCursorPosition", function() {
          return e.stores.PointerStore.lastVal;
        }), n(this, "getInitialCursorPositionArea", function() {
          return e.stores.PointerStore.initialValArea;
        }), n(this, "getCurrentCursorPositionArea", function() {
          return e.stores.PointerStore.currentValArea;
        }), n(this, "getPreviousCursorPositionArea", function() {
          return e.stores.PointerStore.lastValArea;
        }), n(this, "isMultiSelect", function(Xt) {
          return e.stores.KeyStore.isMultiSelectKeyPressed(Xt);
        }), n(this, "isDragging", function() {
          return e.Interaction.isDragging;
        }), this.PubSub = new $t({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Ft,
          onDragMove: qt,
          onDragStart: Yt,
          onDragStartBegin: Wt,
          onElementSelect: Jt,
          onElementUnselect: Zt
        }), this.stores = {
          PointerStore: new Tt({
            DS: this
          }),
          ScrollStore: new Vt({
            DS: this,
            areaElement: r,
            zoom: j
          }),
          KeyStore: new Et({
            DS: this,
            multiSelectKeys: Ot,
            multiSelectMode: ie
          })
        }, this.Area = new xt({
          area: r,
          PS: this.PubSub,
          zoom: j
        }), this.Selector = new jt({
          DS: this,
          selector: Lt,
          selectorClass: Rt,
          customStyles: F
        }), this.SelectorArea = new At({
          DS: this,
          selectorAreaClass: Ut,
          autoScrollSpeed: f,
          overflowTolerance: b
        }), this.SelectableSet = new Ct({
          elements: c,
          DS: this,
          className: qe,
          hoverClassName: Ue,
          useTransform: He,
          draggability: we
        }), this.SelectedSet = new Pt({
          DS: this,
          className: Ht
        }), this.Selection = new Mt({
          DS: this,
          hoverClassName: Ue,
          multiSelectToggling: ee
        }), this.Drag = new kt({
          DS: this,
          draggability: we,
          useTransform: He,
          keyboardDrag: zt,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, Kt),
          zoom: j,
          keyboardDragSpeed: Bt
        }), this.Interaction = new Dt({
          areaElement: r,
          DS: this,
          draggability: we,
          immediateDrag: Nt,
          selectableClass: qe
        }), St({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return e.continue = !1;
        }), this.start();
      }
      return u(o, [{
        key: "_callbacksTemp",
        value: function(e) {
          var i = e.callback, r = e.onDragMove, l = e.onDragStart, c = e.onDragStartBegin, d = e.onElementSelect, f = e.onElementUnselect, w = function(D, j) {
            return console.warn("[DragSelect] ".concat(D, ' is deprecated. Use DragSelect.subscribe("').concat(j, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          i && (w("callback", "callback"), this.subscribe("callback", function(b) {
            var D = b.items;
            b.item;
            var j = b.event;
            return i(D, j);
          })), r && (w("onDragMove", "dragmove"), this.subscribe("dragmove", function(b) {
            b.items, b.item;
            var D = b.event;
            return r(D);
          })), l && (w("onDragStart", "dragstart"), this.subscribe("dragstart", function(b) {
            b.items, b.item;
            var D = b.event;
            return l(D);
          })), c && (w("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(b) {
            b.items, b.item;
            var D = b.event;
            return c(D);
          })), d && (w("onElementSelect", "elementselect"), this.subscribe("elementselect", function(b) {
            b.items;
            var D = b.item, j = b.event;
            return d(D, j);
          })), f && (w("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(b) {
            b.items;
            var D = b.item, j = b.event;
            return f(D, j);
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
          return this.SelectedSet.addAll(se(e)), r || this.addSelectables(e), i && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(e) {
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(se(e)), r && this.removeSelectables(e), i && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(e) {
          var i = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return se(e).forEach(function(c) {
            return i.SelectedSet.has(c) ? i.removeSelection(e, r, l) : i.addSelection(e, r, l);
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
          var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = se(e);
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
          return this.SelectableSet.deleteAll(se(e)), i && this.removeSelection(e), e;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var r = i ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), l = e ? i ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : i ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return U(r, "-", l);
        }
      }]), o;
    }();
    return It;
  });
})(tt);
const Er = tt.exports, Tr = (h, m, a, p, u) => (m = Math, a = m.log, p = 1024, u = a(h) / a(p) | 0, h / m.pow(p, u)).toFixed(0) + " " + (u ? "KMGTPEZY"[--u] + "iB" : "B"), Vr = (h, m = "en-US") => new Date(h * 1e3).toLocaleString(m), Ir = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Or = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Lr = [
  Or
], Nr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, zr = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Kr = [
  zr
], Br = {
  name: "VFSortIcon"
}, xe = /* @__PURE__ */ Object.assign(Br, {
  props: { direction: String },
  setup(h) {
    return (m, a) => (y(), x("div", null, [
      h.direction == "down" ? (y(), x("svg", Ir, Lr)) : W("", !0),
      h.direction == "up" ? (y(), x("svg", Nr, Kr)) : W("", !0)
    ]));
  }
}), Hr = { class: "relative h-full" }, Rr = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Ur = /* @__PURE__ */ de(" Name "), Fr = /* @__PURE__ */ de(" Size "), qr = /* @__PURE__ */ de(" Date "), Wr = { class: "absolute" }, Yr = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Jr = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Zr = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Xr = { class: "grid grid-cols-12 items-center" }, Gr = { class: "flex col-span-7 items-center" }, Qr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, eo = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), to = [
  eo
], ro = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oo = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), no = [
  oo
], so = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, io = { class: "col-span-2 text-center" }, ao = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, lo = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], co = { class: "relative" }, uo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mo = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ho = [
  mo
], fo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, go = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), vo = [
  go
], po = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, yo = { class: "break-all" }, bo = {
  name: "VFExplorer"
}, _o = /* @__PURE__ */ Object.assign(bo, {
  props: {
    view: String,
    data: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = ($) => $ == null ? void 0 : $.substring(0, 3), n = ($) => $.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), S = E(null), g = E(null), v = E(0), _ = E(null), k = ($) => {
      $.type == "dir" ? a.emit("vf-fetch", { q: "index", adapter: m.data.adapter, path: $.path }) : a.emit("vf-modal-show", { type: "preview", adapter: m.data.adapter, item: $ });
    }, C = pe({ active: !1, column: "", order: "" }), P = ($ = !0) => {
      let V = [...m.data.files], M = C.column, q = C.order == "asc" ? 1 : -1;
      if (!$)
        return V;
      const N = (G, Q) => typeof G == "string" && typeof Q == "string" ? G.toLowerCase().localeCompare(Q.toLowerCase()) : G < Q ? -1 : G > Q ? 1 : 0;
      return C.active && (V = V.slice().sort((G, Q) => N(G[M], Q[M]) * q)), V;
    }, I = ($) => {
      C.active && C.column == $ ? (C.active = C.order == "asc", C.column = $, C.order = "desc") : (C.active = !0, C.column = $, C.order = "asc");
    }, B = () => _.value.getSelection().map(($) => JSON.parse($.dataset.item)), O = ($, V) => {
      if ($.altKey || $.ctrlKey || $.metaKey)
        return $.preventDefault(), !1;
      $.dataTransfer.setDragImage(g.value, 0, 15), $.dataTransfer.effectAllowed = "all", $.dataTransfer.dropEffect = "copy", $.dataTransfer.setData("items", JSON.stringify(B()));
    }, oe = ($, V) => {
      $.preventDefault();
      let M = JSON.parse($.dataTransfer.getData("items"));
      if (M.find((q) => q.storage != p("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", { type: "move", items: { from: M, to: V } });
    }, ce = ($, V) => {
      $.preventDefault(), !V || V.type !== "dir" || _.value.getSelection().find((M) => M == $.currentTarget) ? ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none") : $.dataTransfer.dropEffect = "copy";
    };
    return Z(() => {
      _.value = new Er({
        area: S.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), a.on("vf-explorer-update", () => $e(() => {
        _.value.clearSelection(), _.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), _.value.subscribe("predragstart", ({ event: $, isDragging: V }) => {
        if (V)
          v.value = _.value.getSelection().length, _.value.break();
        else {
          const M = $.target.offsetWidth - $.offsetX, q = $.target.offsetHeight - $.offsetY;
          M < 15 && q < 15 && (_.value.clearSelection(), _.value.break());
        }
      }), _.value.subscribe("predragmove", ({ isDragging: $ }) => {
        $ && _.value.break();
      }), _.value.subscribe("callback", ({ items: $, event: V, isDragging: M }) => {
        a.emit("vf-nodes-selected", B()), v.value = _.value.getSelection().length;
      });
    }), Z(() => {
      et(() => m.view, () => a.emit("vf-explorer-update"));
    }), ($, V) => (y(), x("div", Hr, [
      h.view == "list" ? (y(), x("div", Rr, [
        s("div", {
          onClick: V[0] || (V[0] = (M) => I("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          Ur,
          J(te(xe, {
            direction: C.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, C.active && C.column == "basename"]
          ])
        ]),
        s("div", {
          onClick: V[1] || (V[1] = (M) => I("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          Fr,
          J(te(xe, {
            direction: C.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, C.active && C.column == "file_size"]
          ])
        ]),
        s("div", {
          onClick: V[2] || (V[2] = (M) => I("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          qr,
          J(te(xe, {
            direction: C.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, C.active && C.column == "last_modified"]
          ])
        ])
      ])) : W("", !0),
      s("div", Wr, [
        s("div", {
          ref: (M) => g.value = M,
          class: "absolute -z-50"
        }, [
          Yr,
          s("div", Jr, T(v.value), 1)
        ], 512)
      ]),
      s("div", {
        class: "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1 z-0",
        ref: (M) => S.value = M,
        onContextmenu: V[3] || (V[3] = ve((M) => A(a).emit("vf-contextmenu-show", { event: M, area: S.value, items: B() }), ["self", "prevent"]))
      }, [
        h.view == "list" ? (y(!0), x(R, { key: 0 }, X(P(), (M, q) => (y(), x("div", {
          draggable: "true",
          onDblclick: (N) => k(M),
          onContextmenu: ve((N) => A(a).emit("vf-contextmenu-show", { event: N, area: S.value, items: B(), target: M }), ["prevent"]),
          onDragstart: (N) => O(N),
          onDragover: (N) => ce(N, M),
          onDrop: (N) => oe(N, M),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": M.type,
          "data-item": JSON.stringify(M),
          "data-index": q
        }, [
          s("div", Xr, [
            s("div", Gr, [
              M.type == "dir" ? (y(), x("svg", Qr, to)) : (y(), x("svg", ro, no)),
              s("span", so, T(M.basename), 1)
            ]),
            s("div", io, T(M.file_size ? A(Tr)(M.file_size) : ""), 1),
            s("div", ao, T(A(Vr)(M.last_modified)), 1)
          ])
        ], 40, Zr))), 256)) : W("", !0),
        h.view == "grid" ? (y(!0), x(R, { key: 1 }, X(P(!1), (M, q) => (y(), x("div", {
          draggable: "true",
          onDblclick: (N) => k(M),
          onContextmenu: ve((N) => A(a).emit("vf-contextmenu-show", { event: N, area: S.value, items: B(), target: M }), ["prevent"]),
          onDragstart: (N) => O(N),
          onDragover: (N) => ce(N, M),
          onDrop: (N) => oe(N, M),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": M.type,
          "data-item": JSON.stringify(M),
          "data-index": q
        }, [
          s("div", null, [
            s("div", co, [
              M.type == "dir" ? (y(), x("svg", uo, ho)) : (y(), x("svg", fo, vo)),
              s("div", po, T(u(M.extension)), 1)
            ]),
            s("span", yo, T(n(M.basename)), 1)
          ])
        ], 40, lo))), 256)) : W("", !0)
      ], 544)
    ]));
  }
}), wo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, So = { class: "flex leading-5 items-center" }, xo = /* @__PURE__ */ s("div", {
  class: "mx-2",
  "aria-label": "Storage",
  "data-microtip-position": "top",
  role: "tooltip"
}, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  ])
], -1), ko = ["value"], Do = { class: "ml-3" }, $o = { class: "flex leading-5 items-center" }, Co = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Po = [
  Co
], Mo = {
  name: "VFStatusbar"
}, jo = /* @__PURE__ */ Object.assign(Mo, {
  props: {
    data: Object
  },
  setup(h) {
    var v;
    const m = h, a = inject("emitter"), { getStore: p, setStore: u } = inject("storage"), n = E(0), S = E((v = p("adapter")) != null ? v : m.data.adapter), g = () => {
      a.emit("vf-fetch", { q: "index", adapter: S.value }), u("adapter", S.value);
    };
    return a.on("vf-nodes-selected", (_) => {
      n.value = _.length;
    }), (_, k) => (y(), x("div", wo, [
      s("div", So, [
        xo,
        J(s("select", {
          "onUpdate:modelValue": k[0] || (k[0] = (C) => S.value = C),
          onChange: g,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (y(!0), x(R, null, X(h.data.storages, (C) => (y(), x("option", { value: C }, T(C), 9, ko))), 256))
        ], 544), [
          [Qt, S.value]
        ]),
        s("span", Do, T(n.value > 0 ? n.value + " items selected." : ""), 1)
      ]),
      s("div", $o, [
        s("span", {
          onClick: k[1] || (k[1] = (C) => A(a).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, Po)
      ])
    ]));
  }
}), Ao = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, Eo = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), To = [
  Eo
], Vo = { class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" }, Io = /* @__PURE__ */ s("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Oo = [
  Io
], Lo = { class: "flex leading-5" }, No = /* @__PURE__ */ s("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), zo = ["title", "onClick"], Ko = {
  name: "VFBreadcrumb"
}, Bo = /* @__PURE__ */ Object.assign(Ko, {
  props: {
    data: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = E(null), n = E([]);
    a.on("vf-explorer-update", (v) => {
      var C;
      let _ = [], k = [];
      u.value = (C = m.data.dirname) != null ? C : p("adapter", "local") + "://", u.value.length == 0 && (n.value = []), u.value.replace(p("adapter", "local") + "://", "").split("/").forEach(function(P) {
        _.push(P), _.join("/") != "" && k.push({
          basename: P,
          name: P,
          path: p("adapter", "local") + "://" + _.join("/"),
          type: "dir"
        });
      }), k.length > 4 && (k = k.slice(-5), k[0].name = ".."), n.value = k;
    });
    const S = (v) => {
      var k;
      v.preventDefault();
      let _ = JSON.parse(v.dataTransfer.getData("items"));
      if (_.find((C) => C.storage != p("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", {
        type: "move",
        items: { from: _, to: (k = n.value[n.value.length - 2]) != null ? k : { path: p("adapter", "local") + "://" } }
      });
    }, g = (v) => {
      v.preventDefault(), n.value.length < 1 ? (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : v.dataTransfer.dropEffect = "copy";
    };
    return (v, _) => (y(), x("div", Ao, [
      (y(), x("svg", {
        onDragover: _[0] || (_[0] = (k) => g(k)),
        onDrop: _[1] || (_[1] = (k) => S(k)),
        onClick: _[2] || (_[2] = (k) => {
          var C, P;
          return !n.value.length || A(a).emit("vf-fetch", { q: "index", adapter: h.data.adapter, path: (P = (C = n.value[n.value.length - 2]) == null ? void 0 : C.path) != null ? P : A(p)("adapter", "local") + "://" });
        }),
        class: ae(["h-6 w-6 p-0.5 rounded", n.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, To, 34)),
      s("div", Vo, [
        (y(), x("svg", {
          onClick: _[3] || (_[3] = (k) => A(a).emit("vf-fetch", { q: "index", adapter: h.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Oo)),
        s("div", Lo, [
          (y(!0), x(R, null, X(n.value, (k, C) => (y(), x("div", { key: C }, [
            No,
            s("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: k.basename,
              onClick: (P) => A(a).emit("vf-fetch", { q: "index", adapter: h.data.adapter, path: k.path })
            }, T(k.name), 9, zo)
          ]))), 128))
        ])
      ])
    ]));
  }
}), le = (h) => Object.entries(h).map((m) => m.map(encodeURIComponent).join("=")).join("&"), Ho = ["onClick"], Ro = /* @__PURE__ */ s("span", { class: "px-1" }, null, -1), Uo = {
  name: "VFContextMenu"
}, Fo = /* @__PURE__ */ Object.assign(Uo, {
  props: {
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), p = E(null), { apiUrl: u } = re(), n = pe({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), S = E([]);
    a.on("vf-context-selected", (k) => {
      S.value = k;
    });
    const g = {
      newfolder: {
        title: "New Folder",
        action: () => {
          a.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: "Delete",
        action: () => {
          a.emit("vf-modal-show", { type: "delete", items: S });
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
          a.emit("vf-modal-show", { type: "preview", adapter: m.current.adapter, item: S.value[0] });
        }
      },
      download: {
        title: "Download",
        action: () => {
          const k = u.value + "?" + le({ q: "download", adapter: S.value[0].adapter, path: S.value[0].path });
          a.emit("vf-download", k);
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          a.emit("vf-modal-show", { type: "archive", items: S });
        }
      },
      unarchive: {
        title: "Unarchive",
        action: () => {
          a.emit("vf-modal-show", { type: "unarchive", items: S });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          a.emit("vf-modal-show", { type: "rename", items: S });
        }
      }
    }, v = (k) => {
      a.emit("vf-contextmenu-hide"), k.action();
    };
    a.on("vf-contextmenu-show", ({ event: k, area: C, items: P, target: I = null }) => {
      n.items = [], I ? P.length > 1 && P.some((B) => B.path === I.path) ? (n.items.push(g.refresh), n.items.push(g.archive), n.items.push(g.delete), a.emit("vf-context-selected", P), console.log(P.length + " selected (more than 1 item.)")) : (n.items.push(g.preview), n.items.push(g.rename), n.items.push(g.download), I.mime_type == "application/zip" ? n.items.push(g.unarchive) : n.items.push(g.archive), n.items.push(g.delete), a.emit("vf-context-selected", [I]), console.log(I.type + " is selected")) : (n.items.push(g.refresh), n.items.push(g.newfolder), a.emit("vf-context-selected", []), console.log("no files selected")), _(k, C);
    }), a.on("vf-contextmenu-hide", () => {
      n.active = !1;
    });
    const _ = (k, C) => {
      n.active = !0, $e(() => {
        let P = C.getBoundingClientRect(), I = k.pageX, B = k.pageY, O = p.value.offsetHeight, oe = p.value.offsetWidth;
        I = P.right - k.pageX + window.scrollX < oe ? I - oe : I, B = P.bottom - k.pageY + window.scrollY < O ? B - O : B, n.positions = {
          left: I + "px",
          top: B + "px"
        };
      });
    };
    return (k, C) => n.active ? (y(), x("ul", {
      key: 0,
      class: "absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (P) => p.value = P,
      style: er(n.positions)
    }, [
      (y(!0), x(R, null, X(n.items, (P) => (y(), x("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: P.title,
        onClick: (I) => v(P)
      }, [
        Ro,
        s("span", null, T(P.title), 1)
      ], 8, Ho))), 128))
    ], 4)) : W("", !0);
  }
}), qo = /* @__PURE__ */ s("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Wo = {
  name: "VueFinder"
}, Yo = /* @__PURE__ */ Object.assign(Wo, {
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
  setup(h) {
    const m = h, a = rr();
    Ze("emitter", a);
    const { setStore: p, getStore: u } = Ge(m.id);
    Ze("storage", Ge(m.id));
    const { apiUrl: n, setApiUrl: S } = re();
    S(m.url);
    const g = pe({ adapter: "local", storages: [], dirname: ".", files: [] }), v = E(u("viewport", "grid")), _ = E(u("darkMode", m.dark));
    a.on("vf-darkMode-toggle", () => {
      _.value = !_.value, p("darkMode", _.value);
    }), a.on("vf-view-toggle", (P) => {
      v.value = P;
    });
    const k = pe({
      active: !1,
      type: "delete",
      data: {}
    });
    a.on("vf-modal-close", () => {
      k.active = !1;
    }), a.on("vf-modal-show", (P) => {
      k.active = !0, k.type = P.type, k.data = P;
    });
    const C = (P) => {
      Object.assign(g, P), a.emit("vf-nodes-selected", {}), a.emit("vf-explorer-update", P);
    };
    return a.on("vf-fetch", (P) => {
      De(n.value, { params: P }).then((I) => {
        a.emit("vf-modal-close"), C(I);
      });
    }), a.on("vf-download", (P) => {
      document.getElementById("download_frame").src = P, a.emit("vf-modal-close");
    }), Z(() => {
      a.emit("vf-fetch", { q: "index", adapter: u("adapter", g.adapter) });
    }), (P, I) => (y(), x("div", {
      class: ae(_.value ? "dark" : "")
    }, [
      s("div", {
        class: "relative border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none",
        onMousedown: I[0] || (I[0] = (B) => A(a).emit("vf-contextmenu-hide"))
      }, [
        te(jr),
        te(Bo, { data: g }, null, 8, ["data"]),
        te(_o, {
          view: v.value,
          data: g
        }, null, 8, ["view", "data"]),
        te(jo, { data: g }, null, 8, ["data"])
      ], 32),
      k.active ? (y(), H(tr("v-f-modal-" + k.type), {
        key: 0,
        selection: k.data,
        current: g
      }, null, 8, ["selection", "current"])) : W("", !0),
      te(Fo, { current: g }, null, 8, ["current"]),
      qo
    ], 2));
  }
}), Jo = /* @__PURE__ */ s("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Zo = { class: "fixed z-10 inset-0 overflow-y-auto" }, Xo = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full" }, Go = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Qo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Y = {
  __name: "ModalLayout",
  setup(h) {
    const m = inject("emitter");
    return Z(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus();
    }), (a, p) => (y(), x("div", {
      class: "v-f-modal relative z-20",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: p[1] || (p[1] = me((u) => A(m).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Jo,
      s("div", Zo, [
        s("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onClick: p[0] || (p[0] = ve((u) => A(m).emit("vf-modal-close"), ["self"]))
        }, [
          s("div", Xo, [
            s("div", Go, [
              Xe(a.$slots, "default")
            ]),
            s("div", Qo, [
              Xe(a.$slots, "buttons")
            ])
          ])
        ])
      ])
    ], 32));
  }
}, en = { class: "sm:flex sm:items-start" }, tn = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), rn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, on = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), nn = { class: "mt-2" }, sn = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), an = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ln = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cn = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), un = [
  cn
], dn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mn = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), hn = [
  mn
], fn = { class: "ml-1.5" }, gn = /* @__PURE__ */ s("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), vn = {
  name: "VFModalDelete"
}, pn = /* @__PURE__ */ Object.assign(vn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = E(m.selection.items), n = () => {
      u.value.length && a.emit("vf-fetch", {
        q: "delete",
        adapter: p("adapter", "local"),
        path: m.current.dirname,
        items: JSON.stringify(u.value.map(({ path: S, type: g }) => ({ path: S, type: g })))
      });
    };
    return (S, g) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        s("button", {
          type: "button",
          onClick: g[0] || (g[0] = (v) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        gn
      ]),
      default: K(() => [
        s("div", en, [
          tn,
          s("div", rn, [
            on,
            s("div", nn, [
              sn,
              (y(!0), x(R, null, X(u.value, (v) => (y(), x("p", an, [
                v.type == "dir" ? (y(), x("svg", ln, un)) : (y(), x("svg", dn, hn)),
                s("span", fn, T(v.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), yn = { class: "sm:flex sm:items-start" }, bn = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), _n = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, wn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sn = { class: "mt-2" }, xn = { class: "text-sm text-gray-500" }, kn = {
  name: "VFModalMessage"
}, Dn = /* @__PURE__ */ Object.assign(kn, {
  props: {
    selection: Object
  },
  setup(h) {
    const m = inject("emitter");
    return (a, p) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: p[0] || (p[0] = (u) => A(m).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: K(() => {
        var u, n, S, g;
        return [
          s("div", yn, [
            bn,
            s("div", _n, [
              s("h3", wn, T((n = (u = h.selection) == null ? void 0 : u.title) != null ? n : "Title"), 1),
              s("div", Sn, [
                s("p", xn, T((g = (S = h.selection) == null ? void 0 : S.message) != null ? g : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), $n = { class: "sm:flex sm:items-start" }, Cn = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), Pn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Mn = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), jn = { class: "mt-2" }, An = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), En = ["onKeyup"], Tn = {
  name: "VFModalNewFolder"
}, Vn = /* @__PURE__ */ Object.assign(Tn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = E(""), n = () => {
      u.value != "" && a.emit("vf-fetch", {
        q: "newfolder",
        adapter: p("adapter", "local"),
        path: m.current.dirname,
        name: u.value
      });
    };
    return (S, g) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        s("button", {
          type: "button",
          onClick: g[1] || (g[1] = (v) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", $n, [
          Cn,
          s("div", Pn, [
            Mn,
            s("div", jn, [
              An,
              J(s("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (v) => u.value = v),
                onKeyup: me(n, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, En), [
                [he, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), In = { class: "sm:flex sm:items-start" }, On = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ln = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nn = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), zn = { class: "mt-2" }, Kn = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), Bn = ["onKeyup"], Hn = {
  name: "VFModalNewFile"
}, Rn = /* @__PURE__ */ Object.assign(Hn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = E(""), n = () => {
      u.value != "" && a.emit("vf-fetch", {
        q: "newfile",
        adapter: p("adapter", "local"),
        path: m.current.dirname,
        name: u.value
      });
    };
    return (S, g) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        s("button", {
          type: "button",
          onClick: g[1] || (g[1] = (v) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", In, [
          On,
          s("div", Ln, [
            Nn,
            s("div", zn, [
              Kn,
              J(s("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (v) => u.value = v),
                onKeyup: me(n, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, Bn), [
                [he, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Un = { class: "flex" }, Fn = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qn = { class: "ml-auto mb-2" }, Wn = {
  key: 0,
  class: "p-2 border font-normal border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[100px] text-xs"
}, Yn = { key: 1 }, Jn = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: m }) {
    const a = h, p = E(""), u = E(""), n = E(null), S = E(!1), { apiUrl: g } = re();
    Z(() => {
      De(g.value, {
        params: { q: "preview", adapter: a.selection.adapter, path: a.selection.item.path },
        json: !1
      }).then((k) => {
        p.value = k, m("load");
      });
    });
    const v = () => {
      S.value = !S.value, u.value = p.value, S.value == !0 && $e(() => {
        n.value.focus();
      });
    }, _ = () => {
      De(g.value, {
        method: "POST",
        params: { q: "save", adapter: a.selection.adapter, path: a.selection.item.path, content: u.value },
        json: !1
      }).then((k) => {
        p.value = k, m("load"), S.value = !S.value;
      }).catch((k) => console.log(k.statusText));
    };
    return (k, C) => (y(), x(R, null, [
      s("div", Un, [
        s("div", Fn, T(h.selection.item.basename), 1),
        s("div", qn, [
          S.value ? (y(), x("button", {
            key: 0,
            onClick: _,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : W("", !0),
          s("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: C[0] || (C[0] = (P) => v())
          }, T(S.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      s("div", null, [
        S.value ? (y(), x("div", Yn, [
          J(s("textarea", {
            ref: (P) => n.value = P,
            "onUpdate:modelValue": C[1] || (C[1] = (P) => u.value = P),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [he, u.value]
          ])
        ])) : (y(), x("pre", Wn, T(p.value), 1))
      ])
    ], 64));
  }
}, Zn = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Xn = { class: "w-full flex justify-center" }, Gn = ["src"], Qn = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: m }) {
    const a = h, { apiUrl: p } = re(), u = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return onMounted(() => {
      m("load");
    }), (n, S) => (y(), x(R, null, [
      s("h3", Zn, T(h.selection.item.basename), 1),
      s("div", Xn, [
        s("img", {
          class: "max-w-[350px] max-h-[350px]",
          src: u(),
          alt: ""
        }, null, 8, Gn)
      ])
    ], 64));
  }
}, es = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ts = /* @__PURE__ */ s("div", null, " Default view.. ", -1), rs = {
  __name: "Default",
  emits: ["load"],
  setup(h, { emit: m }) {
    return Z(() => {
      m("load");
    }), (a, p) => (y(), x(R, null, [
      s("h3", es, T(a.selection.item.basename), 1),
      ts
    ], 64));
  }
}, os = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ns = {
  class: "w-full",
  preload: "",
  controls: ""
}, ss = ["src"], is = /* @__PURE__ */ de(" Your browser does not support the video tag. "), as = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: m }) {
    const a = h, { apiUrl: p } = re(), u = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Z(() => {
      m("load");
    }), (n, S) => (y(), x(R, null, [
      s("h3", os, T(h.selection.item.basename), 1),
      s("div", null, [
        s("video", ns, [
          s("source", {
            src: u(),
            type: "video/mp4"
          }, null, 8, ss),
          is
        ])
      ])
    ], 64));
  }
}, ls = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, cs = {
  class: "w-full",
  controls: ""
}, us = ["src"], ds = /* @__PURE__ */ de(" Your browser does not support the audio element. "), ms = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: m }) {
    const a = h, { apiUrl: p } = re(), u = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Z(() => {
      m("load");
    }), (n, S) => (y(), x(R, null, [
      s("h3", ls, T(h.selection.item.basename), 1),
      s("div", null, [
        s("audio", cs, [
          s("source", {
            src: u(),
            type: "audio/mpeg"
          }, null, 8, us),
          ds
        ])
      ])
    ], 64));
  }
}, hs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fs = ["data"], gs = ["src"], vs = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(h, { emit: m }) {
    const a = h, { apiUrl: p } = re(), u = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Z(() => {
      m("load");
    }), (n, S) => (y(), x(R, null, [
      s("h3", hs, T(h.selection.item.basename), 1),
      s("div", null, [
        s("object", {
          data: u(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          s("iframe", {
            class: "border-0",
            src: u(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, gs)
        ], 8, fs)
      ])
    ], 64));
  }
}, ps = { class: "sm:flex sm:items-start" }, ys = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, bs = { class: "text-gray-700 dark:text-gray-200 text-sm" }, _s = {
  key: 0,
  class: "flex leading-5"
}, ws = /* @__PURE__ */ s("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ s("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ s("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Ss = /* @__PURE__ */ s("span", null, "Loading", -1), xs = [
  ws,
  Ss
], ks = {
  name: "VFModalPreview"
}, Ds = /* @__PURE__ */ Object.assign(ks, {
  props: {
    selection: Object
  },
  setup(h) {
    const m = h, { apiUrl: a } = re(), p = inject("emitter"), u = E(!1), n = (g) => {
      var v;
      return ((v = m.selection.item.mime_type) != null ? v : "").startsWith(g);
    }, S = () => {
      const g = a.value + "?" + le({ q: "download", adapter: m.selection.adapter, path: m.selection.item.path });
      p.emit("vf-download", g);
    };
    return (g, v) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: v[6] || (v[6] = (_) => A(p).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        s("button", {
          type: "button",
          onClick: v[7] || (v[7] = (_) => S()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: K(() => [
        s("div", ps, [
          s("div", ys, [
            s("div", null, [
              n("text") ? (y(), H(Jn, {
                key: 0,
                selection: h.selection,
                onLoad: v[0] || (v[0] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("image") ? (y(), H(Qn, {
                key: 1,
                selection: h.selection,
                onLoad: v[1] || (v[1] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("video") ? (y(), H(as, {
                key: 2,
                selection: h.selection,
                onLoad: v[2] || (v[2] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("audio") ? (y(), H(ms, {
                key: 3,
                selection: h.selection,
                onLoad: v[3] || (v[3] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : n("application/pdf") ? (y(), H(vs, {
                key: 4,
                selection: h.selection,
                onLoad: v[4] || (v[4] = (_) => u.value = !0)
              }, null, 8, ["selection"])) : (y(), H(rs, {
                key: 5,
                selection: h.selection,
                onLoad: v[5] || (v[5] = (_) => u.value = !0)
              }, null, 8, ["selection"]))
            ]),
            s("div", bs, [
              s("p", null, T(h.selection.item.path), 1),
              s("p", null, "mime_type: " + T(h.selection.item.mime_type), 1),
              u.value == !1 ? (y(), x("div", _s, xs)) : W("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $s = { class: "sm:flex sm:items-start" }, Cs = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), Ps = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ms = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, js = { class: "mt-2" }, As = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Es = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ts = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Vs = [
  Ts
], Is = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Os = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ls = [
  Os
], Ns = { class: "ml-1.5" }, zs = ["onKeyup"], Ks = {
  name: "VFModalRename"
}, Bs = /* @__PURE__ */ Object.assign(Ks, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = E(m.selection.items[0]), n = E(m.selection.items[0].basename), S = () => {
      n.value != "" && a.emit("vf-fetch", {
        q: "rename",
        adapter: p("adapter", "local"),
        path: m.current.dirname,
        item: u.value.path,
        name: n.value
      });
    };
    return (g, v) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: S,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        s("button", {
          type: "button",
          onClick: v[1] || (v[1] = (_) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", $s, [
          Cs,
          s("div", Ps, [
            s("h3", Ms, "Rename your " + T(u.value.type == "dir" ? "folder" : "file"), 1),
            s("div", js, [
              s("p", As, [
                u.value.type == "dir" ? (y(), x("svg", Es, Vs)) : (y(), x("svg", Is, Ls)),
                s("span", Ns, T(u.value.basename), 1)
              ]),
              J(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (_) => n.value = _),
                onKeyup: me(S, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, zs), [
                [he, n.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hs = /* @__PURE__ */ s("div", { class: "sm:flex sm:items-start" }, [
  /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
    /* @__PURE__ */ s("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "none",
      "stroke-width": "1.5"
    }, [
      /* @__PURE__ */ s("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      })
    ])
  ]),
  /* @__PURE__ */ s("div", { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, [
    /* @__PURE__ */ s("h3", {
      class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
      id: "modal-title"
    }, "Upload files"),
    /* @__PURE__ */ s("div", { class: "mt-2" }, [
      /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Upload files ")
    ])
  ])
], -1), Rs = /* @__PURE__ */ s("button", {
  type: "button",
  class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
}, "Yes, upload!", -1), Us = {
  name: "VFModalUpload"
}, Fs = /* @__PURE__ */ Object.assign(Us, {
  setup(h) {
    const m = inject("emitter");
    return (a, p) => (y(), H(Y, null, {
      buttons: K(() => [
        Rs,
        s("button", {
          type: "button",
          onClick: p[0] || (p[0] = (u) => A(m).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        Hs
      ]),
      _: 1
    }));
  }
}), qs = { class: "sm:flex sm:items-start" }, Ws = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    })
  ])
], -1), Ys = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Js = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Zs = { class: "mt-2" }, Xs = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Gs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qs = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ei = [
  Qs
], ti = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ri = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), oi = [
  ri
], ni = { class: "ml-1.5" }, si = /* @__PURE__ */ s("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), ii = ["onKeyup"], ai = {
  name: "VFModalArchive"
}, li = /* @__PURE__ */ Object.assign(ai, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = E(""), n = E(m.selection.items), S = () => {
      n.value.length && a.emit("vf-fetch", {
        q: "archive",
        adapter: p("adapter", "local"),
        path: m.current.dirname,
        items: JSON.stringify(n.value.map(({ path: g, type: v }) => ({ path: g, type: v }))),
        name: u.value
      });
    };
    return (g, v) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: S,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        s("button", {
          type: "button",
          onClick: v[1] || (v[1] = (_) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", qs, [
          Ws,
          s("div", Ys, [
            Js,
            s("div", Zs, [
              (y(!0), x(R, null, X(n.value, (_) => (y(), x("p", Xs, [
                _.type == "dir" ? (y(), x("svg", Gs, ei)) : (y(), x("svg", ti, oi)),
                s("span", ni, T(_.basename), 1)
              ]))), 256)),
              si,
              J(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (_) => u.value = _),
                onKeyup: me(S, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, ii), [
                [he, u.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ci = { class: "sm:flex sm:items-start" }, ui = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    })
  ])
], -1), di = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, mi = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), hi = { class: "mt-2" }, fi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, gi = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vi = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pi = [
  vi
], yi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bi = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), _i = [
  bi
], wi = { class: "ml-1.5" }, Si = { class: "my-1 text-sm text-gray-500" }, xi = {
  name: "VFModalUnarchive"
}, ki = /* @__PURE__ */ Object.assign(xi, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage");
    E("");
    const u = E(m.selection.items[0]), n = E([]), S = () => {
      a.emit("vf-fetch", {
        q: "unarchive",
        adapter: p("adapter", "local"),
        path: m.current.dirname,
        item: u.value.path
      });
    };
    return (g, v) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: S,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        s("button", {
          type: "button",
          onClick: v[0] || (v[0] = (_) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", ci, [
          ui,
          s("div", di, [
            mi,
            s("div", hi, [
              (y(!0), x(R, null, X(n.value, (_) => (y(), x("p", fi, [
                _.type == "dir" ? (y(), x("svg", gi, pi)) : (y(), x("svg", yi, _i)),
                s("span", wi, T(_.basename), 1)
              ]))), 256)),
              s("p", Si, "Archive will be unarchived at (" + T(h.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Di = { class: "sm:flex sm:items-start" }, $i = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Ci = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Pi = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), Mi = { class: "mt-2" }, ji = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ai = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ei = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ti = [
  Ei
], Vi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ii = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oi = [
  Ii
], Li = { class: "ml-1.5" }, Ni = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), zi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ki = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Bi = { class: "ml-1.5 overflow-auto" }, Hi = {
  name: "VFModalMove"
}, Ri = /* @__PURE__ */ Object.assign(Hi, {
  props: {
    selection: Object,
    current: Object
  },
  setup(h) {
    const m = h, a = inject("emitter"), { getStore: p } = inject("storage"), u = E(m.selection.items.from), n = () => {
      u.value.length && a.emit("vf-fetch", {
        q: "move",
        adapter: p("adapter", "local"),
        path: m.current.dirname,
        items: JSON.stringify(u.value.map(({ path: S, type: g }) => ({ path: S, type: g }))),
        item: m.selection.items.to.path
      });
    };
    return (S, g) => (y(), H(Y, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        s("button", {
          type: "button",
          onClick: g[0] || (g[0] = (v) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", Di, [
          $i,
          s("div", Ci, [
            Pi,
            s("div", Mi, [
              (y(!0), x(R, null, X(u.value, (v) => (y(), x("p", ji, [
                v.type == "dir" ? (y(), x("svg", Ai, Ti)) : (y(), x("svg", Vi, Oi)),
                s("span", Li, T(v.path), 1)
              ]))), 256)),
              Ni,
              s("p", zi, [
                Ki,
                s("span", Bi, T(h.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ui = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: pn,
  ModalMessage: Dn,
  ModalNewFolder: Vn,
  ModalNewFile: Rn,
  ModalPreview: Ds,
  ModalRename: Bs,
  ModalUpload: Fs,
  ModalArchive: li,
  ModalUnarchive: ki,
  ModalMove: Ri
}, Symbol.toStringTag, { value: "Module" })), ke = {
  VueFinder: Yo,
  ...Ui
};
const qi = {
  install(h) {
    for (const m in ke)
      if (ke.hasOwnProperty(m)) {
        const a = ke[m];
        h.component(a.name, a);
      }
  }
};
export {
  qi as default
};
