(function () {
  'use strict';

  var ADMIN_PASSWORD = 'admin123';
  var data = null;

  var editingProjectId = null;

  function init() {
    setupLogin();
    setupNavigation();
    setupSaveButtons();
    setupProjectManagement();
    setupSettings();
    setupDangerZone();

    document.getElementById('saveAllBtn').addEventListener('click', function () {
      collectAllData();
      if (saveData()) {
        showToast('הכל נשמר בהצלחה!', 'success');
      }
    });
  }

  function loadData() {
    data = SiteData.load();
  }

  function collectAllData() {
    collectHero();
    collectAbout();
    collectServices();
    collectContact();
    collectSettings();
  }

  function saveData() {
    return SiteData.save(data);
  }

  function showToast(message, type) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type + ' show';
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  }

  /* ---------- Login ---------- */
  function setupLogin() {
    var overlay = document.getElementById('loginOverlay');
    var passwordInput = document.getElementById('passwordInput');
    var loginBtn = document.getElementById('loginBtn');
    var errorEl = document.getElementById('loginError');

    if (sessionStorage.getItem('shimshon_admin')) {
      overlay.classList.add('hidden');
      loadData();
      renderAll();
      return;
    }

    function attemptLogin() {
      if (passwordInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('shimshon_admin', '1');
        overlay.classList.add('hidden');
        loadData();
        renderAll();
      } else {
        errorEl.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
      }
    }

    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') attemptLogin();
    });
    passwordInput.focus();
  }

  /* ---------- Navigation ---------- */
  function setupNavigation() {
    var links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        links.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');

        document.querySelectorAll('.admin-section').forEach(function (s) {
          s.classList.remove('active');
        });

        var section = link.getAttribute('data-section');
        var el = document.getElementById('section-' + section);
        if (el) el.classList.add('active');
      });
    });
  }

  /* ---------- Render helpers ---------- */
  function renderAll() {
    renderStats();
    renderHero();
    renderAbout();
    renderServices();
    renderContact();
    renderProjectsTable();
    renderSettings();
    populateCategorySelect();
  }

  function populateCategorySelect() {
    var select = document.getElementById('proj-category');
    if (!select) return;
    var cats = data.categories || [];
    select.innerHTML = '';
    cats.forEach(function (cat) {
      var opt = document.createElement('option');
      opt.value = cat.key;
      opt.textContent = cat.label;
      select.appendChild(opt);
    });
  }

  function getVal(path) {
    var parts = path.split('.');
    var val = data;
    for (var i = 0; i < parts.length; i++) {
      if (val && val[parts[i]] !== undefined) {
        val = val[parts[i]];
      } else {
        return '';
      }
    }
    return val !== null && val !== undefined ? val : '';
  }

  function setVal(path, value) {
    var parts = path.split('.');
    var obj = data;
    for (var i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]]) obj[parts[i]] = {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  }

  function populateForm(id, path) {
    var el = document.getElementById(id);
    if (el) el.value = getVal(path);
  }

  /* ---------- Stats ---------- */
  function renderStats() {
    var grid = document.getElementById('statsGrid');
    var projectCount = (data.projects || []).length;
    var categoryCount = new Set((data.projects || []).map(function (p) { return p.category; })).size;
    var toolCount = (data.about && data.about.tools ? data.about.tools.length : 0);

    grid.innerHTML =
      '<div class="stat-card"><div class="stat-number">' + projectCount + '</div><div class="stat-label">פרויקטים</div></div>' +
      '<div class="stat-card"><div class="stat-number">' + categoryCount + '</div><div class="stat-label">קטגוריות</div></div>' +
      '<div class="stat-card"><div class="stat-number">' + toolCount + '</div><div class="stat-label">כלים</div></div>';
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var heroData = data.hero || {};
    var siteData = data.site || {};
    document.getElementById('hero-tag').value = siteData.tagline || '';
    document.getElementById('hero-title').value = heroData.title || '';
    document.getElementById('hero-subtitle').value = heroData.subtitle || '';
    document.getElementById('hero-cta1').value = heroData.cta1 || '';
    document.getElementById('hero-cta1Link').value = heroData.cta1Link || '';
    document.getElementById('hero-cta2').value = heroData.cta2 || '';
    document.getElementById('hero-cta2Link').value = heroData.cta2Link || '';
  }

  function collectHero() {
    var siteData = data.site || {};
    siteData.tagline = document.getElementById('hero-tag').value;
    data.hero.title = document.getElementById('hero-title').value;
    data.hero.subtitle = document.getElementById('hero-subtitle').value;
    data.hero.cta1 = document.getElementById('hero-cta1').value;
    data.hero.cta1Link = document.getElementById('hero-cta1Link').value;
    data.hero.cta2 = document.getElementById('hero-cta2').value;
    data.hero.cta2Link = document.getElementById('hero-cta2Link').value;
  }

  /* ---------- About ---------- */
  function renderAbout() {
    var aboutData = data.about || {};
    document.getElementById('about-title').value = aboutData.title || '';
    document.getElementById('about-p1').value = (aboutData.paragraphs && aboutData.paragraphs[0]) || '';
    document.getElementById('about-p2').value = (aboutData.paragraphs && aboutData.paragraphs[1]) || '';
    document.getElementById('about-p3').value = (aboutData.paragraphs && aboutData.paragraphs[2]) || '';
    document.getElementById('about-bio').value = aboutData.bio || '';
    renderTools();
  }

  function collectAbout() {
    data.about.title = document.getElementById('about-title').value;
    data.about.paragraphs = [
      document.getElementById('about-p1').value,
      document.getElementById('about-p2').value,
      document.getElementById('about-p3').value
    ];
    data.about.bio = document.getElementById('about-bio').value;
    collectTools();
  }

  function renderTools() {
    var container = document.getElementById('toolsEditor');
    var tools = (data.about && data.about.tools) || [];
    container.innerHTML = '';
    tools.forEach(function (tool, i) {
      var div = document.createElement('div');
      div.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;align-items:center;';
      div.innerHTML =
        '<input type="text" class="tool-icon-input" value="' + escapeHtml(tool.icon) + '" placeholder="אייקון" style="width:60px;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:var(--admin-font);">' +
        '<input type="text" class="tool-name-input" value="' + escapeHtml(tool.name) + '" placeholder="שם הכלי" style="flex:1;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:var(--admin-font);">' +
        '<button class="btn btn-sm btn-danger remove-tool-btn" data-index="' + i + '">X</button>';
      container.appendChild(div);
    });

    container.querySelectorAll('.remove-tool-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        data.about.tools.splice(idx, 1);
        renderTools();
      });
    });
  }

  function collectTools() {
    var container = document.getElementById('toolsEditor');
    var inputs = container.querySelectorAll('.tool-icon-input, .tool-name-input');
    data.about.tools = [];
    for (var i = 0; i < inputs.length; i += 2) {
      if (i + 1 < inputs.length) {
        data.about.tools.push({
          icon: inputs[i].value,
          name: inputs[i + 1].value
        });
      }
    }
  }

  document.addEventListener('click', function (e) {
    if (e.target.id === 'addToolBtn') {
      if (!data.about.tools) data.about.tools = [];
      data.about.tools.push({ icon: 'New', name: 'כלי חדש' });
      renderTools();
    }
  });

  /* ---------- Services ---------- */
  function renderServices() {
    var servicesData = data.services || {};
    document.getElementById('services-intro').value = servicesData.intro || '';
    document.getElementById('services-targetTitle').value = servicesData.targetTitle || '';
    document.getElementById('services-targetDescription').value = servicesData.targetDescription || '';
    renderProcessSteps();
  }

  function collectServices() {
    data.services.intro = document.getElementById('services-intro').value;
    data.services.targetTitle = document.getElementById('services-targetTitle').value;
    data.services.targetDescription = document.getElementById('services-targetDescription').value;
    collectProcessSteps();
  }

  function renderProcessSteps() {
    var container = document.getElementById('processEditor');
    var steps = (data.services && data.services.process) || [];
    container.innerHTML = '';
    steps.forEach(function (step, i) {
      var div = document.createElement('div');
      div.style.cssText = 'border:1px solid var(--admin-border);border-radius:6px;padding:16px;margin-bottom:12px;';
      div.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
          '<strong>שלב ' + (i + 1) + '</strong>' +
          '<button class="btn btn-sm btn-danger remove-step-btn" data-index="' + i + '">הסר</button>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label>כותרת</label><input type="text" class="step-title-input" value="' + escapeHtml(step.title) + '"></div>' +
          '<div class="form-group"><label>תיאור</label><input type="text" class="step-desc-input" value="' + escapeHtml(step.description) + '"></div>' +
        '</div>';
      container.appendChild(div);
    });

    container.querySelectorAll('.remove-step-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        data.services.process.splice(idx, 1);
        renderProcessSteps();
      });
    });
  }

  function collectProcessSteps() {
    var container = document.getElementById('processEditor');
    var stepDivs = container.querySelectorAll('div[style]');
    data.services.process = [];
    container.querySelectorAll('.step-title-input, .step-desc-input').forEach(function (input, idx) {
      if (idx % 2 === 0) {
        data.services.process.push({
          number: Math.floor(idx / 2) + 1,
          title: input.value,
          description: input.parentElement.nextElementSibling ? input.parentElement.nextElementSibling.querySelector('input').value : ''
        });
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (e.target.id === 'addProcessBtn') {
      if (!data.services.process) data.services.process = [];
      data.services.process.push({ number: data.services.process.length + 1, title: 'שלב חדש', description: 'תיאור השלב' });
      renderProcessSteps();
    }
  });

  /* ---------- Contact ---------- */
  function renderContact() {
    var contactData = data.contact || {};
    document.getElementById('contact-heading').value = contactData.heading || '';
    document.getElementById('contact-description').value = contactData.description || '';
    document.getElementById('contact-email').value = contactData.email || '';
    document.getElementById('contact-phone').value = contactData.phone || '';
    document.getElementById('contact-location').value = contactData.location || '';
    if (contactData.formLabels) {
      document.getElementById('contact-formName').value = contactData.formLabels.name || '';
      document.getElementById('contact-formEmail').value = contactData.formLabels.email || '';
      document.getElementById('contact-formMessage').value = contactData.formLabels.message || '';
      document.getElementById('contact-formSubmit').value = contactData.formLabels.submit || '';
    }
    renderSocial();
  }

  function collectContact() {
    data.contact.heading = document.getElementById('contact-heading').value;
    data.contact.description = document.getElementById('contact-description').value;
    data.contact.email = document.getElementById('contact-email').value;
    data.contact.phone = document.getElementById('contact-phone').value;
    data.contact.location = document.getElementById('contact-location').value;
    if (!data.contact.formLabels) data.contact.formLabels = {};
    data.contact.formLabels.name = document.getElementById('contact-formName').value;
    data.contact.formLabels.email = document.getElementById('contact-formEmail').value;
    data.contact.formLabels.message = document.getElementById('contact-formMessage').value;
    data.contact.formLabels.submit = document.getElementById('contact-formSubmit').value;
    collectSocial();
  }

  function renderSocial() {
    var container = document.getElementById('socialEditor');
    var social = (data.contact && data.contact.social) || [];
    container.innerHTML = '';
    social.forEach(function (item, i) {
      var div = document.createElement('div');
      div.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;align-items:center;';
      div.innerHTML =
        '<input type="text" class="social-label-input" value="' + escapeHtml(item.label) + '" placeholder="תווית" style="width:50px;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:var(--admin-font);">' +
        '<input type="text" class="social-url-input" value="' + escapeHtml(item.url) + '" placeholder="URL" style="flex:1;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:var(--admin-font);">' +
        '<input type="text" class="social-name-input" value="' + escapeHtml(item.name || '') + '" placeholder="שם" style="width:100px;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:var(--admin-font);">' +
        '<button class="btn btn-sm btn-danger remove-social-btn" data-index="' + i + '">X</button>';
      container.appendChild(div);
    });

    container.querySelectorAll('.remove-social-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        data.contact.social.splice(idx, 1);
        renderSocial();
      });
    });
  }

  function collectSocial() {
    var container = document.getElementById('socialEditor');
    var labels = container.querySelectorAll('.social-label-input');
    var urls = container.querySelectorAll('.social-url-input');
    var names = container.querySelectorAll('.social-name-input');
    data.contact.social = [];
    for (var i = 0; i < labels.length; i++) {
      data.contact.social.push({
        label: labels[i].value,
        url: urls[i] ? urls[i].value : '',
        name: names[i] ? names[i].value : ''
      });
    }
  }

  document.addEventListener('click', function (e) {
    if (e.target.id === 'addSocialBtn') {
      if (!data.contact.social) data.contact.social = [];
      data.contact.social.push({ label: 'New', url: '#', name: 'רשת חדשה' });
      renderSocial();
    }
  });

  /* ---------- Projects ---------- */
  function renderProjectsTable() {
    var tbody = document.getElementById('projectsTableBody');
    var projects = data.projects || [];
    tbody.innerHTML = '';
    projects.forEach(function (proj) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + proj.id + '</td>' +
        '<td>' + escapeHtml(proj.title) + '</td>' +
        '<td><span class="tag-badge">' + escapeHtml(proj.tag) + '</span></td>' +
        '<td>' + escapeHtml(proj.client) + '</td>' +
        '<td>' + escapeHtml(proj.year) + '</td>' +
        '<td class="actions-cell">' +
          '<button class="btn btn-sm btn-primary edit-project-btn" data-id="' + proj.id + '">ערוך</button>' +
          '<button class="btn btn-sm btn-danger delete-project-btn" data-id="' + proj.id + '">מחק</button>' +
        '</td>';
      tbody.appendChild(tr);
    });
  }

  function openProjectModal(project) {
    var modal = document.getElementById('projectModal');
    modal.classList.add('open');

    if (project) {
      editingProjectId = project.id;
      document.getElementById('modalTitle').textContent = 'עריכת פרויקט';
      document.getElementById('proj-title').value = project.title || '';
      document.getElementById('proj-category').value = project.category || 'branding';
      document.getElementById('proj-tag').value = project.tag || '';
      document.getElementById('proj-client').value = project.client || '';
      document.getElementById('proj-service').value = project.service || '';
      document.getElementById('proj-year').value = project.year || '';
      document.getElementById('proj-description').value = project.description || '';
      document.getElementById('proj-image').value = project.image || '';
      document.getElementById('proj-imagePreview').style.display = project.image ? 'block' : 'none';
      if (project.image) {
        document.getElementById('proj-imagePreview').innerHTML = '<img src="' + project.image + '" style="max-width:100%;border-radius:4px;">';
      }
      document.getElementById('proj-challenge').value = project.challenge || '';
      document.getElementById('proj-solution').value = project.solution || '';
      document.getElementById('proj-result').value = project.result || '';
      document.getElementById('proj-challengeHeading').value = project.challengeHeading || '';
      document.getElementById('proj-solutionHeading').value = project.solutionHeading || '';
      document.getElementById('proj-resultHeading').value = project.resultHeading || '';

      var resultsStr = '';
      if (project.results) {
        project.results.forEach(function (r) {
          resultsStr += r.number + '|' + r.label + '\n';
        });
      }
      document.getElementById('proj-results').value = resultsStr.trim();
    } else {
      editingProjectId = null;
      document.getElementById('modalTitle').textContent = 'פרויקט חדש';
      ['proj-title','proj-category','proj-tag','proj-client','proj-service','proj-year','proj-description','proj-image','proj-challenge','proj-solution','proj-result','proj-challengeHeading','proj-solutionHeading','proj-resultHeading','proj-results'].forEach(function (id) {
        document.getElementById(id).value = '';
      });
      document.getElementById('proj-category').value = 'branding';
    }
  }

  function saveProjectFromModal() {
    var title = document.getElementById('proj-title').value.trim();
    if (!title) {
      showToast('נא להזין כותרת לפרויקט', 'error');
      return;
    }

    var results = [];
    var resultsRaw = document.getElementById('proj-results').value.trim();
    if (resultsRaw) {
      resultsRaw.split('\n').forEach(function (line) {
        var parts = line.split('|');
        if (parts.length === 2) {
          results.push({ number: parts[0].trim(), label: parts[1].trim() });
        }
      });
    }

    var projectData = {
      title: title,
      category: document.getElementById('proj-category').value,
      tag: document.getElementById('proj-tag').value,
      client: document.getElementById('proj-client').value,
      service: document.getElementById('proj-service').value,
      year: document.getElementById('proj-year').value,
      description: document.getElementById('proj-description').value,
      image: document.getElementById('proj-image').value || '',
      challenge: document.getElementById('proj-challenge').value,
      solution: document.getElementById('proj-solution').value,
      result: document.getElementById('proj-result').value,
      challengeHeading: document.getElementById('proj-challengeHeading').value,
      solutionHeading: document.getElementById('proj-solutionHeading').value,
      resultHeading: document.getElementById('proj-resultHeading').value,
      results: results
    };

    if (editingProjectId) {
      var idx = -1;
      for (var i = 0; i < data.projects.length; i++) {
        if (data.projects[i].id === editingProjectId) {
          idx = i;
          break;
        }
      }
      if (idx >= 0) {
        projectData.id = editingProjectId;
        data.projects[idx] = projectData;
        showToast('הפרויקט עודכן', 'success');
      }
    } else {
      var maxId = 0;
      data.projects.forEach(function (p) { if (p.id > maxId) maxId = p.id; });
      projectData.id = maxId + 1;
      data.projects.push(projectData);
      showToast('הפרויקט נוסף', 'success');
    }

    closeProjectModal();
    renderProjectsTable();
    renderStats();
    saveData();
  }

  function deleteProject(id) {
    if (!confirm('למחוק את הפרויקט?')) return;
    for (var i = 0; i < data.projects.length; i++) {
      if (data.projects[i].id === id) {
        data.projects.splice(i, 1);
        break;
      }
    }
    renderProjectsTable();
    renderStats();
    saveData();
    showToast('הפרויקט נמחק', 'info');
  }

  function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('open');
  }

  function setupProjectManagement() {
    document.getElementById('addProjectBtn').addEventListener('click', function () {
      openProjectModal(null);
    });

    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('edit-project-btn')) {
        var id = parseInt(e.target.getAttribute('data-id'));
        var proj = null;
        data.projects.forEach(function (p) { if (p.id === id) proj = p; });
        if (proj) openProjectModal(proj);
      }

      if (e.target.classList.contains('delete-project-btn')) {
        var id = parseInt(e.target.getAttribute('data-id'));
        deleteProject(id);
      }
    });

    document.getElementById('modalSave').addEventListener('click', saveProjectFromModal);
    document.getElementById('modalCancel').addEventListener('click', closeProjectModal);
    document.getElementById('projectModal').addEventListener('click', function (e) {
      if (e.target === this) closeProjectModal();
    });

    document.getElementById('proj-imageUpload').addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (event) {
        document.getElementById('proj-image').value = event.target.result;
        var preview = document.getElementById('proj-imagePreview');
        preview.style.display = 'block';
        preview.innerHTML = '<img src="' + event.target.result + '" style="max-width:100%;border-radius:4px;">';
      };
      reader.readAsDataURL(file);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeProjectModal();
    });
  }

  /* ---------- Settings ---------- */
  function renderSettings() {
    var siteData = data.site || {};
    document.getElementById('settings-siteName').value = siteData.name || '';
    document.getElementById('settings-siteTagline').value = siteData.tagline || '';
    document.getElementById('settings-siteDescription').value = siteData.description || '';
    document.getElementById('settings-footerCopyright').value = siteData.name || '';

    var cs = data.caseStudy || {};
    document.getElementById('settings-challengeHeading').value = cs.challengeHeading || 'האתגר';
    document.getElementById('settings-solutionHeading').value = cs.solutionHeading || 'הפתרון';
    document.getElementById('settings-resultHeading').value = cs.resultHeading || 'התוצאה';

    renderCategories();
  }

  function collectSettings() {
    data.site.name = document.getElementById('settings-siteName').value;
    data.site.tagline = document.getElementById('settings-siteTagline').value;
    data.site.description = document.getElementById('settings-siteDescription').value;
    data.footer = data.footer || {};
    data.footer.copyright = document.getElementById('settings-footerCopyright').value;

    if (!data.caseStudy) data.caseStudy = {};
    data.caseStudy.challengeHeading = document.getElementById('settings-challengeHeading').value;
    data.caseStudy.solutionHeading = document.getElementById('settings-solutionHeading').value;
    data.caseStudy.resultHeading = document.getElementById('settings-resultHeading').value;

    collectCategories();

    var newPass = document.getElementById('settings-newPassword').value.trim();
    if (newPass) {
      ADMIN_PASSWORD = newPass;
      showToast('סיסמה עודכנה. שים לב: האיפוס יאפס גם את הסיסמה.', 'success');
    }
  }

  /* ---------- Categories Editor ---------- */
  function renderCategories() {
    populateCategorySelect();
    var container = document.getElementById('categoriesEditor');
    var cats = data.categories || [];
    container.innerHTML = '';
    cats.forEach(function (cat, i) {
      var div = document.createElement('div');
      div.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;align-items:center;';
      div.innerHTML =
        '<input type="text" class="cat-key-input" value="' + escapeHtml(cat.key) + '" placeholder="מפתח (לדוגמה: branding)" style="width:120px;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:var(--admin-font);direction:ltr;text-align:left;">' +
        '<input type="text" class="cat-label-input" value="' + escapeHtml(cat.label) + '" placeholder="תווית" style="flex:1;padding:10px;border:1px solid var(--admin-border);border-radius:6px;font-family:var(--admin-font);">' +
        '<button class="btn btn-sm btn-danger remove-cat-btn" data-index="' + i + '">X</button>';
      container.appendChild(div);
    });

    container.querySelectorAll('.remove-cat-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        data.categories.splice(idx, 1);
        renderCategories();
      });
    });
  }

  function collectCategories() {
    var container = document.getElementById('categoriesEditor');
    var keys = container.querySelectorAll('.cat-key-input');
    var labels = container.querySelectorAll('.cat-label-input');
    data.categories = [];
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].value.trim()) {
        data.categories.push({
          key: keys[i].value.trim(),
          label: labels[i] ? labels[i].value : ''
        });
      }
    }
  }

  document.addEventListener('click', function (e) {
    if (e.target.id === 'addCategoryBtn') {
      if (!data.categories) data.categories = [];
      data.categories.push({ key: 'new-category', label: 'תגית חדשה' });
      renderCategories();
    }
  });

  /* ---------- Save buttons ---------- */
  function setupSaveButtons() {
    document.querySelectorAll('.save-section-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectAllData();
        if (saveData()) {
          showToast('נשמר בהצלחה!', 'success');
        }
      });
    });
  }

  /* ---------- Danger Zone ---------- */
  function setupDangerZone() {
    document.getElementById('exportBtn').addEventListener('click', function () {
      collectAllData();
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'shimshon-data-backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('נתונים יוצאו בהצלחה!', 'success');
    });

    document.getElementById('importBtn').addEventListener('click', function () {
      document.getElementById('importFileInput').click();
    });

    document.getElementById('importFileInput').addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (event) {
        try {
          var imported = JSON.parse(event.target.result);
          if (imported.projects && imported.hero && imported.about) {
            data = imported;
            SiteData.save(data);
            renderAll();
            showToast('יובא בהצלחה!', 'success');
          } else {
            showToast('פורמט קובץ לא תקין', 'error');
          }
        } catch (err) {
          showToast('שגיאה בקריאת הקובץ', 'error');
        }
      };
      reader.readAsText(file);
      this.value = '';
    });

    document.getElementById('resetBtn').addEventListener('click', function () {
      if (!confirm('לאפס את כל הנתונים לברירת המחדל? פעולה זו不可 הפיכה.')) return;
      if (!confirm('בטוח?')) return;
      SiteData.reset();
      loadData();
      renderAll();
      showToast('אופס לברירת מחדל', 'info');
    });
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
