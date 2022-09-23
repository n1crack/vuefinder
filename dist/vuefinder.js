import { ref as V, watch as Nt, inject as R, openBlock as x, createElementBlock as C, createElementVNode as d, unref as _, normalizeClass as ue, createTextVNode as Me, toDisplayString as E, createCommentVNode as oe, createVNode as ye, TransitionGroup as Ti, withCtx as ee, Fragment as se, renderList as ve, reactive as dt, onMounted as xe, withDirectives as ge, vShow as at, normalizeStyle as Lt, withModifiers as Oe, nextTick as mt, vModelSelect as lr, customRef as Ai, withKeys as Ke, isRef as Oi, vModelText as Ye, provide as yt, createBlock as ce, resolveDynamicComponent as Pi, renderSlot as cr } from "vue";
import wt from "plupload";
const ht = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const a = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    a.headers = {};
    let i = new FormData();
    for (const [l, f] of Object.entries(t))
      i.append(l, f);
    a.body = i;
  }
  return fetch(o, a).then((i) => i.ok ? n ? i.json() : i.text() : Promise.reject(i));
};
function Ii(o) {
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
  function a(f, m) {
    t.value = Object.assign({ ...t.value }, { [f]: m });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (f, m = null) => t.value === null || t.value === "" ? m : t.value.hasOwnProperty(f) ? t.value[f] : m, setStore: a, clearStore: i };
}
const ur = V("");
function Se() {
  function o(e) {
    ur.value = e;
  }
  return { apiUrl: ur, setApiUrl: o };
}
const Ni = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Li = {
  key: 0,
  class: "flex text-center"
}, ji = ["aria-label"], Vi = /* @__PURE__ */ d("svg", {
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
], -1), zi = [
  Vi
], Bi = ["aria-label"], Ri = /* @__PURE__ */ d("svg", {
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
], -1), Hi = [
  Ri
], Ui = ["aria-label"], Ki = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Yi = [
  Ki
], Wi = ["aria-label"], Xi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Fi = [
  Xi
], qi = ["aria-label"], Gi = /* @__PURE__ */ d("svg", {
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
], -1), Ji = [
  Gi
], Zi = ["aria-label"], Qi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), en = [
  Qi
], tn = ["aria-label"], rn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), nn = [
  rn
], on = {
  key: 1,
  class: "flex text-center"
}, an = { class: "pl-2" }, sn = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, ln = { class: "flex text-center items-center justify-end" }, cn = ["aria-label"], un = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), dn = [
  un
], hn = ["aria-label"], fn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, mn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, pn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, gn = ["aria-label"], vn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, bn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, yn = {
  name: "VFToolbar"
}, wn = /* @__PURE__ */ Object.assign(yn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = R("emitter"), { getStore: t, setStore: n } = R("storage"), { t: a } = R("i18n"), i = V(t("viewport", "grid")), l = V([]), f = V(t("full-screen", !1)), m = V("");
    e.on("vf-search-query", ({ newQuery: h }) => {
      m.value = h;
    });
    const p = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (h) => {
      l.value = h;
    }), e.on("vf-view-toggle", (h) => {
      n("viewport", h), i.value = h;
    }), (h, v) => (x(), C("div", Ni, [
      m.value.length ? (x(), C("div", on, [
        d("div", an, [
          Me(E(_(a)("Search results for")) + " ", 1),
          d("span", sn, E(m.value), 1)
        ])
      ])) : (x(), C("div", Li, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: v[0] || (v[0] = (b) => _(e).emit("vf-modal-show", { type: "new-folder", items: l.value }))
        }, zi, 8, ji),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[1] || (v[1] = (b) => _(e).emit("vf-modal-show", { type: "new-file", items: l.value }))
        }, Hi, 8, Bi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[2] || (v[2] = (b) => l.value.length != 1 || _(e).emit("vf-modal-show", { type: "rename", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Yi, 2))
        ], 8, Ui),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[3] || (v[3] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "delete", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Fi, 2))
        ], 8, Wi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[4] || (v[4] = (b) => _(e).emit("vf-modal-show", { type: "upload", items: l.value }))
        }, Ji, 8, qi),
        l.value.length == 1 && l.value[0].mime_type == "application/zip" ? (x(), C("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": _(a)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[5] || (v[5] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "unarchive", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, en, 2))
        ], 8, Zi)) : (x(), C("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": _(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[6] || (v[6] = (b) => !l.value.length || _(e).emit("vf-modal-show", { type: "archive", items: l.value }))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([l.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, nn, 2))
        ], 8, tn))
      ])),
      d("div", ln, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (x(), C("svg", {
            onClick: v[7] || (v[7] = (b) => _(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, dn))
        ], 8, cn),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p
        }, [
          (x(), C("svg", fn, [
            f.value ? (x(), C("path", mn)) : (x(), C("path", pn))
          ]))
        ], 8, hn),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: v[8] || (v[8] = (b) => m.value.length || _(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (x(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: ue([m.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (x(), C("path", vn)) : oe("", !0),
            i.value == "list" ? (x(), C("path", bn)) : oe("", !0)
          ], 2))
        ], 8, gn)
      ])
    ]));
  }
});
var xn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Mr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(xn, function() {
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
    function f(u) {
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
      }), s && h(u, s);
    }
    function p(u) {
      return p = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, p(u);
    }
    function h(u, s) {
      return h = Object.setPrototypeOf || function(g, c) {
        return g.__proto__ = c, g;
      }, h(u, s);
    }
    function v() {
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
      return v() ? b = Reflect.construct : b = function(c, y, w) {
        var k = [null];
        k.push.apply(k, y);
        var S = Function.bind.apply(c, k), O = new S();
        return w && h(O, w.prototype), O;
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
          return b(g, arguments, p(this).constructor);
        }
        return c.prototype = Object.create(g.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), h(c, g);
      }, M(u);
    }
    function T(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function L(u, s) {
      return s && (typeof s == "object" || typeof s == "function") ? s : T(u);
    }
    function z(u) {
      var s = v();
      return function() {
        var g = p(u), c;
        if (s) {
          var y = p(this).constructor;
          c = Reflect.construct(g, arguments, y);
        } else
          c = g.apply(this, arguments);
        return L(this, c);
      };
    }
    function B(u, s) {
      for (; !Object.prototype.hasOwnProperty.call(u, s) && (u = p(u), u !== null); )
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
      return X(u) || le(u, s) || fe(u, s) || I();
    }
    function F(u) {
      return D(u) || q(u) || fe(u) || U();
    }
    function D(u) {
      if (Array.isArray(u))
        return N(u);
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
          return N(u, s);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return N(u, s);
      }
    }
    function N(u, s) {
      (s == null || s > u.length) && (s = u.length);
      for (var r = 0, g = new Array(s); r < s; r++)
        g[r] = u[r];
      return g;
    }
    function U() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function I() {
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
    }, Ht = function(u) {
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
    }, Ut = function(s) {
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
        return Ut(s);
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
      return !g.x && !g.x ? Ut(s) : g;
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
    }, Kt = function(u) {
      var s = u.computedStyle, r = u.node, g = s.position, c = g === "absolute" || g === "relative" || g === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, qr = function(u) {
      var s = u.shiftKey, r = u.keyboardDragSpeed, g = u.zoom, c = u.key, y = u.dragKeys, w = u.scrollDiff, k = u.canScroll, S = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, $ = s ? r * 4 * g : r * g;
      return y.left.includes(c) && (O.x = w.x || -$, !s && !w.x && k && S(["left"], r)), y.right.includes(c) && (O.x = w.x || $, !s && !w.x && k && S(["right"], r)), y.up.includes(c) && (O.y = w.y || -$, !s && !w.y && k && S(["top"], r)), y.down.includes(c) && (O.y = w.y || $, !s && !w.y && k && S(["bottom"], r)), O;
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
    }, Yt = function(u) {
      var s = u.element, r = u.posDirection, g = u.containerRect, c = u.useTransform, y = Xr(s, c), w = Y(y, "+", r);
      Fe(s, w, c);
      var k = s.getBoundingClientRect(), S = Ht({
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
          condition: function($) {
            return $.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, w = function() {
        var $ = ne(S[k], 2), j = $[0], K = $[1];
        ["pre", !1].forEach(function(Q) {
          return s(Q ? "".concat(j, ":").concat(Q) : j, function(me) {
            return K.forEach(function(re) {
              return (!re.condition || re.condition(me)) && r(Q ? "".concat(Q).concat(re.name) : re.name, f({
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
    }, Wt = function(u, s) {
      u.style.left = "".concat(s.left, "px"), u.style.top = "".concat(s.top, "px"), u.style.width = "".concat(s.width, "px"), u.style.height = "".concat(s.height, "px");
    }, ti = /* @__PURE__ */ function() {
      function u(s) {
        var r = this, g = s.area, c = s.PS, y = s.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(w) {
          r._node = w, Kt({
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
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function($) {
          var j = $.event, K = $.key;
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
              return Yt({
                element: re,
                posDirection: me,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], Q);
          }
        }), i(this, "keyboardEnd", function($) {
          var j = $.event, K = $.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var Q = {
              event: j,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], Q);
          }
        }), i(this, "start", function($) {
          var j = $.isDragging, K = $.isDraggingKeyboard;
          !j || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function($) {
          $ != null && $.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function($) {
          var j = $.isDragging, K = $.isDraggingKeyboard;
          if (!(!j || !r._elements.length || K || r.DS.continue)) {
            var Q = Y(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(me) {
              return Yt({
                element: me,
                posDirection: Q,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function($) {
          r._elements.forEach(function(j) {
            return j.style.zIndex = "".concat((parseInt(j.style.zIndex) || 0) + $ ? 9999 : -9998);
          });
        }), this.DS = g, this._useTransform = S, this._keyboardDragSpeed = k, this._keyboardDrag = w, this._zoom = O, this._draggability = y, this._dragKeys = {
          up: c.up.map(function($) {
            return $.toLowerCase();
          }),
          down: c.down.map(function($) {
            return $.toLowerCase();
          }),
          left: c.left.map(function($) {
            return $.toLowerCase();
          }),
          right: c.right.map(function($) {
            return $.toLowerCase();
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
            var $ = r.DS, j = $.stores, K = j.PointerStore, Q = j.KeyStore, me = $.SelectableSet, re = $.SelectedSet;
            K.start(O);
            var Ve = O.target;
            !me.has(Ve) || (Q.isMultiSelectKeyPressed(O) || re.clear(), re.toggle(Ve), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(S) {
          var O = S.event, $ = S.scroll_directions, j = S.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: O,
            scroll_directions: $,
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
        var c, y = g.elements, w = g.className, k = g.hoverClassName, S = g.draggability, O = g.useTransform, $ = g.DS;
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
        }), c.DS = $, c._initElements = je(y), c._className = w, c._hoverClassName = k, c._useTransform = O, c._draggability = S, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return a(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Kt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), P(p(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), P(p(r.prototype), "delete", this).call(this, c);
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
          if (!P(p(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", y), P(p(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!P(p(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", y);
            var w = P(p(r.prototype), "delete", this).call(this, c);
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
          for (var S = r.DS, O = S.SelectableSet, $ = S.SelectorArea, j = S.Selector, K = O.elements.map(function(De) {
            return [De, De.getBoundingClientRect()];
          }), Q = [], me = [], re = 0, Ve = K.length; re < Ve; re++)
            !$.isInside(K[re][0], K[re][1]) || (vt(K[re][1], j.rect) ? Q.push(K[re][0]) : me.push(K[re][0]));
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
            var O = r.DS.stores.PointerStore, $ = O.initialValArea;
            Wt(r.HTMLNode, te($, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(k) {
          var S = k.isDragging;
          if (!(S || r.DS.continue)) {
            var O = r.DS.stores, $ = O.ScrollStore, j = O.PointerStore, K = Kr({
              scrollAmount: $.scrollAmount,
              initialPointerPos: j.initialValArea,
              pointerPos: j.currentValArea
            });
            Wt(r.HTMLNode, K), r._rect = null;
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
          var k = r.DS.Area.rect, S = r.DS.Area.computedBorder, O = r.HTMLNode.style, $ = "".concat(k.top + S.top, "px"), j = "".concat(k.left + S.left, "px"), K = "".concat(k.width, "px"), Q = "".concat(k.height, "px");
          O.top !== $ && (O.top = $), O.left !== j && (O.left = j), O.width !== K && (O.width = K), O.height !== Q && (O.height = Q);
        }), i(this, "stop", function(k) {
          r.stopAutoScroll(), k && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var k = r.DS, S = k.stores.PointerStore, O = k.Area;
            r.currentEdges = Ht({
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
        var r = this, g = s.area, c = g === void 0 ? document : g, y = s.selectables, w = y === void 0 ? [] : y, k = s.autoScrollSpeed, S = k === void 0 ? 5 : k, O = s.overflowTolerance, $ = O === void 0 ? {
          x: 25,
          y: 25
        } : O, j = s.zoom, K = j === void 0 ? 1 : j, Q = s.customStyles, me = Q === void 0 ? !1 : Q, re = s.multiSelectMode, Ve = re === void 0 ? !1 : re, ot = s.multiSelectToggling, De = ot === void 0 ? !0 : ot, Xt = s.multiSelectKeys, mi = Xt === void 0 ? ["Control", "Shift", "Meta"] : Xt, Ft = s.selector, pi = Ft === void 0 ? void 0 : Ft, qt = s.draggability, bt = qt === void 0 ? !0 : qt, Gt = s.immediateDrag, gi = Gt === void 0 ? !0 : Gt, Jt = s.keyboardDrag, vi = Jt === void 0 ? !0 : Jt, bi = s.dragKeys, Zt = s.keyboardDragSpeed, yi = Zt === void 0 ? 10 : Zt, Qt = s.useTransform, er = Qt === void 0 ? !0 : Qt, tr = s.hoverClass, rr = tr === void 0 ? "ds-hover" : tr, ir = s.selectableClass, nr = ir === void 0 ? "ds-selectable" : ir, or = s.selectedClass, wi = or === void 0 ? "ds-selected" : or, ar = s.selectorClass, xi = ar === void 0 ? "ds-selector" : ar, sr = s.selectorAreaClass, _i = sr === void 0 ? "ds-selector-area" : sr, ki = s.callback, Si = s.onDragMove, Di = s.onDragStartBegin, Ci = s.onDragStart, Mi = s.onElementSelect, $i = s.onElementUnselect;
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
          overflowTolerance: $
        }), this.SelectableSet = new oi({
          elements: w,
          DS: this,
          className: nr,
          hoverClassName: rr,
          useTransform: er,
          draggability: bt
        }), this.SelectedSet = new ai({
          DS: this,
          className: wi
        }), this.Selection = new si({
          DS: this,
          hoverClassName: rr,
          multiSelectToggling: De
        }), this.Drag = new ri({
          DS: this,
          draggability: bt,
          useTransform: er,
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
          selectableClass: nr
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
          g && (O("callback", "callback"), this.subscribe("callback", function($) {
            var j = $.items;
            $.item;
            var K = $.event;
            return g(j, K);
          })), c && (O("onDragMove", "dragmove"), this.subscribe("dragmove", function($) {
            $.items, $.item;
            var j = $.event;
            return c(j);
          })), y && (O("onDragStart", "dragstart"), this.subscribe("dragstart", function($) {
            $.items, $.item;
            var j = $.event;
            return y(j);
          })), w && (O("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function($) {
            $.items, $.item;
            var j = $.event;
            return w(j);
          })), k && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function($) {
            $.items;
            var j = $.item, K = $.event;
            return k(j, K);
          })), S && (O("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function($) {
            $.items;
            var j = $.item, K = $.event;
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
const _n = Mr.exports, kn = (o, e, t, n, a) => (e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B"), Sn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), Dn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Cn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Mn = [
  Cn
], $n = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, En = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Tn = [
  En
], An = {
  name: "VFSortIcon"
}, st = /* @__PURE__ */ Object.assign(An, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (x(), C("div", null, [
      o.direction == "down" ? (x(), C("svg", Dn, Mn)) : oe("", !0),
      o.direction == "up" ? (x(), C("svg", $n, Tn)) : oe("", !0)
    ]));
  }
}), On = ["onClick"], Pn = {
  name: "VFToast.vue"
}, In = /* @__PURE__ */ Object.assign(Pn, {
  setup(o) {
    const e = R("emitter"), { getStore: t } = R("storage"), n = V(t("full-screen", !1)), a = (m) => m == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = V([]), l = (m) => {
      i.value.splice(m, 1);
    }, f = (m) => {
      let p = i.value.findIndex((h) => h.id === m);
      p !== -1 && l(p);
    };
    return e.on("vf-toast-push", (m) => {
      let p = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      m.id = p, i.value.push(m), setTimeout(() => {
        f(p);
      }, 5e3);
    }), (m, p) => (x(), C("div", {
      class: ue([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      ye(Ti, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: ee(() => [
          (x(!0), C(se, null, ve(i.value, (h, v) => (x(), C("div", {
            onClick: (b) => l(v),
            key: h,
            class: ue([a(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, E(h.label), 11, On))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Ie = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: Nn } = Se(), Dt = (o, e) => Nn.value + "?" + Ie({ q: "preview", adapter: o, path: e }), Ln = { class: "relative flex-auto flex flex-col overflow-hidden" }, jn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Vn = { class: "absolute" }, zn = /* @__PURE__ */ d("svg", {
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
], -1), Bn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Rn = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Hn = { class: "grid grid-cols-12 items-center" }, Un = { class: "flex col-span-7 items-center" }, Kn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Wn = [
  Yn
], Xn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), qn = [
  Fn
], Gn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Jn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Zn = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Qn = { class: "grid grid-cols-12 items-center" }, eo = { class: "flex col-span-7 items-center" }, to = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ro = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), io = [
  ro
], no = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ao = [
  oo
], so = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, lo = { class: "col-span-2 text-center" }, co = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, uo = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], ho = { class: "relative" }, fo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), po = [
  mo
], go = ["src"], vo = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), yo = [
  bo
], wo = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, xo = { class: "break-all" }, _o = {
  name: "VFExplorer"
}, ko = /* @__PURE__ */ Object.assign(_o, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { setStore: n, getStore: a } = R("storage"), i = (N) => N == null ? void 0 : N.substring(0, 3), l = (N) => N.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = V(null), m = V(null), p = V(0), h = V(null), { t: v } = R("i18n"), b = Math.floor(Math.random() * 2 ** 32), A = V(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      A.value = !A.value, n("full-screen", A.value);
    });
    const M = V("");
    t.on("vf-search-query", ({ newQuery: N }) => {
      M.value = N, N ? t.emit("vf-fetch", { q: "search", adapter: e.data.adapter, path: e.data.dirname, filter: N }) : t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: e.data.dirname });
    });
    let T = null;
    const L = () => {
      T && clearTimeout(T);
    }, z = (N) => {
      T = setTimeout(() => {
        B(N);
      }, 500);
    }, B = (N) => {
      N.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: N.path })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: N });
    }, P = dt({ active: !1, column: "", order: "" }), ne = (N = !0) => {
      let U = [...e.data.files], I = P.column, Y = P.order == "asc" ? 1 : -1;
      if (!N)
        return U;
      const H = (te, G) => typeof te == "string" && typeof G == "string" ? te.toLowerCase().localeCompare(G.toLowerCase()) : te < G ? -1 : te > G ? 1 : 0;
      return P.active && (U = U.slice().sort((te, G) => H(te[I], G[I]) * Y)), U;
    }, F = (N) => {
      P.active && P.column == N ? (P.active = P.order == "asc", P.column = N, P.order = "desc") : (P.active = !0, P.column = N, P.order = "asc");
    }, D = () => h.value.getSelection().map((N) => JSON.parse(N.dataset.item)), X = (N, U) => {
      if (N.altKey || N.ctrlKey || N.metaKey)
        return N.preventDefault(), !1;
      N.dataTransfer.setDragImage(m.value, 0, 15), N.dataTransfer.effectAllowed = "all", N.dataTransfer.dropEffect = "copy", N.dataTransfer.setData("items", JSON.stringify(D()));
    }, q = (N, U) => {
      N.preventDefault();
      let I = JSON.parse(N.dataTransfer.getData("items"));
      if (I.find((Y) => Y.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: I, to: U } });
    }, le = (N, U) => {
      N.preventDefault(), !U || U.type !== "dir" || h.value.getSelection().find((I) => I == N.currentTarget) ? (N.dataTransfer.dropEffect = "none", N.dataTransfer.effectAllowed = "none") : N.dataTransfer.dropEffect = "copy";
    };
    return xe(() => {
      h.value = new _n({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => mt(() => {
        h.value.clearSelection(), h.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), h.value.subscribe("predragstart", ({ event: N, isDragging: U }) => {
        if (U)
          p.value = h.value.getSelection().length, h.value.break();
        else {
          const I = N.target.offsetWidth - N.offsetX, Y = N.target.offsetHeight - N.offsetY;
          I < 15 && Y < 15 && (h.value.clearSelection(), h.value.break());
        }
      }), h.value.subscribe("predragmove", ({ isDragging: N }) => {
        N && h.value.break();
      }), h.value.subscribe("callback", ({ items: N, event: U, isDragging: I }) => {
        t.emit("vf-nodes-selected", D()), p.value = h.value.getSelection().length;
      });
    }), xe(() => {
      Nt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (N, U) => (x(), C("div", Ln, [
      o.view == "list" || M.value.length ? (x(), C("div", jn, [
        d("div", {
          onClick: U[0] || (U[0] = (I) => F("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          Me(E(_(v)("Name")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "basename"]
          ])
        ]),
        M.value.length ? oe("", !0) : (x(), C("div", {
          key: 0,
          onClick: U[1] || (U[1] = (I) => F("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          Me(E(_(v)("Size")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "file_size"]
          ])
        ])),
        M.value.length ? oe("", !0) : (x(), C("div", {
          key: 1,
          onClick: U[2] || (U[2] = (I) => F("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          Me(E(_(v)("Date")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "last_modified"]
          ])
        ])),
        M.value.length ? (x(), C("div", {
          key: 2,
          onClick: U[3] || (U[3] = (I) => F("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          Me(E(_(v)("Filepath")) + " ", 1),
          ge(ye(st, {
            direction: P.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [at, P.active && P.column == "path"]
          ])
        ])) : oe("", !0)
      ])) : oe("", !0),
      d("div", Vn, [
        d("div", {
          ref_key: "dragImage",
          ref: m,
          class: "absolute -z-50 -top-96"
        }, [
          zn,
          d("div", Bn, E(p.value), 1)
        ], 512)
      ]),
      d("div", {
        style: Lt(A.value ? "height: 100%;" : ""),
        class: ue([A.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f,
        onContextmenu: U[7] || (U[7] = Oe((I) => _(t).emit("vf-contextmenu-show", { event: I, area: f.value, items: D() }), ["self", "prevent"]))
      }, [
        M.value.length ? (x(!0), C(se, { key: 0 }, ve(ne(), (I, Y) => (x(), C("div", {
          onDblclick: (H) => B(I),
          onTouchstart: (H) => z(I),
          onTouchend: U[4] || (U[4] = (H) => L()),
          onContextmenu: Oe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: D(), target: I }), ["prevent"]),
          class: ue(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": I.type,
          "data-item": JSON.stringify(I),
          "data-index": Y
        }, [
          d("div", Hn, [
            d("div", Un, [
              I.type == "dir" ? (x(), C("svg", Kn, Wn)) : (x(), C("svg", Xn, qn)),
              d("span", Gn, E(I.basename), 1)
            ]),
            d("div", Jn, E(I.path), 1)
          ])
        ], 42, Rn))), 256)) : oe("", !0),
        o.view == "list" && !M.value.length ? (x(!0), C(se, { key: 1 }, ve(ne(), (I, Y) => (x(), C("div", {
          draggable: "true",
          onDblclick: (H) => B(I),
          onTouchstart: (H) => z(I),
          onTouchend: U[5] || (U[5] = (H) => L()),
          onContextmenu: Oe((H) => _(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: D(), target: I }), ["prevent"]),
          onDragstart: (H) => X(H),
          onDragover: (H) => le(H, I),
          onDrop: (H) => q(H, I),
          class: ue(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": I.type,
          "data-item": JSON.stringify(I),
          "data-index": Y
        }, [
          d("div", Qn, [
            d("div", eo, [
              I.type == "dir" ? (x(), C("svg", to, io)) : (x(), C("svg", no, ao)),
              d("span", so, E(I.basename), 1)
            ]),
            d("div", lo, E(I.file_size ? _(kn)(I.file_size) : ""), 1),
            d("div", co, E(_(Sn)(I.last_modified)), 1)
          ])
        ], 42, Zn))), 256)) : oe("", !0),
        o.view == "grid" && !M.value.length ? (x(!0), C(se, { key: 2 }, ve(ne(!1), (I, Y) => {
          var H, te;
          return x(), C("div", {
            draggable: "true",
            onDblclick: (G) => B(I),
            onTouchstart: (G) => z(I),
            onTouchend: U[6] || (U[6] = (G) => L()),
            onContextmenu: Oe((G) => _(t).emit("vf-contextmenu-show", { event: G, area: f.value, items: D(), target: I }), ["prevent"]),
            onDragstart: (G) => X(G),
            onDragover: (G) => le(G, I),
            onDrop: (G) => q(G, I),
            class: ue(["vf-item-" + _(b), "border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"]),
            "data-type": I.type,
            "data-item": JSON.stringify(I),
            "data-index": Y
          }, [
            d("div", null, [
              d("div", ho, [
                I.type == "dir" ? (x(), C("svg", fo, po)) : ((H = I.mime_type) != null ? H : "").startsWith("image") ? (x(), C("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: _(Dt)(_(a)("adapter", e.data.adapter), I.path),
                  alt: ""
                }, null, 8, go)) : (x(), C("svg", vo, yo)),
                ((te = I.mime_type) != null ? te : "").startsWith("image") ? oe("", !0) : (x(), C("div", wo, E(i(I.extension)), 1))
              ]),
              d("span", xo, E(l(I.basename)), 1)
            ])
          ], 42, uo);
        }), 256)) : oe("", !0)
      ], 38),
      ye(In)
    ]));
  }
}), So = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Do = { class: "flex leading-5 items-center" }, Co = ["aria-label"], Mo = /* @__PURE__ */ d("svg", {
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
], -1), $o = [
  Mo
], Eo = ["value"], To = { class: "ml-3" }, Ao = { key: 0 }, Oo = { class: "ml-1" }, Po = { class: "flex leading-5 items-center" }, Io = {
  value: "",
  disabled: ""
}, No = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), Lo = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), jo = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), Vo = ["aria-label"], zo = /* @__PURE__ */ d("svg", {
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
], -1), Bo = [
  zo
], Ro = {
  name: "VFStatusbar"
}, Ho = /* @__PURE__ */ Object.assign(Ro, {
  props: {
    data: Object
  },
  setup(o) {
    var b;
    const e = o, t = R("emitter"), { getStore: n, setStore: a } = R("storage"), i = V(0), l = V((b = n("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: m } = R("i18n"), p = V(n("locale", "")), h = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: l.value }), a("adapter", l.value);
    };
    t.on("vf-nodes-selected", (A) => {
      i.value = A.length;
    });
    const v = V("");
    return t.on("vf-search-query", ({ newQuery: A }) => {
      v.value = A;
    }), (A, M) => (x(), C("div", So, [
      d("div", Do, [
        d("div", {
          class: "mx-2",
          "aria-label": _(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, $o, 8, Co),
        ge(d("select", {
          "onUpdate:modelValue": M[0] || (M[0] = (T) => l.value = T),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (x(!0), C(se, null, ve(o.data.storages, (T) => (x(), C("option", { value: T }, E(T), 9, Eo))), 256))
        ], 544), [
          [lr, l.value]
        ]),
        d("div", To, [
          v.value.length ? (x(), C("span", Ao, E(o.data.files.length) + " items found. ", 1)) : oe("", !0),
          d("span", Oo, E(i.value > 0 ? i.value + " " + _(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", Po, [
        ge(d("select", {
          "onUpdate:modelValue": M[1] || (M[1] = (T) => p.value = T),
          onChange: M[2] || (M[2] = (T) => _(m)(T.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", Io, E(_(f)("Language")), 1),
          No,
          Lo,
          jo
        ], 544), [
          [lr, p.value]
        ]),
        d("span", {
          "aria-label": _(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: M[3] || (M[3] = (T) => _(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: _(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Bo, 8, Vo)
      ])
    ]));
  }
}), Uo = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Ko = (o, e, t) => {
  const n = V(o);
  return Ai((i, l) => ({
    get() {
      return i(), n.value;
    },
    set: Uo(
      (f) => {
        n.value = f, l();
      },
      e,
      t
    )
  }));
}, Yo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Wo = ["aria-label"], Xo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Fo = [
  Xo
], qo = ["onClick"], Go = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Jo = [
  Go
], Zo = { class: "flex leading-5" }, Qo = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), ea = ["title", "onClick"], ta = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, ra = /* @__PURE__ */ d("svg", {
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
], -1), ia = ["onKeydown", "placeholder"], na = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), oa = [
  na
], aa = {
  name: "VFBreadcrumb"
}, sa = /* @__PURE__ */ Object.assign(aa, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), a = V(null), i = V([]), l = V(!1), f = V(null), { t: m } = R("i18n");
    t.on("vf-explorer-update", () => {
      var B;
      let L = [], z = [];
      a.value = (B = e.data.dirname) != null ? B : n("adapter", "local") + "://", a.value.length == 0 && (i.value = []), a.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(P) {
        L.push(P), L.join("/") != "" && z.push({
          basename: P,
          name: P,
          path: n("adapter", "local") + "://" + L.join("/"),
          type: "dir"
        });
      }), z.length > 4 && (z = z.slice(-5), z[0].name = ".."), i.value = z;
    });
    const p = () => {
      l.value = !1, v.value = "";
    };
    t.on("vf-search-exit", () => {
      p();
    });
    const h = () => {
      l.value = !0, mt(() => f.value.focus());
    }, v = Ko("", 400);
    Nt(v, (L) => {
      t.emit("vf-search-query", { newQuery: L });
    });
    const b = () => i.value.length && !l.value, A = (L) => {
      var B;
      L.preventDefault();
      let z = JSON.parse(L.dataTransfer.getData("items"));
      if (z.find((P) => P.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: z, to: (B = i.value[i.value.length - 2]) != null ? B : { path: n("adapter", "local") + "://" } }
      });
    }, M = (L) => {
      L.preventDefault(), b() ? L.dataTransfer.dropEffect = "copy" : (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none");
    }, T = () => {
      v.value == "" && p();
    };
    return (L, z) => (x(), C("div", Yo, [
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
            return !b() || _(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (ne = (P = i.value[i.value.length - 2]) == null ? void 0 : P.path) != null ? ne : _(n)("adapter", "local") + "://" });
          }),
          class: ue(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Fo, 34))
      ], 8, Wo),
      l.value ? (x(), C("div", ta, [
        ra,
        ge(d("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ke(p, ["esc"]),
          onBlur: T,
          "onUpdate:modelValue": z[4] || (z[4] = (B) => Oi(v) ? v.value = B : null),
          placeholder: _(m)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, ia), [
          [Ye, _(v)]
        ]),
        (x(), C("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: p,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, oa))
      ])) : (x(), C("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Oe(h, ["self"])
      }, [
        (x(), C("svg", {
          onClick: z[3] || (z[3] = (B) => _(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Jo)),
        d("div", Zo, [
          (x(!0), C(se, null, ve(i.value, (B, P) => (x(), C("div", { key: P }, [
            Qo,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: B.basename,
              onClick: (ne) => _(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: B.path })
            }, E(B.name), 9, ea)
          ]))), 128))
        ])
      ], 8, qo))
    ]));
  }
}), la = ["onClick"], ca = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), ua = {
  name: "VFContextMenu"
}, da = /* @__PURE__ */ Object.assign(ua, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), n = V(null), { apiUrl: a } = Se(), i = dt({
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
    const { t: f } = R("i18n"), m = {
      newfolder: {
        title: () => f("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => f("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: l });
        }
      },
      refresh: {
        title: () => f("Refresh"),
        action: () => {
          t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
        }
      },
      preview: {
        title: () => f("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: l.value[0] });
        }
      },
      open: {
        title: () => f("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].path });
        }
      },
      openDir: {
        title: () => f("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: l.value[0].dir });
        }
      },
      download: {
        title: () => f("Download"),
        action: () => {
          const b = a.value + "?" + Ie({ q: "download", adapter: l.value[0].adapter, path: l.value[0].path });
          t.emit("vf-download", b);
        }
      },
      archive: {
        title: () => f("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: l });
        }
      },
      unarchive: {
        title: () => f("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: l });
        }
      },
      rename: {
        title: () => f("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: l });
        }
      }
    }, p = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, h = V("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      h.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: A, items: M, target: T = null }) => {
      if (i.items = [], h.value)
        if (T)
          i.items.push(m.openDir), t.emit("vf-context-selected", [T]);
        else
          return;
      else
        !T && !h.value ? (i.items.push(m.refresh), i.items.push(m.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : M.length > 1 && M.some((L) => L.path === T.path) ? (i.items.push(m.refresh), i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", M), console.log(M.length + " selected (more than 1 item.)")) : (T.type == "dir" ? i.items.push(m.open) : i.items.push(m.preview), i.items.push(m.rename), i.items.push(m.download), T.mime_type == "application/zip" ? i.items.push(m.unarchive) : i.items.push(m.archive), i.items.push(m.delete), t.emit("vf-context-selected", [T]), console.log(T.type + " is selected"));
      v(b, A);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const v = (b, A) => {
      i.active = !0, mt(() => {
        let M = A.getBoundingClientRect(), T = b.pageX, L = b.pageY, z = n.value.offsetHeight, B = n.value.offsetWidth;
        T = M.right - b.pageX + window.scrollX < B ? T - B : T, L = M.bottom - b.pageY + window.scrollY < z ? L - z : L, i.positions = {
          left: T + "px",
          top: L + "px"
        };
      });
    };
    return (b, A) => i.active ? (x(), C("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: n,
      style: Lt(i.positions)
    }, [
      (x(!0), C(se, null, ve(i.items, (M) => (x(), C("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: M.title,
        onClick: (T) => p(M)
      }, [
        ca,
        d("span", null, E(M.title()), 1)
      ], 8, la))), 128))
    ], 4)) : oe("", !0);
  }
}), ha = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function fa(o) {
  const e = await ha(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.8df71796.js"), "../locales/tr.json": () => import("./tr.a655a0c7.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function ma(o, e) {
  const { getStore: t, setStore: n } = St(o), a = ["en", "tr"], i = V({}), l = (m) => {
    a.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), fa(m).then((p) => {
      i.value = p, n("locale", m), n("translations", p), console.log(m + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : l(e);
  function f(m) {
    return i.value.hasOwnProperty(m) ? i.value[m] : "";
  }
  return { t: f, support_locales: a, changeLocale: l };
}
const pa = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), ga = {
  name: "VueFinder"
}, va = /* @__PURE__ */ Object.assign(ga, {
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
    const e = o, t = Ii(), { setStore: n, getStore: a } = St(e.id);
    yt("emitter", t), yt("storage", St(e.id));
    const i = ma(e.id, e.locale);
    yt("i18n", i);
    const { apiUrl: l, setApiUrl: f } = Se();
    f(e.url);
    const m = dt({ adapter: "local", storages: [], dirname: ".", files: [] }), p = V(a("viewport", "grid")), h = V(a("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      h.value = !h.value, n("darkMode", h.value);
    });
    const v = V(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      v.value = !v.value, n("full-screen", v.value);
    }), t.on("vf-view-toggle", (M) => {
      p.value = M;
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
    return t.on("vf-fetch", (M) => {
      ht(l.value, { params: M }).then((T) => {
        t.emit("vf-modal-close"), A(T);
      });
    }), t.on("vf-download", (M) => {
      document.getElementById("download_frame").src = M, t.emit("vf-modal-close");
    }), xe(() => {
      t.emit("vf-fetch", { q: "index", adapter: a("adapter", m.adapter) });
    }), (M, T) => (x(), C("div", {
      class: ue(h.value ? "dark" : "")
    }, [
      d("div", {
        class: ue([v.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Lt(v.value ? "" : "max-height: " + o.maxHeight),
        onMousedown: T[0] || (T[0] = (L) => _(t).emit("vf-contextmenu-hide"))
      }, [
        ye(wn, { data: m }, null, 8, ["data"]),
        ye(sa, { data: m }, null, 8, ["data"]),
        ye(ko, {
          view: p.value,
          data: m
        }, null, 8, ["view", "data"]),
        ye(Ho, { data: m }, null, 8, ["data"])
      ], 38),
      b.active ? (x(), ce(Pi("v-f-modal-" + b.type), {
        key: 0,
        selection: b.data,
        current: m
      }, null, 8, ["selection", "current"])) : oe("", !0),
      ye(da, { current: m }, null, 8, ["current"]),
      pa
    ], 2));
  }
}), ba = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), ya = { class: "fixed z-10 inset-0 overflow-y-auto" }, wa = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, xa = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, _a = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, ke = {
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
      ba,
      d("div", ya, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Oe((a) => _(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", wa, [
            d("div", xa, [
              cr(t.$slots, "default")
            ]),
            d("div", _a, [
              cr(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, ka = { class: "sm:flex sm:items-start" }, Sa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Da = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ca = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ma = { class: "mt-2" }, $a = { class: "text-sm text-gray-500" }, Ea = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ta = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Aa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Oa = [
  Aa
], Pa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ia = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Na = [
  Ia
], La = { class: "ml-1.5" }, ja = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Va = {
  name: "VFModalDelete"
}, za = /* @__PURE__ */ Object.assign(Va, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(e.selection.items), l = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "delete",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: f, type: m }) => ({ path: f, type: m })))
      });
    };
    return (f, m) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Cancel")), 1),
        d("div", ja, E(_(a)("This action cannot be undone.")), 1)
      ]),
      default: ee(() => [
        d("div", ka, [
          Sa,
          d("div", Da, [
            d("h3", Ca, E(_(a)("Delete files")), 1),
            d("div", Ma, [
              d("p", $a, E(_(a)("Are you sure you want to delete these files ?")), 1),
              (x(!0), C(se, null, ve(i.value, (p) => (x(), C("p", Ea, [
                p.type == "dir" ? (x(), C("svg", Ta, Oa)) : (x(), C("svg", Pa, Na)),
                d("span", La, E(p.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ba = { class: "sm:flex sm:items-start" }, Ra = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ha = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ua = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ka = { class: "mt-2" }, Ya = { class: "text-sm text-gray-500" }, Wa = {
  name: "VFModalMessage"
}, Xa = /* @__PURE__ */ Object.assign(Wa, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = R("emitter"), { t } = R("i18n");
    return (n, a) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => _(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(t)("Close")), 1)
      ]),
      default: ee(() => {
        var i, l, f, m;
        return [
          d("div", Ba, [
            Ra,
            d("div", Ha, [
              d("h3", Ua, E((l = (i = o.selection) == null ? void 0 : i.title) != null ? l : "Title"), 1),
              d("div", Ka, [
                d("p", Ya, E((m = (f = o.selection) == null ? void 0 : f.message) != null ? m : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Fa = { class: "sm:flex sm:items-start" }, qa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ga = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ja = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Za = { class: "mt-2" }, Qa = { class: "text-sm text-gray-500" }, es = ["onKeyup", "placeholder"], ts = {
  name: "VFModalNewFolder"
}, rs = /* @__PURE__ */ Object.assign(ts, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(""), l = () => {
      i.value != "" && (t.emit("vf-fetch", {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: i.value
      }), t.emit("vf-toast-push", { label: "New Folder is created successfully", type: "success" }));
    };
    return (f, m) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", Fa, [
          qa,
          d("div", Ga, [
            d("h3", Ja, E(_(a)("New Folder")), 1),
            d("div", Za, [
              d("p", Qa, E(_(a)("Create a new folder")), 1),
              ge(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (p) => i.value = p),
                onKeyup: Ke(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Folder Name"),
                type: "text"
              }, null, 40, es), [
                [Ye, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), is = { class: "sm:flex sm:items-start" }, ns = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), os = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, as = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ss = { class: "mt-2" }, ls = { class: "text-sm text-gray-500" }, cs = ["onKeyup", "placeholder"], us = {
  name: "VFModalNewFile"
}, ds = /* @__PURE__ */ Object.assign(us, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(""), l = () => {
      i.value != "" && t.emit("vf-fetch", {
        q: "newfile",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: i.value
      });
    };
    return (f, m) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: ee(() => [
        d("div", is, [
          ns,
          d("div", os, [
            d("h3", as, E(_(a)("New File")), 1),
            d("div", ss, [
              d("p", ls, E(_(a)("Create a new file")), 1),
              ge(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (p) => i.value = p),
                onKeyup: Ke(l, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("File Name"),
                type: "text"
              }, null, 40, cs), [
                [Ye, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), hs = { class: "flex" }, fs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ms = { class: "ml-auto mb-2" }, ps = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, gs = { key: 1 }, vs = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = V(""), a = V(""), i = V(null), l = V(!1), { apiUrl: f } = Se(), { t: m } = R("i18n");
    xe(() => {
      ht(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((v) => {
        n.value = v, e("load");
      });
    });
    const p = () => {
      l.value = !l.value, a.value = n.value, l.value == !0 && mt(() => {
        i.value.focus();
      });
    }, h = () => {
      ht(f.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: a.value },
        json: !1
      }).then((v) => {
        n.value = v, e("load"), l.value = !l.value;
      }).catch((v) => console.log(v.statusText));
    };
    return (v, b) => (x(), C(se, null, [
      d("div", hs, [
        d("div", fs, E(o.selection.item.basename), 1),
        d("div", ms, [
          l.value ? (x(), C("button", {
            key: 0,
            onClick: h,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(_(m)("Save")), 1)) : oe("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: b[0] || (b[0] = (A) => p())
          }, E(l.value ? _(m)("Cancel") : _(m)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        l.value ? (x(), C("div", gs, [
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
        ])) : (x(), C("pre", ps, E(n.value), 1))
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
function dr(o, e) {
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
    e % 2 ? dr(Object(t), !0).forEach(function(n) {
      ws(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : dr(Object(t)).forEach(function(n) {
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
function bs(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function hr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function ys(o, e, t) {
  return e && hr(o.prototype, e), t && hr(o, t), o;
}
function ws(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Er(o) {
  return xs(o) || _s(o) || ks(o) || Ss();
}
function xs(o) {
  if (Array.isArray(o))
    return Ct(o);
}
function _s(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function ks(o, e) {
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
function Ss() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var pt = typeof window < "u" && typeof window.document < "u", _e = pt ? window : {}, jt = pt && _e.document.documentElement ? "ontouchstart" in _e.document.documentElement : !1, Vt = pt ? "PointerEvent" in _e : !1, J = "cropper", zt = "all", Tr = "crop", Ar = "move", Or = "zoom", Te = "e", Ae = "w", ze = "s", Ce = "n", qe = "ne", Ge = "nw", Je = "se", Ze = "sw", Mt = "".concat(J, "-crop"), fr = "".concat(J, "-disabled"), he = "".concat(J, "-hidden"), mr = "".concat(J, "-hide"), Ds = "".concat(J, "-invisible"), ft = "".concat(J, "-modal"), $t = "".concat(J, "-move"), et = "".concat(J, "Action"), lt = "".concat(J, "Preview"), Bt = "crop", Pr = "move", Ir = "none", Et = "crop", Tt = "cropend", At = "cropmove", Ot = "cropstart", pr = "dblclick", Cs = jt ? "touchstart" : "mousedown", Ms = jt ? "touchmove" : "mousemove", $s = jt ? "touchend touchcancel" : "mouseup", gr = Vt ? "pointerdown" : Cs, vr = Vt ? "pointermove" : Ms, br = Vt ? "pointerup pointercancel" : $s, yr = "ready", wr = "resize", xr = "wheel", Pt = "zoom", _r = "image/jpeg", Es = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Ts = /^data:/, As = /^data:image\/jpeg;base64,/, Os = /^img|canvas$/i, Nr = 200, Lr = 100, kr = {
  viewMode: 0,
  dragMode: Bt,
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
}, Ps = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', Is = Number.isNaN || _e.isNaN;
function W(o) {
  return typeof o == "number" && !Is(o);
}
var Sr = function(e) {
  return e > 0 && e < 1 / 0;
};
function xt(o) {
  return typeof o > "u";
}
function Pe(o) {
  return ut(o) === "object" && o !== null;
}
var Ns = Object.prototype.hasOwnProperty;
function Be(o) {
  if (!Pe(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && Ns.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function de(o) {
  return typeof o == "function";
}
var Ls = Array.prototype.slice;
function jr(o) {
  return Array.from ? Array.from(o) : Ls.call(o);
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
}, js = /\.\d*(?:0|9){12}\d*$/;
function He(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return js.test(o) ? Math.round(o * e) / e : o;
}
var Vs = /^width|height|left|top|marginLeft|marginTop$/;
function $e(o, e) {
  var t = o.style;
  ie(e, function(n, a) {
    Vs.test(a) && W(n) && (n = "".concat(n, "px")), t[a] = n;
  });
}
function zs(o, e) {
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
var Bs = /([a-z\d])([A-Z])/g;
function Rt(o) {
  return o.replace(Bs, "$1-$2").toLowerCase();
}
function It(o, e) {
  return Pe(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Rt(e)));
}
function tt(o, e, t) {
  Pe(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Rt(e)), t);
}
function Rs(o, e) {
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
    o.removeAttribute("data-".concat(Rt(e)));
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
      var l = o.listeners, f = l === void 0 ? {} : l;
      a = function() {
        delete f[i][t], o.removeEventListener(i, a, n);
        for (var p = arguments.length, h = new Array(p), v = 0; v < p; v++)
          h[v] = arguments[v];
        t.apply(o, h);
      }, f[i] || (f[i] = {}), f[i][t] && o.removeEventListener(i, f[i][t], n), f[i][t] = a, o.listeners = f;
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
var _t = _e.location, Hs = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Dr(o) {
  var e = o.match(Hs);
  return e !== null && (e[1] !== _t.protocol || e[2] !== _t.hostname || e[3] !== _t.port);
}
function Cr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Qe(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, a = o.translateX, i = o.translateY, l = [];
  W(a) && a !== 0 && l.push("translateX(".concat(a, "px)")), W(i) && i !== 0 && l.push("translateY(".concat(i, "px)")), W(e) && e !== 0 && l.push("rotate(".concat(e, "deg)")), W(t) && t !== 1 && l.push("scaleX(".concat(t, ")")), W(n) && n !== 1 && l.push("scaleY(".concat(n, ")"));
  var f = l.length ? l.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function Us(o) {
  var e = $r({}, o), t = 0;
  return ie(o, function(n, a) {
    delete e[a], ie(e, function(i) {
      var l = Math.abs(n.startX - i.startX), f = Math.abs(n.startY - i.startY), m = Math.abs(n.endX - i.endX), p = Math.abs(n.endY - i.endY), h = Math.sqrt(l * l + f * f), v = Math.sqrt(m * m + p * p), b = (v - h) / h;
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
function Ks(o) {
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
  var e = o.aspectRatio, t = o.height, n = o.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = Sr(n), l = Sr(t);
  if (i && l) {
    var f = t * e;
    a === "contain" && f > n || a === "cover" && f < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : l && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function Ys(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var a = n % 90 * Math.PI / 180, i = Math.sin(a), l = Math.cos(a), f = e * l + t * i, m = e * i + t * l;
  return n > 90 ? {
    width: m,
    height: f
  } : {
    width: f,
    height: m
  };
}
function Ws(o, e, t, n) {
  var a = e.aspectRatio, i = e.naturalWidth, l = e.naturalHeight, f = e.rotate, m = f === void 0 ? 0 : f, p = e.scaleX, h = p === void 0 ? 1 : p, v = e.scaleY, b = v === void 0 ? 1 : v, A = t.aspectRatio, M = t.naturalWidth, T = t.naturalHeight, L = n.fillColor, z = L === void 0 ? "transparent" : L, B = n.imageSmoothingEnabled, P = B === void 0 ? !0 : B, ne = n.imageSmoothingQuality, F = ne === void 0 ? "low" : ne, D = n.maxWidth, X = D === void 0 ? 1 / 0 : D, q = n.maxHeight, le = q === void 0 ? 1 / 0 : q, fe = n.minWidth, N = fe === void 0 ? 0 : fe, U = n.minHeight, I = U === void 0 ? 0 : U, Y = document.createElement("canvas"), H = Y.getContext("2d"), te = Ee({
    aspectRatio: A,
    width: X,
    height: le
  }), G = Ee({
    aspectRatio: A,
    width: N,
    height: I
  }, "cover"), We = Math.min(te.width, Math.max(G.width, M)), Xe = Math.min(te.height, Math.max(G.height, T)), rt = Ee({
    aspectRatio: a,
    width: X,
    height: le
  }), it = Ee({
    aspectRatio: a,
    width: N,
    height: I
  }, "cover"), nt = Math.min(rt.width, Math.max(it.width, i)), Ne = Math.min(rt.height, Math.max(it.height, l)), gt = [-nt / 2, -Ne / 2, nt, Ne];
  return Y.width = He(We), Y.height = He(Xe), H.fillStyle = z, H.fillRect(0, 0, We, Xe), H.save(), H.translate(We / 2, Xe / 2), H.rotate(m * Math.PI / 180), H.scale(h, b), H.imageSmoothingEnabled = P, H.imageSmoothingQuality = F, H.drawImage.apply(H, [o].concat(Er(gt.map(function(Le) {
    return Math.floor(He(Le));
  })))), H.restore(), Y;
}
var Rr = String.fromCharCode;
function Xs(o, e, t) {
  var n = "";
  t += e;
  for (var a = e; a < t; a += 1)
    n += Rr(o.getUint8(a));
  return n;
}
var Fs = /^data:.*,/;
function qs(o) {
  var e = o.replace(Fs, ""), t = atob(e), n = new ArrayBuffer(t.length), a = new Uint8Array(n);
  return ie(a, function(i, l) {
    a[l] = t.charCodeAt(l);
  }), n;
}
function Gs(o, e) {
  for (var t = [], n = 8192, a = new Uint8Array(o); a.length > 0; )
    t.push(Rr.apply(null, jr(a.subarray(0, n)))), a = a.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function Js(o) {
  var e = new DataView(o), t;
  try {
    var n, a, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var l = e.byteLength, f = 2; f + 1 < l; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          a = f;
          break;
        }
        f += 1;
      }
    if (a) {
      var m = a + 4, p = a + 10;
      if (Xs(e, m, 4) === "Exif") {
        var h = e.getUint16(p);
        if (n = h === 18761, (n || h === 19789) && e.getUint16(p + 2, n) === 42) {
          var v = e.getUint32(p + 4, n);
          v >= 8 && (i = p + v);
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
function Zs(o) {
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
var Qs = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, a = this.cropper, i = Number(t.minContainerWidth), l = Number(t.minContainerHeight);
    ae(a, he), we(e, he);
    var f = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Nr),
      height: Math.max(n.offsetHeight, l >= 0 ? l : Lr)
    };
    this.containerData = f, $e(a, {
      width: f.width,
      height: f.height
    }), ae(e, he), we(a, he);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, i = a ? t.naturalHeight : t.naturalWidth, l = a ? t.naturalWidth : t.naturalHeight, f = i / l, m = e.width, p = e.height;
    e.height * f > e.width ? n === 3 ? m = e.height * f : p = e.width / f : n === 3 ? p = e.width / f : m = e.height * f;
    var h = {
      aspectRatio: f,
      naturalWidth: i,
      naturalHeight: l,
      width: m,
      height: p
    };
    this.canvasData = h, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (e.width - h.width) / 2, h.top = (e.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = Z({}, h);
  },
  limitCanvas: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, f = n.viewMode, m = i.aspectRatio, p = this.cropped && l;
    if (e) {
      var h = Number(n.minCanvasWidth) || 0, v = Number(n.minCanvasHeight) || 0;
      f > 1 ? (h = Math.max(h, a.width), v = Math.max(v, a.height), f === 3 && (v * m > h ? h = v * m : v = h / m)) : f > 0 && (h ? h = Math.max(h, p ? l.width : 0) : v ? v = Math.max(v, p ? l.height : 0) : p && (h = l.width, v = l.height, v * m > h ? h = v * m : v = h / m));
      var b = Ee({
        aspectRatio: m,
        width: h,
        height: v
      });
      h = b.width, v = b.height, i.minWidth = h, i.minHeight = v, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (p ? 0 : 1)) {
        var A = a.width - i.width, M = a.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, M), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, M), p && this.limited && (i.minLeft = Math.min(l.left, l.left + (l.width - i.width)), i.minTop = Math.min(l.top, l.top + (l.height - i.height)), i.maxLeft = l.left, i.maxTop = l.top, f === 2 && (i.width >= a.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= a.height && (i.minTop = Math.min(0, M), i.maxTop = Math.max(0, M))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = a.width, i.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, a = this.imageData;
    if (t) {
      var i = Ys({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), l = i.width, f = i.height, m = n.width * (l / n.naturalWidth), p = n.height * (f / n.naturalHeight);
      n.left -= (m - n.width) / 2, n.top -= (p - n.height) / 2, n.width = m, n.height = p, n.aspectRatio = l / f, n.naturalWidth = l, n.naturalHeight = f, this.limitCanvas(!0, !1);
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
    var n = this.options, a = this.containerData, i = this.canvasData, l = this.cropBoxData, f = this.limited, m = n.aspectRatio;
    if (e) {
      var p = Number(n.minCropBoxWidth) || 0, h = Number(n.minCropBoxHeight) || 0, v = f ? Math.min(a.width, i.width, i.width + i.left, a.width - i.left) : a.width, b = f ? Math.min(a.height, i.height, i.height + i.top, a.height - i.top) : a.height;
      p = Math.min(p, a.width), h = Math.min(h, a.height), m && (p && h ? h * m > p ? h = p / m : p = h * m : p ? h = p / m : h && (p = h * m), b * m > v ? b = v / m : v = b * m), l.minWidth = Math.min(p, v), l.minHeight = Math.min(h, b), l.maxWidth = v, l.maxHeight = b;
    }
    t && (f ? (l.minLeft = Math.max(0, i.left), l.minTop = Math.max(0, i.top), l.maxLeft = Math.min(a.width, i.left + i.width) - l.width, l.maxTop = Math.min(a.height, i.top + i.height) - l.height) : (l.minLeft = 0, l.minTop = 0, l.maxLeft = a.width - l.width, l.maxTop = a.height - l.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && tt(this.face, et, n.width >= t.width && n.height >= t.height ? Ar : zt), $e(this.cropBox, Z({
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
}, el = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, a = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", l = document.createElement("img");
    if (t && (l.crossOrigin = t), l.src = a, l.alt = i, this.viewBox.appendChild(l), this.viewBoxImage = l, !!n) {
      var f = n;
      typeof n == "string" ? f = e.ownerDocument.querySelectorAll(n) : n.querySelector && (f = [n]), this.previews = f, ie(f, function(m) {
        var p = document.createElement("img");
        tt(m, lt, {
          width: m.offsetWidth,
          height: m.offsetHeight,
          html: m.innerHTML
        }), t && (p.crossOrigin = t), p.src = a, p.alt = i, p.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', m.innerHTML = "", m.appendChild(p);
      });
    }
  },
  resetPreview: function() {
    ie(this.previews, function(e) {
      var t = It(e, lt);
      $e(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Rs(e, lt);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, a = n.width, i = n.height, l = e.width, f = e.height, m = n.left - t.left - e.left, p = n.top - t.top - e.top;
    !this.cropped || this.disabled || ($e(this.viewBoxImage, Z({
      width: l,
      height: f
    }, Qe(Z({
      translateX: -m,
      translateY: -p
    }, e)))), ie(this.previews, function(h) {
      var v = It(h, lt), b = v.width, A = v.height, M = b, T = A, L = 1;
      a && (L = b / a, T = i * L), i && T > A && (L = A / i, M = a * L, T = A), $e(h, {
        width: M,
        height: T
      }), $e(h.getElementsByTagName("img")[0], Z({
        width: l * L,
        height: f * L
      }, Qe(Z({
        translateX: -m * L,
        translateY: -p * L
      }, e))));
    }));
  }
}, tl = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    de(t.cropstart) && pe(e, Ot, t.cropstart), de(t.cropmove) && pe(e, At, t.cropmove), de(t.cropend) && pe(e, Tt, t.cropend), de(t.crop) && pe(e, Et, t.crop), de(t.zoom) && pe(e, Pt, t.zoom), pe(n, gr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && pe(n, xr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && pe(n, pr, this.onDblclick = this.dblclick.bind(this)), pe(e.ownerDocument, vr, this.onCropMove = this.cropMove.bind(this)), pe(e.ownerDocument, br, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && pe(window, wr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    de(t.cropstart) && be(e, Ot, t.cropstart), de(t.cropmove) && be(e, At, t.cropmove), de(t.cropend) && be(e, Tt, t.cropend), de(t.crop) && be(e, Et, t.crop), de(t.zoom) && be(e, Pt, t.zoom), be(n, gr, this.onCropStart), t.zoomable && t.zoomOnWheel && be(n, xr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && be(n, pr, this.onDblclick), be(e.ownerDocument, vr, this.onCropMove), be(e.ownerDocument, br, this.onCropEnd), t.responsive && be(window, wr, this.onResize);
  }
}, rl = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, a = t.offsetWidth / n.width, i = t.offsetHeight / n.height, l = Math.abs(a - 1) > Math.abs(i - 1) ? a : i;
      if (l !== 1) {
        var f, m;
        e.restore && (f = this.getCanvasData(), m = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(ie(f, function(p, h) {
          f[h] = p * l;
        })), this.setCropBoxData(ie(m, function(p, h) {
          m[h] = p * l;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Ir || this.setDragMode(zs(this.dragBox, Mt) ? Pr : Bt);
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
      e.changedTouches ? ie(e.changedTouches, function(f) {
        i[f.identifier] = ct(f);
      }) : i[e.pointerId || 0] = ct(e), Object.keys(i).length > 1 && a.zoomable && a.zoomOnTouch ? l = Or : l = It(e.target, et), !!Es.test(l) && Ue(this.element, Ot, {
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
}, il = {
  change: function(e) {
    var t = this.options, n = this.canvasData, a = this.containerData, i = this.cropBoxData, l = this.pointers, f = this.action, m = t.aspectRatio, p = i.left, h = i.top, v = i.width, b = i.height, A = p + v, M = h + b, T = 0, L = 0, z = a.width, B = a.height, P = !0, ne;
    !m && e.shiftKey && (m = v && b ? v / b : 1), this.limited && (T = i.minLeft, L = i.minTop, z = T + Math.min(a.width, n.width, n.left + n.width), B = L + Math.min(a.height, n.height, n.top + n.height));
    var F = l[Object.keys(l)[0]], D = {
      x: F.endX - F.startX,
      y: F.endY - F.startY
    }, X = function(le) {
      switch (le) {
        case Te:
          A + D.x > z && (D.x = z - A);
          break;
        case Ae:
          p + D.x < T && (D.x = T - p);
          break;
        case Ce:
          h + D.y < L && (D.y = L - h);
          break;
        case ze:
          M + D.y > B && (D.y = B - M);
          break;
      }
    };
    switch (f) {
      case zt:
        p += D.x, h += D.y;
        break;
      case Te:
        if (D.x >= 0 && (A >= z || m && (h <= L || M >= B))) {
          P = !1;
          break;
        }
        X(Te), v += D.x, v < 0 && (f = Ae, v = -v, p -= v), m && (b = v / m, h += (i.height - b) / 2);
        break;
      case Ce:
        if (D.y <= 0 && (h <= L || m && (p <= T || A >= z))) {
          P = !1;
          break;
        }
        X(Ce), b -= D.y, h += D.y, b < 0 && (f = ze, b = -b, h -= b), m && (v = b * m, p += (i.width - v) / 2);
        break;
      case Ae:
        if (D.x <= 0 && (p <= T || m && (h <= L || M >= B))) {
          P = !1;
          break;
        }
        X(Ae), v -= D.x, p += D.x, v < 0 && (f = Te, v = -v, p -= v), m && (b = v / m, h += (i.height - b) / 2);
        break;
      case ze:
        if (D.y >= 0 && (M >= B || m && (p <= T || A >= z))) {
          P = !1;
          break;
        }
        X(ze), b += D.y, b < 0 && (f = Ce, b = -b, h -= b), m && (v = b * m, p += (i.width - v) / 2);
        break;
      case qe:
        if (m) {
          if (D.y <= 0 && (h <= L || A >= z)) {
            P = !1;
            break;
          }
          X(Ce), b -= D.y, h += D.y, v = b * m;
        } else
          X(Ce), X(Te), D.x >= 0 ? A < z ? v += D.x : D.y <= 0 && h <= L && (P = !1) : v += D.x, D.y <= 0 ? h > L && (b -= D.y, h += D.y) : (b -= D.y, h += D.y);
        v < 0 && b < 0 ? (f = Ze, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = Ge, v = -v, p -= v) : b < 0 && (f = Je, b = -b, h -= b);
        break;
      case Ge:
        if (m) {
          if (D.y <= 0 && (h <= L || p <= T)) {
            P = !1;
            break;
          }
          X(Ce), b -= D.y, h += D.y, v = b * m, p += i.width - v;
        } else
          X(Ce), X(Ae), D.x <= 0 ? p > T ? (v -= D.x, p += D.x) : D.y <= 0 && h <= L && (P = !1) : (v -= D.x, p += D.x), D.y <= 0 ? h > L && (b -= D.y, h += D.y) : (b -= D.y, h += D.y);
        v < 0 && b < 0 ? (f = Je, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = qe, v = -v, p -= v) : b < 0 && (f = Ze, b = -b, h -= b);
        break;
      case Ze:
        if (m) {
          if (D.x <= 0 && (p <= T || M >= B)) {
            P = !1;
            break;
          }
          X(Ae), v -= D.x, p += D.x, b = v / m;
        } else
          X(ze), X(Ae), D.x <= 0 ? p > T ? (v -= D.x, p += D.x) : D.y >= 0 && M >= B && (P = !1) : (v -= D.x, p += D.x), D.y >= 0 ? M < B && (b += D.y) : b += D.y;
        v < 0 && b < 0 ? (f = qe, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = Je, v = -v, p -= v) : b < 0 && (f = Ge, b = -b, h -= b);
        break;
      case Je:
        if (m) {
          if (D.x >= 0 && (A >= z || M >= B)) {
            P = !1;
            break;
          }
          X(Te), v += D.x, b = v / m;
        } else
          X(ze), X(Te), D.x >= 0 ? A < z ? v += D.x : D.y >= 0 && M >= B && (P = !1) : v += D.x, D.y >= 0 ? M < B && (b += D.y) : b += D.y;
        v < 0 && b < 0 ? (f = Ge, b = -b, v = -v, h -= b, p -= v) : v < 0 ? (f = Ze, v = -v, p -= v) : b < 0 && (f = qe, b = -b, h -= b);
        break;
      case Ar:
        this.move(D.x, D.y), P = !1;
        break;
      case Or:
        this.zoom(Us(l), e), P = !1;
        break;
      case Tr:
        if (!D.x || !D.y) {
          P = !1;
          break;
        }
        ne = Br(this.cropper), p = F.startX - ne.left, h = F.startY - ne.top, v = i.minWidth, b = i.minHeight, D.x > 0 ? f = D.y > 0 ? Je : qe : D.x < 0 && (p -= v, f = D.y > 0 ? Ze : Ge), D.y < 0 && (h -= b), this.cropped || (we(this.cropBox, he), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    P && (i.width = v, i.height = b, i.left = p, i.top = h, this.action = f, this.renderCropBox()), ie(l, function(q) {
      q.startX = q.endX, q.startY = q.endY;
    });
  }
}, nl = {
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
    return this.ready && this.disabled && (this.disabled = !1, we(this.cropper, fr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, ae(this.cropper, fr)), this;
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
    var a = this.options, i = this.canvasData, l = i.width, f = i.height, m = i.naturalWidth, p = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var h = m * e, v = p * e;
      if (Ue(this.element, Pt, {
        ratio: e,
        oldRatio: l / m,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, A = Br(this.cropper), M = b && Object.keys(b).length ? Ks(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (h - l) * ((M.pageX - A.left - i.left) / l), i.top -= (v - f) * ((M.pageY - A.top - i.top) / f);
      } else
        Be(t) && W(t.x) && W(t.y) ? (i.left -= (h - l) * ((t.x - i.left) / l), i.top -= (v - f) * ((t.y - i.top) / f)) : (i.left -= (h - l) / 2, i.top -= (v - f) / 2);
      i.width = h, i.height = v, this.renderCanvas(!0);
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
      var f = n.width / n.naturalWidth;
      if (ie(l, function(h, v) {
        l[v] = h / f;
      }), e) {
        var m = Math.round(l.y + l.height), p = Math.round(l.x + l.width);
        l.x = Math.round(l.x), l.y = Math.round(l.y), l.width = p - l.x, l.height = m - l.y;
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
      var f = n.width / n.naturalWidth;
      W(e.x) && (i.left = e.x * f + a.left), W(e.y) && (i.top = e.y * f + a.top), W(e.width) && (i.width = e.width * f), W(e.height) && (i.height = e.height * f), this.setCropBoxData(i);
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
    var t = this.canvasData, n = Ws(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var a = this.getData(), i = a.x, l = a.y, f = a.width, m = a.height, p = n.width / Math.floor(t.naturalWidth);
    p !== 1 && (i *= p, l *= p, f *= p, m *= p);
    var h = f / m, v = Ee({
      aspectRatio: h,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Ee({
      aspectRatio: h,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = Ee({
      aspectRatio: h,
      width: e.width || (p !== 1 ? n.width : f),
      height: e.height || (p !== 1 ? n.height : m)
    }), M = A.width, T = A.height;
    M = Math.min(v.width, Math.max(b.width, M)), T = Math.min(v.height, Math.max(b.height, T));
    var L = document.createElement("canvas"), z = L.getContext("2d");
    L.width = He(M), L.height = He(T), z.fillStyle = e.fillColor || "transparent", z.fillRect(0, 0, M, T);
    var B = e.imageSmoothingEnabled, P = B === void 0 ? !0 : B, ne = e.imageSmoothingQuality;
    z.imageSmoothingEnabled = P, ne && (z.imageSmoothingQuality = ne);
    var F = n.width, D = n.height, X = i, q = l, le, fe, N, U, I, Y;
    X <= -f || X > F ? (X = 0, le = 0, N = 0, I = 0) : X <= 0 ? (N = -X, X = 0, le = Math.min(F, f + X), I = le) : X <= F && (N = 0, le = Math.min(f, F - X), I = le), le <= 0 || q <= -m || q > D ? (q = 0, fe = 0, U = 0, Y = 0) : q <= 0 ? (U = -q, q = 0, fe = Math.min(D, m + q), Y = fe) : q <= D && (U = 0, fe = Math.min(m, D - q), Y = fe);
    var H = [X, q, le, fe];
    if (I > 0 && Y > 0) {
      var te = M / f;
      H.push(N * te, U * te, I * te, Y * te);
    }
    return z.drawImage.apply(z, [n].concat(Er(H.map(function(G) {
      return Math.floor(He(G));
    })))), L;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !xt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var i = e === Bt, l = t.movable && e === Pr;
      e = i || l ? e : Ir, t.dragMode = e, tt(n, et, e), Re(n, Mt, i), Re(n, $t, l), t.cropBoxMovable || (tt(a, et, e), Re(a, Mt, i), Re(a, $t, l));
    }
    return this;
  }
}, ol = _e.Cropper, Hr = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (bs(this, o), !e || !Os.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = Z({}, kr, Be(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return ys(o, [{
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
        if (Ts.test(t)) {
          As.test(t) ? this.read(qs(t)) : this.clone();
          return;
        }
        var l = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = l, l.onabort = f, l.onerror = f, l.ontimeout = f, l.onprogress = function() {
          l.getResponseHeader("content-type") !== _r && l.abort();
        }, l.onload = function() {
          n.read(l.response);
        }, l.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && Dr(t) && a.crossOrigin && (t = Cr(t)), l.open("GET", t, !0), l.responseType = "arraybuffer", l.withCredentials = a.crossOrigin === "use-credentials", l.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, a = this.imageData, i = Js(t), l = 0, f = 1, m = 1;
      if (i > 1) {
        this.url = Gs(t, _r);
        var p = Zs(i);
        l = p.rotate, f = p.scaleX, m = p.scaleY;
      }
      n.rotatable && (a.rotate = l), n.scalable && (a.scaleX = f, a.scaleY = m), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, a = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && Dr(n) && (a || (a = "anonymous"), i = Cr(n)), this.crossOrigin = a, this.crossOriginUrl = i;
      var l = document.createElement("img");
      a && (l.crossOrigin = a), l.src = i || n, l.alt = t.alt || "The image to crop", this.image = l, l.onload = this.start.bind(this), l.onerror = this.stop.bind(this), ae(l, mr), t.parentNode.insertBefore(l, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var a = _e.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(_e.navigator.userAgent), i = function(p, h) {
        Z(t.imageData, {
          naturalWidth: p,
          naturalHeight: h,
          aspectRatio: p / h
        }), t.initialImageData = Z({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !a) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var l = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = l, l.onload = function() {
        i(l.width, l.height), a || f.removeChild(l);
      }, l.src = n.src, a || (l.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(l));
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
        l.innerHTML = Ps;
        var f = l.querySelector(".".concat(J, "-container")), m = f.querySelector(".".concat(J, "-canvas")), p = f.querySelector(".".concat(J, "-drag-box")), h = f.querySelector(".".concat(J, "-crop-box")), v = h.querySelector(".".concat(J, "-face"));
        this.container = i, this.cropper = f, this.canvas = m, this.dragBox = p, this.cropBox = h, this.viewBox = f.querySelector(".".concat(J, "-view-box")), this.face = v, m.appendChild(a), ae(t, he), i.insertBefore(f, t.nextSibling), this.isImg || we(a, mr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, ae(h, he), n.guides || ae(h.getElementsByClassName("".concat(J, "-dashed")), he), n.center || ae(h.getElementsByClassName("".concat(J, "-center")), he), n.background && ae(f, "".concat(J, "-bg")), n.highlight || ae(v, Ds), n.cropBoxMovable && (ae(v, $t), tt(v, et, zt)), n.cropBoxResizable || (ae(h.getElementsByClassName("".concat(J, "-line")), he), ae(h.getElementsByClassName("".concat(J, "-point")), he)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), de(n.ready) && pe(t, yr, n.ready, {
          once: !0
        }), Ue(t, yr);
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
      return window.Cropper = ol, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      Z(kr, Be(t) && t);
    }
  }]), o;
}();
Z(Hr.prototype, Qs, el, tl, rl, il, nl);
const al = { class: "flex" }, sl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ll = { class: "ml-auto mb-2" }, cl = { class: "w-full flex justify-center" }, ul = ["src"], dl = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { t: n } = R("i18n"), a = V(null), i = V(null), l = V(!1), f = () => {
      l.value = !l.value, l.value ? i.value = new Hr(a.value, {
        crop(p) {
        }
      }) : i.value.destroy();
    }, m = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          ht(apiUrl.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: p },
            name: t.selection.item.basename,
            json: !1
          }).then((h) => {
            a.value.src = Dt(t.selection.adapter, t.selection.item.path), f(), e("load");
          }).catch((h) => console.log(h.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (p, h) => (x(), C(se, null, [
      d("div", al, [
        d("h3", sl, E(o.selection.item.basename), 1),
        d("div", ll, [
          l.value ? (x(), C("button", {
            key: 0,
            onClick: m,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(_(n)("Crop")), 1)) : oe("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: h[0] || (h[0] = (v) => f())
          }, E(l.value ? _(n)("Cancel") : _(n)("Edit")), 1)
        ])
      ]),
      d("div", cl, [
        d("img", {
          ref_key: "image",
          ref: a,
          class: "max-w-[60vh] max-h-[60vh]",
          src: _(Dt)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, ul)
      ])
    ], 64));
  }
}, hl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fl = /* @__PURE__ */ d("div", null, " Default view.. ", -1), ml = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return xe(() => {
      e("load");
    }), (t, n) => (x(), C(se, null, [
      d("h3", hl, E(o.selection.item.basename), 1),
      fl
    ], 64));
  }
}, pl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, gl = {
  class: "w-full",
  preload: "",
  controls: ""
}, vl = ["src"], bl = /* @__PURE__ */ Me(" Your browser does not support the video tag. "), yl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, l) => (x(), C(se, null, [
      d("h3", pl, E(o.selection.item.basename), 1),
      d("div", null, [
        d("video", gl, [
          d("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, vl),
          bl
        ])
      ])
    ], 64));
  }
}, wl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, xl = {
  class: "w-full",
  controls: ""
}, _l = ["src"], kl = /* @__PURE__ */ Me(" Your browser does not support the audio element. "), Sl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, l) => (x(), C(se, null, [
      d("h3", wl, E(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", xl, [
          d("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, _l),
          kl
        ])
      ])
    ], 64));
  }
}, Dl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cl = ["data"], Ml = ["src"], $l = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ie({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, l) => (x(), C(se, null, [
      d("h3", Dl, E(o.selection.item.basename), 1),
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
        `, 8, Ml)
        ], 8, Cl)
      ])
    ], 64));
  }
}, El = { class: "sm:flex sm:items-start" }, Tl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Al = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Ol = {
  key: 0,
  class: "flex leading-5"
}, Pl = /* @__PURE__ */ d("svg", {
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
], -1), Il = {
  name: "VFModalPreview"
}, Nl = /* @__PURE__ */ Object.assign(Il, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = Se(), n = R("emitter"), { t: a } = R("i18n"), i = V(!1), l = (p) => i.value = p, f = (p) => {
      var h;
      return ((h = e.selection.item.mime_type) != null ? h : "").startsWith(p);
    }, m = () => {
      const p = t.value + "?" + Ie({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", p);
    };
    return (p, h) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: h[6] || (h[6] = (v) => _(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Close")), 1),
        d("button", {
          type: "button",
          onClick: h[7] || (h[7] = (v) => m()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Download")), 1)
      ]),
      default: ee(() => [
        d("div", El, [
          d("div", Tl, [
            d("div", null, [
              f("text") ? (x(), ce(vs, {
                key: 0,
                selection: o.selection,
                onLoad: h[0] || (h[0] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("image") ? (x(), ce(dl, {
                key: 1,
                selection: o.selection,
                onLoad: h[1] || (h[1] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("video") ? (x(), ce(yl, {
                key: 2,
                selection: o.selection,
                onLoad: h[2] || (h[2] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("audio") ? (x(), ce(Sl, {
                key: 3,
                selection: o.selection,
                onLoad: h[3] || (h[3] = (v) => l(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (x(), ce($l, {
                key: 4,
                selection: o.selection,
                onLoad: h[4] || (h[4] = (v) => l(!0))
              }, null, 8, ["selection"])) : (x(), ce(ml, {
                key: 5,
                selection: o.selection,
                onLoad: h[5] || (h[5] = (v) => l(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", Al, [
              d("p", null, E(o.selection.item.path), 1),
              d("p", null, "mime_type: " + E(o.selection.item.mime_type), 1),
              i.value == !1 ? (x(), C("div", Ol, [
                Pl,
                d("span", null, E(_(a)("Loading")), 1)
              ])) : oe("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ll = { class: "sm:flex sm:items-start" }, jl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Vl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, zl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Bl = { class: "mt-2" }, Rl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Hl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ul = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Kl = [
  Ul
], Yl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Xl = [
  Wl
], Fl = { class: "ml-1.5" }, ql = ["onKeyup"], Gl = {
  name: "VFModalRename"
}, Jl = /* @__PURE__ */ Object.assign(Gl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(e.selection.items[0]), l = V(e.selection.items[0].basename), f = () => {
      l.value != "" && t.emit("vf-fetch", {
        q: "rename",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: i.value.path,
        name: l.value
      });
    };
    return (m, p) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", Ll, [
          jl,
          d("div", Vl, [
            d("h3", zl, E(_(a)("Rename")), 1),
            d("div", Bl, [
              d("p", Rl, [
                i.value.type == "dir" ? (x(), C("svg", Hl, Kl)) : (x(), C("svg", Yl, Xl)),
                d("span", Fl, E(i.value.basename), 1)
              ]),
              ge(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (h) => l.value = h),
                onKeyup: Ke(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, ql), [
                [Ye, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Zl = { class: "sm:flex sm:items-start" }, Ql = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ec = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, tc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, rc = { class: "mt-2" }, ic = { class: "text-gray-500 mb-1" }, nc = ["id"], oc = {
  key: 0,
  class: "py-2"
}, ac = ["disabled", "onClick"], sc = {
  name: "VFModalUpload"
}, lc = /* @__PURE__ */ Object.assign(sc, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { apiUrl: n } = Se(), { t: a } = R("i18n"), i = V(null), l = V(null), f = V(null), m = V([]), p = V(!0), h = () => {
      i.value.start();
    };
    return xe(() => {
      i.value = new wt.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: l.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Ie({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(v, b) {
            p.value = !1, wt.each(b, function(A) {
              m.value.push({
                id: A.id,
                name: A.name,
                size: wt.formatSize(A.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(v, b) {
            m.value[m.value.findIndex((A) => A.id == b.id)].percent = b.percent + "%";
          },
          UploadComplete: function() {
            p.value = !0, t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
          },
          Error: function(v, b) {
          }
        }
      }), i.value.init();
    }), (v, b) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          disabled: p.value,
          onClick: Oe(h, ["prevent"]),
          type: "button",
          class: ue([p.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, E(_(a)("Upload")), 11, ac),
        d("button", {
          type: "button",
          onClick: b[0] || (b[0] = (A) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", Zl, [
          Ql,
          d("div", ec, [
            d("h3", tc, E(_(a)("Upload files")), 1),
            d("div", rc, [
              d("div", ic, [
                (x(!0), C(se, null, ve(m.value, (A) => (x(), C("div", null, [
                  d("div", {
                    id: A.id
                  }, [
                    Me(E(A.name) + " ( " + E(A.size) + ") ", 1),
                    d("b", null, E(A.percent), 1)
                  ], 8, nc)
                ]))), 256)),
                m.value.length ? oe("", !0) : (x(), C("div", oc, E(_(a)("No files selected!")), 1))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: l
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: f,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, E(_(a)("Select Files")), 513)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cc = { class: "sm:flex sm:items-start" }, uc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), dc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, hc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fc = { class: "mt-2" }, mc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, pc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vc = [
  gc
], bc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), wc = [
  yc
], xc = { class: "ml-1.5" }, _c = ["onKeyup", "placeholder"], kc = {
  name: "VFModalArchive"
}, Sc = /* @__PURE__ */ Object.assign(kc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n"), i = V(""), l = V(e.selection.items), f = () => {
      l.value.length && t.emit("vf-fetch", {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(l.value.map(({ path: m, type: p }) => ({ path: m, type: p }))),
        name: i.value
      });
    };
    return (m, p) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", cc, [
          uc,
          d("div", dc, [
            d("h3", hc, E(_(a)("Archive the files")), 1),
            d("div", fc, [
              (x(!0), C(se, null, ve(l.value, (h) => (x(), C("p", mc, [
                h.type == "dir" ? (x(), C("svg", pc, vc)) : (x(), C("svg", bc, wc)),
                d("span", xc, E(h.basename), 1)
              ]))), 256)),
              ge(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (h) => i.value = h),
                onKeyup: Ke(f, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, _c), [
                [Ye, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Dc = { class: "sm:flex sm:items-start" }, Cc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Mc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $c = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ec = { class: "mt-2" }, Tc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ac = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Pc = [
  Oc
], Ic = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Lc = [
  Nc
], jc = { class: "ml-1.5" }, Vc = { class: "my-1 text-sm text-gray-500" }, zc = {
  name: "VFModalUnarchive"
}, Bc = /* @__PURE__ */ Object.assign(zc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { getStore: n } = R("storage"), { t: a } = R("i18n");
    V("");
    const i = V(e.selection.items[0]), l = V([]), f = () => {
      t.emit("vf-fetch", {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: i.value.path
      });
    };
    return (m, p) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: p[0] || (p[0] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(a)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", Dc, [
          Cc,
          d("div", Mc, [
            d("h3", $c, E(_(a)("Unarchive")), 1),
            d("div", Ec, [
              (x(!0), C(se, null, ve(l.value, (h) => (x(), C("p", Tc, [
                h.type == "dir" ? (x(), C("svg", Ac, Pc)) : (x(), C("svg", Ic, Lc)),
                d("span", jc, E(h.basename), 1)
              ]))), 256)),
              d("p", Vc, E(_(a)("The archive will be unarchived at")) + " (" + E(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rc = { class: "sm:flex sm:items-start" }, Hc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Uc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Kc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Yc = { class: "mt-2" }, Wc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Xc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), qc = [
  Fc
], Gc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Zc = [
  Jc
], Qc = { class: "ml-1.5" }, eu = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Bu dosyalar\u0131 ta\u015F\u0131mak istedi\u011Finizden emin misiniz?", -1), tu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ru = /* @__PURE__ */ d("svg", {
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
], -1), iu = { class: "ml-1.5 overflow-auto" }, nu = {
  name: "VFModalMove"
}, ou = /* @__PURE__ */ Object.assign(nu, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = R("emitter"), { t: n } = R("i18n"), { getStore: a } = R("storage"), i = V(e.selection.items.from), l = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "move",
        adapter: a("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: f, type: m }) => ({ path: f, type: m }))),
        item: e.selection.items.to.path
      });
    };
    return (f, m) => (x(), ce(ke, null, {
      buttons: ee(() => [
        d("button", {
          type: "button",
          onClick: l,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(n)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(_(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        d("div", Rc, [
          Hc,
          d("div", Uc, [
            d("h3", Kc, E(_(n)("Move files")), 1),
            d("div", Yc, [
              (x(!0), C(se, null, ve(i.value, (p) => (x(), C("p", Wc, [
                p.type == "dir" ? (x(), C("svg", Xc, qc)) : (x(), C("svg", Gc, Zc)),
                d("span", Qc, E(p.path), 1)
              ]))), 256)),
              eu,
              d("p", tu, [
                ru,
                d("span", iu, E(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), au = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: za,
  ModalMessage: Xa,
  ModalNewFolder: rs,
  ModalNewFile: ds,
  ModalPreview: Nl,
  ModalRename: Jl,
  ModalUpload: lc,
  ModalArchive: Sc,
  ModalUnarchive: Bc,
  ModalMove: ou
}, Symbol.toStringTag, { value: "Module" })), kt = {
  VueFinder: va,
  ...au
};
const cu = {
  install(o) {
    for (const e in kt)
      if (kt.hasOwnProperty(e)) {
        const t = kt[e];
        o.component(t.name, t);
      }
  }
};
export {
  cu as default
};
