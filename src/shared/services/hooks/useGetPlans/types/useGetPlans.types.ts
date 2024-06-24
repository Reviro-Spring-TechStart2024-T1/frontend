export interface Plan {
  id: number;
  plan_id: string;
  product_id: string;
  name: string;
  description: string;
  status: string;
  price?: number;
  period?: string;
  billing_cycles: [
    {
      frequency: {
        interval_unit: string;
        interval_count: number;
      };
      tenure_type: string;
      sequence: number;
      total_cycles: number;
      pricing_scheme: {
        fixed_price: {
          value: number;
          currency_code: string;
        };
      };
    },
  ];
  payment_preferences: {
    auto_bill_outstanding: boolean;
    setup_fee: {
      value: number;
      currency_code: string;
    };
    setup_fee_failure_action: string;
    payment_failure_threshold: number;
  };
  taxes: {
    percentage: number;
    inclusive: boolean;
  };
}

export interface PlansResponse {
  count: number;
  next: string;
  previous: string;
  results: Plan[];
}
