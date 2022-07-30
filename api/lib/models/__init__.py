# flake8: noqa
import os
import urllib
import sqlalchemy

from sqlalchemy.orm import sessionmaker, scoped_session


app_env = os.environ.get('APP_EMVIRONMENT', 'test')

if app_env in ['dev', 'prod']:
    SQL_DRIVER   = '{ODBC Driver 17 for SQL Server}'
    SQL_SERVER   = os.environ['SQL_SERVER']
    SQL_DATABASE = os.environ['SQL_DATABASE']
    SQL_UID      = os.environ['SQL_UID']
    SQL_PWD      = os.environ['SQL_PWD']

    ODBC_CONNECTION_STRING = f'DRIVER={SQL_DRIVER};SERVER={SQL_SERVER};DATABASE={SQL_DATABASE};UID={SQL_UID};PWD={SQL_PWD}'
    DATABASE_URL           = 'mssql+pyodbc:///?odbc_connect={}'.format(urllib.parse.quote_plus(ODBC_CONNECTION_STRING))

else:
    DATABASE_URL = 'sqlite:///tests/test.sqlite3'

engine = sqlalchemy.create_engine(DATABASE_URL)
# NOTE: We need a call for `session_commit` method when `autocommit` is `False`.
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)


from .base import Base
from .user import User
from .message import Message

# MARK: this may lead to unexpected behaviour when using database on cloud.
Base.metadata.create_all(bind=engine)
