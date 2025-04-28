import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth.api'
import Button from '../components/common/Button'
import InputText from '../components/common/InputText'
import Title from '../components/common/Title'
import { useAlert } from '../hooks/useAlert'
import { useAuthStore } from '../store/authStore'
import { SignupProps, SignupStyle } from './Signup'
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore()

  const onSubmit = (data: SignupProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token)
        showAlert('로그인되었습니다.')
        navigate('/')
      },
      (error) => {
        showAlert('로그인에 실패했습니다.')
      },
    )
  }
  console.log(isLoggedIn)

  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label htmlFor="email">이메일</label>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="password">비밀번호</label>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" schema="primary">
              로그인
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">로그인</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  )
}

export default Login
