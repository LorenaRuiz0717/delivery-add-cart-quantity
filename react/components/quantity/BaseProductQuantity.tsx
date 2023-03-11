// // import React, { useCallback } from 'react'
// import React from 'react'
// import { FormattedMessage } from 'react-intl'
// import { useCssHandles } from 'vtex.css-handles'
// import { DispatchFunction } from 'vtex.product-context/ProductDispatchContext'
// import { ProductContext } from 'vtex.product-context'

// import DropdownProductQuantity from './DropdownProductQuantity'
// // import StepperProductQuantity from './StepperProductQuantity'

// export type NumericSize = 'small' | 'regular' | 'large'
// export type QuantitySelectorStepType = 'unitMultiplier' | 'singleUnit'

// export interface BaseProps {
//   dispatch: DispatchFunction
//   selectedItem?: ProductContext['selectedItem']
//   showLabel?: boolean
//   selectedQuantity: number
//   size?: NumericSize
//   warningQuantityThreshold: number
//   showUnit: boolean
//   quantitySelectorStep?: QuantitySelectorStepType
// }

// const CSS_HANDLES = [
//   'quantitySelectorContainer',
//   'quantitySelectorTitle',
//   'availableQuantityContainer',
// ] as const

// export type OnChangeCallback = {
//   value: number
// }

// const BaseProductQuantity: StorefrontFunctionComponent<BaseProps> = ({
//   dispatch,
//   selectedItem,
//   size = 'small',
//   showLabel = true,
//   selectedQuantity,
//   warningQuantityThreshold = 9999,
//   // showUnit = true,
//   // quantitySelectorStep = 'unitMultiplier',
// }) => {
//   const handles = useCssHandles(CSS_HANDLES)
//   // const onChange = useCallback(
//   //   (e: OnChangeCallback) => {
//   //     dispatch({ type: 'SET_QUANTITY', args: { quantity: e.value } })
//   //   },
//   //   [dispatch]
//   // )

//   const availableQuantity =
//     selectedItem?.sellers?.find((sellerDefault: boolean) => sellerDefault === true)
//       ?.commertialOffer?.AvailableQuantity ?? 0
//   console.log("availableQuantity", availableQuantity)
//   if (availableQuantity < 1 || !selectedItem) {

//     return null
//   }
//   console.log("selectedQuantityBase", selectedQuantity)
//   const showAvailable = availableQuantity <= warningQuantityThreshold
//   console.log("warningQuantityThreshold", warningQuantityThreshold)
//   // const unitMultiplier =
//   //   quantitySelectorStep === 'singleUnit' ? 1 : selectedItem.unitMultiplier

//   return (
//     <><h1>BaseProduct</h1>
//       <div
//         className={`${handles.quantitySelectorContainer} flex flex-column mb4`}>
//         {showLabel && (
//           <div
//             className={`${handles.quantitySelectorTitle} mb3 c-muted-2 t-body`}>
//             <FormattedMessage id="store/product-quantity.quantity" />
//           </div>
//         )}
//         {/* <StepperProductQuantity
//           dispatch={dispatch}
//           showUnit={showUnit}
//           size={size}
//           unitMultiplier={unitMultiplier}
//           measurementUnit={selectedItem.measurementUnit}
//           selectedQuantity={selectedQuantity}
//           availableQuantity={availableQuantity}
//         // onChange={onChange}
//         /> */}
//         <DropdownProductQuantity
//           dispatch={dispatch}
//           showUnit={true}
//           itemId={selectedItem.itemId}
//           selectedQuantity={selectedQuantity}
//           availableQuantity={availableQuantity}
//           // onChange={onChange}
//           size={size}
//         />
//         {showAvailable && (
//           <div
//             className={`${handles.availableQuantityContainer} mv4 c-muted-2 t-small`}>
//             <FormattedMessage
//               id="store/product-quantity.quantity-available"
//               values={availableQuantity}
//             />
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default BaseProductQuantity
