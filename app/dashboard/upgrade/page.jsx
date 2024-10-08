import React from 'react'
import { FiCheck, FiStar } from 'react-icons/fi'

function Upgrade() {
  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      features: [
        'Access to 100+ courses',
        'Basic course creation tools',
        'Community forum access',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: 19.99,
      features: [
        'Access to all courses',
        'Advanced course creation tools',
        'Priority community support',
        '24/7 email and chat support',
        'Analytics dashboard'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 49.99,
      features: [
        'All Pro features',
        'Custom course creation',
        'Dedicated account manager',
        'API access',
        'White-labeling options'
      ]
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upgrade Your Plan</h1>
      <p className="text-gray-600 mb-8">Choose the plan that best fits your needs and take your learning to the next level.</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className={`bg-white p-6 rounded-lg shadow-md ${plan.recommended ? 'border-2 border-blue-500' : ''}`}>
            {plan.recommended && (
              <div className="flex items-center justify-center bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                Recommended
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">${plan.price}<span className="text-sm font-normal text-gray-500">/month</span></p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-lg font-medium ${plan.recommended ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {plan.recommended ? 'Start Pro Trial' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FiStar className="text-yellow-400 mr-2" />
          Why Upgrade?
        </h2>
        <ul className="space-y-2">
          <li>Unlock unlimited course creation</li>
          <li>Access premium learning resources</li>
          <li>Get personalized learning paths</li>
          <li>Earn verified certificates</li>
          <li>Connect with industry experts</li>
        </ul>
      </div>
    </div>
  )
}

export default Upgrade