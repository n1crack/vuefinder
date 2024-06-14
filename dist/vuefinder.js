var zn = Object.defineProperty;
var Pn = (t, e, s) => e in t ? zn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var mo = (t, e, s) => Pn(t, typeof e != "symbol" ? e + "" : e, s);
import { reactive as Ot, watch as mt, ref as T, shallowRef as jn, onMounted as Ce, onUnmounted as qs, onUpdated as Ro, nextTick as ft, computed as Je, inject as ae, openBlock as f, createElementBlock as g, withKeys as $t, unref as a, createElementVNode as n, withModifiers as nt, renderSlot as Dt, normalizeClass as me, toDisplayString as _, createBlock as X, withCtx as se, Fragment as he, renderList as $e, createCommentVNode as P, withDirectives as ve, vModelCheckbox as jt, createTextVNode as ee, createVNode as W, vModelSelect as Ss, isRef as Fo, vModelText as St, onBeforeUnmount as Io, customRef as qn, vShow as ze, TransitionGroup as Gn, normalizeStyle as ns, mergeModels as Kn, useModel as Wn, resolveComponent as Yn, provide as Xn, Transition as Jn, resolveDynamicComponent as Qn } from "vue";
import Zn from "mitt";
import er from "dragselect";
import tr from "@uppy/core";
import sr from "@uppy/xhr-upload";
import or from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import nr from "cropperjs";
import "microtip/microtip.css";
var Bo;
const _s = (Bo = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Bo.getAttribute("content");
class rr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    mo(this, "config");
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
    const o = Object.assign({}, s.headers, r, e.headers), c = Object.assign({}, s.params, e.params), i = e.body, d = s.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, s.body != null && Object.entries(this.config.body).forEach(([m, v]) => {
      u.append(m, v);
    })) : (u = { ...i }, s.body != null && Object.assign(u, this.config.body)));
    const h = {
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
    const s = this.transformRequestParams(e), r = e.responseType || "json", o = {
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
  mt(s, r);
  function r() {
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
async function ir(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function cr(t, e, s, r) {
  const { getStore: o, setStore: c } = t, i = T({}), d = T(o("locale", e)), l = (m, v = e) => {
    ir(m, r).then((p) => {
      i.value = p, c("locale", m), d.value = m, c("translations", p), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + m }), s.emit("vf-language-saved"));
    }).catch((p) => {
      v ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(v, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !o("locale") && !r.length ? l(e) : i.value = o("translations");
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
}, dr = Object.values(pe), ur = "2.5.2";
function No(t, e, s, r, o) {
  return (e = Math, s = e.log, r = 1024, o = s(t) / s(r) | 0, t / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function Uo(t, e, s, r, o) {
  return (e = Math, s = e.log, r = 1e3, o = s(t) / s(r) | 0, t / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function mr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const et = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function fr(t, e) {
  const s = T(et.SYSTEM), r = T(et.LIGHT);
  s.value = t.getStore("theme", e ?? et.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    s.value === et.DARK || s.value === et.SYSTEM && i.matches ? r.value = et.DARK : r.value = et.LIGHT;
  };
  return c(o), o.addEventListener("change", c), {
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
      s.value = i, i !== et.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(o);
    }
  };
}
function hr() {
  const t = jn(null), e = T(!1), s = T();
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
  const { o: s, i: r, u: o } = t;
  let c = s, i;
  const d = (h, m) => {
    const v = c, p = h, b = m || (r ? !r(v, p) : v !== p);
    return (b || o) && (c = p, i = v), [c, b, i];
  };
  return [e ? (h) => d(e(c, i), h) : d, (h) => [c, !!h, i]];
}, zo = typeof window < "u" && typeof document < "u", Ae = zo ? window : {}, Po = Math.max, pr = Math.min, Cs = Math.round, Jt = Math.abs, fo = Math.sign, jo = Ae.cancelAnimationFrame, Gs = Ae.requestAnimationFrame, Qt = Ae.setTimeout, Es = Ae.clearTimeout, rs = (t) => typeof Ae[t] < "u" ? Ae[t] : void 0, vr = rs("MutationObserver"), ho = rs("IntersectionObserver"), Zt = rs("ResizeObserver"), Ts = rs("ScrollTimeline"), qo = zo && Node.ELEMENT_NODE, { toString: Df, hasOwnProperty: bs } = Object.prototype, as = (t) => t === void 0, Ks = (t) => t === null, je = (t) => typeof t == "number", ls = (t) => typeof t == "string", Go = (t) => typeof t == "boolean", Fe = (t) => typeof t == "function", qe = (t) => Array.isArray(t), Lt = (t) => typeof t == "object" && !qe(t) && !Ks(t), is = (t) => {
  const e = !!t && t.length, s = je(e) && e > -1 && e % 1 == 0;
  return qe(t) || !Fe(t) && s ? e > 0 && Lt(t) ? e - 1 in t : !0 : !1;
}, es = (t) => {
  if (!t || !Lt(t))
    return !1;
  let e;
  const s = "constructor", r = t[s], o = r && r.prototype, c = bs.call(t, s), i = o && bs.call(o, "isPrototypeOf");
  if (r && !c && !i)
    return !1;
  for (e in t)
    ;
  return as(e) || bs.call(t, e);
}, ts = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === qo : !1;
}, cs = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === qo : !1;
};
function ce(t, e) {
  if (is(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else t && ce(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const Ws = (t, e) => t.indexOf(e) >= 0, Xe = (t, e) => t.concat(e), be = (t, e, s) => (!ls(e) && is(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ct = (t) => Array.from(t || []), Ko = (t) => qe(t) ? t : [t], Ms = (t) => !!t && !t.length, po = (t) => ct(new Set(t)), Ie = (t, e, s) => {
  ce(t, (o) => o && o.apply(void 0, e || [])), !s && (t.length = 0);
}, Wo = "paddingTop", Yo = "paddingRight", Xo = "paddingLeft", Jo = "paddingBottom", Qo = "marginLeft", Zo = "marginRight", en = "marginBottom", gr = "overflowX", _r = "overflowY", xt = "width", yt = "height", ot = "visible", dt = "hidden", wt = "scroll", br = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, ds = (t, e, s, r) => {
  if (t && e) {
    let o = !0;
    return ce(s, (c) => {
      const i = t[c], d = e[c];
      i !== d && (o = !1);
    }), o;
  }
  return !1;
}, tn = (t, e) => ds(t, e, ["w", "h"]), Wt = (t, e) => ds(t, e, ["x", "y"]), xr = (t, e) => ds(t, e, ["t", "r", "b", "l"]), rt = () => {
}, J = (t, ...e) => t.bind(0, ...e), ut = (t) => {
  let e;
  const s = t ? Qt : Gs, r = t ? Es : jo;
  return [(o) => {
    r(e), e = s(() => o(), Fe(t) ? t() : t);
  }, () => r(e)];
}, As = (t, e) => {
  const { _: s, p: r, v: o, m: c } = e || {};
  let i, d, l, u, h = rt;
  const m = function(x) {
    h(), Es(i), u = i = d = void 0, h = rt, t.apply(this, x);
  }, v = (y) => c && d ? c(d, y) : y, p = () => {
    h !== rt && m(v(l) || l);
  }, b = function() {
    const x = ct(arguments), M = Fe(s) ? s() : s;
    if (je(M) && M >= 0) {
      const U = Fe(r) ? r() : r, H = je(U) && U >= 0, A = M > 0 ? Qt : Gs, L = M > 0 ? Es : jo, D = v(x) || x, V = m.bind(0, D);
      let E;
      h(), o && !u ? (V(), u = !0, E = A(() => u = void 0, M)) : (E = A(V, M), H && !i && (i = Qt(p, U))), h = () => L(E), d = l = D;
    } else
      m(x);
  };
  return b.S = p, b;
}, sn = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Qe = (t) => t ? Object.keys(t) : [], re = (t, e, s, r, o, c, i) => {
  const d = [e, s, r, o, c, i];
  return (typeof t != "object" || Ks(t)) && !Fe(t) && (t = {}), ce(d, (l) => {
    ce(l, (u, h) => {
      const m = l[h];
      if (t === m)
        return !0;
      const v = qe(m);
      if (m && es(m)) {
        const p = t[h];
        let b = p;
        v && !qe(p) ? b = [] : !v && !es(p) && (b = {}), t[h] = re(b, m);
      } else
        t[h] = v ? m.slice() : m;
    });
  }), t;
}, on = (t, e) => ce(re({}, t), (s, r, o) => {
  s === void 0 ? delete o[r] : s && es(s) && (o[r] = on(s));
}), Ys = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ds = (t, e, s) => Po(t, pr(e, s)), ht = (t) => ct(new Set((qe(t) ? t : (t || "").split(" ")).filter((e) => e))), Xs = (t, e) => t && t.getAttribute(e), vo = (t, e) => t && t.hasAttribute(e), Ye = (t, e, s) => {
  ce(ht(e), (r) => {
    t && t.setAttribute(r, String(s || ""));
  });
}, Ue = (t, e) => {
  ce(ht(e), (s) => t && t.removeAttribute(s));
}, us = (t, e) => {
  const s = ht(Xs(t, e)), r = J(Ye, t, e), o = (c, i) => {
    const d = new Set(s);
    return ce(ht(c), (l) => {
      d[i](l);
    }), ct(d).join(" ");
  };
  return {
    O: (c) => r(o(c, "delete")),
    $: (c) => r(o(c, "add")),
    C: (c) => {
      const i = ht(c);
      return i.reduce((d, l) => d && s.includes(l), i.length > 0);
    }
  };
}, nn = (t, e, s) => (us(t, e).O(s), J(Js, t, e, s)), Js = (t, e, s) => (us(t, e).$(s), J(nn, t, e, s)), Ls = (t, e, s, r) => (r ? Js : nn)(t, e, s), Qs = (t, e, s) => us(t, e).C(s), rn = (t) => us(t, "class"), an = (t, e) => {
  rn(t).O(e);
}, Zs = (t, e) => (rn(t).$(e), J(an, t, e)), ln = (t, e) => {
  const s = [], r = e ? cs(e) && e : document;
  return r ? be(s, r.querySelectorAll(t)) : s;
}, yr = (t, e) => {
  const s = e ? cs(e) && e : document;
  return s ? s.querySelector(t) : null;
}, ss = (t, e) => cs(t) ? t.matches(e) : !1, cn = (t) => ss(t, "body"), Vs = (t) => t ? ct(t.childNodes) : [], kt = (t) => t && t.parentElement, _t = (t, e) => cs(t) && t.closest(e), Os = (t) => document.activeElement, wr = (t, e, s) => {
  const r = _t(t, e), o = t && yr(s, r), c = _t(o, e) === r;
  return r && o ? r === t || o === t || c && _t(_t(t, s), e) !== r : !1;
}, lt = (t) => {
  if (is(t))
    ce(ct(t), (e) => lt(e));
  else if (t) {
    const e = kt(t);
    e && e.removeChild(t);
  }
}, dn = (t, e, s) => {
  if (s && t) {
    let r = e, o;
    return is(s) ? (o = document.createDocumentFragment(), ce(s, (c) => {
      c === r && (r = c.previousSibling), o.appendChild(c);
    })) : o = s, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(o, r || null), () => lt(s);
  }
  return rt;
}, Oe = (t, e) => dn(t, null, e), go = (t, e) => dn(kt(t), t && t.nextSibling, e), bt = (t) => {
  const e = document.createElement("div");
  return Ye(e, "class", t), e;
}, un = (t) => {
  const e = bt();
  return e.innerHTML = t.trim(), ce(Vs(e), (s) => lt(s));
}, kr = /^--/, _o = (t, e) => t.getPropertyValue(e) || t[e] || "", eo = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, qt = (t) => eo(parseFloat(t || "")), bo = (t) => `${(eo(t) * 100).toFixed(3)}%`, Hs = (t) => `${eo(t)}px`;
function Vt(t, e) {
  t && e && ce(e, (s, r) => {
    try {
      const o = t.style, c = je(s) ? Hs(s) : (s || "") + "";
      kr.test(r) ? o.setProperty(r, c) : o[r] = c;
    } catch {
    }
  });
}
function pt(t, e, s) {
  const r = ls(e);
  let o = r ? "" : {};
  if (t) {
    const c = Ae.getComputedStyle(t, s) || t.style;
    o = r ? _o(c, e) : ct(e).reduce((i, d) => (i[d] = _o(c, d), i), o);
  }
  return o;
}
const xo = (t, e, s) => {
  const r = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${r}top${o}`, i = `${r}right${o}`, d = `${r}bottom${o}`, l = `${r}left${o}`, u = pt(t, [c, i, d, l]);
  return {
    t: qt(u[c]),
    r: qt(u[i]),
    b: qt(u[d]),
    l: qt(u[l])
  };
}, xs = (t, e) => `translate${Lt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, $r = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Sr = {
  w: 0,
  h: 0
}, ms = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Sr, Cr = (t) => ms("inner", t || Ae), Mt = J(ms, "offset"), mn = J(ms, "client"), Bs = J(ms, "scroll"), to = (t) => {
  const e = parseFloat(pt(t, xt)) || 0, s = parseFloat(pt(t, yt)) || 0;
  return {
    w: e - Cs(e),
    h: s - Cs(s)
  };
}, At = (t) => t.getBoundingClientRect(), Er = (t) => !!t && $r(t), Rs = (t) => !!(t && (t[yt] || t[xt])), fn = (t, e) => {
  const s = Rs(t);
  return !Rs(e) && s;
}, yo = (t, e, s, r) => {
  ce(ht(e), (o) => {
    t && t.removeEventListener(o, s, r);
  });
}, fe = (t, e, s, r) => {
  var o;
  const c = (o = r && r.H) != null ? o : !0, i = r && r.I || !1, d = r && r.A || !1, l = {
    passive: c,
    capture: i
  };
  return J(Ie, ht(e).map((u) => {
    const h = d ? (m) => {
      yo(t, u, h, i), s && s(m);
    } : s;
    return t && t.addEventListener(u, h, l), J(yo, t, u, h, i);
  }));
}, hn = (t) => t.stopPropagation(), Fs = (t) => t.preventDefault(), pn = (t) => hn(t) || Fs(t), Pe = (t, e) => {
  const { x: s, y: r } = je(e) ? {
    x: e,
    y: e
  } : e || {};
  je(s) && (t.scrollLeft = s), je(r) && (t.scrollTop = r);
}, He = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), vn = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), Tr = (t, e) => {
  const { T: s, D: r } = t, { w: o, h: c } = e, i = (m, v, p) => {
    let b = fo(m) * p, y = fo(v) * p;
    if (b === y) {
      const x = Jt(m), M = Jt(v);
      y = x > M ? 0 : y, b = x < M ? 0 : b;
    }
    return b = b === y ? 0 : b, [b + 0, y + 0];
  }, [d, l] = i(s.x, r.x, o), [u, h] = i(s.y, r.y, c);
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
}, wo = ({ T: t, D: e }) => {
  const s = (r, o) => r === 0 && r <= o;
  return {
    x: s(t.x, e.x),
    y: s(t.y, e.y)
  };
}, ko = ({ T: t, D: e }, s) => {
  const r = (o, c, i) => Ds(0, 1, (o - i) / (o - c) || 0);
  return {
    x: r(t.x, e.x, s.x),
    y: r(t.y, e.y, s.y)
  };
}, Is = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, $o = (t, e) => {
  ce(Ko(e), t);
}, Ns = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (c, i) => {
    if (c) {
      const d = e.get(c);
      $o((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (c, i) => {
    if (ls(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), $o((h) => {
        Fe(h) && u.add(h);
      }, i), J(s, c, i);
    }
    Go(i) && i && s();
    const d = Qe(c), l = [];
    return ce(d, (u) => {
      const h = c[u];
      h && be(l, r(u, h));
    }), J(Ie, l);
  }, o = (c, i) => {
    ce(ct(e.get(c)), (d) => {
      i && !Ms(i) ? d.apply(0, i) : d();
    });
  };
  return r(t || {}), [r, s, o];
}, So = (t) => JSON.stringify(t, (e, s) => {
  if (Fe(s))
    throw 0;
  return s;
}), Co = (t, e) => t ? `${e}`.split(".").reduce((s, r) => s && sn(s, r) ? s[r] : void 0, t) : void 0, Mr = {
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
}, gn = (t, e) => {
  const s = {}, r = Xe(Qe(e), Qe(t));
  return ce(r, (o) => {
    const c = t[o], i = e[o];
    if (Lt(c) && Lt(i))
      re(s[o] = {}, gn(c, i)), Ys(s[o]) && delete s[o];
    else if (sn(e, o) && i !== c) {
      let d = !0;
      if (qe(c) || qe(i))
        try {
          So(c) === So(i) && (d = !1);
        } catch {
        }
      d && (s[o] = i);
    }
  }), s;
}, Eo = (t, e, s) => (r) => [Co(t, r), s || Co(e, r) !== void 0], Ct = "data-overlayscrollbars", Yt = "os-environment", Gt = `${Yt}-scrollbar-hidden`, ys = `${Ct}-initialize`, Xt = "noClipping", To = `${Ct}-body`, at = Ct, Ar = "host", st = `${Ct}-viewport`, Dr = gr, Lr = _r, Vr = "arrange", _n = "measuring", bn = "scrollbarHidden", Or = "scrollbarPressed", Hr = "noContent", Us = `${Ct}-padding`, Mo = `${Ct}-content`, so = "os-size-observer", Br = `${so}-appear`, Rr = `${so}-listener`, Fr = "os-trinsic-observer", Ir = "os-theme-none", Be = "os-scrollbar", Nr = `${Be}-rtl`, Ur = `${Be}-horizontal`, zr = `${Be}-vertical`, xn = `${Be}-track`, oo = `${Be}-handle`, Pr = `${Be}-visible`, jr = `${Be}-cornerless`, Ao = `${Be}-interaction`, Do = `${Be}-unusable`, zs = `${Be}-auto-hide`, Lo = `${zs}-hidden`, Vo = `${Be}-wheel`, qr = `${xn}-interactive`, Gr = `${oo}-interactive`;
let ws;
const Kr = () => {
  const t = (k, U, H) => {
    Oe(document.body, k), Oe(document.body, k);
    const A = mn(k), L = Mt(k), B = to(U);
    return H && lt(k), {
      x: L.h - A.h + B.h,
      y: L.w - A.w + B.w
    };
  }, e = (k) => {
    let U = !1;
    const H = Zs(k, Gt);
    try {
      U = pt(k, "scrollbar-width") === "none" || pt(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return H(), U;
  }, s = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = un(`<div class="${Yt}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, [i, , d] = Ns(), [l, u] = Ve({
    o: t(o, c),
    i: Wt
  }, J(t, o, c, !0)), [h] = u(), m = e(o), v = {
    x: h.x === 0,
    y: h.y === 0
  }, p = {
    elements: {
      host: null,
      padding: !m,
      viewport: (k) => m && cn(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, b = re({}, Mr), y = J(re, {}, b), x = J(re, {}, p), M = {
    k: h,
    M: v,
    R: m,
    V: !!Ts,
    L: J(i, "r"),
    P: x,
    U: (k) => re(p, k) && x(),
    N: y,
    q: (k) => re(b, k) && y(),
    B: re({}, p),
    F: re({}, b)
  };
  if (Ue(o, "style"), lt(o), fe(Ae, "resize", () => {
    d("r", []);
  }), Fe(Ae.matchMedia) && !m && (!v.x || !v.y)) {
    const k = (U) => {
      const H = Ae.matchMedia(`(resolution: ${Ae.devicePixelRatio}dppx)`);
      fe(H, "change", () => {
        U(), k(U);
      }, {
        A: !0
      });
    };
    k(() => {
      const [U, H] = l();
      re(M.k, U), d("r", [H]);
    });
  }
  return M;
}, Ge = () => (ws || (ws = Kr()), ws), yn = (t, e) => Fe(e) ? e.apply(0, t) : e, Wr = (t, e, s, r) => {
  const o = as(r) ? s : r;
  return yn(t, o) || e.apply(0, t);
}, wn = (t, e, s, r) => {
  const o = as(r) ? s : r, c = yn(t, o);
  return !!c && (ts(c) ? c : e.apply(0, t));
}, Yr = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { M: o, R: c, P: i } = Ge(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = s ?? d, h = as(r) ? l : r, m = (o.x || o.y) && u, v = t && (Ks(h) ? !c : h);
  return !!m || !!v;
}, no = /* @__PURE__ */ new WeakMap(), Xr = (t, e) => {
  no.set(t, e);
}, Jr = (t) => {
  no.delete(t);
}, kn = (t) => no.get(t), Qr = (t, e, s) => {
  let r = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, i = (d) => {
    if (o && s) {
      const l = s.map((u) => {
        const [h, m] = u || [];
        return [m && h ? (d || ln)(h, t) : [], m];
      });
      ce(l, (u) => ce(u[0], (h) => {
        const m = u[1], v = o.get(h) || [];
        if (t.contains(h) && m) {
          const b = fe(h, m, (y) => {
            r ? (b(), o.delete(h)) : e(y);
          });
          o.set(h, be(v, b));
        } else
          Ie(v), o.delete(h);
      }));
    }
  };
  return i(), [c, i];
}, Oo = (t, e, s, r) => {
  let o = !1;
  const { j: c, X: i, Y: d, W: l, J: u, K: h } = r || {}, m = As(() => o && s(!0), {
    _: 33,
    p: 99
  }), [v, p] = Qr(t, m, d), b = c || [], y = i || [], x = Xe(b, y), M = (U, H) => {
    if (!Ms(H)) {
      const A = u || rt, L = h || rt, B = [], D = [];
      let V = !1, E = !1;
      if (ce(H, (S) => {
        const { attributeName: O, target: $, type: w, oldValue: I, addedNodes: R, removedNodes: oe } = S, de = w === "attributes", le = w === "childList", F = t === $, Z = de && O, te = Z && Xs($, O || ""), Y = ls(te) ? te : null, ue = Z && I !== Y, z = Ws(y, O) && ue;
        if (e && (le || !F)) {
          const q = de && ue, j = q && l && ss($, l), N = (j ? !A($, O, I, Y) : !de || q) && !L(S, !!j, t, r);
          ce(R, (G) => be(B, G)), ce(oe, (G) => be(B, G)), E = E || N;
        }
        !e && F && ue && !A($, O, I, Y) && (be(D, O), V = V || z);
      }), p((S) => po(B).reduce((O, $) => (be(O, ln(S, $)), ss($, S) ? be(O, $) : O), [])), e)
        return !U && E && s(!1), [!1];
      if (!Ms(D) || V) {
        const S = [po(D), V];
        return !U && s.apply(0, S), S;
      }
    }
  }, k = new vr(J(M, !1));
  return [() => (k.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: x,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (v(), k.disconnect(), o = !1);
  }), () => {
    if (o)
      return m.S(), M(!0, k.takeRecords());
  }];
}, $n = {}, Sn = {}, Zr = (t) => {
  ce(t, (e) => ce(e, (s, r) => {
    $n[r] = e[r];
  }));
}, Cn = (t, e, s) => Qe(t).map((r) => {
  const { static: o, instance: c } = t[r], [i, d, l] = s || [], u = s ? c : o;
  if (u) {
    const h = s ? u(i, d, e) : u(e);
    return (l || Sn)[r] = h;
  }
}), Ht = (t) => Sn[t], ea = "__osOptionsValidationPlugin", ta = "__osSizeObserverPlugin", sa = (t, e) => {
  const { M: s } = e, [r, o] = t("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, o];
}, os = (t) => t.indexOf(ot) === 0, oa = (t, e) => {
  const s = (o, c, i, d) => {
    const l = o === ot ? dt : o.replace(`${ot}-`, ""), u = os(o), h = os(i);
    return !c && !d ? dt : u && h ? ot : u ? c && d ? l : c ? ot : dt : c ? l : h && d ? ot : dt;
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
}, En = "__osScrollbarsHidingPlugin", na = "__osClickScrollPlugin", Tn = (t, e, s) => {
  const { dt: r } = s || {}, o = Ht(ta), [c] = Ve({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = un(`<div class="${so}"><div class="${Rr}"></div></div>`)[0], u = l.firstChild, h = (m) => {
      const v = m instanceof ResizeObserverEntry;
      let p = !1, b = !1;
      if (v) {
        const [y, , x] = c(m.contentRect), M = Rs(y);
        b = fn(y, x), p = !b && !M;
      } else
        b = m === !0;
      p || e({
        ft: !0,
        dt: b
      });
    };
    if (Zt) {
      const m = new Zt((v) => h(v.pop()));
      m.observe(u), be(i, () => {
        m.disconnect();
      });
    } else if (o) {
      const [m, v] = o(u, h, r);
      be(i, Xe([Zs(l, Br), fe(l, "animationstart", m)], v));
    } else
      return rt;
    return J(Ie, be(i, Oe(t, l)));
  };
}, ra = (t, e) => {
  let s;
  const r = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, o = bt(Fr), [c] = Ve({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const h = c(r(l)), [, m] = h;
      return m && !u && e(h) && [h];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (ho)
      s = new ho(J(d, !1), {
        root: t
      }), s.observe(o), be(l, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const h = Mt(o);
        i(h);
      };
      be(l, Tn(o, u)()), u();
    }
    return J(Ie, be(l, Oe(t, o)));
  }, () => s && d(!0, s.takeRecords())];
}, aa = (t, e, s, r) => {
  let o, c, i, d, l, u;
  const h = `[${at}]`, m = `[${st}]`, v = [], p = ["wrap", "cols", "rows"], b = ["id", "class", "style", "open"], { vt: y, ht: x, ot: M, gt: k, bt: U, wt: H, nt: A, yt: L, St: B, Ot: D } = t, V = (C) => pt(C, "direction") === "rtl", E = {
    $t: !1,
    ct: V(y)
  }, S = Ge(), O = Ht(En), [$] = Ve({
    i: tn,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = O && O.tt(t, e, E, S, s).ut, G = !(L && A) && Qs(x, at, Xt), K = !A && B(Vr), Q = K && He(k), ie = D(_n, G), ye = K && C && C()[0], Se = Bs(M), ne = to(M);
    return ye && ye(), Pe(k, Q), G && ie(), {
      w: Se.w + ne.w,
      h: Se.h + ne.h
    };
  }), w = H ? p : Xe(b, p), I = As(r, {
    _: () => o,
    p: () => c,
    m(C, N) {
      const [G] = C, [K] = N;
      return [Xe(Qe(G), Qe(K)).reduce((Q, ie) => (Q[ie] = G[ie] || K[ie], Q), {})];
    }
  }), R = (C) => {
    const N = V(y);
    re(C, {
      Ct: u !== N
    }), re(E, {
      ct: N
    }), u = N;
  }, oe = (C, N) => {
    const [G, K] = C, Q = {
      xt: K
    };
    return re(E, {
      $t: G
    }), !N && r(Q), Q;
  }, de = ({ ft: C, dt: N }) => {
    const K = !(C && !N) && S.R ? I : r, Q = {
      ft: C || N,
      dt: N
    };
    R(Q), K(Q);
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
  }, [Z, te] = U ? ra(x, oe) : [], Y = !A && Tn(x, de, {
    dt: !0
  }), [ue, z] = Oo(x, !1, F, {
    X: b,
    j: Xe(b, v)
  }), q = A && Zt && new Zt((C) => {
    const N = C[C.length - 1].contentRect;
    de({
      ft: !0,
      dt: fn(N, l)
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
    q && q.observe(x);
    const C = Y && Y(), N = Z && Z(), G = ue(), K = S.L((Q) => {
      Q ? I({
        zt: Q
      }) : j();
    });
    return () => {
      q && q.disconnect(), C && C(), N && N(), d && d(), G(), K();
    };
  }, ({ It: C, At: N, Tt: G }) => {
    const K = {}, [Q] = C("update.ignoreMutation"), [ie, ye] = C("update.attributes"), [Se, ne] = C("update.elementEvents"), [we, Ee] = C("update.debounce"), Re = ne || ye, ke = N || G, De = (xe) => Fe(Q) && Q(xe);
    if (Re) {
      i && i(), d && d();
      const [xe, ge] = Oo(U || M, !0, le, {
        j: Xe(w, ie || []),
        Y: Se,
        W: h,
        K: (Te, _e) => {
          const { target: Me, attributeName: Le } = Te;
          return (!_e && Le && !A ? wr(Me, h, m) : !1) || !!_t(Me, `.${Be}`) || !!De(Te);
        }
      });
      d = xe(), i = ge;
    }
    if (Ee)
      if (I.S(), qe(we)) {
        const xe = we[0], ge = we[1];
        o = je(xe) && xe, c = je(ge) && ge;
      } else je(we) ? (o = we, c = !1) : (o = !1, c = !1);
    if (ke) {
      const xe = z(), ge = te && te(), Te = i && i();
      xe && re(K, F(xe[0], xe[1], ke)), ge && re(K, oe(ge[0], ke)), Te && re(K, le(Te[0], ke));
    }
    return R(K), K;
  }, E];
}, la = (t, e, s, r) => {
  const { P: o } = Ge(), { scrollbars: c } = o(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: h, gt: m, yt: v, nt: p } = e, { scrollbars: b } = h ? {} : t, { slot: y } = b || {}, x = /* @__PURE__ */ new Map(), M = (z) => Ts && new Ts({
    source: m,
    axis: z
  }), k = {
    x: M("x"),
    y: M("y")
  }, U = wn([d, l, u], () => p && v ? d : l, i, y), H = (z, q) => {
    if (q) {
      const Q = z ? xt : yt, { kt: ie, Mt: ye } = q, Se = At(ye)[Q], ne = At(ie)[Q];
      return Ds(0, 1, Se / ne || 0);
    }
    const j = z ? "x" : "y", { Rt: C, Vt: N } = s, G = N[j], K = C[j];
    return Ds(0, 1, G / (G + K) || 0);
  }, A = (z, q, j) => {
    const C = H(j, z);
    return 1 / C * (1 - C) * q;
  }, L = (z) => re(z, {
    clear: ["left"]
  }), B = (z) => {
    x.forEach((q, j) => {
      (z ? Ws(Ko(z), j) : !0) && (ce(q || [], (N) => {
        N && N.cancel();
      }), x.delete(j));
    });
  }, D = (z, q, j, C) => {
    const N = x.get(z) || [], G = N.find((K) => K && K.timeline === q);
    G ? G.effect = new KeyframeEffect(z, j, {
      composite: C
    }) : x.set(z, Xe(N, [z.animate(j, {
      timeline: q,
      composite: C
    })]));
  }, V = (z, q, j) => {
    const C = j ? Zs : an;
    ce(z, (N) => {
      C(N.Lt, q);
    });
  }, E = (z, q) => {
    ce(z, (j) => {
      const [C, N] = q(j);
      Vt(C, N);
    });
  }, S = (z, q) => {
    E(z, (j) => {
      const { Mt: C } = j;
      return [C, {
        [q ? xt : yt]: bo(H(q))
      }];
    });
  }, O = (z, q) => {
    const { Pt: j } = s, C = q ? "x" : "y", N = k[C], G = wo(j)[C], K = (Q, ie) => xs(bo(A(Q, G ? ie : 1 - ie, q)), q);
    N ? ce(z, (Q) => {
      const { Mt: ie } = Q;
      D(ie, N, L({
        transform: [0, 1].map((ye) => K(Q, ye))
      }));
    }) : E(z, (Q) => [Q.Mt, {
      transform: K(Q, ko(j, He(m))[C])
    }]);
  }, $ = (z) => p && !v && kt(z) === u, w = [], I = [], R = [], oe = (z, q, j) => {
    const C = Go(j), N = C ? j : !0, G = C ? !j : !0;
    N && V(I, z, q), G && V(R, z, q);
  }, de = () => {
    S(I, !0), S(R);
  }, le = () => {
    O(I, !0), O(R);
  }, F = () => {
    if (p) {
      const { Rt: z, Pt: q } = s, j = wo(q), C = 0.5;
      if (k.x && k.y)
        ce(Xe(R, I), ({ Lt: N }) => {
          if ($(N)) {
            const G = (K) => D(N, k[K], L({
              transform: [0, j[K] ? 1 : -1].map((Q) => xs(Hs(Q * (z[K] - C)), K === "x"))
            }), "add");
            G("x"), G("y");
          } else
            B(N);
        });
      else {
        const N = ko(q, He(m)), G = (K) => {
          const { Lt: Q } = K, ie = $(Q) && Q, ye = (Se, ne, we) => {
            const Ee = ne * Se;
            return Hs(we ? Ee : -Ee);
          };
          return [ie, ie && {
            transform: xs({
              x: ye(N.x, z.x, j.x),
              y: ye(N.y, z.y, j.y)
            })
          }];
        };
        E(I, G), E(R, G);
      }
    }
  }, Z = (z) => {
    const j = bt(`${Be} ${z ? Ur : zr}`), C = bt(xn), N = bt(oo), G = {
      Lt: j,
      kt: C,
      Mt: N
    };
    return be(z ? I : R, G), be(w, [Oe(j, C), Oe(C, N), J(lt, j), B, r(G, oe, O, z)]), G;
  }, te = J(Z, !0), Y = J(Z, !1), ue = () => (Oe(U, I[0].Lt), Oe(U, R[0].Lt), J(Ie, w));
  return te(), Y(), [{
    Ut: de,
    Nt: le,
    qt: F,
    Bt: oe,
    Ft: {
      V: k.x,
      jt: I,
      Xt: te,
      Yt: J(E, I)
    },
    Wt: {
      V: k.y,
      jt: R,
      Xt: Y,
      Yt: J(E, R)
    }
  }, ue];
}, ia = (t, e, s, r) => (o, c, i, d) => {
  const { ht: l, ot: u, nt: h, gt: m, Jt: v, Ot: p } = e, { Lt: b, kt: y, Mt: x } = o, [M, k] = ut(333), [U, H] = ut(444), [A, L] = ut(), B = J(i, [o], d), D = ($) => {
    Fe(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: $.x,
      top: $.y
    });
  }, V = d ? xt : yt, E = () => {
    const $ = "pointerup pointercancel lostpointercapture", w = `client${d ? "X" : "Y"}`, I = d ? "left" : "top", R = d ? "w" : "h", oe = d ? "x" : "y", de = (le, F) => (Z) => {
      const { Rt: te } = s, Y = Mt(y)[R] - Mt(x)[R], z = F * Z / Y * te[oe];
      Pe(m, {
        [oe]: le + z
      });
    };
    return fe(y, "pointerdown", (le) => {
      const F = _t(le.target, `.${oo}`) === x, Z = F ? x : y, te = t.scrollbars, { button: Y, isPrimary: ue, pointerType: z } = le, { pointers: q } = te;
      if (Y === 0 && ue && te[F ? "dragScroll" : "clickScroll"] && (q || []).includes(z)) {
        H();
        const C = !F && le.shiftKey, N = J(At, x), G = J(At, y), K = (_e, Me) => (_e || N())[I] - (Me || G())[I], Q = Cs(At(m)[V]) / Mt(m)[R] || 1, ie = de(He(m)[oe], 1 / Q), ye = le[w], Se = N(), ne = G(), we = Se[V], Ee = K(Se, ne) + we / 2, Re = ye - ne[I], ke = F ? 0 : Re - Ee, De = (_e) => {
          Ie(Te), Z.releasePointerCapture(_e.pointerId);
        }, xe = () => p(Or, !0), ge = xe(), Te = [() => {
          const _e = He(m);
          ge();
          const Me = He(m), Le = {
            x: Me.x - _e.x,
            y: Me.y - _e.y
          };
          (Jt(Le.x) > 3 || Jt(Le.y) > 3) && (xe(), Pe(m, _e), D(Le), U(ge));
        }, fe(v, $, De), fe(v, "selectstart", (_e) => Fs(_e), {
          H: !1
        }), fe(y, $, De), fe(y, "pointermove", (_e) => {
          const Me = _e[w] - ye;
          (F || C) && ie(ke + Me);
        })];
        if (Z.setPointerCapture(le.pointerId), C)
          ie(ke);
        else if (!F) {
          const _e = Ht(na);
          _e && be(Te, _e(ie, K, ke, we, Re));
        }
      }
    });
  };
  let S = !0;
  const O = ($) => $.propertyName.indexOf(V) > -1;
  return J(Ie, [fe(x, "pointermove pointerleave", r), fe(b, "pointerenter", () => {
    c(Ao, !0);
  }), fe(b, "pointerleave pointercancel", () => {
    c(Ao, !1);
  }), !h && fe(b, "mousedown", () => {
    const $ = Os();
    (vo($, st) || vo($, at) || $ === document.body) && Qt(J(Is, u), 25);
  }), fe(b, "wheel", ($) => {
    const { deltaX: w, deltaY: I, deltaMode: R } = $;
    S && R === 0 && kt(b) === l && D({
      x: w,
      y: I
    }), S = !1, c(Vo, !0), M(() => {
      S = !0, c(Vo);
    }), Fs($);
  }, {
    H: !1,
    I: !0
  }), fe(x, "transitionstart", ($) => {
    if (O($)) {
      const w = () => {
        B(), A(w);
      };
      w();
    }
  }), fe(x, "transitionend transitioncancel", ($) => {
    O($) && (L(), B());
  }), fe(b, "pointerdown", J(fe, v, "click", pn, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), E(), k, H, L]);
}, ca = (t, e, s, r, o, c) => {
  let i, d, l, u, h, m = rt, v = 0;
  const p = (F) => F.pointerType === "mouse", [b, y] = ut(), [x, M] = ut(100), [k, U] = ut(100), [H, A] = ut(() => v), [L, B] = la(t, o, r, ia(e, o, r, (F) => p(F) && R())), { ht: D, Kt: V, yt: E } = o, { Bt: S, Ut: O, Nt: $, qt: w } = L, I = (F, Z) => {
    if (A(), F)
      S(Lo);
    else {
      const te = J(S, Lo, !0);
      v > 0 && !Z ? H(te) : te();
    }
  }, R = () => {
    (l ? !i : !u) && (I(!0), x(() => {
      I(!1);
    }));
  }, oe = (F) => {
    S(zs, F, !0), S(zs, F, !1);
  }, de = (F) => {
    p(F) && (i = l, l && I(!0));
  }, le = [A, M, U, y, () => m(), fe(D, "pointerover", de, {
    A: !0
  }), fe(D, "pointerenter", de), fe(D, "pointerleave", (F) => {
    p(F) && (i = !1, l && I(!1));
  }), fe(D, "pointermove", (F) => {
    p(F) && d && R();
  }), fe(V, "scroll", (F) => {
    b(() => {
      $(), R();
    }), c(F), w();
  })];
  return [() => J(Ie, be(le, B())), ({ It: F, Tt: Z, Gt: te, Qt: Y }) => {
    const { Zt: ue, tn: z, nn: q, sn: j } = Y || {}, { Ct: C, dt: N } = te || {}, { ct: G } = s, { M: K } = Ge(), { G: Q, en: ie } = r, [ye, Se] = F("showNativeOverlaidScrollbars"), [ne, we] = F("scrollbars.theme"), [Ee, Re] = F("scrollbars.visibility"), [ke, De] = F("scrollbars.autoHide"), [xe, ge] = F("scrollbars.autoHideSuspend"), [Te] = F("scrollbars.autoHideDelay"), [_e, Me] = F("scrollbars.dragScroll"), [Le, vt] = F("scrollbars.clickScroll"), [Bt, hs] = F("overflow"), ps = N && !Z, vs = ie.x || ie.y, Ne = ue || z || j || C || Z, gs = q || Re || hs, Rt = ye && K.x && K.y, Ft = (Ze, Et, Tt) => {
      const It = Ze.includes(wt) && (Ee === ot || Ee === "auto" && Et === wt);
      return S(Pr, It, Tt), It;
    };
    if (v = Te, ps && (xe && vs ? (oe(!1), m(), k(() => {
      m = fe(V, "scroll", J(oe, !0), {
        A: !0
      });
    })) : oe(!0)), Se && S(Ir, Rt), we && (S(h), S(ne, !0), h = ne), ge && !xe && oe(!0), De && (d = ke === "move", l = ke === "leave", u = ke === "never", I(u, !0)), Me && S(Gr, _e), vt && S(qr, Le), gs) {
      const Ze = Ft(Bt.x, Q.x, !0), Et = Ft(Bt.y, Q.y, !1);
      S(jr, !(Ze && Et));
    }
    Ne && (O(), $(), w(), S(Do, !ie.x, !0), S(Do, !ie.y, !1), S(Nr, G && !E));
  }, {}, L];
}, da = (t) => {
  const e = Ge(), { P: s, R: r } = e, { elements: o } = s(), { host: c, padding: i, viewport: d, content: l } = o, u = ts(t), h = u ? {} : t, { elements: m } = h, { host: v, padding: p, viewport: b, content: y } = m || {}, x = u ? t : h.target, M = cn(x), k = ss(x, "textarea"), U = x.ownerDocument, H = U.documentElement, A = () => U.defaultView || Ae, L = J(Wr, [x]), B = J(wn, [x]), D = J(bt, ""), V = J(L, D, d), E = J(B, D, l), S = V(b), O = S === x, $ = O && M, w = !O && E(y), I = !O && S === w, R = $ ? H : S, oe = k ? L(D, c, v) : x, de = $ ? R : oe, le = !O && B(D, i, p), F = !I && w, Z = [F, R, le, de].map((ne) => ts(ne) && !kt(ne) && ne), te = (ne) => ne && Ws(Z, ne), Y = te(R) ? x : R, ue = {
    vt: x,
    ht: de,
    ot: R,
    cn: le,
    bt: F,
    gt: $ ? H : R,
    Kt: $ ? U : R,
    rn: M ? H : Y,
    Jt: U,
    wt: k,
    yt: M,
    Dt: u,
    nt: O,
    ln: A,
    St: (ne) => Qs(R, st, ne),
    Ot: (ne, we) => Ls(R, st, ne, we)
  }, { vt: z, ht: q, cn: j, ot: C, bt: N } = ue, G = [() => {
    Ue(q, [at, ys]), Ue(z, ys), M && Ue(H, [ys, at]);
  }], K = k && te(q);
  let Q = k ? z : Vs([N, C, j, q, z].find((ne) => ne && !te(ne)));
  const ie = $ ? z : N || C, ye = J(Ie, G);
  return [ue, () => {
    const ne = A(), we = Os(), Ee = (ge) => {
      Oe(kt(ge), Vs(ge)), lt(ge);
    }, Re = (ge) => fe(ge, "focusin focusout focus blur", pn, {
      I: !0,
      H: !1
    }), ke = "tabindex", De = Xs(C, ke), xe = Re(we);
    return Ye(q, at, O ? "" : Ar), Ye(j, Us, ""), Ye(C, st, ""), Ye(N, Mo, ""), O || (Ye(C, ke, De || "-1"), M && Ye(H, To, "")), K && (go(z, q), be(G, () => {
      go(q, z), lt(q);
    })), Oe(ie, Q), Oe(q, j), Oe(j || q, !O && C), Oe(C, N), be(G, [xe, () => {
      const ge = Os(), Te = te(C), _e = Te && ge === C ? z : ge, Me = Re(_e);
      Ue(j, Us), Ue(N, Mo), Ue(C, st), M && Ue(H, To), De ? Ye(C, ke, De) : Ue(C, ke), te(N) && Ee(N), Te && Ee(C), te(j) && Ee(j), Is(_e), Me();
    }]), r && !O && (Js(C, st, bn), be(G, J(Ue, C, st))), Is(!O && M && we === z && ne.top === ne ? C : we), xe(), Q = 0, ye;
  }, ye];
}, ua = ({ bt: t }) => ({ Gt: e, an: s, Tt: r }) => {
  const { xt: o } = e || {}, { $t: c } = s;
  t && (o || r) && Vt(t, {
    [yt]: c && "100%"
  });
}, ma = ({ ht: t, cn: e, ot: s, nt: r }, o) => {
  const [c, i] = Ve({
    i: xr,
    o: xo()
  }, J(xo, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: h }) => {
    let [m, v] = i(h);
    const { R: p } = Ge(), { ft: b, Ht: y, Ct: x } = l || {}, { ct: M } = u, [k, U] = d("paddingAbsolute");
    (b || v || (h || y)) && ([m, v] = c(h));
    const A = !r && (U || x || v);
    if (A) {
      const L = !k || !e && !p, B = m.r + m.l, D = m.t + m.b, V = {
        [Zo]: L && !M ? -B : 0,
        [en]: L ? -D : 0,
        [Qo]: L && M ? -B : 0,
        top: L ? -m.t : 0,
        right: L ? M ? -m.r : "auto" : 0,
        left: L ? M ? "auto" : -m.l : 0,
        [xt]: L && `calc(100% + ${B}px)`
      }, E = {
        [Wo]: L ? m.t : 0,
        [Yo]: L ? m.r : 0,
        [Jo]: L ? m.b : 0,
        [Xo]: L ? m.l : 0
      };
      Vt(e || s, V), Vt(s, E), re(o, {
        cn: m,
        un: !L,
        rt: e ? E : re({}, V, E)
      });
    }
    return {
      _n: A
    };
  };
}, fa = (t, e) => {
  const s = Ge(), { ht: r, cn: o, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: h, ln: m } = t, { R: v } = s, p = u && i, b = J(Po, 0), y = ["display", "direction", "flexDirection", "writingMode"], x = {
    i: tn,
    o: {
      w: 0,
      h: 0
    }
  }, M = {
    i: Wt,
    o: {}
  }, k = (F) => {
    h(_n, !p && F);
  }, U = (F, Z) => {
    const te = Ae.devicePixelRatio % 1 !== 0 ? 1 : 0, Y = {
      w: b(F.w - Z.w),
      h: b(F.h - Z.h)
    };
    return {
      w: Y.w > te ? Y.w : 0,
      h: Y.h > te ? Y.h : 0
    };
  }, [H, A] = Ve(x, J(to, c)), [L, B] = Ve(x, J(Bs, c)), [D, V] = Ve(x), [E] = Ve(M), [S, O] = Ve(x), [$] = Ve(M), [w] = Ve({
    i: (F, Z) => ds(F, Z, y),
    o: {}
  }, () => Er(c) ? pt(c, y) : {}), [I, R] = Ve({
    i: (F, Z) => Wt(F.T, Z.T) && Wt(F.D, Z.D),
    o: vn()
  }, () => {
    k(!0);
    const F = He(l), Z = h(Hr, !0), te = fe(d, wt, (j) => {
      const C = He(l);
      j.isTrusted && C.x === F.x && C.y === F.y && hn(j);
    }, {
      I: !0,
      A: !0
    });
    Pe(l, {
      x: 0,
      y: 0
    }), Z();
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
  }), oe = Ht(En), de = (F, Z) => `${Z ? Dr : Lr}${br(F)}`, le = (F) => {
    const Z = (Y) => [ot, dt, wt].map((ue) => de(ue, Y)), te = Z(!0).concat(Z()).join(" ");
    h(te), h(Qe(F).map((Y) => de(F[Y], Y === "x")).join(" "), !0);
  };
  return ({ It: F, Gt: Z, an: te, Tt: Y }, { _n: ue }) => {
    const { ft: z, Ht: q, Ct: j, dt: C, zt: N } = Z || {}, G = oe && oe.tt(t, e, te, s, F), { it: K, ut: Q, _t: ie } = G || {}, [ye, Se] = sa(F, s), [ne, we] = F("overflow"), Ee = os(ne.x), Re = os(ne.y), ke = z || ue || q || j || N || Se;
    let De = A(Y), xe = B(Y), ge = V(Y), Te = O(Y);
    if (Se && v && h(bn, !ye), ke) {
      Qs(r, at, Xt) && k(!0);
      const [co] = Q ? Q() : [], [Nt] = De = H(Y), [Ut] = xe = L(Y), zt = mn(c), Pt = p && Cr(m()), Un = {
        w: b(Ut.w + Nt.w),
        h: b(Ut.h + Nt.h)
      }, uo = {
        w: b((Pt ? Pt.w : zt.w + b(zt.w - Ut.w)) + Nt.w),
        h: b((Pt ? Pt.h : zt.h + b(zt.h - Ut.h)) + Nt.h)
      };
      co && co(), Te = S(uo), ge = D(U(Un, uo), Y);
    }
    const [_e, Me] = Te, [Le, vt] = ge, [Bt, hs] = xe, [ps, vs] = De, [Ne, gs] = E({
      x: Le.w > 0,
      y: Le.h > 0
    }), Rt = Ee && Re && (Ne.x || Ne.y) || Ee && Ne.x && !Ne.y || Re && Ne.y && !Ne.x, Ft = ue || j || N || vs || hs || Me || vt || we || Se || ke, Ze = oa(Ne, ne), [Et, Tt] = $(Ze.G), [, It] = w(Y), io = j || C || It || gs || Y, [In, Nn] = io ? I(Y) : R();
    return Ft && (Tt && le(Ze.G), ie && K && Vt(c, ie(Ze, te, K(Ze, Bt, ps)))), k(!1), Ls(r, at, Xt, Rt), Ls(o, Us, Xt, Rt), re(e, {
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
      Pt: Tr(In, Le)
    }), {
      nn: Tt,
      Zt: Me,
      tn: vt,
      sn: Nn || vt,
      dn: io
    };
  };
}, ha = (t) => {
  const [e, s, r] = da(t), o = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [Zo]: 0,
      [en]: 0,
      [Qo]: 0,
      [Wo]: 0,
      [Yo]: 0,
      [Jo]: 0,
      [Xo]: 0
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
      x: dt,
      y: dt
    },
    en: {
      x: !1,
      y: !1
    },
    Pt: vn()
  }, { vt: c, gt: i, nt: d } = e, { R: l, M: u } = Ge(), h = !l && (u.x || u.y), m = [ua(e), ma(e, o), fa(e, o)];
  return [s, (v) => {
    const p = {}, y = h && He(i);
    return ce(m, (x) => {
      re(p, x(v, p) || {});
    }), Pe(i, y), !d && Pe(c, 0), p;
  }, o, e, r];
}, pa = (t, e, s, r, o) => {
  const c = Eo(e, {}), [i, d, l, u, h] = ha(t), [m, v, p] = aa(u, l, c, (U) => {
    k({}, U);
  }), [b, y, , x] = ca(t, e, p, l, u, o), M = (U) => Qe(U).some((H) => !!U[H]), k = (U, H) => {
    if (s())
      return !1;
    const { fn: A, Tt: L, At: B, pn: D } = U, V = A || {}, E = !!L, S = {
      It: Eo(e, V, E),
      fn: V,
      Tt: E
    };
    if (D)
      return y(S), !1;
    const O = H || v(re({}, S, {
      At: B
    })), $ = d(re({}, S, {
      an: p,
      Gt: O
    }));
    y(re({}, S, {
      Gt: O,
      Qt: $
    }));
    const w = M(O), I = M($), R = w || I || !Ys(V) || E;
    return R && r(U, {
      Gt: O,
      Qt: $
    }), R;
  };
  return [() => {
    const { rn: U, gt: H } = u, A = He(U), L = [m(), i(), b()];
    return Pe(H, A), J(Ie, L);
  }, k, () => ({
    vn: p,
    hn: l
  }), {
    gn: u,
    bn: x
  }, h];
}, it = (t, e, s) => {
  const { N: r } = Ge(), o = ts(t), c = o ? t : t.target, i = kn(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, h = (E) => {
      const S = on(E), O = Ht(ea);
      return O ? O(S, !0) : S;
    }, m = re({}, r(), h(e)), [v, p, b] = Ns(), [y, x, M] = Ns(s), k = (E, S) => {
      M(E, S), b(E, S);
    }, [U, H, A, L, B] = pa(t, m, () => d, ({ fn: E, Tt: S }, { Gt: O, Qt: $ }) => {
      const { ft: w, Ct: I, xt: R, Ht: oe, Et: de, dt: le } = O, { Zt: F, tn: Z, nn: te, sn: Y } = $;
      k("updated", [V, {
        updateHints: {
          sizeChanged: !!w,
          directionChanged: !!I,
          heightIntrinsicChanged: !!R,
          overflowEdgeChanged: !!F,
          overflowAmountChanged: !!Z,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!Y,
          contentMutation: !!oe,
          hostMutation: !!de,
          appear: !!le
        },
        changedOptions: E || {},
        force: !!S
      }]);
    }, (E) => k("scroll", [V, E])), D = (E) => {
      Jr(c), Ie(l), d = !0, k("destroyed", [V, E]), p(), x();
    }, V = {
      options(E, S) {
        if (E) {
          const O = S ? r() : {}, $ = gn(m, re(O, h(E)));
          Ys($) || (re(m, $), H({
            fn: $
          }));
        }
        return re({}, m);
      },
      on: y,
      off: (E, S) => {
        E && S && x(E, S);
      },
      state() {
        const { vn: E, hn: S } = A(), { ct: O } = E, { Vt: $, Rt: w, G: I, en: R, cn: oe, un: de, Pt: le } = S;
        return re({}, {
          overflowEdge: $,
          overflowAmount: w,
          overflowStyle: I,
          hasOverflow: R,
          scrollCoordinates: {
            start: le.T,
            end: le.D
          },
          padding: oe,
          paddingAbsolute: de,
          directionRTL: O,
          destroyed: d
        });
      },
      elements() {
        const { vt: E, ht: S, cn: O, ot: $, bt: w, gt: I, Kt: R } = L.gn, { Ft: oe, Wt: de } = L.bn, le = (Z) => {
          const { Mt: te, kt: Y, Lt: ue } = Z;
          return {
            scrollbar: ue,
            track: Y,
            handle: te
          };
        }, F = (Z) => {
          const { jt: te, Xt: Y } = Z, ue = le(te[0]);
          return re({}, ue, {
            clone: () => {
              const z = le(Y());
              return H({
                pn: !0
              }), z;
            }
          });
        };
        return re({}, {
          target: E,
          host: S,
          padding: O || $,
          viewport: $,
          content: w || $,
          scrollOffsetElement: I,
          scrollEventElement: R,
          scrollbarHorizontal: F(oe),
          scrollbarVertical: F(de)
        });
      },
      update: (E) => H({
        Tt: E,
        At: !0
      }),
      destroy: J(D, !1),
      plugin: (E) => u[Qe(E)[0]]
    };
    return be(l, [B]), Xr(c, V), Cn($n, it, [V, v, u]), Yr(L.gn.yt, !o && t.cancel) ? (D(!0), V) : (be(l, U()), k("initialized", [V]), V.update(!0), V);
  }
  return i;
};
it.plugin = (t) => {
  const e = qe(t), s = e ? t : [t], r = s.map((o) => Cn(o, it)[0]);
  return Zr(s), e ? r : r[0];
};
it.valid = (t) => {
  const e = t && t.elements, s = Fe(e) && e();
  return es(s) && !!kn(s.target);
};
it.env = () => {
  const { k: t, M: e, R: s, V: r, B: o, F: c, P: i, U: d, N: l, q: u } = Ge();
  return re({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: r,
    staticDefaultInitialization: o,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
function va() {
  let t;
  const e = T(null), s = Math.floor(Math.random() * 2 ** 32), r = T(!1), o = T([]), c = () => o.value, i = () => t.getSelection(), d = () => o.value.length, l = () => t.clearSelection(!0), u = T(), h = T(null), m = T(null), v = T(null);
  function p() {
    t = new er({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: H, event: A, isDragging: L }) => {
      if (L)
        t.Interaction._reset(A);
      else {
        r.value = !1;
        const B = e.value.offsetWidth - A.offsetX, D = e.value.offsetHeight - A.offsetY;
        B < 15 && D < 15 && t.Interaction._reset(A), A.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(A);
      }
    }), document.addEventListener("dragleave", (H) => {
      !H.buttons && r.value && (r.value = !1);
    });
  }
  const b = () => ft(() => {
    t.addSelection(
      t.getSelectables()
    ), y();
  }), y = () => {
    o.value = t.getSelection().map((H) => JSON.parse(H.dataset.item)), u.value(o.value);
  }, x = () => ft(() => {
    const H = c().map((A) => A.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((A) => H.includes(JSON.parse(A.dataset.item).path))
    ), y(), k();
  }), M = (H) => {
    u.value = H, t.subscribe("DS:end", ({ items: A, event: L, isDragging: B }) => {
      o.value = A.map((D) => JSON.parse(D.dataset.item)), H(A.map((D) => JSON.parse(D.dataset.item)));
    });
  }, k = () => {
    h.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (m.value.style.height = e.value.scrollHeight + "px", m.value.style.display = "block") : (m.value.style.height = "100%", m.value.style.display = "none"));
  }, U = (H) => {
    if (!h.value)
      return;
    const { scrollOffsetElement: A } = h.value.elements();
    A.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ce(() => {
    it(v.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: it
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (H) => {
        h.value = H;
      },
      scroll: (H, A) => {
        const { scrollOffsetElement: L } = H.elements();
        e.value.scrollTo({
          top: L.scrollTop,
          left: 0
        });
      }
    }), p(), k(), new ResizeObserver(k).observe(e.value), e.value.addEventListener("scroll", U), t.subscribe("DS:scroll", ({ isDragging: H }) => H || U());
  }), qs(() => {
    t && t.stop();
  }), Ro(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: m,
    scrollBarContainer: v,
    getSelected: c,
    getSelection: i,
    selectAll: b,
    clearSelection: l,
    refreshSelection: x,
    getCount: d,
    onSelect: M
  };
}
function ga(t, e) {
  const s = T(t), r = T(e), o = T([]), c = T([]), i = T([]), d = T(!1), l = T(5);
  let u = !1, h = !1;
  const m = Ot({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function v() {
    let k = [], U = [], H = r.value ?? s.value + "://";
    H.length === 0 && (o.value = []), H.replace(s.value + "://", "").split("/").forEach(function(B) {
      k.push(B), k.join("/") !== "" && U.push({
        basename: B,
        name: B,
        path: s.value + "://" + k.join("/"),
        type: "dir"
      });
    }), c.value = U;
    const [A, L] = b(U, l.value);
    i.value = L, o.value = A;
  }
  function p(k) {
    l.value = k, v();
  }
  function b(k, U) {
    return k.length > U ? [k.slice(-U), k.slice(0, -U)] : [k, []];
  }
  function y(k = null) {
    d.value = k ?? !d.value;
  }
  function x() {
    return o.value && o.value.length && !h;
  }
  const M = Je(() => {
    var k;
    return ((k = o.value[o.value.length - 2]) == null ? void 0 : k.path) ?? s.value + "://";
  });
  return Ce(() => {
  }), mt(r, v), Ce(v), {
    adapter: s,
    path: r,
    loading: u,
    searchMode: h,
    data: m,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: x,
    parentFolderPath: M
  };
}
const _a = (t, e) => {
  const s = lr(t.id), r = Zn(), o = s.getStore("metricUnits", !1), c = fr(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (v) => Array.isArray(v) ? v : dr, h = s.getStore("persist-path", t.persist), m = h ? s.getStore("path", t.path) : t.path;
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
    i18n: Je(() => cr(s, d, r, i)),
    // modal state
    modal: hr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Je(() => va()),
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
    metricUnits: o,
    // human readable file sizes
    filesize: o ? Uo : No,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: h,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: ga(l, m)
  });
}, ba = /* @__PURE__ */ n("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), xa = { class: "fixed z-10 inset-0 overflow-hidden" }, ya = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, wa = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = T(null), s = ae("ServiceContainer");
    return Ce(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), ft(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const o = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: o,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, o) => (f(), g("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = $t((c) => a(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      ba,
      n("div", xa, [
        n("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = nt((c) => a(s).modal.close(), ["self"]))
        }, [
          n("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            n("div", ya, [
              Dt(r.$slots, "default")
            ]),
            n("div", wa, [
              Dt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, ka = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, o] of e)
    s[r] = o;
  return s;
}, $a = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: s }) {
    const r = ae("ServiceContainer"), o = T(!1), { t: c } = r.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), o.value = !0, i = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Ce(() => {
      r.emitter.on(t.on, d);
    }), qs(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: c
    };
  }
}, Sa = { key: 1 };
function Ca(t, e, s, r, o, c) {
  return f(), g("div", {
    class: me(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    t.$slots.default ? Dt(t.$slots, "default", { key: 0 }) : (f(), g("span", Sa, _(r.t("Saved.")), 1))
  ], 2);
}
const gt = /* @__PURE__ */ ka($a, [["render", Ca]]), Ea = { class: "sm:flex sm:items-start select-none" }, Ta = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), Ma = { class: "mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full" }, Aa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Da = {
  class: "flex",
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
}, ol = { class: "" }, nl = { class: "h-6 items-center" }, rl = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, al = { class: "flex text-sm" }, ll = ["label"], il = ["value"], cl = {
  key: 0,
  class: ""
}, dl = { class: "h-6 items-center" }, ul = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, ml = { class: "flex text-sm" }, fl = ["label"], hl = ["value"], pl = {
  key: 2,
  class: "mt-3"
}, vl = { class: "space-y-2 sm:w-1/2" }, gl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, _l = /* @__PURE__ */ n("kbd", null, "F2", -1), bl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, xl = /* @__PURE__ */ n("kbd", null, "F5", -1), yl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, wl = /* @__PURE__ */ n("kbd", null, "Del", -1), kl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, $l = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Esc")
], -1), Sl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Cl = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, "A")
], -1), El = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Tl = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, "F")
], -1), Ml = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Al = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, "E")
], -1), Dl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ll = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ ee(" + "),
  /* @__PURE__ */ n("kbd", null, ",")
], -1), Vl = {
  key: 3,
  class: "mt-3"
}, Ol = { class: "m-1 text-sm text-gray-500" }, Mn = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: o, changeLocale: c, locale: i } = e.i18n, d = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, l = Je(() => [
      { name: o("About"), key: d.ABOUT },
      { name: o("Settings"), key: d.SETTINGS },
      { name: o("Shortcuts"), key: d.SHORTCUTS },
      { name: o("Reset"), key: d.RESET }
    ]), u = T("about"), h = async () => {
      r(), location.reload();
    }, m = (H) => {
      e.theme.set(H), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Uo : No, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, p = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, b = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, y = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: x } = ae("VueFinderOptions"), k = Object.fromEntries(
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
      }).filter(([H]) => Object.keys(x).includes(H))
    ), U = Je(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (H, A) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: A[8] || (A[8] = (L) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(o)("Close")), 1)
      ]),
      default: se(() => [
        n("div", Ea, [
          Ta,
          n("div", Ma, [
            n("h3", Aa, _("Vuefinder " + a(e).version), 1),
            n("div", null, [
              n("div", null, [
                n("nav", Da, [
                  (f(!0), g(he, null, $e(l.value, (L) => (f(), g("button", {
                    key: L.name,
                    onClick: (B) => u.value = L.key,
                    class: me([L.key === u.value ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-sky-500" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-600", "px-3 py-2 border-b font-medium text-sm"]),
                    "aria-current": L.current ? "page" : void 0
                  }, _(L.name), 11, La))), 128))
                ])
              ])
            ]),
            u.value === d.ABOUT ? (f(), g("div", Va, [
              n("div", Oa, _(a(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              n("a", Ha, _(a(o)("Project home")), 1),
              n("a", Ba, _(a(o)("Follow on GitHub")), 1)
            ])) : P("", !0),
            u.value === d.SETTINGS ? (f(), g("div", Ra, [
              n("div", Fa, _(a(o)("Customize your experience with the following settings.")), 1),
              n("div", Ia, [
                n("fieldset", null, [
                  n("div", Na, [
                    n("div", Ua, [
                      n("div", za, [
                        ve(n("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": A[0] || (A[0] = (L) => a(e).metricUnits = L),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).metricUnits]
                        ])
                      ]),
                      n("div", Pa, [
                        n("label", ja, [
                          ee(_(a(o)("Use Metric Units")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: se(() => [
                              ee(_(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", qa, [
                      n("div", Ga, [
                        ve(n("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": A[1] || (A[1] = (L) => a(e).compactListView = L),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).compactListView]
                        ])
                      ]),
                      n("div", Ka, [
                        n("label", Wa, [
                          ee(_(a(o)("Compact list view")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: se(() => [
                              ee(_(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", Ya, [
                      n("div", Xa, [
                        ve(n("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": A[2] || (A[2] = (L) => a(e).persist = L),
                          onClick: y,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).persist]
                        ])
                      ]),
                      n("div", Ja, [
                        n("label", Qa, [
                          ee(_(a(o)("Persist path on reload")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: se(() => [
                              ee(_(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", Za, [
                      n("div", el, [
                        ve(n("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": A[3] || (A[3] = (L) => a(e).showThumbnails = L),
                          onClick: b,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).showThumbnails]
                        ])
                      ]),
                      n("div", tl, [
                        n("label", sl, [
                          ee(_(a(o)("Show thumbnails")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: se(() => [
                              ee(_(a(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    n("div", ol, [
                      n("div", nl, [
                        n("label", rl, _(a(o)("Theme")), 1)
                      ]),
                      n("div", al, [
                        ve(n("select", {
                          id: "theme",
                          "onUpdate:modelValue": A[4] || (A[4] = (L) => a(e).theme.value = L),
                          onChange: A[5] || (A[5] = (L) => m(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          n("optgroup", {
                            label: a(o)("Theme")
                          }, [
                            (f(!0), g(he, null, $e(U.value, (L, B) => (f(), g("option", { value: B }, _(L), 9, il))), 256))
                          ], 8, ll)
                        ], 544), [
                          [Ss, a(e).theme.value]
                        ]),
                        W(gt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: se(() => [
                            ee(_(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    a(e).features.includes(a(pe).LANGUAGE) && Object.keys(a(k)).length > 1 ? (f(), g("div", cl, [
                      n("div", dl, [
                        n("label", ul, _(a(o)("Language")), 1)
                      ]),
                      n("div", ml, [
                        ve(n("select", {
                          id: "language",
                          "onUpdate:modelValue": A[6] || (A[6] = (L) => Fo(i) ? i.value = L : null),
                          onChange: A[7] || (A[7] = (L) => a(c)(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          n("optgroup", {
                            label: a(o)("Language")
                          }, [
                            (f(!0), g(he, null, $e(a(k), (L, B) => (f(), g("option", { value: B }, _(L), 9, hl))), 256))
                          ], 8, fl)
                        ], 544), [
                          [Ss, a(i)]
                        ]),
                        W(gt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: se(() => [
                            ee(_(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : P("", !0)
                  ])
                ])
              ])
            ])) : P("", !0),
            u.value === d.SHORTCUTS ? (f(), g("div", pl, [
              n("div", vl, [
                n("div", gl, [
                  n("div", null, _(a(o)("Rename")), 1),
                  _l
                ]),
                n("div", bl, [
                  n("div", null, _(a(o)("Refresh")), 1),
                  xl
                ]),
                n("div", yl, [
                  ee(_(a(o)("Delete")) + " ", 1),
                  wl
                ]),
                n("div", kl, [
                  ee(_(a(o)("Escape")) + " ", 1),
                  $l
                ]),
                n("div", Sl, [
                  ee(_(a(o)("Select All")) + " ", 1),
                  Cl
                ]),
                n("div", El, [
                  ee(_(a(o)("Search")) + " ", 1),
                  Tl
                ]),
                n("div", Ml, [
                  ee(_(a(o)("Toggle Sidebar")) + " ", 1),
                  Al
                ]),
                n("div", Dl, [
                  ee(_(a(o)("Open Settings")) + " ", 1),
                  Ll
                ])
              ])
            ])) : P("", !0),
            u.value === d.RESET ? (f(), g("div", Vl, [
              n("div", Ol, _(a(o)("Reset all settings to default")), 1),
              n("button", {
                onClick: h,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, _(a(o)("Reset Settings")), 1)
            ])) : P("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Hl = ["aria-label"], Bl = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Rl = [
  Bl
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
    const s = e, r = ae("ServiceContainer"), { t: o } = r.i18n, c = T(!1), i = T(null), d = T((u = i.value) == null ? void 0 : u.strMessage);
    mt(d, () => c.value = !1);
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
        n("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": a(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Rl, 8, Hl)
      ], 2))
    ]));
  }
}, Fl = { class: "sm:flex sm:items-start" }, Il = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Nl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ul = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, zl = { class: "mt-2" }, Pl = { class: "text-sm text-gray-500" }, jl = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, ql = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Gl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Wl = [
  Kl
], Yl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xl = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jl = [
  Xl
], Ql = { class: "ml-1.5" }, Zl = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, ro = {
  __name: "ModalDelete",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(e.modal.data.items), o = T(""), c = () => {
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
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, _(a(s)("Yes, Delete!")), 1),
        n("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1),
        n("div", Zl, _(a(s)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        n("div", Fl, [
          Il,
          n("div", Nl, [
            n("h3", Ul, _(a(s)("Delete files")), 1),
            n("div", zl, [
              n("p", Pl, _(a(s)("Are you sure you want to delete these files?")), 1),
              n("div", jl, [
                (f(!0), g(he, null, $e(r.value, (l) => (f(), g("p", ql, [
                  l.type === "dir" ? (f(), g("svg", Gl, Wl)) : (f(), g("svg", Yl, Jl)),
                  n("span", Ql, _(l.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(_(o.value), 1)
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
}, ei = { class: "sm:flex sm:items-start" }, ti = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), si = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, oi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ni = { class: "mt-2" }, ri = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, ai = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, li = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ii = [
  li
], ci = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, di = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ui = [
  di
], mi = { class: "ml-1.5" }, ao = {
  __name: "ModalRename",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(e.modal.data.items[0]), o = T(e.modal.data.items[0].basename), c = T(""), i = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path,
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
    return (d, l) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Rename")), 1),
        n("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", ei, [
          ti,
          n("div", si, [
            n("h3", oi, _(a(s)("Rename")), 1),
            n("div", ni, [
              n("p", ri, [
                r.value.type === "dir" ? (f(), g("svg", ai, ii)) : (f(), g("svg", ci, ui)),
                n("span", mi, _(r.value.basename), 1)
              ]),
              ve(n("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => o.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [St, o.value]
              ]),
              c.value.length ? (f(), X(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(_(c.value), 1)
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
}, tt = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function fi(t) {
  const e = (s) => {
    s.code === tt.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (s.code === tt.F2 && t.features.includes(pe.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ao, { items: t.dragSelect.getSelected() })), s.code === tt.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.code === tt.DELETE && (!t.dragSelect.getCount() || t.modal.open(ro, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === tt.BACKSLASH && t.modal.open(Mn), s.metaKey && s.code === tt.KEY_F && t.features.includes(pe.SEARCH) && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === tt.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), s.metaKey && s.code === tt.KEY_A && (t.dragSelect.selectAll(), s.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  }), qs(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const hi = { class: "sm:flex sm:items-start" }, pi = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), vi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, gi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _i = { class: "mt-2" }, bi = { class: "text-sm text-gray-500" }, xi = ["placeholder"], An = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = T(""), o = T(""), c = () => {
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
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Create")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", hi, [
          pi,
          n("div", vi, [
            n("h3", gi, _(a(s)("New Folder")), 1),
            n("div", _i, [
              n("p", bi, _(a(s)("Create a new folder")), 1),
              ve(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Folder Name"),
                type: "text"
              }, null, 40, xi), [
                [St, r.value]
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(_(o.value), 1)
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
}, yi = { class: "sm:flex sm:items-start" }, wi = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), ki = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $i = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Si = { class: "mt-2" }, Ci = { class: "text-sm text-gray-500" }, Ei = ["placeholder"], Ti = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = T(""), o = T(""), c = () => {
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
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Create")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", yi, [
          wi,
          n("div", ki, [
            n("h3", $i, _(a(s)("New File")), 1),
            n("div", Si, [
              n("p", Ci, _(a(s)("Create a new file")), 1),
              ve(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("File Name"),
                type: "text"
              }, null, 40, Ei), [
                [St, r.value]
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(_(o.value), 1)
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
const Mi = { class: "sm:flex sm:items-start" }, Ai = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Di = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Li = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Vi = { class: "mt-2" }, Oi = {
  key: 0,
  class: "pointer-events-none"
}, Hi = {
  key: 1,
  class: "pointer-events-none"
}, Bi = ["disabled"], Ri = ["disabled"], Fi = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Ii = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Ni = ["textContent"], Ui = { class: "ml-1 w-full h-fit" }, zi = { class: "text-left hidden md:block" }, Pi = { class: "text-left md:hidden" }, ji = {
  key: 0,
  class: "ml-auto"
}, qi = ["title", "disabled", "onClick"], Gi = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Ki = [
  Gi
], Wi = {
  key: 0,
  class: "py-2"
}, Yi = ["disabled"], Xi = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = T({ QUEUE_ENTRY_STATUS: o }), i = T(null), d = T(null), l = T(null), u = T(null), h = T(null), m = T(null), v = T([]), p = T(""), b = T(!1), y = T(!1);
    let x;
    function M(O) {
      return v.value.findIndex(($) => $.id === O);
    }
    function k(O, $ = null) {
      $ = $ ?? (O.webkitRelativePath || O.name), x.addFile({
        name: $,
        type: O.type,
        data: O,
        source: "Local"
      });
    }
    function U(O) {
      switch (O.status) {
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
    const H = (O) => {
      switch (O.status) {
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
    function A() {
      u.value.click();
    }
    function L() {
      if (!b.value) {
        if (!v.value.filter((O) => O.status !== o.DONE).length) {
          p.value = s("Please select file to upload first.");
          return;
        }
        p.value = "", x.retryAll(), x.upload();
      }
    }
    function B() {
      x.cancelAll({ reason: "user" }), v.value.forEach((O) => {
        O.status !== o.DONE && (O.status = o.CANCELED, O.statusName = s("Canceled"));
      }), b.value = !1;
    }
    function D(O) {
      b.value || (x.removeFile(O.id, "removed-by-user"), v.value.splice(M(O.id), 1));
    }
    function V(O) {
      if (!b.value) {
        if (x.cancelAll({ reason: "user" }), O) {
          const $ = [];
          v.value.forEach((w) => {
            w.status !== o.DONE && $.push(w);
          }), v.value = [], $.forEach((w) => {
            k(w.originalFile, w.name);
          });
          return;
        }
        v.value.splice(0);
      }
    }
    function E() {
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
      x = new tr({
        debug: e.debug,
        restrictions: {
          maxFileSize: mr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(w, I) {
          if (I[w.id] != null) {
            const oe = M(w.id);
            v.value[oe].status === o.PENDING && (p.value = x.i18n("noDuplicates", { fileName: w.name })), v.value = v.value.filter((de) => de.id !== w.id);
          }
          return v.value.push({
            id: w.id,
            name: w.name,
            size: e.filesize(w.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: w.data
          }), !0;
        }
      }), x.use(sr, {
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
      }), x.on("restriction-failed", (w, I) => {
        const R = v.value[M(w.id)];
        D(R), p.value = I.message;
      }), x.on("upload", () => {
        const w = S();
        x.setMeta({ ...w.body });
        const I = x.getPlugin("XHRUpload");
        I.opts.method = w.method, I.opts.endpoint = w.url + "?" + new URLSearchParams(w.params), I.opts.headers = w.headers, delete w.headers["Content-Type"], b.value = !0, v.value.forEach((R) => {
          R.status !== o.DONE && (R.percent = null, R.status = o.UPLOADING, R.statusName = s("Pending upload"));
        });
      }), x.on("upload-progress", (w, I) => {
        const R = Math.floor(I.bytesUploaded / I.bytesTotal * 100);
        v.value[M(w.id)].percent = `${R}%`;
      }), x.on("upload-success", (w) => {
        const I = v.value[M(w.id)];
        I.status = o.DONE, I.statusName = s("Done");
      }), x.on("upload-error", (w, I) => {
        const R = v.value[M(w.id)];
        R.percent = null, R.status = o.ERROR, I.isNetworkError ? R.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : R.statusName = I ? I.message : s("Unknown Error");
      }), x.on("error", (w) => {
        p.value = w.message, b.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), x.on("complete", () => {
        b.value = !1, e.emitter.emit("vf-fetch", {
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
      function O(w, I) {
        I.isFile && I.file((R) => w(I, R)), I.isDirectory && I.createReader().readEntries((R) => {
          R.forEach((oe) => {
            O(w, oe);
          });
        });
      }
      m.value.addEventListener("drop", (w) => {
        w.preventDefault(), y.value = !1;
        const I = /^[/\\](.+)/;
        [...w.dataTransfer.items].forEach((R) => {
          R.kind === "file" && O((oe, de) => {
            const le = I.exec(oe.fullPath);
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
    }), Io(() => {
      x == null || x.close({ reason: "unmount" });
    }), (O, $) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          class: me(["vf-btn vf-btn-primary", b.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: b.value,
          onClick: nt(L, ["prevent"])
        }, _(a(s)("Upload")), 11, Yi),
        b.value ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: nt(B, ["prevent"])
        }, _(a(s)("Cancel")), 1)) : (f(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: nt(E, ["prevent"])
        }, _(a(s)("Close")), 1))
      ]),
      default: se(() => [
        n("div", Mi, [
          Ai,
          n("div", Di, [
            n("h3", Li, _(a(s)("Upload Files")), 1),
            n("div", Vi, [
              n("div", {
                ref_key: "dropArea",
                ref: m,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: A
              }, [
                y.value ? (f(), g("div", Oi, _(a(s)("Release to drop these files.")), 1)) : (f(), g("div", Hi, _(a(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              n("div", {
                ref_key: "container",
                ref: i,
                class: "text-gray-500 mb-1"
              }, [
                n("button", {
                  ref_key: "pickFiles",
                  ref: u,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, _(a(s)("Select Files")), 513),
                n("button", {
                  ref_key: "pickFolders",
                  ref: h,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, _(a(s)("Select Folders")), 513),
                n("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: b.value,
                  onClick: $[0] || ($[0] = (w) => V(!1))
                }, _(a(s)("Clear all")), 9, Bi),
                n("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: b.value,
                  onClick: $[1] || ($[1] = (w) => V(!0))
                }, _(a(s)("Clear only successful")), 9, Ri)
              ], 512),
              n("div", Fi, [
                (f(!0), g(he, null, $e(v.value, (w) => (f(), g("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: w.id
                }, [
                  n("span", Ii, [
                    n("span", {
                      class: me(["text-base m-auto", U(w)]),
                      textContent: _(H(w))
                    }, null, 10, Ni)
                  ]),
                  n("div", Ui, [
                    n("div", zi, _(a(Ps)(w.name, 40)) + " (" + _(w.size) + ")", 1),
                    n("div", Pi, _(a(Ps)(w.name, 16)) + " (" + _(w.size) + ")", 1),
                    n("div", {
                      class: me(["flex break-all text-left", U(w)])
                    }, [
                      ee(_(w.statusName) + " ", 1),
                      w.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (f(), g("b", ji, _(w.percent), 1)) : P("", !0)
                    ], 2)
                  ]),
                  n("button", {
                    type: "button",
                    class: me(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", b.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(s)("Delete"),
                    disabled: b.value,
                    onClick: (I) => D(w)
                  }, Ki, 10, qi)
                ]))), 128)),
                v.value.length ? P("", !0) : (f(), g("div", Wi, _(a(s)("No files selected!")), 1))
              ]),
              p.value.length ? (f(), X(We, {
                key: 0,
                onHidden: $[2] || ($[2] = (w) => p.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(_(p.value), 1)
                ]),
                _: 1
              })) : P("", !0)
            ])
          ])
        ]),
        n("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        n("input", {
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
}, Ji = { class: "sm:flex sm:items-start" }, Qi = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Zi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ec = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, tc = { class: "mt-2" }, sc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, oc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, nc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), rc = [
  nc
], ac = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, lc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ic = [
  lc
], cc = { class: "ml-1.5" }, dc = { class: "my-1 text-sm text-gray-500" }, Dn = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(e.modal.data.items[0]), o = T(""), c = T([]), i = () => {
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
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Unarchive")), 1),
        n("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", Ji, [
          Qi,
          n("div", Zi, [
            n("h3", ec, _(a(s)("Unarchive")), 1),
            n("div", tc, [
              (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", sc, [
                u.type === "dir" ? (f(), g("svg", oc, rc)) : (f(), g("svg", ac, ic)),
                n("span", cc, _(u.basename), 1)
              ]))), 256)),
              n("p", dc, _(a(s)("The archive will be unarchived at")) + " (" + _(a(e).fs.data.dirname) + ")", 1),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(_(o.value), 1)
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
}, uc = { class: "sm:flex sm:items-start" }, mc = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), fc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, hc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, pc = { class: "mt-2" }, vc = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, gc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, _c = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), xc = [
  bc
], yc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), kc = [
  wc
], $c = { class: "ml-1.5" }, Sc = ["placeholder"], Ln = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(""), o = T(""), c = T(e.modal.data.items), i = () => {
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
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Archive")), 1),
        n("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        n("div", uc, [
          mc,
          n("div", fc, [
            n("h3", hc, _(a(s)("Archive the files")), 1),
            n("div", pc, [
              n("div", vc, [
                (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", gc, [
                  u.type === "dir" ? (f(), g("svg", _c, xc)) : (f(), g("svg", yc, kc)),
                  n("span", $c, _(u.basename), 1)
                ]))), 256))
              ]),
              ve(n("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Sc), [
                [St, r.value]
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(_(o.value), 1)
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
}, Cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ec = /* @__PURE__ */ n("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Tc = [
  Ec
];
function Mc(t, e) {
  return f(), g("svg", Cc, [...Tc]);
}
const Ac = { render: Mc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Lc = /* @__PURE__ */ n("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Vc = [
  Lc
];
function Oc(t, e) {
  return f(), g("svg", Dc, [...Vc]);
}
const Hc = { render: Oc }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Rc = /* @__PURE__ */ n("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), Fc = [
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
}, zc = /* @__PURE__ */ n("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), Pc = [
  zc
];
function jc(t, e) {
  return f(), g("svg", Uc, [...Pc]);
}
const qc = { render: jc }, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Kc = /* @__PURE__ */ n("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), Wc = [
  Kc
];
function Yc(t, e) {
  return f(), g("svg", Gc, [...Wc]);
}
const Xc = { render: Yc }, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Qc = /* @__PURE__ */ n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Zc = [
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
}, od = /* @__PURE__ */ n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), nd = [
  od
];
function rd(t, e) {
  return f(), g("svg", sd, [...nd]);
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, id = /* @__PURE__ */ n("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), cd = /* @__PURE__ */ n("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), dd = [
  id,
  cd
];
function ud(t, e) {
  return f(), g("svg", ld, [...dd]);
}
const lo = { render: ud }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, fd = /* @__PURE__ */ n("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), hd = [
  fd
];
function pd(t, e) {
  return f(), g("svg", md, [...hd]);
}
const vd = { render: pd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, _d = /* @__PURE__ */ n("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), bd = [
  _d
];
function xd(t, e) {
  return f(), g("svg", gd, [...bd]);
}
const yd = { render: xd }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, kd = /* @__PURE__ */ n("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), $d = [
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
}, Td = /* @__PURE__ */ n("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), Md = [
  Td
];
function Ad(t, e) {
  return f(), g("svg", Ed, [...Md]);
}
const Dd = { render: Ad }, Ld = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm grow-0" }, Vd = {
  key: 0,
  class: "flex text-center"
}, Od = ["aria-label"], Hd = ["aria-label"], Bd = ["aria-label"], Rd = ["aria-label"], Fd = ["aria-label"], Id = ["aria-label"], Nd = ["aria-label"], Ud = {
  key: 1,
  class: "flex text-center"
}, zd = { class: "pl-2" }, Pd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, jd = { class: "flex text-center items-center justify-end" }, qd = ["aria-label"], Gd = ["aria-label"], Kd = {
  __name: "Toolbar",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, o = e.dragSelect, c = T("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen, e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    }, d = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (f(), g("div", Ld, [
      c.value.length ? (f(), g("div", Ud, [
        n("div", zd, [
          ee(_(a(r)("Search results for")) + " ", 1),
          n("span", Pd, _(c.value), 1)
        ]),
        a(e).fs.loading ? (f(), X(a(lo), { key: 0 })) : P("", !0)
      ])) : (f(), g("div", Vd, [
        a(e).features.includes(a(pe).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": a(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: u[0] || (u[0] = (h) => a(e).modal.open(An, { items: a(o).getSelected() }))
        }, [
          W(a(Ac))
        ], 8, Od)) : P("", !0),
        a(e).features.includes(a(pe).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": a(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[1] || (u[1] = (h) => a(e).modal.open(Ti, { items: a(o).getSelected() }))
        }, [
          W(a(Hc))
        ], 8, Hd)) : P("", !0),
        a(e).features.includes(a(pe).RENAME) ? (f(), g("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": a(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[2] || (u[2] = (h) => a(o).getCount() !== 1 || a(e).modal.open(ao, { items: a(o).getSelected() }))
        }, [
          W(a(Nc), {
            class: me(a(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Bd)) : P("", !0),
        a(e).features.includes(a(pe).DELETE) ? (f(), g("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": a(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[3] || (u[3] = (h) => !a(o).getCount() || a(e).modal.open(ro, { items: a(o).getSelected() }))
        }, [
          W(a(qc), {
            class: me(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Rd)) : P("", !0),
        a(e).features.includes(a(pe).UPLOAD) ? (f(), g("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": a(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[4] || (u[4] = (h) => a(e).modal.open(Xi, { items: a(o).getSelected() }))
        }, [
          W(a(Xc))
        ], 8, Fd)) : P("", !0),
        a(e).features.includes(a(pe).UNARCHIVE) && a(o).getCount() === 1 && a(o).getSelected()[0].mime_type === "application/zip" ? (f(), g("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": a(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[5] || (u[5] = (h) => !a(o).getCount() || a(e).modal.open(Dn, { items: a(o).getSelected() }))
        }, [
          W(a(ad), {
            class: me(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Id)) : P("", !0),
        a(e).features.includes(a(pe).ARCHIVE) ? (f(), g("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": a(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[6] || (u[6] = (h) => !a(o).getCount() || a(e).modal.open(Ln, { items: a(o).getSelected() }))
        }, [
          W(a(td), {
            class: me(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Nd)) : P("", !0)
      ])),
      n("div", jd, [
        a(e).features.includes(a(pe).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          "aria-label": a(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip"
        }, [
          a(e).fullScreen ? (f(), X(a(yd), { key: 0 })) : (f(), X(a(vd), { key: 1 }))
        ], 8, qd)) : P("", !0),
        n("div", {
          class: "mx-1.5",
          "aria-label": a(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u[7] || (u[7] = (h) => c.value.length || d())
        }, [
          a(e).view === "grid" ? (f(), X(a(Cd), {
            key: 0,
            class: me(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0),
          a(e).view === "list" ? (f(), X(a(Dd), {
            key: 1,
            class: me(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0)
        ], 8, Gd)
      ])
    ]));
  }
}, Wd = (t, e = 0, s = !1) => {
  let r;
  return (...o) => {
    s && !r && t(...o), clearTimeout(r), r = setTimeout(() => {
      t(...o);
    }, e);
  };
}, Ho = (t, e, s) => {
  const r = T(t);
  return qn((o, c) => ({
    get() {
      return o(), r.value;
    },
    set: Wd(
      (i) => {
        r.value = i, c();
      },
      e,
      s
    )
  }));
}, Yd = { class: "sm:flex sm:items-start" }, Xd = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ n("svg", {
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Jd = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Qd = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Zd = { class: "text-sm text-gray-500 pb-1" }, eu = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, tu = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, su = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ou = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), nu = [
  ou
], ru = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, au = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), lu = [
  au
], iu = { class: "ml-1.5" }, cu = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, du = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, uu = /* @__PURE__ */ n("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ n("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), mu = { class: "ml-1.5 overflow-auto" }, fu = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, js = {
  __name: "ModalMove",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(e.modal.data.items.from), o = T(""), c = () => {
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
          o.value = s(i.message);
        }
      });
    };
    return (i, d) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, _(a(s)("Yes, Move!")), 1),
        n("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, _(a(s)("Cancel")), 1),
        n("div", fu, _(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        n("div", Yd, [
          Xd,
          n("div", Jd, [
            n("h3", Qd, _(a(s)("Move files")), 1),
            n("p", Zd, _(a(s)("Are you sure you want to move these files?")), 1),
            n("div", eu, [
              (f(!0), g(he, null, $e(r.value, (l) => (f(), g("div", tu, [
                n("div", null, [
                  l.type === "dir" ? (f(), g("svg", su, nu)) : (f(), g("svg", ru, lu))
                ]),
                n("div", iu, _(l.path), 1)
              ]))), 256))
            ]),
            n("h4", cu, _(a(s)("Target Directory")), 1),
            n("p", du, [
              uu,
              n("span", mu, _(a(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (f(), X(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => o.value = ""),
              error: ""
            }, {
              default: se(() => [
                ee(_(o.value), 1)
              ]),
              _: 1
            })) : P("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, pu = /* @__PURE__ */ n("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), vu = [
  pu
];
function gu(t, e) {
  return f(), g("svg", hu, [...vu]);
}
const _u = { render: gu }, bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, xu = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), yu = [
  xu
];
function wu(t, e) {
  return f(), g("svg", bu, [...yu]);
}
const ku = { render: wu }, $u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, Su = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Cu = [
  Su
];
function Eu(t, e) {
  return f(), g("svg", $u, [...Cu]);
}
const Tu = { render: Eu }, Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, Au = /* @__PURE__ */ n("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Du = [
  Au
];
function Lu(t, e) {
  return f(), g("svg", Mu, [...Du]);
}
const Vu = { render: Lu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Hu = /* @__PURE__ */ n("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Bu = [
  Hu
];
function Ru(t, e) {
  return f(), g("svg", Ou, [...Bu]);
}
const Fu = { render: Ru }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Nu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Uu = [
  Nu
];
function zu(t, e) {
  return f(), g("svg", Iu, [...Uu]);
}
const Pu = { render: zu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, qu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Gu = [
  qu
];
function Ku(t, e) {
  return f(), g("svg", ju, [...Gu]);
}
const fs = { render: Ku }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, Yu = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Xu = /* @__PURE__ */ n("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), Ju = [
  Yu,
  Xu
];
function Qu(t, e) {
  return f(), g("svg", Wu, [...Ju]);
}
const Zu = { render: Qu }, e0 = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, t0 = /* @__PURE__ */ n("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), s0 = [
  t0
];
function o0(t, e) {
  return f(), g("svg", e0, [...s0]);
}
const n0 = { render: o0 }, r0 = { class: "space-x-0.5 flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm grow-0" }, a0 = ["aria-label"], l0 = ["aria-label"], i0 = ["aria-label"], c0 = ["aria-label"], d0 = { class: "flex leading-6" }, u0 = {
  key: 0,
  class: "flex"
}, m0 = /* @__PURE__ */ n("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), f0 = { class: "relative" }, h0 = /* @__PURE__ */ n("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), p0 = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], v0 = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, g0 = ["placeholder"], _0 = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, b0 = ["onDrop", "onClick"], x0 = { class: "flex pointer-events-none" }, y0 = { class: "inline-block w-full text-ellipsis overflow-hidden" }, w0 = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: o } = e.storage, c = T(null), i = Ho(0, 100);
    mt(i, (B) => {
      const D = c.value.children;
      let V = 0, E = 0, S = 5, O = 1;
      e.fs.limitBreadcrumbItems(S), ft(() => {
        for (let $ = D.length - 1; $ >= 0 && !(V + D[$].offsetWidth > i.value - 40); $--)
          V += parseInt(D[$].offsetWidth, 10), E++;
        E < O && (E = O), E > S && (E = S), e.fs.limitBreadcrumbItems(E);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    Ce(() => {
      new ResizeObserver(d).observe(c.value);
    });
    const l = (B, D = null) => {
      B.preventDefault(), r.isDraggingRef.value = !1, m(B), D ?? (D = e.fs.hiddenBreadcrumbs.length - 1);
      let V = JSON.parse(B.dataTransfer.getData("items"));
      if (V.find((E) => E.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: V,
          to: e.fs.hiddenBreadcrumbs[D] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (B, D = null) => {
      B.preventDefault(), r.isDraggingRef.value = !1, m(B), D ?? (D = e.fs.breadcrumbs.length - 2);
      let V = JSON.parse(B.dataTransfer.getData("items"));
      if (V.find((E) => E.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: V,
          to: e.fs.breadcrumbs[D] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, h = (B) => {
      B.preventDefault(), e.fs.isGoUpAvailable() ? (B.dataTransfer.dropEffect = "copy", B.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (B.dataTransfer.dropEffect = "none", B.dataTransfer.effectAllowed = "none");
    }, m = (B) => {
      B.preventDefault(), B.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && B.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      A(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, p = () => {
      A(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, b = (B) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: B.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = {
      mounted(B, D, V, E) {
        B.clickOutsideEvent = function(S) {
          B === S.target || B.contains(S.target) || D.value();
        }, document.body.addEventListener("click", B.clickOutsideEvent);
      },
      beforeUnmount(B, D, V, E) {
        document.body.removeEventListener("click", B.clickOutsideEvent);
      }
    }, M = () => {
      e.showTreeView = !e.showTreeView, o("show-tree-view", e.showTreeView);
    }, k = T(null), U = () => {
      e.features.includes(pe.SEARCH) && (e.fs.searchMode = !0, ft(() => k.value.focus()));
    }, H = Ho("", 400);
    mt(H, (B) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: B });
    }), mt(() => e.fs.searchMode, (B) => {
      B && ft(() => k.value.focus());
    });
    const A = () => {
      e.fs.searchMode = !1, H.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      A();
    });
    const L = () => {
      H.value === "" && A();
    };
    return (B, D) => (f(), g("div", r0, [
      n("span", {
        "aria-label": a(s)("Toggle Tree View"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(Zu), {
          onClick: M,
          class: me(["h-6 w-6 p-0.5 rounded cursor-pointer text-slate-700", a(e).showTreeView ? "bg-gray-300 dark:bg-gray-700" : ""])
        }, null, 8, ["class"])
      ], 8, a0),
      n("span", {
        "aria-label": a(s)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(ku), {
          onDragover: D[0] || (D[0] = (V) => h(V)),
          onDragleave: D[1] || (D[1] = (V) => m(V)),
          onDrop: D[2] || (D[2] = (V) => u(V)),
          onClick: p,
          class: me(a(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, l0),
      a(e).fs.loading ? (f(), g("span", {
        key: 1,
        "aria-label": a(s)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(Tu), {
          onClick: D[3] || (D[3] = (V) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, c0)) : (f(), g("span", {
        key: 0,
        "aria-label": a(s)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(_u), { onClick: v })
      ], 8, i0)),
      ve(n("div", {
        onClick: nt(U, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        n("div", null, [
          W(a(Vu), {
            onDragover: D[4] || (D[4] = (V) => h(V)),
            onDragleave: D[5] || (D[5] = (V) => m(V)),
            onDrop: D[6] || (D[6] = (V) => u(V, -1)),
            onClick: D[7] || (D[7] = (V) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter } }))
          })
        ]),
        n("div", d0, [
          a(e).fs.hiddenBreadcrumbs.length ? ve((f(), g("div", u0, [
            m0,
            n("div", f0, [
              n("span", {
                onDragenter: D[8] || (D[8] = (V) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: D[9] || (D[9] = (V) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                W(a(n0), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [x, y]
          ]) : P("", !0)
        ]),
        n("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: nt(U, ["self"])
        }, [
          (f(!0), g(he, null, $e(a(e).fs.breadcrumbs, (V, E) => (f(), g("div", { key: E }, [
            h0,
            n("span", {
              onDragover: (S) => E === a(e).fs.breadcrumbs.length - 1 || h(S),
              onDragleave: (S) => E === a(e).fs.breadcrumbs.length - 1 || m(S),
              onDrop: (S) => E === a(e).fs.breadcrumbs.length - 1 || u(S, E),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: V.basename,
              onClick: (S) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter, path: V.path } })
            }, _(V.name), 41, p0)
          ]))), 128))
        ], 512),
        a(e).fs.loading ? (f(), X(a(lo), { key: 0 })) : P("", !0)
      ], 512), [
        [ze, !a(e).fs.searchMode]
      ]),
      ve(n("div", v0, [
        n("div", null, [
          W(a(Fu))
        ]),
        ve(n("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: $t(A, ["esc"]),
          onBlur: L,
          "onUpdate:modelValue": D[10] || (D[10] = (V) => Fo(H) ? H.value = V : null),
          placeholder: a(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, g0), [
          [St, a(H)]
        ]),
        W(a(Pu), { onClick: A })
      ], 512), [
        [ze, a(e).fs.searchMode]
      ]),
      ve(n("div", _0, [
        (f(!0), g(he, null, $e(a(e).fs.hiddenBreadcrumbs, (V, E) => (f(), g("div", {
          key: E,
          onDragover: D[11] || (D[11] = (S) => h(S)),
          onDragleave: D[12] || (D[12] = (S) => m(S)),
          onDrop: (S) => l(S, E),
          onClick: (S) => b(V),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          n("div", x0, [
            n("span", null, [
              W(a(fs), { class: "h-5 w-5" })
            ]),
            ee(),
            n("span", y0, _(V.name), 1)
          ])
        ], 40, b0))), 128))
      ], 512), [
        [ze, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Vn = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), k0 = ["onClick"], $0 = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: s } = e.storage, r = T(s("full-screen", !1)), o = T([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      o.value.splice(l, 1);
    }, d = (l) => {
      let u = o.value.findIndex((h) => h.id === l);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, o.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (f(), g("div", {
      class: me([r.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2 z-10"])
    }, [
      W(Gn, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: se(() => [
          (f(!0), g(he, null, $e(o.value, (h, m) => (f(), g("div", {
            onClick: (v) => i(m),
            key: h,
            class: me([c(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, _(h.label), 11, k0))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, S0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, C0 = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), E0 = [
  C0
];
function T0(t, e) {
  return f(), g("svg", S0, [...E0]);
}
const M0 = { render: T0 }, A0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, D0 = /* @__PURE__ */ n("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), L0 = [
  D0
];
function V0(t, e) {
  return f(), g("svg", A0, [...L0]);
}
const O0 = { render: V0 }, Kt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (f(), g("div", null, [
      t.direction === "asc" ? (f(), X(a(M0), { key: 0 })) : P("", !0),
      t.direction === "desc" ? (f(), X(a(O0), { key: 1 })) : P("", !0)
    ]));
  }
}, H0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, B0 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), R0 = [
  B0
];
function F0(t, e) {
  return f(), g("svg", H0, [...R0]);
}
const I0 = { render: F0 }, ks = {
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
      }, null, 8, ["class"])) : (f(), X(a(I0), {
        key: 1,
        class: me({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, N0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, U0 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), z0 = [
  U0
];
function P0(t, e) {
  return f(), g("svg", N0, [...z0]);
}
const j0 = { render: P0 }, q0 = { class: "absolute -z-50 -top-96" }, G0 = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, K0 = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, r) => (f(), g("div", q0, [
      W(a(j0)),
      n("div", G0, _(e.count), 1)
    ]));
  }
}, W0 = { class: "flex" }, Y0 = ["aria-label"], X0 = { class: "ml-auto mb-2" }, J0 = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Q0 = { key: 1 }, Z0 = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = T(""), o = T(""), c = T(null), i = T(!1), d = T(""), l = T(!1), u = ae("ServiceContainer"), { t: h } = u.i18n;
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
      i.value = !i.value, o.value = r.value;
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
          content: o.value
        },
        responseType: "text"
      }).then((p) => {
        d.value = h("Updated."), r.value = p, s("success"), i.value = !i.value;
      }).catch((p) => {
        d.value = h(p.message), l.value = !0;
      });
    };
    return (p, b) => (f(), g(he, null, [
      n("div", W0, [
        n("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(u).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, _(a(u).modal.data.item.basename), 9, Y0),
        n("div", X0, [
          i.value ? (f(), g("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, _(a(h)("Save")), 1)) : P("", !0),
          a(u).features.includes(a(pe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: b[0] || (b[0] = (y) => m())
          }, _(i.value ? a(h)("Cancel") : a(h)("Edit")), 1)) : P("", !0)
        ])
      ]),
      n("div", null, [
        i.value ? (f(), g("div", Q0, [
          ve(n("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": b[1] || (b[1] = (y) => o.value = y),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [St, o.value]
          ])
        ])) : (f(), g("pre", J0, _(r.value), 1)),
        d.value.length ? (f(), X(We, {
          key: 2,
          onHidden: b[2] || (b[2] = (y) => d.value = ""),
          error: l.value
        }, {
          default: se(() => [
            ee(_(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : P("", !0)
      ])
    ], 64));
  }
}, em = { class: "flex" }, tm = ["aria-label"], sm = { class: "ml-auto mb-2" }, om = { class: "w-full flex justify-center" }, nm = ["src"], rm = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), { t: o } = r.i18n, c = T(null), i = T(null), d = T(!1), l = T(""), u = T(!1), h = () => {
      d.value = !d.value, d.value ? i.value = new nr(c.value, {
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
          }).then((b) => {
            l.value = o("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), h(), s("success");
          }).catch((b) => {
            l.value = o(b.message), u.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      s("success");
    }), (v, p) => (f(), g(he, null, [
      n("div", em, [
        n("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, _(a(r).modal.data.item.basename), 9, tm),
        n("div", sm, [
          d.value ? (f(), g("button", {
            key: 0,
            onClick: m,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, _(a(o)("Crop")), 1)) : P("", !0),
          a(r).features.includes(a(pe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: p[0] || (p[0] = (b) => h())
          }, _(d.value ? a(o)("Cancel") : a(o)("Edit")), 1)) : P("", !0)
        ])
      ]),
      n("div", om, [
        n("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, nm)
      ]),
      l.value.length ? (f(), X(We, {
        key: 0,
        onHidden: p[1] || (p[1] = (b) => l.value = ""),
        error: u.value
      }, {
        default: se(() => [
          ee(_(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : P("", !0)
    ], 64));
  }
}, am = { class: "flex" }, lm = ["aria-label"], im = /* @__PURE__ */ n("div", null, null, -1), cm = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (o, c) => (f(), g(he, null, [
      n("div", am, [
        n("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, _(a(s).modal.data.item.basename), 9, lm)
      ]),
      im
    ], 64));
  }
}, dm = ["aria-label"], um = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, mm = ["src"], fm = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (f(), g("div", null, [
      n("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, _(a(s).modal.data.item.basename), 9, dm),
      n("div", null, [
        n("video", um, [
          n("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, mm),
          ee(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, hm = ["aria-label"], pm = {
  class: "w-full",
  controls: ""
}, vm = ["src"], gm = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), o = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ce(() => {
      s("success");
    }), (c, i) => (f(), g(he, null, [
      n("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, _(a(r).modal.data.item.basename), 9, hm),
      n("div", null, [
        n("audio", pm, [
          n("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, vm),
          ee(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, _m = ["aria-label"], bm = ["data"], xm = ["src"], ym = /* @__PURE__ */ n("p", null, [
  /* @__PURE__ */ ee(" Your browser does not support PDFs. "),
  /* @__PURE__ */ n("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ ee(" . ")
], -1), wm = [
  ym
], km = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (f(), g(he, null, [
      n("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, _(a(s).modal.data.item.basename), 9, _m),
      n("div", null, [
        n("object", {
          class: "h-[60vh]",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          n("iframe", {
            class: "border-0",
            src: o(),
            width: "100%",
            height: "100%"
          }, wm, 8, xm)
        ], 8, bm)
      ])
    ], 64));
  }
}, $m = { class: "sm:flex sm:items-start" }, Sm = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Cm = { key: 0 }, Em = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Tm = {
  key: 0,
  class: "flex leading-5"
}, Mm = /* @__PURE__ */ n("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ n("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ n("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), Am = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, Dm = { class: "font-bold" }, Lm = { class: "font-bold pl-2" }, Vm = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Om = ["download", "href"], On = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(pe.PREVIEW);
    return c || (r.value = !0), (i, d) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
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
        }, _(a(s)("Download")), 9, Om)) : P("", !0)
      ]),
      default: se(() => [
        n("div", $m, [
          n("div", Sm, [
            a(c) ? (f(), g("div", Cm, [
              o("text") ? (f(), X(Z0, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : o("image") ? (f(), X(rm, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : o("video") ? (f(), X(fm, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : o("audio") ? (f(), X(gm, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : o("application/pdf") ? (f(), X(km, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (f(), X(cm, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : P("", !0),
            n("div", Em, [
              r.value === !1 ? (f(), g("div", Tm, [
                Mm,
                n("span", null, _(a(s)("Loading")), 1)
              ])) : P("", !0)
            ])
          ])
        ]),
        n("div", Am, [
          n("div", null, [
            n("span", Dm, _(a(s)("File Size")) + ": ", 1),
            ee(_(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          n("div", null, [
            n("span", Lm, _(a(s)("Last Modified")) + ": ", 1),
            ee(" " + _(a(Vn)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(pe).DOWNLOAD) ? (f(), g("div", Vm, [
          n("span", null, _(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : P("", !0)
      ]),
      _: 1
    }));
  }
}, Hm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Bm = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Rm = /* @__PURE__ */ n("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Fm = [
  Bm,
  Rm
];
function Im(t, e) {
  return f(), g("svg", Hm, [...Fm]);
}
const Hn = { render: Im }, Nm = ["data-type", "data-item", "data-index"], $s = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = e.dragSelect, r = t, o = (p) => {
      p.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: p.path } })) : e.modal.open(On, { adapter: e.fs.adapter, item: p });
    }, c = {
      mounted(p, b, y, x) {
        y.props.draggable && (p.addEventListener("dragstart", (M) => i(M, b.value)), p.addEventListener("dragover", (M) => l(M, b.value)), p.addEventListener("drop", (M) => d(M, b.value)));
      },
      beforeUnmount(p, b, y, x) {
        y.props.draggable && (p.removeEventListener("dragstart", i), p.removeEventListener("dragover", l), p.removeEventListener("drop", d));
      }
    }, i = (p, b) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      s.isDraggingRef.value = !0, p.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (p, b) => {
      p.preventDefault(), s.isDraggingRef.value = !1;
      let y = JSON.parse(p.dataTransfer.getData("items"));
      if (y.find((x) => x.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, { items: { from: y, to: b } });
    }, l = (p, b) => {
      p.preventDefault(), !b || b.type !== "dir" || s.getSelection().find((y) => y === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
    };
    let u = null, h = !1;
    const m = () => {
      u && clearTimeout(u);
    }, v = (p) => {
      if (!h)
        h = !0, setTimeout(() => h = !1, 300);
      else
        return h = !1, o(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const b = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: p.target.getBoundingClientRect().x,
          clientY: p.target.getBoundingClientRect().y
        });
        p.target.dispatchEvent(b);
      }, 500);
    };
    return (p, b) => ve((f(), g("div", {
      style: ns({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((y) => p.$el === y) ? "0.5 !important" : "" }),
      class: me(["vf-item-" + a(s).explorerId, "relative"]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: b[0] || (b[0] = (y) => o(t.item)),
      onTouchstart: b[1] || (b[1] = (y) => v(y)),
      onTouchend: b[2] || (b[2] = (y) => m()),
      onContextmenu: b[3] || (b[3] = nt((y) => a(e).emitter.emit("vf-contextmenu-show", { event: y, items: a(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Dt(p.$slots, "default"),
      a(e).pinnedFolders.find((y) => y.path === t.item.path) ? (f(), X(a(Hn), {
        key: 0,
        class: "absolute top-0 right-0 text-amber-600"
      })) : P("", !0)
    ], 46, Nm)), [
      [c, t.item]
    ]);
  }
}, Um = { class: "relative flex-auto flex flex-col" }, zm = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, Pm = { class: "relative" }, jm = { class: "grid grid-cols-12 items-center" }, qm = { class: "flex col-span-7 items-center" }, Gm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Km = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Wm = { class: "grid grid-cols-12 items-center" }, Ym = { class: "flex col-span-7 items-center" }, Xm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Jm = { class: "col-span-2 text-center" }, Qm = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, Zm = { class: "relative" }, e1 = ["data-src", "alt"], t1 = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, s1 = { class: "break-all" }, o1 = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = (m) => m == null ? void 0 : m.substring(0, 3), o = T(null), c = T(""), i = e.dragSelect;
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
      let v = [...e.fs.data.files], p = l.column, b = l.order === "asc" ? 1 : -1;
      if (!m)
        return v;
      const y = (x, M) => typeof x == "string" && typeof M == "string" ? x.toLowerCase().localeCompare(M.toLowerCase()) : x < M ? -1 : x > M ? 1 : 0;
      return l.active && (v = v.slice().sort((x, M) => y(x[p], M[p]) * b)), v;
    }, h = (m) => {
      l.active && l.column === m ? (l.active = l.order === "asc", l.column = m, l.order = "desc") : (l.active = !0, l.column = m, l.order = "asc");
    };
    return Ce(() => {
      d = new or(i.area.value);
    }), Ro(() => {
      d.update();
    }), Io(() => {
      d.destroy();
    }), (m, v) => (f(), g("div", Um, [
      a(e).view === "list" || c.value.length ? (f(), g("div", zm, [
        n("div", {
          onClick: v[0] || (v[0] = (p) => h("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          ee(_(a(s)("Name")) + " ", 1),
          ve(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? P("", !0) : (f(), g("div", {
          key: 0,
          onClick: v[1] || (v[1] = (p) => h("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          ee(_(a(s)("Size")) + " ", 1),
          ve(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? P("", !0) : (f(), g("div", {
          key: 1,
          onClick: v[2] || (v[2] = (p) => h("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          ee(_(a(s)("Date")) + " ", 1),
          ve(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (f(), g("div", {
          key: 2,
          onClick: v[3] || (v[3] = (p) => h("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          ee(_(a(s)("Filepath")) + " ", 1),
          ve(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : P("", !0)
      ])) : P("", !0),
      n("div", Pm, [
        W(K0, {
          ref_key: "dragImage",
          ref: o,
          count: a(i).getCount()
        }, null, 8, ["count"])
      ]),
      n("div", {
        ref: a(i).scrollBarContainer,
        class: me(["vf-explorer-scrollbar-container", [{ "grid-view": a(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        n("div", {
          ref: a(i).scrollBar,
          class: "w-5 bg-transparent pointer-events-none"
        }, null, 512)
      ], 2),
      n("div", {
        ref: a(i).area,
        class: "h-full w-full text-xs p-1 vf-explorer-scrollbar vf-selector-area min-h-[150px] z-0 overflow-y-auto",
        onContextmenu: v[4] || (v[4] = nt((p) => a(e).emitter.emit("vf-contextmenu-show", { event: p, items: a(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (f(!0), g(he, { key: 0 }, $e(u(), (p, b) => (f(), X($s, {
          item: p,
          index: b,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: se(() => [
            n("div", jm, [
              n("div", qm, [
                W(ks, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                n("span", Gm, _(p.basename), 1)
              ]),
              n("div", Km, _(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0),
        a(e).view === "list" && !c.value.length ? (f(!0), g(he, { key: 1 }, $e(u(), (p, b) => (f(), X($s, {
          item: p,
          index: b,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: p.path
        }, {
          default: se(() => [
            n("div", Wm, [
              n("div", Ym, [
                W(ks, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                n("span", Xm, _(p.basename), 1)
              ]),
              n("div", Jm, _(p.file_size ? a(e).filesize(p.file_size) : ""), 1),
              n("div", Qm, _(a(Vn)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : P("", !0),
        a(e).view === "grid" && !c.value.length ? (f(!0), g(he, { key: 2 }, $e(u(!1), (p, b) => (f(), X($s, {
          item: p,
          index: b,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: se(() => [
            n("div", null, [
              n("div", Zm, [
                (p.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, e1)) : (f(), X(ks, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && p.type !== "dir" ? (f(), g("div", t1, _(r(p.extension)), 1)) : P("", !0)
              ]),
              n("span", s1, _(a(Ps)(p.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0)
      ], 544),
      W($0)
    ]));
  }
}, n1 = ["href", "download"], r1 = ["onClick"], a1 = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(null), o = T([]), c = T(""), i = Ot({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Je(() => i.items.filter((m) => m.key == null || e.features.includes(m.key)));
    e.emitter.on("vf-context-selected", (m) => {
      o.value = m;
    });
    const l = {
      newfolder: {
        key: pe.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(An)
      },
      selectAll: {
        title: () => s("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      markFavorite: {
        title: () => s("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(o.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      removeFavorite: {
        title: () => s("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((m) => !o.value.find((v) => v.path === m.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: pe.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.modal.open(ro, { items: o });
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
        action: () => e.modal.open(On, { adapter: e.fs.adapter, item: o.value[0] })
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
        key: pe.DOWNLOAD,
        link: Je(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: pe.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(Ln, { items: o })
      },
      unarchive: {
        key: pe.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(Dn, { items: o })
      },
      rename: {
        key: pe.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(ao, { items: o })
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
      else !p && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((b) => b.path === p.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", v)) : (p.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((b) => b.path === p.path) !== -1 ? i.items.push(l.removeFavorite) : i.items.push(l.markFavorite)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), p.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [p]));
      h(m);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const h = (m) => {
      const v = e.dragSelect.area.value, p = e.root.getBoundingClientRect(), b = v.getBoundingClientRect();
      let y = m.clientX - p.left, x = m.clientY - p.top;
      i.active = !0, ft(() => {
        var H;
        const M = (H = r.value) == null ? void 0 : H.getBoundingClientRect();
        let k = (M == null ? void 0 : M.height) ?? 0, U = (M == null ? void 0 : M.width) ?? 0;
        y = b.right - m.pageX + window.scrollX < U ? y - U : y, x = b.bottom - m.pageY + window.scrollY < k ? x - k : x, i.positions = {
          left: y + "px",
          top: x + "px"
        };
      });
    };
    return (m, v) => ve((f(), g("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: ns(i.positions),
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
          onClick: v[0] || (v[0] = (b) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          n("span", null, _(p.title()), 1)
        ], 8, n1)) : (f(), g("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (b) => u(p)
        }, [
          n("span", null, _(p.title()), 1)
        ], 8, r1))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, l1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, i1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), c1 = [
  i1
];
function d1(t, e) {
  return f(), g("svg", l1, [...c1]);
}
const Bn = { render: d1 }, u1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, m1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), f1 = [
  m1
];
function h1(t, e) {
  return f(), g("svg", u1, [...f1]);
}
const p1 = { render: h1 }, v1 = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0" }, g1 = { class: "flex leading-5 items-center" }, _1 = ["aria-label"], b1 = ["value"], x1 = { class: "ml-3" }, y1 = { key: 0 }, w1 = { class: "ml-1" }, k1 = { class: "flex leading-5 items-center justify-end" }, $1 = ["disabled"], S1 = ["aria-label"], C1 = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = T("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = Je(() => {
      const l = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (f(), g("div", v1, [
      n("div", g1, [
        n("div", {
          class: "mx-2",
          "aria-label": a(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, [
          W(a(Bn))
        ], 8, _1),
        ve(n("select", {
          "onUpdate:modelValue": u[0] || (u[0] = (h) => a(e).fs.adapter = h),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8",
          tabindex: "-1"
        }, [
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (h) => (f(), g("option", { value: h }, _(h), 9, b1))), 256))
        ], 544), [
          [Ss, a(e).fs.adapter]
        ]),
        n("div", x1, [
          i.value.length ? (f(), g("span", y1, _(a(e).fs.data.files.length) + " items found. ", 1)) : P("", !0),
          n("span", w1, _(a(e).dragSelect.getCount() > 0 ? a(s)("%s item(s) selected.", a(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      n("div", k1, [
        a(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: me(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (h) => a(e).selectButton.click(a(o).getSelected(), h))
        }, _(a(s)("Select")), 11, $1)) : P("", !0),
        n("span", {
          class: "mr-1",
          "aria-label": a(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: u[2] || (u[2] = (h) => a(e).modal.open(Mn))
        }, [
          W(a(p1))
        ], 8, S1)
      ])
    ]));
  }
}, E1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, T1 = /* @__PURE__ */ n("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), M1 = /* @__PURE__ */ n("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), A1 = [
  T1,
  M1
];
function D1(t, e) {
  return f(), g("svg", E1, [...A1]);
}
const L1 = { render: D1 }, V1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, O1 = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), H1 = /* @__PURE__ */ n("path", { d: "M15 12H9M12 9v6" }, null, -1), B1 = [
  O1,
  H1
];
function R1(t, e) {
  return f(), g("svg", V1, [...B1]);
}
const F1 = { render: R1 }, I1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, N1 = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), U1 = /* @__PURE__ */ n("path", { d: "M9 12h6" }, null, -1), z1 = [
  N1,
  U1
];
function P1(t, e) {
  return f(), g("svg", I1, [...z1]);
}
const j1 = { render: P1 };
function Rn(t, e) {
  const s = t.findIndex((r) => r.path === e.path);
  s > -1 ? t[s] = e : t.push(e);
}
const q1 = {
  key: 1,
  class: "cursor-pointer"
}, Fn = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Kn({
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
    const r = Wn(t, "modelValue"), o = T(!1);
    function c() {
      return r.value = !r.value;
    }
    function i() {
      return s.treeViewData.find((l) => l.path === e.path);
    }
    const d = () => {
      o.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((l) => {
        Rn(s.treeViewData, { path: e.path, ...l });
      }).catch((l) => {
      }).finally(() => {
        o.value = !1;
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
        o.value ? (f(), X(a(lo), {
          key: 0,
          class: "p-1"
        })) : (f(), g("div", q1, [
          r.value && ((h = i()) != null && h.folders.length) ? (f(), X(a(j1), {
            key: 0,
            class: "text-gray-600"
          })) : P("", !0),
          r.value ? P("", !0) : (f(), X(a(F1), {
            key: 1,
            class: "text-gray-400"
          }))
        ]))
      ]);
    };
  }
}, G1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, K1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), W1 = [
  K1
];
function Y1(t, e) {
  return f(), g("svg", G1, [...W1]);
}
const X1 = { render: Y1 }, J1 = { class: "block" }, Q1 = { class: "flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded" }, Z1 = { class: "h-5 w-5 shrink-0" }, ef = ["onClick"], tf = { class: "h-5 w-5 shrink-0" }, sf = { class: "text-nowrap" }, of = { class: "pl-4" }, nf = {
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
    const e = ae("ServiceContainer"), s = T([]), r = t, o = Je(() => {
      var c;
      return ((c = e.treeViewData.find((i) => i.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, i) => {
      const d = Yn("TreeSubfolderList", !0);
      return f(), g("ul", J1, [
        (f(!0), g(he, null, $e(o.value, (l, u) => (f(), g("li", {
          class: "flex flex-col space-x-0.5 py-0.5 text-sm",
          key: l.path
        }, [
          n("div", Q1, [
            n("div", Z1, [
              W(Fn, {
                adapter: t.adapter,
                path: l.path,
                modelValue: s.value[l.path],
                "onUpdate:modelValue": (h) => s.value[l.path] = h
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ]),
            n("div", {
              class: "flex cursor-pointer",
              onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: l.path } })
            }, [
              n("div", tf, [
                a(e).fs.path === l.path ? (f(), X(a(X1), { key: 0 })) : (f(), X(a(fs), { key: 1 }))
              ]),
              n("div", sf, _(l.basename), 1)
            ], 8, ef)
          ]),
          n("div", of, [
            ve(W(d, {
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
}, rf = { class: "pt-1 px-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between" }, af = { class: "h-5 w-5 shrink-0" }, lf = { class: "mr-3" }, cf = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = T(!1), r = (o) => {
      e.fs.adapter = o, e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: o } }), e.storage.setStore("adapter", o);
    };
    return (o, c) => (f(), g(he, null, [
      n("div", rf, [
        n("div", {
          class: me(["flex flex-1 space-x-1 items-center cursor-pointer", t.storage === a(e).fs.adapter ? "text-gray-700/80 dark:text-gray-300/80 text-bold" : ""]),
          onClick: c[0] || (c[0] = (i) => r(t.storage))
        }, [
          n("div", af, [
            W(a(Bn))
          ]),
          n("div", null, _(t.storage), 1)
        ], 2),
        n("div", lf, [
          W(Fn, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": c[1] || (c[1] = (i) => s.value = i)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ve(W(nf, {
        adapter: t.storage,
        path: t.storage + "://"
      }, null, 8, ["adapter", "path"]), [
        [ze, s.value]
      ])
    ], 64));
  }
}, df = { class: "p-1 uppercase font-bold text-gray-400 dark:text-gray-400 text-xs flex items-center space-x-1" }, uf = { class: "block" }, mf = { class: "flex pl-2 py-0.5 text-sm space-x-2" }, ff = ["onClick"], hf = ["title"], pf = ["onClick"], vf = { key: 0 }, gf = { class: "rounded-lg p-1 bg-gray-100 dark:bg-gray-700 text-xs text-center" }, _f = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = T(190), o = (d) => {
      e.pinnedFolders = e.pinnedFolders.filter((l) => l.path !== d.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, c = (d) => {
      const l = d.clientX, u = d.target.parentElement, h = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const m = (p) => {
        r.value = h + p.clientX - l, r.value < 50 && (r.value = 0, e.showTreeView = !1), r.value > 50 && (e.showTreeView = !0);
      }, v = () => {
        const p = u.getBoundingClientRect();
        r.value = p.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", v);
      };
      window.addEventListener("mousemove", m), window.addEventListener("mouseup", v);
    }, i = T(null);
    return Ce(() => {
      it(i.value, {});
    }), mt(e.fs.data, (d, l) => {
      const u = d.files.filter((h) => h.type === "dir");
      Rn(e.treeViewData, { path: e.fs.path, folders: u.map((h) => ({
        adapter: h.storage,
        path: h.path,
        basename: h.basename
      })) });
    }), (d, l) => (f(), g(he, null, [
      n("div", {
        onClick: l[0] || (l[0] = (u) => a(e).showTreeView = !a(e).showTreeView),
        class: me(["w-full h-full bg-gray-300/10 dark:bg-gray-700/10 z-[1]", a(e).showTreeView ? "backdrop-blur-sm absolute md:hidden" : "hidden"])
      }, null, 2),
      n("div", {
        style: ns(a(e).showTreeView ? "min-width:100px;max-width:75%; width: " + r.value + "px" : "width: 0"),
        class: "absolute h-full md:h-auto md:relative shadow-lg shrink-0 transition-[width] ease-in-out duration-200 z-[1] bg-gray-50 dark:bg-[#242f41]"
      }, [
        n("div", {
          ref_key: "treeViewScrollElement",
          ref: i,
          class: "h-full border-r dark:border-gray-600/50 pb-4"
        }, [
          n("div", df, [
            n("div", null, [
              W(a(Hn), { class: "text-amber-600" })
            ]),
            n("div", null, _(a(s)("Pinned Folders")), 1)
          ]),
          n("ul", uf, [
            (f(!0), g(he, null, $e(a(e).pinnedFolders, (u) => (f(), g("li", mf, [
              n("div", {
                class: "flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer",
                onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
              }, [
                W(a(fs), { class: "h-5 w-5" }),
                n("div", {
                  title: u.path
                }, _(u.basename), 9, hf)
              ], 8, ff),
              n("div", {
                class: "cursor-pointer",
                onClick: (h) => o(u)
              }, [
                W(a(L1), { class: "p-0.5 text-gray-200 hover:text-gray-400 dark:text-gray-600 hover:dark:text-gray-400" })
              ], 8, pf)
            ]))), 256)),
            a(e).pinnedFolders.length ? P("", !0) : (f(), g("li", vf, [
              n("div", gf, _(a(s)("No folders pinned")), 1)
            ]))
          ]),
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (u) => (f(), g("div", null, [
            W(cf, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        n("div", {
          onMousedown: c,
          class: me([(a(e).showTreeView, ""), "transition-colors ease-in-out duration-200 top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, bf = { class: "relative flex overflow-hidden h-full" }, xf = {
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
    const s = e, o = _a(t, ae("VueFinderOptions"));
    Xn("ServiceContainer", o);
    const { setStore: c } = o.storage, i = T(null);
    o.root = i;
    const d = o.dragSelect;
    fi(o);
    const l = (h) => {
      Object.assign(o.fs.data, h), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return o.emitter.on("vf-fetch-abort", () => {
      u.abort(), o.fs.loading = !1;
    }), o.emitter.on("vf-fetch", ({ params: h, body: m = null, onSuccess: v = null, onError: p = null, noCloseModal: b = !1 }) => {
      ["index", "search"].includes(h.q) && (u && u.abort(), o.fs.loading = !0), u = new AbortController();
      const y = u.signal;
      o.requester.send({
        url: "",
        method: h.m || "get",
        params: h,
        body: m,
        abortSignal: y
      }).then((x) => {
        o.fs.adapter = x.adapter, o.persist && (o.fs.path = x.dirname, c("path", o.fs.path)), ["index", "search"].includes(h.q) && (o.fs.loading = !1), b || o.modal.close(), l(x), v && v(x);
      }).catch((x) => {
        console.error(x), p && p(x);
      });
    }), Ce(() => {
      let h = {};
      o.fs.path.includes("://") && (h = {
        adapter: o.fs.path.split("://")[0],
        path: o.fs.path
      }), o.emitter.emit("vf-fetch", { params: { q: "index", adapter: o.fs.adapter, ...h } }), d.onSelect((m) => {
        s("select", m);
      });
    }), (h, m) => (f(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      n("div", {
        class: me(a(o).theme.actualValue)
      }, [
        n("div", {
          class: me([a(o).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded resize-y ", "overflow-hidden min-h-44 border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: ns(a(o).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: m[0] || (m[0] = (v) => a(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (v) => a(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          W(Kd),
          W(w0),
          n("div", bf, [
            W(_f),
            W(o1)
          ]),
          W(C1)
        ], 38),
        W(Jn, { name: "fade" }, {
          default: se(() => [
            a(o).modal.visible ? (f(), X(Qn(a(o).modal.type), { key: 0 })) : P("", !0)
          ]),
          _: 1
        }),
        W(a1)
      ], 2)
    ], 512));
  }
}, Lf = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", xf);
  }
};
export {
  Lf as default
};
