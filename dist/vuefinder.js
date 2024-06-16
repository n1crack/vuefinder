var Go = Object.defineProperty;
var Ko = (t, e, s) => e in t ? Go(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var mn = (t, e, s) => Ko(t, typeof e != "symbol" ? e + "" : e, s);
import { reactive as Ot, watch as ze, ref as E, shallowRef as Wo, onMounted as Ce, onUnmounted as qs, onUpdated as Rn, nextTick as ft, computed as Ze, inject as ae, openBlock as f, createElementBlock as g, withKeys as $t, unref as a, createElementVNode as o, withModifiers as rt, renderSlot as Dt, normalizeClass as me, toDisplayString as _, createBlock as W, withCtx as se, Fragment as he, renderList as $e, createCommentVNode as P, withDirectives as ve, vModelCheckbox as jt, createTextVNode as Q, createVNode as Y, vModelSelect as Ss, isRef as Fn, vModelText as St, onBeforeUnmount as In, customRef as Yo, vShow as Pe, TransitionGroup as Xo, normalizeStyle as os, mergeModels as Jo, useModel as Nn, resolveComponent as Qo, provide as Zo, Transition as er, resolveDynamicComponent as tr } from "vue";
import sr from "mitt";
import nr from "dragselect";
import or from "@uppy/core";
import rr from "@uppy/xhr-upload";
import ar from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import lr from "cropperjs";
var Bn;
const _s = (Bn = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Bn.getAttribute("content");
class ir {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    mn(this, "config");
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
    const s = this.config, r = {};
    _s != null && _s !== "" && (r[s.xsrfHeaderName] = _s);
    const n = Object.assign({}, s.headers, r, e.headers), c = Object.assign({}, s.params, e.params), i = e.body, d = s.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, s.body != null && Object.entries(this.config.body).forEach(([m, v]) => {
      u.append(m, v);
    })) : (u = { ...i }, s.body != null && Object.assign(u, this.config.body)));
    const h = {
      url: d,
      method: l,
      headers: n,
      params: c,
      body: u
    };
    if (s.transformRequest != null) {
      const m = s.transformRequest({
        url: d,
        method: l,
        headers: n,
        params: c,
        body: u
      });
      m.url != null && (h.url = m.url), m.method != null && (h.method = m.method), m.params != null && (h.params = m.params ?? {}), m.headers != null && (h.headers = m.headers ?? {}), m.body != null && (h.body = m.body);
    }
    return h;
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
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
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
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
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
    const s = this.transformRequestParams(e), r = e.responseType || "json", n = {
      method: e.method,
      headers: s.headers,
      signal: e.abortSignal
    }, c = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let d;
      s.body instanceof FormData ? d = e.body : (d = JSON.stringify(s.body), n.headers["Content-Type"] = "application/json"), n.body = d;
    }
    const i = await fetch(c, n);
    if (i.ok)
      return await i[r]();
    throw await i.json();
  }
}
function cr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new ir(e);
}
function dr(t) {
  let e = localStorage.getItem(t + "_storage");
  const s = Ot(JSON.parse(e ?? "{}"));
  ze(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(t + "_storage", JSON.stringify(s)) : localStorage.removeItem(t + "_storage");
  }
  function n(l, u) {
    s[l] = u;
  }
  function c(l) {
    delete s[l];
  }
  function i() {
    Object.keys(s).map((l) => c(l));
  }
  return { getStore: (l, u = null) => s.hasOwnProperty(l) ? s[l] : u, setStore: n, removeStore: c, clearStore: i };
}
async function ur(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function mr(t, e, s, r) {
  const { getStore: n, setStore: c } = t, i = E({}), d = E(n("locale", e)), l = (m, v = e) => {
    ur(m, r).then((p) => {
      i.value = p, c("locale", m), d.value = m, c("translations", p), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + m }), s.emit("vf-language-saved"));
    }).catch((p) => {
      v ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(v, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !n("locale") && !r.length ? l(e) : i.value = n("translations");
  const u = (m, ...v) => v.length ? u(m = m.replace("%s", v.shift()), ...v) : m;
  function h(m, ...v) {
    return i.value && i.value.hasOwnProperty(m) ? u(i.value[m], ...v) : u(m, ...v);
  }
  return { t: h, changeLocale: l, locale: d };
}
const pe = {
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
}, fr = Object.values(pe), hr = "2.5.6";
function Un(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1024, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B");
}
function zn(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1e3, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "B" : "B");
}
function pr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const st = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function vr(t, e) {
  const s = E(st.SYSTEM), r = E(st.LIGHT);
  s.value = t.getStore("theme", e ?? st.SYSTEM);
  const n = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    s.value === st.DARK || s.value === st.SYSTEM && i.matches ? r.value = st.DARK : r.value = st.LIGHT;
  };
  return c(n), n.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: s,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(i) {
      s.value = i, i !== st.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(n);
    }
  };
}
function gr() {
  const t = Wo(null), e = E(!1), s = E();
  return { visible: e, type: t, data: s, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, s.value = i;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
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
const Ve = (t, e) => {
  const { o: s, i: r, u: n } = t;
  let c = s, i;
  const d = (h, m) => {
    const v = c, p = h, x = m || (r ? !r(v, p) : v !== p);
    return (x || n) && (c = p, i = v), [c, x, i];
  };
  return [e ? (h) => d(e(c, i), h) : d, (h) => [c, !!h, i]];
}, Pn = typeof window < "u" && typeof document < "u", Ae = Pn ? window : {}, jn = Math.max, _r = Math.min, Cs = Math.round, Jt = Math.abs, fn = Math.sign, qn = Ae.cancelAnimationFrame, Gs = Ae.requestAnimationFrame, Qt = Ae.setTimeout, Es = Ae.clearTimeout, rs = (t) => typeof Ae[t] < "u" ? Ae[t] : void 0, xr = rs("MutationObserver"), hn = rs("IntersectionObserver"), Zt = rs("ResizeObserver"), Ts = rs("ScrollTimeline"), Gn = Pn && Node.ELEMENT_NODE, { toString: Bf, hasOwnProperty: xs } = Object.prototype, as = (t) => t === void 0, Ks = (t) => t === null, qe = (t) => typeof t == "number", ls = (t) => typeof t == "string", Kn = (t) => typeof t == "boolean", Fe = (t) => typeof t == "function", Ge = (t) => Array.isArray(t), Lt = (t) => typeof t == "object" && !Ge(t) && !Ks(t), is = (t) => {
  const e = !!t && t.length, s = qe(e) && e > -1 && e % 1 == 0;
  return Ge(t) || !Fe(t) && s ? e > 0 && Lt(t) ? e - 1 in t : !0 : !1;
}, es = (t) => {
  if (!t || !Lt(t))
    return !1;
  let e;
  const s = "constructor", r = t[s], n = r && r.prototype, c = xs.call(t, s), i = n && xs.call(n, "isPrototypeOf");
  if (r && !c && !i)
    return !1;
  for (e in t)
    ;
  return as(e) || xs.call(t, e);
}, ts = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Gn : !1;
}, cs = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Gn : !1;
};
function ce(t, e) {
  if (is(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else t && ce(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const Ws = (t, e) => t.indexOf(e) >= 0, Qe = (t, e) => t.concat(e), xe = (t, e, s) => (!ls(e) && is(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), dt = (t) => Array.from(t || []), Wn = (t) => Ge(t) ? t : [t], Ms = (t) => !!t && !t.length, pn = (t) => dt(new Set(t)), Ie = (t, e, s) => {
  ce(t, (n) => n && n.apply(void 0, e || [])), !s && (t.length = 0);
}, Yn = "paddingTop", Xn = "paddingRight", Jn = "paddingLeft", Qn = "paddingBottom", Zn = "marginLeft", eo = "marginRight", to = "marginBottom", yr = "overflowX", br = "overflowY", yt = "width", bt = "height", ot = "visible", ut = "hidden", wt = "scroll", wr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, ds = (t, e, s, r) => {
  if (t && e) {
    let n = !0;
    return ce(s, (c) => {
      const i = t[c], d = e[c];
      i !== d && (n = !1);
    }), n;
  }
  return !1;
}, so = (t, e) => ds(t, e, ["w", "h"]), Wt = (t, e) => ds(t, e, ["x", "y"]), kr = (t, e) => ds(t, e, ["t", "r", "b", "l"]), at = () => {
}, J = (t, ...e) => t.bind(0, ...e), mt = (t) => {
  let e;
  const s = t ? Qt : Gs, r = t ? Es : qn;
  return [(n) => {
    r(e), e = s(() => n(), Fe(t) ? t() : t);
  }, () => r(e)];
}, As = (t, e) => {
  const { _: s, p: r, v: n, m: c } = e || {};
  let i, d, l, u, h = at;
  const m = function(y) {
    h(), Es(i), u = i = d = void 0, h = at, t.apply(this, y);
  }, v = (b) => c && d ? c(d, b) : b, p = () => {
    h !== at && m(v(l) || l);
  }, x = function() {
    const y = dt(arguments), A = Fe(s) ? s() : s;
    if (qe(A) && A >= 0) {
      const U = Fe(r) ? r() : r, B = qe(U) && U >= 0, D = A > 0 ? Qt : Gs, L = A > 0 ? Es : qn, T = v(y) || y, O = m.bind(0, T);
      let M;
      h(), n && !u ? (O(), u = !0, M = D(() => u = void 0, A)) : (M = D(O, A), B && !i && (i = Qt(p, U))), h = () => L(M), d = l = T;
    } else
      m(y);
  };
  return x.S = p, x;
}, no = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], re = (t, e, s, r, n, c, i) => {
  const d = [e, s, r, n, c, i];
  return (typeof t != "object" || Ks(t)) && !Fe(t) && (t = {}), ce(d, (l) => {
    ce(l, (u, h) => {
      const m = l[h];
      if (t === m)
        return !0;
      const v = Ge(m);
      if (m && es(m)) {
        const p = t[h];
        let x = p;
        v && !Ge(p) ? x = [] : !v && !es(p) && (x = {}), t[h] = re(x, m);
      } else
        t[h] = v ? m.slice() : m;
    });
  }), t;
}, oo = (t, e) => ce(re({}, t), (s, r, n) => {
  s === void 0 ? delete n[r] : s && es(s) && (n[r] = oo(s));
}), Ys = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ds = (t, e, s) => jn(t, _r(e, s)), ht = (t) => dt(new Set((Ge(t) ? t : (t || "").split(" ")).filter((e) => e))), Xs = (t, e) => t && t.getAttribute(e), vn = (t, e) => t && t.hasAttribute(e), Je = (t, e, s) => {
  ce(ht(e), (r) => {
    t && t.setAttribute(r, String(s || ""));
  });
}, Ue = (t, e) => {
  ce(ht(e), (s) => t && t.removeAttribute(s));
}, us = (t, e) => {
  const s = ht(Xs(t, e)), r = J(Je, t, e), n = (c, i) => {
    const d = new Set(s);
    return ce(ht(c), (l) => {
      d[i](l);
    }), dt(d).join(" ");
  };
  return {
    O: (c) => r(n(c, "delete")),
    $: (c) => r(n(c, "add")),
    C: (c) => {
      const i = ht(c);
      return i.reduce((d, l) => d && s.includes(l), i.length > 0);
    }
  };
}, ro = (t, e, s) => (us(t, e).O(s), J(Js, t, e, s)), Js = (t, e, s) => (us(t, e).$(s), J(ro, t, e, s)), Ls = (t, e, s, r) => (r ? Js : ro)(t, e, s), Qs = (t, e, s) => us(t, e).C(s), ao = (t) => us(t, "class"), lo = (t, e) => {
  ao(t).O(e);
}, Zs = (t, e) => (ao(t).$(e), J(lo, t, e)), io = (t, e) => {
  const s = [], r = e ? cs(e) && e : document;
  return r ? xe(s, r.querySelectorAll(t)) : s;
}, $r = (t, e) => {
  const s = e ? cs(e) && e : document;
  return s ? s.querySelector(t) : null;
}, ss = (t, e) => cs(t) ? t.matches(e) : !1, co = (t) => ss(t, "body"), Vs = (t) => t ? dt(t.childNodes) : [], kt = (t) => t && t.parentElement, _t = (t, e) => cs(t) && t.closest(e), Os = (t) => document.activeElement, Sr = (t, e, s) => {
  const r = _t(t, e), n = t && $r(s, r), c = _t(n, e) === r;
  return r && n ? r === t || n === t || c && _t(_t(t, s), e) !== r : !1;
}, it = (t) => {
  if (is(t))
    ce(dt(t), (e) => it(e));
  else if (t) {
    const e = kt(t);
    e && e.removeChild(t);
  }
}, uo = (t, e, s) => {
  if (s && t) {
    let r = e, n;
    return is(s) ? (n = document.createDocumentFragment(), ce(s, (c) => {
      c === r && (r = c.previousSibling), n.appendChild(c);
    })) : n = s, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(n, r || null), () => it(s);
  }
  return at;
}, Oe = (t, e) => uo(t, null, e), gn = (t, e) => uo(kt(t), t && t.nextSibling, e), xt = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, mo = (t) => {
  const e = xt();
  return e.innerHTML = t.trim(), ce(Vs(e), (s) => it(s));
}, Cr = /^--/, _n = (t, e) => t.getPropertyValue(e) || t[e] || "", en = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, qt = (t) => en(parseFloat(t || "")), xn = (t) => `${(en(t) * 100).toFixed(3)}%`, Hs = (t) => `${en(t)}px`;
function Vt(t, e) {
  t && e && ce(e, (s, r) => {
    try {
      const n = t.style, c = qe(s) ? Hs(s) : (s || "") + "";
      Cr.test(r) ? n.setProperty(r, c) : n[r] = c;
    } catch {
    }
  });
}
function pt(t, e, s) {
  const r = ls(e);
  let n = r ? "" : {};
  if (t) {
    const c = Ae.getComputedStyle(t, s) || t.style;
    n = r ? _n(c, e) : dt(e).reduce((i, d) => (i[d] = _n(c, d), i), n);
  }
  return n;
}
const yn = (t, e, s) => {
  const r = e ? `${e}-` : "", n = s ? `-${s}` : "", c = `${r}top${n}`, i = `${r}right${n}`, d = `${r}bottom${n}`, l = `${r}left${n}`, u = pt(t, [c, i, d, l]);
  return {
    t: qt(u[c]),
    r: qt(u[i]),
    b: qt(u[d]),
    l: qt(u[l])
  };
}, ys = (t, e) => `translate${Lt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Er = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Tr = {
  w: 0,
  h: 0
}, ms = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Tr, Mr = (t) => ms("inner", t || Ae), Mt = J(ms, "offset"), fo = J(ms, "client"), Bs = J(ms, "scroll"), tn = (t) => {
  const e = parseFloat(pt(t, yt)) || 0, s = parseFloat(pt(t, bt)) || 0;
  return {
    w: e - Cs(e),
    h: s - Cs(s)
  };
}, At = (t) => t.getBoundingClientRect(), Ar = (t) => !!t && Er(t), Rs = (t) => !!(t && (t[bt] || t[yt])), ho = (t, e) => {
  const s = Rs(t);
  return !Rs(e) && s;
}, bn = (t, e, s, r) => {
  ce(ht(e), (n) => {
    t && t.removeEventListener(n, s, r);
  });
}, fe = (t, e, s, r) => {
  var n;
  const c = (n = r && r.H) != null ? n : !0, i = r && r.I || !1, d = r && r.A || !1, l = {
    passive: c,
    capture: i
  };
  return J(Ie, ht(e).map((u) => {
    const h = d ? (m) => {
      bn(t, u, h, i), s && s(m);
    } : s;
    return t && t.addEventListener(u, h, l), J(bn, t, u, h, i);
  }));
}, po = (t) => t.stopPropagation(), Fs = (t) => t.preventDefault(), vo = (t) => po(t) || Fs(t), je = (t, e) => {
  const { x: s, y: r } = qe(e) ? {
    x: e,
    y: e
  } : e || {};
  qe(s) && (t.scrollLeft = s), qe(r) && (t.scrollTop = r);
}, He = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), go = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), Dr = (t, e) => {
  const { T: s, D: r } = t, { w: n, h: c } = e, i = (m, v, p) => {
    let x = fn(m) * p, b = fn(v) * p;
    if (x === b) {
      const y = Jt(m), A = Jt(v);
      b = y > A ? 0 : b, x = y < A ? 0 : x;
    }
    return x = x === b ? 0 : x, [x + 0, b + 0];
  }, [d, l] = i(s.x, r.x, n), [u, h] = i(s.y, r.y, c);
  return {
    T: {
      x: d,
      y: u
    },
    D: {
      x: l,
      y: h
    }
  };
}, wn = ({ T: t, D: e }) => {
  const s = (r, n) => r === 0 && r <= n;
  return {
    x: s(t.x, e.x),
    y: s(t.y, e.y)
  };
}, kn = ({ T: t, D: e }, s) => {
  const r = (n, c, i) => Ds(0, 1, (n - i) / (n - c) || 0);
  return {
    x: r(t.x, e.x, s.x),
    y: r(t.y, e.y, s.y)
  };
}, Is = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, $n = (t, e) => {
  ce(Wn(e), t);
}, Ns = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (c, i) => {
    if (c) {
      const d = e.get(c);
      $n((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (c, i) => {
    if (ls(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), $n((h) => {
        Fe(h) && u.add(h);
      }, i), J(s, c, i);
    }
    Kn(i) && i && s();
    const d = et(c), l = [];
    return ce(d, (u) => {
      const h = c[u];
      h && xe(l, r(u, h));
    }), J(Ie, l);
  }, n = (c, i) => {
    ce(dt(e.get(c)), (d) => {
      i && !Ms(i) ? d.apply(0, i) : d();
    });
  };
  return r(t || {}), [r, s, n];
}, Sn = (t) => JSON.stringify(t, (e, s) => {
  if (Fe(s))
    throw 0;
  return s;
}), Cn = (t, e) => t ? `${e}`.split(".").reduce((s, r) => s && no(s, r) ? s[r] : void 0, t) : void 0, Lr = {
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
}, _o = (t, e) => {
  const s = {}, r = Qe(et(e), et(t));
  return ce(r, (n) => {
    const c = t[n], i = e[n];
    if (Lt(c) && Lt(i))
      re(s[n] = {}, _o(c, i)), Ys(s[n]) && delete s[n];
    else if (no(e, n) && i !== c) {
      let d = !0;
      if (Ge(c) || Ge(i))
        try {
          Sn(c) === Sn(i) && (d = !1);
        } catch {
        }
      d && (s[n] = i);
    }
  }), s;
}, En = (t, e, s) => (r) => [Cn(t, r), s || Cn(e, r) !== void 0], Ct = "data-overlayscrollbars", Yt = "os-environment", Gt = `${Yt}-scrollbar-hidden`, bs = `${Ct}-initialize`, Xt = "noClipping", Tn = `${Ct}-body`, lt = Ct, Vr = "host", nt = `${Ct}-viewport`, Or = yr, Hr = br, Br = "arrange", xo = "measuring", yo = "scrollbarHidden", Rr = "scrollbarPressed", Fr = "noContent", Us = `${Ct}-padding`, Mn = `${Ct}-content`, sn = "os-size-observer", Ir = `${sn}-appear`, Nr = `${sn}-listener`, Ur = "os-trinsic-observer", zr = "os-theme-none", Be = "os-scrollbar", Pr = `${Be}-rtl`, jr = `${Be}-horizontal`, qr = `${Be}-vertical`, bo = `${Be}-track`, nn = `${Be}-handle`, Gr = `${Be}-visible`, Kr = `${Be}-cornerless`, An = `${Be}-interaction`, Dn = `${Be}-unusable`, zs = `${Be}-auto-hide`, Ln = `${zs}-hidden`, Vn = `${Be}-wheel`, Wr = `${bo}-interactive`, Yr = `${nn}-interactive`;
let ws;
const Xr = () => {
  const t = (k, U, B) => {
    Oe(document.body, k), Oe(document.body, k);
    const D = fo(k), L = Mt(k), V = tn(U);
    return B && it(k), {
      x: L.h - D.h + V.h,
      y: L.w - D.w + V.w
    };
  }, e = (k) => {
    let U = !1;
    const B = Zs(k, Gt);
    try {
      U = pt(k, "scrollbar-width") === "none" || pt(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return B(), U;
  }, s = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, n = mo(`<div class="${Yt}"><div></div><style>${s}</style></div>`)[0], c = n.firstChild, [i, , d] = Ns(), [l, u] = Ve({
    o: t(n, c),
    i: Wt
  }, J(t, n, c, !0)), [h] = u(), m = e(n), v = {
    x: h.x === 0,
    y: h.y === 0
  }, p = {
    elements: {
      host: null,
      padding: !m,
      viewport: (k) => m && co(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, x = re({}, Lr), b = J(re, {}, x), y = J(re, {}, p), A = {
    k: h,
    M: v,
    R: m,
    V: !!Ts,
    L: J(i, "r"),
    P: y,
    U: (k) => re(p, k) && y(),
    N: b,
    q: (k) => re(x, k) && b(),
    B: re({}, p),
    F: re({}, x)
  };
  if (Ue(n, "style"), it(n), fe(Ae, "resize", () => {
    d("r", []);
  }), Fe(Ae.matchMedia) && !m && (!v.x || !v.y)) {
    const k = (U) => {
      const B = Ae.matchMedia(`(resolution: ${Ae.devicePixelRatio}dppx)`);
      fe(B, "change", () => {
        U(), k(U);
      }, {
        A: !0
      });
    };
    k(() => {
      const [U, B] = l();
      re(A.k, U), d("r", [B]);
    });
  }
  return A;
}, Ke = () => (ws || (ws = Xr()), ws), wo = (t, e) => Fe(e) ? e.apply(0, t) : e, Jr = (t, e, s, r) => {
  const n = as(r) ? s : r;
  return wo(t, n) || e.apply(0, t);
}, ko = (t, e, s, r) => {
  const n = as(r) ? s : r, c = wo(t, n);
  return !!c && (ts(c) ? c : e.apply(0, t));
}, Qr = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { M: n, R: c, P: i } = Ke(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = s ?? d, h = as(r) ? l : r, m = (n.x || n.y) && u, v = t && (Ks(h) ? !c : h);
  return !!m || !!v;
}, on = /* @__PURE__ */ new WeakMap(), Zr = (t, e) => {
  on.set(t, e);
}, ea = (t) => {
  on.delete(t);
}, $o = (t) => on.get(t), ta = (t, e, s) => {
  let r = !1;
  const n = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, i = (d) => {
    if (n && s) {
      const l = s.map((u) => {
        const [h, m] = u || [];
        return [m && h ? (d || io)(h, t) : [], m];
      });
      ce(l, (u) => ce(u[0], (h) => {
        const m = u[1], v = n.get(h) || [];
        if (t.contains(h) && m) {
          const x = fe(h, m, (b) => {
            r ? (x(), n.delete(h)) : e(b);
          });
          n.set(h, xe(v, x));
        } else
          Ie(v), n.delete(h);
      }));
    }
  };
  return i(), [c, i];
}, On = (t, e, s, r) => {
  let n = !1;
  const { j: c, X: i, Y: d, W: l, J: u, K: h } = r || {}, m = As(() => n && s(!0), {
    _: 33,
    p: 99
  }), [v, p] = ta(t, m, d), x = c || [], b = i || [], y = Qe(x, b), A = (U, B) => {
    if (!Ms(B)) {
      const D = u || at, L = h || at, V = [], T = [];
      let O = !1, M = !1;
      if (ce(B, (S) => {
        const { attributeName: H, target: $, type: w, oldValue: I, addedNodes: R, removedNodes: ne } = S, de = w === "attributes", le = w === "childList", F = t === $, ee = de && H, te = ee && Xs($, H || ""), X = ls(te) ? te : null, ue = ee && I !== X, z = Ws(b, H) && ue;
        if (e && (le || !F)) {
          const q = de && ue, j = q && l && ss($, l), N = (j ? !D($, H, I, X) : !de || q) && !L(S, !!j, t, r);
          ce(R, (G) => xe(V, G)), ce(ne, (G) => xe(V, G)), M = M || N;
        }
        !e && F && ue && !D($, H, I, X) && (xe(T, H), O = O || z);
      }), p((S) => pn(V).reduce((H, $) => (xe(H, io(S, $)), ss($, S) ? xe(H, $) : H), [])), e)
        return !U && M && s(!1), [!1];
      if (!Ms(T) || O) {
        const S = [pn(T), O];
        return !U && s.apply(0, S), S;
      }
    }
  }, k = new xr(J(A, !1));
  return [() => (k.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: y,
    subtree: e,
    childList: e,
    characterData: e
  }), n = !0, () => {
    n && (v(), k.disconnect(), n = !1);
  }), () => {
    if (n)
      return m.S(), A(!0, k.takeRecords());
  }];
}, So = {}, Co = {}, sa = (t) => {
  ce(t, (e) => ce(e, (s, r) => {
    So[r] = e[r];
  }));
}, Eo = (t, e, s) => et(t).map((r) => {
  const { static: n, instance: c } = t[r], [i, d, l] = s || [], u = s ? c : n;
  if (u) {
    const h = s ? u(i, d, e) : u(e);
    return (l || Co)[r] = h;
  }
}), Ht = (t) => Co[t], na = "__osOptionsValidationPlugin", oa = "__osSizeObserverPlugin", ra = (t, e) => {
  const { M: s } = e, [r, n] = t("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, n];
}, ns = (t) => t.indexOf(ot) === 0, aa = (t, e) => {
  const s = (n, c, i, d) => {
    const l = n === ot ? ut : n.replace(`${ot}-`, ""), u = ns(n), h = ns(i);
    return !c && !d ? ut : u && h ? ot : u ? c && d ? l : c ? ot : ut : c ? l : h && d ? ot : ut;
  }, r = {
    x: s(e.x, t.x, e.y, t.y),
    y: s(e.y, t.y, e.x, t.x)
  };
  return {
    G: r,
    Z: {
      x: r.x === wt,
      y: r.y === wt
    }
  };
}, To = "__osScrollbarsHidingPlugin", la = "__osClickScrollPlugin", Mo = (t, e, s) => {
  const { dt: r } = s || {}, n = Ht(oa), [c] = Ve({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = mo(`<div class="${sn}"><div class="${Nr}"></div></div>`)[0], u = l.firstChild, h = (m) => {
      const v = m instanceof ResizeObserverEntry;
      let p = !1, x = !1;
      if (v) {
        const [b, , y] = c(m.contentRect), A = Rs(b);
        x = ho(b, y), p = !x && !A;
      } else
        x = m === !0;
      p || e({
        ft: !0,
        dt: x
      });
    };
    if (Zt) {
      const m = new Zt((v) => h(v.pop()));
      m.observe(u), xe(i, () => {
        m.disconnect();
      });
    } else if (n) {
      const [m, v] = n(u, h, r);
      xe(i, Qe([Zs(l, Ir), fe(l, "animationstart", m)], v));
    } else
      return at;
    return J(Ie, xe(i, Oe(t, l)));
  };
}, ia = (t, e) => {
  let s;
  const r = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, n = xt(Ur), [c] = Ve({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const h = c(r(l)), [, m] = h;
      return m && !u && e(h) && [h];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (hn)
      s = new hn(J(d, !1), {
        root: t
      }), s.observe(n), xe(l, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const h = Mt(n);
        i(h);
      };
      xe(l, Mo(n, u)()), u();
    }
    return J(Ie, xe(l, Oe(t, n)));
  }, () => s && d(!0, s.takeRecords())];
}, ca = (t, e, s, r) => {
  let n, c, i, d, l, u;
  const h = `[${lt}]`, m = `[${nt}]`, v = [], p = ["wrap", "cols", "rows"], x = ["id", "class", "style", "open"], { vt: b, ht: y, ot: A, gt: k, bt: U, wt: B, nt: D, yt: L, St: V, Ot: T } = t, O = (C) => pt(C, "direction") === "rtl", M = {
    $t: !1,
    ct: O(b)
  }, S = Ke(), H = Ht(To), [$] = Ve({
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = H && H.tt(t, e, M, S, s).ut, G = !(L && D) && Qs(y, lt, Xt), K = !D && V(Br), Z = K && He(k), ie = T(xo, G), be = K && C && C()[0], Se = Bs(A), oe = tn(A);
    return be && be(), je(k, Z), G && ie(), {
      w: Se.w + oe.w,
      h: Se.h + oe.h
    };
  }), w = B ? p : Qe(x, p), I = As(r, {
    _: () => n,
    p: () => c,
    m(C, N) {
      const [G] = C, [K] = N;
      return [Qe(et(G), et(K)).reduce((Z, ie) => (Z[ie] = G[ie] || K[ie], Z), {})];
    }
  }), R = (C) => {
    const N = O(b);
    re(C, {
      Ct: u !== N
    }), re(M, {
      ct: N
    }), u = N;
  }, ne = (C, N) => {
    const [G, K] = C, Z = {
      xt: K
    };
    return re(M, {
      $t: G
    }), !N && r(Z), Z;
  }, de = ({ ft: C, dt: N }) => {
    const K = !(C && !N) && S.R ? I : r, Z = {
      ft: C || N,
      dt: N
    };
    R(Z), K(Z);
  }, le = (C, N) => {
    const [, G] = $(), K = {
      Ht: G
    };
    return R(K), G && !N && (C ? r : I)(K), K;
  }, F = (C, N, G) => {
    const K = {
      Et: N
    };
    return R(K), N && !G && I(K), K;
  }, [ee, te] = U ? ia(y, ne) : [], X = !D && Mo(y, de, {
    dt: !0
  }), [ue, z] = On(y, !1, F, {
    X: x,
    j: Qe(x, v)
  }), q = D && Zt && new Zt((C) => {
    const N = C[C.length - 1].contentRect;
    de({
      ft: !0,
      dt: ho(N, l)
    }), l = N;
  }), j = As(() => {
    const [, C] = $();
    r({
      Ht: C
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    q && q.observe(y);
    const C = X && X(), N = ee && ee(), G = ue(), K = S.L((Z) => {
      Z ? I({
        zt: Z
      }) : j();
    });
    return () => {
      q && q.disconnect(), C && C(), N && N(), d && d(), G(), K();
    };
  }, ({ It: C, At: N, Tt: G }) => {
    const K = {}, [Z] = C("update.ignoreMutation"), [ie, be] = C("update.attributes"), [Se, oe] = C("update.elementEvents"), [we, Ee] = C("update.debounce"), Re = oe || be, ke = N || G, De = (ye) => Fe(Z) && Z(ye);
    if (Re) {
      i && i(), d && d();
      const [ye, ge] = On(U || A, !0, le, {
        j: Qe(w, ie || []),
        Y: Se,
        W: h,
        K: (Te, _e) => {
          const { target: Me, attributeName: Le } = Te;
          return (!_e && Le && !D ? Sr(Me, h, m) : !1) || !!_t(Me, `.${Be}`) || !!De(Te);
        }
      });
      d = ye(), i = ge;
    }
    if (Ee)
      if (I.S(), Ge(we)) {
        const ye = we[0], ge = we[1];
        n = qe(ye) && ye, c = qe(ge) && ge;
      } else qe(we) ? (n = we, c = !1) : (n = !1, c = !1);
    if (ke) {
      const ye = z(), ge = te && te(), Te = i && i();
      ye && re(K, F(ye[0], ye[1], ke)), ge && re(K, ne(ge[0], ke)), Te && re(K, le(Te[0], ke));
    }
    return R(K), K;
  }, M];
}, da = (t, e, s, r) => {
  const { P: n } = Ke(), { scrollbars: c } = n(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: h, gt: m, yt: v, nt: p } = e, { scrollbars: x } = h ? {} : t, { slot: b } = x || {}, y = /* @__PURE__ */ new Map(), A = (z) => Ts && new Ts({
    source: m,
    axis: z
  }), k = {
    x: A("x"),
    y: A("y")
  }, U = ko([d, l, u], () => p && v ? d : l, i, b), B = (z, q) => {
    if (q) {
      const Z = z ? yt : bt, { kt: ie, Mt: be } = q, Se = At(be)[Z], oe = At(ie)[Z];
      return Ds(0, 1, Se / oe || 0);
    }
    const j = z ? "x" : "y", { Rt: C, Vt: N } = s, G = N[j], K = C[j];
    return Ds(0, 1, G / (G + K) || 0);
  }, D = (z, q, j) => {
    const C = B(j, z);
    return 1 / C * (1 - C) * q;
  }, L = (z) => re(z, {
    clear: ["left"]
  }), V = (z) => {
    y.forEach((q, j) => {
      (z ? Ws(Wn(z), j) : !0) && (ce(q || [], (N) => {
        N && N.cancel();
      }), y.delete(j));
    });
  }, T = (z, q, j, C) => {
    const N = y.get(z) || [], G = N.find((K) => K && K.timeline === q);
    G ? G.effect = new KeyframeEffect(z, j, {
      composite: C
    }) : y.set(z, Qe(N, [z.animate(j, {
      timeline: q,
      composite: C
    })]));
  }, O = (z, q, j) => {
    const C = j ? Zs : lo;
    ce(z, (N) => {
      C(N.Lt, q);
    });
  }, M = (z, q) => {
    ce(z, (j) => {
      const [C, N] = q(j);
      Vt(C, N);
    });
  }, S = (z, q) => {
    M(z, (j) => {
      const { Mt: C } = j;
      return [C, {
        [q ? yt : bt]: xn(B(q))
      }];
    });
  }, H = (z, q) => {
    const { Pt: j } = s, C = q ? "x" : "y", N = k[C], G = wn(j)[C], K = (Z, ie) => ys(xn(D(Z, G ? ie : 1 - ie, q)), q);
    N ? ce(z, (Z) => {
      const { Mt: ie } = Z;
      T(ie, N, L({
        transform: [0, 1].map((be) => K(Z, be))
      }));
    }) : M(z, (Z) => [Z.Mt, {
      transform: K(Z, kn(j, He(m))[C])
    }]);
  }, $ = (z) => p && !v && kt(z) === u, w = [], I = [], R = [], ne = (z, q, j) => {
    const C = Kn(j), N = C ? j : !0, G = C ? !j : !0;
    N && O(I, z, q), G && O(R, z, q);
  }, de = () => {
    S(I, !0), S(R);
  }, le = () => {
    H(I, !0), H(R);
  }, F = () => {
    if (p) {
      const { Rt: z, Pt: q } = s, j = wn(q), C = 0.5;
      if (k.x && k.y)
        ce(Qe(R, I), ({ Lt: N }) => {
          if ($(N)) {
            const G = (K) => T(N, k[K], L({
              transform: [0, j[K] ? 1 : -1].map((Z) => ys(Hs(Z * (z[K] - C)), K === "x"))
            }), "add");
            G("x"), G("y");
          } else
            V(N);
        });
      else {
        const N = kn(q, He(m)), G = (K) => {
          const { Lt: Z } = K, ie = $(Z) && Z, be = (Se, oe, we) => {
            const Ee = oe * Se;
            return Hs(we ? Ee : -Ee);
          };
          return [ie, ie && {
            transform: ys({
              x: be(N.x, z.x, j.x),
              y: be(N.y, z.y, j.y)
            })
          }];
        };
        M(I, G), M(R, G);
      }
    }
  }, ee = (z) => {
    const j = xt(`${Be} ${z ? jr : qr}`), C = xt(bo), N = xt(nn), G = {
      Lt: j,
      kt: C,
      Mt: N
    };
    return xe(z ? I : R, G), xe(w, [Oe(j, C), Oe(C, N), J(it, j), V, r(G, ne, H, z)]), G;
  }, te = J(ee, !0), X = J(ee, !1), ue = () => (Oe(U, I[0].Lt), Oe(U, R[0].Lt), J(Ie, w));
  return te(), X(), [{
    Ut: de,
    Nt: le,
    qt: F,
    Bt: ne,
    Ft: {
      V: k.x,
      jt: I,
      Xt: te,
      Yt: J(M, I)
    },
    Wt: {
      V: k.y,
      jt: R,
      Xt: X,
      Yt: J(M, R)
    }
  }, ue];
}, ua = (t, e, s, r) => (n, c, i, d) => {
  const { ht: l, ot: u, nt: h, gt: m, Jt: v, Ot: p } = e, { Lt: x, kt: b, Mt: y } = n, [A, k] = mt(333), [U, B] = mt(444), [D, L] = mt(), V = J(i, [n], d), T = ($) => {
    Fe(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: $.x,
      top: $.y
    });
  }, O = d ? yt : bt, M = () => {
    const $ = "pointerup pointercancel lostpointercapture", w = `client${d ? "X" : "Y"}`, I = d ? "left" : "top", R = d ? "w" : "h", ne = d ? "x" : "y", de = (le, F) => (ee) => {
      const { Rt: te } = s, X = Mt(b)[R] - Mt(y)[R], z = F * ee / X * te[ne];
      je(m, {
        [ne]: le + z
      });
    };
    return fe(b, "pointerdown", (le) => {
      const F = _t(le.target, `.${nn}`) === y, ee = F ? y : b, te = t.scrollbars, { button: X, isPrimary: ue, pointerType: z } = le, { pointers: q } = te;
      if (X === 0 && ue && te[F ? "dragScroll" : "clickScroll"] && (q || []).includes(z)) {
        B();
        const C = !F && le.shiftKey, N = J(At, y), G = J(At, b), K = (_e, Me) => (_e || N())[I] - (Me || G())[I], Z = Cs(At(m)[O]) / Mt(m)[R] || 1, ie = de(He(m)[ne], 1 / Z), be = le[w], Se = N(), oe = G(), we = Se[O], Ee = K(Se, oe) + we / 2, Re = be - oe[I], ke = F ? 0 : Re - Ee, De = (_e) => {
          Ie(Te), ee.releasePointerCapture(_e.pointerId);
        }, ye = () => p(Rr, !0), ge = ye(), Te = [() => {
          const _e = He(m);
          ge();
          const Me = He(m), Le = {
            x: Me.x - _e.x,
            y: Me.y - _e.y
          };
          (Jt(Le.x) > 3 || Jt(Le.y) > 3) && (ye(), je(m, _e), T(Le), U(ge));
        }, fe(v, $, De), fe(v, "selectstart", (_e) => Fs(_e), {
          H: !1
        }), fe(b, $, De), fe(b, "pointermove", (_e) => {
          const Me = _e[w] - be;
          (F || C) && ie(ke + Me);
        })];
        if (ee.setPointerCapture(le.pointerId), C)
          ie(ke);
        else if (!F) {
          const _e = Ht(la);
          _e && xe(Te, _e(ie, K, ke, we, Re));
        }
      }
    });
  };
  let S = !0;
  const H = ($) => $.propertyName.indexOf(O) > -1;
  return J(Ie, [fe(y, "pointermove pointerleave", r), fe(x, "pointerenter", () => {
    c(An, !0);
  }), fe(x, "pointerleave pointercancel", () => {
    c(An, !1);
  }), !h && fe(x, "mousedown", () => {
    const $ = Os();
    (vn($, nt) || vn($, lt) || $ === document.body) && Qt(J(Is, u), 25);
  }), fe(x, "wheel", ($) => {
    const { deltaX: w, deltaY: I, deltaMode: R } = $;
    S && R === 0 && kt(x) === l && T({
      x: w,
      y: I
    }), S = !1, c(Vn, !0), A(() => {
      S = !0, c(Vn);
    }), Fs($);
  }, {
    H: !1,
    I: !0
  }), fe(y, "transitionstart", ($) => {
    if (H($)) {
      const w = () => {
        V(), D(w);
      };
      w();
    }
  }), fe(y, "transitionend transitioncancel", ($) => {
    H($) && (L(), V());
  }), fe(x, "pointerdown", J(fe, v, "click", vo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), M(), k, B, L]);
}, ma = (t, e, s, r, n, c) => {
  let i, d, l, u, h, m = at, v = 0;
  const p = (F) => F.pointerType === "mouse", [x, b] = mt(), [y, A] = mt(100), [k, U] = mt(100), [B, D] = mt(() => v), [L, V] = da(t, n, r, ua(e, n, r, (F) => p(F) && R())), { ht: T, Kt: O, yt: M } = n, { Bt: S, Ut: H, Nt: $, qt: w } = L, I = (F, ee) => {
    if (D(), F)
      S(Ln);
    else {
      const te = J(S, Ln, !0);
      v > 0 && !ee ? B(te) : te();
    }
  }, R = () => {
    (l ? !i : !u) && (I(!0), y(() => {
      I(!1);
    }));
  }, ne = (F) => {
    S(zs, F, !0), S(zs, F, !1);
  }, de = (F) => {
    p(F) && (i = l, l && I(!0));
  }, le = [D, A, U, b, () => m(), fe(T, "pointerover", de, {
    A: !0
  }), fe(T, "pointerenter", de), fe(T, "pointerleave", (F) => {
    p(F) && (i = !1, l && I(!1));
  }), fe(T, "pointermove", (F) => {
    p(F) && d && R();
  }), fe(O, "scroll", (F) => {
    x(() => {
      $(), R();
    }), c(F), w();
  })];
  return [() => J(Ie, xe(le, V())), ({ It: F, Tt: ee, Gt: te, Qt: X }) => {
    const { Zt: ue, tn: z, nn: q, sn: j } = X || {}, { Ct: C, dt: N } = te || {}, { ct: G } = s, { M: K } = Ke(), { G: Z, en: ie } = r, [be, Se] = F("showNativeOverlaidScrollbars"), [oe, we] = F("scrollbars.theme"), [Ee, Re] = F("scrollbars.visibility"), [ke, De] = F("scrollbars.autoHide"), [ye, ge] = F("scrollbars.autoHideSuspend"), [Te] = F("scrollbars.autoHideDelay"), [_e, Me] = F("scrollbars.dragScroll"), [Le, vt] = F("scrollbars.clickScroll"), [Bt, hs] = F("overflow"), ps = N && !ee, vs = ie.x || ie.y, Ne = ue || z || j || C || ee, gs = q || Re || hs, Rt = be && K.x && K.y, Ft = (tt, Et, Tt) => {
      const It = tt.includes(wt) && (Ee === ot || Ee === "auto" && Et === wt);
      return S(Gr, It, Tt), It;
    };
    if (v = Te, ps && (ye && vs ? (ne(!1), m(), k(() => {
      m = fe(O, "scroll", J(ne, !0), {
        A: !0
      });
    })) : ne(!0)), Se && S(zr, Rt), we && (S(h), S(oe, !0), h = oe), ge && !ye && ne(!0), De && (d = ke === "move", l = ke === "leave", u = ke === "never", I(u, !0)), Me && S(Yr, _e), vt && S(Wr, Le), gs) {
      const tt = Ft(Bt.x, Z.x, !0), Et = Ft(Bt.y, Z.y, !1);
      S(Kr, !(tt && Et));
    }
    Ne && (H(), $(), w(), S(Dn, !ie.x, !0), S(Dn, !ie.y, !1), S(Pr, G && !M));
  }, {}, L];
}, fa = (t) => {
  const e = Ke(), { P: s, R: r } = e, { elements: n } = s(), { host: c, padding: i, viewport: d, content: l } = n, u = ts(t), h = u ? {} : t, { elements: m } = h, { host: v, padding: p, viewport: x, content: b } = m || {}, y = u ? t : h.target, A = co(y), k = ss(y, "textarea"), U = y.ownerDocument, B = U.documentElement, D = () => U.defaultView || Ae, L = J(Jr, [y]), V = J(ko, [y]), T = J(xt, ""), O = J(L, T, d), M = J(V, T, l), S = O(x), H = S === y, $ = H && A, w = !H && M(b), I = !H && S === w, R = $ ? B : S, ne = k ? L(T, c, v) : y, de = $ ? R : ne, le = !H && V(T, i, p), F = !I && w, ee = [F, R, le, de].map((oe) => ts(oe) && !kt(oe) && oe), te = (oe) => oe && Ws(ee, oe), X = te(R) ? y : R, ue = {
    vt: y,
    ht: de,
    ot: R,
    cn: le,
    bt: F,
    gt: $ ? B : R,
    Kt: $ ? U : R,
    rn: A ? B : X,
    Jt: U,
    wt: k,
    yt: A,
    Dt: u,
    nt: H,
    ln: D,
    St: (oe) => Qs(R, nt, oe),
    Ot: (oe, we) => Ls(R, nt, oe, we)
  }, { vt: z, ht: q, cn: j, ot: C, bt: N } = ue, G = [() => {
    Ue(q, [lt, bs]), Ue(z, bs), A && Ue(B, [bs, lt]);
  }], K = k && te(q);
  let Z = k ? z : Vs([N, C, j, q, z].find((oe) => oe && !te(oe)));
  const ie = $ ? z : N || C, be = J(Ie, G);
  return [ue, () => {
    const oe = D(), we = Os(), Ee = (ge) => {
      Oe(kt(ge), Vs(ge)), it(ge);
    }, Re = (ge) => fe(ge, "focusin focusout focus blur", vo, {
      I: !0,
      H: !1
    }), ke = "tabindex", De = Xs(C, ke), ye = Re(we);
    return Je(q, lt, H ? "" : Vr), Je(j, Us, ""), Je(C, nt, ""), Je(N, Mn, ""), H || (Je(C, ke, De || "-1"), A && Je(B, Tn, "")), K && (gn(z, q), xe(G, () => {
      gn(q, z), it(q);
    })), Oe(ie, Z), Oe(q, j), Oe(j || q, !H && C), Oe(C, N), xe(G, [ye, () => {
      const ge = Os(), Te = te(C), _e = Te && ge === C ? z : ge, Me = Re(_e);
      Ue(j, Us), Ue(N, Mn), Ue(C, nt), A && Ue(B, Tn), De ? Je(C, ke, De) : Ue(C, ke), te(N) && Ee(N), Te && Ee(C), te(j) && Ee(j), Is(_e), Me();
    }]), r && !H && (Js(C, nt, yo), xe(G, J(Ue, C, nt))), Is(!H && A && we === z && oe.top === oe ? C : we), ye(), Z = 0, be;
  }, be];
}, ha = ({ bt: t }) => ({ Gt: e, an: s, Tt: r }) => {
  const { xt: n } = e || {}, { $t: c } = s;
  t && (n || r) && Vt(t, {
    [bt]: c && "100%"
  });
}, pa = ({ ht: t, cn: e, ot: s, nt: r }, n) => {
  const [c, i] = Ve({
    i: kr,
    o: yn()
  }, J(yn, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: h }) => {
    let [m, v] = i(h);
    const { R: p } = Ke(), { ft: x, Ht: b, Ct: y } = l || {}, { ct: A } = u, [k, U] = d("paddingAbsolute");
    (x || v || (h || b)) && ([m, v] = c(h));
    const D = !r && (U || y || v);
    if (D) {
      const L = !k || !e && !p, V = m.r + m.l, T = m.t + m.b, O = {
        [eo]: L && !A ? -V : 0,
        [to]: L ? -T : 0,
        [Zn]: L && A ? -V : 0,
        top: L ? -m.t : 0,
        right: L ? A ? -m.r : "auto" : 0,
        left: L ? A ? "auto" : -m.l : 0,
        [yt]: L && `calc(100% + ${V}px)`
      }, M = {
        [Yn]: L ? m.t : 0,
        [Xn]: L ? m.r : 0,
        [Qn]: L ? m.b : 0,
        [Jn]: L ? m.l : 0
      };
      Vt(e || s, O), Vt(s, M), re(n, {
        cn: m,
        un: !L,
        rt: e ? M : re({}, O, M)
      });
    }
    return {
      _n: D
    };
  };
}, va = (t, e) => {
  const s = Ke(), { ht: r, cn: n, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: h, ln: m } = t, { R: v } = s, p = u && i, x = J(jn, 0), b = ["display", "direction", "flexDirection", "writingMode"], y = {
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, A = {
    i: Wt,
    o: {}
  }, k = (F) => {
    h(xo, !p && F);
  }, U = (F, ee) => {
    const te = Ae.devicePixelRatio % 1 !== 0 ? 1 : 0, X = {
      w: x(F.w - ee.w),
      h: x(F.h - ee.h)
    };
    return {
      w: X.w > te ? X.w : 0,
      h: X.h > te ? X.h : 0
    };
  }, [B, D] = Ve(y, J(tn, c)), [L, V] = Ve(y, J(Bs, c)), [T, O] = Ve(y), [M] = Ve(A), [S, H] = Ve(y), [$] = Ve(A), [w] = Ve({
    i: (F, ee) => ds(F, ee, b),
    o: {}
  }, () => Ar(c) ? pt(c, b) : {}), [I, R] = Ve({
    i: (F, ee) => Wt(F.T, ee.T) && Wt(F.D, ee.D),
    o: go()
  }, () => {
    k(!0);
    const F = He(l), ee = h(Fr, !0), te = fe(d, wt, (j) => {
      const C = He(l);
      j.isTrusted && C.x === F.x && C.y === F.y && po(j);
    }, {
      I: !0,
      A: !0
    });
    je(l, {
      x: 0,
      y: 0
    }), ee();
    const X = He(l), ue = Bs(l);
    je(l, {
      x: ue.w,
      y: ue.h
    });
    const z = He(l);
    je(l, {
      x: z.x - X.x < 1 && -ue.w,
      y: z.y - X.y < 1 && -ue.h
    });
    const q = He(l);
    return je(l, F), Gs(() => te()), {
      T: X,
      D: q
    };
  }), ne = Ht(To), de = (F, ee) => `${ee ? Or : Hr}${wr(F)}`, le = (F) => {
    const ee = (X) => [ot, ut, wt].map((ue) => de(ue, X)), te = ee(!0).concat(ee()).join(" ");
    h(te), h(et(F).map((X) => de(F[X], X === "x")).join(" "), !0);
  };
  return ({ It: F, Gt: ee, an: te, Tt: X }, { _n: ue }) => {
    const { ft: z, Ht: q, Ct: j, dt: C, zt: N } = ee || {}, G = ne && ne.tt(t, e, te, s, F), { it: K, ut: Z, _t: ie } = G || {}, [be, Se] = ra(F, s), [oe, we] = F("overflow"), Ee = ns(oe.x), Re = ns(oe.y), ke = z || ue || q || j || N || Se;
    let De = D(X), ye = V(X), ge = O(X), Te = H(X);
    if (Se && v && h(yo, !be), ke) {
      Qs(r, lt, Xt) && k(!0);
      const [dn] = Z ? Z() : [], [Nt] = De = B(X), [Ut] = ye = L(X), zt = fo(c), Pt = p && Mr(m()), qo = {
        w: x(Ut.w + Nt.w),
        h: x(Ut.h + Nt.h)
      }, un = {
        w: x((Pt ? Pt.w : zt.w + x(zt.w - Ut.w)) + Nt.w),
        h: x((Pt ? Pt.h : zt.h + x(zt.h - Ut.h)) + Nt.h)
      };
      dn && dn(), Te = S(un), ge = T(U(qo, un), X);
    }
    const [_e, Me] = Te, [Le, vt] = ge, [Bt, hs] = ye, [ps, vs] = De, [Ne, gs] = M({
      x: Le.w > 0,
      y: Le.h > 0
    }), Rt = Ee && Re && (Ne.x || Ne.y) || Ee && Ne.x && !Ne.y || Re && Ne.y && !Ne.x, Ft = ue || j || N || vs || hs || Me || vt || we || Se || ke, tt = aa(Ne, oe), [Et, Tt] = $(tt.G), [, It] = w(X), cn = j || C || It || gs || X, [Po, jo] = cn ? I(X) : R();
    return Ft && (Tt && le(tt.G), ie && K && Vt(c, ie(tt, te, K(tt, Bt, ps)))), k(!1), Ls(r, lt, Xt, Rt), Ls(n, Us, Xt, Rt), re(e, {
      G: Et,
      Vt: {
        x: _e.w,
        y: _e.h
      },
      Rt: {
        x: Le.w,
        y: Le.h
      },
      en: Ne,
      Pt: Dr(Po, Le)
    }), {
      nn: Tt,
      Zt: Me,
      tn: vt,
      sn: jo || vt,
      dn: cn
    };
  };
}, ga = (t) => {
  const [e, s, r] = fa(t), n = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [eo]: 0,
      [to]: 0,
      [Zn]: 0,
      [Yn]: 0,
      [Xn]: 0,
      [Qn]: 0,
      [Jn]: 0
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
      x: ut,
      y: ut
    },
    en: {
      x: !1,
      y: !1
    },
    Pt: go()
  }, { vt: c, gt: i, nt: d } = e, { R: l, M: u } = Ke(), h = !l && (u.x || u.y), m = [ha(e), pa(e, n), va(e, n)];
  return [s, (v) => {
    const p = {}, b = h && He(i);
    return ce(m, (y) => {
      re(p, y(v, p) || {});
    }), je(i, b), !d && je(c, 0), p;
  }, n, e, r];
}, _a = (t, e, s, r, n) => {
  const c = En(e, {}), [i, d, l, u, h] = ga(t), [m, v, p] = ca(u, l, c, (U) => {
    k({}, U);
  }), [x, b, , y] = ma(t, e, p, l, u, n), A = (U) => et(U).some((B) => !!U[B]), k = (U, B) => {
    if (s())
      return !1;
    const { fn: D, Tt: L, At: V, pn: T } = U, O = D || {}, M = !!L, S = {
      It: En(e, O, M),
      fn: O,
      Tt: M
    };
    if (T)
      return b(S), !1;
    const H = B || v(re({}, S, {
      At: V
    })), $ = d(re({}, S, {
      an: p,
      Gt: H
    }));
    b(re({}, S, {
      Gt: H,
      Qt: $
    }));
    const w = A(H), I = A($), R = w || I || !Ys(O) || M;
    return R && r(U, {
      Gt: H,
      Qt: $
    }), R;
  };
  return [() => {
    const { rn: U, gt: B } = u, D = He(U), L = [m(), i(), x()];
    return je(B, D), J(Ie, L);
  }, k, () => ({
    vn: p,
    hn: l
  }), {
    gn: u,
    bn: y
  }, h];
}, ct = (t, e, s) => {
  const { N: r } = Ke(), n = ts(t), c = n ? t : t.target, i = $o(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, h = (M) => {
      const S = oo(M), H = Ht(na);
      return H ? H(S, !0) : S;
    }, m = re({}, r(), h(e)), [v, p, x] = Ns(), [b, y, A] = Ns(s), k = (M, S) => {
      A(M, S), x(M, S);
    }, [U, B, D, L, V] = _a(t, m, () => d, ({ fn: M, Tt: S }, { Gt: H, Qt: $ }) => {
      const { ft: w, Ct: I, xt: R, Ht: ne, Et: de, dt: le } = H, { Zt: F, tn: ee, nn: te, sn: X } = $;
      k("updated", [O, {
        updateHints: {
          sizeChanged: !!w,
          directionChanged: !!I,
          heightIntrinsicChanged: !!R,
          overflowEdgeChanged: !!F,
          overflowAmountChanged: !!ee,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!X,
          contentMutation: !!ne,
          hostMutation: !!de,
          appear: !!le
        },
        changedOptions: M || {},
        force: !!S
      }]);
    }, (M) => k("scroll", [O, M])), T = (M) => {
      ea(c), Ie(l), d = !0, k("destroyed", [O, M]), p(), y();
    }, O = {
      options(M, S) {
        if (M) {
          const H = S ? r() : {}, $ = _o(m, re(H, h(M)));
          Ys($) || (re(m, $), B({
            fn: $
          }));
        }
        return re({}, m);
      },
      on: b,
      off: (M, S) => {
        M && S && y(M, S);
      },
      state() {
        const { vn: M, hn: S } = D(), { ct: H } = M, { Vt: $, Rt: w, G: I, en: R, cn: ne, un: de, Pt: le } = S;
        return re({}, {
          overflowEdge: $,
          overflowAmount: w,
          overflowStyle: I,
          hasOverflow: R,
          scrollCoordinates: {
            start: le.T,
            end: le.D
          },
          padding: ne,
          paddingAbsolute: de,
          directionRTL: H,
          destroyed: d
        });
      },
      elements() {
        const { vt: M, ht: S, cn: H, ot: $, bt: w, gt: I, Kt: R } = L.gn, { Ft: ne, Wt: de } = L.bn, le = (ee) => {
          const { Mt: te, kt: X, Lt: ue } = ee;
          return {
            scrollbar: ue,
            track: X,
            handle: te
          };
        }, F = (ee) => {
          const { jt: te, Xt: X } = ee, ue = le(te[0]);
          return re({}, ue, {
            clone: () => {
              const z = le(X());
              return B({
                pn: !0
              }), z;
            }
          });
        };
        return re({}, {
          target: M,
          host: S,
          padding: H || $,
          viewport: $,
          content: w || $,
          scrollOffsetElement: I,
          scrollEventElement: R,
          scrollbarHorizontal: F(ne),
          scrollbarVertical: F(de)
        });
      },
      update: (M) => B({
        Tt: M,
        At: !0
      }),
      destroy: J(T, !1),
      plugin: (M) => u[et(M)[0]]
    };
    return xe(l, [V]), Zr(c, O), Eo(So, ct, [O, v, u]), Qr(L.gn.yt, !n && t.cancel) ? (T(!0), O) : (xe(l, U()), k("initialized", [O]), O.update(!0), O);
  }
  return i;
};
ct.plugin = (t) => {
  const e = Ge(t), s = e ? t : [t], r = s.map((n) => Eo(n, ct)[0]);
  return sa(s), e ? r : r[0];
};
ct.valid = (t) => {
  const e = t && t.elements, s = Fe(e) && e();
  return es(s) && !!$o(s.target);
};
ct.env = () => {
  const { k: t, M: e, R: s, V: r, B: n, F: c, P: i, U: d, N: l, q: u } = Ke();
  return re({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: r,
    staticDefaultInitialization: n,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
function xa() {
  let t;
  const e = E(null), s = Math.floor(Math.random() * 2 ** 32), r = E(!1), n = E([]), c = () => n.value, i = () => t.getSelection(), d = () => n.value.length, l = () => t.clearSelection(!0), u = E(), h = E(null), m = E(null), v = E(null);
  function p() {
    t = new nr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: B, event: D, isDragging: L }) => {
      if (L)
        t.Interaction._reset(D);
      else {
        r.value = !1;
        const V = e.value.offsetWidth - D.offsetX, T = e.value.offsetHeight - D.offsetY;
        V < 15 && T < 15 && t.Interaction._reset(D), D.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(D);
      }
    }), document.addEventListener("dragleave", (B) => {
      !B.buttons && r.value && (r.value = !1);
    });
  }
  const x = () => ft(() => {
    t.addSelection(
      t.getSelectables()
    ), b();
  }), b = () => {
    n.value = t.getSelection().map((B) => JSON.parse(B.dataset.item)), u.value(n.value);
  }, y = () => ft(() => {
    const B = c().map((D) => D.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((D) => B.includes(JSON.parse(D.dataset.item).path))
    ), b(), k();
  }), A = (B) => {
    u.value = B, t.subscribe("DS:end", ({ items: D, event: L, isDragging: V }) => {
      n.value = D.map((T) => JSON.parse(T.dataset.item)), B(D.map((T) => JSON.parse(T.dataset.item)));
    });
  }, k = () => {
    h.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (m.value.style.height = e.value.scrollHeight + "px", m.value.style.display = "block") : (m.value.style.height = "100%", m.value.style.display = "none"));
  }, U = (B) => {
    if (!h.value)
      return;
    const { scrollOffsetElement: D } = h.value.elements();
    D.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ce(() => {
    ct(v.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: ct
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (B) => {
        h.value = B;
      },
      scroll: (B, D) => {
        const { scrollOffsetElement: L } = B.elements();
        e.value.scrollTo({
          top: L.scrollTop,
          left: 0
        });
      }
    }), p(), k(), new ResizeObserver(k).observe(e.value), e.value.addEventListener("scroll", U), t.subscribe("DS:scroll", ({ isDragging: B }) => B || U());
  }), qs(() => {
    t && t.stop();
  }), Rn(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: m,
    scrollBarContainer: v,
    getSelected: c,
    getSelection: i,
    selectAll: x,
    clearSelection: l,
    refreshSelection: y,
    getCount: d,
    onSelect: A
  };
}
function ya(t, e) {
  const s = E(t), r = E(e), n = E([]), c = E([]), i = E([]), d = E(!1), l = E(5);
  let u = !1, h = !1;
  const m = Ot({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function v() {
    let k = [], U = [], B = r.value ?? s.value + "://";
    B.length === 0 && (n.value = []), B.replace(s.value + "://", "").split("/").forEach(function(V) {
      k.push(V), k.join("/") !== "" && U.push({
        basename: V,
        name: V,
        path: s.value + "://" + k.join("/"),
        type: "dir"
      });
    }), c.value = U;
    const [D, L] = x(U, l.value);
    i.value = L, n.value = D;
  }
  function p(k) {
    l.value = k, v();
  }
  function x(k, U) {
    return k.length > U ? [k.slice(-U), k.slice(0, -U)] : [k, []];
  }
  function b(k = null) {
    d.value = k ?? !d.value;
  }
  function y() {
    return n.value && n.value.length && !h;
  }
  const A = Ze(() => {
    var k;
    return ((k = n.value[n.value.length - 2]) == null ? void 0 : k.path) ?? s.value + "://";
  });
  return Ce(() => {
  }), ze(r, v), Ce(v), {
    adapter: s,
    path: r,
    loading: u,
    searchMode: h,
    data: m,
    breadcrumbs: n,
    breadcrumbItems: c,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: b,
    isGoUpAvailable: y,
    parentFolderPath: A
  };
}
const ba = (t, e) => {
  const s = dr(t.id), r = sr(), n = s.getStore("metricUnits", !1), c = vr(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (v) => Array.isArray(v) ? v : fr, h = s.getStore("persist-path", t.persist), m = h ? s.getStore("path", t.path) : t.path;
  return Ot({
    /** 
    * Core properties
    * */
    // app version
    version: hr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: s,
    // localization object
    i18n: Ze(() => mr(s, d, r, i)),
    // modal state
    modal: gr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Ze(() => xa()),
    // http object
    requester: cr(t.request),
    // active features
    features: u(t.features),
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: s.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: s.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: s.getStore("pinned-folders", t.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    /**
    * Settings
    * */
    // theme state
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: n,
    // human readable file sizes
    filesize: n ? zn : Un,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: h,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: ya(l, m)
  });
}, wa = /* @__PURE__ */ o("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), ka = { class: "fixed z-10 inset-0 overflow-hidden" }, $a = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Sa = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, We = {
  __name: "ModalLayout",
  setup(t) {
    const e = E(null), s = ae("ServiceContainer");
    return Ce(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), ft(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const n = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: n,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, n) => (f(), g("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = $t((c) => a(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      wa,
      o("div", ka, [
        o("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = rt((c) => a(s).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            o("div", $a, [
              Dt(r.$slots, "default")
            ]),
            o("div", Sa, [
              Dt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ca = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, n] of e)
    s[r] = n;
  return s;
}, Ea = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: s }) {
    const r = ae("ServiceContainer"), n = E(!1), { t: c } = r.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), n.value = !0, i = setTimeout(() => {
        n.value = !1;
      }, 2e3);
    };
    return Ce(() => {
      r.emitter.on(t.on, d);
    }), qs(() => {
      clearTimeout(i);
    }), {
      shown: n,
      t: c
    };
  }
}, Ta = { key: 1 };
function Ma(t, e, s, r, n, c) {
  return f(), g("div", {
    class: me(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    t.$slots.default ? Dt(t.$slots, "default", { key: 0 }) : (f(), g("span", Ta, _(r.t("Saved.")), 1))
  ], 2);
}
const gt = /* @__PURE__ */ Ca(Ea, [["render", Ma]]), Aa = { class: "sm:flex sm:items-start select-none" }, Da = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), La = { class: "mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full" }, Va = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Oa = {
  class: "flex overflow-auto",
  "aria-label": "Tabs"
}, Ha = ["onClick", "aria-current"], Ba = {
  key: 0,
  class: "mt-4"
}, Ra = { class: "m-1 text-sm text-gray-500" }, Fa = {
  href: "https://vuefinder.ozdemir.be",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, Ia = {
  href: "https://github.com/n1crack/vuefinder",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, Na = {
  key: 1,
  class: "mt-2"
}, Ua = { class: "m-1 text-sm text-gray-500" }, za = { class: "mt-3 text-left" }, Pa = { class: "space-y-2" }, ja = { class: "flex relative gap-x-3" }, qa = { class: "h-6 items-center" }, Ga = { class: "flex-1 block text-sm" }, Ka = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Wa = { class: "flex relative gap-x-3" }, Ya = { class: "h-6 items-center" }, Xa = { class: "flex-1 block text-sm" }, Ja = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Qa = { class: "flex relative gap-x-3" }, Za = { class: "h-6 items-center" }, el = { class: "flex-1 block text-sm" }, tl = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, sl = { class: "flex relative gap-x-3" }, nl = { class: "h-6 items-center" }, ol = { class: "flex-1 block text-sm" }, rl = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, al = { class: "" }, ll = { class: "h-6 items-center" }, il = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, cl = { class: "flex text-sm" }, dl = ["label"], ul = ["value"], ml = {
  key: 0,
  class: ""
}, fl = { class: "h-6 items-center" }, hl = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, pl = { class: "flex text-sm" }, vl = ["label"], gl = ["value"], _l = {
  key: 2,
  class: "mt-3"
}, xl = { class: "space-y-2 sm:w-1/2" }, yl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, bl = /* @__PURE__ */ o("kbd", null, "F2", -1), wl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, kl = /* @__PURE__ */ o("kbd", null, "F5", -1), $l = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Sl = /* @__PURE__ */ o("kbd", null, "Del", -1), Cl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, El = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Esc")
], -1), Tl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ml = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "A")
], -1), Al = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Dl = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "F")
], -1), Ll = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Vl = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "E")
], -1), Ol = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Hl = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, ",")
], -1), Bl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Rl = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "Enter")
], -1), Fl = {
  key: 3,
  class: "mt-3"
}, Il = { class: "m-1 text-sm text-gray-500" }, Ao = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: n, changeLocale: c, locale: i } = e.i18n, d = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, l = Ze(() => [
      { name: n("About"), key: d.ABOUT },
      { name: n("Settings"), key: d.SETTINGS },
      { name: n("Shortcuts"), key: d.SHORTCUTS },
      { name: n("Reset"), key: d.RESET }
    ]), u = E("about"), h = async () => {
      r(), location.reload();
    }, m = (B) => {
      e.theme.set(B), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? zn : Un, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, p = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, x = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, b = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: y } = ae("VueFinderOptions"), k = Object.fromEntries(
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
      }).filter(([B]) => Object.keys(y).includes(B))
    ), U = Ze(() => ({
      system: n("System"),
      light: n("Light"),
      dark: n("Dark")
    }));
    return (B, D) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: D[8] || (D[8] = (L) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(n)("Close")), 1)
      ]),
      default: se(() => [
        o("div", Aa, [
          Da,
          o("div", La, [
            o("h3", Va, _("Vuefinder " + a(e).version), 1),
            o("div", null, [
              o("div", null, [
                o("nav", Oa, [
                  (f(!0), g(he, null, $e(l.value, (L) => (f(), g("button", {
                    key: L.name,
                    onClick: (V) => u.value = L.key,
                    class: me([L.key === u.value ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-sky-500" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-600", "px-3 py-2 border-b font-medium text-sm"]),
                    "aria-current": L.current ? "page" : void 0
                  }, _(L.name), 11, Ha))), 128))
                ])
              ])
            ]),
            u.value === d.ABOUT ? (f(), g("div", Ba, [
              o("div", Ra, _(a(n)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              o("a", Fa, _(a(n)("Project home")), 1),
              o("a", Ia, _(a(n)("Follow on GitHub")), 1)
            ])) : P("", !0),
            u.value === d.SETTINGS ? (f(), g("div", Na, [
              o("div", Ua, _(a(n)("Customize your experience with the following settings.")), 1),
              o("div", za, [
                o("fieldset", null, [
                  o("div", Pa, [
                    o("div", ja, [
                      o("div", qa, [
                        ve(o("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": D[0] || (D[0] = (L) => a(e).metricUnits = L),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).metricUnits]
                        ])
                      ]),
                      o("div", Ga, [
                        o("label", Ka, [
                          Q(_(a(n)("Use Metric Units")) + " ", 1),
                          Y(gt, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    o("div", Wa, [
                      o("div", Ya, [
                        ve(o("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": D[1] || (D[1] = (L) => a(e).compactListView = L),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).compactListView]
                        ])
                      ]),
                      o("div", Xa, [
                        o("label", Ja, [
                          Q(_(a(n)("Compact list view")) + " ", 1),
                          Y(gt, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    o("div", Qa, [
                      o("div", Za, [
                        ve(o("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": D[2] || (D[2] = (L) => a(e).persist = L),
                          onClick: b,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).persist]
                        ])
                      ]),
                      o("div", el, [
                        o("label", tl, [
                          Q(_(a(n)("Persist path on reload")) + " ", 1),
                          Y(gt, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    o("div", sl, [
                      o("div", nl, [
                        ve(o("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": D[3] || (D[3] = (L) => a(e).showThumbnails = L),
                          onClick: x,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).showThumbnails]
                        ])
                      ]),
                      o("div", ol, [
                        o("label", rl, [
                          Q(_(a(n)("Show thumbnails")) + " ", 1),
                          Y(gt, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    o("div", al, [
                      o("div", ll, [
                        o("label", il, _(a(n)("Theme")), 1)
                      ]),
                      o("div", cl, [
                        ve(o("select", {
                          id: "theme",
                          "onUpdate:modelValue": D[4] || (D[4] = (L) => a(e).theme.value = L),
                          onChange: D[5] || (D[5] = (L) => m(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          o("optgroup", {
                            label: a(n)("Theme")
                          }, [
                            (f(!0), g(he, null, $e(U.value, (L, V) => (f(), g("option", { value: V }, _(L), 9, ul))), 256))
                          ], 8, dl)
                        ], 544), [
                          [Ss, a(e).theme.value]
                        ]),
                        Y(gt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: se(() => [
                            Q(_(a(n)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    a(e).features.includes(a(pe).LANGUAGE) && Object.keys(a(k)).length > 1 ? (f(), g("div", ml, [
                      o("div", fl, [
                        o("label", hl, _(a(n)("Language")), 1)
                      ]),
                      o("div", pl, [
                        ve(o("select", {
                          id: "language",
                          "onUpdate:modelValue": D[6] || (D[6] = (L) => Fn(i) ? i.value = L : null),
                          onChange: D[7] || (D[7] = (L) => a(c)(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          o("optgroup", {
                            label: a(n)("Language")
                          }, [
                            (f(!0), g(he, null, $e(a(k), (L, V) => (f(), g("option", { value: V }, _(L), 9, gl))), 256))
                          ], 8, vl)
                        ], 544), [
                          [Ss, a(i)]
                        ]),
                        Y(gt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: se(() => [
                            Q(_(a(n)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : P("", !0)
                  ])
                ])
              ])
            ])) : P("", !0),
            u.value === d.SHORTCUTS ? (f(), g("div", _l, [
              o("div", xl, [
                o("div", yl, [
                  o("div", null, _(a(n)("Rename")), 1),
                  bl
                ]),
                o("div", wl, [
                  o("div", null, _(a(n)("Refresh")), 1),
                  kl
                ]),
                o("div", $l, [
                  Q(_(a(n)("Delete")) + " ", 1),
                  Sl
                ]),
                o("div", Cl, [
                  Q(_(a(n)("Escape")) + " ", 1),
                  El
                ]),
                o("div", Tl, [
                  Q(_(a(n)("Select All")) + " ", 1),
                  Ml
                ]),
                o("div", Al, [
                  Q(_(a(n)("Search")) + " ", 1),
                  Dl
                ]),
                o("div", Ll, [
                  Q(_(a(n)("Toggle Sidebar")) + " ", 1),
                  Vl
                ]),
                o("div", Ol, [
                  Q(_(a(n)("Open Settings")) + " ", 1),
                  Hl
                ]),
                o("div", Bl, [
                  Q(_(a(n)("Toggle Full Screen")) + " ", 1),
                  Rl
                ])
              ])
            ])) : P("", !0),
            u.value === d.RESET ? (f(), g("div", Fl, [
              o("div", Il, _(a(n)("Reset all settings to default")), 1),
              o("button", {
                onClick: h,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, _(a(n)("Reset Settings")), 1)
            ])) : P("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Nl = ["title"], Ul = /* @__PURE__ */ o("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ o("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), zl = [
  Ul
], Ye = {
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
    const s = e, r = ae("ServiceContainer"), { t: n } = r.i18n, c = E(!1), i = E(null), d = E((u = i.value) == null ? void 0 : u.strMessage);
    ze(d, () => c.value = !1);
    const l = () => {
      s("hidden"), c.value = !0;
    };
    return (h, m) => (f(), g("div", null, [
      c.value ? P("", !0) : (f(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: me(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", t.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        Dt(h.$slots, "default"),
        o("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          title: a(n)("Close")
        }, zl, 8, Nl)
      ], 2))
    ]));
  }
}, Pl = { class: "sm:flex sm:items-start" }, jl = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), ql = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Gl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Kl = { class: "mt-2" }, Wl = { class: "text-sm text-gray-500" }, Yl = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Xl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Jl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ql = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zl = [
  Ql
], ei = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ti = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), si = [
  ti
], ni = { class: "ml-1.5" }, oi = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, rn = {
  __name: "ModalDelete",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(e.modal.data.items), n = E(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (i) => {
          n.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, _(a(s)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1),
        o("div", oi, _(a(s)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        o("div", Pl, [
          jl,
          o("div", ql, [
            o("h3", Gl, _(a(s)("Delete files")), 1),
            o("div", Kl, [
              o("p", Wl, _(a(s)("Are you sure you want to delete these files?")), 1),
              o("div", Yl, [
                (f(!0), g(he, null, $e(r.value, (l) => (f(), g("p", Xl, [
                  l.type === "dir" ? (f(), g("svg", Jl, Zl)) : (f(), g("svg", ei, si)),
                  o("span", ni, _(l.basename), 1)
                ]))), 256))
              ]),
              n.value.length ? (f(), W(Ye, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(n.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ri = { class: "sm:flex sm:items-start" }, ai = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), li = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ii = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ci = { class: "mt-2" }, di = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, ui = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mi = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), fi = [
  mi
], hi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pi = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), vi = [
  pi
], gi = { class: "ml-1.5" }, an = {
  __name: "ModalRename",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(e.modal.data.items[0]), n = E(e.modal.data.items[0].basename), c = E(""), i = () => {
      n.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path,
          name: n.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", n.value) });
        },
        onError: (d) => {
          c.value = s(d.message);
        }
      });
    };
    return (d, l) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Rename")), 1),
        o("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        o("div", ri, [
          ai,
          o("div", li, [
            o("h3", ii, _(a(s)("Rename")), 1),
            o("div", ci, [
              o("p", di, [
                r.value.type === "dir" ? (f(), g("svg", ui, fi)) : (f(), g("svg", hi, vi)),
                o("span", gi, _(r.value.basename), 1)
              ]),
              ve(o("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => n.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [St, n.value]
              ]),
              c.value.length ? (f(), W(Ye, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(c.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Xe = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function _i(t) {
  const e = (s) => {
    s.code === Xe.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (s.code === Xe.F2 && t.features.includes(pe.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(an, { items: t.dragSelect.getSelected() })), s.code === Xe.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.code === Xe.DELETE && (!t.dragSelect.getCount() || t.modal.open(rn, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === Xe.BACKSLASH && t.modal.open(Ao), s.metaKey && s.code === Xe.KEY_F && t.features.includes(pe.SEARCH) && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Xe.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), s.metaKey && s.code === Xe.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), s.metaKey && s.code === Xe.KEY_A && (t.dragSelect.selectAll(), s.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  }), qs(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const xi = { class: "sm:flex sm:items-start" }, yi = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), bi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, wi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ki = { class: "mt-2" }, $i = { class: "text-sm text-gray-500" }, Si = ["placeholder"], Do = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = E(""), n = E(""), c = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (i) => {
          n.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Create")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        o("div", xi, [
          yi,
          o("div", bi, [
            o("h3", wi, _(a(s)("New Folder")), 1),
            o("div", ki, [
              o("p", $i, _(a(s)("Create a new folder")), 1),
              ve(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Folder Name"),
                type: "text"
              }, null, 40, Si), [
                [St, r.value]
              ]),
              n.value.length ? (f(), W(Ye, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(n.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ci = { class: "sm:flex sm:items-start" }, Ei = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ti = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Mi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ai = { class: "mt-2" }, Di = { class: "text-sm text-gray-500" }, Li = ["placeholder"], Vi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = E(""), n = E(""), c = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (i) => {
          n.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Create")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        o("div", Ci, [
          Ei,
          o("div", Ti, [
            o("h3", Mi, _(a(s)("New File")), 1),
            o("div", Ai, [
              o("p", Di, _(a(s)("Create a new file")), 1),
              ve(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("File Name"),
                type: "text"
              }, null, 40, Li), [
                [St, r.value]
              ]),
              n.value.length ? (f(), W(Ye, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(n.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Ps(t, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(s), "$2..$4");
}
const Oi = { class: "sm:flex sm:items-start" }, Hi = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Bi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ri = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Fi = { class: "mt-2" }, Ii = {
  key: 0,
  class: "pointer-events-none"
}, Ni = {
  key: 1,
  class: "pointer-events-none"
}, Ui = ["disabled"], zi = ["disabled"], Pi = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, ji = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, qi = ["textContent"], Gi = { class: "ml-1 w-full h-fit" }, Ki = { class: "text-left hidden md:block" }, Wi = { class: "text-left md:hidden" }, Yi = {
  key: 0,
  class: "ml-auto"
}, Xi = ["title", "disabled", "onClick"], Ji = /* @__PURE__ */ o("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ o("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Qi = [
  Ji
], Zi = {
  key: 0,
  class: "py-2"
}, ec = ["disabled"], tc = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), n = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = E({ QUEUE_ENTRY_STATUS: n }), i = E(null), d = E(null), l = E(null), u = E(null), h = E(null), m = E(null), v = E([]), p = E(""), x = E(!1), b = E(!1);
    let y;
    function A(H) {
      return v.value.findIndex(($) => $.id === H);
    }
    function k(H, $ = null) {
      $ = $ ?? (H.webkitRelativePath || H.name), y.addFile({
        name: $,
        type: H.type,
        data: H,
        source: "Local"
      });
    }
    function U(H) {
      switch (H.status) {
        case n.DONE:
          return "text-green-600";
        case n.ERROR:
          return "text-red-600";
        case n.CANCELED:
          return "text-red-600";
        case n.PENDING:
        default:
          return "";
      }
    }
    const B = (H) => {
      switch (H.status) {
        case n.DONE:
          return "✓";
        case n.ERROR:
        case n.CANCELED:
          return "!";
        case n.PENDING:
        default:
          return "...";
      }
    };
    function D() {
      u.value.click();
    }
    function L() {
      if (!x.value) {
        if (!v.value.filter((H) => H.status !== n.DONE).length) {
          p.value = s("Please select file to upload first.");
          return;
        }
        p.value = "", y.retryAll(), y.upload();
      }
    }
    function V() {
      y.cancelAll({ reason: "user" }), v.value.forEach((H) => {
        H.status !== n.DONE && (H.status = n.CANCELED, H.statusName = s("Canceled"));
      }), x.value = !1;
    }
    function T(H) {
      x.value || (y.removeFile(H.id, "removed-by-user"), v.value.splice(A(H.id), 1));
    }
    function O(H) {
      if (!x.value) {
        if (y.cancelAll({ reason: "user" }), H) {
          const $ = [];
          v.value.forEach((w) => {
            w.status !== n.DONE && $.push(w);
          }), v.value = [], $.forEach((w) => {
            k(w.originalFile, w.name);
          });
          return;
        }
        v.value.splice(0);
      }
    }
    function M() {
      e.modal.close();
    }
    function S() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ce(async () => {
      y = new or({
        debug: e.debug,
        restrictions: {
          maxFileSize: pr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(w, I) {
          if (I[w.id] != null) {
            const ne = A(w.id);
            v.value[ne].status === n.PENDING && (p.value = y.i18n("noDuplicates", { fileName: w.name })), v.value = v.value.filter((de) => de.id !== w.id);
          }
          return v.value.push({
            id: w.id,
            name: w.name,
            size: e.filesize(w.size),
            status: n.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: w.data
          }), !0;
        }
      }), y.use(rr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(w, I) {
          let R;
          try {
            R = JSON.parse(w).message;
          } catch {
            R = s("Cannot parse server response.");
          }
          return new Error(R);
        }
      }), y.on("restriction-failed", (w, I) => {
        const R = v.value[A(w.id)];
        T(R), p.value = I.message;
      }), y.on("upload", () => {
        const w = S();
        y.setMeta({ ...w.body });
        const I = y.getPlugin("XHRUpload");
        I.opts.method = w.method, I.opts.endpoint = w.url + "?" + new URLSearchParams(w.params), I.opts.headers = w.headers, delete w.headers["Content-Type"], x.value = !0, v.value.forEach((R) => {
          R.status !== n.DONE && (R.percent = null, R.status = n.UPLOADING, R.statusName = s("Pending upload"));
        });
      }), y.on("upload-progress", (w, I) => {
        const R = Math.floor(I.bytesUploaded / I.bytesTotal * 100);
        v.value[A(w.id)].percent = `${R}%`;
      }), y.on("upload-success", (w) => {
        const I = v.value[A(w.id)];
        I.status = n.DONE, I.statusName = s("Done");
      }), y.on("upload-error", (w, I) => {
        const R = v.value[A(w.id)];
        R.percent = null, R.status = n.ERROR, I.isNetworkError ? R.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : R.statusName = I ? I.message : s("Unknown Error");
      }), y.on("error", (w) => {
        p.value = w.message, x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), y.on("complete", () => {
        x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), h.value.addEventListener("click", () => {
        l.value.click();
      }), m.value.addEventListener("dragover", (w) => {
        w.preventDefault(), b.value = !0;
      }), m.value.addEventListener("dragleave", (w) => {
        w.preventDefault(), b.value = !1;
      });
      function H(w, I) {
        I.isFile && I.file((R) => w(I, R)), I.isDirectory && I.createReader().readEntries((R) => {
          R.forEach((ne) => {
            H(w, ne);
          });
        });
      }
      m.value.addEventListener("drop", (w) => {
        w.preventDefault(), b.value = !1;
        const I = /^[/\\](.+)/;
        [...w.dataTransfer.items].forEach((R) => {
          R.kind === "file" && H((ne, de) => {
            const le = I.exec(ne.fullPath);
            k(de, le[1]);
          }, R.webkitGetAsEntry());
        });
      });
      const $ = ({ target: w }) => {
        const I = w.files;
        for (const R of I)
          k(R);
        w.value = "";
      };
      d.value.addEventListener("change", $), l.value.addEventListener("change", $);
    }), In(() => {
      y == null || y.close({ reason: "unmount" });
    }), (H, $) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          class: me(["vf-btn vf-btn-primary", x.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: x.value,
          onClick: rt(L, ["prevent"])
        }, _(a(s)("Upload")), 11, ec),
        x.value ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: rt(V, ["prevent"])
        }, _(a(s)("Cancel")), 1)) : (f(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: rt(M, ["prevent"])
        }, _(a(s)("Close")), 1))
      ]),
      default: se(() => [
        o("div", Oi, [
          Hi,
          o("div", Bi, [
            o("h3", Ri, _(a(s)("Upload Files")), 1),
            o("div", Fi, [
              o("div", {
                ref_key: "dropArea",
                ref: m,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: D
              }, [
                b.value ? (f(), g("div", Ii, _(a(s)("Release to drop these files.")), 1)) : (f(), g("div", Ni, _(a(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              o("div", {
                ref_key: "container",
                ref: i,
                class: "text-gray-500 mb-1"
              }, [
                o("button", {
                  ref_key: "pickFiles",
                  ref: u,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, _(a(s)("Select Files")), 513),
                o("button", {
                  ref_key: "pickFolders",
                  ref: h,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, _(a(s)("Select Folders")), 513),
                o("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: x.value,
                  onClick: $[0] || ($[0] = (w) => O(!1))
                }, _(a(s)("Clear all")), 9, Ui),
                o("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: x.value,
                  onClick: $[1] || ($[1] = (w) => O(!0))
                }, _(a(s)("Clear only successful")), 9, zi)
              ], 512),
              o("div", Pi, [
                (f(!0), g(he, null, $e(v.value, (w) => (f(), g("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: w.id
                }, [
                  o("span", ji, [
                    o("span", {
                      class: me(["text-base m-auto", U(w)]),
                      textContent: _(B(w))
                    }, null, 10, qi)
                  ]),
                  o("div", Gi, [
                    o("div", Ki, _(a(Ps)(w.name, 40)) + " (" + _(w.size) + ")", 1),
                    o("div", Wi, _(a(Ps)(w.name, 16)) + " (" + _(w.size) + ")", 1),
                    o("div", {
                      class: me(["flex break-all text-left", U(w)])
                    }, [
                      Q(_(w.statusName) + " ", 1),
                      w.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (f(), g("b", Yi, _(w.percent), 1)) : P("", !0)
                    ], 2)
                  ]),
                  o("button", {
                    type: "button",
                    class: me(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", x.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(s)("Delete"),
                    disabled: x.value,
                    onClick: (I) => T(w)
                  }, Qi, 10, Xi)
                ]))), 128)),
                v.value.length ? P("", !0) : (f(), g("div", Zi, _(a(s)("No files selected!")), 1))
              ]),
              p.value.length ? (f(), W(Ye, {
                key: 0,
                onHidden: $[2] || ($[2] = (w) => p.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(p.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
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
}, sc = { class: "sm:flex sm:items-start" }, nc = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), oc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, rc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ac = { class: "mt-2" }, lc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ic = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cc = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), dc = [
  cc
], uc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mc = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fc = [
  mc
], hc = { class: "ml-1.5" }, pc = { class: "my-1 text-sm text-gray-500" }, Lo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(e.modal.data.items[0]), n = E(""), c = E([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (d) => {
          n.value = s(d.message);
        }
      });
    };
    return (d, l) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Unarchive")), 1),
        o("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        o("div", sc, [
          nc,
          o("div", oc, [
            o("h3", rc, _(a(s)("Unarchive")), 1),
            o("div", ac, [
              (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", lc, [
                u.type === "dir" ? (f(), g("svg", ic, dc)) : (f(), g("svg", uc, fc)),
                o("span", hc, _(u.basename), 1)
              ]))), 256)),
              o("p", pc, _(a(s)("The archive will be unarchived at")) + " (" + _(a(e).fs.data.dirname) + ")", 1),
              n.value.length ? (f(), W(Ye, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(n.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, vc = { class: "sm:flex sm:items-start" }, gc = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), _c = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, xc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, yc = { class: "mt-2" }, bc = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, wc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, kc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $c = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Sc = [
  $c
], Cc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ec = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Tc = [
  Ec
], Mc = { class: "ml-1.5" }, Ac = ["placeholder"], Vo = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(""), n = E(""), c = E(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (d) => {
          n.value = s(d.message);
        }
      });
    };
    return (d, l) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Archive")), 1),
        o("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        o("div", vc, [
          gc,
          o("div", _c, [
            o("h3", xc, _(a(s)("Archive the files")), 1),
            o("div", yc, [
              o("div", bc, [
                (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", wc, [
                  u.type === "dir" ? (f(), g("svg", kc, Sc)) : (f(), g("svg", Cc, Tc)),
                  o("span", Mc, _(u.basename), 1)
                ]))), 256))
              ]),
              ve(o("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Ac), [
                [St, r.value]
              ]),
              n.value.length ? (f(), W(Ye, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(n.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Lc = /* @__PURE__ */ o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Vc = [
  Lc
];
function Oc(t, e) {
  return f(), g("svg", Dc, [...Vc]);
}
const Hc = { render: Oc }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Rc = /* @__PURE__ */ o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Fc = [
  Rc
];
function Ic(t, e) {
  return f(), g("svg", Bc, [...Fc]);
}
const Nc = { render: Ic }, Uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, zc = /* @__PURE__ */ o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), Pc = [
  zc
];
function jc(t, e) {
  return f(), g("svg", Uc, [...Pc]);
}
const qc = { render: jc }, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Kc = /* @__PURE__ */ o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), Wc = [
  Kc
];
function Yc(t, e) {
  return f(), g("svg", Gc, [...Wc]);
}
const Xc = { render: Yc }, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Qc = /* @__PURE__ */ o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), Zc = [
  Qc
];
function ed(t, e) {
  return f(), g("svg", Jc, [...Zc]);
}
const td = { render: ed }, sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, nd = /* @__PURE__ */ o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), od = [
  nd
];
function rd(t, e) {
  return f(), g("svg", sd, [...od]);
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, id = /* @__PURE__ */ o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), cd = [
  id
];
function dd(t, e) {
  return f(), g("svg", ld, [...cd]);
}
const ud = { render: dd }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, fd = /* @__PURE__ */ o("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), hd = /* @__PURE__ */ o("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), pd = [
  fd,
  hd
];
function vd(t, e) {
  return f(), g("svg", md, [...pd]);
}
const ln = { render: vd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, _d = /* @__PURE__ */ o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), xd = [
  _d
];
function yd(t, e) {
  return f(), g("svg", gd, [...xd]);
}
const bd = { render: yd }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, kd = /* @__PURE__ */ o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), $d = [
  kd
];
function Sd(t, e) {
  return f(), g("svg", wd, [...$d]);
}
const Cd = { render: Sd }, Ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Td = /* @__PURE__ */ o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), Md = [
  Td
];
function Ad(t, e) {
  return f(), g("svg", Ed, [...Md]);
}
const Dd = { render: Ad }, Ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Vd = /* @__PURE__ */ o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), Od = [
  Vd
];
function Hd(t, e) {
  return f(), g("svg", Ld, [...Od]);
}
const Bd = { render: Hd }, Rd = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm grow-0" }, Fd = {
  key: 0,
  class: "flex text-center"
}, Id = ["title"], Nd = ["title"], Ud = ["title"], zd = ["title"], Pd = ["title"], jd = ["title"], qd = ["title"], Gd = {
  key: 1,
  class: "flex text-center"
}, Kd = { class: "pl-2" }, Wd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Yd = { class: "flex text-center items-center justify-end" }, Xd = ["title"], Jd = ["title"], Qd = {
  __name: "Toolbar",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, n = e.dragSelect, c = E("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    ze(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", n.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (f(), g("div", Rd, [
      c.value.length ? (f(), g("div", Gd, [
        o("div", Kd, [
          Q(_(a(r)("Search results for")) + " ", 1),
          o("span", Wd, _(c.value), 1)
        ]),
        a(e).fs.loading ? (f(), W(a(ln), { key: 0 })) : P("", !0)
      ])) : (f(), g("div", Fd, [
        a(e).features.includes(a(pe).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: a(r)("New Folder"),
          onClick: u[0] || (u[0] = (h) => a(e).modal.open(Do, { items: a(n).getSelected() }))
        }, [
          Y(a(Hc))
        ], 8, Id)) : P("", !0),
        a(e).features.includes(a(pe).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: a(r)("New File"),
          onClick: u[1] || (u[1] = (h) => a(e).modal.open(Vi, { items: a(n).getSelected() }))
        }, [
          Y(a(Nc))
        ], 8, Nd)) : P("", !0),
        a(e).features.includes(a(pe).RENAME) ? (f(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: a(r)("Rename"),
          onClick: u[2] || (u[2] = (h) => a(n).getCount() !== 1 || a(e).modal.open(an, { items: a(n).getSelected() }))
        }, [
          Y(a(qc), {
            class: me(a(n).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ud)) : P("", !0),
        a(e).features.includes(a(pe).DELETE) ? (f(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: a(r)("Delete"),
          onClick: u[3] || (u[3] = (h) => !a(n).getCount() || a(e).modal.open(rn, { items: a(n).getSelected() }))
        }, [
          Y(a(Xc), {
            class: me(a(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : P("", !0),
        a(e).features.includes(a(pe).UPLOAD) ? (f(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: a(r)("Upload"),
          onClick: u[4] || (u[4] = (h) => a(e).modal.open(tc, { items: a(n).getSelected() }))
        }, [
          Y(a(td))
        ], 8, Pd)) : P("", !0),
        a(e).features.includes(a(pe).UNARCHIVE) && a(n).getCount() === 1 && a(n).getSelected()[0].mime_type === "application/zip" ? (f(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: a(r)("Unarchive"),
          onClick: u[5] || (u[5] = (h) => !a(n).getCount() || a(e).modal.open(Lo, { items: a(n).getSelected() }))
        }, [
          Y(a(ud), {
            class: me(a(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, jd)) : P("", !0),
        a(e).features.includes(a(pe).ARCHIVE) ? (f(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: a(r)("Archive"),
          onClick: u[6] || (u[6] = (h) => !a(n).getCount() || a(e).modal.open(Vo, { items: a(n).getSelected() }))
        }, [
          Y(a(ad), {
            class: me(a(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qd)) : P("", !0)
      ])),
      o("div", Yd, [
        a(e).features.includes(a(pe).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: a(r)("Toggle Full Screen")
        }, [
          a(e).fullScreen ? (f(), W(a(Cd), { key: 0 })) : (f(), W(a(bd), { key: 1 }))
        ], 8, Xd)) : P("", !0),
        o("div", {
          class: "mx-1.5",
          title: a(r)("Change View"),
          onClick: u[7] || (u[7] = (h) => c.value.length || d())
        }, [
          a(e).view === "grid" ? (f(), W(a(Dd), {
            key: 0,
            class: me(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0),
          a(e).view === "list" ? (f(), W(a(Bd), {
            key: 1,
            class: me(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0)
        ], 8, Jd)
      ])
    ]));
  }
}, Zd = (t, e = 0, s = !1) => {
  let r;
  return (...n) => {
    s && !r && t(...n), clearTimeout(r), r = setTimeout(() => {
      t(...n);
    }, e);
  };
}, Hn = (t, e, s) => {
  const r = E(t);
  return Yo((n, c) => ({
    get() {
      return n(), r.value;
    },
    set: Zd(
      (i) => {
        r.value = i, c();
      },
      e,
      s
    )
  }));
}, eu = { class: "sm:flex sm:items-start" }, tu = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ o("svg", {
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), su = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, nu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ou = { class: "text-sm text-gray-500 pb-1" }, ru = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, au = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, lu = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, iu = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), cu = [
  iu
], du = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, uu = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), mu = [
  uu
], fu = { class: "ml-1.5" }, hu = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, pu = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, vu = /* @__PURE__ */ o("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ o("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), gu = { class: "ml-1.5 overflow-auto" }, _u = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, js = {
  __name: "ModalMove",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(e.modal.data.items.from), n = E(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          n.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Yes, Move!")), 1),
        o("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1),
        o("div", _u, _(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        o("div", eu, [
          tu,
          o("div", su, [
            o("h3", nu, _(a(s)("Move files")), 1),
            o("p", ou, _(a(s)("Are you sure you want to move these files?")), 1),
            o("div", ru, [
              (f(!0), g(he, null, $e(r.value, (l) => (f(), g("div", au, [
                o("div", null, [
                  l.type === "dir" ? (f(), g("svg", lu, cu)) : (f(), g("svg", du, mu))
                ]),
                o("div", fu, _(l.path), 1)
              ]))), 256))
            ]),
            o("h4", hu, _(a(s)("Target Directory")), 1),
            o("p", pu, [
              vu,
              o("span", gu, _(a(e).modal.data.items.to.path), 1)
            ]),
            n.value.length ? (f(), W(Ye, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => n.value = ""),
              error: ""
            }, {
              default: se(() => [
                Q(_(n.value), 1)
              ]),
              _: 1
            })) : P("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, yu = /* @__PURE__ */ o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), bu = [
  yu
];
function wu(t, e) {
  return f(), g("svg", xu, [...bu]);
}
const ku = { render: wu }, $u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, Su = /* @__PURE__ */ o("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), Cu = [
  Su
];
function Eu(t, e) {
  return f(), g("svg", $u, [...Cu]);
}
const Tu = { render: Eu }, Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, Au = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Du = [
  Au
];
function Lu(t, e) {
  return f(), g("svg", Mu, [...Du]);
}
const Vu = { render: Lu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, Hu = /* @__PURE__ */ o("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Bu = [
  Hu
];
function Ru(t, e) {
  return f(), g("svg", Ou, [...Bu]);
}
const Fu = { render: Ru }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Nu = /* @__PURE__ */ o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Uu = [
  Nu
];
function zu(t, e) {
  return f(), g("svg", Iu, [...Uu]);
}
const Pu = { render: zu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, qu = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Gu = [
  qu
];
function Ku(t, e) {
  return f(), g("svg", ju, [...Gu]);
}
const Wu = { render: Ku }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Xu = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Ju = [
  Xu
];
function Qu(t, e) {
  return f(), g("svg", Yu, [...Ju]);
}
const fs = { render: Qu }, Zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, e0 = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), t0 = /* @__PURE__ */ o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), s0 = [
  e0,
  t0
];
function n0(t, e) {
  return f(), g("svg", Zu, [...s0]);
}
const o0 = { render: n0 }, r0 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, a0 = /* @__PURE__ */ o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), l0 = [
  a0
];
function i0(t, e) {
  return f(), g("svg", r0, [...l0]);
}
const c0 = { render: i0 }, d0 = { class: "space-x-0.5 flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm grow-0" }, u0 = ["title"], m0 = ["title"], f0 = ["title"], h0 = ["title"], p0 = { class: "flex leading-6" }, v0 = {
  key: 0,
  class: "flex"
}, g0 = /* @__PURE__ */ o("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), _0 = { class: "relative" }, x0 = /* @__PURE__ */ o("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), y0 = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], b0 = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, w0 = ["placeholder"], k0 = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, $0 = ["onDrop", "onClick"], S0 = { class: "flex pointer-events-none" }, C0 = { class: "inline-block w-full text-ellipsis overflow-hidden" }, E0 = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: n } = e.storage, c = E(null), i = Hn(0, 100);
    ze(i, (V) => {
      const T = c.value.children;
      let O = 0, M = 0, S = 5, H = 1;
      e.fs.limitBreadcrumbItems(S), ft(() => {
        for (let $ = T.length - 1; $ >= 0 && !(O + T[$].offsetWidth > i.value - 40); $--)
          O += parseInt(T[$].offsetWidth, 10), M++;
        M < H && (M = H), M > S && (M = S), e.fs.limitBreadcrumbItems(M);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    Ce(() => {
      new ResizeObserver(d).observe(c.value);
    });
    const l = (V, T = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, m(V), T ?? (T = e.fs.hiddenBreadcrumbs.length - 1);
      let O = JSON.parse(V.dataTransfer.getData("items"));
      if (O.find((M) => M.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: O,
          to: e.fs.hiddenBreadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (V, T = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, m(V), T ?? (T = e.fs.breadcrumbs.length - 2);
      let O = JSON.parse(V.dataTransfer.getData("items"));
      if (O.find((M) => M.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: O,
          to: e.fs.breadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, h = (V) => {
      V.preventDefault(), e.fs.isGoUpAvailable() ? (V.dataTransfer.dropEffect = "copy", V.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (V.dataTransfer.dropEffect = "none", V.dataTransfer.effectAllowed = "none");
    }, m = (V) => {
      V.preventDefault(), V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      D(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, p = () => {
      D(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, x = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, b = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = {
      mounted(V, T, O, M) {
        V.clickOutsideEvent = function(S) {
          V === S.target || V.contains(S.target) || T.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V, T, O, M) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, A = () => {
      e.showTreeView = !e.showTreeView;
    };
    ze(() => e.showTreeView, (V, T) => {
      V !== T && n("show-tree-view", V);
    });
    const k = E(null), U = () => {
      e.features.includes(pe.SEARCH) && (e.fs.searchMode = !0, ft(() => k.value.focus()));
    }, B = Hn("", 400);
    ze(B, (V) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: V });
    }), ze(() => e.fs.searchMode, (V) => {
      V && ft(() => k.value.focus());
    });
    const D = () => {
      e.fs.searchMode = !1, B.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      D();
    });
    const L = () => {
      B.value === "" && D();
    };
    return (V, T) => (f(), g("div", d0, [
      o("span", {
        title: a(s)("Toggle Tree View")
      }, [
        Y(a(o0), {
          onClick: A,
          class: me(["h-6 w-6 p-0.5 rounded cursor-pointer text-slate-700", a(e).showTreeView ? "bg-gray-300 dark:bg-gray-700" : ""])
        }, null, 8, ["class"])
      ], 8, u0),
      o("span", {
        title: a(s)("Go up a directory")
      }, [
        Y(a(Tu), {
          onDragover: T[0] || (T[0] = (O) => h(O)),
          onDragleave: T[1] || (T[1] = (O) => m(O)),
          onDrop: T[2] || (T[2] = (O) => u(O)),
          onClick: p,
          class: me(a(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, m0),
      a(e).fs.loading ? (f(), g("span", {
        key: 1,
        title: a(s)("Cancel")
      }, [
        Y(a(Vu), {
          onClick: T[3] || (T[3] = (O) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, h0)) : (f(), g("span", {
        key: 0,
        title: a(s)("Refresh")
      }, [
        Y(a(ku), { onClick: v })
      ], 8, f0)),
      ve(o("div", {
        onClick: rt(U, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        o("div", null, [
          Y(a(Fu), {
            onDragover: T[4] || (T[4] = (O) => h(O)),
            onDragleave: T[5] || (T[5] = (O) => m(O)),
            onDrop: T[6] || (T[6] = (O) => u(O, -1)),
            onClick: T[7] || (T[7] = (O) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter } }))
          })
        ]),
        o("div", p0, [
          a(e).fs.hiddenBreadcrumbs.length ? ve((f(), g("div", v0, [
            g0,
            o("div", _0, [
              o("span", {
                onDragenter: T[8] || (T[8] = (O) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: T[9] || (T[9] = (O) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                Y(a(c0), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [y, b]
          ]) : P("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: rt(U, ["self"])
        }, [
          (f(!0), g(he, null, $e(a(e).fs.breadcrumbs, (O, M) => (f(), g("div", { key: M }, [
            x0,
            o("span", {
              onDragover: (S) => M === a(e).fs.breadcrumbs.length - 1 || h(S),
              onDragleave: (S) => M === a(e).fs.breadcrumbs.length - 1 || m(S),
              onDrop: (S) => M === a(e).fs.breadcrumbs.length - 1 || u(S, M),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: O.basename,
              onClick: (S) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter, path: O.path } })
            }, _(O.name), 41, y0)
          ]))), 128))
        ], 512),
        a(e).fs.loading ? (f(), W(a(ln), { key: 0 })) : P("", !0)
      ], 512), [
        [Pe, !a(e).fs.searchMode]
      ]),
      ve(o("div", b0, [
        o("div", null, [
          Y(a(Pu))
        ]),
        ve(o("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: $t(D, ["esc"]),
          onBlur: L,
          "onUpdate:modelValue": T[10] || (T[10] = (O) => Fn(B) ? B.value = O : null),
          placeholder: a(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, w0), [
          [St, a(B)]
        ]),
        Y(a(Wu), { onClick: D })
      ], 512), [
        [Pe, a(e).fs.searchMode]
      ]),
      ve(o("div", k0, [
        (f(!0), g(he, null, $e(a(e).fs.hiddenBreadcrumbs, (O, M) => (f(), g("div", {
          key: M,
          onDragover: T[11] || (T[11] = (S) => h(S)),
          onDragleave: T[12] || (T[12] = (S) => m(S)),
          onDrop: (S) => l(S, M),
          onClick: (S) => x(O),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          o("div", S0, [
            o("span", null, [
              Y(a(fs), { class: "h-5 w-5" })
            ]),
            Q(),
            o("span", C0, _(O.name), 1)
          ])
        ], 40, $0))), 128))
      ], 512), [
        [Pe, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Oo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), T0 = ["onClick"], M0 = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: s } = e.storage, r = E(s("full-screen", !1)), n = E([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      n.value.splice(l, 1);
    }, d = (l) => {
      let u = n.value.findIndex((h) => h.id === l);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      n.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, n.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (f(), g("div", {
      class: me([r.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2 z-10"])
    }, [
      Y(Xo, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: se(() => [
          (f(!0), g(he, null, $e(n.value, (h, m) => (f(), g("div", {
            onClick: (v) => i(m),
            key: h,
            class: me([c(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, _(h.label), 11, T0))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, A0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, D0 = /* @__PURE__ */ o("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), L0 = [
  D0
];
function V0(t, e) {
  return f(), g("svg", A0, [...L0]);
}
const O0 = { render: V0 }, H0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, B0 = /* @__PURE__ */ o("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), R0 = [
  B0
];
function F0(t, e) {
  return f(), g("svg", H0, [...R0]);
}
const I0 = { render: F0 }, Kt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (f(), g("div", null, [
      t.direction === "asc" ? (f(), W(a(O0), { key: 0 })) : P("", !0),
      t.direction === "desc" ? (f(), W(a(I0), { key: 1 })) : P("", !0)
    ]));
  }
}, N0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, U0 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), z0 = [
  U0
];
function P0(t, e) {
  return f(), g("svg", N0, [...z0]);
}
const j0 = { render: P0 }, ks = {
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
    return (e, s) => (f(), g("span", null, [
      t.type === "dir" ? (f(), W(a(fs), {
        key: 0,
        class: me({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"])) : (f(), W(a(j0), {
        key: 1,
        class: me({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, q0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, G0 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), K0 = [
  G0
];
function W0(t, e) {
  return f(), g("svg", q0, [...K0]);
}
const Y0 = { render: W0 }, X0 = { class: "absolute -z-50 -top-96" }, J0 = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Q0 = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, r) => (f(), g("div", X0, [
      Y(a(Y0)),
      o("div", J0, _(e.count), 1)
    ]));
  }
}, Z0 = { class: "flex" }, em = ["title"], tm = { class: "ml-auto mb-2" }, sm = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, nm = { key: 1 }, om = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = E(""), n = E(""), c = E(null), i = E(!1), d = E(""), l = E(!1), u = ae("ServiceContainer"), { t: h } = u.i18n;
    Ce(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((p) => {
        r.value = p, s("success");
      });
    });
    const m = () => {
      i.value = !i.value, n.value = r.value;
    }, v = () => {
      d.value = "", l.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: n.value
        },
        responseType: "text"
      }).then((p) => {
        d.value = h("Updated."), r.value = p, s("success"), i.value = !i.value;
      }).catch((p) => {
        d.value = h(p.message), l.value = !0;
      });
    };
    return (p, x) => (f(), g(he, null, [
      o("div", Z0, [
        o("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: a(u).modal.data.item.path
        }, _(a(u).modal.data.item.basename), 9, em),
        o("div", tm, [
          i.value ? (f(), g("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, _(a(h)("Save")), 1)) : P("", !0),
          a(u).features.includes(a(pe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: x[0] || (x[0] = (b) => m())
          }, _(i.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : P("", !0)
        ])
      ]),
      o("div", null, [
        i.value ? (f(), g("div", nm, [
          ve(o("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": x[1] || (x[1] = (b) => n.value = b),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [St, n.value]
          ])
        ])) : (f(), g("pre", sm, _(r.value), 1)),
        d.value.length ? (f(), W(Ye, {
          key: 2,
          onHidden: x[2] || (x[2] = (b) => d.value = ""),
          error: l.value
        }, {
          default: se(() => [
            Q(_(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : P("", !0)
      ])
    ], 64));
  }
}, rm = { class: "flex" }, am = ["title"], lm = { class: "ml-auto mb-2" }, im = { class: "w-full flex justify-center" }, cm = ["src"], dm = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), { t: n } = r.i18n, c = E(null), i = E(null), d = E(!1), l = E(""), u = E(!1), h = () => {
      d.value = !d.value, d.value ? i.value = new lr(c.value, {
        crop(v) {
        }
      }) : i.value.destroy();
    }, m = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (v) => {
          l.value = "", u.value = !1;
          const p = new FormData();
          p.set("file", v), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: p
          }).then((x) => {
            l.value = n("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), h(), s("success");
          }).catch((x) => {
            l.value = n(x.message), u.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      s("success");
    }), (v, p) => (f(), g(he, null, [
      o("div", rm, [
        o("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: a(r).modal.data.item.path
        }, _(a(r).modal.data.item.basename), 9, am),
        o("div", lm, [
          d.value ? (f(), g("button", {
            key: 0,
            onClick: m,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, _(a(n)("Crop")), 1)) : P("", !0),
          a(r).features.includes(a(pe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: p[0] || (p[0] = (x) => h())
          }, _(d.value ? a(n)("Cancel") : a(n)("Edit")), 1)) : P("", !0)
        ])
      ]),
      o("div", im, [
        o("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, cm)
      ]),
      l.value.length ? (f(), W(Ye, {
        key: 0,
        onHidden: p[1] || (p[1] = (x) => l.value = ""),
        error: u.value
      }, {
        default: se(() => [
          Q(_(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : P("", !0)
    ], 64));
  }
}, um = { class: "flex" }, mm = ["title"], fm = /* @__PURE__ */ o("div", null, null, -1), hm = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (n, c) => (f(), g(he, null, [
      o("div", um, [
        o("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: a(s).modal.data.item.path
        }, _(a(s).modal.data.item.basename), 9, mm)
      ]),
      fm
    ], 64));
  }
}, pm = ["title"], vm = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, gm = ["src"], _m = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e, n = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (f(), g("div", null, [
      o("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        title: a(s).modal.data.item.path
      }, _(a(s).modal.data.item.basename), 9, pm),
      o("div", null, [
        o("video", vm, [
          o("source", {
            src: n(),
            type: "video/mp4"
          }, null, 8, gm),
          Q(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, xm = ["title"], ym = {
  class: "w-full",
  controls: ""
}, bm = ["src"], wm = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), n = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ce(() => {
      s("success");
    }), (c, i) => (f(), g(he, null, [
      o("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        title: a(r).modal.data.item.path
      }, _(a(r).modal.data.item.basename), 9, xm),
      o("div", null, [
        o("audio", ym, [
          o("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, bm),
          Q(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, km = ["title"], $m = ["data"], Sm = ["src"], Cm = /* @__PURE__ */ o("p", null, [
  /* @__PURE__ */ Q(" Your browser does not support PDFs. "),
  /* @__PURE__ */ o("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ Q(" . ")
], -1), Em = [
  Cm
], Tm = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e, n = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (f(), g(he, null, [
      o("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        title: a(s).modal.data.item.path
      }, _(a(s).modal.data.item.basename), 9, km),
      o("div", null, [
        o("object", {
          class: "h-[60vh]",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "border-0",
            src: n(),
            width: "100%",
            height: "100%"
          }, Em, 8, Sm)
        ], 8, $m)
      ])
    ], 64));
  }
}, Mm = { class: "sm:flex sm:items-start" }, Am = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Dm = { key: 0 }, Lm = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Vm = {
  key: 0,
  class: "flex leading-5"
}, Om = /* @__PURE__ */ o("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ o("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ o("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Hm = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, Bm = { class: "font-bold" }, Rm = { class: "font-bold pl-2" }, Fm = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Im = ["download", "href"], Ho = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(!1), n = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(pe.PREVIEW);
    return c || (r.value = !0), (i, d) => (f(), W(We, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Close")), 1),
        a(e).features.includes(a(pe).DOWNLOAD) ? (f(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item),
          href: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item)
        }, _(a(s)("Download")), 9, Im)) : P("", !0)
      ]),
      default: se(() => [
        o("div", Mm, [
          o("div", Am, [
            a(c) ? (f(), g("div", Dm, [
              n("text") ? (f(), W(om, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : n("image") ? (f(), W(dm, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : n("video") ? (f(), W(_m, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : n("audio") ? (f(), W(wm, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : n("application/pdf") ? (f(), W(Tm, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (f(), W(hm, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : P("", !0),
            o("div", Lm, [
              r.value === !1 ? (f(), g("div", Vm, [
                Om,
                o("span", null, _(a(s)("Loading")), 1)
              ])) : P("", !0)
            ])
          ])
        ]),
        o("div", Hm, [
          o("div", null, [
            o("span", Bm, _(a(s)("File Size")) + ": ", 1),
            Q(_(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Rm, _(a(s)("Last Modified")) + ": ", 1),
            Q(" " + _(a(Oo)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(pe).DOWNLOAD) ? (f(), g("div", Fm, [
          o("span", null, _(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : P("", !0)
      ]),
      _: 1
    }));
  }
}, Nm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Um = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), zm = /* @__PURE__ */ o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Pm = [
  Um,
  zm
];
function jm(t, e) {
  return f(), g("svg", Nm, [...Pm]);
}
const Bo = { render: jm }, qm = ["data-type", "data-item", "data-index"], $s = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = e.dragSelect, r = t, n = (p) => {
      p.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: p.path } })) : e.modal.open(Ho, { adapter: e.fs.adapter, item: p });
    }, c = {
      mounted(p, x, b, y) {
        b.props.draggable && (p.addEventListener("dragstart", (A) => i(A, x.value)), p.addEventListener("dragover", (A) => l(A, x.value)), p.addEventListener("drop", (A) => d(A, x.value)));
      },
      beforeUnmount(p, x, b, y) {
        b.props.draggable && (p.removeEventListener("dragstart", i), p.removeEventListener("dragover", l), p.removeEventListener("drop", d));
      }
    }, i = (p, x) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      s.isDraggingRef.value = !0, p.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (p, x) => {
      p.preventDefault(), s.isDraggingRef.value = !1;
      let b = JSON.parse(p.dataTransfer.getData("items"));
      if (b.find((y) => y.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, { items: { from: b, to: x } });
    }, l = (p, x) => {
      p.preventDefault(), !x || x.type !== "dir" || s.getSelection().find((b) => b === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
    };
    let u = null, h = !1;
    const m = () => {
      u && clearTimeout(u);
    }, v = (p) => {
      if (!h)
        h = !0, setTimeout(() => h = !1, 300);
      else
        return h = !1, n(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const x = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: p.target.getBoundingClientRect().x,
          clientY: p.target.getBoundingClientRect().y
        });
        p.target.dispatchEvent(x);
      }, 500);
    };
    return (p, x) => ve((f(), g("div", {
      style: os({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((b) => p.$el === b) ? "0.5 !important" : "" }),
      class: me(["vf-item-" + a(s).explorerId, "relative"]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: x[0] || (x[0] = (b) => n(t.item)),
      onTouchstart: x[1] || (x[1] = (b) => v(b)),
      onTouchend: x[2] || (x[2] = (b) => m()),
      onContextmenu: x[3] || (x[3] = rt((b) => a(e).emitter.emit("vf-contextmenu-show", { event: b, items: a(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Dt(p.$slots, "default"),
      a(e).pinnedFolders.find((b) => b.path === t.item.path) ? (f(), W(a(Bo), {
        key: 0,
        class: "absolute top-0 right-0 text-amber-600"
      })) : P("", !0)
    ], 46, qm)), [
      [c, t.item]
    ]);
  }
}, Gm = { class: "relative flex-auto flex flex-col" }, Km = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, Wm = { class: "relative" }, Ym = { class: "grid grid-cols-12 items-center" }, Xm = { class: "flex col-span-7 items-center" }, Jm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Qm = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Zm = { class: "grid grid-cols-12 items-center" }, e1 = { class: "flex col-span-7 items-center" }, t1 = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, s1 = { class: "col-span-2 text-center" }, n1 = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, o1 = { class: "relative" }, r1 = ["data-src", "alt"], a1 = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, l1 = { class: "break-all" }, i1 = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = (m) => m == null ? void 0 : m.substring(0, 3), n = E(null), c = E(""), i = e.dragSelect;
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
        onSuccess: (v) => {
          v.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = Ot({ active: !1, column: "", order: "" }), u = (m = !0) => {
      let v = [...e.fs.data.files], p = l.column, x = l.order === "asc" ? 1 : -1;
      if (!m)
        return v;
      const b = (y, A) => typeof y == "string" && typeof A == "string" ? y.toLowerCase().localeCompare(A.toLowerCase()) : y < A ? -1 : y > A ? 1 : 0;
      return l.active && (v = v.slice().sort((y, A) => b(y[p], A[p]) * x)), v;
    }, h = (m) => {
      l.active && l.column === m ? (l.active = l.order === "asc", l.column = m, l.order = "desc") : (l.active = !0, l.column = m, l.order = "asc");
    };
    return Ce(() => {
      d = new ar(i.area.value);
    }), Rn(() => {
      d.update();
    }), In(() => {
      d.destroy();
    }), (m, v) => (f(), g("div", Gm, [
      a(e).view === "list" || c.value.length ? (f(), g("div", Km, [
        o("div", {
          onClick: v[0] || (v[0] = (p) => h("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          Q(_(a(s)("Name")) + " ", 1),
          ve(Y(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Pe, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? P("", !0) : (f(), g("div", {
          key: 0,
          onClick: v[1] || (v[1] = (p) => h("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          Q(_(a(s)("Size")) + " ", 1),
          ve(Y(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Pe, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? P("", !0) : (f(), g("div", {
          key: 1,
          onClick: v[2] || (v[2] = (p) => h("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          Q(_(a(s)("Date")) + " ", 1),
          ve(Y(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Pe, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (f(), g("div", {
          key: 2,
          onClick: v[3] || (v[3] = (p) => h("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          Q(_(a(s)("Filepath")) + " ", 1),
          ve(Y(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Pe, l.active && l.column === "path"]
          ])
        ])) : P("", !0)
      ])) : P("", !0),
      o("div", Wm, [
        Y(Q0, {
          ref_key: "dragImage",
          ref: n,
          count: a(i).getCount()
        }, null, 8, ["count"])
      ]),
      o("div", {
        ref: a(i).scrollBarContainer,
        class: me(["vf-explorer-scrollbar-container", [{ "grid-view": a(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        o("div", {
          ref: a(i).scrollBar,
          class: "w-5 bg-transparent pointer-events-none"
        }, null, 512)
      ], 2),
      o("div", {
        ref: a(i).area,
        class: "h-full w-full text-xs p-1 vf-explorer-scrollbar vf-selector-area min-h-[150px] z-0 overflow-y-auto",
        onContextmenu: v[4] || (v[4] = rt((p) => a(e).emitter.emit("vf-contextmenu-show", { event: p, items: a(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (f(!0), g(he, { key: 0 }, $e(u(), (p, x) => (f(), W($s, {
          item: p,
          index: x,
          dragImage: n.value,
          class: "vf-item vf-item-list"
        }, {
          default: se(() => [
            o("div", Ym, [
              o("div", Xm, [
                Y(ks, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                o("span", Jm, _(p.basename), 1)
              ]),
              o("div", Qm, _(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0),
        a(e).view === "list" && !c.value.length ? (f(!0), g(he, { key: 1 }, $e(u(), (p, x) => (f(), W($s, {
          item: p,
          index: x,
          dragImage: n.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: p.path
        }, {
          default: se(() => [
            o("div", Zm, [
              o("div", e1, [
                Y(ks, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                o("span", t1, _(p.basename), 1)
              ]),
              o("div", s1, _(p.file_size ? a(e).filesize(p.file_size) : ""), 1),
              o("div", n1, _(a(Oo)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : P("", !0),
        a(e).view === "grid" && !c.value.length ? (f(!0), g(he, { key: 2 }, $e(u(!1), (p, x) => (f(), W($s, {
          item: p,
          index: x,
          dragImage: n.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: se(() => [
            o("div", null, [
              o("div", o1, [
                (p.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, r1)) : (f(), W(ks, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && p.type !== "dir" ? (f(), g("div", a1, _(r(p.extension)), 1)) : P("", !0)
              ]),
              o("span", l1, _(a(Ps)(p.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0)
      ], 544),
      Y(M0)
    ]));
  }
}, c1 = ["href", "download"], d1 = ["onClick"], u1 = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(null), n = E([]), c = E(""), i = Ot({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Ze(() => i.items.filter((m) => m.key == null || e.features.includes(m.key)));
    e.emitter.on("vf-context-selected", (m) => {
      n.value = m;
    });
    const l = {
      newfolder: {
        key: pe.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(Do)
      },
      selectAll: {
        title: () => s("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      pinFolder: {
        title: () => s("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(n.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
        title: () => s("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((m) => !n.value.find((v) => v.path === m.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: pe.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.modal.open(rn, { items: n });
        }
      },
      refresh: {
        title: () => s("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: pe.PREVIEW,
        title: () => s("Preview"),
        action: () => e.modal.open(Ho, { adapter: e.fs.adapter, item: n.value[0] })
      },
      open: {
        title: () => s("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: n.value[0].path
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
              path: n.value[0].dir
            }
          });
        }
      },
      download: {
        key: pe.DOWNLOAD,
        link: Ze(() => e.requester.getDownloadUrl(e.fs.adapter, n.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: pe.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(Vo, { items: n })
      },
      unarchive: {
        key: pe.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(Lo, { items: n })
      },
      rename: {
        key: pe.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(an, { items: n })
      }
    }, u = (m) => {
      e.emitter.emit("vf-contextmenu-hide"), m.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      c.value = m;
    }), e.emitter.on("vf-contextmenu-show", ({ event: m, items: v, target: p = null }) => {
      if (i.items = [], c.value)
        if (p)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else !p && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((x) => x.path === p.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", v)) : (p.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((x) => x.path === p.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), p.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [p]));
      h(m);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const h = (m) => {
      const v = e.dragSelect.area.value, p = e.root.getBoundingClientRect(), x = v.getBoundingClientRect();
      let b = m.clientX - p.left, y = m.clientY - p.top;
      i.active = !0, ft(() => {
        var B;
        const A = (B = r.value) == null ? void 0 : B.getBoundingClientRect();
        let k = (A == null ? void 0 : A.height) ?? 0, U = (A == null ? void 0 : A.width) ?? 0;
        b = x.right - m.pageX + window.scrollX < U ? b - U : b, y = x.bottom - m.pageY + window.scrollY < k ? y - k : y, i.positions = {
          left: b + "px",
          top: y + "px"
        };
      });
    };
    return (m, v) => ve((f(), g("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: os(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (f(!0), g(he, null, $e(d.value, (p) => (f(), g("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: p.title
      }, [
        p.link ? (f(), g("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: p.link,
          download: p.link,
          onClick: v[0] || (v[0] = (x) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, _(p.title()), 1)
        ], 8, c1)) : (f(), g("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (x) => u(p)
        }, [
          o("span", null, _(p.title()), 1)
        ], 8, d1))
      ]))), 128))
    ], 4)), [
      [Pe, i.active]
    ]);
  }
}, m1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, f1 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), h1 = [
  f1
];
function p1(t, e) {
  return f(), g("svg", m1, [...h1]);
}
const Ro = { render: p1 }, v1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, g1 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), _1 = [
  g1
];
function x1(t, e) {
  return f(), g("svg", v1, [..._1]);
}
const y1 = { render: x1 }, b1 = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0" }, w1 = { class: "flex leading-5 items-center" }, k1 = ["title"], $1 = ["value"], S1 = { class: "ml-3" }, C1 = { key: 0 }, E1 = { class: "ml-1" }, T1 = { class: "flex leading-5 items-center justify-end" }, M1 = ["disabled"], A1 = ["title"], D1 = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, n = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = E("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = Ze(() => {
      const l = e.selectButton.multiple ? n.getSelected().length > 0 : n.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (f(), g("div", b1, [
      o("div", w1, [
        o("div", {
          class: "z-[1] pl-1 pointer-events-none",
          title: a(s)("Storage")
        }, [
          Y(a(Ro))
        ], 8, k1),
        ve(o("select", {
          "onUpdate:modelValue": u[0] || (u[0] = (h) => a(e).fs.adapter = h),
          onChange: c,
          class: "-translate-x-5 pl-4 pr-2 py-0.5 text-xs text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded uppercase focus:outline-0",
          tabindex: "-1"
        }, [
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (h) => (f(), g("option", { value: h }, _(h), 9, $1))), 256))
        ], 544), [
          [Ss, a(e).fs.adapter]
        ]),
        o("div", S1, [
          i.value.length ? (f(), g("span", C1, _(a(e).fs.data.files.length) + " items found. ", 1)) : P("", !0),
          o("span", E1, _(a(e).dragSelect.getCount() > 0 ? a(s)("%s item(s) selected.", a(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      o("div", T1, [
        a(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: me(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (h) => a(e).selectButton.click(a(n).getSelected(), h))
        }, _(a(s)("Select")), 11, M1)) : P("", !0),
        o("span", {
          class: "mr-1",
          title: a(s)("About"),
          onClick: u[2] || (u[2] = (h) => a(e).modal.open(Ao))
        }, [
          Y(a(y1))
        ], 8, A1)
      ])
    ]));
  }
}, L1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, V1 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), O1 = [
  V1
];
function H1(t, e) {
  return f(), g("svg", L1, [...O1]);
}
const Fo = { render: H1 }, B1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, R1 = /* @__PURE__ */ o("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), F1 = /* @__PURE__ */ o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), I1 = [
  R1,
  F1
];
function N1(t, e) {
  return f(), g("svg", B1, [...I1]);
}
const U1 = { render: N1 }, z1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, P1 = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), j1 = /* @__PURE__ */ o("path", { d: "M15 12H9M12 9v6" }, null, -1), q1 = [
  P1,
  j1
];
function G1(t, e) {
  return f(), g("svg", z1, [...q1]);
}
const Io = { render: G1 }, K1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, W1 = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Y1 = /* @__PURE__ */ o("path", { d: "M9 12h6" }, null, -1), X1 = [
  W1,
  Y1
];
function J1(t, e) {
  return f(), g("svg", K1, [...X1]);
}
const No = { render: J1 };
function Uo(t, e) {
  const s = t.findIndex((r) => r.path === e.path);
  s > -1 ? t[s] = e : t.push(e);
}
const Q1 = {
  key: 1,
  class: "cursor-pointer"
}, zo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Jo({
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, s = ae("ServiceContainer");
    s.i18n;
    const r = Nn(t, "modelValue"), n = E(!1);
    function c() {
      return r.value = !r.value;
    }
    function i() {
      return s.treeViewData.find((l) => l.path === e.path);
    }
    const d = () => {
      n.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((l) => {
        Uo(s.treeViewData, { path: e.path, ...l });
      }).catch((l) => {
      }).finally(() => {
        n.value = !1;
      });
    };
    return (l, u) => {
      var h;
      return f(), g("div", {
        class: "h-5 w-5 shrink-0",
        onClick: u[0] || (u[0] = (m) => {
          var v;
          return (!r.value || ((v = i()) == null ? void 0 : v.folders.length)) && c() && (i() || d());
        })
      }, [
        n.value ? (f(), W(a(ln), {
          key: 0,
          class: "p-1"
        })) : (f(), g("div", Q1, [
          r.value && ((h = i()) != null && h.folders.length) ? (f(), W(a(No), {
            key: 0,
            class: "text-gray-600"
          })) : P("", !0),
          r.value ? P("", !0) : (f(), W(a(Io), {
            key: 1,
            class: "text-gray-400"
          }))
        ]))
      ]);
    };
  }
}, Z1 = { class: "block" }, ef = { class: "flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded" }, tf = { class: "h-5 w-5 shrink-0" }, sf = ["onClick"], nf = { class: "h-5 w-5 shrink-0" }, of = { class: "pl-4" }, rf = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = E([]), r = t, n = Ze(() => {
      var c;
      return ((c = e.treeViewData.find((i) => i.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, i) => {
      const d = Qo("TreeSubfolderList", !0);
      return f(), g("ul", Z1, [
        (f(!0), g(he, null, $e(n.value, (l, u) => (f(), g("li", {
          class: "flex flex-col space-x-0.5 py-0.5 text-sm",
          key: l.path
        }, [
          o("div", ef, [
            o("div", tf, [
              Y(zo, {
                adapter: t.adapter,
                path: l.path,
                modelValue: s.value[l.path],
                "onUpdate:modelValue": (h) => s.value[l.path] = h
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ]),
            o("div", {
              class: "flex cursor-pointer",
              onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: l.path } })
            }, [
              o("div", nf, [
                a(e).fs.path === l.path ? (f(), W(a(Fo), { key: 0 })) : (f(), W(a(fs), { key: 1 }))
              ]),
              o("div", {
                class: me(["text-nowrap", { "underline decoration-blue-300 dark:decoration-gray-400": a(e).fs.path === l.path }])
              }, _(l.basename), 3)
            ], 8, sf)
          ]),
          o("div", of, [
            ve(Y(d, {
              adapter: r.adapter,
              path: l.path
            }, null, 8, ["adapter", "path"]), [
              [Pe, s.value[l.path]]
            ])
          ])
        ]))), 128))
      ]);
    };
  }
}, af = { class: "pt-1 px-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between" }, lf = { class: "h-5 w-5 shrink-0" }, cf = { class: "mr-3" }, df = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = E(!1), r = (n) => {
      e.fs.adapter = n, s.value = !s.value, e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: n } }), e.storage.setStore("adapter", n);
    };
    return (n, c) => (f(), g(he, null, [
      o("div", af, [
        o("div", {
          class: me(["flex flex-1 space-x-1 items-center cursor-pointer", t.storage === a(e).fs.adapter ? "text-gray-700/80 dark:text-gray-300/80 text-bold" : ""]),
          onClick: c[0] || (c[0] = (i) => r(t.storage))
        }, [
          o("div", lf, [
            Y(a(Ro))
          ]),
          o("div", null, _(t.storage), 1)
        ], 2),
        o("div", cf, [
          Y(zo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": c[1] || (c[1] = (i) => s.value = i)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ve(Y(rf, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "overflow-x-auto"
      }, null, 8, ["adapter", "path"]), [
        [Pe, s.value]
      ])
    ], 64));
  }
}, uf = { class: "h-5 w-5 shrink-0" }, mf = { class: "cursor-pointer" }, ff = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Nn(t, "modelValue");
    return (s, r) => (f(), g("div", uf, [
      o("div", mf, [
        e.value ? (f(), W(a(No), {
          key: 0,
          class: "text-gray-600"
        })) : P("", !0),
        e.value ? P("", !0) : (f(), W(a(Io), {
          key: 1,
          class: "text-gray-400"
        }))
      ])
    ]));
  }
}, hf = { class: "sticky left-0 top-0 z-[1] bg-gray-100 dark:bg-[#2e3c51] border-b dark:border-gray-600" }, pf = { class: "flex items-center space-x-1" }, vf = { class: "text-nowrap" }, gf = {
  key: 0,
  class: "block"
}, _f = { class: "flex pl-2 py-0.5 text-sm space-x-2" }, xf = ["onClick"], yf = ["title"], bf = ["onClick"], wf = { key: 0 }, kf = { class: "rounded-lg p-1 bg-gray-100 dark:bg-gray-700 text-xs text-center" }, $f = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { getStore: r, setStore: n } = e.storage, c = E(190), i = E(r("pinned-folders-opened", !0));
    ze(i, (h) => n("pinned-folders-opened", h));
    const d = (h) => {
      e.pinnedFolders = e.pinnedFolders.filter((m) => m.path !== h.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (h) => {
      const m = h.clientX, v = h.target.parentElement, p = v.getBoundingClientRect().width;
      v.classList.remove("transition-[width]"), v.classList.add("transition-none");
      const x = (y) => {
        c.value = p + y.clientX - m, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, b = () => {
        const y = v.getBoundingClientRect();
        c.value = y.width, v.classList.add("transition-[width]"), v.classList.remove("transition-none"), window.removeEventListener("mousemove", x), window.removeEventListener("mouseup", b);
      };
      window.addEventListener("mousemove", x), window.addEventListener("mouseup", b);
    }, u = E(null);
    return Ce(() => {
      ct(u.value, {});
    }), ze(e.fs.data, (h, m) => {
      const v = h.files.filter((p) => p.type === "dir");
      Uo(e.treeViewData, { path: e.fs.path, folders: v.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (h, m) => (f(), g(he, null, [
      o("div", {
        onClick: m[0] || (m[0] = (v) => a(e).showTreeView = !a(e).showTreeView),
        class: me(["w-full h-full bg-gray-300/10 dark:bg-gray-700/10 z-[1]", a(e).showTreeView ? "backdrop-blur-sm absolute md:hidden" : "hidden"])
      }, null, 2),
      o("div", {
        style: os(a(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "absolute h-full md:h-auto md:relative shadow-lg shrink-0 transition-[width] ease-in-out duration-200 z-[1] bg-gray-50 dark:bg-[#242f41]"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "h-full border-r dark:border-gray-600/50 pb-4"
        }, [
          o("div", hf, [
            o("div", {
              onClick: m[2] || (m[2] = (v) => i.value = !i.value),
              class: "p-1 uppercase font-bold text-gray-400 dark:text-gray-400 text-xs flex items-center justify-between cursor-pointer"
            }, [
              o("div", pf, [
                Y(a(Bo), { class: "text-amber-600" }),
                o("div", vf, _(a(s)("Pinned Folders")), 1)
              ]),
              Y(ff, {
                modelValue: i.value,
                "onUpdate:modelValue": m[1] || (m[1] = (v) => i.value = v)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (f(), g("ul", gf, [
              (f(!0), g(he, null, $e(a(e).pinnedFolders, (v) => (f(), g("li", _f, [
                o("div", {
                  class: "flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer",
                  onClick: (p) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: v.storage, path: v.path } })
                }, [
                  a(e).fs.path !== v.path ? (f(), W(a(fs), {
                    key: 0,
                    class: "h-5 w-5"
                  })) : P("", !0),
                  a(e).fs.path === v.path ? (f(), W(a(Fo), {
                    key: 1,
                    class: "h-5 w-5"
                  })) : P("", !0),
                  o("div", {
                    title: v.path,
                    class: me(["text-nowrap", { "underline decoration-blue-300 dark:decoration-gray-400": a(e).fs.path === v.path }])
                  }, _(v.basename), 11, yf)
                ], 8, xf),
                o("div", {
                  class: "cursor-pointer",
                  onClick: (p) => d(v)
                }, [
                  Y(a(U1), { class: "p-0.5 text-gray-300 hover:text-gray-400 dark:text-gray-600 hover:dark:text-gray-400" })
                ], 8, bf)
              ]))), 256)),
              a(e).pinnedFolders.length ? P("", !0) : (f(), g("li", wf, [
                o("div", kf, _(a(s)("No folders pinned")), 1)
              ]))
            ])) : P("", !0)
          ]),
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (v) => (f(), g("div", null, [
            Y(df, { storage: v }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        o("div", {
          onMousedown: l,
          class: me([(a(e).showTreeView, ""), "transition-colors ease-in-out duration-200 top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, Sf = { class: "relative flex overflow-hidden h-full" }, Cf = {
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
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: []
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
    const s = e, n = ba(t, ae("VueFinderOptions"));
    Zo("ServiceContainer", n);
    const { setStore: c } = n.storage, i = E(null);
    n.root = i;
    const d = n.dragSelect;
    _i(n);
    const l = (h) => {
      Object.assign(n.fs.data, h), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return n.emitter.on("vf-fetch-abort", () => {
      u.abort(), n.fs.loading = !1;
    }), n.emitter.on("vf-fetch", ({ params: h, body: m = null, onSuccess: v = null, onError: p = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(h.q) && (u && u.abort(), n.fs.loading = !0), u = new AbortController();
      const b = u.signal;
      n.requester.send({
        url: "",
        method: h.m || "get",
        params: h,
        body: m,
        abortSignal: b
      }).then((y) => {
        n.fs.adapter = y.adapter, n.persist && (n.fs.path = y.dirname, c("path", n.fs.path)), ["index", "search"].includes(h.q) && (n.fs.loading = !1), x || n.modal.close(), l(y), v && v(y);
      }).catch((y) => {
        console.error(y), p && p(y);
      });
    }), Ce(() => {
      let h = {};
      n.fs.path.includes("://") && (h = {
        adapter: n.fs.path.split("://")[0],
        path: n.fs.path
      }), n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, ...h } }), d.onSelect((m) => {
        s("select", m);
      });
    }), (h, m) => (f(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      o("div", {
        class: me(a(n).theme.actualValue)
      }, [
        o("div", {
          class: me([a(n).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded resize-y ", "overflow-hidden min-h-44 border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: os(a(n).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: m[0] || (m[0] = (v) => a(n).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (v) => a(n).emitter.emit("vf-contextmenu-hide"))
        }, [
          Y(Qd),
          Y(E0),
          o("div", Sf, [
            Y($f),
            Y(i1)
          ]),
          Y(D1)
        ], 38),
        Y(er, { name: "fade" }, {
          default: se(() => [
            a(n).modal.visible ? (f(), W(tr(a(n).modal.type), { key: 0 })) : P("", !0)
          ]),
          _: 1
        }),
        Y(u1)
      ], 2)
    ], 512));
  }
}, Rf = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Cf);
  }
};
export {
  Rf as default
};
