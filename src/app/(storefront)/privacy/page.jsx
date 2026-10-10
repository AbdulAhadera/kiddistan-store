import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | Kiddistan",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
                <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-store-text sm:text-5xl">
                    Privacy Policy
                </h1>
                <p className="mt-2 text-sm text-store-text-secondary">
                    Last Updated: October 2026
                </p>

                <p className="mt-4 max-w-2xl text-base leading-8 text-store-text-secondary sm:text-lg">
                    This Privacy Policy explains how Kiddistan collects, uses, and protects your information when you browse or shop on our website.
                </p>

                <div className="mt-14 space-y-12">
                    {/* INFORMATION WE COLLECT */}
                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Information We Collect
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            When you visit our website, we collect your IP address. This is collected as part of your browsing activity on our website and helps us understand how visitors use the site.
                        </p>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            Collecting your IP address is part of our right as a website operator, as it is necessary to maintain, secure, and improve the website experience for all visitors.
                        </p>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            When you place an order, we collect your name, email address, phone number, and shipping address. This information is required to process your order and deliver it to you.
                        </p>
                    </section>

                    {/* HOW WE USE INFORMATION */}
                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            How We Use Your Information
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            We use the information we collect to make informed decisions about our website, such as understanding traffic patterns, improving site performance, and enhancing the overall browsing experience.
                        </p>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            We do not sell, rent, or share your personal information with third parties for marketing purposes.
                        </p>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            Order information is used to process your purchase, arrange delivery, and contact you regarding your order status or any issues.
                        </p>
                    </section>

                    {/* DATA CONTROL */}
                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Data Control
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            All data collected through this website remains within our control. We do not transfer, sell, or share this data with any external parties.
                        </p>
                    </section>

                    {/* COOKIES */}
                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Cookies
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            We do not use cookies on this website. No tracking cookies, advertising cookies, or third-party cookies are placed on your device when you browse Kiddistan.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Data Sharing
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            We share your shipping address and contact number with our delivery partners solely for the purpose of delivering your order. We do not share your information with any other third parties for marketing or advertising purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Children's Privacy
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
                        </p>
                    </section>

                    {/* SECURITY */}
                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Security
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            We take security seriously and have implemented standard security protocols to protect our website and the data we collect.
                        </p>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            However, in the event of any unauthorized attack, breach, or malicious activity beyond our control, Kiddistan does not take any responsibility for resulting damages or data loss.
                        </p>
                    </section>

                    {/* YOUR RIGHTS */}
                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Your Rights
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            Since we only collect your IP address and do not use cookies or share data externally, there is limited personal data collected through this website. If you have any concerns about your data, you may contact us at info@kiddistan.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Changes to This Policy
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* CONTACT */}
                    <section>
                        <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-store-text sm:text-3xl">
                            Contact Us
                        </h2>

                        <p className="mt-4 text-base leading-8 text-store-text-secondary sm:text-lg">
                            For any questions or concerns regarding this Privacy Policy, contact us at{" "}
                            <a
                                href="mailto:info@kiddistan.com"
                                className="font-semibold text-store-text underline"
                            >
                                info@kiddistan.com
                            </a>{" "}
                            or call{" "}
                            <a
                                href="tel:+923012987787"
                                className="font-semibold text-store-text underline"
                            >
                                +92 301 2987787
                            </a>
                            .
                        </p>
                    </section>
                </div>

                <div className="mt-12 border-t border-store-border pt-8">
                    <Link
                        href="/"
                        className="text-sm font-bold uppercase tracking-[0.14em] text-store-text underline"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}