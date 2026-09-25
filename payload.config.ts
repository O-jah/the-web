import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Reports } from './src/collections/Reports'
import { Stories } from './src/collections/Stories'
import { MuseumItems } from './src/collections/MuseumItems'
import { HelpResources } from './src/collections/HelpResources'
import { ContactSubmissions } from './src/collections/ContactSubmissions'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — OJAH Admin',
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, Pages, Reports, Stories, MuseumItems, HelpResources, ContactSubmissions],
  globals: [SiteSettings],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./ojah.db' } }),
  sharp,
  // Outgoing mail — the Contact form (and any admin-triggered notification
  // email, such as the ContactSubmissions afterChange hook) sends through this.
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'no-reply@ojah.org',
    defaultFromName: 'OJAH Website',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
})
