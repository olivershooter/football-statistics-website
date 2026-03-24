from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
import httpx
import logging

logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    api_key: str
    api_host: str = "v3.football.api-sports.io"

    class Config:
        env_file = ".env"


settings = Settings()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://football.olivershooter.com"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


async def make_api_request(params: dict):
    headers = {
        "x-rapidapi-key": settings.api_key,
        "x-rapidapi-host": settings.api_host,
    }
    url = f"https://{settings.api_host}/fixtures"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params, headers=headers)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            logger.warning("Upstream API returned %s", e.response.status_code)
            raise HTTPException(
                status_code=e.response.status_code,
                detail="Upstream API error.",
            )
        except Exception:
            logger.exception("Unexpected error calling upstream API")
            raise HTTPException(
                status_code=500,
                detail="An unexpected error occurred.",
            )


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/football/fixtures")
async def get_fixtures(
    id: int = Query(None),
    league: int = Query(None),
    season: int = Query(None),
):
    params = {}
    if id is not None:
        params["id"] = id
    if league is not None:
        params["league"] = league
    if season is not None:
        params["season"] = season
    return await make_api_request(params)
