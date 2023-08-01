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


  const links = [
    {
      n:1,id:'n1',data:'2023-07-03T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/03/welcome-to-the-amazon-underworld',
      link_pt:'https://infoamazonia.org/2023/08/03/bem-vindo-ao-amazon-underworld/',
      link_es:'https://infoamazonia.org/es/2023/08/03/bienvenidos-a-amazon-underworld/',
      local_en:'Introduction',name_en:'Welcome to the Amazon Underworld',
      local_es:'Introducción',name_es:'Bienvenido al Amazon Underworld',
      local_pt:'Introdução',name_pt:'Bem-vindo ao Amazon Underworld',
    },
    {
      n:2,id:'n2',data:'2023-07-06T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/03/gold-spurs-crime-corruption-on-brazil-colombia-border/',
      link_pt:'https://infoamazonia.org/2023/08/03/ouro-estimula-crime-e-corrupcao-na-fronteira-brasil-colombia',
      link_es:'https://infoamazonia.org/es/2023/08/03/el-oro-estimula-el-crimen-y-la-corrupcion-en-la-frontera-entre-brasil-y-colombia',
      local_en:'Brazil + Colombia',name_en:'Dredges: Gold spurs crime & corruption on Brazil-Colombia border',
      local_es:'Brasil + colombia',name_es:'Dragas: El oro estimula el crimen y la corrupción en la frontera entre Brasil y Colombia',
      local_pt:'Brasil + colombia',name_pt:'Dragas: Ouro estimula crime e corrupção na fronteira Brasil-Colômbia',
    },
    {
      n:3,id:'n3',data:'2023-08-10T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/06/armed-groups-threaten-indigenous-lands-in-southern-venezuela',
      link_pt:'https://infoamazonia.org/en/2023/08/06/armed-groups-threaten-indigenous-lands-in-southern-venezuela',
      link_es:'https://infoamazonia.org/en/2023/08/06/armed-groups-threaten-indigenous-lands-in-southern-venezuela',
      local_en:'Brazil + venezuela',name_en:'Armed groups threaten Indigenous lands in southern Venezuela',
      local_es:'Brasil + venezuela',name_es:'Grupos armados amenazan tierras indígenas en el sur de Venezuela',
      local_pt:'Brasil + venezuela',name_pt:'Grupos armados ameaçam terras indígenas no sul da Venezuela',
    },
    {
      n:4,id:'n4',data:'2023-08-13T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/10/the-poorest-narcos-in-the-drug-trafficking-chain',
      link_pt:'https://infoamazonia.org/en/2023/08/10/the-poorest-narcos-in-the-drug-trafficking-chain',
      link_es:'https://infoamazonia.org/en/2023/08/10/the-poorest-narcos-in-the-drug-trafficking-chain',
      local_en:'Peru',name_en:'The poorest narcos in the drug-trafficking chain',
      local_es:'Peru',name_es:'Los narcos más pobres en la cadena del narcotráfico',
      local_pt:'Peru',name_pt:'Os narcotraficantes mais pobres da cadeia do tráfico de drogas',
    },
    {
      n:5,id:'n5',data:'2023-08-15T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/15/colombian-drug-runners-turn-to-shamans-for-protection',
      link_pt:'https://infoamazonia.org/en/2023/08/15/colombian-drug-runners-turn-to-shamans-for-protection',
      link_es:'https://infoamazonia.org/en/2023/08/15/colombian-drug-runners-turn-to-shamans-for-protection',
      local_en:'colombia',name_en:'Colombian drug runners turn to shamans for protection',
      local_es:'colombia',name_es:'Narcotraficantes colombianos recurren a chamanes en busca de protección',
      local_pt:'colombia',name_pt:'Traficantes colombianos recorrem a xamãs em busca de proteção',
    },
    {
      n:6,id:'n6',data:'2023-08-17T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/17/brazilian-drug-gang-takes-root-in-peruvian-amazon',
      link_pt:'https://infoamazonia.org/en/2023/08/17/brazilian-drug-gang-takes-root-in-peruvian-amazon',
      link_es:'https://infoamazonia.org/en/2023/08/17/brazilian-drug-gang-takes-root-in-peruvian-amazon',
      local_en:'Brazil + Peru',name_en:'Brazilian drug gang takes root in Peruvian Amazon',
      local_es:'Brasil + Peru',name_es:'Banda de narcotraficantes brasileña se arraiga en la Amazonía peruana',
      local_pt:'Brasil + Peru',name_pt:'Quadrilha brasileira de narcotraficantes cria raízes na Amazônia peruana',
    },
    {
      n:7,id:'n7',data:'2023-08-20T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/20/in-venezuela-colombian-guerrillas-recruit-indigenous-youth',
      link_pt:'https://infoamazonia.org/en/2023/08/20/in-venezuela-colombian-guerrillas-recruit-indigenous-youth',
      link_es:'https://infoamazonia.org/en/2023/08/20/in-venezuela-colombian-guerrillas-recruit-indigenous-youth',
      local_en:'colombia + venezuela',name_en:'In Venezuela, Colombian guerrillas recruit Indigenous youth',
      local_es:'colombia + venezuela',name_es:'Guerrillas colombianas reclutan jóvenes indígenas en Venezuela',
      local_pt:'colombia + venezuela',name_pt:'Na Venezuela, guerrilheiros colombianos recrutam jovens indígenas',
    },
    {
      n:8,id:'n8',data:'2023-08-22T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/22/for-young-venezuelan-migrants-in-brazil-drugs-gold-and-early-death',
      link_pt:'https://infoamazonia.org/en/2023/08/22/for-young-venezuelan-migrants-in-brazil-drugs-gold-and-early-death',
      link_es:'https://infoamazonia.org/en/2023/08/22/for-young-venezuelan-migrants-in-brazil-drugs-gold-and-early-death',
      local_en:'Brazil + venezuela',name_en:'For young Venezuelan migrants in Brazil, drugs, gold and early death',
      local_es:'Brasil + venezuela',name_es:'Drogas, oro y muerte temprana para jóvenes migrantes venezolanos en Brasil',
      local_pt:'Brasil + venezuela',name_pt:'Para os jovens migrantes venezuelanos no Brasil, drogas, ouro e morte prematura',
    },
    {
      n:9,id:'n9',data:'2023-08-24T10:00:00.00Z',
      link_en:'https://infoamazonia.org/en/2023/08/24/drug-gangs-threaten-communities-in-amazon-cocaine-corridor',
      link_pt:'https://infoamazonia.org/en/2023/08/24/drug-gangs-threaten-communities-in-amazon-cocaine-corridor',
      link_es:'https://infoamazonia.org/en/2023/08/24/drug-gangs-threaten-communities-in-amazon-cocaine-corridor',
      local_en:'Brazil + colombia',name_en:'Drug gangs threaten communities in Amazon ‘cocaine corridor’',
      local_es:'Brasil + colombia',name_es:'Bandas de narcotraficantes amenazan a las comunidades en el ‘corredor de cocaína’ de la Amazonía',
      local_pt:'Brasil + colombia',name_pt:'Gangues de narcotraficantes ameaçam comunidades quilombolas no ‘corredor da cocaína’ da Amazônia',
    },
  ];

  // FUnctions
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
    'Political/ideological stance':{pt:'Posición política e ideológica',es:'Posição político-ideológica'},
    'Acts of violence':{pt:'Atos de violência',es:'Actos de violencia'},
    'Main economies':{pt:'Principais atividades',es:'Principales actividades'},
    'read more':{pt:'ler mais',es:'ler mais'},
    'soon':{pt:'em breve',es:'en breve'},
    'BACK TO TOP':{pt:'VOLTAR AO TOPO',es:'VOLVER AL PRINCIPIO'},
    'HOMEPAGE':{pt:'PÁGINA INICIAL',es:'PÁGINA INICIAL'},
    'EXPLORE THE STORIES':{pt:'EXPLORE AS HISTÓRIAS',es:'EXPLORA LAS HISTORIAS'},
    'explore_txt':{
      en:`This route begins with an overview of the Amazon Underworld, then takes you to areas of illegal gold mining and cultivation of drug crops, following trafficking routes that cut through the heart of the jungle. Criminals take advantage of the region’s porous borders, countless rivers and myriad clandestin e airstrips to transport drugs and gold that feed insatiable global markets.`,
      pt:'Esta rota começa com uma visão geral do submundo da Amazônia, em seguida, leva você a áreas de mineração ilegal de ouro e cultivo de drogas, seguindo rotas de tráfico que cortam o coração da selva. Os criminosos se aproveitam das fronteiras porosas da região, dos inúmeros rios e das incontáveis pistas de pouso clandestinas para transportar drogas e ouro que alimentam os insaciáveis mercados globais.',
      es:'Esta ruta comienza con un panorama general del submundo amazónico, luego te lleva a zonas de extracción ilegal de oro, de cultivos ilícitos y procesamiento de drogas, y sigue por rutas de tráfico que atraviesan el corazón de la selva. El crimen organizado aprovecha las porosas fronteras de la región, los innumerables ríos y las múltiples pistas de aterrizaje clandestinas para transportar drogas y oro que alimentan los insaciables mercados internacionales.'
    },
    'READ MORE ABOUT THE AMAZON UNDERWORLD':{pt:'LEIA MAIS DE AMAZON UNDERWORLD',es:'LEER MÁS SOBRE AMAZON UNDERWORLD'},
    'CLICK HERE FOR ADDITIONAL STORIES':{pt:'CLIQUE AQUI PARA HISTÓRIAS ADICIONAIS',es:'HAZ CLIC AQUÍ PARA CONOCER OTRAS HISTORIAS'},
    'https://infoamazonia.org/en/tag/amazon-underworld-en/':{pt:'https://infoamazonia.org/tag/amazon-underworld/',es:'https://infoamazonia.org/es/tag/amazon-underworld-es/'},
    'moreunderworld':{
      en:'The stories on this platform provide a comprehensive overview of cross-border organized crime, but there’s more to the Amazon Underworld.',
      pt:'As reportagens nesta plataforma fornecem uma visão abrangente do crime organizado transfronteiriço, mas há mais em Amazon Underworld.',
      es:'Las historias que aparecen en esta plataforma muestran un amplio y completo panorama del crimen organizado transfronterizo, pero hay más en Amazon Underworld.',
    },
    'Explore the stories by clicking on the icons':{pt:'Explore as histórias clicando nos ícones',es:'Explora las historias haciendo clic en los iconos'},
    'start here':{pt:'Comece por aqui',es:'Empieza aquí'},
    'Suggested route':{pt:'Percurso sugerido',es:'Ruta sugerida'},
  };
  const traduz = function(p){
    let c = traducoes[p];
    return c&&c[lang] ? c[lang] : p;
  }
  const comparaData = (d)=>{
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
      if(openModalBtn.length) openModalBtn.forEach(button => {
          button.onclick = event => {
              const modalId = button.dataset.modal;
              document.getElementById(modalId).classList.toggle("is-visible");
              let any = document.querySelector('.modal.is-visible,.modalbase.is-visible');
              document.body.classList.toggle('scrollblocked',any);
          };
      });
      const closeModalBtn = document.querySelectorAll(".modalclose");        
      if(closeModalBtn.length) closeModalBtn.forEach(b => {
        b.onclick = event => {
            const modal = b.closest('.modal,.modalbase');
            modal.classList.toggle("is-visible");
            let any = document.querySelector('.modal.is-visible,.modalbase.is-visible');
            document.body.classList.toggle('scrollblocked',any);
        };
      });

      const storiesDiv = document.querySelector("#storiesdiv");
      if(storiesDiv) storiesDiv.addEventListener("wheel", (evt) => {
          const maxScrollLeft = storiesDiv.scrollWidth - storiesDiv.clientWidth;
          const isAtMaxHorizontalScroll = storiesDiv.scrollLeft === maxScrollLeft;
          if ( (isAtMaxHorizontalScroll && evt.deltaY>0) || (storiesDiv.scrollLeft==0&&evt.deltaY<0) ) {
             return;
          }
          evt.preventDefault();
          storiesDiv.scrollLeft += evt.deltaY;
      });
    }
  };

  var conteudoApp = {
    init: ()=>{
      var a = document.getElementById('amzundfooter');
      if(a)a.innerHTML = `<div style="padding:1rem 0 4rem;">
          <a class="wp-block-button__link" onclick="topo()">${traduz('BACK TO TOP')}</a>
          <a class="wp-block-button__link" href="${baseUrl+(lang!='en'?lang+'.html':'')}">${traduz('HOMEPAGE')}</a>
      </div>
      <img src="${baseUrl}assets/img/icone-explore.png"/>
      <h1>${traduz('EXPLORE THE STORIES')}</h1>
      <p>${traduz('explore_txt')}</p>
      <section class="full" id="storiesdiv"><div class="cards" id="cardsdiv"></div></section>

      <div class="wp-block-cover is-light bg-white"><div class="wp-block-cover__inner-container">
          <img src="${baseUrl}assets/img/icone-todas.png"/>
          <h1>${traduz('READ MORE ABOUT THE AMAZON UNDERWORLD')}</h1>
          <p>${traduz('moreunderworld')}</p>
          <a class="wp-block-button__link" href="${traduz('https://infoamazonia.org/en/tag/amazon-underworld-en/')}">${traduz('CLICK HERE FOR ADDITIONAL STORIES')}</a>
      </div></div>`;
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

  var mapaLinks = {
    init: ()=>{
      var it = document.querySelector('#mapalinks');
      if(it){
        var a = '';
        var b = '';
        links.forEach(l=>{

          a+=`<a class="marcador ${l.id} disabled" numero="${l.n}" href="javascript:void(0)"></a>`;
          b+=`<a class="conteudo ${l.id} disabled" href="javascript:void(0)">
            <div class="titulo">${l['local_'+lang]}</div>
            <div class="texto">${l['name_'+lang]}</div>
            <span>${traduz('read more')} &rarr;</span>
          </a>`;
        });

        b+=`<div class="explorer">${traduz('Explore the stories by clicking on the icons')}</div>
        <div class="start">${traduz('start here')}</div>
        <div class="route">${traduz('Suggested route')}</div>`;

        it.innerHTML = a+''+b;
      }

    }
  };

  var cardsApp = {
    init:()=>{
      var cardsdiv = document.getElementById('cardsdiv');
      if(cardsdiv){
        var a = '';
        links.forEach(l=>{

        a+=`<a class="card ${l.id} disabled" href="javascript:void(0)">
          <div class="image"><img src="${baseUrl}/assets/img/card_${l.n}.jpg"></div>
          <div class="infos">
            <div class="local">${l['local_'+lang]}</div>
            <div class="title">${l['name_'+lang]}</div>
            ${comparaData(l.data)?`<button class="btn">${traduz('read more')} <span class="arrow"></span></button>`:`<span class="breve">${traduz('soon')}</span>`}
          </div>
        </a>`;
        });
        cardsdiv.innerHTML = a;
      }
    }
  };

  var linksApp = {
    init:()=>{
      links.forEach(l=>{
        var c = document.querySelectorAll('.'+l.id);
        if(c.length) c.forEach(cc=>{
          if(comparaData(l.data)){
            cc.classList.remove('disabled');
            cc.href=l['link_'+lang];
          }
        })
      });

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
              <div class="linha">
                  <span class="item">${traduz('Founded')}:</span>
                  <span class="value">${d.fundacao}</span>
              </div>
              <div class="linha">
                  <span class="item">${traduz('Political/ideological stance')}:</span>
                  <span class="value">${d.ideologia}</span>
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
    
    conteudoApp.init();
    parallaxApp.init();
    mapaLinks.init();
    cardsApp.init();
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