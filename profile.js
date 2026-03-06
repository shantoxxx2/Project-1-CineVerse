<script src="profile.js"></script>
// profile.js - CineVerse প্রোফাইল পেজের জন্য

document.addEventListener('DOMContentLoaded', function() {
  // প্রোফাইল ট্যাব সুইচ
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab') || 'overview';
  switchTab(tab);

  function switchTab(tabId) {
    console.log('Switching to tab:', tabId);
    
    // সব ট্যাব লুকান
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.style.display = 'none';
    });
    
    // সিলেক্টেড ট্যাব দেখান
    const selectedTab = document.getElementById(`tab-${tabId}`);
    if (selectedTab) {
      selectedTab.style.display = 'block';
    }
    
    // ট্যাব বাটন আপডেট
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
  }

  // প্রোফাইল পেজের জন্য অন্যান্য ফাংশন (যেমন openEditProfile, saveSettings ইত্যাদি)
  window.openEditProfile = function() {
    alert('Edit profile feature coming soon!');
  };
  window.saveSettings = function() {
    alert('Settings saved successfully!');
  };
});