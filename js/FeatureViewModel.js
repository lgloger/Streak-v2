import { useState } from "react";
import { 
  getFirestore, 
  collection, 
  query, 
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const useFeatureViewModel = () => {
  const [allFeatures, setAllFeatures] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeatures = (status) => {
    setLoading(true);
    const db = getFirestore();
    const q = query(collection(db, "roadmap"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const featuresData = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setAllFeatures(featuresData);
      setFilteredFeatures(featuresData.filter(f => f.status === status));
      setLoading(false);
    });

    return unsubscribe;
  };

  const toggleVote = async (featureId, userId) => {
    const db = getFirestore();
    const featureRef = doc(db, "roadmap", featureId);

    const feature = allFeatures.find(f => f.id === featureId);
    if (!feature) return;

    const hasVoted = feature.votedUsers?.includes(userId);

    await updateDoc(featureRef, {
      votedUsers: hasVoted ? arrayRemove(userId) : arrayUnion(userId),
      vote: hasVoted ? feature.vote - 1 : feature.vote + 1,
    });
  };

  return { 
    allFeatures,
    filteredFeatures,
    loading, 
    fetchFeatures,
    toggleVote,
  };
};

export default useFeatureViewModel;