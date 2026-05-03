/**
 * Contact & Support API - RTK Query
 * Endpoints for contact forms and support tickets
 */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./config";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    /**
     * Submit contact form
     * @param {object} contactData - Contact form data
     * @returns {Promise} Submission confirmation
     */
    submitContactForm: builder.mutation({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData
      })
    }),

    /**
     * Submit support ticket
     * @param {object} ticketData - Support ticket information
     * @returns {Promise} Created ticket
     */
    submitSupportTicket: builder.mutation({
      query: (ticketData) => ({
        url: "/support/tickets",
        method: "POST",
        body: ticketData
      }),
      invalidatesTags: ["SupportTickets"]
    })
  })
});

export const { useSubmitContactFormMutation, useSubmitSupportTicketMutation } =
  contactApi;
