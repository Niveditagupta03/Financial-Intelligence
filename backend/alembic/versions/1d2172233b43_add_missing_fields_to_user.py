"""add missing fields to user

Revision ID: 1d2172233b43
Revises: fd9aa78d1f7b
Create Date: 2024-06-28 18:03:17.287290

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '1d2172233b43'
down_revision: Union[str, None] = 'fd9aa78d1f7b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('residential_assets_value', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('commercial_assets_value', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('luxury_assets_value', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('bank_asset_value', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'bank_asset_value')
    op.drop_column('user', 'luxury_assets_value')
    op.drop_column('user', 'commercial_assets_value')
    op.drop_column('user', 'residential_assets_value')
    # ### end Alembic commands ###
