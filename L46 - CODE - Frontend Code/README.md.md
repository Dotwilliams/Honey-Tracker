# 🎯 HoneyTrack - Secure Asset Tracker

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![Platform](https://img.shields.io/badge/platform-ESP32-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> A multi-layer security platform combining real-time GPS asset tracking with 
> deception technology (honeypot) and Wi-Fi threat monitoring.

## 📋 Table of Contents
- [Overview](#overview)
- [Current Status](#current-status)
- [Features](#features)
- [Hardware Components](#hardware-components)
- [Software Stack](#software-stack)
- [Setup Instructions](#setup-instructions)
- [Project Timeline](#project-timeline)
- [License](#license)

## 🔍 Overview

HoneyTrack is my Final Year Project in Cybersecurity and Networking. It transforms 
a standard GPS tracker into a security-aware device that not only tracks assets 
but also detects and logs potential attackers through honeypot deception.

**Why this project matters:** Most GPS trackers tell you *where* your asset went 
after it's stolen. HoneyTrack also tells you when someone is *probing* it before 
theft occurs – providing early warning and attack intelligence.

## 📍 Current Status

**Phase 1: Dashboard Development - COMPLETE ✅**

The web dashboard is fully functional:
- Flask web server running locally
- Mapbox map integration ready
- Firebase configuration complete
- UI displaying real-time data fields (awaiting hardware input)

**Phase 2: Hardware Integration - IN PROGRESS ⏳**
- ESP32 and GPS module ordered
- Awaiting delivery from Shopee

**Phase 3: Firmware Development - PLANNED 📋**
- GPS data acquisition
- Firebase upload logic
- OLED display integration

**Phase 4: Security Layer - PLANNED 📋**
- Honeypot deception ports
- Wi-Fi threat monitoring
- Alert system integration

## ✨ Features

- ✅ **Real-time GPS Tracking** - Live location on Mapbox dashboard
- ✅ **Custom Web Dashboard** - Built with Flask, HTML/CSS/JS
- ✅ **Cloud Database** - Firebase Realtime Database integration
- 🚧 **Honeypot Deception** - Fake ports to detect attackers (planned)
- 🚧 **Wi-Fi Threat Monitoring** - Deauth/rogue AP detection (planned)
- 🚧 **Physical Alerts** - Buzzer/LED for immediate notification (planned)

## 🔧 Hardware Components (Ordered)

| Component | Quantity | Purpose |
|-----------|----------|---------|
| ESP32 NodeMCU (30-pin) | 1 | Main microcontroller |
| NEO-6M GPS Module | 1 | Satellite positioning |
| 0.96" OLED Display | 1 | Local position display |
| Buzzer module | 1 | Physical alerts |
| Jumper wires (F-F) | 8 | Connections |

**Estimated Total Cost:** ~RM 60-80

## 💻 Software Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Firmware | C++ (Arduino IDE) | ESP32 GPS data processing |
| Backend | Python/Flask | Web server, API routing |
| Database | Firebase Realtime | Cloud data storage |
| Frontend | HTML/CSS/JS/Bootstrap | User interface |
| Maps | Mapbox GL JS | Location visualization |

## 🛠️ Setup Instructions (Dashboard Only)

### Prerequisites
- Python 3.8+
- pip package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/HoneyTrack-Secure-Asset-Tracker.git
cd HoneyTrack-Secure-Asset-Tracker/dashboard

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py