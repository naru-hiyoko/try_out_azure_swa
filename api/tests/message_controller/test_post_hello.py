import json
import azure.functions as func

from message_controller.index import main


def test_returns_200():
    body = json.dumps({
        'message': 'hello from client',
    }).encode('utf-8')

    route_params = {
        'action': 'create_one',
    }

    req = func.HttpRequest(method='POST', body=body, route_params=route_params, url='')
    resp = main(req)
    resp_body = json.loads(resp.get_body())
    expected = {
        'message': 'echo back `hello from client` from POST method.',
    }

    assert resp.status_code == 200
    assert resp_body == expected
