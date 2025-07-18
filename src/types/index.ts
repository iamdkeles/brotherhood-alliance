export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  preview: string;
  date: string;
  author: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface MembershipApplication {
  fullName: string;
  email: string;
  phone: string;
  motivation: string;
  referral?: string;
}

export interface MembershipApplication {
  fullName: string;
  email: string;
  phone: string;
  motivation: string;
  referral?: string;
}
