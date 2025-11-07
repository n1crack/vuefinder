import { inject as Ft, reactive as Nt, watch as ue, defineComponent as te, useAttrs as Wo, ref as T, computed as H, watchEffect as Qe, nextTick as Oe, createElementBlock as g, openBlock as v, Fragment as re, createCommentVNode as O, createElementVNode as i, unref as a, renderList as _e, mergeProps as Ee, createBlock as j, normalizeStyle as Me, normalizeClass as X, withCtx as oe, renderSlot as me, createVNode as L, isVNode as mt, onMounted as he, onBeforeUnmount as fn, resolveDynamicComponent as lt, normalizeProps as qe, createTextVNode as de, toDisplayString as x, shallowRef as Zn, markRaw as Go, withKeys as kt, withModifiers as pe, withDirectives as be, vModelText as xt, onUnmounted as Ae, useTemplateRef as tt, resolveComponent as eo, vModelCheckbox as vn, customRef as Yo, Teleport as Ht, isRef as Qo, vModelSelect as an, vModelRadio as nn, toHandlers as nt, vShow as Xe, guardReactiveProps as st, onUpdated as Xo, mergeModels as Jo, useModel as to, Transition as Zo, provide as es } from "vue";
import ts from "mitt";
import { persistentAtom as ns } from "@nanostores/persistent";
import { atom as Pe, computed as et } from "nanostores";
import { useStore as J } from "@nanostores/vue";
import { QueryClient as os } from "@tanstack/vue-query";
import ss from "@uppy/core";
import { Cropper as is } from "vue-advanced-cropper";
import no from "vanilla-lazyload";
import { OverlayScrollbars as Ut } from "overlayscrollbars";
import as from "@viselect/vanilla";
import rs from "@uppy/xhr-upload";
const pn = /* @__PURE__ */ new Map(), rn = Symbol("ServiceContainerId");
function ls(n, e) {
  pn.set(n, e);
}
function cs(n) {
  pn.delete(n);
}
function se(n) {
  const e = Ft(rn);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = pn.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function ds(n) {
  const e = localStorage.getItem(n + "_storage"), t = Nt(JSON.parse(e ?? "{}"));
  ue(t, o);
  function o() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function s(d, u) {
    t[d] = u;
  }
  function l(d) {
    delete t[d];
  }
  function c() {
    Object.keys(t).forEach((d) => l(d));
  }
  return { getStore: (d, u = null) => d in t ? t[d] : u, setStore: s, removeStore: l, clearStore: c };
}
let ln = 1;
var us = class {
  subscribers;
  toasts;
  dismissedToasts;
  constructor() {
    this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
  subscribe = (n) => (this.subscribers.push(n), () => {
    const e = this.subscribers.indexOf(n);
    this.subscribers.splice(e, 1);
  });
  publish = (n) => {
    this.subscribers.forEach((e) => e(n));
  };
  addToast = (n) => {
    this.publish(n), this.toasts = [...this.toasts, n];
  };
  create = (n) => {
    const { message: e, ...t } = n, o = typeof n.id == "number" || n.id && n.id?.length > 0 ? n.id : ln++, s = this.toasts.find((c) => c.id === o), l = n.dismissible === void 0 ? !0 : n.dismissible;
    return this.dismissedToasts.has(o) && this.dismissedToasts.delete(o), s ? this.toasts = this.toasts.map((c) => c.id === o ? (this.publish({
      ...c,
      ...n,
      id: o,
      title: e
    }), {
      ...c,
      ...n,
      id: o,
      dismissible: l,
      title: e
    }) : c) : this.addToast({
      title: e,
      ...t,
      dismissible: l,
      id: o
    }), o;
  };
  dismiss = (n) => (n ? (this.dismissedToasts.add(n), requestAnimationFrame(() => this.subscribers.forEach((e) => e({
    id: n,
    dismiss: !0
  })))) : this.toasts.forEach((e) => {
    this.subscribers.forEach((t) => t({
      id: e.id,
      dismiss: !0
    }));
  }), n);
  message = (n, e) => this.create({
    ...e,
    message: n,
    type: "default"
  });
  error = (n, e) => this.create({
    ...e,
    type: "error",
    message: n
  });
  success = (n, e) => this.create({
    ...e,
    type: "success",
    message: n
  });
  info = (n, e) => this.create({
    ...e,
    type: "info",
    message: n
  });
  warning = (n, e) => this.create({
    ...e,
    type: "warning",
    message: n
  });
  loading = (n, e) => this.create({
    ...e,
    type: "loading",
    message: n
  });
  promise = (n, e) => {
    if (!e) return;
    let t;
    e.loading !== void 0 && (t = this.create({
      ...e,
      promise: n,
      type: "loading",
      message: e.loading,
      description: typeof e.description != "function" ? e.description : void 0
    }));
    const o = Promise.resolve(n instanceof Function ? n() : n);
    let s = t !== void 0, l;
    const c = o.then(async (d) => {
      if (l = ["resolve", d], mt(d))
        s = !1, this.create({
          id: t,
          type: "default",
          message: d
        });
      else if (vs(d) && !d.ok) {
        s = !1;
        const p = typeof e.error == "function" ? await e.error(`HTTP error! status: ${d.status}`) : e.error, m = typeof e.description == "function" ? await e.description(`HTTP error! status: ${d.status}`) : e.description, _ = typeof p == "object" && !mt(p) ? p : {
          message: p || "",
          id: t || ""
        };
        this.create({
          id: t,
          type: "error",
          description: m,
          ..._
        });
      } else if (d instanceof Error) {
        s = !1;
        const p = typeof e.error == "function" ? await e.error(d) : e.error, m = typeof e.description == "function" ? await e.description(d) : e.description, _ = typeof p == "object" && !mt(p) ? p : {
          message: p || "",
          id: t || ""
        };
        this.create({
          id: t,
          type: "error",
          description: m,
          ..._
        });
      } else if (e.success !== void 0) {
        s = !1;
        const p = typeof e.success == "function" ? await e.success(d) : e.success, m = typeof e.description == "function" ? await e.description(d) : e.description, _ = typeof p == "object" && !mt(p) ? p : {
          message: p || "",
          id: t || ""
        };
        this.create({
          id: t,
          type: "success",
          description: m,
          ..._
        });
      }
    }).catch(async (d) => {
      if (l = ["reject", d], e.error !== void 0) {
        s = !1;
        const u = typeof e.error == "function" ? await e.error(d) : e.error, p = typeof e.description == "function" ? await e.description(d) : e.description, f = typeof u == "object" && !mt(u) ? u : {
          message: u || "",
          id: t || ""
        };
        this.create({
          id: t,
          type: "error",
          description: p,
          ...f
        });
      }
    }).finally(() => {
      s && (this.dismiss(t), t = void 0), e.finally?.();
    }), r = () => new Promise((d, u) => c.then(() => l[0] === "reject" ? u(l[1]) : d(l[1])).catch(u));
    return typeof t != "string" && typeof t != "number" ? { unwrap: r } : Object.assign(t, { unwrap: r });
  };
  custom = (n, e) => {
    const t = e?.id || ln++, o = this.toasts.find((l) => l.id === t), s = e?.dismissible === void 0 ? !0 : e.dismissible;
    return this.dismissedToasts.has(t) && this.dismissedToasts.delete(t), o ? this.toasts = this.toasts.map((l) => l.id === t ? (this.publish({
      ...l,
      component: n,
      dismissible: s,
      id: t,
      ...e
    }), {
      ...l,
      component: n,
      dismissible: s,
      id: t,
      ...e
    }) : l) : this.addToast({
      component: n,
      dismissible: s,
      id: t,
      ...e
    }), t;
  };
  getActiveToasts = () => this.toasts.filter((n) => !this.dismissedToasts.has(n.id));
};
const Te = new us();
function fs(n, e) {
  const t = e?.id || ln++;
  return Te.create({
    message: n,
    id: t,
    type: "default",
    ...e
  }), t;
}
const vs = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", ps = fs, hs = () => Te.toasts, ms = () => Te.getActiveToasts(), fe = Object.assign(ps, {
  success: Te.success,
  info: Te.info,
  warning: Te.warning,
  error: Te.error,
  custom: Te.custom,
  message: Te.message,
  promise: Te.promise,
  dismiss: Te.dismiss,
  loading: Te.loading
}, {
  getHistory: hs,
  getToasts: ms
});
function Dt(n) {
  return n.label !== void 0;
}
const _s = 3, oo = "24px", so = "16px", An = 4e3, gs = 356, ws = 14, ys = 45, io = 200;
function bs() {
  const n = T(!1);
  return Qe(() => {
    const e = () => {
      n.value = document.hidden;
    };
    return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
  }), { isDocumentHidden: n };
}
function Ze(...n) {
  return n.filter(Boolean).join(" ");
}
function ks(n) {
  const [e, t] = n.split("-"), o = [];
  return e && o.push(e), t && o.push(t), o;
}
function xs(n, e) {
  const t = {};
  return [n, e].forEach((o, s) => {
    const l = s === 1, c = l ? "--mobile-offset" : "--offset", r = l ? so : oo;
    function d(u) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((p) => {
        t[`${c}-${p}`] = typeof u == "number" ? `${u}px` : u;
      });
    }
    typeof o == "number" || typeof o == "string" ? d(o) : typeof o == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((u) => {
      o[u] === void 0 ? t[`${c}-${u}`] = r : t[`${c}-${u}`] = typeof o[u] == "number" ? `${o[u]}px` : o[u];
    }) : d(r);
  }), t;
}
const $s = [
  "data-rich-colors",
  "data-styled",
  "data-mounted",
  "data-promise",
  "data-swiped",
  "data-removed",
  "data-visible",
  "data-y-position",
  "data-x-position",
  "data-index",
  "data-front",
  "data-swiping",
  "data-dismissible",
  "data-type",
  "data-invert",
  "data-swipe-out",
  "data-swipe-direction",
  "data-expanded",
  "data-testid"
], Ss = [
  "aria-label",
  "data-disabled",
  "data-close-button-position"
];
var Cs = /* @__PURE__ */ te({
  __name: "Toast",
  props: {
    toast: {},
    toasts: {},
    index: {},
    swipeDirections: {},
    expanded: { type: Boolean },
    invert: { type: Boolean },
    heights: {},
    gap: {},
    position: {},
    closeButtonPosition: {},
    visibleToasts: {},
    expandByDefault: { type: Boolean },
    closeButton: { type: Boolean },
    interacting: { type: Boolean },
    style: {},
    cancelButtonStyle: {},
    actionButtonStyle: {},
    duration: {},
    class: {},
    unstyled: { type: Boolean },
    descriptionClass: {},
    loadingIcon: {},
    classes: {},
    icons: {},
    closeButtonAriaLabel: {},
    defaultRichColors: { type: Boolean }
  },
  emits: [
    "update:heights",
    "update:height",
    "removeToast"
  ],
  setup(n, { emit: e }) {
    const t = n, o = e, s = T(null), l = T(null), c = T(!1), r = T(!1), d = T(!1), u = T(!1), p = T(!1), m = T(0), f = T(0), _ = T(t.toast.duration || t.duration || An), S = T(null), D = T(null), w = H(() => t.index === 0), y = H(() => t.index + 1 <= t.visibleToasts), h = H(() => t.toast.type), b = H(() => t.toast.dismissible !== !1), k = H(() => t.toast.class || ""), C = H(() => t.descriptionClass || ""), V = H(() => {
      const A = t.toast.position || t.position, ce = t.heights.filter((we) => we.position === A).findIndex((we) => we.toastId === t.toast.id);
      return ce >= 0 ? ce : 0;
    }), R = H(() => {
      const A = t.toast.position || t.position;
      return t.heights.filter((ce) => ce.position === A).reduce((ce, we, Se) => Se >= V.value ? ce : ce + we.height, 0);
    }), q = H(() => V.value * t.gap + R.value || 0), B = H(() => t.toast.closeButton ?? t.closeButton), F = H(() => t.toast.duration || t.duration || An), K = T(0), Y = T(0), z = T(null), Z = H(() => t.position.split("-")), le = H(() => Z.value[0]), Q = H(() => Z.value[1]), E = H(() => typeof t.toast.title != "string"), $ = H(() => typeof t.toast.description != "string"), { isDocumentHidden: P } = bs(), M = H(() => h.value && h.value === "loading");
    he(() => {
      c.value = !0, _.value = F.value;
    }), Qe(async () => {
      if (!c.value || !D.value) return;
      await Oe();
      const A = D.value, ye = A.style.height;
      A.style.height = "auto";
      const ce = A.getBoundingClientRect().height;
      A.style.height = ye, f.value = ce, o("update:height", {
        toastId: t.toast.id,
        height: ce,
        position: t.toast.position || t.position
      });
    });
    function W() {
      r.value = !0, m.value = q.value, setTimeout(() => {
        o("removeToast", t.toast);
      }, io);
    }
    function ee() {
      if (M.value || !b.value) return {};
      W(), t.toast.onDismiss?.(t.toast);
    }
    function ge(A) {
      A.button !== 2 && (M.value || !b.value || (S.value = /* @__PURE__ */ new Date(), m.value = q.value, A.target.setPointerCapture(A.pointerId), A.target.tagName !== "BUTTON" && (d.value = !0, z.value = {
        x: A.clientX,
        y: A.clientY
      })));
    }
    function ve() {
      if (u.value || !b.value) return;
      z.value = null;
      const A = Number(D.value?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), ye = Number(D.value?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), ce = (/* @__PURE__ */ new Date()).getTime() - (S.value?.getTime() || 0), we = s.value === "x" ? A : ye, Se = Math.abs(we) / ce;
      if (Math.abs(we) >= ys || Se > 0.11) {
        m.value = q.value, t.toast.onDismiss?.(t.toast), s.value === "x" ? l.value = A > 0 ? "right" : "left" : l.value = ye > 0 ? "down" : "up", W(), u.value = !0;
        return;
      } else
        D.value?.style.setProperty("--swipe-amount-x", "0px"), D.value?.style.setProperty("--swipe-amount-y", "0px");
      p.value = !1, d.value = !1, s.value = null;
    }
    function je(A) {
      if (!z.value || !b.value || (window?.getSelection()?.toString()?.length ?? !1)) return;
      const ce = A.clientY - z.value.y, we = A.clientX - z.value.x, Se = t.swipeDirections ?? ks(t.position);
      !s.value && (Math.abs(we) > 1 || Math.abs(ce) > 1) && (s.value = Math.abs(we) > Math.abs(ce) ? "x" : "y");
      let N = {
        x: 0,
        y: 0
      };
      const ie = (ae) => 1 / (1.5 + Math.abs(ae) / 20);
      if (s.value === "y") {
        if (Se.includes("top") || Se.includes("bottom")) if (Se.includes("top") && ce < 0 || Se.includes("bottom") && ce > 0) N.y = ce;
        else {
          const ae = ce * ie(ce);
          N.y = Math.abs(ae) < Math.abs(ce) ? ae : ce;
        }
      } else if (s.value === "x" && (Se.includes("left") || Se.includes("right")))
        if (Se.includes("left") && we < 0 || Se.includes("right") && we > 0) N.x = we;
        else {
          const ae = we * ie(we);
          N.x = Math.abs(ae) < Math.abs(we) ? ae : we;
        }
      (Math.abs(N.x) > 0 || Math.abs(N.y) > 0) && (p.value = !0), D.value?.style.setProperty("--swipe-amount-x", `${N.x}px`), D.value?.style.setProperty("--swipe-amount-y", `${N.y}px`);
    }
    he(() => {
      if (c.value = !0, !D.value) return;
      const A = D.value.getBoundingClientRect().height;
      f.value = A;
      const ye = [{
        toastId: t.toast.id,
        height: A,
        position: t.toast.position
      }, ...t.heights];
      o("update:heights", ye);
    }), fn(() => {
      D.value && o("removeToast", t.toast);
    }), Qe((A) => {
      if (t.toast.promise && h.value === "loading" || t.toast.duration === 1 / 0 || t.toast.type === "loading") return;
      let ye;
      const ce = () => {
        if (Y.value < K.value) {
          const Se = (/* @__PURE__ */ new Date()).getTime() - K.value;
          _.value = _.value - Se;
        }
        Y.value = (/* @__PURE__ */ new Date()).getTime();
      }, we = () => {
        _.value !== 1 / 0 && (K.value = (/* @__PURE__ */ new Date()).getTime(), ye = setTimeout(() => {
          t.toast.onAutoClose?.(t.toast), W();
        }, _.value));
      };
      t.expanded || t.interacting || P.value ? ce() : we(), A(() => {
        clearTimeout(ye);
      });
    }), ue(() => t.toast.delete, (A) => {
      A !== void 0 && A && (W(), t.toast.onDismiss?.(t.toast));
    }, { deep: !0 });
    function Ke() {
      d.value = !1, s.value = null, z.value = null;
    }
    return (A, ye) => (v(), g("li", {
      tabindex: "0",
      ref_key: "toastRef",
      ref: D,
      class: X(a(Ze)(t.class, k.value, A.classes?.toast, A.toast.classes?.toast, A.classes?.[h.value], A.toast?.classes?.[h.value])),
      "data-sonner-toast": "",
      "data-rich-colors": A.toast.richColors ?? A.defaultRichColors,
      "data-styled": !(A.toast.component || A.toast?.unstyled || A.unstyled),
      "data-mounted": c.value,
      "data-promise": !!A.toast.promise,
      "data-swiped": p.value,
      "data-removed": r.value,
      "data-visible": y.value,
      "data-y-position": le.value,
      "data-x-position": Q.value,
      "data-index": A.index,
      "data-front": w.value,
      "data-swiping": d.value,
      "data-dismissible": b.value,
      "data-type": h.value,
      "data-invert": A.toast.invert || A.invert,
      "data-swipe-out": u.value,
      "data-swipe-direction": l.value,
      "data-expanded": !!(A.expanded || A.expandByDefault && c.value),
      "data-testid": A.toast.testId,
      style: Me({
        "--index": A.index,
        "--toasts-before": A.index,
        "--z-index": A.toasts.length - A.index,
        "--offset": `${r.value ? m.value : q.value}px`,
        "--initial-height": A.expandByDefault ? "auto" : `${f.value}px`,
        ...A.style,
        ...t.toast.style
      }),
      onDragend: Ke,
      onPointerdown: ge,
      onPointerup: ve,
      onPointermove: je
    }, [B.value && !A.toast.component && h.value !== "loading" ? (v(), g("button", {
      key: 0,
      "aria-label": A.closeButtonAriaLabel || "Close toast",
      "data-disabled": M.value,
      "data-close-button": "true",
      "data-close-button-position": A.closeButtonPosition,
      class: X(a(Ze)(A.classes?.closeButton, A.toast?.classes?.closeButton)),
      onClick: ee
    }, [A.icons?.close ? (v(), j(lt(A.icons?.close), { key: 0 })) : me(A.$slots, "close-icon", { key: 1 })], 10, Ss)) : O("v-if", !0), A.toast.component ? (v(), j(lt(A.toast.component), Ee({ key: 1 }, A.toast.componentProps, {
      onCloseToast: ee,
      isPaused: A.$props.expanded || A.$props.interacting || a(P)
    }), null, 16, ["isPaused"])) : (v(), g(re, { key: 2 }, [
      h.value !== "default" || A.toast.icon || A.toast.promise ? (v(), g("div", {
        key: 0,
        "data-icon": "",
        class: X(a(Ze)(A.classes?.icon, A.toast?.classes?.icon))
      }, [A.toast.icon ? (v(), j(lt(A.toast.icon), { key: 0 })) : (v(), g(re, { key: 1 }, [h.value === "loading" ? me(A.$slots, "loading-icon", { key: 0 }) : h.value === "success" ? me(A.$slots, "success-icon", { key: 1 }) : h.value === "error" ? me(A.$slots, "error-icon", { key: 2 }) : h.value === "warning" ? me(A.$slots, "warning-icon", { key: 3 }) : h.value === "info" ? me(A.$slots, "info-icon", { key: 4 }) : O("v-if", !0)], 64))], 2)) : O("v-if", !0),
      i("div", {
        "data-content": "",
        class: X(a(Ze)(A.classes?.content, A.toast?.classes?.content))
      }, [i("div", {
        "data-title": "",
        class: X(a(Ze)(A.classes?.title, A.toast.classes?.title))
      }, [E.value ? (v(), j(lt(A.toast.title), qe(Ee({ key: 0 }, A.toast.componentProps)), null, 16)) : (v(), g(re, { key: 1 }, [de(x(A.toast.title), 1)], 64))], 2), A.toast.description ? (v(), g("div", {
        key: 0,
        "data-description": "",
        class: X(a(Ze)(A.descriptionClass, C.value, A.classes?.description, A.toast.classes?.description))
      }, [$.value ? (v(), j(lt(A.toast.description), qe(Ee({ key: 0 }, A.toast.componentProps)), null, 16)) : (v(), g(re, { key: 1 }, [de(x(A.toast.description), 1)], 64))], 2)) : O("v-if", !0)], 2),
      A.toast.cancel ? (v(), g("button", {
        key: 1,
        style: Me(A.toast.cancelButtonStyle || A.cancelButtonStyle),
        class: X(a(Ze)(A.classes?.cancelButton, A.toast.classes?.cancelButton)),
        "data-button": "",
        "data-cancel": "",
        onClick: ye[0] || (ye[0] = (ce) => {
          a(Dt)(A.toast.cancel) && b.value && (A.toast.cancel.onClick?.(ce), W());
        })
      }, x(a(Dt)(A.toast.cancel) ? A.toast.cancel?.label : A.toast.cancel), 7)) : O("v-if", !0),
      A.toast.action ? (v(), g("button", {
        key: 2,
        style: Me(A.toast.actionButtonStyle || A.actionButtonStyle),
        class: X(a(Ze)(A.classes?.actionButton, A.toast.classes?.actionButton)),
        "data-button": "",
        "data-action": "",
        onClick: ye[1] || (ye[1] = (ce) => {
          a(Dt)(A.toast.action) && (A.toast.action.onClick?.(ce), !ce.defaultPrevented && W());
        })
      }, x(a(Dt)(A.toast.action) ? A.toast.action?.label : A.toast.action), 7)) : O("v-if", !0)
    ], 64))], 46, $s));
  }
}), Ds = Cs, $t = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e) t[o] = s;
  return t;
};
const Es = {}, Fs = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stoke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Ps(n, e) {
  return v(), g("svg", Fs, e[0] || (e[0] = [i("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }, null, -1), i("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }, null, -1)]));
}
var Ts = /* @__PURE__ */ $t(Es, [["render", Ps]]);
const As = ["data-visible"], Ms = { class: "sonner-spinner" };
var Is = /* @__PURE__ */ te({
  __name: "Loader",
  props: { visible: { type: Boolean } },
  setup(n) {
    const e = Array(12).fill(0);
    return (t, o) => (v(), g("div", {
      class: "sonner-loading-wrapper",
      "data-visible": t.visible
    }, [i("div", Ms, [(v(!0), g(re, null, _e(a(e), (s) => (v(), g("div", {
      key: `spinner-bar-${s}`,
      class: "sonner-loading-bar"
    }))), 128))])], 8, As));
  }
}), Os = Is;
const Bs = {}, Rs = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Ls(n, e) {
  return v(), g("svg", Rs, e[0] || (e[0] = [i("path", {
    "fill-rule": "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Vs = /* @__PURE__ */ $t(Bs, [["render", Ls]]);
const zs = {}, Ns = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Hs(n, e) {
  return v(), g("svg", Ns, e[0] || (e[0] = [i("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Us = /* @__PURE__ */ $t(zs, [["render", Hs]]);
const js = {}, Ks = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function qs(n, e) {
  return v(), g("svg", Ks, e[0] || (e[0] = [i("path", {
    "fill-rule": "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Ws = /* @__PURE__ */ $t(js, [["render", qs]]);
const Gs = {}, Ys = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function Qs(n, e) {
  return v(), g("svg", Ys, e[0] || (e[0] = [i("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var Xs = /* @__PURE__ */ $t(Gs, [["render", Qs]]);
const Js = ["aria-label"], Zs = [
  "data-sonner-theme",
  "dir",
  "data-theme",
  "data-rich-colors",
  "data-y-position",
  "data-x-position"
], ei = typeof window < "u" && typeof document < "u";
function ti() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
var ni = /* @__PURE__ */ te({
  name: "Toaster",
  inheritAttrs: !1,
  __name: "Toaster",
  props: {
    id: {},
    invert: {
      type: Boolean,
      default: !1
    },
    theme: { default: "light" },
    position: { default: "bottom-right" },
    closeButtonPosition: { default: "top-left" },
    hotkey: { default: () => ["altKey", "KeyT"] },
    richColors: {
      type: Boolean,
      default: !1
    },
    expand: {
      type: Boolean,
      default: !1
    },
    duration: {},
    gap: { default: ws },
    visibleToasts: { default: _s },
    closeButton: {
      type: Boolean,
      default: !1
    },
    toastOptions: { default: () => ({}) },
    class: { default: "" },
    style: {},
    offset: { default: oo },
    mobileOffset: { default: so },
    dir: { default: "auto" },
    swipeDirections: {},
    icons: {},
    containerAriaLabel: { default: "Notifications" }
  },
  setup(n) {
    const e = n, t = Wo(), o = T([]), s = H(() => e.id ? o.value.filter((F) => F.toasterId === e.id) : o.value.filter((F) => !F.toasterId));
    function l(F, K) {
      return s.value.filter((Y) => !Y.position && K === 0 || Y.position === F);
    }
    const c = H(() => {
      const F = s.value.filter((K) => K.position).map((K) => K.position);
      return F.length > 0 ? Array.from(new Set([e.position].concat(F))) : [e.position];
    }), r = H(() => {
      const F = {};
      return c.value.forEach((K) => {
        F[K] = o.value.filter((Y) => Y.position === K);
      }), F;
    }), d = T([]), u = T({}), p = T(!1);
    Qe(() => {
      c.value.forEach((F) => {
        F in u.value || (u.value[F] = !1);
      });
    });
    const m = T(e.theme !== "system" ? e.theme : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), f = T(null), _ = T(null), S = T(!1), D = e.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    function w(F) {
      o.value.find((K) => K.id === F.id)?.delete || Te.dismiss(F.id), o.value = o.value.filter(({ id: K }) => K !== F.id), setTimeout(() => {
        o.value.find((K) => K.id === F.id) || (d.value = d.value.filter((K) => K.toastId !== F.id));
      }, io + 50);
    }
    function y(F) {
      S.value && !F.currentTarget?.contains?.(F.relatedTarget) && (S.value = !1, _.value && (_.value.focus({ preventScroll: !0 }), _.value = null));
    }
    function h(F) {
      F.target instanceof HTMLElement && F.target.dataset.dismissible === "false" || S.value || (S.value = !0, _.value = F.relatedTarget);
    }
    function b(F) {
      F.target && F.target instanceof HTMLElement && F.target.dataset.dismissible === "false" || (p.value = !0);
    }
    Qe((F) => {
      const K = Te.subscribe((Y) => {
        if (Y.dismiss) {
          requestAnimationFrame(() => {
            o.value = o.value.map((z) => z.id === Y.id ? {
              ...z,
              delete: !0
            } : z);
          });
          return;
        }
        Oe(() => {
          const z = o.value.findIndex((Z) => Z.id === Y.id);
          z !== -1 ? o.value = [
            ...o.value.slice(0, z),
            {
              ...o.value[z],
              ...Y
            },
            ...o.value.slice(z + 1)
          ] : o.value = [Y, ...o.value];
        });
      });
      F(K);
    }), Qe((F) => {
      if (typeof window > "u") return;
      if (e.theme !== "system") {
        m.value = e.theme;
        return;
      }
      const K = window.matchMedia("(prefers-color-scheme: dark)"), Y = (Z) => {
        m.value = Z ? "dark" : "light";
      };
      Y(K.matches);
      const z = (Z) => {
        Y(Z.matches);
      };
      try {
        K.addEventListener("change", z);
      } catch {
        K.addListener(z);
      }
      F(() => {
        try {
          K.removeEventListener("change", z);
        } catch {
          K.removeListener(z);
        }
      });
    }), Qe(() => {
      f.value && _.value && (_.value.focus({ preventScroll: !0 }), _.value = null, S.value = !1);
    }), Qe(() => {
      o.value.length <= 1 && Object.keys(u.value).forEach((F) => {
        u.value[F] = !1;
      });
    }), Qe((F) => {
      function K(Y) {
        const z = e.hotkey.every((Q) => Y[Q] || Y.code === Q), Z = Array.isArray(f.value) ? f.value[0] : f.value;
        z && (c.value.forEach((Q) => {
          u.value[Q] = !0;
        }), Z?.focus());
        const le = document.activeElement === f.value || Z?.contains(document.activeElement);
        Y.code === "Escape" && le && c.value.forEach((Q) => {
          u.value[Q] = !1;
        });
      }
      ei && (document.addEventListener("keydown", K), F(() => {
        document.removeEventListener("keydown", K);
      }));
    });
    function k(F) {
      const K = F.currentTarget, Y = K.getAttribute("data-y-position") + "-" + K.getAttribute("data-x-position");
      u.value[Y] = !0;
    }
    function C(F) {
      if (!p.value) {
        const K = F.currentTarget, Y = K.getAttribute("data-y-position") + "-" + K.getAttribute("data-x-position");
        u.value[Y] = !1;
      }
    }
    function V() {
      Object.keys(u.value).forEach((F) => {
        u.value[F] = !1;
      });
    }
    function R() {
      p.value = !1;
    }
    function q(F) {
      d.value = F;
    }
    function B(F) {
      const K = d.value.findIndex((Y) => Y.toastId === F.toastId);
      if (K !== -1) d.value[K] = F;
      else {
        const Y = d.value.findIndex((z) => z.position === F.position);
        Y !== -1 ? d.value.splice(Y, 0, F) : d.value.unshift(F);
      }
    }
    return (F, K) => (v(), g(re, null, [O(" Remove item from normal navigation flow, only available via hotkey "), i("section", {
      "aria-label": `${F.containerAriaLabel} ${a(D)}`,
      tabIndex: -1,
      "aria-live": "polite",
      "aria-relevant": "additions text",
      "aria-atomic": "false"
    }, [(v(!0), g(re, null, _e(c.value, (Y, z) => (v(), g("ol", Ee({
      key: Y,
      ref_for: !0,
      ref_key: "listRef",
      ref: f,
      "data-sonner-toaster": "",
      "data-sonner-theme": m.value,
      class: e.class,
      dir: F.dir === "auto" ? ti() : F.dir,
      tabIndex: -1,
      "data-theme": F.theme,
      "data-rich-colors": F.richColors,
      "data-y-position": Y.split("-")[0],
      "data-x-position": Y.split("-")[1],
      style: {
        "--front-toast-height": `${d.value[0]?.height || 0}px`,
        "--width": `${a(gs)}px`,
        "--gap": `${F.gap}px`,
        ...F.style,
        ...a(t).style,
        ...a(xs)(F.offset, F.mobileOffset)
      }
    }, { ref_for: !0 }, F.$attrs, {
      onBlur: y,
      onFocus: h,
      onMouseenter: k,
      onMousemove: k,
      onMouseleave: C,
      onDragend: V,
      onPointerdown: b,
      onPointerup: R
    }), [(v(!0), g(re, null, _e(l(Y, z), (Z, le) => (v(), j(Ds, {
      key: Z.id,
      heights: d.value,
      icons: F.icons,
      index: le,
      toast: Z,
      defaultRichColors: F.richColors,
      duration: F.toastOptions?.duration ?? F.duration,
      class: X(F.toastOptions?.class ?? ""),
      descriptionClass: F.toastOptions?.descriptionClass,
      invert: F.invert,
      visibleToasts: F.visibleToasts,
      closeButton: F.toastOptions?.closeButton ?? F.closeButton,
      interacting: p.value,
      position: Y,
      closeButtonPosition: F.toastOptions?.closeButtonPosition ?? F.closeButtonPosition,
      style: Me(F.toastOptions?.style),
      unstyled: F.toastOptions?.unstyled,
      classes: F.toastOptions?.classes,
      cancelButtonStyle: F.toastOptions?.cancelButtonStyle,
      actionButtonStyle: F.toastOptions?.actionButtonStyle,
      "close-button-aria-label": F.toastOptions?.closeButtonAriaLabel,
      toasts: r.value[Y],
      expandByDefault: F.expand,
      gap: F.gap,
      expanded: u.value[Y] || !1,
      swipeDirections: e.swipeDirections,
      "onUpdate:heights": q,
      "onUpdate:height": B,
      onRemoveToast: w
    }, {
      "close-icon": oe(() => [me(F.$slots, "close-icon", {}, () => [L(Ts)])]),
      "loading-icon": oe(() => [me(F.$slots, "loading-icon", {}, () => [L(Os, { visible: Z.type === "loading" }, null, 8, ["visible"])])]),
      "success-icon": oe(() => [me(F.$slots, "success-icon", {}, () => [L(Vs)])]),
      "error-icon": oe(() => [me(F.$slots, "error-icon", {}, () => [L(Xs)])]),
      "warning-icon": oe(() => [me(F.$slots, "warning-icon", {}, () => [L(Ws)])]),
      "info-icon": oe(() => [me(F.$slots, "info-icon", {}, () => [L(Us)])]),
      _: 2
    }, 1032, [
      "heights",
      "icons",
      "index",
      "toast",
      "defaultRichColors",
      "duration",
      "class",
      "descriptionClass",
      "invert",
      "visibleToasts",
      "closeButton",
      "interacting",
      "position",
      "closeButtonPosition",
      "style",
      "unstyled",
      "classes",
      "cancelButtonStyle",
      "actionButtonStyle",
      "close-button-aria-label",
      "toasts",
      "expandByDefault",
      "gap",
      "expanded",
      "swipeDirections"
    ]))), 128))], 16, Zs))), 128))], 8, Js)], 2112));
  }
}), oi = ni;
function Be(n, e = "An error occurred") {
  if (!n)
    return e;
  if (typeof n == "string")
    return n || e;
  if (n instanceof Error)
    return n.message || e;
  if (typeof n == "object" && n !== null) {
    const t = n;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
async function si(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function ii(n, e, t, o) {
  const { getStore: s, setStore: l } = n, c = T({}), r = T(s("locale", e)), d = (m, f = e) => {
    si(m, o).then((_) => {
      c.value = _, l("locale", m), r.value = m, l("translations", _), Object.values(o).length > 1 && (fe.success("The language is set to " + m), t.emit("vf-language-saved"));
    }).catch((_) => {
      if (f)
        fe.error("The selected locale is not yet supported!"), d(f, null);
      else {
        const S = Be(_, "Locale cannot be loaded!");
        fe.error(S);
      }
    });
  };
  ue(r, (m) => {
    d(m);
  }), !s("locale") && !Object.keys(o).length ? d(e) : c.value = s("translations");
  const u = (m, ...f) => f.length ? u(m = m.replace("%s", String(f.shift())), ...f) : m;
  function p(m, ...f) {
    return c.value && Object.prototype.hasOwnProperty.call(c.value, m) ? u(c.value[m] || m, ...f) : u(m, ...f);
  }
  return Nt({ t: p, locale: r });
}
const ai = [
  "edit",
  "newfile",
  "newfolder",
  "preview",
  "archive",
  "unarchive",
  "search",
  "rename",
  "upload",
  "delete",
  "fullscreen",
  "download",
  "language",
  "move",
  "copy",
  "history",
  "theme",
  "pinned"
], ao = {
  simple: {
    search: !0,
    preview: !0,
    rename: !0,
    upload: !0,
    delete: !0,
    newfile: !0,
    newfolder: !0,
    download: !0
  },
  advanced: ai.reduce((n, e) => (n[e] = !0, n), {})
};
function Mn() {
  return ao.advanced;
}
function ro(n) {
  return n ? n === "simple" || n === "advanced" ? { ...ao[n] } : { ...Mn(), ...n } : Mn();
}
const ri = "4.0.9";
function hn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function lo(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function li(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), c = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, c));
}
function ci() {
  const n = Zn(null), e = T(!1), t = T(), o = T(!1);
  return { visible: e, type: n, data: t, open: (r, d = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = r, t.value = d;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, n.value = null;
  }, setEditMode: (r) => {
    o.value = r;
  }, editMode: o };
}
const Pt = {
  view: "grid",
  theme: "silver",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  compactListView: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  loadingIndicator: "circular",
  maxFileSize: null,
  pinnedFolders: []
}, Tt = {
  initialPath: null
}, di = new Set(
  Object.keys(Tt)
);
function ui(n) {
  return n || "silver";
}
function co(n) {
  return di.has(n);
}
function In(n) {
  const e = {}, t = {}, o = n;
  for (const s in o)
    if (co(s))
      t[s] = o[s];
    else if (s in Pt) {
      const l = s, c = o[s];
      e[l] = c;
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function On(n, e) {
  const t = { ...Pt, ...n, ...e };
  return t.theme = ui(t.theme), t;
}
function Bn(n, e) {
  return { ...Tt, ...e, ...n };
}
const fi = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: o, nonPersistenceConfig: s } = In(e), l = On(
    o,
    Pt
  ), c = Bn(
    s,
    Tt
  ), r = ns(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), d = Pe(c), u = et(
    [r, d],
    (w, y) => ({
      ...w,
      ...y
    })
  ), p = (w = {}) => {
    const y = r.get(), h = d.get(), { persistenceConfig: b, nonPersistenceConfig: k } = In(w), C = On(b, y), V = Bn(
      k,
      h
    );
    r.set(C), d.set(V);
  }, m = (w) => co(w) ? d.get()[w] : r.get()[w], f = () => ({
    ...r.get(),
    ...d.get()
  }), _ = (w, y) => {
    const h = r.get();
    typeof w == "object" && w !== null ? r.set({ ...h, ...w }) : r.set({
      ...h,
      [w]: y
    });
  };
  return {
    // Store atom (combined)
    state: u,
    // Methods
    init: p,
    get: m,
    set: _,
    toggle: (w) => {
      const y = r.get();
      _(w, !y[w]);
    },
    all: f,
    reset: () => {
      r.set({ ...Pt }), d.set({ ...Tt });
    }
  };
};
function vi(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const pi = () => {
  const n = Pe(""), e = Pe([]), t = Pe(!1), o = Pe([]), s = Pe({ active: !1, column: "", order: "" }), l = Pe({
    kind: "all",
    showHidden: !1
  }), c = Pe(/* @__PURE__ */ new Set()), r = Pe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), d = Pe(null), u = Pe(0), p = Pe(!1), m = Pe([]), f = Pe(-1), _ = et([n], (I) => {
    const U = (I ?? "").trim(), G = U.indexOf("://"), ne = G >= 0 ? U.slice(0, G) : "", ke = (G >= 0 ? U.slice(G + 3) : U).split("/").filter(Boolean);
    let Le = "";
    const at = ke.map((Ve) => (Le = Le ? `${Le}/${Ve}` : Ve, {
      basename: Ve,
      name: Ve,
      path: ne ? `${ne}://${Le}` : Le,
      type: "dir"
    }));
    return { storage: ne, breadcrumb: at, path: U };
  }), S = et([o, s, l], (I, U, G) => {
    let ne = I;
    G.kind === "files" ? ne = ne.filter((Ve) => Ve.type === "file") : G.kind === "folders" && (ne = ne.filter((Ve) => Ve.type === "dir")), G.showHidden || (ne = ne.filter((Ve) => !Ve.basename.startsWith(".")));
    const { active: xe, column: ke, order: Le } = U;
    if (!xe || !ke) return ne;
    const at = Le === "asc" ? 1 : -1;
    return ne.slice().sort((Ve, qo) => vi(Ve[ke], qo[ke]) * at);
  }), D = et([o, c], (I, U) => U.size === 0 ? [] : I.filter((G) => U.has(G.path))), w = (I, U) => {
    const G = n.get();
    if ((U ?? !0) && G !== I) {
      const ne = m.get(), xe = f.get();
      xe < ne.length - 1 && ne.splice(xe + 1), ne.length === 0 && G && ne.push(G), ne.push(I), m.set([...ne]), f.set(ne.length - 1);
    }
    n.set(I);
  }, y = (I) => {
    o.set(I ?? []);
  }, h = (I) => {
    e.set(I ?? []);
  }, b = (I, U) => {
    s.set({ active: !0, column: I, order: U });
  }, k = (I) => {
    const U = s.get();
    U.active && U.column === I ? s.set({
      active: U.order === "asc",
      column: I,
      order: "desc"
    }) : s.set({
      active: !0,
      column: I,
      order: "asc"
    });
  }, C = () => {
    s.set({ active: !1, column: "", order: "" });
  }, V = (I, U) => {
    l.set({ kind: I, showHidden: U });
  }, R = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, q = (I, U = "multiple") => {
    const G = new Set(c.get());
    U === "single" && G.clear(), G.add(I), c.set(G), u.set(G.size);
  }, B = (I) => {
    const U = new Set(c.get());
    U.delete(I), c.set(U), u.set(U.size);
  }, F = (I) => c.get().has(I), K = (I, U = "multiple") => {
    const G = new Set(c.get());
    G.has(I) ? G.delete(I) : (U === "single" && G.clear(), G.add(I)), c.set(G), u.set(G.size);
  }, Y = (I = "multiple", U) => {
    if (I === "single") {
      const G = o.get()[0];
      if (G) {
        const ne = G.path;
        c.set(/* @__PURE__ */ new Set([ne])), u.set(1);
      }
    } else if (U?.selectionFilterType || U?.selectionFilterMimeIncludes && U.selectionFilterMimeIncludes.length > 0) {
      const G = o.get().filter((ne) => {
        const xe = U.selectionFilterType, ke = U.selectionFilterMimeIncludes;
        return xe === "files" && ne.type === "dir" || xe === "dirs" && ne.type === "file" ? !1 : ke && Array.isArray(ke) && ke.length > 0 && ne.type !== "dir" ? ne.mime_type ? ke.some((Le) => ne.mime_type?.startsWith(Le)) : !1 : !0;
      }).map((ne) => ne.path);
      c.set(new Set(G)), u.set(G.length);
    } else {
      const G = new Set(o.get().map((ne) => ne.path));
      c.set(G), u.set(G.size);
    }
  }, z = () => {
    c.set(/* @__PURE__ */ new Set()), u.set(0);
  }, Z = (I) => {
    const U = new Set(I ?? []);
    c.set(U), u.set(U.size);
  }, le = (I) => {
    u.set(I);
  }, Q = (I) => {
    p.set(!!I);
  }, E = () => p.get(), $ = (I, U) => {
    const G = o.get().filter((ne) => U.has(ne.path));
    r.set({
      type: I,
      path: _.get().path,
      items: new Set(G)
    });
  }, P = (I) => et([r], (U) => U.type === "cut" && Array.from(U.items).some((G) => G.path === I)), M = (I) => et([r], (U) => U.type === "copy" && Array.from(U.items).some((G) => G.path === I)), W = (I) => {
    const U = P(I);
    return J(U).value ?? !1;
  }, ee = (I) => {
    const U = M(I);
    return J(U).value ?? !1;
  }, ge = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ve = () => r.get(), je = (I) => {
    d.set(I);
  }, Ke = () => d.get(), A = () => {
    d.set(null);
  }, ye = () => {
    const I = m.get(), U = f.get();
    if (U > 0) {
      const G = U - 1, ne = I[G];
      ne && (f.set(G), w(ne, !1));
    }
  }, ce = () => {
    const I = m.get(), U = f.get();
    if (U < I.length - 1) {
      const G = U + 1, ne = I[G];
      ne && (f.set(G), w(ne, !1));
    }
  }, we = et([f], (I) => I > 0), Se = et(
    [m, f],
    (I, U) => U < I.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: s,
    filter: l,
    selectedKeys: c,
    selectedCount: u,
    loading: p,
    draggedItem: d,
    clipboardItems: r,
    // Computed values
    path: _,
    sortedFiles: S,
    selectedItems: D,
    // Actions
    setPath: w,
    setFiles: y,
    setStorages: h,
    setSort: b,
    toggleSort: k,
    clearSort: C,
    setFilter: V,
    clearFilter: R,
    select: q,
    deselect: B,
    toggleSelect: K,
    selectAll: Y,
    isSelected: F,
    clearSelection: z,
    setSelection: Z,
    setSelectedCount: le,
    setLoading: Q,
    isLoading: E,
    setClipboard: $,
    createIsCut: P,
    createIsCopied: M,
    isCut: W,
    isCopied: ee,
    clearClipboard: ge,
    getClipboard: ve,
    setDraggedItem: je,
    getDraggedItem: Ke,
    clearDraggedItem: A,
    setReadOnly: (I) => {
      t.set(I);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (I) => t.get() ? !0 : I.read_only ?? !1,
    // Navigation
    goBack: ye,
    goForward: ce,
    canGoBack: we,
    canGoForward: Se,
    navigationHistory: m,
    historyIndex: f
  };
};
class mn {
  /**
   * Validate that required parameters are provided
   */
  validateParam(e, t) {
    if (e == null)
      throw new Error(`${t} is required`);
  }
  /**
   * Validate that a file path is provided
   */
  validatePath(e) {
    if (!e)
      throw new Error("Path must be a non-empty string");
  }
  /**
   * Extract storage and path from a combined path string
   * Format: "storage://path" or just "path"
   */
  parsePath(e) {
    if (!e)
      return {};
    if (e.includes("://")) {
      const [t, ...o] = e.split("://");
      return { storage: t, path: o.join("://") };
    }
    return { path: e };
  }
  /**
   * Combine storage and path into a single path string
   */
  combinePath(e, t) {
    return e && t ? `${e}://${t}` : t || "";
  }
}
class Hh extends mn {
  filesSource;
  storage;
  readOnly;
  contentStore;
  constructor(e) {
    super(), this.filesSource = e.files, this.storage = e.storage || "memory", this.readOnly = !!e.readOnly, this.contentStore = e.contentStore || /* @__PURE__ */ new Map();
  }
  get files() {
    return Array.isArray(this.filesSource) ? this.filesSource : this.filesSource.value;
  }
  set files(e) {
    Array.isArray(this.filesSource) ? (this.filesSource.length = 0, this.filesSource.push(...e)) : this.filesSource.value = e;
  }
  combine(e) {
    const t = e ?? "";
    return t === "" ? `${this.storage}://` : `${this.storage}://${t}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  parent(e) {
    const { path: t } = this.split(e);
    if (!t) return this.combine("");
    const o = t.replace(/\/+$/g, "").replace(/^\/+/, ""), s = o.lastIndexOf("/");
    return s <= 0 ? this.combine("") : this.combine(o.slice(0, s));
  }
  join(e, t) {
    const { path: o } = this.split(e), s = (o ?? "").replace(/\/$/, ""), l = s ? `${s}/${t}` : t;
    return this.combine(l);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  findByPath(e) {
    const t = e;
    return this.files.find((o) => o.storage === this.storage && o.path === t);
  }
  listChildren(e) {
    const t = e;
    return this.files.filter((o) => o.storage === this.storage && o.dir === t);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const t = this.files.slice(), o = t.findIndex((s) => s.storage === this.storage && s.path === e.path);
    o === -1 ? t.push(e) : t[o] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((o) => !(o.storage === this.storage && o.path === e));
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], o = [];
    for (const s of this.files) {
      if (s.storage !== this.storage) {
        o.push(s);
        continue;
      }
      s.path === e || s.path.startsWith(e + "/") ? t.push(s) : o.push(s);
    }
    return this.replaceAll(o), t;
  }
  makeDirEntry(e, t) {
    const o = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, o = 0, s = null) {
    const l = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: s,
      visibility: "public"
    };
  }
  resultForDir(e) {
    return {
      files: this.listChildren(e),
      storages: [this.storage],
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = e?.path ?? this.combine(""), { path: o } = this.split(t), s = this.combine(o ?? ""), { storage: l } = this.split(s);
    return {
      storages: [l || ""],
      dirname: s,
      files: this.listChildren(s),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const s of e.items) {
      const l = this.findByPath(s.path);
      l && (l.type === "dir" ? t.push(...this.removeTree(l.path)) : (this.removeExact(l.path), t.push(l)), this.contentStore.delete(l.path));
    }
    return { ...this.resultForDir(e.path), deleted: t };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.findByPath(e.path);
    if (!t) throw new Error("Item not found");
    const o = t.dir, s = this.join(o, e.name);
    if (t.type === "dir") {
      const l = t.path, c = s, r = this.files.map((d) => {
        if (d.storage !== this.storage) return d;
        if (d.path === l || d.path.startsWith(l + "/")) {
          const u = c + d.path.slice(l.length), p = this.parent(u);
          return this.cloneEntry(d, {
            path: u,
            dir: p,
            basename: d.path === l ? e.name : d.basename
          });
        }
        return d;
      });
      for (const [d, u] of Array.from(this.contentStore.entries()))
        if (d === l || d.startsWith(l + "/")) {
          this.contentStore.delete(d);
          const p = c + d.slice(l.length);
          this.contentStore.set(p, u);
        }
      this.replaceAll(r);
    } else {
      const l = this.cloneEntry(t, {
        path: s,
        dir: o,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(l);
      const c = this.contentStore.get(t.path);
      c !== void 0 && (this.contentStore.delete(t.path), this.contentStore.set(l.path, c));
    }
    return this.resultForDir(o);
  }
  uniqueName(e, t, o) {
    if (!o.has(this.join(e, t))) return t;
    const s = t.lastIndexOf("."), l = s > 0 ? t.slice(0, s) : t, c = s > 0 ? t.slice(s) : "";
    let r = 1;
    for (; ; ) {
      const d = `${l} copy ${r}${c}`, u = this.join(e, d);
      if (!o.has(u)) return d;
      r++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, o = new Set(this.files.map((c) => c.path)), s = [], l = (c, r) => {
      if (c.type === "dir") {
        const d = this.uniqueName(r, c.basename, o), u = this.makeDirEntry(r, d);
        o.add(u.path), s.push(u);
        const p = c.path + "/", m = this.files.filter(
          (f) => f.storage === this.storage && f.path.startsWith(p)
        );
        for (const f of m) {
          const _ = f.path.slice(p.length), S = _.includes("/") ? _.slice(0, _.lastIndexOf("/")) : "", D = S ? this.join(u.path, S) : u.path;
          if (f.type === "dir")
            l(f, D);
          else {
            const w = this.uniqueName(D, f.basename, o), y = this.makeFileEntry(
              D,
              w,
              f.file_size || 0,
              f.mime_type
            );
            s.push(y), o.add(y.path);
            const h = this.contentStore.get(f.path);
            h !== void 0 && this.contentStore.set(y.path, h);
          }
        }
      } else {
        const d = this.uniqueName(r, c.basename, o), u = this.makeFileEntry(r, d, c.file_size || 0, c.mime_type);
        s.push(u), o.add(u.path);
        const p = this.contentStore.get(c.path);
        p !== void 0 && this.contentStore.set(u.path, p);
      }
    };
    for (const c of e.sources) {
      const r = this.findByPath(c);
      r && l(r, t);
    }
    return this.replaceAll(this.files.concat(s)), this.resultForDir(t);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, o = new Set(this.files.map((c) => c.path));
    let s = this.files.slice();
    const l = (c, r) => {
      if (c.type === "dir") {
        const d = c.path, u = this.uniqueName(r, c.basename, o), p = this.join(r, u);
        s = s.map((f) => {
          if (f.storage !== this.storage) return f;
          if (f.path === d || f.path.startsWith(d + "/")) {
            const _ = p + f.path.slice(d.length);
            return this.cloneEntry(f, {
              path: _,
              dir: this.parent(_),
              basename: f.path === d ? u : f.basename
            });
          }
          return f;
        });
        for (const [f, _] of Array.from(this.contentStore.entries()))
          if (f === d || f.startsWith(d + "/")) {
            this.contentStore.delete(f);
            const S = p + f.slice(d.length);
            this.contentStore.set(S, _);
          }
      } else {
        const d = this.uniqueName(r, c.basename, o), u = this.join(r, d);
        s = s.map(
          (m) => m === c ? this.cloneEntry(m, {
            path: u,
            dir: r,
            basename: d,
            extension: this.getExtension(d),
            last_modified: Date.now()
          }) : m
        );
        const p = this.contentStore.get(c.path);
        p !== void 0 && (this.contentStore.delete(c.path), this.contentStore.set(u, p));
      }
    };
    for (const c of e.sources) {
      const r = this.findByPath(c);
      r && l(r, t);
    }
    return this.replaceAll(s), this.resultForDir(t);
  }
  async archive(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, o = this.makeFileEntry(e.path, t, 0, "application/zip");
    return this.upsert(o), this.resultForDir(e.path);
  }
  async unarchive(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.findByPath(e.item);
    if (!t) throw new Error("Archive not found");
    const o = t.basename.replace(/\.zip$/i, ""), s = this.makeDirEntry(e.path, o);
    return this.upsert(s), this.resultForDir(e.path);
  }
  async createFile(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeFileEntry(e.path, e.name, 0, null);
    return this.upsert(t), this.contentStore.set(t.path, ""), this.resultForDir(e.path);
  }
  async createFolder(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeDirEntry(e.path, e.name);
    return this.upsert(t), this.resultForDir(e.path);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.contentStore.get(e.path);
    if (typeof t == "string" || t === void 0)
      return {
        content: t ?? "",
        mimeType: this.findByPath(e.path)?.mime_type || void 0
      };
    const o = new Uint8Array(t);
    let s = "";
    for (let c = 0; c < o.length; c++) s += String.fromCharCode(o[c]);
    return { content: btoa(s), mimeType: this.findByPath(e.path)?.mime_type || void 0 };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), o = e.path;
    return this.files.filter((s) => {
      if (s.storage !== this.storage) return !1;
      if (o) {
        if (e.deep) {
          if (!(s.path === o || s.path.startsWith(o + "/"))) return !1;
        } else if (s.dir !== o)
          return !1;
      }
      return s.basename.toLowerCase().includes(t) || s.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.validateParam(e.path, "path");
    const t = this.findByPath(e.path);
    if (!t) throw new Error("File not found");
    if (t.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(e.path, e.content), this.upsert(
      this.cloneEntry(t, { file_size: e.content.length, last_modified: Date.now() })
    ), e.path;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (o) => {
      const s = t.getTargetPath(), l = o?.name || "file", c = o?.type || null, r = o?.data, d = o?.size || 0, u = this.makeFileEntry(s, l, d, c);
      if (this.upsert(u), r)
        try {
          const p = await r.arrayBuffer();
          this.contentStore.set(u.path, p);
        } catch {
          this.contentStore.set(u.path, "");
        }
      else
        this.contentStore.set(u.path, "");
    });
  }
}
function Rn(n, e, t) {
  const o = `HTTP ${e}: ${t}`;
  if (!n)
    return o;
  try {
    const s = JSON.parse(n);
    if (s.message)
      return s.message;
    if (s.error) {
      if (typeof s.error == "string")
        return s.error;
      if (s.error.message)
        return s.error.message;
    }
    if (s.errors && Array.isArray(s.errors) && s.errors.length > 0) {
      const l = s.errors.map((c) => c.message).filter((c) => !!c);
      if (l.length > 0)
        return l.join(", ");
    }
    return s.detail ? s.detail : s.title ? s.title : n;
  } catch {
    return n || o;
  }
}
class uo extends mn {
  config;
  /**
   * Default URL endpoints
   */
  static DEFAULT_URLS = {
    list: "",
    upload: "/upload",
    delete: "/delete",
    rename: "/rename",
    copy: "/copy",
    move: "/move",
    archive: "/archive",
    unarchive: "/unarchive",
    createFile: "/create-file",
    createFolder: "/create-folder",
    preview: "/preview",
    download: "/download",
    search: "/search",
    save: "/save"
  };
  constructor(e) {
    super();
    const t = {
      ...uo.DEFAULT_URLS,
      ...e.url || {}
    };
    this.config = {
      ...e,
      baseURL: e.baseURL || "",
      url: t
    };
  }
  /**
   * Set or update the base URL for API requests
   */
  setBaseURL(e) {
    this.config.baseURL = e || "";
  }
  /**
   * Set or update the authentication token
   * Pass undefined to remove the token
   */
  setToken(e) {
    this.config.token = e;
  }
  configureUploader(e, t) {
    const o = this.getHeaders();
    delete o["Content-Type"], e.use(rs, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: o,
      formData: !0
    }), e.on("upload", () => {
      const s = t.getTargetPath();
      e.getFiles().forEach((c) => {
        e.setFileMeta(c.id, { path: s });
      });
    });
  }
  getHeaders() {
    const e = {
      "Content-Type": "application/json",
      ...this.config.headers
    };
    return this.config.token && (e.Authorization = `Bearer ${this.config.token}`), e;
  }
  async request(e, t = {}) {
    const o = `${this.config.baseURL}${e}`, s = await fetch(o, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!s.ok) {
      const c = await s.text(), r = Rn(c, s.status, s.statusText);
      throw new Error(r);
    }
    return (s.headers.get("content-type") || "").includes("application/json") ? await s.json() : await s.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const o = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(o, { method: "GET" });
  }
  async delete(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.path, "path"), await this.request(this.config.url.delete, {
      method: "DELETE",
      body: JSON.stringify({ path: e.path, items: e.items })
    });
  }
  async rename(e) {
    return this.validateParam(e.path, "path"), this.validateParam(e.item, "item"), this.validateParam(e.name, "name"), this.validatePath(e.path), await this.request(this.config.url.rename, {
      method: "POST",
      body: JSON.stringify({ path: e.path, item: e.item, name: e.name })
    });
  }
  async copy(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), this.validatePath(e.path), await this.request(this.config.url.copy, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async move(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), this.validatePath(e.path), await this.request(this.config.url.move, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async archive(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.archive, {
      method: "POST",
      body: JSON.stringify({ items: e.items, path: e.path, name: e.name })
    });
  }
  async unarchive(e) {
    return this.validateParam(e.item, "item"), this.validateParam(e.path, "path"), await this.request(this.config.url.unarchive, {
      method: "POST",
      body: JSON.stringify({ item: e.item, path: e.path })
    });
  }
  async createFile(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFile, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  async createFolder(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFolder, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  getPreviewUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`;
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path }), o = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, s = await fetch(o, { headers: this.getHeaders() });
    if (!s.ok) {
      const c = await s.text(), r = Rn(c, s.status, s.statusText);
      throw new Error(r);
    }
    return { content: await s.text(), mimeType: s.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, o = new URLSearchParams();
    e.path && o.set("path", e.path), e.filter && o.set("filter", e.filter), e.deep && o.set("deep", "1"), e.size && e.size !== "all" && o.set("size", e.size);
    const s = o.toString() ? `${t}?${o.toString()}` : t;
    return (await this.request(s, {
      method: "GET"
    })).files || [];
  }
  async save(e) {
    return this.validateParam(e.path, "path"), await this.request(this.config.url.save, {
      method: "POST",
      body: JSON.stringify({ path: e.path, content: e.content }),
      headers: this.getHeaders()
    });
  }
}
class Uh extends mn {
  dbName;
  storage;
  readOnly;
  version;
  db = null;
  dbPromise = null;
  constructor(e = {}) {
    super(), this.dbName = e.dbName || "vuefinder", this.storage = e.storage || "indexeddb", this.readOnly = !!e.readOnly, this.version = e.version || 1, this.initDB();
  }
  async initDB() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((e, t) => {
      const o = indexedDB.open(this.dbName, this.version);
      o.onerror = () => t(o.error), o.onsuccess = () => {
        this.db = o.result, e(this.db);
      }, o.onupgradeneeded = (s) => {
        const l = s.target.result;
        if (!l.objectStoreNames.contains("files")) {
          const c = l.createObjectStore("files", { keyPath: "path" });
          c.createIndex("storage", "storage", { unique: !1 }), c.createIndex("dir", "dir", { unique: !1 });
        }
        l.objectStoreNames.contains("content") || l.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  combine(e) {
    const t = e ?? "";
    return t === "" ? `${this.storage}://` : `${this.storage}://${t}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  parent(e) {
    const { path: t } = this.split(e);
    if (!t) return this.combine("");
    const o = t.replace(/\/+$/g, "").replace(/^\/+/, ""), s = o.lastIndexOf("/");
    return s <= 0 ? this.combine("") : this.combine(o.slice(0, s));
  }
  join(e, t) {
    const { path: o } = this.split(e), s = (o ?? "").replace(/\/$/, ""), l = s ? `${s}/${t}` : t;
    return this.combine(l);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  async findByPath(e) {
    const t = await this.getDB();
    return new Promise((o, s) => {
      const r = t.transaction(["files"], "readonly").objectStore("files").get(e);
      r.onsuccess = () => {
        const d = r.result;
        d && d.storage === this.storage ? o(d) : o(void 0);
      }, r.onerror = () => s(r.error);
    });
  }
  async listChildren(e) {
    const t = await this.getDB();
    return new Promise((o, s) => {
      const d = t.transaction(["files"], "readonly").objectStore("files").index("dir").getAll(e);
      d.onsuccess = () => {
        const u = d.result.filter(
          (p) => p.storage === this.storage && p.dir === e
        );
        o(u);
      }, d.onerror = () => s(d.error);
    });
  }
  async getAllFiles() {
    const e = await this.getDB();
    return new Promise((t, o) => {
      const r = e.transaction(["files"], "readonly").objectStore("files").index("storage").getAll(this.storage);
      r.onsuccess = () => t(r.result), r.onerror = () => o(r.error);
    });
  }
  async upsert(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getDB();
    return new Promise((o, s) => {
      const r = t.transaction(["files"], "readwrite").objectStore("files").put(e);
      r.onsuccess = () => o(), r.onerror = () => s(r.error);
    });
  }
  async removeExact(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getDB();
    return new Promise((o, s) => {
      const l = t.transaction(["files", "content"], "readwrite"), c = l.objectStore("files"), r = l.objectStore("content"), d = c.delete(e);
      r.delete(e), d.onsuccess = () => o(), d.onerror = () => s(d.error);
    });
  }
  async removeTree(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getAllFiles(), o = [];
    for (const l of t)
      l.storage === this.storage && (l.path === e || l.path.startsWith(e + "/")) && o.push(l);
    const s = await this.getDB();
    return new Promise((l, c) => {
      const r = s.transaction(["files", "content"], "readwrite"), d = r.objectStore("files"), u = r.objectStore("content");
      for (const p of o)
        d.delete(p.path), u.delete(p.path);
      r.oncomplete = () => l(o), r.onerror = () => c(r.error);
    });
  }
  makeDirEntry(e, t) {
    const o = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, o = 0, s = null) {
    const l = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: s,
      visibility: "public"
    };
  }
  async resultForDir(e) {
    return {
      files: await this.listChildren(e),
      storages: [this.storage],
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = e?.path ?? this.combine(""), { path: o } = this.split(t), s = this.combine(o ?? ""), { storage: l } = this.split(s), c = await this.listChildren(s);
    return {
      storages: [l || ""],
      dirname: s,
      files: c,
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const s of e.items) {
      const l = await this.findByPath(s.path);
      if (l)
        if (l.type === "dir") {
          const c = await this.removeTree(l.path);
          t.push(...c);
        } else
          await this.removeExact(l.path), t.push(l);
    }
    return { ...await this.resultForDir(e.path), deleted: t };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = await this.findByPath(e.path);
    if (!t) throw new Error("Item not found");
    const o = t.dir, s = this.join(o, e.name);
    if (t.type === "dir") {
      const l = await this.getAllFiles(), c = t.path, r = s;
      for (const d of l)
        if (d.storage === this.storage && (d.path === c || d.path.startsWith(c + "/"))) {
          const u = r + d.path.slice(c.length), p = this.parent(u), m = this.cloneEntry(d, {
            path: u,
            dir: p,
            basename: d.path === c ? e.name : d.basename,
            last_modified: Date.now()
          });
          await this.upsert(m);
          const _ = (await this.getDB()).transaction(["content"], "readwrite"), S = _.objectStore("content"), D = S.get(d.path);
          D.onsuccess = () => {
            const w = D.result;
            w && (S.delete(d.path), S.put({ path: u, content: w.content }));
          }, await new Promise((w) => {
            _.oncomplete = () => w(void 0);
          }), d.path !== u && await this.removeExact(d.path);
        }
    } else {
      const l = this.cloneEntry(t, {
        path: s,
        dir: o,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      await this.upsert(l);
      const r = (await this.getDB()).transaction(["content"], "readwrite"), d = r.objectStore("content"), u = d.get(t.path);
      u.onsuccess = () => {
        const p = u.result;
        p && (d.delete(t.path), d.put({ path: s, content: p.content }));
      }, await new Promise((p) => {
        r.oncomplete = () => p(void 0);
      }), await this.removeExact(t.path);
    }
    return this.resultForDir(o);
  }
  async uniqueName(e, t, o) {
    const s = this.join(e, t);
    if (!o.has(s)) return t;
    const l = t.lastIndexOf("."), c = l > 0 ? t.slice(0, l) : t, r = l > 0 ? t.slice(l) : "";
    let d = 1;
    for (; ; ) {
      const u = `${c} copy ${d}${r}`, p = this.join(e, u);
      if (!o.has(p)) return u;
      d++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, o = await this.getAllFiles(), s = new Set(o.map((c) => c.path)), l = async (c, r) => {
      if (c.type === "dir") {
        const d = await this.uniqueName(r, c.basename, s), u = this.makeDirEntry(r, d);
        s.add(u.path), await this.upsert(u);
        const p = c.path + "/", m = o.filter(
          (f) => f.storage === this.storage && f.path.startsWith(p)
        );
        for (const f of m) {
          const _ = f.path.slice(p.length), S = _.includes("/") ? _.slice(0, _.lastIndexOf("/")) : "", D = S ? this.join(u.path, S) : u.path;
          if (f.type === "dir")
            await l(f, D);
          else {
            const w = await this.uniqueName(D, f.basename, s), y = this.makeFileEntry(
              D,
              w,
              f.file_size || 0,
              f.mime_type
            );
            s.add(y.path), await this.upsert(y);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), k = b.objectStore("content"), C = k.get(f.path);
            C.onsuccess = () => {
              const V = C.result;
              V && k.put({ path: y.path, content: V.content });
            }, await new Promise((V) => {
              b.oncomplete = () => V(void 0);
            });
          }
        }
      } else {
        const d = await this.uniqueName(r, c.basename, s), u = this.makeFileEntry(r, d, c.file_size || 0, c.mime_type);
        s.add(u.path), await this.upsert(u);
        const m = (await this.getDB()).transaction(["content"], "readwrite"), f = m.objectStore("content"), _ = f.get(c.path);
        _.onsuccess = () => {
          const S = _.result;
          S && f.put({ path: u.path, content: S.content });
        }, await new Promise((S) => {
          m.oncomplete = () => S(void 0);
        });
      }
    };
    for (const c of e.sources) {
      const r = await this.findByPath(c);
      r && await l(r, t);
    }
    return this.resultForDir(t);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, o = await this.getAllFiles(), s = new Set(o.map((c) => c.path)), l = async (c, r) => {
      if (c.type === "dir") {
        const d = c.path, u = await this.uniqueName(r, c.basename, s), p = this.join(r, u), m = o.filter(
          (f) => f.storage === this.storage && (f.path === d || f.path.startsWith(d + "/"))
        );
        for (const f of m) {
          const _ = p + f.path.slice(d.length), S = this.parent(_), D = this.cloneEntry(f, {
            path: _,
            dir: S,
            basename: f.path === d ? u : f.basename,
            last_modified: Date.now()
          });
          await this.upsert(D);
          const y = (await this.getDB()).transaction(["content"], "readwrite"), h = y.objectStore("content"), b = h.get(f.path);
          b.onsuccess = () => {
            const k = b.result;
            k && (h.delete(f.path), h.put({ path: _, content: k.content }));
          }, await new Promise((k) => {
            y.oncomplete = () => k(void 0);
          }), f.path !== _ && await this.removeExact(f.path);
        }
      } else {
        const d = await this.uniqueName(r, c.basename, s), u = this.join(r, d), p = this.cloneEntry(c, {
          path: u,
          dir: r,
          basename: d,
          extension: this.getExtension(d),
          last_modified: Date.now()
        });
        await this.upsert(p);
        const f = (await this.getDB()).transaction(["content"], "readwrite"), _ = f.objectStore("content"), S = _.get(c.path);
        S.onsuccess = () => {
          const D = S.result;
          D && (_.delete(c.path), _.put({ path: u, content: D.content }));
        }, await new Promise((D) => {
          f.oncomplete = () => D(void 0);
        }), await this.removeExact(c.path);
      }
    };
    for (const c of e.sources) {
      const r = await this.findByPath(c);
      r && await l(r, t);
    }
    return this.resultForDir(t);
  }
  async archive(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, o = this.makeFileEntry(e.path, t, 0, "application/zip");
    return await this.upsert(o), this.resultForDir(e.path);
  }
  async unarchive(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = await this.findByPath(e.item);
    if (!t) throw new Error("Archive not found");
    const o = t.basename.replace(/\.zip$/i, ""), s = this.makeDirEntry(e.path, o);
    return await this.upsert(s), this.resultForDir(e.path);
  }
  async createFile(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeFileEntry(e.path, e.name, 0, null);
    await this.upsert(t);
    const s = (await this.getDB()).transaction(["content"], "readwrite");
    return s.objectStore("content").put({ path: t.path, content: "" }), await new Promise((c) => {
      s.oncomplete = () => c(void 0);
    }), this.resultForDir(e.path);
  }
  async createFolder(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeDirEntry(e.path, e.name);
    return await this.upsert(t), this.resultForDir(e.path);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = await this.getDB();
    return new Promise((o, s) => {
      const r = t.transaction(["content"], "readonly").objectStore("content").get(e.path);
      r.onsuccess = async () => {
        const d = r.result, u = await this.findByPath(e.path);
        if (d && d.content) {
          const p = d.content;
          if (typeof p == "string")
            o({
              content: p,
              mimeType: u?.mime_type || void 0
            });
          else {
            const m = new Uint8Array(p);
            let f = "";
            for (let S = 0; S < m.length; S++) f += String.fromCharCode(m[S]);
            const _ = btoa(f);
            o({
              content: _,
              mimeType: u?.mime_type || void 0
            });
          }
        } else
          o({
            content: "",
            mimeType: u?.mime_type || void 0
          });
      }, r.onerror = () => s(r.error);
    });
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), o = e.path;
    return (await this.getAllFiles()).filter((l) => {
      if (l.storage !== this.storage) return !1;
      if (o) {
        if (e.deep) {
          if (!(l.path === o || l.path.startsWith(o + "/"))) return !1;
        } else if (l.dir !== o)
          return !1;
      }
      return l.basename.toLowerCase().includes(t) || l.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.validateParam(e.path, "path");
    const t = await this.findByPath(e.path);
    if (!t) throw new Error("File not found");
    if (t.type !== "file") throw new Error("Can only save file content");
    const o = this.cloneEntry(t, {
      file_size: e.content.length,
      last_modified: Date.now()
    });
    await this.upsert(o);
    const l = (await this.getDB()).transaction(["content"], "readwrite");
    return l.objectStore("content").put({ path: e.path, content: e.content }), await new Promise((r) => {
      l.oncomplete = () => r(void 0);
    }), e.path;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (o) => {
      const s = t.getTargetPath(), l = o?.name || "file", c = o?.type || null, r = o?.data, d = o?.size || 0, u = this.makeFileEntry(s, l, d, c);
      if (await this.upsert(u), r)
        try {
          const p = await r.arrayBuffer(), f = (await this.getDB()).transaction(["content"], "readwrite");
          f.objectStore("content").put({ path: u.path, content: p }), await new Promise((S) => {
            f.oncomplete = () => S(void 0);
          });
        } catch {
          const m = (await this.getDB()).transaction(["content"], "readwrite");
          m.objectStore("content").put({ path: u.path, content: "" }), await new Promise((_) => {
            m.oncomplete = () => _(void 0);
          });
        }
      else {
        const m = (await this.getDB()).transaction(["content"], "readwrite");
        m.objectStore("content").put({ path: u.path, content: "" }), await new Promise((_) => {
          m.oncomplete = () => _(void 0);
        });
      }
    });
  }
}
const Ln = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, o) => ["adapter", "search", n, e, t, o],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class hi {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new os({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
          staleTime: t.staleTime ?? 300 * 1e3,
          retry: t.retry ?? 2
        },
        mutations: {
          retry: t.retry ?? 1
        }
      }
    }), this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
      staleTime: t.staleTime ?? 300 * 1e3,
      cacheTime: t.cacheTime ?? 600 * 1e3,
      retry: t.retry ?? 2,
      onBeforeOpen: this.onBeforeOpen ?? (() => {
      }),
      onAfterOpen: this.onAfterOpen ?? (() => {
      })
    };
  }
  /**
   * Get the underlying driver instance
   */
  getDriver() {
    return this.driver;
  }
  /**
   * Get the query client instance
   */
  getQueryClient() {
    return this.queryClient;
  }
  /**
   * List files with caching and automatic refetching
   */
  async list(e) {
    const t = Ln.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.list({ path: e }),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Open a path and optionally update state
   * @param path
   * @returns
   */
  async open(e) {
    this.onBeforeOpen && this.onBeforeOpen();
    const t = await this.list(e);
    return this.onAfterOpen && this.onAfterOpen(t), t;
  }
  /**
   * Delete files with optimistic updates
   */
  async delete(e) {
    const t = await this.driver.delete(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const t = await this.driver.rename(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const t = await this.driver.copy(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const t = await this.driver.move(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const t = await this.driver.archive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const t = await this.driver.unarchive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const t = await this.driver.createFile(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const t = await this.driver.createFolder(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const t = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.getContent(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Get preview URL
   */
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  /**
   * Get download URL
   */
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  /**
   * Search files (cached per path+filter)
   */
  async search(e) {
    const t = Ln.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.search(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const t = await this.driver.save(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Invalidate all list queries
   */
  invalidateListQueries() {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter"],
      exact: !1
    });
  }
  invalidateListQuery(e) {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter", "list", e],
      exact: !0
    });
  }
  /**
   * Clear all cached queries
   */
  clearCache() {
    this.queryClient.clear();
  }
}
function mi(n) {
  const e = J(n.state);
  return {
    current: H(() => e.value.theme || "silver"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const _i = (n, e) => {
  const t = ds(n.id ?? "vf"), o = ts(), s = e.i18n, l = n.locale ?? e.locale, c = fi(n.id ?? "vf", n.config ?? {}), r = pi();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const d = new hi(n.driver);
  return Nt({
    // app version
    version: ri,
    // config store
    config: c,
    // Theme
    theme: (() => {
      const u = mi(c);
      return {
        current: u.current,
        set: u.set
      };
    })(),
    // files store
    fs: r,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: o,
    // storage
    storage: t,
    // localization object
    i18n: ii(
      t,
      l,
      o,
      s
    ),
    // modal state
    modal: ci(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Go(d),
    // active features
    features: ro(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: H(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: H(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: c.get("metricUnits") ? lo : hn,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, gi = ["data-theme"], wi = { class: "vuefinder__modal-layout__container" }, yi = { class: "vuefinder__modal-layout__content" }, bi = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ki = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, xi = { class: "vuefinder__modal-drag-message" }, Re = /* @__PURE__ */ te({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = T(null), t = se();
    t.config;
    const o = n;
    he(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Oe(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const c = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: c,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const s = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, c) => (v(), g("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: c[1] || (c[1] = kt((r) => a(t).modal.close(), ["esc"]))
    }, [
      c[2] || (c[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", wi, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: c[0] || (c[0] = pe((r) => a(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", yi, [
              me(l.$slots, "default")
            ]),
            l.$slots.buttons ? (v(), g("div", bi, [
              me(l.$slots, "buttons")
            ])) : O("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (v(), g("div", ki, [
        i("div", xi, x(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : O("", !0)
    ], 40, gi));
  }
}), $i = { class: "vuefinder__modal-header" }, Si = { class: "vuefinder__modal-header__icon-container" }, Ci = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, ze = /* @__PURE__ */ te({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (v(), g("div", $i, [
      i("div", Si, [
        (v(), j(lt(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", Ci, x(n.title), 1)
    ]));
  }
}), Di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Ei(n, e) {
  return v(), g("svg", Di, [...e[0] || (e[0] = [
    i("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const fo = { render: Ei }, Fi = { class: "vuefinder__about-modal__content" }, Pi = { class: "vuefinder__about-modal__main" }, Ti = { class: "vuefinder__about-modal__tab-content" }, Ai = { class: "vuefinder__about-modal__lead" }, Mi = { class: "vuefinder__about-modal__description" }, Ii = { class: "vuefinder__about-modal__links" }, Oi = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Bi = { class: "vuefinder__about-modal__meta" }, Ri = { class: "vuefinder__about-modal__meta-item" }, Li = { class: "vuefinder__about-modal__meta-label" }, Vi = { class: "vuefinder__about-modal__meta-value" }, zi = { class: "vuefinder__about-modal__meta-item" }, Ni = { class: "vuefinder__about-modal__meta-label" }, vo = /* @__PURE__ */ te({
  __name: "ModalAbout",
  setup(n) {
    const e = se(), { t } = e.i18n;
    return (o, s) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => a(e).modal.close())
        }, x(a(t)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", Fi, [
          L(ze, {
            icon: a(fo),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          i("div", Pi, [
            i("div", Ti, [
              i("div", Ai, x(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Mi, x(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Ii, [
                i("a", Oi, x(a(t)("Project Home")), 1),
                s[1] || (s[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Bi, [
                i("div", Ri, [
                  i("span", Li, x(a(t)("Version")), 1),
                  i("span", Vi, x(a(e).version), 1)
                ]),
                i("div", zi, [
                  i("span", Ni, x(a(t)("License")), 1),
                  s[2] || (s[2] = i("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ui(n, e) {
  return v(), g("svg", Hi, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const po = { render: Ui }, ji = { class: "vuefinder__delete-modal__content" }, Ki = { class: "vuefinder__delete-modal__form" }, qi = { class: "vuefinder__delete-modal__description" }, Wi = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Gi = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qi = { class: "vuefinder__delete-modal__file-name" }, Xi = { class: "vuefinder__delete-modal__warning" }, jt = /* @__PURE__ */ te({
  __name: "ModalDelete",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = J(o.path), l = T(e.modal.data.items), c = () => {
      l.value.length && e.adapter.delete({
        path: s.value.path,
        items: l.value.map(({ path: r, type: d }) => ({
          path: r,
          type: d
        }))
      }).then((r) => {
        fe.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        fe.error(Be(r, t("Failed to delete files")));
      });
    };
    return (r, d) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: c
        }, x(a(t)("Yes, Delete!")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (u) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1),
        i("div", Xi, x(a(t)("This action cannot be undone.")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(po),
            title: a(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", ji, [
            i("div", Ki, [
              i("p", qi, x(a(t)("Are you sure you want to delete these files?")), 1),
              i("div", Wi, [
                (v(!0), g(re, null, _e(l.value, (u) => (v(), g("p", {
                  key: u.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  u.type === "dir" ? (v(), g("svg", Gi, [...d[1] || (d[1] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), g("svg", Yi, [...d[2] || (d[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Qi, x(u.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Zi(n, e) {
  return v(), g("svg", Ji, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const ho = { render: Zi }, ea = { class: "vuefinder__rename-modal__content" }, ta = { class: "vuefinder__rename-modal__item" }, na = { class: "vuefinder__rename-modal__item-info" }, oa = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sa = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ia = { class: "vuefinder__rename-modal__item-name" }, Kt = /* @__PURE__ */ te({
  __name: "ModalRename",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = J(o.path), l = T(e.modal.data.items[0]), c = T(l.value.basename), r = () => {
      c.value != l.value.basename && e.adapter.rename({
        path: s.value.path,
        item: l.value.path,
        name: c.value
      }).then((d) => {
        fe.success(t("%s is renamed.", c.value)), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        fe.error(Be(d, t("Failed to rename")));
      });
    };
    return (d, u) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, x(a(t)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (p) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(ho),
            title: a(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", ea, [
            i("div", ta, [
              i("p", na, [
                l.value.type === "dir" ? (v(), g("svg", oa, [...u[2] || (u[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), g("svg", sa, [...u[3] || (u[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", ia, x(l.value.basename), 1)
              ]),
              be(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (p) => c.value = p),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: kt(r, ["enter"])
              }, null, 544), [
                [xt, c.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ue() {
  const n = se(), e = H(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const aa = { class: "vuefinder__text-preview" }, ra = { class: "vuefinder__text-preview__header" }, la = ["title"], ca = { class: "vuefinder__text-preview__actions" }, da = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ua = { key: 1 }, fa = /* @__PURE__ */ te({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = T(""), s = T(""), l = T(null), c = T(!1), r = se(), { enabled: d } = Ue(), { t: u } = r.i18n;
    he(async () => {
      try {
        const f = await r.adapter.getContent({ path: r.modal.data.item.path });
        o.value = f.content, t("success");
      } catch (f) {
        Be(f, "Failed to load text content"), t("success");
      }
    });
    const p = () => {
      c.value = !c.value, s.value = o.value, r.modal.setEditMode(c.value);
    }, m = async () => {
      try {
        const f = r.modal.data.item.path;
        await r.adapter.save({
          path: f,
          content: s.value
        }), o.value = s.value, fe.success(u("Updated.")), t("success"), c.value = !c.value;
      } catch (f) {
        fe.error(Be(f, u("Failed to save file")));
      }
    };
    return (f, _) => (v(), g("div", aa, [
      i("div", ra, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: a(r).modal.data.item.path
        }, x(a(r).modal.data.item.basename), 9, la),
        i("div", ca, [
          c.value ? (v(), g("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: m
          }, x(a(u)("Save")), 1)) : O("", !0),
          a(d)("edit") ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: _[0] || (_[0] = (S) => p())
          }, x(c.value ? a(u)("Cancel") : a(u)("Edit")), 1)) : O("", !0)
        ])
      ]),
      i("div", null, [
        c.value ? (v(), g("div", ua, [
          be(i("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": _[1] || (_[1] = (S) => s.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [xt, s.value]
          ])
        ])) : (v(), g("pre", da, x(o.value), 1))
      ])
    ]));
  }
}), _n = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((o) => {
        e.file(o);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), o = await new Promise((s) => {
        t.readEntries(s);
      });
      for (const s of o)
        await _n(n, s);
    }
  }
}, Ce = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function mo(n) {
  const e = se(), { t } = e.i18n, o = e.fs, s = J(o.path), l = e.config, c = T({ QUEUE_ENTRY_STATUS: Ce }), r = T(null), d = T(null), u = T(null), p = T(null), m = T(null), f = T([]), _ = T(""), S = T(!1), D = T(!1), w = T(null);
  let y;
  const h = (E) => {
    E.preventDefault(), E.stopPropagation(), D.value = !0;
  }, b = (E) => {
    E.preventDefault(), E.stopPropagation(), D.value = !0;
  }, k = (E) => {
    E.preventDefault(), E.stopPropagation(), (!E.relatedTarget || E.relatedTarget === document.body) && (D.value = !1);
  }, C = (E) => {
    E.preventDefault(), E.stopPropagation(), D.value = !1;
    const $ = /^[/\\](.+)/, P = E.dataTransfer;
    P && (P.items && P.items.length ? Array.from(P.items).forEach((M) => {
      if (M.kind === "file") {
        const W = M.webkitGetAsEntry?.();
        if (W)
          _n((ee, ge) => {
            const ve = $.exec(ee?.fullPath || "");
            R(ge, ve ? ve[1] : ge.name);
          }, W);
        else {
          const ee = M.getAsFile?.();
          ee && R(ee);
        }
      }
    }) : P.files && P.files.length && Array.from(P.files).forEach((M) => R(M)));
  }, V = (E) => f.value.findIndex(($) => $.id === E), R = (E, $) => y.addFile({ name: $ || E.name, type: E.type, data: E, source: "Local" }), q = (E) => E.status === Ce.DONE ? "text-green-600" : E.status === Ce.ERROR || E.status === Ce.CANCELED ? "text-red-600" : "", B = (E) => E.status === Ce.DONE ? "✓" : E.status === Ce.ERROR || E.status === Ce.CANCELED ? "!" : "...", F = () => p.value?.click(), K = () => e.modal.close(), Y = (E) => {
    if (S.value || !f.value.filter(($) => $.status !== Ce.DONE).length) {
      S.value || (_.value = t("Please select file to upload first."));
      return;
    }
    _.value = "", w.value = E || s.value, y.upload();
  }, z = () => {
    y.cancelAll(), f.value.forEach((E) => {
      E.status !== Ce.DONE && (E.status = Ce.CANCELED, E.statusName = t("Canceled"));
    }), S.value = !1;
  }, Z = (E) => {
    S.value || (y.removeFile(E.id), f.value.splice(V(E.id), 1));
  }, le = (E) => {
    if (!S.value)
      if (y.cancelAll(), E) {
        const $ = f.value.filter((P) => P.status !== Ce.DONE);
        f.value = [], $.forEach((P) => R(P.originalFile, P.name));
      } else
        f.value = [];
  }, Q = (E) => {
    E.forEach(($) => {
      R($);
    });
  };
  return he(() => {
    y = new ss({
      debug: e.debug,
      restrictions: { maxFileSize: li(l.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (M, W) => {
        if (W[M.id] != null) {
          const ge = V(M.id);
          f.value[ge]?.status === Ce.PENDING && (_.value = y.i18n("noDuplicates", { fileName: M.name })), f.value = f.value.filter((ve) => ve.id !== M.id);
        }
        return f.value.push({
          id: M.id,
          name: M.name,
          size: e.filesize(M.size),
          status: Ce.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: M.data
        }), !0;
      }
    });
    const E = {
      getTargetPath: () => (w.value || s.value).path
    };
    if (n)
      n(y, E);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(y, E);
    else
      throw new Error("No uploader configured");
    y.on("restriction-failed", (M, W) => {
      const ee = f.value[V(M.id)];
      ee && Z(ee), _.value = W.message;
    }), y.on("upload-progress", (M, W) => {
      const ee = W.bytesTotal ?? 1, ge = Math.floor(W.bytesUploaded / ee * 100), ve = V(M.id);
      ve !== -1 && f.value[ve] && (f.value[ve].percent = `${ge}%`);
    }), y.on("upload-success", (M) => {
      const W = f.value[V(M.id)];
      W && (W.status = Ce.DONE, W.statusName = t("Done"));
    }), y.on("upload-error", (M, W) => {
      const ee = f.value[V(M.id)];
      ee && (ee.percent = null, ee.status = Ce.ERROR, ee.statusName = W?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : W?.message || t("Unknown Error"));
    }), y.on("error", (M) => {
      _.value = M.message, S.value = !1, e.adapter.open(s.value.path);
    }), y.on("complete", () => {
      S.value = !1;
      const M = w.value || s.value;
      e.adapter.invalidateListQuery(M.path), e.adapter.open(M.path);
      const W = f.value.filter((ee) => ee.status === Ce.DONE).map((ee) => ee.name);
      e.emitter.emit("vf-upload-complete", W);
    }), p.value?.addEventListener("click", () => d.value?.click()), m.value?.addEventListener("click", () => u.value?.click());
    const $ = { capture: !0 };
    document.addEventListener("dragover", h, $), document.addEventListener("dragenter", b, $), document.addEventListener("dragleave", k, $), document.addEventListener("drop", C, $);
    const P = (M) => {
      const W = M.target, ee = W.files;
      if (ee) {
        for (const ge of ee) R(ge);
        W.value = "";
      }
    };
    d.value?.addEventListener("change", P), u.value?.addEventListener("change", P);
  }), Ae(() => {
    const E = { capture: !0 };
    document.removeEventListener("dragover", h, E), document.removeEventListener("dragenter", b, E), document.removeEventListener("dragleave", k, E), document.removeEventListener("drop", C, E);
  }), {
    container: r,
    internalFileInput: d,
    internalFolderInput: u,
    pickFiles: p,
    pickFolders: m,
    queue: f,
    message: _,
    uploading: S,
    hasFilesInDropArea: D,
    definitions: c,
    openFileSelector: F,
    upload: Y,
    cancel: z,
    remove: Z,
    clear: le,
    close: K,
    getClassNameForEntry: q,
    getIconForEntry: B,
    addExternalFiles: Q
  };
}
const va = { class: "vuefinder__image-preview" }, pa = { class: "vuefinder__image-preview__header" }, ha = ["title"], ma = { class: "vuefinder__image-preview__actions" }, _a = { class: "vuefinder__image-preview__image-container" }, ga = ["src"], wa = /* @__PURE__ */ te({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = se(), { enabled: s } = Ue(), { t: l } = o.i18n, c = T(!1), r = T(
      o.modal.data.item.previewUrl ?? o.adapter.getPreviewUrl({ path: o.modal.data.item.path })
    ), d = T(r.value), { addExternalFiles: u, upload: p, queue: m } = mo(o.customUploader), f = o.fs, _ = J(f.path), S = tt("cropperRef"), D = async () => {
      c.value = !c.value, o.modal.setEditMode(c.value);
    }, w = async () => {
      const h = S.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!h) return;
      let b = h;
      if (h.width > 1200 || h.height > 1200) {
        const q = Math.min(1200 / h.width, 1200 / h.height), B = document.createElement("canvas");
        B.width = Math.floor(h.width * q), B.height = Math.floor(h.height * q);
        const F = B.getContext("2d");
        F && (F.drawImage(h, 0, 0, B.width, B.height), b = B);
      }
      const k = o.modal.data.item.basename, C = k.split(".").pop()?.toLowerCase() || "jpg", V = C === "png" ? "image/png" : C === "gif" ? "image/gif" : "image/jpeg", R = await new Promise((q) => {
        b.toBlob((B) => q(B), V);
      });
      if (!R) {
        fe.error(l("Failed to save image"));
        return;
      }
      try {
        const q = new File([R], k, { type: V }), F = o.modal.data.item.path.split("/");
        F.pop();
        const Y = {
          path: F.join("/") || (_.value?.path ?? "")
        };
        u([q]), await new Promise((Q) => setTimeout(Q, 100));
        const z = m.value.find((Q) => Q.name === q.name);
        if (!z)
          throw new Error("File was not added to upload queue");
        p(Y);
        let Z = 0;
        for (; Z < 150; ) {
          await new Promise((E) => setTimeout(E, 200));
          const Q = m.value.find((E) => E.id === z.id);
          if (Q?.status === Ce.DONE) break;
          if (Q?.status === Ce.ERROR)
            throw new Error(Q.statusName || "Upload failed");
          Z++;
        }
        fe.success(l("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const le = o.root?.querySelector?.('[data-src="' + r.value + '"]');
        le && le instanceof HTMLElement && no.resetStatus(le), o.emitter.emit("vf-refresh-thumbnails"), await D(), t("success");
      } catch (q) {
        fe.error(Be(q, l("Failed to save image")));
      }
    };
    return he(() => {
      t("success");
    }), (y, h) => (v(), g("div", va, [
      i("div", pa, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: a(o).modal.data.item.path
        }, x(a(o).modal.data.item.basename), 9, ha),
        i("div", ma, [
          c.value ? (v(), g("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: w
          }, x(a(l)("Crop")), 1)) : O("", !0),
          a(s)("edit") ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: h[0] || (h[0] = (b) => D())
          }, x(c.value ? a(l)("Cancel") : a(l)("Edit")), 1)) : O("", !0)
        ])
      ]),
      i("div", _a, [
        c.value ? (v(), j(a(is), {
          key: 1,
          ref_key: "cropperRef",
          ref: S,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: d.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (v(), g("img", {
          key: 0,
          style: {},
          src: a(o).modal.data.item.previewUrl ?? a(o).adapter.getPreviewUrl({ path: a(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, ga))
      ])
    ]));
  }
}), ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ba(n, e) {
  return v(), g("svg", ya, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const At = { render: ba }, ka = { class: "vuefinder__default-preview" }, xa = { class: "vuefinder__default-preview__content" }, $a = { class: "vuefinder__default-preview__header" }, Sa = ["title"], Ca = { class: "vuefinder__default-preview__icon-container" }, Da = ["title"], Ea = /* @__PURE__ */ te({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = se(), o = e;
    return he(() => {
      o("success");
    }), (s, l) => (v(), g("div", ka, [
      i("div", xa, [
        i("div", $a, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: a(t).modal.data.item.path
          }, x(a(t).modal.data.item.basename), 9, Sa)
        ]),
        i("div", Ca, [
          L(a(At), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, x(a(t).modal.data.item.basename), 9, Da)
        ])
      ])
    ]));
  }
}), Fa = { class: "vuefinder__video-preview" }, Pa = ["title"], Ta = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Aa = ["src"], Ma = /* @__PURE__ */ te({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = se(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return he(() => {
      o("success");
    }), (l, c) => (v(), g("div", Fa, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: a(t).modal.data.item.path
      }, x(a(t).modal.data.item.basename), 9, Pa),
      i("div", null, [
        i("video", Ta, [
          i("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Aa),
          c[0] || (c[0] = de(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ia = { class: "vuefinder__audio-preview" }, Oa = ["title"], Ba = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ra = ["src"], La = /* @__PURE__ */ te({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = se(), s = () => {
      const l = se();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return he(() => {
      t("success");
    }), (l, c) => (v(), g("div", Ia, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: a(o).modal.data.item.path
      }, x(a(o).modal.data.item.basename), 9, Oa),
      i("div", null, [
        i("audio", Ba, [
          i("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Ra),
          c[0] || (c[0] = de(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Va = { class: "vuefinder__pdf-preview" }, za = ["title"], Na = ["data"], Ha = ["src"], Ua = /* @__PURE__ */ te({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = se(), o = e, s = () => {
      const l = se();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return he(() => {
      o("success");
    }), (l, c) => (v(), g("div", Va, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: a(t).modal.data.item.path
      }, x(a(t).modal.data.item.basename), 9, za),
      i("div", null, [
        i("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          i("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Ha)
        ], 8, Na)
      ])
    ]));
  }
});
function ja(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ka = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, qa = ["disabled", "title"], Wa = ["disabled", "title"], Ga = { class: "vuefinder__preview-modal__content" }, Ya = { key: 0 }, Qa = { class: "vuefinder__preview-modal__loading" }, Xa = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ja = { class: "vuefinder__preview-modal__details" }, Za = { class: "font-bold" }, er = { class: "pl-2 font-bold" }, tr = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, nr = ["download", "href"], qt = /* @__PURE__ */ te({
  __name: "ModalPreview",
  setup(n) {
    const e = se(), { enabled: t } = Ue(), { t: o } = e.i18n, s = T(!1), l = (h) => {
      const b = (h || "").split("/").pop() || "", k = b.lastIndexOf(".");
      return k >= 0 ? b.slice(k + 1).toLowerCase() : "";
    }, c = (h, b) => {
      if (!b) return !1;
      const k = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), C = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), V = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), R = /* @__PURE__ */ new Set([
        "txt",
        "md",
        "json",
        "js",
        "ts",
        "css",
        "scss",
        "html",
        "xml",
        "csv",
        "log",
        "yml",
        "yaml"
      ]);
      return h === "image" ? k.has(b) : h === "video" ? C.has(b) : h === "audio" ? V.has(b) : h === "text" ? R.has(b) : h === "application/pdf" ? b === "pdf" : !1;
    }, r = (h) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(h);
      const k = l(e.modal.data.item.path);
      return c(h, k);
    }, d = t("preview");
    d || (s.value = !0);
    const u = H(() => e.modal.data.item), p = J(e.fs.sortedFiles), m = H(() => p.value.filter((h) => h.type === "file")), f = H(
      () => m.value.findIndex((h) => h.path === u.value.path)
    ), _ = H(() => f.value > 0), S = H(() => f.value < m.value.length - 1), D = () => {
      if (e.modal.editMode || !_.value) return;
      const h = m.value[f.value - 1];
      h && (e.fs.clearSelection(), e.fs.select(h.path), e.modal.data.item = h);
    }, w = () => {
      if (e.modal.editMode || !S.value) return;
      const h = m.value[f.value + 1];
      h && (e.fs.clearSelection(), e.fs.select(h.path), e.modal.data.item = h);
    }, y = (h) => {
      if (h.key === "Escape") {
        h.preventDefault(), h.stopPropagation(), e.modal.close();
        return;
      }
      (h.key === "ArrowLeft" || h.key === "ArrowRight") && (h.preventDefault(), h.stopPropagation(), h.key === "ArrowLeft" ? D() : w());
    };
    return he(() => {
      const h = document.querySelector(".vuefinder__preview-modal");
      h && h.focus();
    }), (h, b) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (k) => a(e).modal.close())
        }, x(a(o)("Close")), 1),
        a(t)("download") ? (v(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path }),
          href: a(e).adapter.getDownloadUrl({ path: a(e).modal.data.item.path })
        }, x(a(o)("Download")), 9, nr)) : O("", !0)
      ]),
      default: oe(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: y
        }, [
          a(e).modal.editMode ? O("", !0) : (v(), g("div", Ka, [
            i("button", {
              disabled: !_.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: a(o)("Previous file"),
              onClick: D
            }, [...b[7] || (b[7] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, qa),
            i("button", {
              disabled: !S.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: a(o)("Next file"),
              onClick: w
            }, [...b[8] || (b[8] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Wa)
          ])),
          i("div", Ga, [
            a(d) ? (v(), g("div", Ya, [
              r("text") ? (v(), j(fa, {
                key: `text-${u.value.path}`,
                onSuccess: b[0] || (b[0] = (k) => s.value = !0)
              })) : r("image") ? (v(), j(wa, {
                key: `image-${u.value.path}`,
                onSuccess: b[1] || (b[1] = (k) => s.value = !0)
              })) : r("video") ? (v(), j(Ma, {
                key: `video-${u.value.path}`,
                onSuccess: b[2] || (b[2] = (k) => s.value = !0)
              })) : r("audio") ? (v(), j(La, {
                key: `audio-${u.value.path}`,
                onSuccess: b[3] || (b[3] = (k) => s.value = !0)
              })) : r("application/pdf") ? (v(), j(Ua, {
                key: `pdf-${u.value.path}`,
                onSuccess: b[4] || (b[4] = (k) => s.value = !0)
              })) : (v(), j(Ea, {
                key: `default-${u.value.path}`,
                onSuccess: b[5] || (b[5] = (k) => s.value = !0)
              }))
            ])) : O("", !0),
            i("div", Qa, [
              s.value === !1 ? (v(), g("div", Xa, [
                b[9] || (b[9] = i("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  i("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  i("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                i("span", null, x(a(o)("Loading")), 1)
              ])) : O("", !0)
            ])
          ])
        ], 32),
        i("div", Ja, [
          i("div", null, [
            i("span", Za, x(a(o)("File Size")) + ": ", 1),
            de(x(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", er, x(a(o)("Last Modified")) + ": ", 1),
            de(" " + x(a(ja)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(t)("download") ? (v(), g("div", tr, [
          i("span", null, x(a(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), or = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600",
  viewBox: "0 0 24 24"
};
function sr(n, e) {
  return v(), g("svg", or, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const ir = { render: sr }, ar = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function rr(n, e) {
  return v(), g("svg", ar, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Je = { render: rr }, lr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function cr(n, e) {
  return v(), g("svg", lr, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Wt = { render: cr }, dr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ur(n, e) {
  return v(), g("svg", dr, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Gt = { render: ur }, fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function vr(n, e) {
  return v(), g("svg", fr, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const gn = { render: vr }, pr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function hr(n, e) {
  return v(), g("svg", pr, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const wn = { render: hr }, mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function _r(n, e) {
  return v(), g("svg", mr, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const yn = { render: _r }, gr = { class: "vuefinder__modal-tree__folder-item" }, wr = { class: "vuefinder__modal-tree__folder-content" }, yr = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, br = { class: "vuefinder__modal-tree__folder-text" }, kr = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, xr = 300, $r = /* @__PURE__ */ te({
  __name: "ModalTreeFolderItem",
  props: {
    folder: {},
    storage: {},
    modelValue: {},
    expandedFolders: {},
    modalTreeData: {},
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose", "toggleFolder"],
  setup(n, { emit: e }) {
    const t = se(), { t: o } = t.i18n, s = t.fs, l = n, c = e;
    J(s.path);
    const r = H(() => {
      const y = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[y] || !1;
    }), d = H(() => l.modelValue?.path === l.folder.path), u = H(() => l.currentPath?.path === l.folder.path), p = H(() => l.modalTreeData[l.folder.path] || []), m = H(() => p.value.length > 0 || l.folder.type === "dir"), f = () => {
      c("toggleFolder", l.storage, l.folder.path);
    }, _ = () => {
      c("update:modelValue", l.folder);
    }, S = () => {
      c("update:modelValue", l.folder), c("selectAndClose", l.folder);
    };
    let D = 0;
    const w = () => {
      const y = Date.now();
      y - D < xr ? S() : _(), D = y;
    };
    return (y, h) => {
      const b = eo("ModalTreeFolderItem", !0);
      return v(), g("div", gr, [
        i("div", wr, [
          m.value ? (v(), g("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            r.value ? (v(), j(a(Gt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (v(), j(a(Wt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (v(), g("div", yr)),
          i("div", {
            class: X(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": d.value,
              "vuefinder__modal-tree__folder-link--current": u.value
            }]),
            onClick: _,
            onDblclick: S,
            onTouchend: w
          }, [
            r.value ? (v(), j(a(yn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (v(), j(a(Je), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", br, x(n.folder.basename), 1)
          ], 34)
        ]),
        r.value && m.value ? (v(), g("div", kr, [
          (v(!0), g(re, null, _e(p.value, (k) => (v(), j(b, {
            key: k.path,
            folder: k,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": h[0] || (h[0] = (C) => y.$emit("update:modelValue", C)),
            onSelectAndClose: h[1] || (h[1] = (C) => y.$emit("selectAndClose", C)),
            onToggleFolder: h[2] || (h[2] = (C, V) => y.$emit("toggleFolder", C, V))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : O("", !0)
      ]);
    };
  }
}), Sr = { class: "vuefinder__modal-tree" }, Cr = { class: "vuefinder__modal-tree__header" }, Dr = { class: "vuefinder__modal-tree__title" }, Er = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Fr = { class: "vuefinder__modal-tree__section-title" }, Pr = { class: "vuefinder__modal-tree__list" }, Tr = ["onClick", "onDblclick", "onTouchend"], Ar = { class: "vuefinder__modal-tree__text" }, Mr = { class: "vuefinder__modal-tree__text-storage" }, Ir = { class: "vuefinder__modal-tree__section-title" }, Or = { class: "vuefinder__modal-tree__list" }, Br = { class: "vuefinder__modal-tree__storage-item" }, Rr = { class: "vuefinder__modal-tree__storage-content" }, Lr = ["onClick"], Vr = ["onClick", "onDblclick", "onTouchend"], zr = { class: "vuefinder__modal-tree__storage-text" }, Nr = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Vn = 300, bn = /* @__PURE__ */ te({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = se(), { t: o } = t.i18n, s = t.fs, l = t.config, c = e, r = J(s.sortedFiles), d = J(s.storages), u = H(() => d.value || []), p = J(s.path), m = T(null), f = T({}), _ = T({});
    ue(r, (R) => {
      const q = R.filter((F) => F.type === "dir"), B = p.value?.path || "";
      B && (_.value[B] = q.map((F) => ({
        ...F,
        type: "dir"
      })));
    });
    const S = (R, q) => {
      const B = `${R}:${q}`;
      f.value = {
        ...f.value,
        [B]: !f.value[B]
      }, f.value[B] && !_.value[q] && t.adapter.list(q).then((F) => {
        const Y = (F.files || []).filter((z) => z.type === "dir");
        _.value[q] = Y.map((z) => ({
          ...z,
          type: "dir"
        }));
      });
    }, D = (R) => _.value[R] || [], w = (R) => {
      R && c("update:modelValue", R);
    }, y = (R) => {
      R && (c("update:modelValue", R), c("selectAndClose", R));
    }, h = (R) => {
      const q = {
        storage: R,
        path: R + "://",
        basename: R,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: R + "://"
      };
      c("update:modelValue", q);
    }, b = (R) => {
      const q = {
        storage: R,
        path: R + "://",
        basename: R,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: R + "://"
      };
      c("update:modelValue", q), c("selectAndClose", q);
    };
    let k = 0;
    const C = (R) => {
      if (!R) return;
      const q = Date.now();
      q - k < Vn ? y(R) : w(R), k = q;
    }, V = (R) => {
      const q = Date.now();
      q - k < Vn ? b(R) : h(R), k = q;
    };
    return he(() => {
      m.value && Ut(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (R, q) => (v(), g("div", Sr, [
      i("div", Cr, [
        i("div", Dr, x(a(o)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: m,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (v(), g("div", Er, [
          i("div", Fr, x(a(o)("Pinned Folders")), 1),
          i("div", Pr, [
            (v(!0), g(re, null, _e(a(l).get("pinnedFolders"), (B) => (v(), g("div", {
              key: B.path,
              class: X(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === B.path }]),
              onClick: (F) => w(B),
              onDblclick: (F) => y(B),
              onTouchend: (F) => C(B)
            }, [
              L(a(Je), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Ar, x(B.basename), 1),
              i("div", Mr, x(B.storage), 1),
              L(a(gn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Tr))), 128))
          ])
        ])) : O("", !0),
        i("div", Ir, x(a(o)("Storages")), 1),
        (v(!0), g(re, null, _e(u.value, (B) => (v(), g("div", {
          key: B,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", Or, [
            i("div", Br, [
              i("div", Rr, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: pe((F) => S(B, B + "://"), ["stop"])
                }, [
                  f.value[`${B}:${B}://`] ? (v(), j(a(Gt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (v(), j(a(Wt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Lr),
                i("div", {
                  class: X(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === B + "://"
                  }]),
                  onClick: (F) => h(B),
                  onDblclick: (F) => b(B),
                  onTouchend: (F) => V(B)
                }, [
                  L(a(wn), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", zr, x(B), 1)
                ], 42, Vr)
              ]),
              f.value[`${B}:${B}://`] ? (v(), g("div", Nr, [
                (v(!0), g(re, null, _e(D(B + "://"), (F) => (v(), j($r, {
                  key: F.path,
                  folder: F,
                  storage: B,
                  "model-value": n.modelValue,
                  "expanded-folders": f.value,
                  "modal-tree-data": _.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": w,
                  onSelectAndClose: y,
                  onToggleFolder: S
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : O("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Hr = { class: "vuefinder__move-modal__content" }, Ur = { class: "vuefinder__move-modal__description" }, jr = { class: "vuefinder__move-modal__files vf-scrollbar" }, Kr = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qr = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wr = { class: "vuefinder__move-modal__file-name" }, Gr = { class: "vuefinder__move-modal__target-title" }, Yr = { class: "vuefinder__move-modal__target-container" }, Qr = { class: "vuefinder__move-modal__target-path" }, Xr = { class: "vuefinder__move-modal__target-storage" }, Jr = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, Zr = { class: "vuefinder__move-modal__target-badge" }, el = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, tl = { class: "vuefinder__move-modal__checkbox-label" }, nl = { class: "vuefinder__move-modal__checkbox-text" }, ol = { class: "vuefinder__move-modal__selected-items" }, _o = /* @__PURE__ */ te({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = se(), { enabled: t } = Ue(), { t: o } = e.i18n, s = n, l = T(e.modal.data.items.from), c = T(e.modal.data.items.to), r = T(""), d = T(s.copy || !t("move")), u = H(() => d.value ? "copy" : "move"), p = T(!1), m = J(e.fs.path), f = H(() => d.value ? o("Copy files") : o("Move files")), _ = H(
      () => d.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")
    ), S = H(() => d.value ? o("Yes, Copy!") : o("Yes, Move!"));
    H(() => d.value ? o("Files copied.") : o("Files moved."));
    const D = (b) => {
      b && (c.value = b);
    }, w = (b) => {
      b && (c.value = b, p.value = !1);
    }, y = () => {
      const b = c.value.path;
      if (!b) return { storage: "local", path: "" };
      if (b.endsWith("://"))
        return { storage: b.replace("://", ""), path: "" };
      const k = b.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, h = async () => {
      if (l.value.length) {
        const { files: b } = await e.adapter[u.value]({
          path: m.value.path,
          sources: l.value.map(({ path: k }) => k),
          destination: c.value.path
        });
        e.fs.setFiles(b), e.modal.close();
      }
    };
    return (b, k) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: h
        }, x(S.value), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[4] || (k[4] = (C) => a(e).modal.close())
        }, x(a(o)("Cancel")), 1),
        i("div", ol, x(a(o)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(ir),
            title: f.value
          }, null, 8, ["icon", "title"]),
          i("div", Hr, [
            i("p", Ur, x(_.value), 1),
            i("div", jr, [
              (v(!0), g(re, null, _e(l.value, (C) => (v(), g("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  C.type === "dir" ? (v(), g("svg", Kr, [...k[5] || (k[5] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), g("svg", qr, [...k[6] || (k[6] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                i("div", Wr, x(C.path), 1)
              ]))), 128))
            ]),
            i("h4", Gr, x(a(o)("Target Directory")), 1),
            i("div", Yr, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: k[0] || (k[0] = (C) => p.value = !p.value)
              }, [
                i("div", Qr, [
                  i("span", Xr, x(y().storage) + "://", 1),
                  y().path ? (v(), g("span", Jr, x(y().path), 1)) : O("", !0)
                ]),
                i("span", Zr, x(a(o)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: X([
                "vuefinder__move-modal__tree-selector",
                p.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              L(bn, {
                modelValue: c.value,
                "onUpdate:modelValue": [
                  k[1] || (k[1] = (C) => c.value = C),
                  D
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: w
              }, null, 8, ["modelValue"])
            ], 2),
            a(t)("copy") && a(t)("move") ? (v(), g("div", el, [
              i("label", tl, [
                be(i("input", {
                  "onUpdate:modelValue": k[2] || (k[2] = (C) => d.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [vn, d.value]
                ]),
                i("span", nl, x(a(o)("Create a copy instead of moving")), 1)
              ])
            ])) : O("", !0),
            r.value.length ? (v(), j(a(r), {
              key: 1,
              error: "",
              onHidden: k[3] || (k[3] = (C) => r.value = "")
            }, {
              default: oe(() => [
                de(x(r.value), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vt = /* @__PURE__ */ te({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (v(), j(_o, { copy: !1 }));
  }
}), kn = /* @__PURE__ */ te({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (v(), j(_o, { copy: !0 }));
  }
}), sl = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, go = (n, e, t) => {
  const o = T(n);
  return Yo((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: sl(
      (c) => {
        o.value = c, l();
      },
      e,
      !1
    )
  }));
}, il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function al(n, e) {
  return v(), g("svg", il, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const xn = { render: al }, rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ll(n, e) {
  return v(), g("svg", rl, [...e[0] || (e[0] = [
    i("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    i("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Yt = { render: ll }, cl = { class: "vuefinder__search-modal__search-input" }, dl = ["value", "placeholder", "disabled"], ul = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, fl = /* @__PURE__ */ te({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = se(), { t: l } = s.i18n, c = T(null), r = (u) => {
      const p = u.target;
      o("update:modelValue", p.value);
    }, d = (u) => {
      o("keydown", u);
    };
    return e({
      focus: () => {
        c.value && c.value.focus();
      }
    }), (u, p) => (v(), g("div", cl, [
      L(a(xn), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: c,
        value: n.modelValue,
        type: "text",
        placeholder: a(l)("Search Files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: d,
        onKeyup: p[0] || (p[0] = pe(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, dl),
      n.isSearching ? (v(), g("div", ul, [
        L(a(Yt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : O("", !0)
    ]));
  }
}), Mt = Math.min, ct = Math.max, It = Math.round, Et = Math.floor, We = (n) => ({
  x: n,
  y: n
}), vl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, pl = {
  start: "end",
  end: "start"
};
function zn(n, e, t) {
  return ct(n, Mt(e, t));
}
function Qt(n, e) {
  return typeof n == "function" ? n(e) : n;
}
function dt(n) {
  return n.split("-")[0];
}
function Xt(n) {
  return n.split("-")[1];
}
function wo(n) {
  return n === "x" ? "y" : "x";
}
function yo(n) {
  return n === "y" ? "height" : "width";
}
const hl = /* @__PURE__ */ new Set(["top", "bottom"]);
function ot(n) {
  return hl.has(dt(n)) ? "y" : "x";
}
function bo(n) {
  return wo(ot(n));
}
function ml(n, e, t) {
  t === void 0 && (t = !1);
  const o = Xt(n), s = bo(n), l = yo(s);
  let c = s === "x" ? o === (t ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[l] > e.floating[l] && (c = Ot(c)), [c, Ot(c)];
}
function _l(n) {
  const e = Ot(n);
  return [cn(n), e, cn(e)];
}
function cn(n) {
  return n.replace(/start|end/g, (e) => pl[e]);
}
const Nn = ["left", "right"], Hn = ["right", "left"], gl = ["top", "bottom"], wl = ["bottom", "top"];
function yl(n, e, t) {
  switch (n) {
    case "top":
    case "bottom":
      return t ? e ? Hn : Nn : e ? Nn : Hn;
    case "left":
    case "right":
      return e ? gl : wl;
    default:
      return [];
  }
}
function bl(n, e, t, o) {
  const s = Xt(n);
  let l = yl(dt(n), t === "start", o);
  return s && (l = l.map((c) => c + "-" + s), e && (l = l.concat(l.map(cn)))), l;
}
function Ot(n) {
  return n.replace(/left|right|bottom|top/g, (e) => vl[e]);
}
function kl(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function xl(n) {
  return typeof n != "number" ? kl(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function Bt(n) {
  const {
    x: e,
    y: t,
    width: o,
    height: s
  } = n;
  return {
    width: o,
    height: s,
    top: t,
    left: e,
    right: e + o,
    bottom: t + s,
    x: e,
    y: t
  };
}
function Un(n, e, t) {
  let {
    reference: o,
    floating: s
  } = n;
  const l = ot(e), c = bo(e), r = yo(c), d = dt(e), u = l === "y", p = o.x + o.width / 2 - s.width / 2, m = o.y + o.height / 2 - s.height / 2, f = o[r] / 2 - s[r] / 2;
  let _;
  switch (d) {
    case "top":
      _ = {
        x: p,
        y: o.y - s.height
      };
      break;
    case "bottom":
      _ = {
        x: p,
        y: o.y + o.height
      };
      break;
    case "right":
      _ = {
        x: o.x + o.width,
        y: m
      };
      break;
    case "left":
      _ = {
        x: o.x - s.width,
        y: m
      };
      break;
    default:
      _ = {
        x: o.x,
        y: o.y
      };
  }
  switch (Xt(e)) {
    case "start":
      _[c] -= f * (t && u ? -1 : 1);
      break;
    case "end":
      _[c] += f * (t && u ? -1 : 1);
      break;
  }
  return _;
}
const $l = async (n, e, t) => {
  const {
    placement: o = "bottom",
    strategy: s = "absolute",
    middleware: l = [],
    platform: c
  } = t, r = l.filter(Boolean), d = await (c.isRTL == null ? void 0 : c.isRTL(e));
  let u = await c.getElementRects({
    reference: n,
    floating: e,
    strategy: s
  }), {
    x: p,
    y: m
  } = Un(u, o, d), f = o, _ = {}, S = 0;
  for (let D = 0; D < r.length; D++) {
    const {
      name: w,
      fn: y
    } = r[D], {
      x: h,
      y: b,
      data: k,
      reset: C
    } = await y({
      x: p,
      y: m,
      initialPlacement: o,
      placement: f,
      strategy: s,
      middlewareData: _,
      rects: u,
      platform: c,
      elements: {
        reference: n,
        floating: e
      }
    });
    p = h ?? p, m = b ?? m, _ = {
      ..._,
      [w]: {
        ..._[w],
        ...k
      }
    }, C && S <= 50 && (S++, typeof C == "object" && (C.placement && (f = C.placement), C.rects && (u = C.rects === !0 ? await c.getElementRects({
      reference: n,
      floating: e,
      strategy: s
    }) : C.rects), {
      x: p,
      y: m
    } = Un(u, f, d)), D = -1);
  }
  return {
    x: p,
    y: m,
    placement: f,
    strategy: s,
    middlewareData: _
  };
};
async function ko(n, e) {
  var t;
  e === void 0 && (e = {});
  const {
    x: o,
    y: s,
    platform: l,
    rects: c,
    elements: r,
    strategy: d
  } = n, {
    boundary: u = "clippingAncestors",
    rootBoundary: p = "viewport",
    elementContext: m = "floating",
    altBoundary: f = !1,
    padding: _ = 0
  } = Qt(e, n), S = xl(_), w = r[f ? m === "floating" ? "reference" : "floating" : m], y = Bt(await l.getClippingRect({
    element: (t = await (l.isElement == null ? void 0 : l.isElement(w))) == null || t ? w : w.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(r.floating)),
    boundary: u,
    rootBoundary: p,
    strategy: d
  })), h = m === "floating" ? {
    x: o,
    y: s,
    width: c.floating.width,
    height: c.floating.height
  } : c.reference, b = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(r.floating)), k = await (l.isElement == null ? void 0 : l.isElement(b)) ? await (l.getScale == null ? void 0 : l.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = Bt(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: r,
    rect: h,
    offsetParent: b,
    strategy: d
  }) : h);
  return {
    top: (y.top - C.top + S.top) / k.y,
    bottom: (C.bottom - y.bottom + S.bottom) / k.y,
    left: (y.left - C.left + S.left) / k.x,
    right: (C.right - y.right + S.right) / k.x
  };
}
const Sl = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(e) {
      var t, o;
      const {
        placement: s,
        middlewareData: l,
        rects: c,
        initialPlacement: r,
        platform: d,
        elements: u
      } = e, {
        mainAxis: p = !0,
        crossAxis: m = !0,
        fallbackPlacements: f,
        fallbackStrategy: _ = "bestFit",
        fallbackAxisSideDirection: S = "none",
        flipAlignment: D = !0,
        ...w
      } = Qt(n, e);
      if ((t = l.arrow) != null && t.alignmentOffset)
        return {};
      const y = dt(s), h = ot(r), b = dt(r) === r, k = await (d.isRTL == null ? void 0 : d.isRTL(u.floating)), C = f || (b || !D ? [Ot(r)] : _l(r)), V = S !== "none";
      !f && V && C.push(...bl(r, D, S, k));
      const R = [r, ...C], q = await ko(e, w), B = [];
      let F = ((o = l.flip) == null ? void 0 : o.overflows) || [];
      if (p && B.push(q[y]), m) {
        const Z = ml(s, c, k);
        B.push(q[Z[0]], q[Z[1]]);
      }
      if (F = [...F, {
        placement: s,
        overflows: B
      }], !B.every((Z) => Z <= 0)) {
        var K, Y;
        const Z = (((K = l.flip) == null ? void 0 : K.index) || 0) + 1, le = R[Z];
        if (le && (!(m === "alignment" ? h !== ot(le) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        F.every(($) => ot($.placement) === h ? $.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Z,
              overflows: F
            },
            reset: {
              placement: le
            }
          };
        let Q = (Y = F.filter((E) => E.overflows[0] <= 0).sort((E, $) => E.overflows[1] - $.overflows[1])[0]) == null ? void 0 : Y.placement;
        if (!Q)
          switch (_) {
            case "bestFit": {
              var z;
              const E = (z = F.filter(($) => {
                if (V) {
                  const P = ot($.placement);
                  return P === h || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map(($) => [$.placement, $.overflows.filter((P) => P > 0).reduce((P, M) => P + M, 0)]).sort(($, P) => $[1] - P[1])[0]) == null ? void 0 : z[0];
              E && (Q = E);
              break;
            }
            case "initialPlacement":
              Q = r;
              break;
          }
        if (s !== Q)
          return {
            reset: {
              placement: Q
            }
          };
      }
      return {};
    }
  };
}, Cl = /* @__PURE__ */ new Set(["left", "top"]);
async function Dl(n, e) {
  const {
    placement: t,
    platform: o,
    elements: s
  } = n, l = await (o.isRTL == null ? void 0 : o.isRTL(s.floating)), c = dt(t), r = Xt(t), d = ot(t) === "y", u = Cl.has(c) ? -1 : 1, p = l && d ? -1 : 1, m = Qt(e, n);
  let {
    mainAxis: f,
    crossAxis: _,
    alignmentAxis: S
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return r && typeof S == "number" && (_ = r === "end" ? S * -1 : S), d ? {
    x: _ * p,
    y: f * u
  } : {
    x: f * u,
    y: _ * p
  };
}
const El = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(e) {
      var t, o;
      const {
        x: s,
        y: l,
        placement: c,
        middlewareData: r
      } = e, d = await Dl(e, n);
      return c === ((t = r.offset) == null ? void 0 : t.placement) && (o = r.arrow) != null && o.alignmentOffset ? {} : {
        x: s + d.x,
        y: l + d.y,
        data: {
          ...d,
          placement: c
        }
      };
    }
  };
}, Fl = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(e) {
      const {
        x: t,
        y: o,
        placement: s
      } = e, {
        mainAxis: l = !0,
        crossAxis: c = !1,
        limiter: r = {
          fn: (w) => {
            let {
              x: y,
              y: h
            } = w;
            return {
              x: y,
              y: h
            };
          }
        },
        ...d
      } = Qt(n, e), u = {
        x: t,
        y: o
      }, p = await ko(e, d), m = ot(dt(s)), f = wo(m);
      let _ = u[f], S = u[m];
      if (l) {
        const w = f === "y" ? "top" : "left", y = f === "y" ? "bottom" : "right", h = _ + p[w], b = _ - p[y];
        _ = zn(h, _, b);
      }
      if (c) {
        const w = m === "y" ? "top" : "left", y = m === "y" ? "bottom" : "right", h = S + p[w], b = S - p[y];
        S = zn(h, S, b);
      }
      const D = r.fn({
        ...e,
        [f]: _,
        [m]: S
      });
      return {
        ...D,
        data: {
          x: D.x - t,
          y: D.y - o,
          enabled: {
            [f]: l,
            [m]: c
          }
        }
      };
    }
  };
};
function Jt() {
  return typeof window < "u";
}
function ht(n) {
  return xo(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Ie(n) {
  var e;
  return (n == null || (e = n.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Ye(n) {
  var e;
  return (e = (xo(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : e.documentElement;
}
function xo(n) {
  return Jt() ? n instanceof Node || n instanceof Ie(n).Node : !1;
}
function Ne(n) {
  return Jt() ? n instanceof Element || n instanceof Ie(n).Element : !1;
}
function Ge(n) {
  return Jt() ? n instanceof HTMLElement || n instanceof Ie(n).HTMLElement : !1;
}
function jn(n) {
  return !Jt() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof Ie(n).ShadowRoot;
}
const Pl = /* @__PURE__ */ new Set(["inline", "contents"]);
function St(n) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: o,
    display: s
  } = He(n);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + t) && !Pl.has(s);
}
const Tl = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Al(n) {
  return Tl.has(ht(n));
}
const Ml = [":popover-open", ":modal"];
function Zt(n) {
  return Ml.some((e) => {
    try {
      return n.matches(e);
    } catch {
      return !1;
    }
  });
}
const Il = ["transform", "translate", "scale", "rotate", "perspective"], Ol = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Bl = ["paint", "layout", "strict", "content"];
function $n(n) {
  const e = Sn(), t = Ne(n) ? He(n) : n;
  return Il.some((o) => t[o] ? t[o] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !e && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !e && (t.filter ? t.filter !== "none" : !1) || Ol.some((o) => (t.willChange || "").includes(o)) || Bl.some((o) => (t.contain || "").includes(o));
}
function Rl(n) {
  let e = it(n);
  for (; Ge(e) && !pt(e); ) {
    if ($n(e))
      return e;
    if (Zt(e))
      return null;
    e = it(e);
  }
  return null;
}
function Sn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Ll = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function pt(n) {
  return Ll.has(ht(n));
}
function He(n) {
  return Ie(n).getComputedStyle(n);
}
function en(n) {
  return Ne(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function it(n) {
  if (ht(n) === "html")
    return n;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    jn(n) && n.host || // Fallback.
    Ye(n)
  );
  return jn(e) ? e.host : e;
}
function $o(n) {
  const e = it(n);
  return pt(e) ? n.ownerDocument ? n.ownerDocument.body : n.body : Ge(e) && St(e) ? e : $o(e);
}
function yt(n, e, t) {
  var o;
  e === void 0 && (e = []), t === void 0 && (t = !0);
  const s = $o(n), l = s === ((o = n.ownerDocument) == null ? void 0 : o.body), c = Ie(s);
  if (l) {
    const r = dn(c);
    return e.concat(c, c.visualViewport || [], St(s) ? s : [], r && t ? yt(r) : []);
  }
  return e.concat(s, yt(s, [], t));
}
function dn(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function So(n) {
  const e = He(n);
  let t = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const s = Ge(n), l = s ? n.offsetWidth : t, c = s ? n.offsetHeight : o, r = It(t) !== l || It(o) !== c;
  return r && (t = l, o = c), {
    width: t,
    height: o,
    $: r
  };
}
function Cn(n) {
  return Ne(n) ? n : n.contextElement;
}
function ft(n) {
  const e = Cn(n);
  if (!Ge(e))
    return We(1);
  const t = e.getBoundingClientRect(), {
    width: o,
    height: s,
    $: l
  } = So(e);
  let c = (l ? It(t.width) : t.width) / o, r = (l ? It(t.height) : t.height) / s;
  return (!c || !Number.isFinite(c)) && (c = 1), (!r || !Number.isFinite(r)) && (r = 1), {
    x: c,
    y: r
  };
}
const Vl = /* @__PURE__ */ We(0);
function Co(n) {
  const e = Ie(n);
  return !Sn() || !e.visualViewport ? Vl : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function zl(n, e, t) {
  return e === void 0 && (e = !1), !t || e && t !== Ie(n) ? !1 : e;
}
function ut(n, e, t, o) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const s = n.getBoundingClientRect(), l = Cn(n);
  let c = We(1);
  e && (o ? Ne(o) && (c = ft(o)) : c = ft(n));
  const r = zl(l, t, o) ? Co(l) : We(0);
  let d = (s.left + r.x) / c.x, u = (s.top + r.y) / c.y, p = s.width / c.x, m = s.height / c.y;
  if (l) {
    const f = Ie(l), _ = o && Ne(o) ? Ie(o) : o;
    let S = f, D = dn(S);
    for (; D && o && _ !== S; ) {
      const w = ft(D), y = D.getBoundingClientRect(), h = He(D), b = y.left + (D.clientLeft + parseFloat(h.paddingLeft)) * w.x, k = y.top + (D.clientTop + parseFloat(h.paddingTop)) * w.y;
      d *= w.x, u *= w.y, p *= w.x, m *= w.y, d += b, u += k, S = Ie(D), D = dn(S);
    }
  }
  return Bt({
    width: p,
    height: m,
    x: d,
    y: u
  });
}
function tn(n, e) {
  const t = en(n).scrollLeft;
  return e ? e.left + t : ut(Ye(n)).left + t;
}
function Do(n, e) {
  const t = n.getBoundingClientRect(), o = t.left + e.scrollLeft - tn(n, t), s = t.top + e.scrollTop;
  return {
    x: o,
    y: s
  };
}
function Nl(n) {
  let {
    elements: e,
    rect: t,
    offsetParent: o,
    strategy: s
  } = n;
  const l = s === "fixed", c = Ye(o), r = e ? Zt(e.floating) : !1;
  if (o === c || r && l)
    return t;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = We(1);
  const p = We(0), m = Ge(o);
  if ((m || !m && !l) && ((ht(o) !== "body" || St(c)) && (d = en(o)), Ge(o))) {
    const _ = ut(o);
    u = ft(o), p.x = _.x + o.clientLeft, p.y = _.y + o.clientTop;
  }
  const f = c && !m && !l ? Do(c, d) : We(0);
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - d.scrollLeft * u.x + p.x + f.x,
    y: t.y * u.y - d.scrollTop * u.y + p.y + f.y
  };
}
function Hl(n) {
  return Array.from(n.getClientRects());
}
function Ul(n) {
  const e = Ye(n), t = en(n), o = n.ownerDocument.body, s = ct(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), l = ct(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let c = -t.scrollLeft + tn(n);
  const r = -t.scrollTop;
  return He(o).direction === "rtl" && (c += ct(e.clientWidth, o.clientWidth) - s), {
    width: s,
    height: l,
    x: c,
    y: r
  };
}
const Kn = 25;
function jl(n, e) {
  const t = Ie(n), o = Ye(n), s = t.visualViewport;
  let l = o.clientWidth, c = o.clientHeight, r = 0, d = 0;
  if (s) {
    l = s.width, c = s.height;
    const p = Sn();
    (!p || p && e === "fixed") && (r = s.offsetLeft, d = s.offsetTop);
  }
  const u = tn(o);
  if (u <= 0) {
    const p = o.ownerDocument, m = p.body, f = getComputedStyle(m), _ = p.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, S = Math.abs(o.clientWidth - m.clientWidth - _);
    S <= Kn && (l -= S);
  } else u <= Kn && (l += u);
  return {
    width: l,
    height: c,
    x: r,
    y: d
  };
}
const Kl = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ql(n, e) {
  const t = ut(n, !0, e === "fixed"), o = t.top + n.clientTop, s = t.left + n.clientLeft, l = Ge(n) ? ft(n) : We(1), c = n.clientWidth * l.x, r = n.clientHeight * l.y, d = s * l.x, u = o * l.y;
  return {
    width: c,
    height: r,
    x: d,
    y: u
  };
}
function qn(n, e, t) {
  let o;
  if (e === "viewport")
    o = jl(n, t);
  else if (e === "document")
    o = Ul(Ye(n));
  else if (Ne(e))
    o = ql(e, t);
  else {
    const s = Co(n);
    o = {
      x: e.x - s.x,
      y: e.y - s.y,
      width: e.width,
      height: e.height
    };
  }
  return Bt(o);
}
function Eo(n, e) {
  const t = it(n);
  return t === e || !Ne(t) || pt(t) ? !1 : He(t).position === "fixed" || Eo(t, e);
}
function Wl(n, e) {
  const t = e.get(n);
  if (t)
    return t;
  let o = yt(n, [], !1).filter((r) => Ne(r) && ht(r) !== "body"), s = null;
  const l = He(n).position === "fixed";
  let c = l ? it(n) : n;
  for (; Ne(c) && !pt(c); ) {
    const r = He(c), d = $n(c);
    !d && r.position === "fixed" && (s = null), (l ? !d && !s : !d && r.position === "static" && !!s && Kl.has(s.position) || St(c) && !d && Eo(n, c)) ? o = o.filter((p) => p !== c) : s = r, c = it(c);
  }
  return e.set(n, o), o;
}
function Gl(n) {
  let {
    element: e,
    boundary: t,
    rootBoundary: o,
    strategy: s
  } = n;
  const c = [...t === "clippingAncestors" ? Zt(e) ? [] : Wl(e, this._c) : [].concat(t), o], r = c[0], d = c.reduce((u, p) => {
    const m = qn(e, p, s);
    return u.top = ct(m.top, u.top), u.right = Mt(m.right, u.right), u.bottom = Mt(m.bottom, u.bottom), u.left = ct(m.left, u.left), u;
  }, qn(e, r, s));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
function Yl(n) {
  const {
    width: e,
    height: t
  } = So(n);
  return {
    width: e,
    height: t
  };
}
function Ql(n, e, t) {
  const o = Ge(e), s = Ye(e), l = t === "fixed", c = ut(n, !0, l, e);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = We(0);
  function u() {
    d.x = tn(s);
  }
  if (o || !o && !l)
    if ((ht(e) !== "body" || St(s)) && (r = en(e)), o) {
      const _ = ut(e, !0, l, e);
      d.x = _.x + e.clientLeft, d.y = _.y + e.clientTop;
    } else s && u();
  l && !o && s && u();
  const p = s && !o && !l ? Do(s, r) : We(0), m = c.left + r.scrollLeft - d.x - p.x, f = c.top + r.scrollTop - d.y - p.y;
  return {
    x: m,
    y: f,
    width: c.width,
    height: c.height
  };
}
function on(n) {
  return He(n).position === "static";
}
function Wn(n, e) {
  if (!Ge(n) || He(n).position === "fixed")
    return null;
  if (e)
    return e(n);
  let t = n.offsetParent;
  return Ye(n) === t && (t = t.ownerDocument.body), t;
}
function Fo(n, e) {
  const t = Ie(n);
  if (Zt(n))
    return t;
  if (!Ge(n)) {
    let s = it(n);
    for (; s && !pt(s); ) {
      if (Ne(s) && !on(s))
        return s;
      s = it(s);
    }
    return t;
  }
  let o = Wn(n, e);
  for (; o && Al(o) && on(o); )
    o = Wn(o, e);
  return o && pt(o) && on(o) && !$n(o) ? t : o || Rl(n) || t;
}
const Xl = async function(n) {
  const e = this.getOffsetParent || Fo, t = this.getDimensions, o = await t(n.floating);
  return {
    reference: Ql(n.reference, await e(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Jl(n) {
  return He(n).direction === "rtl";
}
const Zl = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Nl,
  getDocumentElement: Ye,
  getClippingRect: Gl,
  getOffsetParent: Fo,
  getElementRects: Xl,
  getClientRects: Hl,
  getDimensions: Yl,
  getScale: ft,
  isElement: Ne,
  isRTL: Jl
};
function Po(n, e) {
  return n.x === e.x && n.y === e.y && n.width === e.width && n.height === e.height;
}
function ec(n, e) {
  let t = null, o;
  const s = Ye(n);
  function l() {
    var r;
    clearTimeout(o), (r = t) == null || r.disconnect(), t = null;
  }
  function c(r, d) {
    r === void 0 && (r = !1), d === void 0 && (d = 1), l();
    const u = n.getBoundingClientRect(), {
      left: p,
      top: m,
      width: f,
      height: _
    } = u;
    if (r || e(), !f || !_)
      return;
    const S = Et(m), D = Et(s.clientWidth - (p + f)), w = Et(s.clientHeight - (m + _)), y = Et(p), b = {
      rootMargin: -S + "px " + -D + "px " + -w + "px " + -y + "px",
      threshold: ct(0, Mt(1, d)) || 1
    };
    let k = !0;
    function C(V) {
      const R = V[0].intersectionRatio;
      if (R !== d) {
        if (!k)
          return c();
        R ? c(!1, R) : o = setTimeout(() => {
          c(!1, 1e-7);
        }, 1e3);
      }
      R === 1 && !Po(u, n.getBoundingClientRect()) && c(), k = !1;
    }
    try {
      t = new IntersectionObserver(C, {
        ...b,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(C, b);
    }
    t.observe(n);
  }
  return c(!0), l;
}
function To(n, e, t, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: l = !0,
    elementResize: c = typeof ResizeObserver == "function",
    layoutShift: r = typeof IntersectionObserver == "function",
    animationFrame: d = !1
  } = o, u = Cn(n), p = s || l ? [...u ? yt(u) : [], ...yt(e)] : [];
  p.forEach((y) => {
    s && y.addEventListener("scroll", t, {
      passive: !0
    }), l && y.addEventListener("resize", t);
  });
  const m = u && r ? ec(u, t) : null;
  let f = -1, _ = null;
  c && (_ = new ResizeObserver((y) => {
    let [h] = y;
    h && h.target === u && _ && (_.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var b;
      (b = _) == null || b.observe(e);
    })), t();
  }), u && !d && _.observe(u), _.observe(e));
  let S, D = d ? ut(n) : null;
  d && w();
  function w() {
    const y = ut(n);
    D && !Po(D, y) && t(), D = y, S = requestAnimationFrame(w);
  }
  return t(), () => {
    var y;
    p.forEach((h) => {
      s && h.removeEventListener("scroll", t), l && h.removeEventListener("resize", t);
    }), m?.(), (y = _) == null || y.disconnect(), _ = null, d && cancelAnimationFrame(S);
  };
}
const Rt = El, Lt = Fl, Vt = Sl, zt = (n, e, t) => {
  const o = /* @__PURE__ */ new Map(), s = {
    platform: Zl,
    ...t
  }, l = {
    ...s.platform,
    _c: o
  };
  return $l(n, e, {
    ...s,
    platform: l
  });
}, tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function nc(n, e) {
  return v(), g("svg", tc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const Ao = { render: nc }, oc = ["disabled", "title"], sc = ["data-theme"], ic = { class: "vuefinder__search-modal__dropdown-content" }, ac = { class: "vuefinder__search-modal__dropdown-section" }, rc = { class: "vuefinder__search-modal__dropdown-title" }, lc = { class: "vuefinder__search-modal__dropdown-options" }, cc = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, dc = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, uc = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, fc = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, vc = /* @__PURE__ */ te({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = se(), { t: c } = l.i18n, r = T(null), d = T(null);
    let u = null;
    const p = (D) => {
      if (s("update:selectedOption", D), D.startsWith("size-")) {
        const w = D.split("-")[1];
        s("update:sizeFilter", w);
      }
    }, m = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), u && (u(), u = null)) : (s("update:visible", !0), await Oe(), await f()));
    }, f = async () => {
      if (!(!r.value || !d.value) && (await Oe(), !(!r.value || !d.value))) {
        Object.assign(d.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: D, y: w } = await zt(r.value, d.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [Rt(8), Vt({ padding: 16 }), Lt({ padding: 16 })]
          });
          Object.assign(d.value.style, {
            left: `${D}px`,
            top: `${w}px`
          }), requestAnimationFrame(() => {
            d.value && Object.assign(d.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (D) {
          console.warn("Floating UI initial positioning error:", D);
          return;
        }
        try {
          u = To(r.value, d.value, async () => {
            if (!(!r.value || !d.value))
              try {
                const { x: D, y: w } = await zt(
                  r.value,
                  d.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [Rt(8), Vt({ padding: 16 }), Lt({ padding: 16 })]
                  }
                );
                Object.assign(d.value.style, {
                  left: `${D}px`,
                  top: `${w}px`
                });
              } catch (D) {
                console.warn("Floating UI positioning error:", D);
              }
          });
        } catch (D) {
          console.warn("Floating UI autoUpdate setup error:", D), u = null;
        }
      }
    }, _ = (D) => {
      if (!o.visible) return;
      const w = ["size-all", "size-small", "size-medium", "size-large"], y = w.findIndex((h) => h === o.selectedOption);
      if (D.key === "ArrowDown") {
        D.preventDefault();
        const h = (y + 1) % w.length;
        s("update:selectedOption", w[h] || null);
      } else if (D.key === "ArrowUp") {
        D.preventDefault();
        const h = y <= 0 ? w.length - 1 : y - 1;
        s("update:selectedOption", w[h] || null);
      } else D.key === "Enter" ? (D.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : D.key === "Escape" && (D.preventDefault(), s("update:visible", !1), u && (u(), u = null));
    }, S = () => {
      u && (u(), u = null);
    };
    return ue(
      () => o.visible,
      (D) => {
        !D && u && (u(), u = null);
      }
    ), Ae(() => {
      S();
    }), e({
      cleanup: S
    }), (D, w) => (v(), g(re, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: X(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(c)("Search Options"),
        onClick: pe(m, ["stop"])
      }, [
        L(a(Ao), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, oc),
      (v(), j(Ht, { to: "body" }, [
        n.visible ? (v(), g("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: d,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: w[4] || (w[4] = pe(() => {
          }, ["stop"])),
          onKeydown: _
        }, [
          i("div", ic, [
            i("div", ac, [
              i("div", rc, x(a(c)("File Size")), 1),
              i("div", lc, [
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: w[0] || (w[0] = pe((y) => p("size-all"), ["stop"]))
                }, [
                  i("span", null, x(a(c)("All Files")), 1),
                  n.sizeFilter === "all" ? (v(), g("div", cc, [...w[5] || (w[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: w[1] || (w[1] = pe((y) => p("size-small"), ["stop"]))
                }, [
                  i("span", null, x(a(c)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (v(), g("div", dc, [...w[6] || (w[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: w[2] || (w[2] = pe((y) => p("size-medium"), ["stop"]))
                }, [
                  i("span", null, x(a(c)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (v(), g("div", uc, [...w[7] || (w[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: w[3] || (w[3] = pe((y) => p("size-large"), ["stop"]))
                }, [
                  i("span", null, x(a(c)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (v(), g("div", fc, [...w[8] || (w[8] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, sc)) : O("", !0)
      ]))
    ], 64));
  }
});
function pc(n) {
  const [e, t] = hc(n);
  if (!t || t === "/") return e + "://";
  const o = t.replace(/\/+$/, ""), s = o.lastIndexOf("/");
  return s === 0 ? e + "://" : e + ":/" + o.slice(0, s);
}
function hc(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function Mo(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), c = l.pop();
  if (!c) return o + s;
  let r = `${o}${l.join("/")}${l.length ? "/" : ""}${c}`;
  if (r.length <= e) return r;
  const d = c.split(/\.(?=[^\.]+$)/), u = d[0] ?? "", p = d[1] ?? "", m = u.length > 10 ? `${u.slice(0, 6)}...${u.slice(-5)}` : u, f = p ? `${m}.${p}` : m;
  return r = `${o}${l.join("/")}${l.length ? "/" : ""}${f}`, r.length > e && (r = `${o}.../${f}`), r;
}
async function Io(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function bt(n) {
  await Io(n);
}
async function mc(n) {
  await Io(n);
}
const _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function gc(n, e) {
  return v(), g("svg", _c, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Oo = { render: gc }, wc = ["title"], yc = { class: "vuefinder__search-modal__result-icon" }, bc = { class: "vuefinder__search-modal__result-content" }, kc = { class: "vuefinder__search-modal__result-name" }, xc = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, $c = ["title"], Sc = ["title"], Cc = ["data-item-dropdown", "data-theme"], Dc = { class: "vuefinder__search-modal__item-dropdown-content" }, Ec = /* @__PURE__ */ te({
  name: "SearchResultItem",
  __name: "SearchResultItem",
  props: {
    item: {},
    index: {},
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {}
  },
  emits: ["select", "selectWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = se(), { t: l } = s.i18n, c = T(null);
    let r = null;
    ue(
      () => t.activeDropdown,
      (y) => {
        r && (r(), r = null), y === t.item.path && c.value && Oe(() => {
          m(t.item.path, c.value);
        });
      }
    ), Ae(() => {
      r && (r(), r = null);
    });
    const d = (y) => t.expandedPaths.has(y), u = (y) => y.type === "dir" || !y.file_size ? "" : hn(y.file_size), p = (y, h) => {
      h.stopPropagation(), o("toggleItemDropdown", y, h);
    }, m = async (y, h) => {
      const b = document.querySelector(
        `[data-item-dropdown="${y}"]`
      );
      if (!(!b || !h) && (await Oe(), !(!b || !h))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: k, y: C } = await zt(h, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [Rt(8), Vt({ padding: 16 }), Lt({ padding: 16 })]
          });
          Object.assign(b.style, {
            left: `${k}px`,
            top: `${C}px`
          }), requestAnimationFrame(() => {
            b && Object.assign(b.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (k) {
          console.warn("Floating UI initial positioning error:", k);
          return;
        }
        try {
          r = To(h, b, async () => {
            if (!(!h || !b))
              try {
                const { x: k, y: C } = await zt(h, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [Rt(8), Vt({ padding: 16 }), Lt({ padding: 16 })]
                });
                Object.assign(b.style, {
                  left: `${k}px`,
                  top: `${C}px`
                });
              } catch (k) {
                console.warn("Floating UI positioning error:", k);
              }
          });
        } catch (k) {
          console.warn("Floating UI autoUpdate setup error:", k), r = null;
        }
      }
    }, f = (y) => {
      o("update:selectedItemDropdownOption", y);
    }, _ = async (y) => {
      await bt(y.path), o("copyPath", y);
    }, S = (y) => {
      o("openContainingFolder", y);
    }, D = (y) => {
      o("preview", y);
    }, w = (y) => {
      if (!t.activeDropdown) return;
      const h = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, k = h.findIndex((C) => b?.includes(C));
      if (y.key === "ArrowDown") {
        y.preventDefault();
        const C = (k + 1) % h.length;
        o(
          "update:selectedItemDropdownOption",
          `${h[C] || ""}-${t.activeDropdown}`
        );
      } else if (y.key === "ArrowUp") {
        y.preventDefault();
        const C = k <= 0 ? h.length - 1 : k - 1;
        o(
          "update:selectedItemDropdownOption",
          `${h[C] || ""}-${t.activeDropdown}`
        );
      } else y.key === "Enter" ? (y.preventDefault(), b && (b.includes("copy-path") ? _(t.item) : b.includes("open-folder") ? S(t.item) : b.includes("preview") && D(t.item))) : y.key === "Escape" && (y.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (y, h) => (v(), g("div", {
      class: X(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: h[9] || (h[9] = (b) => o("select", n.index))
    }, [
      i("div", yc, [
        n.item.type === "dir" ? (v(), j(a(Je), { key: 0 })) : (v(), j(a(At), { key: 1 }))
      ]),
      i("div", bc, [
        i("div", kc, [
          de(x(n.item.basename) + " ", 1),
          u(n.item) ? (v(), g("span", xc, x(u(n.item)), 1)) : O("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: h[0] || (h[0] = pe((b) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, x(d(n.item.path) ? n.item.path : a(Mo)(n.item.path)), 9, $c)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: c,
        class: "vuefinder__search-modal__result-actions",
        title: a(l)("More actions"),
        onClick: h[1] || (h[1] = (b) => {
          o("selectWithDropdown", n.index), p(n.item.path, b);
        })
      }, [
        L(a(Oo), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Sc),
      (v(), j(Ht, { to: "body" }, [
        n.activeDropdown === n.item.path ? (v(), g("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(s).theme.current,
          tabindex: "-1",
          onClick: h[8] || (h[8] = pe(() => {
          }, ["stop"])),
          onKeydown: w
        }, [
          i("div", Dc, [
            i("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: h[2] || (h[2] = (b) => {
                f(`copy-path-${n.item.path}`), _(n.item);
              }),
              onFocus: h[3] || (h[3] = (b) => f(`copy-path-${n.item.path}`))
            }, [
              h[10] || (h[10] = i("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                i("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                i("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              i("span", null, x(a(l)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: h[4] || (h[4] = (b) => {
                f(`open-folder-${n.item.path}`), S(n.item);
              }),
              onFocus: h[5] || (h[5] = (b) => f(`open-folder-${n.item.path}`))
            }, [
              L(a(Je), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, x(a(l)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: h[6] || (h[6] = (b) => {
                f(`preview-${n.item.path}`), D(n.item);
              }),
              onFocus: h[7] || (h[7] = (b) => f(`preview-${n.item.path}`))
            }, [
              L(a(At), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, x(a(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, Cc)) : O("", !0)
      ]))
    ], 10, wc));
  }
}), Fc = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Pc = { class: "vuefinder__search-modal__loading-icon" }, Tc = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Ac = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Mc = { class: "vuefinder__search-modal__results-header" }, rt = 60, Gn = 5, Ic = /* @__PURE__ */ te({
  name: "SearchResultsList",
  __name: "SearchResultsList",
  props: {
    searchResults: {},
    isSearching: { type: Boolean },
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {},
    resultsEnter: { type: Boolean }
  },
  emits: ["selectResultItem", "selectResultItemWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = se(), { t: c } = l.i18n, r = tt("scrollableContainer"), d = H(() => o.searchResults.length > 0), u = H(() => o.searchResults.length), p = T(0), m = T(600), f = H(() => o.searchResults.length * rt), _ = H(() => {
      const b = Math.max(0, Math.floor(p.value / rt) - Gn), k = Math.min(
        o.searchResults.length,
        Math.ceil((p.value + m.value) / rt) + Gn
      );
      return { start: b, end: k };
    }), S = H(() => {
      const { start: b, end: k } = _.value;
      return o.searchResults.slice(b, k).map((C, V) => ({
        item: C,
        index: b + V,
        top: (b + V) * rt
      }));
    }), D = (b) => {
      const k = b.target;
      p.value = k.scrollTop;
    }, w = () => {
      r.value && (m.value = r.value.clientHeight);
    }, y = () => {
      if (o.selectedIndex >= 0 && r.value) {
        const b = o.selectedIndex * rt, k = b + rt, C = r.value.scrollTop, V = r.value.clientHeight, R = C + V;
        let q = C;
        b < C ? q = b : k > R && (q = k - V), q !== C && r.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, h = () => {
      r.value && (r.value.scrollTop = 0, p.value = 0);
    };
    return he(() => {
      w(), window.addEventListener("resize", w);
    }), Ae(() => {
      window.removeEventListener("resize", w);
    }), ue(
      () => r.value,
      () => {
        w();
      }
    ), e({
      scrollSelectedIntoView: y,
      resetScroll: h,
      getContainerHeight: () => m.value,
      scrollTop: () => p.value
    }), (b, k) => (v(), g("div", {
      class: X(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (v(), g("div", Fc, [
        i("div", Pc, [
          L(a(Yt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, x(a(c)("Searching...")), 1)
      ])) : d.value ? (v(), g("div", Ac, [
        i("div", Mc, [
          i("span", null, x(a(c)("Found %s results", u.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: D
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Me({ height: `${f.value}px`, position: "relative" })
          }, [
            (v(!0), g(re, null, _e(S.value, (C) => (v(), g("div", {
              key: C.item.path,
              style: Me({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${rt}px`
              })
            }, [
              L(Ec, {
                item: C.item,
                index: C.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: k[0] || (k[0] = (V) => s("selectResultItem", V)),
                onSelectWithDropdown: k[1] || (k[1] = (V) => s("selectResultItemWithDropdown", V)),
                onTogglePathExpansion: k[2] || (k[2] = (V) => s("togglePathExpansion", V)),
                onToggleItemDropdown: k[3] || (k[3] = (V, R) => s("toggleItemDropdown", V, R)),
                "onUpdate:selectedItemDropdownOption": k[4] || (k[4] = (V) => s("update:selectedItemDropdownOption", V)),
                onCopyPath: k[5] || (k[5] = (V) => s("copyPath", V)),
                onOpenContainingFolder: k[6] || (k[6] = (V) => s("openContainingFolder", V)),
                onPreview: k[7] || (k[7] = (V) => s("preview", V))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (v(), g("div", Tc, [
        i("span", null, x(a(c)("No results found")), 1)
      ]))
    ], 2));
  }
}), Oc = { class: "vuefinder__search-modal" }, Bc = { class: "vuefinder__search-modal__content" }, Rc = { class: "vuefinder__search-modal__search-bar" }, Lc = { class: "vuefinder__search-modal__search-location" }, Vc = ["title"], zc = ["disabled"], Nc = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Hc = { class: "vuefinder__search-modal__folder-selector-content" }, Uc = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, jc = { class: "vuefinder__search-modal__instructions-text" }, Dn = /* @__PURE__ */ te({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = T(null), l = T(null), c = T(null), r = go("", 300), d = T([]), u = T(!1), p = T(-1), m = T(!1), f = T(!1), _ = T(null), S = T("all"), D = T(!1), w = T(`size-${S.value}`), y = T(null), h = T(/* @__PURE__ */ new Set()), b = T(null), k = J(o.path), C = ($) => {
      h.value.has($) ? h.value.delete($) : h.value.add($);
    }, V = ($, P) => {
      P && typeof P.stopPropagation == "function" && P.stopPropagation(), b.value === $ ? b.value = null : b.value = $;
    }, R = () => {
      b.value = null;
    }, q = ($) => {
      try {
        const P = $.dir || `${$.storage}://`;
        e.adapter.open(P), e.modal.close(), R();
      } catch {
        fe.error(t("Failed to open containing folder"));
      }
    }, B = ($) => {
      e.modal.open(qt, {
        storage: k?.value?.storage ?? "local",
        item: $
      }), R();
    }, F = ($) => {
      p.value = $, R();
    }, K = ($) => {
      p.value = $;
    }, Y = async ($) => {
      await bt($.path), R();
    };
    ue(r, async ($) => {
      $.trim() ? (await z($.trim()), p.value = 0) : (d.value = [], u.value = !1, p.value = -1);
    }), ue(S, async ($) => {
      w.value = `size-${$}`, r.value.trim() && !f.value && (await z(r.value.trim()), p.value = 0);
    }), ue(D, async () => {
      r.value.trim() && !f.value && (await z(r.value.trim()), p.value = 0);
    });
    const z = async ($) => {
      if ($) {
        u.value = !0;
        try {
          const P = _.value?.path || k?.value?.path, M = await e.adapter.search({
            path: P,
            filter: $,
            deep: D.value,
            size: S.value
          });
          d.value = M || [], u.value = !1;
        } catch (P) {
          fe.error(Be(P, t("Search failed"))), d.value = [], u.value = !1;
        }
      }
    };
    he(() => {
      document.addEventListener("click", E), w.value = `size-${S.value}`, Oe(() => {
        s.value && s.value.focus();
      });
    });
    const Z = () => {
      f.value ? (f.value = !1, r.value.trim() && (z(r.value.trim()), p.value = 0)) : (m.value = !1, f.value = !0);
    }, le = ($) => {
      $ && (_.value = $);
    }, Q = ($) => {
      $ && (le($), f.value = !1, r.value.trim() && (z(r.value.trim()), p.value = 0));
    };
    Ae(() => {
      document.removeEventListener("click", E), l.value && l.value.cleanup();
    });
    const E = ($) => {
      const P = $.target;
      if (m.value && (P.closest(".vuefinder__search-modal__dropdown") || (m.value = !1, Oe(() => {
        s.value && s.value.focus();
      }))), b.value) {
        const M = P.closest(".vuefinder__search-modal__item-dropdown"), W = P.closest(".vuefinder__search-modal__result-item");
        !M && !W && R();
      }
    };
    return ($, P) => (v(), j(Re, { class: "vuefinder__search-modal-layout" }, {
      default: oe(() => [
        i("div", Oc, [
          L(ze, {
            icon: a(xn),
            title: a(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", Bc, [
            i("div", Rc, [
              L(fl, {
                ref_key: "searchInputRef",
                ref: s,
                modelValue: a(r),
                "onUpdate:modelValue": P[0] || (P[0] = (M) => Qo(r) ? r.value = M : null),
                "is-searching": u.value,
                disabled: f.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              L(vc, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: m.value,
                "onUpdate:visible": P[1] || (P[1] = (M) => m.value = M),
                "size-filter": S.value,
                "onUpdate:sizeFilter": P[2] || (P[2] = (M) => S.value = M),
                "selected-option": w.value,
                "onUpdate:selectedOption": P[3] || (P[3] = (M) => w.value = M),
                disabled: f.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: P[7] || (P[7] = pe(() => {
              }, ["stop"]))
            }, [
              i("div", Lc, [
                i("button", {
                  class: X(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": f.value }]),
                  onClick: pe(Z, ["stop"])
                }, [
                  L(a(Je), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: _.value?.path || a(k).path
                  }, x(a(Mo)(_.value?.path || a(k).path)), 9, Vc),
                  P[10] || (P[10] = i("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    i("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              i("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: P[6] || (P[6] = pe(() => {
                }, ["stop"]))
              }, [
                be(i("input", {
                  "onUpdate:modelValue": P[4] || (P[4] = (M) => D.value = M),
                  type: "checkbox",
                  disabled: f.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: P[5] || (P[5] = pe(() => {
                  }, ["stop"]))
                }, null, 8, zc), [
                  [vn, D.value]
                ]),
                i("span", null, x(a(t)("Include subfolders")), 1)
              ])
            ]),
            f.value ? (v(), g("div", Nc, [
              i("div", Hc, [
                L(bn, {
                  modelValue: _.value,
                  "onUpdate:modelValue": [
                    P[8] || (P[8] = (M) => _.value = M),
                    le
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(k),
                  onSelectAndClose: Q
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : O("", !0),
            !a(r).trim() && !f.value ? (v(), g("div", Uc, [
              i("p", jc, x(a(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : O("", !0),
            a(r).trim() && !f.value ? (v(), j(Ic, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: c,
              "search-results": d.value,
              "is-searching": u.value,
              "selected-index": p.value,
              "expanded-paths": h.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": y.value,
              "results-enter": !0,
              onSelectResultItem: F,
              onSelectResultItemWithDropdown: K,
              onTogglePathExpansion: C,
              onToggleItemDropdown: V,
              "onUpdate:selectedItemDropdownOption": P[9] || (P[9] = (M) => y.value = M),
              onCopyPath: Y,
              onOpenContainingFolder: q,
              onPreview: B
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : O("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Kc = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = se(), s = T(!1), { t: l } = o.i18n;
    let c = null;
    const r = () => {
      c && clearTimeout(c), s.value = !0, c = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return he(() => {
      o.emitter.on(n.on, r);
    }), Ae(() => {
      c && clearTimeout(c);
    }), {
      shown: s,
      t: l
    };
  }
}, qc = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, Wc = { key: 1 };
function Gc(n, e, t, o, s, l) {
  return v(), g("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? me(n.$slots, "default", { key: 0 }) : (v(), g("span", Wc, x(o.t("Saved.")), 1))
  ], 2);
}
const _t = /* @__PURE__ */ qc(Kc, [["render", Gc]]), Yc = [
  { name: "silver", displayName: "Silver" },
  { name: "valorite", displayName: "Valorite" },
  { name: "midnight", displayName: "Midnight" },
  { name: "latte", displayName: "Latte" },
  { name: "rose", displayName: "Rose" },
  { name: "mythril", displayName: "Mythril" },
  { name: "lime", displayName: "lime" },
  { name: "sky", displayName: "Sky" },
  { name: "ocean", displayName: "Oceanic" },
  { name: "palenight", displayName: "Palenight" },
  { name: "arctic", displayName: "Arctic" },
  { name: "code", displayName: "Code" }
], Qc = { class: "vuefinder__about-modal__content" }, Xc = { class: "vuefinder__about-modal__main" }, Jc = { class: "vuefinder__about-modal__description" }, Zc = { class: "vuefinder__about-modal__settings" }, ed = { class: "vuefinder__about-modal__settings__fieldset" }, td = { class: "vuefinder__about-modal__settings__section-title" }, nd = { class: "vuefinder__about-modal__setting" }, od = { class: "vuefinder__about-modal__setting-label" }, sd = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, id = { class: "vuefinder__about-modal__setting-input justify-end" }, ad = ["checked"], rd = { class: "vuefinder__about-modal__setting" }, ld = { class: "vuefinder__about-modal__setting-label" }, cd = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, dd = { class: "vuefinder__about-modal__setting-input justify-end" }, ud = ["checked"], fd = { class: "vuefinder__about-modal__setting" }, vd = { class: "vuefinder__about-modal__setting-label" }, pd = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, hd = { class: "vuefinder__about-modal__setting-input justify-end" }, md = ["checked"], _d = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, gd = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, wd = { class: "vuefinder__about-modal__setting-input justify-end" }, yd = ["value"], bd = ["label"], kd = ["value"], xd = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, $d = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Sd = { class: "vuefinder__about-modal__setting-input justify-end" }, Cd = ["label"], Dd = ["value"], Ed = { class: "vuefinder__about-modal__tab-content" }, Fd = { class: "vuefinder__about-modal__settings__section-title" }, Pd = { class: "vuefinder__about-modal__description" }, Bo = /* @__PURE__ */ te({
  __name: "ModalSettings",
  setup(n) {
    const e = se(), { enabled: t } = Ue(), o = e.config, { clearStore: s } = e.storage, { t: l } = e.i18n, c = J(o.state), r = H(() => c.value.theme || "silver"), d = async () => {
      o.reset(), s(), location.reload();
    }, u = (w) => {
      o.set("theme", w), e.emitter.emit("vf-theme-saved");
    }, p = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? lo : hn, e.emitter.emit("vf-metric-units-saved");
    }, m = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, f = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: _ } = Ft("VueFinderOptions"), D = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        zhCN: "Chinese-Simplified (简体中文)",
        zhTW: "Chinese-Traditional (繁體中文)",
        nl: "Dutch (Nederlands)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        it: "Italian (Italiano)",
        ja: "Japanese (日本語)",
        fa: "Persian (فارسی)",
        pl: "Polish (Polski)",
        pt: "Portuguese (Português)",
        ru: "Russian (Pусский)",
        es: "Spanish (Español)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)"
      }).filter(([w]) => Object.keys(_).includes(w))
    );
    return (w, y) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[2] || (y[2] = (h) => a(e).modal.close())
        }, x(a(l)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", Qc, [
          L(ze, {
            icon: a(Ao),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", Xc, [
            i("div", Jc, x(a(l)("Customize your experience with the following settings")), 1),
            i("div", Zc, [
              i("fieldset", ed, [
                i("div", td, x(a(l)("General")), 1),
                i("div", nd, [
                  i("div", od, [
                    i("label", sd, x(a(l)("Use Metric Units")), 1)
                  ]),
                  i("div", id, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: a(o).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: p
                    }, null, 40, ad),
                    L(_t, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: oe(() => [
                        de(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", rd, [
                  i("div", ld, [
                    i("label", cd, x(a(l)("Compact list view")), 1)
                  ]),
                  i("div", dd, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: a(o).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: m
                    }, null, 40, ud),
                    L(_t, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: oe(() => [
                        de(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", fd, [
                  i("div", vd, [
                    i("label", pd, x(a(l)("Persist path on reload")), 1)
                  ]),
                  i("div", hd, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: a(o).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: f
                    }, null, 40, md),
                    L(_t, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: oe(() => [
                        de(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                a(t)("theme") ? (v(), g("div", _d, x(a(l)("Theme")), 1)) : O("", !0),
                a(t)("theme") ? (v(), g("div", gd, [
                  i("div", wd, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: y[0] || (y[0] = (h) => u(h.target?.value))
                    }, [
                      i("optgroup", {
                        label: a(l)("Theme")
                      }, [
                        (v(!0), g(re, null, _e(a(Yc), (h) => (v(), g("option", {
                          key: h.name,
                          value: h.name
                        }, x(h.displayName), 9, kd))), 128))
                      ], 8, bd)
                    ], 40, yd),
                    L(_t, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: oe(() => [
                        de(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : O("", !0),
                a(t)("language") && Object.keys(a(D)).length > 1 ? (v(), g("div", xd, x(a(l)("Language")), 1)) : O("", !0),
                a(t)("language") && Object.keys(a(D)).length > 1 ? (v(), g("div", $d, [
                  i("div", Sd, [
                    be(i("select", {
                      id: "language",
                      "onUpdate:modelValue": y[1] || (y[1] = (h) => a(e).i18n.locale = h),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: a(l)("Language")
                      }, [
                        (v(!0), g(re, null, _e(a(D), (h, b) => (v(), g("option", {
                          key: b,
                          value: b
                        }, x(h), 9, Dd))), 128))
                      ], 8, Cd)
                    ], 512), [
                      [an, a(e).i18n.locale]
                    ]),
                    L(_t, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: oe(() => [
                        de(x(a(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : O("", !0)
              ])
            ]),
            i("div", Ed, [
              i("div", Fd, x(a(l)("Reset")), 1),
              i("div", Pd, x(a(l)("Reset all settings to default")), 1),
              i("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: d
              }, x(a(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fe = {
  ESCAPE: "Escape",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  SPACE: "Space",
  KEY_C: "KeyC",
  KEY_X: "KeyX",
  KEY_V: "KeyV",
  KEY_S: "KeyS",
  KEY_R: "KeyR"
};
function Td() {
  const n = se(), e = n.fs, t = n.config, { enabled: o } = Ue(), s = J(e.path), l = J(e.selectedItems), c = (r) => {
    if (r.code === Fe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (r.metaKey && r.code === Fe.KEY_R && !r.shiftKey && (n.adapter.invalidateListQuery(s.value.path), n.adapter.open(s.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Fe.KEY_R && o("rename") && l.value.length === 1 && (n.modal.open(Kt, { items: l.value }), r.preventDefault()), r.code === Fe.DELETE && l.value.length !== 0 && n.modal.open(jt, { items: l.value }), r.metaKey && r.code === Fe.BACKSLASH && n.modal.open(vo), r.metaKey && r.code === Fe.KEY_F && o("search") && (n.modal.open(Dn), r.preventDefault()), r.metaKey && r.code === Fe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Fe.KEY_S && (n.modal.open(Bo), r.preventDefault()), r.metaKey && r.code === Fe.ENTER && (t.toggle("fullScreen"), n.root.focus()), r.metaKey && r.code === Fe.KEY_A && (e.selectAll(n.selectionMode || "multiple", n), r.preventDefault()), r.code === Fe.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && n.modal.open(qt, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === Fe.KEY_C && o("copy")) {
        if (l.value.length === 0) {
          fe.error(n.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((d) => d.path))), fe.success(
          l.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_X && o("copy")) {
        if (l.value.length === 0) {
          fe.error(n.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((d) => d.path))), fe.success(
          l.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_V && o("copy")) {
        if (e.getClipboard().items.size === 0) {
          fe.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          fe.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          n.modal.open(vt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          n.modal.open(kn, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  he(async () => {
    if (await Oe(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", c);
  }), fn(() => {
    n.root && n.root.removeEventListener("keydown", c);
  });
}
function Ad() {
  const n = T(!1), e = T([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const d = r.dataTransfer?.items;
      d && Array.from(d).some((p) => p.kind === "file") && (n.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      n.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const d = r.currentTarget.getBoundingClientRect(), u = r.clientX, p = r.clientY;
      (u < d.left || u > d.right || p < d.top || p > d.bottom) && (n.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), n.value = !1;
      const d = r.dataTransfer?.items;
      if (d) {
        const u = Array.from(d).filter((p) => p.kind === "file");
        if (u.length > 0) {
          e.value = [];
          for (const p of u) {
            const m = p.webkitGetAsEntry?.();
            if (m)
              await _n((f, _) => {
                e.value.push({
                  name: _.name,
                  size: _.size,
                  type: _.type,
                  lastModified: new Date(_.lastModified),
                  file: _
                });
              }, m);
            else {
              const f = p.getAsFile();
              f && e.value.push({
                name: f.name,
                size: f.size,
                type: f.type,
                lastModified: new Date(f.lastModified),
                file: f
              });
            }
          }
          return e.value;
        }
      }
      return [];
    },
    clearExternalFiles: () => {
      e.value = [];
    }
  };
}
const Md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Id(n, e) {
  return v(), g("svg", Md, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Ro = { render: Id }, Od = { class: "vuefinder__new-folder-modal__content" }, Bd = { class: "vuefinder__new-folder-modal__form" }, Rd = { class: "vuefinder__new-folder-modal__description" }, Ld = ["placeholder"], En = /* @__PURE__ */ te({
  __name: "ModalNewFolder",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = J(o.path), l = T(""), c = () => {
      l.value !== "" && e.adapter.createFolder({
        path: s.value.path,
        name: l.value
      }).then((r) => {
        fe.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        fe.error(Be(r, t("Failed to create folder")));
      });
    };
    return (r, d) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, x(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[1] || (d[1] = (u) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(Ro),
            title: a(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Od, [
            i("div", Bd, [
              i("p", Rd, x(a(t)("Create a new folder")), 1),
              be(i("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (u) => l.value = u),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: kt(c, ["enter"])
              }, null, 40, Ld), [
                [xt, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function zd(n, e) {
  return v(), g("svg", Vd, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Lo = { render: zd }, Nd = { class: "vuefinder__new-file-modal__content" }, Hd = { class: "vuefinder__new-file-modal__form" }, Ud = { class: "vuefinder__new-file-modal__description" }, jd = ["placeholder"], Vo = /* @__PURE__ */ te({
  __name: "ModalNewFile",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = J(o.path), l = T(""), c = () => {
      l.value !== "" && e.adapter.createFile({
        path: s.value.path,
        name: l.value
      }).then((r) => {
        fe.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        fe.error(Be(r, t("Failed to create file")));
      });
    };
    return (r, d) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, x(a(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[1] || (d[1] = (u) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(Lo),
            title: a(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", Nd, [
            i("div", Hd, [
              i("p", Ud, x(a(t)("Create a new file")), 1),
              be(i("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (u) => l.value = u),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(t)("File Name"),
                type: "text",
                onKeyup: kt(c, ["enter"])
              }, null, 40, jd), [
                [xt, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Kd = ["title"], qd = /* @__PURE__ */ te({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = se(), { t: s } = o.i18n, l = T(!1), c = T(null), r = T(c.value?.innerHTML);
    ue(r, () => l.value = !1);
    const d = () => {
      t("hidden"), l.value = !0;
    };
    return (u, p) => (v(), g("div", null, [
      l.value ? O("", !0) : (v(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: X(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        me(u.$slots, "default"),
        i("div", {
          class: "vuefinder__message__close",
          title: a(s)("Close"),
          onClick: d
        }, [...p[0] || (p[0] = [
          i("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            i("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, Kd)
      ], 2))
    ]));
  }
});
function un(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Gd(n, e) {
  return v(), g("svg", Wd, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const zo = { render: Gd }, Yd = { class: "vuefinder__upload-modal__content relative" }, Qd = { class: "vuefinder__upload-modal__target-section" }, Xd = { class: "vuefinder__upload-modal__target-label" }, Jd = { class: "vuefinder__upload-modal__target-container" }, Zd = { class: "vuefinder__upload-modal__target-path" }, eu = { class: "vuefinder__upload-modal__target-storage" }, tu = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, nu = { class: "vuefinder__upload-modal__target-badge" }, ou = { class: "vuefinder__upload-modal__drag-hint" }, su = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, iu = ["textContent"], au = { class: "vuefinder__upload-modal__file-info" }, ru = { class: "vuefinder__upload-modal__file-name hidden md:block" }, lu = { class: "vuefinder__upload-modal__file-name md:hidden" }, cu = {
  key: 0,
  class: "ml-auto"
}, du = ["title", "disabled", "onClick"], uu = {
  key: 0,
  class: "py-2"
}, fu = ["aria-expanded"], vu = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, pu = ["disabled"], hu = ["aria-expanded"], mu = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Fn = /* @__PURE__ */ te({
  __name: "ModalUpload",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = J(o.path), l = T(s.value), c = T(!1), r = () => {
      const E = l.value.path;
      if (!E) return { storage: "local", path: "" };
      if (E.endsWith("://"))
        return { storage: E.replace("://", ""), path: "" };
      const $ = E.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, d = (E) => {
      E && (l.value = E);
    }, u = (E) => {
      E && (l.value = E, c.value = !1);
    }, {
      container: p,
      internalFileInput: m,
      internalFolderInput: f,
      pickFiles: _,
      queue: S,
      message: D,
      uploading: w,
      hasFilesInDropArea: y,
      definitions: h,
      openFileSelector: b,
      upload: k,
      cancel: C,
      remove: V,
      clear: R,
      close: q,
      getClassNameForEntry: B,
      getIconForEntry: F,
      addExternalFiles: K
    } = mo(e.customUploader), Y = () => {
      k(l.value);
    };
    he(() => {
      e.emitter.on("vf-external-files-dropped", (E) => {
        K(E);
      });
    }), Ae(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const z = T(!1), Z = T(null), le = T(null), Q = (E) => {
      if (!z.value) return;
      const $ = E.target, P = Z.value?.contains($) ?? !1, M = le.value?.contains($) ?? !1;
      !P && !M && (z.value = !1);
    };
    return he(() => document.addEventListener("click", Q)), Ae(() => document.removeEventListener("click", Q)), (E, $) => (v(), j(Re, {
      "show-drag-overlay": a(y),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: oe(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: Z,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: X([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              z.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: $[3] || ($[3] = (P) => a(b)())
            }, x(a(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": z.value ? "true" : "false",
              onClick: $[4] || ($[4] = pe((P) => z.value = !z.value, ["stop"]))
            }, [...$[17] || ($[17] = [
              i("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                i("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, fu)
          ], 2),
          z.value ? (v(), g("div", vu, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[5] || ($[5] = (P) => {
                a(b)(), z.value = !1;
              })
            }, x(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[6] || ($[6] = (P) => {
                a(f)?.click(), z.value = !1;
              })
            }, x(a(t)("Select Folders")), 1),
            $[18] || ($[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: X(["vuefinder__upload-actions__item", a(w) ? "disabled" : ""]),
              onClick: $[7] || ($[7] = (P) => a(w) ? null : (a(R)(!1), z.value = !1))
            }, x(a(t)("Clear all")), 3),
            i("div", {
              class: X(["vuefinder__upload-actions__item", a(w) ? "disabled" : ""]),
              onClick: $[8] || ($[8] = (P) => a(w) ? null : (a(R)(!0), z.value = !1))
            }, x(a(t)("Clear only successful")), 3)
          ])) : O("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(w) || !a(S).length,
          onClick: pe(Y, ["prevent"])
        }, x(a(t)("Upload")), 9, pu),
        a(w) ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[9] || ($[9] = pe(
            //@ts-ignore
            (...P) => a(C) && a(C)(...P),
            ["prevent"]
          ))
        }, x(a(t)("Cancel")), 1)) : (v(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[10] || ($[10] = pe(
            //@ts-ignore
            (...P) => a(q) && a(q)(...P),
            ["prevent"]
          ))
        }, x(a(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: le,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: X(["vuefinder__upload-actions", z.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            i("button", {
              ref_key: "pickFiles",
              ref: _,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, x(a(t)("Select Files")), 513),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": z.value ? "true" : "false",
              onClick: $[11] || ($[11] = pe((P) => z.value = !z.value, ["stop"]))
            }, [...$[19] || ($[19] = [
              i("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                i("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, hu)
          ], 2),
          z.value ? (v(), g("div", mu, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[12] || ($[12] = (P) => {
                a(b)(), z.value = !1;
              })
            }, x(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[13] || ($[13] = (P) => {
                a(f)?.click(), z.value = !1;
              })
            }, x(a(t)("Select Folders")), 1),
            $[20] || ($[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: X(["vuefinder__upload-actions__item", a(w) ? "disabled" : ""]),
              onClick: $[14] || ($[14] = (P) => a(w) ? null : (a(R)(!1), z.value = !1))
            }, x(a(t)("Clear all")), 3),
            i("div", {
              class: X(["vuefinder__upload-actions__item", a(w) ? "disabled" : ""]),
              onClick: $[15] || ($[15] = (P) => a(w) ? null : (a(R)(!0), z.value = !1))
            }, x(a(t)("Clear only successful")), 3)
          ])) : O("", !0)
        ], 512)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(zo),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", Yd, [
            i("div", Qd, [
              i("div", Xd, x(a(t)("Hedef Klasör")), 1),
              i("div", Jd, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: $[0] || ($[0] = (P) => c.value = !c.value)
                }, [
                  i("div", Zd, [
                    i("span", eu, x(r().storage) + "://", 1),
                    r().path ? (v(), g("span", tu, x(r().path), 1)) : O("", !0)
                  ]),
                  i("span", nu, x(a(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: X([
                  "vuefinder__upload-modal__tree-selector",
                  c.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                L(bn, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    $[1] || ($[1] = (P) => l.value = P),
                    d
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: u
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", ou, x(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: p,
              class: "hidden"
            }, null, 512),
            i("div", su, [
              (v(!0), g(re, null, _e(a(S), (P) => (v(), g("div", {
                key: P.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: X(["vuefinder__upload-modal__file-icon", a(B)(P)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: x(a(F)(P))
                  }, null, 8, iu)
                ], 2),
                i("div", au, [
                  i("div", ru, x(a(un)(P.name, 40)) + " (" + x(P.size) + ") ", 1),
                  i("div", lu, x(a(un)(P.name, 16)) + " (" + x(P.size) + ") ", 1),
                  i("div", {
                    class: X(["vuefinder__upload-modal__file-status", a(B)(P)])
                  }, [
                    de(x(P.statusName) + " ", 1),
                    P.status === a(h).QUEUE_ENTRY_STATUS.UPLOADING ? (v(), g("b", cu, x(P.percent), 1)) : O("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: X(["vuefinder__upload-modal__file-remove", a(w) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(w),
                  onClick: (M) => a(V)(P)
                }, [...$[16] || ($[16] = [
                  i("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, du)
              ]))), 128)),
              a(S).length ? O("", !0) : (v(), g("div", uu, x(a(t)("No files selected!")), 1))
            ]),
            a(D).length ? (v(), j(qd, {
              key: 0,
              error: "",
              onHidden: $[2] || ($[2] = (P) => D.value = "")
            }, {
              default: oe(() => [
                de(x(a(D)), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ]),
        i("input", {
          ref_key: "internalFileInput",
          ref: m,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        i("input", {
          ref_key: "internalFolderInput",
          ref: f,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function gu(n, e) {
  return v(), g("svg", _u, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const No = { render: gu }, wu = { class: "vuefinder__unarchive-modal__content" }, yu = { class: "vuefinder__unarchive-modal__items" }, bu = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ku = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xu = { class: "vuefinder__unarchive-modal__item-name" }, $u = { class: "vuefinder__unarchive-modal__info" }, Pn = /* @__PURE__ */ te({
  __name: "ModalUnarchive",
  setup(n) {
    const e = se(), t = e.fs, o = J(t.path), { t: s } = e.i18n, l = T(e.modal.data.items[0]), c = T([]), r = () => {
      e.adapter.unarchive({
        item: l.value.path,
        path: o.value.path
      }).then((d) => {
        fe.success(s("The file unarchived.")), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        fe.error(Be(d, s("Failed to unarchive")));
      });
    };
    return (d, u) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, x(a(s)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[0] || (u[0] = (p) => a(e).modal.close())
        }, x(a(s)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(No),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", wu, [
            i("div", yu, [
              (v(!0), g(re, null, _e(c.value, (p) => (v(), g("p", {
                key: p.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                p.type === "dir" ? (v(), g("svg", bu, [...u[1] || (u[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), g("svg", ku, [...u[2] || (u[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", xu, x(p.basename), 1)
              ]))), 128)),
              i("p", $u, x(a(s)("The archive will be unarchived at")) + " (" + x(a(o).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Cu(n, e) {
  return v(), g("svg", Su, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ho = { render: Cu }, Du = { class: "vuefinder__archive-modal__content" }, Eu = { class: "vuefinder__archive-modal__form" }, Fu = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Pu = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tu = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Au = { class: "vuefinder__archive-modal__file-name" }, Mu = ["placeholder"], Tn = /* @__PURE__ */ te({
  __name: "ModalArchive",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = J(o.path), l = T(""), c = T(e.modal.data.items), r = () => {
      c.value.length && e.adapter.archive({
        path: s.value.path,
        items: c.value.map(({ path: d, type: u }) => ({
          path: d,
          type: u
        })),
        name: l.value
      }).then((d) => {
        fe.success(t("The file(s) archived.")), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        fe.error(Be(d, t("Failed to archive files")));
      });
    };
    return (d, u) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, x(a(t)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: u[1] || (u[1] = (p) => a(e).modal.close())
        }, x(a(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          L(ze, {
            icon: a(Ho),
            title: a(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", Du, [
            i("div", Eu, [
              i("div", Fu, [
                (v(!0), g(re, null, _e(c.value, (p) => (v(), g("p", {
                  key: p.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  p.type === "dir" ? (v(), g("svg", Pu, [...u[2] || (u[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), g("svg", Tu, [...u[3] || (u[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Au, x(p.basename), 1)
                ]))), 128))
              ]),
              be(i("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (p) => l.value = p),
                class: "vuefinder__archive-modal__input",
                placeholder: a(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: kt(r, ["enter"])
              }, null, 40, Mu), [
                [xt, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Iu = { class: "vuefinder__about-modal__content" }, Ou = { class: "vuefinder__about-modal__main" }, Bu = { class: "vuefinder__about-modal__shortcuts" }, Ru = { class: "vuefinder__about-modal__shortcut" }, Lu = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Vu = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, zu = { class: "vuefinder__about-modal__shortcut" }, Nu = { class: "vuefinder__about-modal__shortcut" }, Hu = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Uu = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, ju = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Ku = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, qu = { class: "vuefinder__about-modal__shortcut" }, Wu = { class: "vuefinder__about-modal__shortcut" }, Gu = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Yu = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Qu = /* @__PURE__ */ te({
  __name: "ModalShortcuts",
  setup(n) {
    const e = se(), { enabled: t } = Ue(), { t: o } = e.i18n;
    return (s, l) => (v(), j(Re, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (c) => a(e).modal.close())
        }, x(a(o)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", Iu, [
          L(ze, {
            icon: a(fo),
            title: a(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", Ou, [
            i("div", Bu, [
              i("div", Ru, [
                i("div", null, x(a(o)("Refresh")), 1),
                l[1] || (l[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (v(), g("div", Lu, [
                i("div", null, x(a(o)("Rename")), 1),
                l[2] || (l[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "Shift"),
                  de(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : O("", !0),
              a(t)("delete") ? (v(), g("div", Vu, [
                i("div", null, x(a(o)("Delete")), 1),
                l[3] || (l[3] = i("kbd", null, "Del", -1))
              ])) : O("", !0),
              i("div", zu, [
                i("div", null, x(a(o)("Escape")), 1),
                l[4] || (l[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", Nu, [
                i("div", null, x(a(o)("Select All")), 1),
                l[5] || (l[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (v(), g("div", Hu, [
                i("div", null, x(a(o)("Cut")), 1),
                l[6] || (l[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : O("", !0),
              a(t)("copy") ? (v(), g("div", Uu, [
                i("div", null, x(a(o)("Copy")), 1),
                l[7] || (l[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : O("", !0),
              a(t)("copy") ? (v(), g("div", ju, [
                i("div", null, x(a(o)("Paste")), 1),
                l[8] || (l[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : O("", !0),
              a(t)("search") ? (v(), g("div", Ku, [
                i("div", null, x(a(o)("Search")), 1),
                l[9] || (l[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : O("", !0),
              i("div", qu, [
                i("div", null, x(a(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", Wu, [
                i("div", null, x(a(o)("Open Settings")), 1),
                l[11] || (l[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (v(), g("div", Gu, [
                i("div", null, x(a(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  de(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : O("", !0),
              a(t)("preview") ? (v(), g("div", Yu, [
                i("div", null, x(a(o)("Preview")), 1),
                l[13] || (l[13] = i("kbd", null, "Space", -1))
              ])) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xu = { class: "vuefinder__menubar__container" }, Ju = ["onClick", "onMouseenter"], Zu = { class: "vuefinder__menubar__label" }, ef = ["onMouseenter"], tf = ["onClick"], nf = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, of = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, sf = /* @__PURE__ */ te({
  __name: "MenuBar",
  setup(n) {
    const e = se(), { enabled: t } = Ue(), { t: o } = e?.i18n || { t: (h) => h }, s = e?.fs, l = e?.config, c = J(l.state), r = J(s.selectedItems), d = J(s?.storages || []), u = T(null), p = T(!1), m = H(() => window.opener !== null || window.name !== "" || window.history.length <= 1), f = H(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(En, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(Vo, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(Fn, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: o("Search"),
            action: () => e.modal.open(Dn),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: o("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Tn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(Pn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(qt, {
                storage: s?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir" && t("preview")
          },
          // Only show exit option if we can actually close the window
          ...m.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: o("Exit"),
              action: () => {
                try {
                  window.close();
                } catch {
                }
              },
              enabled: () => !0
            }
          ] : []
        ]
      },
      {
        id: "edit",
        label: o("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: o("Select All"),
              action: () => s?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: o("Deselect All"),
              action: () => s?.clearSelection(),
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...t("copy") ? [
            {
              id: "cut",
              label: o("Cut"),
              action: () => {
                r.value.length > 0 && s?.setClipboard(
                  "cut",
                  new Set(r.value.map((h) => h.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "copy",
              label: o("Copy"),
              action: () => {
                r.value.length > 0 && s?.setClipboard(
                  "copy",
                  new Set(r.value.map((h) => h.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: o("Paste"),
              action: () => {
                const h = s?.getClipboard();
                h?.items?.size > 0 && e?.modal?.open(h.type === "cut" ? vt : kn, {
                  items: { from: Array.from(h.items), to: s?.path?.get() }
                });
              },
              enabled: () => s?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...t("move") ? [
            {
              id: "move",
              label: o("Move"),
              action: () => {
                if (r.value.length > 0) {
                  const h = e?.fs, b = {
                    storage: h?.path?.get()?.storage || "",
                    path: h?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(vt, { items: { from: r.value, to: b } });
                }
              },
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: async () => {
              if (r.value.length === 1) {
                const h = r.value[0];
                await bt(h.path);
              } else {
                const h = s?.path?.get();
                h?.path && await bt(h.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: o("Copy Download URL"),
            action: async () => {
              if (r.value.length === 1) {
                const h = r.value[0];
                s?.path?.get()?.storage;
                const b = e?.adapter?.getDownloadUrl({ path: h.path });
                b && await mc(b);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(Kt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(jt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("delete")
          }
        ]
      },
      {
        id: "view",
        label: o("View"),
        items: [
          {
            id: "refresh",
            label: o("Refresh"),
            action: () => {
              e?.adapter.list(s?.path?.get()?.path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: o("Grid View"),
            action: () => l?.set("view", "grid"),
            enabled: () => !0,
            checked: () => c.value?.view === "grid"
          },
          {
            id: "list-view",
            label: o("List View"),
            action: () => l?.set("view", "list"),
            enabled: () => !0,
            checked: () => c.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: o("Tree View"),
            action: () => l?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => c.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: o("Show Thumbnails"),
            action: () => l?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => c.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: o("Show Hidden Files"),
            action: () => l?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => c.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: o("Full Screen"),
            action: () => l?.toggle("fullScreen"),
            enabled: () => t("fullscreen"),
            checked: () => c.value?.fullScreen
          }
        ]
      },
      {
        id: "go",
        label: o("Go"),
        items: [
          ...t("history") ? [
            {
              id: "forward",
              label: o("Forward"),
              action: () => {
                s?.goForward();
                const h = s?.path?.get();
                h?.path && e?.adapter.open(h.path);
              },
              enabled: () => s?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: o("Back"),
              action: () => {
                s?.goBack();
                const h = s?.path?.get();
                h?.path && e?.adapter.open(h.path);
              },
              enabled: () => s?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: o("Open containing folder"),
            action: () => {
              const h = s?.path?.get();
              if (h?.breadcrumb && h.breadcrumb.length > 1) {
                const k = h.breadcrumb[h.breadcrumb.length - 2]?.path ?? `${h.storage}://`;
                e?.adapter.open(k);
              }
            },
            enabled: () => {
              const h = s?.path?.get();
              return h?.breadcrumb && h.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(d.value || []).map((h) => ({
            id: `storage-${h}`,
            label: h,
            action: () => {
              const b = `${h}://`;
              s?.setPath(b), e?.adapter.list(b);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: o("Go to Folder"),
            action: async () => {
              const h = prompt(o("Enter folder path:"));
              if (h) {
                if (!h.includes("://")) {
                  alert(o("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const b = h.indexOf("://"), k = h.slice(0, b);
                if (!d.value || !d.value.includes(k)) {
                  alert(o('Invalid storage. Storage "%s" is not available.', k));
                  return;
                }
                try {
                  await e?.adapter.open(h);
                } catch (C) {
                  const V = Be(C, o("Failed to navigate to folder"));
                  fe.error(V), e.fs.setLoading(!1);
                }
              }
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: o("Help"),
        items: [
          {
            id: "settings",
            label: o("Settings"),
            action: () => e?.modal?.open(Bo),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: o("Shortcuts"),
            action: () => e?.modal?.open(Qu),
            enabled: () => !0
          },
          {
            id: "about",
            label: o("About"),
            action: () => e?.modal?.open(vo),
            enabled: () => !0
          }
        ]
      }
    ]), _ = (h) => {
      u.value === h ? D() : (u.value = h, p.value = !0);
    }, S = (h) => {
      p.value && (u.value = h);
    }, D = () => {
      u.value = null, p.value = !1;
    }, w = (h) => {
      D(), h();
    }, y = (h) => {
      h.target.closest(".vuefinder__menubar") || D();
    };
    return he(() => {
      document.addEventListener("click", y);
    }), Ae(() => {
      document.removeEventListener("click", y);
    }), (h, b) => (v(), g("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = pe(() => {
      }, ["stop"]))
    }, [
      i("div", Xu, [
        (v(!0), g(re, null, _e(f.value, (k) => (v(), g("div", {
          key: k.id,
          class: X(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === k.id }]),
          onClick: (C) => _(k.id),
          onMouseenter: (C) => S(k.id)
        }, [
          i("span", Zu, x(k.label), 1),
          u.value === k.id ? (v(), g("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => S(k.id)
          }, [
            (v(!0), g(re, null, _e(k.items, (C) => (v(), g("div", {
              key: C.id || C.type,
              class: X(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: pe((V) => C.type !== "separator" && C.enabled && C.enabled() ? w(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (v(), g("span", nf, x(C.label), 1)) : O("", !0),
              C.checked && C.checked() ? (v(), g("span", of, " ✓ ")) : O("", !0)
            ], 10, tf))), 128))
          ], 40, ef)) : O("", !0)
        ], 42, Ju))), 128))
      ])
    ]));
  }
}), af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function rf(n, e) {
  return v(), g("svg", af, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const lf = { render: rf }, cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function df(n, e) {
  return v(), g("svg", cf, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const uf = { render: df }, ff = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function vf(n, e) {
  return v(), g("svg", ff, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const pf = { render: vf }, hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function mf(n, e) {
  return v(), g("svg", hf, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const _f = { render: mf }, gf = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function wf(n, e) {
  return v(), g("svg", gf, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const yf = { render: wf }, bf = { class: "vuefinder__toolbar" }, kf = { class: "vuefinder__toolbar__actions" }, xf = ["title"], $f = ["title"], Sf = ["title"], Cf = ["title"], Df = ["title"], Ef = ["title"], Ff = ["title"], Pf = { class: "vuefinder__toolbar__controls" }, Tf = ["title"], Af = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Mf = ["title"], If = { class: "relative" }, Of = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Bf = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Rf = { class: "vuefinder__toolbar__dropdown-content" }, Lf = { class: "vuefinder__toolbar__dropdown-section" }, Vf = { class: "vuefinder__toolbar__dropdown-label" }, zf = { class: "vuefinder__toolbar__dropdown-row" }, Nf = { value: "name" }, Hf = { value: "size" }, Uf = { value: "modified" }, jf = { value: "" }, Kf = { value: "asc" }, qf = { value: "desc" }, Wf = { class: "vuefinder__toolbar__dropdown-section" }, Gf = { class: "vuefinder__toolbar__dropdown-label" }, Yf = { class: "vuefinder__toolbar__dropdown-options" }, Qf = { class: "vuefinder__toolbar__dropdown-option" }, Xf = { class: "vuefinder__toolbar__option-text" }, Jf = { class: "vuefinder__toolbar__dropdown-option" }, Zf = { class: "vuefinder__toolbar__option-text" }, ev = { class: "vuefinder__toolbar__dropdown-option" }, tv = { class: "vuefinder__toolbar__option-text" }, nv = { class: "vuefinder__toolbar__dropdown-toggle" }, ov = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, sv = { class: "vuefinder__toolbar__dropdown-reset" }, iv = ["title"], av = ["title"], rv = /* @__PURE__ */ te({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = se(), { enabled: t } = Ue(), { t: o } = e.i18n, s = e.fs, l = e.config, c = J(l.state), r = J(s.selectedItems), d = J(s.sort), u = J(s.filter);
    ue(
      () => c.value.fullScreen,
      () => {
        if (c.value.fullScreen) {
          const w = document.querySelector("body");
          w && (w.style.overflow = "hidden");
        } else {
          const w = document.querySelector("body");
          w && (w.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const p = T(!1), m = (w) => {
      w.target.closest(".vuefinder__toolbar__dropdown-container") || (p.value = !1);
    };
    he(() => {
      document.addEventListener("click", m);
    }), Ae(() => {
      document.removeEventListener("click", m);
    });
    const f = T({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: c.value.showHiddenFiles
      // Initialize with config store default
    });
    ue(
      () => f.value.sortBy,
      (w) => {
        if (!f.value.sortOrder) {
          s.clearSort();
          return;
        }
        w === "name" ? s.setSort("basename", f.value.sortOrder) : w === "size" ? s.setSort("file_size", f.value.sortOrder) : w === "modified" && s.setSort("last_modified", f.value.sortOrder);
      }
    ), ue(
      () => f.value.sortOrder,
      (w) => {
        if (!w) {
          s.clearSort();
          return;
        }
        f.value.sortBy === "name" ? s.setSort("basename", w) : f.value.sortBy === "size" ? s.setSort("file_size", w) : f.value.sortBy === "modified" && s.setSort("last_modified", w);
      }
    ), ue(
      d,
      (w) => {
        w.active ? (w.column === "basename" ? f.value.sortBy = "name" : w.column === "file_size" ? f.value.sortBy = "size" : w.column === "last_modified" && (f.value.sortBy = "modified"), f.value.sortOrder = w.order) : f.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ue(
      () => f.value.filterKind,
      (w) => {
        s.setFilter(w, c.value.showHiddenFiles);
      }
    ), ue(
      () => f.value.showHidden,
      (w) => {
        l.set("showHiddenFiles", w), s.setFilter(f.value.filterKind, w);
      }
    ), ue(
      u,
      (w) => {
        f.value.filterKind = w.kind;
      },
      { immediate: !0 }
    ), ue(
      () => c.value.showHiddenFiles,
      (w) => {
        f.value.showHidden = w, s.setFilter(f.value.filterKind, w);
      },
      { immediate: !0 }
    );
    const _ = () => l.set("view", c.value.view === "grid" ? "list" : "grid"), S = H(() => u.value.kind !== "all" || !c.value.showHiddenFiles || d.value.active), D = () => {
      f.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (w, y) => (v(), g("div", bf, [
      i("div", kf, [
        a(t)("newfolder") ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("New Folder"),
          onClick: y[0] || (y[0] = (h) => a(e).modal.open(En, { items: a(r) }))
        }, [
          L(a(Ro))
        ], 8, xf)) : O("", !0),
        a(t)("newfile") ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("New File"),
          onClick: y[1] || (y[1] = (h) => a(e).modal.open(Vo, { items: a(r) }))
        }, [
          L(a(Lo))
        ], 8, $f)) : O("", !0),
        a(t)("rename") ? (v(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: a(o)("Rename"),
          onClick: y[2] || (y[2] = (h) => a(r).length !== 1 || a(e).modal.open(Kt, { items: a(r) }))
        }, [
          L(a(ho), {
            class: X(a(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Sf)) : O("", !0),
        a(t)("delete") ? (v(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: a(o)("Delete"),
          onClick: y[3] || (y[3] = (h) => !a(r).length || a(e).modal.open(jt, { items: a(r) }))
        }, [
          L(a(po), {
            class: X(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cf)) : O("", !0),
        a(t)("upload") ? (v(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: a(o)("Upload"),
          onClick: y[4] || (y[4] = (h) => a(e).modal.open(Fn, { items: a(r) }))
        }, [
          L(a(zo))
        ], 8, Df)) : O("", !0),
        a(t)("unarchive") && a(r).length === 1 && a(r)[0].mime_type === "application/zip" ? (v(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: a(o)("Unarchive"),
          onClick: y[5] || (y[5] = (h) => !a(r).length || a(e).modal.open(Pn, { items: a(r) }))
        }, [
          L(a(No), {
            class: X(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ef)) : O("", !0),
        a(t)("archive") ? (v(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: a(o)("Archive"),
          onClick: y[6] || (y[6] = (h) => !a(r).length || a(e).modal.open(Tn, { items: a(r) }))
        }, [
          L(a(Ho), {
            class: X(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ff)) : O("", !0)
      ]),
      i("div", Pf, [
        a(t)("search") ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("Search Files"),
          onClick: y[7] || (y[7] = (h) => a(e).modal.open(Dn))
        }, [
          L(a(xn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Tf)) : O("", !0),
        i("div", Af, [
          i("div", {
            title: a(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: y[8] || (y[8] = (h) => p.value = !p.value)
          }, [
            i("div", If, [
              L(a(yf), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              S.value ? (v(), g("div", Of)) : O("", !0)
            ])
          ], 8, Mf),
          p.value ? (v(), g("div", Bf, [
            i("div", Rf, [
              i("div", Lf, [
                i("div", Vf, x(a(o)("Sorting")), 1),
                i("div", zf, [
                  be(i("select", {
                    "onUpdate:modelValue": y[9] || (y[9] = (h) => f.value.sortBy = h),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Nf, x(a(o)("Name")), 1),
                    i("option", Hf, x(a(o)("Size")), 1),
                    i("option", Uf, x(a(o)("Date")), 1)
                  ], 512), [
                    [an, f.value.sortBy]
                  ]),
                  be(i("select", {
                    "onUpdate:modelValue": y[10] || (y[10] = (h) => f.value.sortOrder = h),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", jf, x(a(o)("None")), 1),
                    i("option", Kf, x(a(o)("Asc")), 1),
                    i("option", qf, x(a(o)("Desc")), 1)
                  ], 512), [
                    [an, f.value.sortOrder]
                  ])
                ])
              ]),
              i("div", Wf, [
                i("div", Gf, x(a(o)("Show")), 1),
                i("div", Yf, [
                  i("label", Qf, [
                    be(i("input", {
                      "onUpdate:modelValue": y[11] || (y[11] = (h) => f.value.filterKind = h),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [nn, f.value.filterKind]
                    ]),
                    i("span", Xf, x(a(o)("All items")), 1)
                  ]),
                  i("label", Jf, [
                    be(i("input", {
                      "onUpdate:modelValue": y[12] || (y[12] = (h) => f.value.filterKind = h),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [nn, f.value.filterKind]
                    ]),
                    i("span", Zf, x(a(o)("Files only")), 1)
                  ]),
                  i("label", ev, [
                    be(i("input", {
                      "onUpdate:modelValue": y[13] || (y[13] = (h) => f.value.filterKind = h),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [nn, f.value.filterKind]
                    ]),
                    i("span", tv, x(a(o)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", nv, [
                i("label", ov, x(a(o)("Show hidden files")), 1),
                be(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": y[14] || (y[14] = (h) => f.value.showHidden = h),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [vn, f.value.showHidden]
                ])
              ]),
              i("div", sv, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: D
                }, x(a(o)("Reset")), 1)
              ])
            ])
          ])) : O("", !0)
        ]),
        a(t)("fullscreen") ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("Toggle Full Screen"),
          onClick: y[15] || (y[15] = (h) => a(l).toggle("fullScreen"))
        }, [
          a(c).fullScreen ? (v(), j(a(uf), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (v(), j(a(lf), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, iv)) : O("", !0),
        i("div", {
          class: "mx-1.5",
          title: a(o)("Change View"),
          onClick: y[16] || (y[16] = (h) => _())
        }, [
          a(c).view === "grid" ? (v(), j(a(pf), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : O("", !0),
          a(c).view === "list" ? (v(), j(a(_f), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : O("", !0)
        ], 8, av)
      ])
    ]));
  }
}), lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function cv(n, e) {
  return v(), g("svg", lv, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const dv = { render: cv }, uv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function fv(n, e) {
  return v(), g("svg", uv, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const vv = { render: fv }, pv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function hv(n, e) {
  return v(), g("svg", pv, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const mv = { render: hv }, _v = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function gv(n, e) {
  return v(), g("svg", _v, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const wv = { render: gv }, yv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function bv(n, e) {
  return v(), g("svg", yv, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const kv = { render: bv }, xv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function $v(n, e) {
  return v(), g("svg", xv, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Sv = { render: $v }, Cv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Dv(n, e) {
  return v(), g("svg", Cv, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ev = { render: Dv }, Fv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Pv(n, e) {
  return v(), g("svg", Fv, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Tv = { render: Pv };
function Ct(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = J(o.selectedItems);
  function l(p, m) {
    if (p.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      p.dataTransfer && (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none");
      return;
    }
    p.preventDefault(), o.getDraggedItem() === m.path || !m || m.type !== "dir" || s.value.some(
      (S) => S.path === m.path || pc(S.path) === m.path
    ) ? p.dataTransfer && (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : (p.dataTransfer && (p.dataTransfer.dropEffect = "copy", p.dataTransfer.effectAllowed = "all"), p.currentTarget.classList.add(...e));
  }
  function c(p) {
    if (p.isExternalDrag || !(n.features?.move ?? !1))
      return;
    p.preventDefault();
    const f = p.currentTarget, _ = Number(f.dataset[t] || 0);
    f.dataset[t] = String(_ + 1);
  }
  function r(p) {
    if (p.isExternalDrag || !(n.features?.move ?? !1))
      return;
    p.preventDefault();
    const f = p.currentTarget, S = Number(f.dataset[t] || 0) - 1;
    S <= 0 ? (delete f.dataset[t], f.classList.remove(...e)) : f.dataset[t] = String(S);
  }
  function d(p, m) {
    if (p.isExternalDrag || !(n.features?.move ?? !1) || !m) return;
    p.preventDefault();
    const _ = p.currentTarget;
    delete _.dataset[t], _.classList.remove(...e);
    const S = p.dataTransfer?.getData("items") || "[]", w = JSON.parse(S).map(
      (y) => o.sortedFiles.get().find((h) => h.path === y)
    );
    o.clearDraggedItem(), n.modal.open(vt, { items: { from: w, to: m } });
  }
  function u(p) {
    return {
      dragover: (m) => l(m, p),
      dragenter: c,
      dragleave: r,
      drop: (m) => d(m, p)
    };
  }
  return { events: u };
}
const Av = { class: "vuefinder__breadcrumb__container" }, Mv = ["title"], Iv = ["title"], Ov = ["title"], Bv = ["title"], Rv = { class: "vuefinder__breadcrumb__path-container" }, Lv = { class: "vuefinder__breadcrumb__list" }, Vv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, zv = { class: "relative" }, Nv = ["title", "onClick"], Hv = ["title"], Uv = { class: "vuefinder__breadcrumb__path-mode" }, jv = { class: "vuefinder__breadcrumb__path-mode-content" }, Kv = ["title"], qv = { class: "vuefinder__breadcrumb__path-text" }, Wv = ["title"], Gv = ["data-theme"], Yv = ["onClick"], Qv = { class: "vuefinder__breadcrumb__hidden-item-content" }, Xv = { class: "vuefinder__breadcrumb__hidden-item-text" }, Jv = /* @__PURE__ */ te({
  __name: "Breadcrumb",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = e.config, l = J(s.state), c = J(o.path), r = J(o.loading), d = T(null), u = go(0, 100), p = T(5), m = T(!1), f = T(!1), _ = H(() => c.value?.breadcrumb ?? []);
    function S(Q, E) {
      return Q.length > E ? [Q.slice(-E), Q.slice(0, -E)] : [Q, []];
    }
    const D = H(
      () => S(_.value, p.value)[0]
    ), w = H(
      () => S(_.value, p.value)[1]
    );
    ue(u, () => {
      if (!d.value) return;
      const Q = d.value.children;
      let E = 0, $ = 0;
      const P = 5, M = 1;
      p.value = P, Oe(() => {
        for (let W = Q.length - 1; W >= 0; W--) {
          const ee = Q[W];
          if (E + ee.offsetWidth > u.value - 40)
            break;
          E += parseInt(ee.offsetWidth.toString(), 10), $++;
        }
        $ < M && ($ = M), $ > P && ($ = P), p.value = $;
      });
    });
    const y = () => {
      d.value && (u.value = d.value.offsetWidth);
    }, h = T(null);
    he(() => {
      h.value = new ResizeObserver(y), d.value && h.value.observe(d.value);
    }), Ae(() => {
      h.value && h.value.disconnect();
    });
    const b = Ct(e, ["vuefinder__drag-over"]);
    function k(Q = null) {
      Q ??= _.value.length - 2;
      const E = {
        basename: c.value?.storage ?? "local",
        extension: "",
        path: (c.value?.storage ?? "local") + "://",
        storage: c.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return _.value[Q] ?? E;
    }
    const C = () => {
      e.adapter.invalidateListQuery(c.value.path), e.adapter.open(c.value.path);
    }, V = () => {
      D.value.length > 0 && e.adapter.open(
        _.value[_.value.length - 2]?.path ?? (c.value?.storage ?? "local") + "://"
      );
    }, R = (Q) => {
      e.adapter.open(Q.path), m.value = !1;
    }, q = () => {
      m.value && (m.value = !1);
    }, B = {
      mounted(Q, E) {
        Q.clickOutsideEvent = function($) {
          Q === $.target || Q.contains($.target) || E.value();
        }, document.body.addEventListener("click", Q.clickOutsideEvent);
      },
      beforeUnmount(Q) {
        document.body.removeEventListener("click", Q.clickOutsideEvent);
      }
    }, F = () => {
      s.toggle("showTreeView");
    }, K = T({
      x: 0,
      y: 0
    }), Y = (Q, E = null) => {
      if (Q.currentTarget instanceof HTMLElement) {
        const { x: $, y: P, height: M } = Q.currentTarget.getBoundingClientRect();
        K.value = { x: $, y: P + M };
      }
      m.value = E ?? !m.value;
    }, z = () => {
      f.value = !f.value;
    }, Z = async () => {
      await bt(c.value?.path || ""), fe.success(t("Path copied to clipboard"));
    }, le = () => {
      f.value = !1;
    };
    return (Q, E) => (v(), g("div", Av, [
      i("span", {
        title: a(t)("Toggle Tree View")
      }, [
        L(a(Sv), {
          class: X(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: F
        }, null, 8, ["class"])
      ], 8, Mv),
      i("span", {
        title: a(t)("Go up a directory")
      }, [
        L(a(vv), Ee({
          class: _.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, nt(_.value.length ? a(b).events(k()) : {}), { onClick: V }), null, 16, ["class"])
      ], 8, Iv),
      a(o).isLoading() ? (v(), g("span", {
        key: 1,
        title: a(t)("Cancel")
      }, [
        L(a(mv), {
          onClick: E[0] || (E[0] = ($) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Bv)) : (v(), g("span", {
        key: 0,
        title: a(t)("Refresh")
      }, [
        L(a(dv), { onClick: C })
      ], 8, Ov)),
      be(i("div", Rv, [
        i("div", null, [
          L(a(wv), Ee({ class: "vuefinder__breadcrumb__home-icon" }, nt(a(b).events(k(-1))), {
            onClick: E[1] || (E[1] = pe(($) => a(e).adapter.open(a(c).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", Lv, [
          w.value.length ? be((v(), g("div", Vv, [
            E[3] || (E[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", zv, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: E[2] || (E[2] = ($) => Y($, !0)),
                onClick: pe(Y, ["stop"])
              }, [
                L(a(Oo), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [B, q]
          ]) : O("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: d,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (v(!0), g(re, null, _e(D.value, ($, P) => (v(), g("div", { key: P }, [
            E[4] || (E[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Ee({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: $.basename
            }, nt(a(b).events($), !0), {
              onClick: pe((M) => a(e).adapter.open($.path), ["stop"])
            }), x($.name), 17, Nv)
          ]))), 128))
        ], 512),
        a(s).get("loadingIndicator") === "circular" && a(r) ? (v(), j(a(Yt), { key: 0 })) : O("", !0),
        i("span", {
          title: a(t)("Toggle Path Copy Mode"),
          onClick: z
        }, [
          L(a(Tv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Hv)
      ], 512), [
        [Xe, !f.value]
      ]),
      be(i("div", Uv, [
        i("div", jv, [
          i("div", {
            title: a(t)("Copy Path")
          }, [
            L(a(Ev), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: Z
            })
          ], 8, Kv),
          i("div", qv, x(a(c).path), 1),
          i("div", {
            title: a(t)("Exit")
          }, [
            L(a(kv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: le
            })
          ], 8, Wv)
        ])
      ], 512), [
        [Xe, f.value]
      ]),
      (v(), j(Ht, { to: "body" }, [
        i("div", null, [
          be(i("div", {
            style: Me({
              position: "absolute",
              top: K.value.y + "px",
              left: K.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (v(!0), g(re, null, _e(w.value, ($, P) => (v(), g("div", Ee({
              key: P,
              class: "vuefinder__breadcrumb__hidden-item"
            }, nt(a(b).events($), !0), {
              onClick: (M) => R($)
            }), [
              i("div", Qv, [
                i("span", null, [
                  L(a(Je), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", Xv, x($.name), 1)
              ])
            ], 16, Yv))), 128))
          ], 12, Gv), [
            [Xe, m.value]
          ])
        ])
      ]))
    ]));
  }
});
function Zv(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: c = 48,
    lockItemsPerRow: r
  } = e, d = n, u = () => typeof s == "number" ? s : s.value, p = T(0), m = T(6), f = T(600);
  let _ = null;
  const S = H(() => Math.ceil(d.value.length / m.value)), D = H(() => S.value * u()), w = H(() => {
    const B = u(), F = Math.max(0, Math.floor(p.value / B) - l), K = Math.min(
      S.value,
      Math.ceil((p.value + f.value) / B) + l
    );
    return { start: F, end: K };
  }), y = H(() => {
    const { start: B, end: F } = w.value;
    return Array.from({ length: F - B }, (K, Y) => B + Y);
  }), h = () => f.value, b = () => r.value, k = () => {
    if (b()) {
      m.value = 1;
      return;
    }
    if (t.value) {
      const B = t.value.clientWidth - c;
      m.value = Math.max(Math.floor(B / o), 2);
    }
  }, C = (B) => {
    const F = B.target;
    p.value = F.scrollTop;
  };
  ue(
    () => d.value.length,
    () => {
      k();
    }
  );
  const V = (B, F) => {
    if (!B || !Array.isArray(B))
      return [];
    const K = F * m.value;
    return B.slice(K, K + m.value);
  }, R = (B, F, K, Y, z) => {
    if (!B || !Array.isArray(B))
      return [];
    const Z = [];
    for (let le = F; le <= K; le++)
      for (let Q = Y; Q <= z; Q++) {
        const E = le * m.value + Q;
        E < B.length && B[E] && Z.push(B[E]);
      }
    return Z;
  }, q = (B) => ({
    row: Math.floor(B / m.value),
    col: B % m.value
  });
  return he(async () => {
    await Oe(), t.value && (f.value = t.value.clientHeight || 600), k(), window.addEventListener("resize", () => {
      t.value && (f.value = t.value.clientHeight || 600), k();
    }), t.value && "ResizeObserver" in window && (_ = new ResizeObserver((B) => {
      const F = B[0];
      F && (f.value = Math.round(F.contentRect.height)), k();
    }), _.observe(t.value));
  }), Ae(() => {
    window.removeEventListener("resize", k), _ && (_.disconnect(), _ = null);
  }), {
    scrollTop: p,
    itemsPerRow: m,
    totalRows: S,
    totalHeight: D,
    visibleRange: w,
    visibleRows: y,
    updateItemsPerRow: k,
    handleScroll: C,
    getRowItems: V,
    getItemsInRange: R,
    getItemPosition: q,
    getContainerHeight: h
  };
}
function ep(n) {
  const { getItemPosition: e, getItemsInRange: t, getKey: o, selectionObject: s, rowHeight: l, itemWidth: c } = n, r = Math.floor(Math.random() * 2 ** 32).toString(), d = se(), u = d.fs, p = J(u.selectedKeys), m = J(u.sortedFiles), f = T(/* @__PURE__ */ new Set()), _ = T(!1), S = T(!1), D = T(null), w = (E) => E.map(($) => $.getAttribute("data-key")).filter(($) => !!$), y = (E) => {
    E.selection.getSelection().forEach(($) => {
      E.selection.deselect($, !0);
    });
  }, h = (E) => {
    p.value && p.value.forEach(($) => {
      const P = document.querySelector(`[data-key="${$}"]`);
      P && b($) && E.selection.select(P, !0);
    });
  }, b = (E) => {
    const $ = m.value?.find((W) => o(W) === E);
    if (!$) return !1;
    const P = d.selectionFilterType, M = d.selectionFilterMimeIncludes;
    return P === "files" && $.type === "dir" || P === "dirs" && $.type === "file" ? !1 : M && Array.isArray(M) && M.length > 0 ? $.type === "dir" ? !0 : $.mime_type ? M.some((W) => $.mime_type?.startsWith(W)) : !1 : !0;
  }, k = (E) => {
    if (E.size === 0) return null;
    const P = Array.from(E).map((ve) => {
      const je = m.value?.findIndex((Ke) => o(Ke) === ve) ?? -1;
      return e(je >= 0 ? je : 0);
    }), M = Math.min(...P.map((ve) => ve.row)), W = Math.max(...P.map((ve) => ve.row)), ee = Math.min(...P.map((ve) => ve.col)), ge = Math.max(...P.map((ve) => ve.col));
    return { minRow: M, maxRow: W, minCol: ee, maxCol: ge };
  }, C = (E) => {
    if (d.selectionMode === "single")
      return !1;
    _.value = !1, !E.event?.metaKey && !E.event?.ctrlKey && (S.value = !0), E.selection.resolveSelectables(), y(E), h(E);
  }, V = T(0), R = (E) => {
    const $ = E;
    if ($ && "touches" in $) {
      const P = $.touches?.[0];
      if (P) return { x: P.clientX, y: P.clientY };
    }
    if ($ && "changedTouches" in $) {
      const P = $.changedTouches?.[0];
      if (P) return { x: P.clientX, y: P.clientY };
    }
    if ($ && "clientX" in $ && "clientY" in $) {
      const P = $;
      return { x: P.clientX, y: P.clientY };
    }
    return null;
  }, q = ({ event: E, selection: $ }) => {
    V.value = (s.value?.getAreaLocation().y1 ?? 0) - (d.root.getBoundingClientRect().top ?? 0);
    const P = document.querySelector(
      ".selection-area-container"
    );
    if (P && (P.dataset.theme = d.theme.current), d.selectionMode === "single")
      return;
    const M = E;
    M && "type" in M && M.type === "touchend" && M.preventDefault();
    const W = E;
    if (!W?.ctrlKey && !W?.metaKey && (u.clearSelection(), $.clearSelection(!0, !0)), f.value.clear(), s.value) {
      const ee = s.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (ee) {
        const ge = ee.getBoundingClientRect(), ve = R(E);
        if (ve) {
          const je = ve.y - ge.top + ee.scrollTop, Ke = ve.x - ge.left, A = Math.floor(je / l.value), ye = Math.floor(Ke / c);
          D.value = { row: A, col: ye };
        }
      }
    }
  }, B = (E) => {
    if (d.selectionMode === "single")
      return;
    const $ = E.selection, P = w(E.store.changed.added), M = w(E.store.changed.removed);
    S.value = !1, _.value = !0, P.forEach((W) => {
      p.value && !p.value.has(W) && b(W) && (f.value.add(W), u.select(W, d.selectionMode || "multiple"));
    }), M.forEach((W) => {
      document.querySelector(`[data-key="${W}"]`) && m.value?.find((ge) => o(ge) === W) && f.value.delete(W), u.deselect(W);
    }), $.resolveSelectables(), h(E);
  }, F = () => {
    f.value.clear();
  }, K = (E) => {
    if (E.event && D.value && f.value.size > 0) {
      const P = Array.from(f.value).map((M) => {
        const W = m.value?.findIndex((ee) => o(ee) === M) ?? -1;
        return W >= 0 ? e(W) : null;
      }).filter((M) => M !== null);
      if (P.length > 0) {
        const M = [...P, D.value], W = {
          minRow: Math.min(...M.map((ee) => ee.row)),
          maxRow: Math.max(...M.map((ee) => ee.row)),
          minCol: Math.min(...M.map((ee) => ee.col)),
          maxCol: Math.max(...M.map((ee) => ee.col))
        };
        t(
          m.value || [],
          W.minRow,
          W.maxRow,
          W.minCol,
          W.maxCol
        ).forEach((ee) => {
          const ge = o(ee);
          document.querySelector(`[data-key="${ge}"]`) || u.select(ge, d.selectionMode || "multiple");
        });
      }
    }
  }, Y = (E) => {
    K(E), y(E), h(E), u.setSelectedCount(p.value?.size || 0), _.value = !1, D.value = null;
  }, z = () => {
    s.value = new as({
      selectables: [".file-item-" + r + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + r],
      selectionContainerClass: "selection-area-container",
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        startThreshold: 0,
        triggers: [0],
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          startScrollMargins: { x: 0, y: 10 }
        }
      },
      features: {
        touch: !0,
        range: !0,
        deselectOnBlur: !0,
        singleTap: {
          allow: !1,
          intersect: "native"
        }
      }
    }), s.value.on("beforestart", C), s.value.on("start", q), s.value.on("move", B), s.value.on("stop", Y);
  }, Z = () => {
    s.value && (s.value.destroy(), s.value = null);
  }, le = () => {
    s.value && (Array.from(
      p.value ?? /* @__PURE__ */ new Set()
    ).forEach(($) => {
      b($) || u.deselect($);
    }), Z(), z());
  }, Q = (E) => {
    S.value && (s.value?.clearSelection(), F(), S.value = !1);
    const $ = E;
    !f.value.size && !S.value && !$?.ctrlKey && !$?.metaKey && (u.clearSelection(), s.value?.clearSelection());
  };
  return he(() => {
    const E = ($) => {
      !$.buttons && _.value && (_.value = !1);
    };
    document.addEventListener("dragleave", E), Ae(() => {
      document.removeEventListener("dragleave", E);
    });
  }), {
    isDragging: _,
    selectionStarted: S,
    explorerId: r,
    extractIds: w,
    cleanupSelection: y,
    refreshSelection: h,
    getSelectionRange: k,
    selectSelectionRange: K,
    initializeSelectionArea: z,
    destroySelectionArea: Z,
    updateSelectionArea: le,
    handleContentClick: Q
  };
}
const tp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function np(n, e) {
  return v(), g("svg", tp, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const op = { render: np }, sp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ip(n, e) {
  return v(), g("svg", sp, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ap = { render: ip }, sn = /* @__PURE__ */ te({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (v(), g("div", null, [
      n.direction === "asc" ? (v(), j(a(op), { key: 0 })) : O("", !0),
      n.direction === "desc" ? (v(), j(a(ap), { key: 1 })) : O("", !0)
    ]));
  }
}), rp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function lp(n, e) {
  return v(), g("svg", rp, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Yn = { render: lp }, cp = { class: "vuefinder__drag-item__container" }, dp = { class: "vuefinder__drag-item__count" }, up = /* @__PURE__ */ te({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (v(), g("div", cp, [
      e.count > 1 ? (v(), j(a(Yn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : O("", !0),
      L(a(Yn), { class: "vuefinder__drag-item__icon" }),
      i("div", dp, x(e.count), 1)
    ]));
  }
}), fp = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Qn = /* @__PURE__ */ te({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(n) {
    const e = n, t = se(), o = J(t.config.state), s = {
      app: t,
      config: o.value,
      item: e.item
    };
    return (l, c) => (v(), g("div", {
      class: X(["vuefinder__item-icon", n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      me(l.$slots, "icon", qe(st(s)), () => [
        n.item.type === "dir" ? (v(), j(a(Je), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (v(), j(a(At), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (v(), g("div", fp, x(n.item.extension.substring(0, 3)), 1)) : O("", !0)
      ])
    ], 2));
  }
}), vp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function pp(n, e) {
  return v(), g("svg", vp, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Xn = { render: pp }, hp = ["data-key", "data-row", "data-col", "draggable"], mp = { key: 0 }, _p = { class: "vuefinder__explorer__item-grid-content" }, gp = ["data-src", "alt"], wp = { class: "vuefinder__explorer__item-title" }, yp = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, bp = { class: "vuefinder__explorer__item-list-name" }, kp = { class: "vuefinder__explorer__item-list-icon" }, xp = { class: "vuefinder__explorer__item-name" }, $p = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Sp = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Cp = { key: 0 }, Dp = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Ep = /* @__PURE__ */ te({
  __name: "FileItem",
  props: {
    item: {},
    view: {},
    compact: { type: Boolean },
    showThumbnails: { type: Boolean },
    isSelected: { type: Boolean },
    isDragging: { type: Boolean },
    rowIndex: {},
    colIndex: {},
    showPath: { type: Boolean },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = se(), l = s.fs, c = s.config, r = H(() => {
      const b = s.selectionFilterType;
      return !b || b === "both" ? !0 : b === "files" && t.item.type === "file" || b === "dirs" && t.item.type === "dir";
    }), d = H(() => {
      const b = s.selectionFilterMimeIncludes;
      return !b || !b.length || t.item.type === "dir" ? !0 : t.item.mime_type ? b.some((k) => t.item.mime_type?.startsWith(k)) : !1;
    }), u = H(() => r.value && d.value), p = H(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      u.value ? "" : "vf-explorer-item--unselectable"
    ]), m = H(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !u.value ? 0.5 : ""
    }));
    let f = null;
    const _ = T(null);
    let S = !1;
    const { enabled: D } = Ue(), w = H(() => D("move")), y = () => {
      f && clearTimeout(f);
    }, h = (b) => {
      if (f && (b.preventDefault(), clearTimeout(f)), !S)
        S = !0, o("click", b), _.value = setTimeout(() => {
          S = !1;
        }, 300);
      else
        return S = !1, o("dblclick", b), f && clearTimeout(f), !1;
      if (b.currentTarget && b.currentTarget instanceof HTMLElement) {
        const k = b.currentTarget.getBoundingClientRect();
        b.preventDefault(), f = setTimeout(() => {
          let R = k.y + k.height;
          R + 146 > window.innerHeight - 10 && (R = k.y - 146), R < 10 && (R = 10);
          const q = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: R
          });
          b.target?.dispatchEvent(q);
        }, 300);
      }
    };
    return (b, k) => (v(), g("div", {
      class: X(p.value),
      style: Me(m.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: w.value,
      onTouchstart: k[1] || (k[1] = (C) => h(C)),
      onTouchend: k[2] || (k[2] = (C) => y()),
      onClick: k[3] || (k[3] = (C) => o("click", C)),
      onDblclick: k[4] || (k[4] = (C) => o("dblclick", C)),
      onContextmenu: k[5] || (k[5] = pe((C) => o("contextmenu", C), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (C) => o("dragstart", C)),
      onDragend: k[7] || (k[7] = (C) => o("dragend", C))
    }, [
      n.view === "grid" ? (v(), g("div", mp, [
        a(l).isReadOnly(n.item) ? (v(), j(a(Xn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : O("", !0),
        i("div", _p, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (v(), g("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? a(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: k[0] || (k[0] = (C) => C.preventDefault())
          }, null, 40, gp)) : (v(), j(Qn, {
            key: 1,
            item: n.item,
            ext: !0
          }, {
            icon: oe((C) => [
              me(b.$slots, "icon", qe(st(C)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", wp, x(a(un)(n.item.basename)), 1)
      ])) : (v(), g("div", yp, [
        i("div", bp, [
          i("div", kp, [
            L(Qn, {
              item: n.item,
              small: n.compact
            }, {
              icon: oe((C) => [
                me(b.$slots, "icon", qe(st(C)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", xp, x(n.item.basename), 1),
          i("div", null, [
            a(l).isReadOnly(n.item) ? (v(), j(a(Xn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : O("", !0)
          ])
        ]),
        n.showPath ? (v(), g("div", $p, x(n.item.path), 1)) : O("", !0),
        n.showPath ? O("", !0) : (v(), g("div", Sp, [
          n.item.file_size ? (v(), g("div", Cp, x(a(s).filesize(n.item.file_size)), 1)) : O("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (v(), g("div", Dp, x(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : O("", !0)
      ])),
      a(D)("pinned") && a(c).get("pinnedFolders").find((C) => C.path === n.item.path) ? (v(), j(a(gn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : O("", !0)
    ], 46, hp));
  }
}), Fp = ["data-row"], Jn = /* @__PURE__ */ te({
  __name: "FileRow",
  props: {
    rowIndex: {},
    rowHeight: {},
    view: {},
    itemsPerRow: {},
    items: {},
    compact: { type: Boolean },
    showThumbnails: { type: Boolean },
    showPath: { type: Boolean },
    isDraggingItem: { type: Function },
    isSelected: { type: Function },
    dragNDropEvents: { type: Function },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = H(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = H(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), c = H(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, d) => (v(), g("div", {
      class: X(s.value),
      "data-row": n.rowIndex,
      style: Me(l.value)
    }, [
      i("div", {
        class: X(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Me(c.value)
      }, [
        (v(!0), g(re, null, _e(n.items, (u, p) => (v(), j(Ep, Ee({
          key: u.path,
          item: u,
          view: n.view,
          compact: n.compact,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(u.path),
          "is-dragging": n.isDraggingItem(u.path),
          "row-index": n.rowIndex,
          "col-index": p,
          "explorer-id": n.explorerId
        }, nt(n.dragNDropEvents(u)), {
          onClick: d[0] || (d[0] = (m) => o("click", m)),
          onDblclick: d[1] || (d[1] = (m) => o("dblclick", m)),
          onContextmenu: d[2] || (d[2] = (m) => o("contextmenu", m)),
          onDragstart: d[3] || (d[3] = (m) => o("dragstart", m)),
          onDragend: d[4] || (d[4] = (m) => o("dragend", m))
        }), {
          icon: oe((m) => [
            me(r.$slots, "icon", Ee({ ref_for: !0 }, m))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Fp));
  }
}), Pp = { class: "vuefinder__explorer__container" }, Tp = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Ap = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Mp = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Ip = /* @__PURE__ */ te({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = se(), o = Ct(t, ["vuefinder__drag-over"]), s = tt("dragImage"), l = Zn(null), c = tt("scrollContainer"), r = tt("scrollContent"), d = t.fs, u = t.config, p = J(u.state), m = J(d.sort), f = J(d.sortedFiles), _ = J(d.selectedKeys), S = J(d.loading), D = (N) => _.value?.has(N) ?? !1;
    let w = null;
    const y = T(null), h = tt("customScrollBar"), b = tt("customScrollBarContainer"), k = H(() => {
      const N = p.value.view, ie = p.value.compactListView;
      return N === "grid" ? 88 : ie ? 24 : 50;
    }), { t: C } = t.i18n, {
      itemsPerRow: V,
      totalHeight: R,
      visibleRows: q,
      handleScroll: B,
      getRowItems: F,
      getItemsInRange: K,
      getItemPosition: Y,
      updateItemsPerRow: z
    } = Zv(
      H(() => f.value ?? []),
      {
        scrollContainer: c,
        itemWidth: 104,
        rowHeight: k,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: H(() => p.value.view === "list")
      }
    ), {
      explorerId: Z,
      isDragging: le,
      initializeSelectionArea: Q,
      destroySelectionArea: E,
      updateSelectionArea: $,
      handleContentClick: P
    } = ep({
      getItemPosition: Y,
      getItemsInRange: K,
      getKey: (N) => N.path,
      selectionObject: l,
      rowHeight: k,
      itemWidth: 104
    }), M = T(null), W = (N) => {
      if (!N || !M.value) return !1;
      const ie = _.value?.has(M.value) ?? !1;
      return le.value && (ie ? _.value?.has(N) ?? !1 : N === M.value);
    };
    ue(
      () => u.get("view"),
      (N) => {
        N === "list" ? V.value = 1 : z();
      },
      { immediate: !0 }
    ), ue(V, (N) => {
      u.get("view") === "list" && N !== 1 && (V.value = 1);
    });
    const ee = (N) => f.value?.[N];
    he(() => {
      if (Q(), l.value && l.value.on("beforestart", ({ event: N }) => {
        const ie = N?.target === r.value;
        if (!N?.metaKey && !N?.ctrlKey && !N?.altKey && !ie)
          return !1;
      }), c.value && (w = new no({
        elements_selector: ".lazy",
        container: c.value
      })), ue(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], $, {
        deep: !0
      }), b.value) {
        const N = Ut(
          b.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (ie) => {
              y.value = ie;
            },
            scroll: (ie) => {
              const { scrollOffsetElement: ae } = ie.elements();
              c.value && c.value.scrollTo({
                top: ae.scrollTop,
                left: 0
              });
            }
          }
        );
        y.value = N;
      }
      c.value && c.value.addEventListener("scroll", () => {
        const N = y.value;
        if (!N) return;
        const { scrollOffsetElement: ie } = N.elements();
        ie.scrollTo({
          top: c.value.scrollTop,
          left: 0
        });
      });
    }), he(() => {
      t.emitter.on("vf-refresh-thumbnails", () => {
        w && w.update();
      });
    }), Xo(() => {
      if (w && w.update(), y.value && h.value && c.value) {
        const ie = c.value.scrollHeight > c.value.clientHeight, ae = h.value;
        ae.style.display = ie ? "block" : "none", ae.style.height = `${R.value}px`;
      }
    }), Ae(() => {
      E(), w && (w.destroy(), w = null), y.value && (y.value.destroy(), y.value = null);
    });
    const ge = (N) => {
      const ie = N.target?.closest(".file-item-" + Z), ae = N;
      if (ie) {
        const I = String(ie.getAttribute("data-key")), U = f.value?.find((at) => at.path === I), G = t.selectionFilterType, ne = t.selectionFilterMimeIncludes, xe = !G || G === "both" || G === "files" && U?.type === "file" || G === "dirs" && U?.type === "dir";
        let ke = !0;
        if (ne && Array.isArray(ne) && ne.length > 0 && (U?.type === "dir" ? ke = !0 : U?.mime_type ? ke = ne.some((at) => (U?.mime_type).startsWith(at)) : ke = !1), !xe || !ke)
          return;
        const Le = t.selectionMode || "multiple";
        !ae?.ctrlKey && !ae?.metaKey && (N.type !== "touchstart" || !d.isSelected(I)) && (d.clearSelection(), l.value?.clearSelection(!0, !0)), l.value?.resolveSelectables(), N.type === "touchstart" && d.isSelected(I) ? d.select(I, Le) : d.toggleSelect(I, Le);
      }
      d.setSelectedCount(_.value?.size || 0);
    };
    function ve(N) {
      return {
        item: N,
        defaultPrevented: !1,
        preventDefault() {
          this.defaultPrevented = !0;
        }
      };
    }
    const je = (N) => {
      const ie = ve(N);
      if (N.type === "file" && e.onFileDclick) {
        if (t.emitter.emit("vf-file-dclick", ie), ie.defaultPrevented) return;
      } else if (N.type === "dir" && e.onFolderDclick && (t.emitter.emit("vf-folder-dclick", ie), ie.defaultPrevented))
        return;
      const ae = t.contextMenuItems?.find((I) => I.show(t, {
        items: [N],
        target: N,
        searchQuery: ""
      }));
      ae && ae.action(t, [N]);
    }, Ke = (N) => {
      const ie = N.target?.closest(
        ".file-item-" + Z
      ), ae = ie ? String(ie.getAttribute("data-key")) : null;
      if (!ae) return;
      const I = f.value?.find((ke) => ke.path === ae), U = t.selectionFilterType, G = t.selectionFilterMimeIncludes, ne = !U || U === "both" || U === "files" && I?.type === "file" || U === "dirs" && I?.type === "dir";
      let xe = !0;
      G && Array.isArray(G) && G.length > 0 && (I?.type === "dir" ? xe = !0 : I?.mime_type ? xe = G.some((ke) => (I?.mime_type).startsWith(ke)) : xe = !1), !(!ne || !xe) && I && je(I);
    }, A = () => {
      const N = _.value;
      return f.value?.filter((ie) => N?.has(ie.path)) || [];
    }, ye = (N) => {
      N.preventDefault();
      const ie = N.target?.closest(
        ".file-item-" + Z
      );
      if (ie) {
        const ae = String(ie.getAttribute("data-key")), I = f.value?.find((ke) => ke.path === ae), U = t.selectionFilterType, G = t.selectionFilterMimeIncludes, ne = !U || U === "both" || U === "files" && I?.type === "file" || U === "dirs" && I?.type === "dir";
        let xe = !0;
        if (G && Array.isArray(G) && G.length > 0 && (I?.type === "dir" ? xe = !0 : I?.mime_type ? xe = G.some(
          (ke) => (I?.mime_type).startsWith(ke)
        ) : xe = !1), !ne || !xe)
          return;
        _.value?.has(ae) || (d.clearSelection(), d.select(ae)), t.emitter.emit("vf-contextmenu-show", {
          event: N,
          items: A(),
          target: I
        });
      }
    }, ce = (N) => {
      N.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: N, items: A() });
    }, we = (N) => {
      if (!(t.features?.move ?? !1) || N.altKey || N.ctrlKey || N.metaKey)
        return N.preventDefault(), !1;
      le.value = !0;
      const ae = N.target?.closest(
        ".file-item-" + Z
      );
      if (M.value = ae ? String(ae.dataset.key) : null, N.dataTransfer && M.value) {
        N.dataTransfer.setDragImage(s.value, 0, 15), N.dataTransfer.effectAllowed = "all", N.dataTransfer.dropEffect = "copy";
        const I = _.value?.has(M.value) ? Array.from(_.value) : [M.value];
        N.dataTransfer.setData("items", JSON.stringify(I)), d.setDraggedItem(M.value);
      }
    }, Se = () => {
      M.value = null;
    };
    return (N, ie) => (v(), g("div", Pp, [
      i("div", {
        ref: "customScrollBarContainer",
        class: X(["vuefinder__explorer__scrollbar-container", [{ "grid-view": a(p).view === "grid" }]])
      }, [
        i("div", Tp, null, 512)
      ], 2),
      a(p).view === "list" ? (v(), g("div", Ap, [
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: ie[0] || (ie[0] = (ae) => a(d).toggleSort("basename"))
        }, [
          de(x(a(C)("Name")) + " ", 1),
          be(L(sn, {
            direction: a(m).order
          }, null, 8, ["direction"]), [
            [Xe, a(m).active && a(m).column === "basename"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: ie[1] || (ie[1] = (ae) => a(d).toggleSort("file_size"))
        }, [
          de(x(a(C)("Size")) + " ", 1),
          be(L(sn, {
            direction: a(m).order
          }, null, 8, ["direction"]), [
            [Xe, a(m).active && a(m).column === "file_size"]
          ])
        ]),
        i("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: ie[2] || (ie[2] = (ae) => a(d).toggleSort("last_modified"))
        }, [
          de(x(a(C)("Date")) + " ", 1),
          be(L(sn, {
            direction: a(m).order
          }, null, 8, ["direction"]), [
            [Xe, a(m).active && a(m).column === "last_modified"]
          ])
        ])
      ])) : O("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: c,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + a(Z)]),
        onScroll: ie[4] || (ie[4] = //@ts-ignore
        (...ae) => a(B) && a(B)(...ae))
      }, [
        a(u).get("loadingIndicator") === "linear" && a(S) ? (v(), g("div", Mp)) : O("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Me({ height: `${a(R)}px`, position: "relative", width: "100%" }),
          onContextmenu: pe(ce, ["self", "prevent"]),
          onClick: ie[3] || (ie[3] = pe(
            //@ts-ignore
            (...ae) => a(P) && a(P)(...ae),
            ["self"]
          ))
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            L(up, {
              count: M.value && a(_).has(M.value) ? a(_).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(p).view === "grid" ? (v(!0), g(re, { key: 0 }, _e(a(q), (ae) => (v(), j(Jn, {
            key: ae,
            "row-index": ae,
            "row-height": k.value,
            view: "grid",
            "items-per-row": a(V),
            items: a(F)(a(f), ae),
            "show-thumbnails": a(p).showThumbnails,
            "is-dragging-item": W,
            "is-selected": D,
            "drag-n-drop-events": (I) => a(o).events(I),
            "explorer-id": a(Z),
            onClick: ge,
            onDblclick: Ke,
            onContextmenu: ye,
            onDragstart: we,
            onDragend: Se
          }, {
            icon: oe((I) => [
              me(N.$slots, "icon", Ee({ ref_for: !0 }, I))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (v(!0), g(re, { key: 1 }, _e(a(q), (ae) => (v(), j(Jn, {
            key: ae,
            "row-index": ae,
            "row-height": k.value,
            view: "list",
            items: ee(ae) ? [ee(ae)] : [],
            compact: a(p).compactListView,
            "is-dragging-item": W,
            "is-selected": D,
            "drag-n-drop-events": (I) => a(o).events(I),
            "explorer-id": a(Z),
            onClick: ge,
            onDblclick: Ke,
            onContextmenu: ye,
            onDragstart: we,
            onDragend: Se
          }, {
            icon: oe((I) => [
              me(N.$slots, "icon", Ee({ ref_for: !0 }, I))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34)
    ]));
  }
}), Op = ["href", "download"], Bp = ["onClick"], Rp = /* @__PURE__ */ te({
  __name: "ContextMenu",
  setup(n) {
    const e = se(), t = T(null), o = T([]), s = Nt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (d) => {
      o.value = d;
    });
    const l = (d) => d.link(e, o.value), c = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", (d) => {
      const { event: u, items: p, target: m = null } = d || {};
      s.items = (e.contextMenuItems || []).filter((f) => f.show(e, {
        items: p,
        target: m
      })), m ? p.length > 1 && p.some((f) => f.path === m.path) ? e.emitter.emit("vf-context-selected", p) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), r(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      s.active = !1;
    });
    const r = (d) => {
      const u = e.root, p = u?.getBoundingClientRect?.(), m = u?.getBoundingClientRect?.();
      let f = d.clientX - (p?.left ?? 0), _ = d.clientY - (p?.top ?? 0);
      s.active = !0, Oe(() => {
        const S = t.value?.getBoundingClientRect(), D = S?.height ?? 0, w = S?.width ?? 0;
        f = m && m.right - d.pageX + window.scrollX < w ? f - w : f, _ = m && m.bottom - d.pageY + window.scrollY < D ? _ - D : _, s.positions = {
          left: String(f) + "px",
          top: String(_) + "px"
        };
      });
    };
    return (d, u) => be((v(), g("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: X([{
        "vuefinder__context-menu--active": s.active,
        "vuefinder__context-menu--inactive": !s.active
      }, "vuefinder__context-menu"]),
      style: Me(s.positions)
    }, [
      (v(!0), g(re, null, _e(s.items, (p) => (v(), g("li", {
        key: p.title,
        class: "vuefinder__context-menu__item"
      }, [
        p.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: l(p),
          download: l(p),
          onClick: u[0] || (u[0] = (m) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, x(p.title(a(e).i18n)), 1)
        ], 8, Op)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (m) => c(p)
        }, [
          i("span", null, x(p.title(a(e).i18n)), 1)
        ], 8, Bp))
      ]))), 128))
    ], 6)), [
      [Xe, s.active]
    ]);
  }
}), Lp = { class: "vuefinder__status-bar__wrapper" }, Vp = { class: "vuefinder__status-bar__storage" }, zp = ["title"], Np = { class: "vuefinder__status-bar__storage-icon" }, Hp = ["value"], Up = ["value"], jp = { class: "vuefinder__status-bar__info space-x-2" }, Kp = { key: 0 }, qp = { key: 1 }, Wp = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Gp = { class: "vuefinder__status-bar__actions" }, Yp = /* @__PURE__ */ te({
  __name: "Statusbar",
  setup(n) {
    const e = se(), { t } = e.i18n, o = e.fs, s = J(o.sortedFiles), l = J(o.path), c = J(o.selectedCount), r = J(o.storages), d = J(o.selectedItems), u = J(o.path), p = (w) => {
      const y = w.target.value;
      e.adapter.open(y + "://");
    }, m = H(() => !d.value || d.value.length === 0 ? 0 : d.value.reduce((w, y) => w + (y.file_size || 0), 0)), f = H(() => r.value), _ = H(() => s.value), S = H(() => c.value || 0), D = H(() => d.value || []);
    return (w, y) => (v(), g("div", Lp, [
      i("div", Vp, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          i("div", Np, [
            L(a(wn))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: p
          }, [
            (v(!0), g(re, null, _e(f.value, (h) => (v(), g("option", {
              key: h,
              value: h
            }, x(h), 9, Up))), 128))
          ], 40, Hp),
          y[0] || (y[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, zp),
        i("div", jp, [
          S.value === 0 ? (v(), g("span", Kp, x(_.value.length) + " " + x(a(t)("items")), 1)) : (v(), g("span", qp, [
            de(x(S.value) + " " + x(a(t)("selected")) + " ", 1),
            m.value ? (v(), g("span", Wp, x(a(e).filesize(m.value)), 1)) : O("", !0)
          ]))
        ])
      ]),
      i("div", Gp, [
        me(w.$slots, "actions", {
          path: a(u).path,
          count: S.value || 0,
          selected: D.value
        })
      ])
    ]));
  }
}), Qp = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Xp(n, e) {
  return v(), g("svg", Qp, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Jp = { render: Xp };
function Uo(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const Zp = { class: "vuefinder__folder-loader-indicator" }, eh = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, jo = /* @__PURE__ */ te({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Jo({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = se(), o = to(n, "modelValue"), s = T(!1);
    ue(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((d) => d.type === "dir");
        Uo(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (c) {
        Be(c, "Failed to fetch subfolders");
      } finally {
        s.value = !1;
      }
    };
    return (c, r) => (v(), g("div", Zp, [
      s.value ? (v(), j(a(Yt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (v(), g("div", eh, [
        o.value ? (v(), j(a(Gt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : O("", !0),
        o.value ? O("", !0) : (v(), j(a(Wt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), th = { key: 0 }, nh = { class: "vuefinder__treesubfolderlist__no-folders" }, oh = { class: "vuefinder__treesubfolderlist__item-content" }, sh = ["onClick"], ih = ["title", "onDblclick", "onClick"], ah = { class: "vuefinder__treesubfolderlist__item-icon" }, rh = { class: "vuefinder__treesubfolderlist__subfolder" }, lh = /* @__PURE__ */ te({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = se(), t = e.fs, o = Ct(e, ["vuefinder__drag-over"]), s = T({}), { t: l } = e.i18n, c = J(t.path), r = n, d = T(null);
    he(() => {
      r.path === r.storage + "://" && d.value && Ut(d.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const u = H(() => e.treeViewData.find((m) => m.path === r.path)?.folders || []);
    return (p, m) => {
      const f = eo("TreeSubfolderList", !0);
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: d,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        u.value.length ? O("", !0) : (v(), g("li", th, [
          i("div", nh, x(a(l)("No folders")), 1)
        ])),
        (v(!0), g(re, null, _e(u.value, (_) => (v(), g("li", {
          key: _.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", oh, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => s.value[_.path] = !s.value[_.path]
            }, [
              L(jo, {
                modelValue: s.value[_.path],
                "onUpdate:modelValue": (S) => s.value[_.path] = S,
                storage: n.storage,
                path: _.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, sh),
            i("div", Ee({
              class: "vuefinder__treesubfolderlist__item-link",
              title: _.path
            }, nt(
              a(o).events({
                ..._,
                dir: _.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (S) => s.value[_.path] = !s.value[_.path],
              onClick: (S) => a(e).adapter.open(_.path)
            }), [
              i("div", ah, [
                a(c)?.path === _.path ? (v(), j(a(yn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (v(), j(a(Je), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(c).path === _.path
                }])
              }, x(_.basename), 3)
            ], 16, ih)
          ]),
          i("div", rh, [
            be(L(f, {
              storage: r.storage,
              path: _.path
            }, null, 8, ["storage", "path"]), [
              [Xe, s.value[_.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), ch = /* @__PURE__ */ te({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = se(), t = e.fs, o = T(!1), s = n, l = Ct(e, ["vuefinder__drag-over"]), c = J(t.path), r = H(() => s.storage === c.value?.storage), d = {
      storage: s.storage,
      path: s.storage + "://",
      dir: s.storage + "://",
      type: "dir",
      basename: s.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function u(p) {
      p === c.value?.storage ? o.value = !o.value : e.adapter.open(p + "://");
    }
    return (p, m) => (v(), g(re, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: m[2] || (m[2] = (f) => u(n.storage))
      }, [
        i("div", Ee({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, nt(a(l).events(d), !0)), [
          i("div", {
            class: X(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            L(a(wn))
          ], 2),
          i("div", null, x(n.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: m[1] || (m[1] = pe((f) => o.value = !o.value, ["stop"]))
        }, [
          L(jo, {
            modelValue: o.value,
            "onUpdate:modelValue": m[0] || (m[0] = (f) => o.value = f),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      be(L(lh, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Xe, o.value]
      ])
    ], 64));
  }
}), dh = { class: "vuefinder__folder-indicator" }, uh = { class: "vuefinder__folder-indicator--icon" }, fh = /* @__PURE__ */ te({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = to(n, "modelValue");
    return (t, o) => (v(), g("div", dh, [
      i("div", uh, [
        e.value ? (v(), j(a(Gt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : O("", !0),
        e.value ? O("", !0) : (v(), j(a(Wt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), vh = {
  key: 0,
  class: "vuefinder__treeview__header"
}, ph = { class: "vuefinder__treeview__pinned-label" }, hh = { class: "vuefinder__treeview__pin-text text-nowrap" }, mh = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, _h = ["onClick"], gh = ["title"], wh = ["onClick"], yh = { key: 0 }, bh = { class: "vuefinder__treeview__no-pinned" }, kh = /* @__PURE__ */ te({
  __name: "TreeView",
  setup(n) {
    const e = se(), { enabled: t } = Ue(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, c = e.fs, r = e.config, d = J(r.state), u = J(c.sortedFiles), p = J(c.storages), m = H(() => p.value || []), f = J(c.path), _ = Ct(e, ["vuefinder__drag-over"]), S = T(190), D = T(s("pinned-folders-opened", !0));
    ue(D, (b) => l("pinned-folders-opened", b));
    const w = (b) => {
      const k = r.get("pinnedFolders");
      r.set("pinnedFolders", k.filter((C) => C.path !== b.path));
    }, y = (b) => {
      const k = b.clientX, C = b.target.parentElement;
      if (!C) return;
      const V = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const R = (B) => {
        S.value = V + B.clientX - k, S.value < 50 && (S.value = 0, r.set("showTreeView", !1)), S.value > 50 && r.set("showTreeView", !0);
      }, q = () => {
        const B = C.getBoundingClientRect();
        S.value = B.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", R), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", R), window.addEventListener("mouseup", q);
    }, h = T(null);
    return he(() => {
      h.value && Ut(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ue(u, (b) => {
      const k = b.filter((C) => C.type === "dir");
      Uo(e.treeViewData, {
        path: f.value.path || "",
        folders: k.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (b, k) => (v(), g(re, null, [
      i("div", {
        class: X(["vuefinder__treeview__overlay", a(d).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: k[0] || (k[0] = (C) => a(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Me(
          a(d).showTreeView ? "min-width:100px;max-width:75%; width: " + S.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: h,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (v(), g("div", vh, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: k[2] || (k[2] = (C) => D.value = !D.value)
            }, [
              i("div", ph, [
                L(a(gn), { class: "vuefinder__treeview__pin-icon" }),
                i("div", hh, x(a(o)("Pinned Folders")), 1)
              ]),
              L(fh, {
                modelValue: D.value,
                "onUpdate:modelValue": k[1] || (k[1] = (C) => D.value = C)
              }, null, 8, ["modelValue"])
            ]),
            D.value ? (v(), g("ul", mh, [
              (v(!0), g(re, null, _e(a(d).pinnedFolders, (C) => (v(), g("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Ee({ class: "vuefinder__treeview__pinned-folder" }, nt(a(_).events(C), !0), {
                  onClick: (V) => a(e).adapter.open(C.path)
                }), [
                  a(f).path !== C.path ? (v(), j(a(Je), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : O("", !0),
                  a(f).path === C.path ? (v(), j(a(yn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : O("", !0),
                  i("div", {
                    title: C.path,
                    class: X(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(f).path === C.path
                    }])
                  }, x(C.basename), 11, gh)
                ], 16, _h),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (V) => w(C)
                }, [
                  L(a(Jp), { class: "vuefinder__treeview__remove-icon" })
                ], 8, wh)
              ]))), 128)),
              a(d).pinnedFolders.length ? O("", !0) : (v(), g("li", yh, [
                i("div", bh, x(a(o)("No folders pinned")), 1)
              ]))
            ])) : O("", !0)
          ])) : O("", !0),
          (v(!0), g(re, null, _e(m.value, (C) => (v(), g("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            L(ch, { storage: C }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: y
        }, null, 32)
      ], 4)
    ], 64));
  }
}), De = {
  new_folder: "new_folder",
  selectAll: "selectAll",
  pinFolder: "pinFolder",
  unpinFolder: "unpinFolder",
  delete: "delete",
  refresh: "refresh",
  preview: "preview",
  open: "open",
  openDir: "openDir",
  download: "download",
  download_archive: "download_archive",
  archive: "archive",
  unarchive: "unarchive",
  rename: "rename",
  move: "move",
  copy: "copy",
  paste: "paste"
};
function xh(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function $e(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== xh(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function gt(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function wt(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const Ko = [
  {
    id: De.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: $e({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: De.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: gt($e({ target: "none" }), $e({ target: "many" }))
  },
  {
    id: De.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && $e({ target: "none" })(n, e)
  },
  {
    id: De.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(En),
    show: $e({ target: "none", feature: "newfolder" })
  },
  {
    id: De.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: $e({ target: "one", targetType: "dir" })
  },
  {
    id: De.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders"), s = o.concat(
        e.filter(
          (l) => o.findIndex((c) => c.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: wt($e({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1)
  },
  {
    id: De.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        o.filter(
          (s) => !e.find((l) => l.path === s.path)
        )
      );
    },
    show: wt($e({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1)
  },
  {
    id: De.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(qt, { storage: e[0]?.storage, item: e[0] }),
    show: wt(
      $e({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: De.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: wt(
      $e({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    )
  },
  {
    id: De.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Kt, { items: e }),
    show: $e({ target: "one", feature: "rename" })
  },
  {
    id: De.move,
    title: ({ t: n }) => n("Move"),
    action: (n, e) => {
      const t = n.fs, o = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(vt, { items: { from: e, to: o } });
    },
    show: gt(
      $e({ target: "one", feature: "move" }),
      $e({ target: "many", feature: "move" })
    )
  },
  {
    id: De.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: gt(
      $e({ target: "one", feature: "copy" }),
      $e({ target: "many", feature: "copy" })
    )
  },
  {
    id: De.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const s = n.fs.path.get();
        let l = s.path, c = s.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, c = e[0].storage);
        const r = {
          storage: c || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? vt : kn, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: De.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(Tn, { items: e }),
    show: gt(
      $e({ target: "many", feature: "archive" }),
      wt(
        $e({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: De.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(Pn, { items: e }),
    show: $e({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: De.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(jt, { items: e });
    },
    show: gt(
      $e({ feature: "delete", target: "one" }),
      $e({ feature: "delete", target: "many" })
    )
  }
], $h = ["data-theme"], Sh = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Ch = { class: "vuefinder__external-drop-message" }, Dh = { class: "vuefinder__main__content" }, Eh = /* @__PURE__ */ te({
  __name: "VueFinderView",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean },
    locale: {},
    contextMenuItems: {},
    selectionMode: {},
    selectionFilterType: {},
    selectionFilterMimeIncludes: {},
    onError: { type: Function },
    onSelect: { type: Function },
    onPathChange: { type: Function },
    onUploadComplete: { type: Function },
    onDeleteComplete: { type: Function },
    onReady: { type: Function },
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function },
    customUploader: { type: Function }
  },
  emits: [
    "select",
    "path-change",
    "upload-complete",
    "delete-complete",
    "error",
    "ready",
    "file-dclick",
    "folder-dclick"
  ],
  setup(n, { emit: e }) {
    const t = e, o = n, s = se(), l = tt("root"), c = s.config;
    ue(
      () => o.features,
      (w) => {
        const y = ro(w);
        Object.keys(s.features).forEach((h) => {
          delete s.features[h];
        }), Object.assign(s.features, y);
      },
      { deep: !0 }
    );
    const r = s.fs, d = J(c.state);
    Td();
    const { isDraggingExternal: u, handleDragEnter: p, handleDragOver: m, handleDragLeave: f, handleDrop: _ } = Ad();
    function S(w) {
      r.setPath(w.dirname), c.get("persist") && c.set("path", w.dirname), r.setReadOnly(w.read_only ?? !1), s.modal.close(), r.setFiles(w.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(w.storages);
    }
    s.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, s.adapter.onAfterOpen = (w) => {
      S(w), r.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (w) => {
      t("upload-complete", w);
    }), s.emitter.on("vf-delete-complete", (w) => {
      t("delete-complete", w);
    }), s.emitter.on("vf-file-dclick", (w) => {
      t("file-dclick", w);
    }), s.emitter.on("vf-folder-dclick", (w) => {
      t("folder-dclick", w);
    }), ue(
      () => o.config?.theme,
      (w) => {
        w && c.set("theme", a(w));
      },
      { immediate: !0 }
    ), he(() => {
      s.root = l.value, ue(
        () => c.get("path"),
        (y) => {
          s.adapter.open(y);
        }
      );
      const w = c.get("persist") ? c.get("path") : c.get("initialPath") ?? "";
      r.setPath(w), s.adapter.open(w), r.path.listen((y) => {
        t("path-change", y.path);
      }), r.selectedItems.listen((y) => {
        t("select", y);
      }), t("ready");
    });
    const D = async (w) => {
      const y = await _(w);
      y.length > 0 && (s.modal.open(Fn), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          y.map((h) => h.file)
        );
      }, 100));
    };
    return (w, y) => (v(), g("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: X(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(u) }]),
      "data-theme": a(s).theme.current,
      onDragenter: y[2] || (y[2] = //@ts-ignore
      (...h) => a(p) && a(p)(...h)),
      onDragover: y[3] || (y[3] = //@ts-ignore
      (...h) => a(m) && a(m)(...h)),
      onDragleave: y[4] || (y[4] = //@ts-ignore
      (...h) => a(f) && a(f)(...h)),
      onDrop: D
    }, [
      i("div", {
        class: X(a(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: X([
            a(d)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: y[0] || (y[0] = (h) => a(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: y[1] || (y[1] = (h) => a(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(u) ? (v(), g("div", Sh, [
            i("div", Ch, x(a(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : O("", !0),
          L(sf),
          L(rv),
          L(Jv),
          i("div", Dh, [
            L(kh),
            L(Ip, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: oe((h) => [
                me(w.$slots, "icon", qe(st(h)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          L(Yp, null, {
            actions: oe((h) => [
              me(w.$slots, "status-bar", qe(st(h)))
            ]),
            _: 3
          })
        ], 34),
        (v(), j(Ht, { to: "body" }, [
          L(Zo, { name: "fade" }, {
            default: oe(() => [
              a(s).modal.visible ? (v(), j(lt(a(s).modal.type), { key: 0 })) : O("", !0)
            ]),
            _: 1
          })
        ])),
        L(Rp, { items: a(Ko) }, null, 8, ["items"]),
        L(a(oi), { position: "bottom-center" })
      ], 2)
    ], 42, $h));
  }
}), Fh = /* @__PURE__ */ te({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Ko },
    selectionMode: { default: "multiple" },
    selectionFilterType: { default: "both" },
    selectionFilterMimeIncludes: { default: () => [] },
    onError: {},
    onSelect: {},
    onPathChange: {},
    onUploadComplete: {},
    onDeleteComplete: {},
    onReady: {},
    onFileDclick: {},
    onFolderDclick: {},
    customUploader: {}
  },
  setup(n) {
    const e = n, t = e.id ?? Ft(rn);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = _i(e, Ft("VueFinderOptions") || {});
    return ls(t, o), es(rn, t), fn(() => {
      cs(t);
    }), (s, l) => (v(), j(Eh, qe(st(e)), {
      icon: oe((c) => [
        me(s.$slots, "icon", qe(st(c)))
      ]),
      "status-bar": oe((c) => [
        me(s.$slots, "status-bar", qe(st(c)))
      ]),
      _: 3
    }, 16));
  }
}), jh = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Fh);
  }
};
export {
  Hh as ArrayDriver,
  De as ContextMenuIds,
  Uh as IndexedDBDriver,
  uo as RemoteDriver,
  Fh as VueFinder,
  jh as VueFinderPlugin,
  Fh as VueFinderProvider,
  Ko as contextMenuItems,
  jh as default
};
