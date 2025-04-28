import styled from 'styled-components'
import Button from '../common/Button'
import { useEffect, useState } from 'react'

const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

interface FindAddressButtonProps {
  onCompleted: (address: string, zipCode: string) => void
}

function FindAddressButton({ onCompleted }: FindAddressButtonProps) {
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        if (data.buildingName) {
          const address = data.address + ' ' + data.buildingName
          const zipCode = data.zonecode
          onCompleted(address, zipCode)
        } else {
          const address = data.address
          const zipCode = data.zonecode
          onCompleted(address as string, zipCode as string)
        }
      },
    }).open()
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => {
      console.log('daum script loaded')
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [onCompleted])

  return (
    <>
      {/* Button 의 타입은 button 또는 submit 이 있다. 
      button 일 경우 클릭 이벤트가 발생하고, 연동된 callback 함수가 실행된다.
      submit 일 경우 폼 제출 이벤트가 발생하고, 연동된 callback 함수가 실행된다. 이 때 button과 차이점은 내려받은 인자값을 전달할 수 있다는 것이다.
      */}
      <Button type="button" size="medium" schema="normal" onClick={handleOpen}>
        주소 찾기
      </Button>
    </>
  )
}

const FindAddressButtonStyle = styled(Button)`
  width: 100%;
`

export default FindAddressButton
