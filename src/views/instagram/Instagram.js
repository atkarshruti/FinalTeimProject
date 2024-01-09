import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'

import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilCommentBubble, cilFilterPhoto, cilPeople, cilThumbUp, cilUser } from '@coreui/icons'

const Instagram = () => {
  const [data, setData] = useState([])
  const [userInput, setUserInput] = useState('')

  const handleUserInputSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/instagram_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: userInput }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setData(responseData)
        setUserInput('')
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const myData = JSON.stringify(data)
  const parsedData = JSON.parse(myData)

  let full_name,
    followers,
    following,
    posts,
    total_likes,
    average_likes,
    total_comments,
    average_comments,
    daily_post_count,
    most_liked_posts,
    most_commented_posts
  if (parsedData.response) {
    // Accessing individual elements
    full_name = parsedData.response.full_name
    followers = parsedData.response.followers
    following = parsedData.response.following
    posts = parsedData.response.posts
    total_likes = parsedData.response.total_likes
    average_likes = parsedData.response.average_likes
    total_comments = parsedData.response.total_comments
    average_comments = parsedData.response.average_comments
    daily_post_count = JSON.stringify(parsedData.response.daily_post_count)
    most_liked_posts = JSON.stringify(parsedData.response.most_liked_posts)
    most_commented_posts = JSON.stringify(parsedData.response.most_commented_posts)
  } else {
    console.error('The response does not have the expected structure.')
  }

  const mostLikedPosts = most_liked_posts ? JSON.parse(most_liked_posts) : []
  const mostCommentedPosts = most_commented_posts ? JSON.parse(most_commented_posts) : []

  // Data for the pie chart of likes and comments distribution
  const likesCommentsData = {
    labels: ['Likes', 'Comments'],
    datasets: [
      {
        data: [total_likes, total_comments],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  }

  const dailyPostChartData = {
    labels: daily_post_count ? Object.keys(JSON.parse(daily_post_count)) : [],
    datasets: [
      {
        label: 'Number of Posts',
        backgroundColor: '#FF8300',
        borderColor: '#FF8300',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 131, 0, 0.8)',
        hoverBorderColor: '#FF8300',
        data: daily_post_count ? Object.values(JSON.parse(daily_post_count)) : [],
      },
    ],
  }

  return (
    <CRow>
      <div className="mb-3">
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: '260px', marginRight: '10px' }}
          />
          <button type="submit">Submit Username</button>
        </form>
      </div>
      <CCol>
        <CCard className="mb-3">
          <CCardHeader>
            <CCardTitle>Instagram Profile</CCardTitle>
          </CCardHeader>
          <CCardBody className="d-flex flex-row justify-content-between">
            <CCardText>
              <div className="info-box username-box">
                <CIcon icon={cilUser} size={'4xl'} /> <br />
                <span style={{ fontSize: '18px' }}>Full name</span> <br />
                <strong style={{ fontSize: '20px', color: 'black' }}>{full_name}</strong>
              </div>
            </CCardText>
            <CCardText>
              <div className="info-box followers-box">
                <CIcon icon={cilPeople} size={'4xl'} /> <br />
                <span style={{ fontSize: '18px' }}>Followers</span> <br />
                <strong style={{ fontSize: '20px', color: 'black' }}>{followers}</strong>
              </div>
            </CCardText>
            <CCardText>
              <div className="info-box following-box">
                <CIcon icon={cilPeople} size={'4xl'} /> <br />
                <span style={{ fontSize: '18px' }}>Following</span> <br />
                <strong style={{ fontSize: '20px', color: 'black' }}>{following}</strong>
              </div>
            </CCardText>
            <CCardText>
              <div className="info-box total-posts-box">
                <CIcon icon={cilFilterPhoto} size={'4xl'} /> <br />
                <span style={{ fontSize: '18px' }}>Total Posts</span> <br />
                <strong style={{ fontSize: '20px', color: 'black' }}>{posts}</strong>
              </div>
            </CCardText>
          </CCardBody>
        </CCard>
        <CCard className="mb-3">
          <CCardHeader>
            <CCardTitle>Account Likes Analysis</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <div className="row justify-content-between">
              <div className="col-md-5 pr-3 mx-auto">
                <CCardTitle className="text-center">
                  <CIcon icon={cilThumbUp} size={'6xl'} />
                </CCardTitle>
                <CCardText>
                  <div className="analysis-box total-container">
                    <span style={{ fontSize: '16px' }}>
                      <strong>{total_likes}</strong>
                      <br />
                      <span style={{ fontSize: '14px' }}>{'Total Likes'}</span>
                    </span>
                  </div>
                </CCardText>
                <CCardText>
                  <div className="analysis-box  total-container">
                    <span style={{ fontSize: '16px' }}>
                      <strong>{average_likes}</strong>
                      <br />
                      <span style={{ fontSize: '14px' }}>{'Average Likes per Post'}</span>
                    </span>
                  </div>
                </CCardText>
              </div>
              <div className="likes-box justify-content-between">
                <CCardBody>
                  <strong style={{ fontSize: '15px' }}>Most Liked Posts</strong>
                  <div className="row mb-3 pr-3">
                    {mostLikedPosts.map((post, index) => (
                      <div
                        key={index}
                        className="col-sm-4 mb-3 pr-3 square-effect square-effect1 post-item"
                      >
                        <span style={{ fontSize: '13px' }}>
                          <p>{`Likes: ${post.Likes}`}</p>
                        </span>
                        <span style={{ fontSize: '13px' }}>
                          <p>{`Caption: ${post.Caption}`}</p>
                        </span>
                        <span style={{ fontSize: '13px' }}>
                          <p>
                            {'URL: '}
                            <a href={post.post_url} target="_blank" rel="noopener noreferrer">
                              {post.post_url}
                            </a>
                          </p>
                        </span>
                      </div>
                    ))}
                  </div>
                </CCardBody>
              </div>
            </div>
          </CCardBody>
        </CCard>
        <CCard className="mb-3">
          <CCardHeader>
            <CCardTitle>Account Comments Analysis</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <div className="row justify-content-between">
              <div className="col-md-5 pr-3 mx-auto">
                <CCardTitle className="text-center">
                  <CIcon icon={cilCommentBubble} size={'6xl'} />
                </CCardTitle>
                <CCardText>
                  <div className="analysis-box  total-container">
                    <span style={{ fontSize: '16px' }}>
                      <strong>{total_comments}</strong>
                    </span>
                    <br />
                    <span style={{ fontSize: '14px' }}>{'Total Comments'}</span>
                  </div>
                </CCardText>
                <CCardText>
                  <div className="analysis-box  total-container">
                    <span style={{ fontSize: '16px' }}>
                      <strong>{average_comments}</strong>
                    </span>
                    <br />
                    <span style={{ fontSize: '14px' }}>{'Average Comments per Post'}</span>
                  </div>
                </CCardText>
              </div>
              <div className="comments-box justify-content-between">
                <CCardBody>
                  <strong style={{ fontSize: '15px' }}>Most Commented Posts</strong>
                  <div className="row mb-3 pr-3">
                    {mostCommentedPosts.map((post, index) => (
                      <div
                        key={index}
                        className="col-sm-4 mb-3 pr-3 square-effect square-effect2 post-item"
                      >
                        <span style={{ fontSize: '13px' }}>
                          <p>{`Comments: ${post.Comments}`}</p>
                        </span>
                        <span style={{ fontSize: '13px' }}>
                          <p>{`Caption: ${post.Caption}`}</p>
                        </span>
                        <span style={{ fontSize: '13px' }}>
                          <p>
                            {'URL: '}
                            <a href={post.post_url} target="_blank" rel="noopener noreferrer">
                              {post.post_url}
                            </a>
                          </p>
                        </span>
                      </div>
                    ))}
                  </div>
                </CCardBody>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg="6">
        <CCard className="mb-4">
          <CCardHeader>
            <CCardTitle>Likes and Comments Distribution</CCardTitle>
          </CCardHeader>
          <CCardBody>
            {/* Pie Chart for Likes and Comments */}
            <CChartPie
              data={likesCommentsData}
              height={'300px'}
              width={'300px'}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg="8">
        <CCard style={{ width: '900px' }}>
          <CCardHeader>
            <CCardTitle>Posting Frequency</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CChartLine
              data={dailyPostChartData}
              height={'500px'}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: [
                    {
                      type: 'time',
                      time: {
                        unit: 'day',
                      },
                      title: {
                        display: true,
                        text: 'Date',
                      },
                    },
                  ],
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Posts',
                    },
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Instagram
