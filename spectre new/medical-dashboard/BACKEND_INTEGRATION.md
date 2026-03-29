# Backend Integration Guide

This document outlines how to integrate your backend with the Medical Dashboard frontend.

## Authentication System

### Login Endpoint
**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
    "username": "doctor_001",
    "password": "securepassword"
}
```

**Response (Success)**:
```json
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "id": "user_001",
        "username": "doctor_001",
        "name": "Dr. John Smith",
        "role": "doctor"
    }
}
```

**Response (Error)**:
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

**Frontend Integration** (in `script.js`):
```javascript
fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
})
.then(resp => resp.json())
.then(data => {
    if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userLogged', 'true');
        localStorage.setItem('username', data.user.username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Login failed: ' + data.message);
    }
})
.catch(err => alert('Error: ' + err.message));
```

### Logout Endpoint
**Endpoint**: `POST /api/auth/logout`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

### Token Verification
**Endpoint**: `GET /api/auth/verify`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "valid": true,
    "user_id": "user_001"
}
```

---

## Patient Data Endpoints

### Get Patient Information
**Endpoint**: `GET /api/patients/{patient_id}`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "id": "PAT-2024-001",
    "name": "John Anderson",
    "age": 45,
    "sex": "Male",
    "blood_type": "O+",
    "height": "6'0\"",
    "weight": "180 lbs",
    "bmi": 24.4,
    "medical_history": "Hypertension, Type II Diabetes - Controlled with medication",
    "admission_date": "2024-03-15",
    "primary_doctor": "Dr. Sarah Johnson",
    "emergency_contact": "+1-555-0123"
}
```

**Frontend Integration** (in `script.js` - `initDashboard()` function):
```javascript
const token = localStorage.getItem('token');
const patientId = 'PAT-2024-001'; // Get from URL or session

fetch(`/api/patients/${patientId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
})
.then(resp => resp.json())
.then(patient => {
    document.getElementById('patientName').textContent = patient.name;
    document.getElementById('patientAge').textContent = patient.age;
    document.getElementById('patientSex').textContent = patient.sex;
    document.getElementById('patientBloodType').textContent = patient.blood_type;
    document.getElementById('patientHeight').textContent = patient.height;
    document.getElementById('patientWeight').textContent = patient.weight;
    document.getElementById('patientBMI').textContent = patient.bmi.toFixed(1);
    document.getElementById('patientHistory').textContent = patient.medical_history;
});
```

### Update Patient Information
**Endpoint**: `PUT /api/patients/{patient_id}`

**Headers**:
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body**:
```json
{
    "name": "John Anderson",
    "age": 45,
    "weight": "182 lbs",
    "medical_history": "Updated history..."
}
```

**Response**:
```json
{
    "success": true,
    "message": "Patient updated successfully"
}
```

---

## Vital Signs Endpoints

### Get Current Vital Signs
**Endpoint**: `GET /api/vitals/{patient_id}/current`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "timestamp": "2024-03-28T10:45:30Z",
    "heart_rate": 72,
    "systolic_bp": 120,
    "diastolic_bp": 80,
    "oxygen_saturation": 98,
    "temperature": 98.6,
    "respiratory_rate": 16,
    "status": "normal"
}
```

**Frontend Integration** (Replace `updateVitalsRealtime()` in `script.js`):
```javascript
function updateVitalsRealtime() {
    const token = localStorage.getItem('token');
    const patientId = 'PAT-2024-001';

    setInterval(() => {
        fetch(`/api/vitals/${patientId}/current`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(resp => resp.json())
        .then(vitals => {
            document.getElementById('heartRate').textContent = vitals.heart_rate;
            document.getElementById('bloodPressure').textContent = 
                `${vitals.systolic_bp}/${vitals.diastolic_bp}`;
            document.getElementById('oxygen').textContent = vitals.oxygen_saturation;
            document.getElementById('temperature').textContent = vitals.temperature;
            document.getElementById('breathingRate').textContent = vitals.respiratory_rate;
        })
        .catch(err => console.error('Error fetching vitals:', err));
    }, 5000); // Update every 5 seconds
}
```

### Get Vital Signs History
**Endpoint**: `GET /api/vitals/{patient_id}/history?hours=24`

**Headers**:
```
Authorization: Bearer {token}
```

**Query Parameters**:
- `hours` (optional): Number of hours to retrieve (default: 24)
- `limit` (optional): Maximum records (default: 288)

**Response**:
```json
{
    "data": [
        {
            "timestamp": "2024-03-28T10:45:30Z",
            "heart_rate": 72,
            "systolic_bp": 120,
            "diastolic_bp": 80,
            "oxygen_saturation": 98,
            "temperature": 98.6,
            "respiratory_rate": 16
        },
        // ... more entries
    ],
    "count": 95
}
```

### Real-time Vital Signs (WebSocket Alternative)
**WebSocket Endpoint**: `ws://api.example.com/ws/vitals/{patient_id}`

**Connection Example**:
```javascript
const token = localStorage.getItem('token');
const patientId = 'PAT-2024-001';
const ws = new WebSocket(`ws://api.example.com/ws/vitals/${patientId}?token=${token}`);

ws.onmessage = (event) => {
    const vitals = JSON.parse(event.data);
    document.getElementById('heartRate').textContent = vitals.heart_rate;
    // ... update other vitals
};

ws.onerror = (error) => console.error('WebSocket error:', error);
ws.onclose = () => console.log('WebSocket closed');
```

---

## Medical Data Endpoints

### Get ECG Data
**Endpoint**: `GET /api/medical/{patient_id}/ecg?duration=300`

**Headers**:
```
Authorization: Bearer {token}
```

**Query Parameters**:
- `duration` (optional): Duration in seconds (default: 300)
- `format` (optional): 'raw' or 'compressed' (default: 'raw')

**Response**:
```json
{
    "sampling_rate": 500,
    "duration": 300,
    "units": "mV",
    "data": [
        -0.5, -0.3, 0.1, 0.8, 1.2, 0.9, 0.2, -0.4, 
        // ... 149,600 more data points for 5 minutes at 500Hz
    ]
}
```

**Chart Implementation**:
```javascript
// Replace drawECG() in chart-simulator.js
fetch(`/api/medical/${patientId}/ecg?duration=60`, {
    headers: { 'Authorization': `Bearer ${token}` }
})
.then(resp => resp.json())
.then(ecgData => {
    const canvas = document.getElementById('ecgChart');
    const ctx = canvas.getContext('2d');
    
    // Draw actual ECG data from backend
    drawECGFromData(ctx, ecgData.data, ecgData.sampling_rate);
});
```

### Get Respiratory Data
**Endpoint**: `GET /api/medical/{patient_id}/respiratory?duration=300`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "sampling_rate": 100,
    "duration": 300,
    "units": "volume",
    "data": [
        0.0, 0.1, 0.3, 0.5, 0.7, 0.8, 0.9, 0.8, 
        // ... respiratory waveform data
    ]
}
```

### Get Lung Sounds Analysis
**Endpoint**: `GET /api/medical/{patient_id}/lung-sounds`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "timestamp": "2024-03-28T10:45:30Z",
    "left_lung": {
        "status": "clear",
        "quality": "good",
        "frequency_analysis": {
            "low": 0.1,
            "mid": 0.05,
            "high": 0.02
        }
    },
    "right_lung": {
        "status": "clear",
        "quality": "good",
        "frequency_analysis": {
            "low": 0.12,
            "mid": 0.06,
            "high": 0.03
        }
    },
    "notes": "Normal breathing sounds bilaterally"
}
```

---

## Alerts and Activity Endpoints

### Get System Alerts
**Endpoint**: `GET /api/alerts/{patient_id}?limit=10`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "alerts": [
        {
            "id": "alert_001",
            "type": "warning",
            "title": "Follow-up Appointment",
            "description": "Due in 5 days",
            "timestamp": "2024-03-28T08:00:00Z",
            "priority": "medium"
        },
        {
            "id": "alert_002",
            "type": "info",
            "title": "Lab Results Ready",
            "description": "Click to view results",
            "timestamp": "2024-03-28T09:30:00Z",
            "priority": "low"
        }
    ]
}
```

### Get Activity Log
**Endpoint**: `GET /api/activity/{patient_id}?limit=10`

**Headers**:
```
Authorization: Bearer {token}
```

**Response**:
```json
{
    "activities": [
        {
            "timestamp": "2024-03-28T10:45:00Z",
            "type": "vital_check",
            "title": "Vital Signs Check",
            "description": "All parameters within normal range"
        },
        {
            "timestamp": "2024-03-28T09:30:00Z",
            "type": "medication",
            "title": "Medication Reminder",
            "description": "Blood pressure medication scheduled"
        }
    ]
}
```

---

## Error Handling

All endpoints should return appropriate HTTP status codes:

```
200 OK           - Request successful
201 Created      - Resource created
400 Bad Request  - Invalid input
401 Unauthorized - Missing/invalid token
403 Forbidden    - No permission
404 Not Found    - Resource not found
500 Server Error - Internal error
```

**Error Response Format**:
```json
{
    "success": false,
    "error": "error_code",
    "message": "Human-readable error message"
}
```

**Frontend Error Handling**:
```javascript
fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
        }
        return resp.json();
    })
    .then(data => {
        // Handle success
    })
    .catch(error => {
        if (error.message.includes('401')) {
            // Redirect to login
            window.location.href = 'index.html';
        } else if (error.message.includes('403')) {
            alert('You do not have permission to access this resource');
        } else {
            alert('Error: ' + error.message);
        }
    });
```

---

## Rate Limiting

Recommended rate limits:

- Login: 5 requests per minute per IP
- API calls: 1000 requests per hour per token
- WebSocket: Unlimited (throttle server-side)

---

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **JWT Tokens**: Implement proper token expiration (15-30 minutes)
3. **CORS**: Configure CORS properly for your domain
4. **Input Validation**: Validate all inputs on server side
5. **Data Privacy**: Ensure HIPAA/GDPR compliance
6. **Encryption**: Encrypt sensitive data at rest
7. **Audit Logging**: Log all data access

---

## Testing the Integration

Use Postman or similar tool to test endpoints:

```bash
# 1. Login
POST http://localhost:5000/api/auth/login
Body: { "username": "doctor_001", "password": "password" }

# 2. Get patient data
GET http://localhost:5000/api/patients/PAT-2024-001
Headers: Authorization: Bearer {token}

# 3. Get vitals
GET http://localhost:5000/api/vitals/PAT-2024-001/current
Headers: Authorization: Bearer {token}

# 4. Test WebSocket
wscat -c "ws://localhost:5000/ws/vitals/PAT-2024-001?token={token}"
```

---

## Performance Tips

1. **Cache patient data**: 5-10 minute cache for patient info
2. **Compress responses**: Use gzip for all responses
3. **Paginate results**: Use pagination for large datasets
4. **Database indexing**: Index patient_id, timestamp
5. **Real-time data**: Use WebSockets for continuous updates
6. **CDN**: Serve static assets through CDN

---

## Questions?

Refer to the main README.md or the code comments in the frontend for more details on specific implementations.
