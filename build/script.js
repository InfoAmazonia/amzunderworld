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

  // modal
  var openModalBtn = document.querySelectorAll("[data-modal]");
  if (openModalBtn) openModalBtn.forEach(function (button) {
    button.onclick = function (event) {
      var modalId = button.dataset.modal;
      document.getElementById(modalId).classList.toggle("is-visible");
    };
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
  var linksApp = {
    init: function init() {
      var h = 'https://infoamazonia.org/';
      var links = [['n1', '2023-08-03T10:00:00.00Z', '2023/08/03/welcome-to-the-amazon-underworld'], ['n2', '2023-08-06T10:00:00.00Z', '2023/08/06/gold-spurs-crime-corruption-on-brazil-colombia-border'], ['n3', '2023-08-10T10:00:00.00Z', '2023/08/10/armed-groups-threaten-indigenous-lands-in-southern-venezuela'], ['n4', '2023-08-13T10:00:00.00Z', '2023/08/13/the-poorest-narcos-in-the-drug-trafficking-chain'], ['n5', '2023-08-15T10:00:00.00Z', '2023/08/15/colombian-drug-runners-turn-to-shamans-for-protection'], ['n6', '2023-08-17T10:00:00.00Z', '2023/08/17/brazilian-drug-gang-takes-root-in-peruvian-amazon'], ['n7', '2023-08-20T10:00:00.00Z', '2023/08/20/in-venezuela-colombian-guerrillas-recruit-indigenous-youth'], ['n8', '2023-08-22T10:00:00.00Z', '2023/08/22/for-young-venezuelan-migrants-in-brazil-drugs-gold-and-early-death'], ['n9', '2023-08-24T10:00:00.00Z', '2023/08/24/drug-gangs-threaten-communities-in-amazon-cocaine-corridor']];
      links.forEach(function (l) {
        var c = document.querySelectorAll('.' + l[0]);
        if (c.length) c.forEach(function (cc) {
          if (linksApp.comparaData(l[1])) {
            cc.classList.remove('disabled');
            cc.href = h + (lang != 'pt' ? lang + '/' : '') + l[2];
            cc.target = "_blank";
          }
        });
      });
    },
    comparaData: function comparaData(d) {
      var currentDate = new Date();
      var currentUtcDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds()));
      var providedDate = new Date(d);
      return providedDate <= currentUtcDate;
    }
  };

  // Start
  function start() {
    wh = window.innerHeight;
    ww = window.innerWidth;
    removeAllScrollEvents();
    removeAllStartEvents();
    parallaxApp.init();
    linksApp.init();
    fixedScrollFunction();
  }
  window.addEventListener("scroll", fixedScrollFunction);
  document.addEventListener("DOMContentLoaded", start);
  window.addEventListener('resize', start, true);
  start();
})();