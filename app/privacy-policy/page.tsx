import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Haddon Institute",
  description: "Understand how Haddon uses your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="space-y-8 px-4 my-20 max-w-7xl mx-auto">
      <AnimatedText
        text="Privacy Policy"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />

      <div className="space-y-2">
        <h1 className="font-logo text-sm uppercase font-mono font-semibold">
          Overview
        </h1>
        <p className="text-black">
          Haddon Institute respects your right to privacy under the Privacy Act
          1988 (Cth) and is required to comply with the Australian Privacy
          Principles in respect of the collection, use, disclosure, storage and
          disposal of personal information from individuals.
        </p>
        <p className="text-black">
          A copy of the Australia Privacy Principles may be obtained from the
          website of The Office of the Australian Information Commissioner at{" "}
          <a
            href="https://www.oaic.gov.au/"
            className="font-semibold underline text-white hover:no-underline"
          >
            https://www.oaic.gov.au/
          </a>{" "}
          .
        </p>
        <p className="text-black">
          In the provision of its goods and services, Haddon Institute may
          collect, store and/or share personal information such as name, home
          address, email address, phone number and other relevant information.
        </p>
        <p className="text-black">
          All personal and identifiable information collected and stored by
          Haddon Institute is handled and stored securely using Square/Stripe.
          This information is used for providing a good or service, processing
          payments or refunds, responding to inquiries, providing relevant and
          customised suggestions and offers for improved customer experiences
          and conducting market research.
        </p>
        <p className="text-black">
          This Personal Information is obtained in many ways including
          interviews, correspondence, by telepohone, by email, via our website,
          from other publicly available sources, from cookies and from third
          parties. We do not guarantee website links or policy of authorised
          third parties.
        </p>
        <p className="text-black">
          Customers automatically consent to these terms and conditions upon
          purchase of an item.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <h1 className="font-logo text-sm uppercase my-2 font-mono font-semibold">
            Third Parties
          </h1>
          <div className="space-y-2 text-black">
            <p>
              Where reasonable and practicable to do so, we will collect your
              personal information only from you. However, in some circumstances
              we may be provided with information by third parties. In such a
              case, we will take reasonable steps to ensure that you are made
              aware of the information provided to us by the third party.
            </p>
          </div>
        </div>
        <div>
          <h1 className="font-logo text-sm uppercase my-2 font-mono font-semibold">
            Information Disclosure
          </h1>
          <div className="space-y-2 text-black">
            <p>
              Personal information may be disclosed to third parties where they
              are assisting in the provision of services. Personal information
              may also be disclosed when required to do so by law.
            </p>
          </div>
        </div>
        <div>
          <h1 className="font-logo text-sm uppercase my-2 font-mono font-semibold">
            Accessing and Changing your Personal Information
          </h1>
          <div className="space-y-2 text-black">
            <p>
              Customers may request to access any personal information Haddon
              Institute holds, and change or remove the information stored. In
              order to protect your personal information we may require
              identification from you before releasing the requested
              information.
            </p>
          </div>
        </div>
        <div>
          <h1 className="font-logo text-sm uppercase my-2 font-mono font-semibold">
            Policy Updates
          </h1>
          <div className="space-y-2 text-black">
            <p>
              This policy may change from time to time and is available on our
              website.
            </p>
          </div>
        </div>
      </div>
      <p className="text-center my-10">
        For any questions or concerns about our Privacy Policy, please email{" "}
        <a
          href="email:contact@haddoninstitute.org"
          className="font-semibold underline"
        >
          contact@haddoninstitute.org
        </a>
        .
      </p>
    </div>
  );
}
