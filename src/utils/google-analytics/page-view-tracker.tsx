import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

export const PageviewTracker = () => {
  const location = useLocation()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const gaMeasurementId: string = import.meta.env.VITE_GA_MEASUREMENT_ID
    if (gaMeasurementId) {
      ReactGA.initialize(gaMeasurementId)
      setInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname })
      ReactGA.send('pageview')
    }
  }, [initialized, location])

  return <></>
}
