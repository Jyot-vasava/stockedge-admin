import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')
const TEST_API_URL = API_BASE.endsWith('/api')
  ? `${API_BASE}/test/ping`
  : `${API_BASE}/api/test/ping`

function App() {
  const [apiMessage, setApiMessage] = useState('Connecting...')
  const [isLoading, setIsLoading] = useState(true)

  const testApiConnection = async () => {
    setIsLoading(true)

    try {
      const res = await axios.get(TEST_API_URL)
      setApiMessage(res.data.message || 'API connected successfully!')
    } catch (error) {
      console.error('API connection failed:', error)
      setApiMessage('Failed to connect to API. Make sure the backend is running.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    testApiConnection()
  }, [])

  return (
    <div className="app">
      <h1>StockEdge Test API</h1>
      <p>The frontend is now calling the backend test endpoint.</p>
      <button onClick={testApiConnection} disabled={isLoading}>
        {isLoading ? 'Connecting...' : 'Test API Connection'}
      </button>
      <p>{apiMessage}</p>
    </div>
  )
}

export default App