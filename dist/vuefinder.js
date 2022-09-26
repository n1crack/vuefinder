import { ref as P, watch as gt, inject as B, openBlock as w, createElementBlock as M, createElementVNode as h, unref as k, normalizeClass as de, createTextVNode as le, toDisplayString as $, createCommentVNode as q, createVNode as we, TransitionGroup as Ai, withCtx as F, Fragment as ce, renderList as be, reactive as ft, onMounted as xe, onUpdated as Oi, withDirectives as ve, vShow as st, withModifiers as Pe, nextTick as vt, vModelSelect as cr, customRef as Pi, withKeys as Ye, isRef as Ii, vModelText as We, normalizeStyle as Mr, provide as lt, createBlock as G, resolveDynamicComponent as ji, renderSlot as Ct } from "vue";
import _t from "plupload";
const mt = (o, { method: e = "get", params: t = {}, json: a = !0 }) => {
  const n = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    n.headers = {};
    let i = new FormData();
    for (const [s, f] of Object.entries(t))
      i.append(s, f);
    n.body = i;
  }
  return fetch(o, n).then((i) => i.ok ? a ? i.json() : i.text() : i.json().then(Promise.reject.bind(Promise)));
};
function Ni(o) {
  return { all: o = o || /* @__PURE__ */ new Map(), on: function(e, t) {
    var a = o.get(e);
    a ? a.push(t) : o.set(e, [t]);
  }, off: function(e, t) {
    var a = o.get(e);
    a && (t ? a.splice(a.indexOf(t) >>> 0, 1) : o.set(e, []));
  }, emit: function(e, t) {
    var a = o.get(e);
    a && a.slice().map(function(n) {
      n(t);
    }), (a = o.get("*")) && a.slice().map(function(n) {
      n(e, t);
    });
  } };
}
function Mt(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = P(JSON.parse(e));
  gt(t, a);
  function a() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function n(f, g) {
    t.value = Object.assign({ ...t.value }, { [f]: g });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (f, g = null) => t.value === null || t.value === "" ? g : t.value.hasOwnProperty(f) ? t.value[f] : g, setStore: n, clearStore: i };
}
const ur = P("");
function Se() {
  function o(e) {
    ur.value = e;
  }
  return { apiUrl: ur, setApiUrl: o };
}
const Li = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Vi = {
  key: 0,
  class: "flex text-center"
}, zi = ["aria-label"], Bi = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Ri = [
  Bi
], Hi = ["aria-label"], Ui = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), Ki = [
  Ui
], Yi = ["aria-label"], Wi = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Xi = [
  Wi
], Fi = ["aria-label"], qi = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Gi = [
  qi
], Ji = ["aria-label"], Zi = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), Qi = [
  Zi
], ea = ["aria-label"], ta = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ra = [
  ta
], ia = ["aria-label"], aa = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), oa = [
  aa
], na = {
  key: 1,
  class: "flex text-center"
}, sa = { class: "pl-2" }, la = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, ca = { class: "flex text-center items-center justify-end" }, ua = ["aria-label"], da = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), ha = [
  da
], fa = ["aria-label"], ma = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, pa = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, ga = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, va = ["aria-label"], ba = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, ya = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, wa = {
  name: "VFToolbar"
}, xa = /* @__PURE__ */ Object.assign(wa, {
  props: {
    data: Object
  },
  setup(o) {
    const e = B("emitter"), { getStore: t, setStore: a } = B("storage"), { t: n } = B("i18n"), i = P(t("viewport", "grid")), s = P([]), f = P(t("full-screen", !1)), g = P("");
    e.on("vf-search-query", ({ newQuery: d }) => {
      g.value = d;
    });
    const m = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (d) => {
      s.value = d;
    }), e.on("vf-view-toggle", (d) => {
      a("viewport", d), i.value = d;
    }), (d, p) => (w(), M("div", Li, [
      g.value.length ? (w(), M("div", na, [
        h("div", sa, [
          le($(k(n)("Search results for")) + " ", 1),
          h("span", la, $(g.value), 1)
        ])
      ])) : (w(), M("div", Vi, [
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: p[0] || (p[0] = (b) => k(e).emit("vf-modal-show", { type: "new-folder", items: s.value }))
        }, Ri, 8, zi),
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[1] || (p[1] = (b) => k(e).emit("vf-modal-show", { type: "new-file", items: s.value }))
        }, Ki, 8, Hi),
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[2] || (p[2] = (b) => s.value.length != 1 || k(e).emit("vf-modal-show", { type: "rename", items: s.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Xi, 2))
        ], 8, Yi),
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[3] || (p[3] = (b) => !s.value.length || k(e).emit("vf-modal-show", { type: "delete", items: s.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Gi, 2))
        ], 8, Fi),
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[4] || (p[4] = (b) => k(e).emit("vf-modal-show", { type: "upload", items: s.value }))
        }, Qi, 8, Ji),
        s.value.length == 1 && s.value[0].mime_type == "application/zip" ? (w(), M("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": k(n)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[5] || (p[5] = (b) => !s.value.length || k(e).emit("vf-modal-show", { type: "unarchive", items: s.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ra, 2))
        ], 8, ea)) : (w(), M("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": k(n)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[6] || (p[6] = (b) => !s.value.length || k(e).emit("vf-modal-show", { type: "archive", items: s.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, oa, 2))
        ], 8, ia))
      ])),
      h("div", ca, [
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (w(), M("svg", {
            onClick: p[7] || (p[7] = (b) => k(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, ha))
        ], 8, ua),
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m
        }, [
          (w(), M("svg", ma, [
            f.value ? (w(), M("path", pa)) : (w(), M("path", ga))
          ]))
        ], 8, fa),
        h("div", {
          class: "mx-1.5",
          "aria-label": k(n)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: p[8] || (p[8] = (b) => g.value.length || k(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([g.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (w(), M("path", ba)) : q("", !0),
            i.value == "list" ? (w(), M("path", ya)) : q("", !0)
          ], 2))
        ], 8, va)
      ])
    ]));
  }
});
var _a = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $r = { exports: {} };
(function(o, e) {
  (function(t, a) {
    o.exports = a();
  })(_a, function() {
    function t(u, l) {
      if (!(u instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(u, l) {
      for (var r = 0; r < l.length; r++) {
        var v = l[r];
        v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(u, v.key, v);
      }
    }
    function n(u, l, r) {
      return l && a(u.prototype, l), r && a(u, r), u;
    }
    function i(u, l, r) {
      return l in u ? Object.defineProperty(u, l, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : u[l] = r, u;
    }
    function s(u, l) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var v = Object.getOwnPropertySymbols(u);
        l && (v = v.filter(function(c) {
          return Object.getOwnPropertyDescriptor(u, c).enumerable;
        })), r.push.apply(r, v);
      }
      return r;
    }
    function f(u) {
      for (var l = 1; l < arguments.length; l++) {
        var r = arguments[l] != null ? arguments[l] : {};
        l % 2 ? s(Object(r), !0).forEach(function(v) {
          i(u, v, r[v]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(v) {
          Object.defineProperty(u, v, Object.getOwnPropertyDescriptor(r, v));
        });
      }
      return u;
    }
    function g(u, l) {
      if (typeof l != "function" && l !== null)
        throw new TypeError("Super expression must either be null or a function");
      u.prototype = Object.create(l && l.prototype, {
        constructor: {
          value: u,
          writable: !0,
          configurable: !0
        }
      }), l && d(u, l);
    }
    function m(u) {
      return m = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, m(u);
    }
    function d(u, l) {
      return d = Object.setPrototypeOf || function(v, c) {
        return v.__proto__ = c, v;
      }, d(u, l);
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
    function b(u, l, r) {
      return p() ? b = Reflect.construct : b = function(c, y, x) {
        var S = [null];
        S.push.apply(S, y);
        var D = Function.bind.apply(c, S), O = new D();
        return x && d(O, x.prototype), O;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function _(u) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return _ = function(v) {
        if (v === null || !A(v))
          return v;
        if (typeof v != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof l < "u") {
          if (l.has(v))
            return l.get(v);
          l.set(v, c);
        }
        function c() {
          return b(v, arguments, m(this).constructor);
        }
        return c.prototype = Object.create(v.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), d(c, v);
      }, _(u);
    }
    function E(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function j(u, l) {
      return l && (typeof l == "object" || typeof l == "function") ? l : E(u);
    }
    function V(u) {
      var l = p();
      return function() {
        var v = m(u), c;
        if (l) {
          var y = m(this).constructor;
          c = Reflect.construct(v, arguments, y);
        } else
          c = v.apply(this, arguments);
        return j(this, c);
      };
    }
    function R(u, l) {
      for (; !Object.prototype.hasOwnProperty.call(u, l) && (u = m(u), u !== null); )
        ;
      return u;
    }
    function I(u, l, r) {
      return typeof Reflect < "u" && Reflect.get ? I = Reflect.get : I = function(c, y, x) {
        var S = R(c, y);
        if (!!S) {
          var D = Object.getOwnPropertyDescriptor(S, y);
          return D.get ? D.get.call(x) : D.value;
        }
      }, I(u, l, r || u);
    }
    function ne(u, l) {
      return X(u) || ue(u, l) || me(u, l) || N();
    }
    function J(u) {
      return C(u) || Z(u) || me(u) || H();
    }
    function C(u) {
      if (Array.isArray(u))
        return L(u);
    }
    function X(u) {
      if (Array.isArray(u))
        return u;
    }
    function Z(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function ue(u, l) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], v = !0, c = !1, y = void 0;
        try {
          for (var x = u[Symbol.iterator](), S; !(v = (S = x.next()).done) && (r.push(S.value), !(l && r.length === l)); v = !0)
            ;
        } catch (D) {
          c = !0, y = D;
        } finally {
          try {
            !v && x.return != null && x.return();
          } finally {
            if (c)
              throw y;
          }
        }
        return r;
      }
    }
    function me(u, l) {
      if (!!u) {
        if (typeof u == "string")
          return L(u, l);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return L(u, l);
      }
    }
    function L(u, l) {
      (l == null || l > u.length) && (l = u.length);
      for (var r = 0, v = new Array(l); r < l; r++)
        v[r] = u[r];
      return v;
    }
    function H() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function N() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Y = function(l, r, v) {
      var c = l.x, y = l.y, x = v.x, S = v.y, D = {
        "+": {
          x: c + x,
          y: y + S
        },
        "-": {
          x: c - x,
          y: y - S
        },
        "*": {
          x: c * x,
          y: y * S
        },
        "/": {
          x: c / x,
          y: y / S
        }
      };
      return D[r];
    }, U = function(l) {
      return {
        x: l.left,
        y: l.top
      };
    }, ie = function(l) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: l.x,
        top: l.y,
        right: l.x,
        bottom: l.y,
        width: r,
        height: r
      };
    }, Q = function(l) {
      return {
        x: l,
        y: l
      };
    }, Xe = function(u, l, r) {
      window.addEventListener("resize", l), window.addEventListener("scroll", l), u.forEach(function(v, c) {
        r.observe(v, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, Fe = function(u) {
      var l = Le(u);
      return l.x || l.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, it = function(u) {
      var l = document.createElement("div");
      return l.style.position = "fixed", l.style.overflow = "hidden", l.style.pointerEvents = "none", l.style.zIndex = "999999999999999999", l.classList.add(u), l;
    }, at = function(u) {
      var l = document.createElement("div");
      return l.style.position = "absolute", u || (l.style.background = "rgba(0, 0, 255, 0.1)", l.style.border = "1px solid rgba(0, 0, 255, 0.45)", l.style.display = "none", l.style.pointerEvents = "none"), l;
    }, ot = function(u, l) {
      var r;
      return function() {
        for (var v = arguments.length, c = new Array(v), y = 0; y < v; y++)
          c[y] = arguments[y];
        var x = function() {
          r = null, u.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(x, l);
      };
    }, Ne = function() {
      var u, l, r, v;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((l = document.documentElement) === null || l === void 0 ? void 0 : l.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((v = document.documentElement) === null || v === void 0 ? void 0 : v.scrollLeft) || 0
      };
    }, yt = function(u, l) {
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
        width: (u.clientWidth || r.width) * l,
        height: (u.clientHeight || r.height) * l
      };
    }, Le = function(u) {
      return !u || u instanceof Document ? Ne() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : Ne().x,
        y: u.scrollTop >= 0 ? u.scrollTop : Ne().y
      };
    }, Ut = function(u) {
      var l = u.elementRect, r = u.containerRect, v = u.tolerance, c = v === void 0 ? {
        x: 0,
        y: 0
      } : v, y = [];
      return l.top - c.y < r.top && y.push("top"), l.left - c.x < r.left && y.push("left"), l.bottom + c.y > r.bottom && y.push("bottom"), l.right + c.y > r.right && y.push("right"), y;
    }, Kr = function(u) {
      var l = u.event;
      return {
        x: l.clientX,
        y: l.clientY
      };
    }, Yr = function(u) {
      var l = u.scrollAmount, r = u.initialPointerPos, v = u.pointerPos, c = {};
      return v.x > r.x - l.x ? (c.left = r.x - l.x, c.width = v.x - r.x + l.x) : (c.left = v.x, c.width = r.x - v.x - l.x), v.y > r.y - l.y ? (c.top = r.y - l.y, c.height = v.y - r.y + l.y) : (c.top = v.y, c.height = r.y - v.y - l.y), c;
    }, Kt = function(l) {
      var r = {
        x: 0,
        y: 0
      }, v = window.getComputedStyle(l);
      if (!v.transform || v.transform === "none")
        return r;
      if (v.transform.indexOf("3d") >= 0) {
        var c = v.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var y, x = (y = c[1]) === null || y === void 0 ? void 0 : y.split(",");
          r.x = parseInt(x[12]) || 0, r.y = parseInt(x[13]) || 0;
        }
        return r;
      } else {
        var S = v.transform.trim().match(/matrix\((.*?)\)/);
        if (S && S.length) {
          var D, O = (D = S[1]) === null || D === void 0 ? void 0 : D.split(",");
          r.x = parseInt(O[4]) || 0, r.y = parseInt(O[5]) || 0;
        }
        return r;
      }
    }, Wr = function(l) {
      var r = l.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Kt(l);
      var v = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var y, x = (y = c[0]) === null || y === void 0 ? void 0 : y.split("(");
        if (x) {
          var S, D = (S = x[1]) === null || S === void 0 ? void 0 : S.split(",");
          v.x = parseInt(D[0]) || 0, v.y = parseInt(D[1]) || 0;
        }
      }
      return !v.x && !v.x ? Kt(l) : v;
    }, Xr = function(l) {
      var r = l.style, v = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!v.x && !v.x) {
        var c = window.getComputedStyle(l);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return v;
    }, Fr = function(u, l) {
      return l ? Wr(u) : Xr(u);
    }, qr = function(u) {
      var l = u.element, r = u.edges, v = u.elementRect, c = u.containerRect, y = u.elementPos, x = u.useTransform;
      r.includes("top") && qe(l, {
        y: y.y + c.top - v.top,
        x: y.x
      }, x), r.includes("left") && qe(l, {
        y: y.y,
        x: y.x + c.left - v.left
      }, x), r.includes("bottom") && qe(l, {
        y: y.y + c.bottom - v.bottom,
        x: y.x
      }, x), r.includes("right") && qe(l, {
        y: y.y,
        x: y.x + c.right - v.right
      }, x);
    }, Yt = function(u) {
      var l = u.computedStyle, r = u.node, v = l.position, c = v === "absolute" || v === "relative" || v === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, Gr = function(u) {
      var l = u.shiftKey, r = u.keyboardDragSpeed, v = u.zoom, c = u.key, y = u.dragKeys, x = u.scrollDiff, S = u.canScroll, D = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, T = l ? r * 4 * v : r * v;
      return y.left.includes(c) && (O.x = x.x || -T, !l && !x.x && S && D(["left"], r)), y.right.includes(c) && (O.x = x.x || T, !l && !x.x && S && D(["right"], r)), y.up.includes(c) && (O.y = x.y || -T, !l && !x.y && S && D(["top"], r)), y.down.includes(c) && (O.y = x.y || T, !l && !x.y && S && D(["bottom"], r)), O;
    }, Jr = function(u) {
      var l = u.element, r = u.force, v = u.multiSelectionToggle, c = u.SelectedSet, y = u.hoverClassName;
      l.classList.contains(y) && !r || (c.has(l) ? v && c.delete(l) : c.add(l), l.classList.add(y));
    }, Zr = function(u) {
      var l = u.element, r = u.force, v = u.SelectedSet, c = u.PrevSelectedSet, y = u.hoverClassName;
      if (!l.classList.contains(y) && !r)
        return !1;
      var x = v.has(l), S = c.has(l);
      x && !S ? v.delete(l) : !x && S && v.add(l), l.classList.remove(y);
    }, wt = function(u, l) {
      return u.left < l.right && u.right > l.left && u.top < l.bottom && u.bottom > l.top;
    }, Wt = function(u) {
      var l = u.element, r = u.posDirection, v = u.containerRect, c = u.useTransform, y = Fr(l, c), x = Y(y, "+", r);
      qe(l, x, c);
      var S = l.getBoundingClientRect(), D = Ut({
        elementRect: S,
        containerRect: v
      });
      qr({
        element: l,
        edges: D,
        elementRect: S,
        containerRect: v,
        elementPos: x,
        useTransform: c
      });
    }, Qr = function(u, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), u.disconnect();
    }, ei = function(u, l, r) {
      if (!!l.length) {
        var v = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? v || document.body : u, y = l.includes("top") && c.scrollTop > 0, x = l.includes("bottom") && c.scrollTop < c.scrollHeight, S = l.includes("left") && c.scrollLeft > 0, D = l.includes("right") && c.scrollLeft < c.scrollWidth;
        y && (c.scrollTop -= 1 * r), x && (c.scrollTop += 1 * r), S && (c.scrollLeft -= 1 * r), D && (c.scrollLeft += 1 * r);
      }
    }, qe = function(u, l, r) {
      if (r) {
        var v = u.style.transform;
        u.style.transform = "translate3d(".concat(l.x, "px,").concat(l.y, "px,1px) ").concat(v.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(l.x, "px"), u.style.top = "".concat(l.y, "px");
      return u;
    }, ti = function(u) {
      for (var l = u.subscribe, r = u.publish, v = u.Interaction, c = u.SelectedSet, y = {
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
          condition: function(T) {
            return T.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, x = function() {
        var T = ne(D[S], 2), z = T[0], K = T[1];
        ["pre", !1].forEach(function(re) {
          return l(re ? "".concat(z, ":").concat(re) : z, function(pe) {
            return K.forEach(function(ae) {
              return (!ae.condition || ae.condition(pe)) && r(re ? "".concat(re).concat(ae.name) : ae.name, f({
                items: c.elements,
                isDragging: v.isDragging
              }, pe));
            });
          });
        });
      }, S = 0, D = Object.entries(y); S < D.length; S++)
        x();
    }, Ve = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : J(u) : [];
    }, Xt = function(u, l) {
      u.style.left = "".concat(l.left, "px"), u.style.top = "".concat(l.top, "px"), u.style.width = "".concat(l.width, "px"), u.style.height = "".concat(l.height, "px");
    }, ri = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.area, c = l.PS, y = l.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(x) {
          r._node = x, Yt({
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
          Xe(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), i(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), i(this, "stop", function() {
          Qr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(x, S) {
          var D = {
            scroll_directions: x,
            scroll_multiplier: S
          };
          r.PubSub.publish("Area:scroll:pre", D), ei(r._node, x, S), r.PubSub.publish("Area:scroll", D);
        }), this._zoom = y, this.PubSub = c, this.setArea(v), this._modificationCallback = ot(function(x) {
          r.PubSub.publish("Area:modified:pre", {
            event: x,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: x,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return n(u, [{
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
          return this._rect ? this._rect : this._rect = yt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function v(c) {
            var y, x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, S = (y = c[x]) === null || y === void 0 ? void 0 : y.parentNode;
            return S ? (c.push(S), x++, v(c, x)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), ii = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.dragKeys, y = l.draggability, x = l.keyboardDrag, S = l.keyboardDragSpeed, D = l.useTransform, O = l.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(T) {
          var z = T.event, K = T.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var re = {
              event: z,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], re), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var pe = Gr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: K,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(ae) {
              return Wt({
                element: ae,
                posDirection: pe,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], re);
          }
        }), i(this, "keyboardEnd", function(T) {
          var z = T.event, K = T.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var re = {
              event: z,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], re);
          }
        }), i(this, "start", function(T) {
          var z = T.isDragging, K = T.isDraggingKeyboard;
          !z || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(T) {
          T != null && T.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(T) {
          var z = T.isDragging, K = T.isDraggingKeyboard;
          if (!(!z || !r._elements.length || K || r.DS.continue)) {
            var re = Y(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(pe) {
              return Wt({
                element: pe,
                posDirection: re,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function(T) {
          r._elements.forEach(function(z) {
            return z.style.zIndex = "".concat((parseInt(z.style.zIndex) || 0) + T ? 9999 : -9998);
          });
        }), this.DS = v, this._useTransform = D, this._keyboardDragSpeed = S, this._keyboardDrag = x, this._zoom = O, this._draggability = y, this._dragKeys = {
          up: c.up.map(function(T) {
            return T.toLowerCase();
          }),
          down: c.down.map(function(T) {
            return T.toLowerCase();
          }),
          left: c.left.map(function(T) {
            return T.toLowerCase();
          }),
          right: c.right.map(function(T) {
            return T.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(J(this._dragKeys.up), J(this._dragKeys.down), J(this._dragKeys.left), J(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return n(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, v = this._prevCursorPos ? Y(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, v;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, v = this._prevScrollPos ? Y(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, v;
        }
      }]), u;
    }(), ai = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.areaElement, y = l.draggability, x = l.immediateDrag, S = l.selectableClass;
        t(this, u), i(this, "_areaElement", void 0), i(this, "_draggability", void 0), i(this, "_immediateDrag", void 0), i(this, "_selectableClass", void 0), i(this, "isInteracting", void 0), i(this, "isDragging", void 0), i(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), i(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), i(this, "start", function(D) {
          return r.DS.publish("Interaction:start:pre", {
            event: D,
            isDragging: r.isDragging
          });
        }), i(this, "_start", function(D) {
          D.type === "touchstart" && D.preventDefault(), r._canInteract(D) && (r.isInteracting = !0, r.isDragging = r.isDragEvent(D), r.DS.publish("Interaction:start", {
            event: D,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), i(this, "isDragEvent", function(D) {
          var O = D.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(D) || !O ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(O) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            O
          )) : r.DS.SelectedSet.add(
            O
          )), !!r.DS.SelectedSet.has(O));
        }), i(this, "onClick", function(D) {
          var O = D.event;
          if (!!r._canInteract(O) && !(O.detail > 0)) {
            var T = r.DS, z = T.stores, K = z.PointerStore, re = z.KeyStore, pe = T.SelectableSet, ae = T.SelectedSet;
            K.start(O);
            var ze = O.target;
            !pe.has(ze) || (re.isMultiSelectKeyPressed(O) || ae.clear(), ae.toggle(ze), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(D) {
          var O = D.event, T = D.scroll_directions, z = D.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: O,
            scroll_directions: T,
            scroll_multiplier: z,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(D) {
          return r.DS.publish("Interaction:end:pre", {
            event: D,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(D) {
          var O = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: D,
            isDragging: O
          });
        }), this._areaElement = c, this._draggability = y, this._immediateDrag = x, this._selectableClass = S, this.DS = v, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(D) {
          var O = D.event;
          return r.start(O);
        }), this.DS.subscribe("Interaction:start:pre", function(D) {
          var O = D.event;
          return r._start(O);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(D) {
          var O = D.event;
          return r._reset(O);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return n(u, [{
        key: "_canInteract",
        value: function(r) {
          var v = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !v && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), oi = function u(l) {
      var r = this, v = l.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(c, y) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(y), r.subscribers[c].length - 1;
      }), i(this, "unsubscribe", function(c, y, x) {
        x >= 0 ? r.subscribers[c].splice(x, 1) : y && (r.subscribers[c] = r.subscribers[c].filter(function(S) {
          return S !== y;
        }));
      }), i(this, "publish", function(c, y) {
        Array.isArray(c) ? c.forEach(function(x) {
          return r._publish(x, y);
        }) : r._publish(c, y);
      }), i(this, "_publish", function(c, y) {
        var x = r.subscribers[c];
        !Array.isArray(x) || (c.includes(":pre") ? r._handlePrePublish(x, y) : r._handlePublish(x, y));
      }), i(this, "_handlePublish", function(c, y) {
        for (var x = 0, S = c.length; x < S; x++) {
          if (r.DS.stopped)
            return;
          c[x](y);
        }
      }), i(this, "_handlePrePublish", function(c, y) {
        for (var x = c.length; x--; ) {
          if (r.DS.stopped)
            return;
          c[x](y);
        }
      }), this.DS = v;
    }, ni = /* @__PURE__ */ function(u) {
      g(r, u);
      var l = V(r);
      function r(v) {
        var c, y = v.elements, x = v.className, S = v.hoverClassName, D = v.draggability, O = v.useTransform, T = v.DS;
        return t(this, r), c = l.call(this), i(E(c), "_initElements", void 0), i(E(c), "_className", void 0), i(E(c), "_hoverClassName", void 0), i(E(c), "_useTransform", void 0), i(E(c), "_draggability", void 0), i(E(c), "init", function() {
          return c._initElements.forEach(function(z) {
            return c.add(z);
          });
        }), i(E(c), "clear", function() {
          return c.forEach(function(z) {
            return c.delete(z);
          });
        }), i(E(c), "_onClick", function(z) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: z
          });
        }), i(E(c), "_onPointer", function(z) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: z
          });
        }), i(E(c), "addAll", function(z) {
          return z.forEach(function(K) {
            return c.add(K);
          });
        }), i(E(c), "deleteAll", function(z) {
          return z.forEach(function(K) {
            return c.delete(K);
          });
        }), c.DS = T, c._initElements = Ve(y), c._className = x, c._hoverClassName = S, c._useTransform = O, c._draggability = D, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Yt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), I(m(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), I(m(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ _(Set)), si = /* @__PURE__ */ function(u) {
      g(r, u);
      var l = V(r);
      function r(v) {
        var c, y = v.className, x = v.DS;
        return t(this, r), c = l.call(this), i(E(c), "_className", void 0), i(E(c), "clear", function() {
          return c.forEach(function(S) {
            return c.delete(S);
          });
        }), i(E(c), "addAll", function(S) {
          return S.forEach(function(D) {
            return c.add(D);
          });
        }), i(E(c), "deleteAll", function(S) {
          return S.forEach(function(D) {
            return c.delete(D);
          });
        }), c.DS = x, c._className = y, c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          if (!I(m(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", y), I(m(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", y), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!I(m(r.prototype), "has", this).call(this, c)) {
            var y = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", y);
            var x = I(m(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", y), x;
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
    }(/* @__PURE__ */ _(Set)), li = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.hoverClassName, y = l.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(x) {
          var S = x.event, D = x.isDragging;
          D || (r._storePrevious(S), r._handleInsideSelection(!0, S));
        }), i(this, "update", function(x) {
          var S = x.isDragging;
          S || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(x, S) {
          for (var D = r.DS, O = D.SelectableSet, T = D.SelectorArea, z = D.Selector, K = O.elements.map(function(Me) {
            return [Me, Me.getBoundingClientRect()];
          }), re = [], pe = [], ae = 0, ze = K.length; ae < ze; ae++)
            !T.isInside(K[ae][0], K[ae][1]) || (wt(K[ae][1], z.rect) ? re.push(K[ae][0]) : pe.push(K[ae][0]));
          var nt = r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) && r._multiSelectToggling;
          r.DS.continue || (re.forEach(function(Me) {
            return Jr({
              element: Me,
              force: x,
              multiSelectionToggle: nt,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), pe.forEach(function(Me) {
            return Zr({
              element: Me,
              force: x,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = y, this.DS = v, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return n(u, [{
        key: "_storePrevious",
        value: function(r) {
          var v = this.DS, c = v.stores.KeyStore, y = v.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.selector, y = l.selectorClass, x = l.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(S) {
          var D = S.isDragging;
          if (!D) {
            var O = r.DS.stores.PointerStore, T = O.initialValArea;
            Xt(r.HTMLNode, ie(T, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(S) {
          var D = S.isDragging;
          if (!(D || r.DS.continue)) {
            var O = r.DS.stores, T = O.ScrollStore, z = O.PointerStore, K = Yr({
              scrollAmount: T.scrollAmount,
              initialPointerPos: z.initialValArea,
              pointerPos: z.currentValArea
            });
            Xt(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = v, this.HTMLNode = c || at(x), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return n(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.selectorAreaClass, y = l.autoScrollSpeed, x = l.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", D = document.body ? "body" : "documentElement", O = "".concat(S, "Child");
          r.HTMLNode[O](r.DS.Selector.HTMLNode), document[D][O](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var S = r.DS.Area.rect, D = r.DS.Area.computedBorder, O = r.HTMLNode.style, T = "".concat(S.top + D.top, "px"), z = "".concat(S.left + D.left, "px"), K = "".concat(S.width, "px"), re = "".concat(S.height, "px");
          O.top !== T && (O.top = T), O.left !== z && (O.left = z), O.width !== K && (O.width = K), O.height !== re && (O.height = re);
        }), i(this, "stop", function(S) {
          r.stopAutoScroll(), S && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var S = r.DS, D = S.stores.PointerStore, O = S.Area;
            r.currentEdges = Ut({
              elementRect: ie(D.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && O.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(S, D) {
          return r.DS.Area.HTMLNode.contains(S) && r.DS.stores.ScrollStore.canScroll ? !0 : wt(r.rect, D || S.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = x, this.DS = v, this.HTMLNode = it(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return n(u, [{
        key: "isClicked",
        value: function(r) {
          var v = this.DS.stores.PointerStore, c = r ? v.getPointerPosition(r) : v.initialVal;
          return wt({
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
    }(), di = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.multiSelectKeys, y = l.multiSelectMode;
        t(this, u), i(this, "_multiSelectMode", void 0), i(this, "_multiSelectKeys", void 0), i(this, "_currentValues", /* @__PURE__ */ new Set()), i(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), i(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), i(this, "keydown", function(x) {
          var S = x.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: x,
            key: S
          }), r._currentValues.add(S), r.DS.publish("KeyStore:down", {
            event: x,
            key: S
          });
        }), i(this, "keyup", function(x) {
          var S = x.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: x,
            key: S
          }), r._currentValues.delete(S), r.DS.publish("KeyStore:up", {
            event: x,
            key: S
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = v, this._multiSelectMode = y, this._multiSelectKeys = c.map(function(x) {
          var S = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, D = S[x];
          return D ? (console.warn("[DragSelect] ".concat(x, ' is deprecated. Use "').concat(D, '" instead. Act Now!. See docs for more info')), D.toLowerCase()) : x.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return n(u, [{
        key: "isMultiSelectKeyPressed",
        value: function(r) {
          var v = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(c) {
            return v._multiSelectKeys.includes(c);
          }) || r && this._multiSelectKeys.some(function(c) {
            return r[v._keyMapping[c]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), u;
    }(), hi = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(c) {
          return Kr({
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
        }), this.DS = v, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var y = c.event;
          return r.start(y);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var y = c.event;
          return r.reset(y);
        });
      }
      return n(u, [{
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
          this._initialVal = r, this._initialValArea = r && Y(r, "-", Y(U(this.DS.Area.rect), "+", U(this.DS.Area.computedBorder)));
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
          this._currentVal = r, this._currentValArea = r && Y(r, "-", Y(U(this.DS.Area.rect), "+", U(this.DS.Area.computedBorder)));
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
          this._lastVal = r, this._lastValArea = r && Y(r, "-", Y(U(this.DS.Area.rect), "+", U(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), fi = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.areaElement, y = l.zoom;
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
        }), this._areaElement = c, this.DS = v, this.zoom = y, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return n(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Fe(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = Y(this.currentVal, "-", this.initialVal), v = Q(this.zoom), c = Y(Y(r, "*", v), "-", r);
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
    }(), mi = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.area, c = v === void 0 ? document : v, y = l.selectables, x = y === void 0 ? [] : y, S = l.autoScrollSpeed, D = S === void 0 ? 5 : S, O = l.overflowTolerance, T = O === void 0 ? {
          x: 25,
          y: 25
        } : O, z = l.zoom, K = z === void 0 ? 1 : z, re = l.customStyles, pe = re === void 0 ? !1 : re, ae = l.multiSelectMode, ze = ae === void 0 ? !1 : ae, nt = l.multiSelectToggling, Me = nt === void 0 ? !0 : nt, Ft = l.multiSelectKeys, pi = Ft === void 0 ? ["Control", "Shift", "Meta"] : Ft, qt = l.selector, gi = qt === void 0 ? void 0 : qt, Gt = l.draggability, xt = Gt === void 0 ? !0 : Gt, Jt = l.immediateDrag, vi = Jt === void 0 ? !0 : Jt, Zt = l.keyboardDrag, bi = Zt === void 0 ? !0 : Zt, yi = l.dragKeys, Qt = l.keyboardDragSpeed, wi = Qt === void 0 ? 10 : Qt, er = l.useTransform, tr = er === void 0 ? !0 : er, rr = l.hoverClass, ir = rr === void 0 ? "ds-hover" : rr, ar = l.selectableClass, or = ar === void 0 ? "ds-selectable" : ar, nr = l.selectedClass, xi = nr === void 0 ? "ds-selected" : nr, sr = l.selectorClass, _i = sr === void 0 ? "ds-selector" : sr, lr = l.selectorAreaClass, ki = lr === void 0 ? "ds-selector-area" : lr, Si = l.callback, Di = l.onDragMove, Ci = l.onDragStartBegin, Mi = l.onDragStart, $i = l.onElementSelect, Ei = l.onElementUnselect;
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
        }), i(this, "isMultiSelect", function(Ti) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ti);
        }), i(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new oi({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Si,
          onDragMove: Di,
          onDragStart: Mi,
          onDragStartBegin: Ci,
          onElementSelect: $i,
          onElementUnselect: Ei
        }), this.stores = {
          PointerStore: new hi({
            DS: this
          }),
          ScrollStore: new fi({
            DS: this,
            areaElement: c,
            zoom: K
          }),
          KeyStore: new di({
            DS: this,
            multiSelectKeys: pi,
            multiSelectMode: ze
          })
        }, this.Area = new ri({
          area: c,
          PS: this.PubSub,
          zoom: K
        }), this.Selector = new ci({
          DS: this,
          selector: gi,
          selectorClass: _i,
          customStyles: pe
        }), this.SelectorArea = new ui({
          DS: this,
          selectorAreaClass: ki,
          autoScrollSpeed: D,
          overflowTolerance: T
        }), this.SelectableSet = new ni({
          elements: x,
          DS: this,
          className: or,
          hoverClassName: ir,
          useTransform: tr,
          draggability: xt
        }), this.SelectedSet = new si({
          DS: this,
          className: xi
        }), this.Selection = new li({
          DS: this,
          hoverClassName: ir,
          multiSelectToggling: Me
        }), this.Drag = new ii({
          DS: this,
          draggability: xt,
          useTransform: tr,
          keyboardDrag: bi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, yi),
          zoom: K,
          keyboardDragSpeed: wi
        }), this.Interaction = new ai({
          areaElement: c,
          DS: this,
          draggability: xt,
          immediateDrag: vi,
          selectableClass: or
        }), ti({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return n(u, [{
        key: "_callbacksTemp",
        value: function(r) {
          var v = r.callback, c = r.onDragMove, y = r.onDragStart, x = r.onDragStartBegin, S = r.onElementSelect, D = r.onElementUnselect, O = function(z, K) {
            return console.warn("[DragSelect] ".concat(z, ' is deprecated. Use DragSelect.subscribe("').concat(K, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          v && (O("callback", "callback"), this.subscribe("callback", function(T) {
            var z = T.items;
            T.item;
            var K = T.event;
            return v(z, K);
          })), c && (O("onDragMove", "dragmove"), this.subscribe("dragmove", function(T) {
            T.items, T.item;
            var z = T.event;
            return c(z);
          })), y && (O("onDragStart", "dragstart"), this.subscribe("dragstart", function(T) {
            T.items, T.item;
            var z = T.event;
            return y(z);
          })), x && (O("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(T) {
            T.items, T.item;
            var z = T.event;
            return x(z);
          })), S && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function(T) {
            T.items;
            var z = T.item, K = T.event;
            return S(z, K);
          })), D && (O("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(T) {
            T.items;
            var z = T.item, K = T.event;
            return D(z, K);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          c && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), v && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Ve(r)), c || this.addSelectables(r), v && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ve(r)), c && this.removeSelectables(r), v && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var v = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ve(r).forEach(function(x) {
            return v.SelectedSet.has(x) ? v.removeSelection(r, c, y) : v.addSelection(r, c, y);
          }), c && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, v, c), this.getSelection();
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
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = Ve(r);
          return this.SelectableSet.addAll(c), v && this.SelectedSet.addAll(c), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, v), this.addSelectables(r, c);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Ve(r)), v && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var c = v ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), y = r ? v ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : v ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return Y(c, "-", y);
        }
      }]), u;
    }();
    return mi;
  });
})($r);
const ka = $r.exports, Sa = (o, e, t, a, n) => (e = Math, t = e.log, a = 1024, n = t(o) / t(a) | 0, o / e.pow(a, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B"), Da = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), Ca = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Ma = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), $a = [
  Ma
], Ea = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Ta = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Aa = [
  Ta
], Oa = {
  name: "VFSortIcon"
}, ct = /* @__PURE__ */ Object.assign(Oa, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (w(), M("div", null, [
      o.direction == "down" ? (w(), M("svg", Ca, $a)) : q("", !0),
      o.direction == "up" ? (w(), M("svg", Ea, Aa)) : q("", !0)
    ]));
  }
}), Pa = ["onClick"], Ia = {
  name: "VFToast.vue"
}, ja = /* @__PURE__ */ Object.assign(Ia, {
  setup(o) {
    const e = B("emitter"), { getStore: t } = B("storage"), a = P(t("full-screen", !1)), n = (g) => g == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = P([]), s = (g) => {
      i.value.splice(g, 1);
    }, f = (g) => {
      let m = i.value.findIndex((d) => d.id === g);
      m !== -1 && s(m);
    };
    return e.on("vf-toast-clear", () => {
      i.value = [];
    }), e.on("vf-toast-push", (g) => {
      let m = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      g.id = m, i.value.push(g), setTimeout(() => {
        f(m);
      }, 5e3);
    }), (g, m) => (w(), M("div", {
      class: de([a.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      we(Ai, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: F(() => [
          (w(!0), M(ce, null, be(i.value, (d, p) => (w(), M("div", {
            onClick: (b) => s(p),
            key: d,
            class: de([n(d.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, $(d.label), 11, Pa))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), je = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: Na } = Se(), $t = (o, e) => Na.value + "?" + je({ q: "preview", adapter: o, path: e }), La = { class: "relative flex-auto flex flex-col overflow-hidden" }, Va = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, za = { class: "absolute" }, Ba = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Ra = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Ha = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Ua = { class: "grid grid-cols-12 items-center" }, Ka = { class: "flex col-span-7 items-center" }, Ya = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wa = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xa = [
  Wa
], Fa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qa = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ga = [
  qa
], Ja = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Za = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Qa = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], eo = { class: "grid grid-cols-12 items-center" }, to = { class: "flex col-span-7 items-center" }, ro = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, io = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ao = [
  io
], oo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, no = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), so = [
  no
], lo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, co = { class: "col-span-2 text-center" }, uo = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, ho = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], fo = { class: "relative" }, mo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, po = /* @__PURE__ */ h("path", {
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
}, yo = /* @__PURE__ */ h("path", {
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
    const e = o, t = B("emitter"), { setStore: a, getStore: n } = B("storage"), i = (L) => L == null ? void 0 : L.substring(0, 3), s = (L) => L.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = P(null), g = P(null), m = P(0), d = P(null), { t: p } = B("i18n"), b = Math.floor(Math.random() * 2 ** 32), A = P(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      A.value = !A.value, a("full-screen", A.value);
    });
    const _ = P("");
    t.on("vf-search-query", ({ newQuery: L }) => {
      _.value = L, L ? t.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: L
        },
        onSuccess: (H) => {
          H.files.length || t.emit("vf-toast-push", { label: p("No search result found.") });
        }
      }) : t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let E = null;
    const j = () => {
      E && clearTimeout(E);
    }, V = (L) => {
      E = setTimeout(() => {
        R(L);
      }, 500);
    }, R = (L) => {
      L.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: L.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: L });
    }, I = ft({ active: !1, column: "", order: "" }), ne = (L = !0) => {
      let H = [...e.data.files], N = I.column, Y = I.order == "asc" ? 1 : -1;
      if (!L)
        return H;
      const U = (ie, Q) => typeof ie == "string" && typeof Q == "string" ? ie.toLowerCase().localeCompare(Q.toLowerCase()) : ie < Q ? -1 : ie > Q ? 1 : 0;
      return I.active && (H = H.slice().sort((ie, Q) => U(ie[N], Q[N]) * Y)), H;
    }, J = (L) => {
      I.active && I.column == L ? (I.active = I.order == "asc", I.column = L, I.order = "desc") : (I.active = !0, I.column = L, I.order = "asc");
    }, C = () => d.value.getSelection().map((L) => JSON.parse(L.dataset.item)), X = (L, H) => {
      if (L.altKey || L.ctrlKey || L.metaKey)
        return L.preventDefault(), !1;
      L.dataTransfer.setDragImage(g.value, 0, 15), L.dataTransfer.effectAllowed = "all", L.dataTransfer.dropEffect = "copy", L.dataTransfer.setData("items", JSON.stringify(C()));
    }, Z = (L, H) => {
      L.preventDefault();
      let N = JSON.parse(L.dataTransfer.getData("items"));
      if (N.find((Y) => Y.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: N, to: H } });
    }, ue = (L, H) => {
      L.preventDefault(), !H || H.type !== "dir" || d.value.getSelection().find((N) => N == L.currentTarget) ? (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none") : L.dataTransfer.dropEffect = "copy";
    };
    return xe(() => {
      d.value = new ka({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => vt(() => {
        d.value.clearSelection(), d.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), d.value.subscribe("predragstart", ({ event: L, isDragging: H }) => {
        if (H)
          m.value = d.value.getSelection().length, d.value.break();
        else {
          const N = L.target.offsetWidth - L.offsetX, Y = L.target.offsetHeight - L.offsetY;
          N < 15 && Y < 15 && (d.value.clearSelection(), d.value.break());
        }
      }), d.value.subscribe("predragmove", ({ isDragging: L }) => {
        L && d.value.break();
      }), d.value.subscribe("callback", ({ items: L, event: H, isDragging: N }) => {
        t.emit("vf-nodes-selected", C()), m.value = d.value.getSelection().length;
      });
    }), Oi(() => {
      d.value.setSelection(d.value.getSelection());
    }), xe(() => {
      gt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (L, H) => (w(), M("div", La, [
      o.view == "list" || _.value.length ? (w(), M("div", Va, [
        h("div", {
          onClick: H[0] || (H[0] = (N) => J("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          le($(k(p)("Name")) + " ", 1),
          ve(we(ct, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "basename"]
          ])
        ]),
        _.value.length ? q("", !0) : (w(), M("div", {
          key: 0,
          onClick: H[1] || (H[1] = (N) => J("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          le($(k(p)("Size")) + " ", 1),
          ve(we(ct, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "file_size"]
          ])
        ])),
        _.value.length ? q("", !0) : (w(), M("div", {
          key: 1,
          onClick: H[2] || (H[2] = (N) => J("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          le($(k(p)("Date")) + " ", 1),
          ve(we(ct, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "last_modified"]
          ])
        ])),
        _.value.length ? (w(), M("div", {
          key: 2,
          onClick: H[3] || (H[3] = (N) => J("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          le($(k(p)("Filepath")) + " ", 1),
          ve(we(ct, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      h("div", za, [
        h("div", {
          ref_key: "dragImage",
          ref: g,
          class: "absolute -z-50 -top-96"
        }, [
          Ba,
          h("div", Ra, $(m.value), 1)
        ], 512)
      ]),
      h("div", {
        class: de([A.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f,
        onContextmenu: H[7] || (H[7] = Pe((N) => k(t).emit("vf-contextmenu-show", { event: N, area: f.value, items: C() }), ["self", "prevent"]))
      }, [
        _.value.length ? (w(!0), M(ce, { key: 0 }, be(ne(), (N, Y) => (w(), M("div", {
          onDblclick: (U) => R(N),
          onTouchstart: (U) => V(N),
          onTouchend: H[4] || (H[4] = (U) => j()),
          onContextmenu: Pe((U) => k(t).emit("vf-contextmenu-show", { event: U, area: f.value, items: C(), target: N }), ["prevent"]),
          class: de(["vf-item-" + k(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          h("div", Ua, [
            h("div", Ka, [
              N.type == "dir" ? (w(), M("svg", Ya, Xa)) : (w(), M("svg", Fa, Ga)),
              h("span", Ja, $(N.basename), 1)
            ]),
            h("div", Za, $(N.path), 1)
          ])
        ], 42, Ha))), 256)) : q("", !0),
        o.view == "list" && !_.value.length ? (w(!0), M(ce, { key: 1 }, be(ne(), (N, Y) => (w(), M("div", {
          draggable: "true",
          onDblclick: (U) => R(N),
          onTouchstart: (U) => V(N),
          onTouchend: H[5] || (H[5] = (U) => j()),
          onContextmenu: Pe((U) => k(t).emit("vf-contextmenu-show", { event: U, area: f.value, items: C(), target: N }), ["prevent"]),
          onDragstart: (U) => X(U),
          onDragover: (U) => ue(U, N),
          onDrop: (U) => Z(U, N),
          class: de(["vf-item-" + k(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          h("div", eo, [
            h("div", to, [
              N.type == "dir" ? (w(), M("svg", ro, ao)) : (w(), M("svg", oo, so)),
              h("span", lo, $(N.basename), 1)
            ]),
            h("div", co, $(N.file_size ? k(Sa)(N.file_size) : ""), 1),
            h("div", uo, $(k(Da)(N.last_modified)), 1)
          ])
        ], 42, Qa))), 256)) : q("", !0),
        o.view == "grid" && !_.value.length ? (w(!0), M(ce, { key: 2 }, be(ne(!1), (N, Y) => {
          var U, ie;
          return w(), M("div", {
            draggable: "true",
            onDblclick: (Q) => R(N),
            onTouchstart: (Q) => V(N),
            onTouchend: H[6] || (H[6] = (Q) => j()),
            onContextmenu: Pe((Q) => k(t).emit("vf-contextmenu-show", { event: Q, area: f.value, items: C(), target: N }), ["prevent"]),
            onDragstart: (Q) => X(Q),
            onDragover: (Q) => ue(Q, N),
            onDrop: (Q) => Z(Q, N),
            class: de(["vf-item-" + k(b), "border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"]),
            "data-type": N.type,
            "data-item": JSON.stringify(N),
            "data-index": Y
          }, [
            h("div", null, [
              h("div", fo, [
                N.type == "dir" ? (w(), M("svg", mo, go)) : ((U = N.mime_type) != null ? U : "").startsWith("image") ? (w(), M("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: k($t)(k(n)("adapter", e.data.adapter), N.path),
                  alt: ""
                }, null, 8, vo)) : (w(), M("svg", bo, wo)),
                ((ie = N.mime_type) != null ? ie : "").startsWith("image") ? q("", !0) : (w(), M("div", xo, $(i(N.extension)), 1))
              ]),
              h("span", _o, $(s(N.basename)), 1)
            ])
          ], 42, ho);
        }), 256)) : q("", !0)
      ], 34),
      we(ja)
    ]));
  }
}), Do = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Co = { class: "flex leading-5 items-center" }, Mo = ["aria-label"], $o = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), Eo = [
  $o
], To = ["value"], Ao = { class: "ml-3" }, Oo = { key: 0 }, Po = { class: "ml-1" }, Io = { class: "flex leading-5 items-center" }, jo = {
  value: "",
  disabled: ""
}, No = /* @__PURE__ */ h("option", { value: "tr" }, "Turkish", -1), Lo = /* @__PURE__ */ h("option", { value: "en" }, "English", -1), Vo = /* @__PURE__ */ h("option", { value: "fr" }, "French", -1), zo = ["aria-label"], Bo = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ h("path", {
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
    const e = o, t = B("emitter"), { getStore: a, setStore: n } = B("storage"), i = P(0), s = P((b = a("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: g } = B("i18n"), m = P(a("locale", "")), d = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: s.value } }), n("adapter", s.value);
    };
    t.on("vf-nodes-selected", (A) => {
      i.value = A.length;
    });
    const p = P("");
    return t.on("vf-search-query", ({ newQuery: A }) => {
      p.value = A;
    }), (A, _) => (w(), M("div", Do, [
      h("div", Co, [
        h("div", {
          class: "mx-2",
          "aria-label": k(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Eo, 8, Mo),
        ve(h("select", {
          "onUpdate:modelValue": _[0] || (_[0] = (E) => s.value = E),
          onChange: d,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (w(!0), M(ce, null, be(o.data.storages, (E) => (w(), M("option", { value: E }, $(E), 9, To))), 256))
        ], 544), [
          [cr, s.value]
        ]),
        h("div", Ao, [
          p.value.length ? (w(), M("span", Oo, $(o.data.files.length) + " items found. ", 1)) : q("", !0),
          h("span", Po, $(i.value > 0 ? i.value + " " + k(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      h("div", Io, [
        ve(h("select", {
          "onUpdate:modelValue": _[1] || (_[1] = (E) => m.value = E),
          onChange: _[2] || (_[2] = (E) => k(g)(E.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          h("option", jo, $(k(f)("Language")), 1),
          No,
          Lo,
          Vo
        ], 544), [
          [cr, m.value]
        ]),
        h("span", {
          "aria-label": k(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: _[3] || (_[3] = (E) => k(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: k(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Ro, 8, zo)
      ])
    ]));
  }
}), Ko = (o, e = 0, t = !1) => {
  let a;
  return (...n) => {
    t && !a && o(...n), clearTimeout(a), a = setTimeout(() => {
      o(...n);
    }, e);
  };
}, Yo = (o, e, t) => {
  const a = P(o);
  return Pi((i, s) => ({
    get() {
      return i(), a.value;
    },
    set: Ko(
      (f) => {
        a.value = f, s();
      },
      e,
      t
    )
  }));
}, Wo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Xo = ["aria-label"], Fo = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), qo = [
  Fo
], Go = ["onClick"], Jo = /* @__PURE__ */ h("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Zo = [
  Jo
], Qo = { class: "flex leading-5" }, en = /* @__PURE__ */ h("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), tn = ["title", "onClick"], rn = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, an = /* @__PURE__ */ h("svg", {
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  })
], -1), on = ["onKeydown", "placeholder"], nn = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), sn = [
  nn
], ln = {
  name: "VFBreadcrumb"
}, cn = /* @__PURE__ */ Object.assign(ln, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: a } = B("storage"), n = P(null), i = P([]), s = P(!1), f = P(null), { t: g } = B("i18n");
    t.on("vf-explorer-update", () => {
      var R;
      let j = [], V = [];
      n.value = (R = e.data.dirname) != null ? R : a("adapter", "local") + "://", n.value.length == 0 && (i.value = []), n.value.replace(a("adapter", "local") + "://", "").split("/").forEach(function(I) {
        j.push(I), j.join("/") != "" && V.push({
          basename: I,
          name: I,
          path: a("adapter", "local") + "://" + j.join("/"),
          type: "dir"
        });
      }), V.length > 4 && (V = V.slice(-5), V[0].name = ".."), i.value = V;
    });
    const m = () => {
      s.value = !1, p.value = "";
    };
    t.on("vf-search-exit", () => {
      m();
    });
    const d = () => {
      s.value = !0, vt(() => f.value.focus());
    }, p = Yo("", 400);
    gt(p, (j) => {
      t.emit("vf-toast-clear"), t.emit("vf-search-query", { newQuery: j });
    });
    const b = () => i.value.length && !s.value, A = (j) => {
      var R;
      j.preventDefault();
      let V = JSON.parse(j.dataTransfer.getData("items"));
      if (V.find((I) => I.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: V, to: (R = i.value[i.value.length - 2]) != null ? R : { path: a("adapter", "local") + "://" } }
      });
    }, _ = (j) => {
      j.preventDefault(), b() ? j.dataTransfer.dropEffect = "copy" : (j.dataTransfer.dropEffect = "none", j.dataTransfer.effectAllowed = "none");
    }, E = () => {
      p.value == "" && m();
    };
    return (j, V) => (w(), M("div", Wo, [
      h("span", {
        "aria-label": k(g)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (w(), M("svg", {
          onDragover: V[0] || (V[0] = (R) => _(R)),
          onDrop: V[1] || (V[1] = (R) => A(R)),
          onClick: V[2] || (V[2] = (R) => {
            var I, ne;
            return !b() || k(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: (ne = (I = i.value[i.value.length - 2]) == null ? void 0 : I.path) != null ? ne : k(a)("adapter", "local") + "://" } });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, qo, 34))
      ], 8, Xo),
      s.value ? (w(), M("div", rn, [
        an,
        ve(h("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ye(m, ["esc"]),
          onBlur: E,
          "onUpdate:modelValue": V[4] || (V[4] = (R) => Ii(p) ? p.value = R : null),
          placeholder: k(g)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, on), [
          [We, k(p)]
        ]),
        (w(), M("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: m,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, sn))
      ])) : (w(), M("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Pe(d, ["self"])
      }, [
        (w(), M("svg", {
          onClick: V[3] || (V[3] = (R) => k(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Zo)),
        h("div", Qo, [
          (w(!0), M(ce, null, be(i.value, (R, I) => (w(), M("div", { key: I }, [
            en,
            h("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: R.basename,
              onClick: (ne) => k(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: R.path } })
            }, $(R.name), 9, tn)
          ]))), 128))
        ])
      ], 8, Go))
    ]));
  }
}), un = ["onClick"], dn = /* @__PURE__ */ h("span", { class: "px-1" }, null, -1), hn = {
  name: "VFContextMenu"
}, fn = /* @__PURE__ */ Object.assign(hn, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), a = P(null), { apiUrl: n } = Se(), i = ft({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), s = P([]);
    t.on("vf-context-selected", (b) => {
      s.value = b;
    });
    const { t: f } = B("i18n"), g = {
      newfolder: {
        title: () => f("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => f("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: s });
        }
      },
      refresh: {
        title: () => f("Refresh"),
        action: () => {
          t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
        }
      },
      preview: {
        title: () => f("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: s.value[0] });
        }
      },
      open: {
        title: () => f("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: s.value[0].path } });
        }
      },
      openDir: {
        title: () => f("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: s.value[0].dir } });
        }
      },
      download: {
        title: () => f("Download"),
        action: () => {
          const b = n.value + "?" + je({ q: "download", adapter: s.value[0].adapter, path: s.value[0].path });
          t.emit("vf-download", b);
        }
      },
      archive: {
        title: () => f("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: s });
        }
      },
      unarchive: {
        title: () => f("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: s });
        }
      },
      rename: {
        title: () => f("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: s });
        }
      }
    }, m = (b) => {
      t.emit("vf-contextmenu-hide"), b.action();
    }, d = P("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      d.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: A, items: _, target: E = null }) => {
      if (i.items = [], d.value)
        if (E)
          i.items.push(g.openDir), t.emit("vf-context-selected", [E]), console.log("search item selected");
        else
          return;
      else
        !E && !d.value ? (i.items.push(g.refresh), i.items.push(g.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : _.length > 1 && _.some((j) => j.path === E.path) ? (i.items.push(g.refresh), i.items.push(g.archive), i.items.push(g.delete), t.emit("vf-context-selected", _), console.log(_.length + " selected (more than 1 item.)")) : (E.type == "dir" ? i.items.push(g.open) : (i.items.push(g.preview), i.items.push(g.download)), i.items.push(g.rename), E.mime_type == "application/zip" ? i.items.push(g.unarchive) : i.items.push(g.archive), i.items.push(g.delete), t.emit("vf-context-selected", [E]), console.log(E.type + " is selected"));
      p(b, A);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (b, A) => {
      i.active = !0, vt(() => {
        let _ = A.getBoundingClientRect(), E = b.pageX, j = b.pageY, V = a.value.offsetHeight, R = a.value.offsetWidth;
        E = _.right - b.pageX + window.scrollX < R ? E - R : E, j = _.bottom - b.pageY + window.scrollY < V ? j - V : j, i.positions = {
          left: E + "px",
          top: j + "px"
        };
      });
    };
    return (b, A) => i.active ? (w(), M("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: a,
      style: Mr(i.positions)
    }, [
      (w(!0), M(ce, null, be(i.items, (_) => (w(), M("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: _.title,
        onClick: (E) => m(_)
      }, [
        dn,
        h("span", null, $(_.title()), 1)
      ], 8, un))), 128))
    ], 4)) : q("", !0);
  }
}), mn = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((a, n) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function pn(o) {
  const e = await mn(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.c102e439.js"), "../locales/tr.json": () => import("./tr.78c5046b.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function gn(o, e) {
  const { getStore: t, setStore: a } = Mt(o), n = ["en", "tr"], i = P({}), s = (m) => {
    n.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), pn(m).then((d) => {
      i.value = d, a("locale", m), a("translations", d), console.log(m + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : s(e);
  const f = (m, ...d) => d.length ? f(m = m.replace("%s", d.shift()), ...d) : m;
  function g(m, ...d) {
    return i.value.hasOwnProperty(m) ? f(i.value[m], ...d) : m;
  }
  return { t: g, support_locales: n, changeLocale: s };
}
const vn = /* @__PURE__ */ h("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), bn = {
  name: "VueFinder"
}, yn = /* @__PURE__ */ Object.assign(bn, {
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
    },
    ajaxData: {
      type: Object,
      default: {}
    }
  },
  setup(o) {
    const e = o, t = Ni(), { setStore: a, getStore: n } = Mt(e.id);
    lt("emitter", t), lt("storage", Mt(e.id)), lt("ajaxData", e.ajaxData);
    const i = gn(e.id, e.locale);
    lt("i18n", i);
    const { apiUrl: s, setApiUrl: f } = Se();
    f(e.url);
    const g = ft({ adapter: "local", storages: [], dirname: ".", files: [] }), m = P(n("viewport", "grid")), d = P(n("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      d.value = !d.value, a("darkMode", d.value);
    });
    const p = P(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      p.value = !p.value, a("full-screen", p.value);
    }), t.on("vf-view-toggle", (_) => {
      m.value = _;
    });
    const b = ft({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      b.active = !1;
    }), t.on("vf-modal-show", (_) => {
      b.active = !0, b.type = _.type, b.data = _;
    });
    const A = (_) => {
      Object.assign(g, _), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", ({ params: _, onSuccess: E = null, onError: j = null }) => {
      mt(s.value, { params: _ }).then((V) => {
        t.emit("vf-modal-close"), A(V), E(V);
      }).catch((V) => {
        j && j(V);
      });
    }), t.on("vf-download", (_) => {
      document.getElementById("download_frame").src = _, t.emit("vf-modal-close");
    }), xe(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: n("adapter", g.adapter) } });
    }), (_, E) => (w(), M("div", {
      class: de(d.value ? "dark" : "")
    }, [
      h("div", {
        class: de([p.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Mr(p.value ? "" : "max-height: " + o.maxHeight),
        onMousedown: E[0] || (E[0] = (j) => k(t).emit("vf-contextmenu-hide"))
      }, [
        we(xa, { data: g }, null, 8, ["data"]),
        we(cn, { data: g }, null, 8, ["data"]),
        we(So, {
          view: m.value,
          data: g
        }, null, 8, ["view", "data"]),
        we(Uo, { data: g }, null, 8, ["data"])
      ], 38),
      b.active ? (w(), G(ji("v-f-modal-" + b.type), {
        key: 0,
        selection: b.data,
        current: g
      }, null, 8, ["selection", "current"])) : q("", !0),
      we(fn, { current: g }, null, 8, ["current"]),
      vn
    ], 2));
  }
}), wn = /* @__PURE__ */ h("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), xn = { class: "fixed z-10 inset-0 overflow-y-auto" }, _n = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, kn = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Sn = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, De = {
  __name: "ModalLayout",
  setup(o) {
    const e = B("emitter");
    return xe(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, a) => (w(), M("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: a[1] || (a[1] = Ye((n) => k(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      wn,
      h("div", xn, [
        h("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: a[0] || (a[0] = Pe((n) => k(e).emit("vf-modal-close"), ["self"]))
        }, [
          h("div", _n, [
            h("div", kn, [
              Ct(t.$slots, "default")
            ]),
            h("div", Sn, [
              Ct(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Dn = ["aria-label"], Cn = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Mn = [
  Cn
], $n = {
  name: "Message"
}, Ce = /* @__PURE__ */ Object.assign($n, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  setup(o) {
    var s;
    const { t: e } = B("i18n"), t = P(!1), a = P(null), n = P((s = a.value) == null ? void 0 : s.strMessage);
    gt(n, () => t.value = !1);
    const i = () => t.value = !0;
    return (f, g) => (w(), M("div", null, [
      t.value ? q("", !0) : (w(), M("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: de(["flex mt-1 p-1 px-2 rounded text-sm", o.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Ct(f.$slots, "default"),
        h("div", {
          class: "ml-auto cursor-pointer",
          onClick: i,
          "aria-label": k(e)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Mn, 8, Dn)
      ], 2))
    ]));
  }
}), En = { class: "sm:flex sm:items-start" }, Tn = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), An = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, On = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Pn = { class: "mt-2" }, In = { class: "text-sm text-gray-500" }, jn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Nn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ln = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Vn = [
  Ln
], zn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bn = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Rn = [
  Bn
], Hn = { class: "ml-1.5" }, Un = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Kn = {
  name: "VFModalDelete"
}, Yn = /* @__PURE__ */ Object.assign(Kn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: a } = B("storage"), { t: n } = B("i18n"), i = P(e.selection.items), s = P(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(i.value.map(({ path: g, type: m }) => ({ path: g, type: m })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (g) => {
          s.value = n(g.message);
        }
      });
    };
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Yes, Delete!")), 1),
        h("button", {
          type: "button",
          onClick: m[0] || (m[0] = (d) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Cancel")), 1),
        h("div", Un, $(k(n)("This action cannot be undone.")), 1)
      ]),
      default: F(() => [
        h("div", En, [
          Tn,
          h("div", An, [
            h("h3", On, $(k(n)("Delete files")), 1),
            h("div", Pn, [
              h("p", In, $(k(n)("Are you sure you want to delete these files ?")), 1),
              (w(!0), M(ce, null, be(i.value, (d) => (w(), M("p", jn, [
                d.type == "dir" ? (w(), M("svg", Nn, Vn)) : (w(), M("svg", zn, Rn)),
                h("span", Hn, $(d.basename), 1)
              ]))), 256)),
              s.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wn = { class: "sm:flex sm:items-start" }, Xn = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), Fn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, qn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Gn = { class: "mt-2" }, Jn = { class: "text-sm text-gray-500" }, Zn = {
  name: "VFModalMessage"
}, Qn = /* @__PURE__ */ Object.assign(Zn, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = B("emitter"), { t } = B("i18n");
    return (a, n) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: n[0] || (n[0] = (i) => k(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(t)("Close")), 1)
      ]),
      default: F(() => {
        var i, s, f, g;
        return [
          h("div", Wn, [
            Xn,
            h("div", Fn, [
              h("h3", qn, $((s = (i = o.selection) == null ? void 0 : i.title) != null ? s : "Title"), 1),
              h("div", Gn, [
                h("p", Jn, $((g = (f = o.selection) == null ? void 0 : f.message) != null ? g : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), es = { class: "sm:flex sm:items-start" }, ts = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), rs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, is = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, as = { class: "mt-2" }, os = { class: "text-sm text-gray-500" }, ns = ["onKeyup", "placeholder"], ss = {
  name: "VFModalNewFolder"
}, ls = /* @__PURE__ */ Object.assign(ss, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: a } = B("storage"), { t: n } = B("i18n"), i = P(""), s = P(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", i.value) });
        },
        onError: (g) => {
          s.value = n(g.message);
        }
      });
    };
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Create")), 1),
        h("button", {
          type: "button",
          onClick: m[1] || (m[1] = (d) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", es, [
          ts,
          h("div", rs, [
            h("h3", is, $(k(n)("New Folder")), 1),
            h("div", as, [
              h("p", os, $(k(n)("Create a new folder")), 1),
              ve(h("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => i.value = d),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: k(n)("Folder Name"),
                type: "text"
              }, null, 40, ns), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cs = { class: "sm:flex sm:items-start" }, us = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), ds = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, hs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fs = { class: "mt-2" }, ms = { class: "text-sm text-gray-500" }, ps = ["onKeyup", "placeholder"], gs = {
  name: "VFModalNewFile"
}, vs = /* @__PURE__ */ Object.assign(gs, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: a } = B("storage"), { t: n } = B("i18n"), i = P(""), s = P(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", i.value) });
        },
        onError: (g) => {
          s.value = n(g.message);
        }
      });
    };
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        h("button", {
          type: "button",
          onClick: m[1] || (m[1] = (d) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: F(() => [
        h("div", cs, [
          us,
          h("div", ds, [
            h("h3", hs, $(k(n)("New File")), 1),
            h("div", fs, [
              h("p", ms, $(k(n)("Create a new file")), 1),
              ve(h("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => i.value = d),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: k(n)("File Name"),
                type: "text"
              }, null, 40, ps), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), bs = { class: "flex" }, ys = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ws = { class: "ml-auto mb-2" }, xs = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, _s = { key: 1 }, ks = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, a = P(""), n = P(""), i = P(null), s = P(!1), { apiUrl: f } = Se(), g = P(""), m = P(!1), { t: d } = B("i18n");
    xe(() => {
      mt(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((_) => {
        a.value = _, e("load");
      });
    });
    const p = () => {
      s.value = !s.value, n.value = a.value, s.value == !0 && vt(() => {
        i.value.focus();
      });
    }, b = B("ajaxData"), A = () => {
      g.value = "", m.value = !1, console.log(b), mt(f.value, {
        method: "POST",
        params: Object.assign(b, {
          q: "save",
          adapter: t.selection.adapter,
          path: t.selection.item.path,
          content: n.value
        }),
        json: !1
      }).then((_) => {
        g.value = d("Updated."), a.value = _, e("load"), s.value = !s.value;
      }).catch((_) => {
        g.value = d(_.message), m.value = !0;
      });
    };
    return (_, E) => (w(), M(ce, null, [
      h("div", bs, [
        h("div", ys, $(o.selection.item.basename), 1),
        h("div", ws, [
          s.value ? (w(), M("button", {
            key: 0,
            onClick: A,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(k(d)("Save")), 1)) : q("", !0),
          h("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: E[0] || (E[0] = (j) => p())
          }, $(s.value ? k(d)("Cancel") : k(d)("Edit")), 1)
        ])
      ]),
      h("div", null, [
        s.value ? (w(), M("div", _s, [
          ve(h("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": E[1] || (E[1] = (j) => n.value = j),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [We, n.value]
          ])
        ])) : (w(), M("pre", xs, $(a.value), 1)),
        g.value.length ? (w(), G(Ce, {
          key: 2,
          error: m.value
        }, {
          default: F(() => [
            le($(g.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : q("", !0)
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
    var a = Object.getOwnPropertySymbols(o);
    e && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(o, n).enumerable;
    })), t.push.apply(t, a);
  }
  return t;
}
function Er(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? dr(Object(t), !0).forEach(function(a) {
      Cs(o, a, t[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : dr(Object(t)).forEach(function(a) {
      Object.defineProperty(o, a, Object.getOwnPropertyDescriptor(t, a));
    });
  }
  return o;
}
function ht(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ht = function(e) {
    return typeof e;
  } : ht = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ht(o);
}
function Ss(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function hr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var a = e[t];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(o, a.key, a);
  }
}
function Ds(o, e, t) {
  return e && hr(o.prototype, e), t && hr(o, t), o;
}
function Cs(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Tr(o) {
  return Ms(o) || $s(o) || Es(o) || Ts();
}
function Ms(o) {
  if (Array.isArray(o))
    return Et(o);
}
function $s(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function Es(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return Et(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Et(o, e);
  }
}
function Et(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, a = new Array(e); t < e; t++)
    a[t] = o[t];
  return a;
}
function Ts() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var bt = typeof window < "u" && typeof window.document < "u", ke = bt ? window : {}, Vt = bt && ke.document.documentElement ? "ontouchstart" in ke.document.documentElement : !1, zt = bt ? "PointerEvent" in ke : !1, ee = "cropper", Bt = "all", Ar = "crop", Or = "move", Pr = "zoom", Ae = "e", Oe = "w", Be = "s", $e = "n", Ge = "ne", Je = "nw", Ze = "se", Qe = "sw", Tt = "".concat(ee, "-crop"), fr = "".concat(ee, "-disabled"), fe = "".concat(ee, "-hidden"), mr = "".concat(ee, "-hide"), As = "".concat(ee, "-invisible"), pt = "".concat(ee, "-modal"), At = "".concat(ee, "-move"), tt = "".concat(ee, "Action"), ut = "".concat(ee, "Preview"), Rt = "crop", Ir = "move", jr = "none", Ot = "crop", Pt = "cropend", It = "cropmove", jt = "cropstart", pr = "dblclick", Os = Vt ? "touchstart" : "mousedown", Ps = Vt ? "touchmove" : "mousemove", Is = Vt ? "touchend touchcancel" : "mouseup", gr = zt ? "pointerdown" : Os, vr = zt ? "pointermove" : Ps, br = zt ? "pointerup pointercancel" : Is, yr = "ready", wr = "resize", xr = "wheel", Nt = "zoom", _r = "image/jpeg", js = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Ns = /^data:/, Ls = /^data:image\/jpeg;base64,/, Vs = /^img|canvas$/i, Nr = 200, Lr = 100, kr = {
  viewMode: 0,
  dragMode: Rt,
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
}, zs = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', Bs = Number.isNaN || ke.isNaN;
function W(o) {
  return typeof o == "number" && !Bs(o);
}
var Sr = function(e) {
  return e > 0 && e < 1 / 0;
};
function kt(o) {
  return typeof o > "u";
}
function Ie(o) {
  return ht(o) === "object" && o !== null;
}
var Rs = Object.prototype.hasOwnProperty;
function Re(o) {
  if (!Ie(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && Rs.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function he(o) {
  return typeof o == "function";
}
var Hs = Array.prototype.slice;
function Vr(o) {
  return Array.from ? Array.from(o) : Hs.call(o);
}
function oe(o, e) {
  return o && he(e) && (Array.isArray(o) || W(o.length) ? Vr(o).forEach(function(t, a) {
    e.call(o, t, a, o);
  }) : Ie(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var te = Object.assign || function(e) {
  for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    a[n - 1] = arguments[n];
  return Ie(e) && a.length > 0 && a.forEach(function(i) {
    Ie(i) && Object.keys(i).forEach(function(s) {
      e[s] = i[s];
    });
  }), e;
}, Us = /\.\d*(?:0|9){12}\d*$/;
function Ue(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Us.test(o) ? Math.round(o * e) / e : o;
}
var Ks = /^width|height|left|top|marginLeft|marginTop$/;
function Ee(o, e) {
  var t = o.style;
  oe(e, function(a, n) {
    Ks.test(n) && W(a) && (a = "".concat(a, "px")), t[n] = a;
  });
}
function Ys(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function se(o, e) {
  if (!!e) {
    if (W(o.length)) {
      oe(o, function(a) {
        se(a, e);
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
function _e(o, e) {
  if (!!e) {
    if (W(o.length)) {
      oe(o, function(t) {
        _e(t, e);
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
function He(o, e, t) {
  if (!!e) {
    if (W(o.length)) {
      oe(o, function(a) {
        He(a, e, t);
      });
      return;
    }
    t ? se(o, e) : _e(o, e);
  }
}
var Ws = /([a-z\d])([A-Z])/g;
function Ht(o) {
  return o.replace(Ws, "$1-$2").toLowerCase();
}
function Lt(o, e) {
  return Ie(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Ht(e)));
}
function rt(o, e, t) {
  Ie(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Ht(e)), t);
}
function Xs(o, e) {
  if (Ie(o[e]))
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
    o.removeAttribute("data-".concat(Ht(e)));
}
var zr = /\s\s*/, Br = function() {
  var o = !1;
  if (bt) {
    var e = !1, t = function() {
    }, a = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    ke.addEventListener("test", t, a), ke.removeEventListener("test", t, a);
  }
  return o;
}();
function ye(o, e, t) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(zr).forEach(function(i) {
    if (!Br) {
      var s = o.listeners;
      s && s[i] && s[i][t] && (n = s[i][t], delete s[i][t], Object.keys(s[i]).length === 0 && delete s[i], Object.keys(s).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, n, a);
  });
}
function ge(o, e, t) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(zr).forEach(function(i) {
    if (a.once && !Br) {
      var s = o.listeners, f = s === void 0 ? {} : s;
      n = function() {
        delete f[i][t], o.removeEventListener(i, n, a);
        for (var m = arguments.length, d = new Array(m), p = 0; p < m; p++)
          d[p] = arguments[p];
        t.apply(o, d);
      }, f[i] || (f[i] = {}), f[i][t] && o.removeEventListener(i, f[i][t], a), f[i][t] = n, o.listeners = f;
    }
    o.addEventListener(i, n, a);
  });
}
function Ke(o, e, t) {
  var a;
  return he(Event) && he(CustomEvent) ? a = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (a = document.createEvent("CustomEvent"), a.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(a);
}
function Rr(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var St = ke.location, Fs = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Dr(o) {
  var e = o.match(Fs);
  return e !== null && (e[1] !== St.protocol || e[2] !== St.hostname || e[3] !== St.port);
}
function Cr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function et(o) {
  var e = o.rotate, t = o.scaleX, a = o.scaleY, n = o.translateX, i = o.translateY, s = [];
  W(n) && n !== 0 && s.push("translateX(".concat(n, "px)")), W(i) && i !== 0 && s.push("translateY(".concat(i, "px)")), W(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), W(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), W(a) && a !== 1 && s.push("scaleY(".concat(a, ")"));
  var f = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function qs(o) {
  var e = Er({}, o), t = 0;
  return oe(o, function(a, n) {
    delete e[n], oe(e, function(i) {
      var s = Math.abs(a.startX - i.startX), f = Math.abs(a.startY - i.startY), g = Math.abs(a.endX - i.endX), m = Math.abs(a.endY - i.endY), d = Math.sqrt(s * s + f * f), p = Math.sqrt(g * g + m * m), b = (p - d) / d;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function dt(o, e) {
  var t = o.pageX, a = o.pageY, n = {
    endX: t,
    endY: a
  };
  return e ? n : Er({
    startX: t,
    startY: a
  }, n);
}
function Gs(o) {
  var e = 0, t = 0, a = 0;
  return oe(o, function(n) {
    var i = n.startX, s = n.startY;
    e += i, t += s, a += 1;
  }), e /= a, t /= a, {
    pageX: e,
    pageY: t
  };
}
function Te(o) {
  var e = o.aspectRatio, t = o.height, a = o.width, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = Sr(a), s = Sr(t);
  if (i && s) {
    var f = t * e;
    n === "contain" && f > a || n === "cover" && f < a ? t = a / e : a = t * e;
  } else
    i ? t = a / e : s && (a = t * e);
  return {
    width: a,
    height: t
  };
}
function Js(o) {
  var e = o.width, t = o.height, a = o.degree;
  if (a = Math.abs(a) % 180, a === 90)
    return {
      width: t,
      height: e
    };
  var n = a % 90 * Math.PI / 180, i = Math.sin(n), s = Math.cos(n), f = e * s + t * i, g = e * i + t * s;
  return a > 90 ? {
    width: g,
    height: f
  } : {
    width: f,
    height: g
  };
}
function Zs(o, e, t, a) {
  var n = e.aspectRatio, i = e.naturalWidth, s = e.naturalHeight, f = e.rotate, g = f === void 0 ? 0 : f, m = e.scaleX, d = m === void 0 ? 1 : m, p = e.scaleY, b = p === void 0 ? 1 : p, A = t.aspectRatio, _ = t.naturalWidth, E = t.naturalHeight, j = a.fillColor, V = j === void 0 ? "transparent" : j, R = a.imageSmoothingEnabled, I = R === void 0 ? !0 : R, ne = a.imageSmoothingQuality, J = ne === void 0 ? "low" : ne, C = a.maxWidth, X = C === void 0 ? 1 / 0 : C, Z = a.maxHeight, ue = Z === void 0 ? 1 / 0 : Z, me = a.minWidth, L = me === void 0 ? 0 : me, H = a.minHeight, N = H === void 0 ? 0 : H, Y = document.createElement("canvas"), U = Y.getContext("2d"), ie = Te({
    aspectRatio: A,
    width: X,
    height: ue
  }), Q = Te({
    aspectRatio: A,
    width: L,
    height: N
  }, "cover"), Xe = Math.min(ie.width, Math.max(Q.width, _)), Fe = Math.min(ie.height, Math.max(Q.height, E)), it = Te({
    aspectRatio: n,
    width: X,
    height: ue
  }), at = Te({
    aspectRatio: n,
    width: L,
    height: N
  }, "cover"), ot = Math.min(it.width, Math.max(at.width, i)), Ne = Math.min(it.height, Math.max(at.height, s)), yt = [-ot / 2, -Ne / 2, ot, Ne];
  return Y.width = Ue(Xe), Y.height = Ue(Fe), U.fillStyle = V, U.fillRect(0, 0, Xe, Fe), U.save(), U.translate(Xe / 2, Fe / 2), U.rotate(g * Math.PI / 180), U.scale(d, b), U.imageSmoothingEnabled = I, U.imageSmoothingQuality = J, U.drawImage.apply(U, [o].concat(Tr(yt.map(function(Le) {
    return Math.floor(Ue(Le));
  })))), U.restore(), Y;
}
var Hr = String.fromCharCode;
function Qs(o, e, t) {
  var a = "";
  t += e;
  for (var n = e; n < t; n += 1)
    a += Hr(o.getUint8(n));
  return a;
}
var el = /^data:.*,/;
function tl(o) {
  var e = o.replace(el, ""), t = atob(e), a = new ArrayBuffer(t.length), n = new Uint8Array(a);
  return oe(n, function(i, s) {
    n[s] = t.charCodeAt(s);
  }), a;
}
function rl(o, e) {
  for (var t = [], a = 8192, n = new Uint8Array(o); n.length > 0; )
    t.push(Hr.apply(null, Vr(n.subarray(0, a)))), n = n.subarray(a);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function il(o) {
  var e = new DataView(o), t;
  try {
    var a, n, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var s = e.byteLength, f = 2; f + 1 < s; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          n = f;
          break;
        }
        f += 1;
      }
    if (n) {
      var g = n + 4, m = n + 10;
      if (Qs(e, g, 4) === "Exif") {
        var d = e.getUint16(m);
        if (a = d === 18761, (a || d === 19789) && e.getUint16(m + 2, a) === 42) {
          var p = e.getUint32(m + 4, a);
          p >= 8 && (i = m + p);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, a), A, _;
      for (_ = 0; _ < b; _ += 1)
        if (A = i + _ * 12 + 2, e.getUint16(A, a) === 274) {
          A += 8, t = e.getUint16(A, a), e.setUint16(A, 1, a);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function al(o) {
  var e = 0, t = 1, a = 1;
  switch (o) {
    case 2:
      t = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      a = -1;
      break;
    case 5:
      e = 90, a = -1;
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
    scaleY: a
  };
}
var ol = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, a = this.container, n = this.cropper, i = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    se(n, fe), _e(e, fe);
    var f = {
      width: Math.max(a.offsetWidth, i >= 0 ? i : Nr),
      height: Math.max(a.offsetHeight, s >= 0 ? s : Lr)
    };
    this.containerData = f, Ee(n, {
      width: f.width,
      height: f.height
    }), se(e, fe), _e(n, fe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, a = this.options.viewMode, n = Math.abs(t.rotate) % 180 === 90, i = n ? t.naturalHeight : t.naturalWidth, s = n ? t.naturalWidth : t.naturalHeight, f = i / s, g = e.width, m = e.height;
    e.height * f > e.width ? a === 3 ? g = e.height * f : m = e.width / f : a === 3 ? m = e.width / f : g = e.height * f;
    var d = {
      aspectRatio: f,
      naturalWidth: i,
      naturalHeight: s,
      width: g,
      height: m
    };
    this.canvasData = d, this.limited = a === 1 || a === 2, this.limitCanvas(!0, !0), d.width = Math.min(Math.max(d.width, d.minWidth), d.maxWidth), d.height = Math.min(Math.max(d.height, d.minHeight), d.maxHeight), d.left = (e.width - d.width) / 2, d.top = (e.height - d.height) / 2, d.oldLeft = d.left, d.oldTop = d.top, this.initialCanvasData = te({}, d);
  },
  limitCanvas: function(e, t) {
    var a = this.options, n = this.containerData, i = this.canvasData, s = this.cropBoxData, f = a.viewMode, g = i.aspectRatio, m = this.cropped && s;
    if (e) {
      var d = Number(a.minCanvasWidth) || 0, p = Number(a.minCanvasHeight) || 0;
      f > 1 ? (d = Math.max(d, n.width), p = Math.max(p, n.height), f === 3 && (p * g > d ? d = p * g : p = d / g)) : f > 0 && (d ? d = Math.max(d, m ? s.width : 0) : p ? p = Math.max(p, m ? s.height : 0) : m && (d = s.width, p = s.height, p * g > d ? d = p * g : p = d / g));
      var b = Te({
        aspectRatio: g,
        width: d,
        height: p
      });
      d = b.width, p = b.height, i.minWidth = d, i.minHeight = p, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (m ? 0 : 1)) {
        var A = n.width - i.width, _ = n.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, _), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, _), m && this.limited && (i.minLeft = Math.min(s.left, s.left + (s.width - i.width)), i.minTop = Math.min(s.top, s.top + (s.height - i.height)), i.maxLeft = s.left, i.maxTop = s.top, f === 2 && (i.width >= n.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= n.height && (i.minTop = Math.min(0, _), i.maxTop = Math.max(0, _))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = n.width, i.maxTop = n.height;
  },
  renderCanvas: function(e, t) {
    var a = this.canvasData, n = this.imageData;
    if (t) {
      var i = Js({
        width: n.naturalWidth * Math.abs(n.scaleX || 1),
        height: n.naturalHeight * Math.abs(n.scaleY || 1),
        degree: n.rotate || 0
      }), s = i.width, f = i.height, g = a.width * (s / a.naturalWidth), m = a.height * (f / a.naturalHeight);
      a.left -= (g - a.width) / 2, a.top -= (m - a.height) / 2, a.width = g, a.height = m, a.aspectRatio = s / f, a.naturalWidth = s, a.naturalHeight = f, this.limitCanvas(!0, !1);
    }
    (a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft), (a.height > a.maxHeight || a.height < a.minHeight) && (a.top = a.oldTop), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), this.limitCanvas(!1, !0), a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft), a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop), a.oldLeft = a.left, a.oldTop = a.top, Ee(this.canvas, te({
      width: a.width,
      height: a.height
    }, et({
      translateX: a.left,
      translateY: a.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, a = this.imageData, n = a.naturalWidth * (t.width / t.naturalWidth), i = a.naturalHeight * (t.height / t.naturalHeight);
    te(a, {
      width: n,
      height: i,
      left: (t.width - n) / 2,
      top: (t.height - i) / 2
    }), Ee(this.image, te({
      width: a.width,
      height: a.height
    }, et(te({
      translateX: a.left,
      translateY: a.top
    }, a)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, a = e.aspectRatio || e.initialAspectRatio, n = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    a && (t.height * a > t.width ? i.height = i.width / a : i.width = i.height * a), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * n), i.height = Math.max(i.minHeight, i.height * n), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = te({}, i);
  },
  limitCropBox: function(e, t) {
    var a = this.options, n = this.containerData, i = this.canvasData, s = this.cropBoxData, f = this.limited, g = a.aspectRatio;
    if (e) {
      var m = Number(a.minCropBoxWidth) || 0, d = Number(a.minCropBoxHeight) || 0, p = f ? Math.min(n.width, i.width, i.width + i.left, n.width - i.left) : n.width, b = f ? Math.min(n.height, i.height, i.height + i.top, n.height - i.top) : n.height;
      m = Math.min(m, n.width), d = Math.min(d, n.height), g && (m && d ? d * g > m ? d = m / g : m = d * g : m ? d = m / g : d && (m = d * g), b * g > p ? b = p / g : p = b * g), s.minWidth = Math.min(m, p), s.minHeight = Math.min(d, b), s.maxWidth = p, s.maxHeight = b;
    }
    t && (f ? (s.minLeft = Math.max(0, i.left), s.minTop = Math.max(0, i.top), s.maxLeft = Math.min(n.width, i.left + i.width) - s.width, s.maxTop = Math.min(n.height, i.top + i.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = n.width - s.width, s.maxTop = n.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, a = this.cropBoxData;
    (a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft), (a.height > a.maxHeight || a.height < a.minHeight) && (a.top = a.oldTop), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), this.limitCropBox(!1, !0), a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft), a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop), a.oldLeft = a.left, a.oldTop = a.top, e.movable && e.cropBoxMovable && rt(this.face, tt, a.width >= t.width && a.height >= t.height ? Or : Bt), Ee(this.cropBox, te({
      width: a.width,
      height: a.height
    }, et({
      translateX: a.left,
      translateY: a.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ke(this.element, Ot, this.getData());
  }
}, nl = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, a = this.options.preview, n = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = n, s.alt = i, this.viewBox.appendChild(s), this.viewBoxImage = s, !!a) {
      var f = a;
      typeof a == "string" ? f = e.ownerDocument.querySelectorAll(a) : a.querySelector && (f = [a]), this.previews = f, oe(f, function(g) {
        var m = document.createElement("img");
        rt(g, ut, {
          width: g.offsetWidth,
          height: g.offsetHeight,
          html: g.innerHTML
        }), t && (m.crossOrigin = t), m.src = n, m.alt = i, m.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', g.innerHTML = "", g.appendChild(m);
      });
    }
  },
  resetPreview: function() {
    oe(this.previews, function(e) {
      var t = Lt(e, ut);
      Ee(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Xs(e, ut);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, a = this.cropBoxData, n = a.width, i = a.height, s = e.width, f = e.height, g = a.left - t.left - e.left, m = a.top - t.top - e.top;
    !this.cropped || this.disabled || (Ee(this.viewBoxImage, te({
      width: s,
      height: f
    }, et(te({
      translateX: -g,
      translateY: -m
    }, e)))), oe(this.previews, function(d) {
      var p = Lt(d, ut), b = p.width, A = p.height, _ = b, E = A, j = 1;
      n && (j = b / n, E = i * j), i && E > A && (j = A / i, _ = n * j, E = A), Ee(d, {
        width: _,
        height: E
      }), Ee(d.getElementsByTagName("img")[0], te({
        width: s * j,
        height: f * j
      }, et(te({
        translateX: -g * j,
        translateY: -m * j
      }, e))));
    }));
  }
}, sl = {
  bind: function() {
    var e = this.element, t = this.options, a = this.cropper;
    he(t.cropstart) && ge(e, jt, t.cropstart), he(t.cropmove) && ge(e, It, t.cropmove), he(t.cropend) && ge(e, Pt, t.cropend), he(t.crop) && ge(e, Ot, t.crop), he(t.zoom) && ge(e, Nt, t.zoom), ge(a, gr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ge(a, xr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(a, pr, this.onDblclick = this.dblclick.bind(this)), ge(e.ownerDocument, vr, this.onCropMove = this.cropMove.bind(this)), ge(e.ownerDocument, br, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ge(window, wr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, a = this.cropper;
    he(t.cropstart) && ye(e, jt, t.cropstart), he(t.cropmove) && ye(e, It, t.cropmove), he(t.cropend) && ye(e, Pt, t.cropend), he(t.crop) && ye(e, Ot, t.crop), he(t.zoom) && ye(e, Nt, t.zoom), ye(a, gr, this.onCropStart), t.zoomable && t.zoomOnWheel && ye(a, xr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ye(a, pr, this.onDblclick), ye(e.ownerDocument, vr, this.onCropMove), ye(e.ownerDocument, br, this.onCropEnd), t.responsive && ye(window, wr, this.onResize);
  }
}, ll = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, a = this.containerData, n = t.offsetWidth / a.width, i = t.offsetHeight / a.height, s = Math.abs(n - 1) > Math.abs(i - 1) ? n : i;
      if (s !== 1) {
        var f, g;
        e.restore && (f = this.getCanvasData(), g = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(oe(f, function(m, d) {
          f[d] = m * s;
        })), this.setCropBoxData(oe(g, function(m, d) {
          g[d] = m * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === jr || this.setDragMode(Ys(this.dragBox, Tt) ? Ir : Rt);
  },
  wheel: function(e) {
    var t = this, a = Number(this.options.wheelZoomRatio) || 0.1, n = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? n = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? n = -e.wheelDelta / 120 : e.detail && (n = e.detail > 0 ? 1 : -1), this.zoom(-n * a, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, a = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (W(t) && t !== 1 || W(a) && a !== 0 || e.ctrlKey))) {
      var n = this.options, i = this.pointers, s;
      e.changedTouches ? oe(e.changedTouches, function(f) {
        i[f.identifier] = dt(f);
      }) : i[e.pointerId || 0] = dt(e), Object.keys(i).length > 1 && n.zoomable && n.zoomOnTouch ? s = Pr : s = Lt(e.target, tt), !!js.test(s) && Ke(this.element, jt, {
        originalEvent: e,
        action: s
      }) !== !1 && (e.preventDefault(), this.action = s, this.cropping = !1, s === Ar && (this.cropping = !0, se(this.dragBox, pt)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var a = this.pointers;
      e.preventDefault(), Ke(this.element, It, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? oe(e.changedTouches, function(n) {
        te(a[n.identifier] || {}, dt(n, !0));
      }) : te(a[e.pointerId || 0] || {}, dt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, a = this.pointers;
      e.changedTouches ? oe(e.changedTouches, function(n) {
        delete a[n.identifier];
      }) : delete a[e.pointerId || 0], t && (e.preventDefault(), Object.keys(a).length || (this.action = ""), this.cropping && (this.cropping = !1, He(this.dragBox, pt, this.cropped && this.options.modal)), Ke(this.element, Pt, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, cl = {
  change: function(e) {
    var t = this.options, a = this.canvasData, n = this.containerData, i = this.cropBoxData, s = this.pointers, f = this.action, g = t.aspectRatio, m = i.left, d = i.top, p = i.width, b = i.height, A = m + p, _ = d + b, E = 0, j = 0, V = n.width, R = n.height, I = !0, ne;
    !g && e.shiftKey && (g = p && b ? p / b : 1), this.limited && (E = i.minLeft, j = i.minTop, V = E + Math.min(n.width, a.width, a.left + a.width), R = j + Math.min(n.height, a.height, a.top + a.height));
    var J = s[Object.keys(s)[0]], C = {
      x: J.endX - J.startX,
      y: J.endY - J.startY
    }, X = function(ue) {
      switch (ue) {
        case Ae:
          A + C.x > V && (C.x = V - A);
          break;
        case Oe:
          m + C.x < E && (C.x = E - m);
          break;
        case $e:
          d + C.y < j && (C.y = j - d);
          break;
        case Be:
          _ + C.y > R && (C.y = R - _);
          break;
      }
    };
    switch (f) {
      case Bt:
        m += C.x, d += C.y;
        break;
      case Ae:
        if (C.x >= 0 && (A >= V || g && (d <= j || _ >= R))) {
          I = !1;
          break;
        }
        X(Ae), p += C.x, p < 0 && (f = Oe, p = -p, m -= p), g && (b = p / g, d += (i.height - b) / 2);
        break;
      case $e:
        if (C.y <= 0 && (d <= j || g && (m <= E || A >= V))) {
          I = !1;
          break;
        }
        X($e), b -= C.y, d += C.y, b < 0 && (f = Be, b = -b, d -= b), g && (p = b * g, m += (i.width - p) / 2);
        break;
      case Oe:
        if (C.x <= 0 && (m <= E || g && (d <= j || _ >= R))) {
          I = !1;
          break;
        }
        X(Oe), p -= C.x, m += C.x, p < 0 && (f = Ae, p = -p, m -= p), g && (b = p / g, d += (i.height - b) / 2);
        break;
      case Be:
        if (C.y >= 0 && (_ >= R || g && (m <= E || A >= V))) {
          I = !1;
          break;
        }
        X(Be), b += C.y, b < 0 && (f = $e, b = -b, d -= b), g && (p = b * g, m += (i.width - p) / 2);
        break;
      case Ge:
        if (g) {
          if (C.y <= 0 && (d <= j || A >= V)) {
            I = !1;
            break;
          }
          X($e), b -= C.y, d += C.y, p = b * g;
        } else
          X($e), X(Ae), C.x >= 0 ? A < V ? p += C.x : C.y <= 0 && d <= j && (I = !1) : p += C.x, C.y <= 0 ? d > j && (b -= C.y, d += C.y) : (b -= C.y, d += C.y);
        p < 0 && b < 0 ? (f = Qe, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Je, p = -p, m -= p) : b < 0 && (f = Ze, b = -b, d -= b);
        break;
      case Je:
        if (g) {
          if (C.y <= 0 && (d <= j || m <= E)) {
            I = !1;
            break;
          }
          X($e), b -= C.y, d += C.y, p = b * g, m += i.width - p;
        } else
          X($e), X(Oe), C.x <= 0 ? m > E ? (p -= C.x, m += C.x) : C.y <= 0 && d <= j && (I = !1) : (p -= C.x, m += C.x), C.y <= 0 ? d > j && (b -= C.y, d += C.y) : (b -= C.y, d += C.y);
        p < 0 && b < 0 ? (f = Ze, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Ge, p = -p, m -= p) : b < 0 && (f = Qe, b = -b, d -= b);
        break;
      case Qe:
        if (g) {
          if (C.x <= 0 && (m <= E || _ >= R)) {
            I = !1;
            break;
          }
          X(Oe), p -= C.x, m += C.x, b = p / g;
        } else
          X(Be), X(Oe), C.x <= 0 ? m > E ? (p -= C.x, m += C.x) : C.y >= 0 && _ >= R && (I = !1) : (p -= C.x, m += C.x), C.y >= 0 ? _ < R && (b += C.y) : b += C.y;
        p < 0 && b < 0 ? (f = Ge, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Ze, p = -p, m -= p) : b < 0 && (f = Je, b = -b, d -= b);
        break;
      case Ze:
        if (g) {
          if (C.x >= 0 && (A >= V || _ >= R)) {
            I = !1;
            break;
          }
          X(Ae), p += C.x, b = p / g;
        } else
          X(Be), X(Ae), C.x >= 0 ? A < V ? p += C.x : C.y >= 0 && _ >= R && (I = !1) : p += C.x, C.y >= 0 ? _ < R && (b += C.y) : b += C.y;
        p < 0 && b < 0 ? (f = Je, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Qe, p = -p, m -= p) : b < 0 && (f = Ge, b = -b, d -= b);
        break;
      case Or:
        this.move(C.x, C.y), I = !1;
        break;
      case Pr:
        this.zoom(qs(s), e), I = !1;
        break;
      case Ar:
        if (!C.x || !C.y) {
          I = !1;
          break;
        }
        ne = Rr(this.cropper), m = J.startX - ne.left, d = J.startY - ne.top, p = i.minWidth, b = i.minHeight, C.x > 0 ? f = C.y > 0 ? Ze : Ge : C.x < 0 && (m -= p, f = C.y > 0 ? Qe : Je), C.y < 0 && (d -= b), this.cropped || (_e(this.cropBox, fe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    I && (i.width = p, i.height = b, i.left = m, i.top = d, this.action = f, this.renderCropBox()), oe(s, function(Z) {
      Z.startX = Z.endX, Z.startY = Z.endY;
    });
  }
}, ul = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && se(this.dragBox, pt), _e(this.cropBox, fe), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = te({}, this.initialImageData), this.canvasData = te({}, this.initialCanvasData), this.cropBoxData = te({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (te(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), _e(this.dragBox, pt), se(this.cropBox, fe)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, oe(this.previews, function(a) {
      a.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, _e(this.cropper, fr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, se(this.cropper, fr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[ee] ? (e[ee] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, a = this.canvasData, n = a.left, i = a.top;
    return this.moveTo(kt(e) ? e : n + Number(e), kt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, a = this.canvasData, n = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (W(e) && (a.left = e, n = !0), W(t) && (a.top = t, n = !0), n && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var a = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(a.width * e / a.naturalWidth, null, t);
  },
  zoomTo: function(e, t, a) {
    var n = this.options, i = this.canvasData, s = i.width, f = i.height, g = i.naturalWidth, m = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && n.zoomable) {
      var d = g * e, p = m * e;
      if (Ke(this.element, Nt, {
        ratio: e,
        oldRatio: s / g,
        originalEvent: a
      }) === !1)
        return this;
      if (a) {
        var b = this.pointers, A = Rr(this.cropper), _ = b && Object.keys(b).length ? Gs(b) : {
          pageX: a.pageX,
          pageY: a.pageY
        };
        i.left -= (d - s) * ((_.pageX - A.left - i.left) / s), i.top -= (p - f) * ((_.pageY - A.top - i.top) / f);
      } else
        Re(t) && W(t.x) && W(t.y) ? (i.left -= (d - s) * ((t.x - i.left) / s), i.top -= (p - f) * ((t.y - i.top) / f)) : (i.left -= (d - s) / 2, i.top -= (p - f) / 2);
      i.width = d, i.height = p, this.renderCanvas(!0);
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
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, a = this.imageData, n = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (W(e) && (a.scaleX = e, n = !0), W(t) && (a.scaleY = t, n = !0), n && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, a = this.imageData, n = this.canvasData, i = this.cropBoxData, s;
    if (this.ready && this.cropped) {
      s = {
        x: i.left - n.left,
        y: i.top - n.top,
        width: i.width,
        height: i.height
      };
      var f = a.width / a.naturalWidth;
      if (oe(s, function(d, p) {
        s[p] = d / f;
      }), e) {
        var g = Math.round(s.y + s.height), m = Math.round(s.x + s.width);
        s.x = Math.round(s.x), s.y = Math.round(s.y), s.width = m - s.x, s.height = g - s.y;
      }
    } else
      s = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (s.rotate = a.rotate || 0), t.scalable && (s.scaleX = a.scaleX || 1, s.scaleY = a.scaleY || 1), s;
  },
  setData: function(e) {
    var t = this.options, a = this.imageData, n = this.canvasData, i = {};
    if (this.ready && !this.disabled && Re(e)) {
      var s = !1;
      t.rotatable && W(e.rotate) && e.rotate !== a.rotate && (a.rotate = e.rotate, s = !0), t.scalable && (W(e.scaleX) && e.scaleX !== a.scaleX && (a.scaleX = e.scaleX, s = !0), W(e.scaleY) && e.scaleY !== a.scaleY && (a.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var f = a.width / a.naturalWidth;
      W(e.x) && (i.left = e.x * f + n.left), W(e.y) && (i.top = e.y * f + n.top), W(e.width) && (i.width = e.width * f), W(e.height) && (i.height = e.height * f), this.setCropBoxData(i);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? te({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? te({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && oe(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(a) {
      t[a] = e[a];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, a = t.aspectRatio;
    return this.ready && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) ? (t.width = e.width, t.height = e.width / a) : W(e.height) && (t.height = e.height, t.width = e.height * a), this.renderCanvas(!0)), this;
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
    var t = this.cropBoxData, a = this.options.aspectRatio, n, i;
    return this.ready && this.cropped && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) && e.width !== t.width && (n = !0, t.width = e.width), W(e.height) && e.height !== t.height && (i = !0, t.height = e.height), a && (n ? t.height = t.width / a : i && (t.width = t.height * a)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, a = Zs(this.image, this.imageData, t, e);
    if (!this.cropped)
      return a;
    var n = this.getData(), i = n.x, s = n.y, f = n.width, g = n.height, m = a.width / Math.floor(t.naturalWidth);
    m !== 1 && (i *= m, s *= m, f *= m, g *= m);
    var d = f / g, p = Te({
      aspectRatio: d,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Te({
      aspectRatio: d,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = Te({
      aspectRatio: d,
      width: e.width || (m !== 1 ? a.width : f),
      height: e.height || (m !== 1 ? a.height : g)
    }), _ = A.width, E = A.height;
    _ = Math.min(p.width, Math.max(b.width, _)), E = Math.min(p.height, Math.max(b.height, E));
    var j = document.createElement("canvas"), V = j.getContext("2d");
    j.width = Ue(_), j.height = Ue(E), V.fillStyle = e.fillColor || "transparent", V.fillRect(0, 0, _, E);
    var R = e.imageSmoothingEnabled, I = R === void 0 ? !0 : R, ne = e.imageSmoothingQuality;
    V.imageSmoothingEnabled = I, ne && (V.imageSmoothingQuality = ne);
    var J = a.width, C = a.height, X = i, Z = s, ue, me, L, H, N, Y;
    X <= -f || X > J ? (X = 0, ue = 0, L = 0, N = 0) : X <= 0 ? (L = -X, X = 0, ue = Math.min(J, f + X), N = ue) : X <= J && (L = 0, ue = Math.min(f, J - X), N = ue), ue <= 0 || Z <= -g || Z > C ? (Z = 0, me = 0, H = 0, Y = 0) : Z <= 0 ? (H = -Z, Z = 0, me = Math.min(C, g + Z), Y = me) : Z <= C && (H = 0, me = Math.min(g, C - Z), Y = me);
    var U = [X, Z, ue, me];
    if (N > 0 && Y > 0) {
      var ie = _ / f;
      U.push(L * ie, H * ie, N * ie, Y * ie);
    }
    return V.drawImage.apply(V, [a].concat(Tr(U.map(function(Q) {
      return Math.floor(Ue(Q));
    })))), j;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !kt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, a = this.dragBox, n = this.face;
    if (this.ready && !this.disabled) {
      var i = e === Rt, s = t.movable && e === Ir;
      e = i || s ? e : jr, t.dragMode = e, rt(a, tt, e), He(a, Tt, i), He(a, At, s), t.cropBoxMovable || (rt(n, tt, e), He(n, Tt, i), He(n, At, s));
    }
    return this;
  }
}, dl = ke.Cropper, Ur = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Ss(this, o), !e || !Vs.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = te({}, kr, Re(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return Ds(o, [{
    key: "init",
    value: function() {
      var t = this.element, a = t.tagName.toLowerCase(), n;
      if (!t[ee]) {
        if (t[ee] = this, a === "img") {
          if (this.isImg = !0, n = t.getAttribute("src") || "", this.originalUrl = n, !n)
            return;
          n = t.src;
        } else
          a === "canvas" && window.HTMLCanvasElement && (n = t.toDataURL());
        this.load(n);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var a = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var n = this.element, i = this.options;
        if (!i.rotatable && !i.scalable && (i.checkOrientation = !1), !i.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (Ns.test(t)) {
          Ls.test(t) ? this.read(tl(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = f, s.onerror = f, s.ontimeout = f, s.onprogress = function() {
          s.getResponseHeader("content-type") !== _r && s.abort();
        }, s.onload = function() {
          a.read(s.response);
        }, s.onloadend = function() {
          a.reloading = !1, a.xhr = null;
        }, i.checkCrossOrigin && Dr(t) && n.crossOrigin && (t = Cr(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = n.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var a = this.options, n = this.imageData, i = il(t), s = 0, f = 1, g = 1;
      if (i > 1) {
        this.url = rl(t, _r);
        var m = al(i);
        s = m.rotate, f = m.scaleX, g = m.scaleY;
      }
      a.rotatable && (n.rotate = s), a.scalable && (n.scaleX = f, n.scaleY = g), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, a = this.url, n = t.crossOrigin, i = a;
      this.options.checkCrossOrigin && Dr(a) && (n || (n = "anonymous"), i = Cr(a)), this.crossOrigin = n, this.crossOriginUrl = i;
      var s = document.createElement("img");
      n && (s.crossOrigin = n), s.src = i || a, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), se(s, mr), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, a = this.image;
      a.onload = null, a.onerror = null, this.sizing = !0;
      var n = ke.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ke.navigator.userAgent), i = function(m, d) {
        te(t.imageData, {
          naturalWidth: m,
          naturalHeight: d,
          aspectRatio: m / d
        }), t.initialImageData = te({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (a.naturalWidth && !n) {
        i(a.naturalWidth, a.naturalHeight);
        return;
      }
      var s = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = s, s.onload = function() {
        i(s.width, s.height), n || f.removeChild(s);
      }, s.src = a.src, n || (s.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(s));
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
        var t = this.element, a = this.options, n = this.image, i = t.parentNode, s = document.createElement("div");
        s.innerHTML = zs;
        var f = s.querySelector(".".concat(ee, "-container")), g = f.querySelector(".".concat(ee, "-canvas")), m = f.querySelector(".".concat(ee, "-drag-box")), d = f.querySelector(".".concat(ee, "-crop-box")), p = d.querySelector(".".concat(ee, "-face"));
        this.container = i, this.cropper = f, this.canvas = g, this.dragBox = m, this.cropBox = d, this.viewBox = f.querySelector(".".concat(ee, "-view-box")), this.face = p, g.appendChild(n), se(t, fe), i.insertBefore(f, t.nextSibling), this.isImg || _e(n, mr), this.initPreview(), this.bind(), a.initialAspectRatio = Math.max(0, a.initialAspectRatio) || NaN, a.aspectRatio = Math.max(0, a.aspectRatio) || NaN, a.viewMode = Math.max(0, Math.min(3, Math.round(a.viewMode))) || 0, se(d, fe), a.guides || se(d.getElementsByClassName("".concat(ee, "-dashed")), fe), a.center || se(d.getElementsByClassName("".concat(ee, "-center")), fe), a.background && se(f, "".concat(ee, "-bg")), a.highlight || se(p, As), a.cropBoxMovable && (se(p, At), rt(p, tt, Bt)), a.cropBoxResizable || (se(d.getElementsByClassName("".concat(ee, "-line")), fe), se(d.getElementsByClassName("".concat(ee, "-point")), fe)), this.render(), this.ready = !0, this.setDragMode(a.dragMode), a.autoCrop && this.crop(), this.setData(a.data), he(a.ready) && ge(t, yr, a.ready, {
          once: !0
        }), Ke(t, yr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), _e(this.element, fe));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = dl, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      te(kr, Re(t) && t);
    }
  }]), o;
}();
te(Ur.prototype, ol, nl, sl, ll, cl, ul);
const hl = { class: "flex" }, fl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ml = { class: "ml-auto mb-2" }, pl = { class: "w-full flex justify-center" }, gl = ["src"], vl = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { t: a } = B("i18n"), { apiUrl: n } = Se(), i = P(null), s = P(null), f = P(!1), g = P(""), m = P(!1), d = () => {
      f.value = !f.value, f.value ? s.value = new Ur(i.value, {
        crop(A) {
        }
      }) : s.value.destroy();
    }, p = B("ajaxData"), b = () => {
      s.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (A) => {
          g.value = "", m.value = !1, mt(n.value, {
            method: "POST",
            params: Object.assign(p, {
              q: "upload",
              adapter: t.selection.adapter,
              path: t.selection.item.path,
              file: A
            }),
            name: t.selection.item.basename,
            json: !1
          }).then((_) => {
            g.value = a("Updated."), i.value.src = $t(t.selection.adapter, t.selection.item.path), d(), e("load");
          }).catch((_) => {
            g.value = a(_.message), m.value = !0;
          });
        }
      );
    };
    return xe(() => {
      e("load");
    }), (A, _) => (w(), M(ce, null, [
      h("div", hl, [
        h("h3", fl, $(o.selection.item.basename), 1),
        h("div", ml, [
          f.value ? (w(), M("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(k(a)("Crop")), 1)) : q("", !0),
          h("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: _[0] || (_[0] = (E) => d())
          }, $(f.value ? k(a)("Cancel") : k(a)("Edit")), 1)
        ])
      ]),
      h("div", pl, [
        h("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[60vh] max-h-[60vh]",
          src: k($t)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, gl)
      ]),
      g.value.length ? (w(), G(Ce, {
        key: 0,
        error: m.value
      }, {
        default: F(() => [
          le($(g.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ], 64));
  }
}, bl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, yl = /* @__PURE__ */ h("div", null, " Default view.. ", -1), wl = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return xe(() => {
      e("load");
    }), (t, a) => (w(), M(ce, null, [
      h("h3", bl, $(o.selection.item.basename), 1),
      yl
    ], 64));
  }
}, xl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _l = {
  class: "w-full",
  preload: "",
  controls: ""
}, kl = ["src"], Sl = /* @__PURE__ */ le(" Your browser does not support the video tag. "), Dl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: a } = Se(), n = () => a.value + "?" + je({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, s) => (w(), M(ce, null, [
      h("h3", xl, $(o.selection.item.basename), 1),
      h("div", null, [
        h("video", _l, [
          h("source", {
            src: n(),
            type: "video/mp4"
          }, null, 8, kl),
          Sl
        ])
      ])
    ], 64));
  }
}, Cl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ml = {
  class: "w-full",
  controls: ""
}, $l = ["src"], El = /* @__PURE__ */ le(" Your browser does not support the audio element. "), Tl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: a } = Se(), n = () => a.value + "?" + je({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, s) => (w(), M(ce, null, [
      h("h3", Cl, $(o.selection.item.basename), 1),
      h("div", null, [
        h("audio", Ml, [
          h("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, $l),
          El
        ])
      ])
    ], 64));
  }
}, Al = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ol = ["data"], Pl = ["src"], Il = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: a } = Se(), n = () => a.value + "?" + je({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (i, s) => (w(), M(ce, null, [
      h("h3", Al, $(o.selection.item.basename), 1),
      h("div", null, [
        h("object", {
          class: "h-[60vh]",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          h("iframe", {
            class: "border-0",
            src: n(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, Pl)
        ], 8, Ol)
      ])
    ], 64));
  }
}, jl = { class: "sm:flex sm:items-start" }, Nl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ll = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Vl = {
  key: 0,
  class: "flex leading-5"
}, zl = /* @__PURE__ */ h("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ h("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ h("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Bl = {
  name: "VFModalPreview"
}, Rl = /* @__PURE__ */ Object.assign(Bl, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = Se(), a = B("emitter"), { t: n } = B("i18n"), i = P(!1), s = (m) => i.value = m, f = (m) => {
      var d;
      return ((d = e.selection.item.mime_type) != null ? d : "").startsWith(m);
    }, g = () => {
      const m = t.value + "?" + je({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      a.emit("vf-download", m);
    };
    return (m, d) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: d[6] || (d[6] = (p) => k(a).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Close")), 1),
        h("button", {
          type: "button",
          onClick: d[7] || (d[7] = (p) => g()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Download")), 1)
      ]),
      default: F(() => [
        h("div", jl, [
          h("div", Nl, [
            h("div", null, [
              f("text") ? (w(), G(ks, {
                key: 0,
                selection: o.selection,
                onLoad: d[0] || (d[0] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("image") ? (w(), G(vl, {
                key: 1,
                selection: o.selection,
                onLoad: d[1] || (d[1] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("video") ? (w(), G(Dl, {
                key: 2,
                selection: o.selection,
                onLoad: d[2] || (d[2] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("audio") ? (w(), G(Tl, {
                key: 3,
                selection: o.selection,
                onLoad: d[3] || (d[3] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (w(), G(Il, {
                key: 4,
                selection: o.selection,
                onLoad: d[4] || (d[4] = (p) => s(!0))
              }, null, 8, ["selection"])) : (w(), G(wl, {
                key: 5,
                selection: o.selection,
                onLoad: d[5] || (d[5] = (p) => s(!0))
              }, null, 8, ["selection"]))
            ]),
            h("div", Ll, [
              h("p", null, $(o.selection.item.path), 1),
              h("p", null, "mime_type: " + $(o.selection.item.mime_type), 1),
              i.value == !1 ? (w(), M("div", Vl, [
                zl,
                h("span", null, $(k(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hl = { class: "sm:flex sm:items-start" }, Ul = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), Kl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Yl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Wl = { class: "mt-2" }, Xl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Fl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ql = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Gl = [
  ql
], Jl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zl = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ql = [
  Zl
], ec = { class: "ml-1.5" }, tc = ["onKeyup"], rc = {
  name: "VFModalRename"
}, ic = /* @__PURE__ */ Object.assign(rc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: a } = B("storage"), { t: n } = B("i18n"), i = P(e.selection.items[0]), s = P(e.selection.items[0].basename), f = P(""), g = () => {
      s.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          item: i.value.path,
          name: s.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (m) => {
          f.value = n(m.message);
        }
      });
    };
    return (m, d) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Rename")), 1),
        h("button", {
          type: "button",
          onClick: d[1] || (d[1] = (p) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", Hl, [
          Ul,
          h("div", Kl, [
            h("h3", Yl, $(k(n)("Rename")), 1),
            h("div", Wl, [
              h("p", Xl, [
                i.value.type == "dir" ? (w(), M("svg", Fl, Gl)) : (w(), M("svg", Jl, Ql)),
                h("span", ec, $(i.value.basename), 1)
              ]),
              ve(h("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (p) => s.value = p),
                onKeyup: Ye(g, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, tc), [
                [We, s.value]
              ]),
              f.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(f.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ac = { class: "sm:flex sm:items-start" }, oc = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), nc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, sc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, lc = { class: "mt-2" }, cc = { class: "text-gray-500 mb-1" }, uc = ["id"], dc = {
  key: 0,
  class: "py-2"
}, hc = ["disabled", "onClick"], fc = {
  name: "VFModalUpload"
}, mc = /* @__PURE__ */ Object.assign(fc, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { apiUrl: a } = Se(), { t: n } = B("i18n"), i = P(null), s = P(null), f = P(null), g = P([]), m = P(""), d = P(!0), p = () => {
      m.value = "", i.value.start();
    };
    return xe(() => {
      i.value = new _t.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: s.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: a.value + "?" + je({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(b, A) {
            d.value = !1, _t.each(A, function(_) {
              g.value.push({
                id: _.id,
                name: _.name,
                size: _t.formatSize(_.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(b, A) {
            g.value[g.value.findIndex((_) => _.id == A.id)].percent = A.percent + "%";
          },
          UploadComplete: function() {
            d.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(b, A) {
            i.value.stop(), m.value = n(JSON.parse(A.response).message);
          }
        }
      }), i.value.init();
    }), (b, A) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          disabled: d.value,
          onClick: Pe(p, ["prevent"]),
          type: "button",
          class: de([d.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, $(k(n)("Upload")), 11, hc),
        h("button", {
          type: "button",
          onClick: A[0] || (A[0] = (_) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", ac, [
          oc,
          h("div", nc, [
            h("h3", sc, $(k(n)("Upload files")), 1),
            h("div", lc, [
              h("div", cc, [
                (w(!0), M(ce, null, be(g.value, (_) => (w(), M("div", null, [
                  h("div", {
                    id: _.id
                  }, [
                    le($(_.name) + " ( " + $(_.size) + ") ", 1),
                    h("b", null, $(_.percent), 1)
                  ], 8, uc)
                ]))), 256)),
                g.value.length ? q("", !0) : (w(), M("div", dc, $(k(n)("No files selected!")), 1))
              ]),
              h("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: s
              }, [
                h("button", {
                  ref_key: "pickFiles",
                  ref: f,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, $(k(n)("Select Files")), 513)
              ], 512),
              m.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(m.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), pc = { class: "sm:flex sm:items-start" }, gc = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), vc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, bc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, yc = { class: "mt-2" }, wc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, xc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _c = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), kc = [
  _c
], Sc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dc = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Cc = [
  Dc
], Mc = { class: "ml-1.5" }, $c = ["onKeyup", "placeholder"], Ec = {
  name: "VFModalArchive"
}, Tc = /* @__PURE__ */ Object.assign(Ec, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: a } = B("storage"), { t: n } = B("i18n"), i = P(""), s = P(""), f = P(e.selection.items), g = () => {
      f.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: m, type: d }) => ({ path: m, type: d }))),
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, d) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Archive")), 1),
        h("button", {
          type: "button",
          onClick: d[1] || (d[1] = (p) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", pc, [
          gc,
          h("div", vc, [
            h("h3", bc, $(k(n)("Archive the files")), 1),
            h("div", yc, [
              (w(!0), M(ce, null, be(f.value, (p) => (w(), M("p", wc, [
                p.type == "dir" ? (w(), M("svg", xc, kc)) : (w(), M("svg", Sc, Cc)),
                h("span", Mc, $(p.basename), 1)
              ]))), 256)),
              ve(h("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (p) => i.value = p),
                onKeyup: Ye(g, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: k(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, $c), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ac = { class: "sm:flex sm:items-start" }, Oc = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Pc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ic = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, jc = { class: "mt-2" }, Nc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Lc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vc = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), zc = [
  Vc
], Bc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rc = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Hc = [
  Rc
], Uc = { class: "ml-1.5" }, Kc = { class: "my-1 text-sm text-gray-500" }, Yc = {
  name: "VFModalUnarchive"
}, Wc = /* @__PURE__ */ Object.assign(Yc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: a } = B("storage"), { t: n } = B("i18n");
    P("");
    const i = P(e.selection.items[0]), s = P(""), f = P([]), g = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          item: i.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, d) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Unarchive")), 1),
        h("button", {
          type: "button",
          onClick: d[0] || (d[0] = (p) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(n)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", Ac, [
          Oc,
          h("div", Pc, [
            h("h3", Ic, $(k(n)("Unarchive")), 1),
            h("div", jc, [
              (w(!0), M(ce, null, be(f.value, (p) => (w(), M("p", Nc, [
                p.type == "dir" ? (w(), M("svg", Lc, zc)) : (w(), M("svg", Bc, Hc)),
                h("span", Uc, $(p.basename), 1)
              ]))), 256)),
              h("p", Kc, $(k(n)("The archive will be unarchived at")) + " (" + $(o.current.dirname) + ")", 1),
              s.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xc = { class: "sm:flex sm:items-start" }, Fc = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ h("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), qc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Gc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Jc = { class: "mt-2" }, Zc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Qc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, eu = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), tu = [
  eu
], ru = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, iu = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), au = [
  iu
], ou = { class: "ml-1.5" }, nu = { class: "text-sm text-gray-500 pb-1 pt-3" }, su = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, lu = /* @__PURE__ */ h("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ h("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), cu = { class: "ml-1.5 overflow-auto" }, uu = {
  name: "VFModalMove"
}, du = /* @__PURE__ */ Object.assign(uu, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { t: a } = B("i18n"), { getStore: n } = B("storage"), i = P(e.selection.items.from), s = P(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(i.value.map(({ path: g, type: m }) => ({ path: g, type: m }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("Files moved.", e.selection.items.to.name) });
        },
        onError: (g) => {
          s.value = a(g.message);
        }
      });
    };
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(a)("Yes, Move!")), 1),
        h("button", {
          type: "button",
          onClick: m[0] || (m[0] = (d) => k(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(k(a)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", Xc, [
          Fc,
          h("div", qc, [
            h("h3", Gc, $(k(a)("Move files")), 1),
            h("div", Jc, [
              (w(!0), M(ce, null, be(i.value, (d) => (w(), M("p", Zc, [
                d.type == "dir" ? (w(), M("svg", Qc, tu)) : (w(), M("svg", ru, au)),
                h("span", ou, $(d.path), 1)
              ]))), 256)),
              h("p", nu, $(k(a)("Are you sure you want to move these files?")), 1),
              h("p", su, [
                lu,
                h("span", cu, $(o.selection.items.to.path), 1)
              ]),
              s.value.length ? (w(), G(Ce, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  le($(s.value), 1)
                ]),
                _: 1
              })) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), hu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Yn,
  ModalMessage: Qn,
  ModalNewFolder: ls,
  ModalNewFile: vs,
  ModalPreview: Rl,
  ModalRename: ic,
  ModalUpload: mc,
  ModalArchive: Tc,
  ModalUnarchive: Wc,
  ModalMove: du
}, Symbol.toStringTag, { value: "Module" })), Dt = {
  VueFinder: yn,
  ...hu
};
const pu = {
  install(o) {
    for (const e in Dt)
      if (Dt.hasOwnProperty(e)) {
        const t = Dt[e];
        o.component(t.name, t);
      }
  }
};
export {
  pu as default
};
