import json
import azure.functions as func

from message_controller.index import main
from lib.models import Session, Message


def test_returns_200():
    with Session() as session:
        entity = Message(id=1, content='test')
        session.add(entity)
        session.commit()

    body = json.dumps({
        'message': 'hello',
    }).encode('utf-8')
    route_params = {
        'action': 'all',
    }
    req = func.HttpRequest(method='GET', body=None, route_params=route_params, params={}, url='')
    resp = main(req)
    resp_body = json.loads(resp.get_body())
    expected = [
        {'id': 1, 'content': 'test'}
    ]

    assert resp.status_code == 200
    assert resp_body == expected
