/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
//import { ProductSummaryQuantity } from 'vtex.product-quantity'
import { Wrapper } from 'vtex.add-to-cart-button'
import { useOrderForm } from 'vtex.store-resources/OrderFormContext'
import { useProduct } from 'vtex.product-context'
import { useLazyQuery } from 'react-apollo'
import GETPRODUCTINFO from './queries/query.getProductInfo.gql'
import Loader from './components/Loader'
import { Button } from 'vtex.styleguide'
import { Link } from 'vtex.render-runtime'

const add2CartButton: StorefrontFunctionComponent<any> = ({
  children,
  isContextSummarySearch = false,
  isContextPDP = false
}: any) => {
  const [deliveryModalNeedsAppear, setDeliveryVisibility] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [productSelected, setProductSelected] = useState<any>()

  const orderFormContext = useOrderForm()
  const { selectedItem } = useProduct()

  const [getProduct, { data: productInfo }] = useLazyQuery(GETPRODUCTINFO, {
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    if (
      orderFormContext.orderForm &&
      orderFormContext.orderForm.shippingData &&
      orderFormContext.orderForm.shippingData.availableAddresses &&
      orderFormContext.orderForm.shippingData.availableAddresses.length &&
      orderFormContext.orderForm.shippingData.address &&
      orderFormContext.orderForm.shippingData.address.geoCoordinates
    ) {
      setDeliveryVisibility(false)
    } else {
      setDeliveryVisibility(true)
    }
  }, [orderFormContext])
  useEffect(() => {
    if (selectedItem) {
      getProduct({
        variables: {
          id: parseInt(selectedItem.itemId),
        },
      })
    }
    setProductSelected(selectedItem)
  }, [selectedItem])

  useEffect(() => {
    if (deliveryModalNeedsAppear !== null) {
      setLoading(false)
    }
  }, [deliveryModalNeedsAppear]);

  if (loading || !productInfo || !selectedItem) return <Loader />
  // else if( !loading && !productInfo ) return <Loader />

  const item = productInfo.product.items.find((item: any) => item.itemId === selectedItem.itemId)

  if (!item) return <Loader />

  const sellerActive = item.sellers.find((seller: any) => seller.sellerDefault == true)
  const { commertialOffer } = sellerActive;

  //add product after set modal
  const handleSaveProduct = () => {
    if (deliveryModalNeedsAppear && productSelected) {
      const sellerDefaultIndex = productSelected?.sellers?.findIndex((e: any) => e.sellerDefault === true)
      const sellerId = productSelected?.sellers[sellerDefaultIndex]?.sellerId
      const name = productSelected?.name
      const nameComplete = productSelected?.nameComplete
      /* console.log(nameComplete, name, sellerId, productSelected?.itemId) */
      /* document.cookie = `add2cartbtn=${productSelected?.itemId},,${sellerId},,${name},,${nameComplete}` */
      localStorage.setItem("add2cartbtn", `${productSelected?.itemId},,${sellerId},,${name},,${nameComplete}`)
    }
  }

  return (
    <>
      {deliveryModalNeedsAppear ? (
        isContextSummarySearch ? (
          <div className="vtex-flex-layout-0-x-flexRow--container-link-no-available">
            <Link
              to={productInfo.product.link}
              className="vtex-rich-text-0-x-link--no-available"
            >
              VER PRODUCTO
            </Link>
          </div>
        ) : (
          <div onMouseOver={handleSaveProduct}>
            {
              children[0]
            }
          </div>
        )
      ) : commertialOffer.AvailableQuantity === 0 ? (
        <>
          {
            isContextPDP ?
              <div className="vtex-flex-layout-0-x-flexRow--container-custom-btn-add">
                <Button>
                  NO DISPONIBLE
                </Button>
              </div>
              :
              <div className="vtex-flex-layout-0-x-flexRow--container-link-no-available">
                <Link
                  to={productInfo.product.link}
                  className="vtex-rich-text-0-x-link--no-available"
                >
                  NO DISPONIBLE
                </Link>
              </div>
          }
        </>
      ) : (
        <>
          <div
            className={`vtex-flex-layout-0-x-flexRow--container-custom-btn-add ${commertialOffer.AvailableQuantity === 0
              ? 'vtex-flex-layout-0-x-flexRow--container-custom-btn-add-no-available'
              : ''
              }`}
          >
            {/*  <div className="vtex-flex-layout-0-x-flexCol vtex-flex-layout-0-x-flexCol--custom-quantity">
              <ProductSummaryQuantity />
            </div> */}
            <div className="vtex-flex-layout-0-x-flexCol vtex-flex-layout-0-x-flexCol--custom-btn-add">
              <Wrapper
                text={'Comprar'}
                unavailableText="No disponible"
                customToastUrl="/checkout/#/cart"
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default add2CartButton
