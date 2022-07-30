# flake8: noqa
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, Float
from sqlalchemy.dialects.mssql import CHAR, NVARCHAR
from .base import Base


class Message(Base):
    __tablename__ = "message"
    id         = Column(Integer, primary_key=True, autoincrement=True)
    content    = Column(NVARCHAR(100))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
