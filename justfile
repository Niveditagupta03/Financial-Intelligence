set dotenv-load

dev:
    uvicorn financial_intelligence:app --reload --host 0.0.0.0 --port 8000

generate_migration MESSAGE:
    poetry run alembic revision --autogenerate -m "{{ MESSAGE }}"
  
migrate:
    poetry run alembic upgrade head