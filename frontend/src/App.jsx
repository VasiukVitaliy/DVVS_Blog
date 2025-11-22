import { useState } from 'react'
import './App.css'
import ListMessages from './ListMessages'

function App() {

  return (
    <>
    <div className="min-h-[200px] w-[100%] flex flex-col items-center justify-center p-6 border-1">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">
          Вітаємо на моєму блозі
        </h1>
      </header>
    </div>
    <ListMessages/>
    </>
  )
}

export default App
