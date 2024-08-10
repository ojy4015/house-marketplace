// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
// import { db } from '../firebase.config'
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper-bundle.css'
// import Spinner from './Spinner'
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

// function Slider() {
//   const [loading, setLoading] = useState(true)
//   const [listings, setListings] = useState(null)

//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchListings = async () => {
//       const listingsRef = collection(db, 'listings')
//       const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
//       const querySnap = await getDocs(q)

//       let listings = []

//       querySnap.forEach((doc) => {
//         return listings.push({
//           id: doc.id,
//           data: doc.data(),
//         })
//       })

//       setListings(listings)
//       setLoading(false)
//     }

//     fetchListings()
//   }, [])

//   if (loading) {
//     return <Spinner />
//   }

//   if (listings.length === 0) {
//     return <></>
//   }

//   return (
//     listings && (
//       <>
//         <p className='exploreHeading'>Recommended</p>

//         <Swiper slidesPerView={1} pagination={{ clickable: true }}>
//           {listings.map(({ data, id }) => (
//             <SwiperSlide
//               key={id}
//               onClick={() => navigate(`/category/${data.type}/${id}`)}
//             >
//               <div
//                 style={{
//                   background: `url(${data.imgUrls[0]}) center no-repeat`,
//                   backgroundSize: 'cover',
//                 }}
//                 className='swiperSlideDiv'
//               >
//                 <p className='swiperSlideText'>{data.name}</p>
//                 <p className='swiperSlidePrice'>
//                   ${data.discountedPrice ?? data.regularPrice}{' '}
//                   {data.type === 'rent' && '/ month'}
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </>
//     )
//   )
// }

// export default Slider

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper-bundle.css'
import Spinner from './Spinner';
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  // fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(10));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      // console.log('listings --> ', listings);
      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  // listings가 없으면 빈공간을 없앰
  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>

        <Swiper
          slidesPerView={1}
          // install Swiper modules
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={true}
          style={{ height: '300px' }}
        >
          {/* listings : [{listing},{},{}, {},{}], listing : {data{}, id} */}
          {listings.map(({ data, id }) => {
            return (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  className="swiperSlideDiv"
                  style={{
                    // show first image of 5 listings
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                >
                  <p className="swiperSlideText">{data.name}</p>
                  <p className="swiperSlidePrice">
                    ${data.discountedPrice ?? data.regularPrice}{' '}
                    {data.type === 'rent' && '/ month'}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    )
  );
}

export default Slider;
