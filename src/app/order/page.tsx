"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReachOutSection from "@/app/components/ReachOutSection";
import { toast } from "sonner";

export default function OrderTranscriptPage() {
  const initialFormData = {
    // Case Details
    styleOfCause: "",
    proceedingDates: [
      {
        date: "",
        justiceName: "",
      },
    ],
    crownCounselName: "",
    defenceCounselName: "",
    courtFileNumber: "",
    courtLocation: "",

    // Additional Details About the Order
    copyType: "",
    numberOfCopies: 1,
    emailCopy: "",
    quoteRequired: "",
    dueDate: "",
    preferredContactMethod: "",
    additionalComments: "",
    usedForAppeal: "",
    appealNumber: "",
    hasPublicationBan: "",
    publicationBanDetails: "",

    // Ordering Party Details
    orderingPartyName: "",
    companyName: "",
    designation: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    officeNumber: "",
    cellNumber: "",
    emailAddress: "",
  };

  // State for form data
  const [formData, setFormData] = useState(initialFormData);

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for regular input changes
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handler for proceeding dates array
  const handleProceedingDateChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      proceedingDates: prev.proceedingDates.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  // Add new proceeding date
  const addProceedingDate = () => {
    setFormData((prev) => ({
      ...prev,
      proceedingDates: [
        ...prev.proceedingDates,
        {
          date: "",
          justiceName: "",
        },
      ],
    }));
  };

  // Remove proceeding date
  const removeProceedingDate = (index: number) => {
    if (formData.proceedingDates.length > 1) {
      setFormData((prev) => ({
        ...prev,
        proceedingDates: prev.proceedingDates.filter((_, i) => i !== index),
      }));
    }
  };

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Form submitted successfully! We'll be in touch soon.");
        setFormData({ ...initialFormData });
      } else {
        toast.error(
          result.message || "Failed to submit form. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error submitting form. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white/95">
      {/* Page Header - Deep Purple → Royal Blue gradient */}
      <div
        className="py-6"
        style={{
          background: "linear-gradient(135deg, #4B0082 0%, #1F3C88 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl w-full px-4">
          <h1 className="text-3xl md:text-4xl font-normal text-white text-center font-alice">
            Order A Transcript
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white py-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/images/innerbg.jpg')",
            backgroundPosition: "left center",
          }}
        />

        <div className="relative mx-auto max-w-7xl w-full px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center space-y-6">
                <Image
                  src="/images/Sanradhya-Bhowmik-Photo.jpg"
                  alt="Sanradhya Bhowmik"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
                <div className="w-full bg-[#1F3C88] text-white p-4 rounded-[20px] shadow-[0_4px_14px_rgba(31,60,136,0.15)]">
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-xl font-bold">+1 (855) 443-2748</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#F9FAFB] p-8 rounded-[20px] shadow-[0_4px_14px_rgba(31,60,136,0.08)]">
                <div className="bg-[#1F3C88] text-white p-4 rounded-t-[20px] -m-8 mb-8">
                  <h2 className="text-xl font-bold text-center">
                    Get in touch by filling out the form below:
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Case Details Section */}
                  <div className="p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-black mb-6">
                      Case Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Style of Cause */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                          Style of Cause *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.styleOfCause}
                          onChange={(e) =>
                            handleInputChange("styleOfCause", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter style of cause (e.g., R. v. Smith)"
                        />
                      </div>

                      {/* Crown Counsel Name */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Crown Counsel Name
                        </label>
                        <input
                          type="text"
                          value={formData.crownCounselName}
                          onChange={(e) =>
                            handleInputChange(
                              "crownCounselName",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter crown counsel name"
                        />
                      </div>

                      {/* Defence Counsel Name */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Defence Counsel Name
                        </label>
                        <input
                          type="text"
                          value={formData.defenceCounselName}
                          onChange={(e) =>
                            handleInputChange(
                              "defenceCounselName",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter defence counsel name"
                        />
                      </div>

                      {/* Court File Number */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Court File Number
                        </label>
                        <input
                          type="text"
                          value={formData.courtFileNumber}
                          onChange={(e) =>
                            handleInputChange("courtFileNumber", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter court file number"
                        />
                      </div>

                      {/* Court Location */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Court Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.courtLocation}
                          onChange={(e) =>
                            handleInputChange("courtLocation", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter court location"
                        />
                      </div>
                    </div>
                    {/* Proceeding Dates Dynamic Section */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-black">
                          Date(s) of Proceeding
                        </h4>
                        <button
                          type="button"
                          onClick={addProceedingDate}
                          className="bg-[#1F3C88] text-white px-4 py-2 rounded-[16px] hover:bg-[#183370] transition-colors flex items-center shadow-[0_4px_14px_rgba(31,60,136,0.2)]"
                        >
                          <span className="mr-2">+</span> Add Date
                        </button>
                      </div>

                      <div className="space-y-4">
                        {formData.proceedingDates.map((proceeding, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-[20px] border border-[#1F2937]/10"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-md font-medium text-gray-800">
                                Date {index + 1} {index === 0 ? "*" : ""}
                              </h5>
                              {formData.proceedingDates.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeProceedingDate(index)}
                                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                  Date of Proceeding: {index === 0 ? "*" : ""}
                                </label>
                                <input
                                  type="date"
                                  required={index === 0}
                                  value={proceeding.date}
                                  onChange={(e) =>
                                    handleProceedingDateChange(
                                      index,
                                      "date",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                  Justice Name:
                                </label>
                                <input
                                  type="text"
                                  value={proceeding.justiceName}
                                  onChange={(e) =>
                                    handleProceedingDateChange(
                                      index,
                                      "justiceName",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                                  placeholder="Enter justice name"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Details About the Order Section */}
                  <div className="p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-black mb-6">
                      Additional Details About the Order
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Copy Type */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-3">
                          Number of Copies *
                        </label>
                        <div className="flex space-x-4 mb-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="copyType"
                              value="electronic"
                              checked={formData.copyType === "electronic"}
                              onChange={(e) =>
                                handleInputChange("copyType", e.target.value)
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">
                              Electronic Copy
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="copyType"
                              value="hard"
                              checked={formData.copyType === "hard"}
                              onChange={(e) =>
                                handleInputChange("copyType", e.target.value)
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">Hard Copy</span>
                          </label>
                        </div>
                        {formData.copyType === "hard" && (
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={formData.numberOfCopies}
                            onChange={(e) =>
                              handleInputChange(
                                "numberOfCopies",
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                            placeholder="Enter number of hard copies"
                          />
                        )}
                      </div>

                      {/* Email Copy */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                          Additional Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.emailCopy}
                          onChange={(e) =>
                            handleInputChange("emailCopy", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter email address"
                        />
                      </div>

                      {/* Quote Required */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-3">
                          Quote Required *
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="quoteRequired"
                              value="yes"
                              checked={formData.quoteRequired === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "quoteRequired",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="quoteRequired"
                              value="no"
                              checked={formData.quoteRequired === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "quoteRequired",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">No</span>
                          </label>
                        </div>
                      </div>

                      {/* Required Due Date / Turnaround Time */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Required Due Date / Turnaround Time *
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.dueDate}
                          onChange={(e) =>
                            handleInputChange("dueDate", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                        />
                      </div>

                      {/* Preferred Contact Method */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-3">
                          Preferred Contact Method *
                        </label>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContactMethod"
                              value="EMAIL"
                              checked={
                                formData.preferredContactMethod === "EMAIL"
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "preferredContactMethod",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">Email</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContactMethod"
                              value="TELEPHONE"
                              checked={
                                formData.preferredContactMethod === "TELEPHONE"
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "preferredContactMethod",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">Telephone</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="preferredContactMethod"
                              value="TEXT"
                              checked={
                                formData.preferredContactMethod === "TEXT"
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "preferredContactMethod",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">Text</span>
                          </label>
                        </div>
                      </div>

                      {/* Additional Comments */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                          Additional Comments
                        </label>
                        <textarea
                          rows={4}
                          value={formData.additionalComments}
                          onChange={(e) =>
                            handleInputChange(
                              "additionalComments",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter any additional comments or requirements"
                        />
                      </div>

                      {/* Are these being used for Appeal */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-3">
                          Are these being used for Appeal? *
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="usedForAppeal"
                              value="yes"
                              checked={formData.usedForAppeal === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "usedForAppeal",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="usedForAppeal"
                              value="no"
                              checked={formData.usedForAppeal === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "usedForAppeal",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">No</span>
                          </label>
                        </div>
                      </div>

                      {/* Appeal Number - Conditional Field */}
                      {formData.usedForAppeal === "yes" && (
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">
                            Appeal Number
                          </label>
                          <input
                            type="text"
                            value={formData.appealNumber}
                            onChange={(e) =>
                              handleInputChange("appealNumber", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                            placeholder="Enter appeal number"
                          />
                        </div>
                      )}

                      {/* Does this matter have a publication ban? */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-3">
                          Does this matter have a publication ban? *
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasPublicationBan"
                              value="yes"
                              checked={formData.hasPublicationBan === "yes"}
                              onChange={(e) =>
                                handleInputChange(
                                  "hasPublicationBan",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasPublicationBan"
                              value="no"
                              checked={formData.hasPublicationBan === "no"}
                              onChange={(e) =>
                                handleInputChange(
                                  "hasPublicationBan",
                                  e.target.value,
                                )
                              }
                              className="text-[#1F3C88] focus:ring-[#1F3C88]"
                              required
                            />
                            <span className="ml-2 text-black">No</span>
                          </label>
                        </div>
                      </div>

                      {/* Publication Ban Details - Conditional Field */}
                      {formData.hasPublicationBan === "yes" && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-black mb-2">
                            If so please advise which one?
                          </label>
                          <input
                            type="text"
                            value={formData.publicationBanDetails}
                            onChange={(e) =>
                              handleInputChange(
                                "publicationBanDetails",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                            placeholder="Enter publication ban details"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ordering Party Details Section */}
                  <div className="p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-black mb-6">
                      Ordering Party Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ordering Party Name */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.orderingPartyName}
                          onChange={(e) =>
                            handleInputChange(
                              "orderingPartyName",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.emailAddress}
                          onChange={(e) =>
                            handleInputChange("emailAddress", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter email address"
                        />
                      </div>

                      {/* Cell Number */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Cell Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.cellNumber}
                          onChange={(e) =>
                            handleInputChange("cellNumber", e.target.value)
                          }
                          required
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter cell number"
                        />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium text-black mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter company name"
                        />
                      </div>

                      {/* Designation */}
                      <div className="w-full md:col-span-1">
                        <label className="block text-sm font-medium text-black mb-2">
                          Designation
                        </label>
                        <input
                          type="text"
                          value={formData.designation}
                          onChange={(e) =>
                            handleInputChange("designation", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter designation/title"
                        />
                      </div>

                      {/* Street Address */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={formData.streetAddress}
                          onChange={(e) =>
                            handleInputChange("streetAddress", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter street address"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter city"
                        />
                      </div>

                      {/* Province */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Province
                        </label>
                        <input
                          type="text"
                          value={formData.province}
                          onChange={(e) =>
                            handleInputChange("province", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter province"
                        />
                      </div>

                      {/* Postal Code */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) =>
                            handleInputChange("postalCode", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter postal code"
                        />
                      </div>

                      {/* Office Number */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Office Number
                        </label>
                        <input
                          type="tel"
                          value={formData.officeNumber}
                          onChange={(e) =>
                            handleInputChange("officeNumber", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-[#1F2937]/20 rounded-[16px] focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88] transition-colors bg-white text-[#1F2937]"
                          placeholder="Enter office number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Portal Section */}
                  <div className="p-6">
                    <div className="border border-black rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-black mb-6">
                        Recording Upload Section
                      </h3>

                      {/* Instructions */}
                      <div className="mb-6 p-4 bg-white border border-black rounded-md">
                        <h4 className="font-semibold text-black mb-2">
                          Upload Instructions for Ontario Files
                        </h4>
                        <ul className="text-sm text-black space-y-1">
                          <li>
                            In order to send us Voxlog/NS files you must first
                            compress/zip the files and then send the
                            zip/compressed file to us.
                          </li>
                          <li>
                            Annotations can also be uploaded through the
                            ShareFile portal.
                          </li>
                        </ul>
                      </div>

                      {/* File Upload Portal */}
                      <h4 className="text-lg font-medium text-black mb-4">
                        Your online transcript order portal.
                      </h4>
                      <div className="relative">
                        <iframe
                          src="https://videoplustranscriptionserviceskimfess.sharefile.com/remoteupload/eb067b13-7e35-46f9-b61f-da155da1e7e2"
                          width="100%"
                          height="500"
                          frameBorder="0"
                          className="w-full border border-gray-200 rounded"
                          title="Secure File Upload Portal"
                          scrolling="auto"
                          id="sfRemoteUploadFrame"
                        />
                        <noscript>
                          <div className="p-4 text-center">
                            <p className="text-gray-700 mb-2">
                              Your browser does not support iframes. Please
                              visit the link directly:
                            </p>
                            <a
                              href="https://videoplustranscriptionserviceskimfess.sharefile.com/remoteupload/eb067b13-7e35-46f9-b61f-da155da1e7e2"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              Open File Upload Portal
                            </a>
                          </div>
                        </noscript>
                      </div>
                    </div>
                  </div>

                  {/* Submit Section */}
                  <div className="p-6 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`font-semibold py-4 px-12 rounded-[20px] transition-colors duration-300 shadow-[0_4px_14px_rgba(31,60,136,0.2)] transform hover:scale-105 ${
                        isSubmitting
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-[#1F3C88] text-white hover:bg-[#183370]"
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Court Order"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReachOutSection />
    </div>
  );
}
