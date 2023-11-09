// In your application layout component
import Link from 'next/link';

const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/help">Help Settings</Link>
                    </li>
                </ul>
            </nav>
            {/* Other content and components */}
        </div>
    );
};

export default Layout;