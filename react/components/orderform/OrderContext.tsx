import React from 'react'
import { OrderForm } from 'vtex.order-manager'
import { Wrapper } from 'vtex.add-to-cart-button'

const OrderContext = () => {
  const { useOrderForm } = OrderForm
  const { orderForm } = useOrderForm()

  let itemsId = orderForm.items
  let arrayId = [...itemsId];

  console.log('arrayId', arrayId)
  for (let i = 0; i < arrayId.length; i++) {
    if (arrayId[i].quantity > 1) {
      console.log('arrayId', arrayId)
      console.log("pasando", arrayId[i].name, arrayId[i].quantity)

      return <>
        <div className="vtex-flex-layout-0-x-flexCol vtex-flex-layout-0-x-flexCol--custom-btn-add">
          <Wrapper
            text={'Agregar'}
            unavailableText="No disponible"
            customToastUrl="/checkout/#/cart"
          />
        </div>
      </>

    } else {
      return <>
        <div className="vtex-flex-layout-0-x-flexCol vtex-flex-layout-0-x-flexCol--custom-btn-add">
          <Wrapper
            text={'+'}
            unavailableText="No disponible"
            customToastUrl="/checkout/#/cart"
          />
        </div>
      </>
    }
  }

  return <><h6>Default</h6>
    <Wrapper
      text={'DEFAULT'}
      unavailableText="No disponible"
      customToastUrl="/checkout/#/cart"
    />
  </>
}

export default OrderContext
