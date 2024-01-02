from flask import request, Flask, json, jsonify, send_from_directory, g
import sys
sys.path.append('C:/Users/Hangsihak Sin/OneDrive/Documents/School/Doc-Wise/')
import os
import urllib.request
from werkzeug.utils import secure_filename
from flask_cors import CORS

from backend.phase_one.phase_1_senmantic import main

app = Flask(__name__)
CORS(app, supports_credentials=True)

PHASE_ONE_UPLOAD_FOLDER = '../backend/phase_one/temp_files/'
PHASE_TWO_UPLOAD_FOLDER = '../backend/phase_two/temp_files/'

ALLOWED_EXTENSIONS = set(['doc', 'docx', 'pdf'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.before_request
def set_upload_folder():
    # g - used as a global namespace
    if request.path == '/phase-one/upload':
        g.upload_folder = PHASE_ONE_UPLOAD_FOLDER
    elif request.path == '/phase-two/upload':
        g.upload_folder = PHASE_TWO_UPLOAD_FOLDER
    else:
        g.upload_folder = None

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/phase-one/upload', methods=['POST'])
def upload_file_phase_one():
    return handle_upload()

@app.route('/phase-two/upload', methods=['POST'])
def upload_file_phase_two():
    return handle_upload()

def handle_upload():
    if 'file' not in request.files:
        return jsonify({"message": "No file part in the request", "status": "failed"}), 400

    files = request.files.getlist('file')
    errors = {}
    success = False

    for file in files:
        if file and allowed_file(file.filename):
            try:
                filename = secure_filename(file.filename)
                file.save(os.path.join(g.upload_folder, filename))
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
        # main()  # Uncomment this if you want to call a function after successful upload
        return jsonify({"message": "Files successfully uploaded", "status": "success"}), 201
    else:
        return jsonify({"message": "No valid files to upload", "status": "failed"}), 400
    

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        safe_filename = secure_filename(filename)

        return send_from_directory(app.config['UPLOAD_FOLDER'], safe_filename, as_attachment=True)
    except:
        return jsonify({"message": "File not found", "status": "failed"}), 404
