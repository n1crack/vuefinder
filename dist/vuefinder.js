import { ref as P, watch as pt, inject as B, openBlock as w, createElementBlock as M, createElementVNode as d, unref as _, normalizeClass as de, createTextVNode as ue, toDisplayString as $, createCommentVNode as q, createVNode as we, TransitionGroup as Ai, withCtx as F, Fragment as le, renderList as be, reactive as ht, onMounted as _e, onUpdated as Oi, withDirectives as ve, vShow as st, withModifiers as Pe, nextTick as gt, vModelSelect as cr, customRef as Pi, withKeys as Ye, isRef as Ii, vModelText as We, normalizeStyle as Cr, renderSlot as Mt, provide as xt, createBlock as G, resolveDynamicComponent as Ni } from "vue";
import _t from "plupload";
const ft = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const a = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    a.headers = {};
    let i = new FormData();
    for (const [s, f] of Object.entries(t))
      i.append(s, f);
    a.body = i;
  }
  return fetch(o, a).then((i) => i.ok ? n ? i.json() : i.text() : i.json().then(Promise.reject.bind(Promise)));
};
function Li(o) {
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
function Ct(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = P(JSON.parse(e));
  pt(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
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
  function o(e) {
    ur.value = e;
  }
  return { apiUrl: ur, setApiUrl: o };
}
const ji = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Vi = {
  key: 0,
  class: "flex text-center"
}, zi = ["aria-label"], Bi = /* @__PURE__ */ d("svg", {
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
], -1), Ri = [
  Bi
], Hi = ["aria-label"], Ui = /* @__PURE__ */ d("svg", {
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
], -1), Ki = [
  Ui
], Yi = ["aria-label"], Wi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Xi = [
  Wi
], Fi = ["aria-label"], qi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Gi = [
  qi
], Ji = ["aria-label"], Zi = /* @__PURE__ */ d("svg", {
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
], -1), Qi = [
  Zi
], en = ["aria-label"], tn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), rn = [
  tn
], nn = ["aria-label"], on = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), an = [
  on
], sn = {
  key: 1,
  class: "flex text-center"
}, ln = { class: "pl-2" }, cn = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, un = { class: "flex text-center items-center justify-end" }, dn = ["aria-label"], hn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), fn = [
  hn
], mn = ["aria-label"], pn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, gn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, vn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, bn = ["aria-label"], yn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, wn = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, xn = {
  name: "VFToolbar"
}, _n = /* @__PURE__ */ Object.assign(xn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = B("emitter"), { getStore: t, setStore: n } = B("storage"), { t: a } = B("i18n"), i = P(t("viewport", "grid")), s = P([]), f = P(t("full-screen", !1)), g = P("");
    e.on("vf-search-query", ({ newQuery: h }) => {
      g.value = h;
    });
    const m = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (h) => {
      s.value = h;
    }), e.on("vf-view-toggle", (h) => {
      n("viewport", h), i.value = h;
    }), (h, p) => (w(), M("div", ji, [
      g.value.length ? (w(), M("div", sn, [
        d("div", ln, [
          ue($(_(a)("Search results for")) + " ", 1),
          d("span", cn, $(g.value), 1)
        ])
      ])) : (w(), M("div", Vi, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: p[0] || (p[0] = (b) => _(e).emit("vf-modal-show", { type: "new-folder", items: s.value }))
        }, Ri, 8, zi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[1] || (p[1] = (b) => _(e).emit("vf-modal-show", { type: "new-file", items: s.value }))
        }, Ki, 8, Hi),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[2] || (p[2] = (b) => s.value.length != 1 || _(e).emit("vf-modal-show", { type: "rename", items: s.value }))
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
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[3] || (p[3] = (b) => !s.value.length || _(e).emit("vf-modal-show", { type: "delete", items: s.value }))
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
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[4] || (p[4] = (b) => _(e).emit("vf-modal-show", { type: "upload", items: s.value }))
        }, Qi, 8, Ji),
        s.value.length == 1 && s.value[0].mime_type == "application/zip" ? (w(), M("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": _(a)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[5] || (p[5] = (b) => !s.value.length || _(e).emit("vf-modal-show", { type: "unarchive", items: s.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, rn, 2))
        ], 8, en)) : (w(), M("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": _(a)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p[6] || (p[6] = (b) => !s.value.length || _(e).emit("vf-modal-show", { type: "archive", items: s.value }))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, an, 2))
        ], 8, nn))
      ])),
      d("div", un, [
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (w(), M("svg", {
            onClick: p[7] || (p[7] = (b) => _(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, fn))
        ], 8, dn),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m
        }, [
          (w(), M("svg", pn, [
            f.value ? (w(), M("path", gn)) : (w(), M("path", vn))
          ]))
        ], 8, mn),
        d("div", {
          class: "mx-1.5",
          "aria-label": _(a)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: p[8] || (p[8] = (b) => g.value.length || _(e).emit("vf-view-toggle", i.value == "list" ? "grid" : "list"))
        }, [
          (w(), M("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([g.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            i.value == "grid" ? (w(), M("path", yn)) : q("", !0),
            i.value == "list" ? (w(), M("path", wn)) : q("", !0)
          ], 2))
        ], 8, bn)
      ])
    ]));
  }
});
var kn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $r = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(kn, function() {
    function t(u, l) {
      if (!(u instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(u, l) {
      for (var r = 0; r < l.length; r++) {
        var v = l[r];
        v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(u, v.key, v);
      }
    }
    function a(u, l, r) {
      return l && n(u.prototype, l), r && n(u, r), u;
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
      }), l && h(u, l);
    }
    function m(u) {
      return m = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, m(u);
    }
    function h(u, l) {
      return h = Object.setPrototypeOf || function(v, c) {
        return v.__proto__ = c, v;
      }, h(u, l);
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
        var S = Function.bind.apply(c, k), O = new S();
        return x && h(O, x.prototype), O;
      }, b.apply(null, arguments);
    }
    function E(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function C(u) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return C = function(v) {
        if (v === null || !E(v))
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
        }), h(c, v);
      }, C(u);
    }
    function T(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function L(u, l) {
      return l && (typeof l == "object" || typeof l == "function") ? l : T(u);
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
          var S = Object.getOwnPropertyDescriptor(k, y);
          return S.get ? S.get.call(x) : S.value;
        }
      }, I(u, l, r || u);
    }
    function ae(u, l) {
      return X(u) || ce(u, l) || me(u, l) || N();
    }
    function J(u) {
      return D(u) || Z(u) || me(u) || H();
    }
    function D(u) {
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
    function ce(u, l) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], v = !0, c = !1, y = void 0;
        try {
          for (var x = u[Symbol.iterator](), k; !(v = (k = x.next()).done) && (r.push(k.value), !(l && r.length === l)); v = !0)
            ;
        } catch (S) {
          c = !0, y = S;
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
      var c = l.x, y = l.y, x = v.x, k = v.y, S = {
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
      return S[r];
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
    }, nt = function(u) {
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
          var S, O = (S = k[1]) === null || S === void 0 ? void 0 : S.split(",");
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
          var k, S = (k = x[1]) === null || k === void 0 ? void 0 : k.split(",");
          v.x = parseInt(S[0]) || 0, v.y = parseInt(S[1]) || 0;
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
      var l = u.shiftKey, r = u.keyboardDragSpeed, v = u.zoom, c = u.key, y = u.dragKeys, x = u.scrollDiff, k = u.canScroll, S = u.scrollCallback, O = {
        x: 0,
        y: 0
      }, A = l ? r * 4 * v : r * v;
      return y.left.includes(c) && (O.x = x.x || -A, !l && !x.x && k && S(["left"], r)), y.right.includes(c) && (O.x = x.x || A, !l && !x.x && k && S(["right"], r)), y.up.includes(c) && (O.y = x.y || -A, !l && !x.y && k && S(["top"], r)), y.down.includes(c) && (O.y = x.y || A, !l && !x.y && k && S(["bottom"], r)), O;
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
      var k = l.getBoundingClientRect(), S = Ut({
        elementRect: k,
        containerRect: v
      });
      qr({
        element: l,
        edges: S,
        elementRect: k,
        containerRect: v,
        elementPos: x,
        useTransform: c
      });
    }, Qr = function(u, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), u.disconnect();
    }, ei = function(u, l, r) {
      if (!!l.length) {
        var v = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = u instanceof HTMLDocument ? v || document.body : u, y = l.includes("top") && c.scrollTop > 0, x = l.includes("bottom") && c.scrollTop < c.scrollHeight, k = l.includes("left") && c.scrollLeft > 0, S = l.includes("right") && c.scrollLeft < c.scrollWidth;
        y && (c.scrollTop -= 1 * r), x && (c.scrollTop += 1 * r), k && (c.scrollLeft -= 1 * r), S && (c.scrollLeft += 1 * r);
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
          condition: function(A) {
            return A.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, x = function() {
        var A = ae(S[k], 2), z = A[0], K = A[1];
        ["pre", !1].forEach(function(re) {
          return l(re ? "".concat(z, ":").concat(re) : z, function(pe) {
            return K.forEach(function(ne) {
              return (!ne.condition || ne.condition(pe)) && r(re ? "".concat(re).concat(ne.name) : ne.name, f({
                items: c.elements,
                isDragging: v.isDragging
              }, pe));
            });
          });
        });
      }, k = 0, S = Object.entries(y); k < S.length; k++)
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
          var S = {
            scroll_directions: x,
            scroll_multiplier: k
          };
          r.PubSub.publish("Area:scroll:pre", S), ei(r._node, x, k), r.PubSub.publish("Area:scroll", S);
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
        var r = this, v = l.DS, c = l.dragKeys, y = l.draggability, x = l.keyboardDrag, k = l.keyboardDragSpeed, S = l.useTransform, O = l.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(A) {
          var z = A.event, K = A.key;
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
            r._elements.forEach(function(ne) {
              return Wt({
                element: ne,
                posDirection: pe,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], re);
          }
        }), i(this, "keyboardEnd", function(A) {
          var z = A.event, K = A.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var re = {
              event: z,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], re);
          }
        }), i(this, "start", function(A) {
          var z = A.isDragging, K = A.isDraggingKeyboard;
          !z || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(A) {
          A != null && A.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(A) {
          var z = A.isDragging, K = A.isDraggingKeyboard;
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
        }), i(this, "handleZIndex", function(A) {
          r._elements.forEach(function(z) {
            return z.style.zIndex = "".concat((parseInt(z.style.zIndex) || 0) + A ? 9999 : -9998);
          });
        }), this.DS = v, this._useTransform = S, this._keyboardDragSpeed = k, this._keyboardDrag = x, this._zoom = O, this._draggability = y, this._dragKeys = {
          up: c.up.map(function(A) {
            return A.toLowerCase();
          }),
          down: c.down.map(function(A) {
            return A.toLowerCase();
          }),
          left: c.left.map(function(A) {
            return A.toLowerCase();
          }),
          right: c.right.map(function(A) {
            return A.toLowerCase();
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
    }(), ni = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.areaElement, y = l.draggability, x = l.immediateDrag, k = l.selectableClass;
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
            var A = r.DS, z = A.stores, K = z.PointerStore, re = z.KeyStore, pe = A.SelectableSet, ne = A.SelectedSet;
            K.start(O);
            var ze = O.target;
            !pe.has(ze) || (re.isMultiSelectKeyPressed(O) || ne.clear(), ne.toggle(ze), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(S) {
          var O = S.event, A = S.scroll_directions, z = S.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: O,
            scroll_directions: A,
            scroll_multiplier: z,
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
        }), this._areaElement = c, this._draggability = y, this._immediateDrag = x, this._selectableClass = k, this.DS = v, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(S) {
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
        var c, y = v.elements, x = v.className, k = v.hoverClassName, S = v.draggability, O = v.useTransform, A = v.DS;
        return t(this, r), c = l.call(this), i(T(c), "_initElements", void 0), i(T(c), "_className", void 0), i(T(c), "_hoverClassName", void 0), i(T(c), "_useTransform", void 0), i(T(c), "_draggability", void 0), i(T(c), "init", function() {
          return c._initElements.forEach(function(z) {
            return c.add(z);
          });
        }), i(T(c), "clear", function() {
          return c.forEach(function(z) {
            return c.delete(z);
          });
        }), i(T(c), "_onClick", function(z) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: z
          });
        }), i(T(c), "_onPointer", function(z) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: z
          });
        }), i(T(c), "addAll", function(z) {
          return z.forEach(function(K) {
            return c.add(K);
          });
        }), i(T(c), "deleteAll", function(z) {
          return z.forEach(function(K) {
            return c.delete(K);
          });
        }), c.DS = A, c._initElements = Ve(y), c._className = x, c._hoverClassName = k, c._useTransform = O, c._draggability = S, c.DS.subscribe("Interaction:init", c.init), c;
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
    }(/* @__PURE__ */ C(Set)), si = /* @__PURE__ */ function(u) {
      g(r, u);
      var l = V(r);
      function r(v) {
        var c, y = v.className, x = v.DS;
        return t(this, r), c = l.call(this), i(T(c), "_className", void 0), i(T(c), "clear", function() {
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
    }(/* @__PURE__ */ C(Set)), li = /* @__PURE__ */ function() {
      function u(l) {
        var r = this, v = l.DS, c = l.hoverClassName, y = l.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(x) {
          var k = x.event, S = x.isDragging;
          S || (r._storePrevious(k), r._handleInsideSelection(!0, k));
        }), i(this, "update", function(x) {
          var k = x.isDragging;
          k || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(x, k) {
          for (var S = r.DS, O = S.SelectableSet, A = S.SelectorArea, z = S.Selector, K = O.elements.map(function(Ce) {
            return [Ce, Ce.getBoundingClientRect()];
          }), re = [], pe = [], ne = 0, ze = K.length; ne < ze; ne++)
            !A.isInside(K[ne][0], K[ne][1]) || (yt(K[ne][1], z.rect) ? re.push(K[ne][0]) : pe.push(K[ne][0]));
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
          var S = k.isDragging;
          if (!S) {
            var O = r.DS.stores.PointerStore, A = O.initialValArea;
            Xt(r.HTMLNode, ie(A, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(k) {
          var S = k.isDragging;
          if (!(S || r.DS.continue)) {
            var O = r.DS.stores, A = O.ScrollStore, z = O.PointerStore, K = Yr({
              scrollAmount: A.scrollAmount,
              initialPointerPos: z.initialValArea,
              pointerPos: z.currentValArea
            });
            Xt(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = v, this.HTMLNode = c || nt(x), this.HTMLNode.classList.add(y), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
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
          var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", S = document.body ? "body" : "documentElement", O = "".concat(k, "Child");
          r.HTMLNode[O](r.DS.Selector.HTMLNode), document[S][O](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var k = r.DS.Area.rect, S = r.DS.Area.computedBorder, O = r.HTMLNode.style, A = "".concat(k.top + S.top, "px"), z = "".concat(k.left + S.left, "px"), K = "".concat(k.width, "px"), re = "".concat(k.height, "px");
          O.top !== A && (O.top = A), O.left !== z && (O.left = z), O.width !== K && (O.width = K), O.height !== re && (O.height = re);
        }), i(this, "stop", function(k) {
          r.stopAutoScroll(), k && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var k = r.DS, S = k.stores.PointerStore, O = k.Area;
            r.currentEdges = Ut({
              elementRect: ie(S.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && O.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(k, S) {
          return r.DS.Area.HTMLNode.contains(k) && r.DS.stores.ScrollStore.canScroll ? !0 : yt(r.rect, S || k.getBoundingClientRect());
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
          }, S = k[x];
          return S ? (console.warn("[DragSelect] ".concat(x, ' is deprecated. Use "').concat(S, '" instead. Act Now!. See docs for more info')), S.toLowerCase()) : x.toLowerCase();
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
        var r = this, v = l.area, c = v === void 0 ? document : v, y = l.selectables, x = y === void 0 ? [] : y, k = l.autoScrollSpeed, S = k === void 0 ? 5 : k, O = l.overflowTolerance, A = O === void 0 ? {
          x: 25,
          y: 25
        } : O, z = l.zoom, K = z === void 0 ? 1 : z, re = l.customStyles, pe = re === void 0 ? !1 : re, ne = l.multiSelectMode, ze = ne === void 0 ? !1 : ne, at = l.multiSelectToggling, Ce = at === void 0 ? !0 : at, Ft = l.multiSelectKeys, pi = Ft === void 0 ? ["Control", "Shift", "Meta"] : Ft, qt = l.selector, gi = qt === void 0 ? void 0 : qt, Gt = l.draggability, wt = Gt === void 0 ? !0 : Gt, Jt = l.immediateDrag, vi = Jt === void 0 ? !0 : Jt, Zt = l.keyboardDrag, bi = Zt === void 0 ? !0 : Zt, yi = l.dragKeys, Qt = l.keyboardDragSpeed, wi = Qt === void 0 ? 10 : Qt, er = l.useTransform, tr = er === void 0 ? !0 : er, rr = l.hoverClass, ir = rr === void 0 ? "ds-hover" : rr, nr = l.selectableClass, or = nr === void 0 ? "ds-selectable" : nr, ar = l.selectedClass, xi = ar === void 0 ? "ds-selected" : ar, sr = l.selectorClass, _i = sr === void 0 ? "ds-selector" : sr, lr = l.selectorAreaClass, ki = lr === void 0 ? "ds-selector-area" : lr, Si = l.callback, Di = l.onDragMove, Mi = l.onDragStartBegin, Ci = l.onDragStart, $i = l.onElementSelect, Ei = l.onElementUnselect;
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
          autoScrollSpeed: S,
          overflowTolerance: A
        }), this.SelectableSet = new ai({
          elements: x,
          DS: this,
          className: or,
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
        }), this.Interaction = new ni({
          areaElement: c,
          DS: this,
          draggability: wt,
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
      return a(u, [{
        key: "_callbacksTemp",
        value: function(r) {
          var v = r.callback, c = r.onDragMove, y = r.onDragStart, x = r.onDragStartBegin, k = r.onElementSelect, S = r.onElementUnselect, O = function(z, K) {
            return console.warn("[DragSelect] ".concat(z, ' is deprecated. Use DragSelect.subscribe("').concat(K, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          v && (O("callback", "callback"), this.subscribe("callback", function(A) {
            var z = A.items;
            A.item;
            var K = A.event;
            return v(z, K);
          })), c && (O("onDragMove", "dragmove"), this.subscribe("dragmove", function(A) {
            A.items, A.item;
            var z = A.event;
            return c(z);
          })), y && (O("onDragStart", "dragstart"), this.subscribe("dragstart", function(A) {
            A.items, A.item;
            var z = A.event;
            return y(z);
          })), x && (O("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(A) {
            A.items, A.item;
            var z = A.event;
            return x(z);
          })), k && (O("onElementSelect", "elementselect"), this.subscribe("elementselect", function(A) {
            A.items;
            var z = A.item, K = A.event;
            return k(z, K);
          })), S && (O("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(A) {
            A.items;
            var z = A.item, K = A.event;
            return S(z, K);
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
const Sn = $r.exports, Dn = (o, e, t, n, a) => (e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B"), Mn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), Cn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, $n = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), En = [
  $n
], Tn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, An = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), On = [
  An
], Pn = {
  name: "VFSortIcon"
}, lt = /* @__PURE__ */ Object.assign(Pn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (w(), M("div", null, [
      o.direction == "down" ? (w(), M("svg", Cn, En)) : q("", !0),
      o.direction == "up" ? (w(), M("svg", Tn, On)) : q("", !0)
    ]));
  }
}), In = ["onClick"], Nn = {
  name: "VFToast.vue"
}, Ln = /* @__PURE__ */ Object.assign(Nn, {
  setup(o) {
    const e = B("emitter"), { getStore: t } = B("storage"), n = P(t("full-screen", !1)), a = (g) => g == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = P([]), s = (g) => {
      i.value.splice(g, 1);
    }, f = (g) => {
      let m = i.value.findIndex((h) => h.id === g);
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
      class: de([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      we(Ai, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: F(() => [
          (w(!0), M(le, null, be(i.value, (h, p) => (w(), M("div", {
            onClick: (b) => s(p),
            key: h,
            class: de([a(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, $(h.label), 11, In))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Ne = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: jn } = Se(), $t = (o, e) => jn.value + "?" + Ne({ q: "preview", adapter: o, path: e }), Vn = { class: "relative flex-auto flex flex-col overflow-hidden" }, zn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Bn = { class: "absolute" }, Rn = /* @__PURE__ */ d("svg", {
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
], -1), Hn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Un = ["onDblclick", "onTouchstart", "onContextmenu", "data-type", "data-item", "data-index"], Kn = { class: "grid grid-cols-12 items-center" }, Yn = { class: "flex col-span-7 items-center" }, Wn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Fn = [
  Xn
], qn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jn = [
  Gn
], Zn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Qn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, eo = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], to = { class: "grid grid-cols-12 items-center" }, ro = { class: "flex col-span-7 items-center" }, io = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, no = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), oo = [
  no
], ao = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, so = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), lo = [
  so
], co = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, uo = { class: "col-span-2 text-center" }, ho = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, fo = ["onDblclick", "onTouchstart", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], mo = { class: "relative" }, po = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, go = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vo = [
  go
], bo = ["src"], yo = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xo = [
  wo
], _o = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, ko = { class: "break-all" }, So = {
  name: "VFExplorer"
}, Do = /* @__PURE__ */ Object.assign(So, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { setStore: n, getStore: a } = B("storage"), i = (j) => j == null ? void 0 : j.substring(0, 3), s = (j) => j.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = P(null), g = P(null), m = P(0), h = P(null), { t: p } = B("i18n"), b = Math.floor(Math.random() * 2 ** 32), E = P(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      E.value = !E.value, n("full-screen", E.value);
    });
    const C = P("");
    t.on("vf-search-query", ({ newQuery: j }) => {
      C.value = j, j ? t.emit("vf-fetch", {
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
    let T = null;
    const L = () => {
      T && clearTimeout(T);
    }, V = (j) => {
      T = setTimeout(() => {
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
    }, D = () => h.value.getSelection().map((j) => JSON.parse(j.dataset.item)), X = (j, H) => {
      if (j.altKey || j.ctrlKey || j.metaKey)
        return j.preventDefault(), !1;
      j.dataTransfer.setDragImage(g.value, 0, 15), j.dataTransfer.effectAllowed = "all", j.dataTransfer.dropEffect = "copy", j.dataTransfer.setData("items", JSON.stringify(D()));
    }, Z = (j, H) => {
      j.preventDefault();
      let N = JSON.parse(j.dataTransfer.getData("items"));
      if (N.find((Y) => Y.storage != a("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: N, to: H } });
    }, ce = (j, H) => {
      j.preventDefault(), !H || H.type !== "dir" || h.value.getSelection().find((N) => N == j.currentTarget) ? (j.dataTransfer.dropEffect = "none", j.dataTransfer.effectAllowed = "none") : j.dataTransfer.dropEffect = "copy";
    };
    return _e(() => {
      h.value = new Sn({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => gt(() => {
        h.value.clearSelection(), h.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), h.value.subscribe("predragstart", ({ event: j, isDragging: H }) => {
        if (H)
          m.value = h.value.getSelection().length, h.value.break();
        else {
          const N = j.target.offsetWidth - j.offsetX, Y = j.target.offsetHeight - j.offsetY;
          N < 15 && Y < 15 && (h.value.clearSelection(), h.value.break());
        }
      }), h.value.subscribe("predragmove", ({ isDragging: j }) => {
        j && h.value.break();
      }), h.value.subscribe("callback", ({ items: j, event: H, isDragging: N }) => {
        t.emit("vf-nodes-selected", D()), m.value = h.value.getSelection().length;
      });
    }), Oi(() => h.value.start()), _e(() => {
      pt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (j, H) => (w(), M("div", Vn, [
      o.view == "list" || C.value.length ? (w(), M("div", zn, [
        d("div", {
          onClick: H[0] || (H[0] = (N) => J("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          ue($(_(p)("Name")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "basename"]
          ])
        ]),
        C.value.length ? q("", !0) : (w(), M("div", {
          key: 0,
          onClick: H[1] || (H[1] = (N) => J("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          ue($(_(p)("Size")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "file_size"]
          ])
        ])),
        C.value.length ? q("", !0) : (w(), M("div", {
          key: 1,
          onClick: H[2] || (H[2] = (N) => J("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          ue($(_(p)("Date")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "last_modified"]
          ])
        ])),
        C.value.length ? (w(), M("div", {
          key: 2,
          onClick: H[3] || (H[3] = (N) => J("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          ue($(_(p)("Filepath")) + " ", 1),
          ve(we(lt, {
            direction: I.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [st, I.active && I.column == "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      d("div", Bn, [
        d("div", {
          ref_key: "dragImage",
          ref: g,
          class: "absolute -z-50 -top-96"
        }, [
          Rn,
          d("div", Hn, $(m.value), 1)
        ], 512)
      ]),
      d("div", {
        class: de([E.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f,
        onContextmenu: H[7] || (H[7] = Pe((N) => _(t).emit("vf-contextmenu-show", { event: N, area: f.value, items: D() }), ["self", "prevent"]))
      }, [
        C.value.length ? (w(!0), M(le, { key: 0 }, be(ae(), (N, Y) => (w(), M("div", {
          onDblclick: (U) => R(N),
          onTouchstart: (U) => V(N),
          onTouchend: H[4] || (H[4] = (U) => L()),
          onContextmenu: Pe((U) => _(t).emit("vf-contextmenu-show", { event: U, area: f.value, items: D(), target: N }), ["prevent"]),
          class: de(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          d("div", Kn, [
            d("div", Yn, [
              N.type == "dir" ? (w(), M("svg", Wn, Fn)) : (w(), M("svg", qn, Jn)),
              d("span", Zn, $(N.basename), 1)
            ]),
            d("div", Qn, $(N.path), 1)
          ])
        ], 42, Un))), 256)) : q("", !0),
        o.view == "list" && !C.value.length ? (w(!0), M(le, { key: 1 }, be(ae(), (N, Y) => (w(), M("div", {
          draggable: "true",
          onDblclick: (U) => R(N),
          onTouchstart: (U) => V(N),
          onTouchend: H[5] || (H[5] = (U) => L()),
          onContextmenu: Pe((U) => _(t).emit("vf-contextmenu-show", { event: U, area: f.value, items: D(), target: N }), ["prevent"]),
          onDragstart: (U) => X(U),
          onDragover: (U) => ce(U, N),
          onDrop: (U) => Z(U, N),
          class: de(["vf-item-" + _(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": N.type,
          "data-item": JSON.stringify(N),
          "data-index": Y
        }, [
          d("div", to, [
            d("div", ro, [
              N.type == "dir" ? (w(), M("svg", io, oo)) : (w(), M("svg", ao, lo)),
              d("span", co, $(N.basename), 1)
            ]),
            d("div", uo, $(N.file_size ? _(Dn)(N.file_size) : ""), 1),
            d("div", ho, $(_(Mn)(N.last_modified)), 1)
          ])
        ], 42, eo))), 256)) : q("", !0),
        o.view == "grid" && !C.value.length ? (w(!0), M(le, { key: 2 }, be(ae(!1), (N, Y) => {
          var U, ie;
          return w(), M("div", {
            draggable: "true",
            onDblclick: (Q) => R(N),
            onTouchstart: (Q) => V(N),
            onTouchend: H[6] || (H[6] = (Q) => L()),
            onContextmenu: Pe((Q) => _(t).emit("vf-contextmenu-show", { event: Q, area: f.value, items: D(), target: N }), ["prevent"]),
            onDragstart: (Q) => X(Q),
            onDragover: (Q) => ce(Q, N),
            onDrop: (Q) => Z(Q, N),
            class: de(["vf-item-" + _(b), "border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"]),
            "data-type": N.type,
            "data-item": JSON.stringify(N),
            "data-index": Y
          }, [
            d("div", null, [
              d("div", mo, [
                N.type == "dir" ? (w(), M("svg", po, vo)) : ((U = N.mime_type) != null ? U : "").startsWith("image") ? (w(), M("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: _($t)(_(a)("adapter", e.data.adapter), N.path),
                  alt: ""
                }, null, 8, bo)) : (w(), M("svg", yo, xo)),
                ((ie = N.mime_type) != null ? ie : "").startsWith("image") ? q("", !0) : (w(), M("div", _o, $(i(N.extension)), 1))
              ]),
              d("span", ko, $(s(N.basename)), 1)
            ])
          ], 42, fo);
        }), 256)) : q("", !0)
      ], 34),
      we(Ln)
    ]));
  }
}), Mo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Co = { class: "flex leading-5 items-center" }, $o = ["aria-label"], Eo = /* @__PURE__ */ d("svg", {
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
], -1), To = [
  Eo
], Ao = ["value"], Oo = { class: "ml-3" }, Po = { key: 0 }, Io = { class: "ml-1" }, No = { class: "flex leading-5 items-center" }, Lo = {
  value: "",
  disabled: ""
}, jo = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), Vo = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), zo = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), Bo = ["aria-label"], Ro = /* @__PURE__ */ d("svg", {
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
], -1), Ho = [
  Ro
], Uo = {
  name: "VFStatusbar"
}, Ko = /* @__PURE__ */ Object.assign(Uo, {
  props: {
    data: Object
  },
  setup(o) {
    var b;
    const e = o, t = B("emitter"), { getStore: n, setStore: a } = B("storage"), i = P(0), s = P((b = n("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: g } = B("i18n"), m = P(n("locale", "")), h = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: s.value } }), a("adapter", s.value);
    };
    t.on("vf-nodes-selected", (E) => {
      i.value = E.length;
    });
    const p = P("");
    return t.on("vf-search-query", ({ newQuery: E }) => {
      p.value = E;
    }), (E, C) => (w(), M("div", Mo, [
      d("div", Co, [
        d("div", {
          class: "mx-2",
          "aria-label": _(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, To, 8, $o),
        ve(d("select", {
          "onUpdate:modelValue": C[0] || (C[0] = (T) => s.value = T),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (w(!0), M(le, null, be(o.data.storages, (T) => (w(), M("option", { value: T }, $(T), 9, Ao))), 256))
        ], 544), [
          [cr, s.value]
        ]),
        d("div", Oo, [
          p.value.length ? (w(), M("span", Po, $(o.data.files.length) + " items found. ", 1)) : q("", !0),
          d("span", Io, $(i.value > 0 ? i.value + " " + _(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", No, [
        ve(d("select", {
          "onUpdate:modelValue": C[1] || (C[1] = (T) => m.value = T),
          onChange: C[2] || (C[2] = (T) => _(g)(T.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", Lo, $(_(f)("Language")), 1),
          jo,
          Vo,
          zo
        ], 544), [
          [cr, m.value]
        ]),
        d("span", {
          "aria-label": _(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: C[3] || (C[3] = (T) => _(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: _(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Ho, 8, Bo)
      ])
    ]));
  }
}), Yo = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Wo = (o, e, t) => {
  const n = P(o);
  return Pi((i, s) => ({
    get() {
      return i(), n.value;
    },
    set: Yo(
      (f) => {
        n.value = f, s();
      },
      e,
      t
    )
  }));
}, Xo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Fo = ["aria-label"], qo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Go = [
  qo
], Jo = ["onClick"], Zo = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Qo = [
  Zo
], ea = { class: "flex leading-5" }, ta = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), ra = ["title", "onClick"], ia = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, na = /* @__PURE__ */ d("svg", {
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
], -1), oa = ["onKeydown", "placeholder"], aa = /* @__PURE__ */ d("path", {
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
  setup(o) {
    const e = o, t = B("emitter"), { getStore: n } = B("storage"), a = P(null), i = P([]), s = P(!1), f = P(null), { t: g } = B("i18n");
    t.on("vf-explorer-update", () => {
      var R;
      let L = [], V = [];
      a.value = (R = e.data.dirname) != null ? R : n("adapter", "local") + "://", a.value.length == 0 && (i.value = []), a.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(I) {
        L.push(I), L.join("/") != "" && V.push({
          basename: I,
          name: I,
          path: n("adapter", "local") + "://" + L.join("/"),
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
    const h = () => {
      s.value = !0, gt(() => f.value.focus());
    }, p = Wo("", 400);
    pt(p, (L) => {
      t.emit("vf-search-query", { newQuery: L });
    });
    const b = () => i.value.length && !s.value, E = (L) => {
      var R;
      L.preventDefault();
      let V = JSON.parse(L.dataTransfer.getData("items"));
      if (V.find((I) => I.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: V, to: (R = i.value[i.value.length - 2]) != null ? R : { path: n("adapter", "local") + "://" } }
      });
    }, C = (L) => {
      L.preventDefault(), b() ? L.dataTransfer.dropEffect = "copy" : (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none");
    }, T = () => {
      p.value == "" && m();
    };
    return (L, V) => (w(), M("div", Xo, [
      d("span", {
        "aria-label": _(g)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (w(), M("svg", {
          onDragover: V[0] || (V[0] = (R) => C(R)),
          onDrop: V[1] || (V[1] = (R) => E(R)),
          onClick: V[2] || (V[2] = (R) => {
            var I, ae;
            return !b() || _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: (ae = (I = i.value[i.value.length - 2]) == null ? void 0 : I.path) != null ? ae : _(n)("adapter", "local") + "://" } });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Go, 34))
      ], 8, Fo),
      s.value ? (w(), M("div", ia, [
        na,
        ve(d("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ye(m, ["esc"]),
          onBlur: T,
          "onUpdate:modelValue": V[4] || (V[4] = (R) => Ii(p) ? p.value = R : null),
          placeholder: _(g)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, oa), [
          [We, _(p)]
        ]),
        (w(), M("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: m,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, sa))
      ])) : (w(), M("div", {
        key: 0,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Pe(h, ["self"])
      }, [
        (w(), M("svg", {
          onClick: V[3] || (V[3] = (R) => _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Qo)),
        d("div", ea, [
          (w(!0), M(le, null, be(i.value, (R, I) => (w(), M("div", { key: I }, [
            ta,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: R.basename,
              onClick: (ae) => _(t).emit("vf-fetch", { params: { q: "index", adapter: o.data.adapter, path: R.path } })
            }, $(R.name), 9, ra)
          ]))), 128))
        ])
      ], 8, Jo))
    ]));
  }
}), ua = ["onClick"], da = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), ha = {
  name: "VFContextMenu"
}, fa = /* @__PURE__ */ Object.assign(ha, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), n = P(null), { apiUrl: a } = Se(), i = ht({
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
    }, h = P("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      h.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: E, items: C, target: T = null }) => {
      if (i.items = [], h.value)
        if (T)
          i.items.push(g.openDir), t.emit("vf-context-selected", [T]), console.log("search item selected");
        else
          return;
      else
        !T && !h.value ? (i.items.push(g.refresh), i.items.push(g.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")) : C.length > 1 && C.some((L) => L.path === T.path) ? (i.items.push(g.refresh), i.items.push(g.archive), i.items.push(g.delete), t.emit("vf-context-selected", C), console.log(C.length + " selected (more than 1 item.)")) : (T.type == "dir" ? i.items.push(g.open) : (i.items.push(g.preview), i.items.push(g.download)), i.items.push(g.rename), T.mime_type == "application/zip" ? i.items.push(g.unarchive) : i.items.push(g.archive), i.items.push(g.delete), t.emit("vf-context-selected", [T]), console.log(T.type + " is selected"));
      p(b, E);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (b, E) => {
      i.active = !0, gt(() => {
        let C = E.getBoundingClientRect(), T = b.pageX, L = b.pageY, V = n.value.offsetHeight, R = n.value.offsetWidth;
        T = C.right - b.pageX + window.scrollX < R ? T - R : T, L = C.bottom - b.pageY + window.scrollY < V ? L - V : L, i.positions = {
          left: T + "px",
          top: L + "px"
        };
      });
    };
    return (b, E) => i.active ? (w(), M("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: n,
      style: Cr(i.positions)
    }, [
      (w(!0), M(le, null, be(i.items, (C) => (w(), M("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: C.title,
        onClick: (T) => m(C)
      }, [
        da,
        d("span", null, $(C.title()), 1)
      ], 8, ua))), 128))
    ], 4)) : q("", !0);
  }
}), ma = (o, e) => {
  const t = o[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function pa(o) {
  const e = await ma(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.fee60fe4.js"), "../locales/tr.json": () => import("./tr.df99b8f1.js") }), `../locales/${o}.json`);
  return JSON.parse(e.default);
}
function ga(o, e) {
  const { getStore: t, setStore: n } = Ct(o), a = ["en", "tr"], i = P({}), s = (m) => {
    a.includes(m) || (console.log("The selected locale is not yet supported. The fallback language is set as 'en'"), m = "en"), pa(m).then((h) => {
      i.value = h, n("locale", m), n("translations", h), console.log(m + " is loaded.");
    });
  };
  t("locale") ? i.value = t("translations") : s(e);
  const f = (m, ...h) => h.length ? f(m = m.replace("%s", h.shift()), ...h) : m;
  function g(m, ...h) {
    return i.value.hasOwnProperty(m) ? f(i.value[m], ...h) : m;
  }
  return { t: g, support_locales: a, changeLocale: s };
}
const va = ["aria-label"], ba = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), ya = [
  ba
], wa = {
  name: "Message"
}, Me = /* @__PURE__ */ Object.assign(wa, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  setup(o) {
    var s;
    const { t: e } = B("i18n"), t = P(!1), n = P(null), a = P((s = n.value) == null ? void 0 : s.strMessage);
    pt(a, () => t.value = !1);
    const i = () => t.value = !0;
    return (f, g) => (w(), M("div", null, [
      t.value ? q("", !0) : (w(), M("div", {
        key: 0,
        ref_key: "strMessage",
        ref: n,
        class: de(["flex mt-1 p-1 px-2 rounded text-sm", o.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Mt(f.$slots, "default"),
        d("div", {
          class: "ml-auto cursor-pointer",
          onClick: i,
          "aria-label": _(e)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, ya, 8, va)
      ], 2))
    ]));
  }
}), xa = /* @__PURE__ */ d("iframe", {
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
  setup(o) {
    const e = o, t = Li(), { setStore: n, getStore: a } = Ct(e.id);
    xt("emitter", t), xt("storage", Ct(e.id));
    const i = ga(e.id, e.locale);
    xt("i18n", i);
    const { apiUrl: s, setApiUrl: f } = Se();
    f(e.url);
    const g = ht({ adapter: "local", storages: [], dirname: ".", files: [] }), m = P(a("viewport", "grid")), h = P(a("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      h.value = !h.value, n("darkMode", h.value);
    });
    const p = P(a("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      p.value = !p.value, n("full-screen", p.value);
    }), t.on("vf-view-toggle", (C) => {
      m.value = C;
    });
    const b = ht({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      b.active = !1;
    }), t.on("vf-modal-show", (C) => {
      b.active = !0, b.type = C.type, b.data = C;
    });
    const E = (C) => {
      Object.assign(g, C), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", ({ params: C, onSuccess: T = null, onError: L = null }) => {
      ft(s.value, { params: C }).then((V) => {
        t.emit("vf-modal-close"), E(V), T(V);
      }).catch((V) => {
        L && L(V);
      });
    }), t.on("vf-download", (C) => {
      document.getElementById("download_frame").src = C, t.emit("vf-modal-close");
    }), _e(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: a("adapter", g.adapter) } });
    }), (C, T) => (w(), M("div", {
      class: de(h.value ? "dark" : "")
    }, [
      d("div", {
        class: de([p.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Cr(p.value ? "" : "max-height: " + o.maxHeight),
        onMousedown: T[0] || (T[0] = (L) => _(t).emit("vf-contextmenu-hide"))
      }, [
        we(_n, { data: g }, null, 8, ["data"]),
        we(ca, { data: g }, null, 8, ["data"]),
        we(Do, {
          view: m.value,
          data: g
        }, null, 8, ["view", "data"]),
        we(Ko, { data: g }, null, 8, ["data"])
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
}), Sa = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), Da = { class: "fixed z-10 inset-0 overflow-y-auto" }, Ma = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, Ca = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, $a = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, De = {
  __name: "ModalLayout",
  setup(o) {
    const e = B("emitter");
    return _e(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (w(), M("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ye((a) => _(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Sa,
      d("div", Da, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Pe((a) => _(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", Ma, [
            d("div", Ca, [
              Mt(t.$slots, "default")
            ]),
            d("div", $a, [
              Mt(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Ea = { class: "sm:flex sm:items-start" }, Ta = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, ja = /* @__PURE__ */ d("path", {
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
}, Ba = /* @__PURE__ */ d("path", {
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
  setup(o) {
    const e = o, t = B("emitter"), { getStore: n } = B("storage"), { t: a } = B("i18n"), i = P(e.selection.items), s = P(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: n("adapter", "local"),
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
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1),
        d("div", Ua, $(_(a)("This action cannot be undone.")), 1)
      ]),
      default: F(() => [
        d("div", Ea, [
          Ta,
          d("div", Aa, [
            d("h3", Oa, $(_(a)("Delete files")), 1),
            d("div", Pa, [
              d("p", Ia, $(_(a)("Are you sure you want to delete these files ?")), 1),
              (w(!0), M(le, null, be(i.value, (h) => (w(), M("p", Na, [
                h.type == "dir" ? (w(), M("svg", La, Va)) : (w(), M("svg", za, Ra)),
                d("span", Ha, $(h.basename), 1)
              ]))), 256)),
              s.value.length ? (w(), G(Me, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  ue($(s.value), 1)
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
}), Wa = { class: "sm:flex sm:items-start" }, Xa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Fa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, qa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ga = { class: "mt-2" }, Ja = { class: "text-sm text-gray-500" }, Za = {
  name: "VFModalMessage"
}, Qa = /* @__PURE__ */ Object.assign(Za, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = B("emitter"), { t } = B("i18n");
    return (n, a) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => _(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(t)("Close")), 1)
      ]),
      default: F(() => {
        var i, s, f, g;
        return [
          d("div", Wa, [
            Xa,
            d("div", Fa, [
              d("h3", qa, $((s = (i = o.selection) == null ? void 0 : i.title) != null ? s : "Title"), 1),
              d("div", Ga, [
                d("p", Ja, $((g = (f = o.selection) == null ? void 0 : f.message) != null ? g : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), es = { class: "sm:flex sm:items-start" }, ts = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), rs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, is = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ns = { class: "mt-2" }, os = { class: "text-sm text-gray-500" }, as = ["onKeyup", "placeholder"], ss = {
  name: "VFModalNewFolder"
}, ls = /* @__PURE__ */ Object.assign(ss, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { getStore: n } = B("storage"), { t: a } = B("i18n"), i = P(""), s = P(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: n("adapter", "local"),
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
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", es, [
          ts,
          d("div", rs, [
            d("h3", is, $(_(a)("New Folder")), 1),
            d("div", ns, [
              d("p", os, $(_(a)("Create a new folder")), 1),
              ve(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => i.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Folder Name"),
                type: "text"
              }, null, 40, as), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(Me, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  ue($(s.value), 1)
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
}), cs = { class: "sm:flex sm:items-start" }, us = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
    const e = o, t = B("emitter"), { getStore: n } = B("storage"), { t: a } = B("i18n"), i = P(""), s = P(""), f = () => {
      i.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: n("adapter", "local"),
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
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: F(() => [
        d("div", cs, [
          us,
          d("div", ds, [
            d("h3", hs, $(_(a)("New File")), 1),
            d("div", fs, [
              d("p", ms, $(_(a)("Create a new file")), 1),
              ve(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => i.value = h),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("File Name"),
                type: "text"
              }, null, 40, ps), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(Me, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  ue($(s.value), 1)
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
    const t = o, n = P(""), a = P(""), i = P(null), s = P(!1), { apiUrl: f } = Se(), g = P(""), m = P(!1), { t: h } = B("i18n");
    _e(() => {
      ft(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((E) => {
        n.value = E, e("load");
      });
    });
    const p = () => {
      s.value = !s.value, a.value = n.value, s.value == !0 && gt(() => {
        i.value.focus();
      });
    }, b = () => {
      g.value = "", m.value = !1, ft(f.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: a.value },
        json: !1
      }).then((E) => {
        g.value = h("Updated."), n.value = E, e("load"), s.value = !s.value;
      }).catch((E) => {
        g.value = h(E.message), m.value = !0;
      });
    };
    return (E, C) => (w(), M(le, null, [
      d("div", bs, [
        d("div", ys, $(o.selection.item.basename), 1),
        d("div", ws, [
          s.value ? (w(), M("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(_(h)("Save")), 1)) : q("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: C[0] || (C[0] = (T) => p())
          }, $(s.value ? _(h)("Cancel") : _(h)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        s.value ? (w(), M("div", _s, [
          ve(d("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": C[1] || (C[1] = (T) => a.value = T),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [We, a.value]
          ])
        ])) : (w(), M("pre", xs, $(n.value), 1)),
        g.value.length ? (w(), G(Me, {
          key: 2,
          error: m.value
        }, {
          default: F(() => [
            ue($(g.value), 1)
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
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(o, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Er(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? dr(Object(t), !0).forEach(function(n) {
      Ms(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : dr(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function dt(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? dt = function(e) {
    return typeof e;
  } : dt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, dt(o);
}
function Ss(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function hr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function Ds(o, e, t) {
  return e && hr(o.prototype, e), t && hr(o, t), o;
}
function Ms(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Tr(o) {
  return Cs(o) || $s(o) || Es(o) || Ts();
}
function Cs(o) {
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
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = o[t];
  return n;
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
  return dt(o) === "object" && o !== null;
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
  return o && he(e) && (Array.isArray(o) || W(o.length) ? Vr(o).forEach(function(t, n) {
    e.call(o, t, n, o);
  }) : Ie(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var te = Object.assign || function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return Ie(e) && n.length > 0 && n.forEach(function(i) {
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
  oe(e, function(n, a) {
    Ks.test(a) && W(n) && (n = "".concat(n, "px")), t[a] = n;
  });
}
function Ys(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function se(o, e) {
  if (!!e) {
    if (W(o.length)) {
      oe(o, function(n) {
        se(n, e);
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
function xe(o, e) {
  if (!!e) {
    if (W(o.length)) {
      oe(o, function(t) {
        xe(t, e);
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
      oe(o, function(n) {
        He(n, e, t);
      });
      return;
    }
    t ? se(o, e) : xe(o, e);
  }
}
var Ws = /([a-z\d])([A-Z])/g;
function Ht(o) {
  return o.replace(Ws, "$1-$2").toLowerCase();
}
function jt(o, e) {
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
  if (vt) {
    var e = !1, t = function() {
    }, n = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    ke.addEventListener("test", t, n), ke.removeEventListener("test", t, n);
  }
  return o;
}();
function ye(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(zr).forEach(function(i) {
    if (!Br) {
      var s = o.listeners;
      s && s[i] && s[i][t] && (a = s[i][t], delete s[i][t], Object.keys(s[i]).length === 0 && delete s[i], Object.keys(s).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, a, n);
  });
}
function ge(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(zr).forEach(function(i) {
    if (n.once && !Br) {
      var s = o.listeners, f = s === void 0 ? {} : s;
      a = function() {
        delete f[i][t], o.removeEventListener(i, a, n);
        for (var m = arguments.length, h = new Array(m), p = 0; p < m; p++)
          h[p] = arguments[p];
        t.apply(o, h);
      }, f[i] || (f[i] = {}), f[i][t] && o.removeEventListener(i, f[i][t], n), f[i][t] = a, o.listeners = f;
    }
    o.addEventListener(i, a, n);
  });
}
function Ke(o, e, t) {
  var n;
  return he(Event) && he(CustomEvent) ? n = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(n);
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
function Mr(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function et(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, a = o.translateX, i = o.translateY, s = [];
  W(a) && a !== 0 && s.push("translateX(".concat(a, "px)")), W(i) && i !== 0 && s.push("translateY(".concat(i, "px)")), W(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), W(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), W(n) && n !== 1 && s.push("scaleY(".concat(n, ")"));
  var f = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function qs(o) {
  var e = Er({}, o), t = 0;
  return oe(o, function(n, a) {
    delete e[a], oe(e, function(i) {
      var s = Math.abs(n.startX - i.startX), f = Math.abs(n.startY - i.startY), g = Math.abs(n.endX - i.endX), m = Math.abs(n.endY - i.endY), h = Math.sqrt(s * s + f * f), p = Math.sqrt(g * g + m * m), b = (p - h) / h;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function ut(o, e) {
  var t = o.pageX, n = o.pageY, a = {
    endX: t,
    endY: n
  };
  return e ? a : Er({
    startX: t,
    startY: n
  }, a);
}
function Gs(o) {
  var e = 0, t = 0, n = 0;
  return oe(o, function(a) {
    var i = a.startX, s = a.startY;
    e += i, t += s, n += 1;
  }), e /= n, t /= n, {
    pageX: e,
    pageY: t
  };
}
function Te(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = Sr(n), s = Sr(t);
  if (i && s) {
    var f = t * e;
    a === "contain" && f > n || a === "cover" && f < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : s && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function Js(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var a = n % 90 * Math.PI / 180, i = Math.sin(a), s = Math.cos(a), f = e * s + t * i, g = e * i + t * s;
  return n > 90 ? {
    width: g,
    height: f
  } : {
    width: f,
    height: g
  };
}
function Zs(o, e, t, n) {
  var a = e.aspectRatio, i = e.naturalWidth, s = e.naturalHeight, f = e.rotate, g = f === void 0 ? 0 : f, m = e.scaleX, h = m === void 0 ? 1 : m, p = e.scaleY, b = p === void 0 ? 1 : p, E = t.aspectRatio, C = t.naturalWidth, T = t.naturalHeight, L = n.fillColor, V = L === void 0 ? "transparent" : L, R = n.imageSmoothingEnabled, I = R === void 0 ? !0 : R, ae = n.imageSmoothingQuality, J = ae === void 0 ? "low" : ae, D = n.maxWidth, X = D === void 0 ? 1 / 0 : D, Z = n.maxHeight, ce = Z === void 0 ? 1 / 0 : Z, me = n.minWidth, j = me === void 0 ? 0 : me, H = n.minHeight, N = H === void 0 ? 0 : H, Y = document.createElement("canvas"), U = Y.getContext("2d"), ie = Te({
    aspectRatio: E,
    width: X,
    height: ce
  }), Q = Te({
    aspectRatio: E,
    width: j,
    height: N
  }, "cover"), Xe = Math.min(ie.width, Math.max(Q.width, C)), Fe = Math.min(ie.height, Math.max(Q.height, T)), it = Te({
    aspectRatio: a,
    width: X,
    height: ce
  }), nt = Te({
    aspectRatio: a,
    width: j,
    height: N
  }, "cover"), ot = Math.min(it.width, Math.max(nt.width, i)), Le = Math.min(it.height, Math.max(nt.height, s)), bt = [-ot / 2, -Le / 2, ot, Le];
  return Y.width = Ue(Xe), Y.height = Ue(Fe), U.fillStyle = V, U.fillRect(0, 0, Xe, Fe), U.save(), U.translate(Xe / 2, Fe / 2), U.rotate(g * Math.PI / 180), U.scale(h, b), U.imageSmoothingEnabled = I, U.imageSmoothingQuality = J, U.drawImage.apply(U, [o].concat(Tr(bt.map(function(je) {
    return Math.floor(Ue(je));
  })))), U.restore(), Y;
}
var Hr = String.fromCharCode;
function Qs(o, e, t) {
  var n = "";
  t += e;
  for (var a = e; a < t; a += 1)
    n += Hr(o.getUint8(a));
  return n;
}
var el = /^data:.*,/;
function tl(o) {
  var e = o.replace(el, ""), t = atob(e), n = new ArrayBuffer(t.length), a = new Uint8Array(n);
  return oe(a, function(i, s) {
    a[s] = t.charCodeAt(s);
  }), n;
}
function rl(o, e) {
  for (var t = [], n = 8192, a = new Uint8Array(o); a.length > 0; )
    t.push(Hr.apply(null, Vr(a.subarray(0, n)))), a = a.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function il(o) {
  var e = new DataView(o), t;
  try {
    var n, a, i;
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
        var h = e.getUint16(m);
        if (n = h === 18761, (n || h === 19789) && e.getUint16(m + 2, n) === 42) {
          var p = e.getUint32(m + 4, n);
          p >= 8 && (i = m + p);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), E, C;
      for (C = 0; C < b; C += 1)
        if (E = i + C * 12 + 2, e.getUint16(E, n) === 274) {
          E += 8, t = e.getUint16(E, n), e.setUint16(E, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function nl(o) {
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
var ol = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, a = this.cropper, i = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    se(a, fe), xe(e, fe);
    var f = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Lr),
      height: Math.max(n.offsetHeight, s >= 0 ? s : jr)
    };
    this.containerData = f, Ee(a, {
      width: f.width,
      height: f.height
    }), se(e, fe), xe(a, fe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, i = a ? t.naturalHeight : t.naturalWidth, s = a ? t.naturalWidth : t.naturalHeight, f = i / s, g = e.width, m = e.height;
    e.height * f > e.width ? n === 3 ? g = e.height * f : m = e.width / f : n === 3 ? m = e.width / f : g = e.height * f;
    var h = {
      aspectRatio: f,
      naturalWidth: i,
      naturalHeight: s,
      width: g,
      height: m
    };
    this.canvasData = h, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (e.width - h.width) / 2, h.top = (e.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = te({}, h);
  },
  limitCanvas: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, s = this.cropBoxData, f = n.viewMode, g = i.aspectRatio, m = this.cropped && s;
    if (e) {
      var h = Number(n.minCanvasWidth) || 0, p = Number(n.minCanvasHeight) || 0;
      f > 1 ? (h = Math.max(h, a.width), p = Math.max(p, a.height), f === 3 && (p * g > h ? h = p * g : p = h / g)) : f > 0 && (h ? h = Math.max(h, m ? s.width : 0) : p ? p = Math.max(p, m ? s.height : 0) : m && (h = s.width, p = s.height, p * g > h ? h = p * g : p = h / g));
      var b = Te({
        aspectRatio: g,
        width: h,
        height: p
      });
      h = b.width, p = b.height, i.minWidth = h, i.minHeight = p, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (m ? 0 : 1)) {
        var E = a.width - i.width, C = a.height - i.height;
        i.minLeft = Math.min(0, E), i.minTop = Math.min(0, C), i.maxLeft = Math.max(0, E), i.maxTop = Math.max(0, C), m && this.limited && (i.minLeft = Math.min(s.left, s.left + (s.width - i.width)), i.minTop = Math.min(s.top, s.top + (s.height - i.height)), i.maxLeft = s.left, i.maxTop = s.top, f === 2 && (i.width >= a.width && (i.minLeft = Math.min(0, E), i.maxLeft = Math.max(0, E)), i.height >= a.height && (i.minTop = Math.min(0, C), i.maxTop = Math.max(0, C))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = a.width, i.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, a = this.imageData;
    if (t) {
      var i = Js({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), s = i.width, f = i.height, g = n.width * (s / n.naturalWidth), m = n.height * (f / n.naturalHeight);
      n.left -= (g - n.width) / 2, n.top -= (m - n.height) / 2, n.width = g, n.height = m, n.aspectRatio = s / f, n.naturalWidth = s, n.naturalHeight = f, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, Ee(this.canvas, te({
      width: n.width,
      height: n.height
    }, et({
      translateX: n.left,
      translateY: n.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, n = this.imageData, a = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
    te(n, {
      width: a,
      height: i,
      left: (t.width - a) / 2,
      top: (t.height - i) / 2
    }), Ee(this.image, te({
      width: n.width,
      height: n.height
    }, et(te({
      translateX: n.left,
      translateY: n.top
    }, n)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, a = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * a), i.height = Math.max(i.minHeight, i.height * a), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = te({}, i);
  },
  limitCropBox: function(e, t) {
    var n = this.options, a = this.containerData, i = this.canvasData, s = this.cropBoxData, f = this.limited, g = n.aspectRatio;
    if (e) {
      var m = Number(n.minCropBoxWidth) || 0, h = Number(n.minCropBoxHeight) || 0, p = f ? Math.min(a.width, i.width, i.width + i.left, a.width - i.left) : a.width, b = f ? Math.min(a.height, i.height, i.height + i.top, a.height - i.top) : a.height;
      m = Math.min(m, a.width), h = Math.min(h, a.height), g && (m && h ? h * g > m ? h = m / g : m = h * g : m ? h = m / g : h && (m = h * g), b * g > p ? b = p / g : p = b * g), s.minWidth = Math.min(m, p), s.minHeight = Math.min(h, b), s.maxWidth = p, s.maxHeight = b;
    }
    t && (f ? (s.minLeft = Math.max(0, i.left), s.minTop = Math.max(0, i.top), s.maxLeft = Math.min(a.width, i.left + i.width) - s.width, s.maxTop = Math.min(a.height, i.top + i.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = a.width - s.width, s.maxTop = a.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && rt(this.face, tt, n.width >= t.width && n.height >= t.height ? Or : Bt), Ee(this.cropBox, te({
      width: n.width,
      height: n.height
    }, et({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ke(this.element, Ot, this.getData());
  }
}, al = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, a = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = a, s.alt = i, this.viewBox.appendChild(s), this.viewBoxImage = s, !!n) {
      var f = n;
      typeof n == "string" ? f = e.ownerDocument.querySelectorAll(n) : n.querySelector && (f = [n]), this.previews = f, oe(f, function(g) {
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
    oe(this.previews, function(e) {
      var t = jt(e, ct);
      Ee(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Xs(e, ct);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, a = n.width, i = n.height, s = e.width, f = e.height, g = n.left - t.left - e.left, m = n.top - t.top - e.top;
    !this.cropped || this.disabled || (Ee(this.viewBoxImage, te({
      width: s,
      height: f
    }, et(te({
      translateX: -g,
      translateY: -m
    }, e)))), oe(this.previews, function(h) {
      var p = jt(h, ct), b = p.width, E = p.height, C = b, T = E, L = 1;
      a && (L = b / a, T = i * L), i && T > E && (L = E / i, C = a * L, T = E), Ee(h, {
        width: C,
        height: T
      }), Ee(h.getElementsByTagName("img")[0], te({
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
    var e = this.element, t = this.options, n = this.cropper;
    he(t.cropstart) && ge(e, Nt, t.cropstart), he(t.cropmove) && ge(e, It, t.cropmove), he(t.cropend) && ge(e, Pt, t.cropend), he(t.crop) && ge(e, Ot, t.crop), he(t.zoom) && ge(e, Lt, t.zoom), ge(n, gr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ge(n, xr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(n, pr, this.onDblclick = this.dblclick.bind(this)), ge(e.ownerDocument, vr, this.onCropMove = this.cropMove.bind(this)), ge(e.ownerDocument, br, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ge(window, wr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    he(t.cropstart) && ye(e, Nt, t.cropstart), he(t.cropmove) && ye(e, It, t.cropmove), he(t.cropend) && ye(e, Pt, t.cropend), he(t.crop) && ye(e, Ot, t.crop), he(t.zoom) && ye(e, Lt, t.zoom), ye(n, gr, this.onCropStart), t.zoomable && t.zoomOnWheel && ye(n, xr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ye(n, pr, this.onDblclick), ye(e.ownerDocument, vr, this.onCropMove), ye(e.ownerDocument, br, this.onCropEnd), t.responsive && ye(window, wr, this.onResize);
  }
}, ll = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, a = t.offsetWidth / n.width, i = t.offsetHeight / n.height, s = Math.abs(a - 1) > Math.abs(i - 1) ? a : i;
      if (s !== 1) {
        var f, g;
        e.restore && (f = this.getCanvasData(), g = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(oe(f, function(m, h) {
          f[h] = m * s;
        })), this.setCropBoxData(oe(g, function(m, h) {
          g[h] = m * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Nr || this.setDragMode(Ys(this.dragBox, Tt) ? Ir : Rt);
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
      var a = this.options, i = this.pointers, s;
      e.changedTouches ? oe(e.changedTouches, function(f) {
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
      var n = this.pointers;
      e.preventDefault(), Ke(this.element, It, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? oe(e.changedTouches, function(a) {
        te(n[a.identifier] || {}, ut(a, !0));
      }) : te(n[e.pointerId || 0] || {}, ut(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? oe(e.changedTouches, function(a) {
        delete n[a.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, He(this.dragBox, mt, this.cropped && this.options.modal)), Ke(this.element, Pt, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, cl = {
  change: function(e) {
    var t = this.options, n = this.canvasData, a = this.containerData, i = this.cropBoxData, s = this.pointers, f = this.action, g = t.aspectRatio, m = i.left, h = i.top, p = i.width, b = i.height, E = m + p, C = h + b, T = 0, L = 0, V = a.width, R = a.height, I = !0, ae;
    !g && e.shiftKey && (g = p && b ? p / b : 1), this.limited && (T = i.minLeft, L = i.minTop, V = T + Math.min(a.width, n.width, n.left + n.width), R = L + Math.min(a.height, n.height, n.top + n.height));
    var J = s[Object.keys(s)[0]], D = {
      x: J.endX - J.startX,
      y: J.endY - J.startY
    }, X = function(ce) {
      switch (ce) {
        case Ae:
          E + D.x > V && (D.x = V - E);
          break;
        case Oe:
          m + D.x < T && (D.x = T - m);
          break;
        case $e:
          h + D.y < L && (D.y = L - h);
          break;
        case Be:
          C + D.y > R && (D.y = R - C);
          break;
      }
    };
    switch (f) {
      case Bt:
        m += D.x, h += D.y;
        break;
      case Ae:
        if (D.x >= 0 && (E >= V || g && (h <= L || C >= R))) {
          I = !1;
          break;
        }
        X(Ae), p += D.x, p < 0 && (f = Oe, p = -p, m -= p), g && (b = p / g, h += (i.height - b) / 2);
        break;
      case $e:
        if (D.y <= 0 && (h <= L || g && (m <= T || E >= V))) {
          I = !1;
          break;
        }
        X($e), b -= D.y, h += D.y, b < 0 && (f = Be, b = -b, h -= b), g && (p = b * g, m += (i.width - p) / 2);
        break;
      case Oe:
        if (D.x <= 0 && (m <= T || g && (h <= L || C >= R))) {
          I = !1;
          break;
        }
        X(Oe), p -= D.x, m += D.x, p < 0 && (f = Ae, p = -p, m -= p), g && (b = p / g, h += (i.height - b) / 2);
        break;
      case Be:
        if (D.y >= 0 && (C >= R || g && (m <= T || E >= V))) {
          I = !1;
          break;
        }
        X(Be), b += D.y, b < 0 && (f = $e, b = -b, h -= b), g && (p = b * g, m += (i.width - p) / 2);
        break;
      case Ge:
        if (g) {
          if (D.y <= 0 && (h <= L || E >= V)) {
            I = !1;
            break;
          }
          X($e), b -= D.y, h += D.y, p = b * g;
        } else
          X($e), X(Ae), D.x >= 0 ? E < V ? p += D.x : D.y <= 0 && h <= L && (I = !1) : p += D.x, D.y <= 0 ? h > L && (b -= D.y, h += D.y) : (b -= D.y, h += D.y);
        p < 0 && b < 0 ? (f = Qe, b = -b, p = -p, h -= b, m -= p) : p < 0 ? (f = Je, p = -p, m -= p) : b < 0 && (f = Ze, b = -b, h -= b);
        break;
      case Je:
        if (g) {
          if (D.y <= 0 && (h <= L || m <= T)) {
            I = !1;
            break;
          }
          X($e), b -= D.y, h += D.y, p = b * g, m += i.width - p;
        } else
          X($e), X(Oe), D.x <= 0 ? m > T ? (p -= D.x, m += D.x) : D.y <= 0 && h <= L && (I = !1) : (p -= D.x, m += D.x), D.y <= 0 ? h > L && (b -= D.y, h += D.y) : (b -= D.y, h += D.y);
        p < 0 && b < 0 ? (f = Ze, b = -b, p = -p, h -= b, m -= p) : p < 0 ? (f = Ge, p = -p, m -= p) : b < 0 && (f = Qe, b = -b, h -= b);
        break;
      case Qe:
        if (g) {
          if (D.x <= 0 && (m <= T || C >= R)) {
            I = !1;
            break;
          }
          X(Oe), p -= D.x, m += D.x, b = p / g;
        } else
          X(Be), X(Oe), D.x <= 0 ? m > T ? (p -= D.x, m += D.x) : D.y >= 0 && C >= R && (I = !1) : (p -= D.x, m += D.x), D.y >= 0 ? C < R && (b += D.y) : b += D.y;
        p < 0 && b < 0 ? (f = Ge, b = -b, p = -p, h -= b, m -= p) : p < 0 ? (f = Ze, p = -p, m -= p) : b < 0 && (f = Je, b = -b, h -= b);
        break;
      case Ze:
        if (g) {
          if (D.x >= 0 && (E >= V || C >= R)) {
            I = !1;
            break;
          }
          X(Ae), p += D.x, b = p / g;
        } else
          X(Be), X(Ae), D.x >= 0 ? E < V ? p += D.x : D.y >= 0 && C >= R && (I = !1) : p += D.x, D.y >= 0 ? C < R && (b += D.y) : b += D.y;
        p < 0 && b < 0 ? (f = Je, b = -b, p = -p, h -= b, m -= p) : p < 0 ? (f = Qe, p = -p, m -= p) : b < 0 && (f = Ge, b = -b, h -= b);
        break;
      case Or:
        this.move(D.x, D.y), I = !1;
        break;
      case Pr:
        this.zoom(qs(s), e), I = !1;
        break;
      case Ar:
        if (!D.x || !D.y) {
          I = !1;
          break;
        }
        ae = Rr(this.cropper), m = J.startX - ae.left, h = J.startY - ae.top, p = i.minWidth, b = i.minHeight, D.x > 0 ? f = D.y > 0 ? Ze : Ge : D.x < 0 && (m -= p, f = D.y > 0 ? Qe : Je), D.y < 0 && (h -= b), this.cropped || (xe(this.cropBox, fe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    I && (i.width = p, i.height = b, i.left = m, i.top = h, this.action = f, this.renderCropBox()), oe(s, function(Z) {
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
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, oe(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
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
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, a = n.left, i = n.top;
    return this.moveTo(kt(e) ? e : a + Number(e), kt(t) ? t : i + Number(t));
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
    var a = this.options, i = this.canvasData, s = i.width, f = i.height, g = i.naturalWidth, m = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var h = g * e, p = m * e;
      if (Ke(this.element, Lt, {
        ratio: e,
        oldRatio: s / g,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, E = Rr(this.cropper), C = b && Object.keys(b).length ? Gs(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (h - s) * ((C.pageX - E.left - i.left) / s), i.top -= (p - f) * ((C.pageY - E.top - i.top) / f);
      } else
        Re(t) && W(t.x) && W(t.y) ? (i.left -= (h - s) * ((t.x - i.left) / s), i.top -= (p - f) * ((t.y - i.top) / f)) : (i.left -= (h - s) / 2, i.top -= (p - f) / 2);
      i.width = h, i.height = p, this.renderCanvas(!0);
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
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, n = this.imageData, a = this.canvasData, i = this.cropBoxData, s;
    if (this.ready && this.cropped) {
      s = {
        x: i.left - a.left,
        y: i.top - a.top,
        width: i.width,
        height: i.height
      };
      var f = n.width / n.naturalWidth;
      if (oe(s, function(h, p) {
        s[p] = h / f;
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
    return t.rotatable && (s.rotate = n.rotate || 0), t.scalable && (s.scaleX = n.scaleX || 1, s.scaleY = n.scaleY || 1), s;
  },
  setData: function(e) {
    var t = this.options, n = this.imageData, a = this.canvasData, i = {};
    if (this.ready && !this.disabled && Re(e)) {
      var s = !1;
      t.rotatable && W(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, s = !0), t.scalable && (W(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, s = !0), W(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var f = n.width / n.naturalWidth;
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
    return this.ready && oe(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
      t[n] = e[n];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, n = t.aspectRatio;
    return this.ready && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) ? (t.width = e.width, t.height = e.width / n) : W(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
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
    return this.ready && this.cropped && !this.disabled && Re(e) && (W(e.left) && (t.left = e.left), W(e.top) && (t.top = e.top), W(e.width) && e.width !== t.width && (a = !0, t.width = e.width), W(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (a ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = Zs(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var a = this.getData(), i = a.x, s = a.y, f = a.width, g = a.height, m = n.width / Math.floor(t.naturalWidth);
    m !== 1 && (i *= m, s *= m, f *= m, g *= m);
    var h = f / g, p = Te({
      aspectRatio: h,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Te({
      aspectRatio: h,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), E = Te({
      aspectRatio: h,
      width: e.width || (m !== 1 ? n.width : f),
      height: e.height || (m !== 1 ? n.height : g)
    }), C = E.width, T = E.height;
    C = Math.min(p.width, Math.max(b.width, C)), T = Math.min(p.height, Math.max(b.height, T));
    var L = document.createElement("canvas"), V = L.getContext("2d");
    L.width = Ue(C), L.height = Ue(T), V.fillStyle = e.fillColor || "transparent", V.fillRect(0, 0, C, T);
    var R = e.imageSmoothingEnabled, I = R === void 0 ? !0 : R, ae = e.imageSmoothingQuality;
    V.imageSmoothingEnabled = I, ae && (V.imageSmoothingQuality = ae);
    var J = n.width, D = n.height, X = i, Z = s, ce, me, j, H, N, Y;
    X <= -f || X > J ? (X = 0, ce = 0, j = 0, N = 0) : X <= 0 ? (j = -X, X = 0, ce = Math.min(J, f + X), N = ce) : X <= J && (j = 0, ce = Math.min(f, J - X), N = ce), ce <= 0 || Z <= -g || Z > D ? (Z = 0, me = 0, H = 0, Y = 0) : Z <= 0 ? (H = -Z, Z = 0, me = Math.min(D, g + Z), Y = me) : Z <= D && (H = 0, me = Math.min(g, D - Z), Y = me);
    var U = [X, Z, ce, me];
    if (N > 0 && Y > 0) {
      var ie = C / f;
      U.push(j * ie, H * ie, N * ie, Y * ie);
    }
    return V.drawImage.apply(V, [n].concat(Tr(U.map(function(Q) {
      return Math.floor(Ue(Q));
    })))), L;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !kt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var i = e === Rt, s = t.movable && e === Ir;
      e = i || s ? e : Nr, t.dragMode = e, rt(n, tt, e), He(n, Tt, i), He(n, At, s), t.cropBoxMovable || (rt(a, tt, e), He(a, Tt, i), He(a, At, s));
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
      var t = this.element, n = t.tagName.toLowerCase(), a;
      if (!t[ee]) {
        if (t[ee] = this, n === "img") {
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
        if (Ls.test(t)) {
          js.test(t) ? this.read(tl(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = f, s.onerror = f, s.ontimeout = f, s.onprogress = function() {
          s.getResponseHeader("content-type") !== _r && s.abort();
        }, s.onload = function() {
          n.read(s.response);
        }, s.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && Dr(t) && a.crossOrigin && (t = Mr(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = a.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, a = this.imageData, i = il(t), s = 0, f = 1, g = 1;
      if (i > 1) {
        this.url = rl(t, _r);
        var m = nl(i);
        s = m.rotate, f = m.scaleX, g = m.scaleY;
      }
      n.rotatable && (a.rotate = s), n.scalable && (a.scaleX = f, a.scaleY = g), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, a = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && Dr(n) && (a || (a = "anonymous"), i = Mr(n)), this.crossOrigin = a, this.crossOriginUrl = i;
      var s = document.createElement("img");
      a && (s.crossOrigin = a), s.src = i || n, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), se(s, mr), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var a = ke.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ke.navigator.userAgent), i = function(m, h) {
        te(t.imageData, {
          naturalWidth: m,
          naturalHeight: h,
          aspectRatio: m / h
        }), t.initialImageData = te({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !a) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var s = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = s, s.onload = function() {
        i(s.width, s.height), a || f.removeChild(s);
      }, s.src = n.src, a || (s.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(s));
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
        var t = this.element, n = this.options, a = this.image, i = t.parentNode, s = document.createElement("div");
        s.innerHTML = zs;
        var f = s.querySelector(".".concat(ee, "-container")), g = f.querySelector(".".concat(ee, "-canvas")), m = f.querySelector(".".concat(ee, "-drag-box")), h = f.querySelector(".".concat(ee, "-crop-box")), p = h.querySelector(".".concat(ee, "-face"));
        this.container = i, this.cropper = f, this.canvas = g, this.dragBox = m, this.cropBox = h, this.viewBox = f.querySelector(".".concat(ee, "-view-box")), this.face = p, g.appendChild(a), se(t, fe), i.insertBefore(f, t.nextSibling), this.isImg || xe(a, mr), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, se(h, fe), n.guides || se(h.getElementsByClassName("".concat(ee, "-dashed")), fe), n.center || se(h.getElementsByClassName("".concat(ee, "-center")), fe), n.background && se(f, "".concat(ee, "-bg")), n.highlight || se(p, As), n.cropBoxMovable && (se(p, At), rt(p, tt, Bt)), n.cropBoxResizable || (se(h.getElementsByClassName("".concat(ee, "-line")), fe), se(h.getElementsByClassName("".concat(ee, "-point")), fe)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), he(n.ready) && ge(t, yr, n.ready, {
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
      return window.Cropper = dl, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      te(kr, Re(t) && t);
    }
  }]), o;
}();
te(Ur.prototype, ol, al, sl, ll, cl, ul);
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
    const t = o, { t: n } = B("i18n"), { apiUrl: a } = Se(), i = P(null), s = P(null), f = P(!1), g = P(""), m = P(!1), h = () => {
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
          }).then((E) => {
            g.value = n("Updated."), i.value.src = $t(t.selection.adapter, t.selection.item.path), h(), e("load");
          }).catch((E) => {
            g.value = n(E.message), m.value = !0;
          });
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (b, E) => (w(), M(le, null, [
      d("div", hl, [
        d("h3", fl, $(o.selection.item.basename), 1),
        d("div", ml, [
          f.value ? (w(), M("button", {
            key: 0,
            onClick: p,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, $(_(n)("Crop")), 1)) : q("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: E[0] || (E[0] = (C) => h())
          }, $(f.value ? _(n)("Cancel") : _(n)("Edit")), 1)
        ])
      ]),
      d("div", pl, [
        d("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[60vh] max-h-[60vh]",
          src: _($t)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, gl)
      ]),
      g.value.length ? (w(), G(Me, {
        key: 0,
        error: m.value
      }, {
        default: F(() => [
          ue($(g.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ], 64));
  }
}, bl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, yl = /* @__PURE__ */ d("div", null, " Default view.. ", -1), wl = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return _e(() => {
      e("load");
    }), (t, n) => (w(), M(le, null, [
      d("h3", bl, $(o.selection.item.basename), 1),
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
}, kl = ["src"], Sl = /* @__PURE__ */ ue(" Your browser does not support the video tag. "), Dl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ne({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, s) => (w(), M(le, null, [
      d("h3", xl, $(o.selection.item.basename), 1),
      d("div", null, [
        d("video", _l, [
          d("source", {
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
}, $l = ["src"], El = /* @__PURE__ */ ue(" Your browser does not support the audio element. "), Tl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ne({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, s) => (w(), M(le, null, [
      d("h3", Ml, $(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", Cl, [
          d("source", {
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
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = Se(), a = () => n.value + "?" + Ne({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return _e(() => {
      e("load");
    }), (i, s) => (w(), M(le, null, [
      d("h3", Al, $(o.selection.item.basename), 1),
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
        `, 8, Pl)
        ], 8, Ol)
      ])
    ], 64));
  }
}, Nl = { class: "sm:flex sm:items-start" }, Ll = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, jl = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Vl = {
  key: 0,
  class: "flex leading-5"
}, zl = /* @__PURE__ */ d("svg", {
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
], -1), Bl = {
  name: "VFModalPreview"
}, Rl = /* @__PURE__ */ Object.assign(Bl, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = Se(), n = B("emitter"), { t: a } = B("i18n"), i = P(!1), s = (m) => i.value = m, f = (m) => {
      var h;
      return ((h = e.selection.item.mime_type) != null ? h : "").startsWith(m);
    }, g = () => {
      const m = t.value + "?" + Ne({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", m);
    };
    return (m, h) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: h[6] || (h[6] = (p) => _(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Close")), 1),
        d("button", {
          type: "button",
          onClick: h[7] || (h[7] = (p) => g()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Download")), 1)
      ]),
      default: F(() => [
        d("div", Nl, [
          d("div", Ll, [
            d("div", null, [
              f("text") ? (w(), G(ks, {
                key: 0,
                selection: o.selection,
                onLoad: h[0] || (h[0] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("image") ? (w(), G(vl, {
                key: 1,
                selection: o.selection,
                onLoad: h[1] || (h[1] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("video") ? (w(), G(Dl, {
                key: 2,
                selection: o.selection,
                onLoad: h[2] || (h[2] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("audio") ? (w(), G(Tl, {
                key: 3,
                selection: o.selection,
                onLoad: h[3] || (h[3] = (p) => s(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (w(), G(Il, {
                key: 4,
                selection: o.selection,
                onLoad: h[4] || (h[4] = (p) => s(!0))
              }, null, 8, ["selection"])) : (w(), G(wl, {
                key: 5,
                selection: o.selection,
                onLoad: h[5] || (h[5] = (p) => s(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", jl, [
              d("p", null, $(o.selection.item.path), 1),
              d("p", null, "mime_type: " + $(o.selection.item.mime_type), 1),
              i.value == !1 ? (w(), M("div", Vl, [
                zl,
                d("span", null, $(_(a)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hl = { class: "sm:flex sm:items-start" }, Ul = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, ql = /* @__PURE__ */ d("path", {
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
}, Zl = /* @__PURE__ */ d("path", {
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
    const e = o, t = B("emitter"), { getStore: n } = B("storage"), { t: a } = B("i18n"), i = P(e.selection.items[0]), s = P(e.selection.items[0].basename), f = P(""), g = () => {
      s.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: n("adapter", "local"),
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
    return (m, h) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", Hl, [
          Ul,
          d("div", Kl, [
            d("h3", Yl, $(_(a)("Rename")), 1),
            d("div", Wl, [
              d("p", Xl, [
                i.value.type == "dir" ? (w(), M("svg", Fl, Gl)) : (w(), M("svg", Jl, Ql)),
                d("span", ec, $(i.value.basename), 1)
              ]),
              ve(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => s.value = p),
                onKeyup: Ye(g, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, tc), [
                [We, s.value]
              ]),
              f.value.length ? (w(), G(Me, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  ue($(f.value), 1)
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
}), nc = { class: "sm:flex sm:items-start" }, oc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
  setup(o) {
    const e = o, t = B("emitter"), { apiUrl: n } = Se(), { t: a } = B("i18n"), i = P(null), s = P(null), f = P(null), g = P([]), m = P(!0), h = () => {
      i.value.start();
    };
    return _e(() => {
      i.value = new _t.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: s.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Ne({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(p, b) {
            m.value = !1, _t.each(b, function(E) {
              g.value.push({
                id: E.id,
                name: E.name,
                size: _t.formatSize(E.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(p, b) {
            g.value[g.value.findIndex((E) => E.id == b.id)].percent = b.percent + "%";
          },
          UploadComplete: function() {
            m.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(p, b) {
          }
        }
      }), i.value.init();
    }), (p, b) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          disabled: m.value,
          onClick: Pe(h, ["prevent"]),
          type: "button",
          class: de([m.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, $(_(a)("Upload")), 11, hc),
        d("button", {
          type: "button",
          onClick: b[0] || (b[0] = (E) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", nc, [
          oc,
          d("div", ac, [
            d("h3", sc, $(_(a)("Upload files")), 1),
            d("div", lc, [
              d("div", cc, [
                (w(!0), M(le, null, be(g.value, (E) => (w(), M("div", null, [
                  d("div", {
                    id: E.id
                  }, [
                    ue($(E.name) + " ( " + $(E.size) + ") ", 1),
                    d("b", null, $(E.percent), 1)
                  ], 8, uc)
                ]))), 256)),
                g.value.length ? q("", !0) : (w(), M("div", dc, $(_(a)("No files selected!")), 1))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: s
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: f,
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
}), pc = { class: "sm:flex sm:items-start" }, gc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, _c = /* @__PURE__ */ d("path", {
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
}, Dc = /* @__PURE__ */ d("path", {
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
  setup(o) {
    const e = o, t = B("emitter"), { getStore: n } = B("storage"), { t: a } = B("i18n"), i = P(""), s = P(""), f = P(e.selection.items), g = () => {
      f.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: m, type: h }) => ({ path: m, type: h }))),
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
    return (m, h) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", pc, [
          gc,
          d("div", vc, [
            d("h3", bc, $(_(a)("Archive the files")), 1),
            d("div", yc, [
              (w(!0), M(le, null, be(f.value, (p) => (w(), M("p", wc, [
                p.type == "dir" ? (w(), M("svg", xc, kc)) : (w(), M("svg", Sc, Mc)),
                d("span", Cc, $(p.basename), 1)
              ]))), 256)),
              ve(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => i.value = p),
                onKeyup: Ye(g, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: _(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, $c), [
                [We, i.value]
              ]),
              s.value.length ? (w(), G(Me, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  ue($(s.value), 1)
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
}), Ac = { class: "sm:flex sm:items-start" }, Oc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, Vc = /* @__PURE__ */ d("path", {
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
}, Rc = /* @__PURE__ */ d("path", {
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
    const e = o, t = B("emitter"), { getStore: n } = B("storage"), { t: a } = B("i18n");
    P("");
    const i = P(e.selection.items[0]), s = P(""), f = P([]), g = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: n("adapter", "local"),
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
    return (m, h) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (p) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(a)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", Ac, [
          Oc,
          d("div", Pc, [
            d("h3", Ic, $(_(a)("Unarchive")), 1),
            d("div", Nc, [
              (w(!0), M(le, null, be(f.value, (p) => (w(), M("p", Lc, [
                p.type == "dir" ? (w(), M("svg", jc, zc)) : (w(), M("svg", Bc, Hc)),
                d("span", Uc, $(p.basename), 1)
              ]))), 256)),
              d("p", Kc, $(_(a)("The archive will be unarchived at")) + " (" + $(o.current.dirname) + ")", 1),
              s.value.length ? (w(), G(Me, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  ue($(s.value), 1)
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
}), Xc = { class: "sm:flex sm:items-start" }, Fc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, eu = /* @__PURE__ */ d("path", {
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
}, iu = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), nu = [
  iu
], ou = { class: "ml-1.5" }, au = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Bu dosyalar\u0131 ta\u015F\u0131mak istedi\u011Finizden emin misiniz?", -1), su = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, lu = /* @__PURE__ */ d("svg", {
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
], -1), cu = { class: "ml-1.5 overflow-auto" }, uu = {
  name: "VFModalMove"
}, du = /* @__PURE__ */ Object.assign(uu, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = B("emitter"), { t: n } = B("i18n"), { getStore: a } = B("storage"), i = P(e.selection.items.from), s = P(""), f = () => {
      i.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: a("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(i.value.map(({ path: g, type: m }) => ({ path: g, type: m }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("Files moved.", e.selection.items.to.name) });
        },
        onError: (g) => {
          s.value = n(g.message);
        }
      });
    };
    return (g, m) => (w(), G(De, null, {
      buttons: F(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(n)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[0] || (m[0] = (h) => _(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, $(_(n)("Cancel")), 1)
      ]),
      default: F(() => [
        d("div", Xc, [
          Fc,
          d("div", qc, [
            d("h3", Gc, $(_(n)("Move files")), 1),
            d("div", Jc, [
              (w(!0), M(le, null, be(i.value, (h) => (w(), M("p", Zc, [
                h.type == "dir" ? (w(), M("svg", Qc, tu)) : (w(), M("svg", ru, nu)),
                d("span", ou, $(h.path), 1)
              ]))), 256)),
              au,
              d("p", su, [
                lu,
                d("span", cu, $(o.selection.items.to.path), 1)
              ]),
              s.value.length ? (w(), G(Me, {
                key: 0,
                error: ""
              }, {
                default: F(() => [
                  ue($(s.value), 1)
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
