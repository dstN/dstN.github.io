'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';

// ─── Web3Forms Configuration ───
// Get your free access key at: https://web3forms.com
// Replace the placeholder below with your actual key.
const WEB3FORMS_ACCESS_KEY = '243b94a2-cd16-456c-adc2-274b74098a5b';

const contactSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters').max(100),
	email: z.email('Please enter a valid email address'),
	message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm() {
	const [formState, setFormState] = useState<ContactFormData>({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setFieldErrors({});

		// Client-side Zod validation
		const result = contactSchema.safeParse(formState);
		if (!result.success) {
			const errors: FieldErrors = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as keyof ContactFormData;
				if (!errors[field]) {
					errors[field] = issue.message;
				}
			}
			setFieldErrors(errors);
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					access_key: WEB3FORMS_ACCESS_KEY,
					name: result.data.name,
					email: result.data.email,
					message: result.data.message,
					subject: `Portfolio Contact: ${result.data.name}`,
					from_name: 'dstN Portfolio',
					// Honeypot — hidden field to catch bots
					botcheck: '',
				}),
			});

			const data = await response.json();

			if (data.success) {
				setIsSubmitted(true);
				setTimeout(() => {
					setIsSubmitted(false);
					setFormState({ name: '', email: '', message: '' });
				}, 4000);
			} else {
				setError(data.message || 'Something went wrong. Please try again.');
			}
		} catch {
			setError('Network error. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};

	const inputClasses = cn('w-full px-3 py-2.5 bg-input rounded-sm border text-sm font-mono', 'text-foreground placeholder:text-muted-foreground/40', 'focus:outline-none focus:border-primary focus:glow-magenta', 'transition-all disabled:opacity-50');

	return (
		<form onSubmit={handleSubmit}>
			{isSubmitted ? (
				<div className="flex flex-col items-center justify-center py-12">
					<div className="w-12 h-12 rounded-sm bg-neon-green/15 text-neon-green flex items-center justify-center mb-4 glow-green">
						<CheckCircle size={24} />
					</div>
					<h4 className="font-mono font-bold text-foreground mb-1 text-sm">Message Sent!</h4>
					<p className="text-xs text-muted-foreground font-mono">{"I'll get back to you within 24h."}</p>
				</div>
			) : (
				<div className="space-y-4">
					{error && (
						<div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-xs font-mono">
							<AlertCircle size={14} />
							<span>{error}</span>
						</div>
					)}

					{/* Honeypot — invisible to humans, catches bots */}
					<input type="text" id="botcheck" name="botcheck" aria-label="Bot check" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

					<div>
						<label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
							name
						</label>
						<input type="text" id="name" value={formState.name} onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))} disabled={isLoading} className={cn(inputClasses, fieldErrors.name ? 'border-destructive/50' : 'border-border/50')} placeholder="John Doe" required />
						{fieldErrors.name && <p className="text-xs font-mono text-destructive mt-1">{fieldErrors.name}</p>}
					</div>

					<div>
						<label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
							email
						</label>
						<input type="email" id="email" value={formState.email} onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))} disabled={isLoading} className={cn(inputClasses, fieldErrors.email ? 'border-destructive/50' : 'border-border/50')} placeholder="john@example.com" required />
						{fieldErrors.email && <p className="text-xs font-mono text-destructive mt-1">{fieldErrors.email}</p>}
					</div>

					<div>
						<label htmlFor="message" className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
							message
						</label>
						<textarea id="message" value={formState.message} onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))} disabled={isLoading} rows={4} className={cn(inputClasses, 'resize-none', fieldErrors.message ? 'border-destructive/50' : 'border-border/50')} placeholder="Tell me about your project..." required />
						{fieldErrors.message && <p className="text-xs font-mono text-destructive mt-1">{fieldErrors.message}</p>}
					</div>

					<button type="submit" disabled={isLoading} className="w-full py-2.5 bg-primary text-primary-foreground font-mono text-xs rounded-sm flex items-center justify-center gap-2 hover:opacity-90 hover:glow-magenta transition-all disabled:opacity-50">
						{isLoading ? (
							<>
								<Loader2 size={14} className="animate-spin" />
								sending...
							</>
						) : (
							<>
								<Send size={14} />
								send_message()
							</>
						)}
					</button>
				</div>
			)}
		</form>
	);
}
