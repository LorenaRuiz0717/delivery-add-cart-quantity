import React, { FunctionComponent, useState, useCallback } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { SelectedItem, } from 'vtex.product-context'

// import { OnChangeCallback, BaseProps } from './BaseProductQuantity'
import { DispatchFunction } from 'vtex.product-context/ProductDispatchContext'

const DEFAULT_UNIT = 'un'
export type NumericSize = 'small' | 'regular' | 'large'

interface StepperProps {
  dispatch: DispatchFunction
  unitMultiplier: SelectedItem['unitMultiplier']
  measurementUnit: SelectedItem['measurementUnit']
  selectedQuantity: number
  availableQuantity: SelectedItem['availableQuantity']
  size: NumericSize
  showUnit: boolean
}

export type OnChangeCallback = {
  value: number
}
const CSS_HANDLES = ['quantitySelectorStepper'] as const

const normalizeValue = (value: number, maxValue: number) =>
  value > maxValue ? maxValue : value

const validateValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)
  console.log("parsedValueSTEPPER", parsedValue)
  if (Number.isNaN(parsedValue)) {
    return 1
  }

  return normalizeValue(parseInt(value, 10), maxValue)
}

const validateDisplayValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)
  console.log("parsedValueSTEPPER", parsedValue)
  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return ''
  }

  return `${normalizeValue(parsedValue, maxValue)}`
}

const StepperProductQuantity: FunctionComponent<StepperProps> = ({
  dispatch,
  unitMultiplier,
  measurementUnit = DEFAULT_UNIT,
  size = 'small',
  selectedQuantity,
  availableQuantity,
  showUnit
}) => {
  const onChange = useCallback(
    (e: OnChangeCallback) => {
      dispatch({ type: 'SET_QUANTITY', args: { quantity: e.value } })
    },
    [dispatch]
  )

  const handles = useCssHandles(CSS_HANDLES)
  const [displayValue, setDisplayValue] = useState(`${selectedQuantity}`)
  console.log('displayValueSTEPPER', displayValue)
  const handleChange = (value: string) => {
    console.log("VALUESTRING", value)
    const newValidatedValue = validateValue(value, availableQuantity)
    const newDisplayValue = validateDisplayValue(value, availableQuantity)
    setDisplayValue(newDisplayValue)
    onChange({ value: newValidatedValue })
  }

  return (
    <div className={handles.quantitySelectorStepper}>
      <NumericStepper
        value={selectedQuantity}
        size={size}
        minValue={1}
        unitMultiplier={unitMultiplier}
        suffix={
          showUnit && measurementUnit !== DEFAULT_UNIT
            ? measurementUnit
            : undefined
        }
        onChange={(event: { target: { value: string } }) => handleChange(event.target.value)}
        maxValue={availableQuantity || undefined}
      />

      {console.log('selectedQuantitystepper', selectedQuantity)}
      {console.log('displayValueSTEPPER', displayValue)}
      {console.log('availableQuantitySTEPPER', availableQuantity)}
      {console.log('measurementUnitSTEPPER', measurementUnit)}
      {console.log('unitMultiplierUnitSTEPPER', unitMultiplier)}

    </div>
  )
}

export default StepperProductQuantity
