export type ContactCategory =
  | "z-data"
  | "partnership"
  | "recruitment"
  | "media"
  | "other";

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  category?: ContactCategory;
  message: string;
}

export interface ContactSuccessResponse {
  success: true;
  message: string;
}

export interface ContactErrorResponse {
  success: false;
  message?: string;
  errors?: Partial<Record<keyof ContactPayload, string>>;
}

export type ContactResponse = ContactSuccessResponse | ContactErrorResponse;

export const CATEGORY_LABEL: Record<ContactCategory, string> = {
  "z-data": "Z-Dataについて",
  partnership: "業務提携",
  recruitment: "採用について",
  media: "取材依頼",
  other: "その他",
};
