import { ref as L, watch as Ot, inject as B, openBlock as y, createElementBlock as C, createElementVNode as d, unref as x, normalizeClass as de, createTextVNode as ie, toDisplayString as E, createCommentVNode as G, createVNode as _e, TransitionGroup as Ya, withCtx as J, Fragment as le, renderList as we, reactive as Mt, onMounted as ke, onUpdated as Wa, withDirectives as ye, vShow as _t, withModifiers as Be, nextTick as It, vModelSelect as Rr, customRef as Xa, withKeys as tt, isRef as qa, vModelText as rt, normalizeStyle as ho, provide as it, createBlock as Z, resolveDynamicComponent as Ga, renderSlot as Yt } from "vue";
import Ht from "plupload";
var uo;
const $t = (uo = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : uo.getAttribute("content"), Et = (t, { method: e = "get", params: r = {}, json: o = !0, signal: i = null }) => {
  const a = { method: e };
  if (a.signal = i, e == "get")
    t += "?" + new URLSearchParams(r);
  else {
    a.headers = {}, $t && (a.headers["X-CSRF-Token"] = $t);
    let n = new FormData();
    for (const [f, g] of Object.entries(r))
      n.append(f, g);
    a.body = n;
  }
  return fetch(t, a).then((n) => n.ok ? o ? n.json() : n.text() : n.json().then(Promise.reject.bind(Promise)));
};
function Ja(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, r) {
    var o = t.get(e);
    o ? o.push(r) : t.set(e, [r]);
  }, off: function(e, r) {
    var o = t.get(e);
    o && (r ? o.splice(o.indexOf(r) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, r) {
    var o = t.get(e);
    o && o.slice().map(function(i) {
      i(r);
    }), (o = t.get("*")) && o.slice().map(function(i) {
      i(e, r);
    });
  } };
}
function Wt(t) {
  let e = localStorage.getItem(t + "_storage");
  const r = L(JSON.parse(e));
  Ot(r, o);
  function o() {
    r.value === null || r.value === "" ? localStorage.removeItem(t + "_storage") : localStorage.setItem(t + "_storage", JSON.stringify(r.value));
  }
  function i(f, g) {
    r.value = Object.assign({ ...r.value }, { [f]: g });
  }
  function a() {
    r.value = null;
  }
  return { getStore: (f, g = null) => r.value === null || r.value === "" ? g : r.value.hasOwnProperty(f) ? r.value[f] : g, setStore: i, clearStore: a };
}
const Hr = L("");
function Me() {
  function t(e) {
    Hr.value = e;
  }
  return { apiUrl: Hr, setApiUrl: t };
}
const Za = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Qa = {
  key: 0,
  class: "flex text-center"
}, es = ["aria-label"], ts = /* @__PURE__ */ d("svg", {
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
], -1), rs = [
  ts
], os = ["aria-label"], as = /* @__PURE__ */ d("svg", {
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
], -1), ss = [
  as
], is = ["aria-label"], ns = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), ls = [
  ns
], cs = ["aria-label"], us = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), ds = [
  us
], hs = ["aria-label"], fs = /* @__PURE__ */ d("svg", {
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
], -1), ms = [
  fs
], gs = ["aria-label"], ps = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), vs = [
  ps
], bs = ["aria-label"], ys = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ws = [
  ys
], xs = {
  key: 1,
  class: "flex text-center"
}, _s = { class: "pl-2" }, ks = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Ss = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Ds = /* @__PURE__ */ d("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Cs = /* @__PURE__ */ d("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), Ms = [
  Ds,
  Cs
], $s = { class: "flex text-center items-center justify-end" }, Es = ["aria-label"], Ts = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), As = [
  Ts
], Os = ["aria-label"], Is = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Ls = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Ps = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Ns = ["aria-label"], js = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Vs = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, zs = {
  name: "VFToolbar"
}, Bs = /* @__PURE__ */ Object.assign(zs, {
  props: {
    data: Object
  },
  setup(t) {
    const e = B("emitter"), { getStore: r, setStore: o } = B("storage"), { t: i } = B("i18n"), a = L(r("viewport", "grid")), n = L([]), f = L(r("full-screen", !1)), g = L("");
    e.on("vf-search-query", ({ newQuery: b }) => {
      g.value = b;
    });
    const m = B("loadingState"), u = () => m.value, v = () => {
      f.value = !f.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (b) => {
      n.value = b;
    }), e.on("vf-view-toggle", (b) => {
      o("viewport", b), a.value = b;
    }), (b, T) => (y(), C("div", Za, [
      g.value.length ? (y(), C("div", xs, [
        d("div", _s, [
          ie(E(x(i)("Search results for")) + " ", 1),
          d("span", ks, E(g.value), 1)
        ]),
        u() ? (y(), C("svg", Ss, Ms)) : G("", !0)
      ])) : (y(), C("div", Qa, [
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: T[0] || (T[0] = (k) => x(e).emit("vf-modal-show", { type: "new-folder", items: n.value }))
        }, rs, 8, es),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[1] || (T[1] = (k) => x(e).emit("vf-modal-show", { type: "new-file", items: n.value }))
        }, ss, 8, os),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[2] || (T[2] = (k) => n.value.length != 1 || x(e).emit("vf-modal-show", { type: "rename", items: n.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([n.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ls, 2))
        ], 8, is),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[3] || (T[3] = (k) => !n.value.length || x(e).emit("vf-modal-show", { type: "delete", items: n.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ds, 2))
        ], 8, cs),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[4] || (T[4] = (k) => x(e).emit("vf-modal-show", { type: "upload", items: n.value }))
        }, ms, 8, hs),
        n.value.length == 1 && n.value[0].mime_type == "application/zip" ? (y(), C("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": x(i)("Unrchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[5] || (T[5] = (k) => !n.value.length || x(e).emit("vf-modal-show", { type: "unarchive", items: n.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, vs, 2))
        ], 8, gs)) : (y(), C("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": x(i)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: T[6] || (T[6] = (k) => !n.value.length || x(e).emit("vf-modal-show", { type: "archive", items: n.value }))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ws, 2))
        ], 8, bs))
      ])),
      d("div", $s, [
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Dark Mode"),
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
          }, As))
        ], 8, Es),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Toggle Full Screen"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v
        }, [
          (y(), C("svg", Is, [
            f.value ? (y(), C("path", Ls)) : (y(), C("path", Ps))
          ]))
        ], 8, Os),
        d("div", {
          class: "mx-1.5",
          "aria-label": x(i)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: T[8] || (T[8] = (k) => g.value.length || x(e).emit("vf-view-toggle", a.value == "list" ? "grid" : "list"))
        }, [
          (y(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([g.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            a.value == "grid" ? (y(), C("path", js)) : G("", !0),
            a.value == "list" ? (y(), C("path", Vs)) : G("", !0)
          ], 2))
        ], 8, Ns)
      ])
    ]));
  }
});
var Rs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, fo = { exports: {} };
(function(t, e) {
  (function(r, o) {
    t.exports = o();
  })(Rs, function() {
    function r(h, l) {
      if (!(h instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(h, l) {
      for (var s = 0; s < l.length; s++) {
        var p = l[s];
        p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(h, p.key, p);
      }
    }
    function i(h, l, s) {
      return l && o(h.prototype, l), s && o(h, s), h;
    }
    function a(h, l, s) {
      return l in h ? Object.defineProperty(h, l, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : h[l] = s, h;
    }
    function n(h, l) {
      var s = Object.keys(h);
      if (Object.getOwnPropertySymbols) {
        var p = Object.getOwnPropertySymbols(h);
        l && (p = p.filter(function(c) {
          return Object.getOwnPropertyDescriptor(h, c).enumerable;
        })), s.push.apply(s, p);
      }
      return s;
    }
    function f(h) {
      for (var l = 1; l < arguments.length; l++) {
        var s = arguments[l] != null ? arguments[l] : {};
        l % 2 ? n(Object(s), !0).forEach(function(p) {
          a(h, p, s[p]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(h, Object.getOwnPropertyDescriptors(s)) : n(Object(s)).forEach(function(p) {
          Object.defineProperty(h, p, Object.getOwnPropertyDescriptor(s, p));
        });
      }
      return h;
    }
    function g(h, l) {
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
      return m = Object.setPrototypeOf ? Object.getPrototypeOf : function(s) {
        return s.__proto__ || Object.getPrototypeOf(s);
      }, m(h);
    }
    function u(h, l) {
      return u = Object.setPrototypeOf || function(p, c) {
        return p.__proto__ = c, p;
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
    function b(h, l, s) {
      return v() ? b = Reflect.construct : b = function(c, w, _) {
        var D = [null];
        D.push.apply(D, w);
        var $ = Function.bind.apply(c, D), I = new $();
        return _ && u(I, _.prototype), I;
      }, b.apply(null, arguments);
    }
    function T(h) {
      return Function.toString.call(h).indexOf("[native code]") !== -1;
    }
    function k(h) {
      var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return k = function(p) {
        if (p === null || !T(p))
          return p;
        if (typeof p != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof l < "u") {
          if (l.has(p))
            return l.get(p);
          l.set(p, c);
        }
        function c() {
          return b(p, arguments, m(this).constructor);
        }
        return c.prototype = Object.create(p.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), u(c, p);
      }, k(h);
    }
    function S(h) {
      if (h === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return h;
    }
    function P(h, l) {
      return l && (typeof l == "object" || typeof l == "function") ? l : S(h);
    }
    function F(h) {
      var l = v();
      return function() {
        var p = m(h), c;
        if (l) {
          var w = m(this).constructor;
          c = Reflect.construct(p, arguments, w);
        } else
          c = p.apply(this, arguments);
        return P(this, c);
      };
    }
    function H(h, l) {
      for (; !Object.prototype.hasOwnProperty.call(h, l) && (h = m(h), h !== null); )
        ;
      return h;
    }
    function j(h, l, s) {
      return typeof Reflect < "u" && Reflect.get ? j = Reflect.get : j = function(c, w, _) {
        var D = H(c, w);
        if (!!D) {
          var $ = Object.getOwnPropertyDescriptor(D, w);
          return $.get ? $.get.call(_) : $.value;
        }
      }, j(h, l, s || h);
    }
    function V(h, l) {
      return K(h) || ce(h, l) || he(h, l) || R();
    }
    function W(h) {
      return M(h) || Q(h) || he(h) || N();
    }
    function M(h) {
      if (Array.isArray(h))
        return ve(h);
    }
    function K(h) {
      if (Array.isArray(h))
        return h;
    }
    function Q(h) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(h))
        return Array.from(h);
    }
    function ce(h, l) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(h)))) {
        var s = [], p = !0, c = !1, w = void 0;
        try {
          for (var _ = h[Symbol.iterator](), D; !(p = (D = _.next()).done) && (s.push(D.value), !(l && s.length === l)); p = !0)
            ;
        } catch ($) {
          c = !0, w = $;
        } finally {
          try {
            !p && _.return != null && _.return();
          } finally {
            if (c)
              throw w;
          }
        }
        return s;
      }
    }
    function he(h, l) {
      if (!!h) {
        if (typeof h == "string")
          return ve(h, l);
        var s = Object.prototype.toString.call(h).slice(8, -1);
        if (s === "Object" && h.constructor && (s = h.constructor.name), s === "Map" || s === "Set")
          return Array.from(h);
        if (s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
          return ve(h, l);
      }
    }
    function ve(h, l) {
      (l == null || l > h.length) && (l = h.length);
      for (var s = 0, p = new Array(l); s < l; s++)
        p[s] = h[s];
      return p;
    }
    function N() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function R() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var O = function(l, s, p) {
      var c = l.x, w = l.y, _ = p.x, D = p.y, $ = {
        "+": {
          x: c + _,
          y: w + D
        },
        "-": {
          x: c - _,
          y: w - D
        },
        "*": {
          x: c * _,
          y: w * D
        },
        "/": {
          x: c / _,
          y: w / D
        }
      };
      return $[s];
    }, X = function(l) {
      return {
        x: l.left,
        y: l.top
      };
    }, q = function(l) {
      var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: l.x,
        top: l.y,
        right: l.x,
        bottom: l.y,
        width: s,
        height: s
      };
    }, ue = function(l) {
      return {
        x: l,
        y: l
      };
    }, ee = function(h, l, s) {
      window.addEventListener("resize", l), window.addEventListener("scroll", l), h.forEach(function(p, c) {
        s.observe(p, {
          childList: c !== 0,
          attributes: !0
        });
      });
    }, at = function(h) {
      var l = Ye(h);
      return l.x || l.y ? !0 : h instanceof HTMLDocument ? h.body ? !!(h.body.scrollTop = 1) : !!(h.documentElement.scrollTop = 1) : !!(h.scrollTop = 1);
    }, bt = function(h) {
      var l = document.createElement("div");
      return l.style.position = "fixed", l.style.overflow = "hidden", l.style.pointerEvents = "none", l.style.zIndex = "999999999999999999", l.classList.add(h), l;
    }, yt = function(h) {
      var l = document.createElement("div");
      return l.style.position = "absolute", h || (l.style.background = "rgba(0, 0, 255, 0.1)", l.style.border = "1px solid rgba(0, 0, 255, 0.45)", l.style.display = "none", l.style.pointerEvents = "none"), l;
    }, wt = function(h, l) {
      var s;
      return function() {
        for (var p = arguments.length, c = new Array(p), w = 0; w < p; w++)
          c[w] = arguments[w];
        var _ = function() {
          s = null, h.apply(void 0, c);
        };
        clearTimeout(s), s = setTimeout(_, l);
      };
    }, Fe = function() {
      var h, l, s, p;
      return {
        y: ((h = document.body) === null || h === void 0 ? void 0 : h.scrollTop) || ((l = document.documentElement) === null || l === void 0 ? void 0 : l.scrollTop) || 0,
        x: ((s = document.body) === null || s === void 0 ? void 0 : s.scrollLeft) || ((p = document.documentElement) === null || p === void 0 ? void 0 : p.scrollLeft) || 0
      };
    }, zt = function(h, l) {
      if (h instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var s = h.getBoundingClientRect();
      return {
        top: s.top,
        left: s.left,
        bottom: s.bottom,
        right: s.right,
        width: (h.clientWidth || s.width) * l,
        height: (h.clientHeight || s.height) * l
      };
    }, Ye = function(h) {
      return !h || h instanceof Document ? Fe() : {
        x: h.scrollLeft >= 0 ? h.scrollLeft : Fe().x,
        y: h.scrollTop >= 0 ? h.scrollTop : Fe().y
      };
    }, xr = function(h) {
      var l = h.elementRect, s = h.containerRect, p = h.tolerance, c = p === void 0 ? {
        x: 0,
        y: 0
      } : p, w = [];
      return l.top - c.y < s.top && w.push("top"), l.left - c.x < s.left && w.push("left"), l.bottom + c.y > s.bottom && w.push("bottom"), l.right + c.y > s.right && w.push("right"), w;
    }, sa = function(h) {
      var l = h.event;
      return {
        x: l.clientX,
        y: l.clientY
      };
    }, ia = function(h) {
      var l = h.scrollAmount, s = h.initialPointerPos, p = h.pointerPos, c = {};
      return p.x > s.x - l.x ? (c.left = s.x - l.x, c.width = p.x - s.x + l.x) : (c.left = p.x, c.width = s.x - p.x - l.x), p.y > s.y - l.y ? (c.top = s.y - l.y, c.height = p.y - s.y + l.y) : (c.top = p.y, c.height = s.y - p.y - l.y), c;
    }, _r = function(l) {
      var s = {
        x: 0,
        y: 0
      }, p = window.getComputedStyle(l);
      if (!p.transform || p.transform === "none")
        return s;
      if (p.transform.indexOf("3d") >= 0) {
        var c = p.transform.trim().match(/matrix3d\((.*?)\)/);
        if (c && c.length) {
          var w, _ = (w = c[1]) === null || w === void 0 ? void 0 : w.split(",");
          s.x = parseInt(_[12]) || 0, s.y = parseInt(_[13]) || 0;
        }
        return s;
      } else {
        var D = p.transform.trim().match(/matrix\((.*?)\)/);
        if (D && D.length) {
          var $, I = ($ = D[1]) === null || $ === void 0 ? void 0 : $.split(",");
          s.x = parseInt(I[4]) || 0, s.y = parseInt(I[5]) || 0;
        }
        return s;
      }
    }, na = function(l) {
      var s = l.style.transform;
      if (!s || s.indexOf("translate") < 0)
        return _r(l);
      var p = {
        x: 0,
        y: 0
      }, c = s.trim().match(/translate[3dD]*?\(.*?\)/);
      if (c) {
        var w, _ = (w = c[0]) === null || w === void 0 ? void 0 : w.split("(");
        if (_) {
          var D, $ = (D = _[1]) === null || D === void 0 ? void 0 : D.split(",");
          p.x = parseInt($[0]) || 0, p.y = parseInt($[1]) || 0;
        }
      }
      return !p.x && !p.x ? _r(l) : p;
    }, la = function(l) {
      var s = l.style, p = {
        x: parseInt(s.left) || 0,
        y: parseInt(s.top) || 0
      };
      if (!p.x && !p.x) {
        var c = window.getComputedStyle(l);
        return {
          x: parseInt(c.left) || 0,
          y: parseInt(c.top) || 0
        };
      }
      return p;
    }, ca = function(h, l) {
      return l ? na(h) : la(h);
    }, ua = function(h) {
      var l = h.element, s = h.edges, p = h.elementRect, c = h.containerRect, w = h.elementPos, _ = h.useTransform;
      s.includes("top") && st(l, {
        y: w.y + c.top - p.top,
        x: w.x
      }, _), s.includes("left") && st(l, {
        y: w.y,
        x: w.x + c.left - p.left
      }, _), s.includes("bottom") && st(l, {
        y: w.y + c.bottom - p.bottom,
        x: w.x
      }, _), s.includes("right") && st(l, {
        y: w.y,
        x: w.x + c.right - p.right
      }, _);
    }, kr = function(h) {
      var l = h.computedStyle, s = h.node, p = l.position, c = p === "absolute" || p === "relative" || p === "fixed";
      !(s instanceof HTMLDocument) && !c && (s.style.position = "relative");
    }, da = function(h) {
      var l = h.shiftKey, s = h.keyboardDragSpeed, p = h.zoom, c = h.key, w = h.dragKeys, _ = h.scrollDiff, D = h.canScroll, $ = h.scrollCallback, I = {
        x: 0,
        y: 0
      }, A = l ? s * 4 * p : s * p;
      return w.left.includes(c) && (I.x = _.x || -A, !l && !_.x && D && $(["left"], s)), w.right.includes(c) && (I.x = _.x || A, !l && !_.x && D && $(["right"], s)), w.up.includes(c) && (I.y = _.y || -A, !l && !_.y && D && $(["top"], s)), w.down.includes(c) && (I.y = _.y || A, !l && !_.y && D && $(["bottom"], s)), I;
    }, ha = function(h) {
      var l = h.element, s = h.force, p = h.multiSelectionToggle, c = h.SelectedSet, w = h.hoverClassName;
      l.classList.contains(w) && !s || (c.has(l) ? p && c.delete(l) : c.add(l), l.classList.add(w));
    }, fa = function(h) {
      var l = h.element, s = h.force, p = h.SelectedSet, c = h.PrevSelectedSet, w = h.hoverClassName;
      if (!l.classList.contains(w) && !s)
        return !1;
      var _ = p.has(l), D = c.has(l);
      _ && !D ? p.delete(l) : !_ && D && p.add(l), l.classList.remove(w);
    }, Bt = function(h, l) {
      return h.left < l.right && h.right > l.left && h.top < l.bottom && h.bottom > l.top;
    }, Sr = function(h) {
      var l = h.element, s = h.posDirection, p = h.containerRect, c = h.useTransform, w = ca(l, c), _ = O(w, "+", s);
      st(l, _, c);
      var D = l.getBoundingClientRect(), $ = xr({
        elementRect: D,
        containerRect: p
      });
      ua({
        element: l,
        edges: $,
        elementRect: D,
        containerRect: p,
        elementPos: _,
        useTransform: c
      });
    }, ma = function(h, l) {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l), h.disconnect();
    }, ga = function(h, l, s) {
      if (!!l.length) {
        var p = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, c = h instanceof HTMLDocument ? p || document.body : h, w = l.includes("top") && c.scrollTop > 0, _ = l.includes("bottom") && c.scrollTop < c.scrollHeight, D = l.includes("left") && c.scrollLeft > 0, $ = l.includes("right") && c.scrollLeft < c.scrollWidth;
        w && (c.scrollTop -= 1 * s), _ && (c.scrollTop += 1 * s), D && (c.scrollLeft -= 1 * s), $ && (c.scrollLeft += 1 * s);
      }
    }, st = function(h, l, s) {
      if (s) {
        var p = h.style.transform;
        h.style.transform = "translate3d(".concat(l.x, "px,").concat(l.y, "px,1px) ").concat(p.replace(/translate.*?\)/g, ""));
      } else
        h.style.left = "".concat(l.x, "px"), h.style.top = "".concat(l.y, "px");
      return h;
    }, pa = function(h) {
      for (var l = h.subscribe, s = h.publish, p = h.Interaction, c = h.SelectedSet, w = {
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
      }, _ = function() {
        var A = V($[D], 2), z = A[0], U = A[1];
        ["pre", !1].forEach(function(oe) {
          return l(oe ? "".concat(z, ":").concat(oe) : z, function(pe) {
            return U.forEach(function(ae) {
              return (!ae.condition || ae.condition(pe)) && s(oe ? "".concat(oe).concat(ae.name) : ae.name, f({
                items: c.elements,
                isDragging: p.isDragging
              }, pe));
            });
          });
        });
      }, D = 0, $ = Object.entries(w); D < $.length; D++)
        _();
    }, We = function(h) {
      return h ? !Array.isArray(h) && (h instanceof HTMLElement || h instanceof SVGElement) ? [h] : W(h) : [];
    }, Dr = function(h, l) {
      h.style.left = "".concat(l.left, "px"), h.style.top = "".concat(l.top, "px"), h.style.width = "".concat(l.width, "px"), h.style.height = "".concat(l.height, "px");
    }, va = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.area, c = l.PS, w = l.zoom;
        r(this, h), a(this, "_modificationCallback", void 0), a(this, "_modificationObserver", void 0), a(this, "_zoom", void 0), a(this, "_node", void 0), a(this, "_parentNodes", void 0), a(this, "_computedStyle", void 0), a(this, "_computedBorder", void 0), a(this, "_rect", void 0), a(this, "setArea", function(_) {
          s._node = _, kr({
            computedStyle: s.computedStyle,
            node: s._node
          }), setTimeout(function() {
            s.PubSub.publish("Area:modified:pre", {
              item: s
            }), s.reset(), s.PubSub.publish("Area:modified", {
              item: s
            });
          });
        }), a(this, "start", function() {
          ee(s.parentNodes, s._modificationCallback, s._modificationObserver);
        }), a(this, "reset", function() {
          s._computedStyle = void 0, s._rect = void 0, s._computedBorder = void 0, s._parentNodes = void 0;
        }), a(this, "stop", function() {
          ma(s._modificationObserver, s._modificationCallback), s.reset();
        }), a(this, "scroll", function(_, D) {
          var $ = {
            scroll_directions: _,
            scroll_multiplier: D
          };
          s.PubSub.publish("Area:scroll:pre", $), ga(s._node, _, D), s.PubSub.publish("Area:scroll", $);
        }), this._zoom = w, this.PubSub = c, this.setArea(p), this._modificationCallback = wt(function(_) {
          s.PubSub.publish("Area:modified:pre", {
            event: _,
            item: s
          }), s.reset(), s.PubSub.publish("Area:modified", {
            event: _,
            item: s
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return i(h, [{
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
          return this._rect ? this._rect : this._rect = zt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var s = function p(c) {
            var w, _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, D = (w = c[_]) === null || w === void 0 ? void 0 : w.parentNode;
            return D ? (c.push(D), _++, p(c, _)) : c;
          };
          return this._parentNodes = s([this.HTMLNode]), this._parentNodes;
        }
      }]), h;
    }(), ba = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS, c = l.dragKeys, w = l.draggability, _ = l.keyboardDrag, D = l.keyboardDragSpeed, $ = l.useTransform, I = l.zoom;
        r(this, h), a(this, "_useTransform", void 0), a(this, "_prevCursorPos", void 0), a(this, "_prevScrollPos", void 0), a(this, "_elements", []), a(this, "_draggability", void 0), a(this, "_dragKeys", void 0), a(this, "_dragKeysFlat", void 0), a(this, "_keyboardDrag", void 0), a(this, "_keyboardDragSpeed", void 0), a(this, "_zoom", void 0), a(this, "keyboardDrag", function(A) {
          var z = A.event, U = A.key;
          if (!(!s._keyboardDrag || !s._dragKeysFlat.includes(U) || !s.DS.SelectedSet.size || !s._draggability || s.DS.continue)) {
            var oe = {
              event: z,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            s.DS.publish(["Interaction:start:pre", "Interaction:start"], oe), s._elements = s.DS.getSelection(), s.handleZIndex(!0);
            var pe = da({
              shiftKey: s.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: s._keyboardDragSpeed,
              zoom: s._zoom,
              key: U,
              scrollCallback: s.DS.Area.scroll,
              scrollDiff: s._scrollDiff,
              canScroll: s.DS.stores.ScrollStore.canScroll,
              dragKeys: s._dragKeys
            });
            s._elements.forEach(function(ae) {
              return Sr({
                element: ae,
                posDirection: pe,
                containerRect: s.DS.SelectorArea.rect,
                useTransform: s._useTransform
              });
            }), s.DS.publish(["Interaction:update:pre", "Interaction:update"], oe);
          }
        }), a(this, "keyboardEnd", function(A) {
          var z = A.event, U = A.key;
          if (!(!s._keyboardDrag || !s._dragKeysFlat.includes(U) || !s.DS.SelectedSet.size || !s._draggability)) {
            var oe = {
              event: z,
              isDragging: s._draggability,
              isDraggingKeyboard: !0
            };
            s.DS.publish(["Interaction:end:pre", "Interaction:end"], oe);
          }
        }), a(this, "start", function(A) {
          var z = A.isDragging, U = A.isDraggingKeyboard;
          !z || U || (s._prevCursorPos = null, s._prevScrollPos = null, s._elements = s.DS.getSelection(), s.handleZIndex(!0));
        }), a(this, "stop", function(A) {
          A != null && A.isKeyboard || (s._prevCursorPos = null, s._prevScrollPos = null, s.handleZIndex(!1), s._elements = []);
        }), a(this, "update", function(A) {
          var z = A.isDragging, U = A.isDraggingKeyboard;
          if (!(!z || !s._elements.length || U || s.DS.continue)) {
            var oe = O(s._cursorDiff, "+", s._scrollDiff);
            s._elements.forEach(function(pe) {
              return Sr({
                element: pe,
                posDirection: oe,
                containerRect: s.DS.SelectorArea.rect,
                useTransform: s._useTransform
              });
            });
          }
        }), a(this, "handleZIndex", function(A) {
          s._elements.forEach(function(z) {
            return z.style.zIndex = "".concat((parseInt(z.style.zIndex) || 0) + A ? 9999 : -9998);
          });
        }), this.DS = p, this._useTransform = $, this._keyboardDragSpeed = D, this._keyboardDrag = _, this._zoom = I, this._draggability = w, this._dragKeys = {
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
        }, this._dragKeysFlat = [].concat(W(this._dragKeys.up), W(this._dragKeys.down), W(this._dragKeys.left), W(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return i(h, [{
        key: "_cursorDiff",
        get: function() {
          var s = this.DS.stores.PointerStore.currentVal, p = this._prevCursorPos ? O(s, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = s, p;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var s = this.DS.stores.ScrollStore.currentVal, p = this._prevScrollPos ? O(s, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = s, p;
        }
      }]), h;
    }(), ya = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS, c = l.areaElement, w = l.draggability, _ = l.immediateDrag, D = l.selectableClass;
        r(this, h), a(this, "_areaElement", void 0), a(this, "_draggability", void 0), a(this, "_immediateDrag", void 0), a(this, "_selectableClass", void 0), a(this, "isInteracting", void 0), a(this, "isDragging", void 0), a(this, "init", function() {
          return s.DS.publish("Interaction:init:pre", {});
        }), a(this, "_init", function() {
          s.stop(), s._areaElement.addEventListener("mousedown", s.start), s._areaElement.addEventListener("touchstart", s.start, {
            passive: !1
          }), s.DS.publish("Interaction:init", {});
        }), a(this, "start", function($) {
          return s.DS.publish("Interaction:start:pre", {
            event: $,
            isDragging: s.isDragging
          });
        }), a(this, "_start", function($) {
          $.type === "touchstart" && $.preventDefault(), s._canInteract($) && (s.isInteracting = !0, s.isDragging = s.isDragEvent($), s.DS.publish("Interaction:start", {
            event: $,
            isDragging: s.isDragging
          }), document.addEventListener("mouseup", s.reset), document.addEventListener("touchend", s.reset));
        }), a(this, "isDragEvent", function($) {
          var I = $.target.closest(".".concat(s._selectableClass));
          return !s._draggability || s.DS.stores.KeyStore.isMultiSelectKeyPressed($) || !I ? !1 : (s._immediateDrag && (s.DS.SelectedSet.size ? s.DS.SelectedSet.has(I) || (s.DS.SelectedSet.clear(), s.DS.SelectedSet.add(
            I
          )) : s.DS.SelectedSet.add(
            I
          )), !!s.DS.SelectedSet.has(I));
        }), a(this, "onClick", function($) {
          var I = $.event;
          if (!!s._canInteract(I) && !(I.detail > 0)) {
            var A = s.DS, z = A.stores, U = z.PointerStore, oe = z.KeyStore, pe = A.SelectableSet, ae = A.SelectedSet;
            U.start(I);
            var Xe = I.target;
            !pe.has(Xe) || (oe.isMultiSelectKeyPressed(I) || ae.clear(), ae.toggle(Xe), s.reset());
          }
        }), a(this, "stop", function() {
          s.isInteracting = !1, s.isDragging = !1, s._areaElement.removeEventListener("mousedown", s.start), s._areaElement.removeEventListener("touchstart", s.start, {
            passive: !1
          }), document.removeEventListener("mouseup", s.reset), document.removeEventListener("touchend", s.reset);
        }), a(this, "update", function($) {
          var I = $.event, A = $.scroll_directions, z = $.scroll_multiplier;
          s.isInteracting && s.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: I,
            scroll_directions: A,
            scroll_multiplier: z,
            isDragging: s.isDragging
          });
        }), a(this, "reset", function($) {
          return s.DS.publish("Interaction:end:pre", {
            event: $,
            isDragging: s.isDragging
          });
        }), a(this, "_reset", function($) {
          var I = s.isDragging;
          s.stop(), s.init(), s.DS.publish("Interaction:end", {
            event: $,
            isDragging: I
          });
        }), this._areaElement = c, this._draggability = w, this._immediateDrag = _, this._selectableClass = D, this.DS = p, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function($) {
          var I = $.event;
          return s.start(I);
        }), this.DS.subscribe("Interaction:start:pre", function($) {
          var I = $.event;
          return s._start(I);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function($) {
          var I = $.event;
          return s._reset(I);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return i(h, [{
        key: "_canInteract",
        value: function(s) {
          var p = s.clientX === 0 && s.clientY === 0 && s.detail === 0 && s.target;
          return !(s.button === 2 || this.isInteracting || s.target && !this.DS.SelectorArea.isInside(
            s.target
          ) || !p && !this.DS.SelectorArea.isClicked(s));
        }
      }]), h;
    }(), wa = function h(l) {
      var s = this, p = l.DS;
      r(this, h), a(this, "subscribers", {}), a(this, "subscribe", function(c, w) {
        return Array.isArray(s.subscribers[c]) || (s.subscribers[c] = []), s.subscribers[c].push(w), s.subscribers[c].length - 1;
      }), a(this, "unsubscribe", function(c, w, _) {
        _ >= 0 ? s.subscribers[c].splice(_, 1) : w && (s.subscribers[c] = s.subscribers[c].filter(function(D) {
          return D !== w;
        }));
      }), a(this, "publish", function(c, w) {
        Array.isArray(c) ? c.forEach(function(_) {
          return s._publish(_, w);
        }) : s._publish(c, w);
      }), a(this, "_publish", function(c, w) {
        var _ = s.subscribers[c];
        !Array.isArray(_) || (c.includes(":pre") ? s._handlePrePublish(_, w) : s._handlePublish(_, w));
      }), a(this, "_handlePublish", function(c, w) {
        for (var _ = 0, D = c.length; _ < D; _++) {
          if (s.DS.stopped)
            return;
          c[_](w);
        }
      }), a(this, "_handlePrePublish", function(c, w) {
        for (var _ = c.length; _--; ) {
          if (s.DS.stopped)
            return;
          c[_](w);
        }
      }), this.DS = p;
    }, xa = /* @__PURE__ */ function(h) {
      g(s, h);
      var l = F(s);
      function s(p) {
        var c, w = p.elements, _ = p.className, D = p.hoverClassName, $ = p.draggability, I = p.useTransform, A = p.DS;
        return r(this, s), c = l.call(this), a(S(c), "_initElements", void 0), a(S(c), "_className", void 0), a(S(c), "_hoverClassName", void 0), a(S(c), "_useTransform", void 0), a(S(c), "_draggability", void 0), a(S(c), "init", function() {
          return c._initElements.forEach(function(z) {
            return c.add(z);
          });
        }), a(S(c), "clear", function() {
          return c.forEach(function(z) {
            return c.delete(z);
          });
        }), a(S(c), "_onClick", function(z) {
          return c.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: z
          });
        }), a(S(c), "_onPointer", function(z) {
          return c.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: z
          });
        }), a(S(c), "addAll", function(z) {
          return z.forEach(function(U) {
            return c.add(U);
          });
        }), a(S(c), "deleteAll", function(z) {
          return z.forEach(function(U) {
            return c.delete(U);
          });
        }), c.DS = A, c._initElements = We(w), c._className = _, c._hoverClassName = D, c._useTransform = I, c._draggability = $, c.DS.subscribe("Interaction:init", c.init), c;
      }
      return i(s, [{
        key: "add",
        value: function(c) {
          return c.classList.add(this._className), c.addEventListener("click", this._onClick), c.addEventListener("mousedown", this._onPointer), c.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && kr({
            computedStyle: window.getComputedStyle(c),
            node: c
          }), j(m(s.prototype), "add", this).call(this, c);
        }
      }, {
        key: "delete",
        value: function(c) {
          return c.classList.remove(this._className), c.classList.remove(this._hoverClassName), c.removeEventListener("click", this._onClick), c.removeEventListener("mousedown", this._onPointer), c.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), j(m(s.prototype), "delete", this).call(this, c);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), s;
    }(/* @__PURE__ */ k(Set)), _a = /* @__PURE__ */ function(h) {
      g(s, h);
      var l = F(s);
      function s(p) {
        var c, w = p.className, _ = p.DS;
        return r(this, s), c = l.call(this), a(S(c), "_className", void 0), a(S(c), "clear", function() {
          return c.forEach(function(D) {
            return c.delete(D);
          });
        }), a(S(c), "addAll", function(D) {
          return D.forEach(function($) {
            return c.add($);
          });
        }), a(S(c), "deleteAll", function(D) {
          return D.forEach(function($) {
            return c.delete($);
          });
        }), c.DS = _, c._className = w, c;
      }
      return i(s, [{
        key: "add",
        value: function(c) {
          if (!j(m(s.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            return this.DS.publish("Selected:added:pre", w), j(m(s.prototype), "add", this).call(this, c), c.classList.add(this._className), c.style.zIndex = "".concat((parseInt(c.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", w), this;
          }
        }
      }, {
        key: "delete",
        value: function(c) {
          if (!!j(m(s.prototype), "has", this).call(this, c)) {
            var w = {
              items: this.elements,
              item: c
            };
            this.DS.publish("Selected:removed:pre", w);
            var _ = j(m(s.prototype), "delete", this).call(this, c);
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
      }]), s;
    }(/* @__PURE__ */ k(Set)), ka = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS, c = l.hoverClassName, w = l.multiSelectToggling;
        r(this, h), a(this, "_prevSelectedSet", void 0), a(this, "_hoverClassName", void 0), a(this, "_multiSelectToggling", void 0), a(this, "start", function(_) {
          var D = _.event, $ = _.isDragging;
          $ || (s._storePrevious(D), s._handleInsideSelection(!0, D));
        }), a(this, "update", function(_) {
          var D = _.isDragging;
          D || s.DS.continue || s._handleInsideSelection();
        }), a(this, "_handleInsideSelection", function(_, D) {
          for (var $ = s.DS, I = $.SelectableSet, A = $.SelectorArea, z = $.Selector, U = I.elements.map(function(Ae) {
            return [Ae, Ae.getBoundingClientRect()];
          }), oe = [], pe = [], ae = 0, Xe = U.length; ae < Xe; ae++)
            !A.isInside(U[ae][0], U[ae][1]) || (Bt(U[ae][1], z.rect) ? oe.push(U[ae][0]) : pe.push(U[ae][0]));
          var xt = s.DS.stores.KeyStore.isMultiSelectKeyPressed(D) && s._multiSelectToggling;
          s.DS.continue || (oe.forEach(function(Ae) {
            return ha({
              element: Ae,
              force: _,
              multiSelectionToggle: xt,
              SelectedSet: s.DS.SelectedSet,
              hoverClassName: s._hoverClassName
            });
          }), pe.forEach(function(Ae) {
            return fa({
              element: Ae,
              force: _,
              SelectedSet: s.DS.SelectedSet,
              hoverClassName: s._hoverClassName,
              PrevSelectedSet: s._prevSelectedSet
            });
          }));
        }), this._hoverClassName = c, this._multiSelectToggling = w, this.DS = p, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return i(h, [{
        key: "_storePrevious",
        value: function(s) {
          var p = this.DS, c = p.stores.KeyStore, w = p.SelectedSet;
          c.isMultiSelectKeyPressed(s) ? this._prevSelectedSet = new Set(w) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), h;
    }(), Sa = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS, c = l.selector, w = l.selectorClass, _ = l.customStyles;
        r(this, h), a(this, "_rect", void 0), a(this, "start", function(D) {
          var $ = D.isDragging;
          if (!$) {
            var I = s.DS.stores.PointerStore, A = I.initialValArea;
            Dr(s.HTMLNode, q(A, 1)), s.HTMLNode.style.display = "block", s._rect = null;
          }
        }), a(this, "stop", function() {
          s.HTMLNode.style.width = "0", s.HTMLNode.style.height = "0", s.HTMLNode.style.display = "none";
        }), a(this, "update", function(D) {
          var $ = D.isDragging;
          if (!($ || s.DS.continue)) {
            var I = s.DS.stores, A = I.ScrollStore, z = I.PointerStore, U = ia({
              scrollAmount: A.scrollAmount,
              initialPointerPos: z.initialValArea,
              pointerPos: z.currentValArea
            });
            Dr(s.HTMLNode, U), s._rect = null;
          }
        }), this.DS = p, this.HTMLNode = c || yt(_), this.HTMLNode.classList.add(w), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return i(h, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), h;
    }(), Da = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS, c = l.selectorAreaClass, w = l.autoScrollSpeed, _ = l.overflowTolerance;
        r(this, h), a(this, "_autoScrollSpeed", void 0), a(this, "_scrollInterval", void 0), a(this, "_rect", void 0), a(this, "currentEdges", []), a(this, "_overflowTolerance", void 0), a(this, "start", function() {
          return s.applyElements("append");
        }), a(this, "applyElements", function() {
          var D = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", $ = document.body ? "body" : "documentElement", I = "".concat(D, "Child");
          s.HTMLNode[I](s.DS.Selector.HTMLNode), document[$][I](s.HTMLNode);
        }), a(this, "updatePos", function() {
          s._rect = null;
          var D = s.DS.Area.rect, $ = s.DS.Area.computedBorder, I = s.HTMLNode.style, A = "".concat(D.top + $.top, "px"), z = "".concat(D.left + $.left, "px"), U = "".concat(D.width, "px"), oe = "".concat(D.height, "px");
          I.top !== A && (I.top = A), I.left !== z && (I.left = z), I.width !== U && (I.width = U), I.height !== oe && (I.height = oe);
        }), a(this, "stop", function(D) {
          s.stopAutoScroll(), D && s.applyElements("remove");
        }), a(this, "startAutoScroll", function() {
          s.currentEdges = [], s._scrollInterval = setInterval(function() {
            return s.handleAutoScroll();
          }, 16);
        }), a(this, "handleAutoScroll", function() {
          if (!s.DS.continue) {
            var D = s.DS, $ = D.stores.PointerStore, I = D.Area;
            s.currentEdges = xr({
              elementRect: q($.currentVal),
              containerRect: s.rect,
              tolerance: s._overflowTolerance
            }), s.currentEdges.length && I.scroll(s.currentEdges, s._autoScrollSpeed);
          }
        }), a(this, "stopAutoScroll", function() {
          s.currentEdges = [], clearInterval(s._scrollInterval);
        }), a(this, "isInside", function(D, $) {
          return s.DS.Area.HTMLNode.contains(D) && s.DS.stores.ScrollStore.canScroll ? !0 : Bt(s.rect, $ || D.getBoundingClientRect());
        }), this._autoScrollSpeed = w, this._overflowTolerance = _, this.DS = p, this.HTMLNode = bt(c), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          s.updatePos(), s.stopAutoScroll();
        });
      }
      return i(h, [{
        key: "isClicked",
        value: function(s) {
          var p = this.DS.stores.PointerStore, c = s ? p.getPointerPosition(s) : p.initialVal;
          return Bt({
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
    }(), Ca = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS, c = l.multiSelectKeys, w = l.multiSelectMode;
        r(this, h), a(this, "_multiSelectMode", void 0), a(this, "_multiSelectKeys", void 0), a(this, "_currentValues", /* @__PURE__ */ new Set()), a(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), a(this, "init", function() {
          document.addEventListener("keydown", s.keydown), document.addEventListener("keyup", s.keyup), window.addEventListener("blur", s.reset);
        }), a(this, "keydown", function(_) {
          var D = _.key.toLowerCase();
          s.DS.publish("KeyStore:down:pre", {
            event: _,
            key: D
          }), s._currentValues.add(D), s.DS.publish("KeyStore:down", {
            event: _,
            key: D
          });
        }), a(this, "keyup", function(_) {
          var D = _.key.toLowerCase();
          s.DS.publish("KeyStore:up:pre", {
            event: _,
            key: D
          }), s._currentValues.delete(D), s.DS.publish("KeyStore:up", {
            event: _,
            key: D
          });
        }), a(this, "stop", function() {
          document.removeEventListener("keydown", s.keydown), document.removeEventListener("keyup", s.reset), window.removeEventListener("blur", s.reset), s.reset();
        }), a(this, "reset", function() {
          return s._currentValues.clear();
        }), this.DS = p, this._multiSelectMode = w, this._multiSelectKeys = c.map(function(_) {
          var D = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, $ = D[_];
          return $ ? (console.warn("[DragSelect] ".concat(_, ' is deprecated. Use "').concat($, '" instead. Act Now!. See docs for more info')), $.toLowerCase()) : _.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return i(h, [{
        key: "isMultiSelectKeyPressed",
        value: function(s) {
          var p = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(c) {
            return p._multiSelectKeys.includes(c);
          }) || s && this._multiSelectKeys.some(function(c) {
            return s[p._keyMapping[c]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), h;
    }(), Ma = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS;
        r(this, h), a(this, "_isMouseInteraction", !1), a(this, "_initialValArea", void 0), a(this, "_currentValArea", void 0), a(this, "_lastValArea", void 0), a(this, "_initialVal", void 0), a(this, "_currentVal", void 0), a(this, "_lastVal", void 0), a(this, "_lastTouch", void 0), a(this, "init", function() {
          document.addEventListener("mousemove", s.update), document.addEventListener("touchmove", s.update, {
            passive: !1
          });
        }), a(this, "getPointerPosition", function(c) {
          return sa({
            event: s._normalizedEvent(c)
          });
        }), a(this, "update", function(c) {
          !c || (s.DS.publish("PointerStore:updated:pre", {
            event: c
          }), s.currentVal = s.getPointerPosition(c), s._isMouseInteraction && s.DS.publish("PointerStore:updated", {
            event: c
          }));
        }), a(this, "stop", function() {
          document.removeEventListener("mousemove", s.update), document.removeEventListener("touchmove", s.update, {
            passive: !1
          }), setTimeout(function() {
            return s._isMouseInteraction = !1;
          }, 100);
        }), a(this, "reset", function(c) {
          !c || (s.currentVal = s.lastVal = s.getPointerPosition(c), s.stop(), s.init());
        }), this.DS = p, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(c) {
          var w = c.event;
          return s.start(w);
        }), this.DS.subscribe("Interaction:end", function(c) {
          var w = c.event;
          return s.reset(w);
        });
      }
      return i(h, [{
        key: "start",
        value: function(s) {
          !s || (this._isMouseInteraction = !0, this.currentVal = this.initialVal = this.getPointerPosition(s));
        }
      }, {
        key: "_normalizedEvent",
        value: function(s) {
          return "touches" in s && s.type !== "touchend" && (this._lastTouch = s), "touches" in s ? this._lastTouch.touches[0] : s;
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
        set: function(s) {
          this._initialVal = s, this._initialValArea = s && O(s, "-", O(X(this.DS.Area.rect), "+", X(this.DS.Area.computedBorder)));
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal ? this._currentVal : {
            x: 0,
            y: 0
          };
        },
        set: function(s) {
          this._currentVal = s, this._currentValArea = s && O(s, "-", O(X(this.DS.Area.rect), "+", X(this.DS.Area.computedBorder)));
        }
      }, {
        key: "lastVal",
        get: function() {
          return this._lastVal ? this._lastVal : {
            x: 0,
            y: 0
          };
        },
        set: function(s) {
          this._lastVal = s, this._lastValArea = s && O(s, "-", O(X(this.DS.Area.rect), "+", X(this.DS.Area.computedBorder)));
        }
      }]), h;
    }(), $a = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.DS, c = l.areaElement, w = l.zoom;
        r(this, h), a(this, "_initialVal", void 0), a(this, "_currentVal", void 0), a(this, "_areaElement", void 0), a(this, "_canScroll", void 0), a(this, "init", function() {
          return s._areaElement.addEventListener("scroll", s.update);
        }), a(this, "start", function() {
          s._currentVal = s._initialVal = Ye(s._areaElement), s._areaElement.addEventListener("scroll", s.update);
        }), a(this, "update", function() {
          return s._currentVal = Ye(s._areaElement);
        }), a(this, "stop", function() {
          s._areaElement.removeEventListener("scroll", s.update), s._initialVal = {
            x: 0,
            y: 0
          }, s._canScroll = null;
        }), a(this, "reset", function() {
          s.stop(), s.start();
        }), this._areaElement = c, this.DS = p, this.zoom = w, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return s.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return s.reset();
        });
      }
      return i(h, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = at(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var s = O(this.currentVal, "-", this.initialVal), p = ue(this.zoom), c = O(O(s, "*", p), "-", s);
          return {
            x: s.x + c.x,
            y: s.y + c.y
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
          return this._currentVal || (this._currentVal = Ye(this._areaElement)), this._currentVal;
        }
      }]), h;
    }(), Ea = /* @__PURE__ */ function() {
      function h(l) {
        var s = this, p = l.area, c = p === void 0 ? document : p, w = l.selectables, _ = w === void 0 ? [] : w, D = l.autoScrollSpeed, $ = D === void 0 ? 5 : D, I = l.overflowTolerance, A = I === void 0 ? {
          x: 25,
          y: 25
        } : I, z = l.zoom, U = z === void 0 ? 1 : z, oe = l.customStyles, pe = oe === void 0 ? !1 : oe, ae = l.multiSelectMode, Xe = ae === void 0 ? !1 : ae, xt = l.multiSelectToggling, Ae = xt === void 0 ? !0 : xt, Cr = l.multiSelectKeys, Ta = Cr === void 0 ? ["Control", "Shift", "Meta"] : Cr, Mr = l.selector, Aa = Mr === void 0 ? void 0 : Mr, $r = l.draggability, Rt = $r === void 0 ? !0 : $r, Er = l.immediateDrag, Oa = Er === void 0 ? !0 : Er, Tr = l.keyboardDrag, Ia = Tr === void 0 ? !0 : Tr, La = l.dragKeys, Ar = l.keyboardDragSpeed, Pa = Ar === void 0 ? 10 : Ar, Or = l.useTransform, Ir = Or === void 0 ? !0 : Or, Lr = l.hoverClass, Pr = Lr === void 0 ? "ds-hover" : Lr, Nr = l.selectableClass, jr = Nr === void 0 ? "ds-selectable" : Nr, Vr = l.selectedClass, Na = Vr === void 0 ? "ds-selected" : Vr, zr = l.selectorClass, ja = zr === void 0 ? "ds-selector" : zr, Br = l.selectorAreaClass, Va = Br === void 0 ? "ds-selector-area" : Br, za = l.callback, Ba = l.onDragMove, Ra = l.onDragStartBegin, Ha = l.onDragStart, Ua = l.onElementSelect, Ka = l.onElementUnselect;
        r(this, h), a(this, "continue", !1), a(this, "start", function() {
          s.stopped = !1, s.Interaction.init();
        }), a(this, "break", function() {
          return s.continue = !0;
        }), a(this, "getSelection", function() {
          return s.SelectedSet.elements;
        }), a(this, "getSelectables", function() {
          return s.SelectableSet.elements;
        }), a(this, "getInitialCursorPosition", function() {
          return s.stores.PointerStore.initialVal;
        }), a(this, "getCurrentCursorPosition", function() {
          return s.stores.PointerStore.currentVal;
        }), a(this, "getPreviousCursorPosition", function() {
          return s.stores.PointerStore.lastVal;
        }), a(this, "getInitialCursorPositionArea", function() {
          return s.stores.PointerStore.initialValArea;
        }), a(this, "getCurrentCursorPositionArea", function() {
          return s.stores.PointerStore.currentValArea;
        }), a(this, "getPreviousCursorPositionArea", function() {
          return s.stores.PointerStore.lastValArea;
        }), a(this, "isMultiSelect", function(Fa) {
          return s.stores.KeyStore.isMultiSelectKeyPressed(Fa);
        }), a(this, "isDragging", function() {
          return s.Interaction.isDragging;
        }), this.PubSub = new wa({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: za,
          onDragMove: Ba,
          onDragStart: Ha,
          onDragStartBegin: Ra,
          onElementSelect: Ua,
          onElementUnselect: Ka
        }), this.stores = {
          PointerStore: new Ma({
            DS: this
          }),
          ScrollStore: new $a({
            DS: this,
            areaElement: c,
            zoom: U
          }),
          KeyStore: new Ca({
            DS: this,
            multiSelectKeys: Ta,
            multiSelectMode: Xe
          })
        }, this.Area = new va({
          area: c,
          PS: this.PubSub,
          zoom: U
        }), this.Selector = new Sa({
          DS: this,
          selector: Aa,
          selectorClass: ja,
          customStyles: pe
        }), this.SelectorArea = new Da({
          DS: this,
          selectorAreaClass: Va,
          autoScrollSpeed: $,
          overflowTolerance: A
        }), this.SelectableSet = new xa({
          elements: _,
          DS: this,
          className: jr,
          hoverClassName: Pr,
          useTransform: Ir,
          draggability: Rt
        }), this.SelectedSet = new _a({
          DS: this,
          className: Na
        }), this.Selection = new ka({
          DS: this,
          hoverClassName: Pr,
          multiSelectToggling: Ae
        }), this.Drag = new ba({
          DS: this,
          draggability: Rt,
          useTransform: Ir,
          keyboardDrag: Ia,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, La),
          zoom: U,
          keyboardDragSpeed: Pa
        }), this.Interaction = new ya({
          areaElement: c,
          DS: this,
          draggability: Rt,
          immediateDrag: Oa,
          selectableClass: jr
        }), pa({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return s.continue = !1;
        }), this.start();
      }
      return i(h, [{
        key: "_callbacksTemp",
        value: function(s) {
          var p = s.callback, c = s.onDragMove, w = s.onDragStart, _ = s.onDragStartBegin, D = s.onElementSelect, $ = s.onElementUnselect, I = function(z, U) {
            return console.warn("[DragSelect] ".concat(z, ' is deprecated. Use DragSelect.subscribe("').concat(U, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          p && (I("callback", "callback"), this.subscribe("callback", function(A) {
            var z = A.items;
            A.item;
            var U = A.event;
            return p(z, U);
          })), c && (I("onDragMove", "dragmove"), this.subscribe("dragmove", function(A) {
            A.items, A.item;
            var z = A.event;
            return c(z);
          })), w && (I("onDragStart", "dragstart"), this.subscribe("dragstart", function(A) {
            A.items, A.item;
            var z = A.event;
            return w(z);
          })), _ && (I("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(A) {
            A.items, A.item;
            var z = A.event;
            return _(z);
          })), D && (I("onElementSelect", "elementselect"), this.subscribe("elementselect", function(A) {
            A.items;
            var z = A.item, U = A.event;
            return D(z, U);
          })), $ && (I("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(A) {
            A.items;
            var z = A.item, U = A.event;
            return $(z, U);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          c && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(s), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), s && this.SelectableSet.clear(), p && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(s) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(We(s)), c || this.addSelectables(s), p && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(s) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(We(s)), c && this.removeSelectables(s), p && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(s) {
          var p = this, c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return We(s).forEach(function(_) {
            return p.SelectedSet.has(_) ? p.removeSelection(s, c, w) : p.addSelection(s, c, w);
          }), c && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(s) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(s, p, c), this.getSelection();
        }
      }, {
        key: "clearSelection",
        value: function() {
          var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return this.SelectedSet.clear(), s && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "addSelectables",
        value: function(s) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = We(s);
          return this.SelectableSet.addAll(c), p && this.SelectedSet.addAll(c), s;
        }
      }, {
        key: "setSelectables",
        value: function(s) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(s, p), this.addSelectables(s, c);
        }
      }, {
        key: "removeSelectables",
        value: function(s) {
          var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(We(s)), p && this.removeSelection(s), s;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var c = p ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), w = s ? p ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : p ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return O(c, "-", w);
        }
      }]), h;
    }();
    return Ea;
  });
})(fo);
const Hs = fo.exports, mo = (t, e, r, o, i) => (e = Math, r = e.log, o = 1024, i = r(t) / r(o) | 0, t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B"), go = (t, e = null) => {
  var r;
  return new Date(t * 1e3).toLocaleString((r = e != null ? e : navigator.language) != null ? r : "en-US");
}, Us = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Ks = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Fs = [
  Ks
], Ys = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Ws = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Xs = [
  Ws
], qs = {
  name: "VFSortIcon"
}, kt = /* @__PURE__ */ Object.assign(qs, {
  props: { direction: String },
  setup(t) {
    return (e, r) => (y(), C("div", null, [
      t.direction == "down" ? (y(), C("svg", Us, Fs)) : G("", !0),
      t.direction == "up" ? (y(), C("svg", Ys, Xs)) : G("", !0)
    ]));
  }
}), Gs = ["onClick"], Js = {
  name: "VFToast.vue"
}, Zs = /* @__PURE__ */ Object.assign(Js, {
  setup(t) {
    const e = B("emitter"), { getStore: r } = B("storage"), o = L(r("full-screen", !1)), i = (g) => g == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = L([]), n = (g) => {
      a.value.splice(g, 1);
    }, f = (g) => {
      let m = a.value.findIndex((u) => u.id === g);
      m !== -1 && n(m);
    };
    return e.on("vf-toast-clear", () => {
      a.value = [];
    }), e.on("vf-toast-push", (g) => {
      let m = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      g.id = m, a.value.push(g), setTimeout(() => {
        f(m);
      }, 5e3);
    }), (g, m) => (y(), C("div", {
      class: de([o.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      _e(Ya, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: J(() => [
          (y(!0), C(le, null, we(a.value, (u, v) => (y(), C("div", {
            onClick: (b) => n(v),
            key: u,
            class: de([i(u.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, E(u.label), 11, Gs))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Ue = (t) => Object.entries(t).map((e) => e.map(encodeURIComponent).join("=")).join("&"), { apiUrl: Qs } = Me(), Xt = (t, e) => Qs.value + "?" + Ue({ q: "preview", adapter: t, path: e }), Ne = typeof window < "u", po = Ne && !("onscroll" in window) || typeof navigator < "u" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), vo = Ne && "IntersectionObserver" in window, bo = Ne && "classList" in document.createElement("p"), yo = Ne && window.devicePixelRatio > 1, ei = {
  elements_selector: ".lazy",
  container: po || Ne ? document : null,
  threshold: 300,
  thresholds: null,
  data_src: "src",
  data_srcset: "srcset",
  data_sizes: "sizes",
  data_bg: "bg",
  data_bg_hidpi: "bg-hidpi",
  data_bg_multi: "bg-multi",
  data_bg_multi_hidpi: "bg-multi-hidpi",
  data_bg_set: "bg-set",
  data_poster: "poster",
  class_applied: "applied",
  class_loading: "loading",
  class_loaded: "loaded",
  class_error: "error",
  class_entered: "entered",
  class_exited: "exited",
  unobserve_completed: !0,
  unobserve_entered: !1,
  cancel_on_exit: !0,
  callback_enter: null,
  callback_exit: null,
  callback_applied: null,
  callback_loading: null,
  callback_loaded: null,
  callback_error: null,
  callback_finish: null,
  callback_cancel: null,
  use_native: !1,
  restore_on_error: !1
}, wo = (t) => Object.assign({}, ei, t), Ur = function(t, e) {
  let r;
  const o = "LazyLoad::Initialized", i = new t(e);
  try {
    r = new CustomEvent(o, { detail: { instance: i } });
  } catch {
    r = document.createEvent("CustomEvent"), r.initCustomEvent(o, !1, !1, { instance: i });
  }
  window.dispatchEvent(r);
}, ti = (t, e) => {
  if (!!e)
    if (!e.length)
      Ur(t, e);
    else
      for (let r = 0, o; o = e[r]; r += 1)
        Ur(t, o);
}, Te = "src", sr = "srcset", ir = "sizes", xo = "poster", gt = "llOriginalAttrs", _o = "data", nr = "loading", ko = "loaded", So = "applied", ri = "entered", lr = "error", Do = "native", Co = "data-", Mo = "ll-status", ge = (t, e) => t.getAttribute(Co + e), oi = (t, e, r) => {
  var o = Co + e;
  if (r === null) {
    t.removeAttribute(o);
    return;
  }
  t.setAttribute(o, r);
}, pt = (t) => ge(t, Mo), Ke = (t, e) => oi(t, Mo, e), Lt = (t) => Ke(t, null), cr = (t) => pt(t) === null, ai = (t) => pt(t) === nr, si = (t) => pt(t) === lr, ur = (t) => pt(t) === Do, ii = [nr, ko, So, lr], ni = (t) => ii.indexOf(pt(t)) >= 0, je = (t, e, r, o) => {
  if (!!t) {
    if (o !== void 0) {
      t(e, r, o);
      return;
    }
    if (r !== void 0) {
      t(e, r);
      return;
    }
    t(e);
  }
}, ot = (t, e) => {
  if (bo) {
    t.classList.add(e);
    return;
  }
  t.className += (t.className ? " " : "") + e;
}, Se = (t, e) => {
  if (bo) {
    t.classList.remove(e);
    return;
  }
  t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
}, li = (t) => {
  t.llTempImage = document.createElement("IMG");
}, ci = (t) => {
  delete t.llTempImage;
}, $o = (t) => t.llTempImage, Pt = (t, e) => {
  if (!e)
    return;
  const r = e._observer;
  !r || r.unobserve(t);
}, ui = (t) => {
  t.disconnect();
}, di = (t, e, r) => {
  e.unobserve_entered && Pt(t, r);
}, dr = (t, e) => {
  !t || (t.loadingCount += e);
}, hi = (t) => {
  !t || (t.toLoadCount -= 1);
}, Eo = (t, e) => {
  !t || (t.toLoadCount = e);
}, fi = (t) => t.loadingCount > 0, mi = (t) => t.toLoadCount > 0, To = (t) => {
  let e = [];
  for (let r = 0, o; o = t.children[r]; r += 1)
    o.tagName === "SOURCE" && e.push(o);
  return e;
}, hr = (t, e) => {
  const r = t.parentNode;
  if (!r || r.tagName !== "PICTURE")
    return;
  To(r).forEach(e);
}, Ao = (t, e) => {
  To(t).forEach(e);
}, Nt = [Te], Oo = [Te, xo], ht = [Te, sr, ir], Io = [_o], jt = (t) => !!t[gt], Lo = (t) => t[gt], Po = (t) => delete t[gt], et = (t, e) => {
  if (jt(t))
    return;
  const r = {};
  e.forEach((o) => {
    r[o] = t.getAttribute(o);
  }), t[gt] = r;
}, gi = (t) => {
  jt(t) || (t[gt] = { backgroundImage: t.style.backgroundImage });
}, pi = (t, e, r) => {
  if (!r) {
    t.removeAttribute(e);
    return;
  }
  t.setAttribute(e, r);
}, Re = (t, e) => {
  if (!jt(t))
    return;
  const r = Lo(t);
  e.forEach((o) => {
    pi(t, o, r[o]);
  });
}, vi = (t) => {
  if (!jt(t))
    return;
  const e = Lo(t);
  t.style.backgroundImage = e.backgroundImage;
}, No = (t, e, r) => {
  ot(t, e.class_applied), Ke(t, So), r && (e.unobserve_completed && Pt(t, e), je(e.callback_applied, t, r));
}, jo = (t, e, r) => {
  ot(t, e.class_loading), Ke(t, nr), r && (dr(r, 1), je(e.callback_loading, t, r));
}, Pe = (t, e, r) => {
  !r || t.setAttribute(e, r);
}, Kr = (t, e) => {
  Pe(t, ir, ge(t, e.data_sizes)), Pe(t, sr, ge(t, e.data_srcset)), Pe(t, Te, ge(t, e.data_src));
}, bi = (t, e) => {
  hr(t, (r) => {
    et(r, ht), Kr(r, e);
  }), et(t, ht), Kr(t, e);
}, yi = (t, e) => {
  et(t, Nt), Pe(t, Te, ge(t, e.data_src));
}, wi = (t, e) => {
  Ao(t, (r) => {
    et(r, Nt), Pe(r, Te, ge(r, e.data_src));
  }), et(t, Oo), Pe(t, xo, ge(t, e.data_poster)), Pe(t, Te, ge(t, e.data_src)), t.load();
}, xi = (t, e) => {
  et(t, Io), Pe(t, _o, ge(t, e.data_src));
}, _i = (t, e, r) => {
  const o = ge(t, e.data_bg), i = ge(t, e.data_bg_hidpi), a = yo && i ? i : o;
  !a || (t.style.backgroundImage = `url("${a}")`, $o(t).setAttribute(Te, a), jo(t, e, r));
}, ki = (t, e, r) => {
  const o = ge(t, e.data_bg_multi), i = ge(t, e.data_bg_multi_hidpi), a = yo && i ? i : o;
  !a || (t.style.backgroundImage = a, No(t, e, r));
}, Si = (t, e, r) => {
  const o = ge(t, e.data_bg_set);
  if (!o)
    return;
  const i = o.split("|");
  let a = i.map((n) => `image-set(${n})`);
  t.style.backgroundImage = a.join(), t.style.backgroundImage === "" && (a = i.map((n) => `-webkit-image-set(${n})`), t.style.backgroundImage = a.join()), No(t, e, r);
}, Vo = {
  IMG: bi,
  IFRAME: yi,
  VIDEO: wi,
  OBJECT: xi
}, Di = (t, e) => {
  const r = Vo[t.tagName];
  !r || r(t, e);
}, Ci = (t, e, r) => {
  const o = Vo[t.tagName];
  !o || (o(t, e), jo(t, e, r));
}, Mi = ["IMG", "IFRAME", "VIDEO", "OBJECT"], $i = (t) => Mi.indexOf(t.tagName) > -1, zo = (t, e) => {
  e && !fi(e) && !mi(e) && je(t.callback_finish, e);
}, Fr = (t, e, r) => {
  t.addEventListener(e, r), t.llEvLisnrs[e] = r;
}, Ei = (t, e, r) => {
  t.removeEventListener(e, r);
}, fr = (t) => !!t.llEvLisnrs, Ti = (t, e, r) => {
  fr(t) || (t.llEvLisnrs = {});
  const o = t.tagName === "VIDEO" ? "loadeddata" : "load";
  Fr(t, o, e), Fr(t, "error", r);
}, qt = (t) => {
  if (!fr(t))
    return;
  const e = t.llEvLisnrs;
  for (let r in e) {
    const o = e[r];
    Ei(t, r, o);
  }
  delete t.llEvLisnrs;
}, Bo = (t, e, r) => {
  ci(t), dr(r, -1), hi(r), Se(t, e.class_loading), e.unobserve_completed && Pt(t, r);
}, Ai = (t, e, r, o) => {
  const i = ur(e);
  Bo(e, r, o), ot(e, r.class_loaded), Ke(e, ko), je(r.callback_loaded, e, o), i || zo(r, o);
}, Oi = (t, e, r, o) => {
  const i = ur(e);
  Bo(e, r, o), ot(e, r.class_error), Ke(e, lr), je(r.callback_error, e, o), r.restore_on_error && Re(e, ht), i || zo(r, o);
}, mr = (t, e, r) => {
  const o = $o(t) || t;
  if (fr(o))
    return;
  Ti(o, (n) => {
    Ai(n, t, e, r), qt(o);
  }, (n) => {
    Oi(n, t, e, r), qt(o);
  });
}, Ii = (t, e, r) => {
  li(t), mr(t, e, r), gi(t), _i(t, e, r), ki(t, e, r), Si(t, e, r);
}, Li = (t, e, r) => {
  mr(t, e, r), Ci(t, e, r);
}, gr = (t, e, r) => {
  $i(t) ? Li(t, e, r) : Ii(t, e, r);
}, Pi = (t, e, r) => {
  t.setAttribute("loading", "lazy"), mr(t, e, r), Di(t, e), Ke(t, Do);
}, Yr = (t) => {
  t.removeAttribute(Te), t.removeAttribute(sr), t.removeAttribute(ir);
}, Ni = (t) => {
  hr(t, (e) => {
    Yr(e);
  }), Yr(t);
}, Ro = (t) => {
  hr(t, (e) => {
    Re(e, ht);
  }), Re(t, ht);
}, ji = (t) => {
  Ao(t, (e) => {
    Re(e, Nt);
  }), Re(t, Oo), t.load();
}, Vi = (t) => {
  Re(t, Nt);
}, zi = (t) => {
  Re(t, Io);
}, Bi = {
  IMG: Ro,
  IFRAME: Vi,
  VIDEO: ji,
  OBJECT: zi
}, Ri = (t) => {
  const e = Bi[t.tagName];
  if (!e) {
    vi(t);
    return;
  }
  e(t);
}, Hi = (t, e) => {
  cr(t) || ur(t) || (Se(t, e.class_entered), Se(t, e.class_exited), Se(t, e.class_applied), Se(t, e.class_loading), Se(t, e.class_loaded), Se(t, e.class_error));
}, Ui = (t, e) => {
  Ri(t), Hi(t, e), Lt(t), Po(t);
}, Ki = (t, e, r, o) => {
  !r.cancel_on_exit || !ai(t) || t.tagName === "IMG" && (qt(t), Ni(t), Ro(t), Se(t, r.class_loading), dr(o, -1), Lt(t), je(r.callback_cancel, t, e, o));
}, Fi = (t, e, r, o) => {
  const i = ni(t);
  Ke(t, ri), ot(t, r.class_entered), Se(t, r.class_exited), di(t, r, o), je(r.callback_enter, t, e, o), !i && gr(t, r, o);
}, Yi = (t, e, r, o) => {
  cr(t) || (ot(t, r.class_exited), Ki(t, e, r, o), je(r.callback_exit, t, e, o));
}, Wi = ["IMG", "IFRAME", "VIDEO"], Ho = (t) => t.use_native && "loading" in HTMLImageElement.prototype, Xi = (t, e, r) => {
  t.forEach((o) => {
    Wi.indexOf(o.tagName) !== -1 && Pi(o, e, r);
  }), Eo(r, 0);
}, qi = (t) => t.isIntersecting || t.intersectionRatio > 0, Gi = (t) => ({
  root: t.container === document ? null : t.container,
  rootMargin: t.thresholds || t.threshold + "px"
}), Ji = (t, e, r) => {
  t.forEach(
    (o) => qi(o) ? Fi(o.target, o, e, r) : Yi(o.target, o, e, r)
  );
}, Zi = (t, e) => {
  e.forEach((r) => {
    t.observe(r);
  });
}, Qi = (t, e) => {
  ui(t), Zi(t, e);
}, en = (t, e) => {
  !vo || Ho(t) || (e._observer = new IntersectionObserver((r) => {
    Ji(r, t, e);
  }, Gi(t)));
}, Uo = (t) => Array.prototype.slice.call(t), Tt = (t) => t.container.querySelectorAll(t.elements_selector), tn = (t) => Uo(t).filter(cr), rn = (t) => si(t), on = (t) => Uo(t).filter(rn), Wr = (t, e) => tn(t || Tt(e)), an = (t, e) => {
  on(Tt(t)).forEach((o) => {
    Se(o, t.class_error), Lt(o);
  }), e.update();
}, sn = (t, e) => {
  !Ne || (e._onlineHandler = () => {
    an(t, e);
  }, window.addEventListener("online", e._onlineHandler));
}, nn = (t) => {
  !Ne || window.removeEventListener("online", t._onlineHandler);
}, vt = function(t, e) {
  const r = wo(t);
  this._settings = r, this.loadingCount = 0, en(r, this), sn(r, this), this.update(e);
};
vt.prototype = {
  update: function(t) {
    const e = this._settings, r = Wr(t, e);
    if (Eo(this, r.length), po || !vo) {
      this.loadAll(r);
      return;
    }
    if (Ho(e)) {
      Xi(r, e, this);
      return;
    }
    Qi(this._observer, r);
  },
  destroy: function() {
    this._observer && this._observer.disconnect(), nn(this), Tt(this._settings).forEach((t) => {
      Po(t);
    }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount;
  },
  loadAll: function(t) {
    const e = this._settings;
    Wr(t, e).forEach((o) => {
      Pt(o, this), gr(o, e, this);
    });
  },
  restoreAll: function() {
    const t = this._settings;
    Tt(t).forEach((e) => {
      Ui(e, t);
    });
  }
};
vt.load = (t, e) => {
  const r = wo(e);
  gr(t, r);
};
vt.resetStatus = (t) => {
  Lt(t);
};
Ne && ti(vt, window.lazyLoadOptions);
const ln = { class: "relative flex-auto flex flex-col overflow-hidden" }, cn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, un = { class: "absolute" }, dn = /* @__PURE__ */ d("svg", {
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
], -1), hn = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, fn = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], mn = { class: "grid grid-cols-12 items-center" }, gn = { class: "flex col-span-7 items-center" }, pn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), bn = [
  vn
], yn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xn = [
  wn
], _n = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, kn = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Sn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Dn = { class: "grid grid-cols-12 items-center" }, Cn = { class: "flex col-span-7 items-center" }, Mn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $n = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), En = [
  $n
], Tn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, An = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), On = [
  An
], In = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ln = { class: "col-span-2 text-center" }, Pn = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Nn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], jn = { class: "relative" }, Vn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Bn = [
  zn
], Rn = ["data-src", "alt"], Hn = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Un = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Kn = [
  Un
], Fn = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Yn = { class: "break-all" }, Wn = {
  name: "VFExplorer"
}, Xn = /* @__PURE__ */ Object.assign(Wn, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { setStore: o, getStore: i } = B("storage"), a = (N) => N == null ? void 0 : N.substring(0, 3), n = (N) => N.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), f = L(null), g = L(null), m = L(0), u = L(null), { t: v } = B("i18n"), b = Math.floor(Math.random() * 2 ** 32), T = L(i("full-screen", !1)), k = new vt();
    r.on("vf-fullscreen-toggle", () => {
      T.value = !T.value, o("full-screen", T.value);
    });
    const S = L("");
    r.on("vf-search-query", ({ newQuery: N }) => {
      S.value = N, N ? r.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: N
        },
        onSuccess: (R) => {
          R.files.length || r.emit("vf-toast-push", { label: v("No search result found.") });
        }
      }) : r.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let P = null;
    const F = () => {
      P && clearTimeout(P);
    }, H = (N) => {
      P = setTimeout(() => {
        const R = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: N.target.getBoundingClientRect().x,
          clientY: N.target.getBoundingClientRect().y
        });
        N.target.dispatchEvent(R);
      }, 500);
    }, j = (N) => {
      N.type == "dir" ? (r.emit("vf-search-exit"), r.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: N.path } })) : r.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: N });
    }, V = Mt({ active: !1, column: "", order: "" }), W = (N = !0) => {
      let R = [...e.data.files], O = V.column, X = V.order == "asc" ? 1 : -1;
      if (!N)
        return R;
      const q = (ue, ee) => typeof ue == "string" && typeof ee == "string" ? ue.toLowerCase().localeCompare(ee.toLowerCase()) : ue < ee ? -1 : ue > ee ? 1 : 0;
      return V.active && (R = R.slice().sort((ue, ee) => q(ue[O], ee[O]) * X)), R;
    }, M = (N) => {
      V.active && V.column == N ? (V.active = V.order == "asc", V.column = N, V.order = "desc") : (V.active = !0, V.column = N, V.order = "asc");
    }, K = () => u.value.getSelection().map((N) => JSON.parse(N.dataset.item)), Q = (N, R) => {
      if (N.altKey || N.ctrlKey || N.metaKey)
        return N.preventDefault(), !1;
      N.dataTransfer.setDragImage(g.value, 0, 15), N.dataTransfer.effectAllowed = "all", N.dataTransfer.dropEffect = "copy", N.dataTransfer.setData("items", JSON.stringify(K()));
    }, ce = (N, R) => {
      N.preventDefault();
      let O = JSON.parse(N.dataTransfer.getData("items"));
      if (O.find((X) => X.storage != i("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      r.emit("vf-modal-show", { type: "move", items: { from: O, to: R } });
    }, he = (N, R) => {
      N.preventDefault(), !R || R.type !== "dir" || u.value.getSelection().find((O) => O == N.currentTarget) ? (N.dataTransfer.dropEffect = "none", N.dataTransfer.effectAllowed = "none") : N.dataTransfer.dropEffect = "copy";
    };
    return ke(() => {
      u.value = new Hs({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), r.on("vf-explorer-update", () => It(() => {
        u.value.clearSelection(), u.value.setSelectables(document.getElementsByClassName("vf-item-" + b));
      })), u.value.subscribe("predragstart", ({ event: N, isDragging: R }) => {
        if (R)
          m.value = u.value.getSelection().length, u.value.break();
        else {
          const O = N.target.offsetWidth - N.offsetX, X = N.target.offsetHeight - N.offsetY;
          O < 15 && X < 15 && (u.value.clearSelection(), u.value.break());
        }
      }), u.value.subscribe("predragmove", ({ isDragging: N }) => {
        N && u.value.break();
      }), u.value.subscribe("callback", ({ items: N, event: R, isDragging: O }) => {
        r.emit("vf-nodes-selected", K()), m.value = u.value.getSelection().length;
      });
    }), Wa(() => {
      u.value.Area.reset(), u.value.SelectorArea.updatePos(), k.update();
    }), ke(() => {
      Ot(() => e.view, () => r.emit("vf-explorer-update"));
    }), (N, R) => (y(), C("div", ln, [
      t.view == "list" || S.value.length ? (y(), C("div", cn, [
        d("div", {
          onClick: R[0] || (R[0] = (O) => M("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          ie(E(x(v)("Name")) + " ", 1),
          ye(_e(kt, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [_t, V.active && V.column == "basename"]
          ])
        ]),
        S.value.length ? G("", !0) : (y(), C("div", {
          key: 0,
          onClick: R[1] || (R[1] = (O) => M("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          ie(E(x(v)("Size")) + " ", 1),
          ye(_e(kt, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [_t, V.active && V.column == "file_size"]
          ])
        ])),
        S.value.length ? G("", !0) : (y(), C("div", {
          key: 1,
          onClick: R[2] || (R[2] = (O) => M("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          ie(E(x(v)("Date")) + " ", 1),
          ye(_e(kt, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [_t, V.active && V.column == "last_modified"]
          ])
        ])),
        S.value.length ? (y(), C("div", {
          key: 2,
          onClick: R[3] || (R[3] = (O) => M("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          ie(E(x(v)("Filepath")) + " ", 1),
          ye(_e(kt, {
            direction: V.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [_t, V.active && V.column == "path"]
          ])
        ])) : G("", !0)
      ])) : G("", !0),
      d("div", un, [
        d("div", {
          ref_key: "dragImage",
          ref: g,
          class: "absolute -z-50 -top-96"
        }, [
          dn,
          d("div", hn, E(m.value), 1)
        ], 512)
      ]),
      d("div", {
        onContextmenu: R[10] || (R[10] = Be((O) => x(r).emit("vf-contextmenu-show", { event: O, area: f.value, items: K() }), ["self", "prevent"])),
        class: de([T.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f
      }, [
        S.value.length ? (y(!0), C(le, { key: 0 }, we(W(), (O, X) => (y(), C("div", {
          onDblclick: (q) => j(O),
          onTouchstart: R[4] || (R[4] = (q) => H(q)),
          onTouchend: R[5] || (R[5] = (q) => F()),
          onContextmenu: Be((q) => x(r).emit("vf-contextmenu-show", { event: q, area: f.value, items: K(), target: O }), ["prevent"]),
          class: de(["vf-item-" + x(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": O.type,
          "data-item": JSON.stringify(O),
          "data-index": X
        }, [
          d("div", mn, [
            d("div", gn, [
              O.type == "dir" ? (y(), C("svg", pn, bn)) : (y(), C("svg", yn, xn)),
              d("span", _n, E(O.basename), 1)
            ]),
            d("div", kn, E(O.path), 1)
          ])
        ], 42, fn))), 256)) : G("", !0),
        t.view == "list" && !S.value.length ? (y(!0), C(le, { key: 1 }, we(W(), (O, X) => (y(), C("div", {
          draggable: "true",
          onDblclick: (q) => j(O),
          onTouchstart: R[6] || (R[6] = (q) => H(q)),
          onTouchend: R[7] || (R[7] = (q) => F()),
          onContextmenu: Be((q) => x(r).emit("vf-contextmenu-show", { event: q, area: f.value, items: K(), target: O }), ["prevent"]),
          onDragstart: (q) => Q(q),
          onDragover: (q) => he(q, O),
          onDrop: (q) => ce(q, O),
          class: de(["vf-item-" + x(b), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": O.type,
          "data-item": JSON.stringify(O),
          "data-index": X
        }, [
          d("div", Dn, [
            d("div", Cn, [
              O.type == "dir" ? (y(), C("svg", Mn, En)) : (y(), C("svg", Tn, On)),
              d("span", In, E(O.basename), 1)
            ]),
            d("div", Ln, E(O.file_size ? x(mo)(O.file_size) : ""), 1),
            d("div", Pn, E(x(go)(O.last_modified)), 1)
          ])
        ], 42, Sn))), 256)) : G("", !0),
        t.view == "grid" && !S.value.length ? (y(!0), C(le, { key: 2 }, we(W(!1), (O, X) => {
          var q, ue;
          return y(), C("div", {
            draggable: "true",
            onDblclick: (ee) => j(O),
            onTouchstart: R[8] || (R[8] = (ee) => H(ee)),
            onTouchend: R[9] || (R[9] = (ee) => F()),
            onContextmenu: Be((ee) => x(r).emit("vf-contextmenu-show", { event: ee, area: f.value, items: K(), target: O }), ["prevent"]),
            onDragstart: (ee) => Q(ee),
            onDragover: (ee) => he(ee, O),
            onDrop: (ee) => ce(ee, O),
            class: de(["vf-item-" + x(b), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
            "data-type": O.type,
            "data-item": JSON.stringify(O),
            "data-index": X
          }, [
            d("div", null, [
              d("div", jn, [
                O.type == "dir" ? (y(), C("svg", Vn, Bn)) : ((q = O.mime_type) != null ? q : "").startsWith("image") ? (y(), C("img", {
                  key: 1,
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": x(Xt)(x(i)("adapter", e.data.adapter), O.path),
                  alt: O.basename
                }, null, 8, Rn)) : (y(), C("svg", Hn, Kn)),
                !((ue = O.mime_type) != null ? ue : "").startsWith("image") && O.type != "dir" ? (y(), C("div", Fn, E(a(O.extension)), 1)) : G("", !0)
              ]),
              d("span", Yn, E(n(O.basename)), 1)
            ])
          ], 42, Nn);
        }), 256)) : G("", !0)
      ], 34),
      _e(Zs)
    ]));
  }
}), qn = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Gn = { class: "flex leading-5 items-center" }, Jn = ["aria-label"], Zn = /* @__PURE__ */ d("svg", {
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
], -1), Qn = [
  Zn
], el = ["value"], tl = { class: "ml-3" }, rl = { key: 0 }, ol = { class: "ml-1" }, al = { class: "flex leading-5 items-center" }, sl = {
  value: "",
  disabled: ""
}, il = /* @__PURE__ */ d("option", { value: "en" }, "English", -1), nl = /* @__PURE__ */ d("option", { value: "fr" }, "French", -1), ll = /* @__PURE__ */ d("option", { value: "tr" }, "Turkish", -1), cl = ["aria-label"], ul = /* @__PURE__ */ d("svg", {
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
], -1), dl = [
  ul
], hl = {
  name: "VFStatusbar"
}, fl = /* @__PURE__ */ Object.assign(hl, {
  props: {
    data: Object
  },
  setup(t) {
    var b;
    const e = t, r = B("emitter"), { getStore: o, setStore: i } = B("storage"), a = L(0), n = L((b = o("adapter")) != null ? b : e.data.adapter), { t: f, changeLocale: g } = B("i18n"), m = L(o("locale", "")), u = () => {
      r.emit("vf-search-exit"), r.emit("vf-fetch", { params: { q: "index", adapter: n.value } }), i("adapter", n.value);
    };
    r.on("vf-nodes-selected", (T) => {
      a.value = T.length;
    });
    const v = L("");
    return r.on("vf-search-query", ({ newQuery: T }) => {
      v.value = T;
    }), (T, k) => (y(), C("div", qn, [
      d("div", Gn, [
        d("div", {
          class: "mx-2",
          "aria-label": x(f)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Qn, 8, Jn),
        ye(d("select", {
          "onUpdate:modelValue": k[0] || (k[0] = (S) => n.value = S),
          onChange: u,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (y(!0), C(le, null, we(t.data.storages, (S) => (y(), C("option", { value: S }, E(S), 9, el))), 256))
        ], 544), [
          [Rr, n.value]
        ]),
        d("div", tl, [
          v.value.length ? (y(), C("span", rl, E(t.data.files.length) + " items found. ", 1)) : G("", !0),
          d("span", ol, E(a.value > 0 ? a.value + " " + x(f)("item(s) selected.") : ""), 1)
        ])
      ]),
      d("div", al, [
        ye(d("select", {
          "onUpdate:modelValue": k[1] || (k[1] = (S) => m.value = S),
          onChange: k[2] || (k[2] = (S) => x(g)(S.target.value)),
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          d("option", sl, E(x(f)("Language")), 1),
          il,
          nl,
          ll
        ], 544), [
          [Rr, m.value]
        ]),
        d("span", {
          "aria-label": x(f)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: k[3] || (k[3] = (S) => x(r).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: x(f)("Vuefinder is a file manager component for vue 3.") }))
        }, dl, 8, cl)
      ])
    ]));
  }
}), ml = (t, e = 0, r = !1) => {
  let o;
  return (...i) => {
    r && !o && t(...i), clearTimeout(o), o = setTimeout(() => {
      t(...i);
    }, e);
  };
}, gl = (t, e, r) => {
  const o = L(t);
  return Xa((a, n) => ({
    get() {
      return a(), o.value;
    },
    set: ml(
      (f) => {
        o.value = f, n();
      },
      e,
      r
    )
  }));
}, pl = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, vl = ["aria-label"], bl = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), yl = [
  bl
], wl = ["aria-label"], xl = /* @__PURE__ */ d("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), _l = [
  xl
], kl = {
  key: 1,
  "aria-label": "Cancel",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, Sl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Dl = [
  Sl
], Cl = ["onClick"], Ml = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), $l = [
  Ml
], El = { class: "flex leading-5" }, Tl = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Al = ["title", "onClick"], Ol = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Il = /* @__PURE__ */ d("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Ll = /* @__PURE__ */ d("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), Pl = [
  Il,
  Ll
], Nl = {
  key: 3,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, jl = /* @__PURE__ */ d("svg", {
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
], -1), Vl = ["onKeydown", "placeholder"], zl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Bl = [
  zl
], Rl = {
  name: "VFBreadcrumb"
}, Hl = /* @__PURE__ */ Object.assign(Rl, {
  props: {
    data: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { getStore: o } = B("storage"), i = L(null), a = L([]), n = L(!1), f = L(null), { t: g } = B("i18n"), m = B("loadingState");
    r.on("vf-explorer-update", () => {
      var V;
      let H = [], j = [];
      i.value = (V = e.data.dirname) != null ? V : o("adapter", "local") + "://", i.value.length == 0 && (a.value = []), i.value.replace(o("adapter", "local") + "://", "").split("/").forEach(function(W) {
        H.push(W), H.join("/") != "" && j.push({
          basename: W,
          name: W,
          path: o("adapter", "local") + "://" + H.join("/"),
          type: "dir"
        });
      }), j.length > 4 && (j = j.slice(-5), j[0].name = ".."), a.value = j;
    });
    const u = () => {
      n.value = !1, b.value = "";
    };
    r.on("vf-search-exit", () => {
      u();
    });
    const v = () => {
      n.value = !0, It(() => f.value.focus());
    }, b = gl("", 400), T = () => m.value;
    Ot(b, (H) => {
      r.emit("vf-toast-clear"), r.emit("vf-search-query", { newQuery: H });
    });
    const k = () => a.value.length && !n.value, S = (H) => {
      var V;
      H.preventDefault();
      let j = JSON.parse(H.dataTransfer.getData("items"));
      if (j.find((W) => W.storage != o("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      r.emit("vf-modal-show", {
        type: "move",
        items: { from: j, to: (V = a.value[a.value.length - 2]) != null ? V : { path: o("adapter", "local") + "://" } }
      });
    }, P = (H) => {
      H.preventDefault(), k() ? H.dataTransfer.dropEffect = "copy" : (H.dataTransfer.dropEffect = "none", H.dataTransfer.effectAllowed = "none");
    }, F = () => {
      b.value == "" && u();
    };
    return (H, j) => (y(), C("div", pl, [
      d("span", {
        "aria-label": x(g)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), C("svg", {
          onDragover: j[0] || (j[0] = (V) => P(V)),
          onDrop: j[1] || (j[1] = (V) => S(V)),
          onClick: j[2] || (j[2] = (V) => {
            var W, M;
            return !k() || x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: (M = (W = a.value[a.value.length - 2]) == null ? void 0 : W.path) != null ? M : x(o)("adapter", "local") + "://" } });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", k() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, yl, 34))
      ], 8, vl),
      T() ? (y(), C("span", kl, [
        (y(), C("svg", {
          onClick: j[4] || (j[4] = (V) => x(r).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, Dl))
      ])) : (y(), C("span", {
        key: 0,
        "aria-label": x(g)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (y(), C("svg", {
          onClick: j[3] || (j[3] = (V) => {
            x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: t.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, _l))
      ], 8, wl)),
      n.value ? (y(), C("div", Nl, [
        jl,
        ye(d("input", {
          ref_key: "searchInput",
          ref: f,
          onKeydown: tt(u, ["esc"]),
          onBlur: F,
          "onUpdate:modelValue": j[6] || (j[6] = (V) => qa(b) ? b.value = V : null),
          placeholder: x(g)("Search anything.."),
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Vl), [
          [rt, x(b)]
        ]),
        (y(), C("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: u,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, Bl))
      ])) : (y(), C("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Be(v, ["self"])
      }, [
        (y(), C("svg", {
          onClick: j[5] || (j[5] = (V) => x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, $l)),
        d("div", El, [
          (y(!0), C(le, null, we(a.value, (V, W) => (y(), C("div", { key: W }, [
            Tl,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: V.basename,
              onClick: (M) => x(r).emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: V.path } })
            }, E(V.name), 9, Al)
          ]))), 128))
        ]),
        T() ? (y(), C("svg", Ol, Pl)) : G("", !0)
      ], 8, Cl))
    ]));
  }
}), Ul = ["onClick"], Kl = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), Fl = {
  name: "VFContextMenu"
}, Yl = /* @__PURE__ */ Object.assign(Fl, {
  props: {
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), o = L(null), { apiUrl: i } = Me(), a = Mt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), n = L([]);
    r.on("vf-context-selected", (b) => {
      n.value = b;
    });
    const { t: f } = B("i18n"), g = {
      newfolder: {
        title: () => f("New Folder"),
        action: () => {
          r.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => f("Delete"),
        action: () => {
          r.emit("vf-modal-show", { type: "delete", items: n });
        }
      },
      refresh: {
        title: () => f("Refresh"),
        action: () => {
          r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
        }
      },
      preview: {
        title: () => f("Preview"),
        action: () => {
          r.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: n.value[0] });
        }
      },
      open: {
        title: () => f("Open"),
        action: () => {
          r.emit("vf-search-exit"), r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: n.value[0].path } });
        }
      },
      openDir: {
        title: () => f("Open containing folder"),
        action: () => {
          r.emit("vf-search-exit"), r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: n.value[0].dir } });
        }
      },
      download: {
        title: () => f("Download"),
        action: () => {
          const b = i.value + "?" + Ue({ q: "download", adapter: e.current.adapter, path: n.value[0].path });
          r.emit("vf-download", b);
        }
      },
      archive: {
        title: () => f("Archive"),
        action: () => {
          r.emit("vf-modal-show", { type: "archive", items: n });
        }
      },
      unarchive: {
        title: () => f("Unarchive"),
        action: () => {
          r.emit("vf-modal-show", { type: "unarchive", items: n });
        }
      },
      rename: {
        title: () => f("Rename"),
        action: () => {
          r.emit("vf-modal-show", { type: "rename", items: n });
        }
      }
    }, m = (b) => {
      r.emit("vf-contextmenu-hide"), b.action();
    }, u = L("");
    r.on("vf-search-query", ({ newQuery: b }) => {
      u.value = b;
    }), r.on("vf-contextmenu-show", ({ event: b, area: T, items: k, target: S = null }) => {
      if (a.items = [], u.value)
        if (S)
          a.items.push(g.openDir), r.emit("vf-context-selected", [S]);
        else
          return;
      else
        !S && !u.value ? (a.items.push(g.refresh), a.items.push(g.newfolder), r.emit("vf-context-selected", [])) : k.length > 1 && k.some((P) => P.path === S.path) ? (a.items.push(g.refresh), a.items.push(g.archive), a.items.push(g.delete), r.emit("vf-context-selected", k)) : (S.type == "dir" ? a.items.push(g.open) : (a.items.push(g.preview), a.items.push(g.download)), a.items.push(g.rename), S.mime_type == "application/zip" ? a.items.push(g.unarchive) : a.items.push(g.archive), a.items.push(g.delete), r.emit("vf-context-selected", [S]));
      v(b, T);
    }), r.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const v = (b, T) => {
      a.active = !0, It(() => {
        let k = T.getBoundingClientRect(), S = b.pageX, P = b.pageY, F = o.value.offsetHeight, H = o.value.offsetWidth;
        S = k.right - b.pageX + window.scrollX < H ? S - H : S, P = k.bottom - b.pageY + window.scrollY < F ? P - F : P, a.positions = {
          left: S + "px",
          top: P + "px"
        };
      });
    };
    return (b, T) => a.active ? (y(), C("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: o,
      style: ho(a.positions)
    }, [
      (y(!0), C(le, null, we(a.items, (k) => (y(), C("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: k.title,
        onClick: (S) => m(k)
      }, [
        Kl,
        d("span", null, E(k.title()), 1)
      ], 8, Ul))), 128))
    ], 4)) : G("", !0);
  }
}), Wl = (t, e) => {
  const r = t[e];
  return r ? typeof r == "function" ? r() : Promise.resolve(r) : new Promise((o, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function Xl(t) {
  const e = await Wl(/* @__PURE__ */ Object.assign({ "../locales/en.json": () => import("./en.4dabcb3e.js"), "../locales/tr.json": () => import("./tr.f45cbe8b.js") }), `../locales/${t}.json`);
  return JSON.parse(e.default);
}
function ql(t, e, r) {
  const { getStore: o, setStore: i } = Wt(t), a = ["en", "tr"], n = L({}), f = (u) => {
    a.includes(u) || (r.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u = "en"), Xl(u).then((v) => {
      n.value = v, i("locale", u), i("translations", v), r.emit("vf-toast-push", { label: "The language is set to " + u });
    });
  };
  o("locale") ? n.value = o("translations") : f(e);
  const g = (u, ...v) => v.length ? g(u = u.replace("%s", v.shift()), ...v) : u;
  function m(u, ...v) {
    return n.value.hasOwnProperty(u) ? g(n.value[u], ...v) : u;
  }
  return { t: m, support_locales: a, changeLocale: f };
}
const Gl = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Jl = {
  name: "VueFinder"
}, Zl = /* @__PURE__ */ Object.assign(Jl, {
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
  setup(t) {
    const e = t, r = Ja(), { setStore: o, getStore: i } = Wt(e.id);
    it("emitter", r), it("storage", Wt(e.id)), it("postData", e.postData);
    const a = ql(e.id, e.locale, r);
    it("i18n", a);
    const { apiUrl: n, setApiUrl: f } = Me();
    f(e.url);
    const g = Mt({ adapter: "local", storages: [], dirname: ".", files: [] }), m = L(i("viewport", "grid")), u = L(i("darkMode", e.dark));
    r.on("vf-darkMode-toggle", () => {
      u.value = !u.value, o("darkMode", u.value);
    });
    const v = L(!1);
    it("loadingState", v);
    const b = L(i("full-screen", !1));
    r.on("vf-fullscreen-toggle", () => {
      b.value = !b.value, o("full-screen", b.value);
    }), r.on("vf-view-toggle", (P) => {
      m.value = P;
    });
    const T = Mt({
      active: !1,
      type: "delete",
      data: {}
    });
    r.on("vf-modal-close", () => {
      T.active = !1;
    }), r.on("vf-modal-show", (P) => {
      T.active = !0, T.type = P.type, T.data = P;
    });
    const k = (P) => {
      Object.assign(g, P), r.emit("vf-nodes-selected", {}), r.emit("vf-explorer-update");
    };
    let S;
    return r.on("vf-fetch-abort", () => {
      S.abort(), v.value = !1;
    }), r.on("vf-fetch", ({ params: P, onSuccess: F = null, onError: H = null }) => {
      ["index", "search"].includes(P.q) && (S && S.abort(), v.value = !0), S = new AbortController();
      const j = S.signal;
      Et(n.value, { params: P, signal: j }).then((V) => {
        ["index", "search"].includes(P.q) && (v.value = !1), r.emit("vf-modal-close"), k(V), F(V);
      }).catch((V) => {
        H && H(V);
      }).finally(() => {
      });
    }), r.on("vf-download", (P) => {
      document.getElementById("download_frame").src = P, r.emit("vf-modal-close");
    }), ke(() => {
      r.emit("vf-fetch", { params: { q: "index", adapter: i("adapter", g.adapter) } });
    }), (P, F) => (y(), C("div", {
      class: de(["vuefinder", u.value ? "dark" : ""])
    }, [
      d("div", {
        class: de([b.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        style: ho(b.value ? "" : "max-height: " + t.maxHeight),
        onMousedown: F[0] || (F[0] = (H) => x(r).emit("vf-contextmenu-hide")),
        onTouchstart: F[1] || (F[1] = (H) => x(r).emit("vf-contextmenu-hide"))
      }, [
        _e(Bs, { data: g }, null, 8, ["data"]),
        _e(Hl, { data: g }, null, 8, ["data"]),
        _e(Xn, {
          view: m.value,
          data: g
        }, null, 8, ["view", "data"]),
        _e(fl, { data: g }, null, 8, ["data"])
      ], 38),
      T.active ? (y(), Z(Ga("v-f-modal-" + T.type), {
        key: 0,
        selection: T.data,
        current: g
      }, null, 8, ["selection", "current"])) : G("", !0),
      _e(Yl, { current: g }, null, 8, ["current"]),
      Gl
    ], 2));
  }
}), Ql = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), ec = { class: "fixed z-10 inset-0 overflow-y-auto w-screen h-screen" }, tc = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, rc = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, oc = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, $e = {
  __name: "ModalLayout",
  setup(t) {
    const e = B("emitter");
    return ke(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus();
    }), (r, o) => (y(), C("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = tt((i) => x(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Ql,
      d("div", ec, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = Be((i) => x(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", tc, [
            d("div", rc, [
              Yt(r.$slots, "default")
            ]),
            d("div", oc, [
              Yt(r.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, ac = ["aria-label"], sc = /* @__PURE__ */ d("svg", {
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
], -1), ic = [
  sc
], nc = {
  name: "Message"
}, Ee = /* @__PURE__ */ Object.assign(nc, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var f;
    const { t: r } = B("i18n"), o = L(!1), i = L(null), a = L((f = i.value) == null ? void 0 : f.strMessage);
    Ot(a, () => o.value = !1);
    const n = () => {
      e("hidden"), o.value = !0;
    };
    return (g, m) => (y(), C("div", null, [
      o.value ? G("", !0) : (y(), C("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: de(["flex mt-1 p-1 px-2 rounded text-sm", t.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"])
      }, [
        Yt(g.$slots, "default"),
        d("div", {
          class: "ml-auto cursor-pointer",
          onClick: n,
          "aria-label": x(r)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, ic, 8, ac)
      ], 2))
    ]));
  }
}), lc = { class: "sm:flex sm:items-start" }, cc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), uc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, dc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, hc = { class: "mt-2" }, fc = { class: "text-sm text-gray-500" }, mc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, gc = {
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
}, null, -1), vc = [
  pc
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
], xc = { class: "ml-1.5" }, _c = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, kc = {
  name: "VFModalDelete"
}, Sc = /* @__PURE__ */ Object.assign(kc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { getStore: o } = B("storage"), { t: i } = B("i18n"), a = L(e.selection.items), n = L(""), f = () => {
      a.value.length && r.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(a.value.map(({ path: g, type: m }) => ({ path: g, type: m })))
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("Files deleted.") });
        },
        onError: (g) => {
          n.value = i(g.message);
        }
      });
    };
    return (g, m) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (u) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1),
        d("div", _c, E(x(i)("This action cannot be undone.")), 1)
      ]),
      default: J(() => [
        d("div", lc, [
          cc,
          d("div", uc, [
            d("h3", dc, E(x(i)("Delete files")), 1),
            d("div", hc, [
              d("p", fc, E(x(i)("Are you sure you want to delete these files?")), 1),
              (y(!0), C(le, null, we(a.value, (u) => (y(), C("p", mc, [
                u.type == "dir" ? (y(), C("svg", gc, vc)) : (y(), C("svg", bc, wc)),
                d("span", xc, E(u.basename), 1)
              ]))), 256)),
              n.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: m[0] || (m[0] = (u) => n.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(n.value), 1)
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
}), Dc = { class: "sm:flex sm:items-start" }, Cc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Mc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, $c = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ec = { class: "mt-2" }, Tc = { class: "text-sm text-gray-500" }, Ac = {
  name: "VFModalMessage"
}, Oc = /* @__PURE__ */ Object.assign(Ac, {
  props: {
    selection: Object
  },
  setup(t) {
    const e = B("emitter"), { t: r } = B("i18n");
    return (o, i) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: i[0] || (i[0] = (a) => x(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(r)("Close")), 1)
      ]),
      default: J(() => {
        var a, n, f, g;
        return [
          d("div", Dc, [
            Cc,
            d("div", Mc, [
              d("h3", $c, E((n = (a = t.selection) == null ? void 0 : a.title) != null ? n : "Title"), 1),
              d("div", Ec, [
                d("p", Tc, E((g = (f = t.selection) == null ? void 0 : f.message) != null ? g : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Ic = { class: "sm:flex sm:items-start" }, Lc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Pc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, jc = { class: "mt-2" }, Vc = { class: "text-sm text-gray-500" }, zc = ["onKeyup", "placeholder"], Bc = {
  name: "VFModalNewFolder"
}, Rc = /* @__PURE__ */ Object.assign(Bc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { getStore: o } = B("storage"), { t: i } = B("i18n"), a = L(""), n = L(""), f = () => {
      a.value != "" && r.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("%s is created.", a.value) });
        },
        onError: (g) => {
          n.value = i(g.message);
        }
      });
    };
    return (g, m) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Create")), 1),
        d("button", {
          type: "button",
          onClick: m[2] || (m[2] = (u) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Ic, [
          Lc,
          d("div", Pc, [
            d("h3", Nc, E(x(i)("New Folder")), 1),
            d("div", jc, [
              d("p", Vc, E(x(i)("Create a new folder")), 1),
              ye(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (u) => a.value = u),
                onKeyup: tt(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(i)("Folder Name"),
                type: "text"
              }, null, 40, zc), [
                [rt, a.value]
              ]),
              n.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: m[1] || (m[1] = (u) => n.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(n.value), 1)
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
}), Hc = { class: "sm:flex sm:items-start" }, Uc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Kc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Fc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Yc = { class: "mt-2" }, Wc = { class: "text-sm text-gray-500" }, Xc = ["onKeyup", "placeholder"], qc = {
  name: "VFModalNewFile"
}, Gc = /* @__PURE__ */ Object.assign(qc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { getStore: o } = B("storage"), { t: i } = B("i18n"), a = L(""), n = L(""), f = () => {
      a.value != "" && r.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          name: a.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("%s is created.", a.value) });
        },
        onError: (g) => {
          n.value = i(g.message);
        }
      });
    };
    return (g, m) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: m[2] || (m[2] = (u) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: J(() => [
        d("div", Hc, [
          Uc,
          d("div", Kc, [
            d("h3", Fc, E(x(i)("New File")), 1),
            d("div", Yc, [
              d("p", Wc, E(x(i)("Create a new file")), 1),
              ye(d("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (u) => a.value = u),
                onKeyup: tt(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(i)("File Name"),
                type: "text"
              }, null, 40, Xc), [
                [rt, a.value]
              ]),
              n.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: m[1] || (m[1] = (u) => n.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(n.value), 1)
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
}), Jc = { class: "flex" }, Zc = ["aria-label"], Qc = { class: "ml-auto mb-2" }, eu = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, tu = { key: 1 }, ru = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, o = L(""), i = L(""), a = L(null), n = L(!1), { apiUrl: f } = Me(), g = L(""), m = L(!1), { t: u } = B("i18n");
    ke(() => {
      Et(f.value, {
        params: { q: "preview", adapter: r.selection.adapter, path: r.selection.item.path },
        json: !1
      }).then((k) => {
        o.value = k, e("load");
      });
    });
    const v = () => {
      n.value = !n.value, i.value = o.value, n.value == !0 && It(() => {
        a.value.focus();
      });
    }, b = B("postData"), T = () => {
      g.value = "", m.value = !1, Et(f.value, {
        method: "POST",
        params: Object.assign(b, {
          q: "save",
          adapter: r.selection.adapter,
          path: r.selection.item.path,
          content: i.value
        }),
        json: !1
      }).then((k) => {
        g.value = u("Updated."), o.value = k, e("load"), n.value = !n.value;
      }).catch((k) => {
        g.value = u(k.message), m.value = !0;
      });
    };
    return (k, S) => (y(), C(le, null, [
      d("div", Jc, [
        d("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(t.selection.item.basename), 9, Zc),
        d("div", Qc, [
          n.value ? (y(), C("button", {
            key: 0,
            onClick: T,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(x(u)("Save")), 1)) : G("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: S[0] || (S[0] = (P) => v())
          }, E(n.value ? x(u)("Cancel") : x(u)("Edit")), 1)
        ])
      ]),
      d("div", null, [
        n.value ? (y(), C("div", tu, [
          ye(d("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": S[1] || (S[1] = (P) => i.value = P),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [rt, i.value]
          ])
        ])) : (y(), C("pre", eu, E(o.value), 1)),
        g.value.length ? (y(), Z(Ee, {
          key: 2,
          onHidden: S[2] || (S[2] = (P) => g.value = ""),
          error: m.value
        }, {
          default: J(() => [
            ie(E(g.value), 1)
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
function Xr(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function Ko(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Xr(Object(r), !0).forEach(function(o) {
      su(t, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Xr(Object(r)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return t;
}
function Ct(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ct = function(e) {
    return typeof e;
  } : Ct = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ct(t);
}
function ou(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function qr(t, e) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
  }
}
function au(t, e, r) {
  return e && qr(t.prototype, e), r && qr(t, r), t;
}
function su(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Fo(t) {
  return iu(t) || nu(t) || lu(t) || cu();
}
function iu(t) {
  if (Array.isArray(t))
    return Gt(t);
}
function nu(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function lu(t, e) {
  if (!!t) {
    if (typeof t == "string")
      return Gt(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Gt(t, e);
  }
}
function Gt(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, o = new Array(e); r < e; r++)
    o[r] = t[r];
  return o;
}
function cu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Vt = typeof window < "u" && typeof window.document < "u", Ce = Vt ? window : {}, pr = Vt && Ce.document.documentElement ? "ontouchstart" in Ce.document.documentElement : !1, vr = Vt ? "PointerEvent" in Ce : !1, te = "cropper", br = "all", Yo = "crop", Wo = "move", Xo = "zoom", Ve = "e", ze = "w", qe = "s", Oe = "n", nt = "ne", lt = "nw", ct = "se", ut = "sw", Jt = "".concat(te, "-crop"), Gr = "".concat(te, "-disabled"), me = "".concat(te, "-hidden"), Jr = "".concat(te, "-hide"), uu = "".concat(te, "-invisible"), At = "".concat(te, "-modal"), Zt = "".concat(te, "-move"), ft = "".concat(te, "Action"), St = "".concat(te, "Preview"), yr = "crop", qo = "move", Go = "none", Qt = "crop", er = "cropend", tr = "cropmove", rr = "cropstart", Zr = "dblclick", du = pr ? "touchstart" : "mousedown", hu = pr ? "touchmove" : "mousemove", fu = pr ? "touchend touchcancel" : "mouseup", Qr = vr ? "pointerdown" : du, eo = vr ? "pointermove" : hu, to = vr ? "pointerup pointercancel" : fu, ro = "ready", oo = "resize", ao = "wheel", or = "zoom", so = "image/jpeg", mu = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, gu = /^data:/, pu = /^data:image\/jpeg;base64,/, vu = /^img|canvas$/i, Jo = 200, Zo = 100, io = {
  viewMode: 0,
  dragMode: yr,
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
  minContainerWidth: Jo,
  minContainerHeight: Zo,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, bu = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', yu = Number.isNaN || Ce.isNaN;
function Y(t) {
  return typeof t == "number" && !yu(t);
}
var no = function(e) {
  return e > 0 && e < 1 / 0;
};
function Ut(t) {
  return typeof t > "u";
}
function He(t) {
  return Ct(t) === "object" && t !== null;
}
var wu = Object.prototype.hasOwnProperty;
function Ge(t) {
  if (!He(t))
    return !1;
  try {
    var e = t.constructor, r = e.prototype;
    return e && r && wu.call(r, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function fe(t) {
  return typeof t == "function";
}
var xu = Array.prototype.slice;
function Qo(t) {
  return Array.from ? Array.from(t) : xu.call(t);
}
function se(t, e) {
  return t && fe(e) && (Array.isArray(t) || Y(t.length) ? Qo(t).forEach(function(r, o) {
    e.call(t, r, o, t);
  }) : He(t) && Object.keys(t).forEach(function(r) {
    e.call(t, t[r], r, t);
  })), t;
}
var re = Object.assign || function(e) {
  for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
    o[i - 1] = arguments[i];
  return He(e) && o.length > 0 && o.forEach(function(a) {
    He(a) && Object.keys(a).forEach(function(n) {
      e[n] = a[n];
    });
  }), e;
}, _u = /\.\d*(?:0|9){12}\d*$/;
function Ze(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return _u.test(t) ? Math.round(t * e) / e : t;
}
var ku = /^width|height|left|top|marginLeft|marginTop$/;
function Ie(t, e) {
  var r = t.style;
  se(e, function(o, i) {
    ku.test(i) && Y(o) && (o = "".concat(o, "px")), r[i] = o;
  });
}
function Su(t, e) {
  return t.classList ? t.classList.contains(e) : t.className.indexOf(e) > -1;
}
function ne(t, e) {
  if (!!e) {
    if (Y(t.length)) {
      se(t, function(o) {
        ne(o, e);
      });
      return;
    }
    if (t.classList) {
      t.classList.add(e);
      return;
    }
    var r = t.className.trim();
    r ? r.indexOf(e) < 0 && (t.className = "".concat(r, " ").concat(e)) : t.className = e;
  }
}
function De(t, e) {
  if (!!e) {
    if (Y(t.length)) {
      se(t, function(r) {
        De(r, e);
      });
      return;
    }
    if (t.classList) {
      t.classList.remove(e);
      return;
    }
    t.className.indexOf(e) >= 0 && (t.className = t.className.replace(e, ""));
  }
}
function Je(t, e, r) {
  if (!!e) {
    if (Y(t.length)) {
      se(t, function(o) {
        Je(o, e, r);
      });
      return;
    }
    r ? ne(t, e) : De(t, e);
  }
}
var Du = /([a-z\d])([A-Z])/g;
function wr(t) {
  return t.replace(Du, "$1-$2").toLowerCase();
}
function ar(t, e) {
  return He(t[e]) ? t[e] : t.dataset ? t.dataset[e] : t.getAttribute("data-".concat(wr(e)));
}
function mt(t, e, r) {
  He(r) ? t[e] = r : t.dataset ? t.dataset[e] = r : t.setAttribute("data-".concat(wr(e)), r);
}
function Cu(t, e) {
  if (He(t[e]))
    try {
      delete t[e];
    } catch {
      t[e] = void 0;
    }
  else if (t.dataset)
    try {
      delete t.dataset[e];
    } catch {
      t.dataset[e] = void 0;
    }
  else
    t.removeAttribute("data-".concat(wr(e)));
}
var ea = /\s\s*/, ta = function() {
  var t = !1;
  if (Vt) {
    var e = !1, r = function() {
    }, o = Object.defineProperty({}, "once", {
      get: function() {
        return t = !0, e;
      },
      set: function(a) {
        e = a;
      }
    });
    Ce.addEventListener("test", r, o), Ce.removeEventListener("test", r, o);
  }
  return t;
}();
function xe(t, e, r) {
  var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = r;
  e.trim().split(ea).forEach(function(a) {
    if (!ta) {
      var n = t.listeners;
      n && n[a] && n[a][r] && (i = n[a][r], delete n[a][r], Object.keys(n[a]).length === 0 && delete n[a], Object.keys(n).length === 0 && delete t.listeners);
    }
    t.removeEventListener(a, i, o);
  });
}
function be(t, e, r) {
  var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, i = r;
  e.trim().split(ea).forEach(function(a) {
    if (o.once && !ta) {
      var n = t.listeners, f = n === void 0 ? {} : n;
      i = function() {
        delete f[a][r], t.removeEventListener(a, i, o);
        for (var m = arguments.length, u = new Array(m), v = 0; v < m; v++)
          u[v] = arguments[v];
        r.apply(t, u);
      }, f[a] || (f[a] = {}), f[a][r] && t.removeEventListener(a, f[a][r], o), f[a][r] = i, t.listeners = f;
    }
    t.addEventListener(a, i, o);
  });
}
function Qe(t, e, r) {
  var o;
  return fe(Event) && fe(CustomEvent) ? o = new CustomEvent(e, {
    detail: r,
    bubbles: !0,
    cancelable: !0
  }) : (o = document.createEvent("CustomEvent"), o.initCustomEvent(e, !0, !0, r)), t.dispatchEvent(o);
}
function ra(t) {
  var e = t.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var Kt = Ce.location, Mu = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function lo(t) {
  var e = t.match(Mu);
  return e !== null && (e[1] !== Kt.protocol || e[2] !== Kt.hostname || e[3] !== Kt.port);
}
function co(t) {
  var e = "timestamp=".concat(new Date().getTime());
  return t + (t.indexOf("?") === -1 ? "?" : "&") + e;
}
function dt(t) {
  var e = t.rotate, r = t.scaleX, o = t.scaleY, i = t.translateX, a = t.translateY, n = [];
  Y(i) && i !== 0 && n.push("translateX(".concat(i, "px)")), Y(a) && a !== 0 && n.push("translateY(".concat(a, "px)")), Y(e) && e !== 0 && n.push("rotate(".concat(e, "deg)")), Y(r) && r !== 1 && n.push("scaleX(".concat(r, ")")), Y(o) && o !== 1 && n.push("scaleY(".concat(o, ")"));
  var f = n.length ? n.join(" ") : "none";
  return {
    WebkitTransform: f,
    msTransform: f,
    transform: f
  };
}
function $u(t) {
  var e = Ko({}, t), r = 0;
  return se(t, function(o, i) {
    delete e[i], se(e, function(a) {
      var n = Math.abs(o.startX - a.startX), f = Math.abs(o.startY - a.startY), g = Math.abs(o.endX - a.endX), m = Math.abs(o.endY - a.endY), u = Math.sqrt(n * n + f * f), v = Math.sqrt(g * g + m * m), b = (v - u) / u;
      Math.abs(b) > Math.abs(r) && (r = b);
    });
  }), r;
}
function Dt(t, e) {
  var r = t.pageX, o = t.pageY, i = {
    endX: r,
    endY: o
  };
  return e ? i : Ko({
    startX: r,
    startY: o
  }, i);
}
function Eu(t) {
  var e = 0, r = 0, o = 0;
  return se(t, function(i) {
    var a = i.startX, n = i.startY;
    e += a, r += n, o += 1;
  }), e /= o, r /= o, {
    pageX: e,
    pageY: r
  };
}
function Le(t) {
  var e = t.aspectRatio, r = t.height, o = t.width, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", a = no(o), n = no(r);
  if (a && n) {
    var f = r * e;
    i === "contain" && f > o || i === "cover" && f < o ? r = o / e : o = r * e;
  } else
    a ? r = o / e : n && (o = r * e);
  return {
    width: o,
    height: r
  };
}
function Tu(t) {
  var e = t.width, r = t.height, o = t.degree;
  if (o = Math.abs(o) % 180, o === 90)
    return {
      width: r,
      height: e
    };
  var i = o % 90 * Math.PI / 180, a = Math.sin(i), n = Math.cos(i), f = e * n + r * a, g = e * a + r * n;
  return o > 90 ? {
    width: g,
    height: f
  } : {
    width: f,
    height: g
  };
}
function Au(t, e, r, o) {
  var i = e.aspectRatio, a = e.naturalWidth, n = e.naturalHeight, f = e.rotate, g = f === void 0 ? 0 : f, m = e.scaleX, u = m === void 0 ? 1 : m, v = e.scaleY, b = v === void 0 ? 1 : v, T = r.aspectRatio, k = r.naturalWidth, S = r.naturalHeight, P = o.fillColor, F = P === void 0 ? "transparent" : P, H = o.imageSmoothingEnabled, j = H === void 0 ? !0 : H, V = o.imageSmoothingQuality, W = V === void 0 ? "low" : V, M = o.maxWidth, K = M === void 0 ? 1 / 0 : M, Q = o.maxHeight, ce = Q === void 0 ? 1 / 0 : Q, he = o.minWidth, ve = he === void 0 ? 0 : he, N = o.minHeight, R = N === void 0 ? 0 : N, O = document.createElement("canvas"), X = O.getContext("2d"), q = Le({
    aspectRatio: T,
    width: K,
    height: ce
  }), ue = Le({
    aspectRatio: T,
    width: ve,
    height: R
  }, "cover"), ee = Math.min(q.width, Math.max(ue.width, k)), at = Math.min(q.height, Math.max(ue.height, S)), bt = Le({
    aspectRatio: i,
    width: K,
    height: ce
  }), yt = Le({
    aspectRatio: i,
    width: ve,
    height: R
  }, "cover"), wt = Math.min(bt.width, Math.max(yt.width, a)), Fe = Math.min(bt.height, Math.max(yt.height, n)), zt = [-wt / 2, -Fe / 2, wt, Fe];
  return O.width = Ze(ee), O.height = Ze(at), X.fillStyle = F, X.fillRect(0, 0, ee, at), X.save(), X.translate(ee / 2, at / 2), X.rotate(g * Math.PI / 180), X.scale(u, b), X.imageSmoothingEnabled = j, X.imageSmoothingQuality = W, X.drawImage.apply(X, [t].concat(Fo(zt.map(function(Ye) {
    return Math.floor(Ze(Ye));
  })))), X.restore(), O;
}
var oa = String.fromCharCode;
function Ou(t, e, r) {
  var o = "";
  r += e;
  for (var i = e; i < r; i += 1)
    o += oa(t.getUint8(i));
  return o;
}
var Iu = /^data:.*,/;
function Lu(t) {
  var e = t.replace(Iu, ""), r = atob(e), o = new ArrayBuffer(r.length), i = new Uint8Array(o);
  return se(i, function(a, n) {
    i[n] = r.charCodeAt(n);
  }), o;
}
function Pu(t, e) {
  for (var r = [], o = 8192, i = new Uint8Array(t); i.length > 0; )
    r.push(oa.apply(null, Qo(i.subarray(0, o)))), i = i.subarray(o);
  return "data:".concat(e, ";base64,").concat(btoa(r.join("")));
}
function Nu(t) {
  var e = new DataView(t), r;
  try {
    var o, i, a;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var n = e.byteLength, f = 2; f + 1 < n; ) {
        if (e.getUint8(f) === 255 && e.getUint8(f + 1) === 225) {
          i = f;
          break;
        }
        f += 1;
      }
    if (i) {
      var g = i + 4, m = i + 10;
      if (Ou(e, g, 4) === "Exif") {
        var u = e.getUint16(m);
        if (o = u === 18761, (o || u === 19789) && e.getUint16(m + 2, o) === 42) {
          var v = e.getUint32(m + 4, o);
          v >= 8 && (a = m + v);
        }
      }
    }
    if (a) {
      var b = e.getUint16(a, o), T, k;
      for (k = 0; k < b; k += 1)
        if (T = a + k * 12 + 2, e.getUint16(T, o) === 274) {
          T += 8, r = e.getUint16(T, o), e.setUint16(T, 1, o);
          break;
        }
    }
  } catch {
    r = 1;
  }
  return r;
}
function ju(t) {
  var e = 0, r = 1, o = 1;
  switch (t) {
    case 2:
      r = -1;
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
      e = 90, r = -1;
      break;
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: r,
    scaleY: o
  };
}
var Vu = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, r = this.options, o = this.container, i = this.cropper, a = Number(r.minContainerWidth), n = Number(r.minContainerHeight);
    ne(i, me), De(e, me);
    var f = {
      width: Math.max(o.offsetWidth, a >= 0 ? a : Jo),
      height: Math.max(o.offsetHeight, n >= 0 ? n : Zo)
    };
    this.containerData = f, Ie(i, {
      width: f.width,
      height: f.height
    }), ne(e, me), De(i, me);
  },
  initCanvas: function() {
    var e = this.containerData, r = this.imageData, o = this.options.viewMode, i = Math.abs(r.rotate) % 180 === 90, a = i ? r.naturalHeight : r.naturalWidth, n = i ? r.naturalWidth : r.naturalHeight, f = a / n, g = e.width, m = e.height;
    e.height * f > e.width ? o === 3 ? g = e.height * f : m = e.width / f : o === 3 ? m = e.width / f : g = e.height * f;
    var u = {
      aspectRatio: f,
      naturalWidth: a,
      naturalHeight: n,
      width: g,
      height: m
    };
    this.canvasData = u, this.limited = o === 1 || o === 2, this.limitCanvas(!0, !0), u.width = Math.min(Math.max(u.width, u.minWidth), u.maxWidth), u.height = Math.min(Math.max(u.height, u.minHeight), u.maxHeight), u.left = (e.width - u.width) / 2, u.top = (e.height - u.height) / 2, u.oldLeft = u.left, u.oldTop = u.top, this.initialCanvasData = re({}, u);
  },
  limitCanvas: function(e, r) {
    var o = this.options, i = this.containerData, a = this.canvasData, n = this.cropBoxData, f = o.viewMode, g = a.aspectRatio, m = this.cropped && n;
    if (e) {
      var u = Number(o.minCanvasWidth) || 0, v = Number(o.minCanvasHeight) || 0;
      f > 1 ? (u = Math.max(u, i.width), v = Math.max(v, i.height), f === 3 && (v * g > u ? u = v * g : v = u / g)) : f > 0 && (u ? u = Math.max(u, m ? n.width : 0) : v ? v = Math.max(v, m ? n.height : 0) : m && (u = n.width, v = n.height, v * g > u ? u = v * g : v = u / g));
      var b = Le({
        aspectRatio: g,
        width: u,
        height: v
      });
      u = b.width, v = b.height, a.minWidth = u, a.minHeight = v, a.maxWidth = 1 / 0, a.maxHeight = 1 / 0;
    }
    if (r)
      if (f > (m ? 0 : 1)) {
        var T = i.width - a.width, k = i.height - a.height;
        a.minLeft = Math.min(0, T), a.minTop = Math.min(0, k), a.maxLeft = Math.max(0, T), a.maxTop = Math.max(0, k), m && this.limited && (a.minLeft = Math.min(n.left, n.left + (n.width - a.width)), a.minTop = Math.min(n.top, n.top + (n.height - a.height)), a.maxLeft = n.left, a.maxTop = n.top, f === 2 && (a.width >= i.width && (a.minLeft = Math.min(0, T), a.maxLeft = Math.max(0, T)), a.height >= i.height && (a.minTop = Math.min(0, k), a.maxTop = Math.max(0, k))));
      } else
        a.minLeft = -a.width, a.minTop = -a.height, a.maxLeft = i.width, a.maxTop = i.height;
  },
  renderCanvas: function(e, r) {
    var o = this.canvasData, i = this.imageData;
    if (r) {
      var a = Tu({
        width: i.naturalWidth * Math.abs(i.scaleX || 1),
        height: i.naturalHeight * Math.abs(i.scaleY || 1),
        degree: i.rotate || 0
      }), n = a.width, f = a.height, g = o.width * (n / o.naturalWidth), m = o.height * (f / o.naturalHeight);
      o.left -= (g - o.width) / 2, o.top -= (m - o.height) / 2, o.width = g, o.height = m, o.aspectRatio = n / f, o.naturalWidth = n, o.naturalHeight = f, this.limitCanvas(!0, !1);
    }
    (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft), (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), this.limitCanvas(!1, !0), o.left = Math.min(Math.max(o.left, o.minLeft), o.maxLeft), o.top = Math.min(Math.max(o.top, o.minTop), o.maxTop), o.oldLeft = o.left, o.oldTop = o.top, Ie(this.canvas, re({
      width: o.width,
      height: o.height
    }, dt({
      translateX: o.left,
      translateY: o.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var r = this.canvasData, o = this.imageData, i = o.naturalWidth * (r.width / r.naturalWidth), a = o.naturalHeight * (r.height / r.naturalHeight);
    re(o, {
      width: i,
      height: a,
      left: (r.width - i) / 2,
      top: (r.height - a) / 2
    }), Ie(this.image, re({
      width: o.width,
      height: o.height
    }, dt(re({
      translateX: o.left,
      translateY: o.top
    }, o)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, r = this.canvasData, o = e.aspectRatio || e.initialAspectRatio, i = Number(e.autoCropArea) || 0.8, a = {
      width: r.width,
      height: r.height
    };
    o && (r.height * o > r.width ? a.height = a.width / o : a.width = a.height * o), this.cropBoxData = a, this.limitCropBox(!0, !0), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), a.width = Math.max(a.minWidth, a.width * i), a.height = Math.max(a.minHeight, a.height * i), a.left = r.left + (r.width - a.width) / 2, a.top = r.top + (r.height - a.height) / 2, a.oldLeft = a.left, a.oldTop = a.top, this.initialCropBoxData = re({}, a);
  },
  limitCropBox: function(e, r) {
    var o = this.options, i = this.containerData, a = this.canvasData, n = this.cropBoxData, f = this.limited, g = o.aspectRatio;
    if (e) {
      var m = Number(o.minCropBoxWidth) || 0, u = Number(o.minCropBoxHeight) || 0, v = f ? Math.min(i.width, a.width, a.width + a.left, i.width - a.left) : i.width, b = f ? Math.min(i.height, a.height, a.height + a.top, i.height - a.top) : i.height;
      m = Math.min(m, i.width), u = Math.min(u, i.height), g && (m && u ? u * g > m ? u = m / g : m = u * g : m ? u = m / g : u && (m = u * g), b * g > v ? b = v / g : v = b * g), n.minWidth = Math.min(m, v), n.minHeight = Math.min(u, b), n.maxWidth = v, n.maxHeight = b;
    }
    r && (f ? (n.minLeft = Math.max(0, a.left), n.minTop = Math.max(0, a.top), n.maxLeft = Math.min(i.width, a.left + a.width) - n.width, n.maxTop = Math.min(i.height, a.top + a.height) - n.height) : (n.minLeft = 0, n.minTop = 0, n.maxLeft = i.width - n.width, n.maxTop = i.height - n.height));
  },
  renderCropBox: function() {
    var e = this.options, r = this.containerData, o = this.cropBoxData;
    (o.width > o.maxWidth || o.width < o.minWidth) && (o.left = o.oldLeft), (o.height > o.maxHeight || o.height < o.minHeight) && (o.top = o.oldTop), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), this.limitCropBox(!1, !0), o.left = Math.min(Math.max(o.left, o.minLeft), o.maxLeft), o.top = Math.min(Math.max(o.top, o.minTop), o.maxTop), o.oldLeft = o.left, o.oldTop = o.top, e.movable && e.cropBoxMovable && mt(this.face, ft, o.width >= r.width && o.height >= r.height ? Wo : br), Ie(this.cropBox, re({
      width: o.width,
      height: o.height
    }, dt({
      translateX: o.left,
      translateY: o.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Qe(this.element, Qt, this.getData());
  }
}, zu = {
  initPreview: function() {
    var e = this.element, r = this.crossOrigin, o = this.options.preview, i = r ? this.crossOriginUrl : this.url, a = e.alt || "The image to preview", n = document.createElement("img");
    if (r && (n.crossOrigin = r), n.src = i, n.alt = a, this.viewBox.appendChild(n), this.viewBoxImage = n, !!o) {
      var f = o;
      typeof o == "string" ? f = e.ownerDocument.querySelectorAll(o) : o.querySelector && (f = [o]), this.previews = f, se(f, function(g) {
        var m = document.createElement("img");
        mt(g, St, {
          width: g.offsetWidth,
          height: g.offsetHeight,
          html: g.innerHTML
        }), r && (m.crossOrigin = r), m.src = i, m.alt = a, m.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', g.innerHTML = "", g.appendChild(m);
      });
    }
  },
  resetPreview: function() {
    se(this.previews, function(e) {
      var r = ar(e, St);
      Ie(e, {
        width: r.width,
        height: r.height
      }), e.innerHTML = r.html, Cu(e, St);
    });
  },
  preview: function() {
    var e = this.imageData, r = this.canvasData, o = this.cropBoxData, i = o.width, a = o.height, n = e.width, f = e.height, g = o.left - r.left - e.left, m = o.top - r.top - e.top;
    !this.cropped || this.disabled || (Ie(this.viewBoxImage, re({
      width: n,
      height: f
    }, dt(re({
      translateX: -g,
      translateY: -m
    }, e)))), se(this.previews, function(u) {
      var v = ar(u, St), b = v.width, T = v.height, k = b, S = T, P = 1;
      i && (P = b / i, S = a * P), a && S > T && (P = T / a, k = i * P, S = T), Ie(u, {
        width: k,
        height: S
      }), Ie(u.getElementsByTagName("img")[0], re({
        width: n * P,
        height: f * P
      }, dt(re({
        translateX: -g * P,
        translateY: -m * P
      }, e))));
    }));
  }
}, Bu = {
  bind: function() {
    var e = this.element, r = this.options, o = this.cropper;
    fe(r.cropstart) && be(e, rr, r.cropstart), fe(r.cropmove) && be(e, tr, r.cropmove), fe(r.cropend) && be(e, er, r.cropend), fe(r.crop) && be(e, Qt, r.crop), fe(r.zoom) && be(e, or, r.zoom), be(o, Qr, this.onCropStart = this.cropStart.bind(this)), r.zoomable && r.zoomOnWheel && be(o, ao, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), r.toggleDragModeOnDblclick && be(o, Zr, this.onDblclick = this.dblclick.bind(this)), be(e.ownerDocument, eo, this.onCropMove = this.cropMove.bind(this)), be(e.ownerDocument, to, this.onCropEnd = this.cropEnd.bind(this)), r.responsive && be(window, oo, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, r = this.options, o = this.cropper;
    fe(r.cropstart) && xe(e, rr, r.cropstart), fe(r.cropmove) && xe(e, tr, r.cropmove), fe(r.cropend) && xe(e, er, r.cropend), fe(r.crop) && xe(e, Qt, r.crop), fe(r.zoom) && xe(e, or, r.zoom), xe(o, Qr, this.onCropStart), r.zoomable && r.zoomOnWheel && xe(o, ao, this.onWheel, {
      passive: !1,
      capture: !0
    }), r.toggleDragModeOnDblclick && xe(o, Zr, this.onDblclick), xe(e.ownerDocument, eo, this.onCropMove), xe(e.ownerDocument, to, this.onCropEnd), r.responsive && xe(window, oo, this.onResize);
  }
}, Ru = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, r = this.container, o = this.containerData, i = r.offsetWidth / o.width, a = r.offsetHeight / o.height, n = Math.abs(i - 1) > Math.abs(a - 1) ? i : a;
      if (n !== 1) {
        var f, g;
        e.restore && (f = this.getCanvasData(), g = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(se(f, function(m, u) {
          f[u] = m * n;
        })), this.setCropBoxData(se(g, function(m, u) {
          g[u] = m * n;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Go || this.setDragMode(Su(this.dragBox, Jt) ? qo : yr);
  },
  wheel: function(e) {
    var r = this, o = Number(this.options.wheelZoomRatio) || 0.1, i = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      r.wheeling = !1;
    }, 50), e.deltaY ? i = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? i = -e.wheelDelta / 120 : e.detail && (i = e.detail > 0 ? 1 : -1), this.zoom(-i * o, e)));
  },
  cropStart: function(e) {
    var r = e.buttons, o = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (Y(r) && r !== 1 || Y(o) && o !== 0 || e.ctrlKey))) {
      var i = this.options, a = this.pointers, n;
      e.changedTouches ? se(e.changedTouches, function(f) {
        a[f.identifier] = Dt(f);
      }) : a[e.pointerId || 0] = Dt(e), Object.keys(a).length > 1 && i.zoomable && i.zoomOnTouch ? n = Xo : n = ar(e.target, ft), !!mu.test(n) && Qe(this.element, rr, {
        originalEvent: e,
        action: n
      }) !== !1 && (e.preventDefault(), this.action = n, this.cropping = !1, n === Yo && (this.cropping = !0, ne(this.dragBox, At)));
    }
  },
  cropMove: function(e) {
    var r = this.action;
    if (!(this.disabled || !r)) {
      var o = this.pointers;
      e.preventDefault(), Qe(this.element, tr, {
        originalEvent: e,
        action: r
      }) !== !1 && (e.changedTouches ? se(e.changedTouches, function(i) {
        re(o[i.identifier] || {}, Dt(i, !0));
      }) : re(o[e.pointerId || 0] || {}, Dt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var r = this.action, o = this.pointers;
      e.changedTouches ? se(e.changedTouches, function(i) {
        delete o[i.identifier];
      }) : delete o[e.pointerId || 0], r && (e.preventDefault(), Object.keys(o).length || (this.action = ""), this.cropping && (this.cropping = !1, Je(this.dragBox, At, this.cropped && this.options.modal)), Qe(this.element, er, {
        originalEvent: e,
        action: r
      }));
    }
  }
}, Hu = {
  change: function(e) {
    var r = this.options, o = this.canvasData, i = this.containerData, a = this.cropBoxData, n = this.pointers, f = this.action, g = r.aspectRatio, m = a.left, u = a.top, v = a.width, b = a.height, T = m + v, k = u + b, S = 0, P = 0, F = i.width, H = i.height, j = !0, V;
    !g && e.shiftKey && (g = v && b ? v / b : 1), this.limited && (S = a.minLeft, P = a.minTop, F = S + Math.min(i.width, o.width, o.left + o.width), H = P + Math.min(i.height, o.height, o.top + o.height));
    var W = n[Object.keys(n)[0]], M = {
      x: W.endX - W.startX,
      y: W.endY - W.startY
    }, K = function(ce) {
      switch (ce) {
        case Ve:
          T + M.x > F && (M.x = F - T);
          break;
        case ze:
          m + M.x < S && (M.x = S - m);
          break;
        case Oe:
          u + M.y < P && (M.y = P - u);
          break;
        case qe:
          k + M.y > H && (M.y = H - k);
          break;
      }
    };
    switch (f) {
      case br:
        m += M.x, u += M.y;
        break;
      case Ve:
        if (M.x >= 0 && (T >= F || g && (u <= P || k >= H))) {
          j = !1;
          break;
        }
        K(Ve), v += M.x, v < 0 && (f = ze, v = -v, m -= v), g && (b = v / g, u += (a.height - b) / 2);
        break;
      case Oe:
        if (M.y <= 0 && (u <= P || g && (m <= S || T >= F))) {
          j = !1;
          break;
        }
        K(Oe), b -= M.y, u += M.y, b < 0 && (f = qe, b = -b, u -= b), g && (v = b * g, m += (a.width - v) / 2);
        break;
      case ze:
        if (M.x <= 0 && (m <= S || g && (u <= P || k >= H))) {
          j = !1;
          break;
        }
        K(ze), v -= M.x, m += M.x, v < 0 && (f = Ve, v = -v, m -= v), g && (b = v / g, u += (a.height - b) / 2);
        break;
      case qe:
        if (M.y >= 0 && (k >= H || g && (m <= S || T >= F))) {
          j = !1;
          break;
        }
        K(qe), b += M.y, b < 0 && (f = Oe, b = -b, u -= b), g && (v = b * g, m += (a.width - v) / 2);
        break;
      case nt:
        if (g) {
          if (M.y <= 0 && (u <= P || T >= F)) {
            j = !1;
            break;
          }
          K(Oe), b -= M.y, u += M.y, v = b * g;
        } else
          K(Oe), K(Ve), M.x >= 0 ? T < F ? v += M.x : M.y <= 0 && u <= P && (j = !1) : v += M.x, M.y <= 0 ? u > P && (b -= M.y, u += M.y) : (b -= M.y, u += M.y);
        v < 0 && b < 0 ? (f = ut, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = lt, v = -v, m -= v) : b < 0 && (f = ct, b = -b, u -= b);
        break;
      case lt:
        if (g) {
          if (M.y <= 0 && (u <= P || m <= S)) {
            j = !1;
            break;
          }
          K(Oe), b -= M.y, u += M.y, v = b * g, m += a.width - v;
        } else
          K(Oe), K(ze), M.x <= 0 ? m > S ? (v -= M.x, m += M.x) : M.y <= 0 && u <= P && (j = !1) : (v -= M.x, m += M.x), M.y <= 0 ? u > P && (b -= M.y, u += M.y) : (b -= M.y, u += M.y);
        v < 0 && b < 0 ? (f = ct, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = nt, v = -v, m -= v) : b < 0 && (f = ut, b = -b, u -= b);
        break;
      case ut:
        if (g) {
          if (M.x <= 0 && (m <= S || k >= H)) {
            j = !1;
            break;
          }
          K(ze), v -= M.x, m += M.x, b = v / g;
        } else
          K(qe), K(ze), M.x <= 0 ? m > S ? (v -= M.x, m += M.x) : M.y >= 0 && k >= H && (j = !1) : (v -= M.x, m += M.x), M.y >= 0 ? k < H && (b += M.y) : b += M.y;
        v < 0 && b < 0 ? (f = nt, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = ct, v = -v, m -= v) : b < 0 && (f = lt, b = -b, u -= b);
        break;
      case ct:
        if (g) {
          if (M.x >= 0 && (T >= F || k >= H)) {
            j = !1;
            break;
          }
          K(Ve), v += M.x, b = v / g;
        } else
          K(qe), K(Ve), M.x >= 0 ? T < F ? v += M.x : M.y >= 0 && k >= H && (j = !1) : v += M.x, M.y >= 0 ? k < H && (b += M.y) : b += M.y;
        v < 0 && b < 0 ? (f = lt, b = -b, v = -v, u -= b, m -= v) : v < 0 ? (f = ut, v = -v, m -= v) : b < 0 && (f = nt, b = -b, u -= b);
        break;
      case Wo:
        this.move(M.x, M.y), j = !1;
        break;
      case Xo:
        this.zoom($u(n), e), j = !1;
        break;
      case Yo:
        if (!M.x || !M.y) {
          j = !1;
          break;
        }
        V = ra(this.cropper), m = W.startX - V.left, u = W.startY - V.top, v = a.minWidth, b = a.minHeight, M.x > 0 ? f = M.y > 0 ? ct : nt : M.x < 0 && (m -= v, f = M.y > 0 ? ut : lt), M.y < 0 && (u -= b), this.cropped || (De(this.cropBox, me), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    j && (a.width = v, a.height = b, a.left = m, a.top = u, this.action = f, this.renderCropBox()), se(n, function(Q) {
      Q.startX = Q.endX, Q.startY = Q.endY;
    });
  }
}, Uu = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && ne(this.dragBox, At), De(this.cropBox, me), this.setCropBoxData(this.initialCropBoxData)), this;
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
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), De(this.dragBox, At), ne(this.cropBox, me)), this;
  },
  replace: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), r ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, se(this.previews, function(o) {
      o.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, De(this.cropper, Gr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, ne(this.cropper, Gr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[te] ? (e[te] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.canvasData, i = o.left, a = o.top;
    return this.moveTo(Ut(e) ? e : i + Number(e), Ut(r) ? r : a + Number(r));
  },
  moveTo: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.canvasData, i = !1;
    return e = Number(e), r = Number(r), this.ready && !this.disabled && this.options.movable && (Y(e) && (o.left = e, i = !0), Y(r) && (o.top = r, i = !0), i && this.renderCanvas(!0)), this;
  },
  zoom: function(e, r) {
    var o = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(o.width * e / o.naturalWidth, null, r);
  },
  zoomTo: function(e, r, o) {
    var i = this.options, a = this.canvasData, n = a.width, f = a.height, g = a.naturalWidth, m = a.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && i.zoomable) {
      var u = g * e, v = m * e;
      if (Qe(this.element, or, {
        ratio: e,
        oldRatio: n / g,
        originalEvent: o
      }) === !1)
        return this;
      if (o) {
        var b = this.pointers, T = ra(this.cropper), k = b && Object.keys(b).length ? Eu(b) : {
          pageX: o.pageX,
          pageY: o.pageY
        };
        a.left -= (u - n) * ((k.pageX - T.left - a.left) / n), a.top -= (v - f) * ((k.pageY - T.top - a.top) / f);
      } else
        Ge(r) && Y(r.x) && Y(r.y) ? (a.left -= (u - n) * ((r.x - a.left) / n), a.top -= (v - f) * ((r.y - a.top) / f)) : (a.left -= (u - n) / 2, a.top -= (v - f) / 2);
      a.width = u, a.height = v, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), Y(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var r = this.imageData.scaleY;
    return this.scale(e, Y(r) ? r : 1);
  },
  scaleY: function(e) {
    var r = this.imageData.scaleX;
    return this.scale(Y(r) ? r : 1, e);
  },
  scale: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, o = this.imageData, i = !1;
    return e = Number(e), r = Number(r), this.ready && !this.disabled && this.options.scalable && (Y(e) && (o.scaleX = e, i = !0), Y(r) && (o.scaleY = r, i = !0), i && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, r = this.options, o = this.imageData, i = this.canvasData, a = this.cropBoxData, n;
    if (this.ready && this.cropped) {
      n = {
        x: a.left - i.left,
        y: a.top - i.top,
        width: a.width,
        height: a.height
      };
      var f = o.width / o.naturalWidth;
      if (se(n, function(u, v) {
        n[v] = u / f;
      }), e) {
        var g = Math.round(n.y + n.height), m = Math.round(n.x + n.width);
        n.x = Math.round(n.x), n.y = Math.round(n.y), n.width = m - n.x, n.height = g - n.y;
      }
    } else
      n = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return r.rotatable && (n.rotate = o.rotate || 0), r.scalable && (n.scaleX = o.scaleX || 1, n.scaleY = o.scaleY || 1), n;
  },
  setData: function(e) {
    var r = this.options, o = this.imageData, i = this.canvasData, a = {};
    if (this.ready && !this.disabled && Ge(e)) {
      var n = !1;
      r.rotatable && Y(e.rotate) && e.rotate !== o.rotate && (o.rotate = e.rotate, n = !0), r.scalable && (Y(e.scaleX) && e.scaleX !== o.scaleX && (o.scaleX = e.scaleX, n = !0), Y(e.scaleY) && e.scaleY !== o.scaleY && (o.scaleY = e.scaleY, n = !0)), n && this.renderCanvas(!0, !0);
      var f = o.width / o.naturalWidth;
      Y(e.x) && (a.left = e.x * f + i.left), Y(e.y) && (a.top = e.y * f + i.top), Y(e.width) && (a.width = e.width * f), Y(e.height) && (a.height = e.height * f), this.setCropBoxData(a);
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
    var e = this.canvasData, r = {};
    return this.ready && se(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(o) {
      r[o] = e[o];
    }), r;
  },
  setCanvasData: function(e) {
    var r = this.canvasData, o = r.aspectRatio;
    return this.ready && !this.disabled && Ge(e) && (Y(e.left) && (r.left = e.left), Y(e.top) && (r.top = e.top), Y(e.width) ? (r.width = e.width, r.height = e.width / o) : Y(e.height) && (r.height = e.height, r.width = e.height * o), this.renderCanvas(!0)), this;
  },
  getCropBoxData: function() {
    var e = this.cropBoxData, r;
    return this.ready && this.cropped && (r = {
      left: e.left,
      top: e.top,
      width: e.width,
      height: e.height
    }), r || {};
  },
  setCropBoxData: function(e) {
    var r = this.cropBoxData, o = this.options.aspectRatio, i, a;
    return this.ready && this.cropped && !this.disabled && Ge(e) && (Y(e.left) && (r.left = e.left), Y(e.top) && (r.top = e.top), Y(e.width) && e.width !== r.width && (i = !0, r.width = e.width), Y(e.height) && e.height !== r.height && (a = !0, r.height = e.height), o && (i ? r.height = r.width / o : a && (r.width = r.height * o)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var r = this.canvasData, o = Au(this.image, this.imageData, r, e);
    if (!this.cropped)
      return o;
    var i = this.getData(), a = i.x, n = i.y, f = i.width, g = i.height, m = o.width / Math.floor(r.naturalWidth);
    m !== 1 && (a *= m, n *= m, f *= m, g *= m);
    var u = f / g, v = Le({
      aspectRatio: u,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Le({
      aspectRatio: u,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), T = Le({
      aspectRatio: u,
      width: e.width || (m !== 1 ? o.width : f),
      height: e.height || (m !== 1 ? o.height : g)
    }), k = T.width, S = T.height;
    k = Math.min(v.width, Math.max(b.width, k)), S = Math.min(v.height, Math.max(b.height, S));
    var P = document.createElement("canvas"), F = P.getContext("2d");
    P.width = Ze(k), P.height = Ze(S), F.fillStyle = e.fillColor || "transparent", F.fillRect(0, 0, k, S);
    var H = e.imageSmoothingEnabled, j = H === void 0 ? !0 : H, V = e.imageSmoothingQuality;
    F.imageSmoothingEnabled = j, V && (F.imageSmoothingQuality = V);
    var W = o.width, M = o.height, K = a, Q = n, ce, he, ve, N, R, O;
    K <= -f || K > W ? (K = 0, ce = 0, ve = 0, R = 0) : K <= 0 ? (ve = -K, K = 0, ce = Math.min(W, f + K), R = ce) : K <= W && (ve = 0, ce = Math.min(f, W - K), R = ce), ce <= 0 || Q <= -g || Q > M ? (Q = 0, he = 0, N = 0, O = 0) : Q <= 0 ? (N = -Q, Q = 0, he = Math.min(M, g + Q), O = he) : Q <= M && (N = 0, he = Math.min(g, M - Q), O = he);
    var X = [K, Q, ce, he];
    if (R > 0 && O > 0) {
      var q = k / f;
      X.push(ve * q, N * q, R * q, O * q);
    }
    return F.drawImage.apply(F, [o].concat(Fo(X.map(function(ue) {
      return Math.floor(Ze(ue));
    })))), P;
  },
  setAspectRatio: function(e) {
    var r = this.options;
    return !this.disabled && !Ut(e) && (r.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var r = this.options, o = this.dragBox, i = this.face;
    if (this.ready && !this.disabled) {
      var a = e === yr, n = r.movable && e === qo;
      e = a || n ? e : Go, r.dragMode = e, mt(o, ft, e), Je(o, Jt, a), Je(o, Zt, n), r.cropBoxMovable || (mt(i, ft, e), Je(i, Jt, a), Je(i, Zt, n));
    }
    return this;
  }
}, Ku = Ce.Cropper, aa = /* @__PURE__ */ function() {
  function t(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (ou(this, t), !e || !vu.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = re({}, io, Ge(r) && r), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return au(t, [{
    key: "init",
    value: function() {
      var r = this.element, o = r.tagName.toLowerCase(), i;
      if (!r[te]) {
        if (r[te] = this, o === "img") {
          if (this.isImg = !0, i = r.getAttribute("src") || "", this.originalUrl = i, !i)
            return;
          i = r.src;
        } else
          o === "canvas" && window.HTMLCanvasElement && (i = r.toDataURL());
        this.load(i);
      }
    }
  }, {
    key: "load",
    value: function(r) {
      var o = this;
      if (!!r) {
        this.url = r, this.imageData = {};
        var i = this.element, a = this.options;
        if (!a.rotatable && !a.scalable && (a.checkOrientation = !1), !a.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (gu.test(r)) {
          pu.test(r) ? this.read(Lu(r)) : this.clone();
          return;
        }
        var n = new XMLHttpRequest(), f = this.clone.bind(this);
        this.reloading = !0, this.xhr = n, n.onabort = f, n.onerror = f, n.ontimeout = f, n.onprogress = function() {
          n.getResponseHeader("content-type") !== so && n.abort();
        }, n.onload = function() {
          o.read(n.response);
        }, n.onloadend = function() {
          o.reloading = !1, o.xhr = null;
        }, a.checkCrossOrigin && lo(r) && i.crossOrigin && (r = co(r)), n.open("GET", r, !0), n.responseType = "arraybuffer", n.withCredentials = i.crossOrigin === "use-credentials", n.send();
      }
    }
  }, {
    key: "read",
    value: function(r) {
      var o = this.options, i = this.imageData, a = Nu(r), n = 0, f = 1, g = 1;
      if (a > 1) {
        this.url = Pu(r, so);
        var m = ju(a);
        n = m.rotate, f = m.scaleX, g = m.scaleY;
      }
      o.rotatable && (i.rotate = n), o.scalable && (i.scaleX = f, i.scaleY = g), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var r = this.element, o = this.url, i = r.crossOrigin, a = o;
      this.options.checkCrossOrigin && lo(o) && (i || (i = "anonymous"), a = co(o)), this.crossOrigin = i, this.crossOriginUrl = a;
      var n = document.createElement("img");
      i && (n.crossOrigin = i), n.src = a || o, n.alt = r.alt || "The image to crop", this.image = n, n.onload = this.start.bind(this), n.onerror = this.stop.bind(this), ne(n, Jr), r.parentNode.insertBefore(n, r.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var r = this, o = this.image;
      o.onload = null, o.onerror = null, this.sizing = !0;
      var i = Ce.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(Ce.navigator.userAgent), a = function(m, u) {
        re(r.imageData, {
          naturalWidth: m,
          naturalHeight: u,
          aspectRatio: m / u
        }), r.initialImageData = re({}, r.imageData), r.sizing = !1, r.sized = !0, r.build();
      };
      if (o.naturalWidth && !i) {
        a(o.naturalWidth, o.naturalHeight);
        return;
      }
      var n = document.createElement("img"), f = document.body || document.documentElement;
      this.sizingImage = n, n.onload = function() {
        a(n.width, n.height), i || f.removeChild(n);
      }, n.src = o.src, i || (n.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", f.appendChild(n));
    }
  }, {
    key: "stop",
    value: function() {
      var r = this.image;
      r.onload = null, r.onerror = null, r.parentNode.removeChild(r), this.image = null;
    }
  }, {
    key: "build",
    value: function() {
      if (!(!this.sized || this.ready)) {
        var r = this.element, o = this.options, i = this.image, a = r.parentNode, n = document.createElement("div");
        n.innerHTML = bu;
        var f = n.querySelector(".".concat(te, "-container")), g = f.querySelector(".".concat(te, "-canvas")), m = f.querySelector(".".concat(te, "-drag-box")), u = f.querySelector(".".concat(te, "-crop-box")), v = u.querySelector(".".concat(te, "-face"));
        this.container = a, this.cropper = f, this.canvas = g, this.dragBox = m, this.cropBox = u, this.viewBox = f.querySelector(".".concat(te, "-view-box")), this.face = v, g.appendChild(i), ne(r, me), a.insertBefore(f, r.nextSibling), this.isImg || De(i, Jr), this.initPreview(), this.bind(), o.initialAspectRatio = Math.max(0, o.initialAspectRatio) || NaN, o.aspectRatio = Math.max(0, o.aspectRatio) || NaN, o.viewMode = Math.max(0, Math.min(3, Math.round(o.viewMode))) || 0, ne(u, me), o.guides || ne(u.getElementsByClassName("".concat(te, "-dashed")), me), o.center || ne(u.getElementsByClassName("".concat(te, "-center")), me), o.background && ne(f, "".concat(te, "-bg")), o.highlight || ne(v, uu), o.cropBoxMovable && (ne(v, Zt), mt(v, ft, br)), o.cropBoxResizable || (ne(u.getElementsByClassName("".concat(te, "-line")), me), ne(u.getElementsByClassName("".concat(te, "-point")), me)), this.render(), this.ready = !0, this.setDragMode(o.dragMode), o.autoCrop && this.crop(), this.setData(o.data), fe(o.ready) && be(r, ro, o.ready, {
          once: !0
        }), Qe(r, ro);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), De(this.element, me));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = Ku, t;
    }
  }, {
    key: "setDefaults",
    value: function(r) {
      re(io, Ge(r) && r);
    }
  }]), t;
}();
re(aa.prototype, Vu, zu, Bu, Ru, Hu, Uu);
const Fu = { class: "flex" }, Yu = ["aria-label"], Wu = { class: "ml-auto mb-2" }, Xu = { class: "w-full flex justify-center" }, qu = ["src"], Gu = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { t: o } = B("i18n"), { apiUrl: i } = Me(), a = L(null), n = L(null), f = L(!1), g = L(""), m = L(!1), u = () => {
      f.value = !f.value, f.value ? n.value = new aa(a.value, {
        crop(T) {
        }
      }) : n.value.destroy();
    }, v = B("postData"), b = () => {
      n.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (T) => {
          g.value = "", m.value = !1, Et(i.value, {
            method: "POST",
            params: Object.assign(v, {
              q: "upload",
              adapter: r.selection.adapter,
              path: r.selection.item.path,
              file: T
            }),
            name: r.selection.item.basename,
            json: !1
          }).then((k) => {
            g.value = o("Updated."), a.value.src = Xt(r.selection.adapter, r.selection.item.path), u(), e("load");
          }).catch((k) => {
            g.value = o(k.message), m.value = !0;
          });
        }
      );
    };
    return ke(() => {
      e("load");
    }), (T, k) => (y(), C(le, null, [
      d("div", Fu, [
        d("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(t.selection.item.basename), 9, Yu),
        d("div", Wu, [
          f.value ? (y(), C("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, E(x(o)("Crop")), 1)) : G("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: k[0] || (k[0] = (S) => u())
          }, E(f.value ? x(o)("Cancel") : x(o)("Edit")), 1)
        ])
      ]),
      d("div", Xu, [
        d("img", {
          ref_key: "image",
          ref: a,
          class: "max-w-[60vh] max-h-[60vh]",
          src: x(Xt)(r.selection.adapter, r.selection.item.path),
          alt: ""
        }, null, 8, qu)
      ]),
      g.value.length ? (y(), Z(Ee, {
        key: 0,
        onHidden: k[1] || (k[1] = (S) => g.value = ""),
        error: m.value
      }, {
        default: J(() => [
          ie(E(g.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : G("", !0)
    ], 64));
  }
}, Ju = { class: "flex" }, Zu = ["aria-label"], Qu = /* @__PURE__ */ d("div", null, null, -1), ed = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    return ke(() => {
      e("load");
    }), (r, o) => (y(), C(le, null, [
      d("div", Ju, [
        d("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, E(t.selection.item.basename), 9, Zu)
      ]),
      Qu
    ], 64));
  }
}, td = ["aria-label"], rd = {
  class: "w-full",
  preload: "",
  controls: ""
}, od = ["src"], ad = /* @__PURE__ */ ie(" Your browser does not support the video tag. "), sd = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { apiUrl: o } = Me(), i = () => o.value + "?" + Ue({ q: "preview", adapter: r.selection.adapter, path: r.selection.item.path });
    return ke(() => {
      e("load");
    }), (a, n) => (y(), C(le, null, [
      d("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(t.selection.item.basename), 9, td),
      d("div", null, [
        d("video", rd, [
          d("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, od),
          ad
        ])
      ])
    ], 64));
  }
}, id = ["aria-label"], nd = {
  class: "w-full",
  controls: ""
}, ld = ["src"], cd = /* @__PURE__ */ ie(" Your browser does not support the audio element. "), ud = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { apiUrl: o } = Me(), i = () => o.value + "?" + Ue({ q: "preview", adapter: r.selection.adapter, path: r.selection.item.path });
    return ke(() => {
      e("load");
    }), (a, n) => (y(), C(le, null, [
      d("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(t.selection.item.basename), 9, id),
      d("div", null, [
        d("audio", nd, [
          d("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, ld),
          cd
        ])
      ])
    ], 64));
  }
}, dd = ["aria-label"], hd = ["data"], fd = ["src"], md = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(t, { emit: e }) {
    const r = t, { apiUrl: o } = Me(), i = () => o.value + "?" + Ue({ q: "preview", adapter: r.selection.adapter, path: r.selection.item.path });
    return ke(() => {
      e("load");
    }), (a, n) => (y(), C(le, null, [
      d("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, E(t.selection.item.basename), 9, dd),
      d("div", null, [
        d("object", {
          class: "h-[60vh]",
          data: i(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
            class: "border-0",
            src: i(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, fd)
        ], 8, hd)
      ])
    ], 64));
  }
}, gd = { class: "sm:flex sm:items-start" }, pd = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, vd = { class: "text-gray-700 dark:text-gray-200 text-sm" }, bd = {
  key: 0,
  class: "flex leading-5"
}, yd = /* @__PURE__ */ d("svg", {
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
], -1), wd = { class: "p-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, xd = { class: "font-bold pl-2" }, _d = { class: "font-bold pl-2" }, kd = {
  name: "VFModalPreview"
}, Sd = /* @__PURE__ */ Object.assign(kd, {
  props: {
    selection: Object
  },
  setup(t) {
    const e = t, { apiUrl: r } = Me(), o = B("emitter"), { t: i } = B("i18n"), a = L(!1), n = (m) => a.value = m, f = (m) => {
      var u;
      return ((u = e.selection.item.mime_type) != null ? u : "").startsWith(m);
    }, g = () => {
      const m = r.value + "?" + Ue({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      o.emit("vf-download", m);
    };
    return (m, u) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: u[6] || (u[6] = (v) => x(o).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Close")), 1),
        d("button", {
          type: "button",
          onClick: u[7] || (u[7] = (v) => g()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Download")), 1)
      ]),
      default: J(() => [
        d("div", gd, [
          d("div", pd, [
            d("div", null, [
              f("text") ? (y(), Z(ru, {
                key: 0,
                selection: t.selection,
                onLoad: u[0] || (u[0] = (v) => n(!0))
              }, null, 8, ["selection"])) : f("image") ? (y(), Z(Gu, {
                key: 1,
                selection: t.selection,
                onLoad: u[1] || (u[1] = (v) => n(!0))
              }, null, 8, ["selection"])) : f("video") ? (y(), Z(sd, {
                key: 2,
                selection: t.selection,
                onLoad: u[2] || (u[2] = (v) => n(!0))
              }, null, 8, ["selection"])) : f("audio") ? (y(), Z(ud, {
                key: 3,
                selection: t.selection,
                onLoad: u[3] || (u[3] = (v) => n(!0))
              }, null, 8, ["selection"])) : f("application/pdf") ? (y(), Z(md, {
                key: 4,
                selection: t.selection,
                onLoad: u[4] || (u[4] = (v) => n(!0))
              }, null, 8, ["selection"])) : (y(), Z(ed, {
                key: 5,
                selection: t.selection,
                onLoad: u[5] || (u[5] = (v) => n(!0))
              }, null, 8, ["selection"]))
            ]),
            d("div", vd, [
              a.value == !1 ? (y(), C("div", bd, [
                yd,
                d("span", null, E(x(i)("Loading")), 1)
              ])) : G("", !0)
            ])
          ])
        ]),
        d("div", wd, [
          d("div", null, [
            d("span", xd, E(x(i)("File Size")) + ": ", 1),
            ie(E(x(mo)(t.selection.item.file_size)), 1)
          ]),
          d("div", null, [
            d("span", _d, E(x(i)("Last Modified")) + ": ", 1),
            ie(" " + E(x(go)(t.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Dd = { class: "sm:flex sm:items-start" }, Cd = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Md = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $d = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ed = { class: "mt-2" }, Td = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ad = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Od = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Id = [
  Od
], Ld = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pd = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Nd = [
  Pd
], jd = { class: "ml-1.5" }, Vd = ["onKeyup"], zd = {
  name: "VFModalRename"
}, Bd = /* @__PURE__ */ Object.assign(zd, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { getStore: o } = B("storage"), { t: i } = B("i18n"), a = L(e.selection.items[0]), n = L(e.selection.items[0].basename), f = L(""), g = () => {
      n.value != "" && r.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          item: a.value.path,
          name: n.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("%s is renamed.", n.value) });
        },
        onError: (m) => {
          f.value = i(m.message);
        }
      });
    };
    return (m, u) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: u[2] || (u[2] = (v) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Dd, [
          Cd,
          d("div", Md, [
            d("h3", $d, E(x(i)("Rename")), 1),
            d("div", Ed, [
              d("p", Td, [
                a.value.type == "dir" ? (y(), C("svg", Ad, Id)) : (y(), C("svg", Ld, Nd)),
                d("span", jd, E(a.value.basename), 1)
              ]),
              ye(d("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (v) => n.value = v),
                onKeyup: tt(g, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Vd), [
                [rt, n.value]
              ]),
              f.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: u[1] || (u[1] = (v) => f.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(f.value), 1)
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
}), Rd = { class: "sm:flex sm:items-start" }, Hd = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ud = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Kd = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Fd = { class: "mt-2" }, Yd = { class: "text-gray-500 mb-1" }, Wd = ["id"], Xd = {
  key: 0,
  class: "py-2"
}, qd = ["disabled", "onClick"], Gd = {
  name: "VFModalUpload"
}, Jd = /* @__PURE__ */ Object.assign(Gd, {
  props: {
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { apiUrl: o } = Me(), { t: i } = B("i18n"), a = L(null), n = L(null), f = L(null), g = L([]), m = L(""), u = L(!0), v = () => {
      m.value = "", a.value.start();
    }, b = B("postData");
    return ke(() => {
      a.value = new Ht.Uploader({
        runtimes: "html5",
        browse_button: f.value,
        container: n.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: o.value + "?" + Ue(Object.assign(b, { q: "upload", adapter: e.current.adapter, path: e.current.dirname })),
        headers: {
          ...$t && { "X-CSRF-Token": $t }
        },
        init: {
          PostInit: function() {
          },
          FilesAdded: function(T, k) {
            u.value = !1, Ht.each(k, function(S) {
              g.value.push({
                id: S.id,
                name: S.name,
                size: Ht.formatSize(S.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(T, k) {
            g.value[g.value.findIndex((S) => S.id == k.id)].percent = k.percent + "%";
          },
          UploadComplete: function() {
            u.value = !0, r.emit("vf-fetch", { params: { q: "index", adapter: e.current.adapter, path: e.current.dirname } });
          },
          Error: function(T, k) {
            a.value.stop(), m.value = i(JSON.parse(k.response).message);
          }
        }
      }), a.value.init();
    }), (T, k) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          disabled: u.value,
          onClick: Be(v, ["prevent"]),
          type: "button",
          class: de([u.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, E(x(i)("Upload")), 11, qd),
        d("button", {
          type: "button",
          onClick: k[1] || (k[1] = (S) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Rd, [
          Hd,
          d("div", Ud, [
            d("h3", Kd, E(x(i)("Upload files")), 1),
            d("div", Fd, [
              d("div", Yd, [
                (y(!0), C(le, null, we(g.value, (S) => (y(), C("div", null, [
                  d("div", {
                    id: S.id
                  }, [
                    ie(E(S.name) + " ( " + E(S.size) + ") ", 1),
                    d("b", null, E(S.percent), 1)
                  ], 8, Wd)
                ]))), 256)),
                g.value.length ? G("", !0) : (y(), C("div", Xd, E(x(i)("No files selected!")), 1))
              ]),
              d("div", {
                class: "text-gray-500",
                ref_key: "container",
                ref: n
              }, [
                d("button", {
                  ref_key: "pickFiles",
                  ref: f,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, E(x(i)("Select Files")), 513)
              ], 512),
              m.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: k[0] || (k[0] = (S) => m.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(m.value), 1)
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
}), Zd = { class: "sm:flex sm:items-start" }, Qd = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), eh = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, th = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, rh = { class: "mt-2" }, oh = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ah = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sh = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ih = [
  sh
], nh = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, lh = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ch = [
  lh
], uh = { class: "ml-1.5" }, dh = ["onKeyup", "placeholder"], hh = {
  name: "VFModalArchive"
}, fh = /* @__PURE__ */ Object.assign(hh, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { getStore: o } = B("storage"), { t: i } = B("i18n"), a = L(""), n = L(""), f = L(e.selection.items), g = () => {
      f.value.length && r.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(f.value.map(({ path: m, type: u }) => ({ path: m, type: u }))),
          name: a.value
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("The file(s) archived.") });
        },
        onError: (m) => {
          n.value = i(m.message);
        }
      });
    };
    return (m, u) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: u[2] || (u[2] = (v) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Zd, [
          Qd,
          d("div", eh, [
            d("h3", th, E(x(i)("Archive the files")), 1),
            d("div", rh, [
              (y(!0), C(le, null, we(f.value, (v) => (y(), C("p", oh, [
                v.type == "dir" ? (y(), C("svg", ah, ih)) : (y(), C("svg", nh, ch)),
                d("span", uh, E(v.basename), 1)
              ]))), 256)),
              ye(d("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (v) => a.value = v),
                onKeyup: tt(g, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: x(i)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, dh), [
                [rt, a.value]
              ]),
              n.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: u[1] || (u[1] = (v) => n.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(n.value), 1)
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
}), mh = { class: "sm:flex sm:items-start" }, gh = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ph = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, vh = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bh = { class: "mt-2" }, yh = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, wh = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xh = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _h = [
  xh
], kh = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sh = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Dh = [
  Sh
], Ch = { class: "ml-1.5" }, Mh = { class: "my-1 text-sm text-gray-500" }, $h = {
  name: "VFModalUnarchive"
}, Eh = /* @__PURE__ */ Object.assign($h, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { getStore: o } = B("storage"), { t: i } = B("i18n");
    L("");
    const a = L(e.selection.items[0]), n = L(""), f = L([]), g = () => {
      r.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: o("adapter", "local"),
          path: e.current.dirname,
          item: a.value.path
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: i("The file unarchived.") });
        },
        onError: (m) => {
          n.value = i(m.message);
        }
      });
    };
    return (m, u) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: g,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: u[1] || (u[1] = (v) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(i)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", mh, [
          gh,
          d("div", ph, [
            d("h3", vh, E(x(i)("Unarchive")), 1),
            d("div", bh, [
              (y(!0), C(le, null, we(f.value, (v) => (y(), C("p", yh, [
                v.type == "dir" ? (y(), C("svg", wh, _h)) : (y(), C("svg", kh, Dh)),
                d("span", Ch, E(v.basename), 1)
              ]))), 256)),
              d("p", Mh, E(x(i)("The archive will be unarchived at")) + " (" + E(t.current.dirname) + ")", 1),
              n.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: u[0] || (u[0] = (v) => n.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(n.value), 1)
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
}), Th = { class: "sm:flex sm:items-start" }, Ah = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Oh = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ih = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Lh = { class: "mt-2" }, Ph = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Nh = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jh = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Vh = [
  jh
], zh = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bh = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Rh = [
  Bh
], Hh = { class: "ml-1.5" }, Uh = { class: "text-sm text-gray-500 pb-1 pt-3" }, Kh = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Fh = /* @__PURE__ */ d("svg", {
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
], -1), Yh = { class: "ml-1.5 overflow-auto" }, Wh = {
  name: "VFModalMove"
}, Xh = /* @__PURE__ */ Object.assign(Wh, {
  props: {
    selection: Object,
    current: Object
  },
  setup(t) {
    const e = t, r = B("emitter"), { t: o } = B("i18n"), { getStore: i } = B("storage"), a = L(e.selection.items.from), n = L(""), f = () => {
      a.value.length && r.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: i("adapter", "local"),
          path: e.current.dirname,
          items: JSON.stringify(a.value.map(({ path: g, type: m }) => ({ path: g, type: m }))),
          item: e.selection.items.to.path
        },
        onSuccess: () => {
          r.emit("vf-toast-push", { label: o("Files moved.", e.selection.items.to.name) });
        },
        onError: (g) => {
          n.value = o(g.message);
        }
      });
    };
    return (g, m) => (y(), Z($e, null, {
      buttons: J(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600/75 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(o)("Yes, Move!")), 1),
        d("button", {
          type: "button",
          onClick: m[1] || (m[1] = (u) => x(r).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, E(x(o)("Cancel")), 1)
      ]),
      default: J(() => [
        d("div", Th, [
          Ah,
          d("div", Oh, [
            d("h3", Ih, E(x(o)("Move files")), 1),
            d("div", Lh, [
              (y(!0), C(le, null, we(a.value, (u) => (y(), C("p", Ph, [
                u.type == "dir" ? (y(), C("svg", Nh, Vh)) : (y(), C("svg", zh, Rh)),
                d("span", Hh, E(u.path), 1)
              ]))), 256)),
              d("p", Uh, E(x(o)("Are you sure you want to move these files?")), 1),
              d("p", Kh, [
                Fh,
                d("span", Yh, E(t.selection.items.to.path), 1)
              ]),
              n.value.length ? (y(), Z(Ee, {
                key: 0,
                onHidden: m[0] || (m[0] = (u) => n.value = ""),
                error: ""
              }, {
                default: J(() => [
                  ie(E(n.value), 1)
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
}), qh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: Sc,
  ModalMessage: Oc,
  ModalNewFolder: Rc,
  ModalNewFile: Gc,
  ModalPreview: Sd,
  ModalRename: Bd,
  ModalUpload: Jd,
  ModalArchive: fh,
  ModalUnarchive: Eh,
  ModalMove: Xh
}, Symbol.toStringTag, { value: "Module" })), Ft = {
  VueFinder: Zl,
  ...qh
};
const Zh = {
  install(t) {
    for (const e in Ft)
      if (Ft.hasOwnProperty(e)) {
        const r = Ft[e];
        t.component(r.name, r);
      }
  }
};
export {
  Zh as default
};
