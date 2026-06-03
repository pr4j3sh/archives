from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health(req: Request):
    etag = "v1"
    if req.headers.get("if-none-match") == etag:
        return Response(status_code=status.HTTP_304_NOT_MODIFIED)

    time.sleep(5)
    res = Response(
        content='{"message": "server online"}', media_type="application/json"
    )

    res.headers["Cache-Control"] = "public, max-age=60"
    res.headers["ETag"] = etag

    return res
