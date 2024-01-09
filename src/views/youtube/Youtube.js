import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartDoughnut, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilBell, cilUser, cilVideo } from '@coreui/icons'

const Youtube = () => {
  const [channelInput, setChannelInput] = useState('')
  const [videoInput, setVideoInput] = useState('')
  const [data, setData] = useState([])
  const [videodata, setVideoData] = useState([])

  const handleChannelSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/youtube_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channel_id: channelInput }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setData(responseData)
        setChannelInput('')
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleVideoSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/youtube_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: videoInput }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setVideoData(responseData)
        setVideoInput('')
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const myData = JSON.stringify(data)
  const parsedData = JSON.parse(myData)

  let channel_name, subscribers, total_videos, video_frequency

  if (parsedData.response) {
    // Accessing individual elements
    channel_name = parsedData.response.channel_name
    subscribers = parsedData.response.subscribers
    total_videos = parsedData.response.total_videos
    video_frequency = JSON.stringify(parsedData.response.video_frequency)
  } else {
    console.error('The response does not have the expected structure.')
  }

  const myVideoData = JSON.stringify(videodata)
  const parsedVideoData = JSON.parse(myVideoData)

  let sentiment_results, comment_frequency

  if (parsedVideoData.response) {
    sentiment_results = JSON.stringify(parsedVideoData.response.sentiment_results)
    comment_frequency = JSON.stringify(parsedVideoData.response.comment_frequency)
  } else {
    console.error('The response does not have the expected structure.')
  }

  const videoFrequencyData = {
    labels: video_frequency ? Object.keys(JSON.parse(video_frequency)) : [],
    datasets: [
      {
        label: 'Number of Videos',
        backgroundColor: '#1a8e9c',
        borderColor: '#1a8e9c',
        borderWidth: 2,
        data: video_frequency ? Object.values(JSON.parse(video_frequency)) : [],
      },
    ],
  }

  const commentFrequencyData = {
    labels: comment_frequency ? Object.keys(JSON.parse(comment_frequency)) : [],
    datasets: [
      {
        label: 'Number of Comments',
        backgroundColor: '#fa1a71',
        borderColor: '#fa1a71',
        barThickness: 15,
        borderWidth: 5,
        data: comment_frequency ? Object.values(JSON.parse(comment_frequency)) : [],
      },
    ],
  }

  const sentimentAnalysisData = {
    labels: sentiment_results ? Object.keys(JSON.parse(sentiment_results)) : [],
    datasets: [
      {
        data: sentiment_results ? Object.values(JSON.parse(sentiment_results)) : [],
        backgroundColor: ['#17ab6f', '#ffff00', '#ed3e15'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <CRow>
      <div className="mb-3">
        <form onSubmit={handleChannelSubmit}>
          <input
            type="text"
            placeholder="Enter Channel ID"
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
            style={{ width: '260px', marginRight: '10px' }}
          />
          <button type="submit">Submit Channel ID</button>
        </form>
      </div>
      <CCol>
        <CCard className="mb-4 justify-content-between">
          <CCardHeader>
            <CCardTitle>Youtube Profile</CCardTitle>
          </CCardHeader>
          <CRow>
            <CCol>
              <CCardBody className="profile-card post-item">
                <CRow>
                  <CCol xs="auto">
                    <div className="icon-container">
                      <CIcon icon={cilUser} size={'4xl'} />
                    </div>
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div>
                        <strong style={{ fontSize: '16px' }}>{channel_name}</strong>
                        <br />
                        <span style={{ fontSize: '16px' }}>Channel Name</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCol>
            <CCol>
              <CCardBody className="profile-card post-item">
                <CRow>
                  <CCol xs="auto">
                    <div className="icon-container">
                      <CIcon icon={cilBell} size={'4xl'} />
                    </div>
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div>
                        <strong style={{ fontSize: '25px' }}>{subscribers}</strong>
                        <br />
                        <span style={{ fontSize: '18px' }}>Subscribers</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCol>
            <CCol>
              <CCardBody className="profile-card post-item">
                <CRow>
                  <CCol xs="auto">
                    <div className="icon-container">
                      <CIcon icon={cilVideo} size={'4xl'} />
                    </div>
                  </CCol>
                  <CCol>
                    <CCardText>
                      <div>
                        <strong style={{ fontSize: '25px' }}>{total_videos}</strong>
                        <br />
                        <span style={{ fontSize: '18px' }}>Videos</span>
                      </div>
                    </CCardText>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <CCardTitle>Video Posting Frequency Over Time</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CChartLine
              data={videoFrequencyData}
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
                      text: 'Number of Videos',
                    },
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
        <div className="mb-3">
          <form onSubmit={handleVideoSubmit}>
            <input
              type="text"
              placeholder="Enter Video URL"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              style={{ width: '260px', marginRight: '10px' }}
            />
            <button type="submit">Submit Video URL</button>
          </form>
        </div>
        <div className="d-flex justify-content-between">
          <CCard className="mb-4" style={{ width: '80%' }}>
            <CCardHeader>
              <CCardTitle>Comment Frequency Over Time</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CChartBar
                data={commentFrequencyData}
                height={'250px'}
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
          <CCard className="mb-4 mx-4" style={{ width: '50%', height: '250px' }}>
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
        </div>
      </CCol>
    </CRow>
  )
}

export default Youtube
