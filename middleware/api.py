from flask import request, Flask, json, jsonify
import sys
sys.path.append('C:/Users/Hangsihak Sin/OneDrive/Documents/School/Doc-Wise/')
import os
import urllib.request
from werkzeug.utils import secure_filename
from flask_cors import CORS
from backend.phase_one.phase_1_senmantic import main

app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = '../backend/phase_one/static/content/temp_files/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['doc', 'docx', 'pdf'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file part in the request", "status": "failed"}), 400

    files = request.files.getlist('file')
    errors = {}
    success = False

    for file in files:
        if file and allowed_file(file.filename):
            try:
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                success = True
            except Exception as e:
                errors[file.filename] = str(e)
        else:
            errors[file.filename] = 'File type not allowed'

    if success and errors:
        errors['message'] = 'Some files were not uploaded'
        errors['status'] = 'partial_success'
        resp = jsonify(errors)
        resp.status_code = 207  # Multi-Status
        return resp
    elif success:
        main()
        return jsonify({"message": "Files successfully uploaded", "status": "success"}), 201
    else:
        return jsonify({"message": "No valid files to upload", "status": "failed"}), 400
