'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProfileFormProps {
  onSubmit: (profileData: any) => void
}

export default function ProfileForm({ onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    // bloodType: '',
    gender: '',
    dob: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi'
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi'
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi'
    if (!formData.address.trim()) newErrors.address = 'Alamat wajib diisi'
    // if (!formData.bloodType) newErrors.bloodType = 'Blood type is required'
    if (!formData.gender) newErrors.gender = 'Jenis kelamin wajib diisi'
    if (!formData.dob) newErrors.dob = 'Tanggal lahir wajib diisi'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Lengkapi Profil Anda</h2>
        <p className="text-foreground/60">NIK Anda belum terdaftar. Silakan lengkapi informasi profil terlebih dahulu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nama Lengkap *</label>
          <Input
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: '' })
            }}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email *</label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              if (errors.email) setErrors({ ...errors, email: '' })
            }}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nomor Telepon *</label>
          <InputGroup>
            <InputGroupInput value={formData.phone} onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value })
              if (errors.phone) setErrors({ ...errors, phone: '' })
            }} id="input-group-phone" placeholder="81234567890" />
            <InputGroupAddon>
              <InputGroupText>+62</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        {/* <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Golongan Darah *</label>
          <Select value={formData.bloodType} onValueChange={(value) => {
            setFormData({ ...formData, bloodType: value })
            if (errors.bloodType) setErrors({ ...errors, bloodType: '' })
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih golongan darah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
            </SelectContent>
          </Select>
          {errors.bloodType && <p className="text-sm text-destructive">{errors.bloodType}</p>}
        </div> */}

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Jenis Kelamin *</label>
          <Select value={formData.gender} onValueChange={(value) => {
            setFormData({ ...formData, gender: value })
            if (errors.gender) setErrors({ ...errors, gender: '' })
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tanggal Lahir *</label>
          <Input
            type="date"
            value={formData.dob}
            onChange={(e) => {
              setFormData({ ...formData, dob: e.target.value })
              if (errors.dob) setErrors({ ...errors, dob: '' })
            }}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dob && <p className="text-sm text-destructive">{errors.dob}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Alamat Lengkap *</label>
        <textarea
          placeholder="Tuliskan alamat lengkap Anda saat ini"
          value={formData.address}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value })
            if (errors.address) setErrors({ ...errors, address: '' })
          }}
          className="w-full px-3 py-2 border border-input rounded-md text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-20"
        />
        {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Lanjutkan ke Pilihan Layanan
      </Button>
    </div>
  )
}
