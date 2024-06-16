var zo = Object.defineProperty;
var Po = (t, e, s) => e in t ? zo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var mn = (t, e, s) => Po(t, typeof e != "symbol" ? e + "" : e, s);
import { reactive as Ot, watch as Je, ref as M, shallowRef as jo, onMounted as Ce, onUnmounted as qs, onUpdated as Rn, nextTick as ft, computed as Ze, inject as ae, openBlock as f, createElementBlock as g, withKeys as $t, unref as a, createElementVNode as o, withModifiers as rt, renderSlot as Dt, normalizeClass as me, toDisplayString as _, createBlock as X, withCtx as se, Fragment as he, renderList as $e, createCommentVNode as P, withDirectives as pe, vModelCheckbox as jt, createTextVNode as Q, createVNode as W, vModelSelect as Ss, isRef as Fn, vModelText as St, onBeforeUnmount as In, customRef as qo, vShow as ze, TransitionGroup as Go, normalizeStyle as os, mergeModels as Ko, useModel as Wo, resolveComponent as Yo, provide as Xo, Transition as Jo, resolveDynamicComponent as Qo } from "vue";
import Zo from "mitt";
import er from "dragselect";
import tr from "@uppy/core";
import sr from "@uppy/xhr-upload";
import nr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import or from "cropperjs";
var Bn;
const _s = (Bn = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Bn.getAttribute("content");
class rr {
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
    l !== "get" && (i instanceof FormData ? (u = i, s.body != null && Object.entries(this.config.body).forEach(([m, p]) => {
      u.append(m, p);
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
function ar(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new rr(e);
}
function lr(t) {
  let e = localStorage.getItem(t + "_storage");
  const s = Ot(JSON.parse(e ?? "{}"));
  Je(s, r);
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
async function ir(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function cr(t, e, s, r) {
  const { getStore: n, setStore: c } = t, i = M({}), d = M(n("locale", e)), l = (m, p = e) => {
    ir(m, r).then((v) => {
      i.value = v, c("locale", m), d.value = m, c("translations", v), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + m }), s.emit("vf-language-saved"));
    }).catch((v) => {
      p ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !n("locale") && !r.length ? l(e) : i.value = n("translations");
  const u = (m, ...p) => p.length ? u(m = m.replace("%s", p.shift()), ...p) : m;
  function h(m, ...p) {
    return i.value && i.value.hasOwnProperty(m) ? u(i.value[m], ...p) : u(m, ...p);
  }
  return { t: h, changeLocale: l, locale: d };
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
}, dr = Object.values(ve), ur = "2.5.4";
function Nn(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1024, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B");
}
function Un(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1e3, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "B" : "B");
}
function mr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const st = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function fr(t, e) {
  const s = M(st.SYSTEM), r = M(st.LIGHT);
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
function hr() {
  const t = jo(null), e = M(!1), s = M();
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
    const p = c, v = h, x = m || (r ? !r(p, v) : p !== v);
    return (x || n) && (c = v, i = p), [c, x, i];
  };
  return [e ? (h) => d(e(c, i), h) : d, (h) => [c, !!h, i]];
}, zn = typeof window < "u" && typeof document < "u", Ae = zn ? window : {}, Pn = Math.max, vr = Math.min, Cs = Math.round, Jt = Math.abs, fn = Math.sign, jn = Ae.cancelAnimationFrame, Gs = Ae.requestAnimationFrame, Qt = Ae.setTimeout, Es = Ae.clearTimeout, rs = (t) => typeof Ae[t] < "u" ? Ae[t] : void 0, pr = rs("MutationObserver"), hn = rs("IntersectionObserver"), Zt = rs("ResizeObserver"), Ts = rs("ScrollTimeline"), qn = zn && Node.ELEMENT_NODE, { toString: Of, hasOwnProperty: xs } = Object.prototype, as = (t) => t === void 0, Ks = (t) => t === null, je = (t) => typeof t == "number", ls = (t) => typeof t == "string", Gn = (t) => typeof t == "boolean", Fe = (t) => typeof t == "function", qe = (t) => Array.isArray(t), Lt = (t) => typeof t == "object" && !qe(t) && !Ks(t), is = (t) => {
  const e = !!t && t.length, s = je(e) && e > -1 && e % 1 == 0;
  return qe(t) || !Fe(t) && s ? e > 0 && Lt(t) ? e - 1 in t : !0 : !1;
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
  return t ? e ? t instanceof e : t.nodeType === qn : !1;
}, cs = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === qn : !1;
};
function ce(t, e) {
  if (is(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else t && ce(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const Ws = (t, e) => t.indexOf(e) >= 0, Qe = (t, e) => t.concat(e), xe = (t, e, s) => (!ls(e) && is(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), dt = (t) => Array.from(t || []), Kn = (t) => qe(t) ? t : [t], Ms = (t) => !!t && !t.length, vn = (t) => dt(new Set(t)), Ie = (t, e, s) => {
  ce(t, (n) => n && n.apply(void 0, e || [])), !s && (t.length = 0);
}, Wn = "paddingTop", Yn = "paddingRight", Xn = "paddingLeft", Jn = "paddingBottom", Qn = "marginLeft", Zn = "marginRight", eo = "marginBottom", gr = "overflowX", _r = "overflowY", bt = "width", yt = "height", ot = "visible", ut = "hidden", wt = "scroll", xr = (t) => {
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
}, to = (t, e) => ds(t, e, ["w", "h"]), Wt = (t, e) => ds(t, e, ["x", "y"]), br = (t, e) => ds(t, e, ["t", "r", "b", "l"]), at = () => {
}, J = (t, ...e) => t.bind(0, ...e), mt = (t) => {
  let e;
  const s = t ? Qt : Gs, r = t ? Es : jn;
  return [(n) => {
    r(e), e = s(() => n(), Fe(t) ? t() : t);
  }, () => r(e)];
}, As = (t, e) => {
  const { _: s, p: r, v: n, m: c } = e || {};
  let i, d, l, u, h = at;
  const m = function(b) {
    h(), Es(i), u = i = d = void 0, h = at, t.apply(this, b);
  }, p = (y) => c && d ? c(d, y) : y, v = () => {
    h !== at && m(p(l) || l);
  }, x = function() {
    const b = dt(arguments), A = Fe(s) ? s() : s;
    if (je(A) && A >= 0) {
      const U = Fe(r) ? r() : r, B = je(U) && U >= 0, D = A > 0 ? Qt : Gs, L = A > 0 ? Es : jn, E = p(b) || b, O = m.bind(0, E);
      let T;
      h(), n && !u ? (O(), u = !0, T = D(() => u = void 0, A)) : (T = D(O, A), B && !i && (i = Qt(v, U))), h = () => L(T), d = l = E;
    } else
      m(b);
  };
  return x.S = v, x;
}, so = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], re = (t, e, s, r, n, c, i) => {
  const d = [e, s, r, n, c, i];
  return (typeof t != "object" || Ks(t)) && !Fe(t) && (t = {}), ce(d, (l) => {
    ce(l, (u, h) => {
      const m = l[h];
      if (t === m)
        return !0;
      const p = qe(m);
      if (m && es(m)) {
        const v = t[h];
        let x = v;
        p && !qe(v) ? x = [] : !p && !es(v) && (x = {}), t[h] = re(x, m);
      } else
        t[h] = p ? m.slice() : m;
    });
  }), t;
}, no = (t, e) => ce(re({}, t), (s, r, n) => {
  s === void 0 ? delete n[r] : s && es(s) && (n[r] = no(s));
}), Ys = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ds = (t, e, s) => Pn(t, vr(e, s)), ht = (t) => dt(new Set((qe(t) ? t : (t || "").split(" ")).filter((e) => e))), Xs = (t, e) => t && t.getAttribute(e), pn = (t, e) => t && t.hasAttribute(e), Xe = (t, e, s) => {
  ce(ht(e), (r) => {
    t && t.setAttribute(r, String(s || ""));
  });
}, Ue = (t, e) => {
  ce(ht(e), (s) => t && t.removeAttribute(s));
}, us = (t, e) => {
  const s = ht(Xs(t, e)), r = J(Xe, t, e), n = (c, i) => {
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
}, oo = (t, e, s) => (us(t, e).O(s), J(Js, t, e, s)), Js = (t, e, s) => (us(t, e).$(s), J(oo, t, e, s)), Ls = (t, e, s, r) => (r ? Js : oo)(t, e, s), Qs = (t, e, s) => us(t, e).C(s), ro = (t) => us(t, "class"), ao = (t, e) => {
  ro(t).O(e);
}, Zs = (t, e) => (ro(t).$(e), J(ao, t, e)), lo = (t, e) => {
  const s = [], r = e ? cs(e) && e : document;
  return r ? xe(s, r.querySelectorAll(t)) : s;
}, yr = (t, e) => {
  const s = e ? cs(e) && e : document;
  return s ? s.querySelector(t) : null;
}, ss = (t, e) => cs(t) ? t.matches(e) : !1, io = (t) => ss(t, "body"), Vs = (t) => t ? dt(t.childNodes) : [], kt = (t) => t && t.parentElement, _t = (t, e) => cs(t) && t.closest(e), Os = (t) => document.activeElement, wr = (t, e, s) => {
  const r = _t(t, e), n = t && yr(s, r), c = _t(n, e) === r;
  return r && n ? r === t || n === t || c && _t(_t(t, s), e) !== r : !1;
}, it = (t) => {
  if (is(t))
    ce(dt(t), (e) => it(e));
  else if (t) {
    const e = kt(t);
    e && e.removeChild(t);
  }
}, co = (t, e, s) => {
  if (s && t) {
    let r = e, n;
    return is(s) ? (n = document.createDocumentFragment(), ce(s, (c) => {
      c === r && (r = c.previousSibling), n.appendChild(c);
    })) : n = s, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(n, r || null), () => it(s);
  }
  return at;
}, Oe = (t, e) => co(t, null, e), gn = (t, e) => co(kt(t), t && t.nextSibling, e), xt = (t) => {
  const e = document.createElement("div");
  return Xe(e, "class", t), e;
}, uo = (t) => {
  const e = xt();
  return e.innerHTML = t.trim(), ce(Vs(e), (s) => it(s));
}, kr = /^--/, _n = (t, e) => t.getPropertyValue(e) || t[e] || "", en = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, qt = (t) => en(parseFloat(t || "")), xn = (t) => `${(en(t) * 100).toFixed(3)}%`, Hs = (t) => `${en(t)}px`;
function Vt(t, e) {
  t && e && ce(e, (s, r) => {
    try {
      const n = t.style, c = je(s) ? Hs(s) : (s || "") + "";
      kr.test(r) ? n.setProperty(r, c) : n[r] = c;
    } catch {
    }
  });
}
function vt(t, e, s) {
  const r = ls(e);
  let n = r ? "" : {};
  if (t) {
    const c = Ae.getComputedStyle(t, s) || t.style;
    n = r ? _n(c, e) : dt(e).reduce((i, d) => (i[d] = _n(c, d), i), n);
  }
  return n;
}
const bn = (t, e, s) => {
  const r = e ? `${e}-` : "", n = s ? `-${s}` : "", c = `${r}top${n}`, i = `${r}right${n}`, d = `${r}bottom${n}`, l = `${r}left${n}`, u = vt(t, [c, i, d, l]);
  return {
    t: qt(u[c]),
    r: qt(u[i]),
    b: qt(u[d]),
    l: qt(u[l])
  };
}, bs = (t, e) => `translate${Lt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, $r = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Sr = {
  w: 0,
  h: 0
}, ms = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Sr, Cr = (t) => ms("inner", t || Ae), Mt = J(ms, "offset"), mo = J(ms, "client"), Bs = J(ms, "scroll"), tn = (t) => {
  const e = parseFloat(vt(t, bt)) || 0, s = parseFloat(vt(t, yt)) || 0;
  return {
    w: e - Cs(e),
    h: s - Cs(s)
  };
}, At = (t) => t.getBoundingClientRect(), Er = (t) => !!t && $r(t), Rs = (t) => !!(t && (t[yt] || t[bt])), fo = (t, e) => {
  const s = Rs(t);
  return !Rs(e) && s;
}, yn = (t, e, s, r) => {
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
      yn(t, u, h, i), s && s(m);
    } : s;
    return t && t.addEventListener(u, h, l), J(yn, t, u, h, i);
  }));
}, ho = (t) => t.stopPropagation(), Fs = (t) => t.preventDefault(), vo = (t) => ho(t) || Fs(t), Pe = (t, e) => {
  const { x: s, y: r } = je(e) ? {
    x: e,
    y: e
  } : e || {};
  je(s) && (t.scrollLeft = s), je(r) && (t.scrollTop = r);
}, He = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), po = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), Tr = (t, e) => {
  const { T: s, D: r } = t, { w: n, h: c } = e, i = (m, p, v) => {
    let x = fn(m) * v, y = fn(p) * v;
    if (x === y) {
      const b = Jt(m), A = Jt(p);
      y = b > A ? 0 : y, x = b < A ? 0 : x;
    }
    return x = x === y ? 0 : x, [x + 0, y + 0];
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
  ce(Kn(e), t);
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
    Gn(i) && i && s();
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
}), Cn = (t, e) => t ? `${e}`.split(".").reduce((s, r) => s && so(s, r) ? s[r] : void 0, t) : void 0, Mr = {
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
}, go = (t, e) => {
  const s = {}, r = Qe(et(e), et(t));
  return ce(r, (n) => {
    const c = t[n], i = e[n];
    if (Lt(c) && Lt(i))
      re(s[n] = {}, go(c, i)), Ys(s[n]) && delete s[n];
    else if (so(e, n) && i !== c) {
      let d = !0;
      if (qe(c) || qe(i))
        try {
          Sn(c) === Sn(i) && (d = !1);
        } catch {
        }
      d && (s[n] = i);
    }
  }), s;
}, En = (t, e, s) => (r) => [Cn(t, r), s || Cn(e, r) !== void 0], Ct = "data-overlayscrollbars", Yt = "os-environment", Gt = `${Yt}-scrollbar-hidden`, ys = `${Ct}-initialize`, Xt = "noClipping", Tn = `${Ct}-body`, lt = Ct, Ar = "host", nt = `${Ct}-viewport`, Dr = gr, Lr = _r, Vr = "arrange", _o = "measuring", xo = "scrollbarHidden", Or = "scrollbarPressed", Hr = "noContent", Us = `${Ct}-padding`, Mn = `${Ct}-content`, sn = "os-size-observer", Br = `${sn}-appear`, Rr = `${sn}-listener`, Fr = "os-trinsic-observer", Ir = "os-theme-none", Be = "os-scrollbar", Nr = `${Be}-rtl`, Ur = `${Be}-horizontal`, zr = `${Be}-vertical`, bo = `${Be}-track`, nn = `${Be}-handle`, Pr = `${Be}-visible`, jr = `${Be}-cornerless`, An = `${Be}-interaction`, Dn = `${Be}-unusable`, zs = `${Be}-auto-hide`, Ln = `${zs}-hidden`, Vn = `${Be}-wheel`, qr = `${bo}-interactive`, Gr = `${nn}-interactive`;
let ws;
const Kr = () => {
  const t = (k, U, B) => {
    Oe(document.body, k), Oe(document.body, k);
    const D = mo(k), L = Mt(k), V = tn(U);
    return B && it(k), {
      x: L.h - D.h + V.h,
      y: L.w - D.w + V.w
    };
  }, e = (k) => {
    let U = !1;
    const B = Zs(k, Gt);
    try {
      U = vt(k, "scrollbar-width") === "none" || vt(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return B(), U;
  }, s = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, n = uo(`<div class="${Yt}"><div></div><style>${s}</style></div>`)[0], c = n.firstChild, [i, , d] = Ns(), [l, u] = Ve({
    o: t(n, c),
    i: Wt
  }, J(t, n, c, !0)), [h] = u(), m = e(n), p = {
    x: h.x === 0,
    y: h.y === 0
  }, v = {
    elements: {
      host: null,
      padding: !m,
      viewport: (k) => m && io(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, x = re({}, Mr), y = J(re, {}, x), b = J(re, {}, v), A = {
    k: h,
    M: p,
    R: m,
    V: !!Ts,
    L: J(i, "r"),
    P: b,
    U: (k) => re(v, k) && b(),
    N: y,
    q: (k) => re(x, k) && y(),
    B: re({}, v),
    F: re({}, x)
  };
  if (Ue(n, "style"), it(n), fe(Ae, "resize", () => {
    d("r", []);
  }), Fe(Ae.matchMedia) && !m && (!p.x || !p.y)) {
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
}, Ge = () => (ws || (ws = Kr()), ws), yo = (t, e) => Fe(e) ? e.apply(0, t) : e, Wr = (t, e, s, r) => {
  const n = as(r) ? s : r;
  return yo(t, n) || e.apply(0, t);
}, wo = (t, e, s, r) => {
  const n = as(r) ? s : r, c = yo(t, n);
  return !!c && (ts(c) ? c : e.apply(0, t));
}, Yr = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { M: n, R: c, P: i } = Ge(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = s ?? d, h = as(r) ? l : r, m = (n.x || n.y) && u, p = t && (Ks(h) ? !c : h);
  return !!m || !!p;
}, on = /* @__PURE__ */ new WeakMap(), Xr = (t, e) => {
  on.set(t, e);
}, Jr = (t) => {
  on.delete(t);
}, ko = (t) => on.get(t), Qr = (t, e, s) => {
  let r = !1;
  const n = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, i = (d) => {
    if (n && s) {
      const l = s.map((u) => {
        const [h, m] = u || [];
        return [m && h ? (d || lo)(h, t) : [], m];
      });
      ce(l, (u) => ce(u[0], (h) => {
        const m = u[1], p = n.get(h) || [];
        if (t.contains(h) && m) {
          const x = fe(h, m, (y) => {
            r ? (x(), n.delete(h)) : e(y);
          });
          n.set(h, xe(p, x));
        } else
          Ie(p), n.delete(h);
      }));
    }
  };
  return i(), [c, i];
}, On = (t, e, s, r) => {
  let n = !1;
  const { j: c, X: i, Y: d, W: l, J: u, K: h } = r || {}, m = As(() => n && s(!0), {
    _: 33,
    p: 99
  }), [p, v] = Qr(t, m, d), x = c || [], y = i || [], b = Qe(x, y), A = (U, B) => {
    if (!Ms(B)) {
      const D = u || at, L = h || at, V = [], E = [];
      let O = !1, T = !1;
      if (ce(B, (S) => {
        const { attributeName: H, target: $, type: w, oldValue: I, addedNodes: R, removedNodes: ne } = S, de = w === "attributes", le = w === "childList", F = t === $, ee = de && H, te = ee && Xs($, H || ""), Y = ls(te) ? te : null, ue = ee && I !== Y, z = Ws(y, H) && ue;
        if (e && (le || !F)) {
          const q = de && ue, j = q && l && ss($, l), N = (j ? !D($, H, I, Y) : !de || q) && !L(S, !!j, t, r);
          ce(R, (G) => xe(V, G)), ce(ne, (G) => xe(V, G)), T = T || N;
        }
        !e && F && ue && !D($, H, I, Y) && (xe(E, H), O = O || z);
      }), v((S) => vn(V).reduce((H, $) => (xe(H, lo(S, $)), ss($, S) ? xe(H, $) : H), [])), e)
        return !U && T && s(!1), [!1];
      if (!Ms(E) || O) {
        const S = [vn(E), O];
        return !U && s.apply(0, S), S;
      }
    }
  }, k = new pr(J(A, !1));
  return [() => (k.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: b,
    subtree: e,
    childList: e,
    characterData: e
  }), n = !0, () => {
    n && (p(), k.disconnect(), n = !1);
  }), () => {
    if (n)
      return m.S(), A(!0, k.takeRecords());
  }];
}, $o = {}, So = {}, Zr = (t) => {
  ce(t, (e) => ce(e, (s, r) => {
    $o[r] = e[r];
  }));
}, Co = (t, e, s) => et(t).map((r) => {
  const { static: n, instance: c } = t[r], [i, d, l] = s || [], u = s ? c : n;
  if (u) {
    const h = s ? u(i, d, e) : u(e);
    return (l || So)[r] = h;
  }
}), Ht = (t) => So[t], ea = "__osOptionsValidationPlugin", ta = "__osSizeObserverPlugin", sa = (t, e) => {
  const { M: s } = e, [r, n] = t("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, n];
}, ns = (t) => t.indexOf(ot) === 0, na = (t, e) => {
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
}, Eo = "__osScrollbarsHidingPlugin", oa = "__osClickScrollPlugin", To = (t, e, s) => {
  const { dt: r } = s || {}, n = Ht(ta), [c] = Ve({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = uo(`<div class="${sn}"><div class="${Rr}"></div></div>`)[0], u = l.firstChild, h = (m) => {
      const p = m instanceof ResizeObserverEntry;
      let v = !1, x = !1;
      if (p) {
        const [y, , b] = c(m.contentRect), A = Rs(y);
        x = fo(y, b), v = !x && !A;
      } else
        x = m === !0;
      v || e({
        ft: !0,
        dt: x
      });
    };
    if (Zt) {
      const m = new Zt((p) => h(p.pop()));
      m.observe(u), xe(i, () => {
        m.disconnect();
      });
    } else if (n) {
      const [m, p] = n(u, h, r);
      xe(i, Qe([Zs(l, Br), fe(l, "animationstart", m)], p));
    } else
      return at;
    return J(Ie, xe(i, Oe(t, l)));
  };
}, ra = (t, e) => {
  let s;
  const r = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, n = xt(Fr), [c] = Ve({
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
      xe(l, To(n, u)()), u();
    }
    return J(Ie, xe(l, Oe(t, n)));
  }, () => s && d(!0, s.takeRecords())];
}, aa = (t, e, s, r) => {
  let n, c, i, d, l, u;
  const h = `[${lt}]`, m = `[${nt}]`, p = [], v = ["wrap", "cols", "rows"], x = ["id", "class", "style", "open"], { vt: y, ht: b, ot: A, gt: k, bt: U, wt: B, nt: D, yt: L, St: V, Ot: E } = t, O = (C) => vt(C, "direction") === "rtl", T = {
    $t: !1,
    ct: O(y)
  }, S = Ge(), H = Ht(Eo), [$] = Ve({
    i: to,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = H && H.tt(t, e, T, S, s).ut, G = !(L && D) && Qs(b, lt, Xt), K = !D && V(Vr), Z = K && He(k), ie = E(_o, G), ye = K && C && C()[0], Se = Bs(A), oe = tn(A);
    return ye && ye(), Pe(k, Z), G && ie(), {
      w: Se.w + oe.w,
      h: Se.h + oe.h
    };
  }), w = B ? v : Qe(x, v), I = As(r, {
    _: () => n,
    p: () => c,
    m(C, N) {
      const [G] = C, [K] = N;
      return [Qe(et(G), et(K)).reduce((Z, ie) => (Z[ie] = G[ie] || K[ie], Z), {})];
    }
  }), R = (C) => {
    const N = O(y);
    re(C, {
      Ct: u !== N
    }), re(T, {
      ct: N
    }), u = N;
  }, ne = (C, N) => {
    const [G, K] = C, Z = {
      xt: K
    };
    return re(T, {
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
  }, [ee, te] = U ? ra(b, ne) : [], Y = !D && To(b, de, {
    dt: !0
  }), [ue, z] = On(b, !1, F, {
    X: x,
    j: Qe(x, p)
  }), q = D && Zt && new Zt((C) => {
    const N = C[C.length - 1].contentRect;
    de({
      ft: !0,
      dt: fo(N, l)
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
    q && q.observe(b);
    const C = Y && Y(), N = ee && ee(), G = ue(), K = S.L((Z) => {
      Z ? I({
        zt: Z
      }) : j();
    });
    return () => {
      q && q.disconnect(), C && C(), N && N(), d && d(), G(), K();
    };
  }, ({ It: C, At: N, Tt: G }) => {
    const K = {}, [Z] = C("update.ignoreMutation"), [ie, ye] = C("update.attributes"), [Se, oe] = C("update.elementEvents"), [we, Ee] = C("update.debounce"), Re = oe || ye, ke = N || G, De = (be) => Fe(Z) && Z(be);
    if (Re) {
      i && i(), d && d();
      const [be, ge] = On(U || A, !0, le, {
        j: Qe(w, ie || []),
        Y: Se,
        W: h,
        K: (Te, _e) => {
          const { target: Me, attributeName: Le } = Te;
          return (!_e && Le && !D ? wr(Me, h, m) : !1) || !!_t(Me, `.${Be}`) || !!De(Te);
        }
      });
      d = be(), i = ge;
    }
    if (Ee)
      if (I.S(), qe(we)) {
        const be = we[0], ge = we[1];
        n = je(be) && be, c = je(ge) && ge;
      } else je(we) ? (n = we, c = !1) : (n = !1, c = !1);
    if (ke) {
      const be = z(), ge = te && te(), Te = i && i();
      be && re(K, F(be[0], be[1], ke)), ge && re(K, ne(ge[0], ke)), Te && re(K, le(Te[0], ke));
    }
    return R(K), K;
  }, T];
}, la = (t, e, s, r) => {
  const { P: n } = Ge(), { scrollbars: c } = n(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: h, gt: m, yt: p, nt: v } = e, { scrollbars: x } = h ? {} : t, { slot: y } = x || {}, b = /* @__PURE__ */ new Map(), A = (z) => Ts && new Ts({
    source: m,
    axis: z
  }), k = {
    x: A("x"),
    y: A("y")
  }, U = wo([d, l, u], () => v && p ? d : l, i, y), B = (z, q) => {
    if (q) {
      const Z = z ? bt : yt, { kt: ie, Mt: ye } = q, Se = At(ye)[Z], oe = At(ie)[Z];
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
    b.forEach((q, j) => {
      (z ? Ws(Kn(z), j) : !0) && (ce(q || [], (N) => {
        N && N.cancel();
      }), b.delete(j));
    });
  }, E = (z, q, j, C) => {
    const N = b.get(z) || [], G = N.find((K) => K && K.timeline === q);
    G ? G.effect = new KeyframeEffect(z, j, {
      composite: C
    }) : b.set(z, Qe(N, [z.animate(j, {
      timeline: q,
      composite: C
    })]));
  }, O = (z, q, j) => {
    const C = j ? Zs : ao;
    ce(z, (N) => {
      C(N.Lt, q);
    });
  }, T = (z, q) => {
    ce(z, (j) => {
      const [C, N] = q(j);
      Vt(C, N);
    });
  }, S = (z, q) => {
    T(z, (j) => {
      const { Mt: C } = j;
      return [C, {
        [q ? bt : yt]: xn(B(q))
      }];
    });
  }, H = (z, q) => {
    const { Pt: j } = s, C = q ? "x" : "y", N = k[C], G = wn(j)[C], K = (Z, ie) => bs(xn(D(Z, G ? ie : 1 - ie, q)), q);
    N ? ce(z, (Z) => {
      const { Mt: ie } = Z;
      E(ie, N, L({
        transform: [0, 1].map((ye) => K(Z, ye))
      }));
    }) : T(z, (Z) => [Z.Mt, {
      transform: K(Z, kn(j, He(m))[C])
    }]);
  }, $ = (z) => v && !p && kt(z) === u, w = [], I = [], R = [], ne = (z, q, j) => {
    const C = Gn(j), N = C ? j : !0, G = C ? !j : !0;
    N && O(I, z, q), G && O(R, z, q);
  }, de = () => {
    S(I, !0), S(R);
  }, le = () => {
    H(I, !0), H(R);
  }, F = () => {
    if (v) {
      const { Rt: z, Pt: q } = s, j = wn(q), C = 0.5;
      if (k.x && k.y)
        ce(Qe(R, I), ({ Lt: N }) => {
          if ($(N)) {
            const G = (K) => E(N, k[K], L({
              transform: [0, j[K] ? 1 : -1].map((Z) => bs(Hs(Z * (z[K] - C)), K === "x"))
            }), "add");
            G("x"), G("y");
          } else
            V(N);
        });
      else {
        const N = kn(q, He(m)), G = (K) => {
          const { Lt: Z } = K, ie = $(Z) && Z, ye = (Se, oe, we) => {
            const Ee = oe * Se;
            return Hs(we ? Ee : -Ee);
          };
          return [ie, ie && {
            transform: bs({
              x: ye(N.x, z.x, j.x),
              y: ye(N.y, z.y, j.y)
            })
          }];
        };
        T(I, G), T(R, G);
      }
    }
  }, ee = (z) => {
    const j = xt(`${Be} ${z ? Ur : zr}`), C = xt(bo), N = xt(nn), G = {
      Lt: j,
      kt: C,
      Mt: N
    };
    return xe(z ? I : R, G), xe(w, [Oe(j, C), Oe(C, N), J(it, j), V, r(G, ne, H, z)]), G;
  }, te = J(ee, !0), Y = J(ee, !1), ue = () => (Oe(U, I[0].Lt), Oe(U, R[0].Lt), J(Ie, w));
  return te(), Y(), [{
    Ut: de,
    Nt: le,
    qt: F,
    Bt: ne,
    Ft: {
      V: k.x,
      jt: I,
      Xt: te,
      Yt: J(T, I)
    },
    Wt: {
      V: k.y,
      jt: R,
      Xt: Y,
      Yt: J(T, R)
    }
  }, ue];
}, ia = (t, e, s, r) => (n, c, i, d) => {
  const { ht: l, ot: u, nt: h, gt: m, Jt: p, Ot: v } = e, { Lt: x, kt: y, Mt: b } = n, [A, k] = mt(333), [U, B] = mt(444), [D, L] = mt(), V = J(i, [n], d), E = ($) => {
    Fe(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: $.x,
      top: $.y
    });
  }, O = d ? bt : yt, T = () => {
    const $ = "pointerup pointercancel lostpointercapture", w = `client${d ? "X" : "Y"}`, I = d ? "left" : "top", R = d ? "w" : "h", ne = d ? "x" : "y", de = (le, F) => (ee) => {
      const { Rt: te } = s, Y = Mt(y)[R] - Mt(b)[R], z = F * ee / Y * te[ne];
      Pe(m, {
        [ne]: le + z
      });
    };
    return fe(y, "pointerdown", (le) => {
      const F = _t(le.target, `.${nn}`) === b, ee = F ? b : y, te = t.scrollbars, { button: Y, isPrimary: ue, pointerType: z } = le, { pointers: q } = te;
      if (Y === 0 && ue && te[F ? "dragScroll" : "clickScroll"] && (q || []).includes(z)) {
        B();
        const C = !F && le.shiftKey, N = J(At, b), G = J(At, y), K = (_e, Me) => (_e || N())[I] - (Me || G())[I], Z = Cs(At(m)[O]) / Mt(m)[R] || 1, ie = de(He(m)[ne], 1 / Z), ye = le[w], Se = N(), oe = G(), we = Se[O], Ee = K(Se, oe) + we / 2, Re = ye - oe[I], ke = F ? 0 : Re - Ee, De = (_e) => {
          Ie(Te), ee.releasePointerCapture(_e.pointerId);
        }, be = () => v(Or, !0), ge = be(), Te = [() => {
          const _e = He(m);
          ge();
          const Me = He(m), Le = {
            x: Me.x - _e.x,
            y: Me.y - _e.y
          };
          (Jt(Le.x) > 3 || Jt(Le.y) > 3) && (be(), Pe(m, _e), E(Le), U(ge));
        }, fe(p, $, De), fe(p, "selectstart", (_e) => Fs(_e), {
          H: !1
        }), fe(y, $, De), fe(y, "pointermove", (_e) => {
          const Me = _e[w] - ye;
          (F || C) && ie(ke + Me);
        })];
        if (ee.setPointerCapture(le.pointerId), C)
          ie(ke);
        else if (!F) {
          const _e = Ht(oa);
          _e && xe(Te, _e(ie, K, ke, we, Re));
        }
      }
    });
  };
  let S = !0;
  const H = ($) => $.propertyName.indexOf(O) > -1;
  return J(Ie, [fe(b, "pointermove pointerleave", r), fe(x, "pointerenter", () => {
    c(An, !0);
  }), fe(x, "pointerleave pointercancel", () => {
    c(An, !1);
  }), !h && fe(x, "mousedown", () => {
    const $ = Os();
    (pn($, nt) || pn($, lt) || $ === document.body) && Qt(J(Is, u), 25);
  }), fe(x, "wheel", ($) => {
    const { deltaX: w, deltaY: I, deltaMode: R } = $;
    S && R === 0 && kt(x) === l && E({
      x: w,
      y: I
    }), S = !1, c(Vn, !0), A(() => {
      S = !0, c(Vn);
    }), Fs($);
  }, {
    H: !1,
    I: !0
  }), fe(b, "transitionstart", ($) => {
    if (H($)) {
      const w = () => {
        V(), D(w);
      };
      w();
    }
  }), fe(b, "transitionend transitioncancel", ($) => {
    H($) && (L(), V());
  }), fe(x, "pointerdown", J(fe, p, "click", vo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), T(), k, B, L]);
}, ca = (t, e, s, r, n, c) => {
  let i, d, l, u, h, m = at, p = 0;
  const v = (F) => F.pointerType === "mouse", [x, y] = mt(), [b, A] = mt(100), [k, U] = mt(100), [B, D] = mt(() => p), [L, V] = la(t, n, r, ia(e, n, r, (F) => v(F) && R())), { ht: E, Kt: O, yt: T } = n, { Bt: S, Ut: H, Nt: $, qt: w } = L, I = (F, ee) => {
    if (D(), F)
      S(Ln);
    else {
      const te = J(S, Ln, !0);
      p > 0 && !ee ? B(te) : te();
    }
  }, R = () => {
    (l ? !i : !u) && (I(!0), b(() => {
      I(!1);
    }));
  }, ne = (F) => {
    S(zs, F, !0), S(zs, F, !1);
  }, de = (F) => {
    v(F) && (i = l, l && I(!0));
  }, le = [D, A, U, y, () => m(), fe(E, "pointerover", de, {
    A: !0
  }), fe(E, "pointerenter", de), fe(E, "pointerleave", (F) => {
    v(F) && (i = !1, l && I(!1));
  }), fe(E, "pointermove", (F) => {
    v(F) && d && R();
  }), fe(O, "scroll", (F) => {
    x(() => {
      $(), R();
    }), c(F), w();
  })];
  return [() => J(Ie, xe(le, V())), ({ It: F, Tt: ee, Gt: te, Qt: Y }) => {
    const { Zt: ue, tn: z, nn: q, sn: j } = Y || {}, { Ct: C, dt: N } = te || {}, { ct: G } = s, { M: K } = Ge(), { G: Z, en: ie } = r, [ye, Se] = F("showNativeOverlaidScrollbars"), [oe, we] = F("scrollbars.theme"), [Ee, Re] = F("scrollbars.visibility"), [ke, De] = F("scrollbars.autoHide"), [be, ge] = F("scrollbars.autoHideSuspend"), [Te] = F("scrollbars.autoHideDelay"), [_e, Me] = F("scrollbars.dragScroll"), [Le, pt] = F("scrollbars.clickScroll"), [Bt, hs] = F("overflow"), vs = N && !ee, ps = ie.x || ie.y, Ne = ue || z || j || C || ee, gs = q || Re || hs, Rt = ye && K.x && K.y, Ft = (tt, Et, Tt) => {
      const It = tt.includes(wt) && (Ee === ot || Ee === "auto" && Et === wt);
      return S(Pr, It, Tt), It;
    };
    if (p = Te, vs && (be && ps ? (ne(!1), m(), k(() => {
      m = fe(O, "scroll", J(ne, !0), {
        A: !0
      });
    })) : ne(!0)), Se && S(Ir, Rt), we && (S(h), S(oe, !0), h = oe), ge && !be && ne(!0), De && (d = ke === "move", l = ke === "leave", u = ke === "never", I(u, !0)), Me && S(Gr, _e), pt && S(qr, Le), gs) {
      const tt = Ft(Bt.x, Z.x, !0), Et = Ft(Bt.y, Z.y, !1);
      S(jr, !(tt && Et));
    }
    Ne && (H(), $(), w(), S(Dn, !ie.x, !0), S(Dn, !ie.y, !1), S(Nr, G && !T));
  }, {}, L];
}, da = (t) => {
  const e = Ge(), { P: s, R: r } = e, { elements: n } = s(), { host: c, padding: i, viewport: d, content: l } = n, u = ts(t), h = u ? {} : t, { elements: m } = h, { host: p, padding: v, viewport: x, content: y } = m || {}, b = u ? t : h.target, A = io(b), k = ss(b, "textarea"), U = b.ownerDocument, B = U.documentElement, D = () => U.defaultView || Ae, L = J(Wr, [b]), V = J(wo, [b]), E = J(xt, ""), O = J(L, E, d), T = J(V, E, l), S = O(x), H = S === b, $ = H && A, w = !H && T(y), I = !H && S === w, R = $ ? B : S, ne = k ? L(E, c, p) : b, de = $ ? R : ne, le = !H && V(E, i, v), F = !I && w, ee = [F, R, le, de].map((oe) => ts(oe) && !kt(oe) && oe), te = (oe) => oe && Ws(ee, oe), Y = te(R) ? b : R, ue = {
    vt: b,
    ht: de,
    ot: R,
    cn: le,
    bt: F,
    gt: $ ? B : R,
    Kt: $ ? U : R,
    rn: A ? B : Y,
    Jt: U,
    wt: k,
    yt: A,
    Dt: u,
    nt: H,
    ln: D,
    St: (oe) => Qs(R, nt, oe),
    Ot: (oe, we) => Ls(R, nt, oe, we)
  }, { vt: z, ht: q, cn: j, ot: C, bt: N } = ue, G = [() => {
    Ue(q, [lt, ys]), Ue(z, ys), A && Ue(B, [ys, lt]);
  }], K = k && te(q);
  let Z = k ? z : Vs([N, C, j, q, z].find((oe) => oe && !te(oe)));
  const ie = $ ? z : N || C, ye = J(Ie, G);
  return [ue, () => {
    const oe = D(), we = Os(), Ee = (ge) => {
      Oe(kt(ge), Vs(ge)), it(ge);
    }, Re = (ge) => fe(ge, "focusin focusout focus blur", vo, {
      I: !0,
      H: !1
    }), ke = "tabindex", De = Xs(C, ke), be = Re(we);
    return Xe(q, lt, H ? "" : Ar), Xe(j, Us, ""), Xe(C, nt, ""), Xe(N, Mn, ""), H || (Xe(C, ke, De || "-1"), A && Xe(B, Tn, "")), K && (gn(z, q), xe(G, () => {
      gn(q, z), it(q);
    })), Oe(ie, Z), Oe(q, j), Oe(j || q, !H && C), Oe(C, N), xe(G, [be, () => {
      const ge = Os(), Te = te(C), _e = Te && ge === C ? z : ge, Me = Re(_e);
      Ue(j, Us), Ue(N, Mn), Ue(C, nt), A && Ue(B, Tn), De ? Xe(C, ke, De) : Ue(C, ke), te(N) && Ee(N), Te && Ee(C), te(j) && Ee(j), Is(_e), Me();
    }]), r && !H && (Js(C, nt, xo), xe(G, J(Ue, C, nt))), Is(!H && A && we === z && oe.top === oe ? C : we), be(), Z = 0, ye;
  }, ye];
}, ua = ({ bt: t }) => ({ Gt: e, an: s, Tt: r }) => {
  const { xt: n } = e || {}, { $t: c } = s;
  t && (n || r) && Vt(t, {
    [yt]: c && "100%"
  });
}, ma = ({ ht: t, cn: e, ot: s, nt: r }, n) => {
  const [c, i] = Ve({
    i: br,
    o: bn()
  }, J(bn, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: h }) => {
    let [m, p] = i(h);
    const { R: v } = Ge(), { ft: x, Ht: y, Ct: b } = l || {}, { ct: A } = u, [k, U] = d("paddingAbsolute");
    (x || p || (h || y)) && ([m, p] = c(h));
    const D = !r && (U || b || p);
    if (D) {
      const L = !k || !e && !v, V = m.r + m.l, E = m.t + m.b, O = {
        [Zn]: L && !A ? -V : 0,
        [eo]: L ? -E : 0,
        [Qn]: L && A ? -V : 0,
        top: L ? -m.t : 0,
        right: L ? A ? -m.r : "auto" : 0,
        left: L ? A ? "auto" : -m.l : 0,
        [bt]: L && `calc(100% + ${V}px)`
      }, T = {
        [Wn]: L ? m.t : 0,
        [Yn]: L ? m.r : 0,
        [Jn]: L ? m.b : 0,
        [Xn]: L ? m.l : 0
      };
      Vt(e || s, O), Vt(s, T), re(n, {
        cn: m,
        un: !L,
        rt: e ? T : re({}, O, T)
      });
    }
    return {
      _n: D
    };
  };
}, fa = (t, e) => {
  const s = Ge(), { ht: r, cn: n, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: h, ln: m } = t, { R: p } = s, v = u && i, x = J(Pn, 0), y = ["display", "direction", "flexDirection", "writingMode"], b = {
    i: to,
    o: {
      w: 0,
      h: 0
    }
  }, A = {
    i: Wt,
    o: {}
  }, k = (F) => {
    h(_o, !v && F);
  }, U = (F, ee) => {
    const te = Ae.devicePixelRatio % 1 !== 0 ? 1 : 0, Y = {
      w: x(F.w - ee.w),
      h: x(F.h - ee.h)
    };
    return {
      w: Y.w > te ? Y.w : 0,
      h: Y.h > te ? Y.h : 0
    };
  }, [B, D] = Ve(b, J(tn, c)), [L, V] = Ve(b, J(Bs, c)), [E, O] = Ve(b), [T] = Ve(A), [S, H] = Ve(b), [$] = Ve(A), [w] = Ve({
    i: (F, ee) => ds(F, ee, y),
    o: {}
  }, () => Er(c) ? vt(c, y) : {}), [I, R] = Ve({
    i: (F, ee) => Wt(F.T, ee.T) && Wt(F.D, ee.D),
    o: po()
  }, () => {
    k(!0);
    const F = He(l), ee = h(Hr, !0), te = fe(d, wt, (j) => {
      const C = He(l);
      j.isTrusted && C.x === F.x && C.y === F.y && ho(j);
    }, {
      I: !0,
      A: !0
    });
    Pe(l, {
      x: 0,
      y: 0
    }), ee();
    const Y = He(l), ue = Bs(l);
    Pe(l, {
      x: ue.w,
      y: ue.h
    });
    const z = He(l);
    Pe(l, {
      x: z.x - Y.x < 1 && -ue.w,
      y: z.y - Y.y < 1 && -ue.h
    });
    const q = He(l);
    return Pe(l, F), Gs(() => te()), {
      T: Y,
      D: q
    };
  }), ne = Ht(Eo), de = (F, ee) => `${ee ? Dr : Lr}${xr(F)}`, le = (F) => {
    const ee = (Y) => [ot, ut, wt].map((ue) => de(ue, Y)), te = ee(!0).concat(ee()).join(" ");
    h(te), h(et(F).map((Y) => de(F[Y], Y === "x")).join(" "), !0);
  };
  return ({ It: F, Gt: ee, an: te, Tt: Y }, { _n: ue }) => {
    const { ft: z, Ht: q, Ct: j, dt: C, zt: N } = ee || {}, G = ne && ne.tt(t, e, te, s, F), { it: K, ut: Z, _t: ie } = G || {}, [ye, Se] = sa(F, s), [oe, we] = F("overflow"), Ee = ns(oe.x), Re = ns(oe.y), ke = z || ue || q || j || N || Se;
    let De = D(Y), be = V(Y), ge = O(Y), Te = H(Y);
    if (Se && p && h(xo, !ye), ke) {
      Qs(r, lt, Xt) && k(!0);
      const [dn] = Z ? Z() : [], [Nt] = De = B(Y), [Ut] = be = L(Y), zt = mo(c), Pt = v && Cr(m()), Uo = {
        w: x(Ut.w + Nt.w),
        h: x(Ut.h + Nt.h)
      }, un = {
        w: x((Pt ? Pt.w : zt.w + x(zt.w - Ut.w)) + Nt.w),
        h: x((Pt ? Pt.h : zt.h + x(zt.h - Ut.h)) + Nt.h)
      };
      dn && dn(), Te = S(un), ge = E(U(Uo, un), Y);
    }
    const [_e, Me] = Te, [Le, pt] = ge, [Bt, hs] = be, [vs, ps] = De, [Ne, gs] = T({
      x: Le.w > 0,
      y: Le.h > 0
    }), Rt = Ee && Re && (Ne.x || Ne.y) || Ee && Ne.x && !Ne.y || Re && Ne.y && !Ne.x, Ft = ue || j || N || ps || hs || Me || pt || we || Se || ke, tt = na(Ne, oe), [Et, Tt] = $(tt.G), [, It] = w(Y), cn = j || C || It || gs || Y, [Io, No] = cn ? I(Y) : R();
    return Ft && (Tt && le(tt.G), ie && K && Vt(c, ie(tt, te, K(tt, Bt, vs)))), k(!1), Ls(r, lt, Xt, Rt), Ls(n, Us, Xt, Rt), re(e, {
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
      Pt: Tr(Io, Le)
    }), {
      nn: Tt,
      Zt: Me,
      tn: pt,
      sn: No || pt,
      dn: cn
    };
  };
}, ha = (t) => {
  const [e, s, r] = da(t), n = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [Zn]: 0,
      [eo]: 0,
      [Qn]: 0,
      [Wn]: 0,
      [Yn]: 0,
      [Jn]: 0,
      [Xn]: 0
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
    Pt: po()
  }, { vt: c, gt: i, nt: d } = e, { R: l, M: u } = Ge(), h = !l && (u.x || u.y), m = [ua(e), ma(e, n), fa(e, n)];
  return [s, (p) => {
    const v = {}, y = h && He(i);
    return ce(m, (b) => {
      re(v, b(p, v) || {});
    }), Pe(i, y), !d && Pe(c, 0), v;
  }, n, e, r];
}, va = (t, e, s, r, n) => {
  const c = En(e, {}), [i, d, l, u, h] = ha(t), [m, p, v] = aa(u, l, c, (U) => {
    k({}, U);
  }), [x, y, , b] = ca(t, e, v, l, u, n), A = (U) => et(U).some((B) => !!U[B]), k = (U, B) => {
    if (s())
      return !1;
    const { fn: D, Tt: L, At: V, pn: E } = U, O = D || {}, T = !!L, S = {
      It: En(e, O, T),
      fn: O,
      Tt: T
    };
    if (E)
      return y(S), !1;
    const H = B || p(re({}, S, {
      At: V
    })), $ = d(re({}, S, {
      an: v,
      Gt: H
    }));
    y(re({}, S, {
      Gt: H,
      Qt: $
    }));
    const w = A(H), I = A($), R = w || I || !Ys(O) || T;
    return R && r(U, {
      Gt: H,
      Qt: $
    }), R;
  };
  return [() => {
    const { rn: U, gt: B } = u, D = He(U), L = [m(), i(), x()];
    return Pe(B, D), J(Ie, L);
  }, k, () => ({
    vn: v,
    hn: l
  }), {
    gn: u,
    bn: b
  }, h];
}, ct = (t, e, s) => {
  const { N: r } = Ge(), n = ts(t), c = n ? t : t.target, i = ko(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, h = (T) => {
      const S = no(T), H = Ht(ea);
      return H ? H(S, !0) : S;
    }, m = re({}, r(), h(e)), [p, v, x] = Ns(), [y, b, A] = Ns(s), k = (T, S) => {
      A(T, S), x(T, S);
    }, [U, B, D, L, V] = va(t, m, () => d, ({ fn: T, Tt: S }, { Gt: H, Qt: $ }) => {
      const { ft: w, Ct: I, xt: R, Ht: ne, Et: de, dt: le } = H, { Zt: F, tn: ee, nn: te, sn: Y } = $;
      k("updated", [O, {
        updateHints: {
          sizeChanged: !!w,
          directionChanged: !!I,
          heightIntrinsicChanged: !!R,
          overflowEdgeChanged: !!F,
          overflowAmountChanged: !!ee,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!Y,
          contentMutation: !!ne,
          hostMutation: !!de,
          appear: !!le
        },
        changedOptions: T || {},
        force: !!S
      }]);
    }, (T) => k("scroll", [O, T])), E = (T) => {
      Jr(c), Ie(l), d = !0, k("destroyed", [O, T]), v(), b();
    }, O = {
      options(T, S) {
        if (T) {
          const H = S ? r() : {}, $ = go(m, re(H, h(T)));
          Ys($) || (re(m, $), B({
            fn: $
          }));
        }
        return re({}, m);
      },
      on: y,
      off: (T, S) => {
        T && S && b(T, S);
      },
      state() {
        const { vn: T, hn: S } = D(), { ct: H } = T, { Vt: $, Rt: w, G: I, en: R, cn: ne, un: de, Pt: le } = S;
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
        const { vt: T, ht: S, cn: H, ot: $, bt: w, gt: I, Kt: R } = L.gn, { Ft: ne, Wt: de } = L.bn, le = (ee) => {
          const { Mt: te, kt: Y, Lt: ue } = ee;
          return {
            scrollbar: ue,
            track: Y,
            handle: te
          };
        }, F = (ee) => {
          const { jt: te, Xt: Y } = ee, ue = le(te[0]);
          return re({}, ue, {
            clone: () => {
              const z = le(Y());
              return B({
                pn: !0
              }), z;
            }
          });
        };
        return re({}, {
          target: T,
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
      update: (T) => B({
        Tt: T,
        At: !0
      }),
      destroy: J(E, !1),
      plugin: (T) => u[et(T)[0]]
    };
    return xe(l, [V]), Xr(c, O), Co($o, ct, [O, p, u]), Yr(L.gn.yt, !n && t.cancel) ? (E(!0), O) : (xe(l, U()), k("initialized", [O]), O.update(!0), O);
  }
  return i;
};
ct.plugin = (t) => {
  const e = qe(t), s = e ? t : [t], r = s.map((n) => Co(n, ct)[0]);
  return Zr(s), e ? r : r[0];
};
ct.valid = (t) => {
  const e = t && t.elements, s = Fe(e) && e();
  return es(s) && !!ko(s.target);
};
ct.env = () => {
  const { k: t, M: e, R: s, V: r, B: n, F: c, P: i, U: d, N: l, q: u } = Ge();
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
function pa() {
  let t;
  const e = M(null), s = Math.floor(Math.random() * 2 ** 32), r = M(!1), n = M([]), c = () => n.value, i = () => t.getSelection(), d = () => n.value.length, l = () => t.clearSelection(!0), u = M(), h = M(null), m = M(null), p = M(null);
  function v() {
    t = new er({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: B, event: D, isDragging: L }) => {
      if (L)
        t.Interaction._reset(D);
      else {
        r.value = !1;
        const V = e.value.offsetWidth - D.offsetX, E = e.value.offsetHeight - D.offsetY;
        V < 15 && E < 15 && t.Interaction._reset(D), D.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(D);
      }
    }), document.addEventListener("dragleave", (B) => {
      !B.buttons && r.value && (r.value = !1);
    });
  }
  const x = () => ft(() => {
    t.addSelection(
      t.getSelectables()
    ), y();
  }), y = () => {
    n.value = t.getSelection().map((B) => JSON.parse(B.dataset.item)), u.value(n.value);
  }, b = () => ft(() => {
    const B = c().map((D) => D.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((D) => B.includes(JSON.parse(D.dataset.item).path))
    ), y(), k();
  }), A = (B) => {
    u.value = B, t.subscribe("DS:end", ({ items: D, event: L, isDragging: V }) => {
      n.value = D.map((E) => JSON.parse(E.dataset.item)), B(D.map((E) => JSON.parse(E.dataset.item)));
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
    ct(p.value, {
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
    }), v(), k(), new ResizeObserver(k).observe(e.value), e.value.addEventListener("scroll", U), t.subscribe("DS:scroll", ({ isDragging: B }) => B || U());
  }), qs(() => {
    t && t.stop();
  }), Rn(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: m,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: i,
    selectAll: x,
    clearSelection: l,
    refreshSelection: b,
    getCount: d,
    onSelect: A
  };
}
function ga(t, e) {
  const s = M(t), r = M(e), n = M([]), c = M([]), i = M([]), d = M(!1), l = M(5);
  let u = !1, h = !1;
  const m = Ot({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function p() {
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
  function v(k) {
    l.value = k, p();
  }
  function x(k, U) {
    return k.length > U ? [k.slice(-U), k.slice(0, -U)] : [k, []];
  }
  function y(k = null) {
    d.value = k ?? !d.value;
  }
  function b() {
    return n.value && n.value.length && !h;
  }
  const A = Ze(() => {
    var k;
    return ((k = n.value[n.value.length - 2]) == null ? void 0 : k.path) ?? s.value + "://";
  });
  return Ce(() => {
  }), Je(r, p), Ce(p), {
    adapter: s,
    path: r,
    loading: u,
    searchMode: h,
    data: m,
    breadcrumbs: n,
    breadcrumbItems: c,
    limitBreadcrumbItems: v,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: b,
    parentFolderPath: A
  };
}
const _a = (t, e) => {
  const s = lr(t.id), r = Zo(), n = s.getStore("metricUnits", !1), c = fr(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (p) => Array.isArray(p) ? p : dr, h = s.getStore("persist-path", t.persist), m = h ? s.getStore("path", t.path) : t.path;
  return Ot({
    /** 
    * Core properties
    * */
    // app version
    version: ur,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: s,
    // localization object
    i18n: Ze(() => cr(s, d, r, i)),
    // modal state
    modal: hr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Ze(() => pa()),
    // http object
    requester: ar(t.request),
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
    filesize: n ? Un : Nn,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: h,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: ga(l, m)
  });
}, xa = /* @__PURE__ */ o("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), ba = { class: "fixed z-10 inset-0 overflow-hidden" }, ya = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, wa = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), s = ae("ServiceContainer");
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
      xa,
      o("div", ba, [
        o("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = rt((c) => a(s).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            o("div", ya, [
              Dt(r.$slots, "default")
            ]),
            o("div", wa, [
              Dt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, ka = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, n] of e)
    s[r] = n;
  return s;
}, $a = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: s }) {
    const r = ae("ServiceContainer"), n = M(!1), { t: c } = r.i18n;
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
}, Sa = { key: 1 };
function Ca(t, e, s, r, n, c) {
  return f(), g("div", {
    class: me(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    t.$slots.default ? Dt(t.$slots, "default", { key: 0 }) : (f(), g("span", Sa, _(r.t("Saved.")), 1))
  ], 2);
}
const gt = /* @__PURE__ */ ka($a, [["render", Ca]]), Ea = { class: "sm:flex sm:items-start select-none" }, Ta = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ma = { class: "mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full" }, Aa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Da = {
  class: "flex overflow-auto",
  "aria-label": "Tabs"
}, La = ["onClick", "aria-current"], Va = {
  key: 0,
  class: "mt-4"
}, Oa = { class: "m-1 text-sm text-gray-500" }, Ha = {
  href: "https://vuefinder.ozdemir.be",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, Ba = {
  href: "https://github.com/n1crack/vuefinder",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, Ra = {
  key: 1,
  class: "mt-2"
}, Fa = { class: "m-1 text-sm text-gray-500" }, Ia = { class: "mt-3 text-left" }, Na = { class: "space-y-2" }, Ua = { class: "flex relative gap-x-3" }, za = { class: "h-6 items-center" }, Pa = { class: "flex-1 block text-sm" }, ja = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, qa = { class: "flex relative gap-x-3" }, Ga = { class: "h-6 items-center" }, Ka = { class: "flex-1 block text-sm" }, Wa = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Ya = { class: "flex relative gap-x-3" }, Xa = { class: "h-6 items-center" }, Ja = { class: "flex-1 block text-sm" }, Qa = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Za = { class: "flex relative gap-x-3" }, el = { class: "h-6 items-center" }, tl = { class: "flex-1 block text-sm" }, sl = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, nl = { class: "" }, ol = { class: "h-6 items-center" }, rl = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, al = { class: "flex text-sm" }, ll = ["label"], il = ["value"], cl = {
  key: 0,
  class: ""
}, dl = { class: "h-6 items-center" }, ul = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, ml = { class: "flex text-sm" }, fl = ["label"], hl = ["value"], vl = {
  key: 2,
  class: "mt-3"
}, pl = { class: "space-y-2 sm:w-1/2" }, gl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, _l = /* @__PURE__ */ o("kbd", null, "F2", -1), xl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, bl = /* @__PURE__ */ o("kbd", null, "F5", -1), yl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, wl = /* @__PURE__ */ o("kbd", null, "Del", -1), kl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, $l = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Esc")
], -1), Sl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Cl = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "A")
], -1), El = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Tl = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "F")
], -1), Ml = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Al = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "E")
], -1), Dl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ll = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, ",")
], -1), Vl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ol = /* @__PURE__ */ o("div", null, [
  /* @__PURE__ */ o("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ o("kbd", null, "Enter")
], -1), Hl = {
  key: 3,
  class: "mt-3"
}, Bl = { class: "m-1 text-sm text-gray-500" }, Mo = {
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
    ]), u = M("about"), h = async () => {
      r(), location.reload();
    }, m = (B) => {
      e.theme.set(B), e.emitter.emit("vf-theme-saved");
    }, p = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Un : Nn, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, x = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, y = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: b } = ae("VueFinderOptions"), k = Object.fromEntries(
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
      }).filter(([B]) => Object.keys(b).includes(B))
    ), U = Ze(() => ({
      system: n("System"),
      light: n("Light"),
      dark: n("Dark")
    }));
    return (B, D) => (f(), X(Ke, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: D[8] || (D[8] = (L) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(n)("Close")), 1)
      ]),
      default: se(() => [
        o("div", Ea, [
          Ta,
          o("div", Ma, [
            o("h3", Aa, _("Vuefinder " + a(e).version), 1),
            o("div", null, [
              o("div", null, [
                o("nav", Da, [
                  (f(!0), g(he, null, $e(l.value, (L) => (f(), g("button", {
                    key: L.name,
                    onClick: (V) => u.value = L.key,
                    class: me([L.key === u.value ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-sky-500" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-600", "px-3 py-2 border-b font-medium text-sm"]),
                    "aria-current": L.current ? "page" : void 0
                  }, _(L.name), 11, La))), 128))
                ])
              ])
            ]),
            u.value === d.ABOUT ? (f(), g("div", Va, [
              o("div", Oa, _(a(n)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              o("a", Ha, _(a(n)("Project home")), 1),
              o("a", Ba, _(a(n)("Follow on GitHub")), 1)
            ])) : P("", !0),
            u.value === d.SETTINGS ? (f(), g("div", Ra, [
              o("div", Fa, _(a(n)("Customize your experience with the following settings.")), 1),
              o("div", Ia, [
                o("fieldset", null, [
                  o("div", Na, [
                    o("div", Ua, [
                      o("div", za, [
                        pe(o("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": D[0] || (D[0] = (L) => a(e).metricUnits = L),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).metricUnits]
                        ])
                      ]),
                      o("div", Pa, [
                        o("label", ja, [
                          Q(_(a(n)("Use Metric Units")) + " ", 1),
                          W(gt, {
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
                    o("div", qa, [
                      o("div", Ga, [
                        pe(o("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": D[1] || (D[1] = (L) => a(e).compactListView = L),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).compactListView]
                        ])
                      ]),
                      o("div", Ka, [
                        o("label", Wa, [
                          Q(_(a(n)("Compact list view")) + " ", 1),
                          W(gt, {
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
                    o("div", Ya, [
                      o("div", Xa, [
                        pe(o("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": D[2] || (D[2] = (L) => a(e).persist = L),
                          onClick: y,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).persist]
                        ])
                      ]),
                      o("div", Ja, [
                        o("label", Qa, [
                          Q(_(a(n)("Persist path on reload")) + " ", 1),
                          W(gt, {
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
                    o("div", Za, [
                      o("div", el, [
                        pe(o("input", {
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
                      o("div", tl, [
                        o("label", sl, [
                          Q(_(a(n)("Show thumbnails")) + " ", 1),
                          W(gt, {
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
                    o("div", nl, [
                      o("div", ol, [
                        o("label", rl, _(a(n)("Theme")), 1)
                      ]),
                      o("div", al, [
                        pe(o("select", {
                          id: "theme",
                          "onUpdate:modelValue": D[4] || (D[4] = (L) => a(e).theme.value = L),
                          onChange: D[5] || (D[5] = (L) => m(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          o("optgroup", {
                            label: a(n)("Theme")
                          }, [
                            (f(!0), g(he, null, $e(U.value, (L, V) => (f(), g("option", { value: V }, _(L), 9, il))), 256))
                          ], 8, ll)
                        ], 544), [
                          [Ss, a(e).theme.value]
                        ]),
                        W(gt, {
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
                    a(e).features.includes(a(ve).LANGUAGE) && Object.keys(a(k)).length > 1 ? (f(), g("div", cl, [
                      o("div", dl, [
                        o("label", ul, _(a(n)("Language")), 1)
                      ]),
                      o("div", ml, [
                        pe(o("select", {
                          id: "language",
                          "onUpdate:modelValue": D[6] || (D[6] = (L) => Fn(i) ? i.value = L : null),
                          onChange: D[7] || (D[7] = (L) => a(c)(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          o("optgroup", {
                            label: a(n)("Language")
                          }, [
                            (f(!0), g(he, null, $e(a(k), (L, V) => (f(), g("option", { value: V }, _(L), 9, hl))), 256))
                          ], 8, fl)
                        ], 544), [
                          [Ss, a(i)]
                        ]),
                        W(gt, {
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
            u.value === d.SHORTCUTS ? (f(), g("div", vl, [
              o("div", pl, [
                o("div", gl, [
                  o("div", null, _(a(n)("Rename")), 1),
                  _l
                ]),
                o("div", xl, [
                  o("div", null, _(a(n)("Refresh")), 1),
                  bl
                ]),
                o("div", yl, [
                  Q(_(a(n)("Delete")) + " ", 1),
                  wl
                ]),
                o("div", kl, [
                  Q(_(a(n)("Escape")) + " ", 1),
                  $l
                ]),
                o("div", Sl, [
                  Q(_(a(n)("Select All")) + " ", 1),
                  Cl
                ]),
                o("div", El, [
                  Q(_(a(n)("Search")) + " ", 1),
                  Tl
                ]),
                o("div", Ml, [
                  Q(_(a(n)("Toggle Sidebar")) + " ", 1),
                  Al
                ]),
                o("div", Dl, [
                  Q(_(a(n)("Open Settings")) + " ", 1),
                  Ll
                ]),
                o("div", Vl, [
                  Q(_(a(n)("Toggle Full Screen")) + " ", 1),
                  Ol
                ])
              ])
            ])) : P("", !0),
            u.value === d.RESET ? (f(), g("div", Hl, [
              o("div", Bl, _(a(n)("Reset all settings to default")), 1),
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
}, Rl = ["title"], Fl = /* @__PURE__ */ o("svg", {
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
], -1), Il = [
  Fl
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
    const s = e, r = ae("ServiceContainer"), { t: n } = r.i18n, c = M(!1), i = M(null), d = M((u = i.value) == null ? void 0 : u.strMessage);
    Je(d, () => c.value = !1);
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
        }, Il, 8, Rl)
      ], 2))
    ]));
  }
}, Nl = { class: "sm:flex sm:items-start" }, Ul = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), zl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Pl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, jl = { class: "mt-2" }, ql = { class: "text-sm text-gray-500" }, Gl = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Kl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Wl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yl = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xl = [
  Yl
], Jl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ql = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Zl = [
  Ql
], ei = { class: "ml-1.5" }, ti = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, rn = {
  __name: "ModalDelete",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items), n = M(""), c = () => {
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
    return (i, d) => (f(), X(Ke, null, {
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
        o("div", ti, _(a(s)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        o("div", Nl, [
          Ul,
          o("div", zl, [
            o("h3", Pl, _(a(s)("Delete files")), 1),
            o("div", jl, [
              o("p", ql, _(a(s)("Are you sure you want to delete these files?")), 1),
              o("div", Gl, [
                (f(!0), g(he, null, $e(r.value, (l) => (f(), g("p", Kl, [
                  l.type === "dir" ? (f(), g("svg", Wl, Xl)) : (f(), g("svg", Jl, Zl)),
                  o("span", ei, _(l.basename), 1)
                ]))), 256))
              ]),
              n.value.length ? (f(), X(We, {
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
}, si = { class: "sm:flex sm:items-start" }, ni = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), oi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ri = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ai = { class: "mt-2" }, li = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, ii = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ci = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), di = [
  ci
], ui = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, mi = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fi = [
  mi
], hi = { class: "ml-1.5" }, an = {
  __name: "ModalRename",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items[0]), n = M(e.modal.data.items[0].basename), c = M(""), i = () => {
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
    return (d, l) => (f(), X(Ke, null, {
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
        o("div", si, [
          ni,
          o("div", oi, [
            o("h3", ri, _(a(s)("Rename")), 1),
            o("div", ai, [
              o("p", li, [
                r.value.type === "dir" ? (f(), g("svg", ii, di)) : (f(), g("svg", ui, fi)),
                o("span", hi, _(r.value.basename), 1)
              ]),
              pe(o("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => n.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [St, n.value]
              ]),
              c.value.length ? (f(), X(We, {
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
}, Ye = {
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
function vi(t) {
  const e = (s) => {
    s.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (s.code === Ye.F2 && t.features.includes(ve.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(an, { items: t.dragSelect.getSelected() })), s.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(rn, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === Ye.BACKSLASH && t.modal.open(Mo), s.metaKey && s.code === Ye.KEY_F && t.features.includes(ve.SEARCH) && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), s.metaKey && s.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), s.metaKey && s.code === Ye.KEY_A && (t.dragSelect.selectAll(), s.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  }), qs(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const pi = { class: "sm:flex sm:items-start" }, gi = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), _i = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, xi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, bi = { class: "mt-2" }, yi = { class: "text-sm text-gray-500" }, wi = ["placeholder"], Ao = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = M(""), n = M(""), c = () => {
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
    return (i, d) => (f(), X(Ke, null, {
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
        o("div", pi, [
          gi,
          o("div", _i, [
            o("h3", xi, _(a(s)("New Folder")), 1),
            o("div", bi, [
              o("p", yi, _(a(s)("Create a new folder")), 1),
              pe(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Folder Name"),
                type: "text"
              }, null, 40, wi), [
                [St, r.value]
              ]),
              n.value.length ? (f(), X(We, {
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
}, ki = { class: "sm:flex sm:items-start" }, $i = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Si = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ci = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ei = { class: "mt-2" }, Ti = { class: "text-sm text-gray-500" }, Mi = ["placeholder"], Ai = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = M(""), n = M(""), c = () => {
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
    return (i, d) => (f(), X(Ke, null, {
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
        o("div", ki, [
          $i,
          o("div", Si, [
            o("h3", Ci, _(a(s)("New File")), 1),
            o("div", Ei, [
              o("p", Ti, _(a(s)("Create a new file")), 1),
              pe(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("File Name"),
                type: "text"
              }, null, 40, Mi), [
                [St, r.value]
              ]),
              n.value.length ? (f(), X(We, {
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
const Di = { class: "sm:flex sm:items-start" }, Li = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Vi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Oi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Hi = { class: "mt-2" }, Bi = {
  key: 0,
  class: "pointer-events-none"
}, Ri = {
  key: 1,
  class: "pointer-events-none"
}, Fi = ["disabled"], Ii = ["disabled"], Ni = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Ui = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, zi = ["textContent"], Pi = { class: "ml-1 w-full h-fit" }, ji = { class: "text-left hidden md:block" }, qi = { class: "text-left md:hidden" }, Gi = {
  key: 0,
  class: "ml-auto"
}, Ki = ["title", "disabled", "onClick"], Wi = /* @__PURE__ */ o("svg", {
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
], -1), Yi = [
  Wi
], Xi = {
  key: 0,
  class: "py-2"
}, Ji = ["disabled"], Qi = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), n = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: n }), i = M(null), d = M(null), l = M(null), u = M(null), h = M(null), m = M(null), p = M([]), v = M(""), x = M(!1), y = M(!1);
    let b;
    function A(H) {
      return p.value.findIndex(($) => $.id === H);
    }
    function k(H, $ = null) {
      $ = $ ?? (H.webkitRelativePath || H.name), b.addFile({
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
        if (!p.value.filter((H) => H.status !== n.DONE).length) {
          v.value = s("Please select file to upload first.");
          return;
        }
        v.value = "", b.retryAll(), b.upload();
      }
    }
    function V() {
      b.cancelAll({ reason: "user" }), p.value.forEach((H) => {
        H.status !== n.DONE && (H.status = n.CANCELED, H.statusName = s("Canceled"));
      }), x.value = !1;
    }
    function E(H) {
      x.value || (b.removeFile(H.id, "removed-by-user"), p.value.splice(A(H.id), 1));
    }
    function O(H) {
      if (!x.value) {
        if (b.cancelAll({ reason: "user" }), H) {
          const $ = [];
          p.value.forEach((w) => {
            w.status !== n.DONE && $.push(w);
          }), p.value = [], $.forEach((w) => {
            k(w.originalFile, w.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function T() {
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
      b = new tr({
        debug: e.debug,
        restrictions: {
          maxFileSize: mr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(w, I) {
          if (I[w.id] != null) {
            const ne = A(w.id);
            p.value[ne].status === n.PENDING && (v.value = b.i18n("noDuplicates", { fileName: w.name })), p.value = p.value.filter((de) => de.id !== w.id);
          }
          return p.value.push({
            id: w.id,
            name: w.name,
            size: e.filesize(w.size),
            status: n.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: w.data
          }), !0;
        }
      }), b.use(sr, {
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
      }), b.on("restriction-failed", (w, I) => {
        const R = p.value[A(w.id)];
        E(R), v.value = I.message;
      }), b.on("upload", () => {
        const w = S();
        b.setMeta({ ...w.body });
        const I = b.getPlugin("XHRUpload");
        I.opts.method = w.method, I.opts.endpoint = w.url + "?" + new URLSearchParams(w.params), I.opts.headers = w.headers, delete w.headers["Content-Type"], x.value = !0, p.value.forEach((R) => {
          R.status !== n.DONE && (R.percent = null, R.status = n.UPLOADING, R.statusName = s("Pending upload"));
        });
      }), b.on("upload-progress", (w, I) => {
        const R = Math.floor(I.bytesUploaded / I.bytesTotal * 100);
        p.value[A(w.id)].percent = `${R}%`;
      }), b.on("upload-success", (w) => {
        const I = p.value[A(w.id)];
        I.status = n.DONE, I.statusName = s("Done");
      }), b.on("upload-error", (w, I) => {
        const R = p.value[A(w.id)];
        R.percent = null, R.status = n.ERROR, I.isNetworkError ? R.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : R.statusName = I ? I.message : s("Unknown Error");
      }), b.on("error", (w) => {
        v.value = w.message, x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), b.on("complete", () => {
        x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), h.value.addEventListener("click", () => {
        l.value.click();
      }), m.value.addEventListener("dragover", (w) => {
        w.preventDefault(), y.value = !0;
      }), m.value.addEventListener("dragleave", (w) => {
        w.preventDefault(), y.value = !1;
      });
      function H(w, I) {
        I.isFile && I.file((R) => w(I, R)), I.isDirectory && I.createReader().readEntries((R) => {
          R.forEach((ne) => {
            H(w, ne);
          });
        });
      }
      m.value.addEventListener("drop", (w) => {
        w.preventDefault(), y.value = !1;
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
      b == null || b.close({ reason: "unmount" });
    }), (H, $) => (f(), X(Ke, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          class: me(["vf-btn vf-btn-primary", x.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: x.value,
          onClick: rt(L, ["prevent"])
        }, _(a(s)("Upload")), 11, Ji),
        x.value ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: rt(V, ["prevent"])
        }, _(a(s)("Cancel")), 1)) : (f(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: rt(T, ["prevent"])
        }, _(a(s)("Close")), 1))
      ]),
      default: se(() => [
        o("div", Di, [
          Li,
          o("div", Vi, [
            o("h3", Oi, _(a(s)("Upload Files")), 1),
            o("div", Hi, [
              o("div", {
                ref_key: "dropArea",
                ref: m,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: D
              }, [
                y.value ? (f(), g("div", Bi, _(a(s)("Release to drop these files.")), 1)) : (f(), g("div", Ri, _(a(s)("Drag and drop the files/folders to here or click here.")), 1))
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
                }, _(a(s)("Clear all")), 9, Fi),
                o("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: x.value,
                  onClick: $[1] || ($[1] = (w) => O(!0))
                }, _(a(s)("Clear only successful")), 9, Ii)
              ], 512),
              o("div", Ni, [
                (f(!0), g(he, null, $e(p.value, (w) => (f(), g("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: w.id
                }, [
                  o("span", Ui, [
                    o("span", {
                      class: me(["text-base m-auto", U(w)]),
                      textContent: _(B(w))
                    }, null, 10, zi)
                  ]),
                  o("div", Pi, [
                    o("div", ji, _(a(Ps)(w.name, 40)) + " (" + _(w.size) + ")", 1),
                    o("div", qi, _(a(Ps)(w.name, 16)) + " (" + _(w.size) + ")", 1),
                    o("div", {
                      class: me(["flex break-all text-left", U(w)])
                    }, [
                      Q(_(w.statusName) + " ", 1),
                      w.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (f(), g("b", Gi, _(w.percent), 1)) : P("", !0)
                    ], 2)
                  ]),
                  o("button", {
                    type: "button",
                    class: me(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", x.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(s)("Delete"),
                    disabled: x.value,
                    onClick: (I) => E(w)
                  }, Yi, 10, Ki)
                ]))), 128)),
                p.value.length ? P("", !0) : (f(), g("div", Xi, _(a(s)("No files selected!")), 1))
              ]),
              v.value.length ? (f(), X(We, {
                key: 0,
                onHidden: $[2] || ($[2] = (w) => v.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(v.value), 1)
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
}, Zi = { class: "sm:flex sm:items-start" }, ec = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), tc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, sc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, nc = { class: "mt-2" }, oc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, rc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ac = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), lc = [
  ac
], ic = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cc = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), dc = [
  cc
], uc = { class: "ml-1.5" }, mc = { class: "my-1 text-sm text-gray-500" }, Do = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items[0]), n = M(""), c = M([]), i = () => {
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
    return (d, l) => (f(), X(Ke, null, {
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
        o("div", Zi, [
          ec,
          o("div", tc, [
            o("h3", sc, _(a(s)("Unarchive")), 1),
            o("div", nc, [
              (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", oc, [
                u.type === "dir" ? (f(), g("svg", rc, lc)) : (f(), g("svg", ic, dc)),
                o("span", uc, _(u.basename), 1)
              ]))), 256)),
              o("p", mc, _(a(s)("The archive will be unarchived at")) + " (" + _(a(e).fs.data.dirname) + ")", 1),
              n.value.length ? (f(), X(We, {
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
}, fc = { class: "sm:flex sm:items-start" }, hc = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), vc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, pc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, gc = { class: "mt-2" }, _c = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, xc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, bc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yc = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), wc = [
  yc
], kc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $c = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Sc = [
  $c
], Cc = { class: "ml-1.5" }, Ec = ["placeholder"], Lo = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(""), n = M(""), c = M(e.modal.data.items), i = () => {
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
    return (d, l) => (f(), X(Ke, null, {
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
        o("div", fc, [
          hc,
          o("div", vc, [
            o("h3", pc, _(a(s)("Archive the files")), 1),
            o("div", gc, [
              o("div", _c, [
                (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", xc, [
                  u.type === "dir" ? (f(), g("svg", bc, wc)) : (f(), g("svg", kc, Sc)),
                  o("span", Cc, _(u.basename), 1)
                ]))), 256))
              ]),
              pe(o("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Ec), [
                [St, r.value]
              ]),
              n.value.length ? (f(), X(We, {
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
}, Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Mc = /* @__PURE__ */ o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Ac = [
  Mc
];
function Dc(t, e) {
  return f(), g("svg", Tc, [...Ac]);
}
const Lc = { render: Dc }, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Oc = /* @__PURE__ */ o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Hc = [
  Oc
];
function Bc(t, e) {
  return f(), g("svg", Vc, [...Hc]);
}
const Rc = { render: Bc }, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Ic = /* @__PURE__ */ o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), Nc = [
  Ic
];
function Uc(t, e) {
  return f(), g("svg", Fc, [...Nc]);
}
const zc = { render: Uc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, jc = /* @__PURE__ */ o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), qc = [
  jc
];
function Gc(t, e) {
  return f(), g("svg", Pc, [...qc]);
}
const Kc = { render: Gc }, Wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Yc = /* @__PURE__ */ o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), Xc = [
  Yc
];
function Jc(t, e) {
  return f(), g("svg", Wc, [...Xc]);
}
const Qc = { render: Jc }, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ed = /* @__PURE__ */ o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), td = [
  ed
];
function sd(t, e) {
  return f(), g("svg", Zc, [...td]);
}
const nd = { render: sd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, rd = /* @__PURE__ */ o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), ad = [
  rd
];
function ld(t, e) {
  return f(), g("svg", od, [...ad]);
}
const id = { render: ld }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, dd = /* @__PURE__ */ o("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), ud = /* @__PURE__ */ o("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), md = [
  dd,
  ud
];
function fd(t, e) {
  return f(), g("svg", cd, [...md]);
}
const ln = { render: fd }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, vd = /* @__PURE__ */ o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), pd = [
  vd
];
function gd(t, e) {
  return f(), g("svg", hd, [...pd]);
}
const _d = { render: gd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, bd = /* @__PURE__ */ o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), yd = [
  bd
];
function wd(t, e) {
  return f(), g("svg", xd, [...yd]);
}
const kd = { render: wd }, $d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Sd = /* @__PURE__ */ o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), Cd = [
  Sd
];
function Ed(t, e) {
  return f(), g("svg", $d, [...Cd]);
}
const Td = { render: Ed }, Md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Ad = /* @__PURE__ */ o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), Dd = [
  Ad
];
function Ld(t, e) {
  return f(), g("svg", Md, [...Dd]);
}
const Vd = { render: Ld }, Od = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm grow-0" }, Hd = {
  key: 0,
  class: "flex text-center"
}, Bd = ["title"], Rd = ["title"], Fd = ["title"], Id = ["title"], Nd = ["title"], Ud = ["title"], zd = ["title"], Pd = {
  key: 1,
  class: "flex text-center"
}, jd = { class: "pl-2" }, qd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Gd = { class: "flex text-center items-center justify-end" }, Kd = ["title"], Wd = ["title"], Yd = {
  __name: "Toolbar",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, n = e.dragSelect, c = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Je(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", n.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (f(), g("div", Od, [
      c.value.length ? (f(), g("div", Pd, [
        o("div", jd, [
          Q(_(a(r)("Search results for")) + " ", 1),
          o("span", qd, _(c.value), 1)
        ]),
        a(e).fs.loading ? (f(), X(a(ln), { key: 0 })) : P("", !0)
      ])) : (f(), g("div", Hd, [
        a(e).features.includes(a(ve).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: a(r)("New Folder"),
          onClick: u[0] || (u[0] = (h) => a(e).modal.open(Ao, { items: a(n).getSelected() }))
        }, [
          W(a(Lc))
        ], 8, Bd)) : P("", !0),
        a(e).features.includes(a(ve).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: a(r)("New File"),
          onClick: u[1] || (u[1] = (h) => a(e).modal.open(Ai, { items: a(n).getSelected() }))
        }, [
          W(a(Rc))
        ], 8, Rd)) : P("", !0),
        a(e).features.includes(a(ve).RENAME) ? (f(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: a(r)("Rename"),
          onClick: u[2] || (u[2] = (h) => a(n).getCount() !== 1 || a(e).modal.open(an, { items: a(n).getSelected() }))
        }, [
          W(a(zc), {
            class: me(a(n).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Fd)) : P("", !0),
        a(e).features.includes(a(ve).DELETE) ? (f(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: a(r)("Delete"),
          onClick: u[3] || (u[3] = (h) => !a(n).getCount() || a(e).modal.open(rn, { items: a(n).getSelected() }))
        }, [
          W(a(Kc), {
            class: me(a(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Id)) : P("", !0),
        a(e).features.includes(a(ve).UPLOAD) ? (f(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: a(r)("Upload"),
          onClick: u[4] || (u[4] = (h) => a(e).modal.open(Qi, { items: a(n).getSelected() }))
        }, [
          W(a(Qc))
        ], 8, Nd)) : P("", !0),
        a(e).features.includes(a(ve).UNARCHIVE) && a(n).getCount() === 1 && a(n).getSelected()[0].mime_type === "application/zip" ? (f(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: a(r)("Unarchive"),
          onClick: u[5] || (u[5] = (h) => !a(n).getCount() || a(e).modal.open(Do, { items: a(n).getSelected() }))
        }, [
          W(a(id), {
            class: me(a(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ud)) : P("", !0),
        a(e).features.includes(a(ve).ARCHIVE) ? (f(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: a(r)("Archive"),
          onClick: u[6] || (u[6] = (h) => !a(n).getCount() || a(e).modal.open(Lo, { items: a(n).getSelected() }))
        }, [
          W(a(nd), {
            class: me(a(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : P("", !0)
      ])),
      o("div", Gd, [
        a(e).features.includes(a(ve).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: a(r)("Toggle Full Screen")
        }, [
          a(e).fullScreen ? (f(), X(a(kd), { key: 0 })) : (f(), X(a(_d), { key: 1 }))
        ], 8, Kd)) : P("", !0),
        o("div", {
          class: "mx-1.5",
          title: a(r)("Change View"),
          onClick: u[7] || (u[7] = (h) => c.value.length || d())
        }, [
          a(e).view === "grid" ? (f(), X(a(Td), {
            key: 0,
            class: me(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0),
          a(e).view === "list" ? (f(), X(a(Vd), {
            key: 1,
            class: me(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0)
        ], 8, Wd)
      ])
    ]));
  }
}, Xd = (t, e = 0, s = !1) => {
  let r;
  return (...n) => {
    s && !r && t(...n), clearTimeout(r), r = setTimeout(() => {
      t(...n);
    }, e);
  };
}, Hn = (t, e, s) => {
  const r = M(t);
  return qo((n, c) => ({
    get() {
      return n(), r.value;
    },
    set: Xd(
      (i) => {
        r.value = i, c();
      },
      e,
      s
    )
  }));
}, Jd = { class: "sm:flex sm:items-start" }, Qd = /* @__PURE__ */ o("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Zd = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, eu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, tu = { class: "text-sm text-gray-500 pb-1" }, su = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, nu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ou = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ru = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), au = [
  ru
], lu = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, iu = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), cu = [
  iu
], du = { class: "ml-1.5" }, uu = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, mu = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, fu = /* @__PURE__ */ o("svg", {
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
], -1), hu = { class: "ml-1.5 overflow-auto" }, vu = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, js = {
  __name: "ModalMove",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items.from), n = M(""), c = () => {
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
    return (i, d) => (f(), X(Ke, null, {
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
        o("div", vu, _(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        o("div", Jd, [
          Qd,
          o("div", Zd, [
            o("h3", eu, _(a(s)("Move files")), 1),
            o("p", tu, _(a(s)("Are you sure you want to move these files?")), 1),
            o("div", su, [
              (f(!0), g(he, null, $e(r.value, (l) => (f(), g("div", nu, [
                o("div", null, [
                  l.type === "dir" ? (f(), g("svg", ou, au)) : (f(), g("svg", lu, cu))
                ]),
                o("div", du, _(l.path), 1)
              ]))), 256))
            ]),
            o("h4", uu, _(a(s)("Target Directory")), 1),
            o("p", mu, [
              fu,
              o("span", hu, _(a(e).modal.data.items.to.path), 1)
            ]),
            n.value.length ? (f(), X(We, {
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
}, pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, gu = /* @__PURE__ */ o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), _u = [
  gu
];
function xu(t, e) {
  return f(), g("svg", pu, [..._u]);
}
const bu = { render: xu }, yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, wu = /* @__PURE__ */ o("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), ku = [
  wu
];
function $u(t, e) {
  return f(), g("svg", yu, [...ku]);
}
const Su = { render: $u }, Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, Eu = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Tu = [
  Eu
];
function Mu(t, e) {
  return f(), g("svg", Cu, [...Tu]);
}
const Au = { render: Mu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, Lu = /* @__PURE__ */ o("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Vu = [
  Lu
];
function Ou(t, e) {
  return f(), g("svg", Du, [...Vu]);
}
const Hu = { render: Ou }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Ru = /* @__PURE__ */ o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Fu = [
  Ru
];
function Iu(t, e) {
  return f(), g("svg", Bu, [...Fu]);
}
const Nu = { render: Iu }, Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, zu = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Pu = [
  zu
];
function ju(t, e) {
  return f(), g("svg", Uu, [...Pu]);
}
const qu = { render: ju }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Ku = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Wu = [
  Ku
];
function Yu(t, e) {
  return f(), g("svg", Gu, [...Wu]);
}
const fs = { render: Yu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, Ju = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Qu = /* @__PURE__ */ o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), Zu = [
  Ju,
  Qu
];
function e0(t, e) {
  return f(), g("svg", Xu, [...Zu]);
}
const t0 = { render: e0 }, s0 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, n0 = /* @__PURE__ */ o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), o0 = [
  n0
];
function r0(t, e) {
  return f(), g("svg", s0, [...o0]);
}
const a0 = { render: r0 }, l0 = { class: "space-x-0.5 flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm grow-0" }, i0 = ["title"], c0 = ["title"], d0 = ["title"], u0 = ["title"], m0 = { class: "flex leading-6" }, f0 = {
  key: 0,
  class: "flex"
}, h0 = /* @__PURE__ */ o("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), v0 = { class: "relative" }, p0 = /* @__PURE__ */ o("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), g0 = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], _0 = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, x0 = ["placeholder"], b0 = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, y0 = ["onDrop", "onClick"], w0 = { class: "flex pointer-events-none" }, k0 = { class: "inline-block w-full text-ellipsis overflow-hidden" }, $0 = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: n } = e.storage, c = M(null), i = Hn(0, 100);
    Je(i, (V) => {
      const E = c.value.children;
      let O = 0, T = 0, S = 5, H = 1;
      e.fs.limitBreadcrumbItems(S), ft(() => {
        for (let $ = E.length - 1; $ >= 0 && !(O + E[$].offsetWidth > i.value - 40); $--)
          O += parseInt(E[$].offsetWidth, 10), T++;
        T < H && (T = H), T > S && (T = S), e.fs.limitBreadcrumbItems(T);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    Ce(() => {
      new ResizeObserver(d).observe(c.value);
    });
    const l = (V, E = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, m(V), E ?? (E = e.fs.hiddenBreadcrumbs.length - 1);
      let O = JSON.parse(V.dataTransfer.getData("items"));
      if (O.find((T) => T.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: O,
          to: e.fs.hiddenBreadcrumbs[E] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (V, E = null) => {
      V.preventDefault(), r.isDraggingRef.value = !1, m(V), E ?? (E = e.fs.breadcrumbs.length - 2);
      let O = JSON.parse(V.dataTransfer.getData("items"));
      if (O.find((T) => T.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: O,
          to: e.fs.breadcrumbs[E] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, h = (V) => {
      V.preventDefault(), e.fs.isGoUpAvailable() ? (V.dataTransfer.dropEffect = "copy", V.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (V.dataTransfer.dropEffect = "none", V.dataTransfer.effectAllowed = "none");
    }, m = (V) => {
      V.preventDefault(), V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      D(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, v = () => {
      D(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, x = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, b = {
      mounted(V, E, O, T) {
        V.clickOutsideEvent = function(S) {
          V === S.target || V.contains(S.target) || E.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V, E, O, T) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, A = () => {
      e.showTreeView = !e.showTreeView;
    };
    Je(() => e.showTreeView, (V, E) => {
      V !== E && n("show-tree-view", V);
    });
    const k = M(null), U = () => {
      e.features.includes(ve.SEARCH) && (e.fs.searchMode = !0, ft(() => k.value.focus()));
    }, B = Hn("", 400);
    Je(B, (V) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: V });
    }), Je(() => e.fs.searchMode, (V) => {
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
    return (V, E) => (f(), g("div", l0, [
      o("span", {
        title: a(s)("Toggle Tree View")
      }, [
        W(a(t0), {
          onClick: A,
          class: me(["h-6 w-6 p-0.5 rounded cursor-pointer text-slate-700", a(e).showTreeView ? "bg-gray-300 dark:bg-gray-700" : ""])
        }, null, 8, ["class"])
      ], 8, i0),
      o("span", {
        title: a(s)("Go up a directory")
      }, [
        W(a(Su), {
          onDragover: E[0] || (E[0] = (O) => h(O)),
          onDragleave: E[1] || (E[1] = (O) => m(O)),
          onDrop: E[2] || (E[2] = (O) => u(O)),
          onClick: v,
          class: me(a(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, c0),
      a(e).fs.loading ? (f(), g("span", {
        key: 1,
        title: a(s)("Cancel")
      }, [
        W(a(Au), {
          onClick: E[3] || (E[3] = (O) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, u0)) : (f(), g("span", {
        key: 0,
        title: a(s)("Refresh")
      }, [
        W(a(bu), { onClick: p })
      ], 8, d0)),
      pe(o("div", {
        onClick: rt(U, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        o("div", null, [
          W(a(Hu), {
            onDragover: E[4] || (E[4] = (O) => h(O)),
            onDragleave: E[5] || (E[5] = (O) => m(O)),
            onDrop: E[6] || (E[6] = (O) => u(O, -1)),
            onClick: E[7] || (E[7] = (O) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter } }))
          })
        ]),
        o("div", m0, [
          a(e).fs.hiddenBreadcrumbs.length ? pe((f(), g("div", f0, [
            h0,
            o("div", v0, [
              o("span", {
                onDragenter: E[8] || (E[8] = (O) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: E[9] || (E[9] = (O) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                W(a(a0), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [b, y]
          ]) : P("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: rt(U, ["self"])
        }, [
          (f(!0), g(he, null, $e(a(e).fs.breadcrumbs, (O, T) => (f(), g("div", { key: T }, [
            p0,
            o("span", {
              onDragover: (S) => T === a(e).fs.breadcrumbs.length - 1 || h(S),
              onDragleave: (S) => T === a(e).fs.breadcrumbs.length - 1 || m(S),
              onDrop: (S) => T === a(e).fs.breadcrumbs.length - 1 || u(S, T),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: O.basename,
              onClick: (S) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter, path: O.path } })
            }, _(O.name), 41, g0)
          ]))), 128))
        ], 512),
        a(e).fs.loading ? (f(), X(a(ln), { key: 0 })) : P("", !0)
      ], 512), [
        [ze, !a(e).fs.searchMode]
      ]),
      pe(o("div", _0, [
        o("div", null, [
          W(a(Nu))
        ]),
        pe(o("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: $t(D, ["esc"]),
          onBlur: L,
          "onUpdate:modelValue": E[10] || (E[10] = (O) => Fn(B) ? B.value = O : null),
          placeholder: a(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, x0), [
          [St, a(B)]
        ]),
        W(a(qu), { onClick: D })
      ], 512), [
        [ze, a(e).fs.searchMode]
      ]),
      pe(o("div", b0, [
        (f(!0), g(he, null, $e(a(e).fs.hiddenBreadcrumbs, (O, T) => (f(), g("div", {
          key: T,
          onDragover: E[11] || (E[11] = (S) => h(S)),
          onDragleave: E[12] || (E[12] = (S) => m(S)),
          onDrop: (S) => l(S, T),
          onClick: (S) => x(O),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          o("div", w0, [
            o("span", null, [
              W(a(fs), { class: "h-5 w-5" })
            ]),
            Q(),
            o("span", k0, _(O.name), 1)
          ])
        ], 40, y0))), 128))
      ], 512), [
        [ze, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Vo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), S0 = ["onClick"], C0 = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: s } = e.storage, r = M(s("full-screen", !1)), n = M([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
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
      W(Go, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: se(() => [
          (f(!0), g(he, null, $e(n.value, (h, m) => (f(), g("div", {
            onClick: (p) => i(m),
            key: h,
            class: me([c(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, _(h.label), 11, S0))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, E0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, T0 = /* @__PURE__ */ o("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), M0 = [
  T0
];
function A0(t, e) {
  return f(), g("svg", E0, [...M0]);
}
const D0 = { render: A0 }, L0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, V0 = /* @__PURE__ */ o("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), O0 = [
  V0
];
function H0(t, e) {
  return f(), g("svg", L0, [...O0]);
}
const B0 = { render: H0 }, Kt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (f(), g("div", null, [
      t.direction === "asc" ? (f(), X(a(D0), { key: 0 })) : P("", !0),
      t.direction === "desc" ? (f(), X(a(B0), { key: 1 })) : P("", !0)
    ]));
  }
}, R0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, F0 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), I0 = [
  F0
];
function N0(t, e) {
  return f(), g("svg", R0, [...I0]);
}
const U0 = { render: N0 }, ks = {
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
      t.type === "dir" ? (f(), X(a(fs), {
        key: 0,
        class: me({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"])) : (f(), X(a(U0), {
        key: 1,
        class: me({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, z0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, P0 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), j0 = [
  P0
];
function q0(t, e) {
  return f(), g("svg", z0, [...j0]);
}
const G0 = { render: q0 }, K0 = { class: "absolute -z-50 -top-96" }, W0 = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Y0 = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, r) => (f(), g("div", K0, [
      W(a(G0)),
      o("div", W0, _(e.count), 1)
    ]));
  }
}, X0 = { class: "flex" }, J0 = ["title"], Q0 = { class: "ml-auto mb-2" }, Z0 = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, em = { key: 1 }, tm = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = M(""), n = M(""), c = M(null), i = M(!1), d = M(""), l = M(!1), u = ae("ServiceContainer"), { t: h } = u.i18n;
    Ce(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((v) => {
        r.value = v, s("success");
      });
    });
    const m = () => {
      i.value = !i.value, n.value = r.value;
    }, p = () => {
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
      }).then((v) => {
        d.value = h("Updated."), r.value = v, s("success"), i.value = !i.value;
      }).catch((v) => {
        d.value = h(v.message), l.value = !0;
      });
    };
    return (v, x) => (f(), g(he, null, [
      o("div", X0, [
        o("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: a(u).modal.data.item.path
        }, _(a(u).modal.data.item.basename), 9, J0),
        o("div", Q0, [
          i.value ? (f(), g("button", {
            key: 0,
            onClick: p,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, _(a(h)("Save")), 1)) : P("", !0),
          a(u).features.includes(a(ve).EDIT) ? (f(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: x[0] || (x[0] = (y) => m())
          }, _(i.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : P("", !0)
        ])
      ]),
      o("div", null, [
        i.value ? (f(), g("div", em, [
          pe(o("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": x[1] || (x[1] = (y) => n.value = y),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [St, n.value]
          ])
        ])) : (f(), g("pre", Z0, _(r.value), 1)),
        d.value.length ? (f(), X(We, {
          key: 2,
          onHidden: x[2] || (x[2] = (y) => d.value = ""),
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
}, sm = { class: "flex" }, nm = ["title"], om = { class: "ml-auto mb-2" }, rm = { class: "w-full flex justify-center" }, am = ["src"], lm = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), { t: n } = r.i18n, c = M(null), i = M(null), d = M(!1), l = M(""), u = M(!1), h = () => {
      d.value = !d.value, d.value ? i.value = new or(c.value, {
        crop(p) {
        }
      }) : i.value.destroy();
    }, m = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          l.value = "", u.value = !1;
          const v = new FormData();
          v.set("file", p), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: v
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
    }), (p, v) => (f(), g(he, null, [
      o("div", sm, [
        o("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: a(r).modal.data.item.path
        }, _(a(r).modal.data.item.basename), 9, nm),
        o("div", om, [
          d.value ? (f(), g("button", {
            key: 0,
            onClick: m,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, _(a(n)("Crop")), 1)) : P("", !0),
          a(r).features.includes(a(ve).EDIT) ? (f(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: v[0] || (v[0] = (x) => h())
          }, _(d.value ? a(n)("Cancel") : a(n)("Edit")), 1)) : P("", !0)
        ])
      ]),
      o("div", rm, [
        o("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, am)
      ]),
      l.value.length ? (f(), X(We, {
        key: 0,
        onHidden: v[1] || (v[1] = (x) => l.value = ""),
        error: u.value
      }, {
        default: se(() => [
          Q(_(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : P("", !0)
    ], 64));
  }
}, im = { class: "flex" }, cm = ["title"], dm = /* @__PURE__ */ o("div", null, null, -1), um = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (n, c) => (f(), g(he, null, [
      o("div", im, [
        o("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: a(s).modal.data.item.path
        }, _(a(s).modal.data.item.basename), 9, cm)
      ]),
      dm
    ], 64));
  }
}, mm = ["title"], fm = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, hm = ["src"], vm = {
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
      }, _(a(s).modal.data.item.basename), 9, mm),
      o("div", null, [
        o("video", fm, [
          o("source", {
            src: n(),
            type: "video/mp4"
          }, null, 8, hm),
          Q(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, pm = ["title"], gm = {
  class: "w-full",
  controls: ""
}, _m = ["src"], xm = {
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
      }, _(a(r).modal.data.item.basename), 9, pm),
      o("div", null, [
        o("audio", gm, [
          o("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, _m),
          Q(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, bm = ["title"], ym = ["data"], wm = ["src"], km = /* @__PURE__ */ o("p", null, [
  /* @__PURE__ */ Q(" Your browser does not support PDFs. "),
  /* @__PURE__ */ o("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ Q(" . ")
], -1), $m = [
  km
], Sm = {
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
      }, _(a(s).modal.data.item.basename), 9, bm),
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
          }, $m, 8, wm)
        ], 8, ym)
      ])
    ], 64));
  }
}, Cm = { class: "sm:flex sm:items-start" }, Em = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Tm = { key: 0 }, Mm = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Am = {
  key: 0,
  class: "flex leading-5"
}, Dm = /* @__PURE__ */ o("svg", {
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
], -1), Lm = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, Vm = { class: "font-bold" }, Om = { class: "font-bold pl-2" }, Hm = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Bm = ["download", "href"], Oo = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(!1), n = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(ve.PREVIEW);
    return c || (r.value = !0), (i, d) => (f(), X(Ke, null, {
      buttons: se(() => [
        o("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Close")), 1),
        a(e).features.includes(a(ve).DOWNLOAD) ? (f(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item),
          href: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item)
        }, _(a(s)("Download")), 9, Bm)) : P("", !0)
      ]),
      default: se(() => [
        o("div", Cm, [
          o("div", Em, [
            a(c) ? (f(), g("div", Tm, [
              n("text") ? (f(), X(tm, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : n("image") ? (f(), X(lm, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : n("video") ? (f(), X(vm, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : n("audio") ? (f(), X(xm, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : n("application/pdf") ? (f(), X(Sm, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (f(), X(um, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : P("", !0),
            o("div", Mm, [
              r.value === !1 ? (f(), g("div", Am, [
                Dm,
                o("span", null, _(a(s)("Loading")), 1)
              ])) : P("", !0)
            ])
          ])
        ]),
        o("div", Lm, [
          o("div", null, [
            o("span", Vm, _(a(s)("File Size")) + ": ", 1),
            Q(_(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Om, _(a(s)("Last Modified")) + ": ", 1),
            Q(" " + _(a(Vo)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(ve).DOWNLOAD) ? (f(), g("div", Hm, [
          o("span", null, _(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : P("", !0)
      ]),
      _: 1
    }));
  }
}, Rm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Fm = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Im = /* @__PURE__ */ o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Nm = [
  Fm,
  Im
];
function Um(t, e) {
  return f(), g("svg", Rm, [...Nm]);
}
const Ho = { render: Um }, zm = ["data-type", "data-item", "data-index"], $s = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = e.dragSelect, r = t, n = (v) => {
      v.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: v.path } })) : e.modal.open(Oo, { adapter: e.fs.adapter, item: v });
    }, c = {
      mounted(v, x, y, b) {
        y.props.draggable && (v.addEventListener("dragstart", (A) => i(A, x.value)), v.addEventListener("dragover", (A) => l(A, x.value)), v.addEventListener("drop", (A) => d(A, x.value)));
      },
      beforeUnmount(v, x, y, b) {
        y.props.draggable && (v.removeEventListener("dragstart", i), v.removeEventListener("dragover", l), v.removeEventListener("drop", d));
      }
    }, i = (v, x) => {
      if (v.altKey || v.ctrlKey || v.metaKey)
        return v.preventDefault(), !1;
      s.isDraggingRef.value = !0, v.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), v.dataTransfer.effectAllowed = "all", v.dataTransfer.dropEffect = "copy", v.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (v, x) => {
      v.preventDefault(), s.isDraggingRef.value = !1;
      let y = JSON.parse(v.dataTransfer.getData("items"));
      if (y.find((b) => b.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, { items: { from: y, to: x } });
    }, l = (v, x) => {
      v.preventDefault(), !x || x.type !== "dir" || s.getSelection().find((y) => y === v.currentTarget) ? (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : v.dataTransfer.dropEffect = "copy";
    };
    let u = null, h = !1;
    const m = () => {
      u && clearTimeout(u);
    }, p = (v) => {
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
          clientX: v.target.getBoundingClientRect().x,
          clientY: v.target.getBoundingClientRect().y
        });
        v.target.dispatchEvent(x);
      }, 500);
    };
    return (v, x) => pe((f(), g("div", {
      style: os({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((y) => v.$el === y) ? "0.5 !important" : "" }),
      class: me(["vf-item-" + a(s).explorerId, "relative"]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: x[0] || (x[0] = (y) => n(t.item)),
      onTouchstart: x[1] || (x[1] = (y) => p(y)),
      onTouchend: x[2] || (x[2] = (y) => m()),
      onContextmenu: x[3] || (x[3] = rt((y) => a(e).emitter.emit("vf-contextmenu-show", { event: y, items: a(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Dt(v.$slots, "default"),
      a(e).pinnedFolders.find((y) => y.path === t.item.path) ? (f(), X(a(Ho), {
        key: 0,
        class: "absolute top-0 right-0 text-amber-600"
      })) : P("", !0)
    ], 46, zm)), [
      [c, t.item]
    ]);
  }
}, Pm = { class: "relative flex-auto flex flex-col" }, jm = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, qm = { class: "relative" }, Gm = { class: "grid grid-cols-12 items-center" }, Km = { class: "flex col-span-7 items-center" }, Wm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ym = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Xm = { class: "grid grid-cols-12 items-center" }, Jm = { class: "flex col-span-7 items-center" }, Qm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Zm = { class: "col-span-2 text-center" }, e1 = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, t1 = { class: "relative" }, s1 = ["data-src", "alt"], n1 = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, o1 = { class: "break-all" }, r1 = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = (m) => m == null ? void 0 : m.substring(0, 3), n = M(null), c = M(""), i = e.dragSelect;
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
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = Ot({ active: !1, column: "", order: "" }), u = (m = !0) => {
      let p = [...e.fs.data.files], v = l.column, x = l.order === "asc" ? 1 : -1;
      if (!m)
        return p;
      const y = (b, A) => typeof b == "string" && typeof A == "string" ? b.toLowerCase().localeCompare(A.toLowerCase()) : b < A ? -1 : b > A ? 1 : 0;
      return l.active && (p = p.slice().sort((b, A) => y(b[v], A[v]) * x)), p;
    }, h = (m) => {
      l.active && l.column === m ? (l.active = l.order === "asc", l.column = m, l.order = "desc") : (l.active = !0, l.column = m, l.order = "asc");
    };
    return Ce(() => {
      d = new nr(i.area.value);
    }), Rn(() => {
      d.update();
    }), In(() => {
      d.destroy();
    }), (m, p) => (f(), g("div", Pm, [
      a(e).view === "list" || c.value.length ? (f(), g("div", jm, [
        o("div", {
          onClick: p[0] || (p[0] = (v) => h("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          Q(_(a(s)("Name")) + " ", 1),
          pe(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? P("", !0) : (f(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (v) => h("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          Q(_(a(s)("Size")) + " ", 1),
          pe(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? P("", !0) : (f(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (v) => h("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          Q(_(a(s)("Date")) + " ", 1),
          pe(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (f(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (v) => h("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          Q(_(a(s)("Filepath")) + " ", 1),
          pe(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : P("", !0)
      ])) : P("", !0),
      o("div", qm, [
        W(Y0, {
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
        onContextmenu: p[4] || (p[4] = rt((v) => a(e).emitter.emit("vf-contextmenu-show", { event: v, items: a(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (f(!0), g(he, { key: 0 }, $e(u(), (v, x) => (f(), X($s, {
          item: v,
          index: x,
          dragImage: n.value,
          class: "vf-item vf-item-list"
        }, {
          default: se(() => [
            o("div", Gm, [
              o("div", Km, [
                W(ks, {
                  type: v.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                o("span", Wm, _(v.basename), 1)
              ]),
              o("div", Ym, _(v.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0),
        a(e).view === "list" && !c.value.length ? (f(!0), g(he, { key: 1 }, $e(u(), (v, x) => (f(), X($s, {
          item: v,
          index: x,
          dragImage: n.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: v.path
        }, {
          default: se(() => [
            o("div", Xm, [
              o("div", Jm, [
                W(ks, {
                  type: v.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                o("span", Qm, _(v.basename), 1)
              ]),
              o("div", Zm, _(v.file_size ? a(e).filesize(v.file_size) : ""), 1),
              o("div", e1, _(a(Vo)(v.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : P("", !0),
        a(e).view === "grid" && !c.value.length ? (f(!0), g(he, { key: 2 }, $e(u(!1), (v, x) => (f(), X($s, {
          item: v,
          index: x,
          dragImage: n.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: se(() => [
            o("div", null, [
              o("div", t1, [
                (v.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, v),
                  alt: v.basename,
                  key: v.path
                }, null, 8, s1)) : (f(), X(ks, {
                  key: 1,
                  type: v.type
                }, null, 8, ["type"])),
                !((v.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && v.type !== "dir" ? (f(), g("div", n1, _(r(v.extension)), 1)) : P("", !0)
              ]),
              o("span", o1, _(a(Ps)(v.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0)
      ], 544),
      W(C0)
    ]));
  }
}, a1 = ["href", "download"], l1 = ["onClick"], i1 = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(null), n = M([]), c = M(""), i = Ot({
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
        key: ve.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(Ao)
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
          e.pinnedFolders = e.pinnedFolders.filter((m) => !n.value.find((p) => p.path === m.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: ve.DELETE,
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
        key: ve.PREVIEW,
        title: () => s("Preview"),
        action: () => e.modal.open(Oo, { adapter: e.fs.adapter, item: n.value[0] })
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
        key: ve.DOWNLOAD,
        link: Ze(() => e.requester.getDownloadUrl(e.fs.adapter, n.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: ve.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(Lo, { items: n })
      },
      unarchive: {
        key: ve.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(Do, { items: n })
      },
      rename: {
        key: ve.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(an, { items: n })
      }
    }, u = (m) => {
      e.emitter.emit("vf-contextmenu-hide"), m.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      c.value = m;
    }), e.emitter.on("vf-contextmenu-show", ({ event: m, items: p, target: v = null }) => {
      if (i.items = [], c.value)
        if (v)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((x) => x.path === v.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", p)) : (v.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((x) => x.path === v.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), v.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [v]));
      h(m);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const h = (m) => {
      const p = e.dragSelect.area.value, v = e.root.getBoundingClientRect(), x = p.getBoundingClientRect();
      let y = m.clientX - v.left, b = m.clientY - v.top;
      i.active = !0, ft(() => {
        var B;
        const A = (B = r.value) == null ? void 0 : B.getBoundingClientRect();
        let k = (A == null ? void 0 : A.height) ?? 0, U = (A == null ? void 0 : A.width) ?? 0;
        y = x.right - m.pageX + window.scrollX < U ? y - U : y, b = x.bottom - m.pageY + window.scrollY < k ? b - k : b, i.positions = {
          left: y + "px",
          top: b + "px"
        };
      });
    };
    return (m, p) => pe((f(), g("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: os(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (f(!0), g(he, null, $e(d.value, (v) => (f(), g("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: v.title
      }, [
        v.link ? (f(), g("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: v.link,
          download: v.link,
          onClick: p[0] || (p[0] = (x) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, _(v.title()), 1)
        ], 8, a1)) : (f(), g("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (x) => u(v)
        }, [
          o("span", null, _(v.title()), 1)
        ], 8, l1))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, c1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, d1 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), u1 = [
  d1
];
function m1(t, e) {
  return f(), g("svg", c1, [...u1]);
}
const Bo = { render: m1 }, f1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, h1 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), v1 = [
  h1
];
function p1(t, e) {
  return f(), g("svg", f1, [...v1]);
}
const g1 = { render: p1 }, _1 = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0" }, x1 = { class: "flex leading-5 items-center" }, b1 = ["title"], y1 = ["value"], w1 = { class: "ml-3" }, k1 = { key: 0 }, $1 = { class: "ml-1" }, S1 = { class: "flex leading-5 items-center justify-end" }, C1 = ["disabled"], E1 = ["title"], T1 = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, n = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = Ze(() => {
      const l = e.selectButton.multiple ? n.getSelected().length > 0 : n.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (f(), g("div", _1, [
      o("div", x1, [
        o("div", {
          class: "mx-2",
          title: a(s)("Storage")
        }, [
          W(a(Bo))
        ], 8, b1),
        pe(o("select", {
          "onUpdate:modelValue": u[0] || (u[0] = (h) => a(e).fs.adapter = h),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8",
          tabindex: "-1"
        }, [
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (h) => (f(), g("option", { value: h }, _(h), 9, y1))), 256))
        ], 544), [
          [Ss, a(e).fs.adapter]
        ]),
        o("div", w1, [
          i.value.length ? (f(), g("span", k1, _(a(e).fs.data.files.length) + " items found. ", 1)) : P("", !0),
          o("span", $1, _(a(e).dragSelect.getCount() > 0 ? a(s)("%s item(s) selected.", a(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      o("div", S1, [
        a(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: me(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (h) => a(e).selectButton.click(a(n).getSelected(), h))
        }, _(a(s)("Select")), 11, C1)) : P("", !0),
        o("span", {
          class: "mr-1",
          title: a(s)("About"),
          onClick: u[2] || (u[2] = (h) => a(e).modal.open(Mo))
        }, [
          W(a(g1))
        ], 8, E1)
      ])
    ]));
  }
}, M1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, A1 = /* @__PURE__ */ o("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), D1 = /* @__PURE__ */ o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), L1 = [
  A1,
  D1
];
function V1(t, e) {
  return f(), g("svg", M1, [...L1]);
}
const O1 = { render: V1 }, H1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, B1 = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), R1 = /* @__PURE__ */ o("path", { d: "M15 12H9M12 9v6" }, null, -1), F1 = [
  B1,
  R1
];
function I1(t, e) {
  return f(), g("svg", H1, [...F1]);
}
const N1 = { render: I1 }, U1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, z1 = /* @__PURE__ */ o("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), P1 = /* @__PURE__ */ o("path", { d: "M9 12h6" }, null, -1), j1 = [
  z1,
  P1
];
function q1(t, e) {
  return f(), g("svg", U1, [...j1]);
}
const G1 = { render: q1 };
function Ro(t, e) {
  const s = t.findIndex((r) => r.path === e.path);
  s > -1 ? t[s] = e : t.push(e);
}
const K1 = {
  key: 1,
  class: "cursor-pointer"
}, Fo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Ko({
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
    const r = Wo(t, "modelValue"), n = M(!1);
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
        Ro(s.treeViewData, { path: e.path, ...l });
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
          var p;
          return (!r.value || ((p = i()) == null ? void 0 : p.folders.length)) && c() && (i() || d());
        })
      }, [
        n.value ? (f(), X(a(ln), {
          key: 0,
          class: "p-1"
        })) : (f(), g("div", K1, [
          r.value && ((h = i()) != null && h.folders.length) ? (f(), X(a(G1), {
            key: 0,
            class: "text-gray-600"
          })) : P("", !0),
          r.value ? P("", !0) : (f(), X(a(N1), {
            key: 1,
            class: "text-gray-400"
          }))
        ]))
      ]);
    };
  }
}, W1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, Y1 = /* @__PURE__ */ o("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), X1 = [
  Y1
];
function J1(t, e) {
  return f(), g("svg", W1, [...X1]);
}
const Q1 = { render: J1 }, Z1 = { class: "block" }, ef = { class: "flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded" }, tf = { class: "h-5 w-5 shrink-0" }, sf = ["onClick"], nf = { class: "h-5 w-5 shrink-0" }, of = { class: "text-nowrap" }, rf = { class: "pl-4" }, af = {
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
    const e = ae("ServiceContainer"), s = M([]), r = t, n = Ze(() => {
      var c;
      return ((c = e.treeViewData.find((i) => i.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, i) => {
      const d = Yo("TreeSubfolderList", !0);
      return f(), g("ul", Z1, [
        (f(!0), g(he, null, $e(n.value, (l, u) => (f(), g("li", {
          class: "flex flex-col space-x-0.5 py-0.5 text-sm",
          key: l.path
        }, [
          o("div", ef, [
            o("div", tf, [
              W(Fo, {
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
                a(e).fs.path === l.path ? (f(), X(a(Q1), { key: 0 })) : (f(), X(a(fs), { key: 1 }))
              ]),
              o("div", of, _(l.basename), 1)
            ], 8, sf)
          ]),
          o("div", rf, [
            pe(W(d, {
              adapter: r.adapter,
              path: l.path
            }, null, 8, ["adapter", "path"]), [
              [ze, s.value[l.path]]
            ])
          ])
        ]))), 128))
      ]);
    };
  }
}, lf = { class: "pt-1 px-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between" }, cf = { class: "h-5 w-5 shrink-0" }, df = { class: "mr-3" }, uf = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = M(!1), r = (n) => {
      e.fs.adapter = n, s.value = !s.value, e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: n } }), e.storage.setStore("adapter", n);
    };
    return (n, c) => (f(), g(he, null, [
      o("div", lf, [
        o("div", {
          class: me(["flex flex-1 space-x-1 items-center cursor-pointer", t.storage === a(e).fs.adapter ? "text-gray-700/80 dark:text-gray-300/80 text-bold" : ""]),
          onClick: c[0] || (c[0] = (i) => r(t.storage))
        }, [
          o("div", cf, [
            W(a(Bo))
          ]),
          o("div", null, _(t.storage), 1)
        ], 2),
        o("div", df, [
          W(Fo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": c[1] || (c[1] = (i) => s.value = i)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      pe(W(af, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "overflow-x-auto"
      }, null, 8, ["adapter", "path"]), [
        [ze, s.value]
      ])
    ], 64));
  }
}, mf = { class: "sticky left-0 z-[1] top-0 bg-gray-50 dark:bg-[#242f41] shadow" }, ff = { class: "p-1 uppercase font-bold text-gray-400 dark:text-gray-400 text-xs flex items-center space-x-1" }, hf = { class: "text-nowrap" }, vf = { class: "block" }, pf = { class: "flex pl-2 py-0.5 text-sm space-x-2" }, gf = ["onClick"], _f = ["title"], xf = ["onClick"], bf = { key: 0 }, yf = { class: "rounded-lg p-1 bg-gray-100 dark:bg-gray-700 text-xs text-center" }, wf = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(190), n = (d) => {
      e.pinnedFolders = e.pinnedFolders.filter((l) => l.path !== d.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, c = (d) => {
      const l = d.clientX, u = d.target.parentElement, h = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const m = (v) => {
        r.value = h + v.clientX - l, r.value < 50 && (r.value = 0, e.showTreeView = !1), r.value > 50 && (e.showTreeView = !0);
      }, p = () => {
        const v = u.getBoundingClientRect();
        r.value = v.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", p);
      };
      window.addEventListener("mousemove", m), window.addEventListener("mouseup", p);
    }, i = M(null);
    return Ce(() => {
      ct(i.value, {});
    }), Je(e.fs.data, (d, l) => {
      const u = d.files.filter((h) => h.type === "dir");
      Ro(e.treeViewData, { path: e.fs.path, folders: u.map((h) => ({
        adapter: h.storage,
        path: h.path,
        basename: h.basename
      })) });
    }), (d, l) => (f(), g(he, null, [
      o("div", {
        onClick: l[0] || (l[0] = (u) => a(e).showTreeView = !a(e).showTreeView),
        class: me(["w-full h-full bg-gray-300/10 dark:bg-gray-700/10 z-[1]", a(e).showTreeView ? "backdrop-blur-sm absolute md:hidden" : "hidden"])
      }, null, 2),
      o("div", {
        style: os(a(e).showTreeView ? "min-width:100px;max-width:75%; width: " + r.value + "px" : "width: 0"),
        class: "absolute h-full md:h-auto md:relative shadow-lg shrink-0 transition-[width] ease-in-out duration-200 z-[1] bg-gray-50 dark:bg-[#242f41]"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: i,
          class: "h-full border-r dark:border-gray-600/50 pb-4"
        }, [
          o("div", mf, [
            o("div", ff, [
              o("div", null, [
                W(a(Ho), { class: "text-amber-600" })
              ]),
              o("div", hf, _(a(s)("Pinned Folders")), 1)
            ]),
            o("ul", vf, [
              (f(!0), g(he, null, $e(a(e).pinnedFolders, (u) => (f(), g("li", pf, [
                o("div", {
                  class: "flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer",
                  onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
                }, [
                  W(a(fs), { class: "h-5 w-5" }),
                  o("div", {
                    title: u.path
                  }, _(u.basename), 9, _f)
                ], 8, gf),
                o("div", {
                  class: "cursor-pointer",
                  onClick: (h) => n(u)
                }, [
                  W(a(O1), { class: "p-0.5 text-gray-200 hover:text-gray-400 dark:text-gray-600 hover:dark:text-gray-400" })
                ], 8, xf)
              ]))), 256)),
              a(e).pinnedFolders.length ? P("", !0) : (f(), g("li", bf, [
                o("div", yf, _(a(s)("No folders pinned")), 1)
              ]))
            ])
          ]),
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (u) => (f(), g("div", null, [
            W(uf, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        o("div", {
          onMousedown: c,
          class: me([(a(e).showTreeView, ""), "transition-colors ease-in-out duration-200 top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, kf = { class: "relative flex overflow-hidden h-full" }, $f = {
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
    const s = e, n = _a(t, ae("VueFinderOptions"));
    Xo("ServiceContainer", n);
    const { setStore: c } = n.storage, i = M(null);
    n.root = i;
    const d = n.dragSelect;
    vi(n);
    const l = (h) => {
      Object.assign(n.fs.data, h), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return n.emitter.on("vf-fetch-abort", () => {
      u.abort(), n.fs.loading = !1;
    }), n.emitter.on("vf-fetch", ({ params: h, body: m = null, onSuccess: p = null, onError: v = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(h.q) && (u && u.abort(), n.fs.loading = !0), u = new AbortController();
      const y = u.signal;
      n.requester.send({
        url: "",
        method: h.m || "get",
        params: h,
        body: m,
        abortSignal: y
      }).then((b) => {
        n.fs.adapter = b.adapter, n.persist && (n.fs.path = b.dirname, c("path", n.fs.path)), ["index", "search"].includes(h.q) && (n.fs.loading = !1), x || n.modal.close(), l(b), p && p(b);
      }).catch((b) => {
        console.error(b), v && v(b);
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
          onMousedown: m[0] || (m[0] = (p) => a(n).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (p) => a(n).emitter.emit("vf-contextmenu-hide"))
        }, [
          W(Yd),
          W($0),
          o("div", kf, [
            W(wf),
            W(r1)
          ]),
          W(T1)
        ], 38),
        W(Jo, { name: "fade" }, {
          default: se(() => [
            a(n).modal.visible ? (f(), X(Qo(a(n).modal.type), { key: 0 })) : P("", !0)
          ]),
          _: 1
        }),
        W(i1)
      ], 2)
    ], 512));
  }
}, Hf = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", $f);
  }
};
export {
  Hf as default
};
