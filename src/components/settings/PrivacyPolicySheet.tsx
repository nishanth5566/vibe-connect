 import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
 import { ScrollArea } from "@/components/ui/scroll-area";
 
 interface PrivacyPolicySheetProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 const PrivacyPolicySheet = ({ open, onOpenChange }: PrivacyPolicySheetProps) => {
   return (
     <Sheet open={open} onOpenChange={onOpenChange}>
       <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
         <SheetHeader className="mb-4">
           <SheetTitle className="text-2xl font-bold">Privacy Policy</SheetTitle>
           <p className="text-sm text-muted-foreground">Last Updated: February 2026</p>
         </SheetHeader>
         
         <ScrollArea className="h-[calc(90vh-120px)] pr-4">
           <div className="space-y-6 text-sm text-foreground pb-8">
             <section>
               <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Radius ("we", "our", or "us") is committed to protecting your privacy and personal data. 
                 This Privacy Policy explains how we collect, use, store, and protect your personal data in 
                 accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information 
                 Technology Act, 2000 of India. By using our App, you consent to the practices described in 
                 this policy.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">2. Data Fiduciary Information</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Under the DPDP Act, 2023, Radius acts as the Data Fiduciary. We determine the purpose and 
                 means of processing your personal data. Our contact details and grievance officer information 
                 are available in the Help Center within the App.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">3. Personal Data We Collect</h3>
               <p className="text-muted-foreground leading-relaxed mb-2">
                 We collect the following categories of personal data:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                 <li><strong>Identity Data:</strong> Name, age, gender, profile photographs</li>
                 <li><strong>Contact Data:</strong> Email address, phone number (if provided)</li>
                 <li><strong>Location Data:</strong> Precise geolocation data when you enable location services</li>
                 <li><strong>Profile Data:</strong> Bio, interests (vibes), preferences</li>
                 <li><strong>Usage Data:</strong> App interactions, features used, time spent</li>
                 <li><strong>Communication Data:</strong> Messages exchanged with other users</li>
                 <li><strong>Technical Data:</strong> Device information, IP address, browser type</li>
               </ul>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">4. Purpose of Data Processing</h3>
               <p className="text-muted-foreground leading-relaxed mb-2">
                 We process your personal data for the following lawful purposes:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                 <li>To provide and maintain the App's core functionality</li>
                 <li>To enable location-based discovery of other users</li>
                 <li>To facilitate communication between users</li>
                 <li>To verify user identity and prevent fraud</li>
                 <li>To improve and personalize your experience</li>
                 <li>To ensure safety and enforce our Terms of Service</li>
                 <li>To comply with legal obligations under Indian law</li>
                 <li>To respond to your queries and provide support</li>
               </ul>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">5. Consent</h3>
               <p className="text-muted-foreground leading-relaxed">
                 As per the DPDP Act, 2023, we process your personal data based on your informed consent. 
                 By creating an account and using the App, you provide consent for the processing of your 
                 personal data as described in this policy. You may withdraw your consent at any time by 
                 deleting your account through the App settings. Note that withdrawal of consent may affect 
                 your ability to use certain features of the App.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">6. Location Data</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Location data is essential for the App's core functionality. We use your location to show 
                 you nearby users and enable location-based features. You can control location sharing 
                 through your device settings or within the App. When you disable location services, you 
                 will not be visible to other users and cannot discover others. We do not store your 
                 location history beyond what is necessary for the App's operation.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">7. Data Storage & Security</h3>
               <p className="text-muted-foreground leading-relaxed mb-2">
                 We implement appropriate technical and organizational security measures to protect your 
                 personal data against unauthorized access, alteration, disclosure, or destruction:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                 <li>Encryption of data in transit and at rest</li>
                 <li>Secure authentication mechanisms</li>
                 <li>Regular security assessments and audits</li>
                 <li>Access controls limiting data access to authorized personnel</li>
                 <li>Data stored on servers located in India where possible</li>
               </ul>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">8. Data Retention</h3>
               <p className="text-muted-foreground leading-relaxed">
                 We retain your personal data only for as long as necessary to fulfill the purposes for 
                 which it was collected, or as required by applicable Indian law. Upon deletion of your 
                 account, we will delete or anonymize your personal data within 30 days, except where 
                 retention is required for legal compliance, dispute resolution, or enforcement of our Terms.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">9. Your Rights Under DPDP Act, 2023</h3>
               <p className="text-muted-foreground leading-relaxed mb-2">
                 As a Data Principal under the DPDP Act, 2023, you have the following rights:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                 <li><strong>Right to Access:</strong> Request a summary of your personal data being processed</li>
                 <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
                 <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                 <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent</li>
                 <li><strong>Right to Grievance Redressal:</strong> Lodge complaints with our Grievance Officer</li>
                 <li><strong>Right to Nominate:</strong> Nominate another person to exercise your rights</li>
               </ul>
               <p className="text-muted-foreground leading-relaxed mt-2">
                 To exercise these rights, contact us through the Help Center in the App.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">10. Data Sharing</h3>
               <p className="text-muted-foreground leading-relaxed mb-2">
                 We may share your personal data with:
               </p>
               <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                 <li><strong>Other Users:</strong> Profile information visible based on your privacy settings</li>
                 <li><strong>Service Providers:</strong> Third parties who assist in operating the App (under strict data processing agreements)</li>
                 <li><strong>Legal Authorities:</strong> When required by Indian law, court order, or government request</li>
                 <li><strong>Safety Purposes:</strong> To protect the rights, property, or safety of users</li>
               </ul>
               <p className="text-muted-foreground leading-relaxed mt-2">
                 We do not sell your personal data to third parties for marketing purposes.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">11. Cross-Border Data Transfer</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Your personal data may be transferred to, and processed in, countries outside India. 
                 Such transfers will only be made to countries or entities that ensure adequate protection 
                 of personal data as per the DPDP Act, 2023, or where you have explicitly consented to 
                 such transfer.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">12. Children's Privacy</h3>
               <p className="text-muted-foreground leading-relaxed">
                 The App is not intended for individuals under 18 years of age. We do not knowingly collect 
                 personal data from children. As per the DPDP Act, 2023, processing of personal data of 
                 children requires verifiable parental consent, which we do not support. If we discover 
                 that we have collected personal data from a child, we will delete it immediately.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">13. Cookies & Tracking</h3>
               <p className="text-muted-foreground leading-relaxed">
                 We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                 and remember your preferences. You can control cookie settings through your browser. 
                 Essential cookies required for the App's functionality cannot be disabled.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">14. Data Breach Notification</h3>
               <p className="text-muted-foreground leading-relaxed">
                 In the event of a personal data breach that may harm you, we will notify you and the 
                 Data Protection Board of India as required under the DPDP Act, 2023. We will provide 
                 details of the breach and steps being taken to mitigate its effects.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">15. Grievance Officer</h3>
               <p className="text-muted-foreground leading-relaxed">
                 In accordance with the IT Act, 2000 and DPDP Act, 2023, we have appointed a Grievance 
                 Officer to address your concerns regarding personal data. Contact details are available 
                 in the Help Center. Grievances will be acknowledged within 24 hours and resolved within 
                 15 days or as per timelines prescribed under applicable law.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">16. Changes to This Policy</h3>
               <p className="text-muted-foreground leading-relaxed">
                 We may update this Privacy Policy from time to time. We will notify you of any material 
                 changes through the App or via email. The updated policy will be effective from the date 
                 of posting. Your continued use of the App after changes constitutes acceptance of the 
                 updated policy.
               </p>
             </section>
 
             <section>
               <h3 className="text-lg font-semibold mb-2">17. Contact Us</h3>
               <p className="text-muted-foreground leading-relaxed">
                 For questions, concerns, or requests regarding this Privacy Policy or your personal data, 
                 please contact us through the Help Center available in the App settings. We are committed 
                 to protecting your privacy and will respond to your inquiries promptly in accordance with 
                 applicable Indian regulations.
               </p>
             </section>
           </div>
         </ScrollArea>
       </SheetContent>
     </Sheet>
   );
 };
 
 export default PrivacyPolicySheet;