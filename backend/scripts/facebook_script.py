import facebook
import matplotlib.pyplot as plt
from datetime import datetime
from collections import Counter
import requests
from textblob import TextBlob
import matplotlib.pyplot as plt


# Replace 'YOUR_ACCESS_TOKEN' with the actual access token
access_token = 'EAAc0VR45kxkBO77eNXMoIIicIom4mzZAEUZAk6cyUBHvEXvBZAPI7omLM0ax4105w2TOd5f8hWaAmoGNKANbWvUd6NgDY7B4bOK6cUmPWALtktaiMdUMrvYK0WAWg93GPgGInnJJXWHCzDL5PnI966pEBampw8SZBeKnbZB8m3j7pNh928qYCGCXcV2oGw1cZD'
# Replace 'PAGE_ID' with the actual ID of the Facebook Page
#page_id = '174509272412548'

# Replace 'POST_ID' with the actual ID of the post on the Page
#post_id = '122104540676125482'
   

def get_page_post_comments(page_id, post_id, access_token):
    base_url = f'https://graph.facebook.com/v13.0/{page_id}_{post_id}/comments'
    params = {'access_token': access_token}

    response = requests.get(base_url, params=params)
    comments_data = response.json().get('data', [])

    return comments_data

def analyze_sentiment(comments):
    positive = 0
    negative = 0
    neutral = 0

    for comment in comments:
        analysis = TextBlob(comment['message'])
        sentiment_score = analysis.sentiment.polarity

        if sentiment_score > 0:
            positive += 1
        elif sentiment_score < 0:
            negative += 1
        else:
            neutral += 1

    sentiment_results = {
        "Positive": positive,
        "Negative": negative,
        "Neutral": neutral,
        
    }

    return sentiment_results

def fetch_basic_facebook_data(page_id):
    graph = facebook.GraphAPI(access_token)

    profile = graph.get_object(id=page_id, fields='name,fan_count') 
    posts = graph.get_connections("me", "posts")
    total_post_count = len(posts)

     # Get user's posts
    posts = graph.get_connections("me", "posts")

    # Extract post dates and count daily posts
    post_dates = [datetime.strptime(post['created_time'], '%Y-%m-%dT%H:%M:%S%z').date() for post in posts['data']]
    
    # Sort the dates
    sorted_dates = sorted(post_dates)
    
    # Convert sorted dates to strings
    post_dates_str = [str(date) for date in sorted_dates]
    
    daily_post_count = Counter(post_dates_str)

    data = {
        'total_post_count': total_post_count,
        'page_name':profile['name'],
        'followers':profile['fan_count'],
        'page_likes': profile['fan_count'],
        'daily_post_count': daily_post_count,
    }

    return data

    
def fetch_facebook_data(page_id,post_id):
    # Get comments for the Page post
    page_post_comments = get_page_post_comments(page_id, post_id, access_token)

    # Analyze sentiment for each comment
    sentiments_count = {'Positive': 0, 'Negative': 0, 'Neutral': 0}
    for comment in page_post_comments:
        sentiment = analyze_sentiment([comment])
        sentiments_count['Positive'] += sentiment['Positive']
        sentiments_count['Negative'] += sentiment['Negative']
        sentiments_count['Neutral'] += sentiment['Neutral']

    data = {
        'sentiments_count': sentiments_count,
    }

    return data
