from unittest.mock import MagicMock
import database.database
from main import app
from .test_data import valid_metadata_array


def override_metadata_collection():
    mock_collection = MagicMock()
    mock_collection.find.return_value = valid_metadata_array
    return mock_collection


def test_query_meta_success(client):
    account = "test_account"
    container = "test_container"
    query_condition = "min_frequency=8486280000&max_frequency=8486290000"

    # Override the dependency
    app.dependency_overrides[
        database.database.metadata_collection
    ] = override_metadata_collection

    response = client.get(
        f"/api/datasources/query?account={account}&container={container}&{query_condition}"
    )

    assert response.status_code == 200
    assert response.json() == valid_metadata_array

    # Reset the dependency overrides after the test
    app.dependency_overrides = {}
