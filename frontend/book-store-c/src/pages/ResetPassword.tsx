import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword, userEmailValidationRequest } from '../api/auth.api'
import Button from '../components/common/Button'
import InputText from '../components/common/InputText'
import Title from '../components/common/Title'
import { useAlert } from '../hooks/useAlert'
import { SignupProps, SignupStyle } from './Signup'

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const [resetRequested, setResetRequested] = useState(false)

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
      resetPassword(data).then((res) => {
        showAlert('비밀번호 초기화되었습니다.')
        navigate('/login')
      })
    } else {
      userEmailValidationRequest(data).then((res) => {
        setResetRequested(true)
      })
    }
  }

  console.log(errors)
  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
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

          {resetRequested && (
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
          )}
          <fieldset>
            <Button type="submit" size="medium" schema="primary">
              {resetRequested ? '비밀번호 초기화' : '비밀번호 초기화 요청'}
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  )
}

export default Signup
