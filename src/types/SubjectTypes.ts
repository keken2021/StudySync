
export type Subject = {
  subjectId: number;
  subject: string;
  units: number;
  semester: string;
};

export interface SubjectResponseDTO {
  subject: string;
  units: number;
  semester: string;
  user: number;
}

export interface CreateSubjectDTO {
  subject: string;
  units: number;
  semester: string;
  user: number;
}
