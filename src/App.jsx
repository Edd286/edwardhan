import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage.jsx'
import ChapterPage from './components/ChapterPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import TvStaticOverlay from './components/TvStaticOverlay.jsx'
import CursorRippleTrail from './components/CursorRippleTrail.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <TvStaticOverlay />
      <CursorRippleTrail />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chapter/:rowId" element={<ChapterPage />} />
      </Routes>
    </>
  )
}
