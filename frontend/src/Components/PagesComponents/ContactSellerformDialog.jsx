
import ContactSellerForm from "./ContactSellerform"


  const ContactSellerformDialog = ({open,onClose,propertyId,userdata,usertype}) => {
    if(!open) return null
  return  (
    <div className="fixed inset-0  bg-black/80 flex items-center justify-center">
         <div className="bg-white rounded-md w-[90%] mt-[100px] max-h-[500px] overflow-y-auto md:w-[400px] p-5 relative ">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          ✕
        </button>

        <h2 className="font-[600] text-[1.1rem] mb-3">
          Contact Seller
        </h2>
        
        <ContactSellerForm
          propertyId={propertyId}
          userdata={userdata}
          usertype={usertype}
        />
      </div>
    </div>
  )
}

export default ContactSellerformDialog