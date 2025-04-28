import styled from 'styled-components'
import Title from '../components/common/Title'
import useOrders from '../hooks/useOrders'
import { formatDate, formatNumber } from '../utils/format'
import { Theme } from '../style/theme'
import Button from '../components/common/Button'
import React from 'react'
function OrderList() {
  const { orders, selectOrderItems, selectedOrderId } = useOrders()
  console.log(orders)
  return (
    <>
      <Title size="large" color="text">
        주문 내역
      </Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>주문 일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표 상품</th>
              <th>수량</th>
              <th>주문 금액</th>
              <th>주문 상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <>
                  <tr key={order.orderId}>
                    <td>{formatDate(order.createdAt, 'YYYY.MM.DD')}</td>
                    <td>{order.address}</td>
                    <td>{order.receiver}</td>
                    <td>{order.contact}</td>
                    <td>{order.firstTitle}</td>
                    <td>{order.totalQuantity}</td>
                    <td>{formatNumber(order.totalPrice)}원</td>
                    <td>{order.status}</td>
                    <td>
                      <Button
                        size="small"
                        schema="normal"
                        onClick={() => selectOrderItems(order.orderId)}
                      >
                        자세히
                      </Button>
                    </td>
                  </tr>
                  {selectedOrderId === order.orderId && order.detail && (
                    <tr>
                      <td colSpan={8}>
                        <ul>
                          {order?.detail &&
                            order.detail.map((item) => (
                              <li key={item.productId}>
                                <div>
                                  <span>
                                    <img src={item.imgPath} alt={item.title} />
                                  </span>
                                  <span>
                                    <div>{item.title}</div>
                                  </span>
                                  <span>
                                    <div>{item.author}</div>
                                  </span>
                                  <span>
                                    <div>{item.totalQuantity}</div>
                                  </span>
                                  <span>
                                    <div>{formatNumber(item.totalPrice)}원</div>
                                  </span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  )
}

const OrderListStyle = styled.div<{ theme: Theme }>`
  padding: 6px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th,
  td {
    padding: 12px 6px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    flex: 1;
    font-size: 14px;
    line-height: 1.5;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  th {
    font-weight: 600;
    text-align: center;
  }
  td {
    font-weight: 400;
    text-align:;
  }
  td:nth-child(7),
  td:nth-child(8) {
    text-align: right;
  }
  @media (max-width: 768px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    th,
    td {
      text-align: left;
      padding: 10px;
    }
  }
  button {
    height: 32px;
    padding: 0 12px;
    font-size: 12px;
  }
  table {
    border-top: 2px solid ${({ theme }) => theme.colors.primary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  li {
    list-style: square;
    text-align: left;
    div {
      display: flex;
      pading: 8px 12px;
      gap: 8px;
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
      }
    }
  }
`

export default OrderList
