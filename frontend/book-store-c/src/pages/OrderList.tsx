import styled from 'styled-components'
import Title from '../components/common/Title'

function OrderList() {
  return (
    <>
      <Title size="large" color="text">
        주문 내역
      </Title>
      <OrderListStyle>
        <div></div>
      </OrderListStyle>
    </>
  )
}

const OrderListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export default OrderList
