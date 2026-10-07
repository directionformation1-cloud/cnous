import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION_NAME = 'demoAccountSubmissions'

const normalizeIdentifier = (value) => value.trim().replace(/\s+/g, '').toUpperCase()

const submissionDocumentId = (identifier, accountNumber) => {
  const safeIdentifier = encodeURIComponent(normalizeIdentifier(identifier))
  return `${safeIdentifier}--${accountNumber}`
}

export const saveDemoSubmission = async ({ identifier, accountNumber }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier)
  const submissionRef = doc(db, COLLECTION_NAME, submissionDocumentId(normalizedIdentifier, accountNumber))

  return runTransaction(db, async (transaction) => {
    const existingSubmission = await transaction.get(submissionRef)
    if (existingSubmission.exists()) return { duplicate: true }

    

    return { duplicate: false }
  })
}

export const subscribeToDemoSubmissions = (onData, onError) => {
  const submissionsQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))

  return onSnapshot(submissionsQuery, (snapshot) => {
    onData(snapshot.docs.map((submission) => ({
      firestoreId: submission.id,
      ...submission.data(),
    })))
  }, onError)
}

export const updateDemoSubmissionStatus = (firestoreId, status) => (
  updateDoc(doc(db, COLLECTION_NAME, firestoreId), { status })
)
