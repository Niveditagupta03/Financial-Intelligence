from fastapi import Depends, status
from sqlmodel import Session, select,delete, update

from financial_intelligence.database import get_session
from financial_intelligence.loans.schema import BaseLoan, Loan
from . import router


@router.get("/{loan_id}", response_model=Loan)
def get_loan(loan_id:str,session: Session= Depends(get_session)):
    db_loan = session.scalar(select(Loan).where(Loan.id == loan_id))
    return db_loan

@router.get("/", response_model=list[Loan])
def list_loans(session: Session= Depends(get_session)):
    db_loan = session.exec(select(Loan)).all()
    return db_loan

@router.post("/", response_model=Loan, status_code=status.HTTP_201_CREATED)
def create_loan(loan: BaseLoan,session: Session= Depends(get_session)):
    db_loan = Loan(**loan.model_dump())
    session.add(db_loan)
    session.commit()
    session.refresh(db_loan)
    return loan

@router.put("/{loan_id}", response_model=Loan)
def update_loan(loan: BaseLoan,loan_id : str, session: Session= Depends(get_session)):
    db_loan = session.scalar(update(Loan).where(Loan.id == loan_id).values(**loan.model_dump()).returning(Loan))
    session.commit()
    session.refresh(db_loan)
    return db_loan

@router.delete("/{loan_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_loan(loan_id:str,session: Session= Depends(get_session)):
    session.exec(delete(Loan).where(Loan.id == loan_id))
    session.commit()
    return None
 