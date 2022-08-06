import sys
import json
import logging

from azure.functions import HttpRequest, HttpResponse
from cerberus import Validator
from lib.errors import BadRequest, MethodNotMatched
from lib.request import validate_body_params, validate_route_params, validate_query_params
from lib.models import Session, Message


def main(req: HttpRequest) -> HttpResponse:
    route_params_validator = Validator({
        'action': {
            'type': 'string',
            'required': True,
            'allowed': ['all', 'find_one', 'create_one', 'remove_one'],
        },
        # 'id': {
        #     'coerce': int,
        #     'required': True,
        # },
    })

    try:
        route_params = validate_route_params(route_params_validator, req)
    except BadRequest as error_resp:
        return error_resp

    try:
        action_name = req.method.lower() + '_' + route_params['action']
        action = getattr(sys.modules[__name__], action_name)
    except AttributeError:
        return MethodNotMatched()

    resp = action(req, route_params)
    return resp


def get_all(req: HttpRequest, route_params: dict):
    with Session() as session:
        messages_list = session.query(Message).all()

    resp_body = json.dumps([
        {
            'id': msg.id,
            'content': msg.content,
        } for msg in messages_list
    ])
    return HttpResponse(resp_body, status_code=200, mimetype='application/json')


def post_create_one(req: HttpRequest, route_params: dict):
    validator = Validator({
        'message': {
            'type': 'string',
            'required': True,
        },
    })

    try:
        body_params = validate_body_params(validator, req)
    except BadRequest as error_resp:
        return error_resp

    logging.info('hello method called.')
    message = body_params['message']

    with Session() as session:
        entity = Message(content=message)
        session.add(entity)
        session.commit()

    resp_body = json.dumps({
        'message': f'echo back `{message}` from POST method.'
    })
    return HttpResponse(resp_body, status_code=200, mimetype='application/json')


def delete_remove_one(req: HttpRequest, route_params: dict):
    validator = Validator({
        'id': {
            'coerce': int,
            'required': True,
        },
    })

    try:
        query_params = validate_query_params(validator, req)
    except BadRequest as error_resp:
        return error_resp

    with Session() as session:
        # message = session.query(Message).filter_by(Message.id==query_params['id']).one_or_none()
        session.query(Message).filter(Message.id==query_params['id']).delete()
        session.commit()

    return HttpResponse(json.dumps({}), status_code=200, mimetype='application/json')
