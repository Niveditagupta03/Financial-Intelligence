from fastapi import Depends, BackgroundTasks,status
from sqlmodel import Session, select
from financial_intelligence.user.schema import User, EducationEnum, MarriedEnum
from financial_intelligence.loans.schema import Loan
from financial_intelligence.auth import get_user_jwt
from financial_intelligence.database import get_session
from financial_intelligence.loan_application.schema import LoanApplication,BaseLoanApplication, ApplicationStatusEnum
from financial_intelligence.user.schema import JWTPayload
from . import router
from financial_intelligence.models import predict

@router.get("/", response_model=list[LoanApplication])
def list_loan_application(user:JWTPayload = Depends(get_user_jwt),session: Session= Depends(get_session)) -> list[LoanApplication]:
    applications = session.exec(select(LoanApplication).where(LoanApplication.user_id== user.user_id)).all()
    return applications

@router.post("/{loan_id}", response_model=LoanApplication, status_code= status.HTTP_201_CREATED)
def create_loan_application(background_tasks: BackgroundTasks, loan_id : str,loan_application: BaseLoanApplication ,user:JWTPayload = Depends(get_user_jwt),session: Session= Depends(get_session)) -> LoanApplication:
    application = LoanApplication(user_id = user.user_id,loan_id= loan_id, loan_term=loan_application.loan_term)
    session.add(application)
    session.commit()
    session.refresh(application)
    background_tasks.add_task(predict_loan, session, application)
    return application


def predict_loan(session:Session,application: LoanApplication):
    user = session.exec(select(User).where(User.id == application.user_id)).one()
    loan = session.exec(select(Loan).where(Loan.id == application.loan_id)).one()
   
    if predict(user,loan,application):
        application.status = ApplicationStatusEnum.APPROVED

    else:
        application.status = ApplicationStatusEnum.DENIED
    
    session.add(application)
    session.commit()