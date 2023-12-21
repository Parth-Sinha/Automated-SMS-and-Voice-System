from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import twilio
from twilio.rest import Client
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)

@app.route('/messaging', methods = ['POST'])
def messaging():
    data = request.get_json()
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)
    phone_number = data.get('phoneNumber')
    message_body = data.get('message')
    if not phone_number or len(phone_number)< 10:
        return jsonify({'success': False, 'message': 'Please Enter a valid Phone number'})
    if not message_body:
        return jsonify({'success': False, 'message': "Please enter the valid msg!"})
    country_code = data.get('countryCode')
    phone_number = country_code + phone_number
    try:
        message = client.messages\
            .create(
                        body=message_body,
                        from_="+12059527406",
                        to=phone_number
                    )
    except twilio.base.exceptions.TwilioRestException as e:       
        return jsonify({'success': False, 'message': 'Error: ' + str(e.status)+ ' Please check the information entered and try again'})


    return jsonify({'success': True, 'message': 'Message initiated with the text : '+ str(message_body)})


@app.route('/call', methods = ['POST'])
def call():
    data = request.get_json()
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)
    phone_number = data.get('phoneNumber')
    message = data.get('message')
    if not phone_number or len(phone_number)< 10:
        return jsonify({'success': False, 'message': 'Please Enter a valid Phone number'})
    if not message:
        return jsonify({'success': False, 'message': "Please enter the valid msg!"})
    country_code = data.get('countryCode')
    phone_number = country_code + phone_number
    try:
        call = client.calls.create(
        url="http://demo.twilio.com/docs/voice.xml",
        to=phone_number,
        from_="+12059527406"
        )
    except twilio.base.exceptions.TwilioRestException as e:       
        return jsonify({'success': False, 'message': 'Error: ' + str(e.status)+ ' Please check the information entered and try again'})

    return jsonify({'success': True, 'message': 'Call initiated with the message : '+ str(message)})




if __name__ == '__main__':
    app.run(debug=True)
