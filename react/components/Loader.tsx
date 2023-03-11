import React from 'react'
import { Spinner } from 'vtex.styleguide'
import styles from '../styles.css'

const Loader = (props: { message?: string }) => {
  const { message } = props

  return (
    <div className="mw9 w-100 center">
      <div
        className={`center flex w-100 items-center justify-center flex-wrap ${styles.loadingWishlist}`}
      >
        <div>
          <Spinner />
          { message && <p>{message}</p> }
        </div>
      </div>
    </div>
  )
}

export default Loader
