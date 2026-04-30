export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface GradeItem {
  subject: string;
  grade: string;
  gwa: string;
  pct: number;
  color: string;
  textColor: string;
  barColor: string;
}

export interface Testimonial {
  initials: string;
  name: string;
  school: string;
  quote: string;
}

export interface Stat {
  value: string;
  label: string;
}
