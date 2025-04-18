import Layout from './components/layout/Layout'
import { BookStoreThemeProvider } from './context/themeContext'
import Home from './pages/Home'
function App() {
  // return <Home />
  // return <Detail />
  return (
    <BookStoreThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  )
}

export default App
