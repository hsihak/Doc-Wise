import React from 'react'

const Spinner = ({isSubmitting}) => {
  return (
    <div>
        {isSubmitting && (
        <div className="flex">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <img src="src\assets\bars-rotate-fade.svg" alt="bars-rotate-fade spinner"/>
            </div>
        </div>
        )}
  </div>
  )
}

export default Spinner
