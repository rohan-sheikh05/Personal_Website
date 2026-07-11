// src/hooks/useCollection.js
//
// One hook, reused by every public section (Skills, Achievements,
// Certificates, Projects, ClubAffiliations, Hero images). It:
//   1. Subscribes in real time to a Firestore collection (ordered by an
//      "order" field you set in the admin panel).
//   2. Falls back to static data if Firestore is empty, unreachable, or
//      not configured yet - so the site never shows a blank section,
//      even before you've set up Firebase or seeded any data.

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function useCollection(collectionName, fallbackData = []) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const q = query(collection(db, collectionName), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!isMounted) return;
        if (snapshot.empty) {
          setData(fallbackData);
          setUsingFallback(true);
        } else {
          setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setUsingFallback(false);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`[useCollection] Failed to load "${collectionName}":`, error);
        if (!isMounted) return;
        setData(fallbackData);
        setUsingFallback(true);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
    // fallbackData is a fresh array/object each render for most callers,
    // so intentionally excluded - it should only ever depend on which
    // collection we're watching.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { data, loading, usingFallback };
}
