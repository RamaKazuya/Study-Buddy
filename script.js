function showSection(sectionId) {
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Tampilkan section yang dipilih
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

let cropper;

// Elemen DOM
const profileIcon = document.getElementById("profile-icon");
const profileSidebar = document.getElementById("profile-sidebar");
const closeProfile = document.getElementById("close-profile");
const profileForm = document.getElementById("profile-form");
const profilePictureInput = document.getElementById("profile-picture");
const bgColorInput = document.getElementById("bg-color");
const cropModal = document.getElementById("crop-modal");
const imageToCrop = document.getElementById("image-to-crop");
const cropBtn = document.getElementById("crop-btn");
const closeModalBtn = document.querySelector(".close-btn");

// Sidebar Toggle
profileIcon.addEventListener("click", () => {
    if (profileSidebar.classList.contains("active")) {
        profileSidebar.classList.remove("active");
        profileIcon.classList.remove("active");
    } else {
        profileSidebar.classList.add("active");
        profileIcon.classList.add("active");
    }
});

// Tutup Sidebar dengan Tombol Close
closeProfile.addEventListener("click", () => {
    profileSidebar.classList.remove("active");
    profileIcon.classList.remove("active");
});

// Simpan Pengaturan Profil ke localStorage
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    const bgColor = bgColorInput.value;

    // Simpan ke localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email); // Menyimpan email
    localStorage.setItem("bio", bio);
    localStorage.setItem("bgColor", bgColor);

    // Simpan warna latar belakang
    document.body.style.backgroundColor = bgColor;

    alert(`Profil Anda diperbarui:\nNama: ${username}\nEmail: ${email}\nBio: ${bio}`);
});

// Upload dan Crop Gambar
profilePictureInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageToCrop.src = e.target.result;
            cropModal.style.display = "flex";

            // Tunggu hingga gambar dimuat sebelum inisialisasi Cropper
            imageToCrop.onload = () => {
                if (cropper) {
                    cropper.destroy(); // Hapus cropper sebelumnya jika ada
                }
                cropper = new Cropper(imageToCrop, {
                    aspectRatio: 1,
                    viewMode: 1,
                });
            };
        };
        reader.readAsDataURL(file);
    }
});

// Simpan hasil crop
cropBtn.addEventListener("click", () => {
    const canvas = cropper.getCroppedCanvas({
        width: 300, // Resolusi output yang diinginkan
        height: 300,
    });

    // Perbarui gambar profil
    profileIcon.src = canvas.toDataURL("image/png");

    // Simpan gambar hasil crop ke localStorage
    localStorage.setItem("profileImage", canvas.toDataURL("image/png"));

    // Tutup modal
    cropModal.style.display = "none";
    cropper.destroy();
    cropper = null;
});

// Tutup modal saat tombol tutup diklik
closeModalBtn.addEventListener("click", () => {
    cropModal.style.display = "none";
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
});

// Pulihkan Data Profil dari localStorage saat Halaman Dimuat
window.addEventListener("load", () => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email"); // Mengambil email dari localStorage
    const bio = localStorage.getItem("bio");
    const bgColor = localStorage.getItem("bgColor");
    const profileImage = localStorage.getItem("profileImage");

    // Pulihkan nama pengguna, email, bio, dan latar belakang
    if (username) document.getElementById("username").value = username;
    if (email) document.getElementById("email").value = email; // Pulihkan email
    if (bio) document.getElementById("bio").value = bio;
    if (bgColor) document.body.style.backgroundColor = bgColor;

    // Pulihkan gambar profil
    if (profileImage) profileIcon.src = profileImage;
});

// Fungsi Placeholder
function joinRoom() {
    alert("Anda bergabung ke ruang belajar!");
}

function startAIMode() {
    alert("Mode belajar dengan AI dimulai. Selamat belajar!");
}

