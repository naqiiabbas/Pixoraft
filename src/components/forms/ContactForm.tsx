"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

const BUDGET_OPTIONS = [
  "Under $5k",
  "$5k to $15k",
  "$15k to $50k",
  "$50k and up",
] as const;

const MODEL_OPTIONS = [
  { value: "fixed", label: "Fixed Project Cost" },
  { value: "hourly", label: "Hourly" },
  { value: "monthly", label: "Monthly Maintenance" },
] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().optional(),
  budget: z.string().min(1, "Select a budget range."),
  model: z.string().min(1, "Select an engagement model."),
  message: z.string().min(10, "Tell us a bit more, 10 characters or more."),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-faint outline-none backdrop-blur-md transition-colors focus:border-accent";
const labelClass = "mb-2 block text-sm font-medium text-foreground";
const errorClass = "mt-1 text-xs text-red-400";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      model: "",
      message: "",
    },
  });

  // Prefill the engagement model from ?model= (set by the engagement cards).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("model");
    if (param && MODEL_OPTIONS.some((m) => m.value === param)) {
      setValue("model", param);
    }
  }, [setValue]);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again or email us directly.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-8 text-center backdrop-blur-xl sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Thanks, we have your inquiry.
        </h3>
        <p className="mt-2 text-muted">
          We reply within 24 hours. If it is urgent, call or WhatsApp the number
          for your region below.
        </p>
        <p className="mt-6 font-mono text-xs text-faint">
          [ response time: under 24 hours ]
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-faint">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={fieldClass}
            {...register("company")}
          />
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <select
            id="budget"
            className={fieldClass}
            aria-invalid={!!errors.budget}
            defaultValue=""
            {...register("budget")}
          >
            <option value="" disabled>
              Select a range
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b} className="bg-surface">
                {b}
              </option>
            ))}
          </select>
          {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="model" className={labelClass}>
            Engagement model
          </label>
          <select
            id="model"
            className={fieldClass}
            aria-invalid={!!errors.model}
            defaultValue=""
            {...register("model")}
          >
            <option value="" disabled>
              Select a model
            </option>
            {MODEL_OPTIONS.map((m) => (
              <option key={m.value} value={m.value} className="bg-surface">
                {m.label}
              </option>
            ))}
          </select>
          {errors.model && <p className={errorClass}>{errors.model.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="What are you building, and what does success look like?"
            className={`${fieldClass} resize-y`}
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && (
            <p className={errorClass}>{errors.message.message}</p>
          )}
        </div>
      </div>

      {serverError && (
        <p className="mt-4 text-sm text-red-400">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
