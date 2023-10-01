import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <h1>HELLO GROUP 1!</h1>

    <div>
        <Link href="/account_creation">Account Creation
            Page</Link> {/* Temporary navigation to account creation page */}
    </div>

    <div>
        <Link href="/login">Login</Link> {/* Temporary navigation to account creation page */}
    </div>

    <div>
        <Link href="/firebase">firebase</Link> {/* Temporary navigation to account creation page */}
    </div>

    <div>
        <Link href="/pickup_lane">Pickup Lane</Link> {/* Temporary navigation to GPS page */}
    </div>


</div>
)
}
