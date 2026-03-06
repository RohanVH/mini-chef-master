import { Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
function App() {
  return (
    <>
    <Suspense fallback={<h1>Loading...</h1>}>
    <Header />
    <Main />
    </Suspense>
    </>
  )
}

export default App
