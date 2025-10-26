import React, { useEffect, useState } from 'react'

export default function FastCall() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'he'
    } catch {
      return 'he'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {}
  }, [lang])

  const isMobile = /Mobi|Android/i.test(navigator.userAgent)

  const handleCall = (number) => {
    if (!isMobile) {
      alert(lang === 'he' ? 'חיוג זמין בטלפון בלבד' : 'Mobile only')
      return
    }
    window.location.href = `tel:${number}`
  }

  const labels = {
    he: { title: 'חיוג מהיר', call1: 'משטרה', call2: 'מד״א', call3: 'מכבי אש', langBtn: 'EN' },
    en: { title: 'FastCall', call1: 'Police', call2: 'Ambulance', call3: 'Firefighters', langBtn: 'עב' }
  }

  return (
    <section className="fastcall">
      <button
        className="lang-btn"
        onClick={() => setLang((l) => (l === 'he' ? 'en' : 'he'))}
      >
        {labels[lang].langBtn}
      </button>

      <h1>{labels[lang].title}</h1>

      <div className="buttons">
        <button className="police" onClick={() => handleCall('100')}>
          {labels[lang].call1}
        </button>
        <button className="ambulance" onClick={() => handleCall('101')}>
          {labels[lang].call2}
        </button>
        <button className="firefighters" onClick={() => handleCall('102')}>
          {labels[lang].call3}
        </button>
      </div>
    </section>
  )
}
