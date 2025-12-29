import os
import importlib
import pytest

from fastapi.testclient import TestClient

# Create a temporary SQLite file-based DB for the test session so multiple
# connections/threads see the same DB (avoids ':memory:' per-connection issues).
@pytest.fixture(scope="session", autouse=True)
def setup_test_db(tmp_path_factory):
    db_dir = tmp_path_factory.mktemp("data")
    db_file = db_dir / "test_database.db"
    os.environ['DATABASE_URL'] = f"sqlite:///{db_file}"

    # reload database module so engine is created with test DATABASE_URL
    import app.database as database
    importlib.reload(database)

    # create tables once for the session
    database.create_db_and_tables()

    yield

    # cleanup (pytest tmp_path_factory removes tmp directories automatically)


@pytest.fixture
def client():
    # Reload main to ensure it picks up the test database engine
    import app.main as main
    importlib.reload(main)

    # Ensure tables exist before each test (additional safety)
    import app.database as database
    database.create_db_and_tables()

    with TestClient(main.app) as c:
        yield c
