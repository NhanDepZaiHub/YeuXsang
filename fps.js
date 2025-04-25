// FPS Counter Implementation
document.addEventListener('DOMContentLoaded', function() {
    const fpsElement = document.getElementById('fps');
    
    // Biến để theo dõi FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;
    
    // Hàm tính toán FPS
    function calculateFPS(now) {
        frameCount++;
        
        // Cập nhật FPS mỗi 500ms
        if (now - lastTime >= 500) {
            // Chuyển đổi 500ms thành giây và nhân với số frame
            fps = Math.round((frameCount * 1000) / (now - lastTime));
            
            // Cập nhật hiển thị FPS
            fpsElement.textContent = fps;
            
            // Đặt lại bộ đếm
            frameCount = 0;
            lastTime = now;
        }
        
        // Đổi màu dựa trên giá trị FPS
        if (fps >= 50) {
            fpsElement.style.color = '#4CAF50'; // Màu xanh cho FPS cao
        } else if (fps >= 30) {
            fpsElement.style.color = '#FFC107'; // Màu vàng cho FPS trung bình
        } else {
            fpsElement.style.color = '#F44336'; // Màu đỏ cho FPS thấp
        }
        
        requestAnimationFrame(calculateFPS);
    }
    
    // Bắt đầu đo FPS
    requestAnimationFrame(calculateFPS);
});
