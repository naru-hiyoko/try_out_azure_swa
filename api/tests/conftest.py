import pytest

from lib.models import engine, Base


@pytest.fixture(scope='function', autouse=True)
def setup():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
