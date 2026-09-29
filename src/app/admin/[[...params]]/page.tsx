'use client'

import dynamic from 'next/dynamic'
import config from '../../../../keystatic.config'
import { makePage } from '@keystatic/next/ui/app'

const KeystaticPage = makePage(config)

export default dynamic(() => Promise.resolve({ default: KeystaticPage }), { ssr: false })
