(function () {
  // JS //
  var ww = window.innerWidth,
    wh = window.innerHeight,
    currentST = 0,
    targetST = 0,
    up = false;

  let _events = {},
    _scrollEvents = [],
    _startEvents = [];

  const addScroll = (func) => {
    _scrollEvents.push({ func: func });
  }
  const removeAllScrollEvents = () => {
    _scrollEvents = [];
  }
  const addStart = (func) => {
    _startEvents.push({ func: func });
  }
  const removeAllStartEvents = () => {
    _startEvents = [];
  }
  function transformFunc(item, y) {
    var style = "translate(" + y + ")";
    item.style.transform = style;
    item.style.webkitTransform = style;
    item.style.mozTransform = style;
    item.style.msTransform = style;
    item.style.oTransform = style;
  }
  const fixedScrollFunction = function(event) {
    _startEvents.forEach(function(e) { e.func(); });
    
    targetST = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    targetST = parseFloat(targetST.toFixed(2));
    
    up = targetST<currentST;
    currentST = targetST;

    _scrollEvents.forEach(function(e) {
        e.func();
    });
  }

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
  const openModalBtn = document.querySelectorAll("[data-modal]");        
  if(openModalBtn) openModalBtn.forEach(button => {
      button.onclick = event => {
          const modalId = button.dataset.modal;
          document.getElementById(modalId).classList.toggle("is-visible");
      };
  });

  // Parallax
  var parallaxApp = {
    itens: {},
    init: ()=>{
      parallaxApp.itens = [];
      var containers = document.querySelectorAll('.parallaxContainer');
      containers.forEach((x,i)=>{
        parallaxApp.itens[i] = {
          y: x.offsetTop,
          h: x.clientHeight,
          ch: x.querySelectorAll('[data-fly]'),
        };
        
        addScroll((e)=>{
          parallaxApp.itens.forEach(d=>{
            if((currentST+wh > d.y) && (currentST<(d.y+d.h))){
              var yy = currentST-d.y;
              var hh = yy/d.y;
              d.ch.forEach(z=>{
                var f = '0,';
                if(z.dataset.flyx) f = (Number(z.dataset.flyx)*hh)+"%";
                f += ','+(Number(z.dataset.fly)*hh)+"%";
                transformFunc(z,f);
              });
            }
          });
        });
      });
      
    }
  }

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