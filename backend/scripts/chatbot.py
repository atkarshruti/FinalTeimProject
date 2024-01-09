from flask import Flask,jsonify,request
from flask_cors import CORS
import spacy
import random

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

rules = {
    "hi": [
        {"text": "Hi there!", "clickable": False},
    ],
    "how are you": [
        {"text": "I'm just a chatbot, but I'm here to help!", "clickable": False}
    ],
    "goodbye": [
        {"text": "Alright, feel free to ask anything else!", "clickable": False}
    ],
    "your name": [
        {"text": "I don't have a name, but you can call me Seva Facillity Chatbot.", "clickable": False}
    ],
    "main menu": [
        {"text": "Services", "clickable": True},
        {"text": "Products", "clickable": True},
        {"text": "Request Price/Quote", "clickable": True},
        {"text": "Branches", "clickable": True},
        {"text": "Contact Us", "clickable": True},
        {"text": "About Us", "clickable": True},
        {"text": "Clients", "clickable": True}
    ],
    "services": [
        {"text": "Pest Control", "clickable": True},
        {"text": "Fumigation Service", "clickable": True},
        {"text": "Silo Fumigation", "clickable": True},
        {"text": "Sanitization", "clickable": True},
        {"text": "Other Services", "clickable": True}
    ],
    "products": [
        {"text": "RodeXit Proofing Strip", "clickable": True},
        {"text": "AedesX Smart Gravitrap", "clickable": True},
        {"text": "FLYght Traps", "clickable": True}
    ],
    "request price/quote": [
        {"text": "Please fill the following form:", "clickable": False},
        {"text": "https://docs.google.com/forms/d/1Ae_Zo1efdL6HSdk9KCeOJLrUAZWSGWDj7UnYMJNopoA/viewform?edit_requested=true", "clickable": False}
    ],
    "branches": [
        {"text": "Pune", "clickable": False},
        {"text": "Hyderabad", "clickable": False},
        {"text": "Mumbai", "clickable": False},
        {"text": "Belgaum", "clickable": False},
        {"text": "Nagpur", "clickable": False},
        {"text": "Aurangabad", "clickable": False},
        {"text": "Amravati", "clickable": False},
        {"text": "Indore", "clickable":False},
        {"text": "Nizamabad", "clickable": False}
    ],
    "contact us": [
        {"text": "Seva Facility Services Pvt. Ltd. Office No. 406, 4th Floor Biz Building, Above Axis Bank S. No. 203, Bhondve Chowk Ravet, Pune - 412101", "clickable": False},
        {"text": "Contact: +917219241555", "clickable": False},
        {"text": "Mail: info@sevafacility.com", "clickable": False}
    ],
    "about us": [
        {"text": "To acquire additional information, please explore the following:", "clickable": False},
        {"text": "https://sevafacility.com/about-us.html", "clickable": False}
    ],
    "clients": [
        {"text": "Bosch Chassis System Pvt Ltd", "clickable": False},
        {"text": "Flash Electronics", "clickable": False},
        {"text": "IDBI bank", "clickable": False},
        {"text": "Parekh Integrated", "clickable": False},
        {"text": "Podar International School", "clickable": False},
        {"text": "Sony India Pvt Ltd", "clickable": False},
        {"text": "Tata Chemicals Ltd", "clickable": False},
        {"text": "Silver Gardenia Society", "clickable": False},
        {"text": "Shree Trading Company", "clickable": False}
    ],
    "pest control": [
        {"text": "Cockroach Management", "clickable": True},
        {"text": "Ant Management", "clickable": True},
        {"text": "Bed bug Management", "clickable": True},
        {"text": "Rodent Management", "clickable": True},
        {"text": "Fly Management", "clickable": True},
        {"text": "Mosquito Management", "clickable": True},
        {"text": "Termite Management", "clickable": True},
        {"text": "Wood Borer Management", "clickable": True},
        {"text": "Lizard Management", "clickable": True},
        {"text": "Spider Management", "clickable": True},
    ],
    "cockroach management":[
        {"text": "To know more, please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Cockroach-Management-Services-in-pune.html", "clickable": False}
    ],
    "ant management":[
        {"text": "To know more, please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Ant-Management-Services-in-pune.html", "clickable": False}
    ],
    "bed bug management":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Bed-Bug-Services-in-pune.html", "clickable": False}
    ],
    "rodent management":[
        {"text": "To know more, please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Rodent-Management-Services-in-pune.html", "clickable": False}
    ],
    "fly management":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Fly-Management-Services-in-pune.html", "clickable": False}
    ],
    "mosquito management":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Mosquito-Management-Services-in-pune.html", "clickable": False}
    ],
    "termite management":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Termite-Management-Services-in-pune.html", "clickable": False}
    ],
    "wood borer management":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Wood-Borer-Services-in-pune.html", "clickable": False}
    ],
    "lizard management":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Lizard-Management-Services-in-pune.html", "clickable": False}
    ],
    "spider management":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Spider-Management-Services-in-pune.html", "clickable": False}
    ],
    "rodexit proofing strip":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/rodexit-proofing-strip-suppliers-in-pune.html", "clickable": False}
    ],
    "aeedesx smart gravitrap":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/aedesx-smart-gravitrap-suppliers-in-pune.html", "clickable": False}
    ],
    "flyght traps":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/flyght-traps-suppliers-in-pune.html", "clickable": False}
    ],
     "fumigation service":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/Fumigation-Services-in-pune.html", "clickable": False}
    ],
     "silo fumigation":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/silo-fumigation-services-in-pune-india.html", "clickable": False}
    ],
     "sanitization":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/sanitization-services-in-india.html", "clickable": False}
    ],
    "other services":[
        {"text": "To know more,please explore the following:", "clickable": False},
        {"text": "https://www.sevafacility.com/other-services.html", "clickable": False}
    ],
}

def respond_to_input(input_text):
    # Tokenize the input text

    input_text_lower = input_text.lower()
    if input_text_lower in rules:
        response = rules[input_text_lower]
        if isinstance(response, list):
            # Add the main menu to the end of the response along with the "Go to Main Menu" prompt
            return response + [
                {"text": "Would you like to go to the Main Menu?", "clickable": False},
                {"text": "Yes", "clickable": True},
                {"text": "No", "clickable": True}
            ]
        return [response] + [
            {"text": "Would you like to go to the Main Menu?", "clickable": False},
            {"text": "Yes", "clickable": True},
            {"text": "No", "clickable": True}
        ]
        
    partial_matches = [rules[key] for key in rules if input_text_lower in key]
    if partial_matches:
    # Combine responses from all partial matches
        combined_responses = []
        for response in partial_matches:
            if isinstance(response, list):
                combined_responses.extend(response)
            else:
                combined_responses.append(response)
        # Add the main menu and "Yes" and "No" options
        return combined_responses + [
            {"text": "Would you like to go to the Main Menu?", "clickable": False},
            {"text": "Yes", "clickable": True},
            {"text": "No", "clickable": True}
        ]
    
    # If no matching rules, return a default response with the "Go to Main Menu" prompt
    return ["I'm sorry, I don't understand that."] + [
        {"text": "Would you like to go to the Main Menu?", "clickable": False},
        {"text": "Yes", "clickable": True},
        {"text": "No", "clickable": True}
    ]


