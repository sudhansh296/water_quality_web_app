import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    ph: '', Hardness: '', Solids: '', Chloramines: '',
    Sulfate: '', Conductivity: '', Organic_carbon: '',
    Trihalomethanes: '', Turbidity: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('https://water-quality-backend-jaw5.onrender.com/predict', formData);
      setResult(res.data);
    } catch (err) {
      alert("Backend connected nahi hai! Pehle FastAPI server chalu karein.");
    }
    setLoading(false);
  };

  return (
    <div className="main-wrapper">
      <div className="glass-container">
        <div className="header-section">
          <div className="drop-wrapper">
            <svg viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="custom-drop">
              <path d="M15 0C15 0 0 15.6 0 27C0 35.2843 6.71573 42 15 42C23.2843 42 30 35.2843 30 27C30 15.6 15 0 15 0Z" fill="url(#paint0_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="15" y1="0" x2="15" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c2e9fb" />
                  <stop offset="0.5" stopColor="#00d2ff" />
                  <stop offset="1" stopColor="#0055ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="main-title">Water Quality AI</h1>
          <p className="subtitle">Enter water parameters to check potability</p>
        </div>

        <form onSubmit={handleSubmit} className="entry-form">
          <div className="form-grid">
            {Object.keys(formData).map((key) => (
              <div className="input-field" key={key}>
                <label>
                  {key.replace('_', ' ')} 
                  {key === 'ph' ? ' (0-14)' : key === 'Solids' ? ' (ppm)' : key === 'Hardness' ? ' (mg/L)' : ''}
                </label>
                <input 
                  type="number" 
                  name={key} 
                  step="any" 
                  min={key === 'ph' ? "0" : ""} 
                  max={key === 'ph' ? "14" : ""} 
                  placeholder={`e.g. ${key === 'ph' ? '7.0' : key === 'Solids' ? '20000' : '200'}`} 
                  required 
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()} 
                />
              </div>
            ))}
          </div>
          <button type="submit" className="glow-button" disabled={loading}>
            {loading ? <div className="loader"></div> : "Analyze Potability"}
          </button>
        </form>

        {result && (
          <div className={`result-display ${result.prediction === 1 ? 'safe' : 'unsafe'}`}>
             <div className="result-icon">{result.prediction === 1 ? "✅" : "⚠️"}</div>
             <div className="result-text">
               <h3>{result.prediction === 1 ? "Safe to Drink" : "Unsafe for Consumption"}</h3>
               <p>{result.message}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;