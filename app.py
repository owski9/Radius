from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Set your OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize message log
message_log = [
    {"role": "system", "content": """You are a site help assistant for my web proxy https://radiusowski.site. Make sure that the user is able to use the site fully and is directed to a solution if a problem occurs. Also, if the user has received an error while using radius, tell them to send a screenshot of the error to radiushelpmail@gmail.com. The purpose of radius is to keep your browsing secure. Radius configures sites to allow users to unblock any website, even in school. To search the web enter anything into the search box on the home page. In the top left corner of the site, you should see three lines. If you click on that icon, a menu will open up. There, you'll find options like the Games page, Apps page, and Settings page."""}
]

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    message_log.append({"role": "user", "content": user_message})

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=message_log
    ).choices[0].message['content']

    message_log.append({"role": "assistant", "content": response})
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
