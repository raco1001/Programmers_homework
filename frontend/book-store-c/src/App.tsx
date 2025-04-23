import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/common/Error'
import Layout from './components/layout/Layout'
import { BookStoreThemeProvider } from './context/themeContext'
import Books from './pages/Books'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Signup from './pages/Signup'
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: 'books',
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: 'books/:id',
    element: (
      <Layout>
        <div>도서 상세 페이지</div>
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: 'signup',
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: 'reset',
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: 'login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: 'books',
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
    errorElement: <Error />,
  },
])

function App() {
  // return <Home />
  // return <Detail />
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  )
}

export default App
