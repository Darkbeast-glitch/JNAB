/**
 * JNAB Innovations API Client
 * Connects frontend to the Django REST Framework backend.
 */

const rawEnvUrl = (import.meta as any).env?.VITE_API_URL;

function getNormalizedApiUrl(): string {
  if (rawEnvUrl && typeof rawEnvUrl === 'string') {
    let clean = rawEnvUrl.trim().replace(/\/+$/, '');
    if (!clean.endsWith('/api')) {
      clean = `${clean}/api`;
    }
    return clean;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return `http://${window.location.hostname}:8000/api`;
  }
  return 'http://localhost:8000/api';
}

export const API_BASE_URL = getNormalizedApiUrl();

export interface JobPosition {
  id: number;
  title: string;
  slug: string;
  department: 'engineering' | 'design' | 'talent' | 'operations' | string;
  department_display: string;
  location: string;
  work_type: string;
  work_type_display: string;
  employment_type: string;
  employment_type_display: string;
  experience_level: string;
  salary_range: string;
  summary: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  featured: boolean;
  created_at: string;
}

export interface ProductBuildPayload {
  full_name: string;
  company_name?: string;
  work_email: string;
  phone: string;
  project_type: string;
  target_platforms?: string;
  budget_range: string;
  timeline: string;
  project_description: string;
  existing_spec_url?: string;
}

export interface HireTalentPayload {
  full_name: string;
  company_name: string;
  work_email: string;
  phone: string;
  engagement_model: string;
  roles_needed: string;
  seniority_level: string;
  headcount: string;
  duration: string;
  start_date: string;
  technical_requirements: string;
}

export interface AcademyPayload {
  full_name: string;
  email: string;
  phone: string;
  track: string;
  experience_level: string;
  learning_mode: string;
  portfolio_or_github?: string;
  motivation_statement: string;
  scholarship_requested: boolean;
}

// -------------------------------------------------------------
// API CALLS
// -------------------------------------------------------------

export async function getCareers(department?: string): Promise<JobPosition[]> {
  try {
    const url = new URL(`${API_BASE_URL}/careers/`);
    if (department && department !== 'all') {
      url.searchParams.set('department', department);
    }
    const res = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.results)) return data.results;
    return [];
  } catch (err) {
    console.warn('[JNAB API] Failed to fetch career openings from backend:', err);
    return [];
  }
}

export async function submitJobApplication(formData: FormData | Record<string, any>) {
  const isFormData = formData instanceof FormData;
  const res = await fetch(`${API_BASE_URL}/careers/apply/`, {
    method: 'POST',
    body: isFormData ? formData : JSON.stringify(formData),
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || 'Failed to submit application');
  }
  return await res.json();
}

export async function submitProductBuild(payload: ProductBuildPayload) {
  const res = await fetch(`${API_BASE_URL}/inquiries/product-build/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit product inquiry');
  }
  return await res.json();
}

export async function submitHireTalent(payload: HireTalentPayload) {
  const res = await fetch(`${API_BASE_URL}/inquiries/hire-talent/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit talent inquiry');
  }
  return await res.json();
}

export async function submitAcademyApplication(payload: AcademyPayload) {
  const res = await fetch(`${API_BASE_URL}/inquiries/academy/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit academy application');
  }
  return await res.json();
}
