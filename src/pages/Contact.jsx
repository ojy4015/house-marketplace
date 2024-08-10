// import { useState, useEffect } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase.config';
// import { toast } from 'react-toastify';

// function Contact() {
//   const [message, setMessage] = useState('');
//   const [landlord, setLandlord] = useState(null);
//   // eslint-disable-next-line
//   const [searchParams, setSearchParams] = useSearchParams();

//   const params = useParams();

//   useEffect(() => {
//     const getLandlord = async () => {
//       const docRef = doc(db, 'users', params.landlordId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setLandlord(docSnap.data());
//       } else {
//         toast.error('Could not get landlord data');
//       }
//     };

//     getLandlord();
//   }, [params.landlordId]);

//   const onChange = (e) => setMessage(e.target.value);

//   return (
//     <div className="pageContainer">
//       <header>
//         <p className="pageHeader">Contact Landlord</p>
//       </header>

//       {landlord !== null && (
//         <main>
//           <div className="contactLandlord">
//             <p className="landlordName">Contact {landlord?.name}</p>
//           </div>

//           <form className="messageForm">
//             <div className="messageDiv">
//               <label htmlFor="message" className="messageLabel">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 id="message"
//                 className="textarea"
//                 value={message}
//                 onChange={onChange}
//               ></textarea>
//             </div>

//             <a
//               href={`mailto:${landlord.email}?Subject=${searchParams.get(
//                 'listingName'
//               )}&body=${message}`}
//             >
//               <button type="button" className="primaryButton">
//                 Send Message
//               </button>
//             </a>
//           </form>
//         </main>
//       )}
//     </div>
//   );
// }

// export default Contact;

import { useState, useEffect } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function Contact() {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState(null);
  // // eslint-disable-next-line
  // http://localhost:3000/contact/qHTGDktf23bv05Kg5tHSoHnSo4e2?listingName=john%20Doe%27s%20Rent
  // searchParams.get('listingName')
  const [searchParams, setSearchParams] = useSearchParams();
  // params.landlordId(qHTGDktf23bv05Kg5tHSoHnSo4e2) for landlordId
  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        // if you are on a listing that has a user or a landlord that doesn't exist
        toast.error('Could not get landlord data');
      }
    };

    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
