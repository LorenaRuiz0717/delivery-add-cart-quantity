import React from 'react'
import { OrderForm } from 'vtex.order-manager'
import { Wrapper } from 'vtex.add-to-cart-button'

const OrderContext = () => {
  const { useOrderForm } = OrderForm
  const { orderForm } = useOrderForm()
  // const [currentIdCart, setIdCart] = useState(true)

  console.log('orderid', orderForm.items)
  let itemsId = orderForm.items
  console.log('idItemsOrder', itemsId)


  for (let i = 0; i < itemsId.length; i++) {
    // let arrayId = []
    let arrayId = [itemsId[i].id]
    // arrayId.push([itemsId[i].id])
    if (itemsId === 1) {
      console.log('Agregar')
    } else {
      console.log('TTT')
    }
    console.log("ARRAYID", arrayId);
    // console.log('CURRENTID', currentIdCart)
    // idCart = itemsId[i].id
  }
  //  setIdCart([...idCart, 'Manzana'])


  // setItemsCart(itemsCart)
  // console.log(itemsCart)
  // const idItems = items.map(item.id => )
  // console.log('idItemsOrderMAP', idItems)


  return (
    <>
      <div className="vtex-flex-layout-0-x-flexCol vtex-flex-layout-0-x-flexCol--custom-btn-add">
        WrapperFromCustom
        <Wrapper
          text={'Agregar'}
          unavailableText="No disponible"
          customToastUrl="/checkout/#/cart"
        />
      </div>
      <div>
        <h1>aqui</h1>
      </div>
    </>
  )
}

export default OrderContext
