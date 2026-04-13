# 💧 Water Quality Prediction App

A Machine Learning powered web app that predicts whether water is **safe to drink** based on 9 chemical parameters.

---

## 🚀 Live Demo

- **Frontend:** [Coming Soon](#)
- **Backend API:** [Coming Soon](#)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | FastAPI (Python) |
| ML Model | Scikit-learn |
| Deployment | Vercel + Render |

---

## 📊 Input Parameters

The model takes these 9 water quality parameters:

- **pH** – Acidity/Alkalinity (Safe range: 6.5 - 8.5)
- **Hardness** – Calcium & Magnesium content
- **Solids** – Total dissolved solids
- **Chloramines** – Disinfectant level
- **Sulfate** – Sulfate concentration
- **Conductivity** – Electrical conductivity
- **Organic Carbon** – Organic matter content
- **Trihalomethanes** – Byproduct of chlorination
- **Turbidity** – Water clarity

---

## ⚙️ How to Run Locally

### Backend
```bash
cd Backend
pip install fastapi uvicorn scikit-learn numpy
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📁 Project Structure

```
water_quality_web_app/
├── Backend/
│   ├── main.py
│   ├── water_quality_model.pkl
│   └── scaler.pkl
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
└── README.md
```

---

## 👨‍💻 Author

**Sudhansh** – [GitHub](https://github.com/sudhansh296)
