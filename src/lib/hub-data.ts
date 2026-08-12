import changelogJson from './changelog.json';
import projectsJson from './projects.json';

export type ProjectKind = 'web' | 'tui' | 'os' | 'lib';

export interface Project {
	name: string;
	description: string;
	tagline: string;
	language: string;
	kind: ProjectKind;
	accent: string;
	featured: boolean;
	order: number;
	html_url: string;
	homepage: string;
	topics: string[];
	pushed_at: string;
	links: Record<string, string>;
}

export interface ChangelogEntry {
	repo: string;
	version: string;
	date: string;
	title: string;
	body: string;
	source: 'release' | 'changelog';
}

export const projects = projectsJson as Project[];
export const changelog = changelogJson as ChangelogEntry[];
