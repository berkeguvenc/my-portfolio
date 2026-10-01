export interface SocialLink {
    platform: string;
    url: string;
    label: string;
}

export interface PersonalInfo {
    name: string;
    role: string;
    bio: string;
    about?: string;
    aboutImage?: string;
    location?: string;
    avatarUrl?: string;
    resumeUrl?: string;
    statusText?: string;
    isAvailableForWork: boolean;
}

export interface FeaturedProject {
    id: string;
    title: string;
    description: string;
    categoryTags: string[];
    coverImage: string;
    demoUrl?: string;
    githubUrl?: string;
    featured: boolean;
    order: number;
}

export interface BuildProject {
    id: string;
    title: string;
    description: string;
    platformBadge: string;
    roleTags: string[];
    iconUrl: string;
    links: {
        website?: string;
        googlePlay?: string;
        appStore?: string;
        githubUrl?: string;
    };
    order: number;
}

export interface SkillCategory {
    categoryName: string;
    lucideIcon?: string;
    skills: string[];
    icons?: string[];
}

export interface ExperienceItem {
    id: string;
    period: string;
    company: string;
    role: string;
    description?: string;
    companyUrl?: string;
    order: number;
}

export interface SiteMeta {
    title: string;
    description: string;
    ogImage: string;
    favicon?: string;
}

export interface FooterInfo {
    text?: string;
    links?: { label: string; url: string }[];
}

export interface NavTitles {
    work?: string;
    builds?: string;
    skills?: string;
    about?: string;
}

export interface SectionTitles {
    featuredProjects?: string;
    builds?: string;
    skills?: string;
    experiences?: string;
}

export interface PortfolioData {
    meta: SiteMeta;
    personal: PersonalInfo;
    socials: SocialLink[];
    featuredProjects: FeaturedProject[];
    builds: BuildProject[];
    skills: SkillCategory[];
    experiences: ExperienceItem[];
    footer?: FooterInfo;
    sectionTitles?: SectionTitles;
    navTitles?: NavTitles;
}