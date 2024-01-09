import os
from textblob import TextBlob
from googleapiclient.discovery import build
import matplotlib.pyplot as plt
import datetime 

# Set up the YouTube Data API
api_key = "AIzaSyAg3asNgw8j9dhldu_9Y1enwgiLpoPFy0o"  
youtube = build("youtube", "v3", developerKey=api_key)
#channel_id = "UCQoXJucsPcgpILS2nmBSqGw" 

def get_channel_info(channel_id):
    request = youtube.channels().list(
        part="snippet,statistics",
        id=channel_id
    )

    response = request.execute()

    if 'items' in response:
        channel_data = response['items'][0]
        snippet = channel_data['snippet']
        statistics = channel_data['statistics']

        profile_name = snippet['title']
        subscribers_count = int(statistics.get('subscriberCount', 0))
        total_videos = int(statistics.get('videoCount', 0))

        return {
            "ProfileName": profile_name,
            "SubscribersCount": subscribers_count,
            "TotalVideos": total_videos
        }
    else:
        return None

# Function to fetch comments from a YouTube video
def get_video_comments(video_id):
    comments = []
    results = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        textFormat="plainText",
        maxResults=100  #adjust the number of comments to retrieve
    ).execute()

    while results:
        for item in results['items']:
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            comments.append(comment)

        
        try:
            results = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                pageToken=results['nextPageToken'],
                maxResults=100
            ).execute()
        except KeyError:
            break

    return comments

# Function to perform sentiment analysis on comments
def analyze_sentiment(comments):
    positive = 0
    negative = 0
    neutral = 0

    for comment in comments:
        analysis = TextBlob(comment)
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

def get_channel_videos(channel_id):
    videos = []
    next_page_token = None

    while True:
        request = youtube.search().list(
            part="snippet",
            channelId=channel_id,
            maxResults=50,  # You can adjust this value as needed
            order="date",
            pageToken=next_page_token
        )
        response = request.execute()

        for item in response["items"]:
            if item["id"]["kind"] == "youtube#video":
                video = item["snippet"]
                videos.append({
                    "title": video["title"],
                    "published_at": video["publishedAt"]
                })

        next_page_token = response.get("nextPageToken")

        if not next_page_token:
            break

    return videos


def analyze_video_frequency(channel_id):
    videos = get_channel_videos(channel_id)

    video_dates = [datetime.datetime.fromisoformat(video["published_at"].replace("Z", "+00:00")) for video in videos]
    video_counts = {}

    for date in video_dates:
        date_str = date.strftime("%d-%m-%Y")
        video_counts[date_str] = video_counts.get(date_str, 0) + 1

    return video_counts

def get_video_comments1(video_id):
    comments = []
    next_page_token = None

    while True:
        request = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,  # You can adjust this value as needed
            pageToken=next_page_token
        )
        response = request.execute()

        for item in response["items"]:
            comment = item["snippet"]["topLevelComment"]["snippet"]
            comments.append({
                "author": comment["authorDisplayName"],
                "text": comment["textDisplay"],
                "published_at": comment["publishedAt"]
            })

        next_page_token = response.get("nextPageToken")

        if not next_page_token:
            break

    return comments

def analyze_comment_frequency(video_id):
    comments = get_video_comments1(video_id)

    # Extract the publication dates of comments and count their frequency
    comment_dates = [datetime.datetime.fromisoformat(comment["published_at"].replace("Z", "+00:00")) for comment in
                     comments]
    comment_counts = {}

    for date in comment_dates:
        date_str = date.strftime("%d-%m-%Y")
        comment_counts[date_str] = comment_counts.get(date_str, 0) + 1
        

    return comment_counts

def get_channel_statistics(channel_id):
    request = youtube.channels().list(
        part='statistics',
        id=channel_id
    )
    response = request.execute()

    if 'items' in response:
        channel_data = response['items'][0]['statistics']
        return channel_data
    else:
        return None

def get_channel_videos(channel_id):
    videos = []
    next_page_token = None

    while True:
        request = youtube.search().list(
            part='snippet',
            channelId=channel_id,
            maxResults=50,  # You can adjust this value as needed
            order='date',
            pageToken=next_page_token
        )
        response = request.execute()

        for item in response['items']:
            if item['id']['kind'] == 'youtube#video':
                videos.append({
                    'title': item['snippet']['title'],
                    'published_at': item['snippet']['publishedAt']
                })

        next_page_token = response.get('nextPageToken')

        if not next_page_token:
            break

    return videos

def fetch_basic_youtube_data(channel_id):
    channel_info = get_channel_info(channel_id)

    video_frequency = analyze_video_frequency(channel_id)
    sorted_video_frequency = dict(sorted(video_frequency.items()))

    if channel_info:
        return {
            'channel_name': channel_info['ProfileName'],
            'subscribers': channel_info['SubscribersCount'],
            'total_videos': channel_info['TotalVideos'],
            'video_frequency': sorted_video_frequency,
        }
    else:
        print("Channel not found or no data available.")
        return None

def fetch_youtube_data(video_url):

    video_id = video_url.split("v=")[1]

    comments = get_video_comments(video_id)
    sentiment_results = analyze_sentiment(comments)

    comment_frequency = analyze_comment_frequency(video_id)

    # Sort the dictionary by date
    sorted_comment_frequency = dict(sorted(comment_frequency.items()))

    return  {
        'sentiment_results': sentiment_results,
        'comment_frequency': sorted_comment_frequency,
    }
