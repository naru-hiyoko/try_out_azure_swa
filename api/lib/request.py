import logging

from azure.functions import HttpRequest
from cerberus import Validator
from cerberus.validator import DocumentError
from json.decoder import JSONDecodeError
from .errors import BadRequest


def validate_body_params(validator: Validator, req: HttpRequest) -> [dict, BadRequest]:
    try:
        params = req.get_json()
        if not validator(params):
            raise BadRequest()

    except (ValueError, JSONDecodeError, DocumentError):
        raise BadRequest()

    return params


def validate_route_params(validator: Validator, req: HttpRequest) -> [dict, BadRequest]:
    route_params = {k: v for k, v in req.route_params.items()}
    if not validator(route_params):
        raise BadRequest

    return route_params
