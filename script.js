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

const searchBtn = document.getElementById('searchBtn');
        const status = document.querySelector('.status');
        const spinner = document.querySelector('.spinner');
        const result = document.querySelector('.result');

        searchBtn.addEventListener('click', () => {
            status.style.display = 'block';
            spinner.style.display = 'block';
            result.style.display = 'none';
            searchBtn.disabled = true;
            searchBtn.style.backgroundColor = '#cccccc';
            
            setTimeout(() => {
                const users = ['Udin', 'Asep', 'Amat', 'Riski', 'Putra'];
                const matchedUser = users[Math.floor(Math.random() * users.length)];
                
                status.style.display = 'none';
                spinner.style.display = 'none';
                result.style.display = 'block';
                result.textContent = `You are matched with: ${matchedUser}`;
                searchBtn.disabled = false;
                searchBtn.style.backgroundColor = '#ff8c00';
            }, 3000); // Simulate 3 seconds of matchmaking
        });

        // Leaderboard data
        const players = [
            { rank: 1, name: "Kazuya", score: 20000 },
            { rank: 2, name: "Astro", score: 14500 },
            { rank: 3, name: "Faker", score: 14000 },
            { rank: 4, name: "Lunar", score: 13500 },
            { rank: 5, name: "Star", score: 13000 }
        ];

        // Populate leaderboard
        const leaderboardList = document.getElementById('leaderboard-list');
        players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="rank">#${player.rank}</span>
                <span class="name">${player.name}</span>
                <span class="score">${player.score}</span>
            `;
            leaderboardList.appendChild(listItem);
        });

        // Voice Interaction
        function startVoiceInteraction() {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function(event) {
                const userSpeech = event.results[0][0].transcript;
                document.getElementById('voiceOutput').textContent = `You: ${userSpeech}`;

                // Simulate AI Response
                setTimeout(() => {
                    const aiResponse = `I heard you say: "${userSpeech}". Here is what I think about that!`;
                    document.getElementById('voiceOutput').textContent += `\nAI: ${aiResponse}`;
                }, 2000);
            };

            recognition.onerror = function(event) {
                document.getElementById('voiceOutput').textContent = `Error: ${event.error}`;
            };
        }

        // Quiz
        function startQuiz() {
            const question = "What is the capital of Japan?";
            const answer = prompt(question);
            const response = answer.toLowerCase() === "tokyo" ? "Correct! Well done." : "Incorrect! The correct answer is Tokyo.";
            document.getElementById('quizOutput').textContent = response;
        }

        // ChatGPT-like Interaction
        async function askAI() {
            const question = document.getElementById('questionInput').value;
            if (!question.trim()) {
                document.getElementById('aiOutput').textContent = "Please enter a valid question.";
                return;
            }

            document.getElementById('aiOutput').textContent = "Processing your question...";

            // Simulate AI response (could be replaced by real API integration)
            const response = `Here is a detailed answer for your question: "${question}". Hope this helps!`;
            setTimeout(() => {
                document.getElementById('aiOutput').textContent = response;
            }, 2000);
        }

        const quests = [
            { id: 1, text: "Study with friend", points: 20, completed: false },
            { id: 2, text: "Study with AI", points: 20, completed: false },
            { id: 3, text: "Add 1 friend", points: 15, completed: false },
            { id: 4, text: "Read about website", points: 5, completed: false },
            { id: 5, text: "Share website", points: 50, completed: false },
        ];

        const questContainer = document.getElementById("quests");
        const completeButton = document.getElementById("completeButton");
        const timerElement = document.getElementById("timer");

        let timer = null;

        function renderQuests() {
            questContainer.innerHTML = "";
            quests.forEach((quest) => {
                const questElement = document.createElement("div");
                questElement.className = `quest ${quest.completed ? "completed" : ""}`;
                questElement.innerHTML = `
                    <span>${quest.text} <span class="points">+${quest.points}</span></span>
                    ${quest.completed ? "✔️" : ""}
                `;
                questElement.addEventListener("click", () => toggleQuest(quest.id));
                questContainer.appendChild(questElement);
            });
        }

        function toggleQuest(id) {
            const quest = quests.find((q) => q.id === id);
            if (quest) quest.completed = !quest.completed;
            renderQuests();
        }

        function completeAllQuests() {
            if (quests.every((q) => q.completed)) {
                questContainer.innerHTML = "";
                startTimer();
            } else {
                alert("Please complete all quests first.");
            }
        }

        function startTimer() {
            const endTime = new Date();
            endTime.setHours(24, 0, 0, 0);

            timer = setInterval(() => {
                const now = new Date();
                const remaining = endTime - now;

                if (remaining <= 0) {
                    clearInterval(timer);
                    timerElement.textContent = "";
                    resetQuests();
                    return;
                }

                const hours = String(Math.floor((remaining / (1000 * 60 * 60)) % 24)).padStart(2, "0");
                const minutes = String(Math.floor((remaining / (1000 * 60)) % 60)).padStart(2, "0");
                const seconds = String(Math.floor((remaining / 1000) % 60)).padStart(2, "0");

                timerElement.textContent = `Next quests in: ${hours}:${minutes}:${seconds}`;
            }, 1000);
        }

        function resetQuests() {
            quests.forEach((q) => (q.completed = false));
            renderQuests();
        }

        completeButton.addEventListener("click", completeAllQuests);

        renderQuests();

        // Fungsi Placeholder
function joinRoom() {
    alert("To Be Announcement");
}

function regist() {
    alert("You Have Pre-Registered");
}

function coming() {
    alert("Coming Soon");
}

function searchFriend() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const friends = document.querySelectorAll('.friend-item');

    friends.forEach(friend => {
        const name = friend.querySelector('.friend-details strong').textContent.toLowerCase();
        if (name.includes(searchValue)) {
            friend.style.display = 'flex';
        } else {
            friend.style.display = 'none';
        }
    });
}

function toggleFollow(button) {
    if (button.textContent === "Follow") {
        button.textContent = "Unfollow";
        button.style.backgroundColor = "#F57C00";
    } else {
        button.textContent = "Follow";
        button.style.backgroundColor = "#EF6C00";
    }
}

function refreshRecommendations() {
    const friendList = document.getElementById('friendList');
    const newRecommendations = [
        {
            name: 'Hifzi',
            details: 'Game - Pro Player',
            time: 'Offline'
        },
        {
            name: 'Anwar',
            details: 'Musik - DJ',
            time: 'Offline'
        },
        {
            name: 'Zaidan',
            details: 'Fitness - Athlete',
            time: 'Offline'
        },
        {
            name: 'An Nisa',
            details: 'Photography',
            time: 'OFfline'
        }
    ];

    friendList.innerHTML = '';

    newRecommendations.forEach(friend => {
        const friendItem = document.createElement('li');
        friendItem.classList.add('friend-item');
        friendItem.innerHTML = `
            <img src="0.png" alt="Avatar">
            <div class="friend-details">
                <strong>${friend.name}</strong>
                <span>${friend.details}</span>
                <span style="color: red;">${friend.time}</span>
            </div>
            <div class="friend-actions">
                <button onclick="followFriend(this, '${friend.name}', '${friend.details}', '${friend.time}')">Follow</button>
            </div>
        `;
        friendList.appendChild(friendItem);
    });
}

function followFriend(button, name, details, time) {
    // Change button text and disable it
    button.textContent = 'Following';
    button.style.backgroundColor = '#BDBDBD';
    button.disabled = true;

    // Add friend to the followed list
    const followedList = document.getElementById('followedList');

    const followedItem = document.createElement('li');
    followedItem.classList.add('followed-item');
    followedItem.innerHTML = `
        <img src="0.png" alt="Avatar">
        <div class="friend-details">
            <strong>${name}</strong>
            <span>${details}</span>
            <span style="color: green;">${time}</span>
        </div>
    `;

    followedList.appendChild(followedItem);
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (chatInput.value.trim() !== '') {
        const message = document.createElement('div');
        message.textContent = chatInput.value;
        message.style.padding = '10px';
        message.style.margin = '5px 0';
        message.style.background = '#FF9800';
        message.style.color = 'white';
        message.style.borderRadius = '5px';
        chatBody.appendChild(message);

        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

const profiles = [
    {
        name: "Alya Nur Medina",
        bio: "No Bio Yet.",
        img: "alya.jpg",
        social: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe"
        }
    },
    {
        name: "An Nisa Putri Cendana",
        bio: "No Bio Yet.",
        img: "annisa.jpg",
        social: {
            twitter: "https://twitter.com/janesmith",
            linkedin: "https://linkedin.com/in/janesmith",
            github: "https://github.com/janesmith"
        }
    },
    {
        name: "Muhammad Hidayatullah",
        bio: "No Bio Yet.",
        img: "dayat.jpg",
        social: {
            twitter: "https://twitter.com/alicejohnson",
            linkedin: "https://linkedin.com/in/alicejohnson",
            github: "https://github.com/alicejohnson"
        }
    },
    {
        name: "Muhammad Ade Ramadhani",
        bio: "Keberanian bukanlah ketiadaan rasa takut, tetapi kemampuan untuk mengatasi rasa takut.",
        img: "ade.jpg",
        social: {
            twitter: "https://twitter.com/alicejohnson",
            linkedin: "https://linkedin.com/in/alicejohnson",
            github: "https://github.com/alicejohnson"
        }
    }
    ,
    {
        name: "Achmad Fauzil 'Adhim",
        bio: "No Bio Yet.",
        img: "fauzil.jpg",
        social: {
            twitter: "https://twitter.com/alicejohnson",
            linkedin: "https://linkedin.com/in/alicejohnson",
            github: "https://github.com/alicejohnson"
        }
    }
];

function showProfile(index) {
    const profile = profiles[index];
    document.getElementById('profilePic').src = profile.img;
    document.getElementById('profileName').innerText = profile.name;
    document.getElementById('profileBio').innerText = profile.bio;
    document.getElementById('twitterLink').href = profile.social.twitter;
    document.getElementById('linkedinLink').href = profile.social.linkedin;
    document.getElementById('githubLink').href = profile.social.github;
}

