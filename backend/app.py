import librosa
import numpy as np
import os
import pydub
import mimetypes

from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
from joblib import load
from fastapi import UploadFile

from flask_cors import CORS
app = Flask(__name__)


cors = CORS(app)

import moviepy.editor as moviepy

# Load the trained Random Forest model
random_forest_model = load('random_forest_model.joblib')

    
def get_feature_vector(audio_file):
    print('audiofile', audio_file)
    # audio_file.save('temp_audio.wav')
    y, sr = librosa.load(audio_file, sr=None)  # Load audio file
    # Extract features
    spectral_centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))
    spectral_bandwidth = np.mean(librosa.feature.spectral_bandwidth(y=y, sr=sr))
    spectral_rolloff = np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr))
    zero_crossing_rate = np.mean(librosa.feature.zero_crossing_rate(y))
    mfccs = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13), axis=1)
    lpc = np.std(librosa.lpc(y, order=16))  # Specify the order parameter
    # Additional features
    spectral_contrast = np.mean(librosa.feature.spectral_contrast(y=y, sr=sr))
    chroma_stft = np.mean(librosa.feature.chroma_stft(y=y, sr=sr))
    tempo = librosa.beat.tempo(y=y, sr=sr)[0]
    # Combine features into a single feature vector
    feature_vector = [spectral_centroid, spectral_bandwidth, spectral_rolloff,
                      zero_crossing_rate, *mfccs, lpc, spectral_contrast,
                      chroma_stft, tempo]
    # Delete the temporary audio file
    os.remove(audio_file)
    return feature_vector

@app.route('/extract-features', methods=['POST'])
def extract_features():
    
    if 'audiofile' not in request.files:
        return jsonify({'error': 'Missing audiofile'}), 400

    audiofile = request.files.get('audiofile')
    
    
    
    if audiofile and audiofile.filename != '':
        if not os.path.exists(path='uploads'):
            os.mkdir('uploads')
        dest = os.path.join(
            'uploads', 
            secure_filename(audiofile.filename)
        )
        
        print('audiofile', audiofile)  # Should now print ('audio/wav')
        
        # Save the file on the server.
        audiofile.save(dest)
        print('dest', dest)
    
    # Extract features from the recorded audio file
    
    feature_vector = get_feature_vector(dest)
    
    prediction = random_forest_model.predict([feature_vector])[0]
    
    return jsonify({'prediction': str(prediction)}), 200
    # return res, 200

if __name__ == '__main__':
    app.run(debug=True)
