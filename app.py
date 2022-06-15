from crypt import methods
from flask import Flask, send_from_directory
from flask import jsonify, request, render_template
import flask
from flask_cors import CORS
from dotenv import load_dotenv
from os import getenv



app = Flask(__name__)
CORS(app)
load_dotenv()



@app.route("/react", methods=["GET", "POST"])
def react ():
    return render_template("reacting.html")


@app.route("/pyscript", methods=["GET", "POST"])
def pyscript ():
    return render_template("pyscript.html")

@app.route("/<path:path>", methods=["GET", "POST"])
def file (path):
    return send_from_directory("js", path)

@app.route("/example", methods=["GET", "POST"])
def example ():
    return {"test": getenv('TESTE_PASS')}


if __name__ == "__main__":
    app.run(host="192.168.0.25", port=8000, debug=True)



