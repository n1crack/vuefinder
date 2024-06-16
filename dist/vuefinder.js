var zn = Object.defineProperty;
var Pn = (t, e, s) => e in t ? zn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var mo = (t, e, s) => Pn(t, typeof e != "symbol" ? e + "" : e, s);
import { reactive as Ot, watch as Je, ref as M, shallowRef as jn, onMounted as Ce, onUnmounted as qs, onUpdated as Ro, nextTick as ft, computed as Ze, inject as ae, openBlock as f, createElementBlock as g, withKeys as $t, unref as a, createElementVNode as n, withModifiers as rt, renderSlot as Dt, normalizeClass as me, toDisplayString as _, createBlock as X, withCtx as se, Fragment as he, renderList as $e, createCommentVNode as P, withDirectives as ve, vModelCheckbox as jt, createTextVNode as Q, createVNode as W, vModelSelect as Ss, isRef as Fo, vModelText as St, onBeforeUnmount as Io, customRef as qn, vShow as ze, TransitionGroup as Gn, normalizeStyle as ns, mergeModels as Kn, useModel as Wn, resolveComponent as Yn, provide as Xn, Transition as Jn, resolveDynamicComponent as Qn } from "vue";
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
  Je(s, r);
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
  const { getStore: o, setStore: c } = t, i = M({}), d = M(o("locale", e)), l = (m, v = e) => {
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
}, dr = Object.values(pe), ur = "2.5.3";
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
const st = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function fr(t, e) {
  const s = M(st.SYSTEM), r = M(st.LIGHT);
  s.value = t.getStore("theme", e ?? st.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    s.value === st.DARK || s.value === st.SYSTEM && i.matches ? r.value = st.DARK : r.value = st.LIGHT;
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
      s.value = i, i !== st.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(o);
    }
  };
}
function hr() {
  const t = jn(null), e = M(!1), s = M();
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
}, zo = typeof window < "u" && typeof document < "u", Ae = zo ? window : {}, Po = Math.max, pr = Math.min, Cs = Math.round, Jt = Math.abs, fo = Math.sign, jo = Ae.cancelAnimationFrame, Gs = Ae.requestAnimationFrame, Qt = Ae.setTimeout, Es = Ae.clearTimeout, rs = (t) => typeof Ae[t] < "u" ? Ae[t] : void 0, vr = rs("MutationObserver"), ho = rs("IntersectionObserver"), Zt = rs("ResizeObserver"), Ts = rs("ScrollTimeline"), qo = zo && Node.ELEMENT_NODE, { toString: Vf, hasOwnProperty: bs } = Object.prototype, as = (t) => t === void 0, Ks = (t) => t === null, je = (t) => typeof t == "number", ls = (t) => typeof t == "string", Go = (t) => typeof t == "boolean", Fe = (t) => typeof t == "function", qe = (t) => Array.isArray(t), Lt = (t) => typeof t == "object" && !qe(t) && !Ks(t), is = (t) => {
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
const Ws = (t, e) => t.indexOf(e) >= 0, Qe = (t, e) => t.concat(e), be = (t, e, s) => (!ls(e) && is(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), dt = (t) => Array.from(t || []), Ko = (t) => qe(t) ? t : [t], Ms = (t) => !!t && !t.length, po = (t) => dt(new Set(t)), Ie = (t, e, s) => {
  ce(t, (o) => o && o.apply(void 0, e || [])), !s && (t.length = 0);
}, Wo = "paddingTop", Yo = "paddingRight", Xo = "paddingLeft", Jo = "paddingBottom", Qo = "marginLeft", Zo = "marginRight", en = "marginBottom", gr = "overflowX", _r = "overflowY", xt = "width", yt = "height", nt = "visible", ut = "hidden", wt = "scroll", br = (t) => {
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
}, tn = (t, e) => ds(t, e, ["w", "h"]), Wt = (t, e) => ds(t, e, ["x", "y"]), xr = (t, e) => ds(t, e, ["t", "r", "b", "l"]), at = () => {
}, J = (t, ...e) => t.bind(0, ...e), mt = (t) => {
  let e;
  const s = t ? Qt : Gs, r = t ? Es : jo;
  return [(o) => {
    r(e), e = s(() => o(), Fe(t) ? t() : t);
  }, () => r(e)];
}, As = (t, e) => {
  const { _: s, p: r, v: o, m: c } = e || {};
  let i, d, l, u, h = at;
  const m = function(x) {
    h(), Es(i), u = i = d = void 0, h = at, t.apply(this, x);
  }, v = (y) => c && d ? c(d, y) : y, p = () => {
    h !== at && m(v(l) || l);
  }, b = function() {
    const x = dt(arguments), A = Fe(s) ? s() : s;
    if (je(A) && A >= 0) {
      const U = Fe(r) ? r() : r, B = je(U) && U >= 0, D = A > 0 ? Qt : Gs, L = A > 0 ? Es : jo, E = v(x) || x, O = m.bind(0, E);
      let T;
      h(), o && !u ? (O(), u = !0, T = D(() => u = void 0, A)) : (T = D(O, A), B && !i && (i = Qt(p, U))), h = () => L(T), d = l = E;
    } else
      m(x);
  };
  return b.S = p, b;
}, sn = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], re = (t, e, s, r, o, c, i) => {
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
}, Ds = (t, e, s) => Po(t, pr(e, s)), ht = (t) => dt(new Set((qe(t) ? t : (t || "").split(" ")).filter((e) => e))), Xs = (t, e) => t && t.getAttribute(e), vo = (t, e) => t && t.hasAttribute(e), Xe = (t, e, s) => {
  ce(ht(e), (r) => {
    t && t.setAttribute(r, String(s || ""));
  });
}, Ue = (t, e) => {
  ce(ht(e), (s) => t && t.removeAttribute(s));
}, us = (t, e) => {
  const s = ht(Xs(t, e)), r = J(Xe, t, e), o = (c, i) => {
    const d = new Set(s);
    return ce(ht(c), (l) => {
      d[i](l);
    }), dt(d).join(" ");
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
}, ss = (t, e) => cs(t) ? t.matches(e) : !1, cn = (t) => ss(t, "body"), Vs = (t) => t ? dt(t.childNodes) : [], kt = (t) => t && t.parentElement, _t = (t, e) => cs(t) && t.closest(e), Os = (t) => document.activeElement, wr = (t, e, s) => {
  const r = _t(t, e), o = t && yr(s, r), c = _t(o, e) === r;
  return r && o ? r === t || o === t || c && _t(_t(t, s), e) !== r : !1;
}, it = (t) => {
  if (is(t))
    ce(dt(t), (e) => it(e));
  else if (t) {
    const e = kt(t);
    e && e.removeChild(t);
  }
}, dn = (t, e, s) => {
  if (s && t) {
    let r = e, o;
    return is(s) ? (o = document.createDocumentFragment(), ce(s, (c) => {
      c === r && (r = c.previousSibling), o.appendChild(c);
    })) : o = s, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(o, r || null), () => it(s);
  }
  return at;
}, Oe = (t, e) => dn(t, null, e), go = (t, e) => dn(kt(t), t && t.nextSibling, e), bt = (t) => {
  const e = document.createElement("div");
  return Xe(e, "class", t), e;
}, un = (t) => {
  const e = bt();
  return e.innerHTML = t.trim(), ce(Vs(e), (s) => it(s));
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
    o = r ? _o(c, e) : dt(e).reduce((i, d) => (i[d] = _o(c, d), i), o);
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
      const x = Jt(m), A = Jt(v);
      y = x > A ? 0 : y, b = x < A ? 0 : b;
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
    const d = et(c), l = [];
    return ce(d, (u) => {
      const h = c[u];
      h && be(l, r(u, h));
    }), J(Ie, l);
  }, o = (c, i) => {
    ce(dt(e.get(c)), (d) => {
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
  const s = {}, r = Qe(et(e), et(t));
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
}, Eo = (t, e, s) => (r) => [Co(t, r), s || Co(e, r) !== void 0], Ct = "data-overlayscrollbars", Yt = "os-environment", Gt = `${Yt}-scrollbar-hidden`, ys = `${Ct}-initialize`, Xt = "noClipping", To = `${Ct}-body`, lt = Ct, Ar = "host", ot = `${Ct}-viewport`, Dr = gr, Lr = _r, Vr = "arrange", _n = "measuring", bn = "scrollbarHidden", Or = "scrollbarPressed", Hr = "noContent", Us = `${Ct}-padding`, Mo = `${Ct}-content`, so = "os-size-observer", Br = `${so}-appear`, Rr = `${so}-listener`, Fr = "os-trinsic-observer", Ir = "os-theme-none", Be = "os-scrollbar", Nr = `${Be}-rtl`, Ur = `${Be}-horizontal`, zr = `${Be}-vertical`, xn = `${Be}-track`, oo = `${Be}-handle`, Pr = `${Be}-visible`, jr = `${Be}-cornerless`, Ao = `${Be}-interaction`, Do = `${Be}-unusable`, zs = `${Be}-auto-hide`, Lo = `${zs}-hidden`, Vo = `${Be}-wheel`, qr = `${xn}-interactive`, Gr = `${oo}-interactive`;
let ws;
const Kr = () => {
  const t = (k, U, B) => {
    Oe(document.body, k), Oe(document.body, k);
    const D = mn(k), L = Mt(k), V = to(U);
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
  }, b = re({}, Mr), y = J(re, {}, b), x = J(re, {}, p), A = {
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
  if (Ue(o, "style"), it(o), fe(Ae, "resize", () => {
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
  }), [v, p] = Qr(t, m, d), b = c || [], y = i || [], x = Qe(b, y), A = (U, B) => {
    if (!Ms(B)) {
      const D = u || at, L = h || at, V = [], E = [];
      let O = !1, T = !1;
      if (ce(B, (S) => {
        const { attributeName: H, target: $, type: w, oldValue: I, addedNodes: R, removedNodes: oe } = S, de = w === "attributes", le = w === "childList", F = t === $, ee = de && H, te = ee && Xs($, H || ""), Y = ls(te) ? te : null, ue = ee && I !== Y, z = Ws(y, H) && ue;
        if (e && (le || !F)) {
          const q = de && ue, j = q && l && ss($, l), N = (j ? !D($, H, I, Y) : !de || q) && !L(S, !!j, t, r);
          ce(R, (G) => be(V, G)), ce(oe, (G) => be(V, G)), T = T || N;
        }
        !e && F && ue && !D($, H, I, Y) && (be(E, H), O = O || z);
      }), p((S) => po(V).reduce((H, $) => (be(H, ln(S, $)), ss($, S) ? be(H, $) : H), [])), e)
        return !U && T && s(!1), [!1];
      if (!Ms(E) || O) {
        const S = [po(E), O];
        return !U && s.apply(0, S), S;
      }
    }
  }, k = new vr(J(A, !1));
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
      return m.S(), A(!0, k.takeRecords());
  }];
}, $n = {}, Sn = {}, Zr = (t) => {
  ce(t, (e) => ce(e, (s, r) => {
    $n[r] = e[r];
  }));
}, Cn = (t, e, s) => et(t).map((r) => {
  const { static: o, instance: c } = t[r], [i, d, l] = s || [], u = s ? c : o;
  if (u) {
    const h = s ? u(i, d, e) : u(e);
    return (l || Sn)[r] = h;
  }
}), Ht = (t) => Sn[t], ea = "__osOptionsValidationPlugin", ta = "__osSizeObserverPlugin", sa = (t, e) => {
  const { M: s } = e, [r, o] = t("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, o];
}, os = (t) => t.indexOf(nt) === 0, oa = (t, e) => {
  const s = (o, c, i, d) => {
    const l = o === nt ? ut : o.replace(`${nt}-`, ""), u = os(o), h = os(i);
    return !c && !d ? ut : u && h ? nt : u ? c && d ? l : c ? nt : ut : c ? l : h && d ? nt : ut;
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
        const [y, , x] = c(m.contentRect), A = Rs(y);
        b = fn(y, x), p = !b && !A;
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
      be(i, Qe([Zs(l, Br), fe(l, "animationstart", m)], v));
    } else
      return at;
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
  const h = `[${lt}]`, m = `[${ot}]`, v = [], p = ["wrap", "cols", "rows"], b = ["id", "class", "style", "open"], { vt: y, ht: x, ot: A, gt: k, bt: U, wt: B, nt: D, yt: L, St: V, Ot: E } = t, O = (C) => pt(C, "direction") === "rtl", T = {
    $t: !1,
    ct: O(y)
  }, S = Ge(), H = Ht(En), [$] = Ve({
    i: tn,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = H && H.tt(t, e, T, S, s).ut, G = !(L && D) && Qs(x, lt, Xt), K = !D && V(Vr), Z = K && He(k), ie = E(_n, G), ye = K && C && C()[0], Se = Bs(A), ne = to(A);
    return ye && ye(), Pe(k, Z), G && ie(), {
      w: Se.w + ne.w,
      h: Se.h + ne.h
    };
  }), w = B ? p : Qe(b, p), I = As(r, {
    _: () => o,
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
  }, oe = (C, N) => {
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
  }, [ee, te] = U ? ra(x, oe) : [], Y = !D && Tn(x, de, {
    dt: !0
  }), [ue, z] = Oo(x, !1, F, {
    X: b,
    j: Qe(b, v)
  }), q = D && Zt && new Zt((C) => {
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
    const C = Y && Y(), N = ee && ee(), G = ue(), K = S.L((Z) => {
      Z ? I({
        zt: Z
      }) : j();
    });
    return () => {
      q && q.disconnect(), C && C(), N && N(), d && d(), G(), K();
    };
  }, ({ It: C, At: N, Tt: G }) => {
    const K = {}, [Z] = C("update.ignoreMutation"), [ie, ye] = C("update.attributes"), [Se, ne] = C("update.elementEvents"), [we, Ee] = C("update.debounce"), Re = ne || ye, ke = N || G, De = (xe) => Fe(Z) && Z(xe);
    if (Re) {
      i && i(), d && d();
      const [xe, ge] = Oo(U || A, !0, le, {
        j: Qe(w, ie || []),
        Y: Se,
        W: h,
        K: (Te, _e) => {
          const { target: Me, attributeName: Le } = Te;
          return (!_e && Le && !D ? wr(Me, h, m) : !1) || !!_t(Me, `.${Be}`) || !!De(Te);
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
  }, T];
}, la = (t, e, s, r) => {
  const { P: o } = Ge(), { scrollbars: c } = o(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: h, gt: m, yt: v, nt: p } = e, { scrollbars: b } = h ? {} : t, { slot: y } = b || {}, x = /* @__PURE__ */ new Map(), A = (z) => Ts && new Ts({
    source: m,
    axis: z
  }), k = {
    x: A("x"),
    y: A("y")
  }, U = wn([d, l, u], () => p && v ? d : l, i, y), B = (z, q) => {
    if (q) {
      const Z = z ? xt : yt, { kt: ie, Mt: ye } = q, Se = At(ye)[Z], ne = At(ie)[Z];
      return Ds(0, 1, Se / ne || 0);
    }
    const j = z ? "x" : "y", { Rt: C, Vt: N } = s, G = N[j], K = C[j];
    return Ds(0, 1, G / (G + K) || 0);
  }, D = (z, q, j) => {
    const C = B(j, z);
    return 1 / C * (1 - C) * q;
  }, L = (z) => re(z, {
    clear: ["left"]
  }), V = (z) => {
    x.forEach((q, j) => {
      (z ? Ws(Ko(z), j) : !0) && (ce(q || [], (N) => {
        N && N.cancel();
      }), x.delete(j));
    });
  }, E = (z, q, j, C) => {
    const N = x.get(z) || [], G = N.find((K) => K && K.timeline === q);
    G ? G.effect = new KeyframeEffect(z, j, {
      composite: C
    }) : x.set(z, Qe(N, [z.animate(j, {
      timeline: q,
      composite: C
    })]));
  }, O = (z, q, j) => {
    const C = j ? Zs : an;
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
        [q ? xt : yt]: bo(B(q))
      }];
    });
  }, H = (z, q) => {
    const { Pt: j } = s, C = q ? "x" : "y", N = k[C], G = wo(j)[C], K = (Z, ie) => xs(bo(D(Z, G ? ie : 1 - ie, q)), q);
    N ? ce(z, (Z) => {
      const { Mt: ie } = Z;
      E(ie, N, L({
        transform: [0, 1].map((ye) => K(Z, ye))
      }));
    }) : T(z, (Z) => [Z.Mt, {
      transform: K(Z, ko(j, He(m))[C])
    }]);
  }, $ = (z) => p && !v && kt(z) === u, w = [], I = [], R = [], oe = (z, q, j) => {
    const C = Go(j), N = C ? j : !0, G = C ? !j : !0;
    N && O(I, z, q), G && O(R, z, q);
  }, de = () => {
    S(I, !0), S(R);
  }, le = () => {
    H(I, !0), H(R);
  }, F = () => {
    if (p) {
      const { Rt: z, Pt: q } = s, j = wo(q), C = 0.5;
      if (k.x && k.y)
        ce(Qe(R, I), ({ Lt: N }) => {
          if ($(N)) {
            const G = (K) => E(N, k[K], L({
              transform: [0, j[K] ? 1 : -1].map((Z) => xs(Hs(Z * (z[K] - C)), K === "x"))
            }), "add");
            G("x"), G("y");
          } else
            V(N);
        });
      else {
        const N = ko(q, He(m)), G = (K) => {
          const { Lt: Z } = K, ie = $(Z) && Z, ye = (Se, ne, we) => {
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
        T(I, G), T(R, G);
      }
    }
  }, ee = (z) => {
    const j = bt(`${Be} ${z ? Ur : zr}`), C = bt(xn), N = bt(oo), G = {
      Lt: j,
      kt: C,
      Mt: N
    };
    return be(z ? I : R, G), be(w, [Oe(j, C), Oe(C, N), J(it, j), V, r(G, oe, H, z)]), G;
  }, te = J(ee, !0), Y = J(ee, !1), ue = () => (Oe(U, I[0].Lt), Oe(U, R[0].Lt), J(Ie, w));
  return te(), Y(), [{
    Ut: de,
    Nt: le,
    qt: F,
    Bt: oe,
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
}, ia = (t, e, s, r) => (o, c, i, d) => {
  const { ht: l, ot: u, nt: h, gt: m, Jt: v, Ot: p } = e, { Lt: b, kt: y, Mt: x } = o, [A, k] = mt(333), [U, B] = mt(444), [D, L] = mt(), V = J(i, [o], d), E = ($) => {
    Fe(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: $.x,
      top: $.y
    });
  }, O = d ? xt : yt, T = () => {
    const $ = "pointerup pointercancel lostpointercapture", w = `client${d ? "X" : "Y"}`, I = d ? "left" : "top", R = d ? "w" : "h", oe = d ? "x" : "y", de = (le, F) => (ee) => {
      const { Rt: te } = s, Y = Mt(y)[R] - Mt(x)[R], z = F * ee / Y * te[oe];
      Pe(m, {
        [oe]: le + z
      });
    };
    return fe(y, "pointerdown", (le) => {
      const F = _t(le.target, `.${oo}`) === x, ee = F ? x : y, te = t.scrollbars, { button: Y, isPrimary: ue, pointerType: z } = le, { pointers: q } = te;
      if (Y === 0 && ue && te[F ? "dragScroll" : "clickScroll"] && (q || []).includes(z)) {
        B();
        const C = !F && le.shiftKey, N = J(At, x), G = J(At, y), K = (_e, Me) => (_e || N())[I] - (Me || G())[I], Z = Cs(At(m)[O]) / Mt(m)[R] || 1, ie = de(He(m)[oe], 1 / Z), ye = le[w], Se = N(), ne = G(), we = Se[O], Ee = K(Se, ne) + we / 2, Re = ye - ne[I], ke = F ? 0 : Re - Ee, De = (_e) => {
          Ie(Te), ee.releasePointerCapture(_e.pointerId);
        }, xe = () => p(Or, !0), ge = xe(), Te = [() => {
          const _e = He(m);
          ge();
          const Me = He(m), Le = {
            x: Me.x - _e.x,
            y: Me.y - _e.y
          };
          (Jt(Le.x) > 3 || Jt(Le.y) > 3) && (xe(), Pe(m, _e), E(Le), U(ge));
        }, fe(v, $, De), fe(v, "selectstart", (_e) => Fs(_e), {
          H: !1
        }), fe(y, $, De), fe(y, "pointermove", (_e) => {
          const Me = _e[w] - ye;
          (F || C) && ie(ke + Me);
        })];
        if (ee.setPointerCapture(le.pointerId), C)
          ie(ke);
        else if (!F) {
          const _e = Ht(na);
          _e && be(Te, _e(ie, K, ke, we, Re));
        }
      }
    });
  };
  let S = !0;
  const H = ($) => $.propertyName.indexOf(O) > -1;
  return J(Ie, [fe(x, "pointermove pointerleave", r), fe(b, "pointerenter", () => {
    c(Ao, !0);
  }), fe(b, "pointerleave pointercancel", () => {
    c(Ao, !1);
  }), !h && fe(b, "mousedown", () => {
    const $ = Os();
    (vo($, ot) || vo($, lt) || $ === document.body) && Qt(J(Is, u), 25);
  }), fe(b, "wheel", ($) => {
    const { deltaX: w, deltaY: I, deltaMode: R } = $;
    S && R === 0 && kt(b) === l && E({
      x: w,
      y: I
    }), S = !1, c(Vo, !0), A(() => {
      S = !0, c(Vo);
    }), Fs($);
  }, {
    H: !1,
    I: !0
  }), fe(x, "transitionstart", ($) => {
    if (H($)) {
      const w = () => {
        V(), D(w);
      };
      w();
    }
  }), fe(x, "transitionend transitioncancel", ($) => {
    H($) && (L(), V());
  }), fe(b, "pointerdown", J(fe, v, "click", pn, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), T(), k, B, L]);
}, ca = (t, e, s, r, o, c) => {
  let i, d, l, u, h, m = at, v = 0;
  const p = (F) => F.pointerType === "mouse", [b, y] = mt(), [x, A] = mt(100), [k, U] = mt(100), [B, D] = mt(() => v), [L, V] = la(t, o, r, ia(e, o, r, (F) => p(F) && R())), { ht: E, Kt: O, yt: T } = o, { Bt: S, Ut: H, Nt: $, qt: w } = L, I = (F, ee) => {
    if (D(), F)
      S(Lo);
    else {
      const te = J(S, Lo, !0);
      v > 0 && !ee ? B(te) : te();
    }
  }, R = () => {
    (l ? !i : !u) && (I(!0), x(() => {
      I(!1);
    }));
  }, oe = (F) => {
    S(zs, F, !0), S(zs, F, !1);
  }, de = (F) => {
    p(F) && (i = l, l && I(!0));
  }, le = [D, A, U, y, () => m(), fe(E, "pointerover", de, {
    A: !0
  }), fe(E, "pointerenter", de), fe(E, "pointerleave", (F) => {
    p(F) && (i = !1, l && I(!1));
  }), fe(E, "pointermove", (F) => {
    p(F) && d && R();
  }), fe(O, "scroll", (F) => {
    b(() => {
      $(), R();
    }), c(F), w();
  })];
  return [() => J(Ie, be(le, V())), ({ It: F, Tt: ee, Gt: te, Qt: Y }) => {
    const { Zt: ue, tn: z, nn: q, sn: j } = Y || {}, { Ct: C, dt: N } = te || {}, { ct: G } = s, { M: K } = Ge(), { G: Z, en: ie } = r, [ye, Se] = F("showNativeOverlaidScrollbars"), [ne, we] = F("scrollbars.theme"), [Ee, Re] = F("scrollbars.visibility"), [ke, De] = F("scrollbars.autoHide"), [xe, ge] = F("scrollbars.autoHideSuspend"), [Te] = F("scrollbars.autoHideDelay"), [_e, Me] = F("scrollbars.dragScroll"), [Le, vt] = F("scrollbars.clickScroll"), [Bt, hs] = F("overflow"), ps = N && !ee, vs = ie.x || ie.y, Ne = ue || z || j || C || ee, gs = q || Re || hs, Rt = ye && K.x && K.y, Ft = (tt, Et, Tt) => {
      const It = tt.includes(wt) && (Ee === nt || Ee === "auto" && Et === wt);
      return S(Pr, It, Tt), It;
    };
    if (v = Te, ps && (xe && vs ? (oe(!1), m(), k(() => {
      m = fe(O, "scroll", J(oe, !0), {
        A: !0
      });
    })) : oe(!0)), Se && S(Ir, Rt), we && (S(h), S(ne, !0), h = ne), ge && !xe && oe(!0), De && (d = ke === "move", l = ke === "leave", u = ke === "never", I(u, !0)), Me && S(Gr, _e), vt && S(qr, Le), gs) {
      const tt = Ft(Bt.x, Z.x, !0), Et = Ft(Bt.y, Z.y, !1);
      S(jr, !(tt && Et));
    }
    Ne && (H(), $(), w(), S(Do, !ie.x, !0), S(Do, !ie.y, !1), S(Nr, G && !T));
  }, {}, L];
}, da = (t) => {
  const e = Ge(), { P: s, R: r } = e, { elements: o } = s(), { host: c, padding: i, viewport: d, content: l } = o, u = ts(t), h = u ? {} : t, { elements: m } = h, { host: v, padding: p, viewport: b, content: y } = m || {}, x = u ? t : h.target, A = cn(x), k = ss(x, "textarea"), U = x.ownerDocument, B = U.documentElement, D = () => U.defaultView || Ae, L = J(Wr, [x]), V = J(wn, [x]), E = J(bt, ""), O = J(L, E, d), T = J(V, E, l), S = O(b), H = S === x, $ = H && A, w = !H && T(y), I = !H && S === w, R = $ ? B : S, oe = k ? L(E, c, v) : x, de = $ ? R : oe, le = !H && V(E, i, p), F = !I && w, ee = [F, R, le, de].map((ne) => ts(ne) && !kt(ne) && ne), te = (ne) => ne && Ws(ee, ne), Y = te(R) ? x : R, ue = {
    vt: x,
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
    St: (ne) => Qs(R, ot, ne),
    Ot: (ne, we) => Ls(R, ot, ne, we)
  }, { vt: z, ht: q, cn: j, ot: C, bt: N } = ue, G = [() => {
    Ue(q, [lt, ys]), Ue(z, ys), A && Ue(B, [ys, lt]);
  }], K = k && te(q);
  let Z = k ? z : Vs([N, C, j, q, z].find((ne) => ne && !te(ne)));
  const ie = $ ? z : N || C, ye = J(Ie, G);
  return [ue, () => {
    const ne = D(), we = Os(), Ee = (ge) => {
      Oe(kt(ge), Vs(ge)), it(ge);
    }, Re = (ge) => fe(ge, "focusin focusout focus blur", pn, {
      I: !0,
      H: !1
    }), ke = "tabindex", De = Xs(C, ke), xe = Re(we);
    return Xe(q, lt, H ? "" : Ar), Xe(j, Us, ""), Xe(C, ot, ""), Xe(N, Mo, ""), H || (Xe(C, ke, De || "-1"), A && Xe(B, To, "")), K && (go(z, q), be(G, () => {
      go(q, z), it(q);
    })), Oe(ie, Z), Oe(q, j), Oe(j || q, !H && C), Oe(C, N), be(G, [xe, () => {
      const ge = Os(), Te = te(C), _e = Te && ge === C ? z : ge, Me = Re(_e);
      Ue(j, Us), Ue(N, Mo), Ue(C, ot), A && Ue(B, To), De ? Xe(C, ke, De) : Ue(C, ke), te(N) && Ee(N), Te && Ee(C), te(j) && Ee(j), Is(_e), Me();
    }]), r && !H && (Js(C, ot, bn), be(G, J(Ue, C, ot))), Is(!H && A && we === z && ne.top === ne ? C : we), xe(), Z = 0, ye;
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
    const { R: p } = Ge(), { ft: b, Ht: y, Ct: x } = l || {}, { ct: A } = u, [k, U] = d("paddingAbsolute");
    (b || v || (h || y)) && ([m, v] = c(h));
    const D = !r && (U || x || v);
    if (D) {
      const L = !k || !e && !p, V = m.r + m.l, E = m.t + m.b, O = {
        [Zo]: L && !A ? -V : 0,
        [en]: L ? -E : 0,
        [Qo]: L && A ? -V : 0,
        top: L ? -m.t : 0,
        right: L ? A ? -m.r : "auto" : 0,
        left: L ? A ? "auto" : -m.l : 0,
        [xt]: L && `calc(100% + ${V}px)`
      }, T = {
        [Wo]: L ? m.t : 0,
        [Yo]: L ? m.r : 0,
        [Jo]: L ? m.b : 0,
        [Xo]: L ? m.l : 0
      };
      Vt(e || s, O), Vt(s, T), re(o, {
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
  const s = Ge(), { ht: r, cn: o, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: h, ln: m } = t, { R: v } = s, p = u && i, b = J(Po, 0), y = ["display", "direction", "flexDirection", "writingMode"], x = {
    i: tn,
    o: {
      w: 0,
      h: 0
    }
  }, A = {
    i: Wt,
    o: {}
  }, k = (F) => {
    h(_n, !p && F);
  }, U = (F, ee) => {
    const te = Ae.devicePixelRatio % 1 !== 0 ? 1 : 0, Y = {
      w: b(F.w - ee.w),
      h: b(F.h - ee.h)
    };
    return {
      w: Y.w > te ? Y.w : 0,
      h: Y.h > te ? Y.h : 0
    };
  }, [B, D] = Ve(x, J(to, c)), [L, V] = Ve(x, J(Bs, c)), [E, O] = Ve(x), [T] = Ve(A), [S, H] = Ve(x), [$] = Ve(A), [w] = Ve({
    i: (F, ee) => ds(F, ee, y),
    o: {}
  }, () => Er(c) ? pt(c, y) : {}), [I, R] = Ve({
    i: (F, ee) => Wt(F.T, ee.T) && Wt(F.D, ee.D),
    o: vn()
  }, () => {
    k(!0);
    const F = He(l), ee = h(Hr, !0), te = fe(d, wt, (j) => {
      const C = He(l);
      j.isTrusted && C.x === F.x && C.y === F.y && hn(j);
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
  }), oe = Ht(En), de = (F, ee) => `${ee ? Dr : Lr}${br(F)}`, le = (F) => {
    const ee = (Y) => [nt, ut, wt].map((ue) => de(ue, Y)), te = ee(!0).concat(ee()).join(" ");
    h(te), h(et(F).map((Y) => de(F[Y], Y === "x")).join(" "), !0);
  };
  return ({ It: F, Gt: ee, an: te, Tt: Y }, { _n: ue }) => {
    const { ft: z, Ht: q, Ct: j, dt: C, zt: N } = ee || {}, G = oe && oe.tt(t, e, te, s, F), { it: K, ut: Z, _t: ie } = G || {}, [ye, Se] = sa(F, s), [ne, we] = F("overflow"), Ee = os(ne.x), Re = os(ne.y), ke = z || ue || q || j || N || Se;
    let De = D(Y), xe = V(Y), ge = O(Y), Te = H(Y);
    if (Se && v && h(bn, !ye), ke) {
      Qs(r, lt, Xt) && k(!0);
      const [co] = Z ? Z() : [], [Nt] = De = B(Y), [Ut] = xe = L(Y), zt = mn(c), Pt = p && Cr(m()), Un = {
        w: b(Ut.w + Nt.w),
        h: b(Ut.h + Nt.h)
      }, uo = {
        w: b((Pt ? Pt.w : zt.w + b(zt.w - Ut.w)) + Nt.w),
        h: b((Pt ? Pt.h : zt.h + b(zt.h - Ut.h)) + Nt.h)
      };
      co && co(), Te = S(uo), ge = E(U(Un, uo), Y);
    }
    const [_e, Me] = Te, [Le, vt] = ge, [Bt, hs] = xe, [ps, vs] = De, [Ne, gs] = T({
      x: Le.w > 0,
      y: Le.h > 0
    }), Rt = Ee && Re && (Ne.x || Ne.y) || Ee && Ne.x && !Ne.y || Re && Ne.y && !Ne.x, Ft = ue || j || N || vs || hs || Me || vt || we || Se || ke, tt = oa(Ne, ne), [Et, Tt] = $(tt.G), [, It] = w(Y), io = j || C || It || gs || Y, [In, Nn] = io ? I(Y) : R();
    return Ft && (Tt && le(tt.G), ie && K && Vt(c, ie(tt, te, K(tt, Bt, ps)))), k(!1), Ls(r, lt, Xt, Rt), Ls(o, Us, Xt, Rt), re(e, {
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
      x: ut,
      y: ut
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
  }), [b, y, , x] = ca(t, e, p, l, u, o), A = (U) => et(U).some((B) => !!U[B]), k = (U, B) => {
    if (s())
      return !1;
    const { fn: D, Tt: L, At: V, pn: E } = U, O = D || {}, T = !!L, S = {
      It: Eo(e, O, T),
      fn: O,
      Tt: T
    };
    if (E)
      return y(S), !1;
    const H = B || v(re({}, S, {
      At: V
    })), $ = d(re({}, S, {
      an: p,
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
    const { rn: U, gt: B } = u, D = He(U), L = [m(), i(), b()];
    return Pe(B, D), J(Ie, L);
  }, k, () => ({
    vn: p,
    hn: l
  }), {
    gn: u,
    bn: x
  }, h];
}, ct = (t, e, s) => {
  const { N: r } = Ge(), o = ts(t), c = o ? t : t.target, i = kn(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, h = (T) => {
      const S = on(T), H = Ht(ea);
      return H ? H(S, !0) : S;
    }, m = re({}, r(), h(e)), [v, p, b] = Ns(), [y, x, A] = Ns(s), k = (T, S) => {
      A(T, S), b(T, S);
    }, [U, B, D, L, V] = pa(t, m, () => d, ({ fn: T, Tt: S }, { Gt: H, Qt: $ }) => {
      const { ft: w, Ct: I, xt: R, Ht: oe, Et: de, dt: le } = H, { Zt: F, tn: ee, nn: te, sn: Y } = $;
      k("updated", [O, {
        updateHints: {
          sizeChanged: !!w,
          directionChanged: !!I,
          heightIntrinsicChanged: !!R,
          overflowEdgeChanged: !!F,
          overflowAmountChanged: !!ee,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!Y,
          contentMutation: !!oe,
          hostMutation: !!de,
          appear: !!le
        },
        changedOptions: T || {},
        force: !!S
      }]);
    }, (T) => k("scroll", [O, T])), E = (T) => {
      Jr(c), Ie(l), d = !0, k("destroyed", [O, T]), p(), x();
    }, O = {
      options(T, S) {
        if (T) {
          const H = S ? r() : {}, $ = gn(m, re(H, h(T)));
          Ys($) || (re(m, $), B({
            fn: $
          }));
        }
        return re({}, m);
      },
      on: y,
      off: (T, S) => {
        T && S && x(T, S);
      },
      state() {
        const { vn: T, hn: S } = D(), { ct: H } = T, { Vt: $, Rt: w, G: I, en: R, cn: oe, un: de, Pt: le } = S;
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
          directionRTL: H,
          destroyed: d
        });
      },
      elements() {
        const { vt: T, ht: S, cn: H, ot: $, bt: w, gt: I, Kt: R } = L.gn, { Ft: oe, Wt: de } = L.bn, le = (ee) => {
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
          scrollbarHorizontal: F(oe),
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
    return be(l, [V]), Xr(c, O), Cn($n, ct, [O, v, u]), Yr(L.gn.yt, !o && t.cancel) ? (E(!0), O) : (be(l, U()), k("initialized", [O]), O.update(!0), O);
  }
  return i;
};
ct.plugin = (t) => {
  const e = qe(t), s = e ? t : [t], r = s.map((o) => Cn(o, ct)[0]);
  return Zr(s), e ? r : r[0];
};
ct.valid = (t) => {
  const e = t && t.elements, s = Fe(e) && e();
  return es(s) && !!kn(s.target);
};
ct.env = () => {
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
  const e = M(null), s = Math.floor(Math.random() * 2 ** 32), r = M(!1), o = M([]), c = () => o.value, i = () => t.getSelection(), d = () => o.value.length, l = () => t.clearSelection(!0), u = M(), h = M(null), m = M(null), v = M(null);
  function p() {
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
  const b = () => ft(() => {
    t.addSelection(
      t.getSelectables()
    ), y();
  }), y = () => {
    o.value = t.getSelection().map((B) => JSON.parse(B.dataset.item)), u.value(o.value);
  }, x = () => ft(() => {
    const B = c().map((D) => D.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((D) => B.includes(JSON.parse(D.dataset.item).path))
    ), y(), k();
  }), A = (B) => {
    u.value = B, t.subscribe("DS:end", ({ items: D, event: L, isDragging: V }) => {
      o.value = D.map((E) => JSON.parse(E.dataset.item)), B(D.map((E) => JSON.parse(E.dataset.item)));
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
    onSelect: A
  };
}
function ga(t, e) {
  const s = M(t), r = M(e), o = M([]), c = M([]), i = M([]), d = M(!1), l = M(5);
  let u = !1, h = !1;
  const m = Ot({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function v() {
    let k = [], U = [], B = r.value ?? s.value + "://";
    B.length === 0 && (o.value = []), B.replace(s.value + "://", "").split("/").forEach(function(V) {
      k.push(V), k.join("/") !== "" && U.push({
        basename: V,
        name: V,
        path: s.value + "://" + k.join("/"),
        type: "dir"
      });
    }), c.value = U;
    const [D, L] = b(U, l.value);
    i.value = L, o.value = D;
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
  const A = Ze(() => {
    var k;
    return ((k = o.value[o.value.length - 2]) == null ? void 0 : k.path) ?? s.value + "://";
  });
  return Ce(() => {
  }), Je(r, v), Ce(v), {
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
    parentFolderPath: A
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
    i18n: Ze(() => cr(s, d, r, i)),
    // modal state
    modal: hr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Ze(() => va()),
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
    const e = M(null), s = ae("ServiceContainer");
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
          onMousedown: o[0] || (o[0] = rt((c) => a(s).modal.close(), ["self"]))
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
    const r = ae("ServiceContainer"), o = M(!1), { t: c } = r.i18n;
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
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ n("kbd", null, "A")
], -1), El = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Tl = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ n("kbd", null, "F")
], -1), Ml = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Al = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ n("kbd", null, "E")
], -1), Dl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ll = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ n("kbd", null, ",")
], -1), Vl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ol = /* @__PURE__ */ n("div", null, [
  /* @__PURE__ */ n("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ n("kbd", null, "Enter")
], -1), Hl = {
  key: 3,
  class: "mt-3"
}, Bl = { class: "m-1 text-sm text-gray-500" }, Mn = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: o, changeLocale: c, locale: i } = e.i18n, d = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, l = Ze(() => [
      { name: o("About"), key: d.ABOUT },
      { name: o("Settings"), key: d.SETTINGS },
      { name: o("Shortcuts"), key: d.SHORTCUTS },
      { name: o("Reset"), key: d.RESET }
    ]), u = M("about"), h = async () => {
      r(), location.reload();
    }, m = (B) => {
      e.theme.set(B), e.emitter.emit("vf-theme-saved");
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
      }).filter(([B]) => Object.keys(x).includes(B))
    ), U = Ze(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (B, D) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          onClick: D[8] || (D[8] = (L) => a(e).modal.close()),
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
                    onClick: (V) => u.value = L.key,
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
                          "onUpdate:modelValue": D[0] || (D[0] = (L) => a(e).metricUnits = L),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).metricUnits]
                        ])
                      ]),
                      n("div", Pa, [
                        n("label", ja, [
                          Q(_(a(o)("Use Metric Units")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(o)("Saved.")), 1)
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
                          "onUpdate:modelValue": D[1] || (D[1] = (L) => a(e).compactListView = L),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).compactListView]
                        ])
                      ]),
                      n("div", Ka, [
                        n("label", Wa, [
                          Q(_(a(o)("Compact list view")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(o)("Saved.")), 1)
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
                          "onUpdate:modelValue": D[2] || (D[2] = (L) => a(e).persist = L),
                          onClick: y,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).persist]
                        ])
                      ]),
                      n("div", Ja, [
                        n("label", Qa, [
                          Q(_(a(o)("Persist path on reload")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(o)("Saved.")), 1)
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
                          "onUpdate:modelValue": D[3] || (D[3] = (L) => a(e).showThumbnails = L),
                          onClick: b,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, a(e).showThumbnails]
                        ])
                      ]),
                      n("div", tl, [
                        n("label", sl, [
                          Q(_(a(o)("Show thumbnails")) + " ", 1),
                          W(gt, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: se(() => [
                              Q(_(a(o)("Saved.")), 1)
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
                          "onUpdate:modelValue": D[4] || (D[4] = (L) => a(e).theme.value = L),
                          onChange: D[5] || (D[5] = (L) => m(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          n("optgroup", {
                            label: a(o)("Theme")
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
                            Q(_(a(o)("Saved.")), 1)
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
                          "onUpdate:modelValue": D[6] || (D[6] = (L) => Fo(i) ? i.value = L : null),
                          onChange: D[7] || (D[7] = (L) => a(c)(L.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          n("optgroup", {
                            label: a(o)("Language")
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
                            Q(_(a(o)("Saved.")), 1)
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
                  Q(_(a(o)("Delete")) + " ", 1),
                  wl
                ]),
                n("div", kl, [
                  Q(_(a(o)("Escape")) + " ", 1),
                  $l
                ]),
                n("div", Sl, [
                  Q(_(a(o)("Select All")) + " ", 1),
                  Cl
                ]),
                n("div", El, [
                  Q(_(a(o)("Search")) + " ", 1),
                  Tl
                ]),
                n("div", Ml, [
                  Q(_(a(o)("Toggle Sidebar")) + " ", 1),
                  Al
                ]),
                n("div", Dl, [
                  Q(_(a(o)("Open Settings")) + " ", 1),
                  Ll
                ]),
                n("div", Vl, [
                  Q(_(a(o)("Toggle Full Screen")) + " ", 1),
                  Ol
                ])
              ])
            ])) : P("", !0),
            u.value === d.RESET ? (f(), g("div", Hl, [
              n("div", Bl, _(a(o)("Reset all settings to default")), 1),
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
}, Rl = ["aria-label"], Fl = /* @__PURE__ */ n("svg", {
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
    const s = e, r = ae("ServiceContainer"), { t: o } = r.i18n, c = M(!1), i = M(null), d = M((u = i.value) == null ? void 0 : u.strMessage);
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
        n("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": a(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Il, 8, Rl)
      ], 2))
    ]));
  }
}, Nl = { class: "sm:flex sm:items-start" }, Ul = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, Yl = /* @__PURE__ */ n("path", {
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
}, Ql = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Zl = [
  Ql
], ei = { class: "ml-1.5" }, ti = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, ro = {
  __name: "ModalDelete",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items), o = M(""), c = () => {
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
        n("div", ti, _(a(s)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        n("div", Nl, [
          Ul,
          n("div", zl, [
            n("h3", Pl, _(a(s)("Delete files")), 1),
            n("div", jl, [
              n("p", ql, _(a(s)("Are you sure you want to delete these files?")), 1),
              n("div", Gl, [
                (f(!0), g(he, null, $e(r.value, (l) => (f(), g("p", Kl, [
                  l.type === "dir" ? (f(), g("svg", Wl, Xl)) : (f(), g("svg", Jl, Zl)),
                  n("span", ei, _(l.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(o.value), 1)
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
}, si = { class: "sm:flex sm:items-start" }, oi = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ni = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ri = {
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
}, ci = /* @__PURE__ */ n("path", {
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
}, mi = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), fi = [
  mi
], hi = { class: "ml-1.5" }, ao = {
  __name: "ModalRename",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items[0]), o = M(e.modal.data.items[0].basename), c = M(""), i = () => {
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
        n("div", si, [
          oi,
          n("div", ni, [
            n("h3", ri, _(a(s)("Rename")), 1),
            n("div", ai, [
              n("p", li, [
                r.value.type === "dir" ? (f(), g("svg", ii, di)) : (f(), g("svg", ui, fi)),
                n("span", hi, _(r.value.basename), 1)
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
function pi(t) {
  const e = (s) => {
    s.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (s.code === Ye.F2 && t.features.includes(pe.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ao, { items: t.dragSelect.getSelected() })), s.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(ro, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === Ye.BACKSLASH && t.modal.open(Mn), s.metaKey && s.code === Ye.KEY_F && t.features.includes(pe.SEARCH) && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), s.metaKey && s.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), s.metaKey && s.code === Ye.KEY_A && (t.dragSelect.selectAll(), s.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  }), qs(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const vi = { class: "sm:flex sm:items-start" }, gi = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), _i = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, bi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, xi = { class: "mt-2" }, yi = { class: "text-sm text-gray-500" }, wi = ["placeholder"], An = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = M(""), o = M(""), c = () => {
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
        n("div", vi, [
          gi,
          n("div", _i, [
            n("h3", bi, _(a(s)("New Folder")), 1),
            n("div", xi, [
              n("p", yi, _(a(s)("Create a new folder")), 1),
              ve(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Folder Name"),
                type: "text"
              }, null, 40, wi), [
                [St, r.value]
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(o.value), 1)
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
}, ki = { class: "sm:flex sm:items-start" }, $i = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Si = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ci = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ei = { class: "mt-2" }, Ti = { class: "text-sm text-gray-500" }, Mi = ["placeholder"], Ai = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = M(""), o = M(""), c = () => {
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
        n("div", ki, [
          $i,
          n("div", Si, [
            n("h3", Ci, _(a(s)("New File")), 1),
            n("div", Ei, [
              n("p", Ti, _(a(s)("Create a new file")), 1),
              ve(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("File Name"),
                type: "text"
              }, null, 40, Mi), [
                [St, r.value]
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(o.value), 1)
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
const Di = { class: "sm:flex sm:items-start" }, Li = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, Ki = ["title", "disabled", "onClick"], Wi = /* @__PURE__ */ n("svg", {
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
], -1), Yi = [
  Wi
], Xi = {
  key: 0,
  class: "py-2"
}, Ji = ["disabled"], Qi = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: o }), i = M(null), d = M(null), l = M(null), u = M(null), h = M(null), m = M(null), v = M([]), p = M(""), b = M(!1), y = M(!1);
    let x;
    function A(H) {
      return v.value.findIndex(($) => $.id === H);
    }
    function k(H, $ = null) {
      $ = $ ?? (H.webkitRelativePath || H.name), x.addFile({
        name: $,
        type: H.type,
        data: H,
        source: "Local"
      });
    }
    function U(H) {
      switch (H.status) {
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
    const B = (H) => {
      switch (H.status) {
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
    function D() {
      u.value.click();
    }
    function L() {
      if (!b.value) {
        if (!v.value.filter((H) => H.status !== o.DONE).length) {
          p.value = s("Please select file to upload first.");
          return;
        }
        p.value = "", x.retryAll(), x.upload();
      }
    }
    function V() {
      x.cancelAll({ reason: "user" }), v.value.forEach((H) => {
        H.status !== o.DONE && (H.status = o.CANCELED, H.statusName = s("Canceled"));
      }), b.value = !1;
    }
    function E(H) {
      b.value || (x.removeFile(H.id, "removed-by-user"), v.value.splice(A(H.id), 1));
    }
    function O(H) {
      if (!b.value) {
        if (x.cancelAll({ reason: "user" }), H) {
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
            const oe = A(w.id);
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
        const R = v.value[A(w.id)];
        E(R), p.value = I.message;
      }), x.on("upload", () => {
        const w = S();
        x.setMeta({ ...w.body });
        const I = x.getPlugin("XHRUpload");
        I.opts.method = w.method, I.opts.endpoint = w.url + "?" + new URLSearchParams(w.params), I.opts.headers = w.headers, delete w.headers["Content-Type"], b.value = !0, v.value.forEach((R) => {
          R.status !== o.DONE && (R.percent = null, R.status = o.UPLOADING, R.statusName = s("Pending upload"));
        });
      }), x.on("upload-progress", (w, I) => {
        const R = Math.floor(I.bytesUploaded / I.bytesTotal * 100);
        v.value[A(w.id)].percent = `${R}%`;
      }), x.on("upload-success", (w) => {
        const I = v.value[A(w.id)];
        I.status = o.DONE, I.statusName = s("Done");
      }), x.on("upload-error", (w, I) => {
        const R = v.value[A(w.id)];
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
      function H(w, I) {
        I.isFile && I.file((R) => w(I, R)), I.isDirectory && I.createReader().readEntries((R) => {
          R.forEach((oe) => {
            H(w, oe);
          });
        });
      }
      m.value.addEventListener("drop", (w) => {
        w.preventDefault(), y.value = !1;
        const I = /^[/\\](.+)/;
        [...w.dataTransfer.items].forEach((R) => {
          R.kind === "file" && H((oe, de) => {
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
    }), (H, $) => (f(), X(Ke, null, {
      buttons: se(() => [
        n("button", {
          type: "button",
          class: me(["vf-btn vf-btn-primary", b.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: b.value,
          onClick: rt(L, ["prevent"])
        }, _(a(s)("Upload")), 11, Ji),
        b.value ? (f(), g("button", {
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
        n("div", Di, [
          Li,
          n("div", Vi, [
            n("h3", Oi, _(a(s)("Upload Files")), 1),
            n("div", Hi, [
              n("div", {
                ref_key: "dropArea",
                ref: m,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: D
              }, [
                y.value ? (f(), g("div", Bi, _(a(s)("Release to drop these files.")), 1)) : (f(), g("div", Ri, _(a(s)("Drag and drop the files/folders to here or click here.")), 1))
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
                  onClick: $[0] || ($[0] = (w) => O(!1))
                }, _(a(s)("Clear all")), 9, Fi),
                n("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: b.value,
                  onClick: $[1] || ($[1] = (w) => O(!0))
                }, _(a(s)("Clear only successful")), 9, Ii)
              ], 512),
              n("div", Ni, [
                (f(!0), g(he, null, $e(v.value, (w) => (f(), g("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: w.id
                }, [
                  n("span", Ui, [
                    n("span", {
                      class: me(["text-base m-auto", U(w)]),
                      textContent: _(B(w))
                    }, null, 10, zi)
                  ]),
                  n("div", Pi, [
                    n("div", ji, _(a(Ps)(w.name, 40)) + " (" + _(w.size) + ")", 1),
                    n("div", qi, _(a(Ps)(w.name, 16)) + " (" + _(w.size) + ")", 1),
                    n("div", {
                      class: me(["flex break-all text-left", U(w)])
                    }, [
                      Q(_(w.statusName) + " ", 1),
                      w.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (f(), g("b", Gi, _(w.percent), 1)) : P("", !0)
                    ], 2)
                  ]),
                  n("button", {
                    type: "button",
                    class: me(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", b.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(s)("Delete"),
                    disabled: b.value,
                    onClick: (I) => E(w)
                  }, Yi, 10, Ki)
                ]))), 128)),
                v.value.length ? P("", !0) : (f(), g("div", Xi, _(a(s)("No files selected!")), 1))
              ]),
              p.value.length ? (f(), X(We, {
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
}, Zi = { class: "sm:flex sm:items-start" }, ec = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), tc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, sc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, oc = { class: "mt-2" }, nc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, rc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ac = /* @__PURE__ */ n("path", {
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
}, cc = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), dc = [
  cc
], uc = { class: "ml-1.5" }, mc = { class: "my-1 text-sm text-gray-500" }, Dn = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items[0]), o = M(""), c = M([]), i = () => {
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
        n("div", Zi, [
          ec,
          n("div", tc, [
            n("h3", sc, _(a(s)("Unarchive")), 1),
            n("div", oc, [
              (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", nc, [
                u.type === "dir" ? (f(), g("svg", rc, lc)) : (f(), g("svg", ic, dc)),
                n("span", uc, _(u.basename), 1)
              ]))), 256)),
              n("p", mc, _(a(s)("The archive will be unarchived at")) + " (" + _(a(e).fs.data.dirname) + ")", 1),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(o.value), 1)
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
}, fc = { class: "sm:flex sm:items-start" }, hc = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), pc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, vc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, gc = { class: "mt-2" }, _c = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, bc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, xc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yc = /* @__PURE__ */ n("path", {
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
}, $c = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Sc = [
  $c
], Cc = { class: "ml-1.5" }, Ec = ["placeholder"], Ln = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(""), o = M(""), c = M(e.modal.data.items), i = () => {
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
        n("div", fc, [
          hc,
          n("div", pc, [
            n("h3", vc, _(a(s)("Archive the files")), 1),
            n("div", gc, [
              n("div", _c, [
                (f(!0), g(he, null, $e(c.value, (u) => (f(), g("p", bc, [
                  u.type === "dir" ? (f(), g("svg", xc, wc)) : (f(), g("svg", kc, Sc)),
                  n("span", Cc, _(u.basename), 1)
                ]))), 256))
              ]),
              ve(n("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Ec), [
                [St, r.value]
              ]),
              o.value.length ? (f(), X(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(_(o.value), 1)
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
}, Mc = /* @__PURE__ */ n("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Ac = [
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
}, Oc = /* @__PURE__ */ n("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Hc = [
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
}, Ic = /* @__PURE__ */ n("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), Nc = [
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
}, jc = /* @__PURE__ */ n("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), qc = [
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
}, Yc = /* @__PURE__ */ n("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), Xc = [
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
}, ed = /* @__PURE__ */ n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), td = [
  ed
];
function sd(t, e) {
  return f(), g("svg", Zc, [...td]);
}
const od = { render: sd }, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, rd = /* @__PURE__ */ n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), ad = [
  rd
];
function ld(t, e) {
  return f(), g("svg", nd, [...ad]);
}
const id = { render: ld }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, dd = /* @__PURE__ */ n("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), ud = /* @__PURE__ */ n("path", {
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
const lo = { render: fd }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, pd = /* @__PURE__ */ n("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), vd = [
  pd
];
function gd(t, e) {
  return f(), g("svg", hd, [...vd]);
}
const _d = { render: gd }, bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, xd = /* @__PURE__ */ n("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), yd = [
  xd
];
function wd(t, e) {
  return f(), g("svg", bd, [...yd]);
}
const kd = { render: wd }, $d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Sd = /* @__PURE__ */ n("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), Cd = [
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
}, Ad = /* @__PURE__ */ n("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), Dd = [
  Ad
];
function Ld(t, e) {
  return f(), g("svg", Md, [...Dd]);
}
const Vd = { render: Ld }, Od = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm grow-0" }, Hd = {
  key: 0,
  class: "flex text-center"
}, Bd = ["aria-label"], Rd = ["aria-label"], Fd = ["aria-label"], Id = ["aria-label"], Nd = ["aria-label"], Ud = ["aria-label"], zd = ["aria-label"], Pd = {
  key: 1,
  class: "flex text-center"
}, jd = { class: "pl-2" }, qd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Gd = { class: "flex text-center items-center justify-end" }, Kd = ["aria-label"], Wd = ["aria-label"], Yd = {
  __name: "Toolbar",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, o = e.dragSelect, c = M("");
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
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (f(), g("div", Od, [
      c.value.length ? (f(), g("div", Pd, [
        n("div", jd, [
          Q(_(a(r)("Search results for")) + " ", 1),
          n("span", qd, _(c.value), 1)
        ]),
        a(e).fs.loading ? (f(), X(a(lo), { key: 0 })) : P("", !0)
      ])) : (f(), g("div", Hd, [
        a(e).features.includes(a(pe).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": a(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: u[0] || (u[0] = (h) => a(e).modal.open(An, { items: a(o).getSelected() }))
        }, [
          W(a(Lc))
        ], 8, Bd)) : P("", !0),
        a(e).features.includes(a(pe).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": a(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[1] || (u[1] = (h) => a(e).modal.open(Ai, { items: a(o).getSelected() }))
        }, [
          W(a(Rc))
        ], 8, Rd)) : P("", !0),
        a(e).features.includes(a(pe).RENAME) ? (f(), g("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": a(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[2] || (u[2] = (h) => a(o).getCount() !== 1 || a(e).modal.open(ao, { items: a(o).getSelected() }))
        }, [
          W(a(zc), {
            class: me(a(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Fd)) : P("", !0),
        a(e).features.includes(a(pe).DELETE) ? (f(), g("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": a(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[3] || (u[3] = (h) => !a(o).getCount() || a(e).modal.open(ro, { items: a(o).getSelected() }))
        }, [
          W(a(Kc), {
            class: me(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Id)) : P("", !0),
        a(e).features.includes(a(pe).UPLOAD) ? (f(), g("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": a(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[4] || (u[4] = (h) => a(e).modal.open(Qi, { items: a(o).getSelected() }))
        }, [
          W(a(Qc))
        ], 8, Nd)) : P("", !0),
        a(e).features.includes(a(pe).UNARCHIVE) && a(o).getCount() === 1 && a(o).getSelected()[0].mime_type === "application/zip" ? (f(), g("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": a(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[5] || (u[5] = (h) => !a(o).getCount() || a(e).modal.open(Dn, { items: a(o).getSelected() }))
        }, [
          W(a(id), {
            class: me(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ud)) : P("", !0),
        a(e).features.includes(a(pe).ARCHIVE) ? (f(), g("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": a(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[6] || (u[6] = (h) => !a(o).getCount() || a(e).modal.open(Ln, { items: a(o).getSelected() }))
        }, [
          W(a(od), {
            class: me(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : P("", !0)
      ])),
      n("div", Gd, [
        a(e).features.includes(a(pe).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          "aria-label": a(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip"
        }, [
          a(e).fullScreen ? (f(), X(a(kd), { key: 0 })) : (f(), X(a(_d), { key: 1 }))
        ], 8, Kd)) : P("", !0),
        n("div", {
          class: "mx-1.5",
          "aria-label": a(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
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
  return (...o) => {
    s && !r && t(...o), clearTimeout(r), r = setTimeout(() => {
      t(...o);
    }, e);
  };
}, Ho = (t, e, s) => {
  const r = M(t);
  return qn((o, c) => ({
    get() {
      return o(), r.value;
    },
    set: Xd(
      (i) => {
        r.value = i, c();
      },
      e,
      s
    )
  }));
}, Jd = { class: "sm:flex sm:items-start" }, Qd = /* @__PURE__ */ n("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Zd = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, eu = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, tu = { class: "text-sm text-gray-500 pb-1" }, su = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, ou = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, nu = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ru = /* @__PURE__ */ n("path", {
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
}, iu = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), cu = [
  iu
], du = { class: "ml-1.5" }, uu = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, mu = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, fu = /* @__PURE__ */ n("svg", {
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
], -1), hu = { class: "ml-1.5 overflow-auto" }, pu = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, js = {
  __name: "ModalMove",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(e.modal.data.items.from), o = M(""), c = () => {
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
        n("div", pu, _(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        n("div", Jd, [
          Qd,
          n("div", Zd, [
            n("h3", eu, _(a(s)("Move files")), 1),
            n("p", tu, _(a(s)("Are you sure you want to move these files?")), 1),
            n("div", su, [
              (f(!0), g(he, null, $e(r.value, (l) => (f(), g("div", ou, [
                n("div", null, [
                  l.type === "dir" ? (f(), g("svg", nu, au)) : (f(), g("svg", lu, cu))
                ]),
                n("div", du, _(l.path), 1)
              ]))), 256))
            ]),
            n("h4", uu, _(a(s)("Target Directory")), 1),
            n("p", mu, [
              fu,
              n("span", hu, _(a(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (f(), X(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => o.value = ""),
              error: ""
            }, {
              default: se(() => [
                Q(_(o.value), 1)
              ]),
              _: 1
            })) : P("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, gu = /* @__PURE__ */ n("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), _u = [
  gu
];
function bu(t, e) {
  return f(), g("svg", vu, [..._u]);
}
const xu = { render: bu }, yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, wu = /* @__PURE__ */ n("path", {
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
}, Eu = /* @__PURE__ */ n("path", {
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
}, Lu = /* @__PURE__ */ n("path", {
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
}, Ru = /* @__PURE__ */ n("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Fu = [
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
}, zu = /* @__PURE__ */ n("path", {
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
}, Ku = /* @__PURE__ */ n("path", {
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
}, Ju = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Qu = /* @__PURE__ */ n("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), Zu = [
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
}, o0 = /* @__PURE__ */ n("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), n0 = [
  o0
];
function r0(t, e) {
  return f(), g("svg", s0, [...n0]);
}
const a0 = { render: r0 }, l0 = { class: "space-x-0.5 flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm grow-0" }, i0 = ["aria-label"], c0 = ["aria-label"], d0 = ["aria-label"], u0 = ["aria-label"], m0 = { class: "flex leading-6" }, f0 = {
  key: 0,
  class: "flex"
}, h0 = /* @__PURE__ */ n("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), p0 = { class: "relative" }, v0 = /* @__PURE__ */ n("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), g0 = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], _0 = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, b0 = ["placeholder"], x0 = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, y0 = ["onDrop", "onClick"], w0 = { class: "flex pointer-events-none" }, k0 = { class: "inline-block w-full text-ellipsis overflow-hidden" }, $0 = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: o } = e.storage, c = M(null), i = Ho(0, 100);
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
    }, b = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = {
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
      V !== E && o("show-tree-view", V);
    });
    const k = M(null), U = () => {
      e.features.includes(pe.SEARCH) && (e.fs.searchMode = !0, ft(() => k.value.focus()));
    }, B = Ho("", 400);
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
      n("span", {
        "aria-label": a(s)("Toggle Tree View"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(t0), {
          onClick: A,
          class: me(["h-6 w-6 p-0.5 rounded cursor-pointer text-slate-700", a(e).showTreeView ? "bg-gray-300 dark:bg-gray-700" : ""])
        }, null, 8, ["class"])
      ], 8, i0),
      n("span", {
        "aria-label": a(s)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(Su), {
          onDragover: E[0] || (E[0] = (O) => h(O)),
          onDragleave: E[1] || (E[1] = (O) => m(O)),
          onDrop: E[2] || (E[2] = (O) => u(O)),
          onClick: p,
          class: me(a(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, c0),
      a(e).fs.loading ? (f(), g("span", {
        key: 1,
        "aria-label": a(s)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(Au), {
          onClick: E[3] || (E[3] = (O) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, u0)) : (f(), g("span", {
        key: 0,
        "aria-label": a(s)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        W(a(xu), { onClick: v })
      ], 8, d0)),
      ve(n("div", {
        onClick: rt(U, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        n("div", null, [
          W(a(Hu), {
            onDragover: E[4] || (E[4] = (O) => h(O)),
            onDragleave: E[5] || (E[5] = (O) => m(O)),
            onDrop: E[6] || (E[6] = (O) => u(O, -1)),
            onClick: E[7] || (E[7] = (O) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter } }))
          })
        ]),
        n("div", m0, [
          a(e).fs.hiddenBreadcrumbs.length ? ve((f(), g("div", f0, [
            h0,
            n("div", p0, [
              n("span", {
                onDragenter: E[8] || (E[8] = (O) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: E[9] || (E[9] = (O) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                W(a(a0), { class: "px-1 pointer-events-none" })
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
          onClick: rt(U, ["self"])
        }, [
          (f(!0), g(he, null, $e(a(e).fs.breadcrumbs, (O, T) => (f(), g("div", { key: T }, [
            v0,
            n("span", {
              onDragover: (S) => T === a(e).fs.breadcrumbs.length - 1 || h(S),
              onDragleave: (S) => T === a(e).fs.breadcrumbs.length - 1 || m(S),
              onDrop: (S) => T === a(e).fs.breadcrumbs.length - 1 || u(S, T),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: O.basename,
              onClick: (S) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(e).fs.adapter, path: O.path } })
            }, _(O.name), 41, g0)
          ]))), 128))
        ], 512),
        a(e).fs.loading ? (f(), X(a(lo), { key: 0 })) : P("", !0)
      ], 512), [
        [ze, !a(e).fs.searchMode]
      ]),
      ve(n("div", _0, [
        n("div", null, [
          W(a(Nu))
        ]),
        ve(n("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: $t(D, ["esc"]),
          onBlur: L,
          "onUpdate:modelValue": E[10] || (E[10] = (O) => Fo(B) ? B.value = O : null),
          placeholder: a(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, b0), [
          [St, a(B)]
        ]),
        W(a(qu), { onClick: D })
      ], 512), [
        [ze, a(e).fs.searchMode]
      ]),
      ve(n("div", x0, [
        (f(!0), g(he, null, $e(a(e).fs.hiddenBreadcrumbs, (O, T) => (f(), g("div", {
          key: T,
          onDragover: E[11] || (E[11] = (S) => h(S)),
          onDragleave: E[12] || (E[12] = (S) => m(S)),
          onDrop: (S) => l(S, T),
          onClick: (S) => b(O),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          n("div", w0, [
            n("span", null, [
              W(a(fs), { class: "h-5 w-5" })
            ]),
            Q(),
            n("span", k0, _(O.name), 1)
          ])
        ], 40, y0))), 128))
      ], 512), [
        [ze, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Vn = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), S0 = ["onClick"], C0 = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: s } = e.storage, r = M(s("full-screen", !1)), o = M([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
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
}, T0 = /* @__PURE__ */ n("path", {
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
}, V0 = /* @__PURE__ */ n("path", {
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
}, F0 = /* @__PURE__ */ n("path", {
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
}, P0 = /* @__PURE__ */ n("path", {
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
      n("div", W0, _(e.count), 1)
    ]));
  }
}, X0 = { class: "flex" }, J0 = ["aria-label"], Q0 = { class: "ml-auto mb-2" }, Z0 = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, em = { key: 1 }, tm = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = M(""), o = M(""), c = M(null), i = M(!1), d = M(""), l = M(!1), u = ae("ServiceContainer"), { t: h } = u.i18n;
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
      n("div", X0, [
        n("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(u).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, _(a(u).modal.data.item.basename), 9, J0),
        n("div", Q0, [
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
        i.value ? (f(), g("div", em, [
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
        ])) : (f(), g("pre", Z0, _(r.value), 1)),
        d.value.length ? (f(), X(We, {
          key: 2,
          onHidden: b[2] || (b[2] = (y) => d.value = ""),
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
}, sm = { class: "flex" }, om = ["aria-label"], nm = { class: "ml-auto mb-2" }, rm = { class: "w-full flex justify-center" }, am = ["src"], lm = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), { t: o } = r.i18n, c = M(null), i = M(null), d = M(!1), l = M(""), u = M(!1), h = () => {
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
      n("div", sm, [
        n("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, _(a(r).modal.data.item.basename), 9, om),
        n("div", nm, [
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
      n("div", rm, [
        n("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, am)
      ]),
      l.value.length ? (f(), X(We, {
        key: 0,
        onHidden: p[1] || (p[1] = (b) => l.value = ""),
        error: u.value
      }, {
        default: se(() => [
          Q(_(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : P("", !0)
    ], 64));
  }
}, im = { class: "flex" }, cm = ["aria-label"], dm = /* @__PURE__ */ n("div", null, null, -1), um = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (o, c) => (f(), g(he, null, [
      n("div", im, [
        n("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, _(a(s).modal.data.item.basename), 9, cm)
      ]),
      dm
    ], 64));
  }
}, mm = ["aria-label"], fm = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, hm = ["src"], pm = {
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
      }, _(a(s).modal.data.item.basename), 9, mm),
      n("div", null, [
        n("video", fm, [
          n("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, hm),
          Q(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, vm = ["aria-label"], gm = {
  class: "w-full",
  controls: ""
}, _m = ["src"], bm = {
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
      }, _(a(r).modal.data.item.basename), 9, vm),
      n("div", null, [
        n("audio", gm, [
          n("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, _m),
          Q(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, xm = ["aria-label"], ym = ["data"], wm = ["src"], km = /* @__PURE__ */ n("p", null, [
  /* @__PURE__ */ Q(" Your browser does not support PDFs. "),
  /* @__PURE__ */ n("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ Q(" . ")
], -1), $m = [
  km
], Sm = {
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
      }, _(a(s).modal.data.item.basename), 9, xm),
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
          }, $m, 8, wm)
        ], 8, ym)
      ])
    ], 64));
  }
}, Cm = { class: "sm:flex sm:items-start" }, Em = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Tm = { key: 0 }, Mm = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Am = {
  key: 0,
  class: "flex leading-5"
}, Dm = /* @__PURE__ */ n("svg", {
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
], -1), Lm = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, Vm = { class: "font-bold" }, Om = { class: "font-bold pl-2" }, Hm = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Bm = ["download", "href"], On = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(pe.PREVIEW);
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
        }, _(a(s)("Download")), 9, Bm)) : P("", !0)
      ]),
      default: se(() => [
        n("div", Cm, [
          n("div", Em, [
            a(c) ? (f(), g("div", Tm, [
              o("text") ? (f(), X(tm, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : o("image") ? (f(), X(lm, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : o("video") ? (f(), X(pm, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : o("audio") ? (f(), X(bm, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : o("application/pdf") ? (f(), X(Sm, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (f(), X(um, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : P("", !0),
            n("div", Mm, [
              r.value === !1 ? (f(), g("div", Am, [
                Dm,
                n("span", null, _(a(s)("Loading")), 1)
              ])) : P("", !0)
            ])
          ])
        ]),
        n("div", Lm, [
          n("div", null, [
            n("span", Vm, _(a(s)("File Size")) + ": ", 1),
            Q(_(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          n("div", null, [
            n("span", Om, _(a(s)("Last Modified")) + ": ", 1),
            Q(" " + _(a(Vn)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(pe).DOWNLOAD) ? (f(), g("div", Hm, [
          n("span", null, _(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
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
}, Fm = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Im = /* @__PURE__ */ n("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Nm = [
  Fm,
  Im
];
function Um(t, e) {
  return f(), g("svg", Rm, [...Nm]);
}
const Hn = { render: Um }, zm = ["data-type", "data-item", "data-index"], $s = {
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
        y.props.draggable && (p.addEventListener("dragstart", (A) => i(A, b.value)), p.addEventListener("dragover", (A) => l(A, b.value)), p.addEventListener("drop", (A) => d(A, b.value)));
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
      onContextmenu: b[3] || (b[3] = rt((y) => a(e).emitter.emit("vf-contextmenu-show", { event: y, items: a(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Dt(p.$slots, "default"),
      a(e).pinnedFolders.find((y) => y.path === t.item.path) ? (f(), X(a(Hn), {
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
}, qm = { class: "relative" }, Gm = { class: "grid grid-cols-12 items-center" }, Km = { class: "flex col-span-7 items-center" }, Wm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ym = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Xm = { class: "grid grid-cols-12 items-center" }, Jm = { class: "flex col-span-7 items-center" }, Qm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Zm = { class: "col-span-2 text-center" }, e1 = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, t1 = { class: "relative" }, s1 = ["data-src", "alt"], o1 = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, n1 = { class: "break-all" }, r1 = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = (m) => m == null ? void 0 : m.substring(0, 3), o = M(null), c = M(""), i = e.dragSelect;
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
      const y = (x, A) => typeof x == "string" && typeof A == "string" ? x.toLowerCase().localeCompare(A.toLowerCase()) : x < A ? -1 : x > A ? 1 : 0;
      return l.active && (v = v.slice().sort((x, A) => y(x[p], A[p]) * b)), v;
    }, h = (m) => {
      l.active && l.column === m ? (l.active = l.order === "asc", l.column = m, l.order = "desc") : (l.active = !0, l.column = m, l.order = "asc");
    };
    return Ce(() => {
      d = new or(i.area.value);
    }), Ro(() => {
      d.update();
    }), Io(() => {
      d.destroy();
    }), (m, v) => (f(), g("div", Pm, [
      a(e).view === "list" || c.value.length ? (f(), g("div", jm, [
        n("div", {
          onClick: v[0] || (v[0] = (p) => h("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          Q(_(a(s)("Name")) + " ", 1),
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
          Q(_(a(s)("Size")) + " ", 1),
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
          Q(_(a(s)("Date")) + " ", 1),
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
          Q(_(a(s)("Filepath")) + " ", 1),
          ve(W(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : P("", !0)
      ])) : P("", !0),
      n("div", qm, [
        W(Y0, {
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
        onContextmenu: v[4] || (v[4] = rt((p) => a(e).emitter.emit("vf-contextmenu-show", { event: p, items: a(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (f(!0), g(he, { key: 0 }, $e(u(), (p, b) => (f(), X($s, {
          item: p,
          index: b,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: se(() => [
            n("div", Gm, [
              n("div", Km, [
                W(ks, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                n("span", Wm, _(p.basename), 1)
              ]),
              n("div", Ym, _(p.path), 1)
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
            n("div", Xm, [
              n("div", Jm, [
                W(ks, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                n("span", Qm, _(p.basename), 1)
              ]),
              n("div", Zm, _(p.file_size ? a(e).filesize(p.file_size) : ""), 1),
              n("div", e1, _(a(Vn)(p.last_modified)), 1)
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
              n("div", t1, [
                (p.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, s1)) : (f(), X(ks, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && p.type !== "dir" ? (f(), g("div", o1, _(r(p.extension)), 1)) : P("", !0)
              ]),
              n("span", n1, _(a(Ps)(p.basename)), 1)
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
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(null), o = M([]), c = M(""), i = Ot({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Ze(() => i.items.filter((m) => m.key == null || e.features.includes(m.key)));
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
      pinFolder: {
        title: () => s("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(o.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
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
        link: Ze(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
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
      else !p && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((b) => b.path === p.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", v)) : (p.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((b) => b.path === p.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), p.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [p]));
      h(m);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const h = (m) => {
      const v = e.dragSelect.area.value, p = e.root.getBoundingClientRect(), b = v.getBoundingClientRect();
      let y = m.clientX - p.left, x = m.clientY - p.top;
      i.active = !0, ft(() => {
        var B;
        const A = (B = r.value) == null ? void 0 : B.getBoundingClientRect();
        let k = (A == null ? void 0 : A.height) ?? 0, U = (A == null ? void 0 : A.width) ?? 0;
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
        ], 8, a1)) : (f(), g("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (b) => u(p)
        }, [
          n("span", null, _(p.title()), 1)
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
}, d1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), u1 = [
  d1
];
function m1(t, e) {
  return f(), g("svg", c1, [...u1]);
}
const Bn = { render: m1 }, f1 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, h1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), p1 = [
  h1
];
function v1(t, e) {
  return f(), g("svg", f1, [...p1]);
}
const g1 = { render: v1 }, _1 = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0" }, b1 = { class: "flex leading-5 items-center" }, x1 = ["aria-label"], y1 = ["value"], w1 = { class: "ml-3" }, k1 = { key: 0 }, $1 = { class: "ml-1" }, S1 = { class: "flex leading-5 items-center justify-end" }, C1 = ["disabled"], E1 = ["aria-label"], T1 = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = Ze(() => {
      const l = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (f(), g("div", _1, [
      n("div", b1, [
        n("div", {
          class: "mx-2",
          "aria-label": a(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, [
          W(a(Bn))
        ], 8, x1),
        ve(n("select", {
          "onUpdate:modelValue": u[0] || (u[0] = (h) => a(e).fs.adapter = h),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8",
          tabindex: "-1"
        }, [
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (h) => (f(), g("option", { value: h }, _(h), 9, y1))), 256))
        ], 544), [
          [Ss, a(e).fs.adapter]
        ]),
        n("div", w1, [
          i.value.length ? (f(), g("span", k1, _(a(e).fs.data.files.length) + " items found. ", 1)) : P("", !0),
          n("span", $1, _(a(e).dragSelect.getCount() > 0 ? a(s)("%s item(s) selected.", a(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      n("div", S1, [
        a(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: me(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (h) => a(e).selectButton.click(a(o).getSelected(), h))
        }, _(a(s)("Select")), 11, C1)) : P("", !0),
        n("span", {
          class: "mr-1",
          "aria-label": a(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: u[2] || (u[2] = (h) => a(e).modal.open(Mn))
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
}, A1 = /* @__PURE__ */ n("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), D1 = /* @__PURE__ */ n("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), L1 = [
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
}, B1 = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), R1 = /* @__PURE__ */ n("path", { d: "M15 12H9M12 9v6" }, null, -1), F1 = [
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
}, z1 = /* @__PURE__ */ n("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), P1 = /* @__PURE__ */ n("path", { d: "M9 12h6" }, null, -1), j1 = [
  z1,
  P1
];
function q1(t, e) {
  return f(), g("svg", U1, [...j1]);
}
const G1 = { render: q1 };
function Rn(t, e) {
  const s = t.findIndex((r) => r.path === e.path);
  s > -1 ? t[s] = e : t.push(e);
}
const K1 = {
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
    const r = Wn(t, "modelValue"), o = M(!1);
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
}, Y1 = /* @__PURE__ */ n("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), X1 = [
  Y1
];
function J1(t, e) {
  return f(), g("svg", W1, [...X1]);
}
const Q1 = { render: J1 }, Z1 = { class: "block" }, ef = { class: "flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded" }, tf = { class: "h-5 w-5 shrink-0" }, sf = ["onClick"], of = { class: "h-5 w-5 shrink-0" }, nf = { class: "text-nowrap" }, rf = { class: "pl-4" }, af = {
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
    const e = ae("ServiceContainer"), s = M([]), r = t, o = Ze(() => {
      var c;
      return ((c = e.treeViewData.find((i) => i.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, i) => {
      const d = Yn("TreeSubfolderList", !0);
      return f(), g("ul", Z1, [
        (f(!0), g(he, null, $e(o.value, (l, u) => (f(), g("li", {
          class: "flex flex-col space-x-0.5 py-0.5 text-sm",
          key: l.path
        }, [
          n("div", ef, [
            n("div", tf, [
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
              n("div", of, [
                a(e).fs.path === l.path ? (f(), X(a(Q1), { key: 0 })) : (f(), X(a(fs), { key: 1 }))
              ]),
              n("div", nf, _(l.basename), 1)
            ], 8, sf)
          ]),
          n("div", rf, [
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
}, lf = { class: "pt-1 px-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between" }, cf = { class: "h-5 w-5 shrink-0" }, df = { class: "mr-3" }, uf = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = M(!1), r = (o) => {
      e.fs.adapter = o, e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: o } }), e.storage.setStore("adapter", o);
    };
    return (o, c) => (f(), g(he, null, [
      n("div", lf, [
        n("div", {
          class: me(["flex flex-1 space-x-1 items-center cursor-pointer", t.storage === a(e).fs.adapter ? "text-gray-700/80 dark:text-gray-300/80 text-bold" : ""]),
          onClick: c[0] || (c[0] = (i) => r(t.storage))
        }, [
          n("div", cf, [
            W(a(Bn))
          ]),
          n("div", null, _(t.storage), 1)
        ], 2),
        n("div", df, [
          W(Fn, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": c[1] || (c[1] = (i) => s.value = i)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ve(W(af, {
        adapter: t.storage,
        path: t.storage + "://"
      }, null, 8, ["adapter", "path"]), [
        [ze, s.value]
      ])
    ], 64));
  }
}, mf = { class: "p-1 uppercase font-bold text-gray-400 dark:text-gray-400 text-xs flex items-center space-x-1" }, ff = { class: "block" }, hf = { class: "flex pl-2 py-0.5 text-sm space-x-2" }, pf = ["onClick"], vf = ["title"], gf = ["onClick"], _f = { key: 0 }, bf = { class: "rounded-lg p-1 bg-gray-100 dark:bg-gray-700 text-xs text-center" }, xf = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = M(190), o = (d) => {
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
    }, i = M(null);
    return Ce(() => {
      ct(i.value, {});
    }), Je(e.fs.data, (d, l) => {
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
          n("div", mf, [
            n("div", null, [
              W(a(Hn), { class: "text-amber-600" })
            ]),
            n("div", null, _(a(s)("Pinned Folders")), 1)
          ]),
          n("ul", ff, [
            (f(!0), g(he, null, $e(a(e).pinnedFolders, (u) => (f(), g("li", hf, [
              n("div", {
                class: "flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer",
                onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
              }, [
                W(a(fs), { class: "h-5 w-5" }),
                n("div", {
                  title: u.path
                }, _(u.basename), 9, vf)
              ], 8, pf),
              n("div", {
                class: "cursor-pointer",
                onClick: (h) => o(u)
              }, [
                W(a(O1), { class: "p-0.5 text-gray-200 hover:text-gray-400 dark:text-gray-600 hover:dark:text-gray-400" })
              ], 8, gf)
            ]))), 256)),
            a(e).pinnedFolders.length ? P("", !0) : (f(), g("li", _f, [
              n("div", bf, _(a(s)("No folders pinned")), 1)
            ]))
          ]),
          (f(!0), g(he, null, $e(a(e).fs.data.storages, (u) => (f(), g("div", null, [
            W(uf, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        n("div", {
          onMousedown: c,
          class: me([(a(e).showTreeView, ""), "transition-colors ease-in-out duration-200 top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, yf = { class: "relative flex overflow-hidden h-full" }, wf = {
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
    const { setStore: c } = o.storage, i = M(null);
    o.root = i;
    const d = o.dragSelect;
    pi(o);
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
          W(Yd),
          W($0),
          n("div", yf, [
            W(xf),
            W(r1)
          ]),
          W(T1)
        ], 38),
        W(Jn, { name: "fade" }, {
          default: se(() => [
            a(o).modal.visible ? (f(), X(Qn(a(o).modal.type), { key: 0 })) : P("", !0)
          ]),
          _: 1
        }),
        W(i1)
      ], 2)
    ], 512));
  }
}, Of = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", wf);
  }
};
export {
  Of as default
};
