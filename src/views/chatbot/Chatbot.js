import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Chatbot = () => {
  const [chatbotResponses, setChatbotResponses] = useState([
    { user: '', chatbot: 'Welcome to the Chatbot! How can I assist you today?' },
  ])

  const [showMainMenu, setShowMainMenu] = useState(true) // Added state variable

  const mainMenu = [
    { text: 'Services', clickable: true },
    { text: 'Products', clickable: true },
    { text: 'Request Price/Quote', clickable: true },
    { text: 'Branches', clickable: true },
    { text: 'Contact Us', clickable: true },
    { text: 'About Us', clickable: true },
    { text: 'Clients', clickable: true },
  ]

  const [userInput, setUserInput] = useState('')

  const sendUserInput = async (menuItem) => {
    try {
      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: menuItem }),
      })

      if (response.ok) {
        const responseData = await response.json()
        setChatbotResponses([
          ...chatbotResponses,
          { user: menuItem, chatbot: responseData.response },
        ])
        setShowMainMenu(false) // Hide the main menu after a chatbot response
      } else {
        console.error('Error sending user input')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleResponseClick = (response) => {
    if (response.text === 'Would you like to go to the Main Menu?') {
      console.log('Handling special case')
      // You can add specific handling for "Yes" and "No" here if needed
    } else if (response.text.toLowerCase() === 'yes') {
      // Handle the "Yes" option
      sendUserInput('Yes')
    } else if (response.text.toLowerCase() === 'no') {
      // Handle the "No" option
      sendUserInput('No')
    } else if (response.clickable === true) {
      sendUserInput(response.text)
    } else if (isURL(response.text)) {
      // If the response is a URL, open it in a new browser window
      window.open(response.text, '_blank')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput.trim() !== '') {
      sendUserInput(userInput)
      setUserInput('') // Clear the input field after submission
    }
  }

  const isURL = (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // IPv4 address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ) // fragment locator
    return pattern.test(str)
  }

  return (
    <div className="App">
      <div className="chat-container justify-content-between">
        <h2 className="app-title bg">
          <center>Seva Facility Chatbot</center>
        </h2>
        <div className="chat-history">
          {chatbotResponses.map((entry, index) => (
            <div key={index} className="chat-entry">
              {entry.user && <div className="user-message">{entry.user}</div>}
              <div className="chatbot-message">
                {Array.isArray(entry.chatbot) ? (
                  entry.chatbot.map((response, idx) => (
                    <div
                      key={idx}
                      className={`chat-entry ${response.clickable ? 'clickable' : ''} 
                      ${isURL(response.text) ? 'url-link' : ''} 
                      ${
                        response.text === 'Would you like to go to the Main Menu?'
                          ? 'special-message'
                          : ''
                      }
                      ${response.text && response.text.toLowerCase() === 'yes' ? 'yes-option' : ''} 
                      ${response.text && response.text.toLowerCase() === 'no' ? 'no-option' : ''}`}
                      onClick={() => handleResponseClick(response)}
                    >
                      {response.text}
                      {response.text && response.text.toLowerCase() === 'yes' && (
                        <span role="img" aria-label="thumbs-up">
                          👍
                        </span>
                      )}
                      {response.text && response.text.toLowerCase() === 'no' && (
                        <span role="img" aria-label="thumbs-down">
                          👎
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={`chat-entry ${isURL(entry.chatbot) ? 'url-link' : ''}`}>
                    {entry.chatbot}
                  </div>
                )}
              </div>
            </div>
          ))}
          {showMainMenu &&
            mainMenu.map((menuItem, index) => (
              <div
                key={index}
                className={`chat-entry user-option ${menuItem.clickable ? 'clickable' : ''}`}
                onClick={() => sendUserInput(menuItem.text)}
              >
                {menuItem.text}
              </div>
            ))}
        </div>

        {/* User input (if needed) */}
        <div className="user-input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{ width: '260px', marginRight: '10px' }}
            />
            <button type="submit" className="send-button">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
