const u = [
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
], t = {
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
  advanced: u.reduce((e, r) => (e[r] = !0, e), {})
};
function n() {
  return t.advanced;
}
function a(e) {
  return e ? e === "simple" || e === "advanced" ? { ...t[e] } : { ...n(), ...e } : n();
}
export {
  t as FEATURE_PRESETS,
  n as getDefaultFeatures,
  a as normalizeFeatures
};
