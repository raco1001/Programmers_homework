import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { signup } from '../api/auth.api'
import Button from '../components/common/Button'
import InputText from '../components/common/InputText'
import Title from '../components/common/Title'
import { useAlert } from '../hooks/useAlert'
import { Theme } from '../style/theme'

export interface SignupProps {
  email: string
  password: string
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const onSubmit = (data: SignupProps) => {
    signup(data).then((res) => {
      showAlert('회원가입이 완료되었습니다.')
      navigate('/login')
    })
  }

  console.log(errors)
  return (
    <>
      <Title size="large">회원가입</Title>
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
              회원가입
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

export const SignupStyle = styled.div<{ theme: Theme }>`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`

export default Signup
