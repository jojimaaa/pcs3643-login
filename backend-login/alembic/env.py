from logging.config import fileConfig
import os, sys
from dotenv import load_dotenv
from alembic import context
from sqlalchemy import engine_from_config, pool
from sqlmodel import SQLModel

# BASE_DIR = backend-login (onde fica o .env e o pacote app/)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# Carrega .env
load_dotenv(os.path.join(BASE_DIR, ".env"))

# Config do Alembic
config = context.config
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Deixa 'app' importável (backend-login/app)
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

# Importa e registra modelos
from app import models  # noqa: F401
target_metadata = SQLModel.metadata

def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
