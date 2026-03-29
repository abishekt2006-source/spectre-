// Chart Simulator - Creates realistic medical data visualizations

class ChartSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.data = [];
        this.animate = true;
    }

    drawECG() {
        if (!this.canvas) return;

        const clearCanvas = () => {
            this.ctx.fillStyle = 'rgba(15, 20, 25, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        };

        const drawGrid = () => {
            this.ctx.strokeStyle = 'rgba(74, 157, 111, 0.1)';
            this.ctx.lineWidth = 0.5;

            // Vertical lines
            for (let i = 0; i < this.width; i += 20) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i, this.height);
                this.ctx.stroke();
            }

            // Horizontal lines
            for (let i = 0; i < this.height; i += 20) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(this.width, i);
                this.ctx.stroke();
            }
        };

        const drawWaveform = (offset) => {
            this.ctx.strokeStyle = '#5db87f';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            const centerY = this.height / 2;
            const waveLength = 60;
            const amplitude = 40;

            // Get patient-specific variation
            let patientVariation = 1.0;
            if (this.patientId) {
                const patient = getPatientById(this.patientId);
                if (patient && patient.status === 'critical') {
                    patientVariation = 1.5; // More erratic for critical
                } else if (patient && patient.status === 'warning') {
                    patientVariation = 1.2; // Slightly irregular for warning
                }
            }

            for (let x = 0; x < this.width; x++) {
                let y = centerY;

                // Create ECG-like pattern
                const normalizedX = (x + offset) / waveLength;
                const phase = normalizedX % 1;

                if (phase < 0.15) {
                    // P wave
                    y -= Math.sin(phase / 0.15 * Math.PI) * (amplitude * 0.3 * patientVariation);
                } else if (phase < 0.3) {
                    // PR segment
                    y = centerY;
                } else if (phase < 0.45) {
                    // QRS complex (main spike)
                    const t = (phase - 0.3) / 0.15;
                    if (t < 0.5) {
                        y -= Math.sin(t * Math.PI) * amplitude * patientVariation;
                    } else {
                        y += Math.sin((t - 0.5) * Math.PI) * (amplitude * 0.6 * patientVariation);
                    }
                } else if (phase < 0.65) {
                    // T wave
                    const t = (phase - 0.45) / 0.2;
                    y -= Math.sin(t * Math.PI) * (amplitude * 0.4 * patientVariation);
                } else {
                    // Baseline
                    y = centerY;
                }

                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }

            this.ctx.stroke();
        };

        const animate = (timestamp) => {
            if (!this.animate) return;

            clearCanvas();
            drawGrid();
            
            // Scroll the waveform
            const offset = (timestamp / 50) % 60;
            drawWaveform(offset);

            // Draw labels
            this.ctx.fillStyle = '#a8b5c5';
            this.ctx.font = '12px system-ui';
            this.ctx.fillText('Time (sec)', this.width - 80, this.height - 5);
            this.ctx.fillText('Voltage (mV)', 5, 15);

            requestAnimationFrame(animate);
        };

        animate(0);
    }

    drawRespiratory() {
        if (!this.canvas) return;

        const clearCanvas = () => {
            this.ctx.fillStyle = 'rgba(15, 20, 25, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        };

        const drawGrid = () => {
            this.ctx.strokeStyle = 'rgba(74, 157, 111, 0.08)';
            this.ctx.lineWidth = 0.5;

            for (let i = 0; i < this.width; i += 25) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i, this.height);
                this.ctx.stroke();
            }

            for (let i = 0; i < this.height; i += 25) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(this.width, i);
                this.ctx.stroke();
            }
        };

        const drawWaveform = (offset) => {
            this.ctx.strokeStyle = '#4a9d6f';
            this.ctx.lineWidth = 2.5;
            this.ctx.beginPath();

            const centerY = this.height / 2;
            const waveLength = 80;
            const amplitude = 35;

            // Get respiratory rate from patient if available
            let respiratoryVariation = 1.0;
            if (this.patientId) {
                const patient = getPatientById(this.patientId);
                if (patient) {
                    // Adjust wave length based on respiratory rate
                    const normalRate = 16;
                    respiratoryVariation = patient.vitals.respiratoryRate / normalRate;
                }
            }

            for (let x = 0; x < this.width; x++) {
                const normalizedX = (x + offset) / (waveLength / respiratoryVariation);
                const phase = normalizedX % 1;
                
                // Smooth inhalation and exhalation with slight noise
                const breathCycle = Math.sin(phase * Math.PI * 2);
                const noise = Math.sin(normalizedX * 15) * 2;
                const y = centerY - (breathCycle * amplitude) - noise;

                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }

            this.ctx.stroke();
        };

        const animate = (timestamp) => {
            if (!this.animate) return;

            clearCanvas();
            drawGrid();
            
            const offset = (timestamp / 80) % 80;
            drawWaveform(offset);

            // Draw labels
            this.ctx.fillStyle = '#a8b5c5';
            this.ctx.font = '12px system-ui';
            this.ctx.fillText('Respiratory Rate', 5, 15);
            this.ctx.fillText('Time', this.width - 50, this.height - 5);

            requestAnimationFrame(animate);
        };

        animate(0);
    }

    drawBloodPressure() {
        if (!this.canvas) return;

        const clearCanvas = () => {
            this.ctx.fillStyle = 'rgba(15, 20, 25, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        };

        const drawBars = (offset) => {
            const barWidth = 30;
            const barSpacing = 40;
            const centerY = this.height / 2;

            this.ctx.fillStyle = 'rgba(111, 168, 220, 0.2)';
            this.ctx.strokeStyle = '#6fa8dc';
            this.ctx.lineWidth = 1.5;

            for (let i = 0; i < this.width; i += barSpacing) {
                const xPos = (i + offset) % this.width;
                const variation = Math.sin((i + offset) / 100) * 0.3;
                const systolicHeight = this.height * 0.4 * (0.8 + variation);
                const diastolicHeight = this.height * 0.25 * (0.8 + variation);

                // Systolic bar (larger)
                this.ctx.fillRect(xPos, centerY - systolicHeight, barWidth * 0.4, systolicHeight);

                // Diastolic bar (smaller)
                this.ctx.fillRect(xPos + barWidth * 0.5, centerY - diastolicHeight, barWidth * 0.4, diastolicHeight);
            }
        };

        const animate = (timestamp) => {
            if (!this.animate) return;

            clearCanvas();
            
            const offset = (timestamp / 100) % 100;
            drawBars(offset);

            // Draw legend
            this.ctx.fillStyle = '#a8b5c5';
            this.ctx.font = '12px system-ui';
            this.ctx.fillText('Blood Pressure Trend', 5, 15);

            requestAnimationFrame(animate);
        };

        animate(0);
    }

    // Draw realistic lungs with breathing animation
    drawLungs() {
        if (!this.canvas) return;

        const animate = (startTime) => {
            const elapsed = (Date.now() - startTime) / 1000;
            const breathingCycle = 4; // 4 second breathing cycle
            const breathPhase = (elapsed % breathingCycle) / breathingCycle;

            // Clear canvas
            this.ctx.fillStyle = 'rgba(15, 20, 25, 0.8)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Draw title
            this.ctx.fillStyle = '#a8b5c5';
            this.ctx.font = 'bold 14px system-ui';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Lung Breathing Animation', this.width / 2, 20);

            // Breathing expansion (0-0.5 = inhale, 0.5-1 = exhale)
            let expansion = Math.sin(breathPhase * Math.PI * 2) * 0.15;
            expansion = (expansion + 1) * 0.5; // Normalize to 0.5-1.5

            // Left lung
            this.drawLung(100, this.height / 2, 60, expansion, true);

            // Right lung
            this.drawLung(this.width - 100, this.height / 2, 60, expansion, false);

            // Draw breathing label
            const breathLabel = breathPhase < 0.5 ? 'INHALING' : 'EXHALING';
            const breathColor = breathPhase < 0.5 ? '#5db87f' : '#e8a668';
            this.ctx.fillStyle = breathColor;
            this.ctx.font = '12px system-ui';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(breathLabel, this.width / 2, this.height - 15);

            // Draw oxygen percentage
            const oxygen = Math.round(95 + Math.sin(breathPhase * Math.PI * 2) * 3);
            this.ctx.fillStyle = '#6fa8dc';
            this.ctx.font = '11px system-ui';
            this.ctx.fillText(`O2: ${oxygen}%`, this.width / 2, this.height - 30);

            if (this.animate) {
                requestAnimationFrame(() => this.animate ? animate(startTime) : null);
            }
        };

        animate(Date.now());
    }

    // Helper function to draw a single lung
    drawLung(x, y, radius, expansion, isLeft) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.scale(expansion, expansion);

        // Lung body (left and right lobes)
        const gradient = this.ctx.createLinearGradient(-radio, -radius, radius, radius);
        gradient.addColorStop(0, 'rgba(90, 200, 150, 0.4)');
        gradient.addColorStop(0.5, 'rgba(93, 184, 127, 0.6)');
        gradient.addColorStop(1, 'rgba(74, 157, 111, 0.4)');

        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = '#4a9d6f';
        this.ctx.lineWidth = 2;

        if (isLeft) {
            // Left lung (upper and lower lobes with separation)
            this.ctx.beginPath();
            this.ctx.arc(-20, -15, radius * 0.6, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.arc(-20, 25, radius * 0.8, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else {
            // Right lung (upper, middle, and lower lobes)
            this.ctx.beginPath();
            this.ctx.arc(20, -20, radius * 0.6, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.arc(20, 5, radius * 0.7, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.arc(20, 30, radius * 0.7, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        }

        // Draw trachea (only on initialization)
        this.ctx.strokeStyle = '#5db87f';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -radius - 10);
        this.ctx.lineTo(0, -radius);
        this.ctx.stroke();

        this.ctx.restore();

        // Label
        this.ctx.fillStyle = '#a8b5c5';
        this.ctx.font = '12px system-ui';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(isLeft ? 'Left' : 'Right', x, y + radius + 30);
    }
}

// Fix typo in drawLung
ChartSimulator.prototype.drawLung = function(x, y, radius, expansion, isLeft) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.scale(expansion, expansion);

    // Lung body gradient
    const gradient = this.ctx.createLinearGradient(-radius, -radius, radius, radius);
    gradient.addColorStop(0, 'rgba(90, 200, 150, 0.4)');
    gradient.addColorStop(0.5, 'rgba(93, 184, 127, 0.6)');
    gradient.addColorStop(1, 'rgba(74, 157, 111, 0.4)');

    this.ctx.fillStyle = gradient;
    this.ctx.strokeStyle = '#4a9d6f';
    this.ctx.lineWidth = 2;

    if (isLeft) {
        // Left lung - 2 lobes
        this.ctx.beginPath();
        this.ctx.arc(-15, -12, radius * 0.55, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(-15, 22, radius * 0.75, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        // Lobe separation line
        this.ctx.strokeStyle = '#4a9d6f';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(-15, 5);
        this.ctx.lineTo(-15, -5);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    } else {
        // Right lung - 3 lobes
        this.ctx.beginPath();
        this.ctx.arc(15, -15, radius * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(15, 8, radius * 0.65, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(15, 28, radius * 0.65, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        // Lobe separations
        this.ctx.strokeStyle = '#4a9d6f';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(15, -3);
        this.ctx.lineTo(15, 3);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(15, 18);
        this.ctx.lineTo(15, 22);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    // Draw trachea
    this.ctx.strokeStyle = '#5db87f';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -radius - 8);
    this.ctx.lineTo(0, -radius);
    this.ctx.stroke();

    this.ctx.restore();

    // Label below lung
    this.ctx.fillStyle = '#a8b5c5';
    this.ctx.font = '11px system-ui';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(isLeft ? 'Left Lung' : 'Right Lung', x, y + radius + 35);
};


// Initialize charts when document is ready
document.addEventListener('DOMContentLoaded', function() {
    const patientId = sessionStorage.getItem('selectedPatientId') || 'PAT-2024-001';
    
    // ECG Chart
    const ecgChart = new ChartSimulator('ecgChart');
    ecgChart.patientId = patientId;
    ecgChart.drawECG();

    // Respiratory Chart
    const respChart = new ChartSimulator('respiratoryChart');
    respChart.patientId = patientId;
    respChart.drawRespiratory();

    // Lung Animation
    const lungChart = new ChartSimulator('lungChart');
    lungChart.patientId = patientId;
    lungChart.animate = true;
    lungChart.drawLungs();
});

// Stop animations when page is hidden
document.addEventListener('visibilitychange', function() {
    const charts = document.querySelectorAll('canvas');
    charts.forEach(canvas => {
        const simulator = new ChartSimulator(canvas.id);
        simulator.animate = !document.hidden;
    });
});
