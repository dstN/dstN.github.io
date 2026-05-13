'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons';
import { LegalModal } from '@/components/legal-modal';

export function Footer() {
	const currentYear = new Date().getFullYear();
	const [showLegal, setShowLegal] = useState(false);

	return (
		<>
			<footer className="relative border-t border-border/30 py-10">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						{/* Logo & copyright */}
						<div className="flex items-center gap-3">
							<a href="#home" className="font-mono font-bold text-foreground hover:text-primary transition-colors">
								dstN<span className="text-primary">.</span>
							</a>
							<span className="text-border">|</span>
							<p className="text-xs font-mono text-muted-foreground">
								© {currentYear} — Built with <Heart size={10} className="inline text-destructive" /> & caffeine
							</p>
						</div>

						{/* Legal & Social */}
						<div className="flex items-center gap-4">
							<button onClick={() => setShowLegal(true)} className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer">
								Legal
							</button>
							<span className="text-border">|</span>
							<div className="flex items-center gap-3">
								{[
									{ icon: GithubIcon, href: 'https://github.com/dstN', label: 'GitHub' },
									{ icon: LinkedinIcon, href: 'https://www.linkedin.com/in/dustin-aaron-tramm/', label: 'LinkedIn' },
									{ icon: XIcon, href: 'https://twitter.com/dstnjs', label: 'X' },
								].map((social) => (
									<a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
										<social.icon size={14} />
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</footer>

			{/* Legal Modal */}
			{showLegal && <LegalModal onClose={() => setShowLegal(false)} />}
		</>
	);
}
