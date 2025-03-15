// Video content management interfaces
export interface VideoLicense {
  id: string;
  type: 'own' | 'licensed' | 'creative-commons' | 'partnership';
  startDate: string;
  expirationDate?: string;
  terms: string[];
  restrictions?: string[];
  territoryRestrictions?: string[];
  renewalTerms?: string;
}

export interface VideoContent {
  id: string;
  url: string;
  title: string;
  creator: string;
  createdDate: string;
  duration: string;
  license: VideoLicense;
  attribution: string;
  thumbnailUrl?: string;
  tags: string[];
}

export interface Drill {
  name: string;
  description: string;
  duration: string;
  video?: VideoContent;
  metrics: string[];
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface WeeklySchedule {
  week: number;
  focus: string;
  activities: string[];
  drills: Drill[];
}

export interface ProgressTracking {
  weekly: string[];
  monthly: string[];
  endOfProgram: string[];
}

export interface PositionSpecificSession {
  position: string;
  drills: Drill[];
  focus: string[];
}

export interface CurriculumWeek {
  weekNumber: number;
  focus: string;
  description: string;
  objectives: string[];
  drills: Drill[];
}

export interface ScheduleSession {
  day: string;
  time: string;
  duration: string;
}

export interface Schedule {
  startDate: string;
  endDate: string;
  sessions: ScheduleSession[];
}

export interface PositionSession {
  position: string;
  description: string;
  drills: string[];
}

export interface Coach {
  name: string;
  role: string;
  qualifications: string[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  ageGroup: string;
  skillLevel: string;
  maxParticipants: number;
  schedule: Schedule;
  curriculum: CurriculumWeek[];
  equipment: string[];
  coaches: Coach[];
  positionSpecificSessions: PositionSession[];
  progressTracking?: ProgressTracking;
} 