from pydantic_settings import BaseSettings

class Config(BaseSettings):
    db_url :str
    jwt_secret:str
    jwt_algorithm: str
    model_path: str
    bank_asset_value_scaler_path: str
    cibil_score_scaler_path: str
    commercial_assets_value_scaler_path: str
    education_ohe_path: str
    income_annum_scaler_path: str
    loan_amount_scaler_path: str
    loan_term_scaler_path: str
    luxury_assets_value_scaler_path: str
    num_dependant_scaler_path: str
    residential_assets_value_scaler_path: str
    self_employed_ohe_path: str

config = Config()