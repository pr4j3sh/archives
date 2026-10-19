use actix_web::{App, HttpServer, Responder, Result, get, post, web};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::collections::HashMap;

static mut bin: HashMap<String, String> = HashMap::new();

#[derive(Serialize)]
struct HealthRes {
    success: bool,
    msg: String,
}

#[get("/")]
async fn check_health() -> Result<impl Responder> {
    let res = HealthRes {
        success: true,
        msg: "server online".to_string(),
    };
    Ok(web::Json(res))
}
#[derive(Serialize)]
struct CreateBinRes {
    success: bool,
    msg: String,
    hash: String,
}

#[post("/")]
async fn create_paste(text: String) -> Result<impl Responder> {
    let mut hasher = Sha256::new();

    hasher.update(text.as_bytes());

    let result = hasher.finalize();

    let hex_string = hex::encode(result);

    let res = CreateBinRes {
        success: true,
        msg: "server online".to_string(),
        hash: hex_string.to_string(),
    };
    Ok(web::Json(res))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(check_health).service(create_paste))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
