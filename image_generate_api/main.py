from flask import Flask, request, jsonify
from flask_cors import CORS
from image_generator import generate_image

app = Flask(__name__)
CORS(app)

@app.route('/generate-image', methods=['POST'])
def generate_image_endpoint():
    data = request.json
    prompt = data.get("prompt")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    image_base64 = generate_image(prompt)
    return jsonify({"image": image_base64})

if __name__ == '__main__':
    app.run(debug=True)
