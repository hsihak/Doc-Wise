import React from 'react'
import BackIconPath from '../../../assets/back.svg';
import {Link} from 'react-router-dom';

const Help = () => {
  return (
    <div className=' px-10'>
      <div className='flex items-center justify-center my-6'>
        <h4 className=' text-2xl'>
          Help
        </h4>
      </div>

      <div className='flex flex-col gap-6 text-lg'>

        {/* Breadcrumb div */}
        <div className='flex'>
          <Link to="/phase-one">
            <h5 className='underline'>Main Page</h5>
          </Link>
          <img src={BackIconPath} width='24px' height='24px'/>
          <h5>Help</h5>
        </div>
        
        {/* Welcome Title */}
        <h5 className='font-bold'>Welcome to DocWise!</h5>
        <p>Our platform has been designed to make document analysis easy and efficient. If you have any questions or need assistance, 
        you're in the right place.
        </p>

        <h5 className='font-bold'>Getting Started:</h5>
        <p>DocWise offers three main tabs on the main page for your document analysis needs:</p>
        <p><span className=' text-[#F7941D]'>Similarity Comparison :</span> Upload multiple documents to identify commonalities and shared content effortlessly.</p>
        <p><span className=' text-[#F7941D]'>Differences Highlighter :</span> Pinpoint distinctions between documents with precision, making it easy to understand variations.</p>
        <p><span className=' text-[#F7941D]'>Summary Generate :</span> Obtain concise summaries of your documents, saving you time and effort.</p>

        <h5 className='font-bold'>Contact Us:</h5>
        <p>DocWise has been developed by the Smart Waterloo Region Innovation Lab. If you have any queries, feedback, or need further 
        assistance, feel free to reach out to us at 
          <a href='mailto:swrinnovationlab@gmail.com' className='text-[#177EE6] underline'> swrinnovationlab@gmail.com</a>
        </p>
        <p>We're here to help and enhance your DocWise experience.</p>
        <p>Thank you for choosing DocWise! Happy analyzing!</p>
      </div>
    </div>
  )
}

export default Help
