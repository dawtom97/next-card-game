import { ActivationCodeInput} from '@/components/Auth/ActivationCodeInput'
import React from 'react'

const ActivationPage = () => {
  return (
    <div className='container mx-auto p-4'>
      <h1 className="text-4xl font-bold mb-4">Activation Page</h1>
      <ActivationCodeInput />
    </div>
  )
}

export default ActivationPage