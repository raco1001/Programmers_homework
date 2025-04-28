class Status {
  constructor(status) {
    this.status = status
  }
  static getStatus() {
    return {
      PENDING: '출고 진행 중',
      SUBMITTED: '출고 완료',
      ON_DELIVERY: '배송 중',
      DELIVERD: '배송 완료',
      PURCHASE_CONFIRMED: '구매 확정',
    }
  }
}

function getStatus(status) {
  return Status.getStatus()[status]
}

module.exports = { getStatus }
