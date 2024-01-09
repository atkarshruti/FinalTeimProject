import instaloader
import pandas as pd
import json
import requests
from io import BytesIO
from PIL import Image
from datetime import date
import numpy as np

#username = 'sevafacility'

def fetch_instagram_data(username):
    # Initialize an Instaloader instance
    L = instaloader.Instaloader()

    try:
        L.context.log("Logging in...")
       
        # Fetch the profile of the Instagram account
        profile = instaloader.Profile.from_username(L.context, username)



        #Data of each post
        data_list = []
        
        for post in profile.get_posts():

            # image_urls = [node.display_url for node in post.get_sidecar_nodes()]
            # if not image_urls:
            #     # If it's not a carousel, use the main post image URL
            #     image_urls = [post.url]

            data_list.append({
                'post_url':post.url,
                'Date': str(post.date_utc.date()),  # Extract the date (without time)
                'Likes': post.likes,
                'Comments': post.comments,
                'Caption': post.caption,
            })

        # Create a DataFrame from the collected data
        df = pd.DataFrame(data_list)

        # Calculate total likes and comments
        total_likes = df['Likes'].sum()
        total_comments = df['Comments'].sum()

        # Calculate average likes and comments per post
        average_likes_per_post = total_likes / len(df)
        # Round the average_likes to four decimal places
        average_likes_per_post = round(average_likes_per_post, 4)

        average_comments_per_post = total_comments / len(df)
        # Round the average_comments to four decimal places
        average_comments_per_post = round(average_comments_per_post, 4)

        # Count daily posts
        daily_post_count = df['Date'].value_counts().sort_index().to_dict()

        most_liked_posts = sorted(data_list, key=lambda x: x['Likes'], reverse=True)[:3]
        most_commented_posts = sorted(data_list, key=lambda x: x['Comments'], reverse=True)[:3]

        # Prepare the data to be returned
        data = {
            'full_name': profile.full_name,
            'followers': int(profile.followers),
            'following': int(profile.followees),
            'posts': int(profile.mediacount),
            'total_likes': int(total_likes),
            'average_likes': float(average_likes_per_post),
            'total_comments': int(total_comments),
            'average_comments': float(average_comments_per_post),
            'daily_post_count': daily_post_count,
            'most_liked_posts': most_liked_posts,
            'most_commented_posts': most_commented_posts,
        }

        return data

    except instaloader.exceptions.ProfileNotExistsException:
        return {'error': f"The Instagram account '{username}' does not exist."}

    finally:
        # Close the Instaloader instance
        L.context.log("Done.")
