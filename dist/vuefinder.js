var er = Object.defineProperty;
var tr = (t, e, s) => e in t ? er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var mn = (t, e, s) => tr(t, typeof e != "symbol" ? e + "" : e, s);
import { reactive as St, watch as Be, ref as C, shallowRef as sr, onMounted as Ce, onUnmounted as Gs, onUpdated as Bn, nextTick as ht, computed as ct, inject as ae, openBlock as m, createElementBlock as g, withKeys as Ct, unref as o, createElementVNode as a, withModifiers as at, renderSlot as Lt, normalizeClass as de, toDisplayString as y, createBlock as W, resolveDynamicComponent as In, withCtx as se, createVNode as z, Fragment as he, renderList as $e, createCommentVNode as P, withDirectives as ve, vModelCheckbox as jt, createTextVNode as Q, vModelSelect as Cs, vModelText as Et, onBeforeUnmount as Nn, customRef as nr, vShow as ze, isRef as or, TransitionGroup as rr, normalizeStyle as rs, mergeModels as ar, useModel as Un, resolveComponent as lr, provide as ir, Transition as cr } from "vue";
import dr from "mitt";
import ur from "dragselect";
import fr from "@uppy/core";
import mr from "@uppy/xhr-upload";
import hr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import pr from "cropperjs";
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
    const n = Object.assign({}, s.headers, r, e.headers), i = Object.assign({}, s.params, e.params), c = e.body, d = s.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (c instanceof FormData ? (u = c, s.body != null && Object.entries(this.config.body).forEach(([f, v]) => {
      u.append(f, v);
    })) : (u = { ...c }, s.body != null && Object.assign(u, this.config.body)));
    const p = {
      url: d,
      method: l,
      headers: n,
      params: i,
      body: u
    };
    if (s.transformRequest != null) {
      const f = s.transformRequest({
        url: d,
        method: l,
        headers: n,
        params: i,
        body: u
      });
      f.url != null && (p.url = f.url), f.method != null && (p.method = f.method), f.params != null && (p.params = f.params ?? {}), f.headers != null && (p.headers = f.headers ?? {}), f.body != null && (p.body = f.body);
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
    }, i = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let d;
      s.body instanceof FormData ? d = e.body : (d = JSON.stringify(s.body), n.headers["Content-Type"] = "application/json"), n.body = d;
    }
    const c = await fetch(i, n);
    if (c.ok)
      return await c[r]();
    throw await c.json();
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
  Be(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(t + "_storage", JSON.stringify(s)) : localStorage.removeItem(t + "_storage");
  }
  function n(l, u) {
    s[l] = u;
  }
  function i(l) {
    delete s[l];
  }
  function c() {
    Object.keys(s).map((l) => i(l));
  }
  return { getStore: (l, u = null) => s.hasOwnProperty(l) ? s[l] : u, setStore: n, removeStore: i, clearStore: c };
}
async function yr(t, e) {
  const s = e[t];
  return typeof s == "function" ? (await s()).default : s;
}
function br(t, e, s, r) {
  const { getStore: n, setStore: i } = t, c = C({}), d = C(n("locale", e)), l = (f, v = e) => {
    yr(f, r).then((h) => {
      c.value = h, i("locale", f), d.value = f, i("translations", h), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + f }), s.emit("vf-language-saved"));
    }).catch((h) => {
      v ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(v, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Be(d, (f) => {
    l(f);
  }), !n("locale") && !r.length ? l(e) : c.value = n("translations");
  const u = (f, ...v) => v.length ? u(f = f.replace("%s", v.shift()), ...v) : f;
  function p(f, ...v) {
    return c.value && c.value.hasOwnProperty(f) ? u(c.value[f], ...v) : u(f, ...v);
  }
  return St({ t: p, locale: d });
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
}, xr = Object.values(pe), wr = "2.5.14";
function Pn(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1024, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "iB" : "B");
}
function zn(t, e, s, r, n) {
  return (e = Math, s = e.log, r = 1e3, n = s(t) / s(r) | 0, t / e.pow(r, n)).toFixed(0) + " " + (n ? "KMGTPEZY"[--n] + "B" : "B");
}
function kr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const nt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function $r(t, e) {
  const s = C(nt.SYSTEM), r = C(nt.LIGHT);
  s.value = t.getStore("theme", e ?? nt.SYSTEM);
  const n = window.matchMedia("(prefers-color-scheme: dark)"), i = (c) => {
    s.value === nt.DARK || s.value === nt.SYSTEM && c.matches ? r.value = nt.DARK : r.value = nt.LIGHT;
  };
  return i(n), n.addEventListener("change", i), {
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
    set(c) {
      s.value = c, c !== nt.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), i(n);
    }
  };
}
function Sr() {
  const t = sr(null), e = C(!1), s = C();
  return { visible: e, type: t, data: s, open: (i, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = i, s.value = c;
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
  let i = s, c;
  const d = (p, f) => {
    const v = i, h = p, _ = f || (r ? !r(v, h) : v !== h);
    return (_ || n) && (i = h, c = v), [i, _, c];
  };
  return [e ? (p) => d(e(i, c), p) : d, (p) => [i, !!p, c]];
}, qn = typeof window < "u" && typeof document < "u", Me = qn ? window : {}, jn = Math.max, Cr = Math.min, Es = Math.round, Qt = Math.abs, hn = Math.sign, Gn = Me.cancelAnimationFrame, Ks = Me.requestAnimationFrame, Zt = Me.setTimeout, Ts = Me.clearTimeout, as = (t) => typeof Me[t] < "u" ? Me[t] : void 0, Er = as("MutationObserver"), pn = as("IntersectionObserver"), es = as("ResizeObserver"), As = as("ScrollTimeline"), Kn = qn && Node.ELEMENT_NODE, { toString: $h, hasOwnProperty: bs } = Object.prototype, ls = (t) => t === void 0, Ws = (t) => t === null, je = (t) => typeof t == "number", is = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Ie = (t) => typeof t == "function", Ge = (t) => Array.isArray(t), Ot = (t) => typeof t == "object" && !Ge(t) && !Ws(t), cs = (t) => {
  const e = !!t && t.length, s = je(e) && e > -1 && e % 1 == 0;
  return Ge(t) || !Ie(t) && s ? e > 0 && Ot(t) ? e - 1 in t : !0 : !1;
}, ts = (t) => {
  if (!t || !Ot(t))
    return !1;
  let e;
  const s = "constructor", r = t[s], n = r && r.prototype, i = bs.call(t, s), c = n && bs.call(n, "isPrototypeOf");
  if (r && !i && !c)
    return !1;
  for (e in t)
    ;
  return ls(e) || bs.call(t, e);
}, ss = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Kn : !1;
}, ds = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Kn : !1;
};
function ce(t, e) {
  if (cs(t))
    for (let s = 0; s < t.length && e(t[s], s, t) !== !1; s++)
      ;
  else t && ce(Object.keys(t), (s) => e(t[s], s, t));
  return t;
}
const Ys = (t, e) => t.indexOf(e) >= 0, Qe = (t, e) => t.concat(e), ye = (t, e, s) => (!is(e) && cs(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ut = (t) => Array.from(t || []), Yn = (t) => Ge(t) ? t : [t], Ms = (t) => !!t && !t.length, vn = (t) => ut(new Set(t)), Ne = (t, e, s) => {
  ce(t, (n) => n && n.apply(void 0, e || [])), !s && (t.length = 0);
}, Xn = "paddingTop", Jn = "paddingRight", Qn = "paddingLeft", Zn = "paddingBottom", eo = "marginLeft", to = "marginRight", so = "marginBottom", Tr = "overflowX", Ar = "overflowY", xt = "width", wt = "height", rt = "visible", ft = "hidden", kt = "scroll", Mr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, us = (t, e, s, r) => {
  if (t && e) {
    let n = !0;
    return ce(s, (i) => {
      const c = t[i], d = e[i];
      c !== d && (n = !1);
    }), n;
  }
  return !1;
}, no = (t, e) => us(t, e, ["w", "h"]), Yt = (t, e) => us(t, e, ["x", "y"]), Dr = (t, e) => us(t, e, ["t", "r", "b", "l"]), lt = () => {
}, J = (t, ...e) => t.bind(0, ...e), mt = (t) => {
  let e;
  const s = t ? Zt : Ks, r = t ? Ts : Gn;
  return [(n) => {
    r(e), e = s(() => n(), Ie(t) ? t() : t);
  }, () => r(e)];
}, Ds = (t, e) => {
  const { _: s, p: r, v: n, m: i } = e || {};
  let c, d, l, u, p = lt;
  const f = function(b) {
    p(), Ts(c), u = c = d = void 0, p = lt, t.apply(this, b);
  }, v = (w) => i && d ? i(d, w) : w, h = () => {
    p !== lt && f(v(l) || l);
  }, _ = function() {
    const b = ut(arguments), A = Ie(s) ? s() : s;
    if (je(A) && A >= 0) {
      const M = Ie(r) ? r() : r, x = je(M) && M >= 0, N = A > 0 ? Zt : Ks, q = A > 0 ? Ts : Gn, D = v(b) || b, L = f.bind(0, D);
      let V;
      p(), n && !u ? (L(), u = !0, V = N(() => u = void 0, A)) : (V = N(L, A), x && !c && (c = Zt(h, M))), p = () => q(V), d = l = D;
    } else
      f(b);
  };
  return _.S = h, _;
}, oo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ze = (t) => t ? Object.keys(t) : [], re = (t, e, s, r, n, i, c) => {
  const d = [e, s, r, n, i, c];
  return (typeof t != "object" || Ws(t)) && !Ie(t) && (t = {}), ce(d, (l) => {
    ce(l, (u, p) => {
      const f = l[p];
      if (t === f)
        return !0;
      const v = Ge(f);
      if (f && ts(f)) {
        const h = t[p];
        let _ = h;
        v && !Ge(h) ? _ = [] : !v && !ts(h) && (_ = {}), t[p] = re(_, f);
      } else
        t[p] = v ? f.slice() : f;
    });
  }), t;
}, ro = (t, e) => ce(re({}, t), (s, r, n) => {
  s === void 0 ? delete n[r] : s && ts(s) && (n[r] = ro(s));
}), Xs = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Vs = (t, e, s) => jn(t, Cr(e, s)), pt = (t) => ut(new Set((Ge(t) ? t : (t || "").split(" ")).filter((e) => e))), Js = (t, e) => t && t.getAttribute(e), gn = (t, e) => t && t.hasAttribute(e), Je = (t, e, s) => {
  ce(pt(e), (r) => {
    t && t.setAttribute(r, String(s || ""));
  });
}, Pe = (t, e) => {
  ce(pt(e), (s) => t && t.removeAttribute(s));
}, fs = (t, e) => {
  const s = pt(Js(t, e)), r = J(Je, t, e), n = (i, c) => {
    const d = new Set(s);
    return ce(pt(i), (l) => {
      d[c](l);
    }), ut(d).join(" ");
  };
  return {
    O: (i) => r(n(i, "delete")),
    $: (i) => r(n(i, "add")),
    C: (i) => {
      const c = pt(i);
      return c.reduce((d, l) => d && s.includes(l), c.length > 0);
    }
  };
}, ao = (t, e, s) => (fs(t, e).O(s), J(Qs, t, e, s)), Qs = (t, e, s) => (fs(t, e).$(s), J(ao, t, e, s)), Ls = (t, e, s, r) => (r ? Qs : ao)(t, e, s), Zs = (t, e, s) => fs(t, e).C(s), lo = (t) => fs(t, "class"), io = (t, e) => {
  lo(t).O(e);
}, en = (t, e) => (lo(t).$(e), J(io, t, e)), co = (t, e) => {
  const s = [], r = e ? ds(e) && e : document;
  return r ? ye(s, r.querySelectorAll(t)) : s;
}, Vr = (t, e) => {
  const s = e ? ds(e) && e : document;
  return s ? s.querySelector(t) : null;
}, ns = (t, e) => ds(t) ? t.matches(e) : !1, uo = (t) => ns(t, "body"), Os = (t) => t ? ut(t.childNodes) : [], $t = (t) => t && t.parentElement, yt = (t, e) => ds(t) && t.closest(e), Rs = (t) => document.activeElement, Lr = (t, e, s) => {
  const r = yt(t, e), n = t && Vr(s, r), i = yt(n, e) === r;
  return r && n ? r === t || n === t || i && yt(yt(t, s), e) !== r : !1;
}, dt = (t) => {
  if (cs(t))
    ce(ut(t), (e) => dt(e));
  else if (t) {
    const e = $t(t);
    e && e.removeChild(t);
  }
}, fo = (t, e, s) => {
  if (s && t) {
    let r = e, n;
    return cs(s) ? (n = document.createDocumentFragment(), ce(s, (i) => {
      i === r && (r = i.previousSibling), n.appendChild(i);
    })) : n = s, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(n, r || null), () => dt(s);
  }
  return lt;
}, Oe = (t, e) => fo(t, null, e), _n = (t, e) => fo($t(t), t && t.nextSibling, e), bt = (t) => {
  const e = document.createElement("div");
  return Je(e, "class", t), e;
}, mo = (t) => {
  const e = bt();
  return e.innerHTML = t.trim(), ce(Os(e), (s) => dt(s));
}, Or = /^--/, yn = (t, e) => t.getPropertyValue(e) || t[e] || "", tn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Gt = (t) => tn(parseFloat(t || "")), bn = (t) => `${(tn(t) * 100).toFixed(3)}%`, Fs = (t) => `${tn(t)}px`;
function Rt(t, e) {
  t && e && ce(e, (s, r) => {
    try {
      const n = t.style, i = je(s) ? Fs(s) : (s || "") + "";
      Or.test(r) ? n.setProperty(r, i) : n[r] = i;
    } catch {
    }
  });
}
function vt(t, e, s) {
  const r = is(e);
  let n = r ? "" : {};
  if (t) {
    const i = Me.getComputedStyle(t, s) || t.style;
    n = r ? yn(i, e) : ut(e).reduce((c, d) => (c[d] = yn(i, d), c), n);
  }
  return n;
}
const xn = (t, e, s) => {
  const r = e ? `${e}-` : "", n = s ? `-${s}` : "", i = `${r}top${n}`, c = `${r}right${n}`, d = `${r}bottom${n}`, l = `${r}left${n}`, u = vt(t, [i, c, d, l]);
  return {
    t: Gt(u[i]),
    r: Gt(u[c]),
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
}, Vt = (t) => t.getBoundingClientRect(), Br = (t) => !!t && Rr(t), Bs = (t) => !!(t && (t[wt] || t[xt])), po = (t, e) => {
  const s = Bs(t);
  return !Bs(e) && s;
}, wn = (t, e, s, r) => {
  ce(pt(e), (n) => {
    t && t.removeEventListener(n, s, r);
  });
}, me = (t, e, s, r) => {
  var n;
  const i = (n = r && r.H) != null ? n : !0, c = r && r.I || !1, d = r && r.A || !1, l = {
    passive: i,
    capture: c
  };
  return J(Ne, pt(e).map((u) => {
    const p = d ? (f) => {
      wn(t, u, p, c), s && s(f);
    } : s;
    return t && t.addEventListener(u, p, l), J(wn, t, u, p, c);
  }));
}, vo = (t) => t.stopPropagation(), Is = (t) => t.preventDefault(), go = (t) => vo(t) || Is(t), qe = (t, e) => {
  const { x: s, y: r } = je(e) ? {
    x: e,
    y: e
  } : e || {};
  je(s) && (t.scrollLeft = s), je(r) && (t.scrollTop = r);
}, Re = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), _o = () => ({
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
}), Ir = (t, e) => {
  const { T: s, D: r } = t, { w: n, h: i } = e, c = (f, v, h) => {
    let _ = hn(f) * h, w = hn(v) * h;
    if (_ === w) {
      const b = Qt(f), A = Qt(v);
      w = b > A ? 0 : w, _ = b < A ? 0 : _;
    }
    return _ = _ === w ? 0 : _, [_ + 0, w + 0];
  }, [d, l] = c(s.x, r.x, n), [u, p] = c(s.y, r.y, i);
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
}, kn = ({ T: t, D: e }) => {
  const s = (r, n) => r === 0 && r <= n;
  return {
    x: s(t.x, e.x),
    y: s(t.y, e.y)
  };
}, $n = ({ T: t, D: e }, s) => {
  const r = (n, i, c) => Vs(0, 1, (n - c) / (n - i) || 0);
  return {
    x: r(t.x, e.x, s.x),
    y: r(t.y, e.y, s.y)
  };
}, Ns = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, Sn = (t, e) => {
  ce(Yn(e), t);
}, Us = (t) => {
  const e = /* @__PURE__ */ new Map(), s = (i, c) => {
    if (i) {
      const d = e.get(i);
      Sn((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, c);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (i, c) => {
    if (is(i)) {
      const u = e.get(i) || /* @__PURE__ */ new Set();
      return e.set(i, u), Sn((p) => {
        Ie(p) && u.add(p);
      }, c), J(s, i, c);
    }
    Wn(c) && c && s();
    const d = Ze(i), l = [];
    return ce(d, (u) => {
      const p = i[u];
      p && ye(l, r(u, p));
    }), J(Ne, l);
  }, n = (i, c) => {
    ce(ut(e.get(i)), (d) => {
      c && !Ms(c) ? d.apply(0, c) : d();
    });
  };
  return r(t || {}), [r, s, n];
}, Cn = (t) => JSON.stringify(t, (e, s) => {
  if (Ie(s))
    throw 0;
  return s;
}), En = (t, e) => t ? `${e}`.split(".").reduce((s, r) => s && oo(s, r) ? s[r] : void 0, t) : void 0, Nr = {
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
}, yo = (t, e) => {
  const s = {}, r = Qe(Ze(e), Ze(t));
  return ce(r, (n) => {
    const i = t[n], c = e[n];
    if (Ot(i) && Ot(c))
      re(s[n] = {}, yo(i, c)), Xs(s[n]) && delete s[n];
    else if (oo(e, n) && c !== i) {
      let d = !0;
      if (Ge(i) || Ge(c))
        try {
          Cn(i) === Cn(c) && (d = !1);
        } catch {
        }
      d && (s[n] = c);
    }
  }), s;
}, Tn = (t, e, s) => (r) => [En(t, r), s || En(e, r) !== void 0], Tt = "data-overlayscrollbars", Xt = "os-environment", Kt = `${Xt}-scrollbar-hidden`, ws = `${Tt}-initialize`, Jt = "noClipping", An = `${Tt}-body`, it = Tt, Ur = "host", ot = `${Tt}-viewport`, Pr = Tr, zr = Ar, qr = "arrange", bo = "measuring", xo = "scrollbarHidden", jr = "scrollbarPressed", Gr = "noContent", Ps = `${Tt}-padding`, Mn = `${Tt}-content`, nn = "os-size-observer", Kr = `${nn}-appear`, Wr = `${nn}-listener`, Yr = "os-trinsic-observer", Xr = "os-theme-none", Fe = "os-scrollbar", Jr = `${Fe}-rtl`, Qr = `${Fe}-horizontal`, Zr = `${Fe}-vertical`, wo = `${Fe}-track`, on = `${Fe}-handle`, ea = `${Fe}-visible`, ta = `${Fe}-cornerless`, Dn = `${Fe}-interaction`, Vn = `${Fe}-unusable`, zs = `${Fe}-auto-hide`, Ln = `${zs}-hidden`, On = `${Fe}-wheel`, sa = `${wo}-interactive`, na = `${on}-interactive`;
let ks;
const oa = () => {
  const t = ($, M, x) => {
    Oe(document.body, $), Oe(document.body, $);
    const N = ho($), q = Dt($), R = sn(M);
    return x && dt($), {
      x: q.h - N.h + R.h,
      y: q.w - N.w + R.w
    };
  }, e = ($) => {
    let M = !1;
    const x = en($, Kt);
    try {
      M = vt($, "scrollbar-width") === "none" || vt($, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return x(), M;
  }, s = `.${Xt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Xt} div{width:200%;height:200%;margin:10px 0}.${Kt}{scrollbar-width:none!important}.${Kt}::-webkit-scrollbar,.${Kt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, n = mo(`<div class="${Xt}"><div></div><style>${s}</style></div>`)[0], i = n.firstChild, [c, , d] = Us(), [l, u] = Le({
    o: t(n, i),
    i: Yt
  }, J(t, n, i, !0)), [p] = u(), f = e(n), v = {
    x: p.x === 0,
    y: p.y === 0
  }, h = {
    elements: {
      host: null,
      padding: !f,
      viewport: ($) => f && uo($) && $,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, _ = re({}, Nr), w = J(re, {}, _), b = J(re, {}, h), A = {
    k: p,
    M: v,
    R: f,
    V: !!As,
    L: J(c, "r"),
    P: b,
    U: ($) => re(h, $) && b(),
    N: w,
    q: ($) => re(_, $) && w(),
    B: re({}, h),
    F: re({}, _)
  };
  if (Pe(n, "style"), dt(n), me(Me, "resize", () => {
    d("r", []);
  }), Ie(Me.matchMedia) && !f && (!v.x || !v.y)) {
    const $ = (M) => {
      const x = Me.matchMedia(`(resolution: ${Me.devicePixelRatio}dppx)`);
      me(x, "change", () => {
        M(), $(M);
      }, {
        A: !0
      });
    };
    $(() => {
      const [M, x] = l();
      re(A.k, M), d("r", [x]);
    });
  }
  return A;
}, Ke = () => (ks || (ks = oa()), ks), ko = (t, e) => Ie(e) ? e.apply(0, t) : e, ra = (t, e, s, r) => {
  const n = ls(r) ? s : r;
  return ko(t, n) || e.apply(0, t);
}, $o = (t, e, s, r) => {
  const n = ls(r) ? s : r, i = ko(t, n);
  return !!i && (ss(i) ? i : e.apply(0, t));
}, aa = (t, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { M: n, R: i, P: c } = Ke(), { nativeScrollbarsOverlaid: d, body: l } = c().cancel, u = s ?? d, p = ls(r) ? l : r, f = (n.x || n.y) && u, v = t && (Ws(p) ? !i : p);
  return !!f || !!v;
}, rn = /* @__PURE__ */ new WeakMap(), la = (t, e) => {
  rn.set(t, e);
}, ia = (t) => {
  rn.delete(t);
}, So = (t) => rn.get(t), ca = (t, e, s) => {
  let r = !1;
  const n = s ? /* @__PURE__ */ new WeakMap() : !1, i = () => {
    r = !0;
  }, c = (d) => {
    if (n && s) {
      const l = s.map((u) => {
        const [p, f] = u || [];
        return [f && p ? (d || co)(p, t) : [], f];
      });
      ce(l, (u) => ce(u[0], (p) => {
        const f = u[1], v = n.get(p) || [];
        if (t.contains(p) && f) {
          const _ = me(p, f, (w) => {
            r ? (_(), n.delete(p)) : e(w);
          });
          n.set(p, ye(v, _));
        } else
          Ne(v), n.delete(p);
      }));
    }
  };
  return c(), [i, c];
}, Rn = (t, e, s, r) => {
  let n = !1;
  const { j: i, X: c, Y: d, W: l, J: u, K: p } = r || {}, f = Ds(() => n && s(!0), {
    _: 33,
    p: 99
  }), [v, h] = ca(t, f, d), _ = i || [], w = c || [], b = Qe(_, w), A = (M, x) => {
    if (!Ms(x)) {
      const N = u || lt, q = p || lt, R = [], D = [];
      let L = !1, V = !1;
      if (ce(x, (E) => {
        const { attributeName: O, target: S, type: k, oldValue: B, addedNodes: F, removedNodes: ne } = E, ue = k === "attributes", le = k === "childList", H = t === S, ee = ue && O, te = ee && Js(S, O || ""), X = is(te) ? te : null, fe = ee && B !== X, U = Ys(w, O) && fe;
        if (e && (le || !H)) {
          const G = ue && fe, j = G && l && ns(S, l), I = (j ? !N(S, O, B, X) : !ue || G) && !q(E, !!j, t, r);
          ce(F, (K) => ye(R, K)), ce(ne, (K) => ye(R, K)), V = V || I;
        }
        !e && H && fe && !N(S, O, B, X) && (ye(D, O), L = L || U);
      }), h((E) => vn(R).reduce((O, S) => (ye(O, co(E, S)), ns(S, E) ? ye(O, S) : O), [])), e)
        return !M && V && s(!1), [!1];
      if (!Ms(D) || L) {
        const E = [vn(D), L];
        return !M && s.apply(0, E), E;
      }
    }
  }, $ = new Er(J(A, !1));
  return [() => ($.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: b,
    subtree: e,
    childList: e,
    characterData: e
  }), n = !0, () => {
    n && (v(), $.disconnect(), n = !1);
  }), () => {
    if (n)
      return f.S(), A(!0, $.takeRecords());
  }];
}, Co = {}, Eo = {}, da = (t) => {
  ce(t, (e) => ce(e, (s, r) => {
    Co[r] = e[r];
  }));
}, To = (t, e, s) => Ze(t).map((r) => {
  const { static: n, instance: i } = t[r], [c, d, l] = s || [], u = s ? i : n;
  if (u) {
    const p = s ? u(c, d, e) : u(e);
    return (l || Eo)[r] = p;
  }
}), Ft = (t) => Eo[t], ua = "__osOptionsValidationPlugin", fa = "__osSizeObserverPlugin", ma = (t, e) => {
  const { M: s } = e, [r, n] = t("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, n];
}, os = (t) => t.indexOf(rt) === 0, ha = (t, e) => {
  const s = (n, i, c, d) => {
    const l = n === rt ? ft : n.replace(`${rt}-`, ""), u = os(n), p = os(c);
    return !i && !d ? ft : u && p ? rt : u ? i && d ? l : i ? rt : ft : i ? l : p && d ? rt : ft;
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
}, Ao = "__osScrollbarsHidingPlugin", pa = "__osClickScrollPlugin", Mo = (t, e, s) => {
  const { dt: r } = s || {}, n = Ft(fa), [i] = Le({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], l = mo(`<div class="${nn}"><div class="${Wr}"></div></div>`)[0], u = l.firstChild, p = (f) => {
      const v = f instanceof ResizeObserverEntry;
      let h = !1, _ = !1;
      if (v) {
        const [w, , b] = i(f.contentRect), A = Bs(w);
        _ = po(w, b), h = !_ && !A;
      } else
        _ = f === !0;
      h || e({
        ft: !0,
        dt: _
      });
    };
    if (es) {
      const f = new es((v) => p(v.pop()));
      f.observe(u), ye(c, () => {
        f.disconnect();
      });
    } else if (n) {
      const [f, v] = n(u, p, r);
      ye(c, Qe([en(l, Kr), me(l, "animationstart", f)], v));
    } else
      return lt;
    return J(Ne, ye(c, Oe(t, l)));
  };
}, va = (t, e) => {
  let s;
  const r = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, n = bt(Yr), [i] = Le({
    o: !1
  }), c = (l, u) => {
    if (l) {
      const p = i(r(l)), [, f] = p;
      return f && !u && e(p) && [p];
    }
  }, d = (l, u) => c(u.pop(), l);
  return [() => {
    const l = [];
    if (pn)
      s = new pn(J(d, !1), {
        root: t
      }), s.observe(n), ye(l, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const p = Dt(n);
        c(p);
      };
      ye(l, Mo(n, u)()), u();
    }
    return J(Ne, ye(l, Oe(t, n)));
  }, () => s && d(!0, s.takeRecords())];
}, ga = (t, e, s, r) => {
  let n, i, c, d, l, u;
  const p = `[${it}]`, f = `[${ot}]`, v = [], h = ["wrap", "cols", "rows"], _ = ["id", "class", "style", "open"], { vt: w, ht: b, ot: A, gt: $, bt: M, wt: x, nt: N, yt: q, St: R, Ot: D } = t, L = (T) => vt(T, "direction") === "rtl", V = {
    $t: !1,
    ct: L(w)
  }, E = Ke(), O = Ft(Ao), [S] = Le({
    i: no,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = O && O.tt(t, e, V, E, s).ut, K = !(q && N) && Zs(b, it, Jt), Y = !N && R(qr), Z = Y && Re($), ie = D(bo, K), xe = Y && T && T()[0], Se = Hs(A), oe = sn(A);
    return xe && xe(), qe($, Z), K && ie(), {
      w: Se.w + oe.w,
      h: Se.h + oe.h
    };
  }), k = x ? h : Qe(_, h), B = Ds(r, {
    _: () => n,
    p: () => i,
    m(T, I) {
      const [K] = T, [Y] = I;
      return [Qe(Ze(K), Ze(Y)).reduce((Z, ie) => (Z[ie] = K[ie] || Y[ie], Z), {})];
    }
  }), F = (T) => {
    const I = L(w);
    re(T, {
      Ct: u !== I
    }), re(V, {
      ct: I
    }), u = I;
  }, ne = (T, I) => {
    const [K, Y] = T, Z = {
      xt: Y
    };
    return re(V, {
      $t: K
    }), !I && r(Z), Z;
  }, ue = ({ ft: T, dt: I }) => {
    const Y = !(T && !I) && E.R ? B : r, Z = {
      ft: T || I,
      dt: I
    };
    F(Z), Y(Z);
  }, le = (T, I) => {
    const [, K] = S(), Y = {
      Ht: K
    };
    return F(Y), K && !I && (T ? r : B)(Y), Y;
  }, H = (T, I, K) => {
    const Y = {
      Et: I
    };
    return F(Y), I && !K && B(Y), Y;
  }, [ee, te] = M ? va(b, ne) : [], X = !N && Mo(b, ue, {
    dt: !0
  }), [fe, U] = Rn(b, !1, H, {
    X: _,
    j: Qe(_, v)
  }), G = N && es && new es((T) => {
    const I = T[T.length - 1].contentRect;
    ue({
      ft: !0,
      dt: po(I, l)
    }), l = I;
  }), j = Ds(() => {
    const [, T] = S();
    r({
      Ht: T
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    G && G.observe(b);
    const T = X && X(), I = ee && ee(), K = fe(), Y = E.L((Z) => {
      Z ? B({
        zt: Z
      }) : j();
    });
    return () => {
      G && G.disconnect(), T && T(), I && I(), d && d(), K(), Y();
    };
  }, ({ It: T, At: I, Tt: K }) => {
    const Y = {}, [Z] = T("update.ignoreMutation"), [ie, xe] = T("update.attributes"), [Se, oe] = T("update.elementEvents"), [we, Ee] = T("update.debounce"), He = oe || xe, ke = I || K, De = (be) => Ie(Z) && Z(be);
    if (He) {
      c && c(), d && d();
      const [be, ge] = Rn(M || A, !0, le, {
        j: Qe(k, ie || []),
        Y: Se,
        W: p,
        K: (Te, _e) => {
          const { target: Ae, attributeName: Ve } = Te;
          return (!_e && Ve && !N ? Lr(Ae, p, f) : !1) || !!yt(Ae, `.${Fe}`) || !!De(Te);
        }
      });
      d = be(), c = ge;
    }
    if (Ee)
      if (B.S(), Ge(we)) {
        const be = we[0], ge = we[1];
        n = je(be) && be, i = je(ge) && ge;
      } else je(we) ? (n = we, i = !1) : (n = !1, i = !1);
    if (ke) {
      const be = U(), ge = te && te(), Te = c && c();
      be && re(Y, H(be[0], be[1], ke)), ge && re(Y, ne(ge[0], ke)), Te && re(Y, le(Te[0], ke));
    }
    return F(Y), Y;
  }, V];
}, _a = (t, e, s, r) => {
  const { P: n } = Ke(), { scrollbars: i } = n(), { slot: c } = i, { vt: d, ht: l, ot: u, Dt: p, gt: f, yt: v, nt: h } = e, { scrollbars: _ } = p ? {} : t, { slot: w } = _ || {}, b = /* @__PURE__ */ new Map(), A = (U) => As && new As({
    source: f,
    axis: U
  }), $ = {
    x: A("x"),
    y: A("y")
  }, M = $o([d, l, u], () => h && v ? d : l, c, w), x = (U, G) => {
    if (G) {
      const Z = U ? xt : wt, { kt: ie, Mt: xe } = G, Se = Vt(xe)[Z], oe = Vt(ie)[Z];
      return Vs(0, 1, Se / oe || 0);
    }
    const j = U ? "x" : "y", { Rt: T, Vt: I } = s, K = I[j], Y = T[j];
    return Vs(0, 1, K / (K + Y) || 0);
  }, N = (U, G, j) => {
    const T = x(j, U);
    return 1 / T * (1 - T) * G;
  }, q = (U) => re(U, {
    clear: ["left"]
  }), R = (U) => {
    b.forEach((G, j) => {
      (U ? Ys(Yn(U), j) : !0) && (ce(G || [], (I) => {
        I && I.cancel();
      }), b.delete(j));
    });
  }, D = (U, G, j, T) => {
    const I = b.get(U) || [], K = I.find((Y) => Y && Y.timeline === G);
    K ? K.effect = new KeyframeEffect(U, j, {
      composite: T
    }) : b.set(U, Qe(I, [U.animate(j, {
      timeline: G,
      composite: T
    })]));
  }, L = (U, G, j) => {
    const T = j ? en : io;
    ce(U, (I) => {
      T(I.Lt, G);
    });
  }, V = (U, G) => {
    ce(U, (j) => {
      const [T, I] = G(j);
      Rt(T, I);
    });
  }, E = (U, G) => {
    V(U, (j) => {
      const { Mt: T } = j;
      return [T, {
        [G ? xt : wt]: bn(x(G))
      }];
    });
  }, O = (U, G) => {
    const { Pt: j } = s, T = G ? "x" : "y", I = $[T], K = kn(j)[T], Y = (Z, ie) => xs(bn(N(Z, K ? ie : 1 - ie, G)), G);
    I ? ce(U, (Z) => {
      const { Mt: ie } = Z;
      D(ie, I, q({
        transform: [0, 1].map((xe) => Y(Z, xe))
      }));
    }) : V(U, (Z) => [Z.Mt, {
      transform: Y(Z, $n(j, Re(f))[T])
    }]);
  }, S = (U) => h && !v && $t(U) === u, k = [], B = [], F = [], ne = (U, G, j) => {
    const T = Wn(j), I = T ? j : !0, K = T ? !j : !0;
    I && L(B, U, G), K && L(F, U, G);
  }, ue = () => {
    E(B, !0), E(F);
  }, le = () => {
    O(B, !0), O(F);
  }, H = () => {
    if (h) {
      const { Rt: U, Pt: G } = s, j = kn(G), T = 0.5;
      if ($.x && $.y)
        ce(Qe(F, B), ({ Lt: I }) => {
          if (S(I)) {
            const K = (Y) => D(I, $[Y], q({
              transform: [0, j[Y] ? 1 : -1].map((Z) => xs(Fs(Z * (U[Y] - T)), Y === "x"))
            }), "add");
            K("x"), K("y");
          } else
            R(I);
        });
      else {
        const I = $n(G, Re(f)), K = (Y) => {
          const { Lt: Z } = Y, ie = S(Z) && Z, xe = (Se, oe, we) => {
            const Ee = oe * Se;
            return Fs(we ? Ee : -Ee);
          };
          return [ie, ie && {
            transform: xs({
              x: xe(I.x, U.x, j.x),
              y: xe(I.y, U.y, j.y)
            })
          }];
        };
        V(B, K), V(F, K);
      }
    }
  }, ee = (U) => {
    const j = bt(`${Fe} ${U ? Qr : Zr}`), T = bt(wo), I = bt(on), K = {
      Lt: j,
      kt: T,
      Mt: I
    };
    return ye(U ? B : F, K), ye(k, [Oe(j, T), Oe(T, I), J(dt, j), R, r(K, ne, O, U)]), K;
  }, te = J(ee, !0), X = J(ee, !1), fe = () => (Oe(M, B[0].Lt), Oe(M, F[0].Lt), J(Ne, k));
  return te(), X(), [{
    Ut: ue,
    Nt: le,
    qt: H,
    Bt: ne,
    Ft: {
      V: $.x,
      jt: B,
      Xt: te,
      Yt: J(V, B)
    },
    Wt: {
      V: $.y,
      jt: F,
      Xt: X,
      Yt: J(V, F)
    }
  }, fe];
}, ya = (t, e, s, r) => (n, i, c, d) => {
  const { ht: l, ot: u, nt: p, gt: f, Jt: v, Ot: h } = e, { Lt: _, kt: w, Mt: b } = n, [A, $] = mt(333), [M, x] = mt(444), [N, q] = mt(), R = J(c, [n], d), D = (S) => {
    Ie(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: S.x,
      top: S.y
    });
  }, L = d ? xt : wt, V = () => {
    const S = "pointerup pointercancel lostpointercapture", k = `client${d ? "X" : "Y"}`, B = d ? "left" : "top", F = d ? "w" : "h", ne = d ? "x" : "y", ue = (le, H) => (ee) => {
      const { Rt: te } = s, X = Dt(w)[F] - Dt(b)[F], U = H * ee / X * te[ne];
      qe(f, {
        [ne]: le + U
      });
    };
    return me(w, "pointerdown", (le) => {
      const H = yt(le.target, `.${on}`) === b, ee = H ? b : w, te = t.scrollbars, { button: X, isPrimary: fe, pointerType: U } = le, { pointers: G } = te;
      if (X === 0 && fe && te[H ? "dragScroll" : "clickScroll"] && (G || []).includes(U)) {
        x();
        const T = !H && le.shiftKey, I = J(Vt, b), K = J(Vt, w), Y = (_e, Ae) => (_e || I())[B] - (Ae || K())[B], Z = Es(Vt(f)[L]) / Dt(f)[F] || 1, ie = ue(Re(f)[ne], 1 / Z), xe = le[k], Se = I(), oe = K(), we = Se[L], Ee = Y(Se, oe) + we / 2, He = xe - oe[B], ke = H ? 0 : He - Ee, De = (_e) => {
          Ne(Te), ee.releasePointerCapture(_e.pointerId);
        }, be = () => h(jr, !0), ge = be(), Te = [() => {
          const _e = Re(f);
          ge();
          const Ae = Re(f), Ve = {
            x: Ae.x - _e.x,
            y: Ae.y - _e.y
          };
          (Qt(Ve.x) > 3 || Qt(Ve.y) > 3) && (be(), qe(f, _e), D(Ve), M(ge));
        }, me(v, S, De), me(v, "selectstart", (_e) => Is(_e), {
          H: !1
        }), me(w, S, De), me(w, "pointermove", (_e) => {
          const Ae = _e[k] - xe;
          (H || T) && ie(ke + Ae);
        })];
        if (ee.setPointerCapture(le.pointerId), T)
          ie(ke);
        else if (!H) {
          const _e = Ft(pa);
          _e && ye(Te, _e(ie, Y, ke, we, He));
        }
      }
    });
  };
  let E = !0;
  const O = (S) => S.propertyName.indexOf(L) > -1;
  return J(Ne, [me(b, "pointermove pointerleave", r), me(_, "pointerenter", () => {
    i(Dn, !0);
  }), me(_, "pointerleave pointercancel", () => {
    i(Dn, !1);
  }), !p && me(_, "mousedown", () => {
    const S = Rs();
    (gn(S, ot) || gn(S, it) || S === document.body) && Zt(J(Ns, u), 25);
  }), me(_, "wheel", (S) => {
    const { deltaX: k, deltaY: B, deltaMode: F } = S;
    E && F === 0 && $t(_) === l && D({
      x: k,
      y: B
    }), E = !1, i(On, !0), A(() => {
      E = !0, i(On);
    }), Is(S);
  }, {
    H: !1,
    I: !0
  }), me(b, "transitionstart", (S) => {
    if (O(S)) {
      const k = () => {
        R(), N(k);
      };
      k();
    }
  }), me(b, "transitionend transitioncancel", (S) => {
    O(S) && (q(), R());
  }), me(_, "pointerdown", J(me, v, "click", go, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), $, x, q]);
}, ba = (t, e, s, r, n, i) => {
  let c, d, l, u, p, f = lt, v = 0;
  const h = (H) => H.pointerType === "mouse", [_, w] = mt(), [b, A] = mt(100), [$, M] = mt(100), [x, N] = mt(() => v), [q, R] = _a(t, n, r, ya(e, n, r, (H) => h(H) && F())), { ht: D, Kt: L, yt: V } = n, { Bt: E, Ut: O, Nt: S, qt: k } = q, B = (H, ee) => {
    if (N(), H)
      E(Ln);
    else {
      const te = J(E, Ln, !0);
      v > 0 && !ee ? x(te) : te();
    }
  }, F = () => {
    (l ? !c : !u) && (B(!0), b(() => {
      B(!1);
    }));
  }, ne = (H) => {
    E(zs, H, !0), E(zs, H, !1);
  }, ue = (H) => {
    h(H) && (c = l, l && B(!0));
  }, le = [N, A, M, w, () => f(), me(D, "pointerover", ue, {
    A: !0
  }), me(D, "pointerenter", ue), me(D, "pointerleave", (H) => {
    h(H) && (c = !1, l && B(!1));
  }), me(D, "pointermove", (H) => {
    h(H) && d && F();
  }), me(L, "scroll", (H) => {
    _(() => {
      S(), F();
    }), i(H), k();
  })];
  return [() => J(Ne, ye(le, R())), ({ It: H, Tt: ee, Gt: te, Qt: X }) => {
    const { Zt: fe, tn: U, nn: G, sn: j } = X || {}, { Ct: T, dt: I } = te || {}, { ct: K } = s, { M: Y } = Ke(), { G: Z, en: ie } = r, [xe, Se] = H("showNativeOverlaidScrollbars"), [oe, we] = H("scrollbars.theme"), [Ee, He] = H("scrollbars.visibility"), [ke, De] = H("scrollbars.autoHide"), [be, ge] = H("scrollbars.autoHideSuspend"), [Te] = H("scrollbars.autoHideDelay"), [_e, Ae] = H("scrollbars.dragScroll"), [Ve, gt] = H("scrollbars.clickScroll"), [Ht, ps] = H("overflow"), vs = I && !ee, gs = ie.x || ie.y, Ue = fe || U || j || T || ee, _s = G || He || ps, Bt = xe && Y.x && Y.y, It = (st, At, Mt) => {
      const Nt = st.includes(kt) && (Ee === rt || Ee === "auto" && At === kt);
      return E(ea, Nt, Mt), Nt;
    };
    if (v = Te, vs && (be && gs ? (ne(!1), f(), $(() => {
      f = me(L, "scroll", J(ne, !0), {
        A: !0
      });
    })) : ne(!0)), Se && E(Xr, Bt), we && (E(p), E(oe, !0), p = oe), ge && !be && ne(!0), De && (d = ke === "move", l = ke === "leave", u = ke === "never", B(u, !0)), Ae && E(na, _e), gt && E(sa, Ve), _s) {
      const st = It(Ht.x, Z.x, !0), At = It(Ht.y, Z.y, !1);
      E(ta, !(st && At));
    }
    Ue && (O(), S(), k(), E(Vn, !ie.x, !0), E(Vn, !ie.y, !1), E(Jr, K && !V));
  }, {}, q];
}, xa = (t) => {
  const e = Ke(), { P: s, R: r } = e, { elements: n } = s(), { host: i, padding: c, viewport: d, content: l } = n, u = ss(t), p = u ? {} : t, { elements: f } = p, { host: v, padding: h, viewport: _, content: w } = f || {}, b = u ? t : p.target, A = uo(b), $ = ns(b, "textarea"), M = b.ownerDocument, x = M.documentElement, N = () => M.defaultView || Me, q = J(ra, [b]), R = J($o, [b]), D = J(bt, ""), L = J(q, D, d), V = J(R, D, l), E = L(_), O = E === b, S = O && A, k = !O && V(w), B = !O && E === k, F = S ? x : E, ne = $ ? q(D, i, v) : b, ue = S ? F : ne, le = !O && R(D, c, h), H = !B && k, ee = [H, F, le, ue].map((oe) => ss(oe) && !$t(oe) && oe), te = (oe) => oe && Ys(ee, oe), X = te(F) ? b : F, fe = {
    vt: b,
    ht: ue,
    ot: F,
    cn: le,
    bt: H,
    gt: S ? x : F,
    Kt: S ? M : F,
    rn: A ? x : X,
    Jt: M,
    wt: $,
    yt: A,
    Dt: u,
    nt: O,
    ln: N,
    St: (oe) => Zs(F, ot, oe),
    Ot: (oe, we) => Ls(F, ot, oe, we)
  }, { vt: U, ht: G, cn: j, ot: T, bt: I } = fe, K = [() => {
    Pe(G, [it, ws]), Pe(U, ws), A && Pe(x, [ws, it]);
  }], Y = $ && te(G);
  let Z = $ ? U : Os([I, T, j, G, U].find((oe) => oe && !te(oe)));
  const ie = S ? U : I || T, xe = J(Ne, K);
  return [fe, () => {
    const oe = N(), we = Rs(), Ee = (ge) => {
      Oe($t(ge), Os(ge)), dt(ge);
    }, He = (ge) => me(ge, "focusin focusout focus blur", go, {
      I: !0,
      H: !1
    }), ke = "tabindex", De = Js(T, ke), be = He(we);
    return Je(G, it, O ? "" : Ur), Je(j, Ps, ""), Je(T, ot, ""), Je(I, Mn, ""), O || (Je(T, ke, De || "-1"), A && Je(x, An, "")), Y && (_n(U, G), ye(K, () => {
      _n(G, U), dt(G);
    })), Oe(ie, Z), Oe(G, j), Oe(j || G, !O && T), Oe(T, I), ye(K, [be, () => {
      const ge = Rs(), Te = te(T), _e = Te && ge === T ? U : ge, Ae = He(_e);
      Pe(j, Ps), Pe(I, Mn), Pe(T, ot), A && Pe(x, An), De ? Je(T, ke, De) : Pe(T, ke), te(I) && Ee(I), Te && Ee(T), te(j) && Ee(j), Ns(_e), Ae();
    }]), r && !O && (Qs(T, ot, xo), ye(K, J(Pe, T, ot))), Ns(!O && A && we === U && oe.top === oe ? T : we), be(), Z = 0, xe;
  }, xe];
}, wa = ({ bt: t }) => ({ Gt: e, an: s, Tt: r }) => {
  const { xt: n } = e || {}, { $t: i } = s;
  t && (n || r) && Rt(t, {
    [wt]: i && "100%"
  });
}, ka = ({ ht: t, cn: e, ot: s, nt: r }, n) => {
  const [i, c] = Le({
    i: Dr,
    o: xn()
  }, J(xn, t, "padding", ""));
  return ({ It: d, Gt: l, an: u, Tt: p }) => {
    let [f, v] = c(p);
    const { R: h } = Ke(), { ft: _, Ht: w, Ct: b } = l || {}, { ct: A } = u, [$, M] = d("paddingAbsolute");
    (_ || v || (p || w)) && ([f, v] = i(p));
    const N = !r && (M || b || v);
    if (N) {
      const q = !$ || !e && !h, R = f.r + f.l, D = f.t + f.b, L = {
        [to]: q && !A ? -R : 0,
        [so]: q ? -D : 0,
        [eo]: q && A ? -R : 0,
        top: q ? -f.t : 0,
        right: q ? A ? -f.r : "auto" : 0,
        left: q ? A ? "auto" : -f.l : 0,
        [xt]: q && `calc(100% + ${R}px)`
      }, V = {
        [Xn]: q ? f.t : 0,
        [Jn]: q ? f.r : 0,
        [Zn]: q ? f.b : 0,
        [Qn]: q ? f.l : 0
      };
      Rt(e || s, L), Rt(s, V), re(n, {
        cn: f,
        un: !q,
        rt: e ? V : re({}, L, V)
      });
    }
    return {
      _n: N
    };
  };
}, $a = (t, e) => {
  const s = Ke(), { ht: r, cn: n, ot: i, nt: c, Kt: d, gt: l, yt: u, Ot: p, ln: f } = t, { R: v } = s, h = u && c, _ = J(jn, 0), w = ["display", "direction", "flexDirection", "writingMode"], b = {
    i: no,
    o: {
      w: 0,
      h: 0
    }
  }, A = {
    i: Yt,
    o: {}
  }, $ = (H) => {
    p(bo, !h && H);
  }, M = (H, ee) => {
    const te = Me.devicePixelRatio % 1 !== 0 ? 1 : 0, X = {
      w: _(H.w - ee.w),
      h: _(H.h - ee.h)
    };
    return {
      w: X.w > te ? X.w : 0,
      h: X.h > te ? X.h : 0
    };
  }, [x, N] = Le(b, J(sn, i)), [q, R] = Le(b, J(Hs, i)), [D, L] = Le(b), [V] = Le(A), [E, O] = Le(b), [S] = Le(A), [k] = Le({
    i: (H, ee) => us(H, ee, w),
    o: {}
  }, () => Br(i) ? vt(i, w) : {}), [B, F] = Le({
    i: (H, ee) => Yt(H.T, ee.T) && Yt(H.D, ee.D),
    o: _o()
  }, () => {
    $(!0);
    const H = Re(l), ee = p(Gr, !0), te = me(d, kt, (j) => {
      const T = Re(l);
      j.isTrusted && T.x === H.x && T.y === H.y && vo(j);
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
    const U = Re(l);
    qe(l, {
      x: U.x - X.x < 1 && -fe.w,
      y: U.y - X.y < 1 && -fe.h
    });
    const G = Re(l);
    return qe(l, H), Ks(() => te()), {
      T: X,
      D: G
    };
  }), ne = Ft(Ao), ue = (H, ee) => `${ee ? Pr : zr}${Mr(H)}`, le = (H) => {
    const ee = (X) => [rt, ft, kt].map((fe) => ue(fe, X)), te = ee(!0).concat(ee()).join(" ");
    p(te), p(Ze(H).map((X) => ue(H[X], X === "x")).join(" "), !0);
  };
  return ({ It: H, Gt: ee, an: te, Tt: X }, { _n: fe }) => {
    const { ft: U, Ht: G, Ct: j, dt: T, zt: I } = ee || {}, K = ne && ne.tt(t, e, te, s, H), { it: Y, ut: Z, _t: ie } = K || {}, [xe, Se] = ma(H, s), [oe, we] = H("overflow"), Ee = os(oe.x), He = os(oe.y), ke = U || fe || G || j || I || Se;
    let De = N(X), be = R(X), ge = L(X), Te = O(X);
    if (Se && v && p(xo, !xe), ke) {
      Zs(r, it, Jt) && $(!0);
      const [un] = Z ? Z() : [], [Ut] = De = x(X), [Pt] = be = q(X), zt = ho(i), qt = h && Hr(f()), Zo = {
        w: _(Pt.w + Ut.w),
        h: _(Pt.h + Ut.h)
      }, fn = {
        w: _((qt ? qt.w : zt.w + _(zt.w - Pt.w)) + Ut.w),
        h: _((qt ? qt.h : zt.h + _(zt.h - Pt.h)) + Ut.h)
      };
      un && un(), Te = E(fn), ge = D(M(Zo, fn), X);
    }
    const [_e, Ae] = Te, [Ve, gt] = ge, [Ht, ps] = be, [vs, gs] = De, [Ue, _s] = V({
      x: Ve.w > 0,
      y: Ve.h > 0
    }), Bt = Ee && He && (Ue.x || Ue.y) || Ee && Ue.x && !Ue.y || He && Ue.y && !Ue.x, It = fe || j || I || gs || ps || Ae || gt || we || Se || ke, st = ha(Ue, oe), [At, Mt] = S(st.G), [, Nt] = k(X), dn = j || T || Nt || _s || X, [Jo, Qo] = dn ? B(X) : F();
    return It && (Mt && le(st.G), ie && Y && Rt(i, ie(st, te, Y(st, Ht, vs)))), $(!1), Ls(r, it, Jt, Bt), Ls(n, Ps, Jt, Bt), re(e, {
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
      Pt: Ir(Jo, Ve)
    }), {
      nn: Mt,
      Zt: Ae,
      tn: gt,
      sn: Qo || gt,
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
      [to]: 0,
      [so]: 0,
      [eo]: 0,
      [Xn]: 0,
      [Jn]: 0,
      [Zn]: 0,
      [Qn]: 0
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
    Pt: _o()
  }, { vt: i, gt: c, nt: d } = e, { R: l, M: u } = Ke(), p = !l && (u.x || u.y), f = [wa(e), ka(e, n), $a(e, n)];
  return [s, (v) => {
    const h = {}, w = p && Re(c);
    return ce(f, (b) => {
      re(h, b(v, h) || {});
    }), qe(c, w), !d && qe(i, 0), h;
  }, n, e, r];
}, Ca = (t, e, s, r, n) => {
  const i = Tn(e, {}), [c, d, l, u, p] = Sa(t), [f, v, h] = ga(u, l, i, (M) => {
    $({}, M);
  }), [_, w, , b] = ba(t, e, h, l, u, n), A = (M) => Ze(M).some((x) => !!M[x]), $ = (M, x) => {
    if (s())
      return !1;
    const { fn: N, Tt: q, At: R, pn: D } = M, L = N || {}, V = !!q, E = {
      It: Tn(e, L, V),
      fn: L,
      Tt: V
    };
    if (D)
      return w(E), !1;
    const O = x || v(re({}, E, {
      At: R
    })), S = d(re({}, E, {
      an: h,
      Gt: O
    }));
    w(re({}, E, {
      Gt: O,
      Qt: S
    }));
    const k = A(O), B = A(S), F = k || B || !Xs(L) || V;
    return F && r(M, {
      Gt: O,
      Qt: S
    }), F;
  };
  return [() => {
    const { rn: M, gt: x } = u, N = Re(M), q = [f(), c(), _()];
    return qe(x, N), J(Ne, q);
  }, $, () => ({
    vn: h,
    hn: l
  }), {
    gn: u,
    bn: b
  }, p];
}, et = (t, e, s) => {
  const { N: r } = Ke(), n = ss(t), i = n ? t : t.target, c = So(i);
  if (e && !c) {
    let d = !1;
    const l = [], u = {}, p = (V) => {
      const E = ro(V), O = Ft(ua);
      return O ? O(E, !0) : E;
    }, f = re({}, r(), p(e)), [v, h, _] = Us(), [w, b, A] = Us(s), $ = (V, E) => {
      A(V, E), _(V, E);
    }, [M, x, N, q, R] = Ca(t, f, () => d, ({ fn: V, Tt: E }, { Gt: O, Qt: S }) => {
      const { ft: k, Ct: B, xt: F, Ht: ne, Et: ue, dt: le } = O, { Zt: H, tn: ee, nn: te, sn: X } = S;
      $("updated", [L, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!B,
          heightIntrinsicChanged: !!F,
          overflowEdgeChanged: !!H,
          overflowAmountChanged: !!ee,
          overflowStyleChanged: !!te,
          scrollCoordinatesChanged: !!X,
          contentMutation: !!ne,
          hostMutation: !!ue,
          appear: !!le
        },
        changedOptions: V || {},
        force: !!E
      }]);
    }, (V) => $("scroll", [L, V])), D = (V) => {
      ia(i), Ne(l), d = !0, $("destroyed", [L, V]), h(), b();
    }, L = {
      options(V, E) {
        if (V) {
          const O = E ? r() : {}, S = yo(f, re(O, p(V)));
          Xs(S) || (re(f, S), x({
            fn: S
          }));
        }
        return re({}, f);
      },
      on: w,
      off: (V, E) => {
        V && E && b(V, E);
      },
      state() {
        const { vn: V, hn: E } = N(), { ct: O } = V, { Vt: S, Rt: k, G: B, en: F, cn: ne, un: ue, Pt: le } = E;
        return re({}, {
          overflowEdge: S,
          overflowAmount: k,
          overflowStyle: B,
          hasOverflow: F,
          scrollCoordinates: {
            start: le.T,
            end: le.D
          },
          padding: ne,
          paddingAbsolute: ue,
          directionRTL: O,
          destroyed: d
        });
      },
      elements() {
        const { vt: V, ht: E, cn: O, ot: S, bt: k, gt: B, Kt: F } = q.gn, { Ft: ne, Wt: ue } = q.bn, le = (ee) => {
          const { Mt: te, kt: X, Lt: fe } = ee;
          return {
            scrollbar: fe,
            track: X,
            handle: te
          };
        }, H = (ee) => {
          const { jt: te, Xt: X } = ee, fe = le(te[0]);
          return re({}, fe, {
            clone: () => {
              const U = le(X());
              return x({
                pn: !0
              }), U;
            }
          });
        };
        return re({}, {
          target: V,
          host: E,
          padding: O || S,
          viewport: S,
          content: k || S,
          scrollOffsetElement: B,
          scrollEventElement: F,
          scrollbarHorizontal: H(ne),
          scrollbarVertical: H(ue)
        });
      },
      update: (V) => x({
        Tt: V,
        At: !0
      }),
      destroy: J(D, !1),
      plugin: (V) => u[Ze(V)[0]]
    };
    return ye(l, [R]), la(i, L), To(Co, et, [L, v, u]), aa(q.gn.yt, !n && t.cancel) ? (D(!0), L) : (ye(l, M()), $("initialized", [L]), L.update(!0), L);
  }
  return c;
};
et.plugin = (t) => {
  const e = Ge(t), s = e ? t : [t], r = s.map((n) => To(n, et)[0]);
  return da(s), e ? r : r[0];
};
et.valid = (t) => {
  const e = t && t.elements, s = Ie(e) && e();
  return ts(s) && !!So(s.target);
};
et.env = () => {
  const { k: t, M: e, R: s, V: r, B: n, F: i, P: c, U: d, N: l, q: u } = Ke();
  return re({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: r,
    staticDefaultInitialization: n,
    staticDefaultOptions: i,
    getDefaultInitialization: c,
    setDefaultInitialization: d,
    getDefaultOptions: l,
    setDefaultOptions: u
  });
};
function Ea() {
  let t;
  const e = C(null), s = Math.floor(Math.random() * 2 ** 32), r = C(!1), n = C([]), i = () => n.value, c = () => t.getSelection(), d = () => n.value.length, l = () => t.clearSelection(!0), u = C(), p = C(null), f = C(null), v = C(null);
  function h() {
    t = new ur({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: x, event: N, isDragging: q }) => {
      if (q)
        t.Interaction._reset(N);
      else {
        r.value = !1;
        const R = e.value.offsetWidth - N.offsetX, D = e.value.offsetHeight - N.offsetY;
        R < 15 && D < 15 && t.Interaction._reset(N), N.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(N);
      }
    }), document.addEventListener("dragleave", (x) => {
      !x.buttons && r.value && (r.value = !1);
    });
  }
  const _ = () => ht(() => {
    t.addSelection(
      t.getSelectables()
    ), w();
  }), w = () => {
    n.value = t.getSelection().map((x) => JSON.parse(x.dataset.item)), u.value(n.value);
  }, b = () => ht(() => {
    const x = i().map((N) => N.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), t.addSelection(
      t.getSelectables().filter((N) => x.includes(JSON.parse(N.dataset.item).path))
    ), w(), $();
  }), A = (x) => {
    u.value = x, t.subscribe("DS:end", ({ items: N, event: q, isDragging: R }) => {
      n.value = N.map((D) => JSON.parse(D.dataset.item)), x(N.map((D) => JSON.parse(D.dataset.item)));
    });
  }, $ = () => {
    p.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (f.value.style.height = e.value.scrollHeight + "px", f.value.style.display = "block") : (f.value.style.height = "100%", f.value.style.display = "none"));
  }, M = (x) => {
    if (!p.value)
      return;
    const { scrollOffsetElement: N } = p.value.elements();
    N.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ce(() => {
    et(v.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: et
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (x) => {
        p.value = x;
      },
      scroll: (x, N) => {
        const { scrollOffsetElement: q } = x.elements();
        e.value.scrollTo({
          top: q.scrollTop,
          left: 0
        });
      }
    }), h(), $(), new ResizeObserver($).observe(e.value), e.value.addEventListener("scroll", M), t.subscribe("DS:scroll", ({ isDragging: x }) => x || M());
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
    getSelected: i,
    getSelection: c,
    selectAll: _,
    clearSelection: l,
    refreshSelection: b,
    getCount: d,
    onSelect: A
  };
}
function Ta(t, e) {
  const s = C(t), r = C(e), n = C([]), i = C([]), c = C([]), d = C(!1), l = C(5);
  let u = !1, p = !1;
  const f = St({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function v() {
    let $ = [], M = [], x = r.value ?? s.value + "://";
    x.length === 0 && (n.value = []), x.replace(s.value + "://", "").split("/").forEach(function(R) {
      $.push(R), $.join("/") !== "" && M.push({
        basename: R,
        name: R,
        path: s.value + "://" + $.join("/"),
        type: "dir"
      });
    }), i.value = M;
    const [N, q] = _(M, l.value);
    c.value = q, n.value = N;
  }
  function h($) {
    l.value = $, v();
  }
  function _($, M) {
    return $.length > M ? [$.slice(-M), $.slice(0, -M)] : [$, []];
  }
  function w($ = null) {
    d.value = $ ?? !d.value;
  }
  function b() {
    return n.value && n.value.length && !p;
  }
  const A = ct(() => {
    var $;
    return (($ = n.value[n.value.length - 2]) == null ? void 0 : $.path) ?? s.value + "://";
  });
  return Ce(() => {
  }), Be(r, v), Ce(v), {
    adapter: s,
    path: r,
    loading: u,
    searchMode: p,
    data: f,
    breadcrumbs: n,
    breadcrumbItems: i,
    limitBreadcrumbItems: h,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: w,
    isGoUpAvailable: b,
    parentFolderPath: A
  };
}
const Aa = (t, e) => {
  const s = _r(t.id), r = dr(), n = s.getStore("metricUnits", !1), i = $r(s, t.theme), c = e.i18n, d = t.locale ?? e.locale, l = s.getStore("adapter"), u = (v) => Array.isArray(v) ? v : xr, p = s.getStore("persist-path", t.persist), f = p ? s.getStore("path", t.path) : t.path;
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
    i18n: br(s, d, r, c),
    // modal state
    modal: Sr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: ct(() => Ea()),
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
    theme: i,
    // unit state - for example: GB or GiB
    metricUnits: n,
    // human readable file sizes
    filesize: n ? zn : Pn,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: p,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: Ta(l, f)
  });
}, Ma = /* @__PURE__ */ a("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Da = { class: "fixed z-10 inset-0 overflow-hidden" }, Va = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, La = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, We = {
  __name: "ModalLayout",
  setup(t) {
    const e = C(null), s = ae("ServiceContainer");
    return Ce(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), ht(() => {
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
      onKeyup: n[1] || (n[1] = Ct((i) => o(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      Ma,
      a("div", Da, [
        a("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = at((i) => o(s).modal.close(), ["self"]))
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
    const r = ae("ServiceContainer"), n = C(!1), { t: i } = r.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), n.value = !0, c = setTimeout(() => {
        n.value = !1;
      }, 2e3);
    };
    return Ce(() => {
      r.emitter.on(t.on, d);
    }), Gs(() => {
      clearTimeout(c);
    }), {
      shown: n,
      t: i
    };
  }
}, Fa = { key: 1 };
function Ha(t, e, s, r, n, i) {
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
}, tt = {
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
}, Ka = { class: "sm:items-start select-none" }, Wa = { class: "mt-3 sm:mt-0 sm:text-left w-full" }, Ya = {
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
}, ml = { class: "flex relative gap-x-3" }, hl = { class: "h-6 items-center" }, pl = { class: "flex-1 block text-sm" }, vl = {
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
}, ei = { class: "m-1 text-sm text-gray-500" }, Do = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: n } = e.i18n, i = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = ct(() => [
      { name: n("About"), key: i.ABOUT },
      { name: n("Settings"), key: i.SETTINGS },
      { name: n("Shortcuts"), key: i.SHORTCUTS },
      { name: n("Reset"), key: i.RESET }
    ]), d = C("about"), l = async () => {
      r(), location.reload();
    }, u = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, p = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? zn : Pn, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, f = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, h = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: _ } = ae("VueFinderOptions"), b = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(_).includes($))
    ), A = ct(() => ({
      system: n("System"),
      light: n("Light"),
      dark: n("Dark")
    }));
    return ($, M) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: M[7] || (M[7] = (x) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(n)("Close")), 1)
      ]),
      default: se(() => [
        a("div", Ka, [
          z(tt, {
            icon: o(za),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Wa, [
            a("div", null, [
              a("div", null, [
                a("nav", Ya, [
                  (m(!0), g(he, null, $e(c.value, (x) => (m(), g("button", {
                    key: x.name,
                    onClick: (N) => d.value = x.key,
                    class: de([x.key === d.value ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-sky-500" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-600", "px-3 py-2 border-b font-medium text-sm"]),
                    "aria-current": x.current ? "page" : void 0
                  }, y(x.name), 11, Xa))), 128))
                ])
              ])
            ]),
            d.value === i.ABOUT ? (m(), g("div", Ja, [
              a("div", Qa, y(o(n)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", Za, y(o(n)("Project home")), 1),
              a("a", el, y(o(n)("Follow on GitHub")), 1)
            ])) : P("", !0),
            d.value === i.SETTINGS ? (m(), g("div", tl, [
              a("div", sl, y(o(n)("Customize your experience with the following settings")), 1),
              a("div", nl, [
                a("fieldset", null, [
                  a("div", ol, [
                    a("div", rl, [
                      a("div", al, [
                        ve(a("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": M[0] || (M[0] = (x) => o(e).metricUnits = x),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).metricUnits]
                        ])
                      ]),
                      a("div", ll, [
                        a("label", il, [
                          Q(y(o(n)("Use Metric Units")) + " ", 1),
                          z(_t, {
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
                          "onUpdate:modelValue": M[1] || (M[1] = (x) => o(e).compactListView = x),
                          onClick: f,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).compactListView]
                        ])
                      ]),
                      a("div", ul, [
                        a("label", fl, [
                          Q(y(o(n)("Compact list view")) + " ", 1),
                          z(_t, {
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
                      a("div", hl, [
                        ve(a("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": M[2] || (M[2] = (x) => o(e).persist = x),
                          onClick: h,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).persist]
                        ])
                      ]),
                      a("div", pl, [
                        a("label", vl, [
                          Q(y(o(n)("Persist path on reload")) + " ", 1),
                          z(_t, {
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
                          "onUpdate:modelValue": M[3] || (M[3] = (x) => o(e).showThumbnails = x),
                          onClick: v,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [jt, o(e).showThumbnails]
                        ])
                      ]),
                      a("div", yl, [
                        a("label", bl, [
                          Q(y(o(n)("Show thumbnails")) + " ", 1),
                          z(_t, {
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
                          "onUpdate:modelValue": M[4] || (M[4] = (x) => o(e).theme.value = x),
                          onChange: M[5] || (M[5] = (x) => u(x.target.value)),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: o(n)("Theme")
                          }, [
                            (m(!0), g(he, null, $e(A.value, (x, N) => (m(), g("option", { value: N }, y(x), 9, Cl))), 256))
                          ], 8, Sl)
                        ], 544), [
                          [Cs, o(e).theme.value]
                        ]),
                        z(_t, {
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
                    o(e).features.includes(o(pe).LANGUAGE) && Object.keys(o(b)).length > 1 ? (m(), g("div", El, [
                      a("div", Tl, [
                        a("label", Al, y(o(n)("Language")), 1)
                      ]),
                      a("div", Ml, [
                        ve(a("select", {
                          id: "language",
                          "onUpdate:modelValue": M[6] || (M[6] = (x) => o(e).i18n.locale = x),
                          class: "flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          a("optgroup", {
                            label: o(n)("Language")
                          }, [
                            (m(!0), g(he, null, $e(o(b), (x, N) => (m(), g("option", { value: N }, y(x), 9, Vl))), 256))
                          ], 8, Dl)
                        ], 512), [
                          [Cs, o(e).i18n.locale]
                        ]),
                        z(_t, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: se(() => [
                            Q(y(o(n)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : P("", !0)
                  ])
                ])
              ])
            ])) : P("", !0),
            d.value === i.SHORTCUTS ? (m(), g("div", Ll, [
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
            ])) : P("", !0),
            d.value === i.RESET ? (m(), g("div", Zl, [
              a("div", ei, y(o(n)("Reset all settings to default")), 1),
              a("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, y(o(n)("Reset Settings")), 1)
            ])) : P("", !0)
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
    const s = e, r = ae("ServiceContainer"), { t: n } = r.i18n, i = C(!1), c = C(null), d = C((u = c.value) == null ? void 0 : u.strMessage);
    Be(d, () => i.value = !1);
    const l = () => {
      s("hidden"), i.value = !0;
    };
    return (p, f) => (m(), g("div", null, [
      i.value ? P("", !0) : (m(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: de(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", t.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        Lt(p.$slots, "default"),
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
const Vo = { render: li }, ii = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, ci = { class: "mt-2" }, di = { class: "text-sm text-gray-500" }, ui = {
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
}, hi = /* @__PURE__ */ a("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pi = [
  hi
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
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = C(e.modal.data.items), n = C(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (c) => {
          n.value = s(c.message);
        }
      });
    };
    return (c, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: i,
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
          z(tt, {
            icon: o(Vo),
            title: o(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", ii, [
            a("div", ci, [
              a("p", di, y(o(s)("Are you sure you want to delete these files?")), 1),
              a("div", ui, [
                (m(!0), g(he, null, $e(r.value, (l) => (m(), g("p", fi, [
                  l.type === "dir" ? (m(), g("svg", mi, pi)) : (m(), g("svg", vi, _i)),
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
              })) : P("", !0)
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
const Lo = { render: $i }, Si = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ci = { class: "mt-2" }, Ei = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Ti = {
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
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = C(e.modal.data.items[0]), n = C(e.modal.data.items[0].basename), i = C(""), c = () => {
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
          i.value = s(d.message);
        }
      });
    };
    return (d, l) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: c,
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
          z(tt, {
            icon: o(Lo),
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
                onKeyup: Ct(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Et, n.value]
              ]),
              i.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => i.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(i.value), 1)
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
function Ri(t) {
  const e = (s) => {
    s.code === Xe.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (s.code === Xe.F2 && t.features.includes(pe.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ln, { items: t.dragSelect.getSelected() })), s.code === Xe.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), s.code === Xe.DELETE && (!t.dragSelect.getCount() || t.modal.open(an, { items: t.dragSelect.getSelected() })), s.metaKey && s.code === Xe.BACKSLASH && t.modal.open(Do), s.metaKey && s.code === Xe.KEY_F && t.features.includes(pe.SEARCH) && (t.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Xe.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), s.metaKey && s.code === Xe.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), s.metaKey && s.code === Xe.KEY_A && (t.dragSelect.selectAll(), s.preventDefault())));
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
const Oo = { render: Ii }, Ni = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ui = { class: "mt-2" }, Pi = { class: "text-sm text-gray-500" }, zi = ["placeholder"], Ro = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = C(""), n = C(""), i = () => {
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
        onError: (c) => {
          n.value = s(c.message);
        }
      });
    };
    return (c, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: i,
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
          z(tt, {
            icon: o(Oo),
            title: o(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", Ni, [
            a("div", Ui, [
              a("p", Pi, y(o(s)("Create a new folder")), 1),
              ve(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Ct(i, ["enter"]),
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
              })) : P("", !0)
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
const Fo = { render: Ki }, Wi = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Yi = { class: "mt-2" }, Xi = { class: "text-sm text-gray-500" }, Ji = ["placeholder"], Qi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = ae("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = C(""), n = C(""), i = () => {
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
        onError: (c) => {
          n.value = s(c.message);
        }
      });
    };
    return (c, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: i,
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
          z(tt, {
            icon: o(Fo),
            title: o(s)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", Wi, [
            a("div", Yi, [
              a("p", Xi, y(o(s)("Create a new file")), 1),
              ve(a("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Ct(i, ["enter"]),
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
              })) : P("", !0)
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
const Ho = { render: sc }, nc = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, oc = { class: "mt-2" }, rc = {
  key: 0,
  class: "pointer-events-none"
}, ac = {
  key: 1,
  class: "pointer-events-none"
}, lc = ["disabled"], ic = ["disabled"], cc = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, dc = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, uc = ["textContent"], fc = { class: "ml-1 w-full h-fit" }, mc = { class: "text-left hidden md:block" }, hc = { class: "text-left md:hidden" }, pc = {
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
    }, i = C({ QUEUE_ENTRY_STATUS: n }), c = C(null), d = C(null), l = C(null), u = C(null), p = C(null), f = C(null), v = C([]), h = C(""), _ = C(!1), w = C(!1);
    let b;
    function A(O) {
      return v.value.findIndex((S) => S.id === O);
    }
    function $(O, S = null) {
      S = S ?? (O.webkitRelativePath || O.name), b.addFile({
        name: S,
        type: O.type,
        data: O,
        source: "Local"
      });
    }
    function M(O) {
      switch (O.status) {
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
    const x = (O) => {
      switch (O.status) {
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
    function N() {
      u.value.click();
    }
    function q() {
      if (!_.value) {
        if (!v.value.filter((O) => O.status !== n.DONE).length) {
          h.value = s("Please select file to upload first.");
          return;
        }
        h.value = "", b.retryAll(), b.upload();
      }
    }
    function R() {
      b.cancelAll({ reason: "user" }), v.value.forEach((O) => {
        O.status !== n.DONE && (O.status = n.CANCELED, O.statusName = s("Canceled"));
      }), _.value = !1;
    }
    function D(O) {
      _.value || (b.removeFile(O.id, "removed-by-user"), v.value.splice(A(O.id), 1));
    }
    function L(O) {
      if (!_.value) {
        if (b.cancelAll({ reason: "user" }), O) {
          const S = [];
          v.value.forEach((k) => {
            k.status !== n.DONE && S.push(k);
          }), v.value = [], S.forEach((k) => {
            $(k.originalFile, k.name);
          });
          return;
        }
        v.value.splice(0);
      }
    }
    function V() {
      e.modal.close();
    }
    function E() {
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
        onBeforeFileAdded(k, B) {
          if (B[k.id] != null) {
            const ne = A(k.id);
            v.value[ne].status === n.PENDING && (h.value = b.i18n("noDuplicates", { fileName: k.name })), v.value = v.value.filter((ue) => ue.id !== k.id);
          }
          return v.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: n.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), b.use(mr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, B) {
          let F;
          try {
            F = JSON.parse(k).message;
          } catch {
            F = s("Cannot parse server response.");
          }
          return new Error(F);
        }
      }), b.on("restriction-failed", (k, B) => {
        const F = v.value[A(k.id)];
        D(F), h.value = B.message;
      }), b.on("upload", () => {
        const k = E();
        b.setMeta({ ...k.body });
        const B = b.getPlugin("XHRUpload");
        B.opts.method = k.method, B.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), B.opts.headers = k.headers, delete k.headers["Content-Type"], _.value = !0, v.value.forEach((F) => {
          F.status !== n.DONE && (F.percent = null, F.status = n.UPLOADING, F.statusName = s("Pending upload"));
        });
      }), b.on("upload-progress", (k, B) => {
        const F = Math.floor(B.bytesUploaded / B.bytesTotal * 100);
        v.value[A(k.id)].percent = `${F}%`;
      }), b.on("upload-success", (k) => {
        const B = v.value[A(k.id)];
        B.status = n.DONE, B.statusName = s("Done");
      }), b.on("upload-error", (k, B) => {
        const F = v.value[A(k.id)];
        F.percent = null, F.status = n.ERROR, B.isNetworkError ? F.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : F.statusName = B ? B.message : s("Unknown Error");
      }), b.on("error", (k) => {
        h.value = k.message, _.value = !1, e.emitter.emit("vf-fetch", {
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
      }), p.value.addEventListener("click", () => {
        l.value.click();
      }), f.value.addEventListener("dragover", (k) => {
        k.preventDefault(), w.value = !0;
      }), f.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), w.value = !1;
      });
      function O(k, B) {
        B.isFile && B.file((F) => k(B, F)), B.isDirectory && B.createReader().readEntries((F) => {
          F.forEach((ne) => {
            O(k, ne);
          });
        });
      }
      f.value.addEventListener("drop", (k) => {
        k.preventDefault(), w.value = !1;
        const B = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((F) => {
          F.kind === "file" && O((ne, ue) => {
            const le = B.exec(ne.fullPath);
            $(ue, le[1]);
          }, F.webkitGetAsEntry());
        });
      });
      const S = ({ target: k }) => {
        const B = k.files;
        for (const F of B)
          $(F);
        k.value = "";
      };
      d.value.addEventListener("change", S), l.value.addEventListener("change", S);
    }), Nn(() => {
      b == null || b.close({ reason: "unmount" });
    }), (O, S) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: de(["vf-btn vf-btn-primary", _.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: _.value,
          onClick: at(q, ["prevent"])
        }, y(o(s)("Upload")), 11, bc),
        _.value ? (m(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: at(R, ["prevent"])
        }, y(o(s)("Cancel")), 1)) : (m(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: at(V, ["prevent"])
        }, y(o(s)("Close")), 1))
      ]),
      default: se(() => [
        a("div", null, [
          z(tt, {
            icon: o(Ho),
            title: o(s)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", nc, [
            a("div", oc, [
              a("div", {
                ref_key: "dropArea",
                ref: f,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: N
              }, [
                w.value ? (m(), g("div", rc, y(o(s)("Release to drop these files.")), 1)) : (m(), g("div", ac, y(o(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              a("div", {
                ref_key: "container",
                ref: c,
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
                  ref: p,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, y(o(s)("Select Folders")), 513),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: _.value,
                  onClick: S[0] || (S[0] = (k) => L(!1))
                }, y(o(s)("Clear all")), 9, lc),
                a("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: _.value,
                  onClick: S[1] || (S[1] = (k) => L(!0))
                }, y(o(s)("Clear only successful")), 9, ic)
              ], 512),
              a("div", cc, [
                (m(!0), g(he, null, $e(v.value, (k) => (m(), g("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: k.id
                }, [
                  a("span", dc, [
                    a("span", {
                      class: de(["text-base m-auto", M(k)]),
                      textContent: y(x(k))
                    }, null, 10, uc)
                  ]),
                  a("div", fc, [
                    a("div", mc, y(o(qs)(k.name, 40)) + " (" + y(k.size) + ")", 1),
                    a("div", hc, y(o(qs)(k.name, 16)) + " (" + y(k.size) + ")", 1),
                    a("div", {
                      class: de(["flex break-all text-left", M(k)])
                    }, [
                      Q(y(k.statusName) + " ", 1),
                      k.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (m(), g("b", pc, y(k.percent), 1)) : P("", !0)
                    ], 2)
                  ]),
                  a("button", {
                    type: "button",
                    class: de(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", _.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: o(s)("Delete"),
                    disabled: _.value,
                    onClick: (B) => D(k)
                  }, _c, 10, vc)
                ]))), 128)),
                v.value.length ? P("", !0) : (m(), g("div", yc, y(o(s)("No files selected!")), 1))
              ]),
              h.value.length ? (m(), W(Ye, {
                key: 0,
                onHidden: S[2] || (S[2] = (k) => h.value = ""),
                error: ""
              }, {
                default: se(() => [
                  Q(y(h.value), 1)
                ]),
                _: 1
              })) : P("", !0)
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
const Bo = { render: Sc }, Cc = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ec = { class: "mt-2" }, Tc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ac = {
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
], Rc = { class: "ml-1.5" }, Fc = { class: "my-1 text-sm text-gray-500" }, Io = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = C(e.modal.data.items[0]), n = C(""), i = C([]), c = () => {
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
          onClick: c,
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
          z(tt, {
            icon: o(Bo),
            title: o(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Cc, [
            a("div", Ec, [
              (m(!0), g(he, null, $e(i.value, (u) => (m(), g("p", Tc, [
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
              })) : P("", !0)
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
const No = { render: Nc }, Uc = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Pc = { class: "mt-2" }, zc = {
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
], Jc = { class: "ml-1.5" }, Qc = ["placeholder"], Uo = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = C(""), n = C(""), i = C(e.modal.data.items), c = () => {
      i.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: i.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
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
          onClick: c,
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
          z(tt, {
            icon: o(No),
            title: o(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Uc, [
            a("div", Pc, [
              a("div", zc, [
                (m(!0), g(he, null, $e(i.value, (u) => (m(), g("p", qc, [
                  u.type === "dir" ? (m(), g("svg", jc, Kc)) : (m(), g("svg", Wc, Xc)),
                  a("span", Jc, y(u.basename), 1)
                ]))), 256))
              ]),
              ve(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: Ct(c, ["enter"]),
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
              })) : P("", !0)
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
const md = { render: fd }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, pd = /* @__PURE__ */ a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), vd = [
  pd
];
function gd(t, e) {
  return m(), g("svg", hd, [...vd]);
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
    const e = ae("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, n = e.dragSelect, i = C("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    Be(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", n.refreshSelection(), s("viewport", e.view);
    };
    return (l, u) => (m(), g("div", $d, [
      i.value.length ? (m(), g("div", Ld, [
        a("div", Od, [
          Q(y(o(r)("Search results for")) + " ", 1),
          a("span", Rd, y(i.value), 1)
        ]),
        o(e).fs.loading ? (m(), W(o(cn), { key: 0 })) : P("", !0)
      ])) : (m(), g("div", Sd, [
        o(e).features.includes(o(pe).NEW_FOLDER) ? (m(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (p) => o(e).modal.open(Ro, { items: o(n).getSelected() }))
        }, [
          z(o(Oo))
        ], 8, Cd)) : P("", !0),
        o(e).features.includes(o(pe).NEW_FILE) ? (m(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (p) => o(e).modal.open(Qi, { items: o(n).getSelected() }))
        }, [
          z(o(Fo))
        ], 8, Ed)) : P("", !0),
        o(e).features.includes(o(pe).RENAME) ? (m(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (p) => o(n).getCount() !== 1 || o(e).modal.open(ln, { items: o(n).getSelected() }))
        }, [
          z(o(Lo), {
            class: de(o(n).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Td)) : P("", !0),
        o(e).features.includes(o(pe).DELETE) ? (m(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (p) => !o(n).getCount() || o(e).modal.open(an, { items: o(n).getSelected() }))
        }, [
          z(o(Vo), {
            class: de(o(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ad)) : P("", !0),
        o(e).features.includes(o(pe).UPLOAD) ? (m(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (p) => o(e).modal.open(xc, { items: o(n).getSelected() }))
        }, [
          z(o(Ho))
        ], 8, Md)) : P("", !0),
        o(e).features.includes(o(pe).UNARCHIVE) && o(n).getCount() === 1 && o(n).getSelected()[0].mime_type === "application/zip" ? (m(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (p) => !o(n).getCount() || o(e).modal.open(Io, { items: o(n).getSelected() }))
        }, [
          z(o(Bo), {
            class: de(o(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dd)) : P("", !0),
        o(e).features.includes(o(pe).ARCHIVE) ? (m(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (p) => !o(n).getCount() || o(e).modal.open(Uo, { items: o(n).getSelected() }))
        }, [
          z(o(No), {
            class: de(o(n).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : P("", !0)
      ])),
      a("div", Fd, [
        o(e).features.includes(o(pe).FULL_SCREEN) ? (m(), g("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (m(), W(o(md), { key: 0 })) : (m(), W(o(id), { key: 1 }))
        ], 8, Hd)) : P("", !0),
        a("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (p) => i.value.length || d())
        }, [
          o(e).view === "grid" ? (m(), W(o(_d), {
            key: 0,
            class: de(i.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0),
          o(e).view === "list" ? (m(), W(o(kd), {
            key: 1,
            class: de(i.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : P("", !0)
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
  const r = C(t);
  return nr((n, i) => ({
    get() {
      return n(), r.value;
    },
    set: Nd(
      (c) => {
        r.value = c, i();
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
const jd = { render: qd }, Gd = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Kd = { class: "text-sm text-gray-500 pb-1" }, Wd = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, Yd = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Xd = {
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
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = C(e.modal.data.items.from), n = C(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (c) => {
          n.value = s(c.message);
        }
      });
    };
    return (c, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: i,
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
          z(tt, {
            icon: o(jd),
            title: o(s)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", Gd, [
            a("p", Kd, y(o(s)("Are you sure you want to move these files?")), 1),
            a("div", Wd, [
              (m(!0), g(he, null, $e(r.value, (l) => (m(), g("div", Yd, [
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
            })) : P("", !0)
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
}, hu = /* @__PURE__ */ a("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), pu = [
  hu
];
function vu(t, e) {
  return m(), g("svg", mu, [...pu]);
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
const hs = { render: Uu }, Pu = {
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
}, a0 = /* @__PURE__ */ a("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), l0 = { class: "relative" }, i0 = /* @__PURE__ */ a("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), c0 = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], d0 = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, u0 = ["placeholder"], f0 = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, m0 = ["onDrop", "onClick"], h0 = { class: "flex pointer-events-none" }, p0 = { class: "inline-block w-full text-ellipsis overflow-hidden" }, v0 = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: n } = e.storage, i = C(null), c = Fn(0, 100);
    Be(c, (R) => {
      const D = i.value.children;
      let L = 0, V = 0, E = 5, O = 1;
      e.fs.limitBreadcrumbItems(E), ht(() => {
        for (let S = D.length - 1; S >= 0 && !(L + D[S].offsetWidth > c.value - 40); S--)
          L += parseInt(D[S].offsetWidth, 10), V++;
        V < O && (V = O), V > E && (V = E), e.fs.limitBreadcrumbItems(V);
      });
    });
    const d = () => {
      c.value = i.value.offsetWidth;
    };
    Ce(() => {
      new ResizeObserver(d).observe(i.value);
    });
    const l = (R, D = null) => {
      R.preventDefault(), r.isDraggingRef.value = !1, f(R), D ?? (D = e.fs.hiddenBreadcrumbs.length - 1);
      let L = JSON.parse(R.dataTransfer.getData("items"));
      if (L.find((V) => V.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: L,
          to: e.fs.hiddenBreadcrumbs[D] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (R, D = null) => {
      R.preventDefault(), r.isDraggingRef.value = !1, f(R), D ?? (D = e.fs.breadcrumbs.length - 2);
      let L = JSON.parse(R.dataTransfer.getData("items"));
      if (L.find((V) => V.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, {
        items: {
          from: L,
          to: e.fs.breadcrumbs[D] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, p = (R) => {
      R.preventDefault(), e.fs.isGoUpAvailable() ? (R.dataTransfer.dropEffect = "copy", R.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (R.dataTransfer.dropEffect = "none", R.dataTransfer.effectAllowed = "none");
    }, f = (R) => {
      R.preventDefault(), R.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && R.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      N(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      N(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, _ = (R) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: R.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, b = {
      mounted(R, D, L, V) {
        R.clickOutsideEvent = function(E) {
          R === E.target || R.contains(E.target) || D.value();
        }, document.body.addEventListener("click", R.clickOutsideEvent);
      },
      beforeUnmount(R, D, L, V) {
        document.body.removeEventListener("click", R.clickOutsideEvent);
      }
    }, A = () => {
      e.showTreeView = !e.showTreeView;
    };
    Be(() => e.showTreeView, (R, D) => {
      R !== D && n("show-tree-view", R);
    });
    const $ = C(null), M = () => {
      e.features.includes(pe.SEARCH) && (e.fs.searchMode = !0, ht(() => $.value.focus()));
    }, x = Fn("", 400);
    Be(x, (R) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: R });
    }), Be(() => e.fs.searchMode, (R) => {
      R && ht(() => $.value.focus());
    });
    const N = () => {
      e.fs.searchMode = !1, x.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      N();
    });
    const q = () => {
      x.value === "" && N();
    };
    return (R, D) => (m(), g("div", Zu, [
      a("span", {
        title: o(s)("Toggle Tree View")
      }, [
        z(o(Ku), {
          onClick: A,
          class: de(["h-6 w-6 p-0.5 rounded cursor-pointer text-slate-700", o(e).showTreeView ? "bg-gray-300 dark:bg-gray-700" : ""])
        }, null, 8, ["class"])
      ], 8, e0),
      a("span", {
        title: o(s)("Go up a directory")
      }, [
        z(o(gu), {
          onDragover: D[0] || (D[0] = (L) => p(L)),
          onDragleave: D[1] || (D[1] = (L) => f(L)),
          onDrop: D[2] || (D[2] = (L) => u(L)),
          onClick: h,
          class: de(o(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, t0),
      o(e).fs.loading ? (m(), g("span", {
        key: 1,
        title: o(s)("Cancel")
      }, [
        z(o(wu), {
          onClick: D[3] || (D[3] = (L) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, n0)) : (m(), g("span", {
        key: 0,
        title: o(s)("Refresh")
      }, [
        z(o(fu), { onClick: v })
      ], 8, s0)),
      ve(a("div", {
        onClick: at(M, ["self"]),
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden"
      }, [
        a("div", null, [
          z(o(Eu), {
            onDragover: D[4] || (D[4] = (L) => p(L)),
            onDragleave: D[5] || (D[5] = (L) => f(L)),
            onDrop: D[6] || (D[6] = (L) => u(L, -1)),
            onClick: D[7] || (D[7] = (L) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        a("div", o0, [
          o(e).fs.hiddenBreadcrumbs.length ? ve((m(), g("div", r0, [
            a0,
            a("div", l0, [
              a("span", {
                onDragenter: D[8] || (D[8] = (L) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: D[9] || (D[9] = (L) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                z(o(Qu), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [b, w]
          ]) : P("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: at(M, ["self"])
        }, [
          (m(!0), g(he, null, $e(o(e).fs.breadcrumbs, (L, V) => (m(), g("div", { key: V }, [
            i0,
            a("span", {
              onDragover: (E) => V === o(e).fs.breadcrumbs.length - 1 || p(E),
              onDragleave: (E) => V === o(e).fs.breadcrumbs.length - 1 || f(E),
              onDrop: (E) => V === o(e).fs.breadcrumbs.length - 1 || u(E, V),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: L.basename,
              onClick: (E) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: L.path } })
            }, y(L.name), 41, c0)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (m(), W(o(cn), { key: 0 })) : P("", !0)
      ], 512), [
        [ze, !o(e).fs.searchMode]
      ]),
      ve(a("div", d0, [
        a("div", null, [
          z(o(Vu))
        ]),
        ve(a("input", {
          ref_key: "searchInput",
          ref: $,
          onKeydown: Ct(N, ["esc"]),
          onBlur: q,
          "onUpdate:modelValue": D[10] || (D[10] = (L) => or(x) ? x.value = L : null),
          placeholder: o(s)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, u0), [
          [Et, o(x)]
        ]),
        z(o(Hu), { onClick: N })
      ], 512), [
        [ze, o(e).fs.searchMode]
      ]),
      ve(a("div", f0, [
        (m(!0), g(he, null, $e(o(e).fs.hiddenBreadcrumbs, (L, V) => (m(), g("div", {
          key: V,
          onDragover: D[11] || (D[11] = (E) => p(E)),
          onDragleave: D[12] || (D[12] = (E) => f(E)),
          onDrop: (E) => l(E, V),
          onClick: (E) => _(L),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          a("div", h0, [
            a("span", null, [
              z(o(hs), { class: "h-5 w-5" })
            ]),
            Q(),
            a("span", p0, y(L.name), 1)
          ])
        ], 40, m0))), 128))
      ], 512), [
        [ze, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Po = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), g0 = ["onClick"], _0 = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: s } = e.storage, r = C(s("full-screen", !1)), n = C([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
      n.value.splice(l, 1);
    }, d = (l) => {
      let u = n.value.findIndex((p) => p.id === l);
      u !== -1 && c(u);
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
      z(rr, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: se(() => [
          (m(!0), g(he, null, $e(n.value, (p, f) => (m(), g("div", {
            onClick: (v) => c(f),
            key: p,
            class: de([i(p.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, y(p.label), 11, g0))), 128))
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
      t.direction === "asc" ? (m(), W(o(k0), { key: 0 })) : P("", !0),
      t.direction === "desc" ? (m(), W(o(T0), { key: 1 })) : P("", !0)
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
      t.type === "dir" ? (m(), W(o(hs), {
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
      z(o(B0)),
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
    const s = e, r = C(""), n = C(""), i = C(null), c = C(!1), d = C(""), l = C(!1), u = ae("ServiceContainer"), { t: p } = u.i18n;
    Ce(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((h) => {
        r.value = h, s("success");
      });
    });
    const f = () => {
      c.value = !c.value, n.value = r.value;
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
      }).then((h) => {
        d.value = p("Updated."), r.value = h, s("success"), c.value = !c.value;
      }).catch((h) => {
        d.value = p(h.message), l.value = !0;
      });
    };
    return (h, _) => (m(), g(he, null, [
      a("div", P0, [
        a("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, y(o(u).modal.data.item.basename), 9, z0),
        a("div", q0, [
          c.value ? (m(), g("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, y(o(p)("Save")), 1)) : P("", !0),
          o(u).features.includes(o(pe).EDIT) ? (m(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: _[0] || (_[0] = (w) => f())
          }, y(c.value ? o(p)("Cancel") : o(p)("Edit")), 1)) : P("", !0)
        ])
      ]),
      a("div", null, [
        c.value ? (m(), g("div", G0, [
          ve(a("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": _[1] || (_[1] = (w) => n.value = w),
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
          onHidden: _[2] || (_[2] = (w) => d.value = ""),
          error: l.value
        }, {
          default: se(() => [
            Q(y(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : P("", !0)
      ])
    ], 64));
  }
}, W0 = { class: "flex" }, Y0 = ["title"], X0 = { class: "ml-auto mb-2" }, J0 = { class: "w-full flex justify-center" }, Q0 = ["src"], Z0 = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, r = ae("ServiceContainer"), { t: n } = r.i18n, i = C(null), c = C(null), d = C(!1), l = C(""), u = C(!1), p = () => {
      d.value = !d.value, d.value ? c.value = new pr(i.value, {
        crop(v) {
        }
      }) : c.value.destroy();
    }, f = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (v) => {
          l.value = "", u.value = !1;
          const h = new FormData();
          h.set("file", v), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: h
          }).then((_) => {
            l.value = n("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), p(), s("success");
          }).catch((_) => {
            l.value = n(_.message), u.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      s("success");
    }), (v, h) => (m(), g(he, null, [
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
          }, y(o(n)("Crop")), 1)) : P("", !0),
          o(r).features.includes(o(pe).EDIT) ? (m(), g("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: h[0] || (h[0] = (_) => p())
          }, y(d.value ? o(n)("Cancel") : o(n)("Edit")), 1)) : P("", !0)
        ])
      ]),
      a("div", J0, [
        a("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[50vh] max-h-[50vh]",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Q0)
      ]),
      l.value.length ? (m(), W(Ye, {
        key: 0,
        onHidden: h[1] || (h[1] = (_) => l.value = ""),
        error: u.value
      }, {
        default: se(() => [
          Q(y(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : P("", !0)
    ], 64));
  }
}, ef = { class: "flex" }, tf = ["title"], sf = /* @__PURE__ */ a("div", null, null, -1), nf = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = ae("ServiceContainer"), r = e;
    return Ce(() => {
      r("success");
    }), (n, i) => (m(), g(he, null, [
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
    }), (i, c) => (m(), g("div", null, [
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
    }), (i, c) => (m(), g(he, null, [
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
}, mf = ["title"], hf = ["data"], pf = ["src"], vf = /* @__PURE__ */ a("p", null, [
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
    }), (i, c) => (m(), g(he, null, [
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
          }, gf, 8, pf)
        ], 8, hf)
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
}, Tf = ["download", "href"], zo = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = C(!1), n = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(pe.PREVIEW);
    return i || (r.value = !0), (c, d) => (m(), W(We, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(o(s)("Close")), 1),
        o(e).features.includes(o(pe).DOWNLOAD) ? (m(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, y(o(s)("Download")), 9, Tf)) : P("", !0)
      ]),
      default: se(() => [
        a("div", null, [
          a("div", yf, [
            o(i) ? (m(), g("div", bf, [
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
            ])) : P("", !0),
            a("div", xf, [
              r.value === !1 ? (m(), g("div", wf, [
                kf,
                a("span", null, y(o(s)("Loading")), 1)
              ])) : P("", !0)
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
            Q(" " + y(o(Po)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(pe).DOWNLOAD) ? (m(), g("div", Ef, [
          a("span", null, y(o(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : P("", !0)
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
const qo = { render: Lf }, Of = ["data-type", "data-item", "data-index"], Ss = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = e.dragSelect, r = t, n = (h) => {
      h.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: h.path } })) : e.modal.open(zo, { adapter: e.fs.adapter, item: h });
    }, i = {
      mounted(h, _, w, b) {
        w.props.draggable && (h.addEventListener("dragstart", (A) => c(A, _.value)), h.addEventListener("dragover", (A) => l(A, _.value)), h.addEventListener("drop", (A) => d(A, _.value)));
      },
      beforeUnmount(h, _, w, b) {
        w.props.draggable && (h.removeEventListener("dragstart", c), h.removeEventListener("dragover", l), h.removeEventListener("drop", d));
      }
    }, c = (h, _) => {
      if (h.altKey || h.ctrlKey || h.metaKey)
        return h.preventDefault(), !1;
      s.isDraggingRef.value = !0, h.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), h.dataTransfer.effectAllowed = "all", h.dataTransfer.dropEffect = "copy", h.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, d = (h, _) => {
      h.preventDefault(), s.isDraggingRef.value = !1;
      let w = JSON.parse(h.dataTransfer.getData("items"));
      if (w.find((b) => b.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(js, { items: { from: w, to: _ } });
    }, l = (h, _) => {
      h.preventDefault(), !_ || _.type !== "dir" || s.getSelection().find((w) => w === h.currentTarget) ? (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : h.dataTransfer.dropEffect = "copy";
    };
    let u = null, p = !1;
    const f = () => {
      u && clearTimeout(u);
    }, v = (h) => {
      if (!p)
        p = !0, setTimeout(() => p = !1, 300);
      else
        return p = !1, n(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const _ = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: h.target.getBoundingClientRect().x,
          clientY: h.target.getBoundingClientRect().y
        });
        h.target.dispatchEvent(_);
      }, 500);
    };
    return (h, _) => ve((m(), g("div", {
      style: rs({ opacity: o(s).isDraggingRef.value && o(s).getSelection().find((w) => h.$el === w) ? "0.5 !important" : "" }),
      class: de(["vf-item-" + o(s).explorerId, "relative"]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: _[0] || (_[0] = (w) => n(t.item)),
      onTouchstart: _[1] || (_[1] = (w) => v(w)),
      onTouchend: _[2] || (_[2] = (w) => f()),
      onContextmenu: _[3] || (_[3] = at((w) => o(e).emitter.emit("vf-contextmenu-show", { event: w, items: o(s).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Lt(h.$slots, "default"),
      o(e).pinnedFolders.find((w) => w.path === t.item.path) ? (m(), W(o(qo), {
        key: 0,
        class: "absolute top-0 right-0 text-amber-600"
      })) : P("", !0)
    ], 46, Of)), [
      [i, t.item]
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
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = (f) => f == null ? void 0 : f.substring(0, 3), n = C(null), i = C(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      i.value = f, f ? e.emitter.emit("vf-fetch", {
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
      let v = [...e.fs.data.files], h = l.column, _ = l.order === "asc" ? 1 : -1;
      if (!f)
        return v;
      const w = (b, A) => typeof b == "string" && typeof A == "string" ? b.toLowerCase().localeCompare(A.toLowerCase()) : b < A ? -1 : b > A ? 1 : 0;
      return l.active && (v = v.slice().sort((b, A) => w(b[h], A[h]) * _)), v;
    }, p = (f) => {
      l.active && l.column === f ? (l.active = l.order === "asc", l.column = f, l.order = "desc") : (l.active = !0, l.column = f, l.order = "asc");
    };
    return Ce(() => {
      d = new hr(c.area.value);
    }), Bn(() => {
      d.update();
    }), Nn(() => {
      d.destroy();
    }), (f, v) => (m(), g("div", Rf, [
      o(e).view === "list" || i.value.length ? (m(), g("div", Ff, [
        a("div", {
          onClick: v[0] || (v[0] = (h) => p("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          Q(y(o(s)("Name")) + " ", 1),
          ve(z(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "basename"]
          ])
        ]),
        i.value.length ? P("", !0) : (m(), g("div", {
          key: 0,
          onClick: v[1] || (v[1] = (h) => p("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          Q(y(o(s)("Size")) + " ", 1),
          ve(z(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "file_size"]
          ])
        ])),
        i.value.length ? P("", !0) : (m(), g("div", {
          key: 1,
          onClick: v[2] || (v[2] = (h) => p("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          Q(y(o(s)("Date")) + " ", 1),
          ve(z(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "last_modified"]
          ])
        ])),
        i.value.length ? (m(), g("div", {
          key: 2,
          onClick: v[3] || (v[3] = (h) => p("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          Q(y(o(s)("Filepath")) + " ", 1),
          ve(z(Wt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : P("", !0)
      ])) : P("", !0),
      a("div", Hf, [
        z(U0, {
          ref_key: "dragImage",
          ref: n,
          count: o(c).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: o(c).scrollBarContainer,
        class: de(["vf-explorer-scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": i.value.length }]])
      }, [
        a("div", {
          ref: o(c).scrollBar,
          class: "w-5 bg-transparent pointer-events-none"
        }, null, 512)
      ], 2),
      a("div", {
        ref: o(c).area,
        class: "h-full w-full text-xs p-1 vf-explorer-scrollbar vf-selector-area z-0 overflow-y-auto",
        onContextmenu: v[4] || (v[4] = at((h) => o(e).emitter.emit("vf-contextmenu-show", { event: h, items: o(c).getSelected() }), ["self", "prevent"]))
      }, [
        i.value.length ? (m(!0), g(he, { key: 0 }, $e(u(), (h, _) => (m(), W(Ss, {
          item: h,
          index: _,
          dragImage: n.value,
          class: "vf-item vf-item-list"
        }, {
          default: se(() => [
            a("div", Bf, [
              a("div", If, [
                z($s, {
                  type: h.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Nf, y(h.basename), 1)
              ]),
              a("div", Uf, y(h.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0),
        o(e).view === "list" && !i.value.length ? (m(!0), g(he, { key: 1 }, $e(u(), (h, _) => (m(), W(Ss, {
          item: h,
          index: _,
          dragImage: n.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: h.path
        }, {
          default: se(() => [
            a("div", Pf, [
              a("div", zf, [
                z($s, {
                  type: h.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", qf, y(h.basename), 1)
              ]),
              a("div", jf, y(h.file_size ? o(e).filesize(h.file_size) : ""), 1),
              a("div", Gf, y(o(Po)(h.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : P("", !0),
        o(e).view === "grid" && !i.value.length ? (m(!0), g(he, { key: 2 }, $e(u(!1), (h, _) => (m(), W(Ss, {
          item: h,
          index: _,
          dragImage: n.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: se(() => [
            a("div", null, [
              a("div", Kf, [
                (h.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (m(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, h),
                  alt: h.basename,
                  key: h.path
                }, null, 8, Wf)) : (m(), W($s, {
                  key: 1,
                  type: h.type
                }, null, 8, ["type"])),
                !((h.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && h.type !== "dir" ? (m(), g("div", Yf, y(r(h.extension)), 1)) : P("", !0)
              ]),
              a("span", Xf, y(o(qs)(h.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : P("", !0)
      ], 544),
      z(_0)
    ]));
  }
}, Qf = ["href", "download"], Zf = ["onClick"], em = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, r = C(null), n = C([]), i = C(""), c = St({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ct(() => c.items.filter((f) => f.key == null || e.features.includes(f.key)));
    e.emitter.on("vf-context-selected", (f) => {
      n.value = f;
    });
    const l = {
      newfolder: {
        key: pe.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => e.modal.open(Ro)
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
        key: pe.DELETE,
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
        key: pe.PREVIEW,
        title: () => s("Preview"),
        action: () => e.modal.open(zo, { adapter: e.fs.adapter, item: n.value[0] })
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
        link: ct(() => e.requester.getDownloadUrl(e.fs.adapter, n.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: pe.ARCHIVE,
        title: () => s("Archive"),
        action: () => e.modal.open(Uo, { items: n })
      },
      unarchive: {
        key: pe.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => e.modal.open(Io, { items: n })
      },
      rename: {
        key: pe.RENAME,
        title: () => s("Rename"),
        action: () => e.modal.open(ln, { items: n })
      }
    }, u = (f) => {
      e.emitter.emit("vf-contextmenu-hide"), f.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      i.value = f;
    }), e.emitter.on("vf-contextmenu-show", ({ event: f, items: v, target: h = null }) => {
      if (c.items = [], i.value)
        if (h)
          c.items.push(l.openDir), e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !i.value ? (c.items.push(l.refresh), c.items.push(l.selectAll), c.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((_) => _.path === h.path) ? (c.items.push(l.refresh), c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", v)) : (h.type === "dir" ? (c.items.push(l.open), e.pinnedFolders.findIndex((_) => _.path === h.path) !== -1 ? c.items.push(l.unpinFolder) : c.items.push(l.pinFolder)) : (c.items.push(l.preview), c.items.push(l.download)), c.items.push(l.rename), h.mime_type === "application/zip" ? c.items.push(l.unarchive) : c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", [h]));
      p(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const p = (f) => {
      const v = e.dragSelect.area.value, h = e.root.getBoundingClientRect(), _ = v.getBoundingClientRect();
      let w = f.clientX - h.left, b = f.clientY - h.top;
      c.active = !0, ht(() => {
        var x;
        const A = (x = r.value) == null ? void 0 : x.getBoundingClientRect();
        let $ = (A == null ? void 0 : A.height) ?? 0, M = (A == null ? void 0 : A.width) ?? 0;
        w = _.right - f.pageX + window.scrollX < M ? w - M : w, b = _.bottom - f.pageY + window.scrollY < $ ? b - $ : b, c.positions = {
          left: w + "px",
          top: b + "px"
        };
      });
    };
    return (f, v) => ve((m(), g("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: rs(c.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (m(!0), g(he, null, $e(d.value, (h) => (m(), g("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: h.title
      }, [
        h.link ? (m(), g("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: h.link,
          download: h.link,
          onClick: v[0] || (v[0] = (_) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, y(h.title()), 1)
        ], 8, Qf)) : (m(), g("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (_) => u(h)
        }, [
          a("span", null, y(h.title()), 1)
        ], 8, Zf))
      ]))), 128))
    ], 4)), [
      [ze, c.active]
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
const jo = { render: om }, rm = {
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
const cm = { render: im }, dm = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0" }, um = { class: "flex leading-5 items-center" }, fm = ["title"], mm = { class: "z-[1] pointer-events-none" }, hm = ["value"], pm = { class: "ml-3" }, vm = { key: 0 }, gm = { class: "ml-1" }, _m = { class: "flex leading-5 items-center justify-end" }, ym = ["disabled"], bm = ["title"], xm = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, n = e.dragSelect, i = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, c = C("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const d = ct(() => {
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
            z(o(jo))
          ]),
          ve(a("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (p) => o(e).fs.adapter = p),
            onChange: i,
            class: "border-0 py-0.5 text-xs text-slate-500 bg-white dark:text-neutral-50 dark:bg-gray-700 rounded uppercase focus:outline-0 cursor-pointer",
            tabindex: "-1"
          }, [
            (m(!0), g(he, null, $e(o(e).fs.data.storages, (p) => (m(), g("option", { value: p }, y(p), 9, hm))), 256))
          ], 544), [
            [Cs, o(e).fs.adapter]
          ])
        ], 8, fm),
        a("div", pm, [
          c.value.length ? (m(), g("span", vm, y(o(e).fs.data.files.length) + " items found. ", 1)) : P("", !0),
          a("span", gm, y(o(e).dragSelect.getCount() > 0 ? o(s)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      a("div", _m, [
        o(e).selectButton.active ? (m(), g("button", {
          key: 0,
          class: de(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (p) => o(e).selectButton.click(o(n).getSelected(), p))
        }, y(o(s)("Select")), 11, ym)) : P("", !0),
        a("span", {
          class: "mr-1",
          title: o(s)("About"),
          onClick: u[2] || (u[2] = (p) => o(e).modal.open(Do))
        }, [
          z(o(cm))
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
const Go = { render: Sm }, Cm = {
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
const Ko = { render: Fm }, Hm = {
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
const Wo = { render: Um };
function Yo(t, e) {
  const s = t.findIndex((r) => r.path === e.path);
  s > -1 ? t[s] = e : t.push(e);
}
const Pm = { class: "h-5 w-5 shrink-0" }, zm = {
  key: 1,
  class: "cursor-pointer"
}, Xo = {
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
    const r = Un(t, "modelValue"), n = C(!1);
    Be(
      () => r.value,
      () => {
        var d;
        return ((d = i()) == null ? void 0 : d.folders.length) || c();
      }
    );
    function i() {
      return s.treeViewData.find((d) => d.path === e.path);
    }
    const c = () => {
      n.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Yo(s.treeViewData, { path: e.path, ...d });
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
          r.value && ((u = i()) != null && u.folders.length) ? (m(), W(o(Wo), {
            key: 0,
            class: "text-gray-600"
          })) : P("", !0),
          r.value ? P("", !0) : (m(), W(o(Ko), {
            key: 1,
            class: "text-gray-400"
          }))
        ]))
      ]);
    };
  }
}, qm = { class: "flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded" }, jm = ["onClick"], Gm = ["title", "onClick"], Km = { class: "h-5 w-5 shrink-0" }, Wm = { class: "pl-4" }, Ym = {
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
    const e = ae("ServiceContainer"), s = C([]), r = t, n = C(null);
    Ce(() => {
      r.path === r.adapter + "://" && et(n.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const i = ct(() => {
      var c;
      return ((c = e.treeViewData.find((d) => d.path === r.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, d) => {
      const l = lr("TreeSubfolderList", !0);
      return m(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: n,
        class: "block"
      }, [
        (m(!0), g(he, null, $e(i.value, (u, p) => (m(), g("li", {
          class: "flex flex-col space-x-0.5 py-0.5 text-sm",
          key: u.path
        }, [
          a("div", qm, [
            a("div", {
              class: "h-5 w-5 shrink-0",
              onClick: (f) => s.value[u.path] = !s.value[u.path]
            }, [
              z(Xo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: s.value[u.path],
                "onUpdate:modelValue": (f) => s.value[u.path] = f
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, jm),
            a("div", {
              class: "flex cursor-pointer",
              title: u.path,
              onClick: (f) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: u.path } })
            }, [
              a("div", Km, [
                o(e).fs.path === u.path ? (m(), W(o(Go), { key: 0 })) : (m(), W(o(hs), { key: 1 }))
              ]),
              a("div", {
                class: de(["text-nowrap pr-4", { "underline decoration-blue-300 dark:decoration-gray-400": o(e).fs.path === u.path }])
              }, y(u.basename), 3)
            ], 8, Gm)
          ]),
          a("div", Wm, [
            ve(z(l, {
              adapter: r.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [ze, s.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Xm = { class: "pointer-events-none pr-1" }, Jm = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = ae("ServiceContainer"), s = C(!1);
    return (r, n) => (m(), g(he, null, [
      a("div", {
        onClick: n[1] || (n[1] = (i) => s.value = !s.value),
        class: "p-1 py-1.5 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
      }, [
        a("div", {
          class: de(["flex flex-1 space-x-1 items-center", t.storage === o(e).fs.adapter ? "text-gray-700/80 dark:text-gray-300/80 text-bold" : ""])
        }, [
          a("div", {
            class: de(["h-5 w-5 shrink-0", t.storage === o(e).fs.adapter ? "text-sky-500 dark:text-slate-300" : ""])
          }, [
            z(o(jo))
          ], 2),
          a("div", null, y(t.storage), 1)
        ], 2),
        a("div", Xm, [
          z(Xo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": n[0] || (n[0] = (i) => s.value = i)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ve(z(Ym, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "overflow-x-auto my-1"
      }, null, 8, ["adapter", "path"]), [
        [ze, s.value]
      ])
    ], 64));
  }
}, Qm = { class: "h-5 w-5 shrink-0" }, Zm = { class: "cursor-pointer" }, eh = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Un(t, "modelValue");
    return (s, r) => (m(), g("div", Qm, [
      a("div", Zm, [
        e.value ? (m(), W(o(Wo), {
          key: 0,
          class: "text-gray-600"
        })) : P("", !0),
        e.value ? P("", !0) : (m(), W(o(Ko), {
          key: 1,
          class: "text-gray-400"
        }))
      ])
    ]));
  }
}, th = { class: "sticky left-0 dark:border-gray-600" }, sh = { class: "flex items-center space-x-1" }, nh = { class: "text-nowrap" }, oh = {
  key: 0,
  class: "block my-1"
}, rh = { class: "flex pl-2 py-0.5 text-sm justify-between pr-2" }, ah = ["onClick"], lh = ["title"], ih = ["onClick"], ch = { key: 0 }, dh = { class: "p-1 text-xs text-center" }, uh = { class: "sticky left-0" }, fh = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: s } = e.i18n, { getStore: r, setStore: n } = e.storage, i = C(190), c = C(r("pinned-folders-opened", !0));
    Be(c, (p) => n("pinned-folders-opened", p));
    const d = (p) => {
      e.pinnedFolders = e.pinnedFolders.filter((f) => f.path !== p.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (p) => {
      const f = p.clientX, v = p.target.parentElement, h = v.getBoundingClientRect().width;
      v.classList.remove("transition-[width]"), v.classList.add("transition-none");
      const _ = (b) => {
        i.value = h + b.clientX - f, i.value < 50 && (i.value = 0, e.showTreeView = !1), i.value > 50 && (e.showTreeView = !0);
      }, w = () => {
        const b = v.getBoundingClientRect();
        i.value = b.width, v.classList.add("transition-[width]"), v.classList.remove("transition-none"), window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", w);
      };
      window.addEventListener("mousemove", _), window.addEventListener("mouseup", w);
    }, u = C(null);
    return Ce(() => {
      et(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Be(e.fs.data, (p, f) => {
      const v = p.files.filter((h) => h.type === "dir");
      Yo(e.treeViewData, { path: e.fs.path, folders: v.map((h) => ({
        adapter: h.storage,
        path: h.path,
        basename: h.basename
      })) });
    }), (p, f) => (m(), g(he, null, [
      a("div", {
        onClick: f[0] || (f[0] = (v) => o(e).showTreeView = !o(e).showTreeView),
        class: de(["w-full h-full bg-gray-300/10 dark:bg-gray-700/10 z-[1]", o(e).showTreeView ? "backdrop-blur-sm absolute md:hidden" : "hidden"])
      }, null, 2),
      a("div", {
        style: rs(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "absolute h-full md:h-auto md:relative shadow-lg shrink-0 transition-[width] ease-in-out duration-200 z-[1] bg-gray-50 dark:bg-[#242f41]"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "h-full border-r dark:border-gray-600/50 pb-4"
        }, [
          a("div", th, [
            a("div", {
              onClick: f[2] || (f[2] = (v) => c.value = !c.value),
              class: "pr-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border-b p-1 py-1.5 uppercase font-bold text-gray-400 dark:text-gray-400 text-xs flex items-center justify-between cursor-pointer"
            }, [
              a("div", sh, [
                z(o(qo), { class: "text-amber-600" }),
                a("div", nh, y(o(s)("Pinned Folders")), 1)
              ]),
              z(eh, {
                modelValue: c.value,
                "onUpdate:modelValue": f[1] || (f[1] = (v) => c.value = v)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (m(), g("ul", oh, [
              (m(!0), g(he, null, $e(o(e).pinnedFolders, (v) => (m(), g("li", rh, [
                a("div", {
                  class: "flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer",
                  onClick: (h) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: v.storage, path: v.path } })
                }, [
                  o(e).fs.path !== v.path ? (m(), W(o(hs), {
                    key: 0,
                    class: "h-5 w-5"
                  })) : P("", !0),
                  o(e).fs.path === v.path ? (m(), W(o(Go), {
                    key: 1,
                    class: "h-5 w-5"
                  })) : P("", !0),
                  a("div", {
                    title: v.path,
                    class: de(["text-nowrap", { "underline decoration-blue-300 dark:decoration-gray-400": o(e).fs.path === v.path }])
                  }, y(v.basename), 11, lh)
                ], 8, ah),
                a("div", {
                  class: "cursor-pointer",
                  onClick: (h) => d(v)
                }, [
                  z(o(Dm), { class: "p-0.5 text-gray-300 hover:text-gray-400 dark:text-gray-600 hover:dark:text-gray-400" })
                ], 8, ih)
              ]))), 256)),
              o(e).pinnedFolders.length ? P("", !0) : (m(), g("li", ch, [
                a("div", dh, y(o(s)("No folders pinned")), 1)
              ]))
            ])) : P("", !0)
          ]),
          (m(!0), g(he, null, $e(o(e).fs.data.storages, (v) => (m(), g("div", uh, [
            z(Jm, { storage: v }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: l,
          class: de([(o(e).showTreeView, ""), "transition-colors ease-in-out duration-200 top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, mh = { class: "relative flex overflow-hidden h-full" }, hh = {
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
    const { setStore: i } = n.storage, c = C(null);
    n.root = c;
    const d = n.dragSelect;
    Ri(n);
    const l = (p) => {
      Object.assign(n.fs.data, p), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return n.emitter.on("vf-fetch-abort", () => {
      u.abort(), n.fs.loading = !1;
    }), n.emitter.on("vf-fetch", ({ params: p, body: f = null, onSuccess: v = null, onError: h = null, noCloseModal: _ = !1 }) => {
      ["index", "search"].includes(p.q) && (u && u.abort(), n.fs.loading = !0), u = new AbortController();
      const w = u.signal;
      n.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: f,
        abortSignal: w
      }).then((b) => {
        n.fs.adapter = b.adapter, n.persist && (n.fs.path = b.dirname, i("path", n.fs.path)), ["index", "search"].includes(p.q) && (n.fs.loading = !1), _ || n.modal.close(), l(b), v && v(b);
      }).catch((b) => {
        console.error(b), h && h(b);
      });
    }), Ce(() => {
      let p = {};
      n.fs.path.includes("://") && (p = {
        adapter: n.fs.path.split("://")[0],
        path: n.fs.path
      }), n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, ...p } }), d.onSelect((f) => {
        s("select", f);
      });
    }), (p, f) => (m(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
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
          z(Id),
          z(v0),
          a("div", mh, [
            z(fh),
            z(Jf)
          ]),
          z(xm)
        ], 38),
        z(cr, { name: "fade" }, {
          default: se(() => [
            o(n).modal.visible ? (m(), W(In(o(n).modal.type), { key: 0 })) : P("", !0)
          ]),
          _: 1
        }),
        z(em)
      ], 2)
    ], 512));
  }
}, Sh = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", hh);
  }
};
export {
  Sh as default
};
