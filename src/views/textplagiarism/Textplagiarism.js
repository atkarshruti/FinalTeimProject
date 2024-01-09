import React, { useState } from 'react'

const Textplagiarism = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setText(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const checkPlagiarism = () => {
    setLoading(true)
    fetch('http://localhost:5000/text_plagiarism', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }

  const clearResults = () => {
    setText('')
    setResult(null)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write('<html><head><title>Plagiarism Results</title></head><body>')
    printWindow.document.write('<h2>Results:</h2>')
    printWindow.document.write('<table class="result-table">')
    printWindow.document.write(
      '<thead><tr><th>Sentence</th><th>URL</th><th>Similarity (%)</th></tr></thead>',
    )
    printWindow.document.write('<tbody>')
    result.sentences.forEach((sentence, index) => {
      printWindow.document.write(`
        <tr>
          <td class="result-cell full-sentence">${sentence}</td>
          <td class="result-cell url-column">${result.urls[index]}</td>
          <td class="result-cell">${(result.similarity_list[index] * 100).toFixed(2)}%</td>
        </tr>
      `)
    })
    printWindow.document.write('</tbody></table>')
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    // Add a delay to ensure content is loaded before printing
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }

  const handleUpload = () => {
    const uploadInput = document.getElementById('fileInput')
    uploadInput.click()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Plagiarism Checker</h1>
        {/* <p>Check-Plagiarism offers a reliable plagiarism checker that is widely used to detect plagiarism.
        To use this tool, you can either enter your content below or upload a text file.</p> */}

        <textarea
          rows="8"
          cols="80"
          placeholder="Enter text for plagiarism check"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="button-container">
          <button className="red-button" onClick={checkPlagiarism} disabled={loading}>
            {loading ? 'Checking...' : result ? 'Check Again' : 'Check for Plagiarism'}
          </button>
          <div className="file-upload-container">
            <input
              type="file"
              id="fileInput"
              accept=".txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button className="red-button" onClick={handleUpload}>
              Upload
            </button>
          </div>
          <button className="red-button" onClick={clearResults}>
            Clear
          </button>
          {result && (
            <button className="red-button" onClick={handlePrint}>
              Print
            </button>
          )}
        </div>

        {loading && <div className="loading-spinner"></div>}

        {result && (
          <div>
            <h2>Results:</h2>
            {result.message ? (
              <p>{result.message}</p>
            ) : (
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Sentence</th>
                    <th>URL</th>
                    <th>Similarity (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.sentences.map((sentence, index) => (
                    <tr key={index}>
                      <td className="result-cell full-sentence">{sentence}</td>
                      <td className="result-cell url-column">{result.urls[index]}</td>
                      <td className="result-cell">
                        {(result.similarity_list[index] * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </header>
    </div>
  )
}

export default Textplagiarism
