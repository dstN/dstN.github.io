import { ExternalLink, Package } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const projects = [
	{
		title: 'FootyGuess',
		slug: 'footyguess',
		description: 'Progressive-difficulty football player guessing game. Identify players from career stats, transfer history, and biographical clues with server-validated scoring.',
		tags: ['Nuxt 4', 'Nuxt UI', 'SQLite', 'Valibot', 'Playwright'],
		githubUrl: 'https://github.com/dstN/footyguess',
		liveUrl: 'https://footyguess.yinside.de',
		category: 'WEB APP',
		accent: 'primary' as const,
	},
	{
		title: 'remCSS',
		slug: 'remcss',
		description: 'Production-ready CSS framework rooted in the Golden Ratio (φ = 1.618). Pure CSS, zero JS runtime. Built with CSS Layers, oklch() colors, container queries, and @scope.',
		tags: ['Pure CSS', 'Golden Ratio', 'oklch()', 'CSS Layers', 'VitePress'],
		githubUrl: 'https://github.com/dstN/remCSS',
		liveUrl: 'https://remcss.vercel.app',
		npmUrl: 'https://www.npmjs.com/package/@dstn/remcss',
		category: 'NPM PACKAGE',
		accent: 'secondary' as const,
	},
	{
		title: 'Twitter Archiver',
		slug: 'twitter-archiver',
		description: 'Private Twitter/X archive viewer with 100% browser-side processing. Powerful search, smart filters, thread view, media support, and export to JSON/CSV. English & German.',
		tags: ['Vue 3', 'Vite 7', 'Tailwind CSS', 'zip.js', 'vue-i18n'],
		githubUrl: 'https://github.com/dstN/twitterArchiver',
		liveUrl: 'https://twittrarchivr.vercel.app',
		category: 'UTILITY',
		accent: 'primary' as const,
	},

	{
		title: 'fli',
		slug: 'fli',
		description: 'Local font importer package for bundling web fonts in static apps. Streamlines self-hosted typography without external Google font requests.',
		tags: ['TypeScript', 'NPM', 'Local Fonts', 'Static Export', 'Font Loader'],
		githubUrl: 'https://github.com/dstN/fli',
		npmUrl: 'https://www.npmjs.com/package/@dstn/fli',
		category: 'NPM PACKAGE',
		accent: 'secondary' as const,
	},
	{
		title: 'QuerBot API',
		slug: 'querbot-api',
		description: 'NestJS REST API powering a Twitter bot for bubble analysis. Features user tracking, mention processing, many-to-many relations, and a custom rating system.',
		tags: ['NestJS', 'TypeORM', 'MySQL', 'REST', 'GitHub Actions'],
		githubUrl: 'https://github.com/QuerBot/nestjs-api',
		category: 'BACKEND',
		accent: 'primary' as const,
	},
	{
		title: 'Threads Deleter',
		slug: 'threads-deleter',
		description: 'Enterprise-grade CLI & web tool to bulk-delete posts, replies, or both from Threads. Uses official Meta API with rate limiting, dry-run mode, and OAuth 2.0.',
		tags: ['Node.js', 'Express', 'Meta API', 'Docker', 'Jest'],
		githubUrl: 'https://github.com/dstN/threadsDeleter',
		liveUrl: 'https://threadsdelete.vercel.app',
		category: 'AUTOMATION',
		accent: 'secondary' as const,
	},
];

export function ProjectsSection() {
	return (
		<section id="projects" className="relative py-32 overflow-hidden">
			{/* Grid background */}
			<div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

			{/* Background accent */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" aria-hidden="true" />

			<div className="container mx-auto px-6 relative z-10">
				{/* Section header */}
				<div className="mb-16 animate-fade-in">
					<span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">{'// projects'}</span>
					<h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
						Open Source <span className="text-primary text-glow-magenta">&</span> Side Projects
					</h2>
					<p className="text-muted-foreground max-w-xl font-mono text-sm">Tools I build, break, and ship. From CSS frameworks to CLI automation.</p>
				</div>

				{/* Project grid */}
				<div className="grid md:grid-cols-2 gap-4">
					{projects.map((project, index) => (
						<article key={project.slug} className={cn('group glass rounded-sm border border-border/50 overflow-hidden transition-all duration-300', 'hover:border-primary/50 hover:glow-magenta', 'animate-fade-in-up')} style={{ animationDelay: `${index * 100}ms` }}>
							{/* Category bar */}
							<div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
								<span className={cn('font-mono text-xs tracking-[0.2em] uppercase', project.accent === 'primary' ? 'text-primary' : 'text-secondary')}>{project.category}</span>
								<div className="flex items-center gap-1">
									<span className="w-2 h-2 rounded-full bg-destructive/70" />
									<span className="w-2 h-2 rounded-full bg-neon-green/50" />
									<span className="w-2 h-2 rounded-full bg-primary/50" />
								</div>
							</div>

							{/* Content */}
							<div className="p-5 md:p-6">
								<h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-mono">{project.title}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

								{/* Tags */}
								<div className="flex flex-wrap gap-1.5 mb-6">
									{project.tags.map((tag) => (
										<span key={tag} className="px-2 py-0.5 text-xs font-mono bg-muted/50 border border-border/50 rounded-sm text-muted-foreground">
											{tag}
										</span>
									))}
								</div>

								{/* Links */}
								<div className="flex items-center gap-3">
									<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-border/50 rounded-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
										<GithubIcon size={14} />
										source
									</a>
									{project.liveUrl && (
										<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-primary/10 border border-primary/30 rounded-sm text-primary hover:bg-primary hover:text-primary-foreground transition-all">
											<ExternalLink size={14} />
											live
										</a>
									)}
									{project.npmUrl && (
										<a href={project.npmUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-secondary/30 rounded-sm text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
											<Package size={14} />
											npm
										</a>
									)}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
