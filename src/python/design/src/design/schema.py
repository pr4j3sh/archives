from pydantic import BaseModel


class Payload(BaseModel):
    msg: str
