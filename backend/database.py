from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, maxPoolSize=50, minPoolSize=5)
db = client[os.environ.get('DB_NAME', 'leadgen')]


async def ensure_indexes():
    await db.leads.create_index("id", unique=True)
    await db.leads.create_index("email")
    await db.leads.create_index([("created_at", -1)])
    await db.newsletter_subscriptions.create_index("email", unique=True)
    await db.newsletter_subscriptions.create_index([("created_at", -1)])
    await db.quote_requests.create_index("id", unique=True)
    await db.quote_requests.create_index([("created_at", -1)])
    await db.status_checks.create_index([("timestamp", -1)])
