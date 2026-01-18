function initSmoothScroll() {
  document.querySelectorAll("[data-scroll-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var targetSelector = button.getAttribute("data-scroll-target");
      var target = document.querySelector(targetSelector);
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
  document.querySelectorAll(".floating-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var href = link.getAttribute("href");
      var target = document.querySelector(href);
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: "smooth" });
      var menu = document.getElementById("floating-menu");
      menu.classList.remove("open");
    });
  });
}

function initMenuToggle() {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("floating-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
  document.addEventListener("click", function (e) {
    if (!menu.classList.contains("open")) return;
    if (e.target === toggle || toggle.contains(e.target)) return;
    if (menu.contains(e.target)) return;
    menu.classList.remove("open");
  });
}

function initCountdown() {
  var targetDate = new Date("2026-12-30T08:00:00+07:00").getTime();
  var daysEl = document.getElementById("days");
  var hoursEl = document.getElementById("hours");
  var minutesEl = document.getElementById("minutes");
  var secondsEl = document.getElementById("seconds");
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  function updateCountdown() {
    var now = new Date().getTime();
    var distance = targetDate - now;
    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((distance / (1000 * 60)) % 60);
    var seconds = Math.floor((distance / 1000) % 60);
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function initGuestName() {
  var el = document.getElementById("guest-name");
  if (!el) return;
  var params = new URLSearchParams(window.location.search);
  var guest = params.get("to");
  if (guest && guest.trim().length > 0) {
    el.textContent = guest.trim();
  }
}

function initWishes() {
  var form = document.getElementById("wishes-form");
  var list = document.getElementById("wishes-list");
  if (!form || !list) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nameInput = document.getElementById("wish-name");
    var messageInput = document.getElementById("wish-message");
    if (!nameInput || !messageInput) return;
    var name = nameInput.value.trim();
    var message = messageInput.value.trim();
    if (!name || !message) return;
    var item = document.createElement("div");
    item.className = "wish-item";
    var nameEl = document.createElement("p");
    nameEl.className = "wish-name";
    nameEl.textContent = name;
    var messageEl = document.createElement("p");
    messageEl.className = "wish-message";
    messageEl.textContent = message;
    item.appendChild(nameEl);
    item.appendChild(messageEl);
    list.prepend(item);
    form.reset();
  });
}

function initPage() {
  initSmoothScroll();
  initMenuToggle();
  initCountdown();
  initGuestName();
  initWishes();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}

