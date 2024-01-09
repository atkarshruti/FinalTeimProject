import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CCardHeader,
  CRow,
  CInputGroup,
} from '@coreui/react'
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilContact, cilFilterPhoto, cilPeople, cilUser, cilUserFollow } from '@coreui/icons'
import { DocsCallout } from 'src/components'

const Linkedin = () => {
  const [data, setData] = useState([])
  const [postdata, setPostData] = useState([])
  const [userID, setUserID] = useState([])
  const [postURL, setPostURL] = useState('')

  const handleUserIDSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/linkedin_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userID }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setData(responseData)
        setUserID('')
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handlePostURLSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/linkedin_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_url: postURL }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setPostData(responseData)
        setPostURL('')
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const myData = JSON.stringify(data)
  const parsedData = JSON.parse(myData)

  let name, connections, views, requests, posts

  if (parsedData.response) {
    // Accessing individual elements
    name = parsedData.response.name
    connections = parsedData.response.connections
    views = parsedData.response.views
    requests = parsedData.response.requests
    posts = parsedData.response.posts
  } else {
    console.error('The response does not have the expected structure.')
  }

  const myPostData = JSON.stringify(postdata)
  const parsedPostData = JSON.parse(myPostData)

  let sentiment_data, comment_frequency

  if (parsedPostData.response) {
    // Accessing individual elements
    sentiment_data = JSON.stringify(parsedPostData.response.sentiment_data)
    comment_frequency = parsedPostData.response.comment_frequency
  } else {
    console.error('The response does not have the expected structure.')
  }

  const commentFrequencyData = {
    labels: comment_frequency ? comment_frequency.sorted_dates.map((date) => date.toString()) : [],
    datasets: [
      {
        label: 'Number of Comments',
        backgroundColor: '#fa1a71',
        borderColor: '#fa1a71',
        barThickness: 15,
        borderWidth: 5,
        data: comment_frequency ? comment_frequency.comment_counts : [],
      },
    ],
  }

  const sentimentAnalysisData = {
    labels: sentiment_data ? Object.keys(JSON.parse(sentiment_data)) : [],
    datasets: [
      {
        data: sentiment_data ? Object.values(JSON.parse(sentiment_data)) : [],
        backgroundColor: ['#17ab6f', '#ffff00', '#ed3e15'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <CRow>
      <CCol>
        <div className="mb-3">
          <form onSubmit={handleUserIDSubmit}>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              style={{ width: '260px', marginRight: '10px' }}
            />
            <button type="submit">Submit User ID</button>
          </form>
        </div>
        <CRow>
          <CCol xs="12" md="6">
            <CCard className="mb-6">
              <CCardHeader>
                <CCardTitle>Profile Metrics</CCardTitle>
              </CCardHeader>
              <CCardBody className="d-flex flex-row justify-content-between">
                <CCardBody className="linkedin-card">
                  <CCol className="text-center">
                    <CIcon icon={cilUser} size={'5xl'} />
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: '18px' }}>{name}</strong>
                        <br />
                        <span style={{ fontSize: '18px' }}>Name</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CCardBody>
                <CCardBody className="linkedin-card">
                  <CCol className="text-center">
                    <CIcon icon={cilFilterPhoto} size={'5xl'} />
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: '18px' }}>{posts}</strong>
                        <br />
                        <span style={{ fontSize: '18px' }}>Posts</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CCardBody>
                <CCardBody className="linkedin-card">
                  <CCol className="text-center">
                    <CIcon icon={cilContact} size={'5xl'} />
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: '18px' }}>{views}</strong>
                        <br />
                        <span style={{ fontSize: '18px' }}>Profile Views</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CCardBody>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs="12" md="6">
            <CCard className="mb-6">
              <CCardHeader>
                <CCardTitle>Connection Metrics</CCardTitle>
              </CCardHeader>
              <CCardBody className="d-flex flex-row justify-content-between">
                <CCardBody className="linkedin-card">
                  <CCol className="text-center">
                    <CIcon icon={cilPeople} size={'5xl'} />
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: '18px' }}>{connections}</strong>
                        <br />
                        <span style={{ fontSize: '18px' }}>Connections</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CCardBody>
                <CCardBody className="linkedin-card">
                  <CCol className="text-center">
                    <CIcon icon={cilUserFollow} size={'5xl'} />
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div style={{ textAlign: 'center' }}>
                        <strong style={{ fontSize: '18px' }}>{requests}</strong>
                        <br />
                        <span style={{ fontSize: '18px' }}>Invitations</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CCardBody>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <div className="mb-3 mt-4">
          <form onSubmit={handlePostURLSubmit}>
            <input
              type="text"
              placeholder="Enter Post URL"
              value={postURL}
              onChange={(e) => setPostURL(e.target.value)}
              style={{ width: '260px', marginRight: '10px' }}
            />
            <button type="submit">Submit Post URL</button>
          </form>
        </div>
        <CCard className="mb-4 mt-4">
          <CCardHeader>
            <CCardTitle>Comment Frequency Over Time</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CChartBar
              data={commentFrequencyData}
              height={'300px'}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: [
                    {
                      type: 'time',
                      time: {
                        unit: 'day',
                        displayFormats: {
                          day: 'DD MM YYYY',
                        },
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
                      text: 'Number of Comments',
                    },
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
        <div style={{ height: '20px' }}></div>
        <CCard className="mb-4" style={{ width: '50%' }}>
          <CCardHeader>
            <CCardTitle>Sentiment Analysis of Comments</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={sentimentAnalysisData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Linkedin
