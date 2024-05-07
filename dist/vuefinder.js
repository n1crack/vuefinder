var En = Object.defineProperty;
var An = (t, e, s) => e in t ? En(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var Zs = (t, e, s) => (An(t, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as Ht, watch as Mt, ref as O, shallowRef as Dn, onMounted as Ee, onUnmounted as $o, onUpdated as So, nextTick as Lt, computed as at, inject as le, openBlock as h, createElementBlock as _, withKeys as St, unref as r, createElementVNode as a, withModifiers as Ze, renderSlot as Tt, normalizeClass as be, createCommentVNode as W, createBlock as J, withCtx as K, toDisplayString as b, withDirectives as he, vModelText as Ct, createTextVNode as se, Fragment as ke, renderList as Ce, onBeforeUnmount as Co, createVNode as Q, customRef as Mn, vShow as Xe, isRef as Eo, TransitionGroup as Ln, normalizeStyle as zs, vModelCheckbox as Ft, vModelSelect as $s, provide as Tn, Transition as On, resolveDynamicComponent as Vn } from "vue";
import Hn from "mitt";
import Bn from "dragselect";
import Rn from "@uppy/core";
import In from "@uppy/xhr-upload";
import Nn from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Un from "cropperjs";
import "microtip/microtip.css";
var ko;
const hs = (ko = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : ko.getAttribute("content");
class zn {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    Zs(this, "config");
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
    hs != null && hs !== "" && (n[s.xsrfHeaderName] = hs);
    const o = Object.assign({}, s.headers, n, e.headers), c = Object.assign({}, s.params, e.params), i = e.body, d = s.baseUrl + e.url, l = e.method;
    let m;
    l !== "get" && (i instanceof FormData ? (m = i, s.body != null && Object.entries(this.config.body).forEach(([v, u]) => {
      m.append(v, u);
    })) : (m = { ...i }, s.body != null && Object.assign(m, this.config.body)));
    const f = {
      url: d,
      method: l,
      headers: o,
      params: c,
      body: m
    };
    if (s.transformRequest != null) {
      const v = s.transformRequest({
        url: d,
        method: l,
        headers: o,
        params: c,
        body: m
      });
      v.url != null && (f.url = v.url), v.method != null && (f.method = v.method), v.params != null && (f.params = v.params ?? {}), v.headers != null && (f.headers = v.headers ?? {}), v.body != null && (f.body = v.body);
    }
    return f;
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
function Fn(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new zn(e);
}
function Pn(t) {
  let e = localStorage.getItem(t + "_storage");
  const s = Ht(JSON.parse(e ?? "{}"));
  Mt(s, n);
  function n() {
    Object.keys(s).length ? localStorage.setItem(t + "_storage", JSON.stringify(s)) : localStorage.removeItem(t + "_storage");
  }
  function o(l, m) {
    s[l] = m;
  }
  function c(l) {
    delete s[l];
  }
  function i() {
    Object.keys(s).map((l) => c(l));
  }
  return { getStore: (l, m = null) => s.hasOwnProperty(l) ? s[l] : m, setStore: o, removeStore: c, clearStore: i };
}
async function jn(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function qn(t, e, s, n) {
  const { getStore: o, setStore: c } = t, i = O({}), d = O(o("locale", e)), l = (v, u = e) => {
    jn(v, n).then((p) => {
      i.value = p, c("locale", v), d.value = v, c("translations", p), Object.values(n).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + v }), s.emit("vf-language-saved"));
    }).catch((p) => {
      u ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(u, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !o("locale") && !n.length ? l(e) : i.value = o("translations");
  const m = (v, ...u) => u.length ? m(v = v.replace("%s", u.shift()), ...u) : v;
  function f(v, ...u) {
    return i.value && i.value.hasOwnProperty(v) ? m(i.value[v], ...u) : m(v, ...u);
  }
  return { t: f, changeLocale: l, locale: d };
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
}, Gn = Object.values(ve), Wn = "2.4.0";
function Ao(t, e, s, n, o) {
  return (e = Math, s = e.log, n = 1024, o = s(t) / s(n) | 0, t / e.pow(n, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function Do(t, e, s, n, o) {
  return (e = Math, s = e.log, n = 1e3, o = s(t) / s(n) | 0, t / e.pow(n, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function Yn(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return n[1] * Math.pow(1024, e[n[2].toLowerCase()]);
}
const Je = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Kn(t, e) {
  const s = O(Je.SYSTEM), n = O(Je.LIGHT);
  s.value = t.getStore("theme", e ?? Je.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    s.value === Je.DARK || s.value === Je.SYSTEM && i.matches ? n.value = Je.DARK : n.value = Je.LIGHT;
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
      s.value = i, i !== Je.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(o);
    }
  };
}
function Jn() {
  const t = Dn(null), e = O(!1), s = O();
  return { visible: e, type: t, data: s, open: (c, i = null) => {
    e.value = !0, t.value = c, s.value = i;
  }, close: () => {
    e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.7.3
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Ie = (t, e) => {
  const { o: s, u: n, _: o } = t;
  let c = s, i;
  const d = (f, v) => {
    const u = c, p = f, x = v || (n ? !n(u, p) : u !== p);
    return (x || o) && (c = p, i = u), [c, x, i];
  };
  return [e ? (f) => d(e(c, i), f) : d, (f) => [c, !!f, i]];
}, Mo = typeof window < "u" && typeof document < "u", Me = Mo ? window : {}, Gt = Math.max, Xn = Math.min, Ss = Math.round, Lo = Me.cancelAnimationFrame, To = Me.requestAnimationFrame, Kt = Me.setTimeout, Cs = Me.clearTimeout, os = (t) => typeof Me[t] < "u" ? Me[t] : void 0, Qn = os("MutationObserver"), eo = os("IntersectionObserver"), Jt = os("ResizeObserver"), Es = os("ScrollTimeline"), Oo = Mo && Node.ELEMENT_NODE, { toString: Zn, hasOwnProperty: gs } = Object.prototype, er = /^\[object (.+)\]$/, Bt = (t) => t === void 0, ns = (t) => t === null, tr = (t) => Bt(t) || ns(t) ? `${t}` : Zn.call(t).replace(er, "$1").toLowerCase(), Pe = (t) => typeof t == "number", rs = (t) => typeof t == "string", Vo = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Ot = (t) => typeof t == "object" && !Ue(t) && !ns(t), as = (t) => {
  const e = !!t && t.length, s = Pe(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !je(t) && s ? e > 0 && Ot(t) ? e - 1 in t : !0 : !1;
}, Xt = (t) => {
  if (!t || !Ot(t) || tr(t) !== "object")
    return !1;
  let e;
  const s = "constructor", n = t[s], o = n && n.prototype, c = gs.call(t, s), i = o && gs.call(o, "isPrototypeOf");
  if (n && !c && !i)
    return !1;
  for (e in t)
    ;
  return Bt(e) || gs.call(t, e);
}, Qt = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Oo : !1;
}, ls = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Oo : !1;
};
function ne(t, e) {
  if (as(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else
    t && ne(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const is = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), me = (t, e, s) => (!rs(e) && as(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ct = (t) => Array.from(t || []), Ho = (t) => Ue(t) ? t : [t], As = (t) => !!t && !t.length, to = (t) => ct(new Set(t)), Ve = (t, e, s) => {
  ne(t, (o) => o && o.apply(void 0, e || [])), !s && (t.length = 0);
}, Bo = "paddingTop", Ro = "paddingRight", Io = "paddingLeft", No = "paddingBottom", Uo = "marginLeft", zo = "marginRight", Fo = "marginBottom", cs = "overflowX", ds = "overflowY", _t = "width", xt = "height", wt = "hidden", Po = "visible", Fs = (t, e, s, n) => {
  if (t && e) {
    let o = !0;
    return ne(s, (c) => {
      const i = t[c], d = e[c];
      i !== d && (o = !1);
    }), o;
  }
  return !1;
}, jo = (t, e) => Fs(t, e, ["w", "h"]), qo = (t, e) => Fs(t, e, ["x", "y"]), sr = (t, e) => Fs(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, Y = (t, ...e) => t.bind(0, ...e), pt = (t) => {
  let e;
  const s = t ? Kt : To, n = t ? Cs : Lo;
  return [(o) => {
    n(e), e = s(o, je(t) ? t() : t);
  }, () => n(e)];
}, Go = (t, e) => {
  let s, n, o, c = Ne;
  const { v: i, p: d, S: l } = e || {}, m = function(x) {
    c(), Cs(s), s = n = void 0, c = Ne, t.apply(this, x);
  }, f = (p) => l && n ? l(n, p) : p, v = () => {
    c !== Ne && m(f(o) || o);
  }, u = function() {
    const x = ct(arguments), S = je(i) ? i() : i;
    if (Pe(S) && S >= 0) {
      const A = je(d) ? d() : d, w = Pe(A) && A >= 0, g = S > 0 ? Kt : To, B = S > 0 ? Cs : Lo, $ = f(x) || x, T = m.bind(0, $);
      c();
      const I = g(T, S);
      c = () => B(I), w && !s && (s = Kt(v, A)), n = o = $;
    } else
      m(x);
  };
  return u.m = v, u;
}, Wo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], oe = (t, e, s, n, o, c, i) => {
  const d = [e, s, n, o, c, i];
  return (typeof t != "object" || ns(t)) && !je(t) && (t = {}), ne(d, (l) => {
    ne(l, (m, f) => {
      const v = l[f];
      if (t === v)
        return !0;
      const u = Ue(v);
      if (v && Xt(v)) {
        const p = t[f];
        let x = p;
        u && !Ue(p) ? x = [] : !u && !Xt(p) && (x = {}), t[f] = oe(x, v);
      } else
        t[f] = u ? v.slice() : v;
    });
  }), t;
}, Yo = (t, e) => ne(oe({}, t), (s, n, o) => {
  s === void 0 ? delete o[n] : s && Xt(s) && (o[n] = Yo(s));
}), Ps = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ds = (t, e, s) => Gt(t, Xn(e, s)), rt = (t) => ct(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), us = (t, e) => t && t.getAttribute(e), so = (t, e) => t && t.hasAttribute(e), Re = (t, e, s) => {
  ne(rt(e), (n) => {
    t && t.setAttribute(n, s || "");
  });
}, Fe = (t, e) => {
  ne(rt(e), (s) => t && t.removeAttribute(s));
}, ms = (t, e) => {
  const s = rt(us(t, e)), n = Y(Re, t, e), o = (c, i) => {
    const d = new Set(s);
    return ne(rt(c), (l) => d[i](l)), ct(d).join(" ");
  };
  return {
    $: (c) => n(o(c, "delete")),
    O: (c) => n(o(c, "add")),
    C: (c) => {
      const i = rt(c);
      return i.reduce((d, l) => d && s.includes(l), i.length > 0);
    }
  };
}, Ko = (t, e, s) => {
  ms(t, e).$(s);
}, Vt = (t, e, s) => (ms(t, e).O(s), Y(Ko, t, e, s)), Wt = (t, e, s, n) => {
  (n ? Vt : Ko)(t, e, s);
}, or = (t, e, s) => ms(t, e).C(s), Jo = (t) => ms(t, "class"), js = (t, e) => {
  Jo(t).$(e);
}, Zt = (t, e) => (Jo(t).O(e), Y(js, t, e)), Xo = (t, e) => {
  const s = [], n = e ? ls(e) && e : document;
  return n ? me(s, n.querySelectorAll(t)) : s;
}, nr = (t, e) => {
  const s = e ? ls(e) && e : document;
  return s ? s.querySelector(t) : null;
}, es = (t, e) => ls(t) ? t.matches(e) : !1, Qo = (t) => es(t, "body"), Ms = (t) => t ? ct(t.childNodes) : [], yt = (t) => t && t.parentElement, vt = (t, e) => ls(t) && t.closest(e), Ls = (t) => document.activeElement, rr = (t, e, s) => {
  const n = vt(t, e), o = t && nr(s, n), c = vt(o, e) === n;
  return n && o ? n === t || o === t || c && vt(vt(t, s), e) !== n : !1;
}, tt = (t) => {
  if (as(t))
    ne(ct(t), (e) => tt(e));
  else if (t) {
    const e = yt(t);
    e && e.removeChild(t);
  }
}, Zo = (t, e, s) => {
  if (s && t) {
    let n = e, o;
    return as(s) ? (o = document.createDocumentFragment(), ne(s, (c) => {
      c === n && (n = c.previousSibling), o.appendChild(c);
    })) : o = s, e && (n ? n !== e && (n = n.nextSibling) : n = t.firstChild), t.insertBefore(o, n || null), () => tt(s);
  }
  return Ne;
}, De = (t, e) => Zo(t, null, e), oo = (t, e) => Zo(yt(t), t && t.nextSibling, e), ht = (t) => {
  const e = document.createElement("div");
  return Re(e, "class", t), e;
}, en = (t) => {
  const e = ht();
  return e.innerHTML = t.trim(), ne(Ms(e), (s) => tt(s));
}, ar = /^--/, no = (t, e) => t.getPropertyValue(e) || t[e] || "", qs = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Pt = (t) => qs(parseFloat(t || "")), ro = (t) => `${(qs(t) * 100).toFixed(3)}%`, Ts = (t) => `${qs(t)}px`;
function kt(t, e) {
  t && ne(e, (s, n) => {
    try {
      const o = t.style, c = Pe(s) ? Ts(s) : (s || "") + "";
      ar.test(n) ? o.setProperty(n, c) : o[n] = c;
    } catch {
    }
  });
}
function lt(t, e, s) {
  const n = rs(e);
  let o = n ? "" : {};
  if (t) {
    const c = Me.getComputedStyle(t, s) || t.style;
    o = n ? no(c, e) : e.reduce((i, d) => (i[d] = no(c, d), i), o);
  }
  return o;
}
const Qe = (t) => lt(t, "direction") === "rtl", ao = (t, e, s) => {
  const n = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${n}top${o}`, i = `${n}right${o}`, d = `${n}bottom${o}`, l = `${n}left${o}`, m = lt(t, [c, i, d, l]);
  return {
    t: Pt(m[c]),
    r: Pt(m[i]),
    b: Pt(m[d]),
    l: Pt(m[l])
  };
}, bs = (t, e) => `translate${Ot(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, lr = {
  w: 0,
  h: 0
}, fs = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : lr, ir = (t) => fs("inner", t || Me), Dt = Y(fs, "offset"), tn = Y(fs, "client"), Os = Y(fs, "scroll"), Gs = (t) => {
  const e = parseFloat(lt(t, _t)) || 0, s = parseFloat(lt(t, xt)) || 0;
  return {
    w: e - Ss(e),
    h: s - Ss(s)
  };
}, gt = (t) => t.getBoundingClientRect(), Vs = (t) => !!(t && (t[xt] || t[_t])), sn = (t, e) => {
  const s = Vs(t);
  return !Vs(e) && s;
}, lo = (t, e, s, n) => {
  ne(rt(e), (o) => {
    t.removeEventListener(o, s, n);
  });
}, ue = (t, e, s, n) => {
  var o;
  const c = (o = n && n.H) != null ? o : !0, i = n && n.I || !1, d = n && n.A || !1, l = {
    passive: c,
    capture: i
  };
  return Y(Ve, rt(e).map((m) => {
    const f = d ? (v) => {
      lo(t, m, f, i), s(v);
    } : s;
    return t.addEventListener(m, f, l), Y(lo, t, m, f, i);
  }));
}, Ws = (t) => t.stopPropagation(), io = (t) => t.preventDefault(), cr = {
  x: 0,
  y: 0
}, _s = (t) => {
  const e = t && gt(t);
  return e ? {
    x: e.left + Me.scrollX,
    y: e.top + Me.scrollY
  } : cr;
}, ts = (t, e, s) => s ? s.n ? -t + 0 : s.i ? e - t : t : t, co = (t, e) => [ts(0, t, e), ts(t, t, e)], uo = (t, e, s) => Ds(0, 1, ts(t, e, s) / e || 0), st = (t, e) => {
  const { x: s, y: n } = Pe(e) ? {
    x: e,
    y: e
  } : e || {};
  Pe(s) && (t.scrollLeft = s), Pe(n) && (t.scrollTop = n);
}, $t = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), mo = (t, e) => {
  ne(Ho(e), t);
}, Hs = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (c, i) => {
    if (c) {
      const d = e.get(c);
      mo((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, n = (c, i) => {
    if (rs(c)) {
      const m = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, m), mo((f) => {
        je(f) && m.add(f);
      }, i), Y(s, c, i);
    }
    Vo(i) && i && s();
    const d = et(c), l = [];
    return ne(d, (m) => {
      const f = c[m];
      f && me(l, n(m, f));
    }), Y(Ve, l);
  }, o = (c, i) => {
    ne(ct(e.get(c)), (d) => {
      i && !As(i) ? d.apply(0, i) : d();
    });
  };
  return n(t || {}), [n, s, o];
}, fo = (t) => JSON.stringify(t, (e, s) => {
  if (je(s))
    throw 0;
  return s;
}), po = (t, e) => t ? `${e}`.split(".").reduce((s, n) => s && Wo(s, n) ? s[n] : void 0, t) : void 0, dr = {
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
}, on = (t, e) => {
  const s = {}, n = Ye(et(e), et(t));
  return ne(n, (o) => {
    const c = t[o], i = e[o];
    if (Ot(c) && Ot(i))
      oe(s[o] = {}, on(c, i)), Ps(s[o]) && delete s[o];
    else if (Wo(e, o) && i !== c) {
      let d = !0;
      if (Ue(c) || Ue(i))
        try {
          fo(c) === fo(i) && (d = !1);
        } catch {
        }
      d && (s[o] = i);
    }
  }), s;
}, vo = (t, e, s) => (n) => [po(t, n), s || po(e, n) !== void 0], Rt = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, xs = `${Rt}-initialize`, Ae = Rt, nn = `${Ae}-overflow-x`, rn = `${Ae}-overflow-y`, an = "overflowVisible", ur = "scrollbarPressed", Bs = "updating", mr = "body", We = `${Rt}-viewport`, fr = "arrange", ln = "scrollbarHidden", bt = an, Rs = `${Rt}-padding`, pr = bt, ho = `${Rt}-content`, Ys = "os-size-observer", vr = `${Ys}-appear`, hr = `${Ys}-listener`, gr = "os-trinsic-observer", br = "os-theme-none", Le = "os-scrollbar", _r = `${Le}-rtl`, xr = `${Le}-horizontal`, wr = `${Le}-vertical`, cn = `${Le}-track`, Ks = `${Le}-handle`, yr = `${Le}-visible`, kr = `${Le}-cornerless`, go = `${Le}-interaction`, bo = `${Le}-unusable`, Is = `${Le}-auto-hide`, _o = `${Is}-hidden`, xo = `${Le}-wheel`, $r = `${cn}-interactive`, Sr = `${Ks}-interactive`, dn = {}, un = {}, Cr = (t) => {
  ne(t, (e) => ne(e, (s, n) => {
    dn[n] = e[n];
  }));
}, mn = (t, e, s) => et(t).map((n) => {
  const { static: o, instance: c } = t[n], [i, d, l] = s || [], m = s ? c : o;
  if (m) {
    const f = s ? m(i, d, e) : m(e);
    return (l || un)[n] = f;
  }
}), Et = (t) => un[t], Er = "__osOptionsValidationPlugin", Ar = "__osSizeObserverPlugin", Dr = (t, e) => {
  const { T: s } = e, [n, o] = t("showNativeOverlaidScrollbars");
  return [n && s.x && s.y, o];
}, ss = (t) => t.indexOf(Po) === 0, fn = (t, e) => {
  const { D: s } = t, n = (l) => {
    const m = lt(s, l), v = (e ? e[l] : m) === "scroll";
    return [m, v];
  }, [o, c] = n(cs), [i, d] = n(ds);
  return {
    k: {
      x: o,
      y: i
    },
    R: {
      x: c,
      y: d
    }
  };
}, Mr = (t, e, s, n) => {
  const o = e.x || e.y, c = (f, v) => {
    const u = ss(f), p = u && o ? "hidden" : "", x = v && u && f.replace(`${Po}-`, "") || p;
    return [v && !u ? f : "", ss(x) ? "hidden" : x];
  }, [i, d] = c(s.x, e.x), [l, m] = c(s.y, e.y);
  return n[cs] = d && l ? d : i, n[ds] = m && i ? m : l, fn(t, n);
}, Js = "__osScrollbarsHidingPlugin", Lr = "__osClickScrollPlugin";
let ws;
const Tr = () => {
  const t = (g, B, M) => {
    De(document.body, g), De(document.body, g);
    const $ = tn(g), T = Dt(g), I = Gs(B);
    return M && tt(g), {
      x: T.h - $.h + I.h,
      y: T.w - $.w + I.w
    };
  }, e = (g) => {
    let B = !1;
    const M = Zt(g, jt);
    try {
      B = lt(g, "scrollbar-width") === "none" || lt(g, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return M(), B;
  }, s = (g, B) => {
    kt(g, {
      [cs]: wt,
      [ds]: wt,
      direction: "rtl"
    }), st(g, {
      x: 0
    });
    const M = _s(g), $ = _s(B);
    st(g, {
      x: -999
    });
    const T = _s(B);
    return {
      i: M.x === $.x,
      n: $.x !== T.x
    };
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, c = en(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], i = c.firstChild, [d, , l] = Hs(), [m, f] = Ie({
    o: t(c, i),
    u: qo
  }, Y(t, c, i, !0)), [v] = f(), u = e(c), p = {
    x: v.x === 0,
    y: v.y === 0
  }, x = {
    elements: {
      host: null,
      padding: !u,
      viewport: (g) => u && Qo(g) && g,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, S = oe({}, dr), k = Y(oe, {}, S), A = Y(oe, {}, x), w = {
    P: v,
    T: p,
    L: u,
    J: !!Es,
    K: s(c, i),
    Z: Y(d, "r"),
    G: A,
    tt: (g) => oe(x, g) && A(),
    nt: k,
    ot: (g) => oe(S, g) && k(),
    st: oe({}, x),
    et: oe({}, S)
  };
  return Fe(c, "style"), tt(c), Me.addEventListener("resize", () => {
    let g;
    if (!u && (!p.x || !p.y)) {
      const B = Et(Js);
      g = !!(B ? B.Y() : Ne)(w, m);
    }
    l("r", [g]);
  }), w;
}, He = () => (ws || (ws = Tr()), ws), pn = (t, e) => je(e) ? e.apply(0, t) : e, Or = (t, e, s, n) => {
  const o = Bt(n) ? s : n;
  return pn(t, o) || e.apply(0, t);
}, vn = (t, e, s, n) => {
  const o = Bt(n) ? s : n, c = pn(t, o);
  return !!c && (Qt(c) ? c : e.apply(0, t));
}, Vr = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: n } = e || {}, { T: o, L: c, G: i } = He(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, m = s ?? d, f = Bt(n) ? l : n, v = (o.x || o.y) && m, u = t && (ns(f) ? !c : f);
  return !!v || !!u;
}, Xs = /* @__PURE__ */ new WeakMap(), Hr = (t, e) => {
  Xs.set(t, e);
}, Br = (t) => {
  Xs.delete(t);
}, hn = (t) => Xs.get(t), Rr = (t, e, s) => {
  let n = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    n = !0;
  }, i = (d) => {
    if (o && s) {
      const l = s.map((m) => {
        const [f, v] = m || [];
        return [v && f ? (d || Xo)(f, t) : [], v];
      });
      ne(l, (m) => ne(m[0], (f) => {
        const v = m[1], u = o.get(f) || [];
        if (t.contains(f) && v) {
          const x = ue(f, v, (S) => {
            n ? (x(), o.delete(f)) : e(S);
          });
          o.set(f, me(u, x));
        } else
          Ve(u), o.delete(f);
      }));
    }
  };
  return i(), [c, i];
}, wo = (t, e, s, n) => {
  let o = !1;
  const { ct: c, rt: i, lt: d, it: l, ut: m, dt: f } = n || {}, v = Go(() => o && s(!0), {
    v: 33,
    p: 99
  }), [u, p] = Rr(t, v, d), x = c || [], S = i || [], k = Ye(x, S), A = (g, B) => {
    if (!As(B)) {
      const M = m || Ne, $ = f || Ne, T = [], I = [];
      let N = !1, z = !1;
      if (ne(B, (R) => {
        const { attributeName: V, target: D, type: y, oldValue: U, addedNodes: F, removedNodes: P } = R, X = y === "attributes", de = y === "childList", G = t === D, ie = X && V, ae = ie && us(D, V || "") || null, ce = ie && U !== ae, ye = is(S, V) && ce;
        if (e && (de || !G)) {
          const _e = X && ce, fe = _e && l && es(D, l), L = (fe ? !M(D, V, U, ae) : !X || _e) && !$(R, !!fe, t, n);
          ne(F, (E) => me(T, E)), ne(P, (E) => me(T, E)), z = z || L;
        }
        !e && G && ce && !M(D, V, U, ae) && (me(I, V), N = N || ye);
      }), p((R) => to(T).reduce((V, D) => (me(V, Xo(R, D)), es(D, R) ? me(V, D) : V), [])), e)
        return !g && z && s(!1), [!1];
      if (!As(I) || N) {
        const R = [to(I), N];
        return !g && s.apply(0, R), R;
      }
    }
  }, w = new Qn(Y(A, !1));
  return [() => (w.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: k,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (u(), w.disconnect(), o = !1);
  }), () => {
    if (o)
      return v.m(), A(!0, w.takeRecords());
  }];
}, gn = (t, e, s) => {
  const { ft: o, _t: c } = s || {}, i = Et(Ar), { K: d } = He(), l = Y(Qe, t), [m] = Ie({
    o: !1,
    _: !0
  });
  return () => {
    const f = [], u = en(`<div class="${Ys}"><div class="${hr}"></div></div>`)[0], p = u.firstChild, x = (S) => {
      const k = S instanceof ResizeObserverEntry, A = !k && Ue(S);
      let w = !1, g = !1, B = !0;
      if (k) {
        const [M, , $] = m(S.contentRect), T = Vs(M), I = sn(M, $);
        g = !$ || I, w = !g && !T, B = !w;
      } else
        A ? [, B] = S : g = S === !0;
      if (o && B) {
        const M = A ? S[0] : Qe(u);
        st(u, {
          x: ts(3333333, 3333333, M && d),
          y: 3333333
        });
      }
      w || e({
        vt: A ? S : void 0,
        ht: !A,
        _t: g
      });
    };
    if (Jt) {
      const S = new Jt((k) => x(k.pop()));
      S.observe(p), me(f, () => {
        S.disconnect();
      });
    } else if (i) {
      const [S, k] = i(p, x, c);
      me(f, Ye([Zt(u, vr), ue(u, "animationstart", S)], k));
    } else
      return Ne;
    if (o) {
      const [S] = Ie({
        o: void 0
      }, l);
      me(f, ue(u, "scroll", (k) => {
        const A = S(), [w, g, B] = A;
        g && (js(p, "ltr rtl"), Zt(p, w ? "rtl" : "ltr"), x([!!w, g, B])), Ws(k);
      }));
    }
    return Y(Ve, me(f, De(t, u)));
  };
}, Ir = (t, e) => {
  let s;
  const n = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, o = ht(gr), [c] = Ie({
    o: !1
  }), i = (l, m) => {
    if (l) {
      const f = c(n(l)), [, v] = f;
      return v && !m && e(f) && [f];
    }
  }, d = (l, m) => i(m.pop(), l);
  return [() => {
    const l = [];
    if (eo)
      s = new eo(Y(d, !1), {
        root: t
      }), s.observe(o), me(l, () => {
        s.disconnect();
      });
    else {
      const m = () => {
        const f = Dt(o);
        i(f);
      };
      me(l, gn(o, m)()), m();
    }
    return Y(Ve, me(l, De(t, o)));
  }, () => s && d(!0, s.takeRecords())];
}, Nr = (t, e, s, n) => {
  let o, c, i, d, l, m;
  const { L: f } = He(), v = `[${Ae}]`, u = `[${We}]`, p = ["tabindex"], x = ["wrap", "cols", "rows"], S = ["id", "class", "style", "open"], { gt: k, bt: A, D: w, wt: g, yt: B, V: M, St: $, $t: T } = t, I = {
    Ot: !1,
    N: Qe(k)
  }, N = He(), z = Et(Js), [R] = Ie({
    u: jo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = z && z.M(t, e, I, N, s).W, L = $(bt), E = !M && $(fr), H = E && $t(w);
    T(bt), M && T(Bs, !0);
    const j = E && C && C()[0], q = Os(g), ee = Os(w), te = Gs(w);
    return T(bt, L), M && T(Bs), j && j(), st(w, H), {
      w: ee.w + q.w + te.w,
      h: ee.h + q.h + te.h
    };
  }), V = B ? x : Ye(S, x), D = Go(n, {
    v: () => o,
    p: () => c,
    S(C, L) {
      const [E] = C, [H] = L;
      return [Ye(et(E), et(H)).reduce((j, q) => (j[q] = E[q] || H[q], j), {})];
    }
  }), y = (C) => {
    if (M) {
      const L = Qe(k);
      oe(C, {
        Ct: m !== L
      }), oe(I, {
        N: L
      }), m = L;
    }
  }, U = (C) => {
    ne(C || p, (L) => {
      if (is(p, L)) {
        const E = us(A, L);
        rs(E) ? Re(w, L, E) : Fe(w, L);
      }
    });
  }, F = (C, L) => {
    const [E, H] = C, j = {
      xt: H
    };
    return oe(I, {
      Ot: E
    }), !L && n(j), j;
  }, P = ({ ht: C, vt: L, _t: E }) => {
    const j = !(C && !E && !L) && f ? D : n, [q, ee] = L || [], te = {
      ht: C || E,
      _t: E,
      Ct: ee
    };
    y(te), L && oe(I, {
      N: q
    }), j(te);
  }, X = (C, L) => {
    const [, E] = R(), H = {
      Ht: E
    };
    return y(H), E && !L && (C ? n : D)(H), H;
  }, de = (C, L, E) => {
    const H = {
      zt: L
    };
    return y(H), L && !E ? D(H) : M || U(C), H;
  }, { Z: G } = N, [ie, ae] = g ? Ir(A, F) : [], ce = !M && gn(A, P, {
    _t: !0,
    ft: !0
  }), [ye, _e] = wo(A, !1, de, {
    rt: S,
    ct: Ye(S, p)
  }), fe = M && Jt && new Jt((C) => {
    const L = C[C.length - 1].contentRect;
    P({
      ht: !0,
      _t: sn(L, l)
    }), l = L;
  });
  return [() => {
    U(), fe && fe.observe(A);
    const C = ce && ce(), L = ie && ie(), E = ye(), H = G((j) => {
      const [, q] = R();
      D({
        It: j,
        Ht: q
      });
    });
    return () => {
      fe && fe.disconnect(), C && C(), L && L(), d && d(), E(), H();
    };
  }, ({ Et: C, At: L, Tt: E }) => {
    const H = {}, [j] = C("update.ignoreMutation"), [q, ee] = C("update.attributes"), [te, pe] = C("update.elementEvents"), [xe, Z] = C("update.debounce"), we = pe || ee, $e = L || E, Be = (re) => je(j) && j(re);
    if (we) {
      i && i(), d && d();
      const [re, Se] = wo(g || w, !0, X, {
        ct: Ye(V, q || []),
        lt: te,
        it: v,
        dt: (Te, ge) => {
          const { target: Oe, attributeName: It } = Te;
          return (!ge && It && !M ? rr(Oe, v, u) : !1) || !!vt(Oe, `.${Le}`) || !!Be(Te);
        }
      });
      d = re(), i = Se;
    }
    if (Z)
      if (D.m(), Ue(xe)) {
        const re = xe[0], Se = xe[1];
        o = Pe(re) && re, c = Pe(Se) && Se;
      } else
        Pe(xe) ? (o = xe, c = !1) : (o = !1, c = !1);
    if ($e) {
      const re = _e(), Se = ae && ae(), Te = i && i();
      re && oe(H, de(re[0], re[1], $e)), Se && oe(H, F(Se[0], $e)), Te && oe(H, X(Te[0], $e));
    }
    return y(H), H;
  }, I];
}, Ur = (t, e, s, n) => {
  const { G: o, K: c } = He(), { scrollbars: i } = o(), { slot: d } = i, { gt: l, bt: m, D: f, Dt: v, kt: u, Rt: p, V: x } = e, { scrollbars: S } = v ? {} : t, { slot: k } = S || {}, A = /* @__PURE__ */ new Map(), w = (C) => Es && new Es({
    source: u,
    axis: C
  }), g = w("x"), B = w("y"), M = vn([l, m, f], () => x && p ? l : m, d, k), $ = (C, L) => {
    if (L) {
      const te = C ? _t : xt, { Mt: pe, Vt: xe } = L, Z = gt(xe)[te], we = gt(pe)[te];
      return Ds(0, 1, Z / we || 0);
    }
    const E = C ? "x" : "y", { Lt: H, Pt: j } = s, q = j[E], ee = H[E];
    return Ds(0, 1, q / (q + ee) || 0);
  }, T = (C, L, E, H) => {
    const j = $(E, C);
    return 1 / j * (1 - j) * (H ? 1 - L : L) || 0;
  }, I = (C, L) => oe(C, L ? {
    clear: ["left"]
  } : {}), N = (C) => {
    A.forEach((L, E) => {
      (C ? is(Ho(C), E) : !0) && (ne(L || [], (j) => {
        j && j.cancel();
      }), A.delete(E));
    });
  }, z = (C, L, E, H) => {
    const j = A.get(C) || [], q = j.find((ee) => ee && ee.timeline === L);
    q ? q.effect = new KeyframeEffect(C, E, {
      composite: H
    }) : A.set(C, Ye(j, [C.animate(E, {
      timeline: L,
      composite: H
    })]));
  }, R = (C, L, E) => {
    const H = E ? Zt : js;
    ne(C, (j) => {
      H(j.Ut, L);
    });
  }, V = (C, L) => {
    ne(C, (E) => {
      const [H, j] = L(E);
      kt(H, j);
    });
  }, D = (C, L) => {
    V(C, (E) => {
      const { Vt: H } = E;
      return [H, {
        [L ? _t : xt]: ro($(L))
      }];
    });
  }, y = (C, L) => {
    const { Lt: E } = s, H = L ? E.x : E.y, j = (q, ee, te) => bs(ro(T(q, uo(ee, H, te), L, te)), L);
    if (g && B)
      ne(C, (q) => {
        const { Ut: ee, Vt: te } = q, pe = L && Qe(ee) && c;
        z(te, L ? g : B, I({
          transform: co(H, pe).map((xe) => j(q, xe, pe))
        }, pe));
      });
    else {
      const q = $t(u);
      V(C, (ee) => {
        const { Vt: te, Ut: pe } = ee;
        return [te, {
          transform: j(ee, L ? q.x : q.y, L && Qe(pe) && c)
        }];
      });
    }
  }, U = (C) => x && !p && yt(C) === f, F = [], P = [], X = [], de = (C, L, E) => {
    const H = Vo(E), j = H ? E : !0, q = H ? !E : !0;
    j && R(P, C, L), q && R(X, C, L);
  }, G = () => {
    D(P, !0), D(X);
  }, ie = () => {
    y(P, !0), y(X);
  }, ae = () => {
    if (x) {
      const { Lt: C } = s, L = 0.5;
      if (g && B)
        ne(Ye(X, P), ({ Ut: E }) => {
          if (U(E)) {
            const H = (j, q, ee) => {
              const te = ee && Qe(E) && c;
              z(E, j, I({
                transform: co(q - L, te).map((pe) => bs(Ts(pe), ee))
              }, te), "add");
            };
            H(g, C.x, !0), H(B, C.y);
          } else
            N(E);
        });
      else {
        const E = $t(u), H = (j) => {
          const { Ut: q } = j, ee = U(q) && q, te = (pe, xe, Z) => {
            const we = uo(pe, xe, Z), $e = xe * we;
            return Ts(Z ? -$e : $e);
          };
          return [ee, {
            transform: ee ? bs({
              x: te(E.x, C.x, Qe(q) && c),
              y: te(E.y, C.y)
            }) : ""
          }];
        };
        V(P, H), V(X, H);
      }
    }
  }, ce = (C) => {
    const E = ht(`${Le} ${C ? xr : wr}`), H = ht(cn), j = ht(Ks), q = {
      Ut: E,
      Mt: H,
      Vt: j
    };
    return me(C ? P : X, q), me(F, [De(E, H), De(H, j), Y(tt, E), N, n(q, de, y, C)]), q;
  }, ye = Y(ce, !0), _e = Y(ce, !1), fe = () => (De(M, P[0].Ut), De(M, X[0].Ut), Y(Ve, F));
  return ye(), _e(), [{
    Bt: G,
    Nt: ie,
    jt: ae,
    Ft: de,
    qt: {
      J: g,
      Wt: P,
      Xt: ye,
      Yt: Y(V, P)
    },
    Jt: {
      J: B,
      Wt: X,
      Xt: _e,
      Yt: Y(V, X)
    }
  }, fe];
}, zr = (t, e, s, n) => {
  const { bt: o, D: c, V: i, kt: d, Kt: l } = e;
  return (m, f, v, u) => {
    const { Ut: p, Mt: x, Vt: S } = m, [k, A] = pt(333), [w, g] = pt(), B = Y(v, [m], u), M = !!d.scrollBy, $ = `client${u ? "X" : "Y"}`, T = u ? _t : xt, I = u ? "left" : "top", N = u ? "w" : "h", z = u ? "x" : "y", R = (y) => y.propertyName.indexOf(T) > -1, V = () => {
      const y = "pointerup pointerleave pointercancel lostpointercapture", U = (F, P) => (X) => {
        const { Lt: de } = s, G = Dt(x)[N] - Dt(S)[N], ae = P * X / G * de[z];
        st(d, {
          [z]: F + ae
        });
      };
      return ue(x, "pointerdown", (F) => {
        const P = vt(F.target, `.${Ks}`) === S, X = P ? S : x, de = t.scrollbars, { button: G, isPrimary: ie, pointerType: ae } = F, { pointers: ce } = de;
        if (G === 0 && ie && de[P ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const _e = !P && F.shiftKey, fe = Y(gt, S), C = Y(gt, x), L = (re, Se) => (re || fe())[I] - (Se || C())[I], E = Ss(gt(d)[T]) / Dt(d)[N] || 1, H = U($t(d)[z] || 0, 1 / E), j = F[$], q = fe(), ee = C(), te = q[T], pe = L(q, ee) + te / 2, xe = j - ee[I], Z = P ? 0 : xe - pe, we = (re) => {
            Ve(Be), X.releasePointerCapture(re.pointerId);
          }, Be = [Vt(o, Ae, ur), ue(l, y, we), ue(l, "selectstart", (re) => io(re), {
            H: !1
          }), ue(x, y, we), ue(x, "pointermove", (re) => {
            const Se = re[$] - j;
            (P || _e) && H(Z + Se);
          })];
          if (X.setPointerCapture(F.pointerId), _e)
            H(Z);
          else if (!P) {
            const re = Et(Lr);
            re && me(Be, re(H, L, Z, te, xe));
          }
        }
      });
    };
    let D = !0;
    return Y(Ve, [ue(S, "pointermove pointerleave", n), ue(p, "pointerenter", () => {
      f(go, !0);
    }), ue(p, "pointerleave pointercancel", () => {
      f(go, !1);
    }), !i && ue(p, "mousedown", () => {
      const y = Ls();
      (so(y, We) || so(y, Ae) || y === document.body) && Kt(() => {
        c.focus({
          preventScroll: !0
        });
      }, 25);
    }), ue(p, "wheel", (y) => {
      const { deltaX: U, deltaY: F, deltaMode: P } = y;
      M && D && P === 0 && yt(p) === o && d.scrollBy({
        left: U,
        top: F,
        behavior: "smooth"
      }), D = !1, f(xo, !0), k(() => {
        D = !0, f(xo);
      }), io(y);
    }, {
      H: !1,
      I: !0
    }), ue(S, "transitionstart", (y) => {
      if (R(y)) {
        const U = () => {
          B(), w(U);
        };
        U();
      }
    }), ue(S, "transitionend transitioncancel", (y) => {
      R(y) && (g(), B());
    }), ue(p, "mousedown", Y(ue, l, "click", Ws, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), V(), A, g]);
  };
}, Fr = (t, e, s, n, o, c) => {
  let i, d, l, m, f, v = Ne, u = 0;
  const p = (G) => G.pointerType === "mouse", [x, S] = pt(), [k, A] = pt(100), [w, g] = pt(100), [B, M] = pt(() => u), [$, T] = Ur(t, o, n, zr(e, o, n, (G) => p(G) && F())), { bt: I, Zt: N, Rt: z } = o, { Ft: R, Bt: V, Nt: D, jt: y } = $, U = (G, ie) => {
    if (M(), G)
      R(_o);
    else {
      const ae = Y(R, _o, !0);
      u > 0 && !ie ? B(ae) : ae();
    }
  }, F = () => {
    (l ? !i : !m) && (U(!0), k(() => {
      U(!1);
    }));
  }, P = (G) => {
    R(Is, G, !0), R(Is, G, !1);
  }, X = (G) => {
    p(G) && (i = l, l && U(!0));
  }, de = [M, A, g, S, () => v(), ue(I, "pointerover", X, {
    A: !0
  }), ue(I, "pointerenter", X), ue(I, "pointerleave", (G) => {
    p(G) && (i = !1, l && U(!1));
  }), ue(I, "pointermove", (G) => {
    p(G) && d && F();
  }), ue(N, "scroll", (G) => {
    x(() => {
      D(), F();
    }), c(G), y();
  })];
  return [() => Y(Ve, me(de, T())), ({ Et: G, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: ye, nn: _e, sn: fe } = ce || {}, { Ct: C, _t: L } = ae || {}, { N: E } = s, { T: H } = He(), { k: j, en: q } = n, [ee, te] = G("showNativeOverlaidScrollbars"), [pe, xe] = G("scrollbars.theme"), [Z, we] = G("scrollbars.visibility"), [$e, Be] = G("scrollbars.autoHide"), [re, Se] = G("scrollbars.autoHideSuspend"), [Te] = G("scrollbars.autoHideDelay"), [ge, Oe] = G("scrollbars.dragScroll"), [It, Nt] = G("scrollbars.clickScroll"), [Ut, ze] = G("overflow"), ot = L && !ie, nt = q.x || q.y, ps = ye || _e || C || ie, Ke = fe || we || ze, vs = ee && H.x && H.y, dt = (ut, mt, At) => {
      const zt = ut.includes("scroll") && (Z === "visible" || Z === "auto" && mt === "scroll");
      return R(yr, zt, At), zt;
    };
    if (u = Te, ot && (re && nt ? (P(!1), v(), w(() => {
      v = ue(N, "scroll", Y(P, !0), {
        A: !0
      });
    })) : P(!0)), te && R(br, vs), xe && (R(f), R(pe, !0), f = pe), Se && !re && P(!0), Be && (d = $e === "move", l = $e === "leave", m = $e === "never", U(m, !0)), Oe && R(Sr, ge), Nt && R($r, It), Ke) {
      const ut = dt(Ut.x, j.x, !0), mt = dt(Ut.y, j.y, !1);
      R(kr, !(ut && mt));
    }
    ps && (V(), D(), y(), R(bo, !q.x, !0), R(bo, !q.y, !1), R(_r, E && !z));
  }, {}, $];
}, Pr = (t) => {
  const e = He(), { G: s, L: n } = e, { elements: o } = s(), { host: c, padding: i, viewport: d, content: l } = o, m = Qt(t), f = m ? {} : t, { elements: v } = f, { host: u, padding: p, viewport: x, content: S } = v || {}, k = m ? t : f.target, A = Qo(k), w = es(k, "textarea"), g = k.ownerDocument, B = g.documentElement, M = () => g.defaultView || Me, $ = (Z) => {
    Z && Z.focus && Z.focus({
      preventScroll: !0
    });
  }, T = Y(Or, [k]), I = Y(vn, [k]), N = Y(ht, ""), z = Y(T, N, d), R = Y(I, N, l), V = z(x), D = V === k, y = D && A, U = !D && R(S), F = !D && V === U, P = y ? B : V, X = w ? T(N, c, u) : k, de = y ? P : X, G = !D && I(N, i, p), ie = !F && U, ae = [ie, P, G, de].map((Z) => Qt(Z) && !yt(Z) && Z), ce = (Z) => Z && is(ae, Z), ye = ce(P) ? k : P, _e = {
    gt: k,
    bt: de,
    D: P,
    cn: G,
    wt: ie,
    kt: y ? B : P,
    Zt: y ? g : P,
    rn: A ? B : ye,
    Kt: g,
    yt: w,
    Rt: A,
    Dt: m,
    V: D,
    ln: M,
    St: (Z) => or(P, D ? Ae : We, Z),
    $t: (Z, we) => Wt(P, D ? Ae : We, Z, we)
  }, { gt: fe, bt: C, cn: L, D: E, wt: H } = _e, j = [() => {
    Fe(C, [Ae, xs]), Fe(fe, xs), A && Fe(B, [xs, Ae]);
  }], q = w && ce(C);
  let ee = w ? fe : Ms([H, E, L, C, fe].find((Z) => Z && !ce(Z)));
  const te = y ? fe : H || E, pe = Y(Ve, j);
  return [_e, () => {
    const Z = M(), we = Ls(), $e = (ge) => {
      De(yt(ge), Ms(ge)), tt(ge);
    }, Be = (ge) => ge ? ue(ge, "focusin focusout focus blur", (Oe) => {
      Ws(Oe), Oe.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", Se = us(E, re), Te = Be(we);
    return Re(C, Ae, D ? "viewport" : "host"), Re(L, Rs, ""), Re(H, ho, ""), D || (Re(E, We, ""), Re(E, re, Se || "-1"), A && Vt(B, Ae, mr)), q && (oo(fe, C), me(j, () => {
      oo(C, fe), tt(C);
    })), De(te, ee), De(C, L), De(L || C, !D && E), De(E, H), me(j, [Te, () => {
      const ge = Ls(), Oe = Be(ge);
      Fe(L, Rs), Fe(H, ho), Fe(E, [nn, rn, We]), Se ? Re(E, re, Se) : Fe(E, re), ce(H) && $e(H), ce(E) && $e(E), ce(L) && $e(L), $(ge), Oe();
    }]), n && !D && (Vt(E, We, ln), me(j, Y(Fe, E, We))), $(!D && we === k && Z.top === Z ? E : we), Te(), ee = 0, pe;
  }, pe];
}, jr = ({ wt: t }) => ({ Gt: e, an: s, Tt: n }) => {
  const { xt: o } = e || {}, { Ot: c } = s;
  t && (o || n) && kt(t, {
    [xt]: c && "100%"
  });
}, qr = ({ bt: t, cn: e, D: s, V: n }, o) => {
  const [c, i] = Ie({
    u: sr,
    o: ao()
  }, Y(ao, t, "padding", ""));
  return ({ Et: d, Gt: l, an: m, Tt: f }) => {
    let [v, u] = i(f);
    const { L: p } = He(), { ht: x, Ht: S, Ct: k } = l || {}, { N: A } = m, [w, g] = d("paddingAbsolute");
    (x || u || (f || S)) && ([v, u] = c(f));
    const M = !n && (g || k || u);
    if (M) {
      const $ = !w || !e && !p, T = v.r + v.l, I = v.t + v.b, N = {
        [zo]: $ && !A ? -T : 0,
        [Fo]: $ ? -I : 0,
        [Uo]: $ && A ? -T : 0,
        top: $ ? -v.t : 0,
        right: $ ? A ? -v.r : "auto" : 0,
        left: $ ? A ? "auto" : -v.l : 0,
        [_t]: $ && `calc(100% + ${T}px)`
      }, z = {
        [Bo]: $ ? v.t : 0,
        [Ro]: $ ? v.r : 0,
        [No]: $ ? v.b : 0,
        [Io]: $ ? v.l : 0
      };
      kt(e || s, N), kt(s, z), oe(o, {
        cn: v,
        un: !$,
        j: e ? z : oe({}, N, z)
      });
    }
    return {
      dn: M
    };
  };
}, Gr = (t, e) => {
  const s = He(), { bt: n, cn: o, D: c, V: i, Rt: d, $t: l, ln: m } = t, { L: f } = s, v = d && i, u = Y(Gt, 0), p = {
    u: jo,
    o: {
      w: 0,
      h: 0
    }
  }, x = {
    u: qo,
    o: {
      x: wt,
      y: wt
    }
  }, S = (z, R) => {
    const V = Me.devicePixelRatio % 1 !== 0 ? 1 : 0, D = {
      w: u(z.w - R.w),
      h: u(z.h - R.h)
    };
    return {
      w: D.w > V ? D.w : 0,
      h: D.h > V ? D.h : 0
    };
  }, [k, A] = Ie(p, Y(Gs, c)), [w, g] = Ie(p, Y(Os, c)), [B, M] = Ie(p), [$, T] = Ie(p), [I] = Ie(x), N = Et(Js);
  return ({ Et: z, Gt: R, an: V, Tt: D }, { dn: y }) => {
    const { ht: U, Ht: F, Ct: P, It: X } = R || {}, de = N && N.M(t, e, V, s, z), { q: G, W: ie, X: ae } = de || {}, [ce, ye] = Dr(z, s), [_e, fe] = z("overflow"), C = U || y || F || P || X || ye, L = ss(_e.x), E = ss(_e.y), H = L || E;
    let j = A(D), q = g(D), ee = M(D), te = T(D), pe;
    if (ye && f && l(ln, !ce), C) {
      H && l(bt, !1);
      const [ze, ot] = ie ? ie(pe) : [], [nt, ps] = j = k(D), [Ke, vs] = q = w(D), dt = tn(c), ut = Ke, mt = dt;
      ze && ze(), (vs || ps || ye) && ot && !ce && G && G(ot, Ke, nt);
      const At = ir(m()), zt = {
        w: u(Gt(Ke.w, ut.w) + nt.w),
        h: u(Gt(Ke.h, ut.h) + nt.h)
      }, Qs = {
        w: u((v ? At.w : mt.w + u(dt.w - Ke.w)) + nt.w),
        h: u((v ? At.h : mt.h + u(dt.h - Ke.h)) + nt.h)
      };
      te = $(Qs), ee = B(S(zt, Qs), D);
    }
    const [xe, Z] = te, [we, $e] = ee, [Be, re] = q, [Se, Te] = j, ge = {
      x: we.w > 0,
      y: we.h > 0
    }, Oe = L && E && (ge.x || ge.y) || L && ge.x && !ge.y || E && ge.y && !ge.x;
    if (y || P || X || Te || re || Z || $e || fe || ye || C) {
      const ze = {}, ot = Mr(t, ge, _e, ze);
      ae && ae(ot, V, !!G && G(ot, Be, Se), ze), i ? (Re(n, nn, ze[cs]), Re(n, rn, ze[ds])) : kt(c, ze);
    }
    Wt(n, Ae, an, Oe), Wt(o, Rs, pr, Oe), i || Wt(c, We, bt, H);
    const [Nt, Ut] = I(fn(t).k);
    return oe(e, {
      k: Nt,
      Pt: {
        x: xe.w,
        y: xe.h
      },
      Lt: {
        x: we.w,
        y: we.h
      },
      en: ge
    }), {
      sn: Ut,
      tn: Z,
      nn: $e
    };
  };
}, Wr = (t) => {
  const [e, s, n] = Pr(t), o = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    j: {
      [zo]: 0,
      [Fo]: 0,
      [Uo]: 0,
      [Bo]: 0,
      [Ro]: 0,
      [No]: 0,
      [Io]: 0
    },
    Pt: {
      x: 0,
      y: 0
    },
    Lt: {
      x: 0,
      y: 0
    },
    k: {
      x: wt,
      y: wt
    },
    en: {
      x: !1,
      y: !1
    }
  }, { gt: c, D: i, V: d } = e, { L: l, T: m } = He(), f = !l && (m.x || m.y), v = [jr(e), qr(e, o), Gr(e, o)];
  return [s, (u) => {
    const p = {}, S = f && $t(i), k = d ? Vt(i, Ae, Bs) : Ne;
    return ne(v, (A) => {
      oe(p, A(u, p) || {});
    }), k(), st(i, S), !d && st(c, 0), p;
  }, o, e, n];
}, Yr = (t, e, s, n) => {
  const o = vo(e, {}), [c, i, d, l, m] = Wr(t), [f, v, u] = Nr(l, d, o, (w) => {
    A({}, w);
  }), [p, x, , S] = Fr(t, e, u, d, l, n), k = (w) => et(w).some((g) => !!w[g]), A = (w, g) => {
    const { fn: B, Tt: M, At: $, _n: T } = w, I = B || {}, N = !!M, z = {
      Et: vo(e, I, N),
      fn: I,
      Tt: N
    };
    if (T)
      return x(z), !1;
    const R = g || v(oe({}, z, {
      At: $
    })), V = i(oe({}, z, {
      an: u,
      Gt: R
    }));
    x(oe({}, z, {
      Gt: R,
      Qt: V
    }));
    const D = k(R), y = k(V), U = D || y || !Ps(I) || N;
    return U && s(w, {
      Gt: R,
      Qt: V
    }), U;
  };
  return [() => {
    const { rn: w, D: g } = l, B = $t(w), M = [f(), c(), p()];
    return st(g, B), Y(Ve, M);
  }, A, () => ({
    vn: u,
    hn: d
  }), {
    pn: l,
    gn: S
  }, m];
}, it = (t, e, s) => {
  const { nt: n } = He(), o = Qt(t), c = o ? t : t.target, i = hn(c);
  if (e && !i) {
    let d = !1;
    const l = [], m = {}, f = (z) => {
      const R = Yo(z), V = Et(Er);
      return V ? V(R, !0) : R;
    }, v = oe({}, n(), f(e)), [u, p, x] = Hs(), [S, k, A] = Hs(s), w = (z, R) => {
      A(z, R), x(z, R);
    }, [g, B, M, $, T] = Yr(t, v, ({ fn: z, Tt: R }, { Gt: V, Qt: D }) => {
      const { ht: y, Ct: U, xt: F, Ht: P, zt: X, _t: de } = V, { tn: G, nn: ie, sn: ae } = D;
      w("updated", [N, {
        updateHints: {
          sizeChanged: !!y,
          directionChanged: !!U,
          heightIntrinsicChanged: !!F,
          overflowEdgeChanged: !!G,
          overflowAmountChanged: !!ie,
          overflowStyleChanged: !!ae,
          contentMutation: !!P,
          hostMutation: !!X,
          appear: !!de
        },
        changedOptions: z || {},
        force: !!R
      }]);
    }, (z) => w("scroll", [N, z])), I = (z) => {
      Br(c), Ve(l), d = !0, w("destroyed", [N, z]), p(), k();
    }, N = {
      options(z, R) {
        if (z) {
          const V = R ? n() : {}, D = on(v, oe(V, f(z)));
          Ps(D) || (oe(v, D), B({
            fn: D
          }));
        }
        return oe({}, v);
      },
      on: S,
      off: (z, R) => {
        z && R && k(z, R);
      },
      state() {
        const { vn: z, hn: R } = M(), { N: V } = z, { Pt: D, Lt: y, k: U, en: F, cn: P, un: X } = R;
        return oe({}, {
          overflowEdge: D,
          overflowAmount: y,
          overflowStyle: U,
          hasOverflow: F,
          padding: P,
          paddingAbsolute: X,
          directionRTL: V,
          destroyed: d
        });
      },
      elements() {
        const { gt: z, bt: R, cn: V, D, wt: y, kt: U, Zt: F } = $.pn, { qt: P, Jt: X } = $.gn, de = (ie) => {
          const { Vt: ae, Mt: ce, Ut: ye } = ie;
          return {
            scrollbar: ye,
            track: ce,
            handle: ae
          };
        }, G = (ie) => {
          const { Wt: ae, Xt: ce } = ie, ye = de(ae[0]);
          return oe({}, ye, {
            clone: () => {
              const _e = de(ce());
              return B({
                _n: !0
              }), _e;
            }
          });
        };
        return oe({}, {
          target: z,
          host: R,
          padding: V || D,
          viewport: D,
          content: y || D,
          scrollOffsetElement: U,
          scrollEventElement: F,
          scrollbarHorizontal: G(P),
          scrollbarVertical: G(X)
        });
      },
      update: (z) => B({
        Tt: z,
        At: !0
      }),
      destroy: Y(I, !1),
      plugin: (z) => m[et(z)[0]]
    };
    return me(l, [T]), Hr(c, N), mn(dn, it, [N, u, m]), Vr($.pn.Rt, !o && t.cancel) ? (I(!0), N) : (me(l, g()), w("initialized", [N]), N.update(!0), N);
  }
  return i;
};
it.plugin = (t) => {
  const e = Ue(t), s = e ? t : [t], n = s.map((o) => mn(o, it)[0]);
  return Cr(s), e ? n : n[0];
};
it.valid = (t) => {
  const e = t && t.elements, s = je(e) && e();
  return Xt(s) && !!hn(s.target);
};
it.env = () => {
  const { P: t, T: e, L: s, K: n, J: o, st: c, et: i, G: d, tt: l, nt: m, ot: f } = He();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    rtlScrollBehavior: n,
    scrollTimeline: o,
    staticDefaultInitialization: c,
    staticDefaultOptions: i,
    getDefaultInitialization: d,
    setDefaultInitialization: l,
    getDefaultOptions: m,
    setDefaultOptions: f
  });
};
function Kr() {
  let t;
  const e = O(null), s = Math.floor(Math.random() * 2 ** 32), n = O(!1), o = O([]), c = () => o.value, i = () => t.getSelection(), d = () => o.value.length, l = () => t.clearSelection(!0), m = O(), f = O(null), v = O(null), u = O(null);
  function p() {
    t = new Bn({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: w, event: g, isDragging: B }) => {
      if (B)
        t.Interaction._reset(g);
      else {
        n.value = !1;
        const M = e.value.offsetWidth - g.offsetX, $ = e.value.offsetHeight - g.offsetY;
        M < 15 && $ < 15 && t.Interaction._reset(g), g.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(g);
      }
    }), document.addEventListener("dragleave", (w) => {
      !w.buttons && n.value && (n.value = !1);
    });
  }
  const x = () => Lt(() => {
    const w = c().map((g) => g.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((g) => w.includes(JSON.parse(g.dataset.item).path))
    ), o.value = t.getSelection().map((g) => JSON.parse(g.dataset.item)), m.value(o.value);
  }), S = (w) => {
    m.value = w, t.subscribe("DS:end", ({ items: g, event: B, isDragging: M }) => {
      o.value = g.map(($) => JSON.parse($.dataset.item)), w(g.map(($) => JSON.parse($.dataset.item)));
    });
  }, k = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight - 15 + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, A = (w) => {
    if (!f.value)
      return;
    const { scrollOffsetElement: g } = f.value.elements();
    g.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    it(u.value, {
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
      initialized: (w) => {
        f.value = w;
      },
      scroll: (w, g) => {
        const { scrollOffsetElement: B } = w.elements();
        e.value.scrollTo({
          top: B.scrollTop,
          left: 0
        });
      }
    }), p(), k(), new ResizeObserver(k).observe(e.value), e.value.addEventListener("scroll", A), t.subscribe("DS:scroll", ({ isDragging: w }) => w || A());
  }), $o(() => {
    t && t.stop();
  }), So(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: n,
    scrollBar: v,
    scrollBarContainer: u,
    getSelected: c,
    getSelection: i,
    clearSelection: l,
    refreshSelection: x,
    getCount: d,
    onSelect: S
  };
}
function Jr(t, e) {
  const s = O(t), n = O(e), o = O([]), c = O([]), i = O([]), d = O(!1), l = O(5);
  let m = !1, f = !1;
  const v = Ht({
    adapter: s,
    storages: [],
    dirname: n,
    files: []
  });
  function u() {
    let w = [], g = [], B = n.value ?? s.value + "://";
    B.length === 0 && (o.value = []), B.replace(s.value + "://", "").split("/").forEach(function(T) {
      w.push(T), w.join("/") !== "" && g.push({
        basename: T,
        name: T,
        path: s.value + "://" + w.join("/"),
        type: "dir"
      });
    }), c.value = g;
    const [M, $] = x(g, l.value);
    i.value = $, o.value = M;
  }
  function p(w) {
    l.value = w, u();
  }
  function x(w, g) {
    return w.length > g ? [w.slice(-g), w.slice(0, -g)] : [w, []];
  }
  function S(w = null) {
    d.value = w ?? !d.value;
  }
  function k() {
    return o.value && o.value.length && !f;
  }
  const A = at(() => {
    var w;
    return ((w = o.value[o.value.length - 2]) == null ? void 0 : w.path) ?? s.value + "://";
  });
  return Ee(() => {
  }), Mt(n, u), Ee(u), {
    adapter: s,
    path: n,
    loading: m,
    searchMode: f,
    data: v,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: S,
    isGoUpAvailable: k,
    parentFolderPath: A
  };
}
const Xr = (t, e) => {
  const s = Pn(t.id), n = Hn(), o = s.getStore("metricUnits", !1), c = Kn(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), m = (u) => Array.isArray(u) ? u : Gn, f = s.getStore("persist-path", t.persist), v = f ? s.getStore("path", t.path) : t.path;
  return Ht({
    /*
    * Core properties
    * */
    // app version
    version: Wn,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: n,
    // storage
    storage: s,
    // localization object
    i18n: at(() => qn(s, d, n, i)),
    // modal state
    modal: Jn(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: at(() => Kr()),
    // http object
    requester: Fn(t.request),
    // active features
    features: m(t.features),
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
    filesize: o ? Do : Ao,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: f,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Jr(l, v)
  });
}, Qr = /* @__PURE__ */ a("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Zr = { class: "fixed z-10 inset-0 overflow-hidden" }, ea = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, ta = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, qe = {
  __name: "ModalLayout",
  setup(t) {
    const e = O(null), s = le("ServiceContainer");
    return Ee(() => {
      const n = document.querySelector(".v-f-modal input");
      n && n.focus(), Lt(() => {
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
      onKeyup: o[1] || (o[1] = St((c) => r(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Qr,
      a("div", Zr, [
        a("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: o[0] || (o[0] = Ze((c) => r(s).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            a("div", ea, [
              Tt(n.$slots, "default")
            ]),
            a("div", ta, [
              Tt(n.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, sa = ["aria-label"], oa = /* @__PURE__ */ a("svg", {
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
], -1), na = [
  oa
], Ge = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var m;
    const s = e, n = le("ServiceContainer"), { t: o } = n.i18n, c = O(!1), i = O(null), d = O((m = i.value) == null ? void 0 : m.strMessage);
    Mt(d, () => c.value = !1);
    const l = () => {
      s("hidden"), c.value = !0;
    };
    return (f, v) => (h(), _("div", null, [
      c.value ? W("", !0) : (h(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: be(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", t.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        Tt(f.$slots, "default"),
        a("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": r(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, na, 8, sa)
      ], 2))
    ]));
  }
}, ra = { class: "sm:flex sm:items-start" }, aa = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), la = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ia = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ca = { class: "mt-2" }, da = { class: "text-sm text-gray-500" }, ua = ["placeholder"], bn = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, n = O(""), o = O(""), c = () => {
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
    return (i, d) => (h(), J(qe, null, {
      buttons: K(() => [
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
      default: K(() => [
        a("div", ra, [
          aa,
          a("div", la, [
            a("h3", ia, b(r(s)("New Folder")), 1),
            a("div", ca, [
              a("p", da, b(r(s)("Create a new folder")), 1),
              he(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => n.value = l),
                onKeyup: St(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("Folder Name"),
                type: "text"
              }, null, 40, ua), [
                [Ct, n.value]
              ]),
              o.value.length ? (h(), J(Ge, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: K(() => [
                  se(b(o.value), 1)
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
}, ma = { class: "sm:flex sm:items-start" }, fa = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), pa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, va = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ha = { class: "mt-2" }, ga = { class: "text-sm text-gray-500" }, ba = ["placeholder"], _a = {
  __name: "ModalNewFile",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, n = O(""), o = O(""), c = () => {
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
    return (i, d) => (h(), J(qe, null, {
      buttons: K(() => [
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
      default: K(() => [
        a("div", ma, [
          fa,
          a("div", pa, [
            a("h3", va, b(r(s)("New File")), 1),
            a("div", ha, [
              a("p", ga, b(r(s)("Create a new file")), 1),
              he(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => n.value = l),
                onKeyup: St(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("File Name"),
                type: "text"
              }, null, 40, ba), [
                [Ct, n.value]
              ]),
              o.value.length ? (h(), J(Ge, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: K(() => [
                  se(b(o.value), 1)
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
}, xa = { class: "sm:flex sm:items-start" }, wa = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ya = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ka = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $a = { class: "mt-2" }, Sa = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ca = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ea = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Aa = [
  Ea
], Da = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ma = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), La = [
  Ma
], Ta = { class: "ml-1.5" }, _n = {
  __name: "ModalRename",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = O(e.modal.data.items[0]), o = O(e.modal.data.items[0].basename), c = O(""), i = () => {
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
    return (d, l) => (h(), J(qe, null, {
      buttons: K(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (m) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: K(() => [
        a("div", xa, [
          wa,
          a("div", ya, [
            a("h3", ka, b(r(s)("Rename")), 1),
            a("div", $a, [
              a("p", Sa, [
                n.value.type === "dir" ? (h(), _("svg", Ca, Aa)) : (h(), _("svg", Da, La)),
                a("span", Ta, b(n.value.basename), 1)
              ]),
              he(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (m) => o.value = m),
                onKeyup: St(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Ct, o.value]
              ]),
              c.value.length ? (h(), J(Ge, {
                key: 0,
                onHidden: l[1] || (l[1] = (m) => c.value = ""),
                error: ""
              }, {
                default: K(() => [
                  se(b(c.value), 1)
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
}, Oa = { class: "sm:flex sm:items-start" }, Va = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ha = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ba = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ra = { class: "mt-2" }, Ia = { class: "text-sm text-gray-500" }, Na = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Ua = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, za = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fa = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Pa = [
  Fa
], ja = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qa = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ga = [
  qa
], Wa = { class: "ml-1.5" }, Ya = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, xn = {
  __name: "ModalDelete",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = O(e.modal.data.items), o = O(""), c = () => {
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
    return (i, d) => (h(), J(qe, null, {
      buttons: K(() => [
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
        a("div", Ya, b(r(s)("This action cannot be undone.")), 1)
      ]),
      default: K(() => [
        a("div", Oa, [
          Va,
          a("div", Ha, [
            a("h3", Ba, b(r(s)("Delete files")), 1),
            a("div", Ra, [
              a("p", Ia, b(r(s)("Are you sure you want to delete these files?")), 1),
              a("div", Na, [
                (h(!0), _(ke, null, Ce(n.value, (l) => (h(), _("p", Ua, [
                  l.type === "dir" ? (h(), _("svg", za, Pa)) : (h(), _("svg", ja, Ga)),
                  a("span", Wa, b(l.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (h(), J(Ge, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => o.value = ""),
                error: ""
              }, {
                default: K(() => [
                  se(b(o.value), 1)
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
function Ns(t, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(s), "$2..$4");
}
const Ka = { class: "sm:flex sm:items-start" }, Ja = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Xa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Qa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Za = { class: "mt-2" }, el = {
  key: 0,
  class: "pointer-events-none"
}, tl = {
  key: 1,
  class: "pointer-events-none"
}, sl = ["disabled"], ol = ["disabled"], nl = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, rl = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, al = ["textContent"], ll = { class: "ml-1 w-full h-fit" }, il = { class: "text-left hidden md:block" }, cl = { class: "text-left md:hidden" }, dl = {
  key: 0,
  class: "ml-auto"
}, ul = ["title", "disabled", "onClick"], ml = /* @__PURE__ */ a("svg", {
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
], -1), fl = [
  ml
], pl = {
  key: 0,
  class: "py-2"
}, vl = ["disabled"], hl = {
  __name: "ModalUpload",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = O({ QUEUE_ENTRY_STATUS: o }), i = O(null), d = O(null), l = O(null), m = O(null), f = O(null), v = O(null), u = O([]), p = O(""), x = O(!1), S = O(!1);
    let k;
    function A(V) {
      return u.value.findIndex((D) => D.id === V);
    }
    function w(V, D = null) {
      D = D ?? (V.webkitRelativePath || V.name), k.addFile({
        name: D,
        type: V.type,
        data: V,
        source: "Local"
      });
    }
    function g(V) {
      switch (V.status) {
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
    const B = (V) => {
      switch (V.status) {
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
    function M() {
      m.value.click();
    }
    function $() {
      if (!x.value) {
        if (!u.value.filter((V) => V.status !== o.DONE).length) {
          p.value = s("Please select file to upload first.");
          return;
        }
        p.value = "", k.retryAll(), k.upload();
      }
    }
    function T() {
      k.cancelAll({ reason: "user" }), u.value.forEach((V) => {
        V.status !== o.DONE && (V.status = o.CANCELED, V.statusName = s("Canceled"));
      }), x.value = !1;
    }
    function I(V) {
      x.value || (k.removeFile(V.id, "removed-by-user"), u.value.splice(A(V.id), 1));
    }
    function N(V) {
      if (!x.value) {
        if (k.cancelAll({ reason: "user" }), V) {
          const D = [];
          u.value.forEach((y) => {
            y.status !== o.DONE && D.push(y);
          }), u.value = [], D.forEach((y) => {
            w(y.originalFile, y.name);
          });
          return;
        }
        u.value.splice(0);
      }
    }
    function z() {
      e.modal.close();
    }
    function R() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ee(async () => {
      k = new Rn({
        debug: e.debug,
        restrictions: {
          maxFileSize: Yn(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: n,
        onBeforeFileAdded(y, U) {
          if (U[y.id] != null) {
            const P = A(y.id);
            u.value[P].status === o.PENDING && (p.value = k.i18n("noDuplicates", { fileName: y.name })), u.value = u.value.filter((X) => X.id !== y.id);
          }
          return u.value.push({
            id: y.id,
            name: y.name,
            size: e.filesize(y.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: y.data
          }), !0;
        }
      }), k.use(In, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(y, U) {
          let F;
          try {
            F = JSON.parse(y).message;
          } catch {
            F = s("Cannot parse server response.");
          }
          return new Error(F);
        }
      }), k.on("restriction-failed", (y, U) => {
        const F = u.value[A(y.id)];
        I(F), p.value = U.message;
      }), k.on("upload", () => {
        const y = R();
        k.setMeta({ ...y.body });
        const U = k.getPlugin("XHRUpload");
        U.opts.method = y.method, U.opts.endpoint = y.url + "?" + new URLSearchParams(y.params), U.opts.headers = y.headers, x.value = !0, u.value.forEach((F) => {
          F.status !== o.DONE && (F.percent = null, F.status = o.UPLOADING, F.statusName = s("Pending upload"));
        });
      }), k.on("upload-progress", (y, U) => {
        const F = Math.floor(U.bytesUploaded / U.bytesTotal * 100);
        u.value[A(y.id)].percent = `${F}%`;
      }), k.on("upload-success", (y) => {
        const U = u.value[A(y.id)];
        U.status = o.DONE, U.statusName = s("Done");
      }), k.on("upload-error", (y, U) => {
        const F = u.value[A(y.id)];
        F.percent = null, F.status = o.ERROR, U.isNetworkError ? F.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : F.statusName = U ? U.message : s("Unknown Error");
      }), k.on("error", (y) => {
        p.value = y.message, x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), k.on("complete", () => {
        x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), m.value.addEventListener("click", () => {
        d.value.click();
      }), f.value.addEventListener("click", () => {
        l.value.click();
      }), v.value.addEventListener("dragover", (y) => {
        y.preventDefault(), S.value = !0;
      }), v.value.addEventListener("dragleave", (y) => {
        y.preventDefault(), S.value = !1;
      });
      function V(y, U) {
        U.isFile && U.file((F) => y(U, F)), U.isDirectory && U.createReader().readEntries((F) => {
          F.forEach((P) => {
            V(y, P);
          });
        });
      }
      v.value.addEventListener("drop", (y) => {
        y.preventDefault(), S.value = !1;
        const U = /^[/\\](.+)/;
        [...y.dataTransfer.items].forEach((F) => {
          F.kind === "file" && V((P, X) => {
            const de = U.exec(P.fullPath);
            w(X, de[1]);
          }, F.webkitGetAsEntry());
        });
      });
      const D = ({ target: y }) => {
        const U = y.files;
        for (const F of U)
          w(F);
        y.value = "";
      };
      d.value.addEventListener("change", D), l.value.addEventListener("change", D);
    }), Co(() => {
      k == null || k.close({ reason: "unmount" });
    }), (V, D) => (h(), J(qe, null, {
      buttons: K(() => [
        a("button", {
          type: "button",
          class: be(["vf-btn vf-btn-primary", x.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: x.value,
          onClick: Ze($, ["prevent"])
        }, b(r(s)("Upload")), 11, vl),
        x.value ? (h(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Ze(T, ["prevent"])
        }, b(r(s)("Cancel")), 1)) : (h(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Ze(z, ["prevent"])
        }, b(r(s)("Close")), 1))
      ]),
      default: K(() => [
        a("div", Ka, [
          Ja,
          a("div", Xa, [
            a("h3", Qa, b(r(s)("Upload Files")), 1),
            a("div", Za, [
              a("div", {
                ref_key: "dropArea",
                ref: v,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: M
              }, [
                S.value ? (h(), _("div", el, b(r(s)("Release to drop these files.")), 1)) : (h(), _("div", tl, b(r(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              a("div", {
                ref_key: "container",
                ref: i,
                class: "text-gray-500 mb-1"
              }, [
                a("button", {
                  ref_key: "pickFiles",
                  ref: m,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, b(r(s)("Select Files")), 513),
                a("button", {
                  ref_key: "pickFolders",
                  ref: f,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, b(r(s)("Select Folders")), 513),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: x.value,
                  onClick: D[0] || (D[0] = (y) => N(!1))
                }, b(r(s)("Clear all")), 9, sl),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: x.value,
                  onClick: D[1] || (D[1] = (y) => N(!0))
                }, b(r(s)("Clear only successful")), 9, ol)
              ], 512),
              a("div", nl, [
                (h(!0), _(ke, null, Ce(u.value, (y) => (h(), _("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: y.id
                }, [
                  a("span", rl, [
                    a("span", {
                      class: be(["text-base m-auto", g(y)]),
                      textContent: b(B(y))
                    }, null, 10, al)
                  ]),
                  a("div", ll, [
                    a("div", il, b(r(Ns)(y.name, 40)) + " (" + b(y.size) + ")", 1),
                    a("div", cl, b(r(Ns)(y.name, 16)) + " (" + b(y.size) + ")", 1),
                    a("div", {
                      class: be(["flex break-all text-left", g(y)])
                    }, [
                      se(b(y.statusName) + " ", 1),
                      y.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (h(), _("b", dl, b(y.percent), 1)) : W("", !0)
                    ], 2)
                  ]),
                  a("button", {
                    type: "button",
                    class: be(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", x.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: r(s)("Delete"),
                    disabled: x.value,
                    onClick: (U) => I(y)
                  }, fl, 10, ul)
                ]))), 128)),
                u.value.length ? W("", !0) : (h(), _("div", pl, b(r(s)("No files selected!")), 1))
              ]),
              p.value.length ? (h(), J(Ge, {
                key: 0,
                onHidden: D[2] || (D[2] = (y) => p.value = ""),
                error: ""
              }, {
                default: K(() => [
                  se(b(p.value), 1)
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
}, gl = { class: "sm:flex sm:items-start" }, bl = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), _l = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, xl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, wl = { class: "mt-2" }, yl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, kl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $l = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Sl = [
  $l
], Cl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, El = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Al = [
  El
], Dl = { class: "ml-1.5" }, Ml = { class: "my-1 text-sm text-gray-500" }, wn = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = O(e.modal.data.items[0]), o = O(""), c = O([]), i = () => {
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
    return (d, l) => (h(), J(qe, null, {
      buttons: K(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: l[1] || (l[1] = (m) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: K(() => [
        a("div", gl, [
          bl,
          a("div", _l, [
            a("h3", xl, b(r(s)("Unarchive")), 1),
            a("div", wl, [
              (h(!0), _(ke, null, Ce(c.value, (m) => (h(), _("p", yl, [
                m.type === "dir" ? (h(), _("svg", kl, Sl)) : (h(), _("svg", Cl, Al)),
                a("span", Dl, b(m.basename), 1)
              ]))), 256)),
              a("p", Ml, b(r(s)("The archive will be unarchived at")) + " (" + b(r(e).fs.data.dirname) + ")", 1),
              o.value.length ? (h(), J(Ge, {
                key: 0,
                onHidden: l[0] || (l[0] = (m) => o.value = ""),
                error: ""
              }, {
                default: K(() => [
                  se(b(o.value), 1)
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
}, Ll = { class: "sm:flex sm:items-start" }, Tl = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ol = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Vl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Hl = { class: "mt-2" }, Bl = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Rl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Il = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ul = [
  Nl
], zl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fl = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Pl = [
  Fl
], jl = { class: "ml-1.5" }, ql = ["placeholder"], yn = {
  __name: "ModalArchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = O(""), o = O(""), c = O(e.modal.data.items), i = () => {
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
    return (d, l) => (h(), J(qe, null, {
      buttons: K(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(r(s)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (m) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Cancel")), 1)
      ]),
      default: K(() => [
        a("div", Ll, [
          Tl,
          a("div", Ol, [
            a("h3", Vl, b(r(s)("Archive the files")), 1),
            a("div", Hl, [
              a("div", Bl, [
                (h(!0), _(ke, null, Ce(c.value, (m) => (h(), _("p", Rl, [
                  m.type === "dir" ? (h(), _("svg", Il, Ul)) : (h(), _("svg", zl, Pl)),
                  a("span", jl, b(m.basename), 1)
                ]))), 256))
              ]),
              he(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (m) => n.value = m),
                onKeyup: St(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: r(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ql), [
                [Ct, n.value]
              ]),
              o.value.length ? (h(), J(Ge, {
                key: 0,
                onHidden: l[1] || (l[1] = (m) => o.value = ""),
                error: ""
              }, {
                default: K(() => [
                  se(b(o.value), 1)
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
}, Gl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Wl = /* @__PURE__ */ a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Yl = [
  Wl
];
function Kl(t, e) {
  return h(), _("svg", Gl, [...Yl]);
}
const Jl = { render: Kl }, Xl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ql = /* @__PURE__ */ a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Zl = [
  Ql
];
function ei(t, e) {
  return h(), _("svg", Xl, [...Zl]);
}
const ti = { render: ei }, si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, oi = /* @__PURE__ */ a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), ni = [
  oi
];
function ri(t, e) {
  return h(), _("svg", si, [...ni]);
}
const ai = { render: ri }, li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ii = /* @__PURE__ */ a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), ci = [
  ii
];
function di(t, e) {
  return h(), _("svg", li, [...ci]);
}
const ui = { render: di }, mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, fi = /* @__PURE__ */ a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), pi = [
  fi
];
function vi(t, e) {
  return h(), _("svg", mi, [...pi]);
}
const hi = { render: vi }, gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, bi = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), _i = [
  bi
];
function xi(t, e) {
  return h(), _("svg", gi, [..._i]);
}
const wi = { render: xi }, yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ki = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), $i = [
  ki
];
function Si(t, e) {
  return h(), _("svg", yi, [...$i]);
}
const Ci = { render: Si }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, Ai = /* @__PURE__ */ a("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), Di = /* @__PURE__ */ a("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), Mi = [
  Ai,
  Di
];
function Li(t, e) {
  return h(), _("svg", Ei, [...Mi]);
}
const kn = { render: Li }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Oi = /* @__PURE__ */ a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), Vi = [
  Oi
];
function Hi(t, e) {
  return h(), _("svg", Ti, [...Vi]);
}
const Bi = { render: Hi }, Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ii = /* @__PURE__ */ a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), Ni = [
  Ii
];
function Ui(t, e) {
  return h(), _("svg", Ri, [...Ni]);
}
const zi = { render: Ui }, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Pi = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), ji = [
  Pi
];
function qi(t, e) {
  return h(), _("svg", Fi, [...ji]);
}
const Gi = { render: qi }, Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Yi = /* @__PURE__ */ a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), Ki = [
  Yi
];
function Ji(t, e) {
  return h(), _("svg", Wi, [...Ki]);
}
const Xi = { render: Ji }, Qi = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Zi = {
  key: 0,
  class: "flex text-center"
}, ec = ["aria-label"], tc = ["aria-label"], sc = ["aria-label"], oc = ["aria-label"], nc = ["aria-label"], rc = ["aria-label"], ac = ["aria-label"], lc = {
  key: 1,
  class: "flex text-center"
}, ic = { class: "pl-2" }, cc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, dc = { class: "flex text-center items-center justify-end" }, uc = ["aria-label"], mc = ["aria-label"], fc = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, { t: n } = e.i18n, o = e.dragSelect, c = O("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen, s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    }, d = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (l, m) => (h(), _("div", Qi, [
      c.value.length ? (h(), _("div", lc, [
        a("div", ic, [
          se(b(r(n)("Search results for")) + " ", 1),
          a("span", cc, b(c.value), 1)
        ]),
        r(e).fs.loading ? (h(), J(r(kn), { key: 0 })) : W("", !0)
      ])) : (h(), _("div", Zi, [
        r(e).features.includes(r(ve).NEW_FOLDER) ? (h(), _("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": r(n)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: m[0] || (m[0] = (f) => r(e).modal.open(bn, { items: r(o).getSelected() }))
        }, [
          Q(r(Jl))
        ], 8, ec)) : W("", !0),
        r(e).features.includes(r(ve).NEW_FILE) ? (h(), _("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": r(n)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[1] || (m[1] = (f) => r(e).modal.open(_a, { items: r(o).getSelected() }))
        }, [
          Q(r(ti))
        ], 8, tc)) : W("", !0),
        r(e).features.includes(r(ve).RENAME) ? (h(), _("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": r(n)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[2] || (m[2] = (f) => r(o).getCount() !== 1 || r(e).modal.open(_n, { items: r(o).getSelected() }))
        }, [
          Q(r(ai), {
            class: be(r(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, sc)) : W("", !0),
        r(e).features.includes(r(ve).DELETE) ? (h(), _("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": r(n)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[3] || (m[3] = (f) => !r(o).getCount() || r(e).modal.open(xn, { items: r(o).getSelected() }))
        }, [
          Q(r(ui), {
            class: be(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, oc)) : W("", !0),
        r(e).features.includes(r(ve).UPLOAD) ? (h(), _("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": r(n)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[4] || (m[4] = (f) => r(e).modal.open(hl, { items: r(o).getSelected() }))
        }, [
          Q(r(hi))
        ], 8, nc)) : W("", !0),
        r(e).features.includes(r(ve).UNARCHIVE) && r(o).getCount() === 1 && r(o).getSelected()[0].mime_type === "application/zip" ? (h(), _("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": r(n)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[5] || (m[5] = (f) => !r(o).getCount() || r(e).modal.open(wn, { items: r(o).getSelected() }))
        }, [
          Q(r(Ci), {
            class: be(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, rc)) : W("", !0),
        r(e).features.includes(r(ve).ARCHIVE) ? (h(), _("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": r(n)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[6] || (m[6] = (f) => !r(o).getCount() || r(e).modal.open(yn, { items: r(o).getSelected() }))
        }, [
          Q(r(wi), {
            class: be(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ac)) : W("", !0)
      ])),
      a("div", dc, [
        r(e).features.includes(r(ve).FULL_SCREEN) ? (h(), _("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          "aria-label": r(n)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip"
        }, [
          r(e).fullScreen ? (h(), J(r(zi), { key: 0 })) : (h(), J(r(Bi), { key: 1 }))
        ], 8, uc)) : W("", !0),
        a("div", {
          class: "mx-1.5",
          "aria-label": r(n)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: m[7] || (m[7] = (f) => c.value.length || d())
        }, [
          r(e).view === "grid" ? (h(), J(r(Gi), {
            key: 0,
            class: be(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : W("", !0),
          r(e).view === "list" ? (h(), J(r(Xi), {
            key: 1,
            class: be(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : W("", !0)
        ], 8, mc)
      ])
    ]));
  }
}, pc = (t, e = 0, s = !1) => {
  let n;
  return (...o) => {
    s && !n && t(...o), clearTimeout(n), n = setTimeout(() => {
      t(...o);
    }, e);
  };
}, yo = (t, e, s) => {
  const n = O(t);
  return Mn((o, c) => ({
    get() {
      return o(), n.value;
    },
    set: pc(
      (i) => {
        n.value = i, c();
      },
      e,
      s
    )
  }));
}, vc = { class: "sm:flex sm:items-start" }, hc = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), gc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, bc = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _c = { class: "text-sm text-gray-500 pb-1" }, xc = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, wc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, yc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, kc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), $c = [
  kc
], Sc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Cc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ec = [
  Cc
], Ac = { class: "ml-1.5" }, Dc = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, Mc = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, Lc = /* @__PURE__ */ a("svg", {
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
], -1), Tc = { class: "ml-1.5 overflow-auto" }, Oc = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, Us = {
  __name: "ModalMove",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = O(e.modal.data.items.from), o = O(""), c = () => {
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
    return (i, d) => (h(), J(qe, null, {
      buttons: K(() => [
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
        a("div", Oc, b(r(s)("%s item(s) selected.", n.value.length)), 1)
      ]),
      default: K(() => [
        a("div", vc, [
          hc,
          a("div", gc, [
            a("h3", bc, b(r(s)("Move files")), 1),
            a("p", _c, b(r(s)("Are you sure you want to move these files?")), 1),
            a("div", xc, [
              (h(!0), _(ke, null, Ce(n.value, (l) => (h(), _("div", wc, [
                a("div", null, [
                  l.type === "dir" ? (h(), _("svg", yc, $c)) : (h(), _("svg", Sc, Ec))
                ]),
                a("div", Ac, b(l.path), 1)
              ]))), 256))
            ]),
            a("h4", Dc, b(r(s)("Target Directory")), 1),
            a("p", Mc, [
              Lc,
              a("span", Tc, b(r(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (h(), J(Ge, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => o.value = ""),
              error: ""
            }, {
              default: K(() => [
                se(b(o.value), 1)
              ]),
              _: 1
            })) : W("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, Hc = /* @__PURE__ */ a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), Bc = [
  Hc
];
function Rc(t, e) {
  return h(), _("svg", Vc, [...Bc]);
}
const Ic = { render: Rc }, Nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, Uc = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), zc = [
  Uc
];
function Fc(t, e) {
  return h(), _("svg", Nc, [...zc]);
}
const Pc = { render: Fc }, jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, qc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Gc = [
  qc
];
function Wc(t, e) {
  return h(), _("svg", jc, [...Gc]);
}
const Yc = { render: Wc }, Kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, Jc = /* @__PURE__ */ a("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Xc = [
  Jc
];
function Qc(t, e) {
  return h(), _("svg", Kc, [...Xc]);
}
const Zc = { render: Qc }, ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, td = /* @__PURE__ */ a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), sd = [
  td
];
function od(t, e) {
  return h(), _("svg", ed, [...sd]);
}
const nd = { render: od }, rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, ad = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), ld = [
  ad
];
function id(t, e) {
  return h(), _("svg", rd, [...ld]);
}
const cd = { render: id }, dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, ud = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), md = [
  ud
];
function fd(t, e) {
  return h(), _("svg", dd, [...md]);
}
const $n = { render: fd }, pd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, vd = /* @__PURE__ */ a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), hd = [
  vd
];
function gd(t, e) {
  return h(), _("svg", pd, [...hd]);
}
const bd = { render: gd }, _d = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, xd = ["aria-label"], wd = ["aria-label"], yd = ["aria-label"], kd = { class: "flex leading-6" }, $d = {
  key: 0,
  class: "flex"
}, Sd = /* @__PURE__ */ a("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Cd = { class: "relative" }, Ed = /* @__PURE__ */ a("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Ad = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Dd = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, Md = ["placeholder"], Ld = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, Td = ["onDrop", "onClick"], Od = { class: "flex pointer-events-none" }, Vd = { class: "inline-block w-full text-ellipsis overflow-hidden" }, Hd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = e.dragSelect, o = O(null), c = yo(0, 100);
    Mt(c, (M) => {
      const $ = o.value.children;
      let T = 0, I = 0, N = 5, z = 1;
      e.fs.limitBreadcrumbItems(N), Lt(() => {
        for (let R = $.length - 1; R >= 0 && !(T + $[R].offsetWidth > c.value - 40); R--)
          T += parseInt($[R].offsetWidth, 10), I++;
        I < z && (I = z), I > N && (I = N), e.fs.limitBreadcrumbItems(I);
      });
    });
    const i = () => {
      c.value = o.value.offsetWidth;
    };
    Ee(() => {
      new ResizeObserver(i).observe(o.value);
    });
    const d = (M, $ = null) => {
      M.preventDefault(), n.isDraggingRef.value = !1, f(M), $ ?? ($ = e.fs.hiddenBreadcrumbs.length - 1);
      let T = JSON.parse(M.dataTransfer.getData("items"));
      if (T.find((I) => I.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Us, {
        items: {
          from: T,
          to: e.fs.hiddenBreadcrumbs[$] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, l = (M, $ = null) => {
      M.preventDefault(), n.isDraggingRef.value = !1, f(M), $ ?? ($ = e.fs.breadcrumbs.length - 2);
      let T = JSON.parse(M.dataTransfer.getData("items"));
      if (T.find((I) => I.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Us, {
        items: {
          from: T,
          to: e.fs.breadcrumbs[$] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (M) => {
      M.preventDefault(), e.fs.isGoUpAvailable() ? (M.dataTransfer.dropEffect = "copy", M.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (M.dataTransfer.dropEffect = "none", M.dataTransfer.effectAllowed = "none");
    }, f = (M) => {
      M.preventDefault(), M.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && M.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      g(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, u = () => {
      g(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, p = (M) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: M.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, S = {
      mounted(M, $, T, I) {
        M.clickOutsideEvent = function(N) {
          M === N.target || M.contains(N.target) || $.value();
        }, document.body.addEventListener("click", M.clickOutsideEvent);
      },
      beforeUnmount(M, $, T, I) {
        document.body.removeEventListener("click", M.clickOutsideEvent);
      }
    }, k = O(null), A = () => {
      e.features.includes(ve.SEARCH) && (e.fs.searchMode = !0, Lt(() => k.value.focus()));
    }, w = yo("", 400);
    Mt(w, (M) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: M });
    });
    const g = () => {
      e.fs.searchMode = !1, w.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      g();
    });
    const B = () => {
      w.value === "" && g();
    };
    return (M, $) => (h(), _("div", _d, [
      a("span", {
        "aria-label": r(s)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        Q(r(Pc), {
          onDragover: $[0] || ($[0] = (T) => m(T)),
          onDragleave: $[1] || ($[1] = (T) => f(T)),
          onDrop: $[2] || ($[2] = (T) => l(T)),
          onClick: u,
          class: be(r(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, xd),
      r(e).fs.loading ? (h(), _("span", {
        key: 1,
        "aria-label": r(s)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        Q(r(Yc), {
          onClick: $[3] || ($[3] = (T) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, yd)) : (h(), _("span", {
        key: 0,
        "aria-label": r(s)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        Q(r(Ic), { onClick: v })
      ], 8, wd)),
      he(a("div", {
        onClick: Ze(A, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        a("div", null, [
          Q(r(Zc), {
            onDragover: $[4] || ($[4] = (T) => m(T)),
            onDragleave: $[5] || ($[5] = (T) => f(T)),
            onDrop: $[6] || ($[6] = (T) => l(T, -1)),
            onClick: $[7] || ($[7] = (T) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter } }))
          })
        ]),
        a("div", kd, [
          r(e).fs.hiddenBreadcrumbs.length ? he((h(), _("div", $d, [
            Sd,
            a("div", Cd, [
              a("span", {
                onDragenter: $[8] || ($[8] = (T) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: $[9] || ($[9] = (T) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                Q(r(bd), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [S, x]
          ]) : W("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: o,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: Ze(A, ["self"])
        }, [
          (h(!0), _(ke, null, Ce(r(e).fs.breadcrumbs, (T, I) => (h(), _("div", { key: I }, [
            Ed,
            a("span", {
              onDragover: (N) => I === r(e).fs.breadcrumbs.length - 1 || m(N),
              onDragleave: (N) => I === r(e).fs.breadcrumbs.length - 1 || f(N),
              onDrop: (N) => I === r(e).fs.breadcrumbs.length - 1 || l(N, I),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: T.basename,
              onClick: (N) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter, path: T.path } })
            }, b(T.name), 41, Ad)
          ]))), 128))
        ], 512),
        r(e).fs.loading ? (h(), J(r(kn), { key: 0 })) : W("", !0)
      ], 512), [
        [Xe, !r(e).fs.searchMode]
      ]),
      he(a("div", Dd, [
        a("div", null, [
          Q(r(nd))
        ]),
        he(a("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: St(g, ["esc"]),
          onBlur: B,
          "onUpdate:modelValue": $[10] || ($[10] = (T) => Eo(w) ? w.value = T : null),
          placeholder: r(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Md), [
          [Ct, r(w)]
        ]),
        Q(r(cd), { onClick: g })
      ], 512), [
        [Xe, r(e).fs.searchMode]
      ]),
      he(a("div", Ld, [
        (h(!0), _(ke, null, Ce(r(e).fs.hiddenBreadcrumbs, (T, I) => (h(), _("div", {
          key: I,
          onDragover: $[11] || ($[11] = (N) => m(N)),
          onDragleave: $[12] || ($[12] = (N) => f(N)),
          onDrop: (N) => d(N, I),
          onClick: (N) => p(T),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          a("div", Od, [
            a("span", null, [
              Q(r($n), { class: "h-5 w-5" })
            ]),
            se(),
            a("span", Vd, b(T.name), 1)
          ])
        ], 40, Td))), 128))
      ], 512), [
        [Xe, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Sn = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Bd = ["onClick"], Rd = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, n = O(s("full-screen", !1)), o = O([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
      o.value.splice(l, 1);
    }, d = (l) => {
      let m = o.value.findIndex((f) => f.id === l);
      m !== -1 && i(m);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let m = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = m, o.value.push(l), setTimeout(() => {
        d(m);
      }, 5e3);
    }), (l, m) => (h(), _("div", {
      class: be([n.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      Q(Ln, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: K(() => [
          (h(!0), _(ke, null, Ce(o.value, (f, v) => (h(), _("div", {
            onClick: (u) => i(v),
            key: f,
            class: be([c(f.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, b(f.label), 11, Bd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, Nd = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), Ud = [
  Nd
];
function zd(t, e) {
  return h(), _("svg", Id, [...Ud]);
}
const Fd = { render: zd }, Pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, jd = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), qd = [
  jd
];
function Gd(t, e) {
  return h(), _("svg", Pd, [...qd]);
}
const Wd = { render: Gd }, qt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (h(), _("div", null, [
      t.direction === "asc" ? (h(), J(r(Fd), { key: 0 })) : W("", !0),
      t.direction === "desc" ? (h(), J(r(Wd), { key: 1 })) : W("", !0)
    ]));
  }
}, Yd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, Kd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), Jd = [
  Kd
];
function Xd(t, e) {
  return h(), _("svg", Yd, [...Jd]);
}
const Qd = { render: Xd }, ys = {
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
      t.type === "dir" ? (h(), J(r($n), {
        key: 0,
        class: be({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"])) : (h(), J(r(Qd), {
        key: 1,
        class: be({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, Zd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, eu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), tu = [
  eu
];
function su(t, e) {
  return h(), _("svg", Zd, [...tu]);
}
const ou = { render: su }, nu = { class: "absolute -z-50 -top-96" }, ru = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, au = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, n) => (h(), _("div", nu, [
      Q(r(ou)),
      a("div", ru, b(e.count), 1)
    ]));
  }
}, lu = { class: "flex" }, iu = ["aria-label"], cu = { class: "ml-auto mb-2" }, du = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, uu = { key: 1 }, mu = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = O(""), o = O(""), c = O(null), i = O(!1), d = O(""), l = O(!1), m = le("ServiceContainer"), { t: f } = m.i18n;
    Ee(() => {
      m.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: m.modal.data.adapter, path: m.modal.data.item.path },
        responseType: "text"
      }).then((p) => {
        n.value = p, s("success");
      });
    });
    const v = () => {
      i.value = !i.value, o.value = n.value;
    }, u = () => {
      d.value = "", l.value = !1, m.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: m.modal.data.adapter,
          path: m.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((p) => {
        d.value = f("Updated."), n.value = p, s("success"), i.value = !i.value;
      }).catch((p) => {
        d.value = f(p.message), l.value = !0;
      });
    };
    return (p, x) => (h(), _(ke, null, [
      a("div", lu, [
        a("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(m).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(m).modal.data.item.basename), 9, iu),
        a("div", cu, [
          i.value ? (h(), _("button", {
            key: 0,
            onClick: u,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(r(f)("Save")), 1)) : W("", !0),
          r(m).features.includes(r(ve).EDIT) ? (h(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: x[0] || (x[0] = (S) => v())
          }, b(i.value ? r(f)("Cancel") : r(f)("Edit")), 1)) : W("", !0)
        ])
      ]),
      a("div", null, [
        i.value ? (h(), _("div", uu, [
          he(a("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": x[1] || (x[1] = (S) => o.value = S),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ct, o.value]
          ])
        ])) : (h(), _("pre", du, b(n.value), 1)),
        d.value.length ? (h(), J(Ge, {
          key: 2,
          onHidden: x[2] || (x[2] = (S) => d.value = ""),
          error: l.value
        }, {
          default: K(() => [
            se(b(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : W("", !0)
      ])
    ], 64));
  }
}, fu = { class: "flex" }, pu = ["aria-label"], vu = { class: "ml-auto mb-2" }, hu = { class: "w-full flex justify-center" }, gu = ["src"], bu = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = le("ServiceContainer"), { t: o } = n.i18n, c = O(null), i = O(null), d = O(!1), l = O(""), m = O(!1), f = () => {
      d.value = !d.value, d.value ? i.value = new Un(c.value, {
        crop(u) {
        }
      }) : i.value.destroy();
    }, v = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (u) => {
          l.value = "", m.value = !1;
          const p = new FormData();
          p.set("file", u), n.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: n.modal.data.adapter,
              path: n.modal.data.item.path
            },
            body: p
          }).then((x) => {
            l.value = o("Updated."), c.value.src = n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item), f(), s("success");
          }).catch((x) => {
            l.value = o(x.message), m.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      s("success");
    }), (u, p) => (h(), _(ke, null, [
      a("div", fu, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(n).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(n).modal.data.item.basename), 9, pu),
        a("div", vu, [
          d.value ? (h(), _("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, b(r(o)("Crop")), 1)) : W("", !0),
          r(n).features.includes(r(ve).EDIT) ? (h(), _("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: p[0] || (p[0] = (x) => f())
          }, b(d.value ? r(o)("Cancel") : r(o)("Edit")), 1)) : W("", !0)
        ])
      ]),
      a("div", hu, [
        a("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: r(n).requester.getPreviewUrl(r(n).modal.data.adapter, r(n).modal.data.item),
          alt: ""
        }, null, 8, gu)
      ]),
      l.value.length ? (h(), J(Ge, {
        key: 0,
        onHidden: p[1] || (p[1] = (x) => l.value = ""),
        error: m.value
      }, {
        default: K(() => [
          se(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : W("", !0)
    ], 64));
  }
}, _u = { class: "flex" }, xu = ["aria-label"], wu = /* @__PURE__ */ a("div", null, null, -1), yu = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = le("ServiceContainer"), n = e;
    return Ee(() => {
      n("success");
    }), (o, c) => (h(), _(ke, null, [
      a("div", _u, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": r(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, b(r(s).modal.data.item.basename), 9, xu)
      ]),
      wu
    ], 64));
  }
}, ku = ["aria-label"], $u = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, Su = ["src"], Cu = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = le("ServiceContainer"), n = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      n("success");
    }), (c, i) => (h(), _("div", null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(s).modal.data.item.basename), 9, ku),
      a("div", null, [
        a("video", $u, [
          a("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, Su),
          se(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Eu = ["aria-label"], Au = {
  class: "w-full",
  controls: ""
}, Du = ["src"], Mu = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, n = le("ServiceContainer"), o = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      s("success");
    }), (c, i) => (h(), _(ke, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(n).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(n).modal.data.item.basename), 9, Eu),
      a("div", null, [
        a("audio", Au, [
          a("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, Du),
          se(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, Lu = ["aria-label"], Tu = ["data"], Ou = ["src"], Vu = /* @__PURE__ */ a("p", null, [
  /* @__PURE__ */ se(" Your browser does not support PDFs. "),
  /* @__PURE__ */ a("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ se(" . ")
], -1), Hu = [
  Vu
], Bu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = le("ServiceContainer"), n = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      n("success");
    }), (c, i) => (h(), _(ke, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": r(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, b(r(s).modal.data.item.basename), 9, Lu),
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
          }, Hu, 8, Ou)
        ], 8, Tu)
      ])
    ], 64));
  }
}, Ru = { class: "sm:flex sm:items-start" }, Iu = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Nu = { key: 0 }, Uu = { class: "text-gray-700 dark:text-gray-200 text-sm" }, zu = {
  key: 0,
  class: "flex leading-5"
}, Fu = /* @__PURE__ */ a("svg", {
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
], -1), Pu = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, ju = { class: "font-bold" }, qu = { class: "font-bold pl-2" }, Gu = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Wu = ["download", "href"], Cn = {
  __name: "ModalPreview",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = O(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(ve.PREVIEW);
    return c || (n.value = !0), (i, d) => (h(), J(qe, null, {
      buttons: K(() => [
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
        }, b(r(s)("Download")), 9, Wu)) : W("", !0)
      ]),
      default: K(() => [
        a("div", Ru, [
          a("div", Iu, [
            r(c) ? (h(), _("div", Nu, [
              o("text") ? (h(), J(mu, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => n.value = !0)
              })) : o("image") ? (h(), J(bu, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => n.value = !0)
              })) : o("video") ? (h(), J(Cu, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => n.value = !0)
              })) : o("audio") ? (h(), J(Mu, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => n.value = !0)
              })) : o("application/pdf") ? (h(), J(Bu, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => n.value = !0)
              })) : (h(), J(yu, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => n.value = !0)
              }))
            ])) : W("", !0),
            a("div", Uu, [
              n.value === !1 ? (h(), _("div", zu, [
                Fu,
                a("span", null, b(r(s)("Loading")), 1)
              ])) : W("", !0)
            ])
          ])
        ]),
        a("div", Pu, [
          a("div", null, [
            a("span", ju, b(r(s)("File Size")) + ": ", 1),
            se(b(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", qu, b(r(s)("Last Modified")) + ": ", 1),
            se(" " + b(r(Sn)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(ve).DOWNLOAD) ? (h(), _("div", Gu, [
          a("span", null, b(r(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : W("", !0)
      ]),
      _: 1
    }));
  }
}, Yu = ["data-type", "data-item", "data-index"], ks = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = le("ServiceContainer"), s = e.dragSelect, n = t, o = (u) => {
      u.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: u.path } })) : e.modal.open(Cn, { adapter: e.fs.adapter, item: u });
    }, c = {
      mounted(u, p, x, S) {
        x.props.draggable && (u.addEventListener("dragstart", (k) => i(k, p.value)), u.addEventListener("dragover", (k) => l(k, p.value)), u.addEventListener("drop", (k) => d(k, p.value)));
      },
      beforeUnmount(u, p, x, S) {
        x.props.draggable && (u.removeEventListener("dragstart", i), u.removeEventListener("dragover", l), u.removeEventListener("drop", d));
      }
    }, i = (u, p) => {
      if (u.altKey || u.ctrlKey || u.metaKey)
        return u.preventDefault(), !1;
      s.isDraggingRef.value = !0, u.dataTransfer.setDragImage(n.dragImage.$el, 0, 15), u.dataTransfer.effectAllowed = "all", u.dataTransfer.dropEffect = "copy", u.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (u, p) => {
      u.preventDefault(), s.isDraggingRef.value = !1;
      let x = JSON.parse(u.dataTransfer.getData("items"));
      if (x.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Us, { items: { from: x, to: p } });
    }, l = (u, p) => {
      u.preventDefault(), !p || p.type !== "dir" || s.getSelection().find((x) => x === u.currentTarget) ? (u.dataTransfer.dropEffect = "none", u.dataTransfer.effectAllowed = "none") : u.dataTransfer.dropEffect = "copy";
    };
    let m = null;
    const f = () => {
      m && clearTimeout(m);
    }, v = (u) => {
      m = setTimeout(() => {
        const p = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: u.target.getBoundingClientRect().x,
          clientY: u.target.getBoundingClientRect().y
        });
        u.target.dispatchEvent(p);
      }, 500);
    };
    return (u, p) => he((h(), _("div", {
      style: zs({ opacity: r(s).isDraggingRef.value && r(s).getSelection().find((x) => u.$el === x) ? "0.5 !important" : "" }),
      class: be(["vf-item-" + r(s).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: p[0] || (p[0] = (x) => o(t.item)),
      onTouchstart: p[1] || (p[1] = (x) => v(x)),
      onTouchend: p[2] || (p[2] = (x) => f()),
      onContextmenu: p[3] || (p[3] = Ze((x) => r(e).emitter.emit("vf-contextmenu-show", { event: x, items: r(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Tt(u.$slots, "default")
    ], 46, Yu)), [
      [c, t.item]
    ]);
  }
}, Ku = { class: "relative flex-auto flex flex-col overflow-hidden" }, Ju = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, Xu = { class: "relative" }, Qu = { class: "grid grid-cols-12 items-center" }, Zu = { class: "flex col-span-7 items-center" }, e0 = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, t0 = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, s0 = { class: "grid grid-cols-12 items-center" }, o0 = { class: "flex col-span-7 items-center" }, n0 = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, r0 = { class: "col-span-2 text-center" }, a0 = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, l0 = { class: "relative" }, i0 = ["data-src", "alt"], c0 = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, d0 = { class: "break-all" }, u0 = {
  __name: "Explorer",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = (v) => v == null ? void 0 : v.substring(0, 3), o = O(null), c = O(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v, v ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: v
        },
        onSuccess: (u) => {
          u.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = Ht({ active: !1, column: "", order: "" }), m = (v = !0) => {
      let u = [...e.fs.data.files], p = l.column, x = l.order === "asc" ? 1 : -1;
      if (!v)
        return u;
      const S = (k, A) => typeof k == "string" && typeof A == "string" ? k.toLowerCase().localeCompare(A.toLowerCase()) : k < A ? -1 : k > A ? 1 : 0;
      return l.active && (u = u.slice().sort((k, A) => S(k[p], A[p]) * x)), u;
    }, f = (v) => {
      l.active && l.column === v ? (l.active = l.order === "asc", l.column = v, l.order = "desc") : (l.active = !0, l.column = v, l.order = "asc");
    };
    return Ee(() => {
      d = new Nn(i.area.value);
    }), So(() => {
      d.update();
    }), Co(() => {
      d.destroy();
    }), (v, u) => (h(), _("div", Ku, [
      r(e).view === "list" || c.value.length ? (h(), _("div", Ju, [
        a("div", {
          onClick: u[0] || (u[0] = (p) => f("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          se(b(r(s)("Name")) + " ", 1),
          he(Q(qt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Xe, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? W("", !0) : (h(), _("div", {
          key: 0,
          onClick: u[1] || (u[1] = (p) => f("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          se(b(r(s)("Size")) + " ", 1),
          he(Q(qt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Xe, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? W("", !0) : (h(), _("div", {
          key: 1,
          onClick: u[2] || (u[2] = (p) => f("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          se(b(r(s)("Date")) + " ", 1),
          he(Q(qt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Xe, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (h(), _("div", {
          key: 2,
          onClick: u[3] || (u[3] = (p) => f("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          se(b(r(s)("Filepath")) + " ", 1),
          he(Q(qt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Xe, l.active && l.column === "path"]
          ])
        ])) : W("", !0)
      ])) : W("", !0),
      a("div", Xu, [
        Q(au, {
          ref_key: "dragImage",
          ref: o,
          count: r(i).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(i).scrollBarContainer,
        class: "vf-explorer-scrollbar-container"
      }, [
        a("div", {
          ref: r(i).scrollBar,
          class: "w-3"
        }, null, 512)
      ], 512),
      a("div", {
        ref: r(i).area,
        class: be([{ "resize-y": !r(e).fullScreen }, "h-full w-full text-xs select-none vf-explorer-scrollbar vf-selector-area min-h-[150px] z-0 overflow-y-auto"]),
        onContextmenu: u[4] || (u[4] = Ze((p) => r(e).emitter.emit("vf-contextmenu-show", { event: p, items: r(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (h(!0), _(ke, { key: 0 }, Ce(m(), (p, x) => (h(), J(ks, {
          item: p,
          index: x,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: K(() => [
            a("div", Qu, [
              a("div", Zu, [
                Q(ys, {
                  type: p.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", e0, b(p.basename), 1)
              ]),
              a("div", t0, b(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : W("", !0),
        r(e).view === "list" && !c.value.length ? (h(!0), _(ke, { key: 1 }, Ce(m(), (p, x) => (h(), J(ks, {
          item: p,
          index: x,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true"
        }, {
          default: K(() => [
            a("div", s0, [
              a("div", o0, [
                Q(ys, {
                  type: p.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", n0, b(p.basename), 1)
              ]),
              a("div", r0, b(p.file_size ? r(e).filesize(p.file_size) : ""), 1),
              a("div", a0, b(r(Sn)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : W("", !0),
        r(e).view === "grid" && !c.value.length ? (h(!0), _(ke, { key: 2 }, Ce(m(!1), (p, x) => (h(), J(ks, {
          item: p,
          index: x,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: K(() => [
            a("div", null, [
              a("div", l0, [
                (p.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (h(), _("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, i0)) : (h(), J(ys, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && p.type !== "dir" ? (h(), _("div", c0, b(n(p.extension)), 1)) : W("", !0)
              ]),
              a("span", d0, b(r(Ns)(p.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : W("", !0)
      ], 34),
      Q(Rd)
    ]));
  }
}, m0 = ["href", "download"], f0 = ["onClick"], p0 = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, n = O(null), o = O([]), c = O(""), i = Ht({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = at(() => i.items.filter((v) => v.key == null || e.features.includes(v.key)));
    e.emitter.on("vf-context-selected", (v) => {
      o.value = v;
    });
    const l = {
      newfolder: {
        key: ve.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(bn)
      },
      delete: {
        key: ve.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.modal.open(xn, { items: o });
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
        action: () => e.modal.open(Cn, { adapter: e.fs.adapter, item: o.value[0] })
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
        link: at(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: ve.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(yn, { items: o })
      },
      unarchive: {
        key: ve.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(wn, { items: o })
      },
      rename: {
        key: ve.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(_n, { items: o })
      }
    }, m = (v) => {
      e.emitter.emit("vf-contextmenu-hide"), v.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v;
    }), e.emitter.on("vf-contextmenu-show", ({ event: v, items: u, target: p = null }) => {
      if (i.items = [], c.value)
        if (p)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else
        !p && !c.value ? (i.items.push(l.refresh), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : u.length > 1 && u.some((x) => x.path === p.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", u)) : (p.type === "dir" ? i.items.push(l.open) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), p.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [p]));
      f(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (v) => {
      const u = e.dragSelect.area.value, p = e.root.getBoundingClientRect(), x = u.getBoundingClientRect();
      let S = v.clientX - p.left, k = v.clientY - p.top;
      i.active = !0, Lt(() => {
        var B;
        const A = (B = n.value) == null ? void 0 : B.getBoundingClientRect();
        let w = (A == null ? void 0 : A.height) ?? 0, g = (A == null ? void 0 : A.width) ?? 0;
        S = x.right - v.pageX + window.scrollX < g ? S - g : S, k = x.bottom - v.pageY + window.scrollY < w ? k - w : k, i.positions = {
          left: S + "px",
          top: k + "px"
        };
      });
    };
    return (v, u) => he((h(), _("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: zs(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (h(!0), _(ke, null, Ce(d.value, (p) => (h(), _("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: p.title
      }, [
        p.link ? (h(), _("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: p.link,
          download: p.link,
          onClick: u[0] || (u[0] = (x) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(p.title()), 1)
        ], 8, m0)) : (h(), _("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (x) => m(p)
        }, [
          a("span", null, b(p.title()), 1)
        ], 8, f0))
      ]))), 128))
    ], 4)), [
      [Xe, i.active]
    ]);
  }
}, v0 = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, o] of e)
    s[n] = o;
  return s;
}, h0 = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: s }) {
    const n = le("ServiceContainer"), o = O(!1), { t: c } = n.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), o.value = !0, i = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      n.emitter.on(t.on, d);
    }), $o(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: c
    };
  }
}, g0 = { key: 1 };
function b0(t, e, s, n, o, c) {
  return h(), _("div", {
    class: be(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !n.shown }]])
  }, [
    t.$slots.default ? Tt(t.$slots, "default", { key: 0 }) : (h(), _("span", g0, b(n.t("Saved.")), 1))
  ], 2);
}
const ft = /* @__PURE__ */ v0(h0, [["render", b0]]), _0 = { class: "sm:flex sm:items-start" }, x0 = /* @__PURE__ */ a("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), w0 = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, y0 = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, k0 = { class: "mt-2" }, $0 = { class: "text-sm text-gray-500" }, S0 = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, C0 = { class: "mt-3 text-left" }, E0 = { class: "space-y-2" }, A0 = { class: "flex relative gap-x-3" }, D0 = { class: "h-6 items-center" }, M0 = { class: "flex-1 block text-sm" }, L0 = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, T0 = { class: "flex relative gap-x-3" }, O0 = { class: "h-6 items-center" }, V0 = { class: "flex-1 block text-sm" }, H0 = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, B0 = { class: "flex relative gap-x-3" }, R0 = { class: "h-6 items-center" }, I0 = { class: "flex-1 block text-sm" }, N0 = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, U0 = { class: "flex relative gap-x-3" }, z0 = { class: "h-6 items-center" }, F0 = { class: "flex-1 block text-sm" }, P0 = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, j0 = { class: "flex relative gap-x-3" }, q0 = { class: "h-6 items-center" }, G0 = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, W0 = { class: "flex text-sm" }, Y0 = ["label"], K0 = ["value"], J0 = {
  key: 0,
  class: "flex relative gap-x-3"
}, X0 = { class: "h-6 items-center" }, Q0 = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, Z0 = { class: "flex text-sm" }, em = ["label"], tm = ["value"], sm = {
  __name: "ModalAbout",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: s, clearStore: n } = e.storage, { t: o, changeLocale: c, locale: i } = e.i18n, d = async () => {
      n(), location.reload();
    }, l = (A) => {
      e.theme.set(A), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Do : Ao, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, f = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, u = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: p } = le("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([A]) => Object.keys(p).includes(A))
    ), k = at(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (A, w) => (h(), J(qe, null, {
      buttons: K(() => [
        a("button", {
          type: "button",
          onClick: w[8] || (w[8] = (g) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(o)("Close")), 1)
      ]),
      default: K(() => [
        a("div", _0, [
          x0,
          a("div", w0, [
            a("h3", y0, b(r(o)("About %s", "Vuefinder " + r(e).version)), 1),
            a("div", k0, [
              a("p", $0, b(r(o)("Vuefinder is a file manager component for vue 3.")), 1),
              a("div", null, [
                a("h3", S0, b(r(o)("Settings")), 1)
              ]),
              a("div", C0, [
                a("fieldset", null, [
                  a("div", E0, [
                    a("div", A0, [
                      a("div", D0, [
                        he(a("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": w[0] || (w[0] = (g) => r(e).metricUnits = g),
                          onClick: m,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).metricUnits]
                        ])
                      ]),
                      a("div", M0, [
                        a("label", L0, [
                          se(b(r(o)("Use Metric Units")) + " ", 1),
                          Q(ft, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: K(() => [
                              se(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", T0, [
                      a("div", O0, [
                        he(a("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": w[1] || (w[1] = (g) => r(e).compactListView = g),
                          onClick: f,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).compactListView]
                        ])
                      ]),
                      a("div", V0, [
                        a("label", H0, [
                          se(b(r(o)("Compact list view")) + " ", 1),
                          Q(ft, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: K(() => [
                              se(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", B0, [
                      a("div", R0, [
                        he(a("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": w[2] || (w[2] = (g) => r(e).persist = g),
                          onClick: u,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).persist]
                        ])
                      ]),
                      a("div", I0, [
                        a("label", N0, [
                          se(b(r(o)("Persist path on reload")) + " ", 1),
                          Q(ft, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: K(() => [
                              se(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", U0, [
                      a("div", z0, [
                        he(a("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": w[3] || (w[3] = (g) => r(e).showThumbnails = g),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ft, r(e).showThumbnails]
                        ])
                      ]),
                      a("div", F0, [
                        a("label", P0, [
                          se(b(r(o)("Show thumbnails")) + " ", 1),
                          Q(ft, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: K(() => [
                              se(b(r(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", j0, [
                      a("div", q0, [
                        a("label", G0, b(r(o)("Theme")), 1)
                      ]),
                      a("div", W0, [
                        he(a("select", {
                          id: "theme",
                          "onUpdate:modelValue": w[4] || (w[4] = (g) => r(e).theme.value = g),
                          onChange: w[5] || (w[5] = (g) => l(g.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: r(o)("Theme")
                          }, [
                            (h(!0), _(ke, null, Ce(k.value, (g, B) => (h(), _("option", { value: B }, b(g), 9, K0))), 256))
                          ], 8, Y0)
                        ], 544), [
                          [$s, r(e).theme.value]
                        ]),
                        Q(ft, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: K(() => [
                            se(b(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    r(e).features.includes(r(ve).LANGUAGE) && Object.keys(r(S)).length > 1 ? (h(), _("div", J0, [
                      a("div", X0, [
                        a("label", Q0, b(r(o)("Language")), 1)
                      ]),
                      a("div", Z0, [
                        he(a("select", {
                          id: "language",
                          "onUpdate:modelValue": w[6] || (w[6] = (g) => Eo(i) ? i.value = g : null),
                          onChange: w[7] || (w[7] = (g) => r(c)(g.target.value)),
                          class: "flex-shrink-0 w-1/2 sm:w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: r(o)("Language")
                          }, [
                            (h(!0), _(ke, null, Ce(r(S), (g, B) => (h(), _("option", { value: B }, b(g), 9, tm))), 256))
                          ], 8, em)
                        ], 544), [
                          [$s, r(i)]
                        ]),
                        Q(ft, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: K(() => [
                            se(b(r(o)("Saved.")), 1)
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
}, om = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, nm = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), rm = [
  nm
];
function am(t, e) {
  return h(), _("svg", om, [...rm]);
}
const lm = { render: am }, im = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, cm = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), dm = [
  cm
];
function um(t, e) {
  return h(), _("svg", im, [...dm]);
}
const mm = { render: um }, fm = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, pm = { class: "flex leading-5 items-center" }, vm = ["aria-label"], hm = ["value"], gm = { class: "ml-3" }, bm = { key: 0 }, _m = { class: "ml-1" }, xm = { class: "flex leading-5 items-center justify-end" }, wm = ["disabled"], ym = ["aria-label"], km = {
  __name: "Statusbar",
  setup(t) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { setStore: n } = e.storage, o = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), n("adapter", e.fs.adapter);
    }, i = O("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = at(() => {
      const l = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, m) => (h(), _("div", fm, [
      a("div", pm, [
        a("div", {
          class: "mx-2",
          "aria-label": r(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, [
          Q(r(lm))
        ], 8, vm),
        he(a("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (f) => r(e).fs.adapter = f),
          onChange: c,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (h(!0), _(ke, null, Ce(r(e).fs.data.storages, (f) => (h(), _("option", { value: f }, b(f), 9, hm))), 256))
        ], 544), [
          [$s, r(e).fs.adapter]
        ]),
        a("div", gm, [
          i.value.length ? (h(), _("span", bm, b(r(e).fs.data.files.length) + " items found. ", 1)) : W("", !0),
          a("span", _m, b(r(e).dragSelect.getCount() > 0 ? r(s)("%s item(s) selected.", r(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", xm, [
        r(e).selectButton.active ? (h(), _("button", {
          key: 0,
          class: be(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: m[1] || (m[1] = (f) => r(e).selectButton.click(r(o).getSelected(), f))
        }, b(r(s)("Select")), 11, wm)) : W("", !0),
        a("span", {
          class: "mr-1",
          "aria-label": r(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: m[2] || (m[2] = (f) => r(e).modal.open(sm))
        }, [
          Q(r(mm))
        ], 8, ym)
      ])
    ]));
  }
}, $m = {
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
    const s = e, o = Xr(t, le("VueFinderOptions"));
    Tn("ServiceContainer", o);
    const { setStore: c } = o.storage, i = O(null);
    o.root = i;
    const d = o.dragSelect, l = (f) => {
      Object.assign(o.fs.data, f), d.clearSelection(), d.refreshSelection();
    };
    let m;
    return o.emitter.on("vf-fetch-abort", () => {
      m.abort(), o.fs.loading = !1;
    }), o.emitter.on("vf-fetch", ({ params: f, body: v = null, onSuccess: u = null, onError: p = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(f.q) && (m && m.abort(), o.fs.loading = !0), m = new AbortController();
      const S = m.signal;
      o.requester.send({
        url: "",
        method: f.m || "get",
        params: f,
        body: v,
        abortSignal: S
      }).then((k) => {
        o.fs.adapter = k.adapter, o.persist && (o.fs.path = k.dirname, c("path", o.fs.path)), ["index", "search"].includes(f.q) && (o.fs.loading = !1), x || o.modal.close(), l(k), u && u(k);
      }).catch((k) => {
        console.error(k), p && p(k);
      });
    }), Ee(() => {
      let f = {};
      o.fs.path.includes("://") && (f = {
        adapter: o.fs.path.split("://")[0],
        path: o.fs.path
      }), o.emitter.emit("vf-fetch", { params: { q: "index", adapter: o.fs.adapter, ...f } }), d.onSelect((v) => {
        s("select", v);
      });
    }), (f, v) => (h(), _("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i
    }, [
      a("div", {
        class: be(r(o).theme.actualValue)
      }, [
        a("div", {
          class: be([r(o).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: zs(r(o).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: v[0] || (v[0] = (u) => r(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = (u) => r(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          Q(fc),
          Q(Hd),
          Q(u0),
          Q(km)
        ], 38),
        Q(On, { name: "fade" }, {
          default: K(() => [
            r(o).modal.visible ? (h(), J(Vn(r(o).modal.type), { key: 0 })) : W("", !0)
          ]),
          _: 1
        }),
        Q(p0)
      ], 2)
    ], 512));
  }
}, Hm = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", $m);
  }
};
export {
  Hm as default
};
