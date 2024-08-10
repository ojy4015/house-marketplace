import { useEffect, useState } from 'react';
// categoryName can be rent or sale
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference to the collection not document
        const listingsRef = collection(db, 'listings');

        // Create a query
        // <Route path="/category/:categoryName" element={<Category />} /> , either sale or rent
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(2)
        );

        // Execute query to get documents
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          // console.log(doc);
          // console.log(doc.data()); // object
          return listings.push({
            id: doc.id, // string
            data: doc.data(), // object
          });
        });

        setListings(listings);
        // console.log('listings ::', listings); // array of objects
        setLoading(false); // once we get data
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    };

    fetchListings();
  }, [params.categoryName]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference to the collection not document
      const listingsRef = collection(db, 'listings');

      // Create a query
      // <Route path="/category/:categoryName" element={<Category />} /> , either sale or rent
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(2)
      );

      // Execute query to get documents
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        // console.log(doc);
        // console.log(doc.data()); // object
        return listings.push({
          id: doc.id, // string
          data: doc.data(), // object
        });
      });

      // 엣날 아이템을 그대로 두고 새로운 것을 보임
      setListings((prevState) => [...prevState, ...listings]);
      // 새것만 보임
      // setListings(listings);
      // console.log('listings ::', listings); // array of objects
      setLoading(false); // once we get data
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                // <h3 key={listing.id}>{listing.data.name}</h3>
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;

// function Category() {
//   return <div className="category">category</div>;
// }

// export default Category;
