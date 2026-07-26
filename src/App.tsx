import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import type { APIResponseEntity } from './interface/api-response'
import { APIURL, getApiHealthUrl } from './service/api-service'
import { getLocalStorageItem } from './service/storage-service'
import { useUserActivity } from './hooks/useUserActivity'
import { STORAGE_KEYS } from './utils/enum'
import { IsStringNullEmptyOrUndefined } from './utils/null-check'

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...')
  const [isLoading, setIsLoading] = useState(false)

  useUserActivity(!!getLocalStorageItem(STORAGE_KEYS.JB_GLASS_AUTH_TOKEN))

  const testApiConnection = async () => {
    setIsLoading(true)
    setApiStatus('Checking...')

    try {
      const baseUrl = APIURL ? APIURL.replace(/\/$/, '') : ''
      const cleanBaseUrl = baseUrl.replace(/\/api(?:\/v\d+)?$/i, '')
      const endpoint = `${cleanBaseUrl}/api/v1/health`
      const response = await fetch(endpoint)
      const resp: APIResponseEntity = await response.json()

      if (resp?.status && resp.statusCode === 200) {
        setApiStatus('API connected successfully')
      } else {
        setApiStatus('API responded but status was not success')
      }
    } catch (error) {
      console.error('Failed to fetch version:', error)
      setApiStatus('Failed to connect to API')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const checkVersion = async () => {
      try {
        if (!APIURL) return

        const response = await fetch(getApiHealthUrl(APIURL))
        const resp: APIResponseEntity = await response.json()

        if (resp?.status && resp.statusCode === 200) {
          const version = resp.data && typeof resp.data === 'object' && 'version' in resp.data
            ? String((resp.data as { version?: string }).version ?? '')
            : ''

          if (!IsStringNullEmptyOrUndefined(version) && version !== localStorage.getItem('appVersion')) {
            localStorage.setItem('appVersion', version)
            window.location.reload()
          }
        }
      } catch (error) {
        console.error('Failed to fetch version:', error)
      }
    }

    const interval = window.setInterval(checkVersion, 20000)
    void checkVersion()
    void testApiConnection()

    return () => window.clearInterval(interval)
  }, [])

  return (
    <>
      <div style={{ padding: 24 }}>
        <h1>Frontend</h1>
        <p>Backend API status: {apiStatus}</p>
        <button onClick={() => void testApiConnection()} disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Check API'}
        </button>
      </div>
      <ToastContainer />
    </>
  )
}

export default App