"use strict";

(function () {
  // JS //
  var ww = window.innerWidth,
    wh = window.innerHeight,
    currentST = 0,
    targetST = 0,
    up = false;
  var _events = {},
    _scrollEvents = [],
    _startEvents = [];
  var addScroll = function addScroll(func) {
    _scrollEvents.push({
      func: func
    });
  };
  var removeAllScrollEvents = function removeAllScrollEvents() {
    _scrollEvents = [];
  };
  var addStart = function addStart(func) {
    _startEvents.push({
      func: func
    });
  };
  var removeAllStartEvents = function removeAllStartEvents() {
    _startEvents = [];
  };
  function transformFunc(item, y) {
    var style = "translate(" + y + ")";
    item.style.transform = style;
    item.style.webkitTransform = style;
    item.style.mozTransform = style;
    item.style.msTransform = style;
    item.style.oTransform = style;
  }
  var fixedScrollFunction = function fixedScrollFunction(event) {
    _startEvents.forEach(function (e) {
      e.func();
    });
    targetST = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    targetST = parseFloat(targetST.toFixed(2));
    up = targetST < currentST;
    currentST = targetST;
    _scrollEvents.forEach(function (e) {
      e.func();
    });
  };

  //tabs
  var tabWrapper = document.querySelectorAll(".tab-wrapper");
  if (tabWrapper.length) tabWrapper.forEach(function (tw) {
    var openTabBtn = tw.querySelectorAll("[data-tab]");
    var tabContent = tw.querySelectorAll(".tab-content");
    openTabBtn.forEach(function (button) {
      button.onclick = function (event) {
        tabContent.forEach(function (tab) {
          if (tab.classList.contains("is-visible")) {
            tab.classList.remove("is-visible");
          }
        });
        openTabBtn.forEach(function (btn) {
          if (btn.classList.contains("ativo")) {
            btn.classList.remove("ativo");
          }
        });
        button.classList.add("ativo");
        var tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add("is-visible");
      };
    });
  });

  // Parallax
  var parallaxApp = {
    itens: {},
    init: function init() {
      parallaxApp.itens = [];
      var containers = document.querySelectorAll('.parallaxContainer');
      containers.forEach(function (x, i) {
        parallaxApp.itens[i] = {
          y: x.offsetTop,
          h: x.clientHeight,
          ch: x.querySelectorAll('[data-fly]')
        };
        addScroll(function (e) {
          parallaxApp.itens.forEach(function (d) {
            if (currentST + wh > d.y && currentST < d.y + d.h) {
              var yy = currentST - d.y;
              var hh = yy / d.y;
              d.ch.forEach(function (z) {
                var f = '0,';
                if (z.dataset.flyx) f = Number(z.dataset.flyx) * hh + "%";
                f += ',' + Number(z.dataset.fly) * hh + "%";
                transformFunc(z, f);
              });
            }
          });
        });
      });
    }
  };

  // Start
  function start() {
    wh = window.innerHeight;
    ww = window.innerWidth;
    removeAllScrollEvents();
    removeAllStartEvents();
    parallaxApp.init();
    fixedScrollFunction();
  }
  window.addEventListener("scroll", fixedScrollFunction);
  document.addEventListener("DOMContentLoaded", start);
  window.addEventListener('resize', start, true);
  start();
})();