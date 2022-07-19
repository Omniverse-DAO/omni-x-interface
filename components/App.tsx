import Layout from './Layout'
import { WalletProvider } from './WalletProvider'
import {DndContext, DragEndEvent, DragStartEvent} from '@dnd-kit/core'
import React from 'react'

type AppProps = {
  children?: React.ReactNode
}

function App({ children }: AppProps) {
  const handleDragEnd = ({ active }: DragEndEvent) => {
    const { id } = active
    // console.log(active)
    // console.log(id)
  }
  const handleDragStart = ({ active }: DragStartEvent) => {
    // console.log(active)
  }

  return (
    <WalletProvider>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Layout>{children}</Layout>
      </DndContext>
    </WalletProvider>
  )
}

export default App
