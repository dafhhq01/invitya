document.addEventListener("DOMContentLoaded", function () {
  const splash = document.getElementById("splash");
  const openButton = document.getElementById("open-invitation");

  openButton.addEventListener("click", function () {
    splash.classList.add("slide-up");
    document.body.classList.add("allow-scroll");
    document.documentElement.classList.add("allow-scroll");
  });
});

document.getElementById("rsvp-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this; 
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  if (!name || !message) return;

  // Hitung inisial
  const parts = name.split(" ").filter((w) => w); 
  const initials =
    parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();

  // Buat wrapper komentar
  const wrapper = document.createElement("div");
  wrapper.classList.add("comment-wrapper");

  // Avatar
  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = initials;
  avatar.style.backgroundColor = `hsl(${Math.floor(
    Math.random() * 360
  )},70%,80%)`;

  // Card komentar
  const card = document.createElement("div");
  card.classList.add("comment-card");
  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent = name;
  const msg = document.createElement("p");
  msg.textContent = message;
  card.append(author, msg);

  wrapper.append(avatar, card);

  // Tampilkan komentar
  const section = form.closest(".rsvp-section");
  const inner = section.querySelector(".comments-section-wrapper");
  const container = inner.querySelector(".comments-container");

  inner.classList.remove("hidden");
  container.prepend(wrapper);

  form.reset();
});

// Set tanggal acara (Format: "YYYY-MM-DDTHH:MM:SS")
const targetDate = new Date("2025-06-14T09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById("days").innerText = "0";
    document.getElementById("hours").innerText = "0";
    document.getElementById("minutes").innerText = "0";
    document.getElementById("seconds").innerText = "0";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

// Jalankan saat load dan per 1 detik
updateCountdown();
setInterval(updateCountdown, 1000);

// Tangkap semua tombol dengan class copy-button-gift atau copy-button-gift-3
document
  .querySelectorAll(".copy-button-gift, .copy-button-gift-3")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("copyAccount");
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = "✔ Disalin";
        setTimeout(() => {
          btn.innerHTML =
            '<img src="/asset/file.svg" class="icon-gift"/> Salin No Rekening';
        }, 2000);
      });
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const openButton = document.getElementById("open-invitation");
  const invit = document.getElementById("invit");

  openButton.addEventListener("click", () => {
    // slide-up splash
    splash.classList.add("slide-up");
    document.body.classList.add("allow-scroll");
    document.documentElement.classList.add("allow-scroll");

    // setelah animasi slide-up (1s), muncul invit + urutkan animasinya
    setTimeout(() => {
      invit.classList.add("animate-invit");
    }, 1000);
  });
});

// Setelah DOM siap, setup observer untuk Bio Section
document.addEventListener("DOMContentLoaded", () => {
  const bioSection = document.getElementById("bio");
  if (!bioSection) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bioSection.classList.add("animate-bio");
          obs.unobserve(bioSection); // hanya sekali
        }
      });
    },
    {
      threshold: 0.3, // 30% sudah terlihat
    }
  );

  observer.observe(bioSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Amati semua elemen animasi di dalam .bio-section
  document
    .querySelectorAll(
      "#bio .fade-in, " +
        "#bio .fade-up, " +
        "#bio .slide-in-left, " +
        "#bio .slide-in-right, " +
        "#bio .slide-in-up, " +
        "#bio .zoom-in"
    )
    .forEach((el) => observer.observe(el));

  // Amati elemen‐elemen animasi di Activity
  document
    .querySelectorAll(
      "#activity .fade-in, #activity .fade-up, #activity .slide-in-left, " +
        "#activity .slide-in-right, #activity .slide-in-up, #activity .zoom-in"
    )
    .forEach((el) => observer.observe(el));

  // Amati semua elemen animasi di dalam #story
  document
    .querySelectorAll(
      "#story .fade-in, " +
        "#story .fade-up, " +
        "#story .slide-in-left, " +
        "#story .slide-in-right, " +
        "#story .slide-in-up, " +
        "#story .zoom-in"
    )
    .forEach((el) => observer.observe(el));

  document
    .querySelectorAll(
      "#gallery .fade-in, " +
        "#gallery .fade-up, " +
        "#gallery .slide-in-left, " +
        "#gallery .slide-in-right, " +
        "#gallery .slide-in-up, " +
        "#gallery .zoom-in"
    )
    .forEach((el) => observer.observe(el));

  document
    .querySelectorAll(
      "#gift .fade-in, #gift .fade-up, #gift .slide-in-left, #gift .slide-in-right, #gift .slide-in-up, #gift .zoom-in"
    )
    .forEach((el) => observer.observe(el));

  // Amati semua elemen animasi di dalam #thanks
  document
    .querySelectorAll(
      "#thanks .fade-in, " +
        "#thanks .fade-up, " +
        "#thanks .slide-in-left, " +
        "#thanks .slide-in-right, " +
        "#thanks .slide-in-up, " +
        "#thanks .zoom-in"
    )
    .forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const openButton = document.getElementById("open-invitation");
  const invit = document.getElementById("invit");
  const audio = document.getElementById("bg-music");
  const icon = document.getElementById("music-icon");
  const musicPlayer = document.getElementById("music-player");

  // Fungsi untuk play/pause musik
  function toggleMusic() {
    if (audio.paused) {
      audio.play();
      icon.classList.remove("paused");
    } else {
      audio.pause();
      icon.classList.add("paused");
    }
  }

  // Fungsi untuk fade-in audio
  function fadeInAudio(audioElement, duration = 3000) {
    let volume = 0.0;
    audioElement.volume = 0.0;
    const step = 0.05;
    const intervalTime = duration * step;

    const fadeInterval = setInterval(() => {
      if (volume < 2.0) {
        volume = Math.min(2.0, volume + step);
        audioElement.volume = volume;
      } else {
        clearInterval(fadeInterval);
      }
    }, intervalTime);
  }

  // Ekspos toggleMusic ke global (agar bisa dipakai inline)
  window.toggleMusic = toggleMusic;

  openButton.addEventListener("click", () => {
    splash.classList.add("slide-up");
    document.body.classList.add("allow-scroll");
    document.documentElement.classList.add("allow-scroll");

    setTimeout(() => {
      invit.classList.add("animate-invit");

      // Tampilkan ikon musik setelah splash
      musicPlayer.classList.add("visible");

      // Autoplay musik dan fade-in volume
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            icon.classList.remove("paused");
            fadeInAudio(audio); // 🔈 Tambahkan fade in
          })
          .catch(() => {
            icon.classList.add("paused");
          });
      }
    }, 1000); // setelah animasi splash selesai
  });
});


