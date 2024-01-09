import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

import { CChartDoughnut, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilFilterPhoto, cilPeople, cilThumbUp, cilUser } from '@coreui/icons'

const Facebook = () => {
  const [data, setData] = useState([])
  const [postdata, setPostData] = useState([])
  const [pageInput, setPageInput] = useState('')
  const [postInput, setPostInput] = useState('')

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/facebook_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_id: pageInput }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setData(responseData)
        setPageInput('')
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handlePostSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/facebook_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postInput }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setPostData(responseData)
        setPostInput('')
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const myData = JSON.stringify(data)
  const parsedData = JSON.parse(myData)

  let total_post_count, page_name, followers, page_likes, daily_post_count

  if (parsedData.response) {
    // Accessing individual elements
    total_post_count = parsedData.response.total_post_count
    page_name = parsedData.response.page_name
    followers = parsedData.response.followers
    page_likes = parsedData.response.page_likes
    daily_post_count = JSON.stringify(parsedData.response.daily_post_count)
  } else {
    console.error('The response does not have the expected structure.')
  }

  const myPostData = JSON.stringify(postdata)
  const parsedPostData = JSON.parse(myPostData)

  let sentiments_count

  if (parsedPostData.response) {
    // Accessing individual elements
    sentiments_count = JSON.stringify(parsedPostData.response.sentiments_count)
  } else {
    console.error('The response does not have the expected structure.')
  }

  const postFrequencyData = {
    labels: daily_post_count ? Object.keys(JSON.parse(daily_post_count)) : [],
    datasets: [
      {
        label: 'Number of Videos',
        backgroundColor: '#fa1a71',
        borderColor: '#fa1a71',
        borderWidth: 2,
        data: daily_post_count ? Object.values(JSON.parse(daily_post_count)) : [],
      },
    ],
  }

  const sentimentAnalysisData = {
    labels: sentiments_count ? Object.keys(JSON.parse(sentiments_count)) : [],
    datasets: [
      {
        data: sentiments_count ? Object.values(JSON.parse(sentiments_count)) : [],
        backgroundColor: ['#17ab6f', '#ffff00', '#ed3e15'],
        borderWidth: 1,
      },
    ],
  }
  return (
    <CRow>
      <div className="mb-3">
        <form onSubmit={handlePageSubmit}>
          <input
            type="text"
            placeholder="Enter Page ID"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            style={{ width: '260px', marginRight: '10px' }}
          />
          <button type="submit">Submit Page ID</button>
        </form>
      </div>
      <CCol md="6" className="mb-4" style={{ maxWidth: '300px' }}>
        <CCard>
          <CCardHeader>
            <CCardTitle>Facebook Page Profile</CCardTitle>
          </CCardHeader>
          <CCol>
            <CCardBody className="profile-card1 post-item">
              <CRow>
                <CCol xs="auto">
                  <div>
                    <CIcon icon={cilUser} size={'4xl'} />
                  </div>
                </CCol>
                <CCol>
                  <CCardText>
                    <div>
                      <strong style={{ fontSize: '18px' }}>{page_name}</strong>
                      <br />
                      <span style={{ fontSize: '15px' }}>Page Name</span>
                    </div>
                  </CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCol>
          <CCol>
            <CCardBody className="profile-card1 post-item">
              <CRow>
                <CCol xs="auto">
                  <div>
                    <CIcon icon={cilPeople} size={'4xl'} />
                  </div>
                </CCol>
                <CCol>
                  <CCardText>
                    <div>
                      <strong style={{ fontSize: '18px' }}>{followers}</strong> <br />
                      <span style={{ fontSize: '15px' }}>Followers</span>
                    </div>
                  </CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCol>
          <CCol>
            <CCardBody className="profile-card1 post-item">
              <CRow>
                <CCol xs="auto">
                  <div>
                    <CIcon icon={cilThumbUp} size={'4xl'} />
                  </div>
                </CCol>
                <CCol>
                  <CCardText>
                    <div>
                      <strong style={{ fontSize: '18px' }}>{page_likes}</strong> <br />
                      <span style={{ fontSize: '15px' }}>Likes</span>
                    </div>
                  </CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCol>
          <CCol>
            <CCardBody className="profile-card1 post-item">
              <CRow>
                <CCol xs="auto">
                  <div>
                    <CIcon icon={cilFilterPhoto} size={'4xl'} />
                  </div>
                </CCol>
                <CCol>
                  <CCardText>
                    <div>
                      <strong style={{ fontSize: '18px' }}>{total_post_count}</strong> <br />
                      <span style={{ fontSize: '15px' }}>Posts</span>
                    </div>
                  </CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCol>
        </CCard>
      </CCol>
      <CCol md="6" className="mb-4">
        <CCard style={{ width: '625px' }}>
          <CCardHeader>
            <CCardTitle>Analysis of Posting Frequency</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CChartLine
              data={postFrequencyData}
              height={'360px'}
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
                      text: 'Number of Posts',
                    },
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <div className="mb-3">
          <form onSubmit={handlePostSubmit}>
            <input
              type="text"
              placeholder="Enter Post ID"
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
              style={{ width: '260px', marginRight: '10px' }}
            />
            <button type="submit">Submit Post ID</button>
          </form>
        </div>
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
export default Facebook
