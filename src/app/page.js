import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
    <h1>HELLO GROUP 1!</h1>
    <Link href="/account_creation">Account Creation Page</Link> {/* Temporary navigation to account creation page */}
    </div>
  )
}
