export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  iconName?: string;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  status: 'CURRENT' | 'PAST';
  bullets: string[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface Leadership {
  role: string;
  organization: string;
  description: string;
}

export interface OrganizedEvent {
  name: string;
  url: string;
}
