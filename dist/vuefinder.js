import { ref as I, watch as vt, inject as z, openBlock as y, createElementBlock as C, createElementVNode as d, unref as x, normalizeClass as de, createTextVNode as se, toDisplayString as E, createCommentVNode as G, createVNode as we, TransitionGroup as Li, withCtx as J, Fragment as ce, renderList as be, reactive as ft, onMounted as xe, onUpdated as Ni, withDirectives as ve, vShow as lt, withModifiers as Pe, nextTick as bt, vModelSelect as ur, customRef as ji, withKeys as Ye, isRef as Vi, vModelText as We, normalizeStyle as Er, provide as Ge, createBlock as Z, resolveDynamicComponent as zi, renderSlot as $t } from "vue";
import kt from "plupload";
var Mr;
const mt = (Mr = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Mr.getAttribute("content"), pt = (a, { method: e = "get", params: t = {}, json: i = !0, signal: n = null }) => {
  const o = { method: e };
  if (o.signal = n, e == "get")
    a += "?" + new URLSearchParams(t);
  else {
    o.headers = {}, mt && (o.headers["X-CSRF-Token"] = mt);
    let s = new FormData();
    for (const [f, p] of Object.entries(t))
      s.append(f, p);
    o.body = s;
  }
  return fetch(a, o).then((s) => s.ok ? i ? s.json() : s.text() : s.json().then(Promise.reject.bind(Promise)));
};
function Bi(a) {
  return { all: a = a || /* @__PURE__ */ new Map(), on: function(e, t) {
    var i = a.get(e);
    i ? i.push(t) : a.set(e, [t]);
  }, off: function(e, t) {
    var i = a.get(e);
    i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : a.set(e, []));
  }, emit: function(e, t) {
    var i = a.get(e);
    i && i.slice().map(function(n) {
      n(t);
    }), (i = a.get("*")) && i.slice().map(function(n) {
      n(e, t);
    });
  } };
}
function Mt(a) {
  let e = localStorage.getItem(a + "_storage");
  const t = I(JSON.parse(e));
  vt(t, i);
  function i() {
    t.value === null || t.value === "" ? localStorage.removeItem(a + "_storage") : localStorage.setItem(a + "_storage", JSON.stringify(t.value));
  }
  function n(f, p) {
    t.value = Object.assign({ ...t.value }, { [f]: p });
  }
  function o() {
    t.value = null;
  }
  return { getStore: (f, p = null) => t.value === null || t.value === "" ? p : t.value.hasOwnProperty(f) ? t.value[f] : p, setStore: n, clearStore: o };
}
const dr = I("");
function Se() {
  function a(e) {
    dr.value = e;
  }
  return { apiUrl: dr, setApiUrl: a };
}
const Ri = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Hi = {
  key: 0,
  class: "flex text-center"
}, Ui = ["aria-label"], Ki = /* @__PURE__ */ d("svg", {
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
], -1), Yi = [
  Ki
], Wi = ["aria-label"], Xi = /* @__PURE__ */ d("svg", {
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
], -1), Fi = [
  Xi
], qi = ["aria-label"], Gi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Ji = [
  Gi
], Zi = ["aria-label"], Qi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), eo = [
  Qi
], to = ["aria-label"], ro = /* @__PURE__ */ d("svg", {
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
], -1), io = [
  ro
], oo = ["aria-label"], ao = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), no = [
  ao
], so = ["aria-label"], lo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), co = [
  lo
], uo = {
  key: 1,
  class: "flex text-center"
}, ho = { class: "pl-2" }, fo = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, mo = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, po = /* @__PURE__ */ d("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), go = /* @__PURE__ */ d("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), vo = [
  po,
  go
], bo = { class: "flex text-center items-center justify-end" }, yo = ["aria-label"], wo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), xo = [
  wo
], _o = ["aria-label"], ko = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, So = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Do = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Co = ["aria-label"], $o = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Mo = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, Eo = {
  name: "VFToolbar"
}, To = /* @__PURE__ */ Object.assign(Eo, {
  props: {
    data: Object
  },
  setup(a) {
    const e = z("emitter"), { getStore: t, setStore: i } = z("storage"), { t: n } = z("i18n"), o = I(t("viewport", "grid")), s = I([]), f = I(t("full-screen", !1)), p = I("");
    e.on("vf-search-query", ({ newQuery: b }) => {
      p.value = b;
    });
    const m = z("loadingState"), u = () => m.value, v = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (b) => {
      s.value = b;
    }), e.on("vf-view-toggle", (b) => {
      i("viewport", b), o.value = b;
    }), (b, T) => (y(), C("div", Ri, [
      p.value.length ? (y(), C("div", uo, [
        d("div", ho, [
          se(E(x(n)("Search results for")) + " ", 1),
          d("span", fo, E(p.value), 1)
        ]),
        u() ? (y(), C("svg", mo, vo)) : G("", !0)
      ])) : (y(), C("div", Hi, [
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: T[0] || (T[0] = (k) => x(e).emit("vf-modal-show", { type: "new-folder", items: s.value }))
        }, Yi, 8, Ui),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[1] || (T[1] = (k) => x(e).emit("vf-modal-show", { type: "new-file", items: s.value }))
        }, Fi, 8, Wi),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[2] || (T[2] = (k) => s.value.length != 1 || x(e).emit("vf-modal-show", { type: "rename", items: s.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Ji, 2))
        ], 8, qi),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[3] || (T[3] = (k) => !s.value.length || x(e).emit("vf-modal-show", { type: "delete", items: s.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, eo, 2))
        ], 8, Zi),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[4] || (T[4] = (k) => x(e).emit("vf-modal-show", { type: "upload", items: s.value }))
        }, io, 8, to),
        s.value.length == 1 && s.value[0].mime_type == "application/zip" ? (y(), C("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": x(n)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[5] || (T[5] = (k) => !s.value.length || x(e).emit("vf-modal-show", { type: "unarchive", items: s.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, no, 2))
        ], 8, oo)) : (y(), C("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": x(n)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[6] || (T[6] = (k) => !s.value.length || x(e).emit("vf-modal-show", { type: "archive", items: s.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([s.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, co, 2))
        ], 8, so))
      ])),
      d("div", bo, [
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Dark Mode"),
          "data-microtip-position": "bottom",
          role: "tooltip"
        }, [
          (y(), C("svg", {
            onClick: T[7] || (T[7] = (k) => x(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, xo))
        ], 8, yo),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v
        }, [
          (y(), C("svg", ko, [
            f.value ? (y(), C("path", So)) : (y(), C("path", Do))
          ]))
        ], 8, _o),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(n)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: T[8] || (T[8] = (k) => p.value.length || x(e).emit("vf-view-toggle", o.value == "list" ? "grid" : "list"))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([p.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            o.value == "grid" ? (y(), C("path", $o)) : G("", !0),
            o.value == "list" ? (y(), C("path", Mo)) : G("", !0)
          ], 2))
        ], 8, Co)
      ])
    ]));
  }
});
var Ao = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Tr = { exports: {} };
(function(a, e) {
  (function(t, i) {
    a.exports = i();
  })(Ao, function() {
    function t(h, l) {
      if (!(h instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(h, l) {
      for (var r = 0; r < l.length; r++) {
        var g = l[r];
        g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(h, g.key, g);
      }
    }
    function n(h, l, r) {
      return l && i(h.prototype, l), r && i(h, r), h;
    }
    function o(h, l, r) {
      return l in h ? Object.defineProperty(h, l, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : h[l] = r, h;
    }
    function s(h, l) {
      var r = Object.keys(h);
      if (Object.getOwnPropertySymbols) {
        var g = Object.getOwnPropertySymbols(h);
        l && (g = g.filter(function(c) {
          return Object.getOwnPropertyDescriptor(h, c).enumerable;
        })), r.push.apply(r, g);
      }
      return r;
    }
    function f(h) {
      for (var l = 1; l < arguments.length; l++) {
        var r = arguments[l] != null ? arguments[l] : {};
        l % 2 ? s(Object(r), !0).forEach(function(g) {
          o(h, g, r[g]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(h, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(g) {
          Object.defineProperty(h, g, Object.getOwnPropertyDescriptor(r, g));
        });
      }
      return h;
    }
    function p(h, l) {
      if (typeof l != "function" && l !== null)
        throw new TypeError("Super expression must either be null or a function");
      h.prototype = Object.create(l && l.prototype, {
        constructor: {
          value: h,
          writable: !0,
          configurable: !0
        }
      }), l && u(h, l);
    }
    function m(h) {
      return m = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, m(h);
    }
    function u(h, l) {
      return u = Object.setPrototypeOf || function(g, c) {
        return g.__proto__ = c, g;
      }, u(h, l);
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
    function b(h, l, r) {
      return v() ? b = Reflect.construct : b = function(c, w, _) {
        var S = [null];
        S.push.apply(S, w);
        var M = Function.bind.apply(c, S), P = new M();
        return _ && u(P, _.prototype), P;
      }, b.apply(null, arguments);
    }
    function T(h) {
      return Function.toString.call(h).indexOf("[native code]") !== -1;
    }
    function k(h) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return k = function(g) {
        if (g === null || !T(g))
          return g;
        if (typeof g != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof l < "u") {
          if (l.has(g))
            return l.get(g);
          l.set(g, c);
        }
        function c() {
          return b(g, arguments, m(this).constructor);
        }
        return c.prototype = Object.create(g.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), u(c, g);
      }, k(h);
    }
    function D(h) {
      if (h === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return h;
    }
    function N(h, l) {
      return l && (typeof l == "object" || typeof l == "function") ? l : D(h);
    }
    function Y(h) {
      var l = v();
      return function() {
        var g = m(h), c;
        if (l) {
          var w = m(this).constructor;
          c = Reflect.construct(g, arguments, w);
        } else
          c = g.apply(this, arguments);
        return N(this, c);
      };
    }
    function R(h, l) {
      for (; !Object.prototype.hasOwnProperty.call(h, l) && (h = m(h), h !== null); )
        ;
      return h;
    }
    function A(h, l, r) {
      return typeof Reflect < "u" && Reflect.get ? A = Reflect.get : A = function(c, w, _) {
        var S = R(c, w);
        if (!!S) {
          var M = Object.getOwnPropertyDescriptor(S, w);
          return M.get ? M.get.call(_) : M.value;
        }
      }, A(h, l, r || h);
    }
    function U(h, l) {
      return q(h) || ue(h, l) || me(h, l) || j();
    }
    function F(h) {
      return $(h) || ee(h) || me(h) || B();
    }
    function $(h) {
      if (Array.isArray(h))
        return L(h);
    }
    function q(h) {
      if (Array.isArray(h))
        return h;
    }
    function ee(h) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(h))
        return Array.from(h);
    }
    function ue(h, l) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(h)))) {
        var r = [], g = !0, c = !1, w = void 0;
        try {
          for (var _ = h[Symbol.iterator](), S; !(g = (S = _.next()).done) && (r.push(S.value), !(l && r.length === l)); g = !0)
            ;
        } catch (M) {
          c = !0, w = M;
        } finally {
          try {
            !g && _.return != null && _.return();
          } finally {
            if (c)
              throw w;
          }
        }
        return r;
      }
    }
    function me(h, l) {
      if (!!h) {
        if (typeof h == "string")
          return L(h, l);
        var r = Object.prototype.toString.call(h).slice(8, -1);
        if (r === "Object" && h.constructor && (r = h.constructor.name), r === "Map" || r === "Set")
          return Array.from(h);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return L(h, l);
      }
    }
    function L(h, l) {
      (l == null || l > h.length) && (l = h.length);
      for (var r = 0, g = new Array(l); r < l; r++)
        g[r] = h[r];
      return g;
    }
    function B() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function j() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var W = function(l, r, g) {
      var c = l.x, w = l.y, _ = g.x, S = g.y, M = {
        "+": {
          x: c + _,
          y: w + S
        },
        "-": {
          x: c - _,
          y: w - S
        },
        "*": {
          x: c * _,
          y: w * S
        },
        "/": {
          x: c / _,
          y: w / S
        }
      };
      return M[r];
    }, H = function(l) {
      return {
        x: l.left,
        y: l.top
      };
    }, oe = function(l) {
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
    }, Xe = function(h, l, r) {
      window.addEventListener("resize", l), window.addEventListener("scroll", l), h.forEach(function(g, c) {
        r.observe(g, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, Fe = function(h) {
      var l = je(h);
      return l.x || l.y ? !0 : h instanceof HTMLDocument ? h.body ? !!(h.body.scrollTop = 1) : !!(h.documentElement.scrollTop = 1) : !!(h.scrollTop = 1);
    }, ot = function(h) {
      var l = document.createElement("div");
      return l.style.position = "fixed", l.style.overflow = "hidden", l.style.pointerEvents = "none", l.style.zIndex = "999999999999999999", l.classList.add(h), l;
    }, at = function(h) {
      var l = document.createElement("div");
      return l.style.position = "absolute", h || (l.style.background = "rgba(0, 0, 255, 0.1)", l.style.border = "1px solid rgba(0, 0, 255, 0.45)", l.style.display = "none", l.style.pointerEvents = "none"), l;
    }, nt = function(h, l) {
      var r;
      return function() {
        for (var g = arguments.length, c = new Array(g), w = 0; w < g; w++)
          c[w] = arguments[w];
        var _ = function() {
          r = null, h.apply(void 0, c);
        };
        clearTimeout(r), r = setTimeout(_, l);
      };
    }, Ne = function() {
      var h, l, r, g;
      return {
        y: ((h = document.body) === null || h === void 0 ? void 0 : h.scrollTop) || ((l = document.documentElement) === null || l === void 0 ? void 0 : l.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((g = document.documentElement) === null || g === void 0 ? void 0 : g.scrollLeft) || 0
      };
    }, wt = function(h, l) {
      if (h instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var r = h.getBoundingClientRect();
      return {
        top: r.top,
        left: r.left,
        bottom: r.bottom,
        right: r.right,
        width: (h.clientWidth || r.width) * l,
        height: (h.clientHeight || r.height) * l
      };
    }, je = function(h) {
      return !h || h instanceof Document ? Ne() : {
        x: h.scrollLeft >= 0 ? h.scrollLeft : Ne().x,
        y: h.scrollTop >= 0 ? h.scrollTop : Ne().y
      };
    }, Kt = function(h) {
      var l = h.elementRect, r = h.containerRect, g = h.tolerance, c = g === void 0 ? {
        x: 0,
        y: 0
      } : g, w = [];
      return l.top - c.y < r.top && w.push("top"), l.left - c.x < r.left && w.push("left"), l.bottom + c.y > r.bottom && w.push("bottom"), l.right + c.y > r.right && w.push("right"), w;
    }, Fr = function(h) {
      var l = h.event;
      return {
        x: l.clientX,
        y: l.clientY
      };
    }, qr = function(h) {
      var l = h.scrollAmount, r = h.initialPointerPos, g = h.pointerPos, c = {};
      return g.x > r.x - l.x ? (c.left = r.x - l.x, c.width = g.x - r.x + l.x) : (c.left = g.x, c.width = r.x - g.x - l.x), g.y > r.y - l.y ? (c.top = r.y - l.y, c.height = g.y - r.y + l.y) : (c.top = g.y, c.height = r.y - g.y - l.y), c;
    }, Yt = function(l) {
      var r = {
        x: 0,
        y: 0
      }, g = window.getComputedStyle(l);
      if (!g.transform || g.transform === "none")
        return r;
      if (g.transform.indexOf("3d") >= 0) {
        var c = g.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var w, _ = (w = c[1]) === null || w === void 0 ? void 0 : w.split(",");
          r.x = parseInt(_[12]) || 0, r.y = parseInt(_[13]) || 0;
        }
        return r;
      } else {
        var S = g.transform.trim().match(/matrix\((.*?)\)/);
        if (S && S.length) {
          var M, P = (M = S[1]) === null || M === void 0 ? void 0 : M.split(",");
          r.x = parseInt(P[4]) || 0, r.y = parseInt(P[5]) || 0;
        }
        return r;
      }
    }, Gr = function(l) {
      var r = l.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Yt(l);
      var g = {
        x: 0,
        y: 0
      }, c = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var w, _ = (w = c[0]) === null || w === void 0 ? void 0 : w.split("(");
        if (_) {
          var S, M = (S = _[1]) === null || S === void 0 ? void 0 : S.split(",");
          g.x = parseInt(M[0]) || 0, g.y = parseInt(M[1]) || 0;
        }
      }
      return !g.x && !g.x ? Yt(l) : g;
    }, Jr = function(l) {
      var r = l.style, g = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!g.x && !g.x) {
        var c = window.getComputedStyle(l);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return g;
    }, Zr = function(h, l) {
      return l ? Gr(h) : Jr(h);
    }, Qr = function(h) {
      var l = h.element, r = h.edges, g = h.elementRect, c = h.containerRect, w = h.elementPos, _ = h.useTransform;
      r.includes("top") && qe(l, {
        y: w.y + c.top - g.top,
        x: w.x
      }, _), r.includes("left") && qe(l, {
        y: w.y,
        x: w.x + c.left - g.left
      }, _), r.includes("bottom") && qe(l, {
        y: w.y + c.bottom - g.bottom,
        x: w.x
      }, _), r.includes("right") && qe(l, {
        y: w.y,
        x: w.x + c.right - g.right
      }, _);
    }, Wt = function(h) {
      var l = h.computedStyle, r = h.node, g = l.position, c = g === "absolute" || g === "relative" || g === "fixed";
      !(r instanceof HTMLDocument) && !c && (r.style.position = "relative");
    }, ei = function(h) {
      var l = h.shiftKey, r = h.keyboardDragSpeed, g = h.zoom, c = h.key, w = h.dragKeys, _ = h.scrollDiff, S = h.canScroll, M = h.scrollCallback, P = {
        x: 0,
        y: 0
      }, O = l ? r * 4 * g : r * g;
      return w.left.includes(c) && (P.x = _.x || -O, !l && !_.x && S && M(["left"], r)), w.right.includes(c) && (P.x = _.x || O, !l && !_.x && S && M(["right"], r)), w.up.includes(c) && (P.y = _.y || -O, !l && !_.y && S && M(["top"], r)), w.down.includes(c) && (P.y = _.y || O, !l && !_.y && S && M(["bottom"], r)), P;
    }, ti = function(h) {
      var l = h.element, r = h.force, g = h.multiSelectionToggle, c = h.SelectedSet, w = h.hoverClassName;
      l.classList.contains(w) && !r || (c.has(l) ? g && c.delete(l) : c.add(l), l.classList.add(w));
    }, ri = function(h) {
      var l = h.element, r = h.force, g = h.SelectedSet, c = h.PrevSelectedSet, w = h.hoverClassName;
      if (!l.classList.contains(w) && !r)
        return !1;
      var _ = g.has(l), S = c.has(l);
      _ && !S ? g.delete(l) : !_ && S && g.add(l), l.classList.remove(w);
    }, xt = function(h, l) {
      return h.left < l.right && h.right > l.left && h.top < l.bottom && h.bottom > l.top;
    }, Xt = function(h) {
      var l = h.element, r = h.posDirection, g = h.containerRect, c = h.useTransform, w = Zr(l, c), _ = W(w, "+", r);
      qe(l, _, c);
      var S = l.getBoundingClientRect(), M = Kt({
        elementRect: S,
        containerRect: g
      });
      Qr({
        element: l,
        edges: M,
        elementRect: S,
        containerRect: g,
        elementPos: _,
        useTransform: c
      });
    }, ii = function(h, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), h.disconnect();
    }, oi = function(h, l, r) {
      if (!!l.length) {
        var g = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = h instanceof HTMLDocument ? g || document.body : h, w = l.includes("top") && c.scrollTop > 0, _ = l.includes("bottom") && c.scrollTop < c.scrollHeight, S = l.includes("left") && c.scrollLeft > 0, M = l.includes("right") && c.scrollLeft < c.scrollWidth;
        w && (c.scrollTop -= 1 * r), _ && (c.scrollTop += 1 * r), S && (c.scrollLeft -= 1 * r), M && (c.scrollLeft += 1 * r);
      }
    }, qe = function(h, l, r) {
      if (r) {
        var g = h.style.transform;
        h.style.transform = "translate3d(".concat(l.x, "px,").concat(l.y, "px,1px) ").concat(g.replace(/translate.*?\)/g, ""));
      } else
        h.style.left = "".concat(l.x, "px"), h.style.top = "".concat(l.y, "px");
      return h;
    }, ai = function(h) {
      for (var l = h.subscribe, r = h.publish, g = h.Interaction, c = h.SelectedSet, w = {
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
          condition: function(O) {
            return O.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, _ = function() {
        var O = U(M[S], 2), V = O[0], K = O[1];
        ["pre", !1].forEach(function(ie) {
          return l(ie ? "".concat(V, ":").concat(ie) : V, function(pe) {
            return K.forEach(function(ae) {
              return (!ae.condition || ae.condition(pe)) && r(ie ? "".concat(ie).concat(ae.name) : ae.name, f({
                items: c.elements,
                isDragging: g.isDragging
              }, pe));
            });
          });
        });
      }, S = 0, M = Object.entries(w); S < M.length; S++)
        _();
    }, Ve = function(h) {
      return h ? !Array.isArray(h) && (h instanceof HTMLElement || h instanceof SVGElement) ? [h] : F(h) : [];
    }, Ft = function(h, l) {
      h.style.left = "".concat(l.left, "px"), h.style.top = "".concat(l.top, "px"), h.style.width = "".concat(l.width, "px"), h.style.height = "".concat(l.height, "px");
    }, ni = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.area, c = l.PS, w = l.zoom;
        t(this, h), o(this, "_modificationCallback", void 0), o(this, "_modificationObserver", void 0), o(this, "_zoom", void 0), o(this, "_node", void 0), o(this, "_parentNodes", void 0), o(this, "_computedStyle", void 0), o(this, "_computedBorder", void 0), o(this, "_rect", void 0), o(this, "setArea", function(_) {
          r._node = _, Wt({
            computedStyle: r.computedStyle,
            node: r._node
          }), setTimeout(function() {
            r.PubSub.publish("Area:modified:pre", {
              item: r
            }), r.reset(), r.PubSub.publish("Area:modified", {
              item: r
            });
          });
        }), o(this, "start", function() {
          Xe(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), o(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), o(this, "stop", function() {
          ii(r._modificationObserver, r._modificationCallback), r.reset();
        }), o(this, "scroll", function(_, S) {
          var M = {
            scroll_directions: _,
            scroll_multiplier: S
          };
          r.PubSub.publish("Area:scroll:pre", M), oi(r._node, _, S), r.PubSub.publish("Area:scroll", M);
        }), this._zoom = w, this.PubSub = c, this.setArea(g), this._modificationCallback = nt(function(_) {
          r.PubSub.publish("Area:modified:pre", {
            event: _,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: _,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return n(h, [{
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
          return this._rect ? this._rect : this._rect = wt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function g(c) {
            var w, _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, S = (w = c[_]) === null || w === void 0 ? void 0 : w.parentNode;
            return S ? (c.push(S), _++, g(c, _)) : c;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), h;
    }(), si = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS, c = l.dragKeys, w = l.draggability, _ = l.keyboardDrag, S = l.keyboardDragSpeed, M = l.useTransform, P = l.zoom;
        t(this, h), o(this, "_useTransform", void 0), o(this, "_prevCursorPos", void 0), o(this, "_prevScrollPos", void 0), o(this, "_elements", []), o(this, "_draggability", void 0), o(this, "_dragKeys", void 0), o(this, "_dragKeysFlat", void 0), o(this, "_keyboardDrag", void 0), o(this, "_keyboardDragSpeed", void 0), o(this, "_zoom", void 0), o(this, "keyboardDrag", function(O) {
          var V = O.event, K = O.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var ie = {
              event: V,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], ie), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var pe = ei({
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
              return Xt({
                element: ae,
                posDirection: pe,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], ie);
          }
        }), o(this, "keyboardEnd", function(O) {
          var V = O.event, K = O.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(K) || !r.DS.SelectedSet.size || !r._draggability)) {
            var ie = {
              event: V,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], ie);
          }
        }), o(this, "start", function(O) {
          var V = O.isDragging, K = O.isDraggingKeyboard;
          !V || K || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), o(this, "stop", function(O) {
          O != null && O.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), o(this, "update", function(O) {
          var V = O.isDragging, K = O.isDraggingKeyboard;
          if (!(!V || !r._elements.length || K || r.DS.continue)) {
            var ie = W(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(pe) {
              return Xt({
                element: pe,
                posDirection: ie,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), o(this, "handleZIndex", function(O) {
          r._elements.forEach(function(V) {
            return V.style.zIndex = "".concat((parseInt(V.style.zIndex) || 0) + O ? 9999 : -9998);
          });
        }), this.DS = g, this._useTransform = M, this._keyboardDragSpeed = S, this._keyboardDrag = _, this._zoom = P, this._draggability = w, this._dragKeys = {
          up: c.up.map(function(O) {
            return O.toLowerCase();
          }),
          down: c.down.map(function(O) {
            return O.toLowerCase();
          }),
          left: c.left.map(function(O) {
            return O.toLowerCase();
          }),
          right: c.right.map(function(O) {
            return O.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(F(this._dragKeys.up), F(this._dragKeys.down), F(this._dragKeys.left), F(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return n(h, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, g = this._prevCursorPos ? W(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, g;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, g = this._prevScrollPos ? W(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, g;
        }
      }]), h;
    }(), li = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS, c = l.areaElement, w = l.draggability, _ = l.immediateDrag, S = l.selectableClass;
        t(this, h), o(this, "_areaElement", void 0), o(this, "_draggability", void 0), o(this, "_immediateDrag", void 0), o(this, "_selectableClass", void 0), o(this, "isInteracting", void 0), o(this, "isDragging", void 0), o(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), o(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), o(this, "start", function(M) {
          return r.DS.publish("Interaction:start:pre", {
            event: M,
            isDragging: r.isDragging
          });
        }), o(this, "_start", function(M) {
          M.type === "touchstart" && M.preventDefault(), r._canInteract(M) && (r.isInteracting = !0, r.isDragging = r.isDragEvent(M), r.DS.publish("Interaction:start", {
            event: M,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), o(this, "isDragEvent", function(M) {
          var P = M.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(M) || !P ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(P) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            P
          )) : r.DS.SelectedSet.add(
            P
          )), !!r.DS.SelectedSet.has(P));
        }), o(this, "onClick", function(M) {
          var P = M.event;
          if (!!r._canInteract(P) && !(P.detail > 0)) {
            var O = r.DS, V = O.stores, K = V.PointerStore, ie = V.KeyStore, pe = O.SelectableSet, ae = O.SelectedSet;
            K.start(P);
            var ze = P.target;
            !pe.has(ze) || (ie.isMultiSelectKeyPressed(P) || ae.clear(), ae.toggle(ze), r.reset());
          }
        }), o(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), o(this, "update", function(M) {
          var P = M.event, O = M.scroll_directions, V = M.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: P,
            scroll_directions: O,
            scroll_multiplier: V,
            isDragging: r.isDragging
          });
        }), o(this, "reset", function(M) {
          return r.DS.publish("Interaction:end:pre", {
            event: M,
            isDragging: r.isDragging
          });
        }), o(this, "_reset", function(M) {
          var P = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: M,
            isDragging: P
          });
        }), this._areaElement = c, this._draggability = w, this._immediateDrag = _, this._selectableClass = S, this.DS = g, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(M) {
          var P = M.event;
          return r.start(P);
        }), this.DS.subscribe("Interaction:start:pre", function(M) {
          var P = M.event;
          return r._start(P);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(M) {
          var P = M.event;
          return r._reset(P);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return n(h, [{
        key: "_canInteract",
        value: function(r) {
          var g = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !g && !this.DS.SelectorArea.isClicked(r));
        }
      }]), h;
    }(), ci = function h(l) {
      var r = this, g = l.DS;
      t(this, h), o(this, "subscribers", {}), o(this, "subscribe", function(c, w) {
        return Array.isArray(r.subscribers[c]) || (r.subscribers[c] = []), r.subscribers[c].push(w), r.subscribers[c].length - 1;
      }), o(this, "unsubscribe", function(c, w, _) {
        _ >= 0 ? r.subscribers[c].splice(_, 1) : w && (r.subscribers[c] = r.subscribers[c].filter(function(S) {
          return S !== w;
        }));
      }), o(this, "publish", function(c, w) {
        Array.isArray(c) ? c.forEach(function(_) {
          return r._publish(_, w);
        }) : r._publish(c, w);
      }), o(this, "_publish", function(c, w) {
        var _ = r.subscribers[c];
        !Array.isArray(_) || (c.includes(":pre") ? r._handlePrePublish(_, w) : r._handlePublish(_, w));
      }), o(this, "_handlePublish", function(c, w) {
        for (var _ = 0, S = c.length; _ < S; _++) {
          if (r.DS.stopped)
            return;
          c[_](w);
        }
      }), o(this, "_handlePrePublish", function(c, w) {
        for (var _ = c.length; _--; ) {
          if (r.DS.stopped)
            return;
          c[_](w);
        }
      }), this.DS = g;
    }, ui = /* @__PURE__ */ function(h) {
      p(r, h);
      var l = Y(r);
      function r(g) {
        var c, w = g.elements, _ = g.className, S = g.hoverClassName, M = g.draggability, P = g.useTransform, O = g.DS;
        return t(this, r), c = l.call(this), o(D(c), "_initElements", void 0), o(D(c), "_className", void 0), o(D(c), "_hoverClassName", void 0), o(D(c), "_useTransform", void 0), o(D(c), "_draggability", void 0), o(D(c), "init", function() {
          return c._initElements.forEach(function(V) {
            return c.add(V);
          });
        }), o(D(c), "clear", function() {
          return c.forEach(function(V) {
            return c.delete(V);
          });
        }), o(D(c), "_onClick", function(V) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: V
          });
        }), o(D(c), "_onPointer", function(V) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: V
          });
        }), o(D(c), "addAll", function(V) {
          return V.forEach(function(K) {
            return c.add(K);
          });
        }), o(D(c), "deleteAll", function(V) {
          return V.forEach(function(K) {
            return c.delete(K);
          });
        }), c.DS = O, c._initElements = Ve(w), c._className = _, c._hoverClassName = S, c._useTransform = P, c._draggability = M, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && Wt({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), A(m(r.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), A(m(r.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ k(Set)), di = /* @__PURE__ */ function(h) {
      p(r, h);
      var l = Y(r);
      function r(g) {
        var c, w = g.className, _ = g.DS;
        return t(this, r), c = l.call(this), o(D(c), "_className", void 0), o(D(c), "clear", function() {
          return c.forEach(function(S) {
            return c.delete(S);
          });
        }), o(D(c), "addAll", function(S) {
          return S.forEach(function(M) {
            return c.add(M);
          });
        }), o(D(c), "deleteAll", function(S) {
          return S.forEach(function(M) {
            return c.delete(M);
          });
        }), c.DS = _, c._className = w, c;
      }
      return n(r, [{
        key: "add",
        value: function(c) {
          if (!A(m(r.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", w), A(m(r.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", w), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!A(m(r.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", w);
            var _ = A(m(r.prototype), "delete", this).call(this, c);
            return c.classList.remove(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", w), _;
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
    }(/* @__PURE__ */ k(Set)), hi = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS, c = l.hoverClassName, w = l.multiSelectToggling;
        t(this, h), o(this, "_prevSelectedSet", void 0), o(this, "_hoverClassName", void 0), o(this, "_multiSelectToggling", void 0), o(this, "start", function(_) {
          var S = _.event, M = _.isDragging;
          M || (r._storePrevious(S), r._handleInsideSelection(!0, S));
        }), o(this, "update", function(_) {
          var S = _.isDragging;
          S || r.DS.continue || r._handleInsideSelection();
        }), o(this, "_handleInsideSelection", function(_, S) {
          for (var M = r.DS, P = M.SelectableSet, O = M.SelectorArea, V = M.Selector, K = P.elements.map(function($e) {
            return [$e, $e.getBoundingClientRect()];
          }), ie = [], pe = [], ae = 0, ze = K.length; ae < ze; ae++)
            !O.isInside(K[ae][0], K[ae][1]) || (xt(K[ae][1], V.rect) ? ie.push(K[ae][0]) : pe.push(K[ae][0]));
          var st = r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) && r._multiSelectToggling;
          r.DS.continue || (ie.forEach(function($e) {
            return ti({
              element: $e,
              force: _,
              multiSelectionToggle: st,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), pe.forEach(function($e) {
            return ri({
              element: $e,
              force: _,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = w, this.DS = g, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return n(h, [{
        key: "_storePrevious",
        value: function(r) {
          var g = this.DS, c = g.stores.KeyStore, w = g.SelectedSet;
          c.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(w) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), h;
    }(), fi = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS, c = l.selector, w = l.selectorClass, _ = l.customStyles;
        t(this, h), o(this, "_rect", void 0), o(this, "start", function(S) {
          var M = S.isDragging;
          if (!M) {
            var P = r.DS.stores.PointerStore, O = P.initialValArea;
            Ft(r.HTMLNode, oe(O, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), o(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), o(this, "update", function(S) {
          var M = S.isDragging;
          if (!(M || r.DS.continue)) {
            var P = r.DS.stores, O = P.ScrollStore, V = P.PointerStore, K = qr({
              scrollAmount: O.scrollAmount,
              initialPointerPos: V.initialValArea,
              pointerPos: V.currentValArea
            });
            Ft(r.HTMLNode, K), r._rect = null;
          }
        }), this.DS = g, this.HTMLNode = c || at(_), this.HTMLNode.classList.add(w), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return n(h, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), h;
    }(), mi = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS, c = l.selectorAreaClass, w = l.autoScrollSpeed, _ = l.overflowTolerance;
        t(this, h), o(this, "_autoScrollSpeed", void 0), o(this, "_scrollInterval", void 0), o(this, "_rect", void 0), o(this, "currentEdges", []), o(this, "_overflowTolerance", void 0), o(this, "start", function() {
          return r.applyElements("append");
        }), o(this, "applyElements", function() {
          var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", M = document.body ? "body" : "documentElement", P = "".concat(S, "Child");
          r.HTMLNode[P](r.DS.Selector.HTMLNode), document[M][P](r.HTMLNode);
        }), o(this, "updatePos", function() {
          r._rect = null;
          var S = r.DS.Area.rect, M = r.DS.Area.computedBorder, P = r.HTMLNode.style, O = "".concat(S.top + M.top, "px"), V = "".concat(S.left + M.left, "px"), K = "".concat(S.width, "px"), ie = "".concat(S.height, "px");
          P.top !== O && (P.top = O), P.left !== V && (P.left = V), P.width !== K && (P.width = K), P.height !== ie && (P.height = ie);
        }), o(this, "stop", function(S) {
          r.stopAutoScroll(), S && r.applyElements("remove");
        }), o(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), o(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var S = r.DS, M = S.stores.PointerStore, P = S.Area;
            r.currentEdges = Kt({
              elementRect: oe(M.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && P.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), o(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), o(this, "isInside", function(S, M) {
          return r.DS.Area.HTMLNode.contains(S) && r.DS.stores.ScrollStore.canScroll ? !0 : xt(r.rect, M || S.getBoundingClientRect());
        }), this._autoScrollSpeed = w, this._overflowTolerance = _, this.DS = g, this.HTMLNode = ot(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return n(h, [{
        key: "isClicked",
        value: function(r) {
          var g = this.DS.stores.PointerStore, c = r ? g.getPointerPosition(r) : g.initialVal;
          return xt({
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
      }]), h;
    }(), pi = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS, c = l.multiSelectKeys, w = l.multiSelectMode;
        t(this, h), o(this, "_multiSelectMode", void 0), o(this, "_multiSelectKeys", void 0), o(this, "_currentValues", /* @__PURE__ */ new Set()), o(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), o(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), o(this, "keydown", function(_) {
          var S = _.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: _,
            key: S
          }), r._currentValues.add(S), r.DS.publish("KeyStore:down", {
            event: _,
            key: S
          });
        }), o(this, "keyup", function(_) {
          var S = _.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: _,
            key: S
          }), r._currentValues.delete(S), r.DS.publish("KeyStore:up", {
            event: _,
            key: S
          });
        }), o(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), o(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = g, this._multiSelectMode = w, this._multiSelectKeys = c.map(function(_) {
          var S = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, M = S[_];
          return M ? (console.warn("[DragSelect] ".concat(_, ' is deprecated. Use "').concat(M, '" instead. Act Now!. See docs for more info')), M.toLowerCase()) : _.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return n(h, [{
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
      }]), h;
    }(), gi = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS;
        t(this, h), o(this, "_isMouseInteraction", !1), o(this, "_initialValArea", void 0), o(this, "_currentValArea", void 0), o(this, "_lastValArea", void 0), o(this, "_initialVal", void 0), o(this, "_currentVal", void 0), o(this, "_lastVal", void 0), o(this, "_lastTouch", void 0), o(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), o(this, "getPointerPosition", function(c) {
          return Fr({
            event: r._normalizedEvent(c)
          });
        }), o(this, "update", function(c) {
          !c || (r.DS.publish("PointerStore:updated:pre", {
            event: c
          }), r.currentVal = r.getPointerPosition(c), r._isMouseInteraction && r.DS.publish("PointerStore:updated", {
            event: c
          }));
        }), o(this, "stop", function() {
          document.removeEventListener("mousemove", r.update), document.removeEventListener("touchmove", r.update, {
            passive: !1
          }), setTimeout(function() {
            return r._isMouseInteraction = !1;
          }, 100);
        }), o(this, "reset", function(c) {
          !c || (r.currentVal = r.lastVal = r.getPointerPosition(c), r.stop(), r.init());
        }), this.DS = g, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var w = c.event;
          return r.start(w);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var w = c.event;
          return r.reset(w);
        });
      }
      return n(h, [{
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
          this._initialVal = r, this._initialValArea = r && W(r, "-", W(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
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
          this._currentVal = r, this._currentValArea = r && W(r, "-", W(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
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
          this._lastVal = r, this._lastValArea = r && W(r, "-", W(H(this.DS.Area.rect), "+", H(this.DS.Area.computedBorder)));
        }
      }]), h;
    }(), vi = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.DS, c = l.areaElement, w = l.zoom;
        t(this, h), o(this, "_initialVal", void 0), o(this, "_currentVal", void 0), o(this, "_areaElement", void 0), o(this, "_canScroll", void 0), o(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), o(this, "start", function() {
          r._currentVal = r._initialVal = je(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), o(this, "update", function() {
          return r._currentVal = je(r._areaElement);
        }), o(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), o(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = c, this.DS = g, this.zoom = w, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return n(h, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = Fe(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = W(this.currentVal, "-", this.initialVal), g = Q(this.zoom), c = W(W(r, "*", g), "-", r);
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
      }]), h;
    }(), bi = /* @__PURE__ */ function() {
      function h(l) {
        var r = this, g = l.area, c = g === void 0 ? document : g, w = l.selectables, _ = w === void 0 ? [] : w, S = l.autoScrollSpeed, M = S === void 0 ? 5 : S, P = l.overflowTolerance, O = P === void 0 ? {
          x: 25,
          y: 25
        } : P, V = l.zoom, K = V === void 0 ? 1 : V, ie = l.customStyles, pe = ie === void 0 ? !1 : ie, ae = l.multiSelectMode, ze = ae === void 0 ? !1 : ae, st = l.multiSelectToggling, $e = st === void 0 ? !0 : st, qt = l.multiSelectKeys, yi = qt === void 0 ? ["Control", "Shift", "Meta"] : qt, Gt = l.selector, wi = Gt === void 0 ? void 0 : Gt, Jt = l.draggability, _t = Jt === void 0 ? !0 : Jt, Zt = l.immediateDrag, xi = Zt === void 0 ? !0 : Zt, Qt = l.keyboardDrag, _i = Qt === void 0 ? !0 : Qt, ki = l.dragKeys, er = l.keyboardDragSpeed, Si = er === void 0 ? 10 : er, tr = l.useTransform, rr = tr === void 0 ? !0 : tr, ir = l.hoverClass, or = ir === void 0 ? "ds-hover" : ir, ar = l.selectableClass, nr = ar === void 0 ? "ds-selectable" : ar, sr = l.selectedClass, Di = sr === void 0 ? "ds-selected" : sr, lr = l.selectorClass, Ci = lr === void 0 ? "ds-selector" : lr, cr = l.selectorAreaClass, $i = cr === void 0 ? "ds-selector-area" : cr, Mi = l.callback, Ei = l.onDragMove, Ti = l.onDragStartBegin, Ai = l.onDragStart, Oi = l.onElementSelect, Pi = l.onElementUnselect;
        t(this, h), o(this, "continue", !1), o(this, "start", function() {
          r.stopped = !1, r.Interaction.init();
        }), o(this, "break", function() {
          return r.continue = !0;
        }), o(this, "getSelection", function() {
          return r.SelectedSet.elements;
        }), o(this, "getSelectables", function() {
          return r.SelectableSet.elements;
        }), o(this, "getInitialCursorPosition", function() {
          return r.stores.PointerStore.initialVal;
        }), o(this, "getCurrentCursorPosition", function() {
          return r.stores.PointerStore.currentVal;
        }), o(this, "getPreviousCursorPosition", function() {
          return r.stores.PointerStore.lastVal;
        }), o(this, "getInitialCursorPositionArea", function() {
          return r.stores.PointerStore.initialValArea;
        }), o(this, "getCurrentCursorPositionArea", function() {
          return r.stores.PointerStore.currentValArea;
        }), o(this, "getPreviousCursorPositionArea", function() {
          return r.stores.PointerStore.lastValArea;
        }), o(this, "isMultiSelect", function(Ii) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ii);
        }), o(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ci({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: Mi,
          onDragMove: Ei,
          onDragStart: Ai,
          onDragStartBegin: Ti,
          onElementSelect: Oi,
          onElementUnselect: Pi
        }), this.stores = {
          PointerStore: new gi({
            DS: this
          }),
          ScrollStore: new vi({
            DS: this,
            areaElement: c,
            zoom: K
          }),
          KeyStore: new pi({
            DS: this,
            multiSelectKeys: yi,
            multiSelectMode: ze
          })
        }, this.Area = new ni({
          area: c,
          PS: this.PubSub,
          zoom: K
        }), this.Selector = new fi({
          DS: this,
          selector: wi,
          selectorClass: Ci,
          customStyles: pe
        }), this.SelectorArea = new mi({
          DS: this,
          selectorAreaClass: $i,
          autoScrollSpeed: M,
          overflowTolerance: O
        }), this.SelectableSet = new ui({
          elements: _,
          DS: this,
          className: nr,
          hoverClassName: or,
          useTransform: rr,
          draggability: _t
        }), this.SelectedSet = new di({
          DS: this,
          className: Di
        }), this.Selection = new hi({
          DS: this,
          hoverClassName: or,
          multiSelectToggling: $e
        }), this.Drag = new si({
          DS: this,
          draggability: _t,
          useTransform: rr,
          keyboardDrag: _i,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, ki),
          zoom: K,
          keyboardDragSpeed: Si
        }), this.Interaction = new li({
          areaElement: c,
          DS: this,
          draggability: _t,
          immediateDrag: xi,
          selectableClass: nr
        }), ai({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return n(h, [{
        key: "_callbacksTemp",
        value: function(r) {
          var g = r.callback, c = r.onDragMove, w = r.onDragStart, _ = r.onDragStartBegin, S = r.onElementSelect, M = r.onElementUnselect, P = function(V, K) {
            return console.warn("[DragSelect] ".concat(V, ' is deprecated. Use DragSelect.subscribe("').concat(K, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          g && (P("callback", "callback"), this.subscribe("callback", function(O) {
            var V = O.items;
            O.item;
            var K = O.event;
            return g(V, K);
          })), c && (P("onDragMove", "dragmove"), this.subscribe("dragmove", function(O) {
            O.items, O.item;
            var V = O.event;
            return c(V);
          })), w && (P("onDragStart", "dragstart"), this.subscribe("dragstart", function(O) {
            O.items, O.item;
            var V = O.event;
            return w(V);
          })), _ && (P("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(O) {
            O.items, O.item;
            var V = O.event;
            return _(V);
          })), S && (P("onElementSelect", "elementselect"), this.subscribe("elementselect", function(O) {
            O.items;
            var V = O.item, K = O.event;
            return S(V, K);
          })), M && (P("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(O) {
            O.items;
            var V = O.item, K = O.event;
            return M(V, K);
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
          return this.SelectedSet.addAll(Ve(r)), c || this.addSelectables(r), g && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ve(r)), c && this.removeSelectables(r), g && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var g = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ve(r).forEach(function(_) {
            return g.SelectedSet.has(_) ? g.removeSelection(r, c, w) : g.addSelection(r, c, w);
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
          var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = Ve(r);
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
          return this.SelectableSet.deleteAll(Ve(r)), g && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var c = g ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), w = r ? g ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : g ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return W(c, "-", w);
        }
      }]), h;
    }();
    return bi;
  });
})(Tr);
const Oo = Tr.exports, Ar = (a, e, t, i, n) => (e = Math, t = e.log, i = 1024, n = t(a) / t(i) | 0, a / e.pow(i, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B"), Or = (a, e = null) => {
  var t;
  return new Date(a * 1e3).toLocaleString((t = e != null ? e : navigator.language) != null ? t : "en-US");
}, Po = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Io = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Lo = [
  Io
], No = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, jo = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Vo = [
  jo
], zo = {
  name: "VFSortIcon"
}, ct = /* @__PURE__ */ Object.assign(zo, {
  props: { direction: String },
  setup(a) {
    return (e, t) => (y(), C("div", null, [
      a.direction == "down" ? (y(), C("svg", Po, Lo)) : G("", !0),
      a.direction == "up" ? (y(), C("svg", No, Vo)) : G("", !0)
    ]));
  }
}), Bo = ["onClick"], Ro = {
  name: "VFToast.vue"
}, Ho = /* @__PURE__ */ Object.assign(Ro, {
  setup(a) {
    const e = z("emitter"), { getStore: t } = z("storage"), i = I(t("full-screen", !1)), n = (p) => p == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", o = I([]), s = (p) => {
      o.value.splice(p, 1);
    }, f = (p) => {
      let m = o.value.findIndex((u) => u.id === p);
      m !== -1 && s(m);
    };
    return e.on("vf-toast-clear", () => {
      o.value = [];
    }), e.on("vf-toast-push", (p) => {
      let m = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      p.id = m, o.value.push(p), setTimeout(() => {
        f(m);
      }, 5e3);
    }), (p, m) => (y(), C("div", {
      class: de([i.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      we(Li, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: J(() => [
          (y(!0), C(ce, null, be(o.value, (u, v) => (y(), C("div", {
            onClick: (b) => s(v),
            key: u,
            class: de([n(u.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, E(u.label), 11, Bo))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Le = (a) => Object.entries(a).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: Uo } = Se(), Et = (a, e) => Uo.value + "?" + Le({ q: "preview", adapter: a, path: e }), Ko = { class: "relative flex-auto flex flex-col overflow-hidden" }, Yo = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, Wo = { class: "absolute" }, Xo = /* @__PURE__ */ d("svg", {
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
], -1), Fo = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, qo = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], Go = { class: "grid grid-cols-12 items-center" }, Jo = { class: "flex col-span-7 items-center" }, Zo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qo = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ea = [
  Qo
], ta = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ra = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ia = [
  ra
], oa = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, aa = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, na = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], sa = { class: "grid grid-cols-12 items-center" }, la = { class: "flex col-span-7 items-center" }, ca = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ua = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), da = [
  ua
], ha = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ma = [
  fa
], pa = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ga = { class: "col-span-2 text-center" }, va = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, ba = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], ya = { class: "relative" }, wa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _a = [
  xa
], ka = ["src"], Sa = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Da = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ca = [
  Da
], $a = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Ma = { class: "break-all" }, Ea = {
  name: "VFExplorer"
}, Ta = /* @__PURE__ */ Object.assign(Ea, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { setStore: i, getStore: n } = z("storage"), o = (L) => L == null ? void 0 : L.substring(0, 3), s = (L) => L.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = I(null), p = I(null), m = I(0), u = I(null), { t: v } = z("i18n"), b = Math.floor(Math.random() * 2 ** 32), T = I(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      T.value = !T.value, i("full-screen", T.value);
    });
    const k = I("");
    t.on("vf-search-query", ({ newQuery: L }) => {
      k.value = L, L ? t.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: L
        },
        onSuccess: (B) => {
          B.files.length || t.emit("vf-toast-push", { label: v("No search result found.") });
        }
      }) : t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let D = null;
    const N = () => {
      D && clearTimeout(D);
    }, Y = (L) => {
      D = setTimeout(() => {
        const B = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: L.target.getBoundingClientRect().x,
          clientY: L.target.getBoundingClientRect().y
        });
        L.target.dispatchEvent(B);
      }, 500);
    }, R = (L) => {
      L.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: L.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: L });
    }, A = ft({ active: !1, column: "", order: "" }), U = (L = !0) => {
      let B = [...e.data.files], j = A.column, W = A.order == "asc" ? 1 : -1;
      if (!L)
        return B;
      const H = (oe, Q) => typeof oe == "string" && typeof Q == "string" ? oe.toLowerCase().localeCompare(Q.toLowerCase()) : oe < Q ? -1 : oe > Q ? 1 : 0;
      return A.active && (B = B.slice().sort((oe, Q) => H(oe[j], Q[j]) * W)), B;
    }, F = (L) => {
      A.active && A.column == L ? (A.active = A.order == "asc", A.column = L, A.order = "desc") : (A.active = !0, A.column = L, A.order = "asc");
    }, $ = () => u.value.getSelection().map((L) => JSON.parse(L.dataset.item)), q = (L, B) => {
      if (L.altKey || L.ctrlKey || L.metaKey)
        return L.preventDefault(), !1;
      L.dataTransfer.setDragImage(p.value, 0, 15), L.dataTransfer.effectAllowed = "all", L.dataTransfer.dropEffect = "copy", L.dataTransfer.setData("items", JSON.stringify($()));
    }, ee = (L, B) => {
      L.preventDefault();
      let j = JSON.parse(L.dataTransfer.getData("items"));
      if (j.find((W) => W.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: j, to: B } });
    }, ue = (L, B) => {
      L.preventDefault(), !B || B.type !== "dir" || u.value.getSelection().find((j) => j == L.currentTarget) ? (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none") : L.dataTransfer.dropEffect = "copy";
    };
    return xe(() => {
      u.value = new Oo({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => bt(() => {
        u.value.clearSelection(), u.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), u.value.subscribe("predragstart", ({ event: L, isDragging: B }) => {
        if (B)
          m.value = u.value.getSelection().length, u.value.break();
        else {
          const j = L.target.offsetWidth - L.offsetX, W = L.target.offsetHeight - L.offsetY;
          j < 15 && W < 15 && (u.value.clearSelection(), u.value.break());
        }
      }), u.value.subscribe("predragmove", ({ isDragging: L }) => {
        L && u.value.break();
      }), u.value.subscribe("callback", ({ items: L, event: B, isDragging: j }) => {
        t.emit("vf-nodes-selected", $()), m.value = u.value.getSelection().length;
      });
    }), Ni(() => {
      u.value.setSelection(u.value.getSelection());
    }), xe(() => {
      vt(() => e.view, () => t.emit("vf-explorer-update"));
    }), (L, B) => (y(), C("div", Ko, [
      a.view == "list" || k.value.length ? (y(), C("div", Yo, [
        d("div", {
          onClick: B[0] || (B[0] = (j) => F("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          se(E(x(v)("Name")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "basename"]
          ])
        ]),
        k.value.length ? G("", !0) : (y(), C("div", {
          key: 0,
          onClick: B[1] || (B[1] = (j) => F("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          se(E(x(v)("Size")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "file_size"]
          ])
        ])),
        k.value.length ? G("", !0) : (y(), C("div", {
          key: 1,
          onClick: B[2] || (B[2] = (j) => F("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          se(E(x(v)("Date")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "last_modified"]
          ])
        ])),
        k.value.length ? (y(), C("div", {
          key: 2,
          onClick: B[3] || (B[3] = (j) => F("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          se(E(x(v)("Filepath")) + " ", 1),
          ve(we(ct, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [lt, A.active && A.column == "path"]
          ])
        ])) : G("", !0)
      ])) : G("", !0),
      d("div", Wo, [
        d("div", {
          ref_key: "dragImage",
          ref: p,
          class: "absolute -z-50 -top-96"
        }, [
          Xo,
          d("div", Fo, E(m.value), 1)
        ], 512)
      ]),
      d("div", {
        onContextmenu: B[10] || (B[10] = Pe((j) => x(t).emit("vf-contextmenu-show", { event: j, area: f.value, items: $() }), ["self", "prevent"])),
        class: de([T.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f
      }, [
        k.value.length ? (y(!0), C(ce, { key: 0 }, be(U(), (j, W) => (y(), C("div", {
          onDblclick: (H) => R(j),
          onTouchstart: B[4] || (B[4] = (H) => Y(H)),
          onTouchend: B[5] || (B[5] = (H) => N()),
          onContextmenu: Pe((H) => x(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: $(), target: j }), ["prevent"]),
          class: de(["vf-item-" + x(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": j.type,
          "data-item": JSON.stringify(j),
          "data-index": W
        }, [
          d("div", Go, [
            d("div", Jo, [
              j.type == "dir" ? (y(), C("svg", Zo, ea)) : (y(), C("svg", ta, ia)),
              d("span", oa, E(j.basename), 1)
            ]),
            d("div", aa, E(j.path), 1)
          ])
        ], 42, qo))), 256)) : G("", !0),
        a.view == "list" && !k.value.length ? (y(!0), C(ce, { key: 1 }, be(U(), (j, W) => (y(), C("div", {
          draggable: "true",
          onDblclick: (H) => R(j),
          onTouchstart: B[6] || (B[6] = (H) => Y(H)),
          onTouchend: B[7] || (B[7] = (H) => N()),
          onContextmenu: Pe((H) => x(t).emit("vf-contextmenu-show", { event: H, area: f.value, items: $(), target: j }), ["prevent"]),
          onDragstart: (H) => q(H),
          onDragover: (H) => ue(H, j),
          onDrop: (H) => ee(H, j),
          class: de(["vf-item-" + x(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": j.type,
          "data-item": JSON.stringify(j),
          "data-index": W
        }, [
          d("div", sa, [
            d("div", la, [
              j.type == "dir" ? (y(), C("svg", ca, da)) : (y(), C("svg", ha, ma)),
              d("span", pa, E(j.basename), 1)
            ]),
            d("div", ga, E(j.file_size ? x(Ar)(j.file_size) : ""), 1),
            d("div", va, E(x(Or)(j.last_modified)), 1)
          ])
        ], 42, na))), 256)) : G("", !0),
        a.view == "grid" && !k.value.length ? (y(!0), C(ce, { key: 2 }, be(U(!1), (j, W) => {
          var H, oe;
          return y(), C("div", {
            draggable: "true",
            onDblclick: (Q) => R(j),
            onTouchstart: B[8] || (B[8] = (Q) => Y(Q)),
            onTouchend: B[9] || (B[9] = (Q) => N()),
            onContextmenu: Pe((Q) => x(t).emit("vf-contextmenu-show", { event: Q, area: f.value, items: $(), target: j }), ["prevent"]),
            onDragstart: (Q) => q(Q),
            onDragover: (Q) => ue(Q, j),
            onDrop: (Q) => ee(Q, j),
            class: de(["vf-item-" + x(b), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
            "data-type": j.type,
            "data-item": JSON.stringify(j),
            "data-index": W
          }, [
            d("div", null, [
              d("div", ya, [
                j.type == "dir" ? (y(), C("svg", wa, _a)) : ((H = j.mime_type) != null ? H : "").startsWith("image") ? (y(), C("img", {
                  key: 1,
                  class: "h-10 md:h-12 m-auto",
                  src: x(Et)(x(n)("adapter", e.data.adapter), j.path),
                  alt: ""
                }, null, 8, ka)) : (y(), C("svg", Sa, Ca)),
                ((oe = j.mime_type) != null ? oe : "").startsWith("image") ? G("", !0) : (y(), C("div", $a, E(o(j.extension)), 1))
              ]),
              d("span", Ma, E(s(j.basename)), 1)
            ])
          ], 42, ba);
        }), 256)) : G("", !0)
      ], 34),
      we(Ho)
    ]));
  }
}), Aa = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Oa = { class: "flex leading-5 items-center" }, Pa = ["aria-label"], Ia = /* @__PURE__ */ d("svg", {
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
], -1), La = [
  Ia
], Na = ["value"], ja = { class: "ml-3" }, Va = { key: 0 }, za = { class: "ml-1" }, Ba = { class: "flex leading-5 items-center" }, Ra = {
  value: "",
  disabled: ""
}, Ha = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), Ua = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), Ka = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), Ya = ["aria-label"], Wa = /* @__PURE__ */ d("svg", {
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
], -1), Xa = [
  Wa
], Fa = {
  name: "VFStatusbar"
}, qa = /* @__PURE__ */ Object.assign(Fa, {
  props: {
    data: Object
  },
  setup(a) {
    var b;
    const e = a, t = z("emitter"), { getStore: i, setStore: n } = z("storage"), o = I(0), s = I((b = i("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: p } = z("i18n"), m = I(i("locale", "")), u = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: s.value } }), n("adapter", s.value);
    };
    t.on("vf-nodes-selected", (T) => {
      o.value = T.length;
    });
    const v = I("");
    return t.on("vf-search-query", ({ newQuery: T }) => {
      v.value = T;
    }), (T, k) => (y(), C("div", Aa, [
      d("div", Oa, [
        d("div", {
          class: "mx-2",
          "aria-label": x(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, La, 8, Pa),
        ve(d("select", {
          "onUpdate:modelValue": k[0] || (k[0] = (D) => s.value = D),
          onChange: u,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (y(!0), C(ce, null, be(a.data.storages, (D) => (y(), C("option", { value: D }, E(D), 9, Na))), 256))
        ], 544), [
          [ur, s.value]
        ]),
        d("div", ja, [
          v.value.length ? (y(), C("span", Va, E(a.data.files.length) + " items found. ", 1)) : G("", !0),
          d("span", za, E(o.value > 0 ? o.value + " " + x(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", Ba, [
        ve(d("select", {
          "onUpdate:modelValue": k[1] || (k[1] = (D) => m.value = D),
          onChange: k[2] || (k[2] = (D) => x(p)(D.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", Ra, E(x(f)("Language")), 1),
          Ha,
          Ua,
          Ka
        ], 544), [
          [ur, m.value]
        ]),
        d("span", {
          "aria-label": x(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: k[3] || (k[3] = (D) => x(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: x(f)("Vuefinder is a file manager component for vue 3.") }))
        }, Xa, 8, Ya)
      ])
    ]));
  }
}), Ga = (a, e = 0, t = !1) => {
  let i;
  return (...n) => {
    t && !i && a(...n), clearTimeout(i), i = setTimeout(() => {
      a(...n);
    }, e);
  };
}, Ja = (a, e, t) => {
  const i = I(a);
  return ji((o, s) => ({
    get() {
      return o(), i.value;
    },
    set: Ga(
      (f) => {
        i.value = f, s();
      },
      e,
      t
    )
  }));
}, Za = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Qa = ["aria-label"], en = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), tn = [
  en
], rn = ["aria-label"], on = /* @__PURE__ */ d("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), an = [
  on
], nn = {
  key: 1,
  "aria-label": "Cancel",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, sn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), ln = [
  sn
], cn = ["onClick"], un = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), dn = [
  un
], hn = { class: "flex leading-5" }, fn = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), mn = ["title", "onClick"], pn = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, gn = /* @__PURE__ */ d("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), vn = /* @__PURE__ */ d("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), bn = [
  gn,
  vn
], yn = {
  key: 3,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, wn = /* @__PURE__ */ d("svg", {
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
], -1), xn = ["onKeydown", "placeholder"], _n = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), kn = [
  _n
], Sn = {
  name: "VFBreadcrumb"
}, Dn = /* @__PURE__ */ Object.assign(Sn, {
  props: {
    data: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), n = I(null), o = I([]), s = I(!1), f = I(null), { t: p } = z("i18n"), m = z("loadingState");
    t.on("vf-explorer-update", () => {
      var U;
      let R = [], A = [];
      n.value = (U = e.data.dirname) != null ? U : i("adapter", "local") + "://", n.value.length == 0 && (o.value = []), n.value.replace(i("adapter", "local") + "://", "").split("/").forEach(function(F) {
        R.push(F), R.join("/") != "" && A.push({
          basename: F,
          name: F,
          path: i("adapter", "local") + "://" + R.join("/"),
          type: "dir"
        });
      }), A.length > 4 && (A = A.slice(-5), A[0].name = ".."), o.value = A;
    });
    const u = () => {
      s.value = !1, b.value = "";
    };
    t.on("vf-search-exit", () => {
      u();
    });
    const v = () => {
      s.value = !0, bt(() => f.value.focus());
    }, b = Ja("", 400), T = () => m.value;
    vt(b, (R) => {
      t.emit("vf-toast-clear"), t.emit("vf-search-query", { newQuery: R });
    });
    const k = () => o.value.length && !s.value, D = (R) => {
      var U;
      R.preventDefault();
      let A = JSON.parse(R.dataTransfer.getData("items"));
      if (A.find((F) => F.storage != i("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: A, to: (U = o.value[o.value.length - 2]) != null ? U : { path: i("adapter", "local") + "://" } }
      });
    }, N = (R) => {
      R.preventDefault(), k() ? R.dataTransfer.dropEffect = "copy" : (R.dataTransfer.dropEffect = "none", R.dataTransfer.effectAllowed = "none");
    }, Y = () => {
      b.value == "" && u();
    };
    return (R, A) => (y(), C("div", Za, [
      d("span", {
        "aria-label": x(p)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), C("svg", {
          onDragover: A[0] || (A[0] = (U) => N(U)),
          onDrop: A[1] || (A[1] = (U) => D(U)),
          onClick: A[2] || (A[2] = (U) => {
            var F, $;
            return !k() || x(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter, path: ($ = (F = o.value[o.value.length - 2]) == null ? void 0 : F.path) != null ? $ : x(i)("adapter", "local") + "://" } });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", k() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, tn, 34))
      ], 8, Qa),
      T() ? (y(), C("span", nn, [
        (y(), C("svg", {
          onClick: A[4] || (A[4] = (U) => x(t).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, ln))
      ])) : (y(), C("span", {
        key: 0,
        "aria-label": x(p)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), C("svg", {
          onClick: A[3] || (A[3] = (U) => {
            x(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter, path: a.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, an))
      ], 8, rn)),
      s.value ? (y(), C("div", yn, [
        wn,
        ve(d("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: Ye(u, ["esc"]),
          onBlur: Y,
          "onUpdate:modelValue": A[6] || (A[6] = (U) => Vi(b) ? b.value = U : null),
          placeholder: x(p)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, xn), [
          [We, x(b)]
        ]),
        (y(), C("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: u,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, kn))
      ])) : (y(), C("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Pe(v, ["self"])
      }, [
        (y(), C("svg", {
          onClick: A[5] || (A[5] = (U) => x(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, dn)),
        d("div", hn, [
          (y(!0), C(ce, null, be(o.value, (U, F) => (y(), C("div", { key: F }, [
            fn,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: U.basename,
              onClick: ($) => x(t).emit("vf-fetch", { params: { q: "index", adapter: a.data.adapter, path: U.path } })
            }, E(U.name), 9, mn)
          ]))), 128))
        ]),
        T() ? (y(), C("svg", pn, bn)) : G("", !0)
      ], 8, cn))
    ]));
  }
}), Cn = ["onClick"], $n = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), Mn = {
  name: "VFContextMenu"
}, En = /* @__PURE__ */ Object.assign(Mn, {
  props: {
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), i = I(null), { apiUrl: n } = Se(), o = ft({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), s = I([]);
    t.on("vf-context-selected", (b) => {
      s.value = b;
    });
    const { t: f } = z("i18n"), p = {
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
          const b = n.value + "?" + Le({ q: "download", adapter: e.current.adapter, path: s.value[0].path });
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
    }, u = I("");
    t.on("vf-search-query", ({ newQuery: b }) => {
      u.value = b;
    }), t.on("vf-contextmenu-show", ({ event: b, area: T, items: k, target: D = null }) => {
      if (o.items = [], u.value)
        if (D)
          o.items.push(p.openDir), t.emit("vf-context-selected", [D]);
        else
          return;
      else
        !D && !u.value ? (o.items.push(p.refresh), o.items.push(p.newfolder), t.emit("vf-context-selected", [])) : k.length > 1 && k.some((N) => N.path === D.path) ? (o.items.push(p.refresh), o.items.push(p.archive), o.items.push(p.delete), t.emit("vf-context-selected", k)) : (D.type == "dir" ? o.items.push(p.open) : (o.items.push(p.preview), o.items.push(p.download)), o.items.push(p.rename), D.mime_type == "application/zip" ? o.items.push(p.unarchive) : o.items.push(p.archive), o.items.push(p.delete), t.emit("vf-context-selected", [D]));
      v(b, T);
    }), t.on("vf-contextmenu-hide", () => {
      o.active = !1;
    });
    const v = (b, T) => {
      o.active = !0, bt(() => {
        let k = T.getBoundingClientRect(), D = b.pageX, N = b.pageY, Y = i.value.offsetHeight, R = i.value.offsetWidth;
        D = k.right - b.pageX + window.scrollX < R ? D - R : D, N = k.bottom - b.pageY + window.scrollY < Y ? N - Y : N, o.positions = {
          left: D + "px",
          top: N + "px"
        };
      });
    };
    return (b, T) => o.active ? (y(), C("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: i,
      style: Er(o.positions)
    }, [
      (y(!0), C(ce, null, be(o.items, (k) => (y(), C("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: k.title,
        onClick: (D) => m(k)
      }, [
        $n,
        d("span", null, E(k.title()), 1)
      ], 8, Cn))), 128))
    ], 4)) : G("", !0);
  }
}), Tn = (a, e) => {
  const t = a[e];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((i, n) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function An(a) {
  const e = await Tn(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.4dabcb3e.js"), "../locales/tr.json": () => import("./tr.f45cbe8b.js") }), `../locales/${a}.json`);
  return JSON.parse(e.default);
}
function On(a, e, t) {
  const { getStore: i, setStore: n } = Mt(a), o = ["en", "tr"], s = I({}), f = (u) => {
    o.includes(u) || (t.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u = "en"), An(u).then((v) => {
      s.value = v, n("locale", u), n("translations", v), t.emit("vf-toast-push", { label: "The language is set to " + u });
    });
  };
  i("locale") ? s.value = i("translations") : f(e);
  const p = (u, ...v) => v.length ? p(u = u.replace("%s", v.shift()), ...v) : u;
  function m(u, ...v) {
    return s.value.hasOwnProperty(u) ? p(s.value[u], ...v) : u;
  }
  return { t: m, support_locales: o, changeLocale: f };
}
const Pn = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), In = {
  name: "VueFinder"
}, Ln = /* @__PURE__ */ Object.assign(In, {
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
    postData: {
      type: Object,
      default: {}
    }
  },
  setup(a) {
    const e = a, t = Bi(), { setStore: i, getStore: n } = Mt(e.id);
    Ge("emitter", t), Ge("storage", Mt(e.id)), Ge("postData", e.postData);
    const o = On(e.id, e.locale, t);
    Ge("i18n", o);
    const { apiUrl: s, setApiUrl: f } = Se();
    f(e.url);
    const p = ft({ adapter: "local", storages: [], dirname: ".", files: [] }), m = I(n("viewport", "grid")), u = I(n("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      u.value = !u.value, i("darkMode", u.value);
    });
    const v = I(!1);
    Ge("loadingState", v);
    const b = I(n("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      b.value = !b.value, i("full-screen", b.value);
    }), t.on("vf-view-toggle", (N) => {
      m.value = N;
    });
    const T = ft({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      T.active = !1;
    }), t.on("vf-modal-show", (N) => {
      T.active = !0, T.type = N.type, T.data = N;
    });
    const k = (N) => {
      Object.assign(p, N), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    let D;
    return t.on("vf-fetch-abort", () => {
      D.abort(), v.value = !1;
    }), t.on("vf-fetch", ({ params: N, onSuccess: Y = null, onError: R = null }) => {
      ["index", "search"].includes(N.q) && (D && D.abort(), v.value = !0), D = new AbortController();
      const A = D.signal;
      pt(s.value, { params: N, signal: A }).then((U) => {
        ["index", "search"].includes(N.q) && (v.value = !1), t.emit("vf-modal-close"), k(U), Y(U);
      }).catch((U) => {
        R && R(U);
      }).finally(() => {
      });
    }), t.on("vf-download", (N) => {
      document.getElementById("download_frame").src = N, t.emit("vf-modal-close");
    }), xe(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: n("adapter", p.adapter) } });
    }), (N, Y) => (y(), C("div", {
      class: de(["vuefinder", u.value ? "dark" : ""])
    }, [
      d("div", {
        class: de([b.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: Er(b.value ? "" : "max-height: " + a.maxHeight),
        onMousedown: Y[0] || (Y[0] = (R) => x(t).emit("vf-contextmenu-hide")),
        onTouchstart: Y[1] || (Y[1] = (R) => x(t).emit("vf-contextmenu-hide"))
      }, [
        we(To, { data: p }, null, 8, ["data"]),
        we(Dn, { data: p }, null, 8, ["data"]),
        we(Ta, {
          view: m.value,
          data: p
        }, null, 8, ["view", "data"]),
        we(qa, { data: p }, null, 8, ["data"])
      ], 38),
      T.active ? (y(), Z(zi("v-f-modal-" + T.type), {
        key: 0,
        selection: T.data,
        current: p
      }, null, 8, ["selection", "current"])) : G("", !0),
      we(En, { current: p }, null, 8, ["current"]),
      Pn
    ], 2));
  }
}), Nn = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), jn = { class: "fixed z-10 inset-0 overflow-y-auto w-screen h-screen" }, Vn = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, zn = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Bn = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, De = {
  __name: "ModalLayout",
  setup(a) {
    const e = z("emitter");
    return xe(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, i) => (y(), C("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: i[1] || (i[1] = Ye((n) => x(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Nn,
      d("div", jn, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: i[0] || (i[0] = Pe((n) => x(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", Vn, [
            d("div", zn, [
              $t(t.$slots, "default")
            ]),
            d("div", Bn, [
              $t(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Rn = ["aria-label"], Hn = /* @__PURE__ */ d("svg", {
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
], -1), Un = [
  Hn
], Kn = {
  name: "Message"
}, Ce = /* @__PURE__ */ Object.assign(Kn, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(a, { emit: e }) {
    var f;
    const { t } = z("i18n"), i = I(!1), n = I(null), o = I((f = n.value) == null ? void 0 : f.strMessage);
    vt(o, () => i.value = !1);
    const s = () => {
      e("hidden"), i.value = !0;
    };
    return (p, m) => (y(), C("div", null, [
      i.value ? G("", !0) : (y(), C("div", {
        key: 0,
        ref_key: "strMessage",
        ref: n,
        class: de(["flex mt-1 p-1 px-2 rounded text-sm", a.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        $t(p.$slots, "default"),
        d("div", {
          class: "ml-auto cursor-pointer",
          onClick: s,
          "aria-label": x(t)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Un, 8, Rn)
      ], 2))
    ]));
  }
}), Yn = { class: "sm:flex sm:items-start" }, Wn = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Xn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Fn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qn = { class: "mt-2" }, Gn = { class: "text-sm text-gray-500" }, Jn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Zn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), es = [
  Qn
], ts = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rs = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), is = [
  rs
], os = { class: "ml-1.5" }, as = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, ns = {
  name: "VFModalDelete"
}, ss = /* @__PURE__ */ Object.assign(ns, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(e.selection.items), s = I(""), f = () => {
      o.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(o.value.map(({ path: p, type: m }) => ({ path: p, type: m })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (u) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1),
        d("div", as, E(x(n)("This action cannot be undone.")), 1)
      ]),
      default: J(() => [
        d("div", Yn, [
          Wn,
          d("div", Xn, [
            d("h3", Fn, E(x(n)("Delete files")), 1),
            d("div", qn, [
              d("p", Gn, E(x(n)("Are you sure you want to delete these files?")), 1),
              (y(!0), C(ce, null, be(o.value, (u) => (y(), C("p", Jn, [
                u.type == "dir" ? (y(), C("svg", Zn, es)) : (y(), C("svg", ts, is)),
                d("span", os, E(u.basename), 1)
              ]))), 256)),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: m[0] || (m[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ls = { class: "sm:flex sm:items-start" }, cs = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), us = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, ds = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, hs = { class: "mt-2" }, fs = { class: "text-sm text-gray-500" }, ms = {
  name: "VFModalMessage"
}, ps = /* @__PURE__ */ Object.assign(ms, {
  props: {
    selection: Object
  },
  setup(a) {
    const e = z("emitter"), { t } = z("i18n");
    return (i, n) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: n[0] || (n[0] = (o) => x(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(t)("Close")), 1)
      ]),
      default: J(() => {
        var o, s, f, p;
        return [
          d("div", ls, [
            cs,
            d("div", us, [
              d("h3", ds, E((s = (o = a.selection) == null ? void 0 : o.title) != null ? s : "Title"), 1),
              d("div", hs, [
                d("p", fs, E((p = (f = a.selection) == null ? void 0 : f.message) != null ? p : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), gs = { class: "sm:flex sm:items-start" }, vs = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), bs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ys = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ws = { class: "mt-2" }, xs = { class: "text-sm text-gray-500" }, _s = ["onKeyup", "placeholder"], ks = {
  name: "VFModalNewFolder"
}, Ss = /* @__PURE__ */ Object.assign(ks, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(""), s = I(""), f = () => {
      o.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          name: o.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[2] || (m[2] = (u) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", gs, [
          vs,
          d("div", bs, [
            d("h3", ys, E(x(n)("New Folder")), 1),
            d("div", ws, [
              d("p", xs, E(x(n)("Create a new folder")), 1),
              ve(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (u) => o.value = u),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(n)("Folder Name"),
                type: "text"
              }, null, 40, _s), [
                [We, o.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: m[1] || (m[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ds = { class: "sm:flex sm:items-start" }, Cs = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), $s = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ms = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Es = { class: "mt-2" }, Ts = { class: "text-sm text-gray-500" }, As = ["onKeyup", "placeholder"], Os = {
  name: "VFModalNewFile"
}, Ps = /* @__PURE__ */ Object.assign(Os, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(""), s = I(""), f = () => {
      o.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          name: o.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (p) => {
          s.value = n(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[2] || (m[2] = (u) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: J(() => [
        d("div", Ds, [
          Cs,
          d("div", $s, [
            d("h3", Ms, E(x(n)("New File")), 1),
            d("div", Es, [
              d("p", Ts, E(x(n)("Create a new file")), 1),
              ve(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (u) => o.value = u),
                onKeyup: Ye(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(n)("File Name"),
                type: "text"
              }, null, 40, As), [
                [We, o.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: m[1] || (m[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Is = { class: "flex" }, Ls = ["aria-label"], Ns = { class: "ml-auto mb-2" }, js = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Vs = { key: 1 }, zs = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, i = I(""), n = I(""), o = I(null), s = I(!1), { apiUrl: f } = Se(), p = I(""), m = I(!1), { t: u } = z("i18n");
    xe(() => {
      pt(f.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((k) => {
        i.value = k, e("load");
      });
    });
    const v = () => {
      s.value = !s.value, n.value = i.value, s.value == !0 && bt(() => {
        o.value.focus();
      });
    }, b = z("postData"), T = () => {
      p.value = "", m.value = !1, pt(f.value, {
        method: "POST",
        params: Object.assign(b, {
          q: "save",
          adapter: t.selection.adapter,
          path: t.selection.item.path,
          content: n.value
        }),
        json: !1
      }).then((k) => {
        p.value = u("Updated."), i.value = k, e("load"), s.value = !s.value;
      }).catch((k) => {
        p.value = u(k.message), m.value = !0;
      });
    };
    return (k, D) => (y(), C(ce, null, [
      d("div", Is, [
        d("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(a.selection.item.basename), 9, Ls),
        d("div", Ns, [
          s.value ? (y(), C("button", {
            key: 0,
            onClick: T,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(x(u)("Save")), 1)) : G("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: D[0] || (D[0] = (N) => v())
          }, E(s.value ? x(u)("Cancel") : x(u)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        s.value ? (y(), C("div", Vs, [
          ve(d("textarea", {
            ref_key: "editInput",
            ref: o,
            "onUpdate:modelValue": D[1] || (D[1] = (N) => n.value = N),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [We, n.value]
          ])
        ])) : (y(), C("pre", js, E(i.value), 1)),
        p.value.length ? (y(), Z(Ce, {
          key: 2,
          onHidden: D[2] || (D[2] = (N) => p.value = ""),
          error: m.value
        }, {
          default: J(() => [
            se(E(p.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : G("", !0)
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
function hr(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(a);
    e && (i = i.filter(function(n) {
      return Object.getOwnPropertyDescriptor(a, n).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function Pr(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? hr(Object(t), !0).forEach(function(i) {
      Hs(a, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : hr(Object(t)).forEach(function(i) {
      Object.defineProperty(a, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return a;
}
function ht(a) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ht = function(e) {
    return typeof e;
  } : ht = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ht(a);
}
function Bs(a, e) {
  if (!(a instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function fr(a, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(a, i.key, i);
  }
}
function Rs(a, e, t) {
  return e && fr(a.prototype, e), t && fr(a, t), a;
}
function Hs(a, e, t) {
  return e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function Ir(a) {
  return Us(a) || Ks(a) || Ys(a) || Ws();
}
function Us(a) {
  if (Array.isArray(a))
    return Tt(a);
}
function Ks(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null)
    return Array.from(a);
}
function Ys(a, e) {
  if (!!a) {
    if (typeof a == "string")
      return Tt(a, e);
    var t = Object.prototype.toString.call(a).slice(8, -1);
    if (t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set")
      return Array.from(a);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Tt(a, e);
  }
}
function Tt(a, e) {
  (e == null || e > a.length) && (e = a.length);
  for (var t = 0, i = new Array(e); t < e; t++)
    i[t] = a[t];
  return i;
}
function Ws() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var yt = typeof window < "u" && typeof window.document < "u", ke = yt ? window : {}, zt = yt && ke.document.documentElement ? "ontouchstart" in ke.document.documentElement : !1, Bt = yt ? "PointerEvent" in ke : !1, te = "cropper", Rt = "all", Lr = "crop", Nr = "move", jr = "zoom", Ae = "e", Oe = "w", Be = "s", Me = "n", Je = "ne", Ze = "nw", Qe = "se", et = "sw", At = "".concat(te, "-crop"), mr = "".concat(te, "-disabled"), fe = "".concat(te, "-hidden"), pr = "".concat(te, "-hide"), Xs = "".concat(te, "-invisible"), gt = "".concat(te, "-modal"), Ot = "".concat(te, "-move"), rt = "".concat(te, "Action"), ut = "".concat(te, "Preview"), Ht = "crop", Vr = "move", zr = "none", Pt = "crop", It = "cropend", Lt = "cropmove", Nt = "cropstart", gr = "dblclick", Fs = zt ? "touchstart" : "mousedown", qs = zt ? "touchmove" : "mousemove", Gs = zt ? "touchend touchcancel" : "mouseup", vr = Bt ? "pointerdown" : Fs, br = Bt ? "pointermove" : qs, yr = Bt ? "pointerup pointercancel" : Gs, wr = "ready", xr = "resize", _r = "wheel", jt = "zoom", kr = "image/jpeg", Js = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Zs = /^data:/, Qs = /^data:image\/jpeg;base64,/, el = /^img|canvas$/i, Br = 200, Rr = 100, Sr = {
  viewMode: 0,
  dragMode: Ht,
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
  minContainerWidth: Br,
  minContainerHeight: Rr,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, tl = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', rl = Number.isNaN || ke.isNaN;
function X(a) {
  return typeof a == "number" && !rl(a);
}
var Dr = function(e) {
  return e > 0 && e < 1 / 0;
};
function St(a) {
  return typeof a > "u";
}
function Ie(a) {
  return ht(a) === "object" && a !== null;
}
var il = Object.prototype.hasOwnProperty;
function Re(a) {
  if (!Ie(a))
    return !1;
  try {
    var e = a.constructor, t = e.prototype;
    return e && t && il.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function he(a) {
  return typeof a == "function";
}
var ol = Array.prototype.slice;
function Hr(a) {
  return Array.from ? Array.from(a) : ol.call(a);
}
function ne(a, e) {
  return a && he(e) && (Array.isArray(a) || X(a.length) ? Hr(a).forEach(function(t, i) {
    e.call(a, t, i, a);
  }) : Ie(a) && Object.keys(a).forEach(function(t) {
    e.call(a, a[t], t, a);
  })), a;
}
var re = Object.assign || function(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    i[n - 1] = arguments[n];
  return Ie(e) && i.length > 0 && i.forEach(function(o) {
    Ie(o) && Object.keys(o).forEach(function(s) {
      e[s] = o[s];
    });
  }), e;
}, al = /\.\d*(?:0|9){12}\d*$/;
function Ue(a) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return al.test(a) ? Math.round(a * e) / e : a;
}
var nl = /^width|height|left|top|marginLeft|marginTop$/;
function Ee(a, e) {
  var t = a.style;
  ne(e, function(i, n) {
    nl.test(n) && X(i) && (i = "".concat(i, "px")), t[n] = i;
  });
}
function sl(a, e) {
  return a.classList ? a.classList.contains(e) : a.className.indexOf(e) > -1;
}
function le(a, e) {
  if (!!e) {
    if (X(a.length)) {
      ne(a, function(i) {
        le(i, e);
      });
      return;
    }
    if (a.classList) {
      a.classList.add(e);
      return;
    }
    var t = a.className.trim();
    t ? t.indexOf(e) < 0 && (a.className = "".concat(t, " ").concat(e)) : a.className = e;
  }
}
function _e(a, e) {
  if (!!e) {
    if (X(a.length)) {
      ne(a, function(t) {
        _e(t, e);
      });
      return;
    }
    if (a.classList) {
      a.classList.remove(e);
      return;
    }
    a.className.indexOf(e) >= 0 && (a.className = a.className.replace(e, ""));
  }
}
function He(a, e, t) {
  if (!!e) {
    if (X(a.length)) {
      ne(a, function(i) {
        He(i, e, t);
      });
      return;
    }
    t ? le(a, e) : _e(a, e);
  }
}
var ll = /([a-z\d])([A-Z])/g;
function Ut(a) {
  return a.replace(ll, "$1-$2").toLowerCase();
}
function Vt(a, e) {
  return Ie(a[e]) ? a[e] : a.dataset ? a.dataset[e] : a.getAttribute("data-".concat(Ut(e)));
}
function it(a, e, t) {
  Ie(t) ? a[e] = t : a.dataset ? a.dataset[e] = t : a.setAttribute("data-".concat(Ut(e)), t);
}
function cl(a, e) {
  if (Ie(a[e]))
    try {
      delete a[e];
    } catch {
      a[e] = void 0;
    }
  else if (a.dataset)
    try {
      delete a.dataset[e];
    } catch {
      a.dataset[e] = void 0;
    }
  else
    a.removeAttribute("data-".concat(Ut(e)));
}
var Ur = /\s\s*/, Kr = function() {
  var a = !1;
  if (yt) {
    var e = !1, t = function() {
    }, i = Object.defineProperty({}, "once", {
      get: function() {
        return a = !0, e;
      },
      set: function(o) {
        e = o;
      }
    });
    ke.addEventListener("test", t, i), ke.removeEventListener("test", t, i);
  }
  return a;
}();
function ye(a, e, t) {
  var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(Ur).forEach(function(o) {
    if (!Kr) {
      var s = a.listeners;
      s && s[o] && s[o][t] && (n = s[o][t], delete s[o][t], Object.keys(s[o]).length === 0 && delete s[o], Object.keys(s).length === 0 && delete a.listeners);
    }
    a.removeEventListener(o, n, i);
  });
}
function ge(a, e, t) {
  var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, n = t;
  e.trim().split(Ur).forEach(function(o) {
    if (i.once && !Kr) {
      var s = a.listeners, f = s === void 0 ? {} : s;
      n = function() {
        delete f[o][t], a.removeEventListener(o, n, i);
        for (var m = arguments.length, u = new Array(m), v = 0; v < m; v++)
          u[v] = arguments[v];
        t.apply(a, u);
      }, f[o] || (f[o] = {}), f[o][t] && a.removeEventListener(o, f[o][t], i), f[o][t] = n, a.listeners = f;
    }
    a.addEventListener(o, n, i);
  });
}
function Ke(a, e, t) {
  var i;
  return he(Event) && he(CustomEvent) ? i = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (i = document.createEvent("CustomEvent"), i.initCustomEvent(e, !0, !0, t)), a.dispatchEvent(i);
}
function Yr(a) {
  var e = a.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var Dt = ke.location, ul = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Cr(a) {
  var e = a.match(ul);
  return e !== null && (e[1] !== Dt.protocol || e[2] !== Dt.hostname || e[3] !== Dt.port);
}
function $r(a) {
  var e = "timestamp=".concat(new Date().getTime());
  return a + (a.indexOf("?") === -1 ? "?" : "&") + e;
}
function tt(a) {
  var e = a.rotate, t = a.scaleX, i = a.scaleY, n = a.translateX, o = a.translateY, s = [];
  X(n) && n !== 0 && s.push("translateX(".concat(n, "px)")), X(o) && o !== 0 && s.push("translateY(".concat(o, "px)")), X(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), X(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), X(i) && i !== 1 && s.push("scaleY(".concat(i, ")"));
  var f = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function dl(a) {
  var e = Pr({}, a), t = 0;
  return ne(a, function(i, n) {
    delete e[n], ne(e, function(o) {
      var s = Math.abs(i.startX - o.startX), f = Math.abs(i.startY - o.startY), p = Math.abs(i.endX - o.endX), m = Math.abs(i.endY - o.endY), u = Math.sqrt(s * s + f * f), v = Math.sqrt(p * p + m * m), b = (v - u) / u;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function dt(a, e) {
  var t = a.pageX, i = a.pageY, n = {
    endX: t,
    endY: i
  };
  return e ? n : Pr({
    startX: t,
    startY: i
  }, n);
}
function hl(a) {
  var e = 0, t = 0, i = 0;
  return ne(a, function(n) {
    var o = n.startX, s = n.startY;
    e += o, t += s, i += 1;
  }), e /= i, t /= i, {
    pageX: e,
    pageY: t
  };
}
function Te(a) {
  var e = a.aspectRatio, t = a.height, i = a.width, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", o = Dr(i), s = Dr(t);
  if (o && s) {
    var f = t * e;
    n === "contain" && f > i || n === "cover" && f < i ? t = i / e : i = t * e;
  } else
    o ? t = i / e : s && (i = t * e);
  return {
    width: i,
    height: t
  };
}
function fl(a) {
  var e = a.width, t = a.height, i = a.degree;
  if (i = Math.abs(i) % 180, i === 90)
    return {
      width: t,
      height: e
    };
  var n = i % 90 * Math.PI / 180, o = Math.sin(n), s = Math.cos(n), f = e * s + t * o, p = e * o + t * s;
  return i > 90 ? {
    width: p,
    height: f
  } : {
    width: f,
    height: p
  };
}
function ml(a, e, t, i) {
  var n = e.aspectRatio, o = e.naturalWidth, s = e.naturalHeight, f = e.rotate, p = f === void 0 ? 0 : f, m = e.scaleX, u = m === void 0 ? 1 : m, v = e.scaleY, b = v === void 0 ? 1 : v, T = t.aspectRatio, k = t.naturalWidth, D = t.naturalHeight, N = i.fillColor, Y = N === void 0 ? "transparent" : N, R = i.imageSmoothingEnabled, A = R === void 0 ? !0 : R, U = i.imageSmoothingQuality, F = U === void 0 ? "low" : U, $ = i.maxWidth, q = $ === void 0 ? 1 / 0 : $, ee = i.maxHeight, ue = ee === void 0 ? 1 / 0 : ee, me = i.minWidth, L = me === void 0 ? 0 : me, B = i.minHeight, j = B === void 0 ? 0 : B, W = document.createElement("canvas"), H = W.getContext("2d"), oe = Te({
    aspectRatio: T,
    width: q,
    height: ue
  }), Q = Te({
    aspectRatio: T,
    width: L,
    height: j
  }, "cover"), Xe = Math.min(oe.width, Math.max(Q.width, k)), Fe = Math.min(oe.height, Math.max(Q.height, D)), ot = Te({
    aspectRatio: n,
    width: q,
    height: ue
  }), at = Te({
    aspectRatio: n,
    width: L,
    height: j
  }, "cover"), nt = Math.min(ot.width, Math.max(at.width, o)), Ne = Math.min(ot.height, Math.max(at.height, s)), wt = [-nt / 2, -Ne / 2, nt, Ne];
  return W.width = Ue(Xe), W.height = Ue(Fe), H.fillStyle = Y, H.fillRect(0, 0, Xe, Fe), H.save(), H.translate(Xe / 2, Fe / 2), H.rotate(p * Math.PI / 180), H.scale(u, b), H.imageSmoothingEnabled = A, H.imageSmoothingQuality = F, H.drawImage.apply(H, [a].concat(Ir(wt.map(function(je) {
    return Math.floor(Ue(je));
  })))), H.restore(), W;
}
var Wr = String.fromCharCode;
function pl(a, e, t) {
  var i = "";
  t += e;
  for (var n = e; n < t; n += 1)
    i += Wr(a.getUint8(n));
  return i;
}
var gl = /^data:.*,/;
function vl(a) {
  var e = a.replace(gl, ""), t = atob(e), i = new ArrayBuffer(t.length), n = new Uint8Array(i);
  return ne(n, function(o, s) {
    n[s] = t.charCodeAt(s);
  }), i;
}
function bl(a, e) {
  for (var t = [], i = 8192, n = new Uint8Array(a); n.length > 0; )
    t.push(Wr.apply(null, Hr(n.subarray(0, i)))), n = n.subarray(i);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function yl(a) {
  var e = new DataView(a), t;
  try {
    var i, n, o;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var s = e.byteLength, f = 2; f + 1 < s; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          n = f;
          break;
        }
        f += 1;
      }
    if (n) {
      var p = n + 4, m = n + 10;
      if (pl(e, p, 4) === "Exif") {
        var u = e.getUint16(m);
        if (i = u === 18761, (i || u === 19789) && e.getUint16(m + 2, i) === 42) {
          var v = e.getUint32(m + 4, i);
          v >= 8 && (o = m + v);
        }
      }
    }
    if (o) {
      var b = e.getUint16(o, i), T, k;
      for (k = 0; k < b; k += 1)
        if (T = o + k * 12 + 2, e.getUint16(T, i) === 274) {
          T += 8, t = e.getUint16(T, i), e.setUint16(T, 1, i);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function wl(a) {
  var e = 0, t = 1, i = 1;
  switch (a) {
    case 2:
      t = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      i = -1;
      break;
    case 5:
      e = 90, i = -1;
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
    scaleY: i
  };
}
var xl = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, i = this.container, n = this.cropper, o = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    le(n, fe), _e(e, fe);
    var f = {
      width: Math.max(i.offsetWidth, o >= 0 ? o : Br),
      height: Math.max(i.offsetHeight, s >= 0 ? s : Rr)
    };
    this.containerData = f, Ee(n, {
      width: f.width,
      height: f.height
    }), le(e, fe), _e(n, fe);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, i = this.options.viewMode, n = Math.abs(t.rotate) % 180 === 90, o = n ? t.naturalHeight : t.naturalWidth, s = n ? t.naturalWidth : t.naturalHeight, f = o / s, p = e.width, m = e.height;
    e.height * f > e.width ? i === 3 ? p = e.height * f : m = e.width / f : i === 3 ? m = e.width / f : p = e.height * f;
    var u = {
      aspectRatio: f,
      naturalWidth: o,
      naturalHeight: s,
      width: p,
      height: m
    };
    this.canvasData = u, this.limited = i === 1 || i === 2, this.limitCanvas(!0, !0), u.width = Math.min(Math.max(u.width, u.minWidth), u.maxWidth), u.height = Math.min(Math.max(u.height, u.minHeight), u.maxHeight), u.left = (e.width - u.width) / 2, u.top = (e.height - u.height) / 2, u.oldLeft = u.left, u.oldTop = u.top, this.initialCanvasData = re({}, u);
  },
  limitCanvas: function(e, t) {
    var i = this.options, n = this.containerData, o = this.canvasData, s = this.cropBoxData, f = i.viewMode, p = o.aspectRatio, m = this.cropped && s;
    if (e) {
      var u = Number(i.minCanvasWidth) || 0, v = Number(i.minCanvasHeight) || 0;
      f > 1 ? (u = Math.max(u, n.width), v = Math.max(v, n.height), f === 3 && (v * p > u ? u = v * p : v = u / p)) : f > 0 && (u ? u = Math.max(u, m ? s.width : 0) : v ? v = Math.max(v, m ? s.height : 0) : m && (u = s.width, v = s.height, v * p > u ? u = v * p : v = u / p));
      var b = Te({
        aspectRatio: p,
        width: u,
        height: v
      });
      u = b.width, v = b.height, o.minWidth = u, o.minHeight = v, o.maxWidth = 1 / 0, o.maxHeight = 1 / 0;
    }
    if (t)
      if (f > (m ? 0 : 1)) {
        var T = n.width - o.width, k = n.height - o.height;
        o.minLeft = Math.min(0, T), o.minTop = Math.min(0, k), o.maxLeft = Math.max(0, T), o.maxTop = Math.max(0, k), m && this.limited && (o.minLeft = Math.min(s.left, s.left + (s.width - o.width)), o.minTop = Math.min(s.top, s.top + (s.height - o.height)), o.maxLeft = s.left, o.maxTop = s.top, f === 2 && (o.width >= n.width && (o.minLeft = Math.min(0, T), o.maxLeft = Math.max(0, T)), o.height >= n.height && (o.minTop = Math.min(0, k), o.maxTop = Math.max(0, k))));
      } else
        o.minLeft = -o.width, o.minTop = -o.height, o.maxLeft = n.width, o.maxTop = n.height;
  },
  renderCanvas: function(e, t) {
    var i = this.canvasData, n = this.imageData;
    if (t) {
      var o = fl({
        width: n.naturalWidth * Math.abs(n.scaleX || 1),
        height: n.naturalHeight * Math.abs(n.scaleY || 1),
        degree: n.rotate || 0
      }), s = o.width, f = o.height, p = i.width * (s / i.naturalWidth), m = i.height * (f / i.naturalHeight);
      i.left -= (p - i.width) / 2, i.top -= (m - i.height) / 2, i.width = p, i.height = m, i.aspectRatio = s / f, i.naturalWidth = s, i.naturalHeight = f, this.limitCanvas(!0, !1);
    }
    (i.width > i.maxWidth || i.width < i.minWidth) && (i.left = i.oldLeft), (i.height > i.maxHeight || i.height < i.minHeight) && (i.top = i.oldTop), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), this.limitCanvas(!1, !0), i.left = Math.min(Math.max(i.left, i.minLeft), i.maxLeft), i.top = Math.min(Math.max(i.top, i.minTop), i.maxTop), i.oldLeft = i.left, i.oldTop = i.top, Ee(this.canvas, re({
      width: i.width,
      height: i.height
    }, tt({
      translateX: i.left,
      translateY: i.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, i = this.imageData, n = i.naturalWidth * (t.width / t.naturalWidth), o = i.naturalHeight * (t.height / t.naturalHeight);
    re(i, {
      width: n,
      height: o,
      left: (t.width - n) / 2,
      top: (t.height - o) / 2
    }), Ee(this.image, re({
      width: i.width,
      height: i.height
    }, tt(re({
      translateX: i.left,
      translateY: i.top
    }, i)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, i = e.aspectRatio || e.initialAspectRatio, n = Number(e.autoCropArea) || 0.8, o = {
      width: t.width,
      height: t.height
    };
    i && (t.height * i > t.width ? o.height = o.width / i : o.width = o.height * i), this.cropBoxData = o, this.limitCropBox(!0, !0), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), o.width = Math.max(o.minWidth, o.width * n), o.height = Math.max(o.minHeight, o.height * n), o.left = t.left + (t.width - o.width) / 2, o.top = t.top + (t.height - o.height) / 2, o.oldLeft = o.left, o.oldTop = o.top, this.initialCropBoxData = re({}, o);
  },
  limitCropBox: function(e, t) {
    var i = this.options, n = this.containerData, o = this.canvasData, s = this.cropBoxData, f = this.limited, p = i.aspectRatio;
    if (e) {
      var m = Number(i.minCropBoxWidth) || 0, u = Number(i.minCropBoxHeight) || 0, v = f ? Math.min(n.width, o.width, o.width + o.left, n.width - o.left) : n.width, b = f ? Math.min(n.height, o.height, o.height + o.top, n.height - o.top) : n.height;
      m = Math.min(m, n.width), u = Math.min(u, n.height), p && (m && u ? u * p > m ? u = m / p : m = u * p : m ? u = m / p : u && (m = u * p), b * p > v ? b = v / p : v = b * p), s.minWidth = Math.min(m, v), s.minHeight = Math.min(u, b), s.maxWidth = v, s.maxHeight = b;
    }
    t && (f ? (s.minLeft = Math.max(0, o.left), s.minTop = Math.max(0, o.top), s.maxLeft = Math.min(n.width, o.left + o.width) - s.width, s.maxTop = Math.min(n.height, o.top + o.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = n.width - s.width, s.maxTop = n.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, i = this.cropBoxData;
    (i.width > i.maxWidth || i.width < i.minWidth) && (i.left = i.oldLeft), (i.height > i.maxHeight || i.height < i.minHeight) && (i.top = i.oldTop), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), this.limitCropBox(!1, !0), i.left = Math.min(Math.max(i.left, i.minLeft), i.maxLeft), i.top = Math.min(Math.max(i.top, i.minTop), i.maxTop), i.oldLeft = i.left, i.oldTop = i.top, e.movable && e.cropBoxMovable && it(this.face, rt, i.width >= t.width && i.height >= t.height ? Nr : Rt), Ee(this.cropBox, re({
      width: i.width,
      height: i.height
    }, tt({
      translateX: i.left,
      translateY: i.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ke(this.element, Pt, this.getData());
  }
}, _l = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, i = this.options.preview, n = t ? this.crossOriginUrl : this.url, o = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = n, s.alt = o, this.viewBox.appendChild(s), this.viewBoxImage = s, !!i) {
      var f = i;
      typeof i == "string" ? f = e.ownerDocument.querySelectorAll(i) : i.querySelector && (f = [i]), this.previews = f, ne(f, function(p) {
        var m = document.createElement("img");
        it(p, ut, {
          width: p.offsetWidth,
          height: p.offsetHeight,
          html: p.innerHTML
        }), t && (m.crossOrigin = t), m.src = n, m.alt = o, m.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', p.innerHTML = "", p.appendChild(m);
      });
    }
  },
  resetPreview: function() {
    ne(this.previews, function(e) {
      var t = Vt(e, ut);
      Ee(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, cl(e, ut);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, i = this.cropBoxData, n = i.width, o = i.height, s = e.width, f = e.height, p = i.left - t.left - e.left, m = i.top - t.top - e.top;
    !this.cropped || this.disabled || (Ee(this.viewBoxImage, re({
      width: s,
      height: f
    }, tt(re({
      translateX: -p,
      translateY: -m
    }, e)))), ne(this.previews, function(u) {
      var v = Vt(u, ut), b = v.width, T = v.height, k = b, D = T, N = 1;
      n && (N = b / n, D = o * N), o && D > T && (N = T / o, k = n * N, D = T), Ee(u, {
        width: k,
        height: D
      }), Ee(u.getElementsByTagName("img")[0], re({
        width: s * N,
        height: f * N
      }, tt(re({
        translateX: -p * N,
        translateY: -m * N
      }, e))));
    }));
  }
}, kl = {
  bind: function() {
    var e = this.element, t = this.options, i = this.cropper;
    he(t.cropstart) && ge(e, Nt, t.cropstart), he(t.cropmove) && ge(e, Lt, t.cropmove), he(t.cropend) && ge(e, It, t.cropend), he(t.crop) && ge(e, Pt, t.crop), he(t.zoom) && ge(e, jt, t.zoom), ge(i, vr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ge(i, _r, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ge(i, gr, this.onDblclick = this.dblclick.bind(this)), ge(e.ownerDocument, br, this.onCropMove = this.cropMove.bind(this)), ge(e.ownerDocument, yr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ge(window, xr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, i = this.cropper;
    he(t.cropstart) && ye(e, Nt, t.cropstart), he(t.cropmove) && ye(e, Lt, t.cropmove), he(t.cropend) && ye(e, It, t.cropend), he(t.crop) && ye(e, Pt, t.crop), he(t.zoom) && ye(e, jt, t.zoom), ye(i, vr, this.onCropStart), t.zoomable && t.zoomOnWheel && ye(i, _r, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ye(i, gr, this.onDblclick), ye(e.ownerDocument, br, this.onCropMove), ye(e.ownerDocument, yr, this.onCropEnd), t.responsive && ye(window, xr, this.onResize);
  }
}, Sl = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, i = this.containerData, n = t.offsetWidth / i.width, o = t.offsetHeight / i.height, s = Math.abs(n - 1) > Math.abs(o - 1) ? n : o;
      if (s !== 1) {
        var f, p;
        e.restore && (f = this.getCanvasData(), p = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(ne(f, function(m, u) {
          f[u] = m * s;
        })), this.setCropBoxData(ne(p, function(m, u) {
          p[u] = m * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === zr || this.setDragMode(sl(this.dragBox, At) ? Vr : Ht);
  },
  wheel: function(e) {
    var t = this, i = Number(this.options.wheelZoomRatio) || 0.1, n = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? n = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? n = -e.wheelDelta / 120 : e.detail && (n = e.detail > 0 ? 1 : -1), this.zoom(-n * i, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, i = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (X(t) && t !== 1 || X(i) && i !== 0 || e.ctrlKey))) {
      var n = this.options, o = this.pointers, s;
      e.changedTouches ? ne(e.changedTouches, function(f) {
        o[f.identifier] = dt(f);
      }) : o[e.pointerId || 0] = dt(e), Object.keys(o).length > 1 && n.zoomable && n.zoomOnTouch ? s = jr : s = Vt(e.target, rt), !!Js.test(s) && Ke(this.element, Nt, {
        originalEvent: e,
        action: s
      }) !== !1 && (e.preventDefault(), this.action = s, this.cropping = !1, s === Lr && (this.cropping = !0, le(this.dragBox, gt)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var i = this.pointers;
      e.preventDefault(), Ke(this.element, Lt, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? ne(e.changedTouches, function(n) {
        re(i[n.identifier] || {}, dt(n, !0));
      }) : re(i[e.pointerId || 0] || {}, dt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, i = this.pointers;
      e.changedTouches ? ne(e.changedTouches, function(n) {
        delete i[n.identifier];
      }) : delete i[e.pointerId || 0], t && (e.preventDefault(), Object.keys(i).length || (this.action = ""), this.cropping && (this.cropping = !1, He(this.dragBox, gt, this.cropped && this.options.modal)), Ke(this.element, It, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, Dl = {
  change: function(e) {
    var t = this.options, i = this.canvasData, n = this.containerData, o = this.cropBoxData, s = this.pointers, f = this.action, p = t.aspectRatio, m = o.left, u = o.top, v = o.width, b = o.height, T = m + v, k = u + b, D = 0, N = 0, Y = n.width, R = n.height, A = !0, U;
    !p && e.shiftKey && (p = v && b ? v / b : 1), this.limited && (D = o.minLeft, N = o.minTop, Y = D + Math.min(n.width, i.width, i.left + i.width), R = N + Math.min(n.height, i.height, i.top + i.height));
    var F = s[Object.keys(s)[0]], $ = {
      x: F.endX - F.startX,
      y: F.endY - F.startY
    }, q = function(ue) {
      switch (ue) {
        case Ae:
          T + $.x > Y && ($.x = Y - T);
          break;
        case Oe:
          m + $.x < D && ($.x = D - m);
          break;
        case Me:
          u + $.y < N && ($.y = N - u);
          break;
        case Be:
          k + $.y > R && ($.y = R - k);
          break;
      }
    };
    switch (f) {
      case Rt:
        m += $.x, u += $.y;
        break;
      case Ae:
        if ($.x >= 0 && (T >= Y || p && (u <= N || k >= R))) {
          A = !1;
          break;
        }
        q(Ae), v += $.x, v < 0 && (f = Oe, v = -v, m -= v), p && (b = v / p, u += (o.height - b) / 2);
        break;
      case Me:
        if ($.y <= 0 && (u <= N || p && (m <= D || T >= Y))) {
          A = !1;
          break;
        }
        q(Me), b -= $.y, u += $.y, b < 0 && (f = Be, b = -b, u -= b), p && (v = b * p, m += (o.width - v) / 2);
        break;
      case Oe:
        if ($.x <= 0 && (m <= D || p && (u <= N || k >= R))) {
          A = !1;
          break;
        }
        q(Oe), v -= $.x, m += $.x, v < 0 && (f = Ae, v = -v, m -= v), p && (b = v / p, u += (o.height - b) / 2);
        break;
      case Be:
        if ($.y >= 0 && (k >= R || p && (m <= D || T >= Y))) {
          A = !1;
          break;
        }
        q(Be), b += $.y, b < 0 && (f = Me, b = -b, u -= b), p && (v = b * p, m += (o.width - v) / 2);
        break;
      case Je:
        if (p) {
          if ($.y <= 0 && (u <= N || T >= Y)) {
            A = !1;
            break;
          }
          q(Me), b -= $.y, u += $.y, v = b * p;
        } else
          q(Me), q(Ae), $.x >= 0 ? T < Y ? v += $.x : $.y <= 0 && u <= N && (A = !1) : v += $.x, $.y <= 0 ? u > N && (b -= $.y, u += $.y) : (b -= $.y, u += $.y);
        v < 0 && b < 0 ? (f = et, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = Ze, v = -v, m -= v) : b < 0 && (f = Qe, b = -b, u -= b);
        break;
      case Ze:
        if (p) {
          if ($.y <= 0 && (u <= N || m <= D)) {
            A = !1;
            break;
          }
          q(Me), b -= $.y, u += $.y, v = b * p, m += o.width - v;
        } else
          q(Me), q(Oe), $.x <= 0 ? m > D ? (v -= $.x, m += $.x) : $.y <= 0 && u <= N && (A = !1) : (v -= $.x, m += $.x), $.y <= 0 ? u > N && (b -= $.y, u += $.y) : (b -= $.y, u += $.y);
        v < 0 && b < 0 ? (f = Qe, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = Je, v = -v, m -= v) : b < 0 && (f = et, b = -b, u -= b);
        break;
      case et:
        if (p) {
          if ($.x <= 0 && (m <= D || k >= R)) {
            A = !1;
            break;
          }
          q(Oe), v -= $.x, m += $.x, b = v / p;
        } else
          q(Be), q(Oe), $.x <= 0 ? m > D ? (v -= $.x, m += $.x) : $.y >= 0 && k >= R && (A = !1) : (v -= $.x, m += $.x), $.y >= 0 ? k < R && (b += $.y) : b += $.y;
        v < 0 && b < 0 ? (f = Je, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = Qe, v = -v, m -= v) : b < 0 && (f = Ze, b = -b, u -= b);
        break;
      case Qe:
        if (p) {
          if ($.x >= 0 && (T >= Y || k >= R)) {
            A = !1;
            break;
          }
          q(Ae), v += $.x, b = v / p;
        } else
          q(Be), q(Ae), $.x >= 0 ? T < Y ? v += $.x : $.y >= 0 && k >= R && (A = !1) : v += $.x, $.y >= 0 ? k < R && (b += $.y) : b += $.y;
        v < 0 && b < 0 ? (f = Ze, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = et, v = -v, m -= v) : b < 0 && (f = Je, b = -b, u -= b);
        break;
      case Nr:
        this.move($.x, $.y), A = !1;
        break;
      case jr:
        this.zoom(dl(s), e), A = !1;
        break;
      case Lr:
        if (!$.x || !$.y) {
          A = !1;
          break;
        }
        U = Yr(this.cropper), m = F.startX - U.left, u = F.startY - U.top, v = o.minWidth, b = o.minHeight, $.x > 0 ? f = $.y > 0 ? Qe : Je : $.x < 0 && (m -= v, f = $.y > 0 ? et : Ze), $.y < 0 && (u -= b), this.cropped || (_e(this.cropBox, fe), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    A && (o.width = v, o.height = b, o.left = m, o.top = u, this.action = f, this.renderCropBox()), ne(s, function(ee) {
      ee.startX = ee.endX, ee.startY = ee.endY;
    });
  }
}, Cl = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && le(this.dragBox, gt), _e(this.cropBox, fe), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = re({}, this.initialImageData), this.canvasData = re({}, this.initialCanvasData), this.cropBoxData = re({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (re(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), _e(this.dragBox, gt), le(this.cropBox, fe)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, ne(this.previews, function(i) {
      i.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, _e(this.cropper, mr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, le(this.cropper, mr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[te] ? (e[te] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.canvasData, n = i.left, o = i.top;
    return this.moveTo(St(e) ? e : n + Number(e), St(t) ? t : o + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.canvasData, n = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (X(e) && (i.left = e, n = !0), X(t) && (i.top = t, n = !0), n && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var i = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(i.width * e / i.naturalWidth, null, t);
  },
  zoomTo: function(e, t, i) {
    var n = this.options, o = this.canvasData, s = o.width, f = o.height, p = o.naturalWidth, m = o.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && n.zoomable) {
      var u = p * e, v = m * e;
      if (Ke(this.element, jt, {
        ratio: e,
        oldRatio: s / p,
        originalEvent: i
      }) === !1)
        return this;
      if (i) {
        var b = this.pointers, T = Yr(this.cropper), k = b && Object.keys(b).length ? hl(b) : {
          pageX: i.pageX,
          pageY: i.pageY
        };
        o.left -= (u - s) * ((k.pageX - T.left - o.left) / s), o.top -= (v - f) * ((k.pageY - T.top - o.top) / f);
      } else
        Re(t) && X(t.x) && X(t.y) ? (o.left -= (u - s) * ((t.x - o.left) / s), o.top -= (v - f) * ((t.y - o.top) / f)) : (o.left -= (u - s) / 2, o.top -= (v - f) / 2);
      o.width = u, o.height = v, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), X(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, X(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(X(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.imageData, n = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (X(e) && (i.scaleX = e, n = !0), X(t) && (i.scaleY = t, n = !0), n && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, i = this.imageData, n = this.canvasData, o = this.cropBoxData, s;
    if (this.ready && this.cropped) {
      s = {
        x: o.left - n.left,
        y: o.top - n.top,
        width: o.width,
        height: o.height
      };
      var f = i.width / i.naturalWidth;
      if (ne(s, function(u, v) {
        s[v] = u / f;
      }), e) {
        var p = Math.round(s.y + s.height), m = Math.round(s.x + s.width);
        s.x = Math.round(s.x), s.y = Math.round(s.y), s.width = m - s.x, s.height = p - s.y;
      }
    } else
      s = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (s.rotate = i.rotate || 0), t.scalable && (s.scaleX = i.scaleX || 1, s.scaleY = i.scaleY || 1), s;
  },
  setData: function(e) {
    var t = this.options, i = this.imageData, n = this.canvasData, o = {};
    if (this.ready && !this.disabled && Re(e)) {
      var s = !1;
      t.rotatable && X(e.rotate) && e.rotate !== i.rotate && (i.rotate = e.rotate, s = !0), t.scalable && (X(e.scaleX) && e.scaleX !== i.scaleX && (i.scaleX = e.scaleX, s = !0), X(e.scaleY) && e.scaleY !== i.scaleY && (i.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var f = i.width / i.naturalWidth;
      X(e.x) && (o.left = e.x * f + n.left), X(e.y) && (o.top = e.y * f + n.top), X(e.width) && (o.width = e.width * f), X(e.height) && (o.height = e.height * f), this.setCropBoxData(o);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? re({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? re({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && ne(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(i) {
      t[i] = e[i];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, i = t.aspectRatio;
    return this.ready && !this.disabled && Re(e) && (X(e.left) && (t.left = e.left), X(e.top) && (t.top = e.top), X(e.width) ? (t.width = e.width, t.height = e.width / i) : X(e.height) && (t.height = e.height, t.width = e.height * i), this.renderCanvas(!0)), this;
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
    var t = this.cropBoxData, i = this.options.aspectRatio, n, o;
    return this.ready && this.cropped && !this.disabled && Re(e) && (X(e.left) && (t.left = e.left), X(e.top) && (t.top = e.top), X(e.width) && e.width !== t.width && (n = !0, t.width = e.width), X(e.height) && e.height !== t.height && (o = !0, t.height = e.height), i && (n ? t.height = t.width / i : o && (t.width = t.height * i)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, i = ml(this.image, this.imageData, t, e);
    if (!this.cropped)
      return i;
    var n = this.getData(), o = n.x, s = n.y, f = n.width, p = n.height, m = i.width / Math.floor(t.naturalWidth);
    m !== 1 && (o *= m, s *= m, f *= m, p *= m);
    var u = f / p, v = Te({
      aspectRatio: u,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Te({
      aspectRatio: u,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), T = Te({
      aspectRatio: u,
      width: e.width || (m !== 1 ? i.width : f),
      height: e.height || (m !== 1 ? i.height : p)
    }), k = T.width, D = T.height;
    k = Math.min(v.width, Math.max(b.width, k)), D = Math.min(v.height, Math.max(b.height, D));
    var N = document.createElement("canvas"), Y = N.getContext("2d");
    N.width = Ue(k), N.height = Ue(D), Y.fillStyle = e.fillColor || "transparent", Y.fillRect(0, 0, k, D);
    var R = e.imageSmoothingEnabled, A = R === void 0 ? !0 : R, U = e.imageSmoothingQuality;
    Y.imageSmoothingEnabled = A, U && (Y.imageSmoothingQuality = U);
    var F = i.width, $ = i.height, q = o, ee = s, ue, me, L, B, j, W;
    q <= -f || q > F ? (q = 0, ue = 0, L = 0, j = 0) : q <= 0 ? (L = -q, q = 0, ue = Math.min(F, f + q), j = ue) : q <= F && (L = 0, ue = Math.min(f, F - q), j = ue), ue <= 0 || ee <= -p || ee > $ ? (ee = 0, me = 0, B = 0, W = 0) : ee <= 0 ? (B = -ee, ee = 0, me = Math.min($, p + ee), W = me) : ee <= $ && (B = 0, me = Math.min(p, $ - ee), W = me);
    var H = [q, ee, ue, me];
    if (j > 0 && W > 0) {
      var oe = k / f;
      H.push(L * oe, B * oe, j * oe, W * oe);
    }
    return Y.drawImage.apply(Y, [i].concat(Ir(H.map(function(Q) {
      return Math.floor(Ue(Q));
    })))), N;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !St(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, i = this.dragBox, n = this.face;
    if (this.ready && !this.disabled) {
      var o = e === Ht, s = t.movable && e === Vr;
      e = o || s ? e : zr, t.dragMode = e, it(i, rt, e), He(i, At, o), He(i, Ot, s), t.cropBoxMovable || (it(n, rt, e), He(n, At, o), He(n, Ot, s));
    }
    return this;
  }
}, $l = ke.Cropper, Xr = /* @__PURE__ */ function() {
  function a(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Bs(this, a), !e || !el.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = re({}, Sr, Re(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return Rs(a, [{
    key: "init",
    value: function() {
      var t = this.element, i = t.tagName.toLowerCase(), n;
      if (!t[te]) {
        if (t[te] = this, i === "img") {
          if (this.isImg = !0, n = t.getAttribute("src") || "", this.originalUrl = n, !n)
            return;
          n = t.src;
        } else
          i === "canvas" && window.HTMLCanvasElement && (n = t.toDataURL());
        this.load(n);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var i = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var n = this.element, o = this.options;
        if (!o.rotatable && !o.scalable && (o.checkOrientation = !1), !o.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (Zs.test(t)) {
          Qs.test(t) ? this.read(vl(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = f, s.onerror = f, s.ontimeout = f, s.onprogress = function() {
          s.getResponseHeader("content-type") !== kr && s.abort();
        }, s.onload = function() {
          i.read(s.response);
        }, s.onloadend = function() {
          i.reloading = !1, i.xhr = null;
        }, o.checkCrossOrigin && Cr(t) && n.crossOrigin && (t = $r(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = n.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var i = this.options, n = this.imageData, o = yl(t), s = 0, f = 1, p = 1;
      if (o > 1) {
        this.url = bl(t, kr);
        var m = wl(o);
        s = m.rotate, f = m.scaleX, p = m.scaleY;
      }
      i.rotatable && (n.rotate = s), i.scalable && (n.scaleX = f, n.scaleY = p), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, i = this.url, n = t.crossOrigin, o = i;
      this.options.checkCrossOrigin && Cr(i) && (n || (n = "anonymous"), o = $r(i)), this.crossOrigin = n, this.crossOriginUrl = o;
      var s = document.createElement("img");
      n && (s.crossOrigin = n), s.src = o || i, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), le(s, pr), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, i = this.image;
      i.onload = null, i.onerror = null, this.sizing = !0;
      var n = ke.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(ke.navigator.userAgent), o = function(m, u) {
        re(t.imageData, {
          naturalWidth: m,
          naturalHeight: u,
          aspectRatio: m / u
        }), t.initialImageData = re({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (i.naturalWidth && !n) {
        o(i.naturalWidth, i.naturalHeight);
        return;
      }
      var s = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = s, s.onload = function() {
        o(s.width, s.height), n || f.removeChild(s);
      }, s.src = i.src, n || (s.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(s));
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
        var t = this.element, i = this.options, n = this.image, o = t.parentNode, s = document.createElement("div");
        s.innerHTML = tl;
        var f = s.querySelector(".".concat(te, "-container")), p = f.querySelector(".".concat(te, "-canvas")), m = f.querySelector(".".concat(te, "-drag-box")), u = f.querySelector(".".concat(te, "-crop-box")), v = u.querySelector(".".concat(te, "-face"));
        this.container = o, this.cropper = f, this.canvas = p, this.dragBox = m, this.cropBox = u, this.viewBox = f.querySelector(".".concat(te, "-view-box")), this.face = v, p.appendChild(n), le(t, fe), o.insertBefore(f, t.nextSibling), this.isImg || _e(n, pr), this.initPreview(), this.bind(), i.initialAspectRatio = Math.max(0, i.initialAspectRatio) || NaN, i.aspectRatio = Math.max(0, i.aspectRatio) || NaN, i.viewMode = Math.max(0, Math.min(3, Math.round(i.viewMode))) || 0, le(u, fe), i.guides || le(u.getElementsByClassName("".concat(te, "-dashed")), fe), i.center || le(u.getElementsByClassName("".concat(te, "-center")), fe), i.background && le(f, "".concat(te, "-bg")), i.highlight || le(v, Xs), i.cropBoxMovable && (le(v, Ot), it(v, rt, Rt)), i.cropBoxResizable || (le(u.getElementsByClassName("".concat(te, "-line")), fe), le(u.getElementsByClassName("".concat(te, "-point")), fe)), this.render(), this.ready = !0, this.setDragMode(i.dragMode), i.autoCrop && this.crop(), this.setData(i.data), he(i.ready) && ge(t, wr, i.ready, {
          once: !0
        }), Ke(t, wr);
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
      return window.Cropper = $l, a;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      re(Sr, Re(t) && t);
    }
  }]), a;
}();
re(Xr.prototype, xl, _l, kl, Sl, Dl, Cl);
const Ml = { class: "flex" }, El = ["aria-label"], Tl = { class: "ml-auto mb-2" }, Al = { class: "w-full flex justify-center" }, Ol = ["src"], Pl = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { t: i } = z("i18n"), { apiUrl: n } = Se(), o = I(null), s = I(null), f = I(!1), p = I(""), m = I(!1), u = () => {
      f.value = !f.value, f.value ? s.value = new Xr(o.value, {
        crop(T) {
        }
      }) : s.value.destroy();
    }, v = z("postData"), b = () => {
      s.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (T) => {
          p.value = "", m.value = !1, pt(n.value, {
            method: "POST",
            params: Object.assign(v, {
              q: "upload",
              adapter: t.selection.adapter,
              path: t.selection.item.path,
              file: T
            }),
            name: t.selection.item.basename,
            json: !1
          }).then((k) => {
            p.value = i("Updated."), o.value.src = Et(t.selection.adapter, t.selection.item.path), u(), e("load");
          }).catch((k) => {
            p.value = i(k.message), m.value = !0;
          });
        }
      );
    };
    return xe(() => {
      e("load");
    }), (T, k) => (y(), C(ce, null, [
      d("div", Ml, [
        d("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(a.selection.item.basename), 9, El),
        d("div", Tl, [
          f.value ? (y(), C("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(x(i)("Crop")), 1)) : G("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: k[0] || (k[0] = (D) => u())
          }, E(f.value ? x(i)("Cancel") : x(i)("Edit")), 1)
        ])
      ]),
      d("div", Al, [
        d("img", {
          ref_key: "image",
          ref: o,
          class: "max-w-[60vh] max-h-[60vh]",
          src: x(Et)(t.selection.adapter, t.selection.item.path),
          alt: ""
        }, null, 8, Ol)
      ]),
      p.value.length ? (y(), Z(Ce, {
        key: 0,
        onHidden: k[1] || (k[1] = (D) => p.value = ""),
        error: m.value
      }, {
        default: J(() => [
          se(E(p.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : G("", !0)
    ], 64));
  }
}, Il = { class: "flex" }, Ll = ["aria-label"], Nl = /* @__PURE__ */ d("div", null, null, -1), jl = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    return xe(() => {
      e("load");
    }), (t, i) => (y(), C(ce, null, [
      d("div", Il, [
        d("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(a.selection.item.basename), 9, Ll)
      ]),
      Nl
    ], 64));
  }
}, Vl = ["aria-label"], zl = {
  class: "w-full",
  preload: "",
  controls: ""
}, Bl = ["src"], Rl = /* @__PURE__ */ se(" Your browser does not support the video tag. "), Hl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (o, s) => (y(), C(ce, null, [
      d("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(a.selection.item.basename), 9, Vl),
      d("div", null, [
        d("video", zl, [
          d("source", {
            src: n(),
            type: "video/mp4"
          }, null, 8, Bl),
          Rl
        ])
      ])
    ], 64));
  }
}, Ul = ["aria-label"], Kl = {
  class: "w-full",
  controls: ""
}, Yl = ["src"], Wl = /* @__PURE__ */ se(" Your browser does not support the audio element. "), Xl = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (o, s) => (y(), C(ce, null, [
      d("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(a.selection.item.basename), 9, Ul),
      d("div", null, [
        d("audio", Kl, [
          d("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, Yl),
          Wl
        ])
      ])
    ], 64));
  }
}, Fl = ["aria-label"], ql = ["data"], Gl = ["src"], Jl = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(a, { emit: e }) {
    const t = a, { apiUrl: i } = Se(), n = () => i.value + "?" + Le({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return xe(() => {
      e("load");
    }), (o, s) => (y(), C(ce, null, [
      d("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(a.selection.item.basename), 9, Fl),
      d("div", null, [
        d("object", {
          class: "h-[60vh]",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
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
        `, 8, Gl)
        ], 8, ql)
      ])
    ], 64));
  }
}, Zl = { class: "sm:flex sm:items-start" }, Ql = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, ec = { class: "text-gray-700 dark:text-gray-200 text-sm" }, tc = {
  key: 0,
  class: "flex leading-5"
}, rc = /* @__PURE__ */ d("svg", {
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
], -1), ic = { class: "p-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, oc = { class: "font-bold pl-2" }, ac = { class: "font-bold pl-2" }, nc = {
  name: "VFModalPreview"
}, sc = /* @__PURE__ */ Object.assign(nc, {
  props: {
    selection: Object
  },
  setup(a) {
    const e = a, { apiUrl: t } = Se(), i = z("emitter"), { t: n } = z("i18n"), o = I(!1), s = (m) => o.value = m, f = (m) => {
      var u;
      return ((u = e.selection.item.mime_type) != null ? u : "").startsWith(m);
    }, p = () => {
      const m = t.value + "?" + Le({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      i.emit("vf-download", m);
    };
    return (m, u) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: u[6] || (u[6] = (v) => x(i).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Close")), 1),
        d("button", {
          type: "button",
          onClick: u[7] || (u[7] = (v) => p()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Download")), 1)
      ]),
      default: J(() => [
        d("div", Zl, [
          d("div", Ql, [
            d("div", null, [
              f("text") ? (y(), Z(zs, {
                key: 0,
                selection: a.selection,
                onLoad: u[0] || (u[0] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("image") ? (y(), Z(Pl, {
                key: 1,
                selection: a.selection,
                onLoad: u[1] || (u[1] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("video") ? (y(), Z(Hl, {
                key: 2,
                selection: a.selection,
                onLoad: u[2] || (u[2] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("audio") ? (y(), Z(Xl, {
                key: 3,
                selection: a.selection,
                onLoad: u[3] || (u[3] = (v) => s(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (y(), Z(Jl, {
                key: 4,
                selection: a.selection,
                onLoad: u[4] || (u[4] = (v) => s(!0))
              }, null, 8, ["selection"])) : (y(), Z(jl, {
                key: 5,
                selection: a.selection,
                onLoad: u[5] || (u[5] = (v) => s(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", ec, [
              o.value == !1 ? (y(), C("div", tc, [
                rc,
                d("span", null, E(x(n)("Loading")), 1)
              ])) : G("", !0)
            ])
          ])
        ]),
        d("div", ic, [
          d("div", null, [
            d("span", oc, E(x(n)("File Size")) + ": ", 1),
            se(E(x(Ar)(a.selection.item.file_size)), 1)
          ]),
          d("div", null, [
            d("span", ac, E(x(n)("Last Modified")) + ": ", 1),
            se(" " + E(x(Or)(a.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lc = { class: "sm:flex sm:items-start" }, cc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), uc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, dc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, hc = { class: "mt-2" }, fc = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, mc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), gc = [
  pc
], vc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), yc = [
  bc
], wc = { class: "ml-1.5" }, xc = ["onKeyup"], _c = {
  name: "VFModalRename"
}, kc = /* @__PURE__ */ Object.assign(_c, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(e.selection.items[0]), s = I(e.selection.items[0].basename), f = I(""), p = () => {
      s.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          item: o.value.path,
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
    return (m, u) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: u[2] || (u[2] = (v) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", lc, [
          cc,
          d("div", uc, [
            d("h3", dc, E(x(n)("Rename")), 1),
            d("div", hc, [
              d("p", fc, [
                o.value.type == "dir" ? (y(), C("svg", mc, gc)) : (y(), C("svg", vc, yc)),
                d("span", wc, E(o.value.basename), 1)
              ]),
              ve(d("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (v) => s.value = v),
                onKeyup: Ye(p, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, xc), [
                [We, s.value]
              ]),
              f.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: u[1] || (u[1] = (v) => f.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(f.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Sc = { class: "sm:flex sm:items-start" }, Dc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Cc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, $c = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Mc = { class: "mt-2" }, Ec = { class: "text-gray-500 mb-1" }, Tc = ["id"], Ac = {
  key: 0,
  class: "py-2"
}, Oc = ["disabled", "onClick"], Pc = {
  name: "VFModalUpload"
}, Ic = /* @__PURE__ */ Object.assign(Pc, {
  props: {
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { apiUrl: i } = Se(), { t: n } = z("i18n"), o = I(null), s = I(null), f = I(null), p = I([]), m = I(""), u = I(!0), v = () => {
      m.value = "", o.value.start();
    }, b = z("postData");
    return xe(() => {
      o.value = new kt.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: s.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: i.value + "?" + Le(Object.assign(b, { q: "upload", adapter: e.current.adapter, path: e.current.dirname })),
        headers: {
          ...mt && { "X-CSRF-Token": mt }
        },
        init: {
          PostInit: function() {
          },
          FilesAdded: function(T, k) {
            u.value = !1, kt.each(k, function(D) {
              p.value.push({
                id: D.id,
                name: D.name,
                size: kt.formatSize(D.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(T, k) {
            p.value[p.value.findIndex((D) => D.id == k.id)].percent = k.percent + "%";
          },
          UploadComplete: function() {
            u.value = !0, t.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(T, k) {
            o.value.stop(), m.value = n(JSON.parse(k.response).message);
          }
        }
      }), o.value.init();
    }), (T, k) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          disabled: u.value,
          onClick: Pe(v, ["prevent"]),
          type: "button",
          class: de([u.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, E(x(n)("Upload")), 11, Oc),
        d("button", {
          type: "button",
          onClick: k[1] || (k[1] = (D) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Sc, [
          Dc,
          d("div", Cc, [
            d("h3", $c, E(x(n)("Upload files")), 1),
            d("div", Mc, [
              d("div", Ec, [
                (y(!0), C(ce, null, be(p.value, (D) => (y(), C("div", null, [
                  d("div", {
                    id: D.id
                  }, [
                    se(E(D.name) + " ( " + E(D.size) + ") ", 1),
                    d("b", null, E(D.percent), 1)
                  ], 8, Tc)
                ]))), 256)),
                p.value.length ? G("", !0) : (y(), C("div", Ac, E(x(n)("No files selected!")), 1))
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
                }, E(x(n)("Select Files")), 513)
              ], 512),
              m.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: k[0] || (k[0] = (D) => m.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(m.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lc = { class: "sm:flex sm:items-start" }, Nc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), jc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Vc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, zc = { class: "mt-2" }, Bc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Rc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Uc = [
  Hc
], Kc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Wc = [
  Yc
], Xc = { class: "ml-1.5" }, Fc = ["onKeyup", "placeholder"], qc = {
  name: "VFModalArchive"
}, Gc = /* @__PURE__ */ Object.assign(qc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n"), o = I(""), s = I(""), f = I(e.selection.items), p = () => {
      f.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: m, type: u }) => ({ path: m, type: u }))),
          name: o.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, u) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: u[2] || (u[2] = (v) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Lc, [
          Nc,
          d("div", jc, [
            d("h3", Vc, E(x(n)("Archive the files")), 1),
            d("div", zc, [
              (y(!0), C(ce, null, be(f.value, (v) => (y(), C("p", Bc, [
                v.type == "dir" ? (y(), C("svg", Rc, Uc)) : (y(), C("svg", Kc, Wc)),
                d("span", Xc, E(v.basename), 1)
              ]))), 256)),
              ve(d("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (v) => o.value = v),
                onKeyup: Ye(p, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Fc), [
                [We, o.value]
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: u[1] || (u[1] = (v) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Jc = { class: "sm:flex sm:items-start" }, Zc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Qc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, eu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, tu = { class: "mt-2" }, ru = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, iu = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ou = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), au = [
  ou
], nu = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, su = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), lu = [
  su
], cu = { class: "ml-1.5" }, uu = { class: "my-1 text-sm text-gray-500" }, du = {
  name: "VFModalUnarchive"
}, hu = /* @__PURE__ */ Object.assign(du, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { getStore: i } = z("storage"), { t: n } = z("i18n");
    I("");
    const o = I(e.selection.items[0]), s = I(""), f = I([]), p = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          item: o.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (m) => {
          s.value = n(m.message);
        }
      });
    };
    return (m, u) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: p,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: u[1] || (u[1] = (v) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(n)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Jc, [
          Zc,
          d("div", Qc, [
            d("h3", eu, E(x(n)("Unarchive")), 1),
            d("div", tu, [
              (y(!0), C(ce, null, be(f.value, (v) => (y(), C("p", ru, [
                v.type == "dir" ? (y(), C("svg", iu, au)) : (y(), C("svg", nu, lu)),
                d("span", cu, E(v.basename), 1)
              ]))), 256)),
              d("p", uu, E(x(n)("The archive will be unarchived at")) + " (" + E(a.current.dirname) + ")", 1),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: u[0] || (u[0] = (v) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fu = { class: "sm:flex sm:items-start" }, mu = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), pu = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, gu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vu = { class: "mt-2" }, bu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, yu = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wu = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), xu = [
  wu
], _u = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ku = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Su = [
  ku
], Du = { class: "ml-1.5" }, Cu = { class: "text-sm text-gray-500 pb-1 pt-3" }, $u = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Mu = /* @__PURE__ */ d("svg", {
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
], -1), Eu = { class: "ml-1.5 overflow-auto" }, Tu = {
  name: "VFModalMove"
}, Au = /* @__PURE__ */ Object.assign(Tu, {
  props: {
    selection: Object,
    current: Object
  },
  setup(a) {
    const e = a, t = z("emitter"), { t: i } = z("i18n"), { getStore: n } = z("storage"), o = I(e.selection.items.from), s = I(""), f = () => {
      o.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: n("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(o.value.map(({ path: p, type: m }) => ({ path: p, type: m }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: i("Files moved.", e.selection.items.to.name) });
        },
        onError: (p) => {
          s.value = i(p.message);
        }
      });
    };
    return (p, m) => (y(), Z(De, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (u) => x(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", fu, [
          mu,
          d("div", pu, [
            d("h3", gu, E(x(i)("Move files")), 1),
            d("div", vu, [
              (y(!0), C(ce, null, be(o.value, (u) => (y(), C("p", bu, [
                u.type == "dir" ? (y(), C("svg", yu, xu)) : (y(), C("svg", _u, Su)),
                d("span", Du, E(u.path), 1)
              ]))), 256)),
              d("p", Cu, E(x(i)("Are you sure you want to move these files?")), 1),
              d("p", $u, [
                Mu,
                d("span", Eu, E(a.selection.items.to.path), 1)
              ]),
              s.value.length ? (y(), Z(Ce, {
                key: 0,
                onHidden: m[0] || (m[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  se(E(s.value), 1)
                ]),
                _: 1
              })) : G("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: ss,
  ModalMessage: ps,
  ModalNewFolder: Ss,
  ModalNewFile: Ps,
  ModalPreview: sc,
  ModalRename: kc,
  ModalUpload: Ic,
  ModalArchive: Gc,
  ModalUnarchive: hu,
  ModalMove: Au
}, Symbol.toStringTag, { value: "Module" })), Ct = {
  VueFinder: Ln,
  ...Ou
};
const Lu = {
  install(a) {
    for (const e in Ct)
      if (Ct.hasOwnProperty(e)) {
        const t = Ct[e];
        a.component(t.name, t);
      }
  }
};
export {
  Lu as default
};
