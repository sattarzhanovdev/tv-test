var TVwwwRender = function (e, t) {
  var n = window,
    i = document,
    o = i.documentElement,
    s = void 0 !== t ? i.querySelector(t) : i.getElementsByTagName("body")[0],
    c = n.innerWidth || o.clientWidth || s.clientWidth,
    r = n.innerHeight || o.clientHeight || s.clientHeight;
  (s.innerHTML = ""),
    (this.TVwwwRender = {
      contents: [],
      categories: [],
      settings: {
        canvas: { w: c, h: r },
        categories: {
          position: "left",
          columns: 1,
          rows: 5,
          w: Math.floor(c / 3) - 100,
          h: r - 100,
        },
        contents: {
          position: "right",
          columns: 4,
          rows: 2,
          w: c - Math.floor(c / 3) - 100,
          h: r - 100,
        },
        blocks: ["categories", "contents"],
        buttons: ["ok", "left", "right", "up", "down"],
        backgrounds: [],
      },
      active: { current: "", display: "", key: "" },
    });
  var v = this.TVwwwRender;
  function a() {
    if (v.getProp([v.active.current, "settings"].j())) {
      var n = [],
        e = JSON.parse(
          JSON.stringify(v.settings, function (e, t) {
            if ("object" == typeof t && null !== t) {
              if (-1 !== n.indexOf(t))
                try {
                  return JSON.parse(JSON.stringify(t));
                } catch (e) {
                  return;
                }
              n.push(t);
            }
            return t;
          })
        );
      (n = null),
        Object.deepExtend(e, v.getProp([v.active.current, "settings"].j())),
        (v.settings = e);
    }
    "ok" === v.active.key && (v.active.display = v.active.router);
    var t = v.settings.blocks,
      u = t.slice().reverse(),
      i = v.settings,
      p = !1;
    t.forEach(function (o, s) {
      var c = v.getProp([v.active.display, o].j())
          ? [v.active.display, o].j()
          : [o].j(),
        r = v.getProp([v.active.display, u[s]].j())
          ? [v.active.display, u[s]].j()
          : [u[s]].j(),
        e = v.getProp(c);
      if ("object" == typeof e) {
        "categories" === o && i[o].rows >= e.length && (i[o].rows = e.length);
        var t = i[o],
          a = t.columns,
          n = t.rows,
          l = t.position,
          g = e.length,
          d = a * n;
        e.forEach(function (t, n) {
          if ((p && delete t.active, t.active)) {
            var i = [],
              e = JSON.parse(
                JSON.stringify(v.active, function (e, t) {
                  if ("object" == typeof t && null !== t) {
                    if (-1 !== i.indexOf(t))
                      try {
                        return JSON.parse(JSON.stringify(t));
                      } catch (e) {
                        return;
                      }
                    i.push(t);
                  }
                  return t;
                })
              );
            (i = null),
              Object.deepExtend(e, t),
              (v.active = e),
              (p = !0),
              (v.active[o] = {}),
              (v.active[o].page = Math.ceil((n + 1) / d)),
              (v.active[o].end = v.active[o].page * d),
              (v.active[o].begin = v.active[o].end - d),
              (v.active.current = [c, n].j()),
              (v.active.router = v.getProp([c, n, "ok"].j())
                ? [c, n, "ok"].j()
                : ""),
              v.settings.buttons.forEach(function (e) {
                switch (e) {
                  case "ok":
                    v.active.ok = t.ok ? t.ok : [c, n].j();
                    break;
                  case "left":
                    v.active.left =
                      "left" === l
                        ? n + 1 < g
                          ? [c, n + 1].j()
                          : [c, n].j()
                        : n % a
                        ? 0 <= n - 1
                          ? [c, n - 1].j()
                          : [c, n].j()
                        : [r, v.active[u[s]].begin].j();
                    break;
                  case "right":
                    v.active.right =
                      "right" === l
                        ? n + 1 < g
                          ? [c, n + 1].j()
                          : [c, n].j()
                        : n % a
                        ? 0 <= n - 1
                          ? [c, n - 1].j()
                          : [c, n].j()
                        : [r, v.active[u[s]].begin].j();
                    break;
                  case "up":
                    v.active.up = 0 <= n - a ? [c, n - a].j() : [c, n].j();
                    break;
                  case "down":
                    v.active.down = n + a < g ? [c, n + a].j() : [c, g - 1].j();
                }
              });
          } else
            (v.active[o] = v.active[o] ? v.active[o] : {}),
              (v.active[o].page = v.active[o].page
                ? v.active[o].page
                : Math.ceil((n + 1) / d)),
              (v.active[o].end = v.active[o].end
                ? v.active[o].end
                : v.active[o].page * d),
              (v.active[o].begin = v.active[o].begin
                ? v.active[o].begin
                : v.active[o].end - d);
        });
      }
    });
  }
  function l(e) {
    if (
      ((e = e || v.settings.blocks).forEach(function (g) {
        var d = v.getProp([v.active.display, g].j())
            ? [v.active.display, g].j()
            : [g].j(),
          e = v.getProp(d);
        if ("object" == typeof e) {
          var t = document.querySelector("#" + g);
          t && t.parentNode.removeChild(t);
          var u = document.createElement("div");
          u.setAttribute("id", g),
            e
              .slice(v.active[g].begin, v.active[g].end)
              .forEach(function (e, t) {
                if (!(t >= v.settings[g].columns * v.settings[g].rows)) {
                  var n = document.createElement("div");
                  n.setAttribute("class", g);
                  var i = document.createElement("div");
                  i.setAttribute(
                    "class",
                    "item" +
                      (e.active ? " active" : "") +
                      (v.active.display.indexOf(
                        [d, v.active[g].begin + t].j()
                      ) + 1
                        ? " current"
                        : "")
                  );
                  var o = document.createElement("div");
                  o.setAttribute("class", "title");
                  var s = document.createElement("div");
                  s.setAttribute("class", "body"), (s.innerHTML = e.body || "");
                  var c = document.createElement("div");
                  c.setAttribute("class", "top"), (c.innerHTML = e.top || "");
                  var r = document.createElement("div");
                  r.setAttribute("class", "bottom"),
                    (r.innerHTML = e.bottom || "");
                  var a = document.createElement("div");
                  a.setAttribute("class", "bg");
                  var l = document.createElement("div");
                  l.setAttribute("class", "image"),
                    l.setAttribute(
                      "style",
                      e.image
                        ? "background:#000 url(" +
                            e.image +
                            ") 100% 100% no-repeat; background-size: cover;"
                        : ""
                    ),
                    (o.innerHTML = e.title || ""),
                    i.appendChild(o),
                    i.appendChild(c),
                    i.appendChild(s),
                    i.appendChild(r),
                    i.appendChild(a),
                    i.appendChild(l),
                    n.appendChild(i),
                    u.appendChild(n);
                }
              }),
            document.getElementsByTagName("body")[0].appendChild(u);
        }
      }),
      !document.querySelector("#background"))
    ) {
      var t = document.createElement("div");
      t.setAttribute("id", "background"),
        document.getElementsByTagName("body")[0].appendChild(t);
    }
  }
  function g(e) {
    if (e) {
      var t = e.key || e.keyCode || "";
      if (
        ((v.active.key = t =
          (function (e) {
            switch ((e = "string" == typeof e ? e.toLowerCase() : e)) {
              case "enter":
              case "ok":
              case 13:
                e = "ok";
                break;
              case "arrowleft":
              case "leftarrow":
              case "left":
              case 37:
                e = "left";
                break;
              case "arrowup":
              case "uparrow":
              case "up":
              case 38:
                e = "up";
                break;
              case "arrowright":
              case "rightarrow":
              case "right":
              case 39:
                e = "right";
                break;
              case "arrowdown":
              case "downarrow":
              case "down":
              case 40:
                e = "down";
                break;
              default:
                e = "";
            }
            return e;
          })(t)),
        !e.defaultPrevented && t)
      ) {
        var n = [];
        if ("string" == typeof v.active[t]) {
          if (/^http|\//gi.test(v.active[t]))
            return void (window.location.href = v.active[t]);
          v.setProp([v.active.current, "active"].j(), !1),
            v.setProp([v.active[t], "active"].j(), !0),
            (v.active.current.indexOf("categories") + 1 ||
              v.active[t].indexOf("categories") + 1) &&
              n.push("categories"),
            (v.active.current.indexOf("contents") + 1 ||
              v.active[t].indexOf("contents") + 1) &&
              n.push("contents");
        } else
          v.setProp([v.active.current, "active"].j(), !1),
            v.setProp([v.active.display, "contents", "0", "active"].j(), !0),
            v.active.current.indexOf("categories") + 1 && n.push("categories"),
            n.push("contents");
        a(), l(n);
      } else console.log(t);
    }
  }
  e && Object.deepExtend(v, e);
  var d,
    u,
    p = 0,
    h = 0,
    f = 0,
    w = 0,
    m = !1;
  window.Event && document.captureEvents(Event.MOUSEMOVE),
    (document.onkeydown = g),
    (document.onmousemove = function (e) {
      var t = window.Event
          ? e.pageX
          : event.clientX +
            (document.documentElement.scrollLeft
              ? document.documentElement.scrollLeft
              : document.body.scrollLeft),
        n = window.Event
          ? e.pageY
          : event.clientY +
            (document.documentElement.scrollTop
              ? document.documentElement.scrollTop
              : document.body.scrollTop);
      (p = p || t),
        (h = h || n),
        (f = t),
        (w = n),
        m ||
          ((m = !0),
          setTimeout(function () {
            var e = "",
              t = p - f,
              n = h - w;
            (e =
              Math.abs(t) > Math.abs(n)
                ? 0 < t
                  ? "left"
                  : t < 0
                  ? "right"
                  : ""
                : 0 < n
                ? "up"
                : n < 0
                ? "down"
                : ""),
              (p = f),
              (h = w),
              g(e ? { key: e } : null),
              (m = !1);
          }, 100));
    }),
    (document.onclick = function () {
      g({ key: "Enter" });
    }),
    a(),
    l(),
    (d = document.createElement("style")),
    (u = [
      '#background {background: #000 url("' +
        v.settings.backgrounds[
          Math.floor(Math.random() * v.settings.backgrounds.length)
        ] +
        '") center center no-repeat;background-size: cover;}',
      "#contents {width:" +
        v.settings.contents.w +
        "px;" +
        v.settings.contents.position +
        ": 50px;}",
      "#contents .contents {float:" + v.settings.categories.position + ";}",
      "#categories {width:" +
        v.settings.categories.w +
        "px;" +
        v.settings.categories.position +
        ": 50px;}",
      "#categories .categories {float:" + v.settings.contents.position + ";}",
      "#contents .contents .item {width:" +
        Math.floor(v.settings.contents.w / v.settings.contents.columns) +
        "px;height:" +
        Math.floor(v.settings.contents.h / v.settings.contents.rows) +
        "px;}",
      "#contents .contents .item .title {width:" +
        Math.floor(v.settings.contents.w / v.settings.contents.columns) +
        "px;height:" +
        Math.floor(v.settings.contents.h / v.settings.contents.rows) +
        "px;line-height:" +
        Math.floor(v.settings.contents.h / v.settings.contents.rows) +
        "px;}",
      "#categories .categories .item {width:" +
        Math.floor(v.settings.categories.w / v.settings.categories.columns) +
        "px;height:" +
        Math.floor(v.settings.categories.h / v.settings.categories.rows) +
        "px;}",
      "#categories .categories .item .title {width:" +
        Math.floor(v.settings.categories.w / v.settings.categories.columns) +
        "px;height:" +
        Math.floor(v.settings.categories.h / v.settings.categories.rows) +
        "px;line-height:" +
        Math.floor(v.settings.categories.h / v.settings.categories.rows) +
        "px;}",
      "#contents .contents .item.active .image {top: -10px;left: -10px;width:" +
        Math.floor(v.settings.contents.w / v.settings.contents.columns + 20) +
        "px;height:" +
        Math.floor(v.settings.contents.h / v.settings.contents.rows + 20) +
        "px;}",
    ]),
    (d.innerHTML = u.join("")),
    document.getElementsByTagName("head")[0].appendChild(d);
};
(Object.deepExtend = function (e, t) {
  for (var n in t)
    t.hasOwnProperty(n) &&
    t[n] &&
    t[n].constructor &&
    t[n].constructor === Object
      ? ((e[n] = e[n] || {}), arguments.callee(e[n], t[n]))
      : (e[n] = t[n]);
  return e;
}),
  Object.defineProperty(Object.prototype, "getProp", {
    value: function (e) {
      if (
        !(e =
          "string" == typeof e
            ? e
                .replace(/\s+/g, " ")
                .replace(/(^\s*)|(\s*)$/g, "")
                .replace(/\.+/g, ".")
                .replace(/(^\.*)|(\.*)$/g, "")
            : e)
      )
        return this;
      for (var t = this, n = e.split("."); n.length && (t = t[n.shift()]); );
      return t;
    },
    enumerable: !1,
  }),
  Object.defineProperty(Object.prototype, "setProp", {
    value: function (e, t) {
      if (
        !(e =
          "string" == typeof e
            ? e
                .replace(/\s+/g, " ")
                .replace(/(^\s*)|(\s*)$/g, "")
                .replace(/\.+/g, ".")
                .replace(/(^\.*)|(\.*)$/g, "")
            : e)
      )
        return this;
      for (
        var n = this, i = e.split("."), o = i.pop();
        i.length && (n = n[i.shift()]);

      );
      return (n[o] = t), n;
    },
    enumerable: !1,
  }),
  (Object.prototype.j = function () {
    return this.map(function (e) {
      return (e + "")
        .replace(/\s+/g, " ")
        .replace(/(^\s*)|(\s*)$/g, "")
        .replace(/\.+/g, ".")
        .replace(/(^\.*)|(\.*)$/g, "");
    })
      .filter(function (e) {
        return e && "string" == typeof e;
      })
      .join(".");
  }),
  (window.TVwwwDom = []),
  (window.TVwww = function (e, t) {
    TVwwwDom.push(new TVwwwRender(e, t));
  }),
  (window.TVwww.load = function (e, n, i) {
    2 === arguments.length && ((i = n), (n = void 0));
    var o = new XMLHttpRequest();
    o.open("GET", e),
      (o.onreadystatechange = function (e) {
        if (4 === o.readyState)
          if (200 === o.status) {
            var t = JSON.parse(e.currentTarget.response);
            window.TVwww(t, n), i && i(null, !0);
          } else
            console.log("Error TVwww - XMLHttpRequest status:", o.status),
              console.log("Error TVwww - File config not found"),
              i && i(o.status);
        else i && i(o.readyState);
      }),
      o.send();
  });
