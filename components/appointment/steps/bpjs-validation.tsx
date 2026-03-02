'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface BpjsValidationProps {
  onSubmit: (bpjsNumber: string) => void
}

export default function BpjsValidation({ onSubmit }: BpjsValidationProps) {
  const [bpjsNumber, setBpjsNumber] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<'valid' | 'invalid' | null>(null)
  const [error, setError] = useState('')

  // Mock BPJS numbers for validation
  const validBpjsNumbers = ['0000000000000001', '0000000000000002', '1234567890123456']

  const handleValidate = async () => {
    if (!bpjsNumber.trim()) {
      setError('BPJS number is required')
      return
    }

    if (bpjsNumber.length !== 16) {
      setError('BPJS number must be 16 digits')
      return
    }

    if (!/^\d+$/.test(bpjsNumber)) {
      setError('BPJS number must contain only numbers')
      return
    }

    setError('')
    setIsValidating(true)

    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const isValid = validBpjsNumbers.includes(bpjsNumber)
    setValidationResult(isValid ? 'valid' : 'invalid')
    setIsValidating(false)
  }

  const handleContinue = () => {
    if (validationResult === 'valid') {
      onSubmit(bpjsNumber)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verify BPJS Number</h2>
        <p className="text-foreground/60">We need to verify your BPJS health insurance number</p>
      </div>

      <Card className="p-4 bg-secondary/30 border-secondary/50">
        <p className="text-sm text-foreground/70">
          Your BPJS number must be valid and active. We'll verify it with our system.
        </p>
      </Card>

      {validationResult === null ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">BPJS Number *</label>
            <Input
              type="text"
              placeholder="Enter your 16-digit BPJS number"
              value={bpjsNumber}
              onChange={(e) => {
                setBpjsNumber(e.target.value.replace(/\D/g, '').slice(0, 16))
                setError('')
              }}
              maxLength={16}
              disabled={isValidating}
              className="text-lg tracking-widest"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <p className="text-xs text-foreground/50">{bpjsNumber.length}/16 digits</p>
          </div>

          {isValidating && (
            <Card className="p-6 border-primary/20 bg-primary/5">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
                    style={{
                      borderTopColor: 'var(--color-primary)',
                      animation: 'spin 1s linear infinite'
                    }}
                  ></div>
                </div>
                <p className="text-sm text-foreground/70 font-medium">Validating BPJS number...</p>
              </div>
            </Card>
          )}

          <Button
            onClick={handleValidate}
            disabled={isValidating || !bpjsNumber}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
          >
            {isValidating ? 'Validating...' : 'Verify BPJS Number'}
          </Button>

          <style jsx>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      ) : validationResult === 'valid' ? (
        <div className="space-y-4">
          <Card className="p-6 border-primary/30 bg-primary/5">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary">
                  <svg className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">BPJS Verified Successfully</h3>
                <p className="text-sm text-foreground/60 mt-1">Your BPJS number is valid and active</p>
                <p className="text-xs text-foreground/50 mt-2">BPJS Number: {bpjsNumber}</p>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Proceed to Confirmation
          </Button>

          <Button
            onClick={() => {
              setValidationResult(null)
              setBpjsNumber('')
            }}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-secondary"
          >
            Use Different BPJS Number
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-6 border-destructive/30 bg-destructive/5">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-destructive">
                  <svg className="h-6 w-6 text-destructive-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">BPJS Verification Failed</h3>
                <p className="text-sm text-foreground/60 mt-1">The BPJS number you entered is not valid or inactive</p>
                <p className="text-xs text-foreground/50 mt-2">Please check your number and try again</p>
              </div>
            </div>
          </Card>

          <Button
            onClick={() => {
              setValidationResult(null)
              setBpjsNumber('')
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}
