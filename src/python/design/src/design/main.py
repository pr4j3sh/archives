from fastapi import FastAPI

from design.schema import Payload

app = FastAPI(title="System Design Tutorials", version="0.0.1")


@app.get("/")
def health():
    res = {"msg": "server online", "error": False, "data": None}
    return res


@app.post("/")
def payload(req: Payload):
    res = {
        "msg": "recieved message successfully",
        "error": False,
        "data": req.model_dump(),
    }
    return res
