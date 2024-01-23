import { ref as g, watch as le, inject as k, openBlock as r, createElementBlock as v, createElementVNode as e, unref as a, normalizeClass as T, createTextVNode as U, toDisplayString as u, createCommentVNode as V, createVNode as P, TransitionGroup as Ve, withCtx as E, Fragment as H, renderList as J, reactive as ve, onMounted as K, onUpdated as Be, onBeforeUnmount as Oe, withDirectives as R, vShow as ue, withModifiers as Z, nextTick as ge, isRef as re, vModelSelect as ye, createStaticVNode as Ae, customRef as Le, withKeys as se, vModelText as ae, normalizeStyle as ze, provide as Y, computed as Ne, createBlock as N, resolveDynamicComponent as Ue, renderSlot as pe, onUnmounted as Te, vModelCheckbox as $e } from "vue";
import He from "mitt";
import Ie from "dragselect";
import qe from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Re from "cropperjs";
import Pe from "@uppy/core";
import Ge from "@uppy/xhr-upload";
import "microtip/microtip.css";
var De;
const he = (De = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : De.getAttribute("content"), fe = (l, { method: t = "get", params: s = {}, json: o = !0, signal: i = null }) => {
  const m = { method: t };
  if (m.signal = i, t == "get")
    l += "?" + new URLSearchParams(s);
  else {
    m.headers = {}, he && (m.headers["X-CSRF-Token"] = he);
    let n = new FormData();
    for (const [h, p] of Object.entries(s))
      n.append(h, p);
    m.body = n;
  }
  return fetch(l, m).then((n) => n.ok ? o ? n.json() : n.text() : n.json().then(Promise.reject.bind(Promise)));
};
function xe(l) {
  let t = localStorage.getItem(l + "_storage");
  const s = g(JSON.parse(t));
  le(s, o);
  function o() {
    s.value === null || s.value === "" ? localStorage.removeItem(l + "_storage") : localStorage.setItem(l + "_storage", JSON.stringify(s.value));
  }
  function i(h, p) {
    s.value = Object.assign({ ...s.value }, { [h]: p });
  }
  function m() {
    s.value = null;
  }
  return { getStore: (h, p = null) => s.value === null || s.value === "" ? p : s.value.hasOwnProperty(h) ? s.value[h] : p, setStore: i, clearStore: m };
}
const Ce = g("");
function X() {
  function l(t) {
    Ce.value = t;
  }
  return { apiUrl: Ce, setApiUrl: l };
}
const Ye = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Je = {
  key: 0,
  class: "flex text-center"
}, Ke = ["aria-label"], We = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Xe = [
  We
], Qe = ["aria-label"], Ze = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), et = [
  Ze
], tt = ["aria-label"], ot = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), st = [
  ot
], at = ["aria-label"], nt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), rt = [
  nt
], lt = ["aria-label"], it = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), dt = [
  it
], ct = ["aria-label"], ut = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), mt = [
  ut
], vt = ["aria-label"], pt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ht = [
  pt
], ft = {
  key: 1,
  class: "flex text-center"
}, gt = { class: "pl-2" }, kt = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, _t = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, xt = /* @__PURE__ */ e("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), bt = /* @__PURE__ */ e("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), wt = [
  xt,
  bt
], yt = { class: "flex text-center items-center justify-end" }, $t = ["aria-label"], Ct = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Mt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, jt = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, St = ["aria-label"], Dt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Ot = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, zt = {
  name: "VFToolbar"
}, Et = /* @__PURE__ */ Object.assign(zt, {
  props: {
    data: Object
  },
  setup(l) {
    const t = k("emitter");
    k("usePropDarkMode");
    const { getStore: s, setStore: o } = k("storage"), { t: i } = k("i18n"), m = g(s("viewport", "grid")), n = g([]), h = g(s("full-screen", !1)), p = g("");
    t.on("vf-search-query", ({ newQuery: y }) => {
      p.value = y;
    });
    const c = k("loadingState"), d = () => c.value, f = () => {
      h.value = !h.value, t.emit("vf-fullscreen-toggle");
    };
    return t.on("vf-nodes-selected", (y) => {
      n.value = y;
    }), t.on("vf-view-toggle", (y) => {
      o("viewport", y), m.value = y;
    }), (y, w) => (r(), v("div", Ye, [
      p.value.length ? (r(), v("div", ft, [
        e("div", gt, [
          U(u(a(i)("Search results for")) + " ", 1),
          e("span", kt, u(p.value), 1)
        ]),
        d() ? (r(), v("svg", _t, wt)) : V("", !0)
      ])) : (r(), v("div", Je, [
        e("div", {
          class: "mx-1.5",
          "aria-label": a(i)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: w[0] || (w[0] = (B) => a(t).emit("vf-modal-show", { type: "new-folder", items: n.value }))
        }, Xe, 8, Ke),
        e("div", {
          class: "mx-1.5",
          "aria-label": a(i)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: w[1] || (w[1] = (B) => a(t).emit("vf-modal-show", { type: "new-file", items: n.value }))
        }, et, 8, Qe),
        e("div", {
          class: "mx-1.5",
          "aria-label": a(i)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: w[2] || (w[2] = (B) => n.value.length != 1 || a(t).emit("vf-modal-show", { type: "rename", items: n.value }))
        }, [
          (r(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: T([n.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, st, 2))
        ], 8, tt),
        e("div", {
          class: "mx-1.5",
          "aria-label": a(i)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: w[3] || (w[3] = (B) => !n.value.length || a(t).emit("vf-modal-show", { type: "delete", items: n.value }))
        }, [
          (r(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: T([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, rt, 2))
        ], 8, at),
        e("div", {
          class: "mx-1.5",
          "aria-label": a(i)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: w[4] || (w[4] = (B) => a(t).emit("vf-modal-show", { type: "upload", items: n.value }))
        }, dt, 8, lt),
        n.value.length == 1 && n.value[0].mime_type == "application/zip" ? (r(), v("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": a(i)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: w[5] || (w[5] = (B) => !n.value.length || a(t).emit("vf-modal-show", { type: "unarchive", items: n.value }))
        }, [
          (r(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: T([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, mt, 2))
        ], 8, ct)) : (r(), v("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": a(i)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: w[6] || (w[6] = (B) => !n.value.length || a(t).emit("vf-modal-show", { type: "archive", items: n.value }))
        }, [
          (r(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: T([n.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ht, 2))
        ], 8, vt))
      ])),
      e("div", yt, [
        e("div", {
          class: "mx-1.5",
          "aria-label": a(i)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: f
        }, [
          (r(), v("svg", Ct, [
            h.value ? (r(), v("path", Mt)) : (r(), v("path", jt))
          ]))
        ], 8, $t),
        e("div", {
          class: "mx-1.5",
          "aria-label": a(i)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: w[7] || (w[7] = (B) => p.value.length || a(t).emit("vf-view-toggle", m.value == "list" ? "grid" : "list"))
        }, [
          (r(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: T([p.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            m.value == "grid" ? (r(), v("path", Dt)) : V("", !0),
            m.value == "list" ? (r(), v("path", Ot)) : V("", !0)
          ], 2))
        ], 8, St)
      ])
    ]));
  }
}), Ee = (l, t = null) => new Date(l * 1e3).toLocaleString(t ?? navigator.language ?? "en-US"), Ft = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Vt = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Bt = [
  Vt
], At = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Lt = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Nt = [
  Lt
], Ut = {
  name: "VFSortIcon"
}, me = /* @__PURE__ */ Object.assign(Ut, {
  props: { direction: String },
  setup(l) {
    return (t, s) => (r(), v("div", null, [
      l.direction == "down" ? (r(), v("svg", Ft, Bt)) : V("", !0),
      l.direction == "up" ? (r(), v("svg", At, Nt)) : V("", !0)
    ]));
  }
}), Tt = ["onClick"], Ht = {
  name: "VFToast.vue"
}, It = /* @__PURE__ */ Object.assign(Ht, {
  setup(l) {
    const t = k("emitter"), { getStore: s } = k("storage"), o = g(s("full-screen", !1)), i = (p) => p == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", m = g([]), n = (p) => {
      m.value.splice(p, 1);
    }, h = (p) => {
      let c = m.value.findIndex((d) => d.id === p);
      c !== -1 && n(c);
    };
    return t.on("vf-toast-clear", () => {
      m.value = [];
    }), t.on("vf-toast-push", (p) => {
      let c = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      p.id = c, m.value.push(p), setTimeout(() => {
        h(c);
      }, 5e3);
    }), (p, c) => (r(), v("div", {
      class: T([o.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      P(Ve, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: E(() => [
          (r(!0), v(H, null, J(m.value, (d, f) => (r(), v("div", {
            onClick: (y) => n(f),
            key: d,
            class: T([i(d.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, u(d.label), 11, Tt))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), oe = (l) => Object.entries(l).map((t) => t.map(encodeURIComponent).join("=")).join("&"), { apiUrl: qt } = X(), be = (l, t) => qt.value + "?" + oe({ q: "preview", adapter: l, path: t });
function we(l, t = 14) {
  let s = `((?=([\\w\\W]{0,${t}}))([\\w\\W]{8,})([\\w\\W]{8,}))`;
  return l.replace(new RegExp(s), "$2..$4");
}
const Rt = { class: "relative flex-auto flex flex-col overflow-hidden" }, Pt = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, Gt = { class: "absolute" }, Yt = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Jt = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Kt = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], Wt = { class: "grid grid-cols-12 items-center" }, Xt = { class: "flex col-span-7 items-center" }, Qt = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), eo = [
  Zt
], to = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), so = [
  oo
], ao = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, no = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, ro = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], lo = { class: "grid grid-cols-12 items-center" }, io = { class: "flex col-span-7 items-center" }, co = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, uo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), mo = [
  uo
], vo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, po = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ho = [
  po
], fo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, go = { class: "col-span-2 text-center" }, ko = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, _o = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], xo = { class: "relative" }, bo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), yo = [
  wo
], $o = ["data-src", "alt"], Co = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), jo = [
  Mo
], So = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Do = { class: "break-all" }, Oo = {
  name: "VFExplorer"
}, zo = /* @__PURE__ */ Object.assign(Oo, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(l) {
    const t = l, s = k("emitter"), { setStore: o, getStore: i } = k("storage"), m = k("adapter"), n = (C) => C == null ? void 0 : C.substring(0, 3), h = g(null), p = g(null), c = g(0), d = g(null), { t: f } = k("i18n"), y = Math.floor(Math.random() * 2 ** 32), w = g(i("full-screen", !1)), B = k("filesize");
    let O;
    s.on("vf-fullscreen-toggle", () => {
      h.value.style.height = null, w.value = !w.value, o("full-screen", w.value);
    });
    const D = g("");
    s.on("vf-search-query", ({ newQuery: C }) => {
      D.value = C, C ? s.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: t.data.adapter,
          path: t.data.dirname,
          filter: C
        },
        onSuccess: (b) => {
          b.files.length || s.emit("vf-toast-push", { label: f("No search result found.") });
        }
      }) : s.emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: t.data.dirname } });
    });
    let S = null;
    const F = () => {
      S && clearTimeout(S);
    }, M = g(!0), j = (C) => {
      C.touches.length > 1 && (M.value ? (d.value.stop(), s.emit("vf-toast-push", { label: f("Drag&Drop: off") })) : (d.value.start(), s.emit("vf-toast-push", { label: f("Drag&Drop: on") }), s.emit("vf-explorer-update")), M.value = !M.value);
    }, z = (C) => {
      S = setTimeout(() => {
        const b = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: C.target.getBoundingClientRect().x,
          clientY: C.target.getBoundingClientRect().y
        });
        C.target.dispatchEvent(b);
      }, 500);
    }, I = (C) => {
      C.type == "dir" ? (s.emit("vf-search-exit"), s.emit("vf-fetch", { params: { q: "index", adapter: t.data.adapter, path: C.path } })) : s.emit("vf-modal-show", { type: "preview", adapter: t.data.adapter, item: C });
    }, A = ve({ active: !1, column: "", order: "" }), ee = (C = !0) => {
      let b = [...t.data.files], _ = A.column, x = A.order == "asc" ? 1 : -1;
      if (!C)
        return b;
      const $ = (L, q) => typeof L == "string" && typeof q == "string" ? L.toLowerCase().localeCompare(q.toLowerCase()) : L < q ? -1 : L > q ? 1 : 0;
      return A.active && (b = b.slice().sort((L, q) => $(L[_], q[_]) * x)), b;
    }, G = (C) => {
      A.active && A.column == C ? (A.active = A.order == "asc", A.column = C, A.order = "desc") : (A.active = !0, A.column = C, A.order = "asc");
    }, te = () => d.value.getSelection().map((C) => JSON.parse(C.dataset.item)), ie = (C, b) => {
      if (C.altKey || C.ctrlKey || C.metaKey)
        return C.preventDefault(), !1;
      C.dataTransfer.setDragImage(p.value, 0, 15), C.dataTransfer.effectAllowed = "all", C.dataTransfer.dropEffect = "copy", C.dataTransfer.setData("items", JSON.stringify(te()));
    }, de = (C, b) => {
      C.preventDefault();
      let _ = JSON.parse(C.dataTransfer.getData("items"));
      if (_.find((x) => x.storage != m.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      s.emit("vf-modal-show", { type: "move", items: { from: _, to: b } });
    }, ne = (C, b) => {
      C.preventDefault(), !b || b.type !== "dir" || d.value.getSelection().find((_) => _ == C.currentTarget) ? (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none") : C.dataTransfer.dropEffect = "copy";
    }, ce = () => {
      d.value = new Ie({
        area: h.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), s.on("vf-explorer-update", () => ge(() => {
        d.value.clearSelection(), d.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + y)
        });
      })), d.value.subscribe("predragstart", ({ event: C, isDragging: b }) => {
        if (b)
          c.value = d.value.getSelection().length, d.value.break();
        else {
          const _ = C.target.offsetWidth - C.offsetX, x = C.target.offsetHeight - C.offsetY;
          _ < 15 && x < 15 && (d.value.clearSelection(), d.value.break());
        }
      }), d.value.subscribe("predragmove", ({ isDragging: C }) => {
        C && d.value.break();
      }), d.value.subscribe("callback", ({ items: C, event: b, isDragging: _ }) => {
        s.emit("vf-nodes-selected", te()), c.value = d.value.getSelection().length;
      });
    };
    return K(() => {
      O = new qe(h.value), ce();
    }), Be(() => {
      d.value.Area.reset(), d.value.SelectorArea.updatePos(), O.update();
    }), K(() => {
      le(() => t.view, () => s.emit("vf-explorer-update"));
    }), Oe(() => {
      O.destroy();
    }), (C, b) => (r(), v("div", Rt, [
      l.view == "list" || D.value.length ? (r(), v("div", Pt, [
        e("div", {
          onClick: b[0] || (b[0] = (_) => G("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          U(u(a(f)("Name")) + " ", 1),
          R(P(me, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, A.active && A.column == "basename"]
          ])
        ]),
        D.value.length ? V("", !0) : (r(), v("div", {
          key: 0,
          onClick: b[1] || (b[1] = (_) => G("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          U(u(a(f)("Size")) + " ", 1),
          R(P(me, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, A.active && A.column == "file_size"]
          ])
        ])),
        D.value.length ? V("", !0) : (r(), v("div", {
          key: 1,
          onClick: b[2] || (b[2] = (_) => G("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          U(u(a(f)("Date")) + " ", 1),
          R(P(me, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, A.active && A.column == "last_modified"]
          ])
        ])),
        D.value.length ? (r(), v("div", {
          key: 2,
          onClick: b[3] || (b[3] = (_) => G("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          U(u(a(f)("Filepath")) + " ", 1),
          R(P(me, {
            direction: A.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, A.active && A.column == "path"]
          ])
        ])) : V("", !0)
      ])) : V("", !0),
      e("div", Gt, [
        e("div", {
          ref_key: "dragImage",
          ref: p,
          class: "absolute -z-50 -top-96"
        }, [
          Yt,
          e("div", Jt, u(c.value), 1)
        ], 512)
      ]),
      e("div", {
        onTouchstart: j,
        onContextmenu: b[10] || (b[10] = Z((_) => a(s).emit("vf-contextmenu-show", { event: _, area: h.value, items: te() }), ["self", "prevent"])),
        class: T([w.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: h
      }, [
        D.value.length ? (r(!0), v(H, { key: 0 }, J(ee(), (_, x) => (r(), v("div", {
          onDblclick: ($) => I(_),
          onTouchstart: b[4] || (b[4] = ($) => z($)),
          onTouchend: b[5] || (b[5] = ($) => F()),
          onContextmenu: Z(($) => a(s).emit("vf-contextmenu-show", { event: $, area: h.value, items: te(), target: _ }), ["prevent"]),
          class: T(["vf-item-" + a(y), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": _.type,
          "data-item": JSON.stringify(_),
          "data-index": x
        }, [
          e("div", Wt, [
            e("div", Xt, [
              _.type == "dir" ? (r(), v("svg", Qt, eo)) : (r(), v("svg", to, so)),
              e("span", ao, u(_.basename), 1)
            ]),
            e("div", no, u(_.path), 1)
          ])
        ], 42, Kt))), 256)) : V("", !0),
        l.view == "list" && !D.value.length ? (r(!0), v(H, { key: 1 }, J(ee(), (_, x) => (r(), v("div", {
          draggable: "true",
          onDblclick: ($) => I(_),
          onTouchstart: b[6] || (b[6] = ($) => z($)),
          onTouchend: b[7] || (b[7] = ($) => F()),
          onContextmenu: Z(($) => a(s).emit("vf-contextmenu-show", { event: $, area: h.value, items: te(), target: _ }), ["prevent"]),
          onDragstart: ($) => ie($),
          onDragover: ($) => ne($, _),
          onDrop: ($) => de($, _),
          class: T(["vf-item-" + a(y), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": _.type,
          "data-item": JSON.stringify(_),
          "data-index": x
        }, [
          e("div", lo, [
            e("div", io, [
              _.type == "dir" ? (r(), v("svg", co, mo)) : (r(), v("svg", vo, ho)),
              e("span", fo, u(_.basename), 1)
            ]),
            e("div", go, u(_.file_size ? a(B)(_.file_size) : ""), 1),
            e("div", ko, u(a(Ee)(_.last_modified)), 1)
          ])
        ], 42, ro))), 256)) : V("", !0),
        l.view == "grid" && !D.value.length ? (r(!0), v(H, { key: 2 }, J(ee(!1), (_, x) => (r(), v("div", {
          draggable: "true",
          onDblclick: ($) => I(_),
          onTouchstart: b[8] || (b[8] = ($) => z($)),
          onTouchend: b[9] || (b[9] = ($) => F()),
          onContextmenu: Z(($) => a(s).emit("vf-contextmenu-show", { event: $, area: h.value, items: te(), target: _ }), ["prevent"]),
          onDragstart: ($) => ie($),
          onDragover: ($) => ne($, _),
          onDrop: ($) => de($, _),
          class: T(["vf-item-" + a(y), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": _.type,
          "data-item": JSON.stringify(_),
          "data-index": x
        }, [
          e("div", null, [
            e("div", xo, [
              _.type == "dir" ? (r(), v("svg", bo, yo)) : (_.mime_type ?? "").startsWith("image") ? (r(), v("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": a(be)(a(m).value, _.path),
                alt: _.basename
              }, null, 8, $o)) : (r(), v("svg", Co, jo)),
              !(_.mime_type ?? "").startsWith("image") && _.type != "dir" ? (r(), v("div", So, u(n(_.extension)), 1)) : V("", !0)
            ]),
            e("span", Do, u(a(we)(_.basename)), 1)
          ])
        ], 42, _o))), 256)) : V("", !0)
      ], 34),
      P(It)
    ]));
  }
}), Eo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Fo = { class: "flex leading-5 items-center" }, Vo = ["aria-label"], Bo = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), Ao = [
  Bo
], Lo = ["value"], No = { class: "ml-3" }, Uo = { key: 0 }, To = { class: "ml-1" }, Ho = { class: "flex leading-5 items-center justify-end" }, Io = {
  value: "",
  disabled: ""
}, qo = /* @__PURE__ */ Ae('<option value="en">English</option><option value="fr">French (Français)</option><option value="de">German (Deutsch)</option><option value="he">Hebrew (עִברִית)</option><option value="hi">Hindi (हिंदी)</option><option value="fa">Persian (فارسی)</option><option value="ru">Russian (Pусский)</option><option value="sv">Swedish (Svenska)</option><option value="tr">Turkish (Türkçe)</option><option value="zhCN">Simplified Chinese (简体中文)</option><option value="zhTW">Traditional Chinese (繁體中文)</option>', 11), Ro = ["aria-label"], Po = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Go = [
  Po
], Yo = {
  name: "VFStatusbar"
}, Jo = /* @__PURE__ */ Object.assign(Yo, {
  props: {
    data: Object
  },
  setup(l) {
    const t = k("emitter"), { getStore: s, setStore: o } = k("storage"), i = g(0), m = k("adapter"), { t: n, changeLocale: h, locale: p } = k("i18n"), c = () => {
      t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: m.value } }), o("adapter", m.value);
    };
    t.on("vf-nodes-selected", (f) => {
      i.value = f.length;
    });
    const d = g("");
    return t.on("vf-search-query", ({ newQuery: f }) => {
      d.value = f;
    }), (f, y) => (r(), v("div", Eo, [
      e("div", Fo, [
        e("div", {
          class: "mx-2",
          "aria-label": a(n)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Ao, 8, Vo),
        R(e("select", {
          "onUpdate:modelValue": y[0] || (y[0] = (w) => re(m) ? m.value = w : null),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (r(!0), v(H, null, J(l.data.storages, (w) => (r(), v("option", { value: w }, u(w), 9, Lo))), 256))
        ], 544), [
          [ye, a(m)]
        ]),
        e("div", No, [
          d.value.length ? (r(), v("span", Uo, u(l.data.files.length) + " items found. ", 1)) : V("", !0),
          e("span", To, u(i.value > 0 ? i.value + " " + a(n)("item(s) selected.") : ""), 1)
        ])
      ]),
      e("div", Ho, [
        R(e("select", {
          "onUpdate:modelValue": y[1] || (y[1] = (w) => re(p) ? p.value = w : null),
          onChange: y[2] || (y[2] = (w) => a(h)(w.target.value)),
          class: "w-[120px] delay-200 duration-300 hover:w-full transition-[width] py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8 mr-3"
        }, [
          e("option", Io, u(a(n)("Language")), 1),
          qo
        ], 544), [
          [ye, a(p)]
        ]),
        e("span", {
          class: "mr-1",
          "aria-label": a(n)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: y[3] || (y[3] = (w) => a(t).emit("vf-modal-show", { type: "about" }))
        }, Go, 8, Ro)
      ])
    ]));
  }
}), Ko = (l, t = 0, s = !1) => {
  let o;
  return (...i) => {
    s && !o && l(...i), clearTimeout(o), o = setTimeout(() => {
      l(...i);
    }, t);
  };
}, Wo = (l, t, s) => {
  const o = g(l);
  return Le((m, n) => ({
    get() {
      return m(), o.value;
    },
    set: Ko(
      (h) => {
        o.value = h, n();
      },
      t,
      s
    )
  }));
}, Xo = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Qo = ["aria-label"], Zo = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), es = [
  Zo
], ts = ["aria-label"], os = /* @__PURE__ */ e("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), ss = [
  os
], as = ["aria-label"], ns = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), rs = [
  ns
], ls = /* @__PURE__ */ e("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), is = [
  ls
], ds = { class: "flex leading-5" }, cs = /* @__PURE__ */ e("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), us = ["title", "onClick"], ms = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, vs = /* @__PURE__ */ e("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), ps = /* @__PURE__ */ e("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), hs = [
  vs,
  ps
], fs = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full"
}, gs = /* @__PURE__ */ e("div", null, [
  /* @__PURE__ */ e("svg", {
    class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    })
  ])
], -1), ks = ["placeholder"], _s = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), xs = [
  _s
], bs = {
  name: "VFBreadcrumb"
}, ws = /* @__PURE__ */ Object.assign(bs, {
  props: {
    data: Object
  },
  setup(l) {
    const t = k("emitter");
    k("storage");
    const s = k("adapter"), o = g(null), i = g([]), m = g(!1), n = g(null), h = l, { t: p } = k("i18n"), c = k("loadingState");
    t.on("vf-explorer-update", () => {
      let F = [], M = [];
      o.value = h.data.dirname ?? s.value + "://", o.value.length == 0 && (i.value = []), o.value.replace(s.value + "://", "").split("/").forEach(function(j) {
        F.push(j), F.join("/") != "" && M.push({
          basename: j,
          name: j,
          path: s.value + "://" + F.join("/"),
          type: "dir"
        });
      }), M.length > 4 && (M = M.slice(-5), M[0].name = ".."), i.value = M;
    });
    const d = () => {
      m.value = !1, y.value = "";
    };
    t.on("vf-search-exit", () => {
      d();
    });
    const f = () => {
      m.value = !0, ge(() => n.value.focus());
    }, y = Wo("", 400), w = () => c.value;
    le(y, (F) => {
      t.emit("vf-toast-clear"), t.emit("vf-search-query", { newQuery: F });
    });
    const B = () => i.value.length && !m.value, O = (F) => {
      F.preventDefault();
      let M = JSON.parse(F.dataTransfer.getData("items"));
      if (M.find((j) => j.storage != s.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: M, to: i.value[i.value.length - 2] ?? { path: s.value + "://" } }
      });
    }, D = (F) => {
      F.preventDefault(), B() ? F.dataTransfer.dropEffect = "copy" : (F.dataTransfer.dropEffect = "none", F.dataTransfer.effectAllowed = "none");
    }, S = () => {
      y.value == "" && d();
    };
    return (F, M) => (r(), v("div", Xo, [
      e("span", {
        "aria-label": a(p)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (r(), v("svg", {
          onDragover: M[0] || (M[0] = (j) => D(j)),
          onDrop: M[1] || (M[1] = (j) => O(j)),
          onClick: M[2] || (M[2] = (j) => {
            var z;
            return !B() || a(t).emit("vf-fetch", { params: { q: "index", adapter: l.data.adapter, path: ((z = i.value[i.value.length - 2]) == null ? void 0 : z.path) ?? a(s) + "://" } });
          }),
          class: T(["h-6 w-6 p-0.5 rounded", B() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, es, 34))
      ], 8, Qo),
      w() ? (r(), v("span", {
        key: 1,
        "aria-label": a(p)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (r(), v("svg", {
          onClick: M[4] || (M[4] = (j) => a(t).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, rs))
      ], 8, as)) : (r(), v("span", {
        key: 0,
        "aria-label": a(p)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (r(), v("svg", {
          onClick: M[3] || (M[3] = (j) => {
            a(t).emit("vf-fetch", { params: { q: "index", adapter: l.data.adapter, path: l.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, ss))
      ], 8, ts)),
      m.value ? (r(), v("div", fs, [
        gs,
        R(e("input", {
          ref_key: "searchInput",
          ref: n,
          onKeydown: se(d, ["esc"]),
          onBlur: S,
          "onUpdate:modelValue": M[6] || (M[6] = (j) => re(y) ? y.value = j : null),
          placeholder: a(p)("Search anything.."),
          class: "w-full pt-1 pb-0 px-2 border-0 text-sm ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, ks), [
          [ae, a(y)]
        ]),
        (r(), v("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: d,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, xs))
      ])) : (r(), v("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Z(f, ["self"])
      }, [
        (r(), v("svg", {
          onClick: M[5] || (M[5] = (j) => a(t).emit("vf-fetch", { params: { q: "index", adapter: l.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, is)),
        e("div", ds, [
          (r(!0), v(H, null, J(i.value, (j, z) => (r(), v("div", { key: z }, [
            cs,
            e("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: j.basename,
              onClick: (I) => a(t).emit("vf-fetch", { params: { q: "index", adapter: l.data.adapter, path: j.path } })
            }, u(j.name), 9, us)
          ]))), 128))
        ]),
        w() ? (r(), v("svg", ms, hs)) : V("", !0)
      ]))
    ]));
  }
}), ys = ["onClick"], $s = /* @__PURE__ */ e("span", { class: "px-1" }, null, -1), Cs = {
  name: "VFContextMenu"
}, Ms = /* @__PURE__ */ Object.assign(Cs, {
  props: {
    current: Object
  },
  setup(l) {
    const t = k("emitter"), s = g(null), { apiUrl: o } = X(), i = k("root"), m = l, n = ve({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), h = g([]);
    t.on("vf-context-selected", (w) => {
      h.value = w;
    });
    const { t: p } = k("i18n"), c = {
      newfolder: {
        title: () => p("New Folder"),
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: () => p("Delete"),
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: h });
        }
      },
      refresh: {
        title: () => p("Refresh"),
        action: () => {
          t.emit("vf-fetch", { params: { q: "index", adapter: m.current.adapter, path: m.current.dirname } });
        }
      },
      preview: {
        title: () => p("Preview"),
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: m.current.adapter, item: h.value[0] });
        }
      },
      open: {
        title: () => p("Open"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: m.current.adapter, path: h.value[0].path } });
        }
      },
      openDir: {
        title: () => p("Open containing folder"),
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: m.current.adapter, path: h.value[0].dir } });
        }
      },
      download: {
        title: () => p("Download"),
        action: () => {
          const w = o.value + "?" + oe({ q: "download", adapter: m.current.adapter, path: h.value[0].path });
          t.emit("vf-download", w);
        }
      },
      archive: {
        title: () => p("Archive"),
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: h });
        }
      },
      unarchive: {
        title: () => p("Unarchive"),
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: h });
        }
      },
      rename: {
        title: () => p("Rename"),
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: h });
        }
      }
    }, d = (w) => {
      t.emit("vf-contextmenu-hide"), w.action();
    }, f = g("");
    t.on("vf-search-query", ({ newQuery: w }) => {
      f.value = w;
    }), t.on("vf-contextmenu-show", ({ event: w, area: B, items: O, target: D = null }) => {
      if (n.items = [], f.value)
        if (D)
          n.items.push(c.openDir), t.emit("vf-context-selected", [D]);
        else
          return;
      else
        !D && !f.value ? (n.items.push(c.refresh), n.items.push(c.newfolder), t.emit("vf-context-selected", [])) : O.length > 1 && O.some((S) => S.path === D.path) ? (n.items.push(c.refresh), n.items.push(c.archive), n.items.push(c.delete), t.emit("vf-context-selected", O)) : (D.type == "dir" ? n.items.push(c.open) : (n.items.push(c.preview), n.items.push(c.download)), n.items.push(c.rename), D.mime_type == "application/zip" ? n.items.push(c.unarchive) : n.items.push(c.archive), n.items.push(c.delete), t.emit("vf-context-selected", [D]));
      y(w, B);
    }), t.on("vf-contextmenu-hide", () => {
      n.active = !1;
    });
    const y = (w, B) => {
      n.active = !0, ge(() => {
        const O = i.value.getBoundingClientRect(), D = B.getBoundingClientRect();
        let S = w.pageX - O.left, F = w.pageY - O.top, M = s.value.offsetHeight, j = s.value.offsetWidth;
        S = D.right - w.pageX + window.scrollX < j ? S - j : S, F = D.bottom - w.pageY + window.scrollY < M ? F - M : F, n.positions = {
          left: S + "px",
          top: F + "px"
        };
      });
    };
    return (w, B) => n.active ? (r(), v("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: s,
      style: ze(n.positions)
    }, [
      (r(!0), v(H, null, J(n.items, (O) => (r(), v("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: O.title,
        onClick: (D) => d(O)
      }, [
        $s,
        e("span", null, u(O.title()), 1)
      ], 8, ys))), 128))
    ], 4)) : V("", !0);
  }
}), js = (l, t) => {
  const s = l[t];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((o, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + t)));
  });
};
async function Ss(l) {
  return (await js(/* @__PURE__ */ Object.assign({ "../locales/de.js": () => import("./de-3f6147f5.js"), "../locales/en.js": () => import("./en-ffed8966.js"), "../locales/fa.js": () => import("./fa-7534f880.js"), "../locales/he.js": () => import("./he-1978fb6e.js"), "../locales/hi.js": () => import("./hi-ffd5a2ba.js"), "../locales/ru.js": () => import("./ru-9f317caf.js"), "../locales/sv.js": () => import("./sv-07e3c393.js"), "../locales/tr.js": () => import("./tr-ce32e2ae.js"), "../locales/zhCN.js": () => import("./zhCN-9b524820.js"), "../locales/zhTW.js": () => import("./zhTW-a803434e.js") }), `../locales/${l}.js`)).default;
}
function Ds(l, t, s) {
  const { getStore: o, setStore: i } = xe(l), m = g({}), n = g(o("locale", t)), h = (d, f = "en") => {
    Ss(d).then((y) => {
      m.value = y, i("locale", d), n.value = d, i("translations", y), s.emit("vf-toast-push", { label: "The language is set to " + d });
    }).catch((y) => {
      f ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), h(f, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  o("locale") ? m.value = o("translations") : h(t);
  const p = (d, ...f) => f.length ? p(d = d.replace("%s", f.shift()), ...f) : d;
  function c(d, ...f) {
    return m.value.hasOwnProperty(d) ? p(m.value[d], ...f) : p(d, ...f);
  }
  return { t: c, changeLocale: h, locale: n };
}
function Me(l, t, s, o, i) {
  return (t = Math, s = t.log, o = 1024, i = s(l) / s(o) | 0, l / t.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function je(l, t, s, o, i) {
  return (t = Math, s = t.log, o = 1e3, i = s(l) / s(o) | 0, l / t.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Os(l) {
  const t = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(l);
  return o[1] * Math.pow(1024, t[o[2].toLowerCase()]);
}
const zs = /* @__PURE__ */ e("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Es = {
  name: "VueFinder"
}, Fs = /* @__PURE__ */ Object.assign(Es, {
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
    usePropDarkMode: {
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
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    postData: {
      type: Object,
      default: {}
    }
  },
  setup(l) {
    const t = l, s = He(), { setStore: o, getStore: i } = xe(t.id), m = g(i("adapter")), n = g(null);
    Y("root", n), Y("emitter", s), Y("storage", xe(t.id)), Y("postData", t.postData), Y("adapter", m), Y("maxFileSize", t.maxFileSize), Y("usePropDarkMode", t.usePropDarkMode);
    const h = Ds(t.id, t.locale, s);
    Y("i18n", h);
    const { apiUrl: p, setApiUrl: c } = X();
    c(t.url);
    const d = ve({ adapter: m.value, storages: [], dirname: ".", files: [] }), f = g(i("viewport", "grid")), y = t.usePropDarkMode ? Ne(() => t.dark) : g(i("darkMode", t.dark));
    Y("darkMode", y), s.on("vf-darkMode-toggle", () => {
      y.value = !y.value, o("darkMode", y.value);
    });
    const w = g(i("metricUnits", !1));
    Y("metricUnits", w);
    const B = g(w.value ? je : Me);
    le(w, (j) => {
      B.value = j ? je : Me;
    }), Y("filesize", B), s.on("vf-metric-units-saved", (j) => {
      w.value = j, o("metricUnits", j);
    });
    const O = g(!1);
    Y("loadingState", O);
    const D = g(i("full-screen", !1));
    s.on("vf-fullscreen-toggle", () => {
      D.value = !D.value, o("full-screen", D.value);
    }), s.on("vf-view-toggle", (j) => {
      f.value = j;
    });
    const S = ve({
      active: !1,
      type: "delete",
      data: {}
    });
    s.on("vf-modal-close", () => {
      S.active = !1;
    }), s.on("vf-modal-show", (j) => {
      S.active = !0, S.type = j.type, S.data = j;
    });
    const F = (j) => {
      Object.assign(d, j), s.emit("vf-nodes-selected", {}), s.emit("vf-explorer-update");
    };
    let M;
    return s.on("vf-fetch-abort", () => {
      M.abort(), O.value = !1;
    }), s.on("vf-fetch", ({ params: j, onSuccess: z = null, onError: I = null, noCloseModal: A = !1 }) => {
      ["index", "search"].includes(j.q) && (M && M.abort(), O.value = !0), M = new AbortController();
      const ee = M.signal;
      fe(p.value, { params: j, signal: ee }).then((G) => {
        m.value = G.adapter, ["index", "search"].includes(j.q) && (O.value = !1), A || s.emit("vf-modal-close"), F(G), z(G);
      }).catch((G) => {
        I && I(G);
      }).finally(() => {
      });
    }), s.on("vf-download", (j) => {
      document.getElementById("download_frame").src = j, s.emit("vf-modal-close");
    }), K(() => {
      s.emit("vf-fetch", { params: { q: "index", adapter: m.value } });
    }), (j, z) => (r(), v("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: n
    }, [
      e("div", {
        class: T(a(y) ? "dark" : "")
      }, [
        e("div", {
          class: T([D.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: ze(D.value ? "" : "max-height: " + l.maxHeight),
          onMousedown: z[0] || (z[0] = (I) => a(s).emit("vf-contextmenu-hide")),
          onTouchstart: z[1] || (z[1] = (I) => a(s).emit("vf-contextmenu-hide"))
        }, [
          P(Et, { data: d }, null, 8, ["data"]),
          P(ws, { data: d }, null, 8, ["data"]),
          P(zo, {
            view: f.value,
            data: d
          }, null, 8, ["view", "data"]),
          P(Jo, { data: d }, null, 8, ["data"])
        ], 38),
        S.active ? (r(), N(Ue("v-f-modal-" + S.type), {
          key: 0,
          selection: S.data,
          current: d
        }, null, 8, ["selection", "current"])) : V("", !0),
        P(Ms, { current: d }, null, 8, ["current"]),
        zs
      ], 2)
    ], 512));
  }
}), Vs = /* @__PURE__ */ e("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Bs = { class: "fixed z-10 inset-0 overflow-hidden" }, As = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, Ls = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Ns = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, W = {
  __name: "ModalLayout",
  setup(l) {
    const t = k("emitter");
    return K(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, o) => (r(), v("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = se((i) => a(t).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Vs,
      e("div", Bs, [
        e("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = Z((i) => a(t).emit("vf-modal-close"), ["self"]))
        }, [
          e("div", As, [
            e("div", Ls, [
              pe(s.$slots, "default")
            ]),
            e("div", Ns, [
              pe(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Us = ["aria-label"], Ts = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Hs = [
  Ts
], Is = {
  name: "Message"
}, Q = /* @__PURE__ */ Object.assign(Is, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(l, { emit: t }) {
    var p;
    const { t: s } = k("i18n"), o = g(!1), i = g(null), m = g((p = i.value) == null ? void 0 : p.strMessage), n = t;
    le(m, () => o.value = !1);
    const h = () => {
      n("hidden"), o.value = !0;
    };
    return (c, d) => (r(), v("div", null, [
      o.value ? V("", !0) : (r(), v("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: T(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", l.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        pe(c.$slots, "default"),
        e("div", {
          class: "ml-auto cursor-pointer",
          onClick: h,
          "aria-label": a(s)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Hs, 8, Us)
      ], 2))
    ]));
  }
}), qs = { class: "sm:flex sm:items-start" }, Rs = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Ps = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Gs = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ys = { class: "mt-2" }, Js = { class: "text-sm text-gray-500" }, Ks = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Ws = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Xs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qs = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zs = [
  Qs
], ea = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ta = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), oa = [
  ta
], sa = { class: "ml-1.5" }, aa = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, na = {
  name: "VFModalDelete"
}, ra = /* @__PURE__ */ Object.assign(na, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter");
    k("storage");
    const s = k("adapter"), { t: o } = k("i18n"), i = l, m = g(i.selection.items), n = g(""), h = () => {
      m.value.length && t.emit("vf-fetch", {
        params: {
          q: "delete",
          adapter: s.value,
          path: i.current.dirname,
          items: JSON.stringify(m.value.map(({ path: p, type: c }) => ({ path: p, type: c })))
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (p) => {
          n.value = o(p.message);
        }
      });
    };
    return (p, c) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: h,
          class: "vf-btn vf-btn-danger"
        }, u(a(o)("Yes, Delete!")), 1),
        e("button", {
          type: "button",
          onClick: c[1] || (c[1] = (d) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(o)("Cancel")), 1),
        e("div", aa, u(a(o)("This action cannot be undone.")), 1)
      ]),
      default: E(() => [
        e("div", qs, [
          Rs,
          e("div", Ps, [
            e("h3", Gs, u(a(o)("Delete files")), 1),
            e("div", Ys, [
              e("p", Js, u(a(o)("Are you sure you want to delete these files?")), 1),
              e("div", Ks, [
                (r(!0), v(H, null, J(m.value, (d) => (r(), v("p", Ws, [
                  d.type === "dir" ? (r(), v("svg", Xs, Zs)) : (r(), v("svg", ea, oa)),
                  e("span", sa, u(d.basename), 1)
                ]))), 256))
              ]),
              n.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: c[0] || (c[0] = (d) => n.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(n.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), la = { class: "sm:flex sm:items-start" }, ia = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), da = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ca = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ua = { class: "mt-2" }, ma = { class: "text-sm text-gray-500" }, va = {
  name: "VFModalMessage"
}, pa = /* @__PURE__ */ Object.assign(va, {
  props: {
    selection: Object
  },
  setup(l) {
    const t = k("emitter"), { t: s } = k("i18n");
    return (o, i) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: i[0] || (i[0] = (m) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(s)("Close")), 1)
      ]),
      default: E(() => {
        var m, n;
        return [
          e("div", la, [
            ia,
            e("div", da, [
              e("h3", ca, u(((m = l.selection) == null ? void 0 : m.title) ?? "Title"), 1),
              e("div", ua, [
                e("p", ma, u(((n = l.selection) == null ? void 0 : n.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), ha = { class: "sm:flex sm:items-start" }, fa = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), ga = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ka = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _a = { class: "mt-2" }, xa = { class: "text-sm text-gray-500" }, ba = ["placeholder"], wa = {
  name: "VFModalNewFolder"
}, ya = /* @__PURE__ */ Object.assign(wa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter");
    k("storage");
    const s = k("adapter"), { t: o } = k("i18n"), i = l, m = g(""), n = g(""), h = () => {
      m.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfolder",
          adapter: s.value,
          path: i.current.dirname,
          name: m.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is created.", m.value) });
        },
        onError: (p) => {
          n.value = o(p.message);
        }
      });
    };
    return (p, c) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: h,
          class: "vf-btn vf-btn-primary"
        }, u(a(o)("Create")), 1),
        e("button", {
          type: "button",
          onClick: c[2] || (c[2] = (d) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(o)("Cancel")), 1)
      ]),
      default: E(() => [
        e("div", ha, [
          fa,
          e("div", ga, [
            e("h3", ka, u(a(o)("New Folder")), 1),
            e("div", _a, [
              e("p", xa, u(a(o)("Create a new folder")), 1),
              R(e("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (d) => m.value = d),
                onKeyup: se(h, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(o)("Folder Name"),
                type: "text"
              }, null, 40, ba), [
                [ae, m.value]
              ]),
              n.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: c[1] || (c[1] = (d) => n.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(n.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $a = { class: "sm:flex sm:items-start" }, Ca = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ma = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ja = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sa = { class: "mt-2" }, Da = { class: "text-sm text-gray-500" }, Oa = ["placeholder"], za = {
  name: "VFModalNewFile"
}, Ea = /* @__PURE__ */ Object.assign(za, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter");
    k("storage");
    const s = k("adapter"), { t: o } = k("i18n"), i = l, m = g(""), n = g(""), h = () => {
      m.value != "" && t.emit("vf-fetch", {
        params: {
          q: "newfile",
          adapter: s.value,
          path: i.current.dirname,
          name: m.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is created.", m.value) });
        },
        onError: (p) => {
          n.value = o(p.message);
        }
      });
    };
    return (p, c) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: h,
          class: "vf-btn vf-btn-primary"
        }, u(a(o)("Create")), 1),
        e("button", {
          type: "button",
          onClick: c[2] || (c[2] = (d) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(o)("Cancel")), 1)
      ]),
      default: E(() => [
        e("div", $a, [
          Ca,
          e("div", Ma, [
            e("h3", ja, u(a(o)("New File")), 1),
            e("div", Sa, [
              e("p", Da, u(a(o)("Create a new file")), 1),
              R(e("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (d) => m.value = d),
                onKeyup: se(h, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(o)("File Name"),
                type: "text"
              }, null, 40, Oa), [
                [ae, m.value]
              ]),
              n.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: c[1] || (c[1] = (d) => n.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(n.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fa = { class: "flex" }, Va = ["aria-label"], Ba = { class: "ml-auto mb-2" }, Aa = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, La = { key: 1 }, Na = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(l, { emit: t }) {
    const s = t, o = g(""), i = g(""), m = g(null), n = g(!1), { apiUrl: h } = X(), p = l, c = g(""), d = g(!1), { t: f } = k("i18n");
    K(() => {
      fe(h.value, {
        params: { q: "preview", adapter: p.selection.adapter, path: p.selection.item.path },
        json: !1
      }).then((O) => {
        o.value = O, s("load");
      });
    });
    const y = () => {
      n.value = !n.value, i.value = o.value, n.value == !0 && ge(() => {
        m.value.focus();
      });
    }, w = k("postData"), B = () => {
      c.value = "", d.value = !1, fe(h.value, {
        method: "POST",
        params: Object.assign(w, {
          q: "save",
          adapter: p.selection.adapter,
          path: p.selection.item.path,
          content: i.value
        }),
        json: !1
      }).then((O) => {
        c.value = f("Updated."), o.value = O, s("load"), n.value = !n.value;
      }).catch((O) => {
        c.value = f(O.message), d.value = !0;
      });
    };
    return (O, D) => (r(), v(H, null, [
      e("div", Fa, [
        e("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": l.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(l.selection.item.basename), 9, Va),
        e("div", Ba, [
          n.value ? (r(), v("button", {
            key: 0,
            onClick: B,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, u(a(f)("Save")), 1)) : V("", !0),
          e("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: D[0] || (D[0] = (S) => y())
          }, u(n.value ? a(f)("Cancel") : a(f)("Edit")), 1)
        ])
      ]),
      e("div", null, [
        n.value ? (r(), v("div", La, [
          R(e("textarea", {
            ref_key: "editInput",
            ref: m,
            "onUpdate:modelValue": D[1] || (D[1] = (S) => i.value = S),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ae, i.value]
          ])
        ])) : (r(), v("pre", Aa, u(o.value), 1)),
        c.value.length ? (r(), N(Q, {
          key: 2,
          onHidden: D[2] || (D[2] = (S) => c.value = ""),
          error: d.value
        }, {
          default: E(() => [
            U(u(c.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : V("", !0)
      ])
    ], 64));
  }
}, Ua = { class: "flex" }, Ta = ["aria-label"], Ha = { class: "ml-auto mb-2" }, Ia = { class: "w-full flex justify-center" }, qa = ["src"], Ra = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(l, { emit: t }) {
    const s = t, o = l, { t: i } = k("i18n"), { apiUrl: m } = X(), n = g(null), h = g(null), p = g(!1), c = g(""), d = g(!1), f = () => {
      p.value = !p.value, p.value ? h.value = new Re(n.value, {
        crop(B) {
        }
      }) : h.value.destroy();
    }, y = k("postData"), w = () => {
      h.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (B) => {
          c.value = "", d.value = !1, fe(m.value, {
            method: "POST",
            params: Object.assign(y, {
              q: "upload",
              adapter: o.selection.adapter,
              path: o.selection.item.path,
              file: B
            }),
            name: o.selection.item.basename,
            json: !1
          }).then((O) => {
            c.value = i("Updated."), n.value.src = be(o.selection.adapter, o.selection.item.path), f(), s("load");
          }).catch((O) => {
            c.value = i(O.message), d.value = !0;
          });
        }
      );
    };
    return K(() => {
      s("load");
    }), (B, O) => (r(), v(H, null, [
      e("div", Ua, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": l.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(l.selection.item.basename), 9, Ta),
        e("div", Ha, [
          p.value ? (r(), v("button", {
            key: 0,
            onClick: w,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, u(a(i)("Crop")), 1)) : V("", !0),
          e("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: O[0] || (O[0] = (D) => f())
          }, u(p.value ? a(i)("Cancel") : a(i)("Edit")), 1)
        ])
      ]),
      e("div", Ia, [
        e("img", {
          ref_key: "image",
          ref: n,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(be)(o.selection.adapter, o.selection.item.path),
          alt: ""
        }, null, 8, qa)
      ]),
      c.value.length ? (r(), N(Q, {
        key: 0,
        onHidden: O[1] || (O[1] = (D) => c.value = ""),
        error: d.value
      }, {
        default: E(() => [
          U(u(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : V("", !0)
    ], 64));
  }
}, Pa = { class: "flex" }, Ga = ["aria-label"], Ya = /* @__PURE__ */ e("div", null, null, -1), Ja = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(l, { emit: t }) {
    const s = t;
    return K(() => {
      s("load");
    }), (o, i) => (r(), v(H, null, [
      e("div", Pa, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": l.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(l.selection.item.basename), 9, Ga)
      ]),
      Ya
    ], 64));
  }
}, Ka = ["aria-label"], Wa = {
  class: "w-full",
  preload: "",
  controls: ""
}, Xa = ["src"], Qa = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(l, { emit: t }) {
    const { apiUrl: s } = X(), o = l, i = t, m = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return K(() => {
      i("load");
    }), (n, h) => (r(), v(H, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": l.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(l.selection.item.basename), 9, Ka),
      e("div", null, [
        e("video", Wa, [
          e("source", {
            src: m(),
            type: "video/mp4"
          }, null, 8, Xa),
          U(" Your browser does not support the video tag. ")
        ])
      ])
    ], 64));
  }
}, Za = ["aria-label"], en = {
  class: "w-full",
  controls: ""
}, tn = ["src"], on = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(l, { emit: t }) {
    const { apiUrl: s } = X(), o = l, i = t, m = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return K(() => {
      i("load");
    }), (n, h) => (r(), v(H, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": l.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(l.selection.item.basename), 9, Za),
      e("div", null, [
        e("audio", en, [
          e("source", {
            src: m(),
            type: "audio/mpeg"
          }, null, 8, tn),
          U(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, sn = ["aria-label"], an = ["data"], nn = ["src"], rn = /* @__PURE__ */ e("p", null, [
  /* @__PURE__ */ U(" Your browser does not support PDFs. "),
  /* @__PURE__ */ e("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ U(" . ")
], -1), ln = [
  rn
], dn = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(l, { emit: t }) {
    const { apiUrl: s } = X(), o = l, i = t, m = () => s.value + "?" + oe({ q: "preview", adapter: o.selection.adapter, path: o.selection.item.path });
    return K(() => {
      i("load");
    }), (n, h) => (r(), v(H, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": l.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(l.selection.item.basename), 9, sn),
      e("div", null, [
        e("object", {
          class: "h-[60vh]",
          data: m(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          e("iframe", {
            class: "border-0",
            src: m(),
            width: "100%",
            height: "100%"
          }, ln, 8, nn)
        ], 8, an)
      ])
    ], 64));
  }
}, cn = { class: "sm:flex sm:items-start" }, un = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, mn = { class: "text-gray-700 dark:text-gray-200 text-sm" }, vn = {
  key: 0,
  class: "flex leading-5"
}, pn = /* @__PURE__ */ e("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ e("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ e("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), hn = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, fn = { class: "font-bold pl-2" }, gn = { class: "font-bold pl-2" }, kn = {
  name: "VFModalPreview"
}, _n = /* @__PURE__ */ Object.assign(kn, {
  props: {
    selection: Object
  },
  setup(l) {
    const { apiUrl: t } = X(), s = k("emitter"), { t: o } = k("i18n"), i = g(!1), m = k("filesize"), n = (d) => i.value = d, h = l, p = (d) => (h.selection.item.mime_type ?? "").startsWith(d), c = () => {
      const d = t.value + "?" + oe({ q: "download", adapter: h.selection.adapter, path: h.selection.item.path });
      s.emit("vf-download", d);
    };
    return (d, f) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: f[6] || (f[6] = (y) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(o)("Close")), 1),
        e("button", {
          type: "button",
          onClick: f[7] || (f[7] = (y) => c()),
          class: "vf-btn vf-btn-primary"
        }, u(a(o)("Download")), 1)
      ]),
      default: E(() => [
        e("div", cn, [
          e("div", un, [
            e("div", null, [
              p("text") ? (r(), N(Na, {
                key: 0,
                selection: l.selection,
                onLoad: f[0] || (f[0] = (y) => n(!0))
              }, null, 8, ["selection"])) : p("image") ? (r(), N(Ra, {
                key: 1,
                selection: l.selection,
                onLoad: f[1] || (f[1] = (y) => n(!0))
              }, null, 8, ["selection"])) : p("video") ? (r(), N(Qa, {
                key: 2,
                selection: l.selection,
                onLoad: f[2] || (f[2] = (y) => n(!0))
              }, null, 8, ["selection"])) : p("audio") ? (r(), N(on, {
                key: 3,
                selection: l.selection,
                onLoad: f[3] || (f[3] = (y) => n(!0))
              }, null, 8, ["selection"])) : p("application/pdf") ? (r(), N(dn, {
                key: 4,
                selection: l.selection,
                onLoad: f[4] || (f[4] = (y) => n(!0))
              }, null, 8, ["selection"])) : (r(), N(Ja, {
                key: 5,
                selection: l.selection,
                onLoad: f[5] || (f[5] = (y) => n(!0))
              }, null, 8, ["selection"]))
            ]),
            e("div", mn, [
              i.value == !1 ? (r(), v("div", vn, [
                pn,
                e("span", null, u(a(o)("Loading")), 1)
              ])) : V("", !0)
            ])
          ])
        ]),
        e("div", hn, [
          e("div", null, [
            e("span", fn, u(a(o)("File Size")) + ": ", 1),
            U(u(a(m)(l.selection.item.file_size)), 1)
          ]),
          e("div", null, [
            e("span", gn, u(a(o)("Last Modified")) + ": ", 1),
            U(" " + u(a(Ee)(l.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xn = { class: "sm:flex sm:items-start" }, bn = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), wn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, yn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $n = { class: "mt-2" }, Cn = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Mn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Sn = [
  jn
], Dn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, On = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), zn = [
  On
], En = { class: "ml-1.5" }, Fn = {
  name: "VFModalRename"
}, Vn = /* @__PURE__ */ Object.assign(Fn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter");
    k("storage");
    const s = k("adapter"), { t: o } = k("i18n"), i = l, m = g(i.selection.items[0]), n = g(i.selection.items[0].basename), h = g(""), p = () => {
      n.value != "" && t.emit("vf-fetch", {
        params: {
          q: "rename",
          adapter: s.value,
          path: i.current.dirname,
          item: m.value.path,
          name: n.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("%s is renamed.", n.value) });
        },
        onError: (c) => {
          h.value = o(c.message);
        }
      });
    };
    return (c, d) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, u(a(o)("Rename")), 1),
        e("button", {
          type: "button",
          onClick: d[2] || (d[2] = (f) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(o)("Cancel")), 1)
      ]),
      default: E(() => [
        e("div", xn, [
          bn,
          e("div", wn, [
            e("h3", yn, u(a(o)("Rename")), 1),
            e("div", $n, [
              e("p", Cn, [
                m.value.type == "dir" ? (r(), v("svg", Mn, Sn)) : (r(), v("svg", Dn, zn)),
                e("span", En, u(m.value.basename), 1)
              ]),
              R(e("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (f) => n.value = f),
                onKeyup: se(p, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [ae, n.value]
              ]),
              h.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: d[1] || (d[1] = (f) => h.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(h.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bn = { class: "sm:flex sm:items-start" }, An = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Ln = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Un = { class: "mt-2" }, Tn = {
  key: 0,
  class: "pointer-events-none"
}, Hn = {
  key: 1,
  class: "pointer-events-none"
}, In = ["disabled"], qn = ["disabled"], Rn = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Pn = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Gn = ["textContent"], Yn = { class: "ml-1 w-full h-fit" }, Jn = { class: "text-left hidden md:block" }, Kn = { class: "text-left md:hidden" }, Wn = {
  key: 0,
  class: "ml-auto"
}, Xn = ["title", "disabled", "onClick"], Qn = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Zn = [
  Qn
], er = {
  key: 0,
  class: "py-2"
}, tr = ["disabled"], or = {
  name: "VFModalUpload"
}, sr = /* @__PURE__ */ Object.assign(or, {
  props: {
    current: Object
  },
  setup(l) {
    const { apiUrl: t } = X(), s = k("emitter"), { t: o } = k("i18n"), i = k("maxFileSize"), m = k("postData"), n = k("filesize"), h = l, p = o("uppy"), c = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, d = g({ QUEUE_ENTRY_STATUS: c }), f = g(null), y = g(null), w = g(null), B = g(null), O = g(null), D = g(null), S = g([]), F = g(""), M = g(!1), j = g(!1);
    let z;
    function I(b) {
      return S.value.findIndex((_) => _.id === b);
    }
    function A(b, _ = null) {
      _ = _ ?? (b.webkitRelativePath || b.name), z.addFile({
        name: _,
        type: b.type,
        data: b,
        source: "Local"
      });
    }
    function ee(b) {
      switch (b.status) {
        case c.DONE:
          return "text-green-600";
        case c.ERROR:
          return "text-red-600";
        case c.CANCELED:
          return "text-red-600";
        case c.PENDING:
        default:
          return "";
      }
    }
    const G = (b) => {
      switch (b.status) {
        case c.DONE:
          return "✓";
        case c.ERROR:
        case c.CANCELED:
          return "!";
        case c.PENDING:
        default:
          return "...";
      }
    };
    function te() {
      B.value.click();
    }
    function ie() {
      if (!M.value) {
        if (!S.value.filter((b) => b.status !== c.DONE).length) {
          F.value = o("Please select file to upload first.");
          return;
        }
        F.value = "", z.retryAll(), z.upload();
      }
    }
    function de() {
      z.cancelAll({ reason: "user" }), S.value.forEach((b) => {
        b.status !== c.DONE && (b.status = c.CANCELED, b.statusName = o("Canceled"));
      }), M.value = !1;
    }
    function ne(b) {
      M.value || (z.removeFile(b.id, "removed-by-user"), S.value.splice(I(b.id), 1));
    }
    function ce(b) {
      if (!M.value) {
        if (z.cancelAll({ reason: "user" }), b) {
          const _ = [];
          S.value.forEach((x) => {
            x.status !== c.DONE && _.push(x);
          }), S.value = [], _.forEach((x) => {
            A(x.originalFile, x.name);
          });
          return;
        }
        S.value.splice(0);
      }
    }
    function C() {
      s.emit("vf-modal-close");
    }
    return K(async () => {
      z = new Pe({
        debug: process.env.NODE_ENV === "development",
        restrictions: {
          maxFileSize: Os(i)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: p,
        onBeforeFileAdded(x, $) {
          if ($[x.id] != null) {
            const q = I(x.id);
            S.value[q].status === c.PENDING && (F.value = z.i18n("noDuplicates", { fileName: x.name })), S.value = S.value.filter((ke) => ke.id !== x.id);
          }
          return S.value.push({
            id: x.id,
            name: x.name,
            size: n.value(x.size),
            status: c.PENDING,
            statusName: o("Pending upload"),
            percent: null,
            originalFile: x.data
          }), !0;
        }
      }), z.use(Ge, {
        method: "post",
        endpoint: t.value + "?" + oe(Object.assign(m, { q: "upload", adapter: h.current.adapter, path: h.current.dirname })),
        headers: {
          ...he && { "X-CSRF-Token": he }
        },
        limit: 5,
        timeout: 0,
        getResponseError(x, $) {
          let L;
          try {
            L = JSON.parse(x).message;
          } catch {
            L = o("Cannot parse server response.");
          }
          return new Error(L);
        }
      }), z.on("restriction-failed", (x, $) => {
        const L = S.value[I(x.id)];
        ne(L), F.value = $.message;
      }), z.on("upload", () => {
        M.value = !0, S.value.forEach((x) => {
          x.status !== c.DONE && (x.percent = null, x.status = c.UPLOADING, x.statusName = o("Pending upload"));
        });
      }), z.on("upload-progress", (x, $) => {
        const L = Math.floor($.bytesUploaded / $.bytesTotal * 100);
        S.value[I(x.id)].percent = `${L}%`;
      }), z.on("upload-success", (x) => {
        const $ = S.value[I(x.id)];
        $.status = c.DONE, $.statusName = o("Done");
      }), z.on("upload-error", (x, $) => {
        const L = S.value[I(x.id)];
        L.percent = null, L.status = c.ERROR, $.isNetworkError ? L.statusName = o("Network Error, Unable establish connection to the server or interrupted.") : L.statusName = $ ? $.message : o("Unknown Error");
      }), z.on("error", (x) => {
        F.value = x.message, M.value = !1, s.emit("vf-fetch", {
          params: { q: "index", adapter: h.current.adapter, path: h.current.dirname },
          noCloseModal: !0
        });
      }), z.on("complete", () => {
        M.value = !1, s.emit("vf-fetch", {
          params: { q: "index", adapter: h.current.adapter, path: h.current.dirname },
          noCloseModal: !0
        });
      }), B.value.addEventListener("click", () => {
        y.value.click();
      }), O.value.addEventListener("click", () => {
        w.value.click();
      }), D.value.addEventListener("dragover", (x) => {
        x.preventDefault(), j.value = !0;
      }), D.value.addEventListener("dragleave", (x) => {
        x.preventDefault(), j.value = !1;
      });
      function b(x, $) {
        $.isFile && $.file((L) => x($, L)), $.isDirectory && $.createReader().readEntries((L) => {
          L.forEach((q) => {
            b(x, q);
          });
        });
      }
      D.value.addEventListener("drop", (x) => {
        x.preventDefault(), j.value = !1;
        const $ = /^[/\\](.+)/;
        [...x.dataTransfer.items].forEach((L) => {
          L.kind === "file" && b((q, ke) => {
            const Fe = $.exec(q.fullPath);
            A(ke, Fe[1]);
          }, L.webkitGetAsEntry());
        });
      });
      const _ = ({ target: x }) => {
        const $ = x.files;
        for (const L of $)
          A(L);
      };
      y.value.addEventListener("change", _), w.value.addEventListener("change", _);
    }), Oe(() => {
      z == null || z.close({ reason: "unmount" });
    }), (b, _) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          class: T(["vf-btn vf-btn-primary", M.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: M.value,
          onClick: Z(ie, ["prevent"])
        }, u(a(o)("Upload")), 11, tr),
        M.value ? (r(), v("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Z(de, ["prevent"])
        }, u(a(o)("Cancel")), 1)) : (r(), v("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Z(C, ["prevent"])
        }, u(a(o)("Close")), 1))
      ]),
      default: E(() => [
        e("div", Bn, [
          An,
          e("div", Ln, [
            e("h3", Nn, u(a(o)("Upload Files")), 1),
            e("div", Un, [
              e("div", {
                ref_key: "dropArea",
                ref: D,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: te
              }, [
                j.value ? (r(), v("div", Tn, u(a(o)("Release to drop these files.")), 1)) : (r(), v("div", Hn, u(a(o)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              e("div", {
                ref_key: "container",
                ref: f,
                class: "text-gray-500 mb-1"
              }, [
                e("button", {
                  ref_key: "pickFiles",
                  ref: B,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, u(a(o)("Select Files")), 513),
                e("button", {
                  ref_key: "pickFolders",
                  ref: O,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, u(a(o)("Select Folders")), 513),
                e("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: M.value,
                  onClick: _[0] || (_[0] = (x) => ce(!1))
                }, u(a(o)("Clear all")), 9, In),
                e("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: M.value,
                  onClick: _[1] || (_[1] = (x) => ce(!0))
                }, u(a(o)("Clear only successful")), 9, qn)
              ], 512),
              e("div", Rn, [
                (r(!0), v(H, null, J(S.value, (x) => (r(), v("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: x.id
                }, [
                  e("span", Pn, [
                    e("span", {
                      class: T(["text-base m-auto", ee(x)]),
                      textContent: u(G(x))
                    }, null, 10, Gn)
                  ]),
                  e("div", Yn, [
                    e("div", Jn, u(a(we)(x.name, 40)) + " (" + u(x.size) + ")", 1),
                    e("div", Kn, u(a(we)(x.name, 16)) + " (" + u(x.size) + ")", 1),
                    e("div", {
                      class: T(["flex break-all text-left", ee(x)])
                    }, [
                      U(u(x.statusName) + " ", 1),
                      x.status === d.value.QUEUE_ENTRY_STATUS.UPLOADING ? (r(), v("b", Wn, u(x.percent), 1)) : V("", !0)
                    ], 2)
                  ]),
                  e("button", {
                    type: "button",
                    class: T(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", M.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(o)("Delete"),
                    disabled: M.value,
                    onClick: ($) => ne(x)
                  }, Zn, 10, Xn)
                ]))), 128)),
                S.value.length ? V("", !0) : (r(), v("div", er, u(a(o)("No files selected!")), 1))
              ]),
              F.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: _[2] || (_[2] = (x) => F.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(F.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ]),
        e("input", {
          ref_key: "internalFileInput",
          ref: y,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        e("input", {
          ref_key: "internalFolderInput",
          ref: w,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), ar = { class: "sm:flex sm:items-start" }, nr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), rr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, lr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ir = { class: "mt-2" }, dr = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, cr = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ur = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mr = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vr = [
  mr
], pr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hr = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fr = [
  hr
], gr = { class: "ml-1.5" }, kr = ["placeholder"], _r = {
  name: "VFModalArchive"
}, xr = /* @__PURE__ */ Object.assign(_r, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter");
    k("storage");
    const s = k("adapter"), { t: o } = k("i18n"), i = l, m = g(""), n = g(""), h = g(i.selection.items), p = () => {
      h.value.length && t.emit("vf-fetch", {
        params: {
          q: "archive",
          adapter: s.value,
          path: i.current.dirname,
          items: JSON.stringify(h.value.map(({ path: c, type: d }) => ({ path: c, type: d }))),
          name: m.value
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (c) => {
          n.value = o(c.message);
        }
      });
    };
    return (c, d) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, u(a(o)("Archive")), 1),
        e("button", {
          type: "button",
          onClick: d[2] || (d[2] = (f) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(o)("Cancel")), 1)
      ]),
      default: E(() => [
        e("div", ar, [
          nr,
          e("div", rr, [
            e("h3", lr, u(a(o)("Archive the files")), 1),
            e("div", ir, [
              e("div", dr, [
                (r(!0), v(H, null, J(h.value, (f) => (r(), v("p", cr, [
                  f.type == "dir" ? (r(), v("svg", ur, vr)) : (r(), v("svg", pr, fr)),
                  e("span", gr, u(f.basename), 1)
                ]))), 256))
              ]),
              R(e("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (f) => m.value = f),
                onKeyup: se(p, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, kr), [
                [ae, m.value]
              ]),
              n.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: d[1] || (d[1] = (f) => n.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(n.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), br = { class: "sm:flex sm:items-start" }, wr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), yr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $r = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cr = { class: "mt-2" }, Mr = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, jr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sr = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Dr = [
  Sr
], Or = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zr = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Er = [
  zr
], Fr = { class: "ml-1.5" }, Vr = { class: "my-1 text-sm text-gray-500" }, Br = {
  name: "VFModalUnarchive"
}, Ar = /* @__PURE__ */ Object.assign(Br, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter");
    k("storage");
    const s = k("adapter"), { t: o } = k("i18n"), i = l;
    g("");
    const m = g(i.selection.items[0]), n = g(""), h = g([]), p = () => {
      t.emit("vf-fetch", {
        params: {
          q: "unarchive",
          adapter: s.value,
          path: i.current.dirname,
          item: m.value.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: o("The file unarchived.") });
        },
        onError: (c) => {
          n.value = o(c.message);
        }
      });
    };
    return (c, d) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, u(a(o)("Unarchive")), 1),
        e("button", {
          type: "button",
          onClick: d[1] || (d[1] = (f) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(o)("Cancel")), 1)
      ]),
      default: E(() => [
        e("div", br, [
          wr,
          e("div", yr, [
            e("h3", $r, u(a(o)("Unarchive")), 1),
            e("div", Cr, [
              (r(!0), v(H, null, J(h.value, (f) => (r(), v("p", Mr, [
                f.type == "dir" ? (r(), v("svg", jr, Dr)) : (r(), v("svg", Or, Er)),
                e("span", Fr, u(f.basename), 1)
              ]))), 256)),
              e("p", Vr, u(a(o)("The archive will be unarchived at")) + " (" + u(l.current.dirname) + ")", 1),
              n.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: d[0] || (d[0] = (f) => n.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(n.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lr = { class: "sm:flex sm:items-start" }, Nr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Ur = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Tr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Hr = { class: "mt-2" }, Ir = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, qr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rr = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Pr = [
  Rr
], Gr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yr = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jr = [
  Yr
], Kr = { class: "ml-1.5" }, Wr = { class: "text-sm text-gray-500 pb-1 pt-3" }, Xr = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Qr = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Zr = { class: "ml-1.5 overflow-auto" }, el = {
  name: "VFModalMove"
}, tl = /* @__PURE__ */ Object.assign(el, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter"), { t: s } = k("i18n");
    k("storage");
    const o = k("adapter"), i = l, m = g(i.selection.items.from), n = g(""), h = () => {
      m.value.length && t.emit("vf-fetch", {
        params: {
          q: "move",
          adapter: o.value,
          path: i.current.dirname,
          items: JSON.stringify(m.value.map(({ path: p, type: c }) => ({ path: p, type: c }))),
          item: i.selection.items.to.path
        },
        onSuccess: () => {
          t.emit("vf-toast-push", { label: s("Files moved.", i.selection.items.to.name) });
        },
        onError: (p) => {
          n.value = s(p.message);
        }
      });
    };
    return (p, c) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: h,
          class: "vf-btn vf-btn-primary"
        }, u(a(s)("Yes, Move!")), 1),
        e("button", {
          type: "button",
          onClick: c[1] || (c[1] = (d) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(s)("Cancel")), 1)
      ]),
      default: E(() => [
        e("div", Lr, [
          Nr,
          e("div", Ur, [
            e("h3", Tr, u(a(s)("Move files")), 1),
            e("div", Hr, [
              (r(!0), v(H, null, J(m.value, (d) => (r(), v("p", Ir, [
                d.type == "dir" ? (r(), v("svg", qr, Pr)) : (r(), v("svg", Gr, Jr)),
                e("span", Kr, u(d.path), 1)
              ]))), 256)),
              e("p", Wr, u(a(s)("Are you sure you want to move these files?")), 1),
              e("p", Xr, [
                Qr,
                e("span", Zr, u(l.selection.items.to.path), 1)
              ]),
              n.value.length ? (r(), N(Q, {
                key: 0,
                onHidden: c[0] || (c[0] = (d) => n.value = ""),
                error: ""
              }, {
                default: E(() => [
                  U(u(n.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ol = (l, t) => {
  const s = l.__vccOpts || l;
  for (const [o, i] of t)
    s[o] = i;
  return s;
}, sl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(l, { emit: t, slots: s }) {
    const o = k("emitter"), i = g(!1);
    let m = null;
    const n = () => {
      clearTimeout(m), i.value = !0, m = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return K(() => {
      o.on(l.on, n);
    }), Te(() => {
      clearTimeout(m);
    }), {
      shown: i
    };
  }
}, al = { key: 1 };
function nl(l, t, s, o, i, m) {
  return r(), v("div", {
    class: T(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !o.shown }]])
  }, [
    l.$slots.default ? pe(l.$slots, "default", { key: 0 }) : (r(), v("span", al, "Saved."))
  ], 2);
}
const Se = /* @__PURE__ */ ol(sl, [["render", nl]]), rl = "1.3.3", ll = { class: "sm:flex sm:items-start" }, il = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), dl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, cl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ul = { class: "mt-2" }, ml = { class: "text-sm text-gray-500" }, vl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, pl = { class: "mt-3 text-left" }, hl = { class: "space-y-2" }, fl = { class: "flex relative gap-x-3" }, gl = { class: "h-6 items-center" }, kl = { class: "flex-1 block text-sm" }, _l = {
  for: "dark_mode",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, xl = { class: "flex relative gap-x-3" }, bl = { class: "h-6 items-center" }, wl = { class: "flex-1 block text-sm" }, yl = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, $l = {
  name: "VFModalAbout"
}, Cl = /* @__PURE__ */ Object.assign($l, {
  props: {
    selection: Object,
    current: Object
  },
  setup(l) {
    const t = k("emitter"), { getStore: s, clearStore: o } = k("storage");
    k("adapter");
    const { t: i } = k("i18n");
    g(""), g("");
    const m = k("darkMode"), n = async () => {
      o(), location.reload();
    }, h = () => {
      t.emit("vf-darkMode-toggle"), t.emit("vf-darkMode-saved");
    }, p = k("metricUnits"), c = () => {
      t.emit("vf-metric-units-saved", !p.value);
    };
    return (d, f) => (r(), N(W, null, {
      buttons: E(() => [
        e("button", {
          type: "button",
          onClick: f[2] || (f[2] = (y) => a(t).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(a(i)("Close")), 1)
      ]),
      default: E(() => [
        e("div", ll, [
          il,
          e("div", dl, [
            e("h3", cl, u(a(i)("About %s", "Vuefinder " + a(rl))), 1),
            e("div", ul, [
              e("p", ml, u(a(i)("Vuefinder is a file manager component for vue 3.")), 1),
              e("div", null, [
                e("h3", vl, u(a(i)("Settings")), 1)
              ]),
              e("div", pl, [
                e("fieldset", null, [
                  e("div", hl, [
                    e("div", fl, [
                      e("div", gl, [
                        R(e("input", {
                          id: "dark_mode",
                          name: "dark_mode",
                          "onUpdate:modelValue": f[0] || (f[0] = (y) => re(m) ? m.value = y : null),
                          type: "checkbox",
                          onClick: h,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [$e, a(m)]
                        ])
                      ]),
                      e("div", kl, [
                        e("label", _l, [
                          U(u(a(i)("Dark Mode")) + " ", 1),
                          P(Se, {
                            class: "ms-3",
                            on: "vf-darkMode-saved"
                          }, {
                            default: E(() => [
                              U(u(a(i)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    e("div", xl, [
                      e("div", bl, [
                        R(e("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": f[1] || (f[1] = (y) => re(p) ? p.value = y : null),
                          onClick: c,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [$e, a(p)]
                        ])
                      ]),
                      e("div", wl, [
                        e("label", yl, [
                          U(u(a(i)("Use Metric Units")) + " ", 1),
                          P(Se, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: E(() => [
                              U(u(a(i)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    e("button", {
                      onClick: n,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, u(a(i)("Clear Local Storage")), 1)
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: Cl,
  ModalArchive: xr,
  ModalDelete: ra,
  ModalMessage: pa,
  ModalMove: tl,
  ModalNewFile: Ea,
  ModalNewFolder: ya,
  ModalPreview: _n,
  ModalRename: Vn,
  ModalUnarchive: Ar,
  ModalUpload: sr
}, Symbol.toStringTag, { value: "Module" })), _e = {
  VueFinder: Fs,
  ...Ml
};
const Al = {
  install(l) {
    for (const t in _e)
      if (_e.hasOwnProperty(t)) {
        const s = _e[t];
        l.component(s.name, s);
      }
  }
};
export {
  Al as default
};
