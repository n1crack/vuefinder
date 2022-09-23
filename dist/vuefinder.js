import { ref as V, watch as Nt, inject as R, openBlock as x, createElementBlock as C, createElementVNode as d, unref as _, normalizeClass as ue, createTextVNode as Me, toDisplayString as $, createCommentVNode as oe, createVNode as ye, TransitionGroup as Ti, withCtx as ee, Fragment as se, renderList as ve, reactive as dt, onMounted as xe, onUpdated as Ai, withDirectives as ge, vShow as at, withModifiers as Oe, nextTick as mt, vModelSelect as sr, customRef as Oi, withKeys as Ke, isRef as Pi, vModelText as Ye, normalizeStyle as Cr, provide as yt, createBlock as ce, resolveDynamicComponent as Ii, renderSlot as lr } from "vue";
import wt from "plupload";
const ht = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const a = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    a.headers = {};
    let i = new FormData();
    for (const [l, h] of Object.entries(t))
      i.append(l, h);
    a.body = i;
  }
  return fetch(o, a).then((i) => i.ok ? n ? i.json() : i.text() : i.json().then(Promise.reject.bind(Promise)));
};
function Ni(o) {
  return { all: o = o || /* @__PURE__ */ new Map(), on: function(e, t) {
    var n = o.get(e);
    n ? n.push(t) : o.set(e, [t]);
  }, off: function(e, t) {
    var n = o.get(e);
    n && (t ? n.splice(n.indexOf(t) >>> 0, 1) : o.set(e, []));
  }, emit: function(e, t) {
    var n = o.get(e);
    n && n.slice().map(function(a) {
      a(t);
    }), (n = o.get("*")) && n.slice().map(function(a) {
      a(e, t);
    });
  } };
}
function St(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = V(JSON.parse(e));
  Nt(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function a(h, m) {
    t.value = Object.assign({ ...t.value }, { [h]: m });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (h, m = null) => t.value === null || t.value === "" ? m : t.value.hasOwnProperty(h) ? t.value[h] : m, setStore: a, clearStore: i };
}
const cr = V("");
function ke() {
  function o(e) {
    cr.value = e;
  }
  return { apiUrl: cr, setApiUrl: o };
}
const Li = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, ji = {
  key: 0,
  class: "flex text-center"
}, Vi = ["aria-label"], zi = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Bi = [
  zi
], Ri = ["aria-label"], Hi = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), Ui = [
  Hi
], Ki = ["aria-label"], Yi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Wi = [
  Yi
], Xi = ["aria-label"], Fi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), qi = [
  Fi
], Gi = ["aria-label"], Ji = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), Zi = [
  Ji
], Qi = ["aria-label"], en = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), tn = [
  en
], rn = ["aria-label"], nn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), on = [
  nn
], an = {
  key: 1,
  class: "flex text-center"
}, sn = { class: "pl-2" }, ln = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, cn = { class: "flex text-center items-center justify-end" }, un = ["aria-label"], dn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), hn = [
  dn
], fn = ["aria-label"], mn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, pn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, gn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, vn = ["aria-label"], bn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, yn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, wn = {
  name: "VFToolbar"
}, xn = /* @__PURE__ */ Object.assign(wn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = R("emitter"), { getStore: t, setStore: n } = R("storage"), { t: a } = R("i18n"), i = V(t("viewport", "grid")), l = V([]), h = V(t("full-screen", !1)), m = V("");
    e.on("vf-search-query", ({ newQuery: f }) => {
      m.value = f;
    });
    const v = () => {
      h.value = !h.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (f) => {
      l.value = f;
    }), e.on("vf-view-toggle", (f) => {
      n("viewport", f), i.value = f;
    }), (f, p) => (x(), C("div", Li, [
      m.value.length ? (x(), C("div", an, [
        d("div", sn, [
          Me($(_(a)("Search results for")) + " ", 1),
          d("span", ln, $(m.value), 1)
        ])
      ])) : (x(), C("div", ji, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: p[0] || (p[0] = (b) => _(e).emit("vf-modal-show", { type: "new-folder", items: l.value }))
        }, Bi, 8, Vi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[1] || (p[1] = (b) => _(e).emit("vf-modal-show", { type: "new-file", items: l.value }))
        }, Ui, 8, Ri),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[2] || (p[2] = (b) => l.value.length != 1 || _(e).emit("vf-modal-show", { type: "rename", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Wi, 2))
        ], 8, Ki),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[3] || (p[3] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "delete", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, qi, 2))
        ], 8, Xi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[4] || (p[4] = (b) => _(e).emit("vf-modal-show", { type: "upload", items: l.value }))
        }, Zi, 8, Gi),
        l.value.length == 1 && l.value[0].mime_type == "application/zip" ? (x(), C("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": _(a)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[5] || (p[5] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "unarchive", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, tn, 2))
        ], 8, Qi)) : (x(), C("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": _(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[6] || (p[6] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "archive", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, on, 2))
        ], 8, rn))
      ])),
      d("div", cn, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (x(), C("svg", {
            onClick: p[7] || (p[7] = (b) => _(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, hn))
        ], 8, un),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v
        }, [
          (x(), C("svg", mn, [
            h.value ? (x(), C("path", pn)) : (x(), C("path", gn))
          ]))
        ], 8, fn),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: p[8] || (p[8] = (b) => m.value.length || _(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([m.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (x(), C("path", bn)) : oe("", !0),
            i.value == "list" ? (x(), C("path", yn)) : oe("", !0)
          ], 2))
        ], 8, vn)
      ])
    ]));
  }
});
var _n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Mr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(_n, function() {
    function t(u, s) {
      if (!(u instanceof s))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(u, s) {
      for (var r = 0; r < s.length; r++) {
        var g = s[r];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(u, g.key, g);
      }
    }
    function a(u, s, r) {
      return s && n(u.prototype, s), r && n(u, r), u;
    }
    function i(u, s, r) {
      return s in u ? Object.defineProperty(u, s, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : u[s] = r, u;
    }
    function l(u, s) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var g = Object.getOwnPropertySymbols(u);
        s && (g = g.filter(function(c) {
          return Object.getOwnPropertyDescriptor(u, c).enumerable;
        })), r.push.apply(r, g);
      }
      return r;
    }
    function h(u) {
      for (var s = 1; s < arguments.length; s++) {
        var r = arguments[s] != null ? arguments[s] : {};
        s % 2 ? l(Object(r), !0).forEach(function(g) {
          i(u, g, r[g]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : l(Object(r)).forEach(function(g) {
          Object.defineProperty(u, g, Object.getOwnPropertyDescriptor(r, g));
        });
      }
      return u;
    }
    function m(u, s) {
      if (typeof s != "function" && s !== null)
        throw new TypeError("Super expression must either be null or a function");
      u.prototype = Object.create(s && s.prototype, {
        constructor: {
          value: u,
          writable: !0,
          configurable: !0
        }
      }), s && f(u, s);
    }
    function v(u) {
      return v = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, v(u);
    }
    function f(u, s) {
      return f = Object.setPrototypeOf || function(g, c) {
        return g.__proto__ = c, g;
      }, f(u, s);
    }
    function p() {
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
    function b(u, s, r) {
      return p() ? b = Reflect.construct : b = function(c, y, w) {
        var k = [null];
        k.push.apply(k, y);
        var S = Function.bind.apply(c, k), O = new S();
        return w && f(O, w.prototype), O;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function M(u) {
      var s = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return M = function(g) {
        if (g === null || !A(g))
          return g;
        if (typeof g != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof s < "u") {
          if (s.has(g))
            return s.get(g);
          s.set(g, c);
        }
        function c() {
          return b(g, arguments, v(this).constructor);
        }
        return c.prototype = Object.create(g.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), f(c, g);
      }, M(u);
    }
    function T(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function I(u, s) {
      return s && (typeof s == "object" || typeof s == "function") ? s : T(u);
    }
    function z(u) {
      var s = p();
      return function() {
        var g = v(u), c;
        if (s) {
          var y = v(this).constructor;
          c = Reflect.construct(g, arguments, y);
        } else
          c = g.apply(this, arguments);
        return I(this, c);
      };
    }
    function B(u, s) {
      for (; !Object.prototype.hasOwnProperty.call(u, s) && (u = v(u), u !== null); )
        ;
      return u;
    }
    function P(u, s, r) {
      return typeof Reflect < "u" && Reflect.get ? P = Reflect.get : P = function(c, y, w) {
        var k = B(c, y);
        if (!!k) {
          var S = Object.getOwnPropertyDescriptor(k, y);
          return S.get ? S.get.call(w) : S.value;
        }
      }, P(u, s, r || u);
    }
    function ne(u, s) {
      return X(u) || le(u, s) || fe(u, s) || N();
    }
    function F(u) {
      return D(u) || q(u) || fe(u) || U();
    }
    function D(u) {
      if (Array.isArray(u))
        return L(u);
    }
    function X(u) {
      if (Array.isArray(u))
        return u;
    }
    function q(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function le(u, s) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], g = !0, c = !1, y = void 0;
        try {
          for (var w = u[Symbol.iterator](), k; !(g = (k = w.next()).done) && (r.push(k.value), !(s && r.length === s)); g = !0)
            ;
        } catch (S) {
          c = !0, y = S;
        } finally {
          try {
            !g && w.return != null && w.return();
          } finally {
            if (c)
              throw y;
          }
        }
        return r;
      }
    }
    function fe(u, s) {
      if (!!u) {
        if (typeof u == "string")
          return L(u, s);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return L(u, s);
      }
    }
    function L(u, s) {
      (s == null || s > u.length) && (s = u.length);
      for (var r = 0, g = new Array(s); r < s; r++)
        g[r] = u[r];
      return g;
    }
    function U() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function N() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Y = function(s, r, g) {
      var c = s.x, y = s.y, w = g.x, k = g.y, S = {
        "+": {
          x: c + w,
          y: y + k
        },
        "-": {
          x: c - w,
          y: y - k
        },
        "*": {
          x: c * w,
          y: y * k
        },
        "/": {
          x: c / w,
          y: y / k
        }
      };
      return S[r];
    }, H = function(s) {
      return {
        x: s.left,
        y: s.top
      };
    }, te = function(s) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: s.x,
        top: s.y,
        right: s.x,
        bottom: s.y,
        width: r,
        height: r
      };
    }, G = function(s) {
      return {
        x: s,
        y: s
      };
    }, We = function(u, s, r) {
      window.addEventListener("resize", s), window.addEventListener("scroll", s), u.forEach(function(g, c) {
        r.observe(g, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, Xe = function(u) {
      var s = Le(u);
      return s.x || s.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, rt = function(u) {
      var s = document.createElement("div");
      return s.style.position = "fixed", s.style.overflow = "hidden", s.style.pointerEvents = "none", s.style.zIndex = "999999999999999999", s.classList.add(u), s;
    }, it = function(u) {
      var s = document.createElement("div");
      return s.style.position = "absolute", u || (s.style.background = "rgba(0, 0, 255, 0.1)", s.style.border = "1px solid rgba(0, 0, 255, 0.45)", s.style.display = "none", s.style.pointerEvents = "none"), s;
    }, nt = function(u, s) {
      var r;
      return function() {
        for (var g = arguments.length, c = new Array(g), y = 0; y < g; y++)
          c[y] = arguments[y];
        var w = function() {
          r = null, u.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(w, s);
      };
    }, Ne = function() {
      var u, s, r, g;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((s = document.documentElement) === null || s === void 0 ? void 0 : s.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((g = document.documentElement) === null || g === void 0 ? void 0 : g.scrollLeft) || 0
      };
    }, gt = function(u, s) {
      if (u instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var r = u.getBoundingClientRect();
      return {
        top: r.top,
        left: r.left,
        bottom: r.bottom,
        right: r.right,
        width: (u.clientWidth || r.width) * s,
        height: (u.clientHeight || r.height) * s
      };
    }, Le = function(u) {
      return !u || u instanceof Document ? Ne() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : Ne().x,
        y: u.scrollTop >= 0 ? u.scrollTop : Ne().y
      };
    }, Rt = function(u) {
      var s = u.elementRect, r = u.containerRect, g = u.tolerance, c = g === void 0 ? {
        x: 0,
        y: 0
      } : g, y = [];
      return s.top - c.y < r.top && y.push("top"), s.left - c.x < r.left && y.push("left"), s.bottom + c.y > r.bottom && y.push("bottom"), s.right + c.y > r.right && y.push("right"), y;
    }, Ur = function(u) {
      var s = u.event;
      return {
        x: s.clientX,
        y: s.clientY
      };
    }, Kr = function(u) {
      var s = u.scrollAmount, r = u.initialPointerPos, g = u.pointerPos, c = {};
      return g.x > r.x - s.x ? (c.left = r.x - s.x, c.width = g.x - r.x + s.x) : (c.left = g.x, c.width = r.x - g.x - s.x), g.y > r.y - s.y ? (c.top = r.y - s.y, c.height = g.y - r.y + s.y) : (c.top = g.y, c.height = r.y - g.y - s.y), c;
    }, Ht = function(s) {
      var r = {
        x: 0,
        y: 0
      }, g = window.getComputedStyle(s);
      if (!g.transform || g.transform === "none")
        return r;
      if (g.transform.indexOf("3d") >= 0) {
        var c = g.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var y, w = (y = c[1]) === null || y === void 0 ? void 0 : y.split(",");
          r.x = parseInt(w[12]) || 0, r.y = parseInt(w[13]) || 0;
        }
        return r;
      } else {
        var k = g.transform.trim().match(/matrix\((.*?)\)/);
        if (k && k.length) {
          var S, O = (S = k[1]) === null || S === void 0 ? void 0 : S.split(",");
          r.x = parseInt(O[4]) || 0, r.y = parseInt(O[5]) || 0;
        }
        return r;
      }
    }, Yr = function(s) {
      var r = s.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Ht(s);
      var g = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var y, w = (y = c[0]) === null || y === void 0 ? void 0 : y.split("(");
        if (w) {
          var k, S = (k = w[1]) === null || k === void 0 ? void 0 : k.split(",");
          g.x = parseInt(S[0]) || 0, g.y = parseInt(S[1]) || 0;
        }
      }
      return !g.x && !g.x ? Ht(s) : g;
    }, Wr = function(s) {
      var r = s.style, g = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!g.x && !g.x) {
        var c = window.getComputedStyle(s);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return g;
    }, Xr = function(u, s) {
      return s ? Yr(u) : Wr(u);
    }, Fr = function(u) {
      var s = u.element, r = u.edges, g = u.elementRect, c = u.containerRect, y = u.elementPos, w = u.useTransform;
      r.includes("top") && Fe(s, {
        y: y.y + c.top - g.top,
        x: y.x
      }, w), r.includes("left") && Fe(s, {
        y: y.y,
        x: y.x + c.left - g.left
      }, w), r.includes("bottom") && Fe(s, {
        y: y.y + c.bottom - g.bottom,
        x: y.x
      }, w), r.includes("right") && Fe(s, {
        y: y.y,
        x: y.x + c.right - g.right
      }, w);
    }, Ut = function(u) {
      var s = u.computedStyle, r = u.node, g = s.position, c = g === "absolute" || g === "relative" || g === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, qr = function(u) {
      var s = u.shiftKey, r = u.keyboardDragSpeed, g = u.zoom, c = u.key, y = u.dragKeys, w = u.scrollDiff, k = u.canScroll, S = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, E = s ? r * 4 * g : r * g;
      return y.left.includes(c) && (O.x = w.x || -E, !s && !w.x && k && S(["left"], r)), y.right.includes(c) && (O.x = w.x || E, !s && !w.x && k && S(["right"], r)), y.up.includes(c) && (O.y = w.y || -E, !s && !w.y && k && S(["top"], r)), y.down.includes(c) && (O.y = w.y || E, !s && !w.y && k && S(["bottom"], r)), O;
    }, Gr = function(u) {
      var s = u.element, r = u.force, g = u.multiSelectionToggle, c = u.SelectedSet, y = u.hoverClassName;
      s.classList.contains(y) && !r || (c.has(s) ? g && c.delete(s) : c.add(s), s.classList.add(y));
    }, Jr = function(u) {
      var s = u.element, r = u.force, g = u.SelectedSet, c = u.PrevSelectedSet, y = u.hoverClassName;
      if (!s.classList.contains(y) && !r)
        return !1;
      var w = g.has(s), k = c.has(s);
      w && !k ? g.delete(s) : !w && k && g.add(s), s.classList.remove(y);
    }, vt = function(u, s) {
      return u.left < s.right && u.right > s.left && u.top < s.bottom && u.bottom > s.top;
    }, Kt = function(u) {
      var s = u.element, r = u.posDirection, g = u.containerRect, c = u.useTransform, y = Xr(s, c), w = Y(y, "+", r);
      Fe(s, w, c);
      var k = s.getBoundingClientRect(), S = Rt({
        elementRect: k,
        containerRect: g
      });
      Fr({
        element: s,
        edges: S,
        elementRect: k,
        containerRect: g,
        elementPos: w,
        useTransform: c
      });
    }, Zr = function(u, s) {
      window.removeEventListener("resize", s), window.removeEventListener("scroll", s), u.disconnect();
    }, Qr = function(u, s, r) {
      if (!!s.length) {
        var g = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? g || document.body : u, y = s.includes("top") && c.scrollTop > 0, w = s.includes("bottom") && c.scrollTop < c.scrollHeight, k = s.includes("left") && c.scrollLeft > 0, S = s.includes("right") && c.scrollLeft < c.scrollWidth;
        y && (c.scrollTop -= 1 * r), w && (c.scrollTop += 1 * r), k && (c.scrollLeft -= 1 * r), S && (c.scrollLeft += 1 * r);
      }
    }, Fe = function(u, s, r) {
      if (r) {
        var g = u.style.transform;
        u.style.transform = "translate3d(".concat(s.x, "px,").concat(s.y, "px,1px) ").concat(g.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(s.x, "px"), u.style.top = "".concat(s.y, "px");
      return u;
    }, ei = function(u) {
      for (var s = u.subscribe, r = u.publish, g = u.Interaction, c = u.SelectedSet, y = {
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
          condition: function(E) {
            return E.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, w = function() {
        var E = ne(S[k], 2), j = E[0], K = E[1];
        ["pre", !1].forEach(function(Q) {
          return s(Q ? "".concat(j, ":").concat(Q) : j, function(me) {
            return K.forEach(function(re) {
              return (!re.condition || re.condition(me)) && r(Q ? "".concat(Q).concat(re.name) : re.name, h({
                items: c.elements,
                isDragging: g.isDragging
              }, me));
            });
          });
        });
      }, k = 0, S = Object.entries(y); k < S.length; k++)
        w();
    }, je = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : F(u) : [];
    }, Yt = function(u, s) {
      u.style.left = "".concat(s.left, "px"), u.style.top = "".concat(s.top, "px"), u.style.width = "".concat(s.width, "px"), u.style.height = "".concat(s.height, "px");
    }, ti = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.area, c = s.PS, y = s.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(w) {
          r._node = w, Ut({
            computedStyle: r.computedStyle,
            node: r._node
          }), setTimeout(function() {
            r.PubSub.publish("Area:modified:pre", {
              item: r
            }), r.reset(), r.PubSub.publish("Area:modified", {
              item: r
            });
          });
        }), i(this, "start", function() {
          We(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), i(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), i(this, "stop", function() {
          Zr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(w, k) {
          var S = {
            scroll_directions: w,
            scroll_multiplier: k
          };
          r.PubSub.publish("Area:scroll:pre", S), Qr(r._node, w, k), r.PubSub.publish("Area:scroll", S);
        }), this._zoom = y, this.PubSub = c, this.setArea(g), this._modificationCallback = nt(function(w) {
          r.PubSub.publish("Area:modified:pre", {
            event: w,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: w,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return a(u, [{
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
          return this._rect ? this._rect : this._rect = gt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function g(c) {
            var y, w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, k = (y = c[w]) === null || y === void 0 ? void 0 : y.parentNode;
            return k ? (c.push(k), w++, g(c, w)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), ri = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.dragKeys, y = s.draggability, w = s.keyboardDrag, k = s.keyboardDragSpeed, S = s.useTransform, O = s.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(E) {
          var j = E.event, K = E.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var Q = {
              event: j,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], Q), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var me = qr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: K,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(re) {
              return Kt({
                element: re,
                posDirection: me,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], Q);
          }
        }), i(this, "keyboardEnd", function(E) {
          var j = E.event, K = E.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var Q = {
              event: j,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], Q);
          }
        }), i(this, "start", function(E) {
          var j = E.isDragging, K = E.isDraggingKeyboard;
          !j || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(E) {
          E != null && E.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(E) {
          var j = E.isDragging, K = E.isDraggingKeyboard;
          if (!(!j || !r._elements.length || K || r.DS.continue)) {
            var Q = Y(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(me) {
              return Kt({
                element: me,
                posDirection: Q,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function(E) {
          r._elements.forEach(function(j) {
            return j.style.zIndex = "".concat((parseInt(j.style.zIndex) || 0) + E ? 9999 : -9998);
          });
        }), this.DS = g, this._useTransform = S, this._keyboardDragSpeed = k, this._keyboardDrag = w, this._zoom = O, this._draggability = y, this._dragKeys = {
          up: c.up.map(function(E) {
            return E.toLowerCase();
          }),
          down: c.down.map(function(E) {
            return E.toLowerCase();
          }),
          left: c.left.map(function(E) {
            return E.toLowerCase();
          }),
          right: c.right.map(function(E) {
            return E.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(F(this._dragKeys.up), F(this._dragKeys.down), F(this._dragKeys.left), F(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return a(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, g = this._prevCursorPos ? Y(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, g;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, g = this._prevScrollPos ? Y(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, g;
        }
      }]), u;
    }(), ii = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.areaElement, y = s.draggability, w = s.immediateDrag, k = s.selectableClass;
        t(this, u), i(this, "_areaElement", void 0), i(this, "_draggability", void 0), i(this, "_immediateDrag", void 0), i(this, "_selectableClass", void 0), i(this, "isInteracting", void 0), i(this, "isDragging", void 0), i(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), i(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), i(this, "start", function(S) {
          return r.DS.publish("Interaction:start:pre", {
            event: S,
            isDragging: r.isDragging
          });
        }), i(this, "_start", function(S) {
          S.type === "touchstart" && S.preventDefault(), r._canInteract(S) && (r.isInteracting = !0, r.isDragging = r.isDragEvent(S), r.DS.publish("Interaction:start", {
            event: S,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), i(this, "isDragEvent", function(S) {
          var O = S.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) || !O ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(O) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            O
          )) : r.DS.SelectedSet.add(
            O
          )), !!r.DS.SelectedSet.has(O));
        }), i(this, "onClick", function(S) {
          var O = S.event;
          if (!!r._canInteract(O) && !(O.detail > 0)) {
            var E = r.DS, j = E.stores, K = j.PointerStore, Q = j.KeyStore, me = E.SelectableSet, re = E.SelectedSet;
            K.start(O);
            var Ve = O.target;
            !me.has(Ve) || (Q.isMultiSelectKeyPressed(O) || re.clear(), re.toggle(Ve), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(S) {
          var O = S.event, E = S.scroll_directions, j = S.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: O,
            scroll_directions: E,
            scroll_multiplier: j,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(S) {
          return r.DS.publish("Interaction:end:pre", {
            event: S,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(S) {
          var O = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: S,
            isDragging: O
          });
        }), this._areaElement = c, this._draggability = y, this._immediateDrag = w, this._selectableClass = k, this.DS = g, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(S) {
          var O = S.event;
          return r.start(O);
        }), this.DS.subscribe("Interaction:start:pre", function(S) {
          var O = S.event;
          return r._start(O);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(S) {
          var O = S.event;
          return r._reset(O);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return a(u, [{
        key: "_canInteract",
        value: function(r) {
          var g = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !g && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ni = function u(s) {
      var r = this, g = s.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(c, y) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(y), r.subscribers[c].length - 1;
      }), i(this, "unsubscribe", function(c, y, w) {
        w >= 0 ? r.subscribers[c].splice(w, 1) : y && (r.subscribers[c] = r.subscribers[c].filter(function(k) {
          return k !== y;
        }));
      }), i(this, "publish", function(c, y) {
        Array.isArray(c) ? c.forEach(function(w) {
          return r._publish(w, y);
        }) : r._publish(c, y);
      }), i(this, "_publish", function(c, y) {
        var w = r.subscribers[c];
        !Array.isArray(w) || (c.includes(":pre") ? r._handlePrePublish(w, y) : r._handlePublish(w, y));
      }), i(this, "_handlePublish", function(c, y) {
        for (var w = 0, k = c.length; w < k; w++) {
          if (r.DS.stopped)
            return;
          c[w](y);
        }
      }), i(this, "_handlePrePublish", function(c, y) {
        for (var w = c.length; w--; ) {
          if (r.DS.stopped)
            return;
          c[w](y);
        }
      }), this.DS = g;
    }, oi = /* @__PURE__ */ function(u) {
      m(r, u);
      var s = z(r);
      function r(g) {
        var c, y = g.elements, w = g.className, k = g.hoverClassName, S = g.draggability, O = g.useTransform, E = g.DS;
        return t(this, r), c = s.call(this), i(T(c), "_initElements", void 0), i(T(c), "_className", void 0), i(T(c), "_hoverClassName", void 0), i(T(c), "_useTransform", void 0), i(T(c), "_draggability", void 0), i(T(c), "init", function() {
          return c._initElements.forEach(function(j) {
            return c.add(j);
          });
        }), i(T(c), "clear", function() {
          return c.forEach(function(j) {
            return c.delete(j);
          });
        }), i(T(c), "_onClick", function(j) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: j
          });
        }), i(T(c), "_onPointer", function(j) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: j
          });
        }), i(T(c), "addAll", function(j) {
          return j.forEach(function(K) {
            return c.add(K);
          });
        }), i(T(c), "deleteAll", function(j) {
          return j.forEach(function(K) {
            return c.delete(K);
          });
        }), c.DS = E, c._initElements = je(y), c._className = w, c._hoverClassName = k, c._useTransform = O, c._draggability = S, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Ut({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), P(v(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), P(v(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ M(Set)), ai = /* @__PURE__ */ function(u) {
      m(r, u);
      var s = z(r);
      function r(g) {
        var c, y = g.className, w = g.DS;
        return t(this, r), c = s.call(this), i(T(c), "_className", void 0), i(T(c), "clear", function() {
          return c.forEach(function(k) {
            return c.delete(k);
          });
        }), i(T(c), "addAll", function(k) {
          return k.forEach(function(S) {
            return c.add(S);
          });
        }), i(T(c), "deleteAll", function(k) {
          return k.forEach(function(S) {
            return c.delete(S);
          });
        }), c.DS = w, c._className = y, c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          if (!P(v(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", y), P(v(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!P(v(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", y);
            var w = P(v(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", y), w;
          }
        }
      }, {
        key: "toggle",
        value: function(c) {
          return this.has(c) ? this.delete(c) : this.add(c), c;
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ M(Set)), si = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.hoverClassName, y = s.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(w) {
          var k = w.event, S = w.isDragging;
          S || (r._storePrevious(k), r._handleInsideSelection(!0, k));
        }), i(this, "update", function(w) {
          var k = w.isDragging;
          k || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(w, k) {
          for (var S = r.DS, O = S.SelectableSet, E = S.SelectorArea, j = S.Selector, K = O.elements.map(function(De) {
            return [De, De.getBoundingClientRect()];
          }), Q = [], me = [], re = 0, Ve = K.length; re < Ve; re++)
            !E.isInside(K[re][0], K[re][1]) || (vt(K[re][1], j.rect) ? Q.push(K[re][0]) : me.push(K[re][0]));
          var ot = r.DS.stores.KeyStore.isMultiSelectKeyPressed(k) && r._multiSelectToggling;
          r.DS.continue || (Q.forEach(function(De) {
            return Gr({
              element: De,
              force: w,
              multiSelectionToggle: ot,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), me.forEach(function(De) {
            return Jr({
              element: De,
              force: w,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = y, this.DS = g, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return a(u, [{
        key: "_storePrevious",
        value: function(r) {
          var g = this.DS, c = g.stores.KeyStore, y = g.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), li = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.selector, y = s.selectorClass, w = s.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(k) {
          var S = k.isDragging;
          if (!S) {
            var O = r.DS.stores.PointerStore, E = O.initialValArea;
            Yt(r.HTMLNode, te(E, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(k) {
          var S = k.isDragging;
          if (!(S || r.DS.continue)) {
            var O = r.DS.stores, E = O.ScrollStore, j = O.PointerStore, K = Kr({
              scrollAmount: E.scrollAmount,
              initialPointerPos: j.initialValArea,
              pointerPos: j.currentValArea
            });
            Yt(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = g, this.HTMLNode = c || it(w), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return a(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.selectorAreaClass, y = s.autoScrollSpeed, w = s.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", S = document.body ? "body" : "documentElement", O = "".concat(k, "Child");
          r.HTMLNode[O](r.DS.Selector.HTMLNode), document[S][O](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var k = r.DS.Area.rect, S = r.DS.Area.computedBorder, O = r.HTMLNode.style, E = "".concat(k.top + S.top, "px"), j = "".concat(k.left + S.left, "px"), K = "".concat(k.width, "px"), Q = "".concat(k.height, "px");
          O.top !== E && (O.top = E), O.left !== j && (O.left = j), O.width !== K && (O.width = K), O.height !== Q && (O.height = Q);
        }), i(this, "stop", function(k) {
          r.stopAutoScroll(), k && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var k = r.DS, S = k.stores.PointerStore, O = k.Area;
            r.currentEdges = Rt({
              elementRect: te(S.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && O.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(k, S) {
          return r.DS.Area.HTMLNode.contains(k) && r.DS.stores.ScrollStore.canScroll ? !0 : vt(r.rect, S || k.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = w, this.DS = g, this.HTMLNode = rt(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return a(u, [{
        key: "isClicked",
        value: function(r) {
          var g = this.DS.stores.PointerStore, c = r ? g.getPointerPosition(r) : g.initialVal;
          return vt({
            left: c.x,
            top: c.y,
            right: c.x,
            bottom: c.y
          }, this.rect);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.multiSelectKeys, y = s.multiSelectMode;
        t(this, u), i(this, "_multiSelectMode", void 0), i(this, "_multiSelectKeys", void 0), i(this, "_currentValues", /* @__PURE__ */ new Set()), i(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), i(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), i(this, "keydown", function(w) {
          var k = w.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: w,
            key: k
          }), r._currentValues.add(k), r.DS.publish("KeyStore:down", {
            event: w,
            key: k
          });
        }), i(this, "keyup", function(w) {
          var k = w.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: w,
            key: k
          }), r._currentValues.delete(k), r.DS.publish("KeyStore:up", {
            event: w,
            key: k
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = g, this._multiSelectMode = y, this._multiSelectKeys = c.map(function(w) {
          var k = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, S = k[w];
          return S ? (console.warn("[DragSelect] ".concat(w, ' is deprecated. Use "').concat(S, '" instead. Act Now!. See docs for more info')), S.toLowerCase()) : w.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return a(u, [{
        key: "isMultiSelectKeyPressed",
        value: function(r) {
          var g = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(c) {
            return g._multiSelectKeys.includes(c);
          }) || r && this._multiSelectKeys.some(function(c) {
            return r[g._keyMapping[c]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), u;
    }(), di = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(c) {
          return Ur({
            event: r._normalizedEvent(c)
          });
        }), i(this, "update", function(c) {
          !c || (r.DS.publish("PointerStore:updated:pre", {
            event: c
          }), r.currentVal = r.getPointerPosition(c), r._isMouseInteraction && r.DS.publish("PointerStore:updated", {
            event: c
          }));
        }), i(this, "stop", function() {
          document.removeEventListener("mousemove", r.update), document.removeEventListener("touchmove", r.update, {
            passive: !1
          }), setTimeout(function() {
            return r._isMouseInteraction = !1;
          }, 100);
        }), i(this, "reset", function(c) {
          !c || (r.currentVal = r.lastVal = r.getPointerPosition(c), r.stop(), r.init());
        }), this.DS = g, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var y = c.event;
          return r.start(y);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var y = c.event;
          return r.reset(y);
        });
      }
      return a(u, [{
        key: "start",
        value: function(r) {
          !r || (this._isMouseInteraction = !0, this.currentVal = this.initialVal = this.getPointerPosition(r));
        }
      }, {
        key: "_normalizedEvent",
        value: function(r) {
          return "touches" in r && r.type !== "touchend" && (this._lastTouch = r), "touches" in r ? this._lastTouch.touches[0] : r;
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
        set: function(r) {
          this._initialVal = r, this._initialValArea = r && Y(r, "-", Y(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal ? this._currentVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._currentVal = r, this._currentValArea = r && Y(r, "-", Y(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }, {
        key: "lastVal",
        get: function() {
          return this._lastVal ? this._lastVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._lastVal = r, this._lastValArea = r && Y(r, "-", Y(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), hi = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.DS, c = s.areaElement, y = s.zoom;
        t(this, u), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_areaElement", void 0), i(this, "_canScroll", void 0), i(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "start", function() {
          r._currentVal = r._initialVal = Le(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "update", function() {
          return r._currentVal = Le(r._areaElement);
        }), i(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), i(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = c, this.DS = g, this.zoom = y, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return a(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Xe(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = Y(this.currentVal, "-", this.initialVal), g = G(this.zoom), c = Y(Y(r, "*", g), "-", r);
          return {
            x: r.x + c.x,
            y: r.y + c.y
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
          return this._currentVal || (this._currentVal = Le(this._areaElement)), this._currentVal;
        }
      }]), u;
    }(), fi = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.area, c = g === void 0 ? document : g, y = s.selectables, w = y === void 0 ? [] : y, k = s.autoScrollSpeed, S = k === void 0 ? 5 : k, O = s.overflowTolerance, E = O === void 0 ? {
          x: 25,
          y: 25
        } : O, j = s.zoom, K = j === void 0 ? 1 : j, Q = s.customStyles, me = Q === void 0 ? !1 : Q, re = s.multiSelectMode, Ve = re === void 0 ? !1 : re, ot = s.multiSelectToggling, De = ot === void 0 ? !0 : ot, Wt = s.multiSelectKeys, mi = Wt === void 0 ? ["Control", "Shift", "Meta"] : Wt, Xt = s.selector, pi = Xt === void 0 ? void 0 : Xt, Ft = s.draggability, bt = Ft === void 0 ? !0 : Ft, qt = s.immediateDrag, gi = qt === void 0 ? !0 : qt, Gt = s.keyboardDrag, vi = Gt === void 0 ? !0 : Gt, bi = s.dragKeys, Jt = s.keyboardDragSpeed, yi = Jt === void 0 ? 10 : Jt, Zt = s.useTransform, Qt = Zt === void 0 ? !0 : Zt, er = s.hoverClass, tr = er === void 0 ? "ds-hover" : er, rr = s.selectableClass, ir = rr === void 0 ? "ds-selectable" : rr, nr = s.selectedClass, wi = nr === void 0 ? "ds-selected" : nr, or = s.selectorClass, xi = or === void 0 ? "ds-selector" : or, ar = s.selectorAreaClass, _i = ar === void 0 ? "ds-selector-area" : ar, ki = s.callback, Si = s.onDragMove, Di = s.onDragStartBegin, Ci = s.onDragStart, Mi = s.onElementSelect, $i = s.onElementUnselect;
        t(this, u), i(this, "continue", !1), i(this, "start", function() {
          r.stopped = !1, r.Interaction.init();
        }), i(this, "break", function() {
          return r.continue = !0;
        }), i(this, "getSelection", function() {
          return r.SelectedSet.elements;
        }), i(this, "getSelectables", function() {
          return r.SelectableSet.elements;
        }), i(this, "getInitialCursorPosition", function() {
          return r.stores.PointerStore.initialVal;
        }), i(this, "getCurrentCursorPosition", function() {
          return r.stores.PointerStore.currentVal;
        }), i(this, "getPreviousCursorPosition", function() {
          return r.stores.PointerStore.lastVal;
        }), i(this, "getInitialCursorPositionArea", function() {
          return r.stores.PointerStore.initialValArea;
        }), i(this, "getCurrentCursorPositionArea", function() {
          return r.stores.PointerStore.currentValArea;
        }), i(this, "getPreviousCursorPositionArea", function() {
          return r.stores.PointerStore.lastValArea;
        }), i(this, "isMultiSelect", function(Ei) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ei);
        }), i(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ni({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: ki,
          onDragMove: Si,
          onDragStart: Ci,
          onDragStartBegin: Di,
          onElementSelect: Mi,
          onElementUnselect: $i
        }), this.stores = {
          PointerStore: new di({
            DS: this
          }),
          ScrollStore: new hi({
            DS: this,
            areaElement: c,
            zoom: K
          }),
          KeyStore: new ui({
            DS: this,
            multiSelectKeys: mi,
            multiSelectMode: Ve
          })
        }, this.Area = new ti({
          area: c,
          PS: this.PubSub,
          zoom: K
        }), this.Selector = new li({
          DS: this,
          selector: pi,
          selectorClass: xi,
          customStyles: me
        }), this.SelectorArea = new ci({
          DS: this,
          selectorAreaClass: _i,
          autoScrollSpeed: S,
          overflowTolerance: E
        }), this.SelectableSet = new oi({
          elements: w,
          DS: this,
          className: ir,
          hoverClassName: tr,
          useTransform: Qt,
          draggability: bt
        }), this.SelectedSet = new ai({
          DS: this,
          className: wi
        }), this.Selection = new si({
          DS: this,
          hoverClassName: tr,
          multiSelectToggling: De
        }), this.Drag = new ri({
          DS: this,
          draggability: bt,
          useTransform: Qt,
          keyboardDrag: vi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, bi),
          zoom: K,
          keyboardDragSpeed: yi
        }), this.Interaction = new ii({
          areaElement: c,
          DS: this,
          draggability: bt,
          immediateDrag: gi,
          selectableClass: ir
        }), ei({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return a(u, [{
        key: "_callbacksTemp",
        value: function(r) {
          var g = r.callback, c = r.onDragMove, y = r.onDragStart, w = r.onDragStartBegin, k = r.onElementSelect, S = r.onElementUnselect, O = function(j, K) {
            return console.warn("[DragSelect] ".concat(j, ' is deprecated. Use DragSelect.subscribe("').concat(K, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          g && (O("callback", "callback"), this.subscribe("callback", function(E) {
            var j = E.items;
            E.item;
            var K = E.event;
            return g(j, K);
          })), c && (O("onDragMove", "dragmove"), this.subscribe("dragmove", function(E) {
            E.items, E.item;
            var j = E.event;
            return c(j);
          })), y && (O("onDragStart", "dragstart"), this.subscribe("dragstart", function(E) {
            E.items, E.item;
            var j = E.event;
            return y(j);
          })), w && (O("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(E) {
            E.items, E.item;
            var j = E.event;
            return w(j);
          })), k && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function(E) {
            E.items;
            var j = E.item, K = E.event;
            return k(j, K);
          })), S && (O("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(E) {
            E.items;
            var j = E.item, K = E.event;
            return S(j, K);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          c && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), g && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(je(r)), c || this.addSelectables(r), g && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(je(r)), c && this.removeSelectables(r), g && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var g = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return je(r).forEach(function(w) {
            return g.SelectedSet.has(w) ? g.removeSelection(r, c, y) : g.addSelection(r, c, y);
          }), c && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, g, c), this.getSelection();
        }
      }, {
        key: "clearSelection",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return this.SelectedSet.clear(), r && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "addSelectables",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = je(r);
          return this.SelectableSet.addAll(c), g && this.SelectedSet.addAll(c), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, g), this.addSelectables(r, c);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(je(r)), g && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var c = g ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), y = r ? g ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : g ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return Y(c, "-", y);
        }
      }]), u;
    }();
    return fi;
  });
})(Mr);
const kn = Mr.exports, Sn = (o, e, t, n, a) => (e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B"), Dn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), Cn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Mn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), $n = [
  Mn
], En = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Tn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), An = [
  Tn
], On = {
  name: "VFSortIcon"
}, st = /* @__PURE__ */ Object.assign(On, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (x(), C("div", null, [
      o.direction == "down" ? (x(), C("svg", Cn, $n)) : oe("", !0),
      o.direction == "up" ? (x(), C("svg", En, An)) : oe("", !0)
    ]));
  }
}), Pn = ["onClick"], In = {
  name: "VFToast.vue"
}, Nn = /* @__PURE__ */ Object.assign(In, {
  setup(o) {
    const e = R("emitter"), { getStore: t } = R("storage"), n = V(t("full-screen", !1)), a = (m) => m == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = V([]), l = (m) => {
      i.value.splice(m, 1);
    }, h = (m) => {
      let v = i.value.findIndex((f) => f.id === m);
      v !== -1 && l(v);
    };
    return e.on("vf-toast-push", (m) => {
      let v = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      m.id = v, i.value.push(m), setTimeout(() => {
        h(v);
      }, 5e3);
    }), (m, v) => (x(), C("div", {
      class: ue([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      ye(Ti, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: ee(() => [
          (x(!0), C(se, null, ve(i.value, (f, p) => (x(), C("div", {
            onClick: (b) => l(p),
            key: f,
            class: ue([a(f.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, $(f.label), 11, Pn))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Ie = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: Ln } = ke(), Dt = (o, e) => Ln.value + "?" + Ie({ q: "preview", adapter: o, path: e }), jn = { class: "relative flex-auto flex flex-col overflow-hidden" }, Vn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, zn = { class: "absolute" }, Bn = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Rn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Hn = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Un = { class: "grid grid-cols-12 items-center" }, Kn = { class: "flex col-span-7 items-center" }, Yn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xn = [
  Wn
], Fn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Gn = [
  qn
], Jn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Zn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Qn = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], eo = { class: "grid grid-cols-12 items-center" }, to = { class: "flex col-span-7 items-center" }, ro = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, io = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), no = [
  io
], oo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ao = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), so = [
  ao
], lo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, co = { class: "col-span-2 text-center" }, uo = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, ho = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], fo = { class: "relative" }, mo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, po = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), go = [
  po
], vo = ["src"], bo = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), wo = [
  yo
], xo = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, _o = { class: "break-all" }, ko = {
  name: "VFExplorer"
}, So = /* @__PURE__ */ Object.assign(ko, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { setStore: n, getStore: a } = R("storage"), i = (L) => L == null ? void 0 : L.substring(0, 3), l = (L) => L.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), h = V(null), m = V(null), v = V(0), f = V(null), { t: p } = R("i18n"), b = Math.floor(Math.random() * 2 ** 32), A = V(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      A.value = !A.value, n("full-screen", A.value);
    });
    const M = V("");
    t.on("vf-search-query", ({ newQuery: L }) => {
      M.value = L, L ? t.emit("vf-fetch", { params: { q: "search", adapter: e.data.adapter, path: e.data.dirname, filter: L } }) : t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let T = null;
    const I = () => {
      T && clearTimeout(T);
    }, z = (L) => {
      T = setTimeout(() => {
        B(L);
      }, 500);
    }, B = (L) => {
      L.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: L.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: L });
    }, P = dt({ active: !1, column: "", order: "" }), ne = (L = !0) => {
      let U = [...e.data.files], N = P.column, Y = P.order == "asc" ? 1 : -1;
      if (!L)
        return U;
      const H = (te, G) => typeof te == "string" && typeof G == "string" ? te.toLowerCase().localeCompare(G.toLowerCase()) : te < G ? -1 : te > G ? 1 : 0;
      return P.active && (U = U.slice().sort((te, G) => H(te[N], G[N]) * Y)), U;
    }, F = (L) => {
      P.active && P.column == L ? (P.active = P.order == "asc", P.column = L, P.order = "desc") : (P.active = !0, P.column = L, P.order = "asc");
    }, D = () => f.value.getSelection().map((L) => JSON.parse(L.dataset.item)), X = (L, U) => {
      if (L.altKey || L.ctrlKey || L.metaKey)
        return L.preventDefault(), !1;
      L.dataTransfer.setDragImage(m.value, 0, 15), L.dataTransfer.effectAllowed = "all", L.dataTransfer.dropEffect = "copy", L.dataTransfer.setData("items", JSON.stringify(D()));
    }, q = (L, U) => {
      L.preventDefault();
      let N = JSON.parse(L.dataTransfer.getData("items"));
      if (N.find((Y) => Y.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: N, to: U } });
    }, le = (L, U) => {
      L.preventDefault(), !U || U.type !== "dir" || f.value.getSelection().find((N) => N == L.currentTarget) ? (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none") : L.dataTransfer.dropEffect = "copy";
    };
    return xe(() => {
      f.value = new kn({
        area: h.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => mt(() => {
        f.value.clearSelection(), f.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), f.value.subscribe("predragstart", ({ event: L, isDragging: U }) => {
        if (U)
          v.value = f.value.getSelection().length, f.value.break();
        else {
          const N = L.target.offsetWidth - L.offsetX, Y = L.target.offsetHeight - L.offsetY;
          N < 15 && Y < 15 && (f.value.clearSelection(), f.value.break());
        }
      }), f.value.subscribe("predragmove", ({ isDragging: L }) => {
        L && f.value.break();
      }), f.value.subscribe("callback", ({ items: L, event: U, isDragging: N }) => {
        t.emit("vf-nodes-selected", D()), v.value = f.value.getSelection().length;
      });
    }), Ai(() => f.value.start()), xe(() => {
      Nt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (L, U) => (x(), C("div", jn, [
      o.view == "list" || M.value.length ? (x(), C("div", Vn, [
        d("div", {
          onClick: U[0] || (U[0] = (N) => F("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          Me($(_(p)("Name")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "basename"]
          ])
        ]),
        M.value.length ? oe("", !0) : (x(), C("div", {
          key: 0,
          onClick: U[1] || (U[1] = (N) => F("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          Me($(_(p)("Size")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "file_size"]
          ])
        ])),
        M.value.length ? oe("", !0) : (x(), C("div", {
          key: 1,
          onClick: U[2] || (U[2] = (N) => F("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          Me($(_(p)("Date")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "last_modified"]
          ])
        ])),
        M.value.length ? (x(), C("div", {
          key: 2,
          onClick: U[3] || (U[3] = (N) => F("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          Me($(_(p)("Filepath")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "path"]
          ])
        ])) : oe("", !0)
      ])) : oe("", !0),
      d("div", zn, [
        d("div", {
          ref_key: "dragImage",
          ref: m,
          class: "absolute -z-50 -top-96"
        }, [
          Bn,
          d("div", Rn, $(v.value), 1)
        ], 512)
      ]),
      d("div", {
        class: ue([A.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: h,
        onContextmenu: U[7] || (U[7] = Oe((N) => _(t).emit("vf-contextmenu-show", { event: N, area: h.value, items: D() }), ["self", "prevent"]))
      }, [
        M.value.length ? (x(!0), C(se, { key: 0 }, ve(ne(), (N, Y) => (x(), C("div", {
          onDblclick: (H) => B(N),
          onTouchstart: (H) => z(N),
          onTouchend: U[4] || (U[4] = (H) => I()),
          onContextmenu: Oe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: h.value, items: D(), target: N }), ["prevent"]),
          class: ue(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          d("div", Un, [
            d("div", Kn, [
              N.type == "dir" ? (x(), C("svg", Yn, Xn)) : (x(), C("svg", Fn, Gn)),
              d("span", Jn, $(N.basename), 1)
            ]),
            d("div", Zn, $(N.path), 1)
          ])
        ], 42, Hn))), 256)) : oe("", !0),
        o.view == "list" && !M.value.length ? (x(!0), C(se, { key: 1 }, ve(ne(), (N, Y) => (x(), C("div", {
          draggable: "true",
          onDblclick: (H) => B(N),
          onTouchstart: (H) => z(N),
          onTouchend: U[5] || (U[5] = (H) => I()),
          onContextmenu: Oe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: h.value, items: D(), target: N }), ["prevent"]),
          onDragstart: (H) => X(H),
          onDragover: (H) => le(H, N),
          onDrop: (H) => q(H, N),
          class: ue(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          d("div", eo, [
            d("div", to, [
              N.type == "dir" ? (x(), C("svg", ro, no)) : (x(), C("svg", oo, so)),
              d("span", lo, $(N.basename), 1)
            ]),
            d("div", co, $(N.file_size ? _(Sn)(N.file_size) : ""), 1),
            d("div", uo, $(_(Dn)(N.last_modified)), 1)
          ])
        ], 42, Qn))), 256)) : oe("", !0),
        o.view == "grid" && !M.value.length ? (x(!0), C(se, { key: 2 }, ve(ne(!1), (N, Y) => {
          var H, te;
          return x(), C("div", {
            draggable: "true",
            onDblclick: (G) => B(N),
            onTouchstart: (G) => z(N),
            onTouchend: U[6] || (U[6] = (G) => I()),
            onContextmenu: Oe((G) => _(t).emit("vf-contextmenu-show", { event: G, area: h.value, items: D(), target: N }), ["prevent"]),
            onDragstart: (G) => X(G),
            onDragover: (G) => le(G, N),
            onDrop: (G) => q(G, N),
            class: ue(["vf-item-" + _(b), "border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"]),
            "data-type": N.type,
            "data-item": JSON.stringify(N),
            "data-index": Y
          }, [
            d("div", null, [
              d("div", fo, [
                N.type == "dir" ? (x(), C("svg", mo, go)) : ((H = N.mime_type) != null ? H : "").startsWith("image") ? (x(), C("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: _(Dt)(_(a)("adapter", e.data.adapter), N.path),
                  alt: ""
                }, null, 8, vo)) : (x(), C("svg", bo, wo)),
                ((te = N.mime_type) != null ? te : "").startsWith("image") ? oe("", !0) : (x(), C("div", xo, $(i(N.extension)), 1))
              ]),
              d("span", _o, $(l(N.basename)), 1)
            ])
          ], 42, ho);
        }), 256)) : oe("", !0)
      ], 34),
      ye(Nn)
    ]));
  }
}), Do = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Co = { class: "flex leading-5 items-center" }, Mo = ["aria-label"], $o = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), Eo = [
  $o
], To = ["value"], Ao = { class: "ml-3" }, Oo = { key: 0 }, Po = { class: "ml-1" }, Io = { class: "flex leading-5 items-center" }, No = {
  value: "",
  disabled: ""
}, Lo = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), jo = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), Vo = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), zo = ["aria-label"], Bo = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Ro = [
  Bo
], Ho = {
  name: "VFStatusbar"
}, Uo = /* @__PURE__ */ Object.assign(Ho, {
  props: {
    data: Object
  },
  setup(o) {
    var b;
    const e = o, t = R("emitter"), { getStore: n, setStore: a } = R("storage"), i = V(0), l = V((b = n("adapter")) != null ? b : e.data.adapter), { t: h, changeLocale: m } = R("i18n"), v = V(n("locale", "")), f = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: l.value } }), a("adapter", l.value);
    };
    t.on("vf-nodes-selected", (A) => {
      i.value = A.length;
    });
    const p = V("");
    return t.on("vf-search-query", ({ newQuery: A }) => {
      p.value = A;
    }), (A, M) => (x(), C("div", Do, [
      d("div", Co, [
        d("div", {
          class: "mx-2",
          "aria-label": _(h)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Eo, 8, Mo),
        ge(d("select", {
          "onUpdate:modelValue": M[0] || (M[0] = (T) => l.value = T),
          onChange: f,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (x(!0), C(se, null, ve(o.data.storages, (T) => (x(), C("option", { value: T }, $(T), 9, To))), 256))
        ], 544), [
          [sr, l.value]
        ]),
        d("div", Ao, [
          p.value.length ? (x(), C("span", Oo, $(o.data.files.length) + " items found. ", 1)) : oe("", !0),
          d("span", Po, $(i.value > 0 ? i.value + " " + _(h)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", Io, [
        ge(d("select", {
          "onUpdate:modelValue": M[1] || (M[1] = (T) => v.value = T),
          onChange: M[2] || (M[2] = (T) => _(m)(T.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", No, $(_(h)("Language")), 1),
          Lo,
          jo,
          Vo
        ], 544), [
          [sr, v.value]
        ]),
        d("span", {
          "aria-label": _(h)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: M[3] || (M[3] = (T) => _(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: _(h)("Vuefinder is a file manager component for vue 3.") }))
        }, Ro, 8, zo)
      ])
    ]));
  }
}), Ko = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Yo = (o, e, t) => {
  const n = V(o);
  return Oi((i, l) => ({
    get() {
      return i(), n.value;
    },
    set: Ko(
      (h) => {
        n.value = h, l();
      },
      e,
      t
    )
  }));
}, Wo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Xo = ["aria-label"], Fo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), qo = [
  Fo
], Go = ["onClick"], Jo = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Zo = [
  Jo
], Qo = { class: "flex leading-5" }, ea = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), ta = ["title", "onClick"], ra = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, ia = /* @__PURE__ */ d("svg", {
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  })
], -1), na = ["onKeydown", "placeholder"], oa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), aa = [
  oa
], sa = {
  name: "VFBreadcrumb"
}, la = /* @__PURE__ */ Object.assign(sa, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), a = V(null), i = V([]), l = V(!1), h = V(null), { t: m } = R("i18n");
    t.on("vf-explorer-update", () => {
      var B;
      let I = [], z = [];
      a.value = (B = e.data.dirname) != null ? B : n("adapter", "local") + "://", a.value.length == 0 && (i.value = []), a.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(P) {
        I.push(P), I.join("/") != "" && z.push({
          basename: P,
          name: P,
          path: n("adapter", "local") + "://" + I.join("/"),
          type: "dir"
        });
      }), z.length > 4 && (z = z.slice(-5), z[0].name = ".."), i.value = z;
    });
    const v = () => {
      l.value = !1, p.value = "";
    };
    t.on("vf-search-exit", () => {
      v();
    });
    const f = () => {
      l.value = !0, mt(() => h.value.focus());
    }, p = Yo("", 400);
    Nt(p, (I) => {
      t.emit("vf-search-query", { newQuery: I });
    });
    const b = () => i.value.length && !l.value, A = (I) => {
      var B;
      I.preventDefault();
      let z = JSON.parse(I.dataTransfer.getData("items"));
      if (z.find((P) => P.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: z, to: (B = i.value[i.value.length - 2]) != null ? B : { path: n("adapter", "local") + "://" } }
      });
    }, M = (I) => {
      I.preventDefault(), b() ? I.dataTransfer.dropEffect = "copy" : (I.dataTransfer.dropEffect = "none", I.dataTransfer.effectAllowed = "none");
    }, T = () => {
      p.value == "" && v();
    };
    return (I, z) => (x(), C("div", Wo, [
      d("span", {
        "aria-label": _(m)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (x(), C("svg", {
          onDragover: z[0] || (z[0] = (B) => M(B)),
          onDrop: z[1] || (z[1] = (B) => A(B)),
          onClick: z[2] || (z[2] = (B) => {
            var P, ne;
            return !b() || _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: (ne = (P = i.value[i.value.length - 2]) == null ? void 0 : P.path) != null ? ne : _(n)("adapter", "local") + "://" } });
          }),
          class: ue(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, qo, 34))
      ], 8, Xo),
      l.value ? (x(), C("div", ra, [
        ia,
        ge(d("input", {
          ref_key: "searchInput",
          ref: h,
          onKeydown: Ke(v, ["esc"]),
          onBlur: T,
          "onUpdate:modelValue": z[4] || (z[4] = (B) => Pi(p) ? p.value = B : null),
          placeholder: _(m)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, na), [
          [Ye, _(p)]
        ]),
        (x(), C("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: v,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, aa))
      ])) : (x(), C("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Oe(f, ["self"])
      }, [
        (x(), C("svg", {
          onClick: z[3] || (z[3] = (B) => _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Zo)),
        d("div", Qo, [
          (x(!0), C(se, null, ve(i.value, (B, P) => (x(), C("div", { key: P }, [
            ea,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: B.basename,
              onClick: (ne) => _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: B.path } })
            }, $(B.name), 9, ta)
          ]))), 128))
        ])
      ], 8, Go))
    ]));
  }
}), ca = ["onClick"], ua = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), da = {
  name: "VFContextMenu"
}, ha = /* @__PURE__ */ Object.assign(da, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), n = V(null), { apiUrl: a } = ke(), i = dt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), l = V([]);
    t.on("vf-context-selected", (b) => {
      l.value = b;
    });
    const { t: h } = R("i18n"), m = {
      newfolder: {
        title: () => h("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => h("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: l });
        }
      },
      refresh: {
        title: () => h("Refresh"),
        action: () => {
          t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
        }
      },
      preview: {
        title: () => h("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: l.value[0] });
        }
      },
      open: {
        title: () => h("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: l.value[0].path } });
        }
      },
      openDir: {
        title: () => h("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: l.value[0].dir } });
        }
      },
      download: {
        title: () => h("Download"),
        action: () => {
          const b = a.value + "?" + Ie({ q: "download", adapter: l.value[0].adapter, path: l.value[0].path });
          t.emit("vf-download", b);
        }
      },
      archive: {
        title: () => h("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: l });
        }
      },
      unarchive: {
        title: () => h("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: l });
        }
      },
      rename: {
        title: () => h("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: l });
        }
      }
    }, v = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, f = V("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      f.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: A, items: M, target: T = null }) => {
      if (i.items = [], f.value)
        if (T)
          i.items.push(m.openDir), t.emit("vf-context-selected", [T]), console.log("search item selected");
        else
          return;
      else
        !T && !f.value ? (i.items.push(m.refresh), i.items.push(m.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : M.length > 1 && M.some((I) => I.path === T.path) ? (i.items.push(m.refresh), i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", M), console.log(M.length + " selected (more than 1 item.)")) : (T.type == "dir" ? i.items.push(m.open) : (i.items.push(m.preview), i.items.push(m.download)), i.items.push(m.rename), T.mime_type == "application/zip" ? i.items.push(m.unarchive) : i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", [T]), console.log(T.type + " is selected"));
      p(b, A);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (b, A) => {
      i.active = !0, mt(() => {
        let M = A.getBoundingClientRect(), T = b.pageX, I = b.pageY, z = n.value.offsetHeight, B = n.value.offsetWidth;
        T = M.right - b.pageX + window.scrollX < B ? T - B : T, I = M.bottom - b.pageY + window.scrollY < z ? I - z : I, i.positions = {
          left: T + "px",
          top: I + "px"
        };
      });
    };
    return (b, A) => i.active ? (x(), C("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: n,
      style: Cr(i.positions)
    }, [
      (x(!0), C(se, null, ve(i.items, (M) => (x(), C("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: M.title,
        onClick: (T) => v(M)
      }, [
        ua,
        d("span", null, $(M.title()), 1)
      ], 8, ca))), 128))
    ], 4)) : oe("", !0);
  }
}), fa = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function ma(o) {
  const e = await fa(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.8df71796.js"), "../locales/tr.json": () => import("./tr.a655a0c7.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function pa(o, e) {
  const { getStore: t, setStore: n } = St(o), a = ["en", "tr"], i = V({}), l = (m) => {
    a.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), ma(m).then((v) => {
      i.value = v, n("locale", m), n("translations", v), console.log(m + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : l(e);
  function h(m) {
    return i.value.hasOwnProperty(m) ? i.value[m] : "";
  }
  return { t: h, support_locales: a, changeLocale: l };
}
const ga = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), va = {
  name: "VueFinder"
}, ba = /* @__PURE__ */ Object.assign(va, {
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
    },
    locale: {
      type: String,
      default: "en"
    },
    maxHeight: {
      type: String,
      default: "600px"
    }
  },
  setup(o) {
    const e = o, t = Ni(), { setStore: n, getStore: a } = St(e.id);
    yt("emitter", t), yt("storage", St(e.id));
    const i = pa(e.id, e.locale);
    yt("i18n", i);
    const { apiUrl: l, setApiUrl: h } = ke();
    h(e.url);
    const m = dt({ adapter: "local", storages: [], dirname: ".", files: [] }), v = V(a("viewport", "grid")), f = V(a("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      f.value = !f.value, n("darkMode", f.value);
    });
    const p = V(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      p.value = !p.value, n("full-screen", p.value);
    }), t.on("vf-view-toggle", (M) => {
      v.value = M;
    });
    const b = dt({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      b.active = !1;
    }), t.on("vf-modal-show", (M) => {
      b.active = !0, b.type = M.type, b.data = M;
    });
    const A = (M) => {
      Object.assign(m, M), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", ({ params: M, onError: T = null }) => {
      ht(l.value, { params: M }).then((I) => {
        t.emit("vf-modal-close"), A(I);
      }).catch((I) => {
        T && T(I);
      });
    }), t.on("vf-download", (M) => {
      document.getElementById("download_frame").src = M, t.emit("vf-modal-close");
    }), xe(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: a("adapter", m.adapter) } });
    }), (M, T) => (x(), C("div", {
      class: ue(f.value ? "dark" : "")
    }, [
      d("div", {
        class: ue([p.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Cr(p.value ? "" : "max-height: " + o.maxHeight),
        onMousedown: T[0] || (T[0] = (I) => _(t).emit("vf-contextmenu-hide"))
      }, [
        ye(xn, { data: m }, null, 8, ["data"]),
        ye(la, { data: m }, null, 8, ["data"]),
        ye(So, {
          view: v.value,
          data: m
        }, null, 8, ["view", "data"]),
        ye(Uo, { data: m }, null, 8, ["data"])
      ], 38),
      b.active ? (x(), ce(Ii("v-f-modal-" + b.type), {
        key: 0,
        selection: b.data,
        current: m
      }, null, 8, ["selection", "current"])) : oe("", !0),
      ye(ha, { current: m }, null, 8, ["current"]),
      ga
    ], 2));
  }
}), ya = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), wa = { class: "fixed z-10 inset-0 overflow-y-auto" }, xa = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, _a = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, ka = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Se = {
  __name: "ModalLayout",
  setup(o) {
    const e = R("emitter");
    return xe(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (x(), C("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ke((a) => _(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      ya,
      d("div", wa, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Oe((a) => _(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", xa, [
            d("div", _a, [
              lr(t.$slots, "default")
            ]),
            d("div", ka, [
              lr(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Sa = { class: "sm:flex sm:items-start" }, Da = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Ca = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ma = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $a = { class: "mt-2" }, Ea = { class: "text-sm text-gray-500" }, Ta = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Aa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Pa = [
  Oa
], Ia = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Na = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), La = [
  Na
], ja = { class: "ml-1.5" }, Va = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, za = {
  name: "VFModalDelete"
}, Ba = /* @__PURE__ */ Object.assign(za, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(e.selection.items), l = () => {
      i.value.length && t.emit("vf-fetch", { params: {
        q: "delete",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: h, type: m }) => ({ path: h, type: m })))
      } });
    };
    return (h, m) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (v) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1),
        d("div", Va, $(_(a)("This action cannot be undone.")), 1)
      ]),
      default: ee(() => [
        d("div", Sa, [
          Da,
          d("div", Ca, [
            d("h3", Ma, $(_(a)("Delete files")), 1),
            d("div", $a, [
              d("p", Ea, $(_(a)("Are you sure you want to delete these files ?")), 1),
              (x(!0), C(se, null, ve(i.value, (v) => (x(), C("p", Ta, [
                v.type == "dir" ? (x(), C("svg", Aa, Pa)) : (x(), C("svg", Ia, La)),
                d("span", ja, $(v.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ra = { class: "sm:flex sm:items-start" }, Ha = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), Ua = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ka = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ya = { class: "mt-2" }, Wa = { class: "text-sm text-gray-500" }, Xa = {
  name: "VFModalMessage"
}, Fa = /* @__PURE__ */ Object.assign(Xa, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = R("emitter"), { t } = R("i18n");
    return (n, a) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => _(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(t)("Close")), 1)
      ]),
      default: ee(() => {
        var i, l, h, m;
        return [
          d("div", Ra, [
            Ha,
            d("div", Ua, [
              d("h3", Ka, $((l = (i = o.selection) == null ? void 0 : i.title) != null ? l : "Title"), 1),
              d("div", Ya, [
                d("p", Wa, $((m = (h = o.selection) == null ? void 0 : h.message) != null ? m : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), qa = { class: "sm:flex sm:items-start" }, Ga = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), Ja = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Za = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Qa = { class: "mt-2" }, es = { class: "text-sm text-gray-500" }, ts = ["onKeyup", "placeholder"], rs = {
  name: "VFModalNewFolder"
}, is = /* @__PURE__ */ Object.assign(rs, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(""), l = () => {
      i.value != "" && (t.emit("vf-fetch", { params: {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: i.value
      } }), t.emit("vf-toast-push", { label: "New Folder is created successfully", type: "success" }));
    };
    return (h, m) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (v) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", qa, [
          Ga,
          d("div", Ja, [
            d("h3", Za, $(_(a)("New Folder")), 1),
            d("div", Qa, [
              d("p", es, $(_(a)("Create a new folder")), 1),
              ge(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (v) => i.value = v),
                onKeyup: Ke(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Folder Name"),
                type: "text"
              }, null, 40, ts), [
                [Ye, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ns = { class: "sm:flex sm:items-start" }, os = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), as = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ss = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ls = { class: "mt-2" }, cs = { class: "text-sm text-gray-500" }, us = ["onKeyup", "placeholder"], ds = {
  name: "VFModalNewFile"
}, hs = /* @__PURE__ */ Object.assign(ds, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(""), l = () => {
      i.value != "" && t.emit("vf-fetch", { params: {
        q: "newfile",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: i.value
      } });
    };
    return (h, m) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (v) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", ns, [
          os,
          d("div", as, [
            d("h3", ss, $(_(a)("New File")), 1),
            d("div", ls, [
              d("p", cs, $(_(a)("Create a new file")), 1),
              ge(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (v) => i.value = v),
                onKeyup: Ke(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("File Name"),
                type: "text"
              }, null, 40, us), [
                [Ye, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fs = { class: "flex" }, ms = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ps = { class: "ml-auto mb-2" }, gs = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, vs = { key: 1 }, bs = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = V(""), a = V(""), i = V(null), l = V(!1), { apiUrl: h } = ke(), { t: m } = R("i18n");
    xe(() => {
      ht(h.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((p) => {
        n.value = p, e("load");
      });
    });
    const v = () => {
      l.value = !l.value, a.value = n.value, l.value == !0 && mt(() => {
        i.value.focus();
      });
    }, f = () => {
      ht(h.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: a.value },
        json: !1
      }).then((p) => {
        n.value = p, e("load"), l.value = !l.value;
      }).catch((p) => console.log(p.statusText));
    };
    return (p, b) => (x(), C(se, null, [
      d("div", fs, [
        d("div", ms, $(o.selection.item.basename), 1),
        d("div", ps, [
          l.value ? (x(), C("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(_(m)("Save")), 1)) : oe("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: b[0] || (b[0] = (A) => v())
          }, $(l.value ? _(m)("Cancel") : _(m)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        l.value ? (x(), C("div", vs, [
          ge(d("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": b[1] || (b[1] = (A) => a.value = A),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ye, a.value]
          ])
        ])) : (x(), C("pre", gs, $(n.value), 1))
      ])
    ], 64));
  }
};
/*!
 * Cropper.js v1.5.12
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-06-12T08:00:17.411Z
 */
function ur(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(o, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function $r(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ur(Object(t), !0).forEach(function(n) {
      xs(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : ur(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function ut(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ut = function(e) {
    return typeof e;
  } : ut = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ut(o);
}
function ys(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function dr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function ws(o, e, t) {
  return e && dr(o.prototype, e), t && dr(o, t), o;
}
function xs(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Er(o) {
  return _s(o) || ks(o) || Ss(o) || Ds();
}
function _s(o) {
  if (Array.isArray(o))
    return Ct(o);
}
function ks(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function Ss(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return Ct(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Ct(o, e);
  }
}
function Ct(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function Ds() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var pt = typeof window < "u" && typeof window.document < "u", _e = pt ? window : {}, Lt = pt && _e.document.documentElement ? "ontouchstart" in _e.document.documentElement : !1, jt = pt ? "PointerEvent" in _e : !1, J = "cropper", Vt = "all", Tr = "crop", Ar = "move", Or = "zoom", Te = "e", Ae = "w", ze = "s", Ce = "n", qe = "ne", Ge = "nw", Je = "se", Ze = "sw", Mt = "".concat(J, "-crop"), hr = "".concat(J, "-disabled"), he = "".concat(J, "-hidden"), fr = "".concat(J, "-hide"), Cs = "".concat(J, "-invisible"), ft = "".concat(J, "-modal"), $t = "".concat(J, "-move"), et = "".concat(J, "Action"), lt = "".concat(J, "Preview"), zt = "crop", Pr = "move", Ir = "none", Et = "crop", Tt = "cropend", At = "cropmove", Ot = "cropstart", mr = "dblclick", Ms = Lt ? "touchstart" : "mousedown", $s = Lt ? "touchmove" : "mousemove", Es = Lt ? "touchend touchcancel" : "mouseup", pr = jt ? "pointerdown" : Ms, gr = jt ? "pointermove" : $s, vr = jt ? "pointerup pointercancel" : Es, br = "ready", yr = "resize", wr = "wheel", Pt = "zoom", xr = "image/jpeg", Ts = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, As = /^data:/, Os = /^data:image\/jpeg;base64,/, Ps = /^img|canvas$/i, Nr = 200, Lr = 100, _r = {
  viewMode: 0,
  dragMode: zt,
  initialAspectRatio: NaN,
  aspectRatio: NaN,
  data: null,
  preview: "",
  responsive: !0,
  restore: !0,
  checkCrossOrigin: !0,
  checkOrientation: !0,
  modal: !0,
  guides: !0,
  center: !0,
  highlight: !0,
  background: !0,
  autoCrop: !0,
  autoCropArea: 0.8,
  movable: !0,
  rotatable: !0,
  scalable: !0,
  zoomable: !0,
  zoomOnTouch: !0,
  zoomOnWheel: !0,
  wheelZoomRatio: 0.1,
  cropBoxMovable: !0,
  cropBoxResizable: !0,
  toggleDragModeOnDblclick: !0,
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: Nr,
  minContainerHeight: Lr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Is = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', Ns = Number.isNaN || _e.isNaN;
function W(o) {
  return typeof o == "number" && !Ns(o);
}
var kr = function(e) {
  return e > 0 && e < 1 / 0;
};
function xt(o) {
  return typeof o > "u";
}
function Pe(o) {
  return ut(o) === "object" && o !== null;
}
var Ls = Object.prototype.hasOwnProperty;
function Be(o) {
  if (!Pe(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && Ls.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function de(o) {
  return typeof o == "function";
}
var js = Array.prototype.slice;
function jr(o) {
  return Array.from ? Array.from(o) : js.call(o);
}
function ie(o, e) {
  return o && de(e) && (Array.isArray(o) || W(o.length) ? jr(o).forEach(function(t, n) {
    e.call(o, t, n, o);
  }) : Pe(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var Z = Object.assign || function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return Pe(e) && n.length > 0 && n.forEach(function(i) {
    Pe(i) && Object.keys(i).forEach(function(l) {
      e[l] = i[l];
    });
  }), e;
}, Vs = /\.\d*(?:0|9){12}\d*$/;
function He(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Vs.test(o) ? Math.round(o * e) / e : o;
}
var zs = /^width|height|left|top|marginLeft|marginTop$/;
function $e(o, e) {
  var t = o.style;
  ie(e, function(n, a) {
    zs.test(a) && W(n) && (n = "".concat(n, "px")), t[a] = n;
  });
}
function Bs(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function ae(o, e) {
  if (!!e) {
    if (W(o.length)) {
      ie(o, function(n) {
        ae(n, e);
      });
      return;
    }
    if (o.classList) {
      o.classList.add(e);
      return;
    }
    var t = o.className.trim();
    t ? t.indexOf(e) < 0 && (o.className = "".concat(t, " ").concat(e)) : o.className = e;
  }
}
function we(o, e) {
  if (!!e) {
    if (W(o.length)) {
      ie(o, function(t) {
        we(t, e);
      });
      return;
    }
    if (o.classList) {
      o.classList.remove(e);
      return;
    }
    o.className.indexOf(e) >= 0 && (o.className = o.className.replace(e, ""));
  }
}
function Re(o, e, t) {
  if (!!e) {
    if (W(o.length)) {
      ie(o, function(n) {
        Re(n, e, t);
      });
      return;
    }
    t ? ae(o, e) : we(o, e);
  }
}
var Rs = /([a-z\d])([A-Z])/g;
function Bt(o) {
  return o.replace(Rs, "$1-$2").toLowerCase();
}
function It(o, e) {
  return Pe(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Bt(e)));
}
function tt(o, e, t) {
  Pe(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Bt(e)), t);
}
function Hs(o, e) {
  if (Pe(o[e]))
    try {
      delete o[e];
    } catch {
      o[e] = void 0;
    }
  else if (o.dataset)
    try {
      delete o.dataset[e];
    } catch {
      o.dataset[e] = void 0;
    }
  else
    o.removeAttribute("data-".concat(Bt(e)));
}
var Vr = /\s\s*/, zr = function() {
  var o = !1;
  if (pt) {
    var e = !1, t = function() {
    }, n = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    _e.addEventListener("test", t, n), _e.removeEventListener("test", t, n);
  }
  return o;
}();
function be(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(Vr).forEach(function(i) {
    if (!zr) {
      var l = o.listeners;
      l && l[i] && l[i][t] && (a = l[i][t], delete l[i][t], Object.keys(l[i]).length === 0 && delete l[i], Object.keys(l).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, a, n);
  });
}
function pe(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(Vr).forEach(function(i) {
    if (n.once && !zr) {
      var l = o.listeners, h = l === void 0 ? {} : l;
      a = function() {
        delete h[i][t], o.removeEventListener(i, a, n);
        for (var v = arguments.length, f = new Array(v), p = 0; p < v; p++)
          f[p] = arguments[p];
        t.apply(o, f);
      }, h[i] || (h[i] = {}), h[i][t] && o.removeEventListener(i, h[i][t], n), h[i][t] = a, o.listeners = h;
    }
    o.addEventListener(i, a, n);
  });
}
function Ue(o, e, t) {
  var n;
  return de(Event) && de(CustomEvent) ? n = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(n);
}
function Br(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var _t = _e.location, Us = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Sr(o) {
  var e = o.match(Us);
  return e !== null && (e[1] !== _t.protocol || e[2] !== _t.hostname || e[3] !== _t.port);
}
function Dr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Qe(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, a = o.translateX, i = o.translateY, l = [];
  W(a) && a !== 0 && l.push("translateX(".concat(a, "px)")), W(i) && i !== 0 && l.push("translateY(".concat(i, "px)")), W(e) && e !== 0 && l.push("rotate(".concat(e, "deg)")), W(t) && t !== 1 && l.push("scaleX(".concat(t, ")")), W(n) && n !== 1 && l.push("scaleY(".concat(n, ")"));
  var h = l.length ? l.join(" ") : "none";
  return {
    WebkitTransform: h,
    msTransform: h,
    transform: h
  };
}
function Ks(o) {
  var e = $r({}, o), t = 0;
  return ie(o, function(n, a) {
    delete e[a], ie(e, function(i) {
      var l = Math.abs(n.startX - i.startX), h = Math.abs(n.startY - i.startY), m = Math.abs(n.endX - i.endX), v = Math.abs(n.endY - i.endY), f = Math.sqrt(l * l + h * h), p = Math.sqrt(m * m + v * v), b = (p - f) / f;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function ct(o, e) {
  var t = o.pageX, n = o.pageY, a = {
    endX: t,
    endY: n
  };
  return e ? a : $r({
    startX: t,
    startY: n
  }, a);
}
function Ys(o) {
  var e = 0, t = 0, n = 0;
  return ie(o, function(a) {
    var i = a.startX, l = a.startY;
    e += i, t += l, n += 1;
  }), e /= n, t /= n, {
    pageX: e,
    pageY: t
  };
}
function Ee(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = kr(n), l = kr(t);
  if (i && l) {
    var h = t * e;
    a === "contain" && h > n || a === "cover" && h < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : l && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function Ws(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var a = n % 90 * Math.PI / 180, i = Math.sin(a), l = Math.cos(a), h = e * l + t * i, m = e * i + t * l;
  return n > 90 ? {
    width: m,
    height: h
  } : {
    width: h,
    height: m
  };
}
function Xs(o, e, t, n) {
  var a = e.aspectRatio, i = e.naturalWidth, l = e.naturalHeight, h = e.rotate, m = h === void 0 ? 0 : h, v = e.scaleX, f = v === void 0 ? 1 : v, p = e.scaleY, b = p === void 0 ? 1 : p, A = t.aspectRatio, M = t.naturalWidth, T = t.naturalHeight, I = n.fillColor, z = I === void 0 ? "transparent" : I, B = n.imageSmoothingEnabled, P = B === void 0 ? !0 : B, ne = n.imageSmoothingQuality, F = ne === void 0 ? "low" : ne, D = n.maxWidth, X = D === void 0 ? 1 / 0 : D, q = n.maxHeight, le = q === void 0 ? 1 / 0 : q, fe = n.minWidth, L = fe === void 0 ? 0 : fe, U = n.minHeight, N = U === void 0 ? 0 : U, Y = document.createElement("canvas"), H = Y.getContext("2d"), te = Ee({
    aspectRatio: A,
    width: X,
    height: le
  }), G = Ee({
    aspectRatio: A,
    width: L,
    height: N
  }, "cover"), We = Math.min(te.width, Math.max(G.width, M)), Xe = Math.min(te.height, Math.max(G.height, T)), rt = Ee({
    aspectRatio: a,
    width: X,
    height: le
  }), it = Ee({
    aspectRatio: a,
    width: L,
    height: N
  }, "cover"), nt = Math.min(rt.width, Math.max(it.width, i)), Ne = Math.min(rt.height, Math.max(it.height, l)), gt = [-nt / 2, -Ne / 2, nt, Ne];
  return Y.width = He(We), Y.height = He(Xe), H.fillStyle = z, H.fillRect(0, 0, We, Xe), H.save(), H.translate(We / 2, Xe / 2), H.rotate(m * Math.PI / 180), H.scale(f, b), H.imageSmoothingEnabled = P, H.imageSmoothingQuality = F, H.drawImage.apply(H, [o].concat(Er(gt.map(function(Le) {
    return Math.floor(He(Le));
  })))), H.restore(), Y;
}
var Rr = String.fromCharCode;
function Fs(o, e, t) {
  var n = "";
  t += e;
  for (var a = e; a < t; a += 1)
    n += Rr(o.getUint8(a));
  return n;
}
var qs = /^data:.*,/;
function Gs(o) {
  var e = o.replace(qs, ""), t = atob(e), n = new ArrayBuffer(t.length), a = new Uint8Array(n);
  return ie(a, function(i, l) {
    a[l] = t.charCodeAt(l);
  }), n;
}
function Js(o, e) {
  for (var t = [], n = 8192, a = new Uint8Array(o); a.length > 0; )
    t.push(Rr.apply(null, jr(a.subarray(0, n)))), a = a.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function Zs(o) {
  var e = new DataView(o), t;
  try {
    var n, a, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var l = e.byteLength, h = 2; h + 1 < l; ) {
        if (e.getUint8(h) === 255 && e.getUint8(h + 1) === 225) {
          a = h;
          break;
        }
        h += 1;
      }
    if (a) {
      var m = a + 4, v = a + 10;
      if (Fs(e, m, 4) === "Exif") {
        var f = e.getUint16(v);
        if (n = f === 18761, (n || f === 19789) && e.getUint16(v + 2, n) === 42) {
          var p = e.getUint32(v + 4, n);
          p >= 8 && (i = v + p);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), A, M;
      for (M = 0; M < b; M += 1)
        if (A = i + M * 12 + 2, e.getUint16(A, n) === 274) {
          A += 8, t = e.getUint16(A, n), e.setUint16(A, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function Qs(o) {
  var e = 0, t = 1, n = 1;
  switch (o) {
    case 2:
      t = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      n = -1;
      break;
    case 5:
      e = 90, n = -1;
      break;
    case 6:
      e = 90;
      break;
    case 7:
      e = 90, t = -1;
      break;
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: t,
    scaleY: n
  };
}
var el = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, a = this.cropper, i = Number(t.minContainerWidth), l = Number(t.minContainerHeight);
    ae(a, he), we(e, he);
    var h = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Nr),
      height: Math.max(n.offsetHeight, l >= 0 ? l : Lr)
    };
    this.containerData = h, $e(a, {
      width: h.width,
      height: h.height
    }), ae(e, he), we(a, he);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, i = a ? t.naturalHeight : t.naturalWidth, l = a ? t.naturalWidth : t.naturalHeight, h = i / l, m = e.width, v = e.height;
    e.height * h > e.width ? n === 3 ? m = e.height * h : v = e.width / h : n === 3 ? v = e.width / h : m = e.height * h;
    var f = {
      aspectRatio: h,
      naturalWidth: i,
      naturalHeight: l,
      width: m,
      height: v
    };
    this.canvasData = f, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), f.width = Math.min(Math.max(f.width, f.minWidth), f.maxWidth), f.height = Math.min(Math.max(f.height, f.minHeight), f.maxHeight), f.left = (e.width - f.width) / 2, f.top = (e.height - f.height) / 2, f.oldLeft = f.left, f.oldTop = f.top, this.initialCanvasData = Z({}, f);
  },
  limitCanvas: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, h = n.viewMode, m = i.aspectRatio, v = this.cropped && l;
    if (e) {
      var f = Number(n.minCanvasWidth) || 0, p = Number(n.minCanvasHeight) || 0;
      h > 1 ? (f = Math.max(f, a.width), p = Math.max(p, a.height), h === 3 && (p * m > f ? f = p * m : p = f / m)) : h > 0 && (f ? f = Math.max(f, v ? l.width : 0) : p ? p = Math.max(p, v ? l.height : 0) : v && (f = l.width, p = l.height, p * m > f ? f = p * m : p = f / m));
      var b = Ee({
        aspectRatio: m,
        width: f,
        height: p
      });
      f = b.width, p = b.height, i.minWidth = f, i.minHeight = p, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (h > (v ? 0 : 1)) {
        var A = a.width - i.width, M = a.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, M), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, M), v && this.limited && (i.minLeft = Math.min(l.left, l.left + (l.width - i.width)), i.minTop = Math.min(l.top, l.top + (l.height - i.height)), i.maxLeft = l.left, i.maxTop = l.top, h === 2 && (i.width >= a.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= a.height && (i.minTop = Math.min(0, M), i.maxTop = Math.max(0, M))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = a.width, i.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, a = this.imageData;
    if (t) {
      var i = Ws({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), l = i.width, h = i.height, m = n.width * (l / n.naturalWidth), v = n.height * (h / n.naturalHeight);
      n.left -= (m - n.width) / 2, n.top -= (v - n.height) / 2, n.width = m, n.height = v, n.aspectRatio = l / h, n.naturalWidth = l, n.naturalHeight = h, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, $e(this.canvas, Z({
      width: n.width,
      height: n.height
    }, Qe({
      translateX: n.left,
      translateY: n.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, n = this.imageData, a = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
    Z(n, {
      width: a,
      height: i,
      left: (t.width - a) / 2,
      top: (t.height - i) / 2
    }), $e(this.image, Z({
      width: n.width,
      height: n.height
    }, Qe(Z({
      translateX: n.left,
      translateY: n.top
    }, n)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, a = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * a), i.height = Math.max(i.minHeight, i.height * a), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = Z({}, i);
  },
  limitCropBox: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, h = this.limited, m = n.aspectRatio;
    if (e) {
      var v = Number(n.minCropBoxWidth) || 0, f = Number(n.minCropBoxHeight) || 0, p = h ? Math.min(a.width, i.width, i.width + i.left, a.width - i.left) : a.width, b = h ? Math.min(a.height, i.height, i.height + i.top, a.height - i.top) : a.height;
      v = Math.min(v, a.width), f = Math.min(f, a.height), m && (v && f ? f * m > v ? f = v / m : v = f * m : v ? f = v / m : f && (v = f * m), b * m > p ? b = p / m : p = b * m), l.minWidth = Math.min(v, p), l.minHeight = Math.min(f, b), l.maxWidth = p, l.maxHeight = b;
    }
    t && (h ? (l.minLeft = Math.max(0, i.left), l.minTop = Math.max(0, i.top), l.maxLeft = Math.min(a.width, i.left + i.width) - l.width, l.maxTop = Math.min(a.height, i.top + i.height) - l.height) : (l.minLeft = 0, l.minTop = 0, l.maxLeft = a.width - l.width, l.maxTop = a.height - l.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && tt(this.face, et, n.width >= t.width && n.height >= t.height ? Ar : Vt), $e(this.cropBox, Z({
      width: n.width,
      height: n.height
    }, Qe({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ue(this.element, Et, this.getData());
  }
}, tl = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, a = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", l = document.createElement("img");
    if (t && (l.crossOrigin = t), l.src = a, l.alt = i, this.viewBox.appendChild(l), this.viewBoxImage = l, !!n) {
      var h = n;
      typeof n == "string" ? h = e.ownerDocument.querySelectorAll(n) : n.querySelector && (h = [n]), this.previews = h, ie(h, function(m) {
        var v = document.createElement("img");
        tt(m, lt, {
          width: m.offsetWidth,
          height: m.offsetHeight,
          html: m.innerHTML
        }), t && (v.crossOrigin = t), v.src = a, v.alt = i, v.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', m.innerHTML = "", m.appendChild(v);
      });
    }
  },
  resetPreview: function() {
    ie(this.previews, function(e) {
      var t = It(e, lt);
      $e(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Hs(e, lt);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, a = n.width, i = n.height, l = e.width, h = e.height, m = n.left - t.left - e.left, v = n.top - t.top - e.top;
    !this.cropped || this.disabled || ($e(this.viewBoxImage, Z({
      width: l,
      height: h
    }, Qe(Z({
      translateX: -m,
      translateY: -v
    }, e)))), ie(this.previews, function(f) {
      var p = It(f, lt), b = p.width, A = p.height, M = b, T = A, I = 1;
      a && (I = b / a, T = i * I), i && T > A && (I = A / i, M = a * I, T = A), $e(f, {
        width: M,
        height: T
      }), $e(f.getElementsByTagName("img")[0], Z({
        width: l * I,
        height: h * I
      }, Qe(Z({
        translateX: -m * I,
        translateY: -v * I
      }, e))));
    }));
  }
}, rl = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    de(t.cropstart) && pe(e, Ot, t.cropstart), de(t.cropmove) && pe(e, At, t.cropmove), de(t.cropend) && pe(e, Tt, t.cropend), de(t.crop) && pe(e, Et, t.crop), de(t.zoom) && pe(e, Pt, t.zoom), pe(n, pr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && pe(n, wr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && pe(n, mr, this.onDblclick = this.dblclick.bind(this)), pe(e.ownerDocument, gr, this.onCropMove = this.cropMove.bind(this)), pe(e.ownerDocument, vr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && pe(window, yr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    de(t.cropstart) && be(e, Ot, t.cropstart), de(t.cropmove) && be(e, At, t.cropmove), de(t.cropend) && be(e, Tt, t.cropend), de(t.crop) && be(e, Et, t.crop), de(t.zoom) && be(e, Pt, t.zoom), be(n, pr, this.onCropStart), t.zoomable && t.zoomOnWheel && be(n, wr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && be(n, mr, this.onDblclick), be(e.ownerDocument, gr, this.onCropMove), be(e.ownerDocument, vr, this.onCropEnd), t.responsive && be(window, yr, this.onResize);
  }
}, il = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, a = t.offsetWidth / n.width, i = t.offsetHeight / n.height, l = Math.abs(a - 1) > Math.abs(i - 1) ? a : i;
      if (l !== 1) {
        var h, m;
        e.restore && (h = this.getCanvasData(), m = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(ie(h, function(v, f) {
          h[f] = v * l;
        })), this.setCropBoxData(ie(m, function(v, f) {
          m[f] = v * l;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Ir || this.setDragMode(Bs(this.dragBox, Mt) ? Pr : zt);
  },
  wheel: function(e) {
    var t = this, n = Number(this.options.wheelZoomRatio) || 0.1, a = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? a = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? a = -e.wheelDelta / 120 : e.detail && (a = e.detail > 0 ? 1 : -1), this.zoom(-a * n, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, n = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (W(t) && t !== 1 || W(n) && n !== 0 || e.ctrlKey))) {
      var a = this.options, i = this.pointers, l;
      e.changedTouches ? ie(e.changedTouches, function(h) {
        i[h.identifier] = ct(h);
      }) : i[e.pointerId || 0] = ct(e), Object.keys(i).length > 1 && a.zoomable && a.zoomOnTouch ? l = Or : l = It(e.target, et), !!Ts.test(l) && Ue(this.element, Ot, {
        originalEvent: e,
        action: l
      }) !== !1 && (e.preventDefault(), this.action = l, this.cropping = !1, l === Tr && (this.cropping = !0, ae(this.dragBox, ft)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), Ue(this.element, At, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? ie(e.changedTouches, function(a) {
        Z(n[a.identifier] || {}, ct(a, !0));
      }) : Z(n[e.pointerId || 0] || {}, ct(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? ie(e.changedTouches, function(a) {
        delete n[a.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, Re(this.dragBox, ft, this.cropped && this.options.modal)), Ue(this.element, Tt, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, nl = {
  change: function(e) {
    var t = this.options, n = this.canvasData, a = this.containerData, i = this.cropBoxData, l = this.pointers, h = this.action, m = t.aspectRatio, v = i.left, f = i.top, p = i.width, b = i.height, A = v + p, M = f + b, T = 0, I = 0, z = a.width, B = a.height, P = !0, ne;
    !m && e.shiftKey && (m = p && b ? p / b : 1), this.limited && (T = i.minLeft, I = i.minTop, z = T + Math.min(a.width, n.width, n.left + n.width), B = I + Math.min(a.height, n.height, n.top + n.height));
    var F = l[Object.keys(l)[0]], D = {
      x: F.endX - F.startX,
      y: F.endY - F.startY
    }, X = function(le) {
      switch (le) {
        case Te:
          A + D.x > z && (D.x = z - A);
          break;
        case Ae:
          v + D.x < T && (D.x = T - v);
          break;
        case Ce:
          f + D.y < I && (D.y = I - f);
          break;
        case ze:
          M + D.y > B && (D.y = B - M);
          break;
      }
    };
    switch (h) {
      case Vt:
        v += D.x, f += D.y;
        break;
      case Te:
        if (D.x >= 0 && (A >= z || m && (f <= I || M >= B))) {
          P = !1;
          break;
        }
        X(Te), p += D.x, p < 0 && (h = Ae, p = -p, v -= p), m && (b = p / m, f += (i.height - b) / 2);
        break;
      case Ce:
        if (D.y <= 0 && (f <= I || m && (v <= T || A >= z))) {
          P = !1;
          break;
        }
        X(Ce), b -= D.y, f += D.y, b < 0 && (h = ze, b = -b, f -= b), m && (p = b * m, v += (i.width - p) / 2);
        break;
      case Ae:
        if (D.x <= 0 && (v <= T || m && (f <= I || M >= B))) {
          P = !1;
          break;
        }
        X(Ae), p -= D.x, v += D.x, p < 0 && (h = Te, p = -p, v -= p), m && (b = p / m, f += (i.height - b) / 2);
        break;
      case ze:
        if (D.y >= 0 && (M >= B || m && (v <= T || A >= z))) {
          P = !1;
          break;
        }
        X(ze), b += D.y, b < 0 && (h = Ce, b = -b, f -= b), m && (p = b * m, v += (i.width - p) / 2);
        break;
      case qe:
        if (m) {
          if (D.y <= 0 && (f <= I || A >= z)) {
            P = !1;
            break;
          }
          X(Ce), b -= D.y, f += D.y, p = b * m;
        } else
          X(Ce), X(Te), D.x >= 0 ? A < z ? p += D.x : D.y <= 0 && f <= I && (P = !1) : p += D.x, D.y <= 0 ? f > I && (b -= D.y, f += D.y) : (b -= D.y, f += D.y);
        p < 0 && b < 0 ? (h = Ze, b = -b, p = -p, f -= b, v -= p) : p < 0 ? (h = Ge, p = -p, v -= p) : b < 0 && (h = Je, b = -b, f -= b);
        break;
      case Ge:
        if (m) {
          if (D.y <= 0 && (f <= I || v <= T)) {
            P = !1;
            break;
          }
          X(Ce), b -= D.y, f += D.y, p = b * m, v += i.width - p;
        } else
          X(Ce), X(Ae), D.x <= 0 ? v > T ? (p -= D.x, v += D.x) : D.y <= 0 && f <= I && (P = !1) : (p -= D.x, v += D.x), D.y <= 0 ? f > I && (b -= D.y, f += D.y) : (b -= D.y, f += D.y);
        p < 0 && b < 0 ? (h = Je, b = -b, p = -p, f -= b, v -= p) : p < 0 ? (h = qe, p = -p, v -= p) : b < 0 && (h = Ze, b = -b, f -= b);
        break;
      case Ze:
        if (m) {
          if (D.x <= 0 && (v <= T || M >= B)) {
            P = !1;
            break;
          }
          X(Ae), p -= D.x, v += D.x, b = p / m;
        } else
          X(ze), X(Ae), D.x <= 0 ? v > T ? (p -= D.x, v += D.x) : D.y >= 0 && M >= B && (P = !1) : (p -= D.x, v += D.x), D.y >= 0 ? M < B && (b += D.y) : b += D.y;
        p < 0 && b < 0 ? (h = qe, b = -b, p = -p, f -= b, v -= p) : p < 0 ? (h = Je, p = -p, v -= p) : b < 0 && (h = Ge, b = -b, f -= b);
        break;
      case Je:
        if (m) {
          if (D.x >= 0 && (A >= z || M >= B)) {
            P = !1;
            break;
          }
          X(Te), p += D.x, b = p / m;
        } else
          X(ze), X(Te), D.x >= 0 ? A < z ? p += D.x : D.y >= 0 && M >= B && (P = !1) : p += D.x, D.y >= 0 ? M < B && (b += D.y) : b += D.y;
        p < 0 && b < 0 ? (h = Ge, b = -b, p = -p, f -= b, v -= p) : p < 0 ? (h = Ze, p = -p, v -= p) : b < 0 && (h = qe, b = -b, f -= b);
        break;
      case Ar:
        this.move(D.x, D.y), P = !1;
        break;
      case Or:
        this.zoom(Ks(l), e), P = !1;
        break;
      case Tr:
        if (!D.x || !D.y) {
          P = !1;
          break;
        }
        ne = Br(this.cropper), v = F.startX - ne.left, f = F.startY - ne.top, p = i.minWidth, b = i.minHeight, D.x > 0 ? h = D.y > 0 ? Je : qe : D.x < 0 && (v -= p, h = D.y > 0 ? Ze : Ge), D.y < 0 && (f -= b), this.cropped || (we(this.cropBox, he), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    P && (i.width = p, i.height = b, i.left = v, i.top = f, this.action = h, this.renderCropBox()), ie(l, function(q) {
      q.startX = q.endX, q.startY = q.endY;
    });
  }
}, ol = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && ae(this.dragBox, ft), we(this.cropBox, he), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = Z({}, this.initialImageData), this.canvasData = Z({}, this.initialCanvasData), this.cropBoxData = Z({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (Z(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), we(this.dragBox, ft), ae(this.cropBox, he)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, ie(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, we(this.cropper, hr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, ae(this.cropper, hr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[J] ? (e[J] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, a = n.left, i = n.top;
    return this.moveTo(xt(e) ? e : a + Number(e), xt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (W(e) && (n.left = e, a = !0), W(t) && (n.top = t, a = !0), a && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var n = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
  },
  zoomTo: function(e, t, n) {
    var a = this.options, i = this.canvasData, l = i.width, h = i.height, m = i.naturalWidth, v = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var f = m * e, p = v * e;
      if (Ue(this.element, Pt, {
        ratio: e,
        oldRatio: l / m,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, A = Br(this.cropper), M = b && Object.keys(b).length ? Ys(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (f - l) * ((M.pageX - A.left - i.left) / l), i.top -= (p - h) * ((M.pageY - A.top - i.top) / h);
      } else
        Be(t) && W(t.x) && W(t.y) ? (i.left -= (f - l) * ((t.x - i.left) / l), i.top -= (p - h) * ((t.y - i.top) / h)) : (i.left -= (f - l) / 2, i.top -= (p - h) / 2);
      i.width = f, i.height = p, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), W(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, W(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(W(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (W(e) && (n.scaleX = e, a = !0), W(t) && (n.scaleY = t, a = !0), a && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, n = this.imageData, a = this.canvasData, i = this.cropBoxData, l;
    if (this.ready && this.cropped) {
      l = {
        x: i.left - a.left,
        y: i.top - a.top,
        width: i.width,
        height: i.height
      };
      var h = n.width / n.naturalWidth;
      if (ie(l, function(f, p) {
        l[p] = f / h;
      }), e) {
        var m = Math.round(l.y + l.height), v = Math.round(l.x + l.width);
        l.x = Math.round(l.x), l.y = Math.round(l.y), l.width = v - l.x, l.height = m - l.y;
      }
    } else
      l = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (l.rotate = n.rotate || 0), t.scalable && (l.scaleX = n.scaleX || 1, l.scaleY = n.scaleY || 1), l;
  },
  setData: function(e) {
    var t = this.options, n = this.imageData, a = this.canvasData, i = {};
    if (this.ready && !this.disabled && Be(e)) {
      var l = !1;
      t.rotatable && W(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, l = !0), t.scalable && (W(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, l = !0), W(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, l = !0)), l && this.renderCanvas(!0, !0);
      var h = n.width / n.naturalWidth;
      W(e.x) && (i.left = e.x * h + a.left), W(e.y) && (i.top = e.y * h + a.top), W(e.width) && (i.width = e.width * h), W(e.height) && (i.height = e.height * h), this.setCropBoxData(i);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? Z({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? Z({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && ie(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
      t[n] = e[n];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, n = t.aspectRatio;
    return this.ready && !this.disabled && Be(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) ? (t.width = e.width, t.height = e.width / n) : W(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
  },
  getCropBoxData: function() {
    var e = this.cropBoxData, t;
    return this.ready && this.cropped && (t = {
      left: e.left,
      top: e.top,
      width: e.width,
      height: e.height
    }), t || {};
  },
  setCropBoxData: function(e) {
    var t = this.cropBoxData, n = this.options.aspectRatio, a, i;
    return this.ready && this.cropped && !this.disabled && Be(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) && e.width !== t.width && (a = !0, t.width = e.width), W(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (a ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = Xs(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var a = this.getData(), i = a.x, l = a.y, h = a.width, m = a.height, v = n.width / Math.floor(t.naturalWidth);
    v !== 1 && (i *= v, l *= v, h *= v, m *= v);
    var f = h / m, p = Ee({
      aspectRatio: f,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Ee({
      aspectRatio: f,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = Ee({
      aspectRatio: f,
      width: e.width || (v !== 1 ? n.width : h),
      height: e.height || (v !== 1 ? n.height : m)
    }), M = A.width, T = A.height;
    M = Math.min(p.width, Math.max(b.width, M)), T = Math.min(p.height, Math.max(b.height, T));
    var I = document.createElement("canvas"), z = I.getContext("2d");
    I.width = He(M), I.height = He(T), z.fillStyle = e.fillColor || "transparent", z.fillRect(0, 0, M, T);
    var B = e.imageSmoothingEnabled, P = B === void 0 ? !0 : B, ne = e.imageSmoothingQuality;
    z.imageSmoothingEnabled = P, ne && (z.imageSmoothingQuality = ne);
    var F = n.width, D = n.height, X = i, q = l, le, fe, L, U, N, Y;
    X <= -h || X > F ? (X = 0, le = 0, L = 0, N = 0) : X <= 0 ? (L = -X, X = 0, le = Math.min(F, h + X), N = le) : X <= F && (L = 0, le = Math.min(h, F - X), N = le), le <= 0 || q <= -m || q > D ? (q = 0, fe = 0, U = 0, Y = 0) : q <= 0 ? (U = -q, q = 0, fe = Math.min(D, m + q), Y = fe) : q <= D && (U = 0, fe = Math.min(m, D - q), Y = fe);
    var H = [X, q, le, fe];
    if (N > 0 && Y > 0) {
      var te = M / h;
      H.push(L * te, U * te, N * te, Y * te);
    }
    return z.drawImage.apply(z, [n].concat(Er(H.map(function(G) {
      return Math.floor(He(G));
    })))), I;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !xt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var i = e === zt, l = t.movable && e === Pr;
      e = i || l ? e : Ir, t.dragMode = e, tt(n, et, e), Re(n, Mt, i), Re(n, $t, l), t.cropBoxMovable || (tt(a, et, e), Re(a, Mt, i), Re(a, $t, l));
    }
    return this;
  }
}, al = _e.Cropper, Hr = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (ys(this, o), !e || !Ps.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = Z({}, _r, Be(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return ws(o, [{
    key: "init",
    value: function() {
      var t = this.element, n = t.tagName.toLowerCase(), a;
      if (!t[J]) {
        if (t[J] = this, n === "img") {
          if (this.isImg = !0, a = t.getAttribute("src") || "", this.originalUrl = a, !a)
            return;
          a = t.src;
        } else
          n === "canvas" && window.HTMLCanvasElement && (a = t.toDataURL());
        this.load(a);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var n = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var a = this.element, i = this.options;
        if (!i.rotatable && !i.scalable && (i.checkOrientation = !1), !i.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (As.test(t)) {
          Os.test(t) ? this.read(Gs(t)) : this.clone();
          return;
        }
        var l = new XMLHttpRequest(), h = this.clone.bind(this);
        this.reloading = !0, this.xhr = l, l.onabort = h, l.onerror = h, l.ontimeout = h, l.onprogress = function() {
          l.getResponseHeader("content-type") !== xr && l.abort();
        }, l.onload = function() {
          n.read(l.response);
        }, l.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && Sr(t) && a.crossOrigin && (t = Dr(t)), l.open("GET", t, !0), l.responseType = "arraybuffer", l.withCredentials = a.crossOrigin === "use-credentials", l.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, a = this.imageData, i = Zs(t), l = 0, h = 1, m = 1;
      if (i > 1) {
        this.url = Js(t, xr);
        var v = Qs(i);
        l = v.rotate, h = v.scaleX, m = v.scaleY;
      }
      n.rotatable && (a.rotate = l), n.scalable && (a.scaleX = h, a.scaleY = m), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, a = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && Sr(n) && (a || (a = "anonymous"), i = Dr(n)), this.crossOrigin = a, this.crossOriginUrl = i;
      var l = document.createElement("img");
      a && (l.crossOrigin = a), l.src = i || n, l.alt = t.alt || "The image to crop", this.image = l, l.onload = this.start.bind(this), l.onerror = this.stop.bind(this), ae(l, fr), t.parentNode.insertBefore(l, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var a = _e.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(_e.navigator.userAgent), i = function(v, f) {
        Z(t.imageData, {
          naturalWidth: v,
          naturalHeight: f,
          aspectRatio: v / f
        }), t.initialImageData = Z({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !a) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var l = document.createElement("img"), h = document.body || document.documentElement;
      this.sizingImage = l, l.onload = function() {
        i(l.width, l.height), a || h.removeChild(l);
      }, l.src = n.src, a || (l.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", h.appendChild(l));
    }
  }, {
    key: "stop",
    value: function() {
      var t = this.image;
      t.onload = null, t.onerror = null, t.parentNode.removeChild(t), this.image = null;
    }
  }, {
    key: "build",
    value: function() {
      if (!(!this.sized || this.ready)) {
        var t = this.element, n = this.options, a = this.image, i = t.parentNode, l = document.createElement("div");
        l.innerHTML = Is;
        var h = l.querySelector(".".concat(J, "-container")), m = h.querySelector(".".concat(J, "-canvas")), v = h.querySelector(".".concat(J, "-drag-box")), f = h.querySelector(".".concat(J, "-crop-box")), p = f.querySelector(".".concat(J, "-face"));
        this.container = i, this.cropper = h, this.canvas = m, this.dragBox = v, this.cropBox = f, this.viewBox = h.querySelector(".".concat(J, "-view-box")), this.face = p, m.appendChild(a), ae(t, he), i.insertBefore(h, t.nextSibling), this.isImg || we(a, fr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, ae(f, he), n.guides || ae(f.getElementsByClassName("".concat(J, "-dashed")), he), n.center || ae(f.getElementsByClassName("".concat(J, "-center")), he), n.background && ae(h, "".concat(J, "-bg")), n.highlight || ae(p, Cs), n.cropBoxMovable && (ae(p, $t), tt(p, et, Vt)), n.cropBoxResizable || (ae(f.getElementsByClassName("".concat(J, "-line")), he), ae(f.getElementsByClassName("".concat(J, "-point")), he)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), de(n.ready) && pe(t, br, n.ready, {
          once: !0
        }), Ue(t, br);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), we(this.element, he));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = al, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      Z(_r, Be(t) && t);
    }
  }]), o;
}();
Z(Hr.prototype, el, tl, rl, il, nl, ol);
const sl = { class: "flex" }, ll = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, cl = { class: "ml-auto mb-2" }, ul = { class: "w-full flex justify-center" }, dl = ["src"], hl = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { t: n } = R("i18n"), { apiUrl: a } = ke(), i = V(null), l = V(null), h = V(!1), m = () => {
      h.value = !h.value, h.value ? l.value = new Hr(i.value, {
        crop(f) {
        }
      }) : l.value.destroy();
    }, v = () => {
      l.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (f) => {
          ht(a.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: f },
            name: t.selection.item.basename,
            json: !1
          }).then((p) => {
            i.value.src = Dt(t.selection.adapter, t.selection.item.path), m(), e("load");
          }).catch((p) => console.log(p.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (f, p) => (x(), C(se, null, [
      d("div", sl, [
        d("h3", ll, $(o.selection.item.basename), 1),
        d("div", cl, [
          h.value ? (x(), C("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(_(n)("Crop")), 1)) : oe("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: p[0] || (p[0] = (b) => m())
          }, $(h.value ? _(n)("Cancel") : _(n)("Edit")), 1)
        ])
      ]),
      d("div", ul, [
        d("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[60vh] max-h-[60vh]",
          src: _(Dt)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, dl)
      ])
    ], 64));
  }
}, fl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ml = /* @__PURE__ */ d("div", null, " Default view.. ", -1), pl = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return xe(() => {
      e("load");
    }), (t, n) => (x(), C(se, null, [
      d("h3", fl, $(o.selection.item.basename), 1),
      ml
    ], 64));
  }
}, gl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vl = {
  class: "w-full",
  preload: "",
  controls: ""
}, bl = ["src"], yl = /* @__PURE__ */ Me(" Your browser does not support the video tag. "), wl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = ke(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, l) => (x(), C(se, null, [
      d("h3", gl, $(o.selection.item.basename), 1),
      d("div", null, [
        d("video", vl, [
          d("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, bl),
          yl
        ])
      ])
    ], 64));
  }
}, xl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _l = {
  class: "w-full",
  controls: ""
}, kl = ["src"], Sl = /* @__PURE__ */ Me(" Your browser does not support the audio element. "), Dl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = ke(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, l) => (x(), C(se, null, [
      d("h3", xl, $(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", _l, [
          d("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, kl),
          Sl
        ])
      ])
    ], 64));
  }
}, Cl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ml = ["data"], $l = ["src"], El = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = ke(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, l) => (x(), C(se, null, [
      d("h3", Cl, $(o.selection.item.basename), 1),
      d("div", null, [
        d("object", {
          class: "h-[60vh]",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
            class: "border-0",
            src: a(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, $l)
        ], 8, Ml)
      ])
    ], 64));
  }
}, Tl = { class: "sm:flex sm:items-start" }, Al = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ol = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Pl = {
  key: 0,
  class: "flex leading-5"
}, Il = /* @__PURE__ */ d("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ d("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ d("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Nl = {
  name: "VFModalPreview"
}, Ll = /* @__PURE__ */ Object.assign(Nl, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = ke(), n = R("emitter"), { t: a } = R("i18n"), i = V(!1), l = (v) => i.value = v, h = (v) => {
      var f;
      return ((f = e.selection.item.mime_type) != null ? f : "").startsWith(v);
    }, m = () => {
      const v = t.value + "?" + Ie({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", v);
    };
    return (v, f) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: f[6] || (f[6] = (p) => _(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Close")), 1),
        d("button", {
          type: "button",
          onClick: f[7] || (f[7] = (p) => m()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Download")), 1)
      ]),
      default: ee(() => [
        d("div", Tl, [
          d("div", Al, [
            d("div", null, [
              h("text") ? (x(), ce(bs, {
                key: 0,
                selection: o.selection,
                onLoad: f[0] || (f[0] = (p) => l(!0))
              }, null, 8, ["selection"])) : h("image") ? (x(), ce(hl, {
                key: 1,
                selection: o.selection,
                onLoad: f[1] || (f[1] = (p) => l(!0))
              }, null, 8, ["selection"])) : h("video") ? (x(), ce(wl, {
                key: 2,
                selection: o.selection,
                onLoad: f[2] || (f[2] = (p) => l(!0))
              }, null, 8, ["selection"])) : h("audio") ? (x(), ce(Dl, {
                key: 3,
                selection: o.selection,
                onLoad: f[3] || (f[3] = (p) => l(!0))
              }, null, 8, ["selection"])) : h("application/pdf") ? (x(), ce(El, {
                key: 4,
                selection: o.selection,
                onLoad: f[4] || (f[4] = (p) => l(!0))
              }, null, 8, ["selection"])) : (x(), ce(pl, {
                key: 5,
                selection: o.selection,
                onLoad: f[5] || (f[5] = (p) => l(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", Ol, [
              d("p", null, $(o.selection.item.path), 1),
              d("p", null, "mime_type: " + $(o.selection.item.mime_type), 1),
              i.value == !1 ? (x(), C("div", Pl, [
                Il,
                d("span", null, $(_(a)("Loading")), 1)
              ])) : oe("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jl = { class: "sm:flex sm:items-start" }, Vl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), zl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Bl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Rl = { class: "mt-2" }, Hl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ul = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Yl = [
  Kl
], Wl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fl = [
  Xl
], ql = { class: "ml-1.5" }, Gl = ["onKeyup"], Jl = { class: "text-red-600" }, Zl = {
  name: "VFModalRename"
}, Ql = /* @__PURE__ */ Object.assign(Zl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(e.selection.items[0]), l = V(e.selection.items[0].basename), h = V(""), m = () => {
      l.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          item: i.value.path,
          name: l.value
        },
        onError: (v) => {
          h.value = v.message, t.emit("vf-toast-push", { label: v.message, type: "error" });
        }
      });
    };
    return (v, f) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: m,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: f[1] || (f[1] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", jl, [
          Vl,
          d("div", zl, [
            d("h3", Bl, $(_(a)("Rename")), 1),
            d("div", Rl, [
              d("p", Hl, [
                i.value.type == "dir" ? (x(), C("svg", Ul, Yl)) : (x(), C("svg", Wl, Fl)),
                d("span", ql, $(i.value.basename), 1)
              ]),
              ge(d("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (p) => l.value = p),
                onKeyup: Ke(m, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Gl), [
                [Ye, l.value]
              ]),
              d("div", Jl, $(h.value), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ec = { class: "sm:flex sm:items-start" }, tc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), rc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ic = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, nc = { class: "mt-2" }, oc = { class: "text-gray-500 mb-1" }, ac = ["id"], sc = {
  key: 0,
  class: "py-2"
}, lc = ["disabled", "onClick"], cc = {
  name: "VFModalUpload"
}, uc = /* @__PURE__ */ Object.assign(cc, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { apiUrl: n } = ke(), { t: a } = R("i18n"), i = V(null), l = V(null), h = V(null), m = V([]), v = V(!0), f = () => {
      i.value.start();
    };
    return xe(() => {
      i.value = new wt.Uploader({
        runtimes: "html5",
        browse_button: h.value,
        container: l.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Ie({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(p, b) {
            v.value = !1, wt.each(b, function(A) {
              m.value.push({
                id: A.id,
                name: A.name,
                size: wt.formatSize(A.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(p, b) {
            m.value[m.value.findIndex((A) => A.id == b.id)].percent = b.percent + "%";
          },
          UploadComplete: function() {
            v.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(p, b) {
          }
        }
      }), i.value.init();
    }), (p, b) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          disabled: v.value,
          onClick: Oe(f, ["prevent"]),
          type: "button",
          class: ue([v.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, $(_(a)("Upload")), 11, lc),
        d("button", {
          type: "button",
          onClick: b[0] || (b[0] = (A) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", ec, [
          tc,
          d("div", rc, [
            d("h3", ic, $(_(a)("Upload files")), 1),
            d("div", nc, [
              d("div", oc, [
                (x(!0), C(se, null, ve(m.value, (A) => (x(), C("div", null, [
                  d("div", {
                    id: A.id
                  }, [
                    Me($(A.name) + " ( " + $(A.size) + ") ", 1),
                    d("b", null, $(A.percent), 1)
                  ], 8, ac)
                ]))), 256)),
                m.value.length ? oe("", !0) : (x(), C("div", sc, $(_(a)("No files selected!")), 1))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: l
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: h,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, $(_(a)("Select Files")), 513)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), dc = { class: "sm:flex sm:items-start" }, hc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), fc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, mc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, pc = { class: "mt-2" }, gc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, vc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), yc = [
  bc
], wc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), _c = [
  xc
], kc = { class: "ml-1.5" }, Sc = ["onKeyup", "placeholder"], Dc = {
  name: "VFModalArchive"
}, Cc = /* @__PURE__ */ Object.assign(Dc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(""), l = V(e.selection.items), h = () => {
      l.value.length && t.emit("vf-fetch", { params: {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(l.value.map(({ path: m, type: v }) => ({ path: m, type: v }))),
        name: i.value
      } });
    };
    return (m, v) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: h,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: v[1] || (v[1] = (f) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", dc, [
          hc,
          d("div", fc, [
            d("h3", mc, $(_(a)("Archive the files")), 1),
            d("div", pc, [
              (x(!0), C(se, null, ve(l.value, (f) => (x(), C("p", gc, [
                f.type == "dir" ? (x(), C("svg", vc, yc)) : (x(), C("svg", wc, _c)),
                d("span", kc, $(f.basename), 1)
              ]))), 256)),
              ge(d("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => i.value = f),
                onKeyup: Ke(h, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Sc), [
                [Ye, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Mc = { class: "sm:flex sm:items-start" }, $c = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Ec = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Tc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ac = { class: "mt-2" }, Oc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Pc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ic = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Nc = [
  Ic
], Lc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Vc = [
  jc
], zc = { class: "ml-1.5" }, Bc = { class: "my-1 text-sm text-gray-500" }, Rc = {
  name: "VFModalUnarchive"
}, Hc = /* @__PURE__ */ Object.assign(Rc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n");
    V("");
    const i = V(e.selection.items[0]), l = V([]), h = () => {
      t.emit("vf-fetch", { params: {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: i.value.path
      } });
    };
    return (m, v) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: h,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: v[0] || (v[0] = (f) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", Mc, [
          $c,
          d("div", Ec, [
            d("h3", Tc, $(_(a)("Unarchive")), 1),
            d("div", Ac, [
              (x(!0), C(se, null, ve(l.value, (f) => (x(), C("p", Oc, [
                f.type == "dir" ? (x(), C("svg", Pc, Nc)) : (x(), C("svg", Lc, Vc)),
                d("span", zc, $(f.basename), 1)
              ]))), 256)),
              d("p", Bc, $(_(a)("The archive will be unarchived at")) + " (" + $(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Uc = { class: "sm:flex sm:items-start" }, Kc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Yc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Wc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Xc = { class: "mt-2" }, Fc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, qc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Jc = [
  Gc
], Zc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), eu = [
  Qc
], tu = { class: "ml-1.5" }, ru = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Bu dosyalar\u0131 ta\u015F\u0131mak istedi\u011Finizden emin misiniz?", -1), iu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, nu = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), ou = { class: "ml-1.5 overflow-auto" }, au = {
  name: "VFModalMove"
}, su = /* @__PURE__ */ Object.assign(au, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { t: n } = R("i18n"), { getStore: a } = R("storage"), i = V(e.selection.items.from), l = () => {
      i.value.length && t.emit("vf-fetch", { params: {
        q: "move",
        adapter: a("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: h, type: m }) => ({ path: h, type: m }))),
        item: e.selection.items.to.path
      } });
    };
    return (h, m) => (x(), ce(Se, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(n)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (v) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", Uc, [
          Kc,
          d("div", Yc, [
            d("h3", Wc, $(_(n)("Move files")), 1),
            d("div", Xc, [
              (x(!0), C(se, null, ve(i.value, (v) => (x(), C("p", Fc, [
                v.type == "dir" ? (x(), C("svg", qc, Jc)) : (x(), C("svg", Zc, eu)),
                d("span", tu, $(v.path), 1)
              ]))), 256)),
              ru,
              d("p", iu, [
                nu,
                d("span", ou, $(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Ba,
  ModalMessage: Fa,
  ModalNewFolder: is,
  ModalNewFile: hs,
  ModalPreview: Ll,
  ModalRename: Ql,
  ModalUpload: uc,
  ModalArchive: Cc,
  ModalUnarchive: Hc,
  ModalMove: su
}, Symbol.toStringTag, { value: "Module" })), kt = {
  VueFinder: ba,
  ...lu
};
const du = {
  install(o) {
    for (const e in kt)
      if (kt.hasOwnProperty(e)) {
        const t = kt[e];
        o.component(t.name, t);
      }
  }
};
export {
  du as default
};
