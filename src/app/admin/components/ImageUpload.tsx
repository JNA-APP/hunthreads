'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Props {
  name?: string
  defaultValue?: string
}

export function ImageUpload({ name = 'image_src', defaultValue = '' }: Props) {
  const [url, setUrl] = useState(defaultValue)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus('uploading')

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { data, error } = await supabase.storage
      .from('cms-images')
      .upload(path, file, { upsert: true })

    if (error || !data) {
      setStatus('error')
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('cms-images')
      .getPublicUrl(data.path)

    setUrl(publicUrl)
    setStatus('done')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {url && (
        <img
          src={url}
          alt="Preview"
          className="ht-upload-preview"
          style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 6, background: '#1a1a1a' }}
        />
      )}

      <input type="hidden" name={name} value={url} />

      <label style={{ cursor: 'pointer', display: 'inline-block' }}>
        <span className="ht-btn ht-btn--ghost ht-btn--sm" style={{ display: 'inline-flex' }}>
          {status === 'uploading' ? 'Uploading...' : url ? 'Replace image' : 'Upload image'}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ display: 'none' }}
          disabled={status === 'uploading'}
        />
      </label>

      {status === 'error' && (
        <span style={{ fontSize: 12, color: '#e85555' }}>Upload failed — try again.</span>
      )}
      {status === 'done' && (
        <span style={{ fontSize: 12, color: '#2BBECB' }}>Uploaded.</span>
      )}
    </div>
  )
}
