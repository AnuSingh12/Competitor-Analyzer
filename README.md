# 🚀 Nexus Competitor Analyzer

AI-powered competitor analysis and lead generation platform built using **Next.js, TypeScript, Gemini AI, Recharts, and jsPDF**.

The application helps founders, startups, and businesses understand their competitive landscape, identify feature gaps, discover market opportunities, generate potential leads, and receive actionable recommendations.

---

## 🌟 Features

### 🔍 Competitor Analysis

* Identify relevant competitors
* Competitor confidence scoring
* Competitive insights
* Feature comparison matrix

### 📊 Feature Gap Analysis

* Detect missing features
* Product improvement suggestions
* Competitive advantage opportunities

### 🎯 Opportunity Discovery

* Market opportunities
* Growth recommendations
* Expansion possibilities

### 👥 Lead Generation

* Potential companies
* Relevant decision-maker roles
* Confidence-based lead ranking

### 🧠 Recommendation Engine

* Product recommendations
* Market recommendations
* Strategic founder action plans

### 📈 Interactive Dashboard

* Competitor Confidence Chart
* Feature Gap Analysis Chart
* Founder Action Plan
* Feature Comparison Matrix

### 📄 PDF Export

* Download complete analysis report

---

## 🛠️ Tech Stack

| Technology       | Purpose            |
| ---------------- | ------------------ |
| Next.js          | Frontend & Backend |
| TypeScript       | Type Safety        |
| Google Gemini AI | Analysis Engine    |
| Tailwind CSS     | UI Styling         |
| Recharts         | Data Visualization |
| jsPDF            | PDF Export         |
| Vercel           | Deployment         |

---

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/AnuSingh12/Competitor-Analyzer.git
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create `.env.local`

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Run Application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🚀 How It Works

1. User enters a Product Idea, Startup Concept, Company Name, or Website.
2. Request is sent to the backend API.
3. Gemini AI analyzes the input.
4. Competitors are identified.
5. Feature gaps are generated.
6. Opportunities are discovered.
7. Leads are suggested.
8. Recommendations are produced.
9. Results are visualized on the dashboard.
10. Users can export insights as a PDF report.

---

## 📊 Dashboard Modules

### Competitor Analysis

* Competitor list
* Confidence scoring
* Comparison matrix

### Lead Generation

* Potential companies
* Relevant business roles
* Confidence ranking

### Recommendation Engine

* Product recommendations
* Market recommendations
* Growth opportunities

---

## 🔒 Security Features

* Environment variables for API keys
* Server-side Gemini integration
* No API key exposure to frontend
* Input validation
* Strong TypeScript typing

---

## 🛡️ Reliability & Fallback Handling

* AI analysis is generated using the Google Gemini API.
* The application validates and parses AI responses before displaying results.
* In case of API failures, quota limits, invalid responses, rate limits, or temporary service unavailability, the system gracefully falls back to generated placeholder insights.
* This ensures the application remains functional and does not crash under common failure scenarios.
* Users can continue exploring the dashboard, charts, comparison matrix, and PDF export even when live AI responses are unavailable.

---

## 💡 Assumptions

* Competitor insights are AI-generated and may require manual validation.
* Confidence scores represent AI-estimated confidence levels.
* Lead information is generated based on contextual business analysis.
* Some market information may be inferred when public data is unavailable.

---

---

## 🌐 Deployment

**Live Application:**
https://competitor-analyzer-eta.vercel.app

**GitHub Repository:**
https://github.com/AnuSingh12/Competitor-Analyzer
