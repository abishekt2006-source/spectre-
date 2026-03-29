// Comprehensive Patient Database with Various Diagnosticsconst PATIENTS_DATABASE = [
    // Patient 1: Stable cardiac patient
    {
        id: "PAT-2024-001",
        name: "John Anderson",
        age: 45,
        sex: "Male",
        bloodType: "O+",
        height: "6'0\"",
        weight: "180 lbs",
        bmi: 24.4,
        status: "stable",
        admissionDate: "2024-03-15",
        room: "245B",
        primaryDoctor: "Dr. Sarah Johnson",
        medicalHistory: "Hypertension, Type II Diabetes - Controlled",
        diagnosis: "Hypertension Management, Cardiac Monitoring",
        medications: [
            { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
            { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
            { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily" }
        ],
        allergies: ["Penicillin", "NSAIDs"],
        vitals: {
            heartRate: 72,
            systolic: 120,
            diastolic: 80,
            oxygen: 98,
            temperature: 98.6,
            respiratoryRate: 16
        },
        ecgStatus: "Normal sinus rhythm",
        lungStatus: "Clear bilaterally",
        lastVitalsUpdate: "2024-03-28T10:45:30Z"
    },

    // Patient 2: Critical condition
    {
        id: "PAT-2024-002",
        name: "Maria Sanchez",
        age: 52,
        sex: "Female",
        bloodType: "AB-",
        height: "5'5\"",
        weight: "165 lbs",
        bmi: 27.5,
        status: "critical",
        admissionDate: "2024-03-26",
        room: "301A",
        primaryDoctor: "Dr. Michael Chen",
        medicalHistory: "Atrial Fibrillation, Congestive Heart Failure (CHF)",
        diagnosis: "Acute Decompensated Heart Failure with Arrhythmia",
        medications: [
            { name: "Warfarin", dosage: "5mg", frequency: "Once daily" },
            { name: "Digoxin", dosage: "0.25mg", frequency: "Once daily" },
            { name: "Furosemide", dosage: "40mg", frequency: "Twice daily" },
            { name: "Carvedilol", dosage: "6.25mg", frequency: "Twice daily" }
        ],
        allergies: ["Sulfa drugs"],
        vitals: {
            heartRate: 105,
            systolic: 145,
            diastolic: 92,
            oxygen: 92,
            temperature: 99.2,
            respiratoryRate: 22
        },
        ecgStatus: "Atrial fibrillation with rapid ventricular response",
        lungStatus: "Bilateral crackles - pulmonary edema",
        lastVitalsUpdate: "2024-03-28T14:22:15Z"
    },

    // Patient 3: Post-surgery recovery
    {
        id: "PAT-2024-003",
        name: "Robert Thompson",
        age: 68,
        sex: "Male",
        bloodType: "B+",
        height: "5'11\"",
        weight: "195 lbs",
        bmi: 27.2,
        status: "warning",
        admissionDate: "2024-03-22",
        room: "215C",
        primaryDoctor: "Dr. Elizabeth Martinez",
        medicalHistory: "Type I Diabetes, Thyroid disorder",
        diagnosis: "Post-operative monitoring (CABG Surgery 3 days ago)",
        medications: [
            { name: "Insulin", dosage: "20U", frequency: "Twice daily" },
            { name: "Aspirin", dosage: "81mg", frequency: "Once daily" },
            { name: "Metoprolol", dosage: "25mg", frequency: "Twice daily" },
            { name: "Levothyroxine", dosage: "75mcg", frequency: "Once daily" }
        ],
        allergies: ["Latex"],
        vitals: {
            heartRate: 88,
            systolic: 135,
            diastolic: 85,
            oxygen: 96,
            temperature: 98.9,
            respiratoryRate: 18
        },
        ecgStatus: "Post-operative changes, no acute ischemia",
        lungStatus: "Clear with diminished bases bilaterally",
        lastVitalsUpdate: "2024-03-28T11:15:40Z"
    },

    // Patient 4: Respiratory compromise
    {
        id: "PAT-2024-004",
        name: "Jennifer Wu",
        age: 38,
        sex: "Female",
        bloodType: "A-",
        height: "5'7\"",
        weight: "142 lbs",
        bmi: 22.2,
        status: "critical",
        admissionDate: "2024-03-27",
        room: "320B",
        primaryDoctor: "Dr. James Wilson",
        medicalHistory: "Asthma, Environmental allergies, GERD",
        diagnosis: "Acute Severe Asthma Exacerbation, Hypoxemia",
        medications: [
            { name: "Albuterol", dosage: "2.5mg", frequency: "Every 4 hours" },
            { name: "Ipratropium", dosage: "500mcg", frequency: "Every 4 hours" },
            { name: "Prednisone", dosage: "40mg", frequency: "Once daily" },
            { name: "Omeprazole", dosage: "20mg", frequency: "Once daily" }
        ],
        allergies: ["Aspirin", "Penicillin", "Shellfish"],
        vitals: {
            heartRate: 118,
            systolic: 128,
            diastolic: 78,
            oxygen: 89,
            temperature: 98.4,
            respiratoryRate: 28
        },
        ecgStatus: "Sinus tachycardia",
        lungStatus: "Severe bilateral wheezing, decreased air movement",
        lastVitalsUpdate: "2024-03-28T15:45:22Z"
    },

    // Patient 5: Stable elderly patient
    {
        id: "PAT-2024-005",
        name: "George Davis",
        age: 78,
        sex: "Male",
        bloodType: "O-",
        height: "5'10\"",
        weight: "175 lbs",
        bmi: 25.1,
        status: "stable",
        admissionDate: "2024-03-10",
        room: "410A",
        primaryDoctor: "Dr. Patricia Lee",
        medicalHistory: "Hypertension, Dementia, Osteoarthritis",
        diagnosis: "Chronic disease management, Cognitive support care",
        medications: [
            { name: "Amlodipine", dosage: "5mg", frequency: "Once daily" },
            { name: "Hydrochlorothiazide", dosage: "25mg", frequency: "Once daily" },
            { name: "Donepezil", dosage: "10mg", frequency: "Once daily" },
            { name: "Acetaminophen", dosage: "650mg", frequency: "Every 6 hours" }
        ],
        allergies: ["Codeine"],
        vitals: {
            heartRate: 68,
            systolic: 138,
            diastolic: 82,
            oxygen: 97,
            temperature: 98.2,
            respiratoryRate: 15
        },
        ecgStatus: "Normal sinus rhythm with benign ectopy",
        lungStatus: "Clear to auscultation bilaterally",
        lastVitalsUpdate: "2024-03-28T09:30:50Z"
    },

    // Patient 6: Kidney disease patient
    {
        id: "PAT-2024-006",
        name: "Susan Mitchell",
        age: 55,
        sex: "Female",
        bloodType: "B+",
        height: "5'6\"",
        weight: "158 lbs",
        bmi: 25.6,
        status: "warning",
        admissionDate: "2024-03-18",
        room: "305C",
        primaryDoctor: "Dr. Hassan Mohamed",
        medicalHistory: "Chronic Kidney Disease Stage 3b, Hypertension, Anemia",
        diagnosis: "CKD Management, Fluid and Electrolyte Monitoring",
        medications: [
            { name: "Lisinopril", dosage: "20mg", frequency: "Once daily" },
            { name: "Iron Supplement", dosage: "325mg", frequency: "Once daily" },
            { name: "Vitamin D3", dosage: "1000IU", frequency: "Once daily" },
            { name: "Phosphate Binder", dosage: "667mg", frequency: "With meals" }
        ],
        allergies: ["ACE Inhibitor-related cough"],
        vitals: {
            heartRate: 82,
            systolic: 142,
            diastolic: 88,
            oxygen: 97,
            temperature: 98.5,
            respiratoryRate: 17
        },
        ecgStatus: "Normal sinus rhythm",
        lungStatus: "Clear bilaterally",
        lastVitalsUpdate: "2024-03-28T13:20:15Z"
    },

    // Patient 7: Stroke recovery
    {
        id: "PAT-2024-007",
        name: "Daniel Foster",
        age: 62,
        sex: "Male",
        bloodType: "AB+",
        height: "5'9\"",
        weight: "182 lbs",
        bmi: 26.9,
        status: "critical",
        admissionDate: "2024-03-24",
        room: "330A",
        primaryDoctor: "Dr. Rachel Khan",
        medicalHistory: "Atrial Fibrillation, Prior stroke, Hypertension",
        diagnosis: "Acute Ischemic Stroke (Day 4 post-admission), Rehabilitation",
        medications: [
            { name: "Warfarin", dosage: "7.5mg", frequency: "Once daily" },
            { name: "Aspirin", dosage: "81mg", frequency: "Once daily" },
            { name: "Atorvastatin", dosage: "80mg", frequency: "Once daily" },
            { name: "Lisinopril", dosage: "40mg", frequency: "Once daily" }
        ],
        allergies: ["Sulfonamides"],
        vitals: {
            heartRate: 92,
            systolic: 156,
            diastolic: 94,
            oxygen: 95,
            temperature: 99.1,
            respiratoryRate: 19
        },
        ecgStatus: "Atrial fibrillation, rate controlled",
        lungStatus: "Clear, mild left basilar decrease",
        lastVitalsUpdate: "2024-03-28T14:08:33Z"
    },

    // Patient 8: Pneumonia patient
    {
        id: "PAT-2024-008",
        name: "Linda Robinson",
        age: 71,
        sex: "Female",
        bloodType: "O+",
        height: "5'4\"",
        weight: "155 lbs",
        bmi: 26.6,
        status: "critical",
        admissionDate: "2024-03-25",
        room: "302B",
        primaryDoctor: "Dr. Kevin O'Brien",
        medicalHistory: "COPD, Smoking history, Osteoporosis",
        diagnosis: "Community-Acquired Pneumonia (CAP) with sepsis",
        medications: [
            { name: "Ceftriaxone", dosage: "1g", frequency: "Every 12 hours" },
            { name: "Azithromycin", dosage: "500mg", frequency: "Once daily" },
            { name: "Albuterol", dosage: "2.5mg", frequency: "Every 4 hours" },
            { name: "Ipratropium", dosage: "500mcg", frequency: "Every 6 hours" }
        ],
        allergies: ["Fluoroquinolones"],
        vitals: {
            heartRate: 112,
            systolic: 132,
            diastolic: 79,
            oxygen: 88,
            temperature: 102.1,
            respiratoryRate: 26
        },
        ecgStatus: "Sinus tachycardia",
        lungStatus: "Crackles left lower lobe, consolidation on imaging",
        lastVitalsUpdate: "2024-03-28T16:12:45Z"
    },

    // Patient 9: Diabetic with complications
    {
        id: "PAT-2024-009",
        name: "Charles Brown",
        age: 59,
        sex: "Male",
        bloodType: "A+",
        height: "5'8\"",
        weight: "210 lbs",
        bmi: 31.9,
        status: "warning",
        admissionDate: "2024-03-19",
        room: "218A",
        primaryDoctor: "Dr. Sophia Andersen",
        medicalHistory: "Type II Diabetes (20 years), Obesity, Sleep apnea",
        diagnosis: "Diabetic Ketoacidosis Prevention, Metabolic Monitoring",
        medications: [
            { name: "Insulin Glargine", dosage: "40U", frequency: "Once daily" },
            { name: "Liraglutide", dosage: "1.8mg", frequency: "Once daily" },
            { name: "Metformin", dosage: "1000mg", frequency: "Twice daily" },
            { name: "Aspirin", dosage: "325mg", frequency: "Once daily" }
        ],
        allergies: ["Sulfonamides", "Metformin allergy"],
        vitals: {
            heartRate: 95,
            systolic: 148,
            diastolic: 90,
            oxygen: 94,
            temperature: 98.7,
            respiratoryRate: 20
        },
        ecgStatus: "Normal sinus rhythm",
        lungStatus: "Clear, patient overweight",
        lastVitalsUpdate: "2024-03-28T12:35:22Z"
    },

    // Patient 10: Infection/Sepsis
    {
        id: "PAT-2024-010",
        name: "Thomas Anderson",
        age: 64,
        sex: "Male",
        bloodType: "B-",
        height: "5'11\"",
        weight: "188 lbs",
        bmi: 26.2,
        status: "critical",
        admissionDate: "2024-03-28",
        room: "340C",
        primaryDoctor: "Dr. Marcus Thompson",
        medicalHistory: "Immunocompromised (post-cancer treatment), GERD",
        diagnosis: "Sepsis from urinary tract infection, Severe",
        medications: [
            { name: "Piperacillin-Tazobactam", dosage: "4.5g", frequency: "Every 6 hours" },
            { name: "Vancomycin", dosage: "1g", frequency: "Every 12 hours" },
            { name: "Norepinephrine", dosage: "Titrated", frequency: "Continuous" },
            { name: "Dexamethasone", dosage: "6mg", frequency: "Every 6 hours" }
        ],
        allergies: ["Penicillin"],
        vitals: {
            heartRate: 128,
            systolic: 95,
            diastolic: 58,
            oxygen: 91,
            temperature: 103.8,
            respiratoryRate: 32
        },
        ecgStatus: "Sinus tachycardia, flattened T waves",
        lungStatus: "Bilateral wheezes, decreased air entry",
        lastVitalsUpdate: "2024-03-28T16:55:10Z"
    },

    // Patient 11: Liver disease (Hepatitis C)
    {
        id: "PAT-2024-011",
        name: "Elizabeth Harper",
        age: 56,
        sex: "Female",
        bloodType: "A+",
        height: "5'5\"",
        weight: "168 lbs",
        bmi: 27.9,
        status: "warning",
        admissionDate: "2024-03-20",
        room: "225A",
        primaryDoctor: "Dr. Amanda Foster",
        medicalHistory: "Hepatitis C (untreated), Cirrhosis, Ascites",
        diagnosis: "Advanced Liver Cirrhosis with Portal Hypertension",
        medications: [
            { name: "Sofosbuvir/Velpatasvir", dosage: "400/100mg", frequency: "Once daily" },
            { name: "Furosemide", dosage: "80mg", frequency: "Once daily" },
            { name: "Spironolactone", dosage: "50mg", frequency: "Once daily" },
            { name: "Propranolol", dosage: "40mg", frequency: "Twice daily" }
        ],
        allergies: ["Acetaminophen"],
        vitals: {
            heartRate: 98,
            systolic: 125,
            diastolic: 76,
            oxygen: 96,
            temperature: 98.8,
            respiratoryRate: 19
        },
        ecgStatus: "Normal sinus rhythm",
        lungStatus: "Clear, abdominal ascites noted",
        lastVitalsUpdate: "2024-03-28T10:20:15Z"
    },

    // Patient 12: Parkinson's Disease
    {
        id: "PAT-2024-012",
        name: "William Martinez",
        age: 74,
        sex: "Male",
        bloodType: "B+",
        height: "5'9\"",
        weight: "165 lbs",
        bmi: 24.4,
        status: "stable",
        admissionDate: "2024-03-12",
        room: "405B",
        primaryDoctor: "Dr. David Wong",
        medicalHistory: "Parkinson's Disease (10 years), Hypertension, Depression",
        diagnosis: "Neurodegenerative Disease - Advanced Parkinson's Monitoring",
        medications: [
            { name: "Levodopa/Carbidopa", dosage: "500/50mg", frequency: "Three times daily" },
            { name: "Pramipexole", dosage: "1.5mg", frequency: "Three times daily" },
            { name: "Selegiline", dosage: "5mg", frequency: "Once daily" },
            { name: "Sertraline", dosage: "50mg", frequency: "Once daily" }
        ],
        allergies: ["NSAIDs"],
        vitals: {
            heartRate: 71,
            systolic: 132,
            diastolic: 80,
            oxygen: 97,
            temperature: 98.4,
            respiratoryRate: 16
        },
        ecgStatus: "Normal sinus rhythm",
        lungStatus: "Clear bilaterally, tremor noted at rest",
        lastVitalsUpdate: "2024-03-28T09:45:30Z"
    },

    // Patient 13: End-stage renal disease on dialysis
    {
        id: "PAT-2024-013",
        name: "Patricia Anderson",
        age: 67,
        sex: "Female",
        bloodType: "O-",
        height: "5'6\"",
        weight: "142 lbs",
        bmi: 23.0,
        status: "warning",
        admissionDate: "2024-03-17",
        room: "312C",
        primaryDoctor: "Dr. Rajesh Patel",
        medicalHistory: "End-Stage Renal Disease (ESRD), Diabetes type 2, HTN",
        diagnosis: "ESRD on Hemodialysis, Electrolyte Imbalance Management",
        medications: [
            { name: "Erythropoietin alpha", dosage: "10000U", frequency: "3x/week" },
            { name: "Calcium carbonate", dosage: "2000mg", frequency: "With meals" },
            { name: "Sevelamer", dosage: "2400mg", frequency: "Three times daily" },
            { name: "Carvedilol", dosage: "12.5mg", frequency: "Once daily" }
        ],
        allergies: ["ACE Inhibitors"],
        vitals: {
            heartRate: 86,
            systolic: 148,
            diastolic: 89,
            oxygen: 95,
            temperature: 98.6,
            respiratoryRate: 18
        },
        ecgStatus: "Normal sinus rhythm with LVH",
        lungStatus: "Clear, post-dialysis session",
        lastVitalsUpdate: "2024-03-28T14:30:45Z"
    },

    // Patient 14: Supraventricular Tachycardia (SVT) with Cardiac Arrhythmia
    {
        id: "PAT-2024-014",
        name: "Richard Coleman",
        age: 48,
        sex: "Male",
        bloodType: "AB-",
        height: "6'1\"",
        weight: "190 lbs",
        bmi: 25.1,
        status: "critical",
        admissionDate: "2024-03-28",
        room: "335A",
        primaryDoctor: "Dr. Cynthia Burns",
        medicalHistory: "Paroxysmal SVT, Wolff-Parkinson-White (WPW) Syndrome",
        diagnosis: "Supraventricular Tachycardia - Acute episode, Pre-ablation",
        medications: [
            { name: "Adenosine", dosage: "6mg", frequency: "IV bolus" },
            { name: "Verapamil", dosage: "120mg", frequency: "Once daily" },
            { name: "Beta-blocker", dosage: "Metoprolol 50mg", frequency: "Twice daily" },
            { name: "Aspirin", dosage: "81mg", frequency: "Once daily" }
        ],
        allergies: ["Digoxin allergy"],
        vitals: {
            heartRate: 156,
            systolic: 138,
            diastolic: 84,
            oxygen: 97,
            temperature: 98.7,
            respiratoryRate: 22
        },
        ecgStatus: "Supraventricular Tachycardia at 156 BPM, WPW pattern visible",
        lungStatus: "Clear bilaterally",
        lastVitalsUpdate: "2024-03-28T17:05:20Z"
    },

    // Patient 15: Thyroid Cancer with Thyroid Storm Risk
    {
        id: "PAT-2024-015",
        name: "Margaret Stevens",
        age: 51,
        sex: "Female",
        bloodType: "AB+",
        height: "5'7\"",
        weight: "155 lbs",
        bmi: 24.3,
        status: "critical",
        admissionDate: "2024-03-26",
        room: "328B",
        primaryDoctor: "Dr. Natalie Rivera",
        medicalHistory: "Papillary Thyroid Cancer (post-thyroidectomy), Hyperthyroidism, prior thyroid storm",
        diagnosis: "Post-Thyroidectomy Thyroid Hormone Replacement - Thyroid Storm Precautions",
        medications: [
            { name: "Levothyroxine", dosage: "200mcg", frequency: "Once daily" },
            { name: "Propranolol", dosage: "80mg", frequency: "Three times daily" },
            { name: "Propylthiouracil (PTU)", dosage: "100mg", frequency: "Every 4 hours" },
            { name: "Lugol's Iodine solution", dosage: "8 drops", frequency: "Three times daily" }
        ],
        allergies: ["Methimazole"],
        vitals: {
            heartRate: 124,
            systolic: 142,
            diastolic: 85,
            oxygen: 98,
            temperature: 101.2,
            respiratoryRate: 24
        },
        ecgStatus: "Sinus tachycardia, signs of thyroid storm",
        lungStatus: "Clear, diaphoresis evident",
        lastVitalsUpdate: "2024-03-28T17:20:10Z"
    }
];

// Function to get patient by ID
function getPatientById(patientId) {
    return PATIENTS_DATABASE.find(p => p.id === patientId);
}

// Function to get all patients
function getAllPatients() {
    return PATIENTS_DATABASE;
}

// Function to filter patients by status
function getPatientsByStatus(status) {
    if (status === 'all') return PATIENTS_DATABASE;
    return PATIENTS_DATABASE.filter(p => p.status === status);
}

// Function to search patients
function searchPatients(query) {
    const lowerQuery = query.toLowerCase();
    return PATIENTS_DATABASE.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.id.toLowerCase().includes(lowerQuery) ||
        p.diagnosis.toLowerCase().includes(lowerQuery)
    );
}

// Generate realistic ECG data based on patient condition
function generateECGData(patientId) {
    const patient = getPatientById(patientId);
    if (!patient) return [];

    const dataPoints = 500;
    const data = [];
    
    // Different waveform patterns based on condition
    if (patient.status === 'critical') {
        // Abnormal patterns for critical patients
        for (let i = 0; i < dataPoints; i++) {
            const phase = (i / dataPoints) * Math.PI * 2;
            let value = Math.sin(phase * 2) * 1.5;
            value += Math.sin(phase * 3) * 0.5 + Math.random() * 0.3;
            data.push(Math.round(value * 100) / 100);
        }
    } else if (patient.status === 'warning') {
        // Slightly irregular for warning patients
        for (let i = 0; i < dataPoints; i++) {
            const phase = (i / dataPoints) * Math.PI * 2;
            let value = Math.sin(phase * 2) * 1.2;
            value += Math.sin(phase * 4) * 0.3 + Math.random() * 0.2;
            data.push(Math.round(value * 100) / 100);
        }
    } else {
        // Normal pattern for stable patients
        for (let i = 0; i < dataPoints; i++) {
            const phase = (i / dataPoints) * Math.PI * 2;
            let value = Math.sin(phase * 2) * 1.0;
            value += Math.sin(phase * 6) * 0.2 + Math.random() * 0.1;
            data.push(Math.round(value * 100) / 100);
        }
    }
    
    return data;
}

// Generate respiratory data based on breathing pattern
function generateRespiratoryData(patientId) {
    const patient = getPatientById(patientId);
    if (!patient) return [];

    const dataPoints = 300;
    const data = [];
    const rate = patient.vitals.respiratoryRate;
    
    for (let i = 0; i < dataPoints; i++) {
        const phase = (i / dataPoints) * (rate / 15) * Math.PI * 2;
        let value = Math.sin(phase) * 0.8;
        value += Math.sin(phase * 3) * 0.2 + Math.random() * 0.1;
        data.push(Math.round(value * 100) / 100);
    }
    
    return data;
}
