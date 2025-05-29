export interface IEmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
}

export interface IUserDTO {
  id: string;
  first_name: string;
  last_name?: string;
  image_url?: string;
  profile_image_url?: string;
  created_at: Date;
  updated_at: Date;
  email_addresses: IEmailAddress[];
}

export interface IUserDeletedDTO extends IUserDTO {}
