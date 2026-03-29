// Patients Manager - Handles patient list display and filtering

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    displayPatients(getAllPatients());
    setupFilters();
    setupSearch();
});

function displayPatients(patients) {
    const patientsGrid = document.getElementById('patientsGrid');
    patientsGrid.innerHTML = '';

    if (patients.length === 0) {
        patientsGrid.innerHTML = `
            <div class="no-patients" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="color: #a8b5c5; font-size: 1.1rem;">No patients found</p>
            </div>
        `;
        return;
    }

    patients.forEach(patient => {
        const patientCard = createPatientCard(patient);
        patientsGrid.appendChild(patientCard);
    });
}

function createPatientCard(patient) {
    const card = document.createElement('div');
    card.className = `patient-card status-${patient.status}`;
    
    const statusIcon = getStatusIcon(patient.status);
    const statusLabel = patient.status.charAt(0).toUpperCase() + patient.status.slice(1);

    card.innerHTML = `
        <div class="patient-card-header">
            <div class="patient-card-info">
                <h3>${patient.name}</h3>
                <p class="patient-id">${patient.id}</p>
            </div>
            <div class="status-badge status-${patient.status}">
                ${statusIcon}
                <span>${statusLabel}</span>
            </div>
        </div>

        <div class="patient-card-details">
            <div class="detail-row">
                <span class="label">Age:</span>
                <span class="value">${patient.age} yrs</span>
            </div>
            <div class="detail-row">
                <span class="label">Sex:</span>
                <span class="value">${patient.sex}</span>
            </div>
            <div class="detail-row">
                <span class="label">Blood Type:</span>
                <span class="value">${patient.bloodType}</span>
            </div>
            <div class="detail-row">
                <span class="label">Room:</span>
                <span class="value">${patient.room}</span>
            </div>
            <div class="detail-row">
                <span class="label">Primary Doctor:</span>
                <span class="value">${patient.primaryDoctor}</span>
            </div>
            <div class="detail-row diagnosis">
                <span class="label">Diagnosis:</span>
                <span class="value">${patient.diagnosis}</span>
            </div>
        </div>

        <div class="patient-card-vitals">
            <div class="vital-mini">
                <span class="label">HR</span>
                <span class="value">${patient.vitals.heartRate}</span>
                <span class="unit">bpm</span>
            </div>
            <div class="vital-mini">
                <span class="label">BP</span>
                <span class="value">${patient.vitals.systolic}/${patient.vitals.diastolic}</span>
                <span class="unit">mmHg</span>
            </div>
            <div class="vital-mini">
                <span class="label">O₂</span>
                <span class="value">${patient.vitals.oxygen}</span>
                <span class="unit">%</span>
            </div>
            <div class="vital-mini">
                <span class="label">Temp</span>
                <span class="value">${patient.vitals.temperature}</span>
                <span class="unit">°F</span>
            </div>
            <div class="vital-mini">
                <span class="label">RR</span>
                <span class="value">${patient.vitals.respiratoryRate}</span>
                <span class="unit">/min</span>
            </div>
        </div>

        <div class="patient-card-actions">
            <button class="btn-view-patient" onclick="viewPatient('${patient.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View Dashboard
            </button>
            <button class="btn-patient-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
            </button>
        </div>
    `;

    return card;
}

function getStatusIcon(status) {
    switch(status) {
        case 'critical':
            return '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>';
        case 'warning':
            return '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01" fill="white"></path></svg>';
        case 'stable':
            return '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>';
        default:
            return '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>';
    }
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value and display patients
            currentFilter = this.getAttribute('data-filter');
            const filteredPatients = getPatientsByStatus(currentFilter);
            displayPatients(filteredPatients);
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        
        if (query === '') {
            // Show all patients if search is empty
            const filteredPatients = getPatientsByStatus(currentFilter);
            displayPatients(filteredPatients);
        } else {
            // Search and filter combined
            const allResults = searchPatients(query);
            const filteredResults = allResults.filter(p => 
                currentFilter === 'all' || p.status === currentFilter
            );
            displayPatients(filteredResults);
        }
    });
}

function viewPatient(patientId) {
    // Store patient ID in session
    sessionStorage.setItem('selectedPatientId', patientId);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Logout functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutButtons = document.querySelectorAll('#logoutBtn, .logout-dropdown');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userLogged');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    });

    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
});
