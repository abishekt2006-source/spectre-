# Medical Dashboard - Frontend

A professional, fully responsive medical monitoring dashboard with real-time vital sign tracking, ECG visualization, and patient management interface. Built with vanilla HTML, CSS, and JavaScript for easy backend integration.

## Overview

This is a modern healthcare dashboard designed with a dark theme, subtle animations, and professional UI patterns. The application includes:

- **Login System**: Secure entry point (ready for backend integration)
- **Real-time Monitoring**: Heart rate, Blood pressure, O2 saturation, Temperature, Breathing rate
- **Medical Data Visualization**: ECG waveforms, lung sounds analysis, respiratory patterns
- **Patient Management**: Comprehensive patient information and medical history
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme**: Easy on the eyes with muted, professional colors

## Project Structure

```
medical-dashboard/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── css/
│   └── styles.css         # All styling with dark theme
├── js/
│   ├── script.js          # Main functionality and interactivity
│   └── chart-simulator.js # Medical chart visualizations
└── assets/                # Future: images and icons
```

## Features

### 1. Login Page
- Professional login interface with animated background
- "Remember me" functionality
- Forgot password link (placeholder)
- Contact administrator link
- Info cards about the system
- Form validation
- LocalStorage-based session management

### 2. Dashboard Features

#### Patient Information
- Patient name, ID, and status
- Demographics: Age, Sex, Blood Type
- Biometrics: Height, Weight, BMI
- Medical history notes
- Edit patient button (placeholder)

#### Vital Signs Monitoring
- **Heart Rate**: 60-100 bpm (normal range indicator)
- **Blood Pressure**: Systolic/Diastolic with normal status
- **O2 Saturation**: Oxygen levels with excellent status
- **Temperature**: Body temperature monitoring
- Real-time updates every 5 seconds
- Animated heart rate icon with heartbeat effect

#### Medical Data Displays
- **ECG Chart**: Real-time heart electrical activity visualization
- **Lung Sounds**: Left and right lung analysis with wave animation
- **Breathing Analysis**: Current breathing rate with visual indicator
- **Respiratory Pattern**: Detailed respiratory waveform chart

#### Additional Features
- **Sidebar Navigation**: Easy navigation between sections
- **Search Functionality**: Quick patient search (backend ready)
- **Notifications**: System alerts and notifications
- **Activity Log**: Recent patient activity tracking
- **System Alerts**: Follow-up appointments and lab results
- **Profile Menu**: User profile and settings dropdown

## Color Scheme

The dashboard uses a carefully selected dark theme:

```css
Primary Green: #4a9d6f    (Main accent)
Secondary Green: #5db87f  (Highlights)
Tertiary Green: #6bb893   (Lighter accents)

Dark BG Primary: #0f1419      (Main background)
Dark BG Secondary: #16202b    (Card backgrounds)
Dark BG Tertiary: #1e2936     (Component backgrounds)

Text Primary: #e8eef2         (Main text)
Text Secondary: #a8b5c5       (Secondary text)
Text Tertiary: #7a8695        (Muted text)

Status Colors:
- Success: #5db87f
- Warning: #e8a668
- Danger: #d97563
- Info: #6fa8dc
```

## Getting Started

### Installation

1. **Clone or download** the project folder
2. **No build process required** - it's pure HTML/CSS/JavaScript
3. **Open in browser** - Simply open `index.html` in your web browser

### Quick Start

```bash
# If you have a local server (optional)
python -m http.server 8000
# or
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

## Usage

### Login

1. Open `index.html` in your browser
2. Enter any username and password (currently accepts any input)
3. Click "Sign In" or press Enter
4. You'll be redirected to the dashboard

**Note**: Currently uses LocalStorage for session management. Replace with actual backend authentication.

### Dashboard Navigation

- **Sidebar**: Click items to navigate sections (currently static)
- **Search**: Use the search box to find patients (placeholder)
- **Notifications**: Click the bell icon to clear notifications
- **Profile**: Hover over profile avatar for dropdown menu
- **Mobile**: Click hamburger menu on mobile devices

### Real-time Data

Vital signs update automatically every 5 seconds with simulated realistic variations. Charts animate continuously:

- ECG waveform scrolls left
- Respiratory pattern shows breathing cycles
- Lung visualization pulses with breathing

## Responsive Breakpoints

- **Desktop**: 1024px+ (full sidebar visible)
- **Tablet**: 768px - 1023px (optimized layout)
- **Mobile**: < 768px (sidebar collapses, stacked layout)

## Component Details

### Vital Cards
- Heart rhythm animation with heartbeat effect
- Color-coded icons for quick reference
- Status indicators (Normal, Warning, Critical)
- Real-time value updates

### Chart Visualization
- Canvas-based animations for performance
- ECG with realistic cardiac waveform
- Respiratory with breathing cycle simulation
- Automatic scrolling for continuous monitoring

### Medical Cards
- Header with status badge
- Full-width content area
- Timestamp footer
- Hover effects and transitions

## Backend Integration Guide

The dashboard is ready for backend integration. Here's how to connect it:

### 1. Authentication
```javascript
// Replace in script.js - loginForm submission handler
// Instead of LocalStorage, send to backend:
fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    }
});
```

### 2. Patient Data
```javascript
// Replace in initDashboard() function
// Fetch patient data from backend:
fetch('/api/patients/' + patientId)
    .then(response => response.json())
    .then(data => {
        document.getElementById('patientName').textContent = data.name;
        document.getElementById('patientAge').textContent = data.age;
        // ... update other fields
    });
```

### 3. Real-time Vitals
```javascript
// Replace in updateVitalsRealtime() function
// Connect to WebSocket or API endpoint:
setInterval(() => {
    fetch('/api/vitals/' + patientId)
        .then(response => response.json())
        .then(data => {
            document.getElementById('heartRate').textContent = data.heart_rate;
            document.getElementById('bloodPressure').textContent = data.bp;
            // ... update other vitals
        });
}, 5000);
```

### 4. Medical Data
Replace chart simulators with real data:
```javascript
// Connect to medical device APIs or database
// Update canvas data with real ECG, respiratory data
// Consider using Chart.js or similar for real data
```

## API Endpoints (For Backend)

Expected endpoints to implement:

```
POST   /api/auth/login              - User login
POST   /api/auth/logout             - User logout
GET    /api/auth/verify             - Verify token
GET    /api/patients/{id}           - Get patient info
GET    /api/vitals/{id}             - Get vital signs
GET    /api/medical/{id}/ecg        - Get ECG data
GET    /api/medical/{id}/respiratory - Get respiratory data
GET    /api/alerts/{id}             - Get system alerts
GET    /api/activity/{id}           - Get activity log
```

## Customization

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #4a9d6f;        /* Change to your brand color */
    --dark-bg: #0f1419;              /* Change background */
    --text-primary: #e8eef2;         /* Change text color */
    /* ... other variables */
}
```

### Updating Icons

Icons are SVG inline. Replace SVG content in HTML for custom icons.

### Adding New Sections

1. Add new HTML in `dashboard.html`
2. Add CSS for the section in `styles.css`
3. Add JavaScript interactivity in `script.js`
4. Ensure responsive design at all breakpoints

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Mobile

## Performance Considerations

- Canvas-based charts for smooth animations
- Debounced search and resize handlers
- Lazy loading ready for images
- Efficient CSS animations using transforms
- LocalStorage for session without server calls

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Color not the only indicator of status
- Keyboard navigation support
- Mobile-friendly touch targets

## Future Enhancements

- [ ] Connect to real medical device APIs
- [ ] WebSocket for real-time data
- [ ] Multi-patient dashboard
- [ ] Advanced filtering and search
- [ ] PDF report generation
- [ ] Data export functionality
- [ ] Admin panel for settings
- [ ] User role management
- [ ] Appointment scheduling
- [ ] Message notification system

## Troubleshooting

### Login not working
- Check browser console for errors
- Verify both username and password are entered
- Ensure cookies/localStorage are enabled

### Charts not animating
- Clear browser cache
- Check if JavaScript is enabled
- Verify console for any errors
- Try a different browser

### Responsive issues
- Clear cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check viewport meta tag is present

### Dark theme too dim
- Adjust opacity values in CSS
- Increase color brightness values
- Modify background gradients

## File Size

- HTML: ~25 KB
- CSS: ~50 KB
- JavaScript: ~15 KB
- **Total: ~90 KB** (uncompressed, before gzip)

## License

This medical dashboard is provided as-is. Use it as a foundation for your healthcare application.

## Support

For issues, questions, or feature requests, ensure you:

1. Check the Browser Console for errors (F12)
2. Verify all files are in the correct directory structure
3. Test on different browsers
4. Check internet connection for API testing

---

**Created**: 2024
**Version**: 1.0.0
**Type**: Healthcare Frontend - Production Ready
