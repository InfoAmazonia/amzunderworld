(function () {
  // JS //
  var ww = window.innerWidth,
    wh = window.innerHeight,
    currentST = 0,
    targetST = 0,
    up = false;

  const lang = document.documentElement.lang.substr(0,2);
  const baseUrl = 'https://taprontodev.github.io/amzunderworld/';

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

  // Tradução
  let traducoes = {
    'Main presence':{pt:'Principal presença',es:'Principal presencia'},
    'Est. members':{pt:'Membros est.',es:'Miembros est.'},
    'Founded':{pt:'Fundação',es:'Fundación'},
    'Political/ideological stance':{pt:'Posição política/ideológica',es:'Postura política/ideológica'},
    'Acts of violence':{pt:'Atos de violência',es:'Actos de violencia'},
    'Main economies':{pt:'Principais economias',es:'Principales economías'},
  };
  const traduz = function(p){
    let c = traducoes[p];
    return c&&c[lang] ? c[lang] : p;
  }

  var generalApp = {
    init: ()=>{
      // Pros stickys
      var page = document.querySelector("#page");
      if(page) page.style.overflow='initial !important';

      //BTN RESPONSIVO
      let btnHamburguer = document.querySelector('.btn-hamburguer');
      
      if(btnHamburguer) btnHamburguer.onclick = (e) => {
        btnHamburguer.classList.toggle('opened');
        btnHamburguer.setAttribute('aria-expanded', btnHamburguer.classList.contains('opened'));
        document.querySelector('.menu-responsivo').classList.toggle('show-menu',btnHamburguer.classList.contains('opened'));
      };

      let btnLang = document.querySelector('.btn-lang');
      
      if(btnLang) btnLang.onclick = (e) => {
        btnLang.classList.toggle('opened');
        document.querySelector('.lang-opt').classList.toggle('show-lang',btnLang.classList.contains('opened'));
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
      const openModalBtn = document.querySelectorAll("[data-modal]");        
      if(openModalBtn) openModalBtn.forEach(button => {
          button.onclick = event => {
              const modalId = button.dataset.modal;
              document.getElementById(modalId).classList.toggle("is-visible");
          };
      });
    }
  };

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

  var scrollytellingApp = {
    itens: {},
    init: ()=>{
      scrollytellingApp.itens = [];
      var containers = document.querySelectorAll('.scrollytelling');
      if(containers.length)containers.forEach((x,i)=>{
        scrollytellingApp.itens[i] = {
          y: x.offsetTop,
          h: x.clientHeight,
          item: x,
          bgs: x.querySelectorAll('.bg'),
          stks: x.querySelector('.stks'),
          ch: x.querySelectorAll('.scrollytelling-inner'),
          cur: '1',
        };
        addScroll((e)=>{
          scrollytellingApp.itens.forEach(d=>{
            if((currentST+wh > d.y) && (currentST<(d.y+d.h))){
              var yy = currentST-d.y+(wh/2);
              var hh = Math.min(d.ch.length, Math.ceil(yy/d.h*d.ch.length)) - 1;
              if(d.ch[hh].dataset.scrl && d.ch[hh].dataset.scrl!=d.cur){
                d.cur = d.ch[hh].dataset.scrl;
                scrollytellingApp.changeBg(d);
              }
            }
          });
        });
        scrollytellingApp.changeBg(scrollytellingApp.itens[0]);
      });
    },
    changeBg: (d)=>{
      d.bgs.forEach(x=>{
        if(x.tagName == 'VIDEO') x.currentTime = 0;
        x.classList.toggle('active',x.dataset.scrl==d.cur);
      });
    }
  };

  var dragasApp = {
    d: false,
    init: ()=>{
      var dragasinfo = document.querySelector('#dragasinfo');
      if(dragasinfo){
        var f = dragasinfo.querySelector('.fundo');
        dragasApp.d = {
          y: dragasinfo.offsetTop,
          h: dragasinfo.clientHeight,
          f: f,
          s: f.clientWidth,
          item: dragasinfo
        };
        addScroll((e)=>{
          var d = dragasApp.d;
          if((currentST+wh > d.y) && (currentST<(d.y+d.h))){
            var yy = currentST-d.y;
            var hh = Math.max(0,Math.min(1,yy/(d.h-wh))) * (d.s-ww);
            transformFunc(d.f,-hh+'px');
          }
        });
      }
    }
  };

  var linksApp = {
    init:()=>{
      var h = 'https://infoamazonia.org/';
      var links = [
        ['n1','2023-07-03T10:00:00.00Z','2023/08/03/welcome-to-the-amazon-underworld'],
        ['n2','2023-07-06T10:00:00.00Z','2023/08/03/gold-spurs-crime-corruption-on-brazil-colombia-border'],
        ['n3','2023-08-10T10:00:00.00Z','2023/08/06/armed-groups-threaten-indigenous-lands-in-southern-venezuela'],
        ['n4','2023-08-13T10:00:00.00Z','2023/08/10/the-poorest-narcos-in-the-drug-trafficking-chain'],
        ['n5','2023-08-15T10:00:00.00Z','2023/08/15/colombian-drug-runners-turn-to-shamans-for-protection'],
        ['n6','2023-08-17T10:00:00.00Z','2023/08/17/brazilian-drug-gang-takes-root-in-peruvian-amazon'],
        ['n7','2023-08-20T10:00:00.00Z','2023/08/20/in-venezuela-colombian-guerrillas-recruit-indigenous-youth'],
        ['n8','2023-08-22T10:00:00.00Z','2023/08/22/for-young-venezuelan-migrants-in-brazil-drugs-gold-and-early-death'],
        ['n9','2023-08-24T10:00:00.00Z','2023/08/24/drug-gangs-threaten-communities-in-amazon-cocaine-corridor'],
      ];
      links.forEach(l=>{
        var c = document.querySelectorAll('.'+l[0]);
        if(c.length) c.forEach(cc=>{
          if(linksApp.comparaData(l[1])){
            cc.classList.remove('disabled');
            cc.href=h+(lang!='pt'?lang+'/':'')+l[2];
            cc.target="_blank";
          }
        })
      });

    },
    comparaData: (d)=>{
      const currentDate = new Date();
      const currentUtcDate = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate(),
          currentDate.getUTCHours(),
          currentDate.getUTCMinutes(),
          currentDate.getUTCSeconds()
        )
      );
      const providedDate = new Date(d);
      return providedDate <= currentUtcDate;
    }
  }

  var groupsApp = {
    init: ()=>{
      var groupsdiv = document.getElementById('groupsdiv');
      if(groupsdiv && groupsArms){
        var btns = '';
        var tabs = '';
        groupsArms.forEach((d,i)=>{
          btns += `<button class="tag ${i==0?'ativo':''}" data-tab="${d.id}">${d.nome}</button>`;
          tabs += groupsApp.tab(d,i);
        });
        groupsdiv.innerHTML = `<div class="twocols tab-wrapper"><div><div class="tags">${btns}</div>${tabs}</div></div>`;
      }
    },
    tab: (d,i)=>{
      return `<div class="tab-content ${i==0?'is-visible':''}" id="${d.id}">
          <div>
              <div class="title">
                  <span>${d.nome}</span>
                  <img src="${baseUrl}/assets/img/story0-logo-${d.id}.png">
              </div>
              <div class="linha">
                  <span class="item">${traduz('Main presence')}:</span>
                  <span class="value">${d.local}</span>
              </div>
              <div class="linha" style="flex-direction: row;">
                  <div class="coll" style="margin-right:6rem;">
                      <span class="item">${traduz('Est. members')}:</span>
                      <span class="value">${d.membros}</span>
                  </div>
                  <div class="coll">
                      <span class="item">${traduz('Founded')}:</span>
                      <span class="value">${d.fundacao}</span>
                  </div>
              </div>
              <div class="linha">
                  <span class="item">${traduz('Political/ideological stance')}:</span>
                  <span class="value">${d.ideologia}</span>
              </div>
              <div class="linha">
                  <span class="item">${traduz('Acts of violence')}:</span>
                  <span class="value">${d.atos}</span>
              </div>
              <div class="linha">
                  <span class="item">${traduz('Main economies')}:</span>
                  <span class="value">${d.economia}</span>
              </div>
          </div>
          <div class="map-col">
              <img src="${baseUrl}/assets/img/story0-mapa-${d.id}.png">
          </div>
      </div>`;
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
    scrollytellingApp.init();
    dragasApp.init();

    fixedScrollFunction();
  }
  window.addEventListener("scroll", fixedScrollFunction);
  document.addEventListener("DOMContentLoaded", start);
  window.addEventListener('resize', start, true);
  start();
})();

function topo(){
  window.scrollTo({top:0,behavior:'smooth'})
}