export type Guarantee = {
  id: number;
  client_id: number;
  loan_payment_method: any;
  loan_payment_time: any;
  is_have_credit: string;
  credit_institutions_and_amount: string;
  credit_amount: string;
  credit_destination: string;
  reason_for_credit_request: string;
  gurrentee_items: string[];
  product_id: number;
  agency: string;
  created_from: string;
  userId: number;
  status: string;
  pdf: any;
  approval_from_management: boolean;
  disbursement_flag: boolean;
  disbursement_date: any;
  is_new_client: boolean;
  search_field: string;
  createdAt: string;
  updatedAt: string;
  client: Client;
};

export type Client = {
  id: number;
  name: string;
  surname: string;
  second_surname: string;
  second_name: string;
  phone_number: string;
  landline_phone_number: string;
  email: string;
  residence_address: string;
  residence_municipality: string;
  department_of_residence: string;
  birth_date: string;
  profession: string;
  civil_status: string;
  sex: string;
  nationality: string;
  dpi_number: string;
  nit: string;
  company_name: string;
  entry_date: string;
  position: string;
  monthly_income: string;
  monthly_expenses: string;
  date_and_number_of_income: string;
  immediate_boss_name: string;
  work_address: string;
  work_municipality: string;
  work_phone: string;
  business_name: any;
  start_date: any;
  nit5: any;
  monthly_sales: any;
  monthly_expenses5: any;
  business_address: any;
  business_phone: any;
  occupation: string;
  place_of_birth_city: string;
  place_of_birth_region: string;
  neighborhood_city: string;
  neighborhood_region: string;
  f_references_name_and_surname: string;
  f_references_relationship: string;
  f_references_work_phone: string;
  f_references_cell_phone: string;
  f_references_name_and_surname_2: string;
  f_references_relationship_2: string;
  f_references_work_phone_2: string;
  f_references_cell_phone_2: string;
  p_references_name_and_surname: string;
  p_references_relationship: string;
  p_references_work_phone: string;
  p_references_cell_phone: string;
  p_references_name_and_surname_2: string;
  p_references_relationship_2: string;
  p_references_work_phone_2: string;
  p_references_cell_phone_2: string;
  photos_of_the_dpi: string[];
  photos_of_bills: string[];
  expiration_date: string;
  comment: any;
  agency: string;
  work_department: string;
  business_municipality: string;
  business_department: string;
  createdAt: string;
  updatedAt: string;
};

export interface DebtCollection {
  client: DebtCollectionClient;
  debt_collections: DebtCollections;
  debt_collection?: DebtCollections;
  credit: Credit;
}

export interface DebtCollectionClient {
  id: number;
  name: string;
  surname: string;
  second_surname: string;
  dpi_number: string;
  residence_address: string;
  residence_municipality: string;
  department_of_residence: string;
}

export interface DebtCollections {
  id: number;
  no_of_installment: number;
  payment_date: string;
  payment_made: string;
  amount_to_pay: string;
  credit_fee: string;
  credit_capital: string;
  credit_interest: string;
  credit_interest_tax: string;
  administrative_fee: string;
  administrative_fee_tax: string;
  assistance_fee: string;
  assistance_fee_tax: string;
  discount_holidays_amount: string;
  discount_holidays_capital: string;
  discount_holidays_interest: string;
  discount_holidays_tax: string;
  collection_management_fee: string;
  collection_management_tax: string;
  default_amount: string;
  default_interest: string;
  default_interest_tax: string;
  total_paid_amount: string;
  total_pending_amount: string;
  total_tax: string;
  advanced_installment: string;
  status: string;
  credit_id: number;
  only_default: string;
  collection_management_without_tax: string;
  credit_interest_with_tax: string;
  paid_default_interest_with_tax: string;
  paid_default_interest: string;
  paid_default_interest_tax: string;
  paid_default_amount: string;
  paid_only_default: string;
  paid_collection_management_fee: string;
  paid_collection_management_without_tax: string;
  paid_collection_management_tax: string;
  paid_credit_interest_with_tax: string;
  paid_credit_interest: string;
  paid_credit_interest_tax: string;
  paid_credit_capital: string;
  paid_total_tax: string;
  default_interest_with_tax: string;
  cumulative_default_interest_with_tax: string;
  updatedBy: string;
  agency: string;
  is_last: boolean;
  initial_rounding: string;
  total_rounding: string;
  payment_rounding: string;
  createdAt: string;
  updatedAt: string;
}

export interface Credit {
  id: number;
  total_amount: string;
  payment_frequency: string;
  vat: string;
  interest_rate: string;
  management_expenses: string;
  management_days: number;
  assistance_expenses: string;
  administrative_expenses: string;
  total_installments: number;
  payment_dates: string[];
  installment_amount: string;
  disbursement_amount: string;
  disbursement_date: string;
  holidays_discount: string;
  late_interest: string;
  holiday_dates: any[];
  interest_without_vat: string;
  requested_amount: string;
  userId: number;
  client_id: number;
  total_paid_amount: string;
  total_remaining_amount: string;
  total_default_amount: string;
  total_credit_amount: string;
  total_credit_interest_amount: string;
  product_name: string;
  product_id: number;
  status: string;
  application_id: number;
  agency: string;
  first_unpaid_date: string;
  last_unpaid_date: string;
  times_not_paid: number;
  pending_collection_manager: boolean;
  original_credit_capital: string;
  original_credit_interest: string;
  original_credit_interest_tax: string;
  original_credit_interest_with_tax: string;
  rounded_installment_amount: string;
  rounded_installment_diff: string;
  is_disbursement: boolean;
  guaranty: string;
  createdAt: string;
  updatedAt: string;
}
