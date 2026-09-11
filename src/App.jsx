import { useState, useRef } from 'react'

function App() {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const yearRef = useRef(null)
  const monthRef = useRef(null)
  const dayRef = useRef(null)
  const monthDropdownRef = useRef(null)

  const handleYearChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 4) {
      setYear(value)
      if (value.length === 4) {
        monthRef.current?.focus()
      }
    }
  }

  const handleMonthChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 2 && parseInt(value) <= 12) {
      setMonth(value)
      if (value.length === 2) {
        dayRef.current?.focus()
      }
    }
  }

  const handleDayChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 2 && parseInt(value) <= 31) {
      setDay(value)
    }
  }

  const handleKeyDown = (e, field, prevRef) => {
    if (e.key === 'Backspace' && e.target.value === '' && prevRef) {
      prevRef.current?.focus()
    }
  }

  const handleMonthSelect = (monthNum) => {
    setMonth(monthNum.toString().padStart(2, '0'))
    setShowMonthDropdown(false)
    dayRef.current?.focus()
  }

  const handleMonthFocus = () => {
    setShowMonthDropdown(true)
  }

  const handleMonthBlur = (e) => {
    setTimeout(() => {
      if (!monthDropdownRef.current?.contains(e.relatedTarget)) {
        setShowMonthDropdown(false)
      }
    }, 100)
  }

  const months = [
    { num: 1, name: 'January' },
    { num: 2, name: 'February' },
    { num: 3, name: 'March' },
    { num: 4, name: 'April' },
    { num: 5, name: 'May' },
    { num: 6, name: 'June' },
    { num: 7, name: 'July' },
    { num: 8, name: 'August' },
    { num: 9, name: 'September' },
    { num: 10, name: 'October' },
    { num: 11, name: 'November' },
    { num: 12, name: 'December' }
  ]

  const calculateAge = () => {
    setError('')
    setResult(null)

    if (!year || !month || !day) {
      setError('Please fill in all fields')
      return
    }

    const birthYear = parseInt(year)
    const birthMonth = parseInt(month)
    const birthDay = parseInt(day)

    if (birthMonth < 1 || birthMonth > 12) {
      setError('Month must be between 1 and 12')
      return
    }

    if (birthDay < 1 || birthDay > 31) {
      setError('Day must be between 1 and 31')
      return
    }

    const birthDate = new Date(birthYear, birthMonth - 1, birthDay)

    if (birthDate.getDate() !== birthDay || birthDate.getMonth() !== birthMonth - 1) {
      setError('Invalid date (e.g., February 31st does not exist)')
      return
    }

    const today = new Date()

    if (birthDate > today) {
      setError('Birth date cannot be in the future')
      return
    }

    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24))
    const totalMonths = years * 12 + months
    const totalHours = totalDays * 24

    setResult({
      display: `${years} Years ${months} Months ${days} Days`,
      totalYears: years,
      totalMonths: totalMonths,
      totalDays: totalDays,
      totalHours: totalHours
    })
  }

  const today = new Date()

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0c0a1a 0%, #1a1040 30%, #2d1b69 60%, #1a1040 100%)'
    }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 left-1/3 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Header */}
      <header className="relative z-10 py-2 px-8 border-b border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
        <div className="w-full">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">Age <span className="text-purple-400">Calculator</span></h1>
                <p className="text-[9px] text-white/30 font-medium">v2.0 · Precise Age Calculation</p>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <p className="text-4xl font-black tracking-widest">
                <span className="text-red-400">K</span>
                <span className="text-orange-400">H</span>
                <span className="text-yellow-400">E</span>
                <span className="text-green-400">R</span>
                <span className="text-cyan-400">W</span>
                <span className="text-blue-400">A</span>
                <span className="text-purple-400">L</span>
                <span className="text-white mx-2">&middot;</span>
                <span className="text-pink-400">B</span>
                <span className="text-red-400">A</span>
                <span className="text-orange-400">Z</span>
                <span className="text-yellow-400">A</span>
                <span className="text-green-400">A</span>
                <span className="text-cyan-400">R</span>
              </p>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <p className="text-xs text-white/60 font-medium">
                  {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="text-[9px] text-white/30">{today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] transition-all duration-200"
              >
                {darkMode ? (
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 pb-8">
        <div className={`flex gap-5 transition-all duration-500 ${result ? 'w-full max-w-2xl' : ''}`}>

          {/* Left - Main Card */}
          <div className={`${result ? '' : 'mx-auto'} w-96`}>
            <div className="bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-white/[0.12] shadow-2xl shadow-black/30 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 pt-5 pb-4 text-center border-b border-white/[0.08]">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-3 border border-purple-500/20">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-0.5">Calculate Your Age</h2>
              <p className="text-white/50 text-xs">Enter your date of birth below</p>
            </div>

            {/* Card Body */}
            <div className="px-6 py-4">

              {/* Today's Date Display */}
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 text-center">Today's Date</p>
                <div className="flex gap-2 p-2 bg-white/[0.04] border border-white/[0.08] rounded-xl">
                  <div className="flex-1 text-center py-1.5">
                    <p className="text-[10px] text-white/40 mb-0.5">Year</p>
                    <p className="text-base font-bold text-white">{today.getFullYear()}</p>
                  </div>
                  <div className="w-px bg-white/[0.08]"></div>
                  <div className="flex-1 text-center py-1.5">
                    <p className="text-[10px] text-white/40 mb-0.5">Month</p>
                    <p className="text-base font-bold text-white">{String(today.getMonth() + 1).padStart(2, '0')}</p>
                  </div>
                  <div className="w-px bg-white/[0.08]"></div>
                  <div className="flex-1 text-center py-1.5">
                    <p className="text-[10px] text-white/40 mb-0.5">Day</p>
                    <p className="text-base font-bold text-white">{String(today.getDate()).padStart(2, '0')}</p>
                  </div>
                </div>
              </div>

              {/* Birth Date Input */}
              <div className="mb-4 p-3 border border-white/[0.12] rounded-xl animate-blink">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 text-center">Your Birth Date</p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      ref={yearRef}
                      type="text"
                      value={year}
                      onChange={handleYearChange}
                      onKeyDown={(e) => handleKeyDown(e, 'year', null)}
                      placeholder="YYYY"
                      maxLength={4}
                      className="w-full px-3 py-2.5 text-center bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 text-base font-semibold"
                    />
                    <p className="text-[10px] text-white/40 text-center mt-1.5 font-medium">Year</p>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      ref={monthRef}
                      type="text"
                      value={month}
                      onChange={handleMonthChange}
                      onFocus={handleMonthFocus}
                      onBlur={handleMonthBlur}
                      onKeyDown={(e) => handleKeyDown(e, 'month', yearRef)}
                      placeholder="MM"
                      maxLength={2}
                      className="w-full px-3 py-2.5 text-center bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 text-base font-semibold"
                    />
                    <p className="text-[10px] text-white/40 text-center mt-1.5 font-medium">Month</p>

                    {showMonthDropdown && (
                      <div
                        ref={monthDropdownRef}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1040]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 p-3"
                        style={{ width: '300px' }}
                      >
                        <div className="grid grid-cols-4 gap-1.5">
                          {months.map((m) => (
                            <button
                              key={m.num}
                              onClick={() => handleMonthSelect(m.num)}
                              className="text-center px-2 py-2.5 text-sm rounded-xl hover:bg-purple-500/20 text-white transition-all duration-150 border border-transparent hover:border-purple-500/30"
                            >
                              <div className="font-semibold">{m.num.toString().padStart(2, '0')}</div>
                              <div className="text-[10px] text-white/50">{m.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={dayRef}
                      type="text"
                      value={day}
                      onChange={handleDayChange}
                      onKeyDown={(e) => handleKeyDown(e, 'day', monthRef)}
                      placeholder="DD"
                      maxLength={2}
                      className="w-full px-3 py-2.5 text-center bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 text-base font-semibold"
                    />
                    <p className="text-[10px] text-white/40 text-center mt-1.5 font-medium">Day</p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-3 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-300 text-xs">{error}</p>
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={calculateAge}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide"
              >
                Calculate Age
              </button>
            </div>
          </div>
        </div>

          {/* Right - Result Card */}
          {result && (
            <div className="w-72 bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-white/[0.12] shadow-2xl shadow-black/30 overflow-hidden flex flex-col">
              {/* Result Header */}
              <div className="px-5 pt-4 pb-3 text-center border-b border-white/[0.08]">
                <div className="inline-flex items-center gap-1.5 mb-1">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">Result</span>
                </div>
                <p className="text-lg font-bold text-white">{result.display}</p>
              </div>

              {/* Result Stats - Vertical */}
              <div className="px-4 py-4 flex-1 flex flex-col gap-3">
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-400">{result.totalYears}</p>
                  <p className="text-[10px] text-white/40 mt-1 font-medium">Total Years</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-purple-400">{result.totalMonths.toLocaleString()}</p>
                  <p className="text-[10px] text-white/40 mt-1 font-medium">Total Months</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-pink-400">{result.totalDays.toLocaleString()}</p>
                  <p className="text-[10px] text-white/40 mt-1 font-medium">Total Days</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-amber-400">{result.totalHours.toLocaleString()}</p>
                  <p className="text-[10px] text-white/40 mt-1 font-medium">Total Hours</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center border-t border-white/[0.06]">
        <p className="text-xs text-white/30">Age Calculator &middot; Calculate your exact age in years, months, days & hours</p>
      </footer>
    </div>
  )
}

export default App
