var In = Object.defineProperty;
var Nn = (t, e, s) => e in t ? In(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var co = (t, e, s) => (Nn(t, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as Ht, watch as bt, ref as M, shallowRef as Fn, onMounted as Ae, onUnmounted as zs, onUpdated as Bo, nextTick as dt, computed as mt, inject as ue, openBlock as h, createElementBlock as _, withKeys as $t, unref as r, createElementVNode as a, withModifiers as st, renderSlot as Tt, normalizeClass as ve, toDisplayString as b, createBlock as ee, withCtx as Z, withDirectives as ge, vModelCheckbox as jt, createTextVNode as ne, createVNode as te, Fragment as ke, renderList as De, vModelSelect as ks, isRef as Ro, createCommentVNode as W, vModelText as St, onBeforeUnmount as Vo, customRef as Un, vShow as tt, TransitionGroup as Pn, normalizeStyle as js, provide as zn, Transition as jn, resolveDynamicComponent as qn } from "vue";
import Gn from "mitt";
import Kn from "dragselect";
import Wn from "@uppy/core";
import Yn from "@uppy/xhr-upload";
import Jn from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Xn from "cropperjs";
import "microtip/microtip.css";
var Ho;
const vs = (Ho = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Ho.getAttribute("content");
class Qn {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    co(this, "config");
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
    l !== "get" && (i instanceof FormData ? (u = i, s.body != null && Object.entries(this.config.body).forEach(([m, v]) => {
      u.append(m, v);
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
function Zn(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new Qn(e);
}
function er(t) {
  let e = localStorage.getItem(t + "_storage");
  const s = Ht(JSON.parse(e ?? "{}"));
  bt(s, n);
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
async function tr(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function sr(t, e, s, n) {
  const { getStore: o, setStore: c } = t, i = M({}), d = M(o("locale", e)), l = (m, v = e) => {
    tr(m, n).then((f) => {
      i.value = f, c("locale", m), d.value = m, c("translations", f), Object.values(n).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + m }), s.emit("vf-language-saved"));
    }).catch((f) => {
      v ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(v, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !o("locale") && !n.length ? l(e) : i.value = o("translations");
  const u = (m, ...v) => v.length ? u(m = m.replace("%s", v.shift()), ...v) : m;
  function p(m, ...v) {
    return i.value && i.value.hasOwnProperty(m) ? u(i.value[m], ...v) : u(m, ...v);
  }
  return { t: p, changeLocale: l, locale: d };
}
const he = {
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
}, or = Object.values(he), nr = "2.4.4";
function Io(t, e, s, n, o) {
  return (e = Math, s = e.log, n = 1024, o = s(t) / s(n) | 0, t / e.pow(n, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function No(t, e, s, n, o) {
  return (e = Math, s = e.log, n = 1e3, o = s(t) / s(n) | 0, t / e.pow(n, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function rr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return n[1] * Math.pow(1024, e[n[2].toLowerCase()]);
}
const Qe = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function ar(t, e) {
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
function lr() {
  const t = Fn(null), e = M(!1), s = M();
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
    const v = c, f = p, g = m || (n ? !n(v, f) : v !== f);
    return (g || o) && (c = f, i = v), [c, g, i];
  };
  return [e ? (p) => d(e(c, i), p) : d, (p) => [c, !!p, i]];
}, Fo = typeof window < "u" && typeof document < "u", Me = Fo ? window : {}, Uo = Math.max, ir = Math.min, $s = Math.round, Xt = Math.abs, uo = Math.sign, Po = Me.cancelAnimationFrame, qs = Me.requestAnimationFrame, Qt = Me.setTimeout, Ss = Me.clearTimeout, ns = (t) => typeof Me[t] < "u" ? Me[t] : void 0, cr = ns("MutationObserver"), mo = ns("IntersectionObserver"), Zt = ns("ResizeObserver"), Cs = ns("ScrollTimeline"), zo = Fo && Node.ELEMENT_NODE, { toString: Ym, hasOwnProperty: gs } = Object.prototype, rs = (t) => t === void 0, Gs = (t) => t === null, ze = (t) => typeof t == "number", as = (t) => typeof t == "string", jo = (t) => typeof t == "boolean", Ie = (t) => typeof t == "function", je = (t) => Array.isArray(t), Lt = (t) => typeof t == "object" && !je(t) && !Gs(t), ls = (t) => {
  const e = !!t && t.length, s = ze(e) && e > -1 && e % 1 == 0;
  return je(t) || !Ie(t) && s ? e > 0 && Lt(t) ? e - 1 in t : !0 : !1;
}, es = (t) => {
  if (!t || !Lt(t))
    return !1;
  let e;
  const s = "constructor", n = t[s], o = n && n.prototype, c = gs.call(t, s), i = o && gs.call(o, "isPrototypeOf");
  if (n && !c && !i)
    return !1;
  for (e in t)
    ;
  return rs(e) || gs.call(t, e);
}, ts = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === zo : !1;
}, is = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === zo : !1;
};
function ie(t, e) {
  if (ls(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else
    t && ie(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const Ks = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), be = (t, e, s) => (!as(e) && ls(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), at = (t) => Array.from(t || []), qo = (t) => je(t) ? t : [t], Es = (t) => !!t && !t.length, fo = (t) => at(new Set(t)), Ne = (t, e, s) => {
  ie(t, (o) => o && o.apply(void 0, e || [])), !s && (t.length = 0);
}, Go = "paddingTop", Ko = "paddingRight", Wo = "paddingLeft", Yo = "paddingBottom", Jo = "marginLeft", Xo = "marginRight", Qo = "marginBottom", dr = "overflowX", ur = "overflowY", yt = "width", xt = "height", et = "visible", it = "hidden", wt = "scroll", mr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, cs = (t, e, s, n) => {
  if (t && e) {
    let o = !0;
    return ie(s, (c) => {
      const i = t[c], d = e[c];
      i !== d && (o = !1);
    }), o;
  }
  return !1;
}, Zo = (t, e) => cs(t, e, ["w", "h"]), Wt = (t, e) => cs(t, e, ["x", "y"]), fr = (t, e) => cs(t, e, ["t", "r", "b", "l"]), ot = () => {
}, Y = (t, ...e) => t.bind(0, ...e), ct = (t) => {
  let e;
  const s = t ? Qt : qs, n = t ? Ss : Po;
  return [(o) => {
    n(e), e = s(() => o(), Ie(t) ? t() : t);
  }, () => n(e)];
}, As = (t, e) => {
  const { _: s, p: n, v: o, m: c } = e || {};
  let i, d, l, u, p = ot;
  const m = function(y) {
    p(), Ss(i), u = i = d = void 0, p = ot, t.apply(this, y);
  }, v = (w) => c && d ? c(d, w) : w, f = () => {
    p !== ot && m(v(l) || l);
  }, g = function() {
    const y = at(arguments), E = Ie(s) ? s() : s;
    if (ze(E) && E >= 0) {
      const $ = Ie(n) ? n() : n, B = ze($) && $ >= 0, C = E > 0 ? Qt : qs, S = E > 0 ? Ss : Po, U = v(y) || y, N = m.bind(0, U);
      let F;
      p(), o && !u ? (N(), u = !0, F = C(() => u = void 0, E)) : (F = C(N, E), B && !i && (i = Qt(f, $))), p = () => S(F), d = l = U;
    } else
      m(y);
  };
  return g.S = f, g;
}, en = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Je = (t) => t ? Object.keys(t) : [], re = (t, e, s, n, o, c, i) => {
  const d = [e, s, n, o, c, i];
  return (typeof t != "object" || Gs(t)) && !Ie(t) && (t = {}), ie(d, (l) => {
    ie(l, (u, p) => {
      const m = l[p];
      if (t === m)
        return !0;
      const v = je(m);
      if (m && es(m)) {
        const f = t[p];
        let g = f;
        v && !je(f) ? g = [] : !v && !es(f) && (g = {}), t[p] = re(g, m);
      } else
        t[p] = v ? m.slice() : m;
    });
  }), t;
}, tn = (t, e) => ie(re({}, t), (s, n, o) => {
  s === void 0 ? delete o[n] : s && es(s) && (o[n] = tn(s));
}), Ws = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ds = (t, e, s) => Uo(t, ir(e, s)), ut = (t) => at(new Set((je(t) ? t : (t || "").split(" ")).filter((e) => e))), Ys = (t, e) => t && t.getAttribute(e), po = (t, e) => t && t.hasAttribute(e), We = (t, e, s) => {
  ie(ut(e), (n) => {
    t && t.setAttribute(n, String(s || ""));
  });
}, Ue = (t, e) => {
  ie(ut(e), (s) => t && t.removeAttribute(s));
}, ds = (t, e) => {
  const s = ut(Ys(t, e)), n = Y(We, t, e), o = (c, i) => {
    const d = new Set(s);
    return ie(ut(c), (l) => {
      d[i](l);
    }), at(d).join(" ");
  };
  return {
    O: (c) => n(o(c, "delete")),
    $: (c) => n(o(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, l) => d && s.includes(l), i.length > 0);
    }
  };
}, sn = (t, e, s) => (ds(t, e).O(s), Y(Js, t, e, s)), Js = (t, e, s) => (ds(t, e).$(s), Y(sn, t, e, s)), Ms = (t, e, s, n) => (n ? Js : sn)(t, e, s), Xs = (t, e, s) => ds(t, e).C(s), on = (t) => ds(t, "class"), nn = (t, e) => {
  on(t).O(e);
}, Qs = (t, e) => (on(t).$(e), Y(nn, t, e)), rn = (t, e) => {
  const s = [], n = e ? is(e) && e : document;
  return n ? be(s, n.querySelectorAll(t)) : s;
}, pr = (t, e) => {
  const s = e ? is(e) && e : document;
  return s ? s.querySelector(t) : null;
}, ss = (t, e) => is(t) ? t.matches(e) : !1, an = (t) => ss(t, "body"), Ts = (t) => t ? at(t.childNodes) : [], kt = (t) => t && t.parentElement, gt = (t, e) => is(t) && t.closest(e), Ls = (t) => document.activeElement, hr = (t, e, s) => {
  const n = gt(t, e), o = t && pr(s, n), c = gt(o, e) === n;
  return n && o ? n === t || o === t || c && gt(gt(t, s), e) !== n : !1;
}, rt = (t) => {
  if (ls(t))
    ie(at(t), (e) => rt(e));
  else if (t) {
    const e = kt(t);
    e && e.removeChild(t);
  }
}, ln = (t, e, s) => {
  if (s && t) {
    let n = e, o;
    return ls(s) ? (o = document.createDocumentFragment(), ie(s, (c) => {
      c === n && (n = c.previousSibling), o.appendChild(c);
    })) : o = s, e && (n ? n !== e && (n = n.nextSibling) : n = t.firstChild), t.insertBefore(o, n || null), () => rt(s);
  }
  return ot;
}, He = (t, e) => ln(t, null, e), ho = (t, e) => ln(kt(t), t && t.nextSibling, e), _t = (t) => {
  const e = document.createElement("div");
  return We(e, "class", t), e;
}, cn = (t) => {
  const e = _t();
  return e.innerHTML = t.trim(), ie(Ts(e), (s) => rt(s));
}, vr = /^--/, vo = (t, e) => t.getPropertyValue(e) || t[e] || "", Zs = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, qt = (t) => Zs(parseFloat(t || "")), go = (t) => `${(Zs(t) * 100).toFixed(3)}%`, Os = (t) => `${Zs(t)}px`;
function Ot(t, e) {
  t && e && ie(e, (s, n) => {
    try {
      const o = t.style, c = ze(s) ? Os(s) : (s || "") + "";
      vr.test(n) ? o.setProperty(n, c) : o[n] = c;
    } catch {
    }
  });
}
function ft(t, e, s) {
  const n = as(e);
  let o = n ? "" : {};
  if (t) {
    const c = Me.getComputedStyle(t, s) || t.style;
    o = n ? vo(c, e) : at(e).reduce((i, d) => (i[d] = vo(c, d), i), o);
  }
  return o;
}
const bo = (t, e, s) => {
  const n = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${n}top${o}`, i = `${n}right${o}`, d = `${n}bottom${o}`, l = `${n}left${o}`, u = ft(t, [c, i, d, l]);
  return {
    t: qt(u[c]),
    r: qt(u[i]),
    b: qt(u[d]),
    l: qt(u[l])
  };
}, bs = (t, e) => `translate${Lt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, gr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), br = {
  w: 0,
  h: 0
}, us = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : br, _r = (t) => us("inner", t || Me), Dt = Y(us, "offset"), dn = Y(us, "client"), Hs = Y(us, "scroll"), eo = (t) => {
  const e = parseFloat(ft(t, yt)) || 0, s = parseFloat(ft(t, xt)) || 0;
  return {
    w: e - $s(e),
    h: s - $s(s)
  };
}, Mt = (t) => t.getBoundingClientRect(), yr = (t) => !!t && gr(t), Bs = (t) => !!(t && (t[xt] || t[yt])), un = (t, e) => {
  const s = Bs(t);
  return !Bs(e) && s;
}, _o = (t, e, s, n) => {
  ie(ut(e), (o) => {
    t && t.removeEventListener(o, s, n);
  });
}, me = (t, e, s, n) => {
  var o;
  const c = (o = n && n.H) != null ? o : !0, i = n && n.I || !1, d = n && n.A || !1, l = {
    passive: c,
    capture: i
  };
  return Y(Ne, ut(e).map((u) => {
    const p = d ? (m) => {
      _o(t, u, p, i), s && s(m);
    } : s;
    return t && t.addEventListener(u, p, l), Y(_o, t, u, p, i);
  }));
}, mn = (t) => t.stopPropagation(), Rs = (t) => t.preventDefault(), fn = (t) => mn(t) || Rs(t), Pe = (t, e) => {
  const { x: s, y: n } = ze(e) ? {
    x: e,
    y: e
  } : e || {};
  ze(s) && (t.scrollLeft = s), ze(n) && (t.scrollTop = n);
}, Be = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), pn = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), xr = (t, e) => {
  const { T: s, D: n } = t, { w: o, h: c } = e, i = (m, v, f) => {
    let g = uo(m) * f, w = uo(v) * f;
    if (g === w) {
      const y = Xt(m), E = Xt(v);
      w = y > E ? 0 : w, g = y < E ? 0 : g;
    }
    return g = g === w ? 0 : g, [g + 0, w + 0];
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
}, yo = ({ T: t, D: e }) => {
  const s = (n, o) => n === 0 && n <= o;
  return {
    x: s(t.x, e.x),
    y: s(t.y, e.y)
  };
}, xo = ({ T: t, D: e }, s) => {
  const n = (o, c, i) => Ds(0, 1, (o - i) / (o - c) || 0);
  return {
    x: n(t.x, e.x, s.x),
    y: n(t.y, e.y, s.y)
  };
}, Vs = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, wo = (t, e) => {
  ie(qo(e), t);
}, Is = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (c, i) => {
    if (c) {
      const d = e.get(c);
      wo((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, n = (c, i) => {
    if (as(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), wo((p) => {
        Ie(p) && u.add(p);
      }, i), Y(s, c, i);
    }
    jo(i) && i && s();
    const d = Je(c), l = [];
    return ie(d, (u) => {
      const p = c[u];
      p && be(l, n(u, p));
    }), Y(Ne, l);
  }, o = (c, i) => {
    ie(at(e.get(c)), (d) => {
      i && !Es(i) ? d.apply(0, i) : d();
    });
  };
  return n(t || {}), [n, s, o];
}, ko = (t) => JSON.stringify(t, (e, s) => {
  if (Ie(s))
    throw 0;
  return s;
}), $o = (t, e) => t ? `${e}`.split(".").reduce((s, n) => s && en(s, n) ? s[n] : void 0, t) : void 0, wr = {
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
}, hn = (t, e) => {
  const s = {}, n = Ye(Je(e), Je(t));
  return ie(n, (o) => {
    const c = t[o], i = e[o];
    if (Lt(c) && Lt(i))
      re(s[o] = {}, hn(c, i)), Ws(s[o]) && delete s[o];
    else if (en(e, o) && i !== c) {
      let d = !0;
      if (je(c) || je(i))
        try {
          ko(c) === ko(i) && (d = !1);
        } catch {
        }
      d && (s[o] = i);
    }
  }), s;
}, So = (t, e, s) => (n) => [$o(t, n), s || $o(e, n) !== void 0], Ct = "data-overlayscrollbars", Yt = "os-environment", Gt = `${Yt}-scrollbar-hidden`, _s = `${Ct}-initialize`, Jt = "noClipping", Co = `${Ct}-body`, nt = Ct, kr = "host", Ze = `${Ct}-viewport`, $r = dr, Sr = ur, Cr = "arrange", vn = "measuring", gn = "scrollbarHidden", Er = "scrollbarPressed", Ar = "noContent", Ns = `${Ct}-padding`, Eo = `${Ct}-content`, to = "os-size-observer", Dr = `${to}-appear`, Mr = `${to}-listener`, Tr = "os-trinsic-observer", Lr = "os-theme-none", Re = "os-scrollbar", Or = `${Re}-rtl`, Hr = `${Re}-horizontal`, Br = `${Re}-vertical`, bn = `${Re}-track`, so = `${Re}-handle`, Rr = `${Re}-visible`, Vr = `${Re}-cornerless`, Ao = `${Re}-interaction`, Do = `${Re}-unusable`, Fs = `${Re}-auto-hide`, Mo = `${Fs}-hidden`, To = `${Re}-wheel`, Ir = `${bn}-interactive`, Nr = `${so}-interactive`;
let ys;
const Fr = () => {
  const t = (x, $, B) => {
    He(document.body, x), He(document.body, x);
    const C = dn(x), S = Dt(x), L = eo($);
    return B && rt(x), {
      x: S.h - C.h + L.h,
      y: S.w - C.w + L.w
    };
  }, e = (x) => {
    let $ = !1;
    const B = Qs(x, Gt);
    try {
      $ = ft(x, "scrollbar-width") === "none" || ft(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return B(), $;
  }, s = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = cn(`<div class="${Yt}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, [i, , d] = Is(), [l, u] = Oe({
    o: t(o, c),
    i: Wt
  }, Y(t, o, c, !0)), [p] = u(), m = e(o), v = {
    x: p.x === 0,
    y: p.y === 0
  }, f = {
    elements: {
      host: null,
      padding: !m,
      viewport: (x) => m && an(x) && x,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, g = re({}, wr), w = Y(re, {}, g), y = Y(re, {}, f), E = {
    k: p,
    M: v,
    R: m,
    V: !!Cs,
    L: Y(i, "r"),
    P: y,
    U: (x) => re(f, x) && y(),
    N: w,
    q: (x) => re(g, x) && w(),
    B: re({}, f),
    F: re({}, g)
  };
  if (Ue(o, "style"), rt(o), me(Me, "resize", () => {
    d("r", []);
  }), Ie(Me.matchMedia) && !m && (!v.x || !v.y)) {
    const x = ($) => {
      const B = Me.matchMedia(`(resolution: ${Me.devicePixelRatio}dppx)`);
      me(B, "change", () => {
        $(), x($);
      }, {
        A: !0
      });
    };
    x(() => {
      const [$, B] = l();
      re(E.k, $), d("r", [B]);
    });
  }
  return E;
}, qe = () => (ys || (ys = Fr()), ys), _n = (t, e) => Ie(e) ? e.apply(0, t) : e, Ur = (t, e, s, n) => {
  const o = rs(n) ? s : n;
  return _n(t, o) || e.apply(0, t);
}, yn = (t, e, s, n) => {
  const o = rs(n) ? s : n, c = _n(t, o);
  return !!c && (ts(c) ? c : e.apply(0, t));
}, Pr = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: n } = e || {}, { M: o, R: c, P: i } = qe(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = s ?? d, p = rs(n) ? l : n, m = (o.x || o.y) && u, v = t && (Gs(p) ? !c : p);
  return !!m || !!v;
}, oo = /* @__PURE__ */ new WeakMap(), zr = (t, e) => {
  oo.set(t, e);
}, jr = (t) => {
  oo.delete(t);
}, xn = (t) => oo.get(t), qr = (t, e, s) => {
  let n = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    n = !0;
  }, i = (d) => {
    if (o && s) {
      const l = s.map((u) => {
        const [p, m] = u || [];
        return [m && p ? (d || rn)(p, t) : [], m];
      });
      ie(l, (u) => ie(u[0], (p) => {
        const m = u[1], v = o.get(p) || [];
        if (t.contains(p) && m) {
          const g = me(p, m, (w) => {
            n ? (g(), o.delete(p)) : e(w);
          });
          o.set(p, be(v, g));
        } else
          Ne(v), o.delete(p);
      }));
    }
  };
  return i(), [c, i];
}, Lo = (t, e, s, n) => {
  let o = !1;
  const { j: c, X: i, Y: d, W: l, J: u, K: p } = n || {}, m = As(() => o && s(!0), {
    _: 33,
    p: 99
  }), [v, f] = qr(t, m, d), g = c || [], w = i || [], y = Ye(g, w), E = ($, B) => {
    if (!Es(B)) {
      const C = u || ot, S = p || ot, L = [], U = [];
      let N = !1, F = !1;
      if (ie(B, (I) => {
        const { attributeName: T, target: D, type: k, oldValue: R, addedNodes: O, removedNodes: se } = I, ce = k === "attributes", ae = k === "childList", H = t === D, X = ce && T, Q = X && Ys(D, T || ""), K = as(Q) ? Q : null, de = X && R !== K, P = Ks(w, T) && de;
        if (e && (ae || !H)) {
          const j = ce && de, z = j && l && ss(D, l), V = (z ? !C(D, T, R, K) : !ce || j) && !S(I, !!z, t, n);
          ie(O, (q) => be(L, q)), ie(se, (q) => be(L, q)), F = F || V;
        }
        !e && H && de && !C(D, T, R, K) && (be(U, T), N = N || P);
      }), f((I) => fo(L).reduce((T, D) => (be(T, rn(I, D)), ss(D, I) ? be(T, D) : T), [])), e)
        return !$ && F && s(!1), [!1];
      if (!Es(U) || N) {
        const I = [fo(U), N];
        return !$ && s.apply(0, I), I;
      }
    }
  }, x = new cr(Y(E, !1));
  return [() => (x.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: y,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (v(), x.disconnect(), o = !1);
  }), () => {
    if (o)
      return m.S(), E(!0, x.takeRecords());
  }];
}, wn = {}, kn = {}, Gr = (t) => {
  ie(t, (e) => ie(e, (s, n) => {
    wn[n] = e[n];
  }));
}, $n = (t, e, s) => Je(t).map((n) => {
  const { static: o, instance: c } = t[n], [i, d, l] = s || [], u = s ? c : o;
  if (u) {
    const p = s ? u(i, d, e) : u(e);
    return (l || kn)[n] = p;
  }
}), Bt = (t) => kn[t], Kr = "__osOptionsValidationPlugin", Wr = "__osSizeObserverPlugin", Yr = (t, e) => {
  const { M: s } = e, [n, o] = t("showNativeOverlaidScrollbars");
  return [n && s.x && s.y, o];
}, os = (t) => t.indexOf(et) === 0, Jr = (t, e) => {
  const s = (o, c, i, d) => {
    const l = o === et ? it : o.replace(`${et}-`, ""), u = os(o), p = os(i);
    return !c && !d ? it : u && p ? et : u ? c && d ? l : c ? et : it : c ? l : p && d ? et : it;
  }, n = {
    x: s(e.x, t.x, e.y, t.y),
    y: s(e.y, t.y, e.x, t.x)
  };
  return {
    G: n,
    Z: {
      x: n.x === wt,
      y: n.y === wt
    }
  };
}, Sn = "__osScrollbarsHidingPlugin", Xr = "__osClickScrollPlugin", Cn = (t, e, s) => {
  const { dt: n } = s || {}, o = Bt(Wr), [c] = Oe({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = cn(`<div class="${to}"><div class="${Mr}"></div></div>`)[0], u = l.firstChild, p = (m) => {
      const v = m instanceof ResizeObserverEntry;
      let f = !1, g = !1;
      if (v) {
        const [w, , y] = c(m.contentRect), E = Bs(w);
        g = un(w, y), f = !g && !E;
      } else
        g = m === !0;
      f || e({
        ft: !0,
        dt: g
      });
    };
    if (Zt) {
      const m = new Zt((v) => p(v.pop()));
      m.observe(u), be(i, () => {
        m.disconnect();
      });
    } else if (o) {
      const [m, v] = o(u, p, n);
      be(i, Ye([Qs(l, Dr), me(l, "animationstart", m)], v));
    } else
      return ot;
    return Y(Ne, be(i, He(t, l)));
  };
}, Qr = (t, e) => {
  let s;
  const n = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, o = _t(Tr), [c] = Oe({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const p = c(n(l)), [, m] = p;
      return m && !u && e(p) && [p];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (mo)
      s = new mo(Y(d, !1), {
        root: t
      }), s.observe(o), be(l, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const p = Dt(o);
        i(p);
      };
      be(l, Cn(o, u)()), u();
    }
    return Y(Ne, be(l, He(t, o)));
  }, () => s && d(!0, s.takeRecords())];
}, Zr = (t, e, s, n) => {
  let o, c, i, d, l, u;
  const p = `[${nt}]`, m = `[${Ze}]`, v = [], f = ["wrap", "cols", "rows"], g = ["id", "class", "style", "open"], { vt: w, ht: y, ot: E, gt: x, bt: $, wt: B, nt: C, yt: S, St: L, Ot: U } = t, N = (A) => ft(A, "direction") === "rtl", F = {
    $t: !1,
    ct: N(w)
  }, I = qe(), T = Bt(Sn), [D] = Oe({
    i: Zo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = T && T.tt(t, e, F, I, s).ut, q = !(S && C) && Xs(y, nt, Jt), G = !C && L(Cr), J = G && Be(x), le = U(vn, q), ye = G && A && A()[0], $e = Hs(E), oe = eo(E);
    return ye && ye(), Pe(x, J), q && le(), {
      w: $e.w + oe.w,
      h: $e.h + oe.h
    };
  }), k = B ? f : Ye(g, f), R = As(n, {
    _: () => o,
    p: () => c,
    m(A, V) {
      const [q] = A, [G] = V;
      return [Ye(Je(q), Je(G)).reduce((J, le) => (J[le] = q[le] || G[le], J), {})];
    }
  }), O = (A) => {
    const V = N(w);
    re(A, {
      Ct: u !== V
    }), re(F, {
      ct: V
    }), u = V;
  }, se = (A, V) => {
    const [q, G] = A, J = {
      xt: G
    };
    return re(F, {
      $t: q
    }), !V && n(J), J;
  }, ce = ({ ft: A, dt: V }) => {
    const G = !(A && !V) && I.R ? R : n, J = {
      ft: A || V,
      dt: V
    };
    O(J), G(J);
  }, ae = (A, V) => {
    const [, q] = D(), G = {
      Ht: q
    };
    return O(G), q && !V && (A ? n : R)(G), G;
  }, H = (A, V, q) => {
    const G = {
      Et: V
    };
    return O(G), V && !q && R(G), G;
  }, [X, Q] = $ ? Qr(y, se) : [], K = !C && Cn(y, ce, {
    dt: !0
  }), [de, P] = Lo(y, !1, H, {
    X: g,
    j: Ye(g, v)
  }), j = C && Zt && new Zt((A) => {
    const V = A[A.length - 1].contentRect;
    ce({
      ft: !0,
      dt: un(V, l)
    }), l = V;
  }), z = As(() => {
    const [, A] = D();
    n({
      Ht: A
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    j && j.observe(y);
    const A = K && K(), V = X && X(), q = de(), G = I.L((J) => {
      J ? R({
        zt: J
      }) : z();
    });
    return () => {
      j && j.disconnect(), A && A(), V && V(), d && d(), q(), G();
    };
  }, ({ It: A, At: V, Tt: q }) => {
    const G = {}, [J] = A("update.ignoreMutation"), [le, ye] = A("update.attributes"), [$e, oe] = A("update.elementEvents"), [xe, Se] = A("update.debounce"), Ve = oe || ye, we = V || q, Te = (_e) => Ie(J) && J(_e);
    if (Ve) {
      i && i(), d && d();
      const [_e, fe] = Lo($ || E, !0, ae, {
        j: Ye(k, le || []),
        Y: $e,
        W: p,
        K: (Ce, pe) => {
          const { target: Ee, attributeName: Le } = Ce;
          return (!pe && Le && !C ? hr(Ee, p, m) : !1) || !!gt(Ee, `.${Re}`) || !!Te(Ce);
        }
      });
      d = _e(), i = fe;
    }
    if (Se)
      if (R.S(), je(xe)) {
        const _e = xe[0], fe = xe[1];
        o = ze(_e) && _e, c = ze(fe) && fe;
      } else
        ze(xe) ? (o = xe, c = !1) : (o = !1, c = !1);
    if (we) {
      const _e = P(), fe = Q && Q(), Ce = i && i();
      _e && re(G, H(_e[0], _e[1], we)), fe && re(G, se(fe[0], we)), Ce && re(G, ae(Ce[0], we));
    }
    return O(G), G;
  }, F];
}, ea = (t, e, s, n) => {
  const { P: o } = qe(), { scrollbars: c } = o(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: p, gt: m, yt: v, nt: f } = e, { scrollbars: g } = p ? {} : t, { slot: w } = g || {}, y = /* @__PURE__ */ new Map(), E = (P) => Cs && new Cs({
    source: m,
    axis: P
  }), x = {
    x: E("x"),
    y: E("y")
  }, $ = yn([d, l, u], () => f && v ? d : l, i, w), B = (P, j) => {
    if (j) {
      const J = P ? yt : xt, { kt: le, Mt: ye } = j, $e = Mt(ye)[J], oe = Mt(le)[J];
      return Ds(0, 1, $e / oe || 0);
    }
    const z = P ? "x" : "y", { Rt: A, Vt: V } = s, q = V[z], G = A[z];
    return Ds(0, 1, q / (q + G) || 0);
  }, C = (P, j, z) => {
    const A = B(z, P);
    return 1 / A * (1 - A) * j;
  }, S = (P) => re(P, {
    clear: ["left"]
  }), L = (P) => {
    y.forEach((j, z) => {
      (P ? Ks(qo(P), z) : !0) && (ie(j || [], (V) => {
        V && V.cancel();
      }), y.delete(z));
    });
  }, U = (P, j, z, A) => {
    const V = y.get(P) || [], q = V.find((G) => G && G.timeline === j);
    q ? q.effect = new KeyframeEffect(P, z, {
      composite: A
    }) : y.set(P, Ye(V, [P.animate(z, {
      timeline: j,
      composite: A
    })]));
  }, N = (P, j, z) => {
    const A = z ? Qs : nn;
    ie(P, (V) => {
      A(V.Lt, j);
    });
  }, F = (P, j) => {
    ie(P, (z) => {
      const [A, V] = j(z);
      Ot(A, V);
    });
  }, I = (P, j) => {
    F(P, (z) => {
      const { Mt: A } = z;
      return [A, {
        [j ? yt : xt]: go(B(j))
      }];
    });
  }, T = (P, j) => {
    const { Pt: z } = s, A = j ? "x" : "y", V = x[A], q = yo(z)[A], G = (J, le) => bs(go(C(J, q ? le : 1 - le, j)), j);
    V ? ie(P, (J) => {
      const { Mt: le } = J;
      U(le, V, S({
        transform: [0, 1].map((ye) => G(J, ye))
      }));
    }) : F(P, (J) => [J.Mt, {
      transform: G(J, xo(z, Be(m))[A])
    }]);
  }, D = (P) => f && !v && kt(P) === u, k = [], R = [], O = [], se = (P, j, z) => {
    const A = jo(z), V = A ? z : !0, q = A ? !z : !0;
    V && N(R, P, j), q && N(O, P, j);
  }, ce = () => {
    I(R, !0), I(O);
  }, ae = () => {
    T(R, !0), T(O);
  }, H = () => {
    if (f) {
      const { Rt: P, Pt: j } = s, z = yo(j), A = 0.5;
      if (x.x && x.y)
        ie(Ye(O, R), ({ Lt: V }) => {
          if (D(V)) {
            const q = (G) => U(V, x[G], S({
              transform: [0, z[G] ? 1 : -1].map((J) => bs(Os(J * (P[G] - A)), G === "x"))
            }), "add");
            q("x"), q("y");
          } else
            L(V);
        });
      else {
        const V = xo(j, Be(m)), q = (G) => {
          const { Lt: J } = G, le = D(J) && J, ye = ($e, oe, xe) => {
            const Se = oe * $e;
            return Os(xe ? Se : -Se);
          };
          return [le, le && {
            transform: bs({
              x: ye(V.x, P.x, z.x),
              y: ye(V.y, P.y, z.y)
            })
          }];
        };
        F(R, q), F(O, q);
      }
    }
  }, X = (P) => {
    const z = _t(`${Re} ${P ? Hr : Br}`), A = _t(bn), V = _t(so), q = {
      Lt: z,
      kt: A,
      Mt: V
    };
    return be(P ? R : O, q), be(k, [He(z, A), He(A, V), Y(rt, z), L, n(q, se, T, P)]), q;
  }, Q = Y(X, !0), K = Y(X, !1), de = () => (He($, R[0].Lt), He($, O[0].Lt), Y(Ne, k));
  return Q(), K(), [{
    Ut: ce,
    Nt: ae,
    qt: H,
    Bt: se,
    Ft: {
      V: x.x,
      jt: R,
      Xt: Q,
      Yt: Y(F, R)
    },
    Wt: {
      V: x.y,
      jt: O,
      Xt: K,
      Yt: Y(F, O)
    }
  }, de];
}, ta = (t, e, s, n) => (o, c, i, d) => {
  const { ht: l, ot: u, nt: p, gt: m, Jt: v, Ot: f } = e, { Lt: g, kt: w, Mt: y } = o, [E, x] = ct(333), [$, B] = ct(444), [C, S] = ct(), L = Y(i, [o], d), U = (D) => {
    Ie(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: D.x,
      top: D.y
    });
  }, N = d ? yt : xt, F = () => {
    const D = "pointerup pointercancel lostpointercapture", k = `client${d ? "X" : "Y"}`, R = d ? "left" : "top", O = d ? "w" : "h", se = d ? "x" : "y", ce = (ae, H) => (X) => {
      const { Rt: Q } = s, K = Dt(w)[O] - Dt(y)[O], P = H * X / K * Q[se];
      Pe(m, {
        [se]: ae + P
      });
    };
    return me(w, "pointerdown", (ae) => {
      const H = gt(ae.target, `.${so}`) === y, X = H ? y : w, Q = t.scrollbars, { button: K, isPrimary: de, pointerType: P } = ae, { pointers: j } = Q;
      if (K === 0 && de && Q[H ? "dragScroll" : "clickScroll"] && (j || []).includes(P)) {
        B();
        const A = !H && ae.shiftKey, V = Y(Mt, y), q = Y(Mt, w), G = (pe, Ee) => (pe || V())[R] - (Ee || q())[R], J = $s(Mt(m)[N]) / Dt(m)[O] || 1, le = ce(Be(m)[se], 1 / J), ye = ae[k], $e = V(), oe = q(), xe = $e[N], Se = G($e, oe) + xe / 2, Ve = ye - oe[R], we = H ? 0 : Ve - Se, Te = (pe) => {
          Ne(Ce), X.releasePointerCapture(pe.pointerId);
        }, _e = () => f(Er, !0), fe = _e(), Ce = [() => {
          const pe = Be(m);
          fe();
          const Ee = Be(m), Le = {
            x: Ee.x - pe.x,
            y: Ee.y - pe.y
          };
          (Xt(Le.x) > 3 || Xt(Le.y) > 3) && (_e(), Pe(m, pe), U(Le), $(fe));
        }, me(v, D, Te), me(v, "selectstart", (pe) => Rs(pe), {
          H: !1
        }), me(w, D, Te), me(w, "pointermove", (pe) => {
          const Ee = pe[k] - ye;
          (H || A) && le(we + Ee);
        })];
        if (X.setPointerCapture(ae.pointerId), A)
          le(we);
        else if (!H) {
          const pe = Bt(Xr);
          pe && be(Ce, pe(le, G, we, xe, Ve));
        }
      }
    });
  };
  let I = !0;
  const T = (D) => D.propertyName.indexOf(N) > -1;
  return Y(Ne, [me(y, "pointermove pointerleave", n), me(g, "pointerenter", () => {
    c(Ao, !0);
  }), me(g, "pointerleave pointercancel", () => {
    c(Ao, !1);
  }), !p && me(g, "mousedown", () => {
    const D = Ls();
    (po(D, Ze) || po(D, nt) || D === document.body) && Qt(Y(Vs, u), 25);
  }), me(g, "wheel", (D) => {
    const { deltaX: k, deltaY: R, deltaMode: O } = D;
    I && O === 0 && kt(g) === l && U({
      x: k,
      y: R
    }), I = !1, c(To, !0), E(() => {
      I = !0, c(To);
    }), Rs(D);
  }, {
    H: !1,
    I: !0
  }), me(y, "transitionstart", (D) => {
    if (T(D)) {
      const k = () => {
        L(), C(k);
      };
      k();
    }
  }), me(y, "transitionend transitioncancel", (D) => {
    T(D) && (S(), L());
  }), me(g, "pointerdown", Y(me, v, "click", fn, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), F(), x, B, S]);
}, sa = (t, e, s, n, o, c) => {
  let i, d, l, u, p, m = ot, v = 0;
  const f = (H) => H.pointerType === "mouse", [g, w] = ct(), [y, E] = ct(100), [x, $] = ct(100), [B, C] = ct(() => v), [S, L] = ea(t, o, n, ta(e, o, n, (H) => f(H) && O())), { ht: U, Kt: N, yt: F } = o, { Bt: I, Ut: T, Nt: D, qt: k } = S, R = (H, X) => {
    if (C(), H)
      I(Mo);
    else {
      const Q = Y(I, Mo, !0);
      v > 0 && !X ? B(Q) : Q();
    }
  }, O = () => {
    (l ? !i : !u) && (R(!0), y(() => {
      R(!1);
    }));
  }, se = (H) => {
    I(Fs, H, !0), I(Fs, H, !1);
  }, ce = (H) => {
    f(H) && (i = l, l && R(!0));
  }, ae = [C, E, $, w, () => m(), me(U, "pointerover", ce, {
    A: !0
  }), me(U, "pointerenter", ce), me(U, "pointerleave", (H) => {
    f(H) && (i = !1, l && R(!1));
  }), me(U, "pointermove", (H) => {
    f(H) && d && O();
  }), me(N, "scroll", (H) => {
    g(() => {
      D(), O();
    }), c(H), k();
  })];
  return [() => Y(Ne, be(ae, L())), ({ It: H, Tt: X, Gt: Q, Qt: K }) => {
    const { Zt: de, tn: P, nn: j, sn: z } = K || {}, { Ct: A, dt: V } = Q || {}, { ct: q } = s, { M: G } = qe(), { G: J, en: le } = n, [ye, $e] = H("showNativeOverlaidScrollbars"), [oe, xe] = H("scrollbars.theme"), [Se, Ve] = H("scrollbars.visibility"), [we, Te] = H("scrollbars.autoHide"), [_e, fe] = H("scrollbars.autoHideSuspend"), [Ce] = H("scrollbars.autoHideDelay"), [pe, Ee] = H("scrollbars.dragScroll"), [Le, ht] = H("scrollbars.clickScroll"), [Rt, ms] = H("overflow"), fs = V && !X, ps = le.x || le.y, Fe = de || P || z || A || X, hs = j || Ve || ms, Vt = ye && G.x && G.y, It = (Xe, Et, At) => {
      const Nt = Xe.includes(wt) && (Se === et || Se === "auto" && Et === wt);
      return I(Rr, Nt, At), Nt;
    };
    if (v = Ce, fs && (_e && ps ? (se(!1), m(), x(() => {
      m = me(N, "scroll", Y(se, !0), {
        A: !0
      });
    })) : se(!0)), $e && I(Lr, Vt), xe && (I(p), I(oe, !0), p = oe), fe && !_e && se(!0), Te && (d = we === "move", l = we === "leave", u = we === "never", R(u, !0)), Ee && I(Nr, pe), ht && I(Ir, Le), hs) {
      const Xe = It(Rt.x, J.x, !0), Et = It(Rt.y, J.y, !1);
      I(Vr, !(Xe && Et));
    }
    Fe && (T(), D(), k(), I(Do, !le.x, !0), I(Do, !le.y, !1), I(Or, q && !F));
  }, {}, S];
}, oa = (t) => {
  const e = qe(), { P: s, R: n } = e, { elements: o } = s(), { host: c, padding: i, viewport: d, content: l } = o, u = ts(t), p = u ? {} : t, { elements: m } = p, { host: v, padding: f, viewport: g, content: w } = m || {}, y = u ? t : p.target, E = an(y), x = ss(y, "textarea"), $ = y.ownerDocument, B = $.documentElement, C = () => $.defaultView || Me, S = Y(Ur, [y]), L = Y(yn, [y]), U = Y(_t, ""), N = Y(S, U, d), F = Y(L, U, l), I = N(g), T = I === y, D = T && E, k = !T && F(w), R = !T && I === k, O = D ? B : I, se = x ? S(U, c, v) : y, ce = D ? O : se, ae = !T && L(U, i, f), H = !R && k, X = [H, O, ae, ce].map((oe) => ts(oe) && !kt(oe) && oe), Q = (oe) => oe && Ks(X, oe), K = Q(O) ? y : O, de = {
    vt: y,
    ht: ce,
    ot: O,
    cn: ae,
    bt: H,
    gt: D ? B : O,
    Kt: D ? $ : O,
    rn: E ? B : K,
    Jt: $,
    wt: x,
    yt: E,
    Dt: u,
    nt: T,
    ln: C,
    St: (oe) => Xs(O, Ze, oe),
    Ot: (oe, xe) => Ms(O, Ze, oe, xe)
  }, { vt: P, ht: j, cn: z, ot: A, bt: V } = de, q = [() => {
    Ue(j, [nt, _s]), Ue(P, _s), E && Ue(B, [_s, nt]);
  }], G = x && Q(j);
  let J = x ? P : Ts([V, A, z, j, P].find((oe) => oe && !Q(oe)));
  const le = D ? P : V || A, ye = Y(Ne, q);
  return [de, () => {
    const oe = C(), xe = Ls(), Se = (fe) => {
      He(kt(fe), Ts(fe)), rt(fe);
    }, Ve = (fe) => me(fe, "focusin focusout focus blur", fn, {
      I: !0,
      H: !1
    }), we = "tabindex", Te = Ys(A, we), _e = Ve(xe);
    return We(j, nt, T ? "" : kr), We(z, Ns, ""), We(A, Ze, ""), We(V, Eo, ""), T || (We(A, we, Te || "-1"), E && We(B, Co, "")), G && (ho(P, j), be(q, () => {
      ho(j, P), rt(j);
    })), He(le, J), He(j, z), He(z || j, !T && A), He(A, V), be(q, [_e, () => {
      const fe = Ls(), Ce = Q(A), pe = Ce && fe === A ? P : fe, Ee = Ve(pe);
      Ue(z, Ns), Ue(V, Eo), Ue(A, Ze), E && Ue(B, Co), Te ? We(A, we, Te) : Ue(A, we), Q(V) && Se(V), Ce && Se(A), Q(z) && Se(z), Vs(pe), Ee();
    }]), n && !T && (Js(A, Ze, gn), be(q, Y(Ue, A, Ze))), Vs(!T && E && xe === P && oe.top === oe ? A : xe), _e(), J = 0, ye;
  }, ye];
}, na = ({ bt: t }) => ({ Gt: e, an: s, Tt: n }) => {
  const { xt: o } = e || {}, { $t: c } = s;
  t && (o || n) && Ot(t, {
    [xt]: c && "100%"
  });
}, ra = ({ ht: t, cn: e, ot: s, nt: n }, o) => {
  const [c, i] = Oe({
    i: fr,
    o: bo()
  }, Y(bo, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: p }) => {
    let [m, v] = i(p);
    const { R: f } = qe(), { ft: g, Ht: w, Ct: y } = l || {}, { ct: E } = u, [x, $] = d("paddingAbsolute");
    (g || v || (p || w)) && ([m, v] = c(p));
    const C = !n && ($ || y || v);
    if (C) {
      const S = !x || !e && !f, L = m.r + m.l, U = m.t + m.b, N = {
        [Xo]: S && !E ? -L : 0,
        [Qo]: S ? -U : 0,
        [Jo]: S && E ? -L : 0,
        top: S ? -m.t : 0,
        right: S ? E ? -m.r : "auto" : 0,
        left: S ? E ? "auto" : -m.l : 0,
        [yt]: S && `calc(100% + ${L}px)`
      }, F = {
        [Go]: S ? m.t : 0,
        [Ko]: S ? m.r : 0,
        [Yo]: S ? m.b : 0,
        [Wo]: S ? m.l : 0
      };
      Ot(e || s, N), Ot(s, F), re(o, {
        cn: m,
        un: !S,
        rt: e ? F : re({}, N, F)
      });
    }
    return {
      _n: C
    };
  };
}, aa = (t, e) => {
  const s = qe(), { ht: n, cn: o, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: p, ln: m } = t, { R: v } = s, f = u && i, g = Y(Uo, 0), w = ["display", "direction", "flexDirection", "writingMode"], y = {
    i: Zo,
    o: {
      w: 0,
      h: 0
    }
  }, E = {
    i: Wt,
    o: {}
  }, x = (H) => {
    p(vn, !f && H);
  }, $ = (H, X) => {
    const Q = Me.devicePixelRatio % 1 !== 0 ? 1 : 0, K = {
      w: g(H.w - X.w),
      h: g(H.h - X.h)
    };
    return {
      w: K.w > Q ? K.w : 0,
      h: K.h > Q ? K.h : 0
    };
  }, [B, C] = Oe(y, Y(eo, c)), [S, L] = Oe(y, Y(Hs, c)), [U, N] = Oe(y), [F] = Oe(E), [I, T] = Oe(y), [D] = Oe(E), [k] = Oe({
    i: (H, X) => cs(H, X, w),
    o: {}
  }, () => yr(c) ? ft(c, w) : {}), [R, O] = Oe({
    i: (H, X) => Wt(H.T, X.T) && Wt(H.D, X.D),
    o: pn()
  }, () => {
    x(!0);
    const H = Be(l), X = p(Ar, !0), Q = me(d, wt, (z) => {
      const A = Be(l);
      z.isTrusted && A.x === H.x && A.y === H.y && mn(z);
    }, {
      I: !0,
      A: !0
    });
    Pe(l, {
      x: 0,
      y: 0
    }), X();
    const K = Be(l), de = Hs(l);
    Pe(l, {
      x: de.w,
      y: de.h
    });
    const P = Be(l);
    Pe(l, {
      x: P.x - K.x < 1 && -de.w,
      y: P.y - K.y < 1 && -de.h
    });
    const j = Be(l);
    return Pe(l, H), qs(() => Q()), {
      T: K,
      D: j
    };
  }), se = Bt(Sn), ce = (H, X) => `${X ? $r : Sr}${mr(H)}`, ae = (H) => {
    const X = (K) => [et, it, wt].map((de) => ce(de, K)), Q = X(!0).concat(X()).join(" ");
    p(Q), p(Je(H).map((K) => ce(H[K], K === "x")).join(" "), !0);
  };
  return ({ It: H, Gt: X, an: Q, Tt: K }, { _n: de }) => {
    const { ft: P, Ht: j, Ct: z, dt: A, zt: V } = X || {}, q = se && se.tt(t, e, Q, s, H), { it: G, ut: J, _t: le } = q || {}, [ye, $e] = Yr(H, s), [oe, xe] = H("overflow"), Se = os(oe.x), Ve = os(oe.y), we = P || de || j || z || V || $e;
    let Te = C(K), _e = L(K), fe = N(K), Ce = T(K);
    if ($e && v && p(gn, !ye), we) {
      Xs(n, nt, Jt) && x(!0);
      const [lo] = J ? J() : [], [Ft] = Te = B(K), [Ut] = _e = S(K), Pt = dn(c), zt = f && _r(m()), Vn = {
        w: g(Ut.w + Ft.w),
        h: g(Ut.h + Ft.h)
      }, io = {
        w: g((zt ? zt.w : Pt.w + g(Pt.w - Ut.w)) + Ft.w),
        h: g((zt ? zt.h : Pt.h + g(Pt.h - Ut.h)) + Ft.h)
      };
      lo && lo(), Ce = I(io), fe = U($(Vn, io), K);
    }
    const [pe, Ee] = Ce, [Le, ht] = fe, [Rt, ms] = _e, [fs, ps] = Te, [Fe, hs] = F({
      x: Le.w > 0,
      y: Le.h > 0
    }), Vt = Se && Ve && (Fe.x || Fe.y) || Se && Fe.x && !Fe.y || Ve && Fe.y && !Fe.x, It = de || z || V || ps || ms || Ee || ht || xe || $e || we, Xe = Jr(Fe, oe), [Et, At] = D(Xe.G), [, Nt] = k(K), ao = z || A || Nt || hs || K, [Bn, Rn] = ao ? R(K) : O();
    return It && (At && ae(Xe.G), le && G && Ot(c, le(Xe, Q, G(Xe, Rt, fs)))), x(!1), Ms(n, nt, Jt, Vt), Ms(o, Ns, Jt, Vt), re(e, {
      G: Et,
      Vt: {
        x: pe.w,
        y: pe.h
      },
      Rt: {
        x: Le.w,
        y: Le.h
      },
      en: Fe,
      Pt: xr(Bn, Le)
    }), {
      nn: At,
      Zt: Ee,
      tn: ht,
      sn: Rn || ht,
      dn: ao
    };
  };
}, la = (t) => {
  const [e, s, n] = oa(t), o = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [Xo]: 0,
      [Qo]: 0,
      [Jo]: 0,
      [Go]: 0,
      [Ko]: 0,
      [Yo]: 0,
      [Wo]: 0
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
      x: it,
      y: it
    },
    en: {
      x: !1,
      y: !1
    },
    Pt: pn()
  }, { vt: c, gt: i, nt: d } = e, { R: l, M: u } = qe(), p = !l && (u.x || u.y), m = [na(e), ra(e, o), aa(e, o)];
  return [s, (v) => {
    const f = {}, w = p && Be(i);
    return ie(m, (y) => {
      re(f, y(v, f) || {});
    }), Pe(i, w), !d && Pe(c, 0), f;
  }, o, e, n];
}, ia = (t, e, s, n, o) => {
  const c = So(e, {}), [i, d, l, u, p] = la(t), [m, v, f] = Zr(u, l, c, ($) => {
    x({}, $);
  }), [g, w, , y] = sa(t, e, f, l, u, o), E = ($) => Je($).some((B) => !!$[B]), x = ($, B) => {
    if (s())
      return !1;
    const { fn: C, Tt: S, At: L, pn: U } = $, N = C || {}, F = !!S, I = {
      It: So(e, N, F),
      fn: N,
      Tt: F
    };
    if (U)
      return w(I), !1;
    const T = B || v(re({}, I, {
      At: L
    })), D = d(re({}, I, {
      an: f,
      Gt: T
    }));
    w(re({}, I, {
      Gt: T,
      Qt: D
    }));
    const k = E(T), R = E(D), O = k || R || !Ws(N) || F;
    return O && n($, {
      Gt: T,
      Qt: D
    }), O;
  };
  return [() => {
    const { rn: $, gt: B } = u, C = Be($), S = [m(), i(), g()];
    return Pe(B, C), Y(Ne, S);
  }, x, () => ({
    vn: f,
    hn: l
  }), {
    gn: u,
    bn: y
  }, p];
}, pt = (t, e, s) => {
  const { N: n } = qe(), o = ts(t), c = o ? t : t.target, i = xn(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, p = (F) => {
      const I = tn(F), T = Bt(Kr);
      return T ? T(I, !0) : I;
    }, m = re({}, n(), p(e)), [v, f, g] = Is(), [w, y, E] = Is(s), x = (F, I) => {
      E(F, I), g(F, I);
    }, [$, B, C, S, L] = ia(t, m, () => d, ({ fn: F, Tt: I }, { Gt: T, Qt: D }) => {
      const { ft: k, Ct: R, xt: O, Ht: se, Et: ce, dt: ae } = T, { Zt: H, tn: X, nn: Q, sn: K } = D;
      x("updated", [N, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!R,
          heightIntrinsicChanged: !!O,
          overflowEdgeChanged: !!H,
          overflowAmountChanged: !!X,
          overflowStyleChanged: !!Q,
          scrollCoordinatesChanged: !!K,
          contentMutation: !!se,
          hostMutation: !!ce,
          appear: !!ae
        },
        changedOptions: F || {},
        force: !!I
      }]);
    }, (F) => x("scroll", [N, F])), U = (F) => {
      jr(c), Ne(l), d = !0, x("destroyed", [N, F]), f(), y();
    }, N = {
      options(F, I) {
        if (F) {
          const T = I ? n() : {}, D = hn(m, re(T, p(F)));
          Ws(D) || (re(m, D), B({
            fn: D
          }));
        }
        return re({}, m);
      },
      on: w,
      off: (F, I) => {
        F && I && y(F, I);
      },
      state() {
        const { vn: F, hn: I } = C(), { ct: T } = F, { Vt: D, Rt: k, G: R, en: O, cn: se, un: ce, Pt: ae } = I;
        return re({}, {
          overflowEdge: D,
          overflowAmount: k,
          overflowStyle: R,
          hasOverflow: O,
          scrollCoordinates: {
            start: ae.T,
            end: ae.D
          },
          padding: se,
          paddingAbsolute: ce,
          directionRTL: T,
          destroyed: d
        });
      },
      elements() {
        const { vt: F, ht: I, cn: T, ot: D, bt: k, gt: R, Kt: O } = S.gn, { Ft: se, Wt: ce } = S.bn, ae = (X) => {
          const { Mt: Q, kt: K, Lt: de } = X;
          return {
            scrollbar: de,
            track: K,
            handle: Q
          };
        }, H = (X) => {
          const { jt: Q, Xt: K } = X, de = ae(Q[0]);
          return re({}, de, {
            clone: () => {
              const P = ae(K());
              return B({
                pn: !0
              }), P;
            }
          });
        };
        return re({}, {
          target: F,
          host: I,
          padding: T || D,
          viewport: D,
          content: k || D,
          scrollOffsetElement: R,
          scrollEventElement: O,
          scrollbarHorizontal: H(se),
          scrollbarVertical: H(ce)
        });
      },
      update: (F) => B({
        Tt: F,
        At: !0
      }),
      destroy: Y(U, !1),
      plugin: (F) => u[Je(F)[0]]
    };
    return be(l, [L]), zr(c, N), $n(wn, pt, [N, v, u]), Pr(S.gn.yt, !o && t.cancel) ? (U(!0), N) : (be(l, $()), x("initialized", [N]), N.update(!0), N);
  }
  return i;
};
pt.plugin = (t) => {
  const e = je(t), s = e ? t : [t], n = s.map((o) => $n(o, pt)[0]);
  return Gr(s), e ? n : n[0];
};
pt.valid = (t) => {
  const e = t && t.elements, s = Ie(e) && e();
  return es(s) && !!xn(s.target);
};
pt.env = () => {
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
function ca() {
  let t;
  const e = M(null), s = Math.floor(Math.random() * 2 ** 32), n = M(!1), o = M([]), c = () => o.value, i = () => t.getSelection(), d = () => o.value.length, l = () => t.clearSelection(!0), u = M(), p = M(null), m = M(null), v = M(null);
  function f() {
    t = new Kn({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: B, event: C, isDragging: S }) => {
      if (S)
        t.Interaction._reset(C);
      else {
        n.value = !1;
        const L = e.value.offsetWidth - C.offsetX, U = e.value.offsetHeight - C.offsetY;
        L < 15 && U < 15 && t.Interaction._reset(C), C.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(C);
      }
    }), document.addEventListener("dragleave", (B) => {
      !B.buttons && n.value && (n.value = !1);
    });
  }
  const g = () => dt(() => {
    t.addSelection(
      t.getSelectables()
    ), w();
  }), w = () => {
    o.value = t.getSelection().map((B) => JSON.parse(B.dataset.item)), u.value(o.value);
  }, y = () => dt(() => {
    const B = c().map((C) => C.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((C) => B.includes(JSON.parse(C.dataset.item).path))
    ), w(), x();
  }), E = (B) => {
    u.value = B, t.subscribe("DS:end", ({ items: C, event: S, isDragging: L }) => {
      o.value = C.map((U) => JSON.parse(U.dataset.item)), B(C.map((U) => JSON.parse(U.dataset.item)));
    });
  }, x = () => {
    p.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (m.value.style.height = e.value.scrollHeight + "px", m.value.style.display = "block") : (m.value.style.height = "100%", m.value.style.display = "none"));
  }, $ = (B) => {
    if (!p.value)
      return;
    const { scrollOffsetElement: C } = p.value.elements();
    C.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ae(() => {
    pt(v.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: pt
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (B) => {
        p.value = B;
      },
      scroll: (B, C) => {
        const { scrollOffsetElement: S } = B.elements();
        e.value.scrollTo({
          top: S.scrollTop,
          left: 0
        });
      }
    }), f(), x(), new ResizeObserver(x).observe(e.value), e.value.addEventListener("scroll", $), t.subscribe("DS:scroll", ({ isDragging: B }) => B || $());
  }), zs(() => {
    t && t.stop();
  }), Bo(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: n,
    scrollBar: m,
    scrollBarContainer: v,
    getSelected: c,
    getSelection: i,
    selectAll: g,
    clearSelection: l,
    refreshSelection: y,
    getCount: d,
    onSelect: E
  };
}
function da(t, e) {
  const s = M(t), n = M(e), o = M([]), c = M([]), i = M([]), d = M(!1), l = M(5);
  let u = !1, p = !1;
  const m = Ht({
    adapter: s,
    storages: [],
    dirname: n,
    files: []
  });
  function v() {
    let x = [], $ = [], B = n.value ?? s.value + "://";
    B.length === 0 && (o.value = []), B.replace(s.value + "://", "").split("/").forEach(function(L) {
      x.push(L), x.join("/") !== "" && $.push({
        basename: L,
        name: L,
        path: s.value + "://" + x.join("/"),
        type: "dir"
      });
    }), c.value = $;
    const [C, S] = g($, l.value);
    i.value = S, o.value = C;
  }
  function f(x) {
    l.value = x, v();
  }
  function g(x, $) {
    return x.length > $ ? [x.slice(-$), x.slice(0, -$)] : [x, []];
  }
  function w(x = null) {
    d.value = x ?? !d.value;
  }
  function y() {
    return o.value && o.value.length && !p;
  }
  const E = mt(() => {
    var x;
    return ((x = o.value[o.value.length - 2]) == null ? void 0 : x.path) ?? s.value + "://";
  });
  return Ae(() => {
  }), bt(n, v), Ae(v), {
    adapter: s,
    path: n,
    loading: u,
    searchMode: p,
    data: m,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: f,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: w,
    isGoUpAvailable: y,
    parentFolderPath: E
  };
}
const ua = (t, e) => {
  const s = er(t.id), n = Gn(), o = s.getStore("metricUnits", !1), c = ar(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (v) => Array.isArray(v) ? v : or, p = s.getStore("persist-path", t.persist), m = p ? s.getStore("path", t.path) : t.path;
  return Ht({
    /*
    * Core properties
    * */
    // app version
    version: nr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: n,
    // storage
    storage: s,
    // localization object
    i18n: mt(() => sr(s, d, n, i)),
    // modal state
    modal: lr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: mt(() => ca()),
    // http object
    requester: Zn(t.request),
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
    filesize: o ? No : Io,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: p,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: da(l, m)
  });
}, ma = /* @__PURE__ */ a("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), fa = { class: "fixed z-10 inset-0 overflow-hidden" }, pa = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, ha = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Ge = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), s = ue("ServiceContainer");
    return Ae(() => {
      const n = document.querySelector(".v-f-modal input");
      n && n.focus(), dt(() => {
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
      onKeyup: o[1] || (o[1] = $t((c) => r(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      ma,
      a("div", fa, [
        a("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = st((c) => r(s).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            a("div", pa, [
              Tt(n.$slots, "default")
            ]),
            a("div", ha, [
              Tt(n.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, va = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, o] of e)
    s[n] = o;
  return s;
}, ga = {
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
    return Ae(() => {
      n.emitter.on(t.on, d);
    }), zs(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: c
    };
  }
}, ba = { key: 1 };
function _a(t, e, s, n, o, c) {
  return h(), _("div", {
    class: ve(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !n.shown }]])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (h(), _("span", ba, b(n.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ va(ga, [["render", _a]]), ya = { class: "sm:flex sm:items-start" }, xa = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), wa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ka = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $a = { class: "mt-2" }, Sa = { class: "text-sm text-gray-500" }, Ca = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, Ea = { class: "mt-3 text-left" }, Aa = { class: "space-y-2" }, Da = { class: "flex relative gap-x-3" }, Ma = { class: "h-6 items-center" }, Ta = { class: "flex-1 block text-sm" }, La = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Oa = { class: "flex relative gap-x-3" }, Ha = { class: "h-6 items-center" }, Ba = { class: "flex-1 block text-sm" }, Ra = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Va = { class: "flex relative gap-x-3" }, Ia = { class: "h-6 items-center" }, Na = { class: "flex-1 block text-sm" }, Fa = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Ua = { class: "flex relative gap-x-3" }, Pa = { class: "h-6 items-center" }, za = { class: "flex-1 block text-sm" }, ja = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, qa = { class: "flex relative gap-x-3" }, Ga = { class: "h-6 items-center" }, Ka = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, Wa = { class: "flex text-sm" }, Ya = ["label"], Ja = ["value"], Xa = {
  key: 0,
  class: "flex relative gap-x-3"
}, Qa = { class: "h-6 items-center" }, Za = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, el = { class: "flex text-sm" }, tl = ["label"], sl = ["value"], En = {
  __name: "ModalAbout",
  setup(t) {
    const e = ue("ServiceContainer"), { setStore: s, clearStore: n } = e.storage, { t: o, changeLocale: c, locale: i } = e.i18n, d = async () => {
      n(), location.reload();
    }, l = (E) => {
      e.theme.set(E), e.emitter.emit("vf-theme-saved");
    }, u = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? No : Io, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, p = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, m = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, v = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: f } = ue("VueFinderOptions"), w = Object.fromEntries(
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
      }).filter(([E]) => Object.keys(f).includes(E))
    ), y = mt(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (E, x) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: x[8] || (x[8] = ($) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(o)("Close")), 1)
      ]),
      default: Z(() => [
        a("div", ya, [
          xa,
          a("div", wa, [
            a("h3", ka, b(r(o)("About %s", "Vuefinder " + r(e).version)), 1),
            a("div", $a, [
              a("p", Sa, b(r(o)("Vuefinder is a file manager component for vue 3.")), 1),
              a("div", null, [
                a("h3", Ca, b(r(o)("Settings")), 1)
              ]),
              a("div", Ea, [
                a("fieldset", null, [
                  a("div", Aa, [
                    a("div", Da, [
                      a("div", Ma, [
                        ge(a("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": x[0] || (x[0] = ($) => r(e).metricUnits = $),
                          onClick: u,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, r(e).metricUnits]
                        ])
                      ]),
                      a("div", Ta, [
                        a("label", La, [
                          ne(b(r(o)("Use Metric Units")) + " ", 1),
                          te(vt, {
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
                    a("div", Oa, [
                      a("div", Ha, [
                        ge(a("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": x[1] || (x[1] = ($) => r(e).compactListView = $),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, r(e).compactListView]
                        ])
                      ]),
                      a("div", Ba, [
                        a("label", Ra, [
                          ne(b(r(o)("Compact list view")) + " ", 1),
                          te(vt, {
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
                    a("div", Va, [
                      a("div", Ia, [
                        ge(a("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": x[2] || (x[2] = ($) => r(e).persist = $),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, r(e).persist]
                        ])
                      ]),
                      a("div", Na, [
                        a("label", Fa, [
                          ne(b(r(o)("Persist path on reload")) + " ", 1),
                          te(vt, {
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
                    a("div", Ua, [
                      a("div", Pa, [
                        ge(a("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": x[3] || (x[3] = ($) => r(e).showThumbnails = $),
                          onClick: m,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, r(e).showThumbnails]
                        ])
                      ]),
                      a("div", za, [
                        a("label", ja, [
                          ne(b(r(o)("Show thumbnails")) + " ", 1),
                          te(vt, {
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
                    a("div", qa, [
                      a("div", Ga, [
                        a("label", Ka, b(r(o)("Theme")), 1)
                      ]),
                      a("div", Wa, [
                        ge(a("select", {
                          id: "theme",
                          "onUpdate:modelValue": x[4] || (x[4] = ($) => r(e).theme.value = $),
                          onChange: x[5] || (x[5] = ($) => l($.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: r(o)("Theme")
                          }, [
                            (h(!0), _(ke, null, De(y.value, ($, B) => (h(), _("option", { value: B }, b($), 9, Ja))), 256))
                          ], 8, Ya)
                        ], 544), [
                          [ks, r(e).theme.value]
                        ]),
                        te(vt, {
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
                    r(e).features.includes(r(he).LANGUAGE) && Object.keys(r(w)).length > 1 ? (h(), _("div", Xa, [
                      a("div", Qa, [
                        a("label", Za, b(r(o)("Language")), 1)
                      ]),
                      a("div", el, [
                        ge(a("select", {
                          id: "language",
                          "onUpdate:modelValue": x[6] || (x[6] = ($) => Ro(i) ? i.value = $ : null),
                          onChange: x[7] || (x[7] = ($) => r(c)($.target.value)),
                          class: "flex-shrink-0 w-1/2 sm:w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: r(o)("Language")
                          }, [
                            (h(!0), _(ke, null, De(r(w), ($, B) => (h(), _("option", { value: B }, b($), 9, sl))), 256))
                          ], 8, tl)
                        ], 544), [
                          [ks, r(i)]
                        ]),
                        te(vt, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: Z(() => [
                            ne(b(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : W("", !0),
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
}, ol = ["aria-label"], nl = /* @__PURE__ */ a("svg", {
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
], -1), rl = [
  nl
], Ke = {
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
    bt(d, () => c.value = !1);
    const l = () => {
      s("hidden"), c.value = !0;
    };
    return (p, m) => (h(), _("div", null, [
      c.value ? W("", !0) : (h(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ve(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", t.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        Tt(p.$slots, "default"),
        a("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": r(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, rl, 8, ol)
      ], 2))
    ]));
  }
}, al = { class: "sm:flex sm:items-start" }, ll = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), il = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, cl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, dl = { class: "mt-2" }, ul = { class: "text-sm text-gray-500" }, ml = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, fl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, pl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), vl = [
  hl
], gl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), _l = [
  bl
], yl = { class: "ml-1.5" }, xl = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, no = {
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
        a("div", xl, b(r(s)("This action cannot be undone.")), 1)
      ]),
      default: Z(() => [
        a("div", al, [
          ll,
          a("div", il, [
            a("h3", cl, b(r(s)("Delete files")), 1),
            a("div", dl, [
              a("p", ul, b(r(s)("Are you sure you want to delete these files?")), 1),
              a("div", ml, [
                (h(!0), _(ke, null, De(n.value, (l) => (h(), _("p", fl, [
                  l.type === "dir" ? (h(), _("svg", pl, vl)) : (h(), _("svg", gl, _l)),
                  a("span", yl, b(l.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (h(), ee(Ke, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : W("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, wl = { class: "sm:flex sm:items-start" }, kl = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), $l = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Sl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cl = { class: "mt-2" }, El = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Al = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ml = [
  Dl
], Tl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ll = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ol = [
  Ll
], Hl = { class: "ml-1.5" }, ro = {
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
        a("div", wl, [
          kl,
          a("div", $l, [
            a("h3", Sl, b(r(s)("Rename")), 1),
            a("div", Cl, [
              a("p", El, [
                n.value.type === "dir" ? (h(), _("svg", Al, Ml)) : (h(), _("svg", Tl, Ol)),
                a("span", Hl, b(n.value.basename), 1)
              ]),
              ge(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => o.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [St, o.value]
              ]),
              c.value.length ? (h(), ee(Ke, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(c.value), 1)
                ]),
                _: 1
              })) : W("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, lt = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  BACKSLASH: "Backslash",
  KEY_F: "KeyF",
  KEY_A: "KeyA"
};
function Bl(t) {
  const e = (s) => {
    s.key === lt.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (s.key === lt.F2 && t.features.includes(he.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ro, { items: t.dragSelect.getSelected() })), s.key === lt.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.key === lt.DELETE && (!t.dragSelect.getCount() || t.modal.open(no, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === lt.BACKSLASH && t.modal.open(En), s.metaKey && s.code === lt.KEY_F && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === lt.KEY_A && (t.dragSelect.selectAll(), s.preventDefault()));
  };
  Ae(() => {
    t.root.addEventListener("keydown", e);
  }), zs(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const Rl = { class: "sm:flex sm:items-start" }, Vl = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Il = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Nl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Fl = { class: "mt-2" }, Ul = { class: "text-sm text-gray-500" }, Pl = ["placeholder"], An = {
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
        a("div", Rl, [
          Vl,
          a("div", Il, [
            a("h3", Nl, b(r(s)("New Folder")), 1),
            a("div", Fl, [
              a("p", Ul, b(r(s)("Create a new folder")), 1),
              ge(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => n.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("Folder Name"),
                type: "text"
              }, null, 40, Pl), [
                [St, n.value]
              ]),
              o.value.length ? (h(), ee(Ke, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : W("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, zl = { class: "sm:flex sm:items-start" }, jl = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ql = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Gl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Kl = { class: "mt-2" }, Wl = { class: "text-sm text-gray-500" }, Yl = ["placeholder"], Jl = {
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
        a("div", zl, [
          jl,
          a("div", ql, [
            a("h3", Gl, b(r(s)("New File")), 1),
            a("div", Kl, [
              a("p", Wl, b(r(s)("Create a new file")), 1),
              ge(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => n.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("File Name"),
                type: "text"
              }, null, 40, Yl), [
                [St, n.value]
              ]),
              o.value.length ? (h(), ee(Ke, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : W("", !0)
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
const Xl = { class: "sm:flex sm:items-start" }, Ql = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Zl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ei = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ti = { class: "mt-2" }, si = {
  key: 0,
  class: "pointer-events-none"
}, oi = {
  key: 1,
  class: "pointer-events-none"
}, ni = ["disabled"], ri = ["disabled"], ai = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, li = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, ii = ["textContent"], ci = { class: "ml-1 w-full h-fit" }, di = { class: "text-left hidden md:block" }, ui = { class: "text-left md:hidden" }, mi = {
  key: 0,
  class: "ml-auto"
}, fi = ["title", "disabled", "onClick"], pi = /* @__PURE__ */ a("svg", {
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
], -1), hi = [
  pi
], vi = {
  key: 0,
  class: "py-2"
}, gi = ["disabled"], bi = {
  __name: "ModalUpload",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: o }), i = M(null), d = M(null), l = M(null), u = M(null), p = M(null), m = M(null), v = M([]), f = M(""), g = M(!1), w = M(!1);
    let y;
    function E(T) {
      return v.value.findIndex((D) => D.id === T);
    }
    function x(T, D = null) {
      D = D ?? (T.webkitRelativePath || T.name), y.addFile({
        name: D,
        type: T.type,
        data: T,
        source: "Local"
      });
    }
    function $(T) {
      switch (T.status) {
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
    const B = (T) => {
      switch (T.status) {
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
    function C() {
      u.value.click();
    }
    function S() {
      if (!g.value) {
        if (!v.value.filter((T) => T.status !== o.DONE).length) {
          f.value = s("Please select file to upload first.");
          return;
        }
        f.value = "", y.retryAll(), y.upload();
      }
    }
    function L() {
      y.cancelAll({ reason: "user" }), v.value.forEach((T) => {
        T.status !== o.DONE && (T.status = o.CANCELED, T.statusName = s("Canceled"));
      }), g.value = !1;
    }
    function U(T) {
      g.value || (y.removeFile(T.id, "removed-by-user"), v.value.splice(E(T.id), 1));
    }
    function N(T) {
      if (!g.value) {
        if (y.cancelAll({ reason: "user" }), T) {
          const D = [];
          v.value.forEach((k) => {
            k.status !== o.DONE && D.push(k);
          }), v.value = [], D.forEach((k) => {
            x(k.originalFile, k.name);
          });
          return;
        }
        v.value.splice(0);
      }
    }
    function F() {
      e.modal.close();
    }
    function I() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ae(async () => {
      y = new Wn({
        debug: e.debug,
        restrictions: {
          maxFileSize: rr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: n,
        onBeforeFileAdded(k, R) {
          if (R[k.id] != null) {
            const se = E(k.id);
            v.value[se].status === o.PENDING && (f.value = y.i18n("noDuplicates", { fileName: k.name })), v.value = v.value.filter((ce) => ce.id !== k.id);
          }
          return v.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), y.use(Yn, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, R) {
          let O;
          try {
            O = JSON.parse(k).message;
          } catch {
            O = s("Cannot parse server response.");
          }
          return new Error(O);
        }
      }), y.on("restriction-failed", (k, R) => {
        const O = v.value[E(k.id)];
        U(O), f.value = R.message;
      }), y.on("upload", () => {
        const k = I();
        y.setMeta({ ...k.body });
        const R = y.getPlugin("XHRUpload");
        R.opts.method = k.method, R.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), R.opts.headers = k.headers, delete k.headers["Content-Type"], g.value = !0, v.value.forEach((O) => {
          O.status !== o.DONE && (O.percent = null, O.status = o.UPLOADING, O.statusName = s("Pending upload"));
        });
      }), y.on("upload-progress", (k, R) => {
        const O = Math.floor(R.bytesUploaded / R.bytesTotal * 100);
        v.value[E(k.id)].percent = `${O}%`;
      }), y.on("upload-success", (k) => {
        const R = v.value[E(k.id)];
        R.status = o.DONE, R.statusName = s("Done");
      }), y.on("upload-error", (k, R) => {
        const O = v.value[E(k.id)];
        O.percent = null, O.status = o.ERROR, R.isNetworkError ? O.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : O.statusName = R ? R.message : s("Unknown Error");
      }), y.on("error", (k) => {
        f.value = k.message, g.value = !1, e.emitter.emit("vf-fetch", {
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
        k.preventDefault(), w.value = !0;
      }), m.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), w.value = !1;
      });
      function T(k, R) {
        R.isFile && R.file((O) => k(R, O)), R.isDirectory && R.createReader().readEntries((O) => {
          O.forEach((se) => {
            T(k, se);
          });
        });
      }
      m.value.addEventListener("drop", (k) => {
        k.preventDefault(), w.value = !1;
        const R = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((O) => {
          O.kind === "file" && T((se, ce) => {
            const ae = R.exec(se.fullPath);
            x(ce, ae[1]);
          }, O.webkitGetAsEntry());
        });
      });
      const D = ({ target: k }) => {
        const R = k.files;
        for (const O of R)
          x(O);
        k.value = "";
      };
      d.value.addEventListener("change", D), l.value.addEventListener("change", D);
    }), Vo(() => {
      y == null || y.close({ reason: "unmount" });
    }), (T, D) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          class: ve(["vf-btn vf-btn-primary", g.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: g.value,
          onClick: st(S, ["prevent"])
        }, b(r(s)("Upload")), 11, gi),
        g.value ? (h(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(L, ["prevent"])
        }, b(r(s)("Cancel")), 1)) : (h(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(F, ["prevent"])
        }, b(r(s)("Close")), 1))
      ]),
      default: Z(() => [
        a("div", Xl, [
          Ql,
          a("div", Zl, [
            a("h3", ei, b(r(s)("Upload Files")), 1),
            a("div", ti, [
              a("div", {
                ref_key: "dropArea",
                ref: m,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: C
              }, [
                w.value ? (h(), _("div", si, b(r(s)("Release to drop these files.")), 1)) : (h(), _("div", oi, b(r(s)("Drag and drop the files/folders to here or click here.")), 1))
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
                  onClick: D[0] || (D[0] = (k) => N(!1))
                }, b(r(s)("Clear all")), 9, ni),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: g.value,
                  onClick: D[1] || (D[1] = (k) => N(!0))
                }, b(r(s)("Clear only successful")), 9, ri)
              ], 512),
              a("div", ai, [
                (h(!0), _(ke, null, De(v.value, (k) => (h(), _("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: k.id
                }, [
                  a("span", li, [
                    a("span", {
                      class: ve(["text-base m-auto", $(k)]),
                      textContent: b(B(k))
                    }, null, 10, ii)
                  ]),
                  a("div", ci, [
                    a("div", di, b(r(Us)(k.name, 40)) + " (" + b(k.size) + ")", 1),
                    a("div", ui, b(r(Us)(k.name, 16)) + " (" + b(k.size) + ")", 1),
                    a("div", {
                      class: ve(["flex break-all text-left", $(k)])
                    }, [
                      ne(b(k.statusName) + " ", 1),
                      k.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (h(), _("b", mi, b(k.percent), 1)) : W("", !0)
                    ], 2)
                  ]),
                  a("button", {
                    type: "button",
                    class: ve(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", g.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: r(s)("Delete"),
                    disabled: g.value,
                    onClick: (R) => U(k)
                  }, hi, 10, fi)
                ]))), 128)),
                v.value.length ? W("", !0) : (h(), _("div", vi, b(r(s)("No files selected!")), 1))
              ]),
              f.value.length ? (h(), ee(Ke, {
                key: 0,
                onHidden: D[2] || (D[2] = (k) => f.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(f.value), 1)
                ]),
                _: 1
              })) : W("", !0)
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
}, _i = { class: "sm:flex sm:items-start" }, yi = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), xi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, wi = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ki = { class: "mt-2" }, $i = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Si = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ci = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ei = [
  Ci
], Ai = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Di = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Mi = [
  Di
], Ti = { class: "ml-1.5" }, Li = { class: "my-1 text-sm text-gray-500" }, Dn = {
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
        a("div", _i, [
          yi,
          a("div", xi, [
            a("h3", wi, b(r(s)("Unarchive")), 1),
            a("div", ki, [
              (h(!0), _(ke, null, De(c.value, (u) => (h(), _("p", $i, [
                u.type === "dir" ? (h(), _("svg", Si, Ei)) : (h(), _("svg", Ai, Mi)),
                a("span", Ti, b(u.basename), 1)
              ]))), 256)),
              a("p", Li, b(r(s)("The archive will be unarchived at")) + " (" + b(r(e).fs.data.dirname) + ")", 1),
              o.value.length ? (h(), ee(Ke, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : W("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Oi = { class: "sm:flex sm:items-start" }, Hi = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Bi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ri = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Vi = { class: "mt-2" }, Ii = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Ni = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Fi = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ui = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Pi = [
  Ui
], zi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ji = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), qi = [
  ji
], Gi = { class: "ml-1.5" }, Ki = ["placeholder"], Mn = {
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
        a("div", Oi, [
          Hi,
          a("div", Bi, [
            a("h3", Ri, b(r(s)("Archive the files")), 1),
            a("div", Vi, [
              a("div", Ii, [
                (h(!0), _(ke, null, De(c.value, (u) => (h(), _("p", Ni, [
                  u.type === "dir" ? (h(), _("svg", Fi, Pi)) : (h(), _("svg", zi, qi)),
                  a("span", Gi, b(u.basename), 1)
                ]))), 256))
              ]),
              ge(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => n.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Ki), [
                [St, n.value]
              ]),
              o.value.length ? (h(), ee(Ke, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => o.value = ""),
                error: ""
              }, {
                default: Z(() => [
                  ne(b(o.value), 1)
                ]),
                _: 1
              })) : W("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Yi = /* @__PURE__ */ a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Ji = [
  Yi
];
function Xi(t, e) {
  return h(), _("svg", Wi, [...Ji]);
}
const Qi = { render: Xi }, Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ec = /* @__PURE__ */ a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), tc = [
  ec
];
function sc(t, e) {
  return h(), _("svg", Zi, [...tc]);
}
const oc = { render: sc }, nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, rc = /* @__PURE__ */ a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), ac = [
  rc
];
function lc(t, e) {
  return h(), _("svg", nc, [...ac]);
}
const ic = { render: lc }, cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, dc = /* @__PURE__ */ a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), uc = [
  dc
];
function mc(t, e) {
  return h(), _("svg", cc, [...uc]);
}
const fc = { render: mc }, pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, hc = /* @__PURE__ */ a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), vc = [
  hc
];
function gc(t, e) {
  return h(), _("svg", pc, [...vc]);
}
const bc = { render: gc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, yc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), xc = [
  yc
];
function wc(t, e) {
  return h(), _("svg", _c, [...xc]);
}
const kc = { render: wc }, $c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Sc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Cc = [
  Sc
];
function Ec(t, e) {
  return h(), _("svg", $c, [...Cc]);
}
const Ac = { render: Ec }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Mc = /* @__PURE__ */ a("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), Tc = /* @__PURE__ */ a("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), Lc = [
  Mc,
  Tc
];
function Oc(t, e) {
  return h(), _("svg", Dc, [...Lc]);
}
const Tn = { render: Oc }, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Bc = /* @__PURE__ */ a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), Rc = [
  Bc
];
function Vc(t, e) {
  return h(), _("svg", Hc, [...Rc]);
}
const Ic = { render: Vc }, Nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Fc = /* @__PURE__ */ a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), Uc = [
  Fc
];
function Pc(t, e) {
  return h(), _("svg", Nc, [...Uc]);
}
const zc = { render: Pc }, jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, qc = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), Gc = [
  qc
];
function Kc(t, e) {
  return h(), _("svg", jc, [...Gc]);
}
const Wc = { render: Kc }, Yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Jc = /* @__PURE__ */ a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), Xc = [
  Jc
];
function Qc(t, e) {
  return h(), _("svg", Yc, [...Xc]);
}
const Zc = { render: Qc }, ed = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, td = {
  key: 0,
  class: "flex text-center"
}, sd = ["aria-label"], od = ["aria-label"], nd = ["aria-label"], rd = ["aria-label"], ad = ["aria-label"], ld = ["aria-label"], id = ["aria-label"], cd = {
  key: 1,
  class: "flex text-center"
}, dd = { class: "pl-2" }, ud = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, md = { class: "flex text-center items-center justify-end" }, fd = ["aria-label"], pd = ["aria-label"], hd = {
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
    return (l, u) => (h(), _("div", ed, [
      c.value.length ? (h(), _("div", cd, [
        a("div", dd, [
          ne(b(r(n)("Search results for")) + " ", 1),
          a("span", ud, b(c.value), 1)
        ]),
        r(e).fs.loading ? (h(), ee(r(Tn), { key: 0 })) : W("", !0)
      ])) : (h(), _("div", td, [
        r(e).features.includes(r(he).NEW_FOLDER) ? (h(), _("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": r(n)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: u[0] || (u[0] = (p) => r(e).modal.open(An, { items: r(o).getSelected() }))
        }, [
          te(r(Qi))
        ], 8, sd)) : W("", !0),
        r(e).features.includes(r(he).NEW_FILE) ? (h(), _("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": r(n)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[1] || (u[1] = (p) => r(e).modal.open(Jl, { items: r(o).getSelected() }))
        }, [
          te(r(oc))
        ], 8, od)) : W("", !0),
        r(e).features.includes(r(he).RENAME) ? (h(), _("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": r(n)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[2] || (u[2] = (p) => r(o).getCount() !== 1 || r(e).modal.open(ro, { items: r(o).getSelected() }))
        }, [
          te(r(ic), {
            class: ve(r(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, nd)) : W("", !0),
        r(e).features.includes(r(he).DELETE) ? (h(), _("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": r(n)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[3] || (u[3] = (p) => !r(o).getCount() || r(e).modal.open(no, { items: r(o).getSelected() }))
        }, [
          te(r(fc), {
            class: ve(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, rd)) : W("", !0),
        r(e).features.includes(r(he).UPLOAD) ? (h(), _("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": r(n)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[4] || (u[4] = (p) => r(e).modal.open(bi, { items: r(o).getSelected() }))
        }, [
          te(r(bc))
        ], 8, ad)) : W("", !0),
        r(e).features.includes(r(he).UNARCHIVE) && r(o).getCount() === 1 && r(o).getSelected()[0].mime_type === "application/zip" ? (h(), _("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": r(n)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[5] || (u[5] = (p) => !r(o).getCount() || r(e).modal.open(Dn, { items: r(o).getSelected() }))
        }, [
          te(r(Ac), {
            class: ve(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ld)) : W("", !0),
        r(e).features.includes(r(he).ARCHIVE) ? (h(), _("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": r(n)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[6] || (u[6] = (p) => !r(o).getCount() || r(e).modal.open(Mn, { items: r(o).getSelected() }))
        }, [
          te(r(kc), {
            class: ve(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, id)) : W("", !0)
      ])),
      a("div", md, [
        r(e).features.includes(r(he).FULL_SCREEN) ? (h(), _("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          "aria-label": r(n)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip"
        }, [
          r(e).fullScreen ? (h(), ee(r(zc), { key: 0 })) : (h(), ee(r(Ic), { key: 1 }))
        ], 8, fd)) : W("", !0),
        a("div", {
          class: "mx-1.5",
          "aria-label": r(n)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u[7] || (u[7] = (p) => c.value.length || d())
        }, [
          r(e).view === "grid" ? (h(), ee(r(Wc), {
            key: 0,
            class: ve(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : W("", !0),
          r(e).view === "list" ? (h(), ee(r(Zc), {
            key: 1,
            class: ve(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : W("", !0)
        ], 8, pd)
      ])
    ]));
  }
}, vd = (t, e = 0, s = !1) => {
  let n;
  return (...o) => {
    s && !n && t(...o), clearTimeout(n), n = setTimeout(() => {
      t(...o);
    }, e);
  };
}, Oo = (t, e, s) => {
  const n = M(t);
  return Un((o, c) => ({
    get() {
      return o(), n.value;
    },
    set: vd(
      (i) => {
        n.value = i, c();
      },
      e,
      s
    )
  }));
}, gd = { class: "sm:flex sm:items-start" }, bd = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), _d = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, yd = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, xd = { class: "text-sm text-gray-500 pb-1" }, wd = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, kd = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, $d = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Cd = [
  Sd
], Ed = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ad = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Dd = [
  Ad
], Md = { class: "ml-1.5" }, Td = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, Ld = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, Od = /* @__PURE__ */ a("svg", {
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
], -1), Hd = { class: "ml-1.5 overflow-auto" }, Bd = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, Ps = {
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
        a("div", Bd, b(r(s)("%s item(s) selected.", n.value.length)), 1)
      ]),
      default: Z(() => [
        a("div", gd, [
          bd,
          a("div", _d, [
            a("h3", yd, b(r(s)("Move files")), 1),
            a("p", xd, b(r(s)("Are you sure you want to move these files?")), 1),
            a("div", wd, [
              (h(!0), _(ke, null, De(n.value, (l) => (h(), _("div", kd, [
                a("div", null, [
                  l.type === "dir" ? (h(), _("svg", $d, Cd)) : (h(), _("svg", Ed, Dd))
                ]),
                a("div", Md, b(l.path), 1)
              ]))), 256))
            ]),
            a("h4", Td, b(r(s)("Target Directory")), 1),
            a("p", Ld, [
              Od,
              a("span", Hd, b(r(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (h(), ee(Ke, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => o.value = ""),
              error: ""
            }, {
              default: Z(() => [
                ne(b(o.value), 1)
              ]),
              _: 1
            })) : W("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, Vd = /* @__PURE__ */ a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), Id = [
  Vd
];
function Nd(t, e) {
  return h(), _("svg", Rd, [...Id]);
}
const Fd = { render: Nd }, Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, Pd = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), zd = [
  Pd
];
function jd(t, e) {
  return h(), _("svg", Ud, [...zd]);
}
const qd = { render: jd }, Gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, Kd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Wd = [
  Kd
];
function Yd(t, e) {
  return h(), _("svg", Gd, [...Wd]);
}
const Jd = { render: Yd }, Xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, Qd = /* @__PURE__ */ a("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Zd = [
  Qd
];
function eu(t, e) {
  return h(), _("svg", Xd, [...Zd]);
}
const tu = { render: eu }, su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, ou = /* @__PURE__ */ a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), nu = [
  ou
];
function ru(t, e) {
  return h(), _("svg", su, [...nu]);
}
const au = { render: ru }, lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, iu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), cu = [
  iu
];
function du(t, e) {
  return h(), _("svg", lu, [...cu]);
}
const uu = { render: du }, mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, fu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), pu = [
  fu
];
function hu(t, e) {
  return h(), _("svg", mu, [...pu]);
}
const Ln = { render: hu }, vu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, gu = /* @__PURE__ */ a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), bu = [
  gu
];
function _u(t, e) {
  return h(), _("svg", vu, [...bu]);
}
const yu = { render: _u }, xu = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, wu = ["aria-label"], ku = ["aria-label"], $u = ["aria-label"], Su = { class: "flex leading-6" }, Cu = {
  key: 0,
  class: "flex"
}, Eu = /* @__PURE__ */ a("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Au = { class: "relative" }, Du = /* @__PURE__ */ a("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Mu = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Tu = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, Lu = ["placeholder"], Ou = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, Hu = ["onDrop", "onClick"], Bu = { class: "flex pointer-events-none" }, Ru = { class: "inline-block w-full text-ellipsis overflow-hidden" }, Vu = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = e.dragSelect, o = M(null), c = Oo(0, 100);
    bt(c, (C) => {
      const S = o.value.children;
      let L = 0, U = 0, N = 5, F = 1;
      e.fs.limitBreadcrumbItems(N), dt(() => {
        for (let I = S.length - 1; I >= 0 && !(L + S[I].offsetWidth > c.value - 40); I--)
          L += parseInt(S[I].offsetWidth, 10), U++;
        U < F && (U = F), U > N && (U = N), e.fs.limitBreadcrumbItems(U);
      });
    });
    const i = () => {
      c.value = o.value.offsetWidth;
    };
    Ae(() => {
      new ResizeObserver(i).observe(o.value);
    });
    const d = (C, S = null) => {
      C.preventDefault(), n.isDraggingRef.value = !1, p(C), S ?? (S = e.fs.hiddenBreadcrumbs.length - 1);
      let L = JSON.parse(C.dataTransfer.getData("items"));
      if (L.find((U) => U.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Ps, {
        items: {
          from: L,
          to: e.fs.hiddenBreadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, l = (C, S = null) => {
      C.preventDefault(), n.isDraggingRef.value = !1, p(C), S ?? (S = e.fs.breadcrumbs.length - 2);
      let L = JSON.parse(C.dataTransfer.getData("items"));
      if (L.find((U) => U.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Ps, {
        items: {
          from: L,
          to: e.fs.breadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (C) => {
      C.preventDefault(), e.fs.isGoUpAvailable() ? (C.dataTransfer.dropEffect = "copy", C.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none");
    }, p = (C) => {
      C.preventDefault(), C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      $(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, v = () => {
      $(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, f = (C) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: C.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, g = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = {
      mounted(C, S, L, U) {
        C.clickOutsideEvent = function(N) {
          C === N.target || C.contains(N.target) || S.value();
        }, document.body.addEventListener("click", C.clickOutsideEvent);
      },
      beforeUnmount(C, S, L, U) {
        document.body.removeEventListener("click", C.clickOutsideEvent);
      }
    }, y = M(null), E = () => {
      e.features.includes(he.SEARCH) && (e.fs.searchMode = !0, dt(() => y.value.focus()));
    }, x = Oo("", 400);
    bt(x, (C) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: C });
    }), bt(() => e.fs.searchMode, (C) => {
      C && dt(() => y.value.focus());
    });
    const $ = () => {
      e.fs.searchMode = !1, x.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      $();
    });
    const B = () => {
      x.value === "" && $();
    };
    return (C, S) => (h(), _("div", xu, [
      a("span", {
        "aria-label": r(s)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        te(r(qd), {
          onDragover: S[0] || (S[0] = (L) => u(L)),
          onDragleave: S[1] || (S[1] = (L) => p(L)),
          onDrop: S[2] || (S[2] = (L) => l(L)),
          onClick: v,
          class: ve(r(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, wu),
      r(e).fs.loading ? (h(), _("span", {
        key: 1,
        "aria-label": r(s)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        te(r(Jd), {
          onClick: S[3] || (S[3] = (L) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, $u)) : (h(), _("span", {
        key: 0,
        "aria-label": r(s)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        te(r(Fd), { onClick: m })
      ], 8, ku)),
      ge(a("div", {
        onClick: st(E, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        a("div", null, [
          te(r(tu), {
            onDragover: S[4] || (S[4] = (L) => u(L)),
            onDragleave: S[5] || (S[5] = (L) => p(L)),
            onDrop: S[6] || (S[6] = (L) => l(L, -1)),
            onClick: S[7] || (S[7] = (L) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter } }))
          })
        ]),
        a("div", Su, [
          r(e).fs.hiddenBreadcrumbs.length ? ge((h(), _("div", Cu, [
            Eu,
            a("div", Au, [
              a("span", {
                onDragenter: S[8] || (S[8] = (L) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: S[9] || (S[9] = (L) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                te(r(yu), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [w, g]
          ]) : W("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: o,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: st(E, ["self"])
        }, [
          (h(!0), _(ke, null, De(r(e).fs.breadcrumbs, (L, U) => (h(), _("div", { key: U }, [
            Du,
            a("span", {
              onDragover: (N) => U === r(e).fs.breadcrumbs.length - 1 || u(N),
              onDragleave: (N) => U === r(e).fs.breadcrumbs.length - 1 || p(N),
              onDrop: (N) => U === r(e).fs.breadcrumbs.length - 1 || l(N, U),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: L.basename,
              onClick: (N) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter, path: L.path } })
            }, b(L.name), 41, Mu)
          ]))), 128))
        ], 512),
        r(e).fs.loading ? (h(), ee(r(Tn), { key: 0 })) : W("", !0)
      ], 512), [
        [tt, !r(e).fs.searchMode]
      ]),
      ge(a("div", Tu, [
        a("div", null, [
          te(r(au))
        ]),
        ge(a("input", {
          ref_key: "searchInput",
          ref: y,
          onKeydown: $t($, ["esc"]),
          onBlur: B,
          "onUpdate:modelValue": S[10] || (S[10] = (L) => Ro(x) ? x.value = L : null),
          placeholder: r(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Lu), [
          [St, r(x)]
        ]),
        te(r(uu), { onClick: $ })
      ], 512), [
        [tt, r(e).fs.searchMode]
      ]),
      ge(a("div", Ou, [
        (h(!0), _(ke, null, De(r(e).fs.hiddenBreadcrumbs, (L, U) => (h(), _("div", {
          key: U,
          onDragover: S[11] || (S[11] = (N) => u(N)),
          onDragleave: S[12] || (S[12] = (N) => p(N)),
          onDrop: (N) => d(N, U),
          onClick: (N) => f(L),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          a("div", Bu, [
            a("span", null, [
              te(r(Ln), { class: "h-5 w-5" })
            ]),
            ne(),
            a("span", Ru, b(L.name), 1)
          ])
        ], 40, Hu))), 128))
      ], 512), [
        [tt, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, On = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Iu = ["onClick"], Nu = {
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
      class: ve([n.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      te(Pn, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: Z(() => [
          (h(!0), _(ke, null, De(o.value, (p, m) => (h(), _("div", {
            onClick: (v) => i(m),
            key: p,
            class: ve([c(p.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, b(p.label), 11, Iu))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, Uu = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), Pu = [
  Uu
];
function zu(t, e) {
  return h(), _("svg", Fu, [...Pu]);
}
const ju = { render: zu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, Gu = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), Ku = [
  Gu
];
function Wu(t, e) {
  return h(), _("svg", qu, [...Ku]);
}
const Yu = { render: Wu }, Kt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (h(), _("div", null, [
      t.direction === "asc" ? (h(), ee(r(ju), { key: 0 })) : W("", !0),
      t.direction === "desc" ? (h(), ee(r(Yu), { key: 1 })) : W("", !0)
    ]));
  }
}, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, Xu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), Qu = [
  Xu
];
function Zu(t, e) {
  return h(), _("svg", Ju, [...Qu]);
}
const e0 = { render: Zu }, xs = {
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
      t.type === "dir" ? (h(), ee(r(Ln), {
        key: 0,
        class: ve({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"])) : (h(), ee(r(e0), {
        key: 1,
        class: ve({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, t0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, s0 = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), o0 = [
  s0
];
function n0(t, e) {
  return h(), _("svg", t0, [...o0]);
}
const r0 = { render: n0 }, a0 = { class: "absolute -z-50 -top-96" }, l0 = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, i0 = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, n) => (h(), _("div", a0, [
      te(r(r0)),
      a("div", l0, b(e.count), 1)
    ]));
  }
}, c0 = { class: "flex" }, d0 = ["aria-label"], u0 = { class: "ml-auto mb-2" }, m0 = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, f0 = { key: 1 }, p0 = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = M(""), o = M(""), c = M(null), i = M(!1), d = M(""), l = M(!1), u = ue("ServiceContainer"), { t: p } = u.i18n;
    Ae(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((f) => {
        n.value = f, s("success");
      });
    });
    const m = () => {
      i.value = !i.value, o.value = n.value;
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
      }).then((f) => {
        d.value = p("Updated."), n.value = f, s("success"), i.value = !i.value;
      }).catch((f) => {
        d.value = p(f.message), l.value = !0;
      });
    };
    return (f, g) => (h(), _(ke, null, [
      a("div", c0, [
        a("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(u).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(u).modal.data.item.basename), 9, d0),
        a("div", u0, [
          i.value ? (h(), _("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(r(p)("Save")), 1)) : W("", !0),
          r(u).features.includes(r(he).EDIT) ? (h(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: g[0] || (g[0] = (w) => m())
          }, b(i.value ? r(p)("Cancel") : r(p)("Edit")), 1)) : W("", !0)
        ])
      ]),
      a("div", null, [
        i.value ? (h(), _("div", f0, [
          ge(a("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": g[1] || (g[1] = (w) => o.value = w),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [St, o.value]
          ])
        ])) : (h(), _("pre", m0, b(n.value), 1)),
        d.value.length ? (h(), ee(Ke, {
          key: 2,
          onHidden: g[2] || (g[2] = (w) => d.value = ""),
          error: l.value
        }, {
          default: Z(() => [
            ne(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : W("", !0)
      ])
    ], 64));
  }
}, h0 = { class: "flex" }, v0 = ["aria-label"], g0 = { class: "ml-auto mb-2" }, b0 = { class: "w-full flex justify-center" }, _0 = ["src"], y0 = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = ue("ServiceContainer"), { t: o } = n.i18n, c = M(null), i = M(null), d = M(!1), l = M(""), u = M(!1), p = () => {
      d.value = !d.value, d.value ? i.value = new Xn(c.value, {
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
          const f = new FormData();
          f.set("file", v), n.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: n.modal.data.adapter,
              path: n.modal.data.item.path
            },
            body: f
          }).then((g) => {
            l.value = o("Updated."), c.value.src = n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item), p(), s("success");
          }).catch((g) => {
            l.value = o(g.message), u.value = !0;
          });
        }
      );
    };
    return Ae(() => {
      s("success");
    }), (v, f) => (h(), _(ke, null, [
      a("div", h0, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(n).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(n).modal.data.item.basename), 9, v0),
        a("div", g0, [
          d.value ? (h(), _("button", {
            key: 0,
            onClick: m,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(r(o)("Crop")), 1)) : W("", !0),
          r(n).features.includes(r(he).EDIT) ? (h(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: f[0] || (f[0] = (g) => p())
          }, b(d.value ? r(o)("Cancel") : r(o)("Edit")), 1)) : W("", !0)
        ])
      ]),
      a("div", b0, [
        a("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: r(n).requester.getPreviewUrl(r(n).modal.data.adapter, r(n).modal.data.item),
          alt: ""
        }, null, 8, _0)
      ]),
      l.value.length ? (h(), ee(Ke, {
        key: 0,
        onHidden: f[1] || (f[1] = (g) => l.value = ""),
        error: u.value
      }, {
        default: Z(() => [
          ne(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : W("", !0)
    ], 64));
  }
}, x0 = { class: "flex" }, w0 = ["aria-label"], k0 = /* @__PURE__ */ a("div", null, null, -1), $0 = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ue("ServiceContainer"), n = e;
    return Ae(() => {
      n("success");
    }), (o, c) => (h(), _(ke, null, [
      a("div", x0, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(s).modal.data.item.basename), 9, w0)
      ]),
      k0
    ], 64));
  }
}, S0 = ["aria-label"], C0 = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, E0 = ["src"], A0 = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ue("ServiceContainer"), n = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ae(() => {
      n("success");
    }), (c, i) => (h(), _("div", null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(s).modal.data.item.basename), 9, S0),
      a("div", null, [
        a("video", C0, [
          a("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, E0),
          ne(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, D0 = ["aria-label"], M0 = {
  class: "w-full",
  controls: ""
}, T0 = ["src"], L0 = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = ue("ServiceContainer"), o = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ae(() => {
      s("success");
    }), (c, i) => (h(), _(ke, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(n).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(n).modal.data.item.basename), 9, D0),
      a("div", null, [
        a("audio", M0, [
          a("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, T0),
          ne(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, O0 = ["aria-label"], H0 = ["data"], B0 = ["src"], R0 = /* @__PURE__ */ a("p", null, [
  /* @__PURE__ */ ne(" Your browser does not support PDFs. "),
  /* @__PURE__ */ a("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ ne(" . ")
], -1), V0 = [
  R0
], I0 = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ue("ServiceContainer"), n = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ae(() => {
      n("success");
    }), (c, i) => (h(), _(ke, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(s).modal.data.item.basename), 9, O0),
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
          }, V0, 8, B0)
        ], 8, H0)
      ])
    ], 64));
  }
}, N0 = { class: "sm:flex sm:items-start" }, F0 = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, U0 = { key: 0 }, P0 = { class: "text-gray-700 dark:text-gray-200 text-sm" }, z0 = {
  key: 0,
  class: "flex leading-5"
}, j0 = /* @__PURE__ */ a("svg", {
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
], -1), q0 = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, G0 = { class: "font-bold" }, K0 = { class: "font-bold pl-2" }, W0 = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Y0 = ["download", "href"], Hn = {
  __name: "ModalPreview",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(he.PREVIEW);
    return c || (n.value = !0), (i, d) => (h(), ee(Ge, null, {
      buttons: Z(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Close")), 1),
        r(e).features.includes(r(he).DOWNLOAD) ? (h(), _("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, b(r(s)("Download")), 9, Y0)) : W("", !0)
      ]),
      default: Z(() => [
        a("div", N0, [
          a("div", F0, [
            r(c) ? (h(), _("div", U0, [
              o("text") ? (h(), ee(p0, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => n.value = !0)
              })) : o("image") ? (h(), ee(y0, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => n.value = !0)
              })) : o("video") ? (h(), ee(A0, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => n.value = !0)
              })) : o("audio") ? (h(), ee(L0, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => n.value = !0)
              })) : o("application/pdf") ? (h(), ee(I0, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => n.value = !0)
              })) : (h(), ee($0, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => n.value = !0)
              }))
            ])) : W("", !0),
            a("div", P0, [
              n.value === !1 ? (h(), _("div", z0, [
                j0,
                a("span", null, b(r(s)("Loading")), 1)
              ])) : W("", !0)
            ])
          ])
        ]),
        a("div", q0, [
          a("div", null, [
            a("span", G0, b(r(s)("File Size")) + ": ", 1),
            ne(b(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", K0, b(r(s)("Last Modified")) + ": ", 1),
            ne(" " + b(r(On)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(he).DOWNLOAD) ? (h(), _("div", W0, [
          a("span", null, b(r(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : W("", !0)
      ]),
      _: 1
    }));
  }
}, J0 = ["data-type", "data-item", "data-index"], ws = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ue("ServiceContainer"), s = e.dragSelect, n = t, o = (f) => {
      f.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: f.path } })) : e.modal.open(Hn, { adapter: e.fs.adapter, item: f });
    }, c = {
      mounted(f, g, w, y) {
        w.props.draggable && (f.addEventListener("dragstart", (E) => i(E, g.value)), f.addEventListener("dragover", (E) => l(E, g.value)), f.addEventListener("drop", (E) => d(E, g.value)));
      },
      beforeUnmount(f, g, w, y) {
        w.props.draggable && (f.removeEventListener("dragstart", i), f.removeEventListener("dragover", l), f.removeEventListener("drop", d));
      }
    }, i = (f, g) => {
      if (f.altKey || f.ctrlKey || f.metaKey)
        return f.preventDefault(), !1;
      s.isDraggingRef.value = !0, f.dataTransfer.setDragImage(n.dragImage.$el, 0, 15), f.dataTransfer.effectAllowed = "all", f.dataTransfer.dropEffect = "copy", f.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (f, g) => {
      f.preventDefault(), s.isDraggingRef.value = !1;
      let w = JSON.parse(f.dataTransfer.getData("items"));
      if (w.find((y) => y.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Ps, { items: { from: w, to: g } });
    }, l = (f, g) => {
      f.preventDefault(), !g || g.type !== "dir" || s.getSelection().find((w) => w === f.currentTarget) ? (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : f.dataTransfer.dropEffect = "copy";
    };
    let u = null, p = !1;
    const m = () => {
      u && clearTimeout(u);
    }, v = (f) => {
      if (!p)
        p = !0, setTimeout(() => p = !1, 300);
      else
        return p = !1, o(n.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: f.target.getBoundingClientRect().x,
          clientY: f.target.getBoundingClientRect().y
        });
        f.target.dispatchEvent(g);
      }, 500);
    };
    return (f, g) => ge((h(), _("div", {
      style: js({ opacity: r(s).isDraggingRef.value && r(s).getSelection().find((w) => f.$el === w) ? "0.5 !important" : "" }),
      class: ve(["vf-item-" + r(s).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: g[0] || (g[0] = (w) => o(t.item)),
      onTouchstart: g[1] || (g[1] = (w) => v(w)),
      onTouchend: g[2] || (g[2] = (w) => m()),
      onContextmenu: g[3] || (g[3] = st((w) => r(e).emitter.emit("vf-contextmenu-show", { event: w, items: r(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Tt(f.$slots, "default")
    ], 46, J0)), [
      [c, t.item]
    ]);
  }
}, X0 = { class: "relative flex-auto flex flex-col overflow-hidden" }, Q0 = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, Z0 = { class: "relative" }, em = { class: "grid grid-cols-12 items-center" }, tm = { class: "flex col-span-7 items-center" }, sm = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, om = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, nm = { class: "grid grid-cols-12 items-center" }, rm = { class: "flex col-span-7 items-center" }, am = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, lm = { class: "col-span-2 text-center" }, im = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, cm = { class: "relative" }, dm = ["data-src", "alt"], um = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, mm = { class: "break-all" }, fm = {
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
        onSuccess: (v) => {
          v.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = Ht({ active: !1, column: "", order: "" }), u = (m = !0) => {
      let v = [...e.fs.data.files], f = l.column, g = l.order === "asc" ? 1 : -1;
      if (!m)
        return v;
      const w = (y, E) => typeof y == "string" && typeof E == "string" ? y.toLowerCase().localeCompare(E.toLowerCase()) : y < E ? -1 : y > E ? 1 : 0;
      return l.active && (v = v.slice().sort((y, E) => w(y[f], E[f]) * g)), v;
    }, p = (m) => {
      l.active && l.column === m ? (l.active = l.order === "asc", l.column = m, l.order = "desc") : (l.active = !0, l.column = m, l.order = "asc");
    };
    return Ae(() => {
      d = new Jn(i.area.value);
    }), Bo(() => {
      d.update();
    }), Vo(() => {
      d.destroy();
    }), (m, v) => (h(), _("div", X0, [
      r(e).view === "list" || c.value.length ? (h(), _("div", Q0, [
        a("div", {
          onClick: v[0] || (v[0] = (f) => p("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          ne(b(r(s)("Name")) + " ", 1),
          ge(te(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? W("", !0) : (h(), _("div", {
          key: 0,
          onClick: v[1] || (v[1] = (f) => p("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          ne(b(r(s)("Size")) + " ", 1),
          ge(te(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? W("", !0) : (h(), _("div", {
          key: 1,
          onClick: v[2] || (v[2] = (f) => p("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          ne(b(r(s)("Date")) + " ", 1),
          ge(te(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (h(), _("div", {
          key: 2,
          onClick: v[3] || (v[3] = (f) => p("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          ne(b(r(s)("Filepath")) + " ", 1),
          ge(te(Kt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [tt, l.active && l.column === "path"]
          ])
        ])) : W("", !0)
      ])) : W("", !0),
      a("div", Z0, [
        te(i0, {
          ref_key: "dragImage",
          ref: o,
          count: r(i).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(i).scrollBarContainer,
        class: ve(["vf-explorer-scrollbar-container", [{ "grid-view": r(e).view === "grid" }]])
      }, [
        a("div", {
          ref: r(i).scrollBar,
          class: "w-5 bg-transparent pointer-events-none"
        }, null, 512)
      ], 2),
      a("div", {
        ref: r(i).area,
        class: ve([{ "resize-y": !r(e).fullScreen }, "h-full w-full text-xs vf-explorer-scrollbar vf-selector-area min-h-[150px] z-0 overflow-y-auto"]),
        onContextmenu: v[4] || (v[4] = st((f) => r(e).emitter.emit("vf-contextmenu-show", { event: f, items: r(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (h(!0), _(ke, { key: 0 }, De(u(), (f, g) => (h(), ee(ws, {
          item: f,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: Z(() => [
            a("div", em, [
              a("div", tm, [
                te(xs, {
                  type: f.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", sm, b(f.basename), 1)
              ]),
              a("div", om, b(f.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : W("", !0),
        r(e).view === "list" && !c.value.length ? (h(!0), _(ke, { key: 1 }, De(u(), (f, g) => (h(), ee(ws, {
          item: f,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: f.path
        }, {
          default: Z(() => [
            a("div", nm, [
              a("div", rm, [
                te(xs, {
                  type: f.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", am, b(f.basename), 1)
              ]),
              a("div", lm, b(f.file_size ? r(e).filesize(f.file_size) : ""), 1),
              a("div", im, b(r(On)(f.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : W("", !0),
        r(e).view === "grid" && !c.value.length ? (h(!0), _(ke, { key: 2 }, De(u(!1), (f, g) => (h(), ee(ws, {
          item: f,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Z(() => [
            a("div", null, [
              a("div", cm, [
                (f.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (h(), _("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, f),
                  alt: f.basename,
                  key: f.path
                }, null, 8, dm)) : (h(), ee(xs, {
                  key: 1,
                  type: f.type
                }, null, 8, ["type"])),
                !((f.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && f.type !== "dir" ? (h(), _("div", um, b(n(f.extension)), 1)) : W("", !0)
              ]),
              a("span", mm, b(r(Us)(f.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : W("", !0)
      ], 34),
      te(Nu)
    ]));
  }
}, pm = ["href", "download"], hm = ["onClick"], vm = {
  __name: "ContextMenu",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, n = M(null), o = M([]), c = M(""), i = Ht({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = mt(() => i.items.filter((m) => m.key == null || e.features.includes(m.key)));
    e.emitter.on("vf-context-selected", (m) => {
      o.value = m;
    });
    const l = {
      newfolder: {
        key: he.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(An)
      },
      selectAll: {
        title: () => s("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      delete: {
        key: he.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.modal.open(no, { items: o });
        }
      },
      refresh: {
        title: () => s("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: he.PREVIEW,
        title: () => s("Preview"),
        action: () => e.modal.open(Hn, { adapter: e.fs.adapter, item: o.value[0] })
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
        key: he.DOWNLOAD,
        link: mt(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: he.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(Mn, { items: o })
      },
      unarchive: {
        key: he.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(Dn, { items: o })
      },
      rename: {
        key: he.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(ro, { items: o })
      }
    }, u = (m) => {
      e.emitter.emit("vf-contextmenu-hide"), m.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      c.value = m;
    }), e.emitter.on("vf-contextmenu-show", ({ event: m, items: v, target: f = null }) => {
      if (i.items = [], c.value)
        if (f)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [f]);
        else
          return;
      else
        !f && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((g) => g.path === f.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", v)) : (f.type === "dir" ? i.items.push(l.open) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), f.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [f]));
      p(m);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (m) => {
      const v = e.dragSelect.area.value, f = e.root.getBoundingClientRect(), g = v.getBoundingClientRect();
      let w = m.clientX - f.left, y = m.clientY - f.top;
      i.active = !0, dt(() => {
        var B;
        const E = (B = n.value) == null ? void 0 : B.getBoundingClientRect();
        let x = (E == null ? void 0 : E.height) ?? 0, $ = (E == null ? void 0 : E.width) ?? 0;
        w = g.right - m.pageX + window.scrollX < $ ? w - $ : w, y = g.bottom - m.pageY + window.scrollY < x ? y - x : y, i.positions = {
          left: w + "px",
          top: y + "px"
        };
      });
    };
    return (m, v) => ge((h(), _("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: js(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (h(!0), _(ke, null, De(d.value, (f) => (h(), _("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: f.title
      }, [
        f.link ? (h(), _("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: f.link,
          download: f.link,
          onClick: v[0] || (v[0] = (g) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(f.title()), 1)
        ], 8, pm)) : (h(), _("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (g) => u(f)
        }, [
          a("span", null, b(f.title()), 1)
        ], 8, hm))
      ]))), 128))
    ], 4)), [
      [tt, i.active]
    ]);
  }
}, gm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, bm = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), _m = [
  bm
];
function ym(t, e) {
  return h(), _("svg", gm, [..._m]);
}
const xm = { render: ym }, wm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, km = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), $m = [
  km
];
function Sm(t, e) {
  return h(), _("svg", wm, [...$m]);
}
const Cm = { render: Sm }, Em = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Am = { class: "flex leading-5 items-center" }, Dm = ["aria-label"], Mm = ["value"], Tm = { class: "ml-3" }, Lm = { key: 0 }, Om = { class: "ml-1" }, Hm = { class: "flex leading-5 items-center justify-end" }, Bm = ["disabled"], Rm = ["aria-label"], Vm = {
  __name: "Statusbar",
  setup(t) {
    const e = ue("ServiceContainer"), { t: s } = e.i18n, { setStore: n } = e.storage, o = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), n("adapter", e.fs.adapter);
    }, i = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = mt(() => {
      const l = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (h(), _("div", Em, [
      a("div", Am, [
        a("div", {
          class: "mx-2",
          "aria-label": r(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, [
          te(r(xm))
        ], 8, Dm),
        ge(a("select", {
          "onUpdate:modelValue": u[0] || (u[0] = (p) => r(e).fs.adapter = p),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8",
          tabindex: "-1"
        }, [
          (h(!0), _(ke, null, De(r(e).fs.data.storages, (p) => (h(), _("option", { value: p }, b(p), 9, Mm))), 256))
        ], 544), [
          [ks, r(e).fs.adapter]
        ]),
        a("div", Tm, [
          i.value.length ? (h(), _("span", Lm, b(r(e).fs.data.files.length) + " items found. ", 1)) : W("", !0),
          a("span", Om, b(r(e).dragSelect.getCount() > 0 ? r(s)("%s item(s) selected.", r(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", Hm, [
        r(e).selectButton.active ? (h(), _("button", {
          key: 0,
          class: ve(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (p) => r(e).selectButton.click(r(o).getSelected(), p))
        }, b(r(s)("Select")), 11, Bm)) : W("", !0),
        a("span", {
          class: "mr-1",
          "aria-label": r(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: u[2] || (u[2] = (p) => r(e).modal.open(En))
        }, [
          te(r(Cm))
        ], 8, Rm)
      ])
    ]));
  }
}, Im = {
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
    const s = e, o = ua(t, ue("VueFinderOptions"));
    zn("ServiceContainer", o);
    const { setStore: c } = o.storage, i = M(null);
    o.root = i;
    const d = o.dragSelect;
    Bl(o);
    const l = (p) => {
      Object.assign(o.fs.data, p), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return o.emitter.on("vf-fetch-abort", () => {
      u.abort(), o.fs.loading = !1;
    }), o.emitter.on("vf-fetch", ({ params: p, body: m = null, onSuccess: v = null, onError: f = null, noCloseModal: g = !1 }) => {
      ["index", "search"].includes(p.q) && (u && u.abort(), o.fs.loading = !0), u = new AbortController();
      const w = u.signal;
      o.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: m,
        abortSignal: w
      }).then((y) => {
        o.fs.adapter = y.adapter, o.persist && (o.fs.path = y.dirname, c("path", o.fs.path)), ["index", "search"].includes(p.q) && (o.fs.loading = !1), g || o.modal.close(), l(y), v && v(y);
      }).catch((y) => {
        console.error(y), f && f(y);
      });
    }), Ae(() => {
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
      ref: i,
      tabindex: "0"
    }, [
      a("div", {
        class: ve(r(o).theme.actualValue)
      }, [
        a("div", {
          class: ve([r(o).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: js(r(o).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: m[0] || (m[0] = (v) => r(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (v) => r(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          te(hd),
          te(Vu),
          te(fm),
          te(Vm)
        ], 38),
        te(jn, { name: "fade" }, {
          default: Z(() => [
            r(o).modal.visible ? (h(), ee(qn(r(o).modal.type), { key: 0 })) : W("", !0)
          ]),
          _: 1
        }),
        te(vm)
      ], 2)
    ], 512));
  }
}, Jm = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Im);
  }
};
export {
  Jm as default
};
