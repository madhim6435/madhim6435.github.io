(function () {
  'use strict';

  var data = null;

  try {
    data = SiteData.load();
  } catch (e) {
    data = null;
  }

  if (!data) return;

  /* ---- Override static page content ---- */
  overridePageContent();

  function overridePageContent() {
    // Hero section (index.html)
    var heroTag = document.querySelector('.hero-tag');
    var heroTitle = document.querySelector('.hero-title');
    var heroSubtitle = document.querySelector('.hero-subtitle');
    var ctaBtns = document.querySelectorAll('.hero-actions .btn');

    if (heroTag && data.site && data.site.tagline) {
      heroTag.textContent = data.site.tagline;
    }
    if (heroTitle && data.hero && data.hero.title) {
      heroTitle.innerHTML = data.hero.title;
    }
    if (heroSubtitle && data.hero && data.hero.subtitle) {
      heroSubtitle.textContent = data.hero.subtitle;
    }
    if (ctaBtns.length >= 2) {
      if (data.hero && data.hero.cta1) ctaBtns[0].textContent = data.hero.cta1;
      if (data.hero && data.hero.cta1Link) ctaBtns[0].setAttribute('href', data.hero.cta1Link);
      if (data.hero && data.hero.cta2) ctaBtns[1].textContent = data.hero.cta2;
      if (data.hero && data.hero.cta2Link) ctaBtns[1].setAttribute('href', data.hero.cta2Link);
    }

    // CTA section
    var ctaTitle = document.querySelector('.cta-title');
    var ctaSubtitle = document.querySelector('.cta-subtitle');
    if (ctaTitle && data.hero && data.hero.cta1) {
      ctaTitle.textContent = 'רוצים לעבוד יחד?';
    }
    if (ctaSubtitle && data.hero && data.hero.subtitle) {
      ctaSubtitle.textContent = 'כל פרויקט מתחיל בשיחה. בואו נגלה איך אנחנו יכולים לעזור למותג שלכם לזרוח.';
    }

    // About page
    var aboutTitle = document.querySelector('.about-title');
    var aboutParagraphs = document.querySelectorAll('.about-text p');
    var aboutBio = document.querySelector('.about-bio p');
    var toolItems = document.querySelectorAll('.tool-item');

    if (aboutTitle && data.about && data.about.title) {
      aboutTitle.innerHTML = data.about.title;
    }
    if (aboutParagraphs.length && data.about && data.about.paragraphs) {
      data.about.paragraphs.forEach(function (text, i) {
        if (aboutParagraphs[i]) aboutParagraphs[i].textContent = text;
      });
    }
    if (aboutBio && data.about && data.about.bio) {
      aboutBio.textContent = data.about.bio;
    }
    if (toolItems.length && data.about && data.about.tools) {
      data.about.tools.forEach(function (tool, i) {
        if (toolItems[i]) {
          var icon = toolItems[i].querySelector('.tool-icon');
          if (icon) icon.textContent = tool.icon;
          var textNode = toolItems[i].childNodes[2];
          if (textNode) textNode.textContent = ' ' + tool.name;
          else toolItems[i].innerHTML = '<div class="tool-icon">' + tool.icon + '</div> ' + tool.name;
        }
      });
    }

    // Services page
    var servicesIntro = document.querySelector('.services-intro p');
    var processSteps = document.querySelectorAll('.process-step');
    var clientTitle = document.querySelector('.client-section h2');
    var clientDesc = document.querySelector('.client-section p');

    if (servicesIntro && data.services && data.services.intro) {
      servicesIntro.textContent = data.services.intro;
    }
    if (processSteps.length && data.services && data.services.process) {
      data.services.process.forEach(function (step, i) {
        if (processSteps[i]) {
          var num = processSteps[i].querySelector('.step-number');
          var title = processSteps[i].querySelector('h3');
          var desc = processSteps[i].querySelector('p');
          if (num) num.textContent = step.number;
          if (title) title.textContent = step.title;
          if (desc) desc.textContent = step.description;
        }
      });
    }
    if (clientTitle && data.services && data.services.targetTitle) {
      clientTitle.textContent = data.services.targetTitle;
    }
    if (clientDesc && data.services && data.services.targetDescription) {
      clientDesc.textContent = data.services.targetDescription;
    }

    // Contact page
    var contactHeading = document.querySelector('.contact-info-section h1');
    var contactDesc = document.querySelector('.contact-info-section > p');
    var detailValues = document.querySelectorAll('.detail-value');
    var socialLinks = document.querySelectorAll('.social-link');

    if (contactHeading && data.contact && data.contact.heading) {
      contactHeading.textContent = data.contact.heading;
    }
    if (contactDesc && data.contact && data.contact.description) {
      contactDesc.textContent = data.contact.description;
    }
    if (detailValues.length >= 3 && data.contact) {
      if (data.contact.email) detailValues[0].textContent = data.contact.email;
      if (data.contact.phone) detailValues[1].textContent = data.contact.phone;
      if (data.contact.location) detailValues[2].textContent = data.contact.location;
    }
    if (socialLinks.length && data.contact && data.contact.social) {
      data.contact.social.forEach(function (s, i) {
        if (socialLinks[i]) {
          socialLinks[i].textContent = s.label;
          socialLinks[i].setAttribute('href', s.url);
          if (s.name) socialLinks[i].setAttribute('title', s.name);
        }
      });
    }

    // Form labels
    var formLabels = document.querySelectorAll('.form-group label');
    if (formLabels.length >= 3 && data.contact && data.contact.formLabels) {
      if (data.contact.formLabels.name) formLabels[0].textContent = data.contact.formLabels.name;
      if (data.contact.formLabels.email) formLabels[1].textContent = data.contact.formLabels.email;
      if (data.contact.formLabels.message) formLabels[2].textContent = data.contact.formLabels.message;
    }
    var submitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (submitBtn && data.contact && data.contact.formLabels && data.contact.formLabels.submit) {
      submitBtn.textContent = data.contact.formLabels.submit;
    }

    // Footer
    var footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright && data.footer && data.footer.copyright) {
      footerCopyright.textContent = '\u00a9 ' + new Date().getFullYear() + ' ' + data.footer.copyright;
    }

    // Logo
    var logo = document.querySelector('.logo');
    if (logo && data.site && data.site.name) {
      logo.innerHTML = data.site.name + '<span>.</span>';
    }

    // Site title tag
    if (data.site && data.site.name) {
      document.title = document.title.replace(/^[\u05D0-\u05EA\s]+/, data.site.name);
    }

    // Page-specific section titles
    var sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length && data.site && data.site.tagline) {
      // Only update on index page
      if (document.querySelector('.hero')) {
        // featured projects section title stays as "פרויקטים נבחרים"
      }
    }
  }

  // Rebuild projects from data
  function rebuildProjectsGrid() {
    var grid = document.getElementById('worksGrid');
    if (!grid || !data.projects) return;

    var projects = data.projects || [];
    grid.innerHTML = '';

    var categoryMap = data.categories || {};

    projects.forEach(function (proj) {
      var a = document.createElement('a');
      a.href = 'case-study.html?project=' + proj.id;
      a.className = 'work-card';
      a.setAttribute('data-category', proj.category);

      var imgHtml = proj.image
        ? '<img src="' + proj.image + '" alt="' + (proj.title || '') + '">'
        : '[תמונה]';

      a.innerHTML =
        '<div class="work-card-image">' + imgHtml + '</div>' +
        '<div class="work-card-overlay">' +
          '<div class="category">' + (proj.tag || categoryMap[proj.category] || '') + '</div>' +
          '<div class="title">' + (proj.title || '') + '</div>' +
        '</div>';

      grid.appendChild(a);
    });

    // Rebuild filter bar dynamically
    var filterBar = document.getElementById('filterBar');
    if (filterBar) {
      var cats = data.categories || [];
      filterBar.innerHTML = '<button class="filter-btn active" data-filter="all">הכל</button>';
      cats.forEach(function (cat) {
        filterBar.innerHTML += '<button class="filter-btn" data-filter="' + cat.key + '">' + cat.label + '</button>';
      });

      var filterBtns = filterBar.querySelectorAll('.filter-btn');
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');

          var filter = btn.getAttribute('data-filter');
          document.querySelectorAll('.work-card').forEach(function (card) {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              card.style.display = '';
              card.style.opacity = '0';
              setTimeout(function () { card.style.opacity = '1'; }, 50);
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  }

  function rebuildFeaturedProjects() {
    var grid = document.querySelector('.projects-grid');
    if (!grid || !data.projects) return;

    var featured = data.projects.slice(0, 4);
    grid.innerHTML = '';

    featured.forEach(function (proj) {
      var a = document.createElement('a');
      a.href = 'case-study.html?project=' + proj.id;
      a.className = 'project-card fade-in';

      var imgHtml = proj.image
        ? '<img src="' + proj.image + '" alt="' + (proj.title || '') + '">'
        : '<div class="placeholder">[תמונה]</div>';

      a.innerHTML =
        '<div class="project-card-image">' + imgHtml + '</div>' +
        '<div class="project-card-info">' +
          '<div class="project-card-category">' + (proj.tag || '') + '</div>' +
          '<h3 class="project-card-title">' + (proj.title || '') + '</h3>' +
          '<p class="project-card-description">' + (proj.description || '') + '</p>' +
        '</div>';

      grid.appendChild(a);
    });
  }

  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Filter functionality (works page)
  if (document.getElementById('worksGrid')) {
    rebuildProjectsGrid();
  }

  // Featured projects (index page)
  if (document.querySelector('.projects-grid')) {
    rebuildFeaturedProjects();
  }

  // Case study data loader
  var urlParams = new URLSearchParams(window.location.search);
  var projectId = urlParams.get('project') || '1';

  var caseTag = document.getElementById('caseTag');
  var caseTitle = document.getElementById('caseTitle');
  var caseClient = document.getElementById('caseClient');
  var caseService = document.getElementById('caseService');
  var caseYear = document.getElementById('caseYear');
  var caseChallenge = document.getElementById('caseChallenge');
  var caseSolution = document.getElementById('caseSolution');
  var caseResult = document.getElementById('caseResult');
  var caseResultsContainer = document.querySelector('.case-results');

  if (caseTag && data.projects) {
    var projectData = null;
    var pid = parseInt(projectId);
    data.projects.forEach(function (p) {
      if (p.id === pid) projectData = p;
    });

    if (projectData) {
      caseTag.textContent = projectData.tag || '';
      caseTitle.textContent = projectData.title || '';
      caseClient.textContent = projectData.client || '';
      caseService.textContent = projectData.service || '';
      caseYear.textContent = projectData.year || '';
      caseChallenge.textContent = projectData.challenge || '';
      caseSolution.textContent = projectData.solution || '';
      caseResult.textContent = projectData.result || '';

      var globalCaseStudy = data.caseStudy || {};
      var hChallenge = document.getElementById('caseHeadingChallenge');
      var hSolution = document.getElementById('caseHeadingSolution');
      var hResult = document.getElementById('caseHeadingResult');
      if (hChallenge) hChallenge.textContent = projectData.challengeHeading || globalCaseStudy.challengeHeading || 'האתגר';
      if (hSolution) hSolution.textContent = projectData.solutionHeading || globalCaseStudy.solutionHeading || 'הפתרון';
      if (hResult) hResult.textContent = projectData.resultHeading || globalCaseStudy.resultHeading || 'התוצאה';

      var caseImage = document.getElementById('caseMainImage');
      if (caseImage) {
        if (projectData.image) {
          caseImage.innerHTML = '<img src="' + projectData.image + '" alt="' + (projectData.title || '') + '">';
        } else {
          caseImage.textContent = '[תמונה ראשית]';
        }
      }

      document.title = (projectData.title || '') + ' - שמשון';
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'מקרה בוחן: ' + (projectData.title || '') + ' - סטודיו שמשון');

      // Render results grid
      if (caseResultsContainer && projectData.results) {
        caseResultsContainer.innerHTML = '';
        projectData.results.forEach(function (r) {
          var div = document.createElement('div');
          div.className = 'case-result-item';
          div.innerHTML = '<span class="number">' + (r.number || '') + '</span><span class="label">' + (r.label || '') + '</span>';
          caseResultsContainer.appendChild(div);
        });
      }

      var nextLink = document.querySelector('.case-nav a:last-child');
      if (nextLink) {
        var nextId = pid + 1;
        var hasNext = data.projects.some(function (p) { return p.id === nextId; });
        if (hasNext) {
          nextLink.setAttribute('href', 'case-study.html?project=' + nextId);
          nextLink.textContent = 'הפרויקט הבא \u2192';
        } else {
          nextLink.setAttribute('href', 'works.html');
          nextLink.textContent = '\u2190 חזרה לתיק העבודות';
        }
      }

      // Also update the project name in the breadcrumb/reference
      var caseMetaItems = document.querySelectorAll('.case-meta-item span');
      if (caseMetaItems.length >= 3) {
        caseMetaItems[0].textContent = projectData.client || '';
        caseMetaItems[1].textContent = projectData.service || '';
        caseMetaItems[2].textContent = projectData.year || '';
      }
    }
  }

  // Intersection Observer for fade-in animations
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Contact form handling
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      if (!btn) return;
      var originalText = btn.textContent;
      btn.textContent = data && data.contact && data.contact.formLabels && data.contact.formLabels.submit
        ? 'תודה!' : 'תודה!';
      btn.style.pointerEvents = 'none';
      setTimeout(function () {
        contactForm.reset();
        btn.textContent = originalText;
        btn.style.pointerEvents = '';
      }, 2000);
    });
  }

})();
