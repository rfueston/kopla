import Link from 'next/link'

export default function Main() {
    return (
        <div>
            <header>Success!, logged in</header>

            <div>
                <Link href="/firebase">firebase</Link> {/* Temporary navigation to firebase page */}
            </div>

            <div>
                <Link href="/pickup_lane">Pickup Lane</Link> {/* Temporary navigation to pickup lane page */}
            </div>


            <div>
                <Link href="/geofencing">Geofencing</Link> {/* Temporary navigation to GPS page */}
            </div>

            <div>
                <Link href="/settings">Settings</Link> {/* Temporary navigation to Settings page */}
            </div>

        </div>
    )
}
