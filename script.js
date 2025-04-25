document.addEventListener('DOMContentLoaded', function() {
    // Các phần tử DOM
    const toggleMenuBtn = document.getElementById('toggle-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const modMenu = document.getElementById('mod-menu');
    const timeDisplay = document.getElementById('time-display');
    const systemSpecs = document.getElementById('system-specs');
    
    // Danh sách switch và checkbox
    const switches = Array.from({ length: 8 }, (_, i) => document.getElementById(`switch${i+1}`));
    const checkboxes = Array.from({ length: 5 }, (_, i) => document.getElementById(`checkbox${i+1}`));
    
    // Âm thanh
    const clickSound = new Audio();
    clickSound.src = 'https://www.soundjay.com/buttons/sounds/button-09.mp3';
    clickSound.volume = 0.5;
    
    const switchSound = new Audio();
    switchSound.src = 'https://www.soundjay.com/buttons/sounds/button-10.mp3';
    switchSound.volume = 0.3;
    
    const checkboxSound = new Audio();
    checkboxSound.src = 'https://www.soundjay.com/buttons/sounds/button-16.mp3';
    checkboxSound.volume = 0.3;
    
    // Đọc trạng thái đã lưu từ localStorage
    function loadSavedStates() {
        switches.forEach((switchEl, index) => {
            const savedState = localStorage.getItem(`switch${index+1}`);
            if (savedState !== null) {
                switchEl.checked = savedState === 'true';
            }
        });
        
        checkboxes.forEach((checkbox, index) => {
            const savedState = localStorage.getItem(`checkbox${index+1}`);
            if (savedState !== null) {
                checkbox.checked = savedState === 'true';
            }
        });
    }
    
    // Lưu trạng thái vào localStorage
    function saveState(id, isChecked) {
        localStorage.setItem(id, isChecked);
    }
    
    // Thêm event listener cho các switch và checkbox
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            switchSound.currentTime = 0;
            switchSound.play();
            saveState(this.id, this.checked);
            console.log(`Switch ${this.id} đã được ${this.checked ? 'bật' : 'tắt'}`);
        });
    });
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkboxSound.currentTime = 0;
            checkboxSound.play();
            saveState(this.id, this.checked);
            console.log(`Checkbox ${this.id} đã được ${this.checked ? 'chọn' : 'bỏ chọn'}`);
        });
    });
    
    // Hiển thị thời gian hiện tại
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Lấy thông tin cấu hình máy
    function getSystemInfo() {
        const info = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            pixelRatio: window.devicePixelRatio,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled
        };
        
        let html = '';
        for (const [key, value] of Object.entries(info)) {
            html += `<div><strong>${formatLabel(key)}:</strong> ${value}</div>`;
        }
        
        systemSpecs.innerHTML = html;
    }
    
    // Định dạng nhãn
    function formatLabel(key) {
        return key.replace(/([A-Z])/g, ' $1')
                 .replace(/^./, str => str.toUpperCase())
                 .replace(/([a-z])([A-Z])/g, '$1 $2');
    }
    
    // Mở/đóng menu
    toggleMenuBtn.addEventListener('click', function() {
        clickSound.currentTime = 0;
        clickSound.play();
        modMenu.classList.remove('hidden');
        getSystemInfo();
    });
    
    closeMenuBtn.addEventListener('click', function() {
        clickSound.currentTime = 0;
        clickSound.play();
        modMenu.classList.add('hidden');
    });
    
    // Cập nhật thời gian mỗi giây
    setInterval(updateTime, 1000);
    updateTime(); // Gọi lần đầu để hiển thị ngay lập tức
    
    // Tải trạng thái đã lưu
    loadSavedStates();
});
