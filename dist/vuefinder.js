import { ref as P, watch as pt, inject as B, openBlock as w, createElementBlock as C, createElementVNode as h, unref as _, normalizeClass as de, createTextVNode as le, toDisplayString as $, createCommentVNode as q, createVNode as we, TransitionGroup as Ai, withCtx as F, Fragment as ce, renderList as be, reactive as ht, onMounted as _e, onUpdated as Oi, withDirectives as ve, vShow as st, withModifiers as Pe, nextTick as gt, vModelSelect as cr, customRef as Pi, withKeys as Ye, isRef as Ii, vModelText as We, normalizeStyle as Cr, renderSlot as Mt, provide as xt, createBlock as G, resolveDynamicComponent as Ni } from "vue";
import _t from "plupload";
const ft = (n, { method: e = "get", params: t = {}, json: o = !0 }) => {
  const a = { method: e };
  if (e == "get")
    n += "?" + new URLSearchParams(t);
  else {
    a.headers = {};
    let i = new FormData();
    for (const [s, f] of Object.entries(t))
      i.append(s, f);
    a.body = i;
  }
  return fetch(n, a).then((i) => i.ok ? o ? i.json() : i.text() : i.json().then(Promise.reject.bind(Promise)));
};
function Li(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(e, t) {
    var o = n.get(e);
    o ? o.push(t) : n.set(e, [t]);
  }, off: function(e, t) {
    var o = n.get(e);
    o && (t ? o.splice(o.indexOf(t) >>> 0, 1) : n.set(e, []));
  }, emit: function(e, t) {
    var o = n.get(e);
    o && o.slice().map(function(a) {
      a(t);
    }), (o = n.get("*")) && o.slice().map(function(a) {
      a(e, t);
    });
  } };
}
function Ct(n) {
  let e = localStorage.getItem(n + "_storage");
  const t = P(JSON.parse(e));
  pt(t, o);
  function o() {
    t.value === null || t.value === "" ? localStorage.removeItem(n + "_storage") : localStorage.setItem(n + "_storage", JSON.stringify(t.value));
  }
  function a(f, g) {
    t.value = Object.assign({ ...t.value }, { [f]: g });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (f, g = null) => t.value === null || t.value === "" ? g : t.value.hasOwnProperty(f) ? t.value[f] : g, setStore: a, clearStore: i };
}
const ur = P("");
function Se() {
  function n(e) {
    ur.value = e;
  }
  return { apiUrl: ur, setApiUrl: n };
}
const ji = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Vi = {
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
], eo = ["aria-label"], to = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ro = [
  to
], io = ["aria-label"], oo = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), no = [
  oo
], ao = {
  key: 1,
  class: "flex text-center"
}, so = { class: "pl-2" }, lo = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, co = { class: "flex text-center items-center justify-end" }, uo = ["aria-label"], ho = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), fo = [
  ho
], mo = ["aria-label"], po = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, go = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, vo = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, bo = ["aria-label"], yo = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, wo = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, xo = {
  name: "VFToolbar"
}, _o = /* @__PURE__ */ Object.assign(xo, {
  props: {
    data: Object
  },
  setup(n) {
    const e = B("emitter"), { getStore: t, setStore: o } = B("storage"), { t: a } = B("i18n"), i = P(t("viewport", "grid")), s = P([]), f = P(t("full-screen", !1)), g = P("");
    e.on("vf-search-query", ({ newQuery: d }) => {
      g.value = d;
    });
    const m = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (d) => {
      s.value = d;
    }), e.on("vf-view-toggle", (d) => {
      o("viewport", d), i.value = d;
    }), (d, p) => (w(), C("div", ji, [
      g.value.length ? (w(), C("div", ao, [
        h("div", so, [
          le($(_(a)("Search results for")) + " ", 1),
          h("span", lo, $(g.value), 1)
        ])
      ])) : (w(), C("div", Vi, [
        h("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: p[0] || (p[0] = (b) => _(e).emit("vf-modal-show", { type: "new-folder", items: s.value }))
        }, Ri, 8, zi),
        h("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[1] || (p[1] = (b) => _(e).emit("vf-modal-show", { type: "new-file", items: s.value }))
        }, Ki, 8, Hi),
        h("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[2] || (p[2] = (b) => s.value.length != 1 || _(e).emit("vf-modal-show", { type: "rename", items: s.value }))
        }, [
          (w(), C("svg", {
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
          "aria-label": _(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[3] || (p[3] = (b) => !s.value.length || _(e).emit("vf-modal-show", { type: "delete", items: s.value }))
        }, [
          (w(), C("svg", {
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
          "aria-label": _(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[4] || (p[4] = (b) => _(e).emit("vf-modal-show", { type: "upload", items: s.value }))
        }, Qi, 8, Ji),
        s.value.length == 1 && s.value[0].mime_type == "application/zip" ? (w(), C("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": _(a)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[5] || (p[5] = (b) => !s.value.length || _(e).emit("vf-modal-show", { type: "unarchive", items: s.value }))
        }, [
          (w(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ro, 2))
        ], 8, eo)) : (w(), C("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": _(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[6] || (p[6] = (b) => !s.value.length || _(e).emit("vf-modal-show", { type: "archive", items: s.value }))
        }, [
          (w(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, no, 2))
        ], 8, io))
      ])),
      h("div", co, [
        h("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (w(), C("svg", {
            onClick: p[7] || (p[7] = (b) => _(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, fo))
        ], 8, uo),
        h("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m
        }, [
          (w(), C("svg", po, [
            f.value ? (w(), C("path", go)) : (w(), C("path", vo))
          ]))
        ], 8, mo),
        h("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: p[8] || (p[8] = (b) => g.value.length || _(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (w(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([g.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (w(), C("path", yo)) : q("", !0),
            i.value == "list" ? (w(), C("path", wo)) : q("", !0)
          ], 2))
        ], 8, bo)
      ])
    ]));
  }
});
var ko = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $r = { exports: {} };
(function(n, e) {
  (function(t, o) {
    n.exports = o();
  })(ko, function() {
    function t(u, l) {
      if (!(u instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(u, l) {
      for (var r = 0; r < l.length; r++) {
        var v = l[r];
        v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(u, v.key, v);
      }
    }
    function a(u, l, r) {
      return l && o(u.prototype, l), r && o(u, r), u;
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
        var k = [null];
        k.push.apply(k, y);
        var D = Function.bind.apply(c, k), O = new D();
        return x && d(O, x.prototype), O;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function S(u) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return S = function(v) {
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
      }, S(u);
    }
    function E(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function L(u, l) {
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
        return L(this, c);
      };
    }
    function R(u, l) {
      for (; !Object.prototype.hasOwnProperty.call(u, l) && (u = m(u), u !== null); )
        ;
      return u;
    }
    function I(u, l, r) {
      return typeof Reflect < "u" && Reflect.get ? I = Reflect.get : I = function(c, y, x) {
        var k = R(c, y);
        if (!!k) {
          var D = Object.getOwnPropertyDescriptor(k, y);
          return D.get ? D.get.call(x) : D.value;
        }
      }, I(u, l, r || u);
    }
    function ae(u, l) {
      return X(u) || ue(u, l) || me(u, l) || N();
    }
    function J(u) {
      return M(u) || Z(u) || me(u) || H();
    }
    function M(u) {
      if (Array.isArray(u))
        return j(u);
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
          for (var x = u[Symbol.iterator](), k; !(v = (k = x.next()).done) && (r.push(k.value), !(l && r.length === l)); v = !0)
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
          return j(u, l);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return j(u, l);
      }
    }
    function j(u, l) {
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
      var c = l.x, y = l.y, x = v.x, k = v.y, D = {
        "+": {
          x: c + x,
          y: y + k
        },
        "-": {
          x: c - x,
          y: y - k
        },
        "*": {
          x: c * x,
          y: y * k
        },
        "/": {
          x: c / x,
          y: y / k
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
      var l = je(u);
      return l.x || l.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, it = function(u) {
      var l = document.createElement("div");
      return l.style.position = "fixed", l.style.overflow = "hidden", l.style.pointerEvents = "none", l.style.zIndex = "999999999999999999", l.classList.add(u), l;
    }, ot = function(u) {
      var l = document.createElement("div");
      return l.style.position = "absolute", u || (l.style.background = "rgba(0, 0, 255, 0.1)", l.style.border = "1px solid rgba(0, 0, 255, 0.45)", l.style.display = "none", l.style.pointerEvents = "none"), l;
    }, nt = function(u, l) {
      var r;
      return function() {
        for (var v = arguments.length, c = new Array(v), y = 0; y < v; y++)
          c[y] = arguments[y];
        var x = function() {
          r = null, u.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(x, l);
      };
    }, Le = function() {
      var u, l, r, v;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((l = document.documentElement) === null || l === void 0 ? void 0 : l.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((v = document.documentElement) === null || v === void 0 ? void 0 : v.scrollLeft) || 0
      };
    }, bt = function(u, l) {
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
    }, je = function(u) {
      return !u || u instanceof Document ? Le() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : Le().x,
        y: u.scrollTop >= 0 ? u.scrollTop : Le().y
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
        var k = v.transform.trim().match(/matrix\((.*?)\)/);
        if (k && k.length) {
          var D, O = (D = k[1]) === null || D === void 0 ? void 0 : D.split(",");
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
          var k, D = (k = x[1]) === null || k === void 0 ? void 0 : k.split(",");
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
      var l = u.shiftKey, r = u.keyboardDragSpeed, v = u.zoom, c = u.key, y = u.dragKeys, x = u.scrollDiff, k = u.canScroll, D = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, T = l ? r * 4 * v : r * v;
      return y.left.includes(c) && (O.x = x.x || -T, !l && !x.x && k && D(["left"], r)), y.right.includes(c) && (O.x = x.x || T, !l && !x.x && k && D(["right"], r)), y.up.includes(c) && (O.y = x.y || -T, !l && !x.y && k && D(["top"], r)), y.down.includes(c) && (O.y = x.y || T, !l && !x.y && k && D(["bottom"], r)), O;
    }, Jr = function(u) {
      var l = u.element, r = u.force, v = u.multiSelectionToggle, c = u.SelectedSet, y = u.hoverClassName;
      l.classList.contains(y) && !r || (c.has(l) ? v && c.delete(l) : c.add(l), l.classList.add(y));
    }, Zr = function(u) {
      var l = u.element, r = u.force, v = u.SelectedSet, c = u.PrevSelectedSet, y = u.hoverClassName;
      if (!l.classList.contains(y) && !r)
        return !1;
      var x = v.has(l), k = c.has(l);
      x && !k ? v.delete(l) : !x && k && v.add(l), l.classList.remove(y);
    }, yt = function(u, l) {
      return u.left < l.right && u.right > l.left && u.top < l.bottom && u.bottom > l.top;
    }, Wt = function(u) {
      var l = u.element, r = u.posDirection, v = u.containerRect, c = u.useTransform, y = Fr(l, c), x = Y(y, "+", r);
      qe(l, x, c);
      var k = l.getBoundingClientRect(), D = Ut({
        elementRect: k,
        containerRect: v
      });
      qr({
        element: l,
        edges: D,
        elementRect: k,
        containerRect: v,
        elementPos: x,
        useTransform: c
      });
    }, Qr = function(u, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), u.disconnect();
    }, ei = function(u, l, r) {
      if (!!l.length) {
        var v = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? v || document.body : u, y = l.includes("top") && c.scrollTop > 0, x = l.includes("bottom") && c.scrollTop < c.scrollHeight, k = l.includes("left") && c.scrollLeft > 0, D = l.includes("right") && c.scrollLeft < c.scrollWidth;
        y && (c.scrollTop -= 1 * r), x && (c.scrollTop += 1 * r), k && (c.scrollLeft -= 1 * r), D && (c.scrollLeft += 1 * r);
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
        var T = ae(D[k], 2), z = T[0], K = T[1];
        ["pre", !1].forEach(function(re) {
          return l(re ? "".concat(z, ":").concat(re) : z, function(pe) {
            return K.forEach(function(oe) {
              return (!oe.condition || oe.condition(pe)) && r(re ? "".concat(re).concat(oe.name) : oe.name, f({
                items: c.elements,
                isDragging: v.isDragging
              }, pe));
            });
          });
        });
      }, k = 0, D = Object.entries(y); k < D.length; k++)
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
        }), i(this, "scroll", function(x, k) {
          var D = {
            scroll_directions: x,
            scroll_multiplier: k
          };
          r.PubSub.publish("Area:scroll:pre", D), ei(r._node, x, k), r.PubSub.publish("Area:scroll", D);
        }), this._zoom = y, this.PubSub = c, this.setArea(v), this._modificationCallback = nt(function(x) {
          r.PubSub.publish("Area:modified:pre", {
            event: x,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: x,
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
          return this._rect ? this._rect : this._rect = bt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function v(c) {
            var y, x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, k = (y = c[x]) === null || y === void 0 ? void 0 : y.parentNode;
            return k ? (c.push(k), x++, v(c, x)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), ii = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.dragKeys, y = l.draggability, x = l.keyboardDrag, k = l.keyboardDragSpeed, D = l.useTransform, O = l.zoom;
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
            r._elements.forEach(function(oe) {
              return Wt({
                element: oe,
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
        }), this.DS = v, this._useTransform = D, this._keyboardDragSpeed = k, this._keyboardDrag = x, this._zoom = O, this._draggability = y, this._dragKeys = {
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
      return a(u, [{
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
    }(), oi = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.areaElement, y = l.draggability, x = l.immediateDrag, k = l.selectableClass;
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
            var T = r.DS, z = T.stores, K = z.PointerStore, re = z.KeyStore, pe = T.SelectableSet, oe = T.SelectedSet;
            K.start(O);
            var ze = O.target;
            !pe.has(ze) || (re.isMultiSelectKeyPressed(O) || oe.clear(), oe.toggle(ze), r.reset());
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
        }), this._areaElement = c, this._draggability = y, this._immediateDrag = x, this._selectableClass = k, this.DS = v, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(D) {
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
      return a(u, [{
        key: "_canInteract",
        value: function(r) {
          var v = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !v && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ni = function u(l) {
      var r = this, v = l.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(c, y) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(y), r.subscribers[c].length - 1;
      }), i(this, "unsubscribe", function(c, y, x) {
        x >= 0 ? r.subscribers[c].splice(x, 1) : y && (r.subscribers[c] = r.subscribers[c].filter(function(k) {
          return k !== y;
        }));
      }), i(this, "publish", function(c, y) {
        Array.isArray(c) ? c.forEach(function(x) {
          return r._publish(x, y);
        }) : r._publish(c, y);
      }), i(this, "_publish", function(c, y) {
        var x = r.subscribers[c];
        !Array.isArray(x) || (c.includes(":pre") ? r._handlePrePublish(x, y) : r._handlePublish(x, y));
      }), i(this, "_handlePublish", function(c, y) {
        for (var x = 0, k = c.length; x < k; x++) {
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
    }, ai = /* @__PURE__ */ function(u) {
      g(r, u);
      var l = V(r);
      function r(v) {
        var c, y = v.elements, x = v.className, k = v.hoverClassName, D = v.draggability, O = v.useTransform, T = v.DS;
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
        }), c.DS = T, c._initElements = Ve(y), c._className = x, c._hoverClassName = k, c._useTransform = O, c._draggability = D, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return a(r, [{
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
    }(/* @__PURE__ */ S(Set)), si = /* @__PURE__ */ function(u) {
      g(r, u);
      var l = V(r);
      function r(v) {
        var c, y = v.className, x = v.DS;
        return t(this, r), c = l.call(this), i(E(c), "_className", void 0), i(E(c), "clear", function() {
          return c.forEach(function(k) {
            return c.delete(k);
          });
        }), i(E(c), "addAll", function(k) {
          return k.forEach(function(D) {
            return c.add(D);
          });
        }), i(E(c), "deleteAll", function(k) {
          return k.forEach(function(D) {
            return c.delete(D);
          });
        }), c.DS = x, c._className = y, c;
      }
      return a(r, [{
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
    }(/* @__PURE__ */ S(Set)), li = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.hoverClassName, y = l.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(x) {
          var k = x.event, D = x.isDragging;
          D || (r._storePrevious(k), r._handleInsideSelection(!0, k));
        }), i(this, "update", function(x) {
          var k = x.isDragging;
          k || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(x, k) {
          for (var D = r.DS, O = D.SelectableSet, T = D.SelectorArea, z = D.Selector, K = O.elements.map(function(Ce) {
            return [Ce, Ce.getBoundingClientRect()];
          }), re = [], pe = [], oe = 0, ze = K.length; oe < ze; oe++)
            !T.isInside(K[oe][0], K[oe][1]) || (yt(K[oe][1], z.rect) ? re.push(K[oe][0]) : pe.push(K[oe][0]));
          var at = r.DS.stores.KeyStore.isMultiSelectKeyPressed(k) && r._multiSelectToggling;
          r.DS.continue || (re.forEach(function(Ce) {
            return Jr({
              element: Ce,
              force: x,
              multiSelectionToggle: at,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), pe.forEach(function(Ce) {
            return Zr({
              element: Ce,
              force: x,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = y, this.DS = v, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return a(u, [{
        key: "_storePrevious",
        value: function(r) {
          var v = this.DS, c = v.stores.KeyStore, y = v.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(y) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.selector, y = l.selectorClass, x = l.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(k) {
          var D = k.isDragging;
          if (!D) {
            var O = r.DS.stores.PointerStore, T = O.initialValArea;
            Xt(r.HTMLNode, ie(T, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(k) {
          var D = k.isDragging;
          if (!(D || r.DS.continue)) {
            var O = r.DS.stores, T = O.ScrollStore, z = O.PointerStore, K = Yr({
              scrollAmount: T.scrollAmount,
              initialPointerPos: z.initialValArea,
              pointerPos: z.currentValArea
            });
            Xt(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = v, this.HTMLNode = c || ot(x), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return a(u, [{
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
          var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", D = document.body ? "body" : "documentElement", O = "".concat(k, "Child");
          r.HTMLNode[O](r.DS.Selector.HTMLNode), document[D][O](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var k = r.DS.Area.rect, D = r.DS.Area.computedBorder, O = r.HTMLNode.style, T = "".concat(k.top + D.top, "px"), z = "".concat(k.left + D.left, "px"), K = "".concat(k.width, "px"), re = "".concat(k.height, "px");
          O.top !== T && (O.top = T), O.left !== z && (O.left = z), O.width !== K && (O.width = K), O.height !== re && (O.height = re);
        }), i(this, "stop", function(k) {
          r.stopAutoScroll(), k && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var k = r.DS, D = k.stores.PointerStore, O = k.Area;
            r.currentEdges = Ut({
              elementRect: ie(D.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && O.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(k, D) {
          return r.DS.Area.HTMLNode.contains(k) && r.DS.stores.ScrollStore.canScroll ? !0 : yt(r.rect, D || k.getBoundingClientRect());
        }), this._autoScrollSpeed = y, this._overflowTolerance = x, this.DS = v, this.HTMLNode = it(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return a(u, [{
        key: "isClicked",
        value: function(r) {
          var v = this.DS.stores.PointerStore, c = r ? v.getPointerPosition(r) : v.initialVal;
          return yt({
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
          var k = x.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: x,
            key: k
          }), r._currentValues.add(k), r.DS.publish("KeyStore:down", {
            event: x,
            key: k
          });
        }), i(this, "keyup", function(x) {
          var k = x.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: x,
            key: k
          }), r._currentValues.delete(k), r.DS.publish("KeyStore:up", {
            event: x,
            key: k
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = v, this._multiSelectMode = y, this._multiSelectKeys = c.map(function(x) {
          var k = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, D = k[x];
          return D ? (console.warn("[DragSelect] ".concat(x, ' is deprecated. Use "').concat(D, '" instead. Act Now!. See docs for more info')), D.toLowerCase()) : x.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return a(u, [{
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
          r._currentVal = r._initialVal = je(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "update", function() {
          return r._currentVal = je(r._areaElement);
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
      return a(u, [{
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
          return this._currentVal || (this._currentVal = je(this._areaElement)), this._currentVal;
        }
      }]), u;
    }(), mi = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.area, c = v === void 0 ? document : v, y = l.selectables, x = y === void 0 ? [] : y, k = l.autoScrollSpeed, D = k === void 0 ? 5 : k, O = l.overflowTolerance, T = O === void 0 ? {
          x: 25,
          y: 25
        } : O, z = l.zoom, K = z === void 0 ? 1 : z, re = l.customStyles, pe = re === void 0 ? !1 : re, oe = l.multiSelectMode, ze = oe === void 0 ? !1 : oe, at = l.multiSelectToggling, Ce = at === void 0 ? !0 : at, Ft = l.multiSelectKeys, pi = Ft === void 0 ? ["Control", "Shift", "Meta"] : Ft, qt = l.selector, gi = qt === void 0 ? void 0 : qt, Gt = l.draggability, wt = Gt === void 0 ? !0 : Gt, Jt = l.immediateDrag, vi = Jt === void 0 ? !0 : Jt, Zt = l.keyboardDrag, bi = Zt === void 0 ? !0 : Zt, yi = l.dragKeys, Qt = l.keyboardDragSpeed, wi = Qt === void 0 ? 10 : Qt, er = l.useTransform, tr = er === void 0 ? !0 : er, rr = l.hoverClass, ir = rr === void 0 ? "ds-hover" : rr, or = l.selectableClass, nr = or === void 0 ? "ds-selectable" : or, ar = l.selectedClass, xi = ar === void 0 ? "ds-selected" : ar, sr = l.selectorClass, _i = sr === void 0 ? "ds-selector" : sr, lr = l.selectorAreaClass, ki = lr === void 0 ? "ds-selector-area" : lr, Si = l.callback, Di = l.onDragMove, Mi = l.onDragStartBegin, Ci = l.onDragStart, $i = l.onElementSelect, Ei = l.onElementUnselect;
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
        }), this.PubSub = new ni({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Si,
          onDragMove: Di,
          onDragStart: Ci,
          onDragStartBegin: Mi,
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
        }), this.SelectableSet = new ai({
          elements: x,
          DS: this,
          className: nr,
          hoverClassName: ir,
          useTransform: tr,
          draggability: wt
        }), this.SelectedSet = new si({
          DS: this,
          className: xi
        }), this.Selection = new li({
          DS: this,
          hoverClassName: ir,
          multiSelectToggling: Ce
        }), this.Drag = new ii({
          DS: this,
          draggability: wt,
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
        }), this.Interaction = new oi({
          areaElement: c,
          DS: this,
          draggability: wt,
          immediateDrag: vi,
          selectableClass: nr
        }), ti({
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
          var v = r.callback, c = r.onDragMove, y = r.onDragStart, x = r.onDragStartBegin, k = r.onElementSelect, D = r.onElementUnselect, O = function(z, K) {
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
          })), k && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function(T) {
            T.items;
            var z = T.item, K = T.event;
            return k(z, K);
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
const So = $r.exports, Do = (n, e, t, o, a) => (e = Math, t = e.log, o = 1024, a = t(n) / t(o) | 0, n / e.pow(o, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B"), Mo = (n, e = "en-US") => new Date(n * 1e3).toLocaleString(e), Co = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, $o = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Eo = [
  $o
], To = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Ao = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Oo = [
  Ao
], Po = {
  name: "VFSortIcon"
}, lt = /* @__PURE__ */ Object.assign(Po, {
  props: { direction: String },
  setup(n) {
    return (e, t) => (w(), C("div", null, [
      n.direction == "down" ? (w(), C("svg", Co, Eo)) : q("", !0),
      n.direction == "up" ? (w(), C("svg", To, Oo)) : q("", !0)
    ]));
  }
}), Io = ["onClick"], No = {
  name: "VFToast.vue"
}, Lo = /* @__PURE__ */ Object.assign(No, {
  setup(n) {
    const e = B("emitter"), { getStore: t } = B("storage"), o = P(t("full-screen", !1)), a = (g) => g == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = P([]), s = (g) => {
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
    }), (g, m) => (w(), C("div", {
      class: de([o.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      we(Ai, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: F(() => [
          (w(!0), C(ce, null, be(i.value, (d, p) => (w(), C("div", {
            onClick: (b) => s(p),
            key: d,
            class: de([a(d.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, $(d.label), 11, Io))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Ne = (n) => Object.entries(n).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: jo } = Se(), $t = (n, e) => jo.value + "?" + Ne({ q: "preview", adapter: n, path: e }), Vo = { class: "relative flex-auto flex flex-col overflow-hidden" }, zo = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Bo = { class: "absolute" }, Ro = /* @__PURE__ */ h("svg", {
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
], -1), Ho = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Uo = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Ko = { class: "grid grid-cols-12 items-center" }, Yo = { class: "flex col-span-7 items-center" }, Wo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xo = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Fo = [
  Xo
], qo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Go = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jo = [
  Go
], Zo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Qo = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, en = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], tn = { class: "grid grid-cols-12 items-center" }, rn = { class: "flex col-span-7 items-center" }, on = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, nn = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), an = [
  nn
], sn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ln = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), cn = [
  ln
], un = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, dn = { class: "col-span-2 text-center" }, hn = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, fn = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], mn = { class: "relative" }, pn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gn = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vn = [
  gn
], bn = ["src"], yn = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wn = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xn = [
  wn
], _n = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, kn = { class: "break-all" }, Sn = {
  name: "VFExplorer"
}, Dn = /* @__PURE__ */ Object.assign(Sn, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(n) {
    const e = n, t = B("emitter"), { setStore: o, getStore: a } = B("storage"), i = (j) => j == null ? void 0 : j.substring(0, 3), s = (j) => j.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = P(null), g = P(null), m = P(0), d = P(null), { t: p } = B("i18n"), b = Math.floor(Math.random() * 2 ** 32), A = P(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      A.value = !A.value, o("full-screen", A.value);
    });
    const S = P("");
    t.on("vf-search-query", ({ newQuery: j }) => {
      S.value = j, j ? t.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: j
        },
        onSuccess: (H) => {
          t.emit("vf-toast-clear"), H.files.length || t.emit("vf-toast-push", { label: p("No search result found.") });
        }
      }) : t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let E = null;
    const L = () => {
      E && clearTimeout(E);
    }, V = (j) => {
      E = setTimeout(() => {
        R(j);
      }, 500);
    }, R = (j) => {
      j.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: j.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: j });
    }, I = ht({ active: !1, column: "", order: "" }), ae = (j = !0) => {
      let H = [...e.data.files], N = I.column, Y = I.order == "asc" ? 1 : -1;
      if (!j)
        return H;
      const U = (ie, Q) => typeof ie == "string" && typeof Q == "string" ? ie.toLowerCase().localeCompare(Q.toLowerCase()) : ie < Q ? -1 : ie > Q ? 1 : 0;
      return I.active && (H = H.slice().sort((ie, Q) => U(ie[N], Q[N]) * Y)), H;
    }, J = (j) => {
      I.active && I.column == j ? (I.active = I.order == "asc", I.column = j, I.order = "desc") : (I.active = !0, I.column = j, I.order = "asc");
    }, M = () => d.value.getSelection().map((j) => JSON.parse(j.dataset.item)), X = (j, H) => {
      if (j.altKey || j.ctrlKey || j.metaKey)
        return j.preventDefault(), !1;
      j.dataTransfer.setDragImage(g.value, 0, 15), j.dataTransfer.effectAllowed = "all", j.dataTransfer.dropEffect = "copy", j.dataTransfer.setData("items", JSON.stringify(M()));
    }, Z = (j, H) => {
      j.preventDefault();
      let N = JSON.parse(j.dataTransfer.getData("items"));
      if (N.find((Y) => Y.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: N, to: H } });
    }, ue = (j, H) => {
      j.preventDefault(), !H || H.type !== "dir" || d.value.getSelection().find((N) => N == j.currentTarget) ? (j.dataTransfer.dropEffect = "none", j.dataTransfer.effectAllowed = "none") : j.dataTransfer.dropEffect = "copy";
    };
    return _e(() => {
      d.value = new So({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => gt(() => {
        d.value.clearSelection(), d.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), d.value.subscribe("predragstart", ({ event: j, isDragging: H }) => {
        if (H)
          m.value = d.value.getSelection().length, d.value.break();
        else {
          const N = j.target.offsetWidth - j.offsetX, Y = j.target.offsetHeight - j.offsetY;
          N < 15 && Y < 15 && (d.value.clearSelection(), d.value.break());
        }
      }), d.value.subscribe("predragmove", ({ isDragging: j }) => {
        j && d.value.break();
      }), d.value.subscribe("callback", ({ items: j, event: H, isDragging: N }) => {
        t.emit("vf-nodes-selected", M()), m.value = d.value.getSelection().length;
      });
    }), Oi(() => d.value.start()), _e(() => {
      pt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (j, H) => (w(), C("div", Vo, [
      n.view == "list" || S.value.length ? (w(), C("div", zo, [
        h("div", {
          onClick: H[0] || (H[0] = (N) => J("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          le($(_(p)("Name")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "basename"]
          ])
        ]),
        S.value.length ? q("", !0) : (w(), C("div", {
          key: 0,
          onClick: H[1] || (H[1] = (N) => J("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          le($(_(p)("Size")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "file_size"]
          ])
        ])),
        S.value.length ? q("", !0) : (w(), C("div", {
          key: 1,
          onClick: H[2] || (H[2] = (N) => J("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          le($(_(p)("Date")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "last_modified"]
          ])
        ])),
        S.value.length ? (w(), C("div", {
          key: 2,
          onClick: H[3] || (H[3] = (N) => J("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          le($(_(p)("Filepath")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      h("div", Bo, [
        h("div", {
          ref_key: "dragImage",
          ref: g,
          class: "absolute -z-50 -top-96"
        }, [
          Ro,
          h("div", Ho, $(m.value), 1)
        ], 512)
      ]),
      h("div", {
        class: de([A.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f,
        onContextmenu: H[7] || (H[7] = Pe((N) => _(t).emit("vf-contextmenu-show", { event: N, area: f.value, items: M() }), ["self", "prevent"]))
      }, [
        S.value.length ? (w(!0), C(ce, { key: 0 }, be(ae(), (N, Y) => (w(), C("div", {
          onDblclick: (U) => R(N),
          onTouchstart: (U) => V(N),
          onTouchend: H[4] || (H[4] = (U) => L()),
          onContextmenu: Pe((U) => _(t).emit("vf-contextmenu-show", { event: U, area: f.value, items: M(), target: N }), ["prevent"]),
          class: de(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          h("div", Ko, [
            h("div", Yo, [
              N.type == "dir" ? (w(), C("svg", Wo, Fo)) : (w(), C("svg", qo, Jo)),
              h("span", Zo, $(N.basename), 1)
            ]),
            h("div", Qo, $(N.path), 1)
          ])
        ], 42, Uo))), 256)) : q("", !0),
        n.view == "list" && !S.value.length ? (w(!0), C(ce, { key: 1 }, be(ae(), (N, Y) => (w(), C("div", {
          draggable: "true",
          onDblclick: (U) => R(N),
          onTouchstart: (U) => V(N),
          onTouchend: H[5] || (H[5] = (U) => L()),
          onContextmenu: Pe((U) => _(t).emit("vf-contextmenu-show", { event: U, area: f.value, items: M(), target: N }), ["prevent"]),
          onDragstart: (U) => X(U),
          onDragover: (U) => ue(U, N),
          onDrop: (U) => Z(U, N),
          class: de(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          h("div", tn, [
            h("div", rn, [
              N.type == "dir" ? (w(), C("svg", on, an)) : (w(), C("svg", sn, cn)),
              h("span", un, $(N.basename), 1)
            ]),
            h("div", dn, $(N.file_size ? _(Do)(N.file_size) : ""), 1),
            h("div", hn, $(_(Mo)(N.last_modified)), 1)
          ])
        ], 42, en))), 256)) : q("", !0),
        n.view == "grid" && !S.value.length ? (w(!0), C(ce, { key: 2 }, be(ae(!1), (N, Y) => {
          var U, ie;
          return w(), C("div", {
            draggable: "true",
            onDblclick: (Q) => R(N),
            onTouchstart: (Q) => V(N),
            onTouchend: H[6] || (H[6] = (Q) => L()),
            onContextmenu: Pe((Q) => _(t).emit("vf-contextmenu-show", { event: Q, area: f.value, items: M(), target: N }), ["prevent"]),
            onDragstart: (Q) => X(Q),
            onDragover: (Q) => ue(Q, N),
            onDrop: (Q) => Z(Q, N),
            class: de(["vf-item-" + _(b), "border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"]),
            "data-type": N.type,
            "data-item": JSON.stringify(N),
            "data-index": Y
          }, [
            h("div", null, [
              h("div", mn, [
                N.type == "dir" ? (w(), C("svg", pn, vn)) : ((U = N.mime_type) != null ? U : "").startsWith("image") ? (w(), C("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: _($t)(_(a)("adapter", e.data.adapter), N.path),
                  alt: ""
                }, null, 8, bn)) : (w(), C("svg", yn, xn)),
                ((ie = N.mime_type) != null ? ie : "").startsWith("image") ? q("", !0) : (w(), C("div", _n, $(i(N.extension)), 1))
              ]),
              h("span", kn, $(s(N.basename)), 1)
            ])
          ], 42, fn);
        }), 256)) : q("", !0)
      ], 34),
      we(Lo)
    ]));
  }
}), Mn = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Cn = { class: "flex leading-5 items-center" }, $n = ["aria-label"], En = /* @__PURE__ */ h("svg", {
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
], -1), Tn = [
  En
], An = ["value"], On = { class: "ml-3" }, Pn = { key: 0 }, In = { class: "ml-1" }, Nn = { class: "flex leading-5 items-center" }, Ln = {
  value: "",
  disabled: ""
}, jn = /* @__PURE__ */ h("option", { value: "tr" }, "Turkish", -1), Vn = /* @__PURE__ */ h("option", { value: "en" }, "English", -1), zn = /* @__PURE__ */ h("option", { value: "fr" }, "French", -1), Bn = ["aria-label"], Rn = /* @__PURE__ */ h("svg", {
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
], -1), Hn = [
  Rn
], Un = {
  name: "VFStatusbar"
}, Kn = /* @__PURE__ */ Object.assign(Un, {
  props: {
    data: Object
  },
  setup(n) {
    var b;
    const e = n, t = B("emitter"), { getStore: o, setStore: a } = B("storage"), i = P(0), s = P((b = o("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: g } = B("i18n"), m = P(o("locale", "")), d = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: s.value } }), a("adapter", s.value);
    };
    t.on("vf-nodes-selected", (A) => {
      i.value = A.length;
    });
    const p = P("");
    return t.on("vf-search-query", ({ newQuery: A }) => {
      p.value = A;
    }), (A, S) => (w(), C("div", Mn, [
      h("div", Cn, [
        h("div", {
          class: "mx-2",
          "aria-label": _(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Tn, 8, $n),
        ve(h("select", {
          "onUpdate:modelValue": S[0] || (S[0] = (E) => s.value = E),
          onChange: d,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (w(!0), C(ce, null, be(n.data.storages, (E) => (w(), C("option", { value: E }, $(E), 9, An))), 256))
        ], 544), [
          [cr, s.value]
        ]),
        h("div", On, [
          p.value.length ? (w(), C("span", Pn, $(n.data.files.length) + " items found. ", 1)) : q("", !0),
          h("span", In, $(i.value > 0 ? i.value + " " + _(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      h("div", Nn, [
        ve(h("select", {
          "onUpdate:modelValue": S[1] || (S[1] = (E) => m.value = E),
          onChange: S[2] || (S[2] = (E) => _(g)(E.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          h("option", Ln, $(_(f)("Language")), 1),
          jn,
          Vn,
          zn
        ], 544), [
          [cr, m.value]
        ]),
        h("span", {
          "aria-label": _(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: S[3] || (S[3] = (E) => _(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: _(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Hn, 8, Bn)
      ])
    ]));
  }
}), Yn = (n, e = 0, t = !1) => {
  let o;
  return (...a) => {
    t && !o && n(...a), clearTimeout(o), o = setTimeout(() => {
      n(...a);
    }, e);
  };
}, Wn = (n, e, t) => {
  const o = P(n);
  return Pi((i, s) => ({
    get() {
      return i(), o.value;
    },
    set: Yn(
      (f) => {
        o.value = f, s();
      },
      e,
      t
    )
  }));
}, Xn = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Fn = ["aria-label"], qn = /* @__PURE__ */ h("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Gn = [
  qn
], Jn = ["onClick"], Zn = /* @__PURE__ */ h("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Qn = [
  Zn
], ea = { class: "flex leading-5" }, ta = /* @__PURE__ */ h("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), ra = ["title", "onClick"], ia = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, oa = /* @__PURE__ */ h("svg", {
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
], -1), na = ["onKeydown", "placeholder"], aa = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), sa = [
  aa
], la = {
  name: "VFBreadcrumb"
}, ca = /* @__PURE__ */ Object.assign(la, {
  props: {
    data: Object
  },
  setup(n) {
    const e = n, t = B("emitter"), { getStore: o } = B("storage"), a = P(null), i = P([]), s = P(!1), f = P(null), { t: g } = B("i18n");
    t.on("vf-explorer-update", () => {
      var R;
      let L = [], V = [];
      a.value = (R = e.data.dirname) != null ? R : o("adapter", "local") + "://", a.value.length == 0 && (i.value = []), a.value.replace(o("adapter", "local") + "://", "").split("/").forEach(function(I) {
        L.push(I), L.join("/") != "" && V.push({
          basename: I,
          name: I,
          path: o("adapter", "local") + "://" + L.join("/"),
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
      s.value = !0, gt(() => f.value.focus());
    }, p = Wn("", 400);
    pt(p, (L) => {
      t.emit("vf-search-query", { newQuery: L });
    });
    const b = () => i.value.length && !s.value, A = (L) => {
      var R;
      L.preventDefault();
      let V = JSON.parse(L.dataTransfer.getData("items"));
      if (V.find((I) => I.storage != o("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: V, to: (R = i.value[i.value.length - 2]) != null ? R : { path: o("adapter", "local") + "://" } }
      });
    }, S = (L) => {
      L.preventDefault(), b() ? L.dataTransfer.dropEffect = "copy" : (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none");
    }, E = () => {
      p.value == "" && m();
    };
    return (L, V) => (w(), C("div", Xn, [
      h("span", {
        "aria-label": _(g)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (w(), C("svg", {
          onDragover: V[0] || (V[0] = (R) => S(R)),
          onDrop: V[1] || (V[1] = (R) => A(R)),
          onClick: V[2] || (V[2] = (R) => {
            var I, ae;
            return !b() || _(t).emit("vf-fetch", { params: { q: "index", adapter: n.data.adapter, path: (ae = (I = i.value[i.value.length - 2]) == null ? void 0 : I.path) != null ? ae : _(o)("adapter", "local") + "://" } });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Gn, 34))
      ], 8, Fn),
      s.value ? (w(), C("div", ia, [
        oa,
        ve(h("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ye(m, ["esc"]),
          onBlur: E,
          "onUpdate:modelValue": V[4] || (V[4] = (R) => Ii(p) ? p.value = R : null),
          placeholder: _(g)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, na), [
          [We, _(p)]
        ]),
        (w(), C("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: m,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, sa))
      ])) : (w(), C("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Pe(d, ["self"])
      }, [
        (w(), C("svg", {
          onClick: V[3] || (V[3] = (R) => _(t).emit("vf-fetch", { params: { q: "index", adapter: n.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Qn)),
        h("div", ea, [
          (w(!0), C(ce, null, be(i.value, (R, I) => (w(), C("div", { key: I }, [
            ta,
            h("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: R.basename,
              onClick: (ae) => _(t).emit("vf-fetch", { params: { q: "index", adapter: n.data.adapter, path: R.path } })
            }, $(R.name), 9, ra)
          ]))), 128))
        ])
      ], 8, Jn))
    ]));
  }
}), ua = ["onClick"], da = /* @__PURE__ */ h("span", { class: "px-1" }, null, -1), ha = {
  name: "VFContextMenu"
}, fa = /* @__PURE__ */ Object.assign(ha, {
  props: {
    current: Object
  },
  setup(n) {
    const e = n, t = B("emitter"), o = P(null), { apiUrl: a } = Se(), i = ht({
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
          const b = a.value + "?" + Ne({ q: "download", adapter: s.value[0].adapter, path: s.value[0].path });
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
    }), t.on("vf-contextmenu-show", ({ event: b, area: A, items: S, target: E = null }) => {
      if (i.items = [], d.value)
        if (E)
          i.items.push(g.openDir), t.emit("vf-context-selected", [E]), console.log("search item selected");
        else
          return;
      else
        !E && !d.value ? (i.items.push(g.refresh), i.items.push(g.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : S.length > 1 && S.some((L) => L.path === E.path) ? (i.items.push(g.refresh), i.items.push(g.archive), i.items.push(g.delete), t.emit("vf-context-selected", S), console.log(S.length + " selected (more than 1 item.)")) : (E.type == "dir" ? i.items.push(g.open) : (i.items.push(g.preview), i.items.push(g.download)), i.items.push(g.rename), E.mime_type == "application/zip" ? i.items.push(g.unarchive) : i.items.push(g.archive), i.items.push(g.delete), t.emit("vf-context-selected", [E]), console.log(E.type + " is selected"));
      p(b, A);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (b, A) => {
      i.active = !0, gt(() => {
        let S = A.getBoundingClientRect(), E = b.pageX, L = b.pageY, V = o.value.offsetHeight, R = o.value.offsetWidth;
        E = S.right - b.pageX + window.scrollX < R ? E - R : E, L = S.bottom - b.pageY + window.scrollY < V ? L - V : L, i.positions = {
          left: E + "px",
          top: L + "px"
        };
      });
    };
    return (b, A) => i.active ? (w(), C("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: o,
      style: Cr(i.positions)
    }, [
      (w(!0), C(ce, null, be(i.items, (S) => (w(), C("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: S.title,
        onClick: (E) => m(S)
      }, [
        da,
        h("span", null, $(S.title()), 1)
      ], 8, ua))), 128))
    ], 4)) : q("", !0);
  }
}), ma = (n, e) => {
  const t = n[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((o, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function pa(n) {
  const e = await ma(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.fee60fe4.js"), "../locales/tr.json": () => import("./tr.df99b8f1.js") }), `../locales/${n}.json`);
  return JSON.parse(e.default);
}
function ga(n, e) {
  const { getStore: t, setStore: o } = Ct(n), a = ["en", "tr"], i = P({}), s = (m) => {
    a.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), pa(m).then((d) => {
      i.value = d, o("locale", m), o("translations", d), console.log(m + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : s(e);
  const f = (m, ...d) => d.length ? f(m = m.replace("%s", d.shift()), ...d) : m;
  function g(m, ...d) {
    return i.value.hasOwnProperty(m) ? f(i.value[m], ...d) : m;
  }
  return { t: g, support_locales: a, changeLocale: s };
}
const va = ["aria-label"], ba = /* @__PURE__ */ h("svg", {
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
], -1), ya = [
  ba
], wa = {
  name: "Message"
}, De = /* @__PURE__ */ Object.assign(wa, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    var s;
    const { t: e } = B("i18n"), t = P(!1), o = P(null), a = P((s = o.value) == null ? void 0 : s.strMessage);
    pt(a, () => t.value = !1);
    const i = () => t.value = !0;
    return (f, g) => (w(), C("div", null, [
      t.value ? q("", !0) : (w(), C("div", {
        key: 0,
        ref_key: "strMessage",
        ref: o,
        class: de(["flex mt-1 p-1 px-2 rounded text-sm", n.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Mt(f.$slots, "default"),
        h("div", {
          class: "ml-auto cursor-pointer",
          onClick: i,
          "aria-label": _(e)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, ya, 8, va)
      ], 2))
    ]));
  }
}), xa = /* @__PURE__ */ h("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), _a = {
  name: "VueFinder"
}, ka = /* @__PURE__ */ Object.assign(_a, {
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
  setup(n) {
    const e = n, t = Li(), { setStore: o, getStore: a } = Ct(e.id);
    xt("emitter", t), xt("storage", Ct(e.id));
    const i = ga(e.id, e.locale);
    xt("i18n", i);
    const { apiUrl: s, setApiUrl: f } = Se();
    f(e.url);
    const g = ht({ adapter: "local", storages: [], dirname: ".", files: [] }), m = P(a("viewport", "grid")), d = P(a("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      d.value = !d.value, o("darkMode", d.value);
    });
    const p = P(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      p.value = !p.value, o("full-screen", p.value);
    }), t.on("vf-view-toggle", (S) => {
      m.value = S;
    });
    const b = ht({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      b.active = !1;
    }), t.on("vf-modal-show", (S) => {
      b.active = !0, b.type = S.type, b.data = S;
    });
    const A = (S) => {
      Object.assign(g, S), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", ({ params: S, onSuccess: E = null, onError: L = null }) => {
      ft(s.value, { params: S }).then((V) => {
        t.emit("vf-modal-close"), A(V), E(V);
      }).catch((V) => {
        L && L(V);
      });
    }), t.on("vf-download", (S) => {
      document.getElementById("download_frame").src = S, t.emit("vf-modal-close");
    }), _e(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: a("adapter", g.adapter) } });
    }), (S, E) => (w(), C("div", {
      class: de(d.value ? "dark" : "")
    }, [
      h("div", {
        class: de([p.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Cr(p.value ? "" : "max-height: " + n.maxHeight),
        onMousedown: E[0] || (E[0] = (L) => _(t).emit("vf-contextmenu-hide"))
      }, [
        we(_o, { data: g }, null, 8, ["data"]),
        we(ca, { data: g }, null, 8, ["data"]),
        we(Dn, {
          view: m.value,
          data: g
        }, null, 8, ["view", "data"]),
        we(Kn, { data: g }, null, 8, ["data"])
      ], 38),
      b.active ? (w(), G(Ni("v-f-modal-" + b.type), {
        key: 0,
        selection: b.data,
        current: g
      }, null, 8, ["selection", "current"])) : q("", !0),
      we(fa, { current: g }, null, 8, ["current"]),
      xa
    ], 2));
  }
}), Sa = /* @__PURE__ */ h("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Da = { class: "fixed z-10 inset-0 overflow-y-auto" }, Ma = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, Ca = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, $a = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Me = {
  __name: "ModalLayout",
  setup(n) {
    const e = B("emitter");
    return _e(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, o) => (w(), C("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = Ye((a) => _(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Sa,
      h("div", Da, [
        h("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = Pe((a) => _(e).emit("vf-modal-close"), ["self"]))
        }, [
          h("div", Ma, [
            h("div", Ca, [
              Mt(t.$slots, "default")
            ]),
            h("div", $a, [
              Mt(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Ea = { class: "sm:flex sm:items-start" }, Ta = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Aa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Oa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Pa = { class: "mt-2" }, Ia = { class: "text-sm text-gray-500" }, Na = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, La = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ja = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Va = [
  ja
], za = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ba = /* @__PURE__ */ h("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ra = [
  Ba
], Ha = { class: "ml-1.5" }, Ua = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Ka = {
  name: "VFModalDelete"
}, Ya = /* @__PURE__ */ Object.assign(Ka, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const e = n, t = B("emitter"), { getStore: o } = B("storage"), { t: a } = B("i18n"), i = P(e.selection.items), s = P(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(i.value.map(({ path: g, type: m }) => ({ path: g, type: m })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("Files deleted.") });
        },
        onError: (g) => {
          s.value = a(g.message);
        }
      });
    };
    return (g, m) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Yes, Delete!")), 1),
        h("button", {
          type: "button",
          onClick: m[0] || (m[0] = (d) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1),
        h("div", Ua, $(_(a)("This action cannot be undone.")), 1)
      ]),
      default: F(() => [
        h("div", Ea, [
          Ta,
          h("div", Aa, [
            h("h3", Oa, $(_(a)("Delete files")), 1),
            h("div", Pa, [
              h("p", Ia, $(_(a)("Are you sure you want to delete these files ?")), 1),
              (w(!0), C(ce, null, be(i.value, (d) => (w(), C("p", Na, [
                d.type == "dir" ? (w(), C("svg", La, Va)) : (w(), C("svg", za, Ra)),
                h("span", Ha, $(d.basename), 1)
              ]))), 256)),
              s.value.length ? (w(), G(De, {
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
}), Wa = { class: "sm:flex sm:items-start" }, Xa = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Fa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, qa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ga = { class: "mt-2" }, Ja = { class: "text-sm text-gray-500" }, Za = {
  name: "VFModalMessage"
}, Qa = /* @__PURE__ */ Object.assign(Za, {
  props: {
    selection: Object
  },
  setup(n) {
    const e = B("emitter"), { t } = B("i18n");
    return (o, a) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => _(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(t)("Close")), 1)
      ]),
      default: F(() => {
        var i, s, f, g;
        return [
          h("div", Wa, [
            Xa,
            h("div", Fa, [
              h("h3", qa, $((s = (i = n.selection) == null ? void 0 : i.title) != null ? s : "Title"), 1),
              h("div", Ga, [
                h("p", Ja, $((g = (f = n.selection) == null ? void 0 : f.message) != null ? g : "Message") + ".", 1)
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
}, os = { class: "mt-2" }, ns = { class: "text-sm text-gray-500" }, as = ["onKeyup", "placeholder"], ss = {
  name: "VFModalNewFolder"
}, ls = /* @__PURE__ */ Object.assign(ss, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const e = n, t = B("emitter"), { getStore: o } = B("storage"), { t: a } = B("i18n"), i = P(""), s = P(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("%s is created.", i.value) });
        },
        onError: (g) => {
          s.value = a(g.message);
        }
      });
    };
    return (g, m) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Create")), 1),
        h("button", {
          type: "button",
          onClick: m[1] || (m[1] = (d) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", es, [
          ts,
          h("div", rs, [
            h("h3", is, $(_(a)("New Folder")), 1),
            h("div", os, [
              h("p", ns, $(_(a)("Create a new folder")), 1),
              ve(h("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => i.value = d),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Folder Name"),
                type: "text"
              }, null, 40, as), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(De, {
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
  setup(n) {
    const e = n, t = B("emitter"), { getStore: o } = B("storage"), { t: a } = B("i18n"), i = P(""), s = P(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("%s is created.", i.value) });
        },
        onError: (g) => {
          s.value = a(g.message);
        }
      });
    };
    return (g, m) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        h("button", {
          type: "button",
          onClick: m[1] || (m[1] = (d) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: F(() => [
        h("div", cs, [
          us,
          h("div", ds, [
            h("h3", hs, $(_(a)("New File")), 1),
            h("div", fs, [
              h("p", ms, $(_(a)("Create a new file")), 1),
              ve(h("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => i.value = d),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("File Name"),
                type: "text"
              }, null, 40, ps), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(De, {
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
  setup(n, { emit: e }) {
    const t = n, o = P(""), a = P(""), i = P(null), s = P(!1), { apiUrl: f } = Se(), g = P(""), m = P(!1), { t: d } = B("i18n");
    _e(() => {
      ft(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((A) => {
        o.value = A, e("load");
      });
    });
    const p = () => {
      s.value = !s.value, a.value = o.value, s.value == !0 && gt(() => {
        i.value.focus();
      });
    }, b = () => {
      g.value = "", m.value = !1, ft(f.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: a.value },
        json: !1
      }).then((A) => {
        g.value = d("Updated."), o.value = A, e("load"), s.value = !s.value;
      }).catch((A) => {
        g.value = d(A.message), m.value = !0;
      });
    };
    return (A, S) => (w(), C(ce, null, [
      h("div", bs, [
        h("div", ys, $(n.selection.item.basename), 1),
        h("div", ws, [
          s.value ? (w(), C("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(_(d)("Save")), 1)) : q("", !0),
          h("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: S[0] || (S[0] = (E) => p())
          }, $(s.value ? _(d)("Cancel") : _(d)("Edit")), 1)
        ])
      ]),
      h("div", null, [
        s.value ? (w(), C("div", _s, [
          ve(h("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": S[1] || (S[1] = (E) => a.value = E),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [We, a.value]
          ])
        ])) : (w(), C("pre", xs, $(o.value), 1)),
        g.value.length ? (w(), G(De, {
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
function dr(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(a) {
      return Object.getOwnPropertyDescriptor(n, a).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function Er(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? dr(Object(t), !0).forEach(function(o) {
      Ms(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : dr(Object(t)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return n;
}
function dt(n) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? dt = function(e) {
    return typeof e;
  } : dt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, dt(n);
}
function Ss(n, e) {
  if (!(n instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function hr(n, e) {
  for (var t = 0; t < e.length; t++) {
    var o = e[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o);
  }
}
function Ds(n, e, t) {
  return e && hr(n.prototype, e), t && hr(n, t), n;
}
function Ms(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function Tr(n) {
  return Cs(n) || $s(n) || Es(n) || Ts();
}
function Cs(n) {
  if (Array.isArray(n))
    return Et(n);
}
function $s(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null)
    return Array.from(n);
}
function Es(n, e) {
  if (!!n) {
    if (typeof n == "string")
      return Et(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set")
      return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Et(n, e);
  }
}
function Et(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, o = new Array(e); t < e; t++)
    o[t] = n[t];
  return o;
}
function Ts() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var vt = typeof window < "u" && typeof window.document < "u", ke = vt ? window : {}, Vt = vt && ke.document.documentElement ? "ontouchstart" in ke.document.documentElement : !1, zt = vt ? "PointerEvent" in ke : !1, ee = "cropper", Bt = "all", Ar = "crop", Or = "move", Pr = "zoom", Ae = "e", Oe = "w", Be = "s", $e = "n", Ge = "ne", Je = "nw", Ze = "se", Qe = "sw", Tt = "".concat(ee, "-crop"), fr = "".concat(ee, "-disabled"), fe = "".concat(ee, "-hidden"), mr = "".concat(ee, "-hide"), As = "".concat(ee, "-invisible"), mt = "".concat(ee, "-modal"), At = "".concat(ee, "-move"), tt = "".concat(ee, "Action"), ct = "".concat(ee, "Preview"), Rt = "crop", Ir = "move", Nr = "none", Ot = "crop", Pt = "cropend", It = "cropmove", Nt = "cropstart", pr = "dblclick", Os = Vt ? "touchstart" : "mousedown", Ps = Vt ? "touchmove" : "mousemove", Is = Vt ? "touchend touchcancel" : "mouseup", gr = zt ? "pointerdown" : Os, vr = zt ? "pointermove" : Ps, br = zt ? "pointerup pointercancel" : Is, yr = "ready", wr = "resize", xr = "wheel", Lt = "zoom", _r = "image/jpeg", Ns = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Ls = /^data:/, js = /^data:image\/jpeg;base64,/, Vs = /^img|canvas$/i, Lr = 200, jr = 100, kr = {
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
  minContainerWidth: Lr,
  minContainerHeight: jr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, zs = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', Bs = Number.isNaN || ke.isNaN;
function W(n) {
  return typeof n == "number" && !Bs(n);
}
var Sr = function(e) {
  return e > 0 && e < 1 / 0;
};
function kt(n) {
  return typeof n > "u";
}
function Ie(n) {
  return dt(n) === "object" && n !== null;
}
var Rs = Object.prototype.hasOwnProperty;
function Re(n) {
  if (!Ie(n))
    return !1;
  try {
    var e = n.constructor, t = e.prototype;
    return e && t && Rs.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function he(n) {
  return typeof n == "function";
}
var Hs = Array.prototype.slice;
function Vr(n) {
  return Array.from ? Array.from(n) : Hs.call(n);
}
function ne(n, e) {
  return n && he(e) && (Array.isArray(n) || W(n.length) ? Vr(n).forEach(function(t, o) {
    e.call(n, t, o, n);
  }) : Ie(n) && Object.keys(n).forEach(function(t) {
    e.call(n, n[t], t, n);
  })), n;
}
var te = Object.assign || function(e) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    o[a - 1] = arguments[a];
  return Ie(e) && o.length > 0 && o.forEach(function(i) {
    Ie(i) && Object.keys(i).forEach(function(s) {
      e[s] = i[s];
    });
  }), e;
}, Us = /\.\d*(?:0|9){12}\d*$/;
function Ue(n) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Us.test(n) ? Math.round(n * e) / e : n;
}
var Ks = /^width|height|left|top|marginLeft|marginTop$/;
function Ee(n, e) {
  var t = n.style;
  ne(e, function(o, a) {
    Ks.test(a) && W(o) && (o = "".concat(o, "px")), t[a] = o;
  });
}
function Ys(n, e) {
  return n.classList ? n.classList.contains(e) : n.className.indexOf(e) > -1;
}
function se(n, e) {
  if (!!e) {
    if (W(n.length)) {
      ne(n, function(o) {
        se(o, e);
      });
      return;
    }
    if (n.classList) {
      n.classList.add(e);
      return;
    }
    var t = n.className.trim();
    t ? t.indexOf(e) < 0 && (n.className = "".concat(t, " ").concat(e)) : n.className = e;
  }
}
function xe(n, e) {
  if (!!e) {
    if (W(n.length)) {
      ne(n, function(t) {
        xe(t, e);
      });
      return;
    }
    if (n.classList) {
      n.classList.remove(e);
      return;
    }
    n.className.indexOf(e) >= 0 && (n.className = n.className.replace(e, ""));
  }
}
function He(n, e, t) {
  if (!!e) {
    if (W(n.length)) {
      ne(n, function(o) {
        He(o, e, t);
      });
      return;
    }
    t ? se(n, e) : xe(n, e);
  }
}
var Ws = /([a-z\d])([A-Z])/g;
function Ht(n) {
  return n.replace(Ws, "$1-$2").toLowerCase();
}
function jt(n, e) {
  return Ie(n[e]) ? n[e] : n.dataset ? n.dataset[e] : n.getAttribute("data-".concat(Ht(e)));
}
function rt(n, e, t) {
  Ie(t) ? n[e] = t : n.dataset ? n.dataset[e] = t : n.setAttribute("data-".concat(Ht(e)), t);
}
function Xs(n, e) {
  if (Ie(n[e]))
    try {
      delete n[e];
    } catch {
      n[e] = void 0;
    }
  else if (n.dataset)
    try {
      delete n.dataset[e];
    } catch {
      n.dataset[e] = void 0;
    }
  else
    n.removeAttribute("data-".concat(Ht(e)));
}
var zr = /\s\s*/, Br = function() {
  var n = !1;
  if (vt) {
    var e = !1, t = function() {
    }, o = Object.defineProperty({}, "once", {
      get: function() {
        return n = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    ke.addEventListener("test", t, o), ke.removeEventListener("test", t, o);
  }
  return n;
}();
function ye(n, e, t) {
  var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(zr).forEach(function(i) {
    if (!Br) {
      var s = n.listeners;
      s && s[i] && s[i][t] && (a = s[i][t], delete s[i][t], Object.keys(s[i]).length === 0 && delete s[i], Object.keys(s).length === 0 && delete n.listeners);
    }
    n.removeEventListener(i, a, o);
  });
}
function ge(n, e, t) {
  var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(zr).forEach(function(i) {
    if (o.once && !Br) {
      var s = n.listeners, f = s === void 0 ? {} : s;
      a = function() {
        delete f[i][t], n.removeEventListener(i, a, o);
        for (var m = arguments.length, d = new Array(m), p = 0; p < m; p++)
          d[p] = arguments[p];
        t.apply(n, d);
      }, f[i] || (f[i] = {}), f[i][t] && n.removeEventListener(i, f[i][t], o), f[i][t] = a, n.listeners = f;
    }
    n.addEventListener(i, a, o);
  });
}
function Ke(n, e, t) {
  var o;
  return he(Event) && he(CustomEvent) ? o = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (o = document.createEvent("CustomEvent"), o.initCustomEvent(e, !0, !0, t)), n.dispatchEvent(o);
}
function Rr(n) {
  var e = n.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var St = ke.location, Fs = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Dr(n) {
  var e = n.match(Fs);
  return e !== null && (e[1] !== St.protocol || e[2] !== St.hostname || e[3] !== St.port);
}
function Mr(n) {
  var e = "timestamp=".concat(new Date().getTime());
  return n + (n.indexOf("?") === -1 ? "?" : "&") + e;
}
function et(n) {
  var e = n.rotate, t = n.scaleX, o = n.scaleY, a = n.translateX, i = n.translateY, s = [];
  W(a) && a !== 0 && s.push("translateX(".concat(a, "px)")), W(i) && i !== 0 && s.push("translateY(".concat(i, "px)")), W(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), W(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), W(o) && o !== 1 && s.push("scaleY(".concat(o, ")"));
  var f = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function qs(n) {
  var e = Er({}, n), t = 0;
  return ne(n, function(o, a) {
    delete e[a], ne(e, function(i) {
      var s = Math.abs(o.startX - i.startX), f = Math.abs(o.startY - i.startY), g = Math.abs(o.endX - i.endX), m = Math.abs(o.endY - i.endY), d = Math.sqrt(s * s + f * f), p = Math.sqrt(g * g + m * m), b = (p - d) / d;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function ut(n, e) {
  var t = n.pageX, o = n.pageY, a = {
    endX: t,
    endY: o
  };
  return e ? a : Er({
    startX: t,
    startY: o
  }, a);
}
function Gs(n) {
  var e = 0, t = 0, o = 0;
  return ne(n, function(a) {
    var i = a.startX, s = a.startY;
    e += i, t += s, o += 1;
  }), e /= o, t /= o, {
    pageX: e,
    pageY: t
  };
}
function Te(n) {
  var e = n.aspectRatio, t = n.height, o = n.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = Sr(o), s = Sr(t);
  if (i && s) {
    var f = t * e;
    a === "contain" && f > o || a === "cover" && f < o ? t = o / e : o = t * e;
  } else
    i ? t = o / e : s && (o = t * e);
  return {
    width: o,
    height: t
  };
}
function Js(n) {
  var e = n.width, t = n.height, o = n.degree;
  if (o = Math.abs(o) % 180, o === 90)
    return {
      width: t,
      height: e
    };
  var a = o % 90 * Math.PI / 180, i = Math.sin(a), s = Math.cos(a), f = e * s + t * i, g = e * i + t * s;
  return o > 90 ? {
    width: g,
    height: f
  } : {
    width: f,
    height: g
  };
}
function Zs(n, e, t, o) {
  var a = e.aspectRatio, i = e.naturalWidth, s = e.naturalHeight, f = e.rotate, g = f === void 0 ? 0 : f, m = e.scaleX, d = m === void 0 ? 1 : m, p = e.scaleY, b = p === void 0 ? 1 : p, A = t.aspectRatio, S = t.naturalWidth, E = t.naturalHeight, L = o.fillColor, V = L === void 0 ? "transparent" : L, R = o.imageSmoothingEnabled, I = R === void 0 ? !0 : R, ae = o.imageSmoothingQuality, J = ae === void 0 ? "low" : ae, M = o.maxWidth, X = M === void 0 ? 1 / 0 : M, Z = o.maxHeight, ue = Z === void 0 ? 1 / 0 : Z, me = o.minWidth, j = me === void 0 ? 0 : me, H = o.minHeight, N = H === void 0 ? 0 : H, Y = document.createElement("canvas"), U = Y.getContext("2d"), ie = Te({
    aspectRatio: A,
    width: X,
    height: ue
  }), Q = Te({
    aspectRatio: A,
    width: j,
    height: N
  }, "cover"), Xe = Math.min(ie.width, Math.max(Q.width, S)), Fe = Math.min(ie.height, Math.max(Q.height, E)), it = Te({
    aspectRatio: a,
    width: X,
    height: ue
  }), ot = Te({
    aspectRatio: a,
    width: j,
    height: N
  }, "cover"), nt = Math.min(it.width, Math.max(ot.width, i)), Le = Math.min(it.height, Math.max(ot.height, s)), bt = [-nt / 2, -Le / 2, nt, Le];
  return Y.width = Ue(Xe), Y.height = Ue(Fe), U.fillStyle = V, U.fillRect(0, 0, Xe, Fe), U.save(), U.translate(Xe / 2, Fe / 2), U.rotate(g * Math.PI / 180), U.scale(d, b), U.imageSmoothingEnabled = I, U.imageSmoothingQuality = J, U.drawImage.apply(U, [n].concat(Tr(bt.map(function(je) {
    return Math.floor(Ue(je));
  })))), U.restore(), Y;
}
var Hr = String.fromCharCode;
function Qs(n, e, t) {
  var o = "";
  t += e;
  for (var a = e; a < t; a += 1)
    o += Hr(n.getUint8(a));
  return o;
}
var el = /^data:.*,/;
function tl(n) {
  var e = n.replace(el, ""), t = atob(e), o = new ArrayBuffer(t.length), a = new Uint8Array(o);
  return ne(a, function(i, s) {
    a[s] = t.charCodeAt(s);
  }), o;
}
function rl(n, e) {
  for (var t = [], o = 8192, a = new Uint8Array(n); a.length > 0; )
    t.push(Hr.apply(null, Vr(a.subarray(0, o)))), a = a.subarray(o);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function il(n) {
  var e = new DataView(n), t;
  try {
    var o, a, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var s = e.byteLength, f = 2; f + 1 < s; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          a = f;
          break;
        }
        f += 1;
      }
    if (a) {
      var g = a + 4, m = a + 10;
      if (Qs(e, g, 4) === "Exif") {
        var d = e.getUint16(m);
        if (o = d === 18761, (o || d === 19789) && e.getUint16(m + 2, o) === 42) {
          var p = e.getUint32(m + 4, o);
          p >= 8 && (i = m + p);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, o), A, S;
      for (S = 0; S < b; S += 1)
        if (A = i + S * 12 + 2, e.getUint16(A, o) === 274) {
          A += 8, t = e.getUint16(A, o), e.setUint16(A, 1, o);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function ol(n) {
  var e = 0, t = 1, o = 1;
  switch (n) {
    case 2:
      t = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      o = -1;
      break;
    case 5:
      e = 90, o = -1;
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
    scaleY: o
  };
}
var nl = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, o = this.container, a = this.cropper, i = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    se(a, fe), xe(e, fe);
    var f = {
      width: Math.max(o.offsetWidth, i >= 0 ? i : Lr),
      height: Math.max(o.offsetHeight, s >= 0 ? s : jr)
    };
    this.containerData = f, Ee(a, {
      width: f.width,
      height: f.height
    }), se(e, fe), xe(a, fe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, o = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, i = a ? t.naturalHeight : t.naturalWidth, s = a ? t.naturalWidth : t.naturalHeight, f = i / s, g = e.width, m = e.height;
    e.height * f > e.width ? o === 3 ? g = e.height * f : m = e.width / f : o === 3 ? m = e.width / f : g = e.height * f;
    var d = {
      aspectRatio: f,
      naturalWidth: i,
      naturalHeight: s,
      width: g,
      height: m
    };
    this.canvasData = d, this.limited = o === 1 || o === 2, this.limitCanvas(!0, !0), d.width = Math.min(Math.max(d.width, d.minWidth), d.maxWidth), d.height = Math.min(Math.max(d.height, d.minHeight), d.maxHeight), d.left = (e.width - d.width) / 2, d.top = (e.height - d.height) / 2, d.oldLeft = d.left, d.oldTop = d.top, this.initialCanvasData = te({}, d);
  },
  limitCanvas: function(e, t) {
    var o = this.options, a = this.containerData, i = this.canvasData, s = this.cropBoxData, f = o.viewMode, g = i.aspectRatio, m = this.cropped && s;
    if (e) {
      var d = Number(o.minCanvasWidth) || 0, p = Number(o.minCanvasHeight) || 0;
      f > 1 ? (d = Math.max(d, a.width), p = Math.max(p, a.height), f === 3 && (p * g > d ? d = p * g : p = d / g)) : f > 0 && (d ? d = Math.max(d, m ? s.width : 0) : p ? p = Math.max(p, m ? s.height : 0) : m && (d = s.width, p = s.height, p * g > d ? d = p * g : p = d / g));
      var b = Te({
        aspectRatio: g,
        width: d,
        height: p
      });
      d = b.width, p = b.height, i.minWidth = d, i.minHeight = p, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (m ? 0 : 1)) {
        var A = a.width - i.width, S = a.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, S), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, S), m && this.limited && (i.minLeft = Math.min(s.left, s.left + (s.width - i.width)), i.minTop = Math.min(s.top, s.top + (s.height - i.height)), i.maxLeft = s.left, i.maxTop = s.top, f === 2 && (i.width >= a.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= a.height && (i.minTop = Math.min(0, S), i.maxTop = Math.max(0, S))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = a.width, i.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var o = this.canvasData, a = this.imageData;
    if (t) {
      var i = Js({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), s = i.width, f = i.height, g = o.width * (s / o.naturalWidth), m = o.height * (f / o.naturalHeight);
      o.left -= (g - o.width) / 2, o.top -= (m - o.height) / 2, o.width = g, o.height = m, o.aspectRatio = s / f, o.naturalWidth = s, o.naturalHeight = f, this.limitCanvas(!0, !1);
    }
    (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft), (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), this.limitCanvas(!1, !0), o.left = Math.min(Math.max(o.left, o.minLeft), o.maxLeft), o.top = Math.min(Math.max(o.top, o.minTop), o.maxTop), o.oldLeft = o.left, o.oldTop = o.top, Ee(this.canvas, te({
      width: o.width,
      height: o.height
    }, et({
      translateX: o.left,
      translateY: o.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, o = this.imageData, a = o.naturalWidth * (t.width / t.naturalWidth), i = o.naturalHeight * (t.height / t.naturalHeight);
    te(o, {
      width: a,
      height: i,
      left: (t.width - a) / 2,
      top: (t.height - i) / 2
    }), Ee(this.image, te({
      width: o.width,
      height: o.height
    }, et(te({
      translateX: o.left,
      translateY: o.top
    }, o)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, o = e.aspectRatio || e.initialAspectRatio, a = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    o && (t.height * o > t.width ? i.height = i.width / o : i.width = i.height * o), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * a), i.height = Math.max(i.minHeight, i.height * a), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = te({}, i);
  },
  limitCropBox: function(e, t) {
    var o = this.options, a = this.containerData, i = this.canvasData, s = this.cropBoxData, f = this.limited, g = o.aspectRatio;
    if (e) {
      var m = Number(o.minCropBoxWidth) || 0, d = Number(o.minCropBoxHeight) || 0, p = f ? Math.min(a.width, i.width, i.width + i.left, a.width - i.left) : a.width, b = f ? Math.min(a.height, i.height, i.height + i.top, a.height - i.top) : a.height;
      m = Math.min(m, a.width), d = Math.min(d, a.height), g && (m && d ? d * g > m ? d = m / g : m = d * g : m ? d = m / g : d && (m = d * g), b * g > p ? b = p / g : p = b * g), s.minWidth = Math.min(m, p), s.minHeight = Math.min(d, b), s.maxWidth = p, s.maxHeight = b;
    }
    t && (f ? (s.minLeft = Math.max(0, i.left), s.minTop = Math.max(0, i.top), s.maxLeft = Math.min(a.width, i.left + i.width) - s.width, s.maxTop = Math.min(a.height, i.top + i.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = a.width - s.width, s.maxTop = a.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, o = this.cropBoxData;
    (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft), (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), this.limitCropBox(!1, !0), o.left = Math.min(Math.max(o.left, o.minLeft), o.maxLeft), o.top = Math.min(Math.max(o.top, o.minTop), o.maxTop), o.oldLeft = o.left, o.oldTop = o.top, e.movable && e.cropBoxMovable && rt(this.face, tt, o.width >= t.width && o.height >= t.height ? Or : Bt), Ee(this.cropBox, te({
      width: o.width,
      height: o.height
    }, et({
      translateX: o.left,
      translateY: o.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ke(this.element, Ot, this.getData());
  }
}, al = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, o = this.options.preview, a = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = a, s.alt = i, this.viewBox.appendChild(s), this.viewBoxImage = s, !!o) {
      var f = o;
      typeof o == "string" ? f = e.ownerDocument.querySelectorAll(o) : o.querySelector && (f = [o]), this.previews = f, ne(f, function(g) {
        var m = document.createElement("img");
        rt(g, ct, {
          width: g.offsetWidth,
          height: g.offsetHeight,
          html: g.innerHTML
        }), t && (m.crossOrigin = t), m.src = a, m.alt = i, m.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', g.innerHTML = "", g.appendChild(m);
      });
    }
  },
  resetPreview: function() {
    ne(this.previews, function(e) {
      var t = jt(e, ct);
      Ee(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Xs(e, ct);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, o = this.cropBoxData, a = o.width, i = o.height, s = e.width, f = e.height, g = o.left - t.left - e.left, m = o.top - t.top - e.top;
    !this.cropped || this.disabled || (Ee(this.viewBoxImage, te({
      width: s,
      height: f
    }, et(te({
      translateX: -g,
      translateY: -m
    }, e)))), ne(this.previews, function(d) {
      var p = jt(d, ct), b = p.width, A = p.height, S = b, E = A, L = 1;
      a && (L = b / a, E = i * L), i && E > A && (L = A / i, S = a * L, E = A), Ee(d, {
        width: S,
        height: E
      }), Ee(d.getElementsByTagName("img")[0], te({
        width: s * L,
        height: f * L
      }, et(te({
        translateX: -g * L,
        translateY: -m * L
      }, e))));
    }));
  }
}, sl = {
  bind: function() {
    var e = this.element, t = this.options, o = this.cropper;
    he(t.cropstart) && ge(e, Nt, t.cropstart), he(t.cropmove) && ge(e, It, t.cropmove), he(t.cropend) && ge(e, Pt, t.cropend), he(t.crop) && ge(e, Ot, t.crop), he(t.zoom) && ge(e, Lt, t.zoom), ge(o, gr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ge(o, xr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(o, pr, this.onDblclick = this.dblclick.bind(this)), ge(e.ownerDocument, vr, this.onCropMove = this.cropMove.bind(this)), ge(e.ownerDocument, br, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ge(window, wr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, o = this.cropper;
    he(t.cropstart) && ye(e, Nt, t.cropstart), he(t.cropmove) && ye(e, It, t.cropmove), he(t.cropend) && ye(e, Pt, t.cropend), he(t.crop) && ye(e, Ot, t.crop), he(t.zoom) && ye(e, Lt, t.zoom), ye(o, gr, this.onCropStart), t.zoomable && t.zoomOnWheel && ye(o, xr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ye(o, pr, this.onDblclick), ye(e.ownerDocument, vr, this.onCropMove), ye(e.ownerDocument, br, this.onCropEnd), t.responsive && ye(window, wr, this.onResize);
  }
}, ll = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, o = this.containerData, a = t.offsetWidth / o.width, i = t.offsetHeight / o.height, s = Math.abs(a - 1) > Math.abs(i - 1) ? a : i;
      if (s !== 1) {
        var f, g;
        e.restore && (f = this.getCanvasData(), g = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(ne(f, function(m, d) {
          f[d] = m * s;
        })), this.setCropBoxData(ne(g, function(m, d) {
          g[d] = m * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Nr || this.setDragMode(Ys(this.dragBox, Tt) ? Ir : Rt);
  },
  wheel: function(e) {
    var t = this, o = Number(this.options.wheelZoomRatio) || 0.1, a = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? a = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? a = -e.wheelDelta / 120 : e.detail && (a = e.detail > 0 ? 1 : -1), this.zoom(-a * o, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, o = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (W(t) && t !== 1 || W(o) && o !== 0 || e.ctrlKey))) {
      var a = this.options, i = this.pointers, s;
      e.changedTouches ? ne(e.changedTouches, function(f) {
        i[f.identifier] = ut(f);
      }) : i[e.pointerId || 0] = ut(e), Object.keys(i).length > 1 && a.zoomable && a.zoomOnTouch ? s = Pr : s = jt(e.target, tt), !!Ns.test(s) && Ke(this.element, Nt, {
        originalEvent: e,
        action: s
      }) !== !1 && (e.preventDefault(), this.action = s, this.cropping = !1, s === Ar && (this.cropping = !0, se(this.dragBox, mt)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var o = this.pointers;
      e.preventDefault(), Ke(this.element, It, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? ne(e.changedTouches, function(a) {
        te(o[a.identifier] || {}, ut(a, !0));
      }) : te(o[e.pointerId || 0] || {}, ut(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, o = this.pointers;
      e.changedTouches ? ne(e.changedTouches, function(a) {
        delete o[a.identifier];
      }) : delete o[e.pointerId || 0], t && (e.preventDefault(), Object.keys(o).length || (this.action = ""), this.cropping && (this.cropping = !1, He(this.dragBox, mt, this.cropped && this.options.modal)), Ke(this.element, Pt, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, cl = {
  change: function(e) {
    var t = this.options, o = this.canvasData, a = this.containerData, i = this.cropBoxData, s = this.pointers, f = this.action, g = t.aspectRatio, m = i.left, d = i.top, p = i.width, b = i.height, A = m + p, S = d + b, E = 0, L = 0, V = a.width, R = a.height, I = !0, ae;
    !g && e.shiftKey && (g = p && b ? p / b : 1), this.limited && (E = i.minLeft, L = i.minTop, V = E + Math.min(a.width, o.width, o.left + o.width), R = L + Math.min(a.height, o.height, o.top + o.height));
    var J = s[Object.keys(s)[0]], M = {
      x: J.endX - J.startX,
      y: J.endY - J.startY
    }, X = function(ue) {
      switch (ue) {
        case Ae:
          A + M.x > V && (M.x = V - A);
          break;
        case Oe:
          m + M.x < E && (M.x = E - m);
          break;
        case $e:
          d + M.y < L && (M.y = L - d);
          break;
        case Be:
          S + M.y > R && (M.y = R - S);
          break;
      }
    };
    switch (f) {
      case Bt:
        m += M.x, d += M.y;
        break;
      case Ae:
        if (M.x >= 0 && (A >= V || g && (d <= L || S >= R))) {
          I = !1;
          break;
        }
        X(Ae), p += M.x, p < 0 && (f = Oe, p = -p, m -= p), g && (b = p / g, d += (i.height - b) / 2);
        break;
      case $e:
        if (M.y <= 0 && (d <= L || g && (m <= E || A >= V))) {
          I = !1;
          break;
        }
        X($e), b -= M.y, d += M.y, b < 0 && (f = Be, b = -b, d -= b), g && (p = b * g, m += (i.width - p) / 2);
        break;
      case Oe:
        if (M.x <= 0 && (m <= E || g && (d <= L || S >= R))) {
          I = !1;
          break;
        }
        X(Oe), p -= M.x, m += M.x, p < 0 && (f = Ae, p = -p, m -= p), g && (b = p / g, d += (i.height - b) / 2);
        break;
      case Be:
        if (M.y >= 0 && (S >= R || g && (m <= E || A >= V))) {
          I = !1;
          break;
        }
        X(Be), b += M.y, b < 0 && (f = $e, b = -b, d -= b), g && (p = b * g, m += (i.width - p) / 2);
        break;
      case Ge:
        if (g) {
          if (M.y <= 0 && (d <= L || A >= V)) {
            I = !1;
            break;
          }
          X($e), b -= M.y, d += M.y, p = b * g;
        } else
          X($e), X(Ae), M.x >= 0 ? A < V ? p += M.x : M.y <= 0 && d <= L && (I = !1) : p += M.x, M.y <= 0 ? d > L && (b -= M.y, d += M.y) : (b -= M.y, d += M.y);
        p < 0 && b < 0 ? (f = Qe, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Je, p = -p, m -= p) : b < 0 && (f = Ze, b = -b, d -= b);
        break;
      case Je:
        if (g) {
          if (M.y <= 0 && (d <= L || m <= E)) {
            I = !1;
            break;
          }
          X($e), b -= M.y, d += M.y, p = b * g, m += i.width - p;
        } else
          X($e), X(Oe), M.x <= 0 ? m > E ? (p -= M.x, m += M.x) : M.y <= 0 && d <= L && (I = !1) : (p -= M.x, m += M.x), M.y <= 0 ? d > L && (b -= M.y, d += M.y) : (b -= M.y, d += M.y);
        p < 0 && b < 0 ? (f = Ze, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Ge, p = -p, m -= p) : b < 0 && (f = Qe, b = -b, d -= b);
        break;
      case Qe:
        if (g) {
          if (M.x <= 0 && (m <= E || S >= R)) {
            I = !1;
            break;
          }
          X(Oe), p -= M.x, m += M.x, b = p / g;
        } else
          X(Be), X(Oe), M.x <= 0 ? m > E ? (p -= M.x, m += M.x) : M.y >= 0 && S >= R && (I = !1) : (p -= M.x, m += M.x), M.y >= 0 ? S < R && (b += M.y) : b += M.y;
        p < 0 && b < 0 ? (f = Ge, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Ze, p = -p, m -= p) : b < 0 && (f = Je, b = -b, d -= b);
        break;
      case Ze:
        if (g) {
          if (M.x >= 0 && (A >= V || S >= R)) {
            I = !1;
            break;
          }
          X(Ae), p += M.x, b = p / g;
        } else
          X(Be), X(Ae), M.x >= 0 ? A < V ? p += M.x : M.y >= 0 && S >= R && (I = !1) : p += M.x, M.y >= 0 ? S < R && (b += M.y) : b += M.y;
        p < 0 && b < 0 ? (f = Je, b = -b, p = -p, d -= b, m -= p) : p < 0 ? (f = Qe, p = -p, m -= p) : b < 0 && (f = Ge, b = -b, d -= b);
        break;
      case Or:
        this.move(M.x, M.y), I = !1;
        break;
      case Pr:
        this.zoom(qs(s), e), I = !1;
        break;
      case Ar:
        if (!M.x || !M.y) {
          I = !1;
          break;
        }
        ae = Rr(this.cropper), m = J.startX - ae.left, d = J.startY - ae.top, p = i.minWidth, b = i.minHeight, M.x > 0 ? f = M.y > 0 ? Ze : Ge : M.x < 0 && (m -= p, f = M.y > 0 ? Qe : Je), M.y < 0 && (d -= b), this.cropped || (xe(this.cropBox, fe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    I && (i.width = p, i.height = b, i.left = m, i.top = d, this.action = f, this.renderCropBox()), ne(s, function(Z) {
      Z.startX = Z.endX, Z.startY = Z.endY;
    });
  }
}, ul = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && se(this.dragBox, mt), xe(this.cropBox, fe), this.setCropBoxData(this.initialCropBoxData)), this;
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
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), xe(this.dragBox, mt), se(this.cropBox, fe)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, ne(this.previews, function(o) {
      o.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, xe(this.cropper, fr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, se(this.cropper, fr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[ee] ? (e[ee] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.canvasData, a = o.left, i = o.top;
    return this.moveTo(kt(e) ? e : a + Number(e), kt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.canvasData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (W(e) && (o.left = e, a = !0), W(t) && (o.top = t, a = !0), a && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var o = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(o.width * e / o.naturalWidth, null, t);
  },
  zoomTo: function(e, t, o) {
    var a = this.options, i = this.canvasData, s = i.width, f = i.height, g = i.naturalWidth, m = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var d = g * e, p = m * e;
      if (Ke(this.element, Lt, {
        ratio: e,
        oldRatio: s / g,
        originalEvent: o
      }) === !1)
        return this;
      if (o) {
        var b = this.pointers, A = Rr(this.cropper), S = b && Object.keys(b).length ? Gs(b) : {
          pageX: o.pageX,
          pageY: o.pageY
        };
        i.left -= (d - s) * ((S.pageX - A.left - i.left) / s), i.top -= (p - f) * ((S.pageY - A.top - i.top) / f);
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
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.imageData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (W(e) && (o.scaleX = e, a = !0), W(t) && (o.scaleY = t, a = !0), a && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, o = this.imageData, a = this.canvasData, i = this.cropBoxData, s;
    if (this.ready && this.cropped) {
      s = {
        x: i.left - a.left,
        y: i.top - a.top,
        width: i.width,
        height: i.height
      };
      var f = o.width / o.naturalWidth;
      if (ne(s, function(d, p) {
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
    return t.rotatable && (s.rotate = o.rotate || 0), t.scalable && (s.scaleX = o.scaleX || 1, s.scaleY = o.scaleY || 1), s;
  },
  setData: function(e) {
    var t = this.options, o = this.imageData, a = this.canvasData, i = {};
    if (this.ready && !this.disabled && Re(e)) {
      var s = !1;
      t.rotatable && W(e.rotate) && e.rotate !== o.rotate && (o.rotate = e.rotate, s = !0), t.scalable && (W(e.scaleX) && e.scaleX !== o.scaleX && (o.scaleX = e.scaleX, s = !0), W(e.scaleY) && e.scaleY !== o.scaleY && (o.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var f = o.width / o.naturalWidth;
      W(e.x) && (i.left = e.x * f + a.left), W(e.y) && (i.top = e.y * f + a.top), W(e.width) && (i.width = e.width * f), W(e.height) && (i.height = e.height * f), this.setCropBoxData(i);
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
    return this.ready && ne(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(o) {
      t[o] = e[o];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, o = t.aspectRatio;
    return this.ready && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) ? (t.width = e.width, t.height = e.width / o) : W(e.height) && (t.height = e.height, t.width = e.height * o), this.renderCanvas(!0)), this;
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
    var t = this.cropBoxData, o = this.options.aspectRatio, a, i;
    return this.ready && this.cropped && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) && e.width !== t.width && (a = !0, t.width = e.width), W(e.height) && e.height !== t.height && (i = !0, t.height = e.height), o && (a ? t.height = t.width / o : i && (t.width = t.height * o)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, o = Zs(this.image, this.imageData, t, e);
    if (!this.cropped)
      return o;
    var a = this.getData(), i = a.x, s = a.y, f = a.width, g = a.height, m = o.width / Math.floor(t.naturalWidth);
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
      width: e.width || (m !== 1 ? o.width : f),
      height: e.height || (m !== 1 ? o.height : g)
    }), S = A.width, E = A.height;
    S = Math.min(p.width, Math.max(b.width, S)), E = Math.min(p.height, Math.max(b.height, E));
    var L = document.createElement("canvas"), V = L.getContext("2d");
    L.width = Ue(S), L.height = Ue(E), V.fillStyle = e.fillColor || "transparent", V.fillRect(0, 0, S, E);
    var R = e.imageSmoothingEnabled, I = R === void 0 ? !0 : R, ae = e.imageSmoothingQuality;
    V.imageSmoothingEnabled = I, ae && (V.imageSmoothingQuality = ae);
    var J = o.width, M = o.height, X = i, Z = s, ue, me, j, H, N, Y;
    X <= -f || X > J ? (X = 0, ue = 0, j = 0, N = 0) : X <= 0 ? (j = -X, X = 0, ue = Math.min(J, f + X), N = ue) : X <= J && (j = 0, ue = Math.min(f, J - X), N = ue), ue <= 0 || Z <= -g || Z > M ? (Z = 0, me = 0, H = 0, Y = 0) : Z <= 0 ? (H = -Z, Z = 0, me = Math.min(M, g + Z), Y = me) : Z <= M && (H = 0, me = Math.min(g, M - Z), Y = me);
    var U = [X, Z, ue, me];
    if (N > 0 && Y > 0) {
      var ie = S / f;
      U.push(j * ie, H * ie, N * ie, Y * ie);
    }
    return V.drawImage.apply(V, [o].concat(Tr(U.map(function(Q) {
      return Math.floor(Ue(Q));
    })))), L;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !kt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, o = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var i = e === Rt, s = t.movable && e === Ir;
      e = i || s ? e : Nr, t.dragMode = e, rt(o, tt, e), He(o, Tt, i), He(o, At, s), t.cropBoxMovable || (rt(a, tt, e), He(a, Tt, i), He(a, At, s));
    }
    return this;
  }
}, dl = ke.Cropper, Ur = /* @__PURE__ */ function() {
  function n(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Ss(this, n), !e || !Vs.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = te({}, kr, Re(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return Ds(n, [{
    key: "init",
    value: function() {
      var t = this.element, o = t.tagName.toLowerCase(), a;
      if (!t[ee]) {
        if (t[ee] = this, o === "img") {
          if (this.isImg = !0, a = t.getAttribute("src") || "", this.originalUrl = a, !a)
            return;
          a = t.src;
        } else
          o === "canvas" && window.HTMLCanvasElement && (a = t.toDataURL());
        this.load(a);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var o = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var a = this.element, i = this.options;
        if (!i.rotatable && !i.scalable && (i.checkOrientation = !1), !i.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (Ls.test(t)) {
          js.test(t) ? this.read(tl(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = f, s.onerror = f, s.ontimeout = f, s.onprogress = function() {
          s.getResponseHeader("content-type") !== _r && s.abort();
        }, s.onload = function() {
          o.read(s.response);
        }, s.onloadend = function() {
          o.reloading = !1, o.xhr = null;
        }, i.checkCrossOrigin && Dr(t) && a.crossOrigin && (t = Mr(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = a.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var o = this.options, a = this.imageData, i = il(t), s = 0, f = 1, g = 1;
      if (i > 1) {
        this.url = rl(t, _r);
        var m = ol(i);
        s = m.rotate, f = m.scaleX, g = m.scaleY;
      }
      o.rotatable && (a.rotate = s), o.scalable && (a.scaleX = f, a.scaleY = g), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, o = this.url, a = t.crossOrigin, i = o;
      this.options.checkCrossOrigin && Dr(o) && (a || (a = "anonymous"), i = Mr(o)), this.crossOrigin = a, this.crossOriginUrl = i;
      var s = document.createElement("img");
      a && (s.crossOrigin = a), s.src = i || o, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), se(s, mr), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, o = this.image;
      o.onload = null, o.onerror = null, this.sizing = !0;
      var a = ke.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ke.navigator.userAgent), i = function(m, d) {
        te(t.imageData, {
          naturalWidth: m,
          naturalHeight: d,
          aspectRatio: m / d
        }), t.initialImageData = te({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (o.naturalWidth && !a) {
        i(o.naturalWidth, o.naturalHeight);
        return;
      }
      var s = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = s, s.onload = function() {
        i(s.width, s.height), a || f.removeChild(s);
      }, s.src = o.src, a || (s.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(s));
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
        var t = this.element, o = this.options, a = this.image, i = t.parentNode, s = document.createElement("div");
        s.innerHTML = zs;
        var f = s.querySelector(".".concat(ee, "-container")), g = f.querySelector(".".concat(ee, "-canvas")), m = f.querySelector(".".concat(ee, "-drag-box")), d = f.querySelector(".".concat(ee, "-crop-box")), p = d.querySelector(".".concat(ee, "-face"));
        this.container = i, this.cropper = f, this.canvas = g, this.dragBox = m, this.cropBox = d, this.viewBox = f.querySelector(".".concat(ee, "-view-box")), this.face = p, g.appendChild(a), se(t, fe), i.insertBefore(f, t.nextSibling), this.isImg || xe(a, mr), this.initPreview(), this.bind(), o.initialAspectRatio = Math.max(0, o.initialAspectRatio) || NaN, o.aspectRatio = Math.max(0, o.aspectRatio) || NaN, o.viewMode = Math.max(0, Math.min(3, Math.round(o.viewMode))) || 0, se(d, fe), o.guides || se(d.getElementsByClassName("".concat(ee, "-dashed")), fe), o.center || se(d.getElementsByClassName("".concat(ee, "-center")), fe), o.background && se(f, "".concat(ee, "-bg")), o.highlight || se(p, As), o.cropBoxMovable && (se(p, At), rt(p, tt, Bt)), o.cropBoxResizable || (se(d.getElementsByClassName("".concat(ee, "-line")), fe), se(d.getElementsByClassName("".concat(ee, "-point")), fe)), this.render(), this.ready = !0, this.setDragMode(o.dragMode), o.autoCrop && this.crop(), this.setData(o.data), he(o.ready) && ge(t, yr, o.ready, {
          once: !0
        }), Ke(t, yr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), xe(this.element, fe));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = dl, n;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      te(kr, Re(t) && t);
    }
  }]), n;
}();
te(Ur.prototype, nl, al, sl, ll, cl, ul);
const hl = { class: "flex" }, fl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ml = { class: "ml-auto mb-2" }, pl = { class: "w-full flex justify-center" }, gl = ["src"], vl = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: e }) {
    const t = n, { t: o } = B("i18n"), { apiUrl: a } = Se(), i = P(null), s = P(null), f = P(!1), g = P(""), m = P(!1), d = () => {
      f.value = !f.value, f.value ? s.value = new Ur(i.value, {
        crop(b) {
        }
      }) : s.value.destroy();
    }, p = () => {
      s.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (b) => {
          g.value = "", m.value = !1, ft(a.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: b },
            name: t.selection.item.basename,
            json: !1
          }).then((A) => {
            g.value = o("Updated."), i.value.src = $t(t.selection.adapter, t.selection.item.path), d(), e("load");
          }).catch((A) => {
            g.value = o(A.message), m.value = !0;
          });
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (b, A) => (w(), C(ce, null, [
      h("div", hl, [
        h("h3", fl, $(n.selection.item.basename), 1),
        h("div", ml, [
          f.value ? (w(), C("button", {
            key: 0,
            onClick: p,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(_(o)("Crop")), 1)) : q("", !0),
          h("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: A[0] || (A[0] = (S) => d())
          }, $(f.value ? _(o)("Cancel") : _(o)("Edit")), 1)
        ])
      ]),
      h("div", pl, [
        h("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[60vh] max-h-[60vh]",
          src: _($t)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, gl)
      ]),
      g.value.length ? (w(), G(De, {
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
  setup(n, { emit: e }) {
    return _e(() => {
      e("load");
    }), (t, o) => (w(), C(ce, null, [
      h("h3", bl, $(n.selection.item.basename), 1),
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
  setup(n, { emit: e }) {
    const t = n, { apiUrl: o } = Se(), a = () => o.value + "?" + Ne({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, s) => (w(), C(ce, null, [
      h("h3", xl, $(n.selection.item.basename), 1),
      h("div", null, [
        h("video", _l, [
          h("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, kl),
          Sl
        ])
      ])
    ], 64));
  }
}, Ml = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cl = {
  class: "w-full",
  controls: ""
}, $l = ["src"], El = /* @__PURE__ */ le(" Your browser does not support the audio element. "), Tl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: e }) {
    const t = n, { apiUrl: o } = Se(), a = () => o.value + "?" + Ne({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, s) => (w(), C(ce, null, [
      h("h3", Ml, $(n.selection.item.basename), 1),
      h("div", null, [
        h("audio", Cl, [
          h("source", {
            src: a(),
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
  setup(n, { emit: e }) {
    const t = n, { apiUrl: o } = Se(), a = () => o.value + "?" + Ne({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, s) => (w(), C(ce, null, [
      h("h3", Al, $(n.selection.item.basename), 1),
      h("div", null, [
        h("object", {
          class: "h-[60vh]",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          h("iframe", {
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
        `, 8, Pl)
        ], 8, Ol)
      ])
    ], 64));
  }
}, Nl = { class: "sm:flex sm:items-start" }, Ll = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, jl = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Vl = {
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
  setup(n) {
    const e = n, { apiUrl: t } = Se(), o = B("emitter"), { t: a } = B("i18n"), i = P(!1), s = (m) => i.value = m, f = (m) => {
      var d;
      return ((d = e.selection.item.mime_type) != null ? d : "").startsWith(m);
    }, g = () => {
      const m = t.value + "?" + Ne({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      o.emit("vf-download", m);
    };
    return (m, d) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: d[6] || (d[6] = (p) => _(o).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Close")), 1),
        h("button", {
          type: "button",
          onClick: d[7] || (d[7] = (p) => g()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Download")), 1)
      ]),
      default: F(() => [
        h("div", Nl, [
          h("div", Ll, [
            h("div", null, [
              f("text") ? (w(), G(ks, {
                key: 0,
                selection: n.selection,
                onLoad: d[0] || (d[0] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("image") ? (w(), G(vl, {
                key: 1,
                selection: n.selection,
                onLoad: d[1] || (d[1] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("video") ? (w(), G(Dl, {
                key: 2,
                selection: n.selection,
                onLoad: d[2] || (d[2] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("audio") ? (w(), G(Tl, {
                key: 3,
                selection: n.selection,
                onLoad: d[3] || (d[3] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (w(), G(Il, {
                key: 4,
                selection: n.selection,
                onLoad: d[4] || (d[4] = (p) => s(!0))
              }, null, 8, ["selection"])) : (w(), G(wl, {
                key: 5,
                selection: n.selection,
                onLoad: d[5] || (d[5] = (p) => s(!0))
              }, null, 8, ["selection"]))
            ]),
            h("div", jl, [
              h("p", null, $(n.selection.item.path), 1),
              h("p", null, "mime_type: " + $(n.selection.item.mime_type), 1),
              i.value == !1 ? (w(), C("div", Vl, [
                zl,
                h("span", null, $(_(a)("Loading")), 1)
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
  setup(n) {
    const e = n, t = B("emitter"), { getStore: o } = B("storage"), { t: a } = B("i18n"), i = P(e.selection.items[0]), s = P(e.selection.items[0].basename), f = P(""), g = () => {
      s.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          item: i.value.path,
          name: s.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("%s is renamed.", s.value) });
        },
        onError: (m) => {
          f.value = a(m.message);
        }
      });
    };
    return (m, d) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Rename")), 1),
        h("button", {
          type: "button",
          onClick: d[1] || (d[1] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", Hl, [
          Ul,
          h("div", Kl, [
            h("h3", Yl, $(_(a)("Rename")), 1),
            h("div", Wl, [
              h("p", Xl, [
                i.value.type == "dir" ? (w(), C("svg", Fl, Gl)) : (w(), C("svg", Jl, Ql)),
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
              f.value.length ? (w(), G(De, {
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
}), oc = { class: "sm:flex sm:items-start" }, nc = /* @__PURE__ */ h("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ac = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, sc = {
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
  setup(n) {
    const e = n, t = B("emitter"), { apiUrl: o } = Se(), { t: a } = B("i18n"), i = P(null), s = P(null), f = P(null), g = P([]), m = P(""), d = P(!0), p = () => {
      m.value = "", i.value.start();
    };
    return _e(() => {
      i.value = new _t.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: s.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: o.value + "?" + Ne({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(b, A) {
            d.value = !1, _t.each(A, function(S) {
              g.value.push({
                id: S.id,
                name: S.name,
                size: _t.formatSize(S.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(b, A) {
            g.value[g.value.findIndex((S) => S.id == A.id)].percent = A.percent + "%";
          },
          UploadComplete: function() {
            d.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(b, A) {
            i.value.stop(), m.value = a(JSON.parse(A.response).message);
          }
        }
      }), i.value.init();
    }), (b, A) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          disabled: d.value,
          onClick: Pe(p, ["prevent"]),
          type: "button",
          class: de([d.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, $(_(a)("Upload")), 11, hc),
        h("button", {
          type: "button",
          onClick: A[0] || (A[0] = (S) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", oc, [
          nc,
          h("div", ac, [
            h("h3", sc, $(_(a)("Upload files")), 1),
            h("div", lc, [
              h("div", cc, [
                (w(!0), C(ce, null, be(g.value, (S) => (w(), C("div", null, [
                  h("div", {
                    id: S.id
                  }, [
                    le($(S.name) + " ( " + $(S.size) + ") ", 1),
                    h("b", null, $(S.percent), 1)
                  ], 8, uc)
                ]))), 256)),
                g.value.length ? q("", !0) : (w(), C("div", dc, $(_(a)("No files selected!")), 1))
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
                }, $(_(a)("Select Files")), 513)
              ], 512),
              m.value.length ? (w(), G(De, {
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
}, null, -1), Mc = [
  Dc
], Cc = { class: "ml-1.5" }, $c = ["onKeyup", "placeholder"], Ec = {
  name: "VFModalArchive"
}, Tc = /* @__PURE__ */ Object.assign(Ec, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const e = n, t = B("emitter"), { getStore: o } = B("storage"), { t: a } = B("i18n"), i = P(""), s = P(""), f = P(e.selection.items), g = () => {
      f.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: m, type: d }) => ({ path: m, type: d }))),
          name: i.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("The file(s) archived.") });
        },
        onError: (m) => {
          s.value = a(m.message);
        }
      });
    };
    return (m, d) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Archive")), 1),
        h("button", {
          type: "button",
          onClick: d[1] || (d[1] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", pc, [
          gc,
          h("div", vc, [
            h("h3", bc, $(_(a)("Archive the files")), 1),
            h("div", yc, [
              (w(!0), C(ce, null, be(f.value, (p) => (w(), C("p", wc, [
                p.type == "dir" ? (w(), C("svg", xc, kc)) : (w(), C("svg", Sc, Mc)),
                h("span", Cc, $(p.basename), 1)
              ]))), 256)),
              ve(h("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (p) => i.value = p),
                onKeyup: Ye(g, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, $c), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(De, {
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
}, Nc = { class: "mt-2" }, Lc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, jc = {
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
  setup(n) {
    const e = n, t = B("emitter"), { getStore: o } = B("storage"), { t: a } = B("i18n");
    P("");
    const i = P(e.selection.items[0]), s = P(""), f = P([]), g = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          item: i.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: a("The file unarchived.") });
        },
        onError: (m) => {
          s.value = a(m.message);
        }
      });
    };
    return (m, d) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Unarchive")), 1),
        h("button", {
          type: "button",
          onClick: d[0] || (d[0] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", Ac, [
          Oc,
          h("div", Pc, [
            h("h3", Ic, $(_(a)("Unarchive")), 1),
            h("div", Nc, [
              (w(!0), C(ce, null, be(f.value, (p) => (w(), C("p", Lc, [
                p.type == "dir" ? (w(), C("svg", jc, zc)) : (w(), C("svg", Bc, Hc)),
                h("span", Uc, $(p.basename), 1)
              ]))), 256)),
              h("p", Kc, $(_(a)("The archive will be unarchived at")) + " (" + $(n.current.dirname) + ")", 1),
              s.value.length ? (w(), G(De, {
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
}, null, -1), ou = [
  iu
], nu = { class: "ml-1.5" }, au = /* @__PURE__ */ h("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Bu dosyalar\u0131 ta\u015F\u0131mak istedi\u011Finizden emin misiniz?", -1), su = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, lu = /* @__PURE__ */ h("svg", {
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
  setup(n) {
    const e = n, t = B("emitter"), { t: o } = B("i18n"), { getStore: a } = B("storage"), i = P(e.selection.items.from), s = P(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(i.value.map(({ path: g, type: m }) => ({ path: g, type: m }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("Files moved.", e.selection.items.to.name) });
        },
        onError: (g) => {
          s.value = o(g.message);
        }
      });
    };
    return (g, m) => (w(), G(Me, null, {
      buttons: F(() => [
        h("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(o)("Yes, Move!")), 1),
        h("button", {
          type: "button",
          onClick: m[0] || (m[0] = (d) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(o)("Cancel")), 1)
      ]),
      default: F(() => [
        h("div", Xc, [
          Fc,
          h("div", qc, [
            h("h3", Gc, $(_(o)("Move files")), 1),
            h("div", Jc, [
              (w(!0), C(ce, null, be(i.value, (d) => (w(), C("p", Zc, [
                d.type == "dir" ? (w(), C("svg", Qc, tu)) : (w(), C("svg", ru, ou)),
                h("span", nu, $(d.path), 1)
              ]))), 256)),
              au,
              h("p", su, [
                lu,
                h("span", cu, $(n.selection.items.to.path), 1)
              ]),
              s.value.length ? (w(), G(De, {
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
  ModalDelete: Ya,
  ModalMessage: Qa,
  ModalNewFolder: ls,
  ModalNewFile: vs,
  ModalPreview: Rl,
  ModalRename: ic,
  ModalUpload: mc,
  ModalArchive: Tc,
  ModalUnarchive: Wc,
  ModalMove: du
}, Symbol.toStringTag, { value: "Module" })), Dt = {
  VueFinder: ka,
  ...hu
};
const pu = {
  install(n) {
    for (const e in Dt)
      if (Dt.hasOwnProperty(e)) {
        const t = Dt[e];
        n.component(t.name, t);
      }
  }
};
export {
  pu as default
};
