// stores/email-notified.ts
import { defineStore } from 'pinia'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'

export const useEmailNotifiedStore = defineStore('email-notified', () => {
  const email = ref('')
  const error = ref('')
  const success = ref(false)
  const loading = ref(false)
  const isInfo = ref(false)

  const listedEmail = useCookie('listed_email', {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate(): boolean {
    if (!email.value) {
      error.value = 'Email is required.'
      isInfo.value = false
      return false
    }
    if (!emailRegex.test(email.value)) {
      error.value = 'Please enter a valid email address.'
      isInfo.value = false
      return false
    }
    error.value = ''
    return true
  }

  async function isAlreadyInFirestore(db: any): Promise<boolean> {
    const q = query(
      collection(db, 'listed_emails'),
      where('email', '==', email.value)
    )
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  async function submit() {
    if (!validate()) return

    loading.value = true
    isInfo.value = false
    error.value = ''

    try {
      const { $firebase } = useNuxtApp()

      // Always check Firestore — cookie may have been deleted
      const alreadyExists = await isAlreadyInFirestore($firebase.db)

      if (alreadyExists) {
        // Exists in Firestore — show info but do NOT save to cookie
        error.value = "You're already on the list!"
        isInfo.value = true
        return
      }

      // New email — save to Firestore first
      await addDoc(collection($firebase.db, 'listed_emails'), {
        email: email.value,
        createdAt: serverTimestamp(),
      })

      // Only save to cookie after successful Firestore insert
      listedEmail.value = email.value
      success.value = true
      email.value = ''

    } catch (e) {
      error.value = 'Something went wrong. Please try again.'
      isInfo.value = false
    } finally {
      loading.value = false
    }
  }

  function reset() {
    email.value = ''
    error.value = ''
    success.value = false
    loading.value = false
    isInfo.value = false
  }

  return { email, error, success, loading, isInfo, listedEmail, submit, reset }
})