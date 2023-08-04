import Image from 'next/image'
import './NavBar.css'

export default function NavBar() {
    return (
        <div className="flex justify-between items-center mb-4">
            <Image width={4} height={4} className="w-16" src="/poppyFull.svg" alt="Poppy" />

            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="x">
                <span></span>
                <span></span>
                <span></span>
            </label>

            <div className="mobile-menu">
                <div className="column leading">
                    <h5 className="p-10">Overview</h5>
                    <a href="/">
                        <h4 className="p-10">PostBox</h4>
                    </a>
                    <a href="/pocket">
                        <h4 className="p-30">PostBox Pocket</h4>
                    </a>
                </div>

                <div className="column leading">
                    <h5 className="p-10">Resources</h5>
                    <a href="/resources">
                        <h4 className="p-10">Localization</h4>
                    </a>
                    <a href="/resources">
                        <h4 className="p-10">Github</h4>
                    </a>
                    <a href="/resources">
                        <h4 className="p-30">Documentation</h4>
                    </a>
                </div>

                <div className="column leading">
                    <h5 className="p-10">Support</h5>
                    <a href="/faq">
                        <h4 className="p-10">FAQ</h4>
                    </a>
                    <a href="https://discord.gg/5rP7f7jxjf">
                        <h4 className="p-10">Discord</h4>
                    </a>
                    <a href="https://twitter.com/PostBoxTeam">
                        <h4 className="p-30">Twitter</h4>
                    </a>
                </div>

                <a href="/downloads">
                    <div className="rounded-button-big invert">
                        <p className="link">Download</p>
                    </div>
                </a>
            </div>
        </div>
    )
}
