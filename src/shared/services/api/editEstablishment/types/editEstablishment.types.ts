export interface EditEstablishmentArg {
  name: string;
  description: string;
  email: string;
  street_name: string;
  street_number: string;
  phone_number: string;
  latitude: string;
  longitude: string;
  happy_hour_start: string;
  happy_hour_end: string;
  logo: File | null;
}
