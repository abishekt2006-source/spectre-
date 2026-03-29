document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Login Logic ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Dummy authentication: always succeed and redirect
            window.location.href = 'dashboard.html';
        });
    }

    // --- 2. Dashboard Logic ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // --- 3. ECG Canvas Drawing ---
    const canvas = document.getElementById('ecgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Resize canvas to match display size
        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let x = 0;
        const speed = 2; // pixel speed per frame
        // Colors from CSS root variables
        const ecgColor = '#4C7256'; // Muted Green line
        const clearColor = '#161618'; // Match dashboard background

        ctx.lineWidth = 1.5;
        // Basic heart beat baseline pattern
        // Consists of flat line, P wave, QRS complex, T wave
        let yOffset = canvas.height / 2;
        
        function getNextY(currentX) {
            // cycle repeats every 300px roughly
            const cycleX = currentX % 300;
            const baseY = canvas.height / 2;
            
            // Generate a classic looking heartbeat waveform (not neon, solid line)
            if (cycleX > 100 && cycleX < 110) {
                // P-wave
                return baseY - Math.sin((cycleX - 100) * Math.PI / 10) * 10;
            } else if (cycleX >= 130 && cycleX < 135) {
                // Q-dip
                return baseY + 10;
            } else if (cycleX >= 135 && cycleX < 145) {
                // R-peak
                return baseY - 60;
            } else if (cycleX >= 145 && cycleX < 155) {
                // S-dip
                return baseY + 20;
            } else if (cycleX >= 180 && cycleX < 210) {
                // T-wave
                return baseY - Math.sin((cycleX - 180) * Math.PI / 30) * 15;
            } else {
                // Baseline with slight noise
                return baseY + (Math.random() * 2 - 1);
            }
        }

        let lastY = getNextY(0);
        
        function drawECG() {
            // Clear ahead of the drawing line to create a "refreshing" effect
            ctx.clearRect(x + speed, 0, 20, canvas.height);
            
            ctx.beginPath();
            ctx.strokeStyle = ecgColor;
            ctx.moveTo(x, lastY);
            
            x += speed;
            if (x >= canvas.width) {
                x = 0;
                lastY = getNextY(x);
                ctx.moveTo(x, lastY);
            }
            
            const newY = getNextY(x);
            ctx.lineTo(x, newY);
            ctx.stroke();
            lastY = newY;
            
            requestAnimationFrame(drawECG);
        }
        
        // Start animation
        requestAnimationFrame(drawECG);
        
        // Random BPM updates between 71 and 75 to look alive
        const bpmElement = document.getElementById('bpmValue');
        setInterval(() => {
            const randomDelta = Math.floor(Math.random() * 5) - 2; 
            bpmElement.innerText = 72 + randomDelta;
        }, 3000);
    }

    // --- 4. Audio Controls Fake Implementation ---
    const playBtns = document.querySelectorAll('.play-btn');
    if (playBtns.length > 0) {
        // Inject elements for audio bars into each wave container
        document.querySelectorAll('.audio-wave').forEach(wave => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            wave.appendChild(bar);
        });

        playBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const waveElem = document.getElementById('wave-' + targetId);
                const statusElem = this.parentElement.querySelector('.audio-status');
                
                // Toggle state
                if (waveElem.classList.contains('playing')) {
                    waveElem.classList.remove('playing');
                    this.textContent = 'Play Audio';
                    this.classList.remove('playing-state');
                    statusElem.textContent = 'Idle';
                    statusElem.style.color = 'var(--text-muted)';
                } else {
                    // Turn off any currently playing
                    playBtns.forEach(otherBtn => {
                        if (otherBtn !== this) {
                            const otherTarget = otherBtn.getAttribute('data-target');
                            document.getElementById('wave-' + otherTarget).classList.remove('playing');
                            otherBtn.textContent = 'Play Audio';
                            otherBtn.parentElement.querySelector('.audio-status').textContent = 'Idle';
                        }
                    });
                    
                    waveElem.classList.add('playing');
                    this.textContent = 'Stop Audio';
                    statusElem.textContent = 'Playing...';
                    statusElem.style.color = 'var(--accent-blue)';
                }
            });
        });
    }

});
