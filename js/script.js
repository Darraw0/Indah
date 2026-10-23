
/* INTERAKSI PORTOFOLIO */

// Menampilkan pesan di Console
console.log("Portofolio Indah berhasil dibuka!");

// Interaksi menu navigasi
const menuLinks = document.querySelectorAll("nav ul li a");

menuLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Menu dibuka: " + link.textContent);
    });
});

// Memperbarui tahun pada footer
const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent =
        "© " + new Date().getFullYear() +
        " Indah Nur Cahyani. All Rights Reserved.";
}


/* MENU NAVIGASI AKTIF */
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.forEach(function(item) {
            item.classList.remove('active');
        });

        link.classList.add('active');
    });
});








/* ===== ANIMASI TEKS MENGETIK HOME + BAHASA ID/EN ===== */

document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementById("typing-description");

    if (!element) {
        console.error("ID typing-description tidak ditemukan!");
        return;
    }

    const translations = {
        id: [
            "Saya tertarik pada desain visual dan editing.",
            "Saya sedang mempelajari UI/UX Design.",
            "Saya tertarik pada Web Development."
        ],
        en: [
            "I am interested in visual design and editing.",
            "I am currently learning UI/UX design.",
            "I am interested in web development."
        ]
    };

    let language = "id";
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typingTimer;

    function typeEffect() {
        const words = translations[language];
        const currentWord = words[wordIndex];

        element.textContent = currentWord.substring(0, letterIndex);

        if (!isDeleting) {
            letterIndex++;

            if (letterIndex > currentWord.length) {
                isDeleting = true;
                typingTimer = setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            letterIndex--;

            if (letterIndex < 0) {
                letterIndex = 0;
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        typingTimer = setTimeout(typeEffect, isDeleting ? 40 : 70);
    }

    function changeTypingLanguage(newLanguage) {
    if (!translations[newLanguage]) return;

    language = newLanguage;
    window.portfolioLanguage = newLanguage; // sinkron dengan translatePage

    wordIndex = 0;
    letterIndex = 0;
    isDeleting = false;

    clearTimeout(typingTimer);
    element.textContent = "";

    typeEffect();
}

// Biar fungsi ini bisa dipanggil translatePage()
window.changeTypingLanguage = changeTypingLanguage;

    // Hubungkan animasi ke tombol bahasa ID dan EN
    document.querySelectorAll(
        ".language-switch button, .language-switch [data-lang]"
    ).forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedLanguage = (
                button.dataset.lang || button.textContent
            ).trim().toLowerCase();

            if (
                selectedLanguage === "en" ||
                selectedLanguage.includes("english")
            ) {
                changeTypingLanguage("en");
            } else if (
                selectedLanguage === "id" ||
                selectedLanguage.includes("indonesia")
            ) {
                changeTypingLanguage("id");
            }
        });
    });

    // Ikuti bahasa yang sudah aktif ketika halaman dibuka
    const activeLanguageButton = document.querySelector(
        ".language-switch .active, .language-switch .selected, " +
        ".language-switch [aria-pressed='true']"
    );

    if (activeLanguageButton) {
        const activeLanguage = (
            activeLanguageButton.dataset.lang ||
            activeLanguageButton.textContent
        ).trim().toLowerCase();

        if (activeLanguage === "en") {
            language = "en";
        }
    }

    typeEffect();
});




/* DARK MODE DAN LIGHT MODE */

function setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) {
        console.error("Tombol theme-toggle tidak ditemukan!");
        return;
    }

    themeToggle.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-mode");

        themeToggle.textContent = isDark ? "☀️" : "🌙";

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        console.log("Tema aktif:", isDark ? "Gelap" : "Terang");
    });

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupThemeToggle);
} else {
    setupThemeToggle();
}


/* TOGGLE MODE TERANG DAN GELAP */
const tombolTema = document.getElementById("theme-toggle");

if (tombolTema) {
    tombolTema.onclick = function () {
        document.body.classList.toggle("dark-mode");

        const modeGelap = document.body.classList.contains("dark-mode");

        tombolTema.textContent = modeGelap ? "☀️" : "🌙";

        console.log("Mode:", modeGelap ? "Gelap" : "Terang");
    };
} else {
    console.error("Tombol theme-toggle tidak ditemukan!");
}



function setupMoreMenu() {
    const button = document.getElementById("moreMenuButton");
    const menu = document.getElementById("moreMenuDropdown");

    if (!button || !menu) {
        console.error("Tombol atau dropdown menu tidak ditemukan.");
        return;
    }

    // Mencegah event listener terpasang berkali-kali
    if (button.dataset.menuReady === "true") return;
    button.dataset.menuReady = "true";

    function closeMenu() {
        menu.hidden = true;
        button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", function (event) {
        event.stopPropagation();

        menu.hidden = !menu.hidden;
        button.setAttribute("aria-expanded", String(!menu.hidden));
    });

    menu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("click", function () {
        closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            button.focus();
        }
    });

    // BAGIKAN PORTOFOLIO
    const shareButton = document.getElementById("shareMenuButton");

    if (shareButton) {
        shareButton.addEventListener("click", async function () {
            const url = window.location.href;

            try {
                if (navigator.share) {
                    await navigator.share({
                        title: document.title,
                        text: "Lihat portofolio saya!",
                        url: url
                    });
                } else {
                    window.prompt("Salin link portofolio:", url);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    window.prompt("Salin link portofolio:", url);
                }
            }
        });
    }

    // PEMUTAR MUSIK
    const audio = document.getElementById("websiteMusic");
    const musicButton = document.getElementById("musicToggle");
    const musicStatus = document.getElementById("musicStatus");
    const volume = document.getElementById("musicVolume");

    if (audio && musicButton) {
        audio.volume = volume ? Number(volume.value) : 0.5;

        musicButton.addEventListener("click", async function () {
            if (audio.paused) {
                try {
                    await audio.play();
                    musicButton.textContent = "Ⅱ";
                    if (musicStatus) musicStatus.textContent = "Musik diputar";
                } catch (error) {
                    if (musicStatus) {
                        musicStatus.textContent = "Periksa file musik";
                    }
                }
            } else {
                audio.pause();
                musicButton.textContent = "▶";
                if (musicStatus) musicStatus.textContent = "Musik dijeda";
            }
        });

        if (volume) {
            volume.addEventListener("input", function () {
                audio.volume = Number(volume.value);
            });
        }
    }

    // TENTANG WEBSITE
    const aboutButton = document.getElementById("aboutMenuButton");

    if (aboutButton) {
        aboutButton.addEventListener("click", function () {
            alert("Selamat datang di portofolio pribadi saya!");
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMoreMenu);
} else {
    setupMoreMenu();
}




function setupVisitorProfile() {
    const profileButton = document.getElementById("themeMenuButton");
    const profileMenuName = document.getElementById("profileMenuName");
    const profile = document.getElementById("visitorProfile");
    const nameInput = document.getElementById("visitorNameInput");
    const nameDisplay = document.getElementById("visitorName");
    const saveButton = document.getElementById("saveVisitorName");

    if (
        !profileButton ||
        !profileMenuName ||
        !profile ||
        !nameInput ||
        !nameDisplay ||
        !saveButton
    ) return;

    // Buka atau tutup bagian input nama
    profileButton.addEventListener("click", function () {
        profile.hidden = !profile.hidden;

        if (!profile.hidden) {
            nameInput.focus();
        }
    });

    // Simpan nama dan langsung ubah tulisan menu
    function saveName() {
        const name = nameInput.value.trim();

        if (!name) {
            alert("Masukkan nama kamu terlebih dahulu!");
            nameInput.focus();
            return;
        }

        profileMenuName.textContent = name;
        nameDisplay.textContent = name;

        // Simpan nama pada browser pengunjung ini
        try {
            localStorage.setItem("visitorName", name);
        } catch (error) {
            // Nama tetap tampil selama halaman terbuka
        }

        nameInput.value = "";
        profile.hidden = true;
    }

    saveButton.addEventListener("click", saveName);

    // Tekan Enter untuk menyimpan nama
    nameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveName();
        }
    });

    // Tampilkan nama yang sebelumnya disimpan di browser ini
    try {
        const savedName = localStorage.getItem("visitorName");

        if (savedName) {
            profileMenuName.textContent = savedName;
            nameDisplay.textContent = savedName;
        }
    } catch (error) {
        // Tetap bisa digunakan tanpa penyimpanan lokal
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVisitorProfile);
} else {
    setupVisitorProfile();
}


document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("introScreen");
  const button = document.getElementById("enterHomeButton");

  if (!intro || !button) {
    console.error("Intro atau tombol tidak ditemukan!");
    return;
  }

  button.addEventListener("click", function (event) {
    event.preventDefault();

    intro.classList.add("curtains-opening");
    button.disabled = true;

    setTimeout(function () {
      intro.classList.add("intro-finished");
      intro.setAttribute("aria-hidden", "true");
    }, 1600);
  });
});










/* Tutup menu titik tiga saat halaman digulir */
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".more-menu");
    const dropdown = document.querySelector(".more-menu-dropdown");

    if (!menu || !dropdown) return;

    let scrollTimeout;

    window.addEventListener(
        "scroll",
        () => {
            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                dropdown.hidden = true;
                dropdown.classList.remove("active", "show", "open");
                menu.classList.remove("active", "show", "open");
            }, 80);
        },
        { passive: true }
    );

    window.addEventListener("touchmove", () => {
        dropdown.hidden = true;
        dropdown.classList.remove("active", "show", "open");
        menu.classList.remove("active", "show", "open");
    }, { passive: true });
});








/* ===== PORTFOLIO MUSIC PLAYER ===== */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("musicToggle");
    const dropdown = document.getElementById("musicDropdown");
    const audio = document.getElementById("portfolioAudio");
    const playPause = document.getElementById("musicPlayPause");
    const status = document.getElementById("musicStatus");
    const tracks = document.querySelectorAll(".music-track");

    if (!toggle || !dropdown || !audio || !playPause || !status) return;

    let currentTrack = null;

    toggle.addEventListener("click", () => {
        const willOpen = dropdown.hidden;
        dropdown.hidden = !willOpen;
        toggle.setAttribute("aria-expanded", String(willOpen));
    });

    tracks.forEach((track) => {
        track.addEventListener("click", async () => {
            const src = track.dataset.src;

            if (currentTrack === src) {
                if (audio.paused) {
                    try {
                        await audio.play();
                    } catch {
                        status.textContent = "Musik gagal diputar";
                    }
                } else {
                    audio.pause();
                }
                return;
            }

            currentTrack = src;
            audio.src = src;

            tracks.forEach((item) => {
                item.classList.toggle("active", item === track);
            });

            status.textContent =
                track.querySelector("strong").textContent;

            try {
                await audio.play();
            } catch {
                status.textContent =
                    "Periksa file MP3 atau tekan play lagi";
            }
        });
    });

    playPause.addEventListener("click", async () => {
        if (!currentTrack) {
            status.textContent = "Pilih lagu terlebih dahulu";
            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
            } catch {
                status.textContent = "Musik gagal diputar";
            }
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        playPause.textContent = "Ⅱ";
        playPause.setAttribute("aria-label", "Pause musik");
    });

    audio.addEventListener("pause", () => {
        playPause.textContent = "▶";
        playPause.setAttribute("aria-label", "Play musik");
    });

    audio.addEventListener("ended", () => {
        playPause.textContent = "▶";
        status.textContent = "Lagu selesai";
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".music-player")) {
            dropdown.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
        }
    });
});











/* ==================================
   DISCOVER BETAWI CULTURE
================================== */

(() => {
    const modal = document.getElementById("betawiModal");
    const modalTitle = document.getElementById("betawiModalTitle");
    const modalText = document.getElementById("betawiModalText");
    const modalLink = document.getElementById("betawiModalLink");
    const closeButton = document.getElementById("betawiModalClose");
    const detailButtons = document.querySelectorAll(
        "#betawi-culture .betawi-detail-button"
    );

    if (!modal || !modalTitle || !modalText ||
        !modalLink || !closeButton) {
        return;
    }

    const cultureInfo = {
        rumah: {
            title: "Rumah Adat Betawi",
            text: "Rumah Kebaya merupakan salah satu rumah tradisional Betawi. Namanya berkaitan dengan bentuk atapnya yang menyerupai lipatan kebaya. Rumah tradisional Betawi juga mencerminkan kehidupan keluarga dan lingkungan masyarakatnya.",
            url: "https://id.wikipedia.org/wiki/Rumah_kebaya"
        },
        batik: {
            title: "Batik dan Pakaian Betawi",
            text: "Batik Betawi memiliki motif yang terinspirasi dari identitas dan kehidupan Jakarta, termasuk Ondel-ondel, ikon budaya Betawi. Pakaian tradisional Betawi juga memiliki beragam bentuk dan digunakan dalam kegiatan adat maupun acara tertentu.",
            url: "https://id.wikipedia.org/wiki/Batik_Betawi"
        },
        kuliner: {
            title: "Makanan Khas Betawi",
            text: "Kerak telor merupakan salah satu kuliner khas Betawi yang dibuat dari beras ketan, telur, dan bumbu, lalu dimasak secara tradisional. Selain kerak telor, Betawi juga memiliki makanan khas lain seperti soto Betawi dan asinan Betawi.",
            url: "https://id.wikipedia.org/wiki/Kerak_telor"
        },
        palang: {
            title: "Silat dan Tradisi Palang Pintu",
            text: "Palang Pintu merupakan tradisi dalam pernikahan Betawi yang memadukan adu pantun, unsur keagamaan, dan pertunjukan silat. Tradisi ini menjadi simbol penyambutan sekaligus menunjukkan keterampilan dan kesiapan pihak pengantin pria.",
            url: "https://id.wikipedia.org/wiki/Palang_pintu"
        }
    };

    function openCultureInfo(key) {
        const info = cultureInfo[key];

        if (!info) return;

        modalTitle.textContent = info.title;
        modalText.textContent = info.text;
        modalLink.href = info.url;

        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeButton.focus();
    }

    function closeCultureInfo() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openCultureInfo(button.dataset.culture);
        });
    });

    closeButton.addEventListener("click", closeCultureInfo);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeCultureInfo();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeCultureInfo();
        }
    });
})();















/* FOTO PRIBADI: KLIK UNTUK GANTI FOTO */
const photoSwitcher = document.getElementById("photoSwitcher");
const personalPhoto = document.getElementById("personalPhoto");

if (photoSwitcher && personalPhoto) {
    const personalPhotos = [
        "img/foto1.jpg",
        "img/foto2.jpg",
        "img/foto3.jpg"
    ];

    let currentPhoto = 0;

    photoSwitcher.addEventListener("click", function () {
        currentPhoto = (currentPhoto + 1) % personalPhotos.length;

        personalPhoto.src = personalPhotos[currentPhoto];
        personalPhoto.alt = "Foto pribadi " + (currentPhoto + 1);
    });
}


/* ===== TOMBOL LIHAT POSTER DAN DESAIN ===== */
function toggleArtwork(artworkId, button) {
    const artwork = document.getElementById(artworkId);

    if (!artwork) {
        console.error("Gambar tidak ditemukan:", artworkId);
        return;
    }

    const sedangTersembunyi = artwork.hidden;

    artwork.hidden = !sedangTersembunyi;

    if (sedangTersembunyi) {
        button.textContent =
            artworkId === "posterArtwork"
                ? "✕ Tutup Poster"
                : "✕ Tutup Desain";
    } else {
        button.textContent =
            artworkId === "posterArtwork"
                ? "👁 Lihat Poster"
                : "👁 Lihat Desain";
    }
}

















/* ===== PEMUTAR LAGU DARI COVER ===== */

const songCoverButton = document.getElementById("songCoverButton");
const mySongVideo = document.getElementById("mySongVideo");

if (songCoverButton && mySongVideo) {
    songCoverButton.addEventListener("click", async () => {
        songCoverButton.hidden = true;
        mySongVideo.hidden = false;

        mySongVideo.load();

        try {
            await mySongVideo.play();
        } catch (error) {
            // Video tetap bisa diputar melalui kontrol Play.
            mySongVideo.controls = true;
        }
    });

    mySongVideo.addEventListener("ended", () => {
        mySongVideo.hidden = true;
        songCoverButton.hidden = false;
    });
}




/* =================================
   POP-UP LIRIK DAN MAKNA
================================= */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("songModal");
    const modalTitle = document.getElementById("songModalTitle");
    const modalContent = document.getElementById("songModalContent");
    const closeButton = document.getElementById("songModalClose");

    if (!modal || !modalTitle || !modalContent || !closeButton) {
        console.error("Elemen pop-up lagu tidak ditemukan.");
        return;
    }

    let previousFocus = null;

    // Buka pop-up saat tombol ditekan
    document.querySelectorAll("#project .song-detail-btn")
        .forEach(function (button) {
            button.addEventListener("click", function () {
                const targetId = button.dataset.target;
                const source = document.getElementById(targetId);

                if (!source) {
                    console.error("Konten tidak ditemukan:", targetId);
                    return;
                }

                previousFocus = button;

                if (targetId === "songLyricsPanel") {
                    modalTitle.textContent = "Lirik Lagu";
                } else if (targetId === "songMeaningPanel") {
                    modalTitle.textContent = "Makna di Balik Lagu";
                }

                // Salin isi yang sudah ada tanpa mengubah teks aslinya
                modalContent.innerHTML = source.innerHTML;
                modalContent.scrollTop = 0;

                modal.hidden = false;
                document.body.style.overflow = "hidden";

                closeButton.focus();
            });
        });

    // Fungsi menutup pop-up
    function closeSongModal() {
        modal.hidden = true;
        modalContent.innerHTML = "";
        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    closeButton.addEventListener("click", closeSongModal);

    // Klik area gelap untuk menutup
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeSongModal();
        }
    });

    // Tombol Escape untuk menutup
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeSongModal();
        }
    });
});















    
/* =====================================
   MUSIK, LIRIK, DAN MAKNA LAGU
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ===== PUTAR MUSIK DARI COVER =====
    const coverButton = document.getElementById("songCoverButton");
    const songVideo = document.getElementById("mySongVideo");

    if (coverButton && songVideo) {

        coverButton.addEventListener("click", async function () {
            coverButton.hidden = true;
            songVideo.hidden = false;

            // Muat video MP4 jika belum dimuat
            if (songVideo.readyState === 0) {
                songVideo.load();
            }

            try {
                await songVideo.play();
            } catch (error) {
                // Jika gagal autoplay, tampilkan kontrol video
                coverButton.hidden = false;
                songVideo.hidden = true;

                console.error("Video gagal diputar:", error);
                alert(
                    "Lagu belum bisa diputar. Periksa file videos/ciptaan.mp4."
                );
            }
        });

        // Tampilkan cover kembali setelah video selesai
        songVideo.addEventListener("ended", function () {
            songVideo.hidden = true;
            coverButton.hidden = false;
        });
    }

    // ===== BUKA DAN TUTUP LIRIK / MAKNA =====
    const detailButtons = document.querySelectorAll(
        "#project .song-detail-btn"
    );

    detailButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data-target");
            const panel = document.getElementById(targetId);

            if (!panel) {
                console.error("Panel tidak ditemukan:", targetId);
                return;
            }

            const akanDibuka = panel.hidden;
            panel.hidden = !akanDibuka;

            button.classList.toggle("active", akanDibuka);

            if (targetId === "songLyricsPanel") {
                button.textContent = akanDibuka
                    ? "♪ Tutup Lirik"
                    : "♪ Lihat Lirik";
            }

            if (targetId === "songMeaningPanel") {
                button.textContent = akanDibuka
                    ? "♡ Tutup Makna"
                    : "♡ Lihat Makna";
            }
        });

    });

});








function toggleArtwork(artworkId, button) {
    const artwork = document.getElementById(artworkId);

    if (!artwork || !button) return;

    const isHidden = artwork.hidden;

    artwork.hidden = !isHidden;

    button.innerHTML = isHidden
        ? "✕ Tutup Poster"
        : "👁 Lihat Poster";
}











// ===== TOMBOL KEMBALI KE ATAS =====
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}







/* =========================================
   FITUR BAHASA INDONESIA & ENGLISH
   Portfolio Indah Nur Cahyani
========================================= */

(() => {
    const translations = [
        // INTRO
        ["Browser kamu tidak mendukung video.", "Your browser does not support video."],
        ["WELCOME TO MY", "WELCOME TO MY"],
        ["Perjalanan Kreatif", "Creative"],
        ["Saya✦", "Journey✦"],
        ["Temukan kisah, Keahlian, dan Karya Kreatif saya.", "Discover my story, skills, and creative works."],
        ["Jelajahi Portfolio Saya", "Explore My Portfolio"],
        ["Gulir untuk menjelajahi lebih banyak", "Scroll to discover more"],

        // NAVIGASI
        ["Tentang Saya", "About Me"],
        ["Kontak", "Contact"],
        ["Pendidikan", "Education"],
        ["Hobbi", "Hobbies"],
        ["Projek", "Projects"],
        ["Ganti tema", "Change theme"],
        ["Buka pemutar musik", "Open music player"],
        ["Buka menu tambahan", "Open additional menu"],
        ["Tutup pop-up", "Close popup"],
        ["Tutup preview", "Close preview"],

        // HOME
        ["HALO, Nama Saya", "HELLO, My Name"],
        ["Minat pada Kreativitas & Teknologi.", "Passion for Creativity & Technology."],
        ["Temukan Kisahku →", "Discover My Story →"],
        ["Saya tertarik pada desain visual dan editing.", "I am interested in visual design and editing."],
        ["Saya sedang mempelajari UI/UX Design.", "I am currently learning UI/UX design."],
        ["Saya tertarik pada Web Development.", "I am interested in web development."],

        // ABOUT
        ["Tentang Saya", "About Me"],
        [
            "Saya merupakan mahasiswi semester 5 Program Studi Teknik Informatika di Universitas Indraprasta PGRI yang memiliki ketertarikan pada desain visual, pengembangan website, dan teknologi digital. Saya senang mengeksplorasi ide kreatif serta menggabungkan unsur estetika dan teknologi untuk menghasilkan karya yang menarik, fungsional, dan mudah digunakan.",
            "I am a fifth-semester Informatics Engineering student at Universitas Indraprasta PGRI with an interest in visual design, website development, and digital technology. I enjoy exploring creative ideas and combining aesthetics with technology to create work that is engaging, functional, and easy to use."
        ],
        [
            "Saat ini, saya sedang mempelajari dasar-dasar pengembangan web menggunakan HTML, CSS, dan JavaScript untuk memahami proses membangun serta merancang tampilan website. Saya juga sedang mendalami UI/UX Design, khususnya dalam memahami kebutuhan pengguna, menyusun tata letak antarmuka, serta menciptakan pengalaman pengguna yang nyaman, intuitif, dan menarik secara visual.",
            "I am currently learning the fundamentals of web development using HTML, CSS, and JavaScript to understand how websites are built and designed. I am also exploring UI/UX design, particularly understanding user needs, organizing interface layouts, and creating user experiences that are comfortable, intuitive, and visually appealing."
        ],
        [
            "Saya percaya bahwa proses belajar merupakan bagian penting dalam mengembangkan potensi diri. Oleh karena itu, saya terus mengasah keterampilan, mengeksplorasi ide-ide baru, dan terbuka terhadap berbagai pengalaman yang dapat menambah wawasan. Ke depannya, saya ingin terus berkembang dalam bidang desain dan pengembangan web serta menghasilkan karya digital yang kreatif, inovatif, dan memberikan manfaat bagi penggunanya.",
            "I believe that learning is an important part of personal growth. Therefore, I continue to improve my skills, explore new ideas, and stay open to experiences that broaden my knowledge. In the future, I hope to grow further in design and web development and create digital work that is creative, innovative, and useful to others."
        ],

        // EDUCATION
        ["Pendidikan & Pengalaman", "Education & Experience"],
        ["Universitas Indraprasta PGRI", "Universitas Indraprasta PGRI"],
        [
            "Mahasiswi semester 5 Program Studi Teknik Informatika yang mempelajari berbagai bidang teknologi, mulai dari dasar pemrograman, pengembangan website menggunakan HTML, CSS, dan JavaScript, hingga perancangan antarmuka pengguna (UI/UX). Selain itu, pembelajaran Teknik Informatika juga mencakup algoritma dan struktur data, basis data, serta analisis dan perancangan sistem informasi.",
            "A fifth-semester Informatics Engineering student studying various fields of technology, ranging from programming fundamentals and website development using HTML, CSS, and JavaScript to user interface design (UI/UX). In addition, the Informatics Engineering curriculum covers algorithms and data structures, database management, as well as information systems analysis and design.",
            
        ],
        ["2024 sampai sekarang", "2024–Present"],
        ["SMAN 62 Jakarta", "SMAN 62 Jakarta"],
        [
        "Menempuh pendidikan Sekolah Menengah Atas (SMA) pada bidang Ilmu Pengetahuan Sosial (IPS), dengan mempelajari berbagai mata pelajaran seperti ekonomi, sosiologi, geografi, dan sejarah. Selama masa pendidikan, saya mendalami konsep kegiatan ekonomi, interaksi sosial, kondisi geografis, serta perkembangan sejarah yang berkaitan dengan kehidupan masyarakat dan lingkungan. Selain kegiatan akademik, saya juga mengikuti ekstrakurikuler basket sebagai bagian dari kegiatan sekolah, yang memberikan pengalaman dalam olahraga tim dan kerja sama bersama rekan satu tim.",
        "I completed my high school education in the Social Sciences (IPS) program, where I studied various subjects, including economics, sociology, geography, and history. During my studies, I explored economic activities, social interactions, geographical conditions, and historical developments related to society and the environment. In addition to academic activities, I also participated in the school's basketball extracurricular program, gaining experience in team sports and collaboration with fellow teammates.",
            
        ],

        // SKILLS
        ["Skills Saya", "My Skills"],
        [
            "Beberapa kemampuan yang sedang saya kembangkan untuk mendukung kreativitas dan pembelajaran di bidang teknologi.",
            "Some of the skills I am developing to support my creativity and learning in technology."
        ],
        ["Desain Visual", "Visual Design"],
        [
            "Mengembangkan konsep visual melalui perpaduan warna, tipografi, komposisi, dan elemen grafis untuk menghasilkan desain yang menarik, harmonis, serta sesuai dengan tujuan komunikasi. Tertarik mengeksplorasi berbagai gaya desain untuk kebutuhan branding, promosi, dan konten digital.",
            "Developing visual concepts through color, typography, composition, and graphic elements to create appealing and harmonious designs that communicate effectively. Interested in exploring different design styles for branding, promotion, and digital content."
        ],
        ["Editing Foto & Video", "Photo & Video Editing"],
        [
            "Mengolah foto dan video menjadi konten visual yang lebih menarik melalui penyesuaian warna, pemilihan komposisi, pemotongan klip, transisi, serta penyelarasan musik. Berfokus pada penyampaian pesan yang kreatif dan tampilan visual yang sesuai dengan kebutuhan konten.",
            "Editing photos and videos into engaging visual content through color adjustments, composition, clip trimming, transitions, and music synchronization. Focused on communicating messages creatively and creating visuals suited to the content."
        ],
        ["UI/UX Design", "UI/UX Design"],
        [
            "Sedang mempelajari prinsip UI/UX Design untuk memahami cara merancang antarmuka digital yang menarik, intuitif, dan mudah digunakan. Mulai mengeksplorasi tata letak, konsistensi elemen visual, navigasi, serta pengalaman pengguna agar desain tidak hanya terlihat baik, tetapi juga nyaman digunakan.",
            "Learning UI/UX design principles to create digital interfaces that are appealing, intuitive, and easy to use. Exploring layouts, visual consistency, navigation, and user experience so designs look good and feel comfortable to use."
        ],
        ["Web Development", "Web Development"],
        [
            "Sedang mempelajari dasar-dasar pengembangan website menggunakan HTML, CSS, dan JavaScript. Berlatih menyusun struktur halaman, mengatur tampilan dan responsivitas, serta memahami interaksi sederhana agar dapat membangun website yang informatif, menarik, dan dapat diakses melalui berbagai perangkat.",
            "Learning the fundamentals of website development using HTML, CSS, and JavaScript. Practicing page structure, responsive layouts, and simple interactions to build informative and engaging websites that work across different devices."
        ],

        // HOBBIES
        ["Sisi Kreatif Saya", "MY CREATIVE SIDE"],
        ["Hobi Saya", "My Hobbies"],
        [
            "Saya memiliki beberapa hobi yang saya sukai, di antaranya bernyanyi, bermain gitar, mengedit foto dan video, serta bermain game Mobile Legends. Saya suka bernyanyi dan bermain gitar karena musik bisa membuat saya merasa lebih rileks sekaligus menjadi cara untuk mengekspresikan diri. Selain itu, saya juga senang mengedit foto dan video menggunakan CapCut. Saya suka mencoba berbagai efek, mengatur warna, dan menyesuaikan musik agar hasil editan terlihat menarik dan estetik. Di waktu luang, saya juga suka sekali bermain Mobile Legends karena permainannya seru dan menantang. Saya senang menyusun strategi dan bermain bersama teman-teman. Bagi saya, hobi bukan hanya untuk mengisi waktu luang, tetapi juga menjadi cara untuk bersenang-senang, mengembangkan kreativitas, dan melakukan hal-hal yang saya sukai.",
            "I have several hobbies, including singing, playing guitar, editing photos and videos, and playing Mobile Legends. Singing and playing guitar help me relax and express myself through music. I also enjoy editing photos and videos with CapCut. I like experimenting with effects, adjusting colors, and matching music to make my edits look appealing. In my free time, I love playing Mobile Legends because it is fun and challenging. I enjoy planning strategies and playing with friends. For me, hobbies are not just a way to spend free time, but also a way to have fun, develop creativity, and enjoy the things I love."
        ],

        // PROJECT
        ["Projek Saya", "My Project"],
        ["Kumpulan proyek dan karya kreatif saya", "A collection of my projects and creative works"],
        ["Website Portofolio Pribadi", "Personal Portfolio Website"],
        [
            "Membuat website menggunakan HTML, CSS, dan JavaScript untuk memperkenalkan diri, pendidikan, keterampilan, dan hasil karya.",
            "Creating a website using HTML, CSS, and JavaScript to introduce myself, my education, skills, and creative work."
        ],
        ["PENGEMBANGAN WEB", "WEB DEVELOPMENT"],
        ["KEWIRAUSAHAAN", "ENTREPRENEURSHIP"],
        ["PENULIS CREATIF", "CREATIVE WRITING"],
        ["VIDIO KREATIF", "CREATIVE VIDEO"],
        ["PENCIPTA MUSIK", "MUSIC CREATION"],
        ["DESAIN GRAFIS", "GRAPHIC DESIGN"],
        ["SENI DIGITAL", "DIGITAL ART"],


        ["Argasta Maheswara", "Argasta Maheswara"],
        [
            "Sebuah karya fiksi bergenre romance yang saya tulis dan publikasikan di Wattpad, dan saat ini masih dalam proses pengembangan. Melalui cerita ini, saya mengeksplorasi kreativitas dalam merangkai alur, membangun karakter, serta menyampaikan emosi melalui narasi dan dialog. Proyek ini juga menjadi ruang bagi saya untuk mengembangkan kemampuan menulis, menuangkan ide, dan menciptakan cerita yang dapat membangun keterikatan emosional dengan pembaca.",
            "A romance fiction story that I wrote and published on Wattpad, which is still being developed. Through this story, I explore creativity by building plots and characters and expressing emotions through narration and dialogue. This project also helps me improve my writing, develop ideas, and create stories that connect emotionally with readers."
        ],
        ["📖 Baca di Wattpad ↗", "📖 Read on Wattpad ↗"],
        [
            "Hasil karya editing video saya yang menggabungkan musik, transisi, dan visual kreatif untuk menghasilkan video yang menarik dan estetik.",
            "My video-editing work combines music, transitions, and creative visuals to create engaging and aesthetic videos."
        ],
        ["Lagu Ciptaan Saya", "My Original Song"],
        [
            "Sebuah karya musik saya ciptakan yang berjudul \"Masih Seperti Dulu\" melalui perasaan dan ungkapan yang tidak bisa saya kendalikan maka terciptalah lagu ini.",
            "I created this song, titled \"Masih Seperti Dulu,\" as a way to express feelings and emotions that I could not keep inside."
        ],
        ["Desain Poster Idul Fitri", "Eid al-Fitr Poster Design"],
        [
            "Desain poster ucapan Selamat Hari Raya Idul Fitri 1446 H yang saya buat pada tahun 2025 berdasarkan permintaan seorang teman.",
            "An Eid al-Fitr 1446 H greeting poster that I designed in 2025 at a friend's request."
        ],
        ["👁 Lihat Poster", "👁 View Poster"],
        ["Desain Background Laptop", "Laptop Background Design"],
        [
            "Desain background laptop bertema luar angkasa yang saya buat pada tahun 2025 untuk mengisi waktu luang, dengan perpaduan ilustrasi planet, astronaut, dan nuansa monokrom.",
            "A space-themed laptop background I created in 2025 in my free time, combining planet illustrations, an astronaut, and a monochrome aesthetic."
        ],
        ["👁 Lihat Desain", "👁 View Design"],


        // MOTIVATION
        ["SEKADAR PENGINGAT UNTUK DIRI SENDIRI", "A LITTLE REMINDER FOR MYSELF"],
        ["Pelan-pelan, Aku Juga Sedang Bertumbuh.", "Slowly, I Am Growing Too."],
        [
            "Tidak semua hal harus selesai hari ini. Ada kalanya aku perlu berhenti sebentar, menarik napas, dan mengingat bahwa setiap orang punya waktunya masing-masing. Aku mungkin belum sehebat orang lain, belum memiliki semua hal yang aku impikan, dan terkadang masih merasa bingung dengan jalan yang sedang aku pilih. Namun, itu bukan berarti aku gagal.",
            "Not everything has to be finished today. Sometimes I need to pause, take a breath, and remember that everyone has their own timeline. I may not be as skilled as others, may not have everything I dream of yet, and may sometimes feel unsure about the path I have chosen. But that does not mean I have failed."
        ],
        [
            "Aku sedang belajar, mencoba, memperbaiki kesalahan, dan mengumpulkan pengalaman sedikit demi sedikit. Setiap proses yang terasa sulit tetap mengajarkanku sesuatu. Aku ingin terus berkembang, berani mencoba hal baru, dan tidak menyerah hanya karena perjalanan ini terasa lambat.",
            "I am learning, trying, correcting my mistakes, and gaining experience little by little. Every difficult process still teaches me something. I want to keep growing, be brave enough to try new things, and not give up just because the journey feels slow."
        ],
        [
            "Suatu hari nanti, aku ingin melihat kembali diriku yang sekarang dengan bangga, karena ternyata aku mampu melewati banyak hal yang dulu terasa mustahil. Aku ingin terus melangkah, meskipun perlahan, sampai bisa mencapai hal-hal yang selama ini aku impikan.",
            "Someday, I want to look back at who I am today with pride, knowing that I made it through things that once seemed impossible. I want to keep moving forward, even slowly, until I reach the things I have always dreamed of."
        ],
        [
            "\"Aku tidak harus menjadi sempurna untuk bisa merasa bangga pada diriku sendiri.\"",
            "\"I do not have to be perfect to feel proud of myself.\""
        ],

        // CONTACT
        ["Kontak Saya", "My Contact"],
        [
            "Terima kasih sudah mengunjungi portofolio saya. Silakan hubungi saya melalui kontak berikut atau kirim pesan langsung melalui formulir di bawah.",
            "Thank you for visiting my portfolio. Feel free to contact me using the details below or send me a message through the form."
        ],
        ["Kirim Pesan", "Send a Message"],
        ["Nama lengkap", "Full name"],
        ["Alamat email", "Email address"],
        ["Subjek pesan", "Message subject"],
        ["Tulis pesan kamu di sini...", "Write your message here..."],
        ["Kembali ke atas", "Back to top"],

        // MENU TITIK TIGA
        ["Profil Pengguna", "Visitor Profile"],
        ["Pengunjung", "Visitor"],
        ["Halo,", "Hello,"],
        ["Nama kamu:", "Your name:"],
        ["Masukkan nama kamu", "Enter your name"],
        ["Simpan Nama", "Save Name"],
        ["Unduh CV", "Download CV"],
        ["Bagikan Portofolio", "Share Portfolio"],
        ["Tentang Website", "About This Website"],

        // MUSIC PLAYER
        ["Pilih lagu untuk memulai", "Choose a song to get started"],
        ["♫ Daftar Putar kecilku", "♫ My Little Playlist"],
        ["Sedikit musik untuk menemani kunjunganmu ♡", "A little music for your visit ♡"],
        ["Waktu Bersantai", "Relaxing Time"],
        ["Santai dan Rileks", "Chill & Relax"],
        ["Lagu Kesukaanku", "My Favorite Song"],
        ["Daftar Kesukaan", "Favorite Playlist"],
        ["Kenangan Manis", "Sweet Memories"],
        ["Lembut dan Menenangkan", "Soft & Dreamy"],

        // FOOTER
        [
            "Terus belajar, berkarya, dan menjadi versi terbaik dari diri sendiri",
            "Keep learning, creating, and becoming the best version of yourself"
        ]
    ];

    const toEnglish = new Map();
    const toIndonesian = new Map();

    function normalize(value) {
        return value.replace(/\s+/g, " ").trim();
    }

    // Kamus tidak membiarkan pasangan duplikat menimpa data sebelumnya.
    translations.forEach(([indonesian, english]) => {
        const idKey = normalize(indonesian);
        const enKey = normalize(english);

        if (!toEnglish.has(idKey)) {
            toEnglish.set(idKey, english);
        }

        if (!toIndonesian.has(enKey)) {
            toIndonesian.set(enKey, indonesian);
        }
    });

    const originalText = new WeakMap();
    const originalAttributes = new WeakMap();

    // Menerjemahkan teks berdasarkan teks asli yang tersimpan.
    function translateNode(node, language) {
        if (!originalText.has(node)) {
            originalText.set(node, node.nodeValue);
        }

        const original = originalText.get(node);
        const key = normalize(original);

        const dictionary =
            language === "id" ? toIndonesian : toEnglish;

        const translated = dictionary.get(key);

        if (translated !== undefined) {
            const leading = original.match(/^\s*/)?.[0] || "";
            const trailing = original.match(/\s*$/)?.[0] || "";

            node.nodeValue = leading + translated + trailing;
        } else {
            node.nodeValue = original;
        }
    }

    // Menerjemahkan placeholder, title, dan aria-label.
    function translateAttributes(language) {
        const attributes = [
            "placeholder",
            "title",
            "aria-label"
        ];

        document.querySelectorAll("*").forEach(element => {
            attributes.forEach(attribute => {
                if (!element.hasAttribute(attribute)) return;

                if (!originalAttributes.has(element)) {
                    originalAttributes.set(element, {});
                }

                const saved = originalAttributes.get(element);

                if (!(attribute in saved)) {
                    saved[attribute] =
                        element.getAttribute(attribute);
                }

                const original = saved[attribute];
                const key = normalize(original);

                const dictionary =
                    language === "id" ? toIndonesian : toEnglish;

                element.setAttribute(
                    attribute,
                    dictionary.get(key) ?? original
                );
            });
        });
    }

    // Mengganti bahasa halaman.
    function translatePage(language) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        const nodes = [];
        let node;

        while ((node = walker.nextNode())) {
            const parent = node.parentElement;

            if (!parent) continue;

            if (
                ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)
            ) {
                continue;
            }

            if (parent.closest(".language-switch")) continue;

            nodes.push(node);
        }

        nodes.forEach(textNode => {
            translateNode(textNode, language);
        });

        translateAttributes(language);

        document.documentElement.lang = language;

        const idButton = document.getElementById("lang-id");
        const enButton = document.getElementById("lang-en");

        if (idButton) {
            idButton.classList.toggle("active", language === "id");
        }

        if (enButton) {
            enButton.classList.toggle("active", language === "en");
        }

        try {
            localStorage.setItem("portfolioLanguage", language);
        } catch (error) {
            console.warn("Bahasa tidak dapat disimpan:", error);
        }

        window.portfolioLanguage = language;
        window.changeTypingLanguage?.(language);
        if (window.translateLyrics) {
    window.translateLyrics(language);
}

    }




    // Perbarui teks animasi Home saat bahasa diganti
if (typeof window.changeTypingLanguage === "function") {
    window.changeTypingLanguage(language);
}




    // Membuat tombol bahasa.
    function createLanguageButton() {
        const nav = document.querySelector("header nav");

        if (!nav || document.querySelector(".language-switch")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "language-switch";

        wrapper.innerHTML = `
            <button type="button" id="lang-id" class="active">ID</button>
            <span>|</span>
            <button type="button" id="lang-en">EN</button>
        `;

        const themeButton = nav.querySelector("#theme-toggle");

        if (themeButton) {
            themeButton.insertAdjacentElement("afterend", wrapper);
        } else {
            nav.appendChild(wrapper);
        }

        wrapper.querySelector("#lang-id").addEventListener("click", () => {
            translatePage("id");
        });

        wrapper.querySelector("#lang-en").addEventListener("click", () => {
            translatePage("en");
        });
    }

    // Menjalankan fitur bahasa saat halaman siap.
    function initializeLanguage() {
        createLanguageButton();

        let language = "id";

        try {
            language =
                localStorage.getItem("portfolioLanguage") || "id";
        } catch (error) {
            language = "id";
        }

        translatePage(language);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeLanguage
        );
    } else {
        initializeLanguage();
    }
})();










// FIX JUDUL BAGIAN CONTACT
function fixContactTitle() {
    const language = window.portfolioLanguage || "id";
    const contactSection = document.querySelector("#contact");

    if (!contactSection) return;

    const heading = contactSection.querySelector("h1, h2, h3");

    if (heading) {
        heading.textContent =
            language === "en" ? "My Contact" : "Kontak Saya";
    }
}

// Jalankan saat halaman dibuka
fixContactTitle();

// Jalankan lagi saat bahasa diganti
document.getElementById("lang-id")?.addEventListener("click", () => {
    setTimeout(fixContactTitle, 0);
});

document.getElementById("lang-en")?.addEventListener("click", () => {
    setTimeout(fixContactTitle, 0);
});












/* ==========================================
   TAMBAHAN NAVBAR HP AUTO HIDE
   Laptop tetap seperti semula
========================================== */

(() => {
    const header = document.querySelector("header");

    if (!header) return;

    let lastY = window.scrollY;
    let busy = false;

    function updateMobileNavbar() {
        const currentY = window.scrollY;
        const mobile = window.matchMedia("(max-width: 600px)").matches;

        if (!mobile) {
            header.classList.remove("mobile-nav-hidden");
            lastY = currentY;
            busy = false;
            return;
        }

        if (currentY <= 30) {
            header.classList.remove("mobile-nav-hidden");
        } else if (currentY > lastY + 5) {
            header.classList.add("mobile-nav-hidden");
        } else if (currentY < lastY - 5) {
            header.classList.remove("mobile-nav-hidden");
        }

        lastY = currentY;
        busy = false;
    }

    window.addEventListener("scroll", () => {
        if (busy) return;

        busy = true;
        window.requestAnimationFrame(updateMobileNavbar);
    }, { passive: true });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
            header.classList.remove("mobile-nav-hidden");
        }
    });
})();








// Terjemahan teks intro portfolio
document.addEventListener("DOMContentLoaded", function () {
    function translateIntro(language) {
        document.querySelectorAll("[data-id][data-en]").forEach(function (element) {
            element.textContent = element.getAttribute(
                language === "en" ? "data-en" : "data-id"
            );
        });
    }

    // Ikuti bahasa yang tersimpan
    const savedLanguage = localStorage.getItem("portfolioLanguage") || "id";
    translateIntro(savedLanguage);

    // Ganti teks ketika tombol bahasa diklik
    document.addEventListener("click", function (event) {
        if (event.target.closest("#lang-en")) {
            translateIntro("en");
        }

        if (event.target.closest("#lang-id")) {
            translateIntro("id");
        }
    });
});










/* TERJEMAHAN LIRIK LAGU ID / EN */
document.addEventListener("DOMContentLoaded", function () {
    const lyricsPanel = document.querySelector("#songLyricsPanel");
    if (!lyricsPanel) return;

    const lyrics = lyricsPanel.querySelector(".lyrics-scroll p");
    const title = lyricsPanel.querySelector("h4");

    if (!lyrics) return;

    const lyricsID = lyrics.innerHTML;

    const lyricsEN = `
        [Verse 1]<br>
        Now the night begins to fade<br>
        My heart feels cold<br>
        The night grows later and later<br>
        Without you by my side<br><br>

        [Pre-Chorus]<br>
        Tell me that you love me<br>
        I have missed you after all this time<br>
        These feelings have always stayed in my heart<br>
        Waiting for you to be here<br><br>

        [Chorus]<br>
        I love you so deeply<br>
        I cannot forget you<br>
        I will always wait for you<br>
        Your face is always on my mind<br><br>

        Deep inside my heart<br>
        I could never bear not being with you<br>
        You are the only one I will always wait for<br>
        No new love could ever take your place<br><br>

        [Outro]<br>
        How much longer must I wait?<br>
        Hoping for your sincere love, darling<br>
        Is there still room in your heart<br>
        For us to be together again?<br><br>
    `;

    window.translateLyrics = function (language) {
        lyrics.innerHTML = language === "en" ? lyricsEN : lyricsID;

        if (title) {
            title.textContent =
                language === "en" ? "♪ Song Lyrics" : "♪ Lirik Lagu";
        }
    };

    document.addEventListener("click", function (event) {
        if (event.target.closest("#lang-en")) {
            window.translateLyrics("en");
        } else if (event.target.closest("#lang-id")) {
            window.translateLyrics("id");
        }
    });

    window.translateLyrics(
        localStorage.getItem("portfolioLanguage") || "id"
    );
});
