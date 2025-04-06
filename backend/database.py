# DB connection code here

import sqlite3

def get_db():
    conn = sqlite3.connect("instabooster.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        plan TEXT DEFAULT 'free',
        daily_requests INTEGER DEFAULT 0,
        last_used TEXT
    )
    """)
    conn.commit()
    conn.close()
