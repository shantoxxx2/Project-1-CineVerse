// ========== CineVerse Main JavaScript ==========

document.addEventListener('DOMContentLoaded', function() {
  // ========== AUTHENTICATION ELEMENTS ==========
  const authContainer = document.getElementById('authContainer');
  const appContainer = document.getElementById('appContainer');
  
  // Tab switching
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // ========== PASSWORD TOGGLE FUNCTIONALITY ==========
  const toggleLogin = document.getElementById('toggleLoginPassword');
  const loginPwd = document.getElementById('loginPassword');
  const toggleReg = document.getElementById('toggleRegPassword');
  const regPwd = document.getElementById('regPassword');

  if (toggleLogin) {
    toggleLogin.addEventListener('click', function() {
      if (loginPwd.type === 'password') { 
        loginPwd.type = 'text'; 
        toggleLogin.classList.replace('fa-eye-slash', 'fa-eye'); 
      } else { 
        loginPwd.type = 'password'; 
        toggleLogin.classList.replace('fa-eye', 'fa-eye-slash'); 
      }
    });
  }

  if (toggleReg) {
    toggleReg.addEventListener('click', function() {
      if (regPwd.type === 'password') { 
        regPwd.type = 'text'; 
        toggleReg.classList.replace('fa-eye-slash', 'fa-eye'); 
      } else { 
        regPwd.type = 'password'; 
        toggleReg.classList.replace('fa-eye', 'fa-eye-slash'); 
      }
    });
  }

  // ========== TAB SWITCHING ==========
  if (loginTab && signupTab) {
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active'); 
      signupTab.classList.remove('active');
      loginForm.style.display = 'block'; 
      signupForm.style.display = 'none';
    });

    signupTab.addEventListener('click', () => {
      signupTab.classList.add('active'); 
      loginTab.classList.remove('active');
      signupForm.style.display = 'block'; 
      loginForm.style.display = 'none';
    });
  }

  // ========== LOGIN/REGISTER BUTTONS ==========
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      authContainer.style.display = 'none';
      appContainer.style.display = 'flex';
      loadDashboard('Discover', 'discover');
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      authContainer.style.display = 'none';
      appContainer.style.display = 'flex';
      loadDashboard('Discover', 'discover');
    });
  }

  // ========== LOGOUT ==========
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      appContainer.style.display = 'none';
      authContainer.style.display = 'flex';
      // Reset to login tab
      if (loginTab) loginTab.click();
    });
  }

  // ========== DASHBOARD FUNCTIONS ==========
  
  // Generate dummy movies for categories
  function generateMovies(cat) {
    let movies = [];
    for (let i = 1; i <= 15; i++) {
      movies.push({ title: `${cat} ${i}` });
    }
    return movies;
  }

  const grid = document.getElementById('movieGrid');
  const categoryTitle = document.getElementById('categoryTitle');
  const videoSection = document.getElementById('videoPlayerSection');
  const dashboardDefault = document.getElementById('dashboardDefault');
  const mainVideo = document.getElementById('mainVideo');
  const suggestedScroll = document.getElementById('suggestedScroll');

  // Load dashboard with category
  window.loadDashboard = function(catName = 'Discover', filter = 'discover') {
    if (categoryTitle) categoryTitle.innerText = catName;
    let movies = generateMovies(catName);
    
    if (grid) {
      grid.innerHTML = movies.map(m => `
        <div class="movie-card" data-video="play">
          <div class="poster-wrap">
            <i class="fas fa-film"></i>
            <div class="play-overlay"><i class="fas fa-play-circle"></i></div>
          </div>
          <div class="card-footer"><h4>${m.title}</h4></div>
        </div>
      `).join('');
      
      // Add click event to movie cards
      document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => showVideoPlayer());
      });
    }
  };

  // Show video player
  function showVideoPlayer() {
    if (dashboardDefault) dashboardDefault.style.display = 'none';
    if (videoSection) videoSection.style.display = 'block';
    
    // Load suggested content
    if (suggestedScroll) {
      suggestedScroll.innerHTML = '';
      for (let i = 0; i < 8; i++) {
        let card = document.createElement('div');
        card.className = 'suggest-card';
        card.innerHTML = `<div class="poster-placeholder"><i class="fas fa-play-circle" style="font-size:2.5rem; color:#8895aa;"></i></div><div style="padding:10px; color:white;">Suggestion ${i+1}</div>`;
        suggestedScroll.appendChild(card);
      }
    }
    
    // Setup HLS video
    if (mainVideo) {
      if (typeof Hls !== 'undefined' && Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
        hls.attachMedia(mainVideo);
      } else if (mainVideo.canPlayType('application/vnd.apple.mpegurl')) {
        mainVideo.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
      }
    }
  }

  // Show dashboard (hide video player)
  window.showDashboard = function() {
    if (dashboardDefault) dashboardDefault.style.display = 'block';
    if (videoSection) videoSection.style.display = 'none';
    if (mainVideo) mainVideo.pause();
  };

  // ========== HOME BUTTONS ==========
  const homeFromLogo = document.getElementById('homeFromLogo');
  const homeInMenu = document.getElementById('homeInMenu');
  const footerHome = document.getElementById('footerHome');
  const navDiscover = document.getElementById('navDiscover');

  if (homeFromLogo) {
    homeFromLogo.addEventListener('click', (e) => { 
      e.preventDefault(); 
      showDashboard(); 
    });
  }
  
  if (homeInMenu) {
    homeInMenu.addEventListener('click', showDashboard);
  }
  
  if (footerHome) {
    footerHome.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboard();
    });
  }
  
  if (navDiscover) {
    navDiscover.addEventListener('click', () => {
      loadDashboard('Discover', 'discover');
      showDashboard();
    });
  }

  // ========== CATEGORY CLICKS ==========
  document.querySelectorAll('[data-cat]').forEach(el => {
    el.addEventListener('click', (e) => {
      let cat = el.getAttribute('data-cat');
      let name = cat.replace(/-/g, ' ').replace(/tv/g, 'TV').replace(/all/i, 'All ');
      loadDashboard(name, cat);
      showDashboard();
      
      // Close sidebar on mobile
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    });
  });

  // ========== DROPDOWN TOGGLES ==========
  document.querySelectorAll('.dropdown-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      let targetId = header.getAttribute('data-dropdown');
      let menu = document.getElementById(targetId);
      if (menu) {
        menu.classList.toggle('show');
        let icon = header.querySelector('i.fa-chevron-down');
        if (icon) {
          icon.style.transform = menu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
        }
      }
    });
  });

  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  
  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // ========== VIDEO PLAYER CONTROLS ==========
  const video = mainVideo;
  const playBtn = document.getElementById('playPauseBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const fullBtn = document.getElementById('fullscreenBtn');
  const timeInfo = document.getElementById('timeInfo');
  const ccBtn = document.getElementById('ccBtn');

  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) { 
        video.play(); 
        playBtn.innerHTML = '<i class="fas fa-pause"></i>'; 
      } else { 
        video.pause(); 
        playBtn.innerHTML = '<i class="fas fa-play"></i>'; 
      }
    });
  }

  if (video && timeInfo) {
    video.addEventListener('timeupdate', () => {
      let min = Math.floor(video.currentTime / 60);
      let sec = Math.floor(video.currentTime % 60);
      let dmin = Math.floor(video.duration / 60) || 0;
      let dsec = Math.floor(video.duration % 60) || 0;
      timeInfo.innerText = `${min}:${sec < 10 ? '0' + sec : sec} / ${dmin}:${dsec < 10 ? '0' + dsec : dsec}`;
    });
  }

  if (volumeSlider && video) {
    volumeSlider.addEventListener('input', (e) => { 
      video.volume = e.target.value; 
    });
  }

  if (fullBtn && video) {
    fullBtn.addEventListener('click', () => { 
      if (video.requestFullscreen) video.requestFullscreen(); 
    });
  }

  if (ccBtn) {
    ccBtn.addEventListener('click', () => { 
      alert('CC subtitles would appear here in a production version'); 
    });
  }

  // Double click forward/back
  if (video) {
    video.addEventListener('dblclick', (e) => {
      const rect = video.getBoundingClientRect();
      if (e.clientX - rect.left < rect.width / 2) {
        video.currentTime -= 10;
      } else {
        video.currentTime += 10;
      }
    });
  }

  // ========== INITIAL LOAD ==========
  loadDashboard('Discover', 'discover');
  if (videoSection) videoSection.style.display = 'none';
  if (dashboardDefault) dashboardDefault.style.display = 'block';
});

// প্রোফাইল পেজে ট্যাব প্যারামিটার পাঠানো
function openProfile(tab = 'overview') {
  window.location.href = `profile.html?tab=${tab}`;
}

// প্রোফাইল পেজে প্যারামিটার রিড করা
const urlParams = new URLSearchParams(window.location.search);
const tab = urlParams.get('tab') || 'overview';
switchTab(tab);