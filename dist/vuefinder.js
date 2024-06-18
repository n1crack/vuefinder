var tr = Object.defineProperty;
var sr = (t, e, s) => e in t ? tr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var mn = (t, e, s) => sr(t, typeof e != "symbol" ? e + "" : e, s);
import { reactive as St, watch as Ne, ref as E, shallowRef as nr, onMounted as Ce, onUnmounted as Gs, onUpdated as Bn, nextTick as pt, computed as it, inject as ae, openBlock as m, createElementBlock as g, withKeys as Ct, unref as o, createElementVNode as a, withModifiers as rt, renderSlot as Lt, normalizeClass as de, toDisplayString as y, createBlock as W, resolveDynamicComponent as In, withCtx as se, createVNode as q, Fragment as pe, renderList as $e, createCommentVNode as z, withDirectives as ve, vModelCheckbox as jt, createTextVNode as Q, vModelSelect as Cs, isRef as Nn, vModelText as Et, onBeforeUnmount as Un, customRef as or, vShow as ze, TransitionGroup as rr, normalizeStyle as rs, mergeModels as ar, useModel as Pn, resolveComponent as lr, provide as ir, Transition as cr } from "vue";
import dr from "mitt";
import ur from "dragselect";
import fr from "@uppy/core";
import mr from "@uppy/xhr-upload";
import pr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import hr from "cropperjs";
var Hn;
const ys = (Hn = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Hn.getAttribute("content");
class vr {
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
    ys != null && ys !== "" && (r[s.xsrfHeaderName] = ys);
    const n = Object.assign({}, s.headers, r, e.headers), c = Object.assign({}, s.params, e.params), i = e.body, d = s.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (i instanceof FormData ? (u = i, s.body != null && Object.entries(this.config.body).forEach(([f, v]) => {
      u.append(f, v);
    })) : (u = { ...i }, s.body != null && Object.assign(u, this.config.body)));
    const h = {
      url: d,
      method: l,
      headers: n,
      params: c,
      body: u
    };
    if (s.transformRequest != null) {
      const f = s.transformRequest({
        url: d,
        method: l,
        headers: n,
        params: c,
        body: u
      });
      f.url != null && (h.url = f.url), f.method != null && (h.method = f.method), f.params != null && (h.params = f.params ?? {}), f.headers != null && (h.headers = f.headers ?? {}), f.body != null && (h.body = f.body);
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
function gr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new vr(e);
}
function _r(t) {
  let e = localStorage.getItem(t + "_storage");
  const s = St(JSON.parse(e ?? "{}"));
  Ne(s, r);
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
async function yr(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function br(t, e, s, r) {
  const { getStore: n, setStore: c } = t, i = E({}), d = E(n("locale", e)), l = (f, v = e) => {
    yr(f, r).then((p) => {
      i.value = p, c("locale", f), d.value = f, c("translations", p), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + f }), s.emit("vf-language-saved"));
    }).catch((p) => {
      v ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(v, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !n("locale") && !r.length ? l(e) : i.value = n("translations");
  const u = (f, ...v) => v.length ? u(f = f.replace("%s", v.shift()), ...v) : f;
  function h(f, ...v) {
    return i.value && i.value.hasOwnProperty(f) ? u(i.value[f], ...v) : u(f, ...v);
  }
  return St({ t: h, changeLocale: l, locale: d });
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
}, xr = Object.values(he), wr = "2.5.10";
function zn(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1024, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B");
}
function qn(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1e3, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "B" : "B");
}
function kr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const st = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function $r(t, e) {
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
function Sr() {
  const t = nr(null), e = E(!1), s = E();
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
const Le = (t, e) => {
  const { o: s, i: r, u: n } = t;
  let c = s, i;
  const d = (h, f) => {
    const v = c, p = h, _ = f || (r ? !r(v, p) : v !== p);
    return (_ || n) && (c = p, i = v), [c, _, i];
  };
  return [e ? (h) => d(e(c, i), h) : d, (h) => [c, !!h, i]];
}, jn = typeof window < "u" && typeof document < "u", Me = jn ? window : {}, Gn = Math.max, Cr = Math.min, Es = Math.round, Qt = Math.abs, pn = Math.sign, Kn = Me.cancelAnimationFrame, Ks = Me.requestAnimationFrame, Zt = Me.setTimeout, Ts = Me.clearTimeout, as = (t) => typeof Me[t] < "u" ? Me[t] : void 0, Er = as("MutationObserver"), hn = as("IntersectionObserver"), es = as("ResizeObserver"), As = as("ScrollTimeline"), Wn = jn && Node.ELEMENT_NODE, { toString: $p, hasOwnProperty: bs } = Object.prototype, ls = (t) => t === void 0, Ws = (t) => t === null, je = (t) => typeof t == "number", is = (t) => typeof t == "string", Yn = (t) => typeof t == "boolean", Be = (t) => typeof t == "function", Ge = (t) => Array.isArray(t), Ot = (t) => typeof t == "object" && !Ge(t) && !Ws(t), cs = (t) => {
  const e = !!t && t.length, s = je(e) && e > -1 && e % 1 == 0;
  return Ge(t) || !Be(t) && s ? e > 0 && Ot(t) ? e - 1 in t : !0 : !1;
}, ts = (t) => {
  if (!t || !Ot(t))
    return !1;
  let e;
  const s = "constructor", r = t[s], n = r && r.prototype, c = bs.call(t, s), i = n && bs.call(n, "isPrototypeOf");
  if (r && !c && !i)
    return !1;
  for (e in t)
    ;
  return ls(e) || bs.call(t, e);
}, ss = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Wn : !1;
}, ds = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Wn : !1;
};
function ce(t, e) {
  if (cs(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else t && ce(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const Ys = (t, e) => t.indexOf(e) >= 0, Qe = (t, e) => t.concat(e), ye = (t, e, s) => (!is(e) && cs(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ut = (t) => Array.from(t || []), Xn = (t) => Ge(t) ? t : [t], Ms = (t) => !!t && !t.length, vn = (t) => ut(new Set(t)), Ie = (t, e, s) => {
  ce(t, (n) => n && n.apply(void 0, e || [])), !s && (t.length = 0);
}, Jn = "paddingTop", Qn = "paddingRight", Zn = "paddingLeft", eo = "paddingBottom", to = "marginLeft", so = "marginRight", no = "marginBottom", Tr = "overflowX", Ar = "overflowY", xt = "width", wt = "height", ot = "visible", ft = "hidden", kt = "scroll", Mr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, us = (t, e, s, r) => {
  if (t && e) {
    let n = !0;
    return ce(s, (c) => {
      const i = t[c], d = e[c];
      i !== d && (n = !1);
    }), n;
  }
  return !1;
}, oo = (t, e) => us(t, e, ["w", "h"]), Yt = (t, e) => us(t, e, ["x", "y"]), Dr = (t, e) => us(t, e, ["t", "r", "b", "l"]), at = () => {
}, J = (t, ...e) => t.bind(0, ...e), mt = (t) => {
  let e;
  const s = t ? Zt : Ks, r = t ? Ts : Kn;
  return [(n) => {
    r(e), e = s(() => n(), Be(t) ? t() : t);
  }, () => r(e)];
}, Ds = (t, e) => {
  const { _: s, p: r, v: n, m: c } = e || {};
  let i, d, l, u, h = at;
  const f = function(b) {
    h(), Ts(i), u = i = d = void 0, h = at, t.apply(this, b);
  }, v = (x) => c && d ? c(d, x) : x, p = () => {
    h !== at && f(v(l) || l);
  }, _ = function() {
    const b = ut(arguments), M = Be(s) ? s() : s;
    if (je(M) && M >= 0) {
      const U = Be(r) ? r() : r, F = je(U) && U >= 0, D = M > 0 ? Zt : Ks, V = M > 0 ? Ts : Kn, T = v(b) || b, O = f.bind(0, T);
      let A;
      h(), n && !u ? (O(), u = !0, A = D(() => u = void 0, M)) : (A = D(O, M), F && !i && (i = Zt(p, U))), h = () => V(A), d = l = T;
    } else
      f(b);
  };
  return _.S = p, _;
}, ro = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ze = (t) => t ? Object.keys(t) : [], re = (t, e, s, r, n, c, i) => {
  const d = [e, s, r, n, c, i];
  return (typeof t != "object" || Ws(t)) && !Be(t) && (t = {}), ce(d, (l) => {
    ce(l, (u, h) => {
      const f = l[h];
      if (t === f)
        return !0;
      const v = Ge(f);
      if (f && ts(f)) {
        const p = t[h];
        let _ = p;
        v && !Ge(p) ? _ = [] : !v && !ts(p) && (_ = {}), t[h] = re(_, f);
      } else
        t[h] = v ? f.slice() : f;
    });
  }), t;
}, ao = (t, e) => ce(re({}, t), (s, r, n) => {
  s === void 0 ? delete n[r] : s && ts(s) && (n[r] = ao(s));
}), Xs = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Vs = (t, e, s) => Gn(t, Cr(e, s)), ht = (t) => ut(new Set((Ge(t) ? t : (t || "").split(" ")).filter((e) => e))), Js = (t, e) => t && t.getAttribute(e), gn = (t, e) => t && t.hasAttribute(e), Je = (t, e, s) => {
  ce(ht(e), (r) => {
    t && t.setAttribute(r, String(s || ""));
  });
}, Pe = (t, e) => {
  ce(ht(e), (s) => t && t.removeAttribute(s));
}, fs = (t, e) => {
  const s = ht(Js(t, e)), r = J(Je, t, e), n = (c, i) => {
    const d = new Set(s);
    return ce(ht(c), (l) => {
      d[i](l);
    }), ut(d).join(" ");
  };
  return {
    O: (c) => r(n(c, "delete")),
    $: (c) => r(n(c, "add")),
    C: (c) => {
      const i = ht(c);
      return i.reduce((d, l) => d && s.includes(l), i.length > 0);
    }
  };
}, lo = (t, e, s) => (fs(t, e).O(s), J(Qs, t, e, s)), Qs = (t, e, s) => (fs(t, e).$(s), J(lo, t, e, s)), Ls = (t, e, s, r) => (r ? Qs : lo)(t, e, s), Zs = (t, e, s) => fs(t, e).C(s), io = (t) => fs(t, "class"), co = (t, e) => {
  io(t).O(e);
}, en = (t, e) => (io(t).$(e), J(co, t, e)), uo = (t, e) => {
  const s = [], r = e ? ds(e) && e : document;
  return r ? ye(s, r.querySelectorAll(t)) : s;
}, Vr = (t, e) => {
  const s = e ? ds(e) && e : document;
  return s ? s.querySelector(t) : null;
}, ns = (t, e) => ds(t) ? t.matches(e) : !1, fo = (t) => ns(t, "body"), Os = (t) => t ? ut(t.childNodes) : [], $t = (t) => t && t.parentElement, yt = (t, e) => ds(t) && t.closest(e), Rs = (t) => document.activeElement, Lr = (t, e, s) => {
  const r = yt(t, e), n = t && Vr(s, r), c = yt(n, e) === r;
  return r && n ? r === t || n === t || c && yt(yt(t, s), e) !== r : !1;
}, ct = (t) => {
  if (cs(t))
    ce(ut(t), (e) => ct(e));
  else if (t) {
    const e = $t(t);
    e && e.removeChild(t);
  }
}, mo = (t, e, s) => {
  if (s && t) {
    let r = e, n;
    return cs(s) ? (n = document.createDocumentFragment(), ce(s, (c) => {
      c === r && (r = c.previousSibling), n.appendChild(c);
    })) : n = s, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(n, r || null), () => ct(s);
  }
  return at;
}, Oe = (t, e) => mo(t, null, e), _n = (t, e) => mo($t(t), t && t.nextSibling, e), bt = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, po = (t) => {
  const e = bt();
  return e.innerHTML = t.trim(), ce(Os(e), (s) => ct(s));
}, Or = /^--/, yn = (t, e) => t.getPropertyValue(e) || t[e] || "", tn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Gt = (t) => tn(parseFloat(t || "")), bn = (t) => `${(tn(t) * 100).toFixed(3)}%`, Fs = (t) => `${tn(t)}px`;
function Rt(t, e) {
  t && e && ce(e, (s, r) => {
    try {
      const n = t.style, c = je(s) ? Fs(s) : (s || "") + "";
      Or.test(r) ? n.setProperty(r, c) : n[r] = c;
    } catch {
    }
  });
}
function vt(t, e, s) {
  const r = is(e);
  let n = r ? "" : {};
  if (t) {
    const c = Me.getComputedStyle(t, s) || t.style;
    n = r ? yn(c, e) : ut(e).reduce((i, d) => (i[d] = yn(c, d), i), n);
  }
  return n;
}
const xn = (t, e, s) => {
  const r = e ? `${e}-` : "", n = s ? `-${s}` : "", c = `${r}top${n}`, i = `${r}right${n}`, d = `${r}bottom${n}`, l = `${r}left${n}`, u = vt(t, [c, i, d, l]);
  return {
    t: Gt(u[c]),
    r: Gt(u[i]),
    b: Gt(u[d]),
    l: Gt(u[l])
  };
}, xs = (t, e) => `translate${Ot(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Rr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Fr = {
  w: 0,
  h: 0
}, ms = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Fr, Hr = (t) => ms("inner", t || Me), Dt = J(ms, "offset"), ho = J(ms, "client"), Hs = J(ms, "scroll"), sn = (t) => {
  const e = parseFloat(vt(t, xt)) || 0, s = parseFloat(vt(t, wt)) || 0;
  return {
    w: e - Es(e),
    h: s - Es(s)
  };
}, Vt = (t) => t.getBoundingClientRect(), Br = (t) => !!t && Rr(t), Bs = (t) => !!(t && (t[wt] || t[xt])), vo = (t, e) => {
  const s = Bs(t);
  return !Bs(e) && s;
}, wn = (t, e, s, r) => {
  ce(ht(e), (n) => {
    t && t.removeEventListener(n, s, r);
  });
}, me = (t, e, s, r) => {
  var n;
  const c = (n = r && r.H) != null ? n : !0, i = r && r.I || !1, d = r && r.A || !1, l = {
    passive: c,
    capture: i
  };
  return J(Ie, ht(e).map((u) => {
    const h = d ? (f) => {
      wn(t, u, h, i), s && s(f);
    } : s;
    return t && t.addEventListener(u, h, l), J(wn, t, u, h, i);
  }));
}, go = (t) => t.stopPropagation(), Is = (t) => t.preventDefault(), _o = (t) => go(t) || Is(t), qe = (t, e) => {
  const { x: s, y: r } = je(e) ? {
    x: e,
    y: e
  } : e || {};
  je(s) && (t.scrollLeft = s), je(r) && (t.scrollTop = r);
}, Re = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), yo = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), Ir = (t, e) => {
  const { T: s, D: r } = t, { w: n, h: c } = e, i = (f, v, p) => {
    let _ = pn(f) * p, x = pn(v) * p;
    if (_ === x) {
      const b = Qt(f), M = Qt(v);
      x = b > M ? 0 : x, _ = b < M ? 0 : _;
    }
    return _ = _ === x ? 0 : _, [_ + 0, x + 0];
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
}, kn = ({ T: t, D: e }) => {
  const s = (r, n) => r === 0 && r <= n;
  return {
    x: s(t.x, e.x),
    y: s(t.y, e.y)
  };
}, $n = ({ T: t, D: e }, s) => {
  const r = (n, c, i) => Vs(0, 1, (n - i) / (n - c) || 0);
  return {
    x: r(t.x, e.x, s.x),
    y: r(t.y, e.y, s.y)
  };
}, Ns = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, Sn = (t, e) => {
  ce(Xn(e), t);
}, Us = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (c, i) => {
    if (c) {
      const d = e.get(c);
      Sn((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (c, i) => {
    if (is(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), Sn((h) => {
        Be(h) && u.add(h);
      }, i), J(s, c, i);
    }
    Yn(i) && i && s();
    const d = Ze(c), l = [];
    return ce(d, (u) => {
      const h = c[u];
      h && ye(l, r(u, h));
    }), J(Ie, l);
  }, n = (c, i) => {
    ce(ut(e.get(c)), (d) => {
      i && !Ms(i) ? d.apply(0, i) : d();
    });
  };
  return r(t || {}), [r, s, n];
}, Cn = (t) => JSON.stringify(t, (e, s) => {
  if (Be(s))
    throw 0;
  return s;
}), En = (t, e) => t ? `${e}`.split(".").reduce((s, r) => s && ro(s, r) ? s[r] : void 0, t) : void 0, Nr = {
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
}, bo = (t, e) => {
  const s = {}, r = Qe(Ze(e), Ze(t));
  return ce(r, (n) => {
    const c = t[n], i = e[n];
    if (Ot(c) && Ot(i))
      re(s[n] = {}, bo(c, i)), Xs(s[n]) && delete s[n];
    else if (ro(e, n) && i !== c) {
      let d = !0;
      if (Ge(c) || Ge(i))
        try {
          Cn(c) === Cn(i) && (d = !1);
        } catch {
        }
      d && (s[n] = i);
    }
  }), s;
}, Tn = (t, e, s) => (r) => [En(t, r), s || En(e, r) !== void 0], Tt = "data-overlayscrollbars", Xt = "os-environment", Kt = `${Xt}-scrollbar-hidden`, ws = `${Tt}-initialize`, Jt = "noClipping", An = `${Tt}-body`, lt = Tt, Ur = "host", nt = `${Tt}-viewport`, Pr = Tr, zr = Ar, qr = "arrange", xo = "measuring", wo = "scrollbarHidden", jr = "scrollbarPressed", Gr = "noContent", Ps = `${Tt}-padding`, Mn = `${Tt}-content`, nn = "os-size-observer", Kr = `${nn}-appear`, Wr = `${nn}-listener`, Yr = "os-trinsic-observer", Xr = "os-theme-none", Fe = "os-scrollbar", Jr = `${Fe}-rtl`, Qr = `${Fe}-horizontal`, Zr = `${Fe}-vertical`, ko = `${Fe}-track`, on = `${Fe}-handle`, ea = `${Fe}-visible`, ta = `${Fe}-cornerless`, Dn = `${Fe}-interaction`, Vn = `${Fe}-unusable`, zs = `${Fe}-auto-hide`, Ln = `${zs}-hidden`, On = `${Fe}-wheel`, sa = `${ko}-interactive`, na = `${on}-interactive`;
let ks;
const oa = () => {
  const t = (k, U, F) => {
    Oe(document.body, k), Oe(document.body, k);
    const D = ho(k), V = Dt(k), L = sn(U);
    return F && ct(k), {
      x: V.h - D.h + L.h,
      y: V.w - D.w + L.w
    };
  }, e = (k) => {
    let U = !1;
    const F = en(k, Kt);
    try {
      U = vt(k, "scrollbar-width") === "none" || vt(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return F(), U;
  }, s = `.${Xt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Xt} div{width:200%;height:200%;margin:10px 0}.${Kt}{scrollbar-width:none!important}.${Kt}::-webkit-scrollbar,.${Kt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, n = po(`<div class="${Xt}"><div></div><style>${s}</style></div>`)[0], c = n.firstChild, [i, , d] = Us(), [l, u] = Le({
    o: t(n, c),
    i: Yt
  }, J(t, n, c, !0)), [h] = u(), f = e(n), v = {
    x: h.x === 0,
    y: h.y === 0
  }, p = {
    elements: {
      host: null,
      padding: !f,
      viewport: (k) => f && fo(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, _ = re({}, Nr), x = J(re, {}, _), b = J(re, {}, p), M = {
    k: h,
    M: v,
    R: f,
    V: !!As,
    L: J(i, "r"),
    P: b,
    U: (k) => re(p, k) && b(),
    N: x,
    q: (k) => re(_, k) && x(),
    B: re({}, p),
    F: re({}, _)
  };
  if (Pe(n, "style"), ct(n), me(Me, "resize", () => {
    d("r", []);
  }), Be(Me.matchMedia) && !f && (!v.x || !v.y)) {
    const k = (U) => {
      const F = Me.matchMedia(`(resolution: ${Me.devicePixelRatio}dppx)`);
      me(F, "change", () => {
        U(), k(U);
      }, {
        A: !0
      });
    };
    k(() => {
      const [U, F] = l();
      re(M.k, U), d("r", [F]);
    });
  }
  return M;
}, Ke = () => (ks || (ks = oa()), ks), $o = (t, e) => Be(e) ? e.apply(0, t) : e, ra = (t, e, s, r) => {
  const n = ls(r) ? s : r;
  return $o(t, n) || e.apply(0, t);
}, So = (t, e, s, r) => {
  const n = ls(r) ? s : r, c = $o(t, n);
  return !!c && (ss(c) ? c : e.apply(0, t));
}, aa = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { M: n, R: c, P: i } = Ke(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = s ?? d, h = ls(r) ? l : r, f = (n.x || n.y) && u, v = t && (Ws(h) ? !c : h);
  return !!f || !!v;
}, rn = /* @__PURE__ */ new WeakMap(), la = (t, e) => {
  rn.set(t, e);
}, ia = (t) => {
  rn.delete(t);
}, Co = (t) => rn.get(t), ca = (t, e, s) => {
  let r = !1;
  const n = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, i = (d) => {
    if (n && s) {
      const l = s.map((u) => {
        const [h, f] = u || [];
        return [f && h ? (d || uo)(h, t) : [], f];
      });
      ce(l, (u) => ce(u[0], (h) => {
        const f = u[1], v = n.get(h) || [];
        if (t.contains(h) && f) {
          const _ = me(h, f, (x) => {
            r ? (_(), n.delete(h)) : e(x);
          });
          n.set(h, ye(v, _));
        } else
          Ie(v), n.delete(h);
      }));
    }
  };
  return i(), [c, i];
}, Rn = (t, e, s, r) => {
  let n = !1;
  const { j: c, X: i, Y: d, W: l, J: u, K: h } = r || {}, f = Ds(() => n && s(!0), {
    _: 33,
    p: 99
  }), [v, p] = ca(t, f, d), _ = c || [], x = i || [], b = Qe(_, x), M = (U, F) => {
    if (!Ms(F)) {
      const D = u || at, V = h || at, L = [], T = [];
      let O = !1, A = !1;
      if (ce(F, (S) => {
        const { attributeName: R, target: $, type: w, oldValue: I, addedNodes: H, removedNodes: ne } = S, ue = w === "attributes", le = w === "childList", B = t === $, ee = ue && R, te = ee && Js($, R || ""), X = is(te) ? te : null, fe = ee && I !== X, P = Ys(x, R) && fe;
        if (e && (le || !B)) {
          const G = ue && fe, j = G && l && ns($, l), N = (j ? !D($, R, I, X) : !ue || G) && !V(S, !!j, t, r);
          ce(H, (K) => ye(L, K)), ce(ne, (K) => ye(L, K)), A = A || N;
        }
        !e && B && fe && !D($, R, I, X) && (ye(T, R), O = O || P);
      }), p((S) => vn(L).reduce((R, $) => (ye(R, uo(S, $)), ns($, S) ? ye(R, $) : R), [])), e)
        return !U && A && s(!1), [!1];
      if (!Ms(T) || O) {
        const S = [vn(T), O];
        return !U && s.apply(0, S), S;
      }
    }
  }, k = new Er(J(M, !1));
  return [() => (k.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: b,
    subtree: e,
    childList: e,
    characterData: e
  }), n = !0, () => {
    n && (v(), k.disconnect(), n = !1);
  }), () => {
    if (n)
      return f.S(), M(!0, k.takeRecords());
  }];
}, Eo = {}, To = {}, da = (t) => {
  ce(t, (e) => ce(e, (s, r) => {
    Eo[r] = e[r];
  }));
}, Ao = (t, e, s) => Ze(t).map((r) => {
  const { static: n, instance: c } = t[r], [i, d, l] = s || [], u = s ? c : n;
  if (u) {
    const h = s ? u(i, d, e) : u(e);
    return (l || To)[r] = h;
  }
}), Ft = (t) => To[t], ua = "__osOptionsValidationPlugin", fa = "__osSizeObserverPlugin", ma = (t, e) => {
  const { M: s } = e, [r, n] = t("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, n];
}, os = (t) => t.indexOf(ot) === 0, pa = (t, e) => {
  const s = (n, c, i, d) => {
    const l = n === ot ? ft : n.replace(`${ot}-`, ""), u = os(n), h = os(i);
    return !c && !d ? ft : u && h ? ot : u ? c && d ? l : c ? ot : ft : c ? l : h && d ? ot : ft;
  }, r = {
    x: s(e.x, t.x, e.y, t.y),
    y: s(e.y, t.y, e.x, t.x)
  };
  return {
    G: r,
    Z: {
      x: r.x === kt,
      y: r.y === kt
    }
  };
}, Mo = "__osScrollbarsHidingPlugin", ha = "__osClickScrollPlugin", Do = (t, e, s) => {
  const { dt: r } = s || {}, n = Ft(fa), [c] = Le({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = po(`<div class="${nn}"><div class="${Wr}"></div></div>`)[0], u = l.firstChild, h = (f) => {
      const v = f instanceof ResizeObserverEntry;
      let p = !1, _ = !1;
      if (v) {
        const [x, , b] = c(f.contentRect), M = Bs(x);
        _ = vo(x, b), p = !_ && !M;
      } else
        _ = f === !0;
      p || e({
        ft: !0,
        dt: _
      });
    };
    if (es) {
      const f = new es((v) => h(v.pop()));
      f.observe(u), ye(i, () => {
        f.disconnect();
      });
    } else if (n) {
      const [f, v] = n(u, h, r);
      ye(i, Qe([en(l, Kr), me(l, "animationstart", f)], v));
    } else
      return at;
    return J(Ie, ye(i, Oe(t, l)));
  };
}, va = (t, e) => {
  let s;
  const r = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, n = bt(Yr), [c] = Le({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const h = c(r(l)), [, f] = h;
      return f && !u && e(h) && [h];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (hn)
      s = new hn(J(d, !1), {
        root: t
      }), s.observe(n), ye(l, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const h = Dt(n);
        i(h);
      };
      ye(l, Do(n, u)()), u();
    }
    return J(Ie, ye(l, Oe(t, n)));
  }, () => s && d(!0, s.takeRecords())];
}, ga = (t, e, s, r) => {
  let n, c, i, d, l, u;
  const h = `[${lt}]`, f = `[${nt}]`, v = [], p = ["wrap", "cols", "rows"], _ = ["id", "class", "style", "open"], { vt: x, ht: b, ot: M, gt: k, bt: U, wt: F, nt: D, yt: V, St: L, Ot: T } = t, O = (C) => vt(C, "direction") === "rtl", A = {
    $t: !1,
    ct: O(x)
  }, S = Ke(), R = Ft(Mo), [$] = Le({
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = R && R.tt(t, e, A, S, s).ut, K = !(V && D) && Zs(b, lt, Jt), Y = !D && L(qr), Z = Y && Re(k), ie = T(xo, K), xe = Y && C && C()[0], Se = Hs(M), oe = sn(M);
    return xe && xe(), qe(k, Z), K && ie(), {
      w: Se.w + oe.w,
      h: Se.h + oe.h
    };
  }), w = F ? p : Qe(_, p), I = Ds(r, {
    _: () => n,
    p: () => c,
    m(C, N) {
      const [K] = C, [Y] = N;
      return [Qe(Ze(K), Ze(Y)).reduce((Z, ie) => (Z[ie] = K[ie] || Y[ie], Z), {})];
    }
  }), H = (C) => {
    const N = O(x);
    re(C, {
      Ct: u !== N
    }), re(A, {
      ct: N
    }), u = N;
  }, ne = (C, N) => {
    const [K, Y] = C, Z = {
      xt: Y
    };
    return re(A, {
      $t: K
    }), !N && r(Z), Z;
  }, ue = ({ ft: C, dt: N }) => {
    const Y = !(C && !N) && S.R ? I : r, Z = {
      ft: C || N,
      dt: N
    };
    H(Z), Y(Z);
  }, le = (C, N) => {
    const [, K] = $(), Y = {
      Ht: K
    };
    return H(Y), K && !N && (C ? r : I)(Y), Y;
  }, B = (C, N, K) => {
    const Y = {
      Et: N
    };
    return H(Y), N && !K && I(Y), Y;
  }, [ee, te] = U ? va(b, ne) : [], X = !D && Do(b, ue, {
    dt: !0
  }), [fe, P] = Rn(b, !1, B, {
    X: _,
    j: Qe(_, v)
  }), G = D && es && new es((C) => {
    const N = C[C.length - 1].contentRect;
    ue({
      ft: !0,
      dt: vo(N, l)
    }), l = N;
  }), j = Ds(() => {
    const [, C] = $();
    r({
      Ht: C
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    G && G.observe(b);
    const C = X && X(), N = ee && ee(), K = fe(), Y = S.L((Z) => {
      Z ? I({
        zt: Z
      }) : j();
    });
    return () => {
      G && G.disconnect(), C && C(), N && N(), d && d(), K(), Y();
    };
  }, ({ It: C, At: N, Tt: K }) => {
    const Y = {}, [Z] = C("update.ignoreMutation"), [ie, xe] = C("update.attributes"), [Se, oe] = C("update.elementEvents"), [we, Ee] = C("update.debounce"), He = oe || xe, ke = N || K, De = (be) => Be(Z) && Z(be);
    if (He) {
      i && i(), d && d();
      const [be, ge] = Rn(U || M, !0, le, {
        j: Qe(w, ie || []),
        Y: Se,
        W: h,
        K: (Te, _e) => {
          const { target: Ae, attributeName: Ve } = Te;
          return (!_e && Ve && !D ? Lr(Ae, h, f) : !1) || !!yt(Ae, `.${Fe}`) || !!De(Te);
        }
      });
      d = be(), i = ge;
    }
    if (Ee)
      if (I.S(), Ge(we)) {
        const be = we[0], ge = we[1];
        n = je(be) && be, c = je(ge) && ge;
      } else je(we) ? (n = we, c = !1) : (n = !1, c = !1);
    if (ke) {
      const be = P(), ge = te && te(), Te = i && i();
      be && re(Y, B(be[0], be[1], ke)), ge && re(Y, ne(ge[0], ke)), Te && re(Y, le(Te[0], ke));
    }
    return H(Y), Y;
  }, A];
}, _a = (t, e, s, r) => {
  const { P: n } = Ke(), { scrollbars: c } = n(), { slot: i } = c, { vt: d, ht: l, ot: u, Dt: h, gt: f, yt: v, nt: p } = e, { scrollbars: _ } = h ? {} : t, { slot: x } = _ || {}, b = /* @__PURE__ */ new Map(), M = (P) => As && new As({
    source: f,
    axis: P
  }), k = {
    x: M("x"),
    y: M("y")
  }, U = So([d, l, u], () => p && v ? d : l, i, x), F = (P, G) => {
    if (G) {
      const Z = P ? xt : wt, { kt: ie, Mt: xe } = G, Se = Vt(xe)[Z], oe = Vt(ie)[Z];
      return Vs(0, 1, Se / oe || 0);
    }
    const j = P ? "x" : "y", { Rt: C, Vt: N } = s, K = N[j], Y = C[j];
    return Vs(0, 1, K / (K + Y) || 0);
  }, D = (P, G, j) => {
    const C = F(j, P);
    return 1 / C * (1 - C) * G;
  }, V = (P) => re(P, {
    clear: ["left"]
  }), L = (P) => {
    b.forEach((G, j) => {
      (P ? Ys(Xn(P), j) : !0) && (ce(G || [], (N) => {
        N && N.cancel();
      }), b.delete(j));
    });
  }, T = (P, G, j, C) => {
    const N = b.get(P) || [], K = N.find((Y) => Y && Y.timeline === G);
    K ? K.effect = new KeyframeEffect(P, j, {
      composite: C
    }) : b.set(P, Qe(N, [P.animate(j, {
      timeline: G,
      composite: C
    })]));
  }, O = (P, G, j) => {
    const C = j ? en : co;
    ce(P, (N) => {
      C(N.Lt, G);
    });
  }, A = (P, G) => {
    ce(P, (j) => {
      const [C, N] = G(j);
      Rt(C, N);
    });
  }, S = (P, G) => {
    A(P, (j) => {
      const { Mt: C } = j;
      return [C, {
        [G ? xt : wt]: bn(F(G))
      }];
    });
  }, R = (P, G) => {
    const { Pt: j } = s, C = G ? "x" : "y", N = k[C], K = kn(j)[C], Y = (Z, ie) => xs(bn(D(Z, K ? ie : 1 - ie, G)), G);
    N ? ce(P, (Z) => {
      const { Mt: ie } = Z;
      T(ie, N, V({
        transform: [0, 1].map((xe) => Y(Z, xe))
      }));
    }) : A(P, (Z) => [Z.Mt, {
      transform: Y(Z, $n(j, Re(f))[C])
    }]);
  }, $ = (P) => p && !v && $t(P) === u, w = [], I = [], H = [], ne = (P, G, j) => {
    const C = Yn(j), N = C ? j : !0, K = C ? !j : !0;
    N && O(I, P, G), K && O(H, P, G);
  }, ue = () => {
    S(I, !0), S(H);
  }, le = () => {
    R(I, !0), R(H);
  }, B = () => {
    if (p) {
      const { Rt: P, Pt: G } = s, j = kn(G), C = 0.5;
      if (k.x && k.y)
        ce(Qe(H, I), ({ Lt: N }) => {
          if ($(N)) {
            const K = (Y) => T(N, k[Y], V({
              transform: [0, j[Y] ? 1 : -1].map((Z) => xs(Fs(Z * (P[Y] - C)), Y === "x"))
            }), "add");
            K("x"), K("y");
          } else
            L(N);
        });
      else {
        const N = $n(G, Re(f)), K = (Y) => {
          const { Lt: Z } = Y, ie = $(Z) && Z, xe = (Se, oe, we) => {
            const Ee = oe * Se;
            return Fs(we ? Ee : -Ee);
          };
          return [ie, ie && {
            transform: xs({
              x: xe(N.x, P.x, j.x),
              y: xe(N.y, P.y, j.y)
            })
          }];
        };
        A(I, K), A(H, K);
      }
    }
  }, ee = (P) => {
    const j = bt(`${Fe} ${P ? Qr : Zr}`), C = bt(ko), N = bt(on), K = {
      Lt: j,
      kt: C,
      Mt: N
    };
    return ye(P ? I : H, K), ye(w, [Oe(j, C), Oe(C, N), J(ct, j), L, r(K, ne, R, P)]), K;
  }, te = J(ee, !0), X = J(ee, !1), fe = () => (Oe(U, I[0].Lt), Oe(U, H[0].Lt), J(Ie, w));
  return te(), X(), [{
    Ut: ue,
    Nt: le,
    qt: B,
    Bt: ne,
    Ft: {
      V: k.x,
      jt: I,
      Xt: te,
      Yt: J(A, I)
    },
    Wt: {
      V: k.y,
      jt: H,
      Xt: X,
      Yt: J(A, H)
    }
  }, fe];
}, ya = (t, e, s, r) => (n, c, i, d) => {
  const { ht: l, ot: u, nt: h, gt: f, Jt: v, Ot: p } = e, { Lt: _, kt: x, Mt: b } = n, [M, k] = mt(333), [U, F] = mt(444), [D, V] = mt(), L = J(i, [n], d), T = ($) => {
    Be(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: $.x,
      top: $.y
    });
  }, O = d ? xt : wt, A = () => {
    const $ = "pointerup pointercancel lostpointercapture", w = `client${d ? "X" : "Y"}`, I = d ? "left" : "top", H = d ? "w" : "h", ne = d ? "x" : "y", ue = (le, B) => (ee) => {
      const { Rt: te } = s, X = Dt(x)[H] - Dt(b)[H], P = B * ee / X * te[ne];
      qe(f, {
        [ne]: le + P
      });
    };
    return me(x, "pointerdown", (le) => {
      const B = yt(le.target, `.${on}`) === b, ee = B ? b : x, te = t.scrollbars, { button: X, isPrimary: fe, pointerType: P } = le, { pointers: G } = te;
      if (X === 0 && fe && te[B ? "dragScroll" : "clickScroll"] && (G || []).includes(P)) {
        F();
        const C = !B && le.shiftKey, N = J(Vt, b), K = J(Vt, x), Y = (_e, Ae) => (_e || N())[I] - (Ae || K())[I], Z = Es(Vt(f)[O]) / Dt(f)[H] || 1, ie = ue(Re(f)[ne], 1 / Z), xe = le[w], Se = N(), oe = K(), we = Se[O], Ee = Y(Se, oe) + we / 2, He = xe - oe[I], ke = B ? 0 : He - Ee, De = (_e) => {
          Ie(Te), ee.releasePointerCapture(_e.pointerId);
        }, be = () => p(jr, !0), ge = be(), Te = [() => {
          const _e = Re(f);
          ge();
          const Ae = Re(f), Ve = {
            x: Ae.x - _e.x,
            y: Ae.y - _e.y
          };
          (Qt(Ve.x) > 3 || Qt(Ve.y) > 3) && (be(), qe(f, _e), T(Ve), U(ge));
        }, me(v, $, De), me(v, "selectstart", (_e) => Is(_e), {
          H: !1
        }), me(x, $, De), me(x, "pointermove", (_e) => {
          const Ae = _e[w] - xe;
          (B || C) && ie(ke + Ae);
        })];
        if (ee.setPointerCapture(le.pointerId), C)
          ie(ke);
        else if (!B) {
          const _e = Ft(ha);
          _e && ye(Te, _e(ie, Y, ke, we, He));
        }
      }
    });
  };
  let S = !0;
  const R = ($) => $.propertyName.indexOf(O) > -1;
  return J(Ie, [me(b, "pointermove pointerleave", r), me(_, "pointerenter", () => {
    c(Dn, !0);
  }), me(_, "pointerleave pointercancel", () => {
    c(Dn, !1);
  }), !h && me(_, "mousedown", () => {
    const $ = Rs();
    (gn($, nt) || gn($, lt) || $ === document.body) && Zt(J(Ns, u), 25);
  }), me(_, "wheel", ($) => {
    const { deltaX: w, deltaY: I, deltaMode: H } = $;
    S && H === 0 && $t(_) === l && T({
      x: w,
      y: I
    }), S = !1, c(On, !0), M(() => {
      S = !0, c(On);
    }), Is($);
  }, {
    H: !1,
    I: !0
  }), me(b, "transitionstart", ($) => {
    if (R($)) {
      const w = () => {
        L(), D(w);
      };
      w();
    }
  }), me(b, "transitionend transitioncancel", ($) => {
    R($) && (V(), L());
  }), me(_, "pointerdown", J(me, v, "click", _o, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), A(), k, F, V]);
}, ba = (t, e, s, r, n, c) => {
  let i, d, l, u, h, f = at, v = 0;
  const p = (B) => B.pointerType === "mouse", [_, x] = mt(), [b, M] = mt(100), [k, U] = mt(100), [F, D] = mt(() => v), [V, L] = _a(t, n, r, ya(e, n, r, (B) => p(B) && H())), { ht: T, Kt: O, yt: A } = n, { Bt: S, Ut: R, Nt: $, qt: w } = V, I = (B, ee) => {
    if (D(), B)
      S(Ln);
    else {
      const te = J(S, Ln, !0);
      v > 0 && !ee ? F(te) : te();
    }
  }, H = () => {
    (l ? !i : !u) && (I(!0), b(() => {
      I(!1);
    }));
  }, ne = (B) => {
    S(zs, B, !0), S(zs, B, !1);
  }, ue = (B) => {
    p(B) && (i = l, l && I(!0));
  }, le = [D, M, U, x, () => f(), me(T, "pointerover", ue, {
    A: !0
  }), me(T, "pointerenter", ue), me(T, "pointerleave", (B) => {
    p(B) && (i = !1, l && I(!1));
  }), me(T, "pointermove", (B) => {
    p(B) && d && H();
  }), me(O, "scroll", (B) => {
    _(() => {
      $(), H();
    }), c(B), w();
  })];
  return [() => J(Ie, ye(le, L())), ({ It: B, Tt: ee, Gt: te, Qt: X }) => {
    const { Zt: fe, tn: P, nn: G, sn: j } = X || {}, { Ct: C, dt: N } = te || {}, { ct: K } = s, { M: Y } = Ke(), { G: Z, en: ie } = r, [xe, Se] = B("showNativeOverlaidScrollbars"), [oe, we] = B("scrollbars.theme"), [Ee, He] = B("scrollbars.visibility"), [ke, De] = B("scrollbars.autoHide"), [be, ge] = B("scrollbars.autoHideSuspend"), [Te] = B("scrollbars.autoHideDelay"), [_e, Ae] = B("scrollbars.dragScroll"), [Ve, gt] = B("scrollbars.clickScroll"), [Ht, hs] = B("overflow"), vs = N && !ee, gs = ie.x || ie.y, Ue = fe || P || j || C || ee, _s = G || He || hs, Bt = xe && Y.x && Y.y, It = (tt, At, Mt) => {
      const Nt = tt.includes(kt) && (Ee === ot || Ee === "auto" && At === kt);
      return S(ea, Nt, Mt), Nt;
    };
    if (v = Te, vs && (be && gs ? (ne(!1), f(), k(() => {
      f = me(O, "scroll", J(ne, !0), {
        A: !0
      });
    })) : ne(!0)), Se && S(Xr, Bt), we && (S(h), S(oe, !0), h = oe), ge && !be && ne(!0), De && (d = ke === "move", l = ke === "leave", u = ke === "never", I(u, !0)), Ae && S(na, _e), gt && S(sa, Ve), _s) {
      const tt = It(Ht.x, Z.x, !0), At = It(Ht.y, Z.y, !1);
      S(ta, !(tt && At));
    }
    Ue && (R(), $(), w(), S(Vn, !ie.x, !0), S(Vn, !ie.y, !1), S(Jr, K && !A));
  }, {}, V];
}, xa = (t) => {
  const e = Ke(), { P: s, R: r } = e, { elements: n } = s(), { host: c, padding: i, viewport: d, content: l } = n, u = ss(t), h = u ? {} : t, { elements: f } = h, { host: v, padding: p, viewport: _, content: x } = f || {}, b = u ? t : h.target, M = fo(b), k = ns(b, "textarea"), U = b.ownerDocument, F = U.documentElement, D = () => U.defaultView || Me, V = J(ra, [b]), L = J(So, [b]), T = J(bt, ""), O = J(V, T, d), A = J(L, T, l), S = O(_), R = S === b, $ = R && M, w = !R && A(x), I = !R && S === w, H = $ ? F : S, ne = k ? V(T, c, v) : b, ue = $ ? H : ne, le = !R && L(T, i, p), B = !I && w, ee = [B, H, le, ue].map((oe) => ss(oe) && !$t(oe) && oe), te = (oe) => oe && Ys(ee, oe), X = te(H) ? b : H, fe = {
    vt: b,
    ht: ue,
    ot: H,
    cn: le,
    bt: B,
    gt: $ ? F : H,
    Kt: $ ? U : H,
    rn: M ? F : X,
    Jt: U,
    wt: k,
    yt: M,
    Dt: u,
    nt: R,
    ln: D,
    St: (oe) => Zs(H, nt, oe),
    Ot: (oe, we) => Ls(H, nt, oe, we)
  }, { vt: P, ht: G, cn: j, ot: C, bt: N } = fe, K = [() => {
    Pe(G, [lt, ws]), Pe(P, ws), M && Pe(F, [ws, lt]);
  }], Y = k && te(G);
  let Z = k ? P : Os([N, C, j, G, P].find((oe) => oe && !te(oe)));
  const ie = $ ? P : N || C, xe = J(Ie, K);
  return [fe, () => {
    const oe = D(), we = Rs(), Ee = (ge) => {
      Oe($t(ge), Os(ge)), ct(ge);
    }, He = (ge) => me(ge, "focusin focusout focus blur", _o, {
      I: !0,
      H: !1
    }), ke = "tabindex", De = Js(C, ke), be = He(we);
    return Je(G, lt, R ? "" : Ur), Je(j, Ps, ""), Je(C, nt, ""), Je(N, Mn, ""), R || (Je(C, ke, De || "-1"), M && Je(F, An, "")), Y && (_n(P, G), ye(K, () => {
      _n(G, P), ct(G);
    })), Oe(ie, Z), Oe(G, j), Oe(j || G, !R && C), Oe(C, N), ye(K, [be, () => {
      const ge = Rs(), Te = te(C), _e = Te && ge === C ? P : ge, Ae = He(_e);
      Pe(j, Ps), Pe(N, Mn), Pe(C, nt), M && Pe(F, An), De ? Je(C, ke, De) : Pe(C, ke), te(N) && Ee(N), Te && Ee(C), te(j) && Ee(j), Ns(_e), Ae();
    }]), r && !R && (Qs(C, nt, wo), ye(K, J(Pe, C, nt))), Ns(!R && M && we === P && oe.top === oe ? C : we), be(), Z = 0, xe;
  }, xe];
}, wa = ({ bt: t }) => ({ Gt: e, an: s, Tt: r }) => {
  const { xt: n } = e || {}, { $t: c } = s;
  t && (n || r) && Rt(t, {
    [wt]: c && "100%"
  });
}, ka = ({ ht: t, cn: e, ot: s, nt: r }, n) => {
  const [c, i] = Le({
    i: Dr,
    o: xn()
  }, J(xn, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: h }) => {
    let [f, v] = i(h);
    const { R: p } = Ke(), { ft: _, Ht: x, Ct: b } = l || {}, { ct: M } = u, [k, U] = d("paddingAbsolute");
    (_ || v || (h || x)) && ([f, v] = c(h));
    const D = !r && (U || b || v);
    if (D) {
      const V = !k || !e && !p, L = f.r + f.l, T = f.t + f.b, O = {
        [so]: V && !M ? -L : 0,
        [no]: V ? -T : 0,
        [to]: V && M ? -L : 0,
        top: V ? -f.t : 0,
        right: V ? M ? -f.r : "auto" : 0,
        left: V ? M ? "auto" : -f.l : 0,
        [xt]: V && `calc(100% + ${L}px)`
      }, A = {
        [Jn]: V ? f.t : 0,
        [Qn]: V ? f.r : 0,
        [eo]: V ? f.b : 0,
        [Zn]: V ? f.l : 0
      };
      Rt(e || s, O), Rt(s, A), re(n, {
        cn: f,
        un: !V,
        rt: e ? A : re({}, O, A)
      });
    }
    return {
      _n: D
    };
  };
}, $a = (t, e) => {
  const s = Ke(), { ht: r, cn: n, ot: c, nt: i, Kt: d, gt: l, yt: u, Ot: h, ln: f } = t, { R: v } = s, p = u && i, _ = J(Gn, 0), x = ["display", "direction", "flexDirection", "writingMode"], b = {
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, M = {
    i: Yt,
    o: {}
  }, k = (B) => {
    h(xo, !p && B);
  }, U = (B, ee) => {
    const te = Me.devicePixelRatio % 1 !== 0 ? 1 : 0, X = {
      w: _(B.w - ee.w),
      h: _(B.h - ee.h)
    };
    return {
      w: X.w > te ? X.w : 0,
      h: X.h > te ? X.h : 0
    };
  }, [F, D] = Le(b, J(sn, c)), [V, L] = Le(b, J(Hs, c)), [T, O] = Le(b), [A] = Le(M), [S, R] = Le(b), [$] = Le(M), [w] = Le({
    i: (B, ee) => us(B, ee, x),
    o: {}
  }, () => Br(c) ? vt(c, x) : {}), [I, H] = Le({
    i: (B, ee) => Yt(B.T, ee.T) && Yt(B.D, ee.D),
    o: yo()
  }, () => {
    k(!0);
    const B = Re(l), ee = h(Gr, !0), te = me(d, kt, (j) => {
      const C = Re(l);
      j.isTrusted && C.x === B.x && C.y === B.y && go(j);
    }, {
      I: !0,
      A: !0
    });
    qe(l, {
      x: 0,
      y: 0
    }), ee();
    const X = Re(l), fe = Hs(l);
    qe(l, {
      x: fe.w,
      y: fe.h
    });
    const P = Re(l);
    qe(l, {
      x: P.x - X.x < 1 && -fe.w,
      y: P.y - X.y < 1 && -fe.h
    });
    const G = Re(l);
    return qe(l, B), Ks(() => te()), {
      T: X,
      D: G
    };
  }), ne = Ft(Mo), ue = (B, ee) => `${ee ? Pr : zr}${Mr(B)}`, le = (B) => {
    const ee = (X) => [ot, ft, kt].map((fe) => ue(fe, X)), te = ee(!0).concat(ee()).join(" ");
    h(te), h(Ze(B).map((X) => ue(B[X], X === "x")).join(" "), !0);
  };
  return ({ It: B, Gt: ee, an: te, Tt: X }, { _n: fe }) => {
    const { ft: P, Ht: G, Ct: j, dt: C, zt: N } = ee || {}, K = ne && ne.tt(t, e, te, s, B), { it: Y, ut: Z, _t: ie } = K || {}, [xe, Se] = ma(B, s), [oe, we] = B("overflow"), Ee = os(oe.x), He = os(oe.y), ke = P || fe || G || j || N || Se;
    let De = D(X), be = L(X), ge = O(X), Te = R(X);
    if (Se && v && h(wo, !xe), ke) {
      Zs(r, lt, Jt) && k(!0);
      const [un] = Z ? Z() : [], [Ut] = De = F(X), [Pt] = be = V(X), zt = ho(c), qt = p && Hr(f()), er = {
        w: _(Pt.w + Ut.w),
        h: _(Pt.h + Ut.h)
      }, fn = {
        w: _((qt ? qt.w : zt.w + _(zt.w - Pt.w)) + Ut.w),
        h: _((qt ? qt.h : zt.h + _(zt.h - Pt.h)) + Ut.h)
      };
      un && un(), Te = S(fn), ge = T(U(er, fn), X);
    }
    const [_e, Ae] = Te, [Ve, gt] = ge, [Ht, hs] = be, [vs, gs] = De, [Ue, _s] = A({
      x: Ve.w > 0,
      y: Ve.h > 0
    }), Bt = Ee && He && (Ue.x || Ue.y) || Ee && Ue.x && !Ue.y || He && Ue.y && !Ue.x, It = fe || j || N || gs || hs || Ae || gt || we || Se || ke, tt = pa(Ue, oe), [At, Mt] = $(tt.G), [, Nt] = w(X), dn = j || C || Nt || _s || X, [Qo, Zo] = dn ? I(X) : H();
    return It && (Mt && le(tt.G), ie && Y && Rt(c, ie(tt, te, Y(tt, Ht, vs)))), k(!1), Ls(r, lt, Jt, Bt), Ls(n, Ps, Jt, Bt), re(e, {
      G: At,
      Vt: {
        x: _e.w,
        y: _e.h
      },
      Rt: {
        x: Ve.w,
        y: Ve.h
      },
      en: Ue,
      Pt: Ir(Qo, Ve)
    }), {
      nn: Mt,
      Zt: Ae,
      tn: gt,
      sn: Zo || gt,
      dn
    };
  };
}, Sa = (t) => {
  const [e, s, r] = xa(t), n = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    rt: {
      [so]: 0,
      [no]: 0,
      [to]: 0,
      [Jn]: 0,
      [Qn]: 0,
      [eo]: 0,
      [Zn]: 0
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
      x: ft,
      y: ft
    },
    en: {
      x: !1,
      y: !1
    },
    Pt: yo()
  }, { vt: c, gt: i, nt: d } = e, { R: l, M: u } = Ke(), h = !l && (u.x || u.y), f = [wa(e), ka(e, n), $a(e, n)];
  return [s, (v) => {
    const p = {}, x = h && Re(i);
    return ce(f, (b) => {
      re(p, b(v, p) || {});
    }), qe(i, x), !d && qe(c, 0), p;
  }, n, e, r];
}, Ca = (t, e, s, r, n) => {
  const c = Tn(e, {}), [i, d, l, u, h] = Sa(t), [f, v, p] = ga(u, l, c, (U) => {
    k({}, U);
  }), [_, x, , b] = ba(t, e, p, l, u, n), M = (U) => Ze(U).some((F) => !!U[F]), k = (U, F) => {
    if (s())
      return !1;
    const { fn: D, Tt: V, At: L, pn: T } = U, O = D || {}, A = !!V, S = {
      It: Tn(e, O, A),
      fn: O,
      Tt: A
    };
    if (T)
      return x(S), !1;
    const R = F || v(re({}, S, {
      At: L
    })), $ = d(re({}, S, {
      an: p,
      Gt: R
    }));
    x(re({}, S, {
      Gt: R,
      Qt: $
    }));
    const w = M(R), I = M($), H = w || I || !Xs(O) || A;
    return H && r(U, {
      Gt: R,
      Qt: $
    }), H;
  };
  return [() => {
    const { rn: U, gt: F } = u, D = Re(U), V = [f(), i(), _()];
    return qe(F, D), J(Ie, V);
  }, k, () => ({
    vn: p,
    hn: l
  }), {
    gn: u,
    bn: b
  }, h];
}, dt = (t, e, s) => {
  const { N: r } = Ke(), n = ss(t), c = n ? t : t.target, i = Co(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, h = (A) => {
      const S = ao(A), R = Ft(ua);
      return R ? R(S, !0) : S;
    }, f = re({}, r(), h(e)), [v, p, _] = Us(), [x, b, M] = Us(s), k = (A, S) => {
      M(A, S), _(A, S);
    }, [U, F, D, V, L] = Ca(t, f, () => d, ({ fn: A, Tt: S }, { Gt: R, Qt: $ }) => {
      const { ft: w, Ct: I, xt: H, Ht: ne, Et: ue, dt: le } = R, { Zt: B, tn: ee, nn: te, sn: X } = $;
      k("updated", [O, {
        updateHints: {
          sizeChanged: !!w,
          directionChanged: !!I,
          heightIntrinsicChanged: !!H,
          overflowEdgeChanged: !!B,
          overflowAmountChanged: !!ee,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!X,
          contentMutation: !!ne,
          hostMutation: !!ue,
          appear: !!le
        },
        changedOptions: A || {},
        force: !!S
      }]);
    }, (A) => k("scroll", [O, A])), T = (A) => {
      ia(c), Ie(l), d = !0, k("destroyed", [O, A]), p(), b();
    }, O = {
      options(A, S) {
        if (A) {
          const R = S ? r() : {}, $ = bo(f, re(R, h(A)));
          Xs($) || (re(f, $), F({
            fn: $
          }));
        }
        return re({}, f);
      },
      on: x,
      off: (A, S) => {
        A && S && b(A, S);
      },
      state() {
        const { vn: A, hn: S } = D(), { ct: R } = A, { Vt: $, Rt: w, G: I, en: H, cn: ne, un: ue, Pt: le } = S;
        return re({}, {
          overflowEdge: $,
          overflowAmount: w,
          overflowStyle: I,
          hasOverflow: H,
          scrollCoordinates: {
            start: le.T,
            end: le.D
          },
          padding: ne,
          paddingAbsolute: ue,
          directionRTL: R,
          destroyed: d
        });
      },
      elements() {
        const { vt: A, ht: S, cn: R, ot: $, bt: w, gt: I, Kt: H } = V.gn, { Ft: ne, Wt: ue } = V.bn, le = (ee) => {
          const { Mt: te, kt: X, Lt: fe } = ee;
          return {
            scrollbar: fe,
            track: X,
            handle: te
          };
        }, B = (ee) => {
          const { jt: te, Xt: X } = ee, fe = le(te[0]);
          return re({}, fe, {
            clone: () => {
              const P = le(X());
              return F({
                pn: !0
              }), P;
            }
          });
        };
        return re({}, {
          target: A,
          host: S,
          padding: R || $,
          viewport: $,
          content: w || $,
          scrollOffsetElement: I,
          scrollEventElement: H,
          scrollbarHorizontal: B(ne),
          scrollbarVertical: B(ue)
        });
      },
      update: (A) => F({
        Tt: A,
        At: !0
      }),
      destroy: J(T, !1),
      plugin: (A) => u[Ze(A)[0]]
    };
    return ye(l, [L]), la(c, O), Ao(Eo, dt, [O, v, u]), aa(V.gn.yt, !n && t.cancel) ? (T(!0), O) : (ye(l, U()), k("initialized", [O]), O.update(!0), O);
  }
  return i;
};
dt.plugin = (t) => {
  const e = Ge(t), s = e ? t : [t], r = s.map((n) => Ao(n, dt)[0]);
  return da(s), e ? r : r[0];
};
dt.valid = (t) => {
  const e = t && t.elements, s = Be(e) && e();
  return ts(s) && !!Co(s.target);
};
dt.env = () => {
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
function Ea() {
  let t;
  const e = E(null), s = Math.floor(Math.random() * 2 ** 32), r = E(!1), n = E([]), c = () => n.value, i = () => t.getSelection(), d = () => n.value.length, l = () => t.clearSelection(!0), u = E(), h = E(null), f = E(null), v = E(null);
  function p() {
    t = new ur({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: F, event: D, isDragging: V }) => {
      if (V)
        t.Interaction._reset(D);
      else {
        r.value = !1;
        const L = e.value.offsetWidth - D.offsetX, T = e.value.offsetHeight - D.offsetY;
        L < 15 && T < 15 && t.Interaction._reset(D), D.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(D);
      }
    }), document.addEventListener("dragleave", (F) => {
      !F.buttons && r.value && (r.value = !1);
    });
  }
  const _ = () => pt(() => {
    t.addSelection(
      t.getSelectables()
    ), x();
  }), x = () => {
    n.value = t.getSelection().map((F) => JSON.parse(F.dataset.item)), u.value(n.value);
  }, b = () => pt(() => {
    const F = c().map((D) => D.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((D) => F.includes(JSON.parse(D.dataset.item).path))
    ), x(), k();
  }), M = (F) => {
    u.value = F, t.subscribe("DS:end", ({ items: D, event: V, isDragging: L }) => {
      n.value = D.map((T) => JSON.parse(T.dataset.item)), F(D.map((T) => JSON.parse(T.dataset.item)));
    });
  }, k = () => {
    h.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (f.value.style.height = e.value.scrollHeight + "px", f.value.style.display = "block") : (f.value.style.height = "100%", f.value.style.display = "none"));
  }, U = (F) => {
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
    dt(v.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: dt
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (F) => {
        h.value = F;
      },
      scroll: (F, D) => {
        const { scrollOffsetElement: V } = F.elements();
        e.value.scrollTo({
          top: V.scrollTop,
          left: 0
        });
      }
    }), p(), k(), new ResizeObserver(k).observe(e.value), e.value.addEventListener("scroll", U), t.subscribe("DS:scroll", ({ isDragging: F }) => F || U());
  }), Gs(() => {
    t && t.stop();
  }), Bn(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: f,
    scrollBarContainer: v,
    getSelected: c,
    getSelection: i,
    selectAll: _,
    clearSelection: l,
    refreshSelection: b,
    getCount: d,
    onSelect: M
  };
}
function Ta(t, e) {
  const s = E(t), r = E(e), n = E([]), c = E([]), i = E([]), d = E(!1), l = E(5);
  let u = !1, h = !1;
  const f = St({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function v() {
    let k = [], U = [], F = r.value ?? s.value + "://";
    F.length === 0 && (n.value = []), F.replace(s.value + "://", "").split("/").forEach(function(L) {
      k.push(L), k.join("/") !== "" && U.push({
        basename: L,
        name: L,
        path: s.value + "://" + k.join("/"),
        type: "dir"
      });
    }), c.value = U;
    const [D, V] = _(U, l.value);
    i.value = V, n.value = D;
  }
  function p(k) {
    l.value = k, v();
  }
  function _(k, U) {
    return k.length > U ? [k.slice(-U), k.slice(0, -U)] : [k, []];
  }
  function x(k = null) {
    d.value = k ?? !d.value;
  }
  function b() {
    return n.value && n.value.length && !h;
  }
  const M = it(() => {
    var k;
    return ((k = n.value[n.value.length - 2]) == null ? void 0 : k.path) ?? s.value + "://";
  });
  return Ce(() => {
  }), Ne(r, v), Ce(v), {
    adapter: s,
    path: r,
    loading: u,
    searchMode: h,
    data: f,
    breadcrumbs: n,
    breadcrumbItems: c,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: x,
    isGoUpAvailable: b,
    parentFolderPath: M
  };
}
const Aa = (t, e) => {
  const s = _r(t.id), r = dr(), n = s.getStore("metricUnits", !1), c = $r(s, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (v) => Array.isArray(v) ? v : xr, h = s.getStore("persist-path", t.persist), f = h ? s.getStore("path", t.path) : t.path;
  return St({
    /** 
    * Core properties
    * */
    // app version
    version: wr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: s,
    // localization object
    i18n: br(s, d, r, i),
    // modal state
    modal: Sr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: it(() => Ea()),
    // http object
    requester: gr(t.request),
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
    filesize: n ? qn : zn,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: h,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Ta(l, f)
  });
}, Ma = /* @__PURE__ */ a("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Da = { class: "fixed z-10 inset-0 overflow-hidden" }, Va = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, La = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, We = {
  __name: "ModalLayout",
  setup(t) {
    const e = E(null), s = ae("ServiceContainer");
    return Ce(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), pt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const n = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: n,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, n) => (m(), g("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ct((c) => o(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Ma,
      a("div", Da, [
        a("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = rt((c) => o(s).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full"
          }, [
            a("div", Va, [
              Lt(r.$slots, "default")
            ]),
            a("div", La, [
              Lt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Oa = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, n] of e)
    s[r] = n;
  return s;
}, Ra = {
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
    }), Gs(() => {
      clearTimeout(i);
    }), {
      shown: n,
      t: c
    };
  }
}, Fa = { key: 1 };
function Ha(t, e, s, r, n, c) {
  return m(), g("div", {
    class: de(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    t.$slots.default ? Lt(t.$slots, "default", { key: 0 }) : (m(), g("span", Fa, y(r.t("Saved.")), 1))
  ], 2);
}
const _t = /* @__PURE__ */ Oa(Ra, [["render", Ha]]), Ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Ia = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), Na = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), Ua = [
  Ia,
  Na
];
function Pa(t, e) {
  return m(), g("svg", Ba, [...Ua]);
}
const za = { render: Pa }, qa = { class: "flex items-center my-1 space-x-2" }, ja = { class: "flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, Ga = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, et = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    return (e, s) => (m(), g("div", qa, [
      a("div", ja, [
        (m(), W(In(t.icon), { class: "p-0.5 h-6 w-6 stroke-blue-600 dark:stroke-blue-100" }))
      ]),
      a("h3", Ga, y(t.title), 1)
    ]));
  }
}, Ka = { class: "sm:items-start select-none" }, Wa = { class: "mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ya = {
  class: "flex overflow-auto",
  "aria-label": "Tabs"
}, Xa = ["onClick", "aria-current"], Ja = {
  key: 0,
  class: "mt-4"
}, Qa = { class: "m-1 text-sm text-gray-500" }, Za = {
  href: "https://vuefinder.ozdemir.be",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, el = {
  href: "https://github.com/n1crack/vuefinder",
  class: "block mt-2 text-sm text-blue-500 dark:text-blue-400",
  target: "_blank"
}, tl = {
  key: 1,
  class: "mt-2"
}, sl = { class: "m-1 text-sm text-gray-500" }, nl = { class: "mt-3 text-left" }, ol = { class: "space-y-2" }, rl = { class: "flex relative gap-x-3" }, al = { class: "h-6 items-center" }, ll = { class: "flex-1 block text-sm" }, il = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, cl = { class: "flex relative gap-x-3" }, dl = { class: "h-6 items-center" }, ul = { class: "flex-1 block text-sm" }, fl = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, ml = { class: "flex relative gap-x-3" }, pl = { class: "h-6 items-center" }, hl = { class: "flex-1 block text-sm" }, vl = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, gl = { class: "flex relative gap-x-3" }, _l = { class: "h-6 items-center" }, yl = { class: "flex-1 block text-sm" }, bl = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, xl = { class: "" }, wl = { class: "h-6 items-center" }, kl = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, $l = { class: "flex text-sm" }, Sl = ["label"], Cl = ["value"], El = {
  key: 0,
  class: ""
}, Tl = { class: "h-6 items-center" }, Al = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, Ml = { class: "flex text-sm" }, Dl = ["label"], Vl = ["value"], Ll = {
  key: 2,
  class: "mt-3"
}, Ol = { class: "space-y-2 sm:w-1/2" }, Rl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Fl = /* @__PURE__ */ a("kbd", null, "F2", -1), Hl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Bl = /* @__PURE__ */ a("kbd", null, "F5", -1), Il = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Nl = /* @__PURE__ */ a("kbd", null, "Del", -1), Ul = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Pl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Esc")
], -1), zl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, ql = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "A")
], -1), jl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Gl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "F")
], -1), Kl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Wl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "E")
], -1), Yl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Xl = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, ",")
], -1), Jl = { class: "flex justify-between text-sm text-gray-500 dark:text-gray-400" }, Ql = /* @__PURE__ */ a("div", null, [
  /* @__PURE__ */ a("kbd", null, "Ctrl"),
  /* @__PURE__ */ Q(" + "),
  /* @__PURE__ */ a("kbd", null, "Enter")
], -1), Zl = {
  key: 3,
  class: "mt-3"
}, ei = { class: "m-1 text-sm text-gray-500" }, Vo = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: n, changeLocale: c, locale: i } = e.i18n, d = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, l = it(() => [
      { name: n("About"), key: d.ABOUT },
      { name: n("Settings"), key: d.SETTINGS },
      { name: n("Shortcuts"), key: d.SHORTCUTS },
      { name: n("Reset"), key: d.RESET }
    ]), u = E("about"), h = async () => {
      r(), location.reload();
    }, f = (F) => {
      e.theme.set(F), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? qn : zn, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, p = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, _ = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, x = () => {
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
      }).filter(([F]) => Object.keys(b).includes(F))
    ), U = it(() => ({
      system: n("System"),
      light: n("Light"),
      dark: n("Dark")
    }));
    return (F, D) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: D[8] || (D[8] = (V) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(n)("Close")), 1)
      ]),
      default: se(() => [
        a("div", Ka, [
          q(et, {
            icon: o(za),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Wa, [
            a("div", null, [
              a("div", null, [
                a("nav", Ya, [
                  (m(!0), g(pe, null, $e(l.value, (V) => (m(), g("button", {
                    key: V.name,
                    onClick: (L) => u.value = V.key,
                    class: de([V.key === u.value ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-sky-500" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-600", "px-3 py-2 border-b font-medium text-sm"]),
                    "aria-current": V.current ? "page" : void 0
                  }, y(V.name), 11, Xa))), 128))
                ])
              ])
            ]),
            u.value === d.ABOUT ? (m(), g("div", Ja, [
              a("div", Qa, y(o(n)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", Za, y(o(n)("Project home")), 1),
              a("a", el, y(o(n)("Follow on GitHub")), 1)
            ])) : z("", !0),
            u.value === d.SETTINGS ? (m(), g("div", tl, [
              a("div", sl, y(o(n)("Customize your experience with the following settings.")), 1),
              a("div", nl, [
                a("fieldset", null, [
                  a("div", ol, [
                    a("div", rl, [
                      a("div", al, [
                        ve(a("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": D[0] || (D[0] = (V) => o(e).metricUnits = V),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).metricUnits]
                        ])
                      ]),
                      a("div", ll, [
                        a("label", il, [
                          Q(y(o(n)("Use Metric Units")) + " ", 1),
                          q(_t, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: se(() => [
                              Q(y(o(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", cl, [
                      a("div", dl, [
                        ve(a("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": D[1] || (D[1] = (V) => o(e).compactListView = V),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).compactListView]
                        ])
                      ]),
                      a("div", ul, [
                        a("label", fl, [
                          Q(y(o(n)("Compact list view")) + " ", 1),
                          q(_t, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: se(() => [
                              Q(y(o(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", ml, [
                      a("div", pl, [
                        ve(a("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": D[2] || (D[2] = (V) => o(e).persist = V),
                          onClick: x,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).persist]
                        ])
                      ]),
                      a("div", hl, [
                        a("label", vl, [
                          Q(y(o(n)("Persist path on reload")) + " ", 1),
                          q(_t, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: se(() => [
                              Q(y(o(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", gl, [
                      a("div", _l, [
                        ve(a("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": D[3] || (D[3] = (V) => o(e).showThumbnails = V),
                          onClick: _,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).showThumbnails]
                        ])
                      ]),
                      a("div", yl, [
                        a("label", bl, [
                          Q(y(o(n)("Show thumbnails")) + " ", 1),
                          q(_t, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: se(() => [
                              Q(y(o(n)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a("div", xl, [
                      a("div", wl, [
                        a("label", kl, y(o(n)("Theme")), 1)
                      ]),
                      a("div", $l, [
                        ve(a("select", {
                          id: "theme",
                          "onUpdate:modelValue": D[4] || (D[4] = (V) => o(e).theme.value = V),
                          onChange: D[5] || (D[5] = (V) => f(V.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: o(n)("Theme")
                          }, [
                            (m(!0), g(pe, null, $e(U.value, (V, L) => (m(), g("option", { value: L }, y(V), 9, Cl))), 256))
                          ], 8, Sl)
                        ], 544), [
                          [Cs, o(e).theme.value]
                        ]),
                        q(_t, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: se(() => [
                            Q(y(o(n)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    o(e).features.includes(o(he).LANGUAGE) && Object.keys(o(k)).length > 1 ? (m(), g("div", El, [
                      a("div", Tl, [
                        a("label", Al, y(o(n)("Language")), 1)
                      ]),
                      a("div", Ml, [
                        ve(a("select", {
                          id: "language",
                          "onUpdate:modelValue": D[6] || (D[6] = (V) => Nn(i) ? i.value = V : null),
                          onChange: D[7] || (D[7] = (V) => o(c)(V.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: o(n)("Language")
                          }, [
                            (m(!0), g(pe, null, $e(o(k), (V, L) => (m(), g("option", { value: L }, y(V), 9, Vl))), 256))
                          ], 8, Dl)
                        ], 544), [
                          [Cs, o(i)]
                        ]),
                        q(_t, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: se(() => [
                            Q(y(o(n)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : z("", !0)
                  ])
                ])
              ])
            ])) : z("", !0),
            u.value === d.SHORTCUTS ? (m(), g("div", Ll, [
              a("div", Ol, [
                a("div", Rl, [
                  a("div", null, y(o(n)("Rename")), 1),
                  Fl
                ]),
                a("div", Hl, [
                  a("div", null, y(o(n)("Refresh")), 1),
                  Bl
                ]),
                a("div", Il, [
                  Q(y(o(n)("Delete")) + " ", 1),
                  Nl
                ]),
                a("div", Ul, [
                  Q(y(o(n)("Escape")) + " ", 1),
                  Pl
                ]),
                a("div", zl, [
                  Q(y(o(n)("Select All")) + " ", 1),
                  ql
                ]),
                a("div", jl, [
                  Q(y(o(n)("Search")) + " ", 1),
                  Gl
                ]),
                a("div", Kl, [
                  Q(y(o(n)("Toggle Sidebar")) + " ", 1),
                  Wl
                ]),
                a("div", Yl, [
                  Q(y(o(n)("Open Settings")) + " ", 1),
                  Xl
                ]),
                a("div", Jl, [
                  Q(y(o(n)("Toggle Full Screen")) + " ", 1),
                  Ql
                ])
              ])
            ])) : z("", !0),
            u.value === d.RESET ? (m(), g("div", Zl, [
              a("div", ei, y(o(n)("Reset all settings to default")), 1),
              a("button", {
                onClick: h,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, y(o(n)("Reset Settings")), 1)
            ])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ti = ["title"], si = /* @__PURE__ */ a("svg", {
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
], -1), ni = [
  si
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
    Ne(d, () => c.value = !1);
    const l = () => {
      s("hidden"), c.value = !0;
    };
    return (h, f) => (m(), g("div", null, [
      c.value ? z("", !0) : (m(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: de(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", t.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        Lt(h.$slots, "default"),
        a("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          title: o(n)("Close")
        }, ni, 8, ti)
      ], 2))
    ]));
  }
}, oi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ri = /* @__PURE__ */ a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), ai = [
  ri
];
function li(t, e) {
  return m(), g("svg", oi, [...ai]);
}
const Lo = { render: li }, ii = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ci = { class: "mt-2" }, di = { class: "text-sm text-gray-500" }, ui = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, fi = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, mi = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), hi = [
  pi
], vi = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), _i = [
  gi
], yi = { class: "ml-1.5" }, bi = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, an = {
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
    return (i, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, y(o(s)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Cancel")), 1),
        a("div", bi, y(o(s)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(Lo),
            title: o(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", ii, [
            a("div", ci, [
              a("p", di, y(o(s)("Are you sure you want to delete these files?")), 1),
              a("div", ui, [
                (m(!0), g(pe, null, $e(r.value, (l) => (m(), g("p", fi, [
                  l.type === "dir" ? (m(), g("svg", mi, hi)) : (m(), g("svg", vi, _i)),
                  a("span", yi, y(l.basename), 1)
                ]))), 256))
              ]),
              n.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(n.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, wi = /* @__PURE__ */ a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), ki = [
  wi
];
function $i(t, e) {
  return m(), g("svg", xi, [...ki]);
}
const Oo = { render: $i }, Si = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ci = { class: "mt-2" }, Ei = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ti = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ai = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Mi = [
  Ai
], Di = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Li = [
  Vi
], Oi = { class: "ml-1.5" }, ln = {
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
    return (d, l) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, y(o(s)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(Oo),
            title: o(s)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", Si, [
            a("div", Ci, [
              a("p", Ei, [
                r.value.type === "dir" ? (m(), g("svg", Ti, Mi)) : (m(), g("svg", Di, Li)),
                a("span", Oi, y(r.value.basename), 1)
              ]),
              ve(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => n.value = u),
                onKeyup: Ct(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Et, n.value]
              ]),
              c.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(c.value), 1)
                ]),
                _: 1
              })) : z("", !0)
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
function Ri(t) {
  const e = (s) => {
    s.code === Xe.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (s.code === Xe.F2 && t.features.includes(he.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ln, { items: t.dragSelect.getSelected() })), s.code === Xe.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.code === Xe.DELETE && (!t.dragSelect.getCount() || t.modal.open(an, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === Xe.BACKSLASH && t.modal.open(Vo), s.metaKey && s.code === Xe.KEY_F && t.features.includes(he.SEARCH) && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Xe.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), s.metaKey && s.code === Xe.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), s.metaKey && s.code === Xe.KEY_A && (t.dragSelect.selectAll(), s.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  }), Gs(() => {
    t.root.removeEventListener("keydown", e);
  });
}
const Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Hi = /* @__PURE__ */ a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Bi = [
  Hi
];
function Ii(t, e) {
  return m(), g("svg", Fi, [...Bi]);
}
const Ro = { render: Ii }, Ni = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ui = { class: "mt-2" }, Pi = { class: "text-sm text-gray-500" }, zi = ["placeholder"], Fo = {
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
    return (i, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(o(s)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(Ro),
            title: o(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", Ni, [
            a("div", Ui, [
              a("p", Pi, y(o(s)("Create a new folder")), 1),
              ve(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Ct(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Folder Name"),
                type: "text"
              }, null, 40, zi), [
                [Et, r.value]
              ]),
              n.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(n.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ji = /* @__PURE__ */ a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Gi = [
  ji
];
function Ki(t, e) {
  return m(), g("svg", qi, [...Gi]);
}
const Ho = { render: Ki }, Wi = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Yi = { class: "mt-2" }, Xi = { class: "text-sm text-gray-500" }, Ji = ["placeholder"], Qi = {
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
    return (i, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(o(s)("Create")), 1),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(Ho),
            title: o(s)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", Wi, [
            a("div", Yi, [
              a("p", Xi, y(o(s)("Create a new file")), 1),
              ve(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Ct(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("File Name"),
                type: "text"
              }, null, 40, Ji), [
                [Et, r.value]
              ]),
              n.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(n.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function qs(t, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(s), "$2..$4");
}
const Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, ec = /* @__PURE__ */ a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), tc = [
  ec
];
function sc(t, e) {
  return m(), g("svg", Zi, [...tc]);
}
const Bo = { render: sc }, nc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, oc = { class: "mt-2" }, rc = {
  key: 0,
  class: "pointer-events-none"
}, ac = {
  key: 1,
  class: "pointer-events-none"
}, lc = ["disabled"], ic = ["disabled"], cc = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, dc = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, uc = ["textContent"], fc = { class: "ml-1 w-full h-fit" }, mc = { class: "text-left hidden md:block" }, pc = { class: "text-left md:hidden" }, hc = {
  key: 0,
  class: "ml-auto"
}, vc = ["title", "disabled", "onClick"], gc = /* @__PURE__ */ a("svg", {
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
], -1), _c = [
  gc
], yc = {
  key: 0,
  class: "py-2"
}, bc = ["disabled"], xc = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), n = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = E({ QUEUE_ENTRY_STATUS: n }), i = E(null), d = E(null), l = E(null), u = E(null), h = E(null), f = E(null), v = E([]), p = E(""), _ = E(!1), x = E(!1);
    let b;
    function M(R) {
      return v.value.findIndex(($) => $.id === R);
    }
    function k(R, $ = null) {
      $ = $ ?? (R.webkitRelativePath || R.name), b.addFile({
        name: $,
        type: R.type,
        data: R,
        source: "Local"
      });
    }
    function U(R) {
      switch (R.status) {
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
    const F = (R) => {
      switch (R.status) {
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
    function V() {
      if (!_.value) {
        if (!v.value.filter((R) => R.status !== n.DONE).length) {
          p.value = s("Please select file to upload first.");
          return;
        }
        p.value = "", b.retryAll(), b.upload();
      }
    }
    function L() {
      b.cancelAll({ reason: "user" }), v.value.forEach((R) => {
        R.status !== n.DONE && (R.status = n.CANCELED, R.statusName = s("Canceled"));
      }), _.value = !1;
    }
    function T(R) {
      _.value || (b.removeFile(R.id, "removed-by-user"), v.value.splice(M(R.id), 1));
    }
    function O(R) {
      if (!_.value) {
        if (b.cancelAll({ reason: "user" }), R) {
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
    function A() {
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
      b = new fr({
        debug: e.debug,
        restrictions: {
          maxFileSize: kr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(w, I) {
          if (I[w.id] != null) {
            const ne = M(w.id);
            v.value[ne].status === n.PENDING && (p.value = b.i18n("noDuplicates", { fileName: w.name })), v.value = v.value.filter((ue) => ue.id !== w.id);
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
      }), b.use(mr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(w, I) {
          let H;
          try {
            H = JSON.parse(w).message;
          } catch {
            H = s("Cannot parse server response.");
          }
          return new Error(H);
        }
      }), b.on("restriction-failed", (w, I) => {
        const H = v.value[M(w.id)];
        T(H), p.value = I.message;
      }), b.on("upload", () => {
        const w = S();
        b.setMeta({ ...w.body });
        const I = b.getPlugin("XHRUpload");
        I.opts.method = w.method, I.opts.endpoint = w.url + "?" + new URLSearchParams(w.params), I.opts.headers = w.headers, delete w.headers["Content-Type"], _.value = !0, v.value.forEach((H) => {
          H.status !== n.DONE && (H.percent = null, H.status = n.UPLOADING, H.statusName = s("Pending upload"));
        });
      }), b.on("upload-progress", (w, I) => {
        const H = Math.floor(I.bytesUploaded / I.bytesTotal * 100);
        v.value[M(w.id)].percent = `${H}%`;
      }), b.on("upload-success", (w) => {
        const I = v.value[M(w.id)];
        I.status = n.DONE, I.statusName = s("Done");
      }), b.on("upload-error", (w, I) => {
        const H = v.value[M(w.id)];
        H.percent = null, H.status = n.ERROR, I.isNetworkError ? H.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : H.statusName = I ? I.message : s("Unknown Error");
      }), b.on("error", (w) => {
        p.value = w.message, _.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), b.on("complete", () => {
        _.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), h.value.addEventListener("click", () => {
        l.value.click();
      }), f.value.addEventListener("dragover", (w) => {
        w.preventDefault(), x.value = !0;
      }), f.value.addEventListener("dragleave", (w) => {
        w.preventDefault(), x.value = !1;
      });
      function R(w, I) {
        I.isFile && I.file((H) => w(I, H)), I.isDirectory && I.createReader().readEntries((H) => {
          H.forEach((ne) => {
            R(w, ne);
          });
        });
      }
      f.value.addEventListener("drop", (w) => {
        w.preventDefault(), x.value = !1;
        const I = /^[/\\](.+)/;
        [...w.dataTransfer.items].forEach((H) => {
          H.kind === "file" && R((ne, ue) => {
            const le = I.exec(ne.fullPath);
            k(ue, le[1]);
          }, H.webkitGetAsEntry());
        });
      });
      const $ = ({ target: w }) => {
        const I = w.files;
        for (const H of I)
          k(H);
        w.value = "";
      };
      d.value.addEventListener("change", $), l.value.addEventListener("change", $);
    }), Un(() => {
      b == null || b.close({ reason: "unmount" });
    }), (R, $) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: de(["vf-btn vf-btn-primary", _.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: _.value,
          onClick: rt(V, ["prevent"])
        }, y(o(s)("Upload")), 11, bc),
        _.value ? (m(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: rt(L, ["prevent"])
        }, y(o(s)("Cancel")), 1)) : (m(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: rt(A, ["prevent"])
        }, y(o(s)("Close")), 1))
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(Bo),
            title: o(s)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", nc, [
            a("div", oc, [
              a("div", {
                ref_key: "dropArea",
                ref: f,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: D
              }, [
                x.value ? (m(), g("div", rc, y(o(s)("Release to drop these files.")), 1)) : (m(), g("div", ac, y(o(s)("Drag and drop the files/folders to here or click here.")), 1))
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
                }, y(o(s)("Select Files")), 513),
                a("button", {
                  ref_key: "pickFolders",
                  ref: h,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, y(o(s)("Select Folders")), 513),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: _.value,
                  onClick: $[0] || ($[0] = (w) => O(!1))
                }, y(o(s)("Clear all")), 9, lc),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: _.value,
                  onClick: $[1] || ($[1] = (w) => O(!0))
                }, y(o(s)("Clear only successful")), 9, ic)
              ], 512),
              a("div", cc, [
                (m(!0), g(pe, null, $e(v.value, (w) => (m(), g("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: w.id
                }, [
                  a("span", dc, [
                    a("span", {
                      class: de(["text-base m-auto", U(w)]),
                      textContent: y(F(w))
                    }, null, 10, uc)
                  ]),
                  a("div", fc, [
                    a("div", mc, y(o(qs)(w.name, 40)) + " (" + y(w.size) + ")", 1),
                    a("div", pc, y(o(qs)(w.name, 16)) + " (" + y(w.size) + ")", 1),
                    a("div", {
                      class: de(["flex break-all text-left", U(w)])
                    }, [
                      Q(y(w.statusName) + " ", 1),
                      w.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (m(), g("b", hc, y(w.percent), 1)) : z("", !0)
                    ], 2)
                  ]),
                  a("button", {
                    type: "button",
                    class: de(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", _.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: o(s)("Delete"),
                    disabled: _.value,
                    onClick: (I) => T(w)
                  }, _c, 10, vc)
                ]))), 128)),
                v.value.length ? z("", !0) : (m(), g("div", yc, y(o(s)("No files selected!")), 1))
              ]),
              p.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: $[2] || ($[2] = (w) => p.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(p.value), 1)
                ]),
                _: 1
              })) : z("", !0)
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
}, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, kc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), $c = [
  kc
];
function Sc(t, e) {
  return m(), g("svg", wc, [...$c]);
}
const Io = { render: Sc }, Cc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ec = { class: "mt-2" }, Tc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ac = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Dc = [
  Mc
], Vc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Lc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oc = [
  Lc
], Rc = { class: "ml-1.5" }, Fc = { class: "my-1 text-sm text-gray-500" }, No = {
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
    return (d, l) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, y(o(s)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(Io),
            title: o(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Cc, [
            a("div", Ec, [
              (m(!0), g(pe, null, $e(c.value, (u) => (m(), g("p", Tc, [
                u.type === "dir" ? (m(), g("svg", Ac, Dc)) : (m(), g("svg", Vc, Oc)),
                a("span", Rc, y(u.basename), 1)
              ]))), 256)),
              a("p", Fc, y(o(s)("The archive will be unarchived at")) + " (" + y(o(e).fs.data.dirname) + ")", 1),
              n.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(n.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Bc = /* @__PURE__ */ a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Ic = [
  Bc
];
function Nc(t, e) {
  return m(), g("svg", Hc, [...Ic]);
}
const Uo = { render: Nc }, Uc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Pc = { class: "mt-2" }, zc = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, qc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, jc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Kc = [
  Gc
], Wc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Xc = [
  Yc
], Jc = { class: "ml-1.5" }, Qc = ["placeholder"], Po = {
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
    return (d, l) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, y(o(s)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(Uo),
            title: o(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Uc, [
            a("div", Pc, [
              a("div", zc, [
                (m(!0), g(pe, null, $e(c.value, (u) => (m(), g("p", qc, [
                  u.type === "dir" ? (m(), g("svg", jc, Kc)) : (m(), g("svg", Wc, Xc)),
                  a("span", Jc, y(u.basename), 1)
                ]))), 256))
              ]),
              ve(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: Ct(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Qc), [
                [Et, r.value]
              ]),
              n.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => n.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(n.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, ed = /* @__PURE__ */ a("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), td = /* @__PURE__ */ a("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), sd = [
  ed,
  td
];
function nd(t, e) {
  return m(), g("svg", Zc, [...sd]);
}
const cn = { render: nd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, rd = /* @__PURE__ */ a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), ad = [
  rd
];
function ld(t, e) {
  return m(), g("svg", od, [...ad]);
}
const id = { render: ld }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, dd = /* @__PURE__ */ a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), ud = [
  dd
];
function fd(t, e) {
  return m(), g("svg", cd, [...ud]);
}
const md = { render: fd }, pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, hd = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), vd = [
  hd
];
function gd(t, e) {
  return m(), g("svg", pd, [...vd]);
}
const _d = { render: gd }, yd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, bd = /* @__PURE__ */ a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), xd = [
  bd
];
function wd(t, e) {
  return m(), g("svg", yd, [...xd]);
}
const kd = { render: wd }, $d = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm grow-0" }, Sd = {
  key: 0,
  class: "flex text-center"
}, Cd = ["title"], Ed = ["title"], Td = ["title"], Ad = ["title"], Md = ["title"], Dd = ["title"], Vd = ["title"], Ld = {
  key: 1,
  class: "flex text-center"
}, Od = { class: "pl-2" }, Rd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Fd = { class: "flex text-center items-center justify-end" }, Hd = ["title"], Bd = ["title"], Id = {
  __name: "Toolbar",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, n = e.dragSelect, c = E("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Ne(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", n.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (m(), g("div", $d, [
      c.value.length ? (m(), g("div", Ld, [
        a("div", Od, [
          Q(y(o(r)("Search results for")) + " ", 1),
          a("span", Rd, y(c.value), 1)
        ]),
        o(e).fs.loading ? (m(), W(o(cn), { key: 0 })) : z("", !0)
      ])) : (m(), g("div", Sd, [
        o(e).features.includes(o(he).NEW_FOLDER) ? (m(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (h) => o(e).modal.open(Fo, { items: o(n).getSelected() }))
        }, [
          q(o(Ro))
        ], 8, Cd)) : z("", !0),
        o(e).features.includes(o(he).NEW_FILE) ? (m(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (h) => o(e).modal.open(Qi, { items: o(n).getSelected() }))
        }, [
          q(o(Ho))
        ], 8, Ed)) : z("", !0),
        o(e).features.includes(o(he).RENAME) ? (m(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (h) => o(n).getCount() !== 1 || o(e).modal.open(ln, { items: o(n).getSelected() }))
        }, [
          q(o(Oo), {
            class: de(o(n).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Td)) : z("", !0),
        o(e).features.includes(o(he).DELETE) ? (m(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (h) => !o(n).getCount() || o(e).modal.open(an, { items: o(n).getSelected() }))
        }, [
          q(o(Lo), {
            class: de(o(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ad)) : z("", !0),
        o(e).features.includes(o(he).UPLOAD) ? (m(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (h) => o(e).modal.open(xc, { items: o(n).getSelected() }))
        }, [
          q(o(Bo))
        ], 8, Md)) : z("", !0),
        o(e).features.includes(o(he).UNARCHIVE) && o(n).getCount() === 1 && o(n).getSelected()[0].mime_type === "application/zip" ? (m(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (h) => !o(n).getCount() || o(e).modal.open(No, { items: o(n).getSelected() }))
        }, [
          q(o(Io), {
            class: de(o(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dd)) : z("", !0),
        o(e).features.includes(o(he).ARCHIVE) ? (m(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (h) => !o(n).getCount() || o(e).modal.open(Po, { items: o(n).getSelected() }))
        }, [
          q(o(Uo), {
            class: de(o(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : z("", !0)
      ])),
      a("div", Fd, [
        o(e).features.includes(o(he).FULL_SCREEN) ? (m(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (m(), W(o(md), { key: 0 })) : (m(), W(o(id), { key: 1 }))
        ], 8, Hd)) : z("", !0),
        a("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (h) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (m(), W(o(_d), {
            key: 0,
            class: de(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : z("", !0),
          o(e).view === "list" ? (m(), W(o(kd), {
            key: 1,
            class: de(c.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : z("", !0)
        ], 8, Bd)
      ])
    ]));
  }
}, Nd = (t, e = 0, s = !1) => {
  let r;
  return (...n) => {
    s && !r && t(...n), clearTimeout(r), r = setTimeout(() => {
      t(...n);
    }, e);
  };
}, Fn = (t, e, s) => {
  const r = E(t);
  return or((n, c) => ({
    get() {
      return n(), r.value;
    },
    set: Nd(
      (i) => {
        r.value = i, c();
      },
      e,
      s
    )
  }));
}, Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Pd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), zd = [
  Pd
];
function qd(t, e) {
  return m(), g("svg", Ud, [...zd]);
}
const jd = { render: qd }, Gd = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Kd = { class: "text-sm text-gray-500 pb-1" }, Wd = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, Yd = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Xd = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jd = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Qd = [
  Jd
], Zd = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, eu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), tu = [
  eu
], su = { class: "ml-1.5" }, nu = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, ou = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, ru = /* @__PURE__ */ a("svg", {
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
], -1), au = { class: "ml-1.5 overflow-auto" }, lu = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, js = {
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
    return (i, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(o(s)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Cancel")), 1),
        a("div", lu, y(o(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        a("div", null, [
          q(et, {
            icon: o(jd),
            title: o(s)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", Gd, [
            a("p", Kd, y(o(s)("Are you sure you want to move these files?")), 1),
            a("div", Wd, [
              (m(!0), g(pe, null, $e(r.value, (l) => (m(), g("div", Yd, [
                a("div", null, [
                  l.type === "dir" ? (m(), g("svg", Xd, Qd)) : (m(), g("svg", Zd, tu))
                ]),
                a("div", su, y(l.path), 1)
              ]))), 256))
            ]),
            a("h4", nu, y(o(s)("Target Directory")), 1),
            a("p", ou, [
              ru,
              a("span", au, y(o(e).modal.data.items.to.path), 1)
            ]),
            n.value.length ? (m(), W(Ye, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => n.value = ""),
              error: ""
            }, {
              default: se(() => [
                Q(y(n.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, cu = /* @__PURE__ */ a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), du = [
  cu
];
function uu(t, e) {
  return m(), g("svg", iu, [...du]);
}
const fu = { render: uu }, mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, pu = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), hu = [
  pu
];
function vu(t, e) {
  return m(), g("svg", mu, [...hu]);
}
const gu = { render: vu }, _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, yu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), bu = [
  yu
];
function xu(t, e) {
  return m(), g("svg", _u, [...bu]);
}
const wu = { render: xu }, ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, $u = /* @__PURE__ */ a("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), Su = [
  $u
];
function Cu(t, e) {
  return m(), g("svg", ku, [...Su]);
}
const Eu = { render: Cu }, Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Au = /* @__PURE__ */ a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Mu = [
  Au
];
function Du(t, e) {
  return m(), g("svg", Tu, [...Mu]);
}
const Vu = { render: Du }, Lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Ou = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Ru = [
  Ou
];
function Fu(t, e) {
  return m(), g("svg", Lu, [...Ru]);
}
const Hu = { render: Fu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Iu = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Nu = [
  Iu
];
function Uu(t, e) {
  return m(), g("svg", Bu, [...Nu]);
}
const ps = { render: Uu }, Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
}, zu = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), qu = /* @__PURE__ */ a("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), ju = [
  zu,
  qu
];
function Gu(t, e) {
  return m(), g("svg", Pu, [...ju]);
}
const Ku = { render: Gu }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Yu = /* @__PURE__ */ a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Xu = [
  Yu
];
function Ju(t, e) {
  return m(), g("svg", Wu, [...Xu]);
}
const Qu = { render: Ju }, Zu = { class: "space-x-0.5 flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm grow-0" }, e0 = ["title"], t0 = ["title"], s0 = ["title"], n0 = ["title"], o0 = { class: "flex leading-6" }, r0 = {
  key: 0,
  class: "flex"
}, a0 = /* @__PURE__ */ a("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), l0 = { class: "relative" }, i0 = /* @__PURE__ */ a("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), c0 = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], d0 = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, u0 = ["placeholder"], f0 = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, m0 = ["onDrop", "onClick"], p0 = { class: "flex pointer-events-none" }, h0 = { class: "inline-block w-full text-ellipsis overflow-hidden" }, v0 = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: n } = e.storage, c = E(null), i = Fn(0, 100);
    Ne(i, (L) => {
      const T = c.value.children;
      let O = 0, A = 0, S = 5, R = 1;
      e.fs.limitBreadcrumbItems(S), pt(() => {
        for (let $ = T.length - 1; $ >= 0 && !(O + T[$].offsetWidth > i.value - 40); $--)
          O += parseInt(T[$].offsetWidth, 10), A++;
        A < R && (A = R), A > S && (A = S), e.fs.limitBreadcrumbItems(A);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    Ce(() => {
      new ResizeObserver(d).observe(c.value);
    });
    const l = (L, T = null) => {
      L.preventDefault(), r.isDraggingRef.value = !1, f(L), T ?? (T = e.fs.hiddenBreadcrumbs.length - 1);
      let O = JSON.parse(L.dataTransfer.getData("items"));
      if (O.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: O,
          to: e.fs.hiddenBreadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (L, T = null) => {
      L.preventDefault(), r.isDraggingRef.value = !1, f(L), T ?? (T = e.fs.breadcrumbs.length - 2);
      let O = JSON.parse(L.dataTransfer.getData("items"));
      if (O.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: O,
          to: e.fs.breadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, h = (L) => {
      L.preventDefault(), e.fs.isGoUpAvailable() ? (L.dataTransfer.dropEffect = "copy", L.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (L.dataTransfer.dropEffect = "none", L.dataTransfer.effectAllowed = "none");
    }, f = (L) => {
      L.preventDefault(), L.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && L.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
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
    }, _ = (L) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: L.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, b = {
      mounted(L, T, O, A) {
        L.clickOutsideEvent = function(S) {
          L === S.target || L.contains(S.target) || T.value();
        }, document.body.addEventListener("click", L.clickOutsideEvent);
      },
      beforeUnmount(L, T, O, A) {
        document.body.removeEventListener("click", L.clickOutsideEvent);
      }
    }, M = () => {
      e.showTreeView = !e.showTreeView;
    };
    Ne(() => e.showTreeView, (L, T) => {
      L !== T && n("show-tree-view", L);
    });
    const k = E(null), U = () => {
      e.features.includes(he.SEARCH) && (e.fs.searchMode = !0, pt(() => k.value.focus()));
    }, F = Fn("", 400);
    Ne(F, (L) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: L });
    }), Ne(() => e.fs.searchMode, (L) => {
      L && pt(() => k.value.focus());
    });
    const D = () => {
      e.fs.searchMode = !1, F.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      D();
    });
    const V = () => {
      F.value === "" && D();
    };
    return (L, T) => (m(), g("div", Zu, [
      a("span", {
        title: o(s)("Toggle Tree View")
      }, [
        q(o(Ku), {
          onClick: M,
          class: de(["h-6 w-6 p-0.5 rounded cursor-pointer text-slate-700", o(e).showTreeView ? "bg-gray-300 dark:bg-gray-700" : ""])
        }, null, 8, ["class"])
      ], 8, e0),
      a("span", {
        title: o(s)("Go up a directory")
      }, [
        q(o(gu), {
          onDragover: T[0] || (T[0] = (O) => h(O)),
          onDragleave: T[1] || (T[1] = (O) => f(O)),
          onDrop: T[2] || (T[2] = (O) => u(O)),
          onClick: p,
          class: de(o(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, t0),
      o(e).fs.loading ? (m(), g("span", {
        key: 1,
        title: o(s)("Cancel")
      }, [
        q(o(wu), {
          onClick: T[3] || (T[3] = (O) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, n0)) : (m(), g("span", {
        key: 0,
        title: o(s)("Refresh")
      }, [
        q(o(fu), { onClick: v })
      ], 8, s0)),
      ve(a("div", {
        onClick: rt(U, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        a("div", null, [
          q(o(Eu), {
            onDragover: T[4] || (T[4] = (O) => h(O)),
            onDragleave: T[5] || (T[5] = (O) => f(O)),
            onDrop: T[6] || (T[6] = (O) => u(O, -1)),
            onClick: T[7] || (T[7] = (O) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        a("div", o0, [
          o(e).fs.hiddenBreadcrumbs.length ? ve((m(), g("div", r0, [
            a0,
            a("div", l0, [
              a("span", {
                onDragenter: T[8] || (T[8] = (O) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: T[9] || (T[9] = (O) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                q(o(Qu), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [b, x]
          ]) : z("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: rt(U, ["self"])
        }, [
          (m(!0), g(pe, null, $e(o(e).fs.breadcrumbs, (O, A) => (m(), g("div", { key: A }, [
            i0,
            a("span", {
              onDragover: (S) => A === o(e).fs.breadcrumbs.length - 1 || h(S),
              onDragleave: (S) => A === o(e).fs.breadcrumbs.length - 1 || f(S),
              onDrop: (S) => A === o(e).fs.breadcrumbs.length - 1 || u(S, A),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: O.basename,
              onClick: (S) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: O.path } })
            }, y(O.name), 41, c0)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (m(), W(o(cn), { key: 0 })) : z("", !0)
      ], 512), [
        [ze, !o(e).fs.searchMode]
      ]),
      ve(a("div", d0, [
        a("div", null, [
          q(o(Vu))
        ]),
        ve(a("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: Ct(D, ["esc"]),
          onBlur: V,
          "onUpdate:modelValue": T[10] || (T[10] = (O) => Nn(F) ? F.value = O : null),
          placeholder: o(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, u0), [
          [Et, o(F)]
        ]),
        q(o(Hu), { onClick: D })
      ], 512), [
        [ze, o(e).fs.searchMode]
      ]),
      ve(a("div", f0, [
        (m(!0), g(pe, null, $e(o(e).fs.hiddenBreadcrumbs, (O, A) => (m(), g("div", {
          key: A,
          onDragover: T[11] || (T[11] = (S) => h(S)),
          onDragleave: T[12] || (T[12] = (S) => f(S)),
          onDrop: (S) => l(S, A),
          onClick: (S) => _(O),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          a("div", p0, [
            a("span", null, [
              q(o(ps), { class: "h-5 w-5" })
            ]),
            Q(),
            a("span", h0, y(O.name), 1)
          ])
        ], 40, m0))), 128))
      ], 512), [
        [ze, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, zo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), g0 = ["onClick"], _0 = {
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
    }), (l, u) => (m(), g("div", {
      class: de([r.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2 z-10"])
    }, [
      q(rr, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: se(() => [
          (m(!0), g(pe, null, $e(n.value, (h, f) => (m(), g("div", {
            onClick: (v) => i(f),
            key: h,
            class: de([c(h.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, y(h.label), 11, g0))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, y0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, b0 = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), x0 = [
  b0
];
function w0(t, e) {
  return m(), g("svg", y0, [...x0]);
}
const k0 = { render: w0 }, $0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, S0 = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), C0 = [
  S0
];
function E0(t, e) {
  return m(), g("svg", $0, [...C0]);
}
const T0 = { render: E0 }, Wt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, s) => (m(), g("div", null, [
      t.direction === "asc" ? (m(), W(o(k0), { key: 0 })) : z("", !0),
      t.direction === "desc" ? (m(), W(o(T0), { key: 1 })) : z("", !0)
    ]));
  }
}, A0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, M0 = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), D0 = [
  M0
];
function V0(t, e) {
  return m(), g("svg", A0, [...D0]);
}
const L0 = { render: V0 }, $s = {
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
    return (e, s) => (m(), g("span", null, [
      t.type === "dir" ? (m(), W(o(ps), {
        key: 0,
        class: de({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"])) : (m(), W(o(L0), {
        key: 1,
        class: de({ "h-5 w-5": t.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !t.small })
      }, null, 8, ["class"]))
    ]));
  }
}, O0 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, R0 = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), F0 = [
  R0
];
function H0(t, e) {
  return m(), g("svg", O0, [...F0]);
}
const B0 = { render: H0 }, I0 = { class: "absolute -z-50 -top-96" }, N0 = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, U0 = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (s, r) => (m(), g("div", I0, [
      q(o(B0)),
      a("div", N0, y(e.count), 1)
    ]));
  }
}, P0 = { class: "flex" }, z0 = ["title"], q0 = { class: "ml-auto mb-2" }, j0 = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, G0 = { key: 1 }, K0 = {
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
    const f = () => {
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
    return (p, _) => (m(), g(pe, null, [
      a("div", P0, [
        a("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, y(o(u).modal.data.item.basename), 9, z0),
        a("div", q0, [
          i.value ? (m(), g("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, y(o(h)("Save")), 1)) : z("", !0),
          o(u).features.includes(o(he).EDIT) ? (m(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: _[0] || (_[0] = (x) => f())
          }, y(i.value ? o(h)("Cancel") : o(h)("Edit")), 1)) : z("", !0)
        ])
      ]),
      a("div", null, [
        i.value ? (m(), g("div", G0, [
          ve(a("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": _[1] || (_[1] = (x) => n.value = x),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh]",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Et, n.value]
          ])
        ])) : (m(), g("pre", j0, y(r.value), 1)),
        d.value.length ? (m(), W(Ye, {
          key: 2,
          onHidden: _[2] || (_[2] = (x) => d.value = ""),
          error: l.value
        }, {
          default: se(() => [
            Q(y(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : z("", !0)
      ])
    ], 64));
  }
}, W0 = { class: "flex" }, Y0 = ["title"], X0 = { class: "ml-auto mb-2" }, J0 = { class: "w-full flex justify-center" }, Q0 = ["src"], Z0 = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), { t: n } = r.i18n, c = E(null), i = E(null), d = E(!1), l = E(""), u = E(!1), h = () => {
      d.value = !d.value, d.value ? i.value = new hr(c.value, {
        crop(v) {
        }
      }) : i.value.destroy();
    }, f = () => {
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
          }).then((_) => {
            l.value = n("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), h(), s("success");
          }).catch((_) => {
            l.value = n(_.message), u.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      s("success");
    }), (v, p) => (m(), g(pe, null, [
      a("div", W0, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: o(r).modal.data.item.path
        }, y(o(r).modal.data.item.basename), 9, Y0),
        a("div", X0, [
          d.value ? (m(), g("button", {
            key: 0,
            onClick: f,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, y(o(n)("Crop")), 1)) : z("", !0),
          o(r).features.includes(o(he).EDIT) ? (m(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: p[0] || (p[0] = (_) => h())
          }, y(d.value ? o(n)("Cancel") : o(n)("Edit")), 1)) : z("", !0)
        ])
      ]),
      a("div", J0, [
        a("img", {
          ref_key: "image",
          ref: c,
          class: "max-w-[50vh] max-h-[50vh]",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Q0)
      ]),
      l.value.length ? (m(), W(Ye, {
        key: 0,
        onHidden: p[1] || (p[1] = (_) => l.value = ""),
        error: u.value
      }, {
        default: se(() => [
          Q(y(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : z("", !0)
    ], 64));
  }
}, ef = { class: "flex" }, tf = ["title"], sf = /* @__PURE__ */ a("div", null, null, -1), nf = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (n, c) => (m(), g(pe, null, [
      a("div", ef, [
        a("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: o(s).modal.data.item.path
        }, y(o(s).modal.data.item.basename), 9, tf)
      ]),
      sf
    ], 64));
  }
}, of = ["title"], rf = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, af = ["src"], lf = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e, n = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (m(), g("div", null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        title: o(s).modal.data.item.path
      }, y(o(s).modal.data.item.basename), 9, of),
      a("div", null, [
        a("video", rf, [
          a("source", {
            src: n(),
            type: "video/mp4"
          }, null, 8, af),
          Q(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, cf = ["title"], df = {
  class: "w-full",
  controls: ""
}, uf = ["src"], ff = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), n = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ce(() => {
      s("success");
    }), (c, i) => (m(), g(pe, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        title: o(r).modal.data.item.path
      }, y(o(r).modal.data.item.basename), 9, cf),
      a("div", null, [
        a("audio", df, [
          a("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, uf),
          Q(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, mf = ["title"], pf = ["data"], hf = ["src"], vf = /* @__PURE__ */ a("p", null, [
  /* @__PURE__ */ Q(" Your browser does not support PDFs. "),
  /* @__PURE__ */ a("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ Q(" . ")
], -1), gf = [
  vf
], _f = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e, n = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ce(() => {
      r("success");
    }), (c, i) => (m(), g(pe, null, [
      a("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        title: o(s).modal.data.item.path
      }, y(o(s).modal.data.item.basename), 9, mf),
      a("div", null, [
        a("object", {
          class: "h-[60vh]",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "border-0",
            src: n(),
            width: "100%",
            height: "100%"
          }, gf, 8, hf)
        ], 8, pf)
      ])
    ], 64));
  }
}, yf = { class: "mt-3 sm:mt-0 sm:text-left w-full" }, bf = { key: 0 }, xf = { class: "text-gray-700 dark:text-gray-200 text-sm" }, wf = {
  key: 0,
  class: "flex leading-5"
}, kf = /* @__PURE__ */ a("svg", {
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
], -1), $f = { class: "py-2 flex font-normal break-all text-gray-800 dark:text-gray-200 rounded text-xs" }, Sf = { class: "font-bold" }, Cf = { class: "font-bold pl-2" }, Ef = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, Tf = ["download", "href"], qo = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(!1), n = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(he.PREVIEW);
    return c || (r.value = !0), (i, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Close")), 1),
        o(e).features.includes(o(he).DOWNLOAD) ? (m(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, y(o(s)("Download")), 9, Tf)) : z("", !0)
      ]),
      default: se(() => [
        a("div", null, [
          a("div", yf, [
            o(c) ? (m(), g("div", bf, [
              n("text") ? (m(), W(K0, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : n("image") ? (m(), W(Z0, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : n("video") ? (m(), W(lf, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : n("audio") ? (m(), W(ff, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : n("application/pdf") ? (m(), W(_f, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (m(), W(nf, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : z("", !0),
            a("div", xf, [
              r.value === !1 ? (m(), g("div", wf, [
                kf,
                a("span", null, y(o(s)("Loading")), 1)
              ])) : z("", !0)
            ])
          ])
        ]),
        a("div", $f, [
          a("div", null, [
            a("span", Sf, y(o(s)("File Size")) + ": ", 1),
            Q(y(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", Cf, y(o(s)("Last Modified")) + ": ", 1),
            Q(" " + y(o(zo)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(he).DOWNLOAD) ? (m(), g("div", Ef, [
          a("span", null, y(o(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}, Af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Mf = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Df = /* @__PURE__ */ a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Vf = [
  Mf,
  Df
];
function Lf(t, e) {
  return m(), g("svg", Af, [...Vf]);
}
const jo = { render: Lf }, Of = ["data-type", "data-item", "data-index"], Ss = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = e.dragSelect, r = t, n = (p) => {
      p.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: p.path } })) : e.modal.open(qo, { adapter: e.fs.adapter, item: p });
    }, c = {
      mounted(p, _, x, b) {
        x.props.draggable && (p.addEventListener("dragstart", (M) => i(M, _.value)), p.addEventListener("dragover", (M) => l(M, _.value)), p.addEventListener("drop", (M) => d(M, _.value)));
      },
      beforeUnmount(p, _, x, b) {
        x.props.draggable && (p.removeEventListener("dragstart", i), p.removeEventListener("dragover", l), p.removeEventListener("drop", d));
      }
    }, i = (p, _) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      s.isDraggingRef.value = !0, p.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (p, _) => {
      p.preventDefault(), s.isDraggingRef.value = !1;
      let x = JSON.parse(p.dataTransfer.getData("items"));
      if (x.find((b) => b.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, { items: { from: x, to: _ } });
    }, l = (p, _) => {
      p.preventDefault(), !_ || _.type !== "dir" || s.getSelection().find((x) => x === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
    };
    let u = null, h = !1;
    const f = () => {
      u && clearTimeout(u);
    }, v = (p) => {
      if (!h)
        h = !0, setTimeout(() => h = !1, 300);
      else
        return h = !1, n(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const _ = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: p.target.getBoundingClientRect().x,
          clientY: p.target.getBoundingClientRect().y
        });
        p.target.dispatchEvent(_);
      }, 500);
    };
    return (p, _) => ve((m(), g("div", {
      style: rs({ opacity: o(s).isDraggingRef.value && o(s).getSelection().find((x) => p.$el === x) ? "0.5 !important" : "" }),
      class: de(["vf-item-" + o(s).explorerId, "relative"]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: _[0] || (_[0] = (x) => n(t.item)),
      onTouchstart: _[1] || (_[1] = (x) => v(x)),
      onTouchend: _[2] || (_[2] = (x) => f()),
      onContextmenu: _[3] || (_[3] = rt((x) => o(e).emitter.emit("vf-contextmenu-show", { event: x, items: o(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Lt(p.$slots, "default"),
      o(e).pinnedFolders.find((x) => x.path === t.item.path) ? (m(), W(o(jo), {
        key: 0,
        class: "absolute top-0 right-0 text-amber-600"
      })) : z("", !0)
    ], 46, Of)), [
      [c, t.item]
    ]);
  }
}, Rf = { class: "relative flex-auto flex flex-col" }, Ff = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, Hf = { class: "relative" }, Bf = { class: "grid grid-cols-12 items-center" }, If = { class: "flex col-span-7 items-center" }, Nf = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Uf = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Pf = { class: "grid grid-cols-12 items-center" }, zf = { class: "flex col-span-7 items-center" }, qf = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, jf = { class: "col-span-2 text-center" }, Gf = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, Kf = { class: "relative" }, Wf = ["data-src", "alt"], Yf = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Xf = { class: "break-all" }, Jf = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = (f) => f == null ? void 0 : f.substring(0, 3), n = E(null), c = E(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      c.value = f, f ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: f
        },
        onSuccess: (v) => {
          v.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = St({ active: !1, column: "", order: "" }), u = (f = !0) => {
      let v = [...e.fs.data.files], p = l.column, _ = l.order === "asc" ? 1 : -1;
      if (!f)
        return v;
      const x = (b, M) => typeof b == "string" && typeof M == "string" ? b.toLowerCase().localeCompare(M.toLowerCase()) : b < M ? -1 : b > M ? 1 : 0;
      return l.active && (v = v.slice().sort((b, M) => x(b[p], M[p]) * _)), v;
    }, h = (f) => {
      l.active && l.column === f ? (l.active = l.order === "asc", l.column = f, l.order = "desc") : (l.active = !0, l.column = f, l.order = "asc");
    };
    return Ce(() => {
      d = new pr(i.area.value);
    }), Bn(() => {
      d.update();
    }), Un(() => {
      d.destroy();
    }), (f, v) => (m(), g("div", Rf, [
      o(e).view === "list" || c.value.length ? (m(), g("div", Ff, [
        a("div", {
          onClick: v[0] || (v[0] = (p) => h("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          Q(y(o(s)("Name")) + " ", 1),
          ve(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? z("", !0) : (m(), g("div", {
          key: 0,
          onClick: v[1] || (v[1] = (p) => h("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          Q(y(o(s)("Size")) + " ", 1),
          ve(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? z("", !0) : (m(), g("div", {
          key: 1,
          onClick: v[2] || (v[2] = (p) => h("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          Q(y(o(s)("Date")) + " ", 1),
          ve(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (m(), g("div", {
          key: 2,
          onClick: v[3] || (v[3] = (p) => h("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          Q(y(o(s)("Filepath")) + " ", 1),
          ve(q(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : z("", !0)
      ])) : z("", !0),
      a("div", Hf, [
        q(U0, {
          ref_key: "dragImage",
          ref: n,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: o(i).scrollBarContainer,
        class: de(["vf-explorer-scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        a("div", {
          ref: o(i).scrollBar,
          class: "w-5 bg-transparent pointer-events-none"
        }, null, 512)
      ], 2),
      a("div", {
        ref: o(i).area,
        class: "h-full w-full text-xs p-1 vf-explorer-scrollbar vf-selector-area z-0 overflow-y-auto",
        onContextmenu: v[4] || (v[4] = rt((p) => o(e).emitter.emit("vf-contextmenu-show", { event: p, items: o(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (m(!0), g(pe, { key: 0 }, $e(u(), (p, _) => (m(), W(Ss, {
          item: p,
          index: _,
          dragImage: n.value,
          class: "vf-item vf-item-list"
        }, {
          default: se(() => [
            a("div", Bf, [
              a("div", If, [
                q($s, {
                  type: p.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Nf, y(p.basename), 1)
              ]),
              a("div", Uf, y(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0),
        o(e).view === "list" && !c.value.length ? (m(!0), g(pe, { key: 1 }, $e(u(), (p, _) => (m(), W(Ss, {
          item: p,
          index: _,
          dragImage: n.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: p.path
        }, {
          default: se(() => [
            a("div", Pf, [
              a("div", zf, [
                q($s, {
                  type: p.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", qf, y(p.basename), 1)
              ]),
              a("div", jf, y(p.file_size ? o(e).filesize(p.file_size) : ""), 1),
              a("div", Gf, y(o(zo)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : z("", !0),
        o(e).view === "grid" && !c.value.length ? (m(!0), g(pe, { key: 2 }, $e(u(!1), (p, _) => (m(), W(Ss, {
          item: p,
          index: _,
          dragImage: n.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: se(() => [
            a("div", null, [
              a("div", Kf, [
                (p.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (m(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, Wf)) : (m(), W($s, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && p.type !== "dir" ? (m(), g("div", Yf, y(r(p.extension)), 1)) : z("", !0)
              ]),
              a("span", Xf, y(o(qs)(p.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0)
      ], 544),
      q(_0)
    ]));
  }
}, Qf = ["href", "download"], Zf = ["onClick"], em = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = E(null), n = E([]), c = E(""), i = St({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = it(() => i.items.filter((f) => f.key == null || e.features.includes(f.key)));
    e.emitter.on("vf-context-selected", (f) => {
      n.value = f;
    });
    const l = {
      newfolder: {
        key: he.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(Fo)
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
          e.pinnedFolders = e.pinnedFolders.filter((f) => !n.value.find((v) => v.path === f.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: he.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.modal.open(an, { items: n });
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
        action: () => e.modal.open(qo, { adapter: e.fs.adapter, item: n.value[0] })
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
        key: he.DOWNLOAD,
        link: it(() => e.requester.getDownloadUrl(e.fs.adapter, n.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: he.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(Po, { items: n })
      },
      unarchive: {
        key: he.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(No, { items: n })
      },
      rename: {
        key: he.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(ln, { items: n })
      }
    }, u = (f) => {
      e.emitter.emit("vf-contextmenu-hide"), f.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      c.value = f;
    }), e.emitter.on("vf-contextmenu-show", ({ event: f, items: v, target: p = null }) => {
      if (i.items = [], c.value)
        if (p)
          i.items.push(l.openDir), e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else !p && !c.value ? (i.items.push(l.refresh), i.items.push(l.selectAll), i.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((_) => _.path === p.path) ? (i.items.push(l.refresh), i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", v)) : (p.type === "dir" ? (i.items.push(l.open), e.pinnedFolders.findIndex((_) => _.path === p.path) !== -1 ? i.items.push(l.unpinFolder) : i.items.push(l.pinFolder)) : (i.items.push(l.preview), i.items.push(l.download)), i.items.push(l.rename), p.mime_type === "application/zip" ? i.items.push(l.unarchive) : i.items.push(l.archive), i.items.push(l.delete), e.emitter.emit("vf-context-selected", [p]));
      h(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const h = (f) => {
      const v = e.dragSelect.area.value, p = e.root.getBoundingClientRect(), _ = v.getBoundingClientRect();
      let x = f.clientX - p.left, b = f.clientY - p.top;
      i.active = !0, pt(() => {
        var F;
        const M = (F = r.value) == null ? void 0 : F.getBoundingClientRect();
        let k = (M == null ? void 0 : M.height) ?? 0, U = (M == null ? void 0 : M.width) ?? 0;
        x = _.right - f.pageX + window.scrollX < U ? x - U : x, b = _.bottom - f.pageY + window.scrollY < k ? b - k : b, i.positions = {
          left: x + "px",
          top: b + "px"
        };
      });
    };
    return (f, v) => ve((m(), g("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: rs(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (m(!0), g(pe, null, $e(d.value, (p) => (m(), g("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: p.title
      }, [
        p.link ? (m(), g("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: p.link,
          download: p.link,
          onClick: v[0] || (v[0] = (_) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, y(p.title()), 1)
        ], 8, Qf)) : (m(), g("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (_) => u(p)
        }, [
          a("span", null, y(p.title()), 1)
        ], 8, Zf))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, tm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, sm = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), nm = [
  sm
];
function om(t, e) {
  return m(), g("svg", tm, [...nm]);
}
const Go = { render: om }, rm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, am = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), lm = [
  am
];
function im(t, e) {
  return m(), g("svg", rm, [...lm]);
}
const cm = { render: im }, dm = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0" }, um = { class: "flex leading-5 items-center" }, fm = ["title"], mm = { class: "z-[1] pointer-events-none" }, pm = ["value"], hm = { class: "ml-3" }, vm = { key: 0 }, gm = { class: "ml-1" }, _m = { class: "flex leading-5 items-center justify-end" }, ym = ["disabled"], bm = ["title"], xm = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, n = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = E("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = it(() => {
      const l = e.selectButton.multiple ? n.getSelected().length > 0 : n.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (m(), g("div", dm, [
      a("div", um, [
        a("div", {
          class: "flex leading-5 items-center rounded border dark:bg-gray-700 dark:border-gray-600",
          title: o(s)("Storage")
        }, [
          a("div", mm, [
            q(o(Go))
          ]),
          ve(a("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (h) => o(e).fs.adapter = h),
            onChange: c,
            class: "border-0 py-0.5 text-xs text-slate-500 bg-white dark:text-neutral-50 dark:bg-gray-700 rounded uppercase focus:outline-0 cursor-pointer",
            tabindex: "-1"
          }, [
            (m(!0), g(pe, null, $e(o(e).fs.data.storages, (h) => (m(), g("option", { value: h }, y(h), 9, pm))), 256))
          ], 544), [
            [Cs, o(e).fs.adapter]
          ])
        ], 8, fm),
        a("div", hm, [
          i.value.length ? (m(), g("span", vm, y(o(e).fs.data.files.length) + " items found. ", 1)) : z("", !0),
          a("span", gm, y(o(e).dragSelect.getCount() > 0 ? o(s)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", _m, [
        o(e).selectButton.active ? (m(), g("button", {
          key: 0,
          class: de(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (h) => o(e).selectButton.click(o(n).getSelected(), h))
        }, y(o(s)("Select")), 11, ym)) : z("", !0),
        a("span", {
          class: "mr-1",
          title: o(s)("About"),
          onClick: u[2] || (u[2] = (h) => o(e).modal.open(Vo))
        }, [
          q(o(cm))
        ], 8, bm)
      ])
    ]));
  }
}, wm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, km = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), $m = [
  km
];
function Sm(t, e) {
  return m(), g("svg", wm, [...$m]);
}
const Ko = { render: Sm }, Cm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Em = /* @__PURE__ */ a("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Tm = /* @__PURE__ */ a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Am = [
  Em,
  Tm
];
function Mm(t, e) {
  return m(), g("svg", Cm, [...Am]);
}
const Dm = { render: Mm }, Vm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Lm = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Om = /* @__PURE__ */ a("path", { d: "M15 12H9M12 9v6" }, null, -1), Rm = [
  Lm,
  Om
];
function Fm(t, e) {
  return m(), g("svg", Vm, [...Rm]);
}
const Wo = { render: Fm }, Hm = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Bm = /* @__PURE__ */ a("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Im = /* @__PURE__ */ a("path", { d: "M9 12h6" }, null, -1), Nm = [
  Bm,
  Im
];
function Um(t, e) {
  return m(), g("svg", Hm, [...Nm]);
}
const Yo = { render: Um };
function Xo(t, e) {
  const s = t.findIndex((r) => r.path === e.path);
  s > -1 ? t[s] = e : t.push(e);
}
const Pm = { class: "h-5 w-5 shrink-0" }, zm = {
  key: 1,
  class: "cursor-pointer"
}, Jo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ar({
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
    const r = Pn(t, "modelValue"), n = E(!1);
    Ne(
      () => r.value,
      () => {
        var d;
        return ((d = c()) == null ? void 0 : d.folders.length) || i();
      }
    );
    function c() {
      return s.treeViewData.find((d) => d.path === e.path);
    }
    const i = () => {
      n.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Xo(s.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        n.value = !1;
      });
    };
    return (d, l) => {
      var u;
      return m(), g("div", Pm, [
        n.value ? (m(), W(o(cn), {
          key: 0,
          class: "p-1"
        })) : (m(), g("div", zm, [
          r.value && ((u = c()) != null && u.folders.length) ? (m(), W(o(Yo), {
            key: 0,
            class: "text-gray-600"
          })) : z("", !0),
          r.value ? z("", !0) : (m(), W(o(Wo), {
            key: 1,
            class: "text-gray-400"
          }))
        ]))
      ]);
    };
  }
}, qm = { class: "block" }, jm = { class: "flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded" }, Gm = ["onClick"], Km = ["onClick"], Wm = { class: "h-5 w-5 shrink-0" }, Ym = { class: "pl-4" }, Xm = {
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
    const e = ae("ServiceContainer"), s = E([]), r = t, n = it(() => {
      var c;
      return ((c = e.treeViewData.find((i) => i.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, i) => {
      const d = lr("TreeSubfolderList", !0);
      return m(), g("ul", qm, [
        (m(!0), g(pe, null, $e(n.value, (l, u) => (m(), g("li", {
          class: "flex flex-col space-x-0.5 py-0.5 text-sm",
          key: l.path
        }, [
          a("div", jm, [
            a("div", {
              class: "h-5 w-5 shrink-0",
              onClick: (h) => s.value[l.path] = !s.value[l.path]
            }, [
              q(Jo, {
                adapter: t.adapter,
                path: l.path,
                modelValue: s.value[l.path],
                "onUpdate:modelValue": (h) => s.value[l.path] = h
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Gm),
            a("div", {
              class: "flex cursor-pointer",
              onClick: (h) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: l.path } })
            }, [
              a("div", Wm, [
                o(e).fs.path === l.path ? (m(), W(o(Ko), { key: 0 })) : (m(), W(o(ps), { key: 1 }))
              ]),
              a("div", {
                class: de(["text-nowrap", { "underline decoration-blue-300 dark:decoration-gray-400": o(e).fs.path === l.path }])
              }, y(l.basename), 3)
            ], 8, Km)
          ]),
          a("div", Ym, [
            ve(q(d, {
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
}, Jm = { class: "pointer-events-none pr-1" }, Qm = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = E(!1);
    return (r, n) => (m(), g(pe, null, [
      a("div", {
        onClick: n[1] || (n[1] = (c) => s.value = !s.value),
        class: "p-1 py-1.5 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between bg-gray-100 dark:bg-[#2e3c51] border-b dark:border-gray-600 cursor-pointer"
      }, [
        a("div", {
          class: de(["flex flex-1 space-x-1 items-center", t.storage === o(e).fs.adapter ? "text-gray-700/80 dark:text-gray-300/80 text-bold" : ""])
        }, [
          a("div", {
            class: de(["h-5 w-5 shrink-0", t.storage === o(e).fs.adapter ? "text-sky-500 dark:text-slate-300" : ""])
          }, [
            q(o(Go))
          ], 2),
          a("div", null, y(t.storage), 1)
        ], 2),
        a("div", Jm, [
          q(Jo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": n[0] || (n[0] = (c) => s.value = c)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ve(q(Xm, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "overflow-x-auto my-1"
      }, null, 8, ["adapter", "path"]), [
        [ze, s.value]
      ])
    ], 64));
  }
}, Zm = { class: "h-5 w-5 shrink-0" }, ep = { class: "cursor-pointer" }, tp = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Pn(t, "modelValue");
    return (s, r) => (m(), g("div", Zm, [
      a("div", ep, [
        e.value ? (m(), W(o(Yo), {
          key: 0,
          class: "text-gray-600"
        })) : z("", !0),
        e.value ? z("", !0) : (m(), W(o(Wo), {
          key: 1,
          class: "text-gray-400"
        }))
      ])
    ]));
  }
}, sp = { class: "sticky left-0 dark:border-gray-600" }, np = { class: "flex items-center space-x-1" }, op = { class: "text-nowrap" }, rp = {
  key: 0,
  class: "block my-1"
}, ap = { class: "flex pl-2 py-0.5 text-sm justify-between pr-2" }, lp = ["onClick"], ip = ["title"], cp = ["onClick"], dp = { key: 0 }, up = { class: "p-1 text-xs text-center" }, fp = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { getStore: r, setStore: n } = e.storage, c = E(190), i = E(r("pinned-folders-opened", !0));
    Ne(i, (h) => n("pinned-folders-opened", h));
    const d = (h) => {
      e.pinnedFolders = e.pinnedFolders.filter((f) => f.path !== h.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (h) => {
      const f = h.clientX, v = h.target.parentElement, p = v.getBoundingClientRect().width;
      v.classList.remove("transition-[width]"), v.classList.add("transition-none");
      const _ = (b) => {
        c.value = p + b.clientX - f, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, x = () => {
        const b = v.getBoundingClientRect();
        c.value = b.width, v.classList.add("transition-[width]"), v.classList.remove("transition-none"), window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", x);
      };
      window.addEventListener("mousemove", _), window.addEventListener("mouseup", x);
    }, u = E(null);
    return Ce(() => {
      dt(u.value, {});
    }), Ne(e.fs.data, (h, f) => {
      const v = h.files.filter((p) => p.type === "dir");
      Xo(e.treeViewData, { path: e.fs.path, folders: v.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (h, f) => (m(), g(pe, null, [
      a("div", {
        onClick: f[0] || (f[0] = (v) => o(e).showTreeView = !o(e).showTreeView),
        class: de(["w-full h-full bg-gray-300/10 dark:bg-gray-700/10 z-[1]", o(e).showTreeView ? "backdrop-blur-sm absolute md:hidden" : "hidden"])
      }, null, 2),
      a("div", {
        style: rs(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "absolute h-full md:h-auto md:relative shadow-lg shrink-0 transition-[width] ease-in-out duration-200 z-[1] bg-gray-50 dark:bg-[#242f41]"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "h-full border-r dark:border-gray-600/50 pb-4"
        }, [
          a("div", sp, [
            a("div", {
              onClick: f[2] || (f[2] = (v) => i.value = !i.value),
              class: "pr-2 bg-gray-100 dark:bg-[#2e3c51] dark:border-gray-600 border-b p-1 py-1.5 uppercase font-bold text-gray-400 dark:text-gray-400 text-xs flex items-center justify-between cursor-pointer"
            }, [
              a("div", np, [
                q(o(jo), { class: "text-amber-600" }),
                a("div", op, y(o(s)("Pinned Folders")), 1)
              ]),
              q(tp, {
                modelValue: i.value,
                "onUpdate:modelValue": f[1] || (f[1] = (v) => i.value = v)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (m(), g("ul", rp, [
              (m(!0), g(pe, null, $e(o(e).pinnedFolders, (v) => (m(), g("li", ap, [
                a("div", {
                  class: "flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer",
                  onClick: (p) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: v.storage, path: v.path } })
                }, [
                  o(e).fs.path !== v.path ? (m(), W(o(ps), {
                    key: 0,
                    class: "h-5 w-5"
                  })) : z("", !0),
                  o(e).fs.path === v.path ? (m(), W(o(Ko), {
                    key: 1,
                    class: "h-5 w-5"
                  })) : z("", !0),
                  a("div", {
                    title: v.path,
                    class: de(["text-nowrap", { "underline decoration-blue-300 dark:decoration-gray-400": o(e).fs.path === v.path }])
                  }, y(v.basename), 11, ip)
                ], 8, lp),
                a("div", {
                  class: "cursor-pointer",
                  onClick: (p) => d(v)
                }, [
                  q(o(Dm), { class: "p-0.5 text-gray-300 hover:text-gray-400 dark:text-gray-600 hover:dark:text-gray-400" })
                ], 8, cp)
              ]))), 256)),
              o(e).pinnedFolders.length ? z("", !0) : (m(), g("li", dp, [
                a("div", up, y(o(s)("No folders pinned")), 1)
              ]))
            ])) : z("", !0)
          ]),
          (m(!0), g(pe, null, $e(o(e).fs.data.storages, (v) => (m(), g("div", null, [
            q(Qm, { storage: v }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: l,
          class: de([(o(e).showTreeView, ""), "transition-colors ease-in-out duration-200 top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, mp = { class: "relative flex overflow-hidden h-full" }, pp = {
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
    const s = e, n = Aa(t, ae("VueFinderOptions"));
    ir("ServiceContainer", n);
    const { setStore: c } = n.storage, i = E(null);
    n.root = i;
    const d = n.dragSelect;
    Ri(n);
    const l = (h) => {
      Object.assign(n.fs.data, h), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return n.emitter.on("vf-fetch-abort", () => {
      u.abort(), n.fs.loading = !1;
    }), n.emitter.on("vf-fetch", ({ params: h, body: f = null, onSuccess: v = null, onError: p = null, noCloseModal: _ = !1 }) => {
      ["index", "search"].includes(h.q) && (u && u.abort(), n.fs.loading = !0), u = new AbortController();
      const x = u.signal;
      n.requester.send({
        url: "",
        method: h.m || "get",
        params: h,
        body: f,
        abortSignal: x
      }).then((b) => {
        n.fs.adapter = b.adapter, n.persist && (n.fs.path = b.dirname, c("path", n.fs.path)), ["index", "search"].includes(h.q) && (n.fs.loading = !1), _ || n.modal.close(), l(b), v && v(b);
      }).catch((b) => {
        console.error(b), p && p(b);
      });
    }), Ce(() => {
      let h = {};
      n.fs.path.includes("://") && (h = {
        adapter: n.fs.path.split("://")[0],
        path: n.fs.path
      }), n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, ...h } }), d.onSelect((f) => {
        s("select", f);
      });
    }), (h, f) => (m(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      a("div", {
        class: de(o(n).theme.actualValue)
      }, [
        a("div", {
          class: de([o(n).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded resize-y ", "overflow-hidden min-h-44 border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: rs(o(n).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: f[0] || (f[0] = (v) => o(n).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: f[1] || (f[1] = (v) => o(n).emitter.emit("vf-contextmenu-hide"))
        }, [
          q(Id),
          q(v0),
          a("div", mp, [
            q(fp),
            q(Jf)
          ]),
          q(xm)
        ], 38),
        q(cr, { name: "fade" }, {
          default: se(() => [
            o(n).modal.visible ? (m(), W(In(o(n).modal.type), { key: 0 })) : z("", !0)
          ]),
          _: 1
        }),
        q(em)
      ], 2)
    ], 512));
  }
}, Sp = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", pp);
  }
};
export {
  Sp as default
};
