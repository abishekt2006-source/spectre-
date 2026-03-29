// Main Script - Login and Dashboard Interactivity

// ========================
// LOGIN PAGE FUNCTIONALITY
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Store credentials in localStorage (in real app, validate with backend)
                localStorage.setItem('userLogged', 'true');
                localStorage.setItem('username', username);
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Handle logout buttons
    const logoutButtons = document.querySelectorAll('#logoutBtn, .logout-dropdown');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });

    // Check if user is logged in when on dashboard
    const isDashboard = document.body.contains(document.querySelector('.dashboard-container'));
    if (isDashboard && !localStorage.getItem('userLogged')) {
        window.location.href = 'index.html';
    }

    // Update profile with stored username
    if (isDashboard) {
        const username = localStorage.getItem('username');
        const profileBtn = document.querySelector('.avatar');
        if (profileBtn && username) {
            profileBtn.textContent = username.substring(0, 2).toUpperCase();
        }
    }

    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Handle notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            this.querySelector('.notification-badge').textContent = '0';
        });
    }

    // Handle search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // In a real app, this would filter patient data
            console.log('Searching for:', query);
        });
    }

    // Initialize dashboard data if on dashboard page
    if (isDashboard) {
        initDashboard();
        updateVitalsRealtime();
    }
});

// ========================
// DASHBOARD FUNCTIONALITY
// ========================

function initDashboard() {
    // Get patient ID from session storage or use default
    const patientId = sessionStorage.getItem('selectedPatientId') || 'PAT-2024-001';
    const patientData = getPatientById(patientId);

    if (!patientData) {
        console.error('Patient not found');
        return;
    }

    // Update patient information
    document.getElementById('patientName').textContent = patientData.name;
    document.getElementById('patientAge').textContent = patientData.age;
    document.getElementById('patientSex').textContent = patientData.sex;
    document.getElementById('patientBloodType').textContent = patientData.bloodType;
    document.getElementById('patientHeight').textContent = patientData.height;
    document.getElementById('patientWeight').textContent = patientData.weight;
    document.getElementById('patientBMI').textContent = patientData.bmi.toFixed(1);
    document.getElementById('patientHistory').textContent = patientData.medicalHistory;

    // Update vital signs
    updateVitalsFromPatientData(patientData);

    // Add patient navigation
    addPatientNavigation(patientId);
}

// Real-time vital signs update simulation
function updateVitalsRealtime() {
    setInterval(function() {
        const patientId = sessionStorage.getItem('selectedPatientId') || 'PAT-2024-001';
        const patientData = getPatientById(patientId);
        
        if (patientData) {
            // Simulate slightly varying vital signs based on patient condition
            const variation = patientData.status === 'stable' ? 2 : (patientData.status === 'warning' ? 5 : 10);
            
            const heartRate = patientData.vitals.heartRate + Math.floor((Math.random() - 0.5) * variation);
            const systolic = patientData.vitals.systolic + Math.floor((Math.random() - 0.5) * 4);
            const diastolic = patientData.vitals.diastolic + Math.floor((Math.random() - 0.5) * 4);
            const oxygen = patientData.vitals.oxygen + Math.floor((Math.random() - 0.5) * 2);
            const temperature = (patientData.vitals.temperature + (Math.random() - 0.5) * 0.4).toFixed(1);
            const breathingRate = patientData.vitals.respiratoryRate + Math.floor((Math.random() - 0.5) * 2);

            // Update vital cards
            const heartRateEl = document.getElementById('heartRate');
            const bloodPressureEl = document.getElementById('bloodPressure');
            const oxygenEl = document.getElementById('oxygen');
            const temperatureEl = document.getElementById('temperature');
            const breathingRateEl = document.getElementById('breathingRate');

            if (heartRateEl) heartRateEl.textContent = Math.max(40, heartRate);
            if (bloodPressureEl) bloodPressureEl.textContent = `${Math.max(80, systolic)}/${Math.max(40, diastolic)}`;
            if (oxygenEl) oxygenEl.textContent = Math.min(100, Math.max(85, oxygen));
            if (temperatureEl) temperatureEl.textContent = temperature;
            if (breathingRateEl) breathingRateEl.textContent = Math.max(10, breathingRate);
        }

        // Update charts in case they exist
        updateCharts();
    }, 5000); // Update every 5 seconds
}

function updateCharts() {
    // This will be handled by chart-simulator.js
    // Charts are updated in their own animation loops
}

function logout() {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add keyboard shortcuts (future enhancement)
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Esc to close sidebar on mobile
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

// Prevent multiple form submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.classList.contains('submitted')) {
        e.preventDefault();
        return false;
    }
    form.classList.add('submitted');
    setTimeout(() => form.classList.remove('submitted'), 1000);
});

// ===========================
// PATIENT-SPECIFIC FUNCTIONS
// ===========================

function updateVitalsFromPatientData(patientData) {
    // Update vital cards with patient's actual vital signs
    const heartRateEl = document.getElementById('heartRate');
    const bloodPressureEl = document.getElementById('bloodPressure');
    const oxygenEl = document.getElementById('oxygen');
    const temperatureEl = document.getElementById('temperature');
    const breathingRateEl = document.getElementById('breathingRate');

    if (heartRateEl) heartRateEl.textContent = patientData.vitals.heartRate;
    if (bloodPressureEl) bloodPressureEl.textContent = `${patientData.vitals.systolic}/${patientData.vitals.diastolic}`;
    if (oxygenEl) oxygenEl.textContent = patientData.vitals.oxygen;
    if (temperatureEl) temperatureEl.textContent = patientData.vitals.temperature;
    if (breathingRateEl) breathingRateEl.textContent = patientData.vitals.respiratoryRate;

    // Update status indicators based on vital values
    updateStatusIndicators(patientData);
}

function updateStatusIndicators(patientData) {
    // Update vital status badges based on values
    const vitalCards = document.querySelectorAll('.vital-card .vital-status');
    const vitals = patientData.vitals;

    vitalCards.forEach((card, index) => {
        switch(index) {
            case 0: // Heart Rate
                if (vitals.heartRate < 60 || vitals.heartRate > 100) {
                    card.className = 'vital-status warning';
                    card.textContent = 'Out of Range';
                } else {
                    card.className = 'vital-status normal';
                    card.textContent = 'Normal Range';
                }
                break;
            case 1: // Blood Pressure
                if (vitals.systolic > 140 || vitals.diastolic > 90) {
                    card.className = 'vital-status warning';
                    card.textContent = 'High';
                } else if (vitals.systolic < 90 || vitals.diastolic < 60) {
                    card.className = 'vital-status warning';
                    card.textContent = 'Low';
                } else {
                    card.className = 'vital-status normal';
                    card.textContent = 'Normal';
                }
                break;
            case 2: // Oxygen
                if (vitals.oxygen < 95) {
                    card.className = 'vital-status warning';
                    card.textContent = 'Low';
                } else {
                    card.className = 'vital-status normal';
                    card.textContent = 'Excellent';
                }
                break;
            case 3: // Temperature
                if (vitals.temperature < 97 || vitals.temperature > 99) {
                    card.className = 'vital-status warning';
                    card.textContent = 'Abnormal';
                } else {
                    card.className = 'vital-status normal';
                    card.textContent = 'Normal';
                }
                break;
        }
    });
}

function addPatientNavigation(patientId) {
    // Add patient selector in header or sidebar
    const allPatients = getAllPatients();
    const currentIndex = allPatients.findIndex(p => p.id === patientId);

    // Create or update patient navigation if needed
    const patientNav = document.querySelector('.patient-navigation');
    if (patientNav) {
        const prevBtn = patientNav.querySelector('.btn-prev-patient');
        const nextBtn = patientNav.querySelector('.btn-next-patient');

        if (prevBtn) {
            prevBtn.onclick = () => {
                if (currentIndex > 0) {
                    switchToPatient(allPatients[currentIndex - 1].id);
                }
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                if (currentIndex < allPatients.length - 1) {
                    switchToPatient(allPatients[currentIndex + 1].id);
                }
            };
        }
    }
}

function switchToPatient(patientId) {
    sessionStorage.setItem('selectedPatientId', patientId);
    location.reload(); // Reload page to show new patient data
}

// Load all patient data functions
function loadPatientFunctions() {
    // This ensures patient-data.js is loaded
    if (typeof PATIENTS_DATABASE === 'undefined') {
        console.warn('Patient database not loaded');
    }
}

// =============================
// MODAL & INTERACTIVE FEATURES
// =============================

// Wait for DOM to be ready, then setup modals
document.addEventListener('DOMContentLoaded', function() {
    setupModalHandlers();
    setupButtonHandlers();
    setupAlerts();
});

function setupModalHandlers() {
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Add Patient Modal
    const addPatientBtn = document.getElementById('addPatientBtn');
    const addPatientModal = document.getElementById('addPatientModal');
    const closeAddPatientModal = document.getElementById('closeAddPatientModal');
    const cancelAddPatient = document.getElementById('cancelAddPatient');
    const addPatientForm = document.getElementById('addPatientForm');

    if (addPatientBtn && addPatientModal) {
        addPatientBtn.addEventListener('click', function() {
            openModal(addPatientModal);
        });

        closeAddPatientModal.addEventListener('click', function() {
            closeModal(addPatientModal);
        });

        cancelAddPatient.addEventListener('click', function() {
            closeModal(addPatientModal);
        });

        addPatientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewPatient(this);
        });
    }

    // Reports Modal
    const reportsNavBtn = document.getElementById('reportsNavBtn');
    const reportsBtn = document.querySelector('.header-right [id*="reports"]');
    const reportsModal = document.getElementById('reportsModal');
    const closeReportsModal = document.getElementById('closeReportsModal');

    if ((reportsNavBtn || reportsBtn) && reportsModal) {
        const handleReportsClick = function() {
            openModal(reportsModal);
        };

        if (reportsNavBtn) reportsNavBtn.addEventListener('click', handleReportsClick);
        if (reportsBtn) reportsBtn.addEventListener('click', handleReportsClick);

        closeReportsModal.addEventListener('click', function() {
            closeModal(reportsModal);
        });

        // Add generate report buttons functionality
        const generateBtns = reportsModal.querySelectorAll('.btn-small.btn-primary');
        generateBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const reportName = this.parentElement.querySelector('h4').textContent;
                alert(`Generating ${reportName}... Report will be ready in moments.`);
            });
        });
    }

    // Alerts Modal
    const alertsNavBtn = document.getElementById('alertsNavBtn');
    const alertsHeaderBtn = document.getElementById('alertsBtn');
    const alertsModal = document.getElementById('alertsModal');
    const closeAlertsModal = document.getElementById('closeAlertsModal');

    if ((alertsNavBtn || alertsHeaderBtn) && alertsModal) {
        const handleAlertsClick = function() {
            openModal(alertsModal);
        };

        if (alertsNavBtn) alertsNavBtn.addEventListener('click', handleAlertsClick);
        if (alertsHeaderBtn) alertsHeaderBtn.addEventListener('click', handleAlertsClick);

        closeAlertsModal.addEventListener('click', function() {
            closeModal(alertsModal);
        });

        // Alert filter buttons
        const filterBtns = alertsModal.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // Filter alerts by type
                const filter = this.dataset.filter;
                filterAlerts(filter);
            });
        });

        // Acknowledge and Mark Done buttons
        const alertButtons = alertsModal.querySelectorAll('.alert-item button');
        alertButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const alertItem = this.closest('.alert-item');
                alertItem.style.opacity = '0.5';
                this.disabled = true;
                this.textContent = this.textContent.includes('Acknowledge') ? '✓ Acknowledged' : '✓ Done';
            });
        });
    }

    // Settings Modal
    const settingsNavBtn = document.getElementById('settingsNavBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModal = document.getElementById('closeSettingsModal');

    if (settingsNavBtn && settingsModal) {
        settingsNavBtn.addEventListener('click', function() {
            openModal(settingsModal);
        });

        closeSettingsModal.addEventListener('click', function() {
            closeModal(settingsModal);
        });

        // Settings toggle switches
        const toggleSwitches = settingsModal.querySelectorAll('.toggle-switch');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const label = this.parentElement.querySelector('label').textContent;
                console.log(`${label}: ${this.checked ? 'Enabled' : 'Disabled'}`);
            });
        });

        // Settings select dropdown
        const selects = settingsModal.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', function() {
                console.log('Setting updated:', this.value);
            });
        });
    }

    // Modal overlay click to close
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            const openModals = document.querySelectorAll('.modal.active');
            openModals.forEach(modal => closeModal(modal));
        });
    }
}

function setupButtonHandlers() {
    // Profile dropdown
    const profileBtn = document.querySelector('.profile-btn');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Logout from profile dropdown
    const logoutDropdownBtn = document.querySelector('.logout-dropdown');
    if (logoutDropdownBtn) {
        logoutDropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

function setupAlerts() {
    // This function can be expanded to add real-time alerts
    const alertCount = PATIENTS_DATABASE.filter(p => p.status === 'critical').length;
    const alertCountEl = document.getElementById('alertCount');
    if (alertCountEl) {
        alertCountEl.textContent = alertCount;
    }
}

function openModal(modal) {
    if (!modal) return;
    
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.add('active');
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('active');
    
    // Check if there are other active modals
    const activeModals = document.querySelectorAll('.modal.active');
    if (activeModals.length === 0) {
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    }
}

function addNewPatient(form) {
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData);

    // Create new patient object
    const newPatientId = 'PAT-2024-' + String(PATIENTS_DATABASE.length + 1).padStart(3, '0');
    const newPatient = {
        id: newPatientId,
        name: entries.name || 'Unknown',
        age: parseInt(entries.age) || 0,
        sex: entries.sex || 'Unknown',
        bloodType: entries.bloodType || 'Unknown',
        height: '5\'8"',
        weight: '175 lbs',
        bmi: 26.5,
        status: 'stable',
        admissionDate: new Date().toISOString().split('T')[0],
        room: entries.room || 'TBD',
        primaryDoctor: entries.doctor || 'Dr. Unknown',
        medicalHistory: 'New patient admission',
        diagnosis: entries.diagnosis || 'General Monitoring',
        medications: [],
        allergies: [],
        vitals: {
            heartRate: 72,
            systolic: 120,
            diastolic: 80,
            oxygen: 98,
            temperature: 98.6,
            respiratoryRate: 16
        },
        ecgStatus: 'Normal sinus rhythm',
        lungStatus: 'Clear bilaterally',
        lastVitalsUpdate: new Date().toISOString()
    };

    // Add to database
    PATIENTS_DATABASE.push(newPatient);

    // Close modal and show confirmation
    const modal = document.getElementById('addPatientModal');
    closeModal(modal);
    alert(`Patient ${newPatient.name} (${newPatientId}) has been successfully added!`);

    // Reset form
    form.reset();

    // Switch to new patient
    switchToPatient(newPatientId);
}

function filterAlerts(filter) {
    const alertsList = document.getElementById('alertsList');
    if (!alertsList) return;

    const alerts = alertsList.querySelectorAll('.alert-item');
    alerts.forEach(alert => {
        if (filter === 'all') {
            alert.style.display = 'flex';
        } else {
            const alertClass = `alert-${filter}`;
            if (alert.classList.contains(alertClass)) {
                alert.style.display = 'flex';
            } else {
                alert.style.display = 'none';
            }
        }
    });
}
