from flask import Flask,jsonify,request,Response
from flask_cors import CORS
import re
from urllib.parse import unquote
from scripts.instagram_script import fetch_instagram_data
from scripts.youtube_script import fetch_youtube_data,fetch_basic_youtube_data
from scripts.facebook_script import fetch_facebook_data,fetch_basic_facebook_data
from scripts.linkedin_script import fetch_linkedin_data,fetch_basic_linkedin_data
from scripts.textPlagiarism import get_sentences,get_similarity_list,get_url
from scripts.chatbot import rules,respond_to_input

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['GET','POST'])
def get_data():
    if request.method == 'GET':
        data={
            "message":"hi this is neha code"
        }
        return jsonify(data)
    elif request.method == 'POST':
        user_input = request.json.get('user_input', '')
        print('Received user input:', user_input)
    
        response = respond_to_input(user_input)
        print('Generated response:', response)
    
        return jsonify({"response": response})

@app.route('/instagram_profile', methods=['GET','POST'])
def instagram_profile():
    data = request.json
    user_name=data.get('user_name','')

    if user_name:
        print('Received user input:', user_name)
        response = fetch_instagram_data(user_name)
        print('Generated response:', response)

        if 'error' in response:
            return jsonify({'error': response['error']}), 400

        return jsonify({"response": response})
        

@app.route('/youtube_profile', methods=['GET','POST'])
def youtube_profile():
    data = request.json
    channel_id = data.get('channel_id', '')
    video_url = data.get('video_url', '')

    if channel_id:
        print('Received user input:', channel_id)
        response = fetch_basic_youtube_data(channel_id)
        print('Generated response:', response)

        if 'error' in response:
            return jsonify({'error': response['error']}), 400

        return jsonify({"response": response})

    if video_url:
        print('Received user input:', video_url)
        response = fetch_youtube_data(video_url)
        print('Generated response:', response)

        if 'error' in response:
            return jsonify({'error': response['error']}), 400

        return jsonify({"response": response})

    else:
        return jsonify({'error': 'Invalid input'}), 400


@app.route('/facebook_profile',methods=['POST','GET'])
def facebook_profile(): 
    data = request.json
    page_id = data.get('page_id','')
    post_id = data.get('post_id','')
    
    if page_id:
        print('Received user input:', page_id)
        response = fetch_basic_facebook_data(page_id)
        print('Generated response:', response)

        if 'error' in response:
            return jsonify({'error': response['error']}), 400

        return jsonify({"response": response})
    
    elif post_id:
        #174509272412548
        print('Received user input:', post_id)
        response = fetch_facebook_data(174509272412548, post_id)
        print('Generated response:', response)

        if 'error' in response:
            return jsonify({'error': response['error']}), 400

        return jsonify({"response": response})
    
    else:
        return jsonify({'error': 'Invalid input'}), 400

@app.route('/linkedin_profile', methods=['GET', 'POST'])
def linkedin_profile():
    data = request.json
    user_id = data.get('user_id', '')
    post_url = data.get('post_url', '')

    if user_id:
        print('Received user input:', user_id)
        response = fetch_basic_linkedin_data(user_id)
        print('Generated response:', response)

        if 'error' in response:
            return {'error': response['error']}, 400

        return {'response': response}

    elif post_url:
        print('Received user input:', post_url)
        response = fetch_linkedin_data(post_url)
        print('Generated response:', response)

        if 'error' in response:
            return {'error': response['error']}, 400

        return {'response': response}

    else:
        return {'error': 'Invalid input'}, 400


    

    
@app.route('/text_plagiarism',methods=['GET','POST'])
def text_plagiarism():
    data = request.get_json()
    text = data['text']
    
    sentences = get_sentences(text)
    url = [get_url(sentence) for sentence in sentences]
    
    if None in url:
        return jsonify({'message': 'No plagiarism detected!'})

    similarity_list = get_similarity_list(text, url)
    result = {'sentences': sentences, 'urls': url, 'similarity_list': similarity_list}
    return jsonify(result)

# Route for handling user input
@app.route('/chatbot', methods=['POST','GET'])
def chatbot():
    user_input = request.json.get('user_input', '')

    # Check if the previous response included the "Would you like to go to the Main Menu?" prompt
    if user_input.lower() == 'yes':
        # Return the main menu
        response = rules["main menu"]
    elif user_input.lower() == 'no':
        # Handle the case where the user clicked "No" (you may customize this based on your application)
        response = rules ["goodbye"]
    else:
        # Respond to the user input as usual
        response = respond_to_input(user_input)

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)