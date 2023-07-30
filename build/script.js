"use strict";

(function () {
  // JS //
  var ww = window.innerWidth,
    wh = window.innerHeight,
    currentST = 0,
    targetST = 0,
    up = false;
  var lang = document.documentElement.lang.substr(0, 2);
  var baseUrl = 'https://taprontodev.github.io/amzunderworld/';
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

  // Tradução
  var traducoes = {
    'Main presence': {
      pt: 'Principal presença',
      es: 'Principal presencia'
    },
    'Est. members': {
      pt: 'Membros est.',
      es: 'Miembros est.'
    },
    'Founded': {
      pt: 'Fundação',
      es: 'Fundación'
    },
    'Political/ideological stance': {
      pt: 'Posição política/ideológica',
      es: 'Postura política/ideológica'
    },
    'Acts of violence': {
      pt: 'Atos de violência',
      es: 'Actos de violencia'
    },
    'Main economies': {
      pt: 'Principais economias',
      es: 'Principales economías'
    }
  };
  var traduz = function traduz(p) {
    var c = traducoes[p];
    return c && c[lang] ? c[lang] : p;
  };
  var generalApp = {
    init: function init() {
      //BTN RESPONSIVO
      var btnHamburguer = document.querySelector('.btn-hamburguer');
      if (btnHamburguer) btnHamburguer.onclick = function (e) {
        btnHamburguer.classList.toggle('opened');
        btnHamburguer.setAttribute('aria-expanded', btnHamburguer.classList.contains('opened'));
        document.querySelector('.menu-responsivo').classList.toggle('show-menu', btnHamburguer.classList.contains('opened'));
      };
      var btnLang = document.querySelector('.btn-lang');
      if (btnLang) btnLang.onclick = function (e) {
        btnLang.classList.toggle('opened');
        document.querySelector('.lang-opt').classList.toggle('show-lang', btnLang.classList.contains('opened'));
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
    }
  };

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
      var links = [['n1', '2023-07-03T10:00:00.00Z', '2023/08/03/welcome-to-the-amazon-underworld'], ['n2', '2023-07-06T10:00:00.00Z', '2023/08/03/gold-spurs-crime-corruption-on-brazil-colombia-border'], ['n3', '2023-08-10T10:00:00.00Z', '2023/08/06/armed-groups-threaten-indigenous-lands-in-southern-venezuela'], ['n4', '2023-08-13T10:00:00.00Z', '2023/08/10/the-poorest-narcos-in-the-drug-trafficking-chain'], ['n5', '2023-08-15T10:00:00.00Z', '2023/08/15/colombian-drug-runners-turn-to-shamans-for-protection'], ['n6', '2023-08-17T10:00:00.00Z', '2023/08/17/brazilian-drug-gang-takes-root-in-peruvian-amazon'], ['n7', '2023-08-20T10:00:00.00Z', '2023/08/20/in-venezuela-colombian-guerrillas-recruit-indigenous-youth'], ['n8', '2023-08-22T10:00:00.00Z', '2023/08/22/for-young-venezuelan-migrants-in-brazil-drugs-gold-and-early-death'], ['n9', '2023-08-24T10:00:00.00Z', '2023/08/24/drug-gangs-threaten-communities-in-amazon-cocaine-corridor']];
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
  var groupsApp = {
    init: function init() {
      var groupsdiv = document.getElementById('groupsdiv');
      if (groupsdiv && groupsArms) {
        var btns = '';
        var tabs = '';
        groupsArms.forEach(function (d, i) {
          btns += "<button class=\"tag ".concat(i == 0 ? 'ativo' : '', "\" data-tab=\"").concat(d.id, "\">").concat(d.nome, "</button>");
          tabs += groupsApp.tab(d, i);
        });
        groupsdiv.innerHTML = "<div class=\"twocols tab-wrapper\"><div><div class=\"tags\">".concat(btns, "</div>").concat(tabs, "</div></div>");
      }
    },
    tab: function tab(d, i) {
      return "<div class=\"tab-content ".concat(i == 0 ? 'is-visible' : '', "\" id=\"").concat(d.id, "\">\n          <div>\n              <div class=\"title\">\n                  <span>").concat(d.nome, "</span>\n                  <img src=\"").concat(baseUrl, "/assets/img/story0-logo-").concat(d.id, ".png\">\n              </div>\n              <div class=\"linha\">\n                  <span class=\"item\">").concat(traduz('Main presence'), ":</span>\n                  <span class=\"value\">").concat(d.local, "</span>\n              </div>\n              <div class=\"linha\" style=\"flex-direction: row;\">\n                  <div class=\"coll\" style=\"margin-right:6rem;\">\n                      <span class=\"item\">").concat(traduz('Est. members'), ":</span>\n                      <span class=\"value\">").concat(d.membros, "</span>\n                  </div>\n                  <div class=\"coll\">\n                      <span class=\"item\">").concat(traduz('Founded'), ":</span>\n                      <span class=\"value\">").concat(d.fundacao, "</span>\n                  </div>\n              </div>\n              <div class=\"linha\">\n                  <span class=\"item\">").concat(traduz('Political/ideological stance'), ":</span>\n                  <span class=\"value\">").concat(d.ideologia, "</span>\n              </div>\n              <div class=\"linha\">\n                  <span class=\"item\">").concat(traduz('Acts of violence'), ":</span>\n                  <span class=\"value\">").concat(d.atos, "</span>\n              </div>\n              <div class=\"linha\">\n                  <span class=\"item\">").concat(traduz('Main economies'), ":</span>\n                  <span class=\"value\">").concat(d.economia, "</span>\n              </div>\n          </div>\n          <div class=\"map-col\">\n              <img src=\"").concat(baseUrl, "/assets/img/story0-mapa-").concat(d.id, ".png\">\n          </div>\n      </div>");
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
    groupsApp.init();
    generalApp.init();
    fixedScrollFunction();
  }
  window.addEventListener("scroll", fixedScrollFunction);
  document.addEventListener("DOMContentLoaded", start);
  window.addEventListener('resize', start, true);
  start();
})();