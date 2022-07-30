import json

from azure.functions import HttpResponse


class MethodNotMatched(HttpResponse, Exception):
    def __init__(self):
        body = json.dumps({'name': 'MethodNotMatched'}).encode('utf-8')
        super().__init__(body, status_code=404, mimetype='application/json')

class BadRequest(HttpResponse, Exception):
    def __init__(self):
        body = json.dumps({'name': 'BadRequest'}).encode('utf-8')
        super().__init__(body, status_code=400, mimetype='application/json')


class ResourceNotFound(HttpResponse, Exception):
    def __init__(self):
        body = json.dumps({'name': 'ResourceNotFound'}).encode('utf-8')
        super().__init__(body, status_code=404, mimetype='application/json')


class Forbidden(HttpResponse, Exception):
    def __init__(self):
        body = json.dumps({'name': 'Forbidden'}).encode('utf-8')
        super().__init__(body, status_code=403, mimetype='application/json')


class InternalError(HttpResponse, Exception):
    def __init__(self):
        body = json.dumps({'name': 'InternalError'}).encode('utf-8')
        super().__init__(body, status_code=500, mimetype='application/json')
