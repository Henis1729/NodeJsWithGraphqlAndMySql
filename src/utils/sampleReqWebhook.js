export let webhookSuccessReq = {
  data: {
    order: {
      order_id: "1633615918",
      order_amount: 1.0,
      order_currency: "INR",
      order_tags: null,
    },
    payment: {
      cf_payment_id: 1107253,
      payment_status: "SUCCESS",
      payment_amount: 1.0,
      payment_currency: "INR",
      payment_message: "Transaction pending",
      payment_time: "2021-10-07T19:42:40+05:30",
      bank_reference: "1903772466",
      auth_id: null,
      payment_method: {
        card: {
          channel: null,
          card_number: "470613XXXXXX2123",
          card_network: "visa",
          card_type: "credit_card",
          card_country: "IN",
          card_bank_name: "TEST Bank",
        },
      },
      payment_group: "credit_card",
    },
    customer_details: {
      customer_name: "Yogesh",
      customer_id: "12121212",
      customer_email: "yogesh.miglani@gmail.com",
      customer_phone: "9666699999",
    },
  },
  event_time: "2021-10-07T19:42:44+05:30",
  type: "PAYMENT_SUCCESS_WEBHOOK",
};
export let userDroppedWebhook = {
  data: {
    order: {
      order_id: "order_02",
      order_amount: 2.0,
      order_currency: "INR",
      order_tags: null,
    },
    payment: {
      cf_payment_id: 975672265,
      payment_status: "USER_DROPPED",
      payment_amount: 2.0,
      payment_currency: "INR",
      payment_message:
        "User dropped and did not complete the two factor authentication",
      payment_time: "2022-05-25T14:25:34+05:30",
      bank_reference: "1803592531",
      auth_id: "2980",
      payment_method: {
        netbanking: {
          channel: null,
          netbanking_bank_code: "3044",
          netbanking_bank_name: "State Bank Of India",
        },
      },
      payment_group: "net_banking",
    },
    customer_details: {
      customer_name: null,
      customer_id: "7112AAA812234",
      customer_email: "miglaniyogesh7@gmail.com",
      customer_phone: "9611199227",
    },
  },
  event_time: "2022-05-25T14:35:38+05:30",
  type: "PAYMENT_USER_DROPPED_WEBHOOK",
};
export let webhookFailedReq = {
  data: {
    order: {
      order_id: "order_01",
      order_amount: 2.0,
      order_currency: "INR",
      order_tags: null,
    },
    payment: {
      cf_payment_id: 975677709,
      payment_status: "FAILED",
      payment_amount: 2.0,
      payment_currency: "INR",
      payment_message: "ZA::U19::Transaction fail",
      payment_time: "2022-05-25T14:28:22+05:30",
      bank_reference: "214568722700",
      auth_id: null,
      payment_method: {
        upi: {
          channel: null,
          upi_id: "9611199227@paytm",
        },
      },
      payment_group: "upi",
    },
    customer_details: {
      customer_name: null,
      customer_id: "7112AAA812234",
      customer_email: "miglaniyogesh7@gmail.com",
      customer_phone: "9611199227",
    },
    error_details: {
      error_code: "TRANSACTION_DECLINED",
      error_description:
        "issuer bank or payment service provider declined the transaction",
      error_reason: "auth_declined",
      error_source: "customer",
    },
  },
  event_time: "2022-05-25T14:28:38+05:30",
  type: "PAYMENT_FAILED_WEBHOOK",
};
