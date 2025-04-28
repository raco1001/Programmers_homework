import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/common/Error'
import Layout from './components/layout/Layout'
import { BookStoreThemeProvider } from './context/themeContext'
import Books from './pages/Books'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Signup from './pages/Signup'
import BookDetail from './pages/BookDetail'
import Cart from './pages/Cart'
import Order from './pages/Order'
import OrderList from './pages/OrderList'
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
  {
    path: 'books/:bookId',
    element: (
      <Layout>
        <BookDetail />
      </Layout>
    ),
  },
  {
    path: 'cart',
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: 'order',
    element: (
      <Layout>
        <Order />
      </Layout>
    ),
  },
  {
    path: 'orderList',
    element: (
      <Layout>
        <OrderList />
      </Layout>
    ),
  },
])
function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  )
}

export default App
