import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCkkBP07UdEP_bVomFU7LTiNVk_9mbs69Q',
  authDomain: 'mediviz-2318f.firebaseapp.com',
  projectId: 'mediviz-2318f',
  storageBucket: 'mediviz-2318f.firebasestorage.app',
  messagingSenderId: '410815903655',
  appId: '1:410815903655:web:8d2f1b4117567994ee2882',
  measurementId: 'G-CVEVJFVQDT',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let analytics = null;

if (typeof window !== 'undefined') {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

function mapDoc(entry) {
  return { id: entry.id, ...entry.data() };
}

async function getByDocId(collectionName, scanId) {
  const record = await getDoc(doc(db, collectionName, scanId));
  return record.exists() ? [mapDoc(record)] : [];
}

async function getByScanField(collectionName, scanId) {
  const q = query(collection(db, collectionName), where('scanId', '==', scanId), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc);
}

export async function fetchScanDataById(scanId) {
  const safeScanId = (scanId || '').trim();
  if (!safeScanId) {
    throw new Error('Scan ID is required.');
  }

  const collections = ['scans', 'analysis', 'results', 'events'];
  const response = {
    scanId: safeScanId,
    collections: {},
    totalMatches: 0,
  };

  for (const collectionName of collections) {
    const [byId, byField] = await Promise.all([
      getByDocId(collectionName, safeScanId),
      getByScanField(collectionName, safeScanId),
    ]);

    const deduped = [...byId, ...byField].filter(
      (item, index, all) => all.findIndex((it) => it.id === item.id) === index,
    );

    response.collections[collectionName] = deduped;
    response.totalMatches += deduped.length;
  }

  return response;
}

export { analytics, app, db };
