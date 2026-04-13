from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

# 1. FastAPI App Initialize karna (Uvicorn isi 'app' ko dhoond raha hai)
app = FastAPI()

# React Frontend se connect karne ke liye CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Model aur Scaler load kar rahe hain
# Make sure yeh dono files 'backend' folder ke andar hi hain
with open('water_quality_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# 3. Input Data ka format (Wahi 9 columns jo aapke dataset mein hain)
class WaterData(BaseModel):
    ph: float
    Hardness: float
    Solids: float
    Chloramines: float
    Sulfate: float
    Conductivity: float
    Organic_carbon: float
    Trihalomethanes: float
    Turbidity: float

# 4. Prediction Endpoint
@app.post("/predict")
def predict_water_quality(data: WaterData):
    # 1. Real-World Rule (AI Model ko bypass karna)
    # WHO standards: Safe drinking water pH is between 6.5 and 8.5
    if data.ph < 6.5 or data.ph > 8.5:
        return {
            "prediction": 0,
            "message": f"Not Potable (Unsafe ⚠️) - pH Level {data.ph} is strictly not safe for drinking!"
        }

    # 2. Agar pH theek hai, tabhi hum ML Model se baaki cheezein check karwayenge
    input_features = np.array([[
        data.ph, data.Hardness, data.Solids, data.Chloramines,
        data.Sulfate, data.Conductivity, data.Organic_carbon,
        data.Trihalomethanes, data.Turbidity
    ]])
    
    # Scale karna
    scaled_features = scaler.transform(input_features)
    
    # Model se prediction lena
    prediction = model.predict(scaled_features)
    
    # Result set karna
    if int(prediction[0]) == 1:
        status = "Potable (Safe to drink 💧)"
    else:
        status = "Not Potable (Unsafe ⚠️)"
        
    return {
        "prediction": int(prediction[0]),
        "message": status
    }