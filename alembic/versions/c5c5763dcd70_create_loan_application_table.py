"""create loan application table

Revision ID: c5c5763dcd70
Revises: 8fe4c45e8b98
Create Date: 2024-06-12 18:13:23.615195

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'c5c5763dcd70'
down_revision: Union[str, None] = '8fe4c45e8b98'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('loanapplication',
    sa.Column('user_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('loan_id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.Column('status', sa.Enum('PROCESSING', 'APPROVED', 'DENIED', name='applicationstatusenum'), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('id', sqlmodel.sql.sqltypes.GUID(), nullable=False),
    sa.ForeignKeyConstraint(['loan_id'], ['loan.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_loanapplication_id'), 'loanapplication', ['id'], unique=False)
    op.create_index(op.f('ix_loanapplication_loan_id'), 'loanapplication', ['loan_id'], unique=False)
    op.create_index(op.f('ix_loanapplication_user_id'), 'loanapplication', ['user_id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_loanapplication_user_id'), table_name='loanapplication')
    op.drop_index(op.f('ix_loanapplication_loan_id'), table_name='loanapplication')
    op.drop_index(op.f('ix_loanapplication_id'), table_name='loanapplication')
    op.drop_table('loanapplication')
    # ### end Alembic commands ###
