/* Neel Chethan — portfolio interactions (shared across all pages) */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Projects showcase: tabs + scroll background (home only) ---- */
  var tabs = document.querySelectorAll('.proj-tab');
  var panels = document.querySelectorAll('.proj-panel');
  if (tabs.length && panels.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.querySelector('.proj-panel[data-idx="' + tab.dataset.idx + '"]');
        if (panel) panel.classList.add('active');
      });
    });
  }

  var projectsSection = document.getElementById('projects');
  if (projectsSection && projectsSection.classList.contains('projects-section') && 'IntersectionObserver' in window) {
    var bgObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        projectsSection.classList.toggle('in-view', e.isIntersecting);
      });
    }, { threshold: 0.08 });
    bgObs.observe(projectsSection);
  }
})();
