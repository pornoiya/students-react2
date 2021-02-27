from web.view import app, db
from config import config

if __name__ == "__main__":
    app.run(debug=config.APP_DEBUG,
            host=config.APP_HOST, port=config.APP_PORT)
    db.conn.close()
