export type Host = {
  id: string;
  user_id: string;
  created_at?: string;

  name: string | null;
  address: string | null;
  phone_number: string | null;
  work_description: string | null;
  offerings: string | null;
  interests: string[] | null;
  photo_url: string | null;
  surferbio: string | null;
  languages: string[] | null;
};
