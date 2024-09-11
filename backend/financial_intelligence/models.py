import pickle
import torch
from torch import nn
import numpy as np
import pandas as pd
from financial_intelligence.config import config 
from financial_intelligence.user.schema import User, EducationEnum, MarriedEnum
from financial_intelligence.loans.schema import Loan
from financial_intelligence.loan_application.schema import LoanApplication

class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(13, 512),
            nn.ReLU(),
            nn.Dropout(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Dropout(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Dropout(),
            nn.Linear(512, 2),
        )

    def forward(self, x):
        logits = self.linear_relu_stack(x)
        return logits
    
model= NeuralNetwork()

with open(config.model_path, "rb") as f:
    model.load_state_dict(torch.load(f))
with open(config.bank_asset_value_scaler_path, "rb") as f:
    bank_asset_value_scaler = pickle.load(f)
with open(config.cibil_score_scaler_path, "rb") as f:
    cibil_score_scaler = pickle.load(f)
with open(config.commercial_assets_value_scaler_path, "rb") as f:
    commercial_assets_value_scaler = pickle.load(f)
with open(config.education_ohe_path, "rb") as f:
    education_ohe = pickle.load(f)
with open(config.income_annum_scaler_path, "rb") as f:
    income_annum_scaler = pickle.load(f)
with open(config.loan_amount_scaler_path, "rb") as f:
    loan_amount_scaler = pickle.load(f)
with open(config.loan_term_scaler_path, "rb") as f:
    loan_term_scaler = pickle.load(f)
with open(config.luxury_assets_value_scaler_path, "rb") as f:
    luxury_assets_value_scaler = pickle.load(f)
with open(config.num_dependant_scaler_path, "rb") as f:
    num_dependant_scaler = pickle.load(f)
with open(config.residential_assets_value_scaler_path, "rb") as f:
    residential_assets_value_scaler = pickle.load(f)
with open(config.self_employed_ohe_path, "rb") as f:
    self_employed_ohe = pickle.load(f)

def predict(user: User,loan: Loan, loan_application: LoanApplication ):
    data = pd.DataFrame([{
        "no_of_dependents":num_dependant_scaler.transform([[user.dependents]])[0],
        "income_annum":income_annum_scaler.transform([[user.income]])[0],
        "loan_amount":loan_amount_scaler.transform([[loan.amount]])[0],
        "loan_term":loan_term_scaler.transform([[loan_application.loan_term]]),
        "cibil_score": cibil_score_scaler.transform([[user.credit_history]])[0],
        "residential_assets_value":residential_assets_value_scaler.transform([[user.residential_assets_value]]),
        "commercial_assets_value":commercial_assets_value_scaler.transform([[user.commercial_assets_value]]),
        "luxury_assets_value":luxury_assets_value_scaler.transform([[user.luxury_assets_value]]),
        "bank_asset_value":bank_asset_value_scaler.transform([[user.bank_asset_value]]),
        "x0_Graduate":1 if user.education == EducationEnum.GRADUATE else 0,
        "x0_ Not Graduate":0 if user.education == EducationEnum.GRADUATE else 1,
        "x0_ No":0 if user.married == MarriedEnum.MARRIED else 1,
        "x0_ Yes":1 if user.married == MarriedEnum.MARRIED else 0,

    }])

    X = torch.Tensor(data.to_numpy(dtype=np.float32))
    with torch.no_grad():
        result= model(X)[0]

    return result[0]> result[1]
