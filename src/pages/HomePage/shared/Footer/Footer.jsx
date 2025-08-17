import React from 'react';
import ScholarlyLinkLogo from '../../../../components/ScholarlyLinkLogo/ScholarlyLinkLogo';

const Footer = () => {
    return (
        <footer className=" bg-gradient-to-r  from-primary from-50%  to-teal-500 to-90% text-accent p-10 pt-48 lg:pt-36">
            <div className="footer sm:footer-horizontal max-w-[1536px] mx-auto">
                <aside>
                    <ScholarlyLinkLogo textColor={''} />
                    <p>
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;