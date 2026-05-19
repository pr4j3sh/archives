from fastapi import Body, FastAPI
from pydantic.main import BaseModel

app = FastAPI()


@app.get("/")
def get_msg():
    return {"message": "Hello World"}


class Req(BaseModel):
    username: str


@app.post("/")
def post_msg(req: Req = Body()):
    return {"username": req.username}
