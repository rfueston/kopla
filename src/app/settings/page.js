import Link from 'next/link'

export default function Settings() {
    return (
        <div>
            <header>Settings </header>

            <div>
                <Link href="/login">Logout</Link> {/* Temporary navigation to account creation page */}
            </div>
        </div>
    )
}
