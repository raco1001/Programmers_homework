import { Delivery, IOrderSheet } from '../models/order.model'
import { useLocation, useNavigate } from 'react-router-dom'
import Title from '../components/common/Title'
import { CartStyle } from './Cart'
import CartSummary from '../components/cart/CartSumary'
import Button from '../components/common/Button'
import InputText from '../components/common/InputText'
import { useForm } from 'react-hook-form'
import FindAddressButton from '../components/order/FindAddressButton'
import { createOrder } from '../api/order.api'
import { useAlert } from '../hooks/useAlert'
interface DeliveryForm extends Delivery {
  addressDetail: string
}

function Order() {
  const { showAlert, showConfirm } = useAlert()
  const location = useLocation()
  const navigate = useNavigate()
  const orderDataFromCart = location.state
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>()

  const handelPay = (data: DeliveryForm) => {
    const { addressDetail, ...pureData } = data
    const orderData: IOrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...pureData,
        address: `${data.address} ${data.addressDetail}`,
        zipCode: data.zipCode,
      },
    }
    showConfirm('주문을 진행하시겠습니까?', () => {
      createOrder(orderData).then((res) => {
        showAlert('주문이 완료되었습니다.')
        navigate('/orderList', { state: res })
      })
    })
  }

  return (
    <>
      <Title size="large" color="text">
        주문서 작성
      </Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>

            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    placeholder="주소를 입력해주세요"
                    {...register('address', { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address, zipCode) => {
                    setValue('address', address)
                    setValue('zipCode', zipCode)
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className="error-text">주소를 입력해주세요.</p>
              )}
              <fieldset>
                <label> 상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    placeholder="상세 주소를 입력해주세요"
                    {...register('addressDetail', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">상세 주소를 입력해주세요.</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    placeholder="수령인을 입력해주세요"
                    {...register('receiver', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error-text">수령인을 입력해주세요.</p>
              )}
              <fieldset>
                <label>연락처</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    placeholder="연락처를 입력해주세요"
                    {...register('contact', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">연락처를 입력해주세요.</p>
              )}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 포함 총 {totalQuantity}권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size="large"
            schema="primary"
            onClick={handleSubmit(handelPay)}
          >
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  )
}

export default Order
