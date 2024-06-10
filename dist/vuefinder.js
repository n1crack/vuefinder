var Rn = Object.defineProperty;
var Vn = (t, e, s) => e in t ? Rn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var ro = (t, e, s) => (Vn(t, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as Ot, watch as At, ref as M, shallowRef as In, onMounted as Me, onUnmounted as To, onUpdated as Lo, nextTick as Mt, computed as dt, inject as ue, openBlock as h, createElementBlock as _, withKeys as yt, unref as r, createElementVNode as a, withModifiers as st, renderSlot as Dt, normalizeClass as he, createCommentVNode as Y, createBlock as ee, withCtx as Z, toDisplayString as b, withDirectives as ge, vModelText as wt, createTextVNode as ne, Fragment as ke, renderList as Ae, onBeforeUnmount as Oo, createVNode as te, customRef as Nn, vShow as tt, isRef as Ho, TransitionGroup as Un, normalizeStyle as Ps, vModelCheckbox as Ft, vModelSelect as ws, provide as zn, Transition as Pn, resolveDynamicComponent as Fn } from "vue";
import jn from "mitt";
import qn from "dragselect";
import Gn from "@uppy/core";
import Wn from "@uppy/xhr-upload";
import Yn from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Kn from "cropperjs";
import "microtip/microtip.css";
var Do;
const vs = (Do = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Do.getAttribute("content");
class Jn {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    ro(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const s = this.config, n = {};
    vs != null && vs !== "" && (n[s.xsrfHeaderName] = vs);
    const o = Object.assign({}, s.headers, n, e.headers), c = Object.assign({}, s.params, e.params), i = e.body, d = s.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, s.body != null && Object.entries(this.config.body).forEach(([m, f]) => {
      u.append(m, f);
    })) : (u = { ...i }, s.body != null && Object.assign(u, this.config.body)));
    const p = {
      url: d,
      method: l,
      headers: o,
      params: c,
      body: u
    };
    if (s.transformRequest != null) {
      const m = s.transformRequest({
        url: d,
        method: l,
        headers: o,
        params: c,
        body: u
      });
      m.url != null && (p.url = m.url), m.method != null && (p.method = m.method), m.params != null && (p.params = m.params ?? {}), m.headers != null && (p.headers = m.headers ?? {}), m.body != null && (p.body = m.body);
    }
    return p;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, s) {
    if (s.url != null)
      return s.url;
    const n = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: s.path }
    });
    return n.url + "?" + new URLSearchParams(n.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, s) {
    if (s.url != null)
      return s.url;
    const n = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: s.path }
    });
    return n.url + "?" + new URLSearchParams(n.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const s = this.transformRequestParams(e), n = e.responseType || "json", o = {
      method: e.method,
      headers: s.headers,
      signal: e.abortSignal
    }, c = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let d;
      s.body instanceof FormData ? d = e.body : (d = JSON.stringify(s.body), o.headers["Content-Type"] = "application/json"), o.body = d;
    }
    const i = await fetch(c, o);
    if (i.ok)
      return await i[n]();
    throw await i.json();
  }
}
function Xn(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new Jn(e);
}
function Qn(t) {
  let e = localStorage.getItem(t + "_storage");
  const s = Ot(JSON.parse(e ?? "{}"));
  At(s, n);
  function n() {
    Object.keys(s).length ? localStorage.setItem(t + "_storage", JSON.stringify(s)) : localStorage.removeItem(t + "_storage");
  }
  function o(l, u) {
    s[l] = u;
  }
  function c(l) {
    delete s[l];
  }
  function i() {
    Object.keys(s).map((l) => c(l));
  }
  return { getStore: (l, u = null) => s.hasOwnProperty(l) ? s[l] : u, setStore: o, removeStore: c, clearStore: i };
}
async function Zn(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function er(t, e, s, n) {
  const { getStore: o, setStore: c } = t, i = M({}), d = M(o("locale", e)), l = (m, f = e) => {
    Zn(m, n).then((v) => {
      i.value = v, c("locale", m), d.value = m, c("translations", v), Object.values(n).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + m }), s.emit("vf-language-saved"));
    }).catch((v) => {
      f ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(f, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !o("locale") && !n.length ? l(e) : i.value = o("translations");
  const u = (m, ...f) => f.length ? u(m = m.replace("%s", f.shift()), ...f) : m;
  function p(m, ...f) {
    return i.value && i.value.hasOwnProperty(m) ? u(i.value[m], ...f) : u(m, ...f);
  }
  return { t: p, changeLocale: l, locale: d };
}
const ve = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, tr = Object.values(ve), sr = "2.4.4";
function Bo(t, e, s, n, o) {
  return (e = Math, s = e.log, n = 1024, o = s(t) / s(n) | 0, t / e.pow(n, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function Ro(t, e, s, n, o) {
  return (e = Math, s = e.log, n = 1e3, o = s(t) / s(n) | 0, t / e.pow(n, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function or(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return n[1] * Math.pow(1024, e[n[2].toLowerCase()]);
}
const Qe = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function nr(t, e) {
  const s = M(Qe.SYSTEM), n = M(Qe.LIGHT);
  s.value = t.getStore("theme", e ?? Qe.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    s.value === Qe.DARK || s.value === Qe.SYSTEM && i.matches ? n.value = Qe.DARK : n.value = Qe.LIGHT;
  };
  return c(o), o.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: s,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: n,
    /**
     * @param {Theme} value
     */
    set(i) {
      s.value = i, i !== Qe.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(o);
    }
  };
}
function rr() {
  const t = In(null), e = M(!1), s = M();
  return { visible: e, type: t, data: s, open: (c, i = null) => {
    e.value = !0, t.value = c, s.value = i;
  }, close: () => {
    e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.8.3
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Oe = (t, e) => {
  const { o: s, i: n, u: o } = t;
  let c = s, i;
  const d = (p, m) => {
    const f = c, v = p, g = m || (n ? !n(f, v) : f !== v);
    return (g || o) && (c = v, i = f), [c, g, i];
  };
  return [e ? (p) => d(e(c, i), p) : d, (p) => [c, !!p, i]];
}, Vo = typeof window < "u" && typeof document < "u", De = Vo ? window : {}, Io = Math.max, ar = Math.min, ks = Math.round, Jt = Math.abs, ao = Math.sign, No = De.cancelAnimationFrame, Fs = De.requestAnimationFrame, Xt = De.setTimeout, $s = De.clearTimeout, os = (t) => typeof De[t] < "u" ? De[t] : void 0, lr = os("MutationObserver"), lo = os("IntersectionObserver"), Qt = os("ResizeObserver"), Ss = os("ScrollTimeline"), Uo = Vo && Node.ELEMENT_NODE, { toString: Wm, hasOwnProperty: hs } = Object.prototype, ns = (t) => t === void 0, js = (t) => t === null, Fe = (t) => typeof t == "number", rs = (t) => typeof t == "string", zo = (t) => typeof t == "boolean", Ie = (t) => typeof t == "function", je = (t) => Array.isArray(t), Tt = (t) => typeof t == "object" && !je(t) && !js(t), as = (t) => {
  const e = !!t && t.length, s = Fe(e) && e > -1 && e % 1 == 0;
  return je(t) || !Ie(t) && s ? e > 0 && Tt(t) ? e - 1 in t : !0 : !1;
}, Zt = (t) => {
  if (!t || !Tt(t))
    return !1;
  let e;
  const s = "constructor", n = t[s], o = n && n.prototype, c = hs.call(t, s), i = o && hs.call(o, "isPrototypeOf");
  if (n && !c && !i)
    return !1;
  for (e in t)
    ;
  return ns(e) || hs.call(t, e);
}, es = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Uo : !1;
}, ls = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Uo : !1;
};
function ie(t, e) {
  if (as(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else
    t && ie(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const qs = (t, e) => t.indexOf(e) >= 0, Ke = (t, e) => t.concat(e), be = (t, e, s) => (!rs(e) && as(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), at = (t) => Array.from(t || []), Po = (t) => je(t) ? t : [t], Cs = (t) => !!t && !t.length, io = (t) => at(new Set(t)), Ne = (t, e, s) => {
  ie(t, (o) => o && o.apply(void 0, e || [])), !s && (t.length = 0);
}, Fo = "paddingTop", jo = "paddingRight", qo = "paddingLeft", Go = "paddingBottom", Wo = "marginLeft", Yo = "marginRight", Ko = "marginBottom", ir = "overflowX", cr = "overflowY", gt = "width", bt = "height", et = "visible", lt = "hidden", _t = "scroll", dr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, is = (t, e, s, n) => {
  if (t && e) {
    let o = !0;
    return ie(s, (c) => {
      const i = t[c], d = e[c];
      i !== d && (o = !1);
    }), o;
  }
  return !1;
}, Jo = (t, e) => is(t, e, ["w", "h"]), Wt = (t, e) => is(t, e, ["x", "y"]), ur = (t, e) => is(t, e, ["t", "r", "b", "l"]), ot = () => {
}, K = (t, ...e) => t.bind(0, ...e), it = (t) => {
  let e;
  const s = t ? Xt : Fs, n = t ? $s : No;
  return [(o) => {
    n(e), e = s(() => o(), Ie(t) ? t() : t);
  }, () => n(e)];
}, Es = (t, e) => {
  const { _: s, p: n, v: o, m: c } = e || {};
  let i, d, l, u, p = ot;
  const m = function(y) {
    p(), $s(i), u = i = d = void 0, p = ot, t.apply(this, y);
  }, f = (A) => c && d ? c(d, A) : A, v = () => {
    p !== ot && m(f(l) || l);
  }, g = function() {
    const y = at(arguments), C = Ie(s) ? s() : s;
    if (Fe(C) && C >= 0) {
      const w = Ie(n) ? n() : n, z = Fe(w) && w >= 0, L = C > 0 ? Xt : Fs, $ = C > 0 ? $s : No, P = f(y) || y, I = m.bind(0, P);
      let N;
      p(), o && !u ? (I(), u = !0, N = L(() => u = void 0, C)) : (N = L(I, C), z && !i && (i = Xt(v, w))), p = () => $(N), d = l = P;
    } else
      m(y);
  };
  return g.S = v, g;
}, Xo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Je = (t) => t ? Object.keys(t) : [], re = (t, e, s, n, o, c, i) => {
  const d = [e, s, n, o, c, i];
  return (typeof t != "object" || js(t)) && !Ie(t) && (t = {}), ie(d, (l) => {
    ie(l, (u, p) => {
      const m = l[p];
      if (t === m)
        return !0;
      const f = je(m);
      if (m && Zt(m)) {
        const v = t[p];
        let g = v;
        f && !je(v) ? g = [] : !f && !Zt(v) && (g = {}), t[p] = re(g, m);
      } else
        t[p] = f ? m.slice() : m;
    });
  }), t;
}, Qo = (t, e) => ie(re({}, t), (s, n, o) => {
  s === void 0 ? delete o[n] : s && Zt(s) && (o[n] = Qo(s));
}), Gs = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, As = (t, e, s) => Io(t, ar(e, s)), ct = (t) => at(new Set((je(t) ? t : (t || "").split(" ")).filter((e) => e))), Ws = (t, e) => t && t.getAttribute(e), co = (t, e) => t && t.hasAttribute(e), Ye = (t, e, s) => {
  ie(ct(e), (n) => {
    t && t.setAttribute(n, String(s || ""));
  });
}, ze = (t, e) => {
  ie(ct(e), (s) => t && t.removeAttribute(s));
}, cs = (t, e) => {
  const s = ct(Ws(t, e)), n = K(Ye, t, e), o = (c, i) => {
    const d = new Set(s);
    return ie(ct(c), (l) => {
      d[i](l);
    }), at(d).join(" ");
  };
  return {
    O: (c) => n(o(c, "delete")),
    $: (c) => n(o(c, "add")),
    C: (c) => {
      const i = ct(c);
      return i.reduce((d, l) => d && s.includes(l), i.length > 0);
    }
  };
}, Zo = (t, e, s) => (cs(t, e).O(s), K(Ys, t, e, s)), Ys = (t, e, s) => (cs(t, e).$(s), K(Zo, t, e, s)), Ms = (t, e, s, n) => (n ? Ys : Zo)(t, e, s), Ks = (t, e, s) => cs(t, e).C(s), en = (t) => cs(t, "class"), tn = (t, e) => {
  en(t).O(e);
}, Js = (t, e) => (en(t).$(e), K(tn, t, e)), sn = (t, e) => {
  const s = [], n = e ? ls(e) && e : document;
  return n ? be(s, n.querySelectorAll(t)) : s;
}, mr = (t, e) => {
  const s = e ? ls(e) && e : document;
  return s ? s.querySelector(t) : null;
}, ts = (t, e) => ls(t) ? t.matches(e) : !1, on = (t) => ts(t, "body"), Ds = (t) => t ? at(t.childNodes) : [], xt = (t) => t && t.parentElement, vt = (t, e) => ls(t) && t.closest(e), Ts = (t) => document.activeElement, fr = (t, e, s) => {
  const n = vt(t, e), o = t && mr(s, n), c = vt(o, e) === n;
  return n && o ? n === t || o === t || c && vt(vt(t, s), e) !== n : !1;
}, rt = (t) => {
  if (as(t))
    ie(at(t), (e) => rt(e));
  else if (t) {
    const e = xt(t);
    e && e.removeChild(t);
  }
}, nn = (t, e, s) => {
  if (s && t) {
    let n = e, o;
    return as(s) ? (o = document.createDocumentFragment(), ie(s, (c) => {
      c === n && (n = c.previousSibling), o.appendChild(c);
    })) : o = s, e && (n ? n !== e && (n = n.nextSibling) : n = t.firstChild), t.insertBefore(o, n || null), () => rt(s);
  }
  return ot;
}, He = (t, e) => nn(t, null, e), uo = (t, e) => nn(xt(t), t && t.nextSibling, e), ht = (t) => {
  const e = document.createElement("div");
  return Ye(e, "class", t), e;
}, rn = (t) => {
  const e = ht();
  return e.innerHTML = t.trim(), ie(Ds(e), (s) => rt(s));
}, pr = /^--/, mo = (t, e) => t.getPropertyValue(e) || t[e] || "", Xs = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, jt = (t) => Xs(parseFloat(t || "")), fo = (t) => `${(Xs(t) * 100).toFixed(3)}%`, Ls = (t) => `${Xs(t)}px`;
function Lt(t, e) {
  t && e && ie(e, (s, n) => {
    try {
      const o = t.style, c = Fe(s) ? Ls(s) : (s || "") + "";
      pr.test(n) ? o.setProperty(n, c) : o[n] = c;
    } catch {
    }
  });
}
function ut(t, e, s) {
  const n = rs(e);
  let o = n ? "" : {};
  if (t) {
    const c = De.getComputedStyle(t, s) || t.style;
    o = n ? mo(c, e) : at(e).reduce((i, d) => (i[d] = mo(c, d), i), o);
  }
  return o;
}
const po = (t, e, s) => {
  const n = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${n}top${o}`, i = `${n}right${o}`, d = `${n}bottom${o}`, l = `${n}left${o}`, u = ut(t, [c, i, d, l]);
  return {
    t: jt(u[c]),
    r: jt(u[i]),
    b: jt(u[d]),
    l: jt(u[l])
  };
}, gs = (t, e) => `translate${Tt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, vr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), hr = {
  w: 0,
  h: 0
}, ds = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : hr, gr = (t) => ds("inner", t || De), Ct = K(ds, "offset"), an = K(ds, "client"), Os = K(ds, "scroll"), Qs = (t) => {
  const e = parseFloat(ut(t, gt)) || 0, s = parseFloat(ut(t, bt)) || 0;
  return {
    w: e - ks(e),
    h: s - ks(s)
  };
}, Et = (t) => t.getBoundingClientRect(), br = (t) => !!t && vr(t), Hs = (t) => !!(t && (t[bt] || t[gt])), ln = (t, e) => {
  const s = Hs(t);
  return !Hs(e) && s;
}, vo = (t, e, s, n) => {
  ie(ct(e), (o) => {
    t && t.removeEventListener(o, s, n);
  });
}, me = (t, e, s, n) => {
  var o;
  const c = (o = n && n.H) != null ? o : !0, i = n && n.I || !1, d = n && n.A || !1, l = {
    passive: c,
    capture: i
  };
  return K(Ne, ct(e).map((u) => {
    const p = d ? (m) => {
      vo(t, u, p, i), s && s(m);
    } : s;
    return t && t.addEventListener(u, p, l), K(vo, t, u, p, i);
  }));
}, cn = (t) => t.stopPropagation(), Bs = (t) => t.preventDefault(), dn = (t) => cn(t) || Bs(t), Pe = (t, e) => {
  const { x: s, y: n } = Fe(e) ? {
    x: e,
    y: e
  } : e || {};
  Fe(s) && (t.scrollLeft = s), Fe(n) && (t.scrollTop = n);
}, Be = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), un = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), _r = (t, e) => {
  const { T: s, D: n } = t, { w: o, h: c } = e, i = (m, f, v) => {
    let g = ao(m) * v, A = ao(f) * v;
    if (g === A) {
      const y = Jt(m), C = Jt(f);
      A = y > C ? 0 : A, g = y < C ? 0 : g;
    }
    return g = g === A ? 0 : g, [g + 0, A + 0];
  }, [d, l] = i(s.x, n.x, o), [u, p] = i(s.y, n.y, c);
  return {
    T: {
      x: d,
      y: u
    },
    D: {
      x: l,
      y: p
    }
  };
}, ho = ({ T: t, D: e }) => {
  const s = (n, o) => n === 0 && n <= o;
  return {
    x: s(t.x, e.x),
    y: s(t.y, e.y)
  };
}, go = ({ T: t, D: e }, s) => {
  const n = (o, c, i) => As(0, 1, (o - i) / (o - c) || 0);
  return {
    x: n(t.x, e.x, s.x),
    y: n(t.y, e.y, s.y)
  };
}, Rs = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, bo = (t, e) => {
  ie(Po(e), t);
}, Vs = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (c, i) => {
    if (c) {
      const d = e.get(c);
      bo((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, n = (c, i) => {
    if (rs(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), bo((p) => {
        Ie(p) && u.add(p);
      }, i), K(s, c, i);
    }
    zo(i) && i && s();
    const d = Je(c), l = [];
    return ie(d, (u) => {
      const p = c[u];
      p && be(l, n(u, p));
    }), K(Ne, l);
  }, o = (c, i) => {
    ie(at(e.get(c)), (d) => {
      i && !Cs(i) ? d.apply(0, i) : d();
    });
  };
  return n(t || {}), [n, s, o];
}, _o = (t) => JSON.stringify(t, (e, s) => {
  if (Ie(s))
    throw 0;
  return s;
}), xo = (t, e) => t ? `${e}`.split(".").reduce((s, n) => s && Xo(s, n) ? s[n] : void 0, t) : void 0, xr = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, mn = (t, e) => {
  const s = {}, n = Ke(Je(e), Je(t));
  return ie(n, (o) => {
    const c = t[o], i = e[o];
    if (Tt(c) && Tt(i))
      re(s[o] = {}, mn(c, i)), Gs(s[o]) && delete s[o];
    else if (Xo(e, o) && i !== c) {
      let d = !0;
      if (je(c) || je(i))
        try {
          _o(c) === _o(i) && (d = !1);
        } catch {
        }
      d && (s[o] = i);
    }
  }), s;
}, yo = (t, e, s) => (n) => [xo(t, n), s || xo(e, n) !== void 0], kt = "data-overlayscrollbars", Yt = "os-environment", qt = `${Yt}-scrollbar-hidden`, bs = `${kt}-initialize`, Kt = "noClipping", wo = `${kt}-body`, nt = kt, yr = "host", Ze = `${kt}-viewport`, wr = ir, kr = cr, $r = "arrange", fn = "measuring", pn = "scrollbarHidden", Sr = "scrollbarPressed", Cr = "noContent", Is = `${kt}-padding`, ko = `${kt}-content`, Zs = "os-size-observer", Er = `${Zs}-appear`, Ar = `${Zs}-listener`, Mr = "os-trinsic-observer", Dr = "os-theme-none", Re = "os-scrollbar", Tr = `${Re}-rtl`, Lr = `${Re}-horizontal`, Or = `${Re}-vertical`, vn = `${Re}-track`, eo = `${Re}-handle`, Hr = `${Re}-visible`, Br = `${Re}-cornerless`, $o = `${Re}-interaction`, So = `${Re}-unusable`, Ns = `${Re}-auto-hide`, Co = `${Ns}-hidden`, Eo = `${Re}-wheel`, Rr = `${vn}-interactive`, Vr = `${eo}-interactive`;
let _s;
const Ir = () => {
  const t = (x, w, z) => {
    He(document.body, x), He(document.body, x);
    const L = an(x), $ = Ct(x), B = Qs(w);
    return z && rt(x), {
      x: $.h - L.h + B.h,
      y: $.w - L.w + B.w
    };
  }, e = (x) => {
    let w = !1;
    const z = Js(x, qt);
    try {
      w = ut(x, "scrollbar-width") === "none" || ut(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return z(), w;
  }, s = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${qt}{scrollbar-width:none!important}.${qt}::-webkit-scrollbar,.${qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = rn(`<div class="${Yt}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, [i, , d] = Vs(), [l, u] = Oe({
    o: t(o, c),
    i: Wt
  }, K(t, o, c, !0)), [p] = u(), m = e(o), f = {
    x: p.x === 0,
    y: p.y === 0
  }, v = {
    elements: {
      host: null,
      padding: !m,
      viewport: (x) => m && on(x) && x,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, g = re({}, xr), A = K(re, {}, g), y = K(re, {}, v), C = {
    k: p,
    M: f,
    R: m,
    V: !!Ss,
    L: K(i, "r"),
    P: y,
    U: (x) => re(v, x) && y(),
    N: A,
    q: (x) => re(g, x) && A(),
    B: re({}, v),
    F: re({}, g)
  };
  if (ze(o, "style"), rt(o), me(De, "resize", () => {
    d("r", []);
  }), Ie(De.matchMedia) && !m && (!f.x || !f.y)) {
    const x = (w) => {
      const z = De.matchMedia(`(resolution: ${De.devicePixelRatio}dppx)`);
      me(z, "change", () => {
        w(), x(w);
      }, {
        A: !0
      });
    };
    x(() => {
      const [w, z] = l();
      re(C.k, w), d("r", [z]);
    });
  }
  return C;
}, qe = () => (_s || (_s = Ir()), _s), hn = (t, e) => Ie(e) ? e.apply(0, t) : e, Nr = (t, e, s, n) => {
  const o = ns(n) ? s : n;
  return hn(t, o) || e.apply(0, t);
}, gn = (t, e, s, n) => {
  const o = ns(n) ? s : n, c = hn(t, o);
  return !!c && (es(c) ? c : e.apply(0, t));
}, Ur = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: n } = e || {}, { M: o, R: c, P: i } = qe(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = s ?? d, p = ns(n) ? l : n, m = (o.x || o.y) && u, f = t && (js(p) ? !c : p);
  return !!m || !!f;
}, to = /* @__PURE__ */ new WeakMap(), zr = (t, e) => {
  to.set(t, e);
}, Pr = (t) => {
  to.delete(t);
}, bn = (t) => to.get(t), Fr = (t, e, s) => {
  let n = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    n = !0;
  }, i = (d) => {
    if (o && s) {
      const l = s.map((u) => {
        const [p, m] = u || [];
        return [m && p ? (d || sn)(p, t) : [], m];
      });
      ie(l, (u) => ie(u[0], (p) => {
        const m = u[1], f = o.get(p) || [];
        if (t.contains(p) && m) {
          const g = me(p, m, (A) => {
            n ? (g(), o.delete(p)) : e(A);
          });
          o.set(p, be(f, g));
        } else
          Ne(f), o.delete(p);
      }));
    }
  };
  return i(), [c, i];
}, Ao = (t, e, s, n) => {
  let o = !1;
  const { j: c, X: i, Y: d, W: l, J: u, K: p } = n || {}, m = Es(() => o && s(!0), {
    _: 33,
    p: 99
  }), [f, v] = Fr(t, m, d), g = c || [], A = i || [], y = Ke(g, A), C = (w, z) => {
    if (!Cs(z)) {
      const L = u || ot, $ = p || ot, B = [], P = [];
      let I = !1, N = !1;
      if (ie(z, (V) => {
        const { attributeName: D, target: E, type: k, oldValue: H, addedNodes: T, removedNodes: se } = V, ce = k === "attributes", ae = k === "childList", O = t === E, X = ce && D, Q = X && Ws(E, D || ""), W = rs(Q) ? Q : null, de = X && H !== W, U = qs(A, D) && de;
        if (e && (ae || !O)) {
          const j = ce && de, F = j && l && ts(E, l), R = (F ? !L(E, D, H, W) : !ce || j) && !$(V, !!F, t, n);
          ie(T, (q) => be(B, q)), ie(se, (q) => be(B, q)), N = N || R;
        }
        !e && O && de && !L(E, D, H, W) && (be(P, D), I = I || U);
      }), v((V) => io(B).reduce((D, E) => (be(D, sn(V, E)), ts(E, V) ? be(D, E) : D), [])), e)
        return !w && N && s(!1), [!1];
      if (!Cs(P) || I) {
        const V = [io(P), I];
        return !w && s.apply(0, V), V;
      }
    }
  }, x = new lr(K(C, !1));
  return [() => (x.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: y,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (f(), x.disconnect(), o = !1);
  }), () => {
    if (o)
      return m.S(), C(!0, x.takeRecords());
  }];
}, _n = {}, xn = {}, jr = (t) => {
  ie(t, (e) => ie(e, (s, n) => {
    _n[n] = e[n];
  }));
}, yn = (t, e, s) => Je(t).map((n) => {
  const { static: o, instance: c } = t[n], [i, d, l] = s || [], u = s ? c : o;
  if (u) {
    const p = s ? u(i, d, e) : u(e);
    return (l || xn)[n] = p;
  }
}), Ht = (t) => xn[t], qr = "__osOptionsValidationPlugin", Gr = "__osSizeObserverPlugin", Wr = (t, e) => {
  const { M: s } = e, [n, o] = t("showNativeOverlaidScrollbars");
  return [n && s.x && s.y, o];
}, ss = (t) => t.indexOf(et) === 0, Yr = (t, e) => {
  const s = (o, c, i, d) => {
    const l = o === et ? lt : o.replace(`${et}-`, ""), u = ss(o), p = ss(i);
    return !c && !d ? lt : u && p ? et : u ? c && d ? l : c ? et : lt : c ? l : p && d ? et : lt;
  }, n = {
    x: s(e.x, t.x, e.y, t.y),
    y: s(e.y, t.y, e.x, t.x)
  };
  return {
    G: n,
    Z: {
      x: n.x === _t,
      y: n.y === _t
    }
  };
}, wn = "__osScrollbarsHidingPlugin", Kr = "__osClickScrollPlugin", kn = (t, e, s) => {
  const { dt: n } = s || {}, o = Ht(Gr), [c] = Oe({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = rn(`<div class="${Zs}"><div class="${Ar}"></div></div>`)[0], u = l.firstChild, p = (m) => {
      const f = m instanceof ResizeObserverEntry;
      let v = !1, g = !1;
      if (f) {
        const [A, , y] = c(m.contentRect), C = Hs(A);
        g = ln(A, y), v = !g && !C;
      } else
        g = m === !0;
      v || e({
        ft: !0,
        dt: g
      });
    };
    if (Qt) {
      const m = new Qt((f) => p(f.pop()));
      m.observe(u), be(i, () => {
        m.disconnect();
      });
    } else if (o) {
      const [m, f] = o(u, p, n);
      be(i, Ke([Js(l, Er), me(l, "animationstart", m)], f));
    } else
      return ot;
    return K(Ne, be(i, He(t, l)));
  };
}, Jr = (t, e) => {
  let s;
  const n = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, o = ht(Mr), [c] = Oe({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const p = c(n(l)), [, m] = p;
      return m && !u && e(p) && [p];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (lo)
      s = new lo(K(d, !1), {
        root: t
      }), s.observe(o), be(l, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const p = Ct(o);
        i(p);
      };
      be(l, kn(o, u)()), u();
    }
    return K(Ne, be(l, He(t, o)));
  }, () => s && d(!0, s.takeRecords())];
}, Xr = (t, e, s, n) => {
  let o, c, i, d, l, u;
  const p = `[${nt}]`, m = `[${Ze}]`, f = [], v = ["wrap", "cols", "rows"], g = ["id", "class", "style", "open"], { vt: A, ht: y, ot: C, gt: x, bt: w, wt: z, nt: L, yt: $, St: B, Ot: P } = t, I = (S) => ut(S, "direction") === "rtl", N = {
    $t: !1,
    ct: I(A)
  }, V = qe(), D = Ht(wn), [E] = Oe({
    i: Jo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const S = D && D.tt(t, e, N, V, s).ut, q = !($ && L) && Ks(y, nt, Kt), G = !L && B($r), J = G && Be(x), le = P(fn, q), xe = G && S && S()[0], $e = Os(C), oe = Qs(C);
    return xe && xe(), Pe(x, J), q && le(), {
      w: $e.w + oe.w,
      h: $e.h + oe.h
    };
  }), k = z ? v : Ke(g, v), H = Es(n, {
    _: () => o,
    p: () => c,
    m(S, R) {
      const [q] = S, [G] = R;
      return [Ke(Je(q), Je(G)).reduce((J, le) => (J[le] = q[le] || G[le], J), {})];
    }
  }), T = (S) => {
    const R = I(A);
    re(S, {
      Ct: u !== R
    }), re(N, {
      ct: R
    }), u = R;
  }, se = (S, R) => {
    const [q, G] = S, J = {
      xt: G
    };
    return re(N, {
      $t: q
    }), !R && n(J), J;
  }, ce = ({ ft: S, dt: R }) => {
    const G = !(S && !R) && V.R ? H : n, J = {
      ft: S || R,
      dt: R
    };
    T(J), G(J);
  }, ae = (S, R) => {
    const [, q] = E(), G = {
      Ht: q
    };
    return T(G), q && !R && (S ? n : H)(G), G;
  }, O = (S, R, q) => {
    const G = {
      Et: R
    };
    return T(G), R && !q && H(G), G;
  }, [X, Q] = w ? Jr(y, se) : [], W = !L && kn(y, ce, {
    dt: !0
  }), [de, U] = Ao(y, !1, O, {
    X: g,
    j: Ke(g, f)
  }), j = L && Qt && new Qt((S) => {
    const R = S[S.length - 1].contentRect;
    ce({
      ft: !0,
      dt: ln(R, l)
    }), l = R;
  }), F = Es(() => {
    const [, S] = E();
    n({
      Ht: S
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    j && j.observe(y);
    const S = W && W(), R = X && X(), q = de(), G = V.L((J) => {
      J ? H({
        zt: J
      }) : F();
    });
    return () => {
      j && j.disconnect(), S && S(), R && R(), d && d(), q(), G();
    };
  }, ({ It: S, At: R, Tt: q }) => {
    const G = {}, [J] = S("update.ignoreMutation"), [le, xe] = S("update.attributes"), [$e, oe] = S("update.elementEvents"), [ye, Se] = S("update.debounce"), Ve = oe || xe, we = R || q, Te = (_e) => Ie(J) && J(_e);
    if (Ve) {
      i && i(), d && d();
      const [_e, fe] = Ao(w || C, !0, ae, {
        j: Ke(k, le || []),
        Y: $e,
        W: p,
        K: (Ce, pe) => {
          const { target: Ee, attributeName: Le } = Ce;
          return (!pe && Le && !L ? fr(Ee, p, m) : !1) || !!vt(Ee, `.${Re}`) || !!Te(Ce);
        }
      });
      d = _e(), i = fe;
    }
    if (Se)
      if (H.S(), je(ye)) {
        const _e = ye[0], fe = ye[1];
        o = Fe(_e) && _e, c = Fe(fe) && fe;
      } else
        Fe(ye) ? (o = ye, c = !1) : (o = !1, c = !1);
    if (we) {
      const _e = U(), fe = Q && Q(), Ce = i && i();
      _e && re(G, O(_e[0], _e[1], we)), fe && re(G, se(fe[0], we)), Ce && re(G, ae(Ce[0], we));
    }
    return T(G), G;
  }, N];
}, Qr = (t, e, s, n) => {
  const { P: o } = qe(), { scrollbars: c } = o(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: p, gt: m, yt: f, nt: v } = e, { scrollbars: g } = p ? {} : t, { slot: A } = g || {}, y = /* @__PURE__ */ new Map(), C = (U) => Ss && new Ss({
    source: m,
    axis: U
  }), x = {
    x: C("x"),
    y: C("y")
  }, w = gn([d, l, u], () => v && f ? d : l, i, A), z = (U, j) => {
    if (j) {
      const J = U ? gt : bt, { kt: le, Mt: xe } = j, $e = Et(xe)[J], oe = Et(le)[J];
      return As(0, 1, $e / oe || 0);
    }
    const F = U ? "x" : "y", { Rt: S, Vt: R } = s, q = R[F], G = S[F];
    return As(0, 1, q / (q + G) || 0);
  }, L = (U, j, F) => {
    const S = z(F, U);
    return 1 / S * (1 - S) * j;
  }, $ = (U) => re(U, {
    clear: ["left"]
  }), B = (U) => {
    y.forEach((j, F) => {
      (U ? qs(Po(U), F) : !0) && (ie(j || [], (R) => {
        R && R.cancel();
      }), y.delete(F));
    });
  }, P = (U, j, F, S) => {
    const R = y.get(U) || [], q = R.find((G) => G && G.timeline === j);
    q ? q.effect = new KeyframeEffect(U, F, {
      composite: S
    }) : y.set(U, Ke(R, [U.animate(F, {
      timeline: j,
      composite: S
    })]));
  }, I = (U, j, F) => {
    const S = F ? Js : tn;
    ie(U, (R) => {
      S(R.Lt, j);
    });
  }, N = (U, j) => {
    ie(U, (F) => {
      const [S, R] = j(F);
      Lt(S, R);
    });
  }, V = (U, j) => {
    N(U, (F) => {
      const { Mt: S } = F;
      return [S, {
        [j ? gt : bt]: fo(z(j))
      }];
    });
  }, D = (U, j) => {
    const { Pt: F } = s, S = j ? "x" : "y", R = x[S], q = ho(F)[S], G = (J, le) => gs(fo(L(J, q ? le : 1 - le, j)), j);
    R ? ie(U, (J) => {
      const { Mt: le } = J;
      P(le, R, $({
        transform: [0, 1].map((xe) => G(J, xe))
      }));
    }) : N(U, (J) => [J.Mt, {
      transform: G(J, go(F, Be(m))[S])
    }]);
  }, E = (U) => v && !f && xt(U) === u, k = [], H = [], T = [], se = (U, j, F) => {
    const S = zo(F), R = S ? F : !0, q = S ? !F : !0;
    R && I(H, U, j), q && I(T, U, j);
  }, ce = () => {
    V(H, !0), V(T);
  }, ae = () => {
    D(H, !0), D(T);
  }, O = () => {
    if (v) {
      const { Rt: U, Pt: j } = s, F = ho(j), S = 0.5;
      if (x.x && x.y)
        ie(Ke(T, H), ({ Lt: R }) => {
          if (E(R)) {
            const q = (G) => P(R, x[G], $({
              transform: [0, F[G] ? 1 : -1].map((J) => gs(Ls(J * (U[G] - S)), G === "x"))
            }), "add");
            q("x"), q("y");
          } else
            B(R);
        });
      else {
        const R = go(j, Be(m)), q = (G) => {
          const { Lt: J } = G, le = E(J) && J, xe = ($e, oe, ye) => {
            const Se = oe * $e;
            return Ls(ye ? Se : -Se);
          };
          return [le, le && {
            transform: gs({
              x: xe(R.x, U.x, F.x),
              y: xe(R.y, U.y, F.y)
            })
          }];
        };
        N(H, q), N(T, q);
      }
    }
  }, X = (U) => {
    const F = ht(`${Re} ${U ? Lr : Or}`), S = ht(vn), R = ht(eo), q = {
      Lt: F,
      kt: S,
      Mt: R
    };
    return be(U ? H : T, q), be(k, [He(F, S), He(S, R), K(rt, F), B, n(q, se, D, U)]), q;
  }, Q = K(X, !0), W = K(X, !1), de = () => (He(w, H[0].Lt), He(w, T[0].Lt), K(Ne, k));
  return Q(), W(), [{
    Ut: ce,
    Nt: ae,
    qt: O,
    Bt: se,
    Ft: {
      V: x.x,
      jt: H,
      Xt: Q,
      Yt: K(N, H)
    },
    Wt: {
      V: x.y,
      jt: T,
      Xt: W,
      Yt: K(N, T)
    }
  }, de];
}, Zr = (t, e, s, n) => (o, c, i, d) => {
  const { ht: l, ot: u, nt: p, gt: m, Jt: f, Ot: v } = e, { Lt: g, kt: A, Mt: y } = o, [C, x] = it(333), [w, z] = it(444), [L, $] = it(), B = K(i, [o], d), P = (E) => {
    Ie(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: E.x,
      top: E.y
    });
  }, I = d ? gt : bt, N = () => {
    const E = "pointerup pointercancel lostpointercapture", k = `client${d ? "X" : "Y"}`, H = d ? "left" : "top", T = d ? "w" : "h", se = d ? "x" : "y", ce = (ae, O) => (X) => {
      const { Rt: Q } = s, W = Ct(A)[T] - Ct(y)[T], U = O * X / W * Q[se];
      Pe(m, {
        [se]: ae + U
      });
    };
    return me(A, "pointerdown", (ae) => {
      const O = vt(ae.target, `.${eo}`) === y, X = O ? y : A, Q = t.scrollbars, { button: W, isPrimary: de, pointerType: U } = ae, { pointers: j } = Q;
      if (W === 0 && de && Q[O ? "dragScroll" : "clickScroll"] && (j || []).includes(U)) {
        z();
        const S = !O && ae.shiftKey, R = K(Et, y), q = K(Et, A), G = (pe, Ee) => (pe || R())[H] - (Ee || q())[H], J = ks(Et(m)[I]) / Ct(m)[T] || 1, le = ce(Be(m)[se], 1 / J), xe = ae[k], $e = R(), oe = q(), ye = $e[I], Se = G($e, oe) + ye / 2, Ve = xe - oe[H], we = O ? 0 : Ve - Se, Te = (pe) => {
          Ne(Ce), X.releasePointerCapture(pe.pointerId);
        }, _e = () => v(Sr, !0), fe = _e(), Ce = [() => {
          const pe = Be(m);
          fe();
          const Ee = Be(m), Le = {
            x: Ee.x - pe.x,
            y: Ee.y - pe.y
          };
          (Jt(Le.x) > 3 || Jt(Le.y) > 3) && (_e(), Pe(m, pe), P(Le), w(fe));
        }, me(f, E, Te), me(f, "selectstart", (pe) => Bs(pe), {
          H: !1
        }), me(A, E, Te), me(A, "pointermove", (pe) => {
          const Ee = pe[k] - xe;
          (O || S) && le(we + Ee);
        })];
        if (X.setPointerCapture(ae.pointerId), S)
          le(we);
        else if (!O) {
          const pe = Ht(Kr);
          pe && be(Ce, pe(le, G, we, ye, Ve));
        }
      }
    });
  };
  let V = !0;
  const D = (E) => E.propertyName.indexOf(I) > -1;
  return K(Ne, [me(y, "pointermove pointerleave", n), me(g, "pointerenter", () => {
    c($o, !0);
  }), me(g, "pointerleave pointercancel", () => {
    c($o, !1);
  }), !p && me(g, "mousedown", () => {
    const E = Ts();
    (co(E, Ze) || co(E, nt) || E === document.body) && Xt(K(Rs, u), 25);
  }), me(g, "wheel", (E) => {
    const { deltaX: k, deltaY: H, deltaMode: T } = E;
    V && T === 0 && xt(g) === l && P({
      x: k,
      y: H
    }), V = !1, c(Eo, !0), C(() => {
      V = !0, c(Eo);
    }), Bs(E);
  }, {
    H: !1,
    I: !0
  }), me(y, "transitionstart", (E) => {
    if (D(E)) {
      const k = () => {
        B(), L(k);
      };
      k();
    }
  }), me(y, "transitionend transitioncancel", (E) => {
    D(E) && ($(), B());
  }), me(g, "pointerdown", K(me, f, "click", dn, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), N(), x, z, $]);
}, ea = (t, e, s, n, o, c) => {
  let i, d, l, u, p, m = ot, f = 0;
  const v = (O) => O.pointerType === "mouse", [g, A] = it(), [y, C] = it(100), [x, w] = it(100), [z, L] = it(() => f), [$, B] = Qr(t, o, n, Zr(e, o, n, (O) => v(O) && T())), { ht: P, Kt: I, yt: N } = o, { Bt: V, Ut: D, Nt: E, qt: k } = $, H = (O, X) => {
    if (L(), O)
      V(Co);
    else {
      const Q = K(V, Co, !0);
      f > 0 && !X ? z(Q) : Q();
    }
  }, T = () => {
    (l ? !i : !u) && (H(!0), y(() => {
      H(!1);
    }));
  }, se = (O) => {
    V(Ns, O, !0), V(Ns, O, !1);
  }, ce = (O) => {
    v(O) && (i = l, l && H(!0));
  }, ae = [L, C, w, A, () => m(), me(P, "pointerover", ce, {
    A: !0
  }), me(P, "pointerenter", ce), me(P, "pointerleave", (O) => {
    v(O) && (i = !1, l && H(!1));
  }), me(P, "pointermove", (O) => {
    v(O) && d && T();
  }), me(I, "scroll", (O) => {
    g(() => {
      E(), T();
    }), c(O), k();
  })];
  return [() => K(Ne, be(ae, B())), ({ It: O, Tt: X, Gt: Q, Qt: W }) => {
    const { Zt: de, tn: U, nn: j, sn: F } = W || {}, { Ct: S, dt: R } = Q || {}, { ct: q } = s, { M: G } = qe(), { G: J, en: le } = n, [xe, $e] = O("showNativeOverlaidScrollbars"), [oe, ye] = O("scrollbars.theme"), [Se, Ve] = O("scrollbars.visibility"), [we, Te] = O("scrollbars.autoHide"), [_e, fe] = O("scrollbars.autoHideSuspend"), [Ce] = O("scrollbars.autoHideDelay"), [pe, Ee] = O("scrollbars.dragScroll"), [Le, ft] = O("scrollbars.clickScroll"), [Bt, us] = O("overflow"), ms = R && !X, fs = le.x || le.y, Ue = de || U || F || S || X, ps = j || Ve || us, Rt = xe && G.x && G.y, Vt = (Xe, $t, St) => {
      const It = Xe.includes(_t) && (Se === et || Se === "auto" && $t === _t);
      return V(Hr, It, St), It;
    };
    if (f = Ce, ms && (_e && fs ? (se(!1), m(), x(() => {
      m = me(I, "scroll", K(se, !0), {
        A: !0
      });
    })) : se(!0)), $e && V(Dr, Rt), ye && (V(p), V(oe, !0), p = oe), fe && !_e && se(!0), Te && (d = we === "move", l = we === "leave", u = we === "never", H(u, !0)), Ee && V(Vr, pe), ft && V(Rr, Le), ps) {
      const Xe = Vt(Bt.x, J.x, !0), $t = Vt(Bt.y, J.y, !1);
      V(Br, !(Xe && $t));
    }
    Ue && (D(), E(), k(), V(So, !le.x, !0), V(So, !le.y, !1), V(Tr, q && !N));
  }, {}, $];
}, ta = (t) => {
  const e = qe(), { P: s, R: n } = e, { elements: o } = s(), { host: c, padding: i, viewport: d, content: l } = o, u = es(t), p = u ? {} : t, { elements: m } = p, { host: f, padding: v, viewport: g, content: A } = m || {}, y = u ? t : p.target, C = on(y), x = ts(y, "textarea"), w = y.ownerDocument, z = w.documentElement, L = () => w.defaultView || De, $ = K(Nr, [y]), B = K(gn, [y]), P = K(ht, ""), I = K($, P, d), N = K(B, P, l), V = I(g), D = V === y, E = D && C, k = !D && N(A), H = !D && V === k, T = E ? z : V, se = x ? $(P, c, f) : y, ce = E ? T : se, ae = !D && B(P, i, v), O = !H && k, X = [O, T, ae, ce].map((oe) => es(oe) && !xt(oe) && oe), Q = (oe) => oe && qs(X, oe), W = Q(T) ? y : T, de = {
    vt: y,
    ht: ce,
    ot: T,
    cn: ae,
    bt: O,
    gt: E ? z : T,
    Kt: E ? w : T,
    rn: C ? z : W,
    Jt: w,
    wt: x,
    yt: C,
    Dt: u,
    nt: D,
    ln: L,
    St: (oe) => Ks(T, Ze, oe),
    Ot: (oe, ye) => Ms(T, Ze, oe, ye)
  }, { vt: U, ht: j, cn: F, ot: S, bt: R } = de, q = [() => {
    ze(j, [nt, bs]), ze(U, bs), C && ze(z, [bs, nt]);
  }], G = x && Q(j);
  let J = x ? U : Ds([R, S, F, j, U].find((oe) => oe && !Q(oe)));
  const le = E ? U : R || S, xe = K(Ne, q);
  return [de, () => {
    const oe = L(), ye = Ts(), Se = (fe) => {
      He(xt(fe), Ds(fe)), rt(fe);
    }, Ve = (fe) => me(fe, "focusin focusout focus blur", dn, {
      I: !0,
      H: !1
    }), we = "tabindex", Te = Ws(S, we), _e = Ve(ye);
    return Ye(j, nt, D ? "" : yr), Ye(F, Is, ""), Ye(S, Ze, ""), Ye(R, ko, ""), D || (Ye(S, we, Te || "-1"), C && Ye(z, wo, "")), G && (uo(U, j), be(q, () => {
      uo(j, U), rt(j);
    })), He(le, J), He(j, F), He(F || j, !D && S), He(S, R), be(q, [_e, () => {
      const fe = Ts(), Ce = Q(S), pe = Ce && fe === S ? U : fe, Ee = Ve(pe);
      ze(F, Is), ze(R, ko), ze(S, Ze), C && ze(z, wo), Te ? Ye(S, we, Te) : ze(S, we), Q(R) && Se(R), Ce && Se(S), Q(F) && Se(F), Rs(pe), Ee();
    }]), n && !D && (Ys(S, Ze, pn), be(q, K(ze, S, Ze))), Rs(!D && C && ye === U && oe.top === oe ? S : ye), _e(), J = 0, xe;
  }, xe];
}, sa = ({ bt: t }) => ({ Gt: e, an: s, Tt: n }) => {
  const { xt: o } = e || {}, { $t: c } = s;
  t && (o || n) && Lt(t, {
    [bt]: c && "100%"
  });
}, oa = ({ ht: t, cn: e, ot: s, nt: n }, o) => {
  const [c, i] = Oe({
    i: ur,
    o: po()
  }, K(po, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: p }) => {
    let [m, f] = i(p);
    const { R: v } = qe(), { ft: g, Ht: A, Ct: y } = l || {}, { ct: C } = u, [x, w] = d("paddingAbsolute");
    (g || f || (p || A)) && ([m, f] = c(p));
    const L = !n && (w || y || f);
    if (L) {
      const $ = !x || !e && !v, B = m.r + m.l, P = m.t + m.b, I = {
        [Yo]: $ && !C ? -B : 0,
        [Ko]: $ ? -P : 0,
        [Wo]: $ && C ? -B : 0,
        top: $ ? -m.t : 0,
        right: $ ? C ? -m.r : "auto" : 0,
        left: $ ? C ? "auto" : -m.l : 0,
        [gt]: $ && `calc(100% + ${B}px)`
      }, N = {
        [Fo]: $ ? m.t : 0,
        [jo]: $ ? m.r : 0,
        [Go]: $ ? m.b : 0,
        [qo]: $ ? m.l : 0
      };
      Lt(e || s, I), Lt(s, N), re(o, {
        cn: m,
        un: !$,
        rt: e ? N : re({}, I, N)
      });
    }
    return {
      _n: L
    };
  };
}, na = (t, e) => {
  const s = qe(), { ht: n, cn: o, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: p, ln: m } = t, { R: f } = s, v = u && i, g = K(Io, 0), A = ["display", "direction", "flexDirection", "writingMode"], y = {
    i: Jo,
    o: {
      w: 0,
      h: 0
    }
  }, C = {
    i: Wt,
    o: {}
  }, x = (O) => {
    p(fn, !v && O);
  }, w = (O, X) => {
    const Q = De.devicePixelRatio % 1 !== 0 ? 1 : 0, W = {
      w: g(O.w - X.w),
      h: g(O.h - X.h)
    };
    return {
      w: W.w > Q ? W.w : 0,
      h: W.h > Q ? W.h : 0
    };
  }, [z, L] = Oe(y, K(Qs, c)), [$, B] = Oe(y, K(Os, c)), [P, I] = Oe(y), [N] = Oe(C), [V, D] = Oe(y), [E] = Oe(C), [k] = Oe({
    i: (O, X) => is(O, X, A),
    o: {}
  }, () => br(c) ? ut(c, A) : {}), [H, T] = Oe({
    i: (O, X) => Wt(O.T, X.T) && Wt(O.D, X.D),
    o: un()
  }, () => {
    x(!0);
    const O = Be(l), X = p(Cr, !0), Q = me(d, _t, (F) => {
      const S = Be(l);
      F.isTrusted && S.x === O.x && S.y === O.y && cn(F);
    }, {
      I: !0,
      A: !0
    });
    Pe(l, {
      x: 0,
      y: 0
    }), X();
    const W = Be(l), de = Os(l);
    Pe(l, {
      x: de.w,
      y: de.h
    });
    const U = Be(l);
    Pe(l, {
      x: U.x - W.x < 1 && -de.w,
      y: U.y - W.y < 1 && -de.h
    });
    const j = Be(l);
    return Pe(l, O), Fs(() => Q()), {
      T: W,
      D: j
    };
  }), se = Ht(wn), ce = (O, X) => `${X ? wr : kr}${dr(O)}`, ae = (O) => {
    const X = (W) => [et, lt, _t].map((de) => ce(de, W)), Q = X(!0).concat(X()).join(" ");
    p(Q), p(Je(O).map((W) => ce(O[W], W === "x")).join(" "), !0);
  };
  return ({ It: O, Gt: X, an: Q, Tt: W }, { _n: de }) => {
    const { ft: U, Ht: j, Ct: F, dt: S, zt: R } = X || {}, q = se && se.tt(t, e, Q, s, O), { it: G, ut: J, _t: le } = q || {}, [xe, $e] = Wr(O, s), [oe, ye] = O("overflow"), Se = ss(oe.x), Ve = ss(oe.y), we = U || de || j || F || R || $e;
    let Te = L(W), _e = B(W), fe = I(W), Ce = D(W);
    if ($e && f && p(pn, !xe), we) {
      Ks(n, nt, Kt) && x(!0);
      const [oo] = J ? J() : [], [Nt] = Te = z(W), [Ut] = _e = $(W), zt = an(c), Pt = v && gr(m()), Bn = {
        w: g(Ut.w + Nt.w),
        h: g(Ut.h + Nt.h)
      }, no = {
        w: g((Pt ? Pt.w : zt.w + g(zt.w - Ut.w)) + Nt.w),
        h: g((Pt ? Pt.h : zt.h + g(zt.h - Ut.h)) + Nt.h)
      };
      oo && oo(), Ce = V(no), fe = P(w(Bn, no), W);
    }
    const [pe, Ee] = Ce, [Le, ft] = fe, [Bt, us] = _e, [ms, fs] = Te, [Ue, ps] = N({
      x: Le.w > 0,
      y: Le.h > 0
    }), Rt = Se && Ve && (Ue.x || Ue.y) || Se && Ue.x && !Ue.y || Ve && Ue.y && !Ue.x, Vt = de || F || R || fs || us || Ee || ft || ye || $e || we, Xe = Yr(Ue, oe), [$t, St] = E(Xe.G), [, It] = k(W), so = F || S || It || ps || W, [On, Hn] = so ? H(W) : T();
    return Vt && (St && ae(Xe.G), le && G && Lt(c, le(Xe, Q, G(Xe, Bt, ms)))), x(!1), Ms(n, nt, Kt, Rt), Ms(o, Is, Kt, Rt), re(e, {
      G: $t,
      Vt: {
        x: pe.w,
        y: pe.h
      },
      Rt: {
        x: Le.w,
        y: Le.h
      },
      en: Ue,
      Pt: _r(On, Le)
    }), {
      nn: St,
      Zt: Ee,
      tn: ft,
      sn: Hn || ft,
      dn: so
    };
  };
}, ra = (t) => {
  const [e, s, n] = ta(t), o = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [Yo]: 0,
      [Ko]: 0,
      [Wo]: 0,
      [Fo]: 0,
      [jo]: 0,
      [Go]: 0,
      [qo]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    G: {
      x: lt,
      y: lt
    },
    en: {
      x: !1,
      y: !1
    },
    Pt: un()
  }, { vt: c, gt: i, nt: d } = e, { R: l, M: u } = qe(), p = !l && (u.x || u.y), m = [sa(e), oa(e, o), na(e, o)];
  return [s, (f) => {
    const v = {}, A = p && Be(i);
    return ie(m, (y) => {
      re(v, y(f, v) || {});
    }), Pe(i, A), !d && Pe(c, 0), v;
  }, o, e, n];
}, aa = (t, e, s, n, o) => {
  const c = yo(e, {}), [i, d, l, u, p] = ra(t), [m, f, v] = Xr(u, l, c, (w) => {
    x({}, w);
  }), [g, A, , y] = ea(t, e, v, l, u, o), C = (w) => Je(w).some((z) => !!w[z]), x = (w, z) => {
    if (s())
      return !1;
    const { fn: L, Tt: $, At: B, pn: P } = w, I = L || {}, N = !!$, V = {
      It: yo(e, I, N),
      fn: I,
      Tt: N
    };
    if (P)
      return A(V), !1;
    const D = z || f(re({}, V, {
      At: B
    })), E = d(re({}, V, {
      an: v,
      Gt: D
    }));
    A(re({}, V, {
      Gt: D,
      Qt: E
    }));
    const k = C(D), H = C(E), T = k || H || !Gs(I) || N;
    return T && n(w, {
      Gt: D,
      Qt: E
    }), T;
  };
  return [() => {
    const { rn: w, gt: z } = u, L = Be(w), $ = [m(), i(), g()];
    return Pe(z, L), K(Ne, $);
  }, x, () => ({
    vn: v,
    hn: l
  }), {
    gn: u,
    bn: y
  }, p];
}, mt = (t, e, s) => {
  const { N: n } = qe(), o = es(t), c = o ? t : t.target, i = bn(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, p = (N) => {
      const V = Qo(N), D = Ht(qr);
      return D ? D(V, !0) : V;
    }, m = re({}, n(), p(e)), [f, v, g] = Vs(), [A, y, C] = Vs(s), x = (N, V) => {
      C(N, V), g(N, V);
    }, [w, z, L, $, B] = aa(t, m, () => d, ({ fn: N, Tt: V }, { Gt: D, Qt: E }) => {
      const { ft: k, Ct: H, xt: T, Ht: se, Et: ce, dt: ae } = D, { Zt: O, tn: X, nn: Q, sn: W } = E;
      x("updated", [I, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!H,
          heightIntrinsicChanged: !!T,
          overflowEdgeChanged: !!O,
          overflowAmountChanged: !!X,
          overflowStyleChanged: !!Q,
          scrollCoordinatesChanged: !!W,
          contentMutation: !!se,
          hostMutation: !!ce,
          appear: !!ae
        },
        changedOptions: N || {},
        force: !!V
      }]);
    }, (N) => x("scroll", [I, N])), P = (N) => {
      Pr(c), Ne(l), d = !0, x("destroyed", [I, N]), v(), y();
    }, I = {
      options(N, V) {
        if (N) {
          const D = V ? n() : {}, E = mn(m, re(D, p(N)));
          Gs(E) || (re(m, E), z({
            fn: E
          }));
        }
        return re({}, m);
      },
      on: A,
      off: (N, V) => {
        N && V && y(N, V);
      },
      state() {
        const { vn: N, hn: V } = L(), { ct: D } = N, { Vt: E, Rt: k, G: H, en: T, cn: se, un: ce, Pt: ae } = V;
        return re({}, {
          overflowEdge: E,
          overflowAmount: k,
          overflowStyle: H,
          hasOverflow: T,
          scrollCoordinates: {
            start: ae.T,
            end: ae.D
          },
          padding: se,
          paddingAbsolute: ce,
          directionRTL: D,
          destroyed: d
        });
      },
      elements() {
        const { vt: N, ht: V, cn: D, ot: E, bt: k, gt: H, Kt: T } = $.gn, { Ft: se, Wt: ce } = $.bn, ae = (X) => {
          const { Mt: Q, kt: W, Lt: de } = X;
          return {
            scrollbar: de,
            track: W,
            handle: Q
          };
        }, O = (X) => {
          const { jt: Q, Xt: W } = X, de = ae(Q[0]);
          return re({}, de, {
            clone: () => {
              const U = ae(W());
              return z({
                pn: !0
              }), U;
            }
          });
        };
        return re({}, {
          target: N,
          host: V,
          padding: D || E,
          viewport: E,
          content: k || E,
          scrollOffsetElement: H,
          scrollEventElement: T,
          scrollbarHorizontal: O(se),
          scrollbarVertical: O(ce)
        });
      },
      update: (N) => z({
        Tt: N,
        At: !0
      }),
      destroy: K(P, !1),
      plugin: (N) => u[Je(N)[0]]
    };
    return be(l, [B]), zr(c, I), yn(_n, mt, [I, f, u]), Ur($.gn.yt, !o && t.cancel) ? (P(!0), I) : (be(l, w()), x("initialized", [I]), I.update(!0), I);
  }
  return i;
};
mt.plugin = (t) => {
  const e = je(t), s = e ? t : [t], n = s.map((o) => yn(o, mt)[0]);
  return jr(s), e ? n : n[0];
};
mt.valid = (t) => {
  const e = t && t.elements, s = Ie(e) && e();
  return Zt(s) && !!bn(s.target);
};
mt.env = () => {
  const { k: t, M: e, R: s, V: n, B: o, F: c, P: i, U: d, N: l, q: u } = qe();
  return re({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: n,
    staticDefaultInitialization: o,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
function la() {
  let t;
  const e = M(null), s = Math.floor(Math.random() * 2 ** 32), n = M(!1), o = M([]), c = () => o.value, i = () => t.getSelection(), d = () => o.value.length, l = () => t.clearSelection(!0), u = M(), p = M(null), m = M(null), f = M(null);
  function v() {
    t = new qn({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: x, event: w, isDragging: z }) => {
      if (z)
        t.Interaction._reset(w);
      else {
        n.value = !1;
        const L = e.value.offsetWidth - w.offsetX, $ = e.value.offsetHeight - w.offsetY;
        L < 15 && $ < 15 && t.Interaction._reset(w), w.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(w);
      }
    }), document.addEventListener("dragleave", (x) => {
      !x.buttons && n.value && (n.value = !1);
    });
  }
  const g = () => Mt(() => {
    const x = c().map((w) => w.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((w) => x.includes(JSON.parse(w.dataset.item).path))
    ), o.value = t.getSelection().map((w) => JSON.parse(w.dataset.item)), u.value(o.value), y();
  }), A = (x) => {
    u.value = x, t.subscribe("DS:end", ({ items: w, event: z, isDragging: L }) => {
      o.value = w.map(($) => JSON.parse($.dataset.item)), x(w.map(($) => JSON.parse($.dataset.item)));
    });
  }, y = () => {
    p.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (m.value.style.height = e.value.scrollHeight + "px", m.value.style.display = "block") : (m.value.style.height = "100%", m.value.style.display = "none"));
  }, C = (x) => {
    if (!p.value)
      return;
    const { scrollOffsetElement: w } = p.value.elements();
    w.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Me(() => {
    mt(f.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: mt
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (x) => {
        p.value = x;
      },
      scroll: (x, w) => {
        const { scrollOffsetElement: z } = x.elements();
        e.value.scrollTo({
          top: z.scrollTop,
          left: 0
        });
      }
    }), v(), y(), new ResizeObserver(y).observe(e.value), e.value.addEventListener("scroll", C), t.subscribe("DS:scroll", ({ isDragging: x }) => x || C());
  }), To(() => {
    t && t.stop();
  }), Lo(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: n,
    scrollBar: m,
    scrollBarContainer: f,
    getSelected: c,
    getSelection: i,
    clearSelection: l,
    refreshSelection: g,
    getCount: d,
    onSelect: A
  };
}
function ia(t, e) {
  const s = M(t), n = M(e), o = M([]), c = M([]), i = M([]), d = M(!1), l = M(5);
  let u = !1, p = !1;
  const m = Ot({
    adapter: s,
    storages: [],
    dirname: n,
    files: []
  });
  function f() {
    let x = [], w = [], z = n.value ?? s.value + "://";
    z.length === 0 && (o.value = []), z.replace(s.value + "://", "").split("/").forEach(function(B) {
      x.push(B), x.join("/") !== "" && w.push({
        basename: B,
        name: B,
        path: s.value + "://" + x.join("/"),
        type: "dir"
      });
    }), c.value = w;
    const [L, $] = g(w, l.value);
    i.value = $, o.value = L;
  }
  function v(x) {
    l.value = x, f();
  }
  function g(x, w) {
    return x.length > w ? [x.slice(-w), x.slice(0, -w)] : [x, []];
  }
  function A(x = null) {
    d.value = x ?? !d.value;
  }
  function y() {
    return o.value && o.value.length && !p;
  }
  const C = dt(() => {
    var x;
    return ((x = o.value[o.value.length - 2]) == null ? void 0 : x.path) ?? s.value + "://";
  });
  return Me(() => {
  }), At(n, f), Me(f), {
    adapter: s,
    path: n,
    loading: u,
    searchMode: p,
    data: m,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: v,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: A,
    isGoUpAvailable: y,
    parentFolderPath: C
  };
}
const ca = (t, e) => {
  const s = Qn(t.id), n = jn(), o = s.getStore("metricUnits", !1), c = nr(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (f) => Array.isArray(f) ? f : tr, p = s.getStore("persist-path", t.persist), m = p ? s.getStore("path", t.path) : t.path;
  return Ot({
    /*
    * Core properties
    * */
    // app version
    version: sr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: n,
    // storage
    storage: s,
    // localization object
    i18n: dt(() => er(s, d, n, i)),
    // modal state
    modal: rr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: dt(() => la()),
    // http object
    requester: Xn(t.request),
    // active features
    features: u(t.features),
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: s.getStore("full-screen", t.fullScreen),
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    /*
    * Settings
    * */
    // theme state
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: o,
    // human readable file sizes
    filesize: o ? Ro : Bo,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: p,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: ia(l, m)
  });
}, da = /* @__PURE__ */ a("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), ua = { class: "fixed z-10 inset-0 overflow-hidden" }, ma = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, fa = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Ge = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), s = ue("ServiceContainer");
    return Me(() => {
      const n = document.querySelector(".v-f-modal input");
      n && n.focus(), Mt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const o = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: o,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (n, o) => (h(), _("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = yt((c) => r(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      da,
      a("div", ua, [
        a("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = st((c) => r(s).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            a("div", ma, [
              Dt(n.$slots, "default")
            ]),
            a("div", fa, [
              Dt(n.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, pa = ["aria-label"], va = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ a("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), ha = [
  va
], We = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var u;
    const s = e, n = ue("ServiceContainer"), { t: o } = n.i18n, c = M(!1), i = M(null), d = M((u = i.value) == null ? void 0 : u.strMessage);
    At(d, () => c.value = !1);
    const l = () => {
      s("hidden"), c.value = !0;
    };
    return (p, m) => (h(), _("div", null, [
      c.value ? Y("", !0) : (h(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: he(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", t.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        Dt(p.$slots, "default"),
        a("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": r(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, ha, 8, pa)
      ], 2))
    ]));
  }
}, ga = { class: "sm:flex sm:items-start" }, ba = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), _a = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, xa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ya = { class: "mt-2" }, wa = { class: "text-sm text-gray-500" }, ka = ["placeholder"], $n = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ue("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, n = M(""), o = M(""), c = () => {
      n.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: n.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", n.value) });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", ga, [
          ba,
          a("div", _a, [
            a("h3", xa, b(r(s)("New Folder")), 1),
            a("div", ya, [
              a("p", wa, b(r(s)("Create a new folder")), 1),
              ge(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => n.value = l),
                onKeyup: yt(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("Folder Name"),
                type: "text"
              }, null, 40, ka), [
                [wt, n.value]
              ]),
              o.value.length ? (h(), ee(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, $a = { class: "sm:flex sm:items-start" }, Sa = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ca = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ea = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Aa = { class: "mt-2" }, Ma = { class: "text-sm text-gray-500" }, Da = ["placeholder"], Ta = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ue("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, n = M(""), o = M(""), c = () => {
      n.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: n.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", n.value) });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", $a, [
          Sa,
          a("div", Ca, [
            a("h3", Ea, b(r(s)("New File")), 1),
            a("div", Aa, [
              a("p", Ma, b(r(s)("Create a new file")), 1),
              ge(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => n.value = l),
                onKeyup: yt(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("File Name"),
                type: "text"
              }, null, 40, Da), [
                [wt, n.value]
              ]),
              o.value.length ? (h(), ee(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, La = { class: "sm:flex sm:items-start" }, Oa = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), Ha = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ba = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ra = { class: "mt-2" }, Va = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ia = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Na = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ua = [
  Na
], za = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pa = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fa = [
  Pa
], ja = { class: "ml-1.5" }, Sn = {
  __name: "ModalRename",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(e.modal.data.items[0]), o = M(e.modal.data.items[0].basename), c = M(""), i = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: n.value.path,
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", o.value) });
        },
        onError: (d) => {
          c.value = s(d.message);
        }
      });
    };
    return (d, l) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", La, [
          Oa,
          a("div", Ha, [
            a("h3", Ba, b(r(s)("Rename")), 1),
            a("div", Ra, [
              a("p", Va, [
                n.value.type === "dir" ? (h(), _("svg", Ia, Ua)) : (h(), _("svg", za, Fa)),
                a("span", ja, b(n.value.basename), 1)
              ]),
              ge(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => o.value = u),
                onKeyup: yt(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [wt, o.value]
              ]),
              c.value.length ? (h(), ee(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(c.value), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, qa = { class: "sm:flex sm:items-start" }, Ga = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Wa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ya = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ka = { class: "mt-2" }, Ja = { class: "text-sm text-gray-500" }, Xa = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Qa = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Za = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, el = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), tl = [
  el
], sl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ol = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), nl = [
  ol
], rl = { class: "ml-1.5" }, al = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Cn = {
  __name: "ModalDelete",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(e.modal.data.items), o = M(""), c = () => {
      n.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: n.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(r(s)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1),
        a("div", al, b(r(s)("This action cannot be undone.")), 1)
      ]),
      default: Z(() => [
        a("div", qa, [
          Ga,
          a("div", Wa, [
            a("h3", Ya, b(r(s)("Delete files")), 1),
            a("div", Ka, [
              a("p", Ja, b(r(s)("Are you sure you want to delete these files?")), 1),
              a("div", Xa, [
                (h(!0), _(ke, null, Ae(n.value, (l) => (h(), _("p", Qa, [
                  l.type === "dir" ? (h(), _("svg", Za, tl)) : (h(), _("svg", sl, nl)),
                  a("span", rl, b(l.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (h(), ee(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Us(t, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(s), "$2..$4");
}
const ll = { class: "sm:flex sm:items-start" }, il = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), cl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, dl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ul = { class: "mt-2" }, ml = {
  key: 0,
  class: "pointer-events-none"
}, fl = {
  key: 1,
  class: "pointer-events-none"
}, pl = ["disabled"], vl = ["disabled"], hl = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, gl = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, bl = ["textContent"], _l = { class: "ml-1 w-full h-fit" }, xl = { class: "text-left hidden md:block" }, yl = { class: "text-left md:hidden" }, wl = {
  key: 0,
  class: "ml-auto"
}, kl = ["title", "disabled", "onClick"], $l = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ a("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Sl = [
  $l
], Cl = {
  key: 0,
  class: "py-2"
}, El = ["disabled"], Al = {
  __name: "ModalUpload",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: o }), i = M(null), d = M(null), l = M(null), u = M(null), p = M(null), m = M(null), f = M([]), v = M(""), g = M(!1), A = M(!1);
    let y;
    function C(D) {
      return f.value.findIndex((E) => E.id === D);
    }
    function x(D, E = null) {
      E = E ?? (D.webkitRelativePath || D.name), y.addFile({
        name: E,
        type: D.type,
        data: D,
        source: "Local"
      });
    }
    function w(D) {
      switch (D.status) {
        case o.DONE:
          return "text-green-600";
        case o.ERROR:
          return "text-red-600";
        case o.CANCELED:
          return "text-red-600";
        case o.PENDING:
        default:
          return "";
      }
    }
    const z = (D) => {
      switch (D.status) {
        case o.DONE:
          return "✓";
        case o.ERROR:
        case o.CANCELED:
          return "!";
        case o.PENDING:
        default:
          return "...";
      }
    };
    function L() {
      u.value.click();
    }
    function $() {
      if (!g.value) {
        if (!f.value.filter((D) => D.status !== o.DONE).length) {
          v.value = s("Please select file to upload first.");
          return;
        }
        v.value = "", y.retryAll(), y.upload();
      }
    }
    function B() {
      y.cancelAll({ reason: "user" }), f.value.forEach((D) => {
        D.status !== o.DONE && (D.status = o.CANCELED, D.statusName = s("Canceled"));
      }), g.value = !1;
    }
    function P(D) {
      g.value || (y.removeFile(D.id, "removed-by-user"), f.value.splice(C(D.id), 1));
    }
    function I(D) {
      if (!g.value) {
        if (y.cancelAll({ reason: "user" }), D) {
          const E = [];
          f.value.forEach((k) => {
            k.status !== o.DONE && E.push(k);
          }), f.value = [], E.forEach((k) => {
            x(k.originalFile, k.name);
          });
          return;
        }
        f.value.splice(0);
      }
    }
    function N() {
      e.modal.close();
    }
    function V() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Me(async () => {
      y = new Gn({
        debug: e.debug,
        restrictions: {
          maxFileSize: or(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: n,
        onBeforeFileAdded(k, H) {
          if (H[k.id] != null) {
            const se = C(k.id);
            f.value[se].status === o.PENDING && (v.value = y.i18n("noDuplicates", { fileName: k.name })), f.value = f.value.filter((ce) => ce.id !== k.id);
          }
          return f.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), y.use(Wn, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, H) {
          let T;
          try {
            T = JSON.parse(k).message;
          } catch {
            T = s("Cannot parse server response.");
          }
          return new Error(T);
        }
      }), y.on("restriction-failed", (k, H) => {
        const T = f.value[C(k.id)];
        P(T), v.value = H.message;
      }), y.on("upload", () => {
        const k = V();
        y.setMeta({ ...k.body });
        const H = y.getPlugin("XHRUpload");
        H.opts.method = k.method, H.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), H.opts.headers = k.headers, delete k.headers["Content-Type"], g.value = !0, f.value.forEach((T) => {
          T.status !== o.DONE && (T.percent = null, T.status = o.UPLOADING, T.statusName = s("Pending upload"));
        });
      }), y.on("upload-progress", (k, H) => {
        const T = Math.floor(H.bytesUploaded / H.bytesTotal * 100);
        f.value[C(k.id)].percent = `${T}%`;
      }), y.on("upload-success", (k) => {
        const H = f.value[C(k.id)];
        H.status = o.DONE, H.statusName = s("Done");
      }), y.on("upload-error", (k, H) => {
        const T = f.value[C(k.id)];
        T.percent = null, T.status = o.ERROR, H.isNetworkError ? T.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : T.statusName = H ? H.message : s("Unknown Error");
      }), y.on("error", (k) => {
        v.value = k.message, g.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), y.on("complete", () => {
        g.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), p.value.addEventListener("click", () => {
        l.value.click();
      }), m.value.addEventListener("dragover", (k) => {
        k.preventDefault(), A.value = !0;
      }), m.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), A.value = !1;
      });
      function D(k, H) {
        H.isFile && H.file((T) => k(H, T)), H.isDirectory && H.createReader().readEntries((T) => {
          T.forEach((se) => {
            D(k, se);
          });
        });
      }
      m.value.addEventListener("drop", (k) => {
        k.preventDefault(), A.value = !1;
        const H = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((T) => {
          T.kind === "file" && D((se, ce) => {
            const ae = H.exec(se.fullPath);
            x(ce, ae[1]);
          }, T.webkitGetAsEntry());
        });
      });
      const E = ({ target: k }) => {
        const H = k.files;
        for (const T of H)
          x(T);
        k.value = "";
      };
      d.value.addEventListener("change", E), l.value.addEventListener("change", E);
    }), Oo(() => {
      y == null || y.close({ reason: "unmount" });
    }), (D, E) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          class: he(["vf-btn vf-btn-primary", g.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: g.value,
          onClick: st($, ["prevent"])
        }, b(r(s)("Upload")), 11, El),
        g.value ? (h(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(B, ["prevent"])
        }, b(r(s)("Cancel")), 1)) : (h(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(N, ["prevent"])
        }, b(r(s)("Close")), 1))
      ]),
      default: Z(() => [
        a("div", ll, [
          il,
          a("div", cl, [
            a("h3", dl, b(r(s)("Upload Files")), 1),
            a("div", ul, [
              a("div", {
                ref_key: "dropArea",
                ref: m,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: L
              }, [
                A.value ? (h(), _("div", ml, b(r(s)("Release to drop these files.")), 1)) : (h(), _("div", fl, b(r(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              a("div", {
                ref_key: "container",
                ref: i,
                class: "text-gray-500 mb-1"
              }, [
                a("button", {
                  ref_key: "pickFiles",
                  ref: u,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, b(r(s)("Select Files")), 513),
                a("button", {
                  ref_key: "pickFolders",
                  ref: p,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, b(r(s)("Select Folders")), 513),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: g.value,
                  onClick: E[0] || (E[0] = (k) => I(!1))
                }, b(r(s)("Clear all")), 9, pl),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: g.value,
                  onClick: E[1] || (E[1] = (k) => I(!0))
                }, b(r(s)("Clear only successful")), 9, vl)
              ], 512),
              a("div", hl, [
                (h(!0), _(ke, null, Ae(f.value, (k) => (h(), _("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: k.id
                }, [
                  a("span", gl, [
                    a("span", {
                      class: he(["text-base m-auto", w(k)]),
                      textContent: b(z(k))
                    }, null, 10, bl)
                  ]),
                  a("div", _l, [
                    a("div", xl, b(r(Us)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                    a("div", yl, b(r(Us)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                    a("div", {
                      class: he(["flex break-all text-left", w(k)])
                    }, [
                      ne(b(k.statusName) + " ", 1),
                      k.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (h(), _("b", wl, b(k.percent), 1)) : Y("", !0)
                    ], 2)
                  ]),
                  a("button", {
                    type: "button",
                    class: he(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", g.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: r(s)("Delete"),
                    disabled: g.value,
                    onClick: (H) => P(k)
                  }, Sl, 10, kl)
                ]))), 128)),
                f.value.length ? Y("", !0) : (h(), _("div", Cl, b(r(s)("No files selected!")), 1))
              ]),
              v.value.length ? (h(), ee(We, {
                key: 0,
                onHidden: E[2] || (E[2] = (k) => v.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(v.value), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])
        ]),
        a("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        a("input", {
          ref_key: "internalFolderInput",
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, Ml = { class: "sm:flex sm:items-start" }, Dl = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Tl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ll = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ol = { class: "mt-2" }, Hl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Bl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Vl = [
  Rl
], Il = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ul = [
  Nl
], zl = { class: "ml-1.5" }, Pl = { class: "my-1 text-sm text-gray-500" }, En = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(e.modal.data.items[0]), o = M(""), c = M([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: n.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (d) => {
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", Ml, [
          Dl,
          a("div", Tl, [
            a("h3", Ll, b(r(s)("Unarchive")), 1),
            a("div", Ol, [
              (h(!0), _(ke, null, Ae(c.value, (u) => (h(), _("p", Hl, [
                u.type === "dir" ? (h(), _("svg", Bl, Vl)) : (h(), _("svg", Il, Ul)),
                a("span", zl, b(u.basename), 1)
              ]))), 256)),
              a("p", Pl, b(r(s)("The archive will be unarchived at")) + " (" + b(r(e).fs.data.dirname) + ")", 1),
              o.value.length ? (h(), ee(We, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Fl = { class: "sm:flex sm:items-start" }, jl = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), ql = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Gl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Wl = { class: "mt-2" }, Yl = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Kl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Jl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ql = [
  Xl
], Zl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ei = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ti = [
  ei
], si = { class: "ml-1.5" }, oi = ["placeholder"], An = {
  __name: "ModalArchive",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(""), o = M(""), c = M(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: n.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (d) => {
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: Z(() => [
        a("div", Fl, [
          jl,
          a("div", ql, [
            a("h3", Gl, b(r(s)("Archive the files")), 1),
            a("div", Wl, [
              a("div", Yl, [
                (h(!0), _(ke, null, Ae(c.value, (u) => (h(), _("p", Kl, [
                  u.type === "dir" ? (h(), _("svg", Jl, Ql)) : (h(), _("svg", Zl, ti)),
                  a("span", si, b(u.basename), 1)
                ]))), 256))
              ]),
              ge(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => n.value = u),
                onKeyup: yt(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, oi), [
                [wt, n.value]
              ]),
              o.value.length ? (h(), ee(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ri = /* @__PURE__ */ a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), ai = [
  ri
];
function li(t, e) {
  return h(), _("svg", ni, [...ai]);
}
const ii = { render: li }, ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, di = /* @__PURE__ */ a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), ui = [
  di
];
function mi(t, e) {
  return h(), _("svg", ci, [...ui]);
}
const fi = { render: mi }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, vi = /* @__PURE__ */ a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), hi = [
  vi
];
function gi(t, e) {
  return h(), _("svg", pi, [...hi]);
}
const bi = { render: gi }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, xi = /* @__PURE__ */ a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), yi = [
  xi
];
function wi(t, e) {
  return h(), _("svg", _i, [...yi]);
}
const ki = { render: wi }, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Si = /* @__PURE__ */ a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), Ci = [
  Si
];
function Ei(t, e) {
  return h(), _("svg", $i, [...Ci]);
}
const Ai = { render: Ei }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Di = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Ti = [
  Di
];
function Li(t, e) {
  return h(), _("svg", Mi, [...Ti]);
}
const Oi = { render: Li }, Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Bi = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Ri = [
  Bi
];
function Vi(t, e) {
  return h(), _("svg", Hi, [...Ri]);
}
const Ii = { render: Vi }, Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Ui = /* @__PURE__ */ a("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), zi = /* @__PURE__ */ a("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), Pi = [
  Ui,
  zi
];
function Fi(t, e) {
  return h(), _("svg", Ni, [...Pi]);
}
const Mn = { render: Fi }, ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, qi = /* @__PURE__ */ a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), Gi = [
  qi
];
function Wi(t, e) {
  return h(), _("svg", ji, [...Gi]);
}
const Yi = { render: Wi }, Ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ji = /* @__PURE__ */ a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), Xi = [
  Ji
];
function Qi(t, e) {
  return h(), _("svg", Ki, [...Xi]);
}
const Zi = { render: Qi }, ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, tc = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), sc = [
  tc
];
function oc(t, e) {
  return h(), _("svg", ec, [...sc]);
}
const nc = { render: oc }, rc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ac = /* @__PURE__ */ a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), lc = [
  ac
];
function ic(t, e) {
  return h(), _("svg", rc, [...lc]);
}
const cc = { render: ic }, dc = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, uc = {
  key: 0,
  class: "flex text-center"
}, mc = ["aria-label"], fc = ["aria-label"], pc = ["aria-label"], vc = ["aria-label"], hc = ["aria-label"], gc = ["aria-label"], bc = ["aria-label"], _c = {
  key: 1,
  class: "flex text-center"
}, xc = { class: "pl-2" }, yc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, wc = { class: "flex text-center items-center justify-end" }, kc = ["aria-label"], $c = ["aria-label"], Sc = {
  __name: "Toolbar",
  setup(t) {
    const e = ue("ServiceContainer"), { setStore: s } = e.storage, { t: n } = e.i18n, o = e.dragSelect, c = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen, s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    }, d = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (h(), _("div", dc, [
      c.value.length ? (h(), _("div", _c, [
        a("div", xc, [
          ne(b(r(n)("Search results for")) + " ", 1),
          a("span", yc, b(c.value), 1)
        ]),
        r(e).fs.loading ? (h(), ee(r(Mn), { key: 0 })) : Y("", !0)
      ])) : (h(), _("div", uc, [
        r(e).features.includes(r(ve).NEW_FOLDER) ? (h(), _("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": r(n)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: u[0] || (u[0] = (p) => r(e).modal.open($n, { items: r(o).getSelected() }))
        }, [
          te(r(ii))
        ], 8, mc)) : Y("", !0),
        r(e).features.includes(r(ve).NEW_FILE) ? (h(), _("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": r(n)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[1] || (u[1] = (p) => r(e).modal.open(Ta, { items: r(o).getSelected() }))
        }, [
          te(r(fi))
        ], 8, fc)) : Y("", !0),
        r(e).features.includes(r(ve).RENAME) ? (h(), _("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": r(n)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[2] || (u[2] = (p) => r(o).getCount() !== 1 || r(e).modal.open(Sn, { items: r(o).getSelected() }))
        }, [
          te(r(bi), {
            class: he(r(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, pc)) : Y("", !0),
        r(e).features.includes(r(ve).DELETE) ? (h(), _("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": r(n)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[3] || (u[3] = (p) => !r(o).getCount() || r(e).modal.open(Cn, { items: r(o).getSelected() }))
        }, [
          te(r(ki), {
            class: he(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vc)) : Y("", !0),
        r(e).features.includes(r(ve).UPLOAD) ? (h(), _("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": r(n)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[4] || (u[4] = (p) => r(e).modal.open(Al, { items: r(o).getSelected() }))
        }, [
          te(r(Ai))
        ], 8, hc)) : Y("", !0),
        r(e).features.includes(r(ve).UNARCHIVE) && r(o).getCount() === 1 && r(o).getSelected()[0].mime_type === "application/zip" ? (h(), _("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": r(n)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[5] || (u[5] = (p) => !r(o).getCount() || r(e).modal.open(En, { items: r(o).getSelected() }))
        }, [
          te(r(Ii), {
            class: he(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, gc)) : Y("", !0),
        r(e).features.includes(r(ve).ARCHIVE) ? (h(), _("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": r(n)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[6] || (u[6] = (p) => !r(o).getCount() || r(e).modal.open(An, { items: r(o).getSelected() }))
        }, [
          te(r(Oi), {
            class: he(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, bc)) : Y("", !0)
      ])),
      a("div", wc, [
        r(e).features.includes(r(ve).FULL_SCREEN) ? (h(), _("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          "aria-label": r(n)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip"
        }, [
          r(e).fullScreen ? (h(), ee(r(Zi), { key: 0 })) : (h(), ee(r(Yi), { key: 1 }))
        ], 8, kc)) : Y("", !0),
        a("div", {
          class: "mx-1.5",
          "aria-label": r(n)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u[7] || (u[7] = (p) => c.value.length || d())
        }, [
          r(e).view === "grid" ? (h(), ee(r(nc), {
            key: 0,
            class: he(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : Y("", !0),
          r(e).view === "list" ? (h(), ee(r(cc), {
            key: 1,
            class: he(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : Y("", !0)
        ], 8, $c)
      ])
    ]));
  }
}, Cc = (t, e = 0, s = !1) => {
  let n;
  return (...o) => {
    s && !n && t(...o), clearTimeout(n), n = setTimeout(() => {
      t(...o);
    }, e);
  };
}, Mo = (t, e, s) => {
  const n = M(t);
  return Nn((o, c) => ({
    get() {
      return o(), n.value;
    },
    set: Cc(
      (i) => {
        n.value = i, c();
      },
      e,
      s
    )
  }));
}, Ec = { class: "sm:flex sm:items-start" }, Ac = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Mc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Dc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Tc = { class: "text-sm text-gray-500 pb-1" }, Lc = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, Oc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Hc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Rc = [
  Bc
], Vc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ic = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Nc = [
  Ic
], Uc = { class: "ml-1.5" }, zc = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, Pc = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, Fc = /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ a("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), jc = { class: "ml-1.5 overflow-auto" }, qc = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, zs = {
  __name: "ModalMove",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(e.modal.data.items.from), o = M(""), c = () => {
      n.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: n.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1),
        a("div", qc, b(r(s)("%s item(s) selected.", n.value.length)), 1)
      ]),
      default: Z(() => [
        a("div", Ec, [
          Ac,
          a("div", Mc, [
            a("h3", Dc, b(r(s)("Move files")), 1),
            a("p", Tc, b(r(s)("Are you sure you want to move these files?")), 1),
            a("div", Lc, [
              (h(!0), _(ke, null, Ae(n.value, (l) => (h(), _("div", Oc, [
                a("div", null, [
                  l.type === "dir" ? (h(), _("svg", Hc, Rc)) : (h(), _("svg", Vc, Nc))
                ]),
                a("div", Uc, b(l.path), 1)
              ]))), 256))
            ]),
            a("h4", zc, b(r(s)("Target Directory")), 1),
            a("p", Pc, [
              Fc,
              a("span", jc, b(r(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (h(), ee(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => o.value = ""),
              error: ""
            }, {
              default: Z(() => [
                ne(b(o.value), 1)
              ]),
              _: 1
            })) : Y("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, Wc = /* @__PURE__ */ a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), Yc = [
  Wc
];
function Kc(t, e) {
  return h(), _("svg", Gc, [...Yc]);
}
const Jc = { render: Kc }, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, Qc = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), Zc = [
  Qc
];
function ed(t, e) {
  return h(), _("svg", Xc, [...Zc]);
}
const td = { render: ed }, sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, od = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), nd = [
  od
];
function rd(t, e) {
  return h(), _("svg", sd, [...nd]);
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, id = /* @__PURE__ */ a("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), cd = [
  id
];
function dd(t, e) {
  return h(), _("svg", ld, [...cd]);
}
const ud = { render: dd }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, fd = /* @__PURE__ */ a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), pd = [
  fd
];
function vd(t, e) {
  return h(), _("svg", md, [...pd]);
}
const hd = { render: vd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, bd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), _d = [
  bd
];
function xd(t, e) {
  return h(), _("svg", gd, [..._d]);
}
const yd = { render: xd }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, kd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), $d = [
  kd
];
function Sd(t, e) {
  return h(), _("svg", wd, [...$d]);
}
const Dn = { render: Sd }, Cd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Ed = /* @__PURE__ */ a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Ad = [
  Ed
];
function Md(t, e) {
  return h(), _("svg", Cd, [...Ad]);
}
const Dd = { render: Md }, Td = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, Ld = ["aria-label"], Od = ["aria-label"], Hd = ["aria-label"], Bd = { class: "flex leading-6" }, Rd = {
  key: 0,
  class: "flex"
}, Vd = /* @__PURE__ */ a("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Id = { class: "relative" }, Nd = /* @__PURE__ */ a("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Ud = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], zd = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, Pd = ["placeholder"], Fd = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, jd = ["onDrop", "onClick"], qd = { class: "flex pointer-events-none" }, Gd = { class: "inline-block w-full text-ellipsis overflow-hidden" }, Wd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = e.dragSelect, o = M(null), c = Mo(0, 100);
    At(c, (L) => {
      const $ = o.value.children;
      let B = 0, P = 0, I = 5, N = 1;
      e.fs.limitBreadcrumbItems(I), Mt(() => {
        for (let V = $.length - 1; V >= 0 && !(B + $[V].offsetWidth > c.value - 40); V--)
          B += parseInt($[V].offsetWidth, 10), P++;
        P < N && (P = N), P > I && (P = I), e.fs.limitBreadcrumbItems(P);
      });
    });
    const i = () => {
      c.value = o.value.offsetWidth;
    };
    Me(() => {
      new ResizeObserver(i).observe(o.value);
    });
    const d = (L, $ = null) => {
      L.preventDefault(), n.isDraggingRef.value = !1, p(L), $ ?? ($ = e.fs.hiddenBreadcrumbs.length - 1);
      let B = JSON.parse(L.dataTransfer.getData("items"));
      if (B.find((P) => P.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zs, {
        items: {
          from: B,
          to: e.fs.hiddenBreadcrumbs[$] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, l = (L, $ = null) => {
      L.preventDefault(), n.isDraggingRef.value = !1, p(L), $ ?? ($ = e.fs.breadcrumbs.length - 2);
      let B = JSON.parse(L.dataTransfer.getData("items"));
      if (B.find((P) => P.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zs, {
        items: {
          from: B,
          to: e.fs.breadcrumbs[$] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (L) => {
      L.preventDefault(), e.fs.isGoUpAvailable() ? (L.dataTransfer.dropEffect = "copy", L.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none");
    }, p = (L) => {
      L.preventDefault(), L.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && L.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      w(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, f = () => {
      w(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, v = (L) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: L.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, g = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, A = {
      mounted(L, $, B, P) {
        L.clickOutsideEvent = function(I) {
          L === I.target || L.contains(I.target) || $.value();
        }, document.body.addEventListener("click", L.clickOutsideEvent);
      },
      beforeUnmount(L, $, B, P) {
        document.body.removeEventListener("click", L.clickOutsideEvent);
      }
    }, y = M(null), C = () => {
      e.features.includes(ve.SEARCH) && (e.fs.searchMode = !0, Mt(() => y.value.focus()));
    }, x = Mo("", 400);
    At(x, (L) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: L });
    });
    const w = () => {
      e.fs.searchMode = !1, x.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      w();
    });
    const z = () => {
      x.value === "" && w();
    };
    return (L, $) => (h(), _("div", Td, [
      a("span", {
        "aria-label": r(s)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        te(r(td), {
          onDragover: $[0] || ($[0] = (B) => u(B)),
          onDragleave: $[1] || ($[1] = (B) => p(B)),
          onDrop: $[2] || ($[2] = (B) => l(B)),
          onClick: f,
          class: he(r(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, Ld),
      r(e).fs.loading ? (h(), _("span", {
        key: 1,
        "aria-label": r(s)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        te(r(ad), {
          onClick: $[3] || ($[3] = (B) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Hd)) : (h(), _("span", {
        key: 0,
        "aria-label": r(s)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        te(r(Jc), { onClick: m })
      ], 8, Od)),
      ge(a("div", {
        onClick: st(C, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        a("div", null, [
          te(r(ud), {
            onDragover: $[4] || ($[4] = (B) => u(B)),
            onDragleave: $[5] || ($[5] = (B) => p(B)),
            onDrop: $[6] || ($[6] = (B) => l(B, -1)),
            onClick: $[7] || ($[7] = (B) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter } }))
          })
        ]),
        a("div", Bd, [
          r(e).fs.hiddenBreadcrumbs.length ? ge((h(), _("div", Rd, [
            Vd,
            a("div", Id, [
              a("span", {
                onDragenter: $[8] || ($[8] = (B) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: $[9] || ($[9] = (B) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                te(r(Dd), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [A, g]
          ]) : Y("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: o,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: st(C, ["self"])
        }, [
          (h(!0), _(ke, null, Ae(r(e).fs.breadcrumbs, (B, P) => (h(), _("div", { key: P }, [
            Nd,
            a("span", {
              onDragover: (I) => P === r(e).fs.breadcrumbs.length - 1 || u(I),
              onDragleave: (I) => P === r(e).fs.breadcrumbs.length - 1 || p(I),
              onDrop: (I) => P === r(e).fs.breadcrumbs.length - 1 || l(I, P),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: B.basename,
              onClick: (I) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter, path: B.path } })
            }, b(B.name), 41, Ud)
          ]))), 128))
        ], 512),
        r(e).fs.loading ? (h(), ee(r(Mn), { key: 0 })) : Y("", !0)
      ], 512), [
        [tt, !r(e).fs.searchMode]
      ]),
      ge(a("div", zd, [
        a("div", null, [
          te(r(hd))
        ]),
        ge(a("input", {
          ref_key: "searchInput",
          ref: y,
          onKeydown: yt(w, ["esc"]),
          onBlur: z,
          "onUpdate:modelValue": $[10] || ($[10] = (B) => Ho(x) ? x.value = B : null),
          placeholder: r(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Pd), [
          [wt, r(x)]
        ]),
        te(r(yd), { onClick: w })
      ], 512), [
        [tt, r(e).fs.searchMode]
      ]),
      ge(a("div", Fd, [
        (h(!0), _(ke, null, Ae(r(e).fs.hiddenBreadcrumbs, (B, P) => (h(), _("div", {
          key: P,
          onDragover: $[11] || ($[11] = (I) => u(I)),
          onDragleave: $[12] || ($[12] = (I) => p(I)),
          onDrop: (I) => d(I, P),
          onClick: (I) => v(B),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          a("div", qd, [
            a("span", null, [
              te(r(Dn), { class: "h-5 w-5" })
            ]),
            ne(),
            a("span", Gd, b(B.name), 1)
          ])
        ], 40, jd))), 128))
      ], 512), [
        [tt, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Tn = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Yd = ["onClick"], Kd = {
  __name: "Toast",
  setup(t) {
    const e = ue("ServiceContainer"), { getStore: s } = e.storage, n = M(s("full-screen", !1)), o = M([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      o.value.splice(l, 1);
    }, d = (l) => {
      let u = o.value.findIndex((p) => p.id === l);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, o.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (h(), _("div", {
      class: he([n.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      te(Un, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: Z(() => [
          (h(!0), _(ke, null, Ae(o.value, (p, m) => (h(), _("div", {
            onClick: (f) => i(m),
            key: p,
            class: he([c(p.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, b(p.label), 11, Yd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Jd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, Xd = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), Qd = [
  Xd
];
function Zd(t, e) {
  return h(), _("svg", Jd, [...Qd]);
}
const eu = { render: Zd }, tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, su = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), ou = [
  su
];
function nu(t, e) {
  return h(), _("svg", tu, [...ou]);
}
const ru = { render: nu }, Gt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (h(), _("div", null, [
      t.direction === "asc" ? (h(), ee(r(eu), { key: 0 })) : Y("", !0),
      t.direction === "desc" ? (h(), ee(r(ru), { key: 1 })) : Y("", !0)
    ]));
  }
}, au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, lu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), iu = [
  lu
];
function cu(t, e) {
  return h(), _("svg", au, [...iu]);
}
const du = { render: cu }, xs = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    return (e, s) => (h(), _("span", null, [
      t.type === "dir" ? (h(), ee(r(Dn), {
        key: 0,
        class: he({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"])) : (h(), ee(r(du), {
        key: 1,
        class: he({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, mu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), fu = [
  mu
];
function pu(t, e) {
  return h(), _("svg", uu, [...fu]);
}
const vu = { render: pu }, hu = { class: "absolute -z-50 -top-96" }, gu = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, bu = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, n) => (h(), _("div", hu, [
      te(r(vu)),
      a("div", gu, b(e.count), 1)
    ]));
  }
}, _u = { class: "flex" }, xu = ["aria-label"], yu = { class: "ml-auto mb-2" }, wu = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, ku = { key: 1 }, $u = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = M(""), o = M(""), c = M(null), i = M(!1), d = M(""), l = M(!1), u = ue("ServiceContainer"), { t: p } = u.i18n;
    Me(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((v) => {
        n.value = v, s("success");
      });
    });
    const m = () => {
      i.value = !i.value, o.value = n.value;
    }, f = () => {
      d.value = "", l.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((v) => {
        d.value = p("Updated."), n.value = v, s("success"), i.value = !i.value;
      }).catch((v) => {
        d.value = p(v.message), l.value = !0;
      });
    };
    return (v, g) => (h(), _(ke, null, [
      a("div", _u, [
        a("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(u).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(u).modal.data.item.basename), 9, xu),
        a("div", yu, [
          i.value ? (h(), _("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(r(p)("Save")), 1)) : Y("", !0),
          r(u).features.includes(r(ve).EDIT) ? (h(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: g[0] || (g[0] = (A) => m())
          }, b(i.value ? r(p)("Cancel") : r(p)("Edit")), 1)) : Y("", !0)
        ])
      ]),
      a("div", null, [
        i.value ? (h(), _("div", ku, [
          ge(a("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": g[1] || (g[1] = (A) => o.value = A),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [wt, o.value]
          ])
        ])) : (h(), _("pre", wu, b(n.value), 1)),
        d.value.length ? (h(), ee(We, {
          key: 2,
          onHidden: g[2] || (g[2] = (A) => d.value = ""),
          error: l.value
        }, {
          default: Z(() => [
            ne(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : Y("", !0)
      ])
    ], 64));
  }
}, Su = { class: "flex" }, Cu = ["aria-label"], Eu = { class: "ml-auto mb-2" }, Au = { class: "w-full flex justify-center" }, Mu = ["src"], Du = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = ue("ServiceContainer"), { t: o } = n.i18n, c = M(null), i = M(null), d = M(!1), l = M(""), u = M(!1), p = () => {
      d.value = !d.value, d.value ? i.value = new Kn(c.value, {
        crop(f) {
        }
      }) : i.value.destroy();
    }, m = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (f) => {
          l.value = "", u.value = !1;
          const v = new FormData();
          v.set("file", f), n.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: n.modal.data.adapter,
              path: n.modal.data.item.path
            },
            body: v
          }).then((g) => {
            l.value = o("Updated."), c.value.src = n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item), p(), s("success");
          }).catch((g) => {
            l.value = o(g.message), u.value = !0;
          });
        }
      );
    };
    return Me(() => {
      s("success");
    }), (f, v) => (h(), _(ke, null, [
      a("div", Su, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(n).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(n).modal.data.item.basename), 9, Cu),
        a("div", Eu, [
          d.value ? (h(), _("button", {
            key: 0,
            onClick: m,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(r(o)("Crop")), 1)) : Y("", !0),
          r(n).features.includes(r(ve).EDIT) ? (h(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: v[0] || (v[0] = (g) => p())
          }, b(d.value ? r(o)("Cancel") : r(o)("Edit")), 1)) : Y("", !0)
        ])
      ]),
      a("div", Au, [
        a("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: r(n).requester.getPreviewUrl(r(n).modal.data.adapter, r(n).modal.data.item),
          alt: ""
        }, null, 8, Mu)
      ]),
      l.value.length ? (h(), ee(We, {
        key: 0,
        onHidden: v[1] || (v[1] = (g) => l.value = ""),
        error: u.value
      }, {
        default: Z(() => [
          ne(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : Y("", !0)
    ], 64));
  }
}, Tu = { class: "flex" }, Lu = ["aria-label"], Ou = /* @__PURE__ */ a("div", null, null, -1), Hu = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ue("ServiceContainer"), n = e;
    return Me(() => {
      n("success");
    }), (o, c) => (h(), _(ke, null, [
      a("div", Tu, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(s).modal.data.item.basename), 9, Lu)
      ]),
      Ou
    ], 64));
  }
}, Bu = ["aria-label"], Ru = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, Vu = ["src"], Iu = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ue("ServiceContainer"), n = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Me(() => {
      n("success");
    }), (c, i) => (h(), _("div", null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(s).modal.data.item.basename), 9, Bu),
      a("div", null, [
        a("video", Ru, [
          a("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, Vu),
          ne(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Nu = ["aria-label"], Uu = {
  class: "w-full",
  controls: ""
}, zu = ["src"], Pu = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = ue("ServiceContainer"), o = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Me(() => {
      s("success");
    }), (c, i) => (h(), _(ke, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(n).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(n).modal.data.item.basename), 9, Nu),
      a("div", null, [
        a("audio", Uu, [
          a("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, zu),
          ne(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, Fu = ["aria-label"], ju = ["data"], qu = ["src"], Gu = /* @__PURE__ */ a("p", null, [
  /* @__PURE__ */ ne(" Your browser does not support PDFs. "),
  /* @__PURE__ */ a("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ ne(" . ")
], -1), Wu = [
  Gu
], Yu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ue("ServiceContainer"), n = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Me(() => {
      n("success");
    }), (c, i) => (h(), _(ke, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(s).modal.data.item.basename), 9, Fu),
      a("div", null, [
        a("object", {
          class: "h-[60vh]",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "border-0",
            src: o(),
            width: "100%",
            height: "100%"
          }, Wu, 8, qu)
        ], 8, ju)
      ])
    ], 64));
  }
}, Ku = { class: "sm:flex sm:items-start" }, Ju = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Xu = { key: 0 }, Qu = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Zu = {
  key: 0,
  class: "flex leading-5"
}, e0 = /* @__PURE__ */ a("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ a("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ a("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), t0 = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, s0 = { class: "font-bold" }, o0 = { class: "font-bold pl-2" }, n0 = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, r0 = ["download", "href"], Ln = {
  __name: "ModalPreview",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(ve.PREVIEW);
    return c || (n.value = !0), (i, d) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Close")), 1),
        r(e).features.includes(r(ve).DOWNLOAD) ? (h(), _("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, b(r(s)("Download")), 9, r0)) : Y("", !0)
      ]),
      default: Z(() => [
        a("div", Ku, [
          a("div", Ju, [
            r(c) ? (h(), _("div", Xu, [
              o("text") ? (h(), ee($u, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => n.value = !0)
              })) : o("image") ? (h(), ee(Du, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => n.value = !0)
              })) : o("video") ? (h(), ee(Iu, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => n.value = !0)
              })) : o("audio") ? (h(), ee(Pu, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => n.value = !0)
              })) : o("application/pdf") ? (h(), ee(Yu, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => n.value = !0)
              })) : (h(), ee(Hu, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => n.value = !0)
              }))
            ])) : Y("", !0),
            a("div", Qu, [
              n.value === !1 ? (h(), _("div", Zu, [
                e0,
                a("span", null, b(r(s)("Loading")), 1)
              ])) : Y("", !0)
            ])
          ])
        ]),
        a("div", t0, [
          a("div", null, [
            a("span", s0, b(r(s)("File Size")) + ": ", 1),
            ne(b(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", o0, b(r(s)("Last Modified")) + ": ", 1),
            ne(" " + b(r(Tn)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(ve).DOWNLOAD) ? (h(), _("div", n0, [
          a("span", null, b(r(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : Y("", !0)
      ]),
      _: 1
    }));
  }
}, a0 = ["data-type", "data-item", "data-index"], ys = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ue("ServiceContainer"), s = e.dragSelect, n = t, o = (f) => {
      f.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: f.path } })) : e.modal.open(Ln, { adapter: e.fs.adapter, item: f });
    }, c = {
      mounted(f, v, g, A) {
        g.props.draggable && (f.addEventListener("dragstart", (y) => i(y, v.value)), f.addEventListener("dragover", (y) => l(y, v.value)), f.addEventListener("drop", (y) => d(y, v.value)));
      },
      beforeUnmount(f, v, g, A) {
        g.props.draggable && (f.removeEventListener("dragstart", i), f.removeEventListener("dragover", l), f.removeEventListener("drop", d));
      }
    }, i = (f, v) => {
      if (f.altKey || f.ctrlKey || f.metaKey)
        return f.preventDefault(), !1;
      s.isDraggingRef.value = !0, f.dataTransfer.setDragImage(n.dragImage.$el, 0, 15), f.dataTransfer.effectAllowed = "all", f.dataTransfer.dropEffect = "copy", f.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (f, v) => {
      f.preventDefault(), s.isDraggingRef.value = !1;
      let g = JSON.parse(f.dataTransfer.getData("items"));
      if (g.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zs, { items: { from: g, to: v } });
    }, l = (f, v) => {
      f.preventDefault(), !v || v.type !== "dir" || s.getSelection().find((g) => g === f.currentTarget) ? (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : f.dataTransfer.dropEffect = "copy";
    };
    let u = null;
    const p = () => {
      u && clearTimeout(u);
    }, m = (f) => {
      u = setTimeout(() => {
        const v = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: f.target.getBoundingClientRect().x,
          clientY: f.target.getBoundingClientRect().y
        });
        f.target.dispatchEvent(v);
      }, 500);
    };
    return (f, v) => ge((h(), _("div", {
      style: Ps({ opacity: r(s).isDraggingRef.value && r(s).getSelection().find((g) => f.$el === g) ? "0.5 !important" : "" }),
      class: he(["vf-item-" + r(s).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: v[0] || (v[0] = (g) => o(t.item)),
      onTouchstart: v[1] || (v[1] = (g) => m(g)),
      onTouchend: v[2] || (v[2] = (g) => p()),
      onContextmenu: v[3] || (v[3] = st((g) => r(e).emitter.emit("vf-contextmenu-show", { event: g, items: r(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Dt(f.$slots, "default")
    ], 46, a0)), [
      [c, t.item]
    ]);
  }
}, l0 = { class: "relative flex-auto flex flex-col overflow-hidden" }, i0 = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, c0 = { class: "relative" }, d0 = { class: "grid grid-cols-12 items-center" }, u0 = { class: "flex col-span-7 items-center" }, m0 = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, f0 = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, p0 = { class: "grid grid-cols-12 items-center" }, v0 = { class: "flex col-span-7 items-center" }, h0 = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, g0 = { class: "col-span-2 text-center" }, b0 = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, _0 = { class: "relative" }, x0 = ["data-src", "alt"], y0 = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, w0 = { class: "break-all" }, k0 = {
  __name: "Explorer",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = (m) => m == null ? void 0 : m.substring(0, 3), o = M(null), c = M(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      c.value = m, m ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: m
        },
        onSuccess: (f) => {
          f.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = Ot({ active: !1, column: "", order: "" }), u = (m = !0) => {
      let f = [...e.fs.data.files], v = l.column, g = l.order === "asc" ? 1 : -1;
      if (!m)
        return f;
      const A = (y, C) => typeof y == "string" && typeof C == "string" ? y.toLowerCase().localeCompare(C.toLowerCase()) : y < C ? -1 : y > C ? 1 : 0;
      return l.active && (f = f.slice().sort((y, C) => A(y[v], C[v]) * g)), f;
    }, p = (m) => {
      l.active && l.column === m ? (l.active = l.order === "asc", l.column = m, l.order = "desc") : (l.active = !0, l.column = m, l.order = "asc");
    };
    return Me(() => {
      d = new Yn(i.area.value);
    }), Lo(() => {
      d.update();
    }), Oo(() => {
      d.destroy();
    }), (m, f) => (h(), _("div", l0, [
      r(e).view === "list" || c.value.length ? (h(), _("div", i0, [
        a("div", {
          onClick: f[0] || (f[0] = (v) => p("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          ne(b(r(s)("Name")) + " ", 1),
          ge(te(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? Y("", !0) : (h(), _("div", {
          key: 0,
          onClick: f[1] || (f[1] = (v) => p("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          ne(b(r(s)("Size")) + " ", 1),
          ge(te(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? Y("", !0) : (h(), _("div", {
          key: 1,
          onClick: f[2] || (f[2] = (v) => p("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          ne(b(r(s)("Date")) + " ", 1),
          ge(te(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (h(), _("div", {
          key: 2,
          onClick: f[3] || (f[3] = (v) => p("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          ne(b(r(s)("Filepath")) + " ", 1),
          ge(te(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "path"]
          ])
        ])) : Y("", !0)
      ])) : Y("", !0),
      a("div", c0, [
        te(bu, {
          ref_key: "dragImage",
          ref: o,
          count: r(i).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(i).scrollBarContainer,
        class: he(["vf-explorer-scrollbar-container", [{ "grid-view": r(e).view === "grid" }]])
      }, [
        a("div", {
          ref: r(i).scrollBar,
          class: "w-5 bg-transparent pointer-events-none"
        }, null, 512)
      ], 2),
      a("div", {
        ref: r(i).area,
        class: he([{ "resize-y": !r(e).fullScreen }, "h-full w-full text-xs vf-explorer-scrollbar vf-selector-area min-h-[150px] z-0 overflow-y-auto"]),
        onContextmenu: f[4] || (f[4] = st((v) => r(e).emitter.emit("vf-contextmenu-show", { event: v, items: r(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (h(!0), _(ke, { key: 0 }, Ae(u(), (v, g) => (h(), ee(ys, {
          item: v,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: Z(() => [
            a("div", d0, [
              a("div", u0, [
                te(xs, {
                  type: v.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", m0, b(v.basename), 1)
              ]),
              a("div", f0, b(v.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : Y("", !0),
        r(e).view === "list" && !c.value.length ? (h(!0), _(ke, { key: 1 }, Ae(u(), (v, g) => (h(), ee(ys, {
          item: v,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true"
        }, {
          default: Z(() => [
            a("div", p0, [
              a("div", v0, [
                te(xs, {
                  type: v.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", h0, b(v.basename), 1)
              ]),
              a("div", g0, b(v.file_size ? r(e).filesize(v.file_size) : ""), 1),
              a("div", b0, b(r(Tn)(v.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : Y("", !0),
        r(e).view === "grid" && !c.value.length ? (h(!0), _(ke, { key: 2 }, Ae(u(!1), (v, g) => (h(), ee(ys, {
          item: v,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Z(() => [
            a("div", null, [
              a("div", _0, [
                (v.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (h(), _("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, v),
                  alt: v.basename,
                  key: v.path
                }, null, 8, x0)) : (h(), ee(xs, {
                  key: 1,
                  type: v.type
                }, null, 8, ["type"])),
                !((v.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && v.type !== "dir" ? (h(), _("div", y0, b(n(v.extension)), 1)) : Y("", !0)
              ]),
              a("span", w0, b(r(Us)(v.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : Y("", !0)
      ], 34),
      te(Kd)
    ]));
  }
}, $0 = ["href", "download"], S0 = ["onClick"], C0 = {
  __name: "ContextMenu",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(null), o = M([]), c = M(""), i = Ot({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = dt(() => i.items.filter((m) => m.key == null || e.features.includes(m.key)));
    e.emitter.on("vf-context-selected", (m) => {
      o.value = m;
    });
    const l = {
      newfolder: {
        key: ve.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open($n)
      },
      delete: {
        key: ve.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.modal.open(Cn, { items: o });
        }
      },
      refresh: {
        title: () => s("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: ve.PREVIEW,
        title: () => s("Preview"),
        action: () => e.modal.open(Ln, { adapter: e.fs.adapter, item: o.value[0] })
      },
      open: {
        title: () => s("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: o.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => s("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: o.value[0].dir
            }
          });
        }
      },
      download: {
        key: ve.DOWNLOAD,
        link: dt(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: ve.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(An, { items: o })
      },
      unarchive: {
        key: ve.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(En, { items: o })
      },
      rename: {
        key: ve.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(Sn, { items: o })
      }
    }, u = (m) => {
      e.emitter.emit("vf-contextmenu-hide"), m.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      c.value = m;
    }), e.emitter.on("vf-contextmenu-show", ({ event: m, items: f, target: v = null }) => {
      if (i.items = [], c.value)
        if (v)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else
        !v && !c.value ? (i.items.push(l.refresh), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : f.length > 1 && f.some((g) => g.path === v.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", f)) : (v.type === "dir" ? i.items.push(l.open) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), v.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [v]));
      p(m);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (m) => {
      const f = e.dragSelect.area.value, v = e.root.getBoundingClientRect(), g = f.getBoundingClientRect();
      let A = m.clientX - v.left, y = m.clientY - v.top;
      i.active = !0, Mt(() => {
        var z;
        const C = (z = n.value) == null ? void 0 : z.getBoundingClientRect();
        let x = (C == null ? void 0 : C.height) ?? 0, w = (C == null ? void 0 : C.width) ?? 0;
        A = g.right - m.pageX + window.scrollX < w ? A - w : A, y = g.bottom - m.pageY + window.scrollY < x ? y - x : y, i.positions = {
          left: A + "px",
          top: y + "px"
        };
      });
    };
    return (m, f) => ge((h(), _("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: Ps(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (h(!0), _(ke, null, Ae(d.value, (v) => (h(), _("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: v.title
      }, [
        v.link ? (h(), _("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: v.link,
          download: v.link,
          onClick: f[0] || (f[0] = (g) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(v.title()), 1)
        ], 8, $0)) : (h(), _("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (g) => u(v)
        }, [
          a("span", null, b(v.title()), 1)
        ], 8, S0))
      ]))), 128))
    ], 4)), [
      [tt, i.active]
    ]);
  }
}, E0 = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, o] of e)
    s[n] = o;
  return s;
}, A0 = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: s }) {
    const n = ue("ServiceContainer"), o = M(!1), { t: c } = n.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), o.value = !0, i = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Me(() => {
      n.emitter.on(t.on, d);
    }), To(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: c
    };
  }
}, M0 = { key: 1 };
function D0(t, e, s, n, o, c) {
  return h(), _("div", {
    class: he(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !n.shown }]])
  }, [
    t.$slots.default ? Dt(t.$slots, "default", { key: 0 }) : (h(), _("span", M0, b(n.t("Saved.")), 1))
  ], 2);
}
const pt = /* @__PURE__ */ E0(A0, [["render", D0]]), T0 = { class: "sm:flex sm:items-start" }, L0 = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ a("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), O0 = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, H0 = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, B0 = { class: "mt-2" }, R0 = { class: "text-sm text-gray-500" }, V0 = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, I0 = { class: "mt-3 text-left" }, N0 = { class: "space-y-2" }, U0 = { class: "flex relative gap-x-3" }, z0 = { class: "h-6 items-center" }, P0 = { class: "flex-1 block text-sm" }, F0 = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, j0 = { class: "flex relative gap-x-3" }, q0 = { class: "h-6 items-center" }, G0 = { class: "flex-1 block text-sm" }, W0 = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Y0 = { class: "flex relative gap-x-3" }, K0 = { class: "h-6 items-center" }, J0 = { class: "flex-1 block text-sm" }, X0 = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Q0 = { class: "flex relative gap-x-3" }, Z0 = { class: "h-6 items-center" }, em = { class: "flex-1 block text-sm" }, tm = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, sm = { class: "flex relative gap-x-3" }, om = { class: "h-6 items-center" }, nm = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, rm = { class: "flex text-sm" }, am = ["label"], lm = ["value"], im = {
  key: 0,
  class: "flex relative gap-x-3"
}, cm = { class: "h-6 items-center" }, dm = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, um = { class: "flex text-sm" }, mm = ["label"], fm = ["value"], pm = {
  __name: "ModalAbout",
  setup(t) {
    const e = ue("ServiceContainer"), { setStore: s, clearStore: n } = e.storage, { t: o, changeLocale: c, locale: i } = e.i18n, d = async () => {
      n(), location.reload();
    }, l = (C) => {
      e.theme.set(C), e.emitter.emit("vf-theme-saved");
    }, u = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ro : Bo, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, p = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, m = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, f = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: v } = ue("VueFinderOptions"), A = Object.fromEntries(
      Object.entries({
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([C]) => Object.keys(v).includes(C))
    ), y = dt(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (C, x) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: x[8] || (x[8] = (w) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(o)("Close")), 1)
      ]),
      default: Z(() => [
        a("div", T0, [
          L0,
          a("div", O0, [
            a("h3", H0, b(r(o)("About %s", "Vuefinder " + r(e).version)), 1),
            a("div", B0, [
              a("p", R0, b(r(o)("Vuefinder is a file manager component for vue 3.")), 1),
              a("div", null, [
                a("h3", V0, b(r(o)("Settings")), 1)
              ]),
              a("div", I0, [
                a("fieldset", null, [
                  a("div", N0, [
                    a("div", U0, [
                      a("div", z0, [
                        ge(a("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": x[0] || (x[0] = (w) => r(e).metricUnits = w),
                          onClick: u,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).metricUnits]
                        ])
                      ]),
                      a("div", P0, [
                        a("label", F0, [
                          ne(b(r(o)("Use Metric Units")) + " ", 1),
                          te(pt, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: Z(() => [
                              ne(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", j0, [
                      a("div", q0, [
                        ge(a("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": x[1] || (x[1] = (w) => r(e).compactListView = w),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).compactListView]
                        ])
                      ]),
                      a("div", G0, [
                        a("label", W0, [
                          ne(b(r(o)("Compact list view")) + " ", 1),
                          te(pt, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: Z(() => [
                              ne(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", Y0, [
                      a("div", K0, [
                        ge(a("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": x[2] || (x[2] = (w) => r(e).persist = w),
                          onClick: f,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).persist]
                        ])
                      ]),
                      a("div", J0, [
                        a("label", X0, [
                          ne(b(r(o)("Persist path on reload")) + " ", 1),
                          te(pt, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: Z(() => [
                              ne(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", Q0, [
                      a("div", Z0, [
                        ge(a("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": x[3] || (x[3] = (w) => r(e).showThumbnails = w),
                          onClick: m,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).showThumbnails]
                        ])
                      ]),
                      a("div", em, [
                        a("label", tm, [
                          ne(b(r(o)("Show thumbnails")) + " ", 1),
                          te(pt, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: Z(() => [
                              ne(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", sm, [
                      a("div", om, [
                        a("label", nm, b(r(o)("Theme")), 1)
                      ]),
                      a("div", rm, [
                        ge(a("select", {
                          id: "theme",
                          "onUpdate:modelValue": x[4] || (x[4] = (w) => r(e).theme.value = w),
                          onChange: x[5] || (x[5] = (w) => l(w.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: r(o)("Theme")
                          }, [
                            (h(!0), _(ke, null, Ae(y.value, (w, z) => (h(), _("option", { value: z }, b(w), 9, lm))), 256))
                          ], 8, am)
                        ], 544), [
                          [ws, r(e).theme.value]
                        ]),
                        te(pt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: Z(() => [
                            ne(b(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    r(e).features.includes(r(ve).LANGUAGE) && Object.keys(r(A)).length > 1 ? (h(), _("div", im, [
                      a("div", cm, [
                        a("label", dm, b(r(o)("Language")), 1)
                      ]),
                      a("div", um, [
                        ge(a("select", {
                          id: "language",
                          "onUpdate:modelValue": x[6] || (x[6] = (w) => Ho(i) ? i.value = w : null),
                          onChange: x[7] || (x[7] = (w) => r(c)(w.target.value)),
                          class: "flex-shrink-0 w-1/2 sm:w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: r(o)("Language")
                          }, [
                            (h(!0), _(ke, null, Ae(r(A), (w, z) => (h(), _("option", { value: z }, b(w), 9, fm))), 256))
                          ], 8, mm)
                        ], 544), [
                          [ws, r(i)]
                        ]),
                        te(pt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: Z(() => [
                            ne(b(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : Y("", !0),
                    a("button", {
                      onClick: d,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, b(r(o)("Reset Settings")), 1)
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
}, vm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, hm = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), gm = [
  hm
];
function bm(t, e) {
  return h(), _("svg", vm, [...gm]);
}
const _m = { render: bm }, xm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, ym = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), wm = [
  ym
];
function km(t, e) {
  return h(), _("svg", xm, [...wm]);
}
const $m = { render: km }, Sm = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Cm = { class: "flex leading-5 items-center" }, Em = ["aria-label"], Am = ["value"], Mm = { class: "ml-3" }, Dm = { key: 0 }, Tm = { class: "ml-1" }, Lm = { class: "flex leading-5 items-center justify-end" }, Om = ["disabled"], Hm = ["aria-label"], Bm = {
  __name: "Statusbar",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, { setStore: n } = e.storage, o = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), n("adapter", e.fs.adapter);
    }, i = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = dt(() => {
      const l = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (h(), _("div", Sm, [
      a("div", Cm, [
        a("div", {
          class: "mx-2",
          "aria-label": r(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, [
          te(r(_m))
        ], 8, Em),
        ge(a("select", {
          "onUpdate:modelValue": u[0] || (u[0] = (p) => r(e).fs.adapter = p),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (h(!0), _(ke, null, Ae(r(e).fs.data.storages, (p) => (h(), _("option", { value: p }, b(p), 9, Am))), 256))
        ], 544), [
          [ws, r(e).fs.adapter]
        ]),
        a("div", Mm, [
          i.value.length ? (h(), _("span", Dm, b(r(e).fs.data.files.length) + " items found. ", 1)) : Y("", !0),
          a("span", Tm, b(r(e).dragSelect.getCount() > 0 ? r(s)("%s item(s) selected.", r(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", Lm, [
        r(e).selectButton.active ? (h(), _("button", {
          key: 0,
          class: he(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (p) => r(e).selectButton.click(r(o).getSelected(), p))
        }, b(r(s)("Select")), 11, Om)) : Y("", !0),
        a("span", {
          class: "mr-1",
          "aria-label": r(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: u[2] || (u[2] = (p) => r(e).modal.open(pm))
        }, [
          te(r($m))
        ], 8, Hm)
      ])
    ]));
  }
}, Rm = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(t) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...t
        };
      }
    }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const s = e, o = ca(t, ue("VueFinderOptions"));
    zn("ServiceContainer", o);
    const { setStore: c } = o.storage, i = M(null);
    o.root = i;
    const d = o.dragSelect, l = (p) => {
      Object.assign(o.fs.data, p), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return o.emitter.on("vf-fetch-abort", () => {
      u.abort(), o.fs.loading = !1;
    }), o.emitter.on("vf-fetch", ({ params: p, body: m = null, onSuccess: f = null, onError: v = null, noCloseModal: g = !1 }) => {
      ["index", "search"].includes(p.q) && (u && u.abort(), o.fs.loading = !0), u = new AbortController();
      const A = u.signal;
      o.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: m,
        abortSignal: A
      }).then((y) => {
        o.fs.adapter = y.adapter, o.persist && (o.fs.path = y.dirname, c("path", o.fs.path)), ["index", "search"].includes(p.q) && (o.fs.loading = !1), g || o.modal.close(), l(y), f && f(y);
      }).catch((y) => {
        console.error(y), v && v(y);
      });
    }), Me(() => {
      let p = {};
      o.fs.path.includes("://") && (p = {
        adapter: o.fs.path.split("://")[0],
        path: o.fs.path
      }), o.emitter.emit("vf-fetch", { params: { q: "index", adapter: o.fs.adapter, ...p } }), d.onSelect((m) => {
        s("select", m);
      });
    }), (p, m) => (h(), _("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i
    }, [
      a("div", {
        class: he(r(o).theme.actualValue)
      }, [
        a("div", {
          class: he([r(o).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: Ps(r(o).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: m[0] || (m[0] = (f) => r(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (f) => r(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          te(Sc),
          te(Wd),
          te(k0),
          te(Bm)
        ], 38),
        te(Pn, { name: "fade" }, {
          default: Z(() => [
            r(o).modal.visible ? (h(), ee(Fn(r(o).modal.type), { key: 0 })) : Y("", !0)
          ]),
          _: 1
        }),
        te(C0)
      ], 2)
    ], 512));
  }
}, Ym = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Rm);
  }
};
export {
  Ym as default
};
