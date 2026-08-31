(function () {
  "use strict";

  var exteriorFeatures = [
    ["front-fascia", "Front fascia", "Low, wide, and cut for clean air separation at speed."], ["led-headlights", "LED headlights", "Matrix beams read the road before you do."], ["active-grille", "Active grille", "Aero shutters open only when the thermal map calls for it."], ["hood", "Hood", "A sculpted power dome hides a precise electric architecture."], ["side-air-intakes", "Side air intakes", "Pressure-fed channels keep the drive unit breathing."], ["aerodynamic-body", "Aerodynamic body", "Every surface is a decision against drag."], ["rear-diffuser", "Rear diffuser", "Floor-hugging geometry turns air into grip."], ["spoiler", "Spoiler", "Deployable downforce, summoned in milliseconds."], ["led-taillights", "LED taillights", "A red signature that cuts through the storm."]
  ];
  var metrics = [
    ["acceleration", "2.1", "SEC", "0–100 KM/H", "Instant torque vectoring locks the launch into the road."], ["power", "1,024", "HP", "PEAK POWER", "Dual permanent-magnet motors deliver relentless response."], ["top-speed", "340", "KM/H", "TOP SPEED", "Aero balance stays calm when the numbers stop being polite."], ["range", "610", "KM", "RANGE", "800V architecture makes distance feel like a technicality."], ["drive-system", "AWD", "04", "DRIVE SYSTEM", "Four-wheel torque control. One clean line through every corner."]
  ];
  var hotspots = [["racing-seats", "Racing seats", "Carbon-shell seats lock you into the acceleration line.", "13%", "58%"], ["digital-cockpit", "Digital cockpit", "Telemetry stays in your peripheral vision, never in the way.", "39%", "27%"], ["central-display", "Central display", "One clean interface for climate, navigation, and vehicle control.", "65%", "42%"], ["ambient-lighting", "Ambient lighting", "A low electric pulse shifts with your drive mode.", "82%", "67%"]];
  var technologies = [["ai-assisted-driving", "01", "AI-assisted driving", "Predictive systems map the road, traffic, and your intent in real time.", "✦"], ["360-cameras", "02", "360° cameras", "A complete visual perimeter makes precision parking feel like flight control.", "◎"], ["advanced-sensors", "03", "Advanced sensors", "Radar, lidar, and ultrasonic inputs resolve the world at highway speed.", "◌"]];
  var selectedExterior = "active-grille";
  var selectedMetric = "acceleration";
  var selectedHotspot = "digital-cockpit";
  var selectedTechnology = "ai-assisted-driving";

  function byId(id) { return document.getElementById(id); }
  function all(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]; }); }
  function scrollToChapter(id) { var target = byId(id); if (target) target.scrollIntoView({ behavior: "smooth", block: "start" }); byId("mobile-menu").hidden = true; }

  function renderExterior() {
    var list = byId("exterior-feature-list");
    list.innerHTML = exteriorFeatures.map(function (feature, index) { var active = feature[0] === selectedExterior; return '<button class="feature-row ' + (active ? "active" : "") + '" data-exterior="' + feature[0] + '" data-testid="exterior-feature-' + feature[0] + '-button"><small data-testid="exterior-feature-' + feature[0] + '-index">' + String(index + 1).padStart(2, "0") + '</small><span data-testid="exterior-feature-' + feature[0] + '-label">' + feature[1] + '</span><b>›</b></button>'; }).join("");
    var current = exteriorFeatures.find(function (feature) { return feature[0] === selectedExterior; }) || exteriorFeatures[0];
    byId("exterior-active-label").textContent = "Selected / " + current[1];
    byId("exterior-active-description").textContent = current[2];
    all("[data-exterior]").forEach(function (button) { button.addEventListener("click", function () { selectedExterior = button.dataset.exterior; renderExterior(); }); });
  }

  function renderMetrics() {
    var grid = byId("metrics-grid");
    var current = metrics.find(function (metric) { return metric[0] === selectedMetric; }) || metrics[0];
    grid.innerHTML = metrics.map(function (metric, index) { var active = metric[0] === selectedMetric; var dominant = metric[0] === "acceleration"; return '<button class="metric ' + (dominant ? "dominant " : "") + (active ? "active" : "") + '" data-metric="' + metric[0] + '" data-testid="performance-' + metric[0] + '-button"><div class="metric-top"><small data-testid="performance-' + metric[0] + '-index">' + String(index + 1).padStart(2, "0") + '</small><b>↗</b></div><div class="metric-bottom"><strong data-testid="performance-' + metric[0] + '-value">' + metric[1] + '<small data-testid="performance-' + metric[0] + '-unit"> ' + metric[2] + '</small></strong><span data-testid="performance-' + metric[0] + '-label">' + metric[3] + '</span></div></button>'; }).join("") + '<div class="metric-note" data-testid="performance-detail-panel"><small data-testid="performance-detail-overline">Engineering note / ' + current[3] + '</small><strong data-testid="performance-detail-copy">' + current[4] + '</strong><span>⚡ 800V / 4WD VECTOR CONTROL</span></div>';
    all("[data-metric]").forEach(function (button) { button.addEventListener("click", function () { selectedMetric = button.dataset.metric; renderMetrics(); }); });
  }

  function renderHotspots() {
    var container = byId("interior-hotspots");
    var current = hotspots.find(function (hotspot) { return hotspot[0] === selectedHotspot; }) || hotspots[0];
    container.innerHTML = hotspots.map(function (hotspot) { var active = hotspot[0] === selectedHotspot; return '<div class="hotspot" style="left:' + hotspot[3] + ';top:' + hotspot[4] + '"><button class="hotspot-button ' + (active ? "active" : "") + '" data-hotspot="' + hotspot[0] + '" data-testid="interior-' + hotspot[0] + '-hotspot" aria-label="Show ' + hotspot[1] + ' detail">+</button>' + (active ? '<div class="hotspot-detail" data-testid="interior-' + hotspot[0] + '-detail"><small data-testid="interior-' + hotspot[0] + '-label">' + hotspot[1] + '</small><p data-testid="interior-' + hotspot[0] + '-copy">' + hotspot[2] + '</p></div>' : "") + '</div>'; }).join("");
    byId("interior-active-label").textContent = "Selected / " + current[1];
    all("[data-hotspot]").forEach(function (button) { button.addEventListener("click", function () { selectedHotspot = button.dataset.hotspot; renderHotspots(); }); });
  }

  function renderTechnology() {
    var grid = byId("tech-grid");
    var current = technologies.find(function (technology) { return technology[0] === selectedTechnology; }) || technologies[0];
    grid.innerHTML = technologies.map(function (technology) { var active = technology[0] === selectedTechnology; return '<button class="tech-card ' + (active ? "active" : "") + '" data-technology="' + technology[0] + '" data-testid="technology-' + technology[0] + '-button"><div class="tech-top"><small data-testid="technology-' + technology[0] + '-index">' + technology[1] + '</small><b>' + technology[4] + '</b></div><div><h3 data-testid="technology-' + technology[0] + '-label">' + technology[2] + '</h3><p data-testid="technology-' + technology[0] + '-detail">' + technology[3] + '</p></div></button>'; }).join("");
    byId("tech-active").innerHTML = '<div><small class="eyebrow">System selected / ' + current[1] + '</small><strong>' + current[2] + '</strong></div><p>' + current[3] + '</p>';
    all("[data-technology]").forEach(function (button) { button.addEventListener("click", function () { selectedTechnology = button.dataset.technology; renderTechnology(); }); });
  }

  function setModal(open) { var modal = byId("request-drive-modal"); modal.hidden = !open; document.body.classList.toggle("modal-open", open); if (open) byId("inquiry-name").focus(); }
  function showToast(message) { var toast = byId("toast"); toast.textContent = message; toast.classList.add("visible"); window.setTimeout(function () { toast.classList.remove("visible"); }, 4500); }

  all("[data-scroll]").forEach(function (button) { button.addEventListener("click", function () { scrollToChapter(button.dataset.scroll); }); });
  all("[data-open-inquiry]").forEach(function (button) { button.addEventListener("click", function () { setModal(true); }); });
  byId("brand-home").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  byId("menu-toggle").addEventListener("click", function () { var menu = byId("mobile-menu"); menu.hidden = !menu.hidden; });
  byId("modal-close").addEventListener("click", function () { setModal(false); });
  byId("request-drive-modal").addEventListener("click", function (event) { if (event.target === byId("request-drive-modal")) setModal(false); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") setModal(false); });
  byId("request-drive-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var message = byId("form-message");
    var submit = form.querySelector("button[type=submit]");
    var data = new FormData(form);
    var payload = { name: data.get("name"), email: data.get("email"), phone: data.get("phone"), preferred_date: data.get("preferred_date"), interest: "Thunderbolt", notes: data.get("notes") || "" };
    submit.disabled = true; submit.innerHTML = "Sending signal..."; message.textContent = "";
    fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(function (response) { if (!response.ok) throw new Error("Request failed"); return response.json(); }).then(function () { form.reset(); setModal(false); showToast("Signal received — a Thunderbolt specialist will be in touch shortly."); }).catch(function () { message.textContent = "Transmission failed. Please check your details and try again."; }).finally(function () { submit.disabled = false; submit.innerHTML = "Send my signal <span>→</span>"; });
  });

  renderExterior(); renderMetrics(); renderHotspots(); renderTechnology();
}());
