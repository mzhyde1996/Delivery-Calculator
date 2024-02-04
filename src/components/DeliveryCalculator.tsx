import React, { useState, useEffect } from 'react';
import Field from './Fields';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DeliveryCalculator: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const current = new Date();
    setCurrentTime(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    setDate(current);

  }, []);

  const calculateDeliveryFee = () => {
    let fee = 0;

    if (cartValue < 10) {
        const surcharge = 10 - cartValue;
        fee += surcharge;
      }
  
      fee += 2;
  
      const additionalDistance = Math.max(0, deliveryDistance - 1000);
      fee += Math.ceil(additionalDistance / 500);
  
      const itemSurcharge = Math.max(0, numberOfItems - 4) * 0.5;
      fee += itemSurcharge;
  
      if (numberOfItems > 12) {
        const bulkFee = (numberOfItems - 12) * 1.2;
        fee += bulkFee;
      }
  
      fee = Math.min(fee, 15);
  
      if (cartValue >= 200) {
        fee = 0;
      }
    const orderTime = date;

    if (orderTime !== null) {
        console.log('Order Time:', orderTime);
        console.log('Order Day:', orderTime.getDay());
        console.log('Order Hour:', orderTime.getHours());
      const orderDay = orderTime.getDay();
      const orderHour = orderTime.getHours();
      const isFridayRush = orderDay === 5 && orderHour >= 15 && orderHour < 19;

      if (isFridayRush) {
        console.log('It is Friday Rush!');
        fee *= 1.2;
        fee = Math.min(fee, 15);
      }
    }

    setDeliveryFee(fee);
  };

  const resetDeliveryFee = () => {
    setDeliveryFee(0);
  };

  return (
    <div className="calculator-container">
      <div className="divStyle">
        <div className="distanceInputContainer">
          <Field label="Cart Value" placeholder="cart" type="number" value={cartValue.toString()} onChange={(value) => setCartValue(Number(value))} />
          <span className="distanceUnit">€</span>
        </div>
        <div className="distanceInputContainer">
          <Field label="Distance" placeholder="distance in meters" type="number" value={deliveryDistance.toString()} onChange={(value) => setDeliveryDistance(Number(value))} />
          <span className="distanceUnit">meters</span>
        </div>
        <Field label="Item Amount" placeholder="amount in €" type="number" value={numberOfItems.toString()} onChange={(value) => setNumberOfItems(Number(value))} />
        <div className="dateAndTime">
          <div className="date">
          <label className='dateLabel'>Day of Order</label>
            <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} 
            placeholderText="Select a date" popperPlacement="top-end" 
            className="input-group__input"
            dateFormat="dd.MM.yyyy"
            disabled/>
          </div>
          <div className="time">
           
            <div>
                <label className='dateLabel'>Time of Order</label>
              <input type="text" value={currentTime} disabled />
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <button type="button" onClick={calculateDeliveryFee} data-test-id="calculateButton" className="buttonStyle">
            <span className="text">Calculate Fee</span>
          </button>
          <button type="button" onClick={resetDeliveryFee} className="buttonStyle">
            <span className="text">Reset Fee</span>
          </button>
        </div>
        <div className="fee">
          <p data-test-id="fee">Delivery Fee: {deliveryFee.toFixed(2)}€</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCalculator;





