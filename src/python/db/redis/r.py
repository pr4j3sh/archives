import logging

import redis

logger = logging.getLogger(__name__)


class Redis:
    def __init__(self, host: str, port: int) -> None:
        self.host = host
        self.port = port

    def connect(self):
        try:
            r = redis.Redis(
                host=self.host, port=self.port, decode_responses=True
            )  # decode_responses = True shows outputs in plain text, rather than bytes

            res = r.ping()
            logger.warning(f"connection: {res}")
            return r
        except Exception as e:
            logger.error(e)
            raise e

    def set_value(self, r, key: str, value: str):
        try:
            res = r.set(key, value)
            logger.warning(f"set: {res}")
        except Exception as e:
            logger.error(e)
            raise e

    def get_value(self, r, key: str):
        try:
            res = r.get(key)
            logger.warning(f"get: {key} -> {res}")
        except Exception as e:
            logger.error(e)
            raise e

    def delete_value(self, r, key: str):
        try:
            res = r.delete(key)
            logger.warning(f"delete: {res}")
        except Exception as e:
            logger.error(e)
            raise e
