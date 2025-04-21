import { useRouteError } from 'react-router-dom'

interface RouteError {
  statusText: string
  message: string
}

function Error() {
  const error = useRouteError() as RouteError
  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>오류 코드: {error.statusText}</p>
      <p>오류 메시지: {error.message}</p>
    </div>
  )
}

export default Error
