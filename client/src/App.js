import { useState } from "react";

const countryCodes = [
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  // Add more country codes as needed
];

function App() {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleCall = () => {
    const data = {
      countryCode: selectedCountryCode,
      phoneNumber: phoneNumber,
      message: message,
    };
  
    fetch('http://localhost:5000/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSendMessage = () => {
    const data = {
      countryCode: selectedCountryCode,
      phoneNumber:phoneNumber,
      message: message,
    };
  
    fetch('http://localhost:5000/messaging', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  const handleSendWhatsappMessage = () => {
    alert(`Sending WhatsApp message to ${selectedCountryCode}${phoneNumber}: ${message}`);
    // Add logic for sending WhatsApp message
  };
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Phone Message App</h1>
        <div className="mb-4">
          <label className="block mb-2">
            Country Code:
            <select
              className="border p-2 w-full"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            Phone Number:
            <input
              className="border p-2 w-full"
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="Enter 10-digit number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <label className="block mb-4">
          Message:
          <textarea
            className="border p-2 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white p-2 mr-2" onClick={handleCall}>
            Call
          </button>
          <button
            className="bg-green-500 text-white p-2 mr-2"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
