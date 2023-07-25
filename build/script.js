"use strict";

(function () {
  // JS //
  var ww = window.innerWidth,
    wh = window.innerHeight,
    particuladosSec,
    particuladosSecH,
    particuladosSecT,
    nuvensParallax,
    storySec,
    storySecH,
    storySecT,
    wst,
    tooltip,
    alltips;
  function positionTooltip(e) {
    var ml = tooltip.offsetWidth / 2;
    var mt = tooltip.offsetHeight / 2;
    var x = e.clientX;
    var y = e.clientY;
    var top = y - tooltip.offsetHeight - 60;
    var left = Math.max(ml + 30, Math.min(ww - (ml + 30), x));
    tooltip.dataset.position = "bottom";
    if (x < ml + 30) {
      left = x + ml + 30;
      top = Math.max(y - mt, Math.min(60));
      tooltip.dataset.position = "left";
    } else if (x > ww - (ml + 30)) {
      left = x - ml - 30;
      top = Math.max(y - mt, Math.min(60));
      tooltip.dataset.position = "right";
    } else if (top < 10) {
      top = y + 10;
      tooltip.dataset.position = "top";
    }
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
    tooltip.style.marginLeft = -ml + "px";
  }
  function startTips() {
    if (alltips) alltips.forEach(function (dt) {
      dt.addEventListener('mouseenter', function (e) {
        var o = this.dataset.tip;
        if (o) o = decodeURIComponent(o);
        tooltip.innerHTML = o;
        tooltip.dataset.color = this.dataset.tipcolor;
        tooltip.classList.add('active');
        positionTooltip(e);
      });
      dt.addEventListener('mousemove', function (e) {
        positionTooltip(e);
      });
      dt.addEventListener('mouseleave', function (e) {
        tooltip.classList.remove('active');
        positionTooltip(e);
      });
    });
  }
  function animatedParticulados() {
    if (wst >= particuladosSecT) {
      particuladosSec.classList.add("scrolled-on");
    } else {
      particuladosSec.classList.remove("scrolled-on");
    }
    if (wst >= particuladosSecT + wh) {
      particuladosSec.classList.add("step-02");
    } else {
      particuladosSec.classList.remove("step-02");
    }
    if (wst > particuladosSecT + wh * 2) {
      particuladosSec.classList.add("step-03");
    } else {
      particuladosSec.classList.remove("step-03");
    }
    if (wst > particuladosSecT + wh * 3) {
      particuladosSec.classList.add("step-04");
    } else {
      particuladosSec.classList.remove("step-04");
    }
    if (wst > particuladosSecT + wh * 4) {
      particuladosSec.classList.add("step-05");
    } else {
      particuladosSec.classList.remove("step-05");
    }
    if (wst > particuladosSecT + wh * 5) {
      particuladosSec.classList.add("scrolled-end");
    } else {
      particuladosSec.classList.remove("scrolled-end");
    }
  }
  function animatedStoryMap() {
    if (wst >= storySecT) {
      storySec.classList.add("scrolled-on");
    } else {
      storySec.classList.remove("scrolled-on");
    }
    if (wst >= storySecT + wh) {
      storySec.classList.add("step-02");
    } else {
      storySec.classList.remove("step-02");
    }
    if (wst > storySecT + wh * 2) {
      storySec.classList.add("step-03");
    } else {
      storySec.classList.remove("step-03");
    }
    if (wst > storySecT + wh * 3) {
      storySec.classList.add("step-04");
    } else {
      storySec.classList.remove("step-04");
    }
    if (wst > storySecT + wh * 4) {
      storySec.classList.add("scrolled-end");
    } else {
      storySec.classList.remove("scrolled-end");
    }
  } //----------------------------------------------------
  //Start pelo scroll

  function transformFunc(item, y) {
    var style = "translateY(" + y + ")";
    item.style.transform = style;
    item.style.webkitTransform = style;
    item.style.mozTransform = style;
    item.style.msTransform = style;
    item.style.oTransform = style;
  }
  ;
  function animaNuvens() {
    nuvensParallax.forEach(function (nt) {
      if (!nt.dataset.speed) nt.dataset.speed = 0.5 + Math.random() * 0.7;
      var img = nt;
      var imgParent = nt.parentNode.offsetTop < 100 ? nt.parentNode.parentNode : nt.parentNode;
      var speed = nt.dataset.speed;
      var imgY = imgParent.offsetTop;
      var parentH = imgParent.clientHeight;
      var winBottom = wst + wh;
      if (winBottom > imgY && wst < imgY + parentH) {
        var imgBottom = (winBottom - imgY) * speed;
        var imgTop = wh + parentH;
        var imgPercent = imgBottom / imgTop * 100 * speed;
      }
      transformFunc(img, imgPercent + "%");
    });
  }
  function frameFumaca() {
    wst = window.scrollY;
    if (particuladosSec) {
      animatedParticulados();
    }
    if (storySec) {
      animatedStoryMap();
    }
    if (nuvensParallax) {
      animaNuvens();
    }
  }
  function reloadFumaca() {
    particuladosSec = document.getElementById("inf-grph-caminhos-particulados");
    if (particuladosSec) {
      particuladosSecH = particuladosSec.clientHeight;
      particuladosSecT = particuladosSec.offsetTop;
    }
    storySec = document.getElementById("story-map");
    if (storySec) {
      storySecH = storySec.clientHeight;
      storySecT = storySec.offsetTop;
    }
    nuvensParallax = document.querySelectorAll('.rellax');
    if (nuvensParallax.length) {
      animaNuvens();
    }
    frameFumaca();
    tooltip = document.querySelector(".custom-tooltip");
    alltips = document.querySelectorAll("[data-tip]");
    startTips();
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

  var openModalBtn = document.querySelectorAll("[data-modal]");
  if (openModalBtn) openModalBtn.forEach(function (button) {
    button.onclick = function (event) {
      var modalId = button.dataset.modal;
      document.getElementById(modalId).classList.toggle("is-visible");
    };
  });
  window.addEventListener("scroll", frameFumaca);
  document.addEventListener("DOMContentLoaded", reloadFumaca);
  window.addEventListener('resize', reloadFumaca, true);
  reloadFumaca();
})();