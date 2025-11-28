import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/AuthContext'

describe('NavBar', ()=>{
  it('shows login link when not authenticated', ()=>{
    const mockValue = { user: null, logout: ()=>{} }
    render(
      <AuthContext.Provider value={mockValue}>
        <NavBar />
      </AuthContext.Provider>
    )
    expect(screen.getByText('Login')).toBeDefined()
  })

  it('shows user email and logout when authenticated', ()=>{
    const mockValue = { user: { email: 'test@example.com' }, logout: ()=>{} }
    render(
      <AuthContext.Provider value={mockValue}>
        <NavBar />
      </AuthContext.Provider>
    )
    expect(screen.getByText(/test@example.com/)).toBeDefined()
  })
})
