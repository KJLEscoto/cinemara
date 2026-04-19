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
    maxAge: 60 * 60 * 24 * 365,
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

  // Detect browser/search engine from userAgent
  function detectBrowser(): string {
    const ua = navigator.userAgent

    if (ua.includes('Edg/')) return 'Microsoft Edge'
    if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera'
    if (ua.includes('SamsungBrowser')) return 'Samsung Browser'
    if (ua.includes('CriOS')) return 'Chrome on iOS'
    if (ua.includes('FxiOS')) return 'Firefox on iOS'
    if (ua.includes('Chrome') && !ua.includes('Chromium')) return 'Google Chrome'
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Chromium')) return 'Chromium'
    return 'Unknown'
  }

  // Detect device type — use touch + screen size for accuracy
  function detectDevice(): string {
    const ua = navigator.userAgent
    const hasTouch = 'ontouchend' in document || navigator.maxTouchPoints > 0

    if (/ipad/i.test(ua)) return 'Tablet'
    if (/tablet|playbook|silk/i.test(ua)) return 'Tablet'

    // iPad on iOS 13+ reports as Mac, detect via touch
    if (/mac/i.test(navigator.platform) && hasTouch) return 'Tablet'

    if (/iphone|ipod/i.test(ua)) return 'Mobile'
    if (/android/i.test(ua) && !/tablet/i.test(ua)) {
      // Small screen = phone, large = tablet
      return window.screen.width <= 768 ? 'Mobile' : 'Tablet'
    }

    return hasTouch ? 'Mobile' : 'Desktop'
  }

  // Detect OS — order matters, check iOS before Mac
  function detectOS(): string {
    const ua = navigator.userAgent
    const platform = navigator.platform ?? ''

    if (/iphone|ipad|ipod/i.test(ua)) return 'iOS'                     // must be before MacOS
    if (/android/i.test(ua)) return 'Android'                           // must be before Linux
    if (/win/i.test(platform) || ua.includes('Windows')) return 'Windows'
    if (/mac/i.test(platform) && !('ontouchend' in document)) return 'MacOS' // touch = iPad
    if (/linux/i.test(platform)) return 'Linux'
    return 'Unknown'
  }

  // Get IP address from free API
  async function getIPAddress(): Promise<string> {
    try {
      const res = await $fetch<{ ip: string }>('https://api.ipify.org?format=json')
      return res.ip
    } catch {
      return 'Unknown'
    }
  }

  async function collectDeviceInfo() {
    const [ip] = await Promise.all([getIPAddress()])

    return {
      ip_address: ip,
      browser: detectBrowser(),
      device: detectDevice(),
      os: detectOS(),
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }

  async function isAlreadyInFirestore(db: any, emailToCheck: string): Promise<boolean> {
    const q = query(
      collection(db, 'listed_emails'),
      where('email', '==', emailToCheck)
    )
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  async function verifyCookie() {
    if (!listedEmail.value) return

    try {
      const { $firebase } = useNuxtApp()
      const stillExists = await isAlreadyInFirestore($firebase.db, listedEmail.value)

      if (!stillExists) {
        listedEmail.value = null
        success.value = false
      } else {
        success.value = true
      }
    } catch {
      success.value = true
    }
  }

  async function submit() {
    if (!validate()) return

    loading.value = true
    isInfo.value = false
    error.value = ''

    try {
      const { $firebase } = useNuxtApp()

      const alreadyExists = await isAlreadyInFirestore($firebase.db, email.value)
      if (alreadyExists) {
        error.value = "You're already on the list!"
        isInfo.value = true
        return
      }

      // Collect device info before saving
      const deviceInfo = await collectDeviceInfo()

      await addDoc(collection($firebase.db, 'listed_emails'), {
        email: email.value,
        createdAt: serverTimestamp(),
        ...deviceInfo,
      })

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

  return { email, error, success, loading, isInfo, listedEmail, submit, reset, verifyCookie }
})