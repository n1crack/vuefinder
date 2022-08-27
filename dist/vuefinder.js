import { ref as E, watch as Ge, openBlock as b, createElementBlock as S, createElementVNode as s, unref as A, normalizeClass as ae, createCommentVNode as q, createStaticVNode as Gt, reactive as ve, onMounted as Y, withDirectives as te, createVNode as ee, vShow as Se, toDisplayString as T, withModifiers as ge, Fragment as J, renderList as Z, createTextVNode as de, nextTick as Qe, vModelSelect as Qt, normalizeStyle as er, provide as Ye, createBlock as H, resolveDynamicComponent as tr, withKeys as me, renderSlot as Je, withCtx as K, vModelText as pe } from "vue";
const et = (f, { method: d = "get", params: a = {}, json: p = !0 }) => {
  const m = { method: d };
  return d == "get" ? f += "?" + new URLSearchParams(a) : m.body = a, p ? fetch(f, m).then((n) => n.json()) : fetch(f, m);
};
function rr(f) {
  return { all: f = f || /* @__PURE__ */ new Map(), on: function(d, a) {
    var p = f.get(d);
    p ? p.push(a) : f.set(d, [a]);
  }, off: function(d, a) {
    var p = f.get(d);
    p && (a ? p.splice(p.indexOf(a) >>> 0, 1) : f.set(d, []));
  }, emit: function(d, a) {
    var p = f.get(d);
    p && p.slice().map(function(m) {
      m(a);
    }), (p = f.get("*")) && p.slice().map(function(m) {
      m(d, a);
    });
  } };
}
function Ze(f) {
  let d = localStorage.getItem(f + "_storage");
  const a = E(JSON.parse(d));
  Ge(a, p);
  function p() {
    a.value === null || a.value === "" ? localStorage.removeItem(f + "_storage") : localStorage.setItem(f + "_storage", JSON.stringify(a.value));
  }
  function m(v, g) {
    a.value = Object.assign({ ...a.value }, { [v]: g });
  }
  function n() {
    a.value = null;
  }
  return { getStore: (v, g = null) => a.value === null || a.value === "" ? g : a.value.hasOwnProperty(v) ? a.value[v] : g, setStore: m, clearStore: n };
}
const Xe = E("");
function re() {
  function f(d) {
    Xe.value = d;
  }
  return { apiUrl: Xe, setApiUrl: f };
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
], kr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, xr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
}, null, -1), Dr = [
  xr
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
  setup(f) {
    const d = inject("emitter"), { getStore: a, setStore: p } = inject("storage"), m = E(a("viewport", "grid")), n = E([]);
    return d.on("vf-nodes-selected", (k) => {
      n.value = k;
    }), d.on("vf-view-toggle", (k) => {
      p("viewport", k), m.value = k;
    }), (k, v) => (b(), S("div", or, [
      s("div", nr, [
        s("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[0] || (v[0] = (g) => A(d).emit("vf-modal-show", { type: "new-folder", items: n.value }))
        }, ir),
        s("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[1] || (v[1] = (g) => A(d).emit("vf-modal-show", { type: "new-file", items: n.value }))
        }, lr),
        s("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[2] || (v[2] = (g) => n.value.length != 1 || A(d).emit("vf-modal-show", { type: "rename", items: n.value }))
        }, [
          (b(), S("svg", {
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
          onClick: v[3] || (v[3] = (g) => !n.value.length || A(d).emit("vf-modal-show", { type: "delete", items: n.value }))
        }, [
          (b(), S("svg", {
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
          onClick: v[4] || (v[4] = (g) => A(d).emit("vf-modal-show", { type: "upload", items: n.value }))
        }, fr),
        n.value.length == 1 && n.value[0].mime_type == "application/zip" ? (b(), S("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[5] || (v[5] = (g) => !n.value.length || A(d).emit("vf-modal-show", { type: "unarchive", items: n.value }))
        }, [
          (b(), S("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ae([n.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, vr, 2))
        ])) : (b(), S("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[6] || (v[6] = (g) => !n.value.length || A(d).emit("vf-modal-show", { type: "archive", items: n.value }))
        }, [
          (b(), S("svg", {
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
          (b(), S("svg", {
            onClick: v[7] || (v[7] = (g) => A(d).emit("vf-darkMode-toggle")),
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
          onClick: v[8] || (v[8] = (g) => A(d).emit("vf-view-toggle", m.value == "list" ? "grid" : "list"))
        }, [
          m.value == "grid" ? (b(), S("svg", kr, Dr)) : q("", !0),
          m.value == "list" ? (b(), S("svg", $r, Pr)) : q("", !0)
        ])
      ])
    ]));
  }
});
var Ar = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, tt = { exports: {} };
(function(f, d) {
  (function(a, p) {
    f.exports = p();
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
    function m(o, t, e) {
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
    function k(o, t) {
      var e = Object.keys(o);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(o);
        t && (i = i.filter(function(r) {
          return Object.getOwnPropertyDescriptor(o, r).enumerable;
        })), e.push.apply(e, i);
      }
      return e;
    }
    function v(o) {
      for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2 ? k(Object(e), !0).forEach(function(i) {
          n(o, i, e[i]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e)) : k(Object(e)).forEach(function(i) {
          Object.defineProperty(o, i, Object.getOwnPropertyDescriptor(e, i));
        });
      }
      return o;
    }
    function g(o, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function");
      o.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: o,
          writable: !0,
          configurable: !0
        }
      }), t && x(o, t);
    }
    function _(o) {
      return _ = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      }, _(o);
    }
    function x(o, t) {
      return x = Object.setPrototypeOf || function(i, r) {
        return i.__proto__ = r, i;
      }, x(o, t);
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
    function M(o, t, e) {
      return C() ? M = Reflect.construct : M = function(r, l, c) {
        var u = [null];
        u.push.apply(u, l);
        var h = Function.bind.apply(r, u), w = new h();
        return c && x(w, c.prototype), w;
      }, M.apply(null, arguments);
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
          return M(i, arguments, _(this).constructor);
        }
        return r.prototype = Object.create(i.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), x(r, i);
      }, B(o);
    }
    function L(o) {
      if (o === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return o;
    }
    function oe(o, t) {
      return t && (typeof t == "object" || typeof t == "function") ? t : L(o);
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
    function De(o, t) {
      for (; !Object.prototype.hasOwnProperty.call(o, t) && (o = _(o), o !== null); )
        ;
      return o;
    }
    function $(o, t, e) {
      return typeof Reflect < "u" && Reflect.get ? $ = Reflect.get : $ = function(r, l, c) {
        var u = De(r, l);
        if (!!u) {
          var h = Object.getOwnPropertyDescriptor(u, l);
          return h.get ? h.get.call(c) : h.value;
        }
      }, $(o, t, e || o);
    }
    function V(o, t) {
      return N(o) || G(o, t) || $e(o, t) || ot();
    }
    function P(o) {
      return F(o) || X(o) || $e(o) || rt();
    }
    function F(o) {
      if (Array.isArray(o))
        return ye(o);
    }
    function N(o) {
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
          for (var c = o[Symbol.iterator](), u; !(i = (u = c.next()).done) && (e.push(u.value), !(t && e.length === t)); i = !0)
            ;
        } catch (h) {
          r = !0, l = h;
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
    function $e(o, t) {
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
    var R = function(t, e, i) {
      var r = t.x, l = t.y, c = i.x, u = i.y, h = {
        "+": {
          x: r + c,
          y: l + u
        },
        "-": {
          x: r - c,
          y: l - u
        },
        "*": {
          x: r * c,
          y: l * u
        },
        "/": {
          x: r / c,
          y: l / u
        }
      };
      return h[e];
    }, ne = function(t) {
      return {
        x: t.left,
        y: t.top
      };
    }, Ce = function(t) {
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
      var t = he(o);
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
    }, he = function(o) {
      return !o || o instanceof Document ? be() : {
        x: o.scrollLeft >= 0 ? o.scrollLeft : be().x,
        y: o.scrollTop >= 0 ? o.scrollTop : be().y
      };
    }, Pe = function(o) {
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
    }, Me = function(t) {
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
        var u = i.transform.trim().match(/matrix\((.*?)\)/);
        if (u && u.length) {
          var h, w = (h = u[1]) === null || h === void 0 ? void 0 : h.split(",");
          e.x = parseInt(w[4]) || 0, e.y = parseInt(w[5]) || 0;
        }
        return e;
      }
    }, ht = function(t) {
      var e = t.style.transform;
      if (!e || e.indexOf("translate") < 0)
        return Me(t);
      var i = {
        x: 0,
        y: 0
      }, r = e.trim().match(/translate[3dD]*?\(.*?\)/);
      if (r) {
        var l, c = (l = r[0]) === null || l === void 0 ? void 0 : l.split("(");
        if (c) {
          var u, h = (u = c[1]) === null || u === void 0 ? void 0 : u.split(",");
          i.x = parseInt(h[0]) || 0, i.y = parseInt(h[1]) || 0;
        }
      }
      return !i.x && !i.x ? Me(t) : i;
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
    }, je = function(o) {
      var t = o.computedStyle, e = o.node, i = t.position, r = i === "absolute" || i === "relative" || i === "fixed";
      !(e instanceof HTMLDocument) && !r && (e.style.position = "relative");
    }, pt = function(o) {
      var t = o.shiftKey, e = o.keyboardDragSpeed, i = o.zoom, r = o.key, l = o.dragKeys, c = o.scrollDiff, u = o.canScroll, h = o.scrollCallback, w = {
        x: 0,
        y: 0
      }, y = t ? e * 4 * i : e * i;
      return l.left.includes(r) && (w.x = c.x || -y, !t && !c.x && u && h(["left"], e)), l.right.includes(r) && (w.x = c.x || y, !t && !c.x && u && h(["right"], e)), l.up.includes(r) && (w.y = c.y || -y, !t && !c.y && u && h(["top"], e)), l.down.includes(r) && (w.y = c.y || y, !t && !c.y && u && h(["bottom"], e)), w;
    }, yt = function(o) {
      var t = o.element, e = o.force, i = o.multiSelectionToggle, r = o.SelectedSet, l = o.hoverClassName;
      t.classList.contains(l) && !e || (r.has(t) ? i && r.delete(t) : r.add(t), t.classList.add(l));
    }, bt = function(o) {
      var t = o.element, e = o.force, i = o.SelectedSet, r = o.PrevSelectedSet, l = o.hoverClassName;
      if (!t.classList.contains(l) && !e)
        return !1;
      var c = i.has(t), u = r.has(t);
      c && !u ? i.delete(t) : !c && u && i.add(t), t.classList.remove(l);
    }, _e = function(o, t) {
      return o.left < t.right && o.right > t.left && o.top < t.bottom && o.bottom > t.top;
    }, Ae = function(o) {
      var t = o.element, e = o.posDirection, i = o.containerRect, r = o.useTransform, l = gt(t, r), c = R(l, "+", e);
      ue(t, c, r);
      var u = t.getBoundingClientRect(), h = Pe({
        elementRect: u,
        containerRect: i
      });
      vt({
        element: t,
        edges: h,
        elementRect: u,
        containerRect: i,
        elementPos: c,
        useTransform: r
      });
    }, _t = function(o, t) {
      window.removeEventListener("resize", t), window.removeEventListener("scroll", t), o.disconnect();
    }, wt = function(o, t, e) {
      if (!!t.length) {
        var i = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, r = o instanceof HTMLDocument ? i || document.body : o, l = t.includes("top") && r.scrollTop > 0, c = t.includes("bottom") && r.scrollTop < r.scrollHeight, u = t.includes("left") && r.scrollLeft > 0, h = t.includes("right") && r.scrollLeft < r.scrollWidth;
        l && (r.scrollTop -= 1 * e), c && (r.scrollTop += 1 * e), u && (r.scrollLeft -= 1 * e), h && (r.scrollLeft += 1 * e);
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
          condition: function(y) {
            return y.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, c = function() {
        var y = V(h[u], 2), D = y[0], j = y[1];
        ["pre", !1].forEach(function(O) {
          return t(O ? "".concat(D, ":").concat(O) : D, function(U) {
            return j.forEach(function(z) {
              return (!z.condition || z.condition(U)) && e(O ? "".concat(O).concat(z.name) : z.name, v({
                items: r.elements,
                isDragging: i.isDragging
              }, U));
            });
          });
        });
      }, u = 0, h = Object.entries(l); u < h.length; u++)
        c();
    }, se = function(o) {
      return o ? !Array.isArray(o) && (o instanceof HTMLElement || o instanceof SVGElement) ? [o] : P(o) : [];
    }, Ee = function(o, t) {
      o.style.left = "".concat(t.left, "px"), o.style.top = "".concat(t.top, "px"), o.style.width = "".concat(t.width, "px"), o.style.height = "".concat(t.height, "px");
    }, kt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = t.PS, l = t.zoom;
        a(this, o), n(this, "_modificationCallback", void 0), n(this, "_modificationObserver", void 0), n(this, "_zoom", void 0), n(this, "_node", void 0), n(this, "_parentNodes", void 0), n(this, "_computedStyle", void 0), n(this, "_computedBorder", void 0), n(this, "_rect", void 0), n(this, "setArea", function(c) {
          e._node = c, je({
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
        }), n(this, "scroll", function(c, u) {
          var h = {
            scroll_directions: c,
            scroll_multiplier: u
          };
          e.PubSub.publish("Area:scroll:pre", h), wt(e._node, c, u), e.PubSub.publish("Area:scroll", h);
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
      return m(o, [{
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
            var l, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, u = (l = r[c]) === null || l === void 0 ? void 0 : l.parentNode;
            return u ? (r.push(u), c++, i(r, c)) : r;
          };
          return this._parentNodes = e([this.HTMLNode]), this._parentNodes;
        }
      }]), o;
    }(), xt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.dragKeys, l = t.draggability, c = t.keyboardDrag, u = t.keyboardDragSpeed, h = t.useTransform, w = t.zoom;
        a(this, o), n(this, "_useTransform", void 0), n(this, "_prevCursorPos", void 0), n(this, "_prevScrollPos", void 0), n(this, "_elements", []), n(this, "_draggability", void 0), n(this, "_dragKeys", void 0), n(this, "_dragKeysFlat", void 0), n(this, "_keyboardDrag", void 0), n(this, "_keyboardDragSpeed", void 0), n(this, "_zoom", void 0), n(this, "keyboardDrag", function(y) {
          var D = y.event, j = y.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(j) || !e.DS.SelectedSet.size || !e._draggability || e.DS.continue)) {
            var O = {
              event: D,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:start:pre", "Interaction:start"], O), e._elements = e.DS.getSelection(), e.handleZIndex(!0);
            var U = pt({
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
              return Ae({
                element: z,
                posDirection: U,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            }), e.DS.publish(["Interaction:update:pre", "Interaction:update"], O);
          }
        }), n(this, "keyboardEnd", function(y) {
          var D = y.event, j = y.key;
          if (!(!e._keyboardDrag || !e._dragKeysFlat.includes(j) || !e.DS.SelectedSet.size || !e._draggability)) {
            var O = {
              event: D,
              isDragging: e._draggability,
              isDraggingKeyboard: !0
            };
            e.DS.publish(["Interaction:end:pre", "Interaction:end"], O);
          }
        }), n(this, "start", function(y) {
          var D = y.isDragging, j = y.isDraggingKeyboard;
          !D || j || (e._prevCursorPos = null, e._prevScrollPos = null, e._elements = e.DS.getSelection(), e.handleZIndex(!0));
        }), n(this, "stop", function(y) {
          y != null && y.isKeyboard || (e._prevCursorPos = null, e._prevScrollPos = null, e.handleZIndex(!1), e._elements = []);
        }), n(this, "update", function(y) {
          var D = y.isDragging, j = y.isDraggingKeyboard;
          if (!(!D || !e._elements.length || j || e.DS.continue)) {
            var O = R(e._cursorDiff, "+", e._scrollDiff);
            e._elements.forEach(function(U) {
              return Ae({
                element: U,
                posDirection: O,
                containerRect: e.DS.SelectorArea.rect,
                useTransform: e._useTransform
              });
            });
          }
        }), n(this, "handleZIndex", function(y) {
          e._elements.forEach(function(D) {
            return D.style.zIndex = "".concat((parseInt(D.style.zIndex) || 0) + y ? 9999 : -9998);
          });
        }), this.DS = i, this._useTransform = h, this._keyboardDragSpeed = u, this._keyboardDrag = c, this._zoom = w, this._draggability = l, this._dragKeys = {
          up: r.up.map(function(y) {
            return y.toLowerCase();
          }),
          down: r.down.map(function(y) {
            return y.toLowerCase();
          }),
          left: r.left.map(function(y) {
            return y.toLowerCase();
          }),
          right: r.right.map(function(y) {
            return y.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(P(this._dragKeys.up), P(this._dragKeys.down), P(this._dragKeys.left), P(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return m(o, [{
        key: "_cursorDiff",
        get: function() {
          var e = this.DS.stores.PointerStore.currentVal, i = this._prevCursorPos ? R(e, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = e, i;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var e = this.DS.stores.ScrollStore.currentVal, i = this._prevScrollPos ? R(e, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = e, i;
        }
      }]), o;
    }(), Dt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.draggability, c = t.immediateDrag, u = t.selectableClass;
        a(this, o), n(this, "_areaElement", void 0), n(this, "_draggability", void 0), n(this, "_immediateDrag", void 0), n(this, "_selectableClass", void 0), n(this, "isInteracting", void 0), n(this, "isDragging", void 0), n(this, "init", function() {
          return e.DS.publish("Interaction:init:pre", {});
        }), n(this, "_init", function() {
          e.stop(), e._areaElement.addEventListener("mousedown", e.start), e._areaElement.addEventListener("touchstart", e.start, {
            passive: !1
          }), e.DS.publish("Interaction:init", {});
        }), n(this, "start", function(h) {
          return e.DS.publish("Interaction:start:pre", {
            event: h,
            isDragging: e.isDragging
          });
        }), n(this, "_start", function(h) {
          h.type === "touchstart" && h.preventDefault(), e._canInteract(h) && (e.isInteracting = !0, e.isDragging = e.isDragEvent(h), e.DS.publish("Interaction:start", {
            event: h,
            isDragging: e.isDragging
          }), document.addEventListener("mouseup", e.reset), document.addEventListener("touchend", e.reset));
        }), n(this, "isDragEvent", function(h) {
          var w = h.target.closest(".".concat(e._selectableClass));
          return !e._draggability || e.DS.stores.KeyStore.isMultiSelectKeyPressed(h) || !w ? !1 : (e._immediateDrag && (e.DS.SelectedSet.size ? e.DS.SelectedSet.has(w) || (e.DS.SelectedSet.clear(), e.DS.SelectedSet.add(
            w
          )) : e.DS.SelectedSet.add(
            w
          )), !!e.DS.SelectedSet.has(w));
        }), n(this, "onClick", function(h) {
          var w = h.event;
          if (!!e._canInteract(w) && !(w.detail > 0)) {
            var y = e.DS, D = y.stores, j = D.PointerStore, O = D.KeyStore, U = y.SelectableSet, z = y.SelectedSet;
            j.start(w);
            var ie = w.target;
            !U.has(ie) || (O.isMultiSelectKeyPressed(w) || z.clear(), z.toggle(ie), e.reset());
          }
        }), n(this, "stop", function() {
          e.isInteracting = !1, e.isDragging = !1, e._areaElement.removeEventListener("mousedown", e.start), e._areaElement.removeEventListener("touchstart", e.start, {
            passive: !1
          }), document.removeEventListener("mouseup", e.reset), document.removeEventListener("touchend", e.reset);
        }), n(this, "update", function(h) {
          var w = h.event, y = h.scroll_directions, D = h.scroll_multiplier;
          e.isInteracting && e.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: w,
            scroll_directions: y,
            scroll_multiplier: D,
            isDragging: e.isDragging
          });
        }), n(this, "reset", function(h) {
          return e.DS.publish("Interaction:end:pre", {
            event: h,
            isDragging: e.isDragging
          });
        }), n(this, "_reset", function(h) {
          var w = e.isDragging;
          e.stop(), e.init(), e.DS.publish("Interaction:end", {
            event: h,
            isDragging: w
          });
        }), this._areaElement = r, this._draggability = l, this._immediateDrag = c, this._selectableClass = u, this.DS = i, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(h) {
          var w = h.event;
          return e.start(w);
        }), this.DS.subscribe("Interaction:start:pre", function(h) {
          var w = h.event;
          return e._start(w);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(h) {
          var w = h.event;
          return e._reset(w);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return m(o, [{
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
        c >= 0 ? e.subscribers[r].splice(c, 1) : l && (e.subscribers[r] = e.subscribers[r].filter(function(u) {
          return u !== l;
        }));
      }), n(this, "publish", function(r, l) {
        Array.isArray(r) ? r.forEach(function(c) {
          return e._publish(c, l);
        }) : e._publish(r, l);
      }), n(this, "_publish", function(r, l) {
        var c = e.subscribers[r];
        !Array.isArray(c) || (r.includes(":pre") ? e._handlePrePublish(c, l) : e._handlePublish(c, l));
      }), n(this, "_handlePublish", function(r, l) {
        for (var c = 0, u = r.length; c < u; c++) {
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
      g(e, o);
      var t = ce(e);
      function e(i) {
        var r, l = i.elements, c = i.className, u = i.hoverClassName, h = i.draggability, w = i.useTransform, y = i.DS;
        return a(this, e), r = t.call(this), n(L(r), "_initElements", void 0), n(L(r), "_className", void 0), n(L(r), "_hoverClassName", void 0), n(L(r), "_useTransform", void 0), n(L(r), "_draggability", void 0), n(L(r), "init", function() {
          return r._initElements.forEach(function(D) {
            return r.add(D);
          });
        }), n(L(r), "clear", function() {
          return r.forEach(function(D) {
            return r.delete(D);
          });
        }), n(L(r), "_onClick", function(D) {
          return r.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: D
          });
        }), n(L(r), "_onPointer", function(D) {
          return r.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: D
          });
        }), n(L(r), "addAll", function(D) {
          return D.forEach(function(j) {
            return r.add(j);
          });
        }), n(L(r), "deleteAll", function(D) {
          return D.forEach(function(j) {
            return r.delete(j);
          });
        }), r.DS = y, r._initElements = se(l), r._className = c, r._hoverClassName = u, r._useTransform = w, r._draggability = h, r.DS.subscribe("Interaction:init", r.init), r;
      }
      return m(e, [{
        key: "add",
        value: function(r) {
          return r.classList.add(this._className), r.addEventListener("click", this._onClick), r.addEventListener("mousedown", this._onPointer), r.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && je({
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
      g(e, o);
      var t = ce(e);
      function e(i) {
        var r, l = i.className, c = i.DS;
        return a(this, e), r = t.call(this), n(L(r), "_className", void 0), n(L(r), "clear", function() {
          return r.forEach(function(u) {
            return r.delete(u);
          });
        }), n(L(r), "addAll", function(u) {
          return u.forEach(function(h) {
            return r.add(h);
          });
        }), n(L(r), "deleteAll", function(u) {
          return u.forEach(function(h) {
            return r.delete(h);
          });
        }), r.DS = c, r._className = l, r;
      }
      return m(e, [{
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
          var u = c.event, h = c.isDragging;
          h || (e._storePrevious(u), e._handleInsideSelection(!0, u));
        }), n(this, "update", function(c) {
          var u = c.isDragging;
          u || e.DS.continue || e._handleInsideSelection();
        }), n(this, "_handleInsideSelection", function(c, u) {
          for (var h = e.DS, w = h.SelectableSet, y = h.SelectorArea, D = h.Selector, j = w.elements.map(function(Q) {
            return [Q, Q.getBoundingClientRect()];
          }), O = [], U = [], z = 0, ie = j.length; z < ie; z++)
            !y.isInside(j[z][0], j[z][1]) || (_e(j[z][1], D.rect) ? O.push(j[z][0]) : U.push(j[z][0]));
          var fe = e.DS.stores.KeyStore.isMultiSelectKeyPressed(u) && e._multiSelectToggling;
          e.DS.continue || (O.forEach(function(Q) {
            return yt({
              element: Q,
              force: c,
              multiSelectionToggle: fe,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName
            });
          }), U.forEach(function(Q) {
            return bt({
              element: Q,
              force: c,
              SelectedSet: e.DS.SelectedSet,
              hoverClassName: e._hoverClassName,
              PrevSelectedSet: e._prevSelectedSet
            });
          }));
        }), this._hoverClassName = r, this._multiSelectToggling = l, this.DS = i, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return m(o, [{
        key: "_storePrevious",
        value: function(e) {
          var i = this.DS, r = i.stores.KeyStore, l = i.SelectedSet;
          r.isMultiSelectKeyPressed(e) ? this._prevSelectedSet = new Set(l) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), o;
    }(), jt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.selector, l = t.selectorClass, c = t.customStyles;
        a(this, o), n(this, "_rect", void 0), n(this, "start", function(u) {
          var h = u.isDragging;
          if (!h) {
            var w = e.DS.stores.PointerStore, y = w.initialValArea;
            Ee(e.HTMLNode, Ce(y, 1)), e.HTMLNode.style.display = "block", e._rect = null;
          }
        }), n(this, "stop", function() {
          e.HTMLNode.style.width = "0", e.HTMLNode.style.height = "0", e.HTMLNode.style.display = "none";
        }), n(this, "update", function(u) {
          var h = u.isDragging;
          if (!(h || e.DS.continue)) {
            var w = e.DS.stores, y = w.ScrollStore, D = w.PointerStore, j = mt({
              scrollAmount: y.scrollAmount,
              initialPointerPos: D.initialValArea,
              pointerPos: D.currentValArea
            });
            Ee(e.HTMLNode, j), e._rect = null;
          }
        }), this.DS = i, this.HTMLNode = r || lt(c), this.HTMLNode.classList.add(l), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return m(o, [{
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
          var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", h = document.body ? "body" : "documentElement", w = "".concat(u, "Child");
          e.HTMLNode[w](e.DS.Selector.HTMLNode), document[h][w](e.HTMLNode);
        }), n(this, "updatePos", function() {
          e._rect = null;
          var u = e.DS.Area.rect, h = e.DS.Area.computedBorder, w = e.HTMLNode.style, y = "".concat(u.top + h.top, "px"), D = "".concat(u.left + h.left, "px"), j = "".concat(u.width, "px"), O = "".concat(u.height, "px");
          w.top !== y && (w.top = y), w.left !== D && (w.left = D), w.width !== j && (w.width = j), w.height !== O && (w.height = O);
        }), n(this, "stop", function(u) {
          e.stopAutoScroll(), u && e.applyElements("remove");
        }), n(this, "startAutoScroll", function() {
          e.currentEdges = [], e._scrollInterval = setInterval(function() {
            return e.handleAutoScroll();
          }, 16);
        }), n(this, "handleAutoScroll", function() {
          if (!e.DS.continue) {
            var u = e.DS, h = u.stores.PointerStore, w = u.Area;
            e.currentEdges = Pe({
              elementRect: Ce(h.currentVal),
              containerRect: e.rect,
              tolerance: e._overflowTolerance
            }), e.currentEdges.length && w.scroll(e.currentEdges, e._autoScrollSpeed);
          }
        }), n(this, "stopAutoScroll", function() {
          e.currentEdges = [], clearInterval(e._scrollInterval);
        }), n(this, "isInside", function(u, h) {
          return e.DS.Area.HTMLNode.contains(u) && e.DS.stores.ScrollStore.canScroll ? !0 : _e(e.rect, h || u.getBoundingClientRect());
        }), this._autoScrollSpeed = l, this._overflowTolerance = c, this.DS = i, this.HTMLNode = at(r), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          e.updatePos(), e.stopAutoScroll();
        });
      }
      return m(o, [{
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
          var u = c.key.toLowerCase();
          e.DS.publish("KeyStore:down:pre", {
            event: c,
            key: u
          }), e._currentValues.add(u), e.DS.publish("KeyStore:down", {
            event: c,
            key: u
          });
        }), n(this, "keyup", function(c) {
          var u = c.key.toLowerCase();
          e.DS.publish("KeyStore:up:pre", {
            event: c,
            key: u
          }), e._currentValues.delete(u), e.DS.publish("KeyStore:up", {
            event: c,
            key: u
          });
        }), n(this, "stop", function() {
          document.removeEventListener("keydown", e.keydown), document.removeEventListener("keyup", e.reset), window.removeEventListener("blur", e.reset), e.reset();
        }), n(this, "reset", function() {
          return e._currentValues.clear();
        }), this.DS = i, this._multiSelectMode = l, this._multiSelectKeys = r.map(function(c) {
          var u = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, h = u[c];
          return h ? (console.warn("[DragSelect] ".concat(c, ' is deprecated. Use "').concat(h, '" instead. Act Now!. See docs for more info')), h.toLowerCase()) : c.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return m(o, [{
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
    }(), Vt = /* @__PURE__ */ function() {
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
      return m(o, [{
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
          this._initialVal = e, this._initialValArea = e && R(e, "-", R(ne(this.DS.Area.rect), "+", ne(this.DS.Area.computedBorder)));
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
          this._currentVal = e, this._currentValArea = e && R(e, "-", R(ne(this.DS.Area.rect), "+", ne(this.DS.Area.computedBorder)));
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
          this._lastVal = e, this._lastValArea = e && R(e, "-", R(ne(this.DS.Area.rect), "+", ne(this.DS.Area.computedBorder)));
        }
      }]), o;
    }(), Tt = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.DS, r = t.areaElement, l = t.zoom;
        a(this, o), n(this, "_initialVal", void 0), n(this, "_currentVal", void 0), n(this, "_areaElement", void 0), n(this, "_canScroll", void 0), n(this, "init", function() {
          return e._areaElement.addEventListener("scroll", e.update);
        }), n(this, "start", function() {
          e._currentVal = e._initialVal = he(e._areaElement), e._areaElement.addEventListener("scroll", e.update);
        }), n(this, "update", function() {
          return e._currentVal = he(e._areaElement);
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
      return m(o, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = it(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var e = R(this.currentVal, "-", this.initialVal), i = nt(this.zoom), r = R(R(e, "*", i), "-", e);
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
          return this._currentVal || (this._currentVal = he(this._areaElement)), this._currentVal;
        }
      }]), o;
    }(), It = /* @__PURE__ */ function() {
      function o(t) {
        var e = this, i = t.area, r = i === void 0 ? document : i, l = t.selectables, c = l === void 0 ? [] : l, u = t.autoScrollSpeed, h = u === void 0 ? 5 : u, w = t.overflowTolerance, y = w === void 0 ? {
          x: 25,
          y: 25
        } : w, D = t.zoom, j = D === void 0 ? 1 : D, O = t.customStyles, U = O === void 0 ? !1 : O, z = t.multiSelectMode, ie = z === void 0 ? !1 : z, fe = t.multiSelectToggling, Q = fe === void 0 ? !0 : fe, Ve = t.multiSelectKeys, Lt = Ve === void 0 ? ["Control", "Shift", "Meta"] : Ve, Te = t.selector, Ot = Te === void 0 ? void 0 : Te, Ie = t.draggability, we = Ie === void 0 ? !0 : Ie, Le = t.immediateDrag, Nt = Le === void 0 ? !0 : Le, Oe = t.keyboardDrag, zt = Oe === void 0 ? !0 : Oe, Kt = t.dragKeys, Ne = t.keyboardDragSpeed, Bt = Ne === void 0 ? 10 : Ne, ze = t.useTransform, Ke = ze === void 0 ? !0 : ze, Be = t.hoverClass, He = Be === void 0 ? "ds-hover" : Be, Re = t.selectableClass, Ue = Re === void 0 ? "ds-selectable" : Re, Fe = t.selectedClass, Ht = Fe === void 0 ? "ds-selected" : Fe, qe = t.selectorClass, Rt = qe === void 0 ? "ds-selector" : qe, We = t.selectorAreaClass, Ut = We === void 0 ? "ds-selector-area" : We, Ft = t.callback, qt = t.onDragMove, Wt = t.onDragStartBegin, Yt = t.onDragStart, Jt = t.onElementSelect, Zt = t.onElementUnselect;
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
          PointerStore: new Vt({
            DS: this
          }),
          ScrollStore: new Tt({
            DS: this,
            areaElement: r,
            zoom: j
          }),
          KeyStore: new Et({
            DS: this,
            multiSelectKeys: Lt,
            multiSelectMode: ie
          })
        }, this.Area = new kt({
          area: r,
          PS: this.PubSub,
          zoom: j
        }), this.Selector = new jt({
          DS: this,
          selector: Ot,
          selectorClass: Rt,
          customStyles: U
        }), this.SelectorArea = new At({
          DS: this,
          selectorAreaClass: Ut,
          autoScrollSpeed: h,
          overflowTolerance: y
        }), this.SelectableSet = new Ct({
          elements: c,
          DS: this,
          className: Ue,
          hoverClassName: He,
          useTransform: Ke,
          draggability: we
        }), this.SelectedSet = new Pt({
          DS: this,
          className: Ht
        }), this.Selection = new Mt({
          DS: this,
          hoverClassName: He,
          multiSelectToggling: Q
        }), this.Drag = new xt({
          DS: this,
          draggability: we,
          useTransform: Ke,
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
          selectableClass: Ue
        }), St({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return e.continue = !1;
        }), this.start();
      }
      return m(o, [{
        key: "_callbacksTemp",
        value: function(e) {
          var i = e.callback, r = e.onDragMove, l = e.onDragStart, c = e.onDragStartBegin, u = e.onElementSelect, h = e.onElementUnselect, w = function(D, j) {
            return console.warn("[DragSelect] ".concat(D, ' is deprecated. Use DragSelect.subscribe("').concat(j, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          i && (w("callback", "callback"), this.subscribe("callback", function(y) {
            var D = y.items;
            y.item;
            var j = y.event;
            return i(D, j);
          })), r && (w("onDragMove", "dragmove"), this.subscribe("dragmove", function(y) {
            y.items, y.item;
            var D = y.event;
            return r(D);
          })), l && (w("onDragStart", "dragstart"), this.subscribe("dragstart", function(y) {
            y.items, y.item;
            var D = y.event;
            return l(D);
          })), c && (w("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(y) {
            y.items, y.item;
            var D = y.event;
            return c(D);
          })), u && (w("onElementSelect", "elementselect"), this.subscribe("elementselect", function(y) {
            y.items;
            var D = y.item, j = y.event;
            return u(D, j);
          })), h && (w("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(y) {
            y.items;
            var D = y.item, j = y.event;
            return h(D, j);
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
          return R(r, "-", l);
        }
      }]), o;
    }();
    return It;
  });
})(tt);
const Er = tt.exports, Vr = (f, d, a, p, m) => (d = Math, a = d.log, p = 1024, m = a(f) / a(p) | 0, f / d.pow(p, m)).toFixed(0) + " " + (m ? "KMGTPEZY"[--m] + "iB" : "B"), Tr = (f, d = "en-US") => new Date(f * 1e3).toLocaleString(d), Ir = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Lr = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Or = [
  Lr
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
}, ke = /* @__PURE__ */ Object.assign(Br, {
  props: { direction: String },
  setup(f) {
    return (d, a) => (b(), S("div", null, [
      f.direction == "down" ? (b(), S("svg", Ir, Or)) : q("", !0),
      f.direction == "up" ? (b(), S("svg", Nr, Kr)) : q("", !0)
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
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = ($) => $ == null ? void 0 : $.substring(0, 3), n = ($) => $.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), k = E(null), v = E(null), g = E(0), _ = E(null), x = ($) => {
      $.type == "dir" ? a.emit("vf-fetch", { q: "index", adapter: d.data.adapter, path: $.path }) : a.emit("vf-modal-show", { type: "preview", adapter: d.data.adapter, item: $ });
    }, C = ve({ active: !1, column: "", order: "" }), M = ($ = !0) => {
      let V = [...d.data.files], P = C.column, F = C.order == "asc" ? 1 : -1;
      if (!$)
        return V;
      const N = (X, G) => typeof X == "string" && typeof G == "string" ? X.toLowerCase().localeCompare(G.toLowerCase()) : X < G ? -1 : X > G ? 1 : 0;
      return C.active && (V = V.slice().sort((X, G) => N(X[P], G[P]) * F)), V;
    }, I = ($) => {
      C.active && C.column == $ ? (C.active = C.order == "asc", C.column = $, C.order = "desc") : (C.active = !0, C.column = $, C.order = "asc");
    }, B = () => _.value.getSelection().map(($) => JSON.parse($.dataset.item)), L = ($, V) => {
      if ($.altKey || $.ctrlKey || $.metaKey)
        return $.preventDefault(), !1;
      $.dataTransfer.setDragImage(v.value, 0, 15), $.dataTransfer.effectAllowed = "all", $.dataTransfer.dropEffect = "copy", $.dataTransfer.setData("items", JSON.stringify(B()));
    }, oe = ($, V) => {
      $.preventDefault();
      let P = JSON.parse($.dataTransfer.getData("items"));
      if (P.find((F) => F.storage != p("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", { type: "move", items: { from: P, to: V } });
    }, ce = ($, V) => {
      $.preventDefault(), !V || V.type !== "dir" || _.value.getSelection().find((P) => P == $.currentTarget) ? ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none") : $.dataTransfer.dropEffect = "copy";
    };
    return Y(() => {
      _.value = new Er({
        area: k.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), a.on("vf-explorer-update", () => Qe(() => {
        _.value.clearSelection(), _.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), _.value.subscribe("predragstart", ({ event: $, isDragging: V }) => {
        if (V)
          g.value = _.value.getSelection().length, _.value.break();
        else {
          const P = $.target.offsetWidth - $.offsetX, F = $.target.offsetHeight - $.offsetY;
          P < 15 && F < 15 && (_.value.clearSelection(), _.value.break());
        }
      }), _.value.subscribe("predragmove", ({ isDragging: $ }) => {
        $ && _.value.break();
      }), _.value.subscribe("callback", ({ items: $, event: V, isDragging: P }) => {
        a.emit("vf-nodes-selected", B()), g.value = _.value.getSelection().length;
      });
    }), Y(() => {
      Ge(() => d.view, () => a.emit("vf-explorer-update"));
    }), ($, V) => (b(), S("div", Hr, [
      f.view == "list" ? (b(), S("div", Rr, [
        s("div", {
          onClick: V[0] || (V[0] = (P) => I("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          Ur,
          te(ee(ke, {
            direction: C.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, C.active && C.column == "basename"]
          ])
        ]),
        s("div", {
          onClick: V[1] || (V[1] = (P) => I("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          Fr,
          te(ee(ke, {
            direction: C.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, C.active && C.column == "file_size"]
          ])
        ]),
        s("div", {
          onClick: V[2] || (V[2] = (P) => I("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          qr,
          te(ee(ke, {
            direction: C.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [Se, C.active && C.column == "last_modified"]
          ])
        ])
      ])) : q("", !0),
      s("div", Wr, [
        s("div", {
          ref: (P) => v.value = P,
          class: "absolute -z-50"
        }, [
          Yr,
          s("div", Jr, T(g.value), 1)
        ], 512)
      ]),
      s("div", {
        class: "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1 z-0",
        ref: (P) => k.value = P,
        onContextmenu: V[3] || (V[3] = ge((P) => A(a).emit("vf-contextmenu-show", { event: P, area: k.value, items: B() }), ["self", "prevent"]))
      }, [
        f.view == "list" ? (b(!0), S(J, { key: 0 }, Z(M(), (P, F) => (b(), S("div", {
          draggable: "true",
          onDblclick: (N) => x(P),
          onContextmenu: ge((N) => A(a).emit("vf-contextmenu-show", { event: N, area: k.value, items: B(), target: P }), ["prevent"]),
          onDragstart: (N) => L(N),
          onDragover: (N) => ce(N, P),
          onDrop: (N) => oe(N, P),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": F
        }, [
          s("div", Xr, [
            s("div", Gr, [
              P.type == "dir" ? (b(), S("svg", Qr, to)) : (b(), S("svg", ro, no)),
              s("span", so, T(P.basename), 1)
            ]),
            s("div", io, T(P.file_size ? A(Vr)(P.file_size) : ""), 1),
            s("div", ao, T(A(Tr)(P.last_modified)), 1)
          ])
        ], 40, Zr))), 256)) : q("", !0),
        f.view == "grid" ? (b(!0), S(J, { key: 1 }, Z(M(!1), (P, F) => (b(), S("div", {
          draggable: "true",
          onDblclick: (N) => x(P),
          onContextmenu: ge((N) => A(a).emit("vf-contextmenu-show", { event: N, area: k.value, items: B(), target: P }), ["prevent"]),
          onDragstart: (N) => L(N),
          onDragover: (N) => ce(N, P),
          onDrop: (N) => oe(N, P),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": P.type,
          "data-item": JSON.stringify(P),
          "data-index": F
        }, [
          s("div", null, [
            s("div", co, [
              P.type == "dir" ? (b(), S("svg", uo, ho)) : (b(), S("svg", fo, vo)),
              s("div", po, T(m(P.extension)), 1)
            ]),
            s("span", yo, T(n(P.basename)), 1)
          ])
        ], 40, lo))), 256)) : q("", !0)
      ], 544)
    ]));
  }
}), wo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, So = { class: "flex leading-5 items-center" }, ko = /* @__PURE__ */ s("div", {
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
], -1), xo = ["value"], Do = { class: "ml-3" }, $o = { class: "flex leading-5 items-center" }, Co = /* @__PURE__ */ s("svg", {
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
  setup(f) {
    var g;
    const d = f, a = inject("emitter"), { getStore: p, setStore: m } = inject("storage"), n = E(0), k = E((g = p("adapter")) != null ? g : d.data.adapter), v = () => {
      a.emit("vf-fetch", { q: "index", adapter: k.value }), m("adapter", k.value);
    };
    return a.on("vf-nodes-selected", (_) => {
      n.value = _.length;
    }), (_, x) => (b(), S("div", wo, [
      s("div", So, [
        ko,
        te(s("select", {
          "onUpdate:modelValue": x[0] || (x[0] = (C) => k.value = C),
          onChange: v,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (b(!0), S(J, null, Z(f.data.storages, (C) => (b(), S("option", { value: C }, T(C), 9, xo))), 256))
        ], 544), [
          [Qt, k.value]
        ]),
        s("span", Do, T(n.value > 0 ? n.value + " items selected." : ""), 1)
      ]),
      s("div", $o, [
        s("span", {
          onClick: x[1] || (x[1] = (C) => A(a).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, Po)
      ])
    ]));
  }
}), Ao = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, Eo = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Vo = [
  Eo
], To = { class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" }, Io = /* @__PURE__ */ s("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Lo = [
  Io
], Oo = { class: "flex leading-5" }, No = /* @__PURE__ */ s("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), zo = ["title", "onClick"], Ko = {
  name: "VFBreadcrumb"
}, Bo = /* @__PURE__ */ Object.assign(Ko, {
  props: {
    data: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = E(null), n = E([]);
    a.on("vf-explorer-update", (g) => {
      var C;
      let _ = [], x = [];
      m.value = (C = d.data.dirname) != null ? C : p("adapter", "local") + "://", m.value.length == 0 && (n.value = []), m.value.replace(p("adapter", "local") + "://", "").split("/").forEach(function(M) {
        _.push(M), _.join("/") != "" && x.push({
          basename: M,
          name: M,
          path: p("adapter", "local") + "://" + _.join("/"),
          type: "dir"
        });
      }), x.length > 4 && (x = x.slice(-5), x[0].name = ".."), n.value = x;
    });
    const k = (g) => {
      var x;
      g.preventDefault();
      let _ = JSON.parse(g.dataTransfer.getData("items"));
      if (_.find((C) => C.storage != p("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      a.emit("vf-modal-show", {
        type: "move",
        items: { from: _, to: (x = n.value[n.value.length - 2]) != null ? x : { path: p("adapter", "local") + "://" } }
      });
    }, v = (g) => {
      g.preventDefault(), n.value.length < 1 ? (g.dataTransfer.dropEffect = "none", g.dataTransfer.effectAllowed = "none") : g.dataTransfer.dropEffect = "copy";
    };
    return (g, _) => (b(), S("div", Ao, [
      (b(), S("svg", {
        onDragover: _[0] || (_[0] = (x) => v(x)),
        onDrop: _[1] || (_[1] = (x) => k(x)),
        onClick: _[2] || (_[2] = (x) => {
          var C, M;
          return !n.value.length || A(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter, path: (M = (C = n.value[n.value.length - 2]) == null ? void 0 : C.path) != null ? M : A(p)("adapter", "local") + "://" });
        }),
        class: ae(["h-6 w-6 p-0.5 rounded", n.value.length ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, Vo, 34)),
      s("div", To, [
        (b(), S("svg", {
          onClick: _[3] || (_[3] = (x) => A(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Lo)),
        s("div", Oo, [
          (b(!0), S(J, null, Z(n.value, (x, C) => (b(), S("div", { key: C }, [
            No,
            s("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: x.basename,
              onClick: (M) => A(a).emit("vf-fetch", { q: "index", adapter: f.data.adapter, path: x.path })
            }, T(x.name), 9, zo)
          ]))), 128))
        ])
      ])
    ]));
  }
}), le = (f) => Object.entries(f).map((d) => d.map(encodeURIComponent).join("=")).join("&"), Ho = ["onClick"], Ro = /* @__PURE__ */ s("span", { class: "px-1" }, null, -1), Uo = {
  name: "VFContextMenu"
}, Fo = /* @__PURE__ */ Object.assign(Uo, {
  props: {
    current: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), p = E(null), { apiUrl: m } = re(), n = ve({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), k = E([]);
    a.on("vf-context-selected", (x) => {
      k.value = x;
    });
    const v = {
      newfolder: {
        title: "New Folder",
        action: () => {
          a.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: "Delete",
        action: () => {
          a.emit("vf-modal-show", { type: "delete", items: k });
        }
      },
      refresh: {
        title: "Refresh",
        action: () => {
          a.emit("vf-fetch", { q: "index", adapter: d.current.adapter, path: d.current.dirname });
        }
      },
      preview: {
        title: "Preview",
        action: () => {
          a.emit("vf-modal-show", { type: "preview", adapter: d.current.adapter, item: k.value[0] });
        }
      },
      download: {
        title: "Download",
        action: () => {
          const x = m.value + "?" + le({ q: "download", adapter: k.value[0].adapter, path: k.value[0].path });
          a.emit("vf-download", x);
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          a.emit("vf-modal-show", { type: "archive", items: k });
        }
      },
      unarchive: {
        title: "Unarchive",
        action: () => {
          a.emit("vf-modal-show", { type: "unarchive", items: k });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          a.emit("vf-modal-show", { type: "rename", items: k });
        }
      }
    }, g = (x) => {
      a.emit("vf-contextmenu-hide"), x.action();
    };
    a.on("vf-contextmenu-show", ({ event: x, area: C, items: M, target: I = null }) => {
      n.items = [], I ? M.length > 1 && M.some((B) => B.path === I.path) ? (n.items.push(v.refresh), n.items.push(v.archive), n.items.push(v.delete), a.emit("vf-context-selected", M), console.log(M.length + " selected (more than 1 item.)")) : (n.items.push(v.preview), n.items.push(v.rename), n.items.push(v.download), I.mime_type == "application/zip" ? n.items.push(v.unarchive) : n.items.push(v.archive), n.items.push(v.delete), a.emit("vf-context-selected", [I]), console.log(I.type + " is selected")) : (n.items.push(v.refresh), n.items.push(v.newfolder), a.emit("vf-context-selected", []), console.log("no files selected")), _(x, C);
    }), a.on("vf-contextmenu-hide", () => {
      n.active = !1;
    });
    const _ = (x, C) => {
      n.active = !0, Qe(() => {
        let M = C.getBoundingClientRect(), I = x.pageX, B = x.pageY, L = p.value.offsetHeight, oe = p.value.offsetWidth;
        I = M.right - x.pageX + window.scrollX < oe ? I - oe : I, B = M.bottom - x.pageY + window.scrollY < L ? B - L : B, n.positions = {
          left: I + "px",
          top: B + "px"
        };
      });
    };
    return (x, C) => n.active ? (b(), S("ul", {
      key: 0,
      class: "absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (M) => p.value = M,
      style: er(n.positions)
    }, [
      (b(!0), S(J, null, Z(n.items, (M) => (b(), S("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: M.title,
        onClick: (I) => g(M)
      }, [
        Ro,
        s("span", null, T(M.title), 1)
      ], 8, Ho))), 128))
    ], 4)) : q("", !0);
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
  setup(f) {
    const d = f, a = rr();
    Ye("emitter", a);
    const { setStore: p, getStore: m } = Ze(d.id);
    Ye("storage", Ze(d.id));
    const { apiUrl: n, setApiUrl: k } = re();
    k(d.url);
    const v = ve({ adapter: "local", storages: [], dirname: ".", files: [] }), g = E(m("viewport", "grid")), _ = E(m("darkMode", d.dark));
    a.on("vf-darkMode-toggle", () => {
      _.value = !_.value, p("darkMode", _.value);
    }), a.on("vf-view-toggle", (M) => {
      g.value = M;
    });
    const x = ve({
      active: !1,
      type: "delete",
      data: {}
    });
    a.on("vf-modal-close", () => {
      x.active = !1;
    }), a.on("vf-modal-show", (M) => {
      x.active = !0, x.type = M.type, x.data = M;
    });
    const C = (M) => {
      Object.assign(v, M), a.emit("vf-nodes-selected", {}), a.emit("vf-explorer-update", M);
    };
    return a.on("vf-fetch", (M) => {
      et(n.value, { params: M }).then((I) => {
        a.emit("vf-modal-close"), C(I);
      });
    }), a.on("vf-download", (M) => {
      document.getElementById("download_frame").src = M, a.emit("vf-modal-close");
    }), Y(() => {
      a.emit("vf-fetch", { q: "index", adapter: m("adapter", v.adapter) });
    }), (M, I) => (b(), S("div", {
      class: ae(_.value ? "dark" : "")
    }, [
      s("div", {
        class: "relative border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none",
        onMousedown: I[0] || (I[0] = (B) => A(a).emit("vf-contextmenu-hide"))
      }, [
        ee(jr),
        ee(Bo, { data: v }, null, 8, ["data"]),
        ee(_o, {
          view: g.value,
          data: v
        }, null, 8, ["view", "data"]),
        ee(jo, { data: v }, null, 8, ["data"])
      ], 32),
      x.active ? (b(), H(tr("v-f-modal-" + x.type), {
        key: 0,
        selection: x.data,
        current: v
      }, null, 8, ["selection", "current"])) : q("", !0),
      ee(Fo, { current: v }, null, 8, ["current"]),
      qo
    ], 2));
  }
}), Jo = /* @__PURE__ */ s("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Zo = { class: "fixed z-10 inset-0 overflow-y-auto" }, Xo = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full" }, Go = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Qo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, W = {
  __name: "ModalLayout",
  setup(f) {
    const d = inject("emitter");
    return Y(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus();
    }), (a, p) => (b(), S("div", {
      class: "v-f-modal relative z-20",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: p[1] || (p[1] = me((m) => A(d).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Jo,
      s("div", Zo, [
        s("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onClick: p[0] || (p[0] = ge((m) => A(d).emit("vf-modal-close"), ["self"]))
        }, [
          s("div", Xo, [
            s("div", Go, [
              Je(a.$slots, "default")
            ]),
            s("div", Qo, [
              Je(a.$slots, "buttons")
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
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = E(d.selection.items), n = () => {
      m.value.length && a.emit("vf-fetch", {
        q: "delete",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        items: JSON.stringify(m.value.map(({ path: k, type: v }) => ({ path: k, type: v })))
      });
    };
    return (k, v) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        s("button", {
          type: "button",
          onClick: v[0] || (v[0] = (g) => A(a).emit("vf-modal-close")),
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
              (b(!0), S(J, null, Z(m.value, (g) => (b(), S("p", an, [
                g.type == "dir" ? (b(), S("svg", ln, un)) : (b(), S("svg", dn, hn)),
                s("span", fn, T(g.basename), 1)
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
}, Sn = { class: "mt-2" }, kn = { class: "text-sm text-gray-500" }, xn = {
  name: "VFModalMessage"
}, Dn = /* @__PURE__ */ Object.assign(xn, {
  props: {
    selection: Object
  },
  setup(f) {
    const d = inject("emitter");
    return (a, p) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: p[0] || (p[0] = (m) => A(d).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: K(() => {
        var m, n, k, v;
        return [
          s("div", yn, [
            bn,
            s("div", _n, [
              s("h3", wn, T((n = (m = f.selection) == null ? void 0 : m.title) != null ? n : "Title"), 1),
              s("div", Sn, [
                s("p", kn, T((v = (k = f.selection) == null ? void 0 : k.message) != null ? v : "Message") + ".", 1)
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
}, "New Folder", -1), jn = { class: "mt-2" }, An = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), En = ["onKeyup"], Vn = {
  name: "VFModalNewFolder"
}, Tn = /* @__PURE__ */ Object.assign(Vn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = E(""), n = () => {
      m.value != "" && a.emit("vf-fetch", {
        q: "newfolder",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        name: m.value
      });
    };
    return (k, v) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        s("button", {
          type: "button",
          onClick: v[1] || (v[1] = (g) => A(a).emit("vf-modal-close")),
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
              te(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (g) => m.value = g),
                onKeyup: me(n, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, En), [
                [pe, m.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), In = { class: "sm:flex sm:items-start" }, Ln = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), On = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nn = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), zn = { class: "mt-2" }, Kn = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), Bn = ["onKeyup"], Hn = {
  name: "VFModalNewFile"
}, Rn = /* @__PURE__ */ Object.assign(Hn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = E(""), n = () => {
      m.value != "" && a.emit("vf-fetch", {
        q: "newfile",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        name: m.value
      });
    };
    return (k, v) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        s("button", {
          type: "button",
          onClick: v[1] || (v[1] = (g) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", In, [
          Ln,
          s("div", On, [
            Nn,
            s("div", zn, [
              Kn,
              te(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (g) => m.value = g),
                onKeyup: me(n, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, Bn), [
                [pe, m.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Un = { class: "border font-normal border-gray-200 dark:border-gray-700/50 p-2 rounded min-h-[100px] text-sm" }, Fn = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: d }) {
    const a = f, p = E(""), { apiUrl: m } = re();
    return Y(() => {
      et(m.value, {
        params: { q: "preview", adapter: a.selection.adapter, path: a.selection.item.path },
        json: !1
      }).then((n) => n.text()).then((n) => {
        p.value = n, d("load");
      });
    }), (n, k) => (b(), S("div", null, [
      s("pre", Un, T(p.value), 1)
    ]));
  }
}, qn = { class: "w-full flex justify-center" }, Wn = ["src"], Yn = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: d }) {
    const a = f, { apiUrl: p } = re(), m = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return onMounted(() => {
      d("load");
    }), (n, k) => (b(), S("div", qn, [
      s("img", {
        class: "max-w-[350px] max-h-[350px]",
        src: m(),
        alt: ""
      }, null, 8, Wn)
    ]));
  }
}, Jn = {
  __name: "Default",
  emits: ["load"],
  setup(f, { emit: d }) {
    return Y(() => {
      d("load");
    }), (a, p) => (b(), S("div", null, " Default view.. "));
  }
}, Zn = {
  class: "w-full",
  preload: "",
  controls: ""
}, Xn = ["src"], Gn = /* @__PURE__ */ de(" Your browser does not support the video tag. "), Qn = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: d }) {
    const a = f, { apiUrl: p } = re(), m = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      d("load");
    }), (n, k) => (b(), S("div", null, [
      s("video", Zn, [
        s("source", {
          src: m(),
          type: "video/mp4"
        }, null, 8, Xn),
        Gn
      ])
    ]));
  }
}, es = {
  class: "w-full",
  controls: ""
}, ts = ["src"], rs = /* @__PURE__ */ de(" Your browser does not support the audio element. "), os = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: d }) {
    const a = f, { apiUrl: p } = re(), m = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      d("load");
    }), (n, k) => (b(), S("div", null, [
      s("audio", es, [
        s("source", {
          src: m(),
          type: "audio/mpeg"
        }, null, 8, ts),
        rs
      ])
    ]));
  }
}, ns = ["data"], ss = ["src"], is = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(f, { emit: d }) {
    const a = f, { apiUrl: p } = re(), m = () => p.value + "?" + le({ q: "preview", adapter: a.selection.adapter, path: a.selection.item.path });
    return Y(() => {
      d("load");
    }), (n, k) => (b(), S("div", null, [
      s("object", {
        data: m(),
        type: "application/pdf",
        width: "100%",
        height: "100%"
      }, [
        s("iframe", {
          class: "border-0",
          src: m(),
          width: "100%",
          height: "100%"
        }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, ss)
      ], 8, ns)
    ]));
  }
}, as = { class: "sm:flex sm:items-start" }, ls = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), cs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, us = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ds = { class: "mt-2" }, ms = { class: "text-gray-700 dark:text-gray-200 text-sm" }, hs = {
  key: 0,
  class: "flex leading-5"
}, fs = /* @__PURE__ */ s("svg", {
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
], -1), gs = /* @__PURE__ */ s("span", null, "Loading", -1), vs = [
  fs,
  gs
], ps = {
  name: "VFModalPreview"
}, ys = /* @__PURE__ */ Object.assign(ps, {
  props: {
    selection: Object
  },
  setup(f) {
    const d = f, { apiUrl: a } = re(), p = inject("emitter"), m = E(!1), n = (v) => {
      var g;
      return ((g = d.selection.item.mime_type) != null ? g : "").startsWith(v);
    }, k = () => {
      const v = a.value + "?" + le({ q: "download", adapter: d.selection.adapter, path: d.selection.item.path });
      p.emit("vf-download", v);
    };
    return (v, g) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: g[6] || (g[6] = (_) => A(p).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        s("button", {
          type: "button",
          onClick: g[7] || (g[7] = (_) => k()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: K(() => [
        s("div", as, [
          ls,
          s("div", cs, [
            s("h3", us, T(f.selection.item.basename), 1),
            s("div", ds, [
              n("text") ? (b(), H(Fn, {
                key: 0,
                selection: f.selection,
                onLoad: g[0] || (g[0] = (_) => m.value = !0)
              }, null, 8, ["selection"])) : n("image") ? (b(), H(Yn, {
                key: 1,
                selection: f.selection,
                onLoad: g[1] || (g[1] = (_) => m.value = !0)
              }, null, 8, ["selection"])) : n("video") ? (b(), H(Qn, {
                key: 2,
                selection: f.selection,
                onLoad: g[2] || (g[2] = (_) => m.value = !0)
              }, null, 8, ["selection"])) : n("audio") ? (b(), H(os, {
                key: 3,
                selection: f.selection,
                onLoad: g[3] || (g[3] = (_) => m.value = !0)
              }, null, 8, ["selection"])) : n("application/pdf") ? (b(), H(is, {
                key: 4,
                selection: f.selection,
                onLoad: g[4] || (g[4] = (_) => m.value = !0)
              }, null, 8, ["selection"])) : (b(), H(Jn, {
                key: 5,
                selection: f.selection,
                onLoad: g[5] || (g[5] = (_) => m.value = !0)
              }, null, 8, ["selection"]))
            ]),
            s("div", ms, [
              s("p", null, T(f.selection.item.path), 1),
              s("p", null, "mime_type: " + T(f.selection.item.mime_type), 1),
              m.value == !1 ? (b(), S("div", hs, vs)) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), bs = { class: "sm:flex sm:items-start" }, _s = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ws = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ss = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ks = { class: "mt-2" }, xs = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ds = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $s = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Cs = [
  $s
], Ps = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ms = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), js = [
  Ms
], As = { class: "ml-1.5" }, Es = ["onKeyup"], Vs = {
  name: "VFModalRename"
}, Ts = /* @__PURE__ */ Object.assign(Vs, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = E(d.selection.items[0]), n = E(d.selection.items[0].basename), k = () => {
      n.value != "" && a.emit("vf-fetch", {
        q: "rename",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        item: m.value.path,
        name: n.value
      });
    };
    return (v, g) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: k,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        s("button", {
          type: "button",
          onClick: g[1] || (g[1] = (_) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", bs, [
          _s,
          s("div", ws, [
            s("h3", Ss, "Rename your " + T(m.value.type == "dir" ? "folder" : "file"), 1),
            s("div", ks, [
              s("p", xs, [
                m.value.type == "dir" ? (b(), S("svg", Ds, Cs)) : (b(), S("svg", Ps, js)),
                s("span", As, T(m.value.basename), 1)
              ]),
              te(s("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (_) => n.value = _),
                onKeyup: me(k, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Es), [
                [pe, n.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Is = /* @__PURE__ */ s("div", { class: "sm:flex sm:items-start" }, [
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
], -1), Ls = /* @__PURE__ */ s("button", {
  type: "button",
  class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
}, "Yes, upload!", -1), Os = {
  name: "VFModalUpload"
}, Ns = /* @__PURE__ */ Object.assign(Os, {
  setup(f) {
    const d = inject("emitter");
    return (a, p) => (b(), H(W, null, {
      buttons: K(() => [
        Ls,
        s("button", {
          type: "button",
          onClick: p[0] || (p[0] = (m) => A(d).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        Is
      ]),
      _: 1
    }));
  }
}), zs = { class: "sm:flex sm:items-start" }, Ks = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Bs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Hs = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Rs = { class: "mt-2" }, Us = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Fs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qs = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ws = [
  qs
], Ys = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Js = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Zs = [
  Js
], Xs = { class: "ml-1.5" }, Gs = /* @__PURE__ */ s("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), Qs = ["onKeyup"], ei = {
  name: "VFModalArchive"
}, ti = /* @__PURE__ */ Object.assign(ei, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = E(""), n = E(d.selection.items), k = () => {
      n.value.length && a.emit("vf-fetch", {
        q: "archive",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        items: JSON.stringify(n.value.map(({ path: v, type: g }) => ({ path: v, type: g }))),
        name: m.value
      });
    };
    return (v, g) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: k,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        s("button", {
          type: "button",
          onClick: g[1] || (g[1] = (_) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", zs, [
          Ks,
          s("div", Bs, [
            Hs,
            s("div", Rs, [
              (b(!0), S(J, null, Z(n.value, (_) => (b(), S("p", Us, [
                _.type == "dir" ? (b(), S("svg", Fs, Ws)) : (b(), S("svg", Ys, Zs)),
                s("span", Xs, T(_.basename), 1)
              ]))), 256)),
              Gs,
              te(s("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (_) => m.value = _),
                onKeyup: me(k, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Qs), [
                [pe, m.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ri = { class: "sm:flex sm:items-start" }, oi = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ni = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, si = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), ii = { class: "mt-2" }, ai = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, li = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ci = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ui = [
  ci
], di = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mi = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), hi = [
  mi
], fi = { class: "ml-1.5" }, gi = { class: "my-1 text-sm text-gray-500" }, vi = {
  name: "VFModalUnarchive"
}, pi = /* @__PURE__ */ Object.assign(vi, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage");
    E("");
    const m = E(d.selection.items[0]), n = E([]), k = () => {
      a.emit("vf-fetch", {
        q: "unarchive",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        item: m.value.path
      });
    };
    return (v, g) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: k,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        s("button", {
          type: "button",
          onClick: g[0] || (g[0] = (_) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", ri, [
          oi,
          s("div", ni, [
            si,
            s("div", ii, [
              (b(!0), S(J, null, Z(n.value, (_) => (b(), S("p", ai, [
                _.type == "dir" ? (b(), S("svg", li, ui)) : (b(), S("svg", di, hi)),
                s("span", fi, T(_.basename), 1)
              ]))), 256)),
              s("p", gi, "Archive will be unarchived at (" + T(f.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), yi = { class: "sm:flex sm:items-start" }, bi = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), _i = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, wi = /* @__PURE__ */ s("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), Si = { class: "mt-2" }, ki = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, xi = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Di = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), $i = [
  Di
], Ci = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pi = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Mi = [
  Pi
], ji = { class: "ml-1.5" }, Ai = /* @__PURE__ */ s("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), Ei = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Vi = /* @__PURE__ */ s("svg", {
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
], -1), Ti = { class: "ml-1.5 overflow-auto" }, Ii = {
  name: "VFModalMove"
}, Li = /* @__PURE__ */ Object.assign(Ii, {
  props: {
    selection: Object,
    current: Object
  },
  setup(f) {
    const d = f, a = inject("emitter"), { getStore: p } = inject("storage"), m = E(d.selection.items.from), n = () => {
      m.value.length && a.emit("vf-fetch", {
        q: "move",
        adapter: p("adapter", "local"),
        path: d.current.dirname,
        items: JSON.stringify(m.value.map(({ path: k, type: v }) => ({ path: k, type: v }))),
        item: d.selection.items.to.path
      });
    };
    return (k, v) => (b(), H(W, null, {
      buttons: K(() => [
        s("button", {
          type: "button",
          onClick: n,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        s("button", {
          type: "button",
          onClick: v[0] || (v[0] = (g) => A(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: K(() => [
        s("div", yi, [
          bi,
          s("div", _i, [
            wi,
            s("div", Si, [
              (b(!0), S(J, null, Z(m.value, (g) => (b(), S("p", ki, [
                g.type == "dir" ? (b(), S("svg", xi, $i)) : (b(), S("svg", Ci, Mi)),
                s("span", ji, T(g.path), 1)
              ]))), 256)),
              Ai,
              s("p", Ei, [
                Vi,
                s("span", Ti, T(f.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: pn,
  ModalMessage: Dn,
  ModalNewFolder: Tn,
  ModalNewFile: Rn,
  ModalPreview: ys,
  ModalRename: Ts,
  ModalUpload: Ns,
  ModalArchive: ti,
  ModalUnarchive: pi,
  ModalMove: Li
}, Symbol.toStringTag, { value: "Module" })), xe = {
  VueFinder: Yo,
  ...Oi
};
const zi = {
  install(f) {
    for (const d in xe)
      if (xe.hasOwnProperty(d)) {
        const a = xe[d];
        f.component(a.name, a);
      }
  }
};
export {
  zi as default
};
