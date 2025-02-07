"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function UpgradePlans() {
    const { user } = useUser();
    const userUpgradePlan = useMutation(api.user.userUpgradePlan);
    const onPaymentSucess = async () => {
        const result = await userUpgradePlan({
            userEmail: user?.primaryEmailAddress?.emailAddress,
        });
        toast("Plan Upgraded Successfully...");
    };
    const getUserInfo = useQuery(api.user.getUserInfo, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    return (
        <div>
            <h2 className="font-medium text-3xl">Plans</h2>
            <p>Update your plan to upload multiple pdf to take notes</p>
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                    <div className="rounded-2xl p-6 shadow-md border  sm:order-last sm:px-8 lg:p-12">
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                Unlimited
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    {" "}
                                    1${" "}
                                </strong>

                                <span className="text-sm font-medium text-gray-700">
                                    /month
                                </span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    Unlimited PDF Upload{" "}
                                </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    Unlimited Notes Taking{" "}
                                </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    Email support{" "}
                                </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    Help center access{" "}
                                </span>
                            </li>
                        </ul>

                        <div className="mt-5">
                            {!getUserInfo?.upgrade ? (
                                <PayPalButtons
                                    onApprove={() => onPaymentSucess()}
                                    onCancel={() =>
                                        console.log("Payment Canceled")
                                    }
                                    createOrder={(data, actions) => {
                                        return actions?.order?.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: 1,
                                                        currency_code: "USD",
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                />
                            ) : (
                                <div
                                    href="#"
                                    className="mt-8 block rounded-full border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:ring-1 hover:ring-blue-600 focus:ring-3 focus:outline-hidden"
                                >
                                    Current Plan
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl p-6 shadow-md border  sm:order-first sm:px-8 lg:p-12">
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-gray-900">
                                Free
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    {" "}
                                    0${" "}
                                </strong>

                                <span className="text-sm font-medium text-gray-700">
                                    /month
                                </span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    5 PDF Upload{" "}
                                </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    Unlimited Notes Taking{" "}
                                </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    Email support{" "}
                                </span>
                            </li>

                            <li className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700">
                                    {" "}
                                    Help center access{" "}
                                </span>
                            </li>
                        </ul>

                        {!getUserInfo?.upgrade ? (
                            <div className="mt-8 block rounded-full border border-blue-600 bg-white px-12 py-3 text-center text-sm font-medium text-blue-600 hover:ring-1 hover:ring-blue-600 focus:ring-3 focus:outline-hidden">
                                Current Plan
                            </div>
                        ) : (
                            <div className="mt-8 block rounded-full bg-slate-200 px-12 py-3 text-center text-sm font-medium text-slate-400 hover:ring-1 hover:ring-slate-600 focus:ring-3 focus:outline-hidden pointer-events-none cursor-not-allowed">
                                Unavailable
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
