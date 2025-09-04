import { useState } from 'react';
import Button from '../Button';

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const redirectToWhatsApp = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    const message = `✈️ Swift Wings Jet Inquiry ✈️\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nI'm interested in your private jet services. Please contact me with more information.`;
    const encodedMessage = encodeURIComponent(message);
    
    setIsOpen(false);
    window.open(`https://wa.link/2uccut?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center group">
        <div className="absolute right-16 mb-2 px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us!
          <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-600 rotate-45"></div>
        </div>
        <div className="w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300">
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full h-full flex items-center justify-center"
            aria-label="Contact via WhatsApp"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-9 h-9 fill-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-swPrimary500 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <h3 className="text-xl font-bold mb-4">Contact Us via WhatsApp</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Your Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>
              <Button
                label="Proceed to WhatsApp"
                bgColor={"bg-swPrimary500"}
                textColor={"text-white"}
                onClick={redirectToWhatsApp}
                className="w-full py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#128C7E]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;