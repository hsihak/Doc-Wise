from flask import Flask, request, jsonify, send_from_directory, g
from werkzeug.utils import secure_filename
from flask_cors import CORS
import sys
sys.path.append('C:/Users/Hangsihak Sin/OneDrive/Documents/School/Doc-Wise/')
import os
from backend.phase_one.phase_1_senmantic import main as phase_one_main
from backend.phase_two.phase_2_highlighting import main as phase_two_main

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Define separate upload folders for each phase
PHASE_ONE_UPLOAD_FOLDER = '../backend/phase_one/temp_files/'
PHASE_TWO_UPLOAD_FOLDER = '../backend/phase_two/temp_files/'
PHASE_THREE_UPLOAD_FOLDER = '../backend/phase_three/temp_files/'

ALLOWED_EXTENSIONS = set(['doc', 'docx', 'pdf'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.before_request
def set_upload_folder():
    if '/phase-one/' in request.path:
        g.upload_folder = PHASE_ONE_UPLOAD_FOLDER
    elif '/phase-two/' in request.path:
        g.upload_folder = PHASE_TWO_UPLOAD_FOLDER
    elif '/phase-three' in request.path:
        g.upload_folder = PHASE_THREE_UPLOAD_FOLDER
    else:
        g.upload_folder = None

@app.route('/')
def hello_world():
    return '<p>Hello, World!</p>'

@app.route('/phase-one/upload', methods=['POST'])
def upload_file_phase_one():
    return handle_upload(phase='one')

@app.route('/phase-two/upload', methods=['POST'])
def upload_file_phase_two():
    return handle_upload(phase='two')

@app.route('/phase-three/upload', methods=['POST'])
def upload_file_phase_three():
    return handle_upload(phase='three')

def handle_upload(phase):
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
        if phase == 'one':
            phase_one_main()
        elif phase == 'two':
            phase_two_main()
        # elif phase == 'three':
        #     phase_three_main()
        return jsonify({"message": "Files successfully uploaded", "status": "success"}), 201
    else:
        return jsonify({"message": "No valid files to upload", "status": "failed"}), 400

@app.route('/phase-one/download/<filename>', methods=['GET'])
def download_file_phase_one(filename = PHASE_ONE_UPLOAD_FOLDER):
    return handle_download(filename)
    
@app.route('/phase-two/download/<filename>', methods=['GET'])
def download_file_phase_two(filename = PHASE_TWO_UPLOAD_FOLDER):
    return handle_download(filename)

@app.route('/phase-three/download/<filename>', methods=['GET'])
def download_file_phase_three(filename = PHASE_THREE_UPLOAD_FOLDER):
    return handle_download(filename)

def handle_download(filename):
    try:
        safe_filename = secure_filename(filename)
        return send_from_directory(g.upload_folder, safe_filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({"message": "File not found", "status": "failed"}), 404

if __name__ == "__main__":
    app.run(debug=True)
