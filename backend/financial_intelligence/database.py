from sqlalchemy.engine import Engine
from sqlmodel import Session, create_engine

from financial_intelligence.config import config

engine: Engine

def init_engine():
    global engine
    engine = create_engine(config.db_url)

def dispose_engine():
    global engine
    engine.dispose()

def get_session():
    global engine
    with Session(engine) as session:
        yield session


