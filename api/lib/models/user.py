# flake8: noqa
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, Float
from sqlalchemy.dialects.mssql import CHAR, NVARCHAR
from .base import Base


class User(Base):
    __tablename__ = "user"
    id         = Column(CHAR(7), nullable=False, primary_key=True)
    name       = Column(NVARCHAR(12))
    age        = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
